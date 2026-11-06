# Google Play'de Reklamlı Oyun Yayınlamak

Tek kişinin Godot, Kotlin ya da Unity ile yaptığı basit bir 2D/3D oyunu Google Play'e çıkarıp reklamla (AdMob) gelir elde etmesini inceleyen araştırma: para ve süre maliyeti, kişisel / kuruluş hesabı ve Play'de herkese açık görünen bilgiler, yeni kişisel hesaplardaki kapalı test şartı (12 test kullanıcısı, 14 gün), hedef API düzeyi ve 16 KB bellek sayfası gibi teknik şartlar, motor seçimi, AdMob gelirinin birikmesi ve ödeme eşikleri, temkinli gelir senaryoları, şirket gerekip gerekmediği ve vergi (GVK mük. 20/B). Okurun durumu farklı olabileceği için vergi bölümü "Durum → Sonuç" tablolarıyla dallanır: bireysel / şahıs şirketi / limited; Türkiye'de ya da yurt dışında yaşayan; 4/a çalışan, kamu görevlisi, çalışmayan, ödenek alan, öğrenci, emekli, yetim aylığı alan. [YouTube'da Oyun](../YouTube-Oyun/) rehberinin kardeşidir: aynı soru, farklı dağıtım kanalı.

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır; GitHub HTML'i işlemez)

Yapay zekâ için Markdown: [arastirma.md](arastirma.md) — aynı içerik, bir AI asistanına bağlam olarak verilebilecek saf Markdown hâlinde.

