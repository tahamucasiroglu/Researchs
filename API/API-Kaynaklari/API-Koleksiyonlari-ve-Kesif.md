# API Koleksiyonları ve Keşif Kaynakları API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (dizinlerin çoğu aktif; bazı resmî spesifikasyon depoları arşivlenmiş, aşağıda belirtildi)

## Özet

Bu sayfa tek bir platformu değil, **API bulmaya ve denemeye yarayan kaynakları** anlatıyor: elle derlenmiş listeler (public-apis, Free Public APIs), makinenin okuyabildiği OpenAPI dizinleri (APIs.guru), platformların resmî Postman workspace'leri ve OpenAPI dosyaları, bir de pazar yeri (RapidAPI Hub). Bunların çoğu ücretsiz. RapidAPI'de API'yi yayınlayan sağlayıcı aylık plan ve kota aşım ücreti belirler. İkinci bölümde, resmî API'si olmayan servislerde **tarayıcı geliştirici araçları, HAR ve mitmproxy** ile uç nokta keşfi anlatılıyor; ardından kısa bir hukuk/ToS çerçevesi var. Bir proje başlamadan önce sıra şöyle olmalı: önce **resmî doküman ve resmî Postman/OpenAPI**, sonra dizinler, en son resmî olmayan keşif.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | public-apis listesi (GitHub), APIs.guru dizini ve REST API'si, Free Public APIs listesi, platformların GitHub'daki OpenAPI dosyaları (X, Discord, Meta/WhatsApp) | Ücretsiz [RESMÎ] |
| Geliştirici hesabı / uygulama | Postman hesabı (fork için), RapidAPI hesabı, ilgili platformun geliştirici uygulaması (client id/token) | Postman koleksiyonunu fork edip kendi token'ınla çalıştırma; RapidAPI'de abonelik | Postman Free planı tek kişinin fork edip denemesi için yeterli; Mart 2026'dan beri Free plan tek kullanıcılı, ekip kurulamıyor [RESMÎ, Postman About plans]; RapidAPI'de çoğu API'nin ücretsiz BASIC planı var [RESMÎ] |
| İşletme / uygulama onayı | Platforma göre değişir (Meta Business portföyü, App Review vb.) | Koleksiyon yalnızca bir istemci; asıl erişim platformun onay sürecine bağlıdır. Örnek: WhatsApp koleksiyonu için Meta business portfolio, WhatsApp Business Account ve işletme telefon numarası gerekir [3. TARAF, Meta açıklamasının kopyası] | Platformun fiyatlandırması |
| Ücretli / kurumsal | RapidAPI ücretli planları, Postman ücretli planları (Solo, Team, Enterprise; Mart 2026'da Team, Basic'in yerini aldı) [RESMÎ] | Daha yüksek kota; RapidAPI Enterprise Hub; Postman'de ekipçe paylaşım (Team ve üstü) | Sağlayıcı belirler; kotayı aşınca ek ücret alınır [RESMÎ] |
| Resmî olmayan | Tarayıcı DevTools, HAR, mitmproxy | Web/mobil uygulamaların kendi kullandığı iç uç noktalar | Ücretsiz ama **ToS/ban/hukuki risk** (aşağıda) |

## Kimlik doğrulama

