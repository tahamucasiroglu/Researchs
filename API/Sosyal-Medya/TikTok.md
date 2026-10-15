# TikTok API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **kısıtlı** (resmî API var ama başkasının hesabını izlemeye izin vermiyor; LIVE için resmî API yok)

## Özet

TikTok iki ayrı geliştirici portalı sunar: **TikTok for Developers** (`developers.tiktok.com`; Login Kit, Display API, Content Posting API, Share Kit, Data Portability, Embed, Research API, Commercial Content API, Webhooks) ve **TikTok API for Business** (`business-api.tiktok.com`; Marketing API, Organic API, Business Messaging API). Geliştirici API'leri büyük ölçüde **yalnızca oturum açıp izin veren kullanıcının kendi verisini** okur/yazar. Başka hesapların herkese açık içeriğini sorgulamak için tek resmî yol, yalnızca akademik/kâr amacı gütmeyen araştırmacılara açık olan **Research API**'dir. Belgelerde geliştirici API'leri için bir ücret geçmiyor [RESMÎ — ücret bilgisi belgede yok]. Bir kanalın canlı yayına geçmesini ya da yayın içi olayları (sohbet, hediye) bildiren resmî bir API yoktur. Bu iş topluluğun tersine mühendislik kütüphaneleriyle (TikTokLive vb.) ve ücretli üçüncü taraf hizmetlerle (Euler Stream) yapılır [3. TARAF].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Herkese açık (kimliksiz)** | Hiçbir şey | oEmbed (`https://www.tiktok.com/oembed?url=<video URL>`): tek bir videonun başlığı, yazar adı, küçük resmi ve embed HTML'i [RESMÎ]. Embed Creator Profiles (profil gömme) [RESMÎ]. | Belgede limit yok. Liste ya da arama yapılamaz; yalnızca URL'si bilinen video sorgulanır. |
| **Geliştirici hesabı / uygulama** | developers.tiktok.com hesabı, uygulama kaydı, `client_key` ve `client_secret` | Login Kit (OAuth 2.0), Display API (`user.info.*`, `video.list`), Content Posting API (sandbox ya da denetimsiz kullanımda yalnızca özel paylaşım), Share Kit, Data Portability [RESMÎ] | Ücret belgede yok. Uç nokta başına 600 istek/dk, kayan pencere (bkz. Hız sınırları) [RESMÎ]. Limitin kullanıcı mı uygulama mı bazında işlediği belgede belirtilmiyor. |
| **İşletme / uygulama onayı** | **App Review** (scope onayı) ve Content Posting için ayrıca **audit** (ToS uyum denetimi) [RESMÎ] | Herkese açık Direct Post, daha çok kullanıcı. Business API tarafında Accounts, Mentions ve Discovery gibi Organic API'ler ile Business Messaging (TikTok Business Center ve geliştirici kaydı gerekir) [RESMÎ, ayrıntıları belgede sınırlı] | Denetimsiz istemci: 24 saatte en çok 5 kullanıcı, yalnızca `SELF_ONLY` görünürlük [RESMÎ] |
| **Araştırmacı (özel başvuru)** | Research API: ABD, AEA, Birleşik Krallık, Kanada veya İsviçre'de akademik kurum; AB'de bağımsız kâr amacı gütmeyen araştırma kuruluşu (beta); çevrim içi çocuk güvenliği çalışan Brezilyalı akademik veya kâr amacı gütmeyen kurumlar. Proje önerisi, finansman beyanı, etik kurul onayı gerekir; doktora öğrencisi danışman mektubu sunar [RESMÎ]. Akademik olmayan, kâr amacı gütmeyen kuruluşlar da sınırlı koşullarla VCE (Virtual Compute Environment) üzerinden erişebilir [RESMÎ]. **AB DSA onaylı araştırmacı (vetted researcher)**: bir Dijital Hizmetler Koordinatörü'nün (DSC) verdiği onaylı araştırmacı statüsüyle, Research API başvurusundan ayrı bir veri erişim başvurusu yapılır (23.12.2025'ten beri). Bu yol, AB'deki sistemik riskler üzerine araştırma içindir; scope'u `research.data.vra` [RESMÎ]. Commercial Content API: kurumsal e-postalı geliştirici hesabı ve başvuru formu; araştırmacı her ülkeden olabilir; onay genelde 2 iş günü sürer [RESMÎ]. | Research API: herkese açık videolar, yorumlar, kullanıcı profilleri, takipçi ve takip listeleri, beğenilen, sabitlenen ve yeniden paylaşılan videolar, AB TikTok Shop verisi. Commercial Content API: reklam kütüphanesi (şimdilik yalnızca AB reklamları) | Research API: günde 1.000 istek ve 100.000 kayıt. Takipçi/takip listelerinde günde 20.000 çağrı ve 2 milyon kayıt. Kota 00:00 UTC'de sıfırlanır [RESMÎ]. Ücret belgede yok. **Ticari kullanım ve içerik üreticiler uygun değildir** [RESMÎ]. |
| **Ücretli / kurumsal** | TikTok'un geliştirici API'leri için ücretli plan belgede yok. Marketing API reklam hesabıyla kullanılır. | Reklam yönetimi ve raporlaması (Marketing API) | Reklam harcaması dışında API ücreti belgede yok |
| **Resmî olmayan** | Hesap gerekmez ama ToS riski vardır | TikTokLive ve kardeş kütüphaneler (LIVE WebSocket olayları, canlı mı kontrolü), Euler Stream (ücretli, imzalama ve LIVE alarmı), web kazıma | Euler Stream: ücretsiz planda günde 2.500 istek ve 5 LIVE alarmı; 50 $/ay planda günde 10.000 istek ve 50 alarm [3. TARAF] |

