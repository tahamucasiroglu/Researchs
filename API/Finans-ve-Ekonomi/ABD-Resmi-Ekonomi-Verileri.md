# ABD Resmî Ekonomi Verileri API (FRED, Fed Board, Hazine, BLS, BEA, SEC EDGAR, New York Fed)

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (hepsi ücretsiz, kamu kurumu kaynağı)

## Özet

ABD'de makroekonomik ve finansal verilerin büyük kısmı kamu kurumlarınca **ücretsiz** API veya toplu indirme ile sunulur. Altı kaynak öne çıkar: **FRED** (St. Louis Fed; yüz binlerce zaman serisini tek yerde toplar [TAHMİN — sayı bu oturumda doğrulanmadı], ücretsiz API anahtarı ister), **Federal Reserve Board Data Download Program (DDP)** (H.15 faiz, H.10 kur, Z.1 gibi yayınların doğrudan indirme bağlantıları; klasik REST API değil), **US Treasury Fiscal Data API** (borç, nakit, faiz, kur tabloları; anahtarsız), **BLS API** (enflasyon/CPI, istihdam; v1 anahtarsız, v2 ücretsiz kayıt), **BEA API** (GSYH, kişisel gelir, dış ticaret; ücretsiz UserID) **SEC EDGAR** (şirket başvuruları ve XBRL finansal verisi; anahtarsız ama **User-Agent beyanı ve saniyede 10 istek sınırı zorunlu**). Bunlara yedinci olarak **New York Fed Markets Data API** (SOFR, EFFR gibi gösterge oranları ve açık piyasa işlemleri; anahtarsız) eklenir. Hiçbirinde ücretli katman yoktur; kısıtlar yalnızca hız sınırı ve kullanım şartlarıdır. [RESMÎ]

