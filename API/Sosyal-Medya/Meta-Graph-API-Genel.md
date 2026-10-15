# Meta (Facebook) Graph API — genel yapı

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (ama başkasına ait içeriği okumak sıkı biçimde kısıtlı)

## Özet

Meta Graph API; Facebook Sayfaları, Instagram (profesyonel hesaplar), Messenger, WhatsApp Business Platform, Threads, reklam (Marketing API) gibi ürünlerin hepsinin üzerinde durduğu ortak HTTP/JSON API'sidir: her şey bir **düğüm** (node: Sayfa, gönderi, video), **kenar** (edge: `/feed`, `/live_videos`) ve **alan** (field) olarak modellenir. [RESMÎ] API kullanımı ücretsizdir (WhatsApp mesaj ücretleri ve reklam harcaması hariç); bedeli **izin + inceleme + doğrulama bürokrasisi** ve hız sınırlarıdır. [RESMÎ] Kural olarak yalnızca **senin yönettiğin** varlıkların (kendi Sayfan, kendi işletme hesabın) verisine kolayca erişirsin; başkasına ait Sayfaların herkese açık içeriği bile ayrı bir özellik (Page Public Content Access) ve işletme doğrulaması ister. [RESMÎ] Kişisel profillerin ve Facebook Gruplarının içeriğini üçüncü taraf uygulamayla okumak bugün pratikte mümkün değildir. [RESMÎ]

## Meta tarafı neden karışık? — düzenli harita

Karışıklığın kaynağı, birbirine bağlı ama ayrı yönetilen **beş katman** olmasıdır:

| Katman | Nedir | Nerede yönetilir |
|---|---|---|
| 1. Geliştirici hesabı | developers.facebook.com'a kayıtlı bir Facebook hesabı | Meta for Developers |
| 2. Uygulama (App) | App ID + App Secret; **türü** (Business / Consumer…) ve **kullanım senaryosu** (use case) seçilir, sonradan **değiştirilemez** [RESMÎ] | App Dashboard |
| 3. İşletme portföyü | Business Manager / Meta Business Suite (yeni adıyla *business portfolio*); Sayfalar, reklam hesapları, WhatsApp hesapları (WABA), System User'lar buraya bağlanır | business.facebook.com |
| 4. İzinler ve özellikler | *Permission* (kullanıcının verdiği yetki, ör. `pages_read_engagement`) ve *Feature* (uygulamaya tanınan yetenek, ör. Page Public Content Access) — her biri ayrı ayrı **Standard / Advanced Access** seviyesinde [RESMÎ] | App Dashboard → App Review |
| 5. Token | Hangi kimlikle çağrı yapıldığı: User, Page, App, System User, Client token [RESMÎ] | Login akışı / Business Settings |

Ayrıca **sürümleme** (her çağrı `v26.0` gibi bir sürüme bağlı), **Sayfa görevleri** (tasks: CREATE_CONTENT, MODERATE…) ve **"Yeni Sayfa Deneyimi"** (New Pages Experience) ile eski Sayfa alanları arasındaki farklar ek karmaşıklık yaratır. Bir çağrının çalışması için *aynı anda* doğru uygulama türü + doğru izin + yeterli erişim seviyesi + doğru token türü + kullanıcının Sayfada doğru görevi gerekir; biri eksikse hata alırsın.

### Uygulama türleri [RESMÎ]

- **Business**: İşletmelerin/içerik üreticilerinin Meta uygulamalarındaki varlığını yönetmesi ve reklam için. "App mode" yoktur; kimin izin verebileceğini yalnızca **erişim seviyeleri** belirler.
- **Consumer**: Kullanıcıya kişiselleştirilmiş deneyim sunan tüketici ürünleri (ör. Facebook Login). Development / Live modu vardır.
- Uygulama oluştururken "ne için kullanacaksın" (use case) sorusu türü belirler; tür, görebileceğin ürünleri ve izinleri sınırlar. **Tür değiştirilemez**; yanlış seçtiysen yeni uygulama açarsın.
- Gaming / Workplace gibi türler resmî "app types" sayfasında artık yalnızca Business ve Consumer olarak anlatılıyor; diğerleri için güncel belgede bilgi yok. [ÇELİŞKİLİ — eski blog yazıları daha fazla tür sayar]

### Erişim seviyeleri, App Review, Business Verification [RESMÎ]

