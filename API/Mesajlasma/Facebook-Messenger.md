# Facebook Messenger API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **kısıtlı** (yalnızca Facebook Sayfası / Instagram profesyonel hesabı adına, kişinin başlattığı konuşmalar; kişisel hesap ve grup sohbeti için resmî API yok)

**Etiketler:** [RESMÎ] = Meta'nın resmî dokümanında bizzat okundu · [3. TARAF] = topluluk/üçüncü taraf kaynağı · [TAHMİN] = bu oturumda doğrulanamadı, genel bilgiye dayanır · [ÇELİŞKİLİ] = kaynaklar arasında fark var.

> Not: Bu sayfa hazırlanırken web arama kotası doldu; bilgiler doğrudan Meta dokümanından (WebFetch) okunan sayfalara dayanır. Okunamayan sayfalar "belgede yok / doğrulanamadı" diye işaretlendi.

## Özet

- **Messenger Platform**, bir işletmenin **Facebook Sayfası** veya **Instagram profesyonel hesabı** üzerinden, kendisine Facebook, Instagram ya da bir Meta eklentisi aracılığıyla yazan kişilere yanıt vermesini sağlar; "konuşmayı kişinin başlatması gerekir". Yanıtlar otomatik (bot), canlı temsilci veya ikisi birlikte olabilir. [RESMÎ]
- Gelen mesajlar **webhook** ile anlık bildirilir; gönderim **Send API** (`POST /<PAGE_ID>/messages`) ile yapılır. [RESMÎ]
- Temel kural **24 saatlik standart mesajlaşma penceresi**dir; pencere dışında yalnızca sınırlı yollar kalır (Human Agent etiketi – 7 gün, Utility mesaj şablonları, Marketing Messages API, sponsorlu mesajlar, **One-time notification (Beta)** — kişinin açık isteğiyle tek takip mesajı; jeton tek kullanımlık, 1 yıl geçerli, Instagram'da yok). [RESMÎ]
- Platform **ücretsizdir** ("The Messenger Platform is free to use"). Yeni Marketing Messages API'nin ileride ücretli olabileceği belirtilir. [RESMÎ]
- Kişisel Messenger hesabındaki sohbetleri, arkadaş mesajlarını veya grup sohbetlerini okumak için **resmî API yoktur**; bunu yapan araçlar resmî değildir ve ToS riski taşır. [RESMÎ — dokümanda yalnızca Sayfa/IG profesyonel hesap modeli tanımlı]

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | — | **Hiçbir şey.** Messenger için kimliksiz uç nokta yok. Yalnızca `m.me/<sayfa>` bağlantıları (kullanıcıyı sohbete yönlendirme). [RESMÎ] | — |
| Geliştirici hesabı / uygulama (**Standard Access**) | Meta geliştirici hesabı, uygulama (App Dashboard'da Messenger ürünü), yönettiğin bir Facebook Sayfası, Sayfa erişim jetonu; izinler: `pages_messaging`, `pages_manage_metadata`, `pages_read_engagement`, `pages_show_list`, `business_management` [RESMÎ] | Overview: "Standard Access … limits data to users with a Role on your app **or Page**" ve "Yalnızca **kendi** Sayfan için mesaj alıp gönderiyorsan App Review gerekmez." Webhooks sayfası: Standard Access ile yalnızca **uygulamada rolü olan** kişilerden (yönetici, geliştirici, test kullanıcısı) bildirim gelir; müşterilerden (rolü olmayan kişiler) bildirim için App Review isteyen **Advanced Access** gerekir. [RESMÎ] [ÇELİŞKİLİ — iki resmî sayfa farklı söylüyor; kendi Sayfana gelen gerçek müşteri mesajlarının Standard seviyede webhook ile geleceği garanti değil] | Ücretsiz; hız sınırları aşağıda |
| İşletme / uygulama onayı (**Advanced Access**, App Review, Business Verification) | App Review (her izin için kullanım senaryosu + ekran kaydı), `business_management` bağımlılığının incelemede belirtilmesi; Instagram mesajlaşma için **uygulamanın doğrulanmış bir işletmeye ait olması** [RESMÎ] | Başka işletmelerin Sayfalarına hizmet (SaaS/inbox ürünü), rolü olmayan herkesle mesajlaşma; **Human Agent** özelliği (7 gün; App Review + işletme doğrulaması + ek sözleşme gerekebilir) [RESMÎ]; Utility mesajlar için `page_utility_messaging` izni [RESMÎ] | Ücretsiz |
| Ücretli / kurumsal | Marketing Messages on Messenger API (partner/iş ortağı üzerinden), Sponsorlu mesajlar (Ads Manager) | 24 saat penceresi dışında pazarlama mesajı (kullanıcı opt-in ile) veya reklam olarak "Sponsored" mesaj [RESMÎ] | Sponsorlu mesaj = reklam bütçesi; Marketing Messages "ileride ücretlendirmeyi düşündüğümüz premium özellik" [RESMÎ] — güncel fiyat belgede yok |
| Resmî olmayan | Kişisel Facebook hesabı oturumu (çerez/appstate) | Kişisel DM'ler, grup sohbetleri — web/mobil istemci taklidi ile [3. TARAF] | Ücretsiz ama **hesap kilitlenmesi / ban / ToS ihlali** riski |

## Kimlik doğrulama

- **Sayfa erişim jetonu (Page Access Token)** zorunludur; Send API, Conversations API ve abonelik çağrıları bununla yapılır. [RESMÎ]
- Jeton, **Facebook Login for Business** ile istenir; jetonu üreten kişinin Sayfada `MESSAGING` veya `MODERATE` görevi olmalıdır (webhook kurulumu için `MODERATE`). [RESMÎ]
- Gerekli izinler: Messenger için `pages_messaging`, `pages_manage_metadata`, `pages_read_engagement` (+ `pages_show_list`, `business_management`); Instagram mesajlaşma için ek olarak `instagram_basic`, `instagram_manage_messages`. [RESMÎ]
- Webhook isteklerinin doğrulanması: her bildirimde `X-Hub-Signature-256` başlığı gelir; gövdenin **App Secret** ile HMAC-SHA256'sı alınıp `sha256=` sonrasındaki hex ile karşılaştırılır. Meta bunu "şiddetle önerir". İmza, yükün **kaçışlı Unicode** biçimi üzerinden hesaplanır; çözülmüş ham baytları hash'lemek farklı sonuç verir. [RESMÎ]
- Kişi kimlikleri: **PSID** (Page-scoped ID — kişi Sayfaya ilk yazdığında atanır), **user_ref** (eklenti/postback ile gelen), **post_id / comment_id** (gönderi/yorum sahibine özel yanıt için). PSID Sayfaya özeldir; başka Sayfada aynı kişi farklı ID alır. [RESMÎ]
- Graph API sürümlemesi kullanılır; changelog'a göre güncel sürüm **v26.0**. [RESMÎ]

## Temel uç noktalar

Taban: `https://graph.facebook.com/v26.0/`

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| POST | `/<PAGE_ID>/messages` | **Send API**: metin, ek (görsel, ses, video, dosya, GIF, sticker), şablon, hızlı yanıt, `sender_action` (typing, mark_seen), tepki ekleme/düzenleme/silme (Ara 2025), yanıt (`reply_to`, Tem 2025) gönderir [RESMÎ] | Standard / Advanced | 300 çağrı/sn/Sayfa (metin, link, tepki, sticker); 10 çağrı/sn/Sayfa (ses/video) [RESMÎ] |
| POST | `/<PAGE_ID>/messages` + `messaging_type` | `RESPONSE` (gelen mesaja yanıt), `UPDATE` (proaktif, pencere içinde) [TAHMİN], `MESSAGE_TAG` (etiketli, promosyon içermez) [TAHMİN], `UTILITY` (onaylı şablon) [RESMÎ — Utility sayfasında açıkça geçiyor]. UPDATE/MESSAGE_TAG değerleri Send Messages sayfasında API değeri olarak gösterilmiyor; Send API referansı metin olarak okunamadığı için doğrulanamadı. | — | Etiketler aşağıda |
| GET | `/<PAGE_ID>/conversations?platform=messenger` | Sayfanın konuşma listesi (`id`, `updated_time`); `user_id=<PSID>` ile tek konuşma. Ekim 2025'ten beri Messenger ve Instagram için `is_owner` alanı var (Conversation Routing ile konuşmanın sahibi olup olmadığına göre filtreleme) [RESMÎ — changelog 13.10.2025] | Standard / Advanced | 2 çağrı/sn/Sayfa [RESMÎ] |
| GET | `/<CONVERSATION_ID>?fields=messages` | Konuşmadaki mesaj ID'leri ve `created_time` [RESMÎ] | Standard / Advanced | — |
| GET | `/<MESSAGE_ID>?fields=id,created_time,from,to,message,reply_to` | Mesaj ayrıntısı [RESMÎ] | Standard / Advanced | **Yalnızca son 20 mesajın** ayrıntısı alınabilir; eskiler "silinmiş" hatası döner. İstekler klasöründe 30 gün işlem görmeyen konuşmalar dönmez [RESMÎ] |
| POST / GET | `/<PAGE_ID>/subscribed_apps?subscribed_fields=messages,...` | Uygulamayı Sayfanın webhook'larına abone eder / aboneleri listeler [RESMÎ] | Standard | `pages_manage_metadata` |
| POST | `/<PAGE_ID>/message_templates` (Utility) | Utility şablonu oluşturma (kategori `UTILITY`, konu ör. `ORDER_MANAGEMENT`) [RESMÎ] | Advanced (`page_utility_messaging`) | Şablon onay durumu webhook ile gelir; alan adı [ÇELİŞKİLİ]: Utility sayfası `message_template_status_update`, Webhooks sayfası `messenger_template_status_update` diyor |
| — | Messenger Calling API | Messenger üzerinden sesli/görüntülü arama [RESMÎ — changelog: 11.02.2026'da genel kullanıma açıldı] | — | Ayrıntı: resmî Calling dokümanı (bu oturumda okunmadı) |
| POST | `/<PAGE_ID>/messages` (template_type `notification_messages`) | Pazarlama mesajı opt-in isteği (eski Recurring Notifications) [RESMÎ] | Partner | **10 Şubat 2026'da kaldırıldı**, yerine Marketing Messages on Messenger API [RESMÎ] |
| — | Attachment Upload API, Handover Protocol / Conversation Routing, Personas, Persistent Menu, Ice Breakers, Private Replies, User Profile API | Yardımcı özellikler [RESMÎ — adları dokümanda listeli] | — | Ayrıntı: resmî referans |

Tam liste: Messenger Platform dokümanı ve Send API referansı (Kaynaklar).

### Mesaj etiketleri (24 saat dışı) — güncel durum

| Etiket | Durum |
|---|---|
| `HUMAN_AGENT` | **Aktif.** Kişinin mesajından sonraki **7 gün** içinde bir insan temsilcinin elle yanıtı için. App Review + işletme doğrulaması gerekir. [RESMÎ] |
| `CONFIRMED_EVENT_UPDATE`, `ACCOUNT_UPDATE`, `POST_PURCHASE_UPDATE` | **Kaldırıldı.** 27 Nisan 2026'dan sonra **hata kodu 100** döner (changelog 27 Mart 2026). Yerine **Utility şablonları** veya **Marketing Messages on Messenger API** kullanılır. [RESMÎ — changelog 27.03.2026] |
| `NON_PROMOTIONAL_SUBSCRIPTION` | Yalnızca **NPI (News Page Index) kayıtlı** haber Sayfaları; promosyon içeremez. [RESMÎ] |

Kurallar: "Otomatik botlar kullanıcı girdisine 30 saniye içinde yanıt vermelidir"; 24 saat içindeki mesajlar promosyon içerebilir; etiketlerin onaylı kullanım dışında kullanılması gönderim kısıtlamasına yol açabilir. [RESMÎ]

### Instagram Messaging ile ilişki

- Instagram DM'leri **aynı Messenger Platform** altyapısıyla (Graph API, `/<PAGE_ID>/messages`, `platform=instagram`, aynı webhook alanlarının çoğu) yönetilir; dokümanlar aynı `business-messaging/messenger-platform` çatısı altındadır. [RESMÎ]
- Farklar: Instagram'da okundu bilgisi `messaging_seen`, giden mesaj yankısı `messages` içinde gelir (Messenger'da `message_echoes`); `message_deliveries`, `messaging_optins`, `message_edits` (Messenger için) vb. yalnızca Messenger'dadır. Instagram için **Handover Protocol 23 Ekim 2025'te kaldırıldı**, yerine **Conversation Routing**. Sponsorlu mesajlar ve One-time notification IG Messaging API'de yok. [RESMÎ]
- Instagram gönderi paylaşımı webhook'u: eski `share` eki yerine **`ig_post`** eki geldi (3 Kas 2025'ten itibaren ikisi birlikte; `share` desteği 1 Şub 2026'ya kadar; **27 Nis 2026**'dan itibaren kademeli olarak yalnızca `ig_post` dönüyor). Webhook ayrıştıran takip uygulamaları `ig_post`'u işlemeli. [RESMÎ — changelog]
- Instagram Send API metin limiti için iki farklı rakam var: Messenger API for Instagram bölümünde 300 çağrı/sn, Instagram Platform bölümünde 100 çağrı/sn. [ÇELİŞKİLİ — Meta açıklamıyor]
- Ayrıca "Instagram API with Instagram Login" (Facebook Sayfası gerektirmeyen yol) vardır; ayrıntı: [Instagram.md](../Sosyal-Medya/Instagram.md). [TAHMİN — bu oturumda karşılaştırma sayfası okunamadı]

## Gerçek zamanlı / bildirim

**Webhook** (tek resmî gerçek zamanlı yol; WebSocket/streaming/RSS yok). [RESMÎ]

- Kurulum: HTTPS uç nokta (geçerli TLS, self-signed **olmaz**); doğrulamada Meta `hub.mode=subscribe`, `hub.verify_token`, `hub.challenge` ile GET atar → token eşleşirse `hub.challenge` döndür, değilse 403. Uygulama **yayınlanmış** olmalı; uygulama Sayfaya kurulmalı (`subscribed_apps`). [RESMÎ]
- Yanıt: **5 saniye içinde 200 OK**. Başarısız teslimler hemen birkaç kez tekrar denenir (tekrarlara hazırlıklı ol); 15 dk hata → uyarı; **1 saat** hata → "Webhooks Disabled", uygulamanın Sayfa aboneliği düşer, yeniden abone olunmalı. Sıra garanti değil, `timestamp` ile sırala. Geçmiş webhook verisi sonradan sorgulanamaz — sakla. [RESMÎ]
- Messenger/IG mesajlaşma alanları: `messages`, `message_echoes`, `message_deliveries`, `message_reads`, `messaging_seen` (IG), `message_edits`, `message_reactions`, `messaging_postbacks`, `messaging_optins`, `messaging_referrals`, `messaging_account_linking`, `messaging_feedback`, `messaging_game_plays`, `messaging_handovers`, `standby`, `messaging_policy_enforcement`, `messenger_template_status_update` (Webhooks sayfasındaki ad; Utility sayfası `message_template_status_update` diyor [ÇELİŞKİLİ]), `response_feedback`, `send_cart`. [RESMÎ]
- **Page Integrity** webhook'u ve API'si (30 Oca 2026): Sayfanın bütünlük (integrity) durumu hakkında anlık bilgi. [RESMÎ — changelog]
- **Sayfa (Page) webhook alanları** (Messenger değil ama takip için kritik): `feed` (gönderi, paylaşım, tepki, yorum — reklam gönderileri hariç), `live_videos` (Sayfanın canlı video durumu değişikliği: video ID + status), `mention` (Sayfanın anıldığı gönderi/yorum), `ratings`. Hepsi `pages_manage_metadata` ister. [RESMÎ]

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| **Kendi Sayfana** gelen yeni mesaj | Evet | Webhook `messages` | Standard (yalnızca rolü olan kişiler) / gerçek müşteriler için Advanced Access gerekebilir [ÇELİŞKİLİ] | Anlık; içerik + ekler gelir. Overview "kendi Sayfan için App Review gerekmez" diyor; Webhooks sayfası "müşteri bildirimleri için Advanced Access (App Review) gerekir" diyor |
| Kendi Sayfana gelen mesajı anahtar kelimeyle filtreleme | Evet | Webhook `messages` → kendi sunucunda filtre | Standard | Filtreleme API'de yok, istemci tarafında yapılır [RESMÎ — API'de filtre parametresi tanımlı değil] |
| Mesaj düzenleme / tepki / okundu | Evet | `message_edits`, `message_reactions`, `message_reads` | Standard | — |
| Geçmiş mesajları geriye dönük çekme | Kısmen | Conversations API | Standard/Advanced | Konuşma başına yalnızca son 20 mesajın ayrıntısı; 2 çağrı/sn |
| **Başkasının** (kişi/kanal) Messenger mesajlarını izleme | **Hayır** (resmî) | — | — | Messenger API yalnızca Sayfanın kendi gelen kutusu içindir; kişisel/üçüncü taraf sohbet okunamaz |
| Messenger **grup sohbetleri** / topluluk sohbetleri | **Hayır** (resmî) | Yalnızca resmî olmayan kütüphaneler | Resmî olmayan | Yüksek ban riski |
| Bir Facebook Sayfasının **yeni gönderisi** | Evet (yönettiğin Sayfa) | Page webhook `feed` | Standard / Advanced | Yönetmediğin Sayfalar için webhook yok; genel Sayfa okuma için Graph API'nin ilgili izinleri gerekir → [Meta-Graph-API-Genel.md](../Sosyal-Medya/Meta-Graph-API-Genel.md) |
| Bir Sayfanın **canlı yayına geçmesi** | Evet (yönettiğin Sayfa) | Page webhook `live_videos` | Standard / Advanced | Başka Sayfalar için resmî bildirim yok [TAHMİN — yalnızca abone olunan Sayfalar için çalıştığı belgeden çıkarım] |
| Sayfanın anılması (mention) | Evet | Page webhook `mention` | Standard / Advanced | Bazı ID'ler gizlilik nedeniyle gelmeyebilir |
| Yorum → özel yanıt (DM) | Evet | Private Replies (`recipient.comment_id`) | Advanced | 7 gün içinde tek yanıt [RESMÎ]; 750 çağrı/saat/Sayfa belgede IG gönderi/reels yorumları için yazılı, Facebook yorumlarına da geçerliliği [TAHMİN] |
| Takipçilere proaktif bildirim (24 saat dışı) | Kısıtlı | Utility şablonu / Marketing Messages API / NPI haber etiketi / One-time notification (Beta) — açık opt-in ile tek mesaj, jeton 1 yıl geçerli, IG'de yok [RESMÎ] | Advanced / Partner | Kişinin önce Sayfaya yazması veya opt-in vermesi gerekir |

