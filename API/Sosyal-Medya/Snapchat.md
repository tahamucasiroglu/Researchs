# Snapchat API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: kısıtlı (Snap Kit herkese açık; içerik/profil okuma yalnızca allowlist ile)

## Özet

Snap'in geliştiricilere sunduğu iki ana aile vardır: **Snap Kit** (kendi uygulamana "Snapchat ile giriş" — Login Kit — ve Snapchat'e içerik paylaşma — Creative Kit) ve **Snap Marketing API** (Ads API, Conversions API, **Public Profile API**, Ads Gallery API). [RESMÎ] Takip açısından tek gerçek okuma kapısı **Public Profile API**'dir: herkese açık profillerin meta verisini, Spotlight ve Saved Story listelerini ve bazı istatistikleri döndürür; ancak **allowlist** (Snap temsilcisinin onayı) ile açılır. [RESMÎ] Kişisel sohbetler, arkadaş hikâyeleri (Stories) ve Snap Map içeriği hiçbir resmî API'de yoktur. [RESMÎ — belgelerde böyle bir uç nokta yok] API'lerin kendisi ücretsizdir; Ads API reklam harcaması üzerinden işler. Webhook/push neredeyse yoktur; takip **yoklama (polling)** ile yapılır.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | **Ads Gallery API** (`adsapi.snapchat.com/v1/ads_library/...`): AB'de yayınlanmış reklamlar (`countries` filtresi yalnızca AB-27 ülke kodlarını kabul eder; `start_date`/`end_date` ile tarih aralığı verilir, en uzun aralık belgede yok) ve şu an yayındaki ticari organik içerik (sponsored content). "OAuth token gerektirmez." [RESMÎ] Ayrıca snapchat.com web profil sayfaları tarayıcıda açık (API değil). | Ücretsiz; hız sınırı belgede yok |
| Geliştirici hesabı / uygulama (Snap Kit) | Snap Kit Developer Portal'da uygulama; **Staging** client ID ile yalnızca demo kullanıcılarla test [RESMÎ] | Login Kit (display name, external ID, Bitmoji avatar), Creative Kit (Snapchat'e paylaşım) — **yalnızca oturum açan kullanıcının kendi bilgisi**, okuma yok | Ücretsiz |
| İşletme/uygulama onayı (Snap Kit App Review) | Portal'da "Submit for Review"; ikon, ad, kategori, açıklama, her Kit'in nasıl kullanılacağını anlatan entegrasyon açıklaması (Integration Description), entegrasyonu gösteren video, yalnızca uygun Kit'lerin seçilmesi, uygulamanın **kendi** gizlilik politikası (Snap'in ya da başka şirketin politikasına bağlantı kabul edilmez); inceleme genellikle 5–10 iş günü, kategoriye/içeriğe göre uzayabilir. Para kazanma (monetization) önceden onay ister; özel anlaşma için snapkit-support@snap.com [RESMÎ] | Production client ID; Login/Creative Kit'in tüm kullanıcılara açılması | Ücretsiz |
| İşletme hesabı (Marketing API) | Snap Business Manager'da organizasyon + **Organization Admin** rolüyle Business Details altında OAuth uygulaması; Snap Developer Terms + Business Tools Terms kabulü [RESMÎ] | Ads API (kampanya, kreatif, hedef kitle, raporlama), Conversions API | API ücretsiz; reklam harcaması ayrı. 20 istek/sn/uygulama, 10 istek/sn/token [RESMÎ] |
| Partner / allowlist (Public Profile API) | Business Dashboard'dan OAuth uygulaması → **client ID**'yi kullanım amacıyla Snap temsilcisine (POC) e-postayla göndermek; "Public Profile API şu an yalnızca allowlist" [RESMÎ]. Developer Portal client ID'si bu API'de **çalışmaz** [RESMÎ] | Public uç noktalar: herhangi bir herkese açık profilin meta verisi, arama, Spotlight/Saved Story listesi, abone sayısı, Spotlight izlenme/paylaşım. Authorized uç noktalar (içerik üreticisi OAuth veya opt-in ile): Stories, snap listeleri, ayrıntılı istatistik, demografi, içerik yayınlama. Tam profil ID dökümü (FULL_SNAPSHOT) ayrıca **Creator Discovery onayı** ister [RESMÎ] | Ücret belgede yok; hız sınırı belgede yok [RESMÎ — belgede yok] |
| Ücretli / kurumsal | Snap ile doğrudan ortaklık | Ayrı bir ücretli veri planı belgede yok | — |
| Resmî olmayan | snapchat.com web sayfalarının `__NEXT_DATA__` JSON'unu ayrıştırma, Apify vb. kazıyıcılar, üçüncü taraf "scraper API" servisleri | Herkese açık profilin o anki aktif hikâyesi, kaydedilmiş Highlights, Spotlight | ToS ihlali riski (aşağıya bak) |

