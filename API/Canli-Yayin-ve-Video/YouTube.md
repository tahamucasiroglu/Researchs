# YouTube API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (topluluk gönderileri için resmî API yok)

**Etiketler:** [RESMÎ] = Google/YouTube resmî dokümanında bizzat okundu · [3. TARAF] = topluluk/kütüphane kaynağı · [TAHMİN] = çıkarım, doğrulanmadı · [ÇELİŞKİLİ] = kaynaklar ya da pratik ile belge uyuşmuyor.

> Not: Bu sayfa hazırlanırken web arama kotası doldu; bilgiler doğrudan açılan resmî sayfalardan (WebFetch) ve birkaç bilinen GitHub/NuGet sayfasından alındı. Arama gerektiren bazı ayrıntılar "belgede yok" olarak bırakıldı.

## Özet

YouTube, Google Cloud üzerinden ücretsiz kullanılan **YouTube Data API v3** (kanal, video, playlist, arama, yorum, abonelik), bunun parçası olan **Live Streaming API** (canlı yayın oluşturma/yönetme, canlı sohbet) ve kanal sahiplerine yönelik **YouTube Analytics API** ile **YouTube Reporting API**'yi sunar [RESMÎ]. Kullanım ücreti yoktur; sınır **kota birimi** iledir: varsayılan olarak günde 10.000 birim genel kova + 1 Haziran 2026'dan beri ayrı kovalar (`search.list` için günde 100 çağrı, `videos.insert` için günde 100 çağrı) [RESMÎ]. Yeni video takibi için kota harcamayan **WebSub (PubSubHubbub) push bildirimi** vardır [RESMÎ]; kanal **RSS** akışı da çalışır ama resmî olarak belgelenmemiştir [3. TARAF]. Topluluk (Community/Posts) gönderileri için resmî API yoktur; bu boşluk resmî olmayan **InnerTube** istemcileriyle doldurulur ama YouTube politikaları kazımayı (scraping) yasaklar [RESMÎ].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | WebSub hub'ı `https://pubsubhubbub.appspot.com` ve topic URL'si `https://www.youtube.com/xml/feeds/videos.xml?channel_id=<KANAL_ID>` [RESMÎ — push rehberi]. Ayrıca kanal RSS akışı `https://www.youtube.com/feeds/videos.xml?channel_id=<KANAL_ID>` (son yüklemeler, Atom; yolda `/xml/` yok) [3. TARAF — belgelenmemiş; resmî dokümanda RSS akışı olarak geçmez]. | Ücretsiz; kota yok. RSS resmî olarak belgelenmediği için desteklenme garantisi yok; kaç öğe döndürdüğü de belgede yok (yaygın bilgi ~15 öğe [3. TARAF]). |
| Geliştirici hesabı / uygulama (API key) | Google hesabı + Google Cloud projesi + YouTube Data API v3'ü etkinleştirme + API key | Herkese açık veriler: `channels.list`, `videos.list`, `playlistItems.list`, `search.list`, `commentThreads.list`, `videos.batchGetStats` (herkese açık videolarda kimlik gerekmez) [RESMÎ]. "Yetkisiz list istekleri yalnızca herkese açık veriyi döndürür" [RESMÎ]. | Ücretsiz; günde 10.000 birim genel + 100 `search.list` çağrısı + 10.000 birim `videos.batchGetStats` kovası [RESMÎ]. (Kovalar projeye aittir; `videos.insert` kovası da aynı projededir ama yükleme yalnızca OAuth ile yapılır, bkz. alt satır.) |
| Geliştirici + OAuth 2.0 (kullanıcı/kanal sahibi onayı) | OAuth istemcisi, kullanıcı rıza ekranı; hassas kapsamlar için Google OAuth doğrulaması | Kendi kanalının özel verileri, abonelikler, yükleme, `liveBroadcasts.*` (OAuth zorunlu), canlı sohbete yazma/moderasyon, Analytics/Reporting [RESMÎ]. | Ücretsiz; aynı proje kotası + `videos.insert` kovası (günde 100 çağrı, 1 birim/çağrı; yükleme her zaman OAuth ister) [RESMÎ]. Hassas/kısıtlı kapsamlar için Google OAuth uygulama doğrulaması gerekir [TAHMİN — Google genel OAuth politikası, bu sayfalarda ayrıntı yok]. |
| İşletme / uygulama onayı | **API Compliance Audit** (YouTube API Hizmetleri uyum denetimi) + Quota Extension Form | Varsayılanın üstünde kota (onaylanan kullanım senaryosu için) [RESMÎ]. Analytics verisinde "audited analytics developers" için ek izinler (1 Haziran 2026'dan itibaren, politika bölüm L) [RESMÎ]. İçerik sahibi (Content Owner/CMS, YouTube Partner) raporları ve `onBehalfOfContentOwner` [RESMÎ]. | Ücretsiz ama denetimli; kullanım senaryosu değişirse yeniden denetim gerekir [RESMÎ]. |
| Ücretli / kurumsal | — | YouTube Data API için ücretli katman **belgede yok**. Ek kota ücretle değil denetimle verilir [RESMÎ]. | — |
| Resmî olmayan | InnerTube (`youtubei/v1/...`) istemcileri: YouTube.js, yt-dlp vb. | Topluluk gönderileri, canlı sohbet, kanal sekmeleri, kota olmadan arama | Ücretsiz ama ToS/politika ihlali; 403, IP/hesap engeli, PO Token zorunluluğu [3. TARAF] [RESMÎ — kazıma yasağı]. |

## Kimlik doğrulama

- **API key**: Herkese açık okumalar için `key=<API_KEY>` sorgu parametresi [RESMÎ]. Takip uygulamasında sunucu tarafında tutulmalı.
- **OAuth 2.0**: Kanal sahibi adına işlemler ve tüm `liveBroadcasts.list` çağrıları için. Kapsamlar: `https://www.googleapis.com/auth/youtube.readonly`, `.../youtube`, `.../youtube.force-ssl` (liveBroadcasts.list bu üçünden birini ister) [RESMÎ]. Analytics için ayrıca `yt-analytics.readonly` (ve gelir için `yt-analytics-monetary.readonly`) [TAHMİN — Analytics sayfasında doğrulanmadı].
- **Yetkilendirme kuralı**: Live API isteklerini yayın yapan kanalın sahibi olan Google hesabı yetkilendirmelidir; insert/update/delete her zaman kullanıcı yetkisi ister [RESMÎ].
- **Bir istemci = bir proje**: Her API istemcisi için tam olarak bir Cloud projesi açılmalı; birden çok projeyle erişimi maskelemek yasak [RESMÎ]. Kota artırmak için çok proje açmak bu kurala aykırıdır.

## Temel uç noktalar

Taban URL: `https://www.googleapis.com/youtube/v3/` (Live Streaming uç noktaları da aynı tabandadır).

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `channels?part=snippet,contentDetails,statistics&id=<ID>` veya `forHandle=@ad` | Kanal bilgisi; `contentDetails.relatedPlaylists.uploads` = kanalın **yüklemeler playlist'i** | API key | 1 birim [RESMÎ]. `forHandle` resmî parametredir (31 Ocak 2024'te eklendi; baştaki `@` ile verilebilir): `channels.list?forHandle=@ad` [RESMÎ]. |
| GET | `playlistItems?part=snippet,contentDetails&playlistId=<UU...>` | Bir playlist'in (ör. yüklemeler) öğeleri | API key | 1 birim [RESMÎ]. Kanalın son yüklemelerini güvenilir almak için önerilen yol; `search.list` bunun için önerilmez [RESMÎ]. |
| GET | `videos?part=snippet,liveStreamingDetails,statistics&id=<ID1,ID2,...>` | Video ayrıntısı; `snippet.liveBroadcastContent` = `live` / `upcoming` / `none`; `liveStreamingDetails.actualStartTime`, `actualEndTime`, `scheduledStartTime`, `concurrentViewers`, `activeLiveChatId` | API key | 1 birim [RESMÎ]. Çağrı başına en çok 50 ID [3. TARAF — yaygın bilgi, bu oturumda doğrulanmadı]. |
| GET | `videos:batchGetStats?part=statistics&id=...` | Toplu video istatistikleri (3 Haziran 2026'da eklendi) | API key (herkese açık videolar) | 1 birim, **kendi kovası** (günde 10.000) [RESMÎ]. ID üst sınırı belgede yok. |
| GET | `search?part=snippet&type=video&eventType=live&channelId=<ID>` | Kanalda şu an canlı (veya `upcoming`/`completed`) yayın ara | API key | 1 birim, **Search Queries kovası: günde 100 çağrı** [RESMÎ]. `eventType` için `type=video` şart [RESMÎ]. İndeks gecikmesi olabilir [RESMÎ]. |
| GET | `playlists?channelId=<ID>` | Kanalın playlist'leri | API key | 1 birim [TAHMİN — tabloda listelenen 1 birimlik list metotlarıyla aynı sınıf] |
| GET | `commentThreads?part=snippet&videoId=<ID>` | Video yorumları | API key | 1 birim [RESMÎ]. `comments` kaynağına `snippet.imageUrl` eklendi (30.09.2026); tüm kullanıcılara Kasım 2026'da açılıyor; commentThreads yanıtında `topLevelComment.snippet.imageUrl` (ve `replies` içindeki yorumlarda) olarak gelir [RESMÎ]. |
| GET | `activities?channelId=<ID>` | Kanal etkinlik akışı | API key | 1 birim [RESMÎ]. `contentDetails.like/favorite` artık döndürülmüyor (Ağu 2026) [RESMÎ]. |
| GET | `subscriptions?mine=true` | Kendi abonelikleri | OAuth | 1 birim [RESMÎ] |
| GET | `liveBroadcasts?broadcastStatus=active` / `mine=true` / `id=...` | Yayın kayıtları (Live Streaming API) | **OAuth zorunlu** | 1 birim [RESMÎ — determine_quota_cost tablosu; liveBroadcasts.list sayfası maliyet yazmıyor]. Tam olarak bir filtre (`broadcastStatus`, `id`, `mine`) verilmeli [RESMÎ]. Başka kanalın yayınını `id` ile okuyup okuyamayacağı belgede net değil → takip için `videos.list` kullanın. |
| POST | `liveBroadcasts`, `liveStreams`, `liveBroadcasts/bind`, `transition` | Yayın oluşturma/bağlama/başlatma | OAuth (kanal sahibi) | `liveBroadcasts.insert` 1 birim [RESMÎ]. Takip için gerekmez. |
| GET | `liveChat/messages?liveChatId=<ID>&part=snippet,authorDetails` (`liveChatMessages.list`) | Canlı sohbet mesajlarını yoklama (polling) | Belgede net değil (bkz. not) | 5 birim/çağrı; yanıt `pollingIntervalMillis` ile beklenecek süreyi söyler; hızlı istek `rateLimitExceeded` [RESMÎ]. |
| GET (stream) | `liveChatMessages.streamList` | Sunucu akışı (server-streaming): yeni mesajlar açık bağlantı üzerinden itilir | Belgede net değil | 5 birim [RESMÎ]. "Canlı sohbeti tüketmenin en verimli yolu" [RESMÎ]. `maxResults` 200–2000 (varsayılan 500); kopunca son `nextPageToken` ile devam; gRPC ve web bağlantısı hataları belgelenmiş [RESMÎ]. |
| POST | `liveChat/messages` (`liveChatMessages.insert`) | Sohbete mesaj / anket gönderme | OAuth | Takip için gerekmez. |

Tam referans: <https://developers.google.com/youtube/v3/docs> ve <https://developers.google.com/youtube/v3/live/docs>.

**Canlı sohbete erişim notu:** `liveChatMessages.list` sayfası yetki türünü (API key / OAuth) açıkça yazmıyor; yalnızca izin yoksa 403 `forbidden` döner diyor [RESMÎ]. Toplulukta herkese açık yayınların sohbetinin API key ile okunabildiği yaygın olarak bildirilir [3. TARAF] — üretimde güvenmeden önce test edin [ÇELİŞKİLİ]. `activeLiveChatId` yayın bitince kaldırılır ve sohbet kapanır [RESMÎ]; yani biten yayının sohbeti API'den okunamaz.

## Gerçek zamanlı / bildirim

| Mekanizma | Var mı | Nasıl | Kapsam |
|---|---|---|---|
| **WebSub (PubSubHubbub) push** | Var [RESMÎ] | `https://pubsubhubbub.appspot.com/subscribe`'a `hub.mode=subscribe`, `hub.callback=<sunucu URL'n>`, `hub.topic=https://www.youtube.com/xml/feeds/videos.xml?channel_id=<KANAL_ID>` gönder. Hub önce callback'e doğrulama (`hub.challenge`) GET'i yapar, sonra Atom gövdeli POST'larla bildirim gelir. | Bildirim tetikleyicileri: **video yükleme, başlık değişikliği, açıklama değişikliği** [RESMÎ]. Silme bildirimi belgede yok. Canlı yayın planlanınca/başlayınca da bildirim geldiği toplulukta bildirilir [3. TARAF] — ama "yayın başladı" ayrı bir olay olarak belgelenmemiştir. Kiralama (lease) süresi belgede yok; WebSub standardında `hub.lease_seconds` ile süreli abonelik vardır, süresi dolmadan yenilenmelidir [3. TARAF — W3C WebSub]. |
| **RSS / Atom** | Var ama belgelenmemiş [3. TARAF] (resmî olan yalnızca WebSub topic URL'si `/xml/feeds/videos.xml`) | `https://www.youtube.com/feeds/videos.xml?channel_id=<KANAL_ID>` (playlist için `?playlist_id=` [3. TARAF]) | Son yüklemeler; kimliksiz, kota yok. Yoklama aralığını makul tutun. |
| **Canlı sohbet akışı** | Var [RESMÎ] | `liveChatMessages.streamList` (server-streaming, gRPC/HTTP) | Yalnızca o anki canlı yayın sohbeti. |
| **Webhook (genel olay)** | Yok | Data API'de genel webhook/olay aboneliği belgede yok. | — |
| **Reporting API** | Toplu (günlük) | Zamanlanmış iş (job) → her gün 24 saatlik toplu rapor dosyası; filtreleme/sıralama istemcide [RESMÎ] | Yalnızca kendi kanalın / içerik sahibinin verisi; push/webhook yok. |
| **Analytics API** | İsteğe bağlı (on-demand) | Filtreleme ve sıralama içeren hedefli sorgular ("real-time targeted queries") [RESMÎ] | Yalnızca kendi kanalın / içerik sahibinin verisi; push/webhook yok, sorguyu sen tetiklersin. |

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Kanal yeni video yükledi | Evet | **WebSub push** (anlık) + yedek olarak RSS yoklaması; ayrıntı için `videos.list` | Kimliksiz + API key | Kota dostu en iyi yol. `search.list` kullanmayın (günde 100 çağrı, indeks gecikmesi) [RESMÎ]. |
| Kanal canlı yayına geçti | Evet, dolaylı | Push/RSS ile gelen yeni video ID'lerini (planlı yayınlar da video olarak görünür) `videos.list?part=snippet,liveStreamingDetails` ile kontrol et: `liveBroadcastContent=live` veya `actualStartTime` dolu → başladı. `upcoming` olanları `scheduledStartTime` civarında birkaç dakikada bir yokla (1 birim, 50 ID'ye kadar toplu). | API key | `search?eventType=live` de olur ama yalnız 100 çağrı/gün → kanal başına sürekli yoklamaya uygun değil [RESMÎ]. Ani (planlanmamış) yayınlarda push'un ne zaman geldiği belgede yok [TAHMİN: genelde gelir, gecikmeli olabilir]. |
| Yayın bitti / izleyici sayısı | Evet | `videos.list` → `actualEndTime`, `concurrentViewers` | API key | `concurrentViewers` yalnız izleyici varsa ve sahibi gizlemediyse gelir [RESMÎ]. |
| Video başlık/açıklama değişti | Evet | WebSub bildirimi | Kimliksiz | [RESMÎ] |
| Video silindi / gizlendi | Kısmen | `videos.list` ile ID artık dönmüyor mu diye yokla | API key | Push bildirimi belgede yok. |
| Canlı sohbet mesajları (anahtar kelime filtresi) | Evet | `streamList` (tercih) veya `list` + `pollingIntervalMillis`; filtreleme istemci tarafında | API key? / OAuth | 5 birim/çağrı; uzun yayınlarda kota hızla biter [RESMÎ]. Örnek: 10 sn'de bir `list` = saatte 360 çağrı × 5 = 1.800 birim [TAHMİN — hesap]. |
| Yorumlar | Evet | `commentThreads.list?videoId=` yoklama; anahtar kelime filtresi sunucu tarafında `searchTerms` ile yapılabilir (`id` ile birlikte kullanılamaz) [RESMÎ]; `maxResults` 1–100 (varsayılan 20) [RESMÎ] | API key | 1 birim; push yok. |
| Topluluk (Posts) gönderileri | **Resmî yolla hayır** | Data API'de `posts`/community kaynağı yok (resmî referansta bulunmuyor). Alternatif: InnerTube istemcileri (YouTube.js vb.) veya manuel/üçüncü taraf servisler | Resmî olmayan | Kazıma politikayla yasak [RESMÎ]. |
| Shorts | Evet (video olarak) | Normal video gibi push/RSS/`videos.list` | API key | Shorts'u ayırt eden resmî alan bu oturumda doğrulanmadı [TAHMİN]. |
| Kanal istatistiği değişimi (abone sayısı) | Evet, yoklamayla | `channels.list?part=statistics` | API key | Toplanan istatistik 30 günden uzun saklanamaz [RESMÎ]. |

**Önerilen mimari [TAHMİN — resmî bulgulara dayalı tasarım]:** Her kanal için WebSub aboneliği (lease yenileme zamanlayıcısıyla) → gelen video ID'leri kuyruğa → `videos.list` ile toplu (50'şer) ayrıntı → `upcoming` olanlar için planlanan saat civarında kısa aralıklı yoklama → `live` olunca bildirim; isteğe bağlı `streamList` ile sohbet dinleme ve anahtar kelime filtresi. RSS, push kaçırılırsa yedek yoklama.

