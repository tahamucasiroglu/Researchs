# Türkiye Haber Kaynakları API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: kısıtlı (ajanslarda yalnızca abonelikle API var; sitelerin çoğunda yalnızca RSS var; herkese açık resmî bir "haber API'si" yok)

## Özet

Türkiye'de haber içeriğine programla erişmenin üç yolu var. (1) **Haber ajansları** (AA, DHA, İHA) içeriklerini yalnızca **ücretli abonelik sözleşmesiyle** kurumlara satar. AA'nın abonelere özel bir REST API'si (`api.aa.com.tr`) vardır; DHA ve İHA ise başvuru/abone portalı üzerinden çalışır, herkese açık bir geliştirici dokümanı yayımlamaz. (2) **Haber siteleri ve yayıncılar** (TRT Haber, Hürriyet, Sabah, Sözcü, NTV, BBC Türkçe, Cumhuriyet vb.) ücretsiz **RSS** sunar. Bu dosyadaki RSS adresleri 15 Ekim 2026'da tek tek istek atılarak doğrulandı. (3) RSS'i olmayan siteler için **scraping** (HTML ayrıştırma, Selenium/Playwright) teknik olarak mümkündür, ama 5846 sayılı FSEK, 5187 sayılı Basın Kanunu md. 24 ve sitelerin kullanım koşulları nedeniyle hukuki risk taşır. Ücret: RSS ücretsizdir; ajans aboneliklerinin fiyatı herkese açık değildir, teklif istenir [RESMÎ].

> **Bu belgenin sınırları:** Araştırma sırasında web arama kotası dolduğu için arama motoru sonuçları kullanılamadı. Bilgiler kurumların kendi sayfaları (WebFetch), mevzuat.gov.tr'deki kanun metinleri ve doğrudan HTTP istekleriyle (curl) doğrulandı. Arama yapılamadığı için doğrulanamayan noktalar "belgede yok" ya da [TAHMİN] olarak işaretlendi.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Herkese açık (kimliksiz)** | Hiçbir şey; HTTP GET yeterli | Sitelerin RSS/Atom akışları (başlık, özet, bağlantı, tarih; bazılarında tam metin), `sitemap` / Google News sitemap dosyaları, Google News RSS (Türkiye baskısı) | Ücretsiz. Resmî bir hız limiti yayımlanmamış [RESMÎ: belgede yok]. AA RSS yanıtında `Cache-Control: max-age=120` başlığı görüldü, yani akış yaklaşık 2 dakikada bir tazeleniyor [3. TARAF: curl ölçümü]. |
| **Geliştirici hesabı / uygulama** | Böyle bir seviye **yok**. Türk ajans ve sitelerinin hiçbirinde self-servis geliştirici portalı veya API anahtarı başvurusu bulunamadı [RESMÎ: belgede yok]. | — | — |
| **İşletme / kurumsal onay (abonelik sözleşmesi)** | Kurum adı, iletişim bilgisi ve ilgilenilen yayın kanalıyla ajansa başvuru → sözleşme | **AA:** `api.aa.com.tr/abone/...` REST API (metin, fotoğraf, video, infografik) [RESMÎ + 3. TARAF]. **DHA:** abonelik/kurumsal satış, bülten, canlı yayın ve prodüksiyon hizmetleri [RESMÎ]. **İHA:** `abone.iha.com.tr` abone servisi (kullanıcı adı/şifre veya e-anahtar ile giriş) [RESMÎ]. | Fiyatlar yayımlanmıyor, teklif usulü [RESMÎ]. AA'nın Abonelik Talepleri sayfası yalnızca `abone@aa.com.tr` adresine kurum adı, iletişim bilgisi ve yayın mecrasıyla başvurulmasını istiyor; internet yayıncılarına özel bir tarife yayımlanmış değil [RESMÎ: AA Abonelik Talepleri]. |
| **Ücretli / kurumsal (üçüncü taraf toplayıcılar)** | Ücretli API aboneliği (NewsData.io, GNews, mediastack vb.) | Birden çok kaynaktan toplanmış haber araması | Türkçe/Türkiye desteği ve fiyatlar bu çalışmada doğrulanamadı [RESMÎ: belgede yok]. **NewsAPI.org** `top-headlines` dokümanında `country` için şu anda yalnızca `us` listeleniyor; `tr` yok [RESMÎ]. |
| **Resmî olmayan** | Belgelenmemiş uç noktalar veya HTML scraping | TRT Haber'in mobil XML'i (`xml_mobile.php`) tam metin döndürür; RSS'i olmayan sitelerin HTML sayfaları scraping ile alınabilir | Ücretsiz, ama ToS ve FSEK/Basın Kanunu riski taşır, uç noktalar her an değişebilir (aşağıya bakın). |

