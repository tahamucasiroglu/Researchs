# Canlı Yayın ve Video API'leri

Bu klasör canlı yayın ve video platformlarının geliştirici API'lerini **takip uygulaması** açısından ele alır: bir kanal yeni video yüklediğinde, canlı yayına geçtiğinde ya da sohbette bir anahtar kelime geçtiğinde bunu resmî yoldan nasıl yakalayabileceğini anlatır. Her sayfada erişim seviyeleri (kimliksiz, geliştirici uygulaması, kullanıcı OAuth'u, onay/doğrulama), kimlik doğrulama, temel uç noktalar, gerçek zamanlı bildirim yolları (WebSub, EventSub, webhook, WebSocket), hız sınırları, resmî olmayan yollar ve riskleri bulunur. Bilgiler **[RESMÎ] / [3. TARAF] / [TAHMİN] / [ÇELİŞKİLİ]** etiketleriyle işaretlenmiştir. API'ler sık değiştiği için kullanmadan önce son doğrulama tarihine bak.

## İçindekiler

| Platform | Erişim seviyeleri | Takip için ne mümkün | Son doğrulama |
|---|---|---|---|
| [YouTube](YouTube.md) | Açık (WebSub/RSS) · Geliştirici (API key, OAuth) · İşletme onayı (kota artırımı için uyum denetimi) · Resmî olmayan (InnerTube) | Yeni video kota harcamadan WebSub push ile anlık gelir; canlı yayın `videos.list` ile dolaylı tespit edilir, topluluk gönderileri için resmî API yoktur. | 15.10.2026 |
| [Twitch](Twitch.md) | Geliştirici (app / user token) · İşletme onayı (Verified Bot) · Resmî olmayan (GQL, kimliksiz IRC) | Yayın başladı/bitti ve başlık değişikliği EventSub ile kullanıcı izni olmadan, gerçek zamanlı ve ücretsiz alınır; sohbet de EventSub ile okunur. | 15.10.2026 |
| [Kick](Kick.md) | Geliştirici (app / user token, OAuth 2.1) · İşletme onayı (App Verification) · Resmî olmayan (`kick.com/api`, Pusher) | App token ile herhangi bir kanalın yayın durumu, başlık değişikliği ve sohbet mesajları webhook ile gelir; hız sınırları açıklanmaz. | 15.10.2026 |
| [Rumble ve diğerleri](Rumble-ve-Diger-Yayin.md) (Rumble · Trovo · Facebook Live · DLive) | Rumble: yalnızca kendi hesabın · Trovo: Geliştirici · Facebook: İşletme onayı (App Review) · DLive: kapandı | Trovo'da herhangi bir kanalın canlılığı ve sohbeti alınır; Rumble ve Facebook'ta yalnızca kendi/yönettiğin kanal izlenebilir, DLive 27.04.2026'da kapandı. | 15.10.2026 |

## Bu kategoriye özgü notlar

- **Ücret yok, sınır kota/hızla:** Bu platformların hiçbirinde ücretli API katmanı belgelenmemiştir. YouTube günlük kota birimiyle, Twitch token bucket ve EventSub maliyet kotasıyla, Trovo dakikalık istek sınırıyla kısıtlar; Kick hız sınırını açıklamaz.
- **Önce push, sonra yoklama:** En verimli kurulum, platformun bildirim mekanizmasına abone olmak (YouTube WebSub, Twitch EventSub, Kick webhook, Trovo chat WebSocket) ve kaçırılan olaylar için seyrek toplu yoklamayla (`videos.list`, `GET /streams`, `users/livestreams`) mutabakat yapmaktır.
- **Webhook alıcısı herkese açık HTTPS ister:** Twitch ve Kick webhook'ları `localhost`'a gelmez; geliştirme sırasında tünel (ngrok, Cloudflare Tunnel) gerekir. İmza doğrulaması ve `message_id` ile tekilleştirme zorunlu kabul edilmeli.
- **Sohbet okumak maliyetlidir:** YouTube'da canlı sohbet çağrı başına 5 kota birimi harcar; Twitch ve Kick'te sohbet abonelikleri ayrı limitlere tabidir. Sohbet verisi kullanıcı adı içerdiğinden saklanırsa kişisel veri yükümlülükleri doğar.
- **Resmî olmayan yollar:** InnerTube, Twitch GQL, Kick'in iç API'si ve Pusher kanalı çalışabilir ama belgelenmemiştir, haber verilmeden değişir ve kullanım koşullarına aykırı olabilir; yayınlanacak bir üründe yalnızca resmî yollar önerilir.

## İlgili konular

- [Sosyal medya API'leri](../Sosyal-Medya/) — X, Threads, Instagram, TikTok; Facebook Live ayrıntıları için [Meta Graph API genel](../Sosyal-Medya/Meta-Graph-API-Genel.md).
- [Mesajlaşma API'leri](../Mesajlasma/) — takip bildirimlerini iletmek için Telegram, WhatsApp vb.
- [Rehberler / YouTube-Oyun](../../Rehberler/YouTube-Oyun/) — YouTube Playables ve oyun kanalı araştırması.

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
