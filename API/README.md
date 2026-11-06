# API Kütüphanesi

Bir proje (bot, bildirim servisi, takip/izleme uygulaması, veri paneli) yazmaya başlamadan önce bakılacak **güncel, Türkçe API başvurusu**. Her sayfa tek bir platformu veya servis grubunu şu sorularla ele alır: hangi erişim seviyesinde ne alınabilir, kimlik doğrulama nasıl yapılır, temel uç noktalar neler, gerçek zamanlı bildirim (webhook, WebSocket, stream) var mı, hız sınırları ve fiyatlar ne, resmî yol yoksa hangi resmî olmayan yollar kullanılıyor ve riskleri neler. Bilgiler resmî dokümandan okunup **[RESMÎ] / [3. TARAF] / [TAHMİN] / [ÇELİŞKİLİ]** etiketleriyle işaretlenmiştir. Her dosyanın başında **yazılma ve son doğrulama tarihi** bulunur.

## Nasıl kullanılır

1. Aşağıdaki **Kategoriler** tablosundan ilgili klasöre gir; klasör README'si o kategorideki platformları tek tabloda karşılaştırır.
2. Kullanacağın platformun sayfasını aç; önce "Son doğrulama" tarihine, sonra "Erişim seviyeleri" ve "Takip uygulaması için" bölümlerine bak.
3. Birden çok platformu izleyen bir uygulama tasarlıyorsan aşağıdaki **Takip uygulaması için özet matris** ile başla: hangi platformun push verdiği, hangisinin yoklama (polling) istediği, hangisinin hiç mümkün olmadığı tek bakışta görülür.
4. Kod yazmadan önce bağlantısı verilen resmî dokümandan limit ve fiyatları yeniden teyit et.

## Erişim seviyeleri

Sayfalarda aynı sözlük kullanılır:

| Seviye | Anlamı |
|---|---|
| **Herkese açık** | Hesap veya anahtar gerekmez: kimliksiz REST uçları, RSS/Atom, açık protokol akışları (ör. Bluesky Jetstream, GDELT, USGS). |
| **Geliştirici hesabı** | Ücretsiz bir geliştirici hesabı/uygulaması ve API anahtarı ya da token gerekir (ör. Twitch uygulaması, Telegram `api_id`, Discord botu). |
| **İşletme onayı** | Uygulama incelemesi (App Review), işletme doğrulaması, allowlist, partner veya araştırmacı başvurusu gerekir (ör. Meta, TikTok Research API, Snapchat). |
| **Ücretli / kurumsal** | Kullanım başı ücret, abonelik veya lisans sözleşmesi gerekir (ör. X kullanım başı ücret, KAP veri yayın servisi, ajans abonelikleri). |
| **Resmî olmayan** | Belgelenmemiş iç uç noktalar, kazıma (scraping), kişisel hesap oturumu ile çalışan kütüphaneler (self-bot, Baileys, instagrapi…). |

> **Uyarı — resmî olmayan yollar:** Bu yollar yalnızca bilgi amaçlı listelenmiştir. Çoğu platformun kullanım şartlarını (ToS) ihlal eder; hesap/numara kapatma, IP engeli (Cloudflare, 403/429), protokol değişince haber vermeden bozulma, telif ve kişisel veri (KVKK/GDPR) sorumluluğu riski taşır. Denenecekse kaybedilmesi sorun olmayan ayrı bir hesapla, salt okuma amacıyla ve düşük hızda denenmeli; ticari bir üründe bunlara dayanılmamalıdır.

## Kategoriler

