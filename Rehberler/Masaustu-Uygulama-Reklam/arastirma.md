# Masaüstü uygulamada reklam ve reklam izleyerek kredi

Araştırma · Masaüstü yazılım ve para kazanma. Bu dosya aynı klasördeki HTML sayfasının ([index.html](index.html)) yapay zekâ için saf Markdown sürümüdür: içerik aynıdır, her önemli iddiaya kaynak numarası ve güven etiketi eklenmiştir.

## Belge bilgisi

- **Araştırma tarihi:** 30 Ekim 2026 (güncelleme: 6 Kasım 2026). Bütün kaynaklara bu tarihte erişildi; 6 Kasım 2026 güncellemesinde Google, Meta ve TikTok kaynaklı bazı iddialar resmî sayfalardan yeniden kontrol edilip düzeltildi ve [120]–[128] eklendi. §10'daki "(rehber)" işaretli rakamların veri tarihi 3 Eylül 2026'dır.
- **Kapsam:** Windows masaüstü uygulaması ve yanında web sitesi/sunucusu olan bir ürün reklam gösterebilir mi, kullanıcıya reklam izletip kredi verebilir mi, bunu reklam engelleyicilere karşı güvenilir nasıl kurar? Hangi ağın neye izin verdiği, sunucu tarafı doğrulama, hukuk ve vergi. Ele alınanlar: Windows masaüstü uygulamada reklam ağları, reklam izleyerek kredi (ödüllü reklam, SSV), ücretsiz plana aralıklı reklam, reklam engelleyiciler, doğrudan reklam satışı, uygulamayı tanıtmak için reklam, genel mimari, Türkiye/AB/ABD hukuk ve vergi, Türkiye şirketi mi yurt dışı şirketi mi, gelir tahmini.
- **Yöntem:** Resmî kaynak öncelikli. Yalnız herkese açık belgeler okundu; hiçbir reklam ağında hesap açılmadı. Bulunamayan bilgi "doğrulanamadı" diye işaretli.
- **Uyarı:** Genel bilgi amaçlıdır; hukuk ve vergi bölümü danışmanlık değildir. Reklam ağı politikaları sık değişir; uygulamadan önce ilgili resmî sayfaya bakılmalı. Karar öncesi mali müşavire danışılmalı.
- **Kullanım:** Bir AI asistanına bağlam olarak verilebilir. Uygulamaya geçmeden önce [RESMÎ] dışındaki ve özellikle [TAHMİN: doğrulanamadı] işaretli maddeler güncel resmî kaynaktan yeniden kontrol edilmelidir.

## Güven etiketleri

| Etiket | Anlamı |
|---|---|
| [RESMÎ] | Platformun ya da kurumun kendi belgesi: politika ve şart sayfası, geliştirici belgesi, fiyat sayfası, mevzuat metni, resmî kurum duyurusu. |
| [3. TARAF] | Resmî olmayan ya da bu araştırmada birincil kaynaktan okunmamış bilgi: kaynakçada "(ikincil)" yazan kaynaklar, forum, ticari basın, akademik çalışma, sektör blogu; ayrıca "(rehber)" işaretli bilgiler. |
| [TAHMİN] | Kaynağın değil yorumun, hesabın ya da tasarım önerisinin ifadesi: sayfada "(çıkarım)" yazanlar, örnek hesaplar, kaynak numarası verilmemiş öneri ve genel bilgi. Yanlış demek değildir; kaynakla doğrulanmamıştır. |
| [TAHMİN: doğrulanamadı] | Sayfada "doğrulanamadı" diye işaretli: resmî kaynakta bulunamadı ya da okunamadı. |
| [ÇELİŞKİLİ] | Kaynaklar birbirini tutmuyor; iki taraf da yazılır. |
| [ÇELİŞKİLİ: kısmen çözüldü] | Kaynaklar birlikte okununca çelişkinin çoğu çözülüyor; kalan belirsizlik ayrıca yazılır. |

- `[n]` biçimindeki sayılar §14 Kaynakça'daki numaralardır (HTML sayfasıyla aynı). Etiket, hemen önündeki kaynak numaralarına ya da cümleye aittir.
- "(rehber)": bilgi depodaki Şirket Kurma rehberinden alındı (veri tarihi 3 Eylül 2026) ve burada birincil kaynaktan yeniden açılmadı.
- Tablolardaki **VAR / YOK / YASAK / KAPANDI / DOĞRULANAMADI / EVET / HAYIR / OLUR** ve **YÜKSEK / ORTA / DÜŞÜK** sözcükleri sayfanın durum ve değerlendirme rozetleridir; kaynak güven etiketi değildir.

## İçindekiler

