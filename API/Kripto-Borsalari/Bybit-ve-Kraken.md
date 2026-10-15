# Bybit ve Kraken API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (Bybit: bölgesel kısıtlı — Türkiye için ayrı alan adı; Kraken: aktif, Türkiye durumu belgede net değil)

## Özet

Bybit ve Kraken, kripto para borsalarıdır; ikisi de herkese açık piyasa verisini (fiyat, emir defteri, işlemler, mum grafiği) **kimliksiz ve ücretsiz**, hesap/emir işlemlerini ise kullanıcının kendi hesabında oluşturduğu **API anahtarı** ile sunar. Bybit tek birleşik **V5 API** (REST + WebSocket) kullanır ve Türkiye dahil bazı bölgeler için ayrı alan adları (`api.bybit.tr`) tanımlar [RESMÎ]. Kraken'in Spot REST (`api.kraken.com/0/...`), Spot WebSocket v2 (`ws.kraken.com/v2`) ve ayrı bir Futures/Derivatives API'si vardır [RESMÎ]. API kullanımı ücretsizdir; ücret yalnızca işlem komisyonu olarak doğar [RESMÎ — ayrı API ücreti belgede yok]. Takip uygulaması açısından değerli kısım: fiyat/hacim olayları (WebSocket) ve Bybit'in **duyuru (announcement) uç noktası**.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | Bybit: `/v5/market/*`, `/v5/announcements/index`, public WebSocket; Kraken: `/0/public/*`, WebSocket v2 public kanallar | Ücretsiz; Bybit IP başına 600 istek / 5 sn; Kraken sayaç sistemi [RESMÎ] |
| Geliştirici hesabı / API anahtarı | Borsada hesap + kimlik doğrulama (KYC) + API anahtarı oluşturma | Bakiye, emir, pozisyon, işlem geçmişi, private WebSocket | Ücretsiz; UID/anahtar başına limitler [RESMÎ] |
| Test ortamı | Bybit testnet hesabı (ayrı kayıt) **veya** Bybit Demo Trading (mainnet hesabında Demo Trading'e geçilip anahtar oluşturulur, ayrı kayıt gerekmez) | Gerçek para olmadan emir denemesi: testnet `api-testnet.bybit.com`; Demo Trading REST `https://api-demo.bybit.com`, WS `wss://stream-demo.bybit.com` (yalnızca private; public veri `stream.bybit.com`'dan gelir, WS Trade desteklenmez, her uç nokta yok, emirler 7 gün saklanır) — gerçek fiyatlarla deneme için Demo Trading daha uygun | Ücretsiz [RESMÎ]. Kraken Futures: `https://demo-futures.kraken.com` (self-service demo) [RESMÎ]; Kraken Spot: UAT ortamı yalnızca Account Manager üzerinden istenerek açılır, herkese açık değil [RESMÎ] |
| İşletme / partner | Broker programı, kurumsal hesap | Bybit: Broker (`X-Referer` başlığı), yüksek limit; Kraken: FIX API, kurumsal | Başvuru ile [RESMÎ — ayrıntı belgede sınırlı] |
| Ücretli / kurumsal | VIP/Pro seviye işlem hacmi | Daha yüksek hız limitleri (Kraken'de doğrulama seviyesine bağlı sayaç) | Hacme bağlı [RESMÎ] |
| Resmî olmayan | — | Web sitesinin dahili uç noktaları (ör. duyuru sayfası, kampanya JSON'ları) | ToS riski; gerek yok, resmî API yeterli [TAHMİN] |

## Türkiye erişimi

| Durum | Bybit | Kraken |
|---|---|---|
| Resmî belgede Türkiye | Ayrı alan adı: REST `https://api.bybit.tr`, WebSocket `stream.bybit.tr` — "hesabınız www.bybit.tr üzerinden kayıtlıysa bunu kullanın" [RESMÎ] | Yasaklı bölgeler listesinde **Türkiye yok** (Afganistan, Belarus, Kırım/Donetsk/Luhansk, Küba, KDC, İran, Irak, Japonya, Libya, Kuzey Kore, Rusya, Sudan, Güney Sudan, Suriye) [RESMÎ] |
| Hesap türü | Türkiye'den kayıt olan kullanıcı Bybit TR (bybit.tr) altında; API aynı V5 yapısı, yalnızca alan adı farklı [RESMÎ] | Global hesap; Türkiye'ye özel ürün kısıtı belgede bulunamadı [RESMÎ — belgede yok] |
| Mevzuat | Türkiye'de kripto varlık hizmet sağlayıcıları 2024'ten beri SPK izni/listesi kapsamında (7518 sayılı Kanun); Bybit TR'nin güncel SPK listesi durumu bu çalışmada doğrulanamadı — SPK sitesinden kontrol edin [TAHMİN] | Türkiye'de yerleşik kişilere hizmet veren yabancı platformlar için SPK izin şartı vardır; Kraken'in Türkiye'de izinli olduğuna dair bilgi bulunamadı — kullanım öncesi SPK listesine bakın [TAHMİN] |
| Bilinen IP engeli | ABD ve Çin anakarası IP'leri 403 alır [RESMÎ] | — |

> Not: Yalnızca **public piyasa verisi** okumak (fiyat takibi) hesap gerektirmez; Bybit'te Türkiye kullanıcısı için de `api.bybit.com` public uç noktaları çalışır [TAHMİN — erişim ağ/engel durumuna bağlı]. Emir/hesap işlemi ise hesabın kayıtlı olduğu alan adından yapılmalıdır.

## Kimlik doğrulama

### Bybit V5 [RESMÎ]
- Başlıklar: `X-BAPI-API-KEY`, `X-BAPI-TIMESTAMP` (UTC ms), `X-BAPI-SIGN`, `X-BAPI-RECV-WINDOW` (varsayılan 5000 ms), broker için `X-Referer`.
- İmzalanacak metin: `timestamp + apiKey + recvWindow + queryString` (GET) veya `... + jsonBody` (POST).
- Sistem üretimli anahtar → **HMAC-SHA256** (küçük harf hex); kendi ürettiğin anahtar → **RSA-SHA256** (base64).
- Zaman damgası `sunucu_zamanı - recv_window` ile `sunucu_zamanı + 1000 ms` arasında olmalı.
- WebSocket private: `{"op":"auth","args":[apiKey, expires, signature]}`; imza = HMAC-SHA256(`GET/realtime` + expires).

### Kraken Spot [RESMÎ]
- Başlıklar: `API-Key` (public key), `API-Sign`.
- `API-Sign` = HMAC-SHA512( URI yolu + SHA256(nonce + POST verisi) ), anahtar = base64 çözülmüş private key. URI yolu `/0/private/...` ile başlar.
- `nonce`: her istekte artan 64-bit tam sayı (genelde ms zaman damgası); geri gitmesi `EAPI:Invalid nonce` hatası ve tekrarlarsa geçici ban getirir.
- `otp`: anahtarda 2FA açıksa gerekir (WebSocket/FIX için gerekmez).
- WebSocket private: önce `POST /0/private/GetWebSocketsToken` ile token alınır, abonelik mesajına eklenir. Token oluşturulduktan 15 dk sonra geçersizdir; abonelikte kontrol edilir (süresi dolmuşsa abonelik hatası döner); yeniden bağlanınca yeni token alıp tekrar abone ol [RESMÎ].

> Takip uygulaması için: API anahtarını **yalnızca okuma (read-only)** yetkisiyle ve mümkünse IP kısıtlı oluştur; para çekme yetkisi asla verilmez [3. TARAF — genel güvenlik pratiği].

## Temel uç noktalar

### Bybit V5 (taban: `https://api.bybit.com` · Türkiye: `https://api.bybit.tr` · testnet: `https://api-testnet.bybit.com` · Demo Trading: `https://api-demo.bybit.com`)

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/v5/market/time` | Sunucu zamanı | Herkese açık | İmza saat senkronu için |
| GET | `/v5/market/tickers?category=spot` | Anlık fiyat, 24s değişim, hacim | Herkese açık | `category`: spot/linear/inverse/option |
| GET | `/v5/market/kline` | Mum (OHLC) verisi | Herkese açık | |
| GET | `/v5/market/orderbook` | Emir defteri | Herkese açık | |
| GET | `/v5/market/recent-trade` | Son işlemler | Herkese açık | |
| GET | `/v5/market/instruments-info` | İşlem çiftleri, yeni listelemeler | Herkese açık | Yeni coin listelemesini fark etmek için periyodik çekilebilir |
| GET | `/v5/announcements/index?locale=en-US` | Borsa duyuruları (yeni listeleme, delist, bakım, kampanya) | Herkese açık [TAHMİN — belgede kimlik şartı yazmıyor] | `locale` **zorunlu**; isteğe bağlı `type`, `tag`, `page`, `limit` (vars. 20); alanlar: `title`, `description`, `type.key`, `tags`, `url`, `dateTimestamp` (duyuru tarihi), `publishTime` (yayın zamanı) [RESMÎ] |
| GET | `/v5/account/wallet-balance` | Bakiye | API anahtarı | 50/sn (UNIFIED) [RESMÎ] |
| GET | `/v5/order/realtime` | Açık emirler | API anahtarı | 50/sn [RESMÎ] |
| GET | `/v5/position/list` | Pozisyonlar | API anahtarı | 50/sn [RESMÎ] |
| POST | `/v5/order/create` | Emir ver | API anahtarı (trade yetkisi) | 10–20/sn (ürüne göre) [RESMÎ] |

Tam liste: <https://bybit-exchange.github.io/docs/v5/intro>

### Kraken Spot (taban: `https://api.kraken.com`)

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/0/public/Time` | Sunucu zamanı | Herkese açık | |
| GET | `/0/public/SystemStatus` | Borsa durumu (online, maintenance, cancel_only…) | Herkese açık | Bakım takibi için |
| GET | `/0/public/Assets`, `/0/public/AssetPairs` | Varlıklar ve işlem çiftleri | Herkese açık | Yeni çift listelemesi için periyodik çekilebilir |
| GET | `/0/public/Ticker?pair=XBTUSD` | Anlık fiyat | Herkese açık | |
| GET | `/0/public/OHLC`, `/0/public/Depth`, `/0/public/Trades` | Mum, emir defteri, işlemler | Herkese açık | |
| POST | `/0/private/Balance` | Bakiye | API anahtarı | Sayaç +1 |
| POST | `/0/private/OpenOrders`, `/0/private/TradesHistory`, `/0/private/Ledgers` | Emirler, geçmiş | API anahtarı | Ledger/geçmiş sayaç +2 [RESMÎ] |
| POST | `/0/private/GetWebSocketsToken` | WebSocket token'ı | API anahtarı | 15 dk geçerli [RESMÎ] |
| POST | `/0/private/AddOrder`, `CancelOrder` | Emir | API anahtarı (trade) | Ayrı işlem motoru limiti [RESMÎ] |

Futures/Derivatives: REST `https://futures.kraken.com/derivatives/api/v3`, WebSocket `wss://futures.kraken.com/ws/v1` [RESMÎ]. Tam liste: <https://docs.kraken.com/api/>

## Gerçek zamanlı / bildirim

- **Webhook:** İki borsada da kullanıcıya webhook gönderme belgede yok [RESMÎ — belgede yok].
- **Bybit WebSocket** [RESMÎ]:
  - Public: `wss://stream.bybit.com/v5/public/spot` | `/linear` | `/inverse` | `/option`; private: `/v5/private`; emir girişi: `/v5/trade`. Türkiye hesabı: `stream.bybit.tr`.
  - Konular: `tickers.{symbol}` (spot 50 ms, türev 100 ms), `orderbook`, `publicTrade`, `kline`, `allLiquidation`, `insurance`, ADL uyarısı; private: order, execution, position, wallet.
  - 20 sn'de bir `ping`; spot'ta istek başına en fazla 10 argüman; 5 dk'da alan adı başına en fazla 500 bağlantı.
- **Kraken WebSocket v2** [RESMÎ]:
  - Public: `wss://ws.kraken.com/v2` — `ticker`, `book`, `trade`, `ohlc`, `instrument` [`ohlc`/`instrument` adları 3. TARAF kaynaklardan; tam doğrulanamadı].
  - `status` kanalı [RESMÎ]: abone olmaya gerek yok; bağlantı açılınca ve trading engine durumu değişince otomatik gönderilir. `system` alanı `online` / `maintenance` / `cancel_only` / `post_only` değerlerini alır. Bazı dağıtımlarda `upcoming_maintenance` (planlı bakım penceresi, başlangıç/bitiş, önerilen eylem) ve `emergency` (plansız olay) dizileri de gelir.
  - Private: `wss://ws-auth.kraken.com/v2` — `executions` (emir + işlem), `balances`, `level3`; token gerekli.
  - Abonelik örneği: `{"method":"subscribe","params":{"channel":"ticker","symbol":["BTC/USD"]}}`.
- **Duyurular:** Bybit duyuruları API ile çekilir (yoklama/polling). Kraken için duyuru API'si belgede yok; blog RSS'i ve `status.kraken.com` durum sayfası kullanılabilir [TAHMİN — Statuspage tabanlı sitelerde `/api/v2/summary.json` genelde vardır, doğrulanmadı].

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Fiyat eşiği aşıldı / ani hareket (%X) | Evet | WebSocket ticker + kendi kuralın | Herkese açık | En verimli yöntem; REST yoklamadan kaçın |
| Büyük işlem / balina hareketi | Kısmen | WebSocket trade akışında miktar filtresi | Herkese açık | Cüzdan sahibi bilinmez |
| Büyük likidasyon (Bybit türev) | Evet | `allLiquidation.{symbol}` | Herkese açık | Bybit'e özgü [RESMÎ] |
| Yeni coin listelemesi | Evet | Bybit: duyuru (`type`/`tag` filtresi) + `instruments-info` farkı; Kraken: `AssetPairs` farkı | Herkese açık | Listeleme duyurusu fiyat etkili olay |
| Delist / bakım / kesinti | Evet | Bybit duyuruları; Kraken `SystemStatus` + WS `status` | Herkese açık | Kraken WS `status` mesajındaki `upcoming_maintenance` dizisi (varsa) planlı bakımı önceden bildirir [RESMÎ] |
| Kampanya / etkinlik | Evet (Bybit) | Duyuru `latest_activities` (`start/endDataTimestamp`) | Herkese açık | Belgede alan adı tutarsız (`Data` vs `Date`) [ÇELİŞKİLİ] |
| Kendi emrim doldu / bakiye değişti | Evet | Private WebSocket (Bybit `order`/`execution`; Kraken `executions`/`balances`) | API anahtarı | Read-only anahtar yeterli |
| Kişilerin/kanalların paylaşımı | Hayır | — | — | Borsalar sosyal akış API'si sunmaz; X/Telegram sayfalarına bakın |
| Anahtar kelime filtreleme | Kısmen | Duyuru `title`/`description` üzerinde kendi filtren | Herkese açık | Sunucu tarafı arama belgede yok |

## Hız sınırları ve fiyatlar

**Bybit** [RESMÎ]
- IP: 5 sn'de 600 HTTP isteği (api.bybit.com, api.bytick.com ve yerel alan adları); aşılırsa `403 access too frequent`, en az 10 dk bekleme.
- Yerel alan adları (dipnot): TR `api.bybit.tr`, KZ `api.bybit.kz`, GE `api.bybitgeorgia.ge`, AE `api.bybit.ae`, ID `api.bybit.id`, JP `api.manepa.jp`, HK `api.spark-fintech.com`, EEA `api.bybit.eu` — **EEA alan adı yalnızca broker kullanıcıları için** ("Connect to Third-Party Applications") [RESMÎ].
- UID: uç nokta başına saniyelik kayan pencere; aşılırsa `retCode 10006 "Too many visits!"`. Yanıt başlıkları: `X-Bapi-Limit`, `X-Bapi-Limit-Status`, `X-Bapi-Limit-Reset-Timestamp`.
- WebSocket: IP başına ürün türü başına en fazla 1000 piyasa verisi bağlantısı.
- Ücret: API ücretsiz; işlem komisyonu VIP seviyesine göre.

**Kraken Spot REST** [RESMÎ] — sayaç modeli (her çağrı +1, geçmiş/ledger +2; zamanla azalır):

| Doğrulama seviyesi | Azami sayaç | Azalma |
|---|---|---|
| Starter | 15 | 0,33 / sn |
| Intermediate | 20 | 0,5 / sn |
| Pro | 20 | 1 / sn |

- Emir ekleme/iptal ayrı "trading engine" limitine tabidir; Futures için ayrı limit sayfası vardır.
- Ücret: API ücretsiz; işlem komisyonu hacme göre.

## Resmî olmayan yollar ve riskler

- Gerek yok: iki borsada da takip için gerekli veri resmî public API'de var.
- Web sitesi dahili uç noktalarını (duyuru/kampanya sayfası JSON'ları) kazımak ToS ihlali ve Cloudflare/IP engeli riski taşır [TAHMİN].
- VPN ile bölge kısıtını aşmak (ör. Bybit'in ABD/Çin engeli veya hesap bölgesi dışından işlem) hesap dondurma ve kullanım koşulları ihlali riskidir [RESMÎ — IP kısıtı belgede; yaptırım ToS'ta].
- Türkiye'de yerleşik kişinin SPK izinsiz platformda işlem yapması mevzuat açısından ayrıca değerlendirilmelidir [TAHMİN — hukuki danışmanlık değildir].

## SDK ve kütüphaneler

| Kütüphane | Dil | Tür | Not |
|---|---|---|---|
| `pybit` | Python | Bybit resmî | <https://github.com/bybit-exchange/pybit> [RESMÎ] |
| `bybit.go.api`, `bybit-java-api` | Go, Java | Bybit resmî (GitHub `bybit-exchange`) | <https://github.com/bybit-exchange> [RESMÎ] |
| `bybit.net.api` | .NET (C#) | Bybit resmî | <https://github.com/bybit-exchange/bybit.net.api> [RESMÎ] |
| `bybit.js.api` | TypeScript/JS | Bybit resmî | <https://github.com/bybit-exchange/bybit.js.api> [RESMÎ]; aynı kuruluşta `bybit.php.api`, `bybit.ruby.api` de var |
| `bybit-api` (npm) | Node/TS | Topluluk (tiagosiebler) | Yaygın [3. TARAF] |
| `api-go`, `kraken-cli` | Go, CLI | Kraken resmî | <https://github.com/krakenfx> [RESMÎ] |
| `python-kraken-sdk`, `krakenex` | Python | Topluluk | [3. TARAF] |
| **`Bybit.Net`**, **`Kraken.Net`** | **.NET (C#)** | Topluluk (JKorf, CryptoExchange.Net tabanlı) | NuGet; REST + WebSocket, yaygın topluluk seçeneği (Bybit için resmî alternatif: `bybit.net.api`) [3. TARAF] |
| `CCXT` | JS/Python/PHP/C# | Topluluk, 100+ borsa tek arayüz | Çok borsalı takip için pratik [3. TARAF] |

## Postman / OpenAPI / koleksiyonlar

- Kraken: REST referansı OpenAPI'den üretiliyor; ancak indirilebilir spec bağlantısı belgede verilmemiş [RESMÎ — belgede yok]. Doküman indeksi: <https://docs.kraken.com/llms.txt>.
- Bybit: <https://github.com/bybit-exchange/QuickStartWithPostman> — V5 koleksiyonu (`V5APIs/`) + testnet environment [RESMÎ]. OpenAPI spec resmî olarak belgede yok.

## Depoda ilgili sayfalar

- [X (Twitter) API](../Sosyal-Medya/X-Twitter.md) — borsaların duyuru hesaplarını takip için.
- [Telegram API](../Mesajlasma/Telegram.md) — borsa duyuru kanalları ve bildirim botu için.
- [Discord API](../Mesajlasma/Discord.md) — topluluk sunucularını izleme.

## Kaynaklar

- <https://bybit-exchange.github.io/docs/v5/guide> — Bybit V5 entegrasyon rehberi: taban URL'ler (Türkiye `api.bybit.tr` ve diğer bölgesel alan adları dahil), imzalama — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://bybit-exchange.github.io/docs/v5/rate-limit> — Bybit IP/UID hız limitleri — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://bybit-exchange.github.io/docs/v5/ws/connect> — Bybit WebSocket URL'leri, ping, kimlik doğrulama — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://bybit-exchange.github.io/docs/v5/announcement> — Bybit duyuru uç noktası — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://bybit-exchange.github.io/docs/v5/websocket/public/ticker> — Bybit ticker konusu ve public konu listesi — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://docs.kraken.com/api/docs/guides/spot-rest-auth> — Kraken REST kimlik doğrulama — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://docs.kraken.com/api/docs/guides/spot-rest-ratelimits> — Kraken REST hız limitleri — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://docs.kraken.com/api/docs/guides/spot-ws-auth> — Kraken WebSocket token (15 dk ömür, yeniden bağlanınca yeniden abonelik) — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://docs.kraken.com/api/docs/websocket-v2/status> — Kraken WS v2 `status` kanalı, `upcoming_maintenance` — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://docs.kraken.com/api/docs/guides/global-intro> — Kraken test ortamları (Futures demo, Spot UAT) — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://bybit-exchange.github.io/docs/v5/demo> — Bybit Demo Trading ortamı — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://github.com/bybit-exchange> — Bybit resmî SDK depoları ve <https://github.com/bybit-exchange/QuickStartWithPostman> Postman koleksiyonu — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://docs.kraken.com/api/docs/websocket-v2/ticker> ve <https://docs.kraken.com/api/docs/websocket-v2/executions> — Kraken WS v2 public/private uç noktaları — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://docs.kraken.com/llms.txt> — Kraken doküman indeksi, Futures URL'leri, resmî SDK'lar — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://support.kraken.com/articles/360001368823-geographic-restrictions> — Kraken yasaklı bölgeler — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://www.bybit.tr/> — Bybit TR sitesi — (erişim: 15 Ekim 2026) [RESMÎ]
- <https://spk.gov.tr/> — Türkiye kripto varlık hizmet sağlayıcıları listesi için kontrol noktası — (erişim: 15 Ekim 2026; liste bu çalışmada okunmadı)

> Not: Bu çalışmada Türkiye mevzuat/SPK listesi doğrudan doğrulanamadı; ilgili satırlar [TAHMİN] olarak etiketlidir. Bybit SDK depoları, Postman koleksiyonu, test ortamları ve Kraken `status` kanalı 15 Ekim 2026'da resmî kaynaktan doğrulandı.
