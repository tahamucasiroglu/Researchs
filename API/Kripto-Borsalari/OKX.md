# OKX API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **aktif** (bölgeye göre farklı alan adı; OKX TR'de kapsam daraltılmış)

## Özet

OKX, **API v5** adıyla tek bir birleşik REST + WebSocket API'si sunar: piyasa verisi (ticker, mum, emir defteri, işlemler, fonlama oranı), hesap/bakiye/pozisyon, emir verme, algo emirleri, fon hesabı (yatırma/çekme), kopya işlem, grid bot ve duyurular [RESMÎ]. Piyasa verisi ve duyurular **kimliksiz** okunabilir; hesap ve işlem uçları için OKX hesabında oluşturulan **API anahtarı + secret + passphrase** ile HMAC-SHA256 imzası gerekir [RESMÎ]. API kullanımı ücretsizdir; ücret yalnızca işlem komisyonudur (VIP seviyesine göre) [RESMÎ]. Gerçek para riski olmadan denemek için ayrı anahtarlarla çalışan **Demo Trading** ortamı vardır (`x-simulated-trading: 1` başlığı) [RESMÎ]. Türkiye'de hizmet **OKX TR** (`tr.okx.com`) üzerinden verilir; TR dokümanı yalnızca Spot/Margin, Fon ve Hesap bölümlerini içerir, vadeli/perpetual uçları TR dokümanında yer almaz [RESMÎ — tr.okx.com/docs-v5/en].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | Piyasa verisi (`/api/v5/market/*`), genel veri (`/api/v5/public/*` — **istisna:** `public/economic-calendar` API anahtarı ister ve yalnızca canlı ortamda çalışır), sistem durumu, **duyurular**, WebSocket `public` kanalları (tickers, books, trades, status, liquidation-orders…) ve `business` kanalındaki mum (candle) / trades-all | Ücretsiz; IP başına uç nokta bazlı limit (ör. tickers 20 istek/2 sn) [RESMÎ] |
| Geliştirici hesabı/uygulama | OKX hesabı (KYC'li) + *Profile → API keys* ekranında anahtar. İzinler: **Read**, **Trade**, **Withdraw** | Bakiye, pozisyon, emir geçmişi, emir verme/iptal, transfer, çekim; WebSocket `private` kanalları (orders, account, positions, fills…) | Ücretsiz; hesap başına **en çok 50 API anahtarı**, anahtar başına **20 IP** [RESMÎ — hata kodu 59501/59503]. IP bağlanmamış ve Trade/Withdraw izinli anahtar **14 gün kullanılmazsa süresi dolar** [RESMÎ]. **Emir vermek için KYC Seviye 2 gerekir** (REST ve WebSocket "Place order"; 07.04.2026'dan beri; yoksa hata `59113`; demo etkilenmez) [RESMÎ — changelog 2026-04-07] |
| Demo Trading | Aynı OKX hesabıyla giriş → *Trade → Demo Trading → Personal Center → Demo Trading API → Create Demo Trading API Key* | Gerçek API'nin büyük bölümü sahte bakiyeyle; yatırma/çekme, earn alım-satım gibi işlevler **yok** | Ücretsiz; demo anahtarların süresi dolmaz; demo bakiye artırma günde 3 kez [RESMÎ] |
| İşletme/uygulama onayı (partner) | Başvuru: **Broker Program** (OAuth/ND broker), **Market Maker Program**, Affiliate | Broker için kullanıcı adına OAuth ile işlem, alt hesap yönetimi, komisyon iadesi; MM için düşük ücret, daha yüksek limit, RPI/GLP programları | Sözleşme/başvuruya bağlı [RESMÎ — docs-v5/broker_en]. Ayrıntılı koşullar belgede yok |
| Ücretli/kurumsal (VIP) | İşlem hacmi / varlık bakiyesi ile VIP seviyesi | Daha düşük komisyon; **VIP5+** için doluluk oranına (fill ratio) dayalı alt hesap limiti 10.000 emir/2 sn'ye kadar; ekonomik takvim kanalı VIP1+; SBE `bbo-tbt`: her seviye (yalnızca login, 03.03.2026'dan beri); SBE `trades`/`books-l2-tbt` ve JSON `books-l2-tbt`/`books50-l2-tbt`/`fills`: **VIP4+** (07.04.2026'da VIP6/VIP5'ten indi) | API ücreti yok; komisyon VIP'e göre [RESMÎ — changelog 2026-03-02, 2026-04-07] |
| Resmî olmayan | Web sitesinin/uygulamanın iç uç noktaları (`/priapi/...`), duyuru sayfalarının kazınması | Kopya işlem lider sayfaları, bazı web istatistikleri | ToS riski; bkz. aşağıdaki bölüm [3. TARAF] |

