# BtcTurk ve Paribu API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: BtcTurk **aktif** (resmî REST + WebSocket) · Paribu **aktif** (resmî REST + WebSocket [Beta], docs.paribu.com)

> Not: BtcTurk bilgileri resmî dokümandan (docs.btcturk.com) ve resmî GitHub deposundan, Paribu bilgileri resmî dokümandan (docs.paribu.com), mevzuat bilgileri Resmî Gazete ve SPK sayfalarından okundu.

## Özet

BtcTurk (BtcTurk | Kripto, eski adı BtcTurk | PRO), Türkiye'nin en eski kripto varlık platformlarından biridir ve hesap sahiplerine **ücretsiz** bir REST API (`api.btcturk.com`), grafik verisi için ayrı bir uç (`graph-api.btcturk.com`) ve gerçek zamanlı veri için WebSocket akışı (`wss://ws-feed-pro.btcturk.com`) sunar [RESMÎ]. Herkese açık piyasa verisi (ticker, emir defteri, işlemler, mum verisi) anahtarsız; bakiye, emir ve hesap hareketleri HMAC-SHA256 imzalı API anahtarı ile kullanılır [RESMÎ]. Paribu da resmî, herkese açık bir API dokümanı yayımlar (`docs.paribu.com`): REST taban adresi `https://api.paribu.com`, herkese açık piyasa verisi anahtarsız; hesap, emir, para çekme ve Travel Rule beyanı uçları HMAC-SHA256 imzalı API anahtarıyla; ayrıca Beta durumunda bir WebSocket API (`wss://api.paribu.com/v1/wapi/...`) vardır [RESMÎ]. İki platform da 7518 sayılı Kanun sonrası SPK'nın "Faaliyette Bulunanlar (Geçici) Listesi"nde yer alır; bu liste izin verildiği anlamına gelmez [RESMÎ].

## Erişim seviyeleri

### BtcTurk

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | `api/v2` piyasa verisi (ticker, orderbook, trades, exchangeinfo, server time), `graph-api` OHLC/kline, WebSocket genel kanallar (`ticker`, `trade`, `orderbook`, `tradeview`) | Ücretsiz; IP başına limit (ör. ticker 600/dk) [RESMÎ] |
| Geliştirici hesabı/uygulama | BtcTurk hesabı (kimlik doğrulaması tamamlanmış) + **Hesap > API Erişimi** sayfasından anahtar üretimi; izinler seçilir, IP adresi girilir | İzne göre: **Toplam Varlık** (bakiye), **Alım-Satım** (emir ver/iptal/listele), **Hesap** (işlem/fiat/kripto hareketleri), **WebSocket** (kullanıcı olayları) [RESMÎ] | Ücretsiz; işlem komisyonları web ile aynı ücret tablosundan [RESMÎ] |
| İşletme/uygulama onayı | Belgede yok | Ayrı bir partner/App Review süreci dokümanda yok. BTCTrader'ın "white label exchange" altyapısı (eski broker-api-docs) ayrı bir B2B ürünüdür [RESMÎ — eski GitHub belgesi] | Belgede yok |
| Ücretli/kurumsal | Belgede yok | Piyasa yapıcı / kurumsal programa dair public belge bulunamadı | Belgede yok |
| Resmî olmayan | Topluluk kütüphaneleri (CCXT vb.) | Resmî API'nin sarmalayıcıları; ayrıca web istemcisinin kullandığı iç uçlar | ToS riski düşük (sarmalayıcı) / orta (iç uçlar) [TAHMİN] |

