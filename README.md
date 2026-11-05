# Ai yada kendi araştırmalarımı ham olarak tuttuğum yer. 


# Araştırma ve Öğrenme Kütüphanesi

Dil, programlama ve hayatın pratik konularında (işsizlik hakları, şirket kurma) öğrendiklerimin Türkçe kaydı. Amaç, Türkçe kaynağı az olan konuları sade bir dille, konu konu ayrılmış klasörlerde toplamak; kendi çalışmalarım (kod denemeleri, notlar) da ilgili konunun altına eklenir. Herkes yararlanabilir.

## Nasıl okunur

- **GitHub'da:** Bu README'den başlayıp klasör bağlantılarına tıklayarak inin. Her klasörün README'si o bölümde ne olduğunu ve alt sayfaları kısaca anlatır.
- **HTML anlatımlar:** Ayrıntılı anlatımlar `index.html` sayfalarındadır. GitHub HTML'i işlemediği için depoyu indirip (`Code → Download ZIP` veya `git clone`) kökteki [index.html](index.html) dosyasını tarayıcıda açın; ya da depo GitHub Pages ile yayımlanmışsa oradan okuyun. Tüm sayfalar ortak `assets/` klasörünü kullanır, ayrıca kurulum gerekmez.

## İçindekiler

### [Dil](Dil/)

Dil bilgisini Türkçe anlatımla ve "denklem" mantığıyla (kalıp = öğe + öğe) öğreten bölümler.

| Bölüm | Açıklama |
|---|---|
| [Türkçe](Dil/Turkce/) | Ses ve ekten başlayıp sözcük türleri, fiil, cümle öğeleri, yazım-noktalama ve anlatım bozukluklarına kadar 9 bölümde Türkçe dil bilgisi. |
| [İngilizce](Dil/Ingilizce/) | Türkçe anlatımla İngilizce dil bilgisi: temel cümle denklemi, sözcük türleri, 12 zaman, modals, cümle yapıları, seviyene (CEFR) göre çalışma yol haritası ve aynı konuları deftere yazarak çalışmak için 34 sayfalık defter rehberi. |

### [Programlama](Programlama/)

Dile ve platforma göre ayrılmış anahtar kelime listeleri: her başlık için "bu nedir" notu, öncelik rozeti ve resmi doküman bağlantısı.

