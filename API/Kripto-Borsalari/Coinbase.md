# Coinbase API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (piyasa verisi herkese açık; işlem/hesap uç noktaları hesap ve ülke uygunluğuna bağlı)

## Özet

Coinbase'in geliştirici tarafı **CDP (Coinbase Developer Platform)** çatısı altında toplanmıştır: bireysel kullanıcılar için **Advanced Trade API** (spot, ABD vadeli, Global Derivatives), kurumsal/profesyonel kullanıcılar için **Coinbase Exchange API** ve kurumlar için **Coinbase Prime API** ayrı ayrı sunulur [RESMÎ]. Piyasa verisi (ürün listesi, emir defteri, mum, son işlemler) her iki borsada da kimliksiz REST ve WebSocket üzerinden ücretsiz alınabilir [RESMÎ]. Hesap/emir uç noktaları için CDP API anahtarı (Advanced Trade) veya borsa içinde oluşturulan HMAC anahtarı (Exchange, Prime) gerekir; API kullanımı ücretsizdir, ücret yalnızca işlem komisyonudur [RESMÎ]. CDP ayrıca zincir üstü (onchain) olaylar için webhook servisi sunar [RESMÎ]. Takip uygulaması açısından Coinbase "kişi/kanal paylaşımı" değil, **piyasa olayı** (yeni listeleme, fiyat hareketi, ürün durum değişikliği, kendi emirlerin) kaynağıdır.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | Advanced Trade `/market/*` uç noktaları (ürünler, emir defteri, mum, son işlemler, sunucu zamanı); Advanced Trade WebSocket piyasa kanalları (`ticker`, `level2`, `market_trades`, `candles`, `status`, `heartbeats`); Exchange WebSocket (`wss://ws-feed.exchange.coinbase.com`) kimliksiz kanalları; Global Derivatives `public/*` JSON-RPC metotları [RESMÎ] | Ücretsiz. Advanced Trade public yanıtları **1 sn önbelleklidir** [RESMÎ]; WS bağlantı + kimliksiz mesaj 8/sn/IP [RESMÎ]; Exchange public REST 10 istek/sn/IP (burst 15) [RESMÎ] |
| Geliştirici hesabı / uygulama | Coinbase hesabı + CDP Portal'da **Secret API Key** (ECDSA/ES256) | Kendi hesabının bakiyeleri, emir verme/iptal/düzenleme, dolum geçmişi, portföyler, convert, `user` ve `futures_balance_summary` WS kanalları [RESMÎ] | Ücretsiz; işlem komisyonu `GET /transaction_summary` ile görülür [RESMÎ]. Yalnızca **kendi hesabın** için [RESMÎ] |
| İşletme / uygulama onayı (OAuth2) | CDP'de OAuth2 uygulaması kaydı, kullanıcı onayı (`https://login.coinbase.com/oauth2/auth`) | Başka kullanıcıların hesaplarına onay verdikleri kapsamlarla (`wallet:accounts:read`, `wallet:buys:create`, `offline_access` …) erişim [RESMÎ] | Ayrı bir "App Review" süreci belgede yok ("belgede yok"); kapsamlar kayıtta belirlenir, sonra değiştirmek kullanıcıların yeniden onayını gerektirir [RESMÎ] |
| Ücretli / kurumsal — Exchange | Coinbase Exchange (kurumsal) hesabı; anahtar `exchange.coinbase.com/profile/api` | REST + FIX order entry + FIX market data + WS `full`/`level2`/`level3`/`user`/`balance` kanalları, `ws-direct` düşük gecikmeli akış [RESMÎ] | API ücretsiz, komisyon kurumsal tarifeye göre. Private REST 15/sn/profil (burst 30) [RESMÎ] |
| Ücretli / kurumsal — Prime | Coinbase Prime kurumsal hesabı (onboarding/KYB) | Saklama (custody), işlem, finansman, staking, vadeli, adres defteri; REST + WS + FIX 4.2/5.0 SP2 [RESMÎ] | Kurumsal sözleşme. 100 istek/sn/IP, 25/sn/portföy (burst 50) [RESMÎ] |
| Ücretli / kurumsal — Coinbase International Exchange (ABD dışı) | Coinbase International Exchange (INTX) kurumsal hesabı; uygun ABD dışı kurumlar | Kendi API'si `https://api.international.coinbase.com`: REST + FIX + WebSocket (perpetual/spot). Advanced Trade içindeki `/intx/*` uç noktalarının kapanmasından **etkilenmedi** [RESMÎ] | Kurumsal. REST 40 istek/sn/anahtar; FIX 800 mesaj/sn/anahtar (1 bağlantı/anahtar); WS 30 sn'de en fazla 10 bağlantı denemesi [RESMÎ] |
| Resmî olmayan | — | Web sitesinin iç uç noktaları, eski `api.pro.coinbase.com` (Coinbase Pro, kapatıldı) [TAHMİN] | Önerilmez; resmî public veri zaten ücretsiz olduğu için ihtiyaç yok |