- **public-apis**: listedeki her API için `Auth` sütunu var. Görülen değerler `No`, `apiKey`, `OAuth`, `X-Mashape-Key`, `User-Agent`. Diğer sütunlar: `HTTPS` (Yes/No) ve `CORS` (Yes/No/Unknown) [RESMÎ, README].
- **APIs.guru REST API**: anahtar gerekmiyor; `https://api.apis.guru/v2/metrics.json` kimliksiz açılıyor (15.10.2026'da doğrulandı) [RESMÎ].
- **Postman resmî koleksiyonları**: koleksiyon bir "environment" ile birlikte gelir. Token, telefon numarası ID'si gibi değişkenleri kendi "current value" alanına girersin. Meta, sorgu çalıştırmak için ortam değişkenlerinin doldurulmasını istiyor [3. TARAF, Meta açıklamasının kopyası]. WhatsApp tarafında yalnızca iki izin gerekiyor: `whatsapp_business_management` ve `whatsapp_business_messaging` [3. TARAF].
- **RapidAPI**: tek bir RapidAPI anahtarı tüm abone olduğun API'lerde çalışır. Hangi istek başlıklarının gönderileceği her API'nin "Code Snippets" sekmesinde yazar. Yaygın kullanım `X-RapidAPI-Key` + `X-RapidAPI-Host` [TAHMİN: okunan sayfada bu başlık adları geçmiyordu, yaygın snippet biçimi bu].
- **Resmî olmayan uç noktalar**: genelde tarayıcının oturum çerezi (`Cookie`), `Authorization: Bearer ...` başlığı, CSRF token'ı ya da uygulamaya gömülü misafir token'ı kullanılır. Bunlar kişisel kimlik bilgisidir; HAR dosyalarını paylaşırken dikkat et (aşağıda).

## Temel uç noktalar

Bu bölümde dizinlerin kendi programatik erişim noktaları ve platformların resmî makine-okur spesifikasyonları var.

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `https://api.apis.guru/v2/metrics.json` | Dizin istatistikleri: spesifikasyon, API ve uç nokta sayısı, haftalık eklenen/güncellenen | Herkese açık | 15.10.2026 değerleri: 3.992 spec, 2.529 API, 108.837 uç nokta, 677 sağlayıcı; bu hafta 9 eklenen, 437 güncellenen [RESMÎ] |
| GET | `https://api.apis.guru/v2/list.json` | Tüm API'lerin listesi ve her sürümün OpenAPI dosya bağlantıları | Herkese açık | [doğrulandı 15.10.2026, kimliksiz 200]. Büyük bir dosya (~8,9 MB); tek bir sağlayıcı için daha küçük `https://api.apis.guru/v2/{provider}.json` (ör. `1forge.com.json`, ~1 KB) tercih edilebilir [doğrulandı 15.10.2026]. `apis.guru/api-doc` JavaScript ile yüklendiği için düz okumada uç noktaları göstermiyor |
| GET | `https://api.apis.guru/v2/providers.json` | Sağlayıcı listesi (`{"data":[...]}` biçiminde) | Herkese açık | [doğrulandı 15.10.2026, kimliksiz 200] |
| GET | `https://api.x.com/2/openapi.json` | X API v2'nin resmî OpenAPI spesifikasyonu | Herkese açık | [RESMÎ, docs.x.com Tools & Libraries] |
| — | `github.com/discord/discord-api-spec` → `specs/openapi.json`, `specs/openapi_preview.json` | Discord API v10 için OpenAPI 3.1 | Herkese açık | **Public preview**: haber verilmeden kırıcı değişiklik gelebilir, production'da kullanılması önerilmiyor; MIT lisanslı [RESMÎ] |
| — | `github.com/facebook/openapi` → `business-messaging-api_v23.0.yaml` | WhatsApp Business Messaging API için OpenAPI (YAML) | Herkese açık | SDK üretmek için; MIT lisanslı, API kullanımı ayrıca Meta koşullarına tabi [RESMÎ] |
| — | `github.com/slackapi/slack-api-specs` | Slack Web API OpenAPI 2.0 + Events API AsyncAPI 1.0 | Herkese açık | **27 Mart 2024'te arşivlendi**, salt okunur; güncel değil [RESMÎ] |
| — | Twitch | Resmî OpenAPI veya Postman koleksiyonu **belgede yok**. Bunun yerine resmî `twitch-cli` var: `api`, `mock-api`, `event` (webhook ve WebSocket testi), `token` | Geliştirici | [RESMÎ, dev.twitch.tv/docs/cli] |

Resmî Postman koleksiyonları (bağlantılar platformun kendi dokümanından alındı):

| Platform | Bağlantı | Doğrulama |
|---|---|---|
| X API v2 | `https://www.postman.com/xapidevelopers/x-api-public-workspace/collection/34902927-2efc5689-99c6-4ab6-8091-996f35c2fd80` | docs.x.com'da bağlantı var, v2 uç noktalarının tamamını kapsıyor [RESMÎ] |
| WhatsApp Business Platform (Meta) | `https://www.postman.com/meta/whatsapp-business-platform/` | Meta'nın Cloud API Overview sayfasındaki "Test resources" bölümünde bağlantı var [RESMÎ] |
| Twitch | — | Resmî dokümanda bulunamadı ("belgede yok") |
| Discord | — | Resmî Postman bulunamadı; resmî kaynak OpenAPI spec (yukarıda) |
| Slack | — | Güncel Web API sayfasında (docs.slack.dev) Postman ya da OpenAPI geçmiyor [RESMÎ]; eski spec deposu arşivlendi |

> Not: postman.com sayfaları JavaScript ile yükleniyor ve bu oturumda doğrudan okunamadı. Bağlantılar yalnızca platformun **kendi dokümanında** geçtiği için "resmî" sayıldı. Postman'de bir workspace'in resmî olup olmadığını anlamanın en güvenli yolu, bağlantıyı platformun kendi developer sitesinden almak. Arama sonuçlarında aynı ada sahip çok sayıda kopya ve 3. taraf koleksiyonu çıkıyor; örneğin Whapi.Cloud ayrı bir üründür [3. TARAF].

## Gerçek zamanlı / bildirim

- **APIs.guru**: yeni eklenen ve güncellenen API'ler için RSS beslemesi var [RESMÎ, openapi-directory README]. Güncelleme betiği tanımları kaynaklarından (`x-origin`) en az haftada bir çekiyor ve doğruluyor [RESMÎ].
- **Postman**: forkladığın koleksiyon, kaynak koleksiyon güncellenince kendiliğinden güncellenmez; değişiklikleri "pull" ile alırsın. Workspace'i izleme (watch) özelliği [TAHMİN: okunan doküman sayfası bunu anlatmıyordu]. 3. taraf bir dokümanda da "Run in Postman/Import ile alınan sürüm otomatik güncellenmez" yazıyor [3. TARAF].
- **public-apis / Free Public APIs**: bildirim mekanizması yok. GitHub'da repo "Watch → Releases/All" ile takip edilebilir [TAHMİN].
- **Free Public APIs**: listedeki her uç noktayı her gün çağırıp gecikme, hata oranı ve güvenilirliğe göre bir "health score" hesaplıyor [RESMÎ, site ana sayfası].
- **Resmî olmayan keşifte gerçek zamanlı akış**: Chrome DevTools'ta WebSocket bağlantıları `is:running` filtresiyle bulunur; **Messages** sekmesi son 100 mesajı gösterir [RESMÎ, Chrome DevTools]. mitmproxy HTTP/1, HTTP/2, HTTP/3 (şeffaf proxy 11.0+), WebSocket ve DNS trafiğini yakalayabilir [RESMÎ, CHANGELOG]. Canlı yayın ve sohbet akışları çoğu sitede WebSocket üzerinden gelir; bu yüzden takip uygulaması için asıl keşif noktası burasıdır.

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Bir platformun resmî API'si var mı, hangi uç noktalar var? | Evet | Önce platformun developer sitesi, sonra resmî OpenAPI/Postman; ek olarak APIs.guru'da sağlayıcı araması | Herkese açık | APIs.guru'da sosyal medyanın çoğu yok; dizin daha çok bulut ve kurumsal API ağırlıklı (azure, googleapis, aws…) [RESMÎ, metrics] |
| Platform API'sini kod yazmadan denemek | Evet | Resmî Postman koleksiyonunu fork et + environment'ı doldur | Geliştirici (X için + ücretli kredi) | X ve WhatsApp'ta resmî koleksiyon var [RESMÎ]. Koleksiyon ücretsiz olsa da X API çağrıları ücretlidir: kullandıkça öde (pay-per-usage), abonelik ve ücretsiz katman yok, kredi önceden alınır (ör. post okuma 0,005 $, post oluşturma 0,015 $) [RESMÎ, docs.x.com pricing]. Kredi harcamadan denemek için resmî API Playground (yerel mock sunucu) kullanılabilir |
| İstemci/SDK üretmek (.NET dahil) | Evet | OpenAPI dosyasından `openapi-generator`, NSwag ya da Kiota ile kod üretimi | Herkese açık | Discord spec'i preview, Slack spec'i arşivlendi; üretilen kodun bakımı sana kalır [TAHMİN] |
| Webhook/olay akışını yerelde test etmek | Kısmen | Twitch: `twitch-cli event trigger` ile sahte EventSub olayları [RESMÎ]; diğerlerinde platform test araçları | Geliştirici | — |
| Resmî API'si olmayan sitede yeni gönderi / canlı yayın | Teknik olarak çoğu zaman mümkün | DevTools'ta Fetch/XHR ve WS filtreleri → "Copy as cURL/fetch" → koda taşıma | Resmî olmayan | ToS riski var; iç uç noktalar habersiz değişebilir |
| Mobil uygulamanın kullandığı uç noktalar | Kısmen | mitmproxy + cihaza CA sertifikası kurma (mitm.it) | Resmî olmayan | Sertifika sabitleme (pinning) yapan uygulamalar mitmproxy sertifikasını reddeder; aşmak için uygulamayı yamamak gerekir (apk-mitm, objection vb.) [RESMÎ, mitmproxy]. Bu, ToS ve bazı ülkelerde hukuk açısından daha ağır risk taşır |
| Hazır "scraper API" ile takip (ör. RapidAPI'deki sosyal medya API'leri) | Evet | RapidAPI aboneliği | Ücretli/3. taraf | Bu API'lerin çoğu resmî değil; arkada scraping yapan 3. taraf hizmetlerdir [TAHMİN]. Kalıcılık ve hukuki sorumluluk belirsiz |
| Filtreleme / anahtar kelime | — | Bu kaynakların kendisinde yok; filtreleme takip uygulamasının kendi katmanında yapılır | — | — |

## Hız sınırları ve fiyatlar

- **public-apis**: liste ücretsiz, MIT lisanslı [RESMÎ]. Listedeki her API'nin kendi limiti vardır. Repo topluluk üyeleri ("community members") tarafından, aralarında APILayer çalışanları da olmak üzere elle derleniyor. README'de APILayer ürünlerinin tanıtımı ve sponsor bağlantıları da var [RESMÎ, README]. Bu, listenin tarafsızlığı açısından göz önünde tutulmalı.
- **APIs.guru**: ücretsiz. Yazarların katkı verdiği tanımlar CC0 1.0 lisanslı; kamu kaynaklarından alınanlar "fair use" ilkesiyle kullanılıyor [RESMÎ]. GitHub raw bağlantılarına doğrudan bağlanma; repo yapısı değişebilir, REST API'yi kullan [RESMÎ]. 15.10.2026 itibarıyla 166 tanıma ulaşılamıyor, 688 tanım geçersiz [RESMÎ, metrics].
- **Free Public APIs**: ücretsiz; 768 API listeleniyor [RESMÎ, site]. Sitenin kendi API'si menüde görünüyor ama okunan sayfada uç noktaları anlatılmıyordu ("belgede yok").
- **RapidAPI Hub**: hesap ücretsiz. "Pricing" sekmesi olan API'lere istek atmadan önce bir plana abone olmak gerekiyor. Planlar aylık ücretli ve kota aşılınca ek ücret alınıyor [RESMÎ]. Yanıt başlıkları: `x-ratelimit-requests-limit`, `x-ratelimit-requests-remaining`, `x-ratelimit-requests-reset`. Ücretsiz planlarda ayrıca `x-rate-limit-rapid-free-plans-hard-limit-*` başlıkları geliyor (aylık sert sınır) [RESMÎ]. **Kartını tanımladıysan kota aşımı faturalanır**; dashboard'dan takip et. Sahiplik: Nokia, 13 Kasım 2024'te Rapid'in (eski RapidAPI) teknoloji varlıklarını ve API Hub'ı da içeren Ar-Ge birimini satın aldı; şirketin tamamı değil, teknoloji ve Ar-Ge birimi alındı [RESMÎ, Nokia basın bülteni]. Hub, Nokia'nın Network as Code / ağ API'leri stratejisine bağlandı.
- **Postman**: Mart 2026'dan beri planlar Free (1 kullanıcı, ekip kurulamaz), Solo, Team (Basic'in yerine) ve Enterprise; yeni planların hepsinde collection run sınırsız [RESMÎ, Postman About plans]. Public API Network'te gezinmek ve tek başına fork edip denemek için Free plan yeterli; koleksiyonu ekipçe paylaşmak için Team veya üstü gerekir. Eski (legacy) planlar yenileme tarihine kadar sürer.

