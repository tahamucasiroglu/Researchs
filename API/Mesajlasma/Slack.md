# Slack API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **aktif** (ama Marketplace dışı dağıtılan uygulamalar için **kısıtlı**)

## Özet

Slack, bir çalışma alanına (workspace) **kurulan uygulamalar** üzerinden çalışan geniş bir API ailesi sunar: istek-yanıt tabanlı **Web API** (`chat.postMessage`, `conversations.history` …), olayları HTTP ile ileten **Events API**, aynı olayları WebSocket ile ileten **Socket Mode**, yapay zekâ uygulamaları için **Real-time Search (RTS) API** ve **Slack MCP sunucusu**. API'nin kendisi ücretsizdir; ancak her erişim bir çalışma alanına kurulum + OAuth izni (scope) gerektirir — "herkese açık, kimliksiz" bir okuma yolu yoktur [RESMÎ]. 2025'ten itibaren Slack, uygulamaları üç sınıfa ayırıyor: **dahili (internal) uygulama**, **Slack Marketplace'te yayınlanmış uygulama** ve **Marketplace dışı ticari dağıtılan ("unlisted") uygulama**; sonuncusu için `conversations.history`/`conversations.replies` 1 istek/dakika ve 15 kayıtla sınırlandı [RESMÎ]. Eski RTM API yeni (granular) uygulamalarda kullanılamaz [RESMÎ].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | — | **Yok.** Slack içeriği kimliksiz okunamaz; çalışma alanları kapalıdır. [RESMÎ] | — |
| Geliştirici hesabı / uygulama — **dahili (internal) uygulama** | Bir Slack hesabı, api.slack.com/apps'te uygulama oluşturma, uygulamayı **kendi** çalışma alanına kurma (admin onayı gerekebilir) | Web API, Events API, Socket Mode, RTS API, MCP; `conversations.history` Tier 3 (50+/dk), `limit` en çok 999 (metot referansı; 29.05.2025 changelog'u azami ve varsayılanı 1.000 diyor), önerilen ≤200 [RESMÎ] | API ücretsiz; plan sınırları geçerli (ör. ücretsiz planda son 90 günün geçmişi görünür, 1 yıldan eski içerik kalıcı silinir [RESMÎ]) |
| Geliştirici — **Marketplace dışı dağıtılan ("unlisted") uygulama** | OAuth ile başka çalışma alanlarına kurulabilen ama Marketplace onayı olmayan uygulama | Web API ve Events API çalışır; **ama** `conversations.history` ve `conversations.replies` **Tier 1 (1 istek/dk), `limit` en çok 15**; RTS API ve MCP **yasak** [RESMÎ] | Ücretsiz ama pratikte geçmiş okuma işlevsizleşir |
| İşletme / uygulama onayı — **Slack Marketplace** | Marketplace inceleme sürecini (App Review) geçmek | Normal Tier 3 limitler, RTS API, MCP. **Socket Mode kullanan uygulamalar Marketplace'e kabul edilmez** → HTTP Events API şart [RESMÎ] | Başvuru ücretsiz; inceleme süresi belgede sabit değil |
| Ücretli / kurumsal | Enterprise Grid (Enterprise+), org genelinde kurulum | Org genelinde dağıtım, Discovery/Audit Logs API (uyum/eDiscovery), Slack Connect yönetimi, RTS'de semantik arama (Business+/Enterprise+) [RESMÎ — ayrıntılar ilgili sayfalarda; bu belgede derinlemesine doğrulanmadı] | Slack plan ücretleri (kişi başı) |
| Resmî olmayan | Tarayıcı oturum çerezi/tokeni (`xoxc-` + `xoxd-`) | Kullanıcının gördüğü her şey, uygulama kurmadan (ör. slackdump) [3. TARAF] | Ücretsiz; **ToS/şirket politikası riski**, admin'e güvenlik uyarısı düşebilir |

> Not: "Resmî olmayan" satırı bir öneri değil, bilgi amaçlıdır; ayrıntı ve riskler aşağıda.

## Kimlik doğrulama