> Araştırma tarihi: 5 Kasım 2026 (bütün kaynaklara bu tarihte erişildi; hiçbir hesap açılmadı, API'ye istek atılmadı). **Güncelleme, 6 Kasım 2026:** yeni uygulamada Ocak 2025'ten beri önce app-ads.txt doğrulaması gerektiği ve hazırlık incelemesinin doğrulamadan sonra başladığı (§ 6; Google sayfaları arasındaki sıra farkı ÇELİŞKİLİ olarak işaretli), app-ads.txt'nin alan adı kökünde olması gerektiği ve GitHub Pages proje sitesinin bunun için yetmediği (§ 1) düzeltildi (kaynakça [39]–[41]). Google Play ve AdMob kuralları, eşikler ve tarihler sık değişir; uygulamadan önce kaynakçadaki resmî sayfalardan güncelini kontrol et. Resmî kaynakta bulunamayan her bilgi sayfada "doğrulanamadı" diye işaretli; süre ve gelir rakamları ölçülmemiş tahmin ya da anekdottur. Genel bilgi amaçlıdır; vergi ve hukuk bölümü danışmanlık değildir, somut durumda mali müşavire danışılmalıdır.

## İçindekiler

- [index.html](index.html) — Tek sayfalık HTML anlatım; bölümleri aşağıdaki tabloda.
- [arastirma.md](arastirma.md) — Yapay zekâ için saf Markdown hâli: net başlık hiyerarşisi, tablolar, her önemli iddiada kaynak ve güven etiketi (RESMÎ / 3. TARAF / TAHMİN / ÇELİŞKİLİ), sonda tam kaynakça.

## Bölümler

| § | Bölüm | Kısaca |
|---|---|---|
| 0 | [Kısa cevap](index.html#kisa) | Para, şirket, ilk yayın, ödeme ve vergi için tek satırlık cevaplar; gerçekçi gelir beklentisi. |
| 1 | [Para ve süre](index.html#maliyet) | Zorunlu tek gider (25 $ kayıt), motor ve varlık lisansları; geliştirme süresi tahminleri. |
| 2 | [Hesap türü, görünen bilgiler](index.html#hesap) | Kişisel / kuruluş hesabı, D-U-N-S, Play'de herkese açık görünen ad, adres ve e-posta; kayıt ülkesi. |
| 3 | [Kapalı test: 12 kişi, 14 gün](index.html#kapali-test) | Yeni kişisel hesaplarda üretime erişim şartı; test kullanıcısı bulma yolları ve riskleri. |
| 4 | [Teknik şartlar](index.html#teknik) | AAB, hedef API 36, 16 KB bellek sayfası, gizlilik politikası, veri güvenliği formu, Aileler politikası. |
| 5 | [Godot · Kotlin · Unity](index.html#motor) | Motor karşılaştırması, Godot ile Android'e çıkış, başlangıç noktasına göre seçim. |
| 6 | [AdMob: birikme ve ödeme](index.html#admob) | Aylık ödeme döngüsü, ₺200 / 100 $ eşikleri, EFT, bekletme, hesabı kaybettiren hatalar, `app-ads.txt`, AB onayı. |
| 7 | [Gelir senaryoları](index.html#gelir) | eCPM, paylaşılan deneyimler (anekdot) ve yalnız aritmetik örnek hesaplar (TAHMİN). |
| 8 | [Şirket ve vergi, durum durum](index.html#vergi) | GVK mük. 20/B şartları; yapıya, yaşanan yere ve çalışma durumuna göre sonuçlar. |
| 9 | [Yıllık bakım](index.html#bakim) | Hedef API yükseltmeleri, AdMob SDK destek takvimi, yıllık güncelleme yükü. |
| 10 | [Karar tablosu](index.html#karar) | Okurun durumuna göre önerilen yol. |
| 11 | [Doğrulanamayanlar](index.html#dogrulanamayan) | Resmî kaynakta bulunamayan açık noktalar. |
| 12 | [Kaynakça](index.html#kaynakca) | Resmî Google Play, Android, AdMob, motor ve Türkiye mevzuatı kaynakları; ikincil kaynaklar ayrıca işaretli. |

## Kısa sonuç

- Zorunlu tek gider: Google Play geliştirici kaydı, tek seferlik 25 $. Godot, Kotlin araçları ücretsiz; Unity Personal 200.000 $ gelir altında ücretsiz.
- Şirket gerekmez: kişisel hesap reklamla para kazanabilir; D-U-N-S yalnız kuruluş hesabında. Kişisel hesapta yasal ad, ülke ve e-posta görünür; para kazanma (satıcı profili) açılırsa tam adres de görünebilir.
- 13 Kasım 2023'ten sonra açılan kişisel hesapta ilk yayından önce en az 12 test kullanıcısı 14 gün kesintisiz kapalı testte kalmalı; inceleme genelde 7 gün veya daha az. İlk yayın en az ~3 hafta.
- 31 Ağustos 2026'dan beri yeni uygulama ve güncellemeler API 36'yı hedefler; yerel kodlu motorlar (Godot, Unity) 16 KB sayfa boyutunu desteklemeli (güncellemeler için resmî son tarih 1 Şubat 2027).
- AdMob ödeme eşiği TRY hesabında ₺200, USD'de 100 $; ödeme ayın 21'i civarı; Türkiye EFT listesinde; ödeme 1 yıla kadar bekletilebilir.
- Gelir beklentisi düşük: anekdotlara göre 1.000 indirme ≈ 5–10 $.
- Türkiye'de yaşayan gerçek kişi için GVK mük. 20/B: ayrı banka hesabı, %15 kesinti, 2026 sınırı 5.300.000 TL; şirketler yararlanamaz.
- Çalışma durumu ve yaş sonucu değiştirir: 4/a çalışan iş sözleşmesindeki yan iş maddesine bakar, kamu görevlisi kurumundan teyit alır; ödenek alan, öğrenci, emekli, yetim aylığı alan ya da başka sigortası olmayan kişi mükellefiyetten önce İŞKUR/SGK'ya yazılı sorar (20/B mükellefiyetinin Bağ-Kur doğurup doğurmadığı doğrulanamadı); 29 yaş altında genç girişimci istisnasıyla karşılaştırılır; yurt dışında yaşayanın vergisi ikamet ülkesine göredir.

## İlgili konular

- [Masaüstü Uygulamada Reklam ve Ödüllü Reklam](../Masaustu-Uygulama-Reklam/) — Bu sayfada tekrar edilmeyen ayrıntılar: geçiş reklamı kuralları (§ 4), AB onay kuralları (§ 9), Türkiye şirketi mi yurt dışı şirketi mi (§ 10), eCPM aralıkları (§ 11).
- [YouTube'da Oyun](../YouTube-Oyun/) — Aynı sorunun YouTube Playables tarafı: motor seçimi, 20/B ve çalışma durumuna göre Bağ-Kur tablosu ([süreç ve engel raporu](../YouTube-Oyun/surec-ve-engeller.html)).
- [Şirket Kurma → Vergi 101](../Sirket-Kurma/03-vergi-101.html) — 20/B, %15 stopaj ve 2026 sınırının özeti.
- [Şirket Kurma → Şirketsiz Ne Yapabilirsin?](../Sirket-Kurma/12-sirketsiz.html) — Google Play bireysel hesap, 20/B adımları ve mükellefiyetin Bağ-Kur sorusu.
- [Şirket Kurma → Genç Girişimci ve Teşvikler](../Sirket-Kurma/07-genc-girisimci.html) — 29 yaş altında ilk kez mükellef olanların istisnası ve 20/B ile ilişkisi.
- [Şirket Kurma → SGK ve Bağ-Kur](../Sirket-Kurma/02-sgk-bagkur.html) — 4/a, 4/b, 4/c statüleri; emekli ve başka sigortası olmayan dalları.
- [İşsizlik → Ödenek Alırken Para Kazanmak](../Issizlik/06-odenek-alirken-gelir.html) — Ödenek alırken mükellefiyet açmanın ve uygulama gelirinin ödeneğe etkisi.
- [API → Google AdMob](../../API/Reklam/AdMob.md) — AdMob API ile gelir raporu çekme (OAuth kapsamları, kotalar, C# örneği), SSV ile ödül doğrulama, SDK platformları, ödeme eşikleri ve Ocak 2025'ten beri zorunlu app-ads.txt doğrulaması.

## Kaynakça (erişim: 5 Kasım 2026)

Sayfadaki köşeli parantezli numaralar ([n]) [index.html](index.html#kaynakca) § 12'deki sırayı izler; burada kaynaklar türe göre gruplanmıştır.

**Resmî — Google Play / Android**

- Geliştirici hesabı kaydı (25 $) — https://support.google.com/googleplay/android-developer/answer/6112435
- Hesap türü seçimi (kişisel / kuruluş, D-U-N-S) — https://support.google.com/googleplay/android-developer/answer/13634885
- Play'de görünen geliştirici bilgileri — https://support.google.com/googleplay/android-developer/answer/13628312
- Desteklenen ülkeler ve ödeme profili — https://support.google.com/googleplay/android-developer/table/3539140 ; https://support.google.com/googleplay/android-developer/answer/7161426 ; https://support.google.com/googleplay/android-developer/answer/13634081
- Yeni kişisel hesaplarda test şartı — https://support.google.com/googleplay/android-developer/answer/14151465
- Android App Bundle — https://support.google.com/googleplay/android-developer/answer/9844279
- Hedef API düzeyi — https://developer.android.com/google/play/requirements/target-sdk ; https://support.google.com/googleplay/android-developer/answer/11926878
- 16 KB sayfa boyutu — https://developer.android.com/guide/practices/page-sizes
- Uygulama içeriği beyanları — https://support.google.com/googleplay/android-developer/answer/9859455
- Veri güvenliği formu — https://support.google.com/googleplay/android-developer/answer/10787469
- Aileler politikası — https://support.google.com/googleplay/android-developer/answer/9893335

**Resmî — AdMob**

- Ödeme takvimi — https://support.google.com/admob/answer/2772140
- Ödemeyi bekletme — https://support.google.com/admob/answer/3109143
- EFT ve ülke listesi — https://support.google.com/admob/answer/1714398
- Ödeme eşikleri — https://support.google.com/admob/answer/2772208
- Geçersiz trafik — https://support.google.com/admob/answer/6197403 ; https://support.google.com/admob/answer/9493252
- Vergi bilgileri — https://support.google.com/admob/answer/4381375
- Uygulama hazırlık incelemesi — https://support.google.com/admob/answer/10564477
- app-ads.txt — https://support.google.com/admob/answer/9363762
- AB onay şartı (UMP) — https://developers.google.com/admob/android/privacy/gdpr
- Diğer platformlar — https://developers.google.com/admob/other-platforms
- Android SDK destek takvimi — https://developers.google.com/admob/android/deprecation

**Resmî — motorlar ve varlıklar**

- Godot indirme (4.7.2, 18 Ağustos 2026) — https://godotengine.org/download/windows/
- Godot lisansı — https://godotengine.org/license/
- Godot, Android'e dışa aktarma — https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_android.html
- Godot, çiziciler — https://docs.godotengine.org/en/stable/tutorials/rendering/renderers.html
- Godot Google Play Billing — https://docs.godotengine.org/en/stable/tutorials/platform/android/android_in_app_purchases.html
- Unity Personal — https://unity.com/products/unity-personal
- Kenney lisansı — https://kenney.nl/support

**Resmî — Türkiye mevzuatı ve kurumlar**

- 193 sayılı Gelir Vergisi Kanunu, mük. md. 20/B — https://www.mevzuat.gov.tr/mevzuatmetin/1.4.193.pdf
- GİB, 2026 gelir vergisi tarifesi — https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fyardim-kaynaklar%2Fyararli-bilgiler%2Fgelir-vergisi-tarifeleri%2Fgelir-vergisi-tarifesi-2026.pdf
- İŞKUR, ödeneğin kesilme halleri — https://www.iskur.gov.tr/sikca-sorulan-sorular/issizlik-sigortasi/issizlik-odenegi-hangi-hallerde-kesilmektedir/

**İkincil (blog, forum, anekdot)**

- 318 Seri No.lu GVGT alıntısı — https://www.alomaliye.com/2022/01/12/gelir-vergisi-genel-tebligi-seri-no-318-gvk-318
- Kapalı testte etkileşim nedeniyle ret — https://dev.to/tizoc_araujo_3cd9fb67191f/google-play-closed-testing-rejected-for-insufficient-engagement-what-that-actually-means-in-2026-ion
- Test kullanıcısı takası (hizmet satan siteler) — https://www.testerscommunity.com/blog/reddit-vs-testers-community-which-is-better-for-app-testing-in-2026 ; https://extendsclass.com/blog/google-plays-closed-testing-requirement-what-developers-need-to-know-in-2026
- Godot hedef SDK forumu — https://forum.godotengine.org/t/how-to-target-latest-android-sdk/142631
- Poing Studios godot-admob-plugin — https://github.com/poingstudios/godot-admob-plugin
- Geliştirme süresi — https://oceanviewgames.co.uk/resources/game-development-timeline ; https://meliorgames.com/game-development/how-long-does-it-take-to-create-a-casual-mobile-game/
- Geliştirici gelir anlatıları — https://www.reddit.com/r/gamedev/comments/l1jejb/is_mobile_development_still_profitable_in_2021 ; https://forums.unrealengine.com/t/my-first-months-ad-revenue-admob/81860

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
