# WhatsApp API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **kısıtlı** (yalnız işletme mesajlaşması için resmî API var; Kanallar (Channels), Durum (Status) ve başkalarının grupları için resmî API yok)

Etiketler: **[RESMÎ]** Meta/WhatsApp belgesi · **[3. TARAF]** blog, satıcı, kütüphane README'si · **[TAHMİN]** çıkarım · **[ÇELİŞKİLİ]** kaynaklar uyuşmuyor.

Bu sayfa bir **API başvuru ve takip** sayfasıdır. Mesaj gönderme JSON örnekleri, şablon kuralları, fiyat tablosu, onboarding, BSUID, AI botu politikası ve C# örnekleri için depodaki ayrıntılı rehbere bak: [WhatsApp Business API rehberi](../../Rehberler/Mesajlasma-Altyapilari/02-whatsapp-business-api.html). Burada o bilgiler tekrar edilmez, yalnız uç nokta listesi ve "takip uygulaması" bakışı eklenir.

## Özet

WhatsApp'ın tek resmî geliştirici ürünü **WhatsApp Business Platform**'dur: Meta'nın barındırdığı **Cloud API** (mesaj, medya, webhook) ve hesap/şablon/numara yönetimi için **Business Management API**; ikisi de Graph API (`graph.facebook.com`) üzerinden çalışır [RESMÎ]. Kendi barındırılan **On-Premises API 23 Ekim 2025'te tamamen kapandı** [RESMÎ]. API yalnızca **işletme numarasına gelen** mesajları ve işletmenin kendi oluşturduğu grupları görür; başkalarının gruplarını, kanallarını (Channels) veya durumlarını okumak için resmî bir yol **yoktur** [RESMÎ — belgelerde böyle bir uç nokta yok]. Kullanım ücretsiz değildir: mesaj başı, kategori × alıcının ülke kodu üzerinden ücretlenir; 1 Ekim 2026'dan beri pencere içi serbest mesajlar da ücretlidir [RESMÎ]. Resmî olmayan kütüphaneler (Baileys, whatsapp-web.js, whatsmeow) kişisel hesabı WhatsApp Web gibi bağlayıp grup/kanal okuyabilir, ama Hizmet Şartları'na aykırıdır ve numara kapatılabilir.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | `wa.me/<numara>` tıkla-sohbet bağlantısı, `whatsapp.com/channel/<ID>` kanal davet sayfası. **Veri API'si yok.** | Ücretsiz; okunabilir veri neredeyse yok [TAHMİN: kanal sayfası yalnız ad/açıklama/takipçi gibi önizleme gösterir] |
| Geliştirici hesabı / uygulama | Meta for Developers hesabı + "Connect with customers through WhatsApp" kullanım amaçlı uygulama | **Test numarası + test WABA**; yalnız izin listesindeki **5 alıcıya** mesaj; webhook; şablon oluşturma [RESMÎ] | Test mesajları ücretsiz; geçici jeton 24 saat |
| İşletme / uygulama onayı | **Business Verification** (işletme doğrulaması); başka işletmelere hizmet için **App Review** (`whatsapp_business_messaging`, `whatsapp_business_management` Advanced access) + Tech Provider; **Official Business Account (OBA)** onayı | **Doğrulamasız portföy:** en çok 2 kayıtlı gerçek numara, kalıcı system user jetonu, 250 mesaj limiti. **Business Verification sonrası:** numara sınırı 20'ye çıkar ve 2.000 kademesine geçilir (iş ortağı doğrulaması ya da 30 günde 2.000 teslim edilmiş yüksek kaliteli şablon mesajı da bu kademeyi açar); sonra 10.000 → 100.000 → sınırsız. App Review / Tech Provider: Embedded Signup, Coexistence; **Groups API yalnız OBA'ya açık** [RESMÎ] | Mesaj başı ücret; onboarding 7 günde 10 → 200 müşteri [RESMÎ] |
| Ücretli / kurumsal | Solution Partner (BSP) üzerinden ya da Meta Business Partner statüsü | Kredi hattı, müşteri adına faturalama; Marketing Messages API, Calling API, Meta Business Agent | BSP ücreti + Meta mesaj ücreti; Business Agent jeton başına [RESMÎ] |
| Resmî olmayan | Kişisel/Business uygulamasındaki bir numara + QR veya eşleştirme kodu (linked device) | Hesabın gördüğü her şey: tüm gruplar, kanallar (newsletter), durum, okundu bilgisi, geçmiş | Ücretsiz; **ToS ihlali, ban riski**, protokol değişince bozulur [RESMÎ (ToS) + 3. TARAF] |

