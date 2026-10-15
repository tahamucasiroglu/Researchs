# Instagram API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **kısıtlı** (yalnızca Business/Creator hesapları; kişisel hesaplar için resmî API yok)

## Özet

Instagram'ın resmî API'si artık yalnızca **profesyonel (Business veya Creator) hesaplar** içindir: kendi hesabının medyasını okuma, gönderi/Reels/Story yayınlama, yorum yönetimi, mention takibi, DM ve istatistik (insights) sunar. [RESMÎ] İki giriş yolu vardır: **Instagram Login** (Facebook sayfası gerekmez, `graph.instagram.com`) ve **Facebook Login** (hesap bir Facebook sayfasına bağlı olmalı, `graph.facebook.com`); hashtag araması ve başka hesapları okuma (Business Discovery) yalnızca Facebook Login yolunda vardır. [RESMÎ] Kişisel (consumer) hesaplara erişim sağlayan **Basic Display API 4 Aralık 2024'te kapatıldı**; bugün kişisel hesap verisine resmî bir yol yoktur. [RESMÎ] API ücretsizdir; kısıt para değil, App Review, Business Verification ve hız sınırlarıdır. [RESMÎ]

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Herkese açık (kimliksiz)** | — | Resmî kimliksiz uç nokta **yok**. oEmbed (gömme) bile uygulama token'ı ister. [RESMÎ — oEmbed bir Meta uygulaması gerektirir] | — |
| **Geliştirici hesabı / uygulama (Standard Access)** | Meta for Developers hesabı + **Business** tipi uygulama; giriş yapan kişinin uygulamada rolü (admin/developer/tester) olmalı | Tüm izinler ama **yalnızca uygulamada rolü olan kişilerin** hesapları için çalışır. Kendi Business/Creator hesabını takip etmek için yeterli. [RESMÎ] | Ücretsiz; BUC hız sınırları |
| **İşletme / uygulama onayı (Advanced Access)** | **Business Verification** + izin başına **App Review**; uygulama **Live** modda; yıllık Data Use Checkup [RESMÎ] | Herhangi bir kullanıcının kendi hesabını bağlaması; **webhook'lar** (`comments`, `live_comments` için Advanced Access şart) [RESMÎ] | Ücretsiz |
| **Özel özellik: Instagram Public Content Access** | Facebook Login + App Review ile ayrı onaylanan "feature" | Hashtag araması (`ig_hashtag_search`, `top_media`, `recent_media`) [RESMÎ] | 7 günde en fazla 30 benzersiz hashtag [RESMÎ] |
| **Ücretli / kurumsal** | — | Meta'nın ücretli Instagram API katmanı **yok**. Ücretli veri isteyenler 3. taraf veri sağlayıcılarına (scraping hizmetleri) yönelir; bunlar resmî değildir. [3. TARAF] | — |
| **Resmî olmayan** | Gerçek bir Instagram hesabıyla oturum (kullanıcı adı/parola) veya web/mobil uygulamanın iç uç noktaları | Kişisel hesaplar, story'ler, takipçi listeleri, herhangi bir herkese açık profil | **ToS ihlali**; hesap kısıtlama/ban riski (bkz. aşağı) |

## Kimlik doğrulama

### Instagram Login (Business Login for Instagram) [RESMÎ]

1. Yetkilendirme: `https://www.instagram.com/oauth/authorize?client_id=...&redirect_uri=...&response_type=code&scope=...`
   Dönen `code` 1 saat geçerli, tek kullanımlık; sonundaki `#_` silinmeli.
2. Kısa ömürlü token: `POST https://api.instagram.com/oauth/access_token` (`client_id`, `client_secret`, `grant_type=authorization_code`, `redirect_uri`, `code`) — yaklaşık 1 saat geçerli.
3. Uzun ömürlü token (60 gün): `GET https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=...&access_token=...` — **yalnızca sunucu tarafında** (secret açığa çıkmasın).
4. Yenileme: `GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=...` — token en az 24 saatlik ve süresi dolmamış olmalı; 60 gün içinde yenilenmezse ölür.
5. Scope'lar: `instagram_business_basic`, `instagram_business_content_publish`, `instagram_business_manage_comments`, `instagram_business_manage_messages`, `instagram_business_manage_insights` (insights uç noktaları için; genel bakış sayfası yalnızca ilk dördünü sayar ama insights referansı bunu açıkça ister). Eski `business_*` değerleri 27 Ocak 2025'te kullanımdan kalktı.

