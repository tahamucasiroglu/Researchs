# Signal API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **resmî API yok** (yalnızca resmî olmayan istemciler)

## Özet

Signal, geliştiricilere yönelik **hiçbir resmî istemci/bot API'si sunmaz**: ne bot platformu, ne işletme API'si, ne webhook, ne de geliştirici portalı vardır [RESMÎ — signal.org/docs yalnızca protokol belgelerini ve `libsignal` kütüphanesini listeler, istemci API belgesi yok]. Signal'in açık kaynak olarak yayınladığı şeyler protokol spesifikasyonları (X3DH, PQXDH, Double Ratchet, Sesame, ML-KEM Braid), `libsignal` (Rust + Java/Swift/TypeScript sarmalayıcılar, AGPL-3.0) ve sunucu kodudur (`Signal-Server`, AGPL-3.0) [RESMÎ]. Programatik erişim için pratikte tek yol **topluluk projeleri**dir: `signal-cli` (Java, GPL-3.0) ve onun üstüne kurulu `signal-cli-rest-api` (Docker, MIT); bunlar bir hesaba **ikincil cihaz (linked device)** olarak bağlanır ya da bir numarayı doğrudan kaydeder [3. TARAF]. Hiçbiri ücretli değildir; ancak Signal bu kullanımı desteklemez ve sunucu değişikliklerinde bozulabilir [3. TARAF].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | — | **Hiçbir şey.** Signal'de herkese açık kanal, profil sayfası veya web görünümü yok; tüm içerik uçtan uca şifreli [RESMÎ — protokol belgeleri] | — |
| Geliştirici hesabı/uygulama | — | **Yok.** Geliştirici portalı / API anahtarı bulunmuyor [RESMÎ — belgede yok] | — |
| İşletme/uygulama onayı | — | **Yok.** WhatsApp Business benzeri bir işletme programı yok [RESMÎ — belgede yok] | — |
| Ücretli/kurumsal | — | **Yok.** | — |
| Kriptografi kütüphanesi | `libsignal` (Rust/Java/Swift/TS) | Signal Protocol'ün kendisi; kendi uygulamanızda uçtan uca şifreleme kurmak için. Signal ağına bağlanmak için hazır bir istemci **değildir** | Ücretsiz, AGPL-3.0. "Use outside of Signal is unsupported" (Signal dışında kullanım desteklenmez) [RESMÎ] |
| Resmî olmayan (topluluk) | Bir telefon numarası **veya** mevcut bir Signal hesabı + `signal-cli` / `signal-cli-rest-api` | Mesaj gönderme/alma, grup listesi ve grup mesajları (hesabın üyesi olduğu gruplar), tepki, okundu bilgisi, anket, profil, kişi listesi | Ücretsiz; Signal'in sunucu tarafı hız sınırları ve CAPTCHA geçerli; ToS riski [3. TARAF] |

## Kimlik doğrulama

Resmî bir API olmadığı için OAuth/token yoktur. Topluluk araçları Signal'e **normal bir istemci gibi** kimlik doğrular [3. TARAF]:

1. **Kayıt (register) — birincil cihaz olarak:** `signal-cli -a <numara> register` → SMS/sesli arama ile gelen kodla `verify`. Kayıt CAPTCHA isteyebilir. Uyarı: aynı numaradaki mevcut istemcinin (telefondaki Signal) kaydını **siler** [3. TARAF — signal-cli README]. Bu yüzden ayrı bir numara kullanılır.
2. **Bağlama (link) — ikincil cihaz olarak:** `signal-cli link -n "cihaz-adi"` bir `sgnl://linkdevice?...` bağlantısı üretir; bu QR koda çevrilip telefondaki Signal'de *Ayarlar → Bağlı cihazlar → +* ile okutulur. Ardından `receive` çalıştırılarak kişiler ve gruplar birincil cihazdan senkronlanır [3. TARAF — signal-cli wiki].
   - `signal-cli-rest-api` ile: tarayıcıda `http://localhost:8080/v1/qrcodelink?device_name=signal-api` açılır, QR telefondan okutulur [3. TARAF].
   - v0.14.9 (7 Ekim 2026) ile **telefon numarasız** Signal hesaplarının bağlanması da destekleniyor; bu hesaplarda numara yerine ACI (Account ID) kullanılır [3. TARAF — signal-cli sürüm notları].
   - Birincil cihaz başına en fazla **5 bağlı cihaz** [3. TARAF — signal-cli wiki]. Uzun süre çevrimdışı kalan bağlı cihazların Signal tarafından bağlantısının kaldırıldığı bilinir; süre için resmî destek sayfasına erişilemedi [TAHMİN — doğrulanmadı].