## Resmî olmayan yollar ve riskler

### Nasıl keşfedilir (nesnel teknik özet)

1. **Tarayıcı geliştirici araçları (Chrome/Edge/Firefox)** — Network panelinde **Fetch/XHR** filtresi sayfanın arka planda çağırdığı JSON uç noktalarını gösterir. **Copy as cURL / Copy as fetch** tek bir isteği kopyalar; "Copy all as…" filtreden bağımsız tüm istekleri, "Copy all listed as…" ise yalnızca o anki filtreye uyan istekleri kopyalar [RESMÎ, Chrome DevTools].
2. **HAR (HTTP Archive)** — Bir oturumun tüm isteklerini JSON olarak dışa aktarır. Chrome varsayılan olarak **sanitized** HAR üretir: `Cookie`, `Set-Cookie` ve `Authorization` başlıkları çıkarılır. Hassas veri içeren HAR için ayarlardan "Allow to generate HAR with sensitive data" açılmalı [RESMÎ]. **HAR dosyasını depoya koyma ya da paylaşma**: oturum token'ı, kişisel mesaj ve kimlik bilgisi içerebilir (bu deponun gizlilik kuralı da bunu yasaklar).
3. **mitmproxy** — HTTP/1, HTTP/2, HTTP/3 (10.0'da deneysel, 11.0'dan beri şeffaf proxy), WebSocket ve DNS için TLS destekli, araya giren (intercepting) proxy. `mitmproxy` konsolda, `mitmweb` web arayüzünde (beta), `mitmdump` komut satırında (kayıt, filtreleme, replay, Python betikleri) çalışır [RESMÎ]. Cihaza CA kurmak için proxy'ye bağlıyken `mitm.it` açılır; dosyalar `~/.mitmproxy` altındadır (`.pem`, Windows'ta `.p12`) [RESMÎ]. HAR içe/dışa aktarma 10.1.0'dan (Eylül 2023) beri var: okuma `mitmproxy -r dosya.har`, yazma `save.har` komutu ve `mitmdump --set hardump=dosya.har` [RESMÎ, CHANGELOG].
4. **Diğer araçlar** (adı geçsin diye): Charles Proxy, Fiddler, HTTP Toolkit, Burp Suite [TAHMİN: bu oturumda doğrulanmadı]. Topluluğun hazır kütüphaneleri (ör. X için twscrape, Instagram için instaloader) ilgili platform sayfalarında anlatılıyor.

