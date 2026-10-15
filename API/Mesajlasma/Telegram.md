# Telegram API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif

## Özet

Telegram'ın iki ayrı geliştirici yüzü var. Birincisi **Bot API**: HTTPS/JSON, BotFather'dan alınan token ile çalışır ve ücretsizdir. Bot yalnızca eklendiği sohbetleri görür, geçmişi okuyamaz. İstisna, Bot API 10.0 (8 Mayıs 2026) ile gelen **Guest mode**: bot, üyesi olmadığı bir sohbette yalnızca kendisi anıldığında (@) veya mesajına yanıt verildiğinde o mesajı alır ve tek bir yanıt verebilir. Geçmiş ve üye listesi açılmaz, sonraki mesajlar gelmez [RESMÎ]. İkincisi **MTProto (Telegram API) / TDLib**: `my.telegram.org`'dan alınan `api_id`/`api_hash` ile **kullanıcı hesabı** adına tam istemci gibi çalışır. Üye olunan (ve herkese açık) kanal ve grupların mesajlarını, geçmişini ve aramasını açar; o da ücretsizdir, ama ToS'a ve flood sınırlarına bağlıdır, hesap ban veya dondurma riski taşır. Ayrıca ücretli **Telegram Gateway** var: doğrulama kodu (OTP) gönderir, takip için kullanılmaz. Onay süreci, App Review ya da kurumsal katman yok [RESMÎ].

Bot API'nin temelleri (token, uç nokta tablosu, getUpdates/webhook, klavye, Stars, Gateway ayrıntısı) depoda zaten anlatılıyor: [01-telegram-bot-api.html](../../Rehberler/Mesajlasma-Altyapilari/01-telegram-bot-api.html). Bu sayfa onu tekrar etmez. **Takip** ve **kullanıcı API'si** tarafına odaklanır.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey; tarayıcı | Herkese açık kanalların web önizlemesi `https://t.me/s/<kanal>` (son gönderiler HTML olarak) | Ücretsiz. Resmî bir API değil. Belgelenmiş limit yok [3. TARAF] |
| Bot (geliştirici hesabı yerine) | Bir Telegram hesabı + @BotFather → token | Bot API: botun **üye olduğu** sohbetlerde yeni mesajlar, kanal gönderileri (bot yönetici ise), servis mesajları. Guest mode (10.0): üyesi olmadığı sohbette yalnız anıldığı/yanıtlandığı mesajı alır, tek yanıt verir; geçmiş/üye listesi yok | Ücretsiz. Gönderim ~30 msj/sn (toplu), 20 msj/dk (grup) [RESMÎ] |
| Kullanıcı API (MTProto / TDLib) | Telefon numaralı Telegram hesabı + `my.telegram.org` → `api_id` + `api_hash`. Numara başına tek `api_id` [RESMÎ] | Hesabın gördüğü her şey: kanal/grup geçmişi (`messages.getHistory`), arama, herkese açık kanala katılmadan okuma, hikâyeler, canlı yayın durumu | Ücretsiz. Dinamik flood sınırları (`FLOOD_WAIT_X`). En çok 500 kanal/süper grup, Premium ile 1000 [RESMÎ] |
| Premium (kullanıcı) | Telegram Premium aboneliği | Bazı limitler ikiye katlanır (kanal sayısı, klasör sayısı). Global gönderi araması (`channels.searchPosts`) için günlük ücretsiz kota, sonrası Stars ile | Abonelik ücreti uygulama içi. Arama başına Stars ücreti dinamik, belgede sabit rakam yok [RESMÎ] |
| İşletme / partner onayı | — | Telegram'da App Review veya Business Verification benzeri bir onay katmanı **yok** [RESMÎ — belgede böyle bir süreç yok]. Telegram Business (işletme hesabına bot bağlama) uygulama içi bir özellik | — |
| Ücretli / kurumsal | Fragment üzerinden ön ödemeli bakiye | **Telegram Gateway** (OTP gönderimi, kod başı 0,01 USD). Bot API ücretli toplu gönderim (30 msj/sn üstü, mesaj başı 0,1 Star; koşul: ≥100.000 Star bakiye ve ≥100.000 aylık aktif kullanıcı) | Ayrıntı: depodaki sayfanın § 10 ve § 12 bölümleri |
| Resmî olmayan | — | `t.me/s/` HTML'ini kazıma, RSSHub `/telegram/channel/:username` rotası, toplu hesap ("userbot çiftliği") | ToS ve ban riski. Aşağıda "Resmî olmayan yollar" |

