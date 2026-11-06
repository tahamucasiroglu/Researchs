# IndexNow API (açık URL bildirim protokolü)

> Yazılma tarihi: 6 Kasım 2026 · Son doğrulama: 6 Kasım 2026 · Durum: **aktif** (açık protokol; hesapsız ve ücretsiz; yalnız kendi alan adın için yazma yönlü bildirim; Google katılmıyor)

## Özet

IndexNow, bir sitenin yeni eklenen, güncellenen, silinen ya da yönlendirilen URL'lerini arama motorlarına **anında bildirmesini** sağlayan açık bir protokoldür. En basit hâliyle bir "ping"dir: "bu adres değişti" der, içeriği taşımaz [RESMÎ]. Microsoft Bing ve Yandex tarafından Ekim 2021'de başlatıldı [3. TARAF]; belirtim CC BY-SA 4.0 lisanslıdır ve kullanım şartlarındaki sponsorlar Microsoft, Yandex ve Seznam.cz'dir [RESMÎ]. Hesap, başvuru ya da ücret gerekmez: site sahibi 8–128 karakterlik bir anahtar üretir, anahtarı sitesinde `<ANAHTAR>.txt` dosyasında yayımlar ve URL'leri tek tek `GET` ya da istek başına en çok 10.000 URL'lik `POST` ile gönderir [RESMÎ]. Anahtarı doğrulanan URL'ler bütün katılımcı motorlarla paylaşıldığı için tek bir uç noktaya göndermek yeter [RESMÎ]. Katılımcı listesi indexnow.org'un kendi sayfaları arasında bile farklıdır: Bing, Yandex, Seznam.cz, Naver ve Yep her listede; Amazon (Amazonbot) SSS'de ve `searchengines.json`'da; Internet Archive yalnız `searchengines.json`'da [ÇELİŞKİLİ]. **Google katılmıyor** [RESMÎ: hiçbir listede yok]. IndexNow yalnız **yazma yönlü** bir bildirimdir: taramayı ve dizine almayı garanti etmez, sıralama etkeni değildir, motordan geri bildirim almaz ve başka sitelerin yeni sayfalarını öğrenmeye yaramaz [RESMÎ]. Bing'e özgü URL Submission ve Content Submission API'leri (Bing Webmaster API) ile Yandex Webmaster API'nin yeniden tarama kuyruğu ise ayrı hesap, ayrı gizli anahtar ve günlük kotayla çalışan, tek motora özgü yollardır; Microsoft Kasım 2025'ten beri gerçek zamanlı gönderim için IndexNow'u **birincil yöntem** olarak öneriyor [RESMÎ]. Bing'e göre (Aralık 2024) günde 3,5 milyarı aşkın URL gönderiliyor [RESMÎ].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Herkese açık (hesapsız)** | Hesap ya da başvuru yok. Kendi ürettiğin anahtar ve bu anahtarı sitende (kökte ya da `keyLocation` ile gösterilen yerde) yayımlayabilmek, yani siteye dosya koyma yetkisi [RESMÎ] | IndexNow `GET`/`POST` gönderimi ve bütün katılımcılara otomatik paylaşım; katılımcı listesi (`searchengines.json`) ve motorların `meta.json` dosyaları [RESMÎ] | Ücretsiz [RESMÎ]. Kesin hız sınırı yayımlanmaz, her motor site başına kendi günlük eşiğini koyar; istek başına ≤10.000 URL; aşırı gönderimde 429 [RESMÎ] |
| **Geliştirici hesabı (ücretsiz)** | **Bing:** Bing Webmaster Tools hesabı (Microsoft hesabı; Microsoft Learn'deki erişim ve OAuth sayfalarına göre Google ya da Facebook kimliği de olur) + site doğrulaması; API anahtarı (kullanıcı başına bir tane) ya da OAuth 2.0 istemcisi [RESMÎ]. **Yandex:** Yandex Webmaster'da doğrulanmış site + Yandex OAuth uygulaması [RESMÎ] | **Bing:** IndexNow Insights raporu (portal); Bing Webmaster API: `SubmitUrl`, `SubmitUrlbatch`, `SubmitContent`, `GetUrlInfo`, kota sorguları, site haritası gönderimi (`SubmitFeed`) [RESMÎ]. **Yandex:** Webmaster API `recrawl/queue` ve `recrawl/quota` [RESMÎ] | Ücretsiz; site başına günlük kota, rakamı yayımlanmaz, API'den okunur [RESMÎ] |
| **İşletme / uygulama onayı** | Site sahibi için böyle bir adım yok [RESMÎ: belgede yok]. Onay yalnız **arama motorlarının** katılımı içindir: en az bir pazarda kayda değer varlık ya da arama pazarıyla yakın bağ ve gönderim hacmine önemli katkı [RESMÎ] | — | — |
| **Ücretli / kurumsal** | Yok. Bing protokolü "ücretsiz, açık kaynak" diye tanımlar [RESMÎ] | Bazı CMS eklentileri ücretli: Yoast SEO'da IndexNow yalnız Premium'da; Yandex'in listelediği eklentilerin çoğu ücretli [RESMÎ] | Eklentiye göre |
| **Resmî olmayan** | Gerek yok | Başkasının alan adı için gönderim anahtar doğrulamasıyla engellenir (403/422). Motorlar arası paylaşım logları yalnız katılımcı motorların IP aralıklarına açık [RESMÎ] | — |

## Kimlik doğrulama

### IndexNow: anahtar ve anahtar dosyası

- **Yöntem:** OAuth ya da hesap yoktur; kimlik, **alan adı sahipliğinin** kanıtlanmasıdır. Motor, istekteki `key` değerini sitedeki anahtar dosyasının içeriğiyle karşılaştırır; Yandex bunu her istekte yapar [RESMÎ].
- **Anahtar biçimi:** 8–128 karakter; yalnız `a-z`, `A-Z`, `0-9` ve `-` [RESMÎ]. indexnow.org aynı cümlede "onaltılık (hexadecimal) karakter" der, ama izin verdiği karakter kümesi onaltılıktan geniştir [ÇELİŞKİLİ: belge kendi içinde]. İki okumaya da uyan güvenli seçim 32 karakterlik onaltılık bir değerdir, ör. tiresiz GUID (.NET: `Guid.NewGuid().ToString("N")`) [TAHMİN]. SSS, anahtar için GUID/UUID üreticisi önerir [RESMÎ].
- **Seçenek 1 (önerilen), kökte dosya:** `https://www.ornek.com/<ANAHTAR>.txt`. Dosya adı anahtarın kendisidir, içinde anahtar yazar, kodlaması UTF-8'dir; dosya herkese açık (oturum açmadan) erişilebilir olmalıdır [RESMÎ]. Yandex'e göre dosyada HTML işaretlemesi bulunmamalıdır [RESMÎ]. Dosyayı BOM'suz UTF-8 kaydetmek güvenlidir [TAHMİN: belgeler BOM'dan söz etmez]; Windows PowerShell 5.1'de `-Encoding UTF8` dosyayı BOM'lu yazar, PowerShell 7'nin varsayılanı ise BOM'suz `utf8NoBOM`'dur [RESMÎ: about_Character_Encoding].
- **Seçenek 2, başka konumda dosya:** Dosya aynı host'ta istenen klasöre konur ve her istekte `keyLocation` ile tam adresi verilir; bu durumda dosya adının anahtarla aynı olması gerekmez: indexnow.org'daki örnek `myIndexNowKey63638.txt`, Yandex'teki örnek `key12457EDd.txt` [RESMÎ: örneklerden; açık kural olarak yazılmamış]. **Kapsam** dosyanın bulunduğu klasörle sınırlıdır: `/catalog/` altındaki anahtar `/help/` altındaki URL'ler için geçmez; kapsam dışı URL'ler "dizine alma için dikkate alınmayabilir" [RESMÎ].
- **Host kuralları:** Her alt alan adı ayrı bir host'tur ve kendi anahtar dosyasını ister [RESMÎ]. Yandex'e göre aynı anahtar iki ya da daha fazla alan adında kullanılabilir (her birinde dosya olmak şartıyla); sitede birden fazla CMS varsa her biri için ayrı anahtar önerir [RESMÎ].
- **Doğrulama:** Motorlar URL gönderildikten sonra anahtar dosyasını tarar; yeni anahtarla gelen ilk isteklerde `202 Accepted` ("anahtar doğrulaması bekleniyor") olağandır. Motorlar anahtarı sen değiştirene kadar kullanır [RESMÎ].
- **Anahtar gizli mi?** indexnow.org "anahtarı ve dosya konumunu yalnız sen ve arama motorları bilmeli" der, ama dosya herkese açık durmak zorundadır [RESMÎ]. Yani anahtar bir parola değil, tahmin edilmesi zor bir dosya adıdır; verdiği yetki yalnız **o host'taki URL'ler için bildirim yapmaktır** [TAHMİN]. Yandex'e göre anahtarı değiştirmek gerekmez; üçüncü kişiler öğrendiyse değiştirilebilir [RESMÎ]. Değiştirirken yeni dosyayı yayımla, yeni anahtarla göndermeye başla (ilk isteklerde 202 beklenir), eski dosyayı sonra kaldır [TAHMİN: belgede adım sırası yok].

