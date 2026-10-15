# Discord API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (resmî API ücretsiz; mesaj okumak için bot sunucuda olmalı, mesaj içeriği privileged intent'e bağlı)

## Özet

Discord, geliştiricilere **REST API (v10)**, gerçek zamanlı olaylar için **Gateway (WebSocket)**, kanala mesaj göndermek için **webhook'lar**, slash komutları için **Interactions** (HTTP veya Gateway) ve sınırlı kapsamlı **Webhook Events** (giden HTTP olayları) sunar [RESMÎ]. API'yi kullanmak için Developer Portal'da bir uygulama (application) ve onun **bot kullanıcısı** açılır; bot ancak **eklendiği sunucuların** kanallarını, yetkisi olduğu ölçüde görebilir [RESMÎ]. Mesajların metnini (`content`, `embeds`, `attachments`…) almak **MESSAGE_CONTENT** privileged intent'ini gerektirir; Haziran 2026'dan beri 10.000 kullanıcıya ulaşan uygulamalar bu intent için başvuru yapmak zorundadır [RESMÎ]. API kullanımı ücretsizdir; ücretli bir API katmanı belgede yok [RESMÎ — belgede yok]. Normal kullanıcı hesabını (user token) otomatikleştirmek ("self-bot") Discord kurallarına aykırıdır ve hesap kapatma sebebidir [RESMÎ — destek makalesi; bkz. Riskler].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey (veya yalnızca webhook URL'si) | **Webhook çalıştırma** (`POST /webhooks/{id}/{token}`): token'ı bilen herkes kanala mesaj yazar, okuyamaz [RESMÎ]. **Guild widget** (`/guilds/{id}/widget.json`, sunucuda widget açıksa): çevrimiçi sayısı, en fazla 100 anonimleştirilmiş üye, @everyone'a açık ses/stage kanalları, davet [RESMÎ]; `widget.json`'ın kimlik isteyip istemediği belgede net değil, `widget.png` için "kimlik gerekmez" yazıyor [RESMÎ]. Resmî RSS **yok** (belgede yok) | Ücretsiz; webhook için ayrı sayısal limit belgede yok, rotaya göre bucket [RESMÎ] |
| Geliştirici hesabı / uygulama | Discord hesabı + Developer Portal'da uygulama, bot token; botun bir sunucu yöneticisi tarafından `bot` scope'u ile eklenmesi [RESMÎ] | REST API, Gateway; standart intent'ler (GUILDS, GUILD_MESSAGES, GUILD_VOICE_STATES, GUILD_SCHEDULED_EVENTS…). **10.000 kullanıcının altındaki** uygulamalar privileged intent'leri (MESSAGE_CONTENT, GUILD_MEMBERS, GUILD_PRESENCES) Portal'dan kendileri açabilir [RESMÎ]. OAuth2 ile kullanıcı adına `identify`, `guilds` vb. | Ücretsiz; global 50 istek/sn, Gateway 120 olay/60 sn [RESMÎ] |
| İşletme / uygulama onayı | **Privileged Intent Review**: uygulama 10.000 kullanıcıya ulaşınca başvuru (90 gün süre), her intent için kullanım gerekçesi, veri saklama/güvenlik açıklaması, yıllık yeniden onay [RESMÎ]. **App Verification**: Haziran 2026'dan beri intent incelemesinden ayrı bir süreç [RESMÎ]. `rpc` scope'u yalnızca onaylı partnerlere açık [RESMÎ] | 10k+ kullanıcıda privileged intent'lerin sürmesi; yerel istemci kontrolü (RPC) | Ücretsiz; büyük botlarda (150.000+ sunucu) artırılmış oturum limiti [RESMÎ] |
| Ücretli / kurumsal | — | Ücretli API katmanı belgede yok [RESMÎ — belgede yok]. Ücretli olan, uygulamanın **kendi kullanıcılarına** satış yapmasını sağlayan Monetization (SKU/Entitlement) altyapısıdır; erişim seviyesi değildir [RESMÎ] | — |
| Resmî olmayan | Kullanıcı hesabının token'ı (self-bot), tarayıcı/istemci trafiğinin taklidi, "discord.js-selfbot" türü kütüphaneler | Botun eklenmediği sunucuları, DM'leri, kullanıcının gördüğü her şeyi okuma | ToS ihlali; hesap kapatma (aşağıya bkz.) |