> Not: Kullanıcı API'si, adına "resmî olmayan istemci" dense de **resmî ve belgelenmiş** bir API'dir. Telethon, WTelegramClient gibi kütüphaneler üçüncü taraftır ama resmî protokolü kullanır [RESMÎ]. Riski ToS ve kötüye kullanım tespiti belirler.

## Kimlik doğrulama

**Bot API** [RESMÎ]
- `https://api.telegram.org/bot<TOKEN>/<METOT>`. Token BotFather'dan alınır. Ayrıntı depodaki sayfanın § 2 bölümünde.
- Webhook kullanılıyorsa `secret_token` başlığıyla (`X-Telegram-Bot-Api-Secret-Token`) gelen isteğin Telegram'dan geldiği doğrulanır.

**MTProto kullanıcı API'si** [RESMÎ]
1. Resmî bir uygulamayla hesap aç. `my.telegram.org` → "API development tools" → form → `api_id` (sayı) + `api_hash` (metin) alınır.
2. Giriş akışı:
   - `auth.sendCode` → kod Telegram uygulamasına veya SMS ile gelir.
   - `auth.signIn` ile kod gönderilir.
   - 2FA açıksa `SESSION_PASSWORD_NEEDED` döner, ardından `auth.checkPassword` (SRP).
   - Alternatif: QR ile giriş (`auth.exportLoginToken`).
3. Başarılı girişten sonra **oturum dosyası** (auth key) saklanır. Kütüphaneler bunu `*.session` (Telethon/Pyrogram) veya `WTelegram.session` (WTelegramClient) olarak tutar. Bu dosyayı ele geçiren, hesabı şifresiz kullanır: token gibi korunmalı, depoya konmamalıdır.
4. Bot da MTProto ile bağlanabilir (`auth.importBotAuthorization`, bot token ile). Ama bot kısıtları sürer: örneğin `messages.getHistory` ve `messages.search` için belge "Only users can use this method" der.

**Open-source örnek `api_id`'ler** test içindir. Yayına çıkan uygulamada `API_ID_PUBLISHED_FLOOD` hatası verir; her uygulama kendi `api_id`'sini almalıdır [RESMÎ].

**TDLib**: aynı `api_id`/`api_hash` + telefon/kod/2FA akışını kendi durum makinesiyle (`authorizationState…`) yönetir. Yerel bir veritabanı tutar [RESMÎ].

## Temel uç noktalar

