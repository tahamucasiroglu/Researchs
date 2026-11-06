# Google AdMob (AdMob API ve ödüllü reklam SSV)

> Yazılma tarihi: 6 Kasım 2026 · Son doğrulama: 6 Kasım 2026 · Durum: **resmî, yalnız kendi hesabın** (ödül geri çağrısı ve rapor API'si var; masaüstü/web SDK'sı ve başka uygulamaları izleme yok)

## Özet

Google AdMob, mobil uygulamalara (Android, iOS) reklam koyup gelir elde etmeyi sağlayan reklam ağıdır. Geliştirici açısından üç ayrı yüzeyi vardır [RESMÎ]:

1. **Google Mobile Ads SDK**: Uygulamaya gömülen istemci kiti (Android, iOS, Unity, Flutter). AB/BK/İsviçre onayı için yanında **UMP SDK** (User Messaging Platform) kullanılır.
2. **Ödüllü reklam sunucu tarafı doğrulaması (SSV)**: Kullanıcı ödüllü reklamı tamamlayınca Google, reklam biriminde tanımladığın adrese ECDSA ile imzalı bir HTTP isteği gönderir. AdMob'da senin sunucuna gelen **tek gerçek zamanlı bildirim** budur.
3. **AdMob API** (`admob.googleapis.com`, REST, v1 ve v1beta): Hesap, uygulama ve reklam birimi listesi ile ağ (network), mediation ve kampanya raporları. OAuth 2.0 ile yalnız **yetki veren yayıncı hesabının** verisi okunur.

API ve SSV için ücret yoktur; kotalar Google Cloud projesi başınadır (rapor okuma dakikada 900 istek) [RESMÎ]. Uygulama, reklam birimi ve mediation grubu **oluşturma** uçları v1beta'dadır ve "sınırlı erişim"lidir: `admob.monetization` kapsamı ister, 403 alan hesap yöneticisine başvurur. Mediation gruplarını ve reklam birimi eşlemelerini listeleyen iki v1beta okuma ucu da sınırlı erişimlidir [RESMÎ]. AdMob'da uygulama kurulurken yalnız **Android ya da iOS** seçilebilir; Flutter eklentisi "web ve masaüstünü desteklemez" diye yazar. Yani Windows/macOS/Linux masaüstü ve web için AdMob SDK'sı yoktur [RESMÎ]. Web sitesindeki ödüllü reklam Ad Manager/GPT'nin konusudur (aynı klasördeki [Google Ad Manager](Google-Ad-Manager.md) sayfası). Android'de klasik SDK (`play-services-ads`, belgede "Legacy") **bakım modundadır**; yeni özellikler GMA Next-Gen SDK'ya (`ads-mobile-sdk`) gelir [RESMÎ]. **Başka geliştiricilerin uygulamalarının** gelirini, indirmesini ya da reklamlarını izleyecek bir uç nokta yoktur.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| **Herkese açık (kimliksiz)** | — | SSV açık anahtar dosyası (`https://www.gstatic.com/admob/reward/verifier-keys.json`), API Discovery belgeleri, Google'ın test reklam birimi kimlikleri (ör. Android ödüllü test birimi `ca-app-pub-3940256099942544/5224354917`) [RESMÎ]. Kimliksiz bir veri API'si yok | — |
| **Geliştirici hesabı (AdMob hesabı + Google Cloud projesi)** | Google hesabı ve AdMob başvurusu. İnceleme genelde en çok 24 saat sürer, nadiren 2 haftayı bulur. Ödeme bilgisi girilmeden reklam gösterilmez ve uygulama incelenmez. Google yerel telefon numarası, bireysel ya da şirket kimliği ve banka hesabı olan bir hesap açmayı öneriyor [RESMÎ]. API için Cloud projesinde AdMob API etkinleştirilir ve OAuth istemcisi ("Desktop app" ya da "Web application") oluşturulur [RESMÎ] | SDK ile test reklamı ve (onaydan sonra) canlı reklam; reklam biriminde SSV geri çağrı adresi; API v1: `accounts`, `apps.list`, `adUnits.list`, `networkReport:generate`, `mediationReport:generate`; v1beta okuma: `adSources`, `adapters`, `campaignReport:generate` [RESMÎ]. v1beta'daki `mediationGroups.list` ve `adUnitMappings.list` de okuma ucudur, ama belgede "limited access" diye işaretli (bir alt satır) [RESMÎ] | Ücretsiz; proje başına kotalar (aşağıda) [RESMÎ] |
| **İşletme / uygulama onayı** | (a) Uygulamanın desteklenen bir mağazada yayında ve AdMob'a bağlı olması gerekir: Google Play, App Store, ayrıca Amazon Appstore, Samsung Galaxy Store, Xiaomi GetApps, OPPO, VIVO. Bunun yanında **app-ads.txt doğrulaması** (Ocak 2025'ten beri yeni uygulamalarda zorunlu) ve "app readiness" incelemesi (genelde 2–3 gün) gerekir [RESMÎ]. (b) v1beta'nın "limited access" işaretli uçları için Google'ın erişim vermesi gerekir. Yazma uçları `admob.monetization` kapsamı ister; iki okuma ucu `admob.readonly` ile de çağrılabilir [RESMÎ] | (a) Tam reklam sunumu. Onaylanana kadar uygulama "sınırlı reklam sunumu" alır; reddedilen (disapproved) uygulamada reklam sunumu tamamen kapatılır [RESMÎ]. (b) `apps.create`, `adUnits.create`, reklam birimi eşlemesi (`adUnitMappings`) oluşturma ve listeleme, `mediationGroups.list/create/patch`, mediation A/B deneyi başlatma ve durdurma [RESMÎ] | Ücretsiz. (b) için belgede ayrı bir başvuru yolu tarif edilmiyor; yalnız "403 permission denied alırsan hesap yöneticine yaz" deniyor [RESMÎ] |
| **Ücretli / kurumsal** | — | API ya da SSV için ücretli katman yok [RESMÎ: fiyat belgesi yok]. Ek günlük kota, AdMob API geliştirici forumunda kullanım senaryosu anlatılarak istenir [RESMÎ] | — |
| **Resmî olmayan** | Konsolu kazıma, mobil SDK'yı masaüstünde emülatör ya da sarmalayıcıyla çalıştırma, istemci ödül geri çağrısını taklit etme | Bkz. "Resmî olmayan yollar ve riskler" | Politika ihlali hesabı kapattırır. Geçersiz etkinlikten kapatılan yayıncı yeni hesap açamaz, AdSense dahil diğer Google yayıncı ürünlerine de katılamaz [RESMÎ] |

## Kimlik doğrulama

**AdMob API**

- Yalnız **OAuth 2.0** desteklenir: "All requests to the AdMob API must be authorized by an authenticated user" [RESMÎ]. Hizmet hesabı (service account) desteklenmiyor. AdMob API geliştirici forumundaki 2 Nisan 2024 tarihli yanıt: "we don't support service account authentication in general at this point" [3. TARAF: Google forumu; yanıtlayanın ekip etiketi sayfada görünmüyor, yanıt "we" diyerek Google adına yazılmış]. Sunucuda çalışan bir yoklayıcı için kullanıcı bir kez tarayıcıda izin verir, uygulama **refresh token**'ı saklar [TAHMİN: standart OAuth kullanımı].
- Akış seçimi [RESMÎ]:
  - **Desktop app**: Tüm AdMob hesaplarını tek bir üst düzey yönetici hesabından yönetiyorsan, ilk kez deniyorsan ya da en basit kurulumla hızlı başlamak istiyorsan bu akışı seç. Uygulaman AdMob kullanıcılarını tek bir makineden yetkilendiriyorsa da bu akış uygundur. Sunucuda çalışan uygulama için de seçilebilir; fark, iznin yerel makinede verilmesidir.
  - **Web application**: Başka kullanıcıların kendi AdMob verilerine erişim izni vermesi gerekiyorsa bu akışı seç. Üçüncü taraf hesaplar için çok sayıda yetki üretmek (ajans, çok hesaplı panel) ya da geri çağrı adresi (callback URL) kullanmak istiyorsan da bu akış gerekir. Belgeye göre callback URL'ler Desktop akışında desteklenmez.
- Kapsamlar [RESMÎ]:
  - `https://www.googleapis.com/auth/admob.readonly`: Tüm AdMob verisini okur (hesap, envanter, mediation ayarları, raporlar). **Ödeme ve kampanya ayrıntıları hariçtir.** Kampanya raporu (`campaignReport:generate`) yine de bu kapsamla çağrılabiliyor; "kampanya ayrıntıları"nın rapor dışındaki kampanya ayarlarını kastettiği varsayılır [TAHMİN].
  - `https://www.googleapis.com/auth/admob.report`: Performans ve kazanç raporları ile yayıncı kimliği, saat dilimi ve para birimini okur. Discovery belgesine göre `apps.list` ve `adUnits.list` bu kapsamla çağrılamaz; onlar için `admob.readonly` gerekir.
  - `https://www.googleapis.com/auth/admob.monetization`: v1beta oluşturma ve güncelleme uçları içindir; erişimi sınırlıdır. Başvuru sayfalarında geçer ama 6.11.2026'daki Discovery belgelerinin kapsam listesinde yoktur. Bu yüzden Discovery'den üretilen istemcilerde sabiti bulunmaz: `Google.Apis.AdMob.v1beta` 1.78.0.4298'de yalnız `AdmobReadonly` ve `AdmobReport` var, kapsam adresi elle yazılır [RESMÎ: Discovery belgesi ve NuGet paketi incelemesi].
