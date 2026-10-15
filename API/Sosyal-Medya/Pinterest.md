# Pinterest API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (kısıtlı: yeni uygulamalar yalnızca kendi hesabının verisini okuyabiliyor)

## Özet

Pinterest'in resmî REST API'si **v5**tir (`https://api.pinterest.com/v5`, OpenAPI sürümü 5.28.0) [RESMÎ]. Pin, pano (board), pano bölümü, medya yükleme, kullanıcı hesabı ve analitik ile reklam (Ads), katalog, hedef kitle, trend ve dönüşüm (Conversions) API'lerini tek çatı altında sunar [RESMÎ]. API ücretsizdir; erişim **Trial** ve **Standard** olmak üzere iki seviyeye ayrılır ve her ikisi de uygulama incelemesiyle verilir [RESMÎ]. Temel tasarım "yetki veren hesabın kendi verisi" üzerinedir: başka kullanıcıların pinlerini/panolarını izlemek için genel bir uç nokta yoktur; 14 Eylül 2026 ve sonrasında kaydedilen uygulamalar başka hesapların verisini okumak için ayrıca onay almak zorundadır [RESMÎ — topluluk duyurusu].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | API'de kimliksiz uç nokta yok [RESMÎ]. Kullanıcı profilleri için herkese açık **RSS** (`https://www.pinterest.com/<kullanici>/feed.rss`) çalışıyor (15.10.2026'da test edildi, 200 `text/xml`) [3. TARAF — resmî API belgesinde geçmiyor]. Ayrıca trends.pinterest.com web arayüzü. | Ücretsiz; RSS için yayımlanmış limit yok |
| Geliştirici hesabı / uygulama (**Trial**) | Pinterest **işletme hesabı**, developers.pinterest.com → My apps'te uygulama kaydı, doğru gizlilik politikası bağlantısı ve açık uygulama açıklaması; uygulama onaylanınca Trial verilir [RESMÎ] | Okuma: pin, pano, katalog, pin analitiği; reklam/hedef kitle/katalog okuma-oluşturma. **Oluşturulan pin ve panolar yalnızca sahibine görünen "Sandbox" varlıklarıdır** [RESMÎ]. Sandbox ortamı: `https://api-sandbox.pinterest.com/v5` (30 günlük sandbox token) [RESMÎ] | Ücretsiz; uygulama başına **günde 1.000 istek** (bazı yazma kategorilerinde 300/gün) [RESMÎ] |
| İşletme / uygulama onayı (**Standard**) | Trial onayı + Developer Guidelines'a uyum + **OAuth akışını gösteren video demo** (tek kullanıcı sen olsan bile zorunlu; terminal/Postman kaydı kabul) → My apps'te "Upgrade" [RESMÎ]. İnceleme süresi belirtilmemiş; toplulukta haftalarca bekleyenler bildiriliyor [3. TARAF] | Pin/pano oluşturma herkese görünür hâle gelir; üretim kullanımı; yüksek limitler [RESMÎ] | Ücretsiz; kullanıcı+uygulama başına **saniyede 100 istek** genel, kategori bazında dakikalık limitler [RESMÎ] |
| Kısıtlı / beta özellikler (ayrı onay) | Pinterest hesap yöneticisi (account manager) veya beta başvurusu [RESMÎ] | **Pinner data access** (yetki vermemiş/başka kullanıcıların pano ve pinlerini okuma — 14.09.2026 sonrası kaydedilen uygulamalar için) [RESMÎ]; `GET /search/partner/pins` (beta, herkese açık değil) [RESMÎ]; `POST /user_account/following/{username}` (kullanıcı takip etme; beta, her uygulamaya açık değil) [RESMÎ — OpenAPI]; `POST /notifications` (kapalı) [RESMÎ]; Advanced Auction gibi kısıtlı reklam özellikleri | Belgede fiyat yok |
| Ücretli / kurumsal | — | API için ücretli paket **yok** [RESMÎ — fiyat sayfası/plan belgede yok]. Reklam API'si ücretsizdir; harcama reklam bütçesidir. | Reklam harcaması dışında ücret yok |
| Resmî olmayan | Pinterest web oturumu (çerez) veya hiçbir şey | Web uygulamasının iç `resource` uç noktaları, sayfa kazıma (scraping) — bkz. aşağıdaki bölüm | ToS ihlali; hesap kapatma riski |

> **14 Eylül 2026 değişikliği** [RESMÎ — Pinterest Business Community duyurusu, 1 Ekim 2026]: Bu tarihte veya sonrasında kaydedilen uygulamalar, yetki veren hesaba ait olmayan pano/pin verisi istediğinde **HTTP 403 `PINNER_DATA_ACCESS_DENIED`** alır. Etkilenen uç noktalar: Get board, List Pins on board, List board sections, List Pins on board section, Get Pin. Yetki veren hesabın kendi pano ve pinleri (ID ile çekmek dahil) etkilenmez. Hata **yeniden denenmemeli** (onay verilene kadar 403 döner). Daha önce kaydedilmiş uygulamalar etkilenmez.

## Kimlik doğrulama

- **OAuth 2.0 Authorization Code** [RESMÎ]: Yetkilendirme `https://www.pinterest.com/oauth/?client_id=...&redirect_uri=...&response_type=code&scope=boards:read,pins:read` → token: `POST https://api.pinterest.com/v5/oauth/token` (HTTP Basic: `client_id:client_secret`). Erişim token'ı `pina_` önekli; tam API yeteneği yalnızca bu akışta [RESMÎ].
- **Token süreleri** [RESMÎ]: erişim token'ı 30 gün (`expires_in: 2592000`); **continuous refresh token** 60 gün (`5184000`) ve süresiz yenilenebilir (60 gün dolmadan yenilenmeli). 25 Eylül 2025'ten önce oluşturulan uygulamalar `continuous_refresh=true` göndermeli; eski 365 günlük refresh token artık desteklenmiyor. Refresh token biterse kullanıcı OAuth'u baştan yapar. Belgedeki Authorization Code örnek yanıtında hâlâ 365 gün (`refresh_token_expires_in: 31536000`) görünüyor; metin 60 gün diyor [ÇELİŞKİLİ]. Gerçek değeri yanıttaki `refresh_token_expires_in` alanından oku.
- **Client Credentials** [RESMÎ]: `grant_type=client_credentials` + `scope` (zorunlu), Basic auth; `pinc_` önekli token, uygulama sahibinin adına makine-makine kullanım; refresh token yok; bazı uç noktalar kapalı; hesapta **iki adımlı doğrulama** şart. (Belgedeki parametre tablosunda `authorization_code` yazması bir yazım hatası — örnek istek `client_credentials` kullanıyor [ÇELİŞKİLİ].)
- **Uygulama sayfasından token** [RESMÎ]: My apps → Manage → Configure → "Generate Access Token" (sandbox token 30 gün).
- **Conversion token** [RESMÎ]: `POST /oauth/conversion_token` — Conversions API için sınırsız olay gönderimine izin veren özel token.
- **Kapsamlar (scopes)** [RESMÎ — OpenAPI]: `boards:read` (herkese açık panolar ve katıldığın grup panoları), `boards:read_secret` (gizli panolar), `boards:write`, `boards:write_secret`, `pins:read`, `pins:read_secret`, `pins:write`, `pins:write_secret`, `user_accounts:read` (hesap ve takipçiler), `user_accounts:write`, `ads:read`, `ads:write`, `billing:read`, `billing:write`, `biz_access:read`, `biz_access:write`, `catalogs:read`, `catalogs:write`, `msot:write`. Birden çok kapsam virgül veya boşlukla ayrılır.
- **Business Access** [RESMÎ]: Birçok uç noktada `ad_account_id` verilerek, token sahibinin rolü olduğu (Owner, Admin, Analyst, Campaign Manager) bir reklam hesabının sahibi adına işlem yapılabilir. Ajans/çoklu marka senaryosunun resmî yoludur.
- Bağlantılar HTTPS üzerindendir; asgari TLS sürümü (ör. 1.2+) kaynakçadaki resmî sayfalarda belirtilmiyor [DOĞRULANAMADI].

## Temel uç noktalar

Taban: `https://api.pinterest.com/v5` (sandbox: `https://api-sandbox.pinterest.com/v5`). Sayfalama `bookmark` + `page_size` ile yapılır. "Kategori" sütunu hız sınırı kategorisidir (`x-ratelimit-category`, OpenAPI'den) [RESMÎ].

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/user_account` | Yetki veren hesabın bilgisi | Trial+ | `org_read`; `user_accounts:read` |
| GET | `/user_account/following` | Hesabın takip ettiği kullanıcılar | Trial+ | `org_read` — takip listesini almanın tek resmî yolu |
| GET | `/user_account/following/boards` | Hesabın takip ettiği panolar | Trial+ | `org_read` |
| GET | `/user_account/followers` | Hesabın takipçileri | Trial+ | `ads_read` kategorisi |
| POST | `/user_account/following/{username}` | Bir kullanıcıyı takip et | **Beta, kısıtlı** | `user_accounts:write`; her uygulamaya açık değil (using-beta-and-restricted-features) |
| GET | `/users/{username}/interests/follow` | Kullanıcının takip ettiği ilgi alanları | Trial+ | Başka kullanıcı adıyla çalışan nadir uç noktalardan |
| GET | `/user_account/analytics`, `/user_account/analytics/top_pins`, `/user_account/analytics/top_video_pins` | Hesap analitiği, en iyi pinler | Trial+ | `org_analytics` |
| GET | `/pins` | Hesaba ait pinleri listele (filtre: `pin_type`, `creative_types`, `domain`) | Trial+ | `org_read` |
| GET | `/pins/{pin_id}` | Tek pin | Trial+ | Başka hesabın pini → 14.09.2026 sonrası uygulamalarda 403 olabilir |
| POST | `/pins` | Pin oluştur (görsel URL/base64, video `media_id`, çoklu görsel) | Trial (sandbox) / Standard (herkese görünür) | `org_write` |
| PATCH / DELETE | `/pins/{pin_id}` | Pin güncelle / sil | Trial+ | `org_write` |
| POST | `/pins/{pin_id}/save` | Pini bir panoya kaydet | Trial+ | `org_write` |
| GET | `/pins/analytics`, `/pins/{pin_id}/analytics` | Pin analitiği | Trial+ | `org_analytics` |
| GET / POST | `/boards` | Panoları listele / oluştur | Trial+ | `boards:read` / `boards:write` |
| GET | `/boards/{board_id}` | Pano bilgisi (kendi panosu veya paylaşılan grup panosu) | Trial+ | Başka hesap → 403 riski |
| GET | `/boards/{board_id}/pins` | Panodaki pinler | Trial+ | `org_read`; takip için ana uç nokta (yalnızca erişilebilir panolarda) |
| GET | `/boards/{board_id}/sections`, `/sections/{section_id}/pins` | Pano bölümleri ve pinleri | Trial+ | `org_read` |
| POST / GET | `/media`, `/media/{media_id}` | Video yükleme kaydı ve durumu | Trial+ | Sandbox'ta video pin yok |
| GET | `/search/pins?query=` | **Hesabın kendi** pinlerinde arama | Trial+ | Genel Pinterest araması değildir |
| GET | `/search/boards?query=` | Hesabın kendi panolarında arama | Trial+ | `org_read` |
| GET | `/search/partner/pins?term=` | Bir terim için Pinterest'te en iyi 10 pin | **Beta, kısıtlı** | Genel aramaya en yakın resmî uç nokta; her uygulamaya açık değil |
| GET | `/trends/keywords/{region}/top/{trend_type}` | Bölgeye göre trend arama kelimeleri (growing, monthly, yearly, seasonal) | Trial+ | `trends_read` (Standard: 60/dk) |
| GET | `/trends/topics/featured`, `/trends/editorial_articles` | Öne çıkan konular, editoryal makaleler | Trial+ | `trends_read` |
| GET | `/terms/related`, `/terms/suggested` | İlgili / önerilen arama terimleri | Trial+ | `ads_read` |
| GET | `/ad_accounts` | Reklam hesaplarını listele | Trial+ | Reklam API'sinin girişi |
| GET/POST/PATCH | `/ad_accounts/{id}/campaigns`, `/ad_groups`, `/ads` | Kampanya, reklam grubu, reklam yönetimi | Trial+ | `ads_read` / `ads_write` |
| GET | `/ad_accounts/{id}/analytics`, `/campaigns/analytics`, `/reports` | Reklam analitiği ve async raporlar | Trial+ | `ads_analytics` |
| POST | `/ad_accounts/{id}/events` | Conversions API (sunucu taraflı dönüşüm olayı) | Trial+ | `ads_conversions`; `is_test` istekleri 10/sn |
| GET/POST | `/ad_accounts/{id}/audiences`, `/customer_lists` | Hedef kitleler | Trial+ | `ads_write` |
| GET/POST | `/ad_accounts/{id}/leads/subscriptions` | **Lead ads webhook** aboneliği | Trial+ (Owner/Admin) | Tek resmî webhook |
| ... | `/catalogs/*` (22 yol), `/businesses/*` (20 yol), `/integrations/*` | Ürün katalogları, işletme erişimi, entegrasyon kayıtları | Trial+ | `catalogs_*` |

Toplam 189 yol vardır; tam liste: [API reference](https://developers.pinterest.com/docs/api/v5/) ve [OpenAPI dosyası](https://github.com/pinterest/api-description) [RESMÎ].

## Gerçek zamanlı / bildirim

- **Genel webhook yok** [RESMÎ — OpenAPI'de yalnızca lead aboneliği var]: Yeni pin, yeni takipçi, yorum, kaydetme vb. için push bildirimi sunulmaz. İzleme **polling** ile yapılır.
- **Lead ads webhook** [RESMÎ]: `POST /ad_accounts/{id}/leads/subscriptions` — reklam formlarından gelen potansiyel müşteri verisi abonenin URL'sine iletilir; veri AES-256-GCM ile şifrelidir; yalnızca reklam hesabının OWNER/ADMIN'i kurabilir.
- **WebSocket / streaming / WebSub**: yok [RESMÎ — belgede yok].
- **RSS** [3. TARAF / test edildi]: `https://www.pinterest.com/<kullanici>/feed.rss` kullanıcının son pinlerini (başlık, bağlantı, küçük görsel, `pubDate`) döndürüyor. Pano RSS'i yaygın olarak `/<kullanici>/<pano-slug>.rss` biçiminde anılıyor [3. TARAF]; denenen örnekte 404 alındı, bu yüzden pano bazında güvenilirliği belirsiz [ÇELİŞKİLİ]. RSS resmî API belgesinde geçmez, değişebilir.
- **Canlı yayın**: v5 API'de canlı yayın kavramı/uç noktası yok [RESMÎ — OpenAPI'de yok].

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Kendi hesabımda yeni pin | Evet | `GET /pins` polling | Trial+ | Basit |
| Başka bir kullanıcının yeni pini | Kısmen | (a) RSS `/<kullanici>/feed.rss` polling; (b) API: `GET /boards/{id}/pins` | (a) kimliksiz [3. TARAF]; (b) Pinner data access onayı (14.09.2026 sonrası uygulamalar) | API'de "kullanıcının pinlerini listele" uç noktası yok; başka hesaba erişim ayrı onay ister |
| Takip ettiğim hesapların akışı (home feed) | Hayır | — | — | Belgede home feed uç noktası yok |
| Takip ettiğim kişiler listesi | Evet | `GET /user_account/following`, `/following/boards` | Trial+ | Hangi kaynakları izleyeceğini belirlemek için kullanılabilir |
| Takip edilen panoya yeni pin | Kısmen | `GET /boards/{id}/pins` polling | Kendi/grup panosu: Trial+; başkasının: onay | 403 `PINNER_DATA_ACCESS_DENIED` tekrar denenmez |
| Anahtar kelimeyle genel pin araması | Kısıtlı | `GET /search/partner/pins` (en iyi 10) | Beta/kısıtlı | `GET /search/pins` yalnızca kendi pinlerinde arar |
| Trend konular / kelimeler | Evet | `/trends/keywords/...`, `/trends/topics/featured` | Trial+ | Filtreleme için iyi sinyal |
| Yorum / beğeni (reaction) | Hayır (doğrudan) | Pin nesnesindeki metrikler ve analitik | Trial+ | v5'te yorum listeleme uç noktası belgede yok |
| Yeni takipçi | Kısmen | `GET /user_account/followers` polling, fark alma | Trial+ | Yalnızca kendi hesabın |
| Canlı yayın başladı | Hayır | — | — | Platformda/API'de yok |
| Reklam lead'i | Evet (push) | Lead ads webhook | Trial+ (Owner/Admin) | Tek gerçek zamanlı kanal |
| Filtreleme (önemli olanı ayıklama) | Uygulama tarafında | Pin `title`, `description`, `link`, `board_id`, `creative_type`, `created_at` alanlarıyla kendi kurallarınla | — | **Dikkat:** Developer Guidelines API'den gelen bilgiyi saklamayı yasaklıyor (aşağıya bkz.) |

**Önemli kısıt — veri saklama** [RESMÎ — Developer Guidelines]: "API dahil Pinterest Materials üzerinden erişilen hiçbir bilgiyi saklayamazsınız" (kendi hesabının veya açıkça izin veren hesapların kampanya analitiği hariç); bilgi gerektiğinde API yeniden çağrılmalı. Ayrıca farklı hesapların bilgisini birleştirmek, Pinterest verisini Pinterest dışında reklam hedeflemede kullanmak ve **AI/ML modeli eğitmek** yasak. Bir takip uygulaması için pratik sonuç: pin içeriğini veritabanında arşivlemek yerine yalnızca ID/işaretçi tutmak ve gösterirken yeniden çekmek daha uyumlu bir tasarımdır [TAHMİN — yorum].

## Hız sınırları ve fiyatlar

Fiyat: API kullanımı ücretsiz [RESMÎ — ücret planı belgede yok]. Limitler [RESMÎ — Rate limits sayfası]:

- **Genel**: Trial → uygulama başına günde 1.000 istek (tüm istekler); Standard → kullanıcı+uygulama başına saniyede 100 istek.
- **Kategori bazında** (Trial: gün/uygulama; Standard: dakika/kullanıcı/uygulama):

| Kategori | Trial (gün) | Standard (dakika) |
|---|---|---|
| `org_read` (pin, pano, kullanıcı okuma) | 1.000 | 1.000 |
| `org_write` (pin, pano yazma) | 300 | 100 |
| `org_analytics` | 1.000 | 60 |
| `trends_read` | 1.000 | 60 |
| `ads_read` | 1.000 | 1.000 |
| `ads_write` | 300 | 400 |
| `ads_analytics` | 1.000 | 300 |
| `ads_conversions` | 1.000 / reklam hesabı | 120.000 / reklam hesabı |
| `catalogs_read` / `catalogs_write` | 1.000 / 1.000 | 100 / 100 |
| `advanced_auction_read` / `_write` | 1.000 / 1.000 | 50 / 25 |

- Yanıt başlıkları: `x-ratelimit-limit` (ör. `100, 100;w=1, 1000;w=60`), `x-ratelimit-remaining`, `x-ratelimit-reset` [RESMÎ]. Limit aşımında HTTP 429 beklenir [TAHMİN — standart davranış].
- Trial'da günde 1.000 istekle polling: örneğin 10 panoyu her 15 dakikada bir sorgulamak günde ~960 istek eder; Trial yalnızca deneme için yeterli [TAHMİN — hesap örneği].
- Rate limit sistemlerini test etmek ayrı izin ister [RESMÎ — Developer Guidelines].

## Resmî olmayan yollar ve riskler

| Yol | Nasıl çalışır | Risk |
|---|---|---|
| Kullanıcı RSS'i (`/<kullanici>/feed.rss`) | Pinterest'in sunduğu herkese açık XML akışı | Düşük; ama API belgesinde yer almaz, uyarısız kalkabilir/değişebilir [3. TARAF] |
| **py3-pinterest** (Python, PyPI 2.0.0, Nisan 2026) | Kullanıcı adı/parola ile web oturumu açar, çerezleri saklar, tarayıcıyı taklit ederek Pinterest sunucularının iç uç noktalarını çağırır; pin, takip, yorum, arama yapar [3. TARAF] | **Yüksek**: Developer Guidelines kimlik bilgisi toplamayı ve otomatik erişimi yasaklar; çerezler ~15 gün sonra 401/403 vermeye başlar [3. TARAF]; hesap kapatma riski |
| **gallery-dl** (PyPI 1.32.16, Ekim 2026), **pinterest-dl** (1.3.0, Haziran 2026) | Herkese açık pin/pano sayfalarını ve iç `resource` JSON uç noktalarını okuyarak görsel/meta veri indirir [3. TARAF] | Orta–yüksek: ToS 2(a) "izinsiz yollarla kazıma, toplama, kopyalama"yı ve "otomatik araçlarla (önceden açık izin olmadan)" erişimi yasaklar [RESMÎ]; telif hakkı riski (görseller pin sahiplerine/üçüncü kişilere ait) |
| Web iç uç noktaları (`www.pinterest.com/resource/...Resource/get/`) | Web uygulamasının kullandığı belgesiz JSON API | Aynı ToS riski; şema uyarısız değişir; IP engeli / CAPTCHA [3. TARAF] |
| Headless tarayıcı ile kazıma | Playwright/Selenium ile sayfayı render edip DOM'dan veri alma | ToS ihlali; KVKK/GDPR açısından kişisel veri (kullanıcı adı, profil) işleme yükümlülüğü doğar [TAHMİN — hukuki değerlendirme değildir] |

Standard incelemesinde "onaylanmamış giriş yöntemleri (kimlik bilgisi veya oturum çerezi toplama)" açık bir ret sebebidir [RESMÎ]; yani resmî olmayan yollar resmî uygulamayla karıştırılmamalıdır.

## SDK ve kütüphaneler

**Resmî** [RESMÎ — github.com/pinterest]:
- [`pinterest-python-sdk`](https://github.com/pinterest/pinterest-python-sdk) — PyPI `pinterest-api-sdk` 0.2.7 (2 Eylül 2026). Ağırlıklı kampanya/reklam yönetimi; organik pin/analitik desteği "zamanla eklenecek" denmiş [3. TARAF — PyPI açıklaması].
- [`pinterest-python-generated-api-client`](https://github.com/pinterest/pinterest-python-generated-api-client) — OpenAPI Generator ile üretilmiş ham Python istemcisi (Ağustos 2026 güncel).
- [`api-quickstart`](https://github.com/pinterest/api-quickstart) — Python, Node.js, Bash, Java örnek kodları (OAuth, pin/pano işlemleri).
- [`api-description`](https://github.com/pinterest/api-description) — OpenAPI 3.0.3 tanımı; buradan **istediğin dilde istemci üretilebilir** (ör. .NET için NSwag, Kiota veya `openapi-generator -g csharp`) [TAHMİN — genel yöntem].

**.NET**: Resmî .NET SDK yok [RESMÎ — Pinterest GitHub'da yok]. Topluluk: `PinSharp` (NuGet 2.2.6; yazarı düzenli bakım yapmadığını belirtiyor, büyük ölçüde eski v1 dönemine ait) [3. TARAF]; `CodeHelper.API.Pinterest` (NuGet, üçüncü taraf) [3. TARAF]. Güncel v5 için önerilen yol OpenAPI'den istemci üretmek veya `HttpClient` ile doğrudan çağırmaktır [TAHMİN].

**Diğer topluluk**: `python-pinterest` (v5 REST sarmalayıcı), `friendlypins` (eski v1, güncel değil) [3. TARAF].

## Postman / OpenAPI / koleksiyonlar

- **Postman** [RESMÎ]: Pinterest Developer Platform ekibi her uç nokta için hazır istekler içeren bir koleksiyonu Postman'deki herkese açık "Pinterest" çalışma alanında tutar; koleksiyon kendi çalışma alanına fork'lanır, Authorization sekmesine app ID/secret ve callback URL girilerek OAuth yapılır. Ayrıntı: [Quickstart tools](https://developers.pinterest.com/docs/developer-tools/quickstart-tools/).
- **OpenAPI** [RESMÎ]: [github.com/pinterest/api-description](https://github.com/pinterest/api-description) — `v5/openapi.json` / `openapi.yaml` (sürüm 5.28.0; depo son güncelleme Haziran 2026). Her işlemde `x-ratelimit-category` ve gerekli kapsamlar yazılıdır.
- **Token Debugger** [RESMÎ]: developers.pinterest.com içinde token'ı doğrulama/inceleme aracı.

## Depoda ilgili sayfalar

- [Mesajlaşma Altyapıları rehberi](../../Rehberler/Mesajlasma-Altyapilari/) — Telegram, WhatsApp, BiP, SMS API'leri (bildirim gönderim tarafı için).

## Kaynaklar

- [Pinterest API v5 reference](https://developers.pinterest.com/docs/api/v5/) — resmî uç nokta referansı [RESMÎ] — (erişim: 15 Ekim 2026)
- [Access tiers](https://developers.pinterest.com/docs/key-concepts/access-tiers/) — Trial/Standard farkları, Standard başvuru adımları, ret sebepleri [RESMÎ] — (erişim: 15 Ekim 2026)
- [Rate limits](https://developers.pinterest.com/docs/reference/rate-limits/) — genel ve kategori bazlı limitler, başlıklar [RESMÎ] — (erişim: 15 Ekim 2026)
- [Set up authentication and authorization](https://developers.pinterest.com/docs/getting-started/set-up-authentication-and-authorization/) — OAuth akışları, token süreleri (örnek yanıttaki 365 gün çelişkisi), client credentials [RESMÎ] — (erişim: 15 Ekim 2026)
- [Sandbox](https://developers.pinterest.com/docs/developer-tools/sandbox/) — sandbox ana makinesi, token, desteklenen alanlar ve kısıtlar [RESMÎ] — (erişim: 15 Ekim 2026)
- [Quickstart tools](https://developers.pinterest.com/docs/developer-tools/quickstart-tools/) — Postman koleksiyonu ve hızlı başlangıç araçları [RESMÎ] — (erişim: 15 Ekim 2026)
- [pinterest/api-description](https://github.com/pinterest/api-description) — OpenAPI 3.0.3 tanımı (5.28.0); bu sayfadaki uç nokta/kapsam/limit kategorisi tablosu ve beta uç nokta bilgisi (`/user_account/following/{username}`) buradan çıkarıldı [RESMÎ] — (erişim: 15 Ekim 2026)
- [Developer Guidelines](https://policy.pinterest.com/en/developer-guidelines) — veri saklama yasağı, kazıma ve AI eğitimi yasağı [RESMÎ] — (erişim: 15 Ekim 2026)
- [Terms of Service](https://policy.pinterest.com/en/terms-of-service) — Madde 2(a): kazıma ve otomatik erişim yasağı [RESMÎ] — (erişim: 15 Ekim 2026)
- [Understanding the PINNER_DATA_ACCESS_DENIED error](https://community.pinterest.biz/t/understanding-the-pinner-data-access-denied-access-error/51738) — 14.09.2026 sonrası uygulamalara gelen kısıt (Pinterest Business Community duyurusu, 1 Ekim 2026) [RESMÎ] — (erişim: 15 Ekim 2026)
- [pinterest-python-sdk](https://github.com/pinterest/pinterest-python-sdk) / [PyPI pinterest-api-sdk](https://pypi.org/project/pinterest-api-sdk) — resmî Python SDK [RESMÎ] — (erişim: 15 Ekim 2026)
- [pinterest/api-quickstart](https://github.com/pinterest/api-quickstart) — resmî örnek kodlar [RESMÎ] — (erişim: 15 Ekim 2026)
- [Pinterest API FAQs (community)](https://community.pinterest.biz/t/frequently-asked-questions-pinterest-api/2083) — erişim başvurusu ve ret konularında SSS [3. TARAF/topluluk] — (erişim: 15 Ekim 2026)
- [py3-pinterest](https://pypi.org/project/py3-pinterest) — resmî olmayan, web oturumu taklit eden Python istemcisi [3. TARAF] — (erişim: 15 Ekim 2026)
- [gallery-dl](https://pypi.org/project/gallery-dl/) ve [pinterest-dl](https://pypi.org/project/pinterest-dl/) — kazıma/indirme araçları [3. TARAF] — (erişim: 15 Ekim 2026)
- [PinSharp (NuGet)](https://www.nuget.org/packages/PinSharp/) — topluluk .NET sarmalayıcısı, bakımı sınırlı [3. TARAF] — (erişim: 15 Ekim 2026)