### Riskler

| Risk | Açıklama |
|---|---|
| ToS ihlali / hesap kapatma | Platformların çoğu otomatik erişimi ve scraping'i kullanım koşullarında yasaklar. Giriş yapılmış hesapla yapılan otomasyon hesap ve IP banına yol açabilir [TAHMİN, genel] |
| Sözleşme ihlali | *hiQ v. LinkedIn* (ABD): 9. Daire 2019'da ve 2022'de herkese açık verinin kazınmasını CFAA açısından hiQ lehine değerlendirdi. Ancak Kasım 2022'de bölge mahkemesi hiQ'nun LinkedIn **Kullanıcı Sözleşmesini ihlal ettiğine** hükmetti ve taraflar uzlaştı [3. TARAF, Wikipedia]. Ders: "Herkese açık veri" olması sözleşme riskini ortadan kaldırmaz |
| Yetkisiz erişim | Engellendikten sonra (IP bloğu, ihtarname) erişmeye devam etmek ABD'de CFAA iddiasına dayanak olabilir (*Craigslist v. 3Taps*, N.D. Cal. 2013; dava 2012'de açıldı) [3. TARAF]. Türkiye'de TCK m. 243–244 (bilişim sistemine girme, verileri bozma/engelleme) ayrıca değerlendirilmelidir [TAHMİN, hukuki görüş değildir] |
| Kişisel veri (KVKK/GDPR) | Herkese açık profil verisi yine de kişisel veridir; başka amaçla işlenmesi hukuka aykırı olabilir. Fransa'da CNIL 2020'de bunu açıkça belirtti [3. TARAF]. Türkiye'de KVKK'da aydınlatma, işleme şartı ve yurt dışına aktarım yükümlülükleri var [TAHMİN, genel]. Takip uygulaması **kişi** izliyorsa en hassas nokta budur |
| Telif / veritabanı hakkı | AB'de veritabanı direktifi (sui generis hak) içerik derlemelerini korur; haber içeriğini olduğu gibi yeniden yayınlamak telif sorunudur (Meltwater davaları) [3. TARAF] |
| Kırılganlık | İç uç noktalar, parametreler ve imzalar (ör. istek imzalama, doc_id/query hash) habersiz değişir. Bakım maliyeti yüksektir [TAHMİN] |
| Sertifika sabitleme aşma | Uygulamayı yamalamak (apk-mitm, objection) çoğu ToS'ta ayrıca yasaklı tersine mühendislik sayılabilir [TAHMİN] |

