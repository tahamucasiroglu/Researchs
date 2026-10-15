# X (Twitter) API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **aktif (ücretli, kullandıkça öde)**

## Özet

X, gönderi okuma/arama, kullanıcı bilgisi, Spaces, DM ve gerçek zamanlı olay akışı için **X API v2**'yi sunuyor; v1.1 yalnızca sınırlı destekle (bazı medya yükleme uçları vb.) yaşıyor [RESMÎ]. Yeni geliştiriciler için varsayılan model kredi tabanlı **pay-per-use**: Developer Console'dan kredi satın alınır, her istek/dönen kaynak başına ücret düşülür; abonelik, sözleşme veya asgari harcama yoktur [RESMÎ]. Model genel kullanıma Şubat 2026'da açıldı [3. TARAF — MediaNama; resmî sayfalarda başlangıç tarihi yok]. Eski Free / Basic ($200/ay) / Pro ($5.000/ay) planları yeni kayıtlara kapalı; Basic ve Pro aboneleri 2026'da otomatik olarak pay-per-use'a taşındı [3. TARAF]. Takip uygulaması için en kritik yenilik, herkese açık olaylar (yeni gönderi, canlı yayın başladı/bitti, profil değişikliği) için uygulama yetkisiyle abone olunabilen **X Activity API (XAA)**'dir [RESMÎ].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | — | Resmî API'de kimliksiz erişim yok. Yalnızca gömme (embed) araçları (publish.x.com) var [RESMÎ]. | — |
| Geliştirici hesabı + uygulama (pay-per-use) | Onaylı geliştirici hesabı, Developer Console'da Project + App, kredi yüklemek için ödeme yöntemi [RESMÎ] | v2'nin neredeyse tamamı: recent ve full-archive arama, zaman tünelleri, kullanıcı arama, Spaces, filtered stream (1 bağlantı, 1.000 kural), X Activity API (1.500 abonelik), Account Activity API (3 abonelik, 1 webhook) [RESMÎ] | Kaynak başına ücret (aşağıdaki tablo). Ayda **3 milyon gönderi okuma** tavanı [RESMÎ]. Bazı 3. taraf kaynaklar 2 milyon diyor [ÇELİŞKİLİ — resmî sayfa 3 milyon] |
| Kullanıcı yetkisi (OAuth, kullanıcının onayı) | Kullanıcının uygulamana OAuth 2.0 PKCE / OAuth 1.0a ile izin vermesi + ilgili scope [RESMÎ] | Özel olaylar: mention/reply/quote/repost, beğeni, DM ve XChat, takip edilenlerin ters kronolojik ana akışı, yayın sohbeti (`broadcast.read`) [RESMÎ] | Pay-per-use fiyatları; kullanıcının **kendi** verisi "owned read" olarak $0,001/kaynak [RESMÎ] |
| İşletme / partner | X ile anlaşma | `news.new` olayı (XAA) yalnızca Enterprise ve Partner; XAA'da Partner için 150.000 abonelik [RESMÎ] | Fiyat belgede yok |
| Ücretli / kurumsal (Enterprise) | Satış ekibiyle sözleşme | 3 milyon/ay üstü okuma, özel hız sınırları, filtered stream'de 25.000+ kural, 2.048 karakter kural uzunluğu ve çoklu bağlantı, `embedding:` (anlamsal) operatörü (yalnızca Embedding tier erişimi içeren Enterprise planlarda), XAA'da 75.000 abonelik, AAA'da 5.000+ abonelik [RESMÎ] | Fiyat yayımlanmıyor [RESMÎ]. 3. taraf kaynaklarda aylık on binlerce dolardan başladığı yazıyor [3. TARAF / TAHMİN] |
| Eski planlar (Free / Basic / Pro) | Yalnızca eski aboneler | — | Free tier Şubat 2026'da yeni kayıtlara kapandı [3. TARAF]. Basic → pay-per-use geçişi 1 Haziran 2026 sonrası, Pro → 1 Eylül 2026 sonrası fatura dönemi sonunda [3. TARAF]. Resmî fiyat sayfası bu planlardan hiç söz etmiyor [RESMÎ — "belgede yok"] |
| Resmî olmayan | X hesabı çerezleri (auth_token, ct0) veya guest token | Web istemcisinin iç GraphQL uçları (arama, zaman tüneli, profil) | Ücretsiz ama **ToS ihlali**; ayrıntı "Resmî olmayan yollar" bölümünde |