### Bing Webmaster API

- İki yöntem var: **OAuth 2.0 (önerilen)** ve **API anahtarı** [RESMÎ].
- **API anahtarı:** Bing Webmaster Tools → Settings → API Access → Generate API Key. Kullanıcı başına **tek** anahtar üretilir; anahtar siteye değil kullanıcıya bağlıdır, bu yüzden doğruladığın bütün sitelerde geçer. İsteklerde sorgu dizesinde `apikey=` olarak gönderilir. Belge "API anahtarını üçüncü kişilere verme" der; sızarsa silip yenisini üret, eskisine bağlı uygulamalar çalışmayı bırakır [RESMÎ].
- **OAuth 2.0:** Aynı ekrandan OAuth istemcisi kaydedilir: ad ve Redirect URI girilir, Client ID ile Client Secret verilir. Yetkilendirme adresi `https://www.bing.com/webmasters/oauth/authorize`, token adresi `https://www.bing.com/webmasters/oauth/token`; kapsamlar `webmaster.read` (okuma) ve `webmaster.manage` (okuma + yazma). Yetki kodu 5 dakika, erişim token'ı yaklaşık 1 saat (`expires_in: 3599`) geçerlidir; yenileme token'ı kullanıcı izni geri alana kadar geçerlidir. Çağrılar `Authorization: Bearer <TOKEN>` başlığıyla `https://www.bing.com/webmaster/api.svc/json/<Metot>` adresine yapılır [RESMÎ]. Belgedeki yenileme parametre tablosu `grant_type=authorization_code` yazıyor, örnek istek ise `grant_type=refresh_token` kullanıyor; OAuth 2.0 standardına uyan ikincisidir. Aynı örnekte yol `POST /webmasters/token` diye yazılmış, metindeki adres ise `/webmasters/oauth/token` [ÇELİŞKİLİ: belge içi].
- **Karıştırma:** IndexNow anahtarı herkese açık dosyada duran bir **site** anahtarıdır; Bing API anahtarı ise gizli tutulması gereken bir **hesap** anahtarıdır. Biri diğerinin yerine geçmez [RESMÎ: iki ayrı belge].

### Yandex Webmaster API

- OAuth 2.0 kullanılır. Uygulama Yandex OAuth'ta kaydedilir; Rusça adım adım rehbere göre kapsamlar `webmaster:hostinfo` ve `webmaster:verify`'dır, token 6 ay geçerlidir [RESMÎ]. Token `Authorization` başlığında gönderilir; token'sız istek `401 Unauthorized` döner [RESMÎ]. Başlığın tam biçimi (`OAuth <TOKEN>`) bu sayfalarda yazmıyor [TAHMİN: Yandex API'lerinin genel biçimi].
- `user-id` değeri `GET /v4/user`'dan, `host-id` değeri `GET /v4/user/{user-id}/hosts`'tan alınır [RESMÎ].
- Yandex'in **IndexNow** uç noktası (`https://yandex.com/indexnow`) bunların hiçbirini istemez; yalnız IndexNow anahtarıyla çalışır [RESMÎ].

## Temel uç noktalar

Genel uç nokta: `https://api.indexnow.org/indexnow`. Motorların kendi uç noktaları aşağıdaki ikinci tabloda. Yol yazımı: indexnow.org belgesi `/indexnow`, Bing'in başlangıç sayfası `POST /IndexNow` kullanır; ikisi de resmî örneklerde geçer, büyük-küçük harf duyarlılığı belgede yok [RESMÎ]. Küçük harf kullanmak güvenlidir [TAHMİN].

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `https://api.indexnow.org/indexnow?url={URL}&key={ANAHTAR}` (gerekirse `&keyLocation={dosya}`) | Tek URL bildirir (eklenen, güncellenen, silinen) | Herkese açık | `url` RFC 3986'ya göre kodlanmalı (`:` → `%3A`, `/` → `%2F`) [RESMÎ] |
| POST | `https://api.indexnow.org/indexnow` | Toplu bildirim; gövde JSON (`host`, `key`, `keyLocation`, `urlList`) | Herkese açık | ≤10.000 URL; `Content-Type: application/json; charset=utf-8`; http ve https URL'ler aynı istekte olabilir [RESMÎ] |
| GET/POST | Motorların kendi uç noktaları (aşağıda) | Aynı işlev, doğrudan o motora | Herkese açık | Hangisine gönderilirse gönderilsin paylaşım otomatik; ayrıca her motora göndermeye gerek yok [RESMÎ] |
| GET | `https://www.ornek.com/<ANAHTAR>.txt` | Anahtar dosyası; motorlar okur | Senin sunucun | Herkese açık ve oturumsuz erişilebilir olmalı [RESMÎ] |
| GET | `https://www.indexnow.org/searchengines.json` → her motorun `/indexnow/meta.json` dosyası | Katılımcı listesi; motorun `api`, `host`, `notifierIPs`, `publicKeys`, `logs`, `unsubscribe` alanları | Herkese açık | Motorlar listeyi en az 24 saatte bir okur [RESMÎ] |
| POST | `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey={BING_API_ANAHTARI}` | Yalnız Bing'e toplu URL; gövde `{"siteUrl": "...", "urlList": [...]}` | Geliştirici hesabı | İstek başına ≤500 URL ve kalan kota kadar [RESMÎ] |
| POST | `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=...` | Yalnız Bing'e tek URL; gövde `{"siteUrl", "url"}` | Geliştirici hesabı | Kota `GetUrlSubmissionQuota` ile okunur [RESMÎ] |
| GET | `https://ssl.bing.com/webmaster/api.svc/json/GetUrlSubmissionQuota?siteUrl={site}&apikey=...` | Günlük ve aylık URL kotası (`DailyQuota`, `MonthlyQuota`) | Geliştirici hesabı | [RESMÎ] |
| POST | `https://ssl.bing.com/webmaster/api.svc/json/SubmitContent?apikey=...` | URL yerine içeriği gönderir: `httpMessage` (durum satırı + başlıklar + gövde, base64), `structuredData`, `dynamicServing` | Geliştirici hesabı | ≤10 MB sıkıştırılmamış, gzip destekli; kota `GetContentSubmissionQuota` [RESMÎ] |
| GET | `https://ssl.bing.com/webmaster/api.svc/json/GetUrlInfo?siteUrl=...&url=...&apikey=...` | Bing'in bir URL hakkındaki bilgisi: keşif ve son tarama tarihi, HTTP durumu, boyut | Geliştirici hesabı | Gönderilen URL'nin taranıp taranmadığını kontrol etmeye yarar [RESMÎ] |
| POST | `https://api.webmaster.yandex.net/v4/user/{user-id}/hosts/{host-id}/recrawl/queue` | Yalnız Yandex'te tek URL'yi yeniden tarama kuyruğuna ekler; gövde `{"url": "..."}` | Geliştirici hesabı (OAuth) | `202` + `task_id`, `quota_remainder`; `409 URL_ALREADY_ADDED`; `429 QUOTA_EXCEEDED` [RESMÎ] |
| GET | `https://api.webmaster.yandex.net/v4/user/{user-id}/hosts/{host-id}/recrawl/quota` | Günlük yeniden tarama kotası (`daily_quota`, `quota_remainder`) | Geliştirici hesabı (OAuth) | `404 HOST_NOT_VERIFIED`: site doğrulanmamış [RESMÎ] |

### Katılımcı motorlar ve uç noktaları (6 Kasım 2026)