### Paribu

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | `GET /market/ticker`, orderbook, recent trades, exchange config; WebSocket genel akış `wss://api.paribu.com/v1/wapi/stream` [RESMÎ] | Ücretsiz; kullanıcı başına dakikalık ağırlık kovası (aşağıda) [RESMÎ] |
| Geliştirici hesabı/uygulama | Paribu hesabı → **Hesap → Diğer Güvenlik Ayarları → Create API Key**; anahtara ad verilir, **Read-only / Trade / Full access / Custom** ön ayarlarından biri seçilir, IP beyaz listesi isteğe bağlı ama önerilir, gerekirse 2FA onayı istenir; secret yalnızca bir kez gösterilir [RESMÎ] | Kapsama (scope) göre: kullanıcı bilgisi, varlıklar, emir ver/iptal/sorgula, işlem ve transfer geçmişi, yatırma adresi atama, **para çekme**, Travel Rule beyanı; WebSocket özel akış `/v1/wapi/user` [RESMÎ] | Ücretsiz; 100.000 ağırlık/dk, saniyede 25 emir oluşturma + 25 iptal [RESMÎ] |
| İşletme/uygulama onayı | Belgede yok | Ayrı bir partner/App Review süreci dokümanda yok | Belgede yok |
| Ücretli/kurumsal | Paribu ile iletişim | Daha yüksek limitler için "VIP programı" anılıyor; koşulları dokümanda yok [RESMÎ — Rate Limiting] | Belgede yok |
| Resmî olmayan | Hiçbir şey | `GET https://www.paribu.com/ticker` (belgesiz fiyat JSON'u) ve web/mobil istemcinin `v3.paribu.com` iç uçları — resmî API varken **gerek yok** (aşağıdaki risk notuna bakın) | Limit belgesiz [TAHMİN] |

## Kimlik doğrulama

### BtcTurk REST (Authentication V1) [RESMÎ]

Her özel istekte üç başlık gönderilir:

| Başlık | Değer |
|---|---|
| `X-PCK` | API public key |
| `X-Stamp` | Nonce = UTC Unix zaman damgası, **milisaniye** |
| `X-Signature` | İmza (aşağıda) |

İmza adımları:

1. Mesaj = `publicKey + nonce` (ayraçsız birleştirme).
2. API secret (private key) Base64'ten çözülür; HMAC anahtarı budur.
3. Mesaj üzerinde HMAC-SHA256 hesaplanır.
4. Sonuç Base64 olarak kodlanır → `X-Signature`.

- İçerik tipi `application/json` olmalıdır [RESMÎ].
- Saat, sunucu saatiyle senkron olmalı; nonce **±5 saniye** toleransın dışındaysa 401 döner. Kontrol için `GET /api/v2/server/time` [RESMÎ — FAQ].
- Anahtar bir IP adresine bağlanmışsa farklı IP'den gelen istek 401 alır [RESMÎ — FAQ].
- Anahtarlar yalnızca BtcTurk web sitesinden üretilebilir; sızdırılırsa hemen silinip yenisi üretilmelidir [RESMÎ].
- Eski belgede "art arda 50'den fazla yetkisiz istek IP engeline yol açar" uyarısı vardır [RESMÎ — GitHub broker-api-docs, eski].

### BtcTurk WebSocket girişi [RESMÎ]

Bağlantı sonrası `114` tipli login mesajı gönderilir:

```json
[114, {"type": 114, "publicKey": "PUBLIC_KEY", "timestamp": 1700000000000, "nonce": 3000, "signature": "BASE64_IMZA"}]
```

İmza REST ile aynı yöntemle (`publicKey + nonce`, Base64 çözülmüş private key ile HMAC-SHA256, Base64) üretilir. Anahtar üretilirken "WebSocket" izni seçilmeli ve IP adresi girilmelidir.

### Paribu REST [RESMÎ]

Her özel istekte gönderilen başlıklar:

| Başlık | Değer |
|---|---|
| `Authorization` | API public key, **ham hâliyle** (`Bearer` öneki yok) |
| `X-Signature` | `Base64(HMAC-SHA256(secret, timestamp + queryString + body))` |
| `X-Timestamp` | Unix zaman damgası, **milisaniye**; sunucu saatinden en fazla **±5 sn** sapabilir. Şu an isteğe bağlı ama önerilir; ileride zorunlu olacağı duyurulmuş. Gönderilmezse imzada boş dize kullanılır |

- İmza yükü: `timestamp + queryString + body` ayraçsız birleştirilir; `queryString` başındaki `?` olmadan, URL'dekiyle bayt bayt aynı; `GET`/`DELETE` için `body` boş dize. **Yol (path) imzaya girmez.**
- HMAC anahtarı API secret'ın UTF-8 hâlidir (BtcTurk'teki gibi Base64 çözülmez); sonuç ham baytların Base64'üdür (hex değil).
- `POST`/`PUT` isteklerinde `Content-Type: application/json` gönderilir.
- Uç nokta yolları `https://api.paribu.com` tabanına göredir; yola `/api` öneki **eklenmez**. (Rate Limiting sayfasındaki ağırlık tablosu yolları `/api/...` önekiyle yazıyor; kimlik doğrulama sayfası öneksiz kullanımı şart koşuyor [ÇELİŞKİLİ — resmî dokümanın kendi içinde].)
- Hatalar: geçersiz anahtar/imza/zaman → `401`; IP beyaz listede değil veya kapsam eksik → `403`; limit aşımı → `429`.
- İzin kapsamları sabittir ve uç noktaya göre belirlenir: `user:get`, `asset:get`, `order:create`, `order:cancel`, `order_detail:get`, `trade_history:get`, `transfer_history:get`, `address:assign`, `withdraw:create`, `withdraw:cancel`, `withdraw:get` (ayrıca dokümanda `open_order:get`, Travel Rule için `declaration:get` / `declaration:create` geçer).

### Paribu WebSocket girişi [RESMÎ]

Özel akış `wss://api.paribu.com/v1/wapi/user` bağlantısında aynı `Authorization`, `X-Signature`, `X-Timestamp` başlıkları WebSocket yükseltme isteğinde gönderilir; gövde boş olduğu için imza yükü yalnızca zaman damgasıdır. Hatalı kimlik bağlantı kurulmadan **HTTP 401** ile reddedilir. WebSocket için anahtarın okuma kapsamlarını (`user:get`, `asset:get`, `open_order:get`, `order_detail:get`, `trade_history:get`) içermesi gerekir.

## Temel uç noktalar

Taban adresler [RESMÎ]: REST `https://api.btcturk.com` · Grafik `https://graph-api.btcturk.com` · WebSocket `wss://ws-feed-pro.btcturk.com` · Sunucular Azure West Europe'ta, Cloudflare arkasında [RESMÎ — Data Center/FAQ].

