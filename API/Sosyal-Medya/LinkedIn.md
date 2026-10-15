# LinkedIn API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **kısıtlı** (resmî API var; başkalarının gönderilerini okuma yok)

## Özet

LinkedIn'in resmî API'leri Microsoft Learn üzerinde belgelenir ve OAuth 2.0 ile çalışır. Herkese onaysız açık olan yalnızca üç izin vardır ("Open Permissions"): oturum açma için `profile` ve `email` (OpenID Connect ürünü; `openid` kapsamıyla birlikte istenir) ve **kendi adına** paylaşım yapma için `w_member_social` [RESMÎ]. Şirket sayfası yönetimi (Community Management API) ve reklam (Advertising API) gibi ürünler başvuru ve LinkedIn incelemesiyle açılır; Community Management yalnızca **kayıtlı tüzel kişilere** verilir. Satış (SNAP), işe alım (Talent) ve Learning ise ayrı partner programlarıdır [RESMÎ]. API'nin kendisi için yayımlanmış bir ücret tablosu yoktur; erişim ücretli satılmaz, onaya bağlıdır [RESMÎ: fiyat belgede yok]. **Rastgele bir kişinin veya şirketin gönderilerini okuyacak resmî bir yol yoktur.** Yönetici olmadığın şirket sayfalarının ve kişilerin gönderileri API'den okunamaz.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Herkese açık (kimliksiz)** | — | Kimliksiz bir veri API'si yok. Yalnızca OIDC keşif belgesi (`/.well-known/openid-configuration`) ve JWKS herkese açık [RESMÎ] | — |
| **Geliştirici uygulaması (self-servis, "Open Permissions")** | LinkedIn hesabı + Developer Portal'da uygulama. Uygulamanın bir LinkedIn Page ile ilişkilendirilmesi gerekir; Community Management başvurusunda bu ilişkinin sayfa süper yöneticisince doğrulanması şarttır ("Application verified by LinkedIn Page") [RESMÎ] | Açık izinler: `profile`, `email` (Sign In with LinkedIn using OpenID Connect; `openid` kapsamıyla birlikte); `w_member_social` (Share on LinkedIn: kimliği doğrulanmış üye **adına** gönderi, yorum ve beğeni) [RESMÎ] | Ücretsiz; günlük limitler uç noktaya göre değişir ve yalnızca portalda görünür [RESMÎ] |
| **İşletme onayı: Community Management API, Development Tier** | Kayıtlı tüzel kişi, kurumsal e-posta (kişisel e-posta kabul edilmez), web sitesi, gizlilik politikası, uygulamanın şirket sayfası süper yöneticisince doğrulanması [RESMÎ] | Ürünün verdiği izinler: `r_organization_social`, `r_organization_social_feed`, `w_organization_social`, `w_organization_social_feed`, `w_member_social`, `w_member_social_feed`, `rw_organization_admin`, `r_organization_followers`, `r_basicprofile`, `r_1st_connections_size`, `r_member_profileAnalytics` (202504 ve sonrası sürümler; profil görüntüleyen sayısı, takipçi, arama görünümü), `r_member_postAnalytics` (202506 ve sonrası; kendi gönderilerinin gösterim, tepki, yorum, paylaşım sayıları) [RESMÎ]. Pratikte: yönettiğin şirket sayfalarında gönderi, yorum ve tepki okuma/yazma; sayfa, takipçi ve paylaşım istatistikleri; bildirimler (`rw_organization_admin`); kendi profil ve gönderi analitiğin [RESMÎ] | Ücretsiz; günlük limit uygulama başına 500, üye başına 100 istek. Ayrıca: `BATCH_GET` kullanan hiçbir çağrı yapılamaz; Social Actions webhook **push bildirimleri kapalıdır** (yalnızca pull API'si kullanılabilir); entegrasyon 12 ay içinde tamamlanmalıdır [RESMÎ] |
| **İşletme onayı: Community Management API, Standard Tier** | Development Tier'dan sonra ekran kaydıyla (screencast) her kullanım senaryosunu göstermek, test hesabı vermek ve veri saklama kurallarına uymak [RESMÎ] | Development ile aynı API'ler, tam hacimde | Ücretsiz; "No restrictions" (Development kısıtları yok); limitler portalda görünür [RESMÎ] |
| **Başvuruyla açık ürünler (onaylanan tüm geliştiricilere)** | Developer Portal → Products üzerinden başvuru ve onay [RESMÎ] | Advertising API (Development/Standard), Community Management API, Events Management API (self-serve, talep üzerine; `r_events`, `rw_events`), Lead Sync API, Conversions API, Matched Audiences API (Advertising onayı ön şart) [RESMÎ] | Fiyat belgede yok; reklam bütçesi ayrıca ödenir |
| **Kısıtlı ürünler** | Advertising onayı + LinkedIn'in değerlendirdiği ek kriterler (başvuru anketi, süre belirsiz) [RESMÎ] | Audience Insights API, Media Planning API [RESMÎ] | Fiyat belgede yok |
| **Partner programları** | Ayrı partnerlik başvurusu [RESMÎ] | SNAP (Sales Navigator verisi), Talent (RSC, Apply Connect vb. ATS entegrasyonları), Learning; Live Events (beta, ayrı başvuru; aşağıdaki nota bak) | Partner sözleşmesine bağlı; fiyat belgede yok |
| **Kapalı izinler / ürünler** | Başvuru alınmıyor | `r_member_social` (bir üyenin kendi gönderilerini okuma): "kapalı izin, kaynak kısıtı nedeniyle başvuru kabul edilmiyor" [RESMÎ]. `r_member_social_feed`: "yalnızca seçilmiş geliştiricilere verilir" [RESMÎ]. `r_compliance`/`w_compliance` (Compliance): kapalı [RESMÎ]. Company Intelligence API: yeni başvuru alınmıyor [RESMÎ] | — |
| **Resmî olmayan** | Normal LinkedIn hesabıyla oturum çerezi ya da scraping | Web uygulamasının iç "Voyager" uç noktaları, profil ve gönderi verisi | **User Agreement 8.2'yi ihlal eder**; hesap kapatma ve dava riski var (aşağıya bak) |

## Kimlik doğrulama

- **OAuth 2.0** iki akışla çalışır [RESMÎ]:
  - **3-legged (Authorization Code Flow)**: Üye adına yapılan işlemler içindir. Yetkilendirme adresi `https://www.linkedin.com/oauth/v2/authorization`, token adresi `https://www.linkedin.com/oauth/v2/accessToken`.
  - **2-legged (Client Credentials)**: Yalnızca bazı partner API'lerinde uygulama kimliğiyle kullanılır.
- **OpenID Connect**: `openid profile email` kapsamlarıyla bir ID Token (JWT, RS256) döner. Bilgiler `GET https://api.linkedin.com/v2/userinfo` ile de alınabilir; dönen alanlar `sub`, `name`, `given_name`, `family_name`, `picture`, `locale`, `email`, `email_verified`'dır. `subject_types_supported: pairwise` olduğundan `sub` değeri uygulamaya özeldir [RESMÎ]. LinkedIn, OIDC'nin **kimlik doğrulaması (KYC) sayılmayacağını** açıkça belirtir [RESMÎ].
- **Token ömrü**: Access token varsayılan olarak 60 gün geçerlidir. Programatik refresh token yalnızca onaylı Marketing Developer Platform (MDP) partnerlerine verilir ve 365 gün geçerlidir; süresi dolunca üyenin yeniden yetki vermesi gerekir [RESMÎ]. Self-servis uygulamalarda refresh token yoktur; 60 gün sonunda kullanıcının yeniden giriş yapması gerekir [TAHMİN: belgeye göre refresh yalnızca MDP partnerlerinde, bu da self-serviste olmadığını gösteriyor].
- **Zorunlu başlıklar** (`/rest/` uç noktaları): `Authorization: Bearer <token>`, `Linkedin-Version: YYYYMM` (sürümsüz çağrı hata döner) ve `X-Restli-Protocol-Version: 2.0.0` [RESMÎ].
- **Sürümleme**: Marketing/Community API'leri her ay yeni sürüm yayımlar ve her sürüm en az 1 yıl desteklenir. 15.10.2026 itibarıyla en yeni sürüm `202610`'dur; `202511` sürümü 16.11.2026'da kapanacaktır [RESMÎ].
- URN'ler (`urn:li:person:…`, `urn:li:organization:…`) URL içinde kodlanmalıdır (`:` → `%3A`) [RESMÎ].

## Temel uç noktalar

Taban adres: `https://api.linkedin.com/rest/` (sürümlü). Bazı eski uç noktalar `https://api.linkedin.com/v2/` altındadır.

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/v2/userinfo` | Giriş yapan üyenin adını, fotoğrafını ve e-postasını döner | Self-servis (`openid profile email`) | Yalnızca **kendi** profilin [RESMÎ] |
| POST | `/rest/posts` | Gönderi oluşturur (metin, görsel, video, belge, makale, anket, multiImage); yeniden paylaşım (`reshareContext`) | `w_member_social` (kendi adına), `w_organization_social` (sayfa adına) | Makale önizlemesi için URL kazınmaz; başlık ve küçük görsel elle verilir [RESMÎ] |
| GET | `/rest/posts/{urn}` | URN'si bilinen gönderiyi getirir | `r_organization_social` / `r_member_social` | Yalnızca yetkili olduğun yazarların gönderileri [RESMÎ] |
| GET | `/rest/posts?q=author&author={urn}` | Bir yazarın gönderilerini listeler (`count` en fazla 100, `sortBy=CREATED/LAST_MODIFIED`) | Kişi için `r_member_social` (**kapalı**), şirket için `r_organization_social` + sayfa rolü | **Takip için kritik:** yalnızca yöneticisi olduğun sayfalarda çalışır [RESMÎ] |
| GET | `/rest/socialMetadata/{urn}` | Bir gönderideki tepki ve yorum özetini (sayılarını) döner | `r_organization_social_feed` (üye için `r_member_social_feed`, kısıtlı) | Tepki ve yorum sayıları için kullanılır; belgeye göre `socialActions`'ın bu işlevinin yerini aldı [RESMÎ] |
| GET/POST | `/rest/socialActions/{urn}/comments`, `/rest/reactions` | Yorum ve tepkileri okur ya da yazar | `*_social_feed` izinleri: `r_organization_social_feed` / `w_organization_social_feed`, üye adına yazma `w_member_social_feed` | Yorum **metni** için `socialActions/{urn}/comments` kullanılır. Üye adına okuma izni `r_member_social_feed` kısıtlıdır (yalnızca seçilmiş geliştiriciler) [RESMÎ] |
| GET | `/rest/memberCreatorPostAnalytics?q=entity` / `?q=me` | Üyenin kendi gönderilerinin (tek gönderi ya da toplu) gösterim, erişilen üye, tepki, yorum, paylaşım vb. **sayılarını** döner | `r_member_postAnalytics` (Community Management, 202506 ve sonrası) | Yalnızca kimliği doğrulanmış üyenin kendi gönderileri; yorum metni dönmez [RESMÎ] |
| GET | `/rest/organizationAcls?q=roleAssignee` | Üyenin yönettiği şirket sayfalarını listeler | Community Management | [RESMÎ] |
| GET | `/rest/organizationalEntityFollowerStatistics`, `/rest/organizationalEntityShareStatistics`, `/rest/organizationPageStatistics` | Takipçi, paylaşım ve sayfa istatistiklerini döner | Community Management | Yalnızca kendi sayfaların |
| GET | `/rest/organizationalEntityNotifications?q=criteria&actions=List(...)` | Sayfa bildirimlerini çeker (LIKE, COMMENT, SHARE, SHARE_MENTION, ADMIN_COMMENT, COMMENT_EDIT, COMMENT_DELETE) | `rw_organization_admin` | Bildirimler 60 gün saklanır [RESMÎ] |
| PUT | `/rest/eventSubscriptions/(developerApplication:…,user:…,entity:…,eventType:ORGANIZATION_SOCIAL_ACTION_NOTIFICATIONS)` | Webhook aboneliği oluşturur | `rw_organization_admin` | Üye sayfanın ADMINISTRATOR'ı olmalıdır [RESMÎ] |
| POST | `/v2/liveAssetActions?action=register` / `action=end` | Canlı yayın kaydını başlatır ya da bitirir (RTMP/RTMPS ingest) | Live Events (beta, ayrı başvuru) | Yalnızca **kendi** yayının; Development Tier'da API başına günde ~100 istek [RESMÎ]. Resmî Live Events belgesi 2023'ten beri güncellenmedi (son güncelleme 20.12.2023); eski `r_liteprofile` ve `ugcPosts` akışına dayanıyor. Güncel durum Developer Portal'dan doğrulanmalı [RESMÎ: belge tarihi] |

Tam liste: [Community Management API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview), [Marketing API referansı](https://learn.microsoft.com/en-us/linkedin/marketing/).

## Gerçek zamanlı / bildirim

- **Webhook** [RESMÎ]: Yalnızca webhook kullanım senaryosu onaylanmış uygulamalarda açılır. Uç nokta portalın "Webhooks" sekmesinden kaydedilir. LinkedIn `GET ?challengeCode=…` ile doğrulama ister; uygulama `challengeResponse = hex(HMACSHA256(challengeCode, clientSecret))` değerini 3 saniye içinde döndürmelidir. Doğrulama 2 saatte bir tekrarlanır; art arda 3 başarısızlıkta uç nokta engellenir. Gelen her POST'un `X-LI-Signature` başlığı `hex(HMACSHA256("hmacsha256=" + ham gövde, clientSecret))` ile doğrulanır. Adres HTTPS olmalıdır; **ngrok desteklenmez**.
- **Organization Social Action Notifications** [RESMÎ]: Bunlar yalnızca **yöneticisi olduğun şirket sayfasındaki** etkileşimlerdir: beğeni, yorum, paylaşım, sayfadan bahsetme (SHARE_MENTION), yorum düzenleme ve silme. Bildirimler 10'arlı paketler hâlinde gelir. Teslim edilemeyen bildirim 8 saat boyunca 5 dakikada bir yeniden denenir; kaçırılanlar 60 gün içinde pull API'siyle çekilebilir. LIKE, COMMENT ve SHARE olayları yalnızca `PUBLIC` gönderilerde tetiklenir.
- **Lead Sync**: Lead Gen Form bildirimleri webhook ile alınır ve ayrı bir onay gerektirir [RESMÎ].
- **WebSocket / streaming / WebSub**: Belgede yok.
- **RSS**: LinkedIn kullanıcı veya şirket gönderileri için resmî RSS **sunmaz** [3. TARAF]. RSS.app gibi üçüncü taraf servisler herkese açık şirket sayfalarını RSS'e çevirdiğini söyler; bu yöntem kazıma (scraping) tabanlıdır ve aynı ToS riskini taşır [3. TARAF]. Şirket sayfasına RSS **bağlayıp otomatik taslak oluşturma** özelliğinin hâlâ var olup olmadığı tartışmalıdır [ÇELİŞKİLİ]; bu özellik zaten okuma değil, yayımlama içindir.

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Rastgele bir kişinin yeni gönderisi | **Hayır (resmî)** | — | — | `r_member_social` kapalı ve zaten yalnızca token sahibi üyenin kendi gönderileri içindir [RESMÎ] |
| Rastgele bir şirket sayfasının yeni gönderisi | **Hayır (resmî)** | — | — | `r_organization_social` yalnızca ADMINISTRATOR, CONTENT_ADMIN veya DIRECT_SPONSORED_CONTENT_POSTER rolündeki sayfalarda çalışır [RESMÎ] |
| Yönettiğin şirket sayfasının gönderileri | Evet | `GET /rest/posts?q=author` ile periyodik sorgu | Community Management | "Social feed" (sitede LinkedIn akışı gösterme) kullanımı yasaktır [RESMÎ] |
| Yönettiğin sayfaya yorum, beğeni, paylaşım veya bahsetme | Evet | Webhook (`ORGANIZATION_SOCIAL_ACTION_NOTIFICATIONS`) + pull API'si | Community Management (Standard) + webhook onayı | Gerçek zamanlıya yakındır [RESMÎ] |
| Kendi gönderilerine gelen etkileşim **sayıları** | Evet | `GET /rest/memberCreatorPostAnalytics` (`q=entity` veya `q=me`) ile periyodik sorgu | `r_member_postAnalytics` (Community Management, 202506 ve sonrası sürümler) | Yorum, tepki, paylaşım ve gösterim sayıları [RESMÎ] |
| Kendi gönderilerine gelen yorumların **metni** | **Hayır (pratikte)** | — | — | `r_member_social` kapalı, `r_member_social_feed` yalnızca seçilmiş geliştiricilere veriliyor [RESMÎ] |
| Bir kişinin veya sayfanın canlı yayına başlaması | **Hayır** | Live Events API yalnızca **kendi** yayınını yönetmek içindir | Live Events (beta) | Başkasının yayınını algılayan bir uç nokta belgede yok |
| Anahtar kelime veya hashtag araması | **Hayır** | Genel gönderi arama API'si yoktur | — | Belgede yok |
| Mesajlar (DM) | **Hayır** | Mesajlaşma API'si yalnızca belirli partner programlarında var (Sales/Talent) [TAHMİN] | Partner | Genel kullanıma açık değil |
| Profil değişikliği (iş değişikliği vb.) | **Hayır (resmî)** | — | SNAP partnerine `r_sales_nav_profiles` sınırlı olarak açık [RESMÎ] | Satış ve işe alım dışı kullanımı yasak |
| Filtreleme / önem ayıklama | Kendi tarafında | API'den gelen metin üzerinde yerel filtre | — | Üye verisi en fazla 48 saat saklanabilir; profil verisi çoğunlukla 24 saat [RESMÎ] |

**Sonuç:** LinkedIn, takip uygulaması açısından listedeki **en kapalı** platformlardan biridir. Resmî yolla yalnızca **kendi şirket sayfalarını ve kendi hesabını** izleyebilirsin. Başkalarını izlemek için üç seçenek kalır: (a) LinkedIn bildirimlerinin e-posta kopyalarını okumak (e-posta tarafını kendi hesabında işlemek) [TAHMİN], (b) takip edilen kişinin aynı içeriği yayımladığı başka kanallar (blog RSS'i, X, Bluesky vb.), (c) resmî olmayan yollar (riskli, aşağıya bak).

## "LinkedIn ile giriş" ile CV / profil verisi alma

Soru: Kullanıcı uygulamana LinkedIn ile giriş yaptığında iş deneyimi, eğitim, beceri ve sertifika gibi CV bilgilerini alabilir misin? **Kısa cevap: herkese açık giriş ürünüyle hayır.** CV verisi ancak onay gerektiren birkaç özel yoldan ya da kullanıcının kendi yüklediği dosyadan gelir.

### Yollar ve koşulları

| Yol | Ne verir | Kime açık / koşul | Durum |
|---|---|---|---|
| **Sign In with LinkedIn (OIDC)**: `openid profile email` | `sub` (uygulamaya özel kimlik), ad-soyad, fotoğraf, `locale`, e-posta, `email_verified`. Deneyim, eğitim, beceri ve özet **yok** [RESMÎ] | Herkese açık, self-servis | Getting Access sayfası `profile`'ı "ad, headline, fotoğraf" diye tanımlıyor, ama `userinfo` ve keşif belgesinde `headline` yok; gelmeyeceğini varsay [ÇELİŞKİLİ] |
| **Eski izinler** (`r_liteprofile`, `r_basicprofile`, `r_fullprofile`) | `r_fullprofile`; `positions`, `educations`, `skills`, `summary`, `certifications` gibi tam CV alanlarını veriyordu [RESMÎ] | `r_fullprofile` **kapalı**; "Access to r_fullprofile is now closed". `/v2/me` üzerinden fazladan alan istemek "yalnızca seçilmiş partnerlere" verilen izin ister [RESMÎ] | Eski "Sign In with LinkedIn" 1 Ağustos 2023'te kaldırıldı. `r_basicprofile` bugün yalnızca Community Management/Advertising onaylı uygulamalara verilir ve yalnızca ad, fotoğraf, headline ve profil URL'si döner; pozisyon ve eğitim yok [RESMÎ] |
| **Member Data Portability API (3rd Party)**: AB Dijital Piyasalar Yasası (DMA) gereği açılan ürün; `r_dma_portability_3rd_party` | Üyenin onayıyla **tam CV**: `GET /rest/memberSnapshotData?q=criteria&domain=…` ile `PROFILE` (headline, summary), `POSITIONS`, `EDUCATION`, `SKILLS`, `CERTIFICATIONS`, `LANGUAGES`, `PROJECTS`, `COURSES`, `HONORS`, `PUBLICATIONS`, `RECOMMENDATIONS` vb. (`PROFILE_SUMMARY` ise yapay zekâ özetidir). Onaydan sonraki değişiklikler `memberChangeLogs` ile alınır (son 28 gün) [RESMÎ] | Yalnızca **Avrupa Ekonomik Alanı (AEA)** üyeleri onay verebilir; konum, üyenin profilindeki konuma göre belirlenir. **Profil konumu Türkiye olan üyelere kapalı** [RESMÎ; Türkiye adı belgede geçmez, kuraldan çıkarım]. Başvuru şartları: şirket sayfası, kurumsal e-postayla iş doğrulaması (kişisel e-posta kabul edilmez), yasal ad, adres, gizlilik politikası ve LinkedIn incelemesi [RESMÎ] | Yalnızca `Linkedin-Version: 202312` ile çalışır. İsviçre konusunda belgeler çelişiyor (geliştirici sayfası yalnızca AEA, yardım sayfası AEA + İsviçre diyor) [ÇELİŞKİLİ]. `INBOX`, `CONNECTIONS`, `PHONE_NUMBERS` gibi hassas domain'ler de var; yalnızca gereken domain'i iste |
| **Verified on LinkedIn**: `GET /rest/identityMe` | Development ve Lite katmanları yalnızca temel bilgi verir (ad, e-posta, fotoğraf, profil URL'si) ve doğrulama durumunu gösterir. **Plus** katmanı buna ek olarak **tek güncel pozisyonu** (`r_primary_current_experience`) ve **son eğitimi** (`r_most_recent_education`) verir; tam iş geçmişi ve beceriler hiçbir katmanda gelmez [RESMÎ] | Development yalnızca uygulamanın kendi yönetici hesaplarıyla test içindir. Lite, 14.10.2026 tarihli duyuruyla **yeni geliştiricilere kapandı**. Plus ise iş ortaklığı ve sertifikasyon gerektirir; fiyatı "Contact us" [RESMÎ] | **İşe alım kararında kullanmak yasak** ("Do not use to rank or approve candidates"). Öte yandan aynı belgeler Plus için "iş başvuru formunu ön doldurma"yı örnek kullanım olarak sayıyor [ÇELİŞKİLİ]. İşe alım bağlamında LinkedIn'den yazılı teyit al |
| **Talent partner programları**: Apply Connect, Apply with LinkedIn, Recruiter System Connect | Apply Connect, LinkedIn'deki "Kolay Başvuru" ile yapılan başvuruyu ATS'ye aktarır: ad, e-posta, deneyim ve eğitim soruları, eşleşen beceriler, CV dosyası (bağlantı 30 gün geçerli). Tam profil yalnızca iframe eklentisinde görüntülenir, ayrıca veri olarak verilmez [RESMÎ] | Yalnızca ATS (aday takip sistemi) yazılımı sağlayıcılarına açık. Müşterinin Recruiter Corporate ya da Professional Services lisansı ve sertifikasyon gerekir. **Apply with LinkedIn yeni partner almıyor** [RESMÎ] | Genel bir uygulamanın "LinkedIn ile giriş" yerine geçmez; iş ilanı ve başvuru akışına bağlıdır |
| **Kullanıcının kendi dışa aktarımı** | "Verilerini indir" arşivindeki CSV dosyaları: `Positions`, `Education`, `Skills`, `Certifications`, `Profile`, `Languages`… Ya da profil sayfasındaki "PDF olarak kaydet" [RESMÎ] | Herkes; masaüstünden: Ben → Ayarlar ve Gizlilik → Veri Gizliliği → Verilerini indir. CV verileri yaklaşık 10 dakikada hazır olur, bağlantı 72 saat geçerli. PDF ayda 200 indirme sınırlı; belge yalnızca İngilizce karakterleri desteklediğini söylüyor, Türkçe profilde bozulabilir [RESMÎ] | API onayı gerekmez; kullanıcı dosyayı uygulamana kendisi yükler, sen ayrıştırırsın [TAHMİN: uygulama tasarımı]. `Profile.csv` adres ve doğum tarihi de içerir; gerekmeyen alanları alma |
| **Kazıma / Voyager / kullanıcının çerez ya da parolasıyla veri çekme** | Her şey | — | User Agreement 8.2'ye aykırı (bot, kazıma, erişim kontrolünü aşma yasak) [RESMÎ]; yukarıdaki dava örneklerine bak |

### Durum → Sonuç

- **Yalnızca kimlik ve e-posta yeterli** → OIDC ile giriş; CV alanlarını kullanıcı formda kendisi doldurur.
- **Kullanıcıların AEA'da, uygulama sahibi kayıtlı bir şirket** → Member Data Portability (3rd Party) başvurusu; onay sonrası tam CV alınabilir.
- **Kullanıcılar Türkiye'de ya da AEA dışında** → API'den tam CV alınamaz. En pratik yol: OIDC ile giriş + "LinkedIn arşivini ya da PDF'ini yükle" (dosya ayrıştırma) + kullanıcının elle düzeltebildiği, önceden doldurulmuş form.
- **Yalnızca güncel işyeri ve son okulu göstermek ya da güven rozeti** → Verified on LinkedIn Plus (iş ortaklığıyla); adayı elemek ya da sıralamak için kullanılamaz.
- **ATS ya da iş ilanı platformu kuruyorsun** → Talent partnerliği (Apply Connect); lisans ve sertifikasyon şartı var.
- **Kazıma** → önerilmez; hesap kapatma ve dava riski.

### Saklama ve rıza

- API Koşulları: veriye erişmeden önce üyenin hukuken geçerli onayı alınır ve token süresi dolunca onay yenilenir (5.2). İçerik, izin verilen durumlar dışında saklanmaz (4.1). Profil verisi saklamak üyenin geçerli onayını gerektirir (4.3). Üye isteyince ya da hesabını kapatınca tokenlar dahil tüm veri hemen silinir (4.4). Veri kredi, sigorta, istihdam ve konut gibi uygunluk kararlarına girdi olamaz (3.1) [RESMÎ].
- Saklama niyeti üyeye açıkça gösterilmeli (yazılı beyan ya da düzenlenebilir, önceden doldurulmuş form); üyenin formdan sildiği veri saklanamaz [RESMÎ].
- **KVKK**: CV verisi kişisel veridir. Aydınlatma metni, açık rıza ya da başka bir hukuki dayanak, saklama süresi ve silme yolu gerekir. Başvurularda gelebilecek engellilik ya da ırk gibi bilgiler **özel nitelikli kişisel veridir** [TAHMİN: KVKK metninden ayrıca doğrulanmadı; hukuki danışmanlık değildir].

## Hız sınırları ve fiyatlar

- Limitler **24 saatliktir** ve her gün UTC gece yarısında sıfırlanır. İki tür limit vardır: **uygulama** başına ve **üye başına (uygulama içinde)** [RESMÎ].
- Standart limitler **yayımlanmaz**. Bir uç noktanın limitini görmek için o gün ona en az bir istek atmak, sonra Developer Portal → uygulama → **Analytics** sekmesine bakmak gerekir [RESMÎ].
- Limit aşılınca `429` döner. Uygulama limitinin %75'i aşılınca yöneticilere 1–2 saat gecikmeli e-posta uyarısı gelir [RESMÎ].
- Community Management Development Tier: uygulama başına **500**, üye başına **100** istek/gün [RESMÎ]. Live Events Development Tier: API başına ~**100** istek/gün [RESMÎ].
- **Fiyat**: API erişimi için ücret tablosu yoktur; erişim onay ve partnerlik ile verilir. Reklam API'sinde reklam bütçesi ayrıca ödenir [RESMÎ: API ücretine dair belge yok].
- **Veri saklama**: Üye sosyal aktivite verisi en fazla 48 saat, profil verisinin çoğu en fazla 24 saat saklanabilir. Veri dışa aktarılamaz ve başka verilerle birleştirilemez [RESMÎ].

## Resmî olmayan yollar ve riskler

| Yol | Nasıl çalışır | Risk |
|---|---|---|
| **Voyager iç API'si** (ör. Python `linkedin-api`, PyPI; eski GitHub deposu tomquirk/linkedin-api) | Normal bir LinkedIn hesabıyla giriş yapar, web uygulamasının kullandığı `linkedin.com/voyager/api/...` uç noktalarını çağırır; profil, gönderi, mesaj ve arama verisi alınabilir [3. TARAF] | README'si kütüphanenin LinkedIn kurallarını ihlal ettiğini ve hesabın kısıtlanabileceğini kendisi yazar; kişisel hesapla kullanılmamasını önerir. Doğrulama (challenge) sayfası çıktığında kırılır. Son sürüm 2.3.1 (07.11.2024, PyPI) [3. TARAF, doğrulandı]; GitHub deposu 15.10.2026 itibarıyla erişilemiyor (404). Proje bakımsız ya da kaldırılmış olabilir |
| **Tarayıcı otomasyonu / scraping** (Playwright, Selenium, Puppeteer, headless) | Oturum açmış tarayıcıda sayfaları gezer ve HTML'i ayrıştırır | User Agreement 8.2 bot, script ve kazıma ile erişim kontrolünü atlatmayı açıkça yasaklar [RESMÎ]. Hesap kısıtlama veya kapatma ve IP engeli olur |
| **Ticari kazıma API'leri** (scraper veri sağlayıcıları) | Sağlayıcının hesap havuzu veya proxy'leri üzerinden veri toplar | Sağlayıcı kapanabilir; aşağıdaki davalara bak. Veri kaynağı belirsiz olduğundan KVKK/GDPR sorumluluğu sende kalabilir |
| **Herkese açık sayfadan RSS üreten servisler** (RSS.app vb.) | Oturumsuz görünen şirket sayfası içeriğini RSS'e çevirir [3. TARAF] | Kazıma tabanlıdır; LinkedIn giriş duvarı sık sık kırar |

**Hukuki emsaller (nesnel):**

- **hiQ Labs v. LinkedIn (ABD, 2017–2022)**: Dokuzuncu Daire, herkese açık veriyi kazımanın tek başına CFAA (bilgisayar sahtekârlığı yasası) kapsamında "yetkisiz erişim" sayılmayabileceğine hükmetti [3. TARAF]. Ancak Kasım 2022'de mahkeme, hiQ'nun otomatik kazıma ve sahte hesaplar ("turker") yoluyla LinkedIn **Kullanıcı Sözleşmesini ihlal ettiğine** (sözleşme ihlali) karar verdi. Aralık 2022'de hiQ, kazımayı durdurmayı, verileri ve kaynak kodunu silmeyi kabul ettiği bir **kalıcı ihtiyati tedbire ve 500.000 USD tazminat kararına** razı oldu [3. TARAF]. Çıkarılacak ders: "Herkese açık veri" savunması CFAA'ya karşı kısmen işe yaradı, ama **sözleşme ve haksız fiil** yönünden kazıyan taraf kaybetti.
- **LinkedIn v. Proxycurl (2025)**: LinkedIn, Ocak 2025'te sahte hesaplarla kazıma iddiasıyla dava açtı. Mahkeme verilerin silinmesini ve erişimin durdurulmasını kalıcı tedbirle karara bağladı; servis 4 Temmuz 2025'te kapandı [3. TARAF].
- **LinkedIn v. ProAPIs (Ekim 2025)**: Milyonlarca sahte hesapla veri kazıma iddiasıyla açılan yeni bir dava [3. TARAF].
- **Türkiye/AB açısından**: Kazınan profil ve gönderi verisi kişisel veridir. KVKK ve GDPR kapsamında açık bir hukuki dayanak, aydınlatma yükümlülüğü ve saklama süresi gerekir. LinkedIn'in sözleşme davası açma riski ülkeden bağımsızdır [TAHMİN].

## SDK ve kütüphaneler

| Ad | Dil | Tür | Not |
|---|---|---|---|
| `linkedin-api-client` (GitHub: linkedin-developers/linkedin-api-python-client) | Python | **Resmî**, beta | Rest.li isteklerini kolaylaştıran ince bir istemci; README "beta, değişebilir" der [3. TARAF aracılığıyla resmî repo] |
| linkedin-developers/linkedin-api-js-client | JavaScript/TypeScript | **Resmî**, beta | Aynı organizasyonun JS istemcisi [3. TARAF] |
| .NET | C# | Resmî SDK **yok** | `HttpClient` ile doğrudan REST çağrısı yapılır. OAuth/OIDC için ASP.NET Core `AddOpenIdConnect` (keşif adresi: `https://www.linkedin.com/oauth/.well-known/openid-configuration`) veya `AspNet.Security.OAuth.LinkedIn` (AspNet.Security.OAuth.Providers topluluk paketi) kullanılır [TAHMİN: paket durumu doğrulanmadı] |
| Passport `passport-linkedin-oauth2`, NextAuth/Auth.js LinkedIn provider | Node.js | Topluluk | Yalnızca oturum açma içindir |
| `linkedin-api` (tomquirk) | Python | **Resmî değil** (Voyager) | ToS ihlali; son sürüm 2.3.1 (07.11.2024); GitHub deposu 15.10.2026 itibarıyla 404, bakımsız ya da kaldırılmış olabilir; yukarıya bak |

## Postman / OpenAPI / koleksiyonlar

- **Resmî Postman çalışma alanı**: [LinkedIn Marketing Solutions – Versioned APIs](https://www.postman.com/linkedin-developer-apis/workspace/linkedin-marketing-solutions-versioned-apis/overview) [RESMÎ, belgelerden bağlantı veriliyor].
- **OpenAPI/Swagger**: Resmî bir OpenAPI dosyası belgede yok. API Rest.li protokolünü kullanır; şemalar her sayfada tablo olarak verilir.
- **Değişiklik takibi**: Resmî [Recent Changes](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/recent-changes) ve [Migrations](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/migrations) sayfaları kullanılır [RESMÎ]. (Belgelerin kaynak deposu herkese açık değil.)

## Depoda ilgili sayfalar

- [Mesajlaşma Altyapıları rehberi](../../Rehberler/Mesajlasma-Altyapilari/): Telegram, WhatsApp ve BiP API'lerinin kuralları; LinkedIn'de bulunmayan "kanal takibi" bu platformlarda mümkün.
- [Şirket Kurma rehberi](../../Rehberler/Sirket-Kurma/): Community Management API **kayıtlı tüzel kişi** istediği için ilgilidir.
- Aynı klasördeki diğer sosyal medya API sayfaları (X, Bluesky, Threads vb.) karşılaştırma için kullanılabilir.

## Kaynaklar

**Resmî**

- [Getting Access to LinkedIn APIs](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access): Açık izinler, partner programları ve kapalı izinler (erişim: 15 Ekim 2026).
- [Sign In with LinkedIn using OpenID Connect](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2): OIDC kapsamları, keşif belgesi, userinfo (erişim: 15 Ekim 2026).
- [Refresh Tokens with OAuth 2.0](https://learn.microsoft.com/en-us/linkedin/shared/authentication/programmatic-refresh-tokens): 60 günlük access token ve 365 günlük refresh token (yalnızca MDP partnerleri) (erişim: 15 Ekim 2026).
- [Community Management – Overview](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview): Kullanım senaryoları, katmanlar, limitler, `r_member_social`'ın kapalı olması (erişim: 15 Ekim 2026).
- [Community Management App Review](https://learn.microsoft.com/en-us/linkedin/marketing/community-management-app-review): Tüzel kişi şartı, Development ve Standard Tier değerlendirmesi (erişim: 15 Ekim 2026).
- [Posts API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api): Gönderi oluşturma ve okuma, yazara göre listeleme, izinler (erişim: 15 Ekim 2026).
- [Organization Social Action Notifications](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/organizations/organization-social-action-notifications): Webhook olayları, 60 günlük pull API'si (erişim: 15 Ekim 2026).
- [Webhooks](https://learn.microsoft.com/en-us/linkedin/shared/api-guide/webhook-validation): challengeCode doğrulaması, `X-LI-Signature` (erişim: 15 Ekim 2026).
- [Rate Limiting](https://learn.microsoft.com/en-us/linkedin/shared/api-guide/concepts/rate-limits): Günlük limitler, 429 yanıtı, portal Analytics sekmesi (erişim: 15 Ekim 2026).
- [Restricted Uses of LinkedIn Marketing APIs and Data](https://learn.microsoft.com/en-us/linkedin/marketing/restricted-use-cases): Social feed yasağı, 24/48 saat saklama, veri birleştirme yasağı (erişim: 15 Ekim 2026).
- [Versioning](https://learn.microsoft.com/en-us/linkedin/marketing/versioning): `Linkedin-Version` başlığı, aylık sürümler, güncel sürüm 202610 (erişim: 15 Ekim 2026).
- [Live Events APIs](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/live-video/): Canlı yayın izinleri ve RTMP ingest; beta; belge son güncelleme 20.12.2023 (erişim: 15 Ekim 2026).
- [Increasing Access](https://learn.microsoft.com/en-us/linkedin/marketing/increasing-access): Ürün listesi (açık, kısıtlı, kapalı), Community Management izinleri, Development/Standard Tier kısıtları (erişim: 15 Ekim 2026).
- [Member Post Statistics](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/members/post-statistics): `memberCreatorPostAnalytics`, `r_member_postAnalytics` (erişim: 15 Ekim 2026).
- [Comments API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/comments-api): `*_social_feed` izinleri, `r_member_social_feed` kısıtı (erişim: 15 Ekim 2026).
- [Social Metadata API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/social-metadata-api): Tepki/yorum özeti, `socialActions`'ın yerini alması (erişim: 15 Ekim 2026).
- [Recent Changes](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/recent-changes) ve [Migrations](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/migrations): Değişiklik ve sürüm geçiş takibi (erişim: 15 Ekim 2026).
- [LinkedIn User Agreement](https://www.linkedin.com/legal/user-agreement): Madde 8.2, kazıma, bot ve erişim kontrolünü atlatma yasağı (erişim: 15 Ekim 2026).
- [LinkedIn Marketing API Terms](https://www.linkedin.com/legal/l/marketing-api-terms): Marketing/Community API kullanım şartları (erişim: 15 Ekim 2026).
- [Full Profile Fields](https://learn.microsoft.com/en-us/linkedin/shared/references/v2/profile/full-profile) ve [Profile API](https://learn.microsoft.com/en-us/linkedin/shared/integrations/people/profile-api): `r_fullprofile`'ın kapalı olması, ek alanların yalnızca seçilmiş partnerlere verilmesi (erişim: 15 Ekim 2026).
- [Basic Profile Fields](https://learn.microsoft.com/en-us/linkedin/shared/references/v2/profile/basic-profile) ve [Migration FAQ](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/migration-faq): `r_basicprofile` alanları, v1 → v2 geçişi (erişim: 15 Ekim 2026).
- [Member Data Portability (3rd Party)](https://learn.microsoft.com/en-us/linkedin/dma/member-data-portability/member-data-portability-3rd-party/), [Member Snapshot API](https://learn.microsoft.com/en-us/linkedin/dma/member-data-portability/shared/member-snapshot-api), [Snapshot Domains](https://learn.microsoft.com/en-us/linkedin/dma/member-data-portability/shared/snapshot-domain), [Member Changelog API](https://learn.microsoft.com/en-us/linkedin/dma/member-data-portability/shared/member-changelog-api): DMA veri taşınabilirliği, AEA sınırı, CV domain'leri (erişim: 15 Ekim 2026).
- [LinkedIn Help: DMA veri taşınabilirliği](https://www.linkedin.com/help/linkedin/answer/a6214075): AB/AEA/İsviçre sınırı, konumun profil konumuna göre belirlenmesi (erişim: 15 Ekim 2026).
- [Verified on LinkedIn – identityMe](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/verified-on-linkedin/api-reference/identity-me), [FAQ](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/verified-on-linkedin/faq), [Lite Tier](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/verified-on-linkedin/guides/upgrade-to-lite-tier): Katmanlar, Plus alanları, işe alım kısıtı, Lite'ın kapanması (erişim: 15 Ekim 2026).
- [Apply Connect](https://learn.microsoft.com/en-us/linkedin/talent/apply-connect/apply-connect-overview), [Receive Applications](https://learn.microsoft.com/en-us/linkedin/talent/apply-connect/receive-applications), [Apply with LinkedIn](https://learn.microsoft.com/en-us/linkedin/talent/apply-with-linkedin/apply-with-linkedin), [Recruiter System Connect](https://learn.microsoft.com/en-us/linkedin/talent/recruiter-system-connect): Talent partner programları (erişim: 15 Ekim 2026).
- [LinkedIn API Terms of Use](https://www.linkedin.com/legal/l/api-terms-of-use) ve [Storing Member Data](https://legal.linkedin.com/storing-member-data): Rıza, saklama, silme, uygunluk kararı yasağı (erişim: 15 Ekim 2026).
- [LinkedIn Help: Verilerini indir](https://www.linkedin.com/help/linkedin/answer/a1339364) ve [Profili PDF olarak kaydet](https://www.linkedin.com/help/linkedin/answer/a541960): Kullanıcının kendi dışa aktarımı (erişim: 15 Ekim 2026).

**Üçüncü taraf**

- [Proskauer: hiQ and LinkedIn reach proposed settlement](https://newmedialaw.proskauer.com/2022/12/08/hiq-and-linkedin-reach-proposed-settlement-in-landmark-scraping-case/): hiQ davasının uzlaşma ve tedbir koşulları (erişim: 15 Ekim 2026).
- [ZwillGen: hiQ v. LinkedIn wrapped up](https://www.zwillgen.com/alternative-data/hiq-v-linkedin-wrapped-up-web-scraping-lessons-learned/): Davadan çıkarılan dersler (erişim: 15 Ekim 2026).
- [Morgan Lewis: LinkedIn v. hiQ guidance](https://www.morganlewis.com/blogs/sourcingatmorganlewis/2022/12/linkedin-v-hiq-landmark-data-scraping-suit-provides-guidance-to-data-scrapers-and-web-operators): Sözleşme ihlali kararının özeti (erişim: 15 Ekim 2026).
- [Social Media Today: LinkedIn wins legal case against Proxycurl](https://www.socialmediatoday.com/news/linkedin-wins-legal-case-data-scrapers-proxycurl/756101/): Proxycurl davası ve kapanış (erişim: 15 Ekim 2026).
- [Bloomberg Law: LinkedIn's war against bot scrapers](https://news.bloomberglaw.com/artificial-intelligence/linkedins-war-against-bot-scrapers-ramps-up-as-ai-gets-smarter): ProAPIs davası (erişim: 15 Ekim 2026).
- [PyPI: linkedin-api](https://pypi.org/project/linkedin-api/): Resmî olmayan Voyager kütüphanesi ve ToS uyarısı; son sürüm 2.3.1, 07.11.2024 ([PyPI JSON](https://pypi.org/pypi/linkedin-api/json)); GitHub deposu 404 (erişim: 15 Ekim 2026).
- [PyPI: linkedin-api-client](https://pypi.org/project/linkedin-api-client/): Resmî Python istemcisi (beta) (erişim: 15 Ekim 2026).
- [RSS.app: LinkedIn company posts to Slack/Telegram](https://rss.app/blog/post/how-to-send-linkedin-company-posts-to-slack-email-telegram-and-discord-F3Dvt6): Üçüncü taraf RSS dönüştürme yöntemi (erişim: 15 Ekim 2026).