3. **Anahtarlar** yerelde saklanır (signal-cli veri dizini / Docker volume). Bu dizin hesabın tam erişim anahtarlarıdır; sızarsa hesap ele geçmiş sayılır [3. TARAF].

## Temel uç noktalar

Signal'in kendi sunucu uç noktaları (Signal-Server) **belgelenmiş bir genel API değildir**; doğrudan çağırmak önerilmez. Aşağıdakiler `signal-cli-rest-api`'nin **kendi yerel** REST uç noktalarıdır (sizin sunucunuzda çalışır) [3. TARAF — swagger.json, sürüm 0.101, 25 Eylül 2026].

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/v1/qrcodelink?device_name=...` | İkincil cihaz bağlama QR'ı üretir | Resmî olmayan | `/v1/qrcodelink/raw` ham URI verir |
| POST | `/v1/register/{number}` · `/v1/register/{number}/verify/{token}` | Numarayı birincil olarak kaydeder/doğrular | Resmî olmayan | Mevcut istemcinin kaydını düşürür |
| GET | `/v1/receive/{number}` | Bekleyen mesajları alır | Resmî olmayan | normal/native modda GET; **json-rpc modda WebSocket**. Sorgu parametreleri: `timeout`, `ignore_attachments`, `ignore_stories`, `ignore_avatars`, `ignore_stickers`, `max_messages`, `send_read_receipts` |
| POST | `/v2/send` | Kişiye/gruba mesaj gönderir (metin, ek, stil) | Resmî olmayan | `/v1/send` kullanımdan kaldırıldı |
| GET | `/v1/groups/{number}` | Hesabın üye olduğu grupları listeler | Resmî olmayan | 0.101 ile üyelik bilgisi de dönüyor |
| GET | `/v1/groups/{number}/{groupid}` | Tek grup bilgisi | Resmî olmayan | |
| POST | `/v1/groups/{number}/{groupid}/join` · `/quit` | Gruba katılma / çıkma | Resmî olmayan | |
| GET | `/v1/contacts/{number}` | Kişi listesi | Resmî olmayan | |
| GET | `/v1/search/{number}` | Numaraların Signal'de kayıtlı olup olmadığını sorgular | Resmî olmayan | Toplu kullanım kötüye kullanım sayılabilir |
| GET | `/v1/attachments/{attachment}` | İndirilen eki sunar | Resmî olmayan | |
| POST | `/v1/reactions/{number}` · `/v1/receipts/{number}` | Tepki / okundu bilgisi | Resmî olmayan | |
| GET | `/v1/health` · `/v1/about` | Sağlık kontrolü / sürüm | Resmî olmayan | |

`signal-cli` daemon'u (`--http`) doğrudan da kullanılabilir [3. TARAF — signal-cli-jsonrpc(5)]:

| Metot | Uç nokta | Ne yapar | Seviye | Not |
|---|---|---|---|---|
| POST | `/api/v1/rpc` | JSON-RPC isteği (tekli/toplu): `send`, `listGroups`, `subscribeReceive`, `startLink`... | Resmî olmayan | |
| GET | `/api/v1/events` | Gelen mesajlar için **Server-Sent Events** akışı | Resmî olmayan | Son 1000 olay bellekte; `Last-Event-ID` ile kaçanlar tekrar alınır (v0.14.9) |
| GET | `/api/v1/check` | Daemon çalışıyor mu | Resmî olmayan | |

Tam liste: [signal-cli-rest-api Swagger](https://bbernhard.github.io/signal-cli-rest-api/) · [signal-cli JSON-RPC man sayfası](https://github.com/AsamK/signal-cli/blob/master/man/signal-cli-jsonrpc.5.adoc).

## Gerçek zamanlı / bildirim

- **Resmî:** Webhook, streaming, RSS, WebSub — **hiçbiri yok** [RESMÎ — belgede yok].
- **signal-cli daemon:** UNIX soket, TCP veya HTTP üzerinden JSON-RPC; gelen mesajlar `"method":"receive"` bildirimleri olarak itilir (`params.envelope`). HTTP modunda SSE (`/api/v1/events`) [3. TARAF].
- **signal-cli-rest-api:** `MODE=json-rpc` ile `/v1/receive/{number}` bir **WebSocket**'e dönüşür (anlık). normal/native modda periyodik GET (polling) gerekir. `AUTO_RECEIVE_SCHEDULE` (cron) yalnızca normal/native modda anlamlıdır: belirlenen saatte gerçek bir `receive` çağrısı yapar ve bekleyen **tüm** mesajları sunucudan çekip tüketir. Takip uygulaması mesajları REST API üzerinden alıyorsa bu ayar **kullanılmamalı**, yoksa mesaj kaybolur [3. TARAF — README WARNING].
- Dahili webhook ortam değişkeni README'de **yok**; webhook isteniyorsa WebSocket/SSE'yi dinleyip ileten küçük bir köprü yazılır veya plugin mekanizması kullanılır [3. TARAF].
- **Dikkat:** `receive` çağrısı mesajları sunucudan **çeker ve siler**; README'deki `AUTO_RECEIVE_SCHEDULE` uyarısından çıkan genel sonuç: aynı hesabı iki ayrı tüketici okursa birinin aldığı mesaj diğerine ulaşmaz [TAHMİN — README uyarısından çıkarım].

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Bir kişinin "paylaşımı" (herkese açık gönderi) | **Hayır** | — | — | Signal'de herkese açık akış/profil yok |
| Herkese açık kanal / yayın listesi takibi | **Hayır** | — | — | Signal'de Telegram tarzı kanal yok [RESMÎ — böyle bir özellik belgelenmemiş] |
| Canlı yayın başladı | **Hayır** | — | — | Signal'de canlı yayın özelliği yok |
| Hesabın üyesi olduğu grup mesajları | Evet (resmî olmayan) | signal-cli bağlı cihaz + JSON-RPC/SSE/WebSocket | Resmî olmayan | Signal resmî istemcileri (Desktop/iPad) bağlama sırasında sınırlı süreli bir geçmiş aktarımı sunabiliyor; signal-cli/signal-cli-rest-api'nin bunu alıp almadığı belgelenmemiş. Pratikte yalnızca **bağlandıktan sonraki** mesajlara güvenin [TAHMİN — doğrulanmadı] |
| Birebir (DM) mesajlar | Evet (resmî olmayan) | Aynı | Resmî olmayan | |
| Grup üyelik değişiklikleri, grup adı/ayarı | Evet (resmî olmayan) | `receive` zarfındaki grup güncellemeleri, `/v1/groups` | Resmî olmayan | |
| Tepki, düzenleme, silme, anket | Evet (resmî olmayan) | `receive` JSON çıktısı | Resmî olmayan | |
| Hikâyeler (stories) | Kısmen | `receive` (istenmezse `ignore_stories`) | Resmî olmayan | |
| Anahtar kelime filtreleme | Evet (kendi kodunuzda) | Gelen JSON'u yerelde süzme | Resmî olmayan | Signal tarafında arama/filtre API'si yok; içerik zaten cihazda çözülür |
| Üyesi olunmayan grubu izleme | **Hayır** | — | — | Grubun anahtarı olmadan içerik okunamaz (E2EE) |

**Sonuç:** Signal, "herkese açık kaynak izleme" için uygun değildir; yalnızca **sizin hesabınızın zaten üyesi olduğu** grup/sohbetlerin akışını, kendi sunucunuzda çalışan bir bağlı cihaz üzerinden filtrelemek mümkündür.

## Hız sınırları ve fiyatlar

- **Fiyat:** Signal ücretsizdir; topluluk araçları da ücretsizdir (yalnızca kendi sunucu maliyetiniz) [3. TARAF].
- **Hız sınırları:** Signal sunucu tarafı sınırlarını **yayımlamaz** [RESMÎ — belgede yok]. Sınıra takılınca CAPTCHA istenir; `signal-cli-rest-api` bunun için `POST /v1/accounts/{number}/rate-limit-challenge` sunar [3. TARAF].
- **Kullanım koşulları:** Signal ToS "toplu mesajlaşma, otomatik mesajlaşma ve otomatik arama" (bulk messaging, auto-messaging, and auto-dialing) gibi uygunsuz iletişimi ve hesapların "yetkisiz veya otomatik yollarla" oluşturulmasını yasaklar [RESMÎ — signal.org/legal]. Salt okuyan bir izleme botu metinde açıkça anılmaz; sınır gri alandır [ÇELİŞKİLİ / yoruma açık].

## Resmî olmayan yollar ve riskler

| Araç | Ne yapar | Nasıl çalışır |
|---|---|---|
| [signal-cli](https://github.com/AsamK/signal-cli) | Komut satırı + JSON-RPC + D-Bus arayüzü (Java, GPL-3.0). Son sürüm **v0.14.9 (7 Ekim 2026)** | `libsignal-client`'ı kullanarak Signal sunucularına resmî istemci gibi bağlanır; birincil (register) ya da bağlı cihaz (link) olabilir. JRE 25 gerektirir [3. TARAF] |
| [signal-cli-rest-api](https://github.com/bbernhard/signal-cli-rest-api) | signal-cli'yi Docker içinde REST API olarak sunar (Go, MIT). Son sürüm **0.101 (25 Eylül 2026)**, signal-cli 0.14.8 içerir | Modlar: `normal`, `native` (GraalVM), `json-rpc`, `json-rpc-native`; plugin ile özel uç nokta; opsiyonel SQLite kalıcılık plugin'i [3. TARAF] |

**Riskler (nesnel):**

1. **Desteklenmeyen kullanım / sürüm kırılması:** signal-cli README'si resmî istemcilerin **3 ayda bir süresinin dolduğunu**, sunucunun sonrasında uyumsuz değişiklik yapabileceğini ve **3 aydan eski sürümlerin düzgün çalışmayabileceğini** belirtir; sürekli güncelleme şarttır [3. TARAF].
2. **Signal'in tutumu:** Signal kurucusu 2016'da üçüncü taraf istemcilerin Signal sunucularını kullanmasına karşı olduğunu açıkça yazmıştır (LibreSignal, issue #37) [3. TARAF — eski ama sonradan resmî bir izin açıklaması bulunamadı]. Bugüne kadar signal-cli'yi hedef alan sistematik bir yasak duyurusu belgede yok [TAHMİN].
3. **Hesap kaybı / ban:** Toplu/otomatik mesaj gönderimi ToS ihlalidir ve numaranın kısıtlanmasına yol açabilir [RESMÎ — ToS]. Yeni numara kaydı birincil telefondaki kaydı düşürür [3. TARAF].
4. **Gizlilik ve hukuk (önemli):** Bir grup, üyelerine uçtan uca şifreli ve özel bir alan sözü verir. Grubun mesajlarını sunucuda düz metin olarak saklamak, işlemek veya üçüncü kişilere aktarmak; diğer üyelerin kişisel verisini (numara, isim, mesaj) **onları bilgilendirmeden** işlemek demektir. Türkiye'de KVKK, AB'de GDPR kapsamında aydınlatma/hukuki dayanak gerekebilir; diğer üyelere bot/arşiv olduğunun söylenmesi en güvenli yoldur [TAHMİN — hukuki görüş değildir].
5. **Anahtar güvenliği:** signal-cli veri dizini hesabın özel anahtarlarını içerir; sunucu ele geçirilirse tüm sohbetler okunabilir ve hesaba mesaj atılabilir. `signal-cli-rest-api`'nin kendi kimlik doğrulaması yoktur; internete açılmamalı, ters vekil + auth arkasında tutulmalıdır [TAHMİN — README'de auth katmanı tanımlanmamış].
6. **Mesaj kaybı:** Aynı hesabı iki tüketicinin `receive` etmesi mesajların birinde kaybolmasına yol açar [3. TARAF].
7. signal-cli wiki'sine göre birincil ve ikincil signal-cli örnekleri aynı makinede çalıştırılamaz ("You cannot run two instances on the same machine"); ikincil örnek için VM ya da ayrı bir makine gerekir [3. TARAF — wiki].

## SDK ve kütüphaneler

- **Resmî:** [libsignal](https://github.com/signalapp/libsignal) — Rust çekirdek; Java, Swift, TypeScript (Node) sarmalayıcıları; AGPL-3.0. Yalnızca protokol/kriptografi; Signal dışında kullanım desteklenmez, API'ler haber verilmeden değişebilir [RESMÎ].
- **Topluluk:**
  - [signal-cli](https://github.com/AsamK/signal-cli) (Java) — temel motor [3. TARAF].
  - [signal-cli-rest-api](https://github.com/bbernhard/signal-cli-rest-api) (Go/Docker) — HTTP sarmalayıcı [3. TARAF].
  - [signalbot](https://github.com/filipre/signalbot) (Python, MIT) — Signal botları için mikro framework [3. TARAF].
- **.NET:** Bakımı süren, yaygın bir .NET Signal istemci kütüphanesi bulunamadı (arama bütçesi nedeniyle kapsamlı tarama yapılamadı) [TAHMİN]. Önerilen yol: `signal-cli-rest-api`'yi Docker'da çalıştırıp `HttpClient` + `ClientWebSocket` (json-rpc modundaki `/v1/receive`) ile kullanmak, ya da signal-cli daemon'unun `/api/v1/events` SSE akışını dinlemek. Swagger dosyasından (NSwag/Kiota ile) istemci kodu üretilebilir.

## Postman / OpenAPI / koleksiyonlar

- Resmî OpenAPI/Postman koleksiyonu **yok** [RESMÎ — belgede yok].
- `signal-cli-rest-api` Swagger 2.0 tanımı: [`src/docs/swagger.json`](https://github.com/bbernhard/signal-cli-rest-api/blob/master/src/docs/swagger.json) — Postman'e içe aktarılabilir; görsel hâli [bbernhard.github.io/signal-cli-rest-api](https://bbernhard.github.io/signal-cli-rest-api/) [3. TARAF].

## Depoda ilgili sayfalar

- [Telegram API](Telegram.md) — resmî Bot API + MTProto; herkese açık kanal takibi için Signal'den çok daha uygun.
- [WhatsApp API](WhatsApp.md) — Meta'nın resmî işletme API'si ve resmî olmayan yollar.
- [Mesajlaşma Altyapıları rehberi](../../Rehberler/Mesajlasma-Altyapilari/) — Telegram, WhatsApp, BiP ve SMS API'lerinin genel anlatımı.

## Kaynaklar

Resmî:
- [signal.org/docs](https://signal.org/docs/) — Signal Protocol spesifikasyonları (X3DH, PQXDH, Double Ratchet, Sesame, ML-KEM Braid); istemci API belgesi yok — (erişim: 15 Ekim 2026)
- [signalapp/libsignal](https://github.com/signalapp/libsignal) — resmî protokol kütüphanesi, "Use outside of Signal is unsupported" uyarısı — (erişim: 15 Ekim 2026)
- [signalapp/Signal-Server](https://github.com/signalapp/Signal-Server) — sunucu kaynak kodu (AGPL-3.0), genel API taahhüdü yok — (erişim: 15 Ekim 2026)
- [Signal Terms & Privacy Policy](https://signal.org/legal/) — kullanım koşulları; toplu/otomatik mesaj ve otomatik hesap oluşturma yasağı — (erişim: 15 Ekim 2026)

Üçüncü taraf:
- [AsamK/signal-cli](https://github.com/AsamK/signal-cli) — resmî olmayan CLI/JSON-RPC/D-Bus istemcisi, güncelleme uyarıları — (erişim: 15 Ekim 2026)
- [signal-cli sürümleri](https://github.com/AsamK/signal-cli/releases) — v0.14.9 (7 Ekim 2026): numarasız hesap bağlama, SSE `Last-Event-ID` — (erişim: 15 Ekim 2026)
- [signal-cli JSON-RPC man sayfası](https://github.com/AsamK/signal-cli/blob/master/man/signal-cli-jsonrpc.5.adoc) — daemon taşıma seçenekleri, HTTP/SSE uç noktaları — (erişim: 15 Ekim 2026)
- [signal-cli wiki: Linking other devices](https://github.com/AsamK/signal-cli/wiki/Linking-other-devices-(Provisioning)) — ikincil cihaz bağlama adımları, 5 cihaz sınırı, birincil/ikincil örneklerin aynı makinede çalıştırılamaması — (erişim: 15 Ekim 2026)
- [bbernhard/signal-cli-rest-api](https://github.com/bbernhard/signal-cli-rest-api) — Docker REST sarmalayıcı, modlar ve ortam değişkenleri; `AUTO_RECEIVE_SCHEDULE` WARNING'i — (erişim: 15 Ekim 2026)
- [signal-cli-rest-api sürümleri](https://github.com/bbernhard/signal-cli-rest-api/releases) — 0.101 (25 Eylül 2026) — (erişim: 15 Ekim 2026)
- [signal-cli-rest-api swagger.json](https://github.com/bbernhard/signal-cli-rest-api/blob/master/src/docs/swagger.json) — tüm uç noktalar; `/v1/receive/{number}` sorgu parametreleri — (erişim: 15 Ekim 2026)
- [filipre/signalbot](https://github.com/filipre/signalbot) — Python bot framework'ü — (erişim: 15 Ekim 2026)
- [LibreSignal issue #37](https://github.com/LibreSignal/LibreSignal/issues/37) — Signal kurucusunun 2016'daki üçüncü taraf istemci tutumu (tarihsel) — (erişim: 15 Ekim 2026)

> Not: Signal destek sayfası (bağlı cihazlar) erişimde 403 döndürdü; bağlı cihaz hareketsizlik süresi bu nedenle doğrulanamadı.

---

[← Üst klasör](../)
