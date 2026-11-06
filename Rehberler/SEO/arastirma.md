# SEO — yoğun başvuru notu

- **Araştırma tarihi:** 21 Ekim 2026 (ilk sürümdeki bütün kaynaklara bu tarihte erişildi) · **güncelleme: 6 Kasım 2026** — API başvuru dosyaları yazılırken resmî kaynaklara yeniden bakıldı; § 9, 13, 14 ve 19'daki bazı iddialar düzeltildi, eklenen kaynaklar kaynakçanın sonunda (249–258).
- **Kapsam:** Google ağırlıklı; Yandex, Bing, IndexNow ve yapay zekâ araması (AI Overviews, AI Mode, YZ tarayıcıları) dahil. Türkiye pazarı notlarıyla.
- **Biçim:** Bu dosya yapay zekâ asistanına bağlam olarak verilmek için yazıldı: saf Markdown, her iddiada güven etiketi, sonda tam kaynakça. Okumak için hazırlanmış 21 bölümlük anlatım aynı klasördeki `index.html` ve `01-…21-*.html` sayfalarındadır; ayrıntı ve kaynak numaraları orada.
- **Güven etiketleri:** `RESMÎ` = Google / Bing / Yandex / schema.org / web.dev belgesi ya da resmî blog · `3. TARAF` = tanınmış eğitim, ölçüm, haber · `TAHMİN` = uygulayıcı önerisi, resmî sınır değil · `ÇELİŞKİLİ` = kaynaklar çelişiyor ya da birincil kaynak bulunamadı.
- **Örnek senaryolar genel:** (a) koddan anlamayan küçük yerel işletme (ör. telefonda aramada üstte çıkmak isteyen nakliye firması); (b) bir yazılım ürünü (ör. online randevu programı satan site). Örneklerdeki işletme ve marka adları uydurma; alan adları, adresler ve numaralar yer tutucudur.

---

## 0. Değişmeyen temel gerçekler

| Konu | Kural | Etiket |
|---|---|---|
| Reklam ve organik | Google Ads'e para vermek organik sıralamayı etkilemez; Google iki ayrı resmî sayfada yazıyor. Reklam ile SEO açılış sayfasında ve veride buluşur (arama terimleri raporu, ücretli-organik raporu). | RESMÎ |
| Garanti | Kimse 1. sırayı garanti edemez; "garanti" vaadi Google'ın SEO firması seçerken verdiği uyarı listesinin ilk maddesi. Tutulan firmanın yaptığından site sahibi sorumludur. | RESMÎ |
| Asgari koşul | Googlebot engellenmemiş + sayfa HTTP 200 + dizine eklenebilir içerik. Karşılamak dizine girmeyi garanti etmez (belge güncellemesi 18 Ara 2025). | RESMÎ |
| Sandbox | Kasıtlı bir "yeni site bekletmesi" yok; yeni sitede sinyal az olduğu için öyle görünür. | RESMÎ |
| Süre | Marka adı haftalar; uzun kuyruk 1–6 ay; rekabetli genel terim 6–12 ay ve üstü, garantisiz; tek kelimelik genel terim belki hiç. | 3. TARAF / TAHMİN |
| Yeni sayfa | Ahrefs Mayıs 2025 çalışması: yeni yayımlanan sayfaların yalnız %1,74'ü bir yıl içinde ilk 10'a girdi. | 3. TARAF |
| "4 ay – 1 yıl" | Bu söz 2017 tarihli bir Google videosundan; bugünkü "SEO'ya ihtiyacınız var mı" belgesinde yok. Kesin takvim olarak verilmez. | RESMÎ (eskimiş) |
| Site çeşitliliği | Bir site bir aramada genelde en çok 2 sonuçla görünür; aynı soruya on sayfa yazmak işe yaramaz. | RESMÎ |
| Türkiye pazarı | Eylül 2026: Google %73,4, Yandex %25,2 (mobilde Yandex ~%28). Yandex Webmaster + Haritalar atlanmaz. | 3. TARAF (StatCounter) |
| YZ özetleri | AI Overviews bilgi sorgularında tıklamayı belirgin düşürüyor (Ahrefs Aralık 2025: ilk sonucun tıklama oranı ~%58 düşük; Google yönteme itiraz ediyor). Başarı dönüşümle ölçülür. | 3. TARAF / ÇELİŞKİLİ |

## 1. Google nasıl çalışır

- Akış: **bulma → tarama → işleme (render, JS çalıştırma) → dizine ekleme → sunma.** "Sayfam yok" sorusunda önce hangi adımda takıldığı bulunur. `RESMÎ`
- **robots.txt taramayı, `noindex` dizine eklemeyi denetler.** robots.txt ile engellenen URL yine sonuçlarda (açıklamasız) görünebilir. Hem robots.txt ile engellenmiş hem `noindex` taşıyan sayfanın `noindex`'i hiç görülmez — en sık hata. Çıkarmak istenen sayfa taramaya açık bırakılır, `noindex` ya da 404/410 verilir. `RESMÎ`
- Google JS çalıştırır ama gecikmeyle ve sınırlı (izin istekleri reddedilir, WebSocket/WebRTC/WebGL yok, durum saklanmaz). YZ ve sosyal ağ botlarının çoğu JS hiç çalıştırmaz → içerik, title, kanonik, `og:` ve JSON-LD **ilk HTML'de** olmalı. `RESMÎ` (sosyal botlar kısmı: `ÇELİŞKİLİ` — yaygın bilgi, ayrıca teyit edilmedi)
- Kopyalar kümelenir, Google bir **kanonik** seçer. 301 ve `rel="canonical"` güçlü, site haritası zayıf sinyal. `RESMÎ`
- **Mobil öncelikli dizin:** 31 Eki 2023 tamamlandı duyurusu; 5 Tem 2024'ten beri mobilde hiç açılmayan site dizine girmiyor. "Mobil dostu değil ama mobilde açılıyor" site girer. Akordeon/sekme içeriği serbest. `RESMÎ`
- Kalkan araçlar: Tarama Hızı Sınırlayıcı (8 Oca 2024; yerine sunucu geçici 500/503/429 döner), Mobile-Friendly Test ve Mobil Kullanılabilirlik raporu (1 Ara 2023; yerine Lighthouse), önbellek bağlantısı (Oca 2024) ve `cache:` operatörü (Eyl 2024; yerine Search Console URL Denetimi). `RESMÎ`
- `site:` sorgusunun sonuç sayısı güvenilmez; doğru sayı Search Console → Sayfa dizine ekleme raporu. `RESMÎ`

## 2. Resmî kurallar ve sıralama sistemleri