### Facebook Login (Facebook Login for Business) [RESMÎ]

- Kullanıcı Facebook ile girer; Instagram profesyonel hesabı bir **Facebook sayfasına bağlı** olmalı ve kullanıcı o sayfada yönetici eşdeğeri görev yapabilmeli.
- Token: Facebook User veya Page access token. İzinler: `instagram_basic`, `instagram_content_publish`, `instagram_manage_comments`, `instagram_manage_insights`, `instagram_manage_messages`, `pages_show_list`, `pages_read_engagement` (+ Business Manager rolüyle gelen kullanıcılarda `ads_management`/`ads_read`).
- Instagram hesap kimliği (`IG_ID`), sayfa üzerinden bulunur: `GET /{page-id}?fields=instagram_business_account`.

### Hangisini seçmeli?

| Durum | Öneri |
|---|---|
| Yalnızca kendi hesabının gönderi/yorum/DM'ini yöneteceksen, Facebook sayfan yok | Instagram Login |
| Başka hesapları okumak (Business Discovery) veya hashtag aramak istiyorsan | Facebook Login (zorunlu) [RESMÎ] |
| Story insights webhook'u, ürün etiketleme, Partnership Ads | Facebook Login [RESMÎ] |
| DM'leri doğrudan, Messenger Platform'a girmeden yönetmek | Instagram Login [RESMÎ] |

## Temel uç noktalar