| Motor | Uç nokta | `searchengines.json` | SSS | Ana sayfa | Not |
|---|---|---|---|---|---|
| Genel uç nokta (motor değil) | `https://api.indexnow.org/indexnow` | — | Evet | — | SSS'de "IndexNow global" olarak geçer [RESMÎ] |
| Microsoft Bing | `https://www.bing.com/indexnow` | Evet | Evet | Evet | Kurucu [3. TARAF] |
| Yandex | `https://yandex.com/indexnow` | Evet | Evet | Evet | Kurucu; kendine özgü hata mesajları var (aşağıda) [RESMÎ] |
| Seznam.cz | `https://search.seznam.cz/indexnow` | Evet | Evet | Evet | [RESMÎ] |
| Naver | `https://searchadvisor.naver.com/indexnow` | Evet | Evet | Evet | Temmuz 2023'ten beri destekliyor [3. TARAF]. `meta.json`'da `unsubscribe: false`, `logs` alanı boş [RESMÎ: gözlem, 6 Kasım 2026] |
| Yep | `https://indexnow.yep.com/indexnow` | Evet | Evet | Evet | [RESMÎ] |
| Amazon (Amazonbot) | `https://indexnow.amazonbot.amazon/indexnow` | Evet | Evet | — | Microsoft Mayıs 2025'te "Amazon Haziran ortasında benimsemeye başlayacak" dedi [3. TARAF]. Amazon'un kendi Amazonbot sayfası IndexNow'dan söz etmiyor [RESMÎ] |
| Internet Archive | `https://internetarchive.indexnow.org/indexnow` | Evet | — | — | `meta.json`'da `unsubscribe: true`: anlık bildirim istemiyor, paylaşımı loglardan çekiyor [RESMÎ]. Bing Aralık 2024'te benimseyenler arasında saydı [RESMÎ]; Nisan 2026'da yeni destek haberi çıktı [3. TARAF] |
| Google | — | — | — | — | **Katılmıyor.** Kasım 2021'de "protokolün olası yararlarını test edeceğiz" demişti [3. TARAF]; sonrasında katılım duyurusu bulunamadı. Google'ın yeniden tarama belgesi IndexNow'dan söz etmez [RESMÎ] |

DuckDuckGo ve Yahoo listede yok; sonuçlarını Bing'den aldıkları ölçüde dolaylı etkilenebilirler [TAHMİN].

### POST gövdesi (JSON)

| Alan | Zorunlu | Açıklama |
|---|---|---|
| `host` | Evet | URL'lerin ait olduğu host, şemasız (ör. `www.ornek.com`). URL'ler bu host'a ait değilse 422 [RESMÎ] |
| `key` | Evet | IndexNow anahtarı [RESMÎ] |
| `keyLocation` | Seçenek 2'de evet | Anahtar dosyasının tam adresi; dosya kökteyse isteğe bağlı [RESMÎ] |
| `urlList` | Evet | Mutlak URL dizisi: boş olamaz, yalnız metin (string) içerir, en çok 10.000 öğe [RESMÎ] |

### Yanıt kodları

| Kod | indexnow.org'a göre | Yandex'e göre | Ne yapmalı |
|---|---|---|---|
| `200 OK` | URL alındı | Anahtar doğrulandı, URL'ler gönderildi (`content-type: application/json`) | Bir şey yapma; dizine alınma garanti değil |
| `202 Accepted` | URL alındı, anahtar doğrulaması bekleniyor | Yeni anahtar doğrulama bekliyor; sürüyorsa anahtar henüz kayda geçmemiştir | Biraz bekle, sonra diğer URL'leri gönder |
| `400 Bad Request` | Geçersiz biçim | (POST) `Invalid params` | JSON'u, URL kodlamasını, eksik alanları kontrol et |
| `403 Forbidden` | Anahtar geçersiz: dosya bulunamadı ya da içinde anahtar yok | `Invalid key`: anahtar yüklenemedi ya da URL'lerle eşleşmiyor | Dosya yayında mı, içerik birebir aynı mı, WAF/CDN motor botunu engelliyor mu bak |
| `405` | — (tabloda yok) | `Method not allowed`: yalnız GET ve POST | Yöntemi düzelt |
| `422 Unprocessable Entity` | URL'ler host'a ait değil ya da anahtar şemaya uymuyor | `Invalid url`, `Invalid key location`, anahtar uzunluk/karakter hataları, `No host provided`, `No more than 10000 urls allowed`, boş ya da dizi olmayan `urlList` | `host` ile URL'leri, `keyLocation` kapsamını, anahtar biçimini ve paket boyutunu düzelt |
| `429 Too Many Requests` | Çok fazla istek (olası spam) | IP başına istek sınırı aşıldı | `Retry-After` kadar bekle; aynı URL'yi en erken 10 dk sonra gönder; daha seyrek ve küçük paketler kullan |

Kaynak: indexnow.org belgesi ve SSS, Yandex IndexNow başvurusu [RESMÎ]. Bing'in başlangıç sayfasındaki tablo `202`'yi göstermez; 422'yi ise indexnow.org gibi "URL'ler host'a ait değil ya da anahtar şemaya uymuyor" diye tanımlar [RESMÎ]. SSS, değişmemiş URL'leri tekrar tekrar göndermeyi de 422 nedenleri arasında sayar [RESMÎ]. SSS ayrıca eksik ya da erişilemeyen anahtar dosyasını 422, eksik ya da yanlış anahtarı 400 nedenleri arasında sayar; belge ve Bing ise anahtarın bulunamamasını 403'e bağlar [ÇELİŞKİLİ: SSS ile belge]. Bu yüzden 400, 403 ya da 422 alınınca önce anahtar dosyasına bakılır [TAHMİN].

### Örnek istekler

```bash
# Tek URL (GET); url parametresi RFC 3986'ya göre kodlanır
curl -i "https://api.indexnow.org/indexnow?url=https%3A%2F%2Fwww.ornek.com%2Fhizmetler%2Fyeni-sayfa&key=<ANAHTAR>"

# Toplu gönderim (POST)
curl -i -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
        "host": "www.ornek.com",
        "key": "<ANAHTAR>",
        "keyLocation": "https://www.ornek.com/<ANAHTAR>.txt",
        "urlList": [
          "https://www.ornek.com/hizmetler/yeni-sayfa",
          "https://www.ornek.com/kaldirilan-sayfa"
        ]
      }'

# Bing Webmaster API: yalnız Bing'e toplu URL (ayrı ve gizli API anahtarıyla)
curl -i -X POST "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=<BING_API_ANAHTARI>" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{"siteUrl":"https://www.ornek.com","urlList":["https://www.ornek.com/hizmetler/yeni-sayfa"]}'
```

## Gerçek zamanlı / bildirim

- **Yön tek taraflıdır:** IndexNow'da "push" siteden motora doğrudur. Motorlar siteye webhook ya da geri çağrı göndermez; `200`/`202` yalnız isteğin alındığını gösterir [RESMÎ].
- **Motorlar arası paylaşım:** Bir motor, anahtarını doğruladığı URL'leri doğrulamadan sonraki **10 saniye içinde** diğer katılımcılara `POST /indexnow?noreping` ile iletir. İstekler `X-IN-Notifier`, `X-IN-Notifier-Public-Key` ve `X-Signed-Payload-Digest` başlıklarıyla RSA imzalıdır, gövde SHA-256 özetiyle doğrulanır; `noreping` alıcıya listeyi yeniden dağıtmamasını söyler [RESMÎ]. Kaçan bildirimler için her motor en az günde bir dönen ve en az bir hafta saklanan sıkıştırılmış TSV loglar (satır başına zaman damgası + URL) yayımlar; loglara yalnız katılımcıların `notifierIPs` aralıklarından erişilir [RESMÎ]. 6 Kasım 2026'da Bing ve Yandex log adresleri dışarıdan `403` döndü. Seznam'ın log listesi (`manifest.json`) dışarıdan açılıyor, ama listedeki log dosyaları da `403` döndü. Yep ve Amazonbot'un `meta.json`'unda `logs` alanı yok, Naver'inki boş [RESMÎ: gözlem].
- **`unsubscribe`:** `meta.json`'da `unsubscribe: true` diyen motor anlık bildirim almaz; Internet Archive böyledir [RESMÎ].
- **Sonucu izlemek:**
  - **Bing Webmaster Tools → IndexNow Insights** (Mart 2024): gönderilen, taranan ve dizine alınan URL sayıları; son 1.000 gönderimin dizin durumu ve ilk dizinlenme tarihi; gönderim kaynağı (Cloudflare, WordPress, elle); içerik kalitesi, robots.txt engeli, taranmadı, ölü bağlantı gibi hata grupları; "Important URLs Missing" sekmesi [RESMÎ]. Bu rapor portaldadır; Bing Webmaster API'de IndexNow'a özel bir rapor metodu belgede yok. `GetUrlInfo` ise bir URL'nin keşif ve son tarama tarihini, HTTP durumunu verir [RESMÎ].
  - **Yandex Webmaster:** IndexNow gönderimlerinin hangi raporda göründüğü belgede yok. Elle ya da API ile yapılan yeniden tarama istekleri "Indexing → Reindex pages" altında "In queue / Request processed / Error" durumlarıyla izlenir; kuyruktaki URL'nin ziyareti 3 günü bulabilir [RESMÎ].
