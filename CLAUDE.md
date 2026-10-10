# Research — kişisel öğrenme kütüphanesi

Bu depo, sahibinin öğrendiklerini kaydettiği **herkese açık** bir dijital kütüphanedir (dil, programlama, genel rehberler). GitHub'da public yayınlanacak; başkaları da yararlanabilir. Kod projesi değil, **klasör mimarisi** projesidir.

Bu dosya ve `.claude/rules/` altındaki kurallar, bilgisayar değişse de oturumdan bağımsız kalsın diye depo içinde tutulur. Her oturumda bunlara uy:

- @.claude/rules/klasor-yapisi.md — klasör mimarisi, adlandırma, nereye ne konur
- @.claude/rules/gizlilik-kvkk.md — kişisel veri yasağı (EN ÖNEMLİ KURAL)
- @.claude/rules/ayristirma.md — `_ayristirilacaklar/` klasörünü işleme akışı
- @.claude/rules/readme-ve-html.md — README zinciri ve HTML anlatım sayfası kuralları
- @.claude/rules/calisma-modlari.md — "konuyu aç / örnek proje hazırla", fotoğraftan not çıkarma, token tasarrufu
- @.claude/rules/calisma-gunlugu.md — `CALISMA-GUNLUGU.md` süreç kaydı, tarihlerin dosya tarihinden belirlenmesi

## Kısa özet

1. Hiçbir dosyada kişisel veri olmaz (isim, telefon, TC, adres, maaş, işveren adı, ev/araç sahipliği, borç, kişisel tarihler, CV'ye özel yorum).
2. Her klasörün bir `README.md`'si vardır; kök README'den her konuya tıklayarak inilebilir. Her bağlantının yanında 1–2 cümlelik açıklama olur.
3. Yeni içerik doğru kategoriye gider; yoksa kategori açılır. **"Diğer" adlı klasör/kategori açılmaz.**
4. Klasör adları ASCII, boşluksuz, kebab-case veya teknoloji adı (`CSharp-DotNet`, `01-temel-kavramlar`).
5. Kullanıcıyla iletişim Türkçe; içerik Türkçe (teknik terimler orijinal hâliyle).
6. Yalnızca kullanıcının README'de anlattıklarına dayan; kodu satır satır incelemeyi yalnızca kullanıcı isterse yap.
7. Kullanıcının koduna açıklama yorumu ekleme; açıklama README'ye yazılır.
8. Her ayrıştırma/konu hazırlama sonunda `CALISMA-GUNLUGU.md`'ye kısa kayıt düş (tarih = çalışmanın yapıldığı gün, dosya tarihlerinden).
9. Ayrıştırma sonunda commit'i Claude atar (çalışma tarihiyle, konu başına ayrı commit); **push asla yapılmaz**. Ayrıntı: `ayristirma.md` → Commit.
