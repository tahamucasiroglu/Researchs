# Google Search Console API ve Indexing API

> Yazılma tarihi: 6 Kasım 2026 · Son doğrulama: 6 Kasım 2026 · Durum: **açık, yalnız kendi mülkün için** (ücretsiz resmî API; doğrulamadığın ya da izin almadığın siteler için veri yok; Indexing API yalnız iş ilanı ve canlı yayın sayfaları için)

**Etiketler:** [RESMÎ] = Google'ın resmî belgesinde, discovery belgesinde ya da resmî paket kaydında okundu · [3. TARAF] = topluluk, haber ya da araç sağlayıcısı kaynağı · [TAHMİN] = çıkarım, doğrulanmadı · [ÇELİŞKİLİ] = resmî kaynaklar kendi aralarında ya da pratikle uyuşmuyor.

## Özet

Google Search Console API (Google API dizinindeki adı `searchconsole` v1; eski adı Webmasters API v3), Search Console'da **sahibi olduğun ya da sana kullanıcı izni verilmiş** mülklerin verisini kodla okumayı ve birkaç yönetim işini yapmayı sağlar: mülkleri listeleme ve ekleme (`sites`), site haritası gönderme ve durumunu izleme (`sitemaps`), Performans raporundaki tıklama, gösterim, tıklama oranı (CTR) ve ortalama konumu sorgulama (`searchAnalytics.query`) ve tek bir URL'nin dizin durumunu sorgulama (`urlInspection.index.inspect`, URL Denetimi API'si) [RESMÎ]. Kullanımı ücretsizdir ama kotalıdır; ayrı bir başvuru ya da onay süreci yoktur, OAuth 2.0 ve Search Console'da mülk izni yeter [RESMÎ]. Kimliksiz uç nokta yoktur ve **başkasının sitesi için hiçbir veri alınamaz**. Arayüzdeki "Dizine eklenmeyi iste" ve "Canlı URL'yi test et" düğmelerinin API karşılığı yoktur; URL Denetimi API'si yalnız Google dizinindeki sürümü raporlar [RESMÎ]. Ayrı bir ürün olan **Indexing API** (v3), bir URL'nin güncellendiğini ya da silindiğini Google'a bildirir; ama yalnız `JobPosting` (iş ilanı) ya da `VideoObject` içine gömülü `BroadcastEvent` (canlı yayın) işaretlemesi taşıyan sayfalarda kullanılabilir, varsayılan kotası günde 200 yayımlama isteğidir ve Eylül 2024'ten beri belge bütün gönderimlerin spam denetiminden geçtiğini yazar [RESMÎ]. Satır sınırı olmayan ham performans verisinin resmî yolu **BigQuery toplu dışa aktarmadır** (günlük; geçmişi doldurmaz; BigQuery ücretleri uygulanır) [RESMÎ].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Herkese açık (kimliksiz)** | — | Veri yok. Yalnız discovery belgeleri (API şeması) herkese açık; kimliksiz çağrı `401 Login Required` döner [RESMÎ, 6.11.2026'da istekle doğrulandı]. Google'a site haritası bildirmenin kimliksiz yolu API değil, robots.txt'deki `Sitemap:` satırıdır; ping ucu 2023'te kalktı [RESMÎ]. API anahtarıyla çalışan tek parça olan Mobile-Friendly Test API 1 Aralık 2023'te emekliye ayrıldı [RESMÎ] | — |
| **Geliştirici hesabı (self-servis): Search Console API** | Google hesabı + Google Cloud projesi + API'yi etkinleştirme + OAuth istemcisi ya da servis hesabı; **ayrıca** Search Console'da o mülk için izin (sahip, tam ya da kısıtlı kullanıcı) [RESMÎ] | Bütün yöntemler: `sites`, `sitemaps`, `searchAnalytics.query`, `urlInspection.index.inspect`. Yazma işleri (`sitemaps.submit/delete`, `sites.add/delete`) `webmasters` kapsamı ister, okuma `webmasters.readonly` ile yapılır [RESMÎ] | Ücretsiz; kotalı: Search Analytics site başına dakikada 1.200 sorgu, URL Denetimi site başına günde 2.000 / dakikada 600 (ayrıntı aşağıda) [RESMÎ] |
| **Geliştirici hesabı + mülk sahipliği: Indexing API** | Servis hesabı, Search Console'da mülkün **sahibi** (yetki verilmiş sahip, delegated owner) olarak eklenir; `indexing` kapsamı [RESMÎ] | `urlNotifications.publish` (`URL_UPDATED` / `URL_DELETED`), `urlNotifications.getMetadata`, toplu istek; yalnız `JobPosting` ve `VideoObject` içindeki `BroadcastEvent` sayfaları [RESMÎ] | Ücretsiz; proje başına günde 200 yayımlama, dakikada 180 metadata, dakikada 380 toplam istek [RESMÎ] |
| **İşletme / uygulama onayı** | Search Console API için ayrı bir onay programı belgede yok [RESMÎ]. Başka kullanıcıların hesabını bağlayan herkese açık bir uygulama, Google OAuth onay ekranından ve gerekirse uygulama doğrulamasından geçer; `webmasters` kapsamlarının "hassas" (sensitive) sınıfta olup olmadığı doğrulanamadı [TAHMİN]. Indexing API, Eylül 2024'ten itibaren "ek onay ve kaynak tahsisi" istiyor ve bir form veriyordu; **16 Ekim 2026'da** form ve onay cümleleri belgeden kaldırıldı [RESMÎ: güncelleme günlüğü; ayrıntı 3. TARAF] | Daha yüksek Indexing API kotası için güncel bir süreç belgede yok [RESMÎ: belgede yok] | — |
| **Ücretli / kurumsal** | API'lerin ücretli katmanı belgede yok [RESMÎ]. BigQuery toplu dışa aktarma için faturalandırması açık bir Google Cloud projesi ve mülk sahipliği gerekir [RESMÎ] | Günlük, API satır sınırına tabi olmayan ham performans verisi (anonim sorguların metni hariç) [RESMÎ] | Search Console tarafı ücretsiz; BigQuery depolama ve sorgu ücretli (her ay ilk 10 GiB depolama ve 1 TiB sorgu ücretsiz) [RESMÎ] |
| **Resmî olmayan** | Arayüz otomasyonu, Indexing API'nin politika dışı ya da çok hesaplı kullanımı, arama sonucu kazıma | "Dizine eklenmeyi iste"yi otomatik tıklatma, sıradan sayfaları Indexing API'ye gönderme, rakip sıralaması | Spam denetimi, erişim iptali, Google Hizmet Şartları ve Google API Hizmet Şartları ihlali (aşağıya bak) |

## Kimlik doğrulama

- **OAuth 2.0 zorunlu.** Search Console API kapsamları: `https://www.googleapis.com/auth/webmasters.readonly` ("doğrulanmış sitelerin Search Console verisini görüntüle") ve `https://www.googleapis.com/auth/webmasters` (görüntüle ve yönet). Indexing API kapsamı: `https://www.googleapis.com/auth/indexing` [RESMÎ]. Belgeye göre "Testing Tools API dışındaki bütün Search Console API'leri OAuth2 kimlik bilgisi ister"; Testing Tools, emekliye ayrılan Mobile-Friendly Test'tir. Yani yalnız API anahtarıyla veri alınamaz [RESMÎ].
- **İki pratik akış:** (a) Kendi hesabınla çalışan masaüstü ya da web OAuth istemcisi (kullanıcı bir kez onay verir, uygulama yenileme token'ıyla devam eder); (b) sunucuda kendi kendine çalışan iş için servis hesabı + JSON anahtar [RESMÎ: OAuth akışları; servis hesabının Search Console API'de kullanımı 3. TARAF].
- **Mülk izni şart.** API, hesabın Search Console'daki iznini kullanır; her yöntem için "uygun Search Console izni" gerekir [RESMÎ]. `sites.list` her mülk için `permissionLevel` döner: `siteOwner`, `siteFullUser` (bütün veriye erişir, çoğu işlemi yapar), `siteRestrictedUser` (verinin çoğuna erişir, bazı işlemleri yapar), `siteUnverifiedUser` (**veriye erişimi yok**) [RESMÎ]. Yardım sayfasındaki izin tablosu: Performans bütün rollere açık; site haritası gönderme sahip ve tam kullanıcıda (Site haritaları raporunun yardım sayfası ise rapordan göndermek için sahip izni ister; sahip olmayanlara robots.txt'deki `Sitemap:` satırını önerir [ÇELİŞKİLİ]); URL Denetimi sahip ve tam kullanıcıda, kısıtlı kullanıcıda "yalnız getirme" (Fetch only); kullanıcı ekleme yalnız sahipte [RESMÎ].
- **Servis hesabını Search Console'a eklemek (Search Console API için):** Cloud'da servis hesabı oluştur → JSON anahtar → Search Console → Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle → `ornek-bot@proje-kimligi.iam.gserviceaccount.com` → salt okuma için **Kısıtlı**, site haritası göndermek için **Tam** (yukarıdaki izin çelişkisine bak) [3. TARAF: Google'ın Search Console API belgesi servis hesabını anlatmıyor]. Search Console izinleri Cloud IAM rollerinden ayrıdır; servis hesabına Cloud'da rol vermek Search Console erişimi sağlamaz [TAHMİN].
- **Indexing API için:** Servis hesabı, mülkün doğrulanmış sahipler listesinden **Add an owner** ile yetki verilmiş sahip olarak eklenir [RESMÎ]. Tam kullanıcı olarak eklemek yetmez; `403 Permission denied. Failed to verify the URL ownership.` alınır [3. TARAF].
- **Sahiplik doğrulaması:** `sites.add` mülkü hesabın listesine ekler; belge bunun sahipliği doğruladığını söylemez [RESMÎ]. Doğrulama arayüzden ya da **Site Verification API** ile yapılır (`siteverification` kapsamı; alan adı için `DNS_TXT`/`DNS_CNAME`, URL öneki için `FILE`, `META`, `ANALYTICS`, `TAG_MANAGER`) [RESMÎ]. Alan adı mülkü yalnız DNS kaydıyla doğrulanır. Search Console doğrulamayı düzenli olarak yeniden denetler; DNS kaydı ya da doğrulama dosyası kaldırılırsa izinler bir süre sonra düşer [RESMÎ]. Bütün doğrulanmış sahipler erişimi kaybederse mülkün bütün kullanıcıları da erişimi kaybeder [RESMÎ]; Indexing API'deki servis hesabı da bu yüzden sahiplikten düşer. Önce mülk yeniden doğrulanır, sonra servis hesabı yeniden sahip olarak eklenir [3. TARAF].
- **Mülk biçimi (`siteUrl`):** URL öneki mülkü `https://www.ornek.com/` (sondaki `/` dahil), alan adı mülkü `sc-domain:ornek.com` [RESMÎ]. Yol içinde URL kodlanmış gider (`sc-domain%3Aornek.com`); istemci kütüphaneleri bunu kendisi yapar [TAHMİN].
- **Sınırlar:** Bir mülkte en çok 100 sahip olmayan kullanıcı olabilir; kullanıcı geçerli bir Google hesabı olmalı, e-posta grubu eklenemez [RESMÎ].
- **Anahtar güvenliği:** JSON anahtarının tek kopyası indirilir ve güvenli saklanmalıdır [RESMÎ]. Depoya konmaz (`.gitignore`); sızarsa Cloud konsolunda hemen silinir [TAHMİN]. Indexing API için sahip yapılan servis hesabını, analiz için kısıtlı yetkili ayrı bir servis hesabından ayırmak riski azaltır [TAHMİN].
- **Çok kullanıcılı uygulama (SaaS):** Kullanıcılar kendi Search Console hesaplarını 3 bacaklı (3-legged) OAuth ile bağlar. En dar kapsam (`webmasters.readonly`) istenir. Token'lar ve hesap e-postaları kişisel veridir; KVKK/GDPR kapsamında aydınlatma, saklama süresi ve silme yolu gerekir [TAHMİN: hukuki danışmanlık değildir].

## Temel uç noktalar

Taban adresler: belgelerde `https://www.googleapis.com/webmasters/v3/`; aynı yollar discovery belgesinin kökü olan `https://searchconsole.googleapis.com/webmasters/v3/` altında da çalışır (ikisi de 6.11.2026'da kimliksiz istekte 401 döndü). URL Denetimi yalnız `https://searchconsole.googleapis.com/v1/` altındadır [RESMÎ].

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/webmasters/v3/sites` | Hesabın erişebildiği mülkleri ve izin düzeyini (`permissionLevel`) listeler | `webmasters.readonly` | Doğrulanmamış mülk `siteUnverifiedUser` olarak görünür, verisine erişilmez [RESMÎ] |
| GET | `/webmasters/v3/sites/{siteUrl}` | Tek mülkün bilgisini döner | `webmasters.readonly` | [RESMÎ] |
| PUT | `/webmasters/v3/sites/{siteUrl}` | Mülkü hesabın listesine ekler | `webmasters` | Belge sahipliği doğruladığını söylemez; doğrulama arayüzden ya da Site Verification API ile yapılır [RESMÎ] |
| DELETE | `/webmasters/v3/sites/{siteUrl}` | Mülkü hesabın listesinden çıkarır | `webmasters` | [RESMÎ] |
| GET | `/webmasters/v3/sites/{siteUrl}/sitemaps` | Gönderilmiş site haritalarını listeler; `sitemapIndex` verilirse o dizindeki haritaları | `webmasters.readonly` | [RESMÎ] |
| GET | `/webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}` | Tek site haritasının durumunu döner: `lastSubmitted`, `lastDownloaded`, `isPending`, `isSitemapsIndex`, `type`, `errors`, `warnings`, `contents[].submitted` | `webmasters.readonly` | `contents[].indexed` kullanımdan kalktı ("Deprecated; do not use") [RESMÎ] |
| PUT | `/webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}` | Site haritası gönderir | `webmasters`; izin tablosuna göre sahip ya da tam kullanıcı, Site haritaları yardım sayfasına göre sahip [ÇELİŞKİLİ] | Gönderim yalnız bir ipucudur, indirmeyi garanti etmez. Harita başına 50.000 URL / 50 MB (sıkıştırılmamış) [RESMÎ] |
| DELETE | `/webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}` | Site haritasını rapordan siler | `webmasters` | Google'ın o haritayı ya da içindeki URL'leri taramasını **durdurmaz**; Google haritayı ve içindeki URL'leri "unutmaz" [RESMÎ: Site haritaları raporu yardım sayfası] |
| POST | `/webmasters/v3/sites/{siteUrl}/searchAnalytics/query` | Performans verisini döner: tıklama, gösterim, CTR, ortalama konum; boyut ve filtrelerle | `webmasters.readonly` | İstek başına en çok 25.000 satır; ayrıntı aşağıda [RESMÎ] |
| POST | `https://searchconsole.googleapis.com/v1/urlInspection/index:inspect` | Tek URL'nin **Google dizinindeki** sürümünün durumunu döner (URL Denetimi aracının API'si) | `webmasters.readonly` | Mülk başına günde 2.000, dakikada 600 sorgu; canlı test yapmaz [RESMÎ] |
| POST | `https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run` | Mobil uyumluluk testi | API anahtarı | **Emekli** (1 Aralık 2023). Discovery belgesinde ve NuGet paketinde hâlâ görünür; kullanma [RESMÎ] |
| — | (yok) | "Dizine eklenmeyi iste", "Canlı URL'yi test et", Sayfa dizine ekleme raporunun toplu listesi, Bağlantılar, Core Web Vitals, Elle işlemler, Güvenlik sorunları, Kaldırmalar, kullanıcı yönetimi, Üretken YZ performans raporu, markalı sorgu filtresi | — | `searchconsole` v1 discovery belgesinde (revizyon 20261104) bu işlerin yöntemi yok; yalnız arayüzde [RESMÎ] |

