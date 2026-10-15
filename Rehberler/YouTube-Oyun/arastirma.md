# YouTube'a Oyun Yükleme — Kapsamlı Araştırma (Playables + Oyun Video Kanalı)

**Özet:** "YouTube'a oyun yüklemek" iki ayrı şey demektir: (1) **YouTube Playables** — YouTube uygulaması ve sitesi içinde kurulumsuz oynanan HTML5 oyunlar; (2) **gameplay / oyun video kanalı** — oyun oynarken çekilen videoları yükleyip YouTube Partner Programı (YPP) ile para kazanmak. Playables'ta geliştirici erişimi hâlâ davetli "erken erişim" aşamasında, gelir paylaşımı yalnızca seçili geliştiricilerle pilot olarak yürüyor ve dış sunucuya bağlanmak yasak olduğu için Roblox benzeri online dünya Playables içinde kurulamıyor. Basit bir 2D HTML5 oyunu bir AI kodlama asistanıyla sıfırdan yapmak ise teknik olarak gerçekçi; asıl darboğaz kabul süreci, görsel kalite ve oyunun eğlenceli olması.

> **Araştırma tarihi: 15 Ekim 2026.** Fiyatlar, şartlar, oranlar ve ülke listeleri sık değişir; kullanmadan önce kaynak bağlantılarından güncelini kontrol et. Bu belge **hukuki veya mali danışmanlık değildir**; somut durumda fikri mülkiyet avukatına ve mali müşavire danışılmalıdır.

## Bu belge nasıl okunur (AI asistan için not)

- Bu dosya, başka bir AI asistanın okuyup bir kullanıcıyla birlikte YouTube Playables uyumlu oyun geliştirebilmesi için yazılmış **saf Markdown** sürümdür. İnsan okuru için aynı klasörde HTML anlatım sayfası bulunur.
- Her önemli iddianın yanında güven etiketi vardır:

| Etiket | Anlamı |
|---|---|
| **[RESMÎ]** | Platformun kendi belgesi (developers.google.com, support.google.com, resmî blog, resmî şart sayfası) |
| **[3. TARAF]** | Haber sitesi, blog, yayıncı firma, forum |
| **[TAHMİN]** | Resmî bilgiden yapılmış çıkarım; doğrulanmamış |
| **[ÇELİŞKİLİ]** | Kaynaklar birbirini tutmuyor; resmî olan esas alınır |

- Resmî sayfalar bir özetleme aracıyla okundu; kelimesi kelimesine alıntı gerektiğinde ilgili İngilizce sayfaya bakılmalı. **Bağlayıcı olan İngilizce resmî metindir.**
- Okuru tek bir duruma göre varsayma: hiç programlama bilmeyen / başka dilden gelen, bireysel / şirketli, Türkiye'de / yurt dışında yaşayan okurlar için "Durum → Sonuç" tabloları vardır.

---

## İçindekiler