> **Not (iki ayrı süreç):** Gateway sayfası iki kuralı birlikte verir: "doğrulanmış uygulamalar (100+ sunucuda doğrulama zorunlu) intent'ler için doğrulama sonrası ayrıca onay almalı" ve "10.000'den fazla tekil kullanıcıya ulaşan uygulamalar erişimi korumak için inceleme başvurusu yapmalı" [RESMÎ]. Change log (10.06.2026) **App Verification** ile **Privileged Intent incelemesinin** artık ayrı süreçler olduğunu yazar [RESMÎ]. Yani intent incelemesi 10.000 kullanıcı eşiğine bağlıdır; 100+ sunucu kuralı App Verification'a aittir. App Verification'ın ayrıntıları bu tarihte okunamadı (destek-geliştirici sitesi 403 döndü).

## Kimlik doğrulama

- **Bot token** — Developer Portal → Bot sekmesi. Her REST isteğinde `Authorization: Bot <TOKEN>`; Gateway'de `IDENTIFY` yükünde `token` [RESMÎ]. Gizli tutulmalı; 24 saatte 1.000 IDENTIFY sınırı aşılırsa tüm oturumlar kapanır ve **token sıfırlanır** [RESMÎ].
- **OAuth2** — Yetkilendirme `https://discord.com/oauth2/authorize`, token `https://discord.com/api/oauth2/token`, iptal `.../token/revoke` (yalnızca `application/x-www-form-urlencoded`) [RESMÎ]. Kullanıcı adına çağrılarda `Authorization: Bearer <TOKEN>`.
  - `bot`: botu kullanıcının seçtiği sunucuya ekler (bot ekleme bağlantısı bu scope ile üretilir) [RESMÎ].
  - `applications.commands`: komut ekleme (`bot` ile varsayılan gelir) [RESMÎ].
  - `identify`, `guilds`: kullanıcının profili / üye olduğu sunucuların temel bilgisi — **mesaj okumaz** [RESMÎ].
  - `messages.read`: yalnızca yerel RPC sunucusu üzerinden; aksi hâlde uygulamanın kendi oluşturduğu kanallarla sınırlı [RESMÎ].
  - `rpc`: yalnızca onaylı partnerler [RESMÎ].
- **Webhook token** — Webhook URL'sinin içindeki `{token}`; token'lı uç noktalar kimlik doğrulama istemez [RESMÎ].
- **Interactions / Webhook Events imzası** — HTTP ile gelen isteklerde `X-Signature-Ed25519` ve `X-Signature-Timestamp` başlıkları uygulamanın public key'i ile doğrulanır; geçersizse `401` döndürülmelidir [RESMÎ].

