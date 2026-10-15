# Kick API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (resmî Public API + webhook'lar; hız sınırları belgelenmemiş)

## Özet

Kick, `docs.kick.com` üzerinde belgelenen resmî bir **Public API** sunar: OAuth 2.1 (PKCE) ile kimlik doğrulama, kanal/kullanıcı/canlı yayın/kategori sorguları, sohbete mesaj gönderme, moderasyon, kanal ödülleri, KICKs ve reklam uç noktaları ile **webhook tabanlı olay aboneliği** (`livestream.status.updated`, `chat.message.sent` vb.) [RESMÎ]. Uygulama açmak ücretsizdir; yalnızca Kick hesabı + 2FA gerekir [RESMÎ]. Resmî API'de sohbet geçmişini okuyan bir uç nokta ve WebSocket yoktur; gerçek zamanlı veri yalnızca webhook ile gelir [RESMÎ]. Bunun yanında topluluğun yıllardır kullandığı, sitenin kendi ön yüzünün çağırdığı **resmî olmayan** `kick.com/api/v1|v2/...` uç noktaları ve Pusher WebSocket sohbet kanalı vardır; bunlar belgelenmemiştir, Cloudflare engeline takılabilir ve her an değişebilir [3. TARAF].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | — | Resmî API'de **yok**: tüm `api.kick.com/public/...` çağrıları token ister [RESMÎ]. Herkese açık olan yalnızca webhook imza doğrulaması için `GET /public/v1/public-key` [RESMÎ]. | — |
| Geliştirici uygulaması (App Access Token) | Kick hesabı, 2FA, Account Settings → Developer sekmesinde uygulama → `client_id` + `client_secret`; `client_credentials` akışı [RESMÎ] | Herkese açık veriler: kanallar (slug/ID ile), kullanıcılar (ID ile), canlı yayın listeleri, kategoriler; **herhangi bir kanalın** olaylarına `broadcaster_user_id` vererek webhook aboneliği [RESMÎ] | Ücretsiz. Uygulama başına olay türü başına 10.000 abonelik; `chat.message.sent` için doğrulanmamış uygulamada 1.000 [RESMÎ]. Hız sınırı açıklanmıyor [RESMÎ – "wontfix"]. |
| Kullanıcı yetkisi (User Access Token) | Authorization Code + PKCE; kullanıcının onayladığı scope'lar [RESMÎ] | Kullanıcının kendi kanalı adına: sohbete yazma (`chat:write`), başlık/kategori güncelleme (`channel:write`), moderasyon, ödüller, stream key, reklamlar, KICKs liderlik tablosu [RESMÎ] | Ücretsiz |
| İşletme/uygulama onayı (App Verification) | `developers@kick.com` adresine Client ID, uygulama adı, gerekçe ve kanıtla başvuru [RESMÎ] | Bot hesabına doğrulanmış rozet; `chat.message.sent` abonelik sınırının 1.000 → 10.000'e çıkması [RESMÎ] | Ücretsiz; onay Kick'in takdirinde |
| Ücretli/kurumsal | — | Belgede ücretli API katmanı **yok** [RESMÎ – belgede yok]. Drops için ayrı bir "Organization Management" / Drops Public API bölümü var (oyun yayıncıları/kuruluşlar için) [RESMÎ]. | Belgede yok |
| Resmî olmayan | Kimlik gerekmez; tarayıcıya benzeyen istek + Cloudflare'i geçebilmek | `kick.com/api/v1/channels/{slug}`, `kick.com/api/v2/channels/{slug}` (canlı durum, `chatroom.id`, geçmiş yayınlar), `.../messages` (son sohbet mesajları), Pusher WebSocket ile canlı sohbet ve kanal olayları [3. TARAF] | Belgelenmemiş; ToS/ban/engellenme riski (aşağıda) |

## Kimlik doğrulama

