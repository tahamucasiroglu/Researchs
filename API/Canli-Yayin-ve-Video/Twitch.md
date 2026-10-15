# Twitch API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **aktif** (Helix REST + EventSub; ücretsiz, geliştirici uygulaması kaydıyla)

Etiketler: **[RESMÎ]** dev.twitch.tv resmî dokümanı / değişiklik günlüğü · **[3. TARAF]** topluluk kaynağı, forum, paket sayfası · **[TAHMİN]** çıkarım · **[ÇELİŞKİLİ]** resmî kaynaklar kendi içinde ya da canlı davranışla farklı.

## Özet

Twitch'in güncel resmî API'si **Helix** (`https://api.twitch.tv/helix/`) adlı REST API'dir; olay bildirimleri için **EventSub** (Webhook, WebSocket ve Conduit taşımaları) kullanılır [RESMÎ]. Eski **PubSub** 14.04.2025'te kalıcı olarak kapatıldı (değişiklik günlüğünde 15.04.2025'te deprecated işaretlendi), artık çalışmıyor; sohbet için de artık önerilen yol IRC değil **EventSub + Helix**'tir [RESMÎ]. Erişim için dev.twitch.tv konsolunda bir uygulama kaydı (Client ID + Client Secret) yeterlidir; belgede ücretli bir API katmanı ya da fiyat sayfası yoktur, kısıtlar **hız sınırı (token bucket)** ve **EventSub maliyet (cost) kotası** ile uygulanır [RESMÎ]. Takip uygulaması açısından Twitch, "canlı yayın başladı/bitti" ve "başlık/kategori değişti" olaylarını **kullanıcı izni gerekmeden**, gerçek zamanlı ve ücretsiz veren nadir platformlardandır [RESMÎ].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Herkese açık (kimliksiz)** | Hiçbir şey | Helix'in neredeyse tamamı **Client-Id + token** ister; kimliksiz resmî yol yok denecek kadar azdır. Kanal yayın takviminin iCalendar çıktısı (`/helix/schedule/icalendar`) kimlik istemez [RESMÎ*]. Değişiklik günlüğü için RSS beslemesi var (25.03.2026'dan beri) [RESMÎ] | Ücretsiz |
| **Geliştirici uygulaması — app access token** | dev.twitch.tv konsolunda uygulama kaydı (hesapta 2FA açık olmalı [3. TARAF]), Client Credentials akışı | Herkese açık veriler: yayınlar (`Get Streams`), kullanıcılar, kanal bilgisi, videolar, klipler, arama, takvim; **EventSub Webhook ve Conduit** abonelikleri (`stream.online`, `stream.offline`, `channel.update`, `channel.raid` gibi izin istemeyen olaylar) [RESMÎ] | Ücretsiz. Uygulama başına token bucket (örnek başlıkta 800 puan/dk) [RESMÎ] |
| **Geliştirici uygulaması — user access token** | Kullanıcının OAuth ile uygulamana scope vermesi (Authorization Code, Implicit veya Device Code akışı) | Kullanıcıya özel veriler: takip edilen canlı yayınlar (`Get Followed Streams`), kanal takipçileri, sohbet okuma/yazma, abonelikler, moderasyon; **EventSub WebSocket** abonelikleri [RESMÎ] | Ücretsiz. Kullanıcı başına ayrı bucket ("client ID başına, kullanıcı başına, dakika başına") [RESMÎ] |
| **İşletme / uygulama onayı (doğrulama)** | Twitch'e başvuru: **Verified Bot** (sohbet botu doğrulaması), geliştirici organizasyonu, Extensions incelemesi, oyun sahipliği | Doğrulanmış bot: 7.500 mesaj/30 sn, 2.000 JOIN/10 sn [RESMÎ]. **Not:** Sohbet botu doğrulama incelemeleri belgede "geçici olarak durduruldu" diye geçiyor; Extensions, organizasyon ve oyun sahipliği incelemeleri yeniden açıldı [RESMÎ] | Ücretsiz; onay süresi belgede yok |
| **Ücretli / kurumsal** | — | **Belgede yok.** Twitch API'nin satılan bir katmanı yok [RESMÎ — fiyat sayfası yok]. Büyük ölçek için resmî çözüm Conduit taşımasıdır [RESMÎ] | — |
| **Resmî olmayan** | Twitch web sitesinin kendi uç noktaları | `gql.twitch.tv` (sitenin GraphQL API'si), `usher` HLS oynatma listeleri, kimliksiz IRC okuma (`justinfan…`), 3. taraf istatistik siteleri [3. TARAF] | Ücretsiz ama ToS/Geliştirici Sözleşmesi riski; bkz. "Resmî olmayan yollar" |

\* *[RESMÎ\*]*: Uç nokta resmî API referansının dizininde yer alıyor; resmî referans sayfası çok büyük olduğu için bu oturumda ilgili bölümün tam metni okunamadı. Parametre ayrıntıları kullanmadan önce [API Reference](https://dev.twitch.tv/docs/api/reference/) üzerinden doğrulanmalı.

## Kimlik doğrulama

Her Helix isteğinde iki başlık zorunludur [RESMÎ]:

```
Authorization: Bearer <access_token>
Client-Id: <client_id>
```

**Token türleri** [RESMÎ]:

| Token | Ne zaman | Nasıl alınır | Süre / yenileme |
|---|---|---|---|
| **App access token** | Kullanıcı izni gerektirmeyen API'ler; **EventSub Webhook ve Conduit için zorunlu** (user token ile webhook aboneliği başarısız olur) | Client Credentials: `POST https://id.twitch.tv/oauth2/token` + `client_id`, `client_secret`, `grant_type=client_credentials` | Refresh token **yok**; süresi dolunca yeniden alınır. Örnek yanıtta `expires_in` ≈ 5.011.271 sn (~58 gün); genel süre belgede sabitlenmemiş [RESMÎ] |
| **User access token** | Kullanıcının izni gereken API'ler; **EventSub WebSocket için zorunlu** (app token ile WebSocket aboneliği başarısız olur) | Authorization Code (sunucusu olan uygulama), Implicit (sunucusuz istemci), Device Code (TV, oyun, CLI, Electron gibi sınırlı giriş) | Authorization Code ve Device Code `refresh_token` döner; Implicit dönmez. Refresh token süresi istemci türüne bağlı: **Confidential** istemci (ör. Authorization Code kullanan sunucu) → refresh token'ın süresi **dolmaz**; **Public** istemci (yalnızca Device Code) → refresh token oluşturulduktan **30 gün** sonra düşer ve Device Code akışında **tek kullanımlıktır**. Her durumda yenileme yanıtındaki yeni refresh token saklanmalı (değişebilir). Erişim token'ı belgede ~4 saat [RESMÎ] |

**İstemci türü** [RESMÎ]: *Confidential* (secret saklanabilen sunucu) önerilen türdür; *Public* istemci secret tutmaz, **yalnızca Device Code akışını** kullanabilir.

**Zorunlu doğrulama (validate)** [RESMÎ]: OAuth oturumu tutan uygulama token'ı **açılışta ve sonra saatte bir** `GET https://id.twitch.tv/oauth2/validate` ile doğrulamak zorundadır. Twitch bunu denetler; düzeltilmezse API anahtarını iptal etme veya uygulamayı yavaşlatma (throttle) hakkını saklı tutar.

Token geçersizleşme sebepleri: süre dolması, kullanıcının parola değiştirmesi, Twitch'in iptali, kullanıcının uygulama bağlantısını kesmesi → API `401` döner [RESMÎ].

## Temel uç noktalar

Taban adres: `https://api.twitch.tv/helix`. Liste dönen uç noktalarda sayfalama `first` / `after` / `before` ile yapılır; `after` ve `before` birlikte kullanılamaz; liste dinamik olduğu için sayfalar arasında yinelenen veya eksik kayıt olabilir [RESMÎ].

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/streams` | Canlı yayınları listeler (başlık, kategori, izleyici sayısı, başlama zamanı) | App veya user | `user_id`/`user_login` ile **istek başına 100 kanal** toplu canlılık kontrolü; `type=live`, `game_id`, `language`; `first` en çok 100, varsayılan 20 [RESMÎ — API Reference "Get Streams": `user_id`/`user_login` en çok 100 değer; sayfalama rehberi. Forum başlığı destekleyici kaynak] |
| GET | `/streams/followed` | Kullanıcının takip ettiği kanallardan canlı olanlar | User (`user:read:follows`) | [RESMÎ*] |
| GET | `/users` | Kullanıcı bilgisi; login ↔ ID dönüşümü | App veya user | En çok 100 `id`/`login` [RESMÎ*] |
| GET | `/channels` | Kanal bilgisi (başlık, kategori, dil, etiketler) | App veya user | `broadcaster_id` tekrarlanarak **en çok 100** [RESMÎ] |
| GET | `/search/channels` | Kanal arama (`query`, `live_only`) | App veya user | [RESMÎ*] |
| GET | `/videos` | VOD / highlight / upload listesi | App veya user | `user_id`, `game_id` veya `id` [RESMÎ*] |
| GET | `/clips` | Klipler | App veya user | `broadcaster_id`, `game_id`, `id` birbirini dışlar; `first` en çok 100; sayfalama toplamda ~1.000 sonuçla sınırlı [RESMÎ] |
| GET | `/schedule` · `/schedule/icalendar` | Kanalın yayın takvimi; iCal çıktısı | App/user · kimliksiz | [RESMÎ*] |
| GET | `/channels/followers` | Kanal takipçileri | User (`moderator:read:followers`, yayıncı veya moderatör) | Yetki yoksa yalnızca toplam sayı döner; `first` en çok 100 [RESMÎ] |
| GET | `/chat/chatters` | Sohbetteki kullanıcılar | User token (`moderator:read:chatters`) ya da bu scope'u `moderator_id` kullanıcısından daha önce almış uygulamanın app token'ı (2026'dan beri: 27.02.2026 açık beta, 29.05.2026 GA); `moderator_id` yayıncı veya moderatörü olmalı | `first` en çok 1.000; liste gecikmeli olabilir. Yetkisiz app token ile başka kanalın listesi alınamaz [RESMÎ] |
| POST | `/chat/messages` | Sohbete mesaj gönderir | User (`user:write:chat`) veya app (`user:write:chat` + `user:bot` + yayıncıdan `channel:bot`) | Mesaj en çok 500 karakter; ayrı hız sınırı bucket'ı [RESMÎ] |
| POST | `/eventsub/subscriptions` | EventSub aboneliği oluşturur | Webhook/Conduit: app · WebSocket: user | Aynı abonelik zaten varsa `409` ile mevcut aboneliğin `id`'si döner (17.04.2026) [RESMÎ] |
| GET / DELETE | `/eventsub/subscriptions` | Abonelikleri listeler / siler | Taşımaya göre app veya user | `first` desteklemez; `subscription_id`, `conduit_id` filtresi var [RESMÎ] |
| POST / PATCH | `/eventsub/conduits` · `/eventsub/conduits/shards` | Conduit oluşturur, shard'lara WebSocket/Webhook bağlar | App | Limit için bkz. Conduit [RESMÎ] |

Tam liste: [Twitch API Reference](https://dev.twitch.tv/docs/api/reference/). Son dönem kaldırılanlar: `Get Hype Train Events` 05.02.2026'da kaldırıldı (yerine `Get Hype Train Status`) [RESMÎ].

## Gerçek zamanlı / bildirim

### EventSub — genel

- Üç taşıma: **Webhook**, **WebSocket**, **Conduit** [RESMÎ]. Abonelikler taşımadan bağımsızdır; bir olay türü bir taşımayı desteklemiyorsa belgede yazar [RESMÎ].
- Teslim garantisi **"en az bir kez" (at least once)**: aynı bildirim tekrar gelebilir, `message_id` aynı kalır → işlenen ID'leri sakla. Tekrar saldırılarına karşı `message_timestamp` 10 dakikadan eskiyse reddet [RESMÎ].
- **Maliyet (cost) kuralı** [RESMÎ]:
  - Kullanıcı yetkisi gerektiren türler (ör. `channel.subscribe`) → maliyet 0.
  - Kullanıcı ID'si isteyen ama yetki istemeyen türler (ör. `stream.online`, `channel.update`) → **her biri 1**; o kullanıcı uygulamana gerekli scope'u vermişse 0.
  - Aynı `type` + `condition` için en çok 3 abonelik.
  - Yanıtta `cost`, `total_cost`, `max_total_cost` döner. Webhook örnek yanıtlarında `max_total_cost: 10000` görünürken WebSocket bölümü 10 der; belge bunu ayrıca açıklamıyor (taşımaya göre farklı kota olduğu anlaşılıyor) [ÇELİŞKİLİ / TAHMİN].

### Webhook

- `callback` HTTPS ve **443 portu** olmalı; `secret` 10–100 ASCII karakter [RESMÎ].
- Abonelikten sonra `webhook_callback_verification` mesajı gelir: `200` + gövdede ham `challenge` değeri ile yanıtla [RESMÎ].
- İmza: `HMAC-SHA256(secret, Message-Id + Message-Timestamp + ham gövde)` → `Twitch-Eventsub-Message-Signature` ile zaman-sabit karşılaştır; uymazsa 4XX [RESMÎ].
- Mesaj türleri (`Twitch-Eventsub-Message-Type`): `notification`, `webhook_callback_verification`, `revocation` (sebep: `user_removed`, `authorization_revoked`, `notification_failures_exceeded`, `version_removed`) [RESMÎ].
- **Birkaç saniye içinde** 2XX dön; sürekli yavaş kalırsan abonelik `notification_failures_exceeded` ile iptal edilir. Öneri: olayı kuyruğa yaz, hemen 2XX dön, sonra işle [RESMÎ].
- Devre dışı webhook abonelikleri listede en az 10 gün görünür [RESMÎ].

### WebSocket

- Adres: `wss://eventsub.wss.twitch.tv/ws` (isteğe bağlı `?keepalive_timeout_seconds=10..600`) [RESMÎ].
- Bağlanınca `session_welcome` gelir; içindeki `session.id` ile **10 saniye içinde** abone olunmazsa bağlantı kapanır (kod 4003) [RESMÎ].
- `session_keepalive` mesajları; süre içinde ne olay ne keepalive gelirse bağlantıyı kopmuş say [RESMÎ].
- `session_reconnect`: sunucu kapatmadan 30 sn önce gönderir; `reconnect_url`'ye bağlan, yenisinden welcome gelene kadar eskiyi açık tut [RESMÎ].
- Limitler (client ID + kullanıcı ID ikilisi başına): **en çok 3 bağlantı**, bağlantı başına **300 etkin abonelik**, `max_total_cost` **10** [RESMÎ]. Yani WebSocket ile yetkisiz kanal takibi pratikte ~10 kanalla sınırlı → çok kanal için Webhook/Conduit gerekir [TAHMİN, maliyet kuralından çıkarım].
- İstemci sunucuya veri gönderemez (gönderirse 4001 ile kapanır) [RESMÎ].

### Conduit

- Abonelikleri taşımadan ayıran, bildirimleri **shard**'lar (her biri bir WebSocket oturumu veya Webhook) arasında yük dengeleyen yapı; arka uç sunucular için [RESMÎ].
- **App access token** gerektirir [RESMÎ].
- Limit: "en çok 5 etkin conduit, conduit başına en çok 20.000 shard (değişebilir)" [RESMÎ]; ancak değişiklik günlüğünde (18.06.2026) `Update Conduit Shards` için "en çok 100 shard" açıkça belirtildi [RESMÎ] → **[ÇELİŞKİLİ]**: tek istekte güncellenebilen shard sayısı ile conduit'in toplam shard sınırı karıştırılmamalı; kullanmadan önce güncel referansı kontrol et.
- WebSocket hızında ama app token ile çok kanal izlemenin resmî yolu budur; sohbet okuyan büyük entegrasyonlar için de önerilir [RESMÎ].

### Sohbet (Chat)

- **Önerilen:** EventSub `channel.chat.message` (okuma) + Helix `Send Chat Message` (yazma) [RESMÎ].
- **IRC (eski, sınırlı özellik):** `irc://irc.chat.twitch.tv:6697` (SSL), `wss://irc-ws.chat.twitch.tv:443`. Kimlik: `PASS oauth:<token>` sonra `NICK <login>` (`chat:read`, `chat:edit`). Yetenekler: `CAP REQ :twitch.tv/membership twitch.tv/tags twitch.tv/commands`. `PING :tmi.twitch.tv` → `PONG :tmi.twitch.tv` yanıtlanmazsa bağlantı kesilir [RESMÎ]. Şifresiz IRC (`irc://irc.chat.twitch.tv:6667`) belgede hâlâ listeleniyor; yalnızca şifresiz WebSocket (`ws://`, port 80) 15.08.2025'te kapatıldı. SSL bağlantı önerilir [RESMÎ].
- **Chat Bot rozeti** yalnızca mesaj `Send Chat Message` API'siyle **App Access Token** kullanılarak gönderilirse, yayıncı `channel:bot` izni vermişse (veya bot o kanalda moderatörse) ve bot hesabı yayıncının kendisi değilse görünür; User Access Token veya IRC ile gönderilen mesajlarda görünmez [RESMÎ].
- **"Users in Chat" → Chat Bots listesi** ise okumaya bağlı: bot `channel.chat.message` EventSub olayını App Access Token ile dinlemeli, yayıncıdan `channel:bot` izni almış olmalı ve yayıncı hesabı olmamalı; EventSub WebSocket veya IRC ile okuyan botlar bu listede görünmez [RESMÎ].

### Diğer kanallar

- **PubSub:** 14.04.2025 18:00 UTC'de kalıcı olarak kapatıldı (değişiklik günlüğünde 15.04.2025'te deprecated işaretlendi); artık çalışmıyor, geçiş rehberi bile 12.06.2026'da kaldırıldı [RESMÎ].
- **RSS / WebSub:** Kanal yayınları/VOD'ları için resmî RSS veya WebSub **belgede yok**. Yalnızca geliştirici değişiklik günlüğünün RSS'i var [RESMÎ].
- **iCalendar:** Kanalın planlı yayın takvimi iCal olarak çekilebilir (takvime "yakında yayın" eklemek için) [RESMÎ*].

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Canlı yayın başladı | **Evet** | EventSub `stream.online` (v1, koşul `broadcaster_user_id`, yetki gerekmez) | App (Webhook/Conduit) | En kritik olay; kanal başına maliyet 1 [RESMÎ] |
| Canlı yayın bitti | **Evet** | EventSub `stream.offline` (v1; 26.06.2026'dan beri `id` alanı da var) | App | [RESMÎ] |
| Başlık / kategori / dil değişti | **Evet** | EventSub `channel.update` (v2, yetki gerekmez) | App | Anahtar kelime filtresi başlık üzerinden yapılabilir [RESMÎ] |
| Raid (başka kanala izleyici gönderme) | **Evet** | `channel.raid` (`from_` veya `to_broadcaster_user_id`, yetki yok) | App | [RESMÎ] |
| Yedek / doğrulama: kim canlı? | **Evet** | `GET /streams?user_login=...` (100 kanal/istek) periyodik yoklama | App | EventSub kaçırmalarına karşı mutabakat (reconciliation) için [TAHMİN — önerilen mimari] |
| Yeni VOD / klip | Kısmen | `GET /videos`, `GET /clips` yoklama | App | Yeni VOD/klip için EventSub türü **belgede yok**; yoklama gerekir [RESMÎ — tür listesinde yok] |
| Planlı yayınlar | **Evet** | `GET /schedule` veya iCal | App / kimliksiz | [RESMÎ*] |
| Sohbet mesajları (anahtar kelime) | **Evet** | `channel.chat.message` (EventSub) veya IRC | User (`user:read:chat`) / app + `user:bot` + `channel:bot` veya moderatörlük | Kendi hesabınla okuma: hesap başına eşzamanlı 100 sohbet odası sınırı (15.05.2024'ten beri); app token + EventSub ile JOIN limitleri uygulanmaz [RESMÎ] |
| Duyuru, abone, hediye vb. sohbet bildirimleri | Evet | `channel.chat.notification` | Sohbet okumayla aynı | 2026'da yeni alt türler eklendi (`modiversary`, `gifted_drops_summary`…) [RESMÎ] |
| Takipçi kazanımı | Yalnızca yetkiyle | `channel.follow` (v2, `moderator:read:followers`) | User (yayıncı/moderatör) | Başkasının kanalı için alınamaz [RESMÎ] |
| Abonelik, Bits, reklam arası, hype train | Yalnızca yayıncı izniyle | `channel.subscribe`, `channel.bits.use`, `channel.ad_break.begin`, `channel.hype_train.*` (v2) | User | Hype Train v1 deprecated (13.06.2025) [RESMÎ] |
| Fısıltı (whisper) / DM | Yalnızca kendi hesabın | `user.whisper.message` | User | Başkalarının özel mesajı alınamaz [TAHMİN — tür adı bilinen; ayrıntı bu oturumda okunamadı] |
| Filtreleme / önem sıralama | Uygulama tarafında | Başlık, kategori (`category_id`), dil, etiket, izleyici sayısı alanlarına kural | — | Twitch tarafında sunucu taraflı filtre yok; kendi kural motorun gerekir [TAHMİN] |

**Önerilen mimari [TAHMİN]:** login → ID (`GET /users`) → her kanal için `stream.online` + `stream.offline` + `channel.update` Webhook/Conduit aboneliği (app token) → olayı kuyruğa yaz, 2XX dön → `message_id` ile tekilleştir → kurallarla filtrele → bildir. Ek olarak birkaç dakikada bir `GET /streams` ile toplu mutabakat. Kanal sayısı arttıkça `max_total_cost` kotası sınır olur; kota artırımı için resmî başvuru süreci **belgede yok**.

## Hız sınırları ve fiyatlar

- **Ücret:** API ve EventSub için ücret **belgede yok**; ücretsiz kullanılıyor [RESMÎ — fiyatlandırma tanımı yok].
- **Helix (token bucket)** [RESMÎ]: istek başına varsayılan maliyet 1 puan; app istekleri ve user istekleri için ayrı bucket; user token'larda sınır "client ID + kullanıcı + dakika" başına. Bucket boyutu belgede sayı olarak verilmiyor, örnek başlıkta **800**. Aşınca `429`; bekleme süresi için `Ratelimit-Reset` (Unix zamanı). Başlıklar: `Ratelimit-Limit`, `Ratelimit-Remaining`, `Ratelimit-Reset`. Bazı uç noktaların kendi sınırı vardır (ör. `Send Chat Message` ayrı bucket) [RESMÎ].
- **EventSub** [RESMÎ]: WebSocket 3 bağlantı × 300 abonelik, `max_total_cost` 10; Webhook örneklerinde `max_total_cost` 10000; aynı tür+koşul için 3 abonelik; Conduit 5 etkin conduit.
- **Sohbet** [RESMÎ]:

| Hesap | Mesaj | JOIN | Kimlik doğrulama (yalnız IRC) |
|---|---|---|---|
| Normal | 20 / 30 sn (yayıncı/mod/VIP olduğun kanalda 100 / 30 sn); kanal başına 1 mesaj/sn | 20 / 10 sn | 20 / 10 sn |
| Doğrulanmış bot | 7.500 / 30 sn; ayrıcalıksız kanalda 1 mesaj/sn | 2.000 / 10 sn | 200 / 10 sn |

  Aşılırsa bot mesajları **1 saat yok sayılır** (yayıncı/mod/VIP olunan sohbetler hariç) [RESMÎ].

## Resmî olmayan yollar ve riskler

| Yol | Nasıl çalışır | Risk |
|---|---|---|
| **`gql.twitch.tv/gql`** (sitenin GraphQL API'si) | Twitch web sitesinin kendi Client-ID'si ve son yıllarda `Client-Integrity` token'ı ile istek atılır; Helix'te olmayan verileri (ör. bazı oynatıcı/öneri verileri) verir. `twitch-gql`, `twitch-integrity` gibi npm paketleri var [3. TARAF] | Belgelenmemiş, her an değişebilir/bozulabilir. Forumlarda Geliştirici Sözleşmesi'ndeki tersine mühendislik yasağına aykırı olabileceği belirtiliyor; başka uygulamanın Client-ID'sini kullanmak uygunsuz kabul ediliyor [3. TARAF]. Twitch'in resmî açıklaması bulunamadı |
| **Kimliksiz IRC okuma** (`justinfan12345` gibi nick, `PASS` olmadan) | Herkese açık sohbetleri salt okunur izleme [3. TARAF] | Resmî IRC belgesinde **anlatılmıyor**; her an kapatılabilir. Yeni projede EventSub tercih edilmeli |
| **`usher.ttvnw.net` HLS oynatma listeleri** | `streamlink`, `yt-dlp` gibi araçlar GQL'den oynatma token'ı alıp `.m3u8` akışını çeker; "yayın var mı" kontrolü veya kayıt için kullanılır [3. TARAF] | Belgelenmemiş; yayın kaydetme telif ve Twitch Kullanım Koşulları açısından ayrıca risklidir |
| **Eski Kraken (v5) ve özel `/api` uç noktaları** | Eski kodlarda görülür | Kraken kapatıldı; özel `/api` uç noktaları 3. taraf Client-ID'lerine `410 Gone` döndü [3. TARAF] — **kullanılmaz** |
| **PubSub** | Eski gerçek zamanlı kanal | 14.04.2025'te kalıcı olarak kapatıldı (15.04.2025'te deprecated işaretlendi) [RESMÎ] — **çalışmıyor** |
| **3. taraf istatistik/sarmalayıcı servisler** (ör. DecAPI, TwitchTracker, SullyGnome, Streams Charts) | Kendi toplama altyapılarıyla geçmiş istatistik/basit uç nokta sunarlar [3. TARAF] | Kendi koşulları ve sınırları geçerli; veri doğruluğu/sürekliliği garanti değil [TAHMİN] |

Genel değerlendirme [TAHMİN]: Twitch'te takip için gereken olayların neredeyse tamamı resmî ve ücretsiz olarak alınabildiğinden, resmî olmayan yollara ihtiyaç diğer platformlara göre çok azdır. Hukuki/ToS ayrıntısı için [Twitch Developer Services Agreement](https://legal.twitch.com/en/legal/developer-agreement/) bizzat okunmalı (bu oturumda sayfa metni araçla alınamadı).

## SDK ve kütüphaneler

Twitch'in resmî bir istemci SDK'sı yok; resmî araç **Twitch CLI**'dır [RESMÎ].

| Dil | Kütüphane | Not |
|---|---|---|
| Araç | **Twitch CLI** (`twitch token`, `twitch api`, `twitch mock-api`, `twitch event`) | Token alma, API çağrısı, sahte (mock) API, webhook/WebSocket olay tetikleyerek test [RESMÎ] |
| .NET | **TwitchLib.Api** | Helix istemcisi; son kararlı 3.10.2 (01.11.2025), netstandard2.0 / net8.0 / net9.0 [3. TARAF — NuGet] |
| .NET | **TwitchLib.EventSub.Websockets** | EventSub WebSocket istemcisi; son kararlı 0.8.0 (22.11.2025), önizleme 0.9.0 (30.06.2026); net8/9/10 + netstandard [3. TARAF — NuGet] |
| .NET | TwitchLib.Client, TwitchLib.EventSub.Webhooks | IRC sohbet istemcisi ve ASP.NET Core webhook alıcısı [3. TARAF] — sürümler bu oturumda doğrulanmadı |
| JS/TS | **Twurple** (`@twurple/api`, `auth`, `chat`, `eventsub-http`, `eventsub-ws`) | En kapsamlı JS kütüphanesi [3. TARAF] |
| Python | `twitchAPI` (pyTwitchAPI), `TwitchIO` | Helix + EventSub; TwitchIO bot odaklı [3. TARAF] |
| Java | Twitch4J | [3. TARAF] |
| Go | `nicklaw5/helix` | [3. TARAF] |
| Rust | `twitch_api` | [3. TARAF] |

Sürüm numarası verilmeyenler bu oturumda doğrulanmadı; kurmadan önce paket deposuna bak.

## Postman / OpenAPI / koleksiyonlar

- **Resmî OpenAPI veya Postman koleksiyonu belgede yok.** Resmî test aracı Twitch CLI'nın `mock-api` ve `event` komutlarıdır [RESMÎ].
- Topluluk: resmî referans sayfasından üretilen OpenAPI şemaları (ör. GitHub'da "twitch-api-swagger" adlı proje) ve apis.io üzerindeki Twitch API aynası [3. TARAF]. Resmî belgeyle senkron olmayabilir.

## Depoda ilgili sayfalar

- [Canlı yayın ve video API'leri — bu klasör](./) — diğer canlı yayın/video platformları (YouTube, Kick vb.)
- [Sosyal medya API'leri](../Sosyal-Medya/) — ör. [X (Twitter)](../Sosyal-Medya/X-Twitter.md), [Bluesky](../Sosyal-Medya/Bluesky.md)
- [Mesajlaşma API'leri](../Mesajlasma/) — takip bildirimlerini iletmek için ([Telegram](../Mesajlasma/Telegram.md), [Slack](../Mesajlasma/Slack.md))
- [Mesajlaşma altyapıları rehberi](../../Rehberler/Mesajlasma-Altyapilari/)
- [C# / .NET](../../Programlama/CSharp-DotNet/) — TwitchLib ile örnek proje açılırsa buraya konur

## Kaynaklar

Resmî:

- [Twitch API Guide](https://dev.twitch.tv/docs/api/guide/) — taban adres, başlıklar, token bucket hız sınırı, sayfalama — (erişim: 15 Ekim 2026)
- [Twitch API Reference](https://dev.twitch.tv/docs/api/reference/) — tüm Helix uç noktaları; [Get Streams](https://dev.twitch.tv/docs/api/reference/#get-streams) (100 değer sınırı), [Get Chatters](https://dev.twitch.tv/docs/api/reference/#get-chatters) (token koşulları) — (erişim: 15 Ekim 2026)
- [Authentication](https://dev.twitch.tv/docs/authentication/) — token türleri ve OAuth akışları — (erişim: 15 Ekim 2026)
- [Getting OAuth Access Tokens](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/) — Client Credentials, Authorization Code, Implicit, Device Code; refresh token kuralları — (erişim: 15 Ekim 2026)
- [Refreshing Access Tokens](https://dev.twitch.tv/docs/authentication/refresh-tokens/) — Confidential istemcide refresh token süresiz, Public istemcide 30 gün; yeni refresh token'ı saklama — (erişim: 15 Ekim 2026)
- [Validating Tokens](https://dev.twitch.tv/docs/authentication/validate-tokens/) — saatlik doğrulama zorunluluğu — (erişim: 15 Ekim 2026)
- [EventSub](https://dev.twitch.tv/docs/eventsub/) — genel bakış, en-az-bir-kez teslim, tekrar saldırısı önlemi — (erişim: 15 Ekim 2026)
- [Managing EventSub Subscriptions](https://dev.twitch.tv/docs/eventsub/manage-subscriptions/) — maliyet kuralı, WebSocket limitleri, token gereksinimi — (erişim: 15 Ekim 2026)
- [Handling Webhook Events](https://dev.twitch.tv/docs/eventsub/handling-webhook-events/) — challenge, HMAC imza, revocation — (erişim: 15 Ekim 2026)
- [Handling WebSocket Events](https://dev.twitch.tv/docs/eventsub/handling-websocket-events/) — welcome, keepalive, reconnect, kapanış kodları — (erişim: 15 Ekim 2026)
- [Handling Conduit Events](https://dev.twitch.tv/docs/eventsub/handling-conduit-events/) — conduit/shard yapısı ve limitleri — (erişim: 15 Ekim 2026)
- [EventSub Subscription Types](https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/) — olay türleri, sürümler, gereken scope'lar — (erişim: 15 Ekim 2026)
- [Chat & Chatbots](https://dev.twitch.tv/docs/chat/) — önerilen sohbet yolu, sohbet hız sınırları, bot doğrulama durumu — (erişim: 15 Ekim 2026)
- [IRC Concepts](https://dev.twitch.tv/docs/chat/irc/) — IRC adresleri, PASS/NICK, CAP, PING/PONG — (erişim: 15 Ekim 2026)
- [Twitch CLI](https://dev.twitch.tv/docs/cli/) — resmî test ve token aracı — (erişim: 15 Ekim 2026)
- [Developer Change Log](https://dev.twitch.tv/docs/change-log/) — 2025–2026 değişiklikleri (PubSub, Hype Train v1, IRC ws://, conduit shard notu) — (erişim: 15 Ekim 2026)
- [Twitch Developer Services Agreement](https://legal.twitch.com/en/legal/developer-agreement/) — kullanım koşulları (metin bu oturumda araçla okunamadı) — (erişim: 15 Ekim 2026)

3. taraf:

- [NuGet — TwitchLib.Api](https://www.nuget.org/packages/TwitchLib.Api) — .NET Helix istemcisi sürüm bilgisi — (erişim: 15 Ekim 2026)
- [NuGet — TwitchLib.EventSub.Websockets](https://www.nuget.org/packages/TwitchLib.EventSub.Websockets) — .NET EventSub WebSocket istemcisi — (erişim: 15 Ekim 2026)
- [Twurple](https://twurple.js.org/) — JS/TS kütüphane ailesi — (erişim: 15 Ekim 2026)
- [Twitch Dev Forum — Bulk Live Detection](https://discuss.dev.twitch.tv/t/bulk-live-detection/45398) — `Get Streams` ile 100 kanal toplu canlılık kontrolü — (erişim: 15 Ekim 2026)
- [Twitch Dev Forum — Legacy PubSub Deprecation and Shutdown Timeline](https://discuss.dev.twitch.com/t/legacy-pubsub-deprecation-and-shutdown-timeline/58043) — Twitch personelinin duyurusu: PubSub 14.04.2025 18:00 UTC'de kapatıldı — (erişim: 15 Ekim 2026)
- [Twitch Dev Forum — gql.twitch.tv kullanımı yasal mı](https://discuss.dev.twitch.com/t/is-it-legal-to-use-https-gql-twitch-tv-gql-endpoint/21811) — GQL'nin resmî olmadığına dair topluluk görüşleri — (erişim: 15 Ekim 2026)
- [Twitch Dev Forum — özel /api 410 Gone](https://discuss.dev.twitch.tv/t/410-gone-when-requesting-private-api-api-namespace-with-3rd-party-client-id/23060) — özel uç noktaların 3. taraf Client-ID'lerine kapatılması — (erişim: 15 Ekim 2026)
- [apis.io — Twitch Streams API](https://apis.io/apis/twitch/twitch-streams-api/) — topluluk OpenAPI aynası — (erişim: 15 Ekim 2026)

[← Üst klasör](./)