> **Kullanım koşulu:** OKX API Agreement (OKX API Sözleşmesi) belgenin başında duyurulmuştur: "API'yi kullanmaya devam etmek sözleşmenin tamamının kabulü sayılır" [RESMÎ — okx.com/help/okx-api-agreement].

### Bölgesel alan adları

| Bölge | REST taban adresi | Not |
|---|---|---|
| Global | `https://openapi.okx.com` (ayrıca `www.okx.com`, `my.okx.com`, `app.okx.com`) | [RESMÎ] |
| ABD / Avustralya | `https://us.okx.com` | `openapi.okx.com` bu bölgelerde **çalışmaz** [RESMÎ] |
| AEA (EEA, AB) | `https://eea.okx.com` | Aynı uyarı [RESMÎ] |
| **Türkiye (OKX TR)** | `https://tr.okx.com` | WebSocket adresleri global ile aynı: `wss://ws.okx.com/ws/v5/{public,private,business}` [RESMÎ — TR dokümanı] |

### Türkiye kullanıcıları (OKX TR) — durum

- **Ayrı doküman var:** `https://tr.okx.com/docs-v5/en/` — giriş cümlesi: "Turkey provides REST and WebSocket APIs…" [RESMÎ]. Türkçe sürüm yok (`/docs-v5/tr/` 404) [RESMÎ — 15.10.2026 denendi].
- **Kapsam:** Trading Account (instruments, balance, bills, fee rates, *Adjust demo account balance*), Order Book Trading (emir, algo emir, easy convert, Cancel All After), Market Data, Public Data (instruments, oracle, exchange rate, economic calendar), Funding Account, Announcement. Global dokümandaki **positions, funding-rate, open-interest, kopya işlem, grid bot, opsiyon** bölümleri TR dokümanında **yok** → TR hesabıyla vadeli/kaldıraçlı türev işlem API'si belgelenmemiş [RESMÎ — TR içindekiler; yorum: TAHMİN].
- **TRY çiftleri:** `BTC-TRY`, `USDT-TRY` vb. spot çiftler; komisyon grubu "Spot TRY" (groupId 3) [RESMÎ]. `GET https://tr.okx.com/api/v5/market/ticker?instId=BTC-TRY` kimliksiz yanıt veriyor [RESMÎ — 15.10.2026 canlı denendi].
- **Demo Trading:** TR dokümanında global'deki "Demo Trading Services" bölümü **yok**, ama `Adjust demo account balance` uç noktası ve `wspap.okx.com` örnekleri var [ÇELİŞKİLİ]. TR hesabında demo API anahtarı oluşturulabildiği belgede açıkça yazmıyor; denemeden varsayma.
- **Çekim (Travel Rule):** 3 Mart 2025'ten beri TR kullanıcıları çekimde alıcı bilgisi (`rcvrInfo`: ad, soyad, ülke, il, ilçe, cadde…) göndermek zorunda — hem **borsa cüzdanına** (alıcı + borsa bilgisi; desteklenen borsalar `GET /api/v5/asset/exchange-list`) hem **özel (private) cüzdana** (alıcı bilgisi) çekimde [RESMÎ — TR changelog 2025-03-03].
- **Travel Rule yatırma kilidi:** Travel Rule kapsamında kilitlenen yatırmalar `GET /api/v5/asset/travel-rule/get-locked` ile listelenir (en çok 50), gönderen bilgisi verilerek `POST /api/v5/asset/travel-rule/unlock` ile açılır (3 istek/sn) [RESMÎ — TR dokümanı, Funding Account].
- **Hesap ayrımı:** TR hesabı TR alan adına, global hesap global alan adına aittir; bir bölgenin anahtarı diğerinde çalışmaz [TAHMİN — belgede açık cümle yok; bölgesel uyarıdan çıkarım].
- Lisans/kurum bilgisi (SPK/MASAK) TR ana sayfasında ve API dokümanında **yazmıyor**; yalnızca "yerel düzenlemelere uyum" ve AML/CTF ifadesi var [RESMÎ — tr.okx.com].