## Hız sınırları ve fiyatlar

- **Genel formül (Messenger, Sayfa başına):** 24 saatte çağrı sayısı = **200 × Etkileşimli Kullanıcı Sayısı** (Sayfanın Messenger'da mesaj atabildiği kişi sayısı). [RESMÎ]
- **Send API:** 300 çağrı/sn/Sayfa (metin, link, tepki, sticker); 10 çağrı/sn/Sayfa (ses, video); tek bir konuşmaya çok fazla mesaj atılırsa ayrıca sınırlanır. [RESMÎ]
- **Conversations API:** 2 çağrı/sn/Sayfa (IG için de 2 çağrı/sn/hesap). [RESMÎ]
- **Private Replies:** 750 çağrı/saat/Sayfa — belgede Instagram gönderi/reels yorumlarına özel yanıt için yazılmış; Facebook gönderi yorumları için aynı limitin geçerli olduğu [TAHMİN]. Instagram Live yorumlarına 100 çağrı/sn/hesap. [RESMÎ]
- Hata **613** = hız sınırı, çağrı sıklığını düşür. [RESMÎ]
- **Fiyat:** Messenger Platform ücretsiz. Sponsorlu mesajlar reklam ücretine tabi. Marketing Messages on Messenger API için "ileride ücretlendirme" niyeti belirtilmiş, şu an deneme dönemi; güncel tarife belgede yok. [RESMÎ]
- Eski Marketing Messages (Recurring Notifications) zaman çizelgesi: 1 Tem 2025 yeni API'ye entegrasyon açıldı · 1 Eyl 2025 yeni entegrasyon kapandı, eski jetonlar için bekleme 24→48 saat · **10 Şub 2026 kaldırıldı**. [RESMÎ]

## Resmî olmayan yollar ve riskler

| Araç | Ne yapar | Durum |
|---|---|---|
| **mautrix-meta** (Go, AGPL-3.0) | Matrix ↔ Facebook Messenger / Instagram DM "puppeting" köprüsü; kişisel hesapla oturum açıp mesajları Matrix'e taşır | Aktif geliştiriliyor (GitHub'da 1.200+ commit) [3. TARAF] |
| `facebook-chat-api` (Node.js) ve çatalları (`fca-unofficial` vb.) | Kişisel hesabın web oturumunu (çerez/appstate) taklit ederek mesaj okuma/gönderme, grup sohbeti | Orijinal proje arşivlenmiş; çatalların bakımı değişken [TAHMİN — bu oturumda doğrulanamadı] |
| `fbchat` (Python) | Aynı yaklaşım (web istemci taklidi) | Arşivlendiği/bakımsız olduğu bilinir [TAHMİN] |

