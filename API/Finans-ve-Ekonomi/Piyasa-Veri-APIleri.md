# Piyasa Veri API'leri (Alpha Vantage, Twelve Data, Finnhub, Massive/Polygon, FMP, Yahoo Finance)

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (Yahoo Finance için resmî API yok; IEX Cloud kapandı)

## Özet

Bu sayfa hisse, endeks, döviz ve kripto fiyatı veren genel amaçlı **piyasa veri sağlayıcılarını** karşılaştırır. Hepsi API anahtarıyla çalışan REST servisleridir; ücretsiz katmanları test ve kişisel kullanım içindir, gerçek zamanlı veri ve WebSocket çoğunlukla ücretli plandadır. Odak çoğunlukla ABD borsalarıdır: **Borsa İstanbul (BIST) verisi ücretsiz katmanların hiçbirinde resmî olarak garanti edilmez** — Twelve Data BIST'i en az "Grow" (ücretli) planda listeler, Yahoo Finance (`.IS` son eki) yalnızca resmî olmayan yoldan erişilir. Polygon.io 30 Ekim 2025'te **Massive** adını aldı; IEX Cloud 31 Ağustos 2024'te kapandı.

### Hızlı karşılaştırma

| Sağlayıcı | Ücretsiz katman | En ucuz ücretli | WebSocket | BIST |
|---|---|---|---|---|
| Alpha Vantage | 25 istek/gün [RESMÎ] | 49,99 $/ay, 75 istek/dk [RESMÎ] | Belgede yok | Belgede yok (desteklenen son ekler arasında `.IST` geçmiyor) [RESMÎ – dokümanda yok] |
| Twelve Data | 8 istek/dk, 800/gün, 3 borsa [RESMÎ] | Grow 79 $/ay (yıllık ödemede ~%17 indirim) [RESMÎ] [ÇELİŞKİLİ: sayfa verisinde 29 $ da geçiyor] | Pro ve üstü; Basic'te 8 deneme kredisi [RESMÎ] | **Var**: `XIST`, en az Grow planı (iş planlarında "Venture") [RESMÎ – API yanıtı] |
| Finnhub | Var; ABD fiyatları ücretsiz, uluslararası mum (candle) verisi premium [RESMÎ]; dakikalık limit ~60 [3. TARAF] | Fiyat sayfası JS ile yükleniyor, doğrulanamadı | Var (`wss://ws.finnhub.io`), 1 anahtar = 1 bağlantı [RESMÎ] | BIST özelinde belgede açık ifade yok (borsa kodları ayrı bir tabloda, doğrulanmadı); uluslararası gerçek zamanlı fiyat yalnızca Enterprise, mum verisi premium [RESMÎ] |
| Massive (eski Polygon.io) | Basic: 5 istek/dk, gün sonu (EOD), 2 yıl geçmiş, WebSocket yok [RESMÎ] | Starter 29 $/ay (15 dk gecikmeli + WebSocket) [RESMÎ] | Starter ve üstü [RESMÎ] | **Yok** — yalnızca ABD hisseleri (+ opsiyon, vadeli, forex, kripto) [RESMÎ] |
| Financial Modeling Prep (FMP) | 250 çağrı/gün, gün sonu verisi, 500 MB/30 gün bant [RESMÎ] | Starter 29 $/ay (yıllık 19 $/ay), 300 çağrı/dk, yalnızca ABD [RESMÎ] | Var; tek seferlik User Declaration Form gerekir, hangi planda açık olduğu net değil [RESMÎ – sayfa metni] | "Global Coverage" yalnızca Ultimate (139 $/ay) planında; BIST özelinde belgede açık ifade yok [RESMÎ] |
| Yahoo Finance (yfinance) | Resmî API yok; ücretsiz ama ToS riski [RESMÎ – yfinance README] | — | yfinance `WebSocket` sınıfı (resmî olmayan) [3. TARAF] | `.IS` son ekiyle (`THYAO.IS`) erişilir [3. TARAF] |
| IEX Cloud | **Kapandı** (31 Ağustos 2024) [3. TARAF] | — | — | — |

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | Yalnızca `demo` anahtarlı örnek istekler (Alpha Vantage `apikey=demo`, Twelve Data `apikey=demo`); belirli sembollerle sınırlı. Twelve Data `/exchanges`, `/stocks` gibi katalog uç noktaları `demo` ile de yanıt veriyor | Ücretsiz; üretimde kullanılamaz [RESMÎ] |
| Geliştirici hesabı (ücretsiz anahtar) | E-posta ile kayıt → API anahtarı | Alpha Vantage: gün sonu verisi, `GLOBAL_QUOTE`, `SYMBOL_SEARCH`, `NEWS_SENTIMENT`; Twelve Data: ABD hisse/ETF, forex, kripto gerçek zamanlı; Finnhub: ABD `quote`, haberler (1 yıl), WebSocket işlem akışı; Massive: EOD + 2 yıl; FMP: EOD + profil/referans | AV 25/gün · TD 8/dk–800/gün · Massive 5/dk · FMP 250/gün [RESMÎ]; Finnhub ~60/dk [3. TARAF] |
| İşletme/uygulama onayı | Ticari kullanım, ekranda gösterme veya yeniden dağıtım | FMP: verinin gösterilmesi/dağıtılması için ayrı "Data Display and Licensing Agreement" gerekir [RESMÎ]; Massive: bireysel planlar "individual use" etiketli, ticari için ayrı "business pricing" [RESMÎ]; Twelve Data: iş planları ayrı (`plan_business`) [RESMÎ]; Alpha Vantage: gerçek zamanlı ABD verisi için borsa veri yetkilendirme (entitlement) süreci [RESMÎ] | Sözleşmeye bağlı |
| Ücretli/kurumsal | Abonelik | Gerçek zamanlı veri, WebSocket, uluslararası borsalar, uzun geçmiş, toplu (bulk) dosyalar | Aşağıda "Hız sınırları ve fiyatlar" |
| Resmî olmayan | Kütüphane (yfinance vb.) | Yahoo Finance'in web sitesinin kullandığı iç uç noktalar: fiyat, geçmiş, haber, arama, tarayıcı (screener) | Ücretsiz; Yahoo ToS'u kişisel kullanımla sınırlar, IP engeli/kırılma riski |