Sürüm kuralı: **V2 = herkese açık piyasa verisi**, **V1 = kimlikli hesap işlemleri** [RESMÎ — FAQ]. Parite sembolleri ayraçsız yazılır (`BTCTRY`); zaman damgaları milisaniye, OHLC grafik verisi saniye [RESMÎ].

### BtcTurk — herkese açık

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/api/v2/ticker` (`?pairSymbol=`) | Tüm veya tek parite anlık fiyat, 24s değişim, en iyi alış/satış | Herkese açık | 600 istek/60 sn, IP [RESMÎ] |
| GET | `/api/v2/ticker/currency?symbol=` | Belirli para birimini içeren paritelerin ticker'ı | Herkese açık | — |
| GET | `/api/v2/orderbook?pairSymbol=&limit=` | Emir defteri (en fazla 100 fiyat seviyesi) | Herkese açık | 180/60 sn, IP [RESMÎ] |
| GET | `/api/v2/trades?pairSymbol=&last=` | Son gerçekleşen işlemler | Herkese açık | — |
| GET | `/api/v2/server/exchangeinfo` | Pariteler, ölçekler, `minExchangeValue`, durumlar | Herkese açık | **Yeni listelenen pariteyi yakalamak için** |
| GET | `/api/v2/server/time` | Sunucu saati | Herkese açık | Nonce senkronu |
| GET | `graph-api.btcturk.com/v1/ohlcs` | OHLC (mum) verisi | Herkese açık | 120/60 sn (IP) ve graph-api toplamı 600/10 dk [RESMÎ] |
| GET | `graph-api.btcturk.com/v1/klines/history` | Geçmiş kline (TradingView biçimi) | Herkese açık | aynı |
| GET | `/api/v1/exchanges` | Kripto borsaları listesi (yatırma beyanında `exchangeId` için) | Herkese açık | 300/1 dk, politika "account" [RESMÎ]; anahtarsız istek 15 Ekim 2026'da 200 döndü |

### BtcTurk — özel (kimlikli)

| Metot | Uç nokta | Ne yapar | Seviye (izin) | Not/limit |
|---|---|---|---|---|
| GET | `/api/v1/users/balances` | Bakiyeler | Toplam Varlık | 120/60 sn |
| GET | `/api/v1/users/transactions/trade` | Alım-satım geçmişi (tür, sembol, tarih filtresi) | Hesap | 120/60 sn |
| GET | `/api/v1/users/transactions/crypto` | Kripto yatırma/çekme hareketleri | Hesap | 90/60 sn |
| GET | `/api/v1/users/transactions/fiat` | TL yatırma/çekme hareketleri | Hesap | 90/60 sn |
| GET | `/api/v1/openOrders` (`?pairSymbol=`) | Açık emirler | Alım-Satım | 300/60 sn |
| GET | `/api/v1/allOrders` | Tüm emirler (orderId, pairSymbol, tarih, sayfa) | Alım-Satım | 300/60 sn |
| GET | `/api/v1/order/{orderId}` | Tek emir | Alım-Satım | 900/60 sn ve 30/sn |
| POST | `/api/v1/order` | Emir gönder (market/limit/stop) | Alım-Satım | 300/60 sn ve 10/sn |
| DELETE | `/api/v1/order?id=` | Emir iptali — 1 Nisan 2024'ten beri doğrulamadan hemen sonra 200 döner, kesin sonuç WebSocket **452** kanalından gelir | Alım-Satım | 300/60 sn ve 10/sn |
| GET | `/api/v1/crypto-deposit-declarations/confirm` | Bekleyen/onaylı kripto yatırma beyanlarını listeler | Hesap | Travel Rule kaynaklı |
| POST | `/api/v1/crypto-deposit-declarations/confirm` | Yatırma beyanını onaylar (gönderen kendisi mi, borsa mı/kişisel cüzdan mı, açıklama) | Hesap | Beyan onaylanmadan yatırma bakiyeye geçmez [RESMÎ] |

API üzerinden **kripto çekme (withdrawal)** uç noktası dokümanda yok (belgede yok). Bu, Paribu'dan önemli bir farktır: Paribu API'de resmî `POST /withdraw` vardır.

Tam liste: [Public endpoints](https://docs.btcturk.com/docs/public-endpoints/all-public-endpoints) · [Private endpoints](https://docs.btcturk.com/docs/private-endpoints/all-private-endpoints).

### Paribu — herkese açık [RESMÎ]

Taban adres `https://api.paribu.com`. Pazar kimlikleri küçük harfli ve `taban_karşıt` biçimindedir (`btc_tl`); geçerli liste Exchange Config uç noktasından alınır.

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit (ağırlık) |
|---|---|---|---|---|
| GET | `/market/ticker` (`?market=btc_tl`) | 24 saatlik özet: `market`, `low`, `high`, `first`, `last`, `volume`, `pair_volume`, `change`, `percentage`, `average`; `market` verilmezse tüm pazarlar | Herkese açık | 1; bilinmeyen pazar 500 döner. 15 Ekim 2026'da anahtarsız istek 200 döndü |
| GET | Orderbook | Emir defteri | Herkese açık | 2 |
| GET | Recent Trades | Son işlemler | Herkese açık | — |
| GET | Exchange Config | Pazarlar ve ayarları | Herkese açık | **Yeni listelenen pazarı yakalamak için** |