**Genel ilkeler (kısa):** (1) Önce resmî API, RSS veya WebSub var mı bak. (2) Yalnızca herkese açık veriyi oku; giriş/paywall/CAPTCHA aşma. (3) `robots.txt` ve hız sınırlarına uy, makul aralıklarla iste ve önbellek kullan. (4) Kişisel veriyi en aza indir; saklama süresi belirle. (5) Veriyi ticari olarak yeniden yayımlama. (6) Engellendiysen devam etme. (7) Ticari bir ürün planlanıyorsa bir hukukçuya danış. Bu bölüm hukuki görüş değildir.

## SDK ve kütüphaneler

- **X**: resmî Python SDK `xdk` (`pip install xdk`), resmî TypeScript SDK `@xdevplatform/xdk`, `xurl` (OAuth destekli, curl benzeri CLI), API Playground (yerel mock sunucu, `github.com/xdevplatform/playground`) [RESMÎ]. X, topluluk kütüphanelerinin kendisi tarafından bakılmadığını belirtiyor [RESMÎ].
- **Twitch**: `twitch-cli` [RESMÎ].
- **Meta/WhatsApp**: OpenAPI dosyası SDK üretimi için yayımlanıyor [RESMÎ]. NuGet'te topluluk paketleri var (ör. `WhatsappCloudSDK`) [3. TARAF].
- **.NET ile OpenAPI'den istemci üretme**: Microsoft Kiota, NSwag, OpenAPI Generator (`csharp` hedefi) [TAHMİN: bu oturumda doğrulanmadı; yaygın araçlar].
- **Postman CLI / Newman**: koleksiyonları CI'da çalıştırmak için [TAHMİN].
- **mitmproxy**: Python betikleriyle (addon) trafik işleme [RESMÎ].

