# TradingView API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **resmî public veri API'si yok** (grafik kütüphaneleri, widget'lar, alarm webhook'ları ve broker entegrasyon API'si var)

## Özet

TradingView, son kullanıcıya veya geliştiriciye piyasa verisi, kullanıcı gönderisi, fikir (idea) ya da alarm listesi okuyabileceği **herkese açık bir REST/WebSocket veri API'si sunmaz** [RESMÎ — Kullanım Koşulları Madde 3; ayrı sözleşme olmadan API'lerin ticari kullanımı yasak]. Geliştiricilere sunulanlar: açık kaynak **Lightweight Charts™** (Apache 2.0, ücretsiz), yalnızca şirketlere ve herkese açık web projelerine lisanslanan **Advanced Charts** (Charting Library, ücretsiz ama başvuruyla) ve **Trading Platform**, siteye gömülen ücretsiz **widget'lar**, aracı kurumlar için **REST API for Brokers** [RESMÎ]. Hiçbir grafik kütüphanesi piyasa verisi içermez; veriyi sen sağlarsın [RESMÎ]. TradingView'dan dışarıya olay almanın tek resmî yolu, **alarmlarda webhook URL'si** (HTTP POST) kullanmaktır; bu özellik ücretli planlarda ve 2FA açıkken kullanılabilir [RESMÎ: 2FA şartı; ücretli plan şartı: 3. TARAF/TAHMİN, aşağıya bkz.]. Topluluğun yazdığı WebSocket kütüphaneleri, tarayıcının kullandığı iç protokolü taklit eder ve ToS'a aykırıdır.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Herkese açık (kimliksiz)** | Hiçbir şey | **Widget'lar** (Advanced Chart, Ticker Tape, Symbol Overview, Screener, Economic Calendar, Top Stories haberleri, heatmap'ler…) iframe veya web component ile gömülür; **Lightweight Charts** npm paketi (`lightweight-charts`, son sürüm **5.2.1**, 12.08.2026) [RESMÎ] | Ücretsiz. Lightweight Charts: TradingView atfı + tradingview.com bağlantısı zorunlu (Apache 2.0 NOTICE) [RESMÎ]. Widget'lar veri **vermez**, yalnızca görüntü gösterir |
| **Geliştirici hesabı/uygulama** | — | Bu seviye **yok**: API anahtarı, OAuth uygulaması ya da developer portalı bulunmuyor [RESMÎ — belgelerde böyle bir kayıt akışı yok] | — |
| **İşletme/uygulama onayı (lisans başvurusu)** | Şirket olmak + herkese açık web projesi/uygulaması; "Get the library" formuyla başvuru, onay sonrası özel GitHub deposuna (`tradingview/charting_library`, herkese kapalı) erişim | **Advanced Charts** (100+ indikatör, 80+ / 110+ çizim aracı — resmî sayfada özellik listesinde 80+, karşılaştırma tablosunda 110+ yazıyor; ~670 KB), **Trading Platform** (grafikten emir, watchlist, çoklu düzen; Broker API uygulaması gerekir, ~900 KB) [RESMÎ] | Advanced Charts: ücretsiz, TradingView logosu kalır. Trading Platform: fiyat belgede yok (iletişim) [RESMÎ]. Kişisel/özel projeye verilmez [RESMÎ] |
| **Partner (broker)** | Aracı kurum olmak, TradingView ile anlaşma | **REST API for Brokers**: broker'ın arka ucunu TradingView arayüzüne bağlama (emir, pozisyon, fiyat akışı, yetki). Yön: TradingView → broker sunucusu; veri **okumak için değil** [RESMÎ] | Anlaşmaya bağlı (belgede yok) |
| **Ücretli/kurumsal (kullanıcı planı)** | Essential / Plus / Premium / Ultimate abonelik + 2FA | **Alarm webhook'ları**, daha fazla alarm, saniye bazlı aralıklar, watchlist alarmları [RESMÎ: özellikler; webhook'un hangi planlarda olduğu sayfa metninden doğrulanamadı] | Yıllık ödemede aylık: Essential 12,95 $, Plus 29,95 $, Premium 59,95 $, Ultimate 199,95 $; Basic 0 $ [RESMÎ, 15.10.2026, fiyatlar değişebilir]. Piyasa verisi lisansları ayrıca satılır |
| **Resmî olmayan** | Çoğu zaman TradingView oturum çerezi (`sessionid`, `sessionid_sign`) | Gerçek zamanlı mum/quote, indikatör değerleri, screener, teknik analiz özeti (topluluk kütüphaneleri ile) [3. TARAF] | Ücretsiz ama **ToS ihlali**; hesap kapatma ve hukuki işlem riski [RESMÎ — Koşullar Md. 3] |