| Kategori | İçerik |
|---|---|
| [Sosyal Medya](Sosyal-Medya/) | Bluesky, Mastodon/Fediverse, X (Twitter), Meta Graph (Facebook), Instagram, Threads, LinkedIn, TikTok, Pinterest, Reddit, Snapchat, OnlyFans/Fansly/Patreon: gönderi, canlı yayın ve DM takibinin resmî ve resmî olmayan yolları. |
| [Mesajlaşma](Mesajlasma/) | Discord, Facebook Messenger, Signal, Slack, Telegram, Viber ve LINE, WhatsApp: hangi sohbetler okunabilir, bot/kullanıcı API'si farkı, webhook ve WebSocket. |
| [Canlı Yayın ve Video](Canli-Yayin-ve-Video/) | YouTube, Twitch, Kick, Rumble, Trovo, Facebook Live (DLive kapandı): yeni video, canlı yayına geçiş ve sohbet takibi (WebSub, EventSub, webhook). |
| [Geliştirici Platformları](Gelistirici-Platformlari/) | GitHub: release, commit, issue, kullanıcı etkinliği; webhook, Events/REST/GraphQL yoklaması ve Atom feed'leri. |
| [Haber](Haber/) | Küresel haber API'leri (NewsAPI, GNews, GDELT, Event Registry, Guardian, NYT) ve Türkiye haber kaynakları (ajanslar, site RSS'leri). |
| [Finans ve Ekonomi](Finans-ve-Ekonomi/) | TCMB EVDS, Borsa İstanbul ve KAP, ABD resmî ekonomi verileri (FRED, SEC, BLS…), piyasa veri API'leri, TradingView alarm webhook'u. |
| [Kripto Borsaları](Kripto-Borsalari/) | Binance, OKX, Bybit, Kraken, Coinbase, BtcTurk, Paribu ve kripto veri servisleri (CoinGecko, CMC, CoinDesk, Etherscan): duyuru, listeleme, fiyat ve likidasyon akışları. |
| [Hava Durumu](Hava-Durumu/) | Open-Meteo, OpenWeatherMap, WeatherAPI, Tomorrow.io, Visual Crossing, NOAA/NWS, MGM ve deprem kaynakları (AFAD, Kandilli, USGS, EMSC). |
| [Türkiye Kamu ve Açık Veri](Turkiye-Kamu-ve-Acik-Veri/) | Belediye açık veri portalları (CKAN), TÜİK, Resmî Gazete, Diyanet ve topluluk API'leri (TurkiyeAPI, Nager.Date, CollectAPI). |
| [Reklam](Reklam/) | Google Ads, Google AdMob, Google Ad Manager (Meta Marketing API ve TikTok API for Business, Sosyal Medya dosyalarında ayrı bölüm): kendi reklam ve yayıncı hesabını yönetme, raporlama, dönüşüm yükleme, ödüllü reklamın sunucuda doğrulanması (SSV). |
| [Arama Motorları](Arama-Motorlari/) | IndexNow, Google Search Console ve Indexing API, PageSpeed Insights ve Chrome UX Report (CrUX): değişen URL'yi motora bildirme, kendi sitenin arama performansı ve dizin durumu, sayfa hızı (rakip siteler dahil). |
| [API Kaynakları](API-Kaynaklari/) | API bulma ve deneme: public-apis, APIs.guru, resmî Postman/OpenAPI koleksiyonları, RapidAPI ve DevTools/HAR/mitmproxy ile uç nokta keşfi. |

## Takip uygulaması için özet matris

Kategori README'lerindeki "takip" satırlarının kısaltılmış birleşimi (son doğrulama: 15.10.2026; Reklam ve Arama Motorları satırları 6.11.2026). Ayrıntı ve koşullar için ilgili kategori sayfasına bak.