- **robots.txt:** Bing, IndexNow ile gönderilen URL'lerde "robots disallowed" durumunu ayrı bir hata grubu olarak gösterir [RESMÎ]; yani bildirim robots.txt engelini aşmaz [TAHMİN].
- **WebSocket / stream / WebSub:** IndexNow'da yok. Google tarafında RSS/Atom akışları için WebSub ve site haritası kullanılır ([SEO rehberi Bölüm 9](../../Rehberler/SEO/09-tarama-ve-dizin.html#site-haritasi-gonderme)).

## Neler mümkün

| İş | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Kendi sitende yeni ya da güncellenen sayfayı motorlara bildirmek | **Evet** | IndexNow `GET`/`POST` | Herkese açık | Tarama ve dizine alma garanti değil; gönderilen her URL tarama kotasından düşer, karşılığında genelde öncelikli taranır [RESMÎ] |
| Silinen (404/410) ya da yönlendirilen (301/302, meta refresh) URL'yi bildirmek | **Evet** | IndexNow | Herkese açık | Motorların dizini çabuk temizlemesine yarar; Yandex'te sonuçlardan düşmesi iki haftayı bulabilir [RESMÎ] |
| Tek istekle birden çok motora ulaşmak | **Evet** | Herhangi bir uç nokta | Herkese açık | Her motor kendi kararını verir; biri dizine alıp öteki almayabilir [RESMÎ] |
| Google'a bildirmek | **Hayır** | Site haritası (+ robots.txt `Sitemap:` satırı), Search Console URL Denetimi | Search Console | Indexing API yalnız `JobPosting` ya da `VideoObject` içinde `BroadcastEvent` taşıyan sayfalar içindir; gönderimler spam denetiminden geçer, çoklu hesapla kota aşmak dahil kötüye kullanım erişimin iptaline yol açabilir [RESMÎ] |
| Başkasının alan adındaki URL'yi göndermek | **Hayır** | — | — | Anahtar dosyası o host'ta olmalı; değilse 403/422 [RESMÎ] |
| Bütün siteyi bir kerede göndermek | **Genelde hayır** | Site haritası | — | IndexNow son değişiklikler içindir; taşıma ya da yeniden tasarım sonrası toplu gönderim kabul edilir [RESMÎ] |
| IndexNow'u kurmadan önce değişmiş sayfaları göndermek | **Önerilmez** | Doğru `lastmod`'lu site haritası | — | Bing ve SSS: yalnız kurulumdan sonra eklenen, değişen ya da silinenleri gönder [RESMÎ] |
| Gönderilen URL dizine girdi mi, öğrenmek | **IndexNow ile hayır** | Bing IndexNow Insights (portal), Bing `GetUrlInfo`, Yandex Webmaster | Geliştirici hesabı | IndexNow yanıtı yalnız "alındı" der [RESMÎ] |
| Kullanıcı içeriğini (yorum, forum, değerlendirme) bildirmek | **Evet, seyrelterek** | IndexNow | Herkese açık | SSS örneği: ilk 20 yorumda her biri için, 100'e kadar 5'te bir, 1.000'e kadar 10'da bir bildirim [RESMÎ] |
| Ürün fiyat ve stok değişikliğini Bing alışverişe yansıtmak | **Evet (Bing)** | IndexNow + schema.org `Product` yapılandırılmış verisi | Herkese açık | Microsoft (Mayıs 2025): "IndexNow bir şeyin değiştiğini, yapılandırılmış veri neyin değiştiğini söyler"; ayrı ürün akışı gerekmeyebilir [3. TARAF] |
| Arşivlenmeyi hızlandırmak (Internet Archive) | **Belirsiz** | IndexNow | Herkese açık | Internet Archive yalnız `searchengines.json`'da; anlık bildirim almıyor [ÇELİŞKİLİ] |
| **Takip uygulaması:** başka sitelerin yeni sayfalarını IndexNow'dan öğrenmek | **Hayır** | — | — | Herkese açık okuma uç noktası ya da akış yok; paylaşım logları yalnız katılımcı motorlara açık [RESMÎ]. Yerine RSS/Atom, site haritası yoklaması ya da platformların kendi API'leri kullanılır |
| **Takip uygulaması:** uygulamanın ürettiği herkese açık sayfaları (olay, özet sayfaları) hızlı keşfettirmek | **Evet** | IndexNow (yayımlama olayına bağlı) | Herkese açık | Yalnız herkese açık, kalıcı URL'leri gönder; gönderilen her URL bütün katılımcılarla paylaşılır [RESMÎ] |

**Sonuç:** IndexNow, sahip olduğun bir sitedeki değişikliği Bing, Yandex ve diğer katılımcılara saniyeler içinde duyurmanın en ucuz yoludur: tek istek bütün katılımcılara ulaşır ve hesap gerektirmez. Ama yalnız yazma yönlüdür; Google'a ulaşmaz, dizine almayı garanti etmez ve başka sitelerden veri okumaz. Takip uygulaması açısından IndexNow bir **çıkış** aracıdır, giriş değil: uygulamanın kendi ürettiği herkese açık sayfaları duyurur, başka sitelerdeki yeniliği yakalamak için RSS/Atom, site haritası yoklaması ya da platformların kendi API'leri gerekir.

### Durum → Sonuç

