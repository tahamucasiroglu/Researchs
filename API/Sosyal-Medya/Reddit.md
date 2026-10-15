# Reddit API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **kısıtlı ve kapanmakta**. Dışarıdan erişilen "public" Data API'ye yeni başvuru 31 Ekim 2026'da kapanıyor, kalan erişim Mart 2027'de sona eriyor. RSS desteği 13 Kasım 2026'da bitiyor. Bundan sonraki yol Devvit (Reddit içinde çalışan uygulama) veya yazılı ticari anlaşma.

**Etiketler:** [RESMÎ] = Reddit'in kendi belgesi veya duyurusu · [3. TARAF] = haber sitesi, blog ya da topluluk · [TAHMİN] = çıkarım · [ÇELİŞKİLİ] = kaynaklar birbirini tutmuyor · [TEST] = bu sayfa yazılırken 15 Ekim 2026'da tek bir istekle denendi (tek IP, genelleme yapılamaz).

## Özet

Reddit'in klasik **Data API**'si (`oauth.reddit.com`, OAuth 2) hâlâ çalışıyor. Ancak Kasım 2025'ten beri self-servis değil: her yeni erişim **Responsible Builder Policy** kapsamında başvuru ve onay gerektiriyor [RESMÎ]. Reddit, 30 Eylül 2026'da public API'yi tamamen kapatma takvimini duyurdu. Yeni başvurular 31 Ekim 2026'da, kalan erişim Mart 2027'de kapanıyor [RESMÎ]. Ticari olmayan kullanım OAuth istemci kimliği başına dakikada 100 sorgu (QPM) sınırıyla ücretsiz [RESMÎ]. Ticari kullanım (reklamlı uygulama, ücretli hizmet, şirket adına kullanım, AI eğitimi) yazılı izin ve sözleşme gerektiriyor. Fiyat herkese açık değil [RESMÎ]. Reddit'in önerdiği yol, uygulamayı Reddit'in kendi sunucularında çalışan TypeScript tabanlı **Devvit** platformuna taşımak [RESMÎ]. Devvit uygulamaları varsayılan olarak yalnızca **kurulu oldukları topluluklarda** çalışır. App Migration Program katılımcılarına muafiyetler sunuluyor: daha geniş HTTP Fetch allowlist'i, topluluklar arası iş akışları için External Endpoints, global app-mention tetikleyicisi (beta) ve blob storage [RESMÎ: taşıma rehberi]. Yazılı anlaşması olan partnerler public API kapanışından muaf tutulacak [3. TARAF].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | **RSS/Atom** (`/r/<sub>/new/.rss`, `/user/<ad>/submitted/.rss`). **13 Kasım 2026'da kapanıyor** [RESMÎ]. Kimliksiz `.json` uç noktaları kapatıldı [3. TARAF] [TEST: `www.reddit.com/r/<sub>/new.json` → 403]. | RSS'te dakikada çok düşük kota var [TEST: ilk istekten sonra `x-ratelimit-remaining: 0`, 429]. Resmî Wiki'ye göre "OAuth ya da giriş kullanmayan trafik engellenir, varsayılan limit uygulanmaz" [RESMÎ]. |
| Geliştirici hesabı / uygulama (Data API) | reddit.com/prefs/apps'te uygulama kaydı **ve** Kasım 2025'ten beri destek formuyla başvurup onay almak [RESMÎ]. **31 Ekim 2026'dan sonra yeni başvuru kabul edilmiyor** [RESMÎ]. | Tüm Data API: okuma (subreddit, kullanıcı, arama, yorum), yazma (gönderi, yorum, mesaj), moderasyon | Ücretsiz (ticari olmayan). 100 QPM / OAuth client id, 10 dakikalık ortalama [RESMÎ]. Mart 2027'de kapanıyor [RESMÎ]. |
| Devvit (Developer Platform) | developers.reddit.com hesabı, `devvit` CLI. Uygulama yayınlanmadan önce App Review'dan geçer [RESMÎ]. | Kurulu olduğu subreddit'te tetikleyiciler (yeni gönderi/yorum/mod işlemi), zamanlayıcı (cron), Redis ve blob depolama, izinli alan adlarına HTTP fetch [RESMÎ]. API anahtarı yönetimi yok [RESMÎ]. | Ücretsiz barındırma. Reddit Developer Funds ile uygulama başına 167.000 $'a kadar ödül var [RESMÎ]. |
| İşletme / onay | Destek formunda "enterprise" talebi. Reddit "önerin kriterlerimize uyarsa döneriz" diyor [RESMÎ]. | Ticari kullanım, rate limit üstü erişim, public API kapandıktan sonra muafiyet ("yazılı anlaşması olan partnerlere muafiyet olacak") [3. TARAF: admin yorumu, ppc.land aktarımı] | Sözleşmeye bağlı, fiyat yayımlanmamış [RESMÎ]. 2023'te konuşulan "1.000 çağrı başına 0,24 $" rakamı bir üçüncü taraf uygulamaya verilen teklifti ve resmî tarife olarak yayımlanmadı [3. TARAF] [ÇELİŞKİLİ]. |
| Araştırmacı | Reddit for Researchers (RFR) programına başvuru [RESMÎ] | Ticari olmayan araştırma verisi | Reddit, RFR dışında toplanan veriyle yapılan araştırmayı politika ihlali sayıyor [RESMÎ]. |
| Ücretli / kurumsal (Ads API) | Reklamveren hesabı | Yalnızca reklam kampanyası ve raporlama. İçerik takibi için değil. | Reklam bütçesine bağlı |
| Resmî olmayan | Tarayıcı oturumu kazıma, arşiv servisleri (Arctic Shift vb.), ticari scraping sağlayıcıları | Herkese açık gönderi ve yorumlar | ToS ihlali riski var; aşağıya bakın. |

