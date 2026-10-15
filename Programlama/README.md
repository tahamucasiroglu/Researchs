# Programlama

Programlama bölümü **dile ve platforma göre** ayrılır: her dilin kendi klasörü vardır, alt klasörler o dilin konularını sırayla işler. Dilden bağımsız, ayrı eğitim gerektiren alanlar (şimdilik yalnızca Blockchain) kendi klasörünü alır. Sayfalar birer "anahtar kelime listesi"dir: her başlık için kısa bir "bu nedir" notu, öncelik rozeti (`TEMEL`, `ORTA`, `İLERİ`, `MÜLAKATTA SIK`) ve resmi doküman bağlantısı verilir; amaç neyi araştıracağını ve başlangıç noktana (hiç bilmeyen, başka dilden gelen) ve hedefine (backend, frontend, veri, mobil) göre hangi sırayla çalışacağını göstermektir. Konulara ait kod denemeleri ve notlar ilgili konu klasörünün altına eklenir.

## İçindekiler

| Bölüm | Açıklama |
|---|---|
| [C# / .NET](CSharp-DotNet/) | 10 bölüm: C# dili, platform ve ASP.NET Core Web API, veri erişimi (EF Core, Dapper), mimari ve desenler, mesajlaşma ve dağıtık sistemler, test, DevOps ve gözlemlenebilirlik, Blazor/MVC/MAUI, Aspire ve modern .NET, NuGet kütüphane kataloğu. |
| [Java](Java/) | 4 bölüm: Java dili ve C# farkları, Spring Boot, JPA/Hibernate ile veri ve mesajlaşma, Maven/Gradle/JUnit/Mockito ekosistemi. C#'tan geliyorsan her başlığın .NET karşılığı ek bilgi olarak verilmiştir; Java'yı ilk dil olarak öğrenen de kullanabilir. |
| [JavaScript / TypeScript](JavaScript-TypeScript/) | 4 bölüm: JavaScript dil çekirdeği ve tarayıcı API'leri, TypeScript tip sistemi, React, ekosistem araçları (paket yöneticileri, Vite, Next.js, test, dağıtım). Kütüphane denemeleri: [Image-to-Pixel](JavaScript-TypeScript/kutuphaneler/image-to-pixel/). |
| [HTML / CSS](HTML-CSS/) | 2 bölüm: semantik HTML, formlar, erişilebilirlik ve SEO; CSS seçiciler, kutu modeli, flexbox, grid, responsive ve modern CSS. |
| [Python](Python/) | Tek sayfa: dil temelleri, type hints, asyncio, NumPy/Pandas, TensorFlow/Keras ve PyTorch, web çatıları, otomasyon ve test. |
| [Go](Go/) | Tek sayfa: paket sistemi, struct ve interface, hata yönetimi, goroutine/channel/context, standart kütüphane, web çatıları. |
| [Rust](Rust/) | Tek sayfa: Cargo, sahiplik ve ödünç alma, yaşam süreleri, trait ve generic, async/Tokio, ekosistem ve öğrenme maliyeti. |
| [Blockchain](Blockchain/) | 7 bölüm: zincir temelleri, Solidity ve akıllı sözleşmeler, JS/TS ve .NET ile dApp geliştirme, diğer zincirler, altyapı ve güvenlik, proje fikirleri. |
| [Yapay Zekâ](Yapay-Zeka/) | Dil değil alan: hazır yapay zekâ modellerini uygulamalarda kullanmak. Konular: görüntü netleştirme (super-resolution, yüz düzeltme), kodla video üretimi (Remotion), Claude ile video üretim sistemi. |
| [Proje Fikirleri](proje-fikirleri/) | Tek dosyalık denemelerden portfolyo projelerine kadar seviyeli proje kataloğu; her projenin hangi konuyu kanıtladığıyla birlikte. |

## Genel bakış sayfasının başlıkları

HTML genel bakış sayfası şu konuları işler:

1. Bu dosya nasıl kullanılır (amaca göre giriş noktası, rozetlerin anlamı)
2. Bölümler, hedefe göre hangi bölümün temel olduğu ve tüm sayfaların haritası
3. Başlangıç noktasına göre önerilen öğrenme sıraları (hiç bilmeyen; C#, Java, JS/TS, Python veya başka dilden gelen; mobil hedefleyen) ve gerekçesi
4. Mülakatta sık sorulanlar (.NET backend'e göre derecelendirilmiş; diğer hedefler ve kıdem için okuma kılavuzu)
5. Python, Go ve Rust karşılaştırması
6. Çalışma yöntemi
7. İlerleme takibi
8. Dil dosyasına köprü
9. Özet

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../README.md)