- **WordPress kullanıyorsun** → Microsoft'un ücretsiz IndexNow eklentisi ya da zaten kullandığın SEO eklentisinin IndexNow özelliği (Rank Math'te ücretsiz modül, Yoast'ta yalnız Premium) yeterli. Aynı anda birden fazlasını açma; aynı URL iki kez gider [TAHMİN].
- **Wix Studio, Duda, GoDaddy, Shopify, XenForo ya da Milestone kullanıyorsun** → Destek yerleşik, ek bir şey gerekmez [RESMÎ: Bing listesi]. Üstüne ayrıca eklenti kurma.
- **Site Cloudflare arkasında** → Crawler Hints tek ayarla açılır [RESMÎ]. Site içi arama gibi dışarıdan URL üretilebilen sayfalar varsa önce bunları `noindex` ile dışla (aşağıdaki spam riski).
- **Kendi yazdığın uygulama (.NET, Node.js, Python…)** → İçerik yayımlama, güncelleme ve silme olayına bağlı bir HTTP çağrısı; URL başına 5–10 dakikalık tekilleştirme, 10.000'lik paketler ve 429'da `Retry-After` beklemesi (aşağıdaki .NET örneği).
- **Statik site (Hugo, Jekyll, Astro; GitHub Pages, Netlify…)** → Anahtar dosyasını yayın klasörüne koy; derlemeden sonra önceki ve yeni site haritasını karşılaştırıp yalnız eklenen, `lastmod`'u değişen ve kaldırılan URL'leri POST et [TAHMİN].
- **Birden çok alt alan adı** (`www`, `blog`, `magaza`…) → Her biri ayrı host'tur: her birinin kökünde anahtar dosyası olur, istekler alt alan başına ayrılır [RESMÎ].
- **Az sayfalı, seyrek güncellenen site** → IndexNow yine işe yarar [RESMÎ: SSS]; kurmak istemiyorsan Bing ve Yandex panellerinden elle istek de yeter (Yandex "Reindex pages") [RESMÎ].
- **Kitlen ağırlıkla Türkiye'de** → Yandex'in Türkiye payı yüksek olduğu için (Eylül 2026'da yaklaşık %25 [3. TARAF: SEO rehberindeki StatCounter verisi]) IndexNow'un Yandex ayağı önemlidir; Yandex Webmaster'da site bölgesini de ayrıca ayarla ([SEO rehberi Bölüm 14 § 2](../../Rehberler/SEO/14-diger-motorlar-ve-yz.html#yandex)).
- **Asıl hedefin Google** → IndexNow işe yaramaz. Site haritası, robots.txt `Sitemap:` satırı ve Search Console URL Denetimi kullanılır; sayfa iş ilanı ya da canlı yayınsa Indexing API [RESMÎ].
- **Bir müşterinin sitesi için kuruyorsun** → Anahtar dosyasını o sitenin köküne koyabilecek yetkin olmalı, yoksa gönderim çalışmaz [RESMÎ]. Bing Webmaster API için siteye kullanıcı olarak eklenmen gerekir; API'de site erişimini başka kullanıcıya devreden `AddSiteRoles` metodu var [RESMÎ].

## Bing ve Yandex Webmaster API'leriyle ilişkisi

| | IndexNow | Bing URL Submission API | Bing Content Submission API | Yandex Webmaster API (yeniden tarama) |
|---|---|---|---|---|
| Hesap | Yok | Bing Webmaster Tools + doğrulanmış site | Aynı | Yandex Webmaster + doğrulanmış site |
| Kimlik | Sitedeki anahtar dosyası | API anahtarı (`apikey`) ya da OAuth 2.0 | Aynı | OAuth 2.0 token |
| Ulaştığı motorlar | Bütün katılımcılar | Yalnız Bing | Yalnız Bing | Yalnız Yandex |
| İstek başına | ≤10.000 URL | ≤500 URL (`SubmitUrlbatch`) | 1 URL + içerik, ≤10 MB | 1 URL |
| Kota | Yayımlanmaz; her motor site başına günlük eşik koyar | Site başına günlük (ayrıca aylık alanı); `GetUrlSubmissionQuota` | `GetContentSubmissionQuota` | Günlük; `recrawl/quota` |
| Durum (6 Kasım 2026) | Bing'in birincil önerisi | Belgeli; JSON sürümü destekleniyor | "İleri kullanım ve özel platform entegrasyonları için" destekleniyor | Belgeli |

- **Bing'in yönü:** 2019 tarihli "günde 10.000 URL" duyurusuna ve 2021 tarihli Content Submission API rehberine Kasım 2025'te şu not eklendi: "Microsoft now recommends using IndexNow as the primary method for real-time URL submission to Bing and participating search engines." Content Submission rehberindeki notta API'nin ileri kullanım senaryoları için desteklenmeye devam ettiği de yazıyor [RESMÎ]. Eski `bing.com/webmasters/url-submission-api` adresi 6 Kasım 2026'da IndexNow tanıtım sayfasını gösteriyor [RESMÎ: gözlem]. URL Submission API'nin kapatıldığına dair bir duyuru bulunamadı [doğrulanamadı].
- **SOAP ve POX kapandı:** Bing Webmaster API'nin SOAP ve POX (düz XML) sürümleri 31 Ağustos 2026'da emekliye ayrıldı (tarih Microsoft Learn'deki "Migrate to our REST APIs" notunda); JSON/HTTP sürümü sürüyor [RESMÎ]. 6 Kasım 2026'da `api.svc/soap`, `api.svc/pox/...` ve `api.svc?wsdl` adresleri `404`, `api.svc/json/...` ise geçersiz anahtarla `400` döndü [RESMÎ: gözlem]. Duyuruya göre mevcut API anahtarları, kotalar ve izinler değişmedi [3. TARAF: Microsoft duyurusunu aktaran haber]. `api.svc/soap` ya da `api.svc/pox` kullanan, WCF servis referansıyla yazılmış eski .NET kodu JSON uç noktalarına taşınmalıdır [RESMÎ].
- **Kota rakamları:** Ocak 2019 duyurusu, site başına günde 10.000 URL'ye kadar çıkabilen, aylık kotası olmayan ve doğrulanmış site yaşı, gösterim sayısı gibi sinyallere göre belirlenen bir kota anlatıyordu [RESMÎ, 2019; metin arama özetinden okundu, sayfanın gövdesi açılamadı]. Yöntem başvurusundaki örnekler `DailyQuota: 5, MonthlyQuota: 24` (URL) ve `100 / 3000` (içerik) gösterir; bunlar yalnız örnektir [RESMÎ]. Güncel rakam belgede yok, `GetUrlSubmissionQuota` ile okunmalıdır.
- **Yandex:** Yeniden tarama kotası günlüktür ve rakamı yayımlanmaz. "Reindex pages" sayfasına göre limit birincil alan adı ile bütün alt alan adları için ortaktır ve her gün sıfırlanır [RESMÎ]; API kotasının da aynı havuzu kullandığı varsayılabilir [TAHMİN]. Yandex, küçük siteler için IndexNow yerine "Reindex pages"i, düzenli güncellemeler için site haritasını ya da Yandex Metrica etiketiyle taramayı da önerir [RESMÎ].

## Hız sınırları ve fiyatlar

- **Fiyat:** IndexNow ücretsizdir (Bing: "free, open-source protocol") [RESMÎ]; Bing ve Yandex Webmaster API'leri için de ücret tanımlanmamıştır [RESMÎ: fiyat belgede yok]. Ücret yalnız bazı CMS eklentilerinde çıkar (yukarıya bak).
- **IndexNow istek boyutu:** İstek başına en çok 10.000 URL; fazlası başarısız olur ya da 422 döner [RESMÎ]. Ayrıca bir bayt sınırı belgede yok.
- **IndexNow hız sınırı:** Kesin rakam yayımlanmaz; her motor site başına kendi günlük eşiğini belirler [RESMÎ: SSS]. Yandex'e göre istek sayısında sabit bir sınır yoktur, ama algoritmalar aşırı gönderimi engeller; Yandex'te 429, IP başına sınırın aşıldığını gösterir [RESMÎ].
- **Aynı URL'yi yeniden göndermek:** Sık değişen sayfalarda en az 5 dakika ara [RESMÎ: SSS]; Yandex aynı URL için en fazla 10 dakikada bir gönderimi önerir [RESMÎ]; 429 aldıktan sonra `Retry-After` kadar bekle; aynı URL'yi, önemli ölçüde değişmediyse, en erken 10 dakika sonra gönder [RESMÎ: SSS]. Yalnız yerleşim ya da görünüm (kozmetik) değişiklikleri gönderilmez [RESMÎ: SSS].
- **Tarama kotası:** IndexNow ile gönderilen her URL sitenin tarama kotasından düşer [RESMÎ].
- **Bing URL Submission API:** İstek başına ≤500 URL ve kalan kota kadar; site başına günlük kota (`GetUrlSubmissionQuota`) [RESMÎ]. Hata durumunda HTTP 400 ve `{"ErrorCode":3,"Message":"InvalidApiKey"}` biçiminde bir gövde döner [RESMÎ]. 6 Kasım 2026'da geçersiz anahtarla gelen gerçek yanıtta `Message` değeri `ERROR!!! InvalidApiKey` idi; kodda `Message` metnine değil `ErrorCode`'a bakılmalı [RESMÎ: gözlem].
- **Bing Content Submission API:** İstek başına ≤10 MB sıkıştırılmamış içerik, gzip destekli; günlük ve aylık kota `GetContentSubmissionQuota` ile okunur [RESMÎ].
- **Yandex yeniden tarama:** Günlük kota, rakamı yayımlanmaz; aşılınca `429 QUOTA_EXCEEDED` ve kotanın açılacağı zamanı gösteren `exceeded_until` döner [RESMÎ].
- **Ölçek:** Bing'e göre günde 3,5 milyarı aşkın URL gönderiliyor (Aralık 2024; Bing'in ifadesiyle "with 18% of all new URLs clicked in web search results") [RESMÎ].

## Resmî olmayan yollar ve riskler

IndexNow açık bir protokol olduğu için resmî olmayan bir yola gerek yoktur; başka bir sitenin adına gönderim de anahtar doğrulaması yüzünden mümkün değildir. Asıl riskler kötüye kullanımdan ve yanlış kurulumdan gelir:

| Risk | Nasıl olur | Önlem |
|---|---|---|
| **Aşırı ya da gereksiz gönderim** | Her derlemede bütün siteyi, değişmeyen ya da yalnız kozmetik değişikliği olan URL'leri göndermek | Sonuç 429 ve tarama kotası israfıdır; SSS değişmeyen URL'leri tekrar göndermeyi 422 nedenleri arasında sayar [RESMÎ]. Motorların sitenin sinyallerine güveni azalabilir [TAHMİN]. Yalnız gerçek değişiklikleri, URL başına 5–10 dakika arayla gönder; her gönderimi zaman, URL, yanıt kodu ve yöntemle logla [RESMÎ: SSS] |
| **Spam URL'lerin otomatik gönderilmesi** | Saldırganlar site içi arama adreslerine (`?s=` + reklam metni) içerik koyar; değişiklikleri kendiliğinden bildiren bir katman (ör. Cloudflare Crawler Hints) bu URL'leri IndexNow'a iter [3. TARAF: Yoast, Ağustos 2022] | `noindex` sayfaları gönderme (Microsoft'un WordPress eklentisi zaten atlar [RESMÎ]); Cloudflare kullanıyorsan bu sayfalara `X-Robots-Tag: noindex` ver [RESMÎ]; arama, filtre ve sıralama parametreli URL'leri izin listesi dışında tut [TAHMİN] |
| **IndexNow anahtarının sızması** | Anahtar herkese açık bir depoda, istemci tarafı kodda ya da bir logda görünür | Başkası yalnız **senin** host'undaki URL'leri gönderip kotanı tüketebilir [TAHMİN]. Anahtarı yapılandırmada ya da ortam değişkeninde tut; sızdıysa değiştir. Yandex değiştirmeyi zorunlu saymaz, üçüncü kişiler öğrendiyse değiştirilebileceğini söyler [RESMÎ: Yandex] |
| **Bing API anahtarının ya da OAuth gizlisinin sızması** | Anahtar kullanıcıya bağlı olduğu için doğrulanmış **bütün** sitelere erişim verir [RESMÎ] | Gizli tut; sızarsa sil ve yeniden üret; mümkünse dar kapsamlı OAuth (`webmaster.read`) kullan [RESMÎ] |
| **Gizli ya da kişisel URL'lerin paylaşılması** | Token'lı bağlantılar, test ortamı, kişiye özel sayfalar ya da URL'de kişisel veri (ör. `?email=`) gönderilir | Gönderilen URL bütün katılımcılara gider; liste bir arşivi (Internet Archive) ve Amazonbot'u da içerebilir [RESMÎ: paylaşım kuralı]. indexnow.org'un kullanım şartlarına göre IndexNow.org web sitesine gelen HTTP istekleri kaynak IP'leriyle loglanır ve süresiz saklanır [RESMÎ]; bunun `api.indexnow.org` gönderimlerini de kapsayıp kapsamadığı yazmıyor [doğrulanamadı]. Yalnız herkese açık ve kalıcı URL'leri gönder; kişisel veri içeren URL KVKK açısından sorun yaratır [TAHMİN] |
| **"Google'a anında dizin" vaat eden hizmetler** | IndexNow ya da Google Indexing API üzerinden her sayfayı Google'a "anında" sokma vaadi | IndexNow Google'a ulaşmaz [RESMÎ]. Indexing API iş ilanı ve canlı yayın dışındaki içerik için kullanılamaz; gönderimler spam denetiminden geçer, çoklu hesapla kota aşmak dahil kötüye kullanım erişimin iptaline yol açar [RESMÎ: Google] |
| **Yanlış kurulum** | Dosya kökte değil, adı yanlış, içerik anahtarla birebir aynı değil, dosya yayında değilken gönderim, URL kodlanmamış, alt alan adı için ayrı dosya yok | 403/422 döner; SSS'deki "sık yapılan hatalar" listesi bunlardır [RESMÎ]. CDN/WAF'ın motor botlarını anahtar dosyasından engellemesi de 403'e yol açabilir [TAHMİN] |

