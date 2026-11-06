# Meta (Facebook) Graph API — genel yapı

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 6 Kasım 2026 · Durum: aktif (ama başkasına ait içeriği okumak sıkı biçimde kısıtlı)
>
> 6 Kasım 2026 doğrulaması: Marketing API bölümü, sürüm bilgisi (sürümsüz çağrı kuralı ve v27.0 değişiklikleri dahil), Graph API hız sınırı sayfası ve .NET/NuGet paket satırları resmî belgelerden ve paket kayıtlarından yeniden kontrol edildi; diğer bölümler 15 Ekim 2026 doğrulamasına dayanır.

## Özet

Meta Graph API; Facebook Sayfaları, Instagram (profesyonel hesaplar), Messenger, WhatsApp Business Platform, Threads, reklam (Marketing API) gibi ürünlerin hepsinin üzerinde durduğu ortak HTTP/JSON API'sidir: her şey bir **düğüm** (node: Sayfa, gönderi, video), **kenar** (edge: `/feed`, `/live_videos`) ve **alan** (field) olarak modellenir. [RESMÎ] API kullanımı ücretsizdir (WhatsApp mesaj ücretleri ve reklam harcaması hariç); bedeli **izin + inceleme + doğrulama bürokrasisi** ve hız sınırlarıdır. [RESMÎ] Kural olarak yalnızca **senin yönettiğin** varlıkların (kendi Sayfan, kendi işletme hesabın) verisine kolayca erişirsin; başkasına ait Sayfaların herkese açık içeriği bile ayrı bir özellik (Page Public Content Access) ve işletme doğrulaması ister. [RESMÎ] Kişisel profillerin ve Facebook Gruplarının içeriğini üçüncü taraf uygulamayla okumak bugün pratikte mümkün değildir. [RESMÎ] Reklam yönetimi (Marketing API) ayrı bir erişim katmanı (Limited/Full), ayrı sürüm takvimi ve ayrı hız sınırlarıyla çalışır; aşağıda kendi bölümünde anlatılır. [RESMÎ]

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

