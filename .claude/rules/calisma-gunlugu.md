# Çalışma günlüğü (`CALISMA-GUNLUGU.md`)

Kökteki `CALISMA-GUNLUGU.md`, kullanıcının ne zaman ne çalıştığını geriye dönüp görebilmesi için tutulan **kısa, Türkçe** süreç kaydıdır. Commit geçmişinin yerine geçer; commitler büyüyünce takip zorlaştığı için asıl kaynak budur.

## Tarih nasıl belirlenir

Tarih **commit/ayrıştırma tarihi değil, çalışmanın yapıldığı tarihtir**:

1. Ayrıştırma sırasında, öğeyi taşımadan **önce** tarihlere bak: klasördeki dosyaların oluşturulma (`CreationTime`) ve değiştirilme (`LastWriteTime`) zamanları; `bin/`, `obj/`, `node_modules/`, `.vs/`, `.git/` hariç. PowerShell örneği:
   `Get-ChildItem -Recurse -File <klasor> | ? { $_.FullName -notmatch '\\(bin|obj|node_modules|\.vs|\.git)\\' } | Measure-Object CreationTime,LastWriteTime -Minimum -Maximum`
2. En erken tarih = başlangıç, en geç değiştirilme = bitiş. Tek günse tek tarih, değilse aralık yazılır (`11–13.10.2026`).
3. Kullanıcı README'sinde tarih yazdıysa o önceliklidir.
4. Git dosya tarihlerini saklamaz; bu yüzden tarih **ayrıştırma anında** günlüğe yazılmalıdır, sonradan bulunamaz.

## Biçim

Yeniden eskiye sıralı, aya göre gruplanmış; her kayıt tek satır:

```
## Ekim 2026

- **11.10.2026** — Redis denemeleri (.NET): StackExchange.Redis ile önbellek örneği → [CSharp-DotNet/10-kutuphaneler/Redis](Programlama/CSharp-DotNet/10-kutuphaneler/Redis/)
- **09–10.10.2026** — İngilizce: Present Perfect notları (BTK Akademi) → [Ingilizce/03-zamanlar](Dil/Ingilizce/03-zamanlar/)
```

- Çok detaylı olmaz: ne çalışıldı, hangi kaynak (varsa), nereye kondu. Bir–iki satırı geçmez.
- Depo düzeni değişiklikleri (yeni kategori açıldı, yapı değişti) de kısa kayıt olarak girer.
- Her ayrıştırma ve her "konu hazırlama" işleminin sonunda günlük güncellenir.

## Kod yorumları

Kullanıcının kodlarına açıklama amaçlı yorum satırı **eklenmez**. Açıklamalar README'lere yazılır. Kod yalnızca anlamak için okunur.