Temel adresler: REST `https://discord.com/api/v10`, Gateway `wss://gateway.discord.gg/?v=10&encoding=json` (URL'yi `GET /gateway/bot` ile almak önerilir) [RESMÎ]. Intent'ler v8 ve üzerinde zorunludur [RESMÎ].

## Temel uç noktalar

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/gateway/bot` | Gateway URL'si, önerilen shard sayısı, `session_start_limit` (`total`, `remaining`, `reset_after`, `max_concurrency`) | Geliştirici | [RESMÎ] |
| GET | `/users/@me/guilds` | Botun bulunduğu sunucular | Geliştirici | Eylül 2026'dan beri büyük botlarda `shard` parametresi zorunlu, yoksa `400` [RESMÎ] |
| GET | `/guilds/{guild.id}/channels` | Sunucunun kanalları | Geliştirici | 16 Kasım 2026'dan itibaren botun göremediği kanallar listelenmeyecek [RESMÎ] |
| GET | `/channels/{channel.id}/messages` | Kanal geçmişi (yeniden eskiye); `before`/`after`/`around` (birbirini dışlar), `limit` 1–100 (vars. 50) | Geliştirici (bot sunucuda) | `VIEW_CHANNEL` + `READ_MESSAGE_HISTORY` gerekir; ikincisi yoksa boş döner. İçerik alanları MESSAGE_CONTENT'e bağlı [RESMÎ] |
| GET | `/channels/{channel.id}/messages/{message.id}` | Tek mesaj | Geliştirici | [RESMÎ] |
| GET | `/guilds/{guild.id}/messages/search` | **Sunucuda mesaj arama**: `content` (≤1024 karakter), `author_id`, `channel_id`, `mentions`, `mentions_role_id`, `replied_to_user_id`, `has`, `pinned` vb. filtreler; `slop`; `limit` 1–25, `offset` ≤9975; `sort_by` timestamp/relevance, `sort_order` | Geliştirici + `READ_MESSAGE_HISTORY` izni + MESSAGE_CONTENT intent | Mart 2026'da belgelendi. İndekslenmemiş sunucuda `202 Accepted`; gövde: `"Index not yet available"` mesajı, hata kodu `110000`, `documents_indexed`, `retry_after` (bu süre sonra yeniden dene; `0` ise kısa bir beklemeden sonra) [RESMÎ] |
| POST | `/channels/{channel.id}/messages` | Mesaj gönder | Geliştirici | Takip uygulamasında bildirim çıkışı için [RESMÎ] |
| POST | `/channels/{channel.id}/messages/{message.id}/crosspost` | Duyuru kanalındaki mesajı takipçi kanallara yayınla | Geliştirici | [RESMÎ] |
| POST | `/channels/{channel.id}/followers` | **Duyuru kanalını takip et**: kaynak duyuru kanalının (tip 5, `GUILD_ANNOUNCEMENT`) mesajları hedef kanala webhook ile düşer | Geliştirici | Hedef kanalda `MANAGE_WEBHOOKS`; yanıt `channel_id` + `webhook_id` [RESMÎ] |
| GET | `/guilds/{guild.id}/scheduled-events` | Planlı etkinlikler (Stage/Ses/Harici), `with_user_count` | Geliştirici | Durum `ACTIVE` = başladı [RESMÎ] |
| GET | `/guilds/{guild.id}/widget.json` | Çevrimiçi sayısı, ≤100 anonim üye, davet | Herkese açık (widget açıksa) | Kimlik gereksinimi belgede net değil [RESMÎ] |
| GET | `/guilds/{guild.id}/preview` | Sunucu önizlemesi | Geliştirici | Bot üye değilse sunucu `DISCOVERABLE` olmalı [RESMÎ] |
| POST | `/channels/{channel.id}/webhooks` | Webhook oluştur | Geliştirici | `MANAGE_WEBHOOKS` [RESMÎ] |
| POST | `/webhooks/{id}/{token}` | Webhook ile mesaj yaz (`wait=true` → oluşan mesajı döndürür, `thread_id`) | Herkese açık (token ile) | Forum/medya kanalında `thread_id` veya `thread_name` zorunlu [RESMÎ] |
| POST | `/webhooks/{id}/{token}/slack` · `/github` | Slack/GitHub uyumlu yük kabul eder (GitHub repo webhook'unun "Payload URL"si olarak) | Herkese açık (token ile) | GitHub: `push`, `pull_request`, `issues`, `release` vb. [RESMÎ] |

Tam liste: resmî referans (docs.discord.com/developers) ve OpenAPI spec (aşağıda).

## Gerçek zamanlı / bildirim

| Mekanizma | Ne var | Nasıl |
|---|---|---|
| **Gateway (WebSocket)** | Tüm sunucu olayları: `MESSAGE_CREATE/UPDATE/DELETE`, `THREAD_CREATE`, `STAGE_INSTANCE_CREATE` (Stage "canlı"), `VOICE_STATE_UPDATE`, `GUILD_SCHEDULED_EVENT_*`, `PRESENCE_UPDATE`, `AUTO_MODERATION_ACTION_EXECUTION`… [RESMÎ] | `IDENTIFY` ile `intents` bit maskesi gönderilir; yalnızca seçilen intent'lerin olayları gelir. Geçersiz intent → `4013`, onaysız privileged intent → `4014` ile bağlantı kapanır [RESMÎ]. 2.500 sunucuda **sharding zorunlu** (`shard_id = (guild_id >> 22) % num_shards`; DM olayları yalnızca shard 0'a) [RESMÎ] |
| **Interactions (HTTP)** | Slash komutu, buton, modal, context menu | Portal'da "Interactions Endpoint URL"; Gateway bağlantısı gerektirmez ama Gateway ile **birbirini dışlar**. İlk yanıt 3 sn içinde, token 15 dk geçerli [RESMÎ]. **Normal kanal mesajları HTTP ile gelmez** — belgede böyle bir teslim yok |
| **Webhook Events** (giden HTTP) | Yalnızca: `APPLICATION_AUTHORIZED/DEAUTHORIZED`, `ENTITLEMENT_*`, `QUEST_USER_ENROLLMENT` (şu an alınamıyor), Social SDK lobi/oyun DM mesajları [RESMÎ] | Portal → Webhooks → Endpoint; `PING` (tip 0) için `204`; 3 sn içinde `204`, yoksa 10 dk boyunca üstel geri çekilmeyle tekrar. Gerçek zamanlı ve sıralı **değildir** [RESMÎ]. **Sunucu/kanal mesajlarını kapsamaz** [RESMÎ] |
| **Gelen webhook** | Dışarıdan kanala mesaj yazma | Takip uygulamasının **çıkışı** için ideal: filtrelenen olayı kendi sunucunda bir kanala basmak [RESMÎ] |
| **Duyuru kanalı takibi** | Başka sunucunun duyuru kanalı → kendi kanalın | `POST /channels/{id}/followers` veya istemcideki "Follow" düğmesi; mesajlar hedefte webhook mesajı olarak görünür, botun bu kanalı Gateway'den dinlemesi yeterli [RESMÎ — kanal tipi tanımı; istemci akışı 3. TARAF] |
| **RSS / WebSub** | Yok | Belgede yok [RESMÎ — belgede yok] |

### Gateway intent'leri (takip için seçilmiş)

| Intent | Bit | Olaylar | Ayrıcalıklı mı |
|---|---|---|---|
| `GUILDS` | `1 << 0` | Sunucu/kanal/rol, `THREAD_*`, `STAGE_INSTANCE_*`, `VOICE_CHANNEL_STATUS_UPDATE` | Hayır |
| `GUILD_MEMBERS` | `1 << 1` | Üye katıldı/ayrıldı/güncellendi | **Evet** |
| `GUILD_VOICE_STATES` | `1 << 7` | `VOICE_STATE_UPDATE` (içinde `self_stream` = Go Live, `self_video` = kamera) | Hayır |
| `GUILD_PRESENCES` | `1 << 8` | `PRESENCE_UPDATE` (aktiviteler; tip 1 "Streaming" yalnızca twitch.tv / youtube.com URL'si) | **Evet** |
| `GUILD_MESSAGES` | `1 << 9` | `MESSAGE_CREATE/UPDATE/DELETE/DELETE_BULK` | Hayır (içerik için MESSAGE_CONTENT) |
| `DIRECT_MESSAGES` | `1 << 12` | Bota gelen DM'ler | Hayır |
| `MESSAGE_CONTENT` | `1 << 15` | Olay üretmez; içerik alanlarını doldurur | **Evet** |
| `GUILD_SCHEDULED_EVENTS` | `1 << 16` | `GUILD_SCHEDULED_EVENT_CREATE/UPDATE/DELETE/USER_ADD/USER_REMOVE` | Hayır |
| `AUTO_MODERATION_EXECUTION` | `1 << 21` | AutoMod kuralı tetiklenince | Hayır |
| `GUILD_MESSAGE_POLLS` | `1 << 24` | Anket oyları | Hayır |

Kaynak: Gateway sayfası [RESMÎ]. **MESSAGE_CONTENT olmadan** `content`, `embeds`, `attachments`, `components`, `poll` boş gelir; istisnalar: botun kendi mesajları, bota gelen DM'ler, **botun etiketlendiği** mesajlar ve message context menu komutunun hedef mesajı [RESMÎ].

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Kendi/yönettiğin sunucuda yeni mesaj | Evet | Gateway `MESSAGE_CREATE` (GUILD_MESSAGES) | Geliştirici | Metin için MESSAGE_CONTENT; <10k kullanıcıda Portal'dan açılır [RESMÎ] |
| **Botun eklenmediği** sunucudaki mesajlar | Resmî yoldan **hayır** | — (yalnızca self-bot, yasak) | Resmî olmayan | Sunucu yöneticisi botu eklemeden okuma yolu yok [RESMÎ] |
| Başka sunucunun **duyuru** kanalı | Evet (dolaylı) | Duyuru kanalını kendi sunucuna takip ettir → botun kendi kanalını dinler | Geliştirici | Yalnızca `GUILD_ANNOUNCEMENT` kanalları; kaynakta takip için o sunucuya üye olmak gerekir [TAHMİN — istemci davranışı] |
| Anahtar kelime / filtre | Evet | Gelen olayı uygulamada filtrele; geçmiş için `GET /guilds/{id}/messages/search?content=` | Geliştirici + `READ_MESSAGE_HISTORY` izni + MESSAGE_CONTENT | Arama: istek başı ≤25 sonuç [RESMÎ]. Alternatif: sunucuda **AutoMod** anahtar kelime kuralı + `AUTO_MODERATION_EXECUTION` (yönetici yetkisi gerekir) [RESMÎ] |
| Discord içi "canlı yayın" (Go Live) | Evet | `VOICE_STATE_UPDATE` → `self_stream: true` | Geliştirici (GUILD_VOICE_STATES) | Yalnızca botun olduğu sunucudaki ses kanalları [RESMÎ] |
| Stage etkinliği başladı | Evet | `STAGE_INSTANCE_CREATE` (GUILDS) | Geliştirici | [RESMÎ] |
| Planlı etkinlik başladı | Evet | `GUILD_SCHEDULED_EVENT_UPDATE` → durum `ACTIVE` | Geliştirici | Harici etkinlikler başlangıç saatinde otomatik ACTIVE olur [RESMÎ] |
| Üyenin Twitch/YouTube yayını | Kısmen | `PRESENCE_UPDATE` aktivite tipi 1 (Streaming) | Privileged (GUILD_PRESENCES) | Yalnızca kullanıcı Discord'a bağlıysa ve botla ortak sunucudaysa; kesin canlı tespiti için Twitch/YouTube API'leri daha güvenilir [TAHMİN] |
| Yeni thread / forum gönderisi | Evet | `THREAD_CREATE` (`newly_created`) | Geliştirici | [RESMÎ] |
| Yorum / tepki | Evet | `MESSAGE_REACTION_ADD`, thread mesajları | Geliştirici | [RESMÎ] |
| Kişisel DM'ler / grup DM'ler | **Hayır** | — | — | Bot yalnızca **kendisine** gelen DM'leri görür [RESMÎ] |
| Takip sonucu bildirimi (çıkış) | Evet | Gelen webhook veya bot mesajı | Herkese açık / geliştirici | Diğer platformlardan (X, Twitch, GitHub) gelen filtrelenmiş olaylar Discord'a basılabilir; GitHub için `/github` uç noktası [RESMÎ] |

**Uygulama mimarisi önerisi** [TAHMİN]: Discord'u takip uygulamasında iki rolde kullan — (1) **kaynak**: botun bulunduğu sunucular + kendi sunucuna takip ettirilen duyuru kanalları, Gateway ile dinlenir; (2) **çıkış**: filtrelenen önemli olaylar webhook ile özel bir kanala yazılır. Veri saklıyorsan saklama süresini ve amacını baştan belirle; privileged intent incelemesinde bu sorulur [RESMÎ].

## Hız sınırları ve fiyatlar

- **Global**: bot başına **50 istek/sn**; kimlik başlığı yoksa IP başına [RESMÎ]. Interaction uç noktaları global limite tabi değil [RESMÎ].
- **Rota bucket'ları**: `X-RateLimit-Limit`, `-Remaining`, `-Reset`, `-Reset-After`, `-Bucket`; 429'da `X-RateLimit-Global`, `X-RateLimit-Scope`, `Retry-After` [RESMÎ]. Sabit sayılar yerine başlıklara göre davranılmalı.
- **Geçersiz istek**: 10 dakikada **10.000** adet 401/403/429 yanıtı → IP'ye geçici Cloudflare engeli (`X-RateLimit-Scope: shared` olan 429'lar sayılmaz) [RESMÎ]. 404 dönen webhook'u tekrar denemek de geçici kısıtlamaya yol açabilir [RESMÎ].
- **Gateway**: bağlantı başına **120 gönderim/60 sn**; aşılırsa bağlantı kesilir, tekrarlayanlar API erişimini kaybedebilir [RESMÎ]. IDENTIFY: 5 sn'de `max_concurrency` kadar, 24 saatte **1.000** (aşılırsa token sıfırlanır) [RESMÎ].
- **Sharding**: shard başına en fazla 2.500 sunucu [RESMÎ].
- **Dosya yükleme**: varsayılan sınır Eylül 2026'da 10 MiB'tan 20 MiB'a çıktı [RESMÎ].
- **Fiyat**: API ücretsiz; ücretli katman belgede yok [RESMÎ — belgede yok]. Maliyet yalnızca kendi barındırman (bot sürekli açık bir süreç olmalı).

## Resmî olmayan yollar ve riskler

- **Self-bot / user token**: Normal kullanıcı hesabının token'ını tarayıcıdan alıp API'ye veya Gateway'e bağlanmak. Kullanıcının üye olduğu tüm sunucuları ve DM'leri okumayı sağlar; botun eklenmesi veya intent onayı gerekmez.
  - **Kural**: Discord destek makalesi "Automated user accounts (self-bots)" kullanıcı hesaplarının OAuth2/bot API dışında otomatikleştirilmesini yasaklar ve hesap kapatmayla sonuçlanabileceğini söyler [RESMÎ — makale bu tarihte 403 döndüğü için içerik 3. taraf alıntılarından doğrulandı: 3. TARAF].
  - **Kütüphane tarafı**: Discord.Net gibi resmî-dışı ama yaygın kütüphaneler kullanıcı hesabı girişini yıllar önce kaldırdı (2017 civarı "selfbots are not allowed" tartışmaları) [3. TARAF]. npm/PyPI'de "selfbot" adlı paketler bulunur; çoğu bakım dışı veya kötü amaçlı kod (token çalma) riski taşır [TAHMİN].
  - **Riskler**: hesabın kalıcı kapatılması; davranış örüntüsüyle tespit (toplu mesaj, hızlı istekler) iddiası [3. TARAF, doğrulanmadı]; token'ı paylaşmak hesabı tamamen devretmek demektir; okunan mesajları saklamak üyelerin rızası olmadan kişisel veri işlemek olur (KVKK/GDPR açısından ayrı sorun) [TAHMİN].
- **Gateway obfuscation (Kasım 2026)**: botun göremediği kanalların adı `"___hidden___"` olarak gelecek; "izinsiz kanal adlarını toplama" yolları kapanıyor; **16.11.2026'da tüm botlar için zorunlu** [RESMÎ]. Erken test (geçici, isteğe bağlı): Identify `capabilities` alanında `1 << 15` ya da Portal'da Overview > Bot altındaki **Private Channel Obfuscation** anahtarı; HTTP tarafı için erken geçiş yok [RESMÎ].
- **Presence gizliliği (17.09.2026)**: Custom status, kullanıcının profil gizliliği **Friends Only** ise ya da 200'den fazla üyeli sunucuda **Friends & Small Servers Only** ise `PRESENCE_UPDATE` olayının `activities` alanından çıkarılır [RESMÎ]. Yalnızca custom status etkilenir; diğer aktivite tipleri (ör. Streaming) bu ayardan etkilenmez [RESMÎ] — custom status takibine güvenme.
- **Age assurance (22.09.2026)**: Private Profile'lar custom status görünürlüğünü sınırlayabilir; Social SDK tarafında DM'ler daha sık Message Requests'e düşebilir; yaşa kısıtlı Activities yaş grubu onayı isteyebilir, ebeveyn harcama limitleri bazı satın almaları engelleyebilir. Change log'a göre bunlar çalışma anında görülebilecek durumlardır, kod değişikliği gerekmez [RESMÎ].
- **Developer Policy / Developer Terms**: veri toplama, saklama ve üçüncü kişilere aktarma kuralları içerir; bu tarihte sayfalar (support-dev.discord.com) 403 döndürdüğü için madde madde doğrulanamadı — belgede var ama okunamadı. Proje başlamadan önce elle okunmalı.

## SDK ve kütüphaneler

Discord'un resmî bir genel amaçlı bot SDK'sı yok; resmî olan **Discord Social SDK** (oyun içi entegrasyon için, bot değil) [RESMÎ]. Topluluk kütüphaneleri:

| Dil | Kütüphane | Sürüm (15.10.2026) | Not |
|---|---|---|---|
| .NET | **Discord.Net** | 3.20.2 (8 Ekim 2026), net8.0/net9.0/net10.0 | En yaygın .NET kütüphanesi; `DiscordSocketClient` + `GatewayIntents` [3. TARAF — NuGet] |
| .NET | **DSharpPlus** | 4.5.3 kararlı (24 Ağustos 2026); 5.0 nightly | [3. TARAF — NuGet] |
| .NET | **NetCord** | 1.0.0-beta.28 (1 Ekim 2026, ön sürüm) | Modern, hafif; hâlâ beta [3. TARAF — NuGet] |
| JavaScript/TS | **discord.js** | 14.27.0, `engines.node >= 18` | `GatewayIntentBits.MessageContent` vb. [3. TARAF — npm registry] |
| TypeScript | **discord-api-types** | — | Tip tanımları (sürüm doğrulanmadı) [3. TARAF] |
| Python | discord.py | — | Sürüm doğrulanmadı [3. TARAF] |
| Java | JDA | — | Sürüm doğrulanmadı [3. TARAF] |

Discord.Net'te intent örneği (yalnızca bilgi): `new DiscordSocketConfig { GatewayIntents = GatewayIntents.Guilds | GatewayIntents.GuildMessages | GatewayIntents.MessageContent }` — privileged intent Portal'da da açılmazsa bağlantı `4014` ile kapanır [RESMÎ — kapanma kodu].

## Postman / OpenAPI / koleksiyonlar

- **discord/discord-api-spec** (GitHub, MIT): OpenAPI **3.1**, yalnızca API v10; `specs/openapi.json` (kararlı) ve `specs/openapi_preview.json` (deneysel). **Public preview** — "haber verilmeden kırıcı değişiklik olabilir", üretimde kullanılmaması önerilir [RESMÎ]. Postman/Insomnia'ya içe aktarılabilir.
- Resmî Postman koleksiyonu: belgede yok.
- `https://docs.discord.com/llms.txt`: tüm doküman sayfalarının makine-okunur dizini [RESMÎ].

## Depoda ilgili sayfalar

- [Mesajlaşma Altyapıları](../../Rehberler/Mesajlasma-Altyapilari/) — Telegram, WhatsApp, BiP, SMS API'leri.
- Aynı klasördeki diğer mesajlaşma platformu sayfaları (Telegram, Slack, WhatsApp vb.) ve [Sosyal Medya API'leri](../Sosyal-Medya/) — Twitch/YouTube canlı yayın takibi için ilgili platform sayfalarına bakılmalı.

## Kaynaklar

- [Gateway](https://docs.discord.com/developers/events/gateway) — intent listesi, privileged intent'ler, MESSAGE_CONTENT istisnaları, Gateway limitleri, sharding [RESMÎ] — (erişim: 15 Ekim 2026)
- [Gateway Events](https://docs.discord.com/developers/events/gateway-events) — `PRESENCE_UPDATE` (Streaming aktivitesi), `STAGE_INSTANCE_CREATE`, `THREAD_CREATE` [RESMÎ] — (erişim: 15 Ekim 2026)
- [Getting Started with Privileged Intent Review](https://docs.discord.com/developers/gateway/getting-started-with-privileged-intent-review.md) — 10.000 kullanıcı eşiği, başvuru içeriği, yıllık yenileme [RESMÎ] — (erişim: 15 Ekim 2026)
- [Change Log](https://docs.discord.com/developers/change-log.md) — 10.06.2026 intent değişikliği, 19.03.2026 mesaj arama (110000 hata kodu), 12.08.2026 kanal gizleme (erken test anahtarı, 16.11.2026 zorunluluk), 15.09.2026 shard parametresi, 17.09.2026 custom status gizliliği, 22.09.2026 age assurance [RESMÎ] — (erişim: 15 Ekim 2026)
- [Rate Limits](https://docs.discord.com/developers/topics/rate-limits) — global 50/sn, bucket başlıkları, 10.000 geçersiz istek (shared scope 429 istisnası) [RESMÎ] — (erişim: 15 Ekim 2026)
- [Message resource](https://docs.discord.com/developers/resources/message) — Get Channel Messages, Search Guild Messages (izinler, parametreler, 202 yanıtı) [RESMÎ] — (erişim: 15 Ekim 2026)
- [Webhook resource](https://docs.discord.com/developers/resources/webhook) — webhook uç noktaları, Slack/GitHub uyumlu çalıştırma [RESMÎ] — (erişim: 15 Ekim 2026)
- [Webhook Events](https://docs.discord.com/developers/events/webhook-events) — giden HTTP olay türleri ve kurulumu [RESMÎ] — (erişim: 15 Ekim 2026)
- [Channel resource](https://docs.discord.com/developers/resources/channel) — Follow Announcement Channel, kanal tipleri [RESMÎ] — (erişim: 15 Ekim 2026)
- [Guild Scheduled Event](https://docs.discord.com/developers/resources/guild-scheduled-event) — etkinlik tipleri ve durumları [RESMÎ] — (erişim: 15 Ekim 2026)
- [Voice resource](https://docs.discord.com/developers/resources/voice) — `self_stream` (Go Live) alanı [RESMÎ] — (erişim: 15 Ekim 2026)
- [Guild resource](https://docs.discord.com/developers/resources/guild) — widget.json, guild preview [RESMÎ] — (erişim: 15 Ekim 2026)
- [OAuth2](https://docs.discord.com/developers/topics/oauth2) — scope'lar, yetkilendirme/token URL'leri [RESMÎ] — (erişim: 15 Ekim 2026)
- [Receiving and Responding to Interactions](https://docs.discord.com/developers/interactions/receiving-and-responding.md) — 3 sn / 15 dk kuralları, HTTP teslim [RESMÎ] — (erişim: 15 Ekim 2026)
- [Automated user accounts (self-bots)](https://support.discord.com/hc/en-us/articles/115002192352-Automated-user-accounts-self-bots-) — self-bot yasağı [RESMÎ; bu tarihte 403 döndü, içerik 3. taraf alıntılarından] — (erişim: 15 Ekim 2026)
- [Discord Developer Policy](https://support-dev.discord.com/hc/articles/8563934450327-Discord-Developer-Policy) — veri kullanım kuralları [RESMÎ; bu tarihte 403 döndü, okunamadı] — (erişim: 15 Ekim 2026)
- [discord/discord-api-spec](https://github.com/discord/discord-api-spec) — resmî OpenAPI 3.1 spec (public preview) [RESMÎ] — (erişim: 15 Ekim 2026)
- [Discord.Net — NuGet](https://www.nuget.org/packages/Discord.Net) — sürüm 3.20.2 [3. TARAF] — (erişim: 15 Ekim 2026)
- [DSharpPlus — NuGet](https://www.nuget.org/packages/DSharpPlus) — sürüm 4.5.3 [3. TARAF] — (erişim: 15 Ekim 2026)
- [NetCord — NuGet](https://www.nuget.org/packages/NetCord) — sürüm 1.0.0-beta.28 [3. TARAF] — (erişim: 15 Ekim 2026)
- [discord.js — npm registry](https://registry.npmjs.org/discord.js/latest) — sürüm 14.27.0 [3. TARAF] — (erişim: 15 Ekim 2026)

> Not: Bu sayfa hazırlanırken web arama kotası doldu; discord.py/JDA sürümleri ve App Verification ayrıntıları doğrulanamadı.