Bot API metot tablosu depodaki sayfanın § 3 bölümünde. Aşağıdaki tablo **takip** için önemli olanlar, ağırlıklı olarak MTProto.

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET/POST | Bot API `getUpdates` | Yeni güncellemeleri uzun yoklama (long polling) ile çeker | Bot | Güncellemeler en fazla 24 saat tutulur. `chat_member`, `message_reaction`, `message_reaction_count` varsayılan olarak gelmez, `allowed_updates` ile istenir [RESMÎ] |
| POST | Bot API `setWebhook` | Güncellemeleri HTTPS adresine iter | Bot | Ayrıntı depodaki sayfanın § 5 bölümünde |
| RPC | `contacts.resolveUsername` | `@kullaniciadi` → peer (kanal/kullanıcı) kimliği ve `access_hash` | Kullanıcı + bot | Sık çağrılınca flood'a girer. Sonucu önbelleğe al [RESMÎ: hatalar `USERNAME_INVALID`, `USERNAME_NOT_OCCUPIED`; flood eşiği belgede yok] |
| RPC | `channels.joinChannel` | Kanala/süper gruba katılır | Yalnız kullanıcı | `CHANNELS_TOO_MUCH` = 500/1000 sınırı [RESMÎ] |
| RPC | `messages.getHistory` | Bir sohbetin mesaj geçmişi (yeniden eskiye) | Yalnız kullanıcı | Sayfalı (`offset_id`, `limit` genellikle 1–100, 0 verilirse ~20) [RESMÎ, `api/offsets`] |
| RPC | `channels.getMessages` | Kanaldaki belirli ID'li mesajları getirir | Kullanıcı + bot | Botun geçmişe erişebildiği tek dar yol: ID'yi bilmek gerekir [RESMÎ] |
| RPC | `messages.search` | Tek sohbet içinde metin/filtre araması (`filter`: Url, Photo, Document, Pinned…; `min_date`/`max_date`, `from_id`) | Yalnız kullanıcı | Sunucu tarafı anahtar kelime filtresi [RESMÎ] |
| RPC | `messages.searchGlobal` | Hesabın sohbetleri genelinde arama (`broadcasts_only`, `groups_only`, `folder_id`) | Kullanıcı | [RESMÎ] |
| RPC | `channels.searchPosts` | **Üye olunmayanlar dahil** tüm herkese açık kanallarda hashtag (`hashtag`) **veya** tam metin (`query`) araması | Yalnız kullanıcı. `PREMIUM_ACCOUNT_REQUIRED` (403) hatası tanımlı ama hangi durumda döndüğü belgede yazmıyor | **Hashtag**: belgede Premium/Stars şartı yok. **Tam metin**: Premium'a günlük ücretsiz kota (`channels.checkSearchPostsFlood` → `total_daily`, `remains`, `wait_till`), sonrası `allow_paid_stars` ile Stars [RESMÎ]. Premium olmayanların ödeyerek kullanıp kullanamayacağı belgede net değil [BELİRSİZ] |
| RPC | `updates.getDifference` / `updates.getChannelDifference` | Kaçırılan güncellemeleri `pts` ile tamamlar | Kullanıcı (+ bot) | Kanal için sayfa limiti 10–100 önerilir [RESMÎ] |
| RPC | `channels.getFullChannel` | Kanal ayrıntısı: bağlı tartışma grubu, aktif çağrı/yayın (`call`), üye sayısı | Kullanıcı + bot | [RESMÎ] |
| RPC | `phone.getGroupCall` | Görüntülü sohbet / canlı yayın (livestream) bilgisi ve katılımcılar | Kullanıcı | [RESMÎ] |
| RPC | `messages.getDiscussionMessage` / `messages.getReplies` | Kanal gönderisinin yorum dizisi (bağlı tartışma grubundaki thread) | Kullanıcı | [RESMÎ] |
| RPC | `stories.getPeerStories` | Bir kişi/kanalın aktif hikâyeleri | Kullanıcı | [RESMÎ] |
| RPC | `messages.getMessagesViews` | Kanal gönderisinin görüntülenme sayısını alır. `increment=true` verilirse mesajı görüldü işaretler ve sayacı artırır; takip için `increment=false` kullan | Kullanıcı | Sahte görüntülenme şişirme yasak, kalıcı ban sebebi [RESMÎ] |
| RPC | `account.initTakeoutSession` + `invokeWithTakeout` | Kullanıcının kendi verisini dışa aktarma oturumu | Kullanıcı | Toplu geçmiş çekmede flood sınırlarını gevşettiği topluluk tarafından söylenir; resmî sayfada bu iddia **yok** [3. TARAF] |

Tam listeler:
- Bot API: <https://core.telegram.org/bots/api>
- MTProto metotları: <https://core.telegram.org/methods>
- TDLib: <https://core.telegram.org/tdlib/docs/>

**Sürüm durumu:**
- Bot API **10.3** (24 Ağustos 2026) [RESMÎ].
- `core.telegram.org/schema` sayfası **Layer 225** gösteriyor. WTelegramClient 4.4.9 sürüm notu ise "Layer 229" diyor [ÇELİŞKİLİ — doküman sayfası istemci kütüphanelerinin gerisinde kalabiliyor].

## Gerçek zamanlı / bildirim