## Kimlik doğrulama

- **OAuth 2.0** zorunlu [RESMÎ]. Yetkilendirme adresi `https://www.reddit.com/api/v1/authorize`, token adresi `https://www.reddit.com/api/v1/access_token`, iptal adresi `/api/v1/revoke_token`. API çağrıları `https://oauth.reddit.com` üzerinden yapılır [RESMÎ: reddit-archive OAuth2 wiki].
- Uygulama türleri [RESMÎ]:
  - **web app:** Sunucuda çalışır, secret saklayabilir.
  - **installed app:** Mobil veya masaüstünde çalışır, secret'ı yoktur.
  - **script:** Yalnızca geliştiricinin kendi hesabına erişir.
- Grant türleri: `authorization_code`, `refresh_token`, `password` (yalnızca script), `client_credentials` (app-only), `https://oauth.reddit.com/grants/installed_client` (app-only, `device_id` ister) [RESMÎ].
- Token **1 saat** geçerlidir. `duration=permanent` istenirse refresh token verilir. App-only token için refresh token yoktur [RESMÎ].
- Scope örnekleri: `read`, `identity`, `history`, `submit`, `privatemessages`, `modposts` vb. Tam liste: `https://www.reddit.com/api/v1/scopes` [RESMÎ].
- **User-Agent zorunlu ve kalıplı** [RESMÎ]: `<platform>:<app ID>:<sürüm> (by /u/<reddit kullanıcı adı>)`. "Python/urllib" gibi varsayılan User-Agent'lar ciddi biçimde kısıtlanır. User-Agent'ı sahte göstermek yasaktır (Data API Terms 2.8) [RESMÎ].
- **Devvit'te** OAuth yoktur. `devvit.json` dosyasında `"permissions": {"reddit": true}` verilir, kimlik doğrulamayı platform yapar [RESMÎ].

## Temel uç noktalar