## Kimlik doğrulama

İki ayrı OAuth 2.0 sistemi vardır; client ID'ler birbirinin yerine **kullanılamaz**. [RESMÎ]

**1) Snap Kit (Login Kit)** [RESMÎ]
- Yetkilendirme: `https://accounts.snapchat.com/accounts/oauth2/auth`
- Token: `https://accounts.snapchat.com/accounts/oauth2/token`
- Akışlar: Authorization Code + PKCE (mobil/SPA için önerilen), sunucu tarafı Authorization Code (client secret + refresh token), Implicit Grant (önerilmez).
- Kapsamlar isteğe **tam URL biçiminde** verilir (kısa adlar çalışmaz): `https://auth.snapchat.com/oauth2/api/user.display_name`, `https://auth.snapchat.com/oauth2/api/user.external_id` (uygulamaya özgü kullanıcı kimliği), `https://auth.snapchat.com/oauth2/api/user.bitmoji.avatar`, `https://auth.snapchat.com/oauth2/api/camkit_lens_push_to_device` (Camera Kit uygulamalarında otomatik). `display_name` ve `external_id` kapatılamaz; `bitmoji.avatar` kapatılabilir (belgedeki "Toggleable" sütunu).
- Access token 1 saat, authorization code 10 dakika geçerli.
- Login Kit SDK'ları **kullanımdan kaldırılıyor**; Login Kit artık doğrudan OAuth 2.0 ile uygulanmalı (OAuth servisi devam ediyor). Kullanıcı verisi SDK'larda GraphQL sorgusuyla (`fetchUserData`) alınır. [RESMÎ]

**2) Snap Marketing API (Ads, Conversions, Public Profile)** [RESMÎ]
- Uygulama: Snap Business Manager → Business Details (Organization Admin gerekir). `client_secret` yalnızca bir kez gösterilir.
- Yetkilendirme: `https://accounts.snapchat.com/login/oauth2/authorize?response_type=code&client_id=...&redirect_uri=...&scope=...&state=...`
- Token: `https://accounts.snapchat.com/login/oauth2/access_token` (`grant_type=authorization_code` veya `refresh_token`). Public Profile "Get Started" sayfası bir yerde `/login/oauth2/token` da yazıyor. [ÇELİŞKİLİ — `access_token` yolu Ads API Authentication sayfasında da geçtiği için o esas alınmalı]
- Kapsamlar (boşlukla ayrılır): `snapchat-marketing-api`, `snapchat-offline-conversions-api`, `snapchat-profile-api`.
- Access token 3600 sn; refresh token "uzun ömürlü" (süre belgede yok). 401 alınınca refresh edilip yeniden denenir.
- İstekte `Authorization: Bearer <ACCESS_TOKEN>` başlığı.
- Base URL'ler: Ads API `https://adsapi.snapchat.com/v1/...`, Public Profile API `https://businessapi.snapchat.com/...`.

## Temel uç noktalar