- **Standard Access**: Business/Consumer/Gaming uygulamalara otomatik verilir. İzni yalnızca **uygulamada rolü olan** (admin, developer, tester) kişilerden isteyebilirsin. Kendi Sayfanı yöneten tek kişilik bir takip aracı için genelde bu yeter.
- **Advanced Access**: Herhangi bir kullanıcıdan izin istenebilir. Her izin/özellik **ayrı ayrı App Review**'dan geçer (ekran kaydı, kullanım açıklaması, gizlilik politikası URL'si istenir) ve **Business Verification** gerektirir (Business Verification sayfası); Access Levels sayfası 1 Şubat 2023 tarihini "doğrulanmış işletmeye bağlanması gerekebilir" (*may have to be connected*) diye veriyor.
- **Business Verification**: Uygulamanın bağlı olduğu işletme portföyünün resmî belgelerle doğrulanması (App Dashboard → Settings → Basic → Verification). Belge listesi Business Help Center'dadır; geliştirici belgesinde liste yok. Uygulamayı yalnızca rol sahipleri kullanacaksa gerekmez.
- **Tech Provider** (başka işletmelere hizmet veren SaaS) ve WhatsApp **Solution Partner** gibi statüler ayrıca vardır; ayrıntısı ilgili ürün belgesinde.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | Graph API'de pratikte **hiçbir şey** — her çağrı token ister. [RESMÎ] Kimliksiz tek resmî yol: Ad Library web arayüzü, oEmbed (o da App token ve **Meta oEmbed Read** özelliğini ister — App Review gerekir; 3 Kasım 2025'ten beri Facebook gönderi/video yanıtlarında `author_name`, `author_url`, `thumbnail_*` alanları yok; Facebook Sayfa gönderisi oEmbed uç noktası kaldırılacak, tarih verilmedi) [RESMÎ] | — |
| Geliştirici hesabı/uygulama (Standard Access) | Meta for Developers hesabı + uygulama; rol sahibi kullanıcı token'ı | **Yönettiğin** Sayfaların gönderileri, yorumları, canlı videoları, mesajları, Insights; Sayfa webhooks; test Sayfaları. PPCA test modunda yalnızca rol sahibinin yönettiği Sayfalarda çalışır [RESMÎ] | Ücretsiz; Platform/BUC hız sınırları |
| İşletme/uygulama onayı (Advanced Access + App Review + Business Verification) | Doğrulanmış işletme portföyü, her izin için App Review, gizlilik politikası | Başka kullanıcıların Sayfalarını uygulamana bağlaması (SaaS); **Page Public Content Access** ile yönetmediğin Sayfaların herkese açık gönderi/yorumları; Live Video API yayın özellikleri [RESMÎ] | Ücretsiz; PPCA için "ek sözleşmeler gerekebilir" [RESMÎ] |
| Ücretli/kurumsal | — | Graph API'nin kendisi ücretli değildir. Ücretli olan: WhatsApp mesaj şablonları, reklam. Araştırmacılar için **Meta Content Library** (CrowdTangle'ın yerine, yalnızca akademik/kâr amacı gütmeyen kurum araştırmacıları, ICPSR üzerinden başvuru) [3. TARAF] | Content Library için güvenli ortam ücreti iddiası var, doğrulanamadı [ÇELİŞKİLİ] |
| Resmî olmayan | — | Web/mobil arayüzü kazıma (scraping) kütüphaneleri; aşağıdaki "Resmî olmayan yollar" bölümüne bak | ToS ihlali, hesap/IP engeli riski |

## Kimlik doğrulama

OAuth 2.0 tabanlıdır; tüm çağrılar `access_token` parametresi veya `Authorization: Bearer` başlığıyla yapılır. [RESMÎ]

| Token türü | Nasıl alınır | Ömür | Ne için |
|---|---|---|---|
| **User** | Facebook Login (veya Facebook Login for Business) diyaloğu | Kısa ömürlü ~1–2 saat; uzun ömürlüye çevrilince ~60 gün [RESMÎ] | Kullanıcı adına; `/me/accounts` ile Sayfa token'ı almak |
| **Page** | Uzun ömürlü User token ile `GET /me/accounts` → her Sayfa için ayrı token | Uzun ömürlü User token'dan türetilirse **sabit bitiş tarihi yok** (şifre değişimi, yetki kaldırma vb. durumlarda geçersizleşir) [RESMÎ] | Sayfa adına okuma/yazma — takip aracının ana token'ı |
| **App** | `GET /oauth/access_token?client_id=…&client_secret=…&grant_type=client_credentials` veya `app_id\|app_secret` | Belgede süre yok | Uygulama ayarları, webhook abonelikleri, bazı herkese açık okumalar (oEmbed — Meta oEmbed Read özelliğiyle; bkz. yukarıdaki not) |
| **System User** | Business Settings → System Users → uygulamayı ata → Generate token | Seçilebilir; süresiz seçeneği var [RESMÎ] | Sunucu-sunucu, insan oturumuna bağlı olmayan otomasyon (Meta, PPCA çağrıları için de öneriyor) |
| **Client** | App Dashboard → Settings → Advanced → Security | Sabit değer | Mobil/masaüstü istemci gömülü çağrılar (`{app-id}\|{client-token}`) |