Tam liste için resmî canlı referans: https://www.reddit.com/dev/api/

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/r/{sub}/new` | Subreddit'in en yeni gönderileri | Data API (OAuth) | `limit` (en çok 100), `before`/`after` (fullname, ör. `t3_abc`) ile sayfalama [RESMÎ] |
| GET | `/r/{sub}/comments` | Subreddit'teki en yeni yorumlar | Data API | Yorum akışını izlemek için sorgulama (polling) [RESMÎ] |
| GET | `/user/{username}/submitted` | Kullanıcının gönderileri | Data API | `sort=new` [RESMÎ] |
| GET | `/user/{username}/comments` | Kullanıcının yorumları | Data API | [RESMÎ] |
| GET | `/user/{username}/about` | Kullanıcı profil özeti | Data API | [RESMÎ] |
| GET | `/r/{sub}/about` | Subreddit bilgisi | Data API | [RESMÎ] |
| GET | `/search`, `/r/{sub}/search` | Anahtar kelime araması | Data API | `q`, `sort=new`, `restrict_sr`, `t` [RESMÎ]. Arama indeksi gecikmeli olabilir [TAHMİN]. |
| GET | `/api/info?id=t3_x,t1_y` | Fullname listesiyle toplu sorgu | Data API | 100 ID'ye kadar [RESMÎ]. Silinmiş içerik kontrolü için de kullanılır. |
| GET | `/comments/{article}` | Gönderi ve yorum ağacı | Data API | `depth`, `limit`, `sort` [RESMÎ] |
| GET | `/api/v1/me` | Token sahibinin bilgisi | Data API (`identity`) | [RESMÎ] |
| GET | `/message/inbox`, `/message/unread` | Gelen kutusu (bahsetmeler dahil) | Data API (`privatemessages`) | Genel gelen kutusu [RESMÎ] |
| GET | `/message/mentions` | Yalnızca kullanıcı adı bahsetmeleri | Data API (`privatemessages`) | Bot adı etiketlenmesini takip etmenin hedefli yolu [RESMÎ] |
| POST | `/api/submit`, `/api/comment` | Gönderi veya yorum yazma | Data API (`submit`) | Spam kuralları ve aynı içeriği çok toplulukta paylaşma sınırı geçerli [RESMÎ] |
| — (Devvit) | `reddit.getPostById`, `reddit.getNewPosts`, `submitComment`… | Devvit'in Reddit API istemcisi | Devvit | Kurulu topluluk bağlamında çalışır. Abone olunan subreddit'ler, oylar, kaydedilenler ve takip listesi gibi özel veriler erişilemez [RESMÎ]. |

Not: Eski "URL'ye `.json` ekle" yöntemi (`https://www.reddit.com/r/{sub}/new.json`) yıllarca kimliksiz okuma için kullanıldı. Kimliksiz kullanımı kapatıldı [3. TARAF] [TEST: 403]. Aynı yollar OAuth ile `oauth.reddit.com` üzerinden çalışmaya devam ediyor (ör. `https://oauth.reddit.com/r/{sub}/new`) [RESMÎ].

## Gerçek zamanlı / bildirim