- **Başlangıç:** § 0 Kısa cevap
- **Reklam göstermek:** § 1 Ağlar tablosu · § 2 Masaüstünde Google reklamı · § 3 Ödüllü reklamla kredi · § 4 Ücretsiz plana aralıklı reklam · § 5 Atlanamazlık ve engelleyiciler · § 6 Doğrudan reklam satışı
- **Reklam vermek ve kurmak:** § 7 Uygulamayı tanıtmak için reklam vermek · § 8 Genel mimari: masaüstü uygulama + web sunucusu · § 9 Hukuk ve vergi · § 10 Türkiye şirketi mi, yurt dışı şirketi mi? · § 11 Gelir tahmini · § 12 Karar tablosu · § 13 Doğrulanamayanlar · § 14 Kaynakça
- **Diğer dosyalar:** [YouTube Oyun (AdSense, 20/B)](../YouTube-Oyun/index.html) · [Google Play'de oyun (AdMob)](../Google-Play-Oyun/index.html) · [Şirketsiz gelir](../Sirket-Kurma/12-sirketsiz.html) · [Ana Dizin](../../index.html)

---

## § 0 — Kısa cevap

"(çıkarım)" yazan cümleler kaynağın değil yorumun ifadesidir. Terimler ilk geçtikleri yerde tek satırla açıklanır.

### Olmayan

- Masaüstü uygulamanın içine Google'dan otomatik reklam: AdSense yazılım içini açıkça yasaklıyor [1] [RESMÎ]; AdMob yalnız mobil [5][6] — [5] [RESMÎ], [6] forum [3. TARAF]; Microsoft'un Windows reklam ağı 1 Haziran 2020'de kapandı [11][12] [RESMÎ]. → §2
- Ödüllü reklamı "atlanamaz" yapmak: Google kuralı kullanıcının geçebilmesini şart koşuyor [35][36] [RESMÎ]. → §5
- Krediyi nakde, hediye kartına, kriptoya ya da devredilebilir bir şeye çevirmek. [4][36] [RESMÎ] → §9

### Olan

- Reklam izleyerek kredi — ürünün **web sitesinde**, gerçek tarayıcıda: Google Ad Manager web ödüllü reklamı + sunucu doğrulaması (SSV). [9] [RESMÎ]; web geri çağrısının parametreleri, imza yöntemi ve kullanıcıyla eşleştirme yolu belgede yok [9][10] [TAHMİN: doğrulanamadı]; masaüstü tarayıcı desteği [9][10] [ÇELİŞKİLİ: kısmen çözüldü] (§8) → §3
- Ücretsiz plana aralıklı reklam — ürünün kendi sunucusundan, kendi alan adından gelen reklamla (ev reklamı ya da doğrudan satılan). [TAHMİN] (tasarım önerisi) → §4, §6
- Reklam alanını reklamverene doğrudan satmak; uygulamayı Google Ads / Meta / TikTok API'leriyle tanıtmak (TikTok API for Business yalnız şirket kaydı kabul ediyor; şirketi olmayan için Ads Manager arayüzü ya da MCP Server). [53][64][65][66][67] [RESMÎ]; TikTok [68] [3. TARAF], kayıt şartı ve MCP Server [125][126] [RESMÎ] → §6, §7

### Güvenilir kurulumun iki ilkesi

- **İstemci yalnız gösterir, ödülü sunucu verir.** Kredi yalnız reklam ağının sunucuya imzalı bildirimiyle yazılır. [TAHMİN] (kredi ekonomisi için tasarım önerisi; Google bu yolu ödülün geçerliliği kritik ve gecikme kabul edilebilir olduğunda öneriyor, genel önerisi ödülü istemcide hemen verip tüm ödülleri sunucuda doğrulamak [7] [RESMÎ]) → §3
- **DNS/hosts ile engellenemeyen tek yol**, reklamın uygulamanın zaten muhtaç olduğu API alan adından gelmesidir — yalnız kendi (ev/doğrudan satılan) reklamda mümkün. DNS süzgecinin sınırı [44][45] [RESMÎ]; "tek yol" değerlendirmesi [TAHMİN]. → §5
- **Şirket:** reklam geliri için şirket şart değil [112] [RESMÎ]; Türkiye'de yerleşik kişide düzenli gelirle vergi mükellefiyeti şart [84] [RESMÎ] (aylık reklam gelirine uygulanması çıkarım [TAHMİN]). Stripe Türkiye'de yok [94] (Paddle/Polar/iyzico var [114][116][117]) [RESMÎ]; Türkiye'de yaşarken yurt dışı şirket vergi avantajı getirmez (iş merkezi, KVK m.7) [108] [RESMÎ] (tek kurucuya uygulanması çıkarım [TAHMİN]). → §10

## § 1 — Ağlar tablosu

**Terimler**

- **Ödüllü reklam** (rewarded): kullanıcının isteyerek izlediği, karşılığında uygulama içi ödül aldığı reklam.
- **SSV** (server-side verification): reklam ağının ödülü uygulama sahibinin sunucusuna imzalı çağrıyla bildirmesi.
- **Reklam sunucusu** (ad server): hangi reklamın gösterileceğine karar veren ve gösterimi sayan sunucu.

**Windows masaüstü uygulamada reklam gösterebilen ağlar**

| Ağ | Masaüstü uygulamaya izin | Ödüllü | SSV | Not | Güven |
|---|---|---|---|---|---|
| Google AdSense | **YASAK** — "software application" maddesi [1] | Yalnız web, beta [2][3] | Belgede yok; ödül sayfadaki JS'e döner [2] | Onaylı WebView listesinde WebView2 yok [1] | [RESMÎ] |
| Google AdMob | **YOK** — Android, iOS, Unity, Flutter [5][6] | Mobil | Mobil [7] | WebView API for Ads yalnız Android/iOS [8] | [RESMÎ]; forum [6] [3. TARAF] |
| Google Ad Manager | **DOĞRULANAMADI**; WebView kuralları Ad Manager'ı da kapsıyor [1] | Web: "desktop, mobile, and tablet web" [9] | **VAR** [9]; web'de parametre ve imza belgede yok | Çelişki kısmen çözüldü: [9] ve GPT örneği [10] aynı "mobile optimized" sayfa (viewport meta etiketi) şartını koyuyor, şart cihaz değil sayfa; hangi cihazda `null` döndüğü belgelenmemiş [10] | Masaüstü uygulama izni [TAHMİN: doğrulanamadı]; WebView kuralı [1] ve SSV [9] [RESMÎ]; web SSV parametreleri [TAHMİN: doğrulanamadı]; masaüstü web desteği [9][10] [ÇELİŞKİLİ: kısmen çözüldü] |
| Microsoft Ad Monetization | **KAPANDI** — 1 Haz 2020 [11][12] | — | — | Store politikası §10.10 reklamı kurala bağlar [13] | [RESMÎ] |
| Overwolf | **VAR** — yalnız Overwolf Native / ow-electron [14][15] | Doğrulanamadı | Doğrulanamadı | Başka çatıyla (ör. .NET) uyumu doğrulanamadı; 1 Kas 2026'dan sonra yalnız Overwolf para kazanımlı uygulama onayı; dağıtım tekelliği, ayrılmak için 6/12 ay bildirim; ödeme NET 60, en az 200 $ [16][17] | İzin ve şartlar [RESMÎ]; ödüllü, SSV ve başka çatı uyumu [TAHMİN: doğrulanamadı] |
| Playwire | **VAR** — "Desktop Apps" [18][19] | Rewarded Video | Doğrulanamadı | Uygulama için 1.000 günlük aktif kullanıcı; genel şartlar: İngilizce konuşulan ülkelerde (ABD/BK/Kanada) kitle, geçersiz trafik %7 altı [18] | [RESMÎ]; SSV [TAHMİN: doğrulanamadı] |
| Unity Ads | **YOK** — iOS/Android [20] | Mobil | Mobil | WebGL de yok [20] | [RESMÎ] |
| Unity LevelPlay | Doğrulanamadı; belgeler Android/iOS [21] | Mobil | — | | [TAHMİN: doğrulanamadı]; belgeler [21] [RESMÎ] |
| AppLovin MAX | Doğrulanamadı; listede masaüstü yok [22][23] | Mobil | — | | [TAHMİN: doğrulanamadı]; [22] (2022) [RESMÎ], [23] forum, dolaylı [3. TARAF] |
| Venatus | Doğrulanamadı [24] | Doğrulanamadı | — | Web ve mobil | Masaüstü ve ödüllü [TAHMİN: doğrulanamadı]; kaynak [24] [RESMÎ] |
| Anzu | PC oyunları (Unity/Unreal) [25] | — | — | 3B oyun sahnesine reklam; araç yazılıma uymaz | [25] [RESMÎ]; "araç yazılıma uymaz" değerlendirmesi [TAHMİN] |
| Ezoic | Web sitesi | **VAR** — kullanıcı her an kapatabilir [26] | Belgede yok | Google MCM, ads.txt [27] | [RESMÎ] |
| AppLixir | Web (HTML5, Unity WebGL…); masaüstü geçmiyor [28] | **VAR** | **VAR** — paylaşılan sırla imzalı (MD5/HMAC, belgeler çelişkili) [28][29] | Eşik ve ülkeler doğrulanamadı | [28][29] [RESMÎ]; imza yöntemi [ÇELİŞKİLİ]; eşik ve ülkeler [TAHMİN: doğrulanamadı] |
| Mediavine | Yok (blog/site) | — | — | Eşik yalnız ikincil kaynakta [30] | [30] [3. TARAF] |

## § 2 — Masaüstünde Google reklamı

- **AdSense:** reklam "Integrated into a software application (does not apply to AdMob) of any kind, including toolbars" olamaz; kod "pop-ups, emails or software" içine konamaz. Uygulamadaki web görünümü için izinli yollar WebView API for Ads (Android/iOS), Chrome Custom Tabs, TWA, SFSafariViewController; kural "publishing AdSense and Ad Manager ads through a web content viewing frame" için yazılmış. Ödüllü envanter dışında "Compensate users for viewing ads" yasak. [1] [RESMÎ] Koddaki değişikliklerden "artificially inflates ad performance" doğuranlar yasak. [31] [RESMÎ]
- **AdMob:** platformlar Android, iOS, Unity, Flutter; SDK ekibi "only supported to the Mobile platforms" (forum, 2023). [5][6] — [5] [RESMÎ], [6] [3. TARAF]
- **IMA** (Google'ın video reklam SDK'sı): HTML5 tarayıcı, iOS, Android, tvOS; WebView/Electron/masaüstü geçmiyor. [32][33] [RESMÎ]
- **Out of context ads:** reklam arka planda ya da ekran dışında kalan uygulamada gösterilemez, hangi yayıncıya ait olduğu açık olmalı. [34] [RESMÎ]
- **Microsoft:** "As of June 1, 2020, the Microsoft Ad Monetization platform for Windows UWP apps will be shut down." [11][12] [RESMÎ] Store politikası 7.20 §10.10: asıl amaç reklama tıklatmak olamaz, reklam ayırt edilebilir, reklam kimliği ayarına uyulur, gizlilik metni reklam verisini ve ilgi tabanlı reklamdan çıkışı anlatır; yalnız Store'dan dağıtılan uygulamayı bağlar. [13] [RESMÎ]

**Sonuç**

Uygulama içindeki gömülü tarayıcıda (ör. WebView2) Google reklamı göstermek hesap riski taşır. Google'ın WebView2 hakkında açık cümlesi yok; "yasak" sonucu AdSense maddesi ve onaylı WebView listesinden **çıkarım** [TAHMİN]. Ad Manager'ın yazılım içi kuralı **doğrulanamadı** [TAHMİN: doğrulanamadı]; denenmeden önce Google'dan yazılı yanıt alınmalı.

## § 3 — Ödüllü reklamla kredi

### Google kuralları

- Önce açık onay ("affirmatively and unambiguously opts in"); "it must be possible to skip or dismiss them"; reddetmek "must not impede or interfere with the normal usage". [35][36] [RESMÎ]
- Nakit, kripto, hediye kartı "under any circumstance" yasak; dolaylı ödül yalnız yayıncının kendi platformunda geçerli ve devredilemez olmalı. [4][36] [RESMÎ]
- Ödül ve şart önceden gösterilir; "Google onaylı" denemez; yönlendirici söz yasak (örnek: "watch this ad to support our business"). [35][36] [RESMÎ]
- Ad Manager web: görüntülü reklam en az 7 sn görünür; erken kapatan ödülü kaybettiğini onaylar; aynı anda tek ödüllü yuva; SSV adresine Google GET geri çağrısı yapar. [9] [RESMÎ] Geri çağrının parametreleri ve imza yöntemi belgede yok; GPT'de `custom_data`/`user_id` geçirme yolu da yok. [9][10] [TAHMİN: doğrulanamadı]

### SSV (AdMob belgesi)

- Alanlar: `ad_network, ad_unit, custom_data, key_id, reward_amount, reward_item, signature, timestamp, transaction_id, user_id`. İmza ECDSA + SHA-256; açık anahtarlar en çok 24 saat önbellekte. 200 dönmezse 1 sn arayla en çok 5 deneme. Her ödülün tekil `transaction_id`'si var. Google önerisi: "use the client-side callback to reward the user immediately, while performing validation on all rewards upon the receipt of server-side callbacks"; ödülün geçerliliği kritikse (örnek: oyun içi ekonomi) ve gecikme kabul edilebilirse "waiting for the verified server-side callback may be the best approach". [7] [RESMÎ]
- AdSense ödüllü birimi ödülü yalnız sayfa JS'ine bildirir; SSV yok → sunucu kredisi için güvenilmez (çıkarım). [2] — [2] [RESMÎ]; "güvenilmez" sonucu [TAHMİN]

### Genel akış

Adımlara sayfada ayrı kaynak verilmemiş; akış yukarıdaki kurallar [35][36] ve SSV belgeleri [7][9] üzerine kurulu tasarımdır → [TAHMİN].

1. Kullanıcı "reklam izle, X kredi kazan" seçer; ödül ve şart önceden yazılıdır.
2. Sunucu tek kullanımlık, imzalı, kısa ömürlü belirteç üretir; `custom_data`'ya konur (hesap kimliği yerine). `custom_data` mobil SDK belgesinde var [7]; web'de (GPT) bu alanı geçirme yolu belgede yok, eşleştirme Google'a yazılı sorulmalı [9][10] [TAHMİN: doğrulanamadı].
3. Reklam oynar; ağ SSV çağrısını sunucuya yapar.
4. Sunucu imzayı ve belirteci doğrular, `transaction_id`'yi benzersiz kısıtla kaydeder, günlük tavanı denetler, krediyi yazar.
5. Masaüstü uygulama krediyi API'den okur; istemcinin "izledim" bildirimi kalıcı kredi doğurmaz.

### Sahte trafik

- AdMob: teşvik vaat eden uygulamaya reklam konamaz (kurallı ödüllü biçim hariç); kendi reklamını tıklamak, gösterimi şişirmek yasak; yaptırım gösterimin durması, hesabın kapanması, diğer Google yayıncı ürünlerinden men. [37] [RESMÎ]
- **IVT** (geçersiz trafik): Google'ın sayfasındaki sınıflar GIVT için data center, known crawler, irregular pattern (bilinen bot, veri merkezi IP'si gibi); SIVT için automated browsing, false representation, misleading user interface, manipulated behavior, incentivized behavior, undisclosed classification. [38] [RESMÎ] Emülatör, ele geçirilmiş cihaz ve tıklama çiftliği gibi SIVT örnekleri bu sayfada geçmez; asıl tanım MRC belgesinde (okunmadı). [TAHMİN: doğrulanamadı]
- Önlem önerileri (etkinlik ölçümü bulunamadı): `transaction_id` tekilliği, hesap başına günlük tavan, hız sınırı, cihaz/hesap ilişkisi, e-posta doğrulaması (veri en azlığıyla dengeli). [TAHMİN]

## § 4 — Ücretsiz plana aralıklı reklam

**Interstitial** (geçiş reklamı): iki ekran ya da işlem arasında açılan tam ekran reklam.

- AdMob yasakları: "no more than one interstitial ad after every two user actions"; açılış/kapanışta yok; her tıklamada yok; art arda yok; "Don't surprise users". [39] [RESMÎ] Masaüstünde Google kiti olmadığı için doğrudan bağlamaz; kendi reklamında örnek almak güvenli (çıkarım). [TAHMİN]
- Coalition for Better Ads: masaüstünde geri sayımlı prestitial standardın altında; hemen kapatılabilen prestitial değil. [40] [RESMÎ]
- Alan deneyi (müzik akışı servisi, ~35 milyon dinleyici, 21 ay, 9 reklam yükü): reklam arttıkça kullanım düştü, uzun dönem etki tek aylığın ~3 katı; yüksek reklam yükü reklamsız ücretli aboneliği artırdı. [41][42] [3. TARAF] Masaüstü yazılım için benzer çalışma bulunamadı.
- Sıklık küçük bir grupta A/B testiyle ayarlanır (Google önerisi). [43] [RESMÎ]

## § 5 — Atlanamazlık ve engelleyiciler

**Engelleme yolları**

| Yol | Neyi engeller | Neyi engelleyemez | Güven |
|---|---|---|---|
| DNS süzgeci (Pi-hole, AdGuard DNS, NextDNS) | Reklam ağı alan adları; Pi-hole varsayılanda `0.0.0.0`/`::` [44] | Asıl içerikle aynı alan adından gelen reklam; "DNS filtering is coarse" [45] | [44][45] [RESMÎ] |
| hosts dosyası | DNS ile aynı, tek cihazda | Aynı sınır (genel bilgi) | [TAHMİN] (genel bilgi) |
| Tarayıcı eklentisi | Tarayıcıdaki reklam kodu | Masaüstü uygulamanın yerel arayüzü | [TAHMİN] (kaynak numarası yok) |
| WebView2 içi | Uygulama sahibi `WebResourceRequested` ile istekleri yönetir [46]; eklentiler varsayılanda kapalı [47] | Kullanıcının DNS/hosts/güvenlik duvarı engeli | [46][47] [RESMÎ]; "engelleyemez" sütunu [TAHMİN] |
| Ağ düzeyi (güvenlik duvarı, VPN) | Bilinen reklam IP/alan adları | Uygulamanın kendi API alan adı (engellenirse uygulama çalışmaz) | [TAHMİN] (kaynak numarası yok) |