## SDK ve kütüphaneler

| Ad | Platform | Tür | Not |
|---|---|---|---|
| IndexNow Plugin (wordpress.org eklentisi `indexnow`) | WordPress | **Resmî** (Bing Webmaster Tools ekibi; wordpress.org hesabı `bingwebmastertools`) | Sürüm 1.0.4, 100.000+ etkin kurulum; sayfa oluşturma, güncelleme ve silmede otomatik gönderir; ortak uç noktayı kullanır; `noindex` sayfaları atlar [RESMÎ] |
| Yoast SEO Premium | WordPress | Ticari | IndexNow 18.8 sürümünden beri yalnız Premium'da, varsayılan olarak açık [RESMÎ: Yoast belgesi, arama özetinden] |
| Rank Math | WordPress | Ücretsiz modül | Anahtarı kendisi üretip barındırır; seçilen içerik türlerinde yeni, güncellenen ve silinen yazıyı gönderir; elle gönderim de var [RESMÎ: Rank Math belgesi, arama özetinden] |
| AIOSEO, SEOPress | WordPress | Ticari / ücretsiz | Bing'in eklenti listesinde [RESMÎ]; IndexNow özelliğinin hangi sürümde olduğu doğrulanmadı |
| ReCrawler | WordPress | Topluluk, ücretsiz | Yandex'in eklenti listesinde [RESMÎ] |
| Cloudflare Crawler Hints | CDN | Resmî (Cloudflare) | Free, Pro, Business ve Enterprise planlarında; önbellekteki `MISS`'i olası değişiklik sayıp IndexNow'a bildirir; site geneli bir ayardır, sayfa dışlamak için `noindex` gerekir [RESMÎ] |
| Wix Studio, Duda, GoDaddy, XenForo, Milestone, Shopify | Site kurucu / platform | Yerleşik | Kurulum gerektirmez [RESMÎ: Bing]. Shopify için InstaIndex uygulaması ve kodlu yöntemler de listede |
| Joomla (Aimy Sitemap PRO, JSitemap), Bitrix24, Drupal, PrestaShop, MODX, Shopware, OpenCart, TYPO3, Umbraco | CMS | Topluluk / ticari | Bing ve Yandex listelerinde. Yandex listesindekilerin çoğu ücretli ve Yandex "eklentilerin doğru çalışmasından sorumlu değiliz" der [RESMÎ] |
| .NET (IndexNow) | C# | **Resmî paket yok** | NuGet'te yalnız topluluk paketleri var (6 Kasım 2026): `PowerForge.IndexNow` (MIT, net8.0, Ekim 2026'da güncellendi), `PowerForge.Web.Protocols`, `CodeHelper.API.IndexNow` (tek sürüm 1.0.0, 2022), `YYFIndexNow`; Umbraco için `Dyfort.Umbraco.IndexNow` ve `Umbraco.Community.IndexNow`. Hiçbirinin yayıncısı NuGet'te doğrulanmış değil [RESMÎ: NuGet araması]. Protokol tek HTTP isteği olduğundan `HttpClient` yeterlidir (aşağıda) |
| .NET (Bing Webmaster API) | C# | **Resmî paket yok** | Microsoft Learn'deki `Microsoft.Bing.Webmaster.Api.Interfaces` başvurusu kullanımı WCF servis referansıyla (SOAP) anlatır; SOAP 31.08.2026'da kapandığı için JSON uç noktaları `HttpClient` ile çağrılır [RESMÎ]. Topluluk: `Dyfort.Umbraco.BingIndexing` (Umbraco) [RESMÎ: NuGet araması] |
| Python, Node.js | — | Topluluk | Paketler var, bu çalışmada doğrulanmadı. Tek istek için `requests` ya da `fetch` yeterli |

### .NET: HttpClient ile gönderim