Not: Bu sayfada "kişi/kanal takibi" yerine **"veri yayını ve kurum duyurusu takibi"** söz konusudur: yeni CPI rakamı açıklandı mı, Fed faiz kararı/basın bülteni çıktı mı, bir şirket 8-K/10-K verdi mi, belirli bir yöneticinin Form 4 (içeriden alım-satım) bildirimi geldi mi gibi.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey (SEC için yalnızca açıklayıcı `User-Agent` başlığı) | SEC EDGAR (`data.sec.gov` JSON API'leri, arşiv, RSS), Treasury Fiscal Data API, Treasury günlük faiz XML beslemesi, Fed Board DDP indirmeleri ve RSS beslemeleri, BLS API v1, New York Fed Markets Data API | Ücretsiz. SEC: ≤10 istek/sn [RESMÎ]. BLS v1: 25 sorgu/gün, sorgu başına 25 seri, 10 yıl [RESMÎ]. Treasury: belgede sayısal limit yok [RESMÎ] |
| Geliştirici hesabı / anahtar | FRED: fredaccount.stlouisfed.org hesabı + API key (32 karakter). BLS: v2 kayıt anahtarı (e-posta ile, yılda en az bir kez yenilenir). BEA: ad/kurum + e-posta ile 36 karakterlik UserID | FRED v1 ve v2 tüm uç noktaları; BLS v2 (hesaplamalar, yıllık ortalama, katalog, 50 seri/sorgu, 20 yıl); BEA tüm veri setleri | Ücretsiz. FRED: 120 istek/dk [RESMÎ]. BLS v2: 500 sorgu/gün, 50 istek/10 sn [RESMÎ]. BEA: 100 istek/dk, 100 MB/dk, 30 hata/dk [RESMÎ] |
| İşletme / uygulama onayı | Yok — bu kurumlarda App Review / Business Verification süreci bulunmaz | — | FRED'de limit artışı için FRED ekibiyle iletişime geçilebilir [RESMÎ] |
| Ücretli / kurumsal | Resmî ücretli katman yok | — | SEC EDGAR'ın gerçek zamanlı ham akışı için ücretli bir "Public Dissemination Service (PDS)" aboneliği vardır; bu sayfada ayrıntısı doğrulanmadı [TAHMİN] |
| Resmî olmayan | Belgelenmemiş uç noktalar (ör. EDGAR Full-Text Search arka ucu `efts.sec.gov`), ücretli 3. taraf sarmalayıcılar (sec-api.io vb.) | Tam metin arama JSON'u, WebSocket ile anlık başvuru akışı (3. taraf) | Belgesiz uç nokta her an değişebilir; SEC hız sınırı yine geçerli [3. TARAF] |

## Kimlik doğrulama

| Kaynak | Yöntem | Ayrıntı |
|---|---|---|
| FRED v1 | Sorgu parametresi | `?api_key=<32 karakter küçük harf/rakam>` — her uygulama için ayrı anahtar istenir; her uygulama kullanıcısının kendi anahtarını kullanması beklenir [RESMÎ] |
| FRED v2 | HTTP başlığı | `Authorization: Bearer <api_key>` [RESMÎ] |
| Fed Board DDP | Yok | Sayfadaki "Direct download for automated systems" bağlantısı programla çağrılabilir [RESMÎ] |
| Treasury Fiscal Data | Yok | "Açık API, hesap/jeton gerekmez" [RESMÎ]. Yanıt kodu tablosunda yine de "403 – API Key is not valid" satırı var [ÇELİŞKİLİ] (pratikte anahtarsız çalışır) |
| BLS v1 | Yok | — |
| BLS v2 | JSON gövdesinde `registrationkey` alanı | Seçmeli parametreleri (hesaplama, katalog vb.) kullanmak için gerekli [RESMÎ] |
| BEA | Sorgu parametresi `UserID=<36 karakter>` | Her istekte `UserID` ve `method` zorunlu [RESMÎ] |
| SEC EDGAR | Kimlik yok; **`User-Agent` beyanı zorunlu** | Örnek biçim: `User-Agent: Sample Company Name AdminContact@<sample company domain>.com`; ayrıca `Accept-Encoding: gzip, deflate` önerilir [RESMÎ]. Beyansız betikler "Undeclared Automated Tool" hatası alır [RESMÎ] |

> Gizlilik notu: SEC `User-Agent` içine bir iletişim e-postası istiyor. Herkese açık depoya kod koyarken bu değeri koda gömmeyin; ortam değişkeni / `appsettings.Development.json` (git dışı) üzerinden okuyun.

## Temel uç noktalar

### FRED (St. Louis Fed) — `https://api.stlouisfed.org/`

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `fred/series/observations` | Bir serinin gözlemlerini (değerlerini) döndürür | Anahtar | `file_type`: xml (varsayılan), json, xlsx, csv; `units` (chg, pch, pc1, log…), `frequency` + `aggregation_method` (avg, sum, eop); `limit` ≤100000 [RESMÎ] |
| GET | `fred/series` | Seri meta verisi (başlık, birim, sıklık, `last_updated`) | Anahtar | [RESMÎ] |
| GET | `fred/series/search` | Metinle seri arama | Anahtar | [RESMÎ] |
| GET | `fred/series/updates` | **Son güncellenen serileri** `last_updated`'e göre sıralar | Anahtar | Yalnızca son 2 hafta; `limit` ≤1000; `start_time`/`end_time` (`YYYYMMDDHHmm`) dakika hassasiyetinde; `filter_value`: macro/regional/all [RESMÎ] |
| GET | `fred/series/vintagedates` | Serinin revizyon (vintage) tarihleri — ALFRED | Anahtar | [RESMÎ] |
| GET | `fred/releases/dates`, `fred/release/dates` | Veri yayınlarının (CPI, istihdam raporu vb.) tarihleri; gelecekteki tarihler de istenebilir | Anahtar | Yayın takvimi için kullanılır [RESMÎ] |
| GET | `fred/release/series`, `fred/release/tables` | Bir yayına ait seriler / tablo yapısı | Anahtar | [RESMÎ] |
| GET | `fred/category/*`, `fred/sources`, `fred/tags/*` | Kategori ağacı, kaynak kurumlar, etiketler | Anahtar | [RESMÎ] |
| GET | `fred/v2/release/observations` | **v2:** bir yayındaki tüm serilerin gözlemlerini toplu çeker | Anahtar (Bearer başlığı) | `release_id` zorunlu; `limit` ≤500000; sayfalama `next_cursor` + `has_more`; seri `last_updated` istek sırasında değişirse tüm yayını baştan çek [RESMÎ] |
| GET | Maps API (GeoFRED): `geofred/shapes/file`, `geofred/series/group`, `geofred/series/data`, `geofred/regional/data` (**`fred/` öneki yok**) | Bölgesel (eyalet, ilçe) veriler | Anahtar | Doküman: https://fred.stlouisfed.org/docs/api/geofred/ [RESMÎ] |

Tam liste: https://fred.stlouisfed.org/docs/api/fred/ (Maps API: https://fred.stlouisfed.org/docs/api/geofred/)

### Federal Reserve Board — Data Download Program (DDP)

Klasik REST API **yoktur**; DDP, yayın bazında "paket" oluşturup indirmenizi sağlar. [RESMÎ]

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `https://www.federalreserve.gov/datadownload/Choose.aspx?rel=<KOD>` | Yayın seçimi (H15, H10, G17, G19, H41, H6, H8, Z1, CP, PRATES…) | Herkese açık | Tarayıcı arayüzü [RESMÎ] |
| GET | "Direct download for automated systems" bağlantısı (Download sayfasında) | Paketi tarayıcısız indirir | Herkese açık | URL elle kurulmaz, sayfadan kopyalanır. "Son N gözlem" biçimli paketler her çağrıda en güncel veriyi verir [RESMÎ] |
| GET | "Download all" bağlantısı | Yayının tamamı: SDMX XML + şema dosyaları (zip) | Herkese açık | Her pakette tek sıklık (günlük/aylık…) [RESMÎ] |

Biçimler: CSV, Excel, XML (SDMX compact) [RESMÎ]. Aynı serilerin çoğu FRED'de de bulunduğundan programatik kullanımda genelde FRED tercih edilir [TAHMİN].

### US Treasury — Fiscal Data API — `https://api.fiscaldata.treasury.gov/services/api/fiscal_service/`

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `v2/accounting/od/debt_to_penny` | Günlük toplam kamu borcu | Herkese açık | [RESMÎ] |
| GET | `v2/accounting/od/avg_interest_rates` | Hazine menkul kıymetleri ortalama faiz oranları | Herkese açık | [RESMÎ] |
| GET | `v1/accounting/dts/deposits_withdrawals_operating_cash` | Günlük Hazine Bülteni (DTS) nakit girişi/çıkışı | Herkese açık | [RESMÎ] |
| GET | `v1/accounting/od/rates_of_exchange` | Hazine raporlama döviz kurları | Herkese açık | [RESMÎ] |
| GET | (179 uç nokta/tablo listelenmiş) | Diğer tablolar | Herkese açık | Liste: API dokümanındaki "List of Endpoints" [RESMÎ] |

Ortak parametreler: `fields`, `filter=alan:operatör:değer` (`lt, lte, gt, gte, eq, in`), `sort` (`-` azalan), `format` (json/csv/xml), `page[number]`, `page[size]` (varsayılan 100; belgede üst sınır yok). Tüm değerler **metin** olarak döner, boşlar `"null"` metnidir. Yalnızca GET. [RESMÎ]

Ek: **Treasury günlük faiz XML beslemesi** (Fiscal Data'dan ayrı) — `https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value=2026`. `data` değerleri: `daily_treasury_yield_curve`, `daily_treasury_bill_rates`, `daily_treasury_long_term_rate`, `daily_treasury_real_yield_curve`, `daily_treasury_real_long_term`; dönem `field_tdr_date_value=yyyy`, `field_tdr_date_value_month=yyyymm` veya `all&page=N` (0'dan başlar). OData v2 tipleriyle XML. [RESMÎ]

### BLS (Bureau of Labor Statistics) — `https://api.bls.gov/publicAPI/v2/`

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `timeseries/data/{seriesID}` | Tek seri (varsayılan son 3 yıl) | v1 kimliksiz / v2 anahtar | `.xlsx` eklenirse Excel [RESMÎ] |
| GET | `timeseries/data/{seriesID}?latest=true` | **Yalnızca en son değer** | v2 | Yeni açıklanan rakamı yakalamak için ideal [RESMÎ] |
| POST | `timeseries/data/` | Çoklu seri; JSON gövde: `seriesid[]`, `startyear`, `endyear`, `catalog`, `calculations`, `annualaverage`, `aspects`, `registrationkey` | v2 | ≤50 seri, ≤20 yıl [RESMÎ] |
| GET | `timeseries/popular?survey=XX` | En popüler 25 seri | v2 | [RESMÎ] |
| GET | `surveys`, `surveys/{kısaltma}` | Anket listesi / meta veri | v2 | [RESMÎ] |

Seri kimlikleri büyük harf; ör. CPI-U genel endeksi için yaygın kullanılan kimlik `CUUR0000SA0` [3. TARAF]. SSS'de v2 için tabloda 20 yıl, tarih biçimi maddesinde "10 yılı aşmamalı" yazıyor [ÇELİŞKİLİ].

### BEA (Bureau of Economic Analysis) — `https://apps.bea.gov/api/data`

Tek URI; tüm istekler GET + sorgu parametresi (`UserID`, `method`, `ResultFormat=JSON|XML`). [RESMÎ]

| Metot | `method=` | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `GetDataSetList` | Veri setleri: NIPA, NIUnderlyingDetail, FixedAssets, MNE, GDPbyIndustry, UnderlyingGDPbyIndustry, ITA, IIP, InputOutput, IntlServTrade, IntlServSTA, Regional | UserID | [RESMÎ] |
| GET | `GetParameterList` | Bir veri setinin parametreleri | UserID | [RESMÎ] |
| GET | `GetParameterValues` | Bir parametrenin geçerli değerleri | UserID | [RESMÎ] |
| GET | `GetParameterValuesFiltered` | Diğer parametrelere göre süzülmüş değerler (ör. tabloya göre LineCode) | UserID | Bazı veri setlerinde [RESMÎ] |
| GET | `GetData` | Asıl veri (ör. `datasetname=NIPA&TableName=T10101&Frequency=Q&Year=2026`) | UserID | [RESMÎ] parametre adları; örnek tablo adı [3. TARAF] |

Etkileşimli sorgu oluşturucu (Swagger): https://apps.bea.gov/API/swagger/index.htm [RESMÎ]

### SEC EDGAR — `https://data.sec.gov` ve `https://www.sec.gov`

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `data.sec.gov/submissions/CIK##########.json` | Şirketin/kişinin başvuru geçmişi (10 haneli, baştaki sıfırlarla CIK) | Herkese açık | Gerçek zamanlı güncellenir, gecikme genelde <1 sn [RESMÎ] |
| GET | `data.sec.gov/api/xbrl/companyfacts/CIK##########.json` | Şirketin tüm XBRL finansal kalemleri | Herkese açık | Gecikme genelde <1 dk [RESMÎ] |
| GET | `data.sec.gov/api/xbrl/companyconcept/CIK##########/us-gaap/<Kavram>.json` | Tek şirket, tek kalem (ör. `AccountsPayableCurrent`) | Herkese açık | [RESMÎ] |
| GET | `data.sec.gov/api/xbrl/frames/us-gaap/<Kavram>/USD/CY2019Q1I.json` | Bir dönem için tüm şirketlerin tek değeri | Herkese açık | Dönem: `CY####`, `CY####Q#`, `CY####Q#I` (anlık) [RESMÎ] |
| GET | `www.sec.gov/Archives/edgar/data/...`, `/Archives/edgar/daily-index/`, `/full-index/` | Ham başvuru dosyaları ve indeksler | Herkese açık | Gece ~22:00 ET'den itibaren güncellenir; full-index cumartesi sabahları yeniden kurulur [RESMÎ] |
| GET | `www.sec.gov/Archives/edgar/Feed/`, `/Oldloads/` | Günlük arşiv (tar/gz) | Herkese açık | [RESMÎ] |
| GET | `submissions.zip`, `companyfacts.zip` (toplu) | Tüm şirketlerin toplu verisi | Herkese açık | Her gece ~03:00 ET yeniden kurulur [RESMÎ] |

`data.sec.gov` **CORS desteklemez** — tarayıcıdan doğrudan çağrılamaz, sunucu tarafı gerekir. [RESMÎ]

### New York Fed — Markets Data API — `https://markets.newyorkfed.org/api/`

Gösterge oranları (SOFR, EFFR, OBFR, TGCR, BGCR) ve açık piyasa işlemleri verisini **anahtarsız, ücretsiz** sunan resmî API. Fed faiz kararı sonrası gerçekleşen politika oranını (EFFR) ve SOFR'u doğrudan yayımlayan kurumun kaynağıdır. [RESMÎ]

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `api/rates/secured/sofr/last/1.json` | Son SOFR değeri | Herkese açık | 15.10.2026 testinde 200 döndü, 14.10.2026 verisi geldi [RESMÎ] |
| GET | `api/rates/unsecured/effr/last/1.json` | Son EFFR değeri (yüzdelikler, hacim, hedef aralık `targetRateFrom`/`targetRateTo`) | Herkese açık | 15.10.2026 testinde 200 döndü [RESMÎ] |
| GET | `api/rates/...` (secured: SOFR/TGCR/BGCR; unsecured: EFFR/OBFR) ve açık piyasa işlemleri uç noktaları | Diğer oranlar ve işlemler | Herkese açık | Tam liste dokümanda [RESMÎ] |

Doküman: https://markets.newyorkfed.org/static/docs/markets-api.html. Biçimler: JSON test edildi; dokümanda başka biçimler (CSV/XML) de olduğu belirtiliyor, sayfa JS ile yüklendiğinden bu oturumda metni okunamadı [TAHMİN]. Hız sınırı belgede doğrulanamadı [belgede yok].

## Gerçek zamanlı / bildirim

Hiçbir kurum **webhook, WebSocket veya streaming** sunmaz (resmî belgelerde yok). Takip; RSS/Atom, takvim (ICS) ve **yoklama (polling)** ile yapılır. [RESMÎ — belgede yok]

| Kaynak | Mekanizma | Ayrıntı |
|---|---|---|
| SEC EDGAR | **Atom/RSS — Latest Filings** | `https://www.sec.gov/cgi-bin/browse-edgar?action=getcurrent&type=8-K&company=&dateb=&owner=include&start=0&count=40&output=atom` — şirket, CIK, form türüne göre süzülebilir; Form 3/4/5 dahil/hariç/yalnız seçilebilir [RESMÎ]. Atom beslemesinin gecikmesi resmî belgede yazmıyor; yeni başvuruları yakalamanın en hızlı yollarından biri olduğu değerlendirmesi [TAHMİN] |
| SEC EDGAR | Şirket bazlı RSS | Company Search sonucundaki RSS bağlantısı [RESMÎ] |
| SEC EDGAR | XBRL RSS | `https://www.sec.gov/structureddata/rss-feeds`; doğrudan beslemeler: `https://www.sec.gov/Archives/edgar/xbrlrss.all.xml` (tüm XBRL), `usgaap.rss.xml` (US GAAP/IFRS), `xbrl-inline.rss.xml` (Inline XBRL), `xbrl-rr.rss.xml` (fon risk/getiri). **Gerçek zamanlı değil:** hafta içi 06:00–22:00 EST arasında 10 dakikada bir güncellenir [RESMÎ]. Arşiv `/Archives/edgar/monthly/` (2005'ten) [RESMÎ] |
| SEC | Basın bültenleri, konuşmalar, yaptırım RSS'i | ör. `https://www.sec.gov/news/pressreleases.rss` [RESMÎ] |
| SEC EDGAR | Polling | `submissions/CIK….json` yoklaması (≤10 istek/sn, tüm makineleriniz toplamında) [RESMÎ] |
| Fed Board | **RSS** | Basın bültenleri (`/feeds/press_all.xml`, para politikası `/feeds/press_monetary.xml`), konuşmalar (`/feeds/speeches.xml`), ifadeler (`/feeds/testimony.xml`), veri duyuruları (`/feeds/datadownload.xml`, `/feeds/h15.xml`, `/feeds/h10.xml`, `/feeds/g17.xml`, `/feeds/z1.xml`…) [RESMÎ]. Ayrı FOMC beslemesi listelenmiyor; en yakını para politikası beslemesi [RESMÎ] |
| FRED | Polling | `fred/series/updates` (son 2 hafta, dakika hassasiyetli zaman aralığı) + `fred/series` içindeki `last_updated`; yayın takvimi için `fred/releases/dates` [RESMÎ] |
| BLS | **ICS takvim** | `https://www.bls.gov/schedule/news_release/bls.ics` — tüm haber bülteni yayın tarihleri [RESMÎ]. Yayın anında `?latest=true` ile yoklama. Haber bülteni RSS'i bu sayfada doğrulanamadı [belgede yok] |
| BEA | Polling | API'de bildirim yok; yayın takvimi web sitesinde (API ile değil) [TAHMİN] |
| Treasury | Polling | Fiscal Data tabloları ve günlük faiz XML'i; bildirim mekanizması belgede yok [RESMÎ] |
| New York Fed | Polling | `api/rates/.../last/1.json` (SOFR, EFFR…) yoklama; anahtarsız [RESMÎ] |

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Şirketin yeni başvurusu (8-K, 10-K, 10-Q, S-1…) | Evet | EDGAR Atom `getcurrent` (form/CIK süzgeci) veya `submissions` JSON yoklama | Herkese açık | `submissions` JSON için gecikme genelde <1 sn [RESMÎ]; Atom beslemesinin gecikmesi belgede yok. User-Agent + ≤10 istek/sn |
| İçeriden alım-satım (Form 4), %5 üstü pay (13D/13G), fon portföyü (13F) | Evet | `getcurrent&type=4` vb. Atom; kişi (insider) CIK'ı ile de süzülebilir | Herkese açık | Form 3/4/5 geç saatte (22:00 ET'ye kadar) gelebilir [RESMÎ] |
| Şirket finansal kalemi değişti (gelir, borç…) | Evet | `companyfacts` / `companyconcept` yoklama | Herkese açık | XBRL gecikmesi genelde <1 dk [RESMÎ] |
| Başvuru içinde anahtar kelime | Kısmen | Resmî: başvuruyu indirip kendi süzgecinizle arama. Tam metin arama yalnızca web arayüzünde belgelenmiş (2001'den beri) | Herkese açık / resmî olmayan | `efts.sec.gov` arka ucu belgesiz [3. TARAF] |
| Fed faiz kararı / FOMC açıklaması | Evet | Fed RSS `press_monetary.xml`; politika oranları `prates.xml`; gerçekleşen oranlar için New York Fed `api/rates/unsecured/effr/last/1.json` ve `api/rates/secured/sofr/last/1.json` yoklama (anahtarsız); FRED'de ilgili seri yoklama | Herkese açık | [RESMÎ]. EFFR yanıtı hedef aralığı da içerir (`targetRateFrom`/`targetRateTo`) [RESMÎ — 15.10.2026 testi] |
| Fed yetkilisinin konuşması / Kongre ifadesi | Evet | `speeches.xml`, `testimony.xml`, kişi bazlı konuşma beslemeleri | Herkese açık | Kişi bazlı beslemeler çoğunlukla `/feeds/s_t_<soyad>.xml` kalıbında (ör. `s_t_powell.xml`), ama istisnalar var (ör. `m_w_Bowman.xml`). Adresi feeds.htm sayfasından alın, kalıpla üretmeyin [RESMÎ] |
| Yeni CPI / istihdam (NFP) rakamı | Evet | BLS ICS ile saati bil → yayın anında `timeseries/data/{id}?latest=true` yokla; alternatif FRED `series/updates` | v2 anahtar / FRED anahtar | BLS v2: 500 sorgu/gün — yalnızca yayın penceresinde sık yokla [RESMÎ] |
| GSYH, kişisel gelir/harcama (PCE) | Evet | BEA `GetData` yoklama veya FRED | UserID | 100 istek/dk [RESMÎ] |
| Faiz, kur, sanayi üretimi (H.15, H.10, G.17) | Evet | Fed RSS veri duyurusu + DDP otomatik indirme bağlantısı veya FRED | Herkese açık / anahtar | [RESMÎ] |
| Hazine borç, nakit, getiri eğrisi | Evet | Fiscal Data API `filter=record_date:gte:<tarih>`, faiz XML beslemesi | Herkese açık | [RESMÎ] |
| Herhangi bir FRED serisinin revizyonu | Evet | `fred/series/vintagedates`, `realtime_start/end` | Anahtar | [RESMÎ] |
| Filtreleme / önem ayıklama | Evet (uygulama tarafında) | Form türü, CIK listesi, sektör (SIC), beklenti–gerçekleşen farkı eşiği | — | API'ler sunucu tarafı anahtar kelime süzgeci vermez (EDGAR Atom'da form/CIK süzgeci hariç) [TAHMİN] |

Önerilen mimari [TAHMİN]: (1) RSS/Atom ve ICS ile "olay oldu" sinyali, (2) sinyal gelince ilgili JSON API'den ayrıntıyı çek, (3) hız sınırlarına göre kuyruklu tek iş parçacıklı istemci (BEA bunu açıkça öneriyor [RESMÎ]), (4) son görülen `accessionNumber` / `last_updated` / `record_date` değerini saklayarak yinelenen bildirimleri engelle.

## Hız sınırları ve fiyatlar

| Kaynak | Ücret | Limit | Aşınca |
|---|---|---|---|
| FRED | Ücretsiz | 120 istek/dk [RESMÎ]; gözlem `limit` ≤100000 (v1), ≤500000 (v2) | HTTP 429; görmezden gelinirse geçici engel [RESMÎ]. Kullanım şartları: kurum limitleri önceden haber vermeden değiştirebilir [RESMÎ] |
| Fed Board DDP | Ücretsiz | Belgede sayısal limit yok | — |
| Treasury Fiscal Data | Ücretsiz | Belgede sayısal limit yok; yanıt kodlarında 429 listelenmiyor [RESMÎ] | — |
| BLS v1 | Ücretsiz | 25 sorgu/gün, 25 seri/sorgu, 10 yıl, 50 istek/10 sn [RESMÎ] | — |
| BLS v2 | Ücretsiz (kayıt) | 500 sorgu/gün, 50 seri/sorgu, 20 yıl, 50 istek/10 sn; anahtar yılda bir yenilenir [RESMÎ] | — |
| BEA | Ücretsiz (kayıt) | 100 istek/dk, 100 MB/dk, 30 hata/dk (kılavuz tarihi: 20 Nisan 2026) [RESMÎ] | HTTP 429 + `Retry-After` başlığı; ~1 dk bekleme, süre içinde gelen istekler süreyi korur [RESMÎ] |
| SEC EDGAR | Ücretsiz | ≤10 istek/sn (kullanıcı başına, tüm makineler toplamı) [RESMÎ] | IP engellenebilir; "Access Denied" halinde webmaster@sec.gov'a başvurulur [RESMÎ]. Engel süresi resmî sayfalarda yazmıyor; toplulukta "10 dakika" diye anılır [3. TARAF] |

## Resmî olmayan yollar ve riskler

- **EDGAR Full-Text Search arka ucu (`efts.sec.gov/LATEST/search-index?q=...`)**: Web arayüzünün kullandığı JSON uç noktası; topluluk kütüphaneleri kullanır. Resmî API olarak belgelenmemiştir, şema/adres haber verilmeden değişebilir. SEC hız sınırı ve User-Agent kuralı yine geçerlidir. [3. TARAF — bu oturumda resmî belgede doğrulanamadı]
- **Ücretli 3. taraf EDGAR sarmalayıcıları** (ör. sec-api.io): Gerçek zamanlı WebSocket akışı, tam metin arama, ayrıştırılmış 13F/Form 4 sunar. Kamu kurumu değildir; veri doğruluğu ve süreklilik sağlayıcıya bağlıdır. [3. TARAF]
- **Web sayfası kazıma (scraping)**: SEC "bot ve tarayıcılara (crawler) izin verilmez", hız sınırını aşan otomasyonu "yönetir" [RESMÎ]. Fed/BLS/BEA sayfalarını kazımak yerine API/RSS/DDP kullanılmalı.
- **FRED kullanım şartı riskleri**: Bazı seriler 3. taraf telifli ("Copyright" notlu) — kişisel kullanım dışı için veri sahibinden izin gerekir; FRED/ALFRED deneyimini kopyalayan/ikame eden uygulama yasak; uygulamada "This product uses the FRED® API but is not endorsed or certified by the Federal Reserve Bank of St. Louis." ibaresi gösterilmeli; anahtar paylaşılamaz [RESMÎ].
- **Hukuki**: ABD federal kurum verileri genelde kamu malıdır, ancak FRED'deki 3. taraf serileri istisnadır [RESMÎ — FRED şartları]; diğer kurumlar için lisans metni bu sayfada ayrıca doğrulanmadı.

## SDK ve kütüphaneler

| Kaynak | Resmî | Topluluk (Python / R / .NET) |
|---|---|---|
| FRED | Resmî SDK yok; REST + örnekler | Python: `fredapi`, `fedfred`; R: `fredr` [3. TARAF]. .NET: resmî/ yaygın kabul görmüş paket doğrulanmadı — `HttpClient` + `System.Text.Json` yeterli [TAHMİN] |
| Fed Board DDP | Yok | CSV/SDMX okuyucular (ör. Python `pandasdmx`/`sdmx1`) [3. TARAF] |
| Treasury | Yok (dokümanda örnek kod) | Basit REST; R/Python örnekleri topluluktan [3. TARAF] |
| BLS | Yok (sayfada Python/Java/C#/R… örnek kodlar bağlantılı) [TAHMİN] | Python `blsAPI` vb. [3. TARAF] |
| BEA | **`beaapi`** (Python, `github.com/us-bea/beaapi`, ABD Ticaret Bakanlığı GitHub organizasyonu; `pip install beaapi`) [RESMÎ — kurum GitHub'ı] | R: `bea.R` [3. TARAF] |
| SEC EDGAR | Yok | Python: `edgartools`, `sec-edgar-downloader`; .NET için yaygın paket doğrulanmadı [3. TARAF] |

.NET notu [TAHMİN]: Hepsi basit JSON/XML REST olduğundan `HttpClient` + `Polly` (429/`Retry-After` için yeniden deneme) + `System.ServiceModel.Syndication` (RSS/Atom okuma) + `Ical.Net` (BLS ICS) yeterlidir. SEC için `HttpClient.DefaultRequestHeaders.UserAgent` ayarlanmalı ve istemci tarafı hız sınırlayıcı (`System.Threading.RateLimiting`) kullanılmalı.

## Postman / OpenAPI / koleksiyonlar

- **BEA**: Swagger arayüzü — https://apps.bea.gov/API/swagger/index.htm [RESMÎ]
- **Treasury Fiscal Data**: Dokümanda uç nokta listesi ve veri sözlükleri var; resmî OpenAPI dosyası bu oturumda doğrulanamadı [belgede yok].
- **FRED, BLS, SEC, Fed DDP**: Resmî OpenAPI/Postman koleksiyonu bulunamadı [belgede yok]. Topluluk Postman koleksiyonları olabilir; kullanmadan önce uç noktaları resmî belgeyle karşılaştırın [TAHMİN].

## Depoda ilgili sayfalar

- [Kripto borsaları — Bybit ve Kraken](../Kripto-Borsalari/Bybit-ve-Kraken.md) — piyasa verisi ve WebSocket akışı karşılaştırması için.
- [GitHub API](../Gelistirici-Platformlari/GitHub.md) — polling + ETag ile değişiklik takibi deseni benzer.
- [X (Twitter)](../Sosyal-Medya/X-Twitter.md), [Telegram](../Mesajlasma/Telegram.md) — kurum duyurularını sosyal kanallardan da izlemek / bildirimleri iletmek için.
- Bu klasördeki (`Finans-ve-Ekonomi/`) diğer veri sağlayıcı sayfaları.

## Kaynaklar

Resmî:
- https://fred.stlouisfed.org/docs/api/fred/ — FRED API v1 uç nokta listesi (erişim: 15 Ekim 2026)
- https://fred.stlouisfed.org/docs/api/fred/v2/index.html — FRED API v2 (toplu yayın gözlemleri) (erişim: 15 Ekim 2026)
- https://fred.stlouisfed.org/docs/api/fred/v2/release_observations.html — v2 `release/observations`, `next_cursor` sayfalama (erişim: 15 Ekim 2026)
- https://fred.stlouisfed.org/docs/api/fred/v2/api_key.html — v2 `Authorization: Bearer` (erişim: 15 Ekim 2026)
- https://fred.stlouisfed.org/docs/api/api_key.html — FRED API anahtarı alma (erişim: 15 Ekim 2026)
- https://fred.stlouisfed.org/docs/api/fred/errors.html — hata kodları, 120 istek/dk (erişim: 15 Ekim 2026)
- https://fred.stlouisfed.org/docs/api/fred/series_observations.html — gözlem parametreleri (erişim: 15 Ekim 2026)
- https://fred.stlouisfed.org/docs/api/fred/series_updates.html — son güncellenen seriler (erişim: 15 Ekim 2026)
- https://fred.stlouisfed.org/docs/api/terms_of_use.html — FRED API kullanım şartları (erişim: 15 Ekim 2026)
- https://www.federalreserve.gov/datadownload/ — Fed Board Data Download Program (erişim: 15 Ekim 2026)
- https://www.federalreserve.gov/datadownload/help/default.htm — DDP yardım: biçimler, otomatik indirme bağlantısı (erişim: 15 Ekim 2026)
- https://www.federalreserve.gov/feeds/feeds.htm — Fed Board RSS beslemeleri (erişim: 15 Ekim 2026)
- https://fiscaldata.treasury.gov/api-documentation/ — Treasury Fiscal Data API dokümanı (erişim: 15 Ekim 2026)
- https://home.treasury.gov/treasury-daily-interest-rate-xml-feed — Hazine günlük faiz XML beslemesi (erişim: 15 Ekim 2026)
- https://www.bls.gov/developers/ — BLS geliştirici ana sayfası (erişim: 15 Ekim 2026)
- https://www.bls.gov/developers/api_faqs.htm — BLS v1/v2 limitleri (erişim: 15 Ekim 2026)
- https://www.bls.gov/developers/api_signature_v2.htm — BLS v2 uç noktaları (erişim: 15 Ekim 2026)
- https://www.bls.gov/schedule/news_release/ — BLS yayın takvimi ve ICS (erişim: 15 Ekim 2026)
- https://apps.bea.gov/api/signup/ — BEA API kaydı ve veri setleri (erişim: 15 Ekim 2026)
- https://apps.bea.gov/api/_pdf/bea_web_service_api_user_guide.pdf — BEA API kullanıcı kılavuzu (20 Nisan 2026 sürümü; throttling) (erişim: 15 Ekim 2026)
- https://github.com/us-bea/beaapi — BEA'nın Python kütüphanesi (erişim: 15 Ekim 2026)
- https://www.sec.gov/search-filings/edgar-application-programming-interfaces — EDGAR `data.sec.gov` API'leri (erişim: 15 Ekim 2026)
- https://www.sec.gov/search-filings/edgar-search-assistance/accessing-edgar-data — EDGAR erişim kuralları, User-Agent, indeks zamanlaması (erişim: 15 Ekim 2026)
- https://www.sec.gov/about/webmaster-frequently-asked-questions — SEC webmaster SSS, 10 istek/sn (erişim: 15 Ekim 2026)
- https://www.sec.gov/about/developer-resources — SEC geliştirici kaynakları, toplu veri (erişim: 15 Ekim 2026)
- https://www.sec.gov/about/rss-feeds — SEC RSS beslemeleri (erişim: 15 Ekim 2026)
- https://www.sec.gov/edgar/search/efts-faq.html — EDGAR tam metin arama SSS (erişim: 15 Ekim 2026)
- https://www.sec.gov/structureddata/rss-feeds — XBRL RSS beslemeleri, 10 dakikalık güncelleme (erişim: 15 Ekim 2026)
- https://fred.stlouisfed.org/docs/api/geofred/ — FRED Maps API (GeoFRED) uç noktaları (erişim: 15 Ekim 2026)
- https://markets.newyorkfed.org/static/docs/markets-api.html — New York Fed Markets Data API (erişim: 15 Ekim 2026)

3. taraf (resmî değil; bu oturumda web araması kotası dolduğu için ayrıca doğrulanamadı):
- https://sec-api.io — ücretli EDGAR sarmalayıcısı (gerçek zamanlı akış) (erişim: 15 Ekim 2026, doğrulanmadı)
- https://pypi.org/project/fredapi/ , https://pypi.org/project/edgartools/ — Python topluluk kütüphaneleri (erişim: 15 Ekim 2026, doğrulanmadı)
