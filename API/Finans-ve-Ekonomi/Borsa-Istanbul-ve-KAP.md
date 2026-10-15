# Borsa İstanbul ve KAP API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **Bireysel geliştiriciye açık ücretsiz resmî API yok.** Veri, lisanslı dağıtıcılar üzerinden ücretli satılıyor; KAP'ın makineyle okunur akışı yalnızca sözleşmeli veri yayın kuruluşlarına açık.

> Araştırma notu: Bu sayfa hazırlanırken oturumun web arama kotası dolmuştu. Bu yüzden içerik, doğrudan okunan resmî sayfalara ve resmî belgelere (Borsa İstanbul Veri Dağıtım Sözleşmesi 21.a ve ekleri, MKK Ürün ve Hizmet Kataloğu) dayanıyor. Aramayla doğrulanamayan konular "belgede yok" ya da [TAHMİN] olarak işaretlendi.

## Özet

Borsa İstanbul (BIST) piyasa verisini **eşanlı (gerçek zamanlı), gecikmeli ve gün sonu** olmak üzere üç biçimde, yalnızca **Veri Dağıtım Sözleşmesi (VDS)** imzalamış lisanslı dağıtıcılar aracılığıyla yayınlar [RESMÎ]. Sözleşmeye göre "gecikmeli veri" **en az 15 dakika** geciktirilmiş veridir; 15 dakikadan yeni her veri "eşanlı" sayılır ve lisansa tabidir [RESMÎ]. Tarihsel veri **DataStore** (datastore.borsaistanbul.com) üzerinden satılır; borsanın sitesinde bazı günlük/aylık istatistikler CSV olarak indirilebilir [RESMÎ]. KAP (Kamuyu Aydınlatma Platformu) bildirimleri web sitesi, mobil uygulama, **KAP Veri Yayın Servisi** ve SWIFT üzerinden eş zamanlı dağıtılır; makineyle okunur servis sözleşmeli veri yayın kuruluşlarına verilir ve kimlik doğrulama ister [RESMÎ]. KAP verisi ayrıca BIST VDS kapsamında "üçüncü taraf içeriği" olarak lisanslanır. Fiyatı Ek-3'te yayımlanır ve bu lisansta filtreli teslim seçeneği de vardır [RESMÎ]. Bireysel geliştiricinin yaygın kullandığı Yahoo Finance `.IS` sembolleri, kazıyıcı (scraper) kütüphaneler ve aracı kurum uygulamaları ise resmî olmayan ya da sınırlı yollardır.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Tarayıcı | borsaistanbul.com: günlük bülten, işlem hacmi, yabancı işlemleri, açığa satış vb. **CSV** dosyaları; endeks verileri sayfaları. kap.org.tr: bildirimler (HTML), şirket/fon sayfaları, arama. KAP mobil uygulaması: takip edilen şirket için anlık bildirim [RESMÎ] | Ücretsiz; ama **API değil**, dosya/sayfa. Yeniden yayın hakkı yok ("Tüm hakları saklıdır") [RESMÎ] |
| Geliştirici hesabı/uygulama | — | **Yok.** Borsa İstanbul veya MKK'nın kayıtla anahtar veren self-servis geliştirici programı belgede yok [RESMÎ — belgede yok] | — |
| İşletme/uygulama onayı (partner) | **Alt dağıtıcı** olmak: yetkili bir dağıtıcı üzerinden başvuru + Borsa İstanbul onayı (Ek-7 Alt Dağıtıcı İzin Formu) | Kullanıcı başı ücreti olmayan veriler: **Sınırlı Düzey 1, gecikmeli veri, referans veri** [RESMÎ] | Dağıtıcının fiyatı + BIST tarifesi |
| Ücretli/kurumsal | **Veri Dağıtım Sözleşmesi** (VDS, sürüm 21.a, 01.01.2026) imzalayıp **dağıtıcı** olmak; teknik bağlantı (BISTECH, veri merkezi, Londra LD5 PoP veya web servis) | Eşanlı Düzey 1+/2/2+, Karma Düzey 1, veri analitikleri, endeksler, gösterimsiz kullanım (algo, risk), türetilmiş veri, KAP/MKK verisi (üçüncü taraf içeriği) [RESMÎ] | Bkz. "Hız sınırları ve fiyatlar" — aylık sabit + kullanıcı başı değişken bedel |
| Ücretli/kurumsal (KAP) | MKK ile **KAP Veri Yayın Servisi** sözleşmesi (veri yayın kuruluşu) **veya** BIST VDS kapsamında KAP verisi lisansı (üçüncü taraf içeriği) | KAP bildirimlerinin makineyle okunur, eş zamanlı akışı [RESMÎ]; test uç noktası MKK API Gateway üzerinde [RESMÎ: test ortamında 401 yanıtı ile varlığı doğrulandı]. VDS lisansında bildirim tipi, şirket/fon, şirket/fon tipi ve bildirim konusuna göre filtreli teslim seçilebilir [RESMÎ] | VDS Ek-3: aylık 15.000 TL / 650 USD (birincil), 12.000 TL / 540 USD (filtreli, ikincil/alt); ayrıntı "Hız sınırları ve fiyatlar"da. MKK'nın doğrudan sözleşme fiyatı belgede yok |
| Ücretli (tarihsel) | DataStore hesabı | Tarihsel ve bazı referans veriler; akademik başvuru için dilekçe örneği var [RESMÎ] | Ürün başına fiyat; site JS ile yükleniyor, fiyatlar bu araştırmada okunamadı [belgede yok] |
| Aracı kurum | Aracı kurum müşterisi olmak | Kurumun kendi uygulaması/platformu üzerinden veri ve emir. Açık API sunan kurumlar az ve değişken [TAHMİN] | Kuruma göre |
| Resmî olmayan | — | Yahoo Finance `.IS` sembolleri (`yfinance`), İş Yatırım sitesi kazıma (`isyatirimhisse`), KAP sitesi kazıma (`pykap`), KAP web sitesinin iç JSON uç noktaları | Ücretsiz; **ToS/lisans riski**, kırılgan |

