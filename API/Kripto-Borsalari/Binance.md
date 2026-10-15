# Binance API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (Binance global ve Binance TR ayrı API'ler)

## Özet

Binance; Spot, Margin, USDⓈ-M / COIN-M Futures, cüzdan (`/sapi`) ve duyuru (CMS) için **resmî ve ücretsiz** REST, WebSocket API, WebSocket Streams, FIX ve SBE (ikili) arayüzleri sunar. [RESMÎ] Piyasa verisi (fiyat, emir defteri, mum) kimliksiz alınabilir; hesap/emir işlemleri için Binance hesabında kimlik doğrulaması (KYC) tamamlanmış hesapla API anahtarı oluşturmak gerekir. [RESMÎ] API kullanımının ayrı bir ücreti yoktur; ücret yalnızca işlem komisyonudur, sınırlar **ağırlık (weight)** ve emir sayısı üzerinden uygulanır. [RESMÎ] Türkiye'deki **Binance TR** ayrı bir platformdur; uç noktaları, sembol biçimi (`BTC_TRY`) ve yanıt yapısı globalden farklıdır. [RESMÎ] Takip uygulaması açısından en değerli parça: resmî **duyuru WebSocket'i** (`com_announcement_en`) ile yeni listeleme/delist duyurularının anlık alınabilmesi. [RESMÎ]

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey (security type `NONE`) | Spot/Futures piyasa verisi: fiyat, emir defteri, işlemler, mum, 24s istatistik; tüm market WebSocket stream'leri; `data-api.binance.vision` (yalnızca public veri) | Ücretsiz; IP başına weight sınırı (Spot 6000/dk, Futures 2400/dk — 15.10.2026 canlı `exchangeInfo`) [RESMÎ] |
| Geliştirici (API anahtarı) | KYC'li Binance hesabı, 2FA, Spot cüzdanına herhangi bir tutarda yatırma ile hesabın aktif olması, API Management'tan anahtar [RESMÎ] | `USER_DATA` (bakiye, emir geçmişi), `TRADE` (emir), `USER_STREAM` (kullanıcı veri akışı), duyuru WebSocket'i (imzalı bağlantı) | Ücretsiz; IP kısıtı olmayan sistem (HMAC) anahtarı **yalnızca okuma** izni alabilir [RESMÎ] |
| Test ortamları | Spot Testnet: GitHub hesabıyla giriş; Demo Mode: Binance hesabından demo anahtarı; Futures Demo | Sahte bakiye ile emir/akış testi | Ücretsiz; Testnet bakiyesi aylık sıfırlanır, Demo arayüzden sıfırlanabilir [RESMÎ] |
| İşletme / onay | Broker, Link (OAuth/Binance Connect), Market Maker, VIP programları — başvuru ve sözleşme | Alt hesap yönetimi, komisyon iadesi, daha yüksek emir limitleri | Bu çalışmada program koşulları okunmadı — "belgede incelenmedi". Takip için gerekmez [TAHMİN] |
| Ücretli / kurumsal | VIP seviyesi (işlem hacmi/BNB bakiyesi), kurumsal hesap | Düşük komisyon; bazı programlarda yüksek emir limiti | API'nin kendisi ücretsiz; VIP koşulları bu çalışmada doğrulanmadı [TAHMİN] |
| Resmî olmayan | Web sitesinin iç uç noktaları (`/bapi/...`), HTML kazıma | Duyuru listesi (geçmiş), Binance Square içerikleri, web arayüzündeki ek veriler | Belgesiz; her an değişebilir, WAF (403) ve IP engeli riski [3. TARAF / kendi testimiz] |

## Kimlik doğrulama

