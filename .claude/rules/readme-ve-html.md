# README zinciri ve HTML anlatımları

## README zinciri

- GitHub `.html` dosyalarını **işlemez**, kaynak kodu gösterir. Depoda gezinme README'ler üzerinden yapılır; HTML sayfaları yerelde (tarayıcıda `index.html`) veya GitHub Pages üzerinden okunur.
- Kök `README.md` = ana içindekiler: her ana kategori ve altındaki alt kategoriler, tıklanabilir bağlantı + kısa açıklama. Uzun açıklama yazılmaz.
- Her klasörün `README.md`'si: başlık, 1 paragraf açıklama, içindekiler tablosu/listesi (bağlantı + 1–2 cümle), varsa "HTML anlatım: [index.html](index.html)", ilgili konular, kaynakça.
- Bağlantılar göreli olur (`CSharp-DotNet/README.md` değil `CSharp-DotNet/` da çalışır; README'yi açmak için klasör bağlantısı tercih edilir).
- En alttan köke kadar her seviyede "← Üst klasör" bağlantısı bulunur.
- Yeni içerik eklendiğinde ebeveyn README'ler **aynı işlemde** güncellenir.

## HTML anlatım sayfaları

- Tüm sayfalar kökteki `assets/style.css` ve `assets/app.js`'i göreli yolla kullanır. Assets kopyalanmaz.
- Yeni sayfa açarken `_sablonlar/konu-sayfasi.html` ve aynı bölümdeki kardeş sayfaların yapısı (topbar, sidebar `nav-group`/`nav-item`, `main .wrap .content`, `h2[id]` başlıklar) örnek alınır.
- Yeni sayfa eklenince aynı bölümdeki **tüm** sayfaların sidebar menüsüne ve bölüm `index.html`'ine bağlantı eklenir.
- Ana dizin `index.html` (kök) kategorilere bağlantı verir; yeni kategori açılınca güncellenir.
- Sayfa dili Türkçe, hitap genel ("sen" dili kullanılabilir ama kişisel durum anlatılmaz).
- Kullanıcı bir konu çalışıp eksik görürse anlatım genişletilebilir; çalışma kâğıdı fotoğraflarından örnekler eklenebilir.
- Taşıma/yeniden adlandırma sonrası kırık bağlantı kontrolü yapılır.

## Yeni araştırma: iki biçim

Kullanıcı yeni bir araştırma istediğinde (özellikle ileride uygulamaya dökülebilecek konularda) aynı içerik iki biçimde üretilir:

- `arastirma.md` — **yapay zekâ için saf Markdown**: HTML yok, net başlık hiyerarşisi, tablolar, kod blokları, her önemli iddiada kaynak + güven etiketi (RESMÎ / 3. TARAF / TAHMİN / ÇELİŞKİLİ), sonda tam kaynakça. Bir AI asistanına bağlam olarak verilip uygulamaya geçilebilmeli.
- `index.html` — **kullanıcının okuyacağı** sayfa: aynı içerik, sitenin tasarımıyla (rozetler, tablolar, callout'lar).
- Klasörün `README.md`'si ikisine de bağlantı verir. Önce `.md` yazılır ve doğrulanır, HTML ondan üretilir; içerik değişirse ikisi birlikte güncellenir.
- Web araştırması resmî kaynaklardan yapılır, iddialar bağımsız doğrulamadan geçirilir; araştırma tarihi yazılır.
