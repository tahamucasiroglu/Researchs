# Viber ve LINE API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: Viber → kısıtlı (bot yalnızca ticari koşullarla) · LINE → aktif

> Not: Bu sayfa hazırlanırken web arama kotası dolduğu için bilgiler doğrudan resmî doküman sayfaları okunarak toplandı; resmî belgede bulunamayan bilgiler [3. TARAF] veya [TAHMİN] olarak etiketlendi.

## Özet

**Viber**, Rakuten Viber'ın iki geliştirici ürününü sunar: abonelere bire bir mesaj gönderen **Bot API (REST)** ve bir kanala yalnızca gönderi yapmaya yarayan **Channels Post API**. 5 Şubat 2024'ten beri yeni bot yalnızca **ticari koşullarla** açılabiliyor; başvuru doğrudan Rakuten Viber'a ya da onaylı iş ortaklarına yapılıyor [RESMÎ]. Viber'ın güçlü olduğu yerler Doğu Avrupa, Balkanlar, Orta Doğu ve Filipinler [3. TARAF].

**LINE**, bir **LINE Official Account** (resmî hesap) üzerinden çalışan **Messaging API**'yi sunar. Herkes ücretsiz başlayabilir, aylık ücretsiz mesaj kotası seçilen plana göre değişir. Reply (yanıt) mesajları kotaya sayılmaz [RESMÎ]. LINE en çok Japonya, Tayvan, Tayland ve Endonezya'da kullanılır [3. TARAF]. Ayrıca **LINE Notify** hizmeti 31 Mart 2025'te kapatıldı, yerine Messaging API öneriliyor [RESMÎ, [LINE Notify kapanış duyurusu](https://notify-bot.line.me/closing-announce)].

## Erişim seviyeleri

### Viber

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | — | API erişimi yok. Kanalların web önizlemesi sınırlı | — |
| Geliştirici hesabı/uygulama | **Bot:** 2024'ten beri ayrı bir ücretsiz geliştirici seviyesi yok [RESMÎ]. **Kanal:** kanalın *super admin*'i olmak, Viber 17.7+ [RESMÎ] | Channels Post API: kanala gönderi yapma, kanal bilgisi (`get_account_info`) | Ücret belgede yok |
| İşletme/uygulama onayı | Rakuten Viber'a ya da onaylı partnere ticari başvuru [RESMÎ] | Bot API: `send_message`, `broadcast_message`, webhook, kullanıcı bilgisi | Ücretli, ayrıntı aşağıda |
| Ücretli/kurumsal | **Business Messages** (telefon numarasına mesaj, partnerler üzerinden) [RESMÎ] | Promosyon ve işlem mesajları, telefon numarasıyla gönderim | Partner fiyatlandırması |
| Resmî olmayan | — | Yaygın bir topluluk istemcisi bulunamadı | — |