## Kimlik doğrulama

- **RSS / sitemap:** Kimlik doğrulama yok. Bazı sunucular tarayıcı dışı `User-Agent` başlıklarını engelleyebilir. Doğrulamada tarayıcı benzeri bir `User-Agent` ile tüm akışlar 200 döndü [3. TARAF: curl ölçümü].
- **AA abone API (`api.aa.com.tr`):** **HTTP Basic Authentication** (abonelikle verilen kullanıcı adı ve şifre). Yanlış kimlikle istek atıldığında sunucu HTTP 200 içinde şu JSON'u döndürüyor: `{"response":{"message":"HTTP/1.0 401 Unauthorized","success":false,"code":401}}`. Bu nedenle istemcide yalnızca HTTP durum koduna değil, `response.success` alanına da bakılmalı [3. TARAF: 15.10.2026 curl ölçümü]. Kimlik bilgisi hiç gönderilmezse 403 dönüyor. Herkese açık resmî doküman bulunamadı. Doküman abonelere sözleşmeyle veriliyor [TAHMİN].
- **İHA abone servisi:** `abone.iha.com.tr` giriş sayfası "Kullanıcı Adı-Şifre Girişi" ve "E-Anahtar Girişi" sunuyor ve giriş yapanın IP adresini gösteriyor; IP tabanlı kısıtlama olabilir [RESMÎ: sayfa / TAHMİN: IP kısıtı]. Programla erişim (XML/FTP/API) seçenekleri herkese açık sayfada anlatılmıyor [RESMÎ: belgede yok].
- **DHA:** Herkese açık bir API/giriş dokümanı yok. Abonelik ve kurumsal satış birimiyle iletişime geçmek gerekiyor [RESMÎ].

## Temel uç noktalar

### A) AA abone API (abonelik gerektirir)