| Yol | Ne var | Nasıl |
|---|---|---|
| Bot API long polling | `getUpdates?timeout=…` | Dışa kapalı sunucuda çalışır. Webhook ile aynı anda kullanılamaz [RESMÎ] |
| Bot API webhook | HTTPS POST | `setWebhook`, `secret_token`, `allowed_updates`. Yerel Bot API sunucusunda HTTP ve her port kullanılabilir [RESMÎ] |
| MTProto push | Kalıcı TCP/WebSocket bağlantısı üzerinden sunucu güncelleme iter (`updateNewChannelMessage`, `updateEditChannelMessage`, `updateGroupCall`…) | İstemci bağlanıp bir API çağrısı yapınca (ör. `updates.getState`) güncellemeler başlar. Kütüphaneler bunu olay (event) olarak verir: Telethon `events.NewMessage`, WTelegramClient `OnUpdates` [RESMÎ] |
| Boşluk doldurma | `pts`/`qts`/`seq` | Bağlantı koparsa `getDifference`/`getChannelDifference`. Büyük kanallarda `updateChannelTooLong` gelince sayfalı çekilir [RESMÎ] |
| RSS | Resmî RSS **yok** [RESMÎ — belgede yok] | Topluluk: RSSHub `/telegram/channel/:username` (herkese açık kanallar) [3. TARAF] |
| WebSub | Yok [belgede yok] | — |

**Önemli uyarı** [RESMÎ, `api/updates`]: API, üye olunan kanallar için "genellikle" pasif güncelleme gönderir. Bazı kanallarda az veya hiç güncelleme gelmeyebilir. Belge, istemcilerin `getChannelDifference` kısa yoklamasını yalnızca kullanıcının **o an açık tuttuğu** kanallar için yapmasını ve aynı anda yoklanan kanal/süper grup sayısını **en çok 10** ile sınırlamasını ister ("limit to 10 the maximum number of channels/supergroups short-polled"); kanal kapanınca yoklama bırakılır. Katılınmamış herkese açık kanallar için güncelleme ancak istemci yoklama yapıyorsa gelir.