- **Kimlik sunucusu:** `https://id.kick.com` (API sunucusundan ayrı) [RESMÎ]. **API sunucusu:** `https://api.kick.com` [RESMÎ].
- **Uygulama açma:** Kick hesabı → 2FA aç → Account Settings → Developer → uygulama oluştur → `client_id`, `client_secret`, redirect URL [RESMÎ]. Uygulamayı açarken Geliştirici Şartları (Developer Terms) kabul edilir [RESMÎ].
- **Akışlar** [RESMÎ]:
  - **App Access Token** — `POST https://id.kick.com/oauth/token`, `grant_type=client_credentials`, `client_id`, `client_secret`. Sunucudan sunucuya, kullanıcı girişi olmadan herkese açık veri için.
  - **User Access Token** — `GET /oauth/authorize` (`client_id`, `response_type=code`, `redirect_uri`, `scope`, `code_challenge`, `code_challenge_method=S256`, `state` şu an zorunlu) → `POST /oauth/token` (`grant_type=authorization_code`, `code`, `client_id`, `client_secret`, `redirect_uri`, `code_verifier`), gövde `application/x-www-form-urlencoded`.
  - **Yenileme** — `POST /oauth/token`, `grant_type=refresh_token`.
  - **İptal** — `POST /oauth/revoke?token=...&token_hint_type=access_token|refresh_token`.
  - **İnceleme (introspect)** — `POST /oauth/token/introspect` (Bearer header). Eski `POST /public/v1/token/introspect` kullanımdan kaldırılıyor (15.01.2026) [RESMÎ].
- **Token ömrü:** Yanıtta `expires_in` döner; belgede sabit bir süre yazmaz [RESMÎ – belgede yok].
- **Scope'lar** [RESMÎ]: `user:read`, `channel:read`, `channel:write`, `channel:rewards:read`, `channel:rewards:write`, `chat:write`, `streamkey:read`, `events:subscribe`, `moderation:ban`, `moderation:chat_message:manage`, `kicks:read`, `ads:read`, `ads:write`.
- **Not:** Redirect URI'de `127.0.0.1` kullanılıyorsa bazı çatılar (ör. Next.js) bunu `localhost`'a çevirip akışı bozabilir; belgede geçici çözüm anlatılır [RESMÎ].
- **Test:** Belge sayfalarındaki "Test it" düğmesiyle kendi client ID/secret'ınla uygulama barındırmadan deneme yapılabilir (redirect URL `https://docs.kick.com` yapılır) [RESMÎ].

## Temel uç noktalar