## Kimlik doğrulama

- **Public veri API'si olmadığı için resmî bir OAuth/API anahtarı akışı yoktur** [RESMÎ — belgede yok].
- **Widget'lar ve Lightweight Charts**: kimlik doğrulama gerekmez; tarayıcıda çalışır [RESMÎ].
- **Advanced Charts / Trading Platform**: kütüphane sizin sunucunuzda barındırılır; kimlik doğrulama sizin veri kaynağınıza (Datafeed) aittir. Kütüphaneye erişim lisans onayı + özel GitHub deposu ile olur [RESMÎ].
- **REST API for Brokers**: herkese açık [Authentication sayfası](https://www.tradingview.com/broker-api-docs/trading/authentication) iki tür anlatır: **Password Bearer** (kullanıcı TradingView'da broker giriş bilgisini girer, broker sunucusu erişim belirteci döner — `POST /authorize`) ve **OAuth2 Bearer** (OAuth2 Code akışı, token yenileme destekli) [RESMÎ].
- **Webhook alarmları**: TradingView isteği imzalamaz; HMAC/imza başlığı belgede yok [RESMÎ — belgede yok]. Doğrulama için önerilen yollar: kaynak IP beyaz listesi (aşağıda) + mesaj gövdesine sizin belirlediğiniz gizli bir anahtar koymak [TAHMİN — yaygın uygulama]. TradingView, gövdeye **parola/giriş bilgisi koymamayı** öğütler [RESMÎ].
- **Resmî olmayan kütüphaneler**: tarayıcıdaki `sessionid` / `sessionid_sign` çerezleriyle oturum taklidi [3. TARAF]. Bu çerezler hesabın tamamına erişim verir; sızdırılmamalıdır.

## Temel uç noktalar

TradingView'ın kendisine çağrı yapılan public uç nokta **yoktur**. Aşağıdakiler, **sizin uyguladığınız** veya **TradingView'ın sizi çağırdığı** arayüzlerdir.

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| POST (gelen) | `https://<sizin-sunucunuz>/<yol>` | Alarm tetiklenince TradingView gövdede alarm mesajını gönderir | Ücretli plan + 2FA | Yalnızca port 80/443; IPv6 yok; 3 sn içinde yanıt yoksa iptal; gövde geçerli JSON ise `application/json`, değilse `text/plain` [RESMÎ] |
| JS metodu | Datafeed API: `onReady`, `searchSymbols`, `resolveSymbol`, `getBars`, `subscribeBars`, `unsubscribeBars` (+ Trading Platform'da `getQuotes`, `subscribeQuotes`, `unsubscribeQuotes` — Broker API bağlamadan önce zorunlu) | Advanced Charts'a sizin verinizi besler; gerçek zamanlı akış için WebSocket önerilir | Lisanslı | "Kütüphane hiçbir piyasa verisi sağlamaz" [RESMÎ]. İsteğe bağlı: `getMarks` / `getTimescaleMarks` (`supports_marks`), `getServerTime` (`supports_time`), `subscribeDepth` / `unsubscribeDepth` (DOM). Metot adları: [RESMÎ — Datafeed API referansı] |
| GET | UDF adaptörü: `/config`, `/symbol_info?group=`, `/search`, `/symbols`, `/history`, `/time`, `/marks`, `/timescale_marks`, `/quotes` | Hazır Datafeed uygulamasının sizin backend'inize attığı HTTP istekleri | Lisanslı | `/config` ve `/history` her zaman; `/symbol_info` yalnızca `supports_group_request: true` iken; `/search` ve `/symbols` yalnızca `supports_group_request: false` + `supports_search: true` iken; `/marks` ve `/timescale_marks` yalnızca `supports_marks: true` iken; `/quotes` Trading Platform içindir. Gerçek zamanlı akışı kutudan çıktığı gibi desteklemez; hızlı başlangıç/örnek içindir [RESMÎ — UDF sayfası] |
| JS | `createChart()`, `chart.addSeries(CandlestickSeries)`, `series.setData()`, `series.update()` | Lightweight Charts v5 ile grafik çizme ve canlı mum güncelleme | Herkese açık | Veri sizden gelir [RESMÎ] |
| iframe / web component | `https://s3.tradingview.com/...` embed betikleri / `<tv-*>` bileşenleri | Widget gömme | Herkese açık | Widget'lar çerez kurmaz ama gömen sayfa URL'si, sembol ve IP'yi loglar [RESMÎ — Widget FAQ] |
| REST (broker tarafı) | REST API for Brokers, sizin sunucunuzda: `POST /authorize`, `POST /logout`, `GET /config`, `GET /mapping`, `GET /accounts`, `GET /accounts/{accountId}/orders`, `…/positions`, `…/instruments`, `…/state`, `…/stream/orders` gibi `stream/*` uçları; piyasa verisi: `/quotes`, `/symbol_info`, `/history`, `/streaming` | TradingView'ın broker'a yetki/emir/pozisyon/fiyat için yaptığı çağrılar; piyasa verisi uçlarını, broker kendi (ör. Forex/CFD) verisini sağlıyorsa TradingView sunucuları çağırır | Partner | Tam liste herkese açık [API Reference](https://www.tradingview.com/broker-api-docs/rest-api-spec)'ta [RESMÎ — rest-api-spec] |

Tam referanslar: [Advanced Charts dokümanı](https://www.tradingview.com/charting-library-docs/), [Lightweight Charts dokümanı](https://tradingview.github.io/lightweight-charts/), [Broker API dokümanı](https://www.tradingview.com/broker-api-docs/).

## Gerçek zamanlı / bildirim

- **Alarm + webhook (tek resmî "push")** [RESMÎ]:
  - Alarm koşulu: fiyat, indikatör çizimi, çizim nesnesi, strateji emri veya Pine Script'te `alert()` / `alertcondition()`.
  - Bildirim kanalları: uygulama bildirimi, açılır pencere, e-posta, düz metin e-posta, ses, **Webhook URL**. SMS belgede yok.
  - Webhook: tetiklenince HTTP POST; mesaj gövdeye konur. Mesajda yer tutucular kullanılabilir: `{{ticker}}`, `{{exchange}}`, `{{interval}}`, `{{open}}`, `{{high}}`, `{{low}}`, `{{close}}`, `{{volume}}`, `{{time}}`, `{{timenow}}`, `{{plot_0}}`…`{{plot_19}}`, `{{plot("başlık")}}`, stratejide `{{strategy.order.action}}`, `{{strategy.order.contracts}}`, `{{strategy.order.price}}`, `{{strategy.order.id}}`, `{{strategy.order.comment}}`, `{{strategy.order.alert_message}}`, `{{strategy.market_position}}`, `{{strategy.position_size}}` vb.
  - Kaynak IP'ler (beyaz liste): `52.89.214.238`, `34.212.75.30`, `54.218.53.128`, `52.32.178.7`.
  - Teslimat garanti değil; alarm günlüğündeki "Webhook status" sütunundan hata izlenir. Yeniden deneme (retry) politikası belgede yok.
  - Pine Script sıklıkları: `alert.freq_once_per_bar` (varsayılan), `alert.freq_once_per_bar_close`, `alert.freq_all`. `alert()` yalnızca gerçek zamanlı çubukta tetiklenir; aktif alarm, scriptin o anki kopyasını saklar (script değişirse alarm yeniden kurulmalı).
- **Datafeed içinde WebSocket**: Advanced Charts'ta gerçek zamanlı veri `subscribeBars` ile **sizin** WebSocket kaynağınızdan gelir [RESMÎ].
- **RSS / WebSub**: TradingView fikir/yayın/haber akışları için resmî RSS veya WebSub belgesi bulunamadı [RESMÎ — belgede yok].
- **TradingView'ın kendi WebSocket'i** (`data.tradingview.com` vb.): yalnızca TradingView web istemcisi içindir, belgelenmemiştir; resmî olmayan kütüphaneler bunu kullanır [3. TARAF].

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Fiyat bir eşiği geçti / indikatör sinyali | **Evet** | Alarm + webhook → kendi sunucunuz → Telegram/Discord/Slack'e iletme | Ücretli plan + 2FA | En sağlam ve ToS uyumlu yol [RESMÎ] |
| Kendi Pine stratejinizin al/sat emri | **Evet** | `strategy.*` + alarm mesajında `{{strategy.order.action}}` vb. | Ücretli plan | JSON mesaj yazarsanız `application/json` gelir [RESMÎ] |
| Watchlist'teki çok sembol için tek alarm | Kısmen | Watchlist alarmları (Premium: 2, Ultimate: 15 adet) | Premium+ | [RESMÎ — fiyat sayfası] |
| Bir kullanıcının yeni fikir (idea) / script paylaşımı | **Resmî olarak hayır** | Resmî API/RSS yok; yalnızca TradingView içi takip bildirimi (uygulama/e-posta). E-posta bildirimini kendi posta kutunuzdan ayrıştırmak teorik bir yol | — | [RESMÎ — belgede yok]; e-posta ayrıştırma [TAHMİN] |
| Bir kullanıcının canlı yayına (TradingView Live/stream) geçmesi | **Resmî olarak hayır** | API yok; site içi bildirim | — | [RESMÎ — belgede yok] |
| Haber başlıkları (Top Stories) | Yalnızca görüntü | Top Stories widget'ı gömülebilir; veri olarak alınamaz | Herkese açık | Haberi veri olarak almak için haber sağlayıcının kendi API'si kullanılmalı [TAHMİN] |
| Ekonomik takvim olayları | Yalnızca görüntü | Economic Calendar widget'ı | Herkese açık | Veri çekmek ToS'a aykırı [RESMÎ — Md. 3] |
| Gerçek zamanlı fiyat verisini programla okumak | Resmî olarak hayır | Borsa/broker API'si (ör. kripto borsaları) veya lisanslı veri sağlayıcı kullanın; TradingView'ı yalnızca grafik için | — | TradingView verisi "yalnızca görüntüleme" lisanslı; otomatik/görüntüsüz kullanım yasak [RESMÎ] |
| Anahtar kelime/filtreleme | Sizin tarafınızda | Webhook gövdesine sembol/strateji/önem etiketi koyup sunucuda filtreleme | Ücretli plan | Webhook 3 sn'de yanıt beklediği için işi kuyruğa alıp hemen 200 dönün [TAHMİN — RESMÎ 3 sn kuralından türetildi] |

## Hız sınırları ve fiyatlar

- **Kullanıcı planları** (yıllık ödemede aylık eşdeğer, 15.10.2026) [RESMÎ]:

| Plan | Fiyat | Fiyat alarmı | Teknik alarm | Watchlist alarmı | Webhook |
|---|---|---|---|---|---|
| Basic | 0 $ | 3 | — | — | Yok [3. TARAF/TAHMİN] |
| Essential | 12,95 $ | 20 | 20 | 0 | Var [3. TARAF/TAHMİN] |
| Plus | 29,95 $ | 100 | 100 | 0 | Var [3. TARAF/TAHMİN] |
| Premium | 59,95 $ | 400 | 400 | 2 | Var [3. TARAF/TAHMİN] |
| Ultimate | 199,95 $ | 1.000 | 1.000 | 15 | Var [3. TARAF/TAHMİN] |

  > Webhook satırı: fiyat sayfasının karşılaştırma tablosunda "Webhook notifications" satırı **var**, ancak hangi planlarda işaretli olduğu metin olarak doğrulanamadı. Yaygın bilgi, webhook'un ücretsiz planda olmadığı ve ücretli planlarda bulunduğudur [ÇELİŞKİLİ değil ama doğrulanmadı — satın almadan önce tabloya bakın].
- **Webhook limitleri** [RESMÎ]: 3 sn zaman aşımı, yalnızca 80/443, IPv6 yok. Saniye başına istek limiti belgede yok.
- **Lightweight Charts**: ücretsiz, limit yok (istemci tarafı kütüphane) [RESMÎ].
- **Advanced Charts**: ücretsiz lisans, TradingView logosu kalır; **Trading Platform**: fiyat belgede yok, logo kaldırılabilir [RESMÎ].
- **Widget'lar**: ücret belgede açıkça yazmıyor; ücretsiz olarak sunuluyor [3. TARAF/TAHMİN]. Logo/atıf değişikliği için TradingView ile iletişim gerekir [RESMÎ].
- **Piyasa verisi**: planlar yalnızca "kullanıcı başı ek ücret gerektirmeyen" verileri içerir; diğer borsaların gerçek zamanlı verisi ayrıca satın alınır; profesyonel olmayan kullanıcı veriyi yalnızca kişisel amaçla kullanabilir [RESMÎ — Md. 10, 13].

## Resmî olmayan yollar ve riskler

| Kütüphane | Dil | Ne yapar | Nasıl çalışır | Durum (15.10.2026) |
|---|---|---|---|---|
| [Mathieu2301/TradingView-API](https://github.com/Mathieu2301/TradingView-API) (`@mathieuc/tradingview`) | Node.js | Gerçek zamanlı mum/quote, indikatör ve Pine değerleri, screener, replay, watchlist okuma | TradingView web istemcisinin WebSocket protokolünü taklit eder; isteğe bağlı `sessionid`/`sessionid_sign` çerezi | npm 4.0.0, ~5.6k yıldız, aktif. Kendisi "bağımsız topluluk projesi, resmî API değil" diyor [3. TARAF] |
| [rongardF/tvdatafeed](https://github.com/rongardF/tvdatafeed) | Python | Geçmiş OHLCV indirme | Aynı WebSocket protokolü; kullanıcı adı/parola veya anonim | Son güncelleme 2024; bakım zayıf [3. TARAF] |
| [AnalyzerREST/python-tradingview-ta](https://github.com/AnalyzerREST/python-tradingview-ta) (`tradingview-ta`) | Python | "Teknik analiz özeti" (AL/SAT/NÖTR) ve indikatör değerleri | TradingView'ın screener uç noktalarına (`scanner.tradingview.com`) HTTP isteği | PyPI 3.3.0 [3. TARAF] |
| [mnwato/tradingview-scraper](https://github.com/mnwato/tradingview-scraper) | Python | Fikirler, haberler, göstergeler vb. kazıma | HTML/iç uç nokta kazıma | Aktif (2026) [3. TARAF] |

**Riskler (nesnel)**:
- **ToS**: Kullanım Koşulları Md. 3 — veri "yalnızca görüntüleme" lisanslıdır; otomatik işlem, otomatik emir üretimi ve insan tarafından okunur gösterim olmayan her makine süreci (non-display use) yasaktır; içerik dağıtımı/alt lisanslama yasaktır; ayrı sözleşme olmadan hizmetlerin veya API'lerin ticari kullanımı yasaktır; yazılımın kaynak koda çevrilmesi/tersine mühendislik yasaktır [RESMÎ].
- **Yaptırım**: kullanıcı/ziyaretçinin engellenmesi, hesabın kapatılması ve tazminat davası açıkça sayılmış [RESMÎ — Md. 3].
- **Geriye uyumluluk yok**: TradingView API'lerinde geriye uyumluluk garantisi vermediğini ve hizmeti haber vermeden değiştirebileceğini söyler; iç protokol her an bozulabilir [RESMÎ — Md. 2].
- **Veri lisansı**: borsa verisinin yeniden dağıtımı borsa sözleşmelerini de ihlal edebilir (veri sağlayıcı lisansları) [RESMÎ — Md. 3].
- **Hesap güvenliği**: oturum çerezini bir betiğe vermek, hesabın tamamını (ödeme bilgisi dahil) o betiğe açmak demektir [TAHMİN — çerezin doğası gereği].
- **Sonuç**: kişisel öğrenme denemesi dışında, özellikle ticari takip uygulamasında bu kütüphaneler **önerilmez**; veri için borsa/broker API'si, sinyal için webhook kullanılmalı [TAHMİN — değerlendirme].

## SDK ve kütüphaneler

**Resmî**
- [`lightweight-charts`](https://github.com/tradingview/lightweight-charts) — npm, TypeScript tipli, Apache 2.0, ~35 KB; v5.2.1 [RESMÎ]. iOS/Android sarmalayıcıları mevcut [RESMÎ].
- Advanced Charts / Trading Platform — lisanslı özel depo; [charting-library-examples](https://github.com/tradingview/charting-library-examples) deposunda React, Vue, Angular, Next.js vb. entegrasyon örnekleri [RESMÎ].
- Pine Script v6 — TradingView içinde çalışan dil; dışarıdan çalıştırılamaz, yalnızca alarm üzerinden dışarıya sinyal verir [RESMÎ].
- **.NET için resmî SDK yok** [RESMÎ — belgede yok].

**.NET tarafında pratik yaklaşım** [TAHMİN]
- Webhook alıcı: ASP.NET Core Minimal API ile `app.MapPost("/tv-alarm", ...)`; IP beyaz listesi + gövdedeki gizli anahtar kontrolü; işi `Channel<T>` veya RabbitMQ kuyruğuna alıp hemen `200 OK` dönmek (3 sn sınırı).
- Grafik: Blazor/Razor sayfasına Lightweight Charts'ı JS interop ile eklemek.
- Topluluk .NET istemcileri (TradingView WebSocket taklidi) küçük ve bakımsız; adı belgelere dayanarak doğrulanamadı — kullanmadan önce depo durumunu kontrol edin [TAHMİN].

## Postman / OpenAPI / koleksiyonlar

- TradingView'ın kullanıcıya yönelik bir OpenAPI/Postman koleksiyonu **yok** [RESMÎ — belgede yok].
- REST API for Brokers'ın [API Reference](https://www.tradingview.com/broker-api-docs/rest-api-spec)'ı herkese açıktır; Redocly ile OpenAPI düzeninde yayımlanır ve broker'ın uygulayacağı uç noktaları tanımlar [RESMÎ — rest-api-spec]. İndirilebilir spec dosyasının herkese açık olup olmadığı sayfa metninden doğrulanamadı.
- Webhook'u test etmek için: alarmı kurup gövdeyi webhook.site benzeri bir istek yakalayıcıya veya kendi Postman Mock Server'ınıza yönlendirmek [TAHMİN].

## Depoda ilgili sayfalar

- [Kripto borsaları — Bybit ve Kraken](../Kripto-Borsalari/Bybit-ve-Kraken.md) — TradingView'ın vermediği gerçek zamanlı fiyat/emir verisi için resmî borsa API'leri.
- [Telegram](../Mesajlasma/Telegram.md), [Discord](../Mesajlasma/Discord.md), [Slack](../Mesajlasma/Slack.md) — webhook ile gelen alarmları iletmek için mesajlaşma API'leri.
- [JavaScript-TypeScript](../../Programlama/JavaScript-TypeScript/) — Lightweight Charts'ı kullanmak için gereken JS/TS temelleri.

## Kaynaklar

**Resmî**
- https://www.tradingview.com/policies/ — Kullanım Koşulları (Md. 2, 3, 10, 11, 13: görüntüleme lisansı, non-display yasağı, API'nin ticari kullanımı, yaptırımlar) — (erişim: 15 Ekim 2026)
- https://www.tradingview.com/support/solutions/43000529348-about-webhooks/ — Webhook alarmları: 2FA, port, IP listesi, 3 sn zaman aşımı, içerik türü — (erişim: 15 Ekim 2026)
- https://www.tradingview.com/support/solutions/43000595315-how-to-set-up-alerts/ — Alarm türleri ve bildirim kanalları — (erişim: 15 Ekim 2026)
- https://www.tradingview.com/support/solutions/43000481368-strategy-alerts/ — Strateji alarmlarında yer tutucular — (erişim: 15 Ekim 2026)
- https://www.tradingview.com/pine-script-docs/concepts/alerts/ — Pine Script v6 `alert()` / `alertcondition()` ve yer tutucular — (erişim: 15 Ekim 2026)
- https://www.tradingview.com/pricing/ — Plan fiyatları ve alarm kotaları — (erişim: 15 Ekim 2026)
- https://www.tradingview.com/free-charting-libraries/ — Lightweight Charts / Advanced Charts / Trading Platform karşılaştırması ve lisans koşulları — (erişim: 15 Ekim 2026)
- https://www.tradingview.com/advanced-charts/ — Advanced Charts ürün sayfası ve başvuru ("Get the library") — (erişim: 15 Ekim 2026)
- https://www.tradingview.com/charting-library-docs/ — Advanced Charts dokümanı; "Connecting data", Datafeed API, UDF adaptörü — (erişim: 15 Ekim 2026)
- https://www.tradingview.com/broker-api-docs/ — REST API for Brokers (broker entegrasyonu) — (erişim: 15 Ekim 2026)
- https://www.tradingview.com/broker-api-docs/rest-api-spec — REST API for Brokers API Reference (uç nokta yolları) — (erişim: 15 Ekim 2026)
- https://www.tradingview.com/broker-api-docs/trading/authentication — Broker entegrasyonunda Password Bearer / OAuth2 Bearer — (erişim: 15 Ekim 2026)
- https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF/ — UDF uç noktaları ve koşulları — (erişim: 15 Ekim 2026)
- https://www.tradingview.com/charting-library-docs/latest/connecting_data/Datafeed-API/ — Datafeed API metotları (zorunlu/isteğe bağlı/Trading Platform) — (erişim: 15 Ekim 2026)
- https://www.tradingview.com/widget-docs/ — Widget listesi, iframe/web component gömme, SSS (atıf, izleme) — (erişim: 15 Ekim 2026)
- https://github.com/tradingview/lightweight-charts — Lightweight Charts kaynak kodu, Apache 2.0, sürüm 5.2.1 — (erişim: 15 Ekim 2026)
- https://tradingview.github.io/lightweight-charts/ — Lightweight Charts dokümanı — (erişim: 15 Ekim 2026)
- https://github.com/tradingview/charting-library-examples — Advanced Charts entegrasyon örnekleri — (erişim: 15 Ekim 2026)

**3. taraf (resmî olmayan)**
- https://github.com/Mathieu2301/TradingView-API — Node.js WebSocket istemcisi (resmî değil) — (erişim: 15 Ekim 2026)
- https://github.com/rongardF/tvdatafeed — Python geçmiş veri indirici (resmî değil) — (erişim: 15 Ekim 2026)
- https://github.com/AnalyzerREST/python-tradingview-ta — Python teknik analiz özeti (resmî değil) — (erişim: 15 Ekim 2026)
- https://github.com/mnwato/tradingview-scraper — Python kazıyıcı (resmî değil) — (erişim: 15 Ekim 2026)

> Not: Bu sayfa hazırlanırken web arama kotası doldu; webhook'un hangi planlarda açık olduğu resmî sayfalarda metin olarak tam doğrulanamadı (Datafeed/UDF ve Broker API uç noktaları sonradan resmî sayfalardan doğrulandı). Bu noktalar etiketlerle belirtildi.

---

[← API dizini](../)