## Kimlik doğrulama

- Her istek: `Authorization: Bearer {ACCESS_TOKEN}`; taban `https://graph.facebook.com/v{N}.0`. Güncel sürüm (rehberde v26.0) için Graph API changelog'a bak; Groups belgesindeki örnekler v25.0 kullanıyor [RESMÎ].
- Jeton türleri [RESMÎ]:
  - **User access token** — App Dashboard'dan; ~24 saat geçerli, yalnız deneme için.
  - **System user access token** — Business portfolio'da system user; süresiz veya 60 günlük; üretim için önerilen.
  - **Business Integration System User token** — Embedded Signup sonrası `GET /oauth/access_token?client_id&client_secret&code` ile müşteri adına alınır (Tech Provider).
- Gerekli izinler: `whatsapp_business_messaging` (gönder/al), `whatsapp_business_management` (WABA, şablon, numara, analiz); portföy düzeyi işlemler için `business_management` [RESMÎ].
- Webhook güvenliği: abone olurken `hub.verify_token` + `hub.challenge`; her POST'ta `X-Hub-Signature-256` HMAC-SHA256 (uygulama gizli anahtarı) doğrulanır; isteğe bağlı mTLS [RESMÎ].

## Temel uç noktalar

Gönderme/medya/şablon/kayıt uçlarının ayrıntılı tablosu [rehberin § 3'ünde](../../Rehberler/Mesajlasma-Altyapilari/02-whatsapp-business-api.html#uc-noktalar). Aşağıda o tablo **tekrarlanmadan**, takip ve yönetim için önemli olan uçlar ve yeni Groups API eklenmiştir. Tam liste: [Cloud API referansı](https://developers.facebook.com/documentation/business-messaging/whatsapp/reference).

### Mesajlaşma (Cloud API) — özet

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| POST | `/{PHONE_NUMBER_ID}/messages` | Mesaj gönderir; `status: "read"` ile okundu işareti, `typing_indicator` ile "yazıyor" | Geliştirici (test) / İşletme | CSW dışı yalnız şablon; numara başına 80 mesaj/sn varsayılan [RESMÎ] |
| GET | `/{MEDIA_ID}` → dönen `url` | Gelen medyanın indirme bağlantısı | Geliştirici | URL 5 dk geçerli, indirirken de Bearer gerekir [RESMÎ] |
| — | Gelen mesajı **okuma (polling) ucu yok** | Gelen her şey yalnız webhook ile gelir; geçmiş mesajları sonradan çekme API'si yok | — | [RESMÎ — referansta GET messages yok] |

### Business Management API (WABA, numara, şablon, analiz)

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/{BUSINESS_ID}/owned_whatsapp_business_accounts` | Portföyün sahip olduğu WABA'lar | İşletme | `business_management` izni [RESMÎ, bu turda ayrıca okunmadı] |
| GET | `/{BUSINESS_ID}/client_whatsapp_business_accounts` | Partnerin müşteri WABA'ları | Tech Provider / BSP | [RESMÎ, bu turda ayrıca okunmadı] |
| GET | `/{WABA_ID}/phone_numbers` | Numaralar, görünen ad, `quality_rating`, durum | İşletme | Kalite izleme için |
| GET | `/{PHONE_NUMBER_ID}?fields=…` | Tek numara: `verified_name`, `quality_rating`, `throughput`, `name_status` | İşletme | |
| GET/POST/DELETE | `/{WABA_ID}/message_templates` | Şablon listele/oluştur/sil | Geliştirici / İşletme | Onaya gider |
| GET/POST/DELETE | `/{WABA_ID}/subscribed_apps` | Uygulamayı WABA webhook'larına abone et / listele / çıkar | Geliştirici / Tech Provider | Embedded Signup sonrası zorunlu |
| GET | `/{WABA_ID}?fields=analytics.start(S).end(E).granularity(DAY)` | Gönderilen/teslim edilen mesaj sayıları | İşletme | `HALF_HOUR`/`DAY`/`MONTH`; geriye bakış 1 Ara 2025'ten beri **1 yıl** [RESMÎ] |
| GET | `/{WABA_ID}?fields=pricing_analytics.start(S).end(E).granularity(DAILY).dimensions(PRICING_CATEGORY,PRICING_TYPE,TIER,COUNTRY)` | Mesaj başı fiyatlandırma analizi (maliyet, kademe) | İşletme | Yeni fiyat modeline uygun olan budur [RESMÎ] |
| GET | `/{WABA_ID}?fields=conversation_analytics…` | Eski konuşma bazlı analiz | İşletme | Hâlâ belgede; granularity `HALF_HOUR`/`DAILY`/`MONTHLY` (`analytics`'ten farklı); BSP kredi hattında `COST` dönmez [RESMÎ] |
| GET | `/{WABA_ID}/template_analytics?start&end&granularity=DAILY&template_ids=[…]` | Şablon başına sent/delivered/read/clicked/cost | İşletme | Önce `POST /{WABA_ID}?is_enabled_for_insights=true` (geri alınamaz); en çok 10 şablon; okunma/tıklama verisi 7 gün; geriye bakış 90 gün [RESMÎ] |
| GET | `/{WABA_ID}?fields=template_group_analytics…granularity(daily)` | Şablon grubu başına toplu şablon analizi | İşletme | Yalnız günlük; geriye bakış 90 gün [RESMÎ] |
| GET | `/{WABA_ID}?fields=group_analytics…granularity(DAILY)` | OBA grupları (Groups API) için grup mesajlaşma analizi | İşletme (OBA) | Yalnız `DAILY`; `start` en çok 90 gün geriye [RESMÎ] |

### Groups API (2025 sonrası, yalnız OBA)

[RESMÎ] — [Groups API](https://developers.facebook.com/documentation/business-messaging/whatsapp/groups) yalnız **Official Business Account** numaralarına açık; WhatsApp Business uygulaması numaraları ve Multi-solution Conversations numaraları kullanamaz. Grup başına **en çok 8 katılımcı**, numara başına **10.000 grup**, grup başına 1 Cloud API işletmesi. API ile **katılımcı doğrudan eklenemez**; davet bağlantısı + katılma isteği onayı kullanılır.

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| POST | `/{PHONE_NUMBER_ID}/groups` | Grup oluşturur, davet bağlantısı döner | OBA | `subject` (≤128), `description` (≤2048), `join_approval_mode`: `auto_approve` / `approval_required` |
| GET | `/{PHONE_NUMBER_ID}/groups` | Numaranın aktif gruplarını listeler | OBA | `limit` 1–1024 (varsayılan 25), `before`/`after` |
| GET | `/{GROUP_ID}?fields=subject,description,participants,join_approval_mode,total_participant_count` | Grup bilgisi | OBA | `fields` verilmezse yalnız ID döner |
| POST | `/{GROUP_ID}` | Ad, açıklama, profil fotoğrafı günceller | OBA | Foto JPEG, kare, ≥192×192, ≤5 MB |
| DELETE | `/{GROUP_ID}` | Grubu siler | OBA | |
| GET / POST | `/{GROUP_ID}/invite_link` | Davet bağlantısını al / sıfırla (eskiler geçersiz) | OBA | |
| GET / POST / DELETE | `/{GROUP_ID}/join_requests` | Katılma isteklerini listele / onayla / reddet | OBA | `join_requests: [id…]` |
| DELETE | `/{GROUP_ID}/participants` | Katılımcı çıkarır | OBA | En çok 8, boş olamaz |
| POST | `/{PHONE_NUMBER_ID}/messages` | Gruba mesaj: `"recipient_type": "group", "to": "{GROUP_ID}"` | OBA | Metin, medya, metin/medya şablonu; interactive, auth, commerce, view-once, kaybolan mesaj, arama **yok** |

## Gerçek zamanlı / bildirim

| Mekanizma | Var mı | Nasıl |
|---|---|---|
| **Webhook** | Var, **tek gerçek zamanlı yol** [RESMÎ] | HTTPS POST, gövde ≤3 MB; 200 dönülmezse azalan sıklıkla **7 güne kadar** tekrar; aynı olay birden fazla gelebilir → `wamid` ile tekilleştir. (Graph genel belgesi "36 saat" diyor [ÇELİŞKİLİ], ayrıntı rehberde.) |
| WebSocket / streaming | Resmî API'de **yok** | Yalnız resmî olmayan kütüphaneler (Baileys, whatsmeow) WebSocket kullanır |
| Polling (sorgulama) | **Yok** | Gelen mesajı/geçmişi çeken bir GET ucu yok [RESMÎ] |
| RSS / WebSub | **Yok** | Kanallar için de resmî RSS/feed yok [RESMÎ — belgede yok] |
| Coexistence geçmiş senkronu | Var (tek seferlik) | `history` webhook'u: onboarding'den önceki **180 gün**ün bire bir sohbetleri; gruplar hariç; onboarding'den sonra 24 saat içinde yapılmalı [RESMÎ] |

**Webhook alanları** (App Dashboard → WhatsApp → Configuration) [RESMÎ — webhooks overview]:

| Alan | Ne bildirir | Takip için önemi |
|---|---|---|
| `messages` | Gelen mesajlar (1:1 ve **grup** — grup mesajında `group_id` anahtarı) + giden mesaj durumları (`sent/delivered/read/failed`) | **Ana kaynak** |
| `smb_message_echoes` | Coexistence: işletmenin telefondaki Business uygulamasından/bağlı cihazdan gönderdiği mesajlar | Telefonla yazılanları da kaydetmek için |
| `history` | Coexistence geçmiş senkronu | İlk yükleme |
| `smb_app_state_sync` | Coexistence: kişi listesi senkronu | |
| `group_lifecycle_update`, `group_participants_update`, `group_settings_update`, `group_status_update` | Grup oluşturma/silme, katılım/ayrılma, ayar değişikliği, grup durumu | Groups API kullanıyorsan [RESMÎ — Groups referansı; genel webhook listesinde görünmüyor] |
| `message_template_status_update`, `message_template_quality_update`, `message_template_components_update`, `template_category_update` | Şablon onay/ret, kalite, kategori değişimi | Şablon sağlığı |
| `phone_number_quality_update`, `phone_number_name_update` | Numara hız seviyesi/kalite, görünen ad onayı | Ban/kısıtlama erken uyarısı |
| `account_alerts`, `account_update`, `account_review_update`, `business_capability_update`, `security` | Limit, politika ihlali, OBA durumu, güvenlik ayarı | Hesap sağlığı |
| `user_preferences` | Kullanıcının pazarlama mesajı tercihi (durdur/devam) | Opt-out takibi |
| `automatic_events`, `partner_solutions`, `payment_configuration_update` | Reklamdan gelen satın alma/lead, çoklu partner, ödeme (Hindistan/Brezilya) | Duruma göre |

## Takip uygulaması için

Temel gerçek: **Resmî API "dinleme" aracı değildir.** Yalnız işletme numarana yazan kişileri ve kendi açtığın (OBA) grupları görürsün. Bir kişinin/kanalın WhatsApp'ta ne paylaştığını resmî yoldan izlemek **mümkün değildir**.

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| İşletme numarana gelen yeni mesaj | Evet | `messages` webhook | Geliştirici / İşletme | Gerçek zamanlı; anahtar kelime filtresini kendi sunucunda uygularsın |
| Gönderdiğin mesajın okunması/teslimi | Evet | `messages` → `statuses[]` | Geliştirici | Kullanıcı okundu bilgisini kapattıysa `read` gelmeyebilir [3. TARAF] |
| Kendi açtığın gruptaki mesajlar | Evet, kısıtlı | Groups API + `messages` webhook (`group_id`) | OBA | En çok 8 katılımcı → topluluk/kanal izleme için uygun değil |
| Grup katılım/ayrılma | Evet (kendi grubunda) | `group_participants_update` | OBA | |
| **Başkasının grubundaki mesajlar** | Resmî: **hayır** | Yalnız resmî olmayan kütüphane (hesabın grupta üye olmalı) | Resmî olmayan | ToS riski; mesaj içeriği kişisel veridir (KVKK/GDPR) |
| **WhatsApp Kanalı (Channel) yeni gönderi** | Resmî: **hayır** | Baileys `newsletterFetchMessages` / `newsletterMetadata`, whatsapp-web.js `Channel`; kanal kimliği `…@newsletter` | Resmî olmayan | Kanal için resmî okuma/yazma API'si yok; Meta forumunda "Cloud API desteklemiyor" yanıtı [3. TARAF]; Coexistence belgesi Channels'ı desteklenmeyenler arasında sayar [RESMÎ] |
| Kanal takipçi sayısı / meta verisi | Resmî: hayır | Resmî olmayan kütüphane; ya da kanal sayfasının önizlemesi | Resmî olmayan / Herkese açık | [TAHMİN] Web önizlemesi yalnız temel bilgi verir, gönderi akışı vermez |
| Kişinin Durum (Status) paylaşımı | Resmî: hayır | Baileys/whatsmeow `status@broadcast` mesajlarını alır | Resmî olmayan | Kişi seni rehberinde tutmuyorsa görünmez |
| Canlı yayın başladı | Uygulanamaz | WhatsApp'ta canlı yayın özelliği yok | — | Görüntülü grup araması canlı yayın değildir |
| Telefonda Business uygulamasıyla yazılanlar | Evet | Coexistence + `smb_message_echoes` | Tech Provider / BSP | Gruplar, kanallar hariç |
| Kişinin çevrimiçi/son görülme | Resmî: hayır | Resmî olmayan kütüphanelerde presence aboneliği | Resmî olmayan | Gizlilik açısından hassas; kullanma |
| Anahtar kelime / önem filtresi | Evet (kendi tarafında) | Webhook gövdesindeki `text.body`, `caption`, `interactive` alanları üzerinde kural/LLM sınıflandırma | — | Platform verisiyle genel model eğitmek yasak; kendi kullanımın için ince ayar serbest [RESMÎ, rehber § 15] |

**Tasarım önerisi [TAHMİN]:** Takip uygulamasında WhatsApp'ı iki ayrı "konnektör" olarak düşün: (1) **resmî konnektör** — kendi işletme numarana/OBA gruplarına gelenler, webhook → kuyruk → filtre; (2) **resmî olmayan konnektör** — yalnız kendine ait, kaybedilmesi sorun olmayan bir numarayla, salt okuma modunda kanal/grup izleme; açıkça "deneysel, ToS riskli" olarak etiketlenmeli ve diğer platformlardan yalıtılmalı.

## Hız sınırları ve fiyatlar

Ayrıntılı tablo ve Türkiye fiyatları: [rehber § 11–12](../../Rehberler/Mesajlasma-Altyapilari/02-whatsapp-business-api.html#limitler). Özet:

| Konu | Değer | Etiket |
|---|---|---|
| Mesaj limiti (CSW dışı, 24 saatte benzersiz alıcı, portföy düzeyi) | 250 → 2.000 → 10.000 → 100.000 → sınırsız | [RESMÎ] |
| Throughput | Numara başına 80 mesaj/sn, otomatik 1.000'e kadar; Coexistence numarası sabit **20 mesaj/sn** | [RESMÎ] |
| Graph API çağrı limiti | Business Use Case rate limit (WABA başına); aşılırsa hata `80008` / `130429` (throughput) | [RESMÎ, ayrıntı referansta] |
| Fiyat modeli | 1 Tem 2025'ten beri mesaj başı; kategori × alıcının ülke kodu. 1 Eki 2026'dan beri CSW içi serbest (service) mesaj ve CSW içinde gönderilen utility şablonları da ücretli; service mesajlarında hacim kademesi yok; 72 saatlik FEP (reklam/CTA giriş noktası) penceresi hâlâ ücretsiz | [RESMÎ] (Non-template messages sayfası) / [ÇELİŞKİLİ] — ana Pricing sayfası 15.10.2026'da hâlâ "CSW içi şablonsuz mesaj ücretsiz" diyor; webhook `pricing.billable` alanından teyit et |
| Grup mesajı fiyatı | **Teslim edilen her katılımcı başına** ayrı ücret; kategoriler `GROUP_MARKETING`, `GROUP_UTILITY`, `GROUP_SERVICE`; grup utility hacim kademesine girmez | [RESMÎ] |
| Grup service mesajı | Groups fiyat sayfası "şablonsuz mesajlar her zaman ücretsiz" diyor; 1:1 service mesajları ise 1 Eki 2026'dan beri ücretli | [ÇELİŞKİLİ] — sayfa güncellenmemiş olabilir; faturalama ekranından ve webhook `pricing` alanından doğrula |
| Analiz geriye bakış | Messaging/conversation/pricing: 1 yıl; template, template group ve group: 90 gün | [RESMÎ] |
| Webhook | ≤3 MB gövde; 7 güne kadar tekrar | [RESMÎ] |

## Resmî olmayan yollar ve riskler

Hepsi WhatsApp'ın **"bağlı cihaz" (multi-device / WhatsApp Web)** protokolünü taklit eder: bir telefonun WhatsApp'ından QR kodu okutulur ya da eşleştirme kodu girilir, kütüphane yeni bir bağlı cihaz gibi görünür ve hesabın gördüğü **her şeyi** (gruplar, kanallar, durumlar, geçmiş) okuyup gönderebilir.

| Kütüphane / araç | Dil | Nasıl çalışır | Güncel durum (15 Eki 2026) |
|---|---|---|---|
| [Baileys](https://github.com/WhiskeySockets/Baileys) (WhiskeySockets) | TypeScript/Node | Tarayıcısız, WhatsApp Web protokolünü doğrudan **WebSocket** ile konuşur; QR veya eşleştirme kodu | Son sürümler `v7.0.0-rc14` ve `v6.7.24` (29 Tem 2026); MIT. Kanal fonksiyonları kaynakta var: `newsletterMetadata`, `newsletterFetchMessages`, `newsletterFollow/Unfollow`, `newsletterSubscribers`, `newsletterCreate` vb. [3. TARAF — kaynak kodu] |
| [whatsapp-web.js](https://github.com/wwebjs/whatsapp-web.js) | Node | **Puppeteer** ile gerçek WhatsApp Web sayfasını sürer; QR | Son sürüm `v1.34.7` (24 Nis 2026); Apache-2.0; özellikler: gruplar (davet, katılımcı yönetimi), Channels ✅, Communities planlı, düğme/liste kullanımdan kalktı [3. TARAF — README] |
| [whatsmeow](https://github.com/tulir/whatsmeow) | Go | Multi-device protokolü, WebSocket; mautrix-whatsapp (Matrix köprüsü) bunu kullanır | Aktif (15 Eki 2026'da güncellendi) [3. TARAF] |
| [WAHA](https://github.com/devlikeapro/waha) | Docker / HTTP | Yukarıdaki motorları (WEBJS, NOWEB=Baileys, GOWS=whatsmeow) **REST API + webhook** olarak sarar; kendi sunucunda çalışır | Son sürüm `2026.9.2` (2 Eki 2026) [3. TARAF] |
| Ticari "WhatsApp API" ağ geçitleri (Whapi.Cloud, Z-API, Unipile vb.) | SaaS | Çoğu aynı Web protokolüne dayanır; kanal (`/newsletters`) ve grup uçları sunar | Meta onaylı değil; "resmî API" ile karıştırma [3. TARAF] |

**Riskler (nesnel):**

- **Hizmet Şartları:** WhatsApp Terms of Service; yetkisiz otomatik erişimi, toplu/otomatik mesajı, tersine mühendisliği ve yetkisiz istemcileri yasaklar [RESMÎ]. Kütüphanelerin kendi README'leri: "WhatsApp ile bağlantılı değildir", "engellenmeyeceğin garanti değildir", "spam yapma" [3. TARAF].
- **Ban:** Numara geçici ya da kalıcı kapatılabilir. Risk; yeni numara, toplu gönderim, rehberde olmayanlara yazma, çok sayıda gruba hızla katılma ve şikâyetle artar [TAHMİN — Meta eşiği yayımlamaz]. Salt okuma (yalnız dinleme) daha düşük risk gibi görünür ama sıfır değildir [TAHMİN].
- **Kırılganlık:** WhatsApp protokolü/web istemcisi değişince kütüphaneler bir gecede bozulabilir; destek ve SLA yok.
- **Hukuki / gizlilik:** Grup ve kanal mesajları, telefon numaraları, profil adları **kişisel veridir** (KVKK, GDPR). Başkalarının mesajlarını toplayıp saklamak açık rıza / meşru menfaat dayanağı ister; ticari kullanımda daha da hassastır. Mesajlar uçtan uca şifrelidir; bağlı cihaz anahtarları (oturum dosyası) parola kadar gizli tutulmalıdır.
- **Ne zaman olur:** Kişisel hobi, kendi numaranla, kendi üye olduğun kanal/grubu yalnız okumak → teknik olarak mümkün, risk sende. İşletme numarası, müşteri mesajlaşması, toplu duyuru → **kullanma**, resmî Cloud API'yi kullan.

## SDK ve kütüphaneler

| Ad | Dil | Tür | Not |
|---|---|---|---|
| Doğrudan HTTP (`HttpClient`, `fetch`, `requests`) | Hepsi | Resmî REST | Meta'nın güncel resmî SDK'sı **yok**; önerilen yol doğrudan Graph API çağrısı. C# örnekleri: [rehber § 9](../../Rehberler/Mesajlasma-Altyapilari/02-whatsapp-business-api.html#csharp) |
| [WhatsApp-Nodejs-SDK](https://github.com/WhatsApp/WhatsApp-Nodejs-SDK) | Node | Resmî (Meta) | **Arşivlendi**, son güncelleme Haziran 2023 — kullanma [RESMÎ — GitHub] |
| [Facebook Business SDK](https://github.com/facebook/facebook-nodejs-business-sdk) / Graph API Explorer | Çeşitli | Resmî | Genel Graph SDK; WhatsApp'a özel tip sınıfları sınırlı [TAHMİN] |
| [Whatsapp-Business-Cloud-Api-Net](https://github.com/gabrieldwight/Whatsapp-Business-Cloud-Api-Net) → NuGet `WhatsappBusiness.CloudApi` | **.NET** | Topluluk (Cloud API) | Aktif; `v1.0.103` (9 Eki 2026); DI uyumlu, webhook modelleri içerir [3. TARAF] |
| [pywa](https://github.com/david-lev/pywa) | Python | Topluluk (Cloud API) | Aktif; `4.5.0` (24 Eyl 2026); webhook sunucusu, şablon, Flows [3. TARAF] |
| [whatsapp-api-js](https://github.com/Secreto31126/whatsapp-api-js) | TS/Node | Topluluk (Cloud API) | Aktif; `6.3.0` (21 Eyl 2026) [3. TARAF] |
| Baileys, whatsapp-web.js, whatsmeow, WAHA | — | **Resmî olmayan** | Yukarıdaki bölüme bak |

## Postman / OpenAPI / koleksiyonlar

- **Resmî Postman çalışma alanı:** Meta'nın "WhatsApp Business Platform" çalışma alanında **WhatsApp Cloud API** ve **WhatsApp Business Management API** koleksiyonları ile eşleşen *environment* dosyaları bulunur; App Dashboard'daki "Run in Postman" düğmesi buraya götürür → [postman.com/meta](https://www.postman.com/meta/whatsapp-business-platform/overview) [RESMÎ adres; sayfa içeriği bu turda otomatik okunamadı, koleksiyon adları 3. taraf aynalardan doğrulandı — 3. TARAF]. Koleksiyonu düzenlemeden önce kendi çalışma alanına **fork/kopyala**; environment'a `Version`, `Phone-Number-ID`, `WABA-ID`, `User-Access-Token` gir.
- [Postman Collection for WhatsApp Business APIs (eski)](https://developers.facebook.com/docs/whatsapp/guides/postman) — On-Premises dönemine ait "WABiz" koleksiyonu; On-Premises kapandığı için **güncel değil** [RESMÎ].
- **OpenAPI:** Meta, WhatsApp Cloud API için resmî bir OpenAPI/Swagger dosyası yayımlamıyor [belgede yok]. Topluluk dönüşümleri ve aynalar (ör. Qodex) var; güncellik garantisi yok [3. TARAF].
- WAHA kendi REST API'si için Swagger arayüzü sunar (resmî olmayan) [3. TARAF].

## Depoda ilgili sayfalar

- [WhatsApp Business API — ayrıntılı rehber](../../Rehberler/Mesajlasma-Altyapilari/02-whatsapp-business-api.html) — mesaj JSON örnekleri, şablonlar, webhook örnek gövdeleri, C#, fiyat, onboarding, BSUID, AI politikası.
- [Mesajlaşma Altyapıları](../../Rehberler/Mesajlasma-Altyapilari/) — Telegram Bot API, BiP, SMS karşılaştırması.
- [Telegram Bot API](../../Rehberler/Mesajlasma-Altyapilari/01-telegram-bot-api.html) — kanal/grup takibi için resmî bot API'si olan alternatif.

## Kaynaklar

Resmî:

- [WhatsApp Business Platform — belgeler](https://developers.facebook.com/documentation/business-messaging/whatsapp/) — ana belge girişi (erişim: 15 Ekim 2026)
- [Webhooks overview](https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/overview) — webhook alanlarının tam listesi, 7 gün tekrar, 3 MB (erişim: 15 Ekim 2026)
- [Groups API](https://developers.facebook.com/documentation/business-messaging/whatsapp/groups) — uygunluk (OBA), 8 katılımcı, 10.000 grup (erişim: 15 Ekim 2026)
- [Groups API — referans](https://developers.facebook.com/documentation/business-messaging/whatsapp/groups/reference) — grup uç noktaları ve webhook alanları (erişim: 15 Ekim 2026)
- [Groups — mesajlaşma](https://developers.facebook.com/documentation/business-messaging/whatsapp/groups/groups-messaging) — `recipient_type: group`, gelen `group_id` (erişim: 15 Ekim 2026)
- [Groups — fiyatlandırma](https://developers.facebook.com/documentation/business-messaging/whatsapp/groups/pricing) — katılımcı başına ücret, GROUP_* kategorileri (erişim: 15 Ekim 2026)
- [Analytics](https://developers.facebook.com/documentation/business-messaging/whatsapp/analytics) — analytics, conversation_analytics, pricing_analytics, template_analytics, template_group_analytics, group_analytics sözdizimi ve granularity değerleri (erişim: 15 Ekim 2026)
- [Phone numbers](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers) — yeni portföyde 2 kayıtlı numara sınırı, doğrulama sonrası 20 (erişim: 15 Ekim 2026)
- [Messaging limits](https://developers.facebook.com/documentation/business-messaging/whatsapp/messaging-limits) — 250 başlangıç limiti, 2.000 kademesine geçiş yolları (erişim: 15 Ekim 2026)
- [Pricing](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing) · [Non-template messages](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/non-template-messages) — 1 Eki 2026 service/utility ücretlendirmesi, hacim kademesi yok, FEP ücretsiz (erişim: 15 Ekim 2026)
- [Coexistence — WhatsApp Business uygulaması kullanıcılarını onboard etme](https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users) — 180 gün geçmiş, echoes, desteklenmeyenler, 20 mps (erişim: 15 Ekim 2026)
- [On-Premises API sunset](https://developers.facebook.com/docs/whatsapp/on-premises/sunset) — 23 Ekim 2025 kapanış (erişim: 15 Ekim 2026)
- [Cloud API referansı](https://developers.facebook.com/documentation/business-messaging/whatsapp/reference) — tüm uç noktalar (erişim: 15 Ekim 2026)
- [Postman Collection (eski, On-Premises)](https://developers.facebook.com/docs/whatsapp/guides/postman) — tarihsel (erişim: 15 Ekim 2026)
- [WhatsApp Terms of Service](https://www.whatsapp.com/legal/terms-of-service) — otomatik/yetkisiz erişim yasağı (erişim: 15 Ekim 2026)
- [WhatsApp-Nodejs-SDK (arşiv)](https://github.com/WhatsApp/WhatsApp-Nodejs-SDK) — Meta'nın arşivlenmiş SDK'sı (erişim: 15 Ekim 2026)

3. taraf:

- [Meta Developer Community — "WhatsApp Channel API"](https://developers.secure.facebook.com/community/threads/839137344932813) — Cloud API'nin kanalları desteklemediği yanıtı (erişim: 15 Ekim 2026)
- [Baileys](https://github.com/WhiskeySockets/Baileys) · [newsletter.ts kaynağı](https://github.com/WhiskeySockets/Baileys/blob/master/src/Socket/newsletter.ts) — kanal fonksiyonları, sürümler (erişim: 15 Ekim 2026)
- [whatsapp-web.js](https://github.com/wwebjs/whatsapp-web.js) — özellik listesi, uyarı (erişim: 15 Ekim 2026)
- [whatsmeow](https://github.com/tulir/whatsmeow) · [WAHA](https://github.com/devlikeapro/waha) — Go kütüphanesi ve REST sarmalayıcı (erişim: 15 Ekim 2026)
- [Whatsapp-Business-Cloud-Api-Net](https://github.com/gabrieldwight/Whatsapp-Business-Cloud-Api-Net) · [pywa](https://github.com/david-lev/pywa) · [whatsapp-api-js](https://github.com/Secreto31126/whatsapp-api-js) — topluluk SDK'ları (erişim: 15 Ekim 2026)
- [Whapi.Cloud — WhatsApp Channels otomasyonu](https://whapi.cloud/how-to-automate-whatsapp-channels-api) — resmî olmayan kanal uçlarına örnek (erişim: 15 Ekim 2026)
- [Unipile — WhatsApp Group API 2026](https://www.unipile.com/whatsapp-group-api/) — Groups API özeti (satıcı yazısı) (erişim: 15 Ekim 2026)