**Nasıl çalışır:** Resmî Messenger web/mobil istemcisinin dahili uç noktaları (GraphQL, MQTT tabanlı gerçek zamanlı kanal) taklit edilir; kişisel hesap çerezleriyle oturum açılır. [TAHMİN — kütüphane belgeleri bu oturumda okunamadı]

**Riskler (nesnel):**
- Meta Hizmet Şartları otomatik erişimi ve yetkisiz veri toplamayı yasaklar → hesap kısıtlaması, kontrol noktası (checkpoint), kalıcı kapatma. [TAHMİN — ToS metni bu oturumda okunmadı]
- Messenger'da uçtan uca şifreleme varsayılan hâle geldiğinden web taklidi araçları sık bozulur. [TAHMİN]
- Başkalarının mesajlarını onaysız toplamak KVKK/GDPR kapsamında kişisel veri işleme sayılır; açık rıza ve aydınlatma yükümlülüğü doğar. Takip uygulamasında bu yol **önerilmez**.

## SDK ve kütüphaneler

- **Resmî:** Meta'nın Messenger için ayrı bir sunucu SDK'sı yok; düz HTTPS Graph API çağrısı yapılır. Meta Business SDK'ları (Python, Node.js, PHP, Java, Ruby) Graph API'yi sarar ama Messenger'a özel değildir. [TAHMİN]
- **.NET:** Resmî .NET SDK yok. `HttpClient` + `System.Text.Json` ile doğrudan çağrı en güvenli yol. Microsoft Bot Framework'ün Facebook kanalı/adaptörü (`Microsoft.Bot.Builder.Adapters.Facebook`) tarihsel olarak kullanılır; Bot Framework SDK'nın bakım durumu ayrıca kontrol edilmeli. [TAHMİN]
- **Topluluk (popüler):** Node.js'te `bottender`, Python'da `pymessenger` gibi sarmalayıcılar — çoğu eski Graph API sürümlerine göre yazıldı; etiket ve webhook değişiklikleri (2026) nedeniyle güncelliği kontrol edilmeli. [TAHMİN]
- **Örnek kod:** Meta'nın Messenger Platform örnekleri GitHub'da `fbsamples` organizasyonunda yayımlanır (ör. "original-coast-clothing"). [TAHMİN]