## Postman / OpenAPI / koleksiyonlar

| Kaynak | Ne | Ne zaman kullanılır |
|---|---|---|
| [public-apis](https://github.com/public-apis/public-apis) | 50+ kategoride elle derlenmiş ücretsiz API listesi (Social, Video, News, Open Data, Government, Tracking…) [RESMÎ]; GitHub'da yaklaşık 489 bin yıldız, MIT [RESMÎ] | Fikir aşaması: "bu alanda ücretsiz API var mı?" |
| [APIs.guru openapi-directory](https://github.com/APIs-guru/openapi-directory) | OpenAPI 2.0/3.x tanım dizini, REST API ve RSS ile [RESMÎ] | Kod üretmek, uç noktaları makineyle taramak |
| [Postman Public API Network](https://www.postman.com/explore) | Yayıncıların herkese açık workspace, koleksiyon ve flow'ları; tüketici fork edip kullanır [RESMÎ, learning.postman.com] | Resmî koleksiyonla hızlı deneme |
| [RapidAPI Hub](https://rapidapi.com/hub) | Tek anahtarla abone olunan API pazar yeri; sağlayıcılar API ekler ve ücretlendirir [RESMÎ] | Hazır, ücretli 3. taraf veri API'leri |
| [Free Public APIs](https://www.freepublicapis.com/) | 768 ücretsiz API, günlük sağlık testi ve skor [RESMÎ] | Hâlâ çalışan ücretsiz API bulmak |
| Platform OpenAPI'leri | X (`api.x.com/2/openapi.json`), Discord (`discord/discord-api-spec`, preview), Meta/WhatsApp (`facebook/openapi`), Slack (arşiv) | SDK üretimi ve tip güvenliği |

## Depoda ilgili sayfalar

- [X-Twitter](../Sosyal-Medya/X-Twitter.md) · [Threads](../Sosyal-Medya/Threads.md) · [Instagram](../Sosyal-Medya/Instagram.md) · [Bluesky](../Sosyal-Medya/Bluesky.md) · [Meta Graph API genel](../Sosyal-Medya/Meta-Graph-API-Genel.md)
- [Twitch](../Canli-Yayin-ve-Video/Twitch.md) · [Kick](../Canli-Yayin-ve-Video/Kick.md) · [YouTube](../Canli-Yayin-ve-Video/YouTube.md)
- [Discord](../Mesajlasma/Discord.md) · [Slack](../Mesajlasma/Slack.md) · [Telegram](../Mesajlasma/Telegram.md) · [WhatsApp](../Mesajlasma/WhatsApp.md) · [Signal](../Mesajlasma/Signal.md)
- [GitHub](../Gelistirici-Platformlari/GitHub.md) · [Global haber API'leri](../Haber/Global-Haber-APIleri.md)
- [Mesajlaşma altyapıları rehberi](../../Rehberler/Mesajlasma-Altyapilari/)

## Kaynaklar

Resmî:
- https://docs.x.com/x-api/tools-and-libraries/overview — X'in resmî Postman koleksiyonu, OpenAPI dosyası, xdk SDK'ları ve xurl — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/whatsapp/cloud-api/overview — WhatsApp Cloud API; "Test resources" bölümünde resmî Postman bağlantısı — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/whatsapp/cloud-api/get-started — Başlangıç rehberi; OpenAPI spesifikasyonuna bağlantı — (erişim: 15 Ekim 2026)
- https://github.com/facebook/openapi — Meta'nın WhatsApp Business Messaging OpenAPI dosyası — (erişim: 15 Ekim 2026)
- https://github.com/discord/discord-api-spec — Discord'un OpenAPI 3.1 spesifikasyonu (public preview) — (erişim: 15 Ekim 2026)
- https://github.com/slackapi/slack-api-specs — Slack spesifikasyonları; 27.03.2024'te arşivlendi — (erişim: 15 Ekim 2026)
- https://docs.slack.dev/apis/web-api/ — Slack Web API'nin güncel dokümanı — (erişim: 15 Ekim 2026)
- https://dev.twitch.tv/docs/cli/ — Twitch CLI (api, mock-api, event, token) — (erişim: 15 Ekim 2026)
- https://learning.postman.com/docs/collaborating-in-postman/public-api-network/public-api-network-overview/ — Postman Public API Network'e genel bakış — (erişim: 15 Ekim 2026)
- https://github.com/public-apis/public-apis — public-apis listesi ve README — (erişim: 15 Ekim 2026)
- https://github.com/APIs-guru/openapi-directory — APIs.guru dizini; lisans ve güncelleme mekanizması — (erişim: 15 Ekim 2026)
- https://api.apis.guru/v2/metrics.json — APIs.guru'nun güncel istatistikleri — (erişim: 15 Ekim 2026)
- https://apis.guru/api-doc/ — APIs.guru REST API dokümanı — (erişim: 15 Ekim 2026)
- https://docs.rapidapi.com/docs/what-is-rapidapi — RapidAPI Hub nedir — (erişim: 15 Ekim 2026)
- https://docs.rapidapi.com/docs/consumer-quick-start-guide — Abonelik, plan ve kota aşımı — (erişim: 15 Ekim 2026)
- https://docs.rapidapi.com/docs/response-headers — Rate limit yanıt başlıkları — (erişim: 15 Ekim 2026)
- https://www.freepublicapis.com/ — Free Public APIs; günlük test edilen ücretsiz API listesi — (erişim: 15 Ekim 2026)
- https://developer.chrome.com/docs/devtools/network/reference — Chrome DevTools Network: HAR, Copy as cURL, WebSocket mesajları — (erişim: 15 Ekim 2026)
- https://docs.mitmproxy.org/stable/ — mitmproxy genel bakış — (erişim: 15 Ekim 2026)
- https://docs.mitmproxy.org/stable/concepts/certificates/ — mitmproxy CA sertifikası ve sertifika sabitleme — (erişim: 15 Ekim 2026)
- https://github.com/mitmproxy/mitmproxy/blob/main/CHANGELOG.md — mitmproxy sürüm notları: HAR (10.1.0), HTTP/3 (10.0.0 deneysel, 11.0.0 şeffaf), DNS modu — (erişim: 15 Ekim 2026)
- https://learning.postman.com/v11/docs/billing/about-plans — Postman planları (Mart 2026: Free, Solo, Team, Enterprise) — (erişim: 15 Ekim 2026)
- https://docs.x.com/x-api/getting-started/pricing — X API kullandıkça öde fiyatlandırması — (erişim: 15 Ekim 2026)
- https://www.nokia.com/about-us/news/releases/2024/11/13/nokia-acquires-rapid-technology-and-rd-unit-to-strengthen-development-of-network-api-solutions-and-ecosystem/ — Nokia'nın Rapid teknoloji ve Ar-Ge birimini satın alması (13.11.2024) — (erişim: 15 Ekim 2026)
- https://api.apis.guru/v2/list.json · https://api.apis.guru/v2/providers.json — APIs.guru liste ve sağlayıcı uç noktaları (kimliksiz 200) — (erişim: 15 Ekim 2026)

3. taraf:
- https://en.wikipedia.org/wiki/HiQ_Labs_v._LinkedIn — hiQ v. LinkedIn davasının seyri — (erişim: 15 Ekim 2026)
- https://en.wikipedia.org/wiki/Craigslist_Inc._v._3Taps_Inc. — Craigslist v. 3Taps (dava 2012, CFAA kararı N.D. Cal. 2013) — (erişim: 15 Ekim 2026)
- https://en.wikipedia.org/wiki/Web_scraping — Web scraping'in hukuki boyutu (ABD, AB, diğer ülkeler) — (erişim: 15 Ekim 2026)
- https://support.whapi.cloud/help-desk/getting-started/api-docs/postman-collection — 3. taraf WhatsApp Postman koleksiyonu (resmî değil, karşılaştırma için) — (erişim: 15 Ekim 2026)

> Not: Bu araştırma sırasında web arama kotası doldu. Postman'deki Twitch, Discord ve Slack workspace'leri arama ile doğrulanamadı; ilgili satırlar etiketlendi. RapidAPI'nin sahiplik durumu sonradan Nokia basın bülteniyle doğrulandı (13.11.2024).