Taban: `https://api.kick.com`. Tam liste: <https://docs.kick.com/llms.txt> (tüm sayfaların dizini).

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/public/v1/channels?slug=...` veya `?broadcaster_user_id=...` | Kanal bilgisi: başlık, kategori, `stream.is_live`, `viewer_count`, `start_time`, abone sayıları | App veya User token (`channel:read`) | En fazla 50 slug **veya** 50 ID; ikisi birlikte kullanılamaz. Parametresiz → oturum açan kullanıcının kanalı [RESMÎ] |
| PATCH | `/public/v1/channels` | Yayın başlığı, kategori, özel etiket güncelle | User token (`channel:write`) | En fazla 10 etiket [RESMÎ] |
| GET | `/public/v2/livestreams` | Canlı yayınları listeler (kategori/dil filtresi) | App veya User token | `limit` 1–1000 (vars. 100), cursor sayfalama, `category_id`/`language_code` en fazla 25 [RESMÎ] |
| GET | `/public/v1/users/livestreams?user_id=...` | Verilen kullanıcıların şu anki canlı yayınları — **toplu canlı kontrolü** | App veya User token | Zorunlu, en fazla 100 ID (03.07.2026'da eklendi) [RESMÎ] |
| GET | `/public/v1/livestreams` | Eski canlı yayın listesi | App veya User token | **Kullanımdan kaldırıldı** (23.06.2026); 03.07.2026 changelog'una göre V1'den geçişin tamamlanmış olması bekleniyor, kaldırılabilir — `/public/v2/livestreams` veya `/public/v1/users/livestreams` kullan [RESMÎ] |
| GET | `/public/v1/livestreams/stats` | Toplam canlı yayın sayısı | App veya User token | [RESMÎ] |
| GET | `/public/v1/users?id=...` | Kullanıcı bilgisi | App veya User token (`user:read`) | Yalnızca ID ile; **kullanıcı adıyla arama yok** — slug→ID için Get Channels kullanılır [RESMÎ] |
| GET/POST/DELETE | `/public/v1/events/subscriptions` | Webhook aboneliklerini listele / oluştur / sil | App token (POST'ta `broadcaster_user_id` zorunlu) veya User token (`events:subscribe`) | Yalnız `method: "webhook"` [RESMÎ] |
| GET | `/public/v1/public-key` | Webhook imza doğrulaması için Kick açık anahtarı (PEM) | Kimliksiz | Anahtar dönebilir; sabit kodlama yapma [RESMÎ] |
| POST | `/public/v1/chat` | Sohbete mesaj gönder (`type: user` veya `bot`, yanıt için `reply_to_message_id`) | User token (`chat:write`) | 500 karakter (grafem) ve en fazla 2048 bayt UTF-8; `type=user` için `broadcaster_user_id` zorunlu; `type=bot` yalnızca token sahibinin kanalına yazar [RESMÎ] |
| DELETE | `/public/v1/chat/{message_id}` | Sohbet mesajı sil | User token (`moderation:chat_message:manage`) | [RESMÎ] |
| — | Categories (V2), Moderation, Channel Rewards (+ Redemptions), KICKs leaderboard, Ads | Diğer gruplar | Çoğunlukla User token | Categories V1 (`/public/v1/categories?q=` ve `/public/v1/categories/{id}`) deprecated (15.01.2026); yerine `/public/v2/categories` (`name`/`tag`/`id` filtreleri, cursor, `limit` 1–1000) [RESMÎ] |

**Resmî API'de olmayanlar** [RESMÎ – belgede yok]: sohbet geçmişini okuma, klip listeleme/klip olayı (topluluk istekleri yinelenen kayıt olarak kapatıldı [3. TARAF – GitHub issue #320]), VOD listeleme, kullanıcı adıyla arama, takipçi listesi.

## Gerçek zamanlı / bildirim

**Resmî: yalnızca webhook** [RESMÎ]
- Kurulum: Developer sekmesi → uygulama → Edit → "Enable Webhooks" → herkese açık bir URL. `localhost` çalışmaz; ngrok / Cloudflare Tunnel gibi bir tünel gerekir [RESMÎ].
- Abonelik: `POST /public/v1/events/subscriptions`, gövde `{ "events": [{ "name": "livestream.status.updated", "version": 1 }], "method": "webhook", "broadcaster_user_id": 123 }`. **App token ile herhangi bir kanalın** olaylarına abone olunabilir [RESMÎ]; User token'da kanal token'dan çıkarılır.
- Olay türleri (hepsi `version: 1`) [RESMÎ]:

| Olay | Ne zaman | Önemli alanlar |
|---|---|---|
| `livestream.status.updated` | Yayın başladı / bitti | `broadcaster`, `is_live`, `title`, `started_at`, `ended_at` |
| `livestream.metadata.updated` | Başlık, dil, kategori, +18 değişti | `metadata.title`, `language`, `category`, `has_mature_content` |
| `chat.message.sent` | Sohbete mesaj yazıldı | `message_id`, `content`, `sender`, `replies_to`, `emotes`, `created_at` |
| `channel.followed` | Yeni takipçi | `follower` |
| `channel.subscription.new` / `.renewal` / `.gifts` | Abonelik / yenileme / hediye abonelik | `subscriber`/`gifter`, `giftees`, `duration`, `expires_at` |
| `channel.reward.redemption.updated` | Kanal puanı ödülü kullanıldı / durumu değişti | `status` (`pending`/`accepted`/`rejected`), `user_input` |
| `moderation.banned` | Kullanıcı banlandı | `banned_user`, `metadata.reason`, `expires_at` (kalıcıda null) |
| `kicks.gifted` | KICKs hediye edildi | `gift.amount`, `gift.message` |

- **Başlıklar:** `Kick-Event-Message-Id` (ULID, tekrar önleme anahtarı olarak kullan), `Kick-Event-Subscription-Id`, `Kick-Event-Signature`, `Kick-Event-Message-Timestamp`, `Kick-Event-Type`, `Kick-Event-Version` [RESMÎ].
- **İmza doğrulama:** `messageId + "." + timestamp + "." + rawBody` → SHA-256 → Base64 çözülmüş imza, Kick açık anahtarıyla **RSA PKCS#1 v1.5** olarak doğrulanır [RESMÎ].
- **Otomatik abonelik iptali:** Bir olayı bir günden uzun süre işleyemeyen uygulamanın o olaya aboneliği silinir (12.12.2025); webhook kapatılırsa tüm abonelikler silinir (19.12.2025) [RESMÎ]. Yeniden deneme (retry) sayısı ve zaman aşımı **belgede yok**.
- Bilinen sorunlar: bazı olayların (`kicks.gifted`, abonelik olayları) gelmediği, oluşturulan aboneliğin listede görünmediği bildirimleri açık [3. TARAF – GitHub issues #407, #390, #419]. Kritik takipte webhook'a ek olarak periyodik doğrulama sorgusu önerilir [TAHMİN].

**WebSocket / streaming / RSS / WebSub:** Resmî olarak **yok** [RESMÎ – belgede yok]. Topluluğun kullandığı Pusher WebSocket resmî değildir (aşağıya bak).

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Kanal canlı yayına geçti / bitti | Evet | `livestream.status.updated` webhook | App token (herhangi kanal) | En iyi yol; 10.000 abonelik/olay türü [RESMÎ] |
| Canlı durumu yedek kontrol | Evet | `GET /public/v1/users/livestreams?user_id=` (100'lük gruplar) veya `GET /public/v1/channels?slug=` (50'lik) ile periyodik sorgu | App token | Hız sınırı açıklanmadığı için temkinli aralık (ör. dakikada bir) [TAHMİN] |
| Başlık / kategori değişti | Evet | `livestream.metadata.updated` webhook | App token | Anahtar kelime filtresi başlık üzerinde uygulanabilir |
| Sohbet mesajları (canlı) | Evet | `chat.message.sent` webhook | App token | Doğrulanmamış uygulamada 1.000 kanal, doğrulanmışta 10.000 [RESMÎ] |
| Sohbet geçmişi (geriye dönük) | Resmî: Hayır | Resmî olmayan `kick.com/api/v2/channels/{id}/messages` | Resmî olmayan | ToS/engellenme riski [3. TARAF] |
| Anahtar kelime / filtreleme | Kendi tarafında | Webhook'tan gelen `content` / `title` üzerinde kendi filtren | — | Kick sunucu tarafı filtre sunmaz [RESMÎ – belgede yok] |
| Yeni klip | Resmî: Hayır | Resmî olmayan klip uç noktası | Resmî olmayan | Resmî destek isteği açık/yinelenen [3. TARAF] |
| Yeni VOD / geçmiş yayın | Resmî: Hayır | Resmî olmayan `kick.com/api/v1/channels/{slug}` (`previous_livestreams`) veya v2 video uç noktaları | Resmî olmayan | [3. TARAF] |
| Takipçi / abone / hediye olayları | Evet | `channel.followed`, `channel.subscription.*`, `kicks.gifted` | App token (`broadcaster_user_id`) | Başka kanallar için verinin gelip gelmediği olay bazında doğrulanmalı [TAHMİN] |
| Ban / moderasyon | Evet | `moderation.banned` | App token | [RESMÎ] |

**Önerilen mimari** [TAHMİN]: slug listesini `GET /public/v1/channels?slug=` ile ID'ye çevir → her kanal için App token ile `livestream.status.updated` (+ istenirse `livestream.metadata.updated`, `chat.message.sent`) aboneliği aç → webhook'ta imzayı doğrula, `Kick-Event-Message-Id` ile tekrarları ele → günde birkaç kez `GET /events/subscriptions` ile aboneliklerin hâlâ var olduğunu kontrol et (otomatik iptal kuralı yüzünden).

## Hız sınırları ve fiyatlar

- **Fiyat:** API ve uygulama ücretsiz; belgede ücretli katman yok [RESMÎ].
- **Hız sınırları:** Kick bunları **açıklamıyor**. GitHub'daki "Rate Limits Are Missing From Documentation" isteğine Aralık 2025'te "şu an hız sınırı bilgisi paylaşmayacağız" yanıtı verilip "wontfix" olarak kapatıldı [3. TARAF – KickEngineering/KickDevDocs deposundaki issue #311; depo bakımcıları wontfix olarak kapattı]. Resmî belgede (FAQs dahil) hız sınırı hiç anılmıyor [RESMÎ – belgede yok]. 429 yanıtlarını üstel geri çekilme (exponential backoff) ile ele al [TAHMİN].
- **Belgelenmiş sayısal limitler** [RESMÎ]: olay türü başına 10.000 abonelik/uygulama; `chat.message.sent` doğrulanmamış uygulamada 1.000; Get Channels 50 slug/ID; Users Livestreams 100 ID; Livestreams V2 sayfa başına en fazla 1.000; sohbet mesajı 500 karakter.
- **Cloudflare:** Resmî `api.kick.com` bile Cloudflare arkasında; bazı istemci imzaları (ör. varsayılan Python `urllib`) "Error 1010 – browser_signature_banned" ile 403 alabiliyor (Ekim 2026'da açık hata kaydı) [3. TARAF – GitHub issue #434]. Anlamlı bir `User-Agent` göndermek muhtemelen yardımcı olur [TAHMİN].

## Resmî olmayan yollar ve riskler

Kick'in web sitesi kendi ön yüzü için belgelenmemiş bir iç API ve gerçek zamanlı olaylar için **Pusher** (barındırılan WebSocket hizmeti) kullanır. Topluluk bunları resmî API çıkmadan önce yaygın biçimde kullandı; birçok kütüphanede hâlâ "unofficial" modül olarak duruyor [3. TARAF].

| Uç nokta / yöntem | Ne verir | Durum (15.10.2026) |
|---|---|---|
| `GET https://kick.com/api/v1/channels/{slug}` | Kanal profili, `livestream` (canlıysa dolu, değilse `null`), `previous_livestreams`, `chatroom`, `user` | Test isteğinde JSON döndü [3. TARAF – kendi denemem] |
| `GET https://kick.com/api/v2/channels/{slug}` | Kanal, `livestream`, `chatroom.id`, `followers_count`, `recent_categories` | Test isteğinde JSON döndü [3. TARAF – kendi denemem] |
| `GET https://kick.com/api/v2/channels/{channelId}/messages` | Son ~25 sohbet mesajı + `cursor` + sabitlenmiş mesaj | Test isteğinde JSON döndü [3. TARAF – kendi denemem] |
| Pusher WebSocket (`wss://ws-<küme>.pusher.com/app/<app-key>?protocol=7...`), kanallar `chatrooms.{chatroomId}.v2`, `channel.{channelId}` | Canlı sohbet (`ChatMessageEvent`), silinen mesaj, ban, abonelik/hediye, yayın başladı/bitti (`StreamerIsLive`/`StopStreamBroadcast`), host olayları | Topluluk kütüphanelerinde (ör. KickLib `KickClient`) "undocumented pusher" olarak kullanılıyor [3. TARAF]. Uygulama anahtarı ve küme, Kick'in ön yüz kodundan alınır ve değişebilir; burada sabit değer verilmedi [TAHMİN] |