## Kimlik doğrulama

**REST (özel uçlar)** — her istekte dört başlık [RESMÎ]:

| Başlık | İçerik |
|---|---|
| `OK-ACCESS-KEY` | API anahtarı |
| `OK-ACCESS-SIGN` | İmza (aşağıda) |
| `OK-ACCESS-TIMESTAMP` | ISO 8601 UTC, milisaniyeli: `2020-12-08T09:08:57.715Z`. Sunucu saatinden **30 sn'den fazla** sapma → hata `50102` |
| `OK-ACCESS-PASSPHRASE` | Anahtar oluşturulurken verilen parola (OKX geri getiremez; kaybolursa yeni anahtar) |
| `x-simulated-trading: 1` | Yalnızca Demo Trading isteklerinde |
| `expTime` (isteğe bağlı) | Unix ms; emir bu zamandan sonra ulaşırsa işlenmez |

**İmza:** `Base64( HMAC_SHA256( secretKey, timestamp + METHOD + requestPath + body ) )`. GET'te sorgu dizesi `requestPath`'e dahildir, body boştur [RESMÎ].

**WebSocket girişi:** `{"op":"login","args":[{"apiKey","passphrase","timestamp","sign"}]}` — timestamp **Unix saniye**, imza metni `timestamp + "GET" + "/users/self/verify"` [RESMÎ]. WebSocket'te yalnızca login "anahtar kullanımı" sayılır (14 günlük süre için önemli) [RESMÎ].

**Güvenlik önerisi:** Takip/izleme için yalnızca **Read** izinli, IP'ye bağlı, mümkünse alt hesaba (sub-account) ait anahtar kullan; Withdraw izni hiçbir izleme senaryosunda gerekmez [RESMÎ — anahtar güvenliği bölümü + Agent Trade Kit önerisi].

## Temel uç noktalar