| Bölüm | Açıklama |
|---|---|
| [C# / .NET](Programlama/CSharp-DotNet/) | C# dili, ASP.NET Core Web API, EF Core, mimari desenler, mesajlaşma, test, DevOps, Blazor/MAUI, Aspire ve NuGet kütüphaneleri. |
| [Java](Programlama/Java/) | Java dili, Spring Boot, JPA/Hibernate ve mesajlaşma, Maven/Gradle/JUnit ekosistemi; ilk dil olarak da okunabilir, C#'tan geliyorsan .NET karşılıkları ek bilgi olarak verilmiştir. |
| [JavaScript / TypeScript](Programlama/JavaScript-TypeScript/) | JavaScript dili, TypeScript tip sistemi, React ve Vite/Next.js gibi ekosistem araçları. |
| [HTML / CSS](Programlama/HTML-CSS/) | Web'in temel katmanı: semantik HTML, formlar, erişilebilirlik; CSS kutu modeli, flexbox, grid ve responsive tasarım. |
| [Python](Programlama/Python/) | Dil temelleri, veri bilimi ve yapay zekâ yığını, web çatıları, otomasyon ve test. |
| [Go](Programlama/Go/) | Sade sözdizimi, goroutine/channel eşzamanlılık modeli, standart kütüphane ve bulut araçlarındaki yeri. |
| [Rust](Programlama/Rust/) | Sahiplik ve ödünç alma modeli, tip sistemi, güvenli eşzamanlılık ve öğrenme maliyeti. |
| [Blockchain](Programlama/Blockchain/) | Dil değil alan: temeller, Solidity ve akıllı sözleşmeler, JS/.NET ile dApp geliştirme, diğer zincirler, güvenlik ve proje fikirleri. |
| [Yapay Zekâ](Programlama/Yapay-Zeka/) | Dil değil alan: hazır yapay zekâ modellerini kullanmak; görüntü netleştirme (super-resolution, yüz düzeltme) kodla video üretimi (Remotion) ve Claude ile video üretim sistemi; modeller, lisanslar, ölçümler. |
| [Proje Fikirleri](Programlama/proje-fikirleri/) | Öğrenileni kanıtlamak için tek dosyalık denemelerden portfolyo projelerine kadar seviyeli proje kataloğu. |

### [API](API/)

Proje yazmadan önce bakılacak güncel, Türkçe API başvurusu: erişim seviyeleri, gerçek zamanlı bildirim, limitler ve takip uygulaması için neyin mümkün olduğu.

| Kategori | Açıklama |
|---|---|
| [Sosyal Medya](API/Sosyal-Medya/) | Bluesky, Mastodon, X, Facebook, Instagram, Threads, LinkedIn, TikTok, Reddit ve diğerleri: gönderi ve canlı yayın takibi. |
| [Mesajlaşma](API/Mesajlasma/) | Discord, Telegram, Slack, WhatsApp, Messenger, Signal, Viber/LINE: hangi sohbetler okunabilir, webhook ve WebSocket. |
| [Canlı Yayın ve Video](API/Canli-Yayin-ve-Video/) | YouTube, Twitch, Kick, Rumble, Trovo, Facebook Live: yeni video, canlı yayın ve sohbet takibi. |
| [Geliştirici Platformları](API/Gelistirici-Platformlari/) | GitHub: release, commit, issue takibi; webhook, yoklama ve Atom feed'leri. |
| [Haber](API/Haber/) | Küresel haber API'leri, GDELT ve Türkiye haber kaynakları (ajanslar, RSS). |
| [Finans ve Ekonomi](API/Finans-ve-Ekonomi/) | TCMB EVDS, Borsa İstanbul ve KAP, ABD resmî verileri, piyasa veri API'leri, TradingView. |
| [Kripto Borsaları](API/Kripto-Borsalari/) | Binance, OKX, Bybit, Kraken, Coinbase, BtcTurk, Paribu ve kripto veri servisleri. |
| [Hava Durumu](API/Hava-Durumu/) | Hava durumu ve uyarı servisleri, MGM, deprem kaynakları (AFAD, Kandilli, USGS, EMSC). |
| [Türkiye Kamu ve Açık Veri](API/Turkiye-Kamu-ve-Acik-Veri/) | Belediye açık veri portalları, TÜİK, Resmî Gazete ve Türkiye topluluk API'leri. |
| [API Kaynakları](API/API-Kaynaklari/) | API dizinleri, resmî Postman/OpenAPI koleksiyonları ve uç nokta keşif yöntemleri. |

### [Rehberler](Rehberler/)

Belirli bir durumla karşılaşıldığında okunacak genel rehberler: Türkiye mevzuatına dayanan hukuki ve mali konular, dijital yayın ve gelir, kariyer ve teknik başvuru konuları. Rakamlar ve kurallar yazıldıkları tarihe dayanır; karar vermeden önce resmi kaynaktan teyit edin. Hukuki, mali veya yatırım danışmanlığı yerine geçmez.

| Rehber | Açıklama |
|---|---|
| [İşsizlik](Rehberler/Issizlik/) | İşten çıkışta kıdem ve ihbar tazminatı, çıkış kodları, işsizlik ödeneği hesabı ve başvurusu, borç yönetimi, devlet destekleri ve nakit planı. |
| [YouTube'da Oyun](Rehberler/YouTube-Oyun/) | YouTube Playables'a oyun yayınlamak ve oyun video kanalı: şartlar, SDK, AI ile geliştirme, gelir, telif, oyun fikirleri, Roblox benzeri ortamlar. |
| [Mesajlaşma Altyapıları](Rehberler/Mesajlasma-Altyapilari/) | Telegram Bot API, WhatsApp Business API, BiP Keşfet API ve SMS: uç noktalar, JSON ve C# örnekleri, fiyatlar, BTK/İYS kuralları. |
| [Şirket Kurma](Rehberler/Sirket-Kurma/) | Şahıs mı limited mi, vergi ve Bağ-Kur, genç girişimci istisnası, giderler, yurt dışı şirket, ödeme altyapıları ve maliyet senaryoları. |
| [SEO](Rehberler/SEO/) | Bir sitenin Google, Bing, Yandex ve yapay zekâ aramalarında organik görünmesi, 21 bölüm: tarama ve dizine ekleme, sayfa içi SEO, yapılandırılmış veri, hız, yerel SEO, bağlantılar, site denetimi ve kara şapkadan korunma. |
| [SQL Mülakat](Rehberler/SQL-Mulakat/) | Mülakat ve online kodlama sınavları için kısa SQL: JOIN'lerde kaç satır gelir, NULL, gruplama, window fonksiyonları, klasik sorular, sınav motorunu belirleme, SQLite notları ve lehçe farkları. |
| [Mülakat Hazırlığı](Rehberler/Mulakat-Hazirligi/) | .NET / C# backend mülakatı için soru → kısa cevap tekrar rehberi: mülakat türleri ve online test, C#, ASP.NET Core, EF Core, dağıtık sistemler, algoritma ve sistem tasarımı, davranışsal ve İngilizce sorular, maaş ilkeleri ve kontrol listesi. |
| [Masaüstü Uygulamada Reklam](Rehberler/Masaustu-Uygulama-Reklam/) | Masaüstü uygulama ve web sitesinde reklam ve reklam izleyerek kredi: ağ politikaları, ödüllü reklam ve SSV, engelleyiciler, doğrudan satış, hukuk, vergi ve şirket yapısı. |
| [Yolculuk Paylaşımı](Rehberler/Yolculuk-Paylasimi/) | Özel araçla paylaşımlı yolculuk (Martı TAG): 2026 KTK Ek 2 cezaları, mahkeme kararları, sigorta rücusu, vergi ve Bağ-Kur, il ve araç durumlarına göre sonuçlar, maliyet senaryoları. |
| [Google Play'de Reklamlı Oyun](Rehberler/Google-Play-Oyun/) | Basit bir oyunu Google Play'e çıkarıp AdMob reklamıyla gelir elde etmek: kapalı test şartı, teknik şartlar, ödeme eşikleri, gelir senaryoları, 20/B vergi dalları. |

## Çalışma Günlüğü

Ne zaman ne çalıştığımın kısa, tarih sıralı kaydı: [Çalışma Günlüğü](CALISMA-GUNLUGU.md)

---

HTML ana dizin: [index.html](index.html) (yerelde tarayıcıda açılır)