**Riskler (nesnel):**
- **Kararlılık:** Belgelenmemiş; alan adları, yollar, Pusher anahtarı haber verilmeden değişebilir. Kütüphaneler (ör. KickLib) resmî karşılıkları çıktıkça resmî olmayan uç noktaları kaldıracaklarını açıkça yazıyor [3. TARAF].
- **Engellenme:** `kick.com` Cloudflare arkasında; sunucu/veri merkezi IP'lerinden veya tarayıcıya benzemeyen istemcilerden gelen istekler 403 / JS challenge alabilir. Topluluk bunu aşmak için tarayıcı TLS parmak izi taklit eden araçlar (ör. Python `curl_cffi`, headless tarayıcı) kullanıyor [3. TARAF]; bu tür aşma girişimleri koruma önlemlerini dolanmak anlamına gelir ve ToS ihlali sayılabilir [TAHMİN].
- **ToS/hukuki:** Kick personelinden belgelenmemiş uç noktaları yoklamaya izin veren bir açıklama bulunamadı; konuyla ilgili soru yanıtsız kapatıldı [3. TARAF – GitHub issue #320]. Geliştirici Şartları'nın ilgili maddesi bu araştırmada okunamadı [belgede/bu araştırmada yok]. Ağır kazıma (scraping) hesap/IP engeline yol açabilir; KickLib de "yoğun kazıma yapmayın" uyarısı veriyor [3. TARAF].
- **Kişisel veri:** Sohbet mesajları kullanıcı adı ve kimlik içerir; saklanırsa KVKK/GDPR yükümlülükleri doğar (saklama süresi, amaç sınırlaması) [TAHMİN].
- **Ne zaman mantıklı:** Resmî API'nin vermediği tek şey gerekiyorsa (sohbet geçmişi, klip/VOD listesi) ve düşük hacimde, önbellekle; canlı yayın ve canlı sohbet takibinde resmî webhook'lar artık yeterli olduğundan resmî olmayan yol **gereksiz** [TAHMİN].

## SDK ve kütüphaneler

Kick'in resmî bir SDK'sı **yok** [RESMÎ – belgede yok]. Belgedeki "Community Driven Projects" sayfası şu kütüphaneleri listeler (Kick bunların sahibi değildir) [RESMÎ]:

| Dil | Kütüphane | Not |
|---|---|---|
| C# / .NET | **KickLib** — <https://github.com/Bukk94/KickLib> (NuGet: `KickLib`) | Resmî API (OAuth 2.1, webhook ayrıştırma, sohbet) + ayrı `IKickUnofficialApi` ve Pusher tabanlı `KickClient` [3. TARAF] |
| Python | `kickpython` (PyPI), `pyKickAPI`, `kickcom.py` (async) | `kickpython` 0.1.5 (Mart 2025) OAuth + WebSocket sohbet dinleyicisi [3. TARAF] |
| JS / TS | `@botk4cp3r/kick.js`, `kick-auth`, `kient`, `kick-api-types` | `kient`: TypeScript-öncelikli, belgeleri "WIP" [3. TARAF] |
| PHP | `danielhe4rt/kick-php-sdk` | |
| Java | `kick4j` | |
| Go | `gokick`, `kick-go-sdk` | |
| Kimlik doğrulama | Better-Auth Kick sağlayıcısı | |

## Postman / OpenAPI / koleksiyonlar

- Resmî belgelerin her sayfası OpenAPI tabanlı bir "Test it" arayüzüyle gelir; ayrıca tüm sayfaların Markdown dizini `https://docs.kick.com/llms.txt` adresindedir [RESMÎ].
- İndirilebilir resmî bir OpenAPI/Postman dosyası bağlantısı belgede bulunamadı [RESMÎ – belgede yok]. Belgeler GitHub'da açık kaynak (KickEngineering/KickDevDocs); şemalar oradan çıkarılabilir [TAHMİN].
- Tip tanımları için topluluk: `kick-api-types` (TS) [3. TARAF].

## Depoda ilgili sayfalar

- [Canlı yayın ve video API'leri](./) — aynı klasördeki diğer platformlar (Twitch, YouTube vb.).
- [API kök klasörü](../) — genel API başvuru kütüphanesi.

## Kaynaklar

Resmî:
- <https://docs.kick.com/> — Kick Dev Docs ana sayfa — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/llms.txt> — tüm belge sayfalarının dizini — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/getting-started/kick-apps-setup.md> — uygulama oluşturma, 2FA şartı — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/getting-started/generating-tokens-oauth2-flow.md> — OAuth 2.1 akışları, uç noktalar — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/getting-started/scopes.md> — scope listesi — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/apis/channels.md> — Channels API — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/apis/livestreams.md> — Livestreams API (V2, users/livestreams) — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/apis/users.md> — Users API — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/apis/chat.md> — Chat API (500 grafem / 2048 bayt, user/bot farkı) — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/apis/categories.md> — Categories API (V1 deprecated, V2 filtreleri) — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/apis/faqs.md> — App Verification, test etme (hız sınırı anılmıyor) — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/events/introduction.md> — webhook'u etkinleştirme, app token ile herhangi bir kanala abonelik — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/events/subscribe-to-events.md> — abonelik uç noktaları ve limitler — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/events/webhook-security.md> — başlıklar, imza doğrulama, otomatik iptal — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/events/event-types.md> — olay türleri ve yük alanları — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/changelog.md> — değişiklik günlüğü (V1→V2 geçişleri, kaldırmalar) — (erişim: 15 Ekim 2026)
- <https://docs.kick.com/how-do-i-contribute/community-projects.md> — topluluk kütüphaneleri listesi — (erişim: 15 Ekim 2026)

Üçüncü taraf:
- <https://github.com/KickEngineering/KickDevDocs/issues/311> — hız sınırlarının açıklanmayacağı yanıtı (16.12.2025, wontfix; yanıtlayanın Kick personeli olduğu sayfada belirtilmiyor) — (erişim: 15 Ekim 2026)
- <https://github.com/KickEngineering/KickDevDocs/issues/434> — resmî API'de Cloudflare 1010 / 403 hatası bildirimi — (erişim: 15 Ekim 2026)
- <https://github.com/KickEngineering/KickDevDocs/issues/320> — belgelenmemiş klip uç noktasını yoklama sorusu (yanıtsız) — (erişim: 15 Ekim 2026)
- <https://github.com/KickEngineering/KickDevDocs/issues> — açık webhook teslim sorunları (#390, #407, #419) — (erişim: 15 Ekim 2026)
- <https://github.com/Bukk94/KickLib> — .NET kütüphanesi; resmî + resmî olmayan API ve Pusher istemcisi — (erişim: 15 Ekim 2026)
- <https://pypi.org/project/kickpython/> — Python kütüphanesi — (erişim: 15 Ekim 2026)
- <https://github.com/zSoulweaver/kient> — TypeScript kütüphanesi — (erişim: 15 Ekim 2026)
- `https://kick.com/api/v1/channels/{slug}`, `https://kick.com/api/v2/channels/{slug}`, `https://kick.com/api/v2/channels/{id}/messages` — resmî olmayan uç noktalara yapılan tek seferlik doğrulama istekleri; JSON döndü (sonuç istemciye/IP'ye göre değişebilir) — (erişim: 15 Ekim 2026)

> Not: Bu araştırma sırasında web arama kotası doldu; resmî olmayan Pusher uygulama anahtarı/küme değeri ve Kick Geliştirici Şartları'nın ilgili maddeleri bağımsız olarak doğrulanamadı, bu yüzden yazılmadı.