Tam liste (~340 uç nokta): [OKX API v5 referansı](https://www.okx.com/docs-v5/en/). Limitler resmî sayfadan alınmıştır [RESMÎ].

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/api/v5/public/time` | Sunucu saati | Kimliksiz | İmza saat sapmasını önlemek için |
| GET | `/api/v5/system/status` | Planlı/plansız bakım, kesinti olayları | Kimliksiz | 1 istek/5 sn; `env` 1=canlı, 2=demo |
| GET | `/api/v5/support/announcements` | Borsa duyuruları (listeleme, delist, yatırma/çekme askısı, API değişiklikleri…) | Kimliksiz veya özel | 5 istek/2 sn; sayfa başı 20 kayıt; `annType`, `page`; `pTime` ~5 dk gecikebilir; kimliksizde IP'ye, kimlikliyse ikamet ülkesine göre filtrelenir |
| GET | `/api/v5/support/announcement-types` | Duyuru türleri listesi | Kimliksiz | 1 istek/2 sn |
| GET | `/api/v5/market/tickers` | Bir ürün türündeki (SPOT/SWAP/FUTURES/OPTION) tüm ticker'lar | Kimliksiz | 20 istek/2 sn (IP) |
| GET | `/api/v5/market/ticker` | Tek ürün son fiyat, en iyi alış/satış, 24s hacim | Kimliksiz | 20 istek/2 sn (IP) |
| GET | `/api/v5/market/books` | Emir defteri (50 ms'de bir güncellenir) | Kimliksiz | 40 istek/2 sn (IP) |
| GET | `/api/v5/market/candles` | Mum verisi (son 1.440 kayıt) | Kimliksiz | 40 istek/2 sn (IP) |
| GET | `/api/v5/market/history-candles` | Geçmiş mumlar (yıllar; 1s mum son 3 ay) | Kimliksiz | 20 istek/2 sn (IP) |
| GET | `/api/v5/market/trades` | Son gerçekleşen işlemler | Kimliksiz | 100 istek/2 sn (IP) |
| GET | `/api/v5/public/instruments` | Ürün listesi (tickSz, lotSz, state, listTime) | Kimliksiz | Yeni listelenen ürünü yakalamak için |
| GET | `/api/v5/public/funding-rate` | Perpetual fonlama oranı | Kimliksiz | 10 istek/2 sn (IP + ürün); TR dokümanında yok |
| GET | `/api/v5/public/open-interest` | Açık pozisyon toplamı | Kimliksiz | 20 istek/2 sn; TR'de yok |
| GET | `/api/v5/public/economic-calendar` | Makroekonomik takvim (3 ay) | Read (API anahtarı gerekir) | 1 istek/5 sn; 3 aydan eski veri VIP1+; **yalnızca canlı ortam** (demoda yok) |
| GET | `/api/v5/account/balance` | Hesap bakiyesi | Read | 10 istek/2 sn (User ID) |
| GET | `/api/v5/account/positions` | Açık pozisyonlar | Read | 10 istek/2 sn; TR'de yok |
| GET | `/api/v5/trade/orders-pending` | Açık emirler (live, partially_filled) | Read | — |
| GET | `/api/v5/trade/fills` | Gerçekleşen işlemler (son 3 gün) | Read | — |
| POST | `/api/v5/trade/order` | Emir ver | Trade | 60 istek/2 sn (User ID + ürün); kopya işlem lideri 4 istek/2 sn; canlıda KYC Seviye 2 şart (`59113`) |
| POST | `/api/v5/trade/cancel-order` | Emir iptal | Trade | 60 istek/2 sn |
| POST | `/api/v5/asset/withdrawal` | Çekim | Withdraw | TR'de alıcı bilgisi zorunlu |

## Gerçek zamanlı / bildirim

**Webhook yok** — OKX kullanıcıya HTTP geri çağrısı (callback) göndermez; gerçek zamanlı veri yalnızca **WebSocket** ile gelir [RESMÎ — belgede webhook yok]. RSS/WebSub yok [RESMÎ — belgede yok].

| Ortam | Public | Private (login) | Business |
|---|---|---|---|
| Canlı | `wss://ws.okx.com/ws/v5/public` | `wss://ws.okx.com/ws/v5/private` | `wss://ws.okx.com/ws/v5/business` |
| Demo | `wss://wspap.okx.com/ws/v5/public` | `wss://wspap.okx.com/ws/v5/private` | `wss://wspap.okx.com/ws/v5/business` |
| SBE ikili akış | `wss://ws.okx.com/ws/v5/public-sbe` | — | — |

**Önemli yaklaşan değişiklik:** **31 Ekim 2026**'dan itibaren **8443 portu kapanıyor**; `wss://ws.okx.com:8443/...` gibi adresler çalışmayacak, `:8443` kaldırılmalı (443 varsayılan) [RESMÎ — changelog, son güncelleme 30.09.2026].

Sık kullanılan kanallar (`{"op":"subscribe","args":[{"channel":"...","instId":"..."}]}`) [RESMÎ]:

| Kanal | URL | İçerik |
|---|---|---|
| `tickers` | public | Fiyat değişimi |
| `books`, `books5`, `bbo-tbt` | public | Emir defteri (400 seviye / 5 seviye / en iyi alış-satış tick-by-tick) |
| `trades` | public | İşlemler; `trades-all` business'ta |
| `candle1m` … `candle1D` | **business** | Mum |
| `status` | public | Sistem bakım/kesinti olayları |
| `liquidation-orders` | public | Likidasyon emirleri |
| `instruments` | public | Ürün listesi değişimi (yeni listeleme); 30.09.2026'dan beri **artımlı** gönderim — yalnızca değişen ürünler gelir, yerel önbellek `instId`'ye göre güncellenmeli |
| `funding-rate`, `open-interest`, `mark-price`, `price-limit`, `adl-warning` | public | Türev göstergeleri |
| `economic-calendar` | business (login, VIP1+) | Ekonomik takvim |
| `orders`, `fills`, `orders-algo` | private / business | Kendi emirlerin. `fills` yalnızca **VIP4+** (diğerleri `64003` hatası alır, `orders` kanalını kullanmalı) |
| `account`, `positions`, `balance_and_position`, `liquidation-warning` | private | Bakiye/pozisyon/likidasyon uyarısı |
| `deposit-info`, `withdrawal-info` | business (login) | Yatırma/çekme olayları |
| `copytrading-lead-notification` | business (login) | Lider işlemi başarısız olduğunda (kopyalanamadığında) bildirim; pozisyon takibi için değil |

**Bağlantı kuralları** [RESMÎ]: IP başına saniyede 3 bağlantı isteği; bağlantı başına saatte 480 subscribe/unsubscribe/login; 30 sn veri yoksa bağlantı kopar → 30 sn'den kısa aralıkla `ping` gönder, `pong` bekle; özel kanallarda alt hesap başına kanal başına 30 bağlantı; abonelik yükü toplam 64 KB'ı geçmemeli; servis güncellemesinden 60 sn önce `notice` (kod `64008`) gelir — yeniden bağlan. Bu bildirim dokümanın genel bölümüne göre yalnızca `/ws/v5/public` ve `/ws/v5/private` için geçerli; changelog 2026-06-11 ise `business` için de eklendiğini söylüyor (genel bölüm güncellenmemiş) [ÇELİŞKİLİ].

**Duyurular için WebSocket kanalı yok** → duyurular REST ile periyodik sorgulanır [RESMÎ — kanal listesinde yok].

## Takip uygulaması için

OKX bir sosyal ağ değildir; "takip" burada **borsa olayları** ve **piyasa sinyalleri** anlamına gelir.

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Yeni coin listelemesi / delist duyurusu | Evet | `GET /api/v5/support/announcements?annType=announcements-new-listings` (ve `-delistings`) yoklama | Kimliksiz | 5 istek/2 sn; `pTime` ~5 dk gecikebilir; `url` alanı duyuru sayfası [RESMÎ] |
| Yatırma/çekme askıya alma, işlem güncellemeleri, API duyuruları | Evet | Aynı uç, `announcements-deposit-withdrawal-suspension-resumption`, `announcements-trading-updates`, `announcements-api` | Kimliksiz | Duyuru türleri canlı listeden alındı (12 tür) [RESMÎ — 15.10.2026] |
| Yeni ürünün işleme açılması | Evet | `instruments` WS kanalı veya `public/instruments` farkı (`listTime`, `state`) | Kimliksiz | Duyurudan daha hızlı olabilir [TAHMİN] |
| Bakım / kesinti | Evet | `status` WS kanalı + `system/status` | Kimliksiz | `maintType` 1 planlı, 2 plansız, 3 kesinti |
| Fiyat eşiği / ani hareket alarmı | Evet | `tickers` / `candle*` WS + kendi filtren | Kimliksiz | Filtre (eşik, % değişim) istemci tarafında |
| Büyük işlem / balina | Kısmen | `trades` / `trades-all` WS, `sz` alanına göre filtre | Kimliksiz | Adres/kişi bilgisi yok |
| Likidasyonlar | Evet | `liquidation-orders` WS | Kimliksiz | Türev; TR'de belgelenmemiş |
| Kendi emir/bakiye/çekim olayların | Evet | `orders`, `account`, `withdrawal-info` WS | Read | — |
| Bir kopya işlem liderinin (lead trader) yeni pozisyonu | Kısmen | Herkese açık lider uç noktaları (global): `public-lead-traders`, `public-current-subpositions`, `public-subpositions-history`, `public-stats`, `public-pnl` (`/api/v5/copytrading/...`) yoklama; kendin lidersen kendi pozisyonların için `positions`/`orders` WS kanalları | Kimliksiz / Read | Push yok, yoklama gerekir; TR dokümanında yok [RESMÎ] |
| OKX'in sosyal hesapları (X, Telegram) | API ile hayır | İlgili platform API'si: [X](../Sosyal-Medya/X-Twitter.md), [Telegram](../Mesajlasma/Telegram.md) | — | OKX duyuruları sosyal medyada da paylaşır [TAHMİN] |
| Anahtar kelime filtresi | Evet (istemci) | Duyuru `title` alanında arama | — | Sunucu tarafı arama parametresi yok [RESMÎ — yalnızca `annType`, `page`] |

**Minimal akış (öneri):** 1) her 30–60 sn'de `announcements` (sayfa 1) çek; yanıt `pTime` + `businessPTime`'a göre yeniden eskiye sıralanır (`pTime` = ilk gerçek yayım zamanı, `businessPTime` = sayfada gösterilen zaman), bu yüzden yalnızca son görülen `pTime`'a güvenmek yerine görülen duyuruları `url`/başlıkla da işaretle [RESMÎ — sıralama kuralı; yöntem TAHMİN]; 2) `status` ve `instruments` WS kanallarına abone ol; 3) `tickers` ile eşik kuralları; 4) eşleşenleri kendi bildirim kanalına (ör. Telegram botu) gönder [TAHMİN — tasarım önerisi].

