# `_ayristirilacaklar/` işleme akışı

Kullanıcı hafta boyunca yaptığı çalışmaları kendi adlandırdığı klasörlerle buraya atar (ör. `redis denemeleri/`, `ingilizce cuma/`). Her klasörde genelde ne yaptığını anlatan bir `README.md` (veya not) bulunur. Kullanıcı "ayrıştır" dediğinde:

1. **Listele**: `_ayristirilacaklar/` altındaki her klasörü/dosyayı sırayla ele al (README hariç kök dosyalar).
2. **Anla**: Önce kullanıcının README/notunu oku. Kodu satır satır inceleme — yalnızca kullanıcı "koda bakarak ayarla" demişse veya README yoksa ve konu klasör adından anlaşılmıyorsa proje yapısına (dosya adları, `.csproj`, `package.json`) kısaca bak.
3. **Hedefi belirle**: `klasor-yapisi.md` kurallarına göre doğru yeri bul. Örnek: `redis denemeleri/` + "Redis'i test ettim" → `Programlama/CSharp-DotNet/10-kutuphaneler/Redis/`. Kategori yoksa açılır; emin değilsen kullanıcıya sor.
4. **Gizlilik taraması**: `gizlilik-kvkk.md`'ye göre tara. Ayrıca kodda `appsettings*.json`, `.env`, connection string, API anahtarı, parola, kişisel yol (`C:\Users\<ad>`) ara; varsa temizle veya örnek değere çevir.
5. **Taşı**: İçeriği hedefe taşı. Gereksiz derleme çıktılarını (`bin/`, `obj/`, `node_modules/`, `.vs/`, `__pycache__/`) taşıma.
6. **README yaz/düzenle**: Hedef klasörün README'si:
   - Konunun ne olduğunu internetteki yaygın tanımına uygun, açıklayıcı ve doğru biçimde anlatır (ör. Redis nedir, ne işe yarar, ne zaman kullanılır).
   - Kullanıcının bu klasörde ne yaptığını (kendi notundan) anlatır.
   - Nasıl çalıştırılır, kaynakça (kullanıcının verdiği kaynaklar + resmi doküman), ilgili konulara bağlantılar.
   - Araştırma niteliğindeki çalışmada `arastirma.md` yoksa `index.html`'den sadık biçimde (yeni iddia eklemeden, rakam değiştirmeden) üretilir; ikisi birlikte güncel tutulur (`readme-ve-html.md` → Yeni araştırma: iki biçim).
7. **Üst README'leri güncelle**: Ebeveyn README'lere bağlantı + 1–2 cümle açıklama ekle (ör. `CSharp-DotNet/README.md` → Kütüphaneler → `[Redis](...)` — "Bellekte anahtar-değer saklayan, önbellek ve kuyruk için kullanılan veri deposu."). Kök README'ye kadar zincir kopmamalı.
8. **Fotoğraflar**: Çalışma kâğıdı fotoğraflarındaki yazıyı çıkar, konuyu belirle, notu `notlar/` altına Markdown olarak yaz, fotoğrafı (kişisel veri yoksa, küçültülmüş) `gorseller/` altına koy.
9. **Günlüğe yaz**: Taşımadan ÖNCE dosya tarihlerinden çalışma tarihini belirle (`calisma-gunlugu.md`) ve `CALISMA-GUNLUGU.md`'ye kısa kayıt ekle. (Pratikte bu adımı 2. adımla birlikte, taşımadan önce yap.)
10. **Temizle ve raporla**: İşlenen öğeyi `_ayristirilacaklar/`'dan sil. Sonunda kullanıcıya: ne nereye gitti, hangi README'ler güncellendi, neyi atladın/neyi sormak istiyorsun — kısa liste.

## Commit

Ayrıştırmanın son adımı commit'tir; kullanıcıya ayrıca sorulmaz. **Push varsayılan olarak yapılmaz**; kullanıcı açıkça isterse (ör. "commitle ve pushla") commit'lerden sonra yapılır. Push öncesi `git fetch` ile uzak dalın ilerlemediği kontrol edilir; yalnız ileri sarma (fast-forward) push'u yapılır, `--force` kullanılmaz; uzak dal ilerlemişse durulur ve kullanıcıya sorulur.

- Her ayrıştırılan çalışma (konu) **ayrı bir commit** olur; README ve günlük güncellemeleri o çalışmanın commit'ine dahildir. Depo düzeni değişiklikleri ayrı commit.
- Commit tarihi = çalışmanın yapıldığı tarih (`calisma-gunlugu.md`'deki yöntemle bulunan en erken tarih). Böylece `git log` da gerçek çalışma sırasını gösterir:
  `GIT_AUTHOR_DATE="2026-10-11T12:00:00" GIT_COMMITTER_DATE="2026-10-11T12:00:00" git commit -m "..."`
  Aralıksa başlangıç tarihi kullanılır; saat bilinmiyorsa 12:00. Birden çok çalışma aynı güne düşerse tarih sırası korunur.
- Mesaj Türkçe, kısa ve kalıplı: `<kategori>: <ne yapıldı>` — ör. `CSharp-DotNet: Redis önbellek denemesi eklendi`, `Ingilizce: Present Perfect notları eklendi`, `depo: kurallar güncellendi`.
- Commit öncesi: `git status` ile yalnızca ilgili dosyaların sahnelendiğini, `.gitignore` dışında kalması gereken bir şey (bin/obj, .env, büyük video, kişisel veri) girmediğini kontrol et. Gizlilik taraması temiz değilse commit atma, kullanıcıya sor.
- Kullanıcı kendi commit'ini attıysa onu değiştirme (amend/rebase yok); üstüne yeni commit at.