## Kimlik doğrulama

| Sağlayıcı | Yöntem |
|---|---|
| Alpha Vantage | Her istekte `apikey=<ANAHTAR>` sorgu parametresi. Taban: `https://www.alphavantage.co/query?function=...` [RESMÎ] |
| Twelve Data | `apikey` sorgu parametresi **veya** `Authorization: apikey <ANAHTAR>` başlığı (doküman başlığı öneriyor). Taban: `https://api.twelvedata.com` [RESMÎ] |
| Finnhub | `token=<ANAHTAR>` sorgu parametresi (veya `X-Finnhub-Token` başlığı [3. TARAF]). Taban: `https://finnhub.io/api/v1` [RESMÎ] |
| Massive | `?apiKey=<ANAHTAR>` veya `Authorization: Bearer <ANAHTAR>`. Taban: `https://api.massive.com` [RESMÎ]. Yeniden adlandırma duyurusuna göre eski `api.polygon.io` uç noktaları ve SDK'lar bir süre paralel çalışmaya devam ediyor [3. TARAF – basın bülteni] |
| FMP | `?apikey=<ANAHTAR>` veya `apikey: <ANAHTAR>` başlığı. Yeni taban: `https://financialmodelingprep.com/stable/...` [RESMÎ] |
| Yahoo (yfinance) | Anahtar yok; kütüphane çerez + "crumb" değerini kendisi alır [3. TARAF] |

Anahtarları koda gömme; ortam değişkeni veya .NET `user-secrets` kullan.

## Temel uç noktalar