### "Atlanamaz" ne kadar olur

- Google ödüllü reklamında zorla izletme yok; kapatan ödül alamaz. Ezoic aynı: kapatılabilir, ödül geri sayım bitince. [35][36][26] [RESMÎ]
- Doğru model "izlemeden ödül yok": engelleyici reklamı durdurursa SSV gelmez, kredi yazılmaz. [TAHMİN]
- AdSense Offerwall'da reklam yoksa ileti çıkmaz; Google'ın engelleyici kurtarma iletisi web sitesinde "Allow ads" ister. [48][49] [RESMÎ]

**Tehdit → önlem**

| Tehdit | Önlem | Politika | Güvenilirlik | Güven |
|---|---|---|---|---|
| DNS/hosts engeli | Reklamı uygulamanın kendi API alan adından sunmak | Google kodu için desteklenmez; kendi reklamında Google kısıtı yok | **YÜKSEK** | [TAHMİN] (kaynak numarası yok) |
| Google kodunu vekil sunucudan geçirmek | Yapılmaz | Açık yasak **doğrulanamadı**; değişiklik/şişirme kuralları [31] | **DÜŞÜK** | Açık yasak [TAHMİN: doğrulanamadı]; [31] [RESMÎ] |
| Engelleyici ödüllü reklamı durdurur | SSV yoksa kredi yok | Uygun | **YÜKSEK** | [TAHMİN] |
| Sahte "izledim" | Kredi yalnız imzası doğrulanmış SSV ile | Uygun; Google ödülün geçerliliği kritikse ve gecikme kabul edilebilirse doğrulanmış sunucu geri çağrısını beklemeyi öneriyor (genel öneri: ödülü istemcide hemen ver, tüm ödülleri sunucuda doğrula) [7] | **YÜKSEK** | Koşullu öneri [7] [RESMÎ]; önlem [TAHMİN] |
| Tekrar oynatma | `transaction_id` benzersiz kısıtı + zaman penceresi | Uygun | **YÜKSEK** | Önlem [TAHMİN]; tekil `transaction_id` [7] [RESMÎ] |
| Bot, emülatör, çok hesap | Tavan, hız sınırı, cihaz/hesap ilişkisi; ağın IVT süzgeci | Şişirme yasak [37] | **ORTA** | Kural [37] [RESMÎ]; önlemler [TAHMİN] |
| Kendi reklamında sahte gösterim | Tek kullanımlık imzalı karar belirteci, sunucu zaman denetimi, küçültülmüş/odak dışı pencere sayılmaz | Dürüst ölçüm yayıncının sorumluluğu | **ORTA** | [TAHMİN] |

"Güvenilirlik" sütunu önlemin ne kadar işe yaradığına dair sayfanın değerlendirmesidir; "Güven" sütunu kaynak güven etiketidir.

