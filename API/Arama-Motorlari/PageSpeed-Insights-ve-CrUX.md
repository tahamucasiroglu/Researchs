# PageSpeed Insights API ve Chrome UX Report (CrUX) API

> Yazılma tarihi: 6 Kasım 2026 · Son doğrulama: 6 Kasım 2026 · Durum: **açık** (ücretsiz Google Cloud API anahtarıyla; rakip dahil herkese açık her site sorgulanabilir; push yok)

## Özet

**PageSpeed Insights (PSI) API v5**, verilen URL'yi Google sunucularında Lighthouse ile test eder ve iki tür veri döner: **laboratuvar verisi** (`lighthouseResult`: Performance, Accessibility, Best Practices, SEO ve 2026'da eklenen deneysel Agentic Browsing kategorisi) ve **saha verisi** (`loadingExperience`, `originLoadingExperience`: Chrome UX Report'tan son 28 günün gerçek kullanıcı ölçümleri) [RESMÎ]. Google, CrUX saha verisini PSI API'den **çıkarmayı planladığını** duyurmuş ve saha verisi için CrUX API ile CrUX History API'yi önermiştir; bunun için bir tarih verilmemiştir [RESMÎ].

**Chrome UX Report (CrUX)**, belirli koşulları sağlayan Chrome kullanıcılarının gerçek deneyiminden toplanan, anonim ve toplu bir veri setidir. **CrUX API** (`records:queryRecord`) bir origin'in ya da URL'nin son 28 günlük histogram ve p75 değerlerini her gün günceller. **CrUX History API** (`records:queryHistoryRecord`) aynı veriyi haftalık en çok 40 dönemlik seri olarak verir. BigQuery'deki `chrome-ux-report` veri seti ise 2017'den bu yana aylık, yalnız origin düzeyinde ve ülke kırılımlıdır [RESMÎ]. İki API de ücretsiz bir Google Cloud API anahtarıyla çalışır; başvuru, inceleme ya da ücretli katman yoktur [RESMÎ]. Kredi kartı yalnız BigQuery için istenir; ancak BigQuery sandbox belgesi herkese açık veri setlerinin kartsız da sorgulanabileceğini yazar [ÇELİŞKİLİ; ayrıntı "Hız sınırları ve fiyatlar" bölümünde]. Sahiplik doğrulaması istenmediği için **rakip dahil herhangi bir herkese açık sitenin** performansı sorgulanabilir. Ancak CrUX'ta yalnız yeterince ziyaret alan ve herkese açık (200 dönen, `noindex` olmayan) sayfalar ile origin'ler bulunur; diğerleri `404` döner [RESMÎ]. Webhook veya push **yoktur**; izleme günlük ya da haftalık yoklamayla kurulur. FID, Eylül 2024'te bu araçlardan kaldırılmıştır (BigQuery'de Ekim 2024 yayımıyla); etkileşim metriği artık INP'dir [RESMÎ].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Herkese açık (kimliksiz)** | — | Web arayüzleri: [PageSpeed Insights](https://pagespeed.web.dev/) (tek URL; saha + lab; paylaşılabilir rapor bağlantısı 30 gün geçerli) ve [CrUX Vis](https://cruxvis.withgoogle.com/) (History API verisinin 40 haftalık grafikleri; URL'si paylaşılabilir) [RESMÎ]. CrUX Vis için giriş şartı belgede geçmiyor [TAHMİN: herkese açık araç]. **Kimliksiz API erişimi pratikte yok**: anahtarsız CrUX isteği `403 PERMISSION_DENIED`, anahtarsız PSI isteği `429 RESOURCE_EXHAUSTED` döndü (06.11.2026 denemesi; ayrıntı aşağıda) [RESMÎ: API yanıtları] | PSI arayüzü ara sıra captcha gösterebilir [RESMÎ] |
| **Geliştirici hesabı (API anahtarı)** | Google hesabı + Google Cloud projesi. Projede "PageSpeed Insights API" ve/veya "Chrome UX Report API" etkinleştirilir, Credentials sayfasından API anahtarı oluşturulur [RESMÎ] | PSI `runPagespeed` (lab + saha), CrUX `queryRecord` (günlük) ve `queryHistoryRecord` (haftalık seri). Herhangi bir herkese açık URL ya da origin sorgulanabilir; belgelerde sahiplik şartı yok [RESMÎ] | Ücretsiz. CrUX: 150 sorgu/dk/proje (iki uç nokta ortak), ücretle artırılamaz [RESMÎ]. PSI: belgede kota yok; Cloud Console varsayılanı 25.000 sorgu/gün ve 240 sorgu/dk/proje [3. TARAF] |
| **İşletme / uygulama onayı** | Yok | Başvuru, App Review ya da partnerlik isteyen bir ürün yok [RESMÎ: belgelerde onay adımı yok]. PSI kotası için Cloud Console'dan artış talep edilebilir (429 yanıtı bu adrese bağlantı verir) [RESMÎ: API yanıtı]. Google talebi reddedebilir ya da ek şarta veya ücrete bağlayabilir [RESMÎ: Google API Koşulları 2(d)] | — |
| **Ücretli / kurumsal** | BigQuery için bir Google Cloud projesi. CrUX belgesi projeye kredi kartı tanımlamayı şart koşar [RESMÎ]; BigQuery sandbox belgesi (son güncelleme 03.11.2026) ise herkese açık veri setlerinin kart ve faturalandırma hesabı olmadan sorgulanabileceğini yazar [ÇELİŞKİLİ; CrUX'un sandbox'ta sorgulanması denenmedi] | `chrome-ux-report` BigQuery veri seti: 2017'den bu yana aylık, origin düzeyi, ülke, cihaz ve navigasyon türü kırılımları, ham histogramlar [RESMÎ] | BigQuery ücretsiz katmanı (ayda ilk 1 TiB işlenen sorgu verisi) içinde ücretsiz; üstü işlenen veri miktarına göre ücretlidir (on-demand: TiB başına 6,25 USD) [RESMÎ: BigQuery fiyatlandırması, 06.11.2026]. API'lerin kendisinin ücretli katmanı yok |
| **Resmî olmayan** | — | PSI arayüzünü kazımak, kotayı aşmak için çok sayıda proje ya da anahtar kullanmak, başkasının anahtarını kullanmak | Gereksiz; Google API Koşulları'na aykırı (aşağıya bak) |

## Kimlik doğrulama

