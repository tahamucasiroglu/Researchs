# Sosyal Medya API'leri

Bu klasör, başlıca sosyal medya platformlarının geliştirici API'lerini **takip uygulaması** açısından inceler: belirli hesapların yeni gönderisini, canlı yayına geçmesini, mesaj/grup içeriğini ve anahtar kelime geçişlerini resmî yollarla izlemek mümkün mü, hangi erişim seviyesi gerekiyor, gerçek zamanlı bildirim (webhook/stream) var mı, resmî yol yoksa hangi resmî olmayan yollar kullanılıyor ve bunların riskleri neler. Genel tablo şöyle: açık protokoller (Bluesky, Mastodon) kimlik doğrulamasız ve ücretsiz izlemeye izin verir. X ücretli ama en kapsamlı gerçek zamanlı olay akışını sunar. Meta ailesi (Facebook, Instagram, Threads) App Review ve işletme doğrulaması ister. LinkedIn, TikTok, Snapchat ve abonelik platformları ise başkasının hesabını izlemeye resmî olarak neredeyse hiç izin vermez. Her sayfada erişim seviyeleri, kimlik doğrulama, uç noktalar, hız sınırları ve fiyatlar, resmî olmayan yollar ile kaynaklar ayrı başlıklar altında anlatılır.

## İçindekiler

| Platform | Erişim seviyeleri | Takip için ne mümkün | Son doğrulama |
|---|---|---|---|
| [Bluesky (AT Protocol)](Bluesky.md) | Açık | Herkese açık her şey (gönderi, repost, silme, "Live" durumu, profil değişikliği) Jetstream üzerinden kimliksiz ve gerçek zamanlı izlenebilir. | 15.10.2026 |
| [Mastodon ve Fediverse](Mastodon-Fediverse.md) | Açık (sunucu kurallarına bağlı) | Bot hesabıyla takip, liste ve hashtag akışları WebSocket ile anlık gelir. Kısıtlar sunucuya göre değişir, canlı yayın yalnızca PeerTube'da var. | 15.10.2026 |
| [X (Twitter)](X-Twitter.md) | Ücretli (kullandıkça öde) · Geliştirici · Enterprise | X Activity API ile yeni gönderi, canlı yayın, Space ve profil değişikliği olay başı ücretle webhook/stream olarak alınabilir. | 15.10.2026 |
| [Meta Graph API (Facebook) — genel](Meta-Graph-API-Genel.md) | Geliştirici · İşletme onayı (App Review + Business Verification) · Marketing API: Limited / Full katmanı | Kendi Sayfan webhook ile tam izlenir. Başkasının Sayfası yalnızca PPCA onayıyla yoklanabilir, kişisel profil ve gruplar kapalıdır. Reklam yönetimi (Marketing API) ayrı bölümde. | 6.11.2026 |
| [Instagram](Instagram.md) | İşletme onayı (yalnızca Business/Creator hesap) | Kendi hesabın webhook ile izlenir. Başka Business/Creator hesaplar yalnızca yoklamayla izlenebilir, kişisel hesaplar ve başkasının canlı yayını resmî olarak izlenemez. | 15.10.2026 |
| [Threads](Threads.md) | Geliştirici · İşletme onayı (Advanced Access) | Onaydan sonra herkese açık profiller ve anahtar kelimeler yoklanabilir. Kendi hesabın webhook ile izlenir, canlı yayın ve DM API'si yok. | 15.10.2026 |
| [LinkedIn](LinkedIn.md) | Geliştirici (yalnızca açık izinler) · İşletme onayı · Partner | Yalnızca yönettiğin şirket sayfası ve kendi hesabın izlenebilir. Başkasının gönderisi, araması ya da canlı yayını için resmî yol yok. | 15.10.2026 |
| [TikTok](TikTok.md) | Geliştirici · İşletme (API for Business yalnız şirketlere) · Araştırmacı · Resmî olmayan (LIVE) | Yalnızca izin veren hesabın videoları izlenebilir. Başka hesaplar ve canlı yayın için yalnızca araştırmacı API'si ya da resmî olmayan kütüphaneler kalıyor. API for Business kendi reklam ve işletme hesabın için webhook verir. | 6.11.2026 |
| [Pinterest](Pinterest.md) | Geliştirici (Trial/Standard, uygulama incelemesiyle) | Kendi hesabın yoklanabilir. Başkasının pinleri RSS ya da ek onayla izlenebilir, API verisinin saklanması yasak. | 15.10.2026 |
| [Reddit](Reddit.md) | Geliştirici onayı (kapanmakta) · Ücretli/ticari anlaşma | Subreddit ve kullanıcı yoklaması Mart 2027'ye kadar çalışıyor. Sonrasında yalnızca Devvit (moderatörü olunan topluluk) ya da ticari anlaşma kalıyor. | 15.10.2026 |
| [Snapchat](Snapchat.md) | İşletme onayı (Public Profile API allowlist) | Allowlist ile herkese açık profillerin Spotlight ve Saved Story içerikleri yoklanabilir. Canlı yayın, sohbet ve arkadaş hikâyeleri için API yok. | 15.10.2026 |
| [OnlyFans, Fansly ve Patreon](OnlyFans-ve-Abonelik-Platformlari.md) | Resmî olmayan (OnlyFans, Fansly) · Geliştirici (Patreon) | Patreon'da yalnızca kendi kampanyan webhook ile izlenir. OnlyFans ve Fansly'nin resmî API'si yok. | 15.10.2026 |