### Paribu — özel (kimlikli) [RESMÎ]

| Metot | Uç nokta | Ne yapar | Kapsam | Ağırlık |
|---|---|---|---|---|
| GET | `/users/me` | Kullanıcı bilgisi | `user:get` | 2 |
| GET | `/user/assets` | Varlıklar (bakiye) | `asset:get` | 2 |
| POST | `/order` | Emir gönder | `order:create` | 25/sn |
| DELETE | `/order/{id}` | Emir iptali | `order:cancel` | 25/sn |
| GET | `/order/{id}` | Tek emir detayı | `order_detail:get` | 2 |
| GET | `/open-orders` | Açık emirler | `open_order:get` | 5 |
| GET | `/trades/history` | İşlem geçmişi | `trade_history:get` | 20 |
| GET | `/transfers/history` | Yatırma/çekme geçmişi | `transfer_history:get` | 10 |
| POST | `/addresses/assign` | Yatırma adresi ata | `address:assign` | — |
| POST / GET / DELETE | `/withdraw`, `/withdraw/{id}` | **Kripto çekme** oluştur / sorgula / iptal et (Travel Rule alanlarıyla) | `withdraw:create` / `withdraw:get` / `withdraw:cancel` | GET 2 |
| GET | `/declarations/pending`, `/declarations/reasons`, `/declarations/platforms` | Beyan bekleyen yatırmalar ve katalog | `declaration:get` | — |
| POST | `/declarations/{transactionId}` | Yatırma Travel Rule beyanı; beyan edilmeden yatırma bakiyeye geçmez | `declaration:create` | — |

