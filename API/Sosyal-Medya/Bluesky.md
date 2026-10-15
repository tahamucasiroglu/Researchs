# Bluesky API (AT Protocol)

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **aktif** (açık protokol; okuma ve gerçek zamanlı akış büyük ölçüde kimliksiz ve ücretsiz)

Etiketler: **[RESMÎ]** Bluesky/atproto resmî dokümanı veya resmî OpenAPI dosyası · **[3. TARAF]** topluluk kaynağı · **[TAHMİN]** çıkarım · **[ÇELİŞKİLİ]** kaynaklar ya da doküman ile canlı davranış farklı · **[TEST]** 15.10.2026'da `curl` ile canlı denendi.

## Özet

Bluesky tek merkezli bir API değil, **AT Protocol (atproto)** adlı açık bir protokol üzerine kurulu. Her hesabın verisi kendi **PDS**'inde (Personal Data Server) "repo" olarak durur; **Relay** tüm PDS'lerdeki değişiklikleri tek bir akışta (firehose) toplar; **AppView** (`api.bsky.app`) bu veriyi indeksleyip profil, gönderi, akış gibi "hazır görünümler" sunar [RESMÎ]. Herkese açık verinin neredeyse tamamı **kimlik doğrulamasız ve ücretsiz** okunabilir; gerçek zamanlı akış için **Jetstream** (filtrelenmiş JSON WebSocket) ve ham **firehose** da kimliksizdir [RESMÎ]. Ücretli bir API katmanı, geliştirici hesabı başvurusu veya uygulama onayı (App Review) **yoktur**; yalnızca Jetstream geçmiş verisi (replay/snapshot) için ücretsiz bir API anahtarı ve bayt bazlı kota vardır [RESMÎ]. Yazma (gönderi, beğeni, takip) için hesabın kendisiyle oturum (OAuth veya App Password) gerekir.

> Not: Resmî dokümanın adresi 2026'da değişti: `docs.bsky.app` → **`bsky.network`** (308 yönlendirme); eski `docs.bsky.app/docs/...` yolları `bsky.network/docs/...` altına yönlenir (`bsky.network/docs/` dizin sayfasının kendisi 403 döner, alt sayfalar açılır) [TEST]. HTTP API referansı **`endpoints.bsky.app`** altında OpenAPI olarak yayımlanıyor [TEST]. Eski blog yazılarındaki `docs.bsky.app/docs/api/...` bağlantıları yönlendirilir ya da kırık olabilir.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Herkese açık (kimliksiz)** | Hiçbir şey | AppView okuma (`public.api.bsky.app` / `api.bsky.app`): profil, yazar akışı, thread, takipçi/takip listesi, listeler, custom feed içerikleri, beğeni/repost listeleri; Relay firehose (`subscribeRepos`); Jetstream canlı akış; PDS'ten doğrudan repo/kayıt/blob okuma; profil RSS'i [RESMÎ][TEST] | Ücretsiz. AppView için "cömert" limit, sayı yayımlanmamış [RESMÎ]. Jetstream canlı akış ölçülmez (metered değil) [RESMÎ] |
| **Hesap ile (App Password)** | Normal bir Bluesky hesabı + Ayarlar → App Passwords'tan uygulama şifresi | Yazma (`com.atproto.repo.*`), kişisel zaman tüneli (`getTimeline`), bildirimler, sessize alma/engelleme listeleri, **activity subscription** (bir hesabın yeni gönderilerine abone olma), DM (`chat.bsky.*`) [RESMÎ] | Ücretsiz. PDS: IP başına 3000 istek/5 dk; yazma: 5000 puan/saat, 35.000 puan/gün [RESMÎ]. Bot ve CLI araçları için resmî önerilen yol budur [RESMÎ] |
| **Hesap ile (OAuth)** | Uygulamanın public `client_metadata` JSON'u (ayrı "developer portal" kaydı yok); DPoP + PKCE + PAR [RESMÎ] | Son kullanıcı adına App Password ile açılanların aynısı, **izin kapsamlarına (scope / permission set)** göre sınırlı [RESMÎ] | Ücretsiz. Kendi giriş akışı olan uygulamalar için **zorunlu öneri** [RESMÎ] |
| **Jetstream API anahtarı** | `bsky.network` hesap sayfasından anahtar oluşturma (`/account#api-keys`) [RESMÎ] | Jetstream v2 **Replay** (geçmişi çekip canlıya geçme) ve **Snapshot** (arşiv indirme) HTTP uç noktaları [RESMÎ] | Ücret belirtilmemiş; kota **indirilen bayt** ile ölçülür, aşımda `429 {"error":"byte limit exceeded"}` + `Retry-After` [RESMÎ]. Kota rakamı belgede yok |
| **İşletme / uygulama onayı** | — | **Yok.** Meta/X tarzı App Review, Business Verification veya partner programı bulunmuyor [RESMÎ — dokümanda böyle bir süreç tanımlı değil] | — |
| **Ücretli / kurumsal** | — | **Yok.** Bluesky'ın satılan bir API katmanı yok [RESMÎ — fiyat sayfası yok]. Yüksek hacim için kendi Relay/Jetstream/AppView'ını çalıştırmak öneriliyor (açık kaynak) [RESMÎ] | Kendi sunucu maliyetin |
| **Resmî olmayan** | — | Bluesky dışındaki topluluk Relay'leri, Jetstream örnekleri, arama/indeks servisleri, Apify vb. scraper'lar [3. TARAF] | Değişken; bkz. "Resmî olmayan yollar" |

