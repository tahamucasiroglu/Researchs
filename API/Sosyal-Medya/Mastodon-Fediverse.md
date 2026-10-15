# Mastodon ve Fediverse API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **aktif** (açık kaynak, sunucu başına bağımsız API; merkezî bir "Mastodon API anahtarı" yok)

## Özet

Mastodon, ActivityPub protokolüyle birbirine bağlanan bağımsız sunuculardan (instance) oluşan açık kaynak bir sosyal ağdır; her sunucu aynı REST API'yi (`/api/v1`, `/api/v2`), bir streaming API'yi (SSE + WebSocket), hesap/hashtag RSS akışlarını ve ActivityPub uç noktalarını kendi alan adında sunar. [RESMÎ] Geliştirici hesabı, başvuru ya da ücret yoktur: herhangi bir sunucuda `POST /api/v1/apps` ile uygulama kaydedilir, OAuth 2 ile token alınır. [RESMÎ] Kısıtlar sunucuya göre değişir: yönetici herkese açık zaman tünellerini kapatabilir, oturum zorunlu kılabilir (`timelines_access`, 4.5.0+), "secure mode" (`AUTHORIZED_FETCH`) veya "limited federation" açabilir. [RESMÎ] Güncel kararlı sürüm **4.7.x**: 4.7.0 20.08.2026'da çıktı, son yama 4.7.3 (01.10.2026). 4.6 hattı 4.6.9 ile (4.5 ve 4.4 hatları da) bakımda, 4.8 geliştirme aşamasında (mastodon.social 15.10.2026'da 4.8.0-alpha çalıştırıyor). [RESMÎ — GitHub releases; canlı kontrol] 4.7'de istemcileri ilgilendiren değişiklikler: doğrulanamayan uzak kullanıcı adları API'de `Account.invalid_handle` ile açıkça işaretleniyor; gelen/giden `Link` ekleri (FEP-8967) destekleniyor (önizleme kartı ilk `Link` ekinden alınıyor); giden HTTP Message Signatures (RFC 9421) eski taslağa yedek olarak gönderiliyor. [RESMÎ — v4.7.0 sürüm notları]