→ Takip uygulamasında **push'a tek başına güvenme**, ama yüzlerce kanalı sürekli yoklamak da belgedeki 10 kanal önerisini aşar ve flood/kötüye kullanım tespiti riskini artırır. Pratik denge: üye olunan kanallarda push'a güven; boşluk şüphesinde (bağlantı kopması, uzun sessizlik) `getChannelDifference` veya `getHistory(min_id=son_id)` ile **seyrek ve sınırlı** (aynı anda ≤10 kanal) yoklama yap [TAHMİN — resmî belgedeki kuraldan çıkarım].

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Yönettiğin kanalda yeni gönderi | Evet | Bot kanala yönetici olarak eklenir → `channel_post` / `edited_channel_post` güncellemesi | Bot | Bot kanala yalnız yönetici olarak eklenebilir [RESMÎ] |
| **Başkasının** herkese açık kanalında yeni gönderi | Bot ile **hayır**; kullanıcı API ile evet | MTProto: kanala katıl ve push + yoklama, ya da katılmadan `getHistory` yoklaması | Kullanıcı | Bot, ekleyenin yetkisi olmadan kanala giremez. Guest mode (10.0) takip için **kullanılamaz**: yalnız bot anıldığında/yanıtlandığında tek mesaj gelir, geçmiş ve sonraki mesajlar gelmez. En çok 500/1000 kanal [RESMÎ] |
| Herkese açık kanal, hesapsız | Kısmen | `t.me/s/<kanal>` HTML yoklaması veya RSSHub | Resmî olmayan | Kırılgan. Rate-limit ve yapı değişikliği riski [3. TARAF] |
| Grup mesajları (bot üye) | Evet, koşullu | Privacy mode **açıkken** yalnız komutlar, bota yanıtlar ve botla gönderilen mesajlar gelir. Hepsi için: botu **yönetici** yap ya da BotFather `/setprivacy` → Disable (sonra botu gruba **yeniden ekle**) | Bot | Servis mesajları her zaman gelir [RESMÎ] |
| Başka botların mesajları | Kısmen | Varsayılan olarak bot, bot mesajını görmez. 10.0 ile gelen bot-to-bot kipi + bahsetme/yanıt/yönetici koşulu gerekir | Bot | Bots FAQ hâlâ "kipten bağımsız göremez" diyor, Features sayfası istisnaları anlatıyor [ÇELİŞKİLİ] |
| Grup/kanal geçmişi (eski mesajlar) | Bot: hayır. Kullanıcı: evet | `messages.getHistory`, `messages.search` | Kullanıcı | Bot API'de geçmiş okuma metodu yok. `channels.getMessages` yalnız ID biliniyorsa [RESMÎ] |
| Özel (davetli) grup/kanal | Evet, üyeysen | Kullanıcı hesabı davet bağlantısıyla katılır (`messages.importChatInvite`) | Kullanıcı | Grup sahibinin rızası ve KVKK/GDPR açısından dikkat [TAHMİN] |
| Canlı yayın / görüntülü sohbet başladı | Evet | MTProto: `updateGroupCall`. `channel.call_active` bayrağı ("group call or livestream is currently active"). Bot API: kanal veya grup servis mesajı `video_chat_started` | Kullanıcı / bot (üye+yönetici) | Bayrak `call_not_empty` = içeride biri var [RESMÎ] |
| Kanal gönderisine yorum | Evet | Bağlı tartışma grubu: `messages.getReplies` / `getDiscussionMessage`. Bot tartışma grubuna eklenirse mesaj olarak alır | Kullanıcı / bot | [RESMÎ] |
| Tepki (reaction) değişimi | Evet | Bot API `message_reaction`, `message_reaction_count` | Bot (yönetici + `allowed_updates`) | Sayım birkaç dakika gecikebilir [RESMÎ] |
| Üye katılma/ayrılma | Evet | Bot API `chat_member` | Bot (yönetici + `allowed_updates`) | [RESMÎ] |
| Hikâye (story) paylaşıldı | Evet | `stories.getPeerStories` yoklaması, `updateStory` | Kullanıcı | [RESMÎ] |
| Kişinin çevrimiçi/son görülme durumu | Teknik olarak kısmen | `updateUserStatus` | Kullanıcı | Gizlilik ayarına bağlı. Bu durumu bozmak/gizlemek ToS ihlali. Kişi izleme etik/hukuki risk taşır [RESMÎ + TAHMİN] |
| Anahtar kelime filtresi | Evet | İstemci tarafında: gelen metin üzerinde regex/anahtar kelime/yapay zekâ sınıflandırma. Sunucu tarafında: `messages.search` (tek sohbet), `channels.searchPosts` (tüm herkese açık kanallar; hashtag araması için belgede Premium şartı yok, tam metin araması Premium kotası/Stars) | Kullanıcı | ToS §1.5: Telegram verisine yapay zekâ/ML modellerini eğitmek, ince ayar yapmak ya da benzer teknolojileri geliştirmek, iyileştirmek veya kullanıma sokmak (deploy) amacıyla erişmek ve onu biriktirmek yasak; ayrıca ayrı "Content Licensing and AI Scraping" şartlarına bağlı. Toplanan veriyi yapay zekâyla sınıflandırmak (inference) bu kapsama girebilir, **riskli**; regex/anahtar kelime filtresi daha güvenli [RESMÎ] |
| Mesaj düzenlendi/silindi | Düzenleme evet, silme kısmen | `edited_channel_post`, `updateEditChannelMessage`, `updateDeleteChannelMessages` (yalnız ID döner) | Bot / kullanıcı | Silinen içeriği görmek için önceden saklamak gerekir [RESMÎ] |

**Önerilen mimari (durum → seçim):**
- Takip edilecek kanalların **sahibi/yöneticisi sensen** → Bot API yeterli, risk en düşük.
- **Başkalarının herkese açık kanalları**, birkaç yüz kanala kadar → tek kullanıcı hesabı + MTProto (WTelegramClient / Telethon). Push + yoklama hibrit, sonuçlar veritabanına, filtreleme istemci tarafında.
- **500 kanalın üstü** → Premium (1000) ya da birden çok hesap. Çok hesaplı yapı kötüye kullanım tespitine daha açıktır [TAHMİN]. Önce ihtiyaç gerçekten bu kadar mı, netleştir.
- **Hesap açmak istemiyorsan** ve az sayıda herkese açık kanal varsa → `t.me/s/` / RSSHub (resmî değil, kırılgan).

## Hız sınırları ve fiyatlar