Kısa → uzun ömürlü User token değişimi (sunucuda yapılır, App Secret içerir):

```
GET https://graph.facebook.com/v26.0/oauth/access_token
    ?grant_type=fb_exchange_token
    &client_id={app-id}
    &client_secret={app-secret}
    &fb_exchange_token={short-lived-user-token}
```

- Token'ı test etmek için **Access Token Debugger** (developers.facebook.com/tools/debug/accesstoken), çağrı denemek için **Graph API Explorer** (developers.facebook.com/tools/explorer) kullanılır. [RESMÎ]
- Güvenlik için App Secret ile `appsecret_proof` (HMAC-SHA256) gönderilmesi önerilir. [RESMÎ]
- Meta, token ömürlerine güvenilmemesini, "haber vermeden değişebileceğini" belirtir. [RESMÎ]

### Sürümleme [RESMÎ]

- URL'ye sürüm yazılır: `https://graph.facebook.com/v26.0/...`. Sürüm yazılmazsa uygulamanın varsayılan (en eski kullanılabilir) sürümü kullanılır.
- Güncel sürüm **v26.0** (29 Temmuz 2026). Önceki: v25.0 (18 Şubat 2026, 29 Temmuz 2028'e kadar), v24.0 (8 Ekim 2025, 18 Şubat 2028'e kadar). v20.0, 24 Eylül 2026'da kaldırıldı; v21.0, 21 Ocak 2027'de kalkacak.
- Tabloya göre her sürüm, kendisinden sonraki sürüm çıktıktan yaklaşık **2 yıl** sonra kapanıyor; yılda 2–3 sürüm çıkıyor. [TAHMİN — tarihlerden çıkarım, belgede kural olarak yazmıyor]
- "Out-of-cycle" değişiklikler sürümden bağımsız, tüm sürümlere hemen uygulanabilir. Örnek: v26.0 ile `GET /?ids=...` kök çağrısı, `date_format`, ETag/304 desteği kaldırıldı, `pretty` ve `debug` parametreleri yok sayılıyor; **27 Ekim 2026'da tüm sürümlere** uygulanacak — çoklu ID ile toplu okuma yapan takip kodlarını etkiler. [RESMÎ]
- v26.0: Yeni Sayfa Deneyimi (NPE) Sayfaları için `current_location`, `genre`, `network`, `parking`, `start_info` alanları v26.0+'da kullanımdan kaldırıldı (sürüm hatası döner); tüm sürümlerde v26.0 çıkışından ~90 gün sonra kalkacak (tarih belirlenmedi). Normal Sayfalar etkilenmiyor. [RESMÎ]

## Temel uç noktalar