## Kimlik doğrulama

- **Borsa İstanbul (dağıtıcı):** Kullanıcı adı/anahtar tipi bir web API yok; veri BISTECH altyapısı üzerinden fiziksel/sanal bağlantıyla (veri merkezi kabini, Londra Equinix LD5 erişim noktası) veya tarifede adı geçen **"Web Servis Bağlantısı"** ile verilir [RESMÎ]. Protokol ayrıntıları ("Bağlantı Protokolleri" sayfası) bu araştırmada okunamadı [belgede yok].
- **KAP Veri Yayın Servisi:** MKK API Gateway üzerinde çalışır. Test ortamı uç noktası (`https://apigwdev.mkk.com.tr/api/vyk/...`) kimliksiz istekte **HTTP 401** döndürüyor; yani yetkilendirme şart [RESMÎ — 15 Ekim 2026'da gözlendi]. Kimlik doğrulama yöntemi (API anahtarı mı, OAuth mu) kamuya açık belgede yok [belgede yok]; MKK API Portalı (apiportal.mkk.com.tr) giriş gerektiriyor.
- **MKK genel entegrasyon (KAP dışı, üyeler için):** SOAP/REST, mesaj imzalama sertifikası (test ve prod için ayrı) gerekir [RESMÎ]. Bu kanal saklama/MKS işlemleri içindir, KAP takibi için değil.
- **Resmî olmayan yollar:** Kimlik yok; tarayıcı gibi davranan HTTP istekleri.

## Temel uç noktalar

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET (dosya) | `https://www.borsaistanbul.com/veriler/pay-piyasasi-verileri` | Pay piyasası CSV dosyaları (bülten, hacim, yabancı işlemleri, açığa satış, genel kurul tarihleri) | Herkese açık | API değil; dosya desenleri ayrı PDF'te [RESMÎ] |
| GET (dosya) | `https://www.borsaistanbul.com/veriler/gunluk-bulten` | Günlük bülten | Herkese açık | Gün sonu [RESMÎ] |
| GET (dosya) | `https://www.borsaistanbul.com/files/DataFilePaths.zip` | Veri dosyalarının dizin adresleri | Herkese açık | Otomatik indirme için yol listesi [RESMÎ] |
| — | `https://datastore.borsaistanbul.com/` | Tarihsel veri mağazası | Ücretli | Satın alma arayüzü; API belgesi yok [belgede yok] |
| (akış) | BISTECH veri yayını | Eşanlı/gecikmeli piyasa verisi | Kurumsal (VDS) | Teknik bağlantı bedeli var [RESMÎ] |
| GET | `https://apigwdev.mkk.com.tr/api/vyk/...` (test) | KAP Veri Yayın Servisi test ortamı (üyeler, bildirim listesi, bildirim detayı vb.) | Kurumsal (MKK sözleşmesi) | Kimliksiz istekte 401 döndürüyor [RESMÎ — 401 gözlendi, 15 Ekim 2026] |
| GET | `https://apigw.mkk.com.tr/api/vyk/...` (prod) | KAP Veri Yayın Servisi canlı ortamı | Kurumsal (MKK sözleşmesi) | [3. TARAF / doğrulanamadı — 15 Ekim 2026'da dış ağdan bağlantı kurulamadı, muhtemelen IP kısıtlı]. Prod adresi ve alt yollar (`members`, `disclosures`, `disclosureDetail`, `lastDisclosureIndex` gibi) topluluk kaynaklarından bilinir, resmî belgeyle doğrulanamadı |
| GET (sayfa) | `https://www.kap.org.tr/tr/` · `/tr/bildirim-sorgu` · `/tr/bist-sirketler` | Bugünkü bildirimler, detaylı sorgu, şirket listesi | Herkese açık | HTML/SPA; sayfanın arka planda çağırdığı `/tr/api/...` JSON yolları **belgelenmemiş** ve değişebilir [3. TARAF] |
| GET | `https://query1.finance.yahoo.com/v8/finance/chart/THYAO.IS` | Yahoo: BIST hissesi fiyat serisi | Resmî olmayan | `.IS` soneki; endeks `XU100.IS`. Gecikmeli, belgesiz, hız sınırı/ engel riski [3. TARAF] |

Tam liste için: Borsa İstanbul Veri Yayın Ürünleri sayfası ve VDS Ek-2 (Veri Listesi).

## Gerçek zamanlı / bildirim

- **Webhook / WebSocket (herkese açık):** Yok [RESMÎ — belgede yok].
- **RSS:** KAP'ın sitesinde resmî RSS bağlantısı bulunamadı; `kap.org.tr/tr/rss` 404 döndürüyor [RESMÎ — 15 Ekim 2026'da gözlendi]. Eski blog yazılarında geçen KAP RSS adresleri güncel değil [TAHMİN].
- **KAP mobil uygulaması:** Şirket/fon takibi ve duyurular için **anlık push bildirimi** [RESMÎ]. İnsan içindir; programatik erişim yok.
- **KAP Veri Yayın Servisi:** Veri yayın kuruluşlarına bildirimlerin **eş zamanlı** iletimi [RESMÎ]. Çalışma biçimi (push mu, artan bildirim indeksiyle polling mi) kamuya açık belgede yok; topluluk kaynakları "son bildirim indeksi"ni sorgulayıp yeni bildirimleri çeken polling modeli tarif ediyor [3. TARAF].
- **Borsa İstanbul eşanlı akış:** Yalnızca lisanslı dağıtıcılara, BISTECH üzerinden [RESMÎ].
- **e-Yatırımcı / Yatırımcı Bildirim Servisi (MKK):** Yatırımcının kendi hesap hareketleri için mobil bildirim [RESMÎ]; takip uygulamasına veri vermez.

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Şirketin yeni KAP bildirimi (özel durum, finansal tablo) | Evet | **Resmî:** KAP Veri Yayın Servisi · **Ücretsiz:** kap.org.tr'yi periyodik sorgulama / `pykap` | Kurumsal / Resmî olmayan | Ücretsiz yol site değişince kırılır; sorgu sıklığını düşük tut [3. TARAF] |
| Bildirim türüne/anahtar kelimeye göre filtreleme | Evet (istemci tarafında) | Bildirim başlığı/konu/şirket koduna göre kendi filtrelemen | — | KAP'ın sitesinde içerik araması var, ama programatik filtre API'si herkese açık değil [RESMÎ]. **Resmî/ücretli:** VDS Ek-3 filtreli KAP lisansı (bildirim tipi, şirket/fon, şirket/fon tipi, bildirim konusu), filtre başına aylık 12.000 TL / 540 USD [RESMÎ] |
| Beklenen bildirimler (finansal rapor takvimi) | Evet | `kap.org.tr/tr/beklenen-bildirim-sorgu` sayfası | Herkese açık (sayfa) | API değil |
| Hisse fiyatı eşik alarmı (gerçek zamanlı) | Kısıtlı | Lisanslı dağıtıcı/aracı kurum uygulaması | Ücretli | 15 dk'dan yeni veri = eşanlı = lisanslı [RESMÎ] |
| Hisse fiyatı (≥15 dk gecikmeli) — ekranda izleme | Evet | Lisanslı dağıtıcı ekranı (TradingView, aracı kurum uygulamaları) | Resmî (lisanslı dağıtıcı) | İnsan içindir, programatik API değil; TradingView BIST'in yetkili dağıtıcı listesinde [RESMÎ] |
| Hisse fiyatı (≥15 dk gecikmeli) — programatik | Evet | Yahoo `.IS` / `yfinance` | Resmî olmayan | Kişisel kullanım; yeniden yayın için lisans gerekir [RESMÎ + 3. TARAF] |
| Gün sonu kapanış, hacim | Evet | borsaistanbul.com CSV dosyaları | Herkese açık | Gün sonu verisi; ticari yeniden yayın şartları VDS'de [RESMÎ] |
| Endeks değişiklikleri / borsa duyuruları | Evet | borsaistanbul.com duyurular sayfası (HTML) | Herkese açık | RSS/API belgede yok |
| Genel kurul tarihleri, temettü, sermaye artırımı | Evet | KAP bildirimleri + BIST "Genel Kurul Tarihleri" CSV | Herkese açık | Haftalık güncellenir [RESMÎ] |
| Açığa satış / yabancı işlemleri | Evet | BIST CSV (haftalık/aylık) | Herkese açık | Gecikmeli istatistik |

## Hız sınırları ve fiyatlar

**Resmî tarife — Borsa İstanbul VDS Ek-3 (Sürüm 21.a), 01.01.2026'dan itibaren geçerli, KDV hariç** [RESMÎ]. Rakamlar Ek-3 PDF'inden satır satır (`pdftotext -raw`) okunmuştur.

| Kalem | Yurtiçi / Yurtdışı |
|---|---|
| Veri merkezi bağlantısı, kabinet tahsisli | İlk 100.000 TL / 4.000 USD · yıllık 450.000 TL / 12.500 USD |
| Veri merkezi bağlantısı, kabinet tahsissiz | İlk 50.000 TL / 2.000 USD · yıllık 225.000 TL / 6.250 USD |
| Londra Equinix LD5 bağlantısı | İlk 2.000 USD · yıllık 24.600 USD |
| Web servis bağlantısı | İlk 25.000 TL / 1.000 USD · yıllık 112.500 TL / 3.125 USD |
| Eşanlı Pay Düzey 2/2+ aylık sabit | 44.000 TL / 1.620 USD |
| Eşanlı Pay Düzey 1+ aylık sabit | 18.000 TL / 740 USD |
| **Gecikmeli veriler** (tüm Düzey 1+ ve BIST endeksleri) aylık sabit | 10.800 TL / 600 USD |
| Gün sonu (kapanış) verileri — tüm Düzey 1+ ve BIST endeksleri, aylık sabit | 5.600 TL / 330 USD |
| Pay İşlem Tarafı Gün Sonu / VİOP İşlem Tarafı Gün Sonu (ayrı kalemler), aylık sabit | Her biri 5.200 TL / 300 USD |
| Karma Düzey 1, kullanıcı başı aylık | 20 TL (1–1.000 kullanıcı) → 10 TL (50.001+); **en az 1.000 kullanıcı ücreti** |
| Pay Düzey 2+, kullanıcı başı aylık | 625 TL / 45 USD |
| Gösterimsiz kullanım (algo/risk), Pay Düzey 2/2+ | 18.000 TL / 1.200 USD aylık (1–5 cihaz) → 48.600 TL / 3.240 USD aylık (sınırsız) |

**KAP verisi (Ek-3, "Üçüncü Taraf İçeriği → B. MKK Verileri")** [RESMÎ]: KAP bildirimleri BIST VDS kapsamında üçüncü taraf içeriği olarak da lisanslanır.

| Kalem | Yurtiçi / Yurtdışı |
|---|---|
| MKK verileri teknik bağlantısı | İlk 25.000 TL / 1.000 USD · yıllık 70.000 TL / 2.600 USD. MKK verilerinden **yalnızca KAP verisi** için yetki alan dağıtıcıya uygulanmaz; alt/ikincil dağıtıcılar da ödemez. |
| KAP Verileri — Birincil Dağıtıcı, aylık sabit | 15.000 TL / 650 USD |
| KAP Verileri — Birincil Dağıtıcı (Filtreli), aylık sabit | 12.000 TL / 540 USD |
| KAP Verileri — İkincil/Alt Dağıtıcı, aylık sabit | 12.000 TL / 540 USD |

Filtreler "Bildirim Tipi", "Şirket/Fon", "Şirket Tipi/Fon Tipi" ve "Bildirim Konusu" bazındadır. Filtreli alan dağıtıcı, birincil ücret yerine İkincil/Alt Dağıtıcı ücretini öder. Bu ücret her ayrı filtre için ayrıca uygulanır. "Şirket/Fon" filtresiyle birden çok şirketin/fonun bildirimini almak isteyen dağıtıcı bu ücretin 2 katını öder.

Önemli kurallar [RESMÎ]:
- **Eşanlı veri:** BIST'in veriyi ilk ilettiği andan itibaren en fazla 15 dakika içinde kullanılan/dağıtılan veri. **Gecikmeli veri:** en az 15 dakika geciktirilmiş veri.
- Eşanlı dağıtım yetkisi olan, aynı verinin gecikmeli ve gün sonu dağıtımı için sabit bedel ödemez.
- Gün sonu (kapanış) verisi, bilgilendirme şartıyla basılı/görsel medyaya izin almadan dağıtılabilir.
- **Gösterimsiz kullanım** (ekranda göstermeden algoritma, risk, emir yönlendirme) ve **türetilmiş veri** üretimi doğrudan VDS gerektirir.
- Kendi endeksini hesaplamak ayrı endeks yapıcılığı lisansı ister.

**KAP verisi ücreti:** BIST VDS üzerinden alınan KAP lisansının tarifesi yukarıda [RESMÎ]. MKK ile doğrudan yapılan KAP Veri Yayın Servisi sözleşmesinin ücreti kamuya açık belgede yok [belgede yok].
**DataStore fiyatları:** Bu araştırmada okunamadı [belgede yok].
**Hız sınırları:** Resmî kanallar için yayınlanmış istek/saniye limiti yok (akış/sözleşme tabanlı) [belgede yok]. Resmî olmayan yollarda limit belirsizdir; aşırı istek IP engeline yol açabilir [TAHMİN].

## Resmî olmayan yollar ve riskler

| Yol | Nasıl çalışır | Risk |
|---|---|---|
| **Yahoo Finance `.IS`** (`yfinance` Python, `YahooFinanceApi` .NET vb.) | Yahoo'nun belgelenmemiş `query1/query2.finance.yahoo.com` uç noktaları; BIST hisseleri `THYAO.IS`, endeks `XU100.IS`, döviz `USDTRY=X` | `yfinance` Yahoo ile bağlantılı değildir; Yahoo verisinin kişisel kullanım için olduğunu kendisi belirtir [3. TARAF]. Veri gecikmeli; uç noktalar habersiz değişir; çerez/crumb zorunluluğu ve 429 hataları yaşanır [3. TARAF]. Yeniden yayın (başkalarına gösterme) BIST lisansını da ihlal edebilir [RESMÎ: VDS]. |
| **İş Yatırım sitesi** (`isyatirimhisse`, Python, 5.0.1 — 21.02.2026) | İş Yatırım web sitesindeki fiyat, endeks ve finansal tablo verilerini çeker | Kütüphane kendini "resmî değil, yalnızca kişisel kullanım" diye tanımlıyor [3. TARAF]. Site yapısı değişirse kırılır. |
| **KAP sitesi** (`pykap`, Python, 0.2.0 — 12.03.2026) | kap.org.tr'den şirket listesi, şirket bilgisi, geçmiş/beklenen bildirimleri ayrıştırır | Belgelenmemiş yapı; site sürümü (KAP 4.0 vb.) değişince kırılır [3. TARAF]. |
| **KAP iç JSON uç noktaları** | kap.org.tr SPA'sının çağırdığı `/tr/api/...` yolları tarayıcı geliştirici araçlarından bulunup taklit edilir | Belgesiz; KAP kullanım koşulları ve kişisel veri içermese de yüksek frekanslı çekim engellenebilir [TAHMİN]. |
| **AlgoLab (Deniz Yatırım)** | Aracı kurumun REST + WebSocket API'si idi | Topluluk kütüphanesinin README'sine göre platform ve API **31.12.2025 itibarıyla kapatıldı** [3. TARAF]. Aracı kurum API'lerinin kalıcı olmadığına örnek. |

Genel değerlendirme: Kişisel, ekranda gösterilmeyen, düşük frekanslı kullanım pratikte yaygındır; **başkalarına veri yayınlayan** (uygulama, site, bot) bir takip ürünü ise BIST verisi için lisans gerektirir. KAP bildirimleri kamuya açık olsa da toplu ve otomatik çekim için resmî kanallar MKK'nın Veri Yayın Servisi ve BIST VDS kapsamındaki KAP verisi lisansıdır.

## SDK ve kütüphaneler

- **Resmî SDK:** Borsa İstanbul veya MKK'nın yayımladığı herkese açık SDK yok [belgede yok].
- **Python:** `yfinance` (Yahoo, resmî değil), `isyatirimhisse` (İş Yatırım sitesi, resmî değil), `pykap` (KAP sitesi, resmî değil).
- **.NET:** `YahooFinanceApi` ve `OoplesFinance.YahooFinanceAPI` NuGet paketleri Yahoo'nun resmî olmayan uç noktalarını sarar [3. TARAF — sürümleri bu araştırmada doğrulanamadı]. KAP için popüler bir .NET kütüphanesi bulunamadı [belgede yok]; `HttpClient` + `AngleSharp`/`HtmlAgilityPack` ile kazıma yapılabilir.
- **Ticari platformlar:** Matriks (dağıtıcı listesinde) gibi Türk veri sağlayıcılarının algoritmik işlem platformları (ör. Matriks IQ, C# tabanlı strateji) lisanslı veriyle çalışır [3. TARAF — ürün sayfası bu araştırmada okunamadı].
- **Lisanslı dağıtıcılar:** Bloomberg, Refinitiv (LSEG), FactSet, ICE, S&P Global, TradingView, Matriks, Fintables ve birçok aracı kurum/banka BIST'in yetkili dağıtıcı listesinde [RESMÎ]. BIST verisini **yasal olarak** bir uygulamada göstermek isteyen, bunlardan birinin API'si üzerinden alt dağıtıcı olarak ilerleyebilir.

## Postman / OpenAPI / koleksiyonlar

- Borsa İstanbul ve KAP için resmî Postman koleksiyonu veya OpenAPI belgesi kamuya açık değil [belgede yok].
- MKK API Portalı (apiportal.mkk.com.tr) sözleşmeli kullanıcılara servis tanımlarını sunar; giriş yapmadan içerik görünmüyor [RESMÎ].
- BIST veri dosyası desenleri: "Veri bildirim ve kabul formatları" PDF'i ve `DataFilePaths.zip` [RESMÎ].

## Depoda ilgili sayfalar

- [Piyasa veri API'leri](Piyasa-Veri-APIleri.md) — genel hisse/döviz veri sağlayıcıları (Yahoo dahil karşılaştırma için).
- [TradingView](TradingView.md) — BIST'in yetkili dağıtıcılarından biri; grafik ve alarm.
- [TCMB EVDS](TCMB-EVDS.md) — Türkiye makroekonomik veriler, resmî ve ücretsiz API.
- [Türkiye haber kaynakları](../Haber/Turkiye-Haber-Kaynaklari.md) — şirket haberlerini KAP dışından takip etmek için.

## Kaynaklar

Resmî:
- [Borsa İstanbul — Veri Yayını](https://www.borsaistanbul.com/veriler/veri-yayini) — eşanlı/gecikmeli/gün sonu yayın modeli, iletişim (erişim: 15 Ekim 2026)
- [Borsa İstanbul — Veri Yayın Ürünleri](https://www.borsaistanbul.com/veriler/veri-yayini/veri-yayin-urunleri) — Karma Düzey 1, Düzey 1+/2/2+, veri analitikleri, KAP/MKK üçüncü taraf verisi (erişim: 15 Ekim 2026)
- [Borsa İstanbul — Veri Dağıtım Sözleşmesi](https://www.borsaistanbul.com/veriler/veri-yayini/borsa-istanbul-veri-dagitim-sozlesmesi) — VDS 21.a ve ekleri ([VDS.rar](https://www.borsaistanbul.com/files/VDS.rar)): 15 dk tanımı, Ek-1 kullanım kuralları, Ek-3 fiyat tarifesi (s.1 teknik bağlantı, s.2 aylık sabit bedeller, s.6–7 MKK/KAP verileri) (erişim: 15 Ekim 2026)
- [Borsa İstanbul — Veri Dağıtıcı Kuruluşlar](https://www.borsaistanbul.com/veriler/veri-yayini/veri-dagitici-kuruluslar) — yetkili yurt içi/yurt dışı dağıtıcı listesi (erişim: 15 Ekim 2026)
- [Borsa İstanbul — SSS: Veri Dağıtım ve Endeks Lisanslama](https://www.borsaistanbul.com/sss/veri-dagitim-ve-endeks-lisanslama) — alt dağıtıcılık, gösterimsiz kullanım, türetilmiş veri (erişim: 15 Ekim 2026)
- [Borsa İstanbul — Pay Piyasası Verileri](https://www.borsaistanbul.com/veriler/pay-piyasasi-verileri) — ücretsiz CSV dosyaları (erişim: 15 Ekim 2026)
- [Borsa İstanbul — Geçmişe Dönük Veri Satışı](https://www.borsaistanbul.com/veriler/gecmise-donuk-veri-satisi) ve [DataStore](https://datastore.borsaistanbul.com/) — tarihsel veri satışı (erişim: 15 Ekim 2026)
- [KAP](https://www.kap.org.tr/tr/) — bildirim sorgu, şirketler, beklenen bildirimler (erişim: 15 Ekim 2026)
- [MKK — KAP sayfası](https://www.mkk.com.tr/kurumsal-yonetim-hizmetleri/kap-kamuyu-aydinlatma-platformu) — dağıtım kanalları, KAP Veri Yayın Servisi (erişim: 15 Ekim 2026)
- [MKK Ürün ve Hizmet Kataloğu (PDF, 2026-10)](https://www.mkk.com.tr/sites/default/files/2026-10/MKK_Urun_ve_Hizmet_Katalogu.pdf) — KAP veri dağıtım kanalları, SPK/BIST/Takasbank'ın servis kullanıcısı olması (erişim: 15 Ekim 2026)
- [MKK — Online Entegrasyon Erişim Bilgileri](https://www.mkk.com.tr/online-entegrasyon-erisim-bilgileri) — MKK SOAP/REST ortamları, imzalama sertifikası (erişim: 15 Ekim 2026)
- [MKK API Portal](https://apiportal.mkk.com.tr/) — sözleşmeli kullanıcılar için API portalı (erişim: 15 Ekim 2026)

Üçüncü taraf:
- [yfinance (GitHub)](https://github.com/ranaroussi/yfinance) — Yahoo ile bağlantısızlık ve kişisel kullanım uyarısı (erişim: 15 Ekim 2026)
- [isyatirimhisse (libraries.io)](https://libraries.io/pypi/isyatirimhisse) — İş Yatırım sitesinden veri çeken resmî olmayan kütüphane (erişim: 15 Ekim 2026)
- [pykap (libraries.io)](https://libraries.io/pypi/pykap) — KAP sitesinden bildirim çeken kütüphane (erişim: 15 Ekim 2026)
- [AlgoLab Python sarmalayıcısı (GitHub)](https://github.com/atillayurtseven/AlgoLab) — AlgoLab API'nin 31.12.2025'te kapandığı notu (erişim: 15 Ekim 2026)