**Ücretsiz kredi** [RESMÎ]: İlk uygun ödeme kartı kaydedildiğinde $20 X API kredisi; ilk başarılı otomatik yükleme (auto-recharge) $50'a kadar ücretsiz krediyle eşlenir. Ayrıca fatura dönemindeki toplam X API harcamasına göre, bağlanmış xAI ekibine xAI kredisi iade edilir ($0–199: %0, $200–499: %10, $500–999: %15, $1.000+: %20; harcama her dönem sıfırlanır).

## Kimlik doğrulama

| Yöntem | Ne için | Not |
|---|---|---|
| OAuth 2.0 App-only (Bearer Token) | Herkese açık verileri okuma: arama, zaman tüneli, kullanıcı, Spaces, filtered stream, XAA herkese açık olaylar, webhook yönetimi [RESMÎ] | Takip uygulamasının ana yolu |
| OAuth 2.0 Authorization Code + PKCE | Kullanıcı adına işlem, özel veriler | Authorize: `https://x.com/i/oauth2/authorize`, token: `https://api.x.com/2/oauth2/token`. Erişim token'ı varsayılan **2 saat** geçerli; `offline.access` scope'u ile refresh token verilir [RESMÎ] |
| OAuth 1.0a User Context | Eski tip kullanıcı adına erişim | v1.1 medya yükleme gibi eski uçlarda hâlâ gerekli olabilir [RESMÎ] |
| HTTP Basic | Bazı Enterprise API'ler [RESMÎ] | — |

Önemli scope'lar: `tweet.read`, `users.read`, `follows.read`, `space.read`, `like.read`, `list.read`, `dm.read`, `mute.read`, `block.read`, `bookmark.read`, `broadcast.read`, `offline.access` ve yazma karşılıkları [RESMÎ].

## Temel uç noktalar