Tam liste: [Paribu API — llms.txt dizini](https://docs.paribu.com/api/llms.txt).

**Resmî olmayan, gerek yok:** `GET https://www.paribu.com/ticker` belgesizdir, `BTC_TL` gibi büyük harfli anahtarlar ve farklı alan adları (`lowestAsk`, `highestBid`, `percentChange`…) kullanır; 15 Ekim 2026'da çalışıyordu. Resmî `/market/ticker` varken kullanılmamalıdır.

## Gerçek zamanlı / bildirim

### BtcTurk WebSocket [RESMÎ]

- Adres: `wss://ws-feed-pro.btcturk.com/` (C# örneğinde test için `wss://ws-feed-sandbox.btctrader.com` geçiyor; sandbox'ın genel kullanım durumu FAQ'ta belirtilmemiş).
- Bağlanınca veri otomatik gelmez; abone olunmalıdır:

```json
[151, {"type": 151, "channel": "ticker", "event": "all", "join": true}]
```

Resmî "Channel, Event and Model" sayfası kanal adı olarak `orderbook`, `trade`, `ticker` verir; `tradeview` TradingView sayfasında belgelenir. `join: false` aboneliği bırakır. Olay adı paritenin büyük harfli adıdır (`BTCTRY`); `ticker` kanalında `all` tüm pariteleri verir.

| Model | Ad | Tür | Ne taşır |
|---|---|---|---|
| 401 | TickerAll | Genel | Tüm paritelerin ticker'ı (BA/AA en iyi alış/satış miktarı dahil) |
| 402 | TickerPair | Genel | Tek parite ticker |
| 422 | TradeSingle | Genel | Gerçekleşen işlem |
| 431 | OrderBookFull | Genel | Tam emir defteri |
| 432 | OrderBookDifference | Genel | Emir defteri farkı (model belgelenmiş; abone olunacak kanal adı belgede yok; `obdiff` adı docs.btcturk.com'da geçmiyor [doğrulanmadı]) |
| 423 | UserTrade | Özel | Kullanıcının eşleşen işlem detayı |
| 441 | UserOrderMatch | Özel | Emir eşleşmesi |
| 451 | OrderInsert | Özel | Emir defterine girdi |
| 452 | OrderDelete | Özel | Emir silindi (iptal sonucu) |
| 453 | OrderUpdate | Özel | Emir güncellendi |
| 100/101/114/151 | Result/Request/UserLoginResult/Subscription | Kontrol | — |

- `tradeview` kanalı: `BTCTRY_60`, `ETHTRY_1D` gibi `PARİTE_ÇÖZÜNÜRLÜK` olaylarıyla yalnızca **son mumu** gönderir (1, 5, 15, 30, 60, 240 dk; 1D, 1W, 1M) [RESMÎ].
- Bağlantı limiti: **dakikada 15 bağlantı isteği**; aşılırsa 60 sn yeni bağlantı engeli. Abonelik mesajları bu limite sayılmaz [RESMÎ].
- Heartbeat/ping davranışı dokümanda açıkça yazılı değil (belgede yok).
- Webhook, push veya RSS: **yok** (belgede yok).

### Paribu WebSocket [RESMÎ — Beta]

> Dokümana göre WebSocket API **Beta**dır; mesaj biçimi ve kanal adları genel kullanıma geçmeden değişebilir.

- Genel akış: `wss://api.paribu.com/v1/wapi/stream` — kimlik gerektirmez.
- Özel akış: `wss://api.paribu.com/v1/wapi/user` — API anahtarıyla (bkz. Kimlik doğrulama); kanal adları çıplak yazılır (ör. `orders`).
- Abonelik: `{"method": "subscribe", "channels": ["orderbook:btc_tl", "match-price:btc_tl"], "id": "req_1"}`; `unsubscribe` ile bırakılır.
- Keep-alive: sunucu **20 sn**'de bir ping gönderir; **30 sn** içinde pong gelmezse bağlantı `4002` koduyla kapanır. Her kopmada yeniden bağlanıp abone olunmalıdır.

| Kanal | Ne taşır |
|---|---|
| `orderbook:<market>` | Abonelikte tam derinlik snapshot, sonra `sq` sıralı diff; boşta ~5 sn'de bir heartbeat. Sıra atlanırsa sunucu `4003` ile kapatır |
| `book-ticker:<market>` | En iyi alış/satış fiyatı ve miktarı |
| `match-price:<market>` | Son eşleşme fiyatı |
| `matches:<market>` | Gerçekleşen işlemler |

Webhook, push veya RSS: belgede yok.

### Duyurular (ikisi için)

Yeni listeleme, bakım, çekme/yatırma durdurma gibi olaylar API'de ayrı bir "duyuru" uç noktası olarak yoktur (belgede yok). Bunlar platformların duyuru/blog sayfaları, durum sayfası (BtcTurk: [status.btcturk.com](https://status.btcturk.com/) — dokümandaki hata açıklamaları buraya yönlendirir) ve resmî sosyal medya hesaplarından takip edilir — bu hesaplar için depodaki [X](../Sosyal-Medya/X-Twitter.md) ve [Telegram](../Mesajlasma/Telegram.md) sayfalarına bakın.

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Fiyat eşiği / ani hareket (BtcTurk) | Evet | WS `ticker` kanalı, `all` olayı (401) | Herkese açık | Polling gerekmez; tek bağlantı tüm pariteler |
| Fiyat eşiği (Paribu) | Evet | WS `match-price:<market>` / `book-ticker:<market>` (veya `GET /market/ticker` polling, ağırlık 1) | Herkese açık | WS Beta; kanal adları değişebilir |
| Yeni parite listelendi (BtcTurk) | Evet (dolaylı) | `exchangeinfo`'yu periyodik çek, önceki listeyle farkla | Herkese açık | Ayrıca 401 akışında yeni sembol görünmesi |
| Yeni parite listelendi (Paribu) | Evet (dolaylı) | Resmî Exchange Config uç noktasını periyodik çek, farkla | Herkese açık | — |
| Büyük işlem / balina | Evet | BtcTurk: WS `trade` (422); Paribu: WS `matches:<market>` + miktar filtresi | Herkese açık | Parite başına abonelik |
| Emir defteri duvarı | Evet | BtcTurk: WS `orderbook` (431; 432 fark modeli belgelenmiş, kanal adı belgede yok); Paribu: WS `orderbook:<market>` (snapshot + diff) | Herkese açık | BtcTurk en fazla 100 seviye |
| Kendi emrim / bakiye (Paribu) | Evet | WS özel akış `/v1/wapi/user` veya REST polling (`/open-orders`, `/user/assets`) | Geliştirici (okuma kapsamları) | — |
| Kendi emrim eşleşti / iptal oldu | Evet | WS login (114) + 423/441/451/452/453 | Geliştirici (WebSocket izni) | İptal sonucu yalnızca 452'den kesinleşir |
| Hesaba yatırma geldi / beyan bekliyor | Evet | `users/transactions/crypto` + `crypto-deposit-declarations` polling | Geliştirici (Hesap izni) | Webhook yok |
| Duyuru (bakım, delist) | API ile hayır | Durum sayfası ([status.btcturk.com](https://status.btcturk.com/)), duyuru sayfası/sosyal medya/RSS (varsa) takibi | — | Bkz. X/Telegram sayfaları |
| SPK listesinde değişiklik | API ile hayır | SPK "Faaliyette Bulunanlar Listesi" sayfasını periyodik farklama | Herkese açık web | Ör. SPK 23.09.2026 tarihli kararla bir platformun faaliyetini kısıtladı [RESMÎ — liste dipnotu] |
| Anahtar kelime filtreleme | Uygulama tarafında | Sembol, yüzde değişim, hacim eşiği gibi kurallar | — | API filtre sunmaz |

## Hız sınırları ve fiyatlar

BtcTurk [RESMÎ — Rate Limits sayfası]:

| Uç nokta | Limit | Engel süresi | Politika |
|---|---|---|---|
| `GET /api/v2/ticker` | 600 / 60 sn | 60 sn | IP |
| `GET /api/v2/orderBook` | 180 / 60 sn | 60 sn | IP |
| `GET /api/v1/trades` | 90 / 60 sn | 60 sn | IP |
| `GET /v1/ohlcs` | 120 / 60 sn | 60 sn | IP |
| `graph-api.btcturk.com*` | 600 / 10 dk | 10 dk | IP |
| `GET /api/v1/users/balances` | 120 / 60 sn | 60 sn | IP |
| `POST` ve `DELETE /api/v1/order` | 300 / 60 sn ve 10 / 1 sn | 60 sn / 1 sn | hesap + IP |
| `GET /api/v1/order/{id}` | 900 / 60 sn ve 30 / 1 sn | 60 sn / 1 sn | hesap + IP |
| `GET /api/v1/openOrders`, `allOrders` | 300 / 60 sn | 60 sn | IP |
| `GET /api/v1/users/transactions/trade` | 120 / 60 sn | 60 sn | IP |
| `GET .../transactions/crypto`, `fiat` | 90 / 60 sn | 60 sn | IP |
| `GET /v1/exchanges` | 300 / 1 dk | 1 dk | hesap |
| WebSocket bağlantı | 15 / dk | 60 sn | — |

- Limit aşılırsa **HTTP 429**; `Retry-After` başlığı beklenecek saniyeyi verir. Süre, her uç nokta için ilk istekle başlar [RESMÎ].
- [ÇELİŞKİLİ] Eski GitHub belgesi "ticker 10 istek/100 ms, diğerleri 1 istek/100 ms" der; güncel docs.btcturk.com tablosu yukarıdaki gibidir. Güncel olan docs.btcturk.com esas alınmalı. "Recent changes" sayfasında 2022'de `openOrders` için 330 değeri geçerken güncel tablo 300 gösteriyor.
- API kullanımı ücretsizdir; işlem komisyonu (maker/taker) web sitesindeki ücret tablosundadır [RESMÎ — FAQ]. Rakamlar burada verilmez; değişkendir.
Paribu [RESMÎ — Rate Limiting sayfası]:

| Limit | Değer |
|---|---|
| Kullanıcı başına ağırlık kovası | 100.000 / dk (her dakikanın başında `:00` sıfırlanır) |
| GET ağırlıkları | `market/ticker` 1 · `orderbook`, `users/me`, `user/assets`, `order/{id}`, `withdraw/{id}` 2 · `open-orders` 5 · `transfers/history` 10 · `trades/history` 20 |
| Emir oluşturma | 25 / sn (POST/DELETE ağırlık kovasından düşmez) |
| Emir iptali | 25 / sn |

- Her ağırlıklı GET yanıtında `X-Quota-Remaining` başlığı kalan ağırlığı gösterir.
- Aşımda **HTTP 429**, `Retry-After` başlığı ve gövdede `retry_after` (dakika limiti için 1–60 sn, saniye limiti için 1) döner.
- Daha yüksek limitler için dokümanda bir VIP programı anılır. API kullanım ücreti dokümanda geçmez; işlem komisyonları platformun ücret tablosundadır.

## Resmî olmayan yollar ve riskler

- **Paribu `www.paribu.com/ticker`**: Belgesiz; haber verilmeden değişebilir veya kapanabilir [TAHMİN]. Resmî `api.paribu.com/market/ticker` aynı işi gördüğü için gerek yoktur.
- **Paribu `v3.paribu.com` iç uçları**: Web/mobil istemcinin kullandığı belgelenmemiş uçlardır; 15 Ekim 2026 denemesinde Cloudflare bot koruması nedeniyle **403** döndü [doğrudan gözlem]. Resmî `api.paribu.com` varken bu uçlara gerek yoktur. Oturum belirteci kopyalayarak hesap işlemi yapmak kullanım koşullarını ihlal edebilir ve hesap güvenliği riski taşır [TAHMİN].
- **BtcTurk web iç uçları**: Resmî API zaten kapsamlı olduğu için gerek yoktur.
- **Hukuki çerçeve — 7518 sayılı Kanun** [RESMÎ — Resmî Gazete 2 Temmuz 2024; 26 Haziran 2024'te kabul]: 6362 sayılı Sermaye Piyasası Kanunu'na kripto varlık hizmet sağlayıcı (KVHS) hükümleri eklendi.
  - Platformların kuruluş ve faaliyeti için **SPK izni** gerekir; bilgi sistemleri ve teknolojik altyapı **TÜBİTAK** kriterlerine uymalıdır (md. 35/B).
  - Müşteri kripto varlıkları kural olarak kendi cüzdanlarında; aksi hâlde SPK yetkili saklama kuruluşu veya BDDK onaylı bankada tutulur; müşteri varlıkları platformun mal varlığından ayrıdır (md. 35/C).
  - İzinsiz KVHS faaliyeti 3–5 yıl hapis ve adli para cezası (md. 109/A); SPK izinsiz faaliyete erişim engeli getirebilir (md. 99/A).
  - Yurt dışı platformların Türkiye'deki kişilere yönelik faaliyeti ve kripto ATM'ler için 3 aylık sona erdirme süresi tanındı (geçici md. 11).
  - **API'ye etkisi**: Kanun doğrudan API standardı getirmez [RESMÎ — kanun metninde yok]. Dolaylı etkiler: (1) güvenlik/iç kontrol ve TÜBİTAK altyapı şartları API anahtarı, IP kısıtı gibi kontrolleri sıkılaştırır [TAHMİN]; (2) "transfer mesajı" ve Travel Rule yükümlülükleri iki platformda da API'ye yansımıştır: BtcTurk'te `crypto-deposit-declarations`, Paribu'da `/declarations/...` (Deposit Travel Rule Declarations) uçları; beyan edilmeden yatırma bakiyeye geçmez [RESMÎ — iki dokümanda]. Para çekmede fark vardır: BtcTurk API'de çekme uç noktası yok, Paribu API'de `POST /withdraw` (`withdraw:create` kapsamı) Travel Rule alanlarıyla birlikte var [RESMÎ]; (3) Türkiye'den yurt dışı platform API'lerine erişim kısıtlanabildiği için yerli platform API'lerinin önemi artar [TAHMİN].
- **SPK listesi durumu** [RESMÎ — spk.gov.tr, 15 Ekim 2026]: "Faaliyette Bulunanlar Listesi (Geçici Liste)"de *Btcturk Kripto Varlık Alım Satım Platformu AŞ*, *Btcturk Dijital Saklama Yönetim AŞ (Saklama Başvurusu)*, *Paribu Kripto Varlık Alım Satım Platformu AŞ* ve *Paribu Kripto Varlık Saklama Kuruluşu AŞ (Saklama Başvurusu)* yer alıyor. SPK sayfası bu listede bulunmanın **ilgili mevzuat kapsamında yetkili olunduğu anlamına gelmediğini** açıkça belirtir. Kesin izin durumu için SPK'nın güncel duyuruları kontrol edilmelidir.
- **Genel güvenlik**: Yalnızca gereken izinleri verin (takip için "Alım-Satım" iznine gerek yoktur), anahtarı IP'ye bağlayın, secret'ı kaynak koda ve depoya koymayın.

## SDK ve kütüphaneler

| Ad | Dil | Tür | Not |
|---|---|---|---|
| [BTCTrader/broker-api-csharp-v2](https://github.com/BTCTrader/broker-api-csharp-v2) | C# / .NET | Resmî (BTCTrader GitHub) | Son güncelleme Eylül 2021 [RESMÎ — GitHub]; güncel uçlarla (deposit declarations, 452 iptal akışı) uyumu doğrulanmalı |
| [BTCTrader/broker-api-csharp](https://github.com/BTCTrader/broker-api-csharp) | C# | Resmî, eski | Eski API sürümü |
| docs.btcturk.com kod örnekleri | C#, Go, Node.js, Python | Resmî örnek | 2022'de C# WebSocket, Go ve Node.js örnekleri eklendi [RESMÎ — Recent changes] |
| [CCXT](https://github.com/ccxt/ccxt) (`btcturk`) | JS/TS, Python, PHP, C# | Topluluk | BtcTurk listede, "certified" değil, CCXT Pro (WebSocket) desteği yok [3. TARAF — CCXT wiki]; Paribu CCXT'de **yok** |
| .NET'te elle | C# | — | İki platform için de `HttpClient` + `System.Security.Cryptography.HMACSHA256` + `ClientWebSocket` ile yazılır; imza adımları yukarıda |

Paribu CCXT'de yok ve resmî SDK yok; ancak resmî REST/WS dokümanı (Python ve diğer dillerde imza örnekleriyle) olduğu için istemci `HttpClient` + `HMACSHA256` ile elle yazılabilir.

## Postman / OpenAPI / koleksiyonlar

- BtcTurk: Resmî OpenAPI/Swagger dosyası veya Postman koleksiyonu docs.btcturk.com'da bulunamadı (belgede yok). Doküman Docusaurus tabanlıdır; uç nokta sayfaları örnek istek/yanıt içerir.
- Paribu: Resmî doküman GitBook tabanlıdır; sayfaların Markdown sürümleri ve `llms.txt` dizini vardır. OpenAPI/Postman dosyası bulunamadı (belgede yok).

## Depoda ilgili sayfalar

- [Bybit ve Kraken API](Bybit-ve-Kraken.md) — global borsalarla karşılaştırma (WebSocket, limitler).
- [Telegram API](../Mesajlasma/Telegram.md) — borsa duyuru kanallarını takip ve uyarı botu.
- [X (Twitter) API](../Sosyal-Medya/X-Twitter.md) — borsaların resmî hesaplarından duyuru takibi.
- [Blockchain](../../Programlama/Blockchain/) — zincir tarafı (cüzdan, transfer) konuları.

## Kaynaklar

- [BtcTurk API dokümanı](https://docs.btcturk.com/) — resmî ana doküman (erişim: 15 Ekim 2026)
- [BtcTurk — General Information](https://docs.btcturk.com/docs/general-information) — taban URL, genel kurallar (erişim: 15 Ekim 2026)
- [BtcTurk — Authentication V1](https://docs.btcturk.com/docs/authentication/authentication-v1) — REST imza yöntemi (erişim: 15 Ekim 2026)
- [BtcTurk — API Access Permissions](https://docs.btcturk.com/docs/api-access-permissions) — anahtar üretimi ve izinler (erişim: 15 Ekim 2026)
- [BtcTurk — Rate Limits](https://docs.btcturk.com/docs/private-endpoints/rate-limits) — güncel limit tablosu (erişim: 15 Ekim 2026)
- [BtcTurk — All Public Endpoints](https://docs.btcturk.com/docs/public-endpoints/all-public-endpoints) — herkese açık uç listesi (erişim: 15 Ekim 2026)
- [BtcTurk — All Private Endpoints](https://docs.btcturk.com/docs/private-endpoints/all-private-endpoints) — özel uç listesi (erişim: 15 Ekim 2026)
- [BtcTurk — Crypto Deposit Declarations](https://docs.btcturk.com/docs/private-endpoints/crypto-deposit-declarations) — Travel Rule beyan uçları (erişim: 15 Ekim 2026)
- [BtcTurk — WebSocket Authentication](https://docs.btcturk.com/docs/websocket-feed/authentication) — WS adresi ve login (erişim: 15 Ekim 2026)
- [BtcTurk — WebSocket Models](https://docs.btcturk.com/docs/websocket-feed/models) — model numaraları, abonelik biçimi (erişim: 15 Ekim 2026)
- [BtcTurk — Channel, Event and Model](https://docs.btcturk.com/docs/websocket-feed/channel-event-and-model) — kanal/olay mantığı (erişim: 15 Ekim 2026)
- [BtcTurk — TradingView](https://docs.btcturk.com/docs/websocket-feed/tradingview) — `tradeview` kanalı (erişim: 15 Ekim 2026)
- [BtcTurk — Recent Changes](https://docs.btcturk.com/docs/recent-changes) — değişiklik günlüğü, son kayıt 6 Mayıs 2024 (erişim: 15 Ekim 2026)
- [BtcTurk — FAQ](https://docs.btcturk.com/docs/faq-frequently-asked-questions) — 401/429, sürümler, veri merkezi (erişim: 15 Ekim 2026)
- [BTCTrader/broker-api-docs (GitHub)](https://github.com/BTCTrader/broker-api-docs) — eski/white-label belge, tarihsel bilgi (erişim: 15 Ekim 2026)
- [7518 sayılı Kanun — Resmî Gazete, 2 Temmuz 2024](https://www.resmigazete.gov.tr/eskiler/2024/07/20240702-1.htm) — Sermaye Piyasası Kanunu'nda KVHS değişiklikleri (erişim: 15 Ekim 2026)
- [SPK — Kripto Varlık Hizmet Sağlayıcılar](https://spk.gov.tr/kurumlar/kripto-varlik-hizmet-saglayicilar) — başvuru süreçleri ve listeler (erişim: 15 Ekim 2026)
- [SPK — Faaliyette Bulunanlar Listesi (Geçici)](https://spk.gov.tr/kurumlar/kripto-varlik-hizmet-saglayicilar/faaliyette-bulunanlar-listesi) — BtcTurk ve Paribu kayıtları (erişim: 15 Ekim 2026)
- [BtcTurk — Cancel Order](https://docs.btcturk.com/docs/private-endpoints/cancel-order) — iptal akışı ve durum sayfası bağlantısı (erişim: 15 Ekim 2026)
- [BtcTurk durum sayfası](https://status.btcturk.com/) — bakım ve kesinti duyuruları (erişim: 15 Ekim 2026)
- [Paribu API — Introduction](https://docs.paribu.com/api/introduction) — resmî API dokümanı ana sayfası (erişim: 15 Ekim 2026)
- [Paribu API — llms.txt](https://docs.paribu.com/api/llms.txt) — tüm doküman sayfalarının dizini (erişim: 15 Ekim 2026)
- [Paribu — Obtaining API Keys](https://docs.paribu.com/api/getting-started/obtaining-api-keys) — anahtar üretimi ve izin ön ayarları (erişim: 15 Ekim 2026)
- [Paribu — Authentication and Signing](https://docs.paribu.com/api/getting-started/authentication-and-signing) — HMAC imza yöntemi (erişim: 15 Ekim 2026)
- [Paribu — Scopes and Permissions](https://docs.paribu.com/api/getting-started/scopes-and-permissions) — uç nokta/kapsam eşlemesi (erişim: 15 Ekim 2026)
- [Paribu — Rate Limiting](https://docs.paribu.com/api/error-handling/rate-limiting) — ağırlık kovası ve limitler (erişim: 15 Ekim 2026)
- [Paribu — Ticker](https://docs.paribu.com/api/market-data/ticker) — `/market/ticker` uç noktası (erişim: 15 Ekim 2026)
- [Paribu — WebSocket API Overview](https://docs.paribu.com/api/streams-v2/overview) — WS adresleri, keep-alive, abonelik (Beta) (erişim: 15 Ekim 2026)
- [Paribu — Public Streams](https://docs.paribu.com/api/streams-v2/public-streams) — genel WS kanalları (erişim: 15 Ekim 2026)
- [Paribu — Deposit Travel Rule Declarations](https://docs.paribu.com/api/deposit-and-withdrawals/travel-rule) — yatırma beyanı uçları (erişim: 15 Ekim 2026)
- [CCXT Exchange Markets](https://github.com/ccxt/ccxt/wiki/Exchange-Markets) — 3. taraf kütüphane desteği (erişim: 15 Ekim 2026)