**SSAI** (sunucu tarafında reklam ekleme; Google'da DAI): reklam video akışına sunucuda eklenir; video yayıncıları için, IMA kiti olmayan yerde sınırlı özellikle Server-Side Beaconing / DAI API (Beta). [50] [RESMÎ] **Görünürlük** (MRC): görüntülü reklamda piksellerin %50'si kesintisiz 1 sn, videoda 2 sn. [51][52] [3. TARAF] — [51] ticari basın; [52] MRC belgesi kaynakçada var ama MRC belgelerinin kendisi doğrulanamadı (§13). IAB Open Measurement'ın Windows masaüstü desteği **doğrulanamadı** [TAHMİN: doğrulanamadı].

## § 6 — Doğrudan reklam satışı

**CPM**: 1.000 gösterim başına fiyat. **CPC**: tıklama başına fiyat. **eCPM**: gerçekleşen gelirin 1.000 gösterime düşen karşılığı.

**Hazır reklam sunucuları**

| Araç | Ne | Maliyet | Masaüstü | Güven |
|---|---|---|---|---|
| Google Ad Manager | Doğrudan satış + açık artırma; öncelik Sponsorship 4, Standard 6/8/10, ağ/AdSense/AdX 12, House 16 [53] | Ücretsiz sürüm sınırı ülkeye göre (Türkiye 200 M, ABD/Kanada/Avustralya/YZ 90 M, diğer 150 M); video 800 bin [54][55]; geçerli AdSense hesabı gerekir ve Ad Manager hesabı ona kalıcı bağlanır [120] | Resmi SDK yok; site için | [53][54][55][120] [RESMÎ]; masaüstü sütunu [TAHMİN] (kaynak numarası yok) |
| Revive Adserver | Açık kaynak (GPL-2.0+) [56][57] | Ücretsiz; barındırılan ayda 10 $'dan | PHP 8.1+, MySQL/PostgreSQL [58]; REST API doğrulanamadı | [56][57][58] [RESMÎ]; REST API [TAHMİN: doğrulanamadı] |
| Kevel | REST Decision API, frekans, bütçe [59] | Teklifle; ikincil tahmin yılda 9.250–139.500 $ [60] | Kod gerektirmez; uyum çıkarım | [59] [RESMÎ]; fiyat tahmini [60] [3. TARAF]; masaüstü uyumu [TAHMİN] |
| AdButler | Barındırılan, in-app destekli | Essentials 179 $/ay; API +550 $/ay; pazar yeri 2.200 $ + %3,5 [61] | In-app var | [61] [RESMÎ] |
| Epom | Barındırılan | 250 / 1.000 / 2.500 $ ay [62] | Doğrulanamadı | [62] [RESMÎ]; masaüstü [TAHMİN: doğrulanamadı] |
| Broadstreet | Küçük yayıncı | 299 / 399 $ ay [63] | Doğrulanamadı | [63] [RESMÎ]; masaüstü [TAHMİN: doğrulanamadı] |

- Bireysel geliştirici / şahıs şirketi: düşük maliyetli yol kendi barındırılan Revive ya da kendi yazılan sunucu; şirket: kurumsal sözleşmeli Kevel, AdButler, Epom da seçenek. [TAHMİN] (öneri; maliyetler yukarıdaki tabloda)
- Kendi sunucusunu yazan için asgari tablolar: reklamveren, kampanya (bütçe, CPM/CPC, öncelik, teslim hızı), kreatif (sağlama değeri, onay durumu), hedefleme, frekans sınırı, reklam alanı, karar (imzalı belirteç), olaylar (gösterim/görünürlük/tıklama), günlük özet, fatura. [TAHMİN] (tasarım önerisi)
- Kreatif elle onaylanır; yasaklı kategori listesi; hedef adres tıklamada yeniden denetlenir. [TAHMİN] (öneri)

## § 7 — Uygulamayı tanıtmak için reklam vermek

- **Google Ads API** erişimi: developer token 9 Eylül 2026'da kaldırıldı; erişim seviyesi artık OAuth istemcisinin ya da servis hesabının ait olduğu Google Cloud projesine bağlı, başvuru Cloud Console'daki Google Ads API Overview sayfasından yapılıyor ve yönetici (MCC) hesabı şart değil. [121] [RESMÎ] Seviyeler: Test (yalnız test hesabı, günde 15 bin işlem) · Explorer (gerçek hesapta günde 2.880, test hesabında 15 bin; Anahtar Kelime Planlayıcı (`KeywordPlanIdeaService`, `KeywordPlanService`), `ReachPlanService`, `AudienceInsightsService`, hesap oluşturma, kullanıcı yönetimi ve fatura servisleri kapalı) · Basic (15 bin, marka doğrulaması) · Standard (sınırsız, ~10 iş günü denetim). [64] [RESMÎ] Marka doğrulaması yeni Standard başvurularında da zorunlu [121] [RESMÎ]; "Access levels and RMF" sayfası Standard denetimi için "several business days or sometimes weeks" diyor [122] [RESMÎ]. Ücretsiz masaüstü yazılım reklamı kısıtlı: "Only authoritative distribution sites that have completed an application are allowed to advertise free desktop software"; site resmi kaynak olmalı, doğrudan indirme sunmalı, her reklamda yazılımın adı geçmeli, sitede geçmişte ya da şu an politika ihlali olmamalı; başvuru formu yazılımın yayıncısına yönelik ("If you're the publisher of the specific software you want to advertise, complete the application"). Kapsama ücretsiz deneme, freeware, shareware, freemium ve indirilebilir demolar da giriyor; yani ücretsiz planı olan masaüstü uygulaması da bu başvuruya tabi. SaaS bu kuralın dışında. [65] [RESMÎ]
- **Meta Marketing API:** 4 May 2026'dan beri "Limited" ve "Full"; Full için App Review: son 15 günde en az 500 başarılı çağrı ve son 500 çağrıda (kayan pencere) %15'in altında hata oranı; ekran kaydı artık istenmiyor, yükseltme App Dashboard'da Marketing API Access Tier özelliğinin +Upgrade düğmesiyle yapılıyor. [66][67] [RESMÎ] Yalnız kendi reklam hesabı için standart `ads_management` izni yeter [66] [RESMÎ]; ancak varsayılan Limited katman "For development only. Not for production apps running for live advertisers" diye tanımlı ve reklam hesabı başına saatlik `ads_management` kotası 300 + 40 × aktif reklam [66][123] [RESMÎ]. Uygulamaya doğrulanmamış işletme portföyü bağlanabilir, ama "it must be verified before you can run ads" [124] [RESMÎ]. Yani kendi hesabında reklam yayınlamak için de Business Verification, düzenli üretim kullanımında Full katman gerekebilir. [TAHMİN]
- **TikTok API for Business:** geliştirici kaydı + OAuth [68] [3. TARAF]. Kayıt şirket alan adlı e-posta ve şirkete ait web sitesi istiyor; belgeye göre "Currently, we are unable to onboard personal accounts or individual developers", yani şirketi olmayan bireysel geliştirici için Marketing API yolu fiilen kapalı. Kayıt sonucu üç iş gününde bildiriliyor, geliştirici uygulaması incelemesi 2–3 iş günü sürüyor. [125] [RESMÎ] Toplam ≈ 5–6 iş günü (resmî sürelerin toplamı). [TAHMİN] "Birkaç gün ile iki hafta" süresi yalnız TikTok for Developers SSS'sinde geçiyor; o SSS reklam API'leri için TikTok for Business'a yönlendiriyor. [127] [RESMÎ] Şirket yoksa seçenekler: TikTok Ads Manager arayüzü [TAHMİN] ya da geliştirici kimlik bilgisi (developer credential) istemeyen TikTok for Business MCP Server (yetki 30 günde bir yenileniyor, araç başına 6 QPS; API for Business uç noktalarının hepsi henüz yok, araç erişimi bölgeye ve hesap yapısına göre değişebilir) [126] [RESMÎ].
- Türkiye: Dijital Hizmet Vergisi 2026'da %5, 2027'den %2,5 (10767 sayılı Cumhurbaşkanı Kararı, RG 25 Ara 2025; haber/ikincil kaynaklarla doğrulandı, RG metni okunmadı); reklam ağına uygulanır, fiyata yansıyabilir. [69] [3. TARAF] (Aynı oranlar §10'da 7194 sayılı Kanun metniyle [111] verilir.)

## § 8 — Genel mimari: masaüstü uygulama + web sunucusu

Roller ve seçenekler sayfanın tasarım önerisidir; ayrı kaynak numarası verilmemiş → [TAHMİN].

**Roller**

Reklam ağı: talep, gösterim, sahte trafik süzgeci, SSV. Sunucu: kredinin ve sayımın tek doğruluk kaynağı. Masaüstü uygulama: yalnız gösterim ve arayüz.

1. **Kendi reklam sunucusu + ev reklamı:** reklam varlıkları ürünün API alan adından; yerel arayüzde "Reklam" etiketli, kapatılabilir alan; ücretsiz planda seyrek, öngörülebilir aralık; sayım sunucuda tek kullanımlık belirteçle.
2. **Sitede ödüllü reklam → kredi:** masaüstü uygulama ödüllü reklam sayfasını sistem tarayıcısında açar (gömülü tarayıcıda değil; gerçek tarayıcıda kendi site = belgelenmiş web yolu, çıkarım). SSV ucu sunucuda; kredi kapalı devre.
3. **Doğrudan satış paneli:** reklamveren kaydı, bakiye, kampanya, kreatif onayı, rapor; fatura ve stopaj gerektirdiği için hukuki yapıya bağlı (§9).
4. **Google reklamı gömülü tarayıcıda:** yalnız Google'dan yazılı onay gelirse.

Riskler: Ad Manager web ödüllü reklamının masaüstü tarayıcı desteğindeki çelişki kısmen çözüldü. Yardım sayfası "You can traffic rewarded ads on Google Ad Manager desktop, mobile, and tablet web inventory" diyor; aynı sayfa ve GPT örneği "mobile optimized" sayfa şartını viewport meta etiketiyle örnekliyor, yani şart cihaz değil sayfa [9][10] [RESMÎ]. Örnek koddaki "Slot returns null if the page or device does not support rewarded ads" yorumu yüzünden hangi cihazda `null` döndüğü belgelenmemiş [10] [ÇELİŞKİLİ: kısmen çözüldü]. Web SSV geri çağrısının parametreleri, imza yöntemi ve GPT'de `custom_data`/`user_id` geçirme yolu belgede yok; kullanıcı eşleştirmesi Google'a yazılı sorulmalı [9][10] [TAHMİN: doğrulanamadı]. Yedek olarak AppLixir (web + SSV) var [28][29] [RESMÎ], ülke ve ödeme şartları doğrulanamadı [TAHMİN: doğrulanamadı].

## § 9 — Hukuk ve vergi

**CMP**: kullanıcıdan reklam/çerez rızası alan ve kaydeden araç. **TCF**: IAB'nin rıza bilgisini reklam ağlarına taşıyan standart.

### Türkiye

- Ticari Reklam Yönetmeliği: m.6/1 reklam "açıkça anlaşılmalıdır", m.6/3 editoryal içerikten ayırt edilebilir; m.22 örtülü reklam yasak; m.24 çocuklar; Ek-A/16 ödeme gerektiren şeye "ücretsiz" demek haksız uygulama. İlk yayım metni; güncel birleşik metin ayrıca kontrol edilmeli. [70] [RESMÎ]
- KVKK Çerez Rehberi (Temmuz 2025 baskısı): açık rıza seçildiyse çerezden önce; belirsiz rıza geçersiz; siteye girmek rıza değil; bağlı cihaz uygulamalarını da kapsıyor. [71] [RESMÎ]
- Yurt dışı aktarım: KVKK m.9 7499 sayılı Kanunla değişti (yürürlük 1 Haz 2024 — ikincil kaynak; Kurum duyurusu tarih vermiyor); standart sözleşme imzadan sonra 5 iş günü içinde bildirilir. [72][73] — [72] [RESMÎ]; yürürlük tarihi [73] [3. TARAF]
- 6563 / İYS: "gönderilen" elektronik ileti; uygulama penceresindeki reklam alanı büyük olasılıkla kapsam dışı (çıkarım), e-posta/SMS kampanyası kapsamda; push bildirimi için görüş doğrulanamadı. [74] — [74] [RESMÎ]; reklam alanı yorumu [TAHMİN]; push bildirimi [TAHMİN: doğrulanamadı]

### Kredinin niteliği

- 6493 m.18/5: yalnız kendi ağında, belirli hizmette kullanılan ön ödemeli araçlar kapsam dışı (hacim büyürse Merkez Bankası kapsama alabilir). Kapalı, devredilemez, nakde çevrilemez kredi elektronik para sayılmamaya daha yakın; devir/nakit bu korumayı bozar. [75] — madde [75] [RESMÎ]; uygulama içi krediye uygulanması yorum [TAHMİN]
- Satın alınan kredide cayma hakkı istisnası (Mesafeli Sözleşmeler m.15) doğrulanamadı. [76] [TAHMİN: doğrulanamadı] AB: CPC "Key Principles on In-game Virtual Currencies" (21 Mar 2025, bağlayıcı değil) — gerçek para karşılığı gösterimi, cayma, çocuk koruma. [77] [3. TARAF]

### AB ve ABD

- EDPB Rehber 2/2023 (v2.0, 7 Eki 2024): ePrivacy m.5(3) piksel, yerel işleme, IP izlemeyi de kapsar. [78] [RESMÎ]
- Google EU User Consent Policy (AEA, BK, İsviçre) [79] [RESMÎ]; kişiselleştirilmiş reklam için TCF bütünleşik onaylı CMP zorunlu — AdSense, Ad Manager ve AdMob'un üçü için (AEA/BK 16 Oca 2024, İsviçre 31 Tem 2024); onaysız CMP trafiği yalnız kişiselleştirilmemiş / sınırlı reklam alabilir [80] [RESMÎ]; TCF v2.3 tarihi ikincil kaynakta [81] [3. TARAF].
- ABD: 20–23 eyalet yasası (ikincil) [82] [3. TARAF]; COPPA değişikliği uyum tarihi 22 Nis 2026, hedefli reklam için ayrı ebeveyn rızası [83] [RESMÎ] → yaş kapısı.

### Vergi — durum → sonuç

| Durum | Sonuç | Güven |
|---|---|---|
| Türkiye, gerçek kişi (şirketsiz) | GVK mük. 20/B (sosyal içerik üreticisi / mobil uygulama mağazası geliri, banka %15 tevkifat, gelir sınırı) masaüstü uygulama reklam gelirini büyük olasılıkla kapsamaz; özelge bulunamadı [84][85]. Sürekli gelir ticari kazanç sayılır, mükellefiyet doğar. | Madde [84] [RESMÎ]; sınır kaynağı [85] [3. TARAF]; 20/B'nin masaüstü reklam gelirine uygulanması [TAHMİN: doğrulanamadı] (§13); sürekli gelirde mükellefiyet [84] [RESMÎ] |
| Türkiye, şahıs şirketi | Ticari kazanç, artan oranlı gelir vergisi. KDV: yurt dışı gösterim payı hizmet ihracı sayılabilir, yurt içi payı %20 (yalnız mali müşavir görüşü) [86]. | Gelir vergisi [84] [RESMÎ] (§10'daki aynı cümle); KDV görüşü [86] [3. TARAF] |
| Türkiye, sermaye şirketi | Kurumlar vergisi; 20/B yok. | [108][84] [RESMÎ] (§10) |
| Türkiye, reklam alanı satan | 476 sayılı CK internet reklam stopajı: gerçek kişiye %15, tam mükellef kuruma %0 (2019 kaynak, güncelliği doğrulanamadı) [87]. | [87] [3. TARAF]; güncellik [TAHMİN: doğrulanamadı] |
| Türkiye, reklam veren | Kurumsal mükellef yabancı ağ faturasında KDV'yi sorumlu sıfatıyla 2 no'lu beyannameyle öder [88]; DHV ağa uygulanır [69]. | [88][69] [3. TARAF] |
| Yurt dışında yerleşik | Bu araştırmada ülke ülke incelenmedi; ağın vergi formu (ör. ABD için W-8/W-9) ve yerel mevzuat geçerli. | İncelenmedi; kaynak numarası yok [TAHMİN] |

Ödeme: Ad Manager'ın ödeme yöntemi tablosunda Türkiye için EFT ve havale (wire) var, çek ve Hyperwallet yok [89] [RESMÎ]; EFT ödemesi yerel para biriminde yatar, banka hesabı hesapta girilen ülkede ve o ülkenin yerel para biriminde olmalı (yoksa test yatırması başarısız olur) [128] [RESMÎ]; AdSense SEPA listesinde Türkiye yok, Türkiye ödeme yöntemi doğrulanamadı [90] — liste [90] [RESMÎ]; ödeme yöntemi [TAHMİN: doğrulanamadı]. AdSense genel ödeme takvimi ve 20/B ayrıntısı için: [YouTube Oyun rehberi](../YouTube-Oyun/index.html); şirketsiz gelir için: [Şirket Kurma · Şirketsiz](../Sirket-Kurma/12-sirketsiz.html).

## § 10 — Türkiye şirketi mi, yurt dışı şirketi mi?

§9'daki TR/AB/ABD ve bireysel/şahıs/şirket vergi tablosu burada tekrarlanmaz; bu bölüm "hangi ülkede, hangi yapıyla" sorusuna bakar. Ayrıntılı hesaplar: [Genç girişimci](../Sirket-Kurma/07-genc-girisimci.html) · [Yurt dışı şirketin vergi gerçeği](../Sirket-Kurma/09-yurtdisi-cerceve.html) · [Ülke ülke seçenekler](../Sirket-Kurma/10-yurtdisi-ulkeler.html) · [Ödeme altyapıları](../Sirket-Kurma/11-odeme-altyapilari.html) · [Şirketsiz](../Sirket-Kurma/12-sirketsiz.html) (veri tarihi 3 Eylül 2026). "(rehber)" yazan rakamlar oradan alındı ve burada birincil kaynaktan yeniden açılmadı (bu belgede [3. TARAF] sayılır); diğer iddialar 30 Ekim 2026'da kaynağından okundu. Genel bilgidir; karar öncesi mali müşavire danışılmalı.

### Zorunlu olan ne? (kısa cevap)

- **Reklam geliri için şirket şart değil.** AdSense hesabı "bireysel" ya da "kuruluş" açılabilir; Google'a göre hizmet ve ödeme yapısı aynı. Tür etkinleştirildikten sonra değişmez; değiştirmek için hesap kapatılıp yenisi açılır. [112] [RESMÎ]
- **Türkiye'de yerleşik kişi için zorunlu olan şirket değil, vergi mükellefiyeti.** Türkiye'de yerleşik kişi Türkiye içi ve dışı kazancının tamamından vergilenir (GVK m.3–4). [84] [RESMÎ] Şirketsiz tek geniş kapı süreklilik taşımayan arızi kazanç (GVK m.82) [84] [RESMÎ]; her ay gelen reklam/abonelik geliri süreklilik taşıdığı için mükellefiyet gerektirmesi beklenir (çıkarım; [Şirketsiz](../Sirket-Kurma/12-sirketsiz.html) sayfası aynı sonuçta) [TAHMİN].
- **Stripe için Türkiye dışında tüzel kişi şart.** stripe.com/global listesinde Türkiye hiçbir statüde yok; ABD, Estonya, Birleşik Krallık, İrlanda, BAE var. [94] [RESMÎ] Türkiye'de şahıs ya da limited kurmak bunu değiştirmez.
- **Stripe tek yol değil.** Paddle'ın desteklenmeyen ülke listesinde Türkiye yok [114], işletme doğrulaması birey ve şahıs işletmesinden istenmiyor [115]; Polar'ın ödeme listesinde Türkiye var [116]; Türk müşteriden TL için iyzico (sanal POS şirket ister, şirketsiz yalnız "Link ile Ödeme") [117]. [RESMÎ]

### Şirketsiz dönem

- Gelir yokken geliştirme, test ve hesap başvuruları mükellefiyet doğurmaz (çıkarım: vergi konusu gelir yok). [TAHMİN]
- İlk düzenli ödemede işe başlama kanuni sürede bildirilir; bu genç girişimci istisnasının da şartıdır. [84][109] [RESMÎ] Rehbere göre süre 10 gündür ve geçmiş kayıt dışı faaliyet tespit edilirse istisna kaybedilebilir. [3. TARAF] (rehber)
- Reklam ödemesinin gelişi: Ad Manager ödeme tablosunda Türkiye: EFT evet, havale evet, çek ve Hyperwallet hayır; EFT yerel para biriminde yatar [89][128]; YouTube için AdSense ödeme tablosunda Türkiye: EFT evet, havale evet, çek hayır; banka, ödeme profilindeki adresle aynı ülkede olmalı [113]. [RESMÎ] Ana AdSense hesabına aynen uygulandığı **doğrulanamadı**. [TAHMİN: doğrulanamadı]
- Yurt dışından düzenli gelen parada sözleşme → fatura → dekont zinciri banka için de gerekir; güncel kambiyo kuralları **doğrulanamadı** ([Yurt dışı çerçeve §7](../Sirket-Kurma/09-yurtdisi-cerceve.html)). — zincir bilgisi rehberden [3. TARAF]; kambiyo kuralları [TAHMİN: doğrulanamadı]

### Türkiye seçenekleri

| Yapı | Ne sağlar | Maliyet (2026) | Not | Güven |
|---|---|---|---|---|
| Şahıs işletmesi + genç girişimci istisnası | İlk defa ticari/zirai/mesleki mükellef olan ve başlangıçta 29 yaşını doldurmamış tam mükellef gerçek kişide, başlanan yıldan itibaren 3 vergilendirme dönemi, kazancın tarifenin 2. dilimine kadar olan kısmı gelir vergisinden istisna; işe başlama kanuni sürede bildirilmiş, işte bilfiil çalışılıyor, ortaklıkta bütün ortaklar şartı taşıyor olmalı. [84] 2026 tutarı 400.000 TL. [109] | Kuruluş tipik ≈ 6.900 TL; müşavir tarife tabanı ilk 2 yıl ≈ 17.600 TL/yıl (örnek 1. grup il; 2. ve 3. grup ilde taban daha düşük — rehber) | 1 yıllık Bağ-Kur prim desteği 7566 sayılı Kanunla 1 Ocak 2026'dan itibaren kaldırıldı. [109] İstisna yalnız gelir vergisini kapsar (KDV, Bağ-Kur, damga sürer — rehber). Bağ-Kur'un doğup doğmadığı çalışma durumuna bağlıdır: başka sigortası olmayanda (çalışmayan, öğrenci) kazanç olmasa da mükellefiyet gününden doğar, başka işte 4/a çalışanda doğmaz (5510 m.53), yaşlılık aylığı alan emeklide tam prim yoktur, işsizlik ödeneği alırken işletme açılırsa ödenek kesilir (rehber: [çakışma kuralı](../Sirket-Kurma/02-sgk-bagkur.html#cakisma)). 29 yaş ve üstü ya da önceden ticari mükellefiyeti olan için istisna yok [84]; şahıs işletmesinin kuruluş ve müşavir gideri yine de limitedden düşük (rehber). | İstisna şartları ve tutarı [84][109] [RESMÎ]; Bağ-Kur desteğinin kaldırılması [109] [RESMÎ]; maliyetler, Bağ-Kur çakışması ve diğer "(rehber)" notları [3. TARAF] |
| Limited şirket | Sınırlı sorumluluk, ortak alınabilir; kurumlar vergisi %25 (KVK m.32/1) [108] | Asgari sermaye 50.000 TL (1 Oca 2024'ten) [118]; kuruluş ≈ 26.000–45.000 TL; müşavir tabanı ilk 2 yıl ≈ 39.000 TL/yıl (örnek 1. grup il — rehber) | Genç girişimci istisnası yok (madde gerçek kişiler için) [84]. Müdür olmasa da her ortak Bağ-Kur'lu olur; başka işte 4/a çalışan ortakta doğmaz (rehber: [Bağ-Kur kimleri kapsar](../Sirket-Kurma/02-sgk-bagkur.html#bagkur-kimler)). | [108][118][84] [RESMÎ]; kuruluş ve müşavir tutarları ve ortağın Bağ-Kur'u (rehber) [3. TARAF] |
| Anonim şirket | Pay devri, yatırımcı | Asgari sermaye 250.000 TL [118] | Tek kişilik küçük ürün için ağır (çıkarım) | [118] [RESMÎ]; not [TAHMİN] |

| Ödeme altyapısı | Türkiye'den satıcı | Şirketsiz? | Güven |
|---|---|---|---|
| iyzico | **EVET** — sanal POS %4,29 + 0,25 TL [117] | Yalnız Link ile Ödeme (%4,49 + 0,25 TL'den) [117] | [117] [RESMÎ] |
| Paddle (MoR) | **EVET** [114] | **EVET** — işletme doğrulaması gerekmez; kimlik doğrulaması var [115] | [114][115] [RESMÎ] |
| Polar (MoR) | **EVET** [116] | Rehbere göre evet | [116] [RESMÎ]; şirketsiz (rehber) [3. TARAF] |
| PayTR, Param, Lemon Squeezy | Durumları [Ödeme altyapıları](../Sirket-Kurma/11-odeme-altyapilari.html) sayfasında; burada **doğrulanamadı** | (soldaki hücre iki sütunu kapsar) | [TAHMİN: doğrulanamadı] |
| Stripe | **HAYIR** [94] | — | [94] [RESMÎ] |

**MoR** (Merchant of Record): satışı hukuken kendisi yapan, alıcı ülkenin KDV'sini kendisi beyan eden aracı; satıcının tek müşterisi MoR olur.

### Yurt dışı seçenekleri

| Yapı | Kuruluş | Yıllık (ciro sıfırken bile) | Stripe / banka | Muhasebe yükü | Güven |
|---|---|---|---|---|---|
| ABD LLC — Stripe Atlas (Delaware) | 500 $ tek sefer; devlet harçları ve ilk yıl kayıtlı temsilci dahil; LLC ya da C-corp; EIN dahil [95] | Atlas 100 $/yıl [95] + Delaware LLC vergisi 400 $/yıl, son gün 1 Haziran, gecikmede 200 $ + aylık %1,5 [97]; muhasebeci ve adresle ≈ 1.180 $ (rehber) | Stripe var [94]; banka: Mercury'nin yasaklı ülke sayfası açılmadı, Türkiye durumu **doğrulanamadı**; rehbere göre pasaport ya da ABD kimliği istiyor | Yabancı sahipli tek üyeli LLC her yıl Form 5472 + pro forma 1120; elektronik yok (faks/posta); ceza 25.000 $, IRS bildiriminden 90 gün sonra sürerse ek 25.000 $ [96] | [94][95][96][97] [RESMÎ]; ≈ toplam ve banka şartı (rehber) [3. TARAF]; Mercury [TAHMİN: doğrulanamadı] |
| ABD LLC — Wyoming | Eyalet harcı 100 $ [98] + kayıtlı temsilci | Lisans vergisi en az 60 $ [98]; muhasebeci ve adresle ≈ 785 $ (rehber) | Delaware ile aynı | Form 5472 aynı [96] | [96][98] [RESMÎ]; ≈ toplam (rehber) [3. TARAF] |
| Estonya OÜ (e-Residency) | e-Residency 150 €, kart başvurudaki kimlikle teslim alınır [99]; OÜ harcı elektronik 265 €, asgari sermaye şartı yok [100]. Rehbere göre Türkiye'de teslim yeri Ankara büyükelçiliği, pasaport şart | ≈ 657 € (adres + irtibat kişisi + yıllık rapor; rehber) | Stripe var [94] | Dağıtılmayan kâra vergi yok, dağıtımda 22/78 [102]. Şirket Estonya dışından yönetilirse "muhtemelen" yurt dışında işyeri oluşur ve kâr orada vergilenir; e-Residency otomatik muafiyet vermez [101] | [94][99][100][101][102] [RESMÎ]; teslim yeri, pasaport ve ≈ yıllık (rehber) [3. TARAF] |
| Birleşik Krallık Ltd | Çevrim içi kayıt 100 £ [104] | Yıllık teyit beyanı 50 £ [104]; adres + atıl hesapla ≈ 278–378 £ (rehber) | Stripe var [94] | Kurumlar vergisi kâr ≤ 50.000 £ %19, > 250.000 £ %25, arası marjinal indirim [105]; rehbere göre kimlik doğrulaması zorunlu (18 Kas 2025) | [94][104][105] [RESMÎ]; ≈ yıllık ve kimlik doğrulaması (rehber) [3. TARAF] |
| İrlanda, BAE | Maliyet burada incelenmedi — **doğrulanamadı**; BAE serbest bölge rakamları [Ülke ülke](../Sirket-Kurma/10-yurtdisi-ulkeler.html) sayfasında | (soldaki hücre iki sütunu kapsar) | Stripe ikisinde de var [94] | — | Maliyet [TAHMİN: doğrulanamadı]; Stripe [94] [RESMÎ] |

### Türkiye'de yerleşik kişinin yurt dışı şirketi

**Ciddi riskler — mali müşavire danışın**

- **İş merkezi (KVK m.3):** "Kanunî veya iş merkezi Türkiye'de bulunan" kurum dünya kazancından Türkiye'de vergilenir; iş merkezi "işlemlerin fiilen toplandığı ve yönetildiği merkez"dir. [108] [RESMÎ] Tek kurucu şirketi Türkiye'den yönetiyorsa bu risk yapısaldır (çıkarım; [Yurt dışı çerçeve §3](../Sirket-Kurma/09-yurtdisi-cerceve.html)) [TAHMİN]. Estonya vergi idaresinin cümlesi de aynı yönde. [101] [RESMÎ]
- **Kontrol edilen yabancı kurum (KVK m.7):** en az %50 kontrol edilen yurt dışı iştirakin kazancı; (a) hasılatın ≥ %25'i pasif gelir, (b) toplam vergi yükü < %10, (c) hasılat > 100.000 TL karşılığı şartları birlikte varsa dağıtılsın dağıtılmasın Türkiye'de vergilenir. [108] [RESMÎ] Gerçek kişi ortakta GVK m.75 aynı kazancı dağıtılmış kâr payı sayar. [84] [RESMÎ] Abonelik/reklam gelirinin aktif mi pasif mi sayılacağı **doğrulanamadı**. [TAHMİN: doğrulanamadı]
- **Kâr payı (GVK m.22/4):** kanuni ve iş merkezi yurt dışındaki AŞ/Ltd niteliğindeki kurumdan alınan kâr payının yarısı, ≥ %50 sahiplik ve beyanname tarihine kadar Türkiye'ye transfer şartıyla istisna. [84] [RESMÎ] ABD LLC'nin "kurum" sayılıp sayılmadığı **doğrulanamadı**. [TAHMİN: doğrulanamadı]
- **Çifte vergilendirme anlaşmaları:** ABD–Türkiye (1996) [107]; BK–Türkiye (yürürlük 26 Eki 1988, Türkiye'de 1 Oca 1989) [106]; Estonya–Türkiye (imza 25.08.2003, yürürlük 21.02.2005, uygulama 1.1.2006) [103]. [RESMÎ] İrlanda ve BAE **doğrulanamadı**. [TAHMİN: doğrulanamadı] Yurt dışı vergi Türkiye'de belgeyle mahsup edilir (GVK m.123) [84] [RESMÎ]; rehbere göre belge konsolosluk tasdikli olmalı ve şirketin kurumlar vergisi ortağın kişisel vergisinden kural olarak düşülmez. [3. TARAF] (rehber)
- **Türkiye'deki kullanıcılara satış:** Türkiye'de ikametgâhı, işyeri, kanuni ve iş merkezi olmayanların KDV mükellefi olmayan gerçek kişilere elektronik ortamda sunduğu hizmetin KDV'sini hizmeti sunan beyan edip öder (KDVK m.9/1) [110] [RESMÎ]; uygulamada "Elektronik Hizmet Sunucularına Özel KDV Mükellefiyeti" ve 3 No.lu beyanname (2018 ikincil kaynak) [119] [3. TARAF]. MoR üzerinden satışta satıcı MoR'dur; Paddle'ın Türkiye KDV'sini fiilen beyan ettiği **doğrulanamadı**. [TAHMİN: doğrulanamadı]
- **Dijital hizmet vergisi:** önceki dönemde Türkiye hasılatı 20 milyon TL'den ya da dünya hasılatı 750 milyon €'dan az olan muaf; oran 2026 %5, 2027 %2,5. [111] [RESMÎ]

Türkiye'de yaşamaya devam eden kişi için yurt dışı şirket vergiyi ortadan kaldırmaz; meşru gerekçesi vergi dışıdır (Stripe şartı, yatırımcı şartı, yurt dışına taşınma). Belirsiz konuda GİB'den özelge istenebilir. — dayanak [108][84] [RESMÎ]; tek kurucuya uygulanması yukarıdaki çıkarıma bağlı [TAHMİN]

### Karar tablosu

| Senaryo | Stripe | Reklam ödemesi | Vergi yükü (Türkiye'de yerleşikken) | Kuruluş + yıllık | Muhasebe | Risk |
|---|---|---|---|---|---|---|
| Şimdilik şirketsiz | **YOK** [94] | **OLUR** — bireysel hesap [112][113] | Düzenli gelirde mükellefiyet gerekir [84] | 0 | Yok | **YÜKSEK** — gelir başladıktan sonra sürerse |
| TR şahıs + genç girişimci (29 yaş altı, ilk kez mükellef) | **YOK**; Paddle/Polar/iyzico var | **OLUR** | 3 yıl, yılda 400.000 TL'ye kadar kazanç istisna (2026) [84][109]; KDV sürer; Bağ-Kur çalışma durumuna göre (4/a çalışanda yok) | ≈ 6.900 TL + ≈ 17.600 TL/yıl (rehber, örnek 1. grup il) | Düşük | **DÜŞÜK** — sınırsız sorumluluk |
| TR şahıs, istisnasız (29 yaş ve üstü ya da önceden mükellef) | **YOK**; Paddle/Polar/iyzico var | **OLUR** | Ticari kazanç, artan oranlı gelir vergisi [84]; KDV sürer; Bağ-Kur çalışma durumuna göre | Kuruluş ve müşavir üst satırdaki gibi (rehber) | Düşük | **DÜŞÜK** — sınırsız sorumluluk |
| TR limited | **YOK** | **OLUR** | %25 kurumlar vergisi [108] + dağıtımda stopaj; ortakta Bağ-Kur çalışma durumuna göre | ≈ 26.000–45.000 TL + ≈ 39.000 TL/yıl (rehber); sermaye 50.000 TL [118] | Orta | **DÜŞÜK** |
| ABD LLC | **VAR** [94] | **OLUR** | İş merkezi + CFC + kâr payı riski [108][84] | 500 $ + 100 $/yıl + 400 $/yıl (Atlas/Delaware) [95][97] | Yüksek (Form 5472) [96] | **YÜKSEK** |
| Estonya OÜ | **VAR** [94] | **OLUR** | Aynı riskler; Estonya da yönetim yerinde vergi bekliyor [101] | 150 € + 265 € [99][100] + ≈ 657 €/yıl (rehber) | Orta–yüksek | **YÜKSEK** — pasaport şartı (rehber) |
| BK Ltd | **VAR** [94] | **OLUR** | Aynı riskler; BK'da %19–25 [105] | 100 £ + ≈ 278–378 £/yıl [104] (rehber) | Orta–yüksek | **YÜKSEK** — kimlik doğrulaması (rehber) |

Güven: bu tablodaki köşeli parantezli numaraların hepsi [RESMÎ] kaynaktır; "(rehber)" tutarları ve notları [3. TARAF]; "Muhasebe" ve "Risk" sütunları sayfanın değerlendirmesidir [TAHMİN]. "Paddle/Polar/iyzico var" bilgisinin kaynağı yukarıdaki ödeme altyapısı tablosudur ([114][116][117]).

| Durum | Genelde uygun yol | Güven |
|---|---|---|
| Henüz gelir yok | Şirketsiz; hesaplar bireysel açılabilir [112][115]; ilk düzenli gelirden önce mükellefiyet | [112][115] [RESMÎ] |
| Türkiye'de yerleşik, 29 yaş altı, ilk defa ticari/mesleki mükellef olacak | Şahıs işletmesi + genç girişimci istisnası [84][109]; 3 yıl dolunca ya da sınırlı sorumluluk/ortak gerekince limited (çıkarım) | [84][109] [RESMÎ]; limitede geçiş [TAHMİN] |
| Türkiye'de yerleşik, 29 yaş ve üstü ya da daha önce mükellefiyeti olmuş | İstisna yok [84]; kuruluş ve müşavir gideri düşük olduğu için genelde şahıs, kâr yükseldikçe limited karşılaştırması ([Şahıs mı, limited mi?](../Sirket-Kurma/06-karsilastirma.html)) | [84] [RESMÎ]; gider karşılaştırması rehberden [3. TARAF] |
| Başka işte 4/a çalışıyor, yaşlılık aylığı alan emekli ya da işsizlik ödeneği alıyor | Vergi sonucu yaşa göre üstteki iki satır gibi; sigorta tarafı değişir: 4/a çalışanda Bağ-Kur doğmaz (5510 m.53), yaşlılık aylığı alan emeklide tam Bağ-Kur primi yok; ödenek alırken işletme açmak ya da uygulamadan düzenli gelir elde etmek ödeneği keser; seçenek ödenek bitene kadar ertelemek ya da ödenekten vazgeçmek (rehber: [çakışma kuralı](../Sirket-Kurma/02-sgk-bagkur.html#cakisma), [Ödenek alırken gelir](../Issizlik/06-odenek-alirken-gelir.html)) | [3. TARAF] (rehber) |
| Başka sigortası yok (çalışmıyor, öğrenci) ya da yetim/ölüm aylığı alıyor | Vergi sonucu yaşa göre yukarıdaki 29 yaş satırları gibi; şahıs işletmesi mükellefiyet gününden, limited ortaklığı tescil gününden tam Bağ-Kur (4/b) doğurur, kazanç olmasa da prim başlar; öğrencide ebeveyn üzerinden sağlık güvencesi sona erebilir, yetim/ölüm aylığı 4/b başlayınca kesilebilir; kuruluştan önce SGK'ya yazılı sorulmalı (rehber: [Bağ-Kur kimleri kapsar](../Sirket-Kurma/02-sgk-bagkur.html#bagkur-kimler), [YouTube Oyun · Bağ-Kur tablosu](../YouTube-Oyun/surec-ve-engeller.html#b3-10-4)) | [3. TARAF] (rehber); öğrencinin sağlık güvencesi rehberde de tahmin [TAHMİN] |
| Stripe zorunlu (iş ortağı ya da ürün şartı), pasaport var | Yurt dışı yapı + Türkiye'de doğru beyan (iş merkezi, KVK m.7, kâr payı) [108][84] | [108][84] [RESMÎ] |
| Pasaport yok | Estonya e-Residency ve BK kimlik doğrulaması pratikte kapalı, ABD bankası zor (rehber); Türkiye yapısı + MoR | [3. TARAF] (rehber) |
| Kişi fiilen yurt dışına taşınıyor | Mukimlik değişir (GVK m.4) [84]; vergi sonucu o ülkenin kuralları ve ÇVÖA'ya bağlı — ayrıca incelenmeli | [84] [RESMÎ] |
| Kamu görevlisi ya da 18 yaş altı | Şahıs işletmesi ve platform hesapları ek kısıtlara bağlı (rehber; **doğrulanamadı**) | [TAHMİN: doğrulanamadı] (rehber) |

## § 11 — Gelir tahmini

| Veri | Değer | Kaynak | Güven |
|---|---|---|---|
| Ödüllü video eCPM, 1. katman ülkeler | 15–30 $ | Playwire, veri kaynağı belirtilmemiş [91] | [3. TARAF] |
| Ödüllü video eCPM, global ortalama | 8–18 $ | Playwire [91] | [3. TARAF] |
| ABD ödüllü video (Android / iOS) | ~16,49 / ~19,63 $ | MonetizeMore [92] | [3. TARAF] |
| Türkiye ödüllü eCPM | **doğrulanamadı** | Appodeal [93] | [TAHMİN: doğrulanamadı] |
| Masaüstü ödüllü eCPM | **doğrulanamadı** | Rakamların hepsi mobil | [TAHMİN: doğrulanamadı] |

**Örnek hesap (TAHMİN, yalnız aritmetik)** — [TAHMİN]

eCPM X $ ise bir izleme ≈ X/1000 $. Global 8–18 $ ile bir izleme ≈ 0,8–1,8 sent; 1.000 kullanıcı günde 2 izleme yaparsa günde ≈ 16–36 $. Bir kredinin hizmet maliyeti bu değerin altında kalmalı; düşük eCPM'li ülkeler için oran ya da tavan gerekir.

## § 12 — Karar tablosu

| Durum | Önerilen yol | Güven |
|---|---|---|
| Yalnız masaüstü uygulama, web sitesi yok | Kendi ev reklamı ya da doğrudan satış; ödüllü reklam için Overwolf/Playwire gibi masaüstü izinli ağlar (çatı ve trafik şartlarına bak) | Öneri [TAHMİN]; masaüstü izni [14][15][18][19] [RESMÎ]; Overwolf'ta ödüllü reklam [TAHMİN: doğrulanamadı] (§1, §13) |
| Masaüstü uygulama + web sitesi + sunucu | Sitede ödüllü reklam + SSV → kredi (web geri çağrısının parametreleri ve kullanıcı eşleştirmesi belgede yok; Google'a yazılı sorulmalı); uygulamada kendi alan adından ev/doğrudan reklam | Öneri [TAHMİN]; web ödüllü reklam + SSV [9] [RESMÎ]; web SSV parametreleri ve eşleştirme [TAHMİN: doğrulanamadı]; masaüstü tarayıcı desteği [9][10] [ÇELİŞKİLİ: kısmen çözüldü] |
| Uygulama Overwolf/Electron üzerinde | Overwolf Ads SDK (tekellik ve onay şartları) | [14][15][16][17] [RESMÎ] |
| Kitlesi ağırlıkla ABD/BK/Kanada, trafiği yüksek | Playwire "Desktop Apps" adayı (1.000 DAU şartı) | [18][19] [RESMÎ] |
| Kullanıcılar AEA/BK/İsviçre'de | Kişiselleştirilmiş reklam için onaylı TCF CMP; yoksa sınırlı/kişiselleştirilmemiş reklam | [79][80] [RESMÎ] |
| Çocuk kullanıcı olasılığı | Yaş kapısı; ABD'de COPPA, Türkiye'de Reklam Yönetmeliği m.24 | [83][70] [RESMÎ] |
| Gerçek kişi, şirket yok | Gelir türü ve 20/B uygunluğu için özelge / mali müşavir; reklam satışı faturası gerektirir | Öneri [TAHMİN]; 20/B uygunluğu [TAHMİN: doğrulanamadı] (§9, §13) |

## § 13 — Doğrulanamayanlar

Aşağıdaki maddeler [TAHMİN: doğrulanamadı] sayılır ("(rehber)" rakamları için [3. TARAF]).

- Ad Manager'ın masaüstü yazılım / WebView2 kuralı; web ödüllü reklamda GPT'nin hangi cihazda `null` döndürdüğü (masaüstü desteğindeki çelişki kısmen çözüldü: [9][10] [ÇELİŞKİLİ: kısmen çözüldü]); web SSV geri çağrısının parametreleri, imza yöntemi ve GPT'de `custom_data`/`user_id` geçirme yolu.
- AdMob için "Windows desteklenmez" diyen resmi cümle; Offerwall'da SSV; AdSense'in Türkiye ödeme yöntemi.
- Overwolf: başka çatılarla uyum, ödüllü reklam, gelir payı (üçüncü taraf %20–30 rakamı resmi değil), oyun dışı uygulama kabulü.
- Playwire, AppLixir, Venatus, Ezoic için ülke kabulü ve ödeme şartları.
- Vekil sunucu yasağının resmi metni; DAI'nin küçük yayıncıya açıklığı; MRC belgelerinin kendisi; Open Measurement Windows desteği.
- Revive REST API; Kevel fiyatı; Epom/Broadstreet masaüstü uyumu.
- 476 sayılı CK oranlarının güncelliği; 20/B'nin masaüstü uygulamaya uygulanması ve 2026 sınırı; Mesafeli Sözleşmeler m.15; push bildiriminin İYS kapsamı.
- TCF v2.3 Google şartı.
- §10: AdSense ana hesabında Türkiye ödeme yöntemleri (yalnız YouTube tablosu okundu); Mercury'nin Türkiye durumu; Paddle'ın Türkiye KDV'sini beyan edip etmediği; reklam/abonelik gelirinin KVK m.7'de aktif mi pasif mi sayıldığı; ABD LLC'nin GVK m.22/4'te "kurum" sayılıp sayılmadığı; İrlanda ve BAE ile ÇVÖA ve maliyetleri; PayTR, Param, Lemon Squeezy güncel durumu; güncel kambiyo kuralları. "(rehber)" rakamları 3 Eylül 2026 tarihli Şirket Kurma rehberinden, burada yeniden doğrulanmadı.

## § 14 — Kaynakça (erişim: 30 Ekim 2026)

Numaralar HTML sayfasıyla aynıdır. Her kaydın sonundaki etiket kaynağın türüdür: [RESMÎ] platformun ya da kurumun kendi belgesi veya mevzuat; [3. TARAF] sayfada "(ikincil)" yazan kaynak, forum, ticari basın, akademik çalışma ya da sektör blogu.

1. AdSense program politikaları — https://support.google.com/adsense/answer/48182 — [RESMÎ]
2. AdSense ödüllü reklam birimi (beta) — https://support.google.com/adsense/answer/15405199 — [RESMÎ]
3. AdSense Offerwall — https://support.google.com/adsense/answer/13866332 — [RESMÎ]
4. AdSense ödüllü reklam politikası — https://support.google.com/adsense/answer/9121589 — [RESMÎ]
5. AdMob şartları — https://developers.google.com/admob/terms — [RESMÎ]
6. Mobile Ads SDK forumu (2023) — https://groups.google.com/g/google-admob-ads-sdk/c/yyFFvx8unzs — [3. TARAF] (forum)
7. AdMob SSV — https://developers.google.com/admob/android/ssv — [RESMÎ]
8. WebView API for Ads — https://developers.google.com/admob/android/browser/webview/api-for-ads ; https://developers.google.com/ad-manager/mobile-ads-sdk/android/browser/webview — [RESMÎ]
9. Ad Manager ödüllü reklam (web) — https://support.google.com/admanager/answer/9116812 — [RESMÎ]
10. GPT ödüllü reklam örneği — https://developers.google.com/publisher-tag/samples/display-rewarded-ad — [RESMÎ]
11. Microsoft reklam kitaplıkları (arşiv) — https://learn.microsoft.com/en-us/previous-versions/windows/uwp/monetize/update-your-app-to-the-latest-advertising-libraries — [RESMÎ]
12. Microsoft display ads in your app — https://learn.microsoft.com/en-us/windows/uwp/monetize/display-ads-in-your-app — [RESMÎ]
13. Microsoft Store politikaları — https://learn.microsoft.com/en-us/windows/apps/publish/store-policies — [RESMÎ]
14. Overwolf Native reklam — https://dev.overwolf.com/ow-native/monetization/advertising/overview — [RESMÎ]
15. ow-electron Ads SDK — https://dev.overwolf.com/ow-electron/reference/ads/ads-sdk-api/overview ; https://dev.overwolf.com/ow-electron/getting-started/overview — [RESMÎ]
16. Overwolf para kazanma — https://dev.overwolf.com/ow-native/monetization/overview — [RESMÎ]
17. Overwolf monetization terms — https://legal.overwolf.com/docs/overwolf/monetization-terms — [RESMÎ]
18. Playwire SSS — https://www.playwire.com/faq — [RESMÎ]
19. Playwire Desktop Apps — https://www.playwire.com/desktop-app ; https://playwire.com/blog/in-app-advertising-mobile-apps-vs-desktop-apps — [RESMÎ]
20. Unity Ads SSS — https://docs.unity.com/en-us/grow/ads/references/faq — [RESMÎ]
21. Unity LevelPlay platformlar — https://docs.unity.com/en-us/grow/levelplay/platform — [RESMÎ]
22. AppLovin MAX (2022) — https://blog.applovin.com/blog/max-features-update-march-2022/ — [RESMÎ] (şirketin kendi blogu, 2022)
23. Solar2D forumu (dolaylı) — https://forums.solar2d.com/t/applovin-supported-platforms/339936 — [3. TARAF] (forum)
24. Venatus — https://support.venatus.com/en/knowledge/what-ads-will-be-shown-on-my-site — [RESMÎ]
25. Anzu — https://anzu.io/ ; https://www.anzu.io/news/anzu-raises-9-million-to-fuel-expansion-of-the-worlds-most-advanced-in-game-advertising-platform — [RESMÎ]
26. Ezoic ödüllü reklam — https://support.ezoic.com/kb/article/rewarded-ads — [RESMÎ]
27. Ezoic site şartları — https://support.ezoic.com/kb/article/ezoic-site-requirements-for-monetization — [RESMÎ]
28. AppLixir entegrasyon SSS — https://support.applixir.com/frequently-asked-questions/integration-questions/applixir-integration-faq-360053980273 — [RESMÎ]
29. AppLixir geri çağrı — https://support.applixir.com/applixir-integration/react-integration/step-5-callbacks-rewards — [RESMÎ]
30. Mediavine eşiği (ikincil) — https://www.jupiter.co/blog/mediavine-requirements-2026-how-to-qualify — [3. TARAF]
31. AdSense reklam kodu değişiklikleri — https://support.google.com/adsense/answer/1354736 — [RESMÎ]
32. IMA HTML5 — https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side — [RESMÎ]
33. IMA uyumluluk — https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side/compatibility — [RESMÎ]
34. Out of context ads — https://support.google.com/publisherpolicies/answer/11190357 — [RESMÎ]
35. Ad Manager ödüllü reklam politikası — https://support.google.com/admanager/answer/7496282 — [RESMÎ]
36. AdMob ödüllü reklam politikası — https://support.google.com/admob/answer/7313578 — [RESMÎ]
37. AdMob program politikaları — https://support.google.com/admob/answer/2753860 — [RESMÎ]
38. Geçersiz trafik (Campaign Manager) — https://support.google.com/campaignmanager/answer/6076504 — [RESMÎ]
39. AdMob interstitial yasak uygulamaları — https://support.google.com/admob/answer/6201362 — [RESMÎ]
40. Better Ads, prestitial with countdown — https://www.betterads.org/desktop-prestitial-ad-with-countdown/ — [RESMÎ] (standardı koyan kuruluşun sayfası)
41. Reklam yükü alan deneyi (arXiv) — https://arxiv.org/abs/2412.05516v1 — [3. TARAF] (akademik çalışma)
42. Aynı çalışma, Quantitative Marketing and Economics 2025 — https://ideas.repec.org/a/kap/qmktec/v23y2025i3d10.1007_s11129-025-09294-7.html — [3. TARAF] (akademik çalışma)
43. Firebase reklam sıklığı — https://firebase.google.com/docs/tutorials/optimize-ad-frequency/solution-overview — [RESMÎ]
44. Pi-hole engelleme kipi — https://docs.pi-hole.net/ftldns/blockingmode/ — [RESMÎ]
45. AdGuard DNS süzme — https://adguard-dns.io/kb/general/dns-filtering/ — [RESMÎ]
46. WebView2 WebResourceRequested — https://learn.microsoft.com/en-us/microsoft-edge/webview2/how-to/webresourcerequested — [RESMÎ]
47. WebView2 eklentiler — https://learn.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.core.corewebview2profile.addbrowserextensionasync — [RESMÎ]
48. AdSense Offerwall reklam yoksa — https://support.google.com/adsense/answer/12726063 — [RESMÎ]
49. Ad blocking recovery — https://support.google.com/adsense/answer/11576589 — [RESMÎ]
50. Google DAI / SSB — https://support.google.com/admanager/answer/9840889 — [RESMÎ]
51. MRC görünürlük (ticari basın) — https://www.mediapost.com/publications/article/279218 — [3. TARAF]
52. MRC Viewable Ad Impression Guideline — https://www.iab.com/wp-content/uploads/2015/06/MRC-Viewable-Ad-Impression-Measurement-Guideline.pdf — [RESMÎ] (MRC belgelerinin kendisi doğrulanamadı, §13)
53. Ad Manager satır tipleri ve öncelik — https://support.google.com/admanager/answer/177279 — [RESMÎ]
54. Ad Manager ücretsiz sürüm sınırları — https://support.google.com/admanager/answer/6214526 — [RESMÎ]
55. Ad Manager ana sayfa — https://admanager.google.com/home/ — [RESMÎ]
56. Revive Adserver — https://www.revive-adserver.com/ — [RESMÎ]
57. Revive GitHub — https://github.com/revive-adserver/revive-adserver — [RESMÎ]
58. Revive gereksinimler — https://www.revive-adserver.com/support/requirements/ — [RESMÎ]
59. Kevel geliştirici — https://dev.kevel.com/ — [RESMÎ]
60. Kevel fiyat tahmini (ikincil) — https://www.vendr.com/marketplace/kevel — [3. TARAF]
61. AdButler fiyatlar — https://www.adbutler.com/pricing — [RESMÎ]
62. Epom fiyatlar — https://epom.com/ad-server/pricing — [RESMÎ]
63. Broadstreet fiyatlar — https://broadstreetads.com/pricing/ — [RESMÎ]
64. Google Ads API erişim seviyeleri — https://developers.google.com/google-ads/api/docs/api-policy/access-levels — [RESMÎ]
65. Google Ads masaüstü yazılım politikası — https://support.google.com/adspolicy/answer/13528034 — [RESMÎ]
66. Meta Marketing API yetki — https://developers.facebook.com/docs/marketing-api/get-started/authorization — [RESMÎ]
67. Meta ads_management güncellemesi — https://developers.meta.com/blog/updates-to-ads-management-standard-access-feature/ — [RESMÎ]
68. TikTok Marketing API (ikincil) — https://docs.nexla.com/user-guides/connectors/tiktok_marketing_api — [3. TARAF]
69. DHV oranı (ikincil) — https://www.alomaliye.com/2025/12/25/dijital-hizmet-vergisi-orani-dusuruldu-2026-yilinda-yuzde-5-2027-yilinda-yuzde-2-5/ — [3. TARAF]
70. Ticari Reklam Yönetmeliği (RG 10.01.2015) — https://www.resmigazete.gov.tr/eskiler/2015/01/20150110-5.htm — [RESMÎ]
71. KVKK Çerez Rehberi — https://kvkk.gov.tr/Icerik/7353/Cerez-Uygulamalari-Hakkinda-Rehber — [RESMÎ]
72. KVKK standart sözleşme bildirimi — https://www.kvkk.gov.tr/Icerik/8043/Standart-Sozlesme-Bildirim-Modulu-Hakkinda-Kamuoyu-Duyurusu — [RESMÎ]
73. KVKK değişikliği (ikincil) — https://www.erdem-erdem.av.tr/bilgi-bankasi/kisisel-verilerin-korunmasi-kanununda-neler-degisti — [3. TARAF]
74. 6563 sayılı Kanun — https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6563.pdf — [RESMÎ]
75. 6493 sayılı Kanun — https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6493.pdf — [RESMÎ]
76. Mesafeli Sözleşmeler Yönetmeliği (ikincil) — https://www.lexpera.com.tr/mevzuat/yonetmelikler/mesafeli-sozlesmeler-yonetmeligi — [3. TARAF]
77. CPC sanal para ilkeleri (ikincil) — https://www.reedsmith.com/en/perspectives/2025/03/qas-on-the-eu-consumer-protection-authorities-joint-guidance-paper — [3. TARAF]
78. EDPB Rehber 2/2023 — https://www.edpb.europa.eu/documents/guideline/guidelines-22023-on-technical-scope-of-art-53-of-eprivacy-directive_en — [RESMÎ]
79. Google EU User Consent Policy — https://www.google.com/about/company/user-consent-policy/ — [RESMÎ]
80. Google onaylı CMP şartı — https://support.google.com/admob/answer/13554116 — [RESMÎ]
81. TCF v2.3 (ikincil) — https://www.cookieyes.com/blog/iab-tcf-v2-3-explained/ — [3. TARAF]
82. ABD eyalet yasaları (ikincil) — https://www.enzuzo.com/blog/us-state-privacy-laws ; https://www.iapp.org/resources/article/us-state-privacy-legislation-tracker — [3. TARAF]
83. COPPA kuralı — https://www.federalregister.gov/documents/2025/04/22/2025-05904/childrens-online-privacy-protection-rule — [RESMÎ]
84. Gelir Vergisi Kanunu (mük. 20/B) — https://www.mevzuat.gov.tr/mevzuatmetin/1.4.193.pdf — [RESMÎ]
85. 20/B 2026 sınırı (ikincil) — https://hukukcularevi.com/internetten-sosyal-medyadan-kazananlarin-vergisi-icerik-ureticisi-istisnasi/ — [3. TARAF]
86. Reklam alanı KDV görüşü (ikincil) — https://www.muhasebetr.com/yazarlarimiz/menderescetin/023/ — [3. TARAF]
87. İnternet reklam stopajı (ikincil, 2019) — https://www.alomaliye.com/2019/04/08/internet-reklamlari-vergi-kesintisi/ — [3. TARAF]
88. Google Ireland KDV 2 (ikincil) — https://www.muhasebenews.com/?p=132492 — [3. TARAF]
89. Ad Manager ödeme yöntemleri ("Set up your form of payment", ülke tablosu; 6 Kasım 2026'da yeniden okundu) — https://support.google.com/admanager/answer/147604 — [RESMÎ]
90. AdSense SEPA EFT ülkeleri — https://support.google.com/adsense/answer/2975858 — [RESMÎ]
91. Playwire AdMob eCPM (ikincil) — https://www.playwire.com/blog/admob-ecpm-benchmarks-what-publishers-should-expect — [3. TARAF]
92. MonetizeMore uygulama geliri (ikincil) — https://www.monetizemore.com/blog/how-much-ad-revenue-can-apps-generate/ — [3. TARAF]
93. Appodeal eCPM raporu — https://appodeal.com/blog/mobile-ecpm-report-app-ad-monetization-worldwide-performance — [3. TARAF] (sektör blogu)
94. Stripe kullanılabilen ülkeler — https://stripe.com/global — [RESMÎ]
95. Stripe Atlas — https://stripe.com/atlas — [RESMÎ]
96. IRS Form 5472 talimatı — https://www.irs.gov/instructions/i5472 — [RESMÎ]
97. Delaware LLC yıllık vergisi — https://corp.delaware.gov/paytaxes/alt-entitytaxinstructions/ — [RESMÎ]
98. Wyoming LLC Kanunu (harç) ve yıllık rapor çalışma sayfası — https://sos.wyo.gov/Forms/WyoBiz/Wyoming_Limited_Liability_Company_Act_and_Close_LLC_Supplement.pdf ; https://sos.wyo.gov/forms/business/general/arworksheet.pdf — [RESMÎ]
99. e-Residency başvurusu — https://www.e-resident.gov.ee/become-an-e-resident/ — [RESMÎ]
100. Estonya Ticaret ve Sanayi Odası, şirket kurma — https://www.koda.ee/en/about-estonia/how-to-establish-company-in-estonia — [RESMÎ]
101. EMTA, e-resident şirketlerin vergi yükümlülüğü — https://www.emta.ee/en/business-client/registration-business/non-residents-e-residents/tax-liabilities-companies — [RESMÎ]
102. EMTA, kâr payının vergilendirilmesi — https://www.emta.ee/en/business-client/taxes-and-payment/income-and-social-taxes/taxation-dividends — [RESMÎ]
103. Estonya Maliye Bakanlığı ÇVÖA tablosu — https://www.fin.ee/en/double-taxation-agreements — [RESMÎ]
104. Companies House ücretleri — https://www.gov.uk/government/publications/companies-house-fees/companies-house-fees — [RESMÎ]
105. BK kurumlar vergisi oranları — https://www.gov.uk/corporation-tax-rates — [RESMÎ]
106. BK–Türkiye ÇVÖA — https://www.gov.uk/government/publications/turkey-tax-treaties/1988-uk-turkey-double-taxation-agreement-in-force — [RESMÎ]
107. IRS Türkiye anlaşma belgeleri — https://www.irs.gov/businesses/international-businesses/turkey-tax-treaty-documents — [RESMÎ]
108. Kurumlar Vergisi Kanunu 5520 (m.3, m.7, m.32) — https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5520.pdf — [RESMÎ]
109. GİB 2026 genç girişimci bilgi notu — https://cdn.gib.gov.tr/api/gibportal-file/file/getFile?objectKey=DUYURU/UNIVERSAL/2026/2026_genc_girisimciler_info.pdf — [RESMÎ]
110. KDV Kanunu 3065 (m.9/1) — https://www.mevzuat.gov.tr/mevzuatmetin/1.5.3065.pdf — [RESMÎ]
111. Dijital Hizmet Vergisi, 7194 sayılı Kanun (m.4, m.5) — https://www.mevzuat.gov.tr/mevzuatmetin/1.5.7194.pdf — [RESMÎ]
112. AdSense hesap türü — https://support.google.com/adsense/answer/10163 — [RESMÎ]
113. AdSense for YouTube ödeme yöntemleri (ülke tablosu) — https://support.google.com/youtube/answer/14728152 — [RESMÎ]
114. Paddle desteklenen ülkeler — https://www.paddle.com/help/start/intro-to-paddle/which-countries-are-supported-by-paddle — [RESMÎ]
115. Paddle işletme doğrulaması — https://www.paddle.com/help/start/account-verification/what-is-business-verification — [RESMÎ]
116. Polar desteklenen ülkeler — https://polar.sh/docs/merchant-of-record/supported-countries — [RESMÎ]
117. iyzico fiyatlandırma — https://www.iyzico.com/fiyatlandirma — [RESMÎ]
118. Ticaret Bakanlığı, asgari sermaye tutarları — https://icticaret.ticaret.gov.tr/haberler/anonim-ve-limited-sirketlerde-asgari-sermaye-tutarlari-artirilmistir — [RESMÎ]
119. Elektronik hizmet sunucularına özel KDV mükellefiyeti (ikincil, 2018) — https://www.grantthornton.com.tr/globalassets/_markets_/tur/media/vergi-sirkuleri/2018/2018-14.pdf — [3. TARAF]
120. Ad Manager'a kaydolma, AdSense hesabı şartı (erişim: 6 Kasım 2026) — https://support.google.com/admanager/answer/7084151 — [RESMÎ]
121. Google Ads API developer token: kaldırılması, Cloud projesine bağlı erişim, marka doğrulaması (erişim: 6 Kasım 2026) — https://developers.google.com/google-ads/api/docs/api-policy/developer-token ; https://developers.google.com/google-ads/api/docs/first-call/dev-token — [RESMÎ]
122. Google Ads API Access levels and RMF (erişim: 6 Kasım 2026) — https://developers.google.com/google-ads/api/docs/productionize/access-levels — [RESMÎ]
123. Meta Marketing API hız sınırları (erişim: 6 Kasım 2026) — https://developers.facebook.com/docs/marketing-api/overview/rate-limiting — [RESMÎ]
124. Meta Marketing API kullanım senaryoları (erişim: 6 Kasım 2026) — https://developers.facebook.com/documentation/development/create-an-app/marketing-api-use-cases — [RESMÎ]
125. TikTok API for Business: geliştirici kaydı ve geliştirici uygulaması (erişim: 6 Kasım 2026) — https://business-api.tiktok.com/portal/docs?id=1738855176671234 ; https://business-api.tiktok.com/portal/docs?id=1738855242728450 — [RESMÎ]
126. TikTok for Business MCP Server (erişim: 6 Kasım 2026) — https://business-api.tiktok.com/portal/docs?id=1869388085523458 — [RESMÎ]
127. TikTok for Developers SSS, son güncelleme 4 Ağustos 2026 (erişim: 6 Kasım 2026) — https://developers.tiktok.com/doc/getting-started-faq — [RESMÎ]
128. Ad Manager EFT ile ödeme (erişim: 6 Kasım 2026) — https://support.google.com/admanager/answer/2731686 — [RESMÎ]

---

**Uyarı:** Genel bilgi amaçlıdır; hukuk ve vergi bölümü danışmanlık değildir. Reklam ağı politikaları sık değişir; uygulamadan önce ilgili resmî sayfaya bakılmalı.

HTML sürüm: [index.html](index.html) · Klasör: [README.md](README.md)