- **OAuth 2.0 (v2)**: Uygulama `https://slack.com/oauth/v2/authorize` ile kurulur, `oauth.v2.access` ile token alınır. [RESMÎ]
- **Token türleri** [RESMÎ]:
  - `xoxb-` **Bot token** — botun üye olduğu kanallara erişir. Takip için en yaygın tür.
  - `xoxp-` **User token** — kullanıcı adına; kullanıcının dahil olduğu özel konuşmalar + tüm herkese açık kanallar.
  - `xapp-` **App-level token** — Socket Mode bağlantısı (`apps.connections.open`) için; Basic Information sayfasından üretilir.
  - Eski "legacy bot user token"lar yalnız DM/MPDM görür; **legacy custom bot**'lar 31 Mart 2025'te kapatıldı (API çağrıları reddedilir). [RESMÎ]
- **Scope'lar** (granular permissions): mesaj okumak için konuşma türüne göre `channels:history`, `groups:history`, `im:history`, `mpim:history`; listeleme için `channels:read` vb.; RTS için `search:read.public`, `search:read.private`, `search:read.im`, `search:read.mpim`, `search:read.files`, `search:read.users`. [RESMÎ]
- **İstek doğrulama**: Events API isteklerini **Signing Secret** ile imzadan doğrula (`X-Slack-Signature`); eski `token` alanı kullanımdan kalktı. Socket Mode'da bağlantı zaten kimlikli olduğundan imza doğrulaması gerekmez. [RESMÎ]
- **Bot bir kanalı okuyabilmek için o kanalın üyesi olmalı** (bot token ile) — davet edilmesi veya `conversations.join` (herkese açık kanallar) gerekir. [RESMÎ]

## Temel uç noktalar

Taban adres: `https://slack.com/api/<metot>` (HTTP POST/GET, `Authorization: Bearer <token>`).

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `conversations.list` | Kanalları listeler | Uygulama | Tier 2; sayfalı (`cursor`) [RESMÎ] |
| GET | `conversations.history` | Bir kanalın mesaj geçmişi | Uygulama | Dahili/Marketplace: Tier 3 (50+/dk), `limit` ≤999 (metot referansı; changelog 1.000 diyor), önerilen ≤200. **Unlisted: 1/dk, `limit` ≤15** [RESMÎ]. Parametreler: `oldest`, `latest`, `cursor`, `inclusive` |
| GET | `conversations.replies` | Bir mesajın thread yanıtları | Uygulama | `conversations.history` ile aynı kısıt [RESMÎ] |
| GET | `conversations.info` / `conversations.members` | Kanal bilgisi / üyeler | Uygulama | Slack Connect'te `is_ext_shared` vb. alanlar |
| POST | `conversations.join` | Bot herkese açık kanala katılır | Uygulama | `channels:join` scope |
| POST | `chat.postMessage` | Mesaj gönderir (filtre sonucu bildirim) | Uygulama | Özel tier: ~1 mesaj/sn/kanal, kısa patlamalara tolerans var; ayrıca rakamı verilmeyen bir çalışma alanı geneli sınır bulunur [RESMÎ] |
| GET | `users.info` / `users.list` | Kullanıcı bilgisi | Uygulama | Tier 4 / Tier 2 |
| GET | `assistant.search.context` | RTS: mesaj/dosya/kanal/kullanıcı arama (anahtar kelime; uygun planda semantik) | Dahili veya Marketplace | Özel rate limit; **sonuç saklanamaz, eğitimde kullanılamaz** [RESMÎ] |
| GET | `assistant.search.info` | Ekibin arama yeteneklerini döndürür | Dahili veya Marketplace | [RESMÎ] |
| — | `search.messages` / `search.all` | Eski arama (yalnız user token, `search:read`) | Kullanıcı (user token) | Legacy ama aktif (kaldırılmadı); Tier 2 (20+/dk); `count`/`page` en çok 100. Slack yerine RTS `assistant.search.context`'i öneriyor; RTS uygulamalarında kullanılması **yasak** [RESMÎ] |
| POST | `apps.connections.open` | Socket Mode WebSocket URL'si alır | App-level token | Token header'da gönderilir [RESMÎ] |
| GET | `apps.event.authorizations.list` | Bir olayın hangi ekiplere/kurulumlara ait olduğunu verir (Slack Connect) | Uygulama | [RESMÎ] |
| — | `rtm.connect` / `rtm.start` | **Eski RTM API** | Yalnız classic app | Granular uygulamalar kullanamaz [RESMÎ] |

