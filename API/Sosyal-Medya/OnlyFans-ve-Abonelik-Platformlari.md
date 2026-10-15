# OnlyFans ve Abonelik Platformları API (OnlyFans · Fansly · Patreon)

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: OnlyFans → **resmî API yok** · Fansly → **resmî API yok** · Patreon → **aktif (API v2)**

Bu sayfa yalnızca API'lerin **teknik durumunu** anlatır. İçerik veya platform hakkında değerlendirme yapmaz.

## Özet

- **OnlyFans**: Geliştiricilere açık, belgelenmiş bir API, OAuth veya webhook sistemi sunmuyor [3. TARAF; resmî "API yok" duyurusu da bulunmuyor, yokluk belge eksikliğinden anlaşılıyor]. Piyasadaki "OnlyFans API" ürünleri, platformun web istemcisinin kullandığı iç uç noktaları creator hesabının oturumu üzerinden çağıran **resmî olmayan** aracılardır. Ücretlidirler ve ToS riski taşırlar.
- **Fansly**: Resmî bir geliştirici programı veya API dokümanı bulunamadı ("belgede yok"). Topluluk araçları kullanıcının auth token'ı ve User-Agent bilgisiyle iç API'ye bağlanır [3. TARAF].
- **Patreon**: Belgelenmiş, OAuth 2.0 tabanlı, ücretsiz bir **API v2** sunuyor [RESMÎ]. Creator'ın kendi kampanyası, üyeleri ve gönderileri okunabiliyor; üye ve gönderi olayları için webhook var. **API v1, 7 Ekim 2026'da kapandı.** Yalnızca bu tarihe kadar uzatma talep etmiş olanlar 20 Ocak 2027'ye kadar v1'i kullanabiliyor. Yeni talep artık alınmıyor. Mart 2026'dan (25.03.2026) beri yeni V1 client da oluşturulamıyor, yalnızca V2 client açılabiliyor [RESMÎ].
- Takip açısından: Bu üç platformun hiçbiri, **başka bir creator'ın** yeni gönderisini veya canlı yayınını resmî yoldan izlemeye izin vermiyor. Patreon'da yalnızca yetki veren creator'ın kendi verisi okunabiliyor.

## Erişim seviyeleri

### OnlyFans

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | — | Web sayfası. Resmî bir veri arayüzü yok | — |
| Geliştirici hesabı / uygulama | — | **Yok.** Geliştirici portalı, API anahtarı veya OAuth bulunmuyor [3. TARAF] | — |
| İşletme onayı / partner | — | Herkese açık bir partner API programı belgelenmemiş ("belgede yok") | — |
| Ücretli / kurumsal | — | Resmî bir seçenek yok | — |
| Resmî olmayan | Creator hesabını üçüncü taraf servise bağlamak (login, 2FA, yüz doğrulama) veya açık kaynak bir scraper | Mesajlar, satışlar, aboneler, gönderiler vb. (iç uç noktalar) | Örn. onlyfansapi.com: ücretsiz deneme (1 hesap, 60 RPM), 69 $/ay (1 hesap, 1.000 RPM), 299 $/ay (5 hesap, 5.000 RPM; ek hesap 29 $) [3. TARAF]. **ToS riski var** |

### Fansly

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık / geliştirici / işletme / ücretli | — | Resmî bir API bulunamadı ("belgede yok") | — |
| Resmî olmayan | Kullanıcının oturum auth token'ı ve User-Agent bilgisi | Timeline, mesajlar, koleksiyon (iç API) [3. TARAF] | Açık kaynak araçlar ücretsiz. **ToS riski var** |

