# Google Ad Manager API

> Yazılma tarihi: 6 Kasım 2026 · Son doğrulama: 6 Kasım 2026 · Durum: **aktif** (yeni REST "Ad Manager API" hâlâ **Beta**; SOAP API "legacy" ama sürüm takvimiyle destekleniyor; yalnızca erişim verilen **kendi ağın** için)

## Özet

Google Ad Manager, yayıncının (web sitesi, mobil uygulama, video) reklam envanterini yönettiği reklam sunucusudur. Doğrudan satılan kampanyalar (sipariş ve satır öğesi), AdSense/Ad Exchange açık artırması ve ev (house) reklamları tek bir öncelik sisteminde yarışır [RESMÎ]. Google ürünü "an ad management platform for large publishers who have significant direct sales" diye tanımlar [RESMÎ]. Programatik erişim için iki API vardır: **Ad Manager API (REST, Beta)** `https://admanager.googleapis.com/v1/` altında çalışır, 24 Eylül 2024'te Open Beta ile herkese açıldı ve 6 Kasım 2026 itibarıyla hâlâ "Beta" etiketlidir [RESMÎ]. **Ad Manager SOAP API** ise Google'ın kendi ifadesiyle "legacy"dir: "If you can migrate, we recommend using the Ad Manager API (Beta)" [RESMÎ]. SOAP sürümleri yaklaşık bir yıl yaşar; `v202511` 30.11.2026'da kapanıyor, en yeni sürüm `v202608` [RESMÎ]. REST API 2025–2026'da hızla genişledi. Satır öğesi okuma 04.12.2025'te, sipariş yazma 22.07.2026'da, satır öğesi oluşturma ve güncelleme 30.09.2026'da geldi. Kreatif **oluşturma** ise REST'te hâlâ yok [RESMÎ].