Takip uygulaması için önemli olanlar. Tam liste için resmî referanslara bakın (Kaynaklar).

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | AV `query?function=GLOBAL_QUOTE&symbol=IBM` | Son fiyat/hacim | Ücretsiz | Varsayılan gün sonu; `entitlement=realtime` / `delayed` ücretli ABD verisi [RESMÎ] |
| GET | AV `function=TIME_SERIES_DAILY` | Günlük OHLCV | Ücretsiz (`outputsize=full` premium) | [RESMÎ] |
| GET | AV `function=TIME_SERIES_INTRADAY` | Gün içi mumlar | Premium | [RESMÎ] |
| GET | AV `function=NEWS_SENTIMENT&tickers=AAPL` | Haber + duygu skoru, sembol/konu filtresi | Ücretsiz | Takip için haber filtresi [RESMÎ] |
| GET | AV `function=TOP_GAINERS_LOSERS` | ABD'de en çok yükselen/düşen/işlem gören | Ücretsiz (gün sonu) | [RESMÎ] |
| GET | AV `function=SYMBOL_SEARCH&keywords=` | Sembol arama | Ücretsiz | Uluslararası son ekler: `.LON`, `.TRT`, `.DEX`, `.BSE`, `.SHH`, `.SHZ` [RESMÎ] |
| GET | AV `function=MARKET_STATUS` | Dünya borsalarının açık/kapalı durumu | Ücretsiz | [RESMÎ] |
| GET | TD `/quote?symbol=THYAO&mic_code=XIST` | Son fiyat, OHLC, değişim | 1 kredi/sembol | BIST için Grow+ [RESMÎ] |
| GET | TD `/price`, `/eod`, `/time_series` | Anlık fiyat, gün sonu, geçmiş bar | 1 kredi/sembol | [RESMÎ] |
| GET | TD `/stocks?exchange=XIST` | BIST sembol kataloğu | 1 kredi/istek | `demo` ile de listeleniyor (ör. `A1CAP`, para birimi TRY) [RESMÎ – API yanıtı] |
| GET | TD `/exchanges?country=Turkey&show_plan=true` | Borsa listesi + hangi planda açık | 1 kredi | BIST → `"plan":"Grow"` [RESMÎ] |
| GET | TD `/market_movers/{market}` (ör. `/market_movers/stocks?country=...`; market = stocks, etf, mutual_funds, forex, crypto) | Yükselen/düşenler | 100 kredi; yalnızca Pro (229 $/ay) ve üstü, iş planlarında Venture ve üstü | [RESMÎ] |
| GET | Finnhub `/quote?symbol=AAPL` | Gerçek zamanlı ABD fiyatı | Ücretsiz | "Sürekli sorgulama önerilmez, WebSocket kullanın"; uluslararası gerçek zamanlı yalnızca Enterprise [RESMÎ] |
| GET | Finnhub `/stock/candle` | OHLCV mumları | **Premium** | [RESMÎ] |
| GET | Finnhub `/company-news?symbol=&from=&to=` | Şirket haberleri | Ücretsiz (1 yıl geçmiş) | Yalnızca Kuzey Amerika şirketleri [RESMÎ] |
| GET | Finnhub `/news?category=general&minId=` | Genel piyasa haberleri; `minId` ile yalnızca yeni haberler | Ücretsiz | Takip için ideal artımlı sorgu [RESMÎ] |
| GET | Finnhub `/calendar/earnings` | Bilanço takvimi | Ücretsiz (1 ay geçmiş) | [RESMÎ] |
| GET | Finnhub `/stock/insider-transactions` | İçeriden işlemler | Ücretsiz (swagger'da premium işareti yok) | ABD, UK, Kanada, Avustralya, Hindistan, büyük AB pazarları; çağrı başına en çok 100 işlem [RESMÎ] |
| GET | Finnhub `/stock/symbol?exchange=` | Borsa sembolleri | Ücretsiz | Borsa kodları resmî Google Sheets listesinde [RESMÎ] |
| GET | Massive `/v2/aggs/ticker/{stocksTicker}/range/{multiplier}/{timespan}/{from}/{to}` | Mum (aggregate) verisi | Basic: EOD, 2 yıl | [RESMÎ] |
| GET | Massive `/v3/reference/dividends` | Temettüler | Basic | [RESMÎ] |
| GET | FMP `/stable/quote?symbol=AAPL` | Anlık fiyat | Ücretli planlarda (Basic'te "-") | [RESMÎ] |
| GET | FMP `/stable/historical-price-eod/full?symbol=` | Gün sonu geçmiş | Basic dahil | [RESMÎ] |
| GET | FMP `/stable/news/stock?symbols=AAPL`, `/stable/news/stock-latest` | Hisse haberleri | Ücretli (Starter+) | [RESMÎ] |
| GET | FMP `/stable/search-symbol?query=` | Sembol arama | Basic | "Birden çok küresel piyasada arama" [RESMÎ] |
| — | yfinance `Ticker("THYAO.IS").history()`, `.news`, `yf.download()` | Geçmiş fiyat, haber, toplu indirme | Resmî olmayan | [3. TARAF] |

## Gerçek zamanlı / bildirim

- **Webhook:** İncelenen sağlayıcıların hiçbirinin herkese açık dokümanında fiyat/haber webhook'u yok (Finnhub OpenAPI belgesinde `webhook` yolu bulunmuyor) [RESMÎ – belgede yok]. Takip için ya WebSocket ya da periyodik sorgu (polling) gerekir.
- **Finnhub WebSocket** `wss://ws.finnhub.io?token=...`: ABD (Full SIP), LSE, forex ve kripto işlemleri. `{"type":"subscribe","symbol":"AAPL"}` gönderilir. 1 API anahtarı aynı anda yalnızca 1 bağlantı açabilir. Haber akışı (news) WebSocket'i premium, basın bülteni akışı Enterprise [RESMÎ].
- **Massive WebSocket:** gecikmeli `wss://delayed.massive.com/stocks`, gerçek zamanlı `wss://socket.massive.com/stocks`. Önce `{"action":"auth","params":"ANAHTAR"}`, sonra `{"action":"subscribe","params":"AM.AAPL,AM.MSFT"}` (dakikalık barlar). Varlık sınıfı başına varsayılan 1 eşzamanlı bağlantı; yavaş okuyan istemci bağlantıdan düşürülebilir. Basic planda yok, Starter'dan itibaren [RESMÎ].
- **Twelve Data WebSocket** `wss://ws.twelvedata.com`: WebSocket kredisi Pro (≈1.500) ve Ultra (≈10.000) planlarda; Basic/Grow'da yalnızca 8 deneme kredisi [RESMÎ] [ÇELİŞKİLİ: aynı sayfada 500+/2.500+ değerleri de geçiyor].
- **Alpha Vantage:** WebSocket belgede yok; gerçek zamanlı ABD verisi REST + `entitlement=realtime` ile ücretli. Resmî MCP sunucusu var: `https://mcp.alphavantage.co/` [RESMÎ].
- **FMP:** WebSocket (gerçek zamanlı akış) var; erişim için tek seferlik "User Declaration Form" doldurulması gerekiyor. Hangi planda açık olduğu fiyat sayfasında net değil, satış ekibiyle doğrulanmalı [RESMÎ – sayfa metni].
- **Yahoo:** yfinance `WebSocket` / `AsyncWebSocket` sınıflarıyla Yahoo'nun web sitesinin kullandığı akışa bağlanır [3. TARAF]; resmî olmadığı için her an bozulabilir.
- **RSS:** Bu API'lerin hiçbiri RSS sunmuyor (belgede yok). Haber takibi için ayrıca Haber kategorisindeki kaynaklara bakılabilir.

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| ABD hissesinde fiyat eşiği aşıldı | Evet | Finnhub WebSocket işlem akışı → uygulama içinde eşik kontrolü | Ücretsiz | 1 bağlantı/anahtar; sembol sayısı sınırı plana bağlı [3. TARAF] |
| BIST hissesinde fiyat eşiği | Kısmen | Twelve Data `/quote` periyodik sorgu (Grow+), ya da yfinance `.IS` polling | Ücretli veya resmî olmayan | BIST verisinin gecikmeli olup olmadığı belgede açık değil; BIST lisans kuralları gereği çoğu sağlayıcıda 15 dk gecikmeli [TAHMİN] |
| Şirket hakkında yeni haber | Evet | Finnhub `/company-news` (Kuzey Amerika) veya `/news?minId=` artımlı sorgu; AV `NEWS_SENTIMENT&tickers=` | Ücretsiz | Finnhub haber WebSocket'i premium |
| Haber anahtar kelime/duygu filtresi | Evet | AV `NEWS_SENTIMENT` (`topics`, `tickers`, duygu skoru) | Ücretsiz (25/gün) | Kota düşük; filtreyi kendi tarafında da uygula |
| Bilanço/temettü tarihi yaklaştı | Evet | Finnhub `/calendar/earnings`, Massive temettü, FMP takvimleri | Ücretsiz/ücretli | Günlük bir kez sorgulamak yeterli |
| Günün en çok yükselen/düşenleri | Evet | AV `TOP_GAINERS_LOSERS`, TD `/market_movers/{market}` | Ücretsiz (AV, ABD) / Pro+ ve 100 kredi (TD) | |
| Borsa açıldı/kapandı | Evet | AV `MARKET_STATUS`, Finnhub `/stock/market-status` | Ücretsiz | |
| İçeriden alım-satım (insider) | Evet | Finnhub `/stock/insider-transactions` | Ücretsiz (swagger'da premium işareti yok) | ABD/AB ağırlıklı; KAP bildirimleri için bu API'ler uygun değil |
| BIST şirket bildirimleri (KAP) | Hayır | Bu sağlayıcılarda yok | — | KAP için ayrı araştırma gerekir |

**Mimari önerisi [TAHMİN]:** Ücretsiz kotalar çok düşük olduğu için (AV 25/gün, Massive 5/dk) takip uygulaması tek sağlayıcıya bağlanmamalı; "sağlayıcı soyutlaması" (interface) + önbellek + kota sayacı kurulmalı. ABD gerçek zamanlı için Finnhub WebSocket, BIST için Twelve Data (ücretli) veya geliştirme aşamasında yfinance tercih edilebilir.

## Hız sınırları ve fiyatlar

Fiyatlar 15 Ekim 2026'da resmî sayfalardan okunmuştur; değişebilir.

**Alpha Vantage** [RESMÎ]: Ücretsiz 25 istek/gün. Premium: 75/dk 49,99 $, 150/dk 99,99 $, 300/dk 149,99 $, 600/dk 199,99 $, 1200/dk 249,99 $ (aylık). Sayfada ayrıca 499–2.499 $ aralığında ikinci bir fiyat seti var; neyi ayırdığı sayfada açık değil [ÇELİŞKİLİ]. Premium planlarda günlük limit yok.

**Twelve Data** [RESMÎ]: Basic 0 $ — 8/dk, 800/gün, 3 borsa. Grow 79 $/ay — 377 kredi/dk (tablo: 55+), 20+ borsa, günlük limit yok. Pro 229 $/ay — 1.597 kredi/dk, 70+ borsa, WebSocket. Ultra 999 $/ay — 10.946 kredi/dk, 80+ borsa. Yıllık ödemede ~%17 indirim. Sayfanın yapılandırılmış verisinde farklı fiyatlar (Grow 29 $, Pro 99 $, Ultra 329 $) da geçiyor [ÇELİŞKİLİ] — satın almadan önce sayfadan doğrula.

**Finnhub** [RESMÎ]: Tüm planlarda ek olarak **30 çağrı/saniye** üst sınırı; aşılınca HTTP 429. Ücretsiz plan dakika limiti ~60 çağrı [3. TARAF]; resmî fiyat sayfası JavaScript ile yüklendiği için doğrulanamadı.

**Massive (Polygon)** [RESMÎ]: Basic 0 $ (5/dk, 2 yıl, EOD) · Starter 29 $ (sınırsız, 5 yıl, 15 dk gecikmeli, WebSocket, flat files) · Developer 79 $ (10 yıl, işlemler/trades) · Advanced 199 $ (20+ yıl, gerçek zamanlı, kotasyonlar, Financials). Yıllık ödemede %20 indirim. Bunlar hisse senedi planlarıdır; opsiyon/forex/kripto ayrı fiyatlandırılır.

**FMP** [RESMÎ]: Basic 0 $ (250/gün, 500 MB/30 gün) · Starter 29 $ (yıllık 19 $; 300/dk, ABD, 5 yıl, 20 GB) · Premium 69 $ (yıllık 49 $; 750/dk, +UK ve Kanada, 30 yıl, 50 GB) · Ultimate 139 $ (yıllık 99 $; 3.000/dk, **küresel kapsam**, 150 GB). Verinin gösterilmesi/dağıtılması ayrı lisans gerektirir.

## Resmî olmayan yollar ve riskler

- **yfinance** (Python, sürüm 1.7.0, 26 Ağustos 2026) [3. TARAF – PyPI]: Yahoo Finance'in web sitesinin kullandığı herkese açık iç uç noktaları çağırır. README'ye göre "Yahoo, Inc. ile bağlantılı değildir, onaylanmamıştır"; Yahoo! Finance API'si **yalnızca kişisel kullanım** içindir ve indirilen veri üzerindeki haklar Yahoo kullanım koşullarına tabidir [RESMÎ – yfinance README]. Özellikler: `Ticker`, `download`, `Market`, `WebSocket`/`AsyncWebSocket`, `Search` (haber dahil), `Sector`/`Industry`, `Screener`.
  - **Riskler:** Yahoo istek sayısını sınırlayıp IP'yi geçici engelleyebilir (`429 Too Many Requests` raporları yaygın) [3. TARAF]; Yahoo iç API'yi değiştirince kütüphane bozulur; ticari üründe kullanmak ToS ihlali sayılabilir. Yayınlanacak/satılacak bir takip uygulamasında **birincil kaynak yapılmamalı**.
  - BIST sembolleri `.IS` son ekiyle sorgulanır (`THYAO.IS`, endeks `XU100.IS`) [3. TARAF].
- **.NET tarafı:** `YahooFinanceApi` (NuGet, ~190 bin indirme) aynı resmî olmayan uç noktaları kullanır; aynı riskler geçerlidir [3. TARAF].
- **Sayfa kazıma (scraping):** Yatırım siteleri genellikle kazımayı ToS ile yasaklar; ayrıca borsa verisinin yeniden dağıtımı borsanın lisans kurallarına tabidir [TAHMİN – genel bilgi].
- **IEX Cloud:** API ürünleri **31 Ağustos 2024'te kapandı**; IEX ana borsa faaliyetine odaklandı [3. TARAF – iexcloud.org arşiv sayfası]. Eski eğitimlerdeki IEX Cloud örnekleri artık çalışmaz; yerine Alpha Vantage, Massive, Twelve Data veya FMP kullanılmalıdır.

## SDK ve kütüphaneler

| Sağlayıcı | Resmî | Topluluk (.NET dahil) |
|---|---|---|
| Alpha Vantage | Resmî SDK yok; dokümanda Python, Node.js, PHP, **C#** örnek kodu var. Resmî MCP sunucusu `mcp.alphavantage.co` [RESMÎ] | NuGet: `AlphaVantage.Net.Core`, `StockSharp.AlphaVantage`; Python: `alpha_vantage` [3. TARAF] |
| Twelve Data | Python `twelvedata` (GitHub `twelvedata/twelvedata-python`) [3. TARAF – resmî depo olduğu biliniyor] | .NET için yaygın topluluk paketi bulunamadı (NuGet aramasında öne çıkan yok) |
| Finnhub | `finnhub-python` ve diğer dillerde resmî istemciler (GitHub `Finnhub-Stock-API`) [RESMÎ] | NuGet: `ThreeFourteen.Finnhub.Client`, `Finnhub` [3. TARAF] |
| Massive | Python, Go, Kotlin (JVM), JavaScript resmî istemciler; MCP sunucusu [RESMÎ] | NuGet: `Polygon.Client`, `Polygon` (eski Polygon.io adıyla) [3. TARAF] |
| FMP | Excel/Google Sheets eklentisi [RESMÎ] | Python `fmpsdk` [3. TARAF] |
| Yahoo | Yok | Python `yfinance`; NuGet `YahooFinanceApi`, `StockSharp.Yahoo` [3. TARAF] |

.NET'te hepsi düz `HttpClient` + `System.Text.Json` ile kolayca kullanılabilir; WebSocket için `System.Net.WebSockets.ClientWebSocket`.

## Postman / OpenAPI / koleksiyonlar

- **Finnhub:** Tam OpenAPI (Swagger) belgesi — `https://finnhub.io/static/swagger.json` [RESMÎ]. Hangi uç noktanın premium olduğu ve ücretsiz katman sınırları (`freeTier`) bu dosyada yazıyor.
- **Massive:** Dokümanda REST, WebSocket ve Flat Files quickstart'ları; OpenAPI dosyası bu araştırmada doğrulanmadı.
- **Twelve Data, Alpha Vantage, FMP:** Resmî OpenAPI/Postman koleksiyonu bu araştırmada bulunamadı (belgede yok). FMP'nin "API Viewer" adlı tarayıcı içi deneme aracı var [RESMÎ].

## Depoda ilgili sayfalar

- [TCMB EVDS](TCMB-EVDS.md) — Türkiye döviz kuru, faiz ve makroekonomik seriler (resmî, ücretsiz).
- [Binance](../Kripto-Borsalari/Binance.md) — kripto fiyatları için ücretsiz WebSocket akışı.
- [Coinbase](../Kripto-Borsalari/Coinbase.md), [OKX](../Kripto-Borsalari/OKX.md), [Bybit ve Kraken](../Kripto-Borsalari/Bybit-ve-Kraken.md) — diğer kripto borsası API'leri.
- [X (Twitter)](../Sosyal-Medya/X-Twitter.md) — finans haberlerinin sosyal medyadan takibi için.

## Kaynaklar

Resmî:
- https://www.alphavantage.co/documentation/ — Alpha Vantage API dokümanı (uç noktalar, `entitlement`, uluslararası son ekler, MCP) — (erişim: 15 Ekim 2026)
- https://www.alphavantage.co/premium/ — Alpha Vantage ücretsiz/premium limitler ve fiyatlar — (erişim: 15 Ekim 2026)
- https://twelvedata.com/pricing — Twelve Data plan ve kredi tablosu — (erişim: 15 Ekim 2026)
- https://twelvedata.com/docs — Twelve Data REST/WebSocket dokümanı, kredi maliyetleri, `/market_movers/{market}` plan şartı (Pro/Venture ve üstü) — (erişim: 15 Ekim 2026)
- https://api.twelvedata.com/exchanges?country=Turkey&show_plan=true — BIST'in hangi planda açık olduğunu gösteren canlı API yanıtı — (erişim: 15 Ekim 2026)
- https://finnhub.io/docs/api — Finnhub API dokümanı — (erişim: 15 Ekim 2026)
- https://finnhub.io/static/swagger.json — Finnhub OpenAPI belgesi (premium/ücretsiz işaretleri, `/stock/insider-transactions` premium değil, 30 çağrı/sn sınırı, WebSocket) — (erişim: 15 Ekim 2026)
- https://github.com/Finnhub-Stock-API/finnhub-python — Finnhub resmî Python istemcisi — (erişim: 15 Ekim 2026)
- https://massive.com/pricing — Massive (eski Polygon.io) hisse planları — (erişim: 15 Ekim 2026)
- https://massive.com/docs/rest/quickstart — Massive REST kimlik doğrulama ve istemci kütüphaneleri — (erişim: 15 Ekim 2026)
- https://massive.com/docs/rest/stocks/aggregates/custom-bars — Massive mum (aggregate) uç noktası `/v2/aggs/ticker/{stocksTicker}/range/...` — (erişim: 15 Ekim 2026)
- https://massive.com/docs/websocket/quickstart — Massive WebSocket adresleri ve bağlantı sınırı — (erişim: 15 Ekim 2026)
- https://site.financialmodelingprep.com/pricing-plans — FMP planları, çağrı ve bant genişliği limitleri, WebSocket erişimi için User Declaration Form metni — (erişim: 15 Ekim 2026)
- https://site.financialmodelingprep.com/developer/docs — FMP `stable` API dokümanı — (erişim: 15 Ekim 2026)

Üçüncü taraf:
- https://www.einpresswire.com/article/863823068/polygon-io-is-now-massive — Polygon.io'nun Massive adını aldığına dair basın bülteni (30 Ekim 2025) — (erişim: 15 Ekim 2026)
- https://github.com/ranaroussi/yfinance — yfinance deposu ve hukuki uyarı metni — (erişim: 15 Ekim 2026)
- https://pypi.org/project/yfinance/ — yfinance güncel sürüm bilgisi — (erişim: 15 Ekim 2026)
- https://iexcloud.org/ — IEX Cloud'un 31 Ağustos 2024'te kapandığını belirten arşiv/bilgi sayfası (resmî IEX sitesi değil) — (erişim: 15 Ekim 2026)
- https://www.nuget.org/ — .NET paket adları ve indirme sayıları — (erişim: 15 Ekim 2026)

> Not: Finnhub ücretsiz plan dakika limiti (~60) resmî kaynaktan doğrulanamadı (swagger.json yalnızca 30 çağrı/sn genel sınırını veriyor); rakam [3. TARAF] olarak bırakıldı, https://finnhub.io/pricing tarayıcıda açılarak elle doğrulanmalı.