### Patreon

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | — | API erişimi yok. Yalnızca web sayfası ve creator'ın açtığı RSS (sesli içerik) | — |
| Geliştirici hesabı / uygulama | Patreon hesabı ve "Clients & API Keys" sayfasında client kaydı | **Creator's Access Token**: client sahibinin kendi kampanyası. OAuth ile: yetki veren kullanıcının kimliği, üyelikleri ve (creator ise) kampanyası, üyeleri ve gönderileri [RESMÎ] | Ücretsiz. 100 istek/2 sn (client), 100 istek/dk (token) [RESMÎ] |
| İşletme onayı / partner | Developers forum üzerinden Patreon ile iletişim | Başka kullanıcıların kampanya ve pledge verisi. **Lives** API'si "early access" olarak sunuluyor [RESMÎ] | Belgede yok |
| Ücretli / kurumsal | — | Ücretli bir API katmanı yok ("belgede yok") | — |
| Resmî olmayan | Web istemcisinin iç uç noktaları | Belgelenmemiş. Bu araştırmada yaygın bir kütüphane bulunamadı | ToS riski var |

## Kimlik doğrulama

- **OnlyFans**: Resmî bir mekanizma yok. Resmî olmayan araçlar, web oturumunun çerez/oturum bilgisini ve platformun her istekte istediği dinamik imza başlıklarını (topluluk araçlarında "dynamic rules" diye geçer) kullanır. Bu imza kuralları platform tarafından sık sık değiştiriliyor ve araçlar bu yüzden bozulabiliyor [3. TARAF]. Ticari aracılar, creator hesabını kendi panellerinden 2FA ve yüz doğrulamasıyla bağlatıp size kendi API anahtarlarını veriyor [3. TARAF].
- **Fansly**: Resmî bir mekanizma yok. Araçlar tarayıcıdan alınan `authorization` token'ı ve User-Agent bilgisiyle çalışıyor [3. TARAF].
- **Patreon** [RESMÎ]: OAuth 2.0 Authorization Code akışı kullanılır.
  1. Kullanıcı `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=…&redirect_uri=…&scope=…&state=…` adresine yönlendirilir.
  2. Dönen tek kullanımlık `code`, sunucu tarafında `POST https://www.patreon.com/api/oauth2/token` ile access ve refresh token'a çevrilir.
  3. API çağrılarında `Authorization: Bearer <token>` başlığı gönderilir. Süresi dolan token `grant_type=refresh_token` ile yenilenir.
  - **Scope'lar**: `identity`, `identity[email]`, `identity.memberships`, `campaigns`, `campaigns.members`, `campaigns.members[email]`, `campaigns.members.address`, `campaigns.posts`, `campaigns.lives`, `w:campaigns.lives`, `w:campaigns.webhook`. Yeniden yetkilendirmede scope'lar öncekilerin üzerine eklenir.
  - **Creator's Access Token**: Her client ile birlikte verilir. Tek creator'lı araçlar için OAuth akışını kurmak gerekmez.
  - Açıklayıcı bir `User-Agent` başlığı göndermek gerekir, yoksa 403 dönebilir. Bütün çağrılar HTTPS üzerinden yapılmalıdır. v2 için yeni bir v2 client gerekir.

## Temel uç noktalar