- **Search Essentials** = teknik gereksinimler + spam politikaları + temel en iyi uygulamalar. `RESMÎ`
- Spam politikalarında üretim yöntemi değil **amaç ve ölçek** önemli: değersiz toplu sayfa, insan da yazsa YZ de yazsa ihlal. `RESMÎ`
- 2024–2026 yeni politikalar: ölçekli içerik istismarı, süresi dolmuş alan adı istismarı, site itibarı istismarı (Mayıs 2024), **geri tuşu kaçırma (15 Haziran 2026'dan beri)**. Reklam ağı betiğinden ya da hazır kütüphaneden gelse bile sorumlu site sahibi. `RESMÎ`
- Site itibarı istismarı: 30 Ağu 2026'dan beri (duyuru 28 Ağu 2026) AEA kullanıcıları için sıralama düşüşü yerine ayrı sınıflama uygulanıyor (AB Dijital Piyasalar Yasası incelemesi). **Türkiye AEA'da değil; Türkiye'de uygulama aynen sürüyor.** `RESMÎ`
- Sıralamayı adı konmuş birçok sistem yapar. **Yararlı içerik sistemi Mart 2024'te çekirdeğe katıldı; ayrı "HCU" yok.** "Sitemi HCU vurdu" Mart 2024 sonrası için teknik olarak yanlış. `RESMÎ`
- **E-E-A-T** doğrudan sıralama faktörü değil, puan da değil; kalite değerlendiricileri sıralamayı değiştiremez. Sahte yazar/unvan kural dışı. `RESMÎ`
- Son çekirdek güncellemeler: Mart 2026 ve Mayıs 2026; son spam güncellemesi 24 Eyl → 7 Eki 2026. `RESMÎ`
- Düşüşte Google'ın önerisi: güncellemenin bitmesini bekle, bitişten 1 hafta sonra karşılaştır, küçük kaymaya dokunma, aceleci "hızlı düzeltme" yapma; önce ölçüm değişikliği (ör. `num=100`) olup olmadığına bak. `RESMÎ`
- Yerel işletmede en sık spam riski: içeriği neredeyse aynı "ilçe + hizmet" şablon sayfaları (kapı sayfası + ölçekli içerik). `RESMÎ`

## 3. Anahtar kelime ve arama niyeti

- **Niyet kelimeden önce gelir:** ilk 10 sonuç hangi sayfa türünü gösteriyorsa kazanma şansı olan tür odur; içerik kalitesi yanlış türü kurtarmaz. `3. TARAF`
- Niyet türleri: bilgi (know), işlem (do), gezinme (website/marka), ticari araştırma (karşılaştırma), işlem amaçlı (satın almaya/aramaya hazır). `RESMÎ` (değerlendirici kılavuzu) / `3. TARAF`
- Hacim yanıltıcı; "trafik potansiyeli", üst konu ve **ticari değer (0–3 puan)** daha iyi ölçüt. Araçların hacim/zorluk sayıları tahmin ve araçtan araca değişir; "kolay" zorluk eşiğinde kaynaklar çelişiyor. `3. TARAF` / `ÇELİŞKİLİ`
- Search Console gerçek tıklama/gösterim verir, hacim vermez; **8–20. sıradaki sorgular en hızlı kazanç**. `3. TARAF`
- Sitede Google Ads kullanılıyorsa arama terimleri raporu ve ücretli-organik raporu en dürüst kelime verisi. `RESMÎ`
- **Her niyete bir sayfa:** eşanlamlılar tek sayfada (Google RankBrain / neural matching ile bağlar); gerçekten farklı hizmetler ayrı sayfada. Aynı niyete iki sayfa = kannibalizasyon. `RESMÎ` / `3. TARAF`
- Mitler: ideal anahtar kelime yoğunluğu (%1–2), "LSI kelimeler", `meta keywords`, sayfaya "yakınımdaki" yazmak, şehir/ilçe/telefon listesi yığmak (spam politikasında keyword stuffing örneği). `RESMÎ`
- Yeni sitede sıra: önce marka adı, sonra uzun kuyruk ve karşılaştırma/"alternatif" sorguları, en son genel terim. `3. TARAF`
- **Eylül 2025:** Google `&num=100` parametresini kaldırdı → Search Console gösterimleri düştü, ortalama pozisyon "iyileşti". Ceza değil, ölçüm değişikliği. Google resmî duyuru yapmadı. `3. TARAF` / `ÇELİŞKİLİ`

## 4. Sayfa içi SEO

- `<title>` en güçlü sayfa içi sinyal; her sayfaya ayrı, açıklayıcı; önemli kelime başa yakın, marka kısa ve sonda; doldurma yok. **Resmî uzunluk sınırı yok**; 50–60 karakter (~600 px) pratik öneri. `RESMÎ` / `TAHMİN`
- Google sonuç başlığını (title link) şunlardan kurar: `<title>`, ilk belirgin ana başlık (genelde `h1`), **`og:title` (26 Ağu 2024'ten beri)**, öne çıkan metin, gelen bağlantı metinleri, `WebSite` verisi. 2025 Q1'de başlıkların ~%76'sını değiştirdi; en çok marka adını atar. Değişiklik birkaç gün–hafta içinde yansır; Google elle düzeltmez. `RESMÎ` / `3. TARAF` (oran)
- **Meta açıklama** sıralamayı etkilemez, yalnız tıklamayı; resmî uzunluk sınırı yok; somut bilgi taşısın. Gizleme: `nosnippet`, `max-snippet`, `data-nosnippet`. `RESMÎ`
- Başlık etiketlerinin (h1–h6) sırası Google için önemsiz; tek ve net ana başlık hem başlık seçimine hem erişilebilirliğe yarar. `RESMÎ`
- URL: tire, küçük harf, kalıcı ve okunur slug; URL'deki kelimenin sıralama etkisi çok hafif. Yayına çıkan URL'yi değiştirmek yönlendirme yükü getirir. `RESMÎ`
- Yalnız **`<a href>`** güvenilir taranır (SPA'larda tıklama olaylı menüler iç sayfaları gizler). Bağlantı metni tek başına anlamlı olsun; güçlü sayfalardan öncelikli sayfalara iç bağlantı. `RESMÎ`
- `meta keywords`: Google 2009'dan beri kullanmıyor; Bing 2014'te kötüye kullanımı sinyal sayabileceğini söylemişti. `lang` özniteliği dil sinyali değil (erişilebilirlik için yine yazılır); `viewport` mobil uyum için gerekli. `RESMÎ` / `3. TARAF`
- Title, açıklama, kanonik JS ile sonradan değiştirilmez (ham ve işlenmiş HTML çelişir); kanoniği JS hiç değiştirmemeli. `RESMÎ`

## 5. Görsel ve video

- Google görseli yalnız `<img src>` (ve `<picture>` içindeki `<img>`) üzerinden bulur; `srcset`/`<picture>`'da yedek `src` şart; **CSS arka plan görseli dizine girmez.** `RESMÎ`
- Alt metin en önemli görsel üst verisi: doğal, somut, bağlama uygun; süs görselinde boş; bağlantılı görselde bağlantı metni yerine geçer. Doldurulmuş alt metin spam riski. Alt metnin web aramasında doğrudan sıralama etkisi yok (2022 ofis saatleri, ikincil aktarım). `RESMÎ` / `3. TARAF`
- Dosya adı açıklayıcı, URL sabit; aynı görsele hep aynı adres (her yüklemede rastgele ad/önbellek parametresi görsel trafiğini dağıtır). `RESMÎ`
- Geç yükleme yerleşik `loading="lazy"` ile; **ekranın üstündeki ana görsel (LCP) asla lazy değil**, `fetchpriority="high"` alır; her görsele `width`/`height`. Bazı temalar her görsele lazy ekler — en yaygın LCP hatası. `RESMÎ`
- Görsel site haritasında yalnız `image:loc` kaldı (2022'de caption, title, geo_location, license kalktı). `RESMÎ`
- base64 gömülü görseller HTML'i büyütür; Googlebot HTML'in ilk 2 MB'ını işler (bkz. §8). `RESMÎ`
- Video sonucu için asıl amacı tek bir videoyu göstermek olan **izleme sayfası** + `VideoObject` + sabit küçük resim URL'si; önemli anlar `Clip` ya da `SeekToAction` ile. **`VideoObject`'e `creator` 24 Eyl 2026'da eklendi.** Ana sayfaya gömülü tanıtım videosu büyük olasılıkla video sonucu almaz. `RESMÎ`
- YZ ile üretilmiş görsel yasak değil; üst veri ve alt metin kontrol edilir; hiç yapılmamış işin "fotoğrafı" güven sorunudur. `RESMÎ`

## 6. İçerik kalitesi ve yapay zekâ

- Google'ın "yararlı, güvenilir, insan için içerik" belgesi (güncelleme 5 Eki 2026) öz-değerlendirme listesi verir; **kelime sayısı hedefi yok** ("tercih ettiğimiz bir kelime sayısı yok"). `RESMÎ`
- **Kim / Nasıl / Neden:** gerçek yazar ve yazar sayfası, üretim sürecinin açıklanması; sahte yazar, YZ yüzü, uydurma sertifika aldatma sayılır. Gerçek kişi yoksa yazar kurum olarak gösterilir. `RESMÎ`
- İçerik değişmeden tarihi (ya da `dateModified`/`lastmod`) güncellemek açık bir "önce arama motoru" işareti. `RESMÎ`
- YZ ile yazmak yasak değil; sıralamayı manipüle etmek için değer katmayan toplu üretim, yöntemden bağımsız olarak **ölçekli içerik istismarı**. Title/meta/alt/şema elle kontrol edilir; sayfada olmayan puan/fiyat/adres uydurulmaz. `RESMÎ`
- "Kopya içerik cezası" yok (site içi kopyada elle işlem yok, yalnız verim kaybı); başkasının içeriğini değer katmadan kopyalamak ise "scraping" spamı. Neredeyse aynı semt sayfaları kapı sayfası (doorway). `RESMÎ`
- Sıradan olmayan içerik (ilk elden deneyim, özgün ölçüm, gerçek fotoğraf) hem klasik hem YZ aramasında öne çıkar. Cevap önce, hikâye sonra. `RESMÎ` / `3. TARAF`
- Konu kümeleri iyi bir düzen yöntemi; "%30–43 daha çok trafik, 3,2× YZ alıntısı" gibi satıcı rakamları doğrulanamadı. `ÇELİŞKİLİ`

## 7. Yapılandırılmış veri

- **JSON-LD** önerilir; ilk HTML'de; işaretleme sayfada görünenle birebir aynı, en özel tür, zorunlu alanlar dolu. `RESMÎ`
- Sıralama faktörü değil; görünümü (zengin sonuç) ve tıklamayı etkiler. İhlalin yaptırımı (elle işlem) de zengin sonuç hakkını kaldırır. Rich Results Test'i geçmek zengin sonucu garanti etmez. `RESMÎ`
- Hâlâ işe yarayan çekirdek: ana sayfada `Organization` + `WebSite` (logo ≥ 112 px, `sameAs`, site adı); yerel işletmede en özel `LocalBusiness` alt türü (ad/adres/telefon sitedekiyle aynı); `BreadcrumbList` (22 Oca 2025'ten beri yalnız masaüstü görünüm); `VideoObject`; `SoftwareApplication`; `Article` yazar bilgisi. `RESMÎ`
- Kalkanlar: **HowTo (13 Eyl 2023), Sitelinks arama kutusu (21 Kas 2024; `SearchAction` ve `nositelinkssearchbox` işlevsiz), 12 Haz 2025'te yedi tür, FAQ zengin sonucu herkes için (7 May 2026).** Eski işaretlemeyi silmek gerekmez, zarar vermez; ama artık bir şey kazandırmaz. `RESMÎ`
- İşletmenin kendi sitesindeki/kendi kontrolündeki yorumlarla yıldız alınmaz; `SoftwareApplication` zengin sonucu gerçek puan/yorum ister; sahte/seçilmiş puan elle işlem riski. Gerçek puan yoksa işaretleme puansız bırakılır. `RESMÎ`
- Favicon: 28 Ağu 2026'da belgeye desteklenen biçimler yazıldı, SVG listede yok (Google desteğin değişmediğini söylüyor) → SVG'nin yanına ICO/PNG yedeği. `RESMÎ`
- YZ özellikleri için özel şema yok. OG etiketleri paylaşım içindir ama `og:title` Google başlık kaynağı olabilir. `RESMÎ`
- Sınama: Rich Results Test (Google uygunluğu) ≠ Schema Markup Validator (söz dizimi). `RESMÎ`

## 8. Tarama ve dizine ekleme (teknik)

- robots.txt'deki `noindex`/`nofollow`/`crawl-delay` Google'da **1 Eyl 2019'dan beri** desteklenmiyor. Site haritası **ping ucu 26 Haz 2023'te** kaldırıldı. Dosyaların kendisi duruyor ("robots.txt mi kalktı, site haritası mı?" sorusunun cevabı). `RESMÎ`
- robots.txt: kökte, UTF-8, ≤ 500 KiB; **5xx dönerse bütün site taraması durabilir** (WAF/CDN kuralı!), 4xx dönerse her şey açık sayılır. Herkese açıktır; gizli yol yazılmaz. `RESMÎ`
- Site haritası: `priority` ve `changefreq` Google'da yok sayılır; `lastmod` yalnız doğruysa değerli (her derlemede "şimdi" basmak onu değersizleştirir; Bing özellikle uyarıyor). Site haritasındaki URL'ye `noindex`/engel çelişkili sinyal. `RESMÎ`
- Durum kodları: kalıcı taşıma 301/308, geçici 302/307, silinen sayfa 404/410; **silinen her şeyi ana sayfaya yönlendirmek soft 404**; bakımda **503 + `Retry-After`** (bakım sayfasını 200 ile göstermek "bakımdayız" metnini dizine sokabilir). 301 PageRank kaybettirmez. `RESMÎ`
- Tek adres: http/https, www'li/www'siz, sondaki eğik çizgi ayrı URL'ler; birini seç, diğerlerini **tek adımda** 301'le; kanonik, site haritası, iç bağlantı, yapılandırılmış veri hep onu göstersin. `RESMÎ`
- **Şubat 2026:** Googlebot belgesi HTML dahil desteklenen dosyanın yalnız ilk **2 MB**'ının (sıkıştırılmamış) işlendiğini yazıyor; PDF'de 64 MB; diğer Google tarayıcıları için varsayılan 15 MB. Google bunu "açıklama" olarak niteliyor. `RESMÎ`
- Tarama bütçesi büyük sitelerin derdi; robots.txt ile sayfa engellemek bütçeyi önemli sayfalara kaydırmaz (site kapasite sınırında değilse). `RESMÎ`
- `hreflang` yalnız çok dilli/çok bölgeli sitede, karşılıklı olmalı; Google dili metinden algılar, `lang`/`hreflang`'e bakmaz. `rel="next/prev"` 2019'dan beri Google'da kullanılmıyor. URL Parametreleri aracı 26 Nis 2022'de kalktı. `RESMÎ`
- Indexing API yalnız `JobPosting` ve `BroadcastEvent` (canlı yayın) sayfaları için; sıradan sayfada kullanmak kural dışı. `RESMÎ`
- Yönetim paneli ve test ortamı: parola/IP kısıtı + `X-Robots-Tag: noindex`; robots.txt'ye yazılmaz. Canlıya geçişte en klasik kaza: test ortamındaki `Disallow: /`, genel `noindex`, test alan adını gösteren kanoniklerin taşınması. `RESMÎ`
- PDF, görsel gibi HTML olmayan dosyalarda `noindex`'in tek yolu `X-Robots-Tag` HTTP başlığı. `RESMÎ`

## 9. Hız, mobil ve JavaScript

- **Core Web Vitals:** LCP ≤ 2,5 sn · INP ≤ 200 ms · CLS ≤ 0,1; gerçek kullanıcıların 75. yüzdeliği, 28 günlük pencere, mobil/masaüstü ayrı; grubu en kötü metrik belirler. **INP 12 Mar 2024'te FID'in yerini aldı** (FID'in Chrome araçlarından kaldırılması 10 Eyl 2024'te ilan edildi, 9 Eyl geçiş için verilen son gündü: CrUX API FID'i o gün bıraktı, PSI ve öteki araçların da birkaç gün içinde bırakacağı duyuruldu; BigQuery'de son FID verisi 202408 tablosunda; FID eşiği veren rehber eskimiş). `RESMÎ`
- Sıralamada küçük ama gerçek faktör: ilgililiğin önüne geçmez, benzer sayfalarda eşitlik bozar. **Lighthouse/PageSpeed puanı sıralamada kullanılmaz**; saha verisi CrUX kullanılır. CrUX'ta Brave, Edge ve iOS kullanıcıları yok; kendi tarayıcında hızlı görmek ölçüt değil. `RESMÎ` (Brave kısmı: `TAHMİN` — belge yalnız "diğer Chromium tarayıcıları (ör. Microsoft Edge)" der, Brave adını anmaz; kuraldan çıkarım)
- CrUX araçları: API günlük (28 günlük kayan ortalama), History API ve CrUX Vis haftalık (son 40 hafta), BigQuery aylık (yalnız origin). URL için veri yetersizse PSI doğrudan origin'e düşer (yanıtta `origin_fallback: true`), CrUX API 404 döner; "URL grubu → origin grubu" geçişi yalnız Search Console CWV raporunda. `RESMÎ` `noindex`'li ya da 200 dönmeyen sayfaların origin verisine katkısı belirsiz: metodoloji sayfası kendi içinde çelişiyor (yönetim panelini ayrı alt alan adına almak olası etkiyi ayırır). `ÇELİŞKİLİ`
- Pratik: LCP görselini lazy yapma + `fetchpriority="high"`; her görsele boyut; Türkçe karakter aralığını içeren WOFF2 yazı tipi; uzun JS işlerini böl; tam ekran çerez/kampanya penceresi yerine küçük alt bant (hem müdahaleci geçiş reklamı kuralı hem CLS). `RESMÎ` / `3. TARAF`
- Render: sayfaları sunucuda HTML olarak üret (SSR, statik üretim, klasik MVC); JS yalnız etkileşim için. **Dinamik render artık "geçici çözümdü, önerilmez"** (belge güncellemesi 10 Ara 2025); Bing'in 2018 önerisinin bugün geçerliliği doğrulanamadı. Programlama dilinin kendisinin sıralamaya etkisi yok; etkili olan çıkan HTML. `RESMÎ` / `ÇELİŞKİLİ`
- Mobilde içerik eksikse Google için yoktur; mobil sürümde `noindex` felaket. `RESMÎ`

## 10. Alan adı, sunucu, dil ve güvenlik

- Google sunucuyu değil cevabını görür: dil, CMS, dosya uzantısı sıralamayı etkilemez; ilk HTML, durum kodu ve hız etkiler. `RESMÎ`
- Alan adı yaşı ve anahtar kelimeli alan adı işe yaramaz (EMD sistemi bu tür adların kredisini kısar); kısa, tiresiz marka adı. `RESMÎ`
- Ülke sinyali ccTLD (ör. `.tr`), hreflang ve yerel içerikten gelir. **Search Console ülke hedefleme 22 Eyl 2022'de kalktı** ("Search Console'da Türkiye'yi seç" tavsiyesi eskimiş). `RESMÎ`
- Hosting dolaylı ama gerçek etki: yavaş TTFB LCP'yi bozar, süren 5xx URL'leri dizinden düşürür. `RESMÎ`
- **Bot korumaları Googlebot'u sessizce keser:** Cloudflare "Block" / ABD IP engeli; 1 Tem 2025'ten beri Cloudflare yeni alan adlarında YZ botlarını varsayılan engelliyor, "Managed robots.txt" yayındaki robots.txt'nin başına kural ekleyebiliyor; 15 Eyl 2026'dan beri YZ eğitim denetiminin en sert seçeneği Googlebot'u da kapsıyor. Her ayar değişikliğinden sonra URL Denetimi canlı testi + yayındaki robots.txt'ye elle bakılır. `3. TARAF` / `RESMÎ` (Cloudflare belgesi)
- HTTPS hafif sinyal; asıl iş bütün varyantları tek kanonik adrese tek adımda toplamak. `RESMÎ`
- Hack belirtileri Search Console'da: yabancı mülk sahibi, bilinmeyen site haritası, Japonca/anlamsız başlıklar (Japanese keyword hack). `RESMÎ`
- Çok dilli sitede her dile ayrı URL; IP'ye ya da çereze göre dil değiştirme yok. `RESMÎ`

## 11. Yerel SEO

- Yerel sıralama **alaka, mesafe, öne çıkma** ile belirlenir; mesafe değiştirilemez, para ile sıra alınmaz. Harita sıralaması aramayı yapanın konumuna göre değişir ("3. sıradayız" tek rakam yanıltıcı; ızgara ölçümü kullanılır). `RESMÎ`
- Google İşletme Profili: **ad = tabeladaki gerçek ad** (adda anahtar kelime anketlerde güçlü görünse de kural dışı, askı riski). Müşteriye giden işletme (hizmet bölgesi işletmesi) adresini gizler; en çok 20 bölge, yarıçap yok, ~2 saatlik sürüş sınırı. `RESMÎ`
- **Birincil kategori** en kritik alan; hizmet listesi ve doğru çalışma saatleri önemi artan alanlar. `3. TARAF` (yerel sıralama anketleri)
- Yorum: her müşteriden iste, ödüllendirme, "gating" (yalnız memnunlara sorma) yok; her yoruma gerçek yanıt. Sahte yorum yaptırımı yeni yorum alamama, yorumların kalkması, profilde uyarı; süre ("~30 gün") topluluk raporu. **Türkiye'de sahte yorum idari para cezası konusu** (Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği; 2026 değişikliği haberlerden, Resmî Gazete metni ayrıca doğrulanmalı). `RESMÎ` / `ÇELİŞKİLİ`
- **NAP** (Name, Address, Phone: ad, adres, telefon) her yerde birebir aynı. Atıfların (dizin kayıtları) harita etkisi azaldı (uzman anketi: 2013 %18 → 2021 %7). `3. TARAF`
- Türkiye: Yandex Business / Yandex Haritalar kaydı ve Yandex Webmaster site bölgesi ayarı atlanmaz. `RESMÎ` (Yandex)
- Şablon semt sayfaları kapı sayfası; hizmet başına gerçek sayfa aç, semt sayfasını yalnız gerçek yerel içerik varsa yaz. `RESMÎ`
- Kalkanlar: `business.site` siteleri (10 Haz 2024 kapandı), profil sohbeti ve Soru-Cevap. Yerel Hizmet Reklamları'nın Türkiye'de olduğuna dair kanıt bulunamadı. `RESMÎ` / `ÇELİŞKİLİ`

## 12. Sayfa dışı SEO: bağlantılar ve marka

- Bağlantı hâlâ sinyal (PageRank sistemi etkin) ama Google'a göre Eylül 2023'ten beri ilk 3 etken arasında değil. `RESMÎ` / `3. TARAF` (alıntı)
- Para, mal, hizmet ya da indirim karşılığı bağlantı spamdır; ücretli bağlantı yalnız `rel="sponsored"`/`nofollow` ile serbest. Satın alınan bağlantı ya yok sayılır ya elle işlem getirir. `RESMÎ`
- `sponsored` (ücretli), `ugc` (kullanıcı içeriği), `nofollow` (diğer); **10 Eyl 2019'dan beri sıralamada, 1 Mar 2020'den beri tarama/dizinde "ipucu"**. İç bağlantıya `nofollow` konmaz. `RESMÎ`
- **Disavow** yalnız elle işlem riski olan, çok sayıda kötü bağlantı durumunda; Domain property'de çalışmaz (URL öneki mülkü), her yükleme öncekini siler. "Zehirli bağlantı", DA/DR Google kavramı değildir. `RESMÎ`
- Elle işlemde sıra: her yerde düzelt → önce kaldırmayı dene ve belgele → disavow → tek, eksiksiz yeniden inceleme talebi. `RESMÎ`
- Kalıcı bağlantı dijital PR ile kazanılır: özgün veri/araştırma (alıntılanabilir 8–12 istatistik + yöntem kutusu), ücretsiz araç, kaynak sayfaları, kısa kişisel e-posta. YZ aramasında gerçek marka anılmaları değer kazanıyor; yapay anılma üretmek işe yaramaz. `3. TARAF`

## 13. Diğer motorlar ve yapay zekâ araması

- **Yandex:** Webmaster + site bölgesi + Haritalar; güncel robots.txt belgesinde `Crawl-delay` ve `Host` yok (eski Türkçe rehberler ve bazı 3. taraf rehberler hâlâ "destekler" diyor; Yandex belgesi esas), `Clean-param` var. `RESMÎ` / `ÇELİŞKİLİ`
- **Bing Webmaster:** Search Console'dan içe aktarılır; Bing'i beslemek DuckDuckGo'yu ve Copilot'u da besler (Yahoo'nun Bing'den beslendiği yaygın ama resmî doğrulanamadı). `lastmod` gerçek olmalı. `RESMÎ` / `ÇELİŞKİLİ`
- **IndexNow:** Bing, Yandex ve katılımcılara anında bildirim; yalnız değişen URL'ler; anahtar dosyası yayında olmalı. **Google kullanmıyor** (katıldığına dair resmî kaynak yok). GET'te `url` değeri RFC 3986'ya göre kodlanır (`https%3A%2F%2F…`; indexnow.org belgesinin kendi örneği kodlanmamış, kurala uy). Yanıtlar: `202` = URL alındı, anahtar doğrulaması bekleniyor (yeni anahtarda olağan); `422` = URL'ler `host`'a ait değil ya da anahtar şemaya uymuyor (Yandex'te ayrıca anahtar uzunluk/karakter hatası, boş `urlList`, 10.000 aşımı); `405` = yöntem desteklenmiyor (Yandex). `RESMÎ` Katılımcı listesi kaynağa göre değişiyor (6 Kas 2026: ana sayfa Bing, Naver, Seznam.cz, Yandex, Yep; SSS uç noktalarında bunlara ek olarak Amazon; Internet Archive yalnız `searchengines.json`'da ve `unsubscribe: true`, yani anlık bildirim almıyor); SSS anahtar hatalarını 400/422'de sayıyor, belge ve Bing 403'te → 400/403/422'de önce anahtar dosyasına bak. `ÇELİŞKİLİ`
- **AI Overviews / AI Mode:** ek dosya, özel şema ya da özel yazım yok; dizinde ve snippet'e uygun olmak yeter. Google (15 May 2026): "AEO ve GEO de SEO'dur." Sorgu çeşitlemeleri için toplu sayfa ölçekli içerik istismarına girebilir. `RESMÎ`
- **llms.txt** Google Aramada yok sayılır; Lighthouse'taki kontrolü ceza değil. `RESMÎ`
- **Google-Extended** aramayı etkilemez (yalnız Gemini eğitimi/temellendirme); YZ özetini sınırlamanın yolu `nosnippet`, `max-snippet`, `data-nosnippet`. `RESMÎ`
- YZ botları üç tür: arama (ör. `OAI-SearchBot`), eğitim (ör. `GPTBot`), kullanıcı isteği; eğitimi kapatıp aramayı açık bırakmak mümkün; JS çalıştırmazlar. ChatGPT'nin Bing dizinine dayandığı yaygın iddia, OpenAI resmî doğrulamadı. `RESMÎ` / `ÇELİŞKİLİ`

## 14. Araçlar ve ölçüm

- Search Console: **alan adı mülkü** bütün varyantları görür; disavow ise URL öneki mülkünde. Dışarıdan birine önce yalnız okuma (kısıtlı) yetki: tam kullanıcı bütün veriyi görür ve bazı işlemleri yapar, kısıtlı kullanıcı verinin çoğunu yalnız görüntüler. `RESMÎ`
- Dizindeki sayfa sayısı: Sayfa dizine ekleme raporu. "Google ne görüyor": URL Denetimi canlı testi + işlenmiş HTML. URL Denetimi taramanın hangi Googlebot'la (mobil/masaüstü, "Crawled as") yapıldığını gösterir; mobil kullanılabilirlik sonucu vermez (o rapor ve Mobile-Friendly Test 1 Ara 2023'te kalktı). `RESMÎ`
- **Kaldırmalar aracı ~6 ay geçici**; kalıcı çözüm 404/410, `noindex` ya da parola. `RESMÎ`
- Eski rehberlerdeki ama artık olmayanlar: URL Parametreleri, ülke hedefleme, robots.txt test aracı (yerine robots.txt raporu), Mobile-Friendly Test, tarama hızı ayarı, `cache:`. `RESMÎ`
- Tarama İstatistikleri raporu (Ayarlar): son 90 gün istekleri, yanıt süresi/kodu, amaç, robots.txt/DNS/bağlantı sağlığı. `RESMÎ`
- Hız: PageSpeed Insights (saha + laboratuvar), Lighthouse (Chrome DevTools içinde), CrUX. Ücretsiz tarayıcılar: Screaming Frog (500 URL'ye kadar ücretsiz), Bing/Yandex Webmaster araçları. Fiyat ve ücretsiz plan sınırları kaynaklar arasında farklı. `3. TARAF` / `ÇELİŞKİLİ`
- **KPI'lar dönüşüme dayanır:** telefon aramaları, yol tarifi, form, yorum, deneme kaydı; sıralama tek başına KPI değil. `3. TARAF`

## 15. Sorun giderme (belirti → teşhis → çözüm)

| Belirti | Olası neden | Teşhis | Çözüm |
|---|---|---|---|
| Yeni sitede 25 sayfa var ama `site:` eski sitenin binlerce sayfasını gösteriyor | Eski URL'ler robots.txt ile engelli (Google 404/410'u göremiyor), eski site haritası hâlâ kayıtlı, yönlendirme yok | `site:` değil Search Console Sayfa raporu + URL Denetimi; `curl -sIL` ile gerçek durum kodu | Karşılığı olan URL'yi tek adımda 301, olmayanı 404/410; engeli kaldır ki Google kodu görsün; robots.txt `Noindex:` satırı işe yaramaz; temizlik haftalar–aylar sürer |
| Ani düşüş | Çekirdek/spam güncellemesi, ölçüm değişikliği (`num=100`), teknik kaza, elle işlem | Güncelleme takvimi, Elle İşlemler ve Güvenlik raporları, Tarama İstatistikleri | Güncellemede bekle + 1 hafta sonra karşılaştır; teknik kazayı düzelt; elle işlemde rapordaki adımlar |
| Sonuçlarda "Sitemiz bakımdadır" | Bakım sayfası 200 döndü | URL Denetimi | Bakımda 503 + `Retry-After` |
| Sayfalar düşüyor, site tarayıcıda açık | CDN/WAF/bot koruması Googlebot'u kesiyor; robots.txt 5xx | URL Denetimi canlı test, Tarama İstatistikleri, sunucu günlüğü | Cloudflare'de "Block" değil "Disallow AI Training"; doğrulanmış tarayıcılara izin |
| Japonca başlıklar, bilinmeyen site haritası | Hack | Search Console Güvenlik + kullanıcı/sahip listesi | Temizle, açığı kapat, yabancı sahibi çıkar, inceleme iste |
| Soft 404 | Silinenler ana sayfaya yönlendirilmiş / boş içerik 200 | Sayfa raporu | 404/410 ya da gerçek karşılığa 301 |
| Canlıya geçişten sonra trafik sıfır | Test ortamının `Disallow: /`, `noindex` ya da kanonikleri taşındı | Yayındaki robots.txt, meta robots, kanonikler | Düzelt, önemli URL'ler için dizine ekleme iste |

`RESMÎ` (yöntem) — senaryolar genel örnektir.

## 16. Müşteri işi (bir işletmenin sitesini devralmak)

- **Okurun durumuna göre:** işletmenin reklamını da yöneten hizmet veren → bütün adımlar + Ads/SEO kesişimi; yalnız SEO için tutulan danışman/ajans → önce erişim ve sahiplik, Ads kısmı yalnız işletme reklam veriyorsa; işletme sahibi → sahiplik tablosu, Google'ın SEO firması seçerken verdiği uyarı listesi ve § 20'deki ajans kırmızı bayrakları kontrol listesi olarak. `TAHMİN`
- **Önce sahiplik:** alan adı, Search Console, İşletme Profili işletmenin kendi hesabında; danışmana denetimde yalnız okuma, sonra gerekiyorsa yönetici yetkisi. Site sahibi tuttuğu kişinin/firmanın yaptığından sorumlu. `RESMÎ`
- Denetim sırası: dizin durumu → elle işlem/güvenlik → tarama → teknik temel → hız → içerik → yerel → bağlantılar → ölçüm. Bulgular etki/zahmet tablosuyla ve işletmenin anlayacağı dille. `3. TARAF` / `TAHMİN`
- Platform/host değişikliği yalnız somut engelde: taranamıyor, düzenlenemiyor, yönlendirme yapılamıyor, yavaş/kesintili, alan adı işletmenin üzerinde değil, tekrar eden hack. `TAHMİN`
- **Site taşıma:** her eski URL'yi kendi karşılığına tek adımda 301/308; karşılığı yoksa 410; yönlendirmeler en az 1 yıl; alan adı değişiyorsa Site Adresi Değişikliği aracı (180 gün). `RESMÎ`
- Google Ads ile: reklam organiği yükseltmez; iyi açılış sayfası Kalite Puanı / Ad Rank'e, arama terimleri raporu SEO'ya yarar. `AdsBot` robots.txt'de adıyla engellenmez (`*` kuralını yok saydığı bilgisi bu araştırmada yeniden kontrol edilmedi). `RESMÎ` / `ÇELİŞKİLİ`
- Söz verilecek şey sıra değil, yapılan işler ve ölçülen sonuç (arama, yol tarifi, form). Yapılmayacaklar sözleşmede yazılı: addaki anahtar kelime, sahte yorum, şablon semt sayfaları, bağlantı paketi. `RESMÎ` / `TAHMİN`

## 17. Yeni site: 90 günlük yol haritası

- **Gün 0 (yayın öncesi):** marka alan adı; tek kanonik HTTPS adres; sunucuda hazır HTML; her sayfaya ayrı title/açıklama/kanonik; `Organization` + `WebSite`; temiz robots.txt (arama YZ botları açık, eğitim botları isteğe bağlı) ve dürüst site haritası; test ortamı parola/`noindex` ile gizli; CDN bot ayarları kontrol. `RESMÎ`
- **İlk iki hafta:** Search Console (alan adı mülkü), Bing (içe aktar), Yandex (site bölgesi), IndexNow, (yerel işletmede) İşletme Profili ve **dönüşüm ölçümü**. `RESMÎ`
- **1.–3. ay:** bir niyet = bir sayfa; yardım ve karşılaştırma içerikleri; özgün veri; yorum düzeni; kazanılmış bağlantılar; Search Console verisiyle düzeltme. `3. TARAF`
- **Sonrası:** 6 ayda ilk 10'a girmeyen sayfa güncellenir; güncellemelerde sakin kalınır; tarih ve yorumlarda dürüstlük. `3. TARAF`
- Yazılım ürünü örneği (online randevu programı): marka ve "giriş" sorguları → ana sayfa; "randevu programı", "online randevu sistemi" → özellikler; sektöre özel sorgular ("kuaför randevu sistemi") → yalnız gerçekten farklı ihtiyaç varsa ayrı sayfa; "X alternatifi" → karşılaştırma; "randevu programı fiyat" → fiyatlar. `TAHMİN`
- Kısayolların (toplu YZ sayfası, bağlantı paketi, şehir şablonu, adda anahtar kelime, sahte yorum) hepsi ya işe yaramaz ya ceza getirir. `RESMÎ`

## 18. Yayın günü üçlüsü ve kısa kontrol listesi

- [ ] robots.txt yayında doğru (test ortamının `Disallow: /`'u yok), 200 dönüyor
- [ ] meta robots / `X-Robots-Tag`: istenmeyen `noindex` yok
- [ ] kanonikler canlı alan adını gösteriyor
- [ ] önemli sayfalar 200, giriş istemiyor, mobilde açılıyor
- [ ] title/açıklama/kanonik/`og:`/JSON-LD ilk HTML'de
- [ ] tek adres (https + www tercihi) ve tek adımlı 301'ler
- [ ] LCP görseli lazy değil; görsellerde boyut var
- [ ] Search Console + Bing + Yandex doğrulandı, site haritası gönderildi
- [ ] (yerel) İşletme Profili doğrulandı, NAP her yerde aynı
- [ ] dönüşüm ölçümü (arama, form, yol tarifi) kurulu

## 19. Doğrulanamayanlar (toplu)

- Google'ın AI Mode / AI Overviews'i Türkiye'de kademeli açtığı 18 Şub 2026 duyurusunun asıl metni (yalnız ikincil kaynak).
- Arama Kalitesi Değerlendirici Kılavuzu'nun 2026 sürümü olup olmadığı.
- Navboost ayrıntıları (dava tanıklığı/sızıntı yorumu; resmî belgede yok).
- `&num=100` kaldırılması ve Search Console etkisi (Google resmî duyuru yapmadı).
- Kök adreste sondaki eğik çizginin fark etmediği (Mueller alıntısı, belgede yok).
- URL Denetimi API'si: site başına günde 2.000, dakikada 600 istek (RESMÎ, webmaster-tools/limits); "Dizine eklenmeyi iste" günlük sınırı için resmî rakam yok.
- Bing ve Yandex `crawl-delay` desteği (güncel resmî belgelerde yok).
- Google'ın Türkçe karakterli ile ASCII'ye çevrilmiş URL'ler hakkında resmî görüşü.
- Google tarayıcılarının HTTP/3 kullanıp kullanmadığı.
- Cloudflare Bot Fight Mode'un doğrulanmış tarayıcıları muaf tutmayabildiği (topluluk raporu).
- Sosyal ağ önizleme botlarının JS çalıştırmadığı (yaygın bilgi).
- `areaServed` alanının Google'da etkisi; hizmet bölgesi işletmesinde sokaksız `address` kullanımının etkisi.
- Konu kümeleri için satıcı rakamları (%30–43 trafik, 3,2× YZ alıntısı).
- Sahte yorum yaptırımında "~30 gün" süre; Bing Places'in Google'dan içe aktarmasının Türkiye'de çalışıp çalışmadığı.
- Yahoo organik sonuçlarının Bing'den geldiği; ChatGPT'nin Bing dizinine dayandığı.
- Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği 2026 değişikliği ve ceza rakamları (haber kaynakları; Resmî Gazete metni doğrulanmalı).
- IndexNow katılımcı listesi (indexnow.org ana sayfası, SSS ve `searchengines.json` farklı) ve SSS'deki hata kodu nedenleri (anahtar sorunu belge ve Bing'de 403, SSS'de 400/422).
- CrUX'ta `noindex`'li ya da 200 dönmeyen sayfaların origin verisine katkısı (metodoloji sayfası kendi içinde çelişiyor).

---

## 20. Kara şapka: tanı, korun, temizle (Bölüm 21)
Bu teknikler **uygulamak için değil**, tanımak için listelenir: müşteri sitesinde iz bulmak, rakip saldırısına karşı korunmak ve ajans tekliflerini elemek için bilinir.

**Genel kural**
- Hepsi tespit gecikmesini kullanır. Bugün en sık sonuç ceza değil **sessiz yok sayılma** (SpamBrain, Ara 2022'den beri bağlantı alan ve satan siteleri etkisizleştiriyor). `RESMÎ`
- Görünür ceza = elle işlem (Search Console → Elle işlemler). Algoritmik düşüşte yeniden değerlendirme talebi gönderilemez; düzeltip beklenir. `RESMÎ`
- 15 May 2026'dan beri Google spam politikaları AI Overviews / AI Mode'a da uygulanıyor. `3. TARAF`

**Teknikler ve izleri**
- **Gizli metin/bağlantı:** `display:none`, zeminle aynı renk, `left:-9999px`, `font-size:0`, tek karakterlik bağlantı. Ajansın müşteri sitelerinin footer'ına kendi sitelerine giden gizli bağlantı koyması = gizli bağlantı + şablon bağlantısı ihlali; bedeli müşteri öder ("Sitenizden çıkan doğal olmayan bağlantılar"). İz: Ctrl+U, Ctrl+A, konsol betiği (Bölüm 21 `#gizli-baglanti`). Ajans imzası görünür + marka adı + `nofollow`. `RESMÎ`
- **Cloaking:** UA / IP / referrer / yalnız mobil. Kod deseni: `preg_match('/googlebot/i', $_SERVER['HTTP_USER_AGENT'])`, `.htaccess`'te `RewriteCond %{HTTP_REFERER} (google…)`. İz: URL Denetimi canlı test (IP tabanlıyı yalnız bu görür) + `curl -A` karşılaştırması. `RESMÎ`
- **JS ile gizleme, sinsi yönlendirme, `meta refresh`, geri tuşu kaçırma** (15 Haz 2026'dan beri; reklam betiğinden gelse de site sorumlu). İz: telefondan, Google sonucundan girip Geri'ye bas. `RESMÎ`
- **PBN:** süresi dolmuş alan adları üzerine kurulu ağ. İz: ince içerik, Wayback'te başka konu, aynı ay alınmış alanlar; robots.txt'de AhrefsBot/SemrushBot/MJ12bot kapalı ama Googlebot açık (tek başına kanıt değil). `3. TARAF`
- **Süresi dolmuş alan adı:** 301 ile güç aktarma ya da eski itibarla içerik basma. Mar 2024'ten beri ayrı politika. Savunma: müşterinin alan adlarını otomatik yenilemeye bağla. `RESMÎ`
- **Ücretli bağlantı biçimleri:** tanıtım yazısı paketi, niche edit (eski yazıya bağlantı ekletme), bağlantı kiralama, ABC takas, widget/tema/nulled tema bağlantısı, basın bülteni. Satan da cezalanır. `RESMÎ`
- **Çiftlik, otomatik araç, Web 2.0/profil/yorum spamı, kademeli (tiered) bağlantı, yem ve değiştir, anchor manipülasyonu.** Etkisi neredeyse sıfır. Kendi sitende: kullanıcı bağlantılarına `rel="ugc nofollow"`, profil sayfalarına `noindex`. `RESMÎ`
- **Türkiye:** backlink paketleri, işaretsiz tanıtım yazısı, **hacklink** (hacklenmiş `.gov.tr`/`.edu.tr`/belediye sitelerine gizli bahis bağlantısı). İz: `site:alan bahis`. Kamu sitesi → USOM. `3. TARAF`
- **İçerik/itibar:** ölçekli YZ içerik ve kazıma, parazit SEO (AEA dışında, Türkiye dahil elle işlem sürüyor), kendini 1 numara yapan "en iyi X" listeleri, sahte inceleme/ödül siteleri, sahte yazar ve YZ vesikalığı (Google Eki 2026'da rehbere ekledi `3. TARAF`), sahte tazelik, sahte puan şeması, typosquatting, Discover spamı, Indexing API kötüye kullanımı (yalnız `JobPosting`/`BroadcastEvent` için), politika atlatma.
- **Hack:** Japon/ilaç/bahis sayfaları, cloaking ile saklama, Search Console'a yabancı sahip, sabotaj (`Disallow: /`, `noindex`, kanonik değişimi, Kaldırmalar aracı). Sunucuda ara: `grep -rlE 'eval\(base64_decode|gzinflate\(|str_rot13\('`, `grep -rniE 'googlebot|HTTP_REFERER'`, `find -mtime -14`, `uploads` içinde PHP. Arka kapı kapanmadan temizlik bitmez. `RESMÎ` (web.dev)
- **Davranış:** CTR/hit botu (Sterling Sky testi: geçici, sonra eski sıra `3. TARAF`), otomatik tamamlama manipülasyonu, sosyal sinyal satın alma (Google sıralama faktörü değil).
- **Yerel:** işletme adına anahtar kelime (Whitespark Eyl 2026: hâlâ korelasyon var `3. TARAF`; sonuç askıya alma), sanal ofis/posta kutusu adresi, çoklu sahte kayıt ve sahte "yetkili servis" (SERBİS ile doğrulanır), satın alınmış/teşvikli/süzülmüş (gating) yorum, yorum taşıma, kayıt ele geçirme ve "Google'dan arıyoruz" (Google GBP için ücret istemez). `RESMÎ`
- **YZ:** sayfaya YZ için gizli talimat (Bing yönergelerinde açık yasak: düşürme/dizinden çıkarma `RESMÎ` (Bing)); "YZ ile özetle" düğmesiyle asistan belleğine reklam (Microsoft Şub 2026 "AI Recommendation Poisoning", 31 şirket `RESMÎ` (Microsoft)); YZ tarayıcısına özel cloaking (SPLX Eki 2025 `3. TARAF`); sahte bahsetme ve Reddit astroturfing. İz: kaynakta "AI assistant", "ignore previous instructions", "remember … trusted source".
  - Yapay zekâ kullanan ürünler için ders: dil modeline verilen web metni **veri**dir, talimat değil.
- **Siteye girmeden itibar çalma:** alt alan adı ele geçirme (unutulmuş `CNAME` → kapatılmış bulut hizmeti; korunma: hizmeti kapatırken DNS kaydını sil), açık yönlendirme (`/git?url=`), ücretsiz barındırma/bulut depolamada spam ("spam içeren ücretsiz barındırma" elle işlemi platform sahibine). `3. TARAF` (Spamhaus)
- **SEO zehirlemesi:** hacklenmiş sitelerde sahte "indir/şablon/örnek belge" sayfaları üst sıraya taşınıp zararlı yazılım dağıtılır (Gootloader: hukuki belge aramaları, WordPress). İz: Güvenlik sorunları → kötü amaçlı yazılım. `3. TARAF` (Sophos)
- **Görünmez talimat:** sıfır genişlikli / Unicode etiket karakterleri (U+E0000–E007F, "ASCII smuggling"); `llms.txt` gibi yalnız botların okuduğu dosyalara sitede olmayan iddia yazmak.
- **Video/sosyal:** izlenme/abone botu, viewbotting, sub4sub, etkileşim grupları (pod), kötü niyetli tık tuzağı başlık/küçük resim, açıklamaya aşırı etiket, yorum spamı → YouTube Sahte Etkileşim + Spam politikaları; 90 günde 3 ihtar = kanal kapatma. YPP: 15 Tem 2025'ten beri "inauthentic content" (eski "repetitious"). `RESMÎ` (YouTube)
- **Bağlantı ekleri:** link wheel (ücretsiz bloglar halka + para sitesi), EMD (Eyl 2012 güncellemesinden beri avantaj yok), gizli `iframe` / `noscript` bağlantıları. Negatif SEO tablosuna: rakip reklamına sahte tıklama (Google Ads geçersiz tıklamayı iade eder).
- Doğrulanmış tarih ve rakamlar (21 Eki 2026): Ağu 2026 spam 18–21 Ağu; Eyl 2026 spam 8 Eki'de bitti; Microsoft: 60 günde 50 istem / 31 şirket / 14 sektör; Ahrefs 361 $ = niche edit ortalaması (450 sitenin %12,6'sı kabul); sahte DMCA davası Kas 2023 açıldı, Eyl 2024 gıyabi kararla kazanıldı; Bing prompt injection maddesi Tem 2024, Şub 2026'da "Prompt Injection and AI Manipulation" bölümü; şantaj formu ~Eki 2025; spam politikaları sayfasında başlık artık "Site reputation policy".

**Negatif SEO (rakip saldırısı)**
- Spam bağlantı yağdırma / kötü alanı 301'leme → çoğunlukla etkisiz; elle işlem yoksa dokunma. "Zehirli bağlantı" Google kavramı değil. `3. TARAF` (Mueller/Illyes açıklamaları)
- Gerçek zarar verenler: **sahte DMCA** (geri tarihli kopya + kaldırma talebi → counter-notice, lumendatabase.org), **sahte 1 yıldız + şantaj** (ödeme yok; Google'ın şantaj formu), **"Düzenleme öner" saldırısı** (kalıcı kapandı, telefon değişikliği), **site içi arama spamı** (arama sayfalarına `noindex`), sahte bağlantı kaldırma e-postası / sahte disavow (DMARC, disavow dosyasını denetle), DDoS, **hack ile sabotaj**.
- Aylık rutin: SC kullanıcılar, elle işlem, güvenlik sorunları, Kaldırmalar; `site:` + spam kelimeleri; bağlantı raporu; GBP değişiklik uyarıları ve yorum dalgası; robots.txt/şablon değişikliği.

**Müşteri sitesinde iz taraması (sırayla)**
1. Müşteriye sor (backlink paketi, hit, tanıtım yazısı, eski ajans, lisanssız tema).
2. Search Console: elle işlem, güvenlik, kullanıcılar, Kaldırmalar, site haritaları, Bağlantılar, dizinlenen sayı.
3. `site:` aramaları (spam kelimeleri, `inurl:ara`, benzersiz cümle `-site:`).
4. Kaynak kod + konsol betiği + JS kapalı/açık.
5. URL Denetimi canlı test + `curl` (insan / Googlebot / referrer / YZ UA).
6. Telefondan Google sonucundan gir, Geri'ye bas.
7. Sunucu dosyaları (karartılmış kod, bot dalları, son değişenler).
8. Ahrefs Webmaster Tools / Semrush: bağlantı metni dağılımı, toplu ağ bağlantıları.
9. Zengin Sonuç Testi, İşletme Profili, YZ izleri. Hepsini tarihli kanıtla raporla.

**Ajans kırmızı bayrakları:** "1. sıra garantisi", "ayda 500 backlink", "kendi site ağımız", işaretsiz "tanıtım yazısı paketi", "%100 organik hit", "anında dizinleme", "yorum paketi", "adınıza anahtar kelime / her ilçeye şube", "YZ'de görünme garantisi / GEO paketi", "ne yaptığımız sır", "SC'ye sahiplik verin", "rakibinizi düşürürüz". Sor: bağlantı listesi, sponsored işareti, eklenecek kod, ayrılınca ne kalkar. Sözleşmeye "gizli bağlantı / sahte yorum / kural dışı yöntem yok" maddesi.

**Yeniden değerlendirme talebi:** kökü bul, her yerde düzelt, bağlantıda önce kaldırmayı dene ve belgele, sonra disavow; sayfalar erişilebilir; talepte sorun → neden → yapılanlar → tekrar olmaması için değişen; tek talep, bekle. Hack → Güvenlik sorunları → inceleme iste.

Ayrıntı, kaynak numaraları ve komut örnekleri: `21-kara-sapka.html`.

---

## Kaynakça

İlk sürümdeki bütün kaynaklara 21 Ekim 2026'da erişildi; sondaki "6 Kasım 2026 güncellemesinde eklenenler" grubundakilere 6 Kasım 2026'da erişildi. Bölüm sayfalarının sonunda her sayfanın kendi numaralı kaynak listesi de vardır.

### Google Search Central belgeleri

- [RESMÎ] Google — How Google Search works — <https://developers.google.com/search/docs/fundamentals/how-search-works>
- [RESMÎ] Google — Google Search Essentials — <https://developers.google.com/search/docs/essentials>
- [RESMÎ] Google — Google Search technical requirements — <https://developers.google.com/search/docs/essentials/technical>
- [RESMÎ] Google — Spam policies for Google web search — <https://developers.google.com/search/docs/essentials/spam-policies>
- [RESMÎ] Google — A guide to Google Search ranking systems — <https://developers.google.com/search/docs/appearance/ranking-systems-guide>
- [RESMÎ] Google — Creating helpful, reliable, people-first content — <https://developers.google.com/search/docs/fundamentals/creating-helpful-content>
- [RESMÎ] Google — Using generative AI content — <https://developers.google.com/search/docs/fundamentals/using-gen-ai-content>
- [RESMÎ] Google — SEO Starter Guide — <https://developers.google.com/search/docs/fundamentals/seo-starter-guide>
- [RESMÎ] Google — Do you need an SEO? — <https://developers.google.com/search/docs/fundamentals/do-i-need-seo>
- [RESMÎ] Google — Get started with Search: a developer's guide — <https://developers.google.com/search/docs/fundamentals/get-started>
- [RESMÎ] Google — AI features and your website — <https://developers.google.com/search/docs/appearance/ai-features>
- [RESMÎ] Google — Optimizing for generative AI search (15 May 2026) — <https://developers.google.com/search/docs/fundamentals/ai-optimization-guide>
- [RESMÎ] Google — Understanding page experience in Google Search results — <https://developers.google.com/search/docs/appearance/page-experience>
- [RESMÎ] Google — Avoid intrusive interstitials and dialogs — <https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials>
- [RESMÎ] Google — Mobile-first indexing best practices — <https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing>
- [RESMÎ] Google — Introduction to robots.txt — <https://developers.google.com/search/docs/crawling-indexing/robots/intro>
- [RESMÎ] Google — How Google interprets the robots.txt specification — <https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt>
- [RESMÎ] Google — Block Search indexing with noindex — <https://developers.google.com/search/docs/crawling-indexing/block-indexing>
- [RESMÎ] Google — Robots meta tag, data-nosnippet, and X-Robots-Tag — <https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag>
- [RESMÎ] Google — Meta tags and attributes that Google supports — <https://developers.google.com/search/docs/crawling-indexing/special-tags>
- [RESMÎ] Google — How HTTP status codes, and network and DNS errors affect Google Search — <https://developers.google.com/search/docs/crawling-indexing/http-network-errors>
- [RESMÎ] Google — Redirects and Google Search — <https://developers.google.com/search/docs/crawling-indexing/301-redirects>
- [RESMÎ] Google — How to specify a canonical URL — <https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls>
- [RESMÎ] Google — What is URL canonicalization — <https://developers.google.com/search/docs/crawling-indexing/canonicalization>
- [RESMÎ] Google — Crawl budget management for large sites — <https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget>
- [RESMÎ] Google — URL structure best practices — <https://developers.google.com/search/docs/crawling-indexing/url-structure>
- [RESMÎ] Google — Pagination and incremental page loading — <https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading>
- [RESMÎ] Google — Localized versions of your pages (hreflang) — <https://developers.google.com/search/docs/specialty/international/localized-versions>
- [RESMÎ] Google — Managing multi-regional and multilingual sites — <https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites>
- [RESMÎ] Google — Site moves with URL changes — <https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes>
- [RESMÎ] Google — Build and submit a sitemap — <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>
- [RESMÎ] Google — Image sitemaps — <https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps>
- [RESMÎ] Google — Googlebot — <https://developers.google.com/search/docs/crawling-indexing/googlebot>
- [RESMÎ] Google — Overview of Google crawlers and fetchers — <https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers> · <https://developers.google.com/crawling/docs/crawlers-fetchers/overview-google-crawlers>
- [RESMÎ] Google — Google common crawlers (Google-Extended) — <https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers>
- [RESMÎ] Google — Understand JavaScript SEO basics — <https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics>
- [RESMÎ] Google — Fix Search-related JavaScript problems — <https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript>
- [RESMÎ] Google — Dynamic rendering as a workaround — <https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering>
- [RESMÎ] Google — Fix lazy-loaded content — <https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading>
- [RESMÎ] Google — Link best practices for Google — <https://developers.google.com/search/docs/crawling-indexing/links-crawlable>
- [RESMÎ] Google — Qualify your outbound links — <https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links>
- [RESMÎ] Google — Influencing your title links in search results — <https://developers.google.com/search/docs/appearance/title-link>
- [RESMÎ] Google — Control your snippets in search results — <https://developers.google.com/search/docs/appearance/snippet>
- [RESMÎ] Google — Google Images SEO best practices — <https://developers.google.com/search/docs/appearance/google-images>
- [RESMÎ] Google — Video SEO best practices — <https://developers.google.com/search/docs/appearance/video>
- [RESMÎ] Google — Influencing byline dates in Google Search — <https://developers.google.com/search/docs/appearance/publication-dates>
- [RESMÎ] Google — Provide a site name to Google Search — <https://developers.google.com/search/docs/appearance/site-names>
- [RESMÎ] Google — Define a favicon to show in search results — <https://developers.google.com/search/docs/appearance/favicon-in-search>
- [RESMÎ] Google — General structured data guidelines — <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>
- [RESMÎ] Google — Introduction to structured data — <https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data>
- [RESMÎ] Google — Organization structured data — <https://developers.google.com/search/docs/appearance/structured-data/organization>
- [RESMÎ] Google — Local Business structured data — <https://developers.google.com/search/docs/appearance/structured-data/local-business>
- [RESMÎ] Google — Software App structured data — <https://developers.google.com/search/docs/appearance/structured-data/software-app>
- [RESMÎ] Google — Review snippet structured data — <https://developers.google.com/search/docs/appearance/structured-data/review-snippet>
- [RESMÎ] Google — Breadcrumb structured data — <https://developers.google.com/search/docs/appearance/structured-data/breadcrumb>
- [RESMÎ] Google — Preventing and monitoring abuse on your site — <https://developers.google.com/search/docs/monitor-debug/security>
- [RESMÎ] Google — site: search operator — <https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site>
- [RESMÎ] Google — Indexing API quickstart — <https://developers.google.com/search/apis/indexing-api/v3/quickstart>
- [RESMÎ] Google — Google Search's core updates — <https://developers.google.com/search/updates/core-updates>
- [RESMÎ] Google — Latest Google Search documentation updates — <https://developers.google.com/search/updates>

### Google Search Central Blog (tarih sırasıyla)

- [RESMÎ] Google — To slash or not to slash (Nis 2010) — <https://developers.google.com/search/blog/2010/04/to-slash-or-not-to-slash>
- [RESMÎ] Google — HTTPS as a ranking signal (Ağu 2014) — <https://developers.google.com/search/blog/2014/08/https-as-ranking-signal>
- [RESMÎ] Google — A note on unsupported rules in robots.txt (Tem 2019) — <https://developers.google.com/search/blog/2019/07/a-note-on-unsupported-rules-in-robotstxt>
- [RESMÎ] Google — Evolving "nofollow" (10 Eyl 2019) — <https://developers.google.com/search/blog/2019/09/evolving-nofollow-new-ways-to-identify>
- [RESMÎ] Google — The new HTTPS report in Search Console (Eyl 2022) — <https://developers.google.com/search/blog/2022/09/https-search-console-report>
- [RESMÎ] Google — Google Search's guidance about AI-generated content (8 Şub 2023) — <https://developers.google.com/search/blog/2023/02/google-search-and-ai-content>
- [RESMÎ] Google — Sitemaps ping endpoint is going away (26 Haz 2023) — <https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping>
- [RESMÎ] Google — Changes to HowTo and FAQ rich results (8 Ağu 2023) — <https://developers.google.com/search/blog/2023/08/howto-faq-changes>
- [RESMÎ] Google — Mobile-first indexing has landed (31 Eki 2023) — <https://developers.google.com/search/blog/2023/10/mobile-first-is-here>
- [RESMÎ] Google — Upcoming deprecation of Crawl Rate Limiter Tool (Kas 2023) — <https://developers.google.com/search/blog/2023/11/sc-crawl-limiter-byebye>
- [RESMÎ] Google — March 2024 core update and new spam policies — <https://developers.google.com/search/blog/2024/03/core-update-spam-policies>
- [RESMÎ] Google — Farewell, Sitelinks Search Box (21 Eki 2024) — <https://developers.google.com/search/blog/2024/10/sitelinks-search-box>
- [RESMÎ] Google — Updating our site reputation abuse policy (19 Kas 2024) — <https://developers.google.com/search/blog/2024/11/site-reputation-abuse>
- [RESMÎ] Google — Top ways to ensure your content performs well in Google's AI experiences (21 May 2025) — <https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search>
- [RESMÎ] Google — Simplifying the search results page (12 Haz 2025) — <https://developers.google.com/search/blog/2025/06/simplifying-search-results>
- [RESMÎ] Google — Introducing a new spam policy for "back button hijacking" (13 Nis 2026) — <https://developers.google.com/search/blog/2026/04/back-button-hijacking>
- [RESMÎ] Google — Search Generative AI performance reports (3 Haz 2026; gövde metni okunamadı) — <https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports>
- [RESMÎ] Google — Update to the Site Reputation Policy (28 Ağu 2026) — <https://developers.google.com/search/blog/2026/08/update-site-reputation-policy>

### Google yardım sayfaları ve diğer Google kaynakları

- [RESMÎ] Google — Search Status Dashboard — sıralama olayları geçmişi — <https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history>
- [RESMÎ] Google — How Search Works — Our approach — <https://www.google.com/search/howsearchworks/our-approach/>
- [RESMÎ] Search Console Yardım — Core Web Vitals report — <https://support.google.com/webmasters/answer/9205520>
- [RESMÎ] Search Console Yardım — Page indexing report — <https://support.google.com/webmasters/answer/7440203>
- [RESMÎ] Search Console Yardım — 404 (Page Not Found) errors — <https://support.google.com/webmasters/answer/2445990>
- [RESMÎ] Search Console Yardım — Removals tool — <https://support.google.com/webmasters/answer/9689846>
- [RESMÎ] Search Console Yardım — Change of Address tool — <https://support.google.com/webmasters/answer/9370220>
- [RESMÎ] Search Console Yardım — robots.txt report — <https://support.google.com/webmasters/answer/6062598>
- [RESMÎ] Search Console Yardım — Disavow links to your site — <https://support.google.com/webmasters/answer/2648487>
- [RESMÎ] Search Console Yardım — Manual Actions report — <https://support.google.com/webmasters/answer/9044175>
- [RESMÎ] Search Console Yardım — The International Targeting report is deprecated — <https://support.google.com/webmasters/answer/12474899>
- [RESMÎ] İşletme Profili Yardım — Tips to improve your local ranking — <https://support.google.com/business/answer/7091>
- [RESMÎ] İşletme Profili Yardım — Guidelines for representing your business on Google — <https://support.google.com/business/answer/3038177>
- [RESMÎ] İşletme Profili Yardım — Service area management — <https://support.google.com/business/answer/9157481>
- [RESMÎ] İşletme Profili Yardım — Categories — <https://support.google.com/business/answer/3370250>
- [RESMÎ] İşletme Profili Yardım — Verification methods — <https://support.google.com/business/answer/7107242>
- [RESMÎ] İşletme Profili Yardım — Video verification — <https://support.google.com/business/answer/14271705>
- [RESMÎ] İşletme Profili Yardım — Read and reply to reviews — <https://support.google.com/business/answer/3474122>
- [RESMÎ] İşletme Profili Yardım — Performance / call metrics — <https://support.google.com/business/answer/7689763>
- [RESMÎ] Google Haritalar — User contributed content policy — prohibited content — <https://support.google.com/contributionpolicy/answer/7400114>
- [RESMÎ] Google Ads Yardım — Paid and organic report — <https://support.google.com/google-ads/answer/3097241>
- [RESMÎ] Google Ads Yardım — Quality Score — <https://support.google.com/google-ads/answer/6167118>
- [RESMÎ] Google Ads Yardım — Ad Rank — <https://support.google.com/google-ads/answer/1722122>
- [RESMÎ] Google Ads Yardım — Location assets — <https://support.google.com/google-ads/answer/7189290>
- [RESMÎ] Google Ads Politikaları — Destination requirements — <https://support.google.com/adspolicy/answer/6368661>
- [RESMÎ] Google Arama Yardım — AI Mode — <https://support.google.com/websearch/answer/16011537>
- [RESMÎ] Google — Rich Results Test — <https://search.google.com/test/rich-results>
- [RESMÎ] Google — PageSpeed Insights — <https://pagespeed.web.dev>

### web.dev ve Chrome for Developers

- [RESMÎ] web.dev — Web Vitals — <https://web.dev/articles/vitals>
- [RESMÎ] web.dev — Interaction to Next Paint (INP) — <https://web.dev/articles/inp>
- [RESMÎ] web.dev — INP is officially a Core Web Vital — <https://web.dev/blog/inp-cwv-launch>
- [RESMÎ] web.dev — Optimize Largest Contentful Paint — <https://web.dev/articles/optimize-lcp>
- [RESMÎ] web.dev — Optimize Cumulative Layout Shift — <https://web.dev/articles/optimize-cls>
- [RESMÎ] web.dev — Optimize Interaction to Next Paint — <https://web.dev/articles/optimize-inp>
- [RESMÎ] web.dev — Time to First Byte (TTFB) — <https://web.dev/articles/ttfb>
- [RESMÎ] web.dev — Best practices for fonts — <https://web.dev/articles/font-best-practices>
- [RESMÎ] web.dev — Rendering on the Web — <https://web.dev/articles/rendering-on-the-web>
- [RESMÎ] web.dev — Fix the Japanese keyword hack — <https://web.dev/articles/fix-the-japanese-keyword-hack>
- [RESMÎ] Chrome for Developers — CrUX methodology — <https://developer.chrome.com/docs/crux/methodology>
- [RESMÎ] Chrome for Developers — Lighthouse performance scoring — <https://developer.chrome.com/docs/lighthouse/performance/performance-scoring>

### Diğer resmî kaynaklar: Bing, Yandex, IndexNow, yapay zekâ şirketleri, standartlar

- [RESMÎ] Bing Webmaster Blog — Keeping Content Discoverable with Sitemaps in AI Powered Search (Tem 2025) — <https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search>
- [RESMÎ] Bing Webmaster Blog — Import sites from Search Console to Bing Webmaster Tools (Eyl 2019) — <https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools>
- [RESMÎ] Bing Webmaster Blog — bingbot Series: JavaScript, Dynamic Rendering, and Cloaking (Eki 2018; arama özeti üzerinden) — <https://blogs.bing.com/webmaster/october-2018/bingbot-Series-JavaScript,-Dynamic-Rendering,-and-Cloaking-Oh-My>
- [RESMÎ] Bing Webmaster Blog — Looking for Input on Crawl-Delay (Eki 2010) — <https://blogs.bing.com/webmaster/October-2010/Looking-for-Input-on-Crawl-Delay>
- [RESMÎ] Bing — IndexNow — Get started — <https://www.bing.com/indexnow/getstarted>
- [RESMÎ] IndexNow — Documentation · FAQ — <https://www.indexnow.org/documentation> · <https://www.indexnow.org/faq>
- [RESMÎ] Yandex Webmaster — robots.txt (İngilizce ve Türkçe) — <https://yandex.com/support/webmaster/en/controlling-robot/robots-txt> · <https://yandex.com/support/webmaster/tr/adding-site/indexing-prohibition>
- [RESMÎ] Yandex Webmaster — IndexNow desteği — <https://yandex.com/support/webmaster/en/indexing-options/index-now>
- [RESMÎ] Yandex Webmaster — Sitenin arama sıralamasını nasıl iyileştirebilirim? — <https://yandex.com.tr/support/webmaster/tr/yandex-indexing/rank>
- [RESMÎ] Yandex Webmaster — Site region — <https://yandex.com.tr/support/webmaster/en/site-geography/site-region>
- [RESMÎ] Yandex Business — Şirket ekleme — <https://yandex.com.tr/support/business-priority/>
- [RESMÎ] DuckDuckGo — Results sources — <https://duckduckgo.com/duckduckgo-help-pages/results/sources>
- [RESMÎ] OpenAI — Crawlers (OAI-SearchBot, GPTBot, ChatGPT-User) — <https://developers.openai.com/api/docs/bots>
- [RESMÎ] Anthropic — Claude'un web tarayıcıları — <https://support.claude.com/en/articles/8896518>
- [RESMÎ] Perplexity — Perplexity Crawlers (tam metin okunamadı) — <https://docs.perplexity.ai/docs/resources/perplexity-crawlers>
- [RESMÎ] Apple — About Applebot — <https://support.apple.com/en-us/119829>
- [RESMÎ] Apple — Apple Business hizmetleri ve ülkeler · Introducing Apple Business (Mar 2026) — <https://support.apple.com/en-nz/126603> · <https://www.apple.com/mx/newsroom/2026/03/introducing-apple-business/>
- [RESMÎ] IETF — RFC 9309 — Robots Exclusion Protocol — <https://www.rfc-editor.org/rfc/rfc9309.html>
- [RESMÎ] Open Graph — The Open Graph protocol — <https://ogp.me/>
- [RESMÎ] schema.org — Schema Markup Validator — <https://validator.schema.org>
- [RESMÎ] X — Cards markup (resmî sayfa erişime kapalıydı) — <https://developer.x.com/cards/markup>

### Üçüncü taraf eğitimler, ölçümler ve haberler

- [3. TARAF] Ahrefs — SEO basics — <https://ahrefs.com/blog/seo-basics/>
- [3. TARAF] Ahrefs — Robots.txt rehberi — <https://ahrefs.com/blog/robots-txt/>
- [3. TARAF] Ahrefs — On-Page SEO guide — <https://ahrefs.com/blog/on-page-seo/>
- [3. TARAF] Ahrefs — How Often Does Google Rewrite Meta Descriptions? (2020) — <https://ahrefs.com/blog/meta-description-study/>
- [3. TARAF] Ahrefs — Keyword Research guide — <https://ahrefs.com/blog/keyword-research/>
- [3. TARAF] Ahrefs — Core Web Vitals (Oca 2025) — <https://ahrefs.com/blog/core-web-vitals/>
- [3. TARAF] Ahrefs — Local SEO rehberi — <https://ahrefs.com/blog/local-seo/>
- [3. TARAF] Ahrefs — How Long Does It Take to Rank in Google? (15 May 2025) — <https://ahrefs.com/blog/how-long-does-it-take-to-rank/>
- [3. TARAF] Ahrefs — Google Sandbox — <https://ahrefs.com/blog/google-sandbox/>
- [3. TARAF] Ahrefs — AI Overviews reduce clicks (güncelleme) — <https://ahrefs.com/blog/ai-overviews-reduce-clicks-update>
- [3. TARAF] Ahrefs — Ahrefs Webmaster Tools — <https://ahrefs.com/webmaster-tools>
- [3. TARAF] Backlinko — Google's 200 ranking factors — <https://backlinko.com/google-ranking-factors>
- [3. TARAF] Backlinko — On-Page SEO: The Definitive Guide (15 Eki 2026) — <https://backlinko.com/on-page-seo>
- [3. TARAF] Backlinko — Core Web Vitals (Nis 2025) — <https://backlinko.com/hub/seo/core-web-vitals>
- [3. TARAF] Backlinko — Link Building (15 Eki 2026) — <https://backlinko.com/link-building>
- [3. TARAF] Semrush — 12 of the Biggest SEO Myths — <https://www.semrush.com/blog/seo-myths/>
- [3. TARAF] Semrush — Search Intent (21 Kas 2024) — <https://www.semrush.com/blog/search-intent/>
- [3. TARAF] Semrush — JavaScript rendering for SEO (May 2024) — <https://www.semrush.com/blog/js-rendering/>
- [3. TARAF] Semrush — Core Web Vitals (arama özeti üzerinden) — <https://www.semrush.com/blog/core-web-vitals/>
- [3. TARAF] Yoast — How to use headings on your site (11 Ara 2025) — <https://yoast.com/how-to-use-headings-on-your-site/>
- [3. TARAF] Search Engine Land — Google says normal SEO works for AI Overviews, llms.txt won't be used — <https://searchengineland.com/google-says-normal-seo-works-for-ranking-in-ai-overviews-and-llms-txt-wont-be-used-459422>
- [3. TARAF] Search Engine Land — Google quality raters & AI-generated content — <https://searchengineland.com/google-quality-raters-content-ai-generated-454161>
- [3. TARAF] Search Engine Land — March 2024 core update rollout is now complete — <https://searchengineland.com/google-march-2024-core-update-rollout-is-now-complete-438713>
- [3. TARAF] Search Engine Land — Google Search completely kills the cache feature — <https://searchengineland.com/google-search-completely-kills-the-cache-feature-446904>
- [3. TARAF] Search Engine Land — Googlebot crawl rate tool is now gone — <https://searchengineland.com/googlebot-crawl-rate-tool-is-now-gone-436382>
- [3. TARAF] Search Engine Land — Google's URL Parameters tool is going away — <https://searchengineland.com/googles-url-parameters-tool-is-going-away-383220>
- [3. TARAF] Search Engine Land — Search Console adds robots.txt report — <https://searchengineland.com/google-search-console-adds-robots-txt-report-434708>
- [3. TARAF] Search Engine Land — Google no longer supports rel=next/prev — <https://searchengineland.com/google-no-longer-supports-relnext-prev-314319>
- [3. TARAF] Search Engine Land — Website migration checks — <https://searchengineland.com/website-migration-checks-472260>
- [3. TARAF] Search Engine Land — New crawl stats report (Kas 2020) — <https://searchengineland.com/google-launches-new-crawl-stats-report-in-search-console-344113>
- [3. TARAF] Search Engine Land — Google changed 76% of title tags in Q1 2025 — <https://searchengineland.com/google-changed-76-of-title-tags-in-q1-2025-heres-what-that-means-454847>
- [3. TARAF] Search Engine Land — The Meta Keywords Tag Lives At Bing — <https://searchengineland.com/the-meta-keywords-tag-lives-at-bing-why-only-spammers-should-use-it-96874>
- [3. TARAF] Search Engine Land — Google won't index sites that do not work on mobile after July 5 — <https://searchengineland.com/google-wont-index-sites-that-do-not-work-on-mobile-devices-after-july-5th-442851>
- [3. TARAF] Search Engine Land — Google officially drops Mobile Usability report and Mobile-Friendly Test — <https://searchengineland.com/google-officially-drops-mobile-usability-report-mobile-friendly-test-tool-and-mobile-friendly-test-api-435377>
- [3. TARAF] Search Engine Land — Links are not a top 3 ranking factor (Illyes) — <https://searchengineland.com/links-google-search-ranking-factor-gary-illyes-432422>
- [3. TARAF] Search Engine Land — Toxic links and disavows — <https://searchengineland.com/toxic-links-disavows-seo-383324>
- [3. TARAF] Search Engine Land — Bing updates its Webmaster Guidelines — <https://searchengineland.com/bing-updates-its-webmaster-guidelines-336915>
- [3. TARAF] Search Engine Land — Business Profile chat and call history going away — <https://searchengineland.com/google-business-profile-chat-and-call-history-going-away-442666>
- [3. TARAF] Search Engine Land — Business Profile performance insights — <https://searchengineland.com/google-business-profile-performance-insights-what-you-need-to-know-436468>
- [3. TARAF] Search Engine Land — Local Services Ads in Europe — <https://searchengineland.com/?p=341284>
- [3. TARAF] Search Engine Journal — Google drops FAQ rich results (10 May 2026) — <https://www.searchenginejournal.com/google-drops-faq-rich-results/574429/>
- [3. TARAF] Search Engine Journal — Google 404 status (Mueller) — <https://www.searchenginejournal.com/google-404-status/254429/>
- [3. TARAF] Search Engine Journal — Bing recommends lastmod tags for AI search indexing — <https://www.searchenginejournal.com/bing-recommends-lastmod-tags-for-ai-search-indexing/552642/>
- [3. TARAF] Search Engine Journal — Mueller: WordPress not inherently better for SEO (Ara 2022) — <https://www.searchenginejournal.com/googles-john-mueller-wordpress-not-inherently-better-for-seo/474737/>
- [3. TARAF] Search Engine Journal — Google treats subdomains and subdirectories the same — <https://www.searchenginejournal.com/google-treats-subdomains-subdirectories-john-mueller-says/254687/>
- [3. TARAF] Search Engine Journal — EMD update (algoritma tarihi) — <https://www.searchenginejournal.com/google-algorithm-history/emd-update/>
- [3. TARAF] Search Engine Journal — Domain name as a ranking factor — <https://www.searchenginejournal.com/ranking-factors/domain-name/>
- [3. TARAF] Search Engine Journal — IP address as a ranking factor — <https://www.searchenginejournal.com/ranking-factors/ip-address/>
- [3. TARAF] Search Engine Journal — Does using a CDN improve ranking? — <https://www.searchenginejournal.com/does-using-a-cdn-improve-ranking/453995/>
- [3. TARAF] Search Engine Journal — Google: accessibility not a direct ranking factor — <https://www.searchenginejournal.com/google-accessibility-not-a-direct-ranking-factor/443784/>
- [3. TARAF] Search Engine Journal — Report that Cloudflare AI bot blocking prevents Googlebot from indexing sites (4 Ağu 2026) — <https://www.searchenginejournal.com/report-that-cloudflare-ai-bot-blocking-prevents-googlebot-from-indexing-sites>
- [3. TARAF] Search Engine Journal — Disavow tool doesn't work with Domain properties — <https://www.searchenginejournal.com/googles-disavow-tool-doesnt-work-with-search-console-domain-properties/309703/>
- [3. TARAF] Search Engine Roundtable — Google: No AI system currently uses llms.txt — <https://seroundtable.com/google-ai-llms-txt-39607.html>
- [3. TARAF] Search Engine Roundtable — Google: Don't worry about bounce rate for SEO — <https://seroundtable.com/google-bounce-rate-seo-31124.html>
- [3. TARAF] Search Engine Roundtable — Site reputation abuse manual actions in EEA (Ağu 2026) — <https://www.seroundtable.com/google-site-reputation-abuse-eea-41968.html>
- [3. TARAF] Search Engine Roundtable — 404 vs 410 (Mueller, 2018) — <https://seroundtable.com/404-410-google-15225.html>
- [3. TARAF] Search Engine Roundtable — Google: We Don't Have A Concept Of Toxic Domains — <https://seroundtable.com/google-toxic-domains-30056.html>
- [3. TARAF] PPC Land — Google's AI summaries now swallow 58% of clicks — <https://ppc.land/googles-ai-summaries-now-swallow-58-of-clicks-that-once-went-to-websites/>
- [3. TARAF] PPC Land — Googlebot rulebook: 2 MB limits (Şub 2026) — <https://ppc.land/google-rewrites-googlebots-rulebook-2mb-limits-ip-moves-and-what-crawlers-really-are/>
- [3. TARAF] PPC Land — Cloudflare drops planned Googlebot block (27 Eyl 2026) — <https://ppc.land/cloudflare-drops-planned-googlebot-block-for-sites-refusing-ai-training/>
- [3. TARAF] PPC Land — March 2026 spam update · June 2026 spam update — <https://ppc.land/googles-march-2026-spam-update-is-live-what-changed-and-why-it-matters/> · <https://ppc.land/googles-june-2026-spam-update-is-live-what-it-hits-and-why-it-matters/>
- [3. TARAF] PPC Land — Google quietly kills Q&A for an AI button — <https://ppc.land/google-quietly-kills-q-a-for-an-ai-button-most-wont-use/>
- [3. TARAF] Whitespark — Local Search Ranking Factors 2026 — <https://whitespark.ca/local-search-ranking-factors/>
- [3. TARAF] Whitespark — GBP spam fighting 101 — <https://whitespark.ca/google-business-profile-guide/gbp-spam-fighting-101/>
- [3. TARAF] BrightLocal — Local Consumer Review Survey 2026 — <https://www.brightlocal.com/research/local-consumer-review-survey/>
- [3. TARAF] BrightLocal — New policies on shady review schemes — <https://www.brightlocal.com/blog/new-policies-shady-review-schemes/>
- [3. TARAF] BrightLocal — Google Business Profile Q&A — <https://www.brightlocal.com/learn/google-business-profile-qa>
- [3. TARAF] BrightLocal — GBP suspension and reinstatement (2022) — <https://www.brightlocal.com/learn/google-business-profile-suspension/>
- [3. TARAF] Sterling Sky — Review jail for fake 5-star Google reviews — <https://www.sterlingsky.ca/review-jail-for-fake-5-star-google-reviews/>
- [3. TARAF] Astute — Why was my Google Business Profile suspended — <https://astute.co/resource/why-was-my-google-business-profile-suspended-how-to-appeal/>
- [3. TARAF] Fruition — How to manage Google My Business spam — <https://fruition.net/blog/how-to-manage-google-my-business-spam>
- [3. TARAF] Bill Hartzer · TechRadar — business.site kapanışı — <https://www.billhartzer.com/local-search/google-shutting-down-business-site-websites/> · <https://www.techradar.com/pro/google-is-shutting-down-websites-made-with-business-profiles>
- [3. TARAF] TechRadar — Wix or WordPress: Google SEO expert weighs in — <https://www.techradar.com/news/wix-or-wordpress-google-seo-expert-weighs-in-on-website-builder-battle>
- [3. TARAF] Intercom SEO Help · Local Visibility System — "Near me" optimizasyonu — <https://intercom.help/seo-help/en/articles/8287822-should-i-optimize-for-near-me-keywords> · <https://www.localvisibilitysystem.com/2018/01/29/how-to-rank-for-near-me-local-search-terms/>
- [3. TARAF] Piranha Digital — Google: SEO results take 4 months to a year (2017 videosu) — <https://piranha-solutions.com/google-seo-results-take-4-months-year/>
- [3. TARAF] ZEO — Google AI Mode and AI Overview finally live in Türkiye — <https://zeo.org/resources/blog/google-ai-mode-and-ai-overview-finally-live-in-turkiye>
- [3. TARAF] ZEO — The impact of &num=100 parameter removal on SEO reporting — <https://zeo.org/resources/blog/the-impact-of-num-100-parameter-removal-on-seo-reporting>
- [3. TARAF] Marie Haynes — Google quality raters now rate AI Overviews — <https://www.mariehaynes.com/google-quality-raters-now-rate-ai-overviews/>
- [3. TARAF] Brafton — Google's March 2026 core update has finished rolling out — <https://www.brafton.com.au/blog/seo/googles-march-2026-core-update-has-finished-rolling-out/>
- [3. TARAF] Seer Interactive — Forbes cites Seer research on AI Overviews — <https://www.seerinteractive.com/news/forbes-cites-seer-interactive-research-on-ai-overviews>
- [3. TARAF] Whole Whale — Pew Research ve AI Overviews · Bing AI analytics — <https://wholewhale.com/resources/googles-gaslighting-pew-research-confirms-what-seos-already-know-about-ai-overviews/> · <https://wholewhale.com/resources/bing-webmaster-analytics-for-ai-search-is-sobering/>
- [3. TARAF] Search Influence — Bing AI Performance Report — <https://www.searchinfluence.com/blog/bing-ai-performance-report-copilot-citations/>
- [3. TARAF] eSEOspace — Bing Webmaster Tools and IndexNow for AI search — <https://eseospace.com/blog/bing-webmaster-tools-indexnow-ai-search/>
- [3. TARAF] SE Ranking — Navboost: what the docs tell us — <https://seranking.com/blog/navboost/>
- [3. TARAF] JC Chouinard — Google DOJ trial documents — <https://www.jcchouinard.com/google-doj-trial-documents/>
- [3. TARAF] Dejan Marketing — SEO myth busted: bounce to results — <https://dejanmarketing.com/seo-myth-busted-bounce-to-results-is-a-negative-signal/>
- [3. TARAF] Practical Ecommerce — Domain age and other SEO myths · SEO checklist for redesigns — <https://www.practicalecommerce.com/domain-age-impacts-rankings-and-8-other-seo-myths> · <https://www.practicalecommerce.com/seo-checklist-for-website-redesigns-and-replatforms>
- [3. TARAF] SearchFacts — URL trailing slash — <https://searchfacts.com/url-trailing-slash/>
- [3. TARAF] DebugBear — Googlebot crawler file size limit — <https://www.debugbear.com/blog/googlebot-crawler-file-size-limit>
- [3. TARAF] Vercel / MERJ — How Google handles JavaScript throughout the indexing process (Nis 2024) — <https://vercel.com/blog/how-google-handles-javascript-throughout-the-indexing-process>
- [3. TARAF] Vercel — The rise of the AI crawler (Ara 2024) — <https://vercel.com/blog/the-rise-of-the-ai-crawler>
- [3. TARAF] Conductor · HubSpot — Topic clusters and pillar pages — <https://www.conductor.com/academy/topic-clusters> · <https://blog.hubspot.com/marketing/topic-clusters-seo>
- [3. TARAF] Infidigit — Alt text does not impact web search rankings (Mar 2022) — <https://www.infidigit.com/news/alt-text-does-not-impact-web-search-rankings-says-google/>
- [3. TARAF] MIT Technology Review — Cloudflare will now block AI bots by default (1 Tem 2025) — <https://www.technologyreview.com/2025/07/01/1119498/cloudflare-will-now-by-default-block-ai-bots-from-crawling-its-clients-websites/>
- [3. TARAF] TechWyse — Google AI Search Optimization Guide + Lighthouse llms.txt · FAQ rich results deprecated — <https://www.techwyse.com/news/ai-search/google-ai-search-optimization-guide-llms-txt-lighthouse-audit> · <https://www.techwyse.com/news/ai-search/google-faq-rich-results-deprecated-2026>
- [3. TARAF] The SEO Framework — Twitter Cards and X sharing — <https://kb.theseoframework.com/kb/twitter-cards-and-x-sharing/>
- [3. TARAF] Screaming Frog — SEO Spider pricing — <https://www.screamingfrog.co.uk/seo-spider/pricing/>
- [3. TARAF] StatCounter — Search engine market share — Turkey (tüm cihazlar · mobil) — <https://gs.statcounter.com/search-engine-market-share/all/turkey> · <https://gs.statcounter.com/search-engine-market-share/mobile/turkey>
- [3. TARAF] Scalefusion — Apple Business: everything you need to know — <https://blog.scalefusion.com/apple-business-everything-you-need-to-know/>

### Türkçe kaynaklar

- [3. TARAF] Techsy — SEO Rehberi 2026 (satış amaçlı; rakamların çoğu kaynaksız, yalnız püf noktası taraması için) — <https://techsy.io/tr/blog/seo-rehberi-2026>
- [3. TARAF] İdeaSoft — Başlık etiketleri (H1–H6) rehberi (27 Oca 2026) — <https://www.ideasoft.com.tr/baslik-ve-baslik-etiketlerinin-kullanimlari/>
- [3. TARAF] Hostragons — Site içi SEO kriterleri: başlık, meta açıklaması, alt etiketleri — <https://www.hostragons.com/blog/site-ici-on-page-seo-kriterleri-baslik-meta-aciklamasi-alt-etiketleri/>
- [3. TARAF] Ticimax — Nofollow ve noindex nedir — <https://www.ticimax.com/blog/nofollow-ve-noindex-nedir>
- [3. TARAF] Sitechecker — robots.txt yapılandırma — <https://sitechecker.pro/tr/configure-robots-txt/>
- [3. TARAF] Zeo — Google'ın site hızındaki karar ölçeği: Core Web Vitals (Ara 2021; FID kısmı eskimiş) — <https://zeo.org/tr/kaynaklar/blog/googlein-site-hizindaki-karar-olcegi-core-web-vitals>
- [3. TARAF] Natro — Core Web Vitals (CWV) nedir? (arama özeti üzerinden) — <https://www.natro.com/blog/core-web-vitals-cwv-nedir-sayfa-performansi-nasil-iyilestirilir/>
- [3. TARAF] Bravery Technology — Yerel SEO Rehberi 2026 — <https://braverytechnology.com/tr/yerel-seo-rehberi/>
- [3. TARAF] Webtekno — Kasım 2025 en çok kullanılan arama motorları — <https://www.webtekno.com/kasim-2025-en-cok-kullanilan-arama-motorlari-h206443>
- [3. TARAF] Dünya · Takvim · Ekonomist — Ticaret Bakanlığı sahte yorum ve yanıltıcı reklam yaptırımları (haber; Resmî Gazete metni ayrıca doğrulanmalı) — <https://www.dunya.com/ekonomi/ticaret-bakanligi-acikladi-sahte-yorumlara-yaptirim-uygulanacak-haberi-842114> · <https://www.takvim.com.tr/guncel/2026/07/27/aldatici-reklamlarla-mucadelede-yeni-donem> · <https://www.ekonomist.com.tr/gundem/sahte-isletme-adi-engellenen-yorum-yaniltici-gorsel-ticaret-bakanligindan-yaniltici-reklamlara-milyonluk-ceza-77925>

### 6 Kasım 2026 güncellemesinde eklenenler

Numaralar `20-sozluk-ve-kaynakca.html` birleşik kaynakçasındakilerle aynıdır.

249. [RESMÎ] web.dev — Chrome ends support for First Input Delay (10 Eyl 2024) — <https://web.dev/blog/fid>
250. [RESMÎ] Chrome for Developers — CrUX release notes (10 Eyl 2024 ve 8 Eki 2024 notları) — <https://developer.chrome.com/docs/crux/release-notes>
251. [RESMÎ] Chrome for Developers — CrUX tools (güncelleme 9 Eyl 2025) — <https://developer.chrome.com/docs/crux/methodology/tools>
252. [RESMÎ] Google for Developers — About PageSpeed Insights · runPagespeed referansı (origin'e geri düşme, `origin_fallback`) — <https://developers.google.com/speed/docs/insights/v5/about> · <https://developers.google.com/speed/docs/insights/rest/v5/pagespeedapi/runpagespeed>
253. [RESMÎ] Chrome for Developers — How to use the CrUX API (veri yoksa 404) — <https://developer.chrome.com/docs/crux/guides/crux-api>
254. [RESMÎ] IndexNow — Ana sayfa (destekleyen motorlar) — <https://www.indexnow.org/>
255. [RESMÎ] IndexNow — searchengines.json, Internet Archive meta.json ve Documentation for search engines (`unsubscribe` alanı, log dosyaları) — <https://www.indexnow.org/searchengines.json> · <https://web-static.archive.org/indexnow/meta.json> · <https://www.indexnow.org/searchengines>
256. [RESMÎ] Yandex Webmaster — IndexNow API request reference (yanıt kodları) — <https://yandex.com/support/webmaster/en/indexnow/reference>
257. [RESMÎ] Search Console Yardım — URL Denetimi aracı — <https://support.google.com/webmasters/answer/9012289>
258. [RESMÎ] Search Console Yardım — Mülk sahiplerini, kullanıcıları ve izinleri yönetme — <https://support.google.com/webmasters/answer/7687615>