Resmî bir NuGet paketi olmadığı için `System.Net.Http.Json` yeterlidir (.NET 8+, C# 12). Örnek bir konsol uygulamasıdır (`dotnet new console`); anahtar koda gömülmez, ortam değişkeninden okunur.

```csharp
using System.Net;
using System.Net.Http.Json;

var key = Environment.GetEnvironmentVariable("INDEXNOW_KEY")
          ?? throw new InvalidOperationException("INDEXNOW_KEY tanımlı değil.");
const string host = "www.ornek.com";

string[] changedUrls =
[
    "https://www.ornek.com/hizmetler/yeni-sayfa",
    "https://www.ornek.com/kaldirilan-sayfa"
];

using var http = new HttpClient { Timeout = TimeSpan.FromSeconds(30) };

foreach (var batch in changedUrls.Chunk(10_000))
{
    var body = new
    {
        host,
        key,
        keyLocation = $"https://{host}/{key}.txt",
        urlList = batch
    };

    using var response = await http.PostAsJsonAsync("https://api.indexnow.org/indexnow", body);

    switch (response.StatusCode)
    {
        case HttpStatusCode.OK:
        case HttpStatusCode.Accepted:
            Console.WriteLine($"{(int)response.StatusCode}: {batch.Length} URL alındı.");
            break;
        case HttpStatusCode.TooManyRequests:
            var wait = response.Headers.RetryAfter?.Delta ?? TimeSpan.FromMinutes(10);
            Console.WriteLine($"429: {wait.TotalMinutes:0} dakika sonra yeniden dene.");
            break;
        default:
            Console.WriteLine($"{(int)response.StatusCode}: {await response.Content.ReadAsStringAsync()}");
            break;
    }
}
```

Tek URL için `GET` (aynı `http` ve `key` değişkenleriyle):

```csharp
var target = Uri.EscapeDataString("https://www.ornek.com/hizmetler/yeni-sayfa");
using var single = await http.GetAsync($"https://api.indexnow.org/indexnow?url={target}&key={key}");
Console.WriteLine((int)single.StatusCode);
```

Anahtarı bir kez üretmek (32 karakter onaltılık):

```csharp
Console.WriteLine(Guid.NewGuid().ToString("N"));
```

Anahtar dosyasını bir ASP.NET Core uygulamasında (`Program.cs`) yapılandırmadaki değerden sunmak:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var indexNowKey = builder.Configuration["IndexNow:Key"]!;
app.MapGet($"/{indexNowKey}.txt", () => Results.Text(indexNowKey, "text/plain; charset=utf-8"));

app.Run();
```

- Dosyayı `wwwroot/<ANAHTAR>.txt` olarak koyup `app.UseStaticFiles()` ile sunmak da aynı işi görür [TAHMİN]; önemli olan, içeriğin yalnız anahtar olması ve adresin oturumsuz açılmasıdır [RESMÎ].
- `PostAsJsonAsync` gövdeyi JSON olarak gönderir ve özellik adlarını camelCase yazar; anonim nesnedeki adlar (`host`, `key`, `keyLocation`, `urlList`) zaten protokoldeki alan adlarıyla aynıdır.
- `400`, `403` ve `422` yanıtlarında körlemesine yeniden deneme yapılmaz, istek düzeltilir; `5xx` yanıtlarında artan beklemeyle yeniden denenir [TAHMİN]. Motorlar arası kural da benzerdir: 4xx'te gönderen sorunu düzeltip yeniden dener [RESMÎ: arama motorları belgesi].
- Aynı URL'nin kısa sürede tekrar gönderilmemesi için son gönderim zamanı saklanır (bellek içi önbellek ya da veritabanı sütunu) ve 5–10 dakika içindeki tekrarlar atlanır [RESMÎ: aralıklar SSS'den]. Gönderimi yayımlama akışına bağlamanın pratik yolu, kayıt ya da silme olayında URL'yi kuyruğa atıp bir arka plan işinin (`BackgroundService`) toplu göndermesidir [TAHMİN].
- Bing'e özel gönderim de aynı `HttpClient` ile yapılır: `POST https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=...`, gövde `{ siteUrl, urlList }` ve istek başına ≤500 URL [RESMÎ]. Bu anahtar gizlidir; kullanıcı gizlileri (`dotnet user-secrets`) ya da ortam değişkeninde tutulur.

## Postman / OpenAPI / koleksiyonlar

- **IndexNow:** Resmî Postman koleksiyonu ya da OpenAPI dosyası belgede yok; protokol tek uç noktadan oluşur. SSS, denemeler için `curl` ya da `wget` önerir [RESMÎ].
- **Bing Webmaster API:** Resmî OpenAPI dosyası yok. Her metodun JSON istek ve yanıt örneği Microsoft Learn'deki `IWebmasterApi` başvurusundadır [RESMÎ]. SOAP için kullanılan WSDL (`https://ssl.bing.com/webmaster/api.svc?wsdl`) SOAP'ın 31.08.2026'da kapanmasıyla işlevini yitirdi; adres 6 Kasım 2026'da `404` döndü [RESMÎ: gözlem]. Bing'in "Accessing Bing Webmaster Tools API using cURL" (Kasım 2019) yazısı cURL örnekleri içerir (bu çalışmada açılmadı).
- **Yandex Webmaster API:** Başvuru sayfaları `yandex.com/dev/webmaster/doc` altında; resmî bir OpenAPI dosyası ya da Postman koleksiyonu bu çalışmada görülmedi.

## Depoda ilgili sayfalar

- [SEO Rehberi, Bölüm 14 § 5: IndexNow](../../Rehberler/SEO/14-diger-motorlar-ve-yz.html#indexnow): Kullanıcı odaklı anlatım, "IndexNow Google'ı da hızlandırır" miti, kurulum adımları, yanıt tablosu ve "yalnız değişeni gönder" püf noktası.
- [Bölüm 14 § 2: Yandex](../../Rehberler/SEO/14-diger-motorlar-ve-yz.html#yandex) ve [§ 3: Bing](../../Rehberler/SEO/14-diger-motorlar-ve-yz.html#bing): Yandex Webmaster kurulumu, site bölgesi, Bing Webmaster Tools'a Search Console'dan aktarma ve `lastmod`.
- [Bölüm 14 § 1: Türkiye'de arama pazarı](../../Rehberler/SEO/14-diger-motorlar-ve-yz.html#turkiye-pazari): Yandex payı; IndexNow'un Türkiye'de neden anlamlı olduğu.
- [Bölüm 9: Site haritasını göndermenin yolları](../../Rehberler/SEO/09-tarama-ve-dizin.html#site-haritasi-gonderme): Google tarafı; site haritası "ping" ucunun 2023'te kaldırılması ve Google'ın IndexNow kullanmaması.
- [Bölüm 15 § 7: Bing ve Yandex araçları](../../Rehberler/SEO/15-araclar-ve-olcum.html#bing-yandex-araclari): Bing Webmaster Tools (IndexNow, AI Performance raporu) ve Yandex Webmaster.
- [Bölüm 16: Eski sayfaların temizlik sırası](../../Rehberler/SEO/16-sorun-giderme.html#temizlik-sirasi): Silinen URL'leri Bing ve Yandex'e IndexNow ile bildirmek.
- [Bölüm 18: İlk iki hafta](../../Rehberler/SEO/18-yeni-site-yol-haritasi.html#hafta-1-2) ve [Bölüm 19: Kontrol listesi](../../Rehberler/SEO/19-kontrol-listesi.html#diger-motorlar-yz): Yeni sitede IndexNow'un ne zaman kurulacağı ve denetim maddesi.
- [SEO araştırma notu (arastirma.md)](../../Rehberler/SEO/arastirma.md): Yapay zekâ için yoğun başvuru; § 13 "Diğer motorlar ve yapay zekâ araması".
- [SEO Rehberi ana sayfası](../../Rehberler/SEO/): Rehberin bütün bölümleri.

## Kaynaklar

**Resmî**

- [IndexNow — Documentation](https://www.indexnow.org/documentation): Anahtar biçimi, Seçenek 1/2 ve `keyLocation` kapsamı, GET/POST, 10.000 URL sınırı, yanıt kodları, motorlar arası paylaşım (erişim: 6 Kasım 2026).
- [IndexNow — FAQ](https://www.indexnow.org/faq): Uç noktalar, tarama kotası, 5 ve 10 dakikalık aralıklar, 404/410 ve yönlendirmeler, URL kodlama, alt alan adları, kullanıcı içeriği, CMS/CDN listesi, sık yapılan hatalar (erişim: 6 Kasım 2026).
- [IndexNow — Documentation for search engines](https://www.indexnow.org/searchengines): Katılım şartı, `meta.json` alanları, imzalı paylaşım, `noreping`, loglar, `unsubscribe` (erişim: 6 Kasım 2026).
- [IndexNow — searchengines.json](https://www.indexnow.org/searchengines.json) ve motorların `meta.json` dosyaları: [Bing](https://www.bing.com/indexnow/meta.json), [Yandex](https://www.yandex.com/indexnow/meta.json), [Seznam](https://search.seznam.cz/indexnow/meta.json), [Yep](https://indexnow.yep.com/indexnow/meta.json), [Internet Archive](https://web-static.archive.org/indexnow/meta.json), [Amazonbot](https://indexnow.amazonbot.amazon/indexnow/meta.json), [Naver](https://searchadvisor.naver.com/indexnow/meta.json) (erişim: 6 Kasım 2026).
- [IndexNow — ana sayfa](https://www.indexnow.org/) ve [kullanım şartları](https://www.indexnow.org/terms): Destekleyen beş motor, CC BY-SA 4.0, sponsorlar, IP loglama, garanti reddi (erişim: 6 Kasım 2026).
- [Bing — IndexNow Get started](https://www.bing.com/indexnow/getstarted): Adımlar, POST örneği, yanıt tablosu, CMS/eklenti/CDN listesi, tarama kotası (erişim: 6 Kasım 2026).
- [Bing — IndexNow](https://www.bing.com/indexnow): Tanıtım sayfası; eski URL Submission API adresi de bu sayfayı gösteriyor (erişim: 6 Kasım 2026).
- [Bing Webmaster Blog — Optimize your Impact with IndexNow Insights (Mart 2024)](https://blogs.bing.com/webmaster/March-2024/Optimize-your-Impact-with-IndexNow-Insights): IndexNow Insights raporu (erişim: 6 Kasım 2026).
- [Bing Webmaster Blog — IndexNow Expands Adoption Across Industries (Aralık 2024)](https://blogs.bing.com/webmaster/December-2024/Look-How-Far-We-ve-Come-IIndexNow-Expands-Adoption-Across-Industries): Günde 3,5 milyar URL; Internet Archive, GoDaddy, Condé Nast (erişim: 6 Kasım 2026).
- [Bing Webmaster Blog — Submitting up to 10,000 URLs per day (Ocak 2019, Kasım 2025 notuyla)](https://blogs.bing.com/webmaster/january-2019/bingbot-Series-Get-your-content-indexed-fast-by-now-submitting-up-to-10,000-URLs-per-day-to-Bing): IndexNow'u birincil yöntem olarak öneren not (erişim: 6 Kasım 2026).
- [Bing Webmaster Blog — Content Submission API kurulum rehberi (Mayıs 2021, Kasım 2025 notuyla)](https://blogs.bing.com/webmaster/may-2021/Easy-set-up-guide-for-Bing%E2%80%99s-Content-Submission-API-%28Beta%29): `SubmitContent` ve destek durumu (erişim: 6 Kasım 2026).
- [Microsoft Learn — Bing Webmaster API](https://learn.microsoft.com/en-us/bingwebmaster/): SOAP/POX emeklilik notu (31.08.2026) (erişim: 6 Kasım 2026).
- [Getting Access](https://learn.microsoft.com/en-us/bingwebmaster/getting-access), [OAuth 2.0](https://learn.microsoft.com/en-us/bingwebmaster/oauth2), [API Protocols](https://learn.microsoft.com/en-us/bingwebmaster/api-protocols), [Getting Started](https://learn.microsoft.com/en-us/bingwebmaster/getting-started): API anahtarı, OAuth akışı ve kapsamlar, URL biçimleri, hata gövdesi (erişim: 6 Kasım 2026).
- [IWebmasterApi başvurusu](https://learn.microsoft.com/en-us/dotnet/api/microsoft.bing.webmaster.api.interfaces.iwebmasterapi): `SubmitUrl`, `SubmitUrlBatch`, `GetUrlSubmissionQuota`, `SubmitContent`, `GetContentSubmissionQuota`, `GetUrlInfo`, `AddSiteRoles` (erişim: 6 Kasım 2026).
- [Yandex — IndexNow](https://yandex.com/support/webmaster/en/indexing-options/index-now), [API başvurusu](https://yandex.com/support/webmaster/en/indexnow/reference.md), [anahtar](https://yandex.com/support/webmaster/en/indexnow/key.md), [CMS eklentileri](https://yandex.com/support/webmaster/en/indexnow/cms-plugins.md), [Reindex pages](https://yandex.com/support/webmaster/en/robot-workings/site-reindex.md): Yanıt kodları, anahtar kuralları, 10 dakika önerisi, eklenti listesi, yeniden tarama (erişim: 6 Kasım 2026).
- [Yandex Webmaster API — recrawl queue](https://yandex.com/dev/webmaster/doc/en/reference/host-recrawl-post), [recrawl quota](https://yandex.com/dev/webmaster/doc/en/reference/host-recrawl-quota-get), [OAuth (İngilizce)](https://yandex.com/dev/webmaster/doc/en/tasks/how-to-get-oauth), [OAuth (Rusça)](https://yandex.com/dev/webmaster/doc/ru/tasks/how-to-get-oauth) (erişim: 6 Kasım 2026).
- [Google — Ask Google to recrawl your URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) ve [Indexing API quickstart](https://developers.google.com/search/apis/indexing-api/v3/quickstart): Google'ın yolları ve Indexing API'nin sınırı (erişim: 6 Kasım 2026).
- [Cloudflare — Crawler Hints](https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/): Planlar, `MISS` tetikleyicisi, `noindex` ile dışlama (erişim: 6 Kasım 2026).
- [WordPress.org — IndexNow Plugin](https://wordpress.org/plugins/indexnow/): Sürüm, kurulum sayısı, `noindex` davranışı (erişim: 6 Kasım 2026).
- [Yoast — What is IndexNow](https://yoast.com/what-is-indexnow/) ve [Rank Math — How to use IndexNow](https://rankmath.com/kb/how-to-use-indexnow/): Eklentilerin IndexNow özelliği (arama özetinden; erişim: 6 Kasım 2026).
- [Amazon — Amazonbot](https://developer.amazon.com/amazonbot): Amazon botlarının robots.txt davranışı; IndexNow'dan söz etmiyor (erişim: 6 Kasım 2026).
- [NuGet — "indexnow" araması](https://www.nuget.org/packages?q=indexnow) ve [PowerForge.IndexNow](https://www.nuget.org/packages/PowerForge.IndexNow): .NET topluluk paketleri (erişim: 6 Kasım 2026).
- [Microsoft Learn — about_Character_Encoding (Windows PowerShell 5.1)](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_character_encoding?view=powershell-5.1): `UTF8` değerinin BOM'lu yazması, PowerShell 7'de varsayılanın `utf8NoBOM` olması (erişim: 6 Kasım 2026).

**Üçüncü taraf**

- [Search Engine Journal — Google Will Be Testing IndexNow (9.11.2021)](https://www.searchenginejournal.com/google-will-be-testing-indexnow/426602/): Google sözcüsünün "test edeceğiz" açıklaması (erişim: 6 Kasım 2026).
- [Search Engine Roundtable — IndexNow ile ürün şeması, Shopify ve Amazon (20.05.2025)](https://www.seroundtable.com/indexnow-product-schema-shopify-amazon-39442.html): Microsoft'un ürün verisi ve Amazon açıklaması (erişim: 6 Kasım 2026).
- [Search Engine Roundtable — Microsoft Bing ve Internet Archive (20.04.2026)](https://www.seroundtable.com/microsoft-indexnow-support-internet-archive-41180.html) (erişim: 6 Kasım 2026).
- [Search Engine Roundtable — Bing Webmaster Tools SOAP/POX API'leri kapanıyor (03.08.2026)](https://seroundtable.com/bing-webmaster-tools-soap-pox-apis-retire-41805.html): Anahtar ve kotaların değişmediği notu (erişim: 6 Kasım 2026).
- [Yoast — Internal site search spam (24.08.2022)](https://yoast.com/internal-site-search-spam/): Site içi arama spamının Crawler Hints ile IndexNow'a itilmesi (erişim: 6 Kasım 2026).
- [Wikipedia — IndexNow](https://en.wikipedia.org/wiki/IndexNow): Kuruluş (Ekim 2021) ve katılım tarihçesi (erişim: 6 Kasım 2026).
- [Search Engine Land — Naver now supports IndexNow (Temmuz 2023)](https://searchengineland.com/naver-korean-search-engine-now-supports-indexnow-429880) (arama özetinden; erişim: 6 Kasım 2026).

> Not: Bing Webmaster Guidelines ve Bing'in yardım sayfaları JavaScript ile yüklendiği için okunamadı; Ocak 2019 duyurusunun gövdesi yalnız arama özetinden okunabildi. Yandex Webmaster API'de `Authorization` başlığının tam biçimi resmî sayfalarda bulunamadı. Uç noktalara gerçek gönderim yapılmadı; bilgiler belgelerden, herkese açık JSON dosyalarından ve 6 Kasım 2026'daki HTTP durum kodu gözlemlerinden derlendi.

[← API dizini](../)