| Platform | Yeni gönderi | Canlı yayın | Mesaj/grup içeriği | Gerçek zamanlı push | Resmî olmayan yol |
|---|---|---|---|---|---|
| **Sosyal Medya** | | | | | |
| Bluesky | Evet, kimliksiz (Jetstream) | Sınırlı ("Live" durumu, harici bağlantı) | Yalnız kendi DM'in | Evet (Jetstream/firehose, kimliksiz) | Gerek yok |
| Mastodon / Fediverse | Evet (bot hesabı + stream, RSS) | Mastodon'da yok; PeerTube'da var | Yalnız kendi DM'in | Evet (SSE/WebSocket, sunucuya bağlı) | Gereksiz; toplu taramada defederasyon riski |
| X (Twitter) | Evet, ücretli (olay başı) | Evet (broadcast/spaces olayları) | Yalnız izin veren kullanıcı (OAuth) | Evet (webhook, filtered stream) | Var (guest token, twscrape); askıya alma riski |
| Facebook (Meta Graph) | Kendi Sayfan evet; başka Sayfa App Review + yoklama; profil/grup hayır | Kendi Sayfan evet; başkası zayıf | Yalnız Sayfaya gelen Messenger | Yalnız kendi Sayfan (webhook) | Var (kazıma); yüksek risk |
| Instagram | Kendi hesabın; başka Business/Creator yoklama; kişisel hayır | Yalnız kendi hesabın | Yalnız kendi DM'in | Kendi hesabın (webhook) | Var (instagrapi, Instaloader); ban riski |
| Threads | Evet, yoklama (Advanced Access) | Yok | Yok (DM API'si yok) | Yalnız kendi hesabın (webhook) | Pek gerek yok |
| LinkedIn | Yalnız yönettiğin şirket sayfası | Hayır | Hayır (yalnız partner) | Yalnız yönettiğin sayfa | Var (Voyager, kazıma); açıkça yasak |
| TikTok | İzin veren hesap; başkası Research API | Resmî hayır | Yalnız Business Messaging | Çok sınırlı | Var (TikTokLive vb.); ToS riski |
| Pinterest | Kendi hesabın; başkası RSS | Yok | Yok | Hayır | Var; ToS ihlali |
| Reddit | Evet, yoklama (Mart 2027'ye kadar) | Yok | Yalnız kendi kutun | Hayır (yalnız Devvit) | Büyük ölçüde kapandı |
| Snapchat | Allowlist ile yoklama | Yok | Yok | Hayır | Var (sayfa ayrıştırma); ToS yasak |
| OnlyFans / Fansly / Patreon | Patreon kendi kampanyan; diğerleri hayır | Patreon kısmen | Hayır | Patreon webhook (kendi kampanyan) | Var; ToS ve güvenlik riski |
| **Mesajlaşma** | | | | | |
| Discord | Yalnız botun olduğu sunucular | Botun sunucusunda (Go Live, Stage) | Botun sunucusunda evet (intent); DM hayır | Evet (Gateway, Webhook Events) | Self-bot; hesap kapatılır |
| Facebook Messenger | Yalnız yönettiğin Sayfa | Yalnız yönettiğin Sayfa | Yalnız Sayfa/IG gelen kutusu | Evet (webhook) | Kişisel hesap oturumu; ban riski |
| Signal | Hayır | Hayır | Resmî hayır; üye olunan sohbet (signal-cli) | Resmî yok | signal-cli; ToS riski |
| Slack | Kurulu çalışma alanı | Yok | Kurulu çalışma alanında evet | Evet (Events API, Socket Mode) | Tarayıcı token'ı; ToS riski |
| Telegram | Kendi kanalın (bot); başkasının açık kanalı (MTProto) | Evet (MTProto, Bot API) | Bot: üye olduğu; kullanıcı API'si: geçmiş + arama | Evet (webhook, MTProto update) | Kazıma, RSSHub; ban riski |
| Viber ve LINE | Hayır | Hayır | Yalnız bota gelen / botun grubu | Evet (webhook) | LINE self-bot; ToS ihlali |
| WhatsApp | Resmî yol yok (Kanallar API'si yok) | Uygulanamaz | Yalnız işletme numarana gelen + kendi OBA grupların | Evet (Cloud API webhook) | Baileys vb.; numara kapatılabilir |
| **Canlı Yayın ve Video** | | | | | |
| YouTube | Evet (WebSub push + RSS, kotasız) | Dolaylı (`videos.list` ile kontrol) | Canlı sohbet ve yorumlar yoklamayla | Kısmen (WebSub, sohbet streamList) | InnerTube (yt-dlp vb.); yasak, 403 riski |
| Twitch | VOD/klip yoklama | Evet (EventSub, izin gerekmez) | Evet (EventSub sohbet, IRC) | Evet (EventSub webhook/WebSocket) | gql, kimliksiz IRC; ihtiyaç az |
| Kick | Resmî yok | Evet (webhook, herhangi kanal) | Evet (webhook); geçmiş yok | Yalnız webhook | Pusher WS; Cloudflare, ToS riski |
| Rumble | Resmî yok | Yalnız kendi hesabın (yoklama) | Kendi yayınının sohbeti | Yok | Kazıma; ToS riski |
| Trovo | Yoklama | Evet (herhangi kanal) | Evet (chat WebSocket) | Evet (chat WebSocket) | Gerek yok |
| Facebook Live | Meta Graph'a bkz. | Yalnız yönettiğin Sayfa (App Review) | Kısmen (yönetilen Sayfa) | Page webhook | Kazıma; önerilmez |
| DLive | Kapandı (27.04.2026) | — | — | — | — |
| **Geliştirici Platformları** | | | | | |
| GitHub | Evet; kendi repon webhook, başkası yoklama/Atom | Yok | Issue/discussion yorumları (yoklama) | Yalnız yönettiğin repo/org (webhook) | Atom feed'leri, GH Archive; kazıma ToS riski |
| **Haber** | | | | | |
| Global Haber API'leri | Evet, yoklama (GDELT ~15 dk; ücretsiz katman 12–24 sa gecikmeli) | Hayır | Hayır | Yok (RSS, yoklama) | Google News RSS ticari kullanım, kazıma |
| Türkiye Haber Kaynakları | Evet, ~30 site RSS yoklama; ajanslar abonelikle | Dolaylı (TV'lerin YouTube kanalı) | Hayır | Yok (RSS 1–2 dk) | HTML kazıma; FSEK riski |
| **Finans ve Ekonomi** | | | | | |
| TCMB EVDS | Evet, yoklama (`today.xml`, EVDS) | Yok | Yok | Yok | Gerek yok |
| Borsa İstanbul ve KAP | Kısmen; programatik yalnız lisansla | Yok | Yok | Yalnız lisanslı akış | yfinance, pykap; lisans riski |
| ABD Resmî Ekonomi Verileri | Evet (RSS/Atom, takvim, yoklama) | Yok | Yok | Yok | `efts.sec.gov`, ücretli 3. taraf akışlar |
| Piyasa Veri API'leri | Evet, yoklama (haber, bilanço, insider) | Yok | Yok | Kısmen (Finnhub WS ücretsiz) | yfinance; 429 ve ToS riski |
| TradingView | Resmî hayır | Resmî hayır | Yok | Evet (alarm webhook, ücretli plan) | Var; hesap kapatılabilir |
| **Kripto Borsaları** | | | | | |
| Binance | Duyurular (imzalı duyuru WS) | Yok | Yok | Evet (duyuru, piyasa, kullanıcı WS) | `/bapi`; WAF riski |
| OKX | Duyurular REST yoklama | Yok | Yok | Kısmen (piyasa WS; duyuru push yok) | `/priapi`; ToS riski |
| Bybit ve Kraken | Duyurular REST yoklama | Yok | Yok | Kısmen (piyasa WS) | Gerek yok |
| Coinbase | Yeni listeleme (status WS) | Yok | Yok | Evet (piyasa, status, user WS) | Gerek yok |
| BtcTurk ve Paribu | Yalnız parite listesi farkı | Yok | Yok | Evet (piyasa WS) | Gerek yok |
| Kripto veri servisleri | Kısmen (haber; yeni coin webhook'u ücretli) | Yok | Yok | Ücretli (webhook/WS); Alchemy ücretsiz 5 webhook | İç JSON, kazıma; bot engeli |
| **Hava Durumu ve Deprem** | | | | | |
| Open-Meteo, OpenWeatherMap, WeatherAPI, Visual Crossing | Evet, yoklama (tahmin, uyarı) | Yok | Yok | Yok | Gerek yok |
| Tomorrow.io | Evet, yoklama + eşik olayları | Yok | Yok | Evet (webhook; ücretsizde 1 konum) | Gerek yok |
| NOAA/NWS | Evet, ABD uyarıları yoklama | Yok | Yok | Kısmen (akış yoklama) | Gerek yok |
| MGM | Yalnız resmî olmayan uç noktayla | Yok | Yok | Yok | `servis.mgm.gov.tr` (belgesiz) |
| AFAD | Evet, 30–60 sn yoklama | Yok | Yok | Yok | Gerek yok |
| Kandilli (KOERI) | Evet, sayfa ayrıştırma | Yok | Yok | Yok | HTML ayrıştırma; ticari izin gerekir |
| USGS | Evet, dakikalık akış yoklama | Yok | Yok | Kısmen (akış yoklama) | Gerek yok |
| EMSC | Evet, anında | Yok | Yok | Evet (WebSocket) | Gerek yok |
| **Türkiye Kamu ve Açık Veri** | | | | | |
| Türkiye Açık Veri ve Kamu API'leri | Yeni veri seti, Resmî Gazete, TÜİK (yoklama) | Yok | Yok | Yok (CKAN Atom feed en yakını) | Fihrist kazıma; e-Devlet otomasyonu yüksek risk |
| Türkiye Topluluk API'leri | Doğrudan yok; güncellik `meta`/Atom ile | Yok | Yok | Yok | Bakımsız gayriresmî API'ler |
| **Reklam** | | | | | |
| Google Ads | Kendi hesabında yeni reklam ve onay durumu yoklamayla (GAQL); rakip reklamı yalnız Ads Transparency Center'da | Yok | Yok (yalnız lead form gönderimleri) | Yalnız lead form webhook'u | Şeffaflık merkezi ve arama sonucu kazıma servisleri var; politikaya aykırı |
| Google AdMob | Uygulanamaz; kendi gelir raporun yoklamayla (~4 saat gecikme) | Yok | Yok | Yalnız ödüllü reklam SSV geri çağrısı (kendi reklam birimin) | Gerek yok; sahte trafik hesabı kapattırır |
| Google Ad Manager | Uygulanamaz; kendi ağındaki değişiklikler `changeEvents` yoklamasıyla | Uygulanamaz (yalnız kendi DAI akışları, 360) | Yok | API'de webhook yok; yalnız ödüllü reklam SSV geri çağrısı | Gerek yok; arayüz kazıma ve masaüstü WebView'de gösterim hesap riski |
| Meta Marketing API / TikTok API for Business | Yalnız kendi ya da yetki veren reklam hesabı (kampanya, reklam durumu) | Yok | Yok (lead formu var) | Evet, yalnız kendi reklam hesabın (Meta Ad Account webhook'u, TikTok aboneliği) | Gerek yok |
| **Arama Motorları** | | | | | |
| IndexNow | Yalnız kendi siten için bildirim (yazma yönlü); başkasının yeni sayfası okunamaz | Yok | Yok | Ters yönde: site → motor (anında); motordan geri bildirim yok | Gerek yok |
| Google Search Console (+ Indexing API) | Yalnız kendi doğrulanmış siten: yeni sayfa/sorgu ve dizin durumu yoklamayla (2–3 gün gecikme) | Yok | Yok | Yok (webhook yok; e-posta uyarıları, günlük BigQuery dışa aktarması) | Arayüz otomasyonu ya da Indexing API'yi sıradan sayfada kullanmak; erişim iptali riski |
| PageSpeed Insights ve CrUX | Uygulanamaz (performans verisi; rakip siteler dahil, günlük CrUX yoklaması) | Yok | Yok | Yok | Gerek yok (API anahtarı ücretsiz) |
| **API Kaynakları** | | | | | |
| API koleksiyonları ve keşif | Kendisinde yok (hedef platforma bağlı) | Kendisinde yok | Kendisinde yok | Yok (APIs.guru RSS) | DevTools/HAR/mitmproxy; yüksek risk |

### Takip uygulaması mimarisi için çıkarımlar

- **Gerçek push veren kaynaklar az ve değerli:** Bluesky (Jetstream, kimliksiz), Mastodon (streaming), Twitch (EventSub), Kick (webhook), Trovo (chat WebSocket), Telegram (MTProto update), Discord (Gateway, bot olduğu sunucuda), X (ücretli webhook/stream), YouTube (WebSub, yalnız yükleme), EMSC (deprem WebSocket) ve kripto borsalarının piyasa WebSocket'leri. Mimarinin "anlık" katmanı bunlarla kurulur.
- **Push çoğunlukla yalnız kendi varlığın için:** Meta ailesi (Facebook, Instagram, Threads, Messenger), LinkedIn, GitHub, Slack, WhatsApp ve Patreon webhook'ları yalnız yönettiğin sayfa/hesap/repo/çalışma alanı için çalışır; başkasını izlemek için bu platformlarda push yoktur.
- **Yoklama (polling) katmanı şart:** Threads, Reddit, Instagram business_discovery, GitHub (Events/Atom), haber RSS'leri, finans ve kamu verileri, hava durumu ve AFAD/USGS gibi kaynaklar zamanlayıcıyla sorgulanır. ETag/`If-Modified-Since`, `guid`/ID ile tekilleştirme ve kota bütçesi baştan tasarlanmalıdır.
- **Karma yaklaşım en verimli:** Ucuz push sinyalini pahalı API çağrısıyla doğrula (ör. YouTube WebSub ile gelen video ID'sini `videos.list` ile kontrol edip canlı yayın olup olmadığını anlamak; Twitch'te `GET /streams` yedek yoklaması).
- **Yalnız resmî olmayan yolla mümkün olanlar:** WhatsApp kanalları/durumları ve başkalarının grupları, Signal, TikTok canlı yayınları, Instagram kişisel hesapları, LinkedIn kişileri, Snapchat, OnlyFans/Fansly, Kick VOD'ları, MGM uyarıları. Bunlar ayrı, kapatılabilir bir modülde tutulmalı; bozulması uygulamanın geri kalanını etkilememelidir.
- **Pratikte mümkün olmayanlar:** Facebook kişisel profil ve grupları, başkalarının DM'leri (her platformda), Reddit/Snapchat/Pinterest için gerçek zamanlı push, kapanmış platformlar (DLive, Reddit RPAN) ve Türkiye haber sitelerinde okur yorumları.
- **Reklam API'leri takip kaynağı değildir:** Yalnız kendi reklamveren ya da yayıncı hesabın için çalışır. Yayıncı tarafında tek gerçek push ödüllü reklamın SSV geri çağrısıdır; reklamveren tarafında Meta ve TikTok'un kendi reklam hesabı webhook'ları ile Google'ın lead form webhook'u vardır. Rakip reklamları için şeffaflık kütüphaneleri kullanılır.
- **Arama motoru API'leri ters yönlüdür:** IndexNow ve Indexing API siteden motora bildirim yapar; Search Console yalnız kendi mülkünün verisini gecikmeli yoklamayla verir. Rakip bir site hakkında resmî yoldan alınabilen tek veri CrUX/PSI hız verisidir.
- **Mesajlaşma platformları çıkış kanalıdır:** Discord webhook'u, Telegram botu, Slack ve LINE push; toplanan ve filtrelenen olayları kullanıcıya iletmek için kaynak olarak kullanılmalarından daha değerlidir.
- **Filtre ve kişisel veri senin sorumluluğunda:** Anahtar kelime filtresi neredeyse her yerde istemci tarafında yapılır; toplanan mesaj, profil ve yorumlar kişisel veridir (KVKK/GDPR). Saklama süresini ve amacını baştan belirle; bazı platformlar (Telegram, WhatsApp) veriyi yapay zekâ eğitimi için kullanmayı yasaklar.

## Güncelleme kuralı

API'ler sık değişir: uç noktalar kapanır, ücretsiz katmanlar daralır, fiyatlar ve hız sınırları güncellenir (ör. Reddit RSS'inin bitiş tarihi, DLive'ın kapanması). Bir dosyayı kullanmadan önce başındaki **"Son doğrulama"** tarihine bak; tarih eskiyse resmî dokümandan teyit et ve değişiklik varsa sayfayı yeni tarihle güncelle. Bu sayfalar hukuki danışmanlık değildir; kullanım şartları için platformun güncel metni esastır.

---

← [Ana sayfa](../README.md)