## Kimlik doğrulama

- **Kullanıcı OAuth 2.0 (Login Kit)** [RESMÎ]
  - Yetkilendirme: `https://www.tiktok.com/v2/auth/authorize/?client_key=...&response_type=code&scope=user.info.basic,video.list&redirect_uri=...&state=...`. Eski `https://www.tiktok.com/auth/authorize/` adresinden geçiş isteniyor.
  - Redirect URI kuralları: en çok 10 adet, her biri 512 karakterden kısa, `https` ile başlar, sabittir (sorgu parametresi ve `#` parçası içermez).
  - Token: `POST https://open.tiktokapis.com/v2/oauth/token/` (code değişimi ve yenileme). İptal: `POST /v2/oauth/revoke/`.
  - Ömür: access token **24 saat**, refresh token **365 gün**. Yenileme yanıtında yeni bir refresh token gelebilir; geldiyse eskisinin yerine konur.
  - PKCE (`code_verifier`): belgeye göre **yalnızca mobil ve masaüstü** uygulamalarda zorunlu. Web için belge PKCE'den söz etmiyor; CSRF'e karşı `state` kullanılıyor.
- **Client access token (client credentials)**: Research API ve Commercial Content API, kullanıcı yerine istemci token'ı ile çalışır. Token 2 saatte bir yenilenir [RESMÎ].
- **Scope'lar** [RESMÎ]:
  - `user.info.basic`: open_id, avatar, görünen ad.
  - `user.info.profile`: biyografi, profil bağlantısı, doğrulanmış hesap durumu.
  - `user.info.stats`: beğeni, takipçi, takip ve video sayıları.
  - `video.list`: kullanıcının herkese açık videoları.
  - `video.publish`: doğrudan paylaşım.
  - `video.upload`: taslak olarak gönderme.
  - `portability.*`: veri taşınabilirliği.
  - `research.data.basic`: araştırma için herkese açık veri. `research.data.u18eu`: buna ek olarak AB'deki 18 yaş altı kullanıcıların verisi. `research.data.vra`: DSA kapsamındaki onaylı araştırmacılara (vetted researcher) sağlanan veri. `research.adlib.basic`: herkese açık ticari içerik (reklam) verisi.
- **Business API**: ayrı bir OAuth akışı vardır; Business Center'da uygulama oluşturulur ve reklamveren veya işletme hesabı yetkisi alınır [RESMÎ, ayrıntılar bu çalışmada doğrulanmadı].

## Temel uç noktalar