Taban URL: `https://graph.instagram.com/{sürüm}` (Instagram Login) veya `https://graph.facebook.com/{sürüm}` (Facebook Login). Güncel Graph API sürümü **v26.0** (29 Temmuz 2026); v25.0 18 Şubat 2026'da çıktı. [RESMÎ]

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/me?fields=user_id,username,account_type,followers_count,media_count` | Bağlı hesabın profil bilgisi | Instagram Login | [RESMÎ] |
| GET | `/{ig-user-id}/media` | Hesabın kendi gönderileri (ID + istenen alanlar: `caption`, `media_type`, `media_url`, `permalink`, `timestamp`, `like_count`, `comments_count`) | Her iki login | Sayfalama: cursor [RESMÎ] |
| GET | `/{ig-user-id}/stories` | Hesabın aktif (24 saatlik) story'leri | Her iki login | Yalnızca kendi hesap [RESMÎ] |
| GET | `/{ig-user-id}/live_media` | **Şu an yayında olan** canlı yayın medyası (`media_type=BROADCAST`, `media_product_type=LIVE`) | Facebook Login (`instagram_basic`, `pages_read_engagement`) | Yalnızca istek anında yayında olan canlılar döner; yalnızca **kendi** hesabın [RESMÎ] |
| GET | `/{ig-user-id}?fields=business_discovery.username(HEDEF){followers_count,media_count,media{caption,timestamp,permalink,like_count,comments_count}}` | **Başka bir** Business/Creator hesabın herkese açık profil ve gönderileri | Facebook Login (`instagram_basic`, `instagram_manage_insights`, `pages_read_engagement`) | Hedef Business/Creator olmalı; kişisel ve yaş sınırlı hesaplar dönmez; Platform hız sınırı [RESMÎ] |
| GET | `/ig_hashtag_search?user_id=...&q=etiket` | Hashtag adından hashtag ID'si | Facebook Login + Public Content Access | 7 günde 30 benzersiz hashtag [RESMÎ] |
| GET | `/{hashtag-id}/recent_media?user_id=...&fields=...` | Son **24 saatte** o hashtag'le paylaşılmış herkese açık gönderiler | Facebook Login + Public Content Access | Sayfa başına 50; `username` alanı istenemez; reklam/öne çıkarılmış içerik dönmez; kronolojik sıra garantisi yok [RESMÎ] |
| GET | `/{hashtag-id}/top_media` | Hashtag'in en popüler gönderileri | Facebook Login + Public Content Access | [RESMÎ] |
| GET | `/{ig-user-id}/tags` | Hesabın etiketlendiği (fotoğrafta tag) medya | Facebook Login (`instagram_basic`, `instagram_manage_comments`, `pages_read_engagement`) | Host `graph.facebook.com`; Business Manager rolüyle gelen kullanıcıda `ads_management` veya `ads_read` da gerekir [RESMÎ] |
| GET | `/{ig-user-id}?fields=mentioned_media.media_id({media-id}){caption,username,timestamp}` | Başkasının açıklamasında hesabın @mention edildiği medya | Facebook Login (`instagram_manage_comments`) | Story mention'ları desteklenmez; ID webhook'tan gelir [RESMÎ] |
| GET | `/{ig-media-id}/comments` | Bir gönderinin yorumları | Her iki login | [RESMÎ] |
| POST | `/{ig-comment-id}/replies`, `/{ig-media-id}/comments` | Yoruma cevap / yorum yazma | Her iki login (`*_manage_comments`) | [RESMÎ] |
| POST | `/{ig-comment-id}?hide=true`, DELETE `/{ig-comment-id}` | Yorumu gizleme/silme (moderasyon) | Her iki login | [RESMÎ] |
| POST | `/{ig-user-id}/media` | Medya konteyneri oluşturma (`image_url`, `video_url`, `media_type=REELS/STORIES/CAROUSEL`) | Her iki login (`*_content_publish`) | Medya herkese açık URL'de olmalı; görsel yalnızca JPEG; konteyner 24 saatte yayınlanmazsa düşer [RESMÎ] |
| POST | `/{ig-user-id}/media_publish?creation_id=...` | Konteyneri yayınlama | Her iki login | 24 saatte 100 API gönderisi (carousel = 1) [RESMÎ; carousel bölümünde 50 yazıyor → ÇELİŞKİLİ] |
| GET | `/{container-id}?fields=status_code` | Video işleme durumu (`IN_PROGRESS`, `FINISHED`, `ERROR`, `EXPIRED`, `PUBLISHED`) | Her iki login | Dakikada 1, en çok 5 dk sorgula [RESMÎ] |
| GET | `/{ig-user-id}/content_publishing_limit` | Yayın kotası kullanımı | Her iki login | [RESMÎ] |
| GET | `/{ig-user-id}/insights`, `/{ig-media-id}/insights` | Hesap/medya istatistikleri | Instagram Login: `instagram_business_basic` + `instagram_business_manage_insights`; Facebook Login: `instagram_basic` + `instagram_manage_insights` + `pages_read_engagement` | `impressions` metriği 21.04.2025'te tüm sürümlerde kaldırıldı; yerine `views` kullanılır [RESMÎ] |
| POST | Instagram Login: `graph.instagram.com/{ig-user-id}/messages`; Messenger Platform (Facebook Login): `graph.facebook.com/{page-id}/messages` (Page access token) | DM gönderme (Send API) | Instagram Login veya Messenger Platform | 24 saat mesajlaşma penceresi kuralları [RESMÎ] |

Tam liste: [Instagram Platform referansı](https://developers.facebook.com/docs/instagram-platform/reference).

## Gerçek zamanlı / bildirim

- **Webhooks** (tek gerçek zamanlı yol) [RESMÎ]
  - Alanlar: `comments`, `live_comments` (yalnızca yayın sürerken), `mentions` (Facebook Login'de ayrı alan; Instagram Login'de `comments` içinde), `messages`, `message_reactions`, `messaging_seen`, `messaging_postbacks`, `messaging_referral`, `story_insights` (yalnızca Facebook Login, ilk 24 saat) vb.
  - **Yeni gönderi paylaşıldı** veya **canlı yayın başladı** için webhook **yok**. [RESMÎ — belgede böyle bir alan listelenmiyor]
  - Şartlar: uygulama Live, `comments`/`live_comments` için Advanced Access, **Business Verification**, medya sahibi hesap **herkese açık** olmalı.
  - Doğrulama: Meta `GET` ile `hub.mode=subscribe`, `hub.verify_token`, `hub.challenge` gönderir; `hub.challenge` aynen döndürülür. Her `POST`'ta `X-Hub-Signature-256: sha256=...` başlığı App Secret ile HMAC-SHA256 olarak doğrulanır.
  - Her bildirime `200 OK` dön; başarısız teslimler 36 saate kadar tekrar denenir → tekrar eden olayları ayıkla (idempotency).
  - Hesap bazında abonelik: `POST /me/subscribed_apps?subscribed_fields=comments,mentions,...`
- **WebSocket / streaming**: yok. [RESMÎ — belgede yok]
- **RSS / WebSub**: Instagram resmî RSS vermez. [3. TARAF — RSS üreten servisler sayfayı kazır, resmî değildir]

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| **Kendi** hesabının yeni gönderisi | Evet | `GET /{ig-user-id}/media` periyodik sorgu (polling) | Standard Access yeter | Webhook yok; `timestamp` ile yeni olanı ayır |
| **Başka** Business/Creator hesabın yeni gönderisi | Evet (sınırlı) | `business_discovery` ile periyodik polling | Facebook Login; kendi Business hesabın + Facebook sayfası gerekir | Kişisel hesaplar okunamaz; Platform hız sınırı (200 × kullanıcı/saat) polling sıklığını belirler [RESMÎ] |
| Kişisel (personal) hesabın gönderisi | **Hayır** (resmî) | — | — | Basic Display API kapandı (4.12.2024) [RESMÎ]; yalnızca resmî olmayan yollar |
| Başka hesabın story'leri | **Hayır** (resmî) | — | — | `stories` yalnızca kendi hesap [RESMÎ] |
| Kendi hesabının canlı yayını başladı | Evet (dolaylı) | `GET /{ig-user-id}/live_media` polling; yayın sırasında `live_comments` webhook'u gelmeye başlar | Facebook Login; webhook için Advanced Access | "Live başladı" olayı yok [RESMÎ] |
| **Başka** hesabın canlı yayına geçmesi | **Hayır** (resmî) | — | — | `live_media` yalnızca token sahibinin hesabı; Business Discovery canlıyı göstermez [TAHMİN — belgede canlı alanı yok] |
| Kendi gönderine yorum | Evet | `comments` webhook | Advanced Access + Business Verification | Gerçek zamanlı |
| Hesabının @mention edilmesi (gönderi/yorumda) | Evet | `mentions` webhook → `mentioned_media` / `mentioned_comment` | Facebook Login (Instagram Login'de `comments` içinde) | Gönderi/yorum mention'ları özel hesaplardan gelmez [RESMÎ]; story mention için aşağıdaki satıra bak |
| Hesabının story'de @mention edilmesi | Evet | `messages` webhook (`attachments[].type = "story_mention"`, `payload.url` = CDN URL) | Instagram Login veya Messenger Platform; Advanced Access | Story mention'ı `mentions` alanıyla değil, `messages` webhook'unda `story_mention` ekiyle gelir [RESMÎ]. Herkese açık hesaplardan her zaman gelir; özel hesaplardan yalnızca o hesap seni takip ediyorsa gelir. Medya sunucuda saklanamaz, yalnızca CDN URL'si saklanabilir [RESMÎ] |
| Anahtar kelime / hashtag takibi | Kısmen | `ig_hashtag_search` + `recent_media` polling | Public Content Access (App Review) | Yalnız hashtag (serbest metin araması yok), son 24 saat, 7 günde 30 hashtag; `username` dönmez [RESMÎ] |
| DM gelen kutusu | Evet | `messages` webhook | Instagram Login veya Messenger Platform; Advanced Access | Yalnızca kendi hesabının DM'leri |
| Filtreleme (önemli olanı ayıklama) | Uygulama tarafında | Gelen `caption`/yorum metninde anahtar kelime, `like_count`/`comments_count` eşiği, `media_product_type` (REELS/FEED/STORY) | — | API filtre parametresi sunmaz; filtre senin kodunda |

## Hız sınırları ve fiyatlar

- **Fiyat**: API ücretsiz. [RESMÎ — belgede ücret yok]
- **Instagram Business Use Case (BUC)** sınırı: `24 saatte çağrı = 4800 × gösterim (impression) sayısı`, uygulama + kullanıcı çifti başına, kayan 24 saat. Gösterim = hesabın içeriğinin son 24 saatte ekranda görünme sayısı. Mesajlaşma hariç çoğu uç nokta buna tabidir. [RESMÎ]
- **Platform Rate Limits** (Business Discovery ve Hashtag Search): `saatte çağrı = 200 × kullanıcı sayısı`. [RESMÎ]
- **Mesajlaşma**: Conversations API 2 çağrı/sn; Private Replies canlı yorumlar için 100/sn, gönderi/Reels yorumları için 750/saat; Send API metin için 100/sn, ses/video için 10/sn (hesap başına). [RESMÎ]
- **Yayınlama**: 24 saatte 100 gönderi (carousel tek sayılır). [RESMÎ; belgede 50 ile ÇELİŞKİLİ]
- **Hashtag**: 7 günde 30 benzersiz hashtag; `recent_media` sayfa başına 50. [RESMÎ]
- **Başlıklar**: `X-App-Usage` (Platform), `X-Business-Use-Case-Usage` (BUC; `estimated_time_to_regain_access` dakika cinsinden). Hata kodları: BUC `80002`; Platform `4`, `17`, `32`, `613`. [RESMÎ]

## Resmî olmayan yollar ve riskler

| Yol | Nasıl çalışır | Ne sağlar | Risk |
|---|---|---|---|
| **instagrapi** (Python) | Instagram mobil uygulamasının **private API**'sini taklit eder; gerçek hesapla kullanıcı adı/parola ile giriş, cihaz kimliği ve oturum çerezi saklar | Kişisel/herkese açık profiller, story, takipçi, DM, gönderi paylaşma | Meta ToS ihlali; `challenge_required`, `login_required`, hesap kısıtlama/ban; proxy/cihaz durumu değişince bozulur. Bakımcının kendi README'si üretim yerine test/araştırma için önerir ve resmî API'yi tavsiye eder. [3. TARAF] |
| **Instaloader** (Python) | Web arayüzünün iç (GraphQL) uç noktalarını kullanır; oturumlu/oturumsuz | Profil, gönderi, story (oturumla) indirme | Oturumsuz istekler hızla engellenir (429/login duvarı); oturumlu kullanım hesabı riske atar [3. TARAF] |
| Web iç uç noktaları (`i.instagram.com/api/v1/...`, `www.instagram.com/api/v1/users/web_profile_info/?username=...`, GraphQL `doc_id`) | Tarayıcı/mobil uygulamanın kullandığı belgesiz uç noktalar; özel başlık (`X-IG-App-ID`) ister | Profil bilgisi, son gönderiler | Haber vermeden değişir; IP engeli; ToS ihlali [3. TARAF] |
| Ücretli scraping hizmetleri (Apify, RapidAPI üzerindeki "Instagram API"ler vb.) | Kendi proxy/hesap havuzlarıyla kazıma yapar | Herhangi bir herkese açık hesap, canlı durumu dahil | Veri kaynağı yine ToS dışı; hizmet kapanabilir; KVKK/GDPR açısından kişisel veri işleme sorumluluğu sende [TAHMİN] |

Riskler (nesnel):
- **ToS**: Meta Kullanım Koşulları otomatik veri toplamayı izinsiz yasaklar; Meta geçmişte kazıma yapan şirketlere dava açmıştır. [3. TARAF]
- **Hesap**: Kullanılan Instagram hesabı kalıcı kapatılabilir; ana hesabını asla kullanma. [3. TARAF]
- **Hukuki**: Toplanan veri kişisel veridir (kullanıcı adı, yorum, fotoğraf) → Türkiye'de KVKK, AB'de GDPR yükümlülükleri doğar. [TAHMİN — hukuki görüş değildir]
- **Teknik**: Belgesiz uç noktalar sürüm notu olmadan değişir; bakım maliyeti yüksektir.

## SDK ve kütüphaneler

| Ad | Dil | Tür | Not |
|---|---|---|---|
| [Meta Business SDK](https://github.com/facebook/facebook-python-business-sdk) (Python/Node/PHP/Java/Ruby) | Çok dilli | Resmî | Ağırlıkla Marketing API; Graph çağrıları için genel istemci [RESMÎ] |
| Doğrudan HTTP (Graph API REST) | Hepsi | Resmî | Instagram için en yaygın yöntem; `HttpClient` + JSON yeterli |
| [Facebook (NuGet, `facebook-csharp-sdk`)](https://www.nuget.org/packages/Facebook) | .NET | Topluluk | Eski ama genel Graph istemcisi; bakımı zayıf [3. TARAF] |
| .NET için öneri | .NET | — | `HttpClient` + `System.Text.Json`, token yenileme için arka plan servisi (`BackgroundService`), webhook için ASP.NET Core minimal API + HMAC-SHA256 doğrulama [TAHMİN — tasarım önerisi] |
| [instagrapi](https://github.com/subzeroid/instagrapi) | Python | Resmî olmayan | Private API; risk yukarıda |
| [Instaloader](https://github.com/instaloader/instaloader) | Python | Resmî olmayan | İndirme/arşivleme odaklı |
| [InstagramApiSharp](https://github.com/ramtinak/InstagramApiSharp) | .NET | Resmî olmayan | Private API; uzun süredir güncellenmiyor, büyük olasılıkla çalışmaz [3. TARAF] |

## Postman / OpenAPI / koleksiyonlar

- Meta'nın Postman'deki herkese açık çalışma alanında Graph API / Instagram koleksiyonları yayımlanmıştır (Reels Publishing duyurusu, 2023). Güncelliği ayrıca doğrulanmalı. [RESMÎ — 2023 tarihli]
- **Graph API Explorer** (tarayıcıda token alıp istek denemek için): https://developers.facebook.com/tools/explorer/ [RESMÎ]
- Resmî OpenAPI/Swagger dosyası: belgede yok.
- Meta, Instagram belgeleri için LLM dostu bir dizin yayımlıyor: https://developers.facebook.com/documentation/instagram-platform/llms.txt [RESMÎ]

## Depoda ilgili sayfalar

- [Mesajlaşma Altyapıları rehberi](../../Rehberler/Mesajlasma-Altyapilari/) — WhatsApp Business API (aynı Meta Graph altyapısı, benzer webhook/App Review süreci), Telegram Bot API.

## Kaynaklar

- https://developers.facebook.com/docs/instagram-platform/overview — Instagram Platform genel bakış: iki login türü, izinler, özellik tablosu, hız sınırları — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login — Business Login for Instagram OAuth akışı, token yenileme — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/get-started — Instagram Login ile başlangıç, `/me` alanları — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/instagram-platform/content-publishing — İçerik yayınlama, konteyner akışı, limitler — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/instagram-platform/webhooks — Webhook alanları, şartlar, imza doğrulama — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/live_media — `live_media` edge referansı — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/business_discovery — Business Discovery referansı — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/mentioned_media — `mentioned_media` referansı — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/tags — `tags` edge referansı (izinler, host) — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/instagram-platform/api-reference/instagram-user/insights — Insights referansı: izinler, `impressions` → `views` değişikliği — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/documentation/business-messaging/instagram-messaging/features/story-mention — Story mention'ın `messages` webhook'unda `story_mention` ekiyle gelmesi, özel hesap ve saklama kuralları — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-hashtag-search — Hashtag araması ve 30 hashtag/7 gün sınırı — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-hashtag/recent-media — `recent_media` (son 24 saat) referansı — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/graph-api/overview/rate-limiting — Platform ve BUC hız sınırları, başlıklar, hata kodları — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/graph-api/overview/access-levels — Standard / Advanced Access farkı — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/docs/graph-api/changelog — Graph API sürümleri (v26.0, 29.07.2026) — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api — Basic Display API'nin 4 Aralık 2024'te kapatılması duyurusu — (erişim: 15 Ekim 2026)
- https://developers.facebook.com/blog/post/2023/03/24/get-started-with-reels-publishing-apis-with-postman/ — Meta'nın Postman koleksiyonları (2023) — (erişim: 15 Ekim 2026)
- https://pypi.org/project/instagrapi/ — instagrapi paketi ve bakımcının risk notları [3. TARAF] — (erişim: 15 Ekim 2026)
- https://www.bot.space/blog/the-dangers-of-unofficial-instagram-dm-apis-why-theyll-get-you-banned — Resmî olmayan DM API'lerinin ban riski (ticari çıkarı olan satıcı yazısı) [3. TARAF] — (erişim: 15 Ekim 2026)