### Patreon API v2 (taban: `https://www.patreon.com`) [RESMÎ]

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/api/oauth2/v2/identity` | Yetki veren kullanıcı (+ `include=memberships,campaign`) | Geliştirici | `identity` scope'u |
| GET | `/api/oauth2/v2/campaigns` | Kullanıcının kampanyaları | Geliştirici | `campaigns` scope'u |
| GET | `/api/oauth2/v2/campaigns/{campaign_id}` | Tek kampanya (tier, hedef, RSS alanları) | Geliştirici | `fields[campaign]=…` |
| GET | `/api/oauth2/v2/campaigns/{campaign_id}/members` | Üyeler (patron) listesi | Geliştirici | Sayfa başına en fazla 1.000 kayıt (pledge olaylarıyla 500), cursor ile sayfalama |
| GET | `/api/oauth2/v2/members/{id}` | Tek üye | Geliştirici | `campaigns.members` scope'u |
| GET | `/api/oauth2/v2/campaigns/{campaign_id}/posts` | Kampanyanın gönderileri | Geliştirici | `campaigns.posts` scope'u |
| GET | `/api/oauth2/v2/posts/{id}` | Tek gönderi | Geliştirici | |
| GET/POST/PATCH/DELETE | `/api/oauth2/v2/webhooks` | Webhook yönetimi | Geliştirici | `w:campaigns.webhook` scope'u |
| POST | `/api/oauth2/v2/lives` | Canlı yayın (Live) oluşturur | Partner (early access) | `w:campaigns.lives` scope'u |
| GET/PATCH | `/api/oauth2/v2/lives/{id}` | Live'ı okur, durumunu değiştirir (`pre_live` → `live` → `live_ended`) | Partner (early access) | `campaigns.lives` / `w:campaigns.lives` scope'ları |

Dikkat edilecek noktalar:

- v2'de `fields[...]` parametresi verilmezse **hiçbir attribute dönmez**. İlişkili veriler için `include=` kullanılır ve köşeli parantezler URL-encode edilmelidir [RESMÎ].
- Kullanımdan kalkanlar (deprecated; yanıtta hâlâ var ama artık anlamlı değil): `goals` her zaman boş döner, Member'daki `is_follower` her zaman `false` döner (takip özelliğinin yerini ücretsiz üyelik aldı), User'daki `vanity` yerine `campaign.vanity`, `lifetime_support_cents` yerine `campaign_lifetime_support_cents` kullanılır. Pledges'in yerini members aldı [RESMÎ].

Tam liste için: <https://docs.patreon.com/>

### OnlyFans / Fansly

Resmî bir uç nokta listesi yok. Resmî olmayan servisler kendi belgelerini yayımlıyor (onlyfansapi.com 320'den fazla uç nokta olduğunu söylüyor [3. TARAF]). Bu uç noktalar platformun iç API'sine dayandığı için haber verilmeden değişebilir. Bu sayfada listelenmedi.

## Gerçek zamanlı / bildirim

| Platform | Ne var | Nasıl |
|---|---|---|
| Patreon | **Webhook** [RESMÎ] | Tetikleyiciler: `members:create/update/delete`, `members:pledge:create/update/delete`, `posts:publish/update/delete` (`pledges:*` kaldırıldı). İmza: `X-Patreon-Signature` başlığında, webhook secret ile hesaplanan HMAC-MD5 hex. Başarısız gönderimler kuyrukta bekletilir ve bir haftaya yayılan bir takvimle yeniden denenir, sonrasında elle tetiklemek gerekir. **Lives için webhook yok.** |
| Patreon | RSS | Kampanyada `has_rss` ve `rss_feed_title` alanları var. Patron'a özel ses RSS'i sunuluyor ama API'de bir RSS uç noktası belgelenmemiş [RESMÎ] |
| OnlyFans | Resmî bir sistem yok | Resmî olmayan aracılar, bağlanan creator hesabı için kendi webhook'larını sunuyor (yeni mesaj, satış, yenileme, yeni abone; HMAC imzalı) [3. TARAF]. Arka planda büyük olasılıkla platformun web istemcisinin WebSocket'ini veya yoklamayı (polling) kullanıyorlar [TAHMİN] |
| Fansly | Resmî bir sistem yok | Belgede yok |

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Patreon: **kendi** kampanyanda yeni gönderi | Evet | `posts:publish` webhook'u veya `GET …/campaigns/{id}/posts` | Geliştirici | [RESMÎ] |
| Patreon: **başka bir** creator'ın yeni gönderisi | Resmî API ile hayır | Creator'ın sizin uygulamanıza OAuth ile yetki vermesi gerekir. Herkese açık gönderiler için web sayfası veya RSS | Geliştirici + creator yetkisi | Başka kullanıcıların kampanya verisi için Patreon ile iletişime geçmek gerekiyor [RESMÎ] |
| Patreon: yeni / ayrılan üye, pledge değişimi | Evet (kendi kampanyanda) | `members:*` ve `members:pledge:*` webhook'ları | Geliştirici | E-posta ve adres için ayrı scope gerekir |
| Patreon: canlı yayın başladı | Kısmen | `GET /lives/{id}` ile `state=live` alanını yoklamak | Partner (early access) | Webhook yok [RESMÎ] |
| Patreon: yorum | Hayır | — | — | Comments kaynağı belgede yok |
| OnlyFans / Fansly: creator'ın yeni gönderisi veya canlı yayını | Resmî yoldan hayır | Yalnızca resmî olmayan yollar (iç API ve abone hesabı oturumu) | Resmî olmayan | ToS riski. Paywall arkasındaki içerik telif ve kişisel veri riskini de getirir |
| OnlyFans: kendi creator hesabında mesaj / satış / abone | Resmî yoldan hayır | Üçüncü taraf aracı servisin webhook'u | Resmî olmayan | Hesabı aracıya teslim etmek güvenlik riski taşır |
| Filtreleme / anahtar kelime | API'de yok | Gelen veriyi uygulama tarafında filtrelemek gerekir | — | Hiçbir platformda sunucu tarafında arama veya filtre belgelenmemiş |

**Pratik öneri** [TAHMİN]: Takip uygulamasında abonelik platformlarını doğrudan izlemek yerine creator'ların **duyuru kanallarını** (X, Bluesky, Telegram, Instagram vb.) izlemek daha az riskli olur. Bu platformlarda genellikle "yeni gönderi / canlı yayın" duyurusu yapılır. Patreon için resmî API yalnızca "kendi kampanyam" senaryosunda yeterlidir.

## Hız sınırları ve fiyatlar

- **Patreon** [RESMÎ]: Client başına 100 istek / 2 saniye, access token başına 100 istek / dakika. Aşılırsa `429` döner (yanıtta `retry_after_seconds` olabilir). 10 dakikada 2.000'den fazla 4xx yanıtı alınırsa **30 dakikalık edge engeli** uygulanır; tekrarlanan 401 ve 429 hataları buna yol açabilir. API ücretsizdir.
- **Patreon v1**: 7 Ekim 2026'da kapandı. Yalnızca bu tarihe kadar uzatma talep etmiş olanlarda 20 Ocak 2027'ye kadar çalışıyor. Yeni talep alınmıyor. 25.03.2026'dan beri yeni V1 client oluşturulamıyor [RESMÎ].
- **OnlyFans resmî olmayan servis örneği** (onlyfansapi.com, 15.10.2026 itibarıyla) [3. TARAF]: Free 0 $ (1 hesap, 100 hoş geldin kredisi, 60 RPM); Basic 69 $/ay (1 hesap, 20.000 kredi/ay, 1.000 RPM); Pro 299 $/ay (5 hesap, 100.000 kredi/ay, 5.000 RPM; her ek hesap 29 $ ve +10.000 kredi, hacim indirimiyle ~11,6 $'a kadar iner); Enterprise: fiyat teklifle, 100+ hesap için öneriliyor, kullanıma ve hacme göre hesap başına ~10 $'a kadar inebiliyor. Fiyatlar sık değişir.
- **OnlyFans / Fansly**: Resmî bir limit yok. Platformların iç limitleri ve bot tespit sistemleri belgelenmemiş.

## Resmî olmayan yollar ve riskler

| Araç / servis | Nasıl çalışır | Durum |
|---|---|---|
| onlyfansapi.com (ve benzeri ticari aracılar) | Creator hesabı panele bağlanır; servis iç uç noktaları sizin adınıza çağırır. REST, webhook, SDK ve n8n/Make/Zapier entegrasyonu sunar | Kendi sitesinde "OnlyFans'ın resmî bir public API'si yok" diyor ve platformla bağlantısı olduğunu söylemiyor. "5 yılda 0 ban" iddiası kendi beyanı, doğrulanmadı [3. TARAF] |
| OpenWebNinja "OnlyFans API" | Herkese açık profil verisini (kullanıcı adı, bio, gönderi sayısı, abonelik ücreti) döndürür | Ücretli, resmî olmayan bir servis [3. TARAF] |
| OF-Scraper (`ofscraper`, PyPI; onlyfans-scraper'ın fork'u) | Abone hesabının oturum bilgisi ve dinamik imza kurallarıyla iç API'den içerik indirir | Açık kaynak. Kendini "eğitim amaçlı" diye tanımlıyor. Auth bilgisi sık sık bozuluyor [3. TARAF] |
| fansly-downloader / fansly-downloader-ng | Auth token ve User-Agent ile Fansly'nin iç API'sinden içerik indirir | Orijinal depo 31.01.2024'te arşivlendi. NG fork'u arşivlenmemiş ama son commit'i ve sürümü (v0.9.9) Haziran 2024 tarihli, uzun süredir güncellenmiyor [3. TARAF] |

**Riskler (nesnel):**

- **ToS**: OnlyFans kullanım şartlarının bot, crawler, scraper ve veri madenciliğini yasakladığı birden çok üçüncü taraf kaynakta aktarılıyor. Resmî metin bu araştırmada doğrudan okunamadı (site erişimi engelledi) [3. TARAF / doğrulanmadı]. Bunun sonucunda hesap askıya alınabilir veya kapatılabilir, IP engellenebilir.
- **Hesap güvenliği**: Hesabı (2FA ve yüz doğrulamasıyla birlikte) üçüncü tarafa bağlamak, oturumun ve gelir verisinin o tarafın elinde olması anlamına gelir.
- **Telif hakkı**: Paywall arkasındaki içeriği indirmek veya yeniden dağıtmak creator'ın telif hakkını ihlal edebilir.
- **Kişisel veri (KVKK/GDPR)**: Profil ve abone verisi, herkese açık olsa bile kişisel veri sayılabilir. İşlemek için hukuki dayanak gerekir [3. TARAF].
- **Kırılganlık**: İç uç noktalar ve imza kuralları haber verilmeden değişir. Uzun vadeli bir ürün için güvenilir bir temel değildir [TAHMİN].
- Kamuya açık veri ile login arkasındaki verinin hukuki durumunun farklı olduğu yönünde görüşler var. Bunlar satıcı yorumu, kesin bir hüküm değil [ÇELİŞKİLİ].

## SDK ve kütüphaneler

| Platform | Kütüphane | Tür | Not |
|---|---|---|---|
| Patreon | `patreon` (PyPI), `patreon/patreon` (Packagist, PHP) | Resmî | [RESMÎ] |
| Patreon | Go istemcisi, django-allauth, python-social-auth | Topluluk (dokümanda anılıyor) | [RESMÎ] |
| Patreon (.NET) | `Patreon.Api` (NuGet, v1.2.1; Refit ve Polly tabanlı, v2) | Topluluk | Token yenilemeyi kendisi yapıyor [3. TARAF] |
| Patreon (.NET) | `IVAXOR.PatreonNET` (NuGet, .NET Standard 2.0, v1 ve v2) | Topluluk | [3. TARAF] |
| OnlyFans | onlyfansapi.com SDK'ları (TypeScript, Python, PHP, Ruby), MCP sunucusu | Resmî olmayan ticari | .NET SDK'sı yok, REST üzerinden kullanılabilir [3. TARAF] |
| OnlyFans | OF-Scraper (Python) | Resmî olmayan, açık kaynak | [3. TARAF] |
| Fansly | fansly-downloader-ng (Python) | Resmî olmayan, açık kaynak | [3. TARAF] |

## Postman / OpenAPI / koleksiyonlar

- **Patreon**: Resmî bir OpenAPI veya Postman koleksiyonu belgede yok. Doküman sayfasında istek ve yanıt örnekleri var.
- **OnlyFans**: Resmî bir koleksiyon yok. Ticari aracılar kendi dokümanlarını ve "playground" araçlarını sunuyor [3. TARAF].
- **Fansly**: Yok.

## Depoda ilgili sayfalar

- Aynı klasördeki diğer platform sayfalarına (X, Twitch, Kick, YouTube, Telegram vb.) bakın. Takip uygulamasında creator duyuru kanallarını izlemek için bu sayfalar kullanılır.

## Kaynaklar

1. <https://docs.patreon.com/> — Patreon API v2 resmî dokümanı: OAuth, scope'lar, uç noktalar, webhook'lar, hız sınırları, v1'in kapanışı, Lives — (erişim: 15 Ekim 2026) [RESMÎ]
2. <https://www.patreon.com/portal/registration/register-clients> — Patreon client kayıt sayfası (Clients & API Keys) — (erişim: 15 Ekim 2026) [RESMÎ]
3. <https://onlyfans.com/terms> — OnlyFans kullanım şartları. Bu araştırmada otomatik erişim engellendi, metin doğrudan doğrulanamadı — (erişim denemesi: 15 Ekim 2026) [RESMÎ]
4. <https://onlyfansapi.com/> — Resmî olmayan ticari OnlyFans API aracısı: fiyatlar, webhook'lar, SDK'lar ve "resmî API yok" ifadesi — (erişim: 15 Ekim 2026) [3. TARAF]
5. <https://www.openwebninja.com/request-apis/onlyfans> — Herkese açık profil verisi sunan resmî olmayan bir servis — (erişim: 15 Ekim 2026) [3. TARAF]
6. <https://pypi.org/project/ofscraper/> — OF-Scraper paket sayfası — (erişim: 15 Ekim 2026) [3. TARAF]
7. <https://github.com/prof79/fansly-downloader-ng/wiki/Fansly-Downloader-NG-Settings> — Fansly'nin iç API'sine token ve User-Agent ile erişim — (erişim: 15 Ekim 2026) [3. TARAF]
8. <https://www.nuget.org/packages/Patreon.Api/> — .NET için Patreon v2 istemcisi — (erişim: 15 Ekim 2026) [3. TARAF]
9. <https://www.nuget.org/packages/IVAXOR.PatreonNET> — .NET Standard 2.0 için Patreon istemcisi — (erişim: 15 Ekim 2026) [3. TARAF]
10. <https://nodemaven.com/blog/onlyfans-scraper/> — OnlyFans scraping'in hukuki ve ToS riskleri üzerine bir satıcı yazısı (proxy sağlayıcısı, ticari çıkarı var) — (erişim: 15 Ekim 2026) [3. TARAF]
11. <https://www.rapidevelopers.com/md/api-automations/how-to-automate-onlyfans-subscriber-messages-using-the-api> — OnlyFans'ta public API, OAuth ve webhook olmadığını söyleyen bir geliştirme ajansı yazısı (Mayıs 2026) — (erişim: 15 Ekim 2026) [3. TARAF]
12. <https://onlyfansapi.com/pricing> — onlyfansapi.com plan tablosu ve SSS: Free/Basic/Pro/Enterprise, ek hesap ve hacim indirimi — (erişim: 15 Ekim 2026) [3. TARAF]
13. <https://github.com/Avnsx/fansly-downloader> — Orijinal fansly-downloader deposu (31.01.2024'te arşivlendi) — (erişim: 15 Ekim 2026) [3. TARAF]
14. <https://github.com/prof79/fansly-downloader-ng/commits/main> — fansly-downloader-ng commit geçmişi (son commit 28.06.2024) — (erişim: 15 Ekim 2026) [3. TARAF]