- **Webhook / WebSocket / streaming:** Public Data API'de **yok** [RESMÎ: belgede böyle bir uç nokta yok]. PRAW'daki `subreddit.stream.submissions()` gerçek bir akış değildir. Arka planda `/new` uç noktasını sorgular (polling) [RESMÎ: PRAW dokümanı].
- **RSS/Atom:** `/.rss` ekiyle subreddit, kullanıcı ve arama beslemeleri alınabiliyordu. **13 Kasım 2026'da desteği bitiyor** [RESMÎ: Reddit Help "Setting up mod alerts in Discord or Slack"]. Reddit Pro'nun yayıncılar için dışarıdan Reddit'e RSS içe aktarması etkilenmiyor [3. TARAF].
- **Devvit triggers (olay tabanlı)** [RESMÎ]: `onPostSubmit`, `onPostCreate`, `onPostUpdate`, `onPostDelete`, `onCommentCreate`, `onCommentSubmit`, `onModAction`, `onModMail`, `onAutomoderatorFilterPost` vb. Ayrıca `onMentionInCommentCreate` var: uygulama adının etiketlenmesini dinleyen, sınırlı erişimli ve global bir olay. Tetikleyiciler yalnızca uygulamanın **kurulu olduğu** subreddit'te çalışır [RESMÎ: tetikleyici sayfası]. Uygulamayı bir topluluğa o topluluğun moderatörleri kurar [RESMÎ: Devvit mod tools tanıtımı]. Tetikleyicilerin aynı olayı yalnızca bir kez teslim etmesi garanti değil; uygulama tekrarı kontrol etmeli (ör. içeriğe yakın zamanda işlem yapılıp yapılmadığına bakmak) [RESMÎ: tetikleyici sayfası].
- **Devvit HTTP Fetch:** Uygulama, onaylı alan adlarına sunucu tarafından HTTPS isteği gönderebilir. Böylece tetikleyici geldiğinde kendi sunucuna "webhook" atabilir. Alan adı onayı genelde 1–2 iş günü sürer, istek zaman aşımı 30 saniyedir [RESMÎ].
- **Devvit External Endpoints:** Dış sunucunun Devvit uygulamasını çağırması. Talep üzerine açılıyor [RESMÎ].
- **Discord Relay:** Reddit'in Devvit ile yaptığı hazır uygulama. Mod kuyruğu ve modmail uyarılarını Discord veya Slack webhook'una gönderir. Yalnızca moderatörü olunan topluluk için kullanılabilir [RESMÎ].
- **Moderatörü olunmayan topluluklar için RSS'in yerine geçecek resmî bir araç yok** [3. TARAF: Reddit duyurusunun aktarımı].

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Bir subreddit'e yeni gönderi | Evet (Mart 2027'ye kadar). Sonrasında yalnızca moderatörü olunan toplulukta veya ticari anlaşmayla. | `/r/{sub}/new` sorgulama (`before`=son fullname). Devvit'te `onPostSubmit`. | Data API (onaylı) / Devvit | 100 QPM'de, 60 saniyede bir sorgulama ile ~100 subreddit izlenebilir [TAHMİN]. Birden çok subreddit tek istekte birleştirilebilir: `/r/a+b+c/new` [RESMÎ: yerleşik söz dizimi]. |
| Belirli bir kullanıcının yeni gönderisi veya yorumu | Evet (Mart 2027'ye kadar) | `/user/{ad}/submitted`, `/user/{ad}/comments` sorgulama | Data API | Devvit'te kullanıcı bazlı global tetikleyici **yok** [RESMÎ: tetikleyici listesinde yok]. |
| Anahtar kelime / marka geçmesi | Kısmen | `/search?q=...&sort=new` sorgulama | Data API | Reddit Insights (Reddit'in kendi sosyal dinleme ürünü) ve ticari anlaşma alternatif [3. TARAF] |
| Bir gönderiye gelen yorumlar | Evet | `/comments/{id}` veya `/r/{sub}/comments`. Devvit'te `onCommentCreate`. | Data API / Devvit | — |
| Uygulamanın etiketlenmesi | Evet | `/message/mentions` (veya genel inbox `/message/unread`) ya da Devvit `onMentionInCommentCreate` | Data API / Devvit (sınırlı erişim) | — |
| Canlı yayın başladı | Pratikte hayır | — | — | Reddit'in kendi canlı yayın özelliği (RPAN) 2022'de kapatıldı [3. TARAF]. Bunu yayınlayan bir API belgede yok. |
| Özel mesaj veya sohbet içeriği | Yalnızca kendi hesabın | `/message/inbox`. Sohbet için ayrı limitler var. | Data API | Başkasının mesajları erişilemez. Sohbet limiti: alıcı başına günde 2.000, toplam günde 3.000 mesaj [RESMÎ]. |
| Filtreleme / önemli olanı ayıklama | Uygulama tarafında | Skor, yorum sayısı, flair, `link_flair_text`, yazar, kelime gibi alanlarla istemcide filtre | — | Reddit'te silinen içerik silinmeli. Veri yalnızca onaylı kullanım amacı için saklanabilir. Reddit, verinin 48 saat içinde rutin olarak silinmesini öneriyor [RESMÎ: Data API Terms 3.2, Data API Wiki]. Bu kuralların pratikteki sonucu olarak uzun süreli arşiv tutmak zorlaşır [TAHMİN]. |

**Sonuç:** Mart 2027'den sonra Reddit'i "dışarıdan bir takip uygulaması" olarak izlemenin resmî ve ücretsiz yolu kalmıyor [RESMÎ]. Seçenekler:

1. Takip edilecek subreddit'lerde moderatörsen, Devvit uygulaması yazıp kendi sunucuna HTTP Fetch ile olay göndermek.
2. Reddit ile yazılı ticari veya partner anlaşması yapmak.
3. Reddit Insights gibi Reddit'in kendi ürünlerini kullanmak.
4. Mevcut bir Data API uygulaman varsa App Migration Program'a katılıp muafiyet istemek: topluluklar arası iletişim için External Endpoints, geniş Fetch allowlist'i, app mention tetikleyicisi (beta), blob storage [RESMÎ: taşıma rehberi]. Böylece "yalnızca kurulu topluluk" sınırı kısmen esnetilebilir.

## Hız sınırları ve fiyatlar

- **Ücretsiz Data API:** OAuth client id başına **100 QPM**, 10 dakikalık pencerede ortalaması alınır, yani kısa patlamalara izin verilir [RESMÎ]. Kalan kotayı izlemek için şu yanıt başlıkları kullanılır: `X-Ratelimit-Used`, `X-Ratelimit-Remaining`, `X-Ratelimit-Reset` (saniye) [RESMÎ].
- **Sohbet mesajları:** Alıcı başına günde 2.000, toplam günde 3.000. Bot API kullanıcıları günde en çok 300 sohbet odasına katılabilir [RESMÎ].
- **Kimliksiz trafik:** "Engellenir, varsayılan limit uygulanmaz" [RESMÎ]. Barındırma sağlayıcısı (bulut) IP bloklarından gelen isteklerde OAuth token veya giriş zorunludur [RESMÎ].
- **Aynı amaç için birden çok uygulama kaydı yasak.** Bu, limiti aşma girişimi sayılır [RESMÎ: Developer Terms 4.2, Responsible Builder Policy].
- **Ticari fiyat:** Yayımlanmış bir tarife yok. Reddit'in ifadesi: "seçili geliştiricilerden limitleri kaldırmak için ücret alınabilir" [RESMÎ]. 2023'teki "1.000 çağrı başına 0,24 $" rakamı resmî bir fiyat listesinde yer almıyor [3. TARAF] [ÇELİŞKİLİ]. Ticari erişim için yayımlanmış bir fiyat örneği yok. Bir topluluk geliştiricisi (r/anime araçları), uygulamasını Devvit'e taşıması için Reddit'le 5 ay süren pazarlıkta Reddit'in 10.000 $ (standart 1.000 $ ödülün 10 katı) önerdiğini, ancak sözleşmedeki sorumluluk hükümleri yüzünden parayı almamayı daha ihtiyatlı bulduğunu aktarmış. Bu bir API fiyatı değil, taşıma ödemesi örneğidir [3. TARAF].
- **Devvit:** Barındırma ücretsiz. HTTP timeout 30 saniye. Reddit belirtilen limitlerin aşılmasını uygulamanın askıya alınma sebebi sayıyor [RESMÎ].

### Ticari kullanım şartları (özet)

- Ticari amaç sayılanlar [RESMÎ]:
  - bir işletme tarafından veya işletme adına kullanım,
  - reklamlı, promosyonlu ya da paywall'lı uygulama,
  - abonelik ve sponsorluk,
  - ücretli veri veya araştırma hizmeti,
  - upsell'e açık ücretsiz özellik,
  - Reddit verisiyle eğitilmiş modele erişim satmak.
- **Reddit içeriği gösterip aynı yerde reklam yayınlamak yasak.** Pre-roll, overlay ve sponsorlu yerleşim gibi tüm reklam biçimleri bu kapsamda [RESMÎ].
- AI/ML eğitimi için Reddit'in izni gerekir [RESMÎ: Developer Terms 4.2]. Data API Terms 3.2 ayrıca içeriğin hak sahiplerinin (içeriği yazan kullanıcıların) açık iznini istiyor [RESMÎ: Data API Terms 2.4, 3.2].
- Kullanıcılar hakkında hassas özellik çıkarımı (sağlık, siyasi görüş, cinsel yönelim) ve platform dışı verilerle eşleştirip kimliksizleştirmeyi geri almak kesinlikle yasak [RESMÎ: Responsible Builder Policy].
- Veri saklama [RESMÎ]:
  - Reddit'te silinen gönderi ve yorumlar ile silinen hesaplara ait kimlik bilgileri (`t2_*`, ad, avatar, flair) de silinmeli.
  - Reddit, saklanan verinin "48 saat içinde rutin olarak silinmesini" öneriyor.
  - Anonimleştirilmiş olsa bile silinmiş içeriği saklamak ihlal sayılıyor.
- Belge tarihleri [RESMÎ]: Data API Terms (yürürlük 19 Haziran 2023, son revizyon 20 Temmuz 2026), Developer Terms (yürürlük 24 Eylül 2024, son revizyon 24 Mart 2026).

### Takvim (public API'nin kapanışı) [RESMÎ: r/redditdev, 30 Eylül 2026]

| Tarih | Olay |
|---|---|
| 11 Kasım 2025 | Responsible Builder Policy yürürlüğe girdi. Yeni OAuth erişimi onaya bağlandı, self-servis kapandı [3. TARAF: duyurunun aynaları]. |
| 31 Mart 2026 | Otomasyon kullanan hesaplara "App" etiketi gelmeye başladı. Uygulamaların kaydı istendi [RESMÎ]. |
| 5 Ağustos 2026 | Reddit, üçüncü taraf uygulamaların Devvit'e taşınması gerekeceğini duyurdu. Gerekçe olarak otomatik kötüye kullanım ve ticari kazıma gösterildi. Python desteği yol haritasında yok. Uygulamaların 30 Eylül 2026'ya kadar kaydedilmesi istendi [RESMÎ]. |
| 31 Ekim 2026 | Yeni public API erişim talepleri artık kabul edilmiyor |
| 13 Kasım 2026 | RSS desteği bitiyor [RESMÎ: Reddit Help] |
| 30 Kasım 2026 | Taşıma ödülü (App Migration Program: başarıyla taşınan uygulamaya 1.000 $) için kayıt kapanıyor |
| 12 Ocak 2027 | Kayıt olmayan veya Reddit'in iletişimine yanıt vermeyen uygulama ve kullanıcıların erişimi kapanmaya başlıyor [ÇELİŞKİLİ: Reddit'in gönderisi "kayıt olmayan veya iletişime yanıt vermeyen", kayıt sayfası "Developer Platform ekibiyle iletişime geçmemiş" diyor; TechCrunch ise yalnızca "kayıt olmayan" geliştiricilerin erişiminin kaldırılacağını yazıyor (ppc.land aktarımı)] |
| Mart 2027 | Kalan tüm uygulama ve kullanıcılar için public erişim sona eriyor (gün belirtilmedi) |

## Resmî olmayan yollar ve riskler

| Yol | Nasıl çalışır | Durum / risk |
|---|---|---|
| Kimliksiz `.json` / `old.reddit.com` | URL'ye `.json` eklenerek JSON alınır | Kapatıldı [3. TARAF] [TEST: 403; `old.reddit.com` girişe yönlendiriyor]. Old Reddit'e girişli erişim, son 6 ayda kullanmış kullanıcılarla sınırlı; moderatörler muaf [3. TARAF]. Atlatmaya çalışmak Data API Terms 3.2 / Developer Terms 4.2'ye göre "koruma mekanizmasını aşma" sayılır [RESMÎ]. |
| RSS beslemeleri | `/.rss` | 13 Kasım 2026'ya kadar resmî, sonra kapanıyor [RESMÎ] |
| Tarayıcı otomasyonu (Playwright/Selenium) ve oturum çerezi | Giriş yapılmış oturumla sayfa kazıma | Reddit'in "doğrulama" (insan kontrolü) akışı ve App etiketi bu tür otomasyonu hedefliyor [RESMÎ: "Keeping Reddit Human" duyurusu]. Hesap askıya alınabilir, Reddit kazımaya karşı dava açan bir şirket [3. TARAF]. |
| Pushshift | Tarihsel Reddit arşivi | 2023'ten beri yalnızca onaylı moderatörlere açık [3. TARAF] |
| Arctic Shift ve benzeri topluluk arşivleri | Toplu veri dökümleri | Responsible Builder Policy, RFR programı dışında toplanan veriyle araştırmayı ihlal sayıyor [RESMÎ]. API kapanışının bu araçlara etkisi belirsiz [3. TARAF: r/redditdev sorusu, yanıt doğrulanmadı]. |
| Ticari scraping sağlayıcıları (Bright Data, Apify vb.) | Proxy ile kazıma | Hukuki ve ToS riski kullanıcıya ait. Bu firmaların Reddit ile anlaşması olup olmadığı belgede yok. |

Genel risk özeti:

- Reddit, ihlalde token iptali ve uygulama, hesap, alan adı ya da subreddit askıya alma uygulayabileceğini yazıyor [RESMÎ].
- Kişisel bir takip aracı da "ticari olmayan" sayılsa bile 31 Ekim 2026'dan sonra yeni erişim alamaz [RESMÎ].
- Topluluk raporlarına göre kişisel script'ler onay alamıyor [3. TARAF].

## SDK ve kütüphaneler

| Dil | Kütüphane | Durum (15.10.2026) | Not |
|---|---|---|---|
| TypeScript | **Devvit** (`@devvit/web`, `devvit` CLI) | Resmî. npm `@devvit/web` 0.14.8 [RESMÎ] | Geleceğin tek resmî yolu. Python desteği yol haritasında yok [RESMÎ: 5 Ağustos 2026 duyurusu]. |
| Python | **PRAW** | 8.0.3 (PyPI, Ağustos 2026) [3. TARAF] | En yaygın Data API sarmalayıcısı. `stream` arka planda sorgulama yapar. Data API kapanınca işlevsiz kalır [TAHMİN]. Reddit'in "PRAW → Devvit Web" taşıma rehberi var [RESMÎ]. |
| Python | **Async PRAW** | PyPI'da güncel [3. TARAF] | asyncio sürümü |
| .NET | **Reddit.NET** (NuGet `Reddit.NET`) | Son sürüm 1.0.33 [3. TARAF] | Topluluk kütüphanesi. Bakımı yavaş, OAuth ve olay (monitoring) desteği var [TAHMİN]. |
| .NET | **RedditSharp** | NuGet 2.0.0 [3. TARAF] | Eski, az bakımlı |
| JavaScript | **snoowrap** | npm 1.23.0 (uzun süredir güncellenmiyor) [3. TARAF] | — |
| Go / Java / Rust | go-reddit, JRAW, roux | Topluluk [3. TARAF] | Bakım durumunu kontrol et |

.NET'te kütüphane yerine doğrudan `HttpClient` kullanmak da kolaydır: önce token alınır (`client_credentials` veya `password`), sonra `Authorization: Bearer` ve kurallara uygun bir `User-Agent` başlığıyla `oauth.reddit.com` çağrılır.

## Postman / OpenAPI / koleksiyonlar

- Reddit'in **resmî bir OpenAPI/Swagger dosyası belgede yok**. Resmî referans yalnızca https://www.reddit.com/dev/api/ sayfasıdır [RESMÎ].
- Postman Public API Network'te topluluk yapımı "Reddit API" koleksiyonları var. Bunlar resmî değildir ve güncelliği garanti edilmez [3. TARAF].
- Devvit için tip tanımları (EventTypes API reference) developers.reddit.com'da yer alıyor [RESMÎ].

## Depoda ilgili sayfalar

- Aynı klasördeki diğer platform sayfaları: [Sosyal-Medya](./). X, Bluesky, YouTube gibi platformlarla karşılaştırma için.
- [Mesajlaşma API'leri](../Mesajlasma/). Discord Relay'in gönderdiği Discord/Slack webhook'ları için.
- [Rehberler/Mesajlasma-Altyapilari](../../Rehberler/Mesajlasma-Altyapilari/)

## Kaynaklar

Resmî:

- https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki — Data API Wiki: OAuth zorunluluğu, User-Agent kalıbı, 100 QPM, silme kuralları (son düzenleme 11 Mayıs 2026) — (erişim: 15 Ekim 2026)
- https://support.reddithelp.com/hc/en-us/articles/42728983564564-Responsible-Builder-Policy — Responsible Builder Policy: onay zorunluluğu, Devvit, ticari kullanım, araştırmacı ve AI kuralları (son düzenleme 5 Ekim 2026) — (erişim: 15 Ekim 2026)
- https://support.reddithelp.com/hc/en-us/articles/14945211791892-Developer-Platform-Accessing-Reddit-Data — Ticari kullanım tanımı, ücret, araştırma ve reklam yasağı SSS — (erişim: 15 Ekim 2026)
- https://redditinc.com/policies/data-api-terms — Data API Terms (son revizyon 20 Temmuz 2026) — (erişim: 15 Ekim 2026)
- https://redditinc.com/policies/developer-terms — Developer Terms (son revizyon 24 Mart 2026): App Review, ticari kısıtlar, veri saklama — (erişim: 15 Ekim 2026)
- https://www.reddit.com/r/redditdev/comments/1wubcvf/moving_data_api_apps_to_the_developer_platform/ — Public API kapanış takvimi ve taşıma programı (30 Eylül 2026) — (erişim: 15 Ekim 2026)
- https://www.reddit.com/r/redditdev/comments/1vgbm9c/our_plans_for_the_future_of_reddits_public_data/ — Public API'nin Devvit'e taşınma planı ve gerekçesi (5 Ağustos 2026) — (erişim: 15 Ekim 2026)
- https://www.reddit.com/r/redditdev/comments/1s3f3ag/keeping_reddit_human_a_new_app_label_for/ — App etiketi ve uygulama kaydı (25 Mart 2026) — (erişim: 15 Ekim 2026)
- https://support.reddithelp.com/hc/en-us/articles/54058188280852-Setting-up-mod-alerts-in-Discord-or-Slack — RSS desteğinin 13 Kasım 2026'da bitişi ve Discord Relay — (erişim: 15 Ekim 2026)
- https://www.reddit.com/dev/api/ — Canlı API referansı (uç noktaların tam listesi) — (erişim: 15 Ekim 2026)
- https://github.com/reddit-archive/reddit/wiki/OAuth2 — OAuth2 akışları, grant türleri, token süresi — (erişim: 15 Ekim 2026)
- https://developers.reddit.com/docs/ — Devvit dokümanı (sürüm 0.14) — (erişim: 15 Ekim 2026)
- https://developers.reddit.com/docs/capabilities/server/triggers — Devvit tetikleyici listesi, tekrar teslim uyarısı — (erişim: 15 Ekim 2026)
- https://developers.reddit.com/docs/introduction/intro-mod-tools — Mod tool'ları topluluğa moderatörlerin kurması — (erişim: 15 Ekim 2026)
- https://developers.reddit.com/docs/capabilities/server/http-fetch — Devvit HTTP Fetch kuralları — (erişim: 15 Ekim 2026)
- https://developers.reddit.com/docs/capabilities/server/reddit-api — Devvit içinden Reddit API ve erişilemeyen özel veriler — (erişim: 15 Ekim 2026)
- https://developers.reddit.com/docs/guides/migrate/public-api — Data API/PRAW → Devvit taşıma rehberi ve muafiyetler — (erişim: 15 Ekim 2026)

Üçüncü taraf:

- https://ppc.land/reddit-to-halt-public-data-api-access-in-march-2027-as-14-000-apps-register/ — Takvim, kimliksiz `.json` kapanışı, admin yorumları özeti, r/anime geliştiricisinin taşıma pazarlığı, Old Reddit erişim kısıtı, TechCrunch ifadesiyle karşılaştırma — (erişim: 15 Ekim 2026)
- https://www.techrepublic.com/article/news-reddit-rss-public-api-shutdown/ — RSS ve public API kapanışı haberi (içerik doğrudan okunamadı, arama özeti) — (erişim: 15 Ekim 2026)
- https://pypi.org/project/praw/ — PRAW sürüm bilgisi — (erişim: 15 Ekim 2026)
- https://www.nuget.org/packages/Reddit.NET — Reddit.NET .NET kütüphanesi — (erişim: 15 Ekim 2026)