Pleroma/Akkoma, GoToSocial, Pixelfed gibi yazılımlar Mastodon istemci API'sinin büyük kısmıyla uyumludur; Misskey, PeerTube, Lemmy kendi API'lerini kullanır (aşağıda "Diğer Fediverse yazılımları").

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey; sunucu ayarına bağlı | Hesap gönderileri (`/api/v1/accounts/:id/statuses` — yalnız public gönderiler), public/local timeline (birçok büyük sunucuda kapalı; ör. mastodon.social'da 15.10.2026 itibarıyla token ile bile kapalı), hashtag timeline, trend linkleri, instance bilgisi, `@kullanici.rss`, `/tags/<etiket>.rss`, ActivityPub actor/featured (secure mode kapalıysa) [RESMÎ] | Ücretsiz; IP başına 300 istek / 5 dk [RESMÎ] |
| Uygulama token'ı (`client_credentials`) | `POST /api/v1/apps` + `POST /oauth/token` | Sunucu "oturum zorunlu" yaptıysa timeline uçları (`read:statuses`) [RESMÎ]. **Streaming için yetmez** (4.2.0'dan beri kullanıcı token'ı şart) [RESMÎ] | Ücretsiz |
| Kullanıcı token'ı (`authorization_code`, PKCE 4.3.0+) | Herhangi bir sunucuda bir hesap (bot hesabı olabilir) + OAuth onayı | Home/list timeline, takip etme, bildirimler, filtreler, hashtag takibi, **tüm streaming akışları**, Web Push, arama (`resolve=true`) [RESMÎ] | Ücretsiz; hesap başına 300 istek / 5 dk [RESMÎ] |
| Sunucu yöneticisi | Kendi sunucunu kurmak veya admin rolü | Admin webhook'ları (`status.created` vb.), Admin API, `timelines_access` ayarları [RESMÎ] | Sunucu barındırma maliyeti (kendi altyapın) |
| İşletme/uygulama onayı | **Yok** — App Review / Business Verification süreci bulunmaz [RESMÎ — belgelerde böyle bir süreç yok] | — | — |
| Ücretli/kurumsal | **Yok** — Mastodon API'si ücretli katman satmaz [RESMÎ — belgede ücret yok]. Barındırma için 3. taraf managed hosting (masto.host vb.) vardır [3. TARAF] | — | — |
| Resmî olmayan | HTML kazıma, ActivityPub üzerinden "relay"/takipçi sunucu, toplu tarama | Teknik olarak çok şey, ama sunucu kurallarına ve topluluk normlarına aykırı olabilir | Bkz. "Resmî olmayan yollar ve riskler" |

## Kimlik doğrulama

- **Uygulama kaydı:** `POST /api/v1/apps` (`client_name`, `redirect_uris`, `scopes`, `website`) → `client_id`, `client_secret`. Kayıt **her sunucu için ayrıdır**; takip uygulaması birden çok sunucuya bağlanacaksa her biri için ayrı kayıt tutulur. [RESMÎ]
- **Grant türleri:** `authorization_code` (kullanıcı adına) ve `client_credentials` (yalnızca uygulama). [RESMÎ]
- **PKCE:** 4.3.0'dan beri, yalnızca `S256`. [RESMÎ]
- **Keşif:** `GET /.well-known/oauth-authorization-server` (4.3.0+) desteklenen scope'ları ve uç noktaları verir; eski sunucular 404 döner. [RESMÎ]
- **OIDC userinfo:** `GET /oauth/userinfo` (4.4.0+, `profile` scope). [RESMÎ]
- **İptal:** `POST /oauth/revoke`. [RESMÎ]
- **Scope'lar:** `read`, `write`, `push`, `profile`, `admin:*` ve ayrıntılı alt scope'lar (`read:statuses`, `read:notifications`, `write:follows`…). `follow` scope'u 3.5.0'dan beri kullanımdan kalktı. [RESMÎ]
- Token `Authorization: Bearer <token>` başlığıyla gönderilir. `client_secret` ve `access_token` parola gibi saklanmalı, şifreli tutulmalıdır. [RESMÎ]
- **Sürüm algılama:** `GET /api/v2/instance` → `api_versions.mastodon` (4.3.0+; 4.6'da değeri 10, daha yeni sürümlerde daha büyük, ör. 4.8 alpha çalıştıran mastodon.social 15.10.2026'da 12 döndürüyor; 4.7'nin değeri blogda belgelenmemiş). Sürüm metnini ayrıştırmak yerine bu tamsayı kullanılır; özellik kontrolü eşitlikle değil `>=` ile yapılır. [RESMÎ + canlı kontrol]

## Temel uç noktalar

Tam liste: <https://docs.joinmastodon.org/methods/>

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/api/v2/instance` | Sunucu bilgisi, `configuration.urls.streaming`, `timelines_access`, `limited_federation`, `api_versions` | Kimliksiz | Bağlanmadan önce ilk çağrı olmalı [RESMÎ] |
| GET | `/api/v1/accounts/lookup?acct=kullanici@sunucu` | Kullanıcı adından hesap ID'si | Belgede kullanıcı token'ı (`read:accounts`) | 3.4.0+; WebFinger çözümlemesi yapmaz, yalnızca sunucunun bildiği hesaplar [RESMÎ] |
| GET | `/api/v2/search?q=...&resolve=true` | Uzak hesabı/gönderiyi WebFinger ile çözüp getirir | Kullanıcı token'ı (`resolve` için) | Başka sunucudaki hesabı takip listesine eklemek için [RESMÎ] |
| GET | `/api/v1/accounts/:id/statuses` | Bir hesabın gönderileri | Kimliksiz (yalnız public) / kullanıcı token'ı | `exclude_replies`, `exclude_reblogs`, `only_media`, `pinned`, `tagged`, `exclude_direct` (4.6+); `limit` maks. 40 [RESMÎ] |
| GET | `/api/v1/timelines/public` | Federe/yerel genel akış | Kimliksiz veya token (sunucu ayarına göre) | `local`, `remote`, `only_media`. Token yokken 401 (bazı sunucularda 422) dönebilir, token varken akış kapalıysa boş dizi gelir; ayrıntı aşağıda "Sunucu kısıtı algılama" satırında [RESMÎ + canlı kontrol] |
| GET | `/api/v1/timelines/tag/:hashtag` | Hashtag akışı | Kimliksiz veya token | `any[]`, `all[]`, `none[]` (her biri en fazla 4 etiket) — anahtar kelime/etiket filtrelemesi için ideal [RESMÎ] |
| GET | `/api/v1/timelines/link?url=...` | Trend bir makaleye link veren gönderiler | Kimliksiz veya token | 4.3.0+; yalnızca keşfedilebilirliği açık hesaplar [RESMÎ] |
| GET | `/api/v1/timelines/home` | Takip edilen hesap + hashtag akışı | Kullanıcı token'ı (`read:statuses`) | 206 = akış yeniden oluşturuluyor [RESMÎ] |
| GET | `/api/v1/timelines/list/:list_id` | Liste akışı | Kullanıcı token'ı (`read:lists`) | Takip edilenleri gruplara ayırmak için [RESMÎ] |
| POST | `/api/v1/accounts/:id/follow` | Hesabı takip et | Kullanıcı token'ı (`write:follows`) | `notify=true` → hesap her paylaşımda `status` bildirimi üretir (3.3.0+); `languages[]` (4.0.0+) [RESMÎ] |
| POST | `/api/v1/tags/:name/follow` | Hashtag takip et (home'a düşer) | Kullanıcı token'ı | 4.0.0+ [RESMÎ] |
| GET | `/api/v1/notifications` | Bildirimler (mention, status, follow, quote…) | Kullanıcı token'ı (`read:notifications`) | 4.6'da `supported_types` + `fallback` [RESMÎ] |
| GET/POST | `/api/v2/filters` | Sunucu tarafı anahtar kelime filtreleri (`hide`/`warn`/`blur`) | Kullanıcı token'ı | Akışlar zaten filtrelenmiş gelir [RESMÎ] |
| GET | `/api/v1/statuses/:id/context` | Bir gönderinin yanıt ağacı | Kimliksiz/token | 4.5+ eksik yanıtları arka planda getirir (`Mastodon-Async-Refresh` başlığı, deneysel) [RESMÎ] |
| GET | `/api/v1/trends/statuses`, `/trends/tags`, `/trends/links` | Sunucudaki trendler | Kimliksiz (sunucu ayarına bağlı) | [RESMÎ] |
| GET | `/api/v1/accounts/:id/collections` | Hesabın "Collections" (seçilmiş hesap listeleri) | Kimliksiz/token | **4.6.0+**. İlgili uçlar: `GET/PATCH/DELETE /api/v1/collections/:id`, `POST /api/v1/collections`, `/collections/:id/items`, `GET /api/v1/accounts/:id/in_collections` (hesabın yer aldığı koleksiyonlar). Bildirim tipleri: `added_to_collection`, `collection_update` [RESMÎ — 4.6 geliştirici yazısı] |
| GET | `/api/v1/instance/terms_of_service` | Sunucunun kullanım koşulları | Kimliksiz | 4.4+; otomasyon öncesi kontrol için [RESMÎ] |

## Gerçek zamanlı / bildirim

| Mekanizma | Nasıl | Seviye | Not |
|---|---|---|---|
| **Streaming – WebSocket** | `wss://<streaming-host>/api/v1/streaming` tek bağlantı; `{"type":"subscribe","stream":"hashtag","tag":"..."}` mesajlarıyla çoklu akış (3.3.0+) | Kullanıcı token'ı | Token `Authorization: Bearer` veya `Sec-WebSocket-Protocol` başlığında; `access_token` query parametresi eski ve önerilmez [RESMÎ] |
| **Streaming – SSE (HTTP)** | `GET /api/v1/streaming/user`, `/public`, `/public/local`, `/public/remote`, `/hashtag?tag=`, `/hashtag/local`, `/list?list=`, `/direct`, `/user/notification` | Kullanıcı token'ı | `:` ile başlayan satırlar heartbeat'tir [RESMÎ] |
| Streaming olayları | `update`, `delete`, `status.update` (düzenleme), `notification`, `conversation`, `filters_changed`, `announcement*`, `notifications_merged` | — | [RESMÎ] |
| Streaming sağlık | `GET /api/v1/streaming/health` → `OK` | Kimliksiz | [RESMÎ] |
| **Önemli değişiklik** | 4.2.0'dan beri public/local/remote/hashtag/list akışları ve WebSocket **kullanıcı token'ı ister**; public/app token çalışmaz | — | Eski blog yazılarındaki "kimliksiz public stream" bilgisi artık geçersiz [RESMÎ] |
| **Web Push** | `POST /api/v1/push/subscription` (token başına 1 abonelik); `alerts` = `mention`, `status`, `reblog`, `follow`, `follow_request`, `favourite`, `poll`, `update`, `quote`, `quoted_update`; `policy` = `all/followed/follower/none` | Kullanıcı token'ı (`push`) | `subscription[standard]=true` → RFC 8030/8291/8292 standart Web Push (4.4.0+); varsayılan eski taslak şifreleme. APNs/FCM'e doğrudan göndermez, relay gerekir [RESMÎ] |
| **Admin webhook'ları** | Yönetim > Webhooks: `account.created/approved/updated`, `report.created/updated`, `status.created/updated`; `X-Hub-Signature` imzası | Yalnızca kendi sunucunun yöneticisi | Yalnızca **o sunucuda** oluşan olaylar; başka sunucudaki hesapları izlemek için kullanılamaz [RESMÎ; kapsam yorumu TAHMİN] |
| **RSS** | `https://<sunucu>/@<kullanici>.rss`, `https://<sunucu>/tags/<etiket>.rss` | Kimliksiz | RSS 2.0; mastodon.social örneğinde son 20 gönderi, boost yok, `title` alanı yok, `media:content` + `category` var [3. TARAF + 15.10.2026 canlı kontrol]. Resmî dokümanda ayrı sayfası **belgede yok** |
| WebSub | — | — | Mastodon RSS için WebSub hub ilanı **belgede yok** [TAHMİN: yok] — RSS'te yoklama (polling) gerekir |
| **ActivityPub** | Kendi sunucunu (veya hafif bir ActivityPub aktörü) kurup hedef hesabı **takip edersen** yeni gönderiler `Create`/`Update`/`Delete`/`Announce` aktiviteleri olarak inbox'ına **itilir** (push) | Kendi aktörün/sunucun | Gerçek "webhook" eşdeğeri budur; HTTP Signatures gerekir: birincil biçim cavage-12 taslağı; RFC 9421 gelen imzalarda 4.5+ kabul ediliyor, giden imzalarda 4.7.0+ yalnızca yedek olarak gönderiliyor; 4.7'de Ed25519 imza desteği ve FEP-8b32 Object Integrity Proofs doğrulaması eklendi [RESMÎ — v4.7.0 sürüm notları] |

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Belirli hesabın yeni gönderisi | Evet | (1) Bot hesabıyla takip + `notify=true` → `user:notification` stream'inde `status` bildirimi; (2) `user` stream'i (home); (3) RSS/`accounts/:id/statuses` yoklama (`since_id`) | Kullanıcı token'ı / kimliksiz (RSS) | En verimlisi tek WebSocket + home/list stream. Uzak hesaplar bot hesabının sunucusu üzerinden federasyonla gelir [RESMÎ] |
| Çok sayıda hesabı gruplamak | Evet | Lists API + `list` stream | Kullanıcı token'ı | Kategori bazlı filtreleme (ör. "haber", "geliştirici") [RESMÎ] |
| Hashtag / anahtar kelime | Kısmen | `hashtag` stream veya `timelines/tag` (`any/all/none`); serbest metin anahtar kelime için kendi filtren | Kullanıcı token'ı (stream) / kimliksiz (REST, sunucuya bağlı) | Gönderilerde tam metin arama kullanıcı token'ı (`read:search`) ve sunucuda Elasticsearch/OpenSearch gerektirir; kimliksiz `v2/search` (4.0.0+) yalnızca hesap ve hashtag arar, `resolve` ve `offset` kullanılamaz. Sonuçlar hesapların arama iznine (`indexable`) de bağlı [RESMÎ; `indexable` ayrıntısı TAHMİN] |
| Gönderi düzenlendi / silindi | Evet | `status.update`, `delete` stream olayları | Kullanıcı token'ı | [RESMÎ] |
| Yanıtlar / yorumlar | Evet | `statuses/:id/context` (4.5+ eksik yanıt getirme) | Kimliksiz/token | Federasyon gecikmesi nedeniyle tam olmayabilir [RESMÎ] |
| Alıntı (quote) | Evet | `quote` bildirim tipi, `Quote` entity (4.5+) | Kullanıcı token'ı | [RESMÎ] |
| Canlı yayın başladı | Mastodon'da **yok** | Mastodon'da canlı yayın özelliği yok; PeerTube'da var (`/api/v1/videos/live`, kanal RSS'i) | PeerTube API | [RESMÎ — PeerTube dokümanı] |
| Özel mesaj / grup içeriği | Yalnızca kendi hesabın | `direct` stream / Conversations API | Kullanıcı token'ı | Başkalarının DM'leri erişilemez [RESMÎ] |
| Bütün Fediverse'i dinlemek | Pratikte hayır | Her sunucu yalnızca **bildiği** içeriği verir; `public` stream o sunucunun federe olduğu kısmıdır | — | Hiçbir sunucu tam görünüm vermez [TAHMİN]. **Dikkat:** mastodon.social canlı akışları tamamen kapatmış (`timelines_access.live_feeds.local/remote = disabled`, 15.10.2026 canlı kontrol), bu yüzden orada public/local timeline ve public stream token ile bile çalışmıyor; hashtag akışları açık. Büyük sunucularda public stream/timeline yöntemleri çalışmayabilir; hashtag ve hesap takibi ile listeler tercih edilmeli [RESMÎ — sunucu API çıktısı] |
| Sunucu kısıtı algılama | Evet | `GET /api/v2/instance` → `configuration.timelines_access.{live_feeds\|hashtag_feeds\|trending_link_feeds}.{local\|remote}` (4.5.0+) = `public` / `authenticated` / `disabled`. Yerel ve uzak içerik ayrı ayrı ayarlanır; `hashtag_feeds.local` ve `trending_link_feeds.local` `disabled` olamaz. `disabled` akışı yalnızca "View live and topic feeds" yetkili kullanıcılar (moderatörler) okuyabilir | Kimliksiz | Token yokken 401 dönerse (bazı sunucular 422 döndürüyor; mastodon.social 15.10.2026: `{"error":"This method requires an authenticated user"}`) ya oturum gerekiyordur ya da akış kapalıdır. Token varken 200 ve boş dizi geliyorsa akış kapalıdır. Kesin durumu `timelines_access` gösterir [RESMÎ + canlı kontrol] |

**Önerilen mimari [TAHMİN]:** Takip için ayrı bir bot hesabı (bot bayrağı açık) → izlenecek hesapları takip et (`notify=true`) ve listelere ayır → tek WebSocket bağlantısıyla `user` + `list` akışlarına abone ol → kendi filtre motorunda ayıkla. Hesap açmak istemeyen kaynaklar için RSS yoklama yedek yöntem.

## Hız sınırları ve fiyatlar

| Kapsam | Limit | Kaynak |
|---|---|---|
| Hesap başına, tüm uçlar | 300 istek / 5 dk | [RESMÎ] |
| IP başına, tüm uçlar | 300 istek / 5 dk | [RESMÎ] |
| Medya yükleme (`POST /api/v1/media`) | 30 / 30 dk | [RESMÎ] |
| Silme + unreblog (ortak) | 30 / 30 dk | [RESMÎ] |
| Hesap oluşturma (IP) | 5 / 30 dk | [RESMÎ] |

- Başlıklar: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`; birden çok limit çakışırsa en yakın olanı gösterilir. [RESMÎ]
- Bunlar **varsayılan** değerlerdir; yöneticiler değiştirebilir, Pleroma/GoToSocial farklı limit uygular. Resmî sayfa en son 2022'de güncellenmiştir. [RESMÎ; güncellik ÇELİŞKİLİ değil ama eski]
- Sayfalama: `limit` varsayılan 20, maks. 40; `max_id`, `since_id`, `min_id`; `Link` başlığı. [RESMÎ]
- **Ücret: yoktur.** [RESMÎ — belgede ücretli katman yok]

## Resmî olmayan yollar ve riskler

- **Sunucu kuralları her şeydir.** Her sunucunun kendi kuralları/koşulları vardır; otomasyondan önce `GET /api/v1/instance/rules` ve `/api/v1/instance/terms_of_service` kontrol edilmelidir. [RESMÎ]
- **mastodon.social koşulları — [ÇELİŞKİLİ]:** Haziran 2025'te mastodon.social/mastodon.online koşullarına AI eğitimi ve bot/kazıyıcı ile veri toplama yasağı eklendiği haberleri çıktı (1 Temmuz 2025 yürürlük) [3. TARAF — TechCrunch, The Register]; bir kısım koşulların topluluk tepkisiyle geri çekildiği de bildirildi [3. TARAF]. 15.10.2026'da API'den okunan güncel metin (yürürlük 31.08.2026) kazıma/AI eğitimi maddesi **içermiyor**, içeriğin RSS okuyucularca erişilebileceğini kabul ediyor [RESMÎ — sunucu API çıktısı]. Yine de diğer sunucular farklı kural koyabilir.
- **HTML kazıma:** Gereksizdir (API ve RSS var); 4.0+ web arayüzü zaten API'den beslenir. `DISALLOW_UNAUTHENTICATED_API_ACCESS` açık sunucularda kimliksiz erişim tamamen kapanır. [RESMÎ]
- **Toplu tarama / arama motoru kurma:** Fediverse topluluğu rızasız indekslemeye çok hassastır; geçmişte arama/arşiv projeleri sunucuların toplu engellemesiyle (defederasyon, IP/domain block) karşılaştı. Hesapların `discoverable`/`indexable` (arama izni) tercihlerine uymak beklenir. [3. TARAF; `indexable` alanı RESMÎ Account entity'de]
- **Kendi ActivityPub sunucusu/relay ile dinleme:** Meşru bir yöntemdir ama yöneticiler sunucunu engelleyebilir; `AUTHORIZED_FETCH` (secure mode) açık sunucular imzasız getirmeyi reddeder. [RESMÎ]
- **Hukuki:** Gönderiler kişisel veri içerebilir; AB/Türkiye'de (GDPR/KVKK) toplu saklama ve profil çıkarma için hukuki dayanak gerekir. [TAHMİN — hukuki görüş değildir]

## Diğer Fediverse yazılımları

| Yazılım | API | Gerçek zamanlı | Not |
|---|---|---|---|
| Pleroma / Akkoma | Mastodon uyumlu + kendi uzantıları | Mastodon streaming uyumlu | [3. TARAF] |
| GoToSocial | Mastodon istemci API'sinin alt kümesi | WebSocket streaming | Varsayılan olarak kimliksiz public timeline kapalı [TAHMİN] |
| Pixelfed | Mastodon uyumlu API | — | Fotoğraf odaklı [3. TARAF] |
| Misskey (ve Sharkey vb. fork'lar) | Kendi API'si (MiAuth/OAuth), çoğu uç POST | WebSocket kanalları: `globalTimeline`, `homeTimeline`, `hybridTimeline`, `localTimeline`, `main` | [RESMÎ — misskey-hub.net] |
| PeerTube | Kendi REST API'si | Kanal RSS: `/feeds/videos.xml?videoChannelId=...`; **canlı yayın** uçları var | Fediverse'te canlı yayın takibi için tek yaygın seçenek [RESMÎ — PeerTube dokümanı] |
| Lemmy | Kendi REST API'si | — | Reddit benzeri forum [3. TARAF] |
| Threads, Bluesky (köprü) | Threads'in fediverse paylaşımı açan hesapları ActivityPub'dan takip edilebilir; Bluesky ↔ Fediverse köprüsü Bridgy Fed | ActivityPub üzerinden | Ayrıntılar ilgili platform dosyalarında [3. TARAF] |

## SDK ve kütüphaneler

Resmî SDK **yoktur**; resmî dokümanda topluluk kütüphaneleri listelenir (güncelliği kendin kontrol et). [RESMÎ]

| Dil | Kütüphane | Not |
|---|---|---|
| .NET / C# | [Mastonet](https://github.com/glacasa/Mastonet) | NuGet 3.1.3 (27.04.2025), .NET 6 / .NET Standard 2.0; streaming destekli. 4.0.0-preview0 (2024) [RESMÎ liste + NuGet] |
| .NET / C# | TootNet, Mastodot, MastodonAPI, Mastodon.Net | Daha az bakımlı [TAHMİN] |
| Python | [Mastodon.py](https://github.com/halcy/Mastodon.py) | En kapsamlı; streaming dahil [3. TARAF] |
| JS/TS | [masto.js](https://github.com/neet/masto.js), [megalodon](https://github.com/h3poteto/megalodon) | megalodon Misskey/Pleroma'yı da kapsar [RESMÎ liste] |
| Go | [go-mastodon](https://github.com/mattn/go-mastodon) | [RESMÎ liste] |
| Java/Kotlin | [BigBone](https://github.com/PattaFeuFeu/bigbone) | [RESMÎ liste] |
| Rust | megalodon-rs, mastodon-async | [RESMÎ liste] |
| ActivityPub sunucu çatısı | Fedify (TS), ActivityPub-Federation (Rust); .NET için olgun hazır çatı sınırlı | [TAHMİN] |

## Postman / OpenAPI / koleksiyonlar

- **Resmî OpenAPI yok** — Mastodon projesi bakım yükü gerekçesiyle büyük bir OpenAPI tanımını kabul etmedi; resmî biçimsel şema hâlâ planlanma aşamasında. [3. TARAF — Microsoft Azure SDK blog, DEV Community]
- **[abraham/mastodon-openapi](https://github.com/abraham/mastodon-openapi)** — Dokümandan otomatik üretilen OpenAPI 3.1 şeması, haftalık yenilenir; 4.7 için güncellendiği bildirildi. Postman'e içe aktarılabilir. [3. TARAF, resmî değil]
- APIs.guru'daki eski Mastodon şeması güncel değil. [3. TARAF]
- Misskey sunucuları `/api-doc` altında OpenAPI sunar [TAHMİN — belgede doğrulanmadı]; PeerTube resmî OpenAPI dosyası yayınlar. [RESMÎ — PeerTube dokümanında "Download OpenAPI specification"]

## Depoda ilgili sayfalar

- [API/Sosyal-Medya](./) — diğer sosyal medya API dosyaları (Bluesky, Threads, X…) aynı klasörde.
- [Rehberler/Mesajlasma-Altyapilari](../../Rehberler/Mesajlasma-Altyapilari/) — Telegram, WhatsApp, BiP, SMS API'leri.

## Kaynaklar

**Resmî**
- <https://docs.joinmastodon.org/methods/streaming/> — Streaming API (SSE, WebSocket, 4.2.0 token değişikliği) — (erişim: 15 Ekim 2026)
- <https://docs.joinmastodon.org/methods/timelines/> — Timeline uçları ve 4.5.0 erişim ayarları — (erişim: 15 Ekim 2026)
- <https://docs.joinmastodon.org/methods/accounts/> — Hesap uçları (statuses, lookup, follow `notify`) — (erişim: 15 Ekim 2026)
- <https://docs.joinmastodon.org/api/rate-limits/> — Hız sınırları — (erişim: 15 Ekim 2026)
- <https://docs.joinmastodon.org/entities/Instance/> — `timelines_access`, `urls.streaming`, `api_versions` — (erişim: 15 Ekim 2026)
- <https://docs.joinmastodon.org/methods/oauth/> — OAuth, PKCE, userinfo — (erişim: 15 Ekim 2026)
- <https://docs.joinmastodon.org/client/token/> — Uygulama kaydı ve token alma — (erişim: 15 Ekim 2026)
- <https://docs.joinmastodon.org/methods/push/> — Web Push aboneliği — (erişim: 15 Ekim 2026)
- <https://docs.joinmastodon.org/admin/webhooks/> — Admin webhook'ları — (erişim: 15 Ekim 2026)
- <https://docs.joinmastodon.org/admin/config/> — `AUTHORIZED_FETCH`, `LIMITED_FEDERATION_MODE`, `DISALLOW_UNAUTHENTICATED_API_ACCESS` — (erişim: 15 Ekim 2026)
- <https://docs.joinmastodon.org/spec/activitypub/> — Mastodon'un ActivityPub uygulaması — (erişim: 15 Ekim 2026)
- <https://docs.joinmastodon.org/client/libraries/> — Topluluk kütüphaneleri listesi — (erişim: 15 Ekim 2026)
- <https://blog.joinmastodon.org/2025/10/mastodon-4-5-for-devs/> — 4.5 geliştirici değişiklikleri — (erişim: 15 Ekim 2026)
- <https://blog.joinmastodon.org/2026/06/mastodon-4-6-for-devs/> — 4.6 geliştirici değişiklikleri (Collections, API v10) — (erişim: 15 Ekim 2026)
- <https://github.com/mastodon/mastodon/releases> — Sürüm listesi (v4.7.3, v4.6.9: 01.10.2026) — (erişim: 15 Ekim 2026)
- <https://github.com/mastodon/mastodon/releases/tag/v4.7.0> — 4.7.0 sürüm notları (20.08.2026; `invalid_handle`, FEP-8967, RFC 9421 yedek gönderim, Ed25519, FEP-8b32) — (erişim: 15 Ekim 2026)
- <https://docs.joinmastodon.org/methods/search/> — Arama; kimliksiz kullanımda tam metin arama yok — (erişim: 15 Ekim 2026)
- <https://docs.joinmastodon.org/entities/Notification/> — Bildirim tipleri (`added_to_collection`, `collection_update`) — (erişim: 15 Ekim 2026)
- <https://mastodon.social/api/v2/instance> — Canlı kontrol: `timelines_access.live_feeds` = disabled, `api_versions.mastodon` = 12 — (erişim: 15 Ekim 2026)
- <https://mastodon.social/api/v1/instance/terms_of_service> — mastodon.social güncel koşulları (yürürlük 31.08.2026) — (erişim: 15 Ekim 2026)
- <https://misskey-hub.net/en/docs/for-developers/api/> — Misskey API — (erişim: 15 Ekim 2026)
- <https://docs.joinpeertube.org/api/rest-reference.html> — PeerTube REST API (canlı yayın, RSS) — (erişim: 15 Ekim 2026)
- <https://www.nuget.org/packages/Mastonet> — Mastonet NuGet paketi — (erişim: 15 Ekim 2026)

**3. taraf**
- <https://github.com/abraham/mastodon-openapi> — Gayriresmî OpenAPI şeması — (erişim: 15 Ekim 2026)
- <https://techcrunch.com/2025/06/17/mastodon-updates-its-terms-to-prohibit-ai-model-training/> — 2025 koşul değişikliği haberi — (erişim: 15 Ekim 2026)
- <https://www.theregister.com/2025/06/18/mastodon_says_no_to_ai/> — Aynı konu — (erişim: 15 Ekim 2026)
- <https://rssboard.org/news/211/every-mastodon-user-has-rss-feed> — Mastodon RSS akış biçimi — (erişim: 15 Ekim 2026)
- <https://devblogs.microsoft.com/azure-sdk/describing-a-real-api-with-cadl-the-moostodon-story/> — Mastodon ve OpenAPI tartışması — (erişim: 15 Ekim 2026)