## Hız sınırları ve fiyatlar

| Kova | Varsayılan | Maliyet |
|---|---|---|
| Genel (tüm diğer metotlar) | 10.000 birim/gün | list metotları çoğunlukla 1 birim; `liveChatMessages.list`/`streamList` 5; `captions.insert` 400; `thumbnails.set` 50 [RESMÎ] |
| Search Queries (`search.list`) | 100 çağrı/gün | 1 birim/çağrı (1 Haziran 2026'dan beri; önceden çağrı başına 100 birim düşerdi) [RESMÎ] |
| `videos.insert` | 100 çağrı/gün | 1 birim/çağrı; yalnızca OAuth [RESMÎ]. Geçmiş: önce ~1.600 birim → 4.12.2025'te ~100 birim → 1.6.2026'dan beri ayrı kovada 1 birim/çağrı [RESMÎ — revision_history] |
| `videos.batchGetStats` | 10.000 birim/gün | 1 birim [RESMÎ] |

- Kota günlük sıfırlanır: "Daily quotas reset at midnight Pacific Time (PT)." [RESMÎ]
- Ücret yoktur; artış yalnızca **API Compliance Audit / Quota Extension Form** ile [RESMÎ].
- Sohbet yoklamasında `rateLimitExceeded` = çok sık istek [RESMÎ].
- **Veri saklama (politika, 14 Eylül 2026 güncel):** Yetkisiz (herkese açık) API verisinden alınan istatistikler 30 günden fazla saklanamaz; 30 gün sonra silinmeli veya yenilenmeli; API verisinden yeni metrik türetmek yasak; kullanıcı silme talebi 7 gün içinde uygulanmalı; 90 gün pasif proje erişimi kısılabilir [RESMÎ]. Takip uygulamasının arşiv/istatistik özelliği bu kurallara göre tasarlanmalı.

## Resmî olmayan yollar ve riskler

- **InnerTube (`https://www.youtube.com/youtubei/v1/...`)**: YouTube web/mobil uygulamalarının kendi iç API'si. Uç noktalar (`browse`, `next`, `player`, `search`, `live_chat/get_live_chat` vb.) belgelenmemiştir ve haber verilmeden değişir [3. TARAF].
  - **YouTube.js (`youtubei.js`)** — JavaScript/TypeScript InnerTube istemcisi (Node.js, Deno, tarayıcı), MIT lisanslı; YouTube ile bağlantısı olmadığını açıkça belirtir [3. TARAF]. Topluluk gönderileri, canlı sohbet gibi özellikler ytjs.dev belgelerinde [TAHMİN — repo sayfasında görülmedi].
  - **yt-dlp** — indirme aracı; InnerTube istemcilerini (`web`, `android`, `ios`, `tv`...) kullanır [3. TARAF].
  - Diğer yaygın adlar: `pytchat`/`chat-downloader` (Python canlı sohbet), `YoutubeExplode` (.NET) [3. TARAF — bu oturumda ayrı ayrı doğrulanmadı; bakımda olup olmadıkları kontrol edilmeli].
- **PO Token (Proof of Origin)**: YouTube bazı istemci isteklerinde "gerçek istemciden geliyor" kanıtı ister; yoksa HTTP 403 ve **hesap/IP engeli** olabilir. Zorlama kademeli yayılıyor; tokenlar artık video ID'sine bağlı, ömrü 12 saat kadar kısa olabilir (yt-dlp wiki, 12 Temmuz 2026) [3. TARAF]. Bu, InnerTube tabanlı araçların kırılganlığını artırır.
- **Hukuki/politika riski**: YouTube API Hizmetleri Geliştirici Politikaları, YouTube'u ya da Google mülklerini doğrudan/dolaylı **kazımayı** ve kazınmış veriyi kullanmayı yasaklar (arama motorları robots.txt istisnası hariç) [RESMÎ]. Resmî API ile InnerTube'u aynı üründe karıştırmak, API erişiminin askıya alınmasına yol açabilir [TAHMİN]. Askıya alınınca yeni hesap/proje açmak da yasak [RESMÎ].
- **Nesnel değerlendirme**: Kişisel, düşük hacimli deneylerde InnerTube pratikte çalışır; yayınlanan/ticari bir üründe yalnız resmî API + WebSub/RSS önerilir [TAHMİN].

## SDK ve kütüphaneler

| Dil | Kütüphane | Tür | Not |
|---|---|---|---|
| .NET | `Google.Apis.YouTube.v3` (NuGet) | Resmî (Google API Client) | Son sürüm 1.77.0.4302, 15.10.2026 [RESMÎ — NuGet]. Analytics/Reporting için `Google.Apis.YouTubeAnalytics.v2`, `Google.Apis.YouTubeReporting.v1` [TAHMİN — paket adları doğrulanmadı]. |
| Java / Python / Node.js / Go / PHP | Google API Client Libraries (`google-api-python-client`, `googleapis` npm, `google.golang.org/api/youtube/v3` ...) | Resmî | Discovery tabanlı, otomatik üretilmiş [3. TARAF — genel bilgi]. |
| .NET | YoutubeExplode | Resmî olmayan (InnerTube/kazıma) | API key istemez; ToS riski [3. TARAF]. |
| JS/TS | YouTube.js (`youtubei.js`) | Resmî olmayan (InnerTube) | [3. TARAF] |
| Python | yt-dlp, chat-downloader, pytchat | Resmî olmayan | [3. TARAF] |
| Her dil | WebSub istemcisi | Standart | Callback sunucusu herhangi bir HTTP framework'üyle yazılabilir (ASP.NET Core minimal API yeterli) [TAHMİN]. |

## Postman / OpenAPI / koleksiyonlar

- **Google Discovery belgesi** (OpenAPI değil, Google'ın kendi şeması): `https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest` [3. TARAF — yaygın bilinen adres, bu oturumda açılmadı]. Discovery → OpenAPI dönüştürücüleri mevcuttur.
- **APIs Explorer**: Her resmî referans sayfasında "Try this API" paneli; tarayıcıdan API key/OAuth ile deneme [RESMÎ].
- Resmî Postman koleksiyonu: **belgede yok**; Postman Public API Network'te topluluk koleksiyonları bulunur [TAHMİN].

## Depoda ilgili sayfalar

- [Video Üretim Sistemi](../../Programlama/Yapay-Zeka/video-uretim-sistemi/) — Claude ile video üretip YouTube'a yükleme; Data API yükleme kısıtları ve YPP politikaları.
- [Rehberler / YouTube-Oyun](../../Rehberler/YouTube-Oyun/) — YouTube Playables ve oyun kanalı araştırması.
- [Yapay-Zeka / kodla-video](../../Programlama/Yapay-Zeka/kodla-video/) — Remotion ile kodla video üretimi (YouTube içerik üretimiyle ilişkili).
- [X-Twitter](../Sosyal-Medya/X-Twitter.md), [Threads](../Sosyal-Medya/Threads.md), [Instagram](../Sosyal-Medya/Instagram.md), [TikTok](../Sosyal-Medya/TikTok.md) — aynı takip uygulaması için diğer platformlar.
- [Telegram](../Mesajlasma/Telegram.md), [WhatsApp](../Mesajlasma/WhatsApp.md) — takip uygulamasının bildirim kanalı olarak kullanılabilecek mesajlaşma API'leri.

## Kaynaklar

Resmî:

- <https://developers.google.com/youtube/v3/determine_quota_cost> — Kota maliyetleri (liveBroadcasts.list 1 birim dahil), ayrı kovalar (search.list/videos.insert 100 çağrı), PT gece yarısı sıfırlama — (erişim: 15 Ekim 2026; sayfa güncelleme 08.10.2026)
- <https://developers.google.com/youtube/v3/revision_history> — Data API değişiklik geçmişi: 31 Ocak 2024 `forHandle`, 4 Aralık 2025 yükleme maliyeti ~1.600 → ~100, 1 Haziran 2026 granüler kota, 3 Haziran 2026 `videos.batchGetStats`, 30 Eylül 2026 `comments.snippet.imageUrl` — (erişim: 15 Ekim 2026)
- <https://developers.google.com/youtube/v3/docs/channels/list> — `forHandle` parametresi — (erişim: 15 Ekim 2026)
- <https://developers.google.com/youtube/v3/docs/commentThreads/list> — `searchTerms`, `maxResults` 1–100 — (erişim: 15 Ekim 2026)
- <https://developers.google.com/youtube/v3/docs/videos/insert> — Video yükleme (OAuth zorunlu) — (erişim: 15 Ekim 2026)
- <https://developers.google.com/youtube/v3/live/revision_history> — Live Streaming API değişiklik geçmişi (giftDetails, monetization, polls) — (erişim: 15 Ekim 2026)
- <https://developers.google.com/youtube/v3/guides/push_notifications> — WebSub/PubSubHubbub push bildirimleri, topic URL ve Atom gövdesi — (erişim: 15 Ekim 2026; sayfa güncelleme 07.10.2026)
- <https://developers.google.com/youtube/v3/docs/search/list> — `eventType=live`, kota kovası, son yüklemeler için search.list önerilmez — (erişim: 15 Ekim 2026)
- <https://developers.google.com/youtube/v3/docs/videos> — `liveBroadcastContent`, `liveStreamingDetails` alanları — (erişim: 15 Ekim 2026)
- <https://developers.google.com/youtube/v3/docs/videos/batchGetStats> — Toplu video istatistikleri — (erişim: 15 Ekim 2026)
- <https://developers.google.com/youtube/v3/live/docs/liveBroadcasts/list> — OAuth kapsamları ve filtreler (kota maliyeti bu sayfada yazmaz) — (erişim: 15 Ekim 2026)
- <https://developers.google.com/youtube/v3/live/docs/liveChatMessages/list> — Sohbet yoklama, `pollingIntervalMillis`, 5 birim — (erişim: 15 Ekim 2026)
- <https://developers.google.com/youtube/v3/live/docs/liveChatMessages/streamList> — Sunucu akışlı sohbet okuma — (erişim: 15 Ekim 2026; sayfa güncelleme 08.10.2026)
- <https://developers.google.com/youtube/v3/live/getting-started> — Live Streaming API kavramları ve yetkilendirme — (erişim: 15 Ekim 2026)
- <https://developers.google.com/youtube/reporting> — Analytics API ve Reporting API karşılaştırması — (erişim: 15 Ekim 2026; sayfa güncelleme 14.09.2026)
- <https://developers.google.com/youtube/terms/developer-policies> — Geliştirici politikaları: 30 gün saklama, kazıma yasağı, tek proje, denetim — (erişim: 15 Ekim 2026; sayfa güncelleme 14.09.2026)
- <https://www.nuget.org/packages/Google.Apis.YouTube.v3> — Resmî .NET istemci paketi — (erişim: 15 Ekim 2026)

Üçüncü taraf:

- <https://github.com/LuanRT/YouTube.js> — Resmî olmayan InnerTube istemcisi (JS/TS) — (erişim: 15 Ekim 2026)
- <https://github.com/yt-dlp/yt-dlp/wiki/PO-Token-Guide> — PO Token açıklaması ve istemci bazında zorunluluk — (erişim: 15 Ekim 2026; wiki düzenleme 12.07.2026)
- <https://www.w3.org/TR/websub/> — WebSub standardı (lease, doğrulama akışı) — (erişim: 15 Ekim 2026; bu oturumda açılmadı, standart bilgisi)

[← Üst klasör](../)