### Türkiye erişimi

- Coinbase'in desteklenen ülkeler sayfası bu araştırmada erişime kapalıydı (HTTP 403), bu yüzden **resmî olarak doğrulanamadı** ("belgede yok / erişilemedi").
- Genel bilgi: Türkiye, Coinbase'in hesap açılabilen ülkeler listesinde yer almamaktadır [TAHMİN]. Ayrıca Türkiye'de 7518 sayılı Kanun (2024) ile kripto varlık hizmet sağlayıcılarının SPK izni alması zorunlu hâle gelmiştir; izinsiz yabancı platformların Türkiye'de yerleşik kişilere hizmet sunması kısıtlıdır [3. TARAF].
- Durum → sonuç:
  - **Yalnızca piyasa verisi** (fiyat, emir defteri, listeleme takibi): Hesap gerekmez; kimliksiz REST/WS Türkiye'den de çağrılabilir [TAHMİN — IP tabanlı engel belgede yok]. Exchange piyasa verisini kullanan, **Market Data Terms of Use** şartlarını kabul etmiş sayılır [RESMÎ].
  - **Kendi hesabınla işlem / bakiye**: Coinbase hesabı açılabilen bir ülkede yerleşik olmak gerekir; Türkiye'de yerleşikler için büyük olasılıkla mümkün değil [TAHMİN]. Hesap açmak için konum/kimlik bilgisini yanlış beyan etmek ToS ihlalidir.
  - **Global Derivatives (perpetual)**: "Uygun ABD dışı müşteriler" için [RESMÎ]; ülke listesi bu sayfada yok.
  - **US futures**: Yalnızca uygun ABD müşterileri (CFTC düzenlemeli) [RESMÎ].

## Kimlik doğrulama

### Advanced Trade / Coinbase App (CDP API Key → JWT) [RESMÎ]

- Anahtar CDP Portal'da (`portal.cdp.coinbase.com/api-keys/secret`) oluşturulur. Anahtar adı `organizations/{org_id}/apiKeys/{key_id}` biçimindedir, gizli anahtar çok satırlı EC private key'dir.
- Algoritma **ES256 (ECDSA P-256)** seçilmelidir; Ed25519 Coinbase App SDK'larınca desteklenmez.
- Her istek için ayrı bir JWT üretilir: `sub` = anahtar adı, `iss` = `"cdp"`, `nbf` = şimdi, `exp` = şimdi + 120 sn, `uri` = `"GET api.coinbase.com/api/v3/brokerage/accounts"` gibi metot + host + yol. Başlıkta `kid` = anahtar adı ve rastgele `nonce`.
- Gönderim: `Authorization: Bearer <JWT>`. JWT 2 dakikada sona erer.
- WebSocket'te JWT, `subscribe` mesajındaki `jwt` alanına konur; gönderilen her WS mesajı için ayrı JWT üretmek **zorunludur** (JWT 2 dk'da sona erer) [RESMÎ].
- IP izin listesi: anahtar ayarlarında "API restrictions" [RESMÎ].
- Eski (legacy) API anahtarları 5 Şubat 2025'ten itibaren geçersizleştirildi [RESMÎ].
- Belgede C# dahil (Python, Go, JS, PHP, Java, C++, TS) JWT üretim örnekleri bulunur [RESMÎ]. [ÇELİŞKİLİ] Belgedeki C# (.NET) örneği `iss: "coinbase-cloud"` kullanıyor, diğer tüm örnekler `"cdp"`; diğer örneklerdeki `cdp` değerini esas al ve test et.