## Postman / OpenAPI / koleksiyonlar

- Meta'nın resmî bir **OpenAPI** tanımı Messenger için belgede yok. [RESMÎ — dokümanda bulunamadı]
- Meta'nın Postman'de "Meta for Developers" çalışma alanı bulunduğu bilinir (Graph API / WhatsApp koleksiyonları); Messenger'a özel güncel koleksiyon bu oturumda doğrulanamadı. [TAHMİN]
- Pratik: Graph API Explorer (developers.facebook.com/tools/explorer) ile Sayfa jetonu alınıp `/<PAGE_ID>/conversations` gibi uç noktalar denenebilir; Messenger App Dashboard'da **Webhook Debugger** aracı var. [RESMÎ — araç adı dokümanda listeli]

## Depoda ilgili sayfalar

- [Meta Graph API (genel)](../Sosyal-Medya/Meta-Graph-API-Genel.md) — Sayfa jetonu, izinler, App Review, Business Verification ortak akışı.
- [Instagram API](../Sosyal-Medya/Instagram.md) — Instagram DM'leri aynı Messenger Platform altyapısını kullanır.
- [WhatsApp API](WhatsApp.md) — Meta'nın diğer işletme mesajlaşma ürünü (ücretli, şablon tabanlı).
- [Threads API](../Sosyal-Medya/Threads.md) — Meta'nın diğer platformu.
- [Telegram API](Telegram.md) — karşılaştırma: Telegram bot/kanal takibi çok daha açık.
- [Mesajlaşma Altyapıları rehberi](../../Rehberler/Mesajlasma-Altyapilari/) — Telegram, WhatsApp, BiP, SMS kuralları.