## Hız sınırları ve fiyatlar

- **Ücret:** API kullanımı ücretsiz; işlem komisyonu VIP seviyesine göre ([okx.com/fees](https://www.okx.com/fees)) [RESMÎ].
- **Kimliksiz REST:** IP başına, uç nokta bazlı (yukarıdaki tablo) [RESMÎ].
- **Özel REST:** User ID başına; işlemle ilgili uçlar ürün (Instrument ID) başına, opsiyonda ürün ailesi başına; **REST ve WebSocket işlem limitleri ortaktır** [RESMÎ].
- **Aşım:** HTTP 429 benzeri yanıt yerine hata kodu `50011` ("Too Many Requests") [RESMÎ].
- **Alt hesap limiti:** yeni/değiştirilen emir için 1.000 istek/2 sn (`50061`); VIP5+ için doluluk oranına göre 10.000'e kadar [RESMÎ].
- **Emir tavanı:** toplam 4.000 bekleyen emir, ürün başına 500; aynı emirde en çok 3 eşzamanlı değiştirme (`51513`) [RESMÎ].
- **Kendi limitini görme:** `GET /api/v5/trade/account-rate-limit` [RESMÎ].
- **Yakın tarihli değişiklikler** (changelog) [RESMÎ]: 31.10.2026 8443 portu kapanıyor; `elp` emir türü `rpi` olarak yeniden adlandırıldı (eski ad 31.10.2026'ya kadar kabul); 30.09.2026 `Crypto-USD` spot çiftleri `Crypto-USDC` ile değiştirildi (otomatik eşleme yok; emirde `54109` hatası gelirse USDC işlemi etkinleştirilmeli); 30.09.2026 `instruments` kanalı artımlı gönderime geçti; 06.08.2026 toplu indirilebilir **Historical Market Data** ("Get historical market data") uç noktasında azami sorgu aralığı 20→10 (günlükte 10 gün, aylıkta 10 ay) — `market/history-candles` etkilenmedi; 23.06.2026 emir defteri kanallarında `checksum` alanı kullanımdan kaldırıldı; 11.06.2026 `64008` bildirimi business kanalına eklendi; 20.08.2026 orders kanalının gönderim davranışı değişti; 07.04.2026 emir vermek için **KYC Seviye 2** zorunlu (canlı, `59113`) ve `fills`/`books-l2-tbt`/SBE `trades` eşiği VIP4'e indi; 02.03.2026 SBE `bbo-tbt` her seviyeye açıldı (login gerekir); 23.10.2025 duyurularda `pTime` artık ilk gerçek yayım zamanı, yeni `businessPTime` alanı. Yeni: "Signal Clone" (emir paylaşım bağlantısı oluşturma) uç noktası.

## Resmî olmayan yollar ve riskler

- **Web iç uç noktaları (`/priapi/v5/...`)**: okx.com arayüzünün kullandığı belgelenmemiş uçlar (ör. kopya işlem lider istatistikleri, kampanya sayfaları). Topluluk betikleri bunları kazır [3. TARAF]. Riskler: haber verilmeden değişir, Cloudflare/bot koruması IP engeller, OKX API Sözleşmesi ve kullanım koşullarına aykırı olabilir [TAHMİN — sözleşme maddesi ayrıca okunmalı].
- **Duyuru sayfalarını kazıma** (`okx.com/help/section/...`): resmî `announcements` uç noktası varken gereksiz; uç nokta yeterli.
- **Bölge atlatma (VPN ile global hesabı Türkiye'den kullanma, başka bölge alan adı)**: OKX bölgesel ayrımı ikamet ülkesine göre yapar; KYC ile uyumsuz kullanım hesabın kısıtlanmasına yol açabilir [TAHMİN — genel kural, maddesi doğrulanmadı].
- Bu borsa için yaygın bir "gizli/resmî olmayan API" kütüphanesi yok; topluluk kütüphaneleri (CCXT, OKX.Net) **resmî uçları** sarar ve ToS riski taşımaz [3. TARAF].

## SDK ve kütüphaneler

| Ad | Dil | Tür | Not |
|---|---|---|---|
| [`python-okx`](https://pypi.org/project/python-okx/) | Python | Resmî | Sürüm 0.4.4; `flag="1"` demo, `"0"` canlı; `WsPublicAsync`/`WsPrivateAsync` [RESMÎ] |
| [Agent Trade Kit](https://github.com/okx/agent-trade-kit) — `@okx_ai/okx-trade-mcp`, `@okx_ai/okx-trade-cli` | Node.js (MCP sunucusu + CLI `okx`) | Resmî | Yapay zekâ asistanlarına OKX araçları; `market` modülü anahtarsız; `~/.okx/config.toml` içinde `demo = true` profil; npm son sürüm 1.4.8 (23.09.2026) [RESMÎ] |
| [okx/agent-skills](https://github.com/okx/agent-skills) | — | Resmî | `okx-cex-market`, `okx-cex-trade`, `okx-cex-portfolio`, `okx-cex-bot` beceri paketleri [RESMÎ] |
| [OKX.Net (`JK.OKX.Net`)](https://www.nuget.org/packages/JK.OKX.Net) | **.NET** | Topluluk (JKorf / CryptoExchange.Net) | REST + WebSocket, demo desteği; NuGet 5.7.0 (05.10.2026) [3. TARAF] |
| [CCXT](https://github.com/ccxt/ccxt) | JS/TS, Python, PHP, C#, Go | Topluluk | 100+ borsa için ortak arayüz; `okx` sınıfı, `ccxt.pro` ile WebSocket; npm 4.5.88 [3. TARAF] |
| [`okx-api`](https://www.npmjs.com/package/okx-api) (tiagosiebler) | Node.js/TypeScript | Topluluk | REST + WS, otomatik yeniden bağlanma; npm 3.2.6 (07.10.2026) [3. TARAF] |

## Postman / OpenAPI / koleksiyonlar

- Resmî **OpenAPI/Swagger dosyası veya Postman koleksiyonu yayımlanmıyor** [RESMÎ — dokümanda bağlantı yok].
- Dokümanda her uç nokta için HTTP ve Python örneği var; SBE şeması XML olarak sunuluyor: `https://www.okx.com/docs-v5/log_en/xml/okx_sbe_1_0.xml` [RESMÎ].
- Postman'de imza için ön-istek betiği (pre-request script) ile HMAC üretmek gerekir; topluluk koleksiyonları güncelliği garanti etmez [3. TARAF].

## Depoda ilgili sayfalar

- [Telegram API](../Mesajlasma/Telegram.md) — takip uygulamasında bulunan OKX olaylarını kendine bildirim olarak göndermek için en kolay kanal.
- [X (Twitter) API](../Sosyal-Medya/X-Twitter.md) — borsaların resmî hesaplarındaki duyuruları izlemek için.
- [Discord API](../Mesajlasma/Discord.md) — alarm/bildirim botu alternatifi.
- [Blockchain](../../Programlama/Blockchain/) — zincir üstü (on-chain) taraf; borsa API'si yalnızca merkezi borsa (CEX) verisini verir.

## Kaynaklar

Resmî:

- [OKX API v5 dokümanı (Global)](https://www.okx.com/docs-v5/en/) — tüm uç noktalar, kimlik doğrulama, limitler, WebSocket kanalları — (erişim: 15 Ekim 2026)
- [OKX API Changelog](https://www.okx.com/docs-v5/log_en/) — 8443 portu kapanışı, RPI, KYC Seviye 2 (2026-04-07), VIP4 eşikleri, SBE, 64008, Historical Market Data, USDC geçişi, duyuru `businessPTime` — (erişim: 15 Ekim 2026)
- [OKX TR API dokümanı](https://tr.okx.com/docs-v5/en/) — Türkiye kullanıcıları için REST taban adresi ve kapsam — (erişim: 15 Ekim 2026)
- [OKX TR API Changelog](https://tr.okx.com/docs-v5/log_en/) — 03.03.2025 Türkiye çekim (Travel Rule) değişikliği: borsa ve özel cüzdana çekim — (erişim: 15 Ekim 2026)
- [OKX Agent Trade Kit dokümanı](https://www.okx.com/docs-v5/agent_en/) — resmî MCP sunucusu ve CLI — (erişim: 15 Ekim 2026)
- [OKX Broker dokümanı](https://www.okx.com/docs-v5/broker_en/) — broker/partner programı — (erişim: 15 Ekim 2026)
- [OKX API Agreement](https://www.okx.com/help/okx-api-agreement) — API kullanım sözleşmesi — (erişim: 15 Ekim 2026)
- [OKX Demo Trading yardım sayfası](https://www.okx.com/help/demo-trading) — demo ortamı — (erişim: 15 Ekim 2026)
- [OKX TR ana sayfa](https://tr.okx.com/) — TRY çiftleri, yerel uyum ifadeleri — (erişim: 15 Ekim 2026)
- [python-okx (PyPI)](https://pypi.org/project/python-okx/) — resmî Python SDK — (erişim: 15 Ekim 2026)

Üçüncü taraf:

- [OKX.Net (NuGet)](https://www.nuget.org/packages/JK.OKX.Net) — .NET istemci kütüphanesi — (erişim: 15 Ekim 2026)
- [CCXT](https://github.com/ccxt/ccxt) — çok borsalı kripto işlem kütüphanesi — (erişim: 15 Ekim 2026)
- [okx-api (npm)](https://www.npmjs.com/package/okx-api) — Node.js/TypeScript istemcisi — (erişim: 15 Ekim 2026)

> Not: Bu sayfa hazırlanırken web arama kotası dolduğu için ikincil kaynak (blog/forum) taraması yapılamadı; bilgiler doğrudan resmî dokümanlardan, paket kayıtlarından ve kimliksiz canlı API çağrılarından alındı.
