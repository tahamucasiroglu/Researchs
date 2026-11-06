# TikTok API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 6 Kasım 2026 · Durum: **kısıtlı** (resmî API var ama başkasının hesabını izlemeye izin vermiyor; LIVE için resmî API yok)
>
> 6 Kasım 2026 doğrulaması: TikTok API for Business (Marketing API) bilgileri resmî portaldan yeniden kontrol edildi ve ayrı bölümde toplandı. TikTok for Developers tarafında Login Kit token ömürleri ve yenileme kuralı (OAuth sayfaları 5 Kasım 2026'da değişti), v2 hız sınırı, webhook olayları ve imzası, paylaşım sınırları ve Research API kotaları da aynı gün kontrol edildi; diğer bölümler (Research API uç noktaları, resmî olmayan yollar) 15 Ekim 2026 doğrulamasına dayanır.

## Özet

TikTok iki ayrı geliştirici portalı sunar: **TikTok for Developers** (`developers.tiktok.com`; Login Kit, Display API, Content Posting API, Share Kit, Data Portability, Embed, Research API, Commercial Content API, Webhooks) ve **TikTok API for Business** (`business-api.tiktok.com`; Marketing API, Organic API, Business Messaging API). Geliştirici API'leri büyük ölçüde **yalnızca oturum açıp izin veren kullanıcının kendi verisini** okur/yazar. Başka hesapların herkese açık içeriğini sorgulamak için tek resmî yol, yalnızca akademik/kâr amacı gütmeyen araştırmacılara açık olan **Research API**'dir. Belgelerde geliştirici API'leri için bir ücret geçmiyor [RESMÎ — ücret bilgisi belgede yok]. Bir kanalın canlı yayına geçmesini ya da yayın içi olayları (sohbet, hediye) bildiren resmî bir API yoktur. Bu iş topluluğun tersine mühendislik kütüphaneleriyle (TikTokLive vb.) ve ücretli üçüncü taraf hizmetlerle (Euler Stream) yapılır [3. TARAF]. Reklam tarafındaki API for Business yalnız şirketlere açıktır (kurumsal e-posta ve şirket web sitesi istenir, bireysel geliştirici kabul edilmez); kaydı, OAuth akışı ve hız sınırları aşağıda ayrı bölümde anlatılır [RESMÎ].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Herkese açık (kimliksiz)** | Hiçbir şey | oEmbed (`https://www.tiktok.com/oembed?url=<video URL>`): tek bir videonun başlığı, yazar adı, küçük resmi ve embed HTML'i [RESMÎ]. Embed Creator Profiles (profil gömme) [RESMÎ]. | Belgede limit yok. Liste ya da arama yapılamaz; yalnızca URL'si bilinen video sorgulanır. |
| **Geliştirici hesabı / uygulama** | developers.tiktok.com hesabı, uygulama kaydı, `client_key` ve `client_secret` | Login Kit (OAuth 2.0), Display API (`user.info.*`, `video.list`), Content Posting API (sandbox ya da denetimsiz kullanımda yalnızca özel paylaşım), Share Kit, Data Portability [RESMÎ] | Ücret belgede yok. Uç nokta başına 600 istek/dk, kayan pencere (bkz. Hız sınırları) [RESMÎ]. Limitin kullanıcı mı uygulama mı bazında işlediği belgede belirtilmiyor. |
| **İşletme / uygulama onayı** | TikTok for Developers: **App Review** (scope onayı) ve Content Posting için ayrıca **audit** (ToS uyum denetimi) [RESMÎ]. TikTok API for Business: şirket olarak geliştirici kaydı (kurumsal alan adlı e-posta ve şirket web sitesi; bireysel geliştirici kabul edilmiyor; sonuç 3 iş gününde) ve geliştirici uygulaması incelemesi (2–3 iş günü) [RESMÎ] | Herkese açık Direct Post, daha çok kullanıcı. API for Business: Marketing API (yetki veren reklam hesaplarında kampanya, rapor, Events API, webhook), Organic API (Accounts, Mentions, TTO, Discovery, Spark Ads Recommendation; "TikTok Accounts" izni için 20 Mart 2026'dan beri ek başvuru formu) ve Business Messaging API (ayrı veri güvenliği incelemesi; AEA, İsviçre ve Birleşik Krallık hesaplarında yok) [RESMÎ] | Denetimsiz istemci: 24 saatte en çok 5 kullanıcı, yalnızca `SELF_ONLY` görünürlük [RESMÎ]. API for Business: Basic seviyede uygulama başına 10 QPS / 600 QPM / 864.000 QPD (aşağıda) [RESMÎ] |
| **Araştırmacı (özel başvuru)** | Research API: ABD, AEA, Birleşik Krallık, Kanada veya İsviçre'de akademik kurum; AB'de bağımsız kâr amacı gütmeyen araştırma kuruluşu (beta); çevrim içi çocuk güvenliği çalışan Brezilyalı akademik veya kâr amacı gütmeyen kurumlar. Proje önerisi, finansman beyanı, etik kurul onayı gerekir; doktora öğrencisi danışman mektubu sunar [RESMÎ]. Akademik olmayan, kâr amacı gütmeyen kuruluşlar da sınırlı koşullarla VCE (Virtual Compute Environment) üzerinden erişebilir [RESMÎ]. **AB DSA onaylı araştırmacı (vetted researcher)**: bir Dijital Hizmetler Koordinatörü'nün (DSC) verdiği onaylı araştırmacı statüsüyle, Research API başvurusundan ayrı bir veri erişim başvurusu yapılır (23.12.2025'ten beri). Bu yol, AB'deki sistemik riskler üzerine araştırma içindir; scope'u `research.data.vra` [RESMÎ]. Commercial Content API: kurumsal e-postalı geliştirici hesabı ve başvuru formu; araştırmacı her ülkeden olabilir; onay genelde 2 iş günü sürer [RESMÎ]. | Research API: herkese açık videolar, yorumlar, kullanıcı profilleri, takipçi ve takip listeleri, beğenilen, sabitlenen ve yeniden paylaşılan videolar, AB TikTok Shop verisi. Commercial Content API: reklam kütüphanesi (şimdilik yalnızca AB reklamları) | Research API: günde 1.000 istek ve 100.000 kayıt. Takipçi/takip listelerinde günde 20.000 çağrı ve 2 milyon kayıt. Kota 00:00 UTC'de sıfırlanır [RESMÎ]. Ücret belgede yok. **Ticari kullanım ve içerik üreticiler uygun değildir** [RESMÎ]. |
| **Ücretli / kurumsal** | TikTok'un geliştirici API'leri için ücretli plan belgede yok. Marketing API, yetki veren reklamverenin reklam hesabıyla kullanılır; harcama o hesaptan ödenir. | Reklam yönetimi ve raporlaması (Marketing API) | Reklam harcaması dışında API ücreti belgede yok; hız seviyesi ücretle değil gerekçeli başvuruyla yükseltilir [RESMÎ] |
| **Resmî olmayan** | Hesap gerekmez ama ToS riski vardır | TikTokLive ve kardeş kütüphaneler (LIVE WebSocket olayları, canlı mı kontrolü), Euler Stream (ücretli, imzalama ve LIVE alarmı), web kazıma | Euler Stream: ücretsiz planda günde 2.500 istek ve 5 LIVE alarmı; 50 $/ay planda günde 10.000 istek ve 50 alarm [3. TARAF] |

## Kimlik doğrulama

- **Kullanıcı OAuth 2.0 (Login Kit)** [RESMÎ]
  - Yetkilendirme: `https://www.tiktok.com/v2/auth/authorize/?client_key=...&response_type=code&scope=user.info.basic,video.list&redirect_uri=...&state=...`. Eski `https://www.tiktok.com/auth/authorize/` adresinden geçiş isteniyor.
  - Redirect URI kuralları: en çok 10 adet, her biri 512 karakterden kısa, `https` ile başlar, sabittir (sorgu parametresi ve `#` parçası içermez).
  - Token: `POST https://open.tiktokapis.com/v2/oauth/token/` (code değişimi ve yenileme). İptal: `POST /v2/oauth/revoke/`.
  - Ömür (5 Kasım 2026'da güncellenen belgeye göre): access token **2 saat**, refresh token ilk verilişinden (initial issuance) itibaren **180 gün**. 15 Ekim 2026 doğrulamasında belge 24 saat / 365 gün diyordu. *Refresh a User Access Token* sayfasındaki başarılı örnek yanıt ise hâlâ `expires_in: 86400` ve `refresh_expires_in: 31536000` (24 saat / 365 gün) gösteriyor [ÇELİŞKİLİ — metin ile örnek uyuşmuyor]. Belge süreleri sabit kodlamak yerine yanıttaki `expires_in` ve `refresh_expires_in` değerlerine göre yenileme planlanmasını istiyor.
  - Refresh token **döndürülür** (rotation): her başarılı yenileme yeni bir `refresh_token` verir ve eskisi hemen geçersizleşir. Saklanan değer her yenilemede değiştirilir; eskisiyle denenirse yenileme başarısız olur ve kullanıcının yeniden yetki vermesi gerekir.
  - PKCE (`code_verifier`): belgeye göre **yalnızca mobil ve masaüstü** uygulamalarda zorunlu. Web için belge PKCE'den söz etmiyor; CSRF'e karşı `state` kullanılıyor.
- **Client access token (client credentials)**: Research API ve Commercial Content API, kullanıcı yerine istemci token'ı ile çalışır (`grant_type=client_credentials`, aynı `/v2/oauth/token/` uç noktası). Token 2 saat (7.200 sn) geçerlidir; refresh token yoktur, süresi bitince uç nokta yeniden çağrılır [RESMÎ].
- **Scope'lar** [RESMÎ]:
  - `user.info.basic`: open_id, avatar, görünen ad.
  - `user.info.profile`: biyografi, profil bağlantısı, doğrulanmış hesap durumu.
  - `user.info.stats`: beğeni, takipçi, takip ve video sayıları.
  - `video.list`: kullanıcının herkese açık videoları.
  - `video.publish`: doğrudan paylaşım.
  - `video.upload`: taslak olarak gönderme.
  - `portability.*`: veri taşınabilirliği.
  - `research.data.basic`: araştırma için herkese açık veri. `research.data.u18eu`: buna ek olarak AB'deki 18 yaş altı kullanıcıların verisi. `research.data.vra`: DSA kapsamındaki onaylı araştırmacılara (vetted researcher) sağlanan veri. `research.adlib.basic`: herkese açık ticari içerik (reklam) verisi.
- **TikTok API for Business** [RESMÎ]: Geliştirici uygulaması Business Center'da değil, TikTok for Business Developers portalında (**My Apps**) oluşturulur. Reklamveren uygulamanın *Advertiser authorization URL*'sini açıp izinleri onaylar ve e-postasına gelen kodla kimliğini doğrular. `auth_code` redirect URL'ye eklenir (1 saat, tek kullanımlık). `POST /open_api/v1.3/oauth2/access_token/` (`app_id`, `secret`, `auth_code`) ile **süresi dolmayan** bir reklamveren token'ı alınır. Organik Accounts API'de ise `auth_code` 10 dakika, access token 1 gün, refresh token 1 yıl geçerlidir. Ayrıntı aşağıdaki API for Business bölümünde.

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
- **API for Business webhook'ları** [RESMÎ]: reklam hesabı aboneliği (`/subscription/subscribe/`: lead, reklam inceleme durumu, kreatif yorgunluğu, rapor metriği değişikliği, hesabın askıya alınması, TTO video bağlama, API servis durumu); Accounts API'de **kendi işletme hesabın** için `post.publish.*` ve `comment.update` (gönderilerine gelen yorum ve yanıtlar; 5 dakika içinde; `comment.list` izni); Business Messaging DM olayları. Hepsi yalnız yetki veren hesaplar içindir; başka hesabın içeriği için webhook yoktur. Ayrıntı aşağıdaki API for Business bölümünde.
- **WebSocket / streaming**: Resmî bir yol yok. LIVE "Webcast" WebSocket'i yalnızca resmî olmayan kütüphanelerle okunuyor [3. TARAF].
- **RSS / WebSub**: TikTok'un resmî RSS'i veya WebSub'ı yok [TAHMİN: belgede hiç geçmiyor]. RSSHub gibi üçüncü taraf köprüler kazıma yapar ve sık sık bozulur [3. TARAF].

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| **Kendi hesabımın** yeni videosu | Evet | Display API `/v2/video/list/` ile yoklama (polling) | Geliştirici | Webhook yok. Yayımlama kendi uygulamanızdan yapıldıysa `video.publish.completed` webhook'u gelir [RESMÎ] |
| **Başkasının** (izin vermemiş hesabın) yeni videosu | Resmî yoldan **pratikte hayır** | (a) Takip edilen kişi uygulamanıza Login Kit ile izin verirse Display API kullanılır. (b) Research API (yalnızca araştırmacılar, 48 saat gecikmeli). (c) Resmî olmayan kazıma. | Geliştirici (izinli), Araştırmacı veya Resmî olmayan | Display API'nin başka hesap verisi vermediği hem resmî belgeye hem 3. taraf kaynaklara göre tutarlı [RESMÎ/3. TARAF] |
| Canlı yayın başladı | Resmî: **hayır** | TikTokLive `is_live()`, TikTok-Live-Connector `fetchIsLive()` / `waitUntilLive()` (en az 30 sn aralık) veya Euler Stream "LIVE Alerts" | Resmî olmayan | "TikTok does not offer a public official API for livestream events" — TikTokLive README [3. TARAF] |
| Canlı yayın içi sohbet, hediye, beğeni, izleyici sayısı | Resmî: hayır | TikTokLive vb. ile Webcast WebSocket (`CommentEvent`, `GiftEvent`, `RoomUserSeqEvent`, `LiveEndEvent`...) | Resmî olmayan | Protokol habersiz değişebilir [3. TARAF] |
| Bir videonun yorumları | Sınırlı | Research API comment list (araştırmacı). **Kendi işletme hesabın** için Accounts API: `comment.update` webhook'u (5 dakika içinde) ya da `/business/comment/list/` yoklaması | Araştırmacı / İşletme (Accounts API izni + ek başvuru formu) | Başka hesabın yorumları için API for Business yolu yok [RESMÎ] |
| Anahtar kelime / hashtag ile filtreleme | Sınırlı | Research API video query (`keyword`, `hashtag_name`, `region_code`). Business **Mentions API** (marka ve ürün geçişleri), **Discovery API** (trend hashtag ve müzikler) | Araştırmacı / İşletme | Ticari ürün için Research API kullanılamaz [RESMÎ] |
| Profil istatistikleri (takipçi sayısı) | Kendi hesabı için evet | `user.info.stats` | Geliştirici | Başkası için Research API `user/info` gerekir |
| DM / mesaj | Yalnızca işletme | Business Messaging API (gerçek zamanlı mesaj, otomatik yanıt) | İşletme | Kişisel DM okumak için API yok. Data Portability ile kullanıcı kendi DM arşivini dışa aktarabilir [RESMÎ] |
| Reklamlar | Evet (AB) | Commercial Content API ad query | Araştırmacı/kamu | Reklam son gösterimden sonra 1 yıl erişilebilir [RESMÎ] |
| Kendi reklamının inceleme (onay/ret) durumu, lead'ler, hesabın askıya alınması | Evet (push) | API for Business reklam hesabı webhook'u (`/subscription/subscribe/`) | İşletme (Marketing API) | Yalnız yetki veren reklam hesapları; askıya alma bildirimi allowlist ister (TikTok temsilcisi) [RESMÎ] |

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
| TikTok API for Business (uygulama düzeyi) | Basic 10 QPS / 600 QPM / 864.000 QPD'den Ultimate 50 QPS / 3.000 QPM / 4.320.000 QPD'ye dört seviye; aşılınca `code: 40100`. Ayrıntı aşağıdaki API for Business bölümünde | [RESMÎ] |
| Euler Stream (resmî değil) | Community 0 $: günde 2.500 istek, 25 WebSocket, 5 LIVE alarmı. Business 50 $/ay: günde 10.000 istek, 100 WebSocket, 50 alarm. Enterprise: teklif usulü | [3. TARAF], fiyatlar değişebilir |

TikTok for Developers ürünleri ve API for Business için API ücreti belgede geçmiyor; reklam tarafında ödenen yalnız reklam harcamasıdır [RESMÎ, belgede yok].

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
| TikTok Business API SDK (GitHub `tiktok/tiktok-business-api-sdk`; PyPI `tiktok-business-api-sdk-official`) | Python, JavaScript, Java | Resmî (API for Business) | Marketing API v1.3; API for Business belgesi bu depoya bağlantı veriyor, MIT lisanslı [RESMÎ]. PyPI'de son sürüm 1.1.3 (27.02.2026) [3. TARAF: PyPI] |
| TikTokLive | Python | Resmî değil | LIVE olayları |
| TikTok-Live-Connector | Node/TS | Resmî değil | LIVE olayları, `fetchIsLive` |
| TikTokLiveSharp | C#/.NET/Unity | Resmî değil | LIVE olayları |
| TikTok-Live-Java, gotiktoklive, TikTokLiveRust | Java/Go/Rust | Resmî değil | LIVE olayları |
| .NET için OAuth | C# | Genel | `AspNet.Security.OAuth.TikTok` (aspnet-contrib) ile ASP.NET Core'da Login Kit [3. TARAF; güncel sürüm doğrulanmadı] |
| API for Business için .NET | C# | Resmî SDK **yok** | Resmî SDK yalnız Python, JavaScript ve Java [RESMÎ]; `HttpClient` ile REST çağrısı ve `Access-Token` başlığı [TAHMİN]. NuGet'teki `TikTok.Marketing.Api.Sdk` (1.0.1, 10.06.2021) açıklaması ve proje adresi olmayan bir paket; kaynağı belirsiz olduğu için önerilmez [3. TARAF: NuGet] |

## Postman / OpenAPI / koleksiyonlar

- TikTok for Developers için resmî bir OpenAPI/Swagger dosyası belgede **bulunamadı** [belgede yok].
- **TikTok API for Business** için resmî Postman koleksiyonu var: `tiktok` hesabının *TikTok API For Business* çalışma alanındaki [TikTok Business API V1.3](https://tiktok.postman.co/workspace/TikTok-API-For-Business~cf223b0e-a943-4e26-8443-b8618153a70a/collection/33151601-6700a660-d048-429b-9626-500e2f29b7a4?action=share&creator=33151601) koleksiyonu. API for Business belgesi bu koleksiyona bağlantı veriyor ve tüm uç noktaları içermediğini belirtiyor [RESMÎ]. Postman kaydına göre son güncelleme 22.05.2025 [3. TARAF: Postman]. API for Business için resmî bir OpenAPI dosyası bu çalışmada bulunamadı.
- Research API için örnek istekler Codebook ve "Getting Started" sayfalarında curl biçiminde veriliyor [RESMÎ].

## TikTok API for Business (Marketing API v1.3)

> Bu bölüm 6 Kasım 2026'da resmî TikTok API for Business belgelerinden (`business-api.tiktok.com/portal/docs`) doğrulandı. Bu portal TikTok for Developers'tan (`developers.tiktok.com`) ayrıdır: ayrı hesap, ayrı geliştirici uygulaması (`app_id` + `secret`), ayrı token ve ayrı hız sınırları. Reklam vermek (kendi ürününü tanıtmak) ve yetki veren reklam hesaplarını yönetmek içindir; başka hesapların içeriğini izlemek için kullanılamaz.

### Kapsam, sürüm, hesap yapısı

- Üç API ailesi [RESMÎ]: **Marketing API** (TikTok Ads Manager işlevleri ölçekli: Business Center, kampanya yönetimi, kreatif ve katalog, kitle, otomatik kurallar, webhook, raporlama, Events API ile ölçüm), **Organic API** (Accounts, Mentions, TikTok One (TTO), Discovery, Spark Ads Recommendation) ve **Business Messaging API**.
- Güncel sürüm **v1.3** (15 Ağustos 2022'den beri; bitiş tarihi belirlenmedi); v1.2, 15 Ağustos 2023'te kapandı. Kırıcı değişiklikler yalnız yeni sürümde yapılır; geçiş süresi bitince eski sürüme yapılan çağrılar başarısız olur. Yenilikler v1.3 içinde "What's New" sayfasında duyurulur. [RESMÎ]
- İstek adresi biçimi `https://business-api.tiktok.com/open_api/v1.3/<uç nokta>/`; token `Access-Token` başlığıyla gönderilir. [RESMÎ]
- Bir geliştirici hesabı en çok **5 geliştirici uygulaması** açabilir; uygulamalarla reklam hesapları (advertiser) arasında çoktan çoğa ilişki vardır. Ajans Business Center'ları API ile reklam hesabı açıp düzenleyebilir. [RESMÎ]

### Geliştirici kaydı ve onay süreleri

| Adım | Ne istenir | Süre |
|---|---|---|
| 1. TikTok for Business hesabı | Portalda e-posta ya da telefonla kayıt | Anında |
| 2. Geliştirici kaydı (*Become a Developer*) | Ad; **şirket alan adlı** iletişim e-postası (kişisel ya da geçici e-posta reddedilir); kullanıcı türü (Technology Company, Direct Advertiser, Agency); geçerli marka ya da tüzel kişi adı; herkese açık, şirkete ait alan adında **şirket web sitesi** (sosyal medya, barındırma ya da e-ticaret platformu alan adı, kısaltılmış bağlantı ve kişisel site kabul edilmez); birincil geliştirici konumu; TikTok verisini ve API'yi nasıl kullanacağının ayrıntılı açıklaması. Belgeye göre şu anda kişisel hesaplar ve bireysel geliştiriciler kabul edilmiyor | Sonuç **3 iş günü** içinde bildirilir |
| 3. Geliştirici uygulaması (*Create an App*) | Uygulama adı ve açıklaması (kullanım amaçları, gereken izinler, erişimin yalnız kurum içi mi yoksa dış hesaplara da mı açık olduğu); **advertiser redirect URL** (en çok 10 adres); **scope of permission** (uç nokta başına gereken izin API Reference tablosunda). "TikTok Accounts" izni için 20 Mart 2026'dan beri ayrıca *Accounts API Access Application Form* doldurulur | İnceleme **2–3 iş günü**; reddedilirse düzenlenip yeniden gönderilir |
| İzin (scope) genişletme | My Apps → Scope of permission; gerekçe | 2–3 iş günü |
| Hız seviyesi yükseltme | My Apps → App Detail → Authorization; gerekçe; her seferinde bir seviye | Belgede süre yok |
| Business Messaging API erişimi | Ayrı veri güvenliği ve gizlilik incelemesi (ABD hesapları için ayrıca ABD veri güvenliği incelemesi ve USDS eki); AEA, İsviçre ve Birleşik Krallık hesaplarında kullanılamaz | İnceleme başvurudan sonraki 10 iş günü içinde başlar |

Kaynak: Register as a developer, Create a developer app, App permissions, Rate limits ve Access to Business Messaging API sayfaları. [RESMÎ]

- **Toplam süre**: belgeye göre kayıt ve uygulama incelemesi birlikte yaklaşık 5–6 iş günü (3 + 2–3), yani takvimde kabaca 1–1,5 hafta; ret ve yeniden gönderimde uzar. [TAHMİN — resmî sürelerin toplamı] `developers.tiktok.com` SSS'sindeki "birkaç gün ile iki hafta" ifadesi TikTok for Developers uygulamaları içindir; aynı SSS reklam API'leri için TikTok for Business'a yönlendiriyor. [RESMÎ]
- **Test**: sandbox reklam hesapları (`https://sandbox-ads.tiktok.com/open_api`, sahte rapor verisi, uç nokta başına 1 QPS / 30 QPM / 1.000 QPD) **1 Aralık 2026'ya kadar kaldırılacak** ("will be deprecated by December 1st, 2026"); TikTok üretimde ayrı bir test hesabı açmayı öneriyor. [RESMÎ]

**Durum → yol** (dayanak [RESMÎ]; öneri [TAHMİN]):

| Durum | Yol |
|---|---|
| Şirketin var (kurumsal e-posta, şirket sitesi), kendi ürününü ya da uygulamanı tanıtacaksın | *Direct Advertiser* olarak kayıt + tek geliştirici uygulaması; kendi reklam hesabına kendin yetki verirsin |
| Bireysel geliştiricisin ya da şirketin yok | Marketing API kaydı fiilen kapalı. Seçenekler: TikTok Ads Manager arayüzü ya da geliştirici kaydı istemeyen TikTok for Business MCP Server (aşağıda) |
| Ajans ya da SaaS (başkalarının reklam hesapları) | *Agency* ya da *Technology Company* kaydı; her reklamveren kendi yetkisini verir; yoğun kullanımda hız seviyesi başvurusu |

### Kimlik doğrulama (OAuth akışı)

1. Uygulama onaylanınca My Apps → uygulama → **Basic Information** altında **Advertiser authorization URL** görünür; bu adres reklamverene gönderilir. [RESMÎ]
2. Reklamveren adresi açar, uygulamanın istediği izinleri görür, Platform Service Agreement'ı kabul edip onaylar ve reklam hesabına bağlı e-postasına gelen kodla kimliğini doğrular. Aynı uygulama için yapılan doğrulama 48 saat geçerlidir; başka bir uygulamaya yetki verirken yeniden istenir. [RESMÎ]
3. TikTok, uygulamada tanımlı redirect URL'ye `auth_code` ekleyerek yönlendirir; sunucudaki uç nokta kodu sorgu parametresinden alır. `auth_code` **1 saat** geçerli ve **tek kullanımlıktır** [RESMÎ]. Yetkilendirme SSS'sinin hata tablosu "10 dakika" diyor; 10 dakika organik Accounts API kodunun süresidir [ÇELİŞKİLİ].
4. Sunucu kodu süresi dolmayan token'la değiştirir (aşağıdaki istek). Yanıtta `access_token`, bu token'la erişilebilen `advertiser_ids` ve `scope` döner. Form gövdesi (`application/x-www-form-urlencoded`) için `/oauth/token/` kullanılır. [RESMÎ]

```
POST https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/
Content-Type: application/json

{ "app_id": "<APP_ID>", "secret": "<APP_SECRET>", "auth_code": "<AUTH_CODE>" }
```

- Marketing API token'ı **süresi dolmaz**. Reklamveren yetkiyi kaldırırsa (TikTok for Business yetkilendirme ayarları → Remove) ya da `POST /oauth2/revoke_token/` çağrılırsa geçersizleşir. Token, uygulamanın başvurduğu izinlerle değil **reklamverenin onayladığı** izinlerle çalışır; yetki veren kullanıcı sonradan yeni bir reklam hesabına erişim kazanırsa yeniden yetki gerekmez. Erişilebilen hesaplar `GET /oauth2/advertiser/get/` ile listelenir. [RESMÎ]
- Redirect URL: uygulama ayarı localhost dahil en çok 10 adres kabul ediyor; Yetkilendirme SSS'si ise yönlendirme adresinin internetten erişilebilir olması gerektiğini, `localhost` gibi iç ağ adreslerinin çalışmadığını söylüyor [ÇELİŞKİLİ]. Masaüstü uygulamada güvenli yol, yönlendirmeyi ürünün web sunucusunda karşılamak ve `secret` ile token'ı yalnız sunucuda tutmaktır; `secret` masaüstü uygulamaya gömülmez. [TAHMİN]
- Organik **Accounts API** akışı farklıdır: *TikTok account holder authorization URL*, `auth_code` 10 dakika, `POST /tt_user/oauth2/token/` ile access token **1 gün**, refresh token **1 yıl** (`/tt_user/oauth2/refresh_token/` ile yenilenir). [RESMÎ]
- C#'ta aynı JSON gövde `HttpClient.PostAsJsonAsync` ile gönderilir; sonraki çağrılarda `Access-Token` başlığı eklenir. [TAHMİN]

### Temel uç noktalar (API for Business)

Taban: `https://business-api.tiktok.com/open_api/v1.3/` · Başlık: `Access-Token: <token>`

| Metot | Uç nokta | Ne yapar | İzin (scope) | Not/limit |
|---|---|---|---|---|
| POST | `/oauth2/access_token/` | `auth_code` → süresi dolmayan reklamveren token'ı | — | `app_id` ve `secret` ister [RESMÎ] |
| GET | `/oauth2/advertiser/get/` | Uygulamaya yetki vermiş reklam hesapları | Ad Account Management > Ad Account Information > Read Ad Account Information | [RESMÎ] |
| POST | `/campaign/create/` | Kampanya oluşturur | Ads Management > Campaign > Create and Update Campaigns | [RESMÎ] |
| GET | `/campaign/get/` | Kampanyaları listeler (filtreyle) | Ads Management > Campaign > Read Campaigns | Tek istekte birden çok ID filtrelemek önerilir [RESMÎ] |
| POST | `/adgroup/create/` | Reklam grubu (bütçe, hedefleme, yerleşim, optimizasyon) | Ads Management > Ad Group > Create and Update Ad Groups | [RESMÎ] |
| POST | `/ad/create/` | Reklam | Ads Management > Ad > Create and Update Ads | Basic seviyede 5 QPS / 150 QPM [RESMÎ] |
| POST | `/file/video/ad/upload/` | Reklam videosu yükler | Creative Management > Video Management > Create and Update Videos | [RESMÎ] |
| GET | `/report/integrated/get/` | Eşzamanlı rapor (harcama, gösterim, kitle…) | Reporting > Consolidated Report | [RESMÎ] |
| POST | `/report/task/create/` | Asenkron rapor görevi | Reporting > Consolidated Report | Her seviyede 2 QPS / 60 QPM / 4.500 QPD [RESMÎ] |
| POST | `/event/track/` | Events API 2.0: web, uygulama, çevrim dışı ve CRM dönüşüm olayları (tek ya da toplu) | Measurement > Report Conversion Event | İstek başına en çok 1.000 olay; 1.000 QPS (Events Manager token'ında reklam hesabı, kendi uygulamanın token'ında geliştirici uygulaması başına). Events API 1.0 uç noktaları (`/pixel/track/` vb.) için belge "2024'ün ikinci yarısında kapatılacak" diyor, hız tablosunda ise hâlâ yer alıyorlar [ÇELİŞKİLİ] |
| POST | `/subscription/subscribe/` | Webhook aboneliği | — | Aşağıya bak [RESMÎ] |

Tam liste: [API Reference](https://business-api.tiktok.com/portal/docs?id=1735713875563521).

### Gerçek zamanlı / bildirim (API for Business)

- **Reklam hesabı webhook'ları** (`POST /subscription/subscribe/`, `subscribe_entity` ile) [RESMÎ]:
  - `REPORT_DATA_CHANGE`: `spend`, `impressions`, `clicks`, `video_play_actions` değişince seçilen sıklıkta (ör. `5_MINUTE`) en çok bir bildirim; **allowlist** ve *Reporting > Consolidated Report* izni gerekir.
  - `LEAD`: Instant Form ve DM lead'leri, her yeni lead'de.
  - `AD` / `AD_GROUP` (reklam inceleme durumu), `CREATIVE_FATIGUE` (reklam yorgunluğu), `TCM_VIDEOS` (TTO kampanyasına video bağlanması), `AD_ACCOUNT_SUSPENSION` (hesabın askıya alınması; bu da **allowlist** ister, erişim için TikTok temsilcisiyle görüşülür) ve `API_SERVICE_STATUS` (API olayları; servis durum sayfasının RSS'i de var).
  - "En az bir kez" teslimat: aynı olay birden çok gelebilir, işleme idempotent olmalı.
- **Accounts API webhook'ları** (kendi işletme hesabın; callback URL uygulama düzeyinde `/business/webhook/update/` ile tanımlanır) [RESMÎ]:
  - `post.publish.failed`, `post.publish.complete`, `post.publish.publicly_available`, `post.publish.no_longer_publicly_available`: yalnız API ile yayımlanan gönderiler için.
  - `comment.update`: sahip olunan hesabın fotoğraf ve herkese açık video gönderilerinde yorum ya da yanıt oluşturma, silme, görünürlük değişikliği; TikTok uygulamasından elle yayımlanan gönderiler dahil, 5 dakika içinde; hesap sahibinin `comment.list` izni vermiş olması gerekir.
  - Kurallar: hemen HTTP 200 dönülmeli, adres HTTPS olmalı; teslim edilemeyen olay 72 saate kadar üstel geri çekilmeyle yeniden denenir. İmza `Tiktok-Signature: t=<zaman>,s=<imza>` başlığındadır: uygulama `secret`'ıyla `t + "." + JSON gövde` üzerinden HMAC-SHA256 (hex).
- **Business Messaging** webhook'ları: DM gönderme ve alma olayları (`im_send_msg`, `im_receive_msg` …). [RESMÎ]
- Hiçbiri **başka hesabın** yeni videosunu ya da canlı yayınını bildirmez. [RESMÎ — olay listelerinde yok]

### Neler mümkün (API for Business)

| İş | Mümkün mü | Nasıl | Seviye | Not |
|---|---|---|---|---|
| Kendi reklam hesabında kampanya, reklam grubu, reklam oluşturma ve durdurma | Evet (şirket kaydıyla) | `/campaign/create/`, `/adgroup/create/`, `/ad/create/` ve durum güncelleme uç noktaları | Onaylı geliştirici uygulaması | Bireysel geliştirici kaydı yok [RESMÎ] |
| Harcama ve performans raporu | Evet | `/report/integrated/get/` yoklama; büyük rapor `/report/task/create/` | Reporting izni | Metrik değişikliği webhook'u allowlist ister [RESMÎ] |
| Reklamın inceleme (onay/ret) durumu, reklam yorgunluğu, hesabın askıya alınması | Evet, push | Reklam hesabı webhook'u (`AD` / `AD_GROUP`, `CREATIVE_FATIGUE`, `AD_ACCOUNT_SUSPENSION`) | Marketing API token'ı | Askıya alma aboneliği allowlist ister (TikTok temsilcisi) [RESMÎ] |
| Lead toplama (Instant Form, DM) | Evet, push | `LEAD` aboneliği | Marketing API token'ı | [RESMÎ] |
| Sitedeki ya da sunucudaki dönüşümleri (kayıt, indirme) reklama bağlamak | Evet | Events API 2.0 `/event/track/` (+ Pixel) | Measurement izni | 1.000 QPS [RESMÎ] |
| Masaüstü (Windows) uygulamasını tanıtmak | Dolaylı | İndirme sayfasına trafik ya da web dönüşümü kampanyası + Events API ile indirme/kayıt olayı | Onaylı uygulama ya da Ads Manager arayüzü | Uygulama tanıtım reklam grubu, reklam hesabındaki tanıtılan uygulamanın `app_id`'sini ister (`/app/list/`); Windows uygulaması için uygunluğu doğrulanamadı [TAHMİN: doğrulanamadı] |
| Kendi işletme hesabının gönderilerine gelen yorumlar | Evet | Accounts API: `comment.update` webhook'u ya da `/business/comment/list/` yoklaması | Accounts API izni (ek başvuru formu) | Yalnız sahip olunan hesap [RESMÎ] |
| Yapay zekâ ajanıyla reklam yönetimi | Evet | TikTok for Business MCP Server | TikTok for Business hesabı; geliştirici kaydı gerekmez | Yetki 30 günde bir yenilenir [RESMÎ] |
| Başka bir hesabın yeni videosu, canlı yayını ya da yorumları | Hayır | — | — | API for Business yalnız yetki veren hesapları kapsar [RESMÎ] |
| Rakibin reklamlarını görmek | Kısmen | Commercial Content API (TikTok for Developers; şimdilik AB reklamları) | Başvuru | Yukarıdaki Erişim seviyeleri tablosuna bak [RESMÎ] |

### Hız sınırları (API for Business)

Uygulama düzeyinde dört seviye vardır; her seviyede QPS, QPM ve QPD sınırı ayrı işler ve her uç noktaya ayrı uygulanır (bir uç noktada sınıra takılmak diğerlerini etkilemez). [RESMÎ]

| Seviye | QPS | QPM | QPD |
|---|---|---|---|
| Basic (varsayılan) | 10 | 600 | 864.000 |
| Advanced | 20 | 1.200 | 1.728.000 |
| Premium | 30 | 1.800 | 2.592.000 |
| Ultimate | 50 | 3.000 | 4.320.000 |

- Sınır aşılınca yanıt `"code": 40100` olur: QPM'de 5 dakika, QPD'de ertesi gün 00:00 UTC'ye kadar beklenir. Seviye, My Apps → App Detail → Authorization'dan gerekçe yazılarak birer birer yükseltilir; Events API için seviye fark etmez. [RESMÎ]
- Uç noktaya özel örnekler: `/ad/create/` Basic'te 5 QPS / 150 QPM / 86.400 QPD; asenkron rapor `/report/task/create/` her seviyede 2 QPS / 60 QPM / 4.500 QPD; `/event/track/` her seviyede 1.000 QPS; `/campaign/copy/task/create/` her seviyede 1 QPS / 30 QPM. [RESMÎ]
- Accounts API: yetkili hesap ve uç nokta başına 40 QPM; tüm Accounts uç noktalarının toplamı Basic'te 600, diğer seviyelerde 1.000 QPM. Business Messaging API: 10 QPS. Sandbox: uç nokta başına 1 QPS / 30 QPM / 1.000 QPD. [RESMÎ]
- Öneri: okuma uç noktalarında tek istekte birden çok ID gönder (toplu istek); istemci tarafında token bucket ya da mesaj kuyruğuyla eşzamanlı istek sayısını sınırla. [RESMÎ]
- Fiyat: API ücreti belgede yok; ödenen reklam harcamasıdır. [RESMÎ — belgede API ücreti yok]

### SDK, .NET ve MCP

- Resmî SDK Python, JavaScript ve Java içindir; .NET için resmî SDK yok. Paket adları ve .NET notu yukarıdaki SDK ve kütüphaneler tablosunda. TikTok'a göre SDK, raporlama entegrasyonunu yaklaşık %40 kısaltıyor (45 saatten 32 saate). [RESMÎ]
- **TikTok for Business MCP Server** [RESMÎ]: 3 Temmuz 2026'dan beri; yaklaşık 400 API for Business uç noktasını MCP aracı olarak sunar. Geliştirici kaydı ya da uygulaması gerekmez, ek izin başvurusu yok; TikTok for Business hesabıyla yetki verilir ve yetki 30 gün geçerlidir. Adresler: `https://business-api.tiktok.com/open_mcp/tt-ads-mcp-flat` (tüm araçlar bağlantıda yüklenir) ve `https://business-api.tiktok.com/open_mcp/tt-ads-mcp-layer` (yaklaşık 40 çekirdek araç, gerisi istek üzerine). Hız sınırı: araç başına, TikTok for Business kullanıcısı başına 6 QPS. Henüz tüm API for Business uç noktaları araç olarak sunulmuyor; araçların kullanılabilirliği bölgeye ve hesap yapılandırmasına göre değişebiliyor.
- Postman koleksiyonu için yukarıdaki Postman bölümüne bak.

## Depoda ilgili sayfalar

- [Masaüstü uygulamada reklam ve ödüllü reklam](../../Rehberler/Masaustu-Uygulama-Reklam/) — Araştırmanın §7'si uygulamayı TikTok API for Business ile tanıtmayı kısaca anlatır (orada onay süresi doğrulanamamıştı); kayıt şartları, onay süreleri, OAuth akışı ve hız sınırlarının resmî karşılığı bu sayfanın API for Business bölümündedir. Yapay zekâ için Markdown sürümü: [arastirma.md](../../Rehberler/Masaustu-Uygulama-Reklam/arastirma.md).
- [Sosyal medya API'leri klasörü](./) — Aynı klasördeki diğer platformlar: YouTube, Twitch, Kick, Instagram vb. (aynı şablonla hazırlanır).
- [Rehberler/YouTube-Oyun](../../Rehberler/YouTube-Oyun/) — YouTube'da oyun ve kanal araştırması. Canlı yayın ve içerik üretici konularıyla ilgili.
- [Rehberler/Mesajlasma-Altyapilari](../../Rehberler/Mesajlasma-Altyapilari/) — Telegram, WhatsApp, BiP ve SMS API'leri. Takip uygulamasında bildirim göndermek için kullanılabilir.
- [Programlama/Python](../../Programlama/Python/) ve [Programlama/CSharp-DotNet](../../Programlama/CSharp-DotNet/) — TikTokLive ve TikTokLiveSharp denemeleri yapılırsa buraya konur.

## Kaynaklar

**Resmî**
- [TikTok for Developers — Docs Overview](https://developers.tiktok.com/doc/overview) — Tüm ürünlerin listesi (erişim: 15 Ekim 2026)
- [Login Kit for Web](https://developers.tiktok.com/doc/login-kit-web) — Yetkilendirme URL'si, parametreler, redirect URI kuralları (erişim: 6 Kasım 2026)
- [Manage OAuth Access Tokens](https://developers.tiktok.com/doc/oauth-user-access-token-management) · [Get a User Access Token](https://developers.tiktok.com/docs/en/oauth-get-a-user-access-token) · [Refresh a User Access Token](https://developers.tiktok.com/docs/en/oauth-refresh-a-user-access-token) · [Revoke a User Access Token](https://developers.tiktok.com/docs/en/oauth-revoke-a-user-access-token) — token uç noktaları, 2 saat / 180 gün ömür, refresh token rotasyonu, mobil ve masaüstünde PKCE; sayfalar 5 Kasım 2026'da güncellenmiş, örnek yanıtlar eski süreleri gösteriyor (erişim: 6 Kasım 2026)
- [Get a Client Access Token](https://developers.tiktok.com/docs/en/client-access-token-management) — Research API ve Commercial Content API için 2 saatlik istemci token'ı (erişim: 6 Kasım 2026)
- [Scopes Reference](https://developers.tiktok.com/doc/tiktok-api-scopes) — Tüm scope'lar (erişim: 6 Kasım 2026)
- [Display API Overview](https://developers.tiktok.com/doc/display-api-overview) — user/info, video/list, video/query (erişim: 15 Ekim 2026)
- [API v2 Rate Limits](https://developers.tiktok.com/doc/tiktok-api-v2-rate-limit) — 600 istek/dk kayan pencere (erişim: 6 Kasım 2026)
- [Content Posting API — Get Started](https://developers.tiktok.com/doc/content-posting-api-get-started) — Direct Post uç noktaları ve audit (erişim: 15 Ekim 2026)
- [Content Sharing Guidelines](https://developers.tiktok.com/doc/content-sharing-guidelines) — Denetimsiz istemci limitleri, günlük paylaşım tavanı (erişim: 6 Kasım 2026)
- [Webhooks Overview](https://developers.tiktok.com/doc/webhooks-overview) · [Events](https://developers.tiktok.com/doc/webhooks-events) · [Verification](https://developers.tiktok.com/doc/webhooks-verification) — Olaylar, yeniden deneme, HMAC-SHA256 imza (erişim: 6 Kasım 2026)
- [Embed Videos (oEmbed)](https://developers.tiktok.com/doc/embed-videos) — Kimliksiz tek video bilgisi (erişim: 15 Ekim 2026)
- [Research API ürün sayfası](https://developers.tiktok.com/products/research-api) — Uygunluk şartları, veri türleri, VCE (erişim: 15 Ekim 2026)
- [Research API — Getting Started](https://developers.tiktok.com/doc/research-api-get-started) — video/query ve user/info örnekleri (erişim: 15 Ekim 2026)
- [Research API FAQ](https://developers.tiktok.com/doc/research-api-faq) — Kotalar, veri tazeliği, uygunluk (erişim: 6 Kasım 2026)
- [About Research Tools](https://developers.tiktok.com/doc/about-research-api/) — DSA onaylı araştırmacı (vetted researcher) ve DSC (erişim: 15 Ekim 2026)
- Research API spesifikasyonları: [Query Video Comments](https://developers.tiktok.com/doc/research-api-specs-query-video-comments) · [User Followers](https://developers.tiktok.com/doc/research-api-specs-query-user-followers) · [User Following](https://developers.tiktok.com/doc/research-api-specs-query-user-following) · [Liked Videos](https://developers.tiktok.com/doc/research-api-specs-query-user-liked-videos) · [Pinned Videos](https://developers.tiktok.com/doc/research-api-specs-query-user-pinned-videos) · [Reposted Videos](https://developers.tiktok.com/doc/research-api-specs-query-user-reposted-videos) — Yollar, metotlar, `max_count` (erişim: 15 Ekim 2026)
- [Commercial Content API — Query Ads](https://developers.tiktok.com/doc/commercial-content-api-query-ads) — `max_count` varsayılan ve en çok 10 (erişim: 15 Ekim 2026)
- [Content Posting API — Upload Video (taslak)](https://developers.tiktok.com/doc/content-posting-api-reference-upload-video) — `/v2/post/publish/inbox/video/init/`, `video.upload` (erişim: 15 Ekim 2026)
- [TikTok for Developers Changelog](https://developers.tiktok.com/doc/changelog) — 2025–2026 Research Tools değişiklikleri (erişim: 15 Ekim 2026)
- [Commercial Content API ürün sayfası](https://developers.tiktok.com/products/commercial-content-api) · [Getting Started](https://developers.tiktok.com/doc/commercial-content-api-getting-started) — AB reklam kütüphanesi (erişim: 15 Ekim 2026)
- [About API for Business](https://ads.tiktok.com/help/article/marketing-api?lang=en) — Marketing, Organic (Accounts, Mentions, TTO, Discovery, Spark Ads Recommendation) ve Business Messaging API (erişim: 6 Kasım 2026)
- [TikTok API for Business Portal](https://business-api.tiktok.com/portal/docs) — Business API belgeleri, v1.3 (erişim: 6 Kasım 2026)
- API for Business — [Get Started](https://business-api.tiktok.com/portal/docs?id=1735713609895937) · [Register as a developer](https://business-api.tiktok.com/portal/docs?id=1738855176671234) · [Create a developer app](https://business-api.tiktok.com/portal/docs?id=1738855242728450) · [App permissions](https://business-api.tiktok.com/portal/docs?id=1738855280338946) · [Account structure](https://business-api.tiktok.com/portal/docs?id=1740029179343874) — kayıt şartları (kurumsal e-posta, şirket sitesi, bireysel geliştirici kabul edilmemesi), 3 iş günü ve 2–3 iş günü inceleme, en çok 5 uygulama (erişim: 6 Kasım 2026)
- [Versioning](https://business-api.tiktok.com/portal/docs?id=1740029169927169) ve [Timelines](https://business-api.tiktok.com/portal/docs?id=1740578661644289) — v1.3 ve sürüm takvimi (erişim: 6 Kasım 2026)
- [Authorization (API karşılaştırması)](https://business-api.tiktok.com/portal/docs?id=1781891256601602) · [Marketing API Authorization](https://business-api.tiktok.com/portal/docs?id=1738373141733378) · [Authorization FAQs](https://business-api.tiktok.com/portal/docs?id=1766037914914818) — reklamveren yetkilendirmesi, `auth_code` süresi, redirect URL kuralları (erişim: 6 Kasım 2026)
- [Marketing API Authentication](https://business-api.tiktok.com/portal/docs?id=1738373164380162) · [Obtain a long-term access token](https://business-api.tiktok.com/portal/docs?id=1739965703387137) · [Revoke a long-term access token](https://business-api.tiktok.com/portal/docs?id=1739965949088770) — token uç noktaları, süresi dolmayan token (erişim: 6 Kasım 2026)
- [Accounts API Get started](https://business-api.tiktok.com/portal/docs?id=1760334598980610) · [Accounts API Authentication](https://business-api.tiktok.com/portal/docs?id=1738084387220481) · [Accounts API rate limits](https://business-api.tiktok.com/portal/docs?id=1738084416214017) — ek başvuru formu, 1 günlük token ve 1 yıllık refresh token, 40 QPM (erişim: 6 Kasım 2026)
- [Rate limits](https://business-api.tiktok.com/portal/docs?id=1740029171730433) — dört seviye, uç noktaya özel sınırlar, `40100` (erişim: 6 Kasım 2026)
- [Sandbox accounts](https://business-api.tiktok.com/portal/docs?id=1738855331457026) — 1 Aralık 2026 kapanışı ve sandbox limitleri (erişim: 6 Kasım 2026)
- [API Reference](https://business-api.tiktok.com/portal/docs?id=1735713875563521) — uç nokta listesi ve izin grupları (erişim: 6 Kasım 2026)
- [Subscribe to ad account Webhook events](https://business-api.tiktok.com/portal/docs?id=1810521739537409) — `subscribe_entity` değerleri, `REPORT_DATA_CHANGE` ve `AD_ACCOUNT_SUSPENSION` için allowlist, "en az bir kez" teslimat (erişim: 6 Kasım 2026)
- [Webhooks (Accounts API)](https://business-api.tiktok.com/portal/docs?id=1759977800177665) · [Post publishing events](https://business-api.tiktok.com/portal/docs?id=1810515090228226) · [Comment update event](https://business-api.tiktok.com/portal/docs?id=1810515104773122) · [Webhook verification](https://business-api.tiktok.com/portal/docs?id=1759978341579777) — olaylar, 72 saatlik yeniden deneme, HMAC-SHA256 imza (erişim: 6 Kasım 2026)
- [Events API 2.0](https://business-api.tiktok.com/portal/docs?id=1771100779668482) — `/event/track/`, istek başına 1.000 olay, 1.000 QPS ve Events API 1.0 kapanış duyurusu (erişim: 6 Kasım 2026)
- [Access to Business Messaging API](https://business-api.tiktok.com/portal/docs?id=1832184145137922) ve [Business Messaging Get started](https://business-api.tiktok.com/portal/docs?id=1832184116746305) — veri güvenliği incelemesi, bölge kısıtı, 10 QPS (erişim: 6 Kasım 2026)
- [SDK](https://business-api.tiktok.com/portal/docs?id=1764231376750658) ve [GitHub: tiktok/tiktok-business-api-sdk](https://github.com/tiktok/tiktok-business-api-sdk) — resmî SDK dilleri ve kapsadığı uç noktalar (erişim: 6 Kasım 2026)
- [Postman collection](https://business-api.tiktok.com/portal/docs?id=1747849403155521) — resmî koleksiyon bağlantısı (erişim: 6 Kasım 2026)
- [TikTok for Business MCP Server](https://business-api.tiktok.com/portal/docs?id=1869388085523458) ve [Hazır bir ajanı bağlama](https://business-api.tiktok.com/portal/docs?id=1869389950974978) — geliştirici kaydı gerekmemesi, 30 günlük yetki, araç başına 6 QPS, sunucu adresleri (erişim: 6 Kasım 2026)
- [What's New](https://business-api.tiktok.com/portal/docs?id=1740029165513730) — 2026 değişiklikleri (erişim: 6 Kasım 2026)
- [TikTok for Developers — Getting Started FAQ](https://developers.tiktok.com/doc/getting-started-faq) — "birkaç gün ile iki hafta" inceleme süresi; yalnız TikTok for Developers uygulamaları, son güncelleme 4 Ağustos 2026 (erişim: 6 Kasım 2026)
- [TikTok Terms of Service (ABD)](https://www.tiktok.com/legal/page/us/terms-of-service/en) — 3.4 maddesi: kazıma ve tersine mühendislik yasağı (erişim: 15 Ekim 2026)

**Üçüncü taraf**
- [TikTokLive (GitHub)](https://github.com/isaackogan/TikTokLive) — Python LIVE istemcisi, olay listesi, uyarılar (erişim: 15 Ekim 2026)
- [TikTok-Live-Connector (GitHub)](https://github.com/zerodytrash/TikTok-Live-Connector) — Node.js LIVE istemcisi, `fetchIsLive` / `waitUntilLive` (erişim: 15 Ekim 2026)
- [TikTokLiveSharp (GitHub)](https://github.com/frankvHoof93/TikTokLiveSharp) — C#/.NET/Unity LIVE istemcisi (erişim: 15 Ekim 2026)
- [Euler Stream Pricing](https://www.eulerstream.com/pricing) — İmzalama, LIVE WebSocket ve LIVE alarm fiyatları (erişim: 15 Ekim 2026)
- [tiktok-business-api-sdk-official (PyPI)](https://pypi.org/project/tiktok-business-api-sdk-official/) — resmî SDK'nın Python paketi; son sürüm 1.1.3, 27.02.2026 (erişim: 6 Kasım 2026)
- [TikTok.Marketing.Api.Sdk (NuGet)](https://www.nuget.org/packages/TikTok.Marketing.Api.Sdk) — açıklaması ve proje adresi olmayan .NET paketi (erişim: 6 Kasım 2026)
