# Threads API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (resmî Graph API; başkalarının içeriğini okumak App Review'a bağlı)

## Özet

Meta'nın Threads için sunduğu resmî **Threads API** (Graph API tarzı, `graph.threads.net` / `graph.threads.com`, sürüm `v1.0`), Haziran 2024'ten beri tüm geliştiricilere açıktır [RESMÎ]. Gönderi yayınlama (metin, görsel, video, carousel, anket, GIF, alıntı, repost, ghost post), kendi gönderilerini ve yanıtlarını okuma, yanıt yönetimi, mention'lar, insights, **keyword/topic tag search**, **profile discovery** (başka herkese açık profillerin gönderilerini okuma) ve **webhooks** sunar [RESMÎ]. API kullanımı **ücretsizdir**; belgede ücretli bir katman yoktur, sınırlar kullanıcının "impression" sayısına göre hesaplanır [RESMÎ]. Ancak takip için kritik olan "başkasının içeriğini okuma" yetenekleri (public keyword search, profile_posts, mention'lar, başkasının gönderisini ID ile okuma) **App Review / Advanced Access** olmadan yalnızca kendi hesabın veya test kullanıcılarıyla çalışır [RESMÎ].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | **oEmbed** (`/oembed`, Mart 2026'dan beri erişim belirteci olmadan çağrılabilir [RESMÎ]), **Web Intents** (`threads.com/intent/post`, `/intent/follow`) [RESMÎ]. Threads web sayfaları; resmî RSS **yok** (belgede yok). Fediverse üzerinden ActivityPub ile herkese açık gönderiler (aşağıya bkz.) | oEmbed: 1.000 istek/saat [RESMÎ] |
| Geliştirici hesabı / uygulama (Standard Access, geliştirme modu) | Meta developer hesabı, "Threads" use case'li Meta uygulaması (Threads App ID + secret), test kullanıcısı olarak eklenen Threads hesapları ("Threads Tester") [RESMÎ] | Uygulamada rolü olan / tester hesaplar için tüm izinler: yayınlama, kendi gönderi/yanıt okuma, insights, reply yönetimi. **Keyword search yalnızca kendi gönderilerinde**; `profile_lookup` / `profile_posts` yalnızca @meta, @threads, @instagram, @facebook için; mention'lar ve ID ile medya okuma yalnızca tester'lardan [RESMÎ] | Ücretsiz; 4.800 × impression çağrı/24 saat [RESMÎ] |
| İşletme / uygulama onayı (App Review → Advanced Access, uygulama Live Mode, Business Verification) | İzin bazında App Review; uygulama "published/Live"; webhooks için bağlı işletmenin **doğrulanmış** olması (Business Verification) [RESMÎ] | Herkes uygulamaya izin verebilir; **public keyword/topic tag search**, herkese açık ≥100 takipçili profillerin profil ve gönderileri (`profile_lookup`, `profile_posts`), başkalarının public mention'ları, başka kullanıcıların public gönderilerini ID ile okuma, diğer kullanıcılar adına yayınlama, tüm webhook alanları [RESMÎ] | Ücretsiz; keyword search 2.200 sorgu/24 saat, profile discovery 1.000 istek/24 saat (kullanıcı başına) [RESMÎ] |
| Ücretli / kurumsal | — | Belgede ücretli API katmanı yok [RESMÎ — belgede yok]. Ücretli olan yalnızca **Threads reklamları** (Marketing API üzerinden; ayrı konu) [RESMÎ] | — |
| Resmî olmayan | Reverse-engineered istemciler (Instagram private API / web GraphQL), scraping | Giriş yapmadan/izin almadan gönderi, profil, yanıt okuma | ToS ihlali; hesap kapatma ve hukuki bildirim riski (aşağıya bkz.) |

## Kimlik doğrulama

OAuth 2.0 yetkilendirme kodu akışı [RESMÎ]:

1. **Yetkilendirme**: `https://threads.com/oauth/authorize?client_id=<THREADS_APP_ID>&redirect_uri=<URI>&scope=threads_basic,threads_content_publish&response_type=code&state=<csrf>` (eski `threads.net` alan adı da geçer).
2. **Kod → kısa ömürlü belirteç**: `POST https://graph.threads.com/oauth/access_token` (`client_id`, `client_secret`, `code`, `grant_type=authorization_code`, `redirect_uri`). Yanıt: `access_token`, `token_type` (Ağustos 2026'dan beri), `user_id`. Kod 1 saat geçerli ve tek kullanımlık; kısa ömürlü belirteç **1 saat** [RESMÎ].
3. **Uzun ömürlü belirteç**: `GET https://graph.threads.net/access_token?grant_type=th_exchange_token&client_secret=...&access_token=<kısa>` → **60 gün** [RESMÎ].
4. **Yenileme**: `GET https://graph.threads.net/refresh_access_token?grant_type=th_refresh_token&access_token=<uzun>`; belirteç en az 24 saatlik ve süresi dolmamış olmalı; yenilenen belirteç yine 60 gün geçerli [RESMÎ].
5. **App access token**: `GET /oauth/access_token?client_id&client_secret&grant_type=client_credentials` → `TH|<APP_ID>|<TOKEN>`; ya da doğrudan `TH|<APP_ID>|<APP_SECRET>`. Yalnızca sunucu tarafında [RESMÎ].
6. **İzin süresi**: Private Threads profillerinin uzun ömürlü belirteçleri de artık yenilenebilir; private profilli kullanıcıların uygulamaya verdiği izinler 90 gün geçerlidir [RESMÎ]. 60 gün içinde yenilenmeyen belirtecin süresi dolar ve yenilenemez; o durumda yeni yetkilendirme gerekir [RESMÎ].
7. **Belirteç hata ayıklama**: `GET /debug_token` (Haziran 2025) [RESMÎ].

Önemli izinler (scope) [RESMÎ]:

| İzin | Ne için |
|---|---|
| `threads_basic` | Tüm uç noktalar için zorunlu; profil ve kendi gönderilerini okuma |
| `threads_content_publish` | Gönderi yayınlama |
| `threads_read_replies` | Yanıt uç noktalarına GET |
| `threads_manage_replies` | Yanıt gizleme/onaylama, yanıt yayınlama |
| `threads_manage_insights` | Insights GET |
| `threads_manage_mentions` | Mention'ları okuma (uç nokta + webhook) |
| `threads_keyword_search` | `keyword_search` |
| `threads_profile_discovery` | `profile_lookup`, `profile_posts` |
| `threads_delete` | Gönderi silme |
| `threads_location_tagging` | Konum arama/etiketleme |
| `threads_share_to_instagram` | Gönderiyi bağlı Instagram hesabına Story olarak paylaşma (Mart 2026) |

## Temel uç noktalar

Taban: `https://graph.threads.net/v1.0/` (veya `graph.threads.com`, Haziran 2025'ten beri ikisi de geçerli) [RESMÎ].

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/me?fields=id,username,name,threads_profile_picture_url,threads_biography,is_verified` | Yetkili kullanıcının profili | Geliştirici | `threads_basic` [RESMÎ] |
| POST | `/{user-id}/threads` | Medya **container** oluştur (`media_type`=TEXT/IMAGE/VIDEO/CAROUSEL, `text`, `image_url`, `video_url`, `reply_to_id`, `quote_post_id`, `reply_control`, `topic_tag`, `link_attachment`, `enable_reply_approvals`, `auto_publish_text` vb.) | Geliştirici (kendi/tester); Advanced = başkaları adına | Medya herkese açık URL'de olmalı; ~30 sn bekle, durum kontrol et [RESMÎ] |
| POST | `/{user-id}/threads_publish?creation_id=...` | Container'ı yayınla | Aynı | 250 gönderi / 24 saat (carousel = 1) [RESMÎ] |
| GET | `/{container-id}?fields=status,error_message` | Container durumu | Aynı | [RESMÎ] |
| GET | `/{user-id}/threads_publishing_limit` | Kota kullanımı (gönderi, yanıt, silme, konum arama) | Geliştirici | [RESMÎ] |
| DELETE | `/{media-id}` | Gönderi sil | Geliştirici | `threads_delete`, 100 silme / 24 saat [RESMÎ] |
| GET | `/me/threads` | Kendi gönderilerin (`since`, `until`, `limit`, cursor sayfalama) | Geliştirici | Yalnızca uygulama kullanıcısının gönderileri [RESMÎ] |
| GET | `/me/replies` | Kendi yazdığın yanıtlar | Geliştirici | [RESMÎ] |
| GET | `/me/ghost_posts` | Ghost (süreli) gönderiler | Geliştirici | [RESMÎ] |
| GET | `/{media-id}` | Tek medya nesnesi | Tester (Standard) / public herkes (Advanced) | `owner` yalnızca kendi gönderinde [RESMÎ] |
| GET | `/{media-id}/replies` | Üst düzey yanıtlar (`reverse`) | Geliştirici | `threads_read_replies` [RESMÎ] |
| GET | `/{media-id}/conversation` | Tüm yanıt ağacı düzleştirilmiş | Geliştirici | Kök gönderide kullanılır [RESMÎ] |
| POST | `/{reply-id}/manage_reply?hide=true` | Yanıt gizle/göster | Geliştirici | `threads_manage_replies` [RESMÎ] |
| GET / POST | `/{media-id}/pending_replies`, `/{reply-id}/manage_pending_reply?approve=true` | Onay bekleyen yanıtlar (Şubat 2026) | Geliştirici | [RESMÎ] |
| GET | `/{user-id}/mentions` | Seni etiketleyen public gönderiler (`since`, `until`) | Tester (Standard) / herkes (Advanced) | `threads_manage_mentions`; private hesaplar dönmez [RESMÎ] |
| GET | `/keyword_search?q=...&search_type=RECENT&search_mode=KEYWORD\|TAG&media_type&since&until&author_username&limit` | Public gönderilerde anahtar kelime / topic tag araması | Kendi gönderilerin (Standard) / tüm public (Advanced) | 2.200 sorgu / 24 saat (kullanıcı başına, tüm uygulamalar toplamı); boş sonuç sayılmaz; hassas kelimeler boş döner; `owner` dönmez; `limit` en çok 100 [RESMÎ] |
| GET | `/profile_lookup?username=...` | Başka bir public profilin bilgisi (takipçi, son 7 gün beğeni/görüntülenme vb.) | Yalnızca Meta resmî hesapları (Standard) / ≥100 takipçili public profiller (Advanced) | `threads_profile_discovery`, 1.000 istek / 24 saat [RESMÎ] |
| GET | `/profile_posts?username=...` | Başka bir public profilin gönderileri | Aynı | `owner` hariç tüm alanlar [RESMÎ] |
| GET | `/{media-id}/insights?metric=views,likes,replies,reposts,quotes,shares` | Gönderi metrikleri | Geliştirici | `threads_manage_insights` [RESMÎ] |
| GET | `/{user-id}/threads_insights?metric=views,likes,...,followers_count,follower_demographics` | Hesap metrikleri | Geliştirici | En erken 13.04.2024; demografi ≥100 takipçi [RESMÎ] |
| GET | `/oembed?url=<permalink>` | Gömme HTML | Herkese açık | 1.000/saat [RESMÎ] |
| GET | `/location_search`, `/{location-id}` | Konum arama/okuma | Geliştirici | 500 arama / 24 saat [RESMÎ] |

Tam liste: [Threads API Reference](https://developers.facebook.com/documentation/threads/reference).

## Gerçek zamanlı / bildirim

- **Webhooks** [RESMÎ] — App Dashboard'da "Get real-time notifications with Threads Webhooks" alt use case'i eklenir, callback URL + verify token ayarlanır. Konular:

| Topic | Field | Tetikleyici | İzin |
|---|---|---|---|
| `moderate` | `replies` | Uygulama kullanıcısının gönderilerine gelen yanıtlar | `threads_basic`, `threads_read_replies` |
| `moderate` | `delete` | Kullanıcının sildiği gönderiler | `threads_delete` |
| `interaction` | `mentions` | Kullanıcıyı etiketleyen public gönderiler (Temmuz 2025) | `threads_manage_mentions` |
| `interaction` | `publish` | Kullanıcının yayınladığı gönderi/yanıtlar (Ağustos 2025) | `threads_basic` |

  Koşullar: Live Mode (tech provider ise izinlerde Advanced Access), **doğrulanmış işletme** [RESMÎ]. Private hesaplar: replies/mentions — yanıtın ya da mention'ın bulunduğu medya private bir hesaba aitse bildirim gelmez; delete/publish — medya sahibi public olmalı ya da uygulamaya yetki vermiş private bir hesap olmalı [RESMÎ]. İmza doğrulaması belgede Threads'e özgü anlatılmıyor; Graph API webhook'larındaki `X-Hub-Signature-256` yönteminin geçerli olduğu varsayılır [TAHMİN].
- **Webhook yalnızca uygulamaya izin vermiş (install eden) kullanıcılar için çalışır.** "Herhangi bir hesabın yeni gönderisi" için push yok; bunun için `profile_posts` ile **periyodik sorgulama (polling)** gerekir [RESMÎ çıkarım]. (`keyword_search?q=...&author_username=...` yalnızca o yazarın `q` ile eşleşen gönderilerini getirir; tüm gönderiler için uygun değildir [RESMÎ].)
- **WebSocket / streaming / WebSub**: belgede yok [RESMÎ — belgede yok].
- **RSS**: Threads resmî RSS sunmuyor (belgede yok); üçüncü taraf RSS köprüleri (RSS.app, RSSHub vb.) scraping'e dayanır [3. TARAF].
- **Fediverse (ActivityPub)**: Fediverse paylaşımını açmış, 18 yaş üstü, herkese açık hesapların üst düzey public gönderileri ActivityPub üzerinden yayınlanır; Mastodon vb. kullanıcılar `@kullanici@threads.net` biçiminde takip edebilir [3. TARAF / RESMÎ duyurular]. API ile atılan uygun gönderiler de 28 Ağustos 2024'ten beri fediverse'e gider [RESMÎ]. Haziran 2025'te Threads içinde ayrı bir "fediverse feed" ve fediverse profil araması eklendi [3. TARAF: 9to5mac, Meta Newsroom]. Avrupa bölgesinde fediverse paylaşımının sunulmadığı raporlanmıştı; güncel durumu belirsiz [ÇELİŞKİLİ]. Entegrasyonun Ocak 2025'ten beri "bakım modunda" olduğu ve kullanımın düşük olduğu raporlanıyor [3. TARAF: Fediverse Report]. Pratik anlamı: fediverse'e açık bir Threads hesabını, kendi ActivityPub sunucun (ör. bir Mastodon/GoToSocial örneği veya ActivityPub kütüphanesiyle yazılmış bir "takipçi" aktörü) üzerinden **izin almadan ve push şeklinde** takip edebilirsin — ama yalnızca fediverse paylaşımını açmış hesaplar için [TAHMİN].

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Belirli bir hesabın yeni gönderisi | Evet (polling) | `GET /profile_posts?username=...` periyodik (birincil yol). `keyword_search` bunun yerine geçmez: `q` zorunludur; `author_username` yalnızca o yazarın `q` ile eşleşen gönderilerini döndürür (`threads_keyword_search`, 2.200/24 saat) [RESMÎ] | Advanced Access (`threads_profile_discovery`) | Hedef public ve ≥100 takipçili olmalı; 1.000 istek/24 saat → ~40 hesabı saatte bir yoklamaya yeter [TAHMİN hesaplama] |
| Aynı olay, push ile | Kısmen | Hedef hesap fediverse paylaşımını açtıysa ActivityPub ile takip | Herkese açık (kendi AP sunucun) | Yalnızca üst düzey public gönderiler [3. TARAF] |
| Kendi (izin vermiş) hesabın yeni gönderisi | Evet (push) | `publish` webhook | Live + doğrulanmış işletme | [RESMÎ] |
| Anahtar kelime / konu etiketi (filtreleme) | Evet | `GET /keyword_search` (`search_type=RECENT`, `since`, `media_type`, `author_username`) | Advanced Access (`threads_keyword_search`) | 2.200 sorgu/24 saat; hassas kelimeler boş döner [RESMÎ] |
| Seni/markanı etiketleyen gönderiler | Evet | `mentions` webhook veya `/me/mentions` | Advanced (`threads_manage_mentions`) | Private hesaplar hariç [RESMÎ] |
| Kendi gönderine gelen yanıt/yorum | Evet | `replies` webhook, `/{media-id}/replies`, `/conversation` | `threads_basic` + `threads_read_replies`; webhook için Live Mode + doğrulanmış işletme. GET uç noktaları geliştirme modunda da çalışır | [RESMÎ] |
| Başkasının gönderisindeki yanıtlar | Belirsiz | `/{media-id}/conversation` | Advanced | Belgede açıkça yazmıyor [ÇELİŞKİLİ / belgede yok] |
| Etkileşim/popülerlik metrikleri (başkası) | Kısmen | `profile_lookup` → son 7 gün `likes_count`, `views_count` vb. | Advanced | Gönderi bazında başkasının insights'ı yok [RESMÎ] |
| Canlı yayın başladı | Hayır | — | — | Threads'te canlı yayın özelliği/API'si yok [RESMÎ — belgede yok] |
| DM / mesaj içeriği | Hayır | — | — | Threads API'de DM uç noktası yok [RESMÎ — belgede yok] |
| Silinen gönderi | Yalnızca kendi | `delete` webhook | `threads_delete` | [RESMÎ] |

## Hız sınırları ve fiyatlar

- **Ücret**: API ücretsiz [RESMÎ — ücret bilgisi belgede yok, ücretli katman tanımlanmamış].
- **Genel çağrı limiti**: (uygulama, kullanıcı) çifti başına kayan 24 saatte **4.800 × impression** çağrı; impression en az 10 sayılır (yani en az 48.000 çağrı). CPU süresi: 720.000 × impression, toplam süre: 2.880.000 × impression [RESMÎ].
- **Yayınlama**: 250 gönderi, 1.000 yanıt, 100 silme, 500 konum araması / 24 saat [RESMÎ].
- **Keyword search**: 2.200 sorgu / 24 saat, kullanıcı başına tüm uygulamalar toplamı [RESMÎ].
- **Profile discovery**: 1.000 istek / 24 saat (Kasım 2025'te takipçi alt sınırı 1.000'den 100'e indi) [RESMÎ].
- **oEmbed**: 1.000 istek / saat [RESMÎ].
- **İçerik sınırları**: metin 500 karakter, en çok 5 bağlantı (Aralık 2025'ten beri aşan gönderi `THREADS_API__LINK_LIMIT_EXCEEDED` hatası verir), carousel 2–20 öğe, görsel JPEG/PNG ≤8 MB, video MOV/MP4 ≤5 dk ≤1 GB [RESMÎ]. GIF: GIPHY desteklenir; Tenor desteği 31.03.2026'da kaldırıldı [RESMÎ, changelog 27.02.2026].

## Resmî olmayan yollar ve riskler

- **junhoyeo/threads-api** (TypeScript) ve kardeşleri **threads-py**, **react-threads**: Threads'in web/mobil uygulamasının iç GraphQL ve Instagram private API uç noktalarını taklit eden istemcilerdi. 8 Eylül 2023'te "Meta Platforms, Inc.'den gelen bildirim nedeniyle" durduruldu ve arşivlendi; README, kodun kullanımının Meta ToS'unu ihlal edebileceğini belirtiyor [3. TARAF — depo README'si].
- **Danie1/threads-api** (Python, PyPI `threads-api`): `instagrapi` üzerinden Instagram oturumu ile çalışan reverse-engineered istemci; 1 Ekim 2023'te arşivlendi [3. TARAF].
- **Nasıl çalışır**: Instagram kullanıcı adı/parola ile private API'ye giriş yapılır veya `threads.com` sayfalarındaki gömülü JSON / GraphQL (`doc_id` tabanlı) istekleri taklit edilir. Uç noktalar belgesizdir, sık değişir [3. TARAF].
- **Scraping hizmetleri** (Apify "Threads scraper" aktörleri, RSS köprüleri vb.) aynı yöntemi barındırılmış olarak sunar [3. TARAF].
- **Riskler**: Meta Kullanım Koşulları otomatik veri toplamayı yasaklar; hesap askıya alma/kapatma, IP engeli, Meta'nın hukuki bildirim gönderme geçmişi var (yukarıdaki örnek). Kişisel veri toplanıyorsa KVKK/GDPR yükümlülükleri doğar. Resmî API artık keyword search ve profile discovery sunduğu için **resmî olmayan yola ihtiyaç büyük ölçüde azaldı** [TAHMİN].
- **Düşük riskli alternatif**: Fediverse'e açık hesapları ActivityPub ile okumak açık bir protokol kullanımıdır ve Meta'nın sunduğu bir özelliktir [TAHMİN — hukuki değerlendirme değildir].

## SDK ve kütüphaneler

- **Resmî**: Threads için ayrı resmî SDK yok; REST/Graph çağrıları doğrudan yapılır. Meta'nın resmî örnek uygulaması: [fbsamples/threads_api](https://github.com/fbsamples/threads_api) (Node.js, "Threads Publishing API Sample App"; `localhost` yönlendirme URL'si desteklenmediği için yerel alan adı + mkcert ile HTTPS gerekir; README'ye göre en yeni özellikleri kapsamayabilir) [RESMÎ]. Webhook doküman sayfası ayrıca GitHub'daki bir webhooks örnek uygulamasına yönlendirir [RESMÎ].
- **.NET (topluluk)**: `Threads.Api` (NuGet, alfa sürüm; `HttpClient` tabanlı sarmalayıcı), `Threads.NET.Sdk` (önizleme, .NET 8+, yetkilendirme/gönderi/profil), `Threads.Lib` (F#) — hepsi erken aşamada; üretimde `HttpClient` + kendi ince sarmalayıcın daha güvenli [3. TARAF].
- **Diğer topluluk**: npm ve PyPI'de resmî Graph API'yi saran çok sayıda küçük paket var; bakımlarını kontrol et [3. TARAF]. Arşivlenmiş reverse-engineered paketler (yukarıda) kullanılmamalı.

## Postman / OpenAPI / koleksiyonlar

- **Resmî Postman çalışma alanı**: <https://www.postman.com/meta/threads/overview> ve koleksiyon <https://www.postman.com/meta/threads/collection/dht3nzz/threads-api> [RESMÎ].
- **OpenAPI şeması**: resmî olarak yayımlanmış bir OpenAPI dosyası yok [RESMÎ — belgede yok].
- **LLM dostu doküman dizini**: <https://developers.facebook.com/documentation/threads/llms.txt> — tüm sayfaların `.md` sürümlerine bağlantı [RESMÎ].

## Depoda ilgili sayfalar

- Aynı klasördeki diğer platform sayfaları (Instagram, X, Bluesky vb.) — Instagram Graph API ile aynı Meta altyapısını paylaşır.
- [Mesajlaşma Altyapıları](../../Rehberler/Mesajlasma-Altyapilari/) — Telegram, WhatsApp, BiP, SMS API'leri.

## Kaynaklar

- [Threads API — genel bakış](https://developers.facebook.com/documentation/threads) — resmî doküman ana sayfası (erişim: 15 Ekim 2026)
- [Overview / Limitations](https://developers.facebook.com/documentation/threads/overview) — hız ve yayın limitleri, medya özellikleri (erişim: 15 Ekim 2026)
- [Changelog](https://developers.facebook.com/documentation/threads/changelog) — 2024–2026 değişiklikleri (erişim: 15 Ekim 2026)
- [Get Access Tokens and Permissions](https://developers.facebook.com/documentation/threads/get-started/get-access-tokens-and-permissions) — OAuth akışı ve izinler (erişim: 15 Ekim 2026)
- [Long-Lived Tokens](https://developers.facebook.com/documentation/threads/get-started/long-lived-tokens) — 60 günlük belirteç ve yenileme (erişim: 15 Ekim 2026)
- [App Access Tokens](https://developers.facebook.com/documentation/threads/get-started/app-access-tokens) — `TH|...` biçimi (erişim: 15 Ekim 2026)
- [Create Posts](https://developers.facebook.com/documentation/threads/create-posts) — container + publish akışı, fediverse paylaşımı (erişim: 15 Ekim 2026)
- [Retrieve Posts](https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts/retrieve-posts) — kendi ve public profil gönderileri (erişim: 15 Ekim 2026)
- [Profiles / Profile Discovery](https://developers.facebook.com/documentation/threads/threads-profiles) — `profile_lookup`, 100 takipçi şartı, 1.000/24 saat (erişim: 15 Ekim 2026)
- [Keyword Search](https://developers.facebook.com/documentation/threads/keyword-search) — arama parametreleri ve 2.200 sorgu limiti (erişim: 15 Ekim 2026)
- [Mentions](https://developers.facebook.com/documentation/threads/threads-mentions) — mention uç noktası (erişim: 15 Ekim 2026)
- [Replies and Conversations](https://developers.facebook.com/documentation/threads/retrieve-and-manage-replies/replies-and-conversations) ve [Reply Management](https://developers.facebook.com/documentation/threads/reply-management) — yanıt okuma/gizleme/onay (erişim: 15 Ekim 2026)
- [Insights](https://developers.facebook.com/documentation/threads/insights) — metrikler (erişim: 15 Ekim 2026)
- [Webhooks](https://developers.facebook.com/documentation/threads/webhooks) — konular, alanlar, koşullar (erişim: 15 Ekim 2026)
- [oEmbed](https://developers.facebook.com/documentation/threads/tools-and-resources/embed-a-threads-post) ve [Web Intents](https://developers.facebook.com/documentation/threads/threads-web-intents) (erişim: 15 Ekim 2026)
- [Postman koleksiyonu](https://www.postman.com/meta/threads/overview) — resmî Meta çalışma alanı (erişim: 15 Ekim 2026)
- [9to5mac — Threads adds fediverse feed and profile search](https://9to5mac.com/2025/06/17/threads-adds-fediverse-feed-and-profile-search/) — Haziran 2025 fediverse feed (erişim: 15 Ekim 2026)
- [activitypub.space — Fediverse Report özeti](https://activitypub.space/topic/534/in-short-fediverse-report-says-that-launching-threads-as-part-of-the-fediverse-is-basically-dead-in-the-water.) — entegrasyonun bakım modunda olduğu iddiası (erişim: 15 Ekim 2026)
- [junhoyeo/threads-api](https://github.com/junhoyeo/threads-api) — Meta bildirimi sonrası arşivlenen resmî olmayan istemci (erişim: 15 Ekim 2026)
- [Danie1/threads-api](https://github.com/Danie1/threads-api) — arşivlenmiş Python istemcisi (erişim: 15 Ekim 2026)
- [NuGet: Threads.Api](https://www.nuget.org/packages/Threads.Api/) ve [Threads.NET.Sdk](https://packages.nuget.org/packages/Threads.NET.Sdk) — topluluk .NET paketleri (erişim: 15 Ekim 2026)