1. [Kısa cevaplar](#1-kısa-cevaplar)
2. ["YouTube'a oyun yüklemek" iki anlam](#2-youtubea-oyun-yüklemek-iki-anlam)
3. [YouTube Playables nedir, nerede görünür, Türkiye durumu](#3-youtube-playables-nedir-nerede-görünür-türkiye-durumu)
4. [Şartlar ve başvuru süreci](#4-şartlar-ve-başvuru-süreci-adım-adım)
5. [Teknik şartlar ve Playables SDK](#5-teknik-şartlar-ve-playables-sdk)
6. [Araç / motor seçimi](#6-araç--motor-seçimi)
7. [AI asistanla birlikte geliştirme](#7-ai-asistanla-claude-birlikte-geliştirme)
8. [Baştan sona başlangıç rehberi](#8-baştan-sona-başlangıç-rehberi)
9. [Para kazanma ve para nasıl alınır](#9-para-kazanma-ve-para-nasıl-alınır)
10. [Telif ve hukuk](#10-telif-ve-hukuk)
11. [Oyun fikirleri](#11-oyun-fikirleri)
12. [Roblox gibi online ortam](#12-roblox-gibi-online-ortam)
13. [Diğer dağıtım kanalları ve münhasırlık](#13-diğer-dağıtım-kanalları-ve-münhasırlık)
14. [Riskler ve sık hatalar](#14-riskler-ve-sık-hatalar)
15. [Durum → Sonuç genel karar tablosu](#15-durum--sonuç-genel-karar-tablosu)
16. [Kaynakça](#16-kaynakça)

---

## 1. Kısa cevaplar

| Soru | Kısa cevap | Bölüm |
|---|---|---|
| Nasıl yapılır? | HTML5 (JS/Canvas/WebGL) oyun yapılır → Playables SDK eklenir → ilgi formuyla başvurulur → kabul gelirse Developer Portal'a ZIP yüklenir → test → sertifikasyon → kademeli yayın. [RESMÎ] | 4, 5 |
| Şartlar ne? | Erken erişim, davetli; **bitmiş/oynanabilir oyunla** başvuru; 13+ genel kitle (çocuklara yönelik olamaz); İngilizce desteği zorunlu; dış ağ çağrısı yok; ilk paket < 30 MiB; dokunmatik + fare; tüm varlıklar özgün veya lisanslı. [RESMÎ] | 4, 5 |
| Hiç bilmesem AI (Claude) ile yapabilir miyiz? | Basit 2D oyun (bulmaca, kelime, hiper-casual, idle) için **evet, gerçekçi**. Kodu, SDK entegrasyonunu, kontrol listesini AI yapar; fikir, oynayıp test etme, varlık seçimi ve karar insanda kalır. [TAHMİN] | 7 |
| Geliri var mı? | Playables'ta reklam altyapısı var ama **gelir paylaşımı yalnızca seçili geliştiricilerle pilot**; oran açıklanmamış. [RESMÎ] Gameplay kanalında YPP ile reklam geliri var (1.000 abone + 4.000 saat vb.). [RESMÎ] | 9 |
| Gelir durumu nedir? | Belirsiz ve çoğu kişi için ilk 6–12 ay **sıfır** varsayılmalı. Bilinen rakamlar yayıncı firmaların tanıtım beyanları (oyun başına ayda yüzlerce – birkaç bin $). Oyun videosu RPM'i düşük (≈0,5–4 $/1.000 izlenme; Türkiye izleyicisi daha düşük). [3. TARAF / TAHMİN] | 9 |
| Telifsiz fikirler neler? | Geleneksel oyunlar (tavla, mangala, okey, pişti, satranç), kelime/atasözü oyunları, özgün temalı idle/refleks/bulmaca oyunları. 20 fikirlik tablo var. [TAHMİN] | 11 |
| Başka oyunları telifsiz kopyalama imkânı var mı? | **Mekanik/kural** genel olarak telifle korunmaz [RESMÎ, ABD]; **kod, grafik, ses, ad, logo, "görünüm ve his"** korunur. Birebir klon yasak; Playables ayrıca başka bir Playable'a "büyük ölçüde benzer" oyunu reddeder. [RESMÎ] | 10 |
| Orijinal fikirler neler? | Türk kültürüne özgü temalar (vapur iskelesi, simit tezgâhı idle, çini/ebru eşleştirme), Türkçe günlük kelime bulmacası, kendi kanal karakteriyle mini oyun vb. | 11 |
| Roblox gibi online ortam olur mu? | **Playables içinde bugün hayır** — dış sunucu, hesap, giriş ekranı, sohbet yasak. [RESMÎ] Online için Roblox'un kendisi, Fortnite UEFN veya kendi web siten (+ Colyseus/SignalR) kullanılır. Kendi Roblox rakibini kurmak tek kişi için gerçekçi değil. [TAHMİN] | 12 |
| Para nasıl alınır? | Playables: pilotta AdSense üzerinden (3. TARAF), yayıncıyla çalışırsan yayıncı öder. Kanal: AdSense for YouTube. ABD vergi formu (W-8) verilir. Türkiye'de içerik geliri için GVK 20/B istisnası (%15 stopaj) veya şahıs işletmesi. [RESMÎ + 3. TARAF] | 9 |

---

## 2. "YouTube'a oyun yüklemek" iki anlam

| | **A. YouTube Playables** | **B. Gameplay / oyun video kanalı** |
|---|---|---|
| Ne yüklenir? | Oyunun kendisi (HTML5 paket, ZIP) | Oyun oynarken çekilen video, Shorts, canlı yayın |
| Kim yapabilir? | Davetli/onaylı geliştiriciler (erken erişim) [RESMÎ] | YouTube hesabı olan herkes |
| Ne gerekir? | Programlama (JS) veya web çıktısı veren motor | Ekran kaydı, mikrofon, kurgu |
| Gelir | Oyun içi YouTube reklamları; pay pilot aşamasında [RESMÎ] | YPP reklam geliri, Shorts havuzu, kanal üyeliği, Super Thanks [RESMÎ] |
| Telif riski | Kendi oyunun → kendi varlıkların lisans durumu | Başka şirketin oyununu yayınlıyorsan yayıncı politikası + Content ID + "reused content" |
| Birlikte | En mantıklı yol ikisini birleştirmek: kendi Playable'ını kendi kanalında video/Shorts ile tanıtmak [TAHMİN] | |

---

## 3. YouTube Playables nedir, nerede görünür, Türkiye durumu

### 3.1 Tanım

- "Playables are interactive games and experiences published to YouTube, playable through our apps and website." YouTube mobil uygulamasında ve web sitesinde kurulum gerektirmeden oynanan HTML5 oyunlar. [RESMÎ] — https://developers.google.com/youtube/gaming/playables (son güncelleme 2026-08-31)
- Oyunlar ücretsiz oynanır; şu an oyun içi satın alma (IAP) yok. [RESMÎ — monetizasyon sayfasında IAP geçmiyor; harici IAP yasak]

### 3.2 Nerede görünür [RESMÎ]

- Ana sayfadaki Playables rafı
- Arama sonuçları
- Keşfet menüsü altındaki Playables sayfası
- "Sen" sekmesi (kaydedilen oyunlar)
- Oyunu yayınlayan kanalın **Playables sekmesi**; oyun içinde kanala abone olma bağlantısı çıkar
- Kaynak: https://developers.google.com/youtube/gaming/playables/support/faq (2026-03-09), https://support.google.com/youtube/answer/14328604

### 3.3 Oyuncu tarafı özellikler [RESMÎ]

- Giriş yapan kullanıcının ilerlemesi ve en iyi skoru otomatik kaydedilir, cihazlar arasında eşitlenir. Her oyun için tek kayıt dosyası + en iyi skor tutulur.
- Oyun ilerlemesi öneri sisteminde kullanılmaz.
- En iyi skor YouTube arayüzünde gösterilir (`sendScore`). **Oyuncular arası küresel liderlik tablosu resmî belgede bulunamadı.**
- **Playables on Live:** Eylül 2025'te duyuruldu; yayıncı canlı yayında Playables oynayıp sohbetle etkileşebiliyor, Mart 2026'da dikey mobil yayın eklendi. Bu, izleyicilerin oyuna katıldığı çok oyunculu mod değildir. [RESMÎ blog + 3. TARAF] — https://blog.youtube/news-and-events/live-updates/

### 3.4 Desteklenen cihazlar [RESMÎ]

| Platform | Şart |
|---|---|
| Android | YouTube 20.46+; Android S+; O/P/Q/R sürümlerinde 64-bit veya yüksek bellekli 32-bit cihaz |
| iOS | YouTube 20.44+, iOS 14+ |
| Web (masaüstü + mobil) | Chrome, Safari, Firefox |
| TV / konsol | Resmî kaynakta geçmiyor; bulunamadı. TV hedeflenmemeli [TAHMİN] |

### 3.5 Ülkeler ve Türkiye

- **Oyuncu tarafı:** Resmî yardım sayfası **53 ülke** listeliyor; **Türkiye "Turkey (TR)"** ve **Avustralya "Australia (AU)"** olarak listede. [RESMÎ, 15.10.2026'da kontrol edildi] — https://support.google.com/youtube/answer/14328604?hl=en
  - YouTube oyunlara sınırlı erişim, kademeli yayılım (staged rollout) ve otomatik sistemlerle ayarlamalar uygulayabilir; yani ülke listesinde olmak oyunun her kullanıcıya aynı ölçüde gösterileceğini garanti etmez. [RESMÎ, FAQ 2026-03-09] — https://developers.google.com/youtube/gaming/playables/support/faq . Reklamlar da "Playables'ın açık olduğu bölge ve platformlardaki kullanıcıların bir alt kümesine" gösteriliyor. [RESMÎ, monetizasyon sayfası]
  - 2024'teki ilk 7 pazar: ABD, Birleşik Krallık, Kanada, Avustralya, Hindistan, Malezya, **Türkiye**. [3. TARAF] 50+ pazara genişleme Eylül 2026'da haber oldu. [3. TARAF] — https://www.pocketgamer.biz/youtube-playables-expands-to-more-than-50-markets-including-the-eu-and-nordics/ (28.09.2026)
  - Mediacube'un analitik ülke filtresi yalnızca US, AU, CA, UK, IN, MY gösteriyor; Türkiye için "kısmi trafik sinyali" notu düşüyor (23.07.2026). Bu, oyuncu erişim listesinden ayrı bir analitik konusudur. [3. TARAF] — https://mediacube.io/en/blog/youtube-playables-updates
- **Geliştirici olarak Türkiye'den başvuru: belgede yok.** İlgi formunun ilk sayfasında ülke kısıtı görünmüyor; yasak olduğuna dair ifade de yok. Türkiye'nin oyuncu pazarı olması, başvurunun kabul edileceği anlamına gelmez. [TAHMİN]
- **Playables Builder** (Gemini 3 ile metin/görsel/video isteminden oyun üreten araç, 17.12.2025 kapalı beta): yalnızca ABD, Kanada, Birleşik Krallık ve Avustralya; aktif kanal ve başvuru onayı gerekiyor. **Türkiye yok.** [3. TARAF] — https://9to5google.com/2025/12/23/youtube-playables-builder/

### 3.6 Tarihçe

| Tarih | Olay | Etiket |
|---|---|---|
| Eylül 2023 | Küçük kullanıcı grubuyla test | 3. TARAF |
| 28.11.2023 | Premium üyelere ~30–37 oyun | 3. TARAF (tubefilter, techcrunch) |
| 28.05.2024 | Seçili pazarlarda tüm kullanıcılara, 75+ oyun (Angry Birds Showdown, Cut the Rope, Trivia Crack…) | RESMÎ: https://blog.youtube/news-and-events/youtube-playables/ |
| Aralık 2024 | Ludo Club ve Magic Tiles 3 ile çok oyunculu test | 3. TARAF |
| 16.09.2025 | Playables on Live | RESMÎ blog + 3. TARAF |
| 2025 sonu | Developer Portal "Private Preview" | RESMÎ (2025-10-16) |
| 17.12.2025 | Playables Builder kapalı beta (TR yok) | 3. TARAF |
| 2026 | Reklam API'leri, gelir paylaşımı pilotu (Mediacube'e göre Nisan 2026'dan itibaren tam monetize) | RESMÎ + 3. TARAF |
| Temmuz 2026 | Yaş/cinsiyet/ülke kırılımlı analitik | 3. TARAF (Mediacube) |
| 25.08.2026 | "Substantially identical" (büyük ölçüde aynı) Playable yasağı eklendi | RESMÎ (revision history) |
| Eylül 2026 | 50+ pazar; resmî liste 53 ülke, Türkiye dahil | RESMÎ + 3. TARAF |
| Ekim 2026 | Bağımsız takipçi site 1.759 oyun, toplam 5,27 milyar+ oynanma sayıyor; YouTube doğrulamadı | 3. TARAF (tech-insider.org) |

---

## 4. Şartlar ve başvuru süreci (adım adım)

### 4.1 Erişim durumu

- "Developer access for Playables is in an early access stage." Herkese açık değil. [RESMÎ] — https://developers.google.com/youtube/gaming/playables
- Yol: **Playables interest form** — https://docs.google.com/forms/d/e/1FAIpQLSdvdQ0lgIq2369aemj1O6w8R8FwGn9O5ARRGODDDUbVINCRJQ/viewform
- Developer Portal "Private Preview", yalnızca davetle; ek sözleşme gerekebilir. Portala girmek için **Playables'a onboard edilmiş bir YouTube kanalında "channel manager" yetkisi** gerekir. Ekip üyesine erişim YouTube Studio > Ayarlar > İzinler'den Editor/Manager rolüyle verilir. [RESMÎ] — https://developers.google.com/youtube/gaming/playables/developer_portal (2025-10-16)
- Gereksinimler sayfası süreç ayrıntıları için **Partner Manager**'a başvurulmasını söylüyor ("Speak to your Partner Manager for details on this process"). [RESMÎ] Kime, hangi koşulla Partner Manager atandığı **belgede yok**. — https://developers.google.com/youtube/gaming/playables/certification/requirements (2026-06-16)
- [ÇELİŞKİLİ] Bir kaynak "SDK, test suite ve sertifikasyon kaynakları onboarding sonrası açılıyor" diyor; diğer gözlem SDK referansı, gereksinimler, örnekler ve test rehberinin herkes tarafından okunabildiği yönünde. Pratik sonuç: **belgeler okunabilir, başvurudan önce oyun geliştirmeye başlanabilir; Dev Link / Test Suite Link ise ancak Portal erişimiyle gelir.** [TAHMİN]

### 4.2 Formun şartları [RESMÎ, formdan]

- "We do not accept unsolicited game ideas or concepts." → Fikirle başvurulmaz.
- "Please only submit fully developed games or games in a playable state." → **Önce oyunu bitir.**
- "By submitting your game, you confirm that you own all rights to the game and its content."
- Her başvuruya dönüş yapılmaz; ilgilenilen başvurucuyla "licensing" için iletişime geçilir.
- Form "game or company" diyor. **Bireysel geliştirici açıkça yasaklanmamış, açıkça kabul edildiği de yazmıyor.** Formun 2. sayfası (bireysel/şirket, ülke, motor soruları) okunamadı.
- Değerlendirme ölçütleri (kanal geçmişi, önceki performans vb.) **belgede yok**. Kanal geçmişinin etkili olabileceği bir çıkarımdır. [TAHMİN] Resmî olan: oyunun hakları başvurana ait olmalı ve ilgilenilen başvurucuyla "licensing" için iletişime geçiliyor.

### 4.3 Onay süresi

- Resmî süre **belgede yok**.
- Mediacube (yayıncı, ticari çıkarı var): doğrudan başvuruda "3–6 ay", başka bir yazısında "5–6 ay"; kendi aracılığıyla ~1 hafta / 3 iş günü. [3. TARAF, ÇELİŞKİLİ] — https://mediacube.io/en/blog/youtube-playables-updates , https://mediacube.io/en/blog/youtube-playables-monetization

### 4.4 Süreç adımları [RESMÎ belgelerden derlendi]

1. **Oyunu web olarak geliştir** — HTML5/WebGL/Canvas, tek sayfa uygulaması (SPA).
2. **SDK'yı ekle** — `index.html` içinde oyun kodundan önce `<script src="https://www.youtube.com/game_api/v1"></script>`; `firstFrameReady()` → `gameReady()`; kayıt, ses, pause entegrasyonu. (Bölüm 5)
3. **İlgi formuyla başvur** (oyun oynanabilir durumda olmalı).
4. Onay gelirse **kanal onboard edilir**, Developer Portal erişimi açılır.
5. Portal'da **"Add a new game"** → meta veri (başlık, tür, açıklama, yayıncı/geliştirici), **ZIP paket** (kökte `index.html`), birden çok en-boy oranında küçük resim, reklam ayarları.
6. **"Create release"** → "Verify and test" sekmesinde **YouTube Dev Link** ve **Test Suite Link** gelir. Masaüstü web, mobil web, Android ve iOS'ta test edilir. Dev/staging linkleri dışarıyla paylaşılmaz.
7. **"Submit for Certification"** → inceleme sürerken ikinci sürüm gönderilemez; değiştirmek için Playables Ops'tan staging release'in reddedilmesi istenir.
8. **Kademeli yayın** — sınırlı erişim, aşamalı yayılım, otomatik ayarlamalar; etkileşim dalgalanabilir.

### 4.5 Alternatif yol: yayıncı (publisher)

- Mediacube, Playgama gibi yayıncılar aracılığıyla yayın. Mediacube 50+ Playables oyunu ve günde ~16 milyon oynanma iddia ediyor; anlaşma münhasır değil, pay oyuna göre değişiyor, yüzde açıklanmamış. [3. TARAF]

### 4.6 Durum → Sonuç (başvuru)

| Durum | Sonuç |
|---|---|
| Elinde sadece fikir var | Başvurma; form fikir kabul etmiyor. Önce oynanabilir oyun yap. [RESMÎ] |
| Oyun bitti, bireysel geliştiricisin | Formu doldur; kabul garanti değil, aylarca dönüş gelmeyebilir. Bu arada oyunu itch.io / CrazyGames'te yayınla (Bölüm 13). [TAHMİN] |
| Şirketin / stüdyon var | Aynı form; şirket şartı belgede yok ama form "company" seçeneğini açıkça sayıyor. [RESMÎ] |
| Hızlı yayın istiyorsun | Yayıncı (Mediacube, Playgama vb.) üzerinden git; pay ve şartlar yayıncıyla belirlenir. [3. TARAF] |
| Kanalında topluluk ihlali / zayıf geçmiş var | Değerlendirme ölçütleri belgede yok; kanal geçmişinin olumsuz etki etmesi olası. [TAHMİN] |
| Türkiye'de yaşıyorsun | Belgede ülke kısıtı yok; kabul edileceği de doğrulanmadı. [TAHMİN] |
| Yurt dışında (ABD/UK/CA/AU) yaşıyorsun | Ek olarak Playables Builder kapalı betasına başvurabilirsin. [3. TARAF] |

---

## 5. Teknik şartlar ve Playables SDK

Bir **MUST** maddesi karşılanmazsa oyun yayınlanmaz. Gereksinim kategorileri: erişilebilirlik, tasarım, i18n/L10n, entegrasyon, monetizasyon, gizlilik ve veri, kararlılık ve performans, güven ve güvenlik. [RESMÎ] — https://developers.google.com/youtube/gaming/playables/certification/requirements

### 5.1 Boyut, performans, kararlılık [RESMÎ, 2026-06-16]

Kaynak: https://developers.google.com/youtube/gaming/playables/certification/requirements_stability

| Kural | MUST (zorunlu) | SHOULD (önerilen) |
|---|---|---|
| İlk paket (`gameReady`'ye kadar inen veri, **HTTP sıkıştırma sonrası**) | < 30 MiB | < 15 MiB |
| Toplam paket | < 250 MiB (lazy-load için destekle görüşülerek istisna olabilir; Haziran 2024'te 100'den 250'ye çıktı) | — |
| Tek dosya | < 30 MiB (**istisna yok**) | < 512 KiB |
| Kayıt verisi | < 3 MiB | < 500 KiB |
| Çıkıştaki son kayıt | best-effort, ≤ 64 KiB | — |
| Etkileşime hazır olma süresi | — | < 5 sn |
| Tepe JS heap | 512 MB'ı geçemez (MUST NOT); aşılırsa iPhone'larda çökmeye yol açar (Stability 6) | — |
| Dosya sayısı | ≤ 8.000 | — |
| Yollar | Yalnızca göreli yol | — |
| Dosya adları | Yalnızca alfanümerik + `_ - .` | — |

- [ÇELİŞKİLİ] Aynı sayfanın özet kısmı: ilk paket < 15 MB, toplam < 250 MB; ideal olarak sırasıyla 5 MB ve 15 MB. Gövde (ayrıntılı maddeler): ilk paket MUST < 30 MiB, SHOULD < 15 MiB; toplam MUST < 250 MiB. **Gövde esas alınmalı**; güvenli hedef ilk paket ≤ 15 MiB.
- Android'de oyun önce **sıfır boyutlu, gizli bir WebView'da** yüklenir → `resize` dinlenmeli, yükseklik ancak `innerHeight > 0` olunca ayarlanmalı; yoksa boş ekran. [RESMÎ] — https://developers.google.com/youtube/gaming/playables/support/certification_faq (2026-06-16)
- Bundle analyzer: https://developers.google.com/youtube/gaming/playables/samples/bundle_analyzer [RESMÎ]

### 5.2 Gizlilik, veri ve ağ [RESMÎ, 2026-06-15]

Kaynak: https://developers.google.com/youtube/gaming/playables/certification/requirements_privacydata

> **Numara notu:** Resmî gereksinim sayfaları yalnızca **bölüm numarası** veriyor (ör. Privacy 3, Integration 4); bölüm içindeki maddeler numarasız. Bu belgede "Integration 4.3" gibi alt numaralar, bölümdeki **madde sırasına göre bu belgede verilmiş kısaltmalardır**, resmî kimlik değildir. (Design sayfasında 6.1–6.4 alt başlıkları resmîdir.)

- **Privacy 3 (1. madde):** Zorunlu Google/YouTube API'leri dışında **hiçbir harici URL veya servise çağrı yapılamaz** — analitik dahil. Privacy 3 (2. madde): engeli aşmaya çalışmak yasak.
- Tüm oyun verisi pakette olmalı; uzak veritabanı/sunucudan bölüm indirmek yasak. Tek istisna seçili oyunlarla yürüyen küçük bir "remote data access" pilotu. [RESMÎ, certification_faq]
- Privacy 3 (3. madde): QR koda benzeyen grafik yasak.
- Privacy 4.1–4.2: Ad, yaş, konum, kullanıcı adı, parola istenemez; giriş/hesap açma ekranına **benzeyen** arayüz bile yasak. Pano yalnızca kullanıcı açıkça yapıştırınca okunabilir.
- Privacy 5: Kod gizleme (obfuscation) yasak; standart minify serbest.
- Privacy 6: Kod boyutu/karmaşıklığı YouTube tarama araçlarının sınırında kalmalı.
- Privacy 7: YouTube değerlendiremediği oyunu reddedebilir; örnek: **WebAssembly, `eval()`, web worker**.
  - [ÇELİŞKİLİ] Resmî Unity ve Godot sarmalayıcıları `.wasm` üretiyor ve CSP `unsafe-eval` + worker'a izin veriyor. Yorum: WASM yasak değil ama **saf JS/Canvas en düşük riskli yol**. [TAHMİN]
- Privacy 8: Oyun Single Page Application olmalı.

**CSP başlığı** (YouTube oyunu bununla sunuyor) [RESMÎ] — https://developers.google.com/youtube/gaming/playables/reference/test_suite_guide (2025-08-20):

- `default-src 'none'`, `connect-src 'self' blob: data:`, `worker-src 'self' blob:`
- Script: `'unsafe-eval'`, `'unsafe-inline'`, `blob:` ve game_api v0/v1 izinli
- `img-src 'self' blob: data:`; `media-src 'self' blob:`; `object-src 'none'`
- `style-src 'self' 'unsafe-inline' fonts.googleapis.com`; `font-src 'self' data: fonts.googleapis.com fonts.gstatic.com`
- CSP başlığının içindeki **`sandbox` direktifi** (iframe özniteliği değil): `allow-pointer-lock allow-same-origin allow-scripts`
- Yerelde Chrome DevTools "Local Overrides" ile `index.html` yanıtına uygulanıp test edilmesi öneriliyor.

### 5.3 Entegrasyon [RESMÎ, 2026-09-25]

Kaynak: https://developers.google.com/youtube/gaming/playables/certification/requirements_integration

| Madde (bölüm.sıra) | Kural |
|---|---|
| 1.1 | SDK, oyun kodundan **önce** yüklenir |
| 2.1 | `firstFrameReady()` çağrıldığında ekranda yükleme/splash olmalı; `gameReady`'den önce çağrılmazsa oyun hiç gösterilmez |
| 2.2 / 2.3 | `gameReady()` oyun etkileşime hazır olunca (ör. ana menü); yükleme ekranı dururken çağrılmaz |
| 3.2 | `sendScore` kullanılıyorsa gönderilen en iyi skor, kayıttaki en iyi skorla aynı olmalı |
| 4.1 | Kayda değer ilerlemede `saveData` çağrılır (her oturumda baştan başlayan oyunlar muaf) |
| 4.2 | SDK bulut kaydı dışında kayıt mekanizması **yasak** (MUST NOT; fiilen `localStorage`/IndexedDB ile ilerleme saklamak dışlanır) [TAHMİN yorumu] |
| 4.3 | `saveData`'dan önce `loadData` başarıyla beklenmeli, yoksa kayıt reddedilir |
| 4.4 | Eski sürümlerin kayıtları hatasız yüklenmeli |
| (Stability) | Çıkıştaki son kayıt best-effort, ≤ 64 KiB |
| 5.1–5.5 | Sistem sesine, YouTube sessiz ayarına (`isAudioEnabled`/`onAudioEnabledChange`) ve cihaz ses düzeyine uy; beklenmedik ses yok; YouTube sessizken oyun sesi açamaz |
| 5.7 / 5.8 | Oyunda **genel sessiz düğmesi olmamalı** (SHOULD NOT); müzik/efekt için ayrı ayar olabilir (MAY) |
| 6.1 | `onPause` gelince yürütme tamamen durur (döngü, müzik, ağ, render); yalnızca `onResume` ile devam |
| 6.2 | Yalnızca SDK'nın `onPause`/`onResume`'u; **Page Visibility API vb. kullanmak yasak** |

- En sık görülen **ses** sorunu: oynatmayı başlatmak için kullanıcı etkileşimi beklemek. YouTube odağı otomatik verebilir. [RESMÎ, certification_faq 2026-06-16]

### 5.4 Tasarım [RESMÎ, 2026-09-25]

Kaynak: https://developers.google.com/youtube/gaming/playables/certification/requirements_design

Numaralar "bölüm.madde sırası" (bu belgenin kısaltması; 6.1–6.4 resmî alt başlık).

- **Ekran:** Her en-boy oranı (1.1); dolduramıyorsa ortala + letterbox/pillarbox (1.2, SHOULD); **yön/duruş kilitlenemez** (1.3); boyut değişince durum korunur (1.4).
- **Giriş:** Dokunma (2.1) ve fare (2.2) **zorunlu**; klavye önerilir (2.5); modallar Esc ile kapanır (2.6), Esc'de `preventDefault` yok (2.7); titreşim varsa kapatma ayarı (2.8).
- **Görüntü:** Her çözünürlük/DPI'da net metin ve grafik (3.1).
- **Yasak öğeler (6.1–6.4):** paylaşım istemi (6.1), dış içeriğe tıklanabilir link — kanal linkleri istisna (6.2), ek kullanıcı sözleşmesi (6.3), YouTube'un kapat/sessiz/menü ikonlarının aynısını yanlarına koymak ve çıkış (quit) düğmesi (6.4).
- **Metadata (4.1/4.2):** gerekli alanlar eksiksiz; küçük resim, başlık ve açıklamada logo/marka yok. Küçük resim piksel ölçüleri **belgede bulunamadı**.
- **Bitiş (5.1):** İçerik bitince (son bölümden sonra) oyuncuya açıkça bildirilir.

### 5.5 Dil ve erişilebilirlik [RESMÎ]

- **İngilizce desteği zorunlu.** Dil `ytgame.system.getLanguage()` ile okunur; `navigator.language` gibi web yerelleştirme API'leri **yasak**. Dil değeri cloud save'e yazılmaz. — requirements_i18n_l10n (2026-06-16)
- WCAG AA önerilir; AGI erişilebilirlik etiketleri önerilir, yanlış etiket yasak. — requirements_accessibility (2026-08-26)

### 5.6 Güven ve güvenlik / içerik [RESMÎ, 2026-08-26]

Kaynak: https://developers.google.com/youtube/gaming/playables/certification/requirements_trustsafety

- YouTube Topluluk Kuralları geçerli.
- **"Made for kids" yasak**; 13+ genel kitleye uygun olmalı. IARC vb. derecelendirme belgede yok.
- Üçüncü taraf hakları (telif, marka, trade dress, müzik, kişilik hakları) tamamen temizlenmiş olmalı; oyun "authorized, original, or properly licensed".
- **Kural 2.2 (25.08.2026):** Kopya yükleme veya başka bir Playable'a "substantially identical" oyun yasak.
- Yanıltıcı başlık/küçük resim/açıklama yasak.
- AI'a özgü ayrı bir Playables kuralı **yok**.

### 5.7 Monetizasyon kuralları [RESMÎ, 2026-06-16]

Kaynak: https://developers.google.com/youtube/gaming/playables/certification/requirements_monetization (resmî sayfada yalnızca bölüm 1–3 numaralı).

- Monetization 1: Platform dışı servislerle oyun içi para kazanma yasak. Monetization 3: Platform dışı servislerle her türlü uygulama içi satın alma (IAP) yasak.
- Monetization 2: Reklam yalnızca YouTube'un sağladığı reklam işlevleriyle (`ytgame.ads`) gösterilebilir (MAY); **platform dışı servislerle her türlü oyun içi reklam yasak** (MUST NOT) [RESMÎ]. Örnek olarak AdSense, AdMob, Unity Ads gibi harici reklam SDK'ları bu yasağa girer [TAHMİN — örnekler belgede geçmiyor]. Reklam kullanılıyorsa ses (`isAudioEnabled`/`onAudioEnabledChange`) ve pause (`onPause`/`onResume`) kurallarına uyulmaya devam edilir; Developer Portal'da monetizasyon ayarı yapılmalı (MUST).
- [ÇELİŞKİLİ] Sayfa özeti "in-game advertising strictly prohibited" diyor; ayrıntılı maddeler `ytgame.ads`'e izin veriyor. **Ayrıntılı maddeler esas.**

### 5.8 SDK API referansı (ytgame) [RESMÎ, 2026-06-04]

Kaynak: https://developers.google.com/youtube/gaming/playables/reference/sdk , https://developers.google.com/youtube/gaming/playables/reference/getting_started (2026-06-02). TypeScript tanımları: https://www.youtube.com/playablesportal/static/youtube_ytgame_web_deploy_mpm_files/index.d.ts

| Ad alanı | Üye | Not |
|---|---|---|
| (üst) | `IN_PLAYABLES_ENV`, `SDK_VERSION`, `SdkError` (`errorType`: `API_UNAVAILABLE \| INVALID_PARAMS \| SIZE_LIMIT_EXCEEDED \| UNKNOWN`) | `catch`'te hata nesnesi `undefined` gelebilir. Yerelde SDK **no-op** |
| `game` | `firstFrameReady()` | Yükleme ekranındayken |
| `game` | `gameReady()` | Etkileşim başlayınca |
| `game` | `loadData(): Promise<string>` / `saveData(data: string): Promise<void>` | Geçerli UTF-16 string, ≤ 3 MiB |
| `system` | `getLanguage(): Promise<string>` | BCP-47 etiketi |
| `system` | `isAudioEnabled()`, `onAudioEnabledChange(cb)` | Abonelikten çıkış fonksiyonu döner |
| `system` | `onPause(cb)`, `onResume(cb)` | Pause sonrası resume garanti değil; pause = kaydetmek için kısa pencere |
| `engagement` | `sendScore({value})` | Tam sayı, ≤ `Number.MAX_SAFE_INTEGER` |
| `engagement` | `openYTContent({id, contentType: VIDEO\|PLAYABLE})` | Video veya başka Playable açar |
| `ads` | `requestInterstitialAd()` | Gösterim garanti değil; ödül için kullanma |
| `ads` | `requestRewardedAd(rewardId): Promise<boolean>` | `rewardId` her ödül türü için sabit, kullanıcı verisi içermez |
| `health` | `logError()`, `logWarning()` | Best-effort, hız sınırı var |

### 5.9 En küçük çalışan Playable iskeleti

> **[TAHMİN]** Bu iskelet resmî API'ye göre kurulmuştur; çalıştırılmadı ve Test Suite'ten geçirilmedi. Sertifikasyon öncesi denenmeli. ZIP kökünde: `index.html`, `game.js` (isteğe bağlı `assets/`).

`index.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <!-- SDK, oyun kodundan ÖNCE (Integration 1.1) -->
  <script src="https://www.youtube.com/game_api/v1"></script>
  <style>
    html,body{margin:0;height:100%;overflow:hidden;background:#000}
    canvas{display:block;width:100%;height:100%;touch-action:none}
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script src="game.js"></script>
</body>
</html>
```

`game.js`:

```js
const yt = (typeof ytgame !== 'undefined' && ytgame.IN_PLAYABLES_ENV) ? ytgame : null;
const c = document.getElementById('c');
const ctx = c.getContext('2d');

let state = { best: 0, score: 0 };
let paused = false, audioOn = true, raf = 0;
let loaded = false;                 // Integration 4.3: loadData bitmeden saveData yok

function resize() {                 // Android'de viewport önce 0 olabilir
  if (!innerHeight) return;
  const d = devicePixelRatio || 1;
  c.width = innerWidth * d;
  c.height = innerHeight * d;
}
addEventListener('resize', resize);
resize();

function draw() {
  ctx.fillStyle = '#123';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#fff';
  ctx.font = `${Math.max(12, c.height / 12)}px sans-serif`;
  ctx.fillText(`Score ${state.score}  Best ${state.best}`, 20, c.height / 2);
}

function loop() {
  if (paused) return;
  draw();
  raf = requestAnimationFrame(loop);
}

async function save() {
  if (!yt || !loaded) return;
  try { await yt.game.saveData(JSON.stringify({ best: state.best })); } catch (e) {}
}

c.addEventListener('pointerdown', async () => {   // dokunma + fare tek olayla
  if (paused) return;
  state.score++;
  if (state.score > state.best) {
    state.best = state.score;
    await save();                                  // Integration 3.2: kayıt ve skor aynı
    if (yt) try { yt.engagement.sendScore({ value: state.best }); } catch (e) {}
  }
});

(async function init() {
  draw();                                          // yükleme/splash ekranı
  if (yt) {
    yt.game.firstFrameReady();
    audioOn = yt.system.isAudioEnabled();
    yt.system.onAudioEnabledChange(v => { audioOn = v; /* ses motorunu aç/kapat */ });
    yt.system.onPause(() => { paused = true; cancelAnimationFrame(raf); save(); });
    yt.system.onResume(() => { paused = false; loop(); });
    try {
      const s = await yt.game.loadData();
      if (s) state = { ...state, ...JSON.parse(s), score: 0 };
    } catch (e) {}
    // const lang = await yt.system.getLanguage();  // 'tr' / 'en' ... (navigator.language YASAK)
  }
  loaded = true;
  loop();
  if (yt) yt.game.gameReady();                     // etkileşime hazır
})();
```

**Yerel test:**

1. Gzip açık bir yerel sunucu (`npx serve` vb.) — ilk paket boyutu sıkıştırma sonrası ölçülür.
2. Chrome DevTools Local Overrides ile `index.html` yanıtına Bölüm 5.2'deki CSP başlığını ekle; konsolda CSP ihlali var mı bak.
3. Chrome DevTools: cihaz/katlanabilir telefon simülasyonu, heap snapshot (512 MB), Network (ilk yük), Performance (FPS). [RESMÎ, FAQ]
4. Gerçek davranış ancak Developer Portal'daki **Dev Link + Test Suite** ile doğrulanır; SDK yerelde no-op. "Sandbox" adında ayrı bir ürün bulunamadı.
5. Yerelde geliştirme kolaylığı için `IN_PLAYABLES_ENV` false iken basit bir **mock SDK** (konsola yazan sahte `ytgame`) kullanılabilir. [TAHMİN]

### 5.10 Sertifikasyon kontrol listesi

- [ ] SDK script'i ilk sırada
- [ ] Yükleme ekranındayken `firstFrameReady`, menü hazır olunca `gameReady`
- [ ] `loadData` sonucu beklenmeden `saveData` çağrılmıyor; eski kayıtlar hatasız yükleniyor
- [ ] Kayıt < 3 MiB (hedef 500 KiB), çıkışta 64 KiB'tan büyük kayıt yok
- [ ] `localStorage`/IndexedDB ilerleme için kullanılmıyor
- [ ] `onPause` gelince döngü, ses, render, ağ duruyor; Page Visibility API yok
- [ ] `isAudioEnabled` / `onAudioEnabledChange` uygulanmış; genel sessiz düğmesi yok; ses kullanıcı tıklamasını beklemiyor
- [ ] Dokunma + fare (+ klavye), tüm en-boy oranları, yön kilidi yok, resize sonrası durum korunuyor
- [ ] Sıfır boyutlu viewport ele alınıyor; her DPI'da net görüntü
- [ ] Harici ağ çağrısı yok (yalnızca Google Fonts), analitik yok
- [ ] Harici link, paylaşım istemi, çıkış düğmesi, login benzeri ekran, QR benzeri grafik, kişisel veri isteme yok
- [ ] İngilizce desteği var; dil `getLanguage` ile alınıyor
- [ ] İlk paket < 30 MiB (hedef 15), tek dosya < 30 MiB (hedef 512 KiB), toplam < 250 MiB, ≤ 8000 dosya, göreli yollar, ASCII dosya adları
- [ ] Heap < 512 MB, yükleme < 5 sn
- [ ] Kod gizleme yok; `eval`, worker ve WASM'den mümkünse kaçınılmış
- [ ] Reklam yalnızca `ytgame.ads`; reklam başarısız olursa yedek mantık var; interstitial ödül için kullanılmıyor
- [ ] Özgün içerik, müzik lisansı tamam, 13+ uygun, çocuklara yönelik değil
- [ ] Metadata ve küçük resimler logosuz, yanıltıcı değil; içerik bitince oyuncuya bildiriliyor
- [ ] Varlık lisans listesi (`LICENSES.md`) tutuluyor

---

## 6. Araç / motor seçimi

**Resmî liste:** BabylonJS, Cocos, Construct, Defold, melonJS, Phaser, PixiJS, PlayCanvas, React, three.js, Godot, Unity — WebGL/Canvas web çıktısı veren her motor uygun. [RESMÎ]
**Resmî örnekler:** Flutter web, PixiJS, Phaser 3 (Vite şablonu), Unity wrapper, Godot wrapper, bundle analyzer — https://github.com/google/web-game-samples , https://developers.google.com/youtube/gaming/playables/samples/oss_samples [RESMÎ]. Cocos, Construct, Defold, PlayCanvas için resmî örnek yok.

### 6.1 Karşılaştırma tablosu

| Araç | Güncel durum | Lisans / ücret | Playables uyumu | Öğrenme | Not |
|---|---|---|---|---|---|
| **Phaser** (JS/TS, 2D) | v4.2.1, 9 Temmuz 2026 [RESMÎ, phaser.io]; v4.0.0 10.04.2026 [3. TARAF] | Ücretsiz, açık kaynak (MIT — [TAHMİN], lisans sayfası okunmadı) | Çok uygun; çıktı birkaç MB, WASM yok [TAHMİN] | Orta (JS/TS) | Resmî Playables örneği (Phaser 3). Kurulum: `npm create @phaserjs/game@latest` [RESMÎ]. Eğitimlerin çoğu Phaser 3; AI'a sürüm açıkça söylenmeli |
| **Saf HTML5/JS + Canvas** | — | — | En küçük paket, en düşük Privacy 7 riski | AI ile kolay | Çok küçük oyunlar için ideal |
| **PixiJS** (2D render) | — | Açık kaynak | Çok uygun | Orta | Resmî örnek var [RESMÎ] |
| **KAPLAY** (eski Kaboom) | v3001, MIT [3. TARAF] | Ücretsiz | Çok küçük | Çok kolay | Prototip için iyi; Kaboom bakımsız |
| **Excalibur.js** (TS) | 0.32.x, 1.0 öncesi [3. TARAF] | BSD-2 | Küçük | Orta | API kırılabilir |
| **Godot 4** (GDScript) | Doküman 4.7 [RESMÎ] | MIT, ücretsiz | Uygun; `.wasm` gzip ile ~1/4; `.pck` ile parça yükleme [RESMÎ] | Orta; görsel editör | Resmî Godot wrapper (yalnızca GDScript). 4.3'ten beri thread'siz web export varsayılan, COOP/COEP gerekmez [RESMÎ] |
| **Godot 4 C#** | "Projects written in C# using Godot 4 currently cannot be exported to the web" [RESMÎ, docs 4.7] | — | **Kullanılamaz** | — | 4.7/4.8'de gelebileceği forum spekülasyonu [3. TARAF] |
| **Unity 6 (Web)** | 6.3 LTS; iOS Safari 15+, Android Chrome 58+ [RESMÎ] | Personal ücretsiz (yıllık gelir/fon < 200 bin $), Runtime Fee iptal, splash isteğe bağlı [RESMÎ, 12.09.2024]; Pro 2.200 $/yıl/koltuk | Zorlayıcı: Unity gzip/brotli **desteklenmiyor**, Compression=Disabled; YouTube sıkıştırıyor (~25 → ~7 MiB `.wasm`); 30 MiB üstü dosyada elle zip; Addressables önerilir [RESMÎ, 26.05.2026]. Boş proje ~3,3–4,7 MB, ~200 MB bellek [3. TARAF] | C# bilene kolay, editör ağır | Boyut, heap ve mobil performansta en çok zorlanacak seçenek [TAHMİN] |
| **Construct 3** (kodsuz) | Tarayıcıda | Ücretsiz: 50 event, 2 katman, **para kazanma/reklam yok** [RESMÎ]; Personal 42–100 $/yıl [ÇELİŞKİLİ, 3. TARAF] | Uygun | En kolay | Ücretsiz sürüm gelir için yetersiz |
| **GDevelop** (kodsuz) | MIT [RESMÎ] | Ücretsiz plan: 3 bulut projesi, 40 AI kredisi/ay; ücretli fiyat okunamadı | Uygun [TAHMİN] | Çok kolay | Ücretsiz planda filigran olup olmadığı netleşmedi |
| **PlayCanvas** (3D web) | Motor MIT [3. TARAF] | Ücretsiz plan (açık projeler, 1 GB); Personal 15 $/ay [RESMÎ] | Uygun | Orta–zor | 3D |
| **three.js / Babylon** (3D) | — | Açık kaynak | Listede var, rehber yok | Orta–zor | 3D hiper-casual (ör. runner) için |
| **Flutter web** | — | Açık kaynak | Resmî örnek var | Orta (Dart) | — |

Motor bazında FPS/performans ölçütü belgede **yok**.

### 6.2 Durum → Sonuç (motor)

| Durum | Öneri |
|---|---|
| Hiç programlama bilmiyorsun, AI ile çalışacaksın | **Phaser + TypeScript + Vite** veya saf Canvas; AI en çok bu ekosistemde örnek görmüş [TAHMİN]. Alternatif: GDevelop/Construct (kodsuz) — ama Construct ücretsiz sürümü gelir için yetersiz |
| JavaScript/TypeScript biliyorsun | Phaser veya PixiJS |
| C#/.NET, Java gibi başka dilden geliyorsun | TypeScript'e geçiş kolay (benzer tip sistemi) → Phaser. Görsel editör istersen Godot **GDScript** (Godot C# web'e çıkmıyor) |
| Unity'yi zaten biliyorsun | Unity Web mümkün; boyut, sıkıştırma ve 512 MB heap için optimizasyonu göze al |
| 3D istiyorsun | three.js / Babylon / PlayCanvas; paket boyutunu sıkı takip et |
| Python biliyorsun | Playables için Python web çıktısı resmî listede yok → JS/TS'e geç [TAHMİN] |

---

## 7. AI asistanla (Claude) birlikte geliştirme

> Bu bölüm büyük ölçüde **[TAHMİN]**'dir; AI ile oyun geliştirmenin zayıf yönlerini sistemli inceleyen güvenilir kaynak bulunamadı. Bilinen örnek: bir geliştirici Phaser 3 ile Breakout klonunu Claude Code ile ~2 saatte yazmış [3. TARAF] — https://blog.lmorchard.com/2025/07/10/breakout-with-claude/ . Topluluğun Phaser 4 skill'leri de var [3. TARAF] — https://www.skills.sh/yakoub-ai/phaser4-gamedev/phaser-init . "Bir haftada oyun" türü iddialar pazarlamadır.

### 7.1 "Hiç bilmesem seninle yapabilir miyiz?"

| Okurun durumu | Gerçekçi mi? |
|---|---|
| Hiç programlama bilmiyor | Basit 2D oyun için evet; ama terminal, Node.js, git, hata mesajı okumayı öğrenmek gerekir. Kapsam çok küçük tutulmalı (tek ekran, tek mekanik) |
| Başka bir dilde yazılımcı | Evet, rahat. Kod okuma ve hata ayıklama yeterli; oyun kavramları (game loop, delta time, sahne, sprite) 1–2 haftada öğrenilir |
| Oyun geliştirmiş | Evet; AI özellikle SDK entegrasyonu ve kontrol listesinde zaman kazandırır |
| Herkes için | **Asıl darboğaz kod değil:** Playables erişim onayı, görsel kalite, eğlencenin tutturulması |

### 7.2 İş bölümü

| AI'ın iyi olduğu | AI'ın zayıf olduğu | İnsanın işi |
|---|---|---|
| Proje iskeleti (Vite + TS + Phaser), build script'leri | Özgün piksel/vektör sanat, animasyon (kod asistanı üretemez) | Fikir, hedef kitle, kapsamı küçük tutmak |
| Oyun döngüsü, hareket, çarpışma, spawn, skor, zorluk eğrisi kodu | Müzik ve kaliteli ses | Her gün oynayıp geri bildirim vermek |
| UI/menü, responsive ölçek, touch/fare/klavye | "Oyun hissi", denge, eğlence | Varlık seçimi ve lisans takibi (Kenney CC0 vb.) |
| SDK entegrasyonu, mock SDK, save/load sarmalayıcı | Büyük projede bağlam kaybı, tutarsızlık | Gerçek telefonda test |
| Kontrol listesi, paket boyutu ölçen script, refactor, test | Yeni API'ler (Phaser 4) yerine eski API önermek | Başvuru formu, mağaza/kanal metinleri |
| Prosedürel grafik (şekil, parçacık, ekran sarsıntısı), jsfxr ses parametreleri | Gerçek cihaz performans profili | Sertifikasyonun öznel kısımları |

### 7.3 Çalışma kuralları

- Küçük adımlarla ilerle: her özellikten sonra **oyna ve commit at**.
- Projeye bir `CLAUDE.md` koy: motor ve sürümü (ör. "Phaser 3.x" veya "Phaser 4.x — v3 API önerme"), Playables kuralları (bu dosyanın Bölüm 5'i), klasör yapısı, varlık lisans listesi.
- Resmî doküman bağlantısını prompt'a ekle; AI'dan "bu API bu sürümde var mı?" kontrolü iste.
- Her yeni özellikte AI'dan **Bölüm 5.10 kontrol listesine** göre öz-denetim iste.

### 7.4 Örnek iş akışı ve prompt kalıpları

```text
1) Kurulum
"Phaser <SÜRÜM> + TypeScript + Vite ile boş bir proje kur. Tek sahne, ortada dönen bir kare.
Phaser Scale Manager ile her en-boy oranına uysun, yön kilidi olmasın. npm run dev ile çalışsın."

2) Çekirdek mekanik
"Oyun fikri: <tek cümle>. Sadece çekirdek mekaniği gri kutularla yap: <girdi> → <sonuç>.
Skor ve yeniden başlatma olsun. Dokunma ve fare aynı pointer olayıyla çalışsın. Grafik yok."

3) His (juice)
"Çarpışmada ekran sarsıntısı, skor artışında küçük parçacık efekti ekle. Prosedürel, harici dosya yok."

4) Playables SDK
"src/platform/yt.ts adında bir sarmalayıcı yaz: IN_PLAYABLES_ENV false ise konsola yazan mock kullansın.
firstFrameReady → loadData (await) → gameReady sırası; saveData yalnızca loadData bittikten sonra;
onPause'da update/render/ses dursun, Page Visibility API kullanma; isAudioEnabled/onAudioEnabledChange;
getLanguage ile tr/en metin seçimi (navigator.language kullanma); sendScore en iyi skorla kayıt aynı."

5) Reklam noktaları
"Bölüm sonunda requestInterstitialAd, 'ekstra can' için requestRewardedAd('extra_life') ekle.
Reklam başarısız olursa oyun normal devam etsin; interstitial ödül vermesin; reklam sırasında oyun ve ses dursun."

6) Denetim
"Projeyi şu kontrol listesine göre denetle: <Bölüm 5.10>. Dış URL çağrısı, localStorage, eval,
Page Visibility, dış link, login benzeri ekran var mı? İlk paket ve en büyük dosya boyutunu ölçen
bir script yaz (gzip sonrası)."

7) Paketleme
"dist/ klasörünü kökte index.html olacak şekilde ZIP'le; göreli yollar, ASCII dosya adları, ≤ 8000 dosya kontrolü yap."
```

---

## 8. Baştan sona başlangıç rehberi

### 8.1 Hazırlık kontrol listesi

**Hesaplar**

- [ ] Google hesabı (2 adımlı doğrulama açık — YPP için de şart [RESMÎ])
- [ ] YouTube kanalı (Playables onboarding kanala bağlanır [RESMÎ]; geçmişi değerlendirmede dikkate alınır)
- [ ] (Gelir aşamasında) AdSense for YouTube hesabı, vergi bilgisi (W-8)
- [ ] (İsteğe bağlı) itch.io hesabı — Playables onayı beklerken yayın için
- [ ] (İsteğe bağlı) GitHub hesabı — kod yedeği ve GitHub Pages ile kendi site

**Araçlar**

- [ ] Node.js LTS, npm, Git, VS Code (veya başka editör)
- [ ] Phaser şablonu: `npm create @phaserjs/game@latest` → `npm install` → `npm run dev` [RESMÎ]
- [ ] (Godot seçilirse) Godot 4.x standart (GDScript) + web export şablonları
- [ ] Chrome DevTools (cihaz simülasyonu, heap, network, performance)
- [ ] (İsteğe bağlı) Android Studio emülatörü (katlanabilir cihaz testi)
- [ ] Gerçek cihaz: en az bir orta segment Android, mümkünse bir iPhone (512 MB heap aşımında iPhone çökmesi riski için) [TAHMİN]
- [ ] Ekran kaydı aracı (tanıtım videoları/Shorts için)

**Varlıklar**

- [ ] Kenney.nl (CC0, atıf gerekmez, Kenney logosu kullanılmaz) [RESMÎ] — https://kenney.nl/support
- [ ] OpenGameArt (her varlığın lisansı ayrı kontrol) [RESMÎ] — https://opengameart.org/content/faq
- [ ] Google Fonts (OFL; lisans dosyası oyunla verilir)
- [ ] jsfxr/sfxr ile prosedürel ses efektleri
- [ ] CC0 veya açıkça "oyunda kullanılabilir" lisanslı müzik
- [ ] `LICENSES.md` — her varlık: kaynak, lisans, atıf metni

### 8.2 Hafta hafta plan [TAHMİN, gereksinimlere göre kuruldu]

**Paralel yol:** Oyun oynanabilir hâle gelince (hafta 3–4) Playables formunu gönder. Onay gelmezse aynı oyun itch.io, kendi site (GitHub Pages) veya CrazyGames'te yayımlanabilir. Poki'nin münhasır anlaşmasına Playables hedefin varsa dikkat et (Bölüm 13).

| Hafta | İş | Çıktı |
|---|---|---|
| 0 | Araç kurulumu; Phaser "Making your first Phaser game" eğitimini AI ile birlikte yap | Çalışan örnek oyun |
| 1 | Fikir: tek ekran, tek mekanik, 30 sn–3 dk oturum, dokunmatik + fare. 3 fikirden kâğıt prototip seç (Bölüm 11) | Tek sayfalık tasarım notu |
| 2 | Gri kutu prototip: çekirdek mekanik, skor, yeniden başlatma; responsive; touch/fare/klavye | Oynanabilir prototip |
| 3 | 3–5 kişiyle oyun testi; denge, zorluk eğrisi, juice | Eğlenceli çekirdek |
| 4 | Varlıklar (Kenney CC0 / kendi çizim), ses (sfxr), lisans listesi; **Playables formunu gönder** | Görsel/sesli sürüm |
| 5 | SDK: mock SDK, `firstFrameReady`/`gameReady`, save/load (eski sürüm uyumu), pause/resume, ses, `getLanguage` ile TR/EN, `sendScore`, reklam noktaları | Playables'a hazır kod |
| 6 | Performans/boyut: ilk paket < 15 MiB, dosyalar < 512 KiB, < 5 sn, heap ölçümü; dış URL/link/login yok | Kontrol listesi tamam |
| 7 | (Onay varsa) Dev Link + Test Suite, gerçek cihaz, düzeltme, sertifikasyon. (Onay yoksa) itch.io / CrazyGames Basic Launch | Yayında oyun |
| 8+ | Gameplay videosu, "nasıl oynanır" Shorts, kanalda tanıtım; geri bildirimle güncelleme | Büyüme döngüsü |

### 8.3 Ücretsiz öğrenme kaynakları

**Resmî (İngilizce)**

- Phaser — Making your first Phaser game: https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game
- Phaser — Create Game App: https://phaser.io/tutorials/create-game-app
- Phaser 4 + Vite + TS kurulum yazısı (17.04.2026) [3. TARAF]: https://emanueleferonato.com/2026/04/17/getting-started-with-phaser-4-vite-typescript-setup-using-the-official-create-game-app/
- Godot — Your first 2D game: https://docs.godotengine.org/en/stable/getting_started/first_2d_game/
- Godot — Web export: https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html
- Playables örnekleri: https://developers.google.com/youtube/gaming/playables/samples/phaser , …/godot_wrapper , …/unity_wrapper

**Türkçe**

- BTK Akademi: "Unity ile Dijital Oyun Geliştirmeye Giriş" ve "Oyunlaştırma Tasarım Temelleri" listeleniyor [3. TARAF]; site bizzat doğrulanamadı. Phaser/Godot kursu bulunamadı.
- Techcareer.net — Unity ile Oyun Geliştirme (~6 saat, ücretsiz) [3. TARAF]: https://www.techcareer.net/courses/unity-ile-oyun-gelistirme
- Türkçe Phaser/Godot içeriği zayıf; ana yol İngilizce resmî doküman + AI asistan. [TAHMİN]

---

## 9. Para kazanma ve para nasıl alınır

### 9.1 Playables geliri

**Reklam türleri** [RESMÎ] — https://developers.google.com/youtube/gaming/playables/reference/monetization (2026-06-01)

| Tür | Nasıl | Not |
|---|---|---|
| Pre-roll | Yüklenirken; YouTube otomatik ekler | Entegrasyon gerekmez |
| Interstitial | `ytgame.ads.requestInterstitialAd()`, doğal molalarda | Gösterim garanti değil |
| Rewarded | `ytgame.ads.requestRewardedAd(id)`, oyuncu isteyerek izler | Mediacube'e göre en yüksek CPM [3. TARAF] |

- Entegrasyon "yaklaşık 5 dakika"; türler Portal'dan kapatılabilir, varsayılan açık. Reklamlar uygun bölge/platformlardaki kullanıcıların **bir kısmına** gösterilir; başarısızlıkta yedek mantık gerekir. [RESMÎ]
- **Gelir paylaşımı:** "We are in the initial phase of Playables monetization… piloting revenue sharing with a select number of Playable creators… aim to align with the broader YouTube monetization programs over time." **Yüzde, eşik, ödeme takvimi, uygunluk ölçütü belgede yok.** [RESMÎ]
- [ÇELİŞKİLİ] Developer Portal sayfası (2025-10-16) monetizasyon ayarlarının "henüz son kullanıcı deneyimini değiştirmediğini" söylüyor; 2026 tarihli monetizasyon sayfası reklamların gösterildiğini söylüyor → **daha yeni sayfa esas**.
- [ÇELİŞKİLİ] Haber kaynakları geliştiriciye ödemenin "netleşmediğini", yayıncılar "ödendiğini" söylüyor.
- **IAP:** Şu an yok. YouTube'dan bir yöneticinin LinkedIn yorumuna göre 2027'de test hedefleniyor [3. TARAF]; Mediacube "2026 sonu veya 2027" diyor [ÇELİŞKİLİ]; resmî doğrulama yok.
- **Sabit ödeme/fon programı:** bulunamadı.

**Pilot katılımcılarının aktardıkları** [3. TARAF, tanıtım amaçlı, doğrulanmadı]

- Ödeme AdSense altyapısı üzerinden (Mediacube).
- Premium aboneler reklam görmüyor; oynama süresine göre abonelik payı verildiği iddia ediliyor.
- Toplam günlük gelir 48 saat gecikmeyle; oyun bazlı rapor her ayın 15'inde, önceki ay için.
- Fill rate %100 değil; interstitial'ı 4.–5. bölüm civarında başlatmak öneriliyor.
- Mediacube portföy geliri Mayıs→Haziran 2026 ~10 kat artmış; Playgama kapalı betada oyun başına ortalama ~**3.100 $/ay** demiş (tek geliştiricinin rakamı, platform ortalaması değil). Playgama Temmuz 2026: ~50 aktif oyun, Haziran'da ~57 milyon oynanma.
- Tall Man Run (~106–108 milyon), Build A Queen (100M+), Snake Clash (~97M) gibi en çok oynananlar büyük stüdyo oyunları.
- Analitik (Temmuz 2026'dan beri): oynanma sayısı + yaş/coğrafya/cinsiyet; oturum süresi, DAU/MAU, retention yok.
- **Bağımsız gelir verisi bulunamadı.**

### 9.2 Gameplay / oyun video kanalı geliri

**YPP şartları** [RESMÎ]

| Kademe | Şart | Açtıkları |
|---|---|---|
| Alt kademe | 500 abone + son 90 günde 3 herkese açık yükleme + (12 ayda 3.000 saat **veya** 90 günde 3M Shorts) | Kanal üyeliği, Super Thanks, Super Chat, Shopping — https://support.google.com/youtube/answer/13429240 |
| Tam kademe | 1.000 abone + (12 ayda 4.000 saat **veya** 90 günde 10M Shorts); Shorts akışı izlenme saati 4.000'e sayılmaz | Reklam geliri, Premium payı — https://support.google.com/youtube/answer/72851 |
| Ortak | Para kazanma politikalarına uyum, YPP'nin açık olduğu ülkede yaşamak (Türkiye listede), aktif ihtar yok, 2 adımlı doğrulama, gelişmiş özellik erişimi, tek AdSense for YouTube hesabı | |

- **01.02.2027 değişikliği:** YPP koşulları güncelleniyor; mevcut ortaklar yeni koşulları 31.01.2027'ye kadar Studio'da kabul etmeli [RESMÎ — https://support.google.com/youtube/answer/72851 ; sayfa yeni eşikleri listelemiyor]. Yeni başvuranlar için 01.02.2027'den itibaren reklam eşiği **8.000 nitelikli saat (12 ay) veya 20M Shorts (90 gün)**; **mevcut YPP ortakları etkilenmez** (grandfathered). Duyuru YouTube resmî blogunda 10.08.2026'da yapıldı [3. TARAF, birden çok kaynak tutarlı] — https://vidiq.com/blog/post/youtube-partner-program-changes-2027/ , https://www.netinfluencer.com/youtube-raises-bar-for-new-creators-to-join-partner-program-tightens-shorts-payout-threshold/ . Abone eşiğinin 1.000'de kalması [ÇELİŞKİLİ]: bazı kaynaklar 1.000 diyor, NetInfluencer duyuruda abone sayısı belirtilmediğini söylüyor.

**Gelir payları**

- **Shorts** [RESMÎ] — https://support.google.com/youtube/answer/12504220 : Ülke bazlı havuz, müzik lisansı payı düşülür, kanala etkileşimli görüntüleme oranıyla pay ayrılır, yapımcı bunun **%45**'ini alır. Resmî örnek: ülke Shorts geliri 100.000 $ → müzik sonrası 90.000 $ → %1 pay = 900 $ → yapımcıya 405 $. Aylık Shorts reklam ve Premium payı, **her ay için** son 90 günde ≥ 10M nitelikli Shorts görüntülemesi şartına bağlıdır (sürekli şart). 01.02.2027'den itibaren 90 günlük pencere ödeme yapılan aydan önceki ayın 15'inde biter. Eşiğin altında kalan kanal YPP'de kalır ve uzun video gelirini almaya devam eder; yalnızca o ayın Shorts payını alamaz. [RESMÎ]
- **Uzun video:** Watch Page Monetization Module — herkese açık videolarda izleme sayfasındaki ve gömülü oynatıcıdaki reklamların net gelirinin **%55**'i yapımcıya. [RESMÎ] — https://support.google.com/youtube/answer/72902
- **Fan funding (kanal üyeliği, Super Chat, Super Stickers, Super Thanks):** genişletilmiş YPP'nin **alt kademesinde** açılır (yukarıdaki tablo). Yapımcı payı geçerli vergi ve ücretler düşüldükten sonra **%70**; kanal sahibi 18+. [RESMÎ] — https://support.google.com/youtube/answer/13429240 , https://support.google.com/youtube/answer/7636690

**Oyun nişinde RPM** [3. TARAF / TAHMİN]

- Uzun oyun videoları: CPM 2–9 $, RPM 0,50–4 $ (MilX, 16.03.2026). Başka blog: 0,70–2 $, nişler arasında en düşük kademe (genç kitle).
- Türkiye izleyicisinin RPM'i ABD'nin ~0,12–0,22 katı [3. TARAF].
- Shorts RPM ≈ 0,02–0,10 $/1.000 [TAHMİN; sağlam kaynak yok].
- Kaba hesap [TAHMİN]: ayda 100.000 uzun video görüntülemesi → Türkçe/TR izleyicili kanal ~10–60 $/ay; İngilizce/global kanal ~50–300 $/ay. Doğrulanmış Türkiye oyun RPM'i bulunamadı.

**Oyun videosunda para kazanma riski:** yorumsuz ham oyun görüntüsü "reused/inauthentic content" nedeniyle reddedilebilir (Bölüm 10.6).

### 9.3 Para nasıl alınır — ödeme altyapısı

| Kanal | Ödeme yolu | Kaynak |
|---|---|---|
| Gameplay kanalı (YPP) | AdSense for YouTube | RESMÎ |
| Playables (doğrudan pilot) | AdSense olduğu söyleniyor; Playables'a özel ödeme belgesi **yok** | 3. TARAF |
| Playables (yayıncı üzerinden) | Yayıncı öder (ör. Mediacube MCPay: 80+ para birimi, banka havalesi, kripto dahil 12+ yöntem) | 3. TARAF |
| Diğer portallar | Bölüm 13 | |

**AdSense genel kuralları** [RESMÎ]

- Eşik **100 USD**; TL hesap için sayfa **₺200** gösteriyor (düşük görünüyor; hesap para biriminde kontrol edilmeli) — https://support.google.com/adsense/answer/1709871
- Yöntemler: EFT, havale, çek, Western Union, PayPal Hyperwallet — Türkiye'de hangilerinin açık olduğu sayfada yok.
- Takvim: önceki ay kazancı ayın 3'ünde kesinleşir; ödeme bilgisi/eşik için son gün 20'si; ödeme 21–26'sı arası; EFT ≤ 7 iş günü, havale ≤ 15 iş günü — https://support.google.com/adsense/answer/7164703
- **PayPal** Türkiye'de 06.06.2016'dan beri para gönderme/alma için kapalı; geri döndüğüne dair duyuru bulunamadı [3. TARAF + TAHMİN].

### 9.4 Vergi

**ABD stopajı (YouTube/AdSense)** [RESMÎ] — https://support.google.com/youtube/answer/10391362

- Nerede yaşarsa yaşasın herkes vergi bilgisini (W-8 formu; araç doğru formu seçtirir) vermek zorunda.
- Geçerli ABD vergi bilgisi (W-8BEN) verildiyse stopaj yalnızca **ABD'li izleyicilerden gelen** kazanca uygulanır; oran anlaşmaya göre %0–30. Verilmediyse aşağıdaki %24 kuralı geçerli.
- 10 Aralık'a kadar verilmezse: bireysel hesapta **dünya genelindeki tüm kazancın %24'ü**, işletme hesabında ABD kazancının %30'u kesilebilir.
- Form geçerliliği imza yılından sonraki 3. takvim yılı sonunda biter; 1042-S 14 Nisan'a kadar.
- Türkiye–ABD anlaşma oranı Türk kaynaklarına göre **%10** [3. TARAF, alomaliye/donanimhaber]; Google sayfası oran vermiyor; mali müşavire danışılmalı.

**Türkiye: GVK mükerrer 20/B istisnası** [3. TARAF, kanun metni alıntılarıyla] — https://www.fatiharas.com/gvk-mukerrer-madde-20-b-sosyal-icerik-ureticiligi-istisnasi/

- Kapsam: internette içerik paylaşanlar + "mobil cihazlar için uygulama geliştirenlerin elektronik uygulama paylaşım ve satış platformları üzerinden" kazancı (7338 s.K., 7491 s.K. ile 01.01.2024'ten genişletildi).
- Şartlar: Türkiye'de bir bankada özel hesap; faaliyetin **tüm** geliri **yalnızca** bu hesaba gelir (tek istisna dışı ödeme istisnayı düşürür); vergi dairesinden istisna belgesi; banka **%15** keser (brüt, gider düşülmez), şartlar sağlanırsa nihai vergi; defter/belge yükümlülüğü yok, belgeler 5 yıl saklanır.
- **2026 sınırı: 5.300.000 TL** = GVK 103. madde tarifesinde **ücret gelirleri için** 4. dilim tutarı (ücret dışı tarifede bu dilim farklıdır, karıştırılmamalı); 332 Sıra No.lu GVK Genel Tebliği, RG 31.12.2025 (5. mükerrer) [3. TARAF: PwC, KPMG; ikincil kaynaklarda RG sayısı 32124 / 33124 farklı geçiyor]. Aşılırsa istisna o yıl düşer, tamamı beyan edilir, kesilen vergi mahsup edilir. Banka sınırı takip etmez. — https://www.pwc.com.tr/tr/hizmetlerimiz/vergi/bultenler/2026/2026-yili-bazi-gelir-vergisi-rakamlari.html
- Şahsi YouTube geliri istisna belgesi olmadan alınırsa ticari kazanç sayılır; izaha davet yazıları gönderiliyor [3. TARAF] — https://www.alomaliye.com/2025/01/27/youtubedan-gelir-elde-edenler-izaha-davet-ediliyor/
- **Gameplay kanalı geliri** 20/B kapsamına açıkça girer [TAHMİN, kanun metnine dayanarak].
- **Playables oyun geliri** [ÇELİŞKİLİ/TAHMİN]: kanun "mobil uygulama" ve "uygulama paylaşım ve satış platformu" diyor; YouTube içinde çalışan HTML5 oyunun buna girip girmediği belirsiz. Yayıncı üzerinden gelen ödeme yurt dışı şirketten hizmet/lisans bedeli sayılıp **şahıs işletmesi gerektirebilir**. **GİB'den özelge veya mali müşavir görüşü alınmalı.**

**Depodaki ilgili rehberler**

- [Şirketsiz gelir — 20/B vergi boyutu](../Sirket-Kurma/12-sirketsiz.html)
- [Genç girişimci istisnası ve YouTube bölümü (29 yaş altı)](../Sirket-Kurma/07-genc-girisimci.html)
- [Vergi 101 — 20/B, %15, 5.300.000 TL özeti](../Sirket-Kurma/03-vergi-101.html)
- [Limited şirket — içerik gelirinin şahıs işletmesiyle faturalanması notu](../Sirket-Kurma/05-limited-sirket.html)
- [SGK/Bağ-Kur — kamu görevlilerinin şahıs işletmesi açma yasağı](../Sirket-Kurma/02-sgk-bagkur.html)

### 9.5 Durum → Sonuç (vergi/ödeme)

| Durum | Sonuç |
|---|---|
| Türkiye'de yaşıyorsun, gelir YouTube kanalından (AdSense) | 20/B istisna hesabı + belge → %15 nihai; ABD izleyicisi kısmında ~%10 ABD stopajı (W-8 ile) |
| Türkiye'de, gelir Playables'tan doğrudan (AdSense) | 20/B kapsamı belirsiz → özelge/mali müşavir |
| Türkiye'de, gelir yayıncı/portaldan (Mediacube, CrazyGames, Poki) | Yurt dışı şirketten ödeme → şahıs işletmesi olasılığı yüksek [TAHMİN] |
| Yıllık gelir 5.300.000 TL'yi aşıyor (2026) | 20/B o yıl düşer; beyanname + muhtemelen şirket |
| 29 yaş altı ve ilk kez işletme açıyorsun | Genç girişimci istisnası değerlendirilebilir → depodaki 07 sayfası |
| 4/a çalışansın | 20/B ve şahıs işletmesi genelde mümkün; iş sözleşmendeki rekabet/yan iş maddelerini kontrol et [TAHMİN] |
| Kamu görevlisisin | Şahıs işletmesi açmak yasak (657 s.K. md. 28); 20/B için kurumdan teyit al |
| Şirketin var | Gelir şirket adına faturalanır; AdSense/portal hesabı şirket adına açılabilir [TAHMİN] |
| Yurt dışında yaşıyorsun | Bulunduğun ülkenin vergi kuralları; ABD stopajı anlaşma oranına göre değişir |
| W-8 vermedin | Bireysel hesapta tüm dünyadaki kazancın %24'ü kesilebilir [RESMÎ] |

### 9.6 Gerçekçi beklenti [TAHMİN]

| Durum | Sonuç |
|---|---|
| Playables'a başvurdun, onay gelmedi | Gelir 0; aynı oyun itch.io/CrazyGames'e konabilir |
| Kabul edildin, gelir pilotunda değilsin | Oyun yayında, gelir 0 (pilot dışı ödeme tanımlı değil) |
| Yayıncı üzerinden girdin | Gelir mümkün, payı yayıncı belirler; beyanlar seçilmiş başarılı oyunlar için ayda yüzlerce–birkaç bin $ |
| Gameplay kanalı, YPP eşiğinin altında | Gelir 0 |
| 01.02.2027 sonrası YPP'ye başvuruyorsun | Eşik 8.000 saat / 20M Shorts [3. TARAF] |
| Türkçe kanal, TR izleyici | 100.000 görüntüleme ≈ onlarca $ |
| İngilizce global kanal | RPM 3–10 kat yüksek olabilir; rekabet de çok yüksek |
| Kendi Playable'ını kendi kanalında tanıtıyorsun | İki gelir birbirini besler; en mantıklı yol ama iki taraf da belirsiz |

**Sonuç:** İlk 6–12 ay için **sıfır gelir varsayarak** plan yap. Playables'ta iki seçici kapı var (geliştirici erişimi + gelir pilotu); gameplay nişinde RPM düşük ve 2027'de YPP eşikleri yükseliyor.

---

## 10. Telif ve hukuk

> Hukuki danışmanlık değildir. Somut durumda fikri mülkiyet avukatına danışılmalı.

### 10.1 Temel ilke: fikir korunmaz, ifade korunur

- **ABD Telif Ofisi:** "The idea for a game is not protected by copyright. The name or title given to the game and the methods for playing it are not protected by copyright." Kural metni ve grafik sanatı korunabilir. [RESMÎ] — https://www.copyright.gov/register/tx-games.html
- **AB — Nintendo v PC Box (C-355/12, 23.01.2014, ECLI:EU:C:2014:25):** Kararın asıl konusu teknolojik koruma önlemleri (konsol korumasını aşan cihazlar). Yan tespit olarak: video oyunu karmaşık eserdir; program + grafik + ses unsurları özgün oldukları ölçüde korunur. [3. TARAF özet; resmî metin CURIA'da] — https://curia.europa.eu/juris/liste.jsf?num=C-355/12 , https://www.ippt.eu/items/ippt20142301-cjeu-nintendo-v-pc-box
- **Türkiye — FSEK (5846):** fikrin değil ifade biçiminin korunması; eser "sahibinin hususiyetini" taşımalı, tescil şartı yok; m.1/B bilgisayar programı tanımı; görsel ve müzik ayrı eser olarak korunabilir. [3. TARAF] "Oyun mekaniği korunmaz" diyen Türk mahkeme kararı **bulunamadı** [TAHMİN].
- **TTK m.55/1-c** başkasının iş ürününden yetkisiz yararlanma, **m.55/1-a-4** iltibas → telif ihlali olmasa bile haksız rekabet olabilir; kasıtlıysa m.62 suç. [3. TARAF] — https://www.erdem-erdem.av.tr/bilgi-bankasi/yeni-turk-ticaret-kanununda-haksiz-rekabet-hukumleri
- Marka ve ürün görünümü 6769 s. SMK ile korunur [TAHMİN, kaynakla doğrulanmadı].

### 10.2 Önemli davalar

- **Tetris Holding v. Xio Interactive** (D.N.J., 30.05.2012, 863 F. Supp. 2d 394): "Mino" klonu tahta boyutu, parça görünümü, renkler, ekran düzenini neredeyse birebir kopyalamıştı → telif + trade dress ihlali. Kurallar korunmaz ama sonsuz alternatif varken ifadeyi birebir kopyalamak ihlaldir. Bölge mahkemesi kararı, emsal gücü sınırlı. [3. TARAF] — https://www.loeb.com/en/insights/publications/2012/06/tetris-holding-llc-v-xio-interactive-inc
- **Spry Fox v. Lolapps/6Waves** (Triple Town / Yeti Town, 2012): mekanik koruması zayıf ama oyun alanı ifadesi çok benzer → reddetme talebi geri çevrildi, sulh. Gerekçe kaynaklar arasında [ÇELİŞKİLİ].
- **NYT – Wordle klonları (2024):** NYT, Ocak–Mart 2024'te (GitHub'a 02.01.2024) Reactle adlı açık kaynak Wordle klonuna ve yüzlerce fork'una DMCA bildirimi gönderdi. NYT açıklaması koşullu: "Wordle markasını **veya telifli oynanışımızı** ihlal etmeyen benzer kelime oyunlarına itirazımız yok." NYT oynanış üzerinde de hak iddia ettiği için (bu belgedeki "mekanik serbest" çerçevesiyle gerilim) ad, renk düzeni (yeşil/sarı/gri) ve ızgara görünümü de farklılaştırılmalı. [3. TARAF, AP] — https://www.wsls.com/business/2024/03/12/the-new-york-times-is-fighting-off-wordle-look-alikes-with-copyright-takedown-notices/ , https://www.wusf.org/2024-03-13/c-e-a-s-e-and-desist-the-new-york-times-goes-after-wordle-spinoffs

### 10.3 Ne korunur, ne korunmaz

| Unsur | Korunur mu? | Güven |
|---|---|---|
| Oyun fikri, kural, mekanik | Telifle korunmaz (patent ayrı) | RESMÎ (ABD), 3. TARAF (TR) |
| Kod | Telifle korunur; aynı işlevi kendi kodunla sıfırdan yazmak genelde serbest, ama başkasının kodunu, yapısını/sırasını/organizasyonunu (SSO) veya görünümünü birebir taklit etmek ihlal olabilir (bkz. Tetris v. Xio) | RESMÎ (koruma: https://www.copyright.gov/circs/circ61.pdf) + TAHMİN (sınır) |
| Grafik, sprite, ikon, UI düzeni, renk/yerleşim birlikteliği | Korunur; birebir taklit ihlal | 3. TARAF |
| Müzik, ses efekti | Korunur | RESMÎ / 3. TARAF |
| Karakter (görünüş, isim) | Telif + marka | TAHMİN |
| Oyun adı, logo | Telifle değil, markayla; karıştırılma riski ihlal | RESMÎ + 3. TARAF |
| Mağaza sayfası/küçük resim benzerliği | Playables kural 1.3 ve 2.3 | RESMÎ |

### 10.4 Patentli mekanikler

- **Warner Bros "Nemesis System"** — US 10,926,179. Verilme **23.02.2021** [3. TARAF]. Başvuru 2015 veya 2016 olarak bildiriliyor; bitiş ~2035–2036 (KitGuru: 11.08.2036) [ÇELİŞKİLİ]. Kesin tarih için USPTO/Google Patents kaydı kontrol edilmeli. — https://www.finnegan.com/en/insights/articles/will-101-be-a-nemesis-to-warner-brothers-patent.html , https://www.patentarcade.com/2021/02/warner-brothers-granted-patent-for-nemesis-system-from-middle-earth-video-games.html , https://www.kitguru.net/gaming/matthew-wilson/warner-bros-nemesis-system-patent-wont-expire-until-2036/
- **Nintendo/The Pokémon Company – Pocketpair (Palworld):** Eylül 2024'te Tokyo Bölge Mahkemesi'nde 3 Japon patentiyle (JP7545191, JP7493117, JP7528390: top fırlatarak yakalama, yaratığa binme/binekle hareket) dava açıldı. Kasım 2025'te talepler yalnızca Pocketpair'in mekanikleri yamayla değiştirmesinden önceki (Early Access) sürümlerle sınırlandı. İhtiyati tedbir yok; Palworld 1.0 Temmuz 2026'da çıktı. Talep ~10 milyon yen; duruşma 01.10.2026'da yapıldı, karar 09.11.2026'da bekleniyor. [3. TARAF] — https://www.patentarcade.com/?p=7128 , https://gamesfray.com/ahead-of-october-1-court-hearing-nintendo-has-zero-chance-of-prevailing-over-current-palworld-versions-it-may-get-30k-chump-change/ . **Ders:** mekaniği değiştirerek (yamayla) risk azaltılabildi.
- Patent ülkeye özgüdür; küçük HTML5 oyunu için risk düşük ama büyük stüdyoların imza mekaniklerini birebir taklit etme [TAHMİN].

### 10.5 Klasik oyunlar

| Oyun | Durum | Risk |
|---|---|---|
| Satranç, dama, tavla, go, mangala, solitaire, okey, pişti, batak | Kurallar kamu malı; görselleri kendin yap; ticari ürün adlarını ("101 Okey Plus" vb.) kullanma | Çok düşük [TAHMİN] |
| Snake, Pong, Breakout, Asteroids tarzı | Mekanik serbest; ad ve marka (ör. "Pong", Atari) kullanma | Düşük |
| Mayın tarlası | Microsoft görsellerini kopyalama | Düşük |
| 2048 | Orijinali MIT lisanslı açık kaynak (2014); lisans metni korunarak kod bile kullanılabilir; Threes'in ad/görseline dikkat | Düşük [3. TARAF] |
| **Tetris** | Ad ve trade dress (10×20 tahta, renkli tetromino, düşüş görünümü) agresif korunuyor; çok sayıda klon kaldırıldı | **Yüksek** |
| Pac-Man, Space Invaders, Mario, Pokémon | Karakter/isim/görsel korunur | Yüksek |
| Bir Playable'ın birebir/benzer kopyası | Kural 2.2 | Ret [RESMÎ] |

- "Eski oyun = kamu malı" varsayımı yanlış. **FSEK m.27:** gerçek kişi eser sahibinde koruma ölümünden itibaren 70 yıl; ilk eser sahibi **tüzel kişiyse (stüdyo/şirket) aleniyet tarihinden itibaren 70 yıl**. Bu yüzden 1970–90'ların arcade/konsol oyunlarının hiçbiri kamu malı değil (ör. 1980'de yayımlanan şirket oyunu ~2050'ye kadar korunur). [RESMÎ: 5846 s. FSEK m.27] — https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5846&MevzuatTur=1&MevzuatTertip=5

### 10.6 Varlık lisansları

| Kaynak | Lisans | Ticari | Atıf |
|---|---|---|---|
| Kenney.nl | CC0 | Evet | Gerekmez; logo kullanılmaz [RESMÎ] |
| OpenGameArt | CC0 / CC-BY / CC-BY-SA / OGA-BY / GPL | CC0 serbest; CC-BY atıfla (DRM yasak); CC-BY-SA türev aynı lisansla; GPL kapalı kaynakta riskli | Lisansa göre [RESMÎ] |
| itch.io asset'leri | Yaratıcıya göre | Çoğu "oyunda kullan, ham dosyayı satma"; **NC** ticari oyunda kullanılamaz; **ND** değiştirilemez | Sayfaya göre [3. TARAF] |
| Google Fonts | Çoğu SIL OFL, kalanı Apache | Evet; font tek başına satılamaz, lisans dosyası eklenir | Lisans dosyası [3. TARAF] |
| YouTube Ses Kitaplığı | Standart + bazı CC-BY | Standart lisanslı müzik yalnızca YouTube videoları için; videolardan ayrı dağıtılması ve YouTube dışında kullanılması yasak → oyun paketine konmaz. CC-BY parçalar CC-BY 4.0 şartıyla (atıfla) başka yerde kullanılabilir; lisans Studio'da parça parça kontrol edilmeli | Resmî sayfa oyun kullanımına değinmiyor [RESMÎ: belgede yok — https://support.google.com/youtube/answer/3376882] + [3. TARAF — https://licenseorg.com/guide/music-audio/youtube-audio-library] |

- **Content ID ve royalty-free müzik:** Royalty-free müzik kütüphaneleri Content ID'ye referans olarak eklenebiliyor, ancak bu tür eşleşmelerin hak talebinden **önce elle incelenmesi** gerekiyor; münhasır olmayan lisansla alınan içerik Content ID'ye uygun değil [RESMÎ] — https://support.google.com/youtube/answer/2605065 . Yine de bu müziği kullanan videolara hak talebi (claim) gelebilir; lisans belgesini sakla ve itiraz et [TAHMİN/3. TARAF].

### 10.7 AI ile üretilen varlıklar

| Konu | Durum | Güven |
|---|---|---|
| ABD | Telif Ofisi raporu Bölüm 2 – Copyrightability (29.01.2025): insan yaratıcılığı şart; yalnızca prompt yetmez; insanın seçimi/düzenlemesi korunabilir | RESMÎ — https://copyright.gov/newsnet/2025/1060.html , https://blogs.loc.gov/copyright/2025/02/inside-the-copyright-offices-report-copyright-and-artificial-intelligence-part-2-copyrightability/ |
| Türkiye | FSEK'e göre eser sahibi gerçek kişi; tamamen otonom AI çıktısı korunmaz, anlamlı insan katkısı varsa korunabilir (doktrin) | 3. TARAF |
| Pratik | Tamamen AI görseli başkası kopyalarsa koruma talep edemeyebilirsin; AI çıktısı bilinen karaktere benzerse risk kullananda | TAHMİN |
| Playables | AI'a özgü kural yok; genel IP kuralları geçerli | RESMÎ (belgede yok) |
| YouTube videoları | Gerçekçi görünen AI içeriği beyan edilir; "gameplay footage from video games" minör, beyan gerekmez | RESMÎ — https://support.google.com/youtube/answer/14328491 |
| Steam | 16.01.2026'da AI beyan formu daraltıldı (bazı kaynaklarda 17 Ocak, saat dilimi farkı). Arka planda kullanılan verimlilik araçları (kod asistanları, gönderilmeyen konsept çizimleri) beyan dışı; oyuncunun gördüğü AI görsel, ses, metin ve canlı üretilen içerik beyan edilir | 3. TARAF; Steamworks belgesi okunmadı — https://www.notebookcheck.net/Steam-updates-AI-disclosure-form-requiring-developers-to-report-visible-and-in-game-AI-but-not-background-tools.1206103.0.html , https://respawn.outlookindia.com/gaming/gaming-news/valve-clarifies-steam-ai-policy-focus-shifts-to-content-consumed |
| AI ile yazılan kod | Yönlendirip seçip düzenliyorsan insan katkısı var; AI sağlayıcısının ticari şartlarına bakılmalı (incelenmedi) | TAHMİN |

### 10.8 Gameplay videosunda telif

| Konu | Kural | Güven |
|---|---|---|
| YPP "reused content" | Anlamlı katkı eklenmemiş başkasının içeriği para kazanamaz; kanal bütününe bakılır; telif izni bu politikadan muaf tutmaz | RESMÎ — https://support.google.com/youtube/answer/1311392 |
| "Inauthentic content" (15.07.2025; eski adı "repetitious content") | Seri üretilmiş, tekrarlayan içerik; yalnızca başkasının metnini (web sitesi, haber akışı) okuyan içerik ve genel/özgün olmayan şablonlarla yapılmış AI içerik para kazanamaz. AI kullanılabilir ama yaratıcı katkı ve eğitici/eğlendirici değer olmalı [RESMÎ]. Örnek: oyun görüntüsü + AI sesle Reddit okuma [3. TARAF/TAHMİN — resmî sayfada geçmiyor] | RESMÎ — https://support.google.com/youtube/answer/1311392 |
| Uzun yorumsuz oynanış | Kabul edilmeyebileceği iddia ediliyor; resmî sayfada doğrulanamadı | 3. TARAF |
| Şiddet/küfür | Reklam veren uygunluk kuralları; ilk saniyelerdeki grafik şiddet reklamı sınırlayabilir | RESMÎ — https://support.google.com/youtube/answer/10291745 |
| Oyun müziği / oyun içi radyo | Lisanslı müzik Content ID claim'i getirir; pratik çözüm: radyo/müziği kapat | RESMÎ + TAHMİN |
| Nintendo (02.09.2024) | YPP ile para kazanmak serbest; yaratıcı katkısız düz kopya, çıkış öncesi içerik, emülatör, data-mining yasak | RESMÎ — https://www.nintendo.co.jp/networkservice_guideline/en/index.html |
| Ubisoft | Let's Play, walkthrough, inceleme serbest ve para kazanılabilir; politika 2016 tarihli | RESMÎ — https://www.ubisoft.com/en-us/videopolicy.html |
| Rockstar | Gameplay video politikası bulunamadı | — |

### 10.9 Durum → Sonuç (telif)

| Durum | Sonuç |
|---|---|
| Satranç/Snake/mayın/2048 tarzını kendi kod, görsel ve adınla yapıyorsun | Hukuken düşük risk; Playables "özgünlük" incelemesine takılabilir |
| 2048'in MIT kodunu kullanıyorsun | Serbest; lisans metnini koru, ad ve görseli farklılaştır |
| Popüler mekaniği kendi temanla yapıyorsun | Genelde serbest; "substantially identical" sayılmayacak kadar farklı olmalı |
| Ekran düzeni, renkler, sprite birebir aynı | Telif + trade dress ihlali; Playables reddeder; TR'de TTK 55 riski |
| Adda "Tetris", "Pac-Man", "Minecraft", "Wordle" | Marka ihlali, kaldırılır |
| Bilinen karakter (Mario, Pikachu) | İhlal |
| Patentli mekaniği birebir uyguluyorsun | Patentin geçerli olduğu ülkede risk |
| Kenney / CC0 | Serbest |
| CC-BY | Serbest, oyunda ve açıklamada atıf |
| CC-BY-NC / "personal use only" | Para kazanılan oyunda kullanılamaz |
| Google Fonts (OFL) | Serbest, lisans dosyası ekle |
| YouTube Ses Kitaplığı müziği oyunun içinde | Standart lisanslı parça: kullanma (yalnızca YouTube videoları için); CC-BY parça: CC-BY 4.0 şartıyla, atıfla [3. TARAF] |
| Stok royalty-free müzik | Kullanılabilir; videolarına Content ID gelebilir |
| Görseller tamamen AI | Kullanılabilir, telif koruman zayıf; bilinen esere benzerse risk senin |
| Başka şirketin oyunu, yorumsuz uzun oynanış | Claim ve/veya YPP reddi riski |
| Yorumlu, eğitici Let's Play | Genelde serbest; yayıncı politikasına uy |
| Kendi oyununun gameplay videosu | Serbest; müzik lisansına dikkat |

---

## 11. Oyun fikirleri

### 11.1 Playables'ta hangi türler tutuyor

- En çok oynananlar (Tall Man Run, Build A Queen, Snake Clash) hiper-casual runner / yılan / sayı-kapısı türünde; tek parmakla, tek ekranlık refleks oyunları [3. TARAF + TAHMİN].
- Açılış kataloğu: Angry Birds Showdown, Cut the Rope, Words of Wonders, Trivia Crack, Tomb of the Mask, satranç, 8 Ball Billiards [3. TARAF].
- İyi giden türler: hiper-casual, bulmaca, yarış, simülasyon; oturum başına ~10 dk referans [3. TARAF, Playgama].
- Kısıtlara en uygun türler: kısa oturumlu kelime, trivia, refleks, idle — sunucusuz, hesapsız, küçük paket [TAHMİN].

### 11.2 Fikir tablosu

Ölçek: Zorluk 1 (kolay) – 5 (zor). AI = AI asistanla web teknolojisiyle yapılabilirlik. PL = Playables uygunluğu. Tümü **[TAHMİN]**.

| # | Fikir | Tür | Telif riski neden düşük | Zorluk | AI | PL |
|---|---|---|---|---|---|---|
| 1 | Türkçe günlük kelime bulmacası (5 harf, ğ/ı/ş; kendi adı ve renk düzeni) | Kelime | Mekanik genelde serbest; ama NYT "oynanış" üzerinde de hak iddia ediyor (10.2) → "Wordle" adı kullanma, renk düzeni (yeşil/sarı/gri) ve ızgara görünümü Wordle'dan belirgin farklı olmalı | 2 | Çok yüksek | Yüksek (liste pakette, dil `getLanguage`) |
| 2 | Atasözü/deyim tamamlama (harf sürükle-bırak) | Kelime/bulmaca | Atasözleri anonim, kamu malı | 2 | Çok yüksek | Yüksek |
| 3 | Tavla (bilgisayara karşı) | Masa | Yüzyıllık; kendi tahta tasarımı | 3 | Yüksek | Orta-yüksek (rakip bilgisayar) |
| 4 | Okey/101 (bilgisayar rakiplere karşı) | Taş | Kurallar geleneksel; ticari ürün adı yok | 4 | Orta-yüksek | Orta |
| 5 | Mangala | Strateji | Geleneksel Anadolu oyunu | 2 | Çok yüksek | Yüksek |
| 6 | Pişti/Batak (bilgisayara karşı) | Kart | Standart iskambil | 3 | Yüksek | Orta-yüksek |
| 7 | Simit tezgâhı / çay ocağı idle (dükkânı büyüt) | Idle | Özgün tema, idle mekaniği serbest | 2 | Çok yüksek | Yüksek (`saveData`) |
| 8 | Vapur iskelesi zamanlama (doğru anda yanaştır) | Tek dokunuş refleks | Özgün tema | 2 | Çok yüksek | Çok yüksek |
| 9 | Çini/ebru desen eşleştirme | Eşleştirme | Geometrik motifler kamu malı, kendi çizim | 2–3 | Yüksek (prosedürel desen) | Yüksek |
| 10 | Kalabalık koşucusu "kapı seç, sayıyı büyüt" | Hiper-casual runner (3D) | Mekanik serbest; **kopya kuralı riski — belirgin fark gerekli** | 3 | Orta-yüksek (three.js) | Yüksek ama tür kalabalık |
| 11 | Fizik ile kule dizme / denge | Fizik bulmaca | Genel mekanik | 3 | Yüksek (matter.js) | Yüksek |
| 12 | Trafik/kavşak yönetimi (ışıkları zamanla) | Bulmaca/simülasyon | Genel tema | 3 | Yüksek | Yüksek |
| 13 | Türkiye coğrafya bilgi yarışması (ili haritada bul) | Trivia | Harita verisi açık lisanslı (ör. Natural Earth, kamu malı) | 2 | Çok yüksek | Yüksek |
| 14 | Nonogram (Türk motifleriyle) | Mantık | Genel tür | 2 | Çok yüksek | Yüksek |
| 15 | Kervan/deve katarı yılan oyunu | Arcade | Snake kamu malı mekanik | 2 | Çok yüksek | Yüksek |
| 16 | Sayı birleştirme, özgün kural (ör. sikke birleştirme) | Bulmaca | 2048 açık kaynak; kendi kural ve görselin | 1–2 | Çok yüksek | Yüksek (ama 2048 klonu çok) |
| 17 | Ritim oyunu (kendi bestelediğin/CC0 müzikle) | Ritim | Telifli şarkı **asla** | 3 | Orta | Orta-yüksek |
| 18 | Günlük kelime zinciri (son harfle yeni kelime, süreye karşı) | Kelime/refleks | Geleneksel sözlü oyun | 2 | Çok yüksek | Yüksek |
| 19 | Kendi kanal karakterinle mini koşu oyunu | Hiper-casual | Karakter sana ait | 2–3 | Yüksek | Yüksek (`openYTContent` ile videolarına bağ) |
| 20 | Tek ekran kaçış odası / bulmaca kutusu | Macera/bulmaca | Özgün hikâye | 3 | Yüksek | Orta (bitiş açıkça bildirilmeli, Design 5.1) |

### 11.3 Türk kültürüne özgü fikirler — değerlendirme [TAHMİN]

- Tavla, mangala, okey, pişti, batak: kurallar serbest; risk yalnızca marka adı ve görsel kopyalamada.
- Türkçe kelime oyunlarında **kelime listesi kaynağı** önemli: TDK sözlük içeriği telifli olabilir → açık lisanslı liste veya kendi derlemen.
- İngilizce desteği zorunlu olduğundan TR + EN çift dilli tasarla; gelirde ABD/Batı Avrupa CPM'i önde [3. TARAF, Playgama]. Kültürel temalı oyunlarda mekanik evrensel, tema yerel olsun (ör. vapur zamanlaması herkesin anlayacağı bir mekanik).

### 11.4 Oyuncu çeken unsurlar ve Playables'ta durumu

| Unsur | Playables'ta | Dayanak |
|---|---|---|
| Kişisel en iyi skor | Var, YouTube arayüzünde (`sendScore`) | RESMÎ |
| Küresel liderlik tablosu | Resmî belgede yok | — |
| Günlük görev/bulmaca | Mümkün: cihaz tarihi + pakete gömülü seed listesi; uzaktan "günün bulmacası" çekilemez | TAHMİN (RESMÎ kurala dayalı) |
| İlerleme/idle büyüme | `saveData` ile | RESMÎ |
| Ödüllü reklam karşılığı bonus | `requestRewardedAd` | RESMÎ |
| Oyun içi paylaşım istemi | **Yasak** | RESMÎ |
| Video sinerjisi | `openYTContent` ile "nasıl oynanır" Shorts'una bağlantı; Shorts ve canlı yayında oyunu göstermek en güçlü büyüme yolu | RESMÎ + TAHMİN |
| Canlı yayında oynama | Playables on Live | RESMÎ |
| Çok oyunculu | Geliştiriciye açık API yok | RESMÎ (SDK'da yok) |
| Kısa oturum, anında başlama, < 5 sn yükleme | Kurallarla zaten teşvik ediliyor | RESMÎ |

---

## 12. Roblox gibi online ortam

### 12.1 Playables içinde

| Durum | Sonuç | Etiket |
|---|---|---|
| Kendi sunucunla gerçek zamanlı çok oyunculu, sohbet, UGC, hesap sistemi | **Mümkün değil** — dış çağrı, giriş ekranı, kişisel veri yasak; CSP `connect-src 'self'` | RESMÎ |
| YouTube'un kendi çok oyunculu altyapısı | Yalnızca seçili oyunlarda test (Aralık 2024: Ludo Club — eşleşme + emoji/hazır mesaj; Magic Tiles 3). Geliştiriciye açık resmî API yok [RESMÎ — SDK referansında çok oyunculu ad alanı yok: https://developers.google.com/youtube/gaming/playables/reference/sdk]. Mediacube "ayrıntıların 2026'nın 2. yarısında" gelmesini bekliyor (resmî duyuru değil) ve çok oyunculu/PvP oyunu olan geliştiricilerin başvurularını bir "multiplayer testing program" formuyla YouTube'a ilettiğini söylüyor (23.07.2026) [3. TARAF — https://mediacube.io/en/blog/youtube-playables-updates] | RESMÎ + 3. TARAF |
| Topluluk hissi | Bugün yalnızca skor, canlı yayın ve video bağlantısı | RESMÎ |

### 12.2 Alternatif platformlar

**Roblox (Roblox Studio + Luau)**

- Oyun içi satış (game pass, dev product): geliştirici %70 [RESMÎ] — https://create.roblox.com/docs/get-started/monetization . 29.05.2026'dan beri oyunlar arası satış kapalı. Avatar eşyası başka bir deneyimin içinde satılırsa: yapan %30, deneyim sahibi (affiliate) %40, platform %30 — bu önceden de geçerli resmî kural [RESMÎ — https://create.roblox.com/docs/monetize-avatar]. 14.07.2026'dan itibaren 2D/3D eşya yayın kuralları birleşti; 600 Robux'tan başlayan yayın avansı ve yayın için aktif Plus/Premium aboneliği şartı geldi; Roblox'a göre efektif platform ücreti ve gelir payı **değişmedi** [RESMÎ — https://devforum.roblox.com/t/building-stronger-protections-and-a-more-consistent-marketplace-unifying-2d-and-3d-avatar-item-publishing/4722717]. "2D payı %70'ten %30'a düştü" diyen 3. taraf haberler (ör. Tech Insider) var [ÇELİŞKİLİ].
- Creator Rewards (Temmuz 2025, Premium Payouts yerine): Robux harcamış oyuncuların süresine göre, 60 gün bekleme; bazı geliştiriciler düşüş bildiriyor [3. TARAF].
- **DevEx** [RESMÎ] — https://create.roblox.com/docs/production/monetization/developer-exchange : 1 Robux = **0,0038 USD** (05.09.2025'ten beri; 30.000 Robux ≈ 114 USD); eski bakiye 0,0035. 08.06.2026'dan itibaren **0,0054 USD/Robux** (%42 artış) yalnızca şu kapsamda: R15 avatar kullanan uygun deneyimlerde, yaşı yüz tahmini veya kimlikle 18+ doğrulanmış ABD oyuncularının seçili harcamaları (game pass, Robux abonelikleri, seçili oyun içi eşyalar, özel sunucular); diğer tüm kazanç 0,0038'den bozulur [RESMÎ — https://about.roblox.com/newsroom/2026/04/roblox-fuels-high-fidelity-games-over-18-players-increases-qualifying-devex-rate-42]. Şartlar: ≥ 30.000 kazanılmış Robux, 13+, doğrulanmış e-posta, DevEx Portal, vergi formu (ABD dışı W-8). Ülke kısıtı belgede yok.
- 2025'te DevEx ile 1,5 milyar USD+ ödeme [RESMÎ newsroom].
- **Türkiye'de erişim [ÇELİŞKİLİ]:** 2024'ten beri erişim engeli; bazı haberler 18.06.2026'da kaldırıldığını, diğerleri kararın hâlâ göründüğünü söylüyor. Önce güncel durumu kontrol et; erişim engelini aşma yöntemleri önerilmez.
- Gerçekçilik: Luau öğrenmek programlama bilen için kolay; gelir dağılımı çok dengesiz, çoğu oyun 30.000 Robux eşiğine ulaşamaz [TAHMİN].

**Fortnite UEFN (Verse)**

- **18 yaş şartı**; ABD dışı geliştiriciler için vergi raporlama yükümlülüğü olmadığı söyleniyor [RESMÎ] — https://dev.epicgames.com/documentation/fortnite/fortnite-developer-program-faqs-in-fortnite
- Engagement Payout: Item Shop vb. net gelirin %40'ı havuza, günlük dağıtım [RESMÎ].
- Ada içi satış: normalde V-Bucks değerinin %50'si (~harcamanın %37'si); **09.01.2026–31.01.2027 arası %100** (~%74) [RESMÎ] — https://dev.epicgames.com/documentation/fortnite/in-island-transactions-overview-in-fortnite
- Ödeme eşiği resmî SSS'de **bulunamadı** (belgede yok); SSS yalnızca ABD'li geliştiriciler için 600 USD'lik IRS 1099-NEC raporlama eşiğini veriyor [RESMÎ]. Toplam 1 milyar USD+ ödeme (kapsamı ÇELİŞKİLİ).
- 3D ve Verse gerekir; AI desteği web teknolojilerine göre sınırlı [TAHMİN].

**Minecraft Marketplace:** Partner Programı; kayıtlı şirket, vergi bilgisi, portföy; uzun ve seçici süreç [RESMÎ çerçeve + 3. TARAF] — https://www.minecraft.net/en-us/partner . Bireysel başlangıç için uygun değil [TAHMİN].

**Web tabanlı .io / odalı çok oyunculu oyun (Playables dışında)**

- Sunucu: Colyseus (Node.js, açık kaynak) kendi sunucunda ücretsiz; Colyseus Cloud 15 $/ay'dan [RESMÎ] — https://www.colyseus.io/pricing
- 5 $'lık VPS: sıra tabanlı ~3.000 CCU, gerçek zamanlı 50–500 [3. TARAF, topluluk tahmini].
- .NET bilen için alternatif: ASP.NET Core + SignalR [TAHMİN].
- Yayın: kendi site, Poki, CrazyGames (Bölüm 13); .io pazarı klonlarla dolu [3. TARAF].
- Kullanıcı adı girilebiliyorsa küfür filtresi (Poki şartı) [RESMÎ].

**Kendi Roblox benzeri platformunu kurmak [TAHMİN]**

- Gerekenler: motor/editör, UGC araçları, hesap sistemi, ödeme, moderasyon (çocuk güvenliği, KVKK/GDPR), sunucu, anti-cheat.
- Gerçekçi minimum: 10–30 kişilik ekip, birkaç yıl, milyonlarca USD. Roblox'un kendisi bile Türkiye'de çocuk güvenliği gerekçesiyle engellendi. **Tek geliştirici için gerçekçi değil.**
- Ölçeklenebilir ara yol: küçük, odalı, hesapsız, sohbetsiz (hazır mesajlı) bir web oyunu (ör. 4 kişilik okey odası).

### 12.3 Durum → Sonuç

| Durum | Önerilen yol |
|---|---|
| Hiç oyun yapmadım, AI ile hızlı başlamak istiyorum | Tek kişilik HTML5 Playable (Phaser/Canvas); kelime, bulmaca, hiper-casual |
| Gerçek zamanlı çok oyunculu + topluluk, web'de | Playables dışında: kendi site + Colyseus/SignalR + Poki/CrazyGames; tanıtım YouTube video/Shorts |
| Hazır kitle ve olgun ödeme sistemi, 13–17 yaş dahil | Roblox (Luau); Türkiye erişimini önce kontrol et |
| 18+, 3D seviye tasarımı | Fortnite UEFN (31.01.2027'ye kadar %100 ada içi satış kampanyası) |
| Şirketin var, Minecraft bilgin iyi | Minecraft Marketplace Partner başvurusu |
| Roblox rakibi kurmak | Tek kişi için gerçekçi değil |

---

## 13. Diğer dağıtım kanalları ve münhasırlık

### 13.1 En önemli bulgular

1. **Poki'nin "Web Exclusive" anlaşması YouTube Playables'ı da kapsıyor** — "web"e tarayıcılar, Discord ve YouTube Playables açıkça sayılıyor; Steam, mobil, konsol hariç. [RESMÎ] — https://developers.poki.com/guide/revenue-deal-types
2. **CrazyGames:** FAQ'a göre başka platformlarda yayınlanmış olmak gelir payı uygunluğunu etkilemez; dağıtım hakkı sende olmalı [RESMÎ] — https://docs.crazygames.com/faq/ . Münhasırlık şartı FAQ'da açıkça yok; T&C'den kontrol edilmeli.
3. **YouTube Playables belgelerinde münhasırlık maddesi bulunamadı** — kabul sonrası Partner Manager'a sorulmalı.

### 13.2 Karşılaştırma tablosu

| Kanal | Giriş | Bireysel? | Ücret | Gelir modeli / oran | Reklam/IAP | Münhasırlık | Türkiye'den ödeme |
|---|---|---|---|---|---|---|---|
| **YouTube Playables** | Form, seçici (ölçütler belgede yok) | Belgede yok | Yok | Reklam; pay **pilot**, oran yok [RESMÎ] | Yalnızca `ytgame.ads`; IAP yok | Belgede yok | AdSense (3. TARAF) |
| **Poki** | Seçici, "Web Fit" testi | Belgede yok | Yok | Exclusive: Poki'nin getirdiği oyunculardan gelir payı; güncel resmî sayfada yüzde yok, koşulları sözleşme belirler [RESMÎ]. "Kendi trafiğin %100 / Poki trafiği %50" rakamı eski belge/3. taraf bilgisi [3. TARAF/ESKİ]. Non-exclusive: tek seferlik lisans ücreti, gelir payı yok [RESMÎ] | Yalnızca Poki SDK, 3. taraf reklam ve IAP yok | **Evet**, varsayılan 5 yıl (7 diyen sayfalar var, ÇELİŞKİLİ); Playables + Discord dahil | Havale (PayPal TR'de yok) |
| **CrazyGames** | Basic Launch (~2 hafta, gelir yok) → Full Launch (SDK zorunlu, QA) | Evet, ülke kısıtı yok [RESMÎ] | Yok | Reklam + IAP; oran T&C'de (%50–70 veya %60/%70, 3. TARAF, ÇELİŞKİLİ) | CrazyGames SDK | FAQ'da açık şart yok; başka platformda yayında olmak engel değil [RESMÎ]; T&C'den kontrol et | Aylık, ≥ €100, havale/PayPal [RESMÎ] |
| **itch.io** | Serbest, anında | Evet | Yok | Satış/bağış; platform payını sen seçersin (varsayılan %10) [RESMÎ] | Reklam yok | Yok [TAHMİN] | Payoneer; ≥ $5; 7 (bazen 30) gün; TIN yoksa %30 stopaj [RESMÎ] |
| **GameDistribution** | Serbest [3. TARAF] | ? | Yok | Net gelirin %33'ü [3. TARAF] | GD SDK | Doğrulanamadı | €100 eşik, 60 gün [3. TARAF] |
| **Newgrounds** | Serbest | Evet | Yok | Reklam programı [ÇELİŞKİLİ] | NG | Yok [TAHMİN] | $50, PayPal/çek → sorunlu |
| **Google Play** (Capacitor/TWA) | $25 + kimlik + kişisel hesapta **12 test kullanıcısı / 14 gün** kapalı test [RESMÎ] | Evet (kurumsal: D-U-N-S) | $25 bir kez | IAP %15 (ilk $1M) / %30 [RESMÎ]; AdMob | Serbest | Yok | Google Payments [TAHMİN] |
| **Steam** (Electron/NW.js/Tauri) | $100/uygulama, 30 gün bekleme, KYC 15–30 gün [RESMÎ] | Evet | $100 ($1K brüt sonrası iade) | Valve %30 / %25 ($10M+) / %20 ($50M+) [3. TARAF] | — | Yok | Banka havalesi [RESMÎ] |
| **Facebook Instant Games** | App Review + Business Manager, "approved partner" | Net değil | Yok | Reklam ~%70 [3. TARAF] + IAP | Audience Network | Yok [TAHMİN] | Monetization Manager |
| **Telegram Mini Apps** | Bot ile serbest | Evet | Yok | Dijital ürünler yalnızca Stars [RESMÎ]; mağaza %30 sonrası | AdsGram vb. [3. TARAF] | Yok | Fragment → TON (kripto; ayrı vergi süreci) |

Notlar:
- Poki teknik şartları: Poki SDK zorunlu; harici istekler varsayılan engelli; dış link ve splash yok; masaüstü/mobil/tablet; reklam engelleyiciyle çalışmalı [RESMÎ] — https://developers.poki.com/guide/requirements-quality
- CrazyGames limitleri: ilk indirme ≤ 50 MB, toplam ≤ 250 MB (SDK ile), ≤ 1.500 dosya, PEGI 12 uygun, çocuklara yönelik oyun kabul edilmiyor [RESMÎ] — https://docs.crazygames.com/requirements/intro/
- itch.io HTML5: zip, kökte `index.html`, ≤ 1.000 dosya, açılmış ≤ 500 MB, tek dosya ≤ 200 MB, yol ≤ 240 karakter [RESMÎ] — https://itch.io/docs/creators/html5
- Facebook Instant: Zero Permissions zorunlu, Rewarded Interstitial API kaldırıldı (14.04.2026), banner kaldırılacak — platform küçülüyor, yeni başlayan için riskli [RESMÎ + TAHMİN].
- Playgama, GamePix, Yandex Games, Y8, Discord Activities bu turda incelenmedi (Discord, Poki münhasırlığına giriyor).

### 13.3 Durum → Sonuç (kanal)

| Durum | Sonuç |
|---|---|
| İlk oyunun, hiç yayınlamadın | itch.io (anında) + CrazyGames Basic Launch (gerçek oyuncu verisi, münhasırlık yok); Playables başvurusunda referans olabilir [TAHMİN] |
| Hedefin Playables | Poki **exclusive** imzalama (Playables'ı kapsıyor); CrazyGames, itch.io, Steam, Google Play birlikte yürüyebilir |
| Poki exclusive teklif etti | Web'de 5 (belki 7) yıl yalnızca Poki; Playables/Discord/CrazyGames kapanır; mobil ve Steam açık |
| IAP istiyorsun | Playables ve Poki uygun değil; CrazyGames, Google Play, Steam, itch.io uygun |
| Ödemeyi Türkiye'den alacaksın | PayPal kullanılamıyor (2016'dan beri); SWIFT havale veya Payoneer; vergi için Bölüm 9.4 |
| Mobil mağaza da istiyorsun | Capacitor/TWA ile Google Play; Poki münhasırlığıyla çakışmaz |
| Oyun büyük (> 30 MiB ilk yükleme) | Playables MUST'ı geçemez; CrazyGames 50 MB; varlıkları parça parça yükle |
| Gelir hemen gerekiyor | Hiçbir web kanalı kısa vadede garanti vermez [TAHMİN] |

---

## 14. Riskler ve sık hatalar

| Risk / hata | Sonuç | Önlem |
|---|---|---|
| Fikirle Playables'a başvurmak | Form fikir kabul etmiyor | Önce oynanabilir oyun |
| Onay gelecek diye tek kanala bağlanmak | Aylarca bekleme, gelir 0 | Paralel yayın (itch.io/CrazyGames) |
| Poki exclusive imzalayıp Playables'a da gitmek | Sözleşme ihlali | Münhasırlık maddelerini oku |
| Sesi kullanıcı tıklamasına bağlamak | **En sık sertifikasyon reddi** [RESMÎ] | `isAudioEnabled` ile başlat |
| Page Visibility API ile pause | Ret (Integration 6.2) | `onPause`/`onResume` |
| `localStorage` ile ilerleme kaydı | Ret (Integration 4.2) | `saveData`/`loadData` |
| `loadData` beklenmeden `saveData` | Kayıt reddedilir (Integration 4.3) | `loaded` bayrağı |
| Android'de 0 yükseklikli viewport'u yok saymak | Boş ekran | `resize` + `innerHeight > 0` |
| Analitik/CDN/kendi API'ne çağrı | Ret (Privacy 3) | Her şey pakette; fontlar yalnızca Google Fonts |
| `navigator.language` | Ret | `getLanguage()` |
| Sadece Türkçe arayüz | Ret (İngilizce zorunlu) | TR + EN |
| Yön kilidi, yalnızca klavye | Ret | Her oran + touch + fare |
| Çıkış düğmesi, paylaşım istemi, dış link, login benzeri ekran, QR benzeri grafik | Ret | Kontrol listesi 5.10 |
| Çocuklara yönelik tasarım | Ret ("made for kids" yasak) | 13+ genel kitle |
| Kod gizleme (obfuscation) | Ret | Yalnızca minify |
| Unity build'i sıkıştırmalı almak | Desteklenmiyor | Compression=Disabled |
| Godot C# ile web hedeflemek | Web export yok | GDScript |
| Tetris/Wordle adı veya birebir görünüm | Kaldırma, marka/trade dress | Kendi ad ve görsel |
| Mevcut bir Playable'ın reskin'i | Ret (kural 2.2) | Belirgin fark |
| CC-BY-NC / "personal use" varlık | Ticari kullanımda ihlal | Lisans listesi |
| YouTube Ses Kitaplığı müziğini oyuna koymak | Belirsiz | CC0 müzik |
| Stok müzik → videolarına Content ID | Gelir hak sahibine | Kendi/CC0 müzik |
| Yorumsuz gameplay yüklemek | YPP reddi (reused/inauthentic) | Yorum, eğitim, kurgu |
| W-8 vermemek | Tüm kazançtan %24 kesinti | AdSense'te vergi bilgisi |
| 20/B hesabı dışından tek ödeme almak | İstisna düşer | Tüm gelir tek hesaba |
| Erişim engelini aşma yöntemleri (ör. Roblox) | Hukuki risk | Önerilmez |
| AI'ın eski API önermesi (Phaser 3/4 karışması) | Hatalar | Sürümü `CLAUDE.md`'ye yaz |
| Kapsamı büyük tutmak | Oyun bitmez | Tek ekran, tek mekanik |
| Dev/staging linkini paylaşmak | Kural ihlali (T&S 3) | Yalnızca ekip içi |

---

## 15. Durum → Sonuç genel karar tablosu

| Durum | Sonuç / önerilen yol |
|---|---|
| Hiç programlama bilmiyorsun | AI ile Phaser/saf Canvas; tek ekran, tek mekanik; önce itch.io; 4–8 hafta plan [TAHMİN] |
| Başka dilde yazılımcısın (C#, Java vb.) | TypeScript + Phaser; Godot istersen GDScript; Unity biliyorsan boyut optimizasyonunu göze al |
| Amacın para kazanmak, hemen | Gerçekçi değil; ilk 6–12 ay sıfır gelir varsay |
| Amacın öğrenmek + portföy | Playables uyumlu küçük oyun + itch.io + kanalda geliştirme günlüğü videoları |
| Playables'a kabul edilmek istiyorsun | Bitmiş, cilalı, kontrol listesi tam bir oyunla form; kanal geçmişini temiz tut [TAHMİN] |
| Hızlı Playables yayını | Yayıncı (Mediacube/Playgama vb.); pay yayıncıya göre |
| Kabul edilmedin | Aynı oyun CrazyGames/itch.io/kendi site; Poki'yi değerlendir (münhasırlığa dikkat) |
| Gameplay kanalı açmak istiyorsun | Yorumlu, eğitici içerik; yayıncı video politikalarına uy; YPP eşikleri (2027'de yükseliyor) |
| Hem oyun hem kanal | En mantıklı birleşim: kendi oyununun videoları + `openYTContent` ile Shorts bağlantısı |
| Online / Roblox benzeri istiyorsun | Playables'ta olmaz; Roblox / UEFN (18+) / kendi web sunucun |
| Türkiye'de yaşıyorsun, gelir başladı | 20/B (içerik) veya şahıs işletmesi (yurt dışı yayıncı/portal); W-8; özelge/mali müşavir |
| Yurt dışında yaşıyorsun | O ülkenin vergi kuralları + W-8/W-9; Playables Builder'a (US/CA/UK/AU) başvurabilirsin |
| Şirketin var | Hesapları şirket adına aç; form "company" seçeneğini sayıyor |
| Kamu görevlisisin | Şahıs işletmesi yasak; 20/B için kurumdan teyit |
| 18 yaş altındasın | Playables 13+ kitle şartı oyunun içeriği içindir; hesap/sözleşme/ödeme için veli ve platform yaş şartları ayrıca kontrol edilmeli (UEFN 18+, kanal üyeliği 18+) [TAHMİN] |
| Klasik bir oyunu yapmak istiyorsun | Kurallar serbest; ad, görsel, karakter özgün olsun; Tetris'ten uzak dur |
| Görselleri AI ile üreteceksin | Kullanılabilir; telif koruman zayıf; bilinen karakterlere benzememeli |

---

## 16. Kaynakça

Tüm kaynaklar **15 Ekim 2026** tarihinde okunmuştur. Parantez içindeki tarihler sayfanın kendi "son güncelleme" alanıdır.

### YouTube Playables — resmî

- https://developers.google.com/youtube/gaming/playables (2026-08-31)
- https://developers.google.com/youtube/gaming/playables/reference/getting_started (2026-06-02)
- https://developers.google.com/youtube/gaming/playables/reference/sdk (2026-06-04)
- https://www.youtube.com/playablesportal/static/youtube_ytgame_web_deploy_mpm_files/index.d.ts
- https://developers.google.com/youtube/gaming/playables/reference/monetization (2026-06-01)
- https://developers.google.com/youtube/gaming/playables/reference/test_suite_guide (2025-08-20)
- https://developers.google.com/youtube/gaming/playables/test_suite
- https://developers.google.com/youtube/gaming/playables/developer_portal (2025-10-16)
- https://developers.google.com/youtube/gaming/playables/certification/requirements (2026-06-16)
- https://developers.google.com/youtube/gaming/playables/certification/requirements_stability (2026-06-16)
- https://developers.google.com/youtube/gaming/playables/certification/requirements_integration (2026-09-25)
- https://developers.google.com/youtube/gaming/playables/certification/requirements_design (2026-09-25)
- https://developers.google.com/youtube/gaming/playables/certification/requirements_privacydata (2026-06-15)
- https://developers.google.com/youtube/gaming/playables/certification/requirements_trustsafety (2026-08-26)
- https://developers.google.com/youtube/gaming/playables/certification/requirements_monetization (2026-06-16)
- https://developers.google.com/youtube/gaming/playables/certification/requirements_i18n_l10n (2026-06-16)
- https://developers.google.com/youtube/gaming/playables/certification/requirements_accessibility (2026-08-26)
- https://developers.google.com/youtube/gaming/playables/certification/revisionhistory
- https://developers.google.com/youtube/gaming/playables/support/faq (2026-03-09)
- https://developers.google.com/youtube/gaming/playables/support/certification_faq (2026-06-16)
- https://developers.google.com/youtube/gaming/playables/samples/oss_samples
- https://developers.google.com/youtube/gaming/playables/samples/phaser
- https://developers.google.com/youtube/gaming/playables/samples/unity_wrapper (2026-05-26)
- https://developers.google.com/youtube/gaming/playables/samples/godot_wrapper (2025-08-20)
- https://developers.google.com/youtube/gaming/playables/samples/bundle_analyzer
- https://github.com/google/web-game-samples
- https://docs.google.com/forms/d/e/1FAIpQLSdvdQ0lgIq2369aemj1O6w8R8FwGn9O5ARRGODDDUbVINCRJQ/viewform (Playables interest form)
- https://support.google.com/youtube/answer/14328604
- https://blog.youtube/news-and-events/youtube-playables/
- https://blog.youtube/news-and-events/live-updates/

### YouTube kanal geliri, vergi, ödeme — resmî

- https://support.google.com/youtube/answer/72851 (YPP)
- https://support.google.com/youtube/answer/13429240 (YPP alt kademe)
- https://support.google.com/youtube/answer/12504220 (Shorts gelir paylaşımı)
- https://support.google.com/youtube/answer/72902 (Watch Page Monetization Module, %55)
- https://support.google.com/youtube/answer/7636690 (kanal üyeliği, %70)
- https://support.google.com/youtube/answer/10391362 (ABD vergisi)
- https://support.google.com/youtube/answer/1311392 (reused content)
- https://support.google.com/youtube/answer/10291745 (reklam veren uygunluğu)
- https://support.google.com/youtube/answer/2605065 (Content ID)
- https://support.google.com/youtube/answer/14328491 (AI içerik beyanı)
- https://support.google.com/youtube/answer/3376882 (Ses Kitaplığı)
- https://support.google.com/adsense/answer/1709871 (ödeme eşiği)
- https://support.google.com/adsense/answer/7164703 (ödeme takvimi)

### Telif ve hukuk

- https://www.copyright.gov/register/tx-games.html [RESMÎ]
- https://webharvest.gov/peth04/20041015023438/http://www.copyright.gov/fls/fl108.html [RESMÎ, arşiv]
- https://www.ippt.eu/items/ippt20142301-cjeu-nintendo-v-pc-box [3. TARAF]
- https://curia.europa.eu/juris/liste.jsf?num=C-355/12 (C-355/12, ECLI:EU:C:2014:25) [RESMÎ]
- https://www.copyright.gov/circs/circ61.pdf (Circular 61 – bilgisayar programları) [RESMÎ]
- https://copyright.gov/newsnet/2025/1060.html , https://blogs.loc.gov/copyright/2025/02/inside-the-copyright-offices-report-copyright-and-artificial-intelligence-part-2-copyrightability/ (AI raporu Bölüm 2) [RESMÎ]
- https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5846&MevzuatTur=1&MevzuatTertip=5 (FSEK) [RESMÎ]
- https://www.loeb.com/en/insights/publications/2012/06/tetris-holding-llc-v-xio-interactive-inc [3. TARAF]
- https://www.erdem-erdem.av.tr/bilgi-bankasi/yeni-turk-ticaret-kanununda-haksiz-rekabet-hukumleri [3. TARAF]
- https://www.patentarcade.com/video-game-patent/US10926179/ [3. TARAF]
- https://www.finnegan.com/en/insights/articles/will-101-be-a-nemesis-to-warner-brothers-patent.html , https://www.patentarcade.com/2021/02/warner-brothers-granted-patent-for-nemesis-system-from-middle-earth-video-games.html , https://www.kitguru.net/gaming/matthew-wilson/warner-bros-nemesis-system-patent-wont-expire-until-2036/ [3. TARAF]
- https://www.patentarcade.com/?p=7128 , https://gamesfray.com/ahead-of-october-1-court-hearing-nintendo-has-zero-chance-of-prevailing-over-current-palworld-versions-it-may-get-30k-chump-change/ (Palworld davası) [3. TARAF]
- https://www.wsls.com/business/2024/03/12/the-new-york-times-is-fighting-off-wordle-look-alikes-with-copyright-takedown-notices/ , https://www.wusf.org/2024-03-13/c-e-a-s-e-and-desist-the-new-york-times-goes-after-wordle-spinoffs (AP, 2024) [3. TARAF]
- https://licenseorg.com/guide/music-audio/youtube-audio-library , https://nofilmschool.com/2013/09/youtube-audio-library-royalty-free-music-track (Ses Kitaplığı lisansı) [3. TARAF]
- https://www.notebookcheck.net/Steam-updates-AI-disclosure-form-requiring-developers-to-report-visible-and-in-game-AI-but-not-background-tools.1206103.0.html , https://respawn.outlookindia.com/gaming/gaming-news/valve-clarifies-steam-ai-policy-focus-shifts-to-content-consumed (Steam AI beyanı) [3. TARAF]
- https://katv.com/news/offbeat/nyt-fighting-off-wordle-copycats-with-several-takedown-notices-word-guessing-game-new-york-times-look-alikes-digital-millenium-copycat-act-github-trademark-battle [3. TARAF]
- https://www.nintendo.co.jp/networkservice_guideline/en/index.html [RESMÎ]
- https://www.ubisoft.com/en-us/videopolicy.html [RESMÎ]
- https://kenney.nl/support [RESMÎ]
- https://opengameart.org/content/faq [RESMÎ]

### Türkiye vergisi

- https://www.fatiharas.com/gvk-mukerrer-madde-20-b-sosyal-icerik-ureticiligi-istisnasi/ [3. TARAF]
- https://www.forbes.com.tr/ekonomi/2026-yili-gelir-vergisi-tarifesi-ve-istisna-tutarlari-belirlendi [3. TARAF]
- https://www.pwc.com.tr/tr/hizmetlerimiz/vergi/bultenler/2026/2026-yili-bazi-gelir-vergisi-rakamlari.html [3. TARAF]
- https://kpmgvergi.com/yayinlar/mali-bultenler/vergi/2026-yili-gelir-vergisi-dilimleri-ile-dikkate-alinacak-bazi-had-ve-tutarlar-belirlendi/3351 [3. TARAF]
- https://www.alomaliye.com/2025/01/27/youtubedan-gelir-elde-edenler-izaha-davet-ediliyor/ [3. TARAF]
- https://www.diken.com.tr/?p=295227 (PayPal Türkiye, 2016) [3. TARAF]

### Motorlar ve öğrenme

- https://phaser.io/download/stable , https://phaser.io/tutorials/create-game-app [RESMÎ]
- https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game [RESMÎ]
- https://emanueleferonato.com/2026/04/17/getting-started-with-phaser-4-vite-typescript-setup-using-the-official-create-game-app/ [3. TARAF]
- https://docs.godotengine.org/en/stable/getting_started/first_2d_game/ [RESMÎ]
- https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html [RESMÎ]
- https://blog.lmorchard.com/2025/07/10/breakout-with-claude/ [3. TARAF]
- https://www.skills.sh/yakoub-ai/phaser4-gamedev/phaser-init [3. TARAF]
- https://www.techcareer.net/courses/unity-ile-oyun-gelistirme [3. TARAF]
- https://gdevelop.io/pricing , https://playcanvas.com/plans , construct.net [RESMÎ]

### Roblox, UEFN, Minecraft, çok oyunculu

- https://create.roblox.com/docs/get-started/monetization [RESMÎ]
- https://create.roblox.com/docs/production/monetization/developer-exchange [RESMÎ]
- https://about.roblox.com/newsroom/2026/04/roblox-fuels-high-fidelity-games-over-18-players-increases-qualifying-devex-rate-42 [RESMÎ]
- https://create.roblox.com/docs/monetize-avatar [RESMÎ]
- https://devforum.roblox.com/t/building-stronger-protections-and-a-more-consistent-marketplace-unifying-2d-and-3d-avatar-item-publishing/4722717 [RESMÎ forum, 14.07.2026]
- https://devforum.roblox.com/t/introducing-creator-rewards-earn-more-by-growing-the-community/3777628 [RESMÎ forum]
- https://www.sozcu.com.tr/roblox-a-erisim-engeli-680-gun-sonra-kaldirildi-p329131 [3. TARAF]
- https://www.technopat.net/2026/06/19/roblox-turkiye-acildi-mi-erisim-engeli-karari-son-durum/ [3. TARAF]
- https://dev.epicgames.com/documentation/fortnite/fortnite-developer-program-faqs-in-fortnite [RESMÎ]
- https://dev.epicgames.com/documentation/fortnite/in-island-transactions-overview-in-fortnite [RESMÎ]
- https://www.tubefilter.com/2026/06/17/epic-games-unreal-editor-for-fortnite-creator-payouts/ [3. TARAF]
- https://www.minecraft.net/en-us/partner [RESMÎ]
- https://www.colyseus.io/pricing [RESMÎ]
- https://www.tubefilter.com/2024/12/10/youtube-playables-hub-multiplayer-casual-games-test/ [3. TARAF]

### Diğer dağıtım kanalları

- https://developers.poki.com/guide/revenue-deal-types , …/payouts-billing , …/requirements-quality [RESMÎ]
- https://docs.crazygames.com/faq/ , https://docs.crazygames.com/requirements/intro/ [RESMÎ]
- https://itch.io/docs/creators/payments , https://itch.io/docs/creators/html5 , https://itch.io/docs/creators/faq [RESMÎ]
- https://support.google.com/googleplay/android-developer/answer/6112435 , …/14151465 , …/10632485 [RESMÎ]
- https://partner.steamgames.com/doc/gettingstarted/appfee , https://partner.steamgames.com/steamdirect [RESMÎ]
- https://developers.facebook.com/documentation/games/whats-new/changelog/ , https://developers.facebook.com/documentation/games/monetize/overview [RESMÎ]
- https://core.telegram.org/bots/payments-stars [RESMÎ]
- https://www.neowin.net/news/valve-introduces-new-revenue-share-tiers-for-steam-promising-bigger-cuts-for-studios/ [3. TARAF]
- https://app.cinevva.com/guides/web-game-monetization , https://app.cinevva.com/guides/publish-web-game [3. TARAF]
- https://playgama.com/blog/business-faqs/poki-vs-crazygames-vs-gamedistribution-revenue-share/ [3. TARAF, rakip]
- https://mobileecosystemforum.com/2026/02/24/telegrams-gaming-have-indie-games-found-a-new-love/ [3. TARAF]

### Haber / yayıncı (3. TARAF)

- https://mediacube.io/en/blog/youtube-playables-updates
- https://mediacube.io/en/blog/youtube-playables-monetization
- https://www.pocketgamer.biz/youtube-playables-expands-to-more-than-50-markets-including-the-eu-and-nordics/
- https://mobilegamer.biz/youtube-has-quietly-rolled-out-playables-across-europe/
- https://shattered.io/?p=5148
- https://playgama.com/blog/2026/06/04/youtube-playables/
- https://tech-insider.org/youtube-playables-50-markets-eu-nordics-2026/
- https://9to5google.com/2025/12/23/youtube-playables-builder/
- https://techcrunch.com/2025/09/16/youtube-live-gets-a-major-update-introduces-dual-format-streaming-minigames-and-more/
- https://www.phonearena.com/news/youtube-test-multiplayer-mini-games_id165709
- https://www.mediapost.com/publications/article/401767/youtube-tests-multiplayer-playables-games.html
- https://www.tomsguide.com/computing/social-media/youtube-gets-into-gaming-with-playables-75-games-you-can-try-right-now
- https://vidiq.com/blog/post/youtube-partner-program-changes-2027/
- https://www.netinfluencer.com/youtube-raises-bar-for-new-creators-to-join-partner-program-tightens-shorts-payout-threshold/
- https://milx.app/tr/trends/youtube-cpm-rpm-rates-2026-average-niches-countries-more

### Bulunamayanlar (açık noktalar)

- Başvuru formunun 2. sayfası; Türkiye'den geliştirici kabulü; bireysel/şirket şartı
- Playables gelir paylaşım oranı, CPM, ödeme eşiği ve vergi profili şartları
- Resmî inceleme/onay süresi; 250 MiB istisnasının ölçütleri; küçük resim piksel ölçüleri
- IARC derecelendirmesi; TV desteği; geliştiricilere açık çok oyunculu API ve takvimi
- Küresel liderlik tablosu; Playables münhasırlık maddesi
- Playables geliri için 20/B uygulanabilirliği (özelge gerekir)
- Oyun mekaniğine ilişkin Türk mahkeme kararı; YouTube Ses Kitaplığı'nın oyun içi kullanımı (resmî sayfada yok; 3. taraf kaynaklar standart lisansı YouTube dışı kullanıma kapalı sayıyor)
- Playables başvurusunda değerlendirme ölçütleri ve Partner Manager atama koşulları; UEFN ödeme eşiği
- Roblox'un Ekim 2026 itibarıyla Türkiye erişim durumu; Poki/CrazyGames güncel resmî oranları