## Takip matrisi (özet)

| Platform | Yeni gönderi | Canlı yayın | Mesaj / grup içeriği | Gerçek zamanlı push | Resmî olmayan yol |
|---|---|---|---|---|---|
| Bluesky | Evet, kimliksiz | Evet, sınırlı ("Live" durumu, harici yayın bağlantısı) | Yalnızca kendi DM'in | Evet (Jetstream / firehose) | Gerek yok denecek kadar az |
| Mastodon / Fediverse | Evet (bot hesabı, RSS) | Mastodon'da yok, PeerTube'da var | Yalnızca kendi DM'in | Evet (streaming SSE/WebSocket) | Gereksiz; toplu taramaya topluluk tepkisi var |
| X | Evet (ücretli) | Evet (yayın ve Space başladı/bitti) | Yalnızca izin veren kullanıcı | Evet (XAA webhook / filtered stream) | Var (twscrape, guest token); ToS ihlali |
| Facebook (Meta) | Kendi Sayfan evet; başkası PPCA ile yoklama | Kendi Sayfan evet; başkası belirsiz | Yalnızca Sayfaya gelen mesajlar | Yalnızca kendi Sayfan | Var (kazıma, otomasyon); yüksek risk |
| Instagram | Kendi hesabın; başka Business hesap yoklamayla | Yalnızca kendi hesabın (dolaylı) | Yalnızca kendi DM'in | Kendi hesabın için (webhook) | Var (instagrapi, Instaloader); ban riski |
| Threads | Evet, Advanced Access ile yoklama | Yok | Yok | Yalnızca kendi hesabın | Arşivlenmiş istemciler; artık pek gerek yok |
| LinkedIn | Yalnızca yönettiğin sayfa | Hayır | Hayır (partner dışı) | Yalnızca yönettiğin sayfa | Var (Voyager, kazıma); yasak ve riskli |
| TikTok | Yalnızca izin veren hesap | Resmî hayır | Yalnızca işletme mesajları | Çok sınırlı | Var (TikTokLive, Euler Stream) |
| Pinterest | Kendi hesabın; başkası RSS ya da onayla | Yok | Yok | Hayır (yalnızca lead webhook) | Var (py3-pinterest, gallery-dl) |
| Reddit | Evet, Mart 2027'ye kadar | Yok | Yalnızca kendi kutun | Hayır (Devvit tetikleyicileri hariç) | Büyük ölçüde kapandı |
| Snapchat | Allowlist ile yoklama | Yok | Yok | Hayır | Var (web sayfası ayrıştırma, scraper API) |
| OnlyFans / Fansly / Patreon | Patreon: kendi kampanyan; diğerleri hayır | Patreon kısmen (partner) | Hayır | Patreon webhook (kendi kampanyan) | Var (ticari aracılar, OF-Scraper) |

## Kategoriye özgü notlar

- **"Kendi hesabın" ve "başkasının hesabı" ayrımı belirleyicidir.** Çoğu platform yalnızca token sahibinin ya da izin veren hesabın verisini açar. Başka hesapları izlemek için ya ek onay (Meta PPCA, Threads Advanced Access, Pinterest pinner data, Snapchat allowlist) ya da ücret (X) gerekir.
- **Bedava olmak, kolay olmak demek değildir.** Meta, LinkedIn ve TikTok API'leri ücretsizdir ama erişim App Review, işletme doğrulaması ve partner programlarına bağlıdır. X'in ise başvuru yükü azdır ama kaynak/olay başına ücret alır.
- **Gerçek zamanlı push nadirdir.** Başkasının hesabı için gerçek zamanlı olay yalnızca Bluesky (Jetstream), Mastodon (streaming) ve X'te (XAA, filtered stream) vardır. Diğerlerinde yoklama (polling) gerekir, dolayısıyla hız sınırları izlenebilecek hesap sayısını belirler.
- **Filtreleme genelde senin kodunda yapılır.** Sunucu tarafı anahtar kelime filtresi yalnızca X (stream kuralları), Threads (keyword search), Mastodon (hashtag) ve kısmen Reddit'te (arama) vardır. Diğerlerinde gelen metin uygulamada süzülür.
- **Veri saklama kuralları farklıdır.** Pinterest API verisinin saklanmasını yasaklar, Reddit ve LinkedIn kısa saklama süreleri öngörür, Bluesky ve Reddit silinen içeriğin silinmesini ister. Kişisel veri işleniyorsa KVKK/GDPR yükümlülükleri ayrıca doğar.
- **Resmî olmayan yollar** (kazıma, iç GraphQL uçları, hesap çerezli kütüphaneler) çoğu platformda kullanım koşullarını ihlal eder. Hesap kapatma, IP engeli ve hukuki risk taşırlar ve uyarı yapılmadan bozulabilirler. Resmî yolu olmayan platformlarda daha güvenli alternatif, içerik üreticisinin duyuru yaptığı açık bir kanalı (Bluesky, Mastodon, X, Telegram, RSS) izlemektir.
- **Tarihe dikkat:** Bu alan hızlı değişiyor (Reddit'in kapanış takvimi, X'in fiyat modeli, Patreon v1'in kapanması). Sayfalardaki bilgiler son doğrulama tarihine göre okunmalı; sayfalardaki [RESMÎ], [3. TARAF], [TAHMİN] ve [ÇELİŞKİLİ] etiketleri bilginin kaynağını gösterir.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