### LINE

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | — | API yok | — |
| Geliştirici hesabı/uygulama | LINE Official Account + LINE Developers Console'da Messaging API kanalı [RESMÎ] | Reply, push, multicast, broadcast, narrowcast, profil, grup özeti, webhook, rich menu | Ücretsiz plan (Japonya: ayda 200 mesaj) [RESMÎ] |
| İşletme/uygulama onayı | **Verified** veya **Premium** hesap (LINE'ın inceleyip onayladığı hesap) [RESMÎ] | `followers/ids` (takipçi listesi), grup üye ID listesi | Plan ücreti |
| Ücretli/kurumsal | Light / Standard plan, Partner programı | Daha yüksek mesaj kotası, ek mesaj satın alma | Japonya: 5.000 / 15.000 JPY/ay [RESMÎ] |
| Resmî olmayan | Kişisel hesap ile tersine mühendislik yapan "self-bot" kütüphaneleri [3. TARAF] | Kişisel sohbetleri ve grupları okuma | ToS ihlali, hesap kapatma riski |

## Kimlik doğrulama

**Viber** [RESMÎ]
- Her istekte `X-Viber-Auth-Token: <token>` başlığı gönderilir. Bot token'ı botun bilgi düzenleme ekranında ya da Viber Admin Panel'de, kanal token'ı ise kanal bilgi ekranındaki **Developer Tools** bölümündedir.
- Webhook çağrılarında `X-Viber-Content-Signature` başlığı bulunur. Bu, gövdenin token ile hesaplanan HMAC-SHA256 değeridir; doğrulanmalıdır.
- Uç noktalar en az TLS 1.2 ister (4 Şubat 2024'ten beri). Webhook adresinde güvenilir bir sertifika otoritesinin verdiği SSL sertifikası olmalıdır; self-signed sertifika kabul edilmez.

**LINE** [RESMÎ]
- `Authorization: Bearer {channel access token}` başlığı kullanılır. Token türleri şunlardır:
  - **long-lived:** Console'dan alınır.
  - **v2.1:** JWT assertion ile alınır, süresi ayarlanabilir.
  - **stateless:** 15 dakika geçerlidir.
  - **short-lived:** kısa ömürlüdür.
- Webhook doğrulaması için `x-line-signature` başlığı kullanılır. Değer, gövdenin **channel secret** ile hesaplanan HMAC-SHA256 değerinin Base64 kodlamasıdır.
- Aynı isteğin iki kez işlenmesini önlemek için `X-Line-Retry-Key: <UUID>` başlığı push, multicast, narrowcast ve broadcast isteklerinde kullanılabilir. Aynı anahtar tekrar gönderilirse `409` döner.

## Temel uç noktalar

### Viber — taban: `https://chatapi.viber.com/pa/`

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| POST | `/set_webhook` | Callback adresini ve olay türlerini ayarlar. Boş `url` webhook'u kaldırır | Bot / Kanal | Güvenilir SSL sertifikası şart |
| POST | `/send_message` | Abone olan bir kullanıcıya mesaj gönderir (text, picture, video, file, location, contact, sticker, `rich_media` (carousel), url, keyboard) | Bot (ticari) | İstek en fazla 30 KB, metin en fazla 7.000 karakter |
| POST | `/broadcast_message` | Birden çok aboneye mesaj gönderir | Bot (ticari) | İstek başına en fazla 300 alıcı; 10 saniyede 500 istek |
| POST | `/get_account_info` | Bot/kanal adı, kategorisi, webhook'u ve abone sayısını döndürür | Bot / Kanal | `members` alanı botlarda deprecated |
| POST | `/get_user_details` | Tek kullanıcının bilgisini döndürür | Bot | Kullanıcı başına 12 saatte 2 kez |
| POST | `/get_online` | Kullanıcıların çevrimiçi durumunu döndürür | Bot | İstek başına en fazla 100 ID |
| POST | `/post` | Kanala gönderi yapar (Channels Post API) | Kanal super admin | Gönderen olarak yalnızca super admin ID'si kullanılır. Gönderi yapabilmek için kanalın webhook'u (`set_webhook`, güvenilir SSL) ayarlı olmalı; ayarlanmazsa `10 webhookNotSet` hatası döner [RESMÎ] |

Tam liste için: [REST Bot API](https://developers.viber.com/docs/api/rest-bot-api/) ve [Channels Post API](https://developers.viber.com/docs/tools/channels-post-api/).

### LINE — taban: `https://api.line.me` (içerik: `https://api-data.line.me`)

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| POST | `/v2/bot/message/reply` | Webhook olayına yanıt verir | Geliştirici | Reply token tek kullanımlık ve 1 dakika geçerli, en fazla 5 mesaj; **kotaya sayılmaz** |
| POST | `/v2/bot/message/push` | Arkadaşa, grup ya da odaya istediği zaman mesaj gönderir | Geliştirici | Kotaya sayılır |
| POST | `/v2/bot/message/multicast` | Birden çok kullanıcıya mesaj gönderir | Geliştirici | En fazla 500 ID; grup gönderimi yok; saniyede 200 istek |
| POST | `/v2/bot/message/broadcast` | Tüm arkadaşlara mesaj gönderir | Geliştirici | Saatte 60 istek |
| POST | `/v2/bot/message/narrowcast` | Hedefli toplu gönderim yapar (özellik ya da kitleye göre) | Geliştirici | Saatte 60 istek; en az 50 alıcı |
| GET | `/v2/bot/message/{messageId}/content` (api-data) | Kullanıcının gönderdiği görsel, video, ses veya dosyayı indirir | Geliştirici | İçerik bir süre sonra silinir |
| GET | `/v2/bot/profile/{userId}` | Ad, profil resmi ve durum mesajını döndürür | Geliştirici | — |
| GET | `/v2/bot/followers/ids` | Takipçi ID listesini döndürür | **Verified/Premium** | Engelleyenler ve izin vermeyenler listeye girmez |
| GET | `/v2/bot/group/{groupId}/summary` | Grup adını ve resmini döndürür | Geliştirici | Yalnızca botun üye olduğu gruplar |
| GET | `/v2/bot/group/{groupId}/members/count` | Gruptaki üye sayısını döndürür | Geliştirici | — |
| GET | `/v2/bot/group/{groupId}/members/ids` | Grup üyelerinin ID'lerini döndürür | **Verified/Premium** | Sayfa başına 100 ID |
| GET | `/v2/bot/group/{groupId}/member/{userId}` | Grup üyesinin profilini döndürür | Geliştirici | — |
| GET | `/v2/bot/message/quota` · `/quota/consumption` | Aylık kotayı ve kullanılan miktarı döndürür | Geliştirici | — |
| GET | `/v2/bot/info` | Bot bilgisini döndürür | Geliştirici | — |
| PUT/GET | `/v2/bot/channel/webhook/endpoint` | Webhook adresini ayarlar ya da okur | Geliştirici | Dakikada 1.000 istek |
| POST | `/v2/bot/chat/markAsRead` | Mesajı okundu olarak işaretler | Geliştirici | `markAsReadToken` gerekir; bu token webhook mesaj olayında gelir. Bot ayarı `markAsReadMode=manual` olmalı (`/v2/bot/info` yanıtında görülür; Official Account Manager'da Chat "On"). Eski `/v2/bot/message/markAsRead` yalnızca partnerlere açıktır |

Tüm uç noktalar (insight, audience, rich menu, coupon, membership) için: [Messaging API reference](https://developers.line.biz/en/reference/messaging-api/).

## Gerçek zamanlı / bildirim

**Viber — yalnızca webhook** [RESMÎ]
- **Zorunlu olaylar** (kapatılamaz): `message`, `subscribed`, `unsubscribed`.
- **İsteğe bağlı olaylar:** `delivered`, `seen`, `failed`, `conversation_started`.
- Webhook HTTP 200 dönmezse Viber çağrıyı 10 kez daha dener; bekleme süresi 10 saniyeden 900 saniyeye kadar artar.
- Kanal tarafında, kanala yapılan gönderiler ve kullanıcı gönderileri webhook'u **tetiklemez**. Belge bu konuda kendi içinde çelişkilidir [ÇELİŞKİLİ].
- WebSocket, RSS ya da streaming yoktur.

**LINE — yalnızca webhook** [RESMÎ]
- **Olaylar:**
  - `message` (text, image, video, audio, file, location, sticker)
  - `messageEdited`, `unsend`
  - `follow`, `unfollow`
  - `join`, `leave`
  - `memberJoined`, `memberLeft`
  - `postback`, `videoPlayComplete`, `beacon`, `accountLink`, `membership`
  - Ayrıca modül/partner kanalları için `module`, `activated`, `deactivated`, `botSuspended`, `botResumed` ve PNP için `delivery` olayları vardır (line-openapi `webhook.yml`).
- Console'da açılabilen bir webhook yeniden gönderim (redelivery) seçeneği vardır [RESMÎ].
- WebSocket ya da RSS yoktur.

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Viber: bota gelen bire bir mesaj | Evet | Webhook `message` | Bot (ticari) | Kullanıcı önce botla konuşmayı başlatmış olmalı |
| Viber: grup veya topluluk mesajlarını okuma | Hayır | — | — | Bot API grup/topluluk okuma sunmuyor (belgede yok) |
| Viber: başkasının kanalındaki yeni gönderi | Hayır | — | — | Channels API yalnızca **kendi** kanalına gönderi yapar; okuma uç noktası yok [RESMÎ] |
| Viber: kendi kanalına bildirim gönderme (takip sonucunu yayınlama) | Evet | `/pa/post` | Kanal super admin | Ücret belgede yok; çıkış kanalı olarak kullanılabilir. Önce kanalın webhook'u (`set_webhook`, güvenilir SSL) ayarlanmalı; yoksa `webhookNotSet` hatası döner [RESMÎ] |
| LINE: bota gelen bire bir mesaj | Evet | Webhook `message` | Geliştirici | Reply ücretsiz |
| LINE: botun eklendiği grup mesajları | Evet | Webhook `message` (source: group) | Geliştirici | Console'da "Allow bot to join group chats" açık olmalı. Bir grupta yalnızca bir resmî hesap bulunabilir [RESMÎ] |
| LINE: başka resmî hesabın paylaşımı (VOOM/timeline) | Hayır | — | — | API yok (belgede yok) |
| LINE: OpenChat (açık sohbet) içeriği | Hayır | — | — | Resmî OpenChat API'si belgede yok |
| Anahtar kelime ile filtreleme | Kendin | Webhook gövdesinde `text` alanını filtrele | — | Sunucu tarafında filtre seçeneği yok |
| Takip sonucunu kullanıcıya iletme | Evet | LINE push/multicast, Viber send/broadcast | Geliştirici / ticari | LINE push kotaya sayılır; Viber oturum dışı mesajlar ücretlidir |

**Sonuç:** İki platform da takip uygulaması için **kaynak** olarak zayıf, **bildirim kanalı** olarak kullanışlıdır. Botun bulunmadığı yerlerdeki içerik resmî yoldan okunamaz.

## Hız sınırları ve fiyatlar

**Viber** [RESMÎ]
- Broadcast için 10 saniyede 500 istek, istek başına 300 alıcı sınırı vardır.
- İstek başına en fazla 30 KB gönderilebilir. `get_user_details` kullanıcı başına 12 saatte 2 kez çağrılabilir.
- Sınır aşılınca `12 tooManyRequests` hatası döner.
- **Ücret modeli:** Botlar 5 Şubat 2024'ten beri ticari koşullara bağlıdır. Yanıttaki `billing_status` alanı mesajın ücretlendirilip ücretlendirilmediğini gösterir:
  - `3–4`: oturum dışı ücretsiz mesaj
  - `5`: oturum dışı ücretli mesaj
- İlgili hata kodları:
  - `23 freeMessagesExceeded`: aylık ücretsiz mesaj eşiği aşıldı.
  - `24 noBalance`: bakiye yetersiz.
- **Aylık bakım ücreti:** bot başına 100 EUR (imzalı ek sözleşmeyle farklı belirlenebilir; bot devre dışı bırakılınca artık alınmaz) [RESMÎ, Viber Help Center].
- **Oturum modeli:** Abone bota mesaj atınca (kendiliğinden ya da botun mesajına yanıt olarak) 24 saatlik oturum açılır. Oturum içindeki mesajlar sınırsızdır ve aylık ücrete dahildir. Karşılama (welcome) mesajı ücretsizdir [RESMÎ, Viber Help Center].
- **Oturum dışı mesajlar:** Botun oturum dışında başlattığı mesajlar teslim edilen mesaj başına, alıcının ülkesine göre ücretlenir. Kesin fiyat partnerden veya Viber fiyat tablosundan teyit edilmelidir [RESMÎ].
- **Eski model:** 5.2.2024 öncesinde açılıp faturalandırmaya bağlanan botlar eski modelde kalır [RESMÎ]; bu modelde ayda 10.000 ücretsiz mesaj hakkı olduğu belirtiliyor (`23 freeMessagesExceeded` hatası buna dayanır) [3. TARAF].

**LINE** [RESMÎ]
- **Hız sınırları:** Çoğu uç nokta saniyede 2.000 istek kabul eder.
  - Multicast: saniyede 200 istek.
  - Narrowcast, broadcast ve insight: saatte 60 istek.
  - Webhook ayarı: dakikada 1.000 istek.
- **Fiyat (Japonya, vergi hariç):**

| Plan | Aylık ücret | Ücretsiz mesaj/ay | Ek mesaj |
|---|---|---|---|
| Communication | 0 | 200 | Yok |
| Light | 5.000 JPY | 5.000 | Yok |
| Standard | 15.000 JPY | 30.000 | Mesaj başına en fazla 3 JPY |

- Mesajlar **alıcı başına** sayılır. Reply mesajları ile engelleyen kullanıcılara giden mesajlar sayılmaz. Kota aşılınca hata döner.
- Tayvan ve Tayland planları ayrı LINE for Business sayfalarındadır.

## Resmî olmayan yollar ve riskler

- **LINE self-bot kütüphaneleri** (ör. Python `CHRLINE`, eski `linepy`) [3. TARAF]
  - Nasıl çalışır: Kişisel hesabın masaüstü veya mobil istemci protokolünü (Thrift tabanlı) taklit eder.
  - Ne sağlar: Grupları, OpenChat'i ve kişisel sohbetleri okuma imkânı verir.
  - Riskler: LINE kullanım koşullarını ihlal eder; hesap kalıcı olarak kapatılabilir. Protokol sık değiştiği için kütüphaneler bozulur. Başkalarının mesajlarını izinsiz işlemek KVKK/GDPR açısından hukuki risk taşır.
- **Viber:** Kişisel hesap için bakımı süren, yaygın bir resmî olmayan istemci bulunamadı (belgede yok / [TAHMİN]). Desktop istemcisinin tersine mühendisliği ToS ihlalidir.
- **Öneri:** Takip uygulamasında yalnızca resmî webhook yollarını kullan. Gruplarda botun varlığını üyelere açıkça bildir.

## SDK ve kütüphaneler

| Platform | Resmî | Topluluk (.NET dahil) |
|---|---|---|
| Viber | Node.js (`viber-bot`), Python (`viberbot`) [RESMÎ] | .NET: `Viber.Bot` NuGet paketi [3. TARAF]. Go ve PHP sarmalayıcıları da var |
| LINE | `line-bot-sdk` ailesi: Node.js, Python, Java, Go, PHP, Ruby [RESMÎ, GitHub `line` org] | .NET: `Line.Messaging` (pierre3) ve türevleri [3. TARAF]. Resmî .NET SDK yok; OpenAPI'den istemci üretilebilir |

## Postman / OpenAPI / koleksiyonlar

- **LINE:** Resmî OpenAPI tanımları [github.com/line/line-openapi](https://github.com/line/line-openapi) deposundadır (messaging-api.yml, webhook.yml, insight.yml…). Postman'e içe aktarılabilir veya NSwag/Kiota ile .NET istemcisi üretilebilir [RESMÎ].
- **Viber:** Resmî OpenAPI veya Postman koleksiyonu belgede yok. Uç noktalar az olduğu için elle tanımlamak kolaydır.

## Depoda ilgili sayfalar

- [Telegram API](Telegram.md) — bot ve MTProto karşılaştırması için.
- [WhatsApp API](WhatsApp.md) — benzer ticari mesajlaşma modeli (oturum ve şablon ücretleri).
- [Rehberler / Mesajlaşma Altyapıları](../../Rehberler/Mesajlasma-Altyapilari/) — Telegram, WhatsApp, BiP ve SMS HTML rehberleri.

## Kaynaklar

- [Viber REST Bot API](https://developers.viber.com/docs/api/rest-bot-api/) — uç noktalar, webhook, limitler, billing_status — (erişim: 15 Ekim 2026)
- [Viber Channels Post API](https://developers.viber.com/docs/tools/channels-post-api/) — kanal gönderi API'si — (erişim: 15 Ekim 2026)
- [Viber Help Center: Bot commercial model](https://help.viber.com/hc/articles/15247629658525) — 100 EUR aylık bakım ücreti, oturum modeli — (erişim: 15 Ekim 2026)
- [Viber Help Center: Rakuten Viber chatbot commercial model FAQ](https://help.viber.com/hc/en-us/articles/15383950711197) — 24 saatlik oturum, 5.2.2024 öncesi botlar — (erişim: 15 Ekim 2026)
- [LINE Notify kapanış duyurusu](https://notify-bot.line.me/closing-announce) — 31 Mart 2025 kapanış, Messaging API'ye geçiş — (erişim: 15 Ekim 2026)
- [Viber API Access White Paper](https://developers.viber.com/docs/general/api-access-white-paper/) — TLS 1.2 şartı ve abonelik kuralları — (erişim: 15 Ekim 2026)
- [Viber Developers FAQ](https://developers.viber.com/docs/faq/) — 30 KB sınırı, 5 saniye yanıt süresi — (erişim: 15 Ekim 2026)
- [LINE Messaging API reference](https://developers.line.biz/en/reference/messaging-api/) — tüm uç noktalar, hız sınırları, webhook olayları — (erişim: 15 Ekim 2026)
- [LINE Messaging API overview](https://developers.line.biz/en/docs/messaging-api/overview/) — genel yetenekler — (erişim: 15 Ekim 2026)
- [LINE Messaging API pricing](https://developers.line.biz/en/docs/messaging-api/pricing/) — planlar ve mesaj sayımı — (erişim: 15 Ekim 2026)
- [LINE Group chats](https://developers.line.biz/en/docs/messaging-api/group-chats/) — botun gruba katılması — (erişim: 15 Ekim 2026)
- [line/line-openapi](https://github.com/line/line-openapi) — resmî OpenAPI tanımları — (erişim: 15 Ekim 2026)
- [Viber for Business](https://www.forbusiness.viber.com/en/) — Business Messages ve partnerler — (erişim: 15 Ekim 2026)