Taban URL: `https://graph.facebook.com/v26.0/` (video yükleme: `graph-video.facebook.com`).

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/me/accounts` | Kullanıcının yönettiği Sayfalar + her biri için Page token | Standard | `pages_show_list` |
| GET | `/{page-id}?fields=name,followers_count,…` | Sayfa bilgisi | Standard (kendi) / başkası: **PPCA** (Page Public Metadata Access, PPCA ile değiştirildi; yeni başvurular PPCA'yı kullanmalı) [RESMÎ] | |
| GET | `/{page-id}/feed` | Sayfadaki gönderiler (Sayfanın + ziyaretçilerin) | Kendi Sayfan: `pages_read_engagement` + `pages_read_user_content`; başkası: **PPCA** [RESMÎ] | `limit` en çok 100; yılda ~600 sıralı gönderi döner; süresi dolmuş gönderiler okunamaz [RESMÎ] |
| GET | `/{page-id}/posts`, `/{page-id}/published_posts` | Yalnızca Sayfanın kendi gönderileri | Aynı | Bu kenarlar için ayrıntı ilgili referans sayfasında |
| GET | `/{page-id}/video_reels` | Sayfa Reels'leri | Kendi Sayfan | Reels `/feed`'de değil, ayrı kenardadır [RESMÎ] |
| GET | `/{page-id}/live_videos?broadcast_status=["LIVE"]` | Sayfanın canlı/planlı/biten yayınları | Kendi Sayfan (admin Page token) | Resmî Page `live_videos` referansında okuma (GET) için "You can't perform this operation on this endpoint." yazıyor; `broadcast_status` Sayfa için belgelenmemiş (yalnızca kaldırılmış Groups API'nin referansında geçiyor). Pratikte çalıştığı bildirilse de belgelenmemiş. Kendi Sayfan için güvenilir yol: `live_videos` webhook'u + `/{live-video-id}` okuması [RESMÎ] |
| GET | `/{live-video-id}?fields=status,title,permalink_url` | Tek canlı yayının durumu | Kendi Sayfan; `publish_video` izinli User veya Page token (Streaming rehberi). Live Video API özelliği + izinler App Review ister; Standard Access'te yalnızca uygulamada rolü olan kişiler için çalışır | Durumlar: `LIVE`, `VOD`, `SCHEDULED_*`, `UNPUBLISHED`… [RESMÎ] |
| POST | `/{page-id}/live_videos?status=LIVE_NOW` | Canlı yayın başlatır (RTMPS URL döner) | Live Video API App Review + `pages_manage_posts`, `pages_read_engagement` | Hesap ≥60 gün, Sayfa ≥100 takipçi (10 Haziran 2024 kuralı) [RESMÎ] |
| GET | `/{post-id}/comments` | Gönderi yorumları | Kendi Sayfan / PPCA | |
| POST | `/{page-id}/feed` | Sayfada gönderi paylaşır | `pages_manage_posts`, `pages_read_engagement`, `pages_show_list` + CREATE_CONTENT görevi | `message` veya `link` zorunlu; `scheduled_publish_time` 10 dk–75 gün [RESMÎ] |
| GET | `/pages/search?q=…` | Sayfa arama | PPCA | [RESMÎ] |
| POST | `/{page-id}/subscribed_apps?subscribed_fields=feed,live_videos` | Sayfayı uygulamanın webhook'una abone eder | Page token + `pages_manage_metadata` | Webhook için şart |
| GET | `/ads_archive` | Ad Library API (siyasi/sosyal konulu reklamlar; AB'de tüm reklamlar) | Facebook.com/ID üzerinden kimlik + konum onayı yapılmış kullanıcı; uygulamaya Ad Library API ürünü eklenir; `ads_read` izinli User token | Reklam takibi için. Meta'nın resmî ürünü ([Ad Library API](https://www.facebook.com/ads/library/api/)); gereksinim ayrıntıları resmî sayfaya erişilemediği için 3. taraf rehberlerden — resmî sayfadan doğrula [3. TARAF] |
| POST | `/` (batch) | 50'ye kadar çağrıyı tek istekte gönderir | Her seviye | Her alt çağrı limitten ayrı sayılır [RESMÎ] |

Tam liste: [Graph API Reference](https://developers.facebook.com/docs/graph-api/reference), [Pages API](https://developers.facebook.com/docs/pages-api).

**Kaldırılanlar (takip planlarken önemli):**

- **Groups API** v19.0'da kullanımdan kaldırıldı, **22 Nisan 2024'te tüm sürümlerden silindi**; `publish_to_groups`, `groups_access_member_info` izinleri yok. Grup içeriğini okumak/paylaşmak için resmî API yok. [RESMÎ — v19 changelog]
- **Page Insights metrikleri**: Bazı Page Insights metrikleri 15 Haziran 2026'dan itibaren tüm sürümlerde kaldırıldı; bunları isteyen çağrılar "invalid metric" hatası döndürür. Hangi metrikler olduğu Page Insights referansındaki deprecated listesinde. Kendi Sayfasının istatistiklerini takip eden araçlar metrik listesini kontrol etmeli. [RESMÎ]
- **Page Public Metadata Access**: PPCA ile değiştirildi; PPCA isteyen veya PPCA onaylı uygulamalar bu özelliği isteyemez. [RESMÎ]
- **Kişisel profiller**: Başka kullanıcıların zaman tüneli, arkadaş listesi vb. API'de yok (2018 Cambridge Analytica sonrası kısıtlamalar). [3. TARAF]
- **CrowdTangle**: 14 Ağustos 2024'te kapandı; yerine yalnızca araştırmacılara açık Meta Content Library geldi. [3. TARAF]

## Gerçek zamanlı / bildirim

- **Webhooks** [RESMÎ]: Meta, abone olduğun nesne/alan değişince sunucuna `POST` atar.
  - Kurulum: App Dashboard → Webhooks → nesne seç (Page, Instagram, WhatsApp Business Account, Messenger, Ad Account, Leads, Payments, User…) → Callback URL + Verify Token.
  - Doğrulama: Meta bir `GET` gönderir (`hub.mode=subscribe`, `hub.verify_token`, `hub.challenge`); token eşleşirse `hub.challenge` değerini geri döndürürsün.
  - İmza: Her `POST`'ta `X-Hub-Signature-256: sha256=...` başlığı; App Secret ile HMAC-SHA256 hesaplayıp karşılaştır.
  - Hemen `200 OK` dön. Başarısız teslimler 36 saat boyunca azalan sıklıkla yeniden denenir, sonra düşer → **tekrarları ayıklayan (dedupe)** kod yaz. Toplu teslim en çok 1000 olay.
  - mTLS: İsteğe bağlı; Meta'nın yeni CA dosyası (`meta-outbound-api-ca-2025-12.pem`) gerekiyor, eski DigiCert sertifikası 15 Nisan 2026'da sona erdi.
- **Page webhook alanları** (seçme) [RESMÎ]: `feed` (gönderi, paylaşım, beğeni, yorum; reklam gönderilerinin kendisi tetiklemez ama onlara yapılan yorumlar tetikler; Sayfa beğeni bildirimleri yalnızca 10 binden az beğenili Sayfalarda gelir), `live_videos` (canlı yayın durum değişimi), `videos`, `mention` (Sayfanın etiketlenmesi), `ratings`, `messages` ve diğer Messenger alanları, `leadgen`, `group_feed`. Webhook'ların gelmesi için Sayfada MODERATE yetkili bir yöneticinin uygulamaya `pages_manage_metadata` vermesi gerekir.
- **Önemli sınır**: Webhook yalnızca **uygulamaya bağlı (yönettiğin/izin veren) Sayfalar** için gelir. Başkasının Sayfası için webhook yoktur; PPCA ile **yoklama (polling)** yapman gerekir. [RESMÎ + çıkarım]
- **WebSocket / streaming / WebSub**: Graph API'de yok. [RESMÎ — belgede yok]
- **RSS**: Facebook Sayfaları için resmî RSS yok (yıllar önce kaldırıldı). [3. TARAF]

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Kendi Sayfanda yeni gönderi | Evet | Webhook `feed` veya `/{page-id}/published_posts` yoklama | Standard | En kolay senaryo |
| Kendi Sayfanda canlı yayın başladı | Evet | Webhook `live_videos` → `/{live-video-id}?fields=status` | Standard (`publish_video`; yalnızca rol sahipleri — başkalarına açmak App Review ister) | `status=LIVE` olunca bildir |
| **Başkasının** Sayfasında yeni gönderi | Kısıtlı | `/{page-id}/feed` yoklama + **PPCA** | App Review + Business Verification | Webhook yok; System User token önerilir; BUC limitine dikkat |
| Başkasının Sayfasında canlı yayın başladı | Belirsiz / zayıf | PPCA ile `/feed` içinde canlı video gönderisini yakalamak; `/live_videos` kenarı başkası için belgelenmemiş | App Review | [ÇELİŞKİLİ] Güvenilir resmî yol bulunamadı |
| Kişisel profil paylaşımı / canlı yayını | Hayır | — | — | Resmî API yok |
| Facebook Grubu gönderileri | Hayır | — | — | Groups API 2024'te kaldırıldı |
| Kendi Sayfandaki yorum / Sayfanın anılması | Evet | Webhook `feed` (yorum), `mention` | Standard | |
| Sayfaya gelen mesajlar | Evet | Messenger Platform webhook `messages` | Standard (kendi Sayfan) | 24 saat mesajlaşma penceresi kuralı |
| Instagram profesyonel hesap / Threads / WhatsApp | Ayrı ürün | Aynı Graph altyapısı, ayrı izinler | — | Bu klasördeki ilgili platform sayfalarına bak |
| Anahtar kelime / filtreleme | Sunucu tarafında | API tam metin arama sunmaz (Sayfa araması hariç); gelen `message` alanını kendi kodunda filtrele | — | Filtreleme senin uygulamanda yapılır |
| Reklam takibi (bir Sayfanın reklamları) | Kısmen | Ad Library API `/ads_archive` | Kimlik doğrulama | AB dışı yalnızca siyasi/sosyal konulu reklamlar [3. TARAF] |

## Hız sınırları ve fiyatlar

- **Fiyat**: Graph API çağrıları ücretsiz. [RESMÎ]
- **Platform Rate Limits** (User/App token ile) [RESMÎ]:
  - Uygulama düzeyi: kayan 1 saatte **200 × kullanıcı sayısı** çağrı (tüm kullanıcılar ortak havuz).
  - Kullanıcı düzeyi: değer açıklanmıyor.
- **Business Use Case (BUC) limitleri** (Page/System User token ile Pages API, Instagram, Messenger…) [RESMÎ]:
  - Pages: 24 saatte **4800 × Sayfayla etkileşime giren kullanıcı sayısı**.
  - Instagram: 4800 × gösterim (24 saat). Threads: 4800 × gösterim + CPU/süre limitleri. Messenger: 200 × etkileşimli kullanıcı.
  - WhatsApp Business Management: WABA başına saatte 200 (aktif WABA için 5000).
  - Aynı çağrıya iki limit de uyuyorsa BUC geçerlidir.
- **İzleme başlıkları**: `X-App-Usage` (call_count, total_time, total_cputime %), `X-Business-Use-Case-Usage` (`estimated_time_to_regain_access` dakika). [RESMÎ]
- **Hata kodları**: 4 (uygulama limiti), 17 (kullanıcı limiti), 32 (Pages, User token), 80001 (Pages, Page/System User token), 613 (özel limit). Limite takılınca çağırmaya devam etmek bekleme süresini uzatır. [RESMÎ]
- Küçük/yeni bir Sayfa için BUC formülü düşük kotaya yol açabilir; çok sayıda yabancı Sayfayı sık yoklamak bu yüzden pahalıdır. [TAHMİN]

## Resmî olmayan yollar ve riskler

| Yol | Nasıl çalışır | Durum / risk |
|---|---|---|
| Web kazıma kütüphaneleri (ör. Python `facebook-scraper`) | Facebook'un mobil/basit web sürümünü HTML olarak ayrıştırır | Facebook'un HTML değişiklikleri ve giriş duvarı nedeniyle sık bozulur; bakım düzensiz [3. TARAF] |
| Tarayıcı otomasyonu (Playwright/Selenium + oturum çerezi) | Gerçek tarayıcıda giriş yapıp sayfayı okur | Meta Kullanım Koşulları otomatik veri toplamayı yazılı izin olmadan yasaklar; hesap kapatma, IP engeli riski [3. TARAF] |
| Ticari kazıma hizmetleri (Apify, Bright Data vb.) | Kendi altyapılarıyla herkese açık sayfaları toplar | Ücretli; 2024'te bir ABD mahkemesi, oturum açmadan herkese açık veri kazımanın Meta koşullarını ihlal etmediğine hükmetti ve Meta davayı düşürdü — ancak bu yalnızca o davaya ve ABD hukukuna özgüdür [3. TARAF] |
| Gayriresmî Graph uç noktaları / mobil uygulama API'leri | Tersine mühendislikle uygulamanın iç çağrılarını taklit etme | En yüksek ban ve hukuki risk; her an kırılabilir [TAHMİN] |

Genel değerlendirme: Kişisel veri içeren içeriği (yorum yapanlar, profil bilgileri) kazımak, Türkiye'de **KVKK**, AB'de **GDPR** kapsamında ayrıca hukuki sorumluluk doğurabilir. Kendi kullanımın için bile resmî yol (PPCA veya yalnızca kendi Sayfaların) tercih edilmelidir. [TAHMİN — hukuki görüş değildir]

## SDK ve kütüphaneler

- **Resmî**:
  - **Meta Business SDK** — Java, Node.js, PHP, Python, Ruby (Marketing API SDK'sının yeni hâli; Pages, Instagram vb. iş API'lerini de kapsar). **.NET/C# resmî SDK yok.** [RESMÎ]
  - **Facebook SDK** — JavaScript, iOS, Android, Unity (Login ve istemci tarafı). Facebook Platform SDK v20.0 Eylül 2026'da, v21.0 Ocak 2027'de kullanımdan kalkıyor. [RESMÎ]
- **.NET (topluluk)**:
  - Doğrudan `HttpClient` + `System.Text.Json` ile çağırmak en sağlam yoldur; Graph API düz REST/JSON'dur. [TAHMİN]
  - `Facebook` (Facebook C# SDK, NuGet 6.x) — eski, uzun süredir güncellenmiyor. [3. TARAF]
  - `CMS365.FacebookSharp` — NuGet'te, Graph API v17 hedefliyor; güncelliğini kontrol et. [3. TARAF]
  - WhatsApp için ayrı topluluk paketleri var (ilgili WhatsApp sayfasına bak).
- **Diğer topluluk**: Python `facebook-sdk` (eski), `requests` ile doğrudan; Node.js `fb` paketleri. Çoğu eski sürüm hedefler; sürüm numarasını URL'de kendin belirt. [3. TARAF]

## Postman / OpenAPI / koleksiyonlar

- **Meta'nın resmî Postman sayfası**: [postman.com/meta](https://www.postman.com/meta) — Meta'nın public workspace'leri burada. [RESMÎ]
  - **WhatsApp Business Platform** workspace → **WhatsApp Cloud API** koleksiyonu + ortam (environment) dosyası; Get Started klasörü (WABA aboneliği, telefon numarası ID'si, kayıt), Flows klasörü (ayrı Flows koleksiyonu "[MOVED]" olarak taşındı). [RESMÎ]
  - Eski On-Premises API koleksiyonu artık geçersiz: On-Premises API'nin son istemci sürümü 23 Ekim 2025'te sona erdi; yalnızca Cloud API kullanılır. [RESMÎ]
  - Graph API / Pages API için resmî, güncel bir Postman koleksiyonu bulunamadı; aramada çıkan bazı "Meta" workspace'leri kişisel kopyalar. Resmî olanı `postman.com/meta` adresinden doğrula. [ÇELİŞKİLİ]
- **Graph API Explorer**: Postman yerine Meta'nın kendi tarayıcı aracı; token üretip çağrı denemek için en hızlı yol. [RESMÎ]
- **OpenAPI**: Graph API için Meta'nın yayımladığı resmî bir OpenAPI/Swagger tanımı belgede yok. [RESMÎ — belgede yok]

## Depoda ilgili sayfalar

- [Mesajlaşma altyapıları rehberi](../../Rehberler/Mesajlasma-Altyapilari/) — WhatsApp, Telegram, BiP, SMS API'lerinin genel kuralları.
- Aynı klasördeki (`API/Sosyal-Medya/`) Instagram, Threads, WhatsApp, Messenger sayfaları — Meta'nın bu ürünleri aynı Graph altyapısını, token ve App Review sistemini kullanır; bu sayfa onların ortak "temel"idir.

## Kaynaklar

Resmî:

- [Graph API Changelog](https://developers.facebook.com/docs/graph-api/changelog) — sürümler ve kapanış tarihleri (erişim: 15 Ekim 2026)
- [Graph API v26.0 Changelog](https://developers.facebook.com/docs/graph-api/changelog/version26.0) — v26.0 değişiklikleri, 27 Ekim 2026 kaldırmaları (erişim: 15 Ekim 2026)
- [Introducing Graph API v26 and Marketing API v26](https://developers.facebook.com/blog/post/2026/07/29/introducing-graph-api-v26-and-marketing-api-v26/) — duyuru yazısı (erişim: 15 Ekim 2026)
- [Graph API v19.0 Changelog](https://developers.facebook.com/docs/graph-api/changelog/version19.0/) — Groups API'nin kaldırılması (erişim: 15 Ekim 2026)
- [Rate Limits](https://developers.facebook.com/docs/graph-api/overview/rate-limiting) — Platform ve BUC limitleri, başlıklar, hata kodları (erişim: 15 Ekim 2026)
- [Access Tokens](https://developers.facebook.com/docs/facebook-login/guides/access-tokens) — token türleri (erişim: 15 Ekim 2026)
- [Long-Lived Access Tokens](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived) — uzun ömürlü User/Page token (erişim: 15 Ekim 2026)
- [App Types](https://developers.facebook.com/docs/development/create-an-app/app-dashboard/app-types) — Business/Consumer, tür değiştirilemez (erişim: 15 Ekim 2026)
- [Access Levels](https://developers.facebook.com/docs/graph-api/overview/access-levels) — Standard/Advanced Access (erişim: 15 Ekim 2026)
- [Business Verification](https://developers.facebook.com/docs/development/release/business-verification) — işletme doğrulaması (erişim: 15 Ekim 2026)
- [Pages API Overview](https://developers.facebook.com/docs/pages-api/overview) — Sayfa token'ı, görevler (tasks), akış (erişim: 15 Ekim 2026)
- [Page Feed Reference](https://developers.facebook.com/docs/graph-api/reference/page/feed/) — `/feed` okuma/yazma, limitler (erişim: 15 Ekim 2026)
- [Page Public Content Access](https://developers.facebook.com/docs/features-reference/page-public-content-access) — yönetilmeyen Sayfaların herkese açık içeriği (erişim: 15 Ekim 2026)
- [Live Video API](https://developers.facebook.com/docs/live-video-api/) — canlı yayın gereksinimleri (erişim: 15 Ekim 2026)
- [Live Video API — Streaming](https://developers.facebook.com/docs/live-video-api/guides/streaming) — durumlar ve izinler (erişim: 15 Ekim 2026)
- [Page live_videos reference](https://developers.facebook.com/docs/graph-api/reference/page/live_videos) — okuma "desteklenmeyen işlem", yalnızca oluşturma belgeli (erişim: 15 Ekim 2026)
- [Group live_videos reference](https://developers.facebook.com/docs/graph-api/reference/group/live_videos) — kaldırılmış Groups API'ye ait referans (`broadcast_status`); Sayfa için geçerliliği belgelenmemiş (erişim: 15 Ekim 2026)
- [Page Insights](https://developers.facebook.com/docs/platforminsights/page) — 15 Haziran 2026 metrik kaldırmaları (erişim: 15 Ekim 2026)
- [Page Public Metadata Access](https://developers.facebook.com/docs/features-reference/page-public-metadata-access) — PPCA ile değiştirildi (erişim: 15 Ekim 2026)
- [Non-versioned changes 2025](https://developers.facebook.com/docs/graph-api/changelog/non-versioned-changes/nvc-2025) — Meta oEmbed Read, 3 Kasım 2025 oEmbed alan kaldırmaları (erişim: 15 Ekim 2026)
- [Ad Library API](https://www.facebook.com/ads/library/api/) — resmî Ad Library API sayfası (15 Ekim 2026'da erişilemedi)
- [Webhooks — Getting Started](https://developers.facebook.com/docs/graph-api/webhooks/getting-started) — doğrulama, imza, tekrar deneme, mTLS (erişim: 15 Ekim 2026)
- [Webhooks — Page reference](https://developers.facebook.com/docs/graph-api/webhooks/reference/page) — Sayfa webhook alanları (erişim: 15 Ekim 2026)
- [Meta Business SDK](https://developers.facebook.com/docs/business-sdk) — resmî SDK dilleri (erişim: 15 Ekim 2026)
- [WhatsApp Postman rehberi](https://developers.facebook.com/docs/whatsapp/guides/postman) — On-Premises sonu, Cloud API'ye yönlendirme (erişim: 15 Ekim 2026)
- [Meta Postman sayfası](https://www.postman.com/meta) ve [WhatsApp Cloud API koleksiyonu](https://www.postman.com/meta/workspace/whatsapp-business-platform/collection/13382743-84d01ff8-4253-4720-b454-af661f36acc2) — resmî koleksiyonlar (erişim: 15 Ekim 2026)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer) ve [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken) — deneme araçları (erişim: 15 Ekim 2026)

Üçüncü taraf:

- [Meta To Sunset Content-Monitoring Tool (MediaPost)](https://www.mediapost.com/publications/article/394446/meta-to-sunset-content-monitoring-tool-restrict-a.html) — CrowdTangle'ın kapanışı (erişim: 15 Ekim 2026)
- [A First Look at Meta's Content Library (Social Media Lab)](https://socialmedialab.ca/?p=22554) — Content Library erişim koşulları (erişim: 15 Ekim 2026)
- [Meta removes Facebook Groups API (Techpoint Africa)](https://techpoint.africa/2024/02/06/meta-facebook-disrupts-scheduling) — Groups API kaldırılmasının etkisi (erişim: 15 Ekim 2026)
- [CMS365.FacebookSharp (NuGet)](https://www.nuget.org/packages/CMS365.FacebookSharp) — topluluk .NET paketi (erişim: 15 Ekim 2026)
- [Facebook C# SDK (NuGet)](https://nuget.org/packages/Facebook/6.0.10) — eski topluluk .NET SDK'sı (erişim: 15 Ekim 2026)