Yolların varlığı 15.10.2026'da doğrulandı: yanlış kimlik bilgisiyle yapılan isteklerde HTTP 200 + 401 JSON, kimliksiz isteklerde düz HTTP 403 döndü (yani uç nokta var ve kimlik istiyor). Parametre adları resmî dokümandan değil, topluluk istemcilerinden bilinen kalıplardır [3. TARAF].

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `https://api.aa.com.tr/abone/discover/{dil}/{tür}` (ör. `tr_TR/category`, `tr_TR/type`, `tr_TR/priority`, `tr_TR/package`) | Kategori, içerik türü, öncelik ve paket listelerini (ID'leriyle) döndürür; filtrelemede kullanılır | Abonelik | Yanlış kimlikle HTTP 200 + 401 JSON, kimliksiz HTTP 403 [3. TARAF] |
| POST | `https://api.aa.com.tr/abone/search/` | Tarih aralığı, içerik türü (metin/fotoğraf/video/infografik), kategori, dil, `limit`/`offset` ile haber arar ve listeler | Abonelik | Parametresiz istekte 422, parametreliyse 401 döndü [3. TARAF]. Parametre adları (`start_date`, `end_date`, `filter_type`, `filter_category`, `filter_language`, `limit`, `offset`) [3. TARAF / TAHMİN] |
| GET | `https://api.aa.com.tr/abone/document/{id}/{format}` (ör. `newsml29`) | Tek içeriği belirtilen formatta indirir (NewsML, fotoğraf/video dosyası) | Abonelik | Yanlış kimlikle HTTP 200 + 401 JSON, kimliksiz HTTP 403 [3. TARAF] |
| GET | `https://api.aa.com.tr/abone/subscription/` | Aboneliğin kapsamını/paketlerini gösterir | Abonelik | Yanlış kimlikle HTTP 200 + 401 JSON, kimliksiz HTTP 403 [3. TARAF] |

Tam referans: herkese açık değil [RESMÎ: belgede yok]. Başvuru: [AA Abonelik Talepleri](https://www.aa.com.tr/tr/p/abonelik-talepleri).

### B) Herkese açık RSS akışları (doğrulanmış)

Aşağıdaki tüm adresler **15 Ekim 2026'da** istek atılarak denendi: HTTP 200 döndü, geçerli RSS/Atom üretti ve son öğeleri aynı güne aitti. "Öğe" sütunu o anki `<item>`/`<entry>` sayısıdır. "→" işareti sunucunun başka bir adrese yönlendirdiğini gösterir; uygulamada yönlendirilen son adresi kullanın.

| Kaynak | RSS adresi | Öğe | Not |
|---|---|---|---|
| **AA** (Anadolu Ajansı) | `https://www.aa.com.tr/tr/rss/default?cat=guncel` | 30 | Kategoriler `cat=` ile seçilir: `guncel`, `ekonomi`, `dunya`, `spor` doğrulandı. Yalnızca başlık ve özet içerir; tam metin ve fotoğraf abonelikle verilir. `Cache-Control: max-age=120`. |
| **TRT Haber** | `https://www.trthaber.com/sondakika.rss` | 50 | Son dakika akışı |
| TRT Haber | `https://www.trthaber.com/manset_articles.rss` | 60 | Manşetler |
| TRT Haber | `https://www.trthaber.com/gundem_articles.rss` | 60 | Kategori kalıbı `{kategori}_articles.rss` (`ekonomi_articles.rss` de doğrulandı) |
| **Hürriyet** | `https://www.hurriyet.com.tr/rss/anasayfa` | 68 | `rss/gundem` (100 öğe) da çalışıyor |
| **Sabah** | `https://www.sabah.com.tr/rss/sondakika.xml` | 50 | `rss/anasayfa.xml` ve `rss/gundem.xml` 10'ar öğe |
| **Sözcü** | `https://www.sozcu.com.tr/feeds-rss-category-sozcu` | 50 | Son dakika: `feeds-son-dakika` (15). Eski adres `rss/tum-haberler.xml` de hâlâ 200 döndürüyor. |
| **NTV** | `https://www.ntv.com.tr/son-dakika.rss` | 20 | Atom biçiminde (`<entry>`, `<updated>`). `gundem.rss` → `turkiye.rss` adresine yönlendiriyor. |
| **BBC Türkçe** | `https://feeds.bbci.co.uk/turkce/rss.xml` | 20 | |
| **Cumhuriyet** | `https://www.cumhuriyet.com.tr/rss` | 100 | `rss/son_dakika.xml` → `/rss`, `rss/1.xml` → `/rss/yazarlar` yönlendirmesi var |
| Milliyet | `https://www.milliyet.com.tr/rss/rssnew/sondakikarss.xml` | 20 | `gundemrss.xml` buraya yönlendiriyor |
| Habertürk | `https://www.haberturk.com/rss` | 100 | `rss/manset.xml` (30) |
| CNN Türk | `https://www.cnnturk.com/feed/rss/all/news` | 35 | Kategori: `feed/rss/turkiye/news` |
| DW Türkçe | `https://rss.dw.com/xml/rss-tur-all` | 15 | RDF sürümü: `rss.dw.com/rdf/rss-tur-all` |
| Euronews Türkçe | `https://tr.euronews.com/rss` | 50 | |
| Independent Türkçe | `https://www.indyturk.com/rss.xml` | 10 | |
| Yeni Şafak | `https://www.yenisafak.com/rss` | 60 | Kategori: `rss?category=gundem` |
| Star | `https://www.star.com.tr/rss/rss.asp` | 10 | |
| En Son Haber | `https://www.ensonhaber.com/rss/ensonhaber.xml` | 50 | |
| BirGün | `https://www.birgun.net/rss/home` | 105 | |
| Evrensel | `https://www.evrensel.net/rss/haber.xml` | 100 | |
| Karar | `https://www.karar.com/service/rss.php` | 40 | |
| Halk TV | `https://halktv.com.tr/export/rss` | 50 | `service/rss.php` buraya yönlendiriyor |
| Gazete Duvar | `https://www.gazeteduvar.com.tr/export/rss` | 50 | Son öğe 14.10.2026 tarihliydi |
| Bianet | `https://bianet.org/rss/bianet` | 50 | |
| Diken | `https://www.diken.com.tr/feed/` | 30 | WordPress akışı |
| Medyascope | `https://medyascope.tv/feed/` | 12 | WordPress akışı |
| Dünya (ekonomi) | `https://www.dunya.com/rss` | 25 | |
| Bloomberg HT | `https://www.bloomberght.com/rss/tum-haberler.xml` | 50 | `/rss` buraya yönlendiriyor |
| Haberler.com (toplayıcı) | `https://rss.haberler.com/rssnew.aspx` | 1000 | `rss.asp` buraya yönlendiriyor; çok yüksek hacimli |
| **Google News (Türkiye)** | `https://news.google.com/rss?hl=tr&gl=TR&ceid=TR:tr` | 35 | Toplayıcı akış. **Anahtar kelime araması** için: `https://news.google.com/rss/search?q=<kelime>&hl=tr&gl=TR&ceid=TR:tr` (ör. `q=deprem` 101 öğe döndü) |

**RSS'i doğrulanamayanlar (15.10.2026):**

- **DHA:** `dha.com.tr/rss`, `/rss.xml` ve `/sitemap.xml` 404 döndü. Ana sayfada RSS bağlantısı bulunamadı [RESMÎ: sitede yok].
- **İHA:** `iha.com.tr/rss` bir **HTML tanıtım sayfası** ("RSS Servisi" açıklaması) döndürüyor. Statik HTML'de akış bağlantısı yok; denenen `rss/gundem`, `rss/tum-haberler`, `rss.xml` adresleri 404 döndü. Akışlar JavaScript ile yükleniyor olabilir [TAHMİN].
- **T24:** `t24.com.tr/rss` ve alt yolları `/404` sayfasına yönlendiriyor. Çalışan bir akış bulunamadı.
- **TRT World:** `trtworld.com/rss` 404 döndü.

### C) Sitemap'ler (RSS'e ek kaynak)

Haber sitelerinin `robots.txt` dosyaları Google News sitemap'lerini ilan ediyor. Bunlar son 48 saatin haber URL'lerini yayın tarihiyle birlikte listeler ve RSS'ten daha kapsamlı olabilir: ör. `https://www.sozcu.com.tr/feeds/sitemapgooglenews` (720 URL), `https://www.ntv.com.tr/sitemaps/news-sitemap.xml`, `https://www.sabah.com.tr/sitemap/news.xml`, `https://www.trthaber.com/sitemap_haber.xml`, `https://www.cumhuriyet.com.tr/sitemaps/news.xml`, `https://www.aa.com.tr/tr/SiteMap/News` [RESMÎ: ilgili robots.txt dosyaları]. Dikkat: `https://www.trthaber.com/sitemaps/news.xml` Google News sitemap'i değil, aylık arşiv dosyalarına (`news-2026-10.xml` vb.; yalnızca `lastmod`, `news:publication_date` yok) yönlendiren bir sitemap index'tir; `https://www.aa.com.tr/tr/Sitemap/index` de alt sitemap'lere (News, LiveBlogs, Photos, Videos…) yönlendiren genel bir sitemap index'tir [3. TARAF: 15.10.2026 curl ölçümü].

## Gerçek zamanlı / bildirim

| Mekanizma | Durum |
|---|---|
| Webhook / push | Türk ajans ve sitelerinin herkese açık webhook'u yok [RESMÎ: belgede yok]. |
| WebSub (PubSubHubbub) | İncelenen akışlarda `<atom:link rel="hub">` görülmedi [3. TARAF: örnek akışlar incelendi]. Sözcü'nün robots.txt dosyasında `feeds/rsssubpub` adında bir sitemap var; WebSub benzeri bir yapı olabilir [TAHMİN]. |
| WebSocket / streaming | Herkese açık bir tane yok. AA abone API'si sorgu (polling) tabanlı görünüyor [TAHMİN]. |
| **RSS polling** | Pratikteki tek yöntem. Önerilen aralık: son dakika akışları için 1–2 dakika, diğerleri için 5–15 dakika [TAHMİN]. `ETag`/`Last-Modified` başlıklarıyla koşullu istek (`If-None-Match`/`If-Modified-Since`) atılabilir; ancak AA ve Hürriyet'in yanıtlarında bu başlıklar görülmedi, bu yüzden `guid`/`link` üzerinden tekilleştirme şarttır [3. TARAF: curl ölçümü]. |
| Google News RSS | Toplayıcı; birkaç dakika gecikmeli olabilir [TAHMİN]. |

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Bir sitenin yeni haberi | Evet | RSS polling + `guid`/`link` ile tekilleştirme | Herkese açık | Doğrulanmış adresler yukarıda |
| Son dakika / manşet | Evet | Sitelerin "son dakika" ve "manşet" akışları (TRT, Sabah, Sözcü, NTV, Milliyet, Habertürk) | Herkese açık | En sık yoklanacak akışlar bunlar |
| Kategoriye göre (ekonomi, spor…) | Evet | Kategori akışları (AA `cat=`, TRT `{kategori}_articles.rss`, CNN Türk, Yeni Şafak `category=`) | Herkese açık | |
| Anahtar kelime / konu filtresi | Evet (dolaylı) | (a) Google News RSS `search?q=`; (b) tüm akışları toplayıp istemcide başlık+özet üzerinde filtreleme | Herkese açık | Siteler kendi akışlarında arama parametresi sunmuyor |
| Tam metin | Kısmen | Bazı akışlar `content:encoded` ile tam metin veriyor (WordPress siteleri). Diğerlerinde makale sayfasını çekmek gerekir | Herkese açık / resmî olmayan | Tam metni saklamak veya yeniden yayımlamak hukuki risk taşır (aşağıya bakın) |
| Ajans bülteni (AA/DHA/İHA tam içerik, foto, video) | Evet | AA abone API; DHA ve İHA abone servisleri | Abonelik | Ücretli, sözleşmeli |
| Belirli bir yazarın köşe yazısı | Kısmen | Cumhuriyet `rss/yazarlar`; diğerlerinde yazar sayfasını scraping | Herkese açık / resmî olmayan | |
| Haberin güncellenmesi/düzeltilmesi | Kısmen | Sitemap'teki `lastmod`/`news:publication_date` değerleri; makale sayfasındaki güncelleme tarihi (5187 sayılı Kanun md. 4 uyarınca internet haber siteleri ilk yayın ve güncelleme tarihlerini içeriğin üzerinde göstermek zorunda) | Herkese açık | [RESMÎ: 5187 sayılı Kanun md. 4 (7418/3. md. ile eklenen fıkra)] |
| Yorumlar | Hayır (pratikte) | Yorumlar genelde üçüncü taraf sistemlerde veya JS ile yükleniyor; API yok | — | Yorumlar kişisel veri içerir → KVKK |
| Canlı yayın başladı (TV kanalları) | Dolaylı | Kanalların YouTube kanallarını izlemek (bkz. [YouTube](../Canli-Yayin-ve-Video/YouTube.md)) | — | Sitelerde canlı yayın bildirimi API'si yok |

**Önerilen mimari:** Kaynak listesi (yukarıdaki tablo) → zamanlanmış RSS çekici (kaynağa göre farklı aralık) → `guid`/normalize edilmiş `link` ile tekilleştirme → başlık ve özet üzerinden kural/anahtar kelime filtresi → aynı olayı farklı kaynaklarda bulmak için başlık benzerliğiyle kümeleme → bildirim. Saklanan şey başlık, bağlantı, tarih ve kısa özet olmalı; tam metin saklanmamalı [TAHMİN: önerilen yaklaşım].

## Hız sınırları ve fiyatlar

- **RSS:** Hiçbir sitede yazılı bir hız limiti bulunamadı [RESMÎ: belgede yok]. Sunucuyu yormayacak aralıklar (en az 1 dakika) ve tanımlayıcı bir `User-Agent` kullanılmalı [TAHMİN]. AA akışı 120 saniyelik önbellek başlığı gönderiyor, bu yüzden daha sık sorgulamak yeni veri getirmez [3. TARAF].
- **AA abonelik:** Fiyat yayımlanmıyor; e-postayla teklif isteniyor [RESMÎ]. API hız limiti herkese açık değil [RESMÎ: belgede yok].
- **DHA abonelik:** Fiyat yok, kurumsal satış birimiyle iletişime geçiliyor [RESMÎ].
- **İHA abonelik:** Fiyat yok, abone servisi sayfasından başvuru formu ve telefonla [RESMÎ].
- **Google News RSS:** Resmî bir limit yayımlanmıyor. Çok sık sorgulamada geçici engel (HTTP 429/503) yaşandığı topluluk tarafından bildiriliyor [3. TARAF / TAHMİN].

## Resmî olmayan yollar ve riskler

### Teknik yollar

| Yol | Nasıl çalışır | Risk |
|---|---|---|
| **TRT Haber mobil XML** — `https://www.trthaber.com/xml_mobile.php?tur=xml_genel&kategori=gundem&adet=20&selectEx=...` | Mobil uygulamanın kullandığı belgelenmemiş XML. `<haber_manset>`, `<haber_metni>` (**tam HTML metin**), `<haber_resim>`, `<haber_id>` alanlarını döndürüyor (15.10.2026'da 200 döndü) [3. TARAF: curl ölçümü] | Belgelenmemiş, haber vermeden değişebilir. Tam metin içerdiği için yeniden yayımlanması FSEK/Basın Kanunu riski taşır. |
| **Statik HTML scraping** (.NET: `HttpClient` + AngleSharp/HtmlAgilityPack; Python: `requests` + BeautifulSoup/`trafilatura`) | Liste ve makale sayfalarını indirip CSS seçicilerle ayrıştırır | Site tasarımı değişince bozulur; IP engeli; ToS ihlali |
| **Tarayıcı otomasyonu** (Playwright, Selenium) | JS ile yüklenen içerik ve sonsuz kaydırma için gerçek tarayıcı çalıştırır | Ağır ve yavaştır; Cloudflare gibi bot korumaları; ToS ihlali. Bot korumasını aşmaya yönelik hileler hukuki riski artırır. |
| **Sitemap tarama** | Google News sitemap'lerinden yeni URL'leri toplar | Düşük teknik risk, ama URL'den sonra sayfayı çekmek scraping sayılır |
| **Gizli JSON uç noktaları** (sitelerin kendi ön yüzünün kullandığı API'ler) | Tarayıcının ağ sekmesinden bulunur | Belgelenmemiştir, imzalı/geçici token içerebilir, bozulur; ToS riski |

### robots.txt durumu (15.10.2026'da okunan dosyalar)

- **Hürriyet**, **NTV** ve **Cumhuriyet**: `GPTBot`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `cohere-ai`, `CCBot` gibi yapay zekâ tarayıcılarına `Disallow: /` uyguluyor [RESMÎ: robots.txt]. Takip uygulaması bu adlarla dolaşmamalı; ancak kendi bot'unuzun bu listeden muaf olduğu anlamına da gelmez, site niyetini açıkça belli ediyor.
- **AA**, **Sabah**, **Sözcü**, **TRT Haber**, **İHA** ve **T24**: genel `User-agent: *` kuralı ve sitemap ilanları var; genel bir `Disallow: /` yok [RESMÎ: robots.txt]. Tam kural listesi için ilgili dosyayı okuyun.
- robots.txt Türk hukukunda doğrudan bağlayıcı bir düzenleme değildir; ancak site sahibinin iradesini gösterir ve bir uyuşmazlıkta iyi niyet değerlendirmesinde önem taşıyabilir [TAHMİN].

### Hukuki çerçeve

| Düzenleme | Ne diyor | Takip uygulamasına etkisi |
|---|---|---|
| **5846 FSEK md. 36** | "Basın Kanununun 15 inci maddesi hükmü mahfuz kalmak üzere basın veya radyo tarafından umuma yayılmış bulunan **günlük havadisler ve haberler serbestçe iktibas olunabilir**." Gazete ve dergilerdeki günlük sorunlarla ilgili makaleler, iktibas hakkı açıkça saklı tutulmamışsa alınabilir; saklı tutulmuşsa bile kısaltılmış basın özeti olarak verilebilir. Her durumda gazete/ajans adı, tarih ve yazar adı belirtilmelidir. [RESMÎ] | Başlık + kısa özet + kaynak + bağlantı göstermek bu çerçeveye en yakın kullanımdır. Köşe yazısını tam almak riskli; kaynak göstermek **zorunlu**. |
| **5846 FSEK md. 37** | Bilgilendirme kapsamını aşmamak koşuluyla günlük olaylara bağlı eser parçaları alınabilir, ama hak sahibinin menfaatine zarar verecek veya eserin normal kullanımına aykırı biçimde değil. [RESMÎ] | Haberin tamamını kopyalayan ve orijinal sitenin yerine geçen bir "ayna" uygulama bu sınırı aşabilir [TAHMİN]. |
| **5846 FSEK md. 6/11 + Ek md. 8** | Veri tabanları eser olarak korunur. Ayrıca veri tabanına esaslı yatırım yapan yapımcı, içeriğin **önemli bir kısmının veya tamamının** başka ortama aktarılmasına ya da dağıtılmasına izin verme/yasaklama hakkına sahiptir (koruma 15 yıl). [RESMÎ] | Bir sitenin arşivini toplu indirmek (sistematik scraping) bu hakka takılabilir. |
| **5846 FSEK md. 25** | Eserin dijital iletim dahil umuma iletim hakkı münhasıran eser sahibine aittir. [RESMÎ] | Toplanan içeriği kendi sitesinde/uygulamasında yayımlamak izin gerektirir. |
| **5187 Basın Kanunu md. 24** | Süreli yayında (süreli yayın tanımı (md. 2/c) haber ajansı yayınlarını zaten kapsıyordu; 7418 sayılı Kanunla internet haber siteleri de eklendi) yayımlanmış haber, yazı ve resimleri **kaynak göstermeden** yeniden yayımlamak para cezası gerektirir. Yeniden yayım hakkı saklı tutulmuşsa **izinsiz** yayımlamanın cezası daha ağırdır. [RESMÎ] | AA "yeniden yayım hakkını saklı tuttuğunu", abone olmayanların içeriği "hiçbir şekilde kullanamayacağını" ve aboneliksiz kullanımın md. 24 uyarınca suç olduğunu açıkça belirtiyor [RESMÎ: AA Yasal Uyarı]. AA RSS'indeki başlıkları bile kendi yayınında göstermek için dikkatli olunmalı. |
| **6698 KVKK** | Haberlerde geçen gerçek kişi adları kişisel veridir. [RESMÎ: genel ilke] | Kişi adına göre filtreleme/profil çıkarma yapan bir uygulama veri sorumlusu yükümlülüklerine girebilir [TAHMİN]. |
| **5237 TCK md. 243–244** | Bilişim sistemine hukuka aykırı girme ve sistemi engelleme [RESMÎ: kanun maddeleri] | Giriş/ödeme duvarını veya bot korumasını aşmak ve sunucuyu yoracak hızda istek atmak bu kapsamda değerlendirilebilir [TAHMİN — hukuki görüş değildir]. |

**Kişisel (yayımlanmayan) kullanım ile yayımlama arasındaki fark:** Akışları yalnızca kendiniz okumak için toplamak (RSS okuyucu mantığı) ile toplanan içeriği başkalarına yeniden yayımlamak hukuken çok farklıdır. FSEK md. 38 kâr amacı gütmeyen şahsi kullanımı serbest bırakır; çoğaltma ve yayma ise izin gerektirir [RESMÎ: FSEK md. 38 / TAHMİN: uygulamaya yorumu]. Ticari bir ürün için ajans aboneliği veya yayıncıyla lisans anlaşması en güvenli yoldur.

> Bu bölüm genel bilgidir, hukuki görüş değildir. Ticari kullanım öncesinde bir avukata danışılmalıdır.

## SDK ve kütüphaneler

**RSS/Atom okuma**

| Dil | Kütüphane | Not |
|---|---|---|
| .NET | `System.ServiceModel.Syndication` (resmî NuGet, `SyndicationFeed.Load`) | RSS 2.0 ve Atom 1.0. RDF (DW'nin `rdf` akışı) desteklenmez, onun yerine `xml` sürümünü kullanın. Bazı Türk akışlarındaki tarih biçimleri (ör. Sözcü'nün `&#x2B;0300`, Milliyet'in çift boşluklu `Z`) ayrıştırma hatası verebilir [3. TARAF: akışlarda gözlendi]. |
| .NET | `CodeHollow.FeedReader` (topluluk) | RSS 0.9x/1.0/2.0 ve Atom; tarih ayrıştırmada daha toleranslı |
| Python | `feedparser` | En yaygın ve toleranslı ayrıştırıcı |
| Node.js | `rss-parser` | |

**Scraping / içerik çıkarma**

| Dil | Kütüphane |
|---|---|
| .NET | `AngleSharp`, `HtmlAgilityPack`, `Microsoft.Playwright`, `Selenium.WebDriver`, `SmartReader` (makale gövdesini çıkarır) |
| Python | `httpx`/`requests`, `BeautifulSoup4`, `selectolax`, `playwright`, `selenium`, `trafilatura` ve `newspaper4k` (makale gövdesi + tarih çıkarma) |
| Node.js | `playwright`, `puppeteer`, `cheerio`, `@mozilla/readability` |

**AA abone API:** Resmî SDK yok [RESMÎ: belgede yok]. GitHub'da topluluğun yazdığı PHP/Python istemcileri bulunduğu biliniyor [3. TARAF], ancak bu çalışmada adları ve güncellikleri doğrulanamadı.

## Postman / OpenAPI / koleksiyonlar

- Türk ajansları ve haber siteleri için resmî bir OpenAPI/Postman koleksiyonu **yok** [RESMÎ: belgede yok].
- AA abone API dokümanı abonelere veriliyor; herkese açık bir OpenAPI dosyası bulunamadı [TAHMİN].
- RSS için şema gerekmez: RSS 2.0 spesifikasyonu (rssboard.org) ve Atom (RFC 4287) yeterlidir.

## Depoda ilgili sayfalar

- [X (Twitter) API](../Sosyal-Medya/X-Twitter.md) — Türk ajans ve gazetelerinin son dakika paylaşımları çoğunlukla önce X'te çıkar.
- [Telegram API](../Mesajlasma/Telegram.md) — birçok haber kaynağının Telegram kanalı var; kanal takibi.
- [WhatsApp API](../Mesajlasma/WhatsApp.md) — WhatsApp kanalları.
- [YouTube API](../Canli-Yayin-ve-Video/YouTube.md) — TV kanallarının canlı yayınları ve kanal RSS'leri.
- [Bluesky API](../Sosyal-Medya/Bluesky.md), [Threads API](../Sosyal-Medya/Threads.md), [Mastodon / Fediverse](../Sosyal-Medya/Mastodon-Fediverse.md) — haber hesaplarının diğer platformlardaki izleri.

## Kaynaklar

**Resmî**

- [AA — Abonelik Talepleri](https://www.aa.com.tr/tr/p/abonelik-talepleri) — e-postayla başvuru; kurum adı, iletişim bilgisi ve yayın mecrası istenir; fiyat yayımlanmıyor — (erişim: 15 Ekim 2026)
- [AA — Yasal Uyarı](https://www.aa.com.tr/tr/p/yasal-uyari) — yeniden yayım hakkı saklı; aboneliksiz kullanım yasak; 5187 md. 24 atfı — (erişim: 15 Ekim 2026)
- [AA — RSS (Güncel)](https://www.aa.com.tr/tr/rss/default?cat=guncel) — herkese açık kategori akışı — (erişim: 15 Ekim 2026)
- [AA — API kök adresi](https://api.aa.com.tr/) — "API Home Page"; `/abone/...` yolları kimlik doğrulama istiyor — (erişim: 15 Ekim 2026)
- [DHA — Abonelik ve Kurumsal Satış](https://www.dha.com.tr/dha-abonelik-ve-kurumsal-satis/) — bülten, canlı yayın ve prodüksiyon hizmetleri; fiyat yok, iletişimle — (erişim: 15 Ekim 2026)
- [DHA — Booking](https://booking.dha.com.tr/) — canlı yayın aracı, SNG ve prodüksiyon hizmetleri — (erişim: 15 Ekim 2026)
- [İHA — Abone Servisi](https://abone.iha.com.tr/) — abone girişi (kullanıcı adı/şifre, e-anahtar) ve başvuru formu — (erişim: 15 Ekim 2026)
- [İHA — RSS sayfası](https://www.iha.com.tr/rss) — RSS servisi tanıtımı; statik HTML'de akış adresi yok — (erişim: 15 Ekim 2026)
- [5846 sayılı Fikir ve Sanat Eserleri Kanunu (PDF)](https://www.mevzuat.gov.tr/MevzuatMetin/1.3.5846.pdf) — md. 6/11, 25, 35, 36, 37, 38, Ek md. 8 — (erişim: 15 Ekim 2026)
- [5187 sayılı Basın Kanunu (PDF)](https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5187.pdf) — md. 2 (süreli yayın tanımına internet haber siteleri dahil), md. 4 (ilk yayın/güncelleme tarihi zorunluluğu, 7418/3. md. ile eklenen fıkra), md. 24 — (erişim: 15 Ekim 2026)
- [NewsAPI.org — Top headlines](https://newsapi.org/docs/endpoints/top-headlines) — `country` için yalnızca `us` listeleniyor — (erişim: 15 Ekim 2026)
- Sitelerin `robots.txt` dosyaları: [aa.com.tr](https://www.aa.com.tr/robots.txt), [hurriyet.com.tr](https://www.hurriyet.com.tr/robots.txt), [ntv.com.tr](https://www.ntv.com.tr/robots.txt), [cumhuriyet.com.tr](https://www.cumhuriyet.com.tr/robots.txt), [sozcu.com.tr](https://www.sozcu.com.tr/robots.txt), [trthaber.com](https://www.trthaber.com/robots.txt), [sabah.com.tr](https://www.sabah.com.tr/robots.txt) — yapay zekâ tarayıcısı engelleri ve sitemap ilanları — (erişim: 15 Ekim 2026)
- Google News sitemap'leri: [TRT Haber — sitemap_haber.xml](https://www.trthaber.com/sitemap_haber.xml), [AA — SiteMap/News](https://www.aa.com.tr/tr/SiteMap/News); sitemap index'ler: [TRT Haber — sitemaps/news.xml](https://www.trthaber.com/sitemaps/news.xml) (aylık arşiv), [AA — Sitemap/index](https://www.aa.com.tr/tr/Sitemap/index) — curl ile doğrulandı — (erişim: 15 Ekim 2026)
- RSS adresleri: yukarıdaki tablodaki her adres, ilgili yayıncının kendi akışıdır ve doğrudan istekle doğrulandı — (erişim: 15 Ekim 2026)

**Spesifikasyonlar**

- [RSS 2.0 Specification](https://www.rssboard.org/rss-specification) — RSS alanları (`guid`, `pubDate`…) — (erişim: 15 Ekim 2026)
- [RFC 4287 — Atom Syndication Format](https://www.rfc-editor.org/rfc/rfc4287) — NTV gibi Atom akışları için — (erişim: 15 Ekim 2026)
- [Google News RSS (Türkiye)](https://news.google.com/rss?hl=tr&gl=TR&ceid=TR:tr) — toplayıcı akış; `search?q=` ile anahtar kelime — (erişim: 15 Ekim 2026)

**Doğrulama yöntemi notu:** RSS, robots.txt ve AA API yanıtları 15.10.2026'da `curl` ile doğrudan istek atılarak test edildi [3. TARAF: kendi ölçüm]. Web arama kotası dolduğu için ikincil kaynak (blog, forum) taraması yapılamadı.

[← API dizini](../)