### Global Derivatives [RESMÎ]

- `public/auth` metoduna CDP JWT gönderilir, dönen access token `Authorization: Bearer` ile private metotlarda kullanılır.

### OAuth2 (başka kullanıcılar adına) [RESMÎ]

- Yetkilendirme: `https://login.coinbase.com/oauth2/auth?response_type=code&client_id=…&redirect_uri=…&scope=…`
- Kapsam biçimi `servis:kaynak:eylem` (ör. `wallet:accounts:read`). `offline_access` refresh token verir. Kullanıcı hangi kapsamları vereceğini seçebilir; `GET /user/auth` ile kontrol edilir.
- 13 Mayıs 2025'ten itibaren OAuth bağlantılarında portföy düzeyinde işlem erişimi zorunlu tutulur [RESMÎ].

### Exchange (HMAC) [RESMÎ]

- Başlıklar: `CB-ACCESS-KEY`, `CB-ACCESS-SIGN`, `CB-ACCESS-TIMESTAMP`, `CB-ACCESS-PASSPHRASE`.
- İmza: base64 çözülmüş secret ile `timestamp + METHOD + requestPath + body` üzerinde HMAC-SHA256, sonucu base64. Zaman damgası sunucu saatinden en fazla 30 sn sapabilir.
- Anahtar profil bazlıdır; kullanıcı başına en fazla 300 anahtar.

### Prime (HMAC) [RESMÎ]

- Başlıklar: `X-CB-ACCESS-KEY`, `X-CB-ACCESS-PASSPHRASE`, `X-CB-ACCESS-SIGNATURE`, `X-CB-ACCESS-TIMESTAMP` (Unix saniye, en fazla 30 sn eski).
- İmza: `timestamp + METHOD + path + body` üzerinde HMAC-SHA256, base64. Anahtar Prime web arayüzünde, portföy bazlı oluşturulur.
- [ÇELİŞKİLİ] Belgedeki Python/JS örnekleri secret'ı doğrudan kullanırken Ruby örneği önce base64 çözüyor; anahtarının hangi biçimi istediğini test ederek doğrula.

## Temel uç noktalar

Base URL'ler [RESMÎ]:

| API | REST | WebSocket |
|---|---|---|
| Advanced Trade (spot + US derivatives) | `https://api.coinbase.com/api/v3/brokerage` | Piyasa: `wss://advanced-trade-ws.coinbase.com` · Kullanıcı: `wss://advanced-trade-ws-user.coinbase.com` |
| Advanced Trade sandbox | `https://api-sandbox.coinbase.com/api/v3/brokerage` (kimliksiz, sabit örnek yanıtlar). Yalnızca Accounts ve Orders uç noktaları çalışır; piyasa verisi (`/market/*`) yoktur. Hata simülasyonu `X-Sandbox: <senaryo>` başlığıyla yapılır (ör. `PostOrder_insufficient_fund`) [RESMÎ] | — |
| Coinbase International Exchange (INTX, kurumsal) | `https://api.international.coinbase.com` (REST + FIX) | belgede: International Exchange WebSocket sayfası |
| Global Derivatives (Deribit altyapılı, Starbase) | `https://drb.coinbase.com/api/v2` (JSON-RPC 2.0) | `wss://drb.coinbase.com/ws/api/v2` |
| Exchange | `https://api.exchange.coinbase.com` | `wss://ws-feed.exchange.coinbase.com` (kimliksiz) · `wss://ws-direct.exchange.coinbase.com` (kimlikli) · sandbox: `wss://ws-feed-public.sandbox.exchange.coinbase.com` |
| Prime | `https://api.prime.coinbase.com` (ör. `/v1/portfolios`) | belgede: Prime WebSocket Overview sayfası |