Takip için önemli olanlar. Base: `https://businessapi.snapchat.com` (Public Profile), `https://adsapi.snapchat.com` (Ads / Ads Gallery). Tam liste için resmî referansa bakın.

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/public/v1/public_profiles/search?query=` | Kullanıcı adı veya görünen ada göre profil arama | Allowlist (public) | Varsayılan `category=CATEGORY_BUSINESS`, `tier=TIER_PUBLIC_OFFICIAL`; sonuç yoksa `includeStandard=true`. Sayfalama yok [RESMÎ] |
| GET | `/public/v1/public_profiles/{profile_id}` | Profil meta verisi | Allowlist (public) | Herkese açık verinin alt kümesi [RESMÎ] |
| GET | `/public/v1/public_profiles/{profile_id}/spotlights` | Profilin Spotlight videoları | Allowlist (public) | **Yeni Spotlight takibi için ana uç nokta** [RESMÎ] |
| GET | `/public/v1/public_profiles/{profile_id}/saved_stories` | Kalıcı (Saved) hikâyeler | Allowlist (public) | 24 saatlik Stories burada yok [RESMÎ] |
| GET | `/public/v1/public_profiles/{profile_id}/lenses` | Profilin AR Lens'leri | Allowlist (public) | [RESMÎ] |
| GET | `/public/v1/snaps/{snap_id}/public_profile` | Bir snap ID'den profil ID bulma | Allowlist (public) | [RESMÎ] |
| GET | `/public/v1/public_profiles/discover` | Filtreli içerik üreticisi keşfi (ülke, kategori, takipçi, Spotlight izlenme, `query`…) | Allowlist (public) | `query` olmadan filtre kullanılırsa takipçi sayısına göre sıralanır; en çok 5.000 sonuç; `cursor` ile sayfalanır (cursor sorgu+filtreye bağlı). Kullanımdan kalkanlar: `country_code` → `creator_l_90_country_codes`, `subcategory` → `creator_subcategories`, `can_share_data` → `share_insights`/`share_expired_stories`; yanıttaki `spotlight_views` alanı kaldırıldı [RESMÎ] |
| GET | `/public/v1/public_profiles/change_logs` | Yalnızca Creator Monetization'a uygun kişi (Person) profilleri: değişen veya yeni uygun hâle gelen ID'ler (`INCREMENTAL`, yalnız `BusinessProfileId` sütunu; tüm allowlist ortakları) ya da tam liste (`FULL_SNAPSHOT`, parçalı CSV: `profile_id`, `creator_name`, `creator_handle`, `eligible_since`; Creator Discovery onayı gerekir). İşletme profilleri dahil değildir | Allowlist (FULL_SNAPSHOT için + Creator Discovery onayı) | İmzalı dosya URL'leri 1 saatte sona erer [RESMÎ] |
| GET | `/v1/public_profiles/{profile_id}/stories` | Profilin 24 saatlik (ephemeral) hikâyeleri | Authorized (içerik üreticisi OAuth/opt-in) | Yalnızca içerik üreticisi OAuth ile yetki verdiyse veya veri paylaşımına opt-in yaptıysa alınabilir (üreticilerin bir alt kümesi; `discover`'da `share_expired_stories=true` ile bulunur) [RESMÎ] |
| GET | `/v1/public_profiles/{profile_id}/stories/{id}/snaps` | Bir hikâyedeki snap'ler | Authorized | [RESMÎ] |
| GET | `/v1/public_profiles/{profile_id}/spotlights/{id}/stats` | Spotlight istatistiği | Authorized | Public tarafta yalnızca izlenme+paylaşım [RESMÎ] |
| GET | `/v1/public_profiles/{profile_id}/stats` | Profil istatistiği (`assetType`, breakdown/demografi) | Authorized | UI ile API arasında 24 saate kadar fark olabilir [RESMÎ] |
| GET | `/v1/public_profiles/my_profile` | Token sahibinin profili | Authorized | `snapchat-profile-api` kapsamı [RESMÎ] |
| POST | `/v1/public_profiles/{profile_id}/stories` · `/spotlights` · `/saved_stories` | İçerik yayınlama (marka/içerik üreticisi adına) | Authorized | Medya nesnesinden [RESMÎ] |
| POST | `/v1/ads_library/ads/search` | AB reklam kütüphanesinde marka/ülke/tarih ile arama | Herkese açık | Token gerekmez; `countries` yalnızca AB-27 kodları [RESMÎ] |
| GET | `/v1/ads_library/ads/{ad_id}` | Tek reklamın ayrıntısı | Herkese açık | Token gerekmez [RESMÎ] |
| GET | `/v1/ads_library/sponsored_content` | Şu an yayındaki ticari organik içerik | Herkese açık | Token gerekmez [RESMÎ] |
| POST | `/v1/ads_library/sponsored_content/search` | İçerik üreticisi adına göre ticari içerik | Herkese açık | `creator_name` [RESMÎ] |

Ads API (kampanya, reklam seti, kreatif, raporlama) uç noktaları takip için gerekli değildir; listesi: [Ads API referansı](https://developers.snap.com/api/marketing-api/Ads-API/introduction).

## Gerçek zamanlı / bildirim

- **Webhook:** Public Profile API ve Snap Kit belgelerinde webhook/abonelik yok. [RESMÎ — belgede yok]
- **Lead Generation formları** için webhook entegrasyonu oluşturulabildiği üçüncü taraf entegratörlerce bildiriliyor (yalnızca reklam formu potansiyel müşterileri; içerik takibiyle ilgisiz). [3. TARAF]
- **WebSocket / streaming / WebSub / RSS:** Resmî olarak yok. [RESMÎ — belgede yok] Snapchat profilleri için resmî RSS beslemesi bilinmiyor. [TAHMİN]
- **Change log** uç noktası yalnızca Creator Monetization'a uygun kişi profillerinin değişen/yeni uygun ID'lerini verir (işletme profilleri hariç); içerik (yeni snap) olayı değildir. [RESMÎ]
- Sonuç: yeni içerik algılama = `spotlights` / `saved_stories` uç noktalarını periyodik yoklayıp yeni ID'leri karşılaştırmak.

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Profil bulma (kullanıcı adından ID) | Evet | `public_profiles/search` | Allowlist | Varsayılan `category=CATEGORY_BUSINESS`, `tier=TIER_PUBLIC_OFFICIAL` (yalnızca resmî işletme profilleri). İçerik üreticisi için `category=CATEGORY_PERSON`, gerekirse `tier=TIER_PUBLIC`; sonuç gelmezse `includeStandard=true` ile tekrar denenir (standart katman). `limit` varsayılanı 100, sayfalama yok [RESMÎ] |
| Yeni Spotlight videosu | Evet | `/public/v1/.../spotlights` yoklama, yeni ID farkı | Allowlist | Webhook yok [RESMÎ] |
| Yeni Saved Story | Evet | `/public/v1/.../saved_stories` yoklama | Allowlist | [RESMÎ] |
| Yeni 24 saatlik Public Story | Kısmen | Authorized `/stories` — yalnızca içerik üreticisi OAuth ile yetki verdiyse veya veri paylaşımına opt-in yaptıysa (üreticilerin alt kümesi) | Authorized | Yetkisiz yalnızca resmî olmayan yolla (web sayfası) [RESMÎ]/[3. TARAF] |
| Canlı yayın başladı | Hayır | — | — | Snapchat'te herkese açık canlı yayın akışını sunan bir API belgede yok [RESMÎ — belgede yok]; platformda geniş kapsamlı genel canlı yayın özelliği bilinmiyor [TAHMİN] |
| Özel mesaj / sohbet / grup | Hayır | — | — | Hiçbir API'de yok [RESMÎ — belgede yok] |
| Arkadaş hikâyeleri, Snap Map | Hayır | — | — | Yok [RESMÎ — belgede yok] |
| Yorum (Spotlight yorumları) | Belgede yok | Resmî olmayan kazıyıcılar yorum topluyor | Resmî olmayan | [3. TARAF] |
| Abone sayısı / Spotlight izlenme değişimi | Evet | Public profil + Spotlight istatistikleri | Allowlist | Daha fazlası Authorized [RESMÎ] |
| Anahtar kelime / filtreleme | Kısmen | API içerik metni araması sunmaz; dönen başlık/açıklama alanları istemci tarafında filtrelenir | Allowlist | `discover` içindeki `query` profil keşfi içindir [RESMÎ] |
| Bir markanın reklamları / sponsorlu içerik | Evet | Ads Gallery API | Herkese açık | Yalnızca AB reklamları [RESMÎ] |

## Hız sınırları ve fiyatlar

- **Ads API / Marketing API:** uygulama başına ortalama **20 istek/sn**, access token başına **10 istek/sn**; aşılırsa `HTTP 429 Too Many Requests`. Sürekli 429 alan uygulama hızını düşürmeli. [RESMÎ]
- **Public Profile API:** ayrı limit belgede yok; Marketing API ailesinin parçası olduğu için aynı sınırların geçerli olması muhtemel. [TAHMİN]
- **Ads Gallery API:** limit belgede yok. [RESMÎ — belgede yok]
- **Snap Kit:** API kullanım ücreti yok; Creative Kit medya sınırları: görsel/video en çok 300 MB, video en çok 5 dk (10 sn'lik parçalara bölünür), altyazı 250 karakter, sticker ≤1 MB. [RESMÎ]
- **Ücret:** Snap API'leri için ücretli tarife belgede yok; Ads API'de maliyet reklam harcamasıdır. [RESMÎ]

## Resmî olmayan yollar ve riskler

- **Web sayfası ayrıştırma:** `snapchat.com/add/<kullanıcı>` gibi herkese açık profil sayfaları sunucu tarafında üretilir; sayfadaki `__NEXT_DATA__` JSON'u (`props.pageProps`) o anki hikâye snap'lerini ve kaydedilmiş Highlights albümlerini içerir; medya URL'leri Snapchat CDN'inden gelir ve süreyle geçersizleşir. [TAHMİN — önceki ikincil kaynak bağlantısı 15.10.2026'da 404 döndü, doğrulanamadı] Yapı habersiz değişebilir. [TAHMİN]
- **Hazır kazıyıcılar:** Apify üzerinde çok sayıda "Snapchat Profile / User Stories / Spotlight Scraper" aktörü ve ScrapeCreators gibi ücretli "scraper API" servisleri var (C# örnekleri dahil). [3. TARAF]
- **Ads Gallery kazıyıcıları** da var; ancak resmî API zaten kimliksiz olduğundan gerek yok. [3. TARAF]
- **Riskler:**
  - Snapchat Hizmet Şartları (Bölüm 8; yürürlük 21.09.2026) robot, spider, crawler, scraper, script veya diğer otomatik/yarı otomatik araçlarla hizmete erişmeyi ve kazımayı; yazılı izin olmadan Snapchat ile etkileşen üçüncü taraf uygulama geliştirmeyi/kullanmayı ve tersine mühendisliği yasaklar. [RESMÎ] Not: Snap Group Limited (AB/BK kullanıcıları) sürümünde bu kısıtın "uygun araştırmacıların otomatik veri toplama hakkını" (DSA kapsamında herkese açık veri) sınırlamadığı yazar; Snap Inc. sürümünde bu istisna yoktur. [RESMÎ]
  - **Resmî API ile toplanan veri de serbest değildir:** Snap Developer Terms (yürürlük 31.01.2025) 5(m) maddesi segment, profil, arama motoru veya öneri servisi oluşturmayı, bunlara yardım etmeyi ya da bunları beslemeyi yasaklar; 2(c) Business Services Data'nın yalnızca açıkça izin verilen ölçüde toplanıp saklanabileceğini söyler; 6(b) ve 8(b) sözleşme bitince veya Snap isteyince verinin silinmesini zorunlu kılar. Profil geçmişi biriktiren bir takip uygulaması bu maddelerle çatışabilir; saklama süresi ve kapsamı bu maddelere göre tasarlanmalıdır. [RESMÎ]
  - Kullanıcı hesabıyla (gayriresmî mobil API, otomasyon) erişim hesabın kapatılmasına yol açabilir. [TAHMİN]
  - Kişisel veri işleme: AB'de GDPR, Türkiye'de KVKK; herkese açık profil verisini toplamak da "kişisel veri işleme" sayılabilir. [TAHMİN — hukuki görüş değil]
  - Eski (2022 öncesi) gayriresmî kütüphaneler (Snapchat özel mobil API'sini taklit eden) büyük ölçüde çalışmıyor/bakımsız. [TAHMİN]

## SDK ve kütüphaneler

**Resmî** [RESMÎ]
- Snap Kit: iOS, Android, Web, Unity, React Native (`@snapchat/snap-kit-react-native`) başvuruları. Creative Kit 1 Ekim 2024'ten beri **code-only** (SDK kurulumu gerekmez; eski SDK çalışır ama güncellenmez). Login Kit SDK'ları kullanımdan kaldırılıyor; OAuth 2.0 doğrudan kullanılmalı.
- Kaldırılan kitler: Bitmoji Kit ve Story Kit (v2.0.0, 30.03.2022), Verify With Snapchat (v2.4.0, 11.10.2022). [RESMÎ — changelog]
- Marketing API için resmî .NET/Python SDK belgede yok; REST + OAuth doğrudan kullanılır. Portal kenar çubuğunda "Ads MCP" ürünü listelenir. [RESMÎ]

**Topluluk** [3. TARAF]
- .NET: `Snapchat.ApiClient` (NuGet, ön sürüm 0.0.21-beta, .NET Standard 2.0, tek bakıcı) — Marketing API istemcisi. Dikkat: `marketing-api-csharp-sdk` paketi Snapchat değil, Tencent Ads içindir.
- .NET'te en sağlam yol: `HttpClient` + OAuth (ör. `IdentityModel`/elle token yenileme).
- Flutter: `snapchat_loginkit` (pub.dev) — Login Kit sarmalayıcısı.
- Veri entegrasyonu araçları (dltHub, Rivery, Boomi) Snapchat Marketing kaynağı sunar.

## Postman / OpenAPI / koleksiyonlar

- Snap'in resmî Postman koleksiyonu veya OpenAPI dosyası belgelerde bulunamadı. [RESMÎ — belgede yok]
- apis.io ve API Evangelist dizinlerinde Snap/Snapchat sağlayıcı kayıtları var (resmî değil). [3. TARAF]

## Depoda ilgili sayfalar

- Bu klasördeki diğer platform sayfaları (`API/Sosyal-Medya/`) — aynı şablonla X, YouTube, Instagram vb.
- [Rehberler/Mesajlasma-Altyapilari](../../Rehberler/Mesajlasma-Altyapilari/) — Telegram, WhatsApp, BiP, SMS API'leri.
- [Programlama/proje-fikirleri](../../Programlama/proje-fikirleri/) — takip uygulaması fikri için.

## Kaynaklar

- https://developers.snap.com/api/marketing-api/Public-Profile-API/Introduction — Public Profile API tanıtımı, profil tipleri ve içerik türleri — (erişim: 15 Ekim 2026)
- https://developers.snap.com/api/marketing-api/Public-Profile-API/GetStarted — OAuth akışı, allowlist başvurusu, public/authorized ayrımı — (erişim: 15 Ekim 2026)
- https://developers.snap.com/api/marketing-api/Public-Profile-API/CreatorDiscovery — Public ve authorized uç noktaların tam listesi, arama, change log — (erişim: 15 Ekim 2026)
- https://developers.snap.com/api/marketing-api/Public-Profile-API/Profiles — Profil uç noktaları (`my_profile`, organizasyon profilleri) — (erişim: 15 Ekim 2026)
- https://developers.snap.com/api/marketing-api/Public-Profile-API/ProfileAssetManagement — Stories/Saved Stories/Spotlight okuma ve yayınlama — (erişim: 15 Ekim 2026)
- https://developers.snap.com/api/marketing-api/Public-Profile-API/FAQ — Public veriler (abone, Spotlight izlenme/paylaşım), veri farkları — (erişim: 15 Ekim 2026)
- https://developers.snap.com/api/marketing-api/Ads-API/introduction — Ads API genel bakış ve bölümleri — (erişim: 15 Ekim 2026)
- https://developers.snap.com/api/marketing-api/Ads-API/authentication — Marketing API OAuth, kapsamlar, token süresi — (erişim: 15 Ekim 2026)
- https://developers.snap.com/api/marketing-api/Ads-API/rate-limits — 20/10 istek/sn sınırları — (erişim: 15 Ekim 2026)
- https://developers.snap.com/marketing-api/Ads-Gallery-Api/using-the-api — Kimliksiz Ads Gallery uç noktaları — (erişim: 15 Ekim 2026)
- https://developers.snap.com/snap-kit/login-kit/overview — Login Kit kapsamları, OAuth uç noktaları, SDK kaldırma notu — (erişim: 15 Ekim 2026)
- https://developers.snap.com/snap-kit/creative-kit/overview — Creative Kit platformları, medya sınırları, code-only geçişi — (erişim: 15 Ekim 2026)
- https://developers.snap.com/snap-kit/app-review/submission-and-review — Snap Kit App Review süreci (5–10 iş günü) — (erişim: 15 Ekim 2026)
- https://developers.snap.com/snap-kit/changelog — Bitmoji Kit, Story Kit, Verify With Snapchat kaldırma tarihleri — (erişim: 15 Ekim 2026)
- https://www.snap.com/terms/developer — Snap Developer Terms (yürürlük 31.01.2025; 2(c), 5(m), 6(b), 8(b)) — (erişim: 15 Ekim 2026)
- https://www.snap.com/terms — Snap Hizmet Şartları, Bölüm 8 (yürürlük 21.09.2026; AB araştırmacı istisnası Snap Group Limited sürümünde) — (erişim: 15 Ekim 2026)
- https://www.nuget.org/packages/Snapchat.ApiClient — Topluluk .NET Marketing API istemcisi — (erişim: 15 Ekim 2026)
- https://conductatlas.com/platform/snapchat/snapchat-terms-of-service/provision/CA-P-024173/prohibition-on-automated-scraping-of-services/ — Snapchat ToS kazıma yasağı maddesinin ikincil analizi — (erişim: 15 Ekim 2026)
- https://leadsbridge.com/integrations/snapchat-lead-generation/webhook-classic/ — Lead Generation webhook entegrasyonu (üçüncü taraf) — (erişim: 15 Ekim 2026)
