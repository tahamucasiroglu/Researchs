# Google Ads API

> Yazılma tarihi: 6 Kasım 2026 · Son doğrulama: 6 Kasım 2026 · Durum: **aktif** (resmî API var, kullanımı ücretsiz; yalnızca erişim iznin olan reklam hesaplarında çalışır; developer token 9 Eylül 2026'da kaldırıldı, erişim seviyesi Google Cloud projesine bağlı)

## Özet

Google Ads API, Google Ads reklam hesaplarını kodla yönetmek için Google'ın resmî arayüzüdür. Kampanya, reklam grubu, reklam, anahtar kelime ve bütçe oluşturup değiştirmek, GAQL (Google Ads Query Language) ile rapor çekmek, dönüşüm yüklemek ve Anahtar Kelime Planlayıcı (Keyword Planner) verisi almak bu API ile yapılır [RESMÎ]. API gRPC tabanlıdır ve REST bağlamaları da vardır. Adres `googleads.googleapis.com`'dur; sürüm yolun içinde yazılır (`/v26/...`) [RESMÎ]. Kullanımı ücretsizdir ("The Google Ads API is free to use"); asıl maliyet reklam bütçesidir [RESMÎ].

**9 Eylül 2026'dan beri developer token yok.** Erişim seviyesi (Test, Explorer, Basic, Standard), OAuth kimlik bilgilerinin üretildiği Google Cloud projesine bağlıdır. Başvuru, Google Ads yönetici (MCC) hesabındaki API Center'dan değil, Cloud Console'daki "Google Ads API Overview" sayfasından yapılır; yönetici hesabı da artık şart değildir [RESMÎ].

API yalnızca **erişim iznin olan** hesaplarda çalışır. Rakiplerin reklamlarını görmenin resmî yolu Google Ads API değil, **Ads Transparency Center**'dır (AEA ve Türkiye verisi için ayrıca API erişimi vardır, aşağıya bak). 2026'da üç önemli değişiklik daha oldu [RESMÎ]:

- 5 Ağustos 2026'dan itibaren yeni refresh token üretmek passkey ister.
- Customer Match ve çevrimdışı tıklama dönüşümü yüklemeleri, yeni entegrasyonlar için **Data Manager API**'ye taşındı.
- Developer Policies, üçüncü taraf "programatik proxy"leri (paylaşılan aracı API'ler, barındırılan MCP sunucuları) yasakladı.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Herkese açık (kimliksiz)** | — | Veri API'si yok. Kimliksiz açık olanlar belgeler, REST Discovery belgesi ve GitHub `googleapis/googleapis` deposundaki proto tanımlarıdır [RESMÎ]. Başkalarının reklamları [Ads Transparency Center](https://adstransparency.google.com/) web sitesinde görülür; bu bir API değildir [RESMÎ] | — |
| **Geliştirici hesabı: Test** | Google Cloud projesi, projede Google Ads API'yi etkinleştirmek ve aynı projede bir OAuth istemcisi ya da servis hesabı [RESMÎ]. Test hesapları için ayrı bir **test yönetici hesabı** hiyerarşisi gerekir; bu hiyerarşi, üretimdeki yönetici hesaba bağlı olmayan bir Google hesabıyla kurulur [RESMÎ] | Yalnızca **test hesapları**: API uçtan uca denenebilir. Test hesapları reklam yayınlamaz; gösterim, tıklama ve maliyet metrikleri boş döner. Bir test yönetici hesabının altında en çok 50 test hesabı olabilir; fatura gerekmez [RESMÎ] | Ücretsiz; günde 15.000 işlem (yalnızca test hesaplarında). Üretim hesabına yapılan çağrı v25 ve sonrasında `CLOUD_PROJECT_NOT_APPROVED_FOR_PRODUCTION`, eski sürümlerde `ACTION_NOT_PERMITTED` hatası döner [RESMÎ] |
| **Geliştirici hesabı: Explorer** | Cloud Console → Google Ads API Overview sayfasından başvuru. Google'a göre "çoğu durumda otomatik inceleme ve onay" uygulanır [RESMÎ] | Gerçek (üretim) hesaplarda raporlama ile kampanya, reklam ve anahtar kelime yönetimi. **Kapalı olanlar:** hesap oluşturma (`CustomerService.CreateCustomerClient`), kullanıcı yönetimi, planlama servisleri (`KeywordPlanIdeaService` dahil Anahtar Kelime Planlayıcı, `ReachPlanService`, `AudienceInsightsService`), faturalama ve ödeme servisleri [RESMÎ] | Ücretsiz; üretim hesaplarında **günde 2.880 işlem**, test hesaplarında 15.000 [RESMÎ] |
| **İşletme/uygulama onayı: Basic** | Cloud projesi için **marka doğrulaması** (yeni başvurularda zorunlu) ve Overview sayfasından başvuru. Marka doğrulaması için herkese açık bir ana sayfa, Search Console'da doğrulanmış bir alan adı ve aynı alan adında bir gizlilik politikası gerekir; inceleme genelde birkaç dakika sürer, elle incelemede 2–3 iş günü [RESMÎ]. Marka doğrulamasından sonra Basic başvurusu "dakikalar içinde" otomatik incelenir [RESMÎ] | Explorer'daki kısıtlar kalkar: Anahtar Kelime Planlayıcı, hesap oluşturma, kullanıcı ve fatura servisleri dahil tüm servisler açılır [RESMÎ] | Ücretsiz; test ve üretim hesaplarında **günde 15.000 işlem** [RESMÎ] |
| **İşletme/uygulama onayı: Standard** | Marka doğrulaması ve **ayrıntılı elle denetim**. Google aracın işlevini ve hedef kitlesini sorar; dış kullanıcılara açık araçlarda demo girişi isteyebilir; Uyum (Compliance) ekibi e-postayla döner [RESMÎ]. Süre, erişim seviyeleri tablosunda **10 iş günü**; "Access levels and RMF" sayfasında ise "birkaç iş günü, bazen birkaç hafta" ("several business days or sometimes weeks") diye geçer [RESMÎ]. Planlamada birkaç hafta pay bırak [TAHMİN: öneri] | Günlük işlem sınırı yoktur. Buna karşılık izinli kullanım (permissible use) şu üç sınıftan birine bağlanır [RESMÎ]: (1) reklam oluşturma ve yönetme (tüm servisler); (2) yalnızca raporlama (`Search`, `SearchStream` ve salt okuma çağrıları); (3) anahtar kelime ve öneri araştırması (`RecommendationService`, `KeywordPlanIdeaService`, `KeywordPlanService`). İzinli kullanımı değiştirmek ya da aracı müşterilere açmak için Tool Change Form doldurulur; erişim seviyeleri sayfası bu forma bağlantı verir. **RMF** (Required Minimum Functionality: araç türüne göre zorunlu asgari işlevler) yalnızca Standard projelerine uygulanır [RESMÎ] | Ücretsiz; servis bazlı hız sınırları sürer. RMF ihlali uyumsuzluk ücreti doğurabilir (aşağıya bak) [RESMÎ] |
| **İşletme onayı: allowlist / pilot** | Google'ın seçtiği hesaplar ya da projeler | Auction Insights metrikleri (`metrics.auction_insight_search_*`, belgedeki ifadeyle "not publicly available") [RESMÎ]. Customer Match yüklemesi (1 Nisan 2026'dan beri) ve çevrimdışı tıklama dönüşümü yüklemesi (15 Haziran 2026'dan beri) yalnızca belirli bir tarih aralığında bu özelliği kullanmış projelere açık [RESMÎ]. Dönüşüm yüklemesindeki IP adresi ve oturum özelliği alanları da yalnızca allowlist'tekilere açık [RESMÎ]. Ayrıca barındırılan MCP uç noktası ve yönetici hesabı için güvenli erişim pilotları var [RESMÎ] | Başvuru yolu çoğunda belgede yok. Google Ads API ekibi, Auction Insights allowlist programının kapalı olduğunu Haziran 2025'te forumda yazdı [3. TARAF: Google'ın kendi forumu] |
| **Ücretli / kurumsal** | — | API'nin ücretli bir katmanı yoktur; Standard da ücretsizdir [RESMÎ] | Maliyet reklam harcamasıdır (Google Ads faturası). RMF kapsamındaki Standard projelerde ihlal olursa uyumsuzluk ücreti alınır: 25.000 işlem ya da arama isteği başına 1 USD; fatura başına en az 1.000, en çok 25.000 USD; bir inceleme döngüsünde toplam en çok 50.000 USD [RESMÎ] |
| **Resmî olmayan** | Kazıma ya da paylaşılan aracı (proxy) hizmet | Ads Transparency Center'ı ve Google Arama sayfalarını kazıyan üçüncü taraf servisler; başkasının erişimini paylaşan proxy ve MCP hizmetleri | Developer Policies'e göre Google Arama'yı kazımak, kazınmış veri satın almak ve programatik proxy üzerinden erişim vermek yasaktır; erişimin düşürülmesi ya da sonlandırılması ve uyumsuzluk ücreti riski vardır [RESMÎ] |

### Erişim nasıl alınır (9 Eylül 2026 sonrası)

1. Bir Google Cloud projesi aç ve Google Ads API'yi etkinleştir. Proje böylece **Test** erişimi alır [RESMÎ].
2. Aynı projede kimlik bilgisini oluştur [RESMÎ]:
   - servis hesabı (kendi hesapların için önerilen yol),
   - masaüstü tipi OAuth istemcisi (tek kullanıcı),
   - web ya da masaüstü OAuth istemcisi (çok kullanıcılı uygulama).
3. [Google Ads API Overview](https://console.cloud.google.com/google/ads-apis/overview) sayfasından Explorer'a başvur; başvuru çoğu durumda otomatik onaylanır [RESMÎ].
4. Anahtar Kelime Planlayıcı ya da hesap oluşturma gerekiyorsa veya günde 2.880 işlem yetmiyorsa marka doğrulamasını tamamlayıp Basic'e başvur. Sınırsız kullanım ve dış müşterilere açık bir araç için Standard'a başvur [RESMÎ].
5. Erişim seviyesini yönetmek için projede Owner, Editor, Quota Administrator ya da Service Usage Admin rolü gerekir [RESMÎ].

Notlar [RESMÎ]:

- Belgeler developer token'ın kapanış tarihini 9 Eylül 2026 olarak verir; Ads Developer Blog duyurusu (10.09.2026) değişikliğin o gün yayılmaya başladığını yazar.
- API Center'dan başlatılan başvurular artık işlenmez. 9 Eylül 2026'dan önce bekleyen Basic başvuruları kapatıldı; yeniden başvurmak gerekir.
- Onaylı developer token'ların erişim seviyesi, son 90 günün API çağrı kayıtlarında token'la birlikte kullanılmış tüm Cloud projelerine otomatik aktarıldı. Hiç kullanılmamış onaylı bir token artık kullanılamaz. Token'ı yeni bir projeye bağlamak da 9 Eylül 2026'dan beri desteklenmiyor; yeni proje Overview sayfasından kendisi başvurur.
- Bilinen sorunlar (6.11.2026):
  - Ücretsiz deneme (free trial) faturalı ya da faturası askıya alınmış projelerin Explorer veya Basic başvurusu reddedilebiliyor.
  - 9 Eylül'den sonra seviyesi yükseltilen bazı projeler üretim hesaplarında `AUTHORIZATION_ERROR` alıyor. Düzeltme yayılıyor; geçici çözüm, yeni bir projede Explorer'a başvurmaktır.
- Art arda 90 gün kullanılmayan erişim geri alınabilir; sonra yeniden başvurulabilir.
- Her entegrasyon Google'a kendi Cloud projesiyle doğrudan bağlanmalıdır (Ads Developer Blog, 31.08.2026).
- Zorunlu hizmet duyuruları (Mandatory Service Announcements, MSA) Cloud projesinin IAM sayfasındaki sahip ve düzenleyici e-postalarına gönderilir; bu adresler güncel tutulmalıdır.

### Durum → Sonuç

| Durum | Uygun yol |
|---|---|
| Kendi tek reklam hesabında raporlama ya da otomasyon, düşük hacim | Explorer (günde 2.880 işlem) ve servis hesabı; yönetici hesabı gerekmez [RESMÎ] |
| Anahtar kelime hacmi ve fikirleri gerekiyor (kelime araştırması, SEO aracı) | Basic ya da Standard; Explorer'da `KeywordPlanIdeaService` kapalıdır. Marka doğrulaması için bir alan adı ve gizlilik politikası sayfası gerekir [RESMÎ] |
| Kod yazmadan ya da sunucusuz küçük otomasyon | Google Ads scripts: Google Ads içinde çalışan JavaScript; çalıştırma başına 30 dakika, hesap başına 250 yetkili betik [RESMÎ]. Raporları dışarı aktarmak için BigQuery Data Transfer Service [RESMÎ] |
| Ajans; birden çok müşteri hesabı | Yönetici (MCC) hesabı ve `login-customer-id` başlığı. Bir e-postaya en çok 20 hesap bağlanabildiği için servis hesabı yönetici hesaba eklenir [RESMÎ]. Günlük hacme göre Basic ya da Standard |
| Başkalarının hesaplarına bağlanan araç ya da SaaS | Çok kullanıcılı OAuth (offline erişim; refresh token'lar şifreli saklanır) ile OAuth uygulama doğrulaması ve marka doğrulaması gerekir. Yüksek hacimde Standard ve RMF uygulanır. Son kullanıcılara hesaplarında değişiklik yapmaları için başsız (headless) programatik erişim vermek, Google kullanım senaryosunu incelememişse ya da her kuruluş Google'da doğrudan kimlik doğrulaması yapmıyorsa yasaktır. Paylaşılan proxy de yasaktır [RESMÎ] |
| CRM'deki çevrimdışı satışları ya da Customer Match listesini göndermek | Yeni entegrasyonda Data Manager API kullanılır. Google Ads API'deki yükleme yalnızca geçmiş kullanımı olan projelere açıktır [RESMÎ] |
| Rakiplerin reklamlarını izlemek | Google Ads API ile olmaz. Ads Transparency Center (web) kullanılır; AEA ve Türkiye verisi için resmî API, ayrıca BigQuery seçeneği var (aşağıya bak) |
| Ücretsiz, freemium ya da deneme sürümlü masaüstü yazılımı tanıtmak | Önce "yetkili dağıtım sitesi" başvurusu yapılır; SaaS bu başvurudan muaftır (bkz. Masaüstü yazılım reklamı politikası) [RESMÎ] |

## Kimlik doğrulama

- **OAuth 2.0** kullanılır; kapsam tektir: `https://www.googleapis.com/auth/adwords` ("See, edit, create, and delete your Google Ads accounts and data") [RESMÎ]. API anahtarıyla (API key) erişim belgede geçmez; tüm örnekler OAuth erişim belirteci kullanır [RESMÎ].
- OAuth istemcisi ya da servis hesabı, Google Ads API'nin etkinleştirildiği **aynı Cloud projesinde** olmalıdır; erişim seviyesi bu projeden gelir [RESMÎ].
- **Üç iş akışı** vardır [RESMÎ]:
  - **Servis hesabı.** Sahip olduğun hesaplar için önerilen yoldur; insan onayı gerektirmez, JSON anahtar dosyasıyla çalışır.
    - Servis hesabının e-postası Google Ads'te Yönetici → Erişim ve güvenlik → Kullanıcılar bölümünden kullanıcı olarak eklenir.
    - "Yalnızca e-posta" erişim düzeyi desteklenmez; varsayılan olarak yönetici (admin) yetkisi verilemez.
    - Bir e-postaya en çok 20 Google Ads hesabı bağlanabilir. Daha fazlası için servis hesabı yönetici hesaba eklenir ve `login-customer-id` olarak yönetici hesabın kimliği verilir.
  - **Tek kullanıcı.** Kuruluş politikası servis hesabına izin vermiyorsa kullanılır.
    - Rehber "Desktop app" tipi OAuth istemcisi kullanır; bu tip, uygulamanın türünden bağımsız seçilebilir.
    - Refresh token şu komutla üretilir: `gcloud auth application-default login --client-id-file=<credentials.json> --scopes=https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/cloud-platform`. Web tipi istemcide OAuth 2.0 Playground gerekir. İstemci kütüphanelerindeki `GenerateUserCredential` örneği de kullanılabilir.
  - **Çok kullanıcılı.** Başkalarının hesaplarını yöneten uygulamalar içindir. Offline erişim istenir ve her kullanıcının refresh token'ı güvenli saklanır; uygulama OAuth uygulama doğrulamasından geçmelidir.
- **Passkey zorunluluğu** [RESMÎ]:
  - 5 Ağustos 2026'dan itibaren (birkaç hafta içinde tüm kullanıcılara yayılarak) kullanıcı yetkilendirme akışıyla **yeni** refresh token üretmek passkey ister.
  - Bu adımda yalnızca parola ya da TOTP veya SMS gibi 2FA yöntemleri kabul edilmez.
  - Mevcut refresh token'lar ve servis hesabı akışı bu değişiklikten etkilenmez.
  - Yeni oluşturulan bir passkey'in güvenilir sayılması 7 güne kadar sürebilir; passkey önceden oluşturulmalıdır.
  - Aynı şart Google Ads Editor, Google Ads scripts, BigQuery Data Transfer Service ve Data Studio için de geçerlidir.
- **Erişim belirteci** 1 saat geçerlidir; istemci kütüphaneleri onu kendiliğinden yeniler [RESMÎ]. Refresh token'ın ömrü Google Ads belgelerinde yazmaz; yetkiyi veren kullanıcı ayrılırsa ya da hesabı kapanırsa uygulama çalışmayı durdurabilir [RESMÎ]. Google OAuth'un genel kuralları da geçerlidir [RESMÎ: Google Identity belgesi]:
  - İzin ekranı harici (external) kullanıcı türünde ve yayın durumu "Testing" olan bir projeye verilen refresh token 7 günde sona erer. Yalnızca ad, e-posta ve profil kapsamları istenmişse bu kural uygulanmaz; `adwords` kapsamı bu istisnaya girmez.
  - Refresh token 6 ay kullanılmazsa ya da kullanıcı erişimi geri alırsa çalışmaz.
  - Bir Google hesabı için OAuth istemci kimliği başına en çok 100 refresh token tutulur; sınır aşılınca en eskisi uyarısız geçersizleşir.
- **İstek başlıkları** [RESMÎ]:
  - `Authorization: Bearer <ACCESS_TOKEN>`: her istekte gerekir.
  - `login-customer-id: <YONETICI_ID>`: hesaba bir yönetici hesap üzerinden erişiliyorsa zorunludur (tiresiz yazılır). Eksik olursa `AuthorizationError.USER_PERMISSION_DENIED` döner.
  - `linked-customer-id`: bağlı bir hesap (ör. uygulama analitiği sağlayıcısı ya da veri iş ortağı) adına güncelleme yapılırken gerekir.
  - `developer-token`: 9 Eylül 2026'dan beri isteğe bağlıdır ve sunucu tarafından yok sayılır. Google, gelecekteki bir ana sürümde token içeren çağrıları **reddedecek** (tarih verilmedi). Yeni istemci kütüphanesi sürümleri token'sız çalışır.
  - Yanıttaki `request-id` başlığı destek talebinde paylaşılır.
- Müşteri kimliği (customer ID) isteklerde tiresiz yazılır [RESMÎ].
- **Yönetici (MCC) hesabı:** Eylül 2026 geçişinden beri API'ye kaydolmak için gerekmez; yalnızca birden çok hesabı bağlayıp yönetmek için gerekir [RESMÎ]. Test hesapları için test yönetici hesabı şarttır (yukarıya bak).
- **Çok taraflı onay (multi-party approval, MPA)** [RESMÎ]:
  - 2026'da hassas API işlemleri (ör. kullanıcı erişim daveti) için zorunlu oldu.
  - 7 Aralık 2026 haftasından itibaren MPA gerektiren davet ancak onaydan sonra oluşturulacak; çağrıda `resource_name` boş dönecek.
  - İnceleme açıldıktan sonra hedef kaynak değiştirilir ya da silinirse istek geçersizleşir. Bunun için `STALE_MULTI_PARTY_AUTH_REQUEST` hatası v26.2 ile gelecek; v23–v25 bunun yerine `MultiPartyAuthReviewError.UNKNOWN` döner.
  - Aynı değişiklikle `ResolveMultiPartyAuthReview` tek çağrıda 100 bekleyen incelemeyi çözebilecek. Şu an çağrı başına yalnızca 1 inceleme çözülebiliyor.
- **Yönetici hesabı güvenli erişim pilotu** [RESMÎ]: Ağustos 2026'da başlayan bu pilotta hassas yöntemler (hesap, kullanıcı ve fatura yönetimi) yalnızca onaylı Cloud projelerinden çağrılabiliyor. Yeni bir uygulamanın yetkilendirilmesi 10 iş günü sürebiliyor.

### Sürümleme

- Sürüm, yolun içinde yazılır (`/v26/`) [RESMÎ]. 6.11.2026 itibarıyla en yeni ana sürüm **v26**'dır (14.10.2026). Ara sürüm v26.1, 28.10.2026'da çıktı; v26.2 Kasım 2026'da bekleniyor [RESMÎ].
- Açık sürümler ve kapanış (sunset) tarihleri [RESMÎ]:

  | Sürüm | Yayın | Kapanış |
  |---|---|---|
  | v23 | 28.01.2026 | Şubat 2027 |
  | v24 | 22.04.2026 | Mayıs 2027 |
  | v25 | 22.07.2026 | Ağustos 2027 |
  | v26 | 14.10.2026 | Kasım 2027 |

  v22 sürümü 7 Ekim 2026'da kapandı; kapanan sürüme giden tüm istekler başarısız olur.
- v26'dan itibaren ayda iki sürüm çıkıyor: yılda dört ana sürüm (major), aradakiler yalnızca kırıcı olmayan yenilik getiren ara sürümlerdir (minor). Her ana sürüm yayımından yaklaşık bir yıl sonra kapanır; ara sürümler ana sürümleriyle birlikte kapanır [RESMÎ]. Ancak sunset tablosu v24.2 için Haziran 2027 yazıyor, oysa v24'ün kapanışı Mayıs 2027 [ÇELİŞKİLİ]. Planlamada erken tarihi esas al.
- Tarihler tahminidir ve değişebilir; v26.3 tatil dönemi nedeniyle atlanabilir [RESMÎ].

## Temel uç noktalar

REST taban adresi `https://googleads.googleapis.com/`, ardından `v26/...` gelir. gRPC aynı ana makineyi kullanır (proto: `google.api.default_host = "googleads.googleapis.com"`) [RESMÎ]. Google'ın istemci kütüphaneleri (Perl hariç) gRPC kullanır ve Google bu kütüphaneleri önerir [RESMÎ]. `{customerId}`, tiresiz müşteri kimliğidir.

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/v26/customers:listAccessibleCustomers` | OAuth kullanıcısının doğrudan erişebildiği hesapları listeler | Test+ | [RESMÎ] |
| POST | `/v26/customers/{customerId}/googleAds:search` | GAQL sorgusu çalıştırır ve sonucu sayfalar hâlinde döner (rapor ve nesne okuma) | Test (test hesapları), Explorer+ (üretim) | Her istek 1 işlemdir. Geçerli `next_page_token` ile istenen sayfalar günlük kotaya sayılmaz, ama her sayfa isteği kısa süreli hız sınırına sayılır [RESMÎ] |
| POST | `/v26/customers/{customerId}/googleAds:searchStream` | Aynı GAQL sorgusunu tek istekle, akış (stream) hâlinde döner | Aynı | Google çoğu durum için bunu önerir. Tek mantıksal sorgu 1 işlemdir; zaman aşımı ve yeniden deneme mantığı kurulmalıdır [RESMÎ] |
| POST | `/v26/customers/{customerId}/googleAds:mutate` | Tek istekte birden çok kaynak türünü oluşturur, değiştirir ya da siler. Negatif geçici kimliklerle bütün bir kampanya hiyerarşisi tek seferde kurulabilir; `partial_failure` seçeneği var | Explorer+ (üretim) | İstek başına en çok 10.000 işlem (`TOO_MANY_MUTATE_OPERATIONS`) [RESMÎ] |
| POST | `/v26/customers/{customerId}/campaigns:mutate`, `campaignBudgets:mutate`, `adGroupAds:mutate`, `assets:mutate` … | Kaynak başına değişiklik servisleri | Explorer+ | Aynı sınır [RESMÎ] |
| POST (`:listResults` GET) | `/v26/customers/{customerId}/batchJobs:mutate` → `…/batchJobs/{id}:addOperations` → `:run` → `:listResults` | Büyük hacimli değişiklikleri eşzamansız (asenkron) çalıştırır | Explorer+ | Kısmi hata (partial failure) açık çalışır. Yalnızca atomik alt gruplar (`AssetGroupOperation`, `AssetGroupListingGroupFilterOperation`) hep birlikte başarılı ya da başarısız olur. `validate_only` desteklenmez; her işlem günlük kotaya sayılır [RESMÎ] |
| POST | `/v26/customers/{customerId}:uploadClickConversions` | GCLID ile çevrimdışı tıklama dönüşümü yükler | Explorer+ ve **allowlist** | 15.06.2026'dan beri yalnızca 17.12.2025–15.06.2026 arasında bu yüklemeyi yapmış projelerde çalışır; diğerleri `CUSTOMER_NOT_ALLOWLISTED_FOR_THIS_FEATURE` alır. İstek başına 2.000 dönüşüm. Yeni entegrasyon için Data Manager API [RESMÎ] |
| POST | `/v26/customers/{customerId}:uploadCallConversions` | Telefon araması dönüşümü yükler | Explorer+ | İstek başına 2.000 [RESMÎ] |
| POST | `/v26/customers/{customerId}:uploadConversionAdjustments` | Dönüşümü geri çeker, değerini yeniden yazar ya da web için gelişmiş dönüşüm (enhanced conversions) bilgisi ekler | Explorer+ | İstek başına 2.000 düzeltme [RESMÎ] |
| POST | `/v26/customers/{customerId}/offlineUserDataJobs:create` → `…/{id}:addOperations` → `:run` | Customer Match listesi ve mağaza satışlarını toplu yükler | Explorer+; Customer Match için **allowlist** | Customer Match 01.04.2026'dan beri yalnızca 01.10.2025–31.03.2026 arasında bu özelliği kullanmış projelerde çalışır. `addOperations` isteği başına toplam 100.000, `UserData` başına 20 tanımlayıcı (`user_identifiers`); iş başına önerilen üst sınır 1.000.000 işlem. Yeni entegrasyon için Data Manager API [RESMÎ] |
| POST | `/v26/customers/{customerId}:generateKeywordIdeas` | Anahtar Kelime Planlayıcı fikirleri üretir. Tohum olarak 1–20 kelime, bir URL ya da bir site verilir (siteden 250.000'e kadar fikir). Döner: 12 aylık ortalama arama, aylık hacimler, rekabet (LOW/MEDIUM/HIGH ve 0–100), sayfa üstü teklif aralığı (20. ve 80. yüzdelik) | **Basic / Standard** (Explorer'da kapalı) | CID başına saniyede 1 istek. Dil verilmezse tüm diller, konum verilmezse tüm dünya; en çok 10 konum [RESMÎ] |
| POST | `/v26/customers/{customerId}:generateKeywordHistoricalMetrics`, `:generateKeywordForecastMetrics` | Geçmiş metrikleri (istek başına en çok 10.000 kelime) ya da taslak bir kampanya için tıklama, maliyet ve dönüşüm tahminini döner (tahmin dönemi en çok 1 yıl ileri) | Basic / Standard | CID başına saniyede 1 istek [RESMÎ] |
| POST | `/v26/customers/{yoneticiId}:createCustomerClient` | Yönetici hesabın altında yeni bir Google Ads hesabı açar | Basic / Standard | Explorer'da kapalı [RESMÎ] |
| POST | `/v26/customers/{customerId}/customerUserAccessInvitations:mutate` | Hesaba kullanıcı davet eder | Basic / Standard | MPA gerektirebilir (yukarıya bak) [RESMÎ] |
| POST | `/v26/customers/{customerId}/recommendations:apply` | Google'ın önerilerini uygular | Explorer+ | [RESMÎ] |
| POST | `/v26/googleAdsFields:search` | Bir GAQL alanının hangi kaynakla birlikte seçilebileceğini sorgular | Test+ | [RESMÎ] |
| GET | `https://googleads.googleapis.com/$discovery/rest?version=v26` | REST Discovery belgesini (makine okunur şema) döner | Herkese açık | Yaklaşık 3,3 MB JSON; 6.11.2026'da revizyon 20261102, 177 yöntem [RESMÎ: bu oturumda indirildi] |

**GAQL örneği (REST, cURL):**

```bash
curl -X POST "https://googleads.googleapis.com/v26/customers/<MUSTERI_ID>/googleAds:searchStream" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "login-customer-id: <YONETICI_ID>" \
  -H "Content-Type: application/json" \
  --data '{"query": "SELECT campaign.id, campaign.name, metrics.clicks, metrics.cost_micros FROM campaign WHERE segments.date DURING LAST_30_DAYS ORDER BY campaign.id"}'
```

- `login-customer-id` yalnızca yönetici hesap üzerinden erişiliyorsa gönderilir. `cost_micros` mikro birimdir (1 para birimi = 1.000.000).
- GAQL biçimi: `SELECT … FROM <kaynak> WHERE … ORDER BY … LIMIT …`. `FROM`'daki ana kaynağa ilişkili kaynaklar örtük olarak birleşir; tarih için `segments.date DURING LAST_30_DAYS` gibi ifadeler kullanılır; `IN` en çok 20.000 öğe alır. Sorgular [Interactive Query Builder](https://developers.google.com/google-ads/api/fields/v26/overview_query_builder) ile kurulup doğrulanabilir [RESMÎ].
- İzleme için işe yarayan kaynaklar (`FROM`) [RESMÎ: hepsi v26 Discovery belgesinde var]:
  - `change_status`: son 90 günde hangi kaynakların değiştiğini verir.
  - `change_event`: son 30 günün ayrıntılı değişikliklerini verir.
  - `ad_group_ad`: `policy_summary.approval_status`, `review_status` ve `policy_topic_entries` alanlarıyla onay ve ret durumunu verir.
  - `search_term_view`: arama terimleri raporu.
  - `paid_organic_search_term_view`: arama terimine göre ücretli ve organik istatistikler. Arayüzdeki gibi Search Console bağlantısı gerektirmesi beklenir [TAHMİN].

### Data Manager API'ye geçiş (dönüşüm ve kitle verisi)

Google, çevrimdışı tıklama dönüşümü, potansiyel müşteriler için gelişmiş dönüşüm (enhanced conversions for leads), mağaza satışları ve Customer Match için yeni entegrasyonlarda ayrı bir ürün olan **Data Manager API**'yi önerir [RESMÎ]. Bu API Google Ads, Google Analytics, Display & Video 360, Campaign Manager 360, Search Ads 360 ve Ad Manager'a tek yoldan birinci taraf veri gönderir [RESMÎ].

| Metot | Uç nokta | Ne yapar | Not/limit |
|---|---|---|---|
| POST | `https://datamanager.googleapis.com/v1/events:ingest` | Dönüşüm olaylarını gönderir | İstek başına 2.000 olay, olay başına 10 tanımlayıcı, 10 hedef (destination) [RESMÎ] |
| POST | `/v1/audienceMembers:ingest`, `/v1/audienceMembers:remove` | Kitle (Customer Match) üyesi ekler ya da çıkarır | İstek başına 10.000 üye [RESMÎ] |
| GET | `/v1/requestStatus:retrieve` | Gönderilen isteğin işlenme durumunu sorgular | [RESMÎ: Discovery belgesi, revizyon 20261105] |

- Kapsam `https://www.googleapis.com/auth/datamanager`'dır (yalnızca iş ortağı bağlantıları için `datamanager.partnerlink` da var). Kimlik doğrulama Google Cloud yöntemleriyle yapılır (kullanıcı ya da servis hesabıyla ADC); API anahtarı kabul edilmez. Kurulum sayfasında developer token geçmez [RESMÎ].
- Proje kotası `IngestionService` için günde 100.000 ve dakikada 300 istektir (okuma ve yazma ayrı sayılır); diğer servisler için günde 50.000. Aşılınca `RESOURCE_EXHAUSTED` / HTTP 429 döner [RESMÎ]. Ücret belgede yok.

## Gerçek zamanlı / bildirim

- **Genel webhook, WebSocket ya da push yok.** Kampanya, bütçe ya da onay durumu gibi olaylara abone olmanın bir yolu belgede yok [RESMÎ: belgede yok]. `SearchStream` adında "akış" geçse de yalnızca büyük bir sorgu yanıtının parça parça gelmesidir, olay bildirimi değildir [RESMÎ].
- **Değişiklikleri yoklama (polling)** [RESMÎ]:
  - `change_status` son 90 gün için hangi kaynakların değiştiğini verir. `change_event` son 30 gün için ayrıntıyı verir: değişen alanlar, istemci türü ve arayüzün Değişiklik Geçmişi'nde görünüyorsa değişikliği yapan kullanıcı.
  - İkisinde de `LIMIT` zorunludur ve en çok 10.000 satır döner; bir değişikliğin sonuçlara yansıması 3 dakikayı bulabilir.
  - Önerilen akış: son kaydın zaman damgasını sakla, sonraki sorguyu oradan başlat, değişen kaynağı `resource_name` ile yeniden oku.
- **Potansiyel müşteri formu (lead form) webhook'u** [RESMÎ]: Bu oturumda Google Ads tarafında belgelenmiş başka bir gerçek zamanlı push bulunamadı [TAHMİN: arama sonucu].
  - Adres, lead form öğesinde tanımlanır: `LeadFormAsset.delivery_methods` → `WebhookDelivery` (`advertiser_webhook_url`, `google_secret`).
  - Her form gönderiminde bu adrese JSON `POST` gelir (`lead_id`, `user_column_data`, `form_id`, `campaign_id`, `gcl_id`, `google_key`, `is_test` …).
  - Yanıt `200` ve `{}` olmalıdır. 5XX yanıtlar yeniden denenir, 4XX denenmez.
  - Teslimin "tam bir kez" olacağı garanti değildir; kayıtları `lead_id` ile tekilleştir. Gelen `google_key`, yapılandırdığın anahtarla eşleşmelidir.
  - Formdaki ad, e-posta ve telefon kişisel veridir (KVKK/GDPR).
- **Zorunlu hizmet duyuruları (MSA)** e-postayla Cloud projesinin sahip ve düzenleyicilerine gider [RESMÎ]. Sürüm ve politika değişiklikleri için [Ads Developer Blog](https://ads-developers.googleblog.com/) izlenebilir.

## Neler mümkün (takip uygulaması açısından da)

| İş / izlenecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Kendi hesabının kampanya, reklam grubu, anahtar kelime ve maliyet raporu | **Evet** | GAQL ile `search` / `searchStream` | Explorer+ (üretim) | Düşük hacimde Explorer yeter: günde 2.880 işlem, bir rapor sorgusu 1 işlem [RESMÎ] |
| Kampanya ya da reklam oluşturma, bütçe ve teklif değiştirme | **Evet** | `mutate` servisleri; büyük hacimde `BatchJobService` | Explorer+ | İstek başına 10.000 işlem [RESMÎ] |
| CRM'deki çevrimdışı satışı reklam tıklamasına bağlayıp yüklemek | **Kısmen** | Yeni yol: Data Manager API `events:ingest`. Eski entegrasyon: `uploadClickConversions` | Data Manager API ayrı (Cloud projesi ve `datamanager` kapsamı) | Google Ads API yolu 15.06.2026'dan beri allowlist'e bağlı [RESMÎ] |
| Çağrı dönüşümü yükleme, dönüşüm düzeltme | **Evet** | `uploadCallConversions`, `uploadConversionAdjustments` | Explorer+ | Bu iki yöntem için allowlist kısıtı belgede yok [RESMÎ] |
| Customer Match (müşteri listesi) yükleme | **Kısmen** | Yeni yol: Data Manager API `audienceMembers:ingest`. Eski yol: `OfflineUserDataJobService` | — | Google Ads API yolu 01.04.2026'dan beri allowlist'e bağlı. Yalnızca kendi topladığın (birinci taraf) veri yüklenebilir; hesabın politika ve ödeme geçmişi iyi olmalı, her hesap uygun değildir [RESMÎ] |
| Anahtar kelime fikri, aylık arama hacmi, rekabet ve CPC aralığı | **Evet (Basic+)** | `generateKeywordIdeas`, `generateKeywordHistoricalMetrics` | Basic / Standard | Explorer'da kapalı; CID başına saniyede 1 istek [RESMÎ]. Harcaması düşük hesaplarda arayüz hacmi aralık olarak gösterir (ör. 1K–10K) [3. TARAF, 2016]. API'nin bu durumda ne döndürdüğü resmî belgede yok; üçüncü taraf kaynaklar çelişiyor [ÇELİŞKİLİ] |
| Kendi reklamının onaylanıp onaylanmadığını izlemek | **Evet (yoklama)** | `ad_group_ad.policy_summary` (onay durumu, inceleme durumu, politika bulguları) ve `change_status` | Explorer+ | Push yok [RESMÎ] |
| Harcama ya da bütçe eşiği, ani tıklama artışı uyarısı | **Evet (yoklama)** | Zamanlanmış GAQL sorgusu (`metrics.cost_micros`, `metrics.clicks`) | Explorer+ | Alternatif: hesap içi otomatik kurallar ya da scripts [TAHMİN: tasarım önerisi] |
| Yeni potansiyel müşteri (lead form) | **Evet (push)** | Lead form webhook'u | Reklam hesabı | `lead_id` ile tekilleştir; gelen veri kişisel veridir [RESMÎ] |
| Hesapta kimin neyi değiştirdiği | **Evet (yoklama)** | `change_event` (30 gün), `change_status` (90 gün) | Explorer+ | Yaklaşık 3 dakika gecikme [RESMÎ] |
| Aynı açık artırmadaki rakiplerin payı (Auction Insights) | **Hayır (API)** | Arayüzde Insights → Reports → Auction Insights raporu elle indirilir | Allowlist | API metrikleri "not publicly available" [RESMÎ]; allowlist programı kapalı (Haziran 2025 forum yanıtı) [3. TARAF] |
| Başka bir reklamverenin yayındaki reklamlarını görmek | **Google Ads API ile hayır** | [Ads Transparency Center](https://adstransparency.google.com/) web sitesi (kimliksiz, dünya geneli) | — | Google Ads API yalnızca erişim iznin olan hesaplarda çalışır [RESMÎ]. Doğrulanmış reklamverenlerin yasal adı ve konumu gösterilir. Yardım sayfasının konum seçicisindeki AEA ülkeleri ve Türkiye'de gösterilen reklamlar için hedefleme bilgisi, alıcı sayısı ve konu etiketi de eklenir [RESMÎ] |
| Başka reklamverenlerin reklamlarını toplu ya da programatik çekmek | **Kısmen (AEA ve Türkiye)** | Google'ın "Ads transparency" yardım sayfasına göre AEA'da ve Türkiye'de gösterilen reklamların Ads Transparency Center verisine API erişimi var; veri ATC kullanım şartlarına tabi [RESMÎ]. BigQuery'de `bigquery-public-data.google_ads_transparency_center` veri kümesi (`creative_stats`, `removed_creative_stats` tabloları; AEA ve Türkiye) [3. TARAF] | — | Sayfa metni konum seçimine göre değişir: Türkiye seçiliyken "ads served in Türkiye", Almanya (AEA) seçiliyken "ads served in the EEA" yazar; iki seçenek de bu oturumda okundu [RESMÎ]. Başvuru yolu, uç nokta ve kota bu sayfada yok [RESMÎ: belgede yok]. Google ayrıca AEA dışında gösterilen reklamların mevcut verisine düzenleyicilerin ve öz düzenleyici kuruluşların API ile erişmesine izin verebilir [RESMÎ] |
| Rakip reklam metinlerini Google Arama sonuçlarından izlemek | **Hayır (resmî)** | — | — | Developer Policies, Google Arama'yı kazımayı ve kazınmış veri satın almayı yasaklar [RESMÎ] |
| Organik arama verisi | **Kısmen** | `paid_organic_search_term_view` (ücretli ve organik birlikte) | Explorer+ | Organik verinin tamamı için Search Console API ayrı bir üründür [TAHMİN: genel bilgi] |
| Gönderi, canlı yayın ya da mesaj takibi | **Uygulanamaz** | — | — | Bu bir reklam yönetimi API'sidir; içerik ya da sosyal akış sunmaz |

**Sonuç:** Google Ads API bir izleme (takip) API'si değil, **kendi reklam hesaplarını yönetme ve raporlama** API'sidir. Takip uygulaması açısından işe yarayan üç şey vardır: lead form webhook'u (bulunabilen tek push), kendi hesabındaki değişiklik, onay ve harcama yoklaması, ve Basic+ seviyesinde anahtar kelime trend verisi. Rakip izlemede resmî kaynak Ads Transparency Center'dır; programatik erişim yalnızca AEA ve Türkiye verisi için ve şartlara bağlı olarak vardır. Meta'daki karşılığı Ad Library API'dir ([Meta Graph API (genel)](../Sosyal-Medya/Meta-Graph-API-Genel.md)).

## Masaüstü yazılım reklamı politikası

Uygulamayı (ör. bir Windows masaüstü programını) Google Ads ile tanıtacaksan, reklam API'den de oluşturulsa arayüzden de aynı reklam politikaları uygulanır [TAHMİN: genel kural; API'de de reklamın politika bulguları döner, aşağıya bak].

- **"Free desktop software"** (Google'ın "Other restricted businesses" grubunda) [RESMÎ]: ücretsiz masaüstü yazılımının reklamını yalnızca başvurusu onaylanmış **yetkili dağıtım siteleri** ("authoritative distribution sites") verebilir.
- **Kapsam** [RESMÎ]: masaüstü ya da dizüstü bilgisayarda çalışan ve indirmek için ödeme bilgisi istemeyen yazılımlar. Örnekler: .exe, .dmg, sıkıştırılmış dosyalar, uzantılar, eklentiler. **Ücretsiz deneme, freeware, shareware, freemium ve demolar da kapsama girer.**
- **Şartlar** [RESMÎ]:
  - Site, yazılımın resmî dağıtım kaynağı olmalı ve kullanıcının yazılımı doğrudan indirmesine izin vermelidir.
  - Her reklamda yazılımın adı geçmelidir.
  - Site tüm Google Ads politikalarına uymalı ve politika ihlali geçmişi olmamalıdır.
  - Başvuruyu yalnızca yazılımın yayıncısı yapabilir (form: "Application to advertise free desktop software as an authoritative distribution site").
- **Kapsam dışı** [RESMÎ]: bulut hizmeti (SaaS) bu politikaya girmez ve başvuru gerektirmez. İndirmek için ödeme bilgisi isteyen ücretli masaüstü yazılımın durumu sayfada açıkça yazmaz [RESMÎ: belgede yok]; mobil uygulamalar sayfada geçmez.
- **İstenmeyen yazılım (Unwanted software) politikası** ayrıca geçerlidir [RESMÎ]:
  - Şunlar reklamın ya da hedef sayfanın reddine yol açar: kullanıcının bilgisi dışında yazılım paketleme (bundling), kaldırmayı zorlaştırma, izinsiz sistem ya da tarayıcı ayarı değiştirme, kullanım şartları (ToS) ya da son kullanıcı lisans sözleşmesi (EULA) eksikliği.
  - Bu politikanın ihlali önceden uyarı olmadan hesabın askıya alınmasına yol açmaz; askıya almadan en az 7 gün önce bildirim yapılır.
- API'de bir reklamın neden reddedildiği `ad_group_ad.policy_summary.policy_topic_entries` alanından okunur ("The list of policy findings for this ad") [RESMÎ].

| Durum | Sonuç |
|---|---|
| Ücretsiz, freemium ya da deneme sürümlü masaüstü uygulaması kendi sitenden indiriliyor | Önce yetkili dağıtım sitesi başvurusu; onaydan sonra reklam verilir ve her reklamda yazılımın adı geçer [RESMÎ] |
| Web tabanlı (SaaS) ürün | Başvuru gerekmez; genel Google Ads politikaları geçerlidir [RESMÎ] |
| İndirmek için ödeme isteyen masaüstü yazılım | Politika metni açık değil; reklam vermeden önce Google Ads desteğinden yazılı teyit al [TAHMİN] |
| Yazılım başka bir sitenin (ör. indirme portalı) üzerinden dağıtılıyor | Başvuruyu yalnızca yayıncı yapabilir ve site resmî dağıtım kaynağı olmalıdır [RESMÎ]; aracı bir portalın bu şartı karşılamayacağı çıkarımdır [TAHMİN] |

## Hız sınırları ve fiyatlar

- **Günlük işlem kotası** Cloud projesi başına, kayan 24 saatlik pencereyle sayılır [RESMÎ]:
  - Test: 15.000 (yalnızca test hesapları)
  - Explorer: üretimde 2.880, testte 15.000
  - Basic: 15.000
  - Standard: sınırsız

  Kota aşılınca `RESOURCE_EXHAUSTED` döner.
- **Neyin sayıldığı** [RESMÎ]:
  - Her `Search` ya da `SearchStream` isteği 1 işlemdir (akış kaç parça dönerse dönsün).
  - Geçerli `next_page_token` ile yapılan sayfa istekleri sayılmaz; süresi geçmiş ya da geçersiz token ile yapılanlar sayılır.
  - Mutate'te her işlem ayrı sayılır.
  - `BatchJobService.ListBatchJobResults`, `OfflineUserDataJobService`, dönüşüm yükleme yöntemleri ve `UserDataService.UploadUserData` birer işlem sayılır.
- **Hız sınırı (QPS)** [RESMÎ]: müşteri kimliği ve Cloud projesi başına ayrı ayrı, token bucket algoritmasıyla uygulanır; dakikalık istek ve işlem sınırları da vardır. Sayılar yayımlanmaz ve sunucu yüküne göre değişir. Aşılınca `RESOURCE_TEMPORARILY_EXHAUSTED` döner. Üstel geri çekilme (exponential backoff) ve rastgele gecikmeyle (jitter) yeniden dene, eşzamanlı görev sayısını sınırla.
- **İstek boyutu** [RESMÎ]: mutate isteği başına en çok 10.000 işlem. gRPC yanıt mesajı en çok 64 MB olabilir: gRPC'nin varsayılanı 4 MB'tır, istemci kütüphaneleri sınırı 64 MB'a çıkarır. Aşılırsa `RESOURCE_EXHAUSTED` döner; seçilen alanları azalt, akış kullan ya da mutate isteğindeki işlem sayısını düşür. GAQL `IN` en çok 20.000 öğe alır.
- **Servise özel sınırlar** [RESMÎ]:
  - `KeywordPlanIdeaService`: CID başına saniyede 1 istek (`GenerateAdGroupThemes` için 2).
  - Planlama servisleri: saniyede 1 istek. `AudienceInsightsService`'in bazı yöntemleri CID başına günde yaklaşık 200.
  - Dönüşüm yükleme: istek başına 2.000 dönüşüm; dönüşüm düzeltme: istek başına 2.000.
  - Hesap bütçesi değişiklikleri arasında en az 12 saat beklenmeli.
  - `UserDataService` eşzamanlı istekte en çok 10 işlem ve toplam 100 tanımlayıcı alır.
- **Fiyat** [RESMÎ]: API ücretsizdir. Asıl maliyet reklam harcamasıdır (tıklama ya da gösterim bedeli, Google Ads faturası).
  - Türkiye'den yurt dışındaki bir reklam ağına yapılan ödemenin vergi tarafı (sorumlu sıfatıyla KDV, stopaj, Dijital Hizmet Vergisi) için depodaki sayfalara bak: [Şirket Kurma → Giderler §4](../../Rehberler/Sirket-Kurma/08-giderler-ofis-arac.html#yurtdisi-abonelik), [Masaüstü uygulama reklamı §9](../../Rehberler/Masaustu-Uygulama-Reklam/index.html#hukuk).
- **Uyumsuzluk ücreti** (yalnızca RMF kapsamındaki Standard projeler) [RESMÎ]:
  1. Bildirimden sonra 30 günlük düzeltme süresi başlar.
  2. Süre sonunda uyum sağlanmamışsa ücret, önceki 30 günün işlem sayısı ile arama isteği sayısından büyük olanı üzerinden 25.000'de 1 USD olarak hesaplanır.
  3. Fatura başına en az 1.000, en çok 25.000 USD; bir inceleme döngüsünde en çok 50.000 USD.
  4. İhlal sürerse proje Basic'e düşürülebilir.

## Resmî olmayan yollar ve riskler

**Developer Policies'ten öne çıkanlar** [RESMÎ]:

- **Yasak olanlar:**
  - Birden çok bağımsız işletmenin otomatik isteklerini tek bir paylaşılan aracıdan geçiren hizmetler. Politikadaki ifadeyle: "third-party hosted interface, secondary API, wrapper service, or MCP server, proxy endpoint".
  - Otomatik işlemin kaynağını gizleyen bir ara katmana kimlik bilgisi gömmek.
  - Son kullanıcılara hesaplarında değişiklik yapmaları için başsız (headless) programatik erişim vermek. Google geliştiricinin kullanım senaryosunu incelemişse ya da her kuruluş Google'da doğrudan kimlik doğrulaması yapıyorsa bu yasak uygulanmaz.
- **Kapsam dışı:** Kendi Google Ads API kullanımın (otomasyon dahil) ve son kullanıcının indirip kendi erişim bilgileriyle Google Ads'e bağladığı açık kaynak araçlar bu yasağa girmez.
- **Gerekenler:**
  - Google Ads verisi, Google dışındaki reklam verisinden ayrı raporlanır.
  - Hesap verisini (anahtar kelime, teklif, performans) satmadan, yeniden dağıtmadan ya da alt lisanslamadan önce müşteriden yazılı onay alınır.
  - OAuth erişim ve refresh token'ları depoda şifreli saklanır.
  - Yetkisiz erişim şüphesi `security@google.com` adresine bildirilir.
- Google Ads API sözleşmesinin (Terms and Conditions) son güncellemesi 21 Şubat 2019 tarihlidir; kişisel veri yalnızca alınan rızayla uyumlu amaçlarla kullanılabilir [RESMÎ].

| Yol | Nasıl çalışır | Risk |
|---|---|---|
| Google Ads web arayüzünü kazımak ya da tarayıcıyla otomatikleştirmek | Kendi hesabının arayüzünde gezinip veri toplar | Gereksizdir: aynı veri API'de ücretsiz. Developer Policies Google kullanıcı verisini kazımayı yasaklar [RESMÎ]. Passkey ve oturum güvenliği bu tür otomasyonu kırar [TAHMİN] |
| Google Arama sonuçlarını kazıyıp rakip reklamlarını izlemek (ve bunu satan "ad intelligence" servisleri) | Bot aramalar yapar, "Sponsorlu" sonuçları kaydeder | Google Arama'yı kazımak ya da kazınmış veri satın almak Developer Policies'e göre yasaktır. Google Ads verisinin yanında Google dışı kaynaktan arama verisi gösteren raporlar, kaynağı ve toplama yöntemini açıklamalıdır [RESMÎ] |
| Ads Transparency Center'ı kazıyan üçüncü taraf API'ler (SerpApi, Apify aktörleri vb.) | Sitenin verisini (reklamveren, kreatif, bölge, ilk/son gösterim tarihi) çeker ve kendi API'siyle sunar. Örnek bir Apify aktörü alan adı, marka ya da reklamveren kimliğiyle arar, çalıştırma başına en çok 1.000 reklam döndürür, 1.000 sonuç başına 2 USD alır ve proxy ile captcha'yı kendisi aşar [3. TARAF] | ATC verisinin kullanımı ATC kullanım şartlarına tabidir [RESMÎ]. Proxy ve captcha aşma, erişim kontrolünü dolanmak demektir; servis bozulabilir ya da kapanabilir [TAHMİN]. AEA ve Türkiye verisi için önce resmî yol denenmelidir |
| Paylaşılan "proxy" hizmeti (aracı şirketin tek erişimiyle başkalarının hesaplarına bağlanmak) ya da barındırılan üçüncü taraf MCP sunucusu | Kendi Cloud projen olmadan, aracının kimlik bilgileriyle çalışır | 31 Ağustos 2026'da duyurulan politika güncellemesiyle yasaklandı; politika sayfasında ayrı bir yürürlük tarihi yazmıyor. Uyum ekibi mevcut entegrasyonları inceliyor; uyarı, erişimin düşürülmesi ya da sonlandırılması riski var [RESMÎ] |
| Topluluk istemci kütüphaneleri (Node.js `google-ads-api`, Go `google-ads-pb`) | Resmî API'yi çağırır; yalnızca SDK resmî değildir | ToS riski yoktur. Ancak Google bu kütüphaneleri test etmez ve bakımını yapmaz; yeni sürümlere geçişte gecikebilirler [RESMÎ] |

Kendi hesabın için resmî olmayan bir yola neredeyse hiç gerek yoktur: resmî API ücretsiz ve kapsamlıdır, arayüzü kazımak anlamsızdır. Rakip verisinde resmî kapsam AEA ve Türkiye ile sınırlı olduğundan kazıma servisleri yaygındır, ama hem kullanım şartı hem kişisel veri riski taşırlar [TAHMİN: değerlendirme].

## SDK ve kütüphaneler

| Ad | Dil | Tür | Not |
|---|---|---|---|
| `Google.Ads.GoogleAds` (NuGet) | C# / .NET | **Resmî** | Son sürüm 27.6.0 (29.10.2026); v26 için en az 27.5.0 gerekir. Hedef çatılar: .NET Framework 4.7.2+, .NET Standard 2.1, .NET 8.0. gRPC kullanır (`Grpc.Net.Client`; desteklenmeyen platformda eskimiş `Grpc.Core`). Application Default Credentials 24.1.0'dan, elle kimlik bilgisi verme 27.0.0'dan itibaren desteklenir. Ayarlar `appsettings.json`, `App.config`, ortam değişkenleri ya da `GoogleAdsConfig` ile verilir. Kaynak kodu: [googleads/google-ads-dotnet](https://github.com/googleads/google-ads-dotnet) (Apache-2.0) [RESMÎ] |
| `Google.Ads.GoogleAds.Extensions` (NuGet) | C# | **Resmî** yardımcı | 2.0.8 (09.09.2026); yapılandırmayı dosyadan ya da ortam değişkenlerinden yükler [RESMÎ] |
| `Google.Ads.DataManager.V1` (NuGet) | C# | **Resmî**, önizleme | Data Manager API istemcisi; yalnızca ön sürüm var (1.0.0-beta11, 28.09.2026). Hedef: .NET Standard 2.0 / .NET Framework 4.6.2 [RESMÎ: NuGet, sahibi google-apis-packages] |
| `Google.Ads.DataManager.Util` (NuGet) | C# | **Resmî** yardımcı | 0.4.0 (25.09.2026); veriyi biçimlendirme, karma (hash), şifreleme ve kodlama yardımcıları. Kaynak: [googleads/data-manager-dotnet](https://github.com/googleads/data-manager-dotnet) [RESMÎ: NuGet] |
| Java `com.google.api-ads:google-ads`, Python `google-ads`, PHP `googleads/google-ads-php`, Ruby `google-ads-googleads`, Perl `Google-Ads-GoogleAds-Client` | Çeşitli | **Resmî** | Perl dışındakiler gRPC, Perl REST kullanır [RESMÎ] |
| `google-ads-api` (npm), `google-ads-pb` (Go) | Node.js, Go | Topluluk | Google test etmez, katkı vermez, bakımını yapmaz [RESMÎ] |
| Google Ads MCP sunucusu ([googleads/google-ads-mcp](https://github.com/googleads/google-ads-mcp)) | Python | Google'ın GitHub kuruluşunda; belgede "resmî" denmez | **Salt okunur** üç araç: `list_accessible_customers`, `search` (GAQL), `get_resource_metadata`. OAuth ya da servis hesabıyla ve Explorer/Basic/Standard erişimiyle çalışır; stdio ya da Cloud Run (Streamable HTTP) üzerinden. Barındırılan uç nokta yalnızca pilot katılımcılarına açık [RESMÎ]. Developer Policies, kendi programatik kullanımını ve son kullanıcının indirip kendi erişim bilgileriyle bağladığı açık kaynak araçları yasak dışında tutar; yani sunucuyu kendi Cloud projenle kendin çalıştırabilirsin. Başkalarına barındırılmış bir MCP hizmeti olarak sunmak ise "programatik proxy" tanımına girer [RESMÎ] |
| Google Ads API Developer Assistant ([googleads/google-ads-api-developer-assistant](https://github.com/googleads/google-ads-api-developer-assistant)) | Claude Code ve Google Antigravity eklentisi | Google'ın GitHub kuruluşunda | v4.0.0 (25.08.2026), önceki sürümlerle uyumsuz. GAQL doğrular, salt okunur çağrı ve rapor çalıştırır. Değişiklik (mutate) kodunu dosyaya kaydeder ama çalıştırmaz. Python, Java, PHP, .NET ve Ruby kodu üretir [RESMÎ] |

**C# örneği: tek hesap, son 7 günün kampanya raporu.** Resmî `GetCampaigns` örneğinden sadeleştirildi [TAHMİN: bu oturumda derlenmedi].

```csharp
using Google.Ads.GoogleAds;
using Google.Ads.GoogleAds.Config;
using Google.Ads.GoogleAds.Lib;
using Google.Ads.GoogleAds.V26.Services;

var config = new GoogleAdsConfig
{
    OAuth2ClientId = "<CLIENT_ID>",
    OAuth2ClientSecret = "<CLIENT_SECRET>",
    OAuth2RefreshToken = "<REFRESH_TOKEN>",
    LoginCustomerId = "<YONETICI_ID>"
};
var client = new GoogleAdsClient(config);
GoogleAdsServiceClient service = client.GetService(Services.V26.GoogleAdsService);

string query = @"SELECT campaign.id, campaign.name, metrics.clicks, metrics.cost_micros
                 FROM campaign
                 WHERE segments.date DURING LAST_7_DAYS";

service.SearchStream("<MUSTERI_ID>", query, resp =>
{
    foreach (GoogleAdsRow row in resp.Results)
        Console.WriteLine($"{row.Campaign.Name}: {row.Metrics.Clicks} tık, {row.Metrics.CostMicros / 1_000_000m}");
});
```

- Değerler yer tutucudur; gerçek sırlar koda değil ortam değişkenine ya da bir gizli anahtar kasasına konur. `LoginCustomerId` yalnızca yönetici hesap üzerinden erişiliyorsa verilir.
- Servis hesabıyla çalışmak için `OAuth2Mode` = `SERVICE_ACCOUNT` ve `OAuth2SecretsJsonPath` = JSON anahtar dosyasının yolu verilir. Ortam değişkeni karşılıkları: `GOOGLE_ADS_OAUTH2_MODE=SERVICE_ACCOUNT`, `GOOGLE_ADS_JSON_KEY_FILE_PATH` [RESMÎ].
- Masaüstü uygulamasında son kullanıcıların kendi hesaplarına bağlanacağı bir senaryo çok kullanıcılı OAuth akışıdır. Her kullanıcı yetkiyi passkey ile verir; uygulama refresh token'ı şifreli saklar [RESMÎ].

## Postman / OpenAPI / koleksiyonlar

- Resmî Postman koleksiyonu ya da OpenAPI/Swagger dosyası belgede yok. 2021'de Google Ads API ekibi forumda böyle dosyaları olmadığını yazıp belgelerdeki cURL örneklerine yönlendirdi [3. TARAF: Google'ın kendi forumu, 19.08.2021].
- Makine okunur şema olarak **Google Discovery belgesi** var: `https://googleads.googleapis.com/$discovery/rest?version=v26`. Bu bir OpenAPI belgesi değildir; 6.11.2026'da 200 döndü (yaklaşık 3,3 MB, revizyon 20261102, 177 REST yöntemi). Proto tanımları [googleapis/googleapis → google/ads/googleads/v26](https://github.com/googleapis/googleapis/tree/master/google/ads/googleads/v26) altındadır [RESMÎ].
- APIs.guru dizininde (6.11.2026) Google Ads API kaydı yok [3. TARAF: `api.apis.guru/v2/list.json` kontrol edildi].
- Deneme araçları: [REST cURL örnekleri](https://developers.google.com/google-ads/api/rest/examples), [Interactive Query Builder](https://developers.google.com/google-ads/api/fields/v26/overview_query_builder) ve `googleAdsFields:search` [RESMÎ].
- Değişiklik takibi: [Release notes](https://developers.google.com/google-ads/api/docs/release-notes), [Sunset dates](https://developers.google.com/google-ads/api/docs/sunset-dates), [Ads Developer Blog](https://ads-developers.googleblog.com/) [RESMÎ].

## Depoda ilgili sayfalar

- [Masaüstü uygulamada reklam ve ödüllü reklam](../../Rehberler/Masaustu-Uygulama-Reklam/): Bu sayfa, araştırmanın §7 "Uygulamayı tanıtmak için reklam vermek" bölümünün ayrıntısıdır ([HTML §7](../../Rehberler/Masaustu-Uygulama-Reklam/index.html#reklam-verme), [arastirma.md](../../Rehberler/Masaustu-Uygulama-Reklam/arastirma.md)). O bölüm Google Ads API erişim seviyelerini ve ücretsiz masaüstü yazılım politikasını özetler; KVKK yurt dışı aktarım ve vergi konuları §9'dadır.
- [SEO rehberi → Anahtar kelime ve arama niyeti §7](../../Rehberler/SEO/04-anahtar-kelime-ve-niyet.html#ads-verisi): Arama terimleri raporu, Anahtar Kelime Planlayıcı ve ücretli-organik raporu. API'deki karşılıkları `search_term_view`, `generateKeywordIdeas` ve `paid_organic_search_term_view`'dur.
- [SEO rehberi → Müşteri işi §5](../../Rehberler/SEO/17-musteri-isi.html#ads-ve-seo): Google Ads hedef sayfa gereksinimleri, AdsBot ve konum öğeleri.
- [Şirket Kurma → Giderler §4](../../Rehberler/Sirket-Kurma/08-giderler-ofis-arac.html#yurtdisi-abonelik): Yurt dışındaki reklam harcamasında sorumlu sıfatıyla KDV ve stopaj.
- [AdMob](AdMob.md) ve [Google Ad Manager](Google-Ad-Manager.md): Aynı klasördeki yayıncı (reklam gösterme) tarafı API'leri; bu sayfa reklamveren (reklam verme) tarafıdır.
- [Meta Graph API (genel)](../Sosyal-Medya/Meta-Graph-API-Genel.md): Marketing API ve Ad Library API; Meta'da rakip reklamlarını izlemenin resmî yolu.
- [TikTok](../Sosyal-Medya/TikTok.md), [Snapchat](../Sosyal-Medya/Snapchat.md), [Reddit](../Sosyal-Medya/Reddit.md): Diğer platformların reklam API'leri; erişim ve ücret modelini karşılaştırmak için.
- [YouTube](../Canli-Yayin-ve-Video/YouTube.md): Aynı Google Cloud projesi ve OAuth altyapısını kullanan Google API'si.
- [API Kaynakları](../API-Kaynaklari/): Discovery ve OpenAPI dizinleri, uç nokta keşfi.

## Kaynaklar

**Resmî**

- [Access levels and permissible use](https://developers.google.com/google-ads/api/docs/api-policy/access-levels): Test, Explorer, Basic, Standard; günlük limitler; Explorer kısıtları; izinli kullanım (erişim: 6 Kasım 2026).
- [Developer token](https://developers.google.com/google-ads/api/docs/api-policy/developer-token): 9 Eylül 2026'da kaldırılması, Cloud projesine bağlı erişim, yönetici hesabın gerekmemesi (erişim: 6 Kasım 2026).
- [Get access to the Google Ads API](https://developers.google.com/google-ads/api/docs/first-call/dev-token): Cloud Console kaydı, marka doğrulaması, SSS, bilinen sorunlar, `CLOUD_PROJECT_NOT_APPROVED_FOR_PRODUCTION` (erişim: 6 Kasım 2026).
- [Access levels and RMF](https://developers.google.com/google-ads/api/docs/productionize/access-levels): "The Google Ads API is free to use", RMF'nin yalnızca Standard'a uygulanması (erişim: 6 Kasım 2026).
- [Non-compliance fee](https://developers.google.com/google-ads/api/docs/api-policy/non-compliance-fee): Uyumsuzluk ücreti hesabı ve üst sınırlar (erişim: 6 Kasım 2026).
- [Google Ads Developer Policies](https://support.google.com/adspolicy/answer/6169371) ve [Programmatic proxy tanımı](https://support.google.com/google-ads/answer/18103182): Proxy ve MCP yasağı, kendi kullanımın ve açık kaynak araçlar için istisna, başsız erişimin koşulu, kazıma yasağı, veri ve güvenlik kuralları, 90 gün kullanılmayan erişim (erişim: 6 Kasım 2026).
- [Google Ads API Terms and Conditions](https://developers.google.com/google-ads/api/docs/api-policy/terms): Sözleşme, son güncelleme 21.02.2019 (erişim: 6 Kasım 2026).
- [API limits and quotas](https://developers.google.com/google-ads/api/docs/best-practices/quotas): Günlük işlemler, mutate ve mesaj boyutu, servise özel sınırlar (erişim: 6 Kasım 2026).
- [Rate limits](https://developers.google.com/google-ads/api/docs/best-practices/rate-limits): QPS, token bucket, `RESOURCE_TEMPORARILY_EXHAUSTED`, geri çekilme (erişim: 6 Kasım 2026).
- [Sunset dates](https://developers.google.com/google-ads/api/docs/sunset-dates) ve [Release notes](https://developers.google.com/google-ads/api/docs/release-notes): Sürüm ve kapanış tablosu (erişim: 6 Kasım 2026).
- Ads Developer Blog yazıları (erişim: 6 Kasım 2026):
  - [A new onboarding experience for Google Ads API developers](https://ads-developers.googleblog.com/2026/09/new-onboarding-experience-for-google-ads-api.html) (10.09.2026)
  - [Passkey authentication requirement for the Google Ads API](https://ads-developers.googleblog.com/2026/07/passkey-authentication-requirement-for.html) (27.07.2026)
  - [Making Google Ads More Secure with Updates to Developer Policies](https://ads-developers.googleblog.com/2026/08/making-google-ads-more-secure-with.html) (31.08.2026)
  - [Google Ads API Release and Sunset Schedules for 2026-2027](https://ads-developers.googleblog.com/2026/10/google-ads-api-release-and-sunset.html) (12.10.2026)
  - [Announcing v26 of the Google Ads API](https://ads-developers.googleblog.com/2026/10/announcing-v26-of-google-ads-api.html) (14.10.2026)
  - [Google Ads API v22 sunset reminder](https://ads-developers.googleblog.com/2026/09/google-ads-api-v22-sunset-reminder.html) (02.09.2026)
  - [Upcoming changes to multi-party approvals](https://ads-developers.googleblog.com/2026/11/upcoming-changes-to-multi-party.html) (04.11.2026)
  - [Secure API Access to your Manager Accounts (pilot)](https://ads-developers.googleblog.com/2026/08/google-ads-api-pilot-secure-api-access.html) (03.08.2026)
  - [Google Ads API Developer Assistant v4.0.0](https://ads-developers.googleblog.com/2026/08/google-ads-api-developer-assistant-v400.html) (25.08.2026)
- [OAuth overview](https://developers.google.com/google-ads/api/docs/oauth/overview), [Single-user authentication](https://developers.google.com/google-ads/api/docs/oauth/single-user-authentication), [Multi-user authentication](https://developers.google.com/google-ads/api/docs/oauth/multi-user-authentication), [Service accounts](https://developers.google.com/google-ads/api/docs/oauth/service-accounts): İş akışları, `adwords` kapsamı, passkey ve servis hesabı kuralları (erişim: 6 Kasım 2026).
- [Brand verification](https://developers.google.com/identity/protocols/oauth2/production-readiness/brand-verification): Alan adı, gizlilik politikası ve inceleme süresi (erişim: 6 Kasım 2026).
- [Using OAuth 2.0 to Access Google APIs → Refresh token expiration](https://developers.google.com/identity/protocols/oauth2#expiration): "Testing" durumundaki projelerde 7 günlük refresh token, 6 ay kullanılmama, 100 token sınırı (erişim: 6 Kasım 2026).
- [API call structure](https://developers.google.com/google-ads/api/docs/concepts/call-structure): Başlıklar, `login-customer-id`, `linked-customer-id`, `request-id`, 1 saatlik erişim belirteci (erişim: 6 Kasım 2026).
- [REST interface](https://developers.google.com/google-ads/api/rest/overview) ve [REST examples](https://developers.google.com/google-ads/api/rest/examples): gRPC/REST, cURL örnekleri (erişim: 6 Kasım 2026).
- [Discovery belgesi v26](https://googleads.googleapis.com/$discovery/rest?version=v26) ve [proto tanımları](https://github.com/googleapis/googleapis/tree/master/google/ads/googleads/v26): Yöntem yolları, `adwords` kapsamı, `default_host`, alan açıklamaları (Auction Insights "not publicly available", `policy_summary`, `WebhookDelivery`) (erişim: 6 Kasım 2026).
- [Search vs SearchStream](https://developers.google.com/google-ads/api/docs/reporting/streaming), [GAQL](https://developers.google.com/google-ads/api/docs/query/overview), [Mutating](https://developers.google.com/google-ads/api/docs/mutating/overview), [Batch processing](https://developers.google.com/google-ads/api/docs/batch-processing/overview): Raporlama ve değişiklik kuralları; toplu işlerde kısmi hata ve atomik alt gruplar (erişim: 6 Kasım 2026).
- [Test accounts](https://developers.google.com/google-ads/api/docs/best-practices/test-accounts): Test yönetici hesabı, 50 hesap, boş metrikler (erişim: 6 Kasım 2026).
- [Keyword planning](https://developers.google.com/google-ads/api/docs/keyword-planning/overview) ve [Generate keyword ideas](https://developers.google.com/google-ads/api/docs/keyword-planning/generate-keyword-ideas): Planlama servisleri, parametreler ve metrikler (erişim: 6 Kasım 2026).
- [Conversions overview](https://developers.google.com/google-ads/api/docs/conversions/overview) ve [Customer Match](https://developers.google.com/google-ads/api/docs/remarketing/audience-segments/customer-match/get-started): Allowlist tarihleri ve Data Manager API'ye geçiş (erişim: 6 Kasım 2026).
- [Change event](https://developers.google.com/google-ads/api/docs/change-event) ve [Change status](https://developers.google.com/google-ads/api/docs/change-status): 30 ve 90 günlük değişiklik kaynakları (erişim: 6 Kasım 2026).
- [Lead form webhook overview](https://developers.google.com/google-ads/webhook/docs/overview) ve [implementation](https://developers.google.com/google-ads/webhook/docs/implementation): JSON gövdesi, yanıt kodları, `google_key` (erişim: 6 Kasım 2026).
- [Client libraries](https://developers.google.com/google-ads/api/docs/client-libs), [.NET library](https://developers.google.com/google-ads/api/docs/client-libs/dotnet), [.NET configuration](https://developers.google.com/google-ads/api/docs/client-libs/dotnet/configuration), [google-ads-dotnet](https://github.com/googleads/google-ads-dotnet): Resmî ve topluluk kütüphaneleri, .NET sürüm uyumu ve ayarlar (erişim: 6 Kasım 2026).
- NuGet paketleri (erişim: 6 Kasım 2026): [Google.Ads.GoogleAds](https://www.nuget.org/packages/Google.Ads.GoogleAds) (27.6.0), [Google.Ads.GoogleAds.Extensions](https://www.nuget.org/packages/Google.Ads.GoogleAds.Extensions) (2.0.8), [Google.Ads.DataManager.V1](https://www.nuget.org/packages/Google.Ads.DataManager.V1) (1.0.0-beta11), [Google.Ads.DataManager.Util](https://www.nuget.org/packages/Google.Ads.DataManager.Util) (0.4.0).
- [Google Ads MCP server](https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server) ve [Developer Assistant](https://developers.google.com/google-ads/api/docs/developer-toolkit/ai-assistant): Salt okunur araçlar (erişim: 6 Kasım 2026).
- [Introduction](https://developers.google.com/google-ads/api/docs/get-started/introduction) ve [Google Ads scripts limits](https://developers.google.com/google-ads/scripts/docs/limits): Alternatifler (scripts, Editor, BigQuery Data Transfer Service), 30 dakika ve 250 betik sınırı (erişim: 6 Kasım 2026).
- [Free desktop software](https://support.google.com/adspolicy/answer/13528034) ve [Unwanted software](https://support.google.com/adspolicy/answer/15938073): Masaüstü yazılım reklamı kuralları (erişim: 6 Kasım 2026).
- [Ads transparency](https://support.google.com/adspolicy/answer/13733850) ([AEA için Almanya seçeneği](https://support.google.com/adspolicy/answer/13733850?hl=en&co=GENIE.CountryCode%3DDE), [Türkiye seçeneği](https://support.google.com/adspolicy/answer/13733850?hl=en&co=GENIE.CountryCode%3DTR)) ve [Ads Transparency Center](https://adstransparency.google.com/): Gösterilen bilgiler, AEA ve Türkiye verisine API erişimi, düzenleyici erişimi (erişim: 6 Kasım 2026).
- [Data Manager API](https://developers.google.com/data-manager/api), [Set up access](https://developers.google.com/data-manager/api/get-started/set-up-access), [Limits and quotas](https://developers.google.com/data-manager/api/limits), [Discovery belgesi](https://datamanager.googleapis.com/$discovery/rest?version=v1): Hedefler, kapsam, kotalar ve yöntemler (erişim: 6 Kasım 2026).
- [Google Ads API support](https://developers.google.com/google-ads/api/support): Destek kanalları (erişim: 6 Kasım 2026).

**Üçüncü taraf**

- [PPC Land: Google drops developer tokens from Ads API access decisions](https://ppc.land/google-drops-developer-tokens-from-ads-api-access-decisions/): Değişikliğin haberi (12.09.2026) (erişim: 6 Kasım 2026).
- [Google Ads API Forum: Auction Insights erişimi](https://groups.google.com/g/adwords-api/c/xhwhOAA5854): API ekibinin allowlist programının kapalı olduğu yanıtı (16.06.2025, 03.11.2025) (erişim: 6 Kasım 2026).
- [Google Ads API Forum: Postman/Swagger isteği](https://groups.google.com/g/adwords-api/c/JG4JIuk5ExQ): API ekibinin böyle dosyaları olmadığı yanıtı (19.08.2021) (erişim: 6 Kasım 2026).
- [Google Developer forums: google_ads_transparency_center tablosu](https://discuss.google.dev/gc/Data-Analytics/Querying-public-google-ads-transparency-center-table-doesn-t/m-p/856073): BigQuery veri kümesinin AEA ve Türkiye kapsamı (kullanıcı gönderisi, 03.01.2025); Marketplace sayfası bu oturumda açılamadı (erişim: 6 Kasım 2026).
- [Search Engine Roundtable: Keyword Planner throttled](https://www.seroundtable.com/google-keyword-planner-throttled-22535.html): Düşük harcamalı hesaplarda hacim aralıkları (15.08.2016) (erişim: 6 Kasım 2026).
- [SerpApi: Google Ads Transparency Center API](https://serpapi.com/blog/serpapi-unveils-google-ads-transparency-api-empowering-developers-to-harness-ads-insights/): Üçüncü taraf ATC API örneği (07.11.2023) (erişim: 6 Kasım 2026).
- [Apify: Google Ads Transparency Scraper (s-r)](https://apify.com/s-r/google-ads-transparency): ATC kazıyıcı aktör; girdiler, 1.000 reklam sınırı, sonuç başına ücret, proxy ve captcha aşma (erişim: 6 Kasım 2026).
- [APIs.guru liste dosyası](https://api.apis.guru/v2/list.json): Google Ads API kaydının olmadığı kontrolü (erişim: 6 Kasım 2026).

---

[← API dizini](../)