| Kapsam | Sınır | Kaynak |
|---|---|---|
| Bot gönderim | ~1 msj/sn (sohbet), 20 msj/dk (grup), ~30 msj/sn (toplu). Ücretli kip 1000 msj/sn'ye kadar, 30/sn üstü mesaj başı 0,1 Star (koşul: ≥100.000 Star bakiye ve ≥100.000 aylık aktif kullanıcı; yalnız başarıyla teslim edilen mesaj ücretlenir) | [RESMÎ] Bots FAQ. Ayrıntı depodaki sayfanın § 10 bölümünde |
| Bot okuma | Belgelenmiş sabit okuma limiti yok. `getUpdates` güncellemeleri 24 saat tutar | [RESMÎ] |
| MTProto genel | Sabit tablo **yayınlanmaz**. Aşılınca `420 FLOOD_WAIT_X` (X saniye bekle). `FLOOD_PREMIUM_WAIT_X` (Premium ile kalkan bekleme) | [RESMÎ] `api/errors` |
| Kanal/süper grup üyeliği | 500 (Premium 1000) | [RESMÎ] `api/config` → `channels_limit_default/premium` |
| Klasör | 10 klasör × 100 sohbet (Premium 30 × 200) | [RESMÎ] `api/config` |
| `getHistory` sayfa | `limit` genellikle 1–100 mesaj/istek, 0 verilirse ~20 | [RESMÎ] `api/offsets` |
| `resolveUsername` | Günlük ~200 civarı çözümleme sonrası uzun FLOOD_WAIT bildiren topluluk raporları var | [3. TARAF / TAHMİN — resmî sayı yok] |
| Global gönderi araması | Tam metin: Premium'a günlük ücretsiz kota, sonrası arama başına Stars. Hashtag: belgede kota/ücret yok. Premium olmayanların ödeyerek araması belirsiz | [RESMÎ] sayı belgede yok; Premium dışı durum [BELİRSİZ] |
| Bot API / MTProto kullanım ücreti | Ücretsiz | [RESMÎ] |
| Telegram Gateway | Teslim edilen kod başı 0,01 USD | [RESMÎ] Ayrıntı depodaki sayfanın § 12 bölümünde |

**Pratik kural** [TAHMİN]: `FLOOD_WAIT`'e uy, saniyeyi bekle, paralel isteği azalt, `resolveUsername` sonuçlarını (`id` + `access_hash`) kalıcı sakla, yoklama aralığını kanal başına dakikalar seviyesinde tut.

## Resmî olmayan yollar ve riskler