- OAuth izin ekranı "External" ve yayın durumu "Testing" ise Google refresh token'ı **7 gün** sonra geçersiz kılar. Sürekli çalışan bir yoklayıcıda yayın durumu "Published" olmalı [RESMÎ: Google OAuth belgesi]. AdMob kapsamlarının Google'ın "hassas kapsam" (sensitive scope) doğrulamasına girip girmediği belgede yok [TAHMİN: doğrulanamadı].
- İlk OAuth akışında AdMob yayıncı kimliği sorulur. Uygulama, o an oturum açık olan Google hesabının erişebildiği AdMob verisine yetkilenir [RESMÎ]. `accounts.list` yalnız "AdMob arayüzünde en son oturum açılan" yayıncı hesabını döner; hesap kaynağının adı `accounts/pub-XXXXXXXXXXXXXXXX` biçimindedir [RESMÎ].
- Taban adres `https://admob.googleapis.com`. Discovery belgeleri `https://admob.googleapis.com/$discovery/rest?version=v1` ve `…?version=v1beta` adreslerindedir [RESMÎ].

**SSV geri çağrısı (senin sunucuna gelen istek)**

- İstek senin belirlediğin bir parola ya da token taşımaz; güven **imzadan** gelir. Sorgu dizesinin `signature` öncesindeki kısmı Google'ın özel anahtarıyla ECDSA + SHA-256 kullanılarak imzalanır (DER kodlu). Sen bunu Google'ın yayımladığı açık anahtarla doğrularsın [RESMÎ]. 6.11.2026'da anahtar dosyasındaki tek anahtar P-256 eğrisindeydi [RESMÎ: anahtar dosyası incelemesi].
- Belge ek olarak "geri çağrının Google'dan geldiğini ters DNS (reverse DNS) sorgusuyla doğrula" diyor. Beklenen alan adını ise yazmıyor [RESMÎ: alan adı belgede yok]. Asıl güvence imza doğrulamasıdır [TAHMİN].

## Temel uç noktalar

Taban adres `https://admob.googleapis.com`; `{pub}` = `pub-XXXXXXXXXXXXXXXX`. v1 kararlı sürüm, v1beta beta sürümdür [RESMÎ].

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/v1/accounts` | Son oturum açılan yayıncı hesabını listeler | `admob.readonly` / `admob.report` | Hesap okuma kotası 900/dk [RESMÎ] |
| GET | `/v1/accounts/{pub}` | Yayıncı kimliği, raporlama saat dilimi, para birimi | aynı | [RESMÎ] |
| GET | `/v1/accounts/{pub}/apps` | Uygulamaları listeler; `appApprovalState` (`IN_REVIEW`, `ACTION_REQUIRED`, `APPROVED`) döner | `admob.readonly` | `pageSize` varsayılan 10.000, en çok 20.000; envanter kotası 120/dk ve 172.800/gün [RESMÎ] |
| GET | `/v1/accounts/{pub}/adUnits` | Reklam birimlerini listeler (biçim, izinli reklam türleri) | `admob.readonly` | aynı [RESMÎ] |
| POST | `/v1/accounts/{pub}/networkReport:generate` | AdMob Network raporu. Boyutlar: `DATE`/`WEEK`/`MONTH`, `APP`, `AD_UNIT`, `COUNTRY`, `FORMAT`, `PLATFORM`, `AD_TYPE`, `APP_VERSION_NAME`, `GMA_SDK_VERSION`, `SERVING_RESTRICTION` vb. Metrikler: `ESTIMATED_EARNINGS`, `IMPRESSIONS`, `CLICKS`, `IMPRESSION_RPM`, `AD_REQUESTS`, `MATCH_RATE`, `SHOW_RATE` vb. | `admob.readonly` / `admob.report` | Yanıt bir **akıştır**: `header`, `row`… ve `footer` öğelerinden oluşan JSON dizisi. En çok 100.000 satır döner. Tutarlar mikro birimdir (6,50 $ = 6500000). `timeZone` yalnız hesap varsayılanı ya da `America/Los_Angeles` olabilir. Rapor kotası 900/dk [RESMÎ] |
| POST | `/v1/accounts/{pub}/mediationReport:generate` | Mediation raporu; ek boyutlar `AD_SOURCE`, `AD_SOURCE_INSTANCE`, `MEDIATION_GROUP`; ek metrikler `OBSERVED_ECPM`, `AD_LOAD_LATENCY` | aynı | Üçüncü taraf şelale (waterfall) verisi 8–24 saat gecikebilir [RESMÎ] |
| POST | `/v1beta/accounts/{pub}/campaignReport:generate` | AdMob Kampanyalar raporu. Kampanya iki türlüdür: ev reklamı (kendi uygulamalarını ücretsiz çapraz tanıtım) ve doğrudan satılan kampanya. Gösterim, tıklama, yükleme ve tahmini maliyet döner | `admob.readonly` / `admob.report` | Tarih aralığı en çok 30 gün. Yanıt akış değil, tek JSON nesnesidir (`rows`, en çok 100.000 satır) [RESMÎ] |
| GET | `/v1beta/accounts/{pub}/adSources`, `…/adSources/{id}/adapters` | Reklam kaynaklarını ve bağdaştırıcılarını (adapter) listeler | `admob.readonly` (`adSources` için `admob.report` de olur) | [RESMÎ] |
| GET | `/v1beta/accounts/{pub}/mediationGroups`, `…/adUnits/{id}/adUnitMappings` | Mediation gruplarını ve reklam birimi eşlemelerini listeler | `admob.readonly` ya da `admob.monetization` + **sınırlı erişim** | Belgede "This method has limited access"; 403 alınırsa hesap yöneticisine başvurulur [RESMÎ] |
| POST / PATCH | `/v1beta/accounts/{pub}/apps`, `…/adUnits`, `…/adUnits/{id}/adUnitMappings`, `…/adUnitMappings:batchCreate`, `…/mediationGroups`, `…/mediationGroups/{id}`, `…/mediationAbExperiments` (`:stop`) | Uygulama, reklam birimi, eşleme, mediation grubu ve A/B deneyi oluşturur ya da günceller | `admob.monetization` + sınırlı erişim | 403 alınırsa hesap yöneticisine başvurulur [RESMÎ] |
| Gelen istek | Senin SSV adresin, ör. `https://ornek.com/admob/ssv?ad_network=…&…&signature=…&key_id=…` | Ödüllü (ya da ödüllü geçiş) reklam tamamlanınca Google'ın gönderdiği imzalı bildirim | Reklam biriminde SSV açık | `200 OK` beklenir; gelmezse 1 sn arayla en çok 5 kez yeniden dener [RESMÎ]. HTTP yöntemi SSV belgesinde yazmıyor; parametreler sorgu dizesinde gelir. Google'ın resmî örnek sunucusu (`RewardedSSVExample`) ucu `@GetMapping` ile, yani GET olarak tanımlıyor [RESMÎ: örnek kod] |
| GET | `https://www.gstatic.com/admob/reward/verifier-keys.json` | SSV açık anahtarlarını (`keyId`, `pem`, `base64`) verir | Herkese açık | En çok 24 saat önbelleğe alınır [RESMÎ]. Belgedeki `gstatic.com/…` bağlantısı 301 ile `www.gstatic.com/…` adresine yönleniyor |