- **Başlık:** API anahtarı `X-MBX-APIKEY` başlığında gönderilir. [RESMÎ]
- **Security type'lar (Spot):** `NONE` (public), `TRADE` (emir verme/iptal; API Management'ta açılmalı), `USER_DATA` (özel hesap verisi), `USER_STREAM` (kullanıcı veri akışı aboneliği). `SIGNED` uç noktalar `signature` parametresi ister. [RESMÎ]
- **İmza türleri:** [RESMÎ]
  - **HMAC SHA256** (sistemin ürettiği anahtar + secret; imza büyük/küçük harf duyarsız).
  - **RSA** (PKCS#8; kendi ürettiğin anahtar çiftinin public key'i Binance'e verilir).
  - **Ed25519** (kendi ürettiğin; performans ve güvenlik için **önerilen** tür). WebSocket API'de `session.logon` yalnızca Ed25519 ile çalışır.
- **`timestamp` ve `recvWindow`:** İmzalı isteklerde `timestamp` (ms veya µs) zorunlu; `recvWindow` varsayılan 5000 ms, en fazla 60000 ms. 5000 veya altı önerilir. [RESMÎ]
- **Yüzde kodlama:** 2026-01-15 civarından itibaren REST'te imzalanacak yük **imzalamadan önce percent-encode** edilmelidir; aksi hâlde `-1022 INVALID_SIGNATURE`. [RESMÎ — Spot CHANGELOG 2025-12-17]
- **API anahtarı izinleri** (API Management): Okuma (Enable Reading), Spot & Margin Trading, Futures, Withdrawals (çekim) vb. [RESMÎ]
  - IP kısıtı olmayan **HMAC** anahtarı yalnızca okuma alabilir (30.01.2023'ten beri). Okuma dışı izin için: IP kısıtı (yalnızca IPv4) **veya** kendi ürettiğin (RSA/Ed25519) anahtar **veya** varsayılan güvenlik kontrollerini kapatmak gerekir. [RESMÎ]
  - Çekim izni IP kısıtı ister. [RESMÎ]
  - Futures hesabı açılmadan önce oluşturulan anahtara Futures izni verilemez. [RESMÎ]
  - Anahtarın mevcut izinleri: `GET /sapi/v1/account/apiRestrictions` (USER_DATA). [RESMÎ — referansta]
- **Takip için öneri:** Yalnızca okuma izni olan, IP kısıtlı ayrı bir anahtar; secret'i koda/depoya yazma (ortam değişkeni / secret store). [TAHMİN — genel güvenlik pratiği]

## Temel uç noktalar

**Base URL'ler** [RESMÎ]:
- Spot REST: `https://api.binance.com` (alternatif: `api-gcp.binance.com`, `api1`–`api4.binance.com` — daha hızlı ama daha az kararlı). Yalnızca public veri: `https://data-api.binance.vision`.
- Spot WebSocket API: `wss://ws-api.binance.com:443/ws-api/v3` (9443 de olur).
- Spot Streams: `wss://stream.binance.com:9443` (443 de olur).
- USDⓈ-M Futures REST: `https://fapi.binance.com` · Streams: `wss://fstream.binance.com` + `/public`, `/market`, `/private` yönlendirmesi (eski yollar 23.04.2026'da kapatıldı). COIN-M: `dapi` / `dstream`.
- Duyuru (CMS) WebSocket: `wss://api.binance.com/sapi/wss`.

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/api/v3/ping`, `/api/v3/time` | Bağlantı testi, sunucu saati | Public | `timestamp` senkronu için saat kullan [RESMÎ] |
| GET | `/api/v3/exchangeInfo` | Semboller, filtreler, **güncel rate limit'ler** (`rateLimits`) | Public | Limit değerlerinin asıl kaynağı [RESMÎ] |
| GET | `/api/v3/ticker/price`, `/api/v3/ticker/24hr`, `/api/v3/ticker/bookTicker` | Son fiyat, 24 saatlik istatistik, en iyi alış/satış | Public | Çok sembollü çağrı daha ağır [RESMÎ] |
| GET | `/api/v3/depth`, `/api/v3/trades`, `/api/v3/aggTrades`, `/api/v3/klines`, `/api/v3/avgPrice` | Emir defteri, işlemler, mum, ortalama fiyat | Public | Weight değerleri referansta |
| POST / DELETE | `/api/v3/order` (+ `/api/v3/order/test`) | Emir ver / iptal et (test: eşleşmeye gitmez) | TRADE | 02.04.2026'dan beri başarılı emir/iptal çağrılarının IP weight'i **0**; başarısız olanlar sayılır [RESMÎ] |
| GET | `/api/v3/openOrders`, `/api/v3/allOrders`, `/api/v3/myTrades` | Açık emirler, emir ve işlem geçmişi | USER_DATA | |
| GET | `/api/v3/account` | Bakiyeler, komisyon, izinler | USER_DATA | |
| GET | `/api/v3/rateLimit/order` | Hesabın emir sayacı kullanımı | USER_DATA | [RESMÎ] |
| GET | `/sapi/v1/capital/deposit/hisrec`, `/sapi/v1/capital/withdraw/history` | Yatırma/çekim geçmişi | USER_DATA | Wallet bölümü [RESMÎ — referansta] |
| GET | `/fapi/v1/exchangeInfo`, `/fapi/v1/klines`, `/fapi/v1/depth` | Futures sembol/limit, mum, defter | Public | |
| GET | `/fapi/v1/premiumIndex`, `/fapi/v1/fundingRate`, `/fapi/v1/openInterest` | Mark price, fonlama oranı, açık pozisyon | Public | Takip için kritik metrikler [RESMÎ — referansta] |
| GET | `/futures/data/openInterestHist`, `/futures/data/topLongShortAccountRatio`, `/futures/data/takerlongshortRatio` | Açık pozisyon geçmişi, long/short oranları | Public | "Market Data" bölümü [RESMÎ — referansta] |
| GET | `/fapi/v1/historicalTrades` | Eski işlemler | Public (API key) | Weight 20→**200** (29.07.2026), geçmiş 1 ay (19.03.2026) [RESMÎ] |
| POST / PUT / DELETE | `/fapi/v1/listenKey` | Futures kullanıcı akışı aç / uzat / kapat | USER_STREAM | 60 dk keepalive yoksa kapanır; weight 1 [RESMÎ] |
| GET | `/fapi/v3/account`, `/fapi/v3/positionRisk` | Futures bakiye ve pozisyonlar | USER_DATA | |

Tam liste: [Spot REST referansı](https://developers.binance.com/en/docs/products/spot/rest-api), [USDⓈ-M Futures referansı](https://developers.binance.com/docs/derivatives/usds-margined-futures/general-info).

## Gerçek zamanlı / bildirim

Binance'te **webhook yoktur** (belgede bulunamadı); gerçek zamanlı veri WebSocket ile alınır. [RESMÎ — dokümanda webhook bölümü yok]

### Spot WebSocket Streams (piyasa verisi, kimliksiz) [RESMÎ]
- Tek akış: `wss://stream.binance.com:9443/ws/<stream>` · Birleşik: `/stream?streams=a/b` · Bağlandıktan sonra `{"method":"SUBSCRIBE","params":[...],"id":1}`.
- Stream'ler: `<symbol>@trade`, `@aggTrade`, `@kline_<interval>`, `@ticker`, `@ticker_<1h|4h|1d>`, `@miniTicker`, `!miniTicker@arr`, `!ticker_<window>@arr`, `@bookTicker`, `@depth@100ms|1000ms`, `@depth<5|10|20>`, `@avgPrice`, `@referencePrice`, `@blockTrade` (Mayıs 2026'dan itibaren).
- **Kapatılanlar:** Eski tüm market stream'i `!ticker@arr` 2025-11-14'te deprecated edildi ve **26.03.2026**'da kapatıldı; eski örnek kod/kütüphanelerde görülse de artık veri gelmez → yerine `!miniTicker@arr` veya `!ticker_<1h|4h|1d>@arr` (ya da `<symbol>@ticker`). Eski `/api/v1` REST uç noktaları (ör. `GET /api/v1/trades`, `/api/v1/klines`, `/api/v1/userDataStream`) **25.03.2026**'da kaldırıldı; `/api/v3` kullanılmalı. [RESMÎ — Spot CHANGELOG 2025-11-14, 2026-02-24, 2026-03-09]
- Kurallar: bağlantı **24 saat** geçerli; sunucu **20 sn**'de bir ping atar, **1 dk** içinde pong gelmezse koparır; bağlantı başına **5 gelen mesaj/sn**; bağlantı başına en fazla **1024 stream**; IP başına **5 dakikada 300 bağlantı denemesi**. Mikrosaniye zaman için `timeUnit=MICROSECOND`.
- 2026'da sunucu, kapatmadan 10 dk önce `serverShutdown` olayı gönderir → yeni bağlantı aç. [RESMÎ — CHANGELOG]

### Spot WebSocket API (istek/yanıt + kullanıcı akışı) [RESMÎ]
- `wss://ws-api.binance.com:443/ws-api/v3`; 24 saat, 20 sn ping / 1 dk pong; bağlanmak 2 weight; weight IP başına tüm bağlantılarda ortak.
- **listenKey dönemi bitti:** `POST/PUT/DELETE /api/v3/userDataStream` ve karşılık gelen WS metotları **20.02.2026 07:00 UTC**'de kapatıldı. Kullanıcı verisi artık WebSocket API üzerinden abone olunarak alınır: `userDataStream.subscribe` (oturum `session.logon` ile, Ed25519) veya `userDataStream.subscribe.signature` (her anahtar türüyle, logon gerektirmez). Bir bağlantıda birden çok abonelik olabilir (`session.subscriptions`). [RESMÎ — CHANGELOG 2026-01-21, 2025-08-12]
- Olaylar: `outboundAccountPosition` (bakiye değişimi), `balanceUpdate` (yatırma/çekim/transfer), `executionReport` (emir güncellemesi), `listStatus`, `externalLockUpdate`, `eventStreamTerminated`. [RESMÎ]

### USDⓈ-M Futures Streams [RESMÎ]
- `wss://fstream.binance.com` + **`/public`** (yüksek frekanslı: `@depth`, `@bookTicker`…), **`/market`** (normal piyasa verisi: `@markPrice`…), **`/private`** (kullanıcı verisi). Yönlendirmesiz bağlantı yalnızca Public stream'leri alır. Hangi stream'in hangi yolda olduğu her stream sayfasında yazar.
- 24 saat; sunucu **3 dk**'da bir ping, **10 dk** pong bekler; **10 gelen mesaj/sn**; bağlantı başına **1024 stream** (Temmuz 2025'te 200'den yükseltildi).
- Takip için önemli stream'ler: `<symbol>@markPrice` / `!markPrice@arr` (mark price + fonlama; `/market` yolu), `!forceOrder@arr` (likidasyonlar; `/market` yolu, sembol başına 1 sn'de yalnızca son likidasyon — snapshot), `@kline_<i>`, `@aggTrade`, `!bookTicker`. [RESMÎ — referansta stream adları; yol eşleşmesi stream sayfasında]
- Kullanıcı akışı: Futures'ta **listenKey hâlâ geçerli** (`/fapi/v1/listenKey`, 60 dk) [RESMÎ]; olaylar `ACCOUNT_UPDATE`, `ORDER_TRADE_UPDATE`, `ALGO_UPDATE`, `MARGIN_CALL`, `listenKeyExpired` [3. TARAF / önceki doküman bilgisi — bu çalışmada okunan sayfa olay listesini vermedi].

### Duyuru (CMS) WebSocket — takip için en önemli kaynak [RESMÎ]
- `wss://api.binance.com/sapi/wss?random=...&topic=com_announcement_en&recvWindow=...&timestamp=...&signature=...`, başlıkta `X-MBX-APIKEY`. İmza: parametreler alfabetik sıralanıp HMAC SHA256 (secret ile).
- Abonelik mesajı: `{"command":"SUBSCRIBE","value":"com_announcement_en"}`; birden çok topic `|` ile.
- Gelen veri: `type:"DATA"`, `data` alanı **kaçışlı JSON string** → `catalogId`, `catalogName` (ör. "Delisting", "New Cryptocurrency Listing"), `publishDate`, `title`, `body`, `disclaimer`.
- Kurallar: istemci **30 sn**'de bir PING göndermeli (1 dk PING gelmezse kopar), **5 mesaj/sn**, bağlantı **24 saat**. Dil: belgede yalnızca İngilizce (`en`).

### Diğer
- RSS: Binance duyuruları için **resmî RSS belgede yok**; `/en/support/announcement/rss` gibi bir adres 15.10.2026'da HTTP 202 döndürdü ama içerik vermedi (kendi testimiz). [ÇELİŞKİLİ / kullanılamaz kabul et]
- FIX ve SBE: düşük gecikmeli emir ve piyasa verisi için; takip uygulamasında gerekmez. SBE 3:2 şeması 25.09.2026'da emekliye ayrıldı, güncel şema 3:5. [RESMÎ — CHANGELOG]

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Yeni coin listeleme / delist / bakım duyurusu | Evet | Duyuru WebSocket `com_announcement_en`; `catalogName` + `title` ile filtrele | API anahtarı (imzalı bağlantı) | En hızlı resmî yol [RESMÎ]. Geçmiş duyuru listesi için resmî REST yok → resmî olmayan `/bapi` (aşağıda) |
| Yeni işlem çifti eklendi / sembol durumu değişti | Evet | `exchangeInfo`'yu periyodik yokla, önceki listeyle fark al (`status`: `TRADING`, `BREAK`, `CANCEL_ONLY`…) | Public | `CANCEL_ONLY` durumu 2026'da eklendi [RESMÎ] |
| Fiyat eşiği / ani hareket (ör. %5 düşüş) | Evet | `!miniTicker@arr` veya `!ticker_1h@arr` stream'i + kendi kural motorun | Public | Tek bağlantıda tüm market; REST'e göre weight harcamaz [RESMÎ] |
| Büyük işlem (whale) / blok işlem | Kısmen | `<symbol>@aggTrade` + miktar filtresi; `@blockTrade` | Public | Kimin yaptığı görünmez (anonim) [RESMÎ] |
| Likidasyonlar | Kısmen | Futures `!forceOrder@arr` — `wss://fstream.binance.com/market/ws/!forceOrder@arr` | Public (kimliksiz; `/market` yolu) | Sembol başına 1000 ms içinde yalnızca **son** likidasyon emri snapshot olarak gönderilir; aynı penceredeki diğerleri düşer → tüm likidasyonların tam listesi değildir. Yönlendirmesiz bağlantı bu stream'i almaz [RESMÎ] |
| Fonlama oranı / açık pozisyon değişimi | Evet | `@markPrice` stream'i (`wss://fstream.binance.com/market/ws/<symbol>@markPrice`); `openInterest` / `openInterestHist` REST yoklama | Public | Açık pozisyon için stream yok, yoklama gerekir [TAHMİN — referansta stream bulunamadı] |
| Kendi emir dolumu / bakiye değişimi / yatırma | Evet | Spot: WebSocket API `userDataStream.subscribe.signature`; Futures: listenKey | API anahtarı (okuma yeterli) | Spot listenKey 20.02.2026'da kapandı [RESMÎ] |
| Belirli bir kişinin/hesabın işlemleri | Hayır | — | — | Başka hesabın verisi API'de yok. Copy Trading lider portföyleri yalnızca web arayüzünde [TAHMİN] |
| Binance Square gönderileri (kişi/proje paylaşımları) | Resmî olarak hayır | Belgede okuma API'si bulunamadı; yalnızca web iç uç noktaları/kazıma | Resmî olmayan | ToS riski [TAHMİN] |
| Binance'in sosyal medya paylaşımları (X, Telegram kanalı) | Dolaylı | İlgili platformun API'si | O platforma bağlı | Bkz. [X](../Sosyal-Medya/X-Twitter.md), [Telegram](../Mesajlasma/Telegram.md) |
| Anahtar kelime filtresi | Evet (istemci tarafında) | Duyuru `title`/`body` içinde arama; sunucu tarafı filtre yok | — | `catalogId` ile kategori filtrelemek en sağlamı [RESMÎ alanlar, filtre bizim] |

## Hız sınırları ve fiyatlar

API ücretsizdir; ödenen tek şey işlem komisyonudur. [RESMÎ]

**15.10.2026 canlı `exchangeInfo` değerleri** (kendi sorgumuz; asıl kaynak her zaman bu uç noktadır): [RESMÎ]

| API | Tür | Sınır | Kapsam |
|---|---|---|---|
| Spot | `REQUEST_WEIGHT` | 6000 / 1 dk | IP |
| Spot | `RAW_REQUESTS` | 300.000 / 5 dk | IP (02.04.2026'da yükseltildi) |
| Spot | `ORDERS` | 100 / 10 sn; 200.000 / gün | Hesap |
| USDⓈ-M Futures | `REQUEST_WEIGHT` | 2400 / 1 dk | IP |
| USDⓈ-M Futures | `ORDERS` | 300 / 10 sn; 1200 / 1 dk | Hesap |

- Spot WebSocket API dokümanındaki örnek yanıtlar `ORDERS 50/10 sn, 160.000/gün` gösteriyor; canlı değerler farklı → **örnek değerlere değil `exchangeInfo`'ya güven**. [ÇELİŞKİLİ]
- Kullanılan ağırlık her yanıtta `X-MBX-USED-WEIGHT-1M`, emir sayacı `X-MBX-ORDER-COUNT-10S/1D` başlıklarında. [RESMÎ]
- **Weight sınırları IP'ye göredir, anahtara göre değil**; emir sınırları hesaba göredir (o hesabın tüm anahtarları ortak). [RESMÎ]
- Aşım: **429** + `Retry-After` → bekle. 429'dan sonra istek göndermeye devam edersen **418** (otomatik IP banı), tekrar edenlerde **2 dakikadan 3 güne** kadar artar. **403** = WAF kuralı ihlali. **5XX** = işlem sonucu bilinmiyor (gerçekleşmiş olabilir). [RESMÎ]
- WebSocket stream verisi REST weight'ine sayılmaz; piyasa verisi için stream tercih edilmeli. [RESMÎ — Binance TR dokümanı da aynı öneriyi yapar]

## Türkiye: Binance TR farkı

Binance TR (`binance.tr`) ayrı API'ye sahiptir; global kütüphaneler doğrudan çalışmaz. [RESMÎ — Binance TR Open API, son güncelleme 28.08.2026]

| Konu | Binance global | Binance TR |
|---|---|---|
| REST base | `api.binance.com` | `https://www.binance.tr` (`/open/v1/...`); bazı piyasa verileri `https://api.binance.me`; sembol tipi 3 için `cloudme-tr.2meta.app` |
| Streams | `stream.binance.com` | `wss://stream-cloud.binance.tr` (tip 1), `wss://stream-tr.2meta.app` (tip 3) |
| WebSocket API | `ws-api.binance.com` | `wss://ws-api.binance.tr:443/ws-api/v3` (yalnızca tip 1) |
| Sembol biçimi | `BTCUSDT` | Emir ve hesap uç noktalarında (`/open/v1/...`) `BTC_TRY`, `BTC_USDT`; tip 1 piyasa verisi REST'inde (`api.binance.me`: depth, trades, aggTrades, klines) alt çizgisiz `BTCUSDT`; tip 1 stream'lerde küçük harf `btcusdt` |
| Yanıt yapısı | Doğrudan veri | Hep `{code, msg, data, timestamp}`; `code: 0` başarı |
| Enum'lar | Metin (`BUY`, `LIMIT`) | Sayısal (`side` 0=BUY/1=SELL, `type` 1–7) |
| İmza | HMAC / RSA / Ed25519 | Dokümanda HMAC SHA256 |
| Kullanıcı akışı | Spot'ta listenKey kapandı | Tip 1: `/open/v1/user-data-stream` uç noktalarının **30.04.2026**'da kapatılması planlandı (changelog 2026-03-26; bugün kapalı kabul et). Yerine `POST /open/v1/user-listen-token` (geçerlilik varsayılan ve en fazla 24 saat, kendiliğinden yenilenmez) alınır ve WebSocket API'de `userDataStream.subscribe.listenToken` ile abone olunur. Tip 3 (Nextme): `/open/v1/private-n/user-data-stream` (listenKey, 60 dk; ~30 dk'da bir `PUT` ile uzat) |
| Ek kurallar | — | Fiyat aralığı yürütme kuralı, Self Trade Prevention, çekimlerde Travel Rule alanları zorunlu |
| Futures | Var | Belgede Futures API bulunamadı |

- Sembol tipleri: 1=MAIN, 2=NEXT, 3=Nextme; kullanıcı akışı tip 2'yi desteklemez. [RESMÎ]
- Dokümanın kullanıcı akışı bölümünde `stream.binance.com` ve `stream-cloud.binanceru.net` adresleri geçiyor; diğer TR adresleriyle tutarsız → kullanmadan önce doğrula. [ÇELİŞKİLİ]
- Sınırlar globaldeki mantıkla aynı (IP weight, 429/418, 2 dk–3 gün ban, `X-MBX-USED-WEIGHT-*`). [RESMÎ]
- Hangi kullanıcının hangi platformu kullanabileceği yerleşim ülkesine ve platformların kullanım koşullarına bağlıdır; Türkiye'de yerleşik kullanıcılar için yerel lisanslı platform Binance TR'dir. Güncel koşulları her iki platformun kullanım şartlarından kontrol et. [TAHMİN — bu çalışmada hukuki metin okunmadı]

## Test ortamları

| Ortam | REST | WebSocket | Anahtar | Ne zaman |
|---|---|---|---|---|
| Spot Testnet | `https://testnet.binance.vision/api` | Streams `wss://stream.testnet.binance.vision`, WS API `wss://ws-api.testnet.binance.vision/ws-api/v3` | testnet.binance.vision'a **GitHub** ile giriş; TRADE izni varsayılan kapalı | Yeni özellikleri canlıdan önce denemek; fiyatlar canlıdan bağımsız, bakiye aylık sıfırlanır [RESMÎ] |
| Spot Demo Mode (Ocak 2026) | `https://demo-api.binance.com/api` | WS API `wss://demo-ws-api.binance.com/ws-api/v3`, Streams `wss://demo-stream.binance.com/ws` | Binance hesabından Demo Trading → demo API anahtarı | Gerçekçi piyasa verisiyle test; filtre ve limitler canlıyla birebir [RESMÎ] |
| USDⓈ-M Futures test | `https://demo-fapi.binance.com` (genel bilgi sayfası) — kullanıcı akışı sayfası `https://testnet.binancefuture.com` diyor | `wss://demo-fstream.binance.com` / `wss://stream.binancefuture.com` / `wss://fstream.binancefuture.com` (sayfalara göre farklı) | Futures demo/testnet hesabı | Sayfalar arasında tutarsızlık var; güncel adres için genel bilgi sayfasını esas al [ÇELİŞKİLİ] |

## Resmî olmayan yollar ve riskler

- **Duyuru listesi (`bapi`):** `GET https://www.binance.com/bapi/composite/v1/public/cms/article/list/query?type=1&pageNo=1&pageSize=N` — web sitesinin kendi kullandığı uç nokta; katalog (ör. "New Cryptocurrency Listing") ve makale başlığı/tarihini JSON döndürür. 15.10.2026'da çalıştı (kendi testimiz). Belgesizdir, her an değişebilir; sık yoklamada WAF (403) veya IP engeli olası. Geçmiş duyuruları doldurmak için mantıklı; **anlık takip için resmî duyuru WebSocket'i** kullan. [3. TARAF / kendi testimiz]
- **Binance Square / Copy Trading / Launchpool sayfaları:** Web arayüzünün iç `bapi` istekleri veya HTML kazıma ile okunabilir; belgede resmî okuma API'si bulunamadı. Kullanım koşulları otomatik erişimi kısıtlayabilir; hesap kapatma veya IP engeli riski. [TAHMİN]
- **Coğrafi engel:** Bazı ülkelerden (ör. ABD) `api.binance.com` / `fapi` erişimi kısıtlıdır (HTTP 451); VPN/proxy ile aşmak kullanım koşullarını ihlal eder. [3. TARAF — yaygın bilgi, bu çalışmada resmî metinden doğrulanmadı]
- **Güvenlik:** Takip için asla işlem/çekim izinli anahtar kullanma; topluluk botlarında anahtar sızıntısı en sık kayıp nedenidir. [TAHMİN — genel pratik]

## SDK ve kütüphaneler

| Kütüphane | Dil | Tür | Not |
|---|---|---|---|
| [binance-connector-python](https://github.com/binance/binance-connector-python) | Python | Resmî | Aktif |
| [binance-connector-js](https://github.com/binance/binance-connector-js) | TypeScript/JS | Resmî | 15.10.2026'da güncellendi (GitHub API) |
| [binance-connector-java](https://github.com/binance/binance-connector-java) | Java | Resmî | |
| [binance-connector-go](https://github.com/binance/binance-connector-go) | Go | Resmî | |
| [binance-connector-rust](https://github.com/binance/binance-connector-rust) | Rust | Resmî | |
| [binance-futures-connector-python](https://github.com/binance/binance-futures-connector-python) | Python | Resmî (**deprecated**) | Futures; depo README'si kullanımdan kaldırıldığını söylüyor → yerine modüler [binance-connector-python](https://github.com/binance/binance-connector-python) (derivatives modülleri) [RESMÎ] |
| [binance-connector-dotnet](https://github.com/binance/binance-connector-dotnet) | C# / .NET | Resmî (eski) | Son push 18.06.2024 → listenKey sonrası değişiklikleri içermiyor olabilir [RESMÎ repo / TAHMİN güncellik] |
| [Binance.Net](https://github.com/JKorf/Binance.Net) (NuGet `Binance.Net`) | C# / .NET | Topluluk (MIT) | En yaygın .NET seçeneği; Spot, USD-M, COIN-M REST + WebSocket; sürüm 13.7.0 (30.09.2026). Binance TR desteği README'de yok [3. TARAF] |
| python-binance, ccxt | Python / JS / PHP | Topluluk | ccxt çok borsalı ortak arayüz; Binance TR için ccxt'de ayrı sınıf olup olmadığı bu çalışmada doğrulanmadı [TAHMİN] |

## Postman / OpenAPI / koleksiyonlar

- [binance/binance-api-postman](https://github.com/binance/binance-api-postman) — resmî Postman koleksiyonları ve ortam dosyaları (Spot, Futures; testnet ortamları); 15.10.2026'da güncellendi. [RESMÎ]
- [binance/binance-api-swagger](https://github.com/binance/binance-api-swagger) — resmî OpenAPI (`spot_api.yaml`, yalnızca Spot); son push 08.10.2024 → 2025–2026 değişikliklerini (listenKey kapanışı, yeni alanlar) içermeyebilir. [RESMÎ repo / TAHMİN güncellik]
- Resmî dokümanın "Agent Native" menüsünde `llms-full.txt` gibi makine okunur tam metin seçenekleri bulunuyor. [3. TARAF — WebFetch özetinde görüldü, bizzat açılmadı]

## Depoda ilgili sayfalar

- [Telegram API](../Mesajlasma/Telegram.md) — duyuru/fiyat uyarılarını bota iletmek için.
- [Discord API](../Mesajlasma/Discord.md) — uyarıları kanala webhook ile göndermek için.
- [X (Twitter) API](../Sosyal-Medya/X-Twitter.md) — Binance'in ve projelerin X paylaşımlarını takip için.
- [GitHub API](../Gelistirici-Platformlari/GitHub.md) — resmî connector repolarının release takibi için.
- [Blockchain](../../Programlama/Blockchain/) — zincir üstü (on-chain) veriler ve akıllı sözleşmeler.
- [CSharp-DotNet](../../Programlama/CSharp-DotNet/) — Binance.Net ile örnek proje açılacaksa.

## Kaynaklar

- [Binance Spot API — General API Information](https://developers.binance.com/en/docs/products/spot/rest-api#general-api-information) — base URL, security type, imza, 429/418 kuralları — (erişim: 15 Ekim 2026)
- [Binance Spot API — CHANGELOG](https://developers.binance.com/en/docs/products/spot/CHANGELOG) — listenKey kapanışı, `!ticker@arr` ve `/api/v1` kapanışı, RAW_REQUESTS artışı, SBE, Demo Mode — (erişim: 15 Ekim 2026)
- [Spot WebSocket Streams (GitHub kaynak metni)](https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md) — 24 saat, ping, 5 mesaj/sn, 1024 stream, 300 bağlantı/5 dk — (erişim: 15 Ekim 2026)
- [Spot WebSocket Streams](https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams) — stream adları — (erişim: 15 Ekim 2026)
- [Spot WebSocket API — General](https://developers.binance.com/en/docs/products/spot/web-socket-api#general-api-information) — WS API URL, session.logon, limitler — (erişim: 15 Ekim 2026)
- [Spot User Data Stream](https://developers.binance.com/en/docs/products/spot/user-data-stream) — kullanıcı akışı olayları — (erişim: 15 Ekim 2026)
- [Spot Testnet — General](https://developers.binance.com/en/docs/products/spot/testnet/rest-api#general-api-information) — testnet URL ve anahtar alma — (erişim: 15 Ekim 2026)
- [Spot Demo Mode](https://developers.binance.com/en/docs/products/spot/demo-mode/general-info) — demo URL'leri, testnet farkı — (erişim: 15 Ekim 2026)
- [USDⓈ-M Futures — General Info](https://developers.binance.com/docs/derivatives/usds-margined-futures/general-info) — futures base URL, sınır mantığı — (erişim: 15 Ekim 2026)
- [USDⓈ-M Futures — WebSocket bağlantı](https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/Connect) — /public /market /private, limitler — (erişim: 15 Ekim 2026)
- [USDⓈ-M Futures — All Market Liquidation Order Streams](https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams/All-Market-Liquidation-Order-Streams) — `!forceOrder@arr`, 1000 ms snapshot, `/market` yolu — (erişim: 15 Ekim 2026)
- [USDⓈ-M Futures — User Data Streams](https://developers.binance.com/docs/derivatives/usds-margined-futures/user-data-streams) — listenKey (60 dk) — (erişim: 15 Ekim 2026)
- [Derivatives Change Log](https://developers.binance.com/docs/derivatives/change-log) — eski WS URL kapanışı, 1024 stream, CM-UM birleşmesi — (erişim: 15 Ekim 2026)
- [CMS (Duyuru) WebSocket — General](https://developers.binance.com/docs/cms/general-info) ve [Announcement](https://developers.binance.com/docs/cms/announcement) — `com_announcement_en` topic'i — (erişim: 15 Ekim 2026)
- [Binance — API anahtarı oluşturma (FAQ)](https://www.binance.com/en/support/faq/how-to-create-api-keys-on-binance-360002502072) — izinler, IP kısıtı, anahtar türleri — (erişim: 15 Ekim 2026)
- `https://data-api.binance.vision/api/v3/exchangeInfo` ve `https://fapi.binance.com/fapi/v1/exchangeInfo` — canlı rate limit değerleri — (erişim: 15 Ekim 2026)
- [Binance TR Open API](https://www.binance.tr/apidocs/) — TR uç noktaları, sembol biçimi, listen token, 2026-03-26 changelog (user-data-stream kapanışı), tip 3 `private-n` akışı — (erişim: 15 Ekim 2026)
- [binance-futures-connector-python](https://github.com/binance/binance-futures-connector-python) — deprecated notu — (erişim: 15 Ekim 2026)
- [GitHub — binance organizasyonu](https://github.com/binance) — resmî connector'lar, Postman, Swagger — (erişim: 15 Ekim 2026)
- [JKorf/Binance.Net](https://github.com/JKorf/Binance.Net) — topluluk .NET kütüphanesi — (erişim: 15 Ekim 2026)

> Not: Bu çalışmada web arama kotası dolduğu için Binance TR ve program (Broker/VIP) koşullarında arama yapılamadı; bilgiler yalnızca doğrudan okunan resmî sayfalara ve canlı uç nokta sorgularına dayanıyor.