### `searchAnalytics.query` parametreleri

| Alan | Değerler | Not |
|---|---|---|
| `startDate`, `endDate` (zorunlu) | `YYYY-MM-DD` | Pasifik saati (PT); iki uç dahil [RESMÎ] |
| `dimensions[]` | `date`, `query`, `page`, `country`, `device`, `searchAppearance`, `hour` | Gruplama verilen sırayla yapılır; aynı boyut iki kez kullanılamaz. `country` ISO 3166-1 alpha-3 (`tur`), `device` `DESKTOP`/`MOBILE`/`TABLET`. `hour` son 10 günle sınırlıdır ve `dataState: hourly_all` ister [RESMÎ]. `searchAppearance` başka boyutlarla aynı sütunda gelmez; önce görünüm türleri alınır, sonra her tür filtre olarak kullanılıp diğer boyutlar eklenir [RESMÎ] |
| `type` | `web` (varsayılan), `image`, `video`, `news` (Arama'daki Haberler sekmesi), `discover`, `googleNews` (news.google.com ve Google Haberler uygulaması) | Eski `searchType` alanı kullanımdan kalktı; her tür için ayrı sorgu atılır [RESMÎ] |
| `dimensionFilterGroups[]` | `groupType`: yalnız `and`. Filtre: `dimension` (`query`, `page`, `country`, `device`, `searchAppearance`), `operator` (`equals`, `notEquals`, `contains`, `notContains`, `includingRegex`, `excludingRegex`), `expression` | Regex RE2 söz dizimindedir; filtre (boyut + işleç + değer) en çok 4.096 karakter. `contains` ve `notContains` büyük/küçük harfe duyarsızdır; `equals` (varsayılan) ve `notEquals` ise `page` ve `query` boyutlarında **duyarlıdır**. Gruplanmayan bir boyuta göre de filtrelenebilir [RESMÎ] |
| `aggregationType` | `auto` (varsayılan), `byPage`, `byProperty`, `byNewsShowcasePanel` | Sayfaya göre gruplanıyor ya da filtreleniyorsa `byProperty` kullanılamaz; `discover` ve `googleNews` için `byProperty` desteklenmez [RESMÎ] |
| `rowLimit`, `startRow` | 1–25.000 (varsayılan 1.000); `startRow` 0'dan başlar | Sayfalama: `startRow` 25.000'er artırılır, boş yanıt gelince durulur [RESMÎ] |
| `dataState` | `final` (varsayılan), `all` (kesinleşmemiş taze veri dahil), `hourly_all` | `all` + `date` gruplamasında `metadata.first_incomplete_date`, `hourly_all` + `hour` gruplamasında `metadata.first_incomplete_hour` döner (aralıkta eksik veri varsa); o noktadan sonraki değerler belirgin biçimde değişebilir [RESMÎ] |
| Yanıt | `rows[]`: `keys[]`, `clicks`, `impressions`, `ctr` (0–1), `position`; `responseAggregationType`; `metadata` | Satırlar tıklamaya göre azalan sıralıdır; `date` ile gruplanırsa tarihe göre artan. Verisi olmayan günler yanıtta yer almaz [RESMÎ] |

### Veri sınırları ve gecikme

- **Gecikme:** Kesin veri genelde 2–3 gün sonra gelir. En son veri olan günü bulmak için son 10 gün `date` boyutuyla sorgulanır [RESMÎ]. Kesinleşmemiş taze veri `dataState: "all"` ile, saatlik kırılım `hour` + `hourly_all` ile alınır (son 10 gün; 9 Nisan 2025'ten beri). Arayüz saatlik veriyi yalnız son 24 saat için gösterir [RESMÎ].
- **Geçmiş:** 16 ay. Daha uzun dönem için veri API ya da toplu dışa aktarmayla düzenli olarak kendi sistemine çekilmelidir [RESMÎ].
- **Satır sınırı:** İstek başına 25.000 satır. API her gün ve her arama türü için tıklamaya göre sıralı **en çok 50.000 satır** açar ve "bütün satırları döndürmeyi garanti etmez" [RESMÎ]. Arayüzden en çok 1.000 satır dışa aktarılabilir [RESMÎ: 2022 Search Central blogu].
- **Anonim sorgular:** Gizlilik için bazı sorgular satırlarda yer almaz, ama sorgu filtresi yoksa grafik toplamlarına dahildir [RESMÎ]. Bu yüzden `query` boyutlu satırların toplamı boyutsuz toplamdan küçük çıkar. Doğru toplam için `page` ve `query` boyutlarını kullanma [RESMÎ].
- **Mülk ve sayfa bazlı toplama:** Grafik ve sorgu, ülke, cihaz, tarih tabloları mülke göre; sayfa ve arama görünümü tabloları sayfaya göre toplanır. Toplamların farklı çıkmasının yaygın nedeni budur [RESMÎ].
- **Önerilen ritim:** Gün gün ve tercihen günde bir kez sorgula; her `type` için ayrı sorgu at [RESMÎ].
- **Kullanımdan kalkanlar:** FAQ zengin sonuçları 7 Mayıs 2026'da Arama'dan kalktı [RESMÎ]. Google'ın Mayıs 2026 notuna göre Search Console API'deki FAQ desteği Ağustos 2026'da kaldırılacaktı [3. TARAF: SEJ 10.05.2026]. `searchAnalytics.query` başvuru sayfasının 6.11.2026'da indirilen sürümünde (son güncelleme 11.08.2026) bu not artık yok; kaldırmanın gerçekleştiği resmî olarak doğrulanamadı. FAQ görünüm türüne dayanan eski filtreler gözden geçirilmeli [TAHMİN]. "Practice problem" türü Ocak 2026'ya kadar destekleniyordu [RESMÎ].
- **API'de olmayanlar:** Üretken YZ performans raporu (AI Overviews / AI Mode gösterimleri; 31 Ağustos 2026'dan beri bütün sitelerde) ve markalı/markasız sorgu filtresi API'de yok; `type` ve filtre değerlerinde karşılıkları bulunmuyor [RESMÎ: discovery 20261104]. AI Overviews ve AI Mode verisi Performans toplamlarına dahildir, ayrı bir API değeri yoktur [RESMÎ].

### `urlInspection.index.inspect` yanıtı

- **İstek:** `inspectionUrl` (mülkün altında olmalı), `siteUrl`, isteğe bağlı `languageCode` (sorun iletilerinin dili, ör. `tr-TR`; varsayılan `en-US`) [RESMÎ].
- **Yanıt (`inspectionResult`):** `inspectionResultLink` (aynı denetimin Search Console'daki bağlantısı), `indexStatusResult`, `ampResult` (yalnız AMP sayfalarında), `richResultsResult` (algılanan zengin sonuç türleri ve sorunları; yoksa alan gelmez), `mobileUsabilityResult` (**kullanımdan kalktı**) [RESMÎ].
- **`indexStatusResult` alanları:** `verdict` (`PASS` = Geçerli, `FAIL` = Hata/Geçersiz, `NEUTRAL` = Hariç tutuldu; `PARTIAL` artık kullanılmıyor), `coverageState` (metin), `robotsTxtState` (`ALLOWED`/`DISALLOWED`), `indexingState` (`INDEXING_ALLOWED`, `BLOCKED_BY_META_TAG`, `BLOCKED_BY_HTTP_HEADER`), `pageFetchState` (`SUCCESSFUL`, `SOFT_404`, `BLOCKED_ROBOTS_TXT`, `NOT_FOUND`, `ACCESS_DENIED`, `SERVER_ERROR`, `REDIRECT_ERROR`, `ACCESS_FORBIDDEN`, `BLOCKED_4XX`, `INTERNAL_CRAWL_ERROR`, `INVALID_URL`), `lastCrawlTime` (RFC 3339, UTC), `crawledAs` (`MOBILE`/`DESKTOP`), `googleCanonical`, `userCanonical`, `sitemap[]` (eksik olabilir), `referringUrls[]` [RESMÎ].
- **Sınır:** Yalnız Google dizinindeki sürüm raporlanır; canlı URL'nin dizine eklenebilirliği test edilemez [RESMÎ]. Dizine ekleme isteği gönderen bir yöntem de yoktur [RESMÎ: discovery 20261104].
- **Google'ın önerdiği kullanım:** Önemli sayfaları izlemek ve kullanıcının bildirdiği kanonik ile Google'ın seçtiği kanonik arasındaki farkları yakalamak [RESMÎ: duyuru blogu, 31.01.2022].

### BigQuery toplu dışa aktarma

API değildir ama en büyük resmî veri yoludur; 21 Şubat 2023'te duyuruldu [RESMÎ].

- **Ne verir:** Performans verisinin günlük dışa aktarımı. API'deki günlük satır sınırına tabi değildir; on binlerce sayfa ya da sorgusu olan büyük siteler için önerilir. Küçük ve orta sitelere arayüz, Looker Studio bağlayıcısı ve Search Analytics API yeter [RESMÎ].
- **Kurulum:** Cloud projesinde BigQuery API ve BigQuery Storage API açılır. `search-console-data-export@system.gserviceaccount.com` hesabına **BigQuery Job User** ve **BigQuery Data Editor** rolleri verilir. Search Console → Ayarlar → Toplu veri dışa aktarma bölümüne proje kimliği (proje numarası değil), veri kümesi adı (`searchconsole` ile başlamalı) ve konum girilir; konum sonradan kolay değişmez [RESMÎ]. Yalnız mülk sahipleri kurabilir [RESMÎ: 2023 blogu]. Projenin faturalandırma yapılandırması geçerli olmalıdır, yoksa yazma başarısız olur [RESMÎ].
- **Zamanlama:** İlk dışa aktarma başarılı kurulumdan sonraki 48 saat içinde, o günün verisiyle gelir. **Geçmiş doldurulmaz**; öncesi için API ya da raporlar kullanılır [RESMÎ].
- **Tablolar:** `searchdata_site_impression` (mülke göre), `searchdata_url_impression` (URL'ye göre), `ExportLog` (yalnız başarılı dışa aktarmalar). Alanlar: `data_date` (PT), `site_url`, `query`, `is_anonymized_query`, `country`, `search_type`, `device`, `url`, `impressions`, `clicks`, `sum_top_position` / `sum_position` ve görünüm türü bayrakları (`is_*`). Ortalama konum `SUM(sum_top_position) / SUM(impressions) + 1` ile hesaplanır (URL tablosunda `sum_position`) [RESMÎ].
- **Anonim sorgular:** Metinleri dışa aktarılmaz (2023 blogu "gizlilik için çıkarılır" der). Tablo belgesi bu satırları `is_anonymized_query = true` ile işaretler, ama `query` alanını bir yerde boş dize, başka bir yerde NULL diye tanımlar [ÇELİŞKİLİ].
- **Saklama:** Tablolar varsayılan olarak süresiz kalır. Tablo süresi değil **bölüm (partition) süresi** ayarlanmalı (en az 14 gün önerilir); tablo şeması değiştirilirse dışa aktarma bozulur [RESMÎ].
- **Hatalar:** Geçici hatalar hemen, kalıcı hatalar ertesi gün yeniden denenir. Başarısız günün verisi yaklaşık bir hafta tutulur, sonra o gün düşer. Hata yaklaşık bir ay sürerse dışa aktarma tamamen durur. Hata ve düzelme e-postaları bütün sahiplere ve tam kullanıcılara gider [RESMÎ].
- **Durdurma:** "Deactivate export" ile 24 saat içinde durur; mevcut tablolar silinmez [RESMÎ].

## Indexing API

Indexing API, site sahiplerinin **iş ilanı ve canlı yayın video sayfaları** eklendiğinde, değiştiğinde ya da kaldırıldığında Google'a doğrudan haber vermesini sağlar; Google bu sayfaları yeniden taramayı öne alabilir [RESMÎ]. Search Console API'den ayrı bir API'dir (`indexing` v3, `https://indexing.googleapis.com/`), ama yetkiyi yine Search Console'daki mülk sahipliğinden alır.

### Hangi sayfalar için

- Yalnız `JobPosting` ya da `VideoObject` içine gömülü `BroadcastEvent` işaretlemesi olan sayfaları taratmak için kullanılabilir [RESMÎ]. Video tarafında yalnız canlı yayınlar desteklenir [RESMÎ].
- Bildirilen URL, bildirimi yapanın sahibi olduğu bir mülkte olmalıdır. `URL_UPDATED` ile bildirilen URL Google tarafından taranabilir olmalıdır [RESMÎ]. Bu yüzden başka platformdaki (ör. YouTube) bir yayın sayfası bildirilemez; API **kendi sitendeki** izleme sayfası içindir.
- **İş ilanları:** Google iş ilanı URL'leri için site haritası yerine Indexing API'yi önerir; sitenin geneli için site haritası yine gönderilmelidir. Kapanan ilan için `validThrough` geçmiş bir tarihe çekilir, sayfa 404/410 döndürür ya da `JobPosting` işaretlemesi kaldırılır; ardından Indexing API ile kaldırma bildirilir. Kapanmış ilanı yayında bırakmak elle işlem riskidir [RESMÎ].
- **Canlı yayın:** API yayın başladığında, bittiğinde (`endDate` eklendiğinde) ve işaretleme her değiştiğinde çağrılır. LIVE rozeti için `publication` içinde `BroadcastEvent`, `isLiveBroadcast: true`, `startDate` ve yayın bitince `endDate` gerekir [RESMÎ].
- **Sıradan blog, ürün, kategori ya da haber sayfası: desteklenmez.** Bunların yolu site haritası, iç bağlantı ve önemli birkaç sayfa için arayüzdeki "Dizine eklenmeyi iste"dir (bkz. Depoda ilgili sayfalar).

### Kurulum

1. Google Cloud'da proje aç ve Indexing API'yi etkinleştir [RESMÎ].
2. Servis hesabı oluştur ve JSON anahtarını indir. Anahtarın tek kopyası budur; güvenli sakla [RESMÎ].
3. Mülkü Search Console'da desteklenen herhangi bir yöntemle doğrula (alan adı ya da URL öneki mülkü) [RESMÎ].
4. Mülkün doğrulanmış sahipler listesinde **Add an owner** ile servis hesabının `client_email` adresini (`ornek-bot@proje-kimligi.iam.gserviceaccount.com`) yetki verilmiş sahip olarak ekle [RESMÎ]. "Kullanıcı ekle" ile tam kullanıcı yapmak yetmez [3. TARAF].
5. `https://www.googleapis.com/auth/indexing` kapsamıyla erişim token'ı al; token sınırlı süre geçerlidir ve her çağrıda gönderilir [RESMÎ].

### Uç noktalar

| Metot | Uç nokta | Ne yapar | Not/limit |
|---|---|---|---|
| POST | `https://indexing.googleapis.com/v3/urlNotifications:publish` | `{"url": "...", "type": "URL_UPDATED"}` ya da `"URL_DELETED"` bildirir | Yanıt 200 + `urlNotificationMetadata`. Belgeye göre 200, Google'ın "URL'yi yakında yeniden taramayı deneyebileceği" anlamına gelir; tarama, dizine ekleme ya da kaldırma zamanı garanti değildir. `URL_DELETED` göndermeden önce sayfa 404/410 döndürmeli ya da `noindex` taşımalıdır [RESMÎ] |
| GET | `https://indexing.googleapis.com/v3/urlNotifications/metadata?url={kodlanmış URL}` | Google'ın o URL için aldığı son güncelleme ve kaldırma bildirimlerini (`latestUpdate`, `latestRemove`, `notifyTime`) döner | Yalnız daha önce başarılı bildirim yapılmış URL'lerde çalışır; URL'nin dizine eklenip eklenmediğini **söylemez** [RESMÎ] |
| POST | `https://indexing.googleapis.com/batch` | Tek HTTP isteğinde en çok 100 çağrı gönderir (`multipart/mixed`; her parça `application/http`, en çok 1 MB) | Kota istek başına değil URL başına sayılır [RESMÎ] |

### İstek ve yanıt örneği

```http
POST https://indexing.googleapis.com/v3/urlNotifications:publish
Authorization: Bearer <ERISIM_TOKENI>
Content-Type: application/json

{
  "url": "https://www.ornek.com/ilanlar/ornek-ilan-123",
  "type": "URL_UPDATED"
}
```

Durum sorgusunun (`getMetadata`) yanıt yapısı:

```json
{
  "url": "https://www.ornek.com/ilanlar/ornek-ilan-123",
  "latestUpdate": { "url": "https://www.ornek.com/ilanlar/ornek-ilan-123", "type": "URL_UPDATED", "notifyTime": "2026-11-06T09:30:00Z" }
}
```

- `notifyTime` istekte verilmez; verilse de yok sayılır [RESMÎ].
- Belgedeki tutarsızlıklar: "API'yi kullanma" kılavuzundaki durum örneği alan adlarını snake_case (`latest_update`, `notify_time`) yazar; REST başvurusu ve istemci kütüphaneleri camelCase (`latestUpdate`, `notifyTime`) kullanır. Hata iletisi ve `latestRemove` açıklaması `URL_REMOVED` der; geçerli değer `URL_DELETED`'dır [ÇELİŞKİLİ].

### Kota, fiyat ve onay durumu

- **Varsayılan kota (proje başına):** günde **200** `publish` isteği (`URL_UPDATED` ve `URL_DELETED` toplamı; Pasifik saatiyle gece yarısı sıfırlanır, yeni kotanın etkinleşmesi 24 saati bulabilir), dakikada **180** `getMetadata`, bütün uç noktalar için dakikada **380** istek [RESMÎ]. Kota Google Cloud konsolundaki kota sayfasından izlenir [RESMÎ].
- **Fiyat:** "Indexing API'nin bütün kullanımı ödemesizdir" [RESMÎ].
- **Onay:** Eylül 2024 değişiklikleriyle belge, varsayılan kotanın Indexing API'yi **kurmak için** olduğunu yazdı. Ayrıca kullanım için ek onay ve kaynak tahsisi istedi ve "kota ve onay talebi" formu verdi (kota belge kalitesine göre artıp azalabiliyordu) [RESMÎ: güncelleme günlüğü 4 ve 11 Eylül 2024; ayrıntı 3. TARAF]. **16 Ekim 2026'da** form ve onay cümleleri kaldırıldı; kota sayfası "güncel kota sınırları ve süreci" yansıtacak biçimde değişti [RESMÎ: güncelleme günlüğü; 3. TARAF: SEJ 17.10.2026]. Belge bugün ne onaydan ne kota artırmadan söz ediyor. Daha önce onay bekleyen projelerin ya da onaysız projelerin varsayılan kotayla canlı ilan gönderip gönderemeyeceği yazmıyor [RESMÎ: belgede yok].

### Indexing API hataları

Bu hataların hepsinde istek reddedilir ve URL taranmaz; genel Google API hataları da geçerlidir [RESMÎ].

| HTTP | İleti | Ne yapmalı |
|---|---|---|
| 400 | `Missing attribute. 'url' attribute is required.` | İstekte URL yok; ekle [RESMÎ] |
| 400 | `Invalid attribute. 'url' is not in standard URL format` | URL'yi tam ve geçerli biçimde ver [RESMÎ] |
| 400 | `Unknown type. 'type' attribute is required…` / `Invalid value at 'url_notification.type'` | `type` alanını `URL_UPDATED` ya da `URL_DELETED` yap (iletideki `URL_REMOVED` adı belgedeki tutarsızlıktır) [RESMÎ / ÇELİŞKİLİ] |
| 403 | `Permission denied. Failed to verify the URL ownership.` | Servis hesabı o URL'nin mülkünde sahip değil ya da URL hesaba ait değil. Sahipliği tamamla [RESMÎ]; mülk doğrulaması düşmüşse önce yeniden doğrula [3. TARAF] |
| 429 | `Insufficient tokens for quota 'indexing.googleapis.com/default_requests'` | Kota bitti; istek hacmini düşür, kota yenilenince tekrar dene [RESMÎ] |

### Değişiklik geçmişi

- **1 Mayıs 2020:** URL kaldırmak için `noindex` robots meta etiketi de seçenek olarak eklendi [RESMÎ].
- **4 Eylül 2024:** Varsayılan kotanın kurulum için olduğu açıklandı; dakikalık toplam istek (`DefaultRequestsPerMinutePerProject`) değeri düzeltildi [RESMÎ].
- **11 Eylül 2024:** Gönderimlerin spam denetimine tabi olduğu eklendi. Hızlı başlangıç sayfası artık "Indexing API'ye yapılan bütün gönderimler sıkı bir spam denetiminden geçer" ve "birden çok hesap kullanmak ya da kotayı aşmanın başka yolları dahil kötüye kullanma girişimleri erişimin iptaline yol açabilir" diyor. Giriş cümlesi "her site sahibi" yerine "iş ilanı ya da canlı yayın video sayfaları" diye daraltıldı [RESMÎ; değişikliğin ayrıntısı 3. TARAF: SER 12.09.2024].
- **16 Ekim 2026:** Kota sayfası "güncel kota sınırlarını ve süreci" yansıtacak biçimde güncellendi ve "eskimiş bir form" kaldırıldı [RESMÎ: güncelleme günlüğü]. Kaldırılanın onay ve kota talebi formu ile "ek onay gerekir" cümleleri olduğunu SEJ yazıyor [3. TARAF: SEJ 17.10.2026]; hızlı başlangıç ve kota sayfalarının bugünkü metninde onay adımı yok [RESMÎ].

## Gerçek zamanlı / bildirim

- **Webhook, stream, WebSocket:** Yok. İki API'nin discovery belgelerinde de izleme (watch) ya da bildirim yöntemi bulunmuyor [RESMÎ].
- **Yoklama:** Google gün gün ve günde bir kez sorgulamayı önerir; kesin veri genelde 2–3 gün sonra gelir [RESMÎ]. En taze veri `dataState: "all"` ile, saatlik kırılım `hour` + `hourly_all` ile alınır (son 10 gün) [RESMÎ]. Kesinleşmemiş satırlar `metadata.first_incomplete_date` / `first_incomplete_hour` ile işaretlenir; sonraki çekimde bu günlerin üzerine yazmak gerekir [RESMÎ: işaretleme; TAHMİN: üzerine yazma deseni].
- **Search Console mesajları:** Yeni bir dizin sorunu gibi mülk mesajları mülkün uygun kullanıcılarına gönderilir ve e-postayla da gelir; mesaj panelinde 2.000'e kadar mesaj durur [RESMÎ]. Bunların API'si yok. E-posta kutusunu işleyerek "yarı anlık" bir uyarı kurulabilir [TAHMİN].
- **BigQuery:** Günde bir dışa aktarma; hata e-postaları sahiplere ve tam kullanıcılara gider [RESMÎ].
- **Indexing API'nin yönü:** Bildirim senden Google'a gider; Google sana "taradım" ya da "dizine ekledim" bildirimi göndermez. `getMetadata` yalnız bildirimin alındığını gösterir [RESMÎ]. Sonucu görmek için birkaç gün sonra `urlInspection.index.inspect` ile `lastCrawlTime` ve `verdict` değerlerine bakılabilir [TAHMİN: iki API'yi birleştirme önerisi].
- **RSS/Atom:** Yok [RESMÎ: belgede yok].

## Neler mümkün

Bu API ile hangi iş yapılabilir, hangisi yapılamaz (takip uygulaması açısından da):

| İş | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Kendi sitenin günlük tıklama, gösterim, CTR ve ortalama konumunu toplamak | Evet | `searchAnalytics.query`, gün gün, günde bir kez | Geliştirici hesabı + mülk izni (kısıtlı kullanıcı yeter) | Kesin veri 2–3 gün gecikmeli; 16 ay geçmiş var, uzun dönem için kendi veritabanında sakla [RESMÎ] |
| Bugünün ya da son saatlerin trafiğini izlemek (ani düşüş alarmı) | Kısmen | `dataState: all`; `hour` + `hourly_all` (son 10 gün) | Aynı | Veri kısmidir ve sonradan değişir [RESMÎ] |
| Yeni sorgu ya da yeni sayfanın gösterim almaya başlamasını yakalamak | Evet (yoklama) | Günlük `query`/`page` sorgusu ve önceki günle karşılaştırma | Aynı | Anonim ve düşük hacimli sorgular görünmez; satır sınırı var [RESMÎ] |
| Discover ve Google Haberler performansı | Evet | `type: discover` / `googleNews` | Aynı | `byProperty` toplama desteklenmez [RESMÎ] |
| Önemli URL'lerin dizinde olup olmadığını, Google'ın seçtiği kanoniği, son tarama zamanını izlemek | Evet | `urlInspection.index.inspect` | Geliştirici hesabı + mülk izni | Mülk başına günde 2.000 URL; yalnız dizindeki sürüm [RESMÎ]. Arayüzün izin tablosunda URL Denetimi sahip ve tam kullanıcıya açık, kısıtlı kullanıcıya "yalnız getirme"; API'nin kısıtlı kullanıcıyla çalışıp çalışmadığı belgede yok [TAHMİN] |
| Bir sayfanın şu anki canlı hâlini Google gözüyle test etmek | **Hayır (API)** | Yalnız arayüzde "Canlı URL'yi test et" | — | Mülk başına günlük sınır var, sayı yayımlanmıyor [RESMÎ] |
| "Dizine eklenmeyi iste" | **Hayır (API)** | Yalnız arayüz | — | Günlük sınır var, sayı yayımlanmıyor; aynı URL'yi tekrar istemek taramayı hızlandırmaz [RESMÎ] |
| Yeni sayfaları Google'a bildirmek (sıradan site) | Dolaylı | `sitemaps.submit` ya da robots.txt `Sitemap:` + doğru `lastmod` | Geliştirici hesabı + sahip ya da tam kullanıcı | Site haritası bir ipucudur; tarama birkaç günden birkaç haftaya kadar sürebilir [RESMÎ] |
| İş ilanı ya da kendi sitendeki canlı yayın sayfasını hızla bildirmek | Evet | Indexing API `publish` (`URL_UPDATED` / `URL_DELETED`) | Geliştirici hesabı + servis hesabı mülk sahibi | Günde 200 yayımlama; tarama garantisi yok [RESMÎ] |
| Sıradan blog ya da ürün sayfasını Indexing API ile dizinletmek | **Hayır (politika)** | — | — | Desteklenmeyen sayfa türü; spam denetimi ve erişim iptali riski [RESMÎ] |
| Site haritası hatalarını izlemek | Evet | `sitemaps.list` / `sitemaps.get` (`errors`, `warnings`, `isPending`, `lastDownloaded`) | Geliştirici hesabı + mülk izni | `contents.indexed` kalktı; dizindeki sayfa sayısının raporu API'de yok [RESMÎ] |
| Satır sınırsız, ham ve uzun dönemli performans verisi | Evet | BigQuery toplu dışa aktarma | Ücretli / kurumsal (faturalı Cloud projesi) + mülk sahibi | Geçmiş doldurulmaz; ilk gün açılmalı [RESMÎ] |
| Doğrulamadığın ya da izin verilmeyen bir sitenin (ör. rakip) tıklama, gösterim ya da dizin verisi | **Hayır** | — | — | API yalnız hesabın izni olan mülklerin verisini döner; doğrulanmamış mülkün verisine erişim yok [RESMÎ] |
| Bir rakibin Google sıralamasını izlemek | **Hayır (resmî)** | Bu API'de yok | Resmî olmayan (arama sonucu kazıma) | Google Hizmet Şartları'nın otomatik erişim maddesine takılır; aşağıya bak |
| Herhangi bir sitenin hız (Core Web Vitals) verisi | Başka API ile evet | [CrUX API ve PageSpeed Insights API](PageSpeed-Insights-ve-CrUX.md) (API anahtarı) | Geliştirici hesabı | Origin ya da URL düzeyinde 28 günlük kayan ortalama, yaklaşık 2 gün gecikmeli; CrUX API proje başına dakikada 150 sorgu, ücretsiz [RESMÎ] |
| Gerçek zamanlı push (webhook) | **Hayır** | Yoklama + Search Console e-postaları | — | Belgede webhook yok [RESMÎ] |
| Kullanıcı ekleme/çıkarma, elle işlemler, güvenlik sorunları, bağlantılar, CWV raporu, kaldırmalar | **Hayır (API)** | Yalnız arayüz | — | Discovery belgesinde bu işlerin yöntemi yok [RESMÎ] |
| Bing ve Yandex'e değişikliği anında bildirmek | Bu API ile hayır | [IndexNow](IndexNow.md) (Google kullanmaz) | Herkese açık (sitede anahtar dosyası) | Ayrıntı SEO rehberi Bölüm 14'te |

### Durum → Sonuç

- **Kendi siten, kişisel panel ya da rapor** → Masaüstü OAuth istemcisi ya da kısıtlı kullanıcı olarak eklenmiş servis hesabı; `webmasters.readonly`; günlük `searchAnalytics.query` + önemli URL'ler için `urlInspection.index.inspect`. URL Denetimi çağrısı kısıtlı izinle reddedilirse servis hesabı tam kullanıcı yapılır [TAHMİN].
- **Müşterinin sitesi (ajans ya da serbest çalışan)** → Mülk müşteride kalır; müşteri senin hesabını ya da servis hesabını önce kısıtlı kullanıcı olarak ekler. Site haritası göndermek gerekiyorsa tam kullanıcı yapılır. Bir yardım sayfası gönderim için sahip izni istiyor [ÇELİŞKİLİ]; gönderim reddedilirse harita robots.txt'deki `Sitemap:` satırıyla bildirilir, bunun için Search Console izni gerekmez [RESMÎ].
- **Kullanıcıların kendi Search Console hesabını bağladığı SaaS** → 3 bacaklı OAuth, en dar kapsam, OAuth onay ekranı ve gerekirse uygulama doğrulaması; token'lar şifreli saklanır ve kişisel veri kurallarına uyulur [TAHMİN].
- **İş ilanı sitesi ya da kendi sitende canlı yayın** → Indexing API (servis hesabı mülk sahibi) + site haritası; ilan kapanınca `URL_DELETED` ya da geçmiş tarihli `validThrough`.
- **Sıradan blog, kurumsal site ya da e-ticaret** → Site haritası (`sitemaps.submit` ya da robots.txt), iç bağlantı, önemli birkaç sayfa için arayüzden "Dizine eklenmeyi iste". Indexing API kullanılmaz.
- **Büyük site (on binlerce sayfa ya da sorgu) ya da 16 aydan uzun geçmiş ihtiyacı** → İlk gün BigQuery toplu dışa aktarmayı aç; API'yi kurulum öncesi geçmişi çekmek için kullan.
- **Bing ve Yandex de önemli** → IndexNow ekle.

**Sonuç:** Takip uygulaması açısından Search Console API bir **yoklama** kaynağıdır ve yalnız **kendi** (doğrulanmış ya da izin verilmiş) mülklerin için çalışır: günlük performans çekimi, önemli URL'lerin dizin durumu ve site haritası hataları. Anlık uyarıya en yakın araçlar Search Console e-postaları ile `dataState: all` ve saatlik veridir. Başkasının sitesini izlemek bu API ile mümkün değildir; yalnız herkese açık başka veri setleri (CrUX gibi) ya da resmî olmayan yollar kalır.

## Hız sınırları ve fiyatlar

| API / kaynak | Sınır | Kapsam | Not |
|---|---|---|---|
| Search Analytics (`searchAnalytics.query`) | Dakikada 1.200 sorgu | Site başına | Ayrıca yük (load) kotası var; aşağıya bak [RESMÎ] |
| | Dakikada 1.200 sorgu | Kullanıcı başına | [RESMÎ] |
| | Dakikada 40.000, günde 30.000.000 sorgu | Proje başına | [RESMÎ] |
| URL Denetimi (`urlInspection.index.inspect`) | Günde 2.000, dakikada 600 sorgu | Site (mülk) başına | [RESMÎ] |
| | Günde 10.000.000, dakikada 15.000 sorgu | Proje başına | [RESMÎ] |
| Diğer kaynaklar (`sites`, `sitemaps`) | Saniyede 20, dakikada 200 sorgu | Kullanıcı başına | Proje başına günde 100.000.000 [RESMÎ] |
| Search Analytics satırları | İstek başına 25.000; gün ve arama türü başına en çok 50.000 satır | Mülk | [RESMÎ] |
| Indexing API `publish` | Günde 200 | Proje başına | `URL_UPDATED` + `URL_DELETED`; toplu istekte URL başına sayılır; PT gece yarısı sıfırlanır [RESMÎ] |
| Indexing API `getMetadata` | Dakikada 180 | Proje başına | [RESMÎ] |
| Indexing API, bütün uç noktalar | Dakikada 380 | Proje başına | [RESMÎ] |
| Arayüz: "Dizine eklenmeyi iste" ve canlı test | Günlük sınır var, sayı yayımlanmıyor | Canlı test ve denetim mülk başına; dizine ekleme isteğinde sınırın kapsamı yazılmıyor | API'si yok [RESMÎ] |

- **Search Analytics yük kotası:** Kısa dönem kotası 10 dakikalık, uzun dönem kotası 1 günlük dilimlerle ölçülür. Aşılınca 15 dakika beklenir ya da sorgular güne yayılır. En pahalı sorgu sayfaya **ve** sorgu metnine birlikte gruplayan ya da filtreleyen sorgudur; tarih aralığı uzadıkça yük artar; aynı veriyi tekrar tekrar sorgulamak önerilmez [RESMÎ].
- Her kota aşımı "quota exceeded" hatası döndürür [RESMÎ].
- URL Denetimi kotası mülk başına olduğundan, site yapısına uygun ayrı URL öneki mülkleri (ör. alt alan adı ya da dil klasörü) her biri için ayrı kota sağlar [TAHMİN: kotanın mülk başına olmasından çıkarım]. Yalnız kotayı aşmak için mülk ya da proje çoğaltmak, Google API Hizmet Şartları'nın "belgelenmiş sınırları aşmaya çalışmama" maddesine takılabilir [TAHMİN].

### Hata kodları

| Kod | Örnek neden | Ne yapmalı |
|---|---|---|
| 400 `badRequest` / `invalidParameter` | Geçersiz tarih ya da boyut, `rowLimit` 25.000'den büyük, sayfaya göre gruplarken `byProperty` | Parametreleri düzelt [RESMÎ] |
| 401 `required` ("Login Required") / `authError` / `expired` | Token yok, geçersiz ya da süresi dolmuş | Yeniden yetkilendir ya da token'ı yenile [RESMÎ] |
| 403 `insufficientPermissions` / `forbidden` | Hesabın ya da servis hesabının o mülkte izni yok; `siteUrl` mülkün kayıtlı biçimiyle (`sc-domain:` ya da sondaki `/`) uyuşmuyor; `inspectionUrl` mülkün dışında | Kullanıcıyı ekle ya da biçimi düzelt [RESMÎ: hata türü; nedenler TAHMİN] |
| 403 `accessNotConfigured` | API, Cloud projesinde etkin değil | API'yi etkinleştir [RESMÎ] |
| 403 `quotaExceeded` / `dailyLimitExceeded` / `rateLimitExceeded`, 429 `rateLimitExceeded` | Kota ya da hız sınırı aşıldı | Search Analytics'te 15 dakika bekle; diğerlerinde hızı düşür, sonra yeniden dene [RESMÎ] |
| 404 `notFound` | Mülk ya da site haritası bulunamadı | Tanımlayıcıyı kontrol et [RESMÎ] |
| 500 `internalError`, 503 `backendError` | Geçici sunucu hatası | Daha sonra yeniden dene [RESMÎ]; artan aralıklarla (üstel geri çekilme) denemek genel uygulamadır [TAHMİN] |

Indexing API'ye özgü iletiler için yukarıdaki "Indexing API hataları" tablosuna bak.

### Fiyat

- **Search Console API:** "Bütün kullanımı ücretsizdir, ama kullanım sınırlarına tabidir" [RESMÎ]. Ücretli katman ya da kota satın alma yolu belgede yok [RESMÎ: belgede yok].
- **Indexing API:** Ücretsiz [RESMÎ].
- **BigQuery toplu dışa aktarma:** Search Console tarafı ücretsizdir; BigQuery depolama ve sorgu ücretleri uygulanır. Her ay ilk 10 GiB depolama ve 1 TiB sorgu ücretsizdir, ötesi bölgeye göre fiyatlanır (`US` çoklu bölgede isteğe bağlı sorgu 6,25 USD/TiB) [RESMÎ: fiyat sayfası, 6.11.2026'da indirilip okundu].

## Resmî olmayan yollar ve riskler

| Yol | Nasıl çalışır | Risk |
|---|---|---|
| **Indexing API'yi desteklenmeyen sayfalarda kullanmak** (WordPress eklentileri, betikler) | Her yeni yazı ya da ürün URL'si `URL_UPDATED` olarak gönderilir. Örnekler: Rank Math'in "Instant Indexing for Google" eklentisi (200.000'den fazla etkin kurulum; açıklaması Google'ın API'yi yalnız iş ilanı ve canlı yayın siteleri için önerdiğini kendisi yazar ve "dikkatli ilerleyin" der), goenning/google-indexing-script (README yalnız `JobPosting` ya da `BroadcastEvent` sayfalarında çalıştığını belirtir) [3. TARAF] | Belge yalnız iki sayfa türüne izin verir; bütün gönderimler spam denetiminden geçer; kötüye kullanım erişimin iptaline yol açabilir [RESMÎ]. 200 yanıtı bile tarama ya da dizine eklemeyi garanti etmez [RESMÎ] |
| **Kotayı çoğaltmak** (çok sayıda Cloud projesi, servis hesabı ya da Google hesabı) | Her proje günde 200 yayımlama hakkı aldığı için projeler çoğaltılır | Indexing API belgesi "birden çok hesap kullanmayı ya da kotayı aşmanın başka yollarını" açıkça kötüye kullanım sayar [RESMÎ]. Google API Hizmet Şartları, her API'de belgelenen sınırları aşmaya çalışmamayı şart koşar [RESMÎ] |
| **"Anında dizinleme" hizmetleri** | Ücret karşılığı URL listesi alıp "24 saatte Google'da" vaat eder | Çoğunlukla ilk iki yolu ya da spam bağlantı ağlarını kullanır [TAHMİN]; SEO rehberi bunu hizmet alırken kırmızı bayrak sayar |
| **Search Console arayüzünü otomasyonla sürmek** (Playwright ya da Puppeteer ile "Dizine eklenmeyi iste"yi tıklatmak, raporları kazımak) | Oturum açık bir tarayıcıda arayüz otomatik kullanılır | Arayüzde zaten günlük sınır var ve aynı URL'yi tekrar istemek taramayı hızlandırmaz [RESMÎ]. Google Hizmet Şartları hizmetleri kötüye kullanmayı ve koruma önlemlerini aşmayı yasaklar [RESMÎ]. Oturumun ya da hesabın kısıtlanması, arayüz değişince betiğin bozulması [TAHMİN] |
| **Arama sonuçlarını kazıyarak sıralama takibi** (rakip siteler için) | Sonuç sayfası HTML'i otomatik çekilir ya da bunu yapan üçüncü taraf arama sonucu (SERP) API'leri kullanılır | Google Hizmet Şartları, sayfalardaki makine okunur talimatlara aykırı otomatik erişimi yasaklar [RESMÎ]; IP engeli ve CAPTCHA [TAHMİN]. Eylül 2025'te `&num=100` parametresinin kalkması gibi değişiklikler bu araçları bozar; aynı değişiklik Search Console gösterimlerini de etkiledi [3. TARAF] |

- **Sahip yetkili servis hesabı:** Indexing API için servis hesabı mülk **sahibi** olduğundan, JSON anahtarı sızarsa o mülkte sahip yetkisiyle API çağrısı yapılabilir (site haritası gönderme ya da silme, mülkü listeden çıkarma, Indexing bildirimleri) [TAHMİN: izin düzeyinden çıkarım]. Analiz için kısıtlı yetkili ayrı bir servis hesabı kullan; anahtarı depoya koyma [TAHMİN].
- **Tanımadığın sahip:** Search Console'da tanımadığın bir sahip ya da doğrulama dosyası hack işaretidir; saldırgan kendini sahip olarak ekleyip kendi site haritasını gönderebilir (bkz. SEO rehberi Bölüm 21 § 5).

## SDK ve kütüphaneler

| Ad | Dil | Tür | Not |
|---|---|---|---|
| `Google.Apis.SearchConsole.v1` (NuGet) | C# / .NET | **Resmî** (Google'ın ürettiği istemci; sahibi `google-apis-packages`) | 1.78.0.4234 (04.11.2026). Hedefler: .NET 6, .NET Standard 2.0, .NET Framework 4.6.2. Bağımlılıklar: `Google.Apis` ve `Google.Apis.Auth` (en az 1.78.0). Kaynaklar: `Sites`, `Sitemaps`, `Searchanalytics`, `UrlInspection.Index`, `UrlTestingTools` (emekli) [RESMÎ: NuGet ve paketin XML belgesi] |
| `Google.Apis.Indexing.v3` (NuGet) | C# / .NET | **Resmî** | 1.78.0.3191 (03.11.2026). `UrlNotifications.Publish(...)`, `UrlNotifications.GetMetadata()`; toplu istek adresi `IndexingService.BatchUri` [RESMÎ] |
| `Google.Apis.Auth` (NuGet) | C# / .NET | **Resmî** | 1.78.0 (30.10.2026). OAuth ve servis hesabı kimliği. `GoogleCredential.FromFile`, `FromJson`, `FromStream` "olası güvenlik riski" gerekçesiyle `[Obsolete]`; yerine `CredentialFactory.FromFile<ServiceAccountCredential>(...)` + `.ToGoogleCredential()` [RESMÎ] |
| `Google.Apis.Webmasters.v3` (NuGet) | C# / .NET | Resmî ama **eski** | Son sürüm 1.55.0.1578 (08.09.2021); eski "webmasters v3" discovery adresi artık 404 döner [RESMÎ]. Yeni projede `Google.Apis.SearchConsole.v1` kullanılmalı [TAHMİN] |
| `google-api-python-client` + `google-auth` (PyPI) | Python | **Resmî** | 2.201.0 (30.09.2026); `build("searchconsole", "v1", credentials=...)` ve `build("indexing", "v3", credentials=...)` [RESMÎ: PyPI] |
| `googleapis`, `@googleapis/searchconsole`, `@googleapis/indexing` (npm) | Node.js / TypeScript | **Resmî** | `googleapis` 189.0.0; tekil paketler 11.0.1 (npm kaydı, 6.11.2026) [RESMÎ] |
| `google.golang.org/api/searchconsole/v1`, `google.golang.org/api/indexing/v3` | Go | **Resmî** | pkg.go.dev'de mevcut; modül `google.golang.org/api` v0.311.0 (04.11.2026) [RESMÎ: Go modül vekili] |
| `com.google.apis:google-api-services-searchconsole`, `com.google.apis:google-api-services-indexing` (Maven) | Java | **Resmî** | `v1-rev20260805-2.9.2` ve `v3-rev20230927-2.9.2` [RESMÎ: Maven Central, 6.11.2026] |
| Rank Math "Instant Indexing for Google" | WordPress eklentisi | Topluluk / ticari | Indexing API'yi her içerik türü için çağırabilir; politika riski için yukarıya bak [3. TARAF] |
| goenning/google-indexing-script | Node.js komut satırı aracı | Topluluk | Search Console API ile URL'leri bulur, Indexing API ile gönderir; README yalnız `JobPosting`/`BroadcastEvent` sayfaları için çalıştığını yazar [3. TARAF] |

### C# örnekleri

Kurulum: `dotnet add package Google.Apis.SearchConsole.v1` (Indexing için `Google.Apis.Indexing.v3`; `Google.Apis.Auth` bağımlılık olarak gelir). Sınıf ve özellik adları paketlerin 1.78 sürümünden doğrulandı [RESMÎ]. Dosya adı, mülk ve URL'ler yer tutucudur.

```csharp
using Google.Apis.Auth.OAuth2;
using Google.Apis.SearchConsole.v1;
using Google.Apis.SearchConsole.v1.Data;
using Google.Apis.Services;

var kimlik = CredentialFactory
    .FromFile<ServiceAccountCredential>("servis-hesabi.json")
    .ToGoogleCredential()
    .CreateScoped(SearchConsoleService.Scope.WebmastersReadonly);

var sc = new SearchConsoleService(new BaseClientService.Initializer
{
    HttpClientInitializer = kimlik,
    ApplicationName = "ornek-takip"
});

const string mulk = "sc-domain:ornek.com";

var performans = await sc.Searchanalytics.Query(new SearchAnalyticsQueryRequest
{
    StartDate = "2026-11-01",
    EndDate = "2026-11-01",
    Dimensions = new List<string> { "query", "page" },
    Type = "web",
    RowLimit = 25000,
    StartRow = 0
}, mulk).ExecuteAsync();

foreach (var satir in performans.Rows ?? new List<ApiDataRow>())
    Console.WriteLine($"{string.Join(" | ", satir.Keys)}  tık={satir.Clicks} gösterim={satir.Impressions} konum={satir.Position:F1}");

var denetim = await sc.UrlInspection.Index.Inspect(new InspectUrlIndexRequest
{
    SiteUrl = mulk,
    InspectionUrl = "https://www.ornek.com/fiyatlar/",
    LanguageCode = "tr-TR"
}).ExecuteAsync();

var durum = denetim.InspectionResult.IndexStatusResult;
Console.WriteLine($"{durum.Verdict} · {durum.CoverageState} · Google kanoniği: {durum.GoogleCanonical} · son tarama: {durum.LastCrawlTimeDateTimeOffset}");
```

```csharp
using Google.Apis.Auth.OAuth2;
using Google.Apis.Indexing.v3;
using Google.Apis.Indexing.v3.Data;
using Google.Apis.Services;

var kimlik = CredentialFactory
    .FromFile<ServiceAccountCredential>("indexing-servis-hesabi.json")
    .ToGoogleCredential()
    .CreateScoped(IndexingService.Scope.Indexing);

var indexing = new IndexingService(new BaseClientService.Initializer
{
    HttpClientInitializer = kimlik,
    ApplicationName = "ornek-ilan-sitesi"
});

const string ilan = "https://www.ornek.com/ilanlar/ornek-ilan-123";

await indexing.UrlNotifications.Publish(new UrlNotification
{
    Url = ilan,
    Type = "URL_UPDATED"
}).ExecuteAsync();

var istek = indexing.UrlNotifications.GetMetadata();
istek.Url = ilan;
var son = await istek.ExecuteAsync();
Console.WriteLine($"Son güncelleme bildirimi: {son.LatestUpdate?.NotifyTimeDateTimeOffset}");
```

## Postman / OpenAPI / koleksiyonlar

- **Resmî discovery belgeleri:** `https://searchconsole.googleapis.com/$discovery/rest?version=v1` (revizyon 20261104) ve `https://indexing.googleapis.com/$discovery/rest?version=v3` (revizyon 20261031). Kimliksiz indirilir; istemci kütüphaneleri bunlardan üretilir [RESMÎ, 6.11.2026'da indirildi]. Google API dizininde Search Console için yalnız `searchconsole:v1` var; eski `webmasters/v3` discovery adresi 404 döner [RESMÎ, 6.11.2026'da istekle doğrulandı].
- **APIs Explorer:** Başvuru sayfalarındaki "Try it!" bölümü, yöntemi kendi hesabınla canlı veride çağırmayı sağlar [RESMÎ].
- **OpenAPI:** Google resmî OpenAPI dosyası yayımlamıyor [RESMÎ: belgede yok]. APIs.guru dizininde discovery belgelerinden dönüştürülmüş `googleapis.com:searchconsole` (v1) ve `googleapis.com:indexing` (v3) OpenAPI dosyaları var. Son güncellemeleri 21.04.2023 olduğu için `hour` boyutu gibi sonraki eklemeler eksik olabilir [3. TARAF, 6.11.2026'da kontrol edildi]. Dizinle çalışma: [API Koleksiyonları ve Keşif](../API-Kaynaklari/API-Koleksiyonlari-ve-Kesif.md).
- **Postman:** Resmî bir Postman çalışma alanı belgede yok. APIs.guru'daki OpenAPI dosyası Postman'e aktarılabilir; kimlik için Postman'in OAuth 2.0 yetkilendirmesi ya da elle alınmış Bearer token kullanılır [TAHMİN].
- **Değişiklik takibi:** [Search Central belge güncellemeleri](https://developers.google.com/search/updates) sayfası (Indexing API'nin kota ve onay değişiklikleri burada duyuruldu) ve Search Central Blog [RESMÎ].

## Depoda ilgili sayfalar

- [SEO Rehberi](../../Rehberler/SEO/): Bu API'nin ölçtüğü ve yönettiği her şeyin (tarama, dizin, Performans raporu, site haritası) SEO tarafı. Yapay zekâ için yoğun not: [arastirma.md](../../Rehberler/SEO/arastirma.md).
- [Bölüm 9 · Site haritasını gönderme yolları](../../Rehberler/SEO/09-tarama-ve-dizin.html#site-haritasi-gonderme): robots.txt `Sitemap:` satırı, Search Console raporu ya da Search Console API; ping ucunun 2023'te kalkması.
- [Bölüm 9 · URL Denetimi ve Indexing API miti](../../Rehberler/SEO/09-tarama-ve-dizin.html#url-denetimi): "Dizine eklenmeyi iste" sınırı, URL Denetimi API kotası ve "Indexing API ile her sayfa anında dizinde" mitinin cevabı.
- [Bölüm 15 · Search Console kurulumu, mülk türleri ve izinler](../../Rehberler/SEO/15-araclar-ve-olcum.html#search-console-kurulum): `sc-domain:` ile URL öneki mülkü farkı. Aynı sayfadaki [Performans raporu](../../Rehberler/SEO/15-araclar-ve-olcum.html#performans-raporu) ve [URL Denetimi](../../Rehberler/SEO/15-araclar-ve-olcum.html#url-denetimi) bölümleri, API'deki `searchAnalytics` ve `urlInspection` verisinin arayüzdeki karşılığıdır.
- [Bölüm 21 § 4 · Indexing API kötüye kullanımı](../../Rehberler/SEO/21-kara-sapka.html#indexing-api-atlatma): Sıradan sayfaları API'ye göndermek, kota için çok hesap açmak ve Eylül 2024 spam uyarısı. Ayrıca [hizmet alırken kırmızı bayraklar](../../Rehberler/SEO/21-kara-sapka.html#ajans-kirmizi-bayrak) ("anında dizinleme" vaadi) ve [Search Console'u ele geçirme](../../Rehberler/SEO/21-kara-sapka.html#hack).
- [Bölüm 17 · Müşteri işinde erişim ve sahiplik](../../Rehberler/SEO/17-musteri-isi.html#erisim): Mülk müşteride kalır, danışmana önce yalnız okuma verilir; API'deki karşılığı kısıtlı kullanıcı olarak eklenen hesap ya da servis hesabıdır.
- [Bölüm 14 · IndexNow](../../Rehberler/SEO/14-diger-motorlar-ve-yz.html#indexnow): Bing ve Yandex'e değişikliği anında bildirmenin açık protokolü; Google kullanmaz.
- [PageSpeed Insights ve CrUX API](PageSpeed-Insights-ve-CrUX.md): Rakip dahil herhangi bir sitenin hız verisi; Search Console'un Core Web Vitals raporunun API'si olmadığı için en yakın programatik kaynak.
- [IndexNow API](IndexNow.md): Bing, Yandex ve diğer katılımcı motorlara URL değişikliği bildirmek; Google katılmadığı için Indexing API'nin yerine geçmez.
- [YouTube API](../Canli-Yayin-ve-Video/YouTube.md): YouTube'daki yayınların takibi orada anlatılıyor. Indexing API'nin `BroadcastEvent` desteği yalnız **kendi sitendeki** canlı yayın izleme sayfaları içindir.
- [API Koleksiyonları ve Keşif](../API-Kaynaklari/API-Koleksiyonlari-ve-Kesif.md): APIs.guru ve discovery/OpenAPI dosyalarıyla çalışma.

## Kaynaklar

**Resmî**

- [Search Console API – genel bakış](https://developers.google.com/webmaster-tools/about): Kapsam ve erişim ön koşulu ("owner, full, read") (erişim: 6 Kasım 2026).
- [API başvuru dizini](https://developers.google.com/webmaster-tools/v1/api_reference_index): Kaynaklar, yöntemler ve iki taban adres (erişim: 6 Kasım 2026).
- [Ön koşullar](https://developers.google.com/webmaster-tools/v1/prereqs) ve [İstekleri yetkilendirme](https://developers.google.com/webmaster-tools/v1/how-tos/authorizing): Google hesabı, Cloud projesi, OAuth 2.0 kapsamları, API anahtarının yalnız Testing Tools API için geçerli olması (erişim: 6 Kasım 2026).
- [Kullanım sınırları](https://developers.google.com/webmaster-tools/limits): Search Analytics yük kotası; site, kullanıcı ve proje sınırları; URL Denetimi günde 2.000 ve dakikada 600 (erişim: 6 Kasım 2026).
- [Fiyatlandırma](https://developers.google.com/webmaster-tools/pricing): Ücretsiz kullanım, kullanım sınırları (erişim: 6 Kasım 2026).
- [searchAnalytics.query](https://developers.google.com/webmaster-tools/v1/searchanalytics/query): Parametreler, `dataState`, `rowLimit`, filtre işleçlerinin büyük/küçük harf duyarlılığı; sayfanın son güncellemesi 11.08.2026, FAQ notu artık yok (erişim: 6 Kasım 2026).
- [Search Central Blog: Performans verisi filtreleri ve sınırları](https://developers.google.com/search/blog/2022/10/performance-data-deep-dive) (19.10.2022): Arayüzden en çok 1.000 satır dışa aktarma, API'de gün, site ve arama türü başına 50.000 satır, anonim sorgu tanımı (erişim: 6 Kasım 2026).
- [Site haritaları raporu](https://support.google.com/webmasters/answer/7451001): Rapordan gönderim için sahip izni, silinen haritanın ve URL'lerinin "unutulmaması" (erişim: 6 Kasım 2026).
- [Getting all your data](https://developers.google.com/webmaster-tools/v1/how-tos/all-your-data) ve [Search Analytics rehberi](https://developers.google.com/webmaster-tools/v1/how-tos/search_analytics): 50.000 satır sınırı, 2–3 gün gecikme, sayfalama, `searchAppearance` için iki adımlı sorgu (erişim: 6 Kasım 2026).
- [urlInspection.index.inspect](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect) ve [UrlInspectionResult](https://developers.google.com/webmaster-tools/v1/urlInspection.index/UrlInspectionResult): İstek ve yanıt alanları, enum değerleri, yalnız dizindeki sürüm (erişim: 6 Kasım 2026).
- [Sites](https://developers.google.com/webmaster-tools/v1/sites) ve [Sitemaps](https://developers.google.com/webmaster-tools/v1/sitemaps): İzin düzeyleri, site haritası alanları, `contents.indexed`'in kalkması (erişim: 6 Kasım 2026).
- [Standart hata yanıtları](https://developers.google.com/webmaster-tools/v1/errors): 400, 401, 403, 404, 429, 500 ve 503 nedenleri (erişim: 6 Kasım 2026).
- [searchconsole v1 discovery belgesi](https://searchconsole.googleapis.com/$discovery/rest?version=v1) (revizyon 20261104) ve [indexing v3 discovery belgesi](https://indexing.googleapis.com/$discovery/rest?version=v3) (revizyon 20261031): Makineyle okunur şema, kapsamlar, enum değerleri, `getMetadata` ve `url` alanı açıklamaları (erişim: 6 Kasım 2026).
- [Search Central Blog: URL Inspection API](https://developers.google.com/search/blog/2022/01/url-inspection-api) (31.01.2022): Kota ve kullanım örnekleri (erişim: 6 Kasım 2026).
- [Search Central Blog: Search Analytics API saatlik veri](https://developers.google.com/search/blog/2025/04/san-hourly-data) (09.04.2025): `HOUR` boyutu, `HOURLY_ALL`, 10 gün (erişim: 6 Kasım 2026).
- [Search Central Blog: Bulk data export](https://developers.google.com/search/blog/2023/02/bulk-data-export) (21.02.2023): Satır sınırının olmaması, yalnız sahiplerin kurabilmesi (erişim: 6 Kasım 2026).
- [Search Central Blog: Sitemaps ping ucunun kaldırılması](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping) (26.06.2023) (erişim: 6 Kasım 2026).
- [Search Central Blog: Page experience](https://developers.google.com/search/blog/2023/04/page-experience-in-search) (Nisan 2023): Mobile-Friendly Test API'nin 1 Aralık 2023'te emekliye ayrılması (erişim: 6 Kasım 2026).
- [Search Central belge güncellemeleri](https://developers.google.com/search/updates): Indexing API'nin 1 Mayıs 2020, 4 ve 11 Eylül 2024 ve 16 Ekim 2026 değişiklikleri; Search Console API "practice problem" notu (erişim: 6 Kasım 2026).
- Toplu veri dışa aktarma: [genel bakış](https://support.google.com/webmasters/answer/12918484), [başlatma](https://support.google.com/webmasters/answer/12917675), [tablo başvurusu](https://support.google.com/webmasters/answer/12917991), [yönetme ve izleme](https://support.google.com/webmasters/answer/12919198) (erişim: 6 Kasım 2026).
- [Search Console izinleri](https://support.google.com/webmasters/answer/7687615): Sahip, tam ve kısıtlı kullanıcı tablosu, 100 kullanıcı sınırı (erişim: 6 Kasım 2026).
- [Site sahipliğini doğrulama](https://support.google.com/webmasters/answer/9008080): DNS, HTML dosyası, meta etiket, Analytics, Tag Manager; düzenli yeniden denetim; bütün doğrulanmış sahipler erişimi kaybedince bütün kullanıcıların da kaybetmesi (erişim: 6 Kasım 2026).
- [URL Denetimi aracı](https://support.google.com/webmasters/answer/9012289): Günlük denetim ve dizine ekleme isteği sınırları, dizindeki sürüm ile canlı test farkı, rapor bölümleri (erişim: 6 Kasım 2026).
- [Performans raporu](https://support.google.com/webmasters/answer/7576553), [boyutlar ve gruplamalar](https://support.google.com/webmasters/answer/17011259), [Üretken YZ performans raporu](https://support.google.com/webmasters/answer/16984139) ve [mesaj paneli](https://support.google.com/webmasters/answer/9388335) (erişim: 6 Kasım 2026).
- [Google'dan yeniden tarama isteme](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [Site haritası oluşturma ve gönderme](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) ve [Trafik düşüşlerini inceleme](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops) (16 aylık veri) (erişim: 6 Kasım 2026).
- Indexing API: [hızlı başlangıç](https://developers.google.com/search/apis/indexing-api/v3/quickstart), [ön koşullar](https://developers.google.com/search/apis/indexing-api/v3/prereqs), [API'yi kullanma](https://developers.google.com/search/apis/indexing-api/v3/using-api), [kota ve fiyat](https://developers.google.com/search/apis/indexing-api/v3/quota-pricing), [hatalar](https://developers.google.com/search/apis/indexing-api/v3/core-errors), [urlNotifications başvurusu](https://developers.google.com/search/apis/indexing-api/v3/reference/indexing/rest/v3/urlNotifications) ve [getMetadata](https://developers.google.com/search/apis/indexing-api/v3/reference/indexing/rest/v3/urlNotifications/getMetadata) (erişim: 6 Kasım 2026).
- [İş ilanı yapılandırılmış verisi](https://developers.google.com/search/docs/appearance/structured-data/job-posting) ve [video yapılandırılmış verisi (BroadcastEvent)](https://developers.google.com/search/docs/appearance/structured-data/video): Indexing API önerisi, kapanan ilan, LIVE rozeti (erişim: 6 Kasım 2026).
- [Site Verification API](https://developers.google.com/site-verification/v1/getting_started): Doğrulama yöntemleri ve kapsamlar (erişim: 6 Kasım 2026).
- [Google API Hizmet Şartları](https://developers.google.com/terms) (son değişiklik 09.11.2021) ve [Google Hizmet Şartları](https://policies.google.com/terms) (yürürlük 30.07.2026): Sınırları aşmama, otomatik erişim ve kötüye kullanma maddeleri (erişim: 6 Kasım 2026).
- NuGet: [Google.Apis.SearchConsole.v1](https://www.nuget.org/packages/Google.Apis.SearchConsole.v1), [Google.Apis.Indexing.v3](https://www.nuget.org/packages/Google.Apis.Indexing.v3), [Google.Apis.Auth](https://www.nuget.org/packages/Google.Apis.Auth), [Google.Apis.Webmasters.v3](https://www.nuget.org/packages/Google.Apis.Webmasters.v3) (erişim: 6 Kasım 2026).
- [.NET GoogleCredential başvurusu](https://docs.cloud.google.com/dotnet/docs/reference/Google.Apis/latest/Google.Apis.Auth.OAuth2.GoogleCredential) ve [CredentialFactory](https://docs.cloud.google.com/dotnet/docs/reference/Google.Apis/latest/Google.Apis.Auth.OAuth2.CredentialFactory): `FromFile` vb. yöntemlerin `[Obsolete]` olması ve yerine geçen yöntemler (erişim: 6 Kasım 2026).
- [PyPI: google-api-python-client](https://pypi.org/project/google-api-python-client/), [npm: googleapis](https://www.npmjs.com/package/googleapis), [pkg.go.dev: searchconsole/v1](https://pkg.go.dev/google.golang.org/api/searchconsole/v1) ve Maven Central ([searchconsole](https://repo1.maven.org/maven2/com/google/apis/google-api-services-searchconsole/maven-metadata.xml), [indexing](https://repo1.maven.org/maven2/com/google/apis/google-api-services-indexing/maven-metadata.xml)) (erişim: 6 Kasım 2026).
- [CrUX API](https://developer.chrome.com/docs/crux/api): API anahtarı, dakikada 150 sorgu, 28 günlük veri (erişim: 6 Kasım 2026).
- [BigQuery fiyatlandırması](https://cloud.google.com/bigquery/pricing): Ücretsiz katman (ayda ilk 10 GiB depolama ve 1 TiB sorgu), `US` çoklu bölgede isteğe bağlı sorgu 6,25 USD/TiB (erişim: 6 Kasım 2026).

**Üçüncü taraf**

- [Search Engine Roundtable: Indexing API spam denetimi](https://www.seroundtable.com/google-updates-indexing-api-spam-detection-38056.html) (12.09.2024): Eklenen spam ve erişim iptali cümleleri, daraltılan giriş (erişim: 6 Kasım 2026).
- [Search Engine Journal: Indexing API onay formu kaldırıldı](https://www.searchenginejournal.com/google-indexing-api-docs-approval-form-removed/593292/) (17.10.2026): Kaldırılan onay ve kota talebi metinleri (erişim: 6 Kasım 2026).
- [Search Engine Journal: Google FAQ zengin sonuçlarını kaldırdı](https://www.searchenginejournal.com/google-drops-faq-rich-results/574429/) (10.05.2026): 7 Mayıs 2026 kaldırma, Search Console API'deki FAQ desteğinin Ağustos 2026'da kaldırılacağı notu (erişim: 6 Kasım 2026).
- [JBoard yardım: "Failed to verify the URL ownership"](https://help.jboard.io/en/article/how-to-fix-failed-to-verify-the-url-ownership-google-jobs-indexing-api-jb2zff/) (güncelleme 19.10.2026): Sahip izni şartı, doğrulama düşünce sahiplerin silinmesi (erişim: 6 Kasım 2026).
- [ZappySys: Search Console servis hesabı kurulumu](https://zappysys.com/api/integration-hub/google-search-console-connector/help/authentication/ServiceAccount): Servis hesabını Search Console'a kullanıcı olarak ekleme (erişim: 6 Kasım 2026).
- [WordPress.org: Instant Indexing for Google (Rank Math)](https://wordpress.org/plugins/fast-indexing-api/): Eklenti açıklaması ve uyarısı, kurulum sayısı (erişim: 6 Kasım 2026).
- [GitHub: goenning/google-indexing-script](https://github.com/goenning/google-indexing-script): Search Console API + Indexing API betiği ve README uyarısı (erişim: 6 Kasım 2026).
- [APIs.guru dizini](https://api.apis.guru/v2/list.json): `googleapis.com:searchconsole` ve `googleapis.com:indexing` OpenAPI dönüşümleri, son güncelleme 21.04.2023 (erişim: 6 Kasım 2026).

[← Üst klasör](../)