### Advanced Trade — takip için önemli uç noktalar

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/market/products` | Tüm ürünlerin (işlem çiftleri) listesi | Herkese açık | 1 sn önbellek; yeni listeleme tespiti için periyodik çekip farkı al [RESMÎ] |
| GET | `/market/products/{product_id}` | Tek ürün bilgisi (durum, fiyat, hacim) | Herkese açık | [RESMÎ] |
| GET | `/market/products/{product_id}/candles` | Mum (OHLCV) verisi | Herkese açık | [RESMÎ] |
| GET | `/market/products/{product_id}/ticker` | Son işlemler | Herkese açık | [RESMÎ] |
| GET | `/market/product_book` | Emir defteri | Herkese açık | [RESMÎ] |
| GET | `/time` | Sunucu zamanı | Herkese açık | [RESMÎ] |
| GET | `/best_bid_ask` | En iyi alış/satış | Geliştirici | Önbelleksiz canlı veri için private uç noktalar önerilir [RESMÎ] |
| GET | `/accounts` | Hesap/bakiye listesi | Geliştirici | [RESMÎ] |
| POST | `/orders` | Emir ver | Geliştirici | `client_order_id` en fazla 128 karakter (Ekim 2025'ten beri) [RESMÎ] |
| POST | `/orders/batch_cancel` | Emir iptali | Geliştirici | [RESMÎ] |
| GET | `/orders/historical/batch` | Emir geçmişi | Geliştirici | [RESMÎ] |
| GET | `/orders/historical/fills` | Dolum geçmişi | Geliştirici | [RESMÎ] |
| GET | `/transaction_summary` | Komisyon kademesi ve hacim | Geliştirici | [RESMÎ] |
| GET | `/portfolios` | Portföy listesi | Geliştirici | [RESMÎ] |
| GET | `/cfm/positions` | ABD vadeli pozisyonları | Geliştirici (ABD) | [RESMÎ] |
| GET | `/key_permissions` | API anahtarının izinleri | Geliştirici | [RESMÎ] |

- **Advanced Trade içindeki** `/intx/*` uç noktaları **1 Ekim 2026 itibarıyla emekliye ayrıldı** (Advanced Trade üzerinden INTX perpetual işlemi sona erdi); okuma uç noktaları geçmiş veri için sınırlı süre açık [RESMÎ]. Ayrı **Coinbase International Exchange API'si** (`api.international.coinbase.com`) bundan etkilenmedi [RESMÎ]. Uluslararası perpetual'lar artık Global Derivatives (`drb.coinbase.com`) üzerindedir: 125+ perpetual, 50x'e kadar kaldıraç; opsiyon ve vadeli kontrat henüz yok [RESMÎ].
- 29 Temmuz 2026'dan itibaren `EQUITY` ürün tipiyle hisse senedi işlemleri eklendi; ürünler API'si işlem gören hisseleri de listeler [RESMÎ].
- Global Derivatives public metotları (kimliksiz): `public/get_instruments`, `public/ticker`, `public/get_order_book`, `public/get_last_trades_by_instrument`, `public/get_funding_rate_history`, `public/get_announcements` vb. [RESMÎ]
- Tam liste: [Advanced Trade REST API](https://docs.cdp.coinbase.com/coinbase-app/advanced-trade-apis/rest-api).

### Exchange — öne çıkanlar

Ürünler, emir defteri, ticker, işlemler, mumlar herkese açık; hesap, emir, dolum (`/fills`), transfer kimlikli [RESMÎ]. Tam liste OpenAPI spesifikasyonunda (aşağıda).

## Gerçek zamanlı / bildirim

| Kanal | Ne var | Nasıl |
|---|---|---|
| Advanced Trade WebSocket (piyasa) | `heartbeats`, `candles`, `status`, `ticker`, `ticker_batch`, `level2`, `market_trades` [RESMÎ] | `wss://advanced-trade-ws.coinbase.com`, bağlandıktan sonra **5 sn içinde** `subscribe` gönderilmezse bağlantı kesilir [RESMÎ] |
| Advanced Trade WebSocket (kullanıcı) | `user` (emir güncellemeleri varsayılan olarak gelir; `snapshot`/`update`, `sequence_num` ile kayıp mesaj tespiti), `futures_balance_summary` [RESMÎ]. `positions` alanı beta; varsayılan olarak boştur, erişim CDP Discord üzerinden etkinleştirilir; `prediction_market_positions` şu an hep boş dizi [RESMÎ] | `wss://advanced-trade-ws-user.coinbase.com`, JWT zorunlu; kullanıcı başına tek bağlantı önerilir [RESMÎ] |
| Exchange WebSocket | `heartbeat`, `status`, `auctionfeed`, `matches`, `rfq_matches`, `ticker`, `ticker_batch`, `level2_batch` (kimliksiz); `full`, `user`, `level2`, `level3`, `balance` (kimlikli) [RESMÎ] | `wss://ws-feed.exchange.coinbase.com` |
| Global Derivatives WebSocket | Abonelik/heartbeat yalnızca WS'te, JSON-RPC 2.0 [RESMÎ] | `wss://drb.coinbase.com/ws/api/v2` |
| CDP Webhooks (v2) | Zincir üstü olaylar: `onchain.activity.detected` (kontrat adresi + olay adı, ör. `Transfer`, `params.from/to/value` filtreleri); CDP cüzdan olayları [RESMÎ] | CDP CLI/API ile abonelik; yanıtta `metadata.secret` ile imza doğrulama. Webhooks v1, 26 Ocak 2026'da kullanımdan kaldırıldı [RESMÎ] |
| Coinbase App / Advanced Trade için hesap webhook'u | Yok: Coinbase App outbound notifications (hesap webhook'ları) 17 Şubat 2025'te kapatıldı [RESMÎ] | Yerine Transactions API yoklanır (polling) veya Advanced Trade `user` WS kanalı kullanılır [RESMÎ] |
| RSS / durum sayfası | `status.coinbase.com` (Statuspage altyapısı; RSS/Atom ve e-posta aboneliği sunar) [TAHMİN] | Kesinti/bakım takibi için |
| Yeni listeleme duyuruları | Coinbase'in resmî bir "listing API"si yok ("belgede yok"); `status` WS kanalı ürün/para birimi durumlarını periyodik yollar [RESMÎ] | Ürün listesini diff'lemek + `status` kanalı en güvenilir yol [TAHMİN] |

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Yeni coin/çift listelendi | Evet | `status` WS kanalı veya `GET /market/products` periyodik diff | Herkese açık | Duyurudan önce "ön listeleme" durumları (ör. auction modu) görülebilir — Exchange `auctionfeed` kanalı [RESMÎ/TAHMİN] |
| Ürün işlem durumu değişti (durduruldu, sadece limit vb.) | Evet | `status` kanalı / ürün alanları | Herkese açık | [RESMÎ] |
| Fiyat eşiği / ani hareket | Evet | `ticker` veya `ticker_batch` WS; `candles` | Herkese açık | Filtreleme (% değişim, hacim eşiği) uygulamada yapılır |
| Büyük işlem (balina) | Kısmen | `market_trades` / `matches` akışında boyut filtresi | Herkese açık | Kimin yaptığı görülmez (anonim) |
| Emir defteri duvarı | Evet | `level2` (Advanced Trade) / `level2_batch` (Exchange) | Herkese açık | Yüksek veri hacmi |
| Kendi emir/dolum olayları | Evet | `user` WS kanalı | Geliştirici | JWT her mesajda yenilenir |
| Funding rate / perpetual duyuru | Evet | `public/get_funding_rate_history`, `public/get_announcements` | Herkese açık (Global Derivatives) | [RESMÎ] |
| Zincir üstü cüzdan/kontrat transferi | Evet | CDP Webhooks `onchain.activity.detected` | Geliştirici (CDP) | Coinbase borsası değil, blokzincir olayı |
| Coinbase kesinti/bakım | Evet | status.coinbase.com RSS/abonelik | Herkese açık | [TAHMİN] |
| Coinbase'in sosyal medya duyuruları (X, blog) | Bu API ile hayır | X/Blog RSS ilgili sayfalardan | — | Bkz. [X-Twitter](../Sosyal-Medya/X-Twitter.md) |

## Hız sınırları ve fiyatlar

| API | Sınır | Etiket |
|---|---|---|
| Advanced Trade WebSocket | Bağlantı ve kimliksiz mesaj: 8/sn/IP | [RESMÎ] |
| Advanced Trade public REST | Yanıtlar 1 sn önbellekli; `cache-control: no-cache` başlığı veya private uç noktalar ile canlı veri | [RESMÎ] |
| Advanced Trade REST (sayısal limit) | Yaygın bilinen değerler: private ~30 istek/sn, public ~10 istek/sn (IP başına) — güncel sayfa bu araştırmada bulunamadı | [TAHMİN] |
| Exchange public REST | 10/sn/IP, burst 15 | [RESMÎ] |
| Exchange private REST | 15/sn/profil, burst 30; `/fills` 10/sn (burst 20); `/loans` 10/sn | [RESMÎ] |
| Exchange WebSocket | 8 istek/sn/IP (burst 20); istemci mesajı 100/sn/IP | [RESMÎ] |
| Exchange FIX | Logon 2/sn/anahtar; 100 istek/sn; >200 mesaj/sn bağlantı kesilir; 75 bağlantı/profil, 175/kullanıcı; batch başına 15 emir | [RESMÎ] |
| Exchange açık emir | En fazla 500 | [RESMÎ] |
| Prime REST | 100/sn/IP (aşımda 30 sn bekleme), 25/sn/portföy (burst 50) | [RESMÎ] |

- Limitler **lazy-fill token bucket** ile uygulanır (Exchange): kova burst kadar dolu başlar, saniyede yenilenir [RESMÎ].
- API kullanım ücreti yok; maliyet işlem komisyonudur (maker/taker kademeleri hesap hacmine göre, `GET /transaction_summary`) [RESMÎ]. Kesin oranlar ülke/ürüne göre değiştiği için buraya yazılmadı.

## Resmî olmayan yollar ve riskler

- **İhtiyaç düşük**: Piyasa verisi resmî ve kimliksiz olarak ücretsiz sunulduğu için takip amacıyla resmî olmayan yola gerek yoktur [TAHMİN].
- **Web sitesi iç uç noktaları** (coinbase.com sayfalarının kullandığı GraphQL/REST): Belgelenmemiş, haber vermeden değişebilir; ToS'a aykırı kazıma (scraping) hesap kapatma ve IP engeli riski taşır [TAHMİN].
- **Eski Coinbase Pro API (`api.pro.coinbase.com`)**: Coinbase Pro kapatıldı; eski blog yazılarındaki örnekler çalışmaz, yerine Advanced Trade veya Exchange kullanılır [3. TARAF].
- **Legacy API key / eski `CB-ACCESS-*` imzalı Coinbase App anahtarları**: Şubat 2025'te geçersizleşti; eski kütüphaneler hata verir [RESMÎ].
- **Advanced Trade içindeki INTX perpetual uç noktaları (`/intx/*`)**: 1 Ekim 2026'da emekli; eski botlar bu çağrılarda başarısız olur. Ayrı Coinbase International Exchange API'si (`api.international.coinbase.com`) etkilenmedi [RESMÎ].
- **Coinbase App outbound notifications (hesap webhook'ları)**: 17 Şubat 2025'te kapatıldı; bunlara güvenen entegrasyonlar Transactions API'yi yoklamaya (polling) veya Advanced Trade `user` WS kanalına geçmelidir [RESMÎ].
- **Hukuki risk (Türkiye)**: Coinbase'in hizmet vermediği bir ülkeden VPN/yanlış beyanla hesap açmak ToS ihlalidir ve hesap/varlık dondurma riski doğurur; ayrıca yerel kripto mevzuatı (SPK izni) açısından kullanıcıya değil platforma yönelik yükümlülükler vardır [3. TARAF].

## SDK ve kütüphaneler

### Resmî

| Ürün | Dil | Paket / depo | Etiket |
|---|---|---|---|
| Advanced Trade | Python (resmî, PyPI, aktif) | [coinbase/coinbase-advanced-py](https://github.com/coinbase/coinbase-advanced-py) | [RESMÎ] |
| Advanced Trade | TypeScript, Go, Java (örnek SDK) | [github.com/coinbase-samples](https://github.com/coinbase-samples) | [RESMÎ] |
| Prime | .NET | [coinbase/prime-sdk-dotnet](https://github.com/coinbase/prime-sdk-dotnet) — `dotnet add package CoinbaseSdk.Prime` | [RESMÎ] |
| Prime | Python, Java, TypeScript, Go, Rust | `prime-sdk-py`, `prime-sdk-java`, `prime-sdk-ts`, `prime-sdk-go`, `prime_sdk_rs` | [RESMÎ] |
| CDP | CLI (`cdp`) | Webhook aboneliği vb. | [RESMÎ] |

- Advanced Trade için **resmî .NET SDK yok** ("belgede yok"); belgede C# JWT üretim örneği var (dikkat: `iss` olarak `coinbase-cloud` kullanıyor, `cdp` ile değiştirip test et), `HttpClient` + `System.IdentityModel.Tokens.Jwt` / `ECDsa` ile kendin yazabilirsin [RESMÎ/TAHMİN].

### Topluluk

| Kütüphane | Dil | Not | Etiket |
|---|---|---|---|
| CCXT (`coinbase`, `coinbaseexchange`, `coinbaseinternational`) | Python, JS/TS, PHP, C# | Çok borsalı birleşik arayüz, resmî API'yi sarar | [3. TARAF] |
| CoinbaseAdvanced.Net (JKorf, CryptoExchange.Net ailesi) | C# / .NET | REST + WebSocket, NuGet | [3. TARAF] |

## Postman / OpenAPI / koleksiyonlar

- Advanced Trade OpenAPI: `https://docs.cdp.coinbase.com/api-reference/advanced-trade-api/rest-api/advanced-trade-spec.yaml` [RESMÎ]
- Advanced Trade WebSocket AsyncAPI: `https://docs.cdp.coinbase.com/api-reference/advanced-trade-api/advanced-trade-asyncapi.json` [RESMÎ]
- Exchange OpenAPI: `https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/exchange-spec.yaml` [RESMÎ]
- Prime OpenAPI: `https://docs.cdp.coinbase.com/api-reference/prime-api/rest-api/prime-public-spec.yaml` [RESMÎ]
- Coinbase International Exchange (INTX, ayrı kurumsal API — `api.international.coinbase.com`) OpenAPI: `https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/intx-spec.yaml` [RESMÎ]
- CDP API v2: `https://docs.cdp.coinbase.com/api-reference/v2/cdp-api-v2.yaml` [RESMÎ]
- LLM dostu doküman dizini: `https://docs.cdp.coinbase.com/llms.txt` [RESMÎ]
- Resmî Postman koleksiyonu: belge dizininde bulunamadı ("belgede yok"); OpenAPI dosyaları Postman'e içe aktarılabilir.

## Depoda ilgili sayfalar

- [X (Twitter) API](../Sosyal-Medya/X-Twitter.md) — Coinbase duyuru hesaplarını takip etmek için
- [Telegram API](../Mesajlasma/Telegram.md) — Fiyat/listeleme uyarılarını bildirim olarak göndermek için
- [Discord API](../Mesajlasma/Discord.md) — Uyarı botu / webhook ile bildirim
- [GitHub API](../Gelistirici-Platformlari/GitHub.md) — SDK depolarının sürümlerini takip etmek için
- [Blockchain](../../Programlama/Blockchain/) — Zincir üstü kavramlar (CDP webhooks ile ilgili)

## Kaynaklar

- [Advanced Trade API — Genel bakış](https://docs.cdp.coinbase.com/coinbase-app/advanced-trade-apis/overview) — Pazarlar, arayüzler, SDK'lar — (erişim: 15 Ekim 2026)
- [Advanced Trade REST API](https://docs.cdp.coinbase.com/coinbase-app/advanced-trade-apis/rest-api) — Base URL'ler, public/private uç nokta listesi, Global Derivatives metotları — (erişim: 15 Ekim 2026)
- [Advanced Trade WebSocket genel bakış](https://docs.cdp.coinbase.com/coinbase-app/advanced-trade-apis/websocket/websocket-overview) — WS adresleri, abonelik kuralları — (erişim: 15 Ekim 2026)
- [Advanced Trade WebSocket hız sınırları](https://docs.cdp.coinbase.com/coinbase-app/advanced-trade-apis/websocket/websocket-rate-limits) — 8/sn/IP — (erişim: 15 Ekim 2026)
- [User kanalı referansı](https://docs.cdp.coinbase.com/api-reference/advanced-trade-api/websocket/user.md) — Emir/pozisyon olayları — (erişim: 15 Ekim 2026)
- [Advanced Trade sandbox](https://docs.cdp.coinbase.com/coinbase-app/advanced-trade-apis/sandbox) — Test ortamı ve hata simülasyonu — (erişim: 15 Ekim 2026)
- [CDP API key kimlik doğrulama](https://docs.cdp.coinbase.com/coinbase-app/authentication-authorization/api-key-authentication) — JWT/ES256 ayrıntıları — (erişim: 15 Ekim 2026)
- [Coinbase App — başlarken (API key oluşturma)](https://docs.cdp.coinbase.com/coinbase-app/introduction/get-started) — CDP Portal adımları — (erişim: 15 Ekim 2026)
- [OAuth2 izinleri](https://docs.cdp.coinbase.com/coinbase-app/oauth2-integration/oauth2-permissions.md) — Kapsamlar ve yetkilendirme URL'si — (erişim: 15 Ekim 2026)
- [Coinbase App değişiklik günlüğü](https://docs.cdp.coinbase.com/coinbase-app/introduction/changelog.md) — Legacy key kapanışı, outbound notifications kapanışı (17 Şubat 2025), `/intx/*` emekliliği, EQUITY ürünleri — (erişim: 15 Ekim 2026)
- [International Exchange hız sınırları](https://docs.cdp.coinbase.com/international-exchange/introduction/rate-limits-overview.md) — INTX REST/FIX/WS limitleri — (erişim: 15 Ekim 2026)
- [International Exchange OpenAPI](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/intx-spec.yaml) — `api.international.coinbase.com` sunucusu — (erişim: 15 Ekim 2026)
- [Exchange API hoş geldin](https://docs.cdp.coinbase.com/exchange/introduction/welcome) — REST/FIX/WS seçenekleri, Market Data Terms — (erişim: 15 Ekim 2026)
- [Exchange hız sınırları](https://docs.cdp.coinbase.com/exchange/introduction/rate-limits-overview.md) — REST/FIX/WS limitleri — (erişim: 15 Ekim 2026)
- [Exchange REST kimlik doğrulama](https://docs.cdp.coinbase.com/exchange/rest-api/authentication.md) — HMAC başlıkları — (erişim: 15 Ekim 2026)
- [Exchange WebSocket genel bakış](https://docs.cdp.coinbase.com/exchange/websocket-feed/overview.md) — Üretim/sandbox WS adresleri — (erişim: 15 Ekim 2026)
- [Exchange WebSocket kanalları](https://docs.cdp.coinbase.com/exchange/websocket-feed/channels.md) — Kanal listesi ve kimlik gereksinimi — (erişim: 15 Ekim 2026)
- [Prime REST kimlik doğrulama](https://docs.cdp.coinbase.com/prime/rest-api/authentication.md) — Prime HMAC başlıkları — (erişim: 15 Ekim 2026)
- [Prime hız sınırları](https://docs.cdp.coinbase.com/prime/rest-api/rate-limits.md) — IP ve portföy limitleri — (erişim: 15 Ekim 2026)
- [Prime SDK'ları](https://docs.cdp.coinbase.com/prime/rest-api/sdks.md) — .NET dahil resmî SDK listesi — (erişim: 15 Ekim 2026)
- [CDP Webhooks hızlı başlangıç](https://docs.cdp.coinbase.com/webhooks/quickstart) — `onchain.activity.detected` aboneliği — (erişim: 15 Ekim 2026)
- [CDP Webhooks v2 yükseltme](https://docs.cdp.coinbase.com/webhooks/v2-upgrade.md) — v1'in 26 Ocak 2026'da kaldırılması — (erişim: 15 Ekim 2026)
- [CDP doküman dizini (llms.txt)](https://docs.cdp.coinbase.com/llms.txt) — Tüm sayfa ve spesifikasyon listesi — (erişim: 15 Ekim 2026)
- [CCXT](https://github.com/ccxt/ccxt) — Topluluk çok borsalı kütüphane [3. TARAF] — (erişim: 15 Ekim 2026; bu oturumda ayrıca doğrulanmadı)

> Not: Bu araştırmada web arama kotası dolduğu için Advanced Trade REST sayısal limitleri ve Türkiye ülke desteği resmî sayfadan doğrulanamadı; ilgili satırlar [TAHMİN] olarak işaretlendi.