Taban adres: `https://open.tiktokapis.com`

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/v2/user/info/?fields=...` | Yetki veren kullanıcının profili (open_id, avatar_url, display_name, bio_description, profile_deep_link, istatistikler) | Geliştirici | 600 istek/dk [RESMÎ] |
| POST | `/v2/video/list/` | Yetki veren kullanıcının son videoları (cursor ile sayfalanır) | Geliştirici | 600 istek/dk. **Başka hesabın videolarını getirmez** [RESMÎ, 3. TARAF ile uyumlu] |
| POST | `/v2/video/query/` | Kullanıcının videolarını ID ile sorgular (meta veri, güncel embed/cover URL) | Geliştirici | 600 istek/dk [RESMÎ] |
| POST | `/v2/post/publish/creator_info/query/` | Paylaşım öncesi içerik üreticinin ayarlarını alır (gizlilik seçenekleri vb.) | Geliştirici + `video.publish` | [RESMÎ] |
| POST | `/v2/post/publish/video/init/` | Video paylaşımını başlatır (`FILE_UPLOAD` veya `PULL_FROM_URL`) | Denetimsizde özel, denetimden sonra herkese açık | İçerik üretici başına günde yaklaşık 15 paylaşım (tüm istemciler toplamı) [RESMÎ] |
| POST | `/v2/post/publish/inbox/video/init/` | Videoyu taslak olarak yükler; kullanıcı TikTok uygulamasında düzenleyip paylaşır | Geliştirici + `video.upload` | Fotoğraf için bunun yerine `/v2/post/publish/content/init/` kullanılır [RESMÎ] |
| POST | `/v2/post/publish/content/init/` | Fotoğraf paylaşımı | Aynı | [RESMÎ] |
| POST | `/v2/post/publish/status/fetch/` | Paylaşım durumunu sorgular | Aynı | [RESMÎ] |
| POST | `/v2/research/video/query/` | Herkese açık videoları arar: anahtar kelime, `region_code`, tarih aralığı, kullanıcı adı, hashtag, music ID, effect ID, video süresi | Araştırmacı | İstek başına en çok 100 kayıt; `cursor` ve `search_id` ile sayfalanır. Arşiv veridir: yeni video **48 saate kadar** gecikebilir, istatistikler 10 günde güncellenir [RESMÎ] |
| POST | `/v2/research/user/info/` | Kullanıcı adıyla herkese açık profil bilgisi | Araştırmacı | Çevrim içi veri, daha günceldir [RESMÎ] |
| POST | `/v2/research/video/comment/list/` | Bir videonun yorumları | Araştırmacı | `max_count` varsayılan 10, en çok 100 [RESMÎ] |
| POST | `/v2/research/user/followers/`, `/v2/research/user/following/` | Takipçi ve takip listeleri | Araştırmacı | `max_count` varsayılan 20, en çok 100. Günde 20.000 çağrı [RESMÎ] |
| POST | `/v2/research/user/liked_videos/`, `/pinned_videos/`, `/reposted_videos/` | Kullanıcının beğendiği, sabitlediği ve yeniden paylaştığı videolar | Araştırmacı | Beğenilenlerde `max_count` varsayılan 20, en çok 100; gizlenmiş/silinmiş videolar dönmeyebilir [RESMÎ] |
| — | Batch Compliance API'leri | Kullanıcı ID'lerinin uyum (compliance) durumunu toplu sorgular (16.05.2025'ten beri) | Araştırmacı | Uç nokta yolu bu çalışmada doğrulanmadı; Codebook'a bakın [RESMÎ: changelog] |
| POST | `/v2/research/adlib/ad/query/` | AB reklam kütüphanesinde arama (ülke, reklamveren, anahtar kelime) | Commercial Content | `max_count` varsayılan ve en çok 10 [RESMÎ] |
| GET | `https://www.tiktok.com/oembed?url=...` | Tek video için oEmbed | Herkese açık | [RESMÎ] |