- **API anahtarı (iki API için de)**: Google Cloud Console'da proje aç, ilgili API'yi etkinleştir, Credentials sayfasında anahtar oluştur ve isteğe `key=API_ANAHTARIN` sorgu parametresini ekle [RESMÎ]. PSI belgesine göre anahtar URL içinde kodlama gerektirmez [RESMÎ].
- **CrUX**: Discovery belgesinde OAuth kapsamı tanımlı değildir; yalnız API anahtarı kullanılır [RESMÎ: discovery]. Anahtarsız istek şu yanıtı döner: `403 PERMISSION_DENIED`, "Method doesn't allow unregistered callers (callers without established identity). Please use API Key or other form of API consumer identity to call this API." [RESMÎ: API yanıtı, 06.11.2026]. Aynı gün bazı anahtarsız isteklerde (ör. toplu istekte) mesaj "Permission denied on the service." (`ACCESS_DENIED`) olarak geldi; kod yine 403'tü. Geçersiz bir anahtar ise iki API'de de `400 INVALID_ARGUMENT` (`API_KEY_INVALID`, "API key not valid") döner [RESMÎ: API yanıtları, 06.11.2026].
- **PSI**: Belgeye göre API anahtarla ya da anahtarsız kullanılabilir; sık ve otomatik sorgularda anahtar **önerilir** ("a key is recommended for frequent, automated queries") [RESMÎ]. Ancak 06.11.2026'da iki ayrı adrese (`www.googleapis.com` ve `pagespeedonline.googleapis.com`) yapılan anahtarsız denemelerin ikisi de `429 RESOURCE_EXHAUSTED` döndü. Hata ayrıntısında anahtarsız isteklerin düştüğü paylaşılan projenin günlük limiti `quota_limit_value: "0"` (`defaultPerDayPerProject`) olarak görünüyor [RESMÎ: API yanıtı]. Yani belge ile gerçek davranış farklı; **pratikte anahtar zorunludur** [ÇELİŞKİLİ].
- PSI discovery belgesi bir OAuth kapsamı (`openid`, "Associate you with your personal info on Google") tanımlar ve referans sayfası bu kapsamı "Requires the following OAuth scope" kalıbıyla listeler [RESMÎ]. Get-started örnekleri ise yalnız API anahtarı kullanır; analiz için OAuth gerekmez [RESMÎ: get-started].
- **Anahtar güvenliği**: Google Cloud, kısıtsız anahtarları güvensiz sayar ve hem **API kısıtı** (anahtarı yalnız bu iki API'ye bağla) hem **uygulama kısıtı** (sunucuda IP adresi, tarayıcıda HTTP referrer) koymayı önerir [RESMÎ]. Google API Koşulları 4(b)'ye göre kimlik bilgileri gizli tutulur ve açık kaynak projelere gömülemez [RESMÎ]. Anahtarı depoya değil ortam değişkenine (ör. `GOOGLE_API_KEY`) koy. Tarayıcıdan doğrudan yapılan çağrı anahtarı görünür kılar; çağrıyı sunucu tarafında yapmak daha güvenlidir [TAHMİN].
- **Kota projeye yazılır**: CrUX kotası Google Cloud projesi başınadır [RESMÎ]. PSI kotası da anahtarın ait olduğu projeden düşer [3. TARAF]; anahtarsız isteğin 429 yanıtındaki `quota_limit: defaultPerDayPerProject` ve `quota_unit: 1/d/{project}` alanları da proje başına günlük bir limit olduğunu gösterir [RESMÎ: API yanıtı].
- **Captcha (PSI)**: SSS'ye göre API'de captcha çıkmasının nedeni paylaşılan bir anahtar kullanmak olabilir; çözüm olarak kendi anahtarını almayı önerir. Yanıttaki `captchaResult` alanı ve `captchaToken` parametresi bu iş içindir [RESMÎ].

## Temel uç noktalar

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed` (eş adres: `https://www.googleapis.com/pagespeedonline/v5/runPagespeed`) | URL'yi Lighthouse ile test eder. Yanıtta `lighthouseResult` (lab), `loadingExperience` (URL'nin CrUX verisi; yetersizse `origin_fallback: true`) ve `originLoadingExperience` (origin'in CrUX verisi) döner | Geliştirici hesabı | Parametreler: `url` (zorunlu), `strategy` (`DESKTOP` varsayılan / `MOBILE`), `category` (tekrarlanabilir; verilmezse yalnız Performance çalışır), `locale`, `utm_campaign`, `utm_source`, `captchaToken`, `key` [RESMÎ]. Sunucu tarafı en uzun süre 120 sn [RESMÎ: sürüm notu 02.03.2021] |
| POST | `https://chromeuxreport.googleapis.com/v1/records:queryRecord` | Bir `origin` ya da `url` için son 28 günün histogramlarını ve p75 değerlerini döner | Geliştirici hesabı | Gövde: `origin` veya `url` (yalnız biri), `formFactor` (`PHONE` / `DESKTOP` / `TABLET`; verilmezse hepsi birleşik), `metrics` (verilmezse hepsi). Her gün ~04:00 UTC güncellenir; veri yoksa `404 NOT_FOUND` döner [RESMÎ] |
| POST | `https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord` | Aynı verinin haftalık zaman serisini döner: `histogramTimeseries`, `percentilesTimeseries.p75s`, `fractionTimeseries`, `collectionPeriods` | Geliştirici hesabı | `collectionPeriodCount` 1–40, varsayılan 25. Her pazartesi ~04:00 UTC güncellenir, veri önceki cumartesiye kadardır. Eksik dönemler `"NaN"` / `null` gelir; kota `queryRecord` ile ortaktır [RESMÎ] |
| SQL | BigQuery: `chrome-ux-report.all.YYYYMM`, `chrome-ux-report.country_CC.YYYYMM`, `chrome-ux-report.materialized.*`, `chrome-ux-report.experimental.*` | Aylık origin verisi; özet tablolar: `metrics_summary`, `device_summary`, `country_summary`, `origin_summary` | Ücretli/kurumsal (ücretsiz katman) | İzleyen ayın ikinci salısı yayımlanır; sayfa düzeyi veri yok [RESMÎ]. Türkiye tablosu `country_tr` kalıbındadır [TAHMİN: `country_CC` adlandırmasından] |
| GET | `https://pagespeedonline.googleapis.com/$discovery/rest?version=v5`, `https://chromeuxreport.googleapis.com/$discovery/rest?version=v1` | Makine okunur API tanımları (Google Discovery) | Herkese açık | 06.11.2026'da ikisinin de revision değeri `20261104`. Bazı açıklamalar eski (aşağıya bak) [RESMÎ] |

### PSI `runPagespeed` ayrıntıları

- **`strategy`**: Mobil test orta segment bir telefonu ve mobil ağı, masaüstü testi kablolu bağlantıyı öykünür [RESMÎ]. Hangi telefonun öykünüldüğü konusunda kaynaklar ayrışıyor: PSI "About" sayfası (son güncelleme 21.10.2024) "Moto G4" der, Lighthouse kaynak kodu (13.6.0) ise "moto g power (2022)" öykünür [ÇELİŞKİLİ; Lighthouse kodu daha güncel]. Test Kuzey Amerika, Avrupa ya da Asya'daki bir veri merkezinde çalışır; hangisi olduğu `lighthouseResult.environment` içinde yazar [RESMÎ].
- **`category`** (tekrarlanabilir: `&category=PERFORMANCE&category=SEO`): `PERFORMANCE`, `ACCESSIBILITY`, `BEST_PRACTICES`, `SEO`, `AGENTIC_BROWSING` [RESMÎ: discovery].
  - `PWA` kategorisi Lighthouse 12 ile (10.05.2024) kaldırıldı ama discovery enum'unda ve .NET istemcisinde hâlâ duruyor; referans sayfası listelemiyor [RESMÎ].
  - `AGENTIC_BROWSING`, Lighthouse 13.2.0'da (01.05.2026) eklenip 13.3.0'da (07.05.2026) varsayılan yapılandırmaya giren bir kategoridir. Sitenin yapay zekâ ajanlarına uygunluğunu denetler: `llms.txt`, WebMCP, ajan erişilebilirlik ağacı, CLS ve ARD şeması (ARD denetimi 13.5.0'da, `ard.json` biçimi 13.6.0'da geldi). Kategori açıklaması "This category is still under development and subject to change" der [RESMÎ: Lighthouse sürüm notları ve `default-config.js`].
  - Bu kategori için ayrı bir PSI sürüm notu yok. Lighthouse 13.4.0 notu "viewer: disable agentic-browsing in PSI api call", 13.4.1 notu (20.07.2026) "viewer: Enabled Agentic Browsing category via PSI API" der; ikisi de Lighthouse Viewer'ın PSI çağrısıyla ilgilidir [RESMÎ]. Kategorinin PSI API'de ilk ne zaman kullanılabildiği belgede yok [TAHMİN]. 06.11.2026'da discovery belgesi değeri listeliyor, resmî PSI referans sayfası listelemiyor [ÇELİŞKİLİ].
- **`locale`** (ör. `tr`): Biçimlenmiş metinlerin dilini belirler [RESMÎ].
- **Yanıt alanları**: `id` (yönlendirmeler sonrasındaki nihai URL), `analysisUTCTimestamp`, `version`, `captchaResult`, `lighthouseResult` (`lighthouseVersion`, `categories.<ad>.score`, `audits`, `environment`, `configSettings`, `runWarnings`, `runtimeError`), `loadingExperience` / `originLoadingExperience` (`metrics`, `overall_category`, `origin_fallback`, `initial_url`) [RESMÎ: discovery ve referans].
- **`loadingExperience.metrics` anahtarları**: `FIRST_CONTENTFUL_PAINT_MS` ve `INTERACTION_TO_NEXT_PAINT` [RESMÎ: get-started örnek kodu ve sürüm notları]; `LARGEST_CONTENTFUL_PAINT_MS` ve `CUMULATIVE_LAYOUT_SHIFT_SCORE` [3. TARAF: GoogleChromeLabs/psi aracının kaynak kodu, 2021'de arşivlendi]; TTFB alan metriği 10.05.2022'den beri API'de deneysel olarak vardır [RESMÎ: sürüm notu]; anahtar adı `EXPERIMENTAL_TIME_TO_FIRST_BYTE` [TAHMİN: CrUX API'deki `experimental_time_to_first_byte` adından; resmî örnekte yok].
  - Her anahtarda `percentile`, `distributions` (iyi, orta ve kötü payları) ve `category` bulunur. `category` değeri `FAST`, `AVERAGE` ya da `SLOW` olur; resmî örnek yanıtta yalnız `FAST` ve `SLOW` görünür [RESMÎ / 3. TARAF].
  - `percentile` 75. yüzdeliktir (PSI About). Discovery açıklaması hâlâ "v5'te pc90" der; bu ifade eskimiştir [ÇELİŞKİLİ].
  - `percentile` şemada tam sayıdır (`integer`). Bu yüzden CLS değeri 100 ile çarpılmış gelir (ör. `5` = 0,05); CrUX API'de ise CLS string olarak gelir [TAHMİN: şemadaki tip ve yaygın kullanım; resmî belgede yazmıyor].
  - Get-started sayfasındaki örnek yanıt (son güncelleme 28.08.2025) hâlâ `FIRST_INPUT_DELAY_MS` içerir. FID 10.09.2024'ten sonra dönmediği için bu örnek eskimiştir [ÇELİŞKİLİ].
- **Lighthouse performans puanı** şu ağırlıklarla hesaplanır (belgedeki en güncel tablo Lighthouse 10 içindir): TBT %30, LCP %25, CLS %25, FCP %10, Speed Index %10. Arayüzdeki bantlar: 0–49 kötü, 50–89 iyileştirilmeli, 90–100 iyi [RESMÎ]. SEO rehberindeki resmî kaynaklara göre bu puan Google sıralamasında kullanılmaz; sıralamada saha verisi esas alınır (ayrıntı: SEO rehberi Bölüm 10 § 2).
- **Değişkenlik**: Her çalıştırma tek bir sentetik testtir; ağ yönlendirmesi, reklam, A/B testi gibi etkenlerle puan oynar [RESMÎ]. PSI'nin CPU yavaşlatma katsayısı 05.12.2024'te üretim ortamının düşük CPU ölçümlerine göre ayarlandı. Resmî not, bunun mobil lab verisinde TBT puanlarını genelde artıracağını, saha verisini ve masaüstünü etkilemeyeceğini söyler; daha eski mobil ölçümlerle karşılaştırırken bunu hesaba kat [RESMÎ: sürüm notu].

### CrUX metrikleri ve eşikler

| CrUX API adı | PSI `loadingExperience` adı | Birim / biçim | İyi / iyileştirilmeli / kötü (p75) |
|---|---|---|---|
| `largest_contentful_paint` | `LARGEST_CONTENTFUL_PAINT_MS` | ms | ≤ 2500 / 2500–4000 / > 4000 |
| `interaction_to_next_paint` | `INTERACTION_TO_NEXT_PAINT` | ms | ≤ 200 / 200–500 / > 500 |
| `cumulative_layout_shift` | `CUMULATIVE_LAYOUT_SHIFT_SCORE` | Birimsiz; CrUX API'de 2 ondalıklı **string** | ≤ 0,1 / 0,1–0,25 / > 0,25 |
| `first_contentful_paint` | `FIRST_CONTENTFUL_PAINT_MS` | ms | ≤ 1800 / 1800–3000 / > 3000 |
| `experimental_time_to_first_byte` | `EXPERIMENTAL_TIME_TO_FIRST_BYTE` | ms (deneysel) | ≤ 800 / 800–1800 / > 1800 |
| `round_trip_time` | — | ms; üç kutulu histogram + p75. Sitenin değil, kullanıcıların bağlantı gecikmesini ölçer | — |
| `navigation_types` | — | Oran: `navigate`, `navigate_cache`, `reload`, `restore`, `back_forward`, `back_forward_cache`, `prerender` | — |
| `form_factors` | — | Oran: `desktop`, `phone`, `tablet`; yalnız `formFactor` verilmediğinde döner | — |
| `largest_contentful_paint_resource_type` ve `largest_contentful_paint_image_*` (dört alt parça) | — | LCP öğesinin türü (metin ya da görsel); görsel LCP için TTFB, kaynak yükleme gecikmesi, yükleme süresi ve render gecikmesi (alt parçalarda histogram yok, yalnız p75) | — |
| `experimental_largest_contentful_paint_with_softnavs`, `experimental_interaction_to_next_paint_with_softnavs`, `experimental_cumulative_layout_shift_with_softnavs` | — | Tek sayfalık uygulamalardaki (SPA) yumuşak gezinmeleri de sayan deneysel varyantlar (13.10.2026'dan beri) | — |
| `experimental_ad_count`, `experimental_ad_density`, `experimental_ad_cpu`, `experimental_ad_kilobytes` | — | Deneysel reklam metrikleri (15.09.2026'dan beri; yalnız p75). Yalnız `ads.txt` dosyasında en az bir yetkili satıcı listeleyen origin'ler için raporlanır; CrUX API, History API ve CrUX Vis'te var, BigQuery'de henüz yok [RESMÎ: Chrome ads belgeleri] | — |

PSI sütunundaki adların kaynağı ve güven düzeyi için yukarıdaki "`loadingExperience.metrics` anahtarları" maddesine bak; CrUX API adları resmî API sayfasından alınmıştır [RESMÎ].

- Eşikler PSI "About" sayfasından alınmıştır [RESMÎ]. Core Web Vitals üç metriktir: LCP, INP ve CLS. Üçünün p75 değeri de "iyi" ise sayfa ya da origin değerlendirmeyi geçer. INP verisi yetersizse LCP ve CLS'nin "iyi" olması yeter; LCP ya da CLS verisi yetersizse değerlendirme yapılamaz [RESMÎ].
- Histogramlar üç kutuludur ve yanıtta `percentiles.p75` bulunur. Ondalıklı değerler 4 haneye yuvarlanır; CLS ise 2 ondalıklı string olarak gelir [RESMÎ].
- **Sorgu ipuçları**: CrUX'taki origin'lerin hepsi küçük harfle saklanır [RESMÎ]. 404 alındığında önce protokol (`https`) ile `www` gibi alt alan adının doğru yazılıp yazılmadığına bak [RESMÎ]. API yönlendirmeleri izlemez, yalnız basit otomatik düzeltmeler yapar; yapılan düzeltme `urlNormalizationDetails` alanında görünür [RESMÎ]. `collectionPeriod` her zaman 28 günlük görünür; sayfanın verisi daha kısa bir süreye ait olsa bile [RESMÎ].

### Kaldırılan ve eskiyen alanlar

| Ne | Ne zaman | Yerine | Not |
|---|---|---|---|
| FID: `first_input_delay` (CrUX), `FIRST_INPUT_DELAY_MS` (PSI) | 12.03.2024'te Core Web Vitals'tan çıktı ve kullanımdan kaldırıldı. Araçlardan çıkarılması 10.09.2024'te ilan edildi; araçların FID'i "önümüzdeki birkaç gün içinde" göstermeyi bırakacağı yazıldı. BigQuery'de son FID verisi 202408 tablosunda; 202409 tablosundan (Ekim 2024) itibaren şemada yok [RESMÎ] | INP (`interaction_to_next_paint`) | Duyurulan son gün 09.09.2024'tü; kaldırmayı ilan eden web.dev yazısı ve CrUX sürüm notu 10.09.2024 tarihlidir ("from today") [RESMÎ]. Tarayıcıda `PerformanceObserver` `first-input` girdileri sürüyor; `web-vitals` 5.0 sürümü `onFID`'i kaldırdı [RESMÎ] |
| `effectiveConnectionType` (ECT) sorgu boyutu | CrUX API'de 10.09.2024, BigQuery'de 11.02.2025 yayımıyla [RESMÎ] | `round_trip_time` (RTT) | [RESMÎ] |
| `EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT` (PSI) | 08.08.2023 | `INTERACTION_TO_NEXT_PAINT` | [RESMÎ] |
| PSI `PWA` kategorisi | Lighthouse 12, 10.05.2024 | — | Enum'da hâlâ var [RESMÎ] |
| CrUX Dashboard (Looker Studio) | Kasım 2025 sonu | CrUX Vis, History API ya da kendi BigQuery bağlantın | [RESMÎ] |
| CrUX saha verisinin PSI API yanıtında yer alması | **Planlandı, tarih yok** | CrUX API / History API | Get-started sayfası, son güncelleme 28.08.2025 [RESMÎ] |

> **Dikkat:** Discovery belgesi ve ondan üretilen istemciler (.NET `Google.Apis.ChromeUXReport.v1` dahil) hâlâ `effectiveConnectionType` alanını gösteriyor. İzinli metrik listesinde de `first_input_delay` ve `experimental_interaction_to_next_paint` var. Resmî API sayfası (son güncelleme 13.10.2026) bunları listelemiyor; esas alınacak kaynak o sayfadır [ÇELİŞKİLİ].

### Örnek istekler

```bash
# PSI: mobil, Performance + SEO kategorileri, Türkçe metinler
curl "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.example.com%2F&strategy=MOBILE&category=PERFORMANCE&category=SEO&locale=tr&key=API_ANAHTARIN"

# CrUX: origin, telefon, üç Core Web Vitals metriği
curl -X POST "https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=API_ANAHTARIN" \
  -H "Content-Type: application/json" \
  -d '{"origin":"https://www.example.com","formFactor":"PHONE","metrics":["largest_contentful_paint","interaction_to_next_paint","cumulative_layout_shift"]}'

# CrUX History: tek URL, 40 haftalık INP serisi
curl -X POST "https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord?key=API_ANAHTARIN" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.example.com/","formFactor":"PHONE","metrics":["interaction_to_next_paint"],"collectionPeriodCount":40}'
```

Kısaltılmış CrUX yanıtı (yapı resmî şemaya uygundur; **sayılar örnektir**, gerçek bir siteye ait değildir):

```json
{
  "record": {
    "key": { "formFactor": "PHONE", "origin": "https://www.example.com" },
    "metrics": {
      "largest_contentful_paint": {
        "histogram": [
          { "start": 0, "end": 2500, "density": 0.81 },
          { "start": 2500, "end": 4000, "density": 0.12 },
          { "start": 4000, "density": 0.07 }
        ],
        "percentiles": { "p75": 2210 }
      },
      "cumulative_layout_shift": { "percentiles": { "p75": "0.05" } }
    },
    "collectionPeriod": {
      "firstDate": { "year": 2026, "month": 10, "day": 8 },
      "lastDate": { "year": 2026, "month": 11, "day": 4 }
    }
  }
}
```

Veri bulunamazsa yanıt şudur: `{"error": {"code": 404, "message": "chrome ux report data not found", "status": "NOT_FOUND"}}` [RESMÎ].

## Gerçek zamanlı / bildirim

- **Webhook, WebSocket, streaming ya da WebSub yoktur** [RESMÎ: belgelerde yok]. Bu API'ler bir olayı bildirmez; yalnız sorulduğunda cevap verir.
- **Güncelleme takvimi** [RESMÎ]:

| Kaynak | Güncelleme | Pencere | Geçmiş | Düzey |
|---|---|---|---|---|
| CrUX API | Her gün ~04:00 UTC; ~2 gün gecikmeli; saat dilimi PST (yaz saati uygulanmaz) | Son 28 gün, kayan ortalama | Yok (History API'ye bak) | Origin + URL |
| CrUX History API | Her pazartesi ~04:00 UTC; veri önceki cumartesiye kadar | Her dönem 28 gün; haftalık dönemler örtüşür | 40 hafta (~10 ay); varsayılan 25 dönem | Origin + URL |
| CrUX Vis | Her pazartesi (History API verisi) | Aynı | 40 hafta | Origin + URL |
| BigQuery | Ayda bir, izleyen ayın ikinci salısı | Aylık tablo (`YYYYMM`) | 2017'den bu yana | Yalnız origin; ülke, cihaz, navigasyon türü |
| PSI (arayüz + API) | Lab testi her çağrıda yeniden çalışır; saha verisi her gün | Saha verisi: 28 gün | Yok | Origin + URL |

- **Güncelleme saatleri için SLA yoktur**; işlem "en iyi çaba" esasıyla yapılır. Günlük güncelleme geldikten sonra aynı gün tekrar sorgulamak aynı sonucu verir; History API'de bu durum bütün hafta sürer [RESMÎ]. Yeni veri gelip gelmediği `collectionPeriod.lastDate` alanından anlaşılır [RESMÎ].
- **Değişiklik duyuruları**:
  - CrUX: aylık [sürüm notları](https://developer.chrome.com/docs/crux/release-notes) ve `chrome-ux-report-announce` Google Grubu [RESMÎ].
  - PSI: [sürüm notları](https://developers.google.com/speed/docs/insights/release_notes) (son kayıt 20.10.2025, Lighthouse 13.0) [RESMÎ]. Sonraki 13.x sürümleri burada listelenmiyor; PSI'de çalışan sürüm yanıttaki `lighthouseResult.lighthouseVersion` alanından okunur [RESMÎ: discovery].
  - Lighthouse: GitHub sürümleri ve `https://github.com/GoogleChrome/lighthouse/releases.atom` Atom akışı (06.11.2026'da erişilebilir) [RESMÎ].

## Neler mümkün

| İş | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Kendi sitenin Google'ın gördüğü saha verisi (origin + URL) | Evet | CrUX `queryRecord`, günde bir yoklama (04:00 UTC'den sonra) | Geliştirici hesabı | Yeterli trafik yoksa 404 [RESMÎ] |
| **Rakip ya da herhangi bir herkese açık sitenin** saha verisi | Evet | Aynı uç nokta; sahiplik doğrulaması yok | Geliştirici hesabı | Yalnız yeterince ziyaret alan, herkese açık ve indekslenebilir sayfalar; veri anonim ve toplu [RESMÎ] |
| Saha verisinde trend (~10 ay, haftalık) | Evet | `queryHistoryRecord` + `collectionPeriodCount: 40`; görsel için CrUX Vis | Geliştirici hesabı (Vis için kimliksiz) | Eksik haftalar `"NaN"` / `null` gelir; sayfaların geçmişi eksik olabilir [RESMÎ] |
| Uzun geçmiş (2017'den beri) ya da ülke kırılımı (ör. Türkiye) | Evet, yalnız origin | BigQuery `chrome-ux-report` (`country_CC`) | Ücretli/kurumsal (ücretsiz katman) | Aylık; sayfa düzeyi yok. CrUX belgesi kredi kartı ister; BigQuery sandbox kartsız sorguya izin verir [ÇELİŞKİLİ] |
| Bir URL'nin lab testi ve iyileştirme önerileri (performans, erişilebilirlik, en iyi uygulamalar, SEO) | Evet | PSI `runPagespeed` | Geliştirici hesabı | URL'yi Google sunucuları açar; internetten erişilemeyen sayfa test edilemez [TAHMİN: işleyişten çıkarım] |
| Yapay zekâ ajanlarına uygunluk denetimi (`llms.txt`, WebMCP) | Evet, deneysel | PSI `category=AGENTIC_BROWSING` ya da Lighthouse 13.3+ | Geliştirici hesabı | Kategori açıklamasındaki uyarı: "This category is still under development and subject to change" (hâlâ geliştiriliyor ve değişebilir) [RESMÎ: Lighthouse 13.2.0 sürüm notu ve `default-config.js`] |
| Yüzlerce ya da binlerce URL'nin toplu lab denetimi | Kısmen | PSI (günlük kota + her çağrı tam test) | Geliştirici hesabı | Lighthouse'u kendi makinende ya da CI'da çalıştırmak daha uygun; kotası yok [TAHMİN] |
| Eşik aşınca uyarı (ör. INP p75 200 ms'yi geçti, CWV "geçti → kaldı") | Kendi tarafında | Günlük yoklama + önceki değerle karşılaştırma + kendi bildirim kanalın | Geliştirici hesabı | Push yok; en sık kontrol günde bir anlamlı [RESMÎ: günlük güncelleme] |
| Dakikalık ya da anlık performans izleme | Hayır (CrUX ile) | — | — | CrUX 28 günlük kayan ortalamadır; anlık izleme için `web-vitals` ile kendi gerçek kullanıcı ölçümün (RUM) gerekir [RESMÎ / TAHMİN] |
| Giriş arkasındaki, iç ağdaki ya da `localhost` sayfaların verisi | Hayır | — | — | CrUX yalnız herkese açık sayfaları kapsar [RESMÎ]; lab testi için Lighthouse'u yerelde çalıştır |
| Tekil kullanıcı ya da oturum verisi | Hayır | — | — | Çıktı yalnız histogram, oran ve p75'tir; her kayıt anonimleştirme için yeterli örnek içermelidir [RESMÎ] |
| iOS, Edge, Firefox ya da Safari kullanıcılarının deneyimi | Hayır (CrUX ile) | — | — | Kapsam dışı (aşağıya bak) [RESMÎ] |
| Search Console Core Web Vitals raporunu (URL grupları) API ile çekmek | Hayır | — | — | Search Console API'de bu rapor yok; mevcut kaynaklar `sites`, `sitemaps`, `searchanalytics`, `urlInspection` ve `urlTestingTools` [RESMÎ: discovery, 06.11.2026] |
| "Yeni gönderi / içerik değişti" takibi | Uygulanamaz | — | — | Bu API'ler içerik değil performans ölçer |

### Veri kapsamı ve sınırlar

- **Dahil olanlar**: Masaüstü Chrome (Windows, macOS, ChromeOS, Linux) ve Android Chrome; Custom Tabs ve WebAPK kullanan Android uygulamaları da dahildir [RESMÎ].
- **Hariç olanlar**: iOS'taki Chrome, WebView kullanan Android uygulamaları ve diğer Chromium tarayıcıları (belgedeki örnek Microsoft Edge) [RESMÎ]. Brave ya da Opera adıyla geçmez, ama "diğer Chromium tarayıcıları" kuralına girer [TAHMİN: kuraldan çıkarım]. Safari ve Firefox Chrome olmadığı için zaten kapsam dışıdır [TAHMİN].
- **Kullanıcı şartları**: Kullanım istatistiği raporlaması açık olmalı, tarama geçmişi senkronize edilmeli ve senkronizasyon parolası (Sync passphrase) tanımlı olmamalıdır. Chrome, bu şartları karşılayan kullanıcıların oranını yayımlamaz [RESMÎ].
- **Sayfa ve origin şartları**: Sayfa herkese açık olarak keşfedilebilir olmalı, yani yönlendirmelerden sonra 200 dönmeli ve `noindex` başlığı ya da etiketi taşımamalıdır. Ayrıca "yeterince popüler" olmalıdır; bu eşiğin rakamı açıklanmaz. Kök sayfası keşfedilemeyen origin veri setine giremez ve elle ekleme yapılamaz [RESMÎ].
- **`noindex` ya da 200 dışı sayfaların origin verisine katkısı**: Metodoloji sayfası (son güncelleme 20.06.2024) bu konuda kendi içinde çelişir [ÇELİŞKİLİ]:
  - "Origin" bölümü, bu deneyimlerin "sayfanın keşfedilebilirliğinden bağımsız olarak" origin düzeyinde toplandığını ve popülerlik şartına sayıldığını yazar.
  - Giriş bölümü ise "User ve Origin şartlarını karşılayıp Page şartını karşılamayan deneyimler origin düzeyindeki veriye dahil edilmez" der.
  - "Origin" bölümündeki ifade daha ayrıntılıdır, ama kesin bilgi sayılmamalıdır [TAHMİN].
- **Tek sayfalık uygulamalar (SPA)**: Yumuşak gezinmeler (soft navigation) ana metriklerde sayılmaz; 13.10.2026'dan beri bunları da sayan `experimental_*_with_softnavs` varyantları vardır [RESMÎ].
- **Kişisel veri**: CrUX çıktısı anonim ve toplu olduğu için tek tek kişileri tanımlamaz [RESMÎ]. Bu yüzden KVKK açısından kişisel veri sayılmaz [TAHMİN: hukuki görüş değildir]. Buna karşılık `web-vitals` ile kendi ziyaretçilerinden IP, oturum ya da kullanıcı kimliğiyle birlikte toplayacağın RUM verisi kişisel veri olabilir [TAHMİN].

### Takip uygulaması için

Bu API'ler bir takip uygulamasında **olay kaynağı değil, ölçüm kaynağıdır**: "yeni gönderi", canlı yayın ya da mesaj gibi olaylar yoktur. Kullanım biçimi şöyle kurulabilir [TAHMİN: mimari önerisi]:

1. İzlenen her origin ya da URL için günde bir kez (örneğin 06:00 UTC'de) CrUX `queryRecord` çağır; `collectionPeriod.lastDate` değiştiyse sonucu kaydet.
2. Eşik geçişlerini (p75 değerinin "iyi" bandından çıkması, CWV durumunun değişmesi) önceki kayıtla karşılaştırarak kendi tarafında bul ve kendi kanalınla bildir (Telegram botu, Discord webhook'u vb.).
3. Haftada bir, pazartesi 04:00 UTC'den sonra History API ile 40 haftalık trendi güncelle.
4. PSI lab testini yalnız değişiklik olduğunda ya da örneklemle çalıştır; pahalıdır ve sonucu çalıştırmadan çalıştırmaya oynar.

### Durum → Sonuç

- **Kendi sitenin anlık ve eksiksiz ölçümü gerekiyor** → `web-vitals` ile kendi RUM'unu ve Lighthouse CI'ı kullan. CrUX 28 gün geriden gelir ve yalnız Chrome kullanıcılarını kapsar.
- **Google'ın gördüğü saha verisi gerekiyor (kendi siten ya da rakip)** → CrUX API'yi günlük kullan; geçmiş için History API'ye geç.
- **Ülke kırılımı ya da 10 aydan eski geçmiş gerekiyor** → BigQuery kullan (yalnız origin, aylık). CrUX belgesi projeye kredi kartı ister; kartsız BigQuery sandbox da denenebilir [TAHMİN: CrUX ile denenmedi; sınırları aşağıda].
- **Site az ziyaret alıyor ve CrUX 404 dönüyor** → PSI lab testi ve kendi RUM'unla ilerle; Search Console da bu durumda "veri yok" der.
- **Çok sayıda URL'yi lab testinden geçireceksin** → Lighthouse ya da Lighthouse CI'ı kendin çalıştır; PSI'yi örneklemle kullan.
- **Yapay zekâ ajanlarına uygunluğu görmek istiyorsun** → PSI `AGENTIC_BROWSING` kategorisini kullan; deneyseldir, sonuçlar değişebilir.

## Hız sınırları ve fiyatlar

- **CrUX** (`queryRecord` ve `queryHistoryRecord` ortak): **150 sorgu/dk/Google Cloud projesi**, ücretsiz. Belgeye göre bu kota ücret ödeyerek artırılamaz; limit ve güncel kullanım Cloud Console'da görünür [RESMÎ]. Günlük bir üst sınır belgede yok.
- Her `queryRecord` / `queryHistoryRecord` isteği tek bir origin ya da URL içindir [RESMÎ]. Birden çok sorgu, Google API'lerinin genel HTTP toplu isteğiyle tek seferde gönderilebilir: `POST https://chromeuxreport.googleapis.com/batch/` (`multipart/mixed`). Resmî GoogleChrome/CrUX deposundaki `crux-api-util.js` bunu `CrUXApiUtil.batch` ile yapar; uç nokta 06.11.2026 denemesinde her alt isteği ayrı yanıtladı [RESMÎ: örnek kod ve deneme]. Toplu istekteki her alt istek kotadan ayrı düşer [TAHMİN: Google'ın diğer API'lerindeki batch kuralı]. **Örnek bütçe**: 50 site × 2 cihaz × 2 çağrı = 200 sorgu; dakikada 150 sınırıyla yaklaşık 2 dakikada biter [TAHMİN: hesap örneği].
- **PSI**: Resmî belgede bir kota rakamı yok [RESMÎ: belgede yok].
  - Üçüncü taraf kaynaklar Cloud Console varsayılanını **25.000 sorgu/gün** ve **240 sorgu/dk** olarak verir; eski gösterimdeki "100 saniyede 400" aynı hızdır [3. TARAF].
  - Kullanıcı başına 100 saniyede 60 diyen bir kaynak da var [ÇELİŞKİLİ].
  - Günlük sayaç Pasifik saatiyle gece yarısı sıfırlanır [3. TARAF].
  - Kendi projendeki kesin değer: Cloud Console → APIs & Services → PageSpeed Insights API → Quotas [3. TARAF].
- **Kota aşımı**: `429 RESOURCE_EXHAUSTED` (`reason: RATE_LIMIT_EXCEEDED`) döner ve yanıt, kota artışı talebi için Cloud belgesine bağlantı verir [RESMÎ: API yanıtı]. İsteği hemen tekrarlama; bekleme süresini her denemede artırarak (exponential backoff) yeniden dene [TAHMİN].
- **PSI süresi**: Her çağrı tam bir Lighthouse çalıştırmasıdır ve sunucu tarafında en fazla 120 sn sürebilir [RESMÎ: sürüm notu]. .NET `HttpClient` varsayılan zaman aşımı 100 sn olduğu için bunu yükselt; Google.Apis istemcisinde bu ayar `BaseClientService.Initializer.HttpClientTimeout`'tur [RESMÎ: Microsoft Learn; Google.Apis v1.78.0 kaynak kodu].
- **Fiyat**: CrUX API ücretsizdir [RESMÎ]. PSI için fiyat tablosu yoktur; faturalandırma gerekmediği bildiriliyor [3. TARAF]. BigQuery'nin ücretsiz katmanı ayda ilk 1 TiB işlenen sorgu verisidir ve her ay yenilenir; üstü on-demand modelde TiB başına 6,25 USD'dir. Herkese açık veri setinde ücreti veri sahibi değil, sorguyu çalıştıran proje öder [RESMÎ: BigQuery fiyatlandırması]. CrUX belgesi projeye kredi kartı tanımlamayı şart koşar ve yeni Cloud kullanıcılarına kayıt kredisi verilebileceğini yazar [RESMÎ]. BigQuery sandbox ise kart ve faturalandırma hesabı olmadan herkese açık veri setlerini sorgulamaya izin verir: ayda 1 TiB sorgu, ömür boyu 10 GiB depolama, tablolar 60 günde silinir [RESMÎ: BigQuery sandbox belgesi, son güncelleme 03.11.2026]. İki belge kart konusunda ayrışıyor [ÇELİŞKİLİ]; CrUX'un sandbox'ta sorgulanması denenmedi. Eski CrUX Dashboard'ı kendi BigQuery bağlantınla kullanırsan her yükleme yaklaşık 13 GB tüketir; bu, ücretsiz katmanda ayda yaklaşık 80 yükleme demektir [RESMÎ].
- **Kullanım şartları**: PSI ve CrUX sayfalarında API'ye özel ek bir şart bulunamadı. Genel [Google API Koşulları](https://developers.google.com/terms) geçerlidir [TAHMİN: sayfalarda doğrudan atıf görülmedi; APIs.guru dönüşümü `termsOfService` olarak bu adresi gösteriyor].

## Resmî olmayan yollar ve riskler

| Yol | Nasıl çalışır | Risk |
|---|---|---|
| **PSI web arayüzünü kazımak** (`pagespeed.web.dev`) | Headless bir tarayıcıyla rapor sayfasını açıp ayrıştırmak | Arayüz captcha gösterebilir [RESMÎ: SSS]; sayfa yapısı değişince kırılır. Ücretsiz resmî API varken gereksizdir |
| **Kotayı aşmak için çok sayıda Cloud projesi ya da anahtar** | İstekleri projelere dağıtmak | Google API Koşulları 2(d): her API için belgelenen sınırlar atlatılmaya çalışılmaz ("will not attempt to circumvent"); sınırın üstünde kullanım için Google'ın açık onayı gerekir [RESMÎ]. Proje ya da anahtar askıya alınabilir [TAHMİN] |
| **Başkasının anahtarını kullanmak** (açık depolarda ya da istemci kodunda bulunan) | — | Koşullar 4(b): kimlik bilgileri gizlidir ve açık kaynağa gömülemez [RESMÎ]. Kota ve sorumluluk anahtar sahibine düşer; etik ve hukuki risk taşır |
| **Üçüncü taraf toplu izleme servisleri** | Kendi anahtarlarıyla CrUX/PSI sorgulayıp panel ve uyarı sunarlar | Resmî olmayan sayılmaz, ama aynı veriyi aracı olarak sunarlar; güncellik, kota ve ücret sağlayıcıya bağlıdır [TAHMİN] |

**Sonuç:** Bu API'ler için resmî olmayan bir yola ihtiyaç yok. Anahtar ücretsizdir ve kota çoğu iş için yeter. Lab testinde kota yetmezse Lighthouse'u kendin çalıştır (Apache-2.0 lisanslı, kota yok); saha verisi için CrUX API ve BigQuery yeterlidir.

## SDK ve kütüphaneler

| Ad | Dil | Tür | Not |
|---|---|---|---|
| `Google.Apis.PagespeedInsights.v5` (NuGet) | C# / .NET | **Resmî** (Google LLC, `google-apis-packages`) | 1.78.0.4197, 03.11.2026. Hedefler: net6.0, netstandard2.0, net462. `PagespeedInsightsService` → `Pagespeedapi.Runpagespeed(url)`; kategori enum'unda `CategoryEnum.AGENTICBROWSING` (`AGENTIC_BROWSING`) var. Discovery belgesinden otomatik üretilir [RESMÎ] |
| `Google.Apis.ChromeUXReport.v1` (NuGet) | C# / .NET | **Resmî** (Google LLC) | 1.78.0.3751, 03.11.2026. `ChromeUXReportService` → `Records.QueryRecord(...)` ve `Records.QueryHistoryRecord(...)`; günlük ve History API'nin ikisini de kapsar. Sınıflarda kaldırılmış `EffectiveConnectionType` hâlâ duruyor, kullanma [RESMÎ: kaynak kod] |
| `HttpClient` + `System.Text.Json` | C# | — | Paket eklemek istemeyenler için: CrUX tek bir JSON POST, PSI tek bir GET isteğidir |
| `googleapis` (npm) | Node.js / TypeScript | **Resmî** | 189.0.0, 30.10.2026; `pagespeedonline` (v5) ve `chromeuxreport` (v1) modülleri var [RESMÎ] |
| `google-api-python-client` (PyPI) | Python | **Resmî** | 2.201.0, 30.09.2026; discovery tabanlıdır: `build("pagespeedonline", "v5", developerKey=...)`, `build("chromeuxreport", "v1", developerKey=...)` [RESMÎ; kullanım biçimi TAHMİN] |
| `lighthouse` (npm) | Node.js (CLI ve modül) | **Resmî** (GoogleChrome), Apache-2.0 | 13.6.0, 27.10.2026. PSI'nin kullandığı motordur; yerelde ve CI'da kotasız lab testi yapar |
| `@lhci/cli` (Lighthouse CI) | Node.js | **Resmî** (GoogleChrome), Apache-2.0 | 0.16.0, 02.11.2026; CI'da eşik koyup (assert) gerilemeyi yakalar |
| `web-vitals` (npm) | JavaScript | **Resmî** (GoogleChrome), Apache-2.0 | 6.2.3, 05.10.2026; kendi RUM ölçümün için. `onFID` 5.0 sürümünde kaldırıldı [RESMÎ] |
| `crux-api` (npm, treosh) | JavaScript / TypeScript | Üçüncü taraf, MIT | 4.1.0, 07.04.2026; record ve history API'lerini sarar, hata yönetimi ve tip tanımları sunar [3. TARAF] |
| `CrUXApiUtil` | JavaScript | Resmî örnek kod | "How to use the CrUX API" kılavuzundaki küçük yardımcı fonksiyon. GitHub'daki genişletilmiş sürümü (`GoogleChrome/CrUX`, `js/crux-api-util.js`) History API ve toplu istek (`batch`) desteği de içerir [RESMÎ] |

### .NET örneği

Paketler:

```bash
dotnet add package Google.Apis.ChromeUXReport.v1
dotnet add package Google.Apis.PagespeedInsights.v5
```

Önce CrUX'tan bir origin'in telefon p75 değerleri alınır (veri yoksa 404 yakalanır), sonra aynı sayfa PSI ile mobil lab testinden geçirilir. Anahtar ortam değişkeninden okunur. `System.Environment` tam adıyla yazılmıştır, çünkü PSI paketinin `Data` ad alanında da `Environment` adlı bir sınıf vardır. Zaman aşımı, PSI'nin 120 saniyelik üst sınırını aşacak şekilde 150 saniyeye çıkarılmıştır.

```csharp
using System.Net;
using Google;
using Google.Apis.ChromeUXReport.v1;
using Google.Apis.ChromeUXReport.v1.Data;
using Google.Apis.PagespeedInsights.v5;
using Google.Apis.Services;

var init = new BaseClientService.Initializer
{
    ApiKey = System.Environment.GetEnvironmentVariable("GOOGLE_API_KEY"),
    ApplicationName = "performans-izleyici",
    HttpClientTimeout = TimeSpan.FromSeconds(150)
};

var crux = new ChromeUXReportService(init);
try
{
    var cevap = await crux.Records.QueryRecord(new QueryRequest
    {
        Origin = "https://www.example.com",
        FormFactor = "PHONE",
        Metrics = new[] { "largest_contentful_paint", "interaction_to_next_paint", "cumulative_layout_shift" }
    }).ExecuteAsync();

    var son = cevap.Record.CollectionPeriod.LastDate;
    Console.WriteLine($"Son gün: {son.Year}-{son.Month:00}-{son.Day:00}");
    foreach (var metrik in cevap.Record.Metrics)
        Console.WriteLine($"{metrik.Key}: p75 = {metrik.Value.Percentiles?.P75}");
}
catch (GoogleApiException ex) when (ex.HttpStatusCode == HttpStatusCode.NotFound)
{
    Console.WriteLine("CrUX verisi yok (404): trafik yetersiz ya da origin yanlış yazılmış.");
}

var psi = new PagespeedInsightsService(init);
var istek = psi.Pagespeedapi.Runpagespeed("https://www.example.com/");
istek.Strategy = PagespeedapiResource.RunpagespeedRequest.StrategyEnum.MOBILE;
var sonuc = await istek.ExecuteAsync();
Console.WriteLine($"Lighthouse {sonuc.LighthouseResult.LighthouseVersion} · performans: {sonuc.LighthouseResult.Categories.Performance.Score}");
```

Sınıf, özellik ve enum adları 06.11.2026'da Google'ın üretilmiş kaynak kodundan (google-api-dotnet-client, v1.78.0) kontrol edildi. Örnek aynı gün yukarıdaki paket sürümleri ve `net8.0` hedefiyle uyarısız derlendi. Anahtarsız çalıştırıldığında `Google.GoogleApiException` fırlattı (`HttpStatusCode` = `Forbidden`, 403); yani yakalanan istisna türü ve filtre doğrudur. Geçersiz bir anahtarla aynı istisna `HttpStatusCode` = `BadRequest` (400, "API key not valid") ile geldi (06.11.2026 denemesi). Kota dolarsa 429 da aynı istisna türüyle gelir [TAHMİN: 429 için denenmedi]. Gerçek bir anahtarla dönen değerler ayrıca denenmedi.

## Postman / OpenAPI / koleksiyonlar

- **Resmî Discovery belgeleri** (JSON, makine okunur):
  - `https://pagespeedonline.googleapis.com/$discovery/rest?version=v5`
  - `https://chromeuxreport.googleapis.com/$discovery/rest?version=v1`
  - 06.11.2026'da ikisinin de revision değeri `20261104`'tür. Resmî istemci kütüphaneleri bu belgelerden üretilir [RESMÎ].
  - Açıklama metinlerinin bir kısmı eskidir: CrUX tarafında FID, `experimental_interaction_to_next_paint` ve `effectiveConnectionType` hâlâ geçer; PSI tarafında `percentile` alanı için "pc90" yazar [ÇELİŞKİLİ].
- **API Explorer** [RESMÎ]: PSI get-started sayfası, kod yazmadan deneme için API Explorer'a yönlendirir. CrUX API sayfasının başında da gömülü bir API Explorer ("Try it!") vardır. Gezginin tam ekranda curl, HTTP ve JavaScript örnekleri üretmesi aracın genel özelliğidir [TAHMİN: sayfa metninde yazmıyor].
- **OpenAPI**: Resmî bir OpenAPI dosyası yok. APIs.guru, discovery belgelerini OpenAPI 3.0'a dönüştürür [3. TARAF]:
  - `https://api.apis.guru/v2/specs/googleapis.com/pagespeedonline/v5/openapi.yaml`
  - `https://api.apis.guru/v2/specs/googleapis.com/chromeuxreport/v1/openapi.yaml`
  - 06.11.2026 kontrolünde PSI dönüşümü güncel discovery'nin gerisindeydi (`AGENTIC_BROWSING` yok).
- **Postman**: Resmî bir Postman koleksiyonu bulunamadı. OpenAPI dosyası Postman'e "Import" ile alınabilir [TAHMİN].
- **Değişiklik takibi**: CrUX ve PSI sürüm notları, `chrome-ux-report-announce` grubu ve Lighthouse GitHub sürümleri (yukarıda, "Gerçek zamanlı / bildirim" bölümünde).

## Depoda ilgili sayfalar

- [SEO rehberi](../../Rehberler/SEO/): Core Web Vitals eşiklerini, Google'ın sıralamada saha verisini (CrUX) kullanıp Lighthouse puanını kullanmadığını ve ölçüm araçlarını anlatır. Bu API dosyası, oradaki araçların programatik karşılığıdır.
  - [Bölüm 10 § 3 · Ölçüm: saha verisi ve laboratuvar verisi](../../Rehberler/SEO/10-performans-mobil-js.html#olcum): CrUX kapsamı, lab ve saha farkı, araç tablosu. FID → INP değişikliği aynı sayfanın [§ 1](../../Rehberler/SEO/10-performans-mobil-js.html#cwv-nedir) bölümünde.
  - [Bölüm 15 § 8 · Hız araçları](../../Rehberler/SEO/15-araclar-ve-olcum.html#hiz-araclari): PSI, Search Console CWV raporu, CrUX (API, BigQuery, CrUX Vis), Lighthouse ve `web-vitals` karşılaştırması.
  - [arastirma.md](../../Rehberler/SEO/arastirma.md): Rehberin yapay zekâ için özeti; ilgili kısımlar § 9 "Hız, mobil ve JavaScript" ve § 14 "Araçlar ve ölçüm".
- [JavaScript ekosistemi ve araçlar · § 16 İzleme, analiz ve performans](../../Programlama/JavaScript-TypeScript/04-ekosistem-ve-araclar/index.html#izleme-analiz): `web-vitals` ve Lighthouse; CrUX'ta verisi olmayan site için kendi RUM ölçümünü kurmanın başlangıcı.
- [HTML · § 11 SEO ve sayfa performansı](../../Programlama/HTML-CSS/01-html/index.html#seo): Core Web Vitals'ın HTML tarafı (başlık, meta ve render konuları).
- Aynı klasördeki diğer arama motoru API sayfaları karşılaştırma için kullanılabilir.

## Kaynaklar

**Resmî**

- [PageSpeed Insights API – Get Started](https://developers.google.com/speed/docs/insights/v5/get-started): Anahtarın "önerildiği" cümlesi, örnek istekler, CrUX verisinin API'den çıkarılacağı notu; son güncelleme 28.08.2025 (erişim: 6 Kasım 2026).
- [About PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about): Eşikler, 75. yüzdelik, origin'e geri düşme, CWV geçme kuralı, öykünülen cihaz; son güncelleme 21.10.2024 (erişim: 6 Kasım 2026).
- [runPagespeed referansı](https://developers.google.com/speed/docs/insights/rest/v5/pagespeedapi/runpagespeed): Parametreler, enum'lar, yanıt alanları, OAuth kapsamı; son güncelleme 03.09.2024 (erişim: 6 Kasım 2026).
- [PageSpeed Insights release notes](https://developers.google.com/speed/docs/insights/release_notes): 120 sn zaman aşımı, INP ve TTFB alanları, 30 gün geçerli paylaşım bağlantısı, Lighthouse 12/13, CPU yavaşlatma değişikliği; son kayıt 20.10.2025 (erişim: 6 Kasım 2026).
- [PageSpeed Insights FAQ](https://developers.google.com/speed/docs/insights/faq): Captcha ve paylaşılan anahtar; son güncelleme 03.09.2024 (erişim: 6 Kasım 2026).
- [CrUX API](https://developer.chrome.com/docs/crux/api): Uç nokta, metrik listesi, 150 sorgu/dk, günlük 04:00 UTC güncellemesi; son güncelleme 13.10.2026 (erişim: 6 Kasım 2026).
- [CrUX History API](https://developer.chrome.com/docs/crux/history-api): `queryHistoryRecord`, 25/40 dönem, pazartesi güncellemesi, `NaN`/`null`; son güncelleme 11.04.2025 (erişim: 6 Kasım 2026).
- [How to use the CrUX API](https://developer.chrome.com/docs/crux/guides/crux-api): 404 hata gövdesi, hata ayıklama ipuçları, `CrUXApiUtil`; son güncelleme 25.06.2020 (erişim: 6 Kasım 2026).
- [GoogleChrome/CrUX – `crux-api-util.js`](https://github.com/GoogleChrome/CrUX/blob/main/js/crux-api-util.js): Kılavuzun bağlantı verdiği genişletilmiş örnek; History API ve `/batch/` toplu istek desteği (erişim: 6 Kasım 2026).
- [How to use the CrUX History API](https://developer.chrome.com/docs/crux/guides/history-api): Dönemlerin cumartesi bitmesi, eksik veri gösterimi (erişim: 6 Kasım 2026).
- [CrUX methodology](https://developer.chrome.com/docs/crux/methodology): Platformlar, kullanıcı/origin/sayfa uygunluğu, origin verisine ilişkin çelişkili cümleler; son güncelleme 20.06.2024 (erişim: 6 Kasım 2026).
- [CrUX metrics](https://developer.chrome.com/docs/crux/methodology/metrics): Metrikler, navigasyon türleri, reklam ve soft navigation metrikleri; son güncelleme 13.10.2026 (erişim: 6 Kasım 2026).
- [Chrome ad metrics](https://developer.chrome.com/docs/ads/metrics) ve [ad measurement methodology](https://developer.chrome.com/docs/ads/methodology): CrUX reklam metriklerinin bulunduğu araçlar, BigQuery'de henüz olmaması, `ads.txt` şartı; son güncelleme 15.09.2026 (erişim: 6 Kasım 2026).
- [CrUX tools](https://developer.chrome.com/docs/crux/methodology/tools): Araçların güncelleme sıklığı, geçmiş ve düzey karşılaştırması; son güncelleme 09.09.2025 (erişim: 6 Kasım 2026).
- [CrUX on BigQuery](https://developer.chrome.com/docs/crux/bigquery): Proje ve tablo yapısı, ikinci salı yayımı, ücretsiz katman ve kredi kartı şartı; son güncelleme 13.10.2026 (erişim: 6 Kasım 2026).
- [BigQuery sandbox](https://docs.cloud.google.com/bigquery/docs/sandbox) ve [BigQuery fiyatlandırması](https://docs.cloud.google.com/bigquery/pricing): Kart ve faturalandırma hesabı olmadan herkese açık veri setini sorgulama, sandbox sınırları, ayda 1 TiB ücretsiz sorgu, on-demand TiB fiyatı; sandbox sayfası son güncelleme 03.11.2026 (erişim: 6 Kasım 2026).
- [CrUX Vis belgesi](https://developer.chrome.com/docs/crux/vis) ve [CrUX Vis](https://cruxvis.withgoogle.com/): History API görselleştirmesi, 40 hafta (erişim: 6 Kasım 2026).
- [CrUX release notes](https://developer.chrome.com/docs/crux/release-notes): FID ve ECT'nin kaldırılması (10.09.2024), RTT, soft navigation metrikleri (13.10.2026), Dashboard'ın kapanması (erişim: 6 Kasım 2026).
- [CrUX Dashboard deprecation](https://developer.chrome.com/blog/crux-dashboard-deprecation): Looker Studio panosunun Kasım 2025 sonunda kapanması, ~13 GB/yükleme, 1 TB ücretsiz katman; 09.09.2025 (erişim: 6 Kasım 2026).
- [CrUX feedback and support](https://developer.chrome.com/docs/crux/feedback): Duyuru ve tartışma grupları (erişim: 6 Kasım 2026).
- [web.dev – Chrome ends support for First Input Delay](https://web.dev/blog/fid): FID'in Chrome araçlarından kaldırılması; 10.09.2024 (erişim: 6 Kasım 2026).
- [web.dev – INP is officially a Core Web Vital](https://web.dev/blog/inp-cwv-launch): INP'nin FID'in yerini alması, 09.09.2024 son günü (erişim: 6 Kasım 2026).
- [Lighthouse performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring): Metrik ağırlıkları ve puan bantları (erişim: 6 Kasım 2026).
- [Lighthouse GitHub releases](https://github.com/GoogleChrome/lighthouse/releases): 13.2.0–13.6.0, Agentic Browsing kategorisi ve PSI API'de açılması (erişim: 6 Kasım 2026).
- [Lighthouse `constants.js`](https://github.com/GoogleChrome/lighthouse/blob/main/core/config/constants.js): Mobil öykünme (moto g power (2022)) ve ağ ayarı (erişim: 6 Kasım 2026).
- [Lighthouse `default-config.js`](https://github.com/GoogleChrome/lighthouse/blob/main/core/config/default-config.js): Agentic Browsing kategorisinin denetimleri ve "still under development" açıklaması (erişim: 6 Kasım 2026).
- [PSI discovery belgesi](https://pagespeedonline.googleapis.com/$discovery/rest?version=v5) ve [CrUX discovery belgesi](https://chromeuxreport.googleapis.com/$discovery/rest?version=v1): Revision 20261104 (erişim: 6 Kasım 2026).
- [Search Console API discovery belgesi](https://searchconsole.googleapis.com/$discovery/rest?version=v1): Core Web Vitals raporunun API'de olmadığının kontrolü (erişim: 6 Kasım 2026).
- [Google APIs Terms of Service](https://developers.google.com/terms): 2(d) kullanım sınırları ve sınır üstü için onay, 4(b) kimlik bilgilerinin gizliliği; son değişiklik 09.11.2021 (erişim: 6 Kasım 2026).
- [Google Cloud – Manage API keys](https://docs.cloud.google.com/docs/authentication/api-keys): API ve uygulama kısıtı önerisi (erişim: 6 Kasım 2026).
- [Microsoft Learn – HttpClient.Timeout](https://learn.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.timeout): Varsayılan 100 sn (erişim: 6 Kasım 2026).
- NuGet: [Google.Apis.PagespeedInsights.v5](https://www.nuget.org/packages/Google.Apis.PagespeedInsights.v5) ve [Google.Apis.ChromeUXReport.v1](https://www.nuget.org/packages/Google.Apis.ChromeUXReport.v1); kaynak: [google-api-dotnet-client](https://github.com/googleapis/google-api-dotnet-client) (erişim: 6 Kasım 2026).
- npm / PyPI: [googleapis](https://www.npmjs.com/package/googleapis), [lighthouse](https://www.npmjs.com/package/lighthouse), [@lhci/cli](https://www.npmjs.com/package/@lhci/cli), [web-vitals](https://www.npmjs.com/package/web-vitals), [google-api-python-client](https://pypi.org/project/google-api-python-client/) (erişim: 6 Kasım 2026).

**Üçüncü taraf**

- [Unlighthouse – PageSpeed Insights API Rate Limits](https://unlighthouse.dev/learn-lighthouse/pagespeed-insights-api/rate-limits): 25.000/gün, ~240/dk, API anahtarı başına 60/100 sn; sayfa tarihi 18.01.2025 (erişim: 6 Kasım 2026).
- [Improvado – Google PageSpeed](https://improvado.io/docs/google-pagespeed): 25.000/gün ve 240/dk/proje, kotanın anahtarın ait olduğu projeye yazılması; güncelleme 18.09.2026 (erişim: 6 Kasım 2026).
- [APIs.guru – PSI OpenAPI](https://api.apis.guru/v2/specs/googleapis.com/pagespeedonline/v5/openapi.yaml) ve [CrUX OpenAPI](https://api.apis.guru/v2/specs/googleapis.com/chromeuxreport/v1/openapi.yaml): Discovery'den dönüştürülmüş OpenAPI 3.0 (erişim: 6 Kasım 2026).
- [crux-api (npm)](https://www.npmjs.com/package/crux-api): Treosh'un CrUX sarmalayıcısı, 4.1.0 (erişim: 6 Kasım 2026).
- [GoogleChromeLabs/psi](https://github.com/GoogleChromeLabs/psi): PSI API'yi komut satırından çağıran arşivlenmiş araç (Apache-2.0, son değişiklik 2021); kaynak kodunda `LARGEST_CONTENTFUL_PAINT_MS` ve `CUMULATIVE_LAYOUT_SHIFT_SCORE` anahtar adları geçer (erişim: 6 Kasım 2026).
