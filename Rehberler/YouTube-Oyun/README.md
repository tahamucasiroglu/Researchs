# YouTube'da Oyun: Playables ve Oyun Kanalı

"YouTube'a oyun yüklemek" iki ayrı yol demektir. Birincisi **YouTube Playables**: YouTube uygulaması ve sitesi içinde kurulum gerektirmeden oynanan HTML5 oyunlar. İkincisi **gameplay / oyun video kanalı**: oyun videolarını, Shorts'ları ve canlı yayınları yükleyip YouTube Partner Programı (YPP) ile gelir elde etmek. Bu rehber iki yolu birlikte ele alıyor: şartlar ve başvuru, Playables SDK'sı ve teknik kurallar, motor seçimi, hiç programlama bilmeyen biri için bir yapay zekâ asistanıyla geliştirme, baştan sona hazırlık planı, gelir ve ödeme (AdSense, ABD stopajı, Türkiye'de GVK 20/B), telif (mekanik ve ifade ayrımı, klon riski), özgün oyun fikirleri ve Roblox benzeri online ortam seçenekleri. Okurun durumu farklı olabileceği için her bölümde "Durum → Sonuç" tabloları var.

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

Başlamadan önce: [Süreç ve engel raporu](surec-ve-engeller.html) — kayıttan gelire tüm adımlar ve olası engeller; [AI için Markdown](surec-ve-engeller.md)

Yapay zekâ için Markdown: [arastirma.md](arastirma.md) — bir AI asistanına bağlam olarak verilebilir (güven etiketleri [RESMÎ] / [3. TARAF] / [TAHMİN] / [ÇELİŞKİLİ] ile, en küçük Playable iskeleti ve sertifikasyon kontrol listesi dahil).

> Araştırma tarihi: 15 Ekim 2026. Şartlar, gelir oranları, YPP eşikleri ve ülke listeleri sık değişir; kullanmadan önce kaynakçadaki resmî sayfalardan güncelini kontrol et. Gelir rakamları örnek ve tahmindir. Bu rehber hukuki veya mali danışmanlık değildir; somut durumda fikri mülkiyet avukatına ve mali müşavire danışılmalıdır.

## Bölümler

| § | Başlık | Kısaca |
|---|---|---|
| 1 | Kısa cevaplar | En sık sorulan on sorunun tek satırlık cevabı ve ilgili bölüm. |
| 2 | "YouTube'a oyun yüklemek" iki anlam | Playables ile gameplay kanalının karşılaştırması; ikisini birleştirmenin mantığı. |
| 3 | YouTube Playables nedir | Nerede görünür, oyuncu özellikleri, desteklenen cihazlar, ülkeler ve Türkiye durumu, tarihçe. |
| 4 | Şartlar ve başvuru süreci | Davetli erken erişim, ilgi formu şartları, onay süresi, adım adım süreç, yayıncı (publisher) yolu. |
| 5 | Teknik şartlar ve Playables SDK | Boyut ve performans, ağ yasağı, entegrasyon, tasarım, içerik kuralları, `ytgame` API'si, en küçük iskelet, kontrol listesi. |
| 6 | Araç / motor seçimi | Saf Canvas, Phaser, Godot, Unity vb. karşılaştırma tablosu ve hangi durumda hangisi. |
| 7 | AI asistanla birlikte geliştirme | Hiç bilmeden yapılabilir mi, iş bölümü, çalışma kuralları, örnek akış ve prompt kalıpları. |
| 8 | Baştan sona başlangıç rehberi | Hazırlık kontrol listesi, hafta hafta plan, ücretsiz öğrenme kaynakları. |
| 9 | Para kazanma ve para nasıl alınır | Playables reklam geliri ve pilot, YPP şartları ve paylar, oyun nişinde RPM, AdSense ödemesi, ABD ve Türkiye vergisi. |
| 10 | Telif ve hukuk | Fikir korunmaz ifade korunur, önemli davalar, patentli mekanikler, klasik oyunlar, varlık lisansları, AI varlıkları, gameplay videosunda telif. |
| 11 | Oyun fikirleri | Playables'ta tutan türler, fikir tablosu, Türk kültürüne özgü temalar, oyuncu çeken unsurlar. |
| 12 | Roblox gibi online ortam | Playables içinde neden olmaz; Roblox, UEFN, Minecraft ve kendi web sunucusu seçenekleri. |
| 13 | Diğer dağıtım kanalları | itch.io, CrazyGames, Poki vb. karşılaştırma ve münhasırlık şartları. |
| 14 | Riskler ve sık hatalar | Ret sebepleri, telif ve politika tuzakları, gerçekçi olmayan beklentiler. |
| 15 | Genel karar tablosu | Okurun durumuna göre (bilgi seviyesi, amaç, yaş, çalışma durumu, ülke) önerilen yol. |
| 16 | Kaynakça | Resmî Playables ve YouTube belgeleri, telif, vergi, motorlar, platformlar; bulunamayan açık noktalar. |

## Engeller özeti

Ayrıntı ve karar ağacı: [Süreç ve engel raporu](surec-ve-engeller.html) (§ 1).

- **Amaca göre sonuç:** Öğrenme/portföy için başla (mutlak engel bulunamadı); doğrudan Playables'tan gelir hedefi bugün için durdurur; "garanti gelir yoksa başlamam" diyen için doğru karar beklemek.
- **Erişim davetli:** İlgi formuna dönüş garantisi ve resmî süre yok; başvuru için oyunun bitmiş ve herkese açık bir sitede (itch.io vb.) yayında olması gerekir.
- **Gelir pilotta:** Gelir paylaşımı yalnız seçili geliştiricilerle; başvuru yolu ve ölçüt yok, Türkiye'nin reklam bölgelerine dahil olup olmadığı bulunamadı.
- **Vergi ve statü:** Playables geliri Türkiye'de 20/B değil ticari kazanç (özelge) → şahıs işletmesi gerekir. Kamu görevlileri (657 md. 28) ve yetim/ölüm aylığı alanlar için gelirli yol engellenebilir; yazılı teyit alınmalı.
- **Konsept sınırları:** Dış ağ çağrısı yasak (online/çok oyunculu olmaz); 13+ genel kitle, çocuklara yönelik veya kumar/jeton temalı oyunlar ret riski taşır. Sözleşme metni kamuya açık değil, ihtilaf yeri yurt dışı.

## Kısa cevaplar

- **Nasıl yapılır?** HTML5 (JavaScript/Canvas/WebGL) oyun yapılır, Playables SDK eklenir, ilgi formuyla başvurulur; kabul gelirse Developer Portal'a ZIP yüklenir, test ve sertifikasyondan sonra kademeli yayına çıkar.
- **Şartlar?** Davetli erken erişim; bitmiş ve oynanabilir oyunla başvuru; 13+ genel kitle; İngilizce desteği; dış ağ çağrısı yok; ilk paket 30 MiB altı; dokunmatik ve fare desteği; tüm varlıklar özgün veya lisanslı.
- **Hiç bilmeden yapay zekâ ile yapılabilir mi?** Basit 2D oyunlar (bulmaca, kelime, hiper-casual, idle) için gerçekçi. Kod ve SDK entegrasyonu asistana, fikir, test ve karar insana kalır.
- **Gelir var mı?** Playables'ta reklam altyapısı var ama gelir paylaşımı yalnızca seçili geliştiricilerle pilot aşamasında. Oyun video kanalında YPP ile reklam, Shorts ve fan desteği geliri var; oyun nişinde RPM düşük. İlk 6–12 ay için sıfır gelir varsaymak en güvenlisi.
- **Para nasıl alınır?** YPP ve doğrudan Playables için AdSense; yayıncı üzerinden girilirse yayıncı öder. ABD vergi formu (W-8) verilmezse stopaj artar. Türkiye'de içerik geliri için GVK 20/B istisnası veya şahıs işletmesi; Playables gelirinin 20/B kapsamı belirsiz, mali müşavire veya özelgeye başvurulmalı.
- **Başka oyunları kopyalamak serbest mi?** Oyun kuralları ve mekanikleri genel olarak telifle korunmaz; kod, grafik, ses, ad, logo ve "görünüm ve his" korunur. Birebir klon yasak; Playables ayrıca başka bir Playable'a büyük ölçüde benzeyen oyunu reddeder.
- **Telifsiz ve özgün fikirler?** Geleneksel oyunlar (tavla, mangala, okey, satranç), kelime ve atasözü oyunları, özgün temalı idle, refleks ve bulmaca oyunları; Türk kültürüne özgü temalar.
- **Roblox gibi online ortam olur mu?** Playables içinde bugün olmaz (dış sunucu, hesap, sohbet yasak). Online için Roblox'un kendisi, Fortnite UEFN veya kendi web sitesi ve oyun sunucusu kullanılır.

## İlgili konular

- [Şirket Kurma → Şirketsiz Ne Yapabilirsin?](../Sirket-Kurma/12-sirketsiz.html) — GVK 20/B sosyal içerik üreticiliği istisnası ve şirketsiz gelirin vergi boyutu.
- [Şirket Kurma → Genç Girişimci İstisnası](../Sirket-Kurma/07-genc-girisimci.html) — 29 yaş altı ilk kez işletme açanlar için istisna ve YouTube geliri notları.
- [JavaScript / TypeScript](../../Programlama/JavaScript-TypeScript/) — Playables oyunlarının yazıldığı dil; temel kavramlar ve araçlar.
- [Yapay Zekâ → Kodla Video Üretimi](../../Programlama/Yapay-Zeka/kodla-video/) — Oyun tanıtım videosu ve Shorts'u kodla üretmek için.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