Tam liste: [TikTok API Reference](https://developers.tiktok.com/doc/overview) ve [Research API Codebook](https://developers.tiktok.com/doc/research-api-codebook).

> Not: Yorum, takipçi/takip ve beğenilen/sabitlenen/yeniden paylaşılan video uç noktalarının yolları, metotları ve `max_count` değerleri resmî spesifikasyon sayfalarından doğrulandı [RESMÎ]. Takip listesi sayfasındaki curl örneği farklı bir host (`open-platform.tiktokapis.com`) gösteriyor; belgelenen adres `open.tiktokapis.com`.
>
> **Research API son değişiklikler** [RESMÎ: changelog]:
> - 26.04.2025: VCE Test Stage verisi yalnızca 25.000 ve üzeri takipçili hesaplarla sınırlandı.
> - 16.05.2025: Batch Compliance API'leri eklendi (kullanıcı ID'lerinin uyum durumu toplu sorgulanır).
> - 23.12.2025: AB DSA onaylı araştırmacılar (vetted researcher) için ayrı veri erişim başvurusu açıldı.
> - 26.02.2026: Veri hattı, For You akışına uygun olmayanlar dahil tüm herkese açık videoları kapsayacak biçimde genişletildi.
> - 21.05.2026: Video uç noktalarına (Query Videos ve beğenilen/sabitlenen/yeniden paylaşılan) `favorites_count` eklendi; yorumlara `display_name` döner.

## Gerçek zamanlı / bildirim

- **Webhooks (TikTok for Developers)** [RESMÎ]: Developer Portal'da callback URL ayarlanınca **varsayılan olarak tüm olaylara abone olunur** (Webhooks Events sayfası: "By default, you are subscribed to all events…"). Olaylar:
  - `authorization.removed`: kullanıcı uygulamanın yetkisini kaldırdı. Sebep alanı olur: bağlantıyı kesme, hesap silme, yaş değişikliği, ban veya geliştiricinin iptali.
  - `video.upload.failed`: video yüklemesi başarısız oldu.
  - `video.publish.completed`: video yayımlandı.
  - `portability.download.ready`: Data Portability talebi indirilmeye hazır.
  - Teslimat: HTTPS POST ile JSON gelir. Hemen **HTTP 200** dönülmelidir. Başarısız teslimat 72 saate kadar üstel geri çekilmeyle (exponential backoff) yeniden denenir. "En az bir kez" teslim edilir, bu yüzden işleme idempotent olmalıdır.
  - İmza: `TikTok-Signature: t=<zaman>,s=<imza>`. İmza, `client_secret` anahtarıyla `t + "." + ham_gövde` üzerinden alınan **HMAC-SHA256** değeridir. Tekrar saldırısına (replay) karşı zaman damgası da kontrol edilir.
  - Webhooks Events sayfasındaki bu 4 olay arasında **başka bir hesabın yeni gönderisi veya canlı yayın olayı yoktur**. Bu yüzden başka hesapları takip etmek için kullanılamaz.
- **Business API webhook'ları**: belgelenen örnekler reklam inceleme, lead formu, Creator Marketplace siparişi ve Business Messaging (DM) olaylarıdır [3. TARAF]. Organik yorum webhook'u resmî belgede **doğrulanamadı** [belgede bulunamadı].
- **WebSocket / streaming**: Resmî bir yol yok. LIVE "Webcast" WebSocket'i yalnızca resmî olmayan kütüphanelerle okunuyor [3. TARAF].
- **RSS / WebSub**: TikTok'un resmî RSS'i veya WebSub'ı yok [TAHMİN: belgede hiç geçmiyor]. RSSHub gibi üçüncü taraf köprüler kazıma yapar ve sık sık bozulur [3. TARAF].

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| **Kendi hesabımın** yeni videosu | Evet | Display API `/v2/video/list/` ile yoklama (polling) | Geliştirici | Webhook yok. Yayımlama kendi uygulamanızdan yapıldıysa `video.publish.completed` webhook'u gelir [RESMÎ] |
| **Başkasının** (izin vermemiş hesabın) yeni videosu | Resmî yoldan **pratikte hayır** | (a) Takip edilen kişi uygulamanıza Login Kit ile izin verirse Display API kullanılır. (b) Research API (yalnızca araştırmacılar, 48 saat gecikmeli). (c) Resmî olmayan kazıma. | Geliştirici (izinli), Araştırmacı veya Resmî olmayan | Display API'nin başka hesap verisi vermediği hem resmî belgeye hem 3. taraf kaynaklara göre tutarlı [RESMÎ/3. TARAF] |
| Canlı yayın başladı | Resmî: **hayır** | TikTokLive `is_live()`, TikTok-Live-Connector `fetchIsLive()` / `waitUntilLive()` (en az 30 sn aralık) veya Euler Stream "LIVE Alerts" | Resmî olmayan | "TikTok does not offer a public official API for livestream events" — TikTokLive README [3. TARAF] |
| Canlı yayın içi sohbet, hediye, beğeni, izleyici sayısı | Resmî: hayır | TikTokLive vb. ile Webcast WebSocket (`CommentEvent`, `GiftEvent`, `RoomUserSeqEvent`, `LiveEndEvent`...) | Resmî olmayan | Protokol habersiz değişebilir [3. TARAF] |
| Bir videonun yorumları | Sınırlı | Research API comment list (araştırmacı). Business API Accounts API ile **kendi işletme hesabının** yorum moderasyonu | Araştırmacı / İşletme | Business tarafında yorum uç noktaları bu çalışmada tek tek doğrulanmadı [RESMÎ genel tanım] |
| Anahtar kelime / hashtag ile filtreleme | Sınırlı | Research API video query (`keyword`, `hashtag_name`, `region_code`). Business **Mentions API** (marka ve ürün geçişleri), **Discovery API** (trend hashtag ve müzikler) | Araştırmacı / İşletme | Ticari ürün için Research API kullanılamaz [RESMÎ] |
| Profil istatistikleri (takipçi sayısı) | Kendi hesabı için evet | `user.info.stats` | Geliştirici | Başkası için Research API `user/info` gerekir |
| DM / mesaj | Yalnızca işletme | Business Messaging API (gerçek zamanlı mesaj, otomatik yanıt) | İşletme | Kişisel DM okumak için API yok. Data Portability ile kullanıcı kendi DM arşivini dışa aktarabilir [RESMÎ] |
| Reklamlar | Evet (AB) | Commercial Content API ad query | Araştırmacı/kamu | Reklam son gösterimden sonra 1 yıl erişilebilir [RESMÎ] |