- URL'ye sürüm yazılır: `https://graph.facebook.com/v26.0/...`. Sürüm yazılmazsa (sürümsüz çağrı) App Dashboard → Settings → Advanced altındaki **Upgrade API Version** kartında ayarlı sürüm kullanılır; kullanılamaz hâle gelen bir sürüme yapılan çağrılar bir sonraki en eski kullanılabilir sürüme yönlendirilir. JavaScript SDK'da sürümsüz çağrı yapılamaz. (Versioning rehberi)
- Güncel sürüm **v27.0** (4 Kasım 2026, duyuru yazısı). Changelog'daki sürüm tablosu 6 Kasım 2026'da henüz v26.0'ı en üstte gösteriyor ve v27.0 changelog sayfası açılmıyor (404); aynı sayfanın üst kısmı ise en son sürümü v27.0 olarak veriyor [ÇELİŞKİLİ — yayın yeni, tablo güncellenmemiş]. Önceki: v26.0 (29 Temmuz 2026, bitiş tarihi belirlenmedi), v25.0 (18 Şubat 2026, 29 Temmuz 2028'e kadar), v24.0 (8 Ekim 2025, 18 Şubat 2028'e kadar). v20.0, 24 Eylül 2026'da kaldırıldı; v21.0, 21 Ocak 2027'de, v22.0, 20 Mayıs 2027'de kalkacak. Bu sayfadaki örnekler v26.0 ile yazıldı; v26.0 desteklenmeye devam ediyor. Marketing API'nin sürüm takvimi ayrıdır (aşağıdaki Marketing API bölümü).
- Versioning rehberine göre her Graph API sürümünün **en az 2 yıl** çalışması garanti ediliyor ve bir sürüm, kendisinden sonraki sürümün çıkışından 2 yıl sonra kullanılamaz hâle geliyor; tablo da bunu gösteriyor (v25.0'ın bitişi 29 Temmuz 2028 = v26.0 çıkışı + 2 yıl) [RESMÎ]. Yılda 2–3 sürüm çıkıyor. [TAHMİN — tarihlerden çıkarım]
- "Out-of-cycle" değişiklikler (güvenlik ve gizlilik gerekçeli, seyrek) sürümden bağımsız, kısa sürede tüm sürümlere uygulanabilir (Versioning rehberi). Sürümlü değişiklikler de changelog'da verilen tarihte tüm sürümlere yayılabilir. Örnek: v26.0 ile `GET /?ids=...` kök çağrısı, `date_format`, ETag/304 desteği kaldırıldı, `pretty` ve `debug` parametreleri yok sayılıyor; changelog takvimine göre **27 Ekim 2026'dan beri tüm sürümlerde** geçerli — çoklu ID ile toplu okuma yapan takip kodlarını etkiler. [RESMÎ]
- v27.0 duyurusu (4 Kasım 2026) [RESMÎ]: 4 Kasım 2026'dan beri **yeni uygulamalar** çoklu ID istekleri (multi-ID), tarih/saat biçimlendirme, HTTP method override, alan takma adları (field aliases), JSONP geri çağrıları ve asenkron toplu istekleri (asynchronous batch requests) kullanamaz; mevcut uygulamalar bunlara yeni kullanım ekleyemez. Multi-ID ve tarih biçimlendirme v26.0'da zaten kullanımdan kalkmıştı; kalan dördü v28.0 isteklerinde desteklenmeyecek (mevcut uygulamalar eski sürümlerde kullanmaya devam edebilir). Ayrıca gönderi düzenleme uç noktalarına isteğe bağlı `is_ai_generated` (yapay zekâ ile üretildi beyanı) parametresi geldi; Page Insights metriği `total_video_consumption_rate` Kasım 2026 başında tüm sürümlerde veri döndürmeyi bırakıyor, yerine bir metrik yok.
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
| POST | `/` (batch) | 50'ye kadar çağrıyı tek istekte gönderir | Her seviye | Her alt çağrı limitten ayrı sayılır [RESMÎ]. Asenkron toplu istek (asynchronous batch requests) ayrı bir özelliktir: 4 Kasım 2026'dan beri yeni uygulamalara kapalı, v28.0'da desteklenmeyecek; bu eşzamanlı batch v27.0 duyurusunun listesinde yok [RESMÎ] |

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
| Kendi reklam hesabındaki reklamın sorunlu duruma düşmesi, işlenmesinin bitmesi; harcama ve performans | Evet | Ad Account webhook'u (`with_issues_ad_objects`, `in_process_ad_objects`) + Insights yoklaması | `ads_management` / `ads_read` (kendi hesabın için Standard Access) | Ayrıntı: aşağıdaki Marketing API bölümü [RESMÎ] |

## Hız sınırları ve fiyatlar

- **Fiyat**: Graph API çağrıları ücretsiz. [RESMÎ]
- **Marketing API**: Marketing API Rate Limiting sayfası, Marketing API'nin Graph API hız sınırlarının hiçbirine tabi olmadığını yazar; Graph API Rate Limits sayfası ise Marketing API isteklerini BUC kapsamında sayar (Ads Insights `80000`, Ads Management `80004`, Custom Audience `80003`). İkisi de aynı reklam hesabı başına saatlik BUC kotasını anlatıyor; formüller aşağıdaki Marketing API bölümünde. [ÇELİŞKİLİ — iki sayfanın ifadesi farklı, kota aynı] Graph sayfasına göre bir isteğe hem Platform hem BUC limiti uyuyorsa BUC uygulanır. [RESMÎ]
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
  - **Facebook SDK** — JavaScript, iOS, Android, Unity (Login ve istemci tarafı). Facebook Platform SDK v20.0 Eylül 2026'da kullanımdan kalktı; v21.0 Ocak 2027'de kalkacak. [RESMÎ]
- **.NET (topluluk)**:
  - Doğrudan `HttpClient` + `System.Text.Json` ile çağırmak en sağlam yoldur; Graph API düz REST/JSON'dur. [TAHMİN]
  - `Facebook` (Facebook C# SDK) — NuGet'te son kararlı sürüm 7.0.6 (13 Nisan 2015); 2015'ten beri güncellenmiyor, kullanılmamalı. [3. TARAF: NuGet kaydı, 6 Kasım 2026]
  - `CMS365.FacebookSharp` — NuGet'te **kullanımdan kaldırılmış** (deprecated, gerekçe *Legacy*: "artık bakımı yapılmıyor"); son sürüm 7.18.0.1 (18 Ekim 2023). NuGet, aynı yayıncının `CMS365.MetaSharp` paketini öneriyor: Facebook ve Instagram Graph API sarmalayıcısı, son sürüm 9.0.1 (16 Haziran 2025); topluluk paketi, hedeflediği Graph sürümü doğrulanmadı. [3. TARAF: NuGet kaydı, 6 Kasım 2026]
  - WhatsApp için ayrı topluluk paketleri var (ilgili WhatsApp sayfasına bak).
  - Marketing API'ye özel .NET paketleri ve `HttpClient` örneği için aşağıdaki Marketing API bölümüne bak.
- **Diğer topluluk**: Python `facebook-sdk` (eski), `requests` ile doğrudan; Node.js `fb` paketleri. Çoğu eski sürüm hedefler; sürüm numarasını URL'de kendin belirt. [3. TARAF]

## Postman / OpenAPI / koleksiyonlar

- **Meta'nın resmî Postman sayfası**: [postman.com/meta](https://www.postman.com/meta) — Meta'nın public workspace'leri burada. [RESMÎ]
  - **WhatsApp Business Platform** workspace → **WhatsApp Cloud API** koleksiyonu + ortam (environment) dosyası; Get Started klasörü (WABA aboneliği, telefon numarası ID'si, kayıt), Flows klasörü (ayrı Flows koleksiyonu "[MOVED]" olarak taşındı). [RESMÎ]
  - Eski On-Premises API koleksiyonu artık geçersiz: On-Premises API'nin son istemci sürümü 23 Ekim 2025'te sona erdi; yalnızca Cloud API kullanılır. [RESMÎ]
  - Graph API / Pages API için resmî, güncel bir Postman koleksiyonu bulunamadı: `meta` hesabındaki doğrulanmış **Facebook API** koleksiyonu 24 Şubat 2023'ten beri güncellenmemiş (Postman arama kaydı, 6 Kasım 2026); aramada çıkan başka "Meta" workspace'leri kişisel kopyalar. Resmî olanı `postman.com/meta` adresinden doğrula. [ÇELİŞKİLİ]
  - **Marketing API** için `meta` hesabında doğrulanmış **Facebook Marketing API** çalışma alanı var; ayrıntı aşağıdaki Marketing API bölümünde. [RESMÎ]
- **Graph API Explorer**: Postman yerine Meta'nın kendi tarayıcı aracı; token üretip çağrı denemek için en hızlı yol. [RESMÎ]
- **OpenAPI**: Graph API için Meta'nın yayımladığı resmî bir OpenAPI/Swagger tanımı belgede yok. [RESMÎ — belgede yok]

## Marketing API (reklam yönetimi)

> Bu bölüm 6 Kasım 2026'da Marketing API belgelerinden ve Meta geliştirici blogundan doğrulandı. Marketing API **reklam vermek** (kendi ürününü tanıtmak) ve izin verilen reklam hesaplarını yönetmek içindir; başkalarının organik içeriğini okumaz. Başkasının reklamlarını görmek için ayrı ürün olan Ad Library API (`/ads_archive`) kullanılır.

### Yapı ve ön koşullar

- Marketing API; Facebook, Instagram, Messenger ve WhatsApp'taki reklamların oluşturulmasını, yönetimini ve performans analizini otomatikleştirir. [RESMÎ]
- Nesne hiyerarşisi [RESMÎ]:
  - **Reklam hesabı** (`act_{ad-account-id}`): kampanyalar burada durur; her hesabın tekrar kullanılabilen bir kreatif kütüphanesi vardır.
  - **Kampanya**: en üst düzey yapı; tek bir hedefi (objective) temsil eder, eklenen reklamlar bu hedefe göre doğrulanır.
  - **Reklam seti** (ad set): bütçe, yayın süresi, faturalama, teklif ve hedef kitle burada ayarlanır.
  - **Reklam** (ad): reklamı göstermek için gereken her şeyi kreatifiyle birlikte taşır.
  - **Reklam kreatifi** (ad creative): yalnız görsel öğeler; oluşturulduktan sonra **değiştirilemez**.
- Ön koşullar [RESMÎ]: aktif bir reklam hesabı (kampanya ve faturalama için), Meta geliştirici hesabı ve App Dashboard'da bir uygulama. Uygulama oluşturulurken Marketing API kullanım senaryolarından biri seçilir: *Create & manage ads*, *Measure ad performance data*, *Capture & manage ad leads*. Üçü de `ads_management`, `ads_read`, `business_management`, `pages_read_engagement`, `pages_show_list`, `public_profile` izinlerini ve Marketing API Access Tier özelliğini içerir.
- İşletme portföyü: uygulamaya doğrulanmamış bir portföy bağlanabilir; belge, reklam yayınlamadan önce doğrulanması gerektiğini söylüyor ("must be verified before you can run ads"). [RESMÎ]
- **Sandbox reklam hesabı** (Quickstart → Create an Ad Campaign → Create Sandbox Ad Account): ödeme yöntemi istemez, oluşturulan reklamlar yayınlanmaz, sahte performans verisiyle rapor alınır (kullanım senaryoları sayfası). Authorization sayfasına göre ise erişim seviyesi ne olursa olsun çağrılar **canlı (production) veriye** gider ("Calls on ANY access level are against production data"); sahte veri yalnız sandbox reklam hesabındadır. [RESMÎ]

### Erişim: birbirinden bağımsız iki eksen

1. **İzin seviyesi (Standard / Advanced Access)**: kimden izin isteyebileceğini belirler (yukarıdaki genel kural). [RESMÎ]
   - Uygulama yalnız **kendi** reklam hesabını yönetiyorsa `ads_read` ve `ads_management` için **Standard Access yeterlidir**; App Review gerekmez. Standard Access'te izin yalnız uygulamada rolü olan kişilerden (admin, developer, tester) istenebildiği için ya kendini uygulamaya rol olarak eklersin ya da aynı işletme portföyünün sistem kullanıcısını kullanırsın.
   - **Başkalarının** reklam hesaplarını yönetiyorsa (ajans, SaaS) bu izinler için **Advanced Access** gerekir; her izin ayrı App Review'dan geçer. Başka işletmelere ait veriye erişmek için Business Verification şartı sürüyor; 9 Ekim 2026 duyurusuyla Tech Provider akışındaki ek *Access Verification* adımı kaldırıldı, gelişmiş izinlerin App Review standartları değişmedi. [RESMÎ — Meta blog]
2. **Marketing API Access Tier (Limited / Full)**: hız sınırını, sistem kullanıcısı kotasını ve Business Manager erişimini belirler. [RESMÎ]
   - **4 Mayıs 2026 değişikliği** [RESMÎ — Meta blog]: özelliğin eski adı *Ads Management Standard Access* idi, adı **Marketing API Access Tier** oldu. Alt katman "Standard Access" → **Limited Access**, üst katman "Advanced Access" → **Full Access**. Kod değişikliği gerekmez, izin tanımlayıcısı aynı kaldı; Advanced Access'i olan uygulamalar kendiliğinden Full Access görünür.
   - **Full Access şartları** [RESMÎ]: son **15 günde en az 500 başarılı** Marketing API çağrısı (eski eşik 1.500) **ve son 500 çağrıda hata oranının %15'in altında** olması (eskiden sabit bir dönemde ölçülürdü; artık kayan pencere). Başvuru: App Dashboard'da Marketing API Access Tier özelliğinin **+Upgrade** düğmesi (Authorization sayfası); mevcut seviye App Review → Permissions and Features altında görünür. Ekran kaydı artık istenmiyor; şartlar ve ilerleme başvuru düzenleme ekranındaki *allowed usage* sayfasında gösteriliyor (blog).
   - Belgelerde eski ve yeni adlar karışık: kullanım senaryosu sayfası hâlâ "Ads Management Standard Access", hız sınırı sayfası "Development tier" / `development_access` diyor; ikisi de Limited demek. [ÇELİŞKİLİ — adlandırma]

| | Limited (varsayılan) | Full (App Review sonrası) |
|---|---|---|
| Hız sınırı | Reklam hesabı başına ağır sınırlı; belgeye göre "yalnız geliştirme için, canlı reklamverenlerle çalışan üretim uygulamaları için değil" | Reklam hesabı başına hafif sınırlı |
| Reklam hesabı sayısı | Sınırsız (yönetici ya da reklamveren adına çağrı) | Sınırsız (hesaptan `ads_read` / `ads_management` izni alınmışsa) |
| Business Manager ve Catalog API | Kısıtlı; reklam hesabı, kullanıcı izni ve Sayfa yönetimi yok | Tamamı |
| Sistem kullanıcısı | 1 sistem kullanıcısı + 1 admin sistem kullanıcısı | 10 sistem kullanıcısı + 1 admin sistem kullanıcısı |
| API ile Sayfa oluşturma | Yok | Yok |

Kaynak: Marketing API Authorization sayfası. [RESMÎ]

**Durum → gereken** (dayanaklar [RESMÎ]; seçim önerisi [TAHMİN]):

| Durum | Gereken |
|---|---|
| Yalnız kendi reklam hesabın, az çağrı (ör. kendi uygulamanı tanıtan kampanyayı ara sıra güncelleyen ve rapor çeken bir araç) | Standard Access `ads_management` + `ads_read`, Limited katman; App Review yok. Limited'in saatlik kotası küçük ve resmen "geliştirme için" tanımlı; düzenli üretim kullanımında Full'a geçiş planlanır |
| Kendi hesabın, yoğun otomasyon (çok sayıda reklam, sık bütçe değişikliği, büyük raporlar) | Full Access (500 çağrı ve %15 hata şartı sağlanınca +Upgrade) |
| Başka işletmelerin reklam hesapları (ajans, SaaS, Tech Provider) | Advanced Access `ads_management` / `ads_read` (App Review) + Business Verification + Full Access |
| Başkasının hesabında yalnız rapor ya da pano | Advanced Access `ads_read`; `ads_management` istenmez |
| Lead formlarını CRM'e aktarmak | `leads_retrieval` (ve bağımlılıkları) + Page webhook'u `leadgen` |

### İzinler

| İzin | Ne verir | Bağımlılık |
|---|---|---|
| `ads_management` | Uygulamanın sahip olduğu ya da erişim verilen reklam hesabını okuma ve yönetme: kampanya oluşturma, reklam yönetme, metrik çekme | `pages_read_engagement`, `pages_show_list` |
| `ads_read` | Ads Insights API ile reklam raporu (özel pano ve analiz için) | — |
| `business_management` | Business Manager API ile okuma/yazma: reklam hesabı gibi işletme varlıklarını yönetme, reklam hesabı sahiplenme | `pages_read_engagement`, `pages_show_list` |
| `leads_retrieval` | Bir reklama bağlı lead formuna girilen bilgileri okuma | Marketing API Access Tier, `ads_management`, `ads_read`, `business_management`, `pages_manage_ads`, `pages_read_engagement`, `pages_show_list` |

Kaynak: Permissions Reference. [RESMÎ]

### Kimlik doğrulama ve token

- **Kendi hesabın, sunucu otomasyonu → sistem kullanıcısı token'ı** [RESMÎ]: Sistem kullanıcısı, işletme portföyündeki varlıklara çağrı yapan bir sunucuyu ya da yazılımı temsil eder. En kolay yol Business Manager arayüzüdür (Business Settings → Users → System users); reklam hesabı bu kullanıcıya atanır.
  - Admin sistem kullanıcısı başka sistem kullanıcıları, reklam hesapları ve izinler oluşturabilir; Meta asıl çağrılar için normal sistem kullanıcısını öneriyor.
  - Uygulamayı kurma: `POST /{system-user-id}/applications` (`business_app={app-id}`); yalnız Marketing API Access Tier'ı olan uygulamalar kurulabilir.
  - Token üretme: `POST /{system-user-id}/access_tokens` — `business_app`, `scope` (ör. `ads_management,pages_read_engagement,pages_show_list`), `appsecret_proof` (zorunlu) ve isteğe bağlı `set_token_expires_in_60_days=true`. Token **süresiz** ya da **60 gün** geçerli olabilir; Meta süreli token'ı güvenlik için öneriyor, süreli token zorunlu tutulan işletmelerde bu parametre verilmezse hata dönüyor. Eski `/ads_access_token` uç noktası çalışmıyor.
- **Başkasının reklam hesabı → kullanıcı OAuth'u** [RESMÎ]: hesap sahibine `dialog/oauth` diyaloğu `scope=ads_management` ya da `scope=ads_read` ile açılır; "Allow" deyince uygulama erişir. Bir kişi adına yapılan işlemlerde Meta standart OAuth akışını öneriyor; sistem kullanıcısı token'ı işlemi gerçek bir kişiye bağlamaz.
- Token türleri, uzun ömürlü token değişimi ve `appsecret_proof` için yukarıdaki Kimlik doğrulama bölümüne bak.

### Temel uç noktalar (Marketing API)

Taban adres: `https://graph.facebook.com/v27.0/`. Versioning sayfasına göre Marketing API'ye sürümsüz çağrı geçersizdir; v26.0 changelog'u ise bazı değişikliklerde "sürümsüz çağrılar"dan söz ediyor [ÇELİŞKİLİ]. Sürümü her zaman URL'ye yaz.

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| POST | `/act_{ad-account-id}/campaigns` | Kampanya oluşturur | `ads_management` | Zorunlu: `name`, `objective`, `status`, `special_ad_categories` (`NONE`, `EMPLOYMENT`, `HOUSING`, `CREDIT`, `ISSUES_ELECTIONS_POLITICS`, `ONLINE_GAMBLING_AND_GAMING`, `FINANCIAL_PRODUCTS_SERVICES`). Hedef örnekleri: `OUTCOME_TRAFFIC`, `OUTCOME_SALES`, `OUTCOME_LEADS`, `OUTCOME_APP_PROMOTION` (eski hedef adları da listede). Kurulumda `status=PAUSED`; yeniden denemede çift kayıt olmasın diye `X-Client-Idempotent-Key` başlığı [RESMÎ] |
| POST | `/act_{ad-account-id}/adsets` | Reklam seti: bütçe, takvim, teklif, hedef kitle | `ads_management` | Bütçe (`daily_budget` / `lifetime_budget`) reklam seti başına saatte en çok 4 kez değişir [RESMÎ] |
| POST | `/act_{ad-account-id}/adcreatives` | Kreatif: `name`, `object_story_spec` (örnekte `page_id` ve `link_data`) | `ads_management` | Kreatif sonradan değiştirilemez [RESMÎ] |
| POST | `/act_{ad-account-id}/ads` | Reklam: `adset_id`, `creative`, `status` (`ACTIVE` / `PAUSED`) | `ads_management` | Oluşturma sınırı hesabın günlük harcama limitine bağlı [RESMÎ] |
| GET | `/{nesne-id}/insights` | Reklam hesabı, kampanya, reklam seti ya da reklamın performans metrikleri | `ads_read` | Varsayılan son 30 gün; büyük raporlarda asenkron istek önerilir [RESMÎ] |
| POST | `/{pixel-id}/events` | Conversions API: sunucudan dönüşüm olayı | Events Manager ya da sistem kullanıcısı token'ı | İstek başına en çok 1.000 olay; aşağıya bak [RESMÎ] |

Tam liste: [Marketing API belgeleri](https://developers.facebook.com/docs/marketing-api/) ve [Ad Account Campaigns referansı](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns).

**.NET örneği (`HttpClient`)**: kendi reklam hesabının son 7 günlük harcama, gösterim ve tıklama özetini sistem kullanıcısı token'ıyla çeker. Örnek çalıştırılarak denenmedi [TAHMİN]; `<REKLAM_HESABI_ID>` yer tutucudur, token ve App Secret ortam değişkenlerinden okunur.

```csharp
using System.Security.Cryptography;
using System.Text;

var token = Environment.GetEnvironmentVariable("META_TOKEN")!;
var secret = Environment.GetEnvironmentVariable("META_APP_SECRET")!;
var proof = Convert.ToHexString(
    HMACSHA256.HashData(Encoding.UTF8.GetBytes(secret), Encoding.UTF8.GetBytes(token))).ToLowerInvariant();

using var http = new HttpClient { BaseAddress = new Uri("https://graph.facebook.com/v27.0/") };
http.DefaultRequestHeaders.Authorization = new("Bearer", token);
var json = await http.GetStringAsync(
    $"act_<REKLAM_HESABI_ID>/insights?fields=spend,impressions,clicks&date_preset=last_7d&appsecret_proof={proof}");
Console.WriteLine(json);
```

### Gerçek zamanlı / bildirim (Marketing API)

- **Ad Account webhook'ları** [RESMÎ]: App Dashboard → Webhooks → *Ad Account* nesnesi. Alanlar: `with_issues_ad_objects` (sorunlu duruma düşen kampanya, reklam seti ya da reklam), `in_process_ad_objects` (işlenme durumundan çıkan nesne), `ads_async_creation_request` (asenkron oluşturma sonucu), `creative_fatigue` (kreatif yorgunluğu), `ad_recommendations` (öneriler), `product_set_issue` (ürün seti sorunları). Doğrulama, imza ve yeniden deneme kuralları yukarıdaki genel webhook bölümündeki gibidir. Referans sayfası gereken izni ayrıca yazmıyor. [RESMÎ — izin belgede yok]
- **Lead'ler**: Page webhook'u `leadgen` + `leads_retrieval` izni. [RESMÎ]
- **Harcama ve performans** için webhook alanı yok; metrikler Insights ile **yoklanır**. [TAHMİN — Ad Account alan listesinde harcama yok]

### Neler mümkün (Marketing API)

| İş | Mümkün mü | Nasıl | Seviye | Not |
|---|---|---|---|---|
| Kendi reklam hesabında kampanya, reklam seti, reklam açma, durdurma, bütçe değiştirme | Evet | `campaigns`, `adsets`, `adcreatives`, `ads` uç noktaları | Standard `ads_management`; Limited (az çağrı) ya da Full | Bütçe reklam seti başına saatte 4, harcama limiti hesap başına günde 10 değişiklik [RESMÎ] |
| Kendi reklamlarının harcama, gösterim, tıklama raporu | Evet, yoklama | `/{nesne-id}/insights`; büyük raporda asenkron istek | `ads_read` | Push yok; zamanlayıcıyla çekilir [TAHMİN] |
| Reklamın sorunlu duruma düşmesi ya da işlenmesinin bitmesi | Evet, push | Ad Account webhook'u `with_issues_ad_objects`, `in_process_ad_objects` | Kendi hesabın | "Reklamım takıldı" bildirimi için kullanılabilir [TAHMİN] |
| Lead formu başvuruları | Evet, push | Page webhook'u `leadgen` + `leads_retrieval` | Kendi Sayfan; başkası için Advanced Access | [RESMÎ] |
| Başka işletmelerin reklam hesaplarını yönetmek (ajans, SaaS) | Evet, onayla | Kullanıcı OAuth'u + Advanced Access | App Review + Business Verification + Full | [RESMÎ] |
| Sitedeki ya da sunucudaki dönüşümü (kayıt, indirme, satın alma) reklama bağlamak | Evet | Conversions API `/{pixel-id}/events` (+ Pixel; `event_id` ile tekilleştirme) | Events Manager token'ı; App Review yok | [RESMÎ] |
| Masaüstü (Windows) uygulamasını tanıtmak | Dolaylı | İndirme sayfasına `OUTCOME_TRAFFIC` ya da `OUTCOME_SALES` / `OUTCOME_LEADS` kampanyası + Conversions API ile indirme/kayıt olayı | Kendi hesabın | Meta'nın "desktop app ads" türü Facebook Canvas uygulamaları içindir (`device_platforms=desktop`) [RESMÎ]; bağımsız Windows uygulaması için web hedefli kampanya önerisi [TAHMİN] |
| Eski Advantage+ Shopping / App kampanyası (ASC/AAC) oluşturmak ya da güncellemek | Hayır | Yeni Advantage+ kampanya yapısı kullanılır | — | 19 Mayıs 2026'dan beri tüm sürümlerde [RESMÎ] |
| Rakibin ya da başkasının reklamlarını görmek | Kısmen | Marketing API değil, Ad Library API `/ads_archive` | Kimlik ve konum onayı (yukarıdaki tablo) | AB dışında yalnız siyasi/sosyal konulu reklamlar [3. TARAF] |
| Başkasının organik gönderisini ya da yorumunu izlemek | Hayır | Marketing API kapsamında değil; PPCA'ya bak | — | |

### Hız sınırları (Marketing API)

Marketing API Rate Limiting sayfasına göre Marketing API kendi hız sınırı mantığını kullanır ve Graph API hız sınırlarının hiçbirine tabi değildir (Graph API Rate Limits sayfası aynı kotayı BUC olarak sınıflandırır; yukarıdaki genel Hız sınırları bölümüne bak). **BUC kotası** reklam hesabı başına, **1 saatlik** pencerede hesaplanır [RESMÎ]:

| Tür | Full Access | Limited |
|---|---|---|
| `ads_management` | 100.000 + 40 × aktif reklam | 300 + 40 × aktif reklam |
| `ads_insights` | 190.000 + 400 × aktif reklam − 0,001 × kullanıcı hatası | 600 + 400 × aktif reklam − 0,001 × kullanıcı hatası |
| `custom_audience` | 190.000 + 40 × aktif özel kitle (en çok 700.000) | 5.000 + 40 × aktif özel kitle (en çok 700.000) |

Katalog için Catalog Management 20.000 + 20.000 × log2(tekil kullanıcı), Catalog Batch 200 + 200 × log2(tekil kullanıcı); belgede katman ayrımı yok. Reklam hesabının CPU ve toplam süre kullanımı da kotayı etkiler. [RESMÎ]

- **Reklam hesabı puan sistemi** [RESMÎ]: okuma çağrısı 1, yazma çağrısı 3 puan. Limited'de en çok 60 puan (300 sn'de söner; aşılınca 300 sn blok), Full'da en çok 9.000 puan (300 sn'de söner; aşılınca 60 sn blok).
- **QPS ve eşzamanlı düzenleme** [RESMÎ]: kampanya, reklam seti ve reklam oluşturma/düzenlemede uygulama + reklam hesabı başına saniyede 100 istek; aynı nesneye varsayılan olarak 30 saniyede bir düzenleme.
- **Harcama ve bütçe** [RESMÎ]: hesap harcama limiti (`spend_cap`, `spend_cap_action`) günde en çok 10 kez; reklam seti bütçesi saatte en çok 4 kez (aşılırsa o reklam setinin bütçesi 1 saat değiştirilemez); reklam oluşturma sınırı hesabın günlük harcama limitine bağlı.
- **İzleme başlıkları** [RESMÎ]: `X-Ad-Account-Usage` (`acc_id_util_pct`, `reset_time_duration`, `ads_api_access_tier`), `X-FB-Ads-Insights-Throttle` (`app_id_util_pct`, `acc_id_util_pct`, `ads_api_access_tier`) ve BUC başlığı (`call_count`, `total_cputime`, `total_time`, `estimated_time_to_regain_access`). BUC başlığının adı Marketing API sayfasında `X-Business-Use-Case`, Graph API sayfasında `X-Business-Use-Case-Usage` [ÇELİŞKİLİ — yazım farkı].
- **Hata kodları** [RESMÎ]: `17`/`2446079` ve `613`/`1487742` reklam hesabı API limiti; `80000`, `80003`, `80004`, `80014` BUC limiti; `613`/`5044001` 100 QPS; `613`/`4841018` eşzamanlı düzenleme; `613`/`1487632` bütçe saatte 4; `17`/`1885172` harcama limiti günde 10; `4`/`1504022`, `1504039` Insights platform limiti; `4` uygulama limiti. 613 birden çok sınır için kullanıldığından alt kod (subcode) kontrol edilir.
- **Öneriler** [RESMÎ]: istekleri zamana yay; küçük istekleri "IDs batch" ya da asenkron istekle birleştir, aynı türden çok nesne için ID listesi gönder; Insights gibi asenkron isteği destekleyen uç noktalarda büyük veriyi asenkron sorgula; üstel geri çekilme (exponential backoff) uygula ve başlıklardaki sıfırlanma süresine bak; eşzamanlı düzenleme hatasında en az 30 sn arayla, artan gecikmeyle yeniden dene.
  - Bu sayfanın "IDs batch" önerisi sürüm değişiklikleriyle güncellenmemiş görünüyor: kök `GET /?ids=` okuması 27 Ekim 2026'dan beri tüm Graph sürümlerinde hata veriyor (v26.0 changelog), v27.0 duyurusuna göre de 4 Kasım 2026'dan beri yeni uygulamalar multi-ID isteklerini ve asenkron toplu istekleri (asynchronous batch requests) kullanamıyor. [ÇELİŞKİLİ] Insights'ın asenkron rapor işi bu kısıt listesinde geçmiyor. Yeni bir uygulamada toplu okuma için kenar sorgusu ve filtre (ör. `/act_{id}/ads?filtering=...`) ya da Insights asenkron raporu tercih edilir. [TAHMİN]
- **Fiyat**: API çağrısı için ücret belgede geçmiyor; ödenen reklam harcamasıdır. [RESMÎ — belgede API ücreti yok]

### Sürümler (Marketing API)

- Güncel sürüm **v27.0** (4 Kasım 2026). Önceki: v26.0 (29 Temmuz 2026) ve v25.0 (18 Şubat 2026), ikisinin de bitiş tarihi belirlenmedi; v24.0, 6 Ekim 2026'da kapandı. [RESMÎ] Versioning sayfası güncel sürümü v27.0 olarak veriyor; changelog tablosu henüz v26.0'da, sürümler sayfasının Marketing API tablosu ise v25.0'da kalmış [ÇELİŞKİLİ — sayfalar güncellenmemiş].
- Takvim Graph API'den **ayrıdır**: yeni sürüm çıkınca önceki sürüm **en az 90 gün** desteklenir, sonra çalışmaz (Graph API'de her sürüm en az 2 yıl). [RESMÎ]
- **Otomatik sürüm yükseltme** (Mayıs 2024'ten beri) [RESMÎ]: kapanan sürüme yapılan çağrı, uç nokta yeni sürümde değişmemişse bir sonraki sürüme yükseltilir; değişen uç noktalarda (ör. `POST /{adset-id}`) istek doğrudan hata verir. Yükseltilen yanıtta `X-Ad-Api-Version-Warning` başlığı döner; uygulama ayarlarındaki **Marketing API Version** seçeneğiyle kapatılabilir. Meta yine de elle yükseltmeyi öneriyor.
- Otomasyon kodunu etkileyebilecek son değişiklikler [RESMÎ]:
  - **v27.0** (4 Kasım 2026): `/{catalog-id}/batch` kullanımdan kalktı, yerine `/{catalog-id}/items_batch` (v27.0+); `lookalike_spec` içinde `country` ve `location_spec` reddediliyor (v27.0+; diğer sürümlerde yaklaşık 90 gün sonra, tarih kesinleşmedi).
  - **v26.0** (29 Temmuz 2026): Instagram Explore yerleşimi kalktı. Anket (poll) kreatifleri, Messenger Stories yerleşimi, `applink_treatment=web_only` kreatiflerin Web+App kampanyalarına eklenmesi ve Delivery Estimate alanları (`daily_outcomes_curve`, `budget_guardrail`, `estimate_dau`) changelog takvimine göre 27 Ekim 2026'dan beri tüm sürümlerde geçersiz. Konut, istihdam ve finans (HEC-F) kategorisindeki, gevşetilebilir hedeflemeli ve geniş olmayan kurulumlu reklam setlerinde v26.0+'da `targeting_automation.advantage_audience` açıkça verilmeli (verilmezse `ADS_TARGETING__REQUIRE_EXPLICIT_ADVANTAGE_AUDIENCE_FLAG` hatası); tüm sürümlerde zorunluluk v25.0 kapanınca başlayacak, tarih belirlenmedi.
  - **v25.0**: eski Advantage+ Shopping (ASC) ve Advantage+ App (AAC) kampanyaları oluşturulamıyor, kopyalanamıyor, güncellenemiyor; 19 Mayıs 2026'dan beri tüm sürümlerde. Yerine yeni Advantage+ kampanya yapısı kullanılır.

### Conversions API (kısaca)

- Reklamverenin pazarlama verisini (web, uygulama, işletme mesajlaşması ve çevrim dışı olaylar) sunucudan Meta'ya bağlar; Pixel'in tarayıcı olaylarını tamamlar. [RESMÎ]
- Gereken: Pixel ID (web olaylarında tarayıcıdaki Pixel ile aynı ID), Meta Business Suite'te bir işletme ve erişim token'ı. Token iki yoldan alınır: **Events Manager** → Pixel → Settings → Conversions API → *Generate access token* (önerilen; App Review ve izin gerekmez; bağlantıyı yalnız işletmede geliştirici yetkisi olanlar görür) ya da kendi uygulamanla **sistem kullanıcısı** token'ı (bu yol da App Review istemez). [RESMÎ]
- Çağrı `POST https://graph.facebook.com/{API_VERSION}/{PIXEL_ID}/events`: istek başına **en çok 1.000 olay**; `event_time` en çok **7 gün** geriye gidebilir (daha eski tek bir olay bütün isteği reddettirir); olaylar mümkünse gerçekleştikten sonraki 1 saat içinde gönderilir, çevrim dışı ve mağaza olayları 62 gün içinde. Aynı `event_id` ve `event_name` ile gelen kopyalardan yalnız ilki tutulur; böylece Pixel ile tekilleştirme yapılır ve yeniden deneme güvenli olur. `test_event_code` yalnız testte kullanılır. Belgeye göre Conversions API'nin ayrı bir hız sınırı yoktur; tek sınır istek başına 1.000 olaydır. [RESMÎ]
- Business SDK v26, açık kaynak Conversions API Parameter Builder'ı içeriyor: `fbc`, `fbp`, `event_source_url`, `referrer_url`, `client_ip_address` alanlarını üretir, desteklenen dillerde kişisel veriyi normalleştirip hash'ler. [RESMÎ]
- Masaüstü uygulama senaryosunda indirme ya da kayıt olayını uygulamanın kendi sunucusu gönderir; e-posta, telefon gibi kişisel veriler yalnız hash'lenmiş olarak ve aydınlatma/rıza (KVKK, GDPR) sağlanmışsa gönderilmelidir. [TAHMİN — hukuki görüş değildir]

### SDK ve kütüphaneler (Marketing API)

| Ad | Dil | Tür | Not |
|---|---|---|---|
| Meta Business SDK | Java, Node.js, PHP, Python, Ruby | **Resmî** | Marketing API ve Conversions API; .NET/C# **yok** [RESMÎ]. Depolar `github.com/meta/` altına taşındı (eski `github.com/facebook/` adresleri yönlendiriyor). Sürümler API'yi izliyor: Python `facebook-business` 26.0.4 (5 Kasım 2026), npm `facebook-nodejs-business-sdk` 26.0.3 (4 Kasım 2026); v27 SDK'sı 6 Kasım 2026'da henüz yayımlanmamış [3. TARAF: PyPI, npm ve GitHub kayıtları] |
| `meta/facebook-business-sdk-codegen` | JSON tanımlar | **Resmî** | SDK'ların üretildiği depo; `api_specs/specs/` altında nesne ve uç nokta tanımları (OpenAPI biçiminde değil). .NET için kendi istemcini üretmekte kaynak olarak kullanılabilir [RESMÎ: depo; .NET kullanımı TAHMİN] |
| `HttpClient` + `System.Text.Json` | C# | Yöntem | .NET'te en sağlam yol: düz REST/JSON, sürüm URL'de, `appsecret_proof` ile (yukarıdaki örnek) [TAHMİN] |
| `Facebook.ApiClient` (NuGet 2.0.2, 6 Eylül 2018) | C# | Topluluk | "C# SDK for Facebook Marketing API"; 2018'den beri güncellenmemiş, güncel sürümlerle uyumu doğrulanmadı [3. TARAF: NuGet] |
| `Loopie.Facebook.MarketingApi.Client` (NuGet 1.0.0, 27 Mayıs 2020) | C# | Topluluk | Benzer bir Marketing API istemcisi; 2020'den beri güncellenmemiş [3. TARAF: NuGet] |
| `Facebook-Ads-SDK` (NuGet 2.11.0, 29 Kasım 2017) | C# | Topluluk | Graph API v2.x dönemine ait; kullanılmamalı [3. TARAF: NuGet] |
| `CData.FacebookAds` (NuGet 26.0.9770, 16 Ekim 2026) | C# (ADO.NET) | Ticari | Reklam verisine SQL benzeri erişim veren ticari sağlayıcı; güncel ama resmî değil, lisans koşulları doğrulanmadı [3. TARAF: NuGet] |

### Postman ve OpenAPI (Marketing API)

- **Resmî Postman**: Meta'nın doğrulanmış `meta` hesabında **Facebook Marketing API** çalışma alanı ve [Facebook Marketing API (MAPI)](https://www.postman.com/meta/workspace/facebook-marketing-api/collection/31691153-180f34e0-5b80-48ba-a8cc-acffbbe1bf64) koleksiyonu: kampanya, reklam seti ve reklam oluşturma/düzenleme gibi yaygın çağrılar, örnek yanıtlar ve belge bağlantıları. Postman kaydına göre son güncelleme 7 Haziran 2024; eski bir API sürümünü hedefliyor olabilir, sürüm değişkenini kontrol et. [RESMÎ: yayıncı; tarih 3. TARAF: Postman kaydı]
- **OpenAPI**: Marketing API için resmî bir OpenAPI/Swagger tanımı belgede yok; en yakın makinece okunur kaynak yukarıdaki codegen deposundaki JSON tanımlar. [RESMÎ — belgede yok]

## Depoda ilgili sayfalar

- [Masaüstü uygulamada reklam ve ödüllü reklam](../../Rehberler/Masaustu-Uygulama-Reklam/) — Araştırmanın §7 "Uygulamayı tanıtmak için reklam vermek" bölümü Meta Marketing API'yi (Limited/Full erişim katmanı, kendi reklam hesabı için Standard `ads_management`) uygulamayı reklamla tanıtma açısından özetler; güncel ve ayrıntılı API bilgisi bu sayfanın Marketing API bölümündedir. Yapay zekâ için Markdown sürümü: [arastirma.md](../../Rehberler/Masaustu-Uygulama-Reklam/arastirma.md).
- [Mesajlaşma altyapıları rehberi](../../Rehberler/Mesajlasma-Altyapilari/) — WhatsApp, Telegram, BiP, SMS API'lerinin genel kuralları.
- Aynı klasördeki (`API/Sosyal-Medya/`) Instagram, Threads, WhatsApp, Messenger sayfaları — Meta'nın bu ürünleri aynı Graph altyapısını, token ve App Review sistemini kullanır; bu sayfa onların ortak "temel"idir.

## Kaynaklar

Resmî:

- [Graph API Changelog](https://developers.facebook.com/docs/graph-api/changelog) — sürümler ve kapanış tarihleri; tablo 6 Kasım 2026'da henüz v27.0'ı göstermiyor (erişim: 6 Kasım 2026)
- [Graph API v26.0 Changelog](https://developers.facebook.com/docs/graph-api/changelog/version26.0) — v26.0 Graph ve Marketing API değişiklikleri, 27 Ekim 2026 kaldırmaları (erişim: 6 Kasım 2026)
- [Introducing Graph API v26 and Marketing API v26](https://developers.facebook.com/blog/post/2026/07/29/introducing-graph-api-v26-and-marketing-api-v26/) — duyuru yazısı (erişim: 6 Kasım 2026)
- [Introducing Graph API v27.0 and Marketing API v27.0](https://developers.facebook.com/blog/post/2026/11/04/introducing-graph-api-v27-and-marketing-api-v27/) — 4 Kasım 2026 duyurusu: v21.0 ve v22.0 kapanış tarihleri, eski Graph özelliklerinin (multi-ID, method override, field aliases, JSONP, async batch) yeni uygulamalara kapatılması, v27.0 Marketing API değişiklikleri (erişim: 6 Kasım 2026)
- [Graph API ve Marketing API sürümleri](https://developers.facebook.com/docs/graph-api/changelog/versions) — sürüm tabloları; Marketing API tablosu v25.0'da kalmış (erişim: 6 Kasım 2026)
- [Graph API Versioning rehberi](https://developers.facebook.com/docs/graph-api/guides/versioning) — her sürüm için en az 2 yıl garantisi, sürümsüz çağrının App Dashboard'daki Upgrade API Version ayarını kullanması, Marketing API'nin ayrı sürüm şeması (erişim: 6 Kasım 2026)
- [Graph API v19.0 Changelog](https://developers.facebook.com/docs/graph-api/changelog/version19.0/) — Groups API'nin kaldırılması (erişim: 15 Ekim 2026)
- [Rate Limits](https://developers.facebook.com/docs/graph-api/overview/rate-limiting) — Platform ve BUC limitleri, başlıklar, hata kodları, Marketing API isteklerinin BUC kapsamında sayılması (erişim: 6 Kasım 2026)
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
- [Meta Business SDK](https://developers.facebook.com/docs/business-sdk) — resmî SDK dilleri (erişim: 6 Kasım 2026)
- [WhatsApp Postman rehberi](https://developers.facebook.com/docs/whatsapp/guides/postman) — On-Premises sonu, Cloud API'ye yönlendirme (erişim: 15 Ekim 2026)
- [Meta Postman sayfası](https://www.postman.com/meta) ve [WhatsApp Cloud API koleksiyonu](https://www.postman.com/meta/workspace/whatsapp-business-platform/collection/13382743-84d01ff8-4253-4720-b454-af661f36acc2) — resmî koleksiyonlar (erişim: 15 Ekim 2026)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer) ve [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken) — deneme araçları (erişim: 15 Ekim 2026)

Resmî (Marketing API bölümü):

- [Marketing API Overview](https://developers.facebook.com/docs/marketing-api/overview) — nesne hiyerarşisi (erişim: 6 Kasım 2026)
- [Marketing API — Authorization](https://developers.facebook.com/docs/marketing-api/get-started/authorization) — izin seviyeleri, Limited/Full katmanı, sistem kullanıcısı kotaları (erişim: 6 Kasım 2026)
- [Updates to Ads Management Standard Access feature](https://developers.meta.com/blog/updates-to-ads-management-standard-access-feature/) — 4 Mayıs 2026 ad değişikliği, 500 çağrı ve %15 hata şartı (erişim: 6 Kasım 2026)
- [Marketing API — Rate Limiting](https://developers.facebook.com/docs/marketing-api/overview/rate-limiting) — BUC formülleri, puan sistemi, başlıklar, hata kodları (erişim: 6 Kasım 2026)
- [Marketing API — Versioning](https://developers.facebook.com/docs/marketing-api/overview/versioning) — 90 günlük destek, otomatik sürüm yükseltme (erişim: 6 Kasım 2026)
- [Graph API v25.0 Changelog](https://developers.facebook.com/docs/graph-api/changelog/version25.0) — ASC/AAC kısıtı, 19 Mayıs 2026 (erişim: 6 Kasım 2026)
- [Marketing API use cases](https://developers.facebook.com/documentation/development/create-an-app/marketing-api-use-cases) — kullanım senaryoları, varsayılan izinler, sandbox reklam hesabı (erişim: 6 Kasım 2026)
- [Permissions Reference](https://developers.facebook.com/docs/permissions) — `ads_management`, `ads_read`, `business_management`, `leads_retrieval` (erişim: 6 Kasım 2026)
- [System Users — Overview](https://developers.facebook.com/docs/marketing-api/system-users/overview) ve [Install Apps and Generate Tokens](https://developers.facebook.com/docs/marketing-api/system-users/install-apps-and-generate-tokens) — sistem kullanıcısı türleri, token üretimi, süresiz ya da 60 günlük token (erişim: 6 Kasım 2026)
- [Create an Ad Campaign](https://developers.facebook.com/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-campaign) · [Create an Ad Creative](https://developers.facebook.com/docs/marketing-api/get-started/basic-ad-creation/create-an-ad-creative) · [Create an Ad](https://developers.facebook.com/docs/marketing-api/get-started/basic-ad-creation/create-an-ad) — v27.0 uç noktaları ve zorunlu alanlar (erişim: 6 Kasım 2026)
- [Ad Account Campaigns reference](https://developers.facebook.com/docs/marketing-api/reference/ad-account/campaigns) — `special_ad_categories`, hedef değerleri (erişim: 6 Kasım 2026)
- [Insights API](https://developers.facebook.com/docs/marketing-api/insights) — `/insights` kenarları, `ads_read` (erişim: 6 Kasım 2026)
- [Webhooks — Ad Account reference](https://developers.facebook.com/docs/graph-api/webhooks/reference/ad-account) — reklam hesabı webhook alanları (erişim: 6 Kasım 2026)
- [Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api) · [Get Started](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started) · [Using the API](https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api) — token yolları, 1.000 olay sınırı, 7 gün kuralı, tekilleştirme (erişim: 6 Kasım 2026)
- [Mobile App Ads](https://developers.facebook.com/docs/marketing-api/mobile-app-ads) — mobil ve masaüstü (Canvas) uygulama reklamları (erişim: 6 Kasım 2026)
- [Retiring Access Verification for Tech Provider Apps](https://developers.facebook.com/blog/post/2026/10/09/retiring-access-verification-for-tech-provider-apps/) — Tech Provider akışı, Business Verification şartının sürmesi (erişim: 6 Kasım 2026)
- [Facebook Marketing API (MAPI) Postman koleksiyonu](https://www.postman.com/meta/workspace/facebook-marketing-api/collection/31691153-180f34e0-5b80-48ba-a8cc-acffbbe1bf64) — Meta'nın resmî koleksiyonu (erişim: 6 Kasım 2026)
- [meta/facebook-business-sdk-codegen](https://github.com/meta/facebook-business-sdk-codegen) — SDK üretim deposu, JSON API tanımları (erişim: 6 Kasım 2026)

Üçüncü taraf:

- [Meta To Sunset Content-Monitoring Tool (MediaPost)](https://www.mediapost.com/publications/article/394446/meta-to-sunset-content-monitoring-tool-restrict-a.html) — CrowdTangle'ın kapanışı (erişim: 15 Ekim 2026)
- [A First Look at Meta's Content Library (Social Media Lab)](https://socialmedialab.ca/?p=22554) — Content Library erişim koşulları (erişim: 15 Ekim 2026)
- [Meta removes Facebook Groups API (Techpoint Africa)](https://techpoint.africa/2024/02/06/meta-facebook-disrupts-scheduling) — Groups API kaldırılmasının etkisi (erişim: 15 Ekim 2026)
- [CMS365.FacebookSharp (NuGet)](https://www.nuget.org/packages/CMS365.FacebookSharp) — topluluk .NET paketi; kullanımdan kaldırılmış, yerine `CMS365.MetaSharp` öneriliyor (erişim: 6 Kasım 2026)
- [CMS365.MetaSharp (NuGet)](https://www.nuget.org/packages/CMS365.MetaSharp) — aynı yayıncının Facebook/Instagram Graph API topluluk paketi; son sürüm 9.0.1, 16 Haziran 2025 (erişim: 6 Kasım 2026)
- [Facebook C# SDK (NuGet)](https://www.nuget.org/packages/Facebook) — eski topluluk .NET SDK'sı; son kararlı sürüm 7.0.6, 13 Nisan 2015 (erişim: 6 Kasım 2026)
- [facebook-business (PyPI)](https://pypi.org/project/facebook-business/) ve [facebook-nodejs-business-sdk (npm)](https://www.npmjs.com/package/facebook-nodejs-business-sdk) — resmî SDK'ların paket kayıtları ve sürüm tarihleri (erişim: 6 Kasım 2026)
- NuGet: [Facebook.ApiClient](https://www.nuget.org/packages/Facebook.ApiClient) · [Loopie.Facebook.MarketingApi.Client](https://www.nuget.org/packages/Loopie.Facebook.MarketingApi.Client) · [Facebook-Ads-SDK](https://www.nuget.org/packages/Facebook-Ads-SDK) · [CData.FacebookAds](https://www.nuget.org/packages/CData.FacebookAds) — Marketing API için topluluk ve ticari .NET paketleri (erişim: 6 Kasım 2026)