Saatlik rapor ve bidding metrikleri sunan "Ads Activity Report" alfa API'si artık desteklenmiyor. Belge yerine Mediation Report API'yi öneriyor [RESMÎ]. Tam liste: [AdMob API REST başvurusu](https://developers.google.com/admob/api/reference/rest).

## Gerçek zamanlı / bildirim

### Ödüllü reklam SSV geri çağrısı

**Kurulum** [RESMÎ]: AdMob → Uygulamalar → uygulama → Reklam birimleri → ödüllü (ya da ödüllü geçiş) reklam birimi → Gelişmiş ayarlar → Sunucu tarafı doğrulama → "Set up and verify callback URL". Tam geri çağrı adresini gir ve "Verify URL" ile doğrula; doğrulanmayan adres kaydedilmez. Ardından "Use verified URL" seçilir. Mediation'daki üçüncü taraf ağlar için de SSV istiyorsan "Apply to all networks in Mediation groups" kutusunu işaretle. Arayüzdeki "User ID" ve "Custom data" alanları **yalnız test** içindir; gerçek değerleri uygulamadaki SDK gönderir. Adrese kendi sorgu parametreni eklemek yerine ayrımı yol (path) ile yapmak daha güvenli olur; hazır parametrelerin imzaya nasıl girdiği belgede yok [TAHMİN].

**Parametreler**: Parametreler alfabetik sırayla gelir; son ikisi her zaman sırasıyla `signature` ve `key_id`'dir [RESMÎ].

| Parametre | Anlamı | Not |
|---|---|---|
| `ad_network` | Reklamı dolduran reklam kaynağının kimliği (ör. AdMob Network `5450213213286189855`) | Kimlik → ad tablosu SSV belgesinde [RESMÎ] |
| `ad_unit` | Reklamı isteyen AdMob reklam birimi kimliği | [RESMÎ] |
| `custom_data` | Uygulamanın SDK'da verdiği serbest metin | Verilmediyse parametre hiç gelmez. Yüzde kodlu (percent-escaped) gelir, ayrıştırırken çözmek gerekebilir [RESMÎ] |
| `key_id` | Doğrulamada kullanılacak açık anahtarın kimliği | 32 bit `int`'e sığmayabilir: 6.11.2026'daki üretim anahtarının kimliği `3335741209`, Tink de `long` kullanıyor [RESMÎ: anahtar dosyası, Tink kodu]. Belgedeki elle doğrulama örneği 32 bit `Integer` kullanıyor; bu büyüklükteki kimliklerde çalışmaz [TAHMİN: Java davranışından çıkarım] |
| `reward_amount`, `reward_item` | Reklam birimi ayarlarındaki ödül miktarı ve adı | Miktar AdMob arayüzünde tanımlanır, istemciden gelmez [TAHMİN: çıkarım]. Boşluk ya da Türkçe karakter içeren ödül adı yüzde kodlu gelir (ör. `reward_item=%C3%96d%C3%BCl` = "Ödül") [3. TARAF: GitHub'da yayımlanmış gerçek istekler] |
| `signature` | Google'ın imzası | URL-safe Base64 (belgedeki örnekte `=` dolgusu yok), DER kodlu ECDSA [RESMÎ: Tink kodu ve belgedeki örnek değer] |
| `timestamp` | Ödül zamanı; belgeye göre "Epoch time in ms" | Belgedeki örnek değer 16 hanelidir, yani mikrosaniye gibi görünür [ÇELİŞKİLİ]. GitHub'da yayımlanmış gerçek bir konsol isteğinde değer 13 haneliydi (`1788526923895`, ms); isteğin imzası bu çalışmada Google'ın üretim anahtarıyla doğrulandı [3. TARAF: istek GitHub'dan; imza sınaması 6.11.2026]. Zaman penceresi denetimi yapacaksan birimi hane sayısından anla |
| `transaction_id` | Her ödül olayı için tekil, onaltılık (hex) kimlik | Tekrar korumasının anahtarı [RESMÎ] |
| `user_id` | Uygulamanın SDK'da verdiği kullanıcı kimliği | Verilmediyse gelmez [RESMÎ] |

**SDK'da değerleri verme** [RESMÎ]: Değerler reklam yüklendikten sonra, **gösterilmeden önce** verilir.

- Android Legacy: `ServerSideVerificationOptions.Builder().setUserId(…).setCustomData(…).build()` → `rewardedAd.setServerSideVerificationOptions(…)`
- Android GMA Next-Gen: `ServerSideVerificationOptions("userId", "customData")`
- iOS: `ServerSideVerificationOptions` nesnesinin `userIdentifier` ve `customRewardString` alanları
- Unity: `new ServerSideVerificationOptions.Builder().SetUserId(…).SetCustomData(…).Build()`
- Flutter: `ServerSideVerificationOptions(userId: …, customData: …)` → `ad.setServerSideOptions(…)`

**İmza doğrulama adımları** [RESMÎ: SSV belgesi ve Google'ın Tink `RewardedAdsVerifier` kodu]:

1. Ham sorgu dizesinde `&signature=` konumunu bul. Öncesindeki her şey **imzalanan içeriktir**. Belge, parametre sırası dahil içeriğin değiştirilmemesini ister.
2. `signature=` ile `&key_id=` arasındaki değeri URL-safe Base64 olarak çöz; çıkan DER imzadır. `key_id`'yi `long` olarak oku.
3. Anahtar dosyasından `keyId`'si eşleşen anahtarı al. `base64` alanı SubjectPublicKeyInfo (DER), `pem` aynı anahtarın PEM hâlidir.
4. İçeriğin yüzde kodlarını çöz (Tink'teki `URI.getQuery()` gibi; aşağıdaki "Yüzde kodu" notu), UTF-8 baytlarını ECDSA-SHA256 ile doğrula. Doğrulama başarısızsa ödül verme.

Doğrulamada dikkat edilecekler:

- **Yüzde kodu** [ÇELİŞKİLİ]: Belge içeriğin "hiçbir şekilde değiştirilmemesini" söylüyor. Belgenin kendi elle doğrulama kodu ve Google'ın önerdiği Tink kodu ise imzayı Java `URI.getQuery()` ile, yani **yüzde kodları çözülmüş** metin üzerinden doğruluyor. Tink'in birim testi de `foo=hello%20world` adresinin imzasını `foo=hello world` metni üzerinden atıyor [RESMÎ]. Google'ın Spring Boot örneği (`RewardedSSVExample`) ise ham `request.getQueryString()` kullanıyor; Servlet belgesine göre bu değer çözülmez [RESMÎ: örnek kod, Servlet API belgesi].
- **Gerçek istekle sınama**: GitHub'da yayımlanmış gerçek bir AdMob konsol isteği (`reward_item=%ED%9E%8C%ED%8A%B8`, `key_id` 3335741209) 6.11.2026'da Google'ın üretim anahtarıyla, bu sayfadaki C# yoluyla sınandı. Çözülmüş içerik doğrulandı, ham içerik reddedildi [3. TARAF: istek GitHub'dan; sınama bu çalışmada]. Bu yüzden Tink'in okumasını esas al. `RewardedSSVExample` ve ham sorguyu doğrulayan uygulamalar, boşluk ya da Türkçe karakter içeren değerlerde geçerli istekleri reddeder [TAHMİN: sınamadan çıkarım]. C#'taki karşılığı `Uri.UnescapeDataString`'dir (`+` işaretini boşluğa çevirmez, `HttpUtility.UrlDecode` çevirir).
- **Değerleri okuma**: Parametre değerlerini ham sorgudan oku (ASP.NET Core'da `Request.Query`); çözülmüş metni `&` ile bölme, yoksa `custom_data` içindeki `%26` yeni bir parametre gibi görünür. `custom_data`, `user_id` ve ödül adını (`reward_item`) yalnız URL-güvenli karakterlerden (`A–Z a–z 0–9 - _`) kurarsan iki okuma aynı sonucu verir ve belirsizlik ortadan kalkar [TAHMİN: tasarım önerisi].
- **Anahtar dönüşü**: Anahtarlar düzensiz aralıklarla değişir. Önbellek en çok **24 saat** tutulur; değişimden önce e-postayla haber verilir [RESMÎ]. Bilinmeyen bir `key_id` gelirse listeyi yeniden çek, ama bunu (ör. dakikada bir) sınırla; yoksa sahte isteklerle anahtar sunucusuna gereksiz yük bindirilir [TAHMİN].
- **Test anahtarları**: Tink'te bir test anahtar listesi de tanımlı (`https://www.gstatic.com/admob/reward/verifier-keys-test.json`). Hangi geri çağrıların bununla imzalandığı belgede yok [TAHMİN: doğrulanamadı]. Yukarıda sınanan konsol isteği ("Verify URL") üretim anahtarıyla imzalıydı [3. TARAF: istek; sınama bu çalışmada]. Üretimde yalnız üretim listesine güven.

**Tekrar koruması ve ödül akışı**

- Google'ın önerisi [RESMÎ]: Kullanıcı deneyimi için ödülü istemci geri çağrısıyla hemen ver, ama tüm ödülleri sunucu geri çağrısı gelince doğrula. Ödülün geçerliliği kritikse (ör. oyun içi ekonomi) ve gecikme kabul edilebilirse doğrulanmış sunucu geri çağrısını bekle.
- `transaction_id`'yi benzersiz kısıtla (unique index) kaydet. Aynı kimlik ikinci kez gelirse krediyi yeniden yazma ama yine **200** dön. Google 200 almayınca 1 sn arayla 5 kez dener, bu yüzden işleyici idempotent olmalı [RESMÎ: yeniden deneme davranışı; idempotent tasarım TAHMİN].
- 5 deneme de başarısız olursa kaçan geri çağrıyı yeniden isteyecek bir API belgede yok [RESMÎ: belgede yok]. Kesinti sırasında kullanıcıya "ödül işleniyor" göster ve bir destek yolu bırak [TAHMİN].
- `user_id` ve `custom_data` **istemcide** ayarlanır. İmza, bu değerlerin Google tarafından iletildiğini kanıtlar; doğru kullanıcıya ait olduklarını kanıtlamaz [TAHMİN: çıkarım]. Bu yüzden `custom_data`'ya sunucunun ürettiği tek kullanımlık, kısa ömürlü, kullanıcıya bağlı bir belirteç koy. Geri çağrıda belirteci tüket, kullanıcıyı sunucu tarafında bul, günlük tavanı uygula [TAHMİN]. Depodaki [Masaüstü reklam araştırması](../../Rehberler/Masaustu-Uygulama-Reklam/) §3 aynı akışı öneriyor.
- `user_id` ve `custom_data` içine e-posta ya da telefon gibi kişisel veri koyma. Bu değerler Google üzerinden geçer ve sunucu günlüklerine düşer (KVKK/GDPR) [TAHMİN].
- Ödüllü reklam atlanabilir olmak zorundadır. Ödül "atlama süresi" dolunca verilir: en çok 30 sn, yüksek etkileşimli reklamlar açıksa 60 sn [RESMÎ]. Atlama süresinden önce reklamı kapatan ya da engelleyici kullanan kullanıcıya SSV gelmez; "izlemeden ödül yok" kendiliğinden sağlanır [TAHMİN: çıkarım].
- **Test**: AdMob arayüzündeki doğrulama aracını ("Verify URL") ve Google'ın Java Spring Boot örneğini (`RewardedSSVExample`) kullan [RESMÎ]. Örnek imzayı ham sorgu üzerinden doğruladığı için yalnız ASCII değerlerle doğru çalışır; "Yüzde kodu" notuna bak [TAHMİN: koddan ve sınamadan çıkarım]. Kendi canlı reklamına tıklamak yasak olduğu için geliştirmede test reklam birimleri kullanılır [RESMÎ].

### Diğer olaylar

- **Gösterim düzeyinde gelir** (impression-level ad revenue): SDK her gösterimde tahmini değeri bildirir. Legacy SDK'da bu `OnPaidEventListener` ile, Next-Gen'de `onAdPaid` ile gelir; değer mikro birim, para birimi ve kesinlik türüyle verilir. Özelliğin AdMob arayüzünde açılması gerekir; Android Legacy'de SDK 21.1.0+ şarttır [RESMÎ]. Bu bir **istemci** olayıdır. Kendi sunucuna iletebilirsin ama imzasızdır; kesin gelir kaynağı olarak kullanılamaz [TAHMİN].
- **Webhook / push**: Gelir, ödeme, politika ihlali, "sınırlı reklam sunumu" ve uygulama onayı için webhook, WebSocket ya da RSS belgede yok [RESMÎ: belgede yok]. Bunlar arayüzde (Politika merkezi, Ödemeler) ve e-postayla bildirilir. Uygulama onay durumu `apps.list` → `appApprovalState` alanıyla yoklanabilir [RESMÎ].
- **Rapor tazeliği** [RESMÎ]:
  - AdMob ve bidding verisi genelde **~4 saat** gecikmeli gelir. Üçüncü taraf şelale kaynaklarında gecikme en hızlı 8, ortalama 12, en yavaş 24 saattir. İlk saatlerde veri eksik görünebilir.
  - Tahmini kazanç, geçersiz tıklamalar ayıklandıkça ilk 48 saatte düşebilir. Kesin kazanç ay sonunda belirlenir.
  - Kesin kazanç ve ödemeler `America/Los_Angeles` saat dilimiyle hesaplanır. Önceki ayın istatistikleri her ayın 1'inde 03:00 PT'den sonra dondurulur.

## Neler mümkün

| İş | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Kullanıcı ödüllü reklamı tamamlayınca sunucuda kredi yazmak | **Evet, gerçek zamanlı** | SSV geri çağrısı + imza doğrulama + `transaction_id` tekilliği | Geliştirici (reklam biriminde SSV) | Gecikebilir; kritik ödülde sunucu geri çağrısını bekle [RESMÎ] |
| Masaüstü ya da web ürününde reklam izletip kredi vermek | **AdMob ile hayır** | — | — | SDK yalnız Android/iOS [RESMÎ]. Web için Ad Manager ödüllü reklamı + SSV: [Masaüstü reklam araştırması](../../Rehberler/Masaustu-Uygulama-Reklam/), [Google Ad Manager](Google-Ad-Manager.md) |
| Kendi uygulamalarının günlük gelir/gösterim panelini beslemek | **Evet, yoklama** | `networkReport:generate`, `mediationReport:generate` | `admob.report` | Veri ~4 saat gecikmeli olduğu için saatte bir yoklamak yeterli [TAHMİN] |
| Gelir düşüşü ya da hedefe ulaşma alarmı | Kendi tarafında | Rapor yoklaması + kendi eşik kuralın | `admob.report` | Push yok |
| Her gösterimin tahmini gelirini anlık görmek | Kısmen | SDK paid event → kendi sunucun | AdMob'da özellik açık | İstemci verisi, imzasız |
| Uygulama onayı değişimini izlemek | Kısmen | `apps.list` → `appApprovalState` yoklaması | `admob.readonly` | Politika merkezinin ayrıntısı API'de yok [RESMÎ: belgede yok] |
| Ödeme yapıldı / bakiye bilgisi | **Hayır (API)** | — | — | `admob.readonly` ödeme verisini kapsamaz [RESMÎ]; yalnız arayüz ve e-posta |
| Uygulama, reklam birimi, mediation grubu oluşturmak | Sınırlı | v1beta yazma uçları | `admob.monetization` + erişim izni | 403 → hesap yöneticisi [RESMÎ] |
| Müşterinin ya da ortağın AdMob hesabını raporlamak | Evet, izinle | Web application OAuth akışı; her hesap için ayrı token | `admob.report` | Konsol erişimini paylaşmak politika gereği kısıtlı ("Politika ve uyum") |
| Başka geliştiricilerin uygulamalarının gelirini, indirmesini, reklamlarını izlemek | **Hayır** | — | — | API yalnız yetki veren yayıncının verisini döner. Herkese açık `app-ads.txt` dosyaları yalnız yetkili satıcıları gösterir, gelir göstermez [TAHMİN] |
| Ödül olarak nakit, kripto ya da hediye kartı | **Hayır** | — | — | Politika yasağı [RESMÎ] |

## Hız sınırları ve fiyatlar

- **Fiyat**: AdMob API ve SSV için ücret yok [RESMÎ: fiyat belgesi yok]. Gelir modeli, reklam gelirinin Google ile paylaşılmasıdır; paylaşım oranı bu sayfada incelenmedi.
- **AdMob API kotaları (proje başına)** [RESMÎ]:

| Kota | Limit |
|---|---|
| Hesap okuma | 900 istek/dk |
| Envanter okuma (`apps`, `adUnits`…) | 120 istek/dk; 172.800 istek/gün |
| Rapor okuma | 900 istek/dk |

- Bunların üstünde ayrıca "arka uç işlem maliyeti" tavanları var. Kota içindeyken `429 RESOURCE_EXHAUSTED` alırsan istemci tarafında hız sınırı koy ve istek başına satır sayısını düşür; bunun için tarih aralığını ve boyut sayısını azalt. Ek günlük kota forumdan istenir [RESMÎ].
- **Rapor boyutu**: İstek başına en çok 100.000 satır (`maxReportRows` 1–100.000) [RESMÎ]. Arayüzdeki raporlar 50.000 satırla sınırlı [RESMÎ]. Kampanya raporunda tarih aralığı en çok 30 gün [RESMÎ].
- **SSV**: Yayımlanmış bir hız sınırı yok. Google yalnız `200 OK` bekler, gelmezse 1 sn arayla 5 kez dener [RESMÎ].

### Ödeme eşikleri ve takvim

Eşikler raporlama para birimine göre değişir. Hepsi tahmini kazanca değil, "ödeme geçmişi" sayfasındaki bakiyeye göre işler [RESMÎ]:

| Eşik | USD hesabı | EUR hesabı | TRY hesabı |
|---|---|---|---|
| Doğrulama (kimlik / adres PIN'i) | 0 $ / 10 $ | 0 $ / 10 $ karşılığı | 0 $ / 10 $ karşılığı |
| Ödeme yöntemi seçme | 10 $ | 10 € | ₺20 |
| Ödeme | 100 $ | 70 € | ₺200 |
| Hesap kapatmada son ödeme | 10 $ | 10 € | ₺20 |

Takvim aylık döngüyle işler [RESMÎ]:

- **Ayın 3'ü**: Önceki ayın kazancı kesinleşir ve "İşlemler" bölümüne yazılır.
- **Ayın 20'si**: Ödeme bilgisi değişikliği ve bekletmeyi kaldırma için son gündür. Bakiye bu tarihte eşiğin altındaysa ya da bekletme varsa ödeme sonraki aya devreder.
- **Ayın 21'i** (hafta sonu ya da tatile denk gelirse ilk iş günü): Ödeme başlatılır. EFT en geç 7 iş gününde ulaşır.
- Ödeme **bir yıla kadar** bekletilebilir ya da ödeme eşiği yükseltilebilir.
- Hesap kapatılırken bakiye kapatma eşiğinin üstündeyse son ödeme ay sonundan itibaren yaklaşık 90 gün içinde gelir.
- Türkiye, EFT ülke listesinde var: lira ile ödenir, deneme yatırımı (test deposit) gerekir [RESMÎ].

Bu bilgiler [Google Play'de reklamlı oyun](../../Rehberler/Google-Play-Oyun/) araştırmasının §6'sıyla tutarlıdır. Vergi (GVK mük. 20/B) ve çalışma durumuna göre dallanma o araştırmadadır.

## Politika ve uyum

- **Geçersiz trafik** [RESMÎ]:
  - Kendi canlı reklamına tıklamak ya da gösterimi yapay yollarla şişirmek yasaktır; geliştirirken test reklamı kullanılır. Tıklama ya da izleme karşılığı ödeme veya teşvik vaat eden uygulamalara Google reklamı konamaz.
  - Geçersiz etkinlik nedeniyle kapatılan yayıncı yeni hesap açamaz ve AdSense dahil diğer Google yayıncı ürünlerine katılamaz. Sonradan açılan ek hesaplar "kopya" sayılır; biri ya da ikisi kapatılır.
  - Kapatılan hesaba en az 30 günlük ödeme bekletmesi uygulanır. Belge bir yerde geçersiz sayılmayan kısmın son ödemesinin "yapılabileceğini", aynı sayfanın başka bir yerinde ise geçersiz etkinlikten kapatılan yayıncıya "başka ödeme yapılmayacağını" söylüyor [ÇELİŞKİLİ].
  - "Sınırlı reklam sunumu" üç türlüdür ve etkisi türe göre değişir. "Hesap değerlendiriliyor" durumunda AdMob Network ve üçüncü taraf bidding etkilenir. "Uygulama hazır değil" durumunda uygulamanın tüm talebi etkilenir. "Geçersiz trafik kaygısı" durumunda yalnız AdMob Network etkilenir. Sınırlama genelde 30 günden kısa sürer.
- **Ödüllü reklam kuralları** [RESMÎ]:
  - Ödüllü geçiş (rewarded interstitial) dışındaki ödüllü reklamlar ancak kullanıcı açıkça kabul ettikten sonra gösterilir. Ödüllü geçiş reklamında ise "hayır" seçeneği olan ve vazgeçmeye yetecek süre tanıyan bir giriş ekranı şarttır.
  - Reklam atlanabilir ya da kapatılabilir olmalı. Reddetmek uygulamanın normal kullanımını engellememeli.
  - Doğrudan parasal ödül (nakit, kripto, hediye kartı) hiçbir koşulda verilemez. Dolaylı ödül yalnız yayıncının kendi platformunda geçerli ve devredilemez olmalı. Fiziksel ürün indirimi ürün değerinin %25'ini aşamaz.
  - Rastgele ödülde olasılık önceden açıklanmalı ve 0'dan büyük olmalı.
  - Her gösterimden önce gereken eylem ve verilecek ödül açıkça yazılır. "İşimizi desteklemek için izle" gibi yönlendirici söz kullanılamaz. Ödülün Google onaylı olduğu ima edilemez. Söz verilen ödül verilir.
- **app-ads.txt** [RESMÎ]:
  - Uygulamanın mağaza sayfasında bir geliştirici web sitesi bulunmalı. Dosya o alan adının köküne (`https://alanadi/app-ads.txt`) konur.
  - AdMob tarayıcısı `www.` ve `m.` alt alan adlarını atlar, en çok bir alt alan adı seviyesine bakar ve yönlendirmeleri izler. Tarama 24 saate kadar sürer.
  - AdMob arayüzündeki kişisel kod parçacığı (`google.com, pub-0000000000000000, DIRECT, …`) dosyaya eklenir.
  - **Ocak 2025'ten beri yeni uygulamalar app-ads.txt ile doğrulanmadan tam reklam alamaz.** Google, doğrulamayı 2025 boyunca kademeli olarak yaydığını ve sonunda tüm yayıncılardan isteyeceğini yazıyor; mevcut bir uygulama kapsama girince hesapta önceden bildirilir. Yalnız üçüncü taraf bir mağazada listelenen uygulamalar şimdilik muaf.
  - Doğrulama sayfasına göre hazırlık (app readiness) incelemesi, app-ads.txt doğrulaması bittikten sonra başlar. Hazırlık sayfası ise incelemenin, uygulama desteklenen bir mağazaya bağlanınca kendiliğinden başladığını yazıyor [ÇELİŞKİLİ].
- **AB, BK ve İsviçre onayı (UMP)** [RESMÎ]:
  - Bu bölgelerde kişiselleştirilmiş reklam için Google sertifikalı ve IAB TCF ile bütünleşik bir CMP zorunlu: AEA ve BK'da 16 Ocak 2024'ten, İsviçre'de 31 Temmuz 2024'ten beri.
  - Sertifikalı CMP hiç yoksa yalnız "Limited Ads" sunulur (geliştirici belgesi). Sertifikasız bir CMP'den gelen trafik ise kişiselleştirilmemiş ya da sınırlı reklam alabilir (yardım merkezi).
  - Google'ın ücretsiz **UMP SDK**'sı Android (API 21+), iOS, Unity ve Flutter'da var; masaüstü sürümü yok.
- **Rapor paylaşımı** [RESMÎ]: Yayıncılar AdMob raporlama konsoluna erişimi paylaşamaz; AdMob hangi metriklerin paylaşılacağına önceden yazılı onay verirse paylaşılabilir. API'den çekilen rakamları herkese açık bir panoda yayımlamanın bu maddeye girip girmediği belgede net değil [TAHMİN: doğrulanamadı]. Herkese açık bir panoda ham AdMob metrikleri göstermeden önce bu maddeyi dikkate al.

## Resmî olmayan yollar ve riskler

| Yol | Nasıl çalışır | Risk |
|---|---|---|
| AdMob konsolunu kazımak, tarayıcı otomasyonu | Oturum açık tarayıcıdan rapor sayfalarını okur | Gereksiz, çünkü rapor API'si var. Oturum çerezi güvenliği riski taşır ve arayüz değişince bozulur [TAHMİN] |
| Mobil SDK'yı masaüstünde emülatör, sarmalayıcı ya da WebView içinde çalıştırmak | Android ortamını masaüstüne taşır | Google'ın geçersiz trafik sınıflarından "false representation" (envanteri ya da cihazı olduğundan farklı gösteren istek) kapsamına girer [TAHMİN: Google'ın SIVT tanımından çıkarım]. Hesap kapatma riski var [RESMÎ: geçersiz trafik politikası] |
| Ödülü yalnız istemci geri çağrısına bağlamak | Resmî bir yol ama doğrulama yapmaz | Değiştirilmiş bir istemci sahte ödül üretebilir. Google, SSV'yi tam bu sahteciliğe karşı ek katman olarak sunuyor [RESMÎ] |
| Kendi reklamına tıklamak, çevreye tıklatmak, gösterim satın almak | — | Açıkça yasak. Kalıcı kapatma ve yeni hesap yasağı getirir [RESMÎ] |
| Topluluk SSV paketleri: npm `admob-ssv` (0.3.0, Mart 2025), `express-admob-ssv` (1.0.3, Ocak 2021), `admob-rewarded-ads-ssv` (1.0.1, Ekim 2020) | Aynı ECDSA doğrulamasını yapar | Resmî değil; bazıları yıllardır güncellenmiyor [3. TARAF: npm kayıt bilgisi]. `express-admob-ssv` ve `admob-rewarded-ads-ssv` imzayı ham sorgu üzerinden doğruluyor, `admob-ssv` ise çözülmüş değerlerden kuruyor [3. TARAF: paket kaynak kodu, 6.11.2026]. Ham sorgu kullananlar yüzde kodlu değerlerde geçerli istekleri reddeder ("Yüzde kodu" notu) [TAHMİN]. `key_id`'yi 32 bit tamsayı olarak okuyan bir uygulama büyük anahtar kimliklerinde bozulur [TAHMİN] |

## SDK ve kütüphaneler

### Mobil SDK'lar ve platformlar

| Platform | Resmî SDK | Not |
|---|---|---|
| Android | **GMA Next-Gen SDK**: `com.google.android.libraries.ads.mobile.sdk:ads-mobile-sdk` (1.6.0; minSdk 24, compileSdk 35). **Legacy**: `com.google.android.gms:play-services-ads` (25.5.0) | Legacy bakım modunda (Legacy sayfalarındaki uyarı: "Google Mobile Ads SDK is in maintenance mode"). Legacy v24 ve v25 için kullanımdan kalkma tarihi 30.06.2027, sunset 30.06.2028. Next-Gen v1.x 14.04.2026'da çıktı; kullanımdan kalkması Q1 2028, sunset'i Q2 2029. Sunset olan sürüme reklam gelmeyebilir [RESMÎ] |
| iOS | Google Mobile Ads SDK: Swift Package Manager ya da CocoaPods `Google-Mobile-Ads-SDK`; Xcode 16+, iOS 13+ | v13 ve v12 destekli; v11 ve v10 kullanımdan kalkmış (deprecated); v9 ve öncesi sunset [RESMÎ]. v10'un sunset tarihi (30.06.2026) geçmiş olsa da tablo 6.11.2026'da hâlâ "Deprecated" diyor [ÇELİŞKİLİ] |
| Unity | Google Mobile Ads Unity Plugin: OpenUPM `com.google.ads.mobile` ya da `.unitypackage`; Unity 2019.4+ | Yalnız Android ve iOS hedeflerinde çalışır [RESMÎ] |
| Flutter | `google_mobile_ads` (Flutter 3.27.0+) | "Only supports Android and iOS, and doesn't support web and desktop platforms" [RESMÎ] |
| C++ | Firebase C++ SDK içindeki `firebase::gma` | 17.06.2024'te kullanımdan kaldırıldı, bakımı 17.06.2025'te bitti [RESMÎ] |
| Topluluk (Google listeler, desteklemez) | Cocos Creator, Defold, GameMaker, Godot (`godot-admob-plugin`), React Native (`react-native-google-mobile-ads`) | AdMob desteği kapsamında değil; sorunlar kütüphanenin GitHub deposuna yazılır [RESMÎ] |
| Masaüstü (Windows, macOS, Linux) ve web | **Yok** | AdMob'da uygulama kurulurken yalnız Android ya da iOS seçilebilir [RESMÎ] |
| UMP SDK | Android `com.google.android.ump:user-messaging-platform` (4.0.0, API 21+), iOS `GoogleUserMessagingPlatform`, Unity ve Flutter eklentileri | Masaüstü sürümü yok [RESMÎ] |

### .NET / C#

| Ad | Tür | Not |
|---|---|---|
| `Google.Apis.AdMob.v1` (NuGet, 1.78.0.4298, 3 Kasım 2026) | **Resmî** (Google LLC, Discovery tabanlı istemci) | .NET Framework 4.6.2, .NET Standard 2.0 ve net6.0 hedefleri; `Google.Apis` ve `Google.Apis.Auth` paketlerine bağlı. Kapsam sabitleri `AdMobService.Scope.AdmobReadonly` ve `AdMobService.Scope.AdmobReport` [RESMÎ: NuGet] |
| `Google.Apis.AdMob.v1beta` (aynı sürüm) | **Resmî** | v1beta uçları [RESMÎ: NuGet] |
| SSV doğrulaması | Resmî ya da yaygın bir .NET paketi yok (NuGet'te "admob ssv" araması 6.11.2026'da boş döndü) | .NET 5+ içindeki `System.Security.Cryptography.ECDsa` yeterli: `ImportSubjectPublicKeyInfo` ya da `ImportFromPem`, ardından `VerifyData(…, HashAlgorithmName.SHA256, DSASignatureFormat.Rfc3279DerSequence)`. `System.Buffers.Text.Base64Url` .NET 9+'da hazır gelir, daha eski çatılarda `Microsoft.Bcl.Memory` paketiyle eklenir [RESMÎ: Microsoft Learn] |
| `Xamarin.GooglePlayServices.Ads` (125.5.0, Eylül 2026) | .NET for Android/MAUI bağlaması; Microsoft'un paketi, Google'ın değil | Paket açıklamasına göre Legacy `com.google.android.gms:play-services-ads` bağlaması [RESMÎ: NuGet]. 25.5.0'a karşılık geldiği sürüm numarasından çıkarım [TAHMİN] |
| `Xamarin.Google.Android.Libraries.Ads.Mobile.Sdk` (1.5.0, Ekim 2026) | .NET for Android/MAUI bağlaması (Microsoft) | GMA Next-Gen `ads-mobile-sdk` bağlaması; Google'ın güncel sürümünün (1.6.0) bir gerisinde [RESMÎ: NuGet] |
| `Xamarin.Google.iOS.MobileAds` (8.13.0.3, Kasım 2022) | Microsoft bağlaması, güncel değil | iOS SDK v8, 30.06.2024'te sunset oldu; bu sürüme reklam gelmeyebilir [RESMÎ: iOS takvimi] |
| `Cats.Google.iOS.AdMob` (13.11.0, Ekim 2026), `Plugin.MauiMTAdmob` (3.0.0, Ekim 2026) | Topluluk (.NET MAUI) | [3. TARAF: NuGet] |

**C# ile SSV doğrulama (ASP.NET Core, .NET 8+):** Tink'in davranışını izler (yüzde kodu çözülmüş içerik, `long` anahtar kimliği, 24 saati aşmayan önbellek).

```csharp
// .NET 8+ · ASP.NET Core minimal API · ek paket gerekmez
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();
builder.Services.AddSingleton<AdMobKeys>();
var app = builder.Build();

app.MapGet("/admob/ssv", async (HttpRequest req, AdMobKeys keys) =>
{
    string q = req.QueryString.Value?.TrimStart('?') ?? "";   // ham sorgu; Request.Query'den yeniden kurma
    int s = q.IndexOf("&signature=", StringComparison.Ordinal);
    int k = q.IndexOf("&key_id=", StringComparison.Ordinal);
    if (s <= 0 || k < s || !long.TryParse(q[(k + 8)..], out long keyId)) return Results.BadRequest();

    byte[] content = Encoding.UTF8.GetBytes(Uri.UnescapeDataString(q[..s])); // Tink ile aynı okuma
    byte[] sig = FromBase64Url(q[(s + 11)..k]);                                // DER, URL-safe Base64
    ECDsa? ec = await keys.GetAsync(keyId);
    if (ec is null || !ec.VerifyData(content, sig, HashAlgorithmName.SHA256, DSASignatureFormat.Rfc3279DerSequence))
        return Results.StatusCode(403);

    // transaction_id'yi benzersiz kısıtla kaydet (zaten varsa yine 200 dön),
    // custom_data belirtecini tüket, günlük tavanı denetle, krediyi yaz.
    return Results.Ok();
});
app.Run();

static byte[] FromBase64Url(string s)
{
    s = s.Replace('-', '+').Replace('_', '/');
    return Convert.FromBase64String(s.PadRight(s.Length + (4 - s.Length % 4) % 4, '='));
}

sealed class AdMobKeys(IHttpClientFactory http)
{
    const string Url = "https://www.gstatic.com/admob/reward/verifier-keys.json";
    Dictionary<long, ECDsa> _keys = new();
    DateTimeOffset _fetched;

    public async Task<ECDsa?> GetAsync(long keyId)
    {
        var age = DateTimeOffset.UtcNow - _fetched;
        if (age > TimeSpan.FromHours(12) || (!_keys.ContainsKey(keyId) && age > TimeSpan.FromMinutes(1)))
        {
            using var doc = JsonDocument.Parse(await http.CreateClient().GetStringAsync(Url));
            var map = new Dictionary<long, ECDsa>();
            foreach (var key in doc.RootElement.GetProperty("keys").EnumerateArray())
            {
                var ec = ECDsa.Create();
                ec.ImportSubjectPublicKeyInfo(Convert.FromBase64String(key.GetProperty("base64").GetString()!), out _);
                map[key.GetProperty("keyId").GetInt64()] = ec;    // keyId int'e sığmayabilir
            }
            (_keys, _fetched) = (map, DateTimeOffset.UtcNow);
        }
        return _keys.GetValueOrDefault(keyId);
    }
}
```

**C# ile rapor çekme (`Google.Apis.AdMob.v1`):** Rapor uçlarının yanıtı bir JSON dizisidir (`header`, `row`…, `footer`). Paketin `ExecuteAsync()` metodu bu yanıtı tek nesne sanıp "Failed to parse response from server as json" hatası veriyor. Akışı okuyup listeye çevirmek gerekir [TAHMİN: belgedeki yanıt biçimiyle yerelde sınandı, canlı API'ye istek atılmadı]. AdMob API ekibi 2022'de Go istemcisinin akış (streaming) uçlarını desteklemediğini benzer bir hata üzerine yazmıştı [3. TARAF: Google forumu].

```csharp
// dotnet add package Google.Apis.AdMob.v1
using Google.Apis.AdMob.v1;
using Google.Apis.AdMob.v1.Data;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Util.Store;

var cred = await GoogleWebAuthorizationBroker.AuthorizeAsync(
    GoogleClientSecrets.FromFile("client_secret.json").Secrets,       // "Desktop app" OAuth istemcisi
    new[] { AdMobService.Scope.AdmobReport },
    "admob-kullanici", CancellationToken.None, new FileDataStore("AdMobTokens"));
var admob = new AdMobService(new BaseClientService.Initializer { HttpClientInitializer = cred, ApplicationName = "rapor-ornegi" });

string account = (await admob.Accounts.List().ExecuteAsync()).Account[0].Name;   // "accounts/pub-…"
var spec = new NetworkReportSpec
{
    DateRange = new DateRange { StartDate = new Date { Year = 2026, Month = 11, Day = 1 }, EndDate = new Date { Year = 2026, Month = 11, Day = 5 } },
    Dimensions = new[] { "DATE", "APP" },
    Metrics = new[] { "ESTIMATED_EARNINGS", "IMPRESSIONS" }
};
using var stream = await admob.Accounts.NetworkReport
    .Generate(new GenerateNetworkReportRequest { ReportSpec = spec }, account)
    .ExecuteAsStreamAsync();
var parts = admob.Serializer.Deserialize<List<GenerateNetworkReportResponse>>(await new StreamReader(stream).ReadToEndAsync());
foreach (var row in parts.Where(p => p.Row != null).Select(p => p.Row))
    Console.WriteLine($"{row.DimensionValues["DATE"].Value} {row.DimensionValues["APP"].DisplayLabel}: " +
                      $"{row.MetricValues["ESTIMATED_EARNINGS"].MicrosValue / 1_000_000m:0.00} " +
                      $"({row.MetricValues["IMPRESSIONS"].IntegerValue} gösterim)");
```

- `client_secret.json` ve token klasörü (`AdMobTokens`) gizli bilgidir; `.gitignore`'a eklenmeli ve depoya girmemeli [TAHMİN].
- Örnekler 6.11.2026'da .NET 10 SDK ile (`net8.0` hedefi) derlendi. SSV doğrulaması Tink'in test anahtarları ve imzalı örnek URL'leriyle uçtan uca sınandı: geçerli imza 200, değiştirilmiş parametre 403 döndü; yüzde kodlu URL senaryosu da geçti. Rapor ayrıştırması belgedeki örnek yanıt biçimiyle sınandı. Canlı bir AdMob hesabına istek atılmadı [TAHMİN: yerel test]. Doğrulayıcının imza yolu (yüzde kodu çözme, `long` anahtar kimliği, URL-safe Base64, DER) ayrıca GitHub'da yayımlanmış gerçek bir AdMob konsol isteğiyle ve üretim anahtarıyla sınandı: sonuç geçerli [3. TARAF: istek; sınama bu çalışmada, 6.11.2026].

### Diğer diller

| Ad | Dil | Tür | Not |
|---|---|---|---|
| Tink Java Apps `RewardedAdsVerifier` (Maven `com.google.crypto.tink:apps-rewardedads`, 1.15.0, Ağustos 2026) | Java | **Resmî** (Google, Tink) | SSV belgesinin önerdiği doğrulayıcı. Anahtarları kendisi indirir ve önbelleğe alır [RESMÎ] |
| `googleads/googleads-admob-api-samples` | Java, PHP, Python | **Resmî** örnekler | Rapor ve envanter örnekleri [RESMÎ] |
| Google API istemci kütüphaneleri | Java, JavaScript, Objective-C, PHP, Python | **Resmî** | AdMob API "libraries" sayfasında "olgun" diye listelenenler [RESMÎ]. Go istemcisi akış uçlarını desteklemiyor [3. TARAF: Google forumu, 2022] |

## Postman / OpenAPI / koleksiyonlar

- **Resmî OpenAPI dosyası yok.** Makine tarafından okunabilir şema Google Discovery belgeleridir (v1 ve v1beta). Başvuru sayfalarındaki "Try it!" (APIs Explorer) ile tarayıcıdan istek denenebilir [RESMÎ].
- **Resmî Postman koleksiyonu** belgede yok [RESMÎ: belgede yok].
- **Üçüncü taraf OpenAPI dönüşümü**: APIs.guru, Discovery belgesinden üretilmiş `googleapis.com/admob/v1` ve `v1beta` OpenAPI dosyalarını yayımlıyor [3. TARAF]. Güncelliği Discovery belgesinin gerisinde kalabilir.
- **Örnek kodlar**: `googleads-admob-api-samples` (API), `googleads-mobile-android-examples` içindeki `RewardedSSVExample` (Spring Boot SSV sunucusu; ham sorguyu doğruladığı için "Yüzde kodu" notuna bak) [RESMÎ].
- **Değişiklik takibi**: AdMob API [sürüm notları](https://developers.google.com/admob/api/release-notes) (son kayıt 5 Eylül 2023: v1beta'ya okuma ve yazma uçları eklendi), [AdMob API destek sayfası](https://developers.google.com/admob/api/support) üzerinden forum ve Google Ads Developer Blog; SDK'lar için platform başına "Deprecation and sunset" sayfaları [RESMÎ].

## Depoda ilgili sayfalar

- [Masaüstü uygulamada reklam ve ödüllü reklam](../../Rehberler/Masaustu-Uygulama-Reklam/): §1 ağlar tablosunda AdMob'un masaüstünde olmadığı; §3 ödüllü reklamla kredi (SSV alanları, "istemci yalnız gösterir, ödülü sunucu verir" akışı, sahte trafik); §5 engelleyiciler ve tehdit/önlem tablosu (`transaction_id` tekilliği). Yapay zekâ için Markdown sürümü: [arastirma.md](../../Rehberler/Masaustu-Uygulama-Reklam/arastirma.md).
- [Google Play'de reklamlı oyun](../../Rehberler/Google-Play-Oyun/): §6 AdMob bölümü (ödeme döngüsü, ₺200 / 100 $ eşikleri, bekletme, EFT, geçersiz trafik, app-ads.txt, UMP) ve §8 vergi (GVK mük. 20/B, çalışma durumuna göre dallanma). Yapay zekâ için Markdown sürümü: [arastirma.md](../../Rehberler/Google-Play-Oyun/arastirma.md).
- Aynı klasördeki [Google Ad Manager](Google-Ad-Manager.md) sayfası: Web sitesinde ödüllü reklam (GPT) ve web SSV'si, yani AdMob'un kapsamadığı web tarafı.

## Kaynaklar

**Resmî**

- [AdMob: Validate SSV callbacks (Android, Legacy)](https://developers.google.com/admob/android/ssv): Parametreler, alfabetik sıra, `signature`/`key_id` sırası, 24 saatlik önbellek, 5 yeniden deneme, ters DNS, ödül zamanlaması (erişim: 6 Kasım 2026).
- [AdMob: SSV (GMA Next-Gen SDK)](https://developers.google.com/admob/android/next-gen/ssv), [iOS](https://developers.google.com/admob/ios/ssv), [Unity](https://developers.google.com/admob/unity/ssv), [Flutter](https://developers.google.com/admob/flutter/ssv): Platforma göre `user_id`/`custom_data` verme (erişim: 6 Kasım 2026).
- [AdMob SSV açık anahtar dosyası](https://www.gstatic.com/admob/reward/verifier-keys.json): `keyId`, `pem`, `base64` biçimi; 6.11.2026'da tek anahtar, kimlik 32 bit aralığının dışında (erişim: 6 Kasım 2026).
- [Tink Java Apps: RewardedAdsVerifier](https://github.com/tink-crypto/tink-java-apps/blob/main/rewardedads/src/main/java/com/google/crypto/tink/apps/rewardedads/RewardedAdsVerifier.java) ve [test dosyası](https://github.com/tink-crypto/tink-java-apps/blob/main/rewardedads/src/test/java/com/google/crypto/tink/apps/rewardedads/RewardedAdsVerifierTest.java): Üretim ve test anahtar adresleri, `long` anahtar kimliği, URL-safe Base64 imza, yüzde kodu çözülmüş içerik (erişim: 6 Kasım 2026).
- [AdMob Help: Validate rewarded ad views with SSV](https://support.google.com/admob/answer/9603226) ve [Create a rewarded ad unit](https://support.google.com/admob/answer/7665911): Arayüzde SSV kurulumu, mediation kutusu, atlama süresi 30/60 sn (erişim: 6 Kasım 2026).
- [AdMob Help: Policies for ad units that offer rewards](https://support.google.com/admob/answer/7313578): Ödül türleri, %25 indirim sınırı, rastgele ödül, onay ve açıklama kuralları (erişim: 6 Kasım 2026).
- [AdMob API REST başvurusu](https://developers.google.com/admob/api/reference/rest): v1 ve v1beta kaynakları, Discovery adresleri (erişim: 6 Kasım 2026).
- [AdMob API: Get started](https://developers.google.com/admob/api/v1/getting-started) ve [Authorization](https://developers.google.com/admob/api/v1/how-tos/authorizing): Desktop/Web akışı, kapsamlar, izin ekranı (erişim: 6 Kasım 2026).
- [AdMob API: Quotas](https://developers.google.com/admob/api/quotas): Dakika ve gün kotaları, `429 RESOURCE_EXHAUSTED` (erişim: 6 Kasım 2026).
- [networkReport.generate](https://developers.google.com/admob/api/reference/rest/v1/accounts.networkReport/generate): Akış yanıtı, boyut ve metrikler, 100.000 satır, saat dilimi (erişim: 6 Kasım 2026).
- [v1beta adUnits.create](https://developers.google.com/admob/api/reference/rest/v1beta/accounts.adUnits/create), [mediationGroups.list](https://developers.google.com/admob/api/reference/rest/v1beta/accounts.mediationGroups/list), [adUnitMappings.list](https://developers.google.com/admob/api/reference/rest/v1beta/accounts.adUnits.adUnitMappings/list) ve [campaignReport.generate](https://developers.google.com/admob/api/reference/rest/v1beta/accounts.campaignReport/generate): `admob.monetization`, sınırlı erişim (iki okuma ucu dahil), 30 günlük kampanya raporu (erişim: 6 Kasım 2026).
- [AdMob Help: About AdMob campaigns](https://support.google.com/admob/answer/6162747): Ev reklamı ve doğrudan satılan kampanya türleri (erişim: 6 Kasım 2026).
- [AdMob API Discovery v1](https://admob.googleapis.com/$discovery/rest?version=v1) ve [v1beta](https://admob.googleapis.com/$discovery/rest?version=v1beta): Metot başına kapsamlar, `appApprovalState`, `pageSize` sınırları (erişim: 6 Kasım 2026).
- [AdMob API: Release notes](https://developers.google.com/admob/api/release-notes), [Libraries](https://developers.google.com/admob/api/v1/libraries), [Ads Activity Report (alfa, desteklenmiyor)](https://developers.google.com/admob/api/v1/ads_activity_report) (erişim: 6 Kasım 2026).
- [Google Identity: Using OAuth 2.0](https://developers.google.com/identity/protocols/oauth2): "Testing" durumunda 7 günlük refresh token (erişim: 6 Kasım 2026).
- [AdMob geliştirici ana sayfası](https://developers.google.com/admob), [GMA Next-Gen SDK kurulumu](https://developers.google.com/admob/android/next-gen/quick-start), [Next-Gen'e geçiş](https://developers.google.com/admob/android/next-gen/migration), [Android Legacy kurulumu](https://developers.google.com/admob/android/quick-start), [iOS kurulumu](https://developers.google.com/admob/ios/quick-start), [Unity kurulumu](https://developers.google.com/admob/unity/quick-start), [Flutter kurulumu](https://developers.google.com/admob/flutter/quick-start), [C++ (kullanımdan kaldırıldı)](https://developers.google.com/admob/cpp/quick-start), [Diğer platformlar](https://developers.google.com/admob/other-platforms): Platformlar, sürümler, bakım modu (erişim: 6 Kasım 2026).
- [Android SDK takvimi](https://developers.google.com/admob/android/deprecation), [GMA Next-Gen takvimi](https://developers.google.com/admob/android/next-gen/deprecation) ve [iOS SDK takvimi](https://developers.google.com/admob/ios/deprecation): Destek, kullanımdan kalkma ve sunset tarihleri (erişim: 6 Kasım 2026).
- [UMP SDK: Android](https://developers.google.com/admob/android/privacy), [iOS](https://developers.google.com/admob/ios/privacy), [Unity](https://developers.google.com/admob/unity/privacy), [Flutter](https://developers.google.com/admob/flutter/privacy) ve [AdMob GDPR rehberi](https://developers.google.com/admob/android/privacy/gdpr): UMP kurulumu, "Limited Ads" (erişim: 6 Kasım 2026).
- [AdMob Help: Google consent management requirements](https://support.google.com/admob/answer/13554116): Sertifikalı CMP, AEA/BK/İsviçre tarihleri (erişim: 6 Kasım 2026).
- [Impression-level ad revenue](https://developers.google.com/admob/android/impression-level-ad-revenue) ve [Test ads](https://developers.google.com/admob/android/test-ads): Paid event, test reklam birimi kimlikleri (erişim: 6 Kasım 2026).
- [AdMob Help: Payment thresholds](https://support.google.com/admob/answer/2772208), [Payments and transactions](https://support.google.com/admob/answer/2772140), [Change your payment schedule](https://support.google.com/admob/answer/3109143), [Receive your payments by EFT](https://support.google.com/admob/answer/1714398): Eşikler, takvim, bekletme, Türkiye EFT (erişim: 6 Kasım 2026).
- [AdMob Help: Set up an app-ads.txt file](https://support.google.com/admob/answer/9363762), [Verify your app with app-ads.txt](https://support.google.com/admob/answer/14538460), [Getting started guide](https://support.google.com/admob/answer/15948559), [Set up an app in AdMob](https://support.google.com/admob/answer/9989980), [About app readiness](https://support.google.com/admob/answer/10564477): app-ads.txt kuralları, Ocak 2025 zorunluluğu, desteklenen mağazalar, yalnız Android/iOS (erişim: 6 Kasım 2026).
- [AdMob Help: Invalid activity: Disabled account](https://support.google.com/admob/answer/6197403), [Ad serving limits](https://support.google.com/admob/answer/9493252), [Behavioral policies](https://support.google.com/admob/answer/2753860): Geçersiz trafik, sınırlı reklam sunumu, rapor paylaşımı kısıtı (erişim: 6 Kasım 2026).
- [Campaign Manager 360 Help: Filtering invalid traffic](https://support.google.com/campaignmanager/answer/6076504): GIVT/SIVT kategorileri (erişim: 6 Kasım 2026).
- [AdMob Help: About data freshness](https://support.google.com/admob/answer/13291097), [Clicks and earnings removed](https://support.google.com/admob/answer/10529727), [Overview of your AdMob reports](https://support.google.com/admob/answer/2751663): Gecikmeler, 48 saatlik düzeltme, ay sonu dondurma, 50.000 satır (erişim: 6 Kasım 2026).
- [NuGet: Google.Apis.AdMob.v1](https://www.nuget.org/packages/Google.Apis.AdMob.v1), [Google.Apis.AdMob.v1beta](https://www.nuget.org/packages/Google.Apis.AdMob.v1beta) ve [.NET başvurusu](https://googleapis.dev/dotnet/Google.Apis.AdMob.v1/latest/api/Google.Apis.AdMob.v1.html): Sürüm, hedef çatılar, kapsam sabitleri (erişim: 6 Kasım 2026).
- [Microsoft Learn: ECDsa.VerifyData](https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.ecdsa.verifydata), [DSASignatureFormat](https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.dsasignatureformat), [Base64Url](https://learn.microsoft.com/en-us/dotnet/api/system.buffers.text.base64url): .NET 5+ ve .NET 9+ API'leri (erişim: 6 Kasım 2026).
- [NuGet: Xamarin.GooglePlayServices.Ads](https://www.nuget.org/packages/Xamarin.GooglePlayServices.Ads), [Xamarin.Google.Android.Libraries.Ads.Mobile.Sdk](https://www.nuget.org/packages/Xamarin.Google.Android.Libraries.Ads.Mobile.Sdk) ve [Xamarin.Google.iOS.MobileAds](https://www.nuget.org/packages/Xamarin.Google.iOS.MobileAds): Microsoft'un mobil bağlamaları (erişim: 6 Kasım 2026).
- [googleads-admob-api-samples](https://github.com/googleads/googleads-admob-api-samples) ve [RewardedSSVExample](https://github.com/googleads/googleads-mobile-android-examples/tree/main/java/advanced/RewardedSSVExample) ([SSVController.java](https://github.com/googleads/googleads-mobile-android-examples/blob/main/java/advanced/RewardedSSVExample/src/main/java/com/example/rewardedssv/SSVController.java): `@GetMapping`, ham `getQueryString()`): Resmî örnekler (erişim: 6 Kasım 2026).
- [Maven Central: apps-rewardedads](https://repo1.maven.org/maven2/com/google/crypto/tink/apps-rewardedads/maven-metadata.xml): Tink SSV doğrulayıcısının sürümleri (erişim: 6 Kasım 2026).
- [Java EE 7: HttpServletRequest.getQueryString](https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServletRequest.html#getQueryString--): "The value is not decoded by the container" (erişim: 6 Kasım 2026).
- [AdMob API destek sayfası](https://developers.google.com/admob/api/support): Geliştirici forumu ve duyuru kanalı (erişim: 6 Kasım 2026).

**Üçüncü taraf**

- [AdMob API Developer Forum: Service Accounts (2 Nisan 2024)](https://groups.google.com/g/google-admob-api-developer-forum/c/KVhv1HtUIp4): Hizmet hesabının desteklenmediği; Google adına yazılmış yanıt, yanıtlayanın ekip etiketi sayfada görünmüyor (erişim: 6 Kasım 2026).
- [AdMob API Developer Forum: Go istemcisi ve GenerateNetworkReportResponse (Ekim 2022)](https://groups.google.com/g/google-admob-api-developer-forum/c/d6COgo2ZJlQ): Go istemcisinin akış uçlarını desteklemediği (erişim: 6 Kasım 2026).
- [APIs.guru: AdMob v1 OpenAPI](https://api.apis.guru/v2/specs/googleapis.com/admob/v1/openapi.json) ve [v1beta](https://api.apis.guru/v2/specs/googleapis.com/admob/v1beta/openapi.json): Discovery'den üretilmiş OpenAPI (erişim: 6 Kasım 2026).
- [npm: admob-ssv](https://www.npmjs.com/package/admob-ssv), [express-admob-ssv](https://www.npmjs.com/package/express-admob-ssv), [admob-rewarded-ads-ssv](https://www.npmjs.com/package/admob-rewarded-ads-ssv): Topluluk SSV doğrulayıcıları; sürüm, tarih ve kaynak kodu npm kayıt API'sinden (erişim: 6 Kasım 2026).
- [GitHub: seorilabs/platform #117](https://github.com/seorilabs/platform/issues/117): Gerçek bir AdMob konsol isteği (yüzde kodlu `reward_item`, 13 haneli `timestamp`, `key_id` 3335741209). İmzası bu çalışmada üretim anahtarıyla sınandı; çözülmüş içerik doğrulandı (erişim: 6 Kasım 2026).
- [GitHub: dmadan86/waves #1444](https://github.com/dmadan86/waves/pull/1444) ve [ZMilaStudio/BilgiRotasi #69](https://github.com/ZMilaStudio/BilgiRotasi/pull/69): Ham sorguyu doğrulayan sunucuların gerçek istekleri reddettiğine dair geliştirici kayıtları; `reward_item=%C3%96d%C3%BCl` örneği (erişim: 6 Kasım 2026).
- [NuGet: Cats.Google.iOS.AdMob](https://www.nuget.org/packages/Cats.Google.iOS.AdMob) ve [Plugin.MauiMTAdmob](https://www.nuget.org/packages/Plugin.MauiMTAdmob): Topluluk .NET MAUI paketleri (erişim: 6 Kasım 2026).
- [godot-admob-plugin](https://github.com/poingstudios/godot-admob-plugin) ve [react-native-google-mobile-ads](https://github.com/invertase/react-native-google-mobile-ads): Google'ın listelediği topluluk kütüphaneleri (erişim: 6 Kasım 2026).

---

[← API dizini](../)
