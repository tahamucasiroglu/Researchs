# Rumble ve Diğer Yayın Platformları API (Rumble · Trovo · DLive (kapandı) · Facebook Live)

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: Rumble **kısıtlı** (yalnızca kendi kanalın için beta API) · Trovo **aktif** · DLive **KAPANDI (27 Nisan 2026)** · Facebook Live **aktif, App Review şart**

Bu sayfa Twitch / YouTube / Kick dışındaki yayın platformlarını **canlı yayın tespiti** açısından kısa tutar. Etiketler: **[RESMÎ]** resmî dokümandan okundu · **[3. TARAF]** topluluk/entegrasyon kaynağı · **[TAHMİN]** doğrulanmadı, çıkarım · **[ÇELİŞKİLİ]** kaynaklar birbirini tutmuyor.

## Özet

- **Rumble**: Genel amaçlı herkese açık bir API yok. Yayıncının hesabından üretilen gizli bir URL ("Live Stream API", v1.0/v1.1 beta) yalnızca **o hesabın** takipçi, abone, sohbet ve `is_live` verisini JSON olarak verir; ücretsizdir ama başkasının kanalını izlemek için kullanılamaz. [RESMÎ]
- **Trovo**: Ücretsiz Open Platform; `Client-ID` başlığıyla herhangi bir kanalın `is_live` bilgisi alınabilir, sohbet WebSocket'inde yayın açıldı/kapandı mesajı (tip 5012) vardır. [RESMÎ]
- **DLive**: **Platform kapandı.** 7 Nisan 2026'da faaliyetlerini sonlandıracağını duyurdu; kapanış 27 Nisan 2026'da gerçekleşti. `dlive.tv` artık yalnızca "DLive Service Discontinued" sayfası gösteriyor. API, WebSocket ve uygulama başvurusu çalışmıyor; `docs.dlive.tv` dokümanının hâlâ yayında olması platformun çalıştığı anlamına gelmez. Eski API bilgisi aşağıda [DLive (tarihsel)](#dlive-tarihsel--platform-kapalı) bölümünde. [3. TARAF — Wikipedia, Dexerto; dlive.tv kapanış sayfası]
- **Facebook Live**: Graph API'nin Live Video API'si asıl olarak **yayın göndermek** içindir. Yalnızca yönettiğin (yetki verilmiş) Sayfalarda canlı yayın durumu webhook (`live_videos` alanı) ile alınabilir; başkasının Sayfasını izlemek pratikte kapalıdır. App Review gerekir; ücret yoktur. [RESMÎ]

## Erişim seviyeleri

| Platform / Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Rumble** · Herkese açık | — | Resmî bir kamu API'si yok; yalnızca web sayfaları. RSS akışı: **belgede yok** [RESMÎ dokümanda bulunamadı] | — |
| **Rumble** · Kendi hesabın (Live Stream API) | Rumble hesabı → `rumble.com/account/livestream-api` sayfasında URL üretmek | O hesabın/kanalın takipçi, abone, hediye abonelik, yayın listesi (`livestreams[].is_live`), sohbet ve "rant" verisi | Ücretsiz; hız sınırı **belgede yok** [RESMÎ] |
| **Rumble** · İşletme/partner | — | Belgede yok | — |
| **Rumble** · Resmî olmayan | Web sayfası kazıma | Kanal sayfasındaki "LIVE" etiketi, video listesi | ToS riski [TAHMİN] |
| **Trovo** · Geliştirici uygulaması | developer.trovo.live'da uygulama → `Client-ID` | Kanal bilgisi (`is_live`), kullanıcı arama, en popüler canlı kanallar, geçmiş yayınlar, klipler, herhangi bir kanalın sohbetini okuma | Ücretsiz; 1200 istek/dk/Client-ID [RESMÎ] |
| **Trovo** · Kullanıcı OAuth | `Authorization: OAuth <token>` + scope | Kendi kanal bilgisi (stream key dahil), sohbet gönderme, abone listesi, moderasyon | Aynı limit [RESMÎ] |
| **Trovo** · Partner | Trovo onayı | `/livestreamurl` (m3u8 akış adresleri) | Partner olmayanlara boş yanıt [RESMÎ] |
| **DLive** · Tüm seviyeler | — | **Platform 27 Nisan 2026'da kapandı**; erişim yok. Eski seviyeler için bkz. [DLive (tarihsel)](#dlive-tarihsel--platform-kapalı) | — |
| **Facebook Live** · Geliştirici uygulaması (Development mode) | Meta uygulaması; yalnızca uygulamada rolü olan kullanıcılar | Kendi profil/Sayfanda yayın oluşturma ve okuma testi | Ücretsiz [RESMÎ] |
| **Facebook Live** · App Review / Business Verification | Live Video API özelliği + `publish_video`, `pages_manage_posts`, `pages_read_engagement`; webhook için `pages_manage_metadata` | Yetki verilen Sayfaların canlı yayınları, `live_videos` webhook'u | Ücretsiz; Graph API hız sınırları [RESMÎ] |
| **Facebook Live** · Başka Sayfaları izleme | Page Public Content Access (PPCA) vb. özel özellik | Başkasının Sayfasındaki canlı yayın: **belgede açık bir yol bulunamadı** [TAHMİN] | — |
| **Facebook Live** · Resmî olmayan | Sayfa kazıma | — | Meta ToS ihlali, hesap/IP engeli riski yüksek [TAHMİN] |

## Kimlik doğrulama

- **Rumble**: "Bu API sürümünde kimlik doğrulama gerekmez." URL'nin kendisi gizli anahtar gibidir; URL'yi bilen herkes veriyi okur, sıfırlanarak erişim iptal edilir. [RESMÎ] Yol `https://rumble.com/-livestream-api/get-data` [3. TARAF — Pipedream]; URL kullanıcı ID'si ve live stream key içerir [RESMÎ]; tam sorgu parametresi biçimi [TAHMİN]. Hesap sayfasında üretilen URL olduğu gibi kullanılmalı.
- **Trovo**: Her istekte `Client-ID: <client_id>` başlığı. Kullanıcı yetkisi için `Authorization: OAuth <access_token>`; Implicit veya Authorization Code akışı (`https://open.trovo.live/page/login.html`, `POST /exchangetoken`, `/refreshtoken`, `/validate`, `/revoke`). Drops uç noktaları için HMAC-SHA1 imzalı app token (`Trovo-Tm`, `Trovo-Signature`). [RESMÎ]
- **Facebook Live**: Graph API User veya Page access token. Sayfa yayınları için Page admin token'ı + `pages_read_engagement`, `pages_manage_posts`; profil için `publish_video`. Webhook için Sayfa yöneticisinin `pages_manage_metadata` izni vermesi gerekir. [RESMÎ] Ayrıntı: [Meta Graph API genel](../Sosyal-Medya/Meta-Graph-API-Genel.md).

## Temel uç noktalar

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `https://rumble.com/-livestream-api/get-data` (+ hesap sayfasında üretilen sorgu kısmı) | Kendi hesabın: takipçi/abone sayıları, `livestreams[]` (`id`, `title`, `created_on`, `is_live`, `watching_now`, `likes`, `chat.recent_messages`, `recent_rants`) | Rumble kendi hesap | `livestreams` yalnızca yayın sırasında dolu; sohbet+rant en fazla 50 sonuç; son takipçi listesi de en fazla 50 kişi [RESMÎ]; yol [3. TARAF], sorgu parametresi biçimi [TAHMİN] |
| POST | `https://open-api.trovo.live/openplatform/channels/id` | `channel_id` veya `username` ile kanal bilgisi; **`is_live`** içerir | Trovo Client-ID | "Gerçek zamanlı" güncellenir [RESMÎ] |
| POST | `/openplatform/getusers` | Kullanıcı adından kanal/kullanıcı ID'si | Trovo Client-ID | [RESMÎ] |
| POST | `/openplatform/gettopchannels` | En çok izlenen canlı kanallar (kategoriye göre süzülebilir, sayfalı) | Trovo Client-ID | Dakikada bir yenilenir [RESMÎ] |
| POST | `/openplatform/paststreams`, `/clips` | Geçmiş yayınlar, klipler | Trovo Client-ID | [RESMÎ] |
| GET | `/openplatform/chat/channel-token/{channelID}` | Herhangi bir kanalın sohbetine bağlanmak için token | Trovo Client-ID | Token 20 sn içinde kullanılmalı [RESMÎ] |
| POST | `/openplatform/livestreamurl` | Yayının m3u8 adresleri | Trovo partner | `Referer` başlığı zorunlu [RESMÎ] |
| GET | `https://graph.facebook.com/v26.0/{live-video-id}?fields=…` | Tek bir canlı yayının alanları (ör. `status`, `ingest_streams`) | Facebook App Review | `publish_video` [RESMÎ] |
| GET | `/{page-id}/live_videos` (`broadcast_status` filtresiyle) | Sayfanın canlı/planlı yayınlarını listeleme | Facebook App Review | **[ÇELİŞKİLİ]** Güncel (v26.0) Page `live_videos` referans sayfası okuma işlemi için "bu uç noktada yapılamaz" diyor; eski entegrasyonlarda kullanılıyor. Webhook tercih edin. |
| POST | `/{page-id}/live_videos?status=LIVE_NOW` | Yayın oluşturma (RTMPS adresi döner) | Facebook App Review | Takip için değil, yayın için [RESMÎ] |

Tam listeler: Trovo [APIs](https://developer.trovo.live/docs/APIs.html), Meta [Live Video API](https://developers.facebook.com/docs/live-video-api/).

## Gerçek zamanlı / bildirim

| Platform | Mekanizma | Ayrıntı |
|---|---|---|
| Rumble | Yalnızca **polling** | Webhook/WebSocket belgede yok. Doküman "gerçek zamanlı güncellenir" diyor ama yoklama aralığı belirtmiyor [RESMÎ]. 15–60 sn aralık makul [TAHMİN]. RSS: belgede yok. |
| Trovo | **Chat WebSocket** `wss://open-chat.trovo.live/chat` | Mesaj tipi **5012** = "yayın açıldı/kapandı" (izleyicilere görünmez, içerik örn. `stream_on`); 5003 = takip. Herhangi bir kanal için token anahtarsız alınabilir; çok kanal için shard token (`/chat/shard-token`) — **[ÇELİŞKİLİ]** APIs sayfasındaki hata kodlarına (11709) göre beyaz listedeki (trusted/whitelisted) geliştiricilerle sınırlı olabilir; Chat Service sayfası kısıt belirtmiyor. 5012'nin her durumda tetiklendiği belgede garanti edilmiyor → `is_live` yoklamasıyla doğrula. Webhook yok. [RESMÎ] |
| DLive | — | **Platform kapandı (27 Nisan 2026)**; WebSocket çalışmıyor. |
| Facebook Live | **Webhooks** (Page nesnesi, `live_videos` alanı) | Sayfanın canlı yayın durumu değişince `value.id` + `value.status` gelir. Yalnızca uygulamanın abone olduğu ve `pages_manage_metadata` verilmiş Sayfalar. [RESMÎ] |

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Rumble: başkasının kanalı canlıya geçti | Resmî olarak hayır | Kanal sayfasını yoklama/kazıma | Resmî olmayan | ToS ve HTML değişikliği riski [TAHMİN] |
| Rumble: kendi kanalın canlıya geçti | Evet | `get-data` yoklama, `livestreams[].is_live` | Kendi hesap | Yayıncı kendi URL'sini paylaşırsa onun kanalı da izlenebilir (rıza ile) [RESMÎ mantığı] |
| Rumble: yeni video | Resmî yok | Kanal sayfası kazıma | Resmî olmayan | RSS belgede yok |
| Trovo: kanal canlıya geçti | Evet | WebSocket tip 5012 + `/channels/id` `is_live` yoklaması | Client-ID | 1200 istek/dk bütçesi geniş [RESMÎ] |
| Trovo: sohbet içeriği / anahtar kelime | Evet | Chat WebSocket, istemci tarafında filtre | Client-ID | [RESMÎ] |
| DLive: kanal canlıya geçti | Hayır, platform kapandı | — | — | 27 Nisan 2026'da kapandı |
| DLive: sohbet/anahtar kelime | Hayır, platform kapandı | — | — | 27 Nisan 2026'da kapandı |
| Facebook: yönettiğin Sayfa canlıya geçti | Evet | `live_videos` webhook | App Review | [RESMÎ] |
| Facebook: başkasının Sayfası/profili canlı | Pratikte hayır | — | — | Resmî yol bulunamadı [TAHMİN] |
| Facebook: canlı yayın yorumları | Kısmen | `GET /v26.0/{live-video-id}/comments` (yönetilen Sayfa) | App Review | Uç nokta [RESMÎ — LiveVideo `comments` referansı]; gerekli izinler referans sayfasında açıkça yazmıyor (yalnızca 200 "Permissions error") |

## Hız sınırları ve fiyatlar

- **Rumble**: Ücretsiz; hız sınırı belgede yok. [RESMÎ]
- **Trovo**: Ücretsiz; varsayılan **1200 istek/dakika/Client-ID** (aynı ID'yi kullanan tüm uygulamalar paylaşır). Aşımda durum kodu `11706`. Başlıklar: `x-ratelimit-limit`, `x-ratelimit-remaining`, `x-ratelimit-reset`. Artırım için developer@trovo.live. [RESMÎ]
- **Facebook**: Ücretsiz; Graph API genel uygulama/Sayfa hız sınırları (Business Use Case) geçerli [RESMÎ — genel Graph dokümanı]. Yayın yapabilmek için hesap ≥ 60 gün, Sayfa/profesyonel profil ≥ 100 takipçi (10 Haziran 2024'ten beri). [RESMÎ]

## Resmî olmayan yollar ve riskler

- **Rumble kanal sayfası kazıma**: `rumble.com/c/<kanal>` veya `/user/<ad>` sayfasında canlı etiketi ve video listesi HTML'den ayrıştırılır. Resmî değildir; HTML yapısı değişince kırılır; yoğun istek IP engeline yol açabilir; Rumble kullanım koşullarına aykırı olabilir. [TAHMİN — bu araştırmada resmî RSS veya kamu uç noktası doğrulanamadı]
- **Rumble embed/oEmbed**: Video gömme için oEmbed uç noktası olduğu topluluklarca bilinir; canlı tespiti için uygun olduğu doğrulanmadı. [TAHMİN]
- **Trovo**: Resmî API yeterli; resmî olmayan yola gerek yok. (DLive kapandığı için hiçbir yol yok.)
- **Facebook**: Sayfa kazıma Meta ToS'una açıkça aykırıdır, giriş isteyen içerik kazımada hukuki risk (Meta'nın kazıyıcılara karşı açtığı davalar bilinir) [3. TARAF]. Önerilmez.

## SDK ve kütüphaneler

- **Rumble**: Resmî SDK yok. Pipedream'de hazır Rumble bağlayıcısı (Live Stream API anahtarıyla) var. [3. TARAF] .NET: `HttpClient` + `System.Text.Json` yeterli.
- **Trovo**: Resmî SDK belgede yok. .NET: REST + `ClientWebSocket` ile kolay. Topluluk kütüphaneleri bu araştırmada doğrulanmadı ("belgede yok").
- **Facebook**: Resmî Facebook Business SDK (Python, Node, PHP, Java, Ruby). .NET için resmî SDK yok; `HttpClient` ile Graph çağrıları ya da topluluk paketleri. [RESMÎ/3. TARAF]

## Postman / OpenAPI / koleksiyonlar

- **Rumble**: Yok (belgede yok).
- **Trovo**: OpenAPI/Postman belgede yok.
- **Facebook**: Meta'nın resmî Postman çalışma alanı (Graph API koleksiyonları) mevcut; Graph API Explorer ile deneme yapılabilir. [RESMÎ — Meta for Developers]

## DLive (tarihsel — platform kapalı)

> **Tarihsel bilgi.** DLive 7 Nisan 2026'da kapanacağını duyurdu, 22 Nisan'da kapanış tarihini 27 Nisan 2026 olarak bildirdi ve o tarihte kapandı. Aşağıdakiler yalnızca kapanış öncesi resmî dokümanın (hâlâ `docs.dlive.tv`'de duran) özetidir; **hiçbiri artık çalışmaz.**

- Erişim: GraphQL API; uygulama kaydı `go.dlive.tv/developers` formu veya e-posta ile başvuru/onayla yapılıyordu (client ID/secret). Bot hesabı ayrıca talep ediliyordu.
- Kimlik doğrulama: OAuth 2.0 — `https://dlive.tv/o/authorize`, `https://dlive.tv/o/token`; Authorization Code ve Client Credentials (app token). En az bir scope zorunlu (`identity`).
- Uç nokta: `https://api.dlive.tv` (GraphQL) — `userByDisplayName` / `user` → `livestream { … }` (çevrimdışıysa `null`).
- Gerçek zamanlı: `wss://api-ws.dlive.tv`, `streamMessageReceived` içinde `Live` / `Offline` olayları; bağlantı başına 50 uç, IP başına 100 bağlantı.
- Limit: 5000 istek / 5 dakika, aşımda HTTP 429.

## Depoda ilgili sayfalar

- [Meta Graph API genel](../Sosyal-Medya/Meta-Graph-API-Genel.md) — token, App Review, Business Verification ayrıntıları
- [Instagram](../Sosyal-Medya/Instagram.md) · [Threads](../Sosyal-Medya/Threads.md)
- Aynı klasördeki Twitch / YouTube / Kick sayfaları (canlı yayın tespitinin ana platformları)

## Kaynaklar

1. [Rumble — How to use Rumble's Live Stream API](https://rumble.support/en/help/how-to-use-rumble-s-live-stream-api) — resmî yardım makalesi; alanlar, kimlik doğrulamasız URL, 50 sonuç sınırı (son güncelleme 20.11.2025) — [RESMÎ] (erişim: 15 Ekim 2026)
2. [Trovo Developer — APIs](https://developer.trovo.live/docs/APIs.html) — uç noktalar, OAuth, scope'lar, 1200/dk limit — [RESMÎ] (erişim: 15 Ekim 2026)
3. [Trovo Developer — Chat Service](https://developer.trovo.live/docs/Chat%20Service.html) — WebSocket adresi, chat token'ları, mesaj tipleri (5012 yayın açık/kapalı) — [RESMÎ] (erişim: 15 Ekim 2026)
4. [DLive API dokümanı (tam metin)](https://docs.dlive.tv/api/llms-full.txt) — kapanış öncesi GraphQL/WebSocket dokümanı (tarihsel; platform kapalı) — [RESMÎ] (erişim: 15 Ekim 2026)
5. [DLive — OAuth 2.0](https://docs.dlive.tv/api/authentication-oauth2/oauth-2.0.md) — tarihsel; yetkilendirme/token uç noktaları — [RESMÎ] (erişim: 15 Ekim 2026)
6. [DLive — Limits](https://docs.dlive.tv/api/api/limits.md) — tarihsel; 5000/5 dk ve WebSocket sınırları — [RESMÎ] (erişim: 15 Ekim 2026)
7. [Meta — Live Video API](https://developers.facebook.com/docs/live-video-api/) — izinler, App Review, 60 gün/100 takipçi kuralı — [RESMÎ] (erişim: 15 Ekim 2026)
8. [Meta — Live Video API: Streaming rehberi](https://developers.facebook.com/docs/live-video-api/guides/streaming) — LiveVideo okuma, durum değerleri (LIVE, VOD, PREVIEW) — [RESMÎ] (erişim: 15 Ekim 2026)
9. [Meta — Page Webhooks referansı](https://developers.facebook.com/docs/graph-api/webhooks/reference/page/) — `live_videos` alanı, `pages_manage_metadata` — [RESMÎ] (erişim: 15 Ekim 2026)
10. [Meta — Page live_videos referansı](https://developers.facebook.com/docs/graph-api/reference/page/live_videos/) — oluşturma `status` değerleri (v26.0) — [RESMÎ] (erişim: 15 Ekim 2026)
11. [Pipedream — Rumble entegrasyonu](https://pipedream.com/apps/rumble) — `https://rumble.com/-livestream-api/get-data` yolu (kimlik bilgisini Pipedream ekliyor; sorgu parametresi gösterilmiyor) — [3. TARAF] (erişim: 15 Ekim 2026)
12. [Meta — LiveVideo comments referansı](https://developers.facebook.com/docs/graph-api/reference/live-video/comments/) — `GET /v26.0/{live-video-id}/comments`; izinler sayfada belirtilmemiş — [RESMÎ] (erişim: 15 Ekim 2026)
13. [Wikipedia — DLive](https://en.wikipedia.org/wiki/DLive) — 7 Nisan 2026 duyuru, 27 Nisan 2026 kapanış — [3. TARAF] (erişim: 15 Ekim 2026)
14. [Dexerto — DLive closes down after 8 years](https://www.dexerto.com/entertainment/twitch-competitor-dlive-closes-down-after-8-years-3347823/) — 7 Nisan 2026 kapanış duyurusu — [3. TARAF] (erişim: 15 Ekim 2026)
15. [dlive.tv](https://dlive.tv/) — "DLive Service Discontinued" kapanış sayfası — [RESMÎ] (erişim: 15 Ekim 2026)

> Not: Rumble RSS ve Facebook `GET /{page-id}/live_videos` okuma davranışı ileride yeniden doğrulanmalı.
