# Google Play'de basit bir oyun reklamla yayınlamak

Araştırma · Mobil oyun ve para kazanma (yayın · AdMob · vergi)

- **Araştırma tarihi:** 5 Kasım 2026. Bütün kaynaklara bu tarihte erişildi. Yalnız herkese açık sayfalar okundu; hiçbir hesap açılmadı, API'ye istek atılmadı.
- **Kapsam:** Tek kişinin Godot ya da Kotlin ile yaptığı 2D/3D basit bir oyunu Google Play'e çıkarması: ne kadar para ve zaman ister, yeni hesaplardaki kapalı test şartı, teknik şartlar, AdMob geliri nasıl birikir ve ödenir, şirket gerekir mi, vergi nasıl işler. Motor karşılaştırmasında Unity de var (§ 5).
- **Yöntem:** Resmî kaynak öncelikli; resmî kaynakta bulunamayan bilgi "doğrulanamadı" diye işaretli (toplu liste: § 11). Süre ve gelir rakamlarının hepsi ölçülmemiş tahmin ya da anekdottur.
- **Okurun durumu:** Tek bir durum varsayılmaz. Vergi bölümü (§ 8) ve karar tablosu (§ 10) "Durum → Sonuç" biçiminde dallanır: bireysel / şahıs şirketi / limited; Türkiye'de ya da yurt dışında yaşayan; 4/a çalışan, kamu görevlisi, çalışmayan, ödenek alan, öğrenci, emekli, yetim aylığı alan. Motor seçimi başlangıç noktasına göre ayrılır (§ 5).
- **Uyarı:** Genel bilgi amaçlıdır; vergi ve hukuk bölümü danışmanlık değildir. Google Play ve AdMob kuralları sık değişir; uygulamadan önce ilgili resmî sayfaya bakılmalı.
- **Aynı içerik, insan okuru için:** [index.html](index.html) (yerelde tarayıcıda açılır; GitHub HTML'i işlemez). Klasör özeti: [README.md](README.md).
- **İlgili sayfalar (depo içi):** [Masaüstü uygulamada reklam](../Masaustu-Uygulama-Reklam/index.html) · [YouTube Oyun (motor seçimi, 20/B)](../YouTube-Oyun/index.html) · [Şirketsiz gelir](../Sirket-Kurma/12-sirketsiz.html) · [Ödenek alırken gelir](../Issizlik/06-odenek-alirken-gelir.html) · [Ana Dizin](../../index.html)

## Bu belge nasıl okunur

| Etiket | Anlamı |
|---|---|
| [RESMÎ] | Resmî sayfada okundu: Google Play, Android ve AdMob belgeleri; motorun ya da varlık sitesinin kendi sayfası; Türkiye mevzuatı ve kurum sayfaları. |
| [3. TARAF] | İkincil kaynak: blog, forum, hizmet satan site, anekdot. |
| [TAHMİN] | Ölçülmemiş yorum: sayfada tahmin, çıkarım, senaryo ya da varsayım olarak verilen bilgi. |
| [TAHMİN: doğrulanamadı] | Resmî kaynakta bulunamadı ya da bu araştırmada sınanmadı; toplu liste § 11. |
| [ÇELİŞKİLİ] | Kaynaklar birbirini tutmuyor; hangi kaynağın ne dediği yanında yazılı. |

- Köşeli parantezli numaralar ([1]–[38]) § 12 Kaynakça'daki sırayı izler; [index.html](index.html) ile aynı numaralardır.
- Etiket taşımayan cümle: sayfada kaynak ya da rozet verilmemiş açıklama, sonuç veya öneri.
- Tırnak içindeki İngilizce ifadeler, yanında numarası verilen kaynaktan alıntıdır.
- Terimler ilk geçtiği yerde tek satırla açıklanır. Bölüm göndermeleri "→ § N" biçimindedir.

## İçindekiler

- § 0 — Kısa cevap
- § 1 — Para ve süre
- § 2 — Hesap türü ve herkese açık görünen bilgiler
- § 3 — Kapalı test: 12 kişi, 14 gün
- § 4 — Teknik şartlar (Kasım 2026)
- § 5 — Godot · Kotlin · Unity
- § 6 — AdMob: gelir nasıl birikir, nasıl ödenir
- § 7 — Gelir senaryoları (temkinli)
- § 8 — Şirket ve vergi, durum durum
- § 9 — Yıllık bakım
- § 10 — Karar tablosu
- § 11 — Doğrulanamayanlar
- § 12 — Kaynakça

## § 0 — Kısa cevap

> **Olan**
>
> - **Para:** zorunlu tek gider Google Play geliştirici hesabı, **tek seferlik 25 $** [RESMÎ] [1]. Godot ve Kotlin araçları ücretsiz (Godot lisansı: [RESMÎ] [20]). → § 1
> - **Şirket:** başlamak için gerekmez. Kişisel hesap reklamla para kazanabilir; D-U-N-S numarası yalnız kuruluş hesabında istenir [RESMÎ] [2]. → § 2
> - **İlk yayın:** 13 Kasım 2023'ten sonra açılan kişisel hesapta en az **12 test kullanıcısı, 14 gün kesintisiz** kapalı test, sonra inceleme (genelde 7 gün veya daha az) [RESMÎ] [5]. En az ~3 hafta [TAHMİN]. → § 3
> - **Ödeme:** AdMob geliri her ay birikir; eşik TRY hesabında **₺200**, USD hesabında **100 $**; ödeme ayın 21'i civarı [RESMÎ] [14] [17]. Türkiye EFT listesinde var [RESMÎ] [16]. → § 6
> - **Vergi (Türkiye'de yaşayan gerçek kişi):** GVK mük. 20/B istisnası mobil uygulama mağazası gelirini kapsar: ayrı banka hesabı, banka **%15** keser, 2026 sınırı **5.300.000 TL** [RESMÎ] [34] [35]. Çalışma durumu (kamu görevlisi, ödenek alan, öğrenci, emekli…) ve yaş sonucu değiştirebilir; yurt dışında yaşayan için ikamet ülkesinin kuralları geçerli. → § 8

> **Gerçekçi beklenti**
>
> - Basit reklamlı bir oyun, paylaşılan deneyimlere göre **1.000 indirme başına birkaç dolar** getiriyor [3. TARAF] [32]. Ayda 100 $ için ayda on binlerce indirme gerekir. Zor olan oyunu yapmak değil, indirtmek. → § 7
> - Kendi reklamına tıklamak ya da çevreye tıklatmak hesabı kapattırabilir [RESMÎ] [18]. → § 6

## § 1 — Para ve süre

**Para**

| Kalem | Tutar | Not |
|---|---|---|
| Google Play geliştirici kaydı | 25 $, tek sefer | Visa, Mastercard, AmEx; ön ödemeli kart kabul edilmez; kabul edilen kart ülkeye göre değişir [RESMÎ] [1] |
| Godot | 0 | MIT lisansı; telif ücreti, gelir payı yok; lisans metni oyunda bir yerde gösterilir [RESMÎ] [20] |
| Kotlin + Android Studio | 0 | Ücretsiz araçlar |
| Unity Personal | 0 (şartlı) | Son 12 ayda gelir + yatırım 200.000 $'ın altındaysa [RESMÎ] [24] |
| Görseller, sesler | 0'dan başlar | Kenney paketleri CC0 (ticari serbest, atıf gerekmez) [RESMÎ] [21]; diğer paketlerde lisans tek tek okunur: CC-BY atıf ister, CC-BY-NC reklamlı oyunda kullanılamaz |
| Gizlilik politikası sayfası, `app-ads.txt` | 0 olabilir | Herkese açık bir web sayfası gerekir; ücretsiz statik barındırma yeter (ör. GitHub Pages) |

**Süre** (tek kişi, programlama bilen, yapay zekâ yardımıyla) — tablonun tamamı [TAHMİN]

| İş | Süre |
|---|---|
| Tek mekanikli basit 2D oyun (reklam + mağaza sayfası dahil) | 1–3 hafta |
| Cilalı casual oyun (seviyeler, ilerleme, ses, ayarlar) | 2–4 ay |
| Basit 3D oyun (düşük poligon) | 1–3 ay; ucuz telefonda performans ayarı ayrıca |
| İlk oyunda dışa aktarma, imzalama, AdMob kurulumu | +3–5 gün (sonraki oyunlarda çok azalır) |
| Kapalı test + inceleme (yeni kişisel hesap) | en az ~3 hafta; geliştirmeyle paralel yürüyebilir |

- Stüdyo ve serbest çalışan kaynakları 2D hyper-casual için 2 hafta ile 3 ay arası rakamlar veriyor [3. TARAF] [28].
- Yapay zekâ çalışan bir prototipi hızlı çıkarıyor; darboğaz animasyon ve "oyun hissi" [3. TARAF].
- Hiç kod yazmamış biri için motorun temel eğitimine ayrılan süre bu tabloya ayrıca eklenir [TAHMİN]; başlangıç noktasına göre motor seçimi: § 5.

## § 2 — Hesap türü ve herkese açık görünen bilgiler

| Konu | Kişisel hesap | Kuruluş hesabı |
|---|---|---|
| Kimin için | Kişisel kullanım: öğrenci, hobi, amatör geliştirici | Şirket / kurum |
| Kimlik | Resmî kimlik + kart | D-U-N-S numarası zorunlu [RESMÎ] [2] |
| Zorunlu olduğu uygulamalar | — | Finans, sağlık, VPN, devlet [RESMÎ] [2]. Basit oyun bunlardan değil. |
| Para kazanma | İkisi de aynı temel işlevlere sahip, ödeme profiliyle para kazanabilir [RESMÎ] [2] | Aynı: ödeme profiliyle para kazanabilir [RESMÎ] [2] |
| Play'de görünen | Yasal ad, ülke, geliştirici e-postası. "If you decide to monetize on Google Play then Google will display your full address." Bazı bölgelerde telefon da görünebilir. [RESMÎ] [3] | Yasal ad, yasal adres, geliştirici e-postası ve telefonu [RESMÎ] [3] |
| Kapalı test şartı (§ 3) | 13 Kas 2023 sonrası açıldıysa var [RESMÎ] [5] | Resmî metin şartı kişisel hesaplar için koyuyor [RESMÎ] [5]; çıkarım: kuruluş hesabında yok [TAHMİN] |

- Google'ın iletişim için kullandığı e-posta ve telefon oyunculara gösterilmez [RESMÎ] [3].
- Tam adresin **yalnız reklamlı** bir uygulamada da görünüp görünmediği [TAHMİN: doğrulanamadı]: Play'deki ödeme (satıcı) profili ücretli uygulama ve uygulama içi satın alma için anlatılıyor [RESMÎ] [4]; AdMob ise kendi ödeme sistemiyle öder.
- Ev adresinin görünmesini istemeyen biri, satıcı profili açmadan önce bunu düşünmeli.

> **Ülke**
>
> Türkiye hem geliştirici kaydında hem satıcı kaydında destekli; varsayılan para birimi TRY [RESMÎ] [4]. İş yeri ülkesi sonradan değiştirilemez, banka hesabı aynı ülkede olmalı. Yurt dışında yaşayan biri kayıt ülkesini ikamet adresine göre seçer; o ülkenin desteklenip desteklenmediği aynı tablodan ([4]) bakılır.

## § 3 — Kapalı test: 12 kişi, 14 gün

- **Kimlere:** "personal accounts created after November 13, 2023" [RESMÎ] [5]
- **Şart:** "a minimum of 12 testers who have been opted in continuously for at least 14 days". 14 günü doldurmadan çıkan sayılmaz; çıkıp yeniden giren için gün baştan sayılır [RESMÎ] [5].
- **Sonra:** üretime erişim başvurusu; formda test kullanıcılarını nasıl bulduğun, ne kadar kullandıkları, geri bildirim, hedef kitle ve test sonrası değişiklikler sorulur. "Review usually takes seven days or less, but can occasionally take longer." [RESMÎ] [5]
- **Etkileşim:** yetersiz etkileşimde testi sürdürmen istenebilir; ölçüt yayınlanmadı [TAHMİN: doğrulanamadı]. "12 kişiden çoğu 14 günün 5–7'sinde açmalı" iddiası yalnız bir blogda [3. TARAF] [6].

| Test kullanıcısı nereden | Değerlendirme |
|---|---|
| Arkadaş, aile, iş çevresi | Google'ın gösterdiği en yaygın yol; en sağlam [RESMÎ] [5] |
| Oyunun hedef kitlesinin bulunduğu topluluklar | Google öneriyor [RESMÎ] [5]; gerçek geri bildirim de getirir |
| Takas grupları (Reddit, Google Groups) | Resmî metin ([5]) ne yasaklıyor ne onaylıyor; uygulamayı hiç açmayanlar yüzünden reddedilme anlatıları var [3. TARAF] [7] |
| Ücretli test hizmetleri | Var; kaynakların çoğu hizmeti satan siteler, tarafsız değil [3. TARAF] [7] |
| Sahte hesap, emülatör, bot | Yapma: hesap askıya alınabilir (blog yorumu [3. TARAF]; Google metni bulunamadı [TAHMİN: doğrulanamadı]). Yorum karşılığı yorum Google politikasına aykırı. |

- Pratik öneri [3. TARAF]: test sırasında en az bir güncelleme yayınla, geri bildirim topla, formu ayrıntılı doldur.

## § 4 — Teknik şartlar (Kasım 2026)

| Şart | Bugünkü hâli |
|---|---|
| Paket biçimi | Yeni uygulamada Android App Bundle (`.aab`) [RESMÎ] [8] |
| Hedef API düzeyi | 31 Ağustos 2026'dan beri yeni uygulamalar ve güncellemeler **Android 16 (API 36)** veya üstünü hedeflemeli. Ek süre 1 Kasım 2026'ya kadar istenebiliyordu (geçti). Mevcut uygulama en az API 35'i hedeflemezse yeni Android sürümlü cihazlardaki yeni kullanıcılara görünmez. [RESMÎ] [9] |
| 16 KB bellek sayfası | "all apps targeting Android 15 (API level 35) and higher must support 16 KB memory page sizes on 64-bit devices"; "Starting February 1, 2027, if your app updates don't support 16 KB memory page sizes, you won't be able to release these updates." [RESMÎ] [10]. Yalnız Java/Kotlin kodlu uygulama zaten uyumlu; yerel (C/C++) kod içeren motorlar (Godot, Unity) güncel sürümle derlenmeli. NDK r28+ varsayılan olarak 16 KB hizalı. |
| Gizlilik politikası | Herkese açık, girişsiz bir web sayfası; veri toplanmasa da gerekli [RESMÎ] [11] |
| Veri güvenliği formu | Bütün uygulamalarda; AdMob gibi SDK'ların topladığı veriler de beyan edilir [RESMÎ] [12] |
| Reklam beyanı, içerik derecelendirmesi, hedef yaş | Reklam SDK'sı varsa "Reklam içerir" etiketi; derecelendirme anketi; hedef kitle seçimi [RESMÎ] [11] |
| Hedef kitlede çocuk varsa | Aileler politikası: yalnız onaylı reklam SDK'ları, kişiselleştirilmiş reklam yok, daha sıkı reklam yerleşimi kuralları [RESMÎ] [13]. Oyun çocuklara yönelik değilse hedef yaşı 13+ seçmek reklam tarafını sadeleştirir. |

**16 KB tarihleri hakkında not** [ÇELİŞKİLİ]

- İkincil kaynaklar ilk son tarihi 1 Kasım 2025, uzatmayı Mayıs 2026 olarak veriyor [3. TARAF]; resmî sayfa bugün güncellemeler için 1 Şubat 2027 diyor [RESMÎ] [10].
- Yeni uygulamalar için tarih resmî sayfada ayrıca yazmıyor [TAHMİN: doğrulanamadı].
- API 36 hedefleyen her uygulama zaten "API 35 ve üstü" kapsamında olduğundan pratikte baştan 16 KB uyumlu derlemek gerekir.

## § 5 — Godot · Kotlin · Unity

| Konu | Godot 4 | Kotlin (Compose / libGDX / KorGE) | Unity |
|---|---|---|---|
| Ücret | Ücretsiz, MIT [RESMÎ] [20] | Ücretsiz | Personal: 200.000 $ altı ücretsiz [RESMÎ] [24] |
| Güncel sürüm | 4.7.2 (18 Ağustos 2026) [RESMÎ] [19] | libGDX 1.14.x; KorGE 6.0 [3. TARAF] | — |
| Güçlü yanı | Sahne editörü; 2D ve 3D; tek kişilik iş için verimli | Resmî Android AdMob ve Billing SDK'ları doğrudan; küçük paket; 16 KB sorunu yok (saf Kotlin) | En büyük ekosistem; resmî reklam araçları |
| Zayıf yanı | AdMob için resmî SDK yok, topluluk eklentisi; boş proje bile onlarca MB | Oyun motoru değil (Compose) ya da sahne editörü yok (libGDX); aksiyon oyununda Compose performansı sınırlı olabilir | Paket büyük; gelir eşiği aşılınca abonelik |
| Uygun | 2D/3D basit oyunlar | Bulmaca, kelime, kart, sıra tabanlı | Unity bilen ya da 3D ağırlıklı |

### Godot ile Android'e çıkış

- Belgedeki gereksinimler (4.7): OpenJDK 17, Android SDK (Platform-Tools, Build-Tools 35.0.1, Platform 35), NDK r28b; AAB için "Gradle build" açılır; debug olmayan bir keystore ile imzalanır [RESMÎ] [22]. Hedef SDK 36 için Platform 36'nın da kurulması gerekir (forum) [3. TARAF] [22].
- Ucuz telefonlar için **Compatibility** çizicisi: "supports the widest range of hardware"; 2D için genelde yeterli [RESMÎ] [23].
- AdMob: Google'ın "diğer platformlar" sayfası Poing Studios `godot-admob-plugin`'i listeliyor ama destek vermiyor [RESMÎ] [25]. Eklenti AB onay formunu (UMP) destekliyor; Eylül 2026'da sürüm almış [3. TARAF] [26].
- Godot'ta C# da var; Android'de C# dışa aktarmanın durumu bu araştırmada sınanmadı [TAHMİN: doğrulanamadı]. Web hedefinde Godot C# yok: [YouTube Oyun · motor seçimi](../YouTube-Oyun/index.html#motor-secimi).

> **Başlangıç noktasına göre**
>
> - Hiç oyun yapmamış: Godot + GDScript (editör ve resmî "ilk 2D oyun" eğitimi).
> - Android/Kotlin bilen, oyun basit: Kotlin + Compose ya da libGDX.
> - C#/.NET'ten gelen: Godot C# (Android desteğini önce boş projede sına) ya da Unity.
> - Unity bilen: Unity; paket boyutu ve 200.000 $ eşiği göz önünde.

## § 6 — AdMob: gelir nasıl birikir, nasıl ödenir

- **Döngü aylık:** önceki ayın kazancı ayın 3'ünde kesinleşir; 20'sinde bakiye eşiği geçmişse "you'll be issued a payment on or around the 21st of the month"; geçmemişse sonraki aya devreder [RESMÎ] [14]. EFT genelde 7 iş gününde ulaşır.
- **Bekletme:** "You can place a hold on your payment for up to one year." [RESMÎ] [15]
- **Türkiye:** EFT ülke listesinde var: lira, deneme yatırımı (test deposit) gerekli [RESMÎ] [16].
- **Hesap türü:** ödeme profilinde Bireysel ya da İşletme seçilir, sonradan değişmez; bireysel hesap için şirket gerekmez.
- **ABD vergi formu:** gerekip gerekmediği hesaptaki "Vergi bilgileri" sayfasında görünür; ABD'de faaliyeti olmayan için form istenmeyebilir [RESMÎ] [27]. Kişinin durumuna hangi formun düştüğü hesap açılmadan [TAHMİN: doğrulanamadı].

**Eşikler** [RESMÎ] [17]

| Eşik | USD hesabı | TRY hesabı |
|---|---|---|
| Doğrulama (kimlik / adres PIN'i) | 0 $ / 10 $ | 0 $ / 10 $ karşılığı |
| Ödeme yöntemi seçme | 10 $ | ₺20 |
| Ödeme | 100 $ | ₺200 |
| İptal | 10 $ | ₺20 |

> **Hesabı kaybettiren hatalar**
>
> - "It is against AdMob policy to click on your own live ads." Geliştirirken hep test reklamı kullan; çevreye "reklama tıkla" deme. Geçersiz trafikle kapatılan hesaba ödenmemiş bakiye ödenmeyebilir [RESMÎ] [18].
> - Geçiş (interstitial) reklamını açılışta, her dokunuşta ya da art arda gösterme; ayrıntı: [Masaüstü reklam · §4](../Masaustu-Uygulama-Reklam/index.html#aralikli).

- **Yeni uygulama:** Play'de yayınlanıp AdMob'a bağlanınca hazırlık incelemesi başlar; "Reviews typically take 2-3 days", bu sürede reklam sınırlı olabilir [RESMÎ] [29].
- **`app-ads.txt`:** Play mağaza sayfasına geliştirici web sitesi eklenir, dosya o alan adının köküne konur; taranması 24 saate kadar sürer [RESMÎ] [30].
- **AB/İngiltere kullanıcıları:** Google sertifikalı bir onay platformu (CMP; Google'ın ücretsiz UMP SDK'sı da olur) yoksa bu trafiğe yalnız sınırlı reklam gider [RESMÎ] [31]. Türkiye'yi hedefleyen oyunu da AB'den indirenler olacağı için baştan eklemek mantıklı. Onay kuralları ayrıntısı: [Masaüstü reklam · §9](../Masaustu-Uygulama-Reklam/index.html#hukuk).

## § 7 — Gelir senaryoları (temkinli)

> **eCPM**
>
> 1.000 reklam gösterimi başına kazanç. `Gelir ≈ gösterim ÷ 1.000 × eCPM`. AdMob resmî eCPM yayınlamaz; sektör raporlarındaki aralıklar ve Türkiye için bulunamayan veri: [Masaüstü reklam · §11](../Masaustu-Uygulama-Reklam/index.html#gelir). Sıralama her raporda aynı: ödüllü > geçiş > banner; Ekim–Aralık'ta yükselir [3. TARAF].

**Paylaşılan deneyimler** [3. TARAF] [32]

- ~2.700 indirmeden ~20 $; 17.000 indirmeden ~150 $; yüzlerce indirmeden birkaç sent.
- Kabaca **1.000 indirme ≈ 5–10 $** (toplam, aylık değil).
- Bunlar anekdot; tür, ülke ve reklam yerleşimine göre çok değişir.

**Örnek hesap — yalnız aritmetik** [TAHMİN]

| Senaryo | Varsayım | Kabaca |
|---|---|---|
| Kötümser (çoğu ilk oyun) | Toplam birkaç yüz indirme, kitle çoğunlukla düşük eCPM'li ülkelerde | Ödeme eşiğine aylarca ulaşmayabilir |
| Orta | Ayda 5.000 indirme, 1.000 indirme ≈ 5 $ | Ayda ~25 $ |
| İyimser | Ayda 20.000 indirme, 1.000 indirme ≈ 10 $ | Ayda ~200 $ |
| Günlük oyuncu ile | 200 günlük oyuncu × 3 gösterim × eCPM 2 $ | Günde ~1,2 $ (ayda ~36 $) |

- Büyük gelir paylaşımları genelde çok yüksek indirme, uygulama içi satın alma ya da ücretli tanıtımla geliyor [3. TARAF].
- "Reklamları kaldır" satın alması bazı geliştiricilerde reklamdan fazla getirmiş (anekdot) [3. TARAF]. Godot için Google Play Billing eklentisi var [RESMÎ] [33]; satış için Play'de ödeme profili gerekir (§ 2'deki adres notu geçerli).
- Kısa vadede güvenilir gelir kaynağı varsaymak yanlış olur; ilk oyunun asıl kazancı yayın sürecini bir kez baştan sona yaşamaktır [TAHMİN].

## § 8 — Şirket ve vergi, durum durum

### GVK mük. 20/B (Türkiye)

Kanun metni [RESMÎ] [34]: "akıllı telefon veya tablet gibi mobil cihazlar için uygulama geliştirenlerin elektronik uygulama paylaşım ve satış platformları üzerinden elde ettikleri kazançlar" gelir vergisinden istisna. Şartlar (aynı kanun metni, [RESMÎ] [34]):

- Türkiye'de kurulu bir bankada hesap; bu faaliyetin **bütün** hasılatı yalnız bu hesaba gelir.
- Banka aktarılan tutardan aktarım tarihinde **%15** gelir vergisi keser (Cumhurbaşkanı oranı sıfıra indirebilir ya da bir katına kadar artırabilir).
- Kazanç toplamı 103. maddedeki tarifenin **4. dilim tutarını** aşarsa istisna o yıl uygulanmaz. 2026 tarifesinde bu tutar **5.300.000 TL** [RESMÎ] [35].
- Başka faaliyetlerden kazanç olması istisnaya engel değil.
- Ödemenin bir kısmı başka hesaba gelirse istisna o yıl düşer; eksik vergi, vergi ziyaı cezası ve gecikme faiziyle istenir.

Uygulama ve kapsam:

- Tebliğe göre (318 Seri No.lu GVGT) kapsam "ücretli uygulama satış geliri, reklam geliri, uygulama içi satış geliri"ni sayar; mağaza dışında dağıtılan uygulama (APK sitesi, web oyunu) kapsam dışıdır [3. TARAF] (tebliğ alıntısı) [36].
- Uygulamada önce vergi dairesinde mükellefiyet açılır, sonra istisna belgesi alınır, belge bankaya götürülür, hesap bilgisi 1 ay içinde vergi dairesine bildirilir.
- Bu sınırdaki adımların ayrıntısı ve 2026 tutarı: [Şirket Kurma · Vergi 101](../Sirket-Kurma/03-vergi-101.html), [Şirketsiz gelir](../Sirket-Kurma/12-sirketsiz.html).

**Yapıya göre**

| Durum | Play / AdMob | Vergi |
|---|---|---|
| Bireysel, şirket yok, Türkiye'de yaşıyor | Kişisel Play hesabı (kapalı test şartı var); AdMob bireysel ödeme profili | 20/B: istisna belgesi + ayrı hesap + %15; beyanname, defter, fatura yok (sınır aşılmadıkça). 29 yaş altındaysa: 20/B için açılan mükellefiyet genç girişimci istisnasındaki "ilk kez mükellef olma" şartını tüketebilir; iki yolu önce karşılaştır: [Genç girişimci · §2](../Sirket-Kurma/07-genc-girisimci.html#sartlar) |
| Şahıs şirketi sahibi (başka bir iş için) | Kişisel ya da kuruluş hesabı (kuruluşta D-U-N-S; Türkiye'deki şahıs işletmesinin D-U-N-S alışı [TAHMİN: doğrulanamadı]) | Kanuna göre başka faaliyet istisnaya engel değil [RESMÎ] [34]; uygulama gelirinin şahıs işletmesinin defterine mi 20/B hesabına mı gireceği mali müşavirle netleşmeli |
| Uygulama işi şahıs şirketinin konusu | Kuruluş hesabı mümkün | Ticari kazanç, defter, beyanname. 29 yaş altı ve ilk kez mükellefse genç girişimci istisnası: [Genç girişimci](../Sirket-Kurma/07-genc-girisimci.html) |
| Limited / anonim şirket | Kuruluş hesabı, D-U-N-S; adres ve telefon herkese açık | Kurumlar vergisi; **20/B uygulanmaz** (istisna gelir vergisi içindir, şirketler yararlanamaz) |
| Yıllık kazanç 5.300.000 TL'yi aşıyor (2026) | — | O yıl istisna yok [RESMÎ] [34] [35]; bütün kazanç beyan edilir, kesilen %15'ler mahsup edilir; şirketleşme düşünülür |

**Yaşanan yere ve çalışma durumuna göre**

| Durum | Sonuç |
|---|---|
| Yurt dışında yaşıyor | Play ve AdMob kaydı ikamet ülkesine göre yapılır; vergi o ülkenin kurallarına tabidir. 20/B'nin Türkiye'de yerleşik olmayan (dar mükellef) kişiye uygulanıp uygulanmadığı [TAHMİN: doğrulanamadı]. |
| Türkiye'de yaşıyor, yurt dışı şirket düşünüyor | Türkiye'de yaşarken yurt dışı şirket vergiyi kendiliğinden kaldırmaz (iş merkezi, kontrol edilen yabancı kurum): [Masaüstü reklam · §10](../Masaustu-Uygulama-Reklam/index.html#sirket) |
| 4/a çalışan | 20/B genelde mümkün; iş sözleşmesindeki yan iş / rekabet maddelerine bakılmalı [TAHMİN] |
| Kamu görevlisi | Ticari faaliyet yasağı var; 20/B için kurumdan teyit alınmalı: [YouTube Oyun · §9](../YouTube-Oyun/index.html#para-kazanma) |
| İşsizlik ödeneği alıyor | İŞKUR: "gelir getirici bir işte çalıştığı" tespit edilenin ödeneği tekrar başlatılmamak üzere kesilir [RESMÎ] [37]. 20/B için mükellefiyet açmanın etkisi ve güvenli sıra: [Ödenek alırken gelir](../Issizlik/06-odenek-alirken-gelir.html). Oyunu geliştirmek tek başına gelir değildir [TAHMİN]. Ölçüt "gelir getirici bir işte çalışmak" [RESMÎ] [37], paranın hesaba geçmesi değil: reklamlı oyun yayına girip gelir birikmeye başladıktan sonra AdMob ödemesini bekletmek ([RESMÎ] [15]) ödeneği korumaz varsayılmalı [TAHMİN]. İŞKUR'un bu konudaki uygulaması [TAHMİN: doğrulanamadı]. |
| Çalışmıyor, ödenek almıyor, başka sigortası yok | 20/B mümkün. Mükellefiyet açmanın Bağ-Kur (4/b) doğurup doğurmadığı [TAHMİN: doğrulanamadı] (§ 11); doğarsa kazanç olmasa da aylık prim başlar. Mükellefiyetten önce SGK'ya yazılı sor: [Şirketsiz gelir · §5](../Sirket-Kurma/12-sirketsiz.html#vergi-boyutu) |
| Öğrenci | Öğrencilik 20/B'ye engel değil [TAHMİN]. Mükellefiyet 4/b doğurursa ebeveyn üzerinden genel sağlık sigortası (bakmakla yükümlü olunan kişi) sona erebilir; KYK burs/kredi etkisi bulunamadı [TAHMİN: doğrulanamadı], SGK'ya ve KYK'ya yazılı sor: [YouTube Oyun · Bağ-Kur tablosu](../YouTube-Oyun/surec-ve-engeller.html#b3-10-4). 18 yaş altındaysa Play ve AdMob için asgari yaş da [TAHMİN: doğrulanamadı] (§ 11). |
| Emekli (yaşlılık aylığı alıyor) | Aylık kesilmez, tam Bağ-Kur doğmaz; sosyal güvenlik destek primi (SGDP) uygulanıp uygulanmadığı SGK'dan teyit edilmeli: [Şirket Kurma · SGK/Bağ-Kur §2](../Sirket-Kurma/02-sgk-bagkur.html#statuler) |
| Yetim / ölüm aylığı alıyor | 4/b sigortalılığı başlarsa aylık kesilebilir; 20/B mükellefiyetinin 4/b doğurup doğurmadığı [TAHMİN: doğrulanamadı]. Gelir başlamadan SGK'ya yazılı sor: [YouTube Oyun · Bağ-Kur tablosu](../YouTube-Oyun/surec-ve-engeller.html#b3-10-4) |

## § 9 — Yıllık bakım

- **Hedef API:** şart her yıl yükseliyor (2026'da 31 Ağustos). Her oyun yeni motor sürümüyle yeniden derlenip güncelleme olarak yüklenir; güncellenmeyen oyun yeni Android sürümlerindeki yeni kullanıcılara görünmez [RESMÎ] [9].
- **AdMob SDK:** Google ana sürümleri belirli bir süre destekler, sonra "sunset" olur ve reklam gelmeyebilir [RESMÎ] [38]. Eklentiyi 1–2 yılda bir güncellemek gerekir; topluluk eklentisi geç güncellenirse beklemek gerekir.
- Oyun başına yılda kabaca 1–3 iş günü; birden çok oyun toplu güncellenebilir [TAHMİN].
- Godot imza anahtarını (keystore) yedekle.

## § 10 — Karar tablosu

Tablo sayfanın önerilerini özetler; kaynaklı bilgiler ve güven etiketleri § 1–§ 8'dedir.

| Durum | Önerilen yol |
|---|---|
| İlk oyun, amaç süreci öğrenmek | Tek mekanikli 2D, Godot (Compatibility) ya da Kotlin; yalnız reklamla başla |
| Kişisel hesap yeni açılacak | 12 test kullanıcısını oyun bitmeden ayarla; test süresini geliştirmeyle paralel yürüt |
| Ev adresinin görünmesini istemiyor | Yalnız reklamla başla, satıcı profili açmadan önce görünen bilgileri kontrol et |
| Oyun çocuklara yönelik | Aileler politikası, onaylı reklam SDK'sı, kişiselleştirilmiş reklam yok; gelir daha düşük |
| AB kullanıcısı olabilir | UMP / sertifikalı CMP baştan |
| Türkiye'de yaşayan gerçek kişi, gelir başladı | 20/B belgesi + ayrı hesap; sınır yaklaşırsa mali müşavir |
| Şirket (limited) üzerinden | Kuruluş hesabı + D-U-N-S; kurumlar vergisi, 20/B yok |
| İşsizlik ödeneği alıyor | Reklam geliri başlamadan ve mükellefiyet açmadan önce İŞKUR/SGK'ya yazılı sor |
| Öğrenci, emekli, yetim aylığı alan ya da başka sigortası olmayan | Mükellefiyet açmadan önce Bağ-Kur, sağlık sigortası ve aylık etkisini SGK'ya yazılı sor (§ 8) |
| 4/a çalışan ya da kamu görevlisi | Çalışan iş sözleşmesindeki yan iş maddesine bakar; kamu görevlisi kurumundan yazılı teyit alır (§ 8) |
| Yurt dışında yaşıyor | Play ve AdMob kaydı ikamet ülkesine göre; vergi o ülkenin kurallarına tabi, 20/B uygulanması [TAHMİN: doğrulanamadı] (§ 8) |

## § 11 — Doğrulanamayanlar

Resmî kaynakta bulunamayan açık noktalar:

- Yalnız AdMob reklamlı (satıcı profilsiz) uygulamada kişisel hesabın tam adresinin Play'de görünüp görünmediği. [TAHMİN: doğrulanamadı]
- Kapalı test şartının hesap başına mı her yeni uygulama için mi uygulandığı; etkileşim ölçütü; sayının önce 20 olup Aralık 2024'te 12'ye indiği iddiası. [TAHMİN: doğrulanamadı]
- 16 KB şartının yeni uygulamalar için resmî başlangıç tarihi (resmî sayfa [10] yalnız güncellemeler için 1 Şubat 2027 diyor); Godot'un 16 KB desteğinin hangi sürümde geldiği (topluluk kaynakları 4.5 diyor [3. TARAF]). [TAHMİN: doğrulanamadı]
- Türk banka kartlarının kayıt ücretinde sorunsuz geçtiği; Play ve AdMob için asgari yaş. [TAHMİN: doğrulanamadı]
- Türkiye'ye özel AdMob eCPM; TRY mi USD raporlama para biriminin mi avantajlı olduğu; EFT'de banka masrafı. [TAHMİN: doğrulanamadı]
- Türkiye'deki bireye hangi ABD vergi formunun istendiği. [TAHMİN: doğrulanamadı]
- AdMob'u adıyla anan 20/B özelgesi; dar mükellefin 20/B'den yararlanıp yararlanamayacağı; şahıs işletmesi sahibinde uygulama gelirinin hangi rejime gireceği; Türkiye'deki şahıs işletmesinin D-U-N-S alması. [TAHMİN: doğrulanamadı]
- 20/B için mükellefiyet açmanın Bağ-Kur'u kendiliğinden başlatıp başlatmadığı (kütüphanedeki [Ödenek alırken gelir](../Issizlik/06-odenek-alirken-gelir.html) sayfası bu konuda ayrıntılı değerlendirme içeriyor). [TAHMİN: doğrulanamadı]
- Reklam geliri birikirken AdMob ödemesini bekletmenin İŞKUR'un "gelir getirici iş" değerlendirmesine etkisi. [TAHMİN: doğrulanamadı]
- Godot C#'ın Android'de AdMob eklentisiyle sorunsuz çalıştığı; ucuz telefonda Godot 3D performansı. [TAHMİN: doğrulanamadı]
- Süre ve gelir rakamlarının hepsi ölçülmemiş tahmin ya da anekdottur.

## § 12 — Kaynakça (erişim: 5 Kasım 2026)

Numaralar metindeki [n] göndermeleriyle ve [index.html](index.html) § 12 ile aynıdır; her satırın sonunda kaynağın türü yazılıdır.

1. Play Console, geliştirici hesabı kaydı (25 $) — https://support.google.com/googleplay/android-developer/answer/6112435 [RESMÎ]
2. Play Console, hesap türü seçimi (kişisel / kuruluş, D-U-N-S) — https://support.google.com/googleplay/android-developer/answer/13634885 [RESMÎ]
3. Play Console, Play'de görünen geliştirici bilgileri — https://support.google.com/googleplay/android-developer/answer/13628312 [RESMÎ]
4. Play Console, desteklenen ülkeler ve ödeme profili — https://support.google.com/googleplay/android-developer/table/3539140 ; https://support.google.com/googleplay/android-developer/answer/7161426 ; https://support.google.com/googleplay/android-developer/answer/13634081 [RESMÎ]
5. Play Console, yeni kişisel hesaplarda test şartı — https://support.google.com/googleplay/android-developer/answer/14151465 [RESMÎ]
6. Etkileşim nedeniyle ret (ikincil, blog) — https://dev.to/tizoc_araujo_3cd9fb67191f/google-play-closed-testing-rejected-for-insufficient-engagement-what-that-actually-means-in-2026-ion [3. TARAF]
7. Test kullanıcısı takası (ikincil, hizmet satan siteler) — https://www.testerscommunity.com/blog/reddit-vs-testers-community-which-is-better-for-app-testing-in-2026 ; https://extendsclass.com/blog/google-plays-closed-testing-requirement-what-developers-need-to-know-in-2026 [3. TARAF]
8. Play Console, Android App Bundle — https://support.google.com/googleplay/android-developer/answer/9844279 [RESMÎ]
9. Android Developers, hedef API düzeyi — https://developer.android.com/google/play/requirements/target-sdk ; https://support.google.com/googleplay/android-developer/answer/11926878 [RESMÎ]
10. Android Developers, 16 KB sayfa boyutu — https://developer.android.com/guide/practices/page-sizes [RESMÎ]
11. Play Console, uygulama içeriği beyanları — https://support.google.com/googleplay/android-developer/answer/9859455 [RESMÎ]
12. Play Console, veri güvenliği formu — https://support.google.com/googleplay/android-developer/answer/10787469 [RESMÎ]
13. Play Console, Aileler politikası — https://support.google.com/googleplay/android-developer/answer/9893335 [RESMÎ]
14. AdMob, ödeme takvimi — https://support.google.com/admob/answer/2772140 [RESMÎ]
15. AdMob, ödemeyi bekletme — https://support.google.com/admob/answer/3109143 [RESMÎ]
16. AdMob, EFT ile ödeme ve ülke listesi — https://support.google.com/admob/answer/1714398 [RESMÎ]
17. AdMob, ödeme eşikleri — https://support.google.com/admob/answer/2772208 [RESMÎ]
18. AdMob, geçersiz trafik — https://support.google.com/admob/answer/6197403 ; https://support.google.com/admob/answer/9493252 [RESMÎ]
19. Godot indirme sayfası (4.7.2) — https://godotengine.org/download/windows/ [RESMÎ]
20. Godot lisansı — https://godotengine.org/license/ [RESMÎ]
21. Kenney lisansı — https://kenney.nl/support [RESMÎ]
22. Godot, Android'e dışa aktarma — https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_android.html [RESMÎ]; hedef SDK forumu (ikincil) — https://forum.godotengine.org/t/how-to-target-latest-android-sdk/142631 [3. TARAF]
23. Godot, çiziciler — https://docs.godotengine.org/en/stable/tutorials/rendering/renderers.html [RESMÎ]
24. Unity Personal — https://unity.com/products/unity-personal [RESMÎ]
25. AdMob, diğer platformlar — https://developers.google.com/admob/other-platforms [RESMÎ]
26. Poing Studios godot-admob-plugin — https://github.com/poingstudios/godot-admob-plugin [3. TARAF]
27. AdMob, vergi bilgileri — https://support.google.com/admob/answer/4381375 [RESMÎ]
28. Geliştirme süresi (ikincil) — https://oceanviewgames.co.uk/resources/game-development-timeline ; https://meliorgames.com/game-development/how-long-does-it-take-to-create-a-casual-mobile-game/ [3. TARAF]
29. AdMob, uygulama hazırlık incelemesi — https://support.google.com/admob/answer/10564477 [RESMÎ]
30. AdMob, app-ads.txt — https://support.google.com/admob/answer/9363762 [RESMÎ]
31. AdMob, AB onay şartı (UMP) — https://developers.google.com/admob/android/privacy/gdpr [RESMÎ]
32. Geliştirici gelir anlatıları (ikincil, anekdot) — https://www.reddit.com/r/gamedev/comments/l1jejb/is_mobile_development_still_profitable_in_2021 ; https://forums.unrealengine.com/t/my-first-months-ad-revenue-admob/81860 [3. TARAF]
33. Godot Google Play Billing — https://docs.godotengine.org/en/stable/tutorials/platform/android/android_in_app_purchases.html [RESMÎ]
34. 193 sayılı Gelir Vergisi Kanunu, mük. md. 20/B — https://www.mevzuat.gov.tr/mevzuatmetin/1.4.193.pdf [RESMÎ]
35. GİB, 2026 gelir vergisi tarifesi — https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fyardim-kaynaklar%2Fyararli-bilgiler%2Fgelir-vergisi-tarifeleri%2Fgelir-vergisi-tarifesi-2026.pdf [RESMÎ]
36. 318 Seri No.lu GVGT (ikincil alıntı) — https://www.alomaliye.com/2022/01/12/gelir-vergisi-genel-tebligi-seri-no-318-gvk-318 [3. TARAF]
37. İŞKUR, ödeneğin kesilme halleri — https://www.iskur.gov.tr/sikca-sorulan-sorular/issizlik-sigortasi/issizlik-odenegi-hangi-hallerde-kesilmektedir/ [RESMÎ]
38. AdMob Android SDK destek takvimi — https://developers.google.com/admob/android/deprecation [RESMÎ]
