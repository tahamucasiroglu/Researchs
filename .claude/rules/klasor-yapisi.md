# Klasör yapısı

```
/                         Depo kökü (README.md = ana içindekiler, index.html = HTML ana dizin)
├─ assets/                Tüm HTML sayfalarının ORTAK style.css ve app.js dosyası (tek kopya)
├─ _ayristirilacaklar/    Gelen kutusu. Kullanıcı ham çalışmalarını buraya atar (içeriği git'e girmez)
├─ _sablonlar/            Yeni konu/HTML/README açarken kopyalanacak şablonlar
├─ Dil/
│  ├─ Turkce/             01-temel-kavramlar/ … 09-denklem-ozeti/
│  └─ Ingilizce/          01-temel-denklemler/ … 07-yol-haritasi/
├─ Programlama/
│  ├─ proje-fikirleri/    Seviyelere göre proje fikirleri kataloğu
│  ├─ CSharp-DotNet/      01-csharp-dili/ … 10-kutuphaneler/ (Redis, RabbitMQ… burada alt klasör olur)
│  ├─ Java/
│  ├─ JavaScript-TypeScript/
│  ├─ HTML-CSS/
│  ├─ Python/  Go/  Rust/
│  └─ Blockchain/         Dil değil alan; ayrı eğitim gerektirdiği için kendi kategorisi var
└─ Rehberler/
   ├─ Issizlik/           Türkiye'de işsizlik hakları — genel rehber
   └─ Sirket-Kurma/       Türkiye'de şirket kurma — genel rehber
```

## Konu klasörü düzeni (Dil ve Programlama)

Her konu bir klasördür:

```
NN-konu-adi/
├─ index.html     Konunun HTML anlatımı (varsa)
├─ README.md      Kısa açıklama + içindekiler + bağlantılar (zorunlu)
├─ notlar/        Kullanıcının çalışma notları (.md), gerektiğinde açılır
├─ gorseller/     Çalışma kâğıdı fotoğrafları vb., gerektiğinde açılır
└─ <proje>/       Kod denemeleri (ör. Redis/ altında doğrudan proje)
```

- Boş klasör açma (git boş klasörü tutmaz); içerik geldiğinde aç.
- Numara öneki (`01-`, `02-`) yalnızca sıralı öğrenme yolu olan konularda kullanılır. Kütüphane/araç klasörleri numarasızdır: `CSharp-DotNet/10-kutuphaneler/Redis/`.
- Rehberler/ altındaki dosyalar düz HTML sayfalarıdır (`01-cikis-haklari.html`); not/proje eklenmez.

## Kategori kuralları

- Programlama **dile/platforma göre** ayrılır. "Frontend", "Backend", "Diğer diller" gibi katman veya artık kategori **açılmaz**. Bir dil eklenince kendi klasörü olur (`Programlama/Kotlin/`).
- Dil/platformdan bağımsız, ayrı eğitim gerektiren alanlar (Blockchain gibi) kendi kategorisini alabilir. Yeni böyle bir alan (ör. Veritabanlari, DevOps, Yapay-Zeka) açmadan önce kullanıcıya sor.
- Bir teknoloji birden çok dilde kullanılıyorsa (Redis hem .NET hem Java'da), çalışmanın yapıldığı dilin altına konur; diğer yerden README'de bağlantı verilir. Kopyalanmaz.
- Bir çalışma başka bir konuyu da kullanıyorsa (RabbitMQ denemesinde Redis de kullanılmış), ana konuya konur, README'de "ilgili: [Redis](...)" diye karşılıklı bağlantı verilir.
- Yeni dil (insan dili) öğrenilecekse `Dil/<DilAdi>/` açılır (ör. `Dil/Rusca/`), Türkçe/İngilizce düzeni örnek alınır.

## Adlandırma

- ASCII, boşluksuz: Türkçe karakter kullanılmaz (ç→c, ğ→g, ı→i, İ→I, ö→o, ş→s, ü→u). Sebep: URL kodlaması ve macOS/Windows Unicode normalizasyon sorunları.
- Konu klasörleri kebab-case küçük harf (`05-cumle-yapilari`); teknoloji/dil klasörleri resmi yazılışına yakın (`CSharp-DotNet`, `JavaScript-TypeScript`, `Redis`, `RabbitMQ`).
- Görünen başlıklar (README, HTML) Türkçe karakterli ve düzgün yazılır.

## Büyük dosyalar

- GitHub dosya başına 100 MB'ı reddeder, 50 MB üstünde uyarır. Video koyma; gerekiyorsa bağlantı ver ya da kullanıcıya Git LFS'i hatırlat.
- Fotoğrafları gerekirse küçült (uzun kenar ~1600 px, JPEG/WebP). `bin/`, `obj/`, `node_modules/` vb. `.gitignore` ile dışarıda.