**Pratik sonuç:** Herkese açık, gerçek zamanlı ve ToS'a uyumlu bir "X kişisi video paylaştı / canlıya geçti" takibi **resmî olarak yapılamaz**. Seçenekler şunlar:
1. Takip edilen içerik üreticiler uygulamanıza kendileri izin verir (Login Kit). Ajans ve içerik üretici paneli modeli böyle çalışır.
2. Resmî olmayan kütüphaneler veya ücretli üçüncü taraf hizmetler kullanılır; ToS riski üstlenilir.
3. Takip edilen kişi başka platformlarda (YouTube, X, Telegram) duyuru yapıyorsa oradan dolaylı takip edilir.

## Hız sınırları ve fiyatlar

| Kapsam | Limit | Kaynak |
|---|---|---|
| `/v2/user/info/`, `/v2/video/list/`, `/v2/video/query/` | 600 istek / 1 dk (kayan pencere). Aşılırsa HTTP 429 `rate_limit_exceeded` döner | [RESMÎ] |
| Content Posting, denetimsiz istemci | 24 saatte en çok 5 paylaşan kullanıcı. Hesap gizli olmalı, görünürlük yalnızca `SELF_ONLY` | [RESMÎ] |
| Content Posting, içerik üretici başına | 24 saatte yaklaşık 15 paylaşım (tüm API istemcileri toplamı) | [RESMÎ] |
| Content Posting, istemci başına | Audit başvurusundaki tahmine göre belirlenen günlük aktif içerik üretici tavanı | [RESMÎ] |
| Research API | Günde 1.000 istek ve 100.000 kayıt; takipçi/takip için günde 20.000 çağrı ve 2 milyon kayıt; VCE test aşamasında günde 5.000 kayıt; Test Stage verisi yalnızca 25.000+ takipçili hesapları kapsar (26.04.2025'ten beri). İstisna verilmez, artış talebi e-postayla iletilir | [RESMÎ] |
| Euler Stream (resmî değil) | Community 0 $: günde 2.500 istek, 25 WebSocket, 5 LIVE alarmı. Business 50 $/ay: günde 10.000 istek, 100 WebSocket, 50 alarm. Enterprise: teklif usulü | [3. TARAF], fiyatlar değişebilir |

TikTok for Developers ürünleri için ücret belgede geçmiyor [RESMÎ, belgede yok].

## Resmî olmayan yollar ve riskler

- **TikTokLive (Python)** — `pip install TikTokLive` [3. TARAF]
  - Nasıl çalışır: Bir izleyicinin tarayıcısının bağlandığı **Webcast WebSocket**'ine `@kullanici_adi` ile bağlanır; giriş gerekmez. Bağlantı URL'si bir **imzalama sunucusuyla** imzalanır. Varsayılan sunucu Euler Stream'dir ve `tiktok_sign_url` ile değiştirilebilir. Olaylar TikTokLiveProto şemasından üretilir; TikTok bir olayı şemadan kaldırırsa kütüphane de o olayı veremez.
  - Olaylar: `ConnectEvent`, `DisconnectEvent`, `LiveEndEvent`, `LivePauseEvent`, `FollowEvent`, `ShareEvent`, `CommentEvent`, `GiftEvent`, `LikeEvent`, `JoinEvent`, `RoomUserSeqEvent` (izleyici sayısı), battle, poll ve caption olayları vb.
  - `client.is_live()` ile canlı yayın kontrolü yapılır. README, canlı mı diye bakmak için bağlanmanın verimsiz olduğunu belirtiyor.
  - Lisans: değiştirilmiş AGPL-3.0. Ticari kapalı kaynak üründe kullanmadan önce lisansı okumak gerekir.
  - README açıkça "not a production-ready API" (üretim için hazır değil) der ve tersine mühendislik projesi olduğunu söyler.
- **Kardeş kütüphaneler** [3. TARAF]:
  - Node.js/TypeScript: **TikTok-Live-Connector** (`npm i tiktok-live-connector`). `fetchIsLive()` sırasıyla HTML kazıma, TikTok iç API'si ve Euler Stream'i dener. `waitUntilLive()` en az 30 saniyede bir yoklar.
  - Java: TikTok-Live-Java.
  - C#/.NET/Unity: **TikTokLiveSharp** (README'de v1.2.2; NuGet: `TikTokLive_Sharp` [TAHMİN: rozet bağlantısından]).
  - Go: gotiktoklive. Rust: TikTokLiveRust.
- **Euler Stream**: Ücretli üçüncü taraf hizmettir. İmzalama, yönetilen LIVE WebSocket API'si, "TikTok LIVE Alerts" (yayın başlayınca bildirim) ve CAPTCHA çözme rotaları sunar. TikTok ile resmî bir ilişkisi yoktur [3. TARAF].
- **Web kazıma** (TikTokApi/Playwright, Apify ve benzeri scraper hizmetleri): profil sayfasının ya da iç `api/post/item_list` çağrılarının kazınmasıdır. Sık sık bozulur ve CAPTCHA ile bot tespitine takılır [3. TARAF].
- **Riskler (nesnel)**:
  - **ToS**: TikTok ABD Hizmet Şartları 3.4 maddesi, "TikTok USDS Joint Venture'ın yazılı onayı olmadan" herhangi bir otomatik sistem veya bot ile platformdan veri **kazımayı, taramayı, dışa aktarmayı** ve platformu **tersine mühendislikle çözmeyi** yasaklar [RESMÎ]. Diğer bölgelerin şartları da benzer [TAHMİN: yalnızca ABD metni okundu].
  - **Hesap/IP engeli**: Oturum çerezi kullanan işlemler (sohbete mesaj gönderme vb.) hesabın kısıtlanmasına yol açabilir. TikTok-Live-Connector, `authenticateWs` seçeneğinin oturum çerezini **üçüncü taraf imzalama sunucusuna gönderdiğini** belirtiyor; bu bir güvenlik riskidir [3. TARAF].
  - **Kırılganlık**: Protokol ve imza algoritması habersiz değişir; ücretsiz imzalama hizmetlerinin limitleri vardır [3. TARAF].
  - **Kişisel veri (KVKK/GDPR)**: Yorum ve izleyici adlarını toplayıp saklamak, kişisel veri işleme sayılır. Aydınlatma, saklama süresi ve amaçla sınırlılık yükümlülükleri doğar [TAHMİN: genel hukuk ilkesi, avukat görüşü değildir].
  - **Ticari kullanım**: Research API verisini ticari üründe kullanmak şartlara aykırıdır [RESMÎ].

## SDK ve kütüphaneler

| Ad | Dil | Tür | Not |
|---|---|---|---|
| TikTok OpenSDK (iOS/Android) | Swift/Kotlin | Resmî | Login Kit ve Share Kit mobil SDK'ları [RESMÎ] |
| Login Kit for Web / Desktop | HTTP | Resmî | Yalnızca REST; resmî .NET SDK'sı **yok** [TAHMİN: belgede .NET SDK geçmiyor] |
| `tiktok-business-api-sdk-official` | Python (ayrıca Java/JS) | Resmî (Business API) | Marketing API v1.3 için [3. TARAF: PyPI] |
| TikTokLive | Python | Resmî değil | LIVE olayları |
| TikTok-Live-Connector | Node/TS | Resmî değil | LIVE olayları, `fetchIsLive` |
| TikTokLiveSharp | C#/.NET/Unity | Resmî değil | LIVE olayları |
| TikTok-Live-Java, gotiktoklive, TikTokLiveRust | Java/Go/Rust | Resmî değil | LIVE olayları |
| .NET için OAuth | C# | Genel | `AspNet.Security.OAuth.TikTok` (aspnet-contrib) ile ASP.NET Core'da Login Kit [3. TARAF; güncel sürüm doğrulanmadı] |

## Postman / OpenAPI / koleksiyonlar

- TikTok for Developers için resmî bir OpenAPI/Swagger dosyası belgede **bulunamadı** [belgede yok].
- TikTok API for Business'ın Postman ortamında resmî koleksiyonları var [TAHMİN: Postman Public API Network'te "TikTok API for Business" çalışma alanı biliniyor; bu çalışmada doğrulanmadı].
- Research API için örnek istekler Codebook ve "Getting Started" sayfalarında curl biçiminde veriliyor [RESMÎ].