Taban adres: `https://api.x.com/2` [RESMÎ]. Hız sınırları 15 dakikalık penceredir (uygulama / kullanıcı başına) [RESMÎ].

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/2/tweets/search/recent` | Son 7 günde arama | Tüm geliştiriciler | 450/app, 300/user; 100 sonuç/istek; sorgu 512 karakter (Enterprise 4.096) [RESMÎ] |
| GET | `/2/tweets/search/all` | Tam arşiv arama (Mart 2006'dan beri) | Pay-per-use + Enterprise | 300/app (15 dk) + 1 istek/sn (app ve user); 500 sonuç/istek; sorgu 1.024 karakter [RESMÎ] |
| GET | `/2/tweets/counts/recent` · `/2/tweets/counts/all` | Sorguya uyan gönderi sayısı (zaman serisi) | Pay-per-use | $0,005 / $0,010 istek başı [RESMÎ] |
| GET | `/2/users/:id/tweets` | Kullanıcının gönderileri | App veya user | En fazla son **3.200** gönderi; `exclude=retweets,replies`, `since_id`, `start_time`; 10.000/app, 900/user [RESMÎ] |
| GET | `/2/users/:id/mentions` | Kullanıcıdan bahseden gönderiler | App veya user | En fazla son 800; 450/app, 300/user [RESMÎ] |
| GET | `/2/users/:id/timelines/reverse_chronological` | Takip edilenlerin kronolojik akışı | Yalnızca user context | Son 3.200 gönderi / 7 gün; 180/user (15 dk) [RESMÎ] |
| GET | `/2/users/by/username/:username` · `/2/users` | Kullanıcı adı → ID, toplu kullanıcı | App veya user | 300/app, 900/user [RESMÎ] |
| GET | `/2/tweets/search/stream` | Filtered stream (kurallara uyan gönderiler, canlı) | Pay-per-use + Enterprise | 1 bağlantı, 1.000 kural, kural 1.024 karakter (Enterprise: 25.000+ kural, 2.048 karakter, çoklu bağlantı) [RESMÎ]. Saniye başına gönderi sınırı belgede yok [RESMÎ — "belgede yok"] |
| GET/POST | `/2/tweets/search/stream/rules` | Stream kurallarını listele/ekle/sil | Aynı | 450 / 100 istek per 15 dk [RESMÎ] |
| GET | `/2/spaces/by/creator_ids` | Belirli kişilerin canlı/planlı Space'leri | App veya user | 300/15 dk + 1 istek/sn [RESMÎ] |
| GET | `/2/spaces/search` | Anahtar kelimeyle Space ara | App veya user | 300/15 dk [RESMÎ] |
| GET | `/2/spaces/:id` · `/2/spaces` | Space ayrıntısı | App veya user | Space bitince uç hata döner [RESMÎ] |
| GET | `/2/activity/stream` | XAA olaylarını kalıcı HTTP akışıyla al | Geliştirici hesabı | — [RESMÎ] |
| POST/GET/PUT/DELETE | `/2/activity/subscriptions[/:id]` | XAA abonelik yönetimi | Geliştirici hesabı | Self-serve 1.500 abonelik; abonelik başına 8 niteleyici [RESMÎ] |
| POST/GET/PUT/DELETE | `/2/webhooks[/:id]` | Webhook kaydı ve CRC doğrulaması | App-only Bearer | [RESMÎ] |
| POST | `/2/account_activity/webhooks/:webhook_id/subscriptions/all` | AAA kullanıcı aboneliği | Pay-per-use: 3 abonelik | AAA kullanımdan kalkıyor [RESMÎ] |

Tam liste: [API Reference](https://docs.x.com/x-api/introduction) ve [OpenAPI](https://api.x.com/2/openapi.json).

Arama/stream operatör örnekleri [RESMÎ]: `from:kullaniciadi`, `has:links`, `has:images`, `has:video_link` (doğal X videosu), `has:media` (fotoğraf/GIF/video), `has:mentions`, `-is:retweet`, `lang:tr`, `conversation_id:`, `in_reply_to_tweet_id:`, `quotes_of_tweet_id:`, `retweets_of_tweet_id:`. `is:retweet`, `is:reply`, `is:quote`, `lang:` ve `has:*` operatörleri **tek başına kullanılamaz** (conjunction-required); yanlarında bir anahtar kelime veya `from:` gibi bağımsız (standalone) bir operatör olmalı [RESMÎ]. Örnek takip kuralı: `(from:hesap1 OR from:hesap2) -is:retweet -is:reply`.

## Gerçek zamanlı / bildirim

| Mekanizma | Ne verir | Nasıl |
|---|---|---|
| **X Activity API (XAA)** — önerilen | `post.create`, `post.delete`, `post.mention.create`, `post.reply.create`, `post.quote.create`, `post.repost.create`, `like.create`, `follow.*`, `profile.update.*` (bio, foto, kullanıcı adı, doğrulama rozeti…), `spaces.start/end`, `broadcast.start/end`, `broadcast.chat`, `broadcast.chat.remove`, `subscriptions.subscribe/unsubscribe`, `chat.*` (şifreli XChat), `dm.*`, `mute.*`, `block.*`, `news.new`, `oauth.revoke` [RESMÎ] | Abonelik oluştur (`event_type` + `filter.user_id` / `keyword` / `direction` / `post_id`), olayları webhook'a POST veya `GET /2/activity/stream` akışından al. `expires_at` ile süreli abonelik [RESMÎ] |
| **Filtered stream** | Kurallara (anahtar kelime, `from:`, dil, medya…) uyan tüm herkese açık gönderiler | Uzun ömürlü HTTP bağlantısı; kopmalara karşı yeniden bağlanma gerekir (XDK otomatik yapıyor) [RESMÎ] |
| **Account Activity API (AAA)** | Yetki veren kullanıcının hesabındaki olaylar (gönderi, mention, beğeni, takip, DM…) | Webhook; **kullanımdan kaldırılıyor, yerini XAA alıyor** [RESMÎ]. Replay işi ile kaçırılan olaylar yeniden istenebilir [RESMÎ] |
| **Webhook güvenliği** | — | HTTPS, port yok, herkese açık URL. CRC: X GET ile `crc_token` gönderir, OAuth 2.0 client secret ile (yalnızca OAuth 1.0 kullanan eski entegrasyonlarda OAuth 1.0 consumer secret ile) HMAC-SHA256 `response_token` dönülür; kayıtta, `PUT /2/webhooks/{id}` ile elle ve periyodik olarak tekrarlanır. Periyot belgede çelişkili: doğrulama bölümünde "24 saattir doğrulanmamışsa 30 dakikada bir", güvenlik bölümünde "saatlik" [ÇELİŞKİLİ]. 28 saat başarısızsa webhook geçersiz. Olaylara 10 sn içinde 200 dön; imza başlığı `X-Twitter-Webhooks-Signature-OAuth2` (eski: `X-Twitter-Webhooks-Signature`) [RESMÎ] |
| RSS / WebSub | Resmî RSS yok [RESMÎ — belgede yok]. Nitter gibi 3. taraf RSS köprüleri büyük ölçüde kapandı/kararsız [3. TARAF] | — |

**Herkese açık / özel ayrımı (XAA):** Profil güncellemeleri, `post.create`/`post.delete` ve `broadcast.start`/`broadcast.end` **herkese açık** olaylardır; herhangi bir kullanıcının ID'siyle app-only yetkiyle abone olunur. Mention, reply, quote, repost, beğeni, DM, chat, mute/block, yayın sohbeti (`broadcast.chat`, `broadcast.chat.remove` — `broadcast.read`) ve abonelik (`subscriptions.subscribe/unsubscribe` — `follows.read`) olayları **özel**dir; yalnızca uygulamana OAuth ile izin veren kullanıcılar için alınır. Korumalı (protected) hesapların gönderileri hiç gelmez [RESMÎ]. `spaces.start/end`, `follow.follow/unfollow`, `chat.conversation_join`, `news.new` ve `oauth.revoke` olaylarının hangi gruba girdiği belgede belirtilmemiş [RESMÎ — "belgede yok"]; `follow.*` muhtemelen yalnızca izin veren kullanıcı için alınır [TAHMİN].

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Belirli bir hesabın yeni gönderisi | Evet | XAA `post.create` + `filter.user_id` (webhook/stream); alternatif: filtered stream `from:` kuralı; yedek: `/2/users/:id/tweets?since_id=` yoklaması | Pay-per-use, app-only | Olay başı $0,005 [RESMÎ]. Self-serve 1.500 abonelik = ~1.500 hesap/olay türü |
| Canlı video yayın başladı/bitti | Evet | XAA `broadcast.start` / `broadcast.end` (herkese açık olay) | Pay-per-use | Belge "live broadcast" diyor; video olduğu açıkça yazmıyor [RESMÎ]. Ücreti fiyat sayfasında ayrıca listelenmemiş ["belgede yok"] |
| Space (sesli canlı yayın) başladı | Evet | XAA `spaces.start` / `spaces.end`; yedek: `/2/spaces/by/creator_ids` yoklaması (`state=live`) | Pay-per-use | Olay başı $0,005 [RESMÎ] |
| Profil değişikliği (ad, kullanıcı adı, bio, rozet) | Evet | XAA `profile.update.*` | Pay-per-use | $0,005/olay [RESMÎ] |
| Anahtar kelime / konu filtreleme | Evet | Filtered stream kuralları (1.000 kural); geçmiş için recent/full-archive arama | Pay-per-use; anlamsal (`embedding:`) filtre yalnızca Enterprise | Dönen her gönderi $0,005; 24 saatlik tekilleştirme [RESMÎ] |
| Haber/gündem olayları | Kısıtlı | XAA `news.new` + `keyword` | Yalnızca Enterprise/Partner [RESMÎ] | — |
| Gönderiye gelen yanıt/alıntı/repost | Kısmen | Herkese açık hesap için arama veya stream kuralı: yanıtlar `conversation_id:` / `in_reply_to_tweet_id:`, alıntılar `quotes_of_tweet_id:`, repostlar `retweets_of_tweet_id:` [RESMÎ]; XAA `post.reply.create` vb. yalnızca izin veren kullanıcı için | Pay-per-use | — |
| Mention (bahsetme) | Kendi/izin veren hesap: Evet; başkası: arama ile | XAA `post.mention.create` (özel) veya `@kullanici` arama/stream kuralı | Pay-per-use | — |
| DM / grup sohbeti | Yalnızca izin veren kullanıcı | XAA `dm.received`, `chat.received` (`conversation_type=group`) | Pay-per-use + OAuth | $0,010/olay [RESMÎ] |
| Takip/takipten çıkma | Muhtemelen yalnızca izin veren kullanıcı [TAHMİN] | XAA `follow.follow/unfollow` | Pay-per-use (+ muhtemelen OAuth) | Olayın herkese açık/özel sınıfı belgede yok [RESMÎ — "belgede yok"]; $0,010/olay [RESMÎ] |
| Korumalı (protected) hesap içeriği | Hayır (izin olmadan) | — | — | Herkese açık olaylarda bile gelmez [RESMÎ] |

**Önerilen mimari [TAHMİN]:** Takip listesindeki hesaplar için kullanıcı adını bir kez `/2/users/by/username` ile ID'ye çevir → her ID için XAA aboneliği (`post.create`, `broadcast.start`, `spaces.start`) → olayları webhook ile al → kendi filtre katmanında (anahtar kelime, dil, repost hariç) önem sırası belirle. Konu bazlı izleme için ek olarak filtered stream kuralları. Webhook kaçırmalarına karşı periyodik `since_id` yoklaması.

## Hız sınırları ve fiyatlar

**Okuma (dönen kaynak başına)** [RESMÎ, docs.x.com pricing, 15.10.2026]:

| Kaynak | Ücret |
|---|---|
| Post | $0,005 |
| User | $0,010 |
| DM Event | $0,010 |
| Following/Followers | $0,010 |
| List / Space / Community / Note | $0,005 |
| Like / Mute / Block | $0,001 |
| Profile Update | $0,005 |
| Owned read (kendi verin) | $0,001 |

**Yazma (istek başına)** [RESMÎ]: Post oluşturma $0,015; **URL içeren post $0,200** (Nisan 2026'da eklendi [3. TARAF]); summoned post $0,010; DM/etkileşim $0,015; silme $0,010; Counts Recent $0,005, Counts All $0,010; Trends $0,010.

**XAA webhook olayları (teslim edilen olay başına)** [RESMÎ]: $0,005 — `post.create`, `news.new`, `spaces.start`, `spaces.end`, `profile.update.*`; $0,010 — `follow.*`, `chat.received`, `dm.received`; $0,001 — `mute.*`, `block.*`; ücretsiz — `post.delete`, `chat.sent`, `chat.conversation_join`, `dm.sent`, `dm.read`, `dm.indicate_typing`. Teslim edilen her post olayı Post olarak faturalanır.

**Diğer kurallar** [RESMÎ]:
- Aynı kaynak 24 saatlik UTC penceresinde tekrar istenirse bir kez ücretlenir (gece yarısı UTC sıfırlanır; "yumuşak garanti").
- Ayda 3 milyon gönderi okuma tavanı; üstü Enterprise.
- Otomatik yükleme (auto-recharge): eşik ve tutar ayarlanır; bakiye eşiğin altına ilk düştüğünde tetiklenir; 5 dakikada en fazla bir yükleme; bakiye sıfır/negatifken yükleme yapılmaz. Ani yoğun kullanım bir yüklemeyi 5 dakikadan kısa sürede tüketirse "out of credits" hatası alınabilir (yükleme tutarını artırmak önerilir). Negatif bakiye, kredi eklenene kadar istekleri engeller.
- Harcama limiti (spending limit) aşılınca istekler bir sonraki fatura dönemine kadar engellenir.
- Hız sınırları faturalamadan ayrıdır; Enterprise'a özel limitler verilir.

**Örnek maliyet [TAHMİN, örnek]:** 500 hesabın her biri günde 10 gönderi atıyorsa → 5.000 `post.create` olayı/gün × $0,005 = ~$25/gün, ~$750/ay. Aynı gönderiler tekilleştirme sayesinde aynı gün tekrar okunursa ek ücret çıkmaz.

## Resmî olmayan yollar ve riskler

| Yol | Nasıl çalışır | Durum (2026) | Risk |
|---|---|---|---|
| Guest token | Web istemcisinin herkese açık bearer token'ı ile `guest/activate` çağrılıp misafir token alınır, iç GraphQL uçları çağrılır | Çoğu işlem (özellikle arama `SearchTimeline`) misafire kapalı; bir 3. taraf ölçümüne göre 23 işlemden 5'i açık [3. TARAF] | Sık kırılır; IP bazlı engel |
| Hesap çerezli GraphQL kazıma — **twscrape** (Python) | Gerçek X hesaplarının `auth_token` + `ct0` çerezleriyle iç API; hesap havuzu döndürür | Aktif bakımda görünüyor (v0.20.x, Ağustos 2026) [3. TARAF] | Hesap askıya alma, ToS ihlali |
| **Twikit** (Python) | Benzer, kullanıcı adı/şifre ile oturum | Resmî sürümün bozuk olduğu, topluluk fork'u ile sürdüğü bildiriliyor [ÇELİŞKİLİ] | Aynı |
| Scweet, Apify aktörleri, ücretli "unofficial X API" servisleri | Kazıma altyapısını hizmet olarak satar | Değişken [3. TARAF] | Veri yasal dayanağı belirsiz; hizmet aniden kapanabilir |
| Nitter (RSS köprüsü) | Guest/hesap tokenlarıyla alternatif ön yüz + RSS | Kamu örneklerinin çoğu kapandı; X'in hukuki baskı yaptığı bildiriliyor [3. TARAF] | Güvenilmez |

**Riskler (nesnel):**
- X Hizmet Şartları izinsiz tarama/kazımayı (crawling/scraping) yasaklar; 15 Kasım 2024'ten beri şartlarda **24 saat içinde 1.000.000 gönderiye erişim başına $15.000** (AB/İngiltere için €15.000) götürü tazminat (liquidated damages) maddesi bulunur [3. TARAF — ConductAtlas ve Knight Institute özetleri; birincil metin bu araştırmada açılamadı]. Uygulanabilirliği tartışmalıdır.
- Kullanılan hesaplar askıya alınabilir; kişisel hesap asla kullanılmamalı.
- GraphQL sorgu kimlikleri ve token'lar sık değişir; 2–4 haftada bir kırılma bildiriliyor [3. TARAF / TAHMİN].
- Kişisel verilerin toplanması KVKK/GDPR yükümlülüğü doğurur (aydınlatma, saklama süresi); resmî API'de bile X geliştirici sözleşmesi silinen içeriğin senkron silinmesini ister (Spaces için açıkça belirtilmiş [RESMÎ]).

## SDK ve kütüphaneler

**Resmî** [RESMÎ]:
- Python XDK — `pip install xdk` (async, tip ipuçları, otomatik token yenileme)
- TypeScript XDK — `npm install @xdevplatform/xdk` (Bearer, OAuth 2.0 PKCE, OAuth 1.0a; stream'de otomatik yeniden bağlanma)
- `xurl` — OAuth destekli curl benzeri CLI
- API Playground — kredi harcamadan v2 uçlarını deneyen yerel sahte sunucu (github.com/xdevplatform/playground)
- XMCP / docs MCP, `llms.txt` — yapay zekâ ajanları için (docs.x.com/tools/ai)
- twitter-text — gönderi metni ayrıştırma/doğrulama

**Topluluk (X tarafından bakılmaz)** [RESMÎ listede]:
- .NET: **Tweetinvi**, **LinqToTwitter** — resmî .NET SDK yok. v2'nin yeni uçları (XAA, pay-per-use uçları) için güncellik durumunu kontrol et; gerekirse `HttpClient` + OpenAPI'den kod üretimi (NSwag/Kiota) [TAHMİN]
- Python: tweepy, twarc, python-twitter, TwitterAPI
- JS/TS: node-twitter-api-v2 (twitter-api-v2), twitter.js, twitter-v2
- Go: go-twitter, gotwi · Java/Kotlin: twittered, twitter4j-v2 · PHP: twitter-api-v2-php, twitteroauth · Rust: twitter-v2 · Swift: Twift · PowerShell: BluebirdPS

## Postman / OpenAPI / koleksiyonlar

- OpenAPI şeması: <https://api.x.com/2/openapi.json> [RESMÎ]
- Resmî Postman koleksiyonu (X API Public Workspace): <https://www.postman.com/xapidevelopers/x-api-public-workspace/collection/34902927-2efc5689-99c6-4ab6-8091-996f35c2fd80> [RESMÎ]
- Örnek kodlar: X'in XDK kullanan kod örnekleri deposu ([Tools and libraries](https://docs.x.com/x-api/tools-and-libraries) sayfası üzerinden) [RESMÎ]

## Depoda ilgili sayfalar

- [Sosyal medya API'leri klasörü](./) — aynı klasördeki diğer platform dosyaları (YouTube, Twitch, Bluesky…)
- [Mesajlaşma altyapıları rehberi](../../Rehberler/Mesajlasma-Altyapilari/) — Telegram, WhatsApp, BiP, SMS API'leri

## Kaynaklar

Resmî:
- [X API Pricing](https://docs.x.com/x-api/getting-started/pricing) — pay-per-use fiyat tabloları, XAA olay ücretleri, 3M tavan, tekilleştirme, ücretsiz krediler, auto-recharge ve harcama limiti — (erişim: 15 Ekim 2026)
- [Search operators](https://docs.x.com/x-api/posts/search/integrate/operators) — operatör listesi, standalone / conjunction-required ayrımı — (erişim: 15 Ekim 2026)
- [About the X API](https://docs.x.com/x-api/getting-started/about-x-api) — v2 / v1.1 durumu, kredi modeli — (erişim: 15 Ekim 2026)
- [X Activity API](https://docs.x.com/x-api/activity/introduction) — olay türleri, filtreler, abonelik limitleri, herkese açık/özel olaylar — (erişim: 15 Ekim 2026)
- [Account Activity API](https://docs.x.com/x-api/account-activity/introduction) — kullanımdan kalkma notu, plan limitleri — (erişim: 15 Ekim 2026)
- [Webhooks](https://docs.x.com/x-api/webhooks/introduction) — CRC, imza başlıkları, geçersiz sayılma koşulları — (erişim: 15 Ekim 2026)
- [Filtered stream](https://docs.x.com/x-api/posts/filtered-stream/introduction) — plan karşılaştırması, kural limitleri — (erişim: 15 Ekim 2026)
- [Search](https://docs.x.com/x-api/posts/search/introduction) — recent vs full-archive, operatörler — (erişim: 15 Ekim 2026)
- [Timelines](https://docs.x.com/x-api/posts/timelines/introduction) — 3.200 / 800 gönderi sınırları — (erişim: 15 Ekim 2026)
- [Spaces](https://docs.x.com/x-api/spaces/introduction) — Spaces uçları ve yaşam döngüsü — (erişim: 15 Ekim 2026)
- [Rate limits](https://docs.x.com/x-api/fundamentals/rate-limits) — uç nokta bazlı 15 dakikalık limitler — (erişim: 15 Ekim 2026)
- [Authentication](https://docs.x.com/fundamentals/authentication/overview) ve [OAuth 2.0 PKCE](https://docs.x.com/fundamentals/authentication/oauth-2-0/authorization-code) — yöntemler, scope'lar, token süreleri — (erişim: 15 Ekim 2026)
- [Tools and libraries](https://docs.x.com/x-api/tools-and-libraries) — XDK, xurl, Postman, OpenAPI, topluluk kütüphaneleri — (erişim: 15 Ekim 2026)

3. taraf:
- [TechCrunch — X pay-per-use testi (Ekim 2025)](https://techcrunch.com/2025/10/21/x-is-testing-a-pay-per-use-pricing-model-for-its-api/) — modelin beta başlangıcı — (erişim: 15 Ekim 2026)
- [MediaNama — pay-per-use modeli (Şubat 2026)](https://www.medianama.com/2026/02/223-x-developer-api-pricing-pay-per-use-model/) — genel kullanıma açılış — (erişim: 15 Ekim 2026)
- [OpenTweet — Pro'dan pay-per-use'a geçiş](https://opentweet.io/how-to/migrate-x-api-pro-to-pay-per-use) — Pro planın 1 Eylül 2026 sonrası taşınması — (erişim: 15 Ekim 2026)
- [Maxrave — Basic planların taşınması](https://maxrave.dev/articles/x-legacy-basic-api-plans-moving-to-pay-per-use) — Basic geçişi (1 Haziran 2026) — (erişim: 15 Ekim 2026)
- [Sorsa — X API fiyatları 2026](https://api.sorsa.io/blog/twitter-api-pricing-2026) — eski planların durumu, kazıma araçları (ticari kaynak) — (erişim: 15 Ekim 2026)
- [Xpoz — 2026'da çalışan açık kaynak kazıyıcılar](https://www.xpoz.ai/blog/guides/open-source-social-media-scrapers-what-still-works-2026/) — twscrape/Twikit/guest token durumu (ticari kaynak) — (erişim: 15 Ekim 2026)
- [Knight Institute — X'in yeni hizmet şartları](https://knightcolumbia.org/content/knight-institute-says-xs-new-terms-of-service-will-stifle-independent-research) — götürü tazminat maddesi (2024) — (erişim: 15 Ekim 2026)
- [ConductAtlas — X ToS kazıma maddesi](https://conductatlas.com/platform/x/x-terms-of-service/acceptable-use-and-scraping-prohibition/) — 2026 ToS metninin özeti — (erişim: 15 Ekim 2026)
