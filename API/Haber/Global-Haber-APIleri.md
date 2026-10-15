# Global Haber API'leri

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (çoğu ticari ve kısıtlı ücretsiz katmanlı) · Bing News Search: **kapatıldı (11 Ağustos 2025)**

← [Üst klasör: API](../)

## Özet

Haber siteleri tek tek takip edilmek yerine **haber toplayıcı (aggregator) API'leri** ile tek noktadan izlenebilir. NewsAPI.org, GNews, Mediastack, NewsData.io ve Event Registry (NewsAPI.ai) binlerce kaynaktan anahtar kelime/ülke/dil/kategoriye göre haber arama sunan **ticari** servislerdir; ücretsiz katmanları genelde gecikmeli (12–24 saat) ve "yalnızca geliştirme / ticari olmayan kullanım" şartlıdır. The Guardian ve New York Times yalnızca **kendi** içeriklerini veren yayıncı API'leridir. GDELT ücretsiz, anahtarsız ve yaklaşık gerçek zamanlıdır; Türkçe kaynakları da izler. Google News RSS ücretsiz ama yalnızca kişisel, ticari olmayan kullanım içindir. Microsoft Bing News Search API 2025'te tamamen kapatıldı.

### Hızlı karşılaştırma

| Servis | Ücretsiz katman | Ücretsizde gecikme | En ucuz ücretli | Türkçe (dil `tr`) | Türkiye (ülke `tr`) | Gerçek zamanlı push |
|---|---|---|---|---|---|---|
| NewsAPI.org | 100 istek/gün, yalnızca geliştirme | 24 saat | 449 $/ay | **Yok** [RESMÎ] | `top-headlines` belgesinde yalnızca `us` listeleniyor [RESMÎ] | Yok (polling) |
| GNews | 100 istek/gün, ticari değil | 12 saat | 49,99 €/ay | **Var** [RESMÎ] | **Var** [RESMÎ] | Yok (polling) |
| Mediastack | 100 çağrı/ay, ticari değil | "Delayed" (süre belirtilmemiş) | 24,99 $/ay | Yok (13 dil, listede Türkçe görünmüyor) [3. TARAF/TAHMİN] | Var [3. TARAF] | Yok |
| NewsData.io | 200 kredi/gün | 12 saat | 199,99 $/ay | Var [3. TARAF] | Var [3. TARAF] | Yok (polling) |
| Event Registry / NewsAPI.ai | 2.000 arama (tek seferlik) | belgede yok | 90 $/ay (5K token) | belgede açık değil [ÇELİŞKİLİ] | Var (ülke listesinde) [RESMÎ] | "Minute stream" (son dakika akışı, polling) |
| The Guardian | 500 çağrı/gün, ticari değil | Yok | Ticari anahtar (teklif) | — (yalnız Guardian içeriği) | — | Yok |
| New York Times | Ücretsiz anahtar | Yok | Ticari lisans ayrı | — (yalnız NYT içeriği) | — | Yok |
| GDELT DOC 2.0 | Anahtarsız, ücretsiz | ~15 dk güncelleme | — | **Var** (`sourcelang:turkish`) [RESMÎ, test edildi] | **Var** (`sourcecountry:turkey`) | RSS çıktısı, 15 dk |
| Google News RSS | Anahtarsız | Neredeyse anlık | — | **Var** (`hl=tr&gl=TR`) | Var | RSS (polling) |
| Bing News Search | **Kapatıldı** | — | — | — | — | — |

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | **GDELT DOC 2.0** (anahtar yok), **Google News RSS** (arama/konu/ülke beslemeleri), yayıncıların kendi RSS beslemeleri | Ücretsiz. GDELT: "5 saniyede 1 istek" [RESMÎ — API'nin 429 yanıt metni]. Google News RSS: yalnızca kişisel, ticari olmayan okuyucu kullanımı [RESMÎ — beslemedeki telif metni] |
| Geliştirici hesabı / API anahtarı | E-posta ile kayıt | NewsAPI.org Developer, GNews Free, Mediastack Free, NewsData.io Free, NewsAPI.ai Free, Guardian Developer key, NYT API key | Ücretsiz ama kısıtlı: gecikme, az istek, kısaltılmış içerik, ticari kullanım yasağı (ayrıntı aşağıda) |
| İşletme / uygulama onayı | Ticari anahtar başvurusu / sözleşme | Guardian **Commercial key** (ticari kullanım, model eğitimi, metin madenciliği dahil — başvuruyla), NYT ticari lisans, GDELT'te büyük sorgular için iletişim | Teklif usulü [RESMÎ] |
| Ücretli / kurumsal | Abonelik | Gerçek zamanlı haber, tam metin, uzun arşiv, CORS tüm origin'ler, SLA | NewsAPI.org 449–1.749 $/ay; GNews 49,99–249,99 €/ay; Mediastack 24,99–249,99 $/ay; NewsData.io 199,99–1.299,99 $/ay; NewsAPI.ai 90 $/ay'dan başlar |
| Resmî olmayan | — | Google News'in iç JSON uç noktaları, haber sitelerini doğrudan kazıma (scraping), `newspaper3k`/`trafilatura` ile tam metin çekme | ToS/telif riski; aşağıya bkz. |

## Kimlik doğrulama

| Servis | Yöntem |
|---|---|
| NewsAPI.org | `apiKey` sorgu parametresi **veya** `X-Api-Key` HTTP başlığı [RESMÎ — belge + API'nin hata mesajı] |
| GNews | `apikey` sorgu parametresi (`https://gnews.io/api/v4/search?q=...&apikey=...`) [RESMÎ] |
| Mediastack | `access_key` sorgu parametresi [RESMÎ — API'nin hata mesajı] |
| NewsData.io | `apikey` sorgu parametresi; `X-ACCESS-KEY` başlığı da desteklenir [3. TARAF — bu oturumda belge sayfası JS nedeniyle okunamadı] |
| Event Registry / NewsAPI.ai | `apiKey` (istek gövdesinde/parametrede); Python SDK'da `EVENTREGISTRY_API_KEY` ortam değişkeni veya `~/.eventregistry/settings.json` [RESMÎ — SDK README] |
| The Guardian | `api-key` sorgu parametresi. Eskiden belgelerde geçen `api-key=test` deneme anahtarı 15.10.2026'da `Unauthorized` döndü [RESMÎ — test edildi] |
| New York Times | `api-key` sorgu parametresi (developer.nytimes.com'da uygulama oluşturup anahtar alınır) [3. TARAF — portal JS ile yüklendiği için bu oturumda okunamadı] |
| GDELT | Kimlik doğrulama yok |
| Google News RSS | Kimlik doğrulama yok |

Anahtarları koda gömmeyin; ortam değişkeni veya `dotnet user-secrets` kullanın. NewsAPI.org ve GNews ücretsiz planlarında CORS yalnızca `localhost` içindir; yani tarayıcıdan doğrudan çağrı canlı ortamda çalışmaz, istek sunucudan yapılmalıdır [RESMÎ].

## Temel uç noktalar

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `https://newsapi.org/v2/everything` | 150.000+ kaynakta arama (`q`, `searchIn`, `sources` ≤20, `domains`, `excludeDomains`, `from`/`to`, `language`, `sortBy`, `pageSize` ≤100) | Geliştirici | `q` en çok 500 karakter; AND/OR/NOT, `+`/`-`, tırnaklı tam eşleşme. Ücretsizde 24 saat gecikme ve en çok 1 ay geçmiş [RESMÎ] |
| GET | `https://newsapi.org/v2/top-headlines` | Ülke/kategori/kaynağa göre manşetler | Geliştirici | `country` belgesinde yalnızca `us` listeleniyor; `sources` ile `country`/`category` birlikte kullanılamaz [RESMÎ] |
| GET | `https://newsapi.org/v2/top-headlines/sources` | Kaynak listesi (id, ad, kategori) | Geliştirici | — |
| GET | `https://gnews.io/api/v4/search` | Anahtar kelime araması (`q` ≤200 karakter, `lang`, `country`, `max`, `in`, `from`/`to`, `sortby`, `page`) | Geliştirici | Sayfalama en çok 1.000 makale; ücretsizde içerik kısaltılmış [RESMÎ] |
| GET | `https://gnews.io/api/v4/top-headlines` | 9 kategoride manşet (general, world, nation, business, technology, entertainment, sports, science, health) | Geliştirici | `lang=tr&country=tr` desteklenir [RESMÎ] |
| GET | `https://api.mediastack.com/v1/news` | Canlı/tarihsel haber (`keywords`, `countries`, `languages`, `categories`, `sources`, `date`, `sort`, `limit`) | Geliştirici | Parametre adları [3. TARAF]; resmî belge APILayer'a taşındı, bu oturumda JS nedeniyle okunamadı |
| GET | `https://api.mediastack.com/v1/sources` | Kaynak listesi | Geliştirici | [3. TARAF] |
| GET | `https://newsdata.io/api/1/latest` | Son 48 saatin haberleri (`q`, `qInTitle`, `country`, `language`, `category`, `domain`) | Geliştirici | 1 kredi = ücretsizde 10, ücretlide 50 makale [3. TARAF — NewsData.io kendi blogu] |
| GET | `https://newsdata.io/api/1/archive` | Arşiv araması | Ücretli | Basic 6 ay, Professional 2 yıl, Corporate 10 yıl [3. TARAF — NewsData.io blogu] |
| GET | `https://newsdata.io/api/1/sources`, `/crypto`, `/market` | Kaynaklar, kripto ve piyasa haberleri | Geliştirici/Ücretli | [3. TARAF] |
| POST/GET | `https://eventregistry.org/api/v1/article/getArticles` | Makale arama (anahtar kelime, **kavram (Wikipedia URI)**, kategori, kaynak, konum, duygu skoru) | Geliştirici | Güncel arama 1 token; arşiv yılı başına 5 token [RESMÎ — plans sayfası] |
| POST/GET | `https://eventregistry.org/api/v1/event/getEvents` | Aynı olayı anlatan haberlerin kümelendiği "olay" araması | Geliştirici | 5 token; arşivde yıl başına 20 token [RESMÎ] |
| POST/GET | `https://eventregistry.org/api/v1/minuteStreamArticles` | Son dakikada eklenen makaleler (akış benzeri polling) | Geliştirici | Uç nokta adı [3. TARAF]; SDK'da `GetRecentArticles` sınıfı [TAHMİN] |
| GET | `https://content.guardianapis.com/search` | Guardian içeriğinde arama (`q`, `section`, `tag`, `from-date`, `order-by`, `show-fields`, `page-size`) | Geliştirici | 1 çağrı/sn, 500 çağrı/gün [RESMÎ] |
| GET | `https://content.guardianapis.com/tags`, `/sections`, `/editions`, `/{id}` | Etiketler, bölümler, baskılar, tek içerik | Geliştirici | Belge başlıkları: Content, Tags, Sections, Editions, Single Item [RESMÎ] |
| GET | `https://api.nytimes.com/svc/search/v2/articlesearch.json` | NYT arşivinde arama | Geliştirici | OpenAPI tanımı GitHub'da [RESMÎ] |
| GET | `https://api.nytimes.com/svc/topstories/v2/{section}.json` | Bölüm bazlı en önemli haberler | Geliştirici | [RESMÎ — OpenAPI deposu] |
| GET | `https://api.nytimes.com/svc/news/v3/content/{source}/{section}.json` | **Times Wire / Newswire**: yayımlanan son makaleler (takip için en uygun NYT uç noktası) | Geliştirici | [RESMÎ — OpenAPI deposu `timeswire`] |
| GET | `https://api.nytimes.com/svc/mostpopular/v2/viewed/{period}.json` | En çok okunan/paylaşılan | Geliştirici | [RESMÎ — `most_popular_api`] |
| GET | `https://api.nytimes.com/svc/archive/v1/{yil}/{ay}.json` | Bir ayın tüm makaleleri | Geliştirici | [RESMÎ — `archive_api`] |
| GET | `https://api.gdeltproject.org/api/v2/doc/doc` | Küresel haber araması (`query`, `mode=artlist`, `format=json/rss`, `timespan`, `maxrecords` ≤250, `startdatetime`/`enddatetime`, `sort`) | Herkese açık | Operatörler sorgunun içinde: `sourcelang:turkish`, `sourcecountry:turkey`, `domain:`, `theme:`. Varsayılan pencere son 3 ay [RESMÎ — 2017 duyurusu; canlı test 15.10.2026] |
| GET | `https://news.google.com/rss/search?q=<sorgu>&hl=tr&gl=TR&ceid=TR:tr` | Google Haberler araması RSS olarak | Herkese açık | Resmî belgesi yok; beslemenin kendisi "yalnızca kişisel, ticari olmayan" kullanım şartı taşıyor [RESMÎ — besleme metni] |
| GET | `https://news.google.com/rss?hl=tr&gl=TR&ceid=TR:tr` | Türkiye manşetleri | Herkese açık | Aynı şart |

Tam referanslar: [NewsAPI endpoints](https://newsapi.org/docs/endpoints) · [GNews docs](https://docs.gnews.io/) · [Mediastack docs](https://docs.apilayer.com/mediastack/docs/api-documentation) · [NewsData.io docs](https://newsdata.io/documentation) · [NewsAPI.ai docs](https://newsapi.ai/documentation) · [Guardian docs](https://open-platform.theguardian.com/documentation/) · [NYT OpenAPI specs](https://github.com/nytimes/public_api_specs) · [GDELT DOC 2.0](https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/).

### Örnek: GDELT ile Türkçe haber (anahtarsız)

```
GET https://api.gdeltproject.org/api/v2/doc/doc?query=istanbul%20sourcelang:turkish&mode=artlist&format=json&maxrecords=50&timespan=1h&sort=datedesc
```

Yanıt alanları: `url`, `url_mobile`, `title`, `seendate` (UTC, `20261015T141500Z` biçimi), `socialimage`, `domain`, `language`, `sourcecountry` [RESMÎ — 15.10.2026 canlı yanıt]. Tam metin, yazar ve özet **gelmez**; yalnızca başlık + bağlantı.

## Gerçek zamanlı / bildirim

Bu servislerin **hiçbiri webhook, WebSocket veya WebSub (PubSubHubbub) push sunmuyor** [RESMÎ belgelerde bulunmadı → "belgede yok"]. Hepsi **polling** (düzenli aralıkla sorgulama) ile kullanılır:

| Yöntem | Servis | Nasıl |
|---|---|---|
| Polling + tarih filtresi | NewsAPI.org, GNews, NewsData.io, Mediastack | Son görülen yayın zamanını sakla, bir sonraki istekte yalnız yenileri iste. Parametre servise göre değişir: NewsAPI.org ve GNews `from` (ISO 8601) [RESMÎ]; Mediastack `date` [3. TARAF]; NewsData.io `/latest` uç noktasında `from` yok, zaman filtresi `timeframe` (saat) — ya da `page` ile ilerleyip makale id/`pubDate` ile yinelenenleri ayıkla; `from_date`/`to_date` yalnız `/archive` uç noktasında [3. TARAF — resmî belge JS nedeniyle okunamadı]. Ücretsiz katmanların 12–24 saat gecikmesi "son dakika" takibini **imkânsız** kılar; ücretli katman gerekir |
| Minute stream | Event Registry | Son eklenen makaleleri dakikalık aralıkla çeken uç nokta/SDK sınıfı [3. TARAF] |
| 15 dakikalık güncelleme | GDELT | GDELT 2.0 veri setleri 15 dakikada bir güncellenir; DOC API `timespan=15min` ile son 15 dakikayı verir. `format=rss` ile her sorgu bir RSS beslemesine dönüşür [RESMÎ] |
| RSS | Google News RSS, yayıncı RSS'leri, GDELT `format=rss` | RSS okuyucu/zamanlayıcı ile periyodik çekme; `ETag`/`If-Modified-Since` ile gereksiz trafik azaltılır |
| WebSub | Bazı yayıncı/blog RSS'leri | Yayıncı beslemesinde `<link rel="hub">` varsa WebSub ile push alınabilir; haber API'lerinde yok |

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Bir anahtar kelime/kişi/şirket hakkında yeni haber | Evet | GDELT `query="<ad>"&timespan=15min` polling; GNews/NewsData `q=` | Herkese açık / Geliştirici | Ücretsiz ticari API'lerde 12–24 saat gecikme; GDELT ve Google News RSS neredeyse anlık |
| Türkçe kaynaklardan haber | Evet | GDELT `sourcelang:turkish`, GNews `lang=tr`, NewsData `language=tr`, Google News RSS `hl=tr&gl=TR` | Herkese açık / Geliştirici | **NewsAPI.org Türkçe desteklemiyor** [RESMÎ] |
| Belirli bir sitenin yeni yazıları | Evet | GDELT `domain:ornek.com`; NewsAPI `domains=`; NewsData `domain=` / `domainurl=`; GNews'te domain filtresi yok [RESMÎ — Search endpoint parametre listesi]; en iyisi sitenin kendi RSS'i | Herkese açık / Geliştirici | Sitenin RSS'i varsa API'ye gerek yok |
| Son dakika / manşet değişimi | Kısmen | Türkiye manşeti: GNews `top-headlines?country=tr` (ücretli plan = gerçek zamanlı) veya Google News RSS manşet beslemesi. NewsAPI `top-headlines` yalnız `country=us` (ya da `sources=`) ile çalışır, Türkiye için kullanılamaz [RESMÎ] | Ücretli / Herkese açık | Ücretsiz katman gecikmeli |
| Aynı olayın farklı kaynaklardaki haberleri (yinelenenleri ayıklama) | Evet | Event Registry "event" kümeleri; NewsAPI.org Enterprise "story clustering" [RESMÎ]; aksi hâlde başlık benzerliği ile kendin kümele | Geliştirici / Kurumsal | Filtreleme için en değerli özellik |
| Duygu (olumlu/olumsuz) / ton filtresi | Evet | Event Registry `minSentiment`; GDELT `tone` ve `mode=tonechart` | Geliştirici / Herkese açık | — |
| Haberin tam metni | Kısmen | The Guardian Developer key: `show-fields=body` ile tam metin, ücretsiz ama yalnız ticari olmayan kullanım; ticari kullanımda Commercial key [RESMÎ]. Ücretli planlar (GNews ücretli, NewsData ücretli); NewsAPI.org tam metin vermez (yalnız URL) [RESMÎ] | Geliştirici / Ücretli | Tam metni kendin kazımak telif/ToS riski taşır |
| Kişinin sosyal medya paylaşımı | Hayır | Bu API'ler haber sitelerini kapsar | — | Sosyal ağlar için ilgili sayfalara bkz. |
| Belirli bir yayıncının (Guardian/NYT) yeni makalesi | Evet | Guardian `search?order-by=newest`; NYT Times Wire | Geliştirici | Yalnızca o yayıncı; ticari kullanım için ticari anahtar |

**Önerilen mimari [TAHMİN]:** (1) Ücretsiz başlangıç: GDELT DOC (5 sn'de 1 istek kuralına uyarak, sorguları birleştirip 15 dakikada bir) + Google News RSS (kişisel kullanım) + yayıncıların kendi RSS'leri. (2) Ticari ürün: GNews Essential veya NewsData.io (Türkçe destekli) ya da kavram/olay kümelemesi için Event Registry. (3) Hepsinde URL'yi normalize edip (`utm_` parametrelerini silerek) yinelenen haberi ayıkla, başlık benzerliğiyle grupla, sonra anahtar kelime/kaynak/duygu kurallarıyla "önemli" filtresi uygula.

## Hız sınırları ve fiyatlar

Fiyatlar 15 Ekim 2026'da resmî fiyat sayfalarından okunmuştur; vergi hariçtir.

**NewsAPI.org** [RESMÎ]
| Plan | Fiyat | İstek | Gecikme | Geçmiş | Diğer |
|---|---|---|---|---|---|
| Developer | 0 $ | 100/gün, aşım yok | 24 saat | 1 ay | CORS yalnız localhost; **staging/production'da (şirket içi dahil) kullanılamaz** |
| Business | 449 $/ay | 250.000/ay (+0,0018 $/istek) | Gerçek zamanlı | 5 yıl | CORS tüm origin |
| Advanced | 1.749 $/ay | 2.000.000/ay (+0,0009 $/istek) | Gerçek zamanlı | 5 yıl | %99,95 SLA |
| Enterprise | Teklif | Sınırsız | — | — | Kümeleme, ek veri alanları, on-premise |
Yıllık ödemede %20 indirim. Tam makale içeriği hiçbir planda yok, yalnızca URL.

**GNews** [RESMÎ]
| Plan | Aylık | İstek/gün | Makale/istek | Ticari | Geçmiş | Gecikme |
|---|---|---|---|---|---|---|
| Free | 0 € | 100 | 10 | Hayır | 30 gün | 12 saat |
| Essential | 49,99 € | 1.000 | 25 | Evet | 2020'den | Gerçek zamanlı |
| Business | 99,99 € | 5.000 | 50 | Evet | 2020'den | Gerçek zamanlı |
| Enterprise | 249,99 € | 25.000 | 100 | Evet | 2020'den | Gerçek zamanlı |
Ücretli planlar tam içerik ve tüm origin'ler için CORS içerir; 10 gün deneme. Saniye başı limit belgede yok.

**Mediastack** [RESMÎ]
| Plan | Aylık | Çağrı/ay | Haber | Ticari |
|---|---|---|---|---|
| Free | 0 $ | 100 | Gecikmeli | Hayır |
| Standard | 24,99 $ | 10.000 | Canlı | Evet |
| Professional | 99,99 $ | 50.000 | Canlı | Evet |
| Business | 249,99 $ | 250.000 | Canlı | Evet |
13 dil, tüm kaynaklar; yıllık ödemede plana göre %8–15 indirim (Standard 22,99 $, Professional 87,99 $, Business 212,99 $/ay; sayfa "up to 15%" diyor) [RESMÎ]. Sayfanın SSS'i "Basic" planından söz ediyor ama tabloda "Standard" var [ÇELİŞKİLİ].

**NewsData.io** [3. TARAF — NewsData.io'nun kendi blog sayfası; fiyat sayfası JS nedeniyle okunamadı]
| Plan | Fiyat | Kredi | Makale/kredi | Arşiv |
|---|---|---|---|---|
| Free | 0 $ | 200/gün | 10 | belgede yok |
| Basic | 199,99 $/ay | 20.000/ay | 50 | 6 ay |
| Professional | 349,99 $/ay | 50.000/ay | 50 | 2 yıl |
| Corporate | 1.299,99 $/ay | 1.000.000/ay | 50 | 10 yıl |
Ücretsiz planda 12 saat gecikme, tam içerik yok; ek kredi 0,006 $. 15 dakikalık hız sınırı değerleri doğrulanamadı.

**Event Registry / NewsAPI.ai** [RESMÎ]: Ücretsiz 2.000 arama (kart gerekmez); 5K token planı 90 $/ay; aşımda token başı 0,015 $; kullanılmayan token devretmez; arşiv 2014'ten; 50+ dil. Diğer plan fiyatları sayfada yok (satışla görüşme).

**The Guardian** [RESMÎ]: Developer key ücretsiz, **yalnız ticari olmayan** kullanım, 1 çağrı/sn, 500 çağrı/gün. Commercial key: ticari kullanım, üretken yapay zekâ modeli eğitimi, metin madenciliği vb. için başvuru ile.

**New York Times** [3. TARAF — portalın SSS'i JS ile yüklendiği için bu oturumda okunamadı]: ücretsiz anahtarla yaygın bilinen sınır **günde 500 istek, dakikada 5 istek** (istekler arası ~12 sn önerisi). Ticari kullanım ayrı lisans gerektirir.

**GDELT** [RESMÎ — API'nin kendi hata yanıtı]: Ücretsiz. "Lütfen istekleri 5 saniyede bire sınırlayın"; aşınca HTTP 429. Yoğun kullanıcılar için Web NGrams veri setine yönlendiriyor. Yanıtlar `Cache-Control: max-age=900` (15 dk) ile önbelleklenebilir.

**Google News RSS**: Fiyat yok; belgelenmiş limit yok, aşırı istekte geçici engel/CAPTCHA görülebilir [TAHMİN].

**Bing News Search API** [RESMÎ]: Microsoft, Bing Search API'lerinin (News dahil) **11 Ağustos 2025**'te tamamen kapatıldığını, yeni kayıt da alınmadığını duyurdu. Önerilen geçiş: Azure AI Agents içindeki **"Grounding with Bing Search"** — bu bir haber arama API'si değil, LLM ajanının yanıtına web verisi katan bir araçtır; ham haber listesi almak için birebir yerine geçmez [TAHMİN].

## Resmî olmayan yollar ve riskler

| Yol | Nasıl çalışır | Risk |
|---|---|---|
| Google News RSS'i ticari üründe kullanmak | `news.google.com/rss/...` beslemelerini sunucuda çekip ürüne koymak | Beslemenin kendi metni "kişisel, ticari olmayan feed reader kullanımı dışındaki her kullanım açıkça yasaktır" diyor [RESMÎ]. Ticari üründe ToS ihlali |
| Google News bağlantılarını çözmek | RSS'teki `news.google.com/rss/articles/...` bağlantıları kodlanmış yönlendirmedir; topluluk araçları (ör. `googlenewsdecoder` Python paketi) asıl URL'yi çözer [3. TARAF] | Google formatı değiştirince bozulur; ToS gri alan |
| `pygooglenews`, `GoogleNews`, `gnews` (Python) kütüphaneleri | Google News RSS/HTML'ini sarmalar | Resmî değil; bakımı düzensiz [3. TARAF] |
| Haber sitesini doğrudan kazıma (`newspaper3k`/`newspaper4k`, `trafilatura`) | HTML'den başlık/metin çıkarma | Site ToS'u, telif (metni yeniden yayımlamak), `robots.txt`; IP engeli. Türkiye'de 5846 sayılı FSEK ve basın içeriği hakları gündemde — yalnız başlık + bağlantı vermek daha güvenli [TAHMİN] |
| Ücretsiz NewsAPI.org anahtarını canlıda kullanmak | Developer planla production | Açıkça yasak [RESMÎ]; hesap kapatılabilir |
| Birden çok ücretsiz hesap açıp limiti aşmak | Anahtar rotasyonu | ToS ihlali, toplu ban |

## SDK ve kütüphaneler

| Servis | Resmî | Topluluk (.NET dahil) |
|---|---|---|
| NewsAPI.org | Resmî istemciler: Node.js (`newsapi`), Python (`newsapi-python`), C# (`NewsAPI` NuGet, [News-API-gh/News-API-csharp](https://github.com/News-API-gh/News-API-csharp) — son push 2023, NuGet 0.7.0) [RESMÎ/3. TARAF] | `NewsAPI.Net` (küçük projeler) |
| GNews | SDK yok; belge cURL/JS/Python/Java/C# örnekleri verir [TAHMİN] | Basit `HttpClient` yeterli |
| Mediastack | SDK yok (APILayer REST) | — |
| NewsData.io | Python `newsdataapi` paketi [3. TARAF] | — |
| Event Registry | Python [`eventregistry`](https://github.com/EventRegistry/event-registry-python) (Python 3.9+, aktif, Ekim 2026'da güncellendi) ve Node.js `eventregistry` [RESMÎ] | .NET için resmî SDK yok; JSON sorgu dili `HttpClient` ile kullanılabilir |
| The Guardian | Resmî SDK yok; ör. `theguardian-api-client` (Java/Scala) gibi topluluk istemcileri [3. TARAF] | — |
| NYT | Resmî SDK yok, OpenAPI tanımları var → NSwag/Kiota ile .NET istemcisi üretilebilir | — |
| GDELT | Resmî SDK yok | Python `gdeltdoc` (DOC 2.0 sarmalayıcı), `gdelt` (veri setleri) [3. TARAF] |
| Google News RSS | — | .NET: `System.ServiceModel.Syndication` (`SyndicationFeed.Load`) ile RSS okunur; `CodeHollow.FeedReader` NuGet [3. TARAF] |

## Postman / OpenAPI / koleksiyonlar

- **NYT**: Resmî OpenAPI (Swagger 2.0) tanımları — [github.com/nytimes/public_api_specs](https://github.com/nytimes/public_api_specs): `article_search`, `archive_api`, `top_stories`, `timeswire`, `most_popular_api`, `books_api`, `times_tags`… Depo 2019'dan beri güncellenmiyor; uç noktalar değişmiş olabilir [RESMÎ/TAHMİN].
- **NewsAPI.org, GNews, Mediastack, NewsData.io**: Resmî OpenAPI dosyası belgelerde bulunamadı ("belgede yok"). Postman Public API Network'te topluluk koleksiyonları var; resmîliğini kontrol edin [3. TARAF].
- **GDELT**: OpenAPI yok; parametreler blog duyurularında.
- **Guardian**: OpenAPI yok; belgelerde "Explore" etkileşimli arayüzü var.

## Depoda ilgili sayfalar

- [X (Twitter) API](../Sosyal-Medya/X-Twitter.md) — kişilerin paylaşımlarını takip için
- [Bluesky API](../Sosyal-Medya/Bluesky.md) — açık firehose ile gerçek zamanlı akış
- [Reddit API](../Sosyal-Medya/Reddit.md) — haber paylaşımlı topluluklar
- [Mastodon / Fediverse](../Sosyal-Medya/Mastodon-Fediverse.md) — RSS ve streaming destekli
- [YouTube API](../Canli-Yayin-ve-Video/YouTube.md) — haber kanallarının video/canlı yayınları (WebSub)
- [Telegram API](../Mesajlasma/Telegram.md) — haber kanallarını takip
- [GitHub API](../Gelistirici-Platformlari/GitHub.md) — sürüm/duyuru takibi (Atom beslemeleri)

## Kaynaklar

Resmî:
- [NewsAPI.org — Pricing](https://newsapi.org/pricing) — planlar, gecikme, CORS, Developer planının production yasağı — (erişim: 15 Ekim 2026)
- [NewsAPI.org — Endpoints](https://newsapi.org/docs/endpoints), [Everything](https://newsapi.org/docs/endpoints/everything), [Top headlines](https://newsapi.org/docs/endpoints/top-headlines) — parametreler, dil listesi (Türkçe yok) — (erişim: 15 Ekim 2026)
- [GNews — Pricing](https://gnews.io/pricing) — planlar ve limitler — (erişim: 15 Ekim 2026)
- [GNews — Docs](https://docs.gnews.io/) ve [Search endpoint](https://docs.gnews.io/endpoints/search-endpoint) — parametreler (q, lang, country, max, in, nullable, from, to, sortby, page, truncate; domain filtresi yok), `tr` dil/ülke desteği — (erişim: 15 Ekim 2026)
- [Mediastack — Pricing](https://mediastack.com/pricing) — planlar, aylık/yıllık fiyatlar, 13 dil — (erişim: 15 Ekim 2026)
- [Mediastack — API Documentation (APILayer)](https://docs.apilayer.com/mediastack/docs/api-documentation) — uç noktalar (JS ile yükleniyor) — (erişim: 15 Ekim 2026)
- [NewsData.io — Pricing plan yazısı](https://newsdata.io/blog/pricing-plan-in-newsdata-io/) — planlar, kredi, gecikme — (erişim: 15 Ekim 2026)
- [NewsData.io — Documentation](https://newsdata.io/documentation) — uç noktalar — (erişim: 15 Ekim 2026)
- [NewsAPI.ai (Event Registry) — Plans](https://newsapi.ai/plans) — token fiyatlandırması — (erişim: 15 Ekim 2026)
- [Event Registry Python SDK](https://github.com/EventRegistry/event-registry-python) — kimlik doğrulama ve sorgu örnekleri — (erişim: 15 Ekim 2026)
- [The Guardian Open Platform — Access](https://open-platform.theguardian.com/access/) — Developer/Commercial anahtar, limitler, Developer anahtarla makale metnine erişim (ticari olmayan kullanım) — (erişim: 15 Ekim 2026)
- [The Guardian Open Platform — Documentation](https://open-platform.theguardian.com/documentation/) — Content/Tags/Sections/Editions/Single Item — (erişim: 15 Ekim 2026)
- [NYT Developer Portal](https://developer.nytimes.com/) ve [FAQ](https://developer.nytimes.com/faq) — anahtar ve limitler (JS ile yükleniyor) — (erişim: 15 Ekim 2026)
- [NYT public_api_specs (GitHub)](https://github.com/nytimes/public_api_specs) — resmî OpenAPI tanımları — (erişim: 15 Ekim 2026)
- [GDELT DOC 2.0 API duyurusu](https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/) — parametreler, modlar, operatörler — (erişim: 15 Ekim 2026)
- [GDELT DOC API canlı uç noktası](https://api.gdeltproject.org/api/v2/doc/doc?query=sourcecountry:turkey&mode=artlist&format=json&maxrecords=3&timespan=1h) — Türkçe sonuç ve "5 saniyede 1 istek" uyarısı doğrudan test edildi — (erişim: 15 Ekim 2026)
- [Google News RSS (Türkiye)](https://news.google.com/rss?hl=tr&gl=TR&ceid=TR:tr) — beslemedeki kullanım şartı metni — (erişim: 15 Ekim 2026)
- [Microsoft — Bing Search APIs Retiring on August 11, 2025](https://learn.microsoft.com/en-us/lifecycle/announcements/bing-search-api-retirement) — kapanış ve "Grounding with Bing Search" önerisi — (erişim: 15 Ekim 2026)

3. taraf:
- [NewsAPI C# istemcisi](https://github.com/News-API-gh/News-API-csharp) — NuGet `NewsAPI` — (erişim: 15 Ekim 2026)

Not: Bu sayfa hazırlanırken oturumun web arama kotası dolduğu için bazı sayfalar (NYT SSS, NewsData.io ve Mediastack belgeleri) JavaScript ile yüklendiğinden okunamadı; ilgili satırlar [3. TARAF]/[TAHMİN] olarak işaretlidir ve bir sonraki doğrulamada kontrol edilmelidir.