## Kaynaklar

Resmî:
- https://developers.facebook.com/docs/messenger-platform/overview — Messenger Platform genel bakış, izinler, ücretsiz olduğu, App Review gerekliliği (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/messenger-platform/webhooks — webhook alanları, doğrulama, imza, tekrar deneme, gereksinimler (erişim: 15 Ekim 2026)
- https://developers.facebook.com/documentation/business-messaging/messenger-platform/send-messages — Send API, mesaj türleri, alıcı kimlikleri, kaldırılan etiketler (erişim: 15 Ekim 2026)
- https://developers.facebook.com/documentation/business-messaging/messenger-platform/changelog — 2025–2026 değişiklikleri, v26.0, etiket kaldırma ve geçiş hedefleri, Calling API, Page Integrity, `is_owner`, IG `share` → `ig_post` (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/messenger-platform/policy/policy-overview — 24 saat penceresi, Human Agent, One-time notification (Beta), Private replies 7 gün, NPI, sponsorlu mesajlar (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/messenger-platform/conversations — Conversations API, 20 mesaj sınırı (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/graph-api/overview/rate-limiting — Messenger/Instagram hız sınırları (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/messenger-platform/send-messages/utility-messages — Utility mesaj şablonları (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/messenger-platform/marketing-messages — eski Marketing Messages'ın kaldırılma takvimi (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/features-reference/human-agent — Human Agent özelliği, 7 gün, App Review (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/graph-api/webhooks/reference/page — Page webhook alanları (`feed`, `live_videos`, `mention`) (erişim: 15 Ekim 2026)
- https://developers.facebook.com/documentation/business-messaging/messenger-platform/reference/send-api — Send API referansı (eski `/docs/messenger-platform/reference/send-api/` yolu içerik döndürmüyor; yeni yol da bu oturumda metin olarak okunamadı) (erişim: 15 Ekim 2026)

Üçüncü taraf:
- https://github.com/mautrix/meta — Matrix ↔ Messenger/Instagram köprüsü, resmî olmayan (erişim: 15 Ekim 2026)
