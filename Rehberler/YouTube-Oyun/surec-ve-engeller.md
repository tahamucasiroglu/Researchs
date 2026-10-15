# Başlamadan Önce: YouTube'a Oyun — Süreç ve Engel Raporu

**Konu:** YouTube Playables (öncelikli) ve oyun video kanalı (ikincil) için kayıttan ödemeye, vergiye kadar her adım ve her adımdaki olası engeller.

> **Araştırma tarihi: 15 Ekim 2026.** Şartlar, oranlar, eşikler ve mevzuat sık değişir. Kullanmadan önce kaynak bağlantılarından güncelini kontrol et.
> **Bu belge hukuki veya mali danışmanlık değildir.** Somut durum için mali müşavire, gerekirse avukata danış veya GİB'den özelge al. Google/YouTube metinlerinde **bağlayıcı olan İngilizce resmî metindir.**
> Araştırma sırasında hiçbir forma başvuru yapılmadı, form gönderilmedi, hesap açılmadı. Tüm bulgular yalnızca okumaya dayanır.

## Bu belge nasıl okunur (AI asistan için not)

- Bu dosya saf Markdown'dır; kardeş dosya [arastirma.md](arastirma.md) teknik ayrıntıyı (SDK, motor, oyun fikirleri, telif, diğer portallar) anlatır. Bu belge onu tekrar etmez; **"başlamalı mıyım, nerede takılırım"** sorusuna odaklanır ve oradaki "Bulunamayanlar" listesindeki boşlukları kapatır.
- Okuru tek duruma göre varsayma. Dallar: **bireysel (şirketsiz) / şahıs şirketi / limited**; **kanal yok / küçük kanal / YPP'deki kanal**; ayrıca çalışma durumu (4/a çalışan, kamu görevlisi, işsizlik ödeneği alan, emekli, öğrenci, yetim aylığı alan), yaş (29 altı/üstü), ABD vergisi açısından US person olup olmama. Okurun 18 yaş üstü ve Türkiye'de yerleşik olduğu varsayılır.

| Etiket | Anlamı |
|---|---|
| **[RESMÎ]** | Platformun kendi belgesi; kanun, tebliğ, Resmî Gazete, GİB özelgesi, IRS, banka tarifesi |
| **[3. TARAF]** | Haber, blog, yayıncı firma, forum, uzman yazısı |
| **[TAHMİN]** | Resmî bilgiden yapılmış çıkarım; doğrulanmamış |
| **[ÇELİŞKİLİ]** | Kaynaklar birbirini tutmuyor; resmî olan esas alınır |
| **bulunamadı** | Araştırıldı ama kamuya açık kaynakta yok |

---

## İçindekiler

