# Çalışma modları

## 1. Ayrıştırma
"Ayrıştır" denince `ayristirma.md` akışı uygulanır.

## 2. Konu hazırlama ("bugün X çalışacağım, klasörü/projeyi aç")
1. Doğru hedef klasörü aç (`klasor-yapisi.md`).
2. Çalışan, minimal bir örnek proje oluştur (ör. .NET için `dotnet new console`/`webapi` + gerekli NuGet paketi). Gerekiyorsa `docker-compose.yml` ile bağımlı servisi (Redis, RabbitMQ) ekle.
3. README'ye: konu nedir, kurulum adımları, kullanıcının yapması gereken alıştırmalar (adım adım), kaynaklar.
4. Üst README'lere bağlantı ekle.
5. Konuyu kullanıcıyla birlikte anlatarak da işleyebilirsin; kullanıcı videodan izleyecekse yalnızca iskeleti hazırla.

## 3. Fotoğraftan not
Kullanıcı çalışma kâğıdı fotoğrafı yüklerse: yazıyı çıkar, sayfanın konusunu belirle, ilgili konu klasörünün `notlar/` altına düzenli Markdown not olarak yaz; kategoriye göre (ör. İngilizce → `03-zamanlar/`) yerleştir. Hatalı/eksik noktaları nazikçe belirt. Fotoğrafta kişisel veri yoksa küçültüp `gorseller/` altına koy.

## 4. Kaynaklar
Kullanıcının belirttiği kaynaklar (ör. BTK Akademi kursları) ilgili README'nin kaynakça bölümüne eklenir.

## Token tasarrufu
- Büyük projelerde kodu baştan sona okuma; kullanıcının README'sine güven.
- Kullanıcı "komple incele" dediğinde kapsamlı inceleme yapılır.
- HTML sayfaları büyüktür; düzenlerken yalnızca ilgili bölümü oku.