Tam liste: <https://docs.slack.dev/reference/methods>

## Gerçek zamanlı / bildirim

| Yöntem | Durum | Nasıl çalışır |
|---|---|---|
| **Events API (HTTP)** | Aktif, önerilen [RESMÎ] | Slack, abone olunan her olay için Request URL'ye JSON POST eder. Kurulumda `url_verification` doğrulaması. **3 saniye içinde 2xx dön**, işi kuyrukta yap. Başarısızsa 3 tekrar (hemen, 1 dk, 5 dk); başlıklar `x-slack-retry-num`, `x-slack-retry-reason`; `x-slack-no-retry: 1` ile tekrar kapatılabilir. 60 dk içinde teslimatların %95'inden fazlası başarısızsa abonelik geçici kapatılır (saatte <1.000 olay alanlar hariç). İsteğe bağlı "delayed events": 24 saat boyunca saatlik tekrar. |
| **Socket Mode (WebSocket)** | Aktif [RESMÎ] | `xapp-` token ile `apps.connections.open` → `wss://` URL. Herkese açık sunucu gerekmez (yerel/şirket içi için ideal). En çok **10 eşzamanlı bağlantı**; bağlantılar birkaç saatte bir yenilenir (`warning` / `refresh_requested` disconnect). Her mesaj `envelope_id` ile **onaylanmalı** (ack). **Marketplace'e kabul edilmez.** |
| **RTM API** | Eski/legacy [RESMÎ] | Yalnız classic app'lerde. Classic app'lerin kapatılması (16 Kasım 2026 olarak duyurulmuştu) **şimdilik durduruldu** — "paused" [RESMÎ]. Yeni projede kullanılmaz; yerine Events API veya Socket Mode. |
| **Incoming Webhooks** | Aktif | Yalnız **gönderim** (Slack'e mesaj atma); takip için değil, filtre sonucunu bir kanala bildirmek için kullanışlı. |
| **RSS / WebSub** | Yok | Slack içeriği için resmî RSS/WebSub yoktur; tersine, Slack'in RSS uygulaması dış beslemeleri kanala getirir. [TAHMİN — resmî belgede ayrıca doğrulanmadı] |

Önemli olay türleri (Events API): `message.channels` (herkese açık kanal), `message.groups` (özel kanal), `message.im`, `message.mpim`, `app_mention`, `reaction_added`, `channel_created`, `member_joined_channel`, `channel_shared` / `channel_unshared` (Slack Connect), `link_shared`. Olay teslim sınırı: **çalışma alanı + uygulama başına saatte 30.000**; aşılırsa `app_rate_limited` olayı gelir [RESMÎ].

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Kanala yeni mesaj | Evet | Events API / Socket Mode `message.*` | Uygulama + kanal üyeliği | En verimli yol; geçmiş çekmeye gerek bırakmaz → unlisted kısıtından da etkilenmez [RESMÎ çıkarım] |
| Belirli kişinin mesajları | Evet (yalnız uygulamanın gördüğü kanallarda) | Olay akışında `user` alanına göre filtre | Uygulama | Slack'te "kişiyi dışarıdan takip" yoktur; yalnız kurulu çalışma alanı |
| Anahtar kelime / filtreleme | Evet | Gelen olayları kendi kodunda filtrele; ya da RTS `assistant.search.context` | Uygulama / RTS için dahili veya Marketplace | RTS sonuçları **saklanamaz** — takip arşivi kurmak için uygun değil [RESMÎ] |
| Geçmiş mesajları toplu çekme | Kısıtlı | `conversations.history` + `cursor` | Dahili/Marketplace: rahat; **unlisted: 1/dk × 15 kayıt** | Tek kullanıcılı takip aracı → **dahili uygulama** olarak kur [RESMÎ çıkarım] |
| Thread yanıtları | Evet | `message` olayı (`thread_ts` dolu) veya `conversations.replies` | Uygulama | Aynı unlisted kısıtı |
| @bahsetme | Evet | `app_mention` | Uygulama | |
| Tepki (emoji) | Evet | `reaction_added` | Uygulama | |
| DM / özel kanal | Kısmen | `message.im`, `message.groups` | User token veya bot o konuşmada | Kullanıcı izni gerekir; kişisel veri açısından dikkat |
| Slack Connect (dış şirketle paylaşılan kanal) | Evet | Aynı olaylar; `is_ext_shared_channel`, `authorized_users`, `apps.event.authorizations.list` | Uygulama, kanalın en az bir tarafında kurulu | Dış kullanıcıları `is_stranger` ile ayırt et; kopan kanal yeni ID alabilir (`channel_not_found`) [RESMÎ] |
| Canlı yayın / huddle başladı | **Belgede yok** | — | — | Huddle başlangıcı için genel bir olay bulunamadı [belgede yok] |
| Başka (kurulmadığın) çalışma alanını izleme | Hayır (resmî) | — | — | Ancak resmî olmayan oturum token'ı ile — ToS riski |

**Tavsiye edilen mimari**: Tek kişi/ekip için → kendi çalışma alanına **dahili uygulama** + **Socket Mode** (sunucusuz, NAT arkasında çalışır). Başkalarına dağıtılacak ürün → **HTTP Events API** + Marketplace başvurusu (Socket Mode Marketplace'te yasak; unlisted kalırsa geçmiş okuma işlevsiz).

## Hız sınırları ve fiyatlar

- **Tier'lar** (metot × çalışma alanı × uygulama başına, dakikada) [RESMÎ]: Tier 1: 1+ · Tier 2: 20+ · Tier 3: 50+ · Tier 4: 100+ · Special: metoda özel (ör. `chat.postMessage` ~1/sn/kanal).
- Aşımda **HTTP 429** + `Retry-After` (saniye). Yalnız o metot + o çalışma alanı + o token durdurulur. [RESMÎ]
- Events API: saatte 30.000 olay/çalışma alanı/uygulama. [RESMÎ]
- **2025 değişikliği — Marketplace dışı uygulamalar** [RESMÎ]:
  - Etkilenen: ticari olarak Marketplace dışında dağıtılan ("unlisted") uygulamalar; `conversations.history` ve `conversations.replies`.
  - Yeni limit: Tier 1 (**1 istek/dk**), `limit` varsayılan ve azami **15**.
  - **29 Mayıs 2025**'ten sonra oluşturulan unlisted uygulamalar ve mevcut unlisted uygulamaların **yeni kurulumları**: hemen geçerli.
  - Etkilenmeyen: Marketplace uygulamaları, **dahili (customer-built) uygulamalar**.
  - Mevcut unlisted kurulumlar: **etkilenmez** — changelog, `conversations.history` referansı ve rate-limits sayfası "existing installations … are not subject to the new posted limits" diyor [RESMÎ].
    - İkincil not: changelog'un eski sürümlerinde mevcut kurulumlara ileri tarihli (2 Eylül 2025, sonra 3 Mart 2026) uygulama söz konusuydu [3. TARAF, doğrulanamadı]. Bu muafiyet yeni kurulumları kapsamadığından yeni projede yine dahili ya da Marketplace yolunu seç.
  - Aynı duyuruda Slack API Kullanım Şartları (API Terms of Service) da güncellendi: 29.05.2025 ve sonrası oluşturulan uygulamalar için hemen, daha önce oluşturulanlar için **30 Haziran 2025**'te yürürlüğe girdi [RESMÎ]. Değişikliğin API verisinin toplu dışa aktarımı/saklanması ve LLM eğitimine kısıt getirdiği yönündeki özetler [3. TARAF]; ayrıntı için şart metnini oku: <https://slack.com/terms-of-service/api>.
- **Fiyat**: API ücretsiz. Kısıt Slack planından gelir: ücretsiz planda son 90 günün mesaj/dosya geçmişi görünür, 1 yıldan eski içerik kalıcı olarak silinir (ücretli plana geçilse de geri gelmez) [RESMÎ]; RTS semantik arama Business+/Enterprise+ planı ister [RESMÎ].

## Resmî olmayan yollar ve riskler

- **Tarayıcı oturum token'ları (`xoxc-` token + `d` çerezi `xoxd-`)**: Slack web/masaüstü istemcisinin kullandığı oturum bilgisiyle Web API çağrılır; uygulama kurmaya ve admin onayına gerek kalmaz, kullanıcının gördüğü her şey okunabilir. [3. TARAF]
  - **slackdump** (Go, AGPLv3): mesaj/thread/dosya/kullanıcı dışa aktarma, artımlı devam, salt-okunur MCP sunucusu; "EZ-Login" ile tarayıcı oturumu alır. README'nin kendisi uyarır: Slack güvenlik uyarısı tetiklenebilir veya çalışma alanı yöneticisine otomatik erişim bildirilebilir; kurum politikası ve Slack ToS uyumu kullanıcının sorumluluğudur. [3. TARAF]
- **Riskler** (nesnel):
  - Slack Kullanım Şartları ve çoğu şirketin BT politikası, onaysız otomasyon/veri çekmeyi yasaklar → hesap kapatma, iş sözleşmesi/disiplin sorunları olabilir. [TAHMİN — genel değerlendirme]
  - Oturum token'ı tam kullanıcı yetkisidir; sızarsa hesabın tamamı ele geçer.
  - Başkalarının mesajlarını onların bilgisi dışında saklamak KVKK/GDPR açısından kişisel veri işleme sayılır. [TAHMİN — hukuki değerlendirme değil]
  - Slack iç uç noktaları (`client.*`, `xoxc` akışları) belgesizdir, haber vermeden değişebilir.
- **Resmî eşdeğer**: kendi çalışma alanın için dahili uygulama zaten yüksek limitlerle aynı işi görür; resmî olmayan yol yalnız "uygulama kurma yetkim yok" durumunda gündeme gelir.

## SDK ve kütüphaneler

| Dil | Kütüphane | Tür | Not |
|---|---|---|---|
| JavaScript/TypeScript | **Bolt for JavaScript**, `@slack/web-api`, `@slack/socket-mode` (node-slack-sdk) | Resmî | Events + Socket Mode + Web API |
| Python | **Bolt for Python**, `slack_sdk` (python-slack-sdk) | Resmî | |
| Java/Kotlin | **Bolt for Java** (java-slack-sdk) | Resmî | |
| CLI | **Slack CLI** (v4.10.0, 13 Ekim 2026) | Resmî | Proje/manifest yönetimi [RESMÎ] |
| .NET (C#) | **SlackNet** (`SlackNet`, `SlackNet.AspNetCore`, `SlackNet.AzureFunctions`; `SlackNet.Bot` eski RTM için) | Topluluk, MIT | Web API, Events, Socket Mode, interactivity; ASP.NET Core ve DI desteği [3. TARAF]. Resmî .NET SDK yok. |
| .NET (C#) | SlackAPI (Inumedia) | Topluluk | Daha eski; güncelliğini kontrol et [TAHMİN] |
| Go | `slack-go/slack` | Topluluk | Socket Mode dahil [TAHMİN — sürüm doğrulanmadı] |
| MCP | **Slack MCP sunucusu** `https://mcp.slack.com/mcp` | Resmî | Yalnız dahili veya Marketplace uygulamaları; OAuth (confidential), Streamable HTTP; arama, mesaj okuma/gönderme, canvas, list araçları [RESMÎ] |

## Postman / OpenAPI / koleksiyonlar

- **slackapi/slack-api-specs** — Web API için OpenAPI 2.0, Events API için AsyncAPI 1.0 şeması; **27 Mart 2024'te arşivlendi (salt okunur)**, yeni metotları içermez [RESMÎ/GitHub].
- Postman'de Slack Web API koleksiyonları bulunur; resmî/güncel olup olmadığı bu çalışmada doğrulanamadı [belgede yok].
- En güvenilir kaynak doğrudan metot referansıdır: <https://docs.slack.dev/reference/methods>.

## Depoda ilgili sayfalar

- [Telegram API](Telegram.md) — bot ve MTProto ayrımı, takip açısından karşılaştırma için.
- [WhatsApp API](WhatsApp.md) — işletme onaylı mesajlaşma API'si.
- [Mesajlaşma Altyapıları rehberi](../../Rehberler/Mesajlasma-Altyapilari/) — Telegram, WhatsApp, BiP, SMS API'leri.
- [Threads](../Sosyal-Medya/Threads.md), [X (Twitter)](../Sosyal-Medya/X-Twitter.md) — sosyal medya takip API'leri.

## Kaynaklar

Resmî:
- <https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps> — Marketplace dışı uygulamalar için `conversations.history/replies` limit değişikliği; mevcut kurulumların muafiyeti; API ToS yürürlük tarihleri — (erişim: 15 Ekim 2026)
- <https://docs.slack.dev/reference/methods/search.messages> — Legacy arama metodu: Tier 2, user token `search:read`, RTS önerisi — (erişim: 15 Ekim 2026)
- <https://slack.com/help/articles/7050776459923> — Slack planları: ücretsiz planda 90 günlük geçmiş, 1 yıldan eski içeriğin silinmesi — (erişim: 15 Ekim 2026)
- <https://slack.com/terms-of-service/api> — Slack API Kullanım Şartları (güncel metin yürürlük: 10 Ekim 2025) — (erişim: 15 Ekim 2026)
- <https://docs.slack.dev/apis/web-api/rate-limits> — Tier tanımları, 429/Retry-After, Events API 30.000/saat — (erişim: 15 Ekim 2026)
- <https://docs.slack.dev/reference/methods/conversations.history> — Metot referansı, scope'lar, token türleri, limitler — (erişim: 15 Ekim 2026)
- <https://docs.slack.dev/apis/events-api/> — Events API, tekrar politikası, başarısızlıkta devre dışı bırakma — (erişim: 15 Ekim 2026)
- <https://docs.slack.dev/apis/events-api/using-socket-mode> — Socket Mode, 10 bağlantı, Marketplace kısıtı, ack — (erişim: 15 Ekim 2026)
- <https://docs.slack.dev/legacy/legacy-rtm-api> — RTM API'nin eski durumu ve alternatifleri — (erişim: 15 Ekim 2026)
- <https://docs.slack.dev/changelog/2024-09-legacy-custom-bots-classic-apps-deprecation/> — Legacy custom bot kapanışı (31.03.2025), classic app kapanışının durdurulması — (erişim: 15 Ekim 2026)
- <https://docs.slack.dev/apis/web-api/real-time-search-api> — Real-time Search API (eski adı Data Access API), scope'lar, veri saklama yasağı — (erişim: 15 Ekim 2026)
- <https://docs.slack.dev/apis/slack-connect/> — Slack Connect'te uygulama davranışı ve olaylar — (erişim: 15 Ekim 2026)
- <https://docs.slack.dev/ai/mcp-server> — Slack MCP sunucusu — (erişim: 15 Ekim 2026)
- <https://docs.slack.dev/reference/methods> — Tüm Web API metotları — (erişim: 15 Ekim 2026)
- <https://docs.slack.dev/changelog> — Geliştirici değişiklik günlüğü (Slack CLI v4.10.0, 13.10.2026) — (erişim: 15 Ekim 2026)
- <https://github.com/slackapi/slack-api-specs> — Arşivlenmiş OpenAPI/AsyncAPI şemaları — (erişim: 15 Ekim 2026)

Üçüncü taraf:
- <https://github.com/soxtoby/SlackNet> — .NET için kapsamlı Slack istemcisi — (erişim: 15 Ekim 2026)
- <https://github.com/rusq/slackdump> — Oturum token'ı ile dışa aktarma aracı (resmî olmayan yol örneği) — (erişim: 15 Ekim 2026)
- <https://dust-tt.notion.site/Slack-Terms-of-Service-update-and-API-Changes-21728599d94180f3b2b4e892e6d20af6> — 2025 ToS/API değişikliğinin bir entegratör tarafından özeti (ikincil; sayfa JS gerektirdiği için otomatik doğrulanamadı) — (erişim: 15 Ekim 2026)

> Not: Bu sayfa hazırlanırken web arama kotası doldu; Postman koleksiyonları, Go/SlackAPI kütüphanelerinin güncel sürümleri resmî kaynaktan ayrıca doğrulanmadı.

[← Üst klasör](../)