## Depoda ilgili sayfalar

- [Sosyal medya API'leri klasörü](./) — Aynı klasördeki diğer platformlar: YouTube, Twitch, Kick, Instagram vb. (aynı şablonla hazırlanır).
- [Rehberler/YouTube-Oyun](../../Rehberler/YouTube-Oyun/) — YouTube'da oyun ve kanal araştırması. Canlı yayın ve içerik üretici konularıyla ilgili.
- [Rehberler/Mesajlasma-Altyapilari](../../Rehberler/Mesajlasma-Altyapilari/) — Telegram, WhatsApp, BiP ve SMS API'leri. Takip uygulamasında bildirim göndermek için kullanılabilir.
- [Programlama/Python](../../Programlama/Python/) ve [Programlama/CSharp-DotNet](../../Programlama/CSharp-DotNet/) — TikTokLive ve TikTokLiveSharp denemeleri yapılırsa buraya konur.

## Kaynaklar

**Resmî**
- [TikTok for Developers — Docs Overview](https://developers.tiktok.com/doc/overview) — Tüm ürünlerin listesi (erişim: 15 Ekim 2026)
- [Login Kit for Web](https://developers.tiktok.com/doc/login-kit-web) — Yetkilendirme URL'si, parametreler, redirect URI kuralları (erişim: 15 Ekim 2026)
- [OAuth User Access Token Management](https://developers.tiktok.com/doc/oauth-user-access-token-management) — Token uç noktası, 24 saat / 365 gün ömür, PKCE (erişim: 15 Ekim 2026)
- [Scopes Reference](https://developers.tiktok.com/doc/tiktok-api-scopes) — Tüm scope'lar (erişim: 15 Ekim 2026)
- [Display API Overview](https://developers.tiktok.com/doc/display-api-overview) — user/info, video/list, video/query (erişim: 15 Ekim 2026)
- [API v2 Rate Limits](https://developers.tiktok.com/doc/tiktok-api-v2-rate-limit) — 600 istek/dk kayan pencere (erişim: 15 Ekim 2026)
- [Content Posting API — Get Started](https://developers.tiktok.com/doc/content-posting-api-get-started) — Direct Post uç noktaları ve audit (erişim: 15 Ekim 2026)
- [Content Sharing Guidelines](https://developers.tiktok.com/doc/content-sharing-guidelines) — Denetimsiz istemci limitleri, günlük paylaşım tavanı (erişim: 15 Ekim 2026)
- [Webhooks Overview](https://developers.tiktok.com/doc/webhooks-overview) · [Events](https://developers.tiktok.com/doc/webhooks-events) · [Verification](https://developers.tiktok.com/doc/webhooks-verification) — Olaylar, yeniden deneme, HMAC-SHA256 imza (erişim: 15 Ekim 2026)
- [Embed Videos (oEmbed)](https://developers.tiktok.com/doc/embed-videos) — Kimliksiz tek video bilgisi (erişim: 15 Ekim 2026)
- [Research API ürün sayfası](https://developers.tiktok.com/products/research-api) — Uygunluk şartları, veri türleri, VCE (erişim: 15 Ekim 2026)
- [Research API — Getting Started](https://developers.tiktok.com/doc/research-api-get-started) — video/query ve user/info örnekleri (erişim: 15 Ekim 2026)
- [Research API FAQ](https://developers.tiktok.com/doc/research-api-faq) — Kotalar, veri tazeliği, uygunluk (erişim: 15 Ekim 2026)
- [About Research Tools](https://developers.tiktok.com/doc/about-research-api/) — DSA onaylı araştırmacı (vetted researcher) ve DSC (erişim: 15 Ekim 2026)
- Research API spesifikasyonları: [Query Video Comments](https://developers.tiktok.com/doc/research-api-specs-query-video-comments) · [User Followers](https://developers.tiktok.com/doc/research-api-specs-query-user-followers) · [User Following](https://developers.tiktok.com/doc/research-api-specs-query-user-following) · [Liked Videos](https://developers.tiktok.com/doc/research-api-specs-query-user-liked-videos) · [Pinned Videos](https://developers.tiktok.com/doc/research-api-specs-query-user-pinned-videos) · [Reposted Videos](https://developers.tiktok.com/doc/research-api-specs-query-user-reposted-videos) — Yollar, metotlar, `max_count` (erişim: 15 Ekim 2026)
- [Commercial Content API — Query Ads](https://developers.tiktok.com/doc/commercial-content-api-query-ads) — `max_count` varsayılan ve en çok 10 (erişim: 15 Ekim 2026)
- [Content Posting API — Upload Video (taslak)](https://developers.tiktok.com/doc/content-posting-api-reference-upload-video) — `/v2/post/publish/inbox/video/init/`, `video.upload` (erişim: 15 Ekim 2026)
- [TikTok for Developers Changelog](https://developers.tiktok.com/doc/changelog) — 2025–2026 Research Tools değişiklikleri (erişim: 15 Ekim 2026)
- [Commercial Content API ürün sayfası](https://developers.tiktok.com/products/commercial-content-api) · [Getting Started](https://developers.tiktok.com/doc/commercial-content-api-getting-started) — AB reklam kütüphanesi (erişim: 15 Ekim 2026)
- [About API for Business](https://ads.tiktok.com/help/article/marketing-api?lang=en) — Marketing, Organic (Accounts, Mentions, TTO, Discovery, Spark Ads Recommendation) ve Business Messaging API (erişim: 15 Ekim 2026)
- [TikTok API for Business Portal](https://business-api.tiktok.com/portal/docs) — Business API belgeleri, v1.3 (erişim: 15 Ekim 2026)
- [TikTok Terms of Service (ABD)](https://www.tiktok.com/legal/page/us/terms-of-service/en) — 3.4 maddesi: kazıma ve tersine mühendislik yasağı (erişim: 15 Ekim 2026)

**Üçüncü taraf**
- [TikTokLive (GitHub)](https://github.com/isaackogan/TikTokLive) — Python LIVE istemcisi, olay listesi, uyarılar (erişim: 15 Ekim 2026)
- [TikTok-Live-Connector (GitHub)](https://github.com/zerodytrash/TikTok-Live-Connector) — Node.js LIVE istemcisi, `fetchIsLive` / `waitUntilLive` (erişim: 15 Ekim 2026)
- [TikTokLiveSharp (GitHub)](https://github.com/frankvHoof93/TikTokLiveSharp) — C#/.NET/Unity LIVE istemcisi (erişim: 15 Ekim 2026)
- [Euler Stream Pricing](https://www.eulerstream.com/pricing) — İmzalama, LIVE WebSocket ve LIVE alarm fiyatları (erişim: 15 Ekim 2026)
- [tiktok-business-api-sdk-official (PyPI)](https://pypi.org/project/tiktok-business-api-sdk-official/1.0.0) — Business API Python SDK'sı (erişim: 15 Ekim 2026)