| Yol | Nasıl çalışır | Risk |
|---|---|---|
| Userbot (kullanıcı hesabını kodla sürmek) | MTProto kütüphanesiyle normal hesap otomatikleştirilir | API resmî, ama hesap ToS'a bağlı. Belge: flood, spam, sahte abone/görüntülenme şişirme → "**kalıcı ban**". Resmî olmayan istemciyle giriş yapan hesaplar "otomatik olarak gözlem altına alınır" [RESMÎ] |
| API ToS (istemci uygulamalar) | — | Uygulamanın kendi `api_id`'si olmalı. Adında "Telegram" ancak önünde "Unofficial" varsa geçer. Resmî logo yasak. Okundu bilgisini veya son görülmeyi sahteleme ("ghost mode") yasak. Kullanıcı adına rızasız işlem yasak. **§1.5: Telegram verisine yapay zekâ/ML eğitmek, ince ayar yapmak ya da benzer teknolojileri geliştirmek, iyileştirmek veya kullanıma sokmak (deploy) amacıyla erişmek ve biriktirmek yasak**; ayrıca "Content Licensing and AI Scraping" şartları geçerli. Yapay zekâ ile sınıflandırma da bu kapsama girebilir. Kanal içeriği gösteren istemci resmî sponsorlu mesajları desteklemeli. İhlalde 10 gün düzeltme süresi, sonra API erişimi kesilir [RESMÎ] |
| Hesap dondurma (2025'ten beri) | Kural ihlali şüphesinde hesap salt okunur olur, bazı metotlar `FROZEN_METHOD_INVALID` (420) döner. Dondurulan hesap, itiraz yapılıp kabul edilmezse belirli bir süre sonra **silinir**. `help.getAppConfig` → `freeze_since_date`, `freeze_until_date` (silinme tarihi), `freeze_appeal_url` | [RESMÎ] mekanizma ve silinme. İtirazın @SpamBot üzerinden işleyişi [3. TARAF] |
| Ban itirazı | `recover@telegram.org` (insan inceler; otomatik e-postalar banlanır) | [RESMÎ] |
| Sanal/geçici numarayla toplu hesap | Çok hesapla 500 kanal sınırını aşmak | Kötüye kullanım tespitine en açık yol. Numara geri dönüştürülürse hesap kaybı [TAHMİN] |
| `t.me/s/<kanal>` kazıma | Herkese açık önizleme HTML'i ayrıştırılır (RSSHub, tgfeed vb.) | Belgelenmemiş. Yapı habersiz değişebilir, IP bazlı kısıt olabilir [3. TARAF] |
| Hazır "Telegram scraper" servisleri | Arka planda kullanıcı hesabı havuzları | Veri kaynağı ve hukuki dayanak belirsiz [TAHMİN] |
| Hukuki | Grup üyelerinin kişisel verisini (ad, kullanıcı adı, telefon) toplayıp saklamak | KVKK/GDPR kapsamına girer: amaç sınırlaması, saklama süresi, aydınlatma. Yalnız gerekli alanı tut [TAHMİN — hukuki görüş değil] |

## SDK ve kütüphaneler

**Resmî**
- **TDLib** (C++, JSON arayüzü, Java/JNI ve C++/CLI üzerinden C# bağlamaları). Hem kullanıcı hem bot. Kendi veritabanı ve güncelleme mantığını yönetir, boşluk doldurmayı sen yazmazsın. <https://core.telegram.org/tdlib>, <https://github.com/tdlib/td> [RESMÎ]
- **telegram-bot-api** (yerel Bot API sunucusu, TDLib tabanlı): 2000 MB yükleme, sınırsız indirme. <https://github.com/tdlib/telegram-bot-api> [RESMÎ]

**Topluluk: MTProto kullanıcı API'si**

| Kütüphane | Dil | Durum (15 Ekim 2026) | Not |
|---|---|---|---|
| **WTelegramClient** | C# / .NET | 4.4.9 (26.09.2026), MIT, .NET Standard 2.0 / .NET 5+ | %100 C#. Tüm MTProto metotları. `Client.OnUpdates` olayı. Telegram API'yi doğrudan yansıtan sınıflar (`Messages_GetHistory` vb.) [RESMÎ — NuGet] |
| **TDLib .NET bağlamaları** (TdLib, `tdlib.native`) | C# | Topluluk paketleri | TDLib'in hazır derlenmiş ikilisini sarar [3. TARAF] |
| **Telethon** | Python (asyncio) | 1.45.0 (10.09.2026), MIT | v1 "büyük ölçüde bakım modunda": yeni katmanlar ve hata düzeltmeleri geliyor [RESMÎ — PyPI] |
| **Pyrogram** | Python | **Arşivlendi (23.12.2024)**, bakım yok | Yerine bakımı süren çatal **Kurigram** (`pip install kurigram`, birebir ikame) [3. TARAF] |
| **GramJS** (`npm i telegram`) | JavaScript/TypeScript (Node + tarayıcı) | 2.26.22 (npm, Temmuz 2026) | Telethon'dan türetilmiş [3. TARAF — npm kaydı] |
| **gotd/td** | Go | Topluluk | [3. TARAF] |
| **grammers** | Rust | Topluluk | [3. TARAF] |
| **MadelineProto** | PHP | Topluluk | [3. TARAF] |

**Topluluk: Bot API**
- **Telegram.Bot** (.NET): 22.10.3.3 (09.10.2026), Bot API 10.3, MIT [RESMÎ — NuGet].
- **WTelegramBot** (.NET): Bot API arayüzünü MTProto üzerinden sunar. Bot ile `channels.getMessages` gibi MTProto'ya özgü metotlara erişim sağlar [3. TARAF].
- python-telegram-bot, aiogram (Python); grammY, Telegraf (JS/TS).

## Postman / OpenAPI / koleksiyonlar

- Bot API için **resmî OpenAPI veya Postman koleksiyonu yok** [RESMÎ — belgede yok]. Topluluk koleksiyonları Postman Public API Network'te "Telegram Bot API" adıyla aranabilir [3. TARAF]. Sürüm takibi için resmî HTML referansı esas alınmalı.
- MTProto bir HTTP/REST API değildir, OpenAPI karşılığı yoktur. Makine tarafından okunabilir şema **TL** dilinde yayımlanır: <https://core.telegram.org/schema> (JSON: <https://core.telegram.org/schema/json>). Ayrıca her metot sayfasının `.md` sürümü bulunur [RESMÎ].
- Hata kodları veritabanı: <https://core.telegram.org/api/errors> [RESMÎ].

## Depoda ilgili sayfalar

- [Telegram Bot API rehberi (HTML)](../../Rehberler/Mesajlasma-Altyapilari/01-telegram-bot-api.html): Token, uç noktalar, webhook, klavye, C# örnekleri, sınırlar, Gateway, Stars.
- [Mesajlaşma Altyapıları](../../Rehberler/Mesajlasma-Altyapilari/): Telegram, WhatsApp, BiP, SMS karşılaştırması.

## Kaynaklar

Resmî:
- <https://core.telegram.org/bots/api> — Bot API referansı (10.3, Update nesnesi, getUpdates 24 saat) — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/bots/features> — Privacy mode, kanal mesajları, bot-to-bot kipi, Guest mode — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/bots/faq> — Gönderim hız sınırları, ücretli toplu gönderim koşulları, bot mesajlarının görünürlüğü — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/api/obtaining_api_id> — `api_id`/`api_hash` alma, numara başına tek `api_id`, kalıcı ban uyarısı — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/api/terms> — Telegram API kullanım şartları (ToS), §1.5 yapay zekâ/veri biriktirme yasağı — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/api/auth> — Giriş akışı, 2FA, QR, dondurulmuş hesaplar (silinme, `freeze_until_date`) — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/api/updates> — Güncelleme mekanizması, pts/qts/seq, kanal güncellemeleri uyarısı, en çok 10 kanal kısa yoklama kuralı — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/api/errors> — FLOOD_WAIT, FLOOD_PREMIUM_WAIT, 401/406 hataları — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/api/config> — Kanal, klasör ve Premium limitleri (client configuration) — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/api/search> — `messages.search`, `searchGlobal`, `channels.searchPosts` ve kotası — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/api/offsets> — Sayfalama, `limit` genellikle 1–100 (0 → ~20) — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/method/messages.getMessagesViews> — `increment` parametresi — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/method/channels.searchPosts> — hashtag/tam metin kipleri, `allow_paid_stars`, hatalar — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/api/takeout> — Takeout (dışa aktarma) oturumu — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/api/discussion> — Kanal yorumları / tartışma grubu — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/constructor/channel> — `call_active`, `call_not_empty` bayrakları — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/methods> — MTProto metot listesi — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/schema> — TL şeması (Layer 225 görünüyor) — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/tdlib> — TDLib tanıtımı — (erişim: 15 Ekim 2026)
- <https://core.telegram.org/gateway> — Telegram Gateway — (erişim: 15 Ekim 2026)

Paket kayıtları ve 3. taraf:
- <https://www.nuget.org/packages/WTelegramClient> — WTelegramClient 4.4.9, Layer 229 — (erişim: 15 Ekim 2026)
- <https://www.nuget.org/packages/Telegram.Bot> — Telegram.Bot 22.10.3.3, Bot API 10.3 — (erişim: 15 Ekim 2026)
- <https://pypi.org/project/Telethon/> — Telethon 1.45.0, bakım modu notu — (erişim: 15 Ekim 2026)
- <https://github.com/pyrogram/pyrogram> — Pyrogram arşiv durumu — (erişim: 15 Ekim 2026)
- <https://github.com/KurimuzonAkuma/kurigram> — Kurigram (Pyrogram çatalı) — (erişim: 15 Ekim 2026)
- <https://github.com/gram-js/gramjs> — GramJS; npm `telegram` 2.26.22 — (erişim: 15 Ekim 2026)
- <https://docs.rsshub.app/> — RSSHub, `/telegram/channel/:username` rotası — (erişim: 15 Ekim 2026)
- <https://tginfo.me/?p=8786> — Dondurulmuş hesap ve itiraz süreci (topluluk) — (erişim: 15 Ekim 2026)