0. [Önceki araştırmadan kapanan açık noktalar](#0-önceki-araştırmadan-kapanan-açık-noktalar)
1. [Karar özeti: Başla / Bekle / Başlama](#1-karar-özeti-başla--bekle--başlama)
2. [Engel envanteri](#2-engel-envanteri)
3. [Süreç haritası](#3-süreç-haritası)
4. [Sözleşme ve hukuki şartlar](#4-sözleşme-ve-hukuki-şartlar)
5. [Yayıncı / aracı yolu](#5-yayıncı--aracı-yolu)
6. [Plan B: oyun video kanalı ve diğer portallar](#6-plan-b-oyun-video-kanalı-ve-diğer-portallar)
7. [Sıfır maliyetli doğrulama listesi](#7-sıfır-maliyetli-doğrulama-listesi)
8. [Kontrol listeleri](#8-kontrol-listeleri)
9. [Kaynakça](#9-kaynakça)

---

## 0. Önceki araştırmadan kapanan açık noktalar

| Önceki açık nokta | Yeni durum | Etiket |
|---|---|---|
| Formun 2. sayfası, bireysel/şirket şartı, ülke | **Kapandı.** Formun gömülü verisi okundu: 14 öğe, 2 sayfa, dallanma yok. Şirket adı ve ülke sorularında "If you are filling this out as an individual, write "N/A"" yazıyor → **bireysel başvuru açıkça öngörülmüş**, bireyin ülkesi hiç sorulmuyor. | [RESMÎ] |
| Değerlendirme ölçütleri | **Kapandı.** İnceleme "a creator's overall history on YouTube and past Playables performance" bilgisini de tartıyor. | [RESMÎ] |
| Küçük resim | **Kısmen.** Resmî gövde metninde yalnızca "Image thumbnails in several different aspect ratios", başlık, açıklama ve tür alanları var. 1:1, 5:7, 16:9 oranları, 16:9 önizleme videosu, başlık ≤ 50 / kısa açıklama ≤ 150 karakter ve 1–2 tür değerleri **gövdede yok**; yalnızca sayfanın otomatik özetinden geldi. Bu özet başka sayfalarda (requirements_stability) gövdeyle çelişiyor. Kesin değerler Developer Portal içinde görülür. Piksel ölçüleri **bulunamadı**. | [ÇELİŞKİLİ / TAHMİN: otomatik özet, gövdede yok] |
| IARC / yaş derecelendirmesi | Şu an istenmiyor; 2023'ten beri "Content ratings may be required in the future" notu duruyor. | [RESMÎ] |
| Playables için 20/B | **Kapandı (olumsuz).** Yurt dışı web sitesine oyun yükleyip pay alan kişi için özelge: 20/B yok, **ticari kazanç**. | [RESMÎ özelge] |
| Türkiye'ye AdSense ödeme yöntemi | **Kapandı.** EFT (TL) ve banka havalesi açık; çek ve Hyperwallet kapalı. | [RESMÎ] |
| ABD–Türkiye anlaşması telif oranı | **Kapandı.** Md. 12: telif ≤ %10. | [RESMÎ] |
| Münhasırlık | **Kısmen.** YouTube'un kamuya açık metinlerinde münhasırlık yok (API Şartları "non-exclusive"); kabulden sonra imzalanacak lisans metni **bulunamadı**. | [RESMÎ + bulunamadı] |
| Resmî onay/inceleme süresi | **Hâlâ açık.** İlgi formu dönüş süresi için doğrulanabilir kaynak yok; 3. taraf süreler yalnız yayıncı üzerinden sertifikasyon/yayın için (bkz. A8). | bulunamadı / [3. TARAF] |
| Gelir payı, ödeme kanalı, vergi profili (Playables) | **Hâlâ açık.** Resmî sayfa yalnızca "pilot" diyor. | [RESMÎ: belgede yok] |

**Düzeltme:** `arastirma.md`'deki "ücret dışı tarifede 4. dilim farklı" ifadesi yanlış; 2026'da iki tarifede de 4. dilim üst sınırı **5.300.000 TL** (332 S.N. GVK Tebliği, RG 31.12.2025/33124). [RESMÎ] Ayrıca `arastirma.md`'deki "Playables geliri AdSense üzerinden" ifadesi, reklam altyapısı ile ödeme kanalının karıştırılmasından kaynaklanıyor olabilir → **[ÇELİŞKİLİ]** (bkz. 3.9).

---

## 1. Karar özeti: Başla / Bekle / Başlama

### 1.1 Tek cümlelik sonuç

Türkiye'de yaşayan, 18 yaş üstü, kamu görevlisi olmayan, online/çok oyunculu oyun şartı koymayan ve çocuk/kumar temalı oyun hedeflemeyen biri için sonuç **amaca göre ikiye ayrılır** [RESMÎ parçalar + TAHMİN sentez]:

| Amaç | Sonuç |
|---|---|
| Öğrenme / portföy (gelir şart değil) | **BAŞLA** — mutlak bir engel bulunamadı. |
| Doğrudan yoldan (kendi kanalında Playables) gelir | **Bugün için DURDURUR**: gelir paylaşımı seçili kişilerle pilot, başvuru yolu ve ölçüt yok; reklam yuvaları da yalnızca uygun bölge/platformdaki kullanıcıların bir alt kümesine gösteriliyor, Türkiye'nin dahil olup olmadığı **bulunamadı**; ödemenin YPP/AdSense for YouTube gerektirip gerektirmediği de belirsiz (G9). |
| Yayıncı yolundan gelir | **ZORLAŞTIRIR** (pay kesintisi, yabancı hukuk, KYC; Bölüm 5). |

Her durumda geliştirici erişimi davetlidir ve gelir gelirse Türkiye'de büyük olasılıkla **şahıs işletmesi** gerekir. "Garanti gelir yoksa başlamam" diyen için doğru karar **BEKLE**.

### 1.2 En kritik engeller

| # | Engel | Ciddiyet | Kime | Sonuç |
|---|---|---|---|---|
| 1 | Geliştirici erişimi davetli; dönüş garantisi yok, resmî süre yok | **ZORLAŞTIRIR** (pratikte en büyük) | Herkes | Form doldurulur, sessizlik = "henüz uygun görülmedi". Alternatif: yayıncı yolu (Bölüm 5). |
| 2 | Gelir paylaşımı pilot ("select number of Playable creators"); başvuru yolu/ölçüt yok; reklam yalnız bölgesel alt kümeye | **DURDURUR** (doğrudan yoldan gelir hedefi için, bugün) / ZORLAŞTIRIR (yayıncı yolu) | Doğrudan yayınlayan herkes | Kabul edilsen bile pilotta değilsen gelir 0 olabilir. |
| 3 | Playables geliri Türkiye'de 20/B değil, ticari kazanç | **ZORLAŞTIRIR** | Gelir elde edecek herkes | Şirketsizsen şahıs işletmesi + Bağ-Kur (4/a değilsen) + mali müşavir. |
| 4 | Kamu görevlisi (657 md. 28 ticari faaliyet yasağı) | **DURDURUR** (şahıs işletmesi / 20/B) · **ZORLAŞTIRIR** (yönetici olmayan limited ortaklığı) | 657'ye tabi memur | Tacir/esnaf sayılmak yasak → şahıs işletmesi açılamaz. Md. 28 AŞ/limitedde yönetici/temsilci olmayan ortaklığı yasaklamıyor (DPB görüşü) → müdürü başka biri olan limitedde pay sahibi olmak hukuken açık ama maliyetli yol; oyunu bizzat geliştirmenin "kazanç getirici faaliyet" sayılıp sayılmayacağı belirsiz → kurumdan **yazılı** teyit. |
| 4b | Yetim/ölüm aylığı alan | **DURDURUR veya ZORLAŞTIRIR** (aylık tutarına göre) | Hak sahibi çocuk | 4/b sigortalılık başlarsa aylık kesilir; öğrenci istisnası yalnız 4/a için (V7). |
| 5 | Dış ağ çağrısı şu an yasak (online/çok oyunculu yok) | **DURDURUR** (yalnız online oyun isteyene, bugün için) | Online/çok oyunculu, sohbetli oyun isteyen | Bugün Playables'ta yapılamaz; uzak veri erişimi seçili oyunlarla pilotta, genel kullanıma açık değil [RESMÎ, certification_faq]. Tek kişilik oyun ya da başka platform. |
| 6 | 13+ genel kitle; çocuklara yönelik ve kumar/jeton teması sorunlu | **ZORLAŞTIRIR / DURDURUR** (konsepte göre) | Çocuk oyunu, okey/poker/slot benzeri | Konsept değiştirilmezse ret. |
| 7 | Oyun önceden **bitmiş ve herkese açık bir sitede** olmalı (Drive/Dropbox olmaz) | **KÜÇÜK** | Herkes | Başvurudan önce itch.io vb. sitede yayın gerekir; fikirle başvuru olmaz. |
| 8 | Sözleşme metni ("licensing", "additional agreements") kamuya açık değil; ihtilaf yurt dışında (AdSense: Kaliforniya, YouTube ToS/API EMEA: İngiltere) | **ZORLAŞTIRIR** (belirsizlik) | Kabul edilen herkes | İmzadan önce sorular sorulur, gerekirse avukata okutulur. |

Diğer önemli ama küçük olanlar: İngilizce desteği zorunlu, sözleşme/yazışma dili İngilizce (H7; İngilizce okumayan için ZORLAŞTIRIR), YPP'nin gelir için fiilî şart olup olmadığı belirsiz (G9), boyut sınırları (Unity için zorlaştırır), PIN postası, AdSense hesap türünün değiştirilememesi, ABD stopajı (W-8), Swift masrafı.

### 1.3 Karar ağacı

```
S1. Kamu görevlisi misin (657)?
 ├─ Evet → Şahıs işletmesi / 20/B ile gelir: BAŞLAMA. Tek açık yol: yönetici olmayan
 │   ortak olarak (müdürü başkası) limited — maliyetli, kurumdan yazılı teyit şart → BEKLE.
 │   Hobi/portföy (gelirsiz) ise kurumdan yazılı teyit al → BEKLE.
 └─ Hayır → S1b
S1b. Yetim/ölüm aylığı alıyor musun?
 ├─ Evet → Şahıs işletmesi / 20/B (4/b) aylığı keser. Aylık önemliyse gelirli yolda BAŞLAMA;
 │   gelirsiz öğrenme/portföy mümkün. SGK'dan yazılı teyit al.
 └─ Hayır → S2
S2. Oyun mutlaka online / çok oyunculu / sohbetli mi olmalı?
 ├─ Evet → Playables için BAŞLAMA (dış çağrı bugün yasak; uzak veri erişimi yalnız seçili oyunlarla pilotta). Kendi web siten + itch.io vb. düşün.
 └─ Hayır → S3
S3. Oyun çocuklara yönelik mi, kumar/jeton/yoğun şiddet içeriyor mu?
 ├─ Evet → Konsepti değiştir; değiştirmeyeceksen BAŞLAMA.
 └─ Hayır → S4
S4. Amacın ne?
 ├─ "Kısa vadede düzenli gelir şart" → BEKLE. Pilotun genişlemesini resmî monetizasyon sayfasından izle;
 │   tek hızlı seçenek yayıncı yolu (Bölüm 5). İlk 6–12 ay gelir 0 varsay.
 └─ "Öğrenme + portföy + olası gelir" → S5
S5. Motor
 ├─ Unity'de ısrar → BEKLE: önce küçük prototiple bellek/boyut testini geç.
 └─ Phaser / saf JS / Godot GDScript → S6
S6. Kanal
 ├─ Kanal yok → BAŞLA (geliştirirken marka kanalını aç, temiz geçmiş biriktir).
 ├─ Küçük, temiz kanal → BAŞLA.
 ├─ YPP'de temiz kanal → BAŞLA (en güçlü konum).
 └─ İhlal/ihtar geçmişi olan kanal → BEKLE (geçmiş inceleniyor) ya da yayıncı yolu.
S7. Gelir başlarsa
 ├─ Şirketsiz → Playables geliri ticari kazanç → şahıs işletmesi; kanal video geliri 20/B ile ayrı yürüyebilir.
 ├─ Şahıs şirketi → ticari kazanç; KDV ve 89/13 uygunluğunu mali müşavire sor.
 └─ Limited → kurumlar vergisi; hesapları (AdSense, kanal) şirket adına aç.
```

### 1.4 Okur durumuna göre hızlı sonuç

| Durum | Playables (doğrudan) | Yayıncı yolu | Oyun video kanalı |
|---|---|---|---|
| Bireysel, kanal yok | Başvurabilir; kabulde kanal gerekir; gelir gelirse şahıs işletmesi | Mümkün; ödemede KYC ve ülke kararı yayıncıda | Mümkün; YPP eşiği uzun yol |
| Bireysel, küçük kanal | Aynı; temiz geçmiş artı | Aynı | Mevcut kanal kullanılır |
| Bireysel, YPP'de | En güçlü konum. YPP üyeliği yayın için şart değil [RESMÎ: belgelerde yok]; gelir için şart olup olmadığı **bulunamadı** — ödeme AdSense for YouTube üzerindense fiilen YPP gerekebilir [TAHMİN] (G9) | Aynı | Zaten gelir var; 20/B hesabına dikkat |
| Şahıs şirketi | Şirket adı + "Turkey" yazılır; ticari kazanç zaten beyan ediliyor | "Sole trader" kabul ediliyor [3. TARAF] | Gelir ticari kazanç; Nintendo bireysel izni şirket kanalını kapsamaz |
| Limited | Aynı form; şirket adına hesaplar; 20/B yok | Tüzel kişi KYC | Kurumlar vergisi; W-8BEN-E |
| 4/a çalışan | Mümkün; iş sözleşmesindeki yan iş/fikrî mülkiyet maddesini kontrol et | Aynı | Aynı |
| Kamu görevlisi | Şahıs işletmesiyle gelir: engel; yönetici olmayan limited ortaklığı açık ama maliyetli, kurumdan yazılı teyit | Aynı | 20/B için kurumdan teyit |
| İşsizlik ödeneği alan | Mükellefiyet açılınca ödenek kesilir | Aynı | Aynı |
| Emekli (yaşlılık aylığı) | Mümkün; 4/b yok, SGDP durumu teyit edilmeli | Aynı | Aynı |
| Yetim/ölüm aylığı alan | Gelirsiz: mümkün. Şahıs işletmesi / 20/B açılırsa 4/b başlar → aylık kesilir (öğrenci istisnası yalnız 4/a) | Aynı | Aynı |
| Öğrenci | Mümkün; mükellefiyet açılırsa Bağ-Kur doğar (4/a değilse), ebeveyn üzerinden GSS biter; KYK burs/kredi/yurt etkisi **bulunamadı** → GSB/KYK'ya yazılı sor | Aynı | Aynı |

---

## 2. Engel envanteri

Ciddiyet: **DURDURUR** = o durumdaysan başlamanın anlamı yok · **ZORLAŞTIRIR** = aşılabilir ama zaman/para/şans ister · **KÜÇÜK** = planla çözülür.

### 2.1 Erişim ve başvuru

| Kod | Engel | Ciddiyet | Kime | Kanıt / kaynak | Aşma yolu |
|---|---|---|---|---|---|
| A1 | Erişim "early access", davetli; her başvuruya dönülmüyor | ZORLAŞTIRIR | Herkes | "Developer access for Playables is in an early access stage" — https://developers.google.com/youtube/gaming/playables [RESMÎ]; Portal "by invitation only and may require additional agreements" — https://developers.google.com/youtube/gaming/playables/developer_portal [RESMÎ]; form: "we may not be able to respond to every submission" [RESMÎ] | Oyunu bitir, herkese açık yayınla, formu doldur; beklerken yayıncı yolu |
| A2 | Kanal geçmişi ve önceki Playables performansı incelemede tartılıyor | ZORLAŞTIRIR | Kanalı yok / ihtarlı kanal | https://developers.google.com/youtube/gaming/playables/certification/requirements (2026-06-16) [RESMÎ] | Kanalı erken aç, ihlalsiz tut; devlog videoları geçmiş oluşturur [TAHMİN] |
| A3 | Şirket şartı | KÜÇÜK (yok) | — | Form bireyde "N/A" istiyor [RESMÎ] | — |
| A4 | Geliştirici için ülke kısıtı | KÜÇÜK (bulunamadı) | — | Formda bireyin ülkesi sorulmuyor; Türkiye oyuncu ülkeleri listesinde — https://support.google.com/youtube/answer/14328604 [RESMÎ] | — |
| A5 | Oyun bitmiş ve **herkese açık barındırılan** linkte olmalı; Drive/Dropbox olmaz | KÜÇÜK | Herkes | Form soru 8 [RESMÎ] | itch.io / GitHub Pages / kendi site [TAHMİN] |
| A6 | Hak beyanı: tüm haklara sahip olmak ve lisans verme yetkisi ("you own all rights to the game and its content"; T&S 2.2 "authorized, original, or properly licensed") | ZORLAŞTIRIR (lisansı belirsiz varlık kullanan için; YZ varlığı yoğun kullanan için) | Herkes | Form giriş metni [RESMÎ]; https://developers.google.com/youtube/gaming/playables/certification/requirements_trustsafety (2026-08-26; YZ'ye özel madde yok) [RESMÎ] | Yalnızca özgün veya lisansı açık varlık; lisans kayıtlarını sakla. **YZ alt notu:** YZ ile üretilen grafik/ses/müzik kullanıyorsan aracın ticari kullanım lisansını ve çıktı sahipliği şartını kaydet; FSEK insan yaratıcılığı arar, sahiplik belirsizse "tüm haklara sahibim" beyanı risk taşır [TAHMİN] |
| A7 | Hiç yayınlanmış oyunu / MAU'su olmamak | KÜÇÜK (seçenek var) / ağırlığı bilinmiyor | Yeni başlayan | "No published games" seçeneği [RESMÎ]; ağırlığı belgede yok [TAHMİN: dezavantaj olabilir] | Önce itch.io vb.'de oyuncu toplamak |
| A8 | Resmî onay süresi yok; ilgi formuna dönüş süresi için güvenilir 3. taraf rakamı da **bulunamadı** (daha önce yazılan "3–6 ay / 5–6 ay" iddiasının kaynağı doğrulanamadı; kaynakçadaki Mediacube yazılarında yok) | ZORLAŞTIRIR | Herkes | Resmî süre yok [RESMÎ: belgede yok]. Mediacube'un verdiği süreler yalnız **yayıncı üzerinden build → yayın** içindir: "several hours to several business days" inceleme, "2 to 7 business days" testten yayına, en hızlı 3 iş günü / ~1 hafta — https://mediacube.io/en/blog/youtube-playables (23.07.2026), https://mediacube.io/en/blog/youtube-playables-updates [3. TARAF] | Dönüş hiç gelmeyebilir; planı aylar üzerinden kur [TAHMİN] |

### 2.2 Sözleşme ve hukuk

| Kod | Engel | Ciddiyet | Kime | Kanıt | Aşma yolu |
|---|---|---|---|---|---|
| H1 | Playables lisans / "additional agreements" metni kamuya açık değil (süre, münhasırlık, pay, ödeme bilinmiyor) | ZORLAŞTIRIR | Kabul edilen | developer_portal [RESMÎ]; metin **bulunamadı** | İmzadan önce Bölüm 4.6'daki soruları yazılı sor |
| H2 | İhtilaf yeri yurt dışı: AdSense (Türkiye) → Google Ireland, Kaliforniya hukuku, Santa Clara münhasır; YouTube ToS (TR) → İngiliz hukuku; API Şartları EMEA → İngiltere | ZORLAŞTIRIR | Herkes | https://www.gstatic.com/adsense/tc/2022-v1/google_irl/tr.html , https://www.youtube.com/static?template=terms&gl=TR&hl=tr , https://developers.google.com/youtube/terms/api-services-terms-of-service-emea [RESMÎ] | Bireysel için dava fiilen pahalı → riski küçük tut |
| H3 | Şartların tek taraflı değişmesi; erişimin "at any time" kesilebilmesi | KÜÇÜK–ZORLAŞTIRIR | Herkes | API Şartları 2.3, 24.2 [RESMÎ] | Tek platforma bağımlı kalma |
| H4 | Publicity lisansı: şirket/kuruluş adının ve ürün adının **geri alınamaz** biçimde kullanılması (API Şartları 13, 24.6). Md. 13 lisansı "your company or organization name" için veriyor; bireyin kişisel adının bu kapsama girip girmediği belirsiz [TAHMİN] | KÜÇÜK (gizlilik açısından önemli) | Bireysel | https://developers.google.com/youtube/terms/api-services-terms-of-service [RESMÎ] | Stüdyo/marka adı kullan [TAHMİN] |
| H5 | Poki "Web Exclusive" anlaşması Playables'ı kapsıyor | DURDURUR (o anlaşmayı imzalayan için) | Poki münhasır geliştiricisi | https://developers.poki.com/guide/revenue-deal-types [RESMÎ] | Münhasır olmayan anlaşma seç |
| H6 | Yaptırım: Türkiye listede değil | KÜÇÜK | SDN listesindeki kişi hariç | https://support.google.com/adsense/answer/6167308 [RESMÎ] | Yaptırımlı ülke vatandaşıysan Google'a sor (kural **bulunamadı**) |
| H7 | Sözleşme ve yazışma dili İngilizce: lisans/ek anlaşmalar, API Şartları (EMEA md. 25.13: çeviri çelişirse İngilizce esas), AdSense ödeme şartları, yayıncı sözleşmeleri (Mediacube, Playgama), Partner Manager yazışması, portal, destek ve ret bildirimleri | KÜÇÜK (İngilizce okuyan için) / ZORLAŞTIRIR (okumayan için) | Herkes | https://developers.google.com/youtube/terms/api-services-terms-of-service-emea (md. 25.13) [RESMÎ] | İmzadan önce yeminli çeviri veya avukat; anlamadığın metni imzalama |

### 2.3 Teknik ve içerik (ayrıntı: [arastirma.md](arastirma.md) Bölüm 5)

| Kod | Engel | Ciddiyet | Kime | Kanıt | Aşma yolu |
|---|---|---|---|---|---|
| T1 | Dış çağrı şu an yasak (analitik dahil); ancak "we are piloting remote data access with select titles" → uzak veri erişimi seçili oyunlarla **pilotta**, genel kullanıma açık değil, başvuru yolu yalnızca contact sayfası | DURDURUR (gerçek zamanlı online/çok oyunculu isteyene, bugün için) / ZORLAŞTIRIR (yalnız uzak veri isteyene: pilot) | Online/çok oyunculu | https://developers.google.com/youtube/gaming/playables/support/certification_faq [RESMÎ] | Tek kişilik oyun; pilotun genişlemesini izle |
| T2 | 13+ genel kitle; "made for kids" yasak. Playables T&S'de kumar/loot box maddesi **yok**; kumar temalı oyunda ret riski T&S 1.1 (Topluluk Kuralları) ve 1.2 (13+) üzerinden dolaylı. **Video** tarafında social casino içeriği 17.11.2025'ten beri yaş sınırlı (bu Playables kuralı değil, video politikası). Türkiye: para/jeton ödüllü şans oyunu benzetimi 7258 s.K. (yasa dışı bahis/kumar tanıtımı) açısından risk taşıyabilir | ZORLAŞTIRIR | Çocuk / kumar temalı | requirements_trustsafety (2026-08-26) [RESMÎ]; video kuralı: https://www.mondaq.com/unitedstates/gaming/1700392/youtube-tightens-age-restrictions-on-violent-and-gambling-related-gaming-content , https://www.pocketgamer.biz/youtube-policy-update-new-rules-for-gambling-violent-gaming-videos-and-streaming/ [3. TARAF, resmî YouTube yardım sayfası bulunamadı]; 7258 [TAHMİN] | Bahis/jeton görünümü olmayan konsept; Türkiye için avukata/mali müşavire danış |
| T3 | İngilizce zorunlu; dil yalnızca `getLanguage` ile | KÜÇÜK | Yalnız Türkçe oyun | requirements_i18n_l10n [RESMÎ] | TR + EN |
| T4 | Boyut: ilk paket < 30 MiB (hedef 15), tek dosya < 30 MiB, toplam < 250 MiB, ≤ 8.000 dosya | KÜÇÜK (JS) / ZORLAŞTIRIR (Unity) | Unity, büyük varlıklı oyun | requirements_stability, certification_faq [RESMÎ]; Playgama wiki 200 MB diyor [3. TARAF, ÇELİŞKİLİ] | Phaser/saf JS/GDScript |
| T5 | Unity bellek, Godot 4 C# web export yok | ZORLAŞTIRIR | O motoru seçen | certification_faq [RESMÎ] | Motor seçimini baştan doğru yap |
| T6 | Tek MUST ihlali = yayın yok; **ses sorunları içinde** en sık görüleni: oyunun sesi başlatmak için kullanıcı etkileşimi beklemesi (genel "en sık ret nedeni" resmî belgede yok) | ZORLAŞTIRIR | Herkes | requirements, certification_faq [RESMÎ] | Test Suite (başvurudan önce bile açık) |
| T7 | Başka Playable'ın kopyası / "substantially identical" yasak (25.08.2026) | ZORLAŞTIRIR (klon isteyene) | Klon yapan | requirements_trustsafety 2.2 [RESMÎ] | Özgün oyun |
| T8 | Yayıncı tarafında tür tercihi: trivia, kelime, masa oyunu, RPG, strateji, ritim önerilmiyor; "strong AI-generated look" ret riski | ZORLAŞTIRIR (yayıncı yolunda) | Kelime/tavla/okey fikri olan | https://wiki.playgama.com/platforms/youtube-playables-requirements-for-games [3. TARAF]; YouTube'un resmî metninde tür yasağı yok | Hiper-casual tasarım, görsel cila |
| T9 | Meta veri/küçük resimlerde logo/marka yasak; yanıltıcı meta veri yasak | KÜÇÜK | Herkes | requirements_design (2026-09-25) [RESMÎ] | Logosuz görseller |

### 2.4 Gelir ve ödeme

| Kod | Engel | Ciddiyet | Kime | Kanıt | Aşma yolu |
|---|---|---|---|---|---|
| G1 | Gelir paylaşımı pilot; yüzde/eşik/ölçüt/başvuru yolu yok; reklam yuvaları yalnız "a subset of users in Playables-eligible regions and platforms" için | DURDURUR (doğrudan yoldan gelir hedefi, bugün) | Doğrudan yol | https://developers.google.com/youtube/gaming/playables/reference/monetization (2026-06-01) [RESMÎ] | Yayıncı yolu ya da gelir beklentisini kanal YPP'sine dayandırmak |
| G2 | Playables ödemesinin hangi kanaldan (AdSense for YouTube? ayrı sözleşme?) geldiği bilinmiyor | ZORLAŞTIRIR (belirsizlik) | Doğrudan yol | **bulunamadı**; Mediacube'un "AdSense" ifadesi reklam altyapısını anlatıyor [3. TARAF, ÇELİŞKİLİ] | Kabul gelirse Partner Manager'a sor |
| G3 | AdSense yaşı 18 | KÜÇÜK (okur 18+) | 18 altı | https://support.google.com/adsense/answer/2533300 [RESMÎ] | — |
| G4 | AdSense hesap türü (bireysel/kuruluş) sonradan değiştirilemez; alacaklı adı başına tek hesap | ZORLAŞTIRIR (yanlış seçerse) | Sonradan şirket kuracak | https://support.google.com/adsense/answer/10163 [RESMÎ] | Türü baştan düşün; geçiş planlı yapılır |
| G5 | Kimlik doğrulama 45 gün; PIN 4 ay; 3 yanlış PIN = para kazanma kapanır | KÜÇÜK | Posta alamayan | https://support.google.com/adsense/answer/157667 , https://support.google.com/youtube/answer/14727844 [RESMÎ] | Posta alınabilen doğru adres |
| G6 | W-8 verilmezse bireysel hesapta dünya kazancının %24'üne kadar kesinti | KÜÇÜK | Formu vermeyen | https://support.google.com/youtube/answer/10391362 [RESMÎ] | W-8BEN + anlaşma talebi |
| G7 | Swift (havale) masrafı: örnek bankada %0,6, asgari 1.176,19 TL, azami 7.335,72 TL, BSMV hariç | ZORLAŞTIRIR (küçük tutarda) | Havale seçen | https://www.yapikredi.com.tr/bireysel-bankacilik/hesaplama-araclari/bireysel-urun-ve-hizmet-ucretleri (kalem 08.01.2026) [RESMÎ banka] | EFT (TL) seç |
| G8 | PayPal / Hyperwallet / çek / Western Union yok | KÜÇÜK | — | https://support.google.com/adsense/answer/1714397 [RESMÎ] | EFT veya havale |
| G9 | YPP üyeliği Playables **yayını** için şart değil, ama **geliri** için şart olup olmadığı bulunamadı; ödeme AdSense for YouTube üzerindense ve bu hesap yalnızca YPP başvurusunda Studio'dan açılıyorsa YPP fiilen gerekebilir | ZORLAŞTIRIR, gelir hedefinde DURDURUR olabilir | Kanalı yok / küçük kanallı | https://support.google.com/youtube/answer/72851 [RESMÎ]; monetization sayfası YPP'den söz etmiyor [RESMÎ]; uygulama [TAHMİN] | Kabul gelirse Partner Manager'a yazılı sor |

### 2.5 Türkiye vergisi ve statü

| Kod | Engel | Ciddiyet | Kime | Kanıt | Aşma yolu |
|---|---|---|---|---|---|
| V1 | Playables/web oyunu geliri 20/B değil, ticari kazanç → şahıs işletmesi | ZORLAŞTIRIR | Şirketsiz | Özelge 38824 (06.01.2026) https://gib.gov.tr/mevzuat/kanun/433/ozelge/38824 ; 38960 (03.03.2026) [RESMÎ] | Gelir başlayınca mükellefiyet; önce mali müşavir |
| V2 | Bağ-Kur (4/b) doğar; 2026 aylık ~11.808 TL (5 puan indirimle ~10.157 TL; indirim yalnız borçsuz ve primini zamanında ödeyene), kazanç sıfır olsa da; borç birikirse GSS sağlık hizmeti kısıtlanabilir (md. 67) | ZORLAŞTIRIR | 4/a/4/c olmayan | 5510 md. 4/1-b-1, md. 67 https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5510.pdf [RESMÎ]; tutarlar [3. TARAF, SGK duyurusuyla teyit edilmeli] — 3.10.4 | 4/a çalışan için doğmaz (5510 md. 53) |
| V3 | KDV %20 riski: oyun Türkiye'de de oynanıyorsa hizmet ihracatı istisnası zor; belgelenirse oransal istisna | ZORLAŞTIRIR | Ticari kazanç yolu | 21044, 38808, 39022 (25.11.2025) özelgeleri [RESMÎ] | Ülke kırılımlı gelir raporu (Playables'ta var mı **bulunamadı**) |
| V4 | Kamu görevlisi ticari faaliyet yasağı: tacir/esnaf sayılma, kollektif ortaklık, komandite ortaklık yasak; AŞ/limitedde yönetici/temsilci olmayan ortaklık yasak değil | DURDURUR (şahıs işletmesi / 20/B) · ZORLAŞTIRIR (yönetici olmayan limited ortaklığı) | 657 memuru | 657 md. 28 ve Devlet Personel Başkanlığı görüşü: https://pgm.adalet.gov.tr/Resimler/SayfaDokuman/29112019145641Ticaret%20ve%20kazan%C3%A7%20getirici%20faaliyetlerde%20bulunma%20yasa%C4%9F%C4%B1%20hususunda%20g%C3%B6r%C3%BC%C5%9F.pdf [RESMÎ, Adalet Bakanlığı belgesi içinde alıntı] | Gelirsiz yayın + kurum teyidi; ya da müdürü başkası olan limitedde pay sahipliği. Oyunu bizzat geliştirmenin "kazanç getirici faaliyet" sayılıp sayılmayacağını kurumun disiplin/hukuk birimine sor [TAHMİN] |
| V7 | Yetim/ölüm aylığı alan hak sahibi çocuk: 4/b sigortalılık (şahıs işletmesi, 20/B mükellefiyeti) başlarsa aylık kesilir; 7103 s.K. ile gelen öğrenci istisnası (18/20/25 yaş) yalnız 4/a hizmet akdini kapsar | DURDURUR veya ZORLAŞTIRIR (aylık tutarına göre) | Yetim aylığı alan | 5510 md. 34 [RESMÎ, bu turda tam metin okunamadı] https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5510.pdf ; https://hukukcularevi.com/olum-ayligi-dul-yetim-hak-sahipleri-paylar-kesilme-5510-m32-37/ , https://www.bloomberght.com/ht-yazarlar/ali-tezel/1659463-universite-ogrencisi-yetim-calismaktan-hala-korkuyor [3. TARAF] | Gelirsiz öğrenme/portföy; mükellefiyet öncesi SGK'dan yazılı teyit |
| V8 | Öğrenci: mükellefiyet açılınca Bağ-Kur doğar (4/a değilse), 25 yaş altı yükseköğrenim öğrencisinin ebeveyn üzerinden bakmakla yükümlü olunan kişi (GSS) statüsü biter; KYK burs/kredi/yurt etkisi resmî kaynakta **bulunamadı** (forumlarda sorun anlatılıyor) | ZORLAŞTIRIR | Öğrenci | 5510 md. 3/10 [TAHMİN, teyit edilmeli]; https://forum.donanimhaber.com/sahis-sirketi-sahibi-olarak-kyk-da-kalmak--156062989 [3. TARAF] | GSB/KYK'ya yazılı sor; yetim aylığı alıyorsan V7 |
| V5 | Özelge süresi örneklerde 12–46 ay | ZORLAŞTIRIR | "Başlamadan önce özelge alayım" diyen | Özelge tarihleri [RESMÎ]; süre hesabı [TAHMİN] | Özelge yerine mali müşavir görüşüyle başla |
| V6 | Kanal geliri (20/B) ile Playables geliri (ticari) aynı AdSense ödemesinde karışabilir | ZORLAŞTIRIR | İkisini birden yapan | 318 S.N. Tebliğ md. 4, 5/3, 6/4 [RESMÎ]; uygulama [TAHMİN] | Ödemeleri ayırma yolunu mali müşavirle planla |

### 2.6 Türkiye'ye özgü ortam

| Kod | Engel | Ciddiyet | Kanıt | Not |
|---|---|---|---|---|
| D1 | 7578 s.K. ile 5651'e oyun hükümleri (yürürlük **01.11.2026**): derecelendirilmemiş oyun en yüksek yaş kategorisinde sunulur; yükümlülükler **platforma**, geliştiriciye doğrudan yükümlülük/ceza yok (md. 2'ye "oyun geliştirici" tanımı eklendi). Yetki 5651'deki "Kurum"a veriliyor; 5651 md. 2'ye göre Kurum = Bilgi Teknolojileri ve İletişim Kurumu (BTK) [RESMÎ, teyit önerilir]. YouTube Türkiye'de derecelendirme isteyebilir veya Playables görünürlüğünü kısabilir (Playables belgesindeki "Content ratings may be required in the future" notuyla birlikte) [TAHMİN] | KÜÇÜK (gelir küresel) / ZORLAŞTIRIR (Türkiye kitlesini hedefleyen için) | https://www.resmigazete.gov.tr/eskiler/2026/05/20260501-1.htm (md. 21, 23) [RESMÎ]; https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5651.pdf [RESMÎ]; yönetmelik **bulunamadı** | Türkiye'de görünürlük düşebilir; IARC benzeri derecelendirmeye hazırlıklı ol [TAHMİN] |
| D2 | 15 yaş altı: sosyal ağ sağlayıcı 15 yaşını doldurmamış çocuklara hizmet sunamaz; yaş doğrulama ve ebeveyn kontrolü yükümlülüğü sağlayıcıda (yürürlük: yayımdan 6 ay sonra, 01.11.2026) | KÜÇÜK | 7578 s.K. md. 22, 27, RG 01.05.2026/33240 — https://www.resmigazete.gov.tr/eskiler/2026/05/20260501-1.htm [RESMÎ] | Kitle daralması |
| D3 | YouTube erişim kesintisi riski | KÜÇÜK | 2026'ya ait engel kararı bulunamadı [3. TARAF] | — |
| D4 | KVKK | KÜÇÜK | Oyun kişisel veri toplayamıyor (Privacy kuralları) [RESMÎ] | Geliştiricinin yükü düşük [TAHMİN] |
| D5 | RTÜK internet yayın lisansı | KÜÇÜK | Gerçek kişilere uygulandığına dair kayıt bulunamadı [3. TARAF] | — |

### 2.7 Kesin bilinmeyenler — nasıl öğrenilir

| Bilinmeyen | Nasıl öğrenilir |
|---|---|
| Lisans sözleşmesinin süresi, münhasırlığı, pay yüzdesi | Kabul e-postasına yanıtla yazılı sor (Bölüm 4.6 soruları); sözleşme taslağını imzadan önce iste |
| Playables gelir ödeme kanalı (AdSense for YouTube mu?), eşik, ABD vergi sınıfı | Partner Manager'a sor; kabul öncesi resmî Discord topluluğu https://discord.gg/eEFBtMswKT (yanıt resmî bağlayıcı sayılmaz) |
| Pilot seçim ölçütü | Aynı; monetizasyon sayfasının "Last updated" tarihini izle |
| Resmî inceleme/onay süresi | Partner Manager; geliştirici topluluğu tanıklıkları |
| Küçük resim piksel ölçüleri, tür listesi | Portal içinde görünür (PORTAL İÇİ) |
| Online kimlik doğrulamanın Türkiye'de açık olup olmadığı | AdSense hesabı açıldığında ekranda görünür; AdSense Yardım Topluluğu |
| ₺200 eşiğin güncelliği | AdSense → Ödemeler → Ödeme eşiği ekranı |
| Swift ücreti | Kendi bankanın "Gelen Döviz Havale" tarife kalemi |
| Playables gelirinin vergi rejimi, KDV, 89/13 | Mali müşavir; kesinlik için Dijital Vergi Dairesi → Özelge Talep Formu (VUK 413, ücretsiz, süre uzun) |
| 20/B Bağ-Kur | SGK il müdürlüğü / mali müşavir (SGK genelgesi **bulunamadı**) |
| Kamu görevlisi için 20/B | Kurumun personel/hukuk birimi, yazılı |
| Yayıncının Türkiye'deki bireye ödeme yapıp yapmadığı, KYC belgeleri | Yayıncı destek e-postası, imzadan önce yazılı |

---

## 3. Süreç haritası

Genel zaman çizelgesi [TAHMİN, 3. taraf sürelerle]:

| Faz | Süre (tahmini) | Çıktı |
|---|---|---|
| 3.1 Hesaplar | 1 gün (+ gelişmiş özellik için ~24 saat) | Google hesabı, 2SV, marka kanalı |
| 3.2 Oyun geliştirme | 4–12 hafta (oyuna göre) | Test Suite'ten geçen ZIP + herkese açık link |
| 3.3 Başvuru | 30 dk doldurma; yanıt resmî süresiz, güvenilir 3. taraf süresi de bulunamadı; yanıt hiç gelmeyebilir | Gönderilmiş form |
| 3.4 Sözleşme / onboarding | bilinmiyor | Onboard edilmiş kanal, portal erişimi |
| 3.5–3.6 Portal, sertifikasyon | YouTube incelemesi 3. taraf: 3–7 gün; ret olursa döngü | Sertifikalı sürüm |
| 3.7 Yayın | kademeli | Yayındaki Playable |
| 3.8–3.9 Gelir/ödeme | pilot/yayıncıya bağlı; ödeme ayda bir | Banka hesabına para |
| 3.10 Vergi | gelir başlamadan önce planlanır | Mükellefiyet / beyan |

### 3.1 Hazırlık: hesaplar

| Adım | Ne yapılır | Nerede | Ne gerekir | Süre | Olası engel | Çıktı |
|---|---|---|---|---|---|---|
| 1 | Google hesabı | https://accounts.google.com | Telefon/e-posta | dakikalar | Yok (13+; Türkiye için ayrı yaş yok) — https://support.google.com/accounts/answer/1350409 [RESMÎ] | Hesap |
| 2 | İki adımlı doğrulama (passkey önerilir) | Google hesabı → Güvenlik | Telefon/anahtar | dakikalar | Playables belgelerinde şart yok; **YPP için 2SV şart** — https://support.google.com/youtube/answer/72851 [RESMÎ]. Genel güvenlik sayfası yalnızca öneriyor (https://support.google.com/youtube/answer/9701986) → [ÇELİŞKİLİ, YPP sayfası esas] | 2SV açık |
| 3 | Kanal türü seçimi | YouTube → Kanal oluştur | — | dakikalar | **Kişisel kanal** Google hesabındaki adı gösterir; Playables kanalın "Playables" sekmesinde görünür ve oyun içinde kanala abone ol bağlantısı çıkar [RESMÎ, FAQ]. Adını göstermek istemiyorsan **Brand Account** (marka/stüdyo adı) [RESMÎ: https://support.google.com/youtube/answer/1646861 , /4642409; öneri TAHMİN] | Kanal |
| 4 | Telefon doğrulaması (orta seviye) | Studio → Ayarlar → Kanal → Özellik uygunluğu | Telefon | dakikalar | Yapılmazsa 15 dk+ video, özel küçük resim yok — https://support.google.com/youtube/answer/9890437 [RESMÎ] | Orta seviye |
| 5 | Gelişmiş özellik | Aynı ekran | Kanal geçmişi **veya** kimlik/video doğrulaması | ~24 saat | "ID and video verification isn't available to all creators"; Türkiye durumu **bulunamadı** [RESMÎ] | YPP başvurusu, tıklanabilir link, Content ID itirazı açılır |
| 6 | Roller | Studio → Ayarlar → İzinler | — | — | **Portal için Manager rolü** gerekir [RESMÎ, developer_portal]. Editor için çelişki **aynı sayfanın içinde**: "Channel manager permissions are required for portal access" denirken ek kullanıcılar için "access level which must be either Editor or Manager" deniyor [ÇELİŞKİLİ] → Manager ver. **Kişisel kanalda** (ve "channel permissions" ile) sahiplik devredilemez. **Brand Account kanalında** birincil sahiplik devredilebilir: devralacak kişi en az 7 gündür owner olmalı; Google Hesabı → Brand Accounts → Manage permissions → Transfer (gerekirse önce channel permissions'tan çıkılır) — https://support.google.com/youtube/answer/4628007 [RESMÎ]. Bu yol, önce bireysel açıp sonra limited'e geçecek okur için kullanılabilir. Brand Account'lar izin vermeden önce "channel permissions"a taşınmalı. Davet 30 gün geçerli — https://support.google.com/youtube/answer/9481328 [RESMÎ] | Ekip erişimi |

**Durum → Sonuç (hesap):**

| Durum | Ne yapılır |
|---|---|
| Kanal yok | Marka kanalı aç, telefon doğrula, 2SV aç; geliştirirken devlog yükleyerek temiz geçmiş biriktir [TAHMİN] |
| Küçük kanal | Mevcut kanalı kullan; aktif ihtar/topluluk ihlali varsa önce çöz |
| YPP'deki kanal | 2SV ve AdSense zaten var; Playables oyunun bu kanalın sekmesinde görüneceğini hesaba kat |
| Limited | Kanal şirket adına Brand Account; ortaklara Manager rolü |
| Şahıs şirketi | Kişisel veya marka kanal; AdSense türü kararı (Bölüm 3.9) belirleyici |

### 3.2 Oyunu geliştirme ön şartları (özet; ayrıntı [arastirma.md](arastirma.md) Bölüm 5–7)

- HTML5 (JS/Canvas/WebGL); kökte `index.html`; Playables SDK script'i oyun kodundan **önce**; `firstFrameReady` → `gameReady` sırası; yalnızca göreli yollar; dosya adlarında yalnız harf/rakam/`_ - .`. [RESMÎ]
- Ses: oyun sesi kullanıcı etkileşimi beklememeli; bu, **ses sorunları içinde** en sık görülenidir ("The most common audio issue…"). Genel "en sık ret nedeni" resmî belgede yok. Pause/resume'da ses kesilmeli. [RESMÎ, certification_faq]
- Kayıt verisi < 3 MiB; eski sürüm kayıtları yeni sürümde hatasız açılmalı → kayıt formatına baştan sürüm alanı koy. [RESMÎ + TAHMİN]
- Dış çağrı, harici reklam/analitik, IAP, giriş ekranı, QR kod, kod gizleme, `navigator.language` yasak. [RESMÎ]
- Duyarlı tasarım (MUST): oyun **tüm en-boy oranlarında** oynanabilir olmalı ve viewport değişince kendiliğinden uyum sağlamalı (örnek oranlar 9:32, 9:21, 9:16, 3:4, 1:1, 4:3, 16:9, 21:9, 32:9). Cihaz yönü/duruşu kilitlenemez (MUST NOT). Pencere yeniden boyutlanınca oyun durumu korunur (MUST). Doldurulmayan alan pillarbox/letterbox boşluğuyla kalır. Dokunma + fare; klavye ile yön/metin girişi SHOULD. [RESMÎ, requirements_design 2026-09-25] Yalnızca üç orana göre test etmek ret sebebi olabilir.
- **Test Suite başvurudan önce kullanılabilir:** https://developers.google.com/youtube/gaming/playables/test_suite — 17.06.2024'ten beri localhost ve HTTPS'siz URL kabul ediyor. [RESMÎ, revisionhistory] Kullanım: oyunu yerelde sun → URL'yi gir → oyna, skor kazan → başarısız MUST testlerini düzelt. [3. TARAF, Needle Engine dokümanı] Test listesinin tam açıklaması resmî belgede **yok**.
- **Başvuru için ek ön şart:** oyunu herkese açık bir siteye koy (itch.io ücretsiz HTML5 en kolay yol [TAHMİN]); bireysel bir geliştiricinin bu şekilde başvurduğu anlatımı: https://note.com/akihiga0316/n/n1ea0d8683cb3 [3. TARAF]. Gizlilik için yayın sayfasında takma ad/stüdyo adı kullan.
- Hazır olsun: kısa **gizlilik politikası** sayfası ("kişisel veri toplanmaz"). YouTube Developer Policies API Client'tan istiyor (https://developers.google.com/youtube/terms/developer-policies); Playables'ın API Client sayılıp sayılmadığı yazmıyor → [ÇELİŞKİLİ]; maliyeti sıfıra yakın.

### 3.3 Başvuru: ilgi formunun tüm soruları

**Form:** https://docs.google.com/forms/d/e/1FAIpQLSdvdQ0lgIq2369aemj1O6w8R8FwGn9O5ARRGODDDUbVINCRJQ/viewform — "Public Playables Interest Form", 14 öğe, 2 sayfa, dallanma yok (bireysel ve şirket aynı soruları görür). [RESMÎ, gömülü veri okundu, gönderilmedi]

**Giriş metninde kabul ettiğin şeyler** [RESMÎ]:
- Form Google geliştirici sitesinin şart ve politikalarına tabidir.
- "We do not accept unsolicited game ideas or concepts" — yalnızca bitmiş/oynanabilir oyun.
- "you own all rights to the game and its content, and that you have the authority to license it" — hak **devri** değil **lisans** yetkisi beyanı [TAHMİN yorum].
- Her başvuruya dönülmeyebilir; ilgilenirlerse "licensing opportunities" için iletişime geçilir.
- Yanıtı silmek için yanıtı düzenleyip alanlara "-" yazılır.

**Sayfa 1**

| # | Soru | Tip | Zorunlu | Nasıl doldurulur |
|---|---|---|---|---|
| 0 | Email (+ "Record my email address with my response") | E-posta | Evet | Yanıtla birlikte kaydedilir. Gizlilik için kişisel değil stüdyo e-postası kullan [TAHMİN] |
| 1 | "I understand the bullet points listed above." | Onay | Evet | Maddeleri okuyup işaretle |
| 2 | How did you hear about YouTube Playables? | Tek seçim (YouTube; YouTube or Google employee; Advertisement; AI; Another developer or publisher; Another website; Blog; Employer or coworker; Game development tool/documentation; Other media; Recommended by a friend; Search engine; Social media; N/A; Other) | Evet | Doğru olanı seç |

**Sayfa 2 — "Submit your game or company for Playables consideration."**

| # | Soru (aynen) | Tip | Zorunlu | Nasıl doldurulur [TAHMİN öneri] |
|---|---|---|---|---|
| 3 | What is the legal name of your company? If you are filling this out as an individual, write "N/A". | Kısa | Evet | Bireysel: `N/A`. Şahıs şirketi: ticari unvan. Limited: tam unvan |
| 4 | In which country is your company headquartered? If you are filling this out as an individual, write "N/A". | Kısa | Evet | Bireysel: `N/A`. Şirket: `Turkey` / `Türkiye` |
| 5 | What is your name? | Kısa | Evet | Gerçek ad (sözleşme tarafı olacağın için) |
| 6 | What is your role? | Kısa | Evet | Örn. "Solo developer", "Founder / developer" |
| 7 | Provide the best contact email. | Kısa | Evet | Düzenli baktığın, kanala bağlı olabilecek adres |
| 8 | Game(s) you wish for us to consider. Include links if you have them. (Must be public links on hosted websites and no Google Drive/Dropbox etc) | Uzun | Evet | Oynanabilir herkese açık link(ler) (itch.io vb.), varsa oynanış videosu linki |
| 9 | How many games do you intend to publish? Please write your answer as a digit… (This is not binding…) | Kısa | Hayır | Rakam; bağlayıcı değil |
| 10 | Describe your game(s). | Kısa | Evet | Tür, temel mekanik, oturum süresi, dokunmatik+fare, SDK entegre/Test Suite geçti mi, EN desteği |
| 11 | What is the combined Monthly Active Users for your game(s)? | Tek seçim: No published games; 1+ (1–100); 100+ (101–1000); 1K+; 10K+; 100K+; 500K+; 1M+; 5M+; 10M+; 50M+; 100M+; 500M+; 1B+; 5B+ | Evet | Dürüst seç; itch.io istatistiğinden |
| 12 | Where do you publish games today? | Çoklu: Console; Mobile; PC; Super apps; TV; Web (Facebook, Itch.io, etc.); Within other apps; No published games | Evet | Örn. "Web" |
| 13 | For which reasons are you interested in publishing a game on YouTube? | Çoklu: Build community; Enjoyment; Exposure; Learning; Marketing; Monetization; Storytelling; Testing | Hayır | İlgili olanlar |

**Formda olmayanlar:** motor, tür, HTML5 uyumu, gelir beklentisi, YouTube kanalı **sorulmuyor**. [RESMÎ] (playables.in'in "tür/motor/deneyim/HTTPS link soruluyor" iddiası gerçek formla uyuşmuyor → [ÇELİŞKİLİ], güvenilmez — https://playables.in/youtube-playables-interest-form/)

**Gönderim sonrası:** "our team is constantly reviewing potential new games and if we find yours to be a fit, we will reach out." → otomatik onay/ret beklenmemeli; sessizlik "henüz uygun görülmedi". Onay metninde ayrıca "For game suggestions, no response will be emailed" yazıyor. [RESMÎ] E-posta 1. sayfada, iletişim e-postası 2. sayfada (#7) ayrıca soruluyor. Google girişinin zorunlu olup olmadığı **bulunamadı** (sayfa girişsiz okunabildi).

### 3.4 Başvuru sonrası: lisans görüşmesi, sözleşme, Partner Manager, portal erişimi

| Adım | Bilinen | Bilinmeyen |
|---|---|---|
| İletişim | "to discuss potential licensing opportunities" [RESMÎ, form] | Kim, ne zaman, hangi kanaldan **bulunamadı** |
| Sözleşme | "may require additional agreements" [RESMÎ, developer_portal] | Metin, süre, münhasırlık, pay, vergi formu **bulunamadı** |
| Partner Manager | "Speak to your Partner Manager for details" [RESMÎ] | Atanma koşulu **bulunamadı**; iletişim sayfası (https://developers.google.com/youtube/gaming/playables/support/contact) yalnız form, FAQ ve Issue Tracker gösteriyor |
| Kanal onboarding | Portal için "Playables'a onboard edilmiş kanal + channel manager yetkisi" [RESMÎ] → **kabulden sonra kanal zorunlu** | Onboarding akışı **bulunamadı** |
| Destek | Resmî Discord: https://discord.gg/eEFBtMswKT ; hata bildirimi: https://issuetracker.google.com/issues/new?component=186600&template=874803 [RESMÎ] — bu Issue Tracker bağlantısı Playables'a özel değil; tüm YouTube geliştirici sayfalarının alt bilgisindeki genel YouTube API hata bildirimi | Playables Ops ekibine ulaşma yolu **bulunamadı**. Portal belgesi ve certification FAQ Ops/sürüm sorunları için contact sayfasını gösteriyor; contact sayfasında ise yalnızca ilgi formu var → resmî destek yolu döngüsel [ÇELİŞKİLİ] |

Tanıklıklar: Türkiye'den doğrudan kabul edilmiş bireysel geliştirici örneği **bulunamadı**; Reddit erişilemedi. Japon bireysel geliştirici başvurudan sonra hâlâ bekliyordu [3. TARAF]. Bir solo geliştirici kanalı 3 oyun yayınladığını anlatıyor, yöntemi (doğrudan/yayıncı) belirsiz — https://www.youtube.com/watch?v=0ZaimnthfvE [3. TARAF]. Öne çıkarılan yayıncılar ağırlıkla büyük mobil şirketler (SayGames, Voodoo, CrazyLabs vb.) → doğrudan kabul büyük stüdyolara yoğunlaşıyor olabilir [TAHMİN].

### 3.5 Developer Portal

Portal: https://www.youtube.com/playables_portal · Belge: https://developers.google.com/youtube/gaming/playables/developer_portal (2025-10-16) [RESMÎ]

> Portal **Private Preview** aşamasında ("features are subject to change"); aşağıdaki adımlar her an değişebilir. [RESMÎ]

| # | Adım | Belgede | Belgede yok / portal içi |
|---|---|---|---|
| 0 | Giriş | Güncel Chrome/Edge/Firefox; onboard edilmiş kanal; Manager yetkisi | Ödeme/vergi profili ekranı |
| 1 | Ekip | Studio → Ayarlar → İzinler'den Editor/Manager davet | — |
| 2 | Oyun oluştur | "Add a new game" | Kanal başına oyun sınırı **bulunamadı** |
| 3 | Taslak | Meta veri (title, genre, description, publisher, developer), ZIP, küçük resimler, interstitial/rewarded reklam ayarı; taslak kaydedilebilir | Alanların tam listesi PORTAL İÇİ |
| 4 | Sürüm | "Create release" → "Release Creation in Progress" (birkaç dakika) | Sürüm numaralama, geri alma **bulunamadı** |
| 5 | Doğrula & test | "Verify and test" → **YouTube Dev Link** + **Test Suite Link**; masaüstü web, mobil web, Android, iOS'ta test; Dev Link'i telefona e-posta/notla gönderip aç | Dev Link geçerlilik süresi **bulunamadı**; Dev/staging linkleri **dışarıyla paylaşılamaz** (T&S 3) |
| 6 | Gönder | "Submit for Certification" | İnceleme süresi |
| 7 | İnceleme sırasında | Yeni sürüm gönderilemez; gerekirse **Playables Ops**'tan staging sürümünü reddetmesi istenir | Ops'a ulaşma yolu |

**ZIP kuralları** [RESMÎ]: kökte `index.html`; ≤ 8.000 dosya; tek dosya < 30 MiB; ilk paket (gameReady'ye kadar sıkıştırılmış inen bayt) < 30 MiB, hedef 15 MiB; toplam < 250 MiB (aşan oyun lazy-load ile destekle görüşebilir, ölçüt **yok**).

### 3.6 Meta veriler, sertifikasyon, ret ve tekrar

**Meta veri** [RESMÎ, requirements_design 2026-09-25]:
- Gövde metninde istenen: "Image thumbnails in several different aspect ratios", oyun başlığı, açıklama, tür. [RESMÎ]
- Sayısal değerler (küçük resim 1:1, 5:7, 16:9; 16:9 önizleme videosu; başlık ≤ 50, kısa açıklama ≤ 150 karakter; 1–2 tür) yalnızca Google sayfasının otomatik özetinde geçiyor, gövdede yok. Aynı tür özet requirements_stability sayfasında gövdeyle çelişiyor (özet "15 MB", gövde "MUST < 30 MiB"). Bu yüzden bu sayıları kesin kural sayma. **Kesin değerler Developer Portal içinde görülür.** [ÇELİŞKİLİ / TAHMİN]
- Küçük resim, başlık ve açıklamada **logo/marka yasak**; yanıltıcı vaat yasak.
- Piksel ölçüleri **bulunamadı**. Güvenli hazırlık [TAHMİN, resmî değil]: 1080×1080, 1080×1512, 1920×1080; kısa 16:9 oynanış videosu. Portal başka değer isterse ona uy.
- Tür listesi ve meta veri dil seçenekleri PORTAL İÇİ; başlık/açıklamayı İngilizce hazırla [TAHMİN].
- Erişilebilirlik (AGI) etiketleri önerilir; yanlış etiket "Spam and Misleading Metadata" ihlali — requirements_accessibility [RESMÎ].
- "Publisher/developer" alanı mağaza sayfasında görünür → gizlilik için stüdyo adı [TAHMİN].

**Sertifikasyon** [RESMÎ, requirements]:
- Teknik kısıtlar, Trust & Safety, gizlilik + **kanal sahibinin YouTube geçmişi ve önceki Playables performansı** değerlendirilir.
- Tek bir MUST karşılanmazsa yayın yok; SHOULD görünürlüğü artırabilir; EXPECT ileride zorunlu olacak.
- Ret bildiriminin biçimi, itiraz yolu, süre **bulunamadı**.
- Akış [RESMÎ parçalar + TAHMİN]: ret → düzelt → yeni "Create release" → Verify and test → yeniden "Submit for Certification".
- İnceleme süresi: resmî yok; Playgama 3–7 gün (uçtan uca 2–4 hafta), Mediacube en hızlı 3 iş günü / ~1 hafta, başka yerde "4–5 gün" [3. TARAF, ÇELİŞKİLİ].
- Sık ret nedenleri (3. taraf derleme, ilk elden değil — https://playables.in/youtube-playables-game-rejection-reasons/): çökme/donan yükleme, büyük ilk paket, SDK geç yükleme / erken `gameReady`, mutlak yol, Android'de sıfır yükseklikli viewport, ses/pause kuralları, lisanssız müzik, kopya oyun, harici reklam/analitik, çocuk içeriği, yanlış erişilebilirlik etiketi, `navigator.language`, dış link, obfuscation, backend.

### 3.7 Yayın, kademeli rollout, güncellemeler, analitik

- **Yayın:** YouTube aşamalı doğrular; sınırlı erişim, staged rollout veya otomatik ayarlama olabilir. "Once your Playable is certified and published, you should expect to support full game usage." — https://developers.google.com/youtube/gaming/playables/support/faq (2026-03-09) [RESMÎ]. Rollout'u geliştiricinin ayarlayabildiği **bulunamadı** [TAHMİN: YouTube kontrol ediyor].
- **Görünür yerler:** Ana Sayfa, Arama, Playables sayfası, kanalın Playables sekmesi. [RESMÎ]
- **Güncelleme [ÇELİŞKİLİ]:** Portal belgesine göre yeni ZIP → Create release → Verify and test → sertifikasyon. Certification FAQ ise içerik/varlık yenilemesi için "reach out using the contact information on the support contact page to submit a refreshed game bundle" diyor; contact sayfasında yalnızca ilgi formu var. Hangi yolun geçerli olduğu portal içinde netleşir. İncelemede ikinci sürüm gönderilemez. Eski kayıtlar yeni sürümde açılmalı (Integration 4.4). [RESMÎ + TAHMİN] — https://developers.google.com/youtube/gaming/playables/support/certification_faq , https://developers.google.com/youtube/gaming/playables/support/contact
- **Yayından kaldırma / geri alma:** süreç **bulunamadı**.
- **Oyunun kopyalanırsa:** Playables için telif bildirimi yalnızca e-posta, posta veya faks talimatlarıyla yapılır; "Submitting using YouTube Studio is not available at this time". [RESMÎ, https://developers.google.com/youtube/gaming/playables/support/faq 2026-03-09]
- **Analitik:** resmî belgede **yok**; kendi analitiğini kurmak yasak ("internal analytics are not exempt"). [RESMÎ] Mediacube'a göre [3. TARAF, hangi paneli anlattığı net değil → ÇELİŞKİLİ]: Temmuz 2026'ya kadar yalnız toplam oynanma; sonra yaş, ülke, cinsiyet kırılımı; ülke filtresi yalnız US, AU, CA, UK, IN, MY (Türkiye yok); gelir 48 saat gecikmeli, oyun bazında döküm her ayın 15'inde — https://mediacube.io/en/blog/youtube-playables-updates
- **Kanal geçmişine etkisi:** "past Playables performance" sonraki incelemelerde tartılıyor → zayıf bir ilk oyun sonraki oyunları etkileyebilir [RESMÎ ölçüt + TAHMİN etki].

### 3.8 Gelir modelleri

| Model | Durum | Etiket |
|---|---|---|
| Pre-roll | Yükleme sırasında otomatik | [RESMÎ] |
| Interstitial / rewarded | Yalnız YouTube SDK fonksiyonları; portalda aç/kapa (varsayılan açık); şimdilik son kullanıcı deneyimini değiştirmiyor | [RESMÎ, monetization + developer_portal] |
| Platform dışı reklam / IAP | **Yasak** | [RESMÎ] |
| IAP ileride | 2027'de test hedefi (bir YouTube çalışanının yorumu) | [3. TARAF] https://mobilegamer.biz/youtube-has-quietly-rolled-out-playables-across-europe/ |
| Gelir paylaşımı | "piloting revenue sharing with a select number of Playable creators… aim to align with the broader YouTube monetization programs over time"; pilota başvuru yolu veya ölçüt verilmiyor | [RESMÎ] |
| Reklamların kime gösterildiği | "A subset of users in Playables-eligible regions and platforms see these ad slots" → kabul edilip pilota girilse bile reklam yalnızca uygun bölge/platformdaki kullanıcıların bir **alt kümesine** gösterilir; Türkiye'nin bu alt kümede olup olmadığı **bulunamadı** | [RESMÎ] https://developers.google.com/youtube/gaming/playables/reference/monetization (2026-06-01) |
| Yayıncı yolu | Yayıncılar pilotta ödeme aldıklarını beyan ediyor; Playgama "enrolled in YouTube's monetization pilot program" | [3. TARAF, tanıtım amaçlı] |
| Kanal YPP geliri | Playables'ı tanıtan videolar üzerinden dolaylı | [TAHMİN] |

**Gerçekçi beklenti** [TAHMİN]: doğrudan yolda pilot daveti olmadan gelir 0; ilk 6–12 ay gelir planlama.

### 3.9 Ödeme: AdSense, PIN, vergi formu, eşik, banka

> **Önemli belirsizlik:** Playables doğrudan pilot gelirinin hangi ödeme profiline geldiği **bulunamadı**. Portal erişimi kanala bağlı olduğu için **AdSense for YouTube** olasılığı yüksek [TAHMİN]. Aşağıdaki adımlar YouTube kanal geliri için kesin [RESMÎ], Playables için olası.

| Adım | Ne / kural | Kaynak |
|---|---|---|
| Hesap açma | AdSense for YouTube **yalnızca Studio içinden** açılır (YPP başvurusunda). Yaş 18+. | https://support.google.com/youtube/answer/72851 , https://support.google.com/adsense/answer/2533300 [RESMÎ] |
| Hesap türü | **Individual / Organization**; ödeme hesap sahibinin / şirketin adına; **sonradan değiştirilemez** (kapat-yeniden aç). Alacaklı adı başına tek hesap; birden çok kanal tek hesaba bağlanabilir. | https://support.google.com/adsense/answer/10163 , https://support.google.com/youtube/answer/72866 [RESMÎ] |
| Banka ülkesi | Banka, ödeme adresiyle **aynı ülkede** olmalı. | https://support.google.com/adsense/answer/7164701 [RESMÎ] |
| Kimlik doğrulama | Eşik 0 $; pasaport/ehliyet/kimlik kartı; **45 gün**; ödeme profilindeki ad kimlikteki adla aynı; kimlik dışında belge yüklemek askıya alma sebebi olabilir; video selfie reddedilirse 2–3 iş günü manuel inceleme. Türkiye'de online doğrulama **bulunamadı**. | https://support.google.com/adsense/answer/11608017 , /16354192 [RESMÎ] |
| Adres (PIN) | Eşik 10 $; 6 haneli PIN **normal posta**, 3–4 hafta; **4 ay** içinde girilmeli; **3 yanlış giriş = para kazanma kapanır**; 4. yedek PIN'den sonra sorun giderici. | https://support.google.com/adsense/answer/157667 , https://support.google.com/youtube/answer/14727844 [RESMÎ] |
| Vergi formu | W-8BEN (gerçek kişi) / W-8BEN-E (tüzel kişi); YPP'deysen konumdan bağımsız zorunlu; anlaşma talebi için yabancı TIN. Vergi bilgisi ve anlaşma talebi **10 Aralık'a kadar** verilmezse kesinti uygulanabilir (bireyde dünya kazancının %24'üne kadar). Form **her yıl yenilenmez**: geçerlilik imzalanan yıldan sonraki 3. takvim yılı sonuna kadar sürer; süre dolunca ya da bilgi değişince yenilenir. [RESMÎ] **Türkiye TIN'i:** gerçek kişide (bireysel / şahıs işletmesi) 01.01.2007'den beri T.C. kimlik numarası vergi kimlik numarası olarak kullanılır (11 hane, VKN İç Genelgesi Seri No 2006/1) → W-8BEN "Foreign TIN" alanına TCKN; limited şirkette şirketin 10 haneli VKN'si → W-8BEN-E. YouTube/Google'ın Türkiye'ye özel açıklaması **bulunamadı**. [RESMÎ Türk mevzuatı + TAHMİN uygulama] | https://support.google.com/youtube/answer/10391362 , https://support.google.com/youtube/answer/14727140 [RESMÎ]; https://www.lexpera.com.tr/mevzuat/genelgeler/vergi-kimlik-numarasi-ic-genelgesi-seri-no-2006-1-seri-no-2006-1 [RESMÎ metin, 3. taraf sitede] |
| Ödeme yöntemi | **EFT (TL, test yatırması gerekir, 2–5 iş günü)** veya **havale (USD/EUR)**; çek, Hyperwallet, PayPal, Western Union yok. | https://support.google.com/adsense/answer/1714397 , /1714398 , /1208358 [RESMÎ] |
| Para birimi | Ödeme para birimi **sonradan değiştirilemez**; TL hesapta havalenin hangi para biriminde geldiği **bulunamadı**. | https://support.google.com/adsense/answer/3372975 [RESMÎ] |
| Eşik | Ödeme eşiği **100 USD / ₺200 / 70 EUR** (resmî tablo). ₺200 bugünkü kurla 100 USD'nin çok altında → [ÇELİŞKİLİ / TAHMİN: tablo güncel olmayabilir]; hesapta kontrol et. Tablodaki ayrı sütunlar (TRY satırı): Tax info N/A · Verification 0 $ / 10 $ karşılığı · Payment method ₺20 · **Payment ₺200** · **Cancellation ₺20**. | https://support.google.com/adsense/answer/1709871?hl=en [RESMÎ] |
| Takvim | Ayın 3'ü kazanç kesinleşir; **20'si** ödeme bilgisi/hold son günü (EFT 20'sinden sonra tanımlanırsa o ay garanti yok); **21–26'sı** gönderim; EFT ≤ 7, havale ≤ 15 iş günü. | https://support.google.com/adsense/answer/7164703 [RESMÎ] |
| Banka | Havale için SWIFT BIC + IBAN, banka kaydındaki adla **birebir**; ad uyuşmazlığında ödeme başarısız, yeniden gönderim 2–3 hafta [arama özeti]. Örnek bankada gelen döviz havalesi %0,6, asgari 1.176,19 TL, azami 7.335,72 TL, BSMV hariç (Yapı Kredi, kalem tarihi 08.01.2026; sayfanın genel güncellemesi 09.10.2026); isme gelen EFT ücreti listelenmemiş. Muhabir banka kesintisi olabilir. | Yapı Kredi tarifesi [RESMÎ banka]; https://www.yapikredi.com.tr/bireysel-bankacilik/odemeler-ve-hizmetler/swift-transfer [3. TARAF özet] |
| Döviz bozdurma | %35 zorunlu satış mal ihracatı (İBKB/DAB) için; bireysel AdSense geliri için zorunluluk **bulunamadı**; şirketin hizmet ihracatında banka DAB isteyebilir → teyit. | https://www.alomaliye.com/2026/05/07/ihracat-bedellerinin-doviz-alim-belgesine-dab-baglanma-orani-yuzde-35-olarak-devam-ediyor/ , https://www.rsm.global/turkey/tr/node/75 [3. TARAF] |

**EFT mi havale mi** [TAHMİN]: küçük ve düzensiz gelirde **EFT (TL)** — Swift asgari ücreti küçük tutarı eritir; kur farkı görünmez maliyet. Dolar tutmak isteyen ve tutarı büyük olan için havale + USD hesap.

**ABD stopaj senaryoları:**

| Senaryo | Kesinti | Etiket |
|---|---|---|
| Bireysel, W-8BEN + Türkiye–ABD anlaşması md. 12 (telif) | ABD izleyici gelirinin **%10'u**; diğer ülkeler %0. IRS Tablo 1, Türkiye (TU) satırı: ekipman kirası telifi %5; know-how, patent, film/TV ve diğer telif hakları (kod 12) %10; md. 12(2). YouTube YPP gelirini "Other Copyright Royalties" sayıyor → %10 | [RESMÎ] https://www.irs.gov/pub/irs-trty/turkey.pdf , https://www.irs.gov/pub/irs-lbi/tax-treaty-table-1.pdf (satır: "30 18(2) 5 10 10 10 10 12(2)"), https://support.google.com/youtube/answer/10391362 |
| W-8BEN var, anlaşma talebi / TIN yok | ABD gelirinin %30'u | [RESMÎ] |
| Bireysel, vergi bilgisi hiç yok | **Dünya kazancının %24'üne kadar** | [RESMÎ] |
| Limited, W-8BEN-E + anlaşma | %10; md. 22 (Limitation on Benefits) koşulu | [TAHMİN] |
| Kuruluş, bilgi yok | ABD gelirinin %30'u | [RESMÎ] |
| Playables geliri | Gelir sınıfı (royalty mi services mı) **bulunamadı** | — |
| ABD vatandaşı / green card sahibi (US person; çifte vatandaş dahil) | **W-9** verilir; bu tablodaki anlaşma oranları ve W-8 senaryoları uygulanmaz; ABD'de dünya geliri beyanı ayrıca doğar | [RESMÎ: W-9/W-8 ayrımı https://support.google.com/youtube/answer/10391362 ; uygulama TAHMİN] |

**Durum → Sonuç (hesap türü):**

| Durum | AdSense türü | Vergi formu |
|---|---|---|
| Bireysel | Individual | W-8BEN |
| Şahıs şirketi | Individual veya Organization [TAHMİN; şahıs işletmesi ayrı tüzel kişi değil] | Genelde W-8BEN [TAHMİN] |
| Limited | Organization, şirket banka hesabı | W-8BEN-E |
| Önce bireysel, sonra şirket | Tür değişmez → kapat/yeniden aç. Kapanışta bakiye **iptal eşiğinin** (TRY hesapta ₺20, USD hesapta 10 USD) üstündeyse, ayın bitiminden sonra yaklaşık 90 gün içinde son ödeme olarak gönderilir (ödeme adımları tamamlanmış olmalı); ₺200'lük ödeme eşiğine ulaşmak gerekmez. Geçerli eşiğin altındaki tutar ödenmez (AdSense TR şartları md. 6) [RESMÎ]. Kanalı yeni hesaba bağlama süreci **bulunamadı**. | Yeniden |

### 3.10 Türkiye vergisi ve yasal yükümlülükler

Depodaki ilgili sayfalar: [Vergi 101](../Sirket-Kurma/03-vergi-101.html), [SGK / Bağ-Kur](../Sirket-Kurma/02-sgk-bagkur.html), [Şahıs şirketi](../Sirket-Kurma/04-sahis-sirketi.html), [Limited](../Sirket-Kurma/05-limited-sirket.html), [Genç girişimci](../Sirket-Kurma/07-genc-girisimci.html), [Şirketsiz (20/B)](../Sirket-Kurma/12-sirketsiz.html), [Ödeme altyapıları](../Sirket-Kurma/11-odeme-altyapilari.html), [Yurt dışı çerçeve](../Sirket-Kurma/09-yurtdisi-cerceve.html).

#### 3.10.1 Hangi gelir hangi rejim?

| Gelir | Rejim | Dayanak |
|---|---|---|
| YouTube video kanalı (reklam, Super Chat, üyelik, sponsor, MCN üzerinden) | **GVK mük. 20/B** (%15 nihai stopaj) | 318 S.N. Tebliğ md. 4/18, 4/19; özelgeler 38896 (26.02.2026), 38822 [RESMÎ] |
| Playables reklam payı (doğrudan YouTube) | **Ticari kazanç (GVK 37)** büyük olasılıkla; 20/B yok | 38824 (yurt dışı web sitesine oyun; "uygulama mağazası" değil); 38960; Tebliğ md. 3/a, 4/17, Örnek 20 [RESMÎ]; Playables'a özel özelge yok (18.362 özelge tarandı) [RESMÎ tarama] → uygulama [TAHMİN] |
| Yabancı yayıncı (Mediacube, Playgama vb.) üzerinden oyun geliri | Ticari kazanç; aracı kuralı (md. 4/19) oyunu kapsamaz | 38824, 38960 [RESMÎ] + [TAHMİN] |
| Aynı oyunu **mobil uygulama** olarak Google Play / App Store üzerinden satmak / reklamla gelir | 20/B kapsamına **girebilir**: madde mobil uygulama geliştiricilerini "elektronik uygulama paylaşım ve satış platformları" üzerinden kazanç şartıyla açıkça kapsıyor | GVK mük. 20/B metni [RESMÎ]; uygulama [TAHMİN] |
| Tek seferlik lisans/hak satışı | GVK 18 olabilir; süreklilik varsa ticari | [ÇELİŞKİLİ / TAHMİN → özelge] |

**38824 özelgesinin gerekçesi** (06.01.2026, E-62030549-120-17478) [RESMÎ]: GVK 37 ticari kazanç, "istisnadan yararlanmanız mümkün değildir". Dayandığı iki koşul: (1) oyunlar akıllı telefon/tablet gibi **mobil cihazlara yönelik değil**, (2) gelir "elektronik uygulama paylaşım ve satış platformları" üzerinden **elde edilmiyor**. Sonuç dalları:
- Mobil cihaz için uygulama + uygulama mağazası geliri → 20/B'ye girebilir (kanun metni) [RESMÎ + TAHMİN].
- Yurt dışı web sitesi / web oyunu → 20/B yok, ticari kazanç (38824) [RESMÎ].
- Playables (YouTube içinde, web tabanlı) → özel özelge yok; web oyunu dalına daha yakın [TAHMİN].
Kaynak: https://www.muhasebenews.com/?p=167053 [3. TARAF özet]; 20/B metni: https://www.fatiharas.com/gvk-mukerrer-madde-20-b-sosyal-icerik-ureticiligi-istisnasi/ [3. TARAF alıntı], resmî: https://www.mevzuat.gov.tr/mevzuatmetin/1.4.193.pdf

Karşı görüş [ÇELİŞKİLİ]: Kanun "metin, görüntü, ses, video **gibi** içerik" diyor; Playables "YouTube'da içerik" diye savunulabilir, ama GİB oyunları sürekli "yazılım" sayıyor → ancak özelgeyle güvenli.

#### 3.10.2 20/B (kanal geliri) — süreç [RESMÎ: 318 S.N. Tebliğ, 325 ile güncel]

1. Önce ticari kazanç **mükellefiyeti açılır**, istisna belgesi sonra verilir (md. 4/4-b).
2. Başvuru: Dijital Vergi Dairesi → Dilekçelerim → "Sosyal İçerik Üreticiliği İstisna Belgesi Talebi Dilekçesi (GVK Mük. 20/B)" ya da ikametgâh vergi dairesi [3. TARAF akış — https://www.muhasebenews.com/sosyal-icerik-ureticileri-ve-mobil-uygulama-gelistiricileri-icin-2026-vergi-istisnasi-basvuru-sureci-ve-banka-bildirimi-uygulamasi/].
3. Belge bankaya verilir; hesap açılır/ayrılır; banka adı, şube, IBAN **1 ay içinde** vergi dairesine bildirilir (md. 4/6). İstisna hesabın açıldığı/belgenin verildiği tarihten başlar (md. 7/1).
4. **Tüm hasılat yalnız bu hesaba** gelir; tek nakit tahsilat o yılın istisnasını düşürür (Örnek 13).
5. Banka %15 keser (md. 5/4); dövizde aktarım günü döviz alış kuru (md. 5/5); stopaj nihai, mahsup edilemez (md. 4/14).
6. Yalnız 20/B faaliyetinde defter/belge yok (md. 6/3); başka ticari faaliyet varsa defter sürer, giderler ayrılır (md. 6/4).
7. Sınır aşılmazsa beyanname yok, geçici vergi yok (md. 4/8, 4/11). KDV hesaplanmaz (KDVK 17/4-a; 38896).
8. **2026 sınırı: 5.300.000 TL, kazanç üzerinden** (hasılat değil; md. 4/7, Örnek 14) — 332 S.N. Tebliğ https://cdn.gib.gov.tr/api/gibportal-file/file/getFile?objectKey=MEVZUAT_TEBLIGLER/UNIVERSAL/2025/193_Teblig332.pdf . Aşılırsa o yıl istisna düşer, tüm kazanç beyan edilir, banka kesintileri mahsup edilir. Kanun metni (mük. 20/B, 4. fıkra) iki ayrı düşme sebebi sayar: kazançlar toplamı 4. dilim tutarını aşanlar **ve** "faaliyete ilişkin tüm gelirlerini ikinci fıkrada belirtilen şartlara göre tahsil etmeyenler" → örneğin AdSense ödemesinin 20/B hesabı dışında bir hesaba gelmesi de istisnayı düşürür (tek nakit tahsilat örneğinden daha geniş). Banka %15'i **kazanç üzerinden değil, giderler düşülmeden brüt aktarım tutarı (hasılat) üzerinden** keser. [RESMÎ kanun metni; alıntı https://www.fatiharas.com/gvk-mukerrer-madde-20-b-sosyal-icerik-ureticiligi-istisnasi/ ; 4. dilim: https://www.pwc.com.tr/tr/hizmetlerimiz/vergi/bultenler/2026/2026-yili-bazi-gelir-vergisi-rakamlari.html]
9. Kurumlar vergisi mükellefi (limited/AŞ) ve adi ortaklık yararlanamaz (md. 4/16, 4/21); esnaf muaflığıyla birlikte olmaz (38891).
10. 20/B için mükellefiyet açmak genç girişimci "ilk defa" şartını tüketir; 20/B sınırı aşılmazsa genç girişimci ayrıca kullanılamaz (38897, 21334). [RESMÎ]

Not: depodaki [12-sirketsiz.html](../Sirket-Kurma/12-sirketsiz.html) "yıllık hasılat tavanı" diyor → Tebliğe göre **kazanç** [ÇELİŞKİ — düzeltme gerekir].

#### 3.10.3 Ticari kazanç yolu (Playables / yayıncı geliri)

- İşe başlama 10 gün içinde bildirilir (VUK 153); işletme defteri, fatura/e-belge, geçici vergi, yıllık beyanname; giderler düşülebilir. [RESMÎ]
- 2026 tarifesi: 190.000 TL'ye kadar %15 · 400.000 %20 · 1.000.000 %27 (ücrette 1.500.000) · 5.300.000 %35 · üzeri %40. [RESMÎ, 332 S.N.]
- **Genç girişimci** (29 yaş altı, ilk defa mükellefiyet, bizzat yürütme vb.): 2026 istisnası 400.000 TL, 3 dönem. Genç girişimci Bağ-Kur prim desteği 1.1.2026'da kaldırıldı (7566 s.K.). [RESMÎ]
- **GVK 89/13 hizmet ihracatı indirimi 2026'dan itibaren %100** (11257 s. CK, RG 30.04.2026, md. 1/2 — https://www.resmigazete.gov.tr/eskiler/2026/04/20260430-1.pdf ; kanun metninde hâlâ %80 yazar). [RESMÎ] Ama:
  - Playables reklam payı → 21044 (Google/Apple reklam payı "münhasıran yurt dışı" değil) tipine yakın → indirim **büyük olasılıkla yok**.
  - Yurt dışı yayıncıya sözleşmeli/faturalı oyun geliştirme → 38960, 24309 tipine yakın → indirim mümkün (fatura yurt dışı müşteriye, kazanç beyan tarihine kadar Türkiye'ye getirilir, ayrı kayıt). [RESMÎ özelgeler + TAHMİN]
  - Depodaki [07-genc-girisimci.html](../Sirket-Kurma/07-genc-girisimci.html) / [03-vergi-101.html](../Sirket-Kurma/03-vergi-101.html) "%80 taban, %100 TEYİT" diyor → %100 resmî olarak doğrulandı [ÇELİŞKİ — güncellenmeli].
  - Sınırlar: bu bir **kazanç indirimidir, istisna veya tam vergi muafiyeti değildir**; indirim o yılın matrahından fazlaysa artan kısım **sonraki yıllara devretmez**. Dört şart: sayılan hizmet türü, hizmetten münhasıran yurt dışında yararlanılması, faturanın yurt dışındaki müşteri adına düzenlenmesi, kazancın beyan tarihine kadar Türkiye'ye getirilmesi. [3. TARAF, Karar metniyle teyit edilmeli — https://kpmgvergi.com/yayinlar/mali-bultenler/vergi/bazi-hizmet-ihracati-ve-yurt-disi-istirak-kazanclarina-uygulanan-istisna-ve-indirim-oranlari-artiran-cumhurbaskani-karari-yayimlandi/4481]
- **Dövizle gelen hasılat:** USD/EUR gelen gelir tahsil/fatura tarihindeki kurla TL'ye çevrilerek kaydedilir; yıl sonu döviz değerlemesi ve kur farkı doğabilir (VUK 280 — https://www.mevzuat.gov.tr/mevzuatmetin/1.4.213.pdf). Bu, EFT (TL) mi havale (USD) mi kararını da etkiler → mali müşavire sor. [TAHMİN, VUK dayanaklı]
- **Fatura muhatabı:** AdSense TR sözleşmesinin tarafı Google Ireland Ltd. [RESMÎ — https://www.gstatic.com/adsense/tc/2022-v1/google_irl/tr.html]; Türkiye'deki üreticilere ödemelerin Google Ireland üzerinden yapıldığı söyleniyor [3. TARAF — https://hispanatolia.com/?p=4400]. YouTube/Playables ödemesini fiilen hangi şirketin yaptığı ve Playables pilot ödeyeni **bulunamadı** → ödeme makbuzundan / Partner Manager'dan teyit et. KDV istisnası belgelemesi ve 89/13 ispatı için de gerekir.
- **KDV:** genel oran %20; oyun Türkiye'de de oynanıyorsa ihracat istisnası yok (21044, 30855, 38808); **39022 (25.11.2025)**: reklamların görüntülendiği ülke belgelenirse yurt dışı payına oransal istisna. Google KDV ödemediği için KDV tahsil edilen tutarın içinden hesaplanır [TAHMİN]. Yurt dışından alınan hizmetlerde (asset, abonelik) sorumlu sıfatıyla KDV (2 No.lu beyanname). Faturada 302 kodu (istisna) [depo 07].
- **Basit usul** bu faaliyete uygulanabilir mi **doğrulanmadı** → mali müşavire sor.
- **ABD vergisi mahsubu:** ticari kazanç yolunda GVK 123 mahsubu mümkün ama yabancı vergi belgesinin tasdiki pratik engel; 20/B'de mahsup yok (stopaj nihai) → ABD payında toplam yük ~%10 + %15 [TAHMİN].

#### 3.10.4 Bağ-Kur

| Durum | Sonuç | Dayanak |
|---|---|---|
| Şahıs işletmesi, başka sigorta yok | Mükellefiyet günü 4/b; 2026 aylık 11.808,23 TL (5 puan indirimle 10.156,73 TL), kazanç sıfır olsa da. Hesap: prime esas kazanç alt sınırı 33.030 TL × %35,75 (indirimle %30,75); bazı kaynaklar oranı %34,5 veriyor [ÇELİŞKİLİ]. **5 puan indirim yalnızca prim borcu yoksa ve prim zamanında ödenirse** geçerli. 2026'da tavan 9 kata çıktı; en yüksek prim ~106.274,03 TL [3. TARAF]. Prim borcu birikirse GSS sağlık hizmetine erişim kısıtlanabilir (5510 md. 67) [RESMÎ] | 5510 md. 4/1-b-1, md. 67 https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5510.pdf [RESMÎ]; tutarlar [3. TARAF, SGK resmî duyurusuyla teyit edilmeli]: https://www.tahanci.av.tr/bagkur-primi-ne-kadar/ , https://vergimerkezi.com.tr/2026-bagkur-primi-ne-kadar/ ; depo: [02-sgk-bagkur](../Sirket-Kurma/02-sgk-bagkur.html) |
| Yalnız 20/B mükellefiyeti | Büyük olasılıkla doğar (Tebliğ md. 6/2 "ticari kazanç kapsamında" + 4/1-b-1); SGK yazısı **bulunamadı** | [TAHMİN, güçlü]; https://www.ekonomim.com/kose-yazisi/sosyal-medya-icerik-ureticilerine-bag-kur-soku/841509 [3. TARAF] |
| 4/a (veya 4/c) çalışan | Doğmaz (5510 md. 53) | [RESMÎ] |
| Yaşlılık aylığı alan emekli | 4/b sayılmaz (md. 6/1-n); SGDP **teyit** | [RESMÎ] |
| Limited ortağı | 4/b (4/1-b-3) | [RESMÎ] |
| İşsizlik ödeneği alan | Mükellefiyet açılınca ödenek kesilir; İŞKUR'a bildirim | depo 12 |
| Yetim/ölüm aylığı alan | 4/b başlayınca aylık kesilir; öğrenci istisnası yalnız 4/a için | 5510 md. 34 [RESMÎ, teyit önerilir]; V7 |
| Öğrenci (25 yaş altı, ebeveyn üzerinden GSS) | 4/b başlar, ebeveyn üzerinden GSS biter, kendi primi başlar; KYK etkisi bulunamadı | 5510 md. 3/10 [TAHMİN]; V8 |

#### 3.10.5 Durum → Sonuç (vergi, toplu)

| Okur | Kanal geliri | Playables (doğrudan) | Yayıncı üzerinden | Bağ-Kur |
|---|---|---|---|---|
| Şirketsiz, kayıt yok | Kayıtsız gelir riskli; yasal yol mükellefiyet + 20/B → %15 | Kayıtsız kalınamaz; şahıs işletmesi [TAHMİN, 38824] | Şahıs işletmesi | Mükellefiyetle doğar (4/a değilse) |
| Şahıs işletmesi | 20/B eklenebilir; ayrı kayıt | Gerçek usul, %15–40; KDV %20 veya 39022 oransal; 89/13 büyük olasılıkla yok | 89/13 %100 ve KDV istisnası, münhasıran yurt dışı şartıyla | 4/b |
| Limited | 20/B yok; kurumlar vergisi %25 | Kurum kazancı; KVK 10/1-ğ %100 ama reklam payında reddediliyor (21044, 38808) | Hizmet ihracında 10/1-ğ + KDV istisnası mümkün | Ortaklar 4/b |
| 29 yaş altı, ilk kez | 20/B için mükellefiyet "ilk defa"yı yakar | Genç girişimci 400.000 TL + 89/13 birlikte (21286) | Aynı | Destek kalktı |
| Kamu görevlisi | Kurumdan teyit | Şahıs işletmesiyle **engel**; yönetici olmayan limited ortaklığı açık (kurum teyidi) | Aynı | 4/c |
| Kanal + Playables birlikte | 20/B hesabına yalnız kanal geliri | Aynı AdSense ödemesinde gelirse ayrılamaz → %15 karışıklığı [TAHMİN] | — | — |

#### 3.10.6 Diğer yasal yükümlülükler

- 5651 oyun hükümleri (01.11.2026), 15 yaş altı sosyal medya düzenlemesi: Bölüm 2.6.
- Reklam Kurulu etkileyici kılavuzu "kendisine **veya** reklam verene ait" ürünü tanıtanı kapsıyor → kendi oyununu kanalda tanıtırken ticari amaç gizlenmemeli [3. TARAF — https://iabtr.org/wp-content/uploads/2024/06/Sosyal-Medya-Etkileyicileri-Tarafindan-Yapilan-Ticari-Reklam-ve-Haksiz-Ticari-Uygulamalar-Hakkinda-Kilavuz1062021101250.pdf ; kesin hüküm TAHMİN].
- Şahıs işletmesinde KVKK/VERBİS çalışan sayısı ve bilanço eşikli istisna [3. TARAF].
- GVK mük. 20/D (yeni yerleşenler) Türkiye'de yerleşik okur için ilgisiz. [RESMÎ]

---

## 4. Sözleşme ve hukuki şartlar

### 4.1 Bağlı olunacak belgeler

| # | Belge | Karşı taraf | Ne zaman | Kaynak |
|---|---|---|---|---|
| 1 | YouTube Hizmet Şartları (TR) | Google LLC | Kanal açarken | https://www.youtube.com/static?template=terms&gl=TR&hl=tr [RESMÎ] |
| 2 | YouTube API Hizmet Şartları + Developer Policies | YouTube LLC | Playables için MUST (T&S 2.1) | https://developers.google.com/youtube/terms/api-services-terms-of-service (2026-09-14) [RESMÎ] |
| 3 | Playables sertifikasyon gereksinimleri | — | Her sürüm | https://developers.google.com/youtube/gaming/playables/certification/requirements [RESMÎ] |
| 4 | Playables lisans / "additional agreements" | YouTube/Google | Kabulden sonra | **Metin bulunamadı** |
| 5 | Google Gizlilik Politikası | — | MUST (P&D 1) | requirements_privacydata [RESMÎ] |
| 6 | YPP Base Terms + modüller | — | Studio içinde | https://support.google.com/youtube/answer/12843009 [RESMÎ]; tam metin kamuya açık **bulunamadı** |
| 7 | AdSense (Türkiye) şartları | **Google Ireland Ltd.** | AdSense açarken | https://www.gstatic.com/adsense/tc/2022-v1/google_irl/tr.html [RESMÎ] |
| 8 | W-8BEN / W-8BEN-E | — | AdSense içinden | https://support.google.com/youtube/answer/10391362 [RESMÎ] |

Google Play Geliştirici Politikası'na atıf **bulunamadı**.

### 4.2 Fikrî mülkiyet ve münhasırlık

| Konu | Durum | Etiket |
|---|---|---|
| Oyunun sahipliği | Geliştiricide kalır ("you retain all rights… in your API Client(s)", API 16.1) | [RESMÎ] |
| Publicity | YouTube'a adın, ürün adı ve logo için **non-exclusive, irrevocable, royalty-free, worldwide** lisans; fesihten sonra da sürer (13, 24.6); YouTube onayı olmadan "YouTube ortağıyız" denemez | [RESMÎ] |
| Anlaşmanın niteliği | "The Agreement is a non-exclusive agreement." (17) | [RESMÎ] |
| YouTube ToS içerik lisansı | Dünya çapında, münhasır olmayan, telifsiz, alt lisanslanabilir; içerik kaldırılınca biter. Videolar için kesin; ZIP için belirsiz | [RESMÎ + TAHMİN] |
| Form | Başka platformda yayında olmayı olağan seçenek sayıyor → münhasırlık işareti yok | [RESMÎ + TAHMİN] |
| Kabul sonrası lisans | Münhasırlık, süre, bölge **bilinmiyor** | bulunamadı |
| Ters risk | Poki Web Exclusive Playables'ı kapsar | [RESMÎ] |
| Playables Builder | Sahiplik şartı **bulunamadı**; yalnız ABD/CA/UK/AU | [3. TARAF] |

### 4.3 İçerik kuralları (Trust & Safety, 2026-08-26) [RESMÎ]

1.1 Topluluk Kuralları · 1.2 "made for kids" yok, 13+ · 1.3 yanıltıcı meta veri yok · 2.2 üçüncü kişi fikrî mülkiyeti tamamen temiz; "authorized, original, or properly licensed"; kopya/"substantially identical" yok · 2.3 marka/trade dress · 2.4 müzik hakları · 2.5 kişilik hakları · 3 dev/staging linkleri paylaşılamaz. Kumar, loot box, yapay zekâ içeriği, UGC için ayrı madde **yok**. Gizlilik: oyuncudan ad, yaş, konum, kullanıcı adı, parola istenemez; giriş ekranı benzeri, QR kod, dış çağrı, obfuscation yasak.

### 4.4 Yaş

| Durum | Sonuç | Etiket |
|---|---|---|
| YouTube kullanımı | 13+; 18 altı için ebeveyn izni (TR metni) | [RESMÎ] |
| API Şartları | Bağlayıcı sözleşme yapabilecek yaş → Türkiye'de 18 (TMK md. 11; 15+ mahkeme kararıyla erginlik md. 12) | [RESMÎ] |
| AdSense / AdSense for YouTube | 18+; altındakiler için veli/vasi hesabı, ödeme yetişkine | [RESMÎ] |
| Oyuncu kitlesi | 13+ genel | [RESMÎ] |

### 4.5 Yaptırımlar ve kaldırma

- **API Şartları:** YouTube erişimi "at any time" askıya alabilir/sonlandırabilir; EMEA'da "reasonable notice" denenir ama zorunlu değil (24.2). Sorumluluk tavanı: son 6 ayda YouTube'a ödenen ya da 1.000 $ (20.1). Değişiklik ≥ 30 gün sonra yürürlükte (hukuki/yeni özellikte hemen) (2.3). [RESMÎ]
- **Kanal:** 90 gün içinde 3 ihtar → kalıcı kaldırma; kapatılan kanalın yerine yeni kanal açmak yasak — https://support.google.com/youtube/answer/2802032 , /2797387 [RESMÎ]. Portal erişimi kanala bağlı olduğu için **kanal kapanırsa oyun ve portal da büyük olasılıkla gider** [TAHMİN].
- **AdSense (TR):** geçersiz etkinlikte önceden bildirimsiz askıya alma, ödeme tutma; hesap kapanışı 10 iş günü; **iptal eşiği** (TRY ₺20 / 10 USD) üstündeki bakiye ~90 günde ödenir, geçerli eşiğin altındaki tutar ödenmez (iptal eşiği ödeme eşiğinden ayrıdır — https://support.google.com/adsense/answer/1709871); değişiklik genelde 14 gün sonra. [RESMÎ]
- **YPP:** 6 ay+ video yüklenmez veya Posts sekmesinde paylaşım yapılmazsa para kazanma kapatılabilir; 01.02.2027'den itibaren YPP güncellemeleri başlıyor; mevcut ortaklar güncel şartları 31.01.2027'ye kadar Studio'da kabul etmeli — https://support.google.com/youtube/answer/72851 [RESMÎ]. (Önceki sürümdeki "channel activity requirements" ifadesi bu sayfada bulunamadı; kaldırıldı.)
- Yayındaki Playable'ın kaldırılma ve itiraz süreci **bulunamadı**.

### 4.6 İhtilaf ve yargı yeri

| Sözleşme | Hukuk | Mahkeme | Etiket |
|---|---|---|---|
| YouTube ToS (TR, 05.01.2022'den beri) | İngiliz | İngiltere-Galler; zorunlu yerel hukuk engelliyorsa yerel | [RESMÎ] |
| API Şartları EMEA | İngiliz | İngiltere (münhasır) | [RESMÎ] |
| API Şartları Americas | Kaliforniya | Santa Clara; dava süresi 1 yıl | [RESMÎ] |
| AdSense (TR) | **Kaliforniya** | **Santa Clara (münhasır)** | [RESMÎ] |
| YPP / Playables lisansı | **bulunamadı** | | |

- Türkiye'ye hangi API sürümünün uygulandığı yazmıyor; EMEA olası [ÇELİŞKİLİ / TAHMİN].
- MÖHUK md. 47 yabancı mahkeme seçimine izin veriyor (Yargıtay 11. HD 2016/1657 — https://www.lexpera.com.tr/ictihat/yargitay/11-hukuk-dairesi-e-2015-7244-k-2016-1657-t-17-2-2016) [3. TARAF]; gelir elde eden geliştirici büyük olasılıkla tüketici sayılmaz → **dava fiilen yurt dışında ve pahalı** [TAHMİN].

### 4.7 Kabul gelirse imzadan önce sorulacaklar [TAHMİN, boşluklardan türetildi]

1. Lisans münhasır mı? Yalnızca web için mi? Süre ve bölge?
2. Kod/varlık üzerinde devir mi, yalnızca lisans mı?
3. Gelir payı yüzdesi, eşik, ödeme kanalı (AdSense for YouTube mu, başka mı?), ABD vergi sınıfı ve formu.
4. Fesih: kim, hangi bildirim süresiyle? Fesihten sonra oyun ne kadar sürede kalkar? Oyunu kendim kaldırabilir miyim?
5. Uygulanacak hukuk ve mahkeme.
6. Gizlilik (NDA) kapsamı (API 18 fesihten sonra da sürer).
7. Publicity lisansında kişisel ad yerine stüdyo adı kullanılabilir mi?
8. Bireysel (şirketsiz) imza mümkün mü, şirket isteniyor mu?
9. Ülke bazlı gelir raporu verilecek mi? (Türkiye KDV oransal istisnası için gerekli — 39022.)

---

## 5. Yayıncı / aracı yolu

**Ne zaman mantıklı** [TAHMİN]: doğrudan başvuruya dönüş gelmezse, pilot daveti yoksa veya kanalın yoksa. Bedeli: gelirden pay, yabancı hukuk, oyunun büyük olasılıkla yayıncının kanalında çıkması (kendi kanalına abone kazandırmaz; "oyun hangi kanalda" ikisi için de **belirtilmemiş**).

### 5.1 Karşılaştırma

| | Playgama [3. TARAF] | Mediacube [3. TARAF] |
|---|---|---|
| Hukuki muhatap | LeadToChanges L.L.C-FZ, Dubai/BAE (https://playgama.com/license) | MEDIACUBE WORLDWIDE LTD, Kıbrıs (Limasol) |
| Kimi kabul ediyor | Geliştirici portalına yükleme; "No Google Developer account needed" | "Indie studios and solo developers at any stage"; ödeme "individuals, sole traders, self-employed" |
| Süreç | Bridge SDK (açık kaynak, LGPL-3.0) → developer.playgama.com'a ZIP → QA ve sertifikasyonu yayıncı yapar; Playgama master yayıncı hesabıyla dağıtır | Portföy incelemesi → slot + meta veri → paket + SDK → ön sertifikasyon → YouTube sertifikasyonu |
| Süre | İnceleme "24 hours"; YouTube 3–7 gün; uçtan uca 2–4 hafta | En hızlı 3 iş günü, gerçekçi ~1 hafta; başka yazıda ~2 hafta |
| Pay | "You keep 75%" (https://playgama.com/publish-your-game-on-youtube-playables/) **[ÇELİŞKİLİ]** wiki: ≤1.000 $ %70, 1.000–3.000 $ 700 $+%80, >3.000 $ 2.300 $+%90; playgama.com/iframe ağında %50; Playables'ın bu tabloya girip girmediği **bulunamadı** | **Açıklanmamış**: "most of the revenue", oyuna göre, "grading structure" |
| Münhasırlık | "we never demand exclusivity", "All rights belong to you"; yalnız alt lisans | "The arrangement is non-exclusive." |
| Ödeme | Eşik 100 $; banka havalesi, talep üzerine kripto; blogda PayPal/Wise; **bireye ödeme ülkeye göre vaka bazında** | MC Pay, USD; 80+ para birimi, 12 yöntem; altyapı CoinsPaid, Payoneer; avans/erken ödeme reklamı; Türk bankasına doğrudan havale **bulunamadı** |
| Geliştirici sözleşmesi | https://developer.playgama.com/terms — JS yüzünden **okunamadı**. (playgama.com/termsofuse'daki "Partners T&C" site ortakları içindir, geliştirici sözleşmesi değil: %40 pay, İngiliz hukuku + DIFC, 10.000 $ sorumluluk tavanı, tek taraflı değişiklik — karıştırma) | MC Pay User Agreement (19.05.2026) okundu; oyun **License Agreement** ayrı belge, **okunamadı** |

### 5.2 Mediacube MC Pay sözleşmesinden dikkat çekenler (https://mediacube.io/docs/agreement) [3. TARAF, birincil metin]

- Tek taraflı değişiklik (3.5, 5.5.2); erişim engelleme (5.5.1).
- Masraf, dönüşüm ve vergiler gelirden düşülür; **kullanıcının ülkesindeki vergiler kullanıcıya ait** (6.4).
- Platform parası geldikten 5 iş günü içinde hesaba yansır (6.5); kuru Mediacube belirler (6.10); çekim 10 banka günü, Express'te ek komisyon (6.11).
- **KYC zorunlu** (6.13); ödeme üçüncü taraf ödeme kuruluşuyla yapılabilir (6.14).
- **Gelir tutulabilir** (5.5.7): borç, sahte izlenme, telif ihlali, **lisans süresi bitmeden ayrılma**, kanalın para kazanmasının kapatılması → belirli süreli lisans ve erken çıkış bedeli olabilir [TAHMİN].
- 12 ay girişsiz + bağlı kanalsız hesaba aylık "Administration Fee" (tutar yok) (9); 2 yıl hareketsizlikte bakiye "unclaimed", bildirimden 90 gün sonra hak düşer (9.2).
- Kıbrıs hukuku; önce zorunlu uzlaşma, sonra Mediacube'un yeri mahkemesi (14.1).

### 5.3 Diğer adaylar

Famobi, GameSnacks (Google), SayGames, Voodoo, CrazyLabs, Supersonic, TapNation, Supercent, GameDistribution/Azerion, GamePix, Gamezop: dış geliştiriciden Playables için oyun aldıklarını gösteren program **bulunamadı**. "%15–30 aracı komisyonu" iddiasının birincil kaynağı yok → kullanma.

### 5.4 Artı / eksi

| Artı | Eksi |
|---|---|
| Kanal ve doğrudan davet gerekmeyebilir | Pay kesintisi; yüzde net değil (Mediacube) / çelişkili (Playgama) |
| Pilottaki gelir altyapısına erişim (beyan) | Yabancı hukuk (Kıbrıs / BAE / İngiliz-DIFC); dava pratikte zor |
| Hızlı (haftalar) | Oyun yayıncının kanalında; kendi kanal geçmişine katkı belirsiz |
| QA desteği | Türkiye'de bireye ödeme garantisi yok; KYC |
| Münhasır değil (beyan) | Türkiye'de ticari kazanç → şahıs işletmesi; yabancı şirketten gelen ödemede stopaj yok, beyan sende |

### 5.5 Yayıncı sözleşmesinde imzadan önce sorulacaklar [TAHMİN]

1. Yüzde brüt mü net mi? Netten hangi masraflar düşülüyor?
2. Playables geliri ayrı raporlanıyor mu? Rapor AdSense verisine dayanıyor ve denetlenebilir mi? Ülke kırılımı var mı (KDV için)?
3. Lisans süresi? Erken ayrılırsam gelir tutuluyor mu? Oyunu Playables'tan kaldırma hakkım var mı?
4. Münhasırlık yalnız Playables için mi, tüm web için mi? Oyunu ileride kendi kanalıma taşıyabilir miyim?
5. Kod, marka, kanal adı kimde? Oyun kimin kanalında, "publisher" alanında kimin adı?
6. Türkiye'deki bireye ödeme yapılıyor mu? Yöntem (SWIFT, Payoneer, Wise)? KYC belgeleri?
7. Stopaj kesiliyor mu? (Türkiye–Kıbrıs çifte vergilendirme anlaşması yok; Türkiye–BAE var [3. TARAF, ham not]) — mali müşavire.
8. Uygulanacak hukuk ve mahkeme; tek taraflı değişiklik; hareketsiz hesap ücreti.
9. Avans alınırsa gelecekteki gelirden mi mahsup, gelir olmazsa iade mi?

---

## 6. Plan B: oyun video kanalı ve diğer portallar

Ayrıntı (YPP payları, yayıncı politikaları temeli, CPM, diğer portallar): [arastirma.md](arastirma.md) Bölüm 9.2, 10.8, 13.

### 6.1 Oyun video kanalı süreci (özet)

| # | Adım | Kural / olası engel | Kaynak |
|---|---|---|---|
| 1 | Kanal, 2SV, telefon doğrulaması | Şirket kanalında Nintendo'nun bireysel izni geçerli değil | https://www.nintendo.co.jp/networkservice_guideline/en/index.html [RESMÎ] |
| 2 | Gelişmiş özellik | YPP başvurusu ve Content ID appeal için şart; kimlik/video doğrulaması herkese açık değil, Türkiye **bulunamadı** | https://support.google.com/youtube/answer/9890437 [RESMÎ] |
| 3 | Ekipman | OBS Studio (ücretsiz, GPLv2), DaVinci Resolve ücretsiz (4K60'a kadar); mikrofon pratikte gerekli (yorum) | https://obsproject.com/ [RESMÎ]; Resolve [3. TARAF] |
| 4 | Oyun seçimi | Ödeme duvarı (üyeliğe özel video, Patreon) çoğu yayıncıda yasak; yorumsuz ham görüntü, ara sahne derlemesi, müzik videosu yasak; Sony politikası **bulunamadı**; Riot logosu lisanssız kullanılamaz | Yayıncı sayfaları (Bölüm 9) |
| 5 | İçerik | "Reused/inauthentic" → yorumsuz oynanış ret riski; yorum, rehber, kurgu ekle | https://support.google.com/youtube/answer/1311392 [RESMÎ] |
| 6 | Reklam uygunluğu | İlk 7 saniyede grafik şiddet = reklamsız; küçük resimde grafik şiddet = sınırlı; başlık/küçük resimde küfür sınırlı/reklamsız; "made for kids" işaretlemesi zorunlu | https://support.google.com/youtube/answer/6162278 , /9528076 [RESMÎ] |
| 7 | Content ID | Geçerli itiraz: haklar, istisna, yanlış eşleşme ("oyunu satın aldım" geçersiz); hak sahibi 30 gün; 5 gün içinde itiraz edersen gelir bekletilir; lisanslı müziği kapat | https://support.google.com/youtube/answer/2797454 , /7000961 [RESMÎ] |
| 7b | **Genişletilmiş YPP (Türkiye dahil)** — daha erken basamak | 500 abone + son 90 günde 3 herkese açık yükleme + 12 ayda 3.000 saat **veya** 90 günde 3M Shorts. Yalnız fan funding (kanal üyeliği, Super Chat/Stickers, Super Thanks) ve Shopping açılır; **reklam payı yok**. 2027 değişikliğinde "Fan Funding and shopping thresholds are unchanged" | https://support.google.com/youtube/answer/13429240 ; https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/ [RESMÎ] |
| 8 | Tam YPP eşiği (şu an, reklam payı) | 1.000 abone + 12 ayda 4.000 saat **veya** 90 günde 10M Shorts | https://support.google.com/youtube/answer/72851 , /13429240 [RESMÎ] |
| 9 | **01.02.2027 sonrası yeni başvuru** | 365 günde 8.000 saat **veya** 90 günde 20M Shorts; abone eşiği resmî blogda **belirtilmemiş**, 1.000 kaldığı yalnız 3. taraf [ÇELİŞKİLİ] | https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/ [RESMÎ]; https://outlierkit.com/resources/youtube-partner-program-changes-2027/ [3. TARAF] |
| 10 | Başvuru | Studio → Kazan → Apply → Base terms → AdSense for YouTube (yalnız Studio'dan) → inceleme ~1 ay | [RESMÎ] |
| 11 | Ret | İlk ret: 21 gün içinde itiraz videosu (liste dışı, < 5 dk, ilk 30 sn kanal URL'si) veya 30 gün sonra yeniden; karar 14 gün; sonraki retlerde 90 gün | https://support.google.com/youtube/answer/9235730 , /9564590 [RESMÎ] |
| 12 | Shorts | Modül kabulünden önceki görüntülemeler sayılmaz; 2027 sonrası Shorts payı için her ay son 90 günde 10M görüntüleme → küçük kanalda pratikte 0 [TAHMİN] | https://support.google.com/youtube/answer/12504220 [RESMÎ] |
| 13 | Ödeme ve vergi | Bölüm 3.9 ve 3.10.2 (20/B) | — |

**Kendi oyununu kanalda tanıtmak:** kendi oyun görüntüsü telif riski taşımaz; açıklamada tıklanabilir link için gelişmiş özellik gerekir; itch.io/kendi sitene link serbest (https://support.google.com/youtube/answer/9054257) [RESMÎ]. Playable'ın **içinde** dış link yasak, kanal linkleri istisna. Videodan Playable'a resmî bağlantı özelliği **bulunamadı**. Studio'daki "Oyun adı" alanında kendi HTML5 oyunun olmayabilir [3. TARAF].

**Durum → Sonuç (kanal):**

| Durum | Sonuç |
|---|---|
| 31.01.2027'den önce eski eşiğe ulaşıp başvurmak | Eski eşikle değerlendirilir [RESMÎ + 3. TARAF] |
| 01.02.2027 sonrası | 8.000 saat / 20M Shorts |
| Aktif Topluluk Kuralları ihtarı | Süresi dolana kadar başvuru yok |
| Şirket kanalı (şahıs/limited) | AdSense Organization + W-8BEN-E; gelir 20/B'ye girmez; Nintendo bireysel izni geçersiz |
| Çocuklara yönelik (Minecraft/Roblox tarzı) içerik | "Made for kids" → kişiselleştirilmiş reklam kapanır, gelir düşer [TAHMİN] |

### 6.2 Diğer portallar (kısa)

itch.io (başvuru linki için de gerekli), CrazyGames, Poki (Web Exclusive Playables'ı da kapsar → dikkat), GameDistribution vb. Oranlar ve münhasırlık: [arastirma.md](arastirma.md) Bölüm 13. Roblox: Türkiye'de 07.08.2024 tarihli erişim engeli kararı (Adana 6. SCH 2024/5282) Eylül 2026 itibarıyla kayıtlı; Roblox geliri için de 20/B dışı özelge bildiriliyor [3. TARAF] → alternatif yol olarak sorunlu; engeli aşma yöntemleri önerilmez.

---

## 7. Sıfır maliyetli doğrulama listesi

Başlamadan önce para harcamadan, hesap açmadan veya hiçbir şey göndermeden yapılabilecekler:

### 7.1 Kendi durumunu kontrol et
- [ ] Kamu görevlisi miyim? Evetse kurumun personel/hukuk biriminden yazılı görüş (ticari faaliyet, 20/B, yönetici olmayan limited ortaklığı).
- [ ] 4/a çalışansam iş sözleşmemde yan iş, rekabet, **mesai dışı yazılım üzerinde fikrî mülkiyet** maddesi var mı?
- [ ] İşsizlik ödeneği alıyor muyum? (Mükellefiyet açılınca kesilir.)
- [ ] Yetim/ölüm aylığı alıyor muyum? (4/b başlarsa kesilir; öğrenci istisnası yalnız 4/a için → SGK'dan yazılı teyit.)
- [ ] Öğrenci miyim? (Ebeveyn üzerinden GSS biter; KYK burs/kredi/yurt etkisini GSB/KYK'ya yazılı sor.)
- [ ] ABD vatandaşı veya green card sahibi miyim? (W-9; Bölüm 3.9 stopaj tablosu uygulanmaz.)
- [ ] 29 yaş altında mıyım, daha önce mükellefiyetim oldu mu? (Genç girişimci; 20/B için mükellefiyet açmak hakkı yakar.)
- [ ] Posta alabileceğim kalıcı bir adresim var mı? (PIN.)
- [ ] Kimlikteki ad ile banka hesabındaki ad birebir aynı mı?
- [ ] Poki vb. ile münhasır anlaşmam var mı?

### 7.2 Resmî sayfaları oku
- [ ] İlgi formunu oku (göndermeden): https://docs.google.com/forms/d/e/1FAIpQLSdvdQ0lgIq2369aemj1O6w8R8FwGn9O5ARRGODDDUbVINCRJQ/viewform
- [ ] Monetizasyon sayfasının "Last updated" tarihi ve pilot ifadesi: https://developers.google.com/youtube/gaming/playables/reference/monetization
- [ ] Sertifikasyon gereksinimleri + revizyon geçmişi: https://developers.google.com/youtube/gaming/playables/certification/requirements , …/revisionhistory
- [ ] API Hizmet Şartları (EMEA): https://developers.google.com/youtube/terms/api-services-terms-of-service-emea
- [ ] AdSense Türkiye şartları ve ödeme yöntemleri tablosu: https://adsense.google.com/adsense/terms?gl=TR , https://support.google.com/adsense/answer/1714397
- [ ] YPP şartları ve 2027 değişikliği: https://support.google.com/youtube/answer/72851
- [ ] Kendi bankanın "Gelen Döviz Havale" ve "İsme gelen EFT" tarifesi.

### 7.3 Teknik olarak dene
- [ ] Küçük bir prototipi Test Suite'te localhost'tan çalıştır: https://developers.google.com/youtube/gaming/playables/test_suite
- [ ] Unity düşünüyorsan önce boş proje ile bellek/boyut testi.
- [ ] itch.io'da ücretsiz HTML5 sayfası nasıl açılıyor, oku (takma ad kullanılabilir).

### 7.4 Mali müşavire sorulacaklar
1. YouTube Playables reklam payı (yurt dışı, Google) bende ticari kazanç mı olur? 38824 ve 38960 özelgeleri benim durumuma uyar mı?
2. Şahıs işletmesi açarsam: basit usul mümkün mü? KDV %20 mi, 39022'deki oransal istisna için hangi belge gerekir?
3. 89/13 (%100, 11257 s. CK) Playables reklam payına mı, yalnız yurt dışı yayıncıya faturalı işe mi uygulanır?
4. Kanal geliri için 20/B ve Playables için ticari kazanç birlikte yürür mü? Aynı AdSense ödemesinde gelirse ne olur?
5. Genç girişimci + 89/13 sırası; 20/B'yi önce açarsam genç girişimci hakkım yanar mı?
6. Bağ-Kur: 20/B mükellefiyeti 4/b doğurur mu? Benim çalışma durumumda ne olur?
7. ABD'de kesilen %10 Türkiye'de mahsup edilebilir mi (GVK 123, tasdik)?
8. W-8BEN "Foreign TIN" alanına TCKN yazılması (gerçek kişide TCKN = VKN, 2006/1 İç Genelge) doğru mu? Limited W-8BEN-E'de 10 haneli VKN?
11. Yurt dışındaki Google şirketine (AdSense TR tarafı Google Ireland Ltd.) fatura / e-arşiv nasıl düzenlenir? Dövizle gelen hasılatın kur çevrimi ve yıl sonu değerlemesi (VUK 280)?
9. Yurt dışı yayıncıdan (Kıbrıs/BAE) gelen ödeme: fatura, stopaj, döviz getirme/bozdurma kuralı?
10. Özelge almalı mıyım? (Süre örneklerde 12–46 ay.)

### 7.5 Playables tarafına sorulacaklar (kabul gelirse veya resmî Discord'da; yanıtlar bağlayıcı olmayabilir)
1. Bireysel ve Türkiye'den sözleşme yapılabiliyor mu, şirket isteniyor mu?
2. Gelir pilotuna kimler alınıyor? Ödeme kanalı (AdSense for YouTube?), eşik, ABD vergi sınıfı?
3. Lisans münhasır mı, süresi, bölgesi?
4. Ülke bazlı gelir/oynanma raporu var mı?
5. İnceleme süresi, ret bildirimi, itiraz yolu? Yayındaki oyunu nasıl kaldırırım?
6. Küçük resim piksel ölçüleri ve tür listesi?
7. Publisher/developer alanında stüdyo adı kullanılabilir mi?

---

## 8. Kontrol listeleri

### 8.1 Başvuru öncesi
- [ ] Karar ağacından (1.3) "BAŞLA" çıktı.
- [ ] Google hesabı + 2SV; Brand Account ile marka adlı kanal; telefon doğrulaması; kanalda aktif ihtar yok.
- [ ] Kanal sahipliği doğru hesapta (kişisel kanalda devredilemez; Brand Account'ta 7 gün owner şartıyla devredilebilir); limited ise şirket adına ya da sonradan devredilebilecek Brand Account.
- [ ] Oyun bitmiş/oynanabilir; tek kişilik; dış çağrı yok; 13+; çocuk/kumar teması yok.
- [ ] TR + EN; `getLanguage` kullanılıyor.
- [ ] Tüm varlıkların (grafik, ses, müzik, font) lisans kaydı elimde; klon/kopya değil.
- [ ] Test Suite'te MUST testleri geçiyor; ilk paket ≤ 15 MiB hedefi.
- [ ] ZIP resmî **Playables bundle analyzer** ile ön doğrulandı (dosya boyutu, toplam boyut, dosya adları). Yerel ölçüm yaklaşıktır: resmî belge, ilk paketin doğru ölçümü için oyunun portala yüklenip Test Suite'te test edilmesi gerekebileceğini söylüyor. Yerelde sıkıştırmalı (gzip/brotli) sunumla ölç. [RESMÎ, requirements_stability 2026-06-16]
- [ ] Oyun herkese açık sitede (Drive/Dropbox değil), sayfada gerçek ad zorunlu değilse stüdyo adı.
- [ ] Form cevapları hazır (3.3 tablosu); "No published games" ise dürüstçe seçildi.
- [ ] Kısa gizlilik politikası sayfası hazır.

### 8.2 Yükleme (portal) öncesi
- [ ] Lisans/ek anlaşma okundu; 4.7 soruları yazılı soruldu; gerekirse avukata okutuldu.
- [ ] Kanal onboard edildi; hesabımda **Manager** rolü var; ekip davetleri 30 gün içinde kabul edildi.
- [ ] ZIP: kökte `index.html`, göreli yollar, geçerli dosya adları, ≤ 8.000 dosya, tek dosya < 30 MiB, toplam < 250 MiB.
- [ ] Meta veri: başlık, açıklama, tür, yayıncı adı; birkaç en-boy oranında küçük resim (+ olası önizleme videosu). Karakter sınırı, oranlar ve tür sayısı **portalda doğrulandı** (özetteki 50/150 karakter, 1:1/5:7/16:9 ve 1–2 tür yalnızca tahmindir). Logo/marka yok; yanıltıcı değil.
- [ ] AGI erişilebilirlik etiketleri yalnızca doğru olanlar.
- [ ] Kayıt formatında sürüm alanı (eski kayıt uyumluluğu).
- [ ] Dev Link ile masaüstü web, mobil web, Android, iOS'ta test; Dev/staging linkleri paylaşılmadı.
- [ ] Reklam (interstitial/rewarded) yalnız SDK fonksiyonlarıyla; portal ayarı açık.

### 8.3 Gelir öncesi
- [ ] Gelir yolu belli: pilot daveti / yayıncı / kanal YPP.
- [ ] Mali müşavirle görüşüldü (7.4); rejim kararı verildi (20/B, şahıs işletmesi, limited).
- [ ] Şahıs işletmesi gerekiyorsa işe başlama 10 gün içinde bildirildi; Bağ-Kur durumu netleşti.
- [ ] 20/B kullanılacaksa: mükellefiyet → belge → özel hesap → IBAN 1 ay içinde bildirildi; tüm 20/B hasılatı yalnız o hesaba.
- [ ] AdSense hesap türü doğru seçildi (sonradan değişmez); ödeme para birimi bilinçli seçildi (değişmez).
- [ ] Kimlik doğrulama (45 gün), PIN (4 ay, 3 yanlış hakkı yok sayılır) planlandı; posta adresi doğru.
- [ ] W-8BEN / W-8BEN-E dolduruldu, anlaşma talebi (md. 12) işaretlendi; 10 Aralık hatırlatıcısı.
- [ ] Ödeme yöntemi: EFT (TL) test yatırması doğrulandı veya havale için SWIFT/IBAN banka kaydıyla birebir; ayın 20'si sınırı.
- [ ] Yayıncı yolunda: KYC belgeleri, ödeme yöntemi, sözleşme süresi ve erken çıkış maddesi yazılı teyit edildi.
- [ ] Kanal + Playables geliri aynı ödemede birleşiyorsa ayrıştırma planı mali müşavirle kuruldu.

---

## 9. Kaynakça

Tüm bağlantılar 15.10.2026'da okundu (aksi belirtilmedikçe).

### YouTube Playables — resmî
- https://developers.google.com/youtube/gaming/playables (2026-08-31)
- https://developers.google.com/youtube/gaming/playables/developer_portal (2025-10-16)
- https://developers.google.com/youtube/gaming/playables/certification/requirements (2026-06-16)
- https://developers.google.com/youtube/gaming/playables/certification/requirements_trustsafety (2026-08-26)
- https://developers.google.com/youtube/gaming/playables/certification/requirements_privacydata
- https://developers.google.com/youtube/gaming/playables/certification/requirements_design (2026-09-25)
- https://developers.google.com/youtube/gaming/playables/certification/requirements_monetization (2026-06-16)
- https://developers.google.com/youtube/gaming/playables/certification/requirements_accessibility (2026-08-26)
- https://developers.google.com/youtube/gaming/playables/certification/requirements_i18n_l10n (2026-06-16)
- https://developers.google.com/youtube/gaming/playables/certification/best_practices_design (2026-03-09)
- https://developers.google.com/youtube/gaming/playables/certification/revisionhistory
- https://developers.google.com/youtube/gaming/playables/reference/getting_started (2026-06-02)
- https://developers.google.com/youtube/gaming/playables/reference/monetization (2026-06-01)
- https://developers.google.com/youtube/gaming/playables/reference/test_suite_guide (2025-08-20)
- https://developers.google.com/youtube/gaming/playables/test_suite
- https://developers.google.com/youtube/gaming/playables/support/faq (2026-03-09)
- https://developers.google.com/youtube/gaming/playables/support/certification_faq (2026-06-16)
- https://developers.google.com/youtube/gaming/playables/support/contact (2025-08-20)
- İlgi formu (gömülü veri okundu, gönderilmedi): https://docs.google.com/forms/d/e/1FAIpQLSdvdQ0lgIq2369aemj1O6w8R8FwGn9O5ARRGODDDUbVINCRJQ/viewform
- Portal: https://www.youtube.com/playables_portal · Discord: https://discord.gg/eEFBtMswKT · Issue Tracker: https://issuetracker.google.com/issues/new?component=186600&template=874803
- https://developers.google.com/gamesnacks

### YouTube şartları, kanal, YPP — resmî
- https://developers.google.com/youtube/terms/api-services-terms-of-service (2026-09-14)
- https://developers.google.com/youtube/terms/api-services-terms-of-service-emea
- https://developers.google.com/youtube/terms/developer-policies
- https://www.youtube.com/static?template=terms&gl=TR&hl=tr
- https://support.google.com/youtube/answer/14328604 (ülkeler)
- https://support.google.com/youtube/answer/9481328 (izinler) · https://support.google.com/youtube/answer/4628007 (Brand Account sahiplik devri)
- https://support.google.com/youtube/answer/13429240 (genişletilmiş YPP, Türkiye dahil)
- https://support.google.com/youtube/answer/1646861 , https://support.google.com/youtube/answer/4642409 (kanal / Brand Account)
- https://support.google.com/youtube/answer/9891124 , https://support.google.com/youtube/answer/9890437 (özellik seviyeleri)
- https://support.google.com/youtube/answer/9701986 (kanal güvenliği)
- https://support.google.com/accounts/answer/1350409 (yaş)
- https://support.google.com/youtube/answer/72851 , /12843009 , /7101720 (YPP)
- https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/
- https://support.google.com/youtube/answer/9235730 , /9564590 (ret, itiraz)
- https://support.google.com/youtube/answer/1311392 (reused content)
- https://support.google.com/youtube/answer/6162278 (reklam uygunluğu)
- https://support.google.com/youtube/answer/9528076 (made for kids)
- https://support.google.com/youtube/answer/2797454 , /7000961 , /2814000 , /2802032 , /2797387 (Content ID, ihtar)
- https://support.google.com/youtube/answer/12504220 (Shorts)
- https://support.google.com/youtube/answer/9054257 , /154235 (link, ücretli tanıtım)

### AdSense, ödeme, ABD vergisi — resmî
- https://adsense.google.com/adsense/terms?gl=TR&hl=en · https://www.gstatic.com/adsense/tc/2022-v1/google_irl/tr.html
- https://support.google.com/adsense/answer/6167308 (yaptırımlı yerler)
- https://support.google.com/adsense/answer/2533300 (yaş) · /10163 (hesap türü) · /7164701 (banka ülkesi)
- https://support.google.com/adsense/answer/11608017 , /16354192 (kimlik) · /157667 (PIN) · https://support.google.com/youtube/answer/14727844
- https://support.google.com/adsense/answer/1714397 , https://support.google.com/youtube/answer/14728152 (ödeme yöntemleri)
- https://support.google.com/adsense/answer/1714398 , /1208358 (EFT) · /3372975 (havale) · /10000451 (Western Union)
- https://support.google.com/adsense/answer/1709871?hl=tr , https://support.google.com/youtube/answer/14727140 (eşikler) · https://support.google.com/adsense/answer/7164703 (takvim)
- https://support.google.com/youtube/answer/72866 (tek hesap)
- https://support.google.com/youtube/answer/10391362 , /10390801 , https://support.google.com/adsense/answer/1322037 (ABD vergisi)
- https://www.irs.gov/pub/irs-trty/turkey.pdf · https://www.irs.gov/pub/irs-lbi/tax-treaty-table-1.pdf
- https://www.yapikredi.com.tr/bireysel-bankacilik/hesaplama-araclari/bireysel-urun-ve-hizmet-ucretleri

### Türkiye mevzuatı — resmî
- GVK: https://www.mevzuat.gov.tr/mevzuatmetin/1.4.193.pdf · 5510: https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5510.pdf
- 318 S.N. GVK Genel Tebliği (325 ile güncel; GİB mevzuat, id 6671)
- 332 S.N. GVK Genel Tebliği: https://cdn.gib.gov.tr/api/gibportal-file/file/getFile?objectKey=MEVZUAT_TEBLIGLER/UNIVERSAL/2025/193_Teblig332.pdf
- 11257 s. Cumhurbaşkanı Kararı: https://www.resmigazete.gov.tr/eskiler/2026/04/20260430-1.pdf
- 7578 s.K. (5651 değişikliği; md. 21, 22, 23, 27): https://www.resmigazete.gov.tr/eskiler/2026/05/20260501-1.htm · 5651: https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5651.pdf
- VUK (md. 280): https://www.mevzuat.gov.tr/mevzuatmetin/1.4.213.pdf · VKN İç Genelgesi Seri No 2006/1: https://www.lexpera.com.tr/mevzuat/genelgeler/vergi-kimlik-numarasi-ic-genelgesi-seri-no-2006-1-seri-no-2006-1
- 657 md. 28 ve DPB görüşü (Adalet Bakanlığı belgesi): https://pgm.adalet.gov.tr/Resimler/SayfaDokuman/29112019145641Ticaret%20ve%20kazan%C3%A7%20getirici%20faaliyetlerde%20bulunma%20yasa%C4%9F%C4%B1%20hususunda%20g%C3%B6r%C3%BC%C5%9F.pdf
- TMK: https://www.tkgm.gov.tr/sites/default/files/2020-10/7_4721_sayili_turk_medeni_kanunu.pdf
- Özelgeler (https://gib.gov.tr/mevzuat/kanun/{433|435|436}/ozelge/{no}): 38824, 38960, 39022, 38808, 38895, 38896, 38897, 38891, 38822, 24309, 21085, 38809, 21044, 30855, 21802, 21806, 21807, 21773, 21334, 21286, 38900
- Yargıtay 11. HD 2015/7244 E., 2016/1657 K.: https://www.lexpera.com.tr/ictihat/yargitay/11-hukuk-dairesi-e-2015-7244-k-2016-1657-t-17-2-2016

### 3. taraf
- Yayıncılar: https://mediacube.io/en/blog/youtube-playables · https://mediacube.io/en/blog/youtube-playables-monetization · https://mediacube.io/en/blog/youtube-playables-updates · https://mediacube.io/docs/agreement · https://en.wikipedia.org/wiki/Mediacube · https://playgama.com/publish-your-game-on-youtube-playables/ · https://playgama.com/blog/2026/06/04/youtube-playables/ · https://playgama.com/blog/business-faqs/how-do-i-publish-a-game-on/ · https://playgama.com/blog/business-faqs/what-are-typical-payment-thresholds-for-game/ · https://wiki.playgama.com/playgama/faq/payments-and-statistics · https://wiki.playgama.com/playgama/faq/general · https://wiki.playgama.com/platforms/youtube-playables-requirements-for-games · https://playgama.com/termsofuse · https://playgama.com/license · https://developers.poki.com/guide/revenue-deal-types
- Geliştirici tanıklıkları ve araçlar: https://note.com/akihiga0316/n/n1ea0d8683cb3 · https://note.com/shgame/n/n4078311af5c9?hl=en · https://www.youtube.com/watch?v=0ZaimnthfvE · https://engine.needle.tools/docs/how-to-guides/deployment/playable-ads/youtube-playables.html
- Haber: https://mobilegamer.biz/youtube-has-quietly-rolled-out-playables-across-europe/ · https://www.pocketgamer.com/youtube-playables/50-plus-markets-expansion/ · https://9to5google.com/2023/11/28/youtube-testing-playables-gaming-effort/ · https://9to5google.com/2025/12/23/youtube-playables-builder/ · https://9to5google.com/2021/08/24/youtube-2-step-verification-requirement/ · https://www.pocketgamer.biz/youtube-policy-update-new-rules-for-gambling-violent-gaming-videos-and-streaming/ · https://outlierkit.com/resources/youtube-partner-program-changes-2027/
- playables.in (güvenilirliği düşük; form anlatımı gerçek formla [ÇELİŞKİLİ]): https://playables.in/youtube-playables-interest-form/ · https://playables.in/youtube-playables-game-rejection-reasons/ · https://playables.in/youtube-playables-developer-program-approval/
- Vergi / SGK / hukuk yazıları (bu turda eklenen): https://www.muhasebenews.com/?p=167053 · https://www.fatiharas.com/gvk-mukerrer-madde-20-b-sosyal-icerik-ureticiligi-istisnasi/ · https://www.pwc.com.tr/tr/hizmetlerimiz/vergi/bultenler/2026/2026-yili-bazi-gelir-vergisi-rakamlari.html · https://kpmgvergi.com/yayinlar/mali-bultenler/vergi/bazi-hizmet-ihracati-ve-yurt-disi-istirak-kazanclarina-uygulanan-istisna-ve-indirim-oranlari-artiran-cumhurbaskani-karari-yayimlandi/4481 · https://www.tahanci.av.tr/bagkur-primi-ne-kadar/ · https://vergimerkezi.com.tr/2026-bagkur-primi-ne-kadar/ · https://hukukcularevi.com/olum-ayligi-dul-yetim-hak-sahipleri-paylar-kesilme-5510-m32-37/ · https://www.bloomberght.com/ht-yazarlar/ali-tezel/1659463-universite-ogrencisi-yetim-calismaktan-hala-korkuyor · https://forum.donanimhaber.com/sahis-sirketi-sahibi-olarak-kyk-da-kalmak--156062989 · https://hispanatolia.com/?p=4400 · https://www.mondaq.com/unitedstates/gaming/1700392/youtube-tightens-age-restrictions-on-violent-and-gambling-related-gaming-content
- Vergi / hukuk yazıları: https://www.ekonomim.com/kose-yazisi/sosyal-medya-icerik-ureticilerine-bag-kur-soku/841509 · https://www.muhasebenews.com/sosyal-icerik-ureticileri-ve-mobil-uygulama-gelistiricileri-icin-2026-vergi-istisnasi-basvuru-sureci-ve-banka-bildirimi-uygulamasi/ · https://www.alomaliye.com/2026/02/21/sosyal-icerik-ureticilerine-yapilan-odemelerden-gelir-vergisi-ve-kdv-uygulamasi/ · https://www.alomaliye.com/2026/05/07/ihracat-bedellerinin-doviz-alim-belgesine-dab-baglanma-orani-yuzde-35-olarak-devam-ediyor/ · https://www.rsm.global/turkey/tr/node/75 · https://www.erdem-erdem.av.tr/bilgi-bankasi/5651-sayili-kanun-kapsaminda-oyun-sirketlerine-getirilen-yeni-yukumlulukler · https://paksoy.av.tr/2026/07/dijital-oyun-platformlari-icin-yeni-donem-5651-sayili-kanunda-kritik-degisiklikler/ · https://www.foreks.com/haber/detay/6ac9cf6424008d7d437403f8/PICNEWS/tr/sosyal-medya-platformlarina-15-yas-alti-yasagi-ve-yas-dogrulama-zorunlulugu-10-10-26/ · https://iabtr.org/wp-content/uploads/2024/06/Sosyal-Medya-Etkileyicileri-Tarafindan-Yapilan-Ticari-Reklam-ve-Haksiz-Ticari-Uygulamalar-Hakkinda-Kilavuz1062021101250.pdf
- Yayıncı video politikaları: https://www.nintendo.co.jp/networkservice_guideline/en/index.html · https://www.riotgames.com/en/legal · https://www.xbox.com/en-US/developers/rules · https://legal.epicgames.com/epicgames/fan-art-policy · https://www.blizzard.com/en-us/legal/dd76b654-f2c4-4aaa-ba49-ca3122de2376/blizzard-video-policy

### Depo içi
- [arastirma.md](arastirma.md) — teknik ayrıntı, motorlar, fikirler, telif, diğer portallar
- [Şirket Kurma rehberi](../Sirket-Kurma/) — özellikle 02, 03, 04, 05, 07, 09, 11, 12 numaralı sayfalar

### Hâlâ bulunamayanlar (açık noktalar)
- Playables lisans / gelir pilotu sözleşme metni; pilot seçim ölçütü; ödeme kanalı, eşik, ABD gelir sınıfı.
- Resmî onay ve inceleme süresi; ret bildirimi biçimi; itiraz yolu; yayından kaldırma ve rollback.
- Partner Manager atanma koşulu; Playables Ops'a ulaşma yolu.
- Küçük resim piksel ölçüleri, önizleme videosu formatı/süresi, tür listesi; Test Suite tam test listesi; Dev Link geçerlilik süresi.
- Resmî analitik ve ülke bazlı gelir raporu (KDV oransal istisnası için gerekli).
- Türkiye'den doğrudan kabul edilmiş bireysel geliştirici tanıklığı.
- Mediacube oyun License Agreement metni; Playgama geliştirici şartları; yayıncıların Türkiye'deki bireye ödeme ve KYC şartları.
- Türkiye'de AdSense online kimlik doğrulaması; ₺200 eşiğin güncelliği; TL hesapta havale para birimi; W-8BEN'de Türkiye TIN'i için Google'ın Türkiye'ye özel açıklaması (mevzuata göre gerçek kişide TCKN).
- Playables gelirinin YPP / AdSense for YouTube gerektirip gerektirmediği; Türkiye'nin reklam gösterilen bölge alt kümesinde olup olmadığı; Playables ödemesini yapan Google tüzel kişisi.
- İlgi formu dönüş süresi için doğrulanabilir herhangi bir kaynak; Playables Ops'a ulaşma yolu (resmî yönlendirme döngüsel).
- Öğrencinin KYK burs/kredi/yurt hakkına şahıs işletmesinin etkisi.
- Playables için GİB özelgesi; 20/B Bağ-Kur için SGK yazısı; basit usul uygulanabilirliği; 20/B hesabının döviz hesabı olup olamayacağı.
- 5651 oyun derecelendirme yönetmeliği ve yetkili kurum.