## Kimlik doğrulama

- **Kimliksiz okuma:** `app.bsky.*` okuma uç noktalarının çoğu token istemez; doğrudan `https://public.api.bsky.app/xrpc/<NSID>` çağrılır. `public.api.bsky.app` önbellekli (yanıt başlığı `Cache-Control: public, max-age=30`) ve "herkese açık web" senaryoları için önerilen adres [RESMÎ][TEST].
- **App Password (bot/CLI):** `POST <PDS>/xrpc/com.atproto.server.createSession` → `{identifier, password}` gövdesi; yanıtta kısa ömürlü `accessJwt` (birkaç dakika) ve uzun ömürlü `refreshJwt` döner; yenileme `com.atproto.server.refreshSession` ile [RESMÎ]. Ana şifre yerine **mutlaka App Password** kullanılmalı [RESMÎ]. Bluesky'da barındırılan hesaplar için PDS adresi `https://bsky.social` (entryway) verilebilir; SDK'lar gerçek PDS'i (`*.host.bsky.network`) DID belgesinden çözer [RESMÎ].
- **OAuth (son kullanıcı uygulamaları):** atproto OAuth profili: DPoP (token'ı anahtara bağlama), PKCE, PAR zorunlu; istemci kimliği bir URL'deki `client-metadata.json`'dır, merkezi kayıt yoktur. Public client (SPA/mobil) ve confidential client (backend) tipleri var; izinler "permission set" ile istenir [RESMÎ]. Elle yazmak yerine SDK kullanılması öneriliyor [RESMÎ].
- **Proxy:** Kimlikli `app.bsky.*` ve `chat.bsky.*` çağrıları kullanıcının PDS'ine yapılır, PDS `atproto-proxy` başlığına göre doğru servise (AppView `did:web:api.bsky.app#bsky_appview`, chat `did:web:api.bsky.chat#bsky_chat`) iletir [RESMÎ].
- **Service auth:** Servisler arası kısa ömürlü (<60 sn) imzalı JWT (`iss`=kullanıcı DID, `aud`=hedef servis DID). Feed generator yazıyorsan gelen isteğin JWT'sini bununla doğrularsın [RESMÎ].
- **Kimlik çözümleme:** handle → DID: `com.atproto.identity.resolveHandle` veya DNS TXT `_atproto.<handle>` / `https://<handle>/.well-known/atproto-did`; DID → PDS: `did:plc` için `https://plc.directory/<did>` [RESMÎ][TEST]. **Takipte handle değil DID sakla**; handle değişebilir, DID kalıcıdır [RESMÎ].

## Temel uç noktalar

Taban adresler [RESMÎ]: AppView `https://public.api.bsky.app` (kimliksiz) / `https://api.bsky.app`; PDS `https://bsky.social` veya kendi PDS'in; Relay `https://bsky.network`, `wss://relay1.us-east.bsky.network`; Chat `https://api.bsky.chat`; Jetstream `wss://jetstream.us-east.bsky.network`, `wss://jetstream.us-west.bsky.network`. Tüm yollar `/xrpc/<NSID>` biçimindedir.

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `com.atproto.identity.resolveHandle` | Handle → DID | Kimliksiz | Takip listesini DID'e çevirmek için ilk adım [RESMÎ] |
| GET | `app.bsky.actor.getProfile` / `getProfiles` | Profil (sayaçlar, açıklama, **`status`** alanı) | Kimliksiz | `getProfiles` çoklu (en çok 25 aktör) [RESMÎ — lexicon]. `status` alanı canlı yayın durumunu taşır |
| GET | `app.bsky.actor.searchActors` | Hesap arama | Kimliksiz | [RESMÎ] |
| GET | `app.bsky.feed.getAuthorFeed` | Bir hesabın gönderi + repostları | Kimliksiz | `limit` ≤100, `filter`: `posts_with_replies`, `posts_no_replies`, `posts_with_media`, `posts_and_author_threads`, `posts_with_video`; `includePins` [RESMÎ]. Polling ile "yeni gönderi" takibinin ana uç noktası |
| GET | `app.bsky.feed.getPosts` | AT-URI listesiyle gönderileri "hydrate" etme | Kimliksiz | En çok 25 URI [RESMÎ — lexicon]. Jetstream'den gelen ham kaydı sayaçlı görünüme çevirmek için |
| GET | `app.bsky.feed.getPostThread` | Thread / yanıtlar | Kimliksiz | Yorum takibi [RESMÎ] |
| GET | `app.bsky.feed.getQuotes`, `getLikes`, `getRepostedBy` | Alıntılar, beğenenler, repost edenler | Kimliksiz | [RESMÎ] |
| GET | `app.bsky.feed.searchPosts` | Gönderi arama: `q`, `author`, `mentions`, `tag`, `domain`, `url`, `lang`, `since`, `until`, `sort=top/latest` | Kimliksiz* | *[ÇELİŞKİLİ] Lexicon "bazı sağlayıcılarda auth gerekebilir" diyor; `public.api.bsky.app` kimliksiz istekte **403**, `api.bsky.app` **200** döndü [TEST]. Topluluk raporları da aynı (bsky-docs #332) [3. TARAF] |
| GET | `app.bsky.feed.getFeed` | Bir custom feed'in içeriği | Kimliksiz | Feed URI ile [RESMÎ] |
| GET | `app.bsky.feed.getListFeed` | Bir listedeki hesapların gönderileri | Kimliksiz | **Takip için çok kullanışlı:** takip edilecek hesapları bir listeye koy, tek çağrıyla hepsinin akışını çek [RESMÎ] |
| GET | `app.bsky.graph.getFollowers` / `getFollows` / `getList` / `getLists` | Sosyal grafik, listeler | Kimliksiz | [RESMÎ] |
| GET | `app.bsky.feed.getTimeline` | Oturum sahibinin ana akışı | Hesap | [RESMÎ] |
| GET | `app.bsky.notification.listNotifications` | Bildirimler (mention, reply, quote, follow…) | Hesap | `limit` ≤100, `reasons` filtresi [RESMÎ] |
| POST | `app.bsky.notification.putActivitySubscription` | Bir hesabın **yeni gönderi / yanıt** bildirimine abone ol ("zil" özelliği) | Hesap | Gövde: `{subject: <DID>, activitySubscription: {post: bool, reply: bool}}` [RESMÎ]; liste: `listActivitySubscriptions` |
| POST | `com.atproto.repo.createRecord` / `deleteRecord` / `applyWrites` | Gönderi, beğeni, takip, profil vb. kayıt yazma | Hesap | Yazma puanı: CREATE 3, UPDATE 2, DELETE 1 [RESMÎ] |
| GET | `com.atproto.repo.listRecords` / `getRecord` | Bir repodaki kayıtları doğrudan PDS'ten okuma | Kimliksiz | AppView'a bağımlı olmadan ham veri [RESMÎ] |
| GET | `com.atproto.sync.getRepo` | Tüm repoyu CAR dosyası olarak indirme | Kimliksiz | Toplu geçmiş için [RESMÎ] |
| GET | `com.atproto.sync.listReposByCollection` | Belirli bir koleksiyonu (ör. `app.bsky.feed.generator`) kullanan DID'ler | Kimliksiz | Relay üzerinde [RESMÎ] |
| WS | `com.atproto.sync.subscribeRepos` | Firehose (tüm ağ, CBOR) | Kimliksiz | Relay'de [RESMÎ] |
| WS | `network.bsky.jetstream.subscribeEvents` (v2) / `/subscribe` (v1) | Filtrelenmiş JSON akış | Kimliksiz | 100 koleksiyon, 10.000 DID'e kadar filtre [RESMÎ] |
| GET | `chat.bsky.convo.listConvos` / `getMessages` | DM konuşmaları ve mesajları | Hesap (OAuth/App Password, DM izni) | Yalnızca **hesabın kendi** DM'leri; kimliksiz istek 401 [TEST]. App Password ile DM erişimi için şifre oluştururken ayrı izin seçeneği olduğu bilinir [TAHMİN — bu sayfada doğrulanmadı] |

Tam liste: [endpoints.bsky.app](https://endpoints.bsky.app) (Bluesky App, Bluesky DMs, Ozone Moderation, Jetstream API) [RESMÎ].

## Gerçek zamanlı / bildirim

| Mekanizma | Var mı | Nasıl | Not |
|---|---|---|---|
| **Jetstream (WebSocket, JSON)** | Var, kimliksiz [RESMÎ] | `wss://jetstream.us-east.bsky.network/xrpc/network.bsky.jetstream.subscribeEvents?collections=app.bsky.feed.post&dids=<DID>&kinds=commit` — WebSocket alt protokolü `xrpc.v1.json` | v2 önerilir. Filtreler: `collections` (NSID veya `app.bsky.feed.*` joker), `dids`, `kinds` (`commit`, `identity`, `account`, `sync`). Teslim **en az bir kez** (at-least-once); `seq` ile `?cursor=N` kaldığın yerden devam, canlı akışta cursor unix-mikrosaniye de kabul eder [RESMÎ]. **Canlı akışta cursor geriye bakışı ~36 saat** (Bluesky'ın barındırdığı örnekler); daha uzun kesintide bağlantı **HTTP 400** ile reddedilir, boşluk API anahtarlı Replay (`planSnapshot` → `getSegment`/`getBlock`) ile doldurulup sonra canlıya geçilir [RESMÎ] |
| Jetstream v1 (eski) | Var [RESMÎ] | `wss://jetstream1.us-west.bsky.network/subscribe?wantedCollections=...&wantedDids=...` (diğer resmî v1 adresi: `wss://jetstream2.us-east.bsky.network`) | Hâlâ çalışıyor (101 Switching Protocols) [TEST]; replay/snapshot yok, `time_us` cursor [RESMÎ] |
| Jetstream Replay / Snapshot | Var, API anahtarı [RESMÎ] | HTTP: `network.bsky.jetstream.planSnapshot`, `listSegments`, `getSegment`, `getBlock`; SDK geçmişi çekip canlıya geçer | Bayt kotalı; HTTP Range ile kaldığın yerden indirme [RESMÎ] |
| **Firehose (Relay)** | Var, kimliksiz [RESMÎ] | `wss://relay1.us-east.bsky.network/xrpc/com.atproto.sync.subscribeRepos` (Sync 1.1, `prevData` alanı, yeni projelerde önerilen) veya `wss://bsky.network` (eski) | İkili DAG-CBOR + CAR; filtre yok, tüm ağ; kriptografik doğrulama gerekiyorsa [RESMÎ]. Bant genişliği yüksek [RESMÎ] |
| Webhook | **Yerleşik yok** [RESMÎ] | Resmî doküman "Jetstream'i webhook'a yönlendirme" deseni öneriyor: Jetstream'i dinle → eşleşeni Discord/Slack webhook'una POST et | Webhook POST'unu okuma döngüsünde `await` etme (backpressure → bağlantı kopar) [RESMÎ] |
| Push bildirimi | Yalnızca kendi hesabın için [RESMÎ] | `app.bsky.notification.registerPush` (mobil istemci push servisleri için) | Üçüncü taraf takipte pratik değil [TAHMİN] |
| **RSS** | Var (gönderiler için) [TEST] | `https://bsky.app/profile/<handle veya DID>/rss` | Handle → DID adresine 302 yönlendirir; `application/xml` RSS 2.0 döner [TEST]. API dokümanında listelenmiyor; kararlılık garantisi yok [TAHMİN] |
| WebSub / PubSubHubbub | Belgede yok | — | — |
| oEmbed | Var [RESMÎ] | `https://embed.bsky.app/oembed?url=<gönderi URL>` | Gömme içindir, takip için değil |

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Belirli hesapların **yeni gönderisi** | Evet | Jetstream `dids=<DID…>&collections=app.bsky.feed.post&kinds=commit`, `operation=create` | Kimliksiz | En verimli yol; saniyeler içinde gelir [RESMÎ]. 10.000 DID'e kadar tek bağlantı [RESMÎ]. Yedek: `getAuthorFeed` / `getListFeed` polling veya RSS |
| Yanıt mı, ana gönderi mi ayrımı | Evet | Kayıtta `reply` alanı varsa yanıttır | Kimliksiz | [RESMÎ — `app.bsky.feed.post` lexicon] |
| Repost / alıntı | Evet | Repost: `app.bsky.feed.repost` koleksiyonu; alıntı: post kaydında `embed` = `app.bsky.embed.record` | Kimliksiz | [RESMÎ] |
| Gönderi silindi / düzenlendi | Silme: evet; düzenleme: Bluesky'da gönderi düzenleme yok | Jetstream `operation=delete` (yalnızca `collection` + `rkey`) | Kimliksiz | Silinen içeriği kendi veritabanından da kaldırmak geliştirici kuralı gereği zorunlu [RESMÎ] |
| **Canlı yayın başladı** | Evet (sınırlı) | Hesap "Live" durumunu açınca repoya `app.bsky.actor.status` kaydı (`status: app.bsky.actor.status#live`, `embed` = yayın linki, `durationMinutes`, `createdAt`) yazılır → Jetstream'de `collections=app.bsky.actor.status`; veya `getProfile` yanıtındaki `status` (`isActive`, `expiresAt`) | Kimliksiz | [RESMÎ — OpenAPI şeması]. Bluesky yayını kendisi barındırmaz; yalnızca harici yayına (ör. Twitch) bağlantı verir. Hangi yayın sitelerinin desteklendiği belgede yok; IFTTT entegrasyonu "şimdilik yalnızca Twitch" diyor [3. TARAF]. Yayın gerçekten sürüyor mu doğrulaması için Twitch/YouTube API'si ayrıca kontrol edilmeli [TAHMİN] |
| Hesap profil/handle değişikliği | Evet | Jetstream `kinds=identity` (handle), `app.bsky.actor.profile` koleksiyonu (profil) | Kimliksiz | [RESMÎ] |
| Hesap silindi / askıya alındı | Evet | Jetstream `kinds=account` (`active:false`, `status`) | Kimliksiz | [RESMÎ] |
| Bir gönderiye gelen **yorum/yanıt** | Evet | `getPostThread` polling veya Jetstream'de tüm `app.bsky.feed.post` akışını alıp `reply.parent.uri`/`reply.root.uri` eşleştirme (istemci tarafı) | Kimliksiz | Jetstream'de "şu gönderiye yanıt" sunucu filtresi yok; tüm post akışını dinlemek gerekir [RESMÎ] |
| **Anahtar kelime / hashtag** filtreleme | Evet | (a) Jetstream `collections=app.bsky.feed.post` + istemci tarafı metin eşleşmesi; (b) `searchPosts?q=...&sort=latest` polling; (c) kendi **custom feed**'in | Kimliksiz | Sunucu tarafı filtreler yalnızca `dids`, `collections`, `kinds`; metin filtresi istemcide yapılır [RESMÎ]. Hashtag'ler `facets` içinde `app.bsky.richtext.facet#tag` olarak gelir [RESMÎ] |
| Dil filtresi | Evet | Post kaydındaki `langs` alanı; `searchPosts?lang=` | Kimliksiz | `langs` yazarın beyanıdır, boş olabilir [RESMÎ] |
| Mention (beni/kanalı etiketleyen) | Evet | `listNotifications?reasons=mention` (kendi hesabın) veya `searchPosts?mentions=<handle>` | Hesap / Kimliksiz* | *searchPosts notu yukarıda |
| DM / grup mesajı | Yalnızca kendi hesabın | `chat.bsky.convo.*` | Hesap | Başkalarının DM'leri hiçbir yolla okunamaz; firehose'a DM girmez [RESMÎ]. Bluesky'da Telegram/Discord tarzı herkese açık grup/kanal kavramı yok; en yakın karşılıklar **listeler**, **custom feed**'ler ve **starter pack**'ler [RESMÎ] |
| "Önemli olanları ayıklama" | Evet | Etkileşim sayılarını (`likeCount`, `repostCount`, `replyCount`, `quoteCount`) `getPosts` ile çek; eşik/puan ile süz | Kimliksiz | Jetstream ham kayıt verir, sayaç vermez; sayaç için AppView'a toplu (25'li) sorgu [RESMÎ] |
| Takip listesini Bluesky içinde göstermek | Evet | **Feed generator** yaz: `describeFeedGenerator` + `getFeedSkeleton` sunan bir HTTP servis; `app.bsky.feed.generator` kaydıyla yayınla | Hesap (yayın için) | Feed generator yalnızca gönderi URI listesi (skeleton) döner, AppView "hydrate" eder [RESMÎ]. Ayıklanmış gönderileri kullanıcıya Bluesky uygulaması içinde göstermenin resmî yolu |

Önerilen mimari [TAHMİN, resmî webhook örneğinden türetilmiş]: takip edilen handle'lar → `resolveHandle` ile DID → tek Jetstream v2 bağlantısı (`dids` + `collections=app.bsky.feed.post,app.bsky.feed.repost,app.bsky.actor.status`) → son `seq`'i kalıcı sakla (yeniden bağlanmada `cursor`; kesinti ~36 saati aşarsa Replay ile boşluğu doldur) → AT-URI ile tekrarları ele (at-least-once) → kurallarla filtrele → kuyruk → bildirim kanalı.

## Hız sınırları ve fiyatlar

Hepsi [RESMÎ] (`bsky.network/docs/rate-limits`, 15.10.2026); doküman "zamanla değişecek" diyor. Sınır aşımında HTTP **429**; birçok yanıt IETF taslağındaki `RateLimit-*` başlıklarını taşır.

| Kapsam | Limit |
|---|---|
| PDS — tüm uç noktalar | IP başına **3000 istek / 5 dk** |
| `com.atproto.server.createSession` | Hesap başına **30 / 5 dk**, **300 / gün** (oturumu sakla ve `refreshSession` kullan!) |
| `com.atproto.identity.updateHandle` | Hesap başına 10 / 5 dk, 50 / gün |
| `com.atproto.server.createAccount` | IP başına 100 / 5 dk |
| `deleteAccount`, `resetPassword` | IP başına 50 / 5 dk |
| Yazma işlemleri (hesap/DID başına) | **5000 puan/saat, 35.000 puan/gün**; CREATE=3, UPDATE=2, DELETE=1 → saatte en çok ~1666, günde ~11.666 kayıt oluşturma |
| Blob yükleme | Dosya başına 50 MB (52.428.800 bayt) PDS sınırı |
| AppView (`api.bsky.app`, `public.api.bsky.app`) | "Cömert", sayı yayımlanmamış; takılırsan iletişime geç |
| Relay — yeni PDS başına | 50 olay/sn, 2600/saat, 21.000/gün; 100 hesap üst sınırı (talep üzerine artırılır) |
| Etiketleme servisleri (labeler) | 5/sn, 10.000/saat, 100.000/gün |
| Jetstream canlı akış | Ölçülmez, anahtar gerekmez; filtre: ≤100 koleksiyon, ≤10.000 DID |
| Jetstream replay/snapshot | API anahtarı, indirilen bayt üzerinden sürekli dolan kota; rakam belgede yok |

**Fiyat:** Bluesky API'si, firehose ve Jetstream canlı akışı **ücretsizdir**; ücretli katman veya kurumsal plan **belgede yok** [RESMÎ]. Kendi Relay/Jetstream'ini çalıştırmanın ana maliyeti bant genişliği [RESMÎ].

**Geliştirici kuralları (bot/takip uygulaması için önemli)** [RESMÎ — Developer Guidelines]: Bildirime yol açan (mesaj, takip, beğeni, yanıt) otomatik/toplu etkileşim **spam sayılır**; kullanıcı içerikli uygulamada şikâyet, içerik engelleme ve kötü kullanıcıyı engelleme yolu olmalı; kullanıcının silinmesini istediği içerik silinmeli; herkese açık iletişim e-postası tutulmalı. İhlalde Bluesky altyapısına erişim askıya alınabilir. Bot hesapları profile **`bot` self-label**'ı eklemeli (`app.bsky.actor.profile` → `labels: {$type: 'com.atproto.label.defs#selfLabels', values: [{val: 'bot'}]}`) [RESMÎ — atproto bot tutorial]; uygulamada da otomatik hesap etiketi ayarı var [3. TARAF].

## Resmî olmayan yollar ve riskler

Bluesky'da **kimliksiz resmî okuma ve akış zaten açık** olduğu için, X/Instagram'daki gibi gizli uç noktalara ihtiyaç çok azdır. Yine de:

| Yol | Nasıl çalışır | Risk |
|---|---|---|
| `api.bsky.app` üzerinden kimliksiz `searchPosts` | `public.api` 403 verirken bu adres çalışıyor [TEST][3. TARAF] | Resmî dokümanda kimliksiz arama için `public.api` öneriliyor; davranış her an değişebilir [ÇELİŞKİLİ]. Kararlı bir sistem için oturumlu (App Password) çağrı kullan |
| Profil RSS'i (`/profile/<x>/rss`) | Web uygulamasının sunduğu RSS [TEST] | Belgelenmemiş; biçim/erişim değişebilir [TAHMİN] |
| Topluluk Relay ve Jetstream örnekleri | Bluesky dışı kişi/kurumların çalıştırdığı açık uç noktalar; resmî doküman "birkaç bağımsız relay var" diyor [RESMÎ] | SLA yok; kapanabilir, veri eksik olabilir [TAHMİN] |
| Üçüncü taraf indeks/arama servisleri ve scraper'lar (ör. Apify aktörleri) | Firehose/AppView'dan veri toplayıp kendi API'leriyle satarlar [3. TARAF] | Ücretli olabilir; veri koruma (GDPR/KVKK) yükümlülüğü senin üstüne de düşer [TAHMİN] |
| Toplu otomatik etkileşim (follow/like botları) | Yazma API'siyle | Geliştirici kuralları ve Topluluk Kuralları ihlali → hesap/erişim askıya alma [RESMÎ] |

Genel hukuki not [TAHMİN]: Veri "herkese açık" olsa da kişisel veridir. Takip uygulaması başkalarının gönderilerini saklıyorsa silme olaylarını (`operation=delete`, hesap silme `account` olayı) işlemek hem Bluesky geliştirici kuralı [RESMÎ] hem de KVKK/GDPR açısından gereklidir. `!no-unauthenticated` etiketi taşıyan hesaplar oturumsuz görünmek istemediğini belirtir; bu etikete saygı göstermek iyi uygulamadır [RESMÎ — etiket değeri lexicon'da tanımlı].

## SDK ve kütüphaneler

| Dil | Kütüphane | Durum |
|---|---|---|
| TypeScript | `@atproto/lex`, `@atproto/lex-password-session`, `@bsky/sdk` (eski `@atproto/api` hâlâ yaygın) | Resmî (Bluesky) [RESMÎ] |
| TypeScript | `@bsky/jetstream` (Node 22.15+, ESM, tarayıcıda da çalışır) | Resmî Jetstream SDK [RESMÎ] |
| Go | `github.com/bluesky-social/indigo` (Relay, firehose, atclient), `github.com/bluesky-social/jetstream` (Go 1.26+) | Resmî [RESMÎ] |
| Python | `atproto` (MarshalX) | Topluluk, resmî SDK listesinde [RESMÎ — atproto.com/sdks] |
| **C# / .NET** | **`idunno.Bluesky`** (NuGet: `idunno.Bluesky`, 15.10.2026 itibarıyla 7.0.1 [TEST]) | Topluluk, resmî SDK listesinde [RESMÎ — atproto.com/sdks] |
| **C# / .NET** | **CarpaNet** | Topluluk, resmî SDK listesinde [RESMÎ — atproto.com/sdks]. Aynı geliştiricinin eski kütüphanesi **FishyFlip** artık listede yok [ÇELİŞKİLİ — NuGet'te hâlâ yayında (4.3.0) [TEST], ama resmî listeden çıkmış; yeni projede CarpaNet/idunno tercih et] |
| TypeScript | `atcute` (hafif istemci) | Topluluk [RESMÎ — listede] |
| Rust | `rsky` | Topluluk [RESMÎ — listede] |
| Dart | `atproto.dart` / `bluesky` | Topluluk [RESMÎ — listede] |
| Swift | `ATProtoKit`, `swift-atproto` | Topluluk [RESMÎ — listede] |
| Ruby / Elixir / PHP | Ruby SDK, `atex`, `libphpsky` | Topluluk [RESMÎ — listede] |
| Araç | `websocat` (Jetstream'i terminalden dinleme), `tap` (feed tutorial'da firehose tüketme aracı) | [RESMÎ — dokümanda kullanılıyor] |

.NET için not [TAHMİN]: SDK zorunlu değil; Jetstream düz JSON olduğu için `System.Net.WebSockets.ClientWebSocket` + `System.Text.Json` ile birkaç satırda dinlenebilir (alt protokol `xrpc.v1.json`). Firehose (CBOR/CAR) için hazır kütüphane kullanmak daha pratik.

## Postman / OpenAPI / koleksiyonlar

- **Resmî OpenAPI dosyaları** [RESMÎ][TEST] — `endpoints.bsky.app` (Scalar arayüzü) şu dosyaları sunuyor; Postman/Insomnia'ya "Import → OpenAPI" ile alınabilir:
  - `https://endpoints.bsky.app/openapi.bluesky-app.json` (app.bsky + com.atproto; sunucular: `public.api.bsky.app`, `{PDS}`, `bsky.network`)
  - `https://endpoints.bsky.app/openapi.bluesky-dms.json` (chat.bsky)
  - `https://endpoints.bsky.app/openapi.ozone-moderation.json` (tools.ozone)
  - `https://endpoints.bsky.app/openapi.jetstream.json` (network.bsky.jetstream.*)
- **Lexicon kaynakları** [RESMÎ]: `com.atproto` ve `tools.ozone` → `github.com/bluesky-social/atproto/lexicons`; `app.bsky` ve `chat.bsky` → `github.com/bluesky-social/bsky` deposu (2026'da taşındı).
- Resmî Postman koleksiyonu: **belgede yok**. Postman Public Network'te topluluk koleksiyonları bulunuyor [3. TARAF]; resmî OpenAPI dosyası daha güncel.

## Depoda ilgili sayfalar

- [Sosyal medya API'leri — bu klasör](./) — diğer platform dosyaları (ör. [Instagram](Instagram.md), [LinkedIn](LinkedIn.md), [Snapchat](Snapchat.md))
- [Mesajlaşma altyapıları rehberi](../../Rehberler/Mesajlasma-Altyapilari/) — Telegram, WhatsApp, BiP, SMS API'leri (bildirim kanalı olarak kullanılabilir)
- [C# / .NET](../../Programlama/CSharp-DotNet/) — `idunno.Bluesky` ile örnek proje açılırsa buraya konur

## Kaynaklar

Resmî:

- https://bsky.network/ — "Bluesky Protocol Services" ana sayfası (eski `docs.bsky.app` buraya yönleniyor; eski `docs.bsky.app/docs/...` yolları `bsky.network/docs/...` altına gider) — (erişim: 15 Ekim 2026)
- https://bsky.network/docs/api-directory — API hostları, kimlik doğrulama türleri, servis DID'leri, service auth — (erişim: 15 Ekim 2026)
- https://bsky.network/docs/rate-limits — PDS, yazma puanı, Relay ve labeler hız sınırları — (erişim: 15 Ekim 2026)
- https://bsky.network/docs/jetstream — Jetstream v1/v2 uç noktaları, filtreler, cursor, firehose karşılaştırması — (erişim: 15 Ekim 2026)
- https://bsky.network/docs/jetstream-replay — Replay/Snapshot, API anahtarı, bayt kotası; canlı akış geriye bakışı 36 saat ve aşımda HTTP 400 — (erişim: 15 Ekim 2026)
- https://bsky.network/docs/jetstream-webhooks — Jetstream'den Discord/Slack webhook'una izleme listesi ve anahtar kelime örneği — (erişim: 15 Ekim 2026)
- https://bsky.network/docs/jetstream-sdk — `@bsky/jetstream` ve Go SDK — (erişim: 15 Ekim 2026)
- https://bsky.network/docs/relay — Relay ve firehose uç noktaları (Sync 1.1) — (erişim: 15 Ekim 2026)
- https://bsky.network/docs/bluesky-api — Oturum açma, gönderi oluşturma hızlı başlangıç — (erişim: 15 Ekim 2026)
- https://bsky.network/docs/bluesky-api/custom-feeds — Feed generator bilgisi ve içeriğini okuma — (erişim: 15 Ekim 2026)
- https://bsky.network/docs/oauth-client — OAuth yönlendirmesi; bot/CLI için App Password istisnası — (erişim: 15 Ekim 2026)
- https://bsky.network/docs/developer-guidelines — Geliştirici kuralları (spam, silme, şikâyet) — (erişim: 15 Ekim 2026)
- https://endpoints.bsky.app — HTTP API referansı ve OpenAPI dosyaları — (erişim: 15 Ekim 2026)
- https://atproto.com/guides/auth — atproto kimlik doğrulama özeti — (erişim: 15 Ekim 2026)
- https://atproto.com/specs/oauth — atproto OAuth spesifikasyonu — (erişim: 15 Ekim 2026)
- https://atproto.com/guides/bot-tutorial — Bot yazma, `bot` self-label — (erişim: 15 Ekim 2026)
- https://atproto.com/guides/custom-feed-tutorial — Feed generator yazma (`describeFeedGenerator`, `getFeedSkeleton`) — (erişim: 15 Ekim 2026)
- https://atproto.com/specs/event-stream — Event stream (firehose) spesifikasyonu — (erişim: 15 Ekim 2026)
- https://atproto.com/specs/sync — Repo senkronizasyon spesifikasyonu — (erişim: 15 Ekim 2026)
- https://atproto.com/sdks — Resmî ve topluluk SDK listesi (.NET dahil) — (erişim: 15 Ekim 2026)
- https://github.com/bluesky-social/atproto/tree/main/lexicons — `com.atproto` lexicon'ları; `app.bsky` için `bluesky-social/bsky` deposuna yönlendirir — (erişim: 15 Ekim 2026)

Üçüncü taraf:

- https://github.com/bluesky-social/bsky-docs/issues/332 — `public.api.bsky.app` üzerinde kimliksiz `searchPosts` 403 raporu — (erişim: 15 Ekim 2026)
- https://ifttt.com/bluesky/actions/set_live_status — Bluesky canlı yayın durumunu Twitch'e göre ayarlama; "yalnızca Twitch destekleniyor" notu — (erişim: 15 Ekim 2026)
- https://newsletter.blueskydirectory.com/posts/bluesky-directory-issue-70-this-week-in-bluesky — Uygulamada otomatik hesapların kendini bot olarak etiketleyebilmesi — (erişim: 15 Ekim 2026)