Kimlik doğrulama OAuth 2.0 ile yapılır (servis hesabı ya da kullanıcı adına). Ağda "API access" açılmalı ve servis hesabı ağa kullanıcı olarak eklenmelidir [RESMÎ]. API için ayrı bir ücret belgede geçmez [RESMÎ: API ücretine dair belge yok]. Ad Manager'ın standart sürümü ise aylık gösterim eşiğine kadar ücretsizdir (Türkiye için video dışında 200 milyon, video için 800 bin). Eşiğin üstü ücretli sözleşme ister; **Ad Manager 360** sipariş formu ve fiyat kartıyla (rate card) satılır [RESMÎ]. Web'de ödüllü reklam bu API'nin değil **Google Publisher Tag (GPT)** JavaScript kütüphanesinin işidir. Ödül tarayıcıda `rewardedSlotGranted` olayıyla bildirilir. Sunucu tarafında SSV (server-side verification) GET geri çağrısıyla doğrulanabilir, ama web için geri çağrının parametreleri ve imza biçimi belgelenmemiştir [RESMÎ; parametreler belgede yok]. Ad Manager bir içerik platformu değildir. "Takip uygulaması" açısından yalnızca **kendi ağındaki** değişiklik, teslimat ve rapor verisi yoklanabilir (polling); API'nin webhook'u yoktur.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Herkese açık (kimliksiz)** | — | Veri API'si yok. Herkese açık olanlar: belgeler, REST keşif belgesi (`https://admanager.googleapis.com/$discovery/rest?version=v1`), SOAP WSDL dosyaları ve GPT kütüphanesi (`gpt.js`) [RESMÎ]. Ağ kodu gizli değildir: "it appears in your page's Google Publisher Tags (GPT)" [RESMÎ] | — |
| **Geliştirici hesabı (self-servis)** | Google Cloud projesi, projede "Google Ad Manager API" (`admanager.googleapis.com`) etkinleştirme, OAuth istemcisi ya da servis hesabı **ve** erişebildiğin bir Ad Manager ağı (kendi ağın ya da test ağı) [RESMÎ]. Ayrı bir geliştirici jetonu (developer token) başlangıç adımlarında geçmez [RESMÎ: belgede yok]; Google Ads API de 9 Eylül 2026'dan beri developer token istemiyor ([Google Ads](Google-Ads.md)) [RESMÎ] | **Test ağı**: Google hesabı başına bir tane. Reklam sunmaz, sunuma bağlı raporlar boş döner, tahminler sahtedir (faked), varlık türü başına en çok 10.000 nesne olur, varsayılan olarak 360 özelliği yoktur [RESMÎ]. SOAP'ta `makeTestNetwork`, REST'te 30.09.2026'dan beri `networks.provisionTestNetwork` ile oluşturulur [RESMÎ; rehber sayfası çelişiyor, aşağıya bak] | Ücretsiz; API ücreti belgede yok |
| **İşletme onayı (Ad Manager hesabı + ağda API erişimi)** | Ad Manager hesabı: "You need a valid Google AdSense account to sign up for Ad Manager". Hesap o AdSense hesabına **kalıcı** bağlanır; kurulumu tamamlamak için Google temsilcisiyle görüşmek gerekebilir. AdSense hesabı yalnızca kurulum için gerekir; AdSense'i ayrıca kullanmak zorunlu değildir [RESMÎ]. Ağda Administrator rolündeki kişi **API access**'i açar ve "API Terms and Conditions"ı kabul eder. Servis hesabı "service account user" olarak eklenir ve uygun rol/takımlara atanır [RESMÎ] | Kendi envanterin: reklam birimi, placement, key-value, sipariş, satır öğesi, kreatif, rapor, tahmin, kullanıcılar, Ad Review Center… (kullanıcının UI'daki yetkisi kadar) [RESMÎ] | Standart Ad Manager: eşiğe kadar ücretsiz (aşağıda). API kotası ağ başına **2 istek/sn** [RESMÎ] |
| **Ücretli / kurumsal** | Eşik aşılınca ücretli sözleşme ya da **Ad Manager 360** (satış temsilcisi; sipariş formunda ücret tarifesi ve rate card) [RESMÎ] | 360'ta sayılan örnekler: Audience solutions, Data Transfer raporları, Impact estimates, header bidding trafficking, publisher provided identifiers, special ad units, Teams ("and more") [RESMÎ]. Sunucu tarafı video reklam ekleme (DAI) yalnızca "Ad Manager 360 Advanced"ta var [RESMÎ] | API kotası ağ başına **8 istek/sn** [RESMÎ]. Fiyat yayımlanmıyor [RESMÎ: belgede fiyat yok] |
| **Resmî olmayan** | Arayüzü (admanager.google.com) kazımak, GPT kodunu değiştirmek ya da vekil sunucudan geçirmek, masaüstü uygulamanın gömülü tarayıcısında reklam göstermek | Gerek yoktur; resmî API kendi verine tam erişim verir | Hesap kapatma ve gelir kaybı riski (aşağıya bak) |

### Hangi durumda hangi yol (Durum → Sonuç)

- **Yalnızca kendi raporlarını okuyan pano ya da uyarı aracı** → REST + `admanager.readonly` kapsamı. Bu kapsam raporu çalıştırmaya (`reports.run`) ve satırları okumaya yeter, ama yeni rapor tanımı oluşturmak (`reports.create`) tam `admanager` kapsamı ister. Raporu UI'da (ya da tam kapsamlı bir araçla) bir kez tanımlayıp kimliğini kullanmak gerekir [RESMÎ].
- **Satır öğesi, sipariş ya da envanter yazan entegrasyon** → REST + `admanager` kapsamı (satır öğesi oluşturma 30.09.2026'dan beri) [RESMÎ].
- **Kreatif dosyası yükleyen entegrasyon** → şimdilik SOAP `CreativeService.createCreatives`. REST'te `creatives` yalnızca `get`, `list`, `batchActivate` ve `batchDeactivate` sunar [RESMÎ].
- **Mevcut SOAP entegrasyonu** → `v202511` kullanıyorsan 30.11.2026'dan önce yeni sürüme geç. Uzun vadede REST'e geçiş Google'ın önerisi; REST'te karşılığı olmayan iş (kreatif yükleme, eski Reports tool raporları) varsa SOAP'ta sürüm takvimini izle [RESMÎ].
- **Eski "Reports tool" raporların (SavedQuery) var** → SOAP `ReportService` ile hâlâ çalışır. REST yalnızca Interactive Reports görür; SavedQuery kimlikleri REST'e taşınmaz, rapor UI'da taşınıp kimlikler eşlenmelidir [RESMÎ].
- **Yalnızca deneme** → test ağı. Reklam sunmadığı için teslimat, gelir ve ödüllü reklam akışı orada test edilemez; bunlar için gerçek ağda ayrı bir test reklam birimi gerekir [TAHMİN: test ağı sınırlarından çıkarım].
- **18 yaşından küçüksen** → AdSense yalnızca 18 yaş ve üstünü kabul eder; ebeveyn ya da vasi kendi Google hesabıyla başvurabilir ve ödemeler o yetişkine yapılır [RESMÎ, AdSense]. Ad Manager hesabı AdSense hesabına kalıcı bağlandığından ağ da o yetişkinin hesabıyla açılmış olur [TAHMİN].
- **Bireysel misin, işletme mi** → kayıtta "For myself" ya da "To manage my business" seçilir [RESMÎ]. Vergi ve şirket sonucu için [Masaüstü uygulamada reklam → §9 Hukuk ve vergi](../../Rehberler/Masaustu-Uygulama-Reklam/index.html#hukuk) sayfasındaki dallara bak.
- **Kullanıcıların AEA, Birleşik Krallık ya da İsviçre'de** → kişiselleştirilmiş reklam için Google sertifikalı, IAB TCF ile bütünleşik bir CMP şarttır (AEA/BK 16.01.2024'ten, İsviçre 31.07.2024'ten beri). Sertifikasız trafik "non-personalized ads or limited ads" alabilir [RESMÎ].
- **Aylık trafik ücretsiz eşiği aşıyor** → ücretli sözleşme ya da Ad Manager 360; ödeme yöntemi yoksa hesap önce salt okunur moda geçer, sonra askıya alınabilir [RESMÎ].

## Kimlik doğrulama

- **Ağ kodu (network code)**: Admin → Global settings → Network settings → "Network code" alanındadır; "a unique, numeric identifier for your Ad Manager network" [RESMÎ]. Oturum açınca adres çubuğunda da görünür (`https://admanager.google.com/NETWORK_CODE#home`) [RESMÎ]. REST'te kaynak adları `networks/{NETWORK_CODE}/...` biçimindedir; `GET /v1/networks` kullanıcının erişebildiği bütün ağları listeler [RESMÎ]. SOAP'ta ağ kodu SOAP başlığında verilir ve `NetworkService.getAllNetworks` ile `NetworkService.makeTestNetwork` dışındaki **bütün** isteklerde zorunludur; verilmezse `AuthenticationError.NETWORK_CODE_REQUIRED` döner. `getAllNetworks`, birden çok ağa erişimi olan oturumda başlıkta ağ kodu **olmadan** çağrılmak için tasarlanmıştır [RESMÎ].
- **API erişimini ağda açma**: Admin → Global settings → Network settings → General settings → "API access" anahtarı açılır, "API Terms and Conditions" onaylanır ve kaydedilir ("API access is not turned on until you click Save"). Bu adım için Administrator rolü gerekir [RESMÎ]. Erişim kapalıysa SOAP'ta `AuthenticationError.NO_NETWORKS_TO_ACCESS` ya da `NOT_WHITELISTED_FOR_API_ACCESS` hatası alınır [RESMÎ].
- **Servis hesabı**: Google Cloud'da servis hesabı ve JSON anahtarı oluşturulur. Ad Manager'da "Add a service account user" ile servis hesabının e-posta adresi eklenir ve rol/takım atanır. Kullanıcı, Users sekmesinde "Service Account" süzgeciyle görünür. Servis hesabı ancak API erişimi açıksa eklenebilir [RESMÎ]. SOAP için açılmış servis hesabı REST'te yeniden kullanılabilir, ama Cloud projesinde "Ad Manager API" ayrıca etkinleştirilmelidir [RESMÎ].
- **OAuth 2.0 akışları**: REST belgesi üç tür sayar: servis hesabı ("authenticate as dedicated account rather than a particular person"), web uygulaması (kullanıcı adına) ve yerel geliştirme (`gcloud auth application-default login --scopes="https://www.googleapis.com/auth/admanager"`) [RESMÎ]. İstemci kütüphaneleri kimliği Application Default Credentials (ADC) ile bu sırayla arar: önce `GOOGLE_APPLICATION_CREDENTIALS`, sonra gcloud kullanıcı kimliği, en son Google Cloud kaynağına bağlı servis hesabı [RESMÎ]. SOAP belgesi servis hesabı ve web uygulaması akışlarını anlatır; istek `Authorization: Bearer ACCESS_TOKEN` başlığını taşır [RESMÎ].
- **Kapsamlar (scope)** [RESMÎ]:
  - `https://www.googleapis.com/auth/admanager`: okuma ve yazma ("View and manage your campaigns on Google Ad Manager"); REST ve SOAP'ta kullanılır.
  - `https://www.googleapis.com/auth/admanager.readonly`: yalnızca REST'te geçerlidir. Blog duyurusundaki ifade: "It is not supported by the legacy Ad Manager SOAP API, which will continue to require the full-access scope." Okuma ve rapor çalıştırmaya izin verir, yazmaya izin vermez. Yazma gerekmiyorsa önerilir. Duyuru tarihi blogda 27.03.2026, REST sürüm notlarında 07.05.2026 olarak geçiyor [ÇELİŞKİLİ: tarih].
- **İstek kimliği**: REST yanıtlarında `X-Goog-Correlation-Id` başlığıyla, hata gövdesinde de ayrıca döner; destekle paylaşılabilir [RESMÎ]. .NET'te hatalar `Grpc.Core.RpcException` türündedir; istek kimliği `e.GetStatusDetail<RequestInfo>()` ile alınır [RESMÎ].

## Temel uç noktalar

### İki API: SOAP (legacy) ve REST (Beta)

| Konu | SOAP API | Ad Manager API (REST, Beta) |
|---|---|---|
| Durum | "legacy"; sürümler normal yaşam döngüsü boyunca destekleniyor [RESMÎ] | Open Beta 24.09.2024; 06.11.2026'da hâlâ Beta [RESMÎ] |
| Adres | `https://ads.google.com/apis/ads/publisher/v202608/{Servis}?wsdl` [RESMÎ] | `https://admanager.googleapis.com/v1/` [RESMÎ] |
| Raporlama | Yalnızca eski **Reports tool** (`ReportService`). Arayüzdeki Reports tool 21.09.2026'da kapatıldı, ama "For partners using the SOAP API, read, run, and export functionality will remain available" [RESMÎ] | Yalnızca **Interactive Reports**; en çok 10 boyut (SOAP'ta boyut sınırı yoktu) [RESMÎ] |
| Sorgu | PQL `Statement` (bağlama değişkeni, `LIMIT`/`OFFSET`) | `filter` ve `orderBy` (PQL'e benzer). Bağlama değişkeni yoktur; `like` desteklenmez, joker karakter `*`'dır; `AND`/`OR` büyük harfle yazılır (küçük harf düz arama metni sayılır). Sayfalama `pageSize` + `pageToken` ile yapılır [RESMÎ] |
| Kreatif oluşturma | Var (`CreativeService.createCreatives`) [RESMÎ] | Yok; kreatif–satır öğesi ilişkisi (LICA) yazılabilir [RESMÎ] |
| Test ağı | `NetworkService.makeTestNetwork` [RESMÎ] | `networks.provisionTestNetwork` (30.09.2026). Ancak "Test networks" rehberi (son güncelleme 03.11.2026) hâlâ "The Ad Manager API (Beta) does not support creating test networks" diyor [ÇELİŞKİLİ: keşif belgesi ve 30.09.2026 sürüm notu yöntemi gösteriyor, rehber metni güncellenmemiş] |
| Sürümleme | Yaklaşık 3 ayda bir yeni sürüm [TAHMİN: sürüm adlarından]; takvim aşağıda [RESMÎ] | `v1` (Beta); kırıcı değişiklikler sürüm notlarıyla duyurulur [RESMÎ] |

**SOAP kapanış takvimi** [RESMÎ]. Kullanımdan kaldırma ve kapanış, tabloda yazan ayın son iş gününde yürürlüğe girer ("takes effect on the last weekday of"). Parantez içindeki gün numaraları bu kuraldan hesaplandı [TAHMİN: hesap]. `v202511` için 30.11.2026 tarihini üçüncü taraf bir bağlayıcı duyurusu da doğruluyor [3. TARAF].

| Sürüm | Kullanımdan kaldırma (deprecation) | Kapanış (sunset) | 6 Kasım 2026 itibarıyla |
|---|---|---|---|
| `v202608` | Mayıs 2027 (31.05.2027) | Ağustos 2027 (31.08.2027) | En yeni sürüm |
| `v202605` | Şubat 2027 (26.02.2027) | Mayıs 2027 (31.05.2027) | Destekleniyor |
| `v202602` | Kasım 2026 (30.11.2026) | Şubat 2027 (26.02.2027) | Bu ay kullanımdan kalkıyor |
| `v202511` | Ağustos 2026 | Kasım 2026 (30.11.2026) | Kullanımdan kalkmış; ay sonunda kapanıyor |
| `v202508`, `v202505` | Mayıs 2026, Şubat 2026 | Ağustos 2026, Mayıs 2026 | Kapandı |

- "Deprecation should be interpreted as a fair warning that the version will soon be turned off"; "Sunset means that the version is no longer available" [RESMÎ].
- Uyarı almak için iki yol var: "Google Ad Manager API Sunset Announcements" grubuna katılmak ya da Ad Manager arayüzünde "Deprecated API in use" bildirim türünü açmak [RESMÎ]. Takvim `api-schedule.csv` olarak da indirilebilir (son güncelleme 24.08.2026) [RESMÎ].
- Yeni bir SOAP sürümünün (ör. `v202611`) çıkıp çıkmayacağına dair belge yok. Takvim sayfası en son 03.11.2026'da güncellendi ve `v202608`'den yenisini listelemiyor [RESMÎ: belgede yok].
- **REST'te yakın kırıcı değişiklik (01.12.2026)**: Order'daki `unlimitedEndTime` alanı kaldırılıyor (yerine `endTimeUnlimited`). EntitySignalsMapping'deki kimlik alanlarının yerini kaynak adı alanları alıyor. Kullanımdan kalkmış bazı rapor boyutları ve metrikleri (ör. `DEVICE`, `DEVICE_NAME`, `ADVERTISER_DOMAIN_NAME`, `TOPICS_STATUS`) siliniyor. Ayrıca kullanımdan kalkmış kaynak kimlik alanları (`AdUnit.adUnitId`, `Order.orderId`, `Placement.placementId`, `User.userId` vb.) kaldırılıyor; kimlik, kaynağın `name` alanından ayrıştırılmalıdır. Bu tarihten sonra eski alanları kullanan istekler hata verir [RESMÎ, sürüm notu 27.10.2026].

### REST uç noktaları (seçme)

Taban adres `https://admanager.googleapis.com`. Aşağıda `{c}` = `NETWORK_CODE`. Metot, yol ve kapsamlar resmî başvurudan ve keşif belgesinden, ekleme tarihleri sürüm notlarından alındı [RESMÎ].

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/v1/networks` | Kullanıcının erişebildiği ağları listeler | `admanager` ya da `admanager.readonly` | Ağ kodunu bilmeden başlamak için kullanılır |
| GET, PATCH | `/v1/networks/{c}` | Ağ bilgisi: `networkCode`, `timeZone`, `currencyCode`, `effectiveRootAdUnit`, `testNetwork` | okuma: readonly; `PATCH`: `admanager` | `PATCH` 30.09.2026'da geldi; şimdilik yalnızca görünen adı (display name) günceller |
| GET, POST, PATCH | `/v1/networks/{c}/adUnits` (+ `:batchCreate`, `:batchUpdate`, `:batchActivate`, `:batchDeactivate`, `:batchArchive`) | Reklam birimlerini okur ve yazar | yazma: `admanager` | `placements`, `customTargetingKeys`, `customTargetingValues` ve `customFields` için benzer yöntemler var |
| GET, POST, PATCH | `/v1/networks/{c}/lineItems` (+ `:batchCreate`, `:batchUpdate`, `:batchPause`, `:batchResume`, `:batchArchive`, `:batchReserve`, `:batchRelease`, `:batchDelete`…) | Satır öğelerini okur, oluşturur, günceller, duraklatır ve arşivler | yazma: `admanager` | `list`: `pageSize` varsayılan 50, en çok 1000 (üstü 1000'e çekilir); `filter`, `orderBy`, `skip` desteklenir. Okuma 04.12.2025, oluşturma ve güncelleme 30.09.2026 |
| GET, POST | `/v1/networks/{c}/orders` (+ `:batchCreate`, `:batchUpdate`, `:batchSubmitForApproval`, `:batchApprove`, `:batchPause`, `:batchResume`, `:batchArchive`…) | Siparişleri okur, onaya gönderir, onaylar, duraklatır | yazma: `admanager` | Tekil `create`/`patch` yok, yalnızca toplu (batch) yöntemler var; yazma 22.07.2026'da geldi |
| GET, POST | `/v1/networks/{c}/creatives` (+ `:batchActivate`, `:batchDeactivate`) | Kreatifleri okur, etkinleştirir ya da devre dışı bırakır | okuma: readonly | **Oluşturma yok**; okuma 30.09.2026'da geldi |
| GET, POST, PATCH | `/v1/networks/{c}/lineItems/{id}/creatives` (+ `:preview`, `:batch…`) | Satır öğesi ile kreatif arasındaki ilişkiyi (LICA) yönetir | yazma: `admanager` | Okuma 30.09.2026'da, yazma ve önizleme 22.10.2026'da geldi |
| POST | `/v1/networks/{c}/reports` | Rapor tanımı oluşturur | yalnızca `admanager` (readonly yetmez) | Görünürlük varsayılan `HIDDEN`'dır; arayüzde görmek için `VISIBLE` yapılır |
| POST | `/v1/networks/{c}/reports/{REPORT_ID}:run` | Raporu asenkron çalıştırır ve bir Operation döner | `admanager` ya da readonly | "Poll every 5 seconds initially, with an exponential backoff" |
| GET | `/v1/networks/{c}/operations/reports/runs/{OPERATION_ID}` | Rapor çalışmasının durumunu verir; bitince `reportResult` döner | readonly | — |
| GET | `/v1/networks/{c}/reports/{REPORT_ID}/results/{RESULT_ID}:fetchRows` | Sonuç satırlarını sayfa sayfa getirir | readonly | `pageSize` varsayılan 1.000, en çok 10.000 satır; sonraki sayfa için `pageToken` verilir |
| POST | `/v1/networks/{c}:runAvailabilityForecast`, `:runDeliveryForecast`, `:runTrafficData` | Envanter uygunluk ve teslimat tahmini, trafik verisi | `admanager` ya da readonly | ForecastService 30.09.2026'da geldi; test ağında sonuçlar sahtedir |
| POST | `/v1/networks:provisionTestNetwork` | Oturumdaki kullanıcı için test ağı açar | `admanager` | 30.09.2026'da geldi. Kullanıcı başına bir test ağı; kullanmadan önce kurulum arayüzde tamamlanır; ağın sahibi servis hesabıysa `UserService.CreateUser` ile servis hesabı olmayan bir kullanıcı eklenir |
| GET | `/v1/networks/{c}/changeEvents` | Değişiklik geçmişini listeler: kaynak türü, `CREATE`/`UPDATE`/`DELETE`, kullanıcı, zaman | readonly | 22.10.2026'da geldi; saklama süresi belgede yok |
| GET, POST | `/v1/networks/{c}/webProperties/{WEB_PROPERTY}/adReviewCenterAds:search` (GET), `:batchBlock`, `:batchAllow` (POST) | Sitende gösterilen reklamları arar; engeller ya da izin verir (Ad Review Center) | arama: readonly; engelleme ve izin: `admanager` | — |
| GET | `/v1/networks/{c}/mcmEarnings:fetch` | MCM (Multiple Customer Management) kazançlarını getirir | readonly | Yalnızca MCM ilişkisi olan ağlar için |

Tam liste: [REST başvurusu](https://developers.google.com/ad-manager/api/beta/reference/rest). Keşif belgesinde iç içe olanlarla birlikte 88 kaynak var (revizyon 20261105): canlı yayın/DAI, özel açık artırma, kitle segmentleri, kullanıcılar, takımlar vb. [RESMÎ].

### SOAP servisleri (seçme, `v202608`)

Yöntem adları resmî başvurudan alındı [RESMÎ].

| Servis | İşlemler | Not |
|---|---|---|
| `NetworkService` | `getAllNetworks`, `getCurrentNetwork`, `makeTestNetwork`, `updateNetwork`, `getDefaultThirdPartyDataDeclaration` | Test ağı oturum (e-posta) başına bir tanedir |
| `LineItemService` | `createLineItems`, `getLineItemsByStatement`, `performLineItemAction`, `updateLineItems` | Toplu güncelleme kota tasarrufu sağlar |
| `OrderService` | `createOrders`, `getOrdersByStatement`, `performOrderAction`, `updateOrders` | REST karşılığı `orders.get/list` ve `batch…` yöntemleri |
| `CreativeService` | `createCreatives`, `getCreativesByStatement`, `performCreativeAction`, `updateCreatives` | Kreatif yüklemenin tek API yolu |
| `ReportService` | `runReportJob`, `getReportJobStatus`, `getReportDownloadURL`, `getReportDownloadUrlWithOptions`, `getSavedQueriesByStatement` | "This service is only for the legacy Reports tool"; "will continue to be supported for the regular SOAP API lifecycle" |
| `ForecastService` | `getAvailabilityForecast`, `getAvailabilityForecastById`, `getDeliveryForecast`, `getDeliveryForecastByIds`, `getTrafficData` | Tahminin kendi kotası vardır (`ForecastError.EXCEEDED_QUOTA`) |

### Satır öğesi türleri ve öncelikler

Küçük sayı daha yüksek öncelik demektir. Yardım sayfası tipik değerleri verir; REST başvurusu her tür için varsayılanı ve aralığı verir [RESMÎ].

| Tür | Öncelik (yardım sayfası) | REST varsayılanı (aralık) |
|---|---|---|
| Sponsorship | 4 | 4 (2–5) |
| Standard | 6, 8, 10 | 8 (6–10) |
| Network, Bulk, Price priority | 12 | 12 (11–14) |
| AdSense, Ad Exchange | 12 | 12 (1–16) |
| Preferred Deal | sabit; genelde Private Auction ve Open Auction'dan yüksek | 12 (12–12) |
| House | 16 | 16 (15–16) |

### Raporlama: kendi envanterinin raporu (REST)

Akış beş adımdır [RESMÎ]: (1) `reports.create` ile tanım oluşturulur (boyutlar, metrikler, tarih aralığı, `reportType`). (2) `:run` çağrılır ve bir uzun süren işlem (Operation) döner. (3) İşlem bitene kadar yoklanır. (4) Biten işlemden `reportResult` adı okunur. (5) `:fetchRows` ile satırlar sayfa sayfa alınır.

- Yalnızca Interactive Reports okunur. SOAP'taki gibi kimlik boyutu otomatik eklenmez; kimlik boyutunun tanıma ayrıca konması gerekir. Enum değerleri "open enum"dur, yani istemci bilinmeyen değerlere dayanıklı olmalıdır [RESMÎ].
- En çok 10 boyut kullanılabilir; aynı kimlik alanını kıran boyutlar tek boyut sayılır [RESMÎ].
- Test ağları reklam sunmaz, bu yüzden teslimat raporları boş döner [RESMÎ].
- İstemci kütüphaneleri yoklamayı önerilen aralıklarla kendisi yapar (.NET'te `PollUntilCompleted`). Daha fazla denetim isteyenler için verilen özel yoklama stratejisi örneklerinde 500 ms başlangıç, ×1,5 artış ve örneğe göre 5–30 sn üst sınır kullanılır [RESMÎ, örnek kod].

Resmî cURL örneği (tanım oluşturma). Yer tutucular büyük harflidir:

```bash
curl -X POST -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "report": {
      "displayName": "My API Report",
      "reportDefinition": {
        "dimensions": ["LINE_ITEM_NAME", "LINE_ITEM_ID"],
        "metrics": ["AD_SERVER_IMPRESSIONS"],
        "dateRange": { "relative": "YESTERDAY" },
        "reportType": "HISTORICAL"
      }
    }
  }' \
  "https://admanager.googleapis.com/v1/networks/${NETWORK_CODE}/reports"
```

Aynı akış C# ile (`Google.Ads.AdManager.V1`). Resmî `ReportServiceClient` örneklerinden kısaltıldı [RESMÎ: uyarlama]:

```csharp
using Google.Ads.AdManager.V1;
using Dimension = Google.Ads.AdManager.V1.ReportDefinition.Types.Dimension;
using Metric = Google.Ads.AdManager.V1.ReportDefinition.Types.Metric;

ReportServiceClient client = ReportServiceClient.Create();

Report report = client.CreateReport("networks/NETWORK_CODE", new Report
{
    DisplayName = "Dünkü satır öğesi gösterimleri",
    ReportDefinition = new ReportDefinition
    {
        Dimensions = { Dimension.LineItemName, Dimension.LineItemId },
        Metrics = { Metric.AdServerImpressions },
        DateRange = new ReportDefinition.Types.DateRange
        {
            Relative = ReportDefinition.Types.DateRange.Types.RelativeDateRange.Yesterday
        },
        ReportType = ReportDefinition.Types.ReportType.Historical
    }
});

RunReportResponse result = client.RunReport(report.Name).PollUntilCompleted().Result;

foreach (ReportDataTable.Types.Row row in client.FetchReportResultRows(result.ReportResult))
{
    Console.WriteLine(row);
}
```

SOAP tarafında `ReportService.runReportJob` → `getReportJobStatus` → `getReportDownloadURL` zinciri eski Reports tool tanımlarıyla (SavedQuery) çalışmaya devam eder [RESMÎ].

## Ödüllü reklam (web): GPT, politika ve SSV

Web'de ödüllü reklam Ad Manager API'si üzerinden değil, sayfaya yüklenen **Google Publisher Tag** (`https://securepubads.g.doubleclick.net/tag/js/gpt.js`) ile gösterilir [RESMÎ]. Ad Manager tarafında yalnızca reklam birimi, ödül tanımı ve SSV adresi ayarlanır.

### GPT ile akış

- Yuva `googletag.defineOutOfPageSlot("/NETWORK_CODE/AD_UNIT_CODE", googletag.enums.OutOfPageFormat.REWARDED)` ile tanımlanır. Ödüllü reklam kendi kapsayıcısını kendisi oluşturur, ayrıca bir `<div>` gerekmez [RESMÎ]. Yöntem `null` dönebilir; resmî örnekteki yorum "Slot returns null if the page or device does not support rewarded ads" der [RESMÎ].
- **Olaylar** [RESMÎ]:
  - `rewardedSlotReady` (`RewardedSlotReadyEvent`): reklam hazırdır. Kullanıcıya izleme seçeneğini sunmak yayıncının işidir. `event.makeRewardedVisible()` "should not be called until the user has consented to view the ad"; dönüş değeri reklamın gösterilip gösterilmediğidir (boolean).
  - `rewardedSlotGranted` (`RewardedSlotGrantedEvent`): ödül verilmiştir. `event.payload` (`RewardedPayload`) içinde `amount` (sayı) ve `type` (ör. "coin") bulunur. "If the ad is closed before the criteria for granting a reward is met, this event will not fire."
  - `rewardedSlotClosed` (`RewardedSlotClosedEvent`): kullanıcı reklamı kapatmıştır. "It may fire either before or after a reward has been granted"; ödülün verilip verilmediği `rewardedSlotGranted` ile anlaşılır.
  - `rewardedSlotVideoCompleted` (`RewardedSlotVideoCompletedEvent`): video reklam sona ermiştir.
  - Dolum olmadığını anlamak için resmî örnek `slotRenderEnded` olayında `event.isEmpty` değerine bakar. Kapanıştan sonra `googletag.destroySlots([slot])` çağrılır [RESMÎ, örnek kod].

Resmî örneğe dayanan kısa iskelet (işlev adları yer tutucudur):

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
<script>
  window.googletag = window.googletag || { cmd: [] };
  googletag.cmd.push(() => {
    const slot = googletag.defineOutOfPageSlot(
      "/NETWORK_CODE/AD_UNIT_CODE",
      googletag.enums.OutOfPageFormat.REWARDED
    );
    if (!slot) { showNotSupported(); return; }
    slot.addService(googletag.pubads());
    googletag.pubads().addEventListener("rewardedSlotReady", (event) => {
      showOptInDialog(() => event.makeRewardedVisible());
    });
    googletag.pubads().addEventListener("rewardedSlotGranted", (event) => {
      showGrantedMessage(event.payload.amount, event.payload.type);
    });
    googletag.pubads().addEventListener("rewardedSlotClosed", () => {
      googletag.destroySlots([slot]);
    });
    googletag.pubads().addEventListener("slotRenderEnded", (event) => {
      if (event.slot === slot && event.isEmpty) showNoFill();
    });
    googletag.enableServices();
    googletag.display(slot);
  });
</script>
```

`rewardedSlotGranted` olayı tarayıcıda çalışır ve kolayca taklit edilebilir. Bu yüzden kalıcı kredi yalnızca sunucuya gelen doğrulanmış SSV geri çağrısıyla yazılmalıdır [TAHMİN: güvenlik tasarımı; araştırmanın §3 ilkesiyle aynı].

### Desteklenen ortamlar: masaüstü mü, yalnızca mobil mi?

Depodaki araştırmada iki resmî sayfa çelişkili olarak işaretlenmişti. Belgelerin bugünkü metni şöyle:

- Ad Manager yardım sayfası: "You can traffic rewarded ads on Google Ad Manager desktop, mobile, and tablet web inventory." **Aynı sayfanın** "Requirements and restrictions" bölümünde ise: "Rewarded ads are eligible for mobile optimized pages (for example, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`)" [RESMÎ].
- GPT örnek sayfası: "Currently, rewarded ads are only supported on mobile optimized pages where zoom is neutral. Typically this means the publisher has `<meta name="viewport" content="width=device-width, initial-scale=1">` or similar in the `<head>` of the page." Aynı sayfa `null` dönüşünü de "rewarded ads are only requested on pages that properly support the format" diye açıklar. GitHub'daki örnek kodda ise "Slot returns null if the page or device does not support rewarded ads" yorumu var [RESMÎ].
- **Yorum**: İki belge "mobile optimized" şartında birleşiyor ve ikisi de bu şartı viewport meta etiketiyle örnekliyor. Yani şart cihaz türü değil, **sayfanın** özelliği: viewport meta etiketi olan duyarlı (responsive) sayfa ve nötr yakınlaştırma [RESMÎ: iki sayfanın tanımı]. Yardım sayfası masaüstü envanterini açıkça saydığına göre, böyle bir sayfada masaüstü tarayıcıdan da ödüllü reklam istenebilir [TAHMİN: iki resmî cümlenin birlikte yorumu]. Belirsizlik kalan nokta şu: GPT'nin hangi cihaz ya da tarayıcıda `null` döndürdüğü belgelenmemiş [ÇELİŞKİLİ: kısmen çözüldü].
- **Pratikte**: sayfaya viewport etiketini koy, `null` dönüşünü her zaman ele al, gerçek masaüstü tarayıcılarda %100 yakınlaştırmayla test et ve masaüstü dolum oranını ayrıca ölç [TAHMİN].

### Ad Manager kuralları (web ödüllü reklam)

Yardım sayfasındaki şartlar [RESMÎ]:

- İzleme onayını alan ekranı oluşturmak ve ödülü teslim etmek yayıncının işidir (örnek: haber sitesinde ödeme duvarı, havalimanında wifi giriş sayfası).
- "Block non‑instream video ads" koruması kapalı olmalıdır.
- Talep varsayılan olarak hem video hem görüntülü reklamdan gelir; yalnızca video için hesap yöneticisine başvurulur. Desteklenen talep türleri: reservations, Preferred Deals, Open Auction, Private Auctions, Programmatic Guaranteed.
- Bazı talep türlerinde reklam sesli başlar; kullanıcıya önce "sesle devam et ya da vazgeç" sorulur. Erken kapatan kullanıcı ödülü kaybedeceğini onaylar.
- Gösterim reklam gösterildiğinde sayılır. Ödül için görüntülü reklam "must be in view for at least 7 seconds". Tamamlanma şunlardan biridir: video biter, tanımlı gösterim süresi dolar ya da (TrueView'da) atlama eşiğine ulaşılır. Reklam tamamlandıktan sonra ekranda kalır ve kullanıcı kapatmalıdır.
- Aynı anda birden çok ödüllü reklam istenemez; ilk yuva görünürken ikincisi gösterilmez. Yenileme (refresh) "untested"tır. Reklam birimi boyutu ödüllü web reklamının sunumunu etkilemez.
- Satır öğesi ayarı: rezervasyon satırlarında reklam türü "Video or audio" ve beklenen kreatif boyutu `1x1v` (Video / VAST); Ad Exchange satırlarında "Display (Standard)" ve `1x1` (Custom). Raporda ödüllü istekler Platform → "Interaction type" boyutuyla ayrılır (Historical rapor türünde).

Ödüllü reklam politikası [RESMÎ]:

- Reklam yalnızca kullanıcı "affirmatively and unambiguously opts in" olduktan sonra gösterilir (rewarded interstitial biçimi hariç). Kullanıcı reklamla etkileşime zorlanamaz.
- Nakit, kripto para ve hediye kartı gibi doğrudan parasal ödüller "may not be offered as rewards under any circumstance". Başkasına devredilebilen sadakat puanları da yasaktır. Dolaylı ödül yalnızca yayıncının kendi platformunda kullanılabilir olmalıdır; fiziksel ürün için indirim ya da kupon ürün değerinin %25'ini geçemez.
- Rastgele ödül serbesttir, ama kazanma olasılığı ve olası ödüller (hiç ödül çıkmayabileceği dahil) reklamdan önce açıklanmalı ve olasılık sıfırdan büyük olmalıdır.
- Gereken eylem ve verilecek ödül her reklamdan önce açık, doğru ve göze çarpan biçimde gösterilir. Kullanıcıyı belli bir seçime yönlendiren metin ya da simge kullanılamaz. Ödülün Google tarafından doğrulandığı ya da onaylandığı ima edilemez.

### SSV (sunucu tarafı doğrulama)

- **Kurulum**: Reklam biriminin "Reward" bölümüne ödül miktarı ve türü girilir (ör. "10" ve "Lives"). Aynı yerdeki alana SSV postback URL'si yazılır. Ad Manager uyumlulaştırması (mediation) kullanılıyorsa ayrı bir kutu işaretlenir [RESMÎ]. Bu bölüm ayarın web için mi uygulama için mi olduğunu ayrıca belirtmez [RESMÎ: belgede yok].
- **Web**: "If your network has an SSV URL configured on ad units that serve rewarded web ads, Google's web servers start serving GET callback requests to your designated endpoint when users complete rewarded interactions." [RESMÎ]
- **Web için belgede olmayanlar**: geri çağrının sorgu parametreleri, imza ve anahtar doğrulama yöntemi. GPT başvurusunda `user_id` ya da `custom_data` geçirme yöntemi de **yoktur**; başvuru sayfasında SSV hiç geçmez [RESMÎ: belgede yok]. Dolayısıyla geri çağrıyı belirli bir kullanıcı hesabıyla eşleştirmenin resmî bir yolu web için doğrulanamadı [TAHMİN: doğrulanamadı].
- **Mobil SSV (karşılaştırma için)**: Mobil SDK belgelerinde parametreler bellidir: `ad_network`, `ad_unit`, `custom_data`, `key_id`, `reward_amount`, `reward_item`, `signature`, `timestamp`, `transaction_id`, `user_id`. İmza ECDSA ve SHA-256 iledir; son iki parametre her zaman sırasıyla `signature` ve `key_id`'dir. Açık anahtarlar `https://gstatic.com/admob/reward/verifier-keys.json` adresinden alınır ve en çok 24 saat önbellekte tutulur [RESMÎ, AdMob Android SSV]. `custom_data` uygulama verisi ya da "a server-generated nonce" taşıyabilir ve yüzde kodlamalıdır; "verify the callback signature before trusting the user_id or custom_data query parameters" [RESMÎ, Ad Manager Android rehberi]. Web geri çağrısının aynı biçimi kullandığı **doğrulanamadı** [TAHMİN: doğrulanamadı].
- **Öneri**: Uç nokta HTTPS üzerinden yalnızca GET kabul etmeli, ham isteği kaydetmeli ve aynı isteğin tekrarını engellemelidir (tekil bir işlem kimliği gelirse benzersiz kısıtla). Kredi istemci olayıyla değil bu geri çağrıyla yazılmalıdır. Web parametreleri belgelenmediği için ilk gerçek geri çağrılar gözlenmeli ve kullanıcı eşleştirmesi Google desteğine ya da hesap yöneticisine yazılı olarak sorulmalıdır [TAHMİN].

### Durum → Sonuç (ödüllü reklam nerede olur?)

- **Duyarlı bir web siten var** → GPT `REWARDED` + reklam biriminde SSV URL'si [RESMÎ]. Kredi sunucuda, geri çağrı gelince yazılır [TAHMİN: tasarım].
- **Yalnızca Windows masaüstü uygulaman var (web sitesi yok)** → GPT web içindir. Google'ın "web content viewing frame" kuralı AdSense **ve Ad Manager** reklamlarını kapsar. İzinli seçeneklerin hepsi Android/iOS içindir: WebView API for Ads, Chrome Custom Tabs, Trusted Web Activities, SFSafariViewController [RESMÎ]. WebView2 ya da Electron için izinli bir seçenek belgede yok; gömülü tarayıcıda göstermek hesap riski taşır [TAHMİN]. Araştırmanın önerisi: ödüllü reklam sayfasını sistem tarayıcısında kendi sitende açmak ([§8 mimari](../../Rehberler/Masaustu-Uygulama-Reklam/index.html#mimari)).
- **Mobil uygulaman var** → Google Mobile Ads SDK (Ad Manager) ile ödüllü reklam. Buradaki SSV parametreleri (`user_id`, `custom_data`) belgelidir [RESMÎ].
- **Kullanıcıların AEA/BK/İsviçre'de** → sertifikalı TCF CMP olmadan kişiselleştirilmiş reklam yoktur [RESMÎ].

## Gerçek zamanlı / bildirim

- **Webhook**: Ad Manager API'si (REST ya da SOAP) için webhook, WebSocket ya da akış (stream) belgede yok.
- **SSV GET geri çağrısı**: Ödüllü etkileşim tamamlanınca Google sunucusu senin uç noktanı çağırır. Bu, ekosistemdeki tek sunucudan sunucuya anlık bildirimdir [RESMÎ].
- **GPT olayları**: `rewardedSlotReady/Granted/Closed/VideoCompleted`, `slotRenderEnded` ve `impressionViewable` tarayıcıda anlık çalışır, ama istemci taraflıdır ve güvenilir kanıt sayılmaz [TAHMİN].
- **Rapor**: Uzun süren işlem (Operation) yoklanır: önce 5 sn, sonra üstel geri çekilme [RESMÎ].
- **Değişiklik takibi**: `GET /v1/networks/{c}/changeEvents` ile yoklama yapılır (22.10.2026'dan beri). Saklama süresi belgede yok [RESMÎ; süre belgede yok].
- **Platform bildirimleri**: arayüzde "Deprecated API in use" bildirim türü ve "Sunset Announcements" Google grubu [RESMÎ].
- **RSS**: REST sürüm notlarının resmî beslemesi `https://developers.google.com/feeds/ad-manager-release-notes.xml` adresindedir; Ads Developer Blog'un `ad_manager_api` etiketi de değişiklikleri izlemek için kullanılabilir. Sürüm notları sayfasının son güncellemesi 03.11.2026 [RESMÎ].

## Neler mümkün (takip uygulaması açısından da)

| İş | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Kendi envanterinin raporu (gösterim, tıklama, gelir; reklam birimi, satır öğesi ve tarih kırılımı) | **Evet** | REST `reports.create` → `:run` → `:fetchRows`; eski tanımlar için SOAP `ReportService` | API erişimi açık ağ; çalıştırmaya `admanager.readonly` yeter | En çok 10 boyut; test ağında veri yok [RESMÎ] |
| Satır öğesi oluşturma, güncelleme, duraklatma, arşivleme | **Evet** | REST `lineItems.create/patch` ve `batchPause`, `batchResume`, `batchArchive`, `batchReserve`…; SOAP `LineItemService` | `admanager` + kullanıcı rolü | REST'te oluşturma ve güncelleme 30.09.2026'dan beri [RESMÎ] |
| Sipariş yönetimi (oluşturma, onaya gönderme, onaylama) | **Evet** | REST `orders:batchCreate`, `batchSubmitForApproval`, `batchApprove`…; SOAP `OrderService` | `admanager` | `unlimitedEndTime` 01.12.2026'da kaldırılıyor [RESMÎ] |
| Kreatif yükleme | REST **hayır**, SOAP **evet** | SOAP `CreativeService.createCreatives`; REST'te yalnızca okuma, etkinleştirme ve LICA | `admanager` | [RESMÎ: REST başvurusunda `create` yok] |
| Envanter yapısı (reklam birimi, placement, key-value, özel alan) | **Evet** | REST `adUnits`, `placements`, `customTargetingKeys/Values`, `customFields` | `admanager` | [RESMÎ] |
| Envanter tahmini (availability, delivery) | **Evet** | REST `runAvailabilityForecast`, `runDeliveryForecast`; SOAP `ForecastService` | `admanager` ya da readonly | Kendi kotası var; test ağında sonuçlar sahte [RESMÎ] |
| Web'de ödül olaylarını yakalamak | **Evet (istemcide)** | GPT `rewardedSlotReady`, `rewardedSlotGranted`, `rewardedSlotClosed`, `rewardedSlotVideoCompleted` | Ağda ödüllü reklam birimi + GPT | Kredi için tek başına kanıt değil [TAHMİN] |
| Ödülü sunucuda doğrulamak (web) | **Kısmen** | Reklam biriminde SSV URL'si → Google'dan GET geri çağrısı | Ağ ayarı | Parametre ve imza belgede yok; kullanıcı eşleştirmesi doğrulanamadı [RESMÎ: belgede yok] |
| Ödülü sunucuda doğrulamak (mobil uygulama) | **Evet** | Google Mobile Ads SDK + SSV (ECDSA imzası, `user_id`, `custom_data`) | Ağ + SDK | [RESMÎ] |
| Windows masaüstü uygulamasının içinde Ad Manager reklamı | **Doğrulanamadı / riskli** | Resmî masaüstü SDK'sı yok; izinli web görünümü seçenekleri yalnızca Android/iOS | — | Liste [RESMÎ]; "riskli" sonucu [TAHMİN] |
| Sitende gösterilen reklamları denetlemek ya da engellemek | **Evet** | REST `adReviewCenterAds:search`, `:batchBlock`, `:batchAllow` | arama: readonly; engelleme: `admanager` | [RESMÎ] |
| Başka bir yayıncının envanterini ya da raporunu okumak | **Hayır** | Yalnızca kullanıcının ya da servis hesabının eklendiği ağlar okunur (`networks.list`) | — | MCM ebeveyni için `mcmEarnings.fetch` ayrı bir durumdur [RESMÎ] |
| **Takip:** kendi ağındaki değişiklikleri izlemek | **Evet, yoklamayla** | `changeEvents.list` (kim, neyi, ne zaman değiştirdi) | readonly | Push yok |
| **Takip:** satır öğesi teslimat durumu (`DELIVERING`, `PAUSED`, `COMPLETED`…) | **Evet, yoklamayla** | `lineItems.list` + `filter` | readonly | Durum değerleri [RESMÎ]; yoklama aralığını kotaya göre seç [TAHMİN] |
| **Takip:** gelir ya da gösterim eşiği uyarısı | **Kendi tarafında** | Zamanlanmış rapor çalıştırma + yerel eşik kontrolü | readonly | Gerçek zamanlı değil. Blog, salt okuma kapsamına örnek olarak "reporting dashboards or alerting tools" sayar [RESMÎ] |
| **Takip:** yeni gönderi, canlı yayın, mesaj | **Uygulanamaz** | Ad Manager içerik ya da sosyal platform değil | — | Canlı yayın tarafında yalnızca **kendi** DAI akışlarının reklam yönetimi var (360 Advanced) [RESMÎ] |

**Sonuç:** Ad Manager API'si yayıncının **kendi** reklam sunucusunu yönetme ve raporlama aracıdır: envanter, satış (sipariş ve satır öğesi), tahmin ve rapor. Bir takip ya da izleme uygulamasında anlamlı kullanımı, kendi ağını izlemektir (değişiklik geçmişi, teslimat durumu, günlük rapor). Bunun için push yoktur; zamanlayıcıyla yoklama ve kota bütçesi gerekir. Ödül akışında tek anlık sinyal SSV geri çağrısıdır.

## Hız sınırları ve fiyatlar

- **Ağ kotası (SOAP belgesi)**: Ad Manager ağlarında saniyede **2**, Ad Manager 360 ağlarında saniyede **8** istek. "All API requests made on your network apply to this quota, including third-party applications". Sınır aşılınca `QuotaError.EXCEEDED_QUOTA` döner. Önerilen tepki: en az 5 sn beklemek, sorun sürerse üstel geri çekilme; hâlâ aşılıyorsa ağdaki API uygulamalarını denetlemek. Bu sınırlar her isteğin başarılı olacağını da garanti etmez [RESMÎ].
- **Rapor ve tahmin kotaları**: Rapor sisteminin (`QuotaError.REPORT_JOB_LIMIT`) ve tahmin sisteminin (`ForecastError.EXCEEDED_QUOTA`) ayrı kotaları vardır; sayıları belgede yok [RESMÎ].
- **REST kotası**: Ayrı bir limit sayfası bulunamadı (`/beta/limits` adresi 404 veriyor) [RESMÎ: belgede yok]. SOAP'taki ağ kotasının REST çağrılarını da kapsayıp kapsamadığı belgede yazmıyor. Temkinli tasarımda aynı 2/8 istek/sn bütçesini paylaştığını varsay ve Google Cloud projesinin kota ekranını kontrol et [TAHMİN].
- **Sayfa boyutu**: SOAP için önerilen sayfa boyutu 200–500 [RESMÎ]. REST liste yöntemlerinde varsayılan 50, `lineItems.list` için en çok 1000; rapor satırlarında (`fetchRows`) varsayılan 1.000, en çok 10.000. Sayfa istenenden kısa dönebilir; `nextPageToken` varsa devam edilir [RESMÎ].
- **API ücreti**: Belgede yok [RESMÎ: API ücretine dair belge yok].
- **Ad Manager standart sürümün ücretsiz eşikleri** ("you may serve the following impression thresholds without being charged") [RESMÎ]:

| Konum | Aylık eşik (video dışı) |
|---|---|
| ABD, Kanada, Avustralya, Yeni Zelanda | 90 milyon |
| Türkiye, Birleşik Krallık, Almanya, Hindistan ve listedeki diğer ülkeler | 200 milyon |
| Listede olmayan bütün diğer konumlar | 150 milyon |
| Video reklam birimleri (her konum) | 800 bin |

- **Neler faturaya girer** [RESMÎ]: GPT kullanıldığında dolu **ve boş** gösterimler faturalanır (üçüncü taraf reklam sunumu dahil). Mobil uygulama ve videoda yalnızca dolu ve işlenmiş (rendered) gösterimler sayılır. Geçersiz trafik hiç faturalanmaz. Ad Exchange, AdSense ve AdMob satır öğeleri dinamik ayırmayla (dynamic allocation) sunulursa ücretli gösterime sayılmaz.
- **Eşik aşılırsa** [RESMÎ]: Ödeme yöntemi yoksa önce uyarı gelir, sonra hesap salt okunur moda geçer ve sonunda askıya alınabilir. Ödeme yöntemi varsa ek gösterimler ücretlendirilir ve ücretli sözleşme gerekir. Birim fiyat yardım sayfasında yok; faturalandırmaya kaydolurken bölgeye göre ücret tarifesi (fee schedule) ve rate card gösterilir. Kayıtlı ödeme yöntemi geçersizse reklam sunumu, ödeme alınamadıktan 30 gün sonra durur.
- **Ad Manager 360**: Fiyat yayımlanmaz; sipariş formunda "fee schedule and rate card" bulunur, kurulum satış temsilcisiyle yapılır [RESMÎ].
- **Yayıncıya ödeme** [RESMÎ]: Ödeme aylıktır. Eşik hesap para birimine göre değişir (belgedeki örnek 100 USD); eşiğin altındaki bakiye sonraki aya devreder. Ödeme ay sonunu izleyen yaklaşık 30 gün içinde gönderilir; EFT 4–10 günde hesaba geçer. Türkiye için ödeme yöntemleri: çek **hayır**, EFT **evet**, havale (wire) **evet**, Hyperwallet **hayır**. EFT geliri "in your local currency" yatırır; banka, hesapta girilen ülkede olmalı ve hesap o ülkenin yerel para biriminde açılmış olmalıdır, yoksa test yatırması başarısız olur [RESMÎ, EFT sayfası]. Vergi, şirket ve stopaj için [araştırma §9](../../Rehberler/Masaustu-Uygulama-Reklam/index.html#hukuk).

## Resmî olmayan yollar ve riskler

| Yol | Nasıl çalışır | Risk |
|---|---|---|
| **Arayüzü kazımak / tarayıcı otomasyonu** (admanager.google.com) | Oturum açmış tarayıcıda sayfaları okur | Gereksizdir, çünkü resmî API aynı veriyi verir. Arayüz değişince bozulur; hesap güvenliği ve kullanım şartları riski taşır [TAHMİN] |
| **Üçüncü taraf bağlayıcılar** (BI ya da veri ambarı araçları) | Resmî API'yi senin yetkinle kullanır | Resmî olmayan değildir, ama ağın 2/8 istek/sn kotasını paylaşır [RESMÎ]. Erişimi salt okuma kapsamıyla ve ayrı bir servis hesabıyla sınırla [TAHMİN] |
| **GPT kodunu değiştirmek ya da kendi alan adından vekil sunucuyla sunmak** (reklam engelleyiciyi aşmak için) | Google etiketini yeniden yazar ya da proxy'ler | AdSense'te reklam performansını yapay olarak şişiren kod değişiklikleri yasaktır [RESMÎ, AdSense]. Ad Manager'a özgü açık bir hüküm bu çalışmada doğrulanamadı [TAHMİN: doğrulanamadı]. Araştırmanın [§5 değerlendirmesi](../../Rehberler/Masaustu-Uygulama-Reklam/index.html#engelleyici): güvenilirliği düşük |
| **Masaüstü uygulamanın gömülü tarayıcısında GPT** (WebView2, Electron) | Siteyi uygulama penceresinde açar | Google'ın "web content viewing frame" kuralı Ad Manager reklamlarını da kapsar ve izinli seçeneklerin hepsi mobildir [RESMÎ]. Hesap kapatma riski [TAHMİN] |
| **Ödülsüz envanterde "reklama bak/tıkla" teşviki, kendi reklamına tıklama** | Kullanıcıya karşılık vaat eder | "Except for rewarded inventory" teşvik yasaktır; "Compensate users for viewing ads" de yasaktır [RESMÎ, AdSense program politikası]. Hesap kapatılabilir |
| **İstemci olayıyla kredi yazmak** (`rewardedSlotGranted`) | Tarayıcıdan "izledim" bildirimi alır | Taklit edilmesi kolaydır; SSV olmadan kalıcı kredi verilmemelidir [TAHMİN] |

## SDK ve kütüphaneler

| Ad | Dil | Tür | Not |
|---|---|---|---|
| `Google.Ads.AdManager.V1` (NuGet) | C#/.NET | **Resmî** (Google LLC, google-cloud-dotnet); REST Ad Manager API (Beta) | Son sürüm **1.0.0-beta13** (09.10.2026); ilk beta 03.10.2024. Hedef çerçeveler .NET Framework 4.6.2 ve .NET Standard 2.0; lisans Apache-2.0 [RESMÎ: NuGet]. GAX/gRPC tabanlıdır: hatalar `Grpc.Core.RpcException`, kimlik ADC; `HttpClient.DefaultProxy` ve `HTTP_PROXY`/`HTTPS_PROXY` ortam değişkenlerine uyar [RESMÎ]. "Getting started" sayfası hâlâ `1.0.0-beta01`'i gösteriyor, .NET sayfası `beta13`'ü; NuGet'teki son sürümü kullan [RESMÎ: sayfalar arası fark] |
| `Google.Dfp` (NuGet) | C#/.NET | **Resmî** (googleads/googleads-dotnet-lib); SOAP API | Son sürüm **24.36.0** (25.08.2026): "Added support for v202608", "Removed support for v202508". Hedef .NET Standard 2.0 (README: .NET Framework 4.6.2+, .NET Core 2.0+, .NET 5+); lisans Apache-2.0 [RESMÎ: NuGet + GitHub]. Her SOAP kapanışında kütüphane sürümü de yükseltilmeli [TAHMİN] |
| `com.google.api-ads:ad-manager` | Java | Resmî; REST | [RESMÎ] |
| `google-ads-admanager` (PyPI) | Python | Resmî; REST | `from google.ads import admanager_v1` [RESMÎ] |
| `googleads/ad-manager` (Composer) | PHP | Resmî; REST | [RESMÎ] |
| `google-ads-ad_manager` (gem) | Ruby | Resmî; REST | [RESMÎ] |
| `@google-ads/admanager` (npm) | Node.js | Resmî; REST | [RESMÎ] |
| SOAP istemci kütüphaneleri | Java, Python, PHP, Ruby | Resmî; SOAP | SOAP başlangıç sayfasındaki paketler: Java `com.google.api-ads:ads-lib` + `dfp-axis`; Python `googleads` (PyPI'de son sürüm 51.0.0, 24.08.2026); PHP `googleads/googleads-php-lib` (Composer); Ruby `google-dfp-api` (RubyGems'te son sürüm 4.6.0, 01.09.2026; kodda `require 'ad_manager_api'`). .NET için yukarıdaki `Google.Dfp` [RESMÎ: SOAP Get started; sürümler PyPI ve RubyGems] |
| Google Publisher Tag (`gpt.js`) | JavaScript (tarayıcı) | Resmî | Sayfaya `<script async>` ile yüklenir; web reklam yuvaları ve ödüllü reklam olayları [RESMÎ] |
| Google Mobile Ads SDK (Ad Manager) | Android, iOS, Unity, Flutter | Resmî | Uygulama içi Ad Manager reklamı ve SSV [RESMÎ]. Windows masaüstü için resmî bir Ad Manager SDK'sı belgede yok [RESMÎ: belgede yok] |

## Postman / OpenAPI / koleksiyonlar

- **Keşif belgesi (Google Discovery)**: `https://admanager.googleapis.com/$discovery/rest?version=v1` [RESMÎ]. OpenAPI değildir, Google'ın kendi keşif biçimidir; kod üreticiler ondan istemci üretebilir [TAHMİN].
- **Proto tanımları**: `googleapis/googleapis` deposunda `google/ads/admanager/v1` dizini (06.11.2026'da erişilebilir) [RESMÎ].
- **SOAP WSDL**: `https://ads.google.com/apis/ads/publisher/v202608/{Servis}?wsdl` (ör. `ReportService`, `NetworkService`) [RESMÎ].
- **Resmî Postman koleksiyonu**: bulunamadı [RESMÎ: belgede yok].
- **GPT örnekleri**: `googleads/google-publisher-tag-samples` deposu; ödüllü reklam örneği `dist/display-rewarded-ad` altında [RESMÎ].
- **Değişiklik takibi**: REST sürüm notları, SOAP sürüm notları, kapanış takvimi CSV'si, Ads Developer Blog'un `ad_manager_api` etiketi [RESMÎ].

## Depoda ilgili sayfalar

- [Masaüstü uygulamada reklam ve ödüllü reklam](../../Rehberler/Masaustu-Uygulama-Reklam/): Windows masaüstü uygulaması + web sitesi olan bir üründe reklam gösterme, reklam izletip kredi verme ve engelleyicilere dayanıklı kurulum araştırması. Bu sayfa onun Ad Manager kısmının API başvurusudur.
  - [§1 Ağlar tablosu](../../Rehberler/Masaustu-Uygulama-Reklam/index.html#aglar): Ad Manager'ın masaüstü uygulama durumu, web ödüllü reklam ve SSV. Oradaki masaüstü/mobil çelişkisi burada resmî metinlerle yeniden değerlendirildi (kısmen çözüldü).
  - [§3 Ödüllü reklamla kredi](../../Rehberler/Masaustu-Uygulama-Reklam/index.html#odullu): Google'ın ödüllü reklam kuralları, SSV ve "istemci gösterir, ödülü sunucu verir" akışı.
  - [§6 Doğrudan reklam satışı](../../Rehberler/Masaustu-Uygulama-Reklam/index.html#dogrudan): satır öncelikleri, ücretsiz sürüm sınırları; Revive, Kevel, AdButler gibi diğer reklam sunucularıyla karşılaştırma.
  - [§9 Hukuk ve vergi](../../Rehberler/Masaustu-Uygulama-Reklam/index.html#hukuk): CMP/TCF şartı, Türkiye'de reklam gelirinin vergi dalları ve ödeme yöntemleri.
  - [arastirma.md](../../Rehberler/Masaustu-Uygulama-Reklam/arastirma.md): Aynı araştırmanın yapay zekâ için saf Markdown sürümü (kaynak numaraları ve güven etiketleriyle).
- [Google Play'de reklamlı oyun](../../Rehberler/Google-Play-Oyun/): Mobil oyunda AdMob ile reklam geliri (hesap türü, ödeme eşikleri, 20/B). Uygulama içi reklamda Google'ın diğer ürünü; mobil ödüllü reklam ve SSV karşılaştırması için.
- Aynı klasördeki diğer reklam API sayfaları karşılaştırma için kullanılabilir.

## Kaynaklar

**Resmî**

- [Ad Manager API (Beta): Getting started](https://developers.google.com/ad-manager/api/beta/getting-started): Beta durumu, `admanager.googleapis.com`, istemci kütüphaneleri (erişim: 6 Kasım 2026).
- [Ad Manager API (Beta): Authentication](https://developers.google.com/ad-manager/api/beta/authentication): Servis hesabı, ADC, `admanager` ve `admanager.readonly` kapsamları, servis hesabını ağa ekleme (erişim: 6 Kasım 2026).
- [Ad Manager API (Beta): Release notes](https://developers.google.com/ad-manager/api/beta/docs/release-notes): Open Beta (24.09.2024), kaynak ekleme tarihleri, 01.12.2026 kırıcı değişiklikleri (kimlik alanlarının kaldırılması dahil), RSS beslemesi; son güncelleme 03.11.2026 (erişim: 6 Kasım 2026).
- [Ad Manager API (Beta): REST reference](https://developers.google.com/ad-manager/api/beta/reference/rest): Kaynak ve yöntem listesi, keşif belgesi (erişim: 6 Kasım 2026).
- [REST: networks](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks), [networks.lineItems](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.lineItems), [lineItems.list](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.lineItems/list), [networks.creatives](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.creatives), [networks.orders](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.orders), [reports.create](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports/create), [reports.run](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.reports/run), [changeEvents](https://developers.google.com/ad-manager/api/beta/reference/rest/v1/networks.changeEvents): Yöntemler, kapsamlar, sayfa boyutu, satır öğesi öncelik aralıkları (erişim: 6 Kasım 2026).
- [Create and run reports](https://developers.google.com/ad-manager/api/beta/reports): Rapor akışı, HTTP yolları, örnek kodlar (erişim: 6 Kasım 2026).
- [Migrate from the Ad Manager SOAP API](https://developers.google.com/ad-manager/api/beta/migration): SOAP'ın "legacy" oluşu, geçiş önerisi, filtre ve sayfalama farkları, 10 boyut sınırı (erişim: 6 Kasım 2026).
- [Test networks](https://developers.google.com/ad-manager/api/beta/test-networks): Test ağı sınırları ("REST desteklemez" ifadesi; sayfa son güncelleme 03.11.2026) (erişim: 6 Kasım 2026).
- [.NET client library (Beta)](https://developers.google.com/ad-manager/api/beta/client-libraries/dotnet): `Google.Ads.AdManager.V1` kurulumu, ADC, `RpcException`, vekil sunucu (erişim: 6 Kasım 2026).
- [SOAP Deprecation Schedule](https://developers.google.com/ad-manager/api/deprecation): Sürüm takvimi, tanımlar, CSV; son güncelleme 03.11.2026 (erişim: 6 Kasım 2026).
- [SOAP Release notes](https://developers.google.com/ad-manager/api/rel_notes): `v202508`–`v202608` değişiklikleri (erişim: 6 Kasım 2026).
- [SOAP Get started](https://developers.google.com/ad-manager/api/start) ve [SOAP Authentication](https://developers.google.com/ad-manager/api/authentication): API erişimini açma, ağ kodu, `admanager` kapsamı, istemci kütüphaneleri (erişim: 6 Kasım 2026).
- [SOAP Best practices](https://developers.google.com/ad-manager/api/bestpractices) ve [Common errors](https://developers.google.com/ad-manager/api/troubleshooting): 2/8 istek/sn kotası, rapor ve tahmin kotaları, geri çekilme, kimlik doğrulama hataları (`NETWORK_CODE_REQUIRED` dahil) (erişim: 6 Kasım 2026).
- [SOAP v202608: ReportService](https://developers.google.com/ad-manager/api/reference/v202608/ReportService), [NetworkService](https://developers.google.com/ad-manager/api/reference/v202608/NetworkService), [LineItemService](https://developers.google.com/ad-manager/api/reference/v202608/LineItemService), [OrderService](https://developers.google.com/ad-manager/api/reference/v202608/OrderService), [CreativeService](https://developers.google.com/ad-manager/api/reference/v202608/CreativeService), [ForecastService](https://developers.google.com/ad-manager/api/reference/v202608/ForecastService): İşlem listeleri, WSDL adresleri (erişim: 6 Kasım 2026).
- [Ads Developer Blog: New Google Ad Manager API read-only scope](https://ads-developers.googleblog.com/2026/03/new-google-ad-manager-api-read-only.html): Salt okuma kapsamı, SOAP'ta desteklenmediği (27.03.2026) (erişim: 6 Kasım 2026).
- [Ads Developer Blog, `ad_manager_api` etiketi](https://ads-developers.googleblog.com/search/label/ad_manager_api): Sürüm duyuruları (erişim: 6 Kasım 2026).
- [GPT: Display a rewarded ad](https://developers.google.com/publisher-tag/samples/display-rewarded-ad): "only supported on mobile optimized pages where zoom is neutral", bunun viewport meta etiketi anlamına gelmesi, `null` dönüşünün açıklaması, olay tablosu (erişim: 6 Kasım 2026).
- [GPT reference](https://developers.google.com/publisher-tag/reference): `OutOfPageFormat.REWARDED`, `RewardedSlot…Event` sınıfları, `makeRewardedVisible`, `RewardedPayload` (erişim: 6 Kasım 2026).
- [GitHub: google-publisher-tag-samples, display-rewarded-ad](https://github.com/googleads/google-publisher-tag-samples/tree/main/dist/display-rewarded-ad/js): Ödüllü reklam örnek kodu, olay adları, `null` yorumu (erişim: 6 Kasım 2026).
- [Ad Manager Help: Rewarded ads for web](https://support.google.com/admanager/answer/9116812): Masaüstü/mobil/tablet, mobile optimized şartı, 7 sn kuralı, satır öğesi ayarları, "Interaction type" raporu, web SSV GET geri çağrısı (erişim: 6 Kasım 2026).
- [Ad Manager Help: Policies for ad units that offer rewards](https://support.google.com/admanager/answer/7496282): Ödüllü reklam politikası, %25 indirim sınırı, rastgele ödül kuralları (erişim: 6 Kasım 2026).
- [Ad Manager Help: Create or configure an ad unit](https://support.google.com/admanager/answer/10477477): "Reward" bölümü ve SSV postback URL'si (erişim: 6 Kasım 2026).
- [Ad Manager Help: Google Ad Manager billing setup](https://support.google.com/admanager/answer/6214526): Ücretsiz gösterim eşikleri, faturaya girenler, eşik aşımı, kayıtta gösterilen ücret tarifesi ve rate card, geçersiz ödeme yönteminde 30 gün kuralı (erişim: 6 Kasım 2026).
- [Ad Manager Help: Ad Manager 360 billing setup](https://support.google.com/admanager/answer/7079586): Sipariş formu, ücret tarifesi ve rate card (erişim: 6 Kasım 2026).
- [Ad Manager Help: Advertising with Ad Manager](https://support.google.com/admanager/answer/6022000): Standart ve 360 hesap türleri, 360 özellik örnekleri (erişim: 6 Kasım 2026).
- [Ad Manager Help: Sign up for Ad Manager](https://support.google.com/admanager/answer/7084151): AdSense hesabı şartı (yalnızca kurulum için), kalıcı bağlantı, temsilci görüşmesi (erişim: 6 Kasım 2026).
- [Ad Manager Help: Video Solutions feature availability](https://support.google.com/admanager/answer/3485387): DAI'nin yalnızca 360 Advanced'ta olması (erişim: 6 Kasım 2026).
- [Ad Manager Help: Line item types and priorities](https://support.google.com/admanager/answer/177279): Satır öğesi türleri ve öncelik değerleri (erişim: 6 Kasım 2026).
- [Ad Manager Help: Turn on API access](https://support.google.com/admanager/answer/3088588), [Add a service account user](https://support.google.com/admanager/answer/6078734), [Locate your network code](https://support.google.com/admanager/answer/7674889): API erişimi, servis hesabı, ağ kodu (erişim: 6 Kasım 2026).
- [Ad Manager Help: About the migration to Interactive reports](https://support.google.com/admanager/answer/16071282): Reports tool'un 21.09.2026'da kapanması, SOAP'ta raporların sürmesi (erişim: 6 Kasım 2026).
- [Ad Manager Help: Set up your form of payment](https://support.google.com/admanager/answer/147604) ve [Ad Manager payment guide](https://support.google.com/admanager/answer/2671026): Türkiye ödeme yöntemleri, ödeme takvimi, eşik (erişim: 6 Kasım 2026).
- [Ad Manager Help: Receive Ad Manager payments by EFT](https://support.google.com/admanager/answer/2731686): EFT'nin yerel para biriminde yatırılması, banka ülkesi ve para birimi şartı (erişim: 6 Kasım 2026).
- [Ad Manager Help: Consent management requirements (EEA, UK, Switzerland)](https://support.google.com/admanager/answer/13554116): Sertifikalı TCF CMP şartı ve tarihleri (erişim: 6 Kasım 2026).
- [AdSense program policies](https://support.google.com/adsense/answer/48182): "Web content viewing frame" kuralı (AdSense ve Ad Manager), teşvik ve yazılım içi reklam yasakları (erişim: 6 Kasım 2026).
- [AdSense eligibility requirements](https://support.google.com/adsense/answer/9724): 18 yaş şartı, ebeveyn ya da vasi hesabı (erişim: 6 Kasım 2026).
- [AdMob: Validate SSV callbacks (Android)](https://developers.google.com/admob/android/ssv): Mobil SSV parametreleri, ECDSA doğrulaması, anahtar sunucusu, 24 saat önbellek (erişim: 6 Kasım 2026).
- [Ad Manager Mobile Ads SDK (Android): Set up rewarded ads](https://developers.google.com/ad-manager/mobile-ads-sdk/android/next-gen/rewarded): `user_id` ve `custom_data` (nonce), imza doğrulanmadan güvenmeme kuralı (erişim: 6 Kasım 2026).
- [NuGet: Google.Ads.AdManager.V1](https://www.nuget.org/packages/Google.Ads.AdManager.V1) ve [NuGet: Google.Dfp](https://www.nuget.org/packages/Google.Dfp): Sürümler, yayım tarihleri, hedef çerçeveler (NuGet API ile okundu) (erişim: 6 Kasım 2026).
- [GitHub: googleads-dotnet-lib](https://github.com/googleads/googleads-dotnet-lib): SOAP .NET kütüphanesi, v24.36.0 sürüm notu (erişim: 6 Kasım 2026).
- [PyPI: googleads](https://pypi.org/project/googleads/) ve [RubyGems: google-dfp-api](https://rubygems.org/gems/google-dfp-api): SOAP Python ve Ruby kütüphanelerinin son sürümleri (PyPI ve RubyGems API ile okundu) (erişim: 6 Kasım 2026).
- [GitHub: googleapis, google/ads/admanager/v1](https://github.com/googleapis/googleapis/tree/master/google/ads/admanager/v1): REST API'nin proto tanımları (erişim: 6 Kasım 2026).

**Üçüncü taraf**

- [Improvado: Google Ad Manager API sunset](https://improvado.io/product-updates/connectors/google-ad-manager-api-sunset): Bir bağlayıcı sağlayıcının `v202511` → `v202602` geçiş notu; `v202511` için 30 Kasım 2026 kapanış tarihi (resmî takvimle uyumlu) (erişim: 6 Kasım 2026).

---

← [API kütüphanesi](../)
