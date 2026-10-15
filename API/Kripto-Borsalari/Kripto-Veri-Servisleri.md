# Kripto Veri Servisleri API (CoinGecko, CoinMarketCap, CoinDesk Data, Etherscan, Alchemy/Infura)

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (hepsinin resmî API'si var; anahtarsız erişim giderek daralıyor)

**Etiketler:** [RESMÎ] = sağlayıcının kendi dokümanı/fiyat sayfası · [3. TARAF] = topluluk/haber kaynağı veya genel bilgi · [TAHMİN] = çıkarım, doğrulanmadı · [ÇELİŞKİLİ] = kaynaklar birbirini tutmuyor · [TEST] = 15 Ekim 2026'da anahtarsız `curl` isteğiyle bizzat denendi.

## Özet

Bu sayfa borsa API'si değil (bkz. [Bybit ve Kraken](Bybit-ve-Kraken.md)), **toplayıcı (aggregator) ve zincir üstü (on-chain) veri servisleri** içindir. CoinGecko ve CoinMarketCap, binlerce coin/borsa için fiyat, piyasa değeri, trend ve yeni listeleme verisi verir; ikisinin de ücretsiz katmanı ve ücretli planlarda WebSocket'i var, CoinGecko ayrıca **webhook** (yeni listeleme, büyük fiyat hareketi) sunuyor. CoinDesk Data (eski CryptoCompare/CCData) fiyat + **kripto haber** akışı verir; anahtar zorunlu ve ücretsiz katman 21.05.2026'da kaldırıldığı için CoinDesk haber API'si dahil artık ücretli [3. TARAF]. Etherscan API V2 tek anahtarla 60+ EVM zincirinde adres/işlem/token transferi sorgulatır ama push (webhook/WebSocket) yoktur; cüzdan takibi için gerçek zamanlı bildirim Alchemy Webhooks veya düğüm sağlayıcının (Alchemy/Infura) `eth_subscribe` WebSocket'iyle yapılır.

## Erişim seviyeleri

### CoinGecko

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey; `api.coingecko.com/api/v3` | Demo ile aynı uç noktalar alt kümesi ("Demo / Keyless API") [RESMÎ] | IP bazlı, aynı IP'yi paylaşanlarla ortak; sayısal limit belgede yok [RESMÎ]. 15.10.2026'da `/ping` ve `/simple/price` anahtarsız 200 döndü [TEST] |
| Geliştirici hesabı (Demo) | Ücretsiz hesap + Demo anahtarı | Uç noktaların alt kümesi: 66 (46 CoinGecko + 20 on-chain) [RESMÎ — listeden sayıldı], on-chain (GeckoTerminal) dahil; 1 yıl günlük geçmiş [RESMÎ] | 0 $; 10.000 çağrı/ay, 100 çağrı/dk [RESMÎ] |
| İşletme onayı | Yok — self-servis | — | — |
| Ücretli | Basic / Analyst / Lite / Pro / Enterprise | Tüm uç noktalar ("85+"), WebSocket, webhook, `/coins/list/new` (Analyst+), uzun geçmiş [RESMÎ] | Basic 35 $/ay (100k kredi, 300/dk) · Analyst 129 $ (500k, 500/dk) · Lite 499 $ (2M) · Pro 999 $ (5M, 1000/dk) · Enterprise teklif [RESMÎ] |
| Resmî olmayan | Web sitesinin iç JSON uç noktaları | Sitede görülen veriler | ToS riski, Cloudflare engeli (hata 1020) [RESMÎ hata kodu]; resmî ücretsiz katman varken gereksiz |

### CoinMarketCap (CMC)

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | `https://pro-api.coinmarketcap.com/public-api` öneki, anahtar başlığı **gönderilmez**, yalnızca GET | 18 standart (simple price, quotes, listings, map, kategoriler, global metrics, Fear & Greed, CMC100/CMC20, Altcoin Season) + 17 DEX uç noktası [RESMÎ] | IP bazlı ortak havuz [RESMÎ]. 15.10.2026'da sunucumuzun IP'si `error_code 1022 – anonymous access limit` aldı [TEST] — paylaşılan IP'lerde (bulut, VPN) güvenilmez |
| Geliştirici hesabı (Basic) | Ücretsiz hesap + `X-CMC_PRO_API_KEY` | Tam Pro + DEX katalog alt kümesi (60+ uç nokta), 1 ay gün içi / 1 yıl günlük geçmiş, ticari kullanım izinli [RESMÎ] | 0 $; 15.000 kredi/ay, 50 istek/dk [RESMÎ] |
| İşletme onayı | Yok — self-servis | — | — |
| Ücretli | Builder / Startup / Growth / Professional / Enterprise | WebSocket (Startup+), 2010'dan itibaren geçmiş, 80–90+ uç nokta [RESMÎ] | Builder 29 $ (150k, 300/dk) · Startup 79 $ (450k, 600/dk) · Growth 299 $ (2M, 750/dk) · Professional 699 $ (5M, 1200/dk) · Enterprise özel [RESMÎ]. Eski "Hobbyist/Standard" planları artık listede yok [RESMÎ] |
| Resmî olmayan | `api.coinmarketcap.com/data-api/v3/...` (sitenin kendi kullandığı uç noktalar) | Sitede görünen her şey | ToS dışı, haber vermeden değişir, bot korumasına takılır [3. TARAF] |

### CoinDesk Data (eski CryptoCompare / CCData)

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | — | **Yok.** `data-api.coindesk.com` ve eski `min-api.cryptocompare.com` anahtarsız isteğe `401 – API key required` döndürüyor [TEST] | — |
| Geliştirici hesabı | Ücretsiz katman 21 Mayıs 2026'da kaldırıldı; anahtar yalnızca ücretli abonelikle (satış görüşmesi) [3. TARAF, resmî duyuru doğrulanamadı] | Spot/endeks fiyatları, OHLCV, haber (`/news/v1/...`), on-chain, türev verileri [3. TARAF] | Ücretsiz seçenek yok; aboneliği olmayan hesaplar veri alamıyor [3. TARAF] |
| Ücretli / kurumsal | Ticari lisans | WebSocket ("Data Streamer"), yüksek limit [3. TARAF] | Teklif bazlı; herkese açık fiyat listesi yok, tüm planlar satış ekibiyle [3. TARAF] |
| Resmî olmayan | — | Anlamlı bir alternatif yok | — |

### Etherscan API V2

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | — | **Yok.** Anahtarsız V2 isteği `Missing/Invalid API Key` döner; V1 (`/api` chainid'siz) `deprecated V1 endpoint` hatası döner [TEST] | — |
| Geliştirici hesabı (Free) | etherscan.io hesabı → `myapikey` → anahtar | Seçili zincirler (Ethereum, Polygon, Arbitrum, Linea, Sonic, Unichain, Monad, HyperEVM…); **Base, BNB Chain, OP Mainnet, Avalanche, Gnosis ücretli** [RESMÎ] | 0 $; 3 çağrı/sn, 100.000/gün; limit tüm anahtarlarınızda **toplam** [RESMÎ] |
| Ücretli | Lite / Standard / Advanced / Professional / Pro Plus | Tüm zincirler; Standard+ "PRO" uç noktaları [RESMÎ] | Lite 49 $ (5/sn, 100k/gün) · Standard 199 $ (10/sn, 200k) · Advanced 299 $ (20/sn, 500k) · Professional 399 $ (30/sn, 1M) · Pro Plus 899 $ (30/sn, 1,5M) [RESMÎ] |
| Not | — | Robinhood Chain (4663) ve Arc (5042): 15.10.2026'ya kadar ücretsiz, 16.10.2026'dan itibaren Lite+; kaynak kodu/ABI uç noktaları Free'de kalıyor. ApeChain (33139, Curtis 33111) ve Blast (81457, Sepolia 168587773) için API desteği 31.10.2026'dan itibaren deprecated [RESMÎ] | — |

### Düğüm (RPC) sağlayıcıları — kısa

| Sağlayıcı | Ücretsiz | Ücretli | Takip için öne çıkan |
|---|---|---|---|
| Alchemy | 30M CU/ay, 300 CU/sn (~15 istek/sn), 5 uygulama, **5 webhook** [RESMÎ] | Pay As You Go 0,525 $/1M CU, 100 webhook; Enterprise özel [RESMÎ] | Webhooks (Address Activity, NFT Activity, Custom/GraphQL) |
| Infura (MetaMask/Consensys) | Core: 3M kredi/gün, 500 kredi/sn [RESMÎ]; aynı sayfanın SSS'si 6M/gün, 2000/sn diyor [ÇELİŞKİLİ] | Developer 50 $ (15M/gün), Team 225 $ (75M/gün), Enterprise [RESMÎ] | Standart JSON-RPC + WebSocket `eth_subscribe` [3. TARAF] |

## Kimlik doğrulama

| Servis | Taban URL | Anahtar nasıl gönderilir |
|---|---|---|
| CoinGecko Demo | `https://api.coingecko.com/api/v3/` | Başlık `x-cg-demo-api-key` (önerilen) veya sorgu `x_cg_demo_api_key` [RESMÎ] |
| CoinGecko Pro (ücretli) | `https://pro-api.coingecko.com/api/v3/` | Başlık `x-cg-pro-api-key` veya sorgu `x_cg_pro_api_key` [RESMÎ]. Yanlış anahtar/URL eşleşmesi hata 10010/10011 verir [RESMÎ] |
| CoinGecko on-chain | Aynı taban + `/onchain/...` | Aynı anahtar [RESMÎ] |
| CMC | `https://pro-api.coinmarketcap.com` | Başlık `X-CMC_PRO_API_KEY` (önerilen) veya sorgu `CMC_PRO_API_KEY` [RESMÎ]; anahtarsız katman `/public-api` öneki ile |
| CMC WebSocket | `wss://pro-stream.coinmarketcap.com/v1` | El sıkışmada `X-CMC_PRO_API_KEY` başlığı [RESMÎ] |
| CoinDesk Data | `https://data-api.coindesk.com` | API anahtarı zorunlu [TEST]; yöntem (`api_key` sorgu veya `Authorization: Apikey ...` başlığı) [3. TARAF] |
| Etherscan V2 | `https://api.etherscan.io/v2/api` | Sorgu parametresi `apikey=` + zorunlu `chainid=` (1 Ethereum, 137 Polygon, 42161 Arbitrum…) [RESMÎ] |
| Alchemy / Infura | `https://<ağ>.g.alchemy.com/v2/<KEY>`, `https://mainnet.infura.io/v3/<KEY>` | Anahtar URL içinde [3. TARAF] |

Güvenlik: anahtarlar yalnızca sunucuda tutulur. CoinGecko tarayıcıdan çağrıda CORS sorunu olabileceğini, isteklerin arka uçtan proxy'lenmesini söyler [RESMÎ]; sorgu parametresindeki anahtar loglara düşer, başlık tercih edilir [RESMÎ].

## Temel uç noktalar

### CoinGecko (tam liste: [Pro endpoint overview](https://docs.coingecko.com/reference/endpoint-overview), [Demo endpoint overview](https://docs.coingecko.com/demo/reference/endpoint-overview))

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/ping` | Sunucu durumu | Kimliksiz+ | [TEST] |
| GET | `/simple/price?ids=bitcoin&vs_currencies=usd` | Bir/çok coin fiyatı | Kimliksiz/Demo+ | Takipte fiyat alarmı için temel [RESMÎ] |
| GET | `/simple/token_price/{id}` | Kontrat adresine göre token fiyatı | Demo+ | [RESMÎ] |
| GET | `/coins/markets` | Fiyat, piyasa değeri, hacim listesi | Demo+ | [RESMÎ] |
| GET | `/coins/{id}` | Coin metaverisi + piyasa verisi (sosyal bağlantılar dahil) | Demo+ | [RESMÎ] |
| GET | `/coins/list` | Tüm coin ID eşlemesi | Demo+ | [RESMÎ] |
| GET | `/coins/list/new` | Son listelenen 200 coin | **Analyst+** | Yeni listeleme takibi [RESMÎ] |
| GET | `/search/trending` | Son 24 saatte trend coin/NFT/kategori | Demo+ | [RESMÎ] |
| GET | `/global` | Toplam piyasa verisi | Demo+ | [RESMÎ] |
| GET | `/onchain/networks/new_pools`, `/onchain/networks/{network}/new_pools` | Yeni DEX havuzları | Demo+ (on-chain bölümü Demo listesinde) | Yeni token/havuz takibi [RESMÎ] |
| GET | `/onchain/networks/trending_pools` | Trend DEX havuzları | Demo+ | [RESMÎ] |
| GET | `/onchain/simple/networks/{network}/token_price/{addresses}` | DEX token fiyatı | Demo+ | `/onchain/simple/token_price/multi` yalnızca Enterprise [RESMÎ] |
| GET | `/key` | Kredi/limit kullanımı | Ücretli | [RESMÎ] |

### CoinMarketCap (tam liste: [Endpoint overview](https://coinmarketcap.com/api/documentation/pro-api-reference/endpoint-overview))

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/v1/cryptocurrency/map` | Coin ID eşlemesi | Kimliksiz/Basic+ | Her zaman 1 kredi [RESMÎ] |
| GET | `/v1/cryptocurrency/listings/latest` (anahtarsız: `/v3/cryptocurrency/listings/latest`) | Piyasa değerine göre sıralı liste | Basic+ (v1); kimliksiz yalnızca v3 [RESMÎ] | 100 veri noktası başına +1 kredi [RESMÎ] |
| GET | `/v2/cryptocurrency/quotes/latest` (anahtarsız: `/v3/cryptocurrency/quotes/latest`) | Güncel fiyat/piyasa verisi | Basic+ (v2); kimliksiz yalnızca v3 [RESMÎ] | Anahtarsız tam yol: `https://pro-api.coinmarketcap.com/public-api/v3/cryptocurrency/quotes/latest`. Anahtarsız 18 yolun tam listesi "Keyless Public API" sayfasında; diğerleri ör. `/v2/simple/price`, `/v3/fear-and-greed/latest`, `/v3/fear-and-greed/historical` [RESMÎ] |
| GET | `/v2/cryptocurrency/info` | Metaveri (web sitesi, sosyal hesaplar) | Kimliksiz/Basic+ | [RESMÎ — kategori] |
| GET | `trending/*` (latest, gainers-losers, most-visited) | Trend/yükselen-düşen | Plan şartı belgede açık değil | [RESMÎ — kategori adı] |
| GET | Global Metrics + Fear & Greed (latest/historical) | Toplam piyasa, dominans, korku-açgözlülük endeksi | Kimliksiz+ | [RESMÎ] |
| GET | Content (4 uç nokta: başlıklar, haberler, top posts, yorumlar) | CMC haber ve topluluk gönderileri | Plan şartı belgede yok | Haber takibi için [RESMÎ — kategori] |
| GET | Community (trend konular, trend tokenlar) | Topluluk trendleri | Plan şartı belgede yok | [RESMÎ — kategori] |
| GET | DEX Token (16 uç nokta: lookup, price, liquidity, pools, trending, new/meme tokens, gainers/losers) | DEX token verisi | Kimliksiz alt küme / Basic+ | [RESMÎ] |
| GET | `/v1/key/info` | Kredi kullanımı | Basic+ | Kredi harcamaz [RESMÎ] |

Kredi kuralı: başarılı (200) her çağrı 1 kredi; hata ve hesap çağrıları sayılmaz; `convert` ile istenen her ek para birimi +1 kredi; ücretsiz Basic günlük/aylık UTC gece yarısı sıfırlanır [RESMÎ].

### Etherscan V2 (tam liste: [Endpoint overview](https://docs.etherscan.io/endpoint-overview))

Örnek: `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=0x...&startblock=0&endblock=999999999&page=1&offset=100&sort=desc&apikey=KEY` [RESMÎ]

| Metot | Uç nokta (`module` / `action`) | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `account` / `balance` | Native bakiye | Free+ | [RESMÎ] |
| GET | `account` / `txlist` | Adresin normal işlemleri | Free+ | `page`/`offset` ile sayfalama; maksimum kayıt belgede yok [RESMÎ] |
| GET | `account` / `tokentx`, `tokennfttx` | ERC-20 / NFT transferleri | Free+ | Cüzdan takibi için ana uç nokta [RESMÎ] |
| GET | `logs` / `getLogs` (adres + topic filtreleri) | Kontrat olay logları | Free+ | Kontrat olayı takibi [RESMÎ] |
| GET | `contract` / `getsourcecode`, `getabi` | Doğrulanmış kaynak/ABI | Free+ | [RESMÎ] |
| GET | `gastracker` / `gasoracle` | Gas fiyatı önerisi | Free+ | [RESMÎ] |
| GET | `chainlist` | Desteklenen zincirler | Free+ | [RESMÎ] |
| GET | Metadata: `getaddresstag`; label export: `getlabelmasterlist-v2`, `exportaddresstags-v2` | Adres etiketleri (borsa, exploit vb.) | Yalnızca Pro Plus (899 $/ay) [RESMÎ] | Ayrı "Metadata" katmanı; `getaddresstag` 2 çağrı/sn ile sınırlı [RESMÎ] |

## Gerçek zamanlı / bildirim

| Servis | Mekanizma | Ayrıntı |
|---|---|---|
| CoinGecko WebSocket | Kanallar: `CGSimplePrice` (C1, coin fiyatı), `OnchainSimpleTokenPrice` (G1), `OnchainTrade` (G2, havuz işlemleri), `OnchainOHLCV` (G3) | Yalnızca ücretli (Basic: 5 bağlantı, Analyst+: 10); soket başına kanal başına 100 abonelik; **yanıt başına 0,1 kredi**; sunucu 10 sn'de ping, 20 sn'de pong yoksa kapatır; **beta, SLA dışı** [RESMÎ]. Şema: [AsyncAPI](https://docs.coingecko.com/websocket/asyncapi.json) |
| CoinGecko Webhooks | Olaylar: `cg.coin.listed` (yeni listeleme), `cg.coin.price.moved` (ilk 100 coinde belirgin hareket), `cg.coin.exchange.added` (yeni borsada işlem), `cg.coin.info.updated` (metaveri) | Basic: 1 uç nokta, Analyst+: 5; **teslim edilen olay başına 10 kredi**, yeniden denemeler ücretsiz; HMAC-SHA256 imza: `x-cg-signature` = HMAC(`{timestamp}:{event_id}:{ham_gövde}`), başlıklar `x-cg-timestamp`, `x-cg-event-id`; 14 başarısız deneme (~24 saat) veya 12 saatte 300 başarısızlıkta otomatik kapanır; beta [RESMÎ] |
| CMC WebSocket | `wss://pro-stream.coinmarketcap.com/v1`; kanallar `market@crypto_latest_price` (ilk 500 ~5 sn, diğerleri ~15 sn), `onchain@transaction`, `onchain@token_agg_event`, `onchain@liquidity_event`, `onchain@kline`, `onchain@token_metric`, `onchain@pool_metric`, `onchain@unique_trader`, `onchain@holders_metrics`, `onchain@holder_wallet_update` | Startup+; anahtar başına 10 bağlantı, bağlantı başına 100 abonelik; **mesaj başına 0,025 kredi**; ~10 sn'de `ping`; beta, SLA dışı [RESMÎ] |
| CMC webhook | — | Belgede yok |
| CoinDesk Data | "Data Streamer" WebSocket | Varlığı [3. TARAF]; plan/limit resmî sayfadan doğrulanamadı |
| Etherscan | — | API'de webhook/WebSocket **yok** (belge indeksinde bulunmadı) [RESMÎ]. Sitedeki "Address Watch List" e-posta bildirimi web arayüzü özelliğidir, API değildir [3. TARAF] |
| Alchemy Webhooks | Address Activity (100k altı cüzdan), NFT Activity, Custom (GraphQL filtreli) | İmza `X-Alchemy-Signature` (gövdenin HMAC-SHA256'sı); 200 dışı yanıtta üstel geri çekilme: Free/PAYG 10 dk, Enterprise 1 saat; kaynak IP'ler 54.236.136.17, 34.237.24.169 [RESMÎ] |
| Alchemy / Infura WebSocket | JSON-RPC `eth_subscribe` (`newHeads`, `logs`, `newPendingTransactions`) | Ethereum standart RPC [3. TARAF] |
| RSS | CoinDesk/CMC haber siteleri RSS sunar | API değil, haber takibi için ucuz yol [3. TARAF] |

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Fiyat eşiği / ani hareket | Evet | CoinGecko `/simple/price` yoklama (poll) veya WebSocket C1; CMC `market@crypto_latest_price`; CoinGecko webhook `cg.coin.price.moved` (yalnızca ilk 100) | Yoklama: kimliksiz/Demo; push: ücretli | Demo 100/dk ile ~50 coin'i dakikada bir toplu sorgulamak kolay (tek çağrıda çok `ids`) [TAHMİN] |
| Yeni coin listelendi | Evet | CoinGecko webhook `cg.coin.listed` veya `/coins/list/new` | Ücretli (webhook Basic+, endpoint Analyst+) | Ücretsizde `/coins/list` farkını periyodik karşılaştırma [TAHMİN] |
| Coin yeni borsada listelendi | Evet | CoinGecko webhook `cg.coin.exchange.added` | Basic+ | [RESMÎ] |
| Yeni DEX havuzu / token (memecoin takibi) | Evet | CoinGecko `/onchain/networks/{network}/new_pools` (Demo); CMC DEX "new tokens"; WebSocket G2/`onchain@transaction` | Demo+/ücretli | Spam/scam token çok; CMC "security detail" uç noktası filtrelemeye yardım eder [RESMÎ uç nokta] |
| Trend coinler | Evet | CoinGecko `/search/trending`, CMC `trending/*`, CMC Community trend tokenlar | Kimliksiz/ücretsiz+ | [RESMÎ] |
| Kripto haber / gönderi | Kısmen | CoinDesk Data news uç noktaları (CoinDesk haber API'si artık ücretli); CMC Content (haber + top posts); haber siteleri RSS | Anahtar gerekir; CoinDesk için ücretli abonelik | Anahtar kelime filtrelemesi istemci tarafında yapılır [TAHMİN] |
| Proje sosyal hesabı değişti (web, X, Telegram linki) | Evet | CoinGecko webhook `cg.coin.info.updated`; `/coins/{id}` ve CMC `info` içindeki sosyal linkler | Ücretli / Demo | Sosyal hesap listesini diğer platform takibine beslemek için kullanışlı [TAHMİN] |
| Belirli cüzdanın hareketi (whale takibi) | Evet | Gerçek zamanlı: Alchemy Address Activity webhook; yoklama: Etherscan `txlist`/`tokentx` (`sort=desc`) | Alchemy Free (5 webhook) / Etherscan Free | Etherscan Free'de Base/BNB/OP yok [RESMÎ] |
| Kontrat olayı (ör. büyük transfer, mint) | Evet | `eth_subscribe logs` (WebSocket) veya Alchemy Custom webhook; yoklama: Etherscan `getLogs` | Free+ | [3. TARAF]/[RESMÎ] |
| Adres etiketi (borsa/hacker cüzdanı mı?) | Evet | Etherscan Metadata / `getaddresstag` | Pro Plus [RESMÎ] | Filtreleme için önemli |
| Korku-açgözlülük, piyasa rejimi | Evet | CMC Fear & Greed (kimliksiz bile) | Kimliksiz+ | [RESMÎ] |

## Hız sınırları ve fiyatlar

| Servis / plan | Aylık ücret | Kota | Hız |
|---|---|---|---|
| CoinGecko Demo | 0 $ | 10k çağrı/ay | 100/dk |
| CoinGecko Basic / Analyst / Lite / Pro | 35 / 129 / 499 / 999 $ (yıllık ödemede ~%20 indirim) | 100k / 500k / 2M / 5M kredi | 300 / 500 / 500 / 1000 dk |
| CMC Basic / Builder / Startup / Growth / Professional | 0 / 29 / 79 / 299 / 699 $ | 15k / 150k / 450k / 2M / 5M kredi | 50 / 300 / 600 / 750 / 1200 dk |
| Etherscan Free / Lite / Standard / Advanced / Professional / Pro Plus | 0 / 49 / 199 / 299 / 399 / 899 $ | 100k / 100k / 200k / 500k / 1M / 1,5M çağrı/gün | 3 / 5 / 10 / 20 / 30 / 30 sn |
| Alchemy Free / PAYG | 0 $ / 0,525 $ per 1M CU | 30M CU/ay / kullanım kadar | 300 CU/sn / 10.000 CU/sn |
| Infura Core / Developer / Team | 0 / 50 / 225 $ | 3M / 15M / 75M kredi/gün | 500 / 4k / 40k kredi/sn |

Tümü [RESMÎ] fiyat sayfalarından, 15.10.2026. Notlar:
- CoinGecko'da 4xx/5xx hatalı istekler de limite sayılır [RESMÎ]; CMC'de hatalar kredi harcamaz [RESMÎ].
- CoinGecko hata kodları: 429 (limit), 10002 (anahtar yok), 10005 (planınızda yok), 1020 (CDN firewall) [RESMÎ].
- CMC pricing kartları Growth+ için "tüm uç noktalar" derken karşılaştırma tablosu "90+" diyor [ÇELİŞKİLİ].
- CoinDesk Data: ücretsiz katman 21.05.2026'da kaldırıldı, fiyatlar herkese açık değil (satış görüşmesi) [3. TARAF]; resmî sayfa okunamadığı için resmî duyuru doğrulanamadı.

## Resmî olmayan yollar ve riskler

- **Sitelerin iç JSON uç noktaları** (ör. CMC `api.coinmarketcap.com/data-api/v3/...`, CoinGecko web sayfalarının arka uç çağrıları): Anahtarsız çalışabilir ama ToS dışı, haber vermeden değişir, Cloudflare/bot korumasına takılır; ticari üründe kullanılmamalı [3. TARAF]. Ücretsiz resmî katmanlar yeterince cömert olduğundan genelde gereksizdir.
- **HTML kazıma (scraping)**: Etherscan sayfalarını kazımak (ör. token holder listesi) ToS ihlali ve IP engeli riski taşır; aynı veri ücretli API'de veya doğrudan RPC ile alınabilir [TAHMİN].
- **Çoklu anahtar ile limit aşma**: Etherscan limitin tüm anahtarlarda toplam olduğunu açıkça yazar, yani işe yaramaz ve hesap kapatma riski vardır [RESMÎ].
- **Kimliksiz katmanlara güvenmek**: Paylaşılan IP'de (bulut sunucu, VPN) CMC kimliksiz limit hemen doluyor [TEST]; CoinGecko kimliksiz de IP bazlı ortak [RESMÎ]. Üretimde ücretsiz anahtar alın.
- **Hukuki/finansal not**: Bu servislerden alınan veri yatırım tavsiyesi değildir; veriyi yeniden dağıtmak (ör. uygulamanızda başkalarına satmak) genelde ücretli/ticari lisans gerektirir — her servisin kullanım şartlarını okuyun [TAHMİN]. CMC ücretsiz Basic'te bile ticari kullanım "Yes" olarak işaretli [RESMÎ].

## SDK ve kütüphaneler

| Servis | Resmî | Topluluk (.NET dahil) |
|---|---|---|
| CoinGecko | TypeScript `@coingecko/coingecko-typescript` ([GitHub](https://github.com/coingecko/coingecko-typescript)), Python `coingecko-sdk` ([GitHub](https://github.com/coingecko/coingecko-python)), MCP sunucusu: `https://mcp.api.coingecko.com/mcp` (anahtarsız), `https://mcp.pro-api.coingecko.com/mcp`, npm `@coingecko/coingecko-mcp`; Google Sheets/Excel eklentileri [RESMÎ] | .NET: `CoinGecko.Net` (JKorf, CryptoExchange.Net ailesi) [3. TARAF, 15.10.2026'da ayrıca doğrulanmadı]; Python `pycoingecko` [3. TARAF] |
| CoinMarketCap | Resmî SDK belgede yok; Postman koleksiyon dışa aktarma aracı var [RESMÎ] | .NET ve Python için topluluk sarmalayıcıları mevcut, çoğu eski "Hobbyist" dönemine ait — güncelliğini kontrol edin [TAHMİN] |
| CoinDesk Data | Belgede doğrulanamadı | — |
| Etherscan | Resmî SDK yok (REST + llms.txt) [RESMÎ — belge indeksinde yok] | JS `etherscan-api` (V2 destekli, tek anahtar çok zincir) [3. TARAF]; .NET'te genelde doğrudan `HttpClient` |
| On-chain (.NET) | — | **Nethereum** (.NET Ethereum kütüphanesi: RPC, `eth_subscribe` WebSocket, log decode) [3. TARAF]; JS: `ethers`, `viem`; Alchemy SDK (`alchemy-sdk`) [3. TARAF] |

## Postman / OpenAPI / koleksiyonlar

- CoinGecko OpenAPI: [pro-api.json](https://docs.coingecko.com/openapi-specs/pro-api.json), [demo-api.json](https://docs.coingecko.com/openapi-specs/demo-api.json); WebSocket için [AsyncAPI](https://docs.coingecko.com/websocket/asyncapi.json) [RESMÎ]. Postman belgede yok.
- CoinMarketCap: Tools bölümünde "Postman collection export" uç noktası var [RESMÎ]. Dokümanın Markdown sürümü için URL sonuna `.md` eklenebilir; indeks: `https://pro.coinmarketcap.com/llms.txt` [RESMÎ] (site geneli `https://coinmarketcap.com/llms.txt` de mevcut).
- Etherscan: OpenAPI/Postman belgede yok; tüm sayfa indeksi `https://docs.etherscan.io/llms.txt` [RESMÎ].
- CoinGecko indeksi: `https://docs.coingecko.com/llms.txt` [RESMÎ].

## Depoda ilgili sayfalar

- [Bybit ve Kraken API](Bybit-ve-Kraken.md) — borsa (işlem/emir/piyasa) API'leri; bu sayfa toplayıcı veriyi kapsar.
- [Blockchain eğitimi](../../Programlama/Blockchain/) — zincir, akıllı sözleşme ve .NET (Nethereum) temelleri.
- [Telegram API](../Mesajlasma/Telegram.md) — kripto projelerinin duyuru kanallarını takip etmek için.
- [X (Twitter) API](../Sosyal-Medya/X-Twitter.md) — proje/kişi gönderilerini takip etmek için.
- [GitHub API](../Gelistirici-Platformlari/GitHub.md) — proje depolarındaki release/commit hareketleri.

## Kaynaklar

Resmî:
- https://docs.coingecko.com/reference/introduction — CoinGecko API dokümanı giriş sayfası — (erişim: 15 Ekim 2026)
- https://www.coingecko.com/en/api/pricing — CoinGecko plan ve fiyatları — (erişim: 15 Ekim 2026)
- https://docs.coingecko.com/reference/authentication — Pro kimlik doğrulama — (erişim: 15 Ekim 2026)
- https://docs.coingecko.com/demo/reference/authentication — Demo kimlik doğrulama — (erişim: 15 Ekim 2026)
- https://docs.coingecko.com/docs/errors-and-rate-limits — hata kodları ve hız sınırları — (erişim: 15 Ekim 2026)
- https://docs.coingecko.com/reference/endpoint-overview — Pro uç nokta listesi — (erişim: 15 Ekim 2026)
- https://docs.coingecko.com/demo/reference/endpoint-overview — Demo/kimliksiz uç nokta listesi — (erişim: 15 Ekim 2026)
- https://docs.coingecko.com/websocket — WebSocket kanalları ve limitleri — (erişim: 15 Ekim 2026)
- https://docs.coingecko.com/webhooks — Webhook olayları, imza doğrulama — (erişim: 15 Ekim 2026)
- https://docs.coingecko.com/ai-integration/mcp-server — CoinGecko MCP sunucusu — (erişim: 15 Ekim 2026)
- https://docs.coingecko.com/docs/sdk-typescript ve https://docs.coingecko.com/docs/sdk-python — resmî SDK'lar — (erişim: 15 Ekim 2026)
- https://coinmarketcap.com/api/pricing/ — CMC plan ve fiyatları — (erişim: 15 Ekim 2026)
- https://coinmarketcap.com/api/documentation/v1/ — CMC doküman girişi — (erişim: 15 Ekim 2026)
- https://coinmarketcap.com/api/documentation/guides/authentication — CMC kimlik doğrulama ve kredi kuralları — (erişim: 15 Ekim 2026)
- https://coinmarketcap.com/api/documentation/pro-api-reference/keyless-public-api — CMC anahtarsız katman — (erişim: 15 Ekim 2026)
- https://coinmarketcap.com/api/documentation/pro-api-reference/endpoint-overview — CMC uç nokta özeti — (erişim: 15 Ekim 2026)
- https://coinmarketcap.com/api/documentation/pro-api-websocket/overview — CMC WebSocket — (erişim: 15 Ekim 2026)
- https://docs.etherscan.io/ — Etherscan API V2 dokümanı — (erişim: 15 Ekim 2026)
- https://docs.etherscan.io/resources/rate-limits — Etherscan hız sınırları — (erişim: 15 Ekim 2026)
- https://etherscan.io/apis — Etherscan plan fiyatları — (erişim: 15 Ekim 2026)
- https://docs.etherscan.io/supported-chains — ücretsiz/ücretli zincir listesi — (erişim: 15 Ekim 2026)
- https://docs.etherscan.io/v2-migration — V1 → V2 geçişi (V1 15 Ağustos 2025'te kapandı) — (erişim: 15 Ekim 2026)
- https://docs.etherscan.io/api-reference/endpoint/getaddresstag — `getaddresstag` yalnızca Pro Plus planında — (erişim: 15 Ekim 2026)
- https://pro.coinmarketcap.com/llms.txt — CMC tam doküman indeksi — (erişim: 15 Ekim 2026)
- https://docs.etherscan.io/api-reference/endpoint/txlist — `txlist` örnek ve parametreler — (erişim: 15 Ekim 2026)
- https://docs.etherscan.io/set-up-your-api-key — Etherscan anahtar oluşturma — (erişim: 15 Ekim 2026)
- https://www.alchemy.com/pricing — Alchemy planları — (erişim: 15 Ekim 2026)
- https://www.alchemy.com/docs/reference/notify-api-quickstart — Alchemy Webhooks — (erişim: 15 Ekim 2026)
- https://www.infura.io/pricing — Infura planları — (erişim: 15 Ekim 2026)
- https://developers.coindesk.com/ — CoinDesk Data geliştirici portalı (JS ile yükleniyor, içerik otomatik okunamadı) — (erişim: 15 Ekim 2026)

3. taraf:
- https://coinstats.app/blog/top-coindesk-api-alternatives-for-crypto-data/ — CoinDesk ücretsiz API katmanının 21 Mayıs 2026'da kaldırıldığı, planların satış ekibiyle alındığı (rakip sağlayıcının yazısı, taraflı) — (erişim: 15 Ekim 2026)
- https://kb.etherscan.com/etherscan-api-v1-will-be-fully-deprecated-by-15th-august-2025 — Etherscan bilgi bankası V1 kapanış duyurusu — (erişim: 15 Ekim 2026)

Not: Bu oturumda web arama kotası doldu; CoinDesk Data planları ve .NET topluluk kütüphanelerinin güncelliği ayrıca doğrulanamadı.
