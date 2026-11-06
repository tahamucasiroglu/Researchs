# Gizlilik ve KVKK — kişisel veri yasağı

Depo herkese açıktır. Okuyan biri sahibinin kim olduğunu, nerede oturduğunu, ne kazandığını, kime borçlu olduğunu, nerede çalıştığını **öğrenememelidir**. Bu kural her şeyin önündedir.

## Asla yazılmaz

- Ad, soyad, kullanıcı adı (yazar alanı dahil), fotoğraf, imza
- TC kimlik no, telefon, e-posta, ev/iş adresi, IBAN, kart/hesap bilgisi, plaka
- Maaş, prim, tazminat tutarı, birikim, borç, kredi, kira, gelir/gider rakamları **kişiye ait olarak**
- İşveren / şirket adı, iş unvanı, işe giriş-çıkış tarihi, fesih tarihi gibi kişisel tarihler
- Ev, araç, mülk sahipliği; aile durumu; sağlık bilgisi; yaşanan şehir/ilçe
- CV'ye özel yorumlar ("CV'nde var ama kullanmadığın…"), kişisel kariyer planı, mülakat durumu
- Ekran görüntüsü/fotoğraflarda: isim, numara, adres, yüz, QR kod, belge numarası — yüklemeden önce kırpılır/karartılır ya da kullanıcıya sorulur

## Genelleştirme yöntemi

Kişisel durumu silmek yerine **her durumu kapsayan genel anlatıma** çevir:

- "Ev senin olduğu için kira sözleşmesi gerekmez" → "Şirket adresi kurucunun kendi mülküyse kira sözleşmesi gerekmez; kiracıysa ev sahibiyle kira sözleşmesi yapılır ve şu vergisel sonuçlar doğar…"
- "Net 50.000 TL maaşınla…" → "Örnek: net X TL maaş alan biri için…" — örnek rakamlar yuvarlak ve açıkça **örnek** olarak etiketlenir; gerçek kişisel rakamdan türetilmez.
- "İşyerin 25 kişi, o yüzden…" → "Çalışan sayısı 30'dan azsa…; 30 ve üzeriyse (İK, iş güvencesi hükümleri)…"
- "CV'nde yazan teknolojiler" → "İş ilanlarında sık istenen teknolojiler".
- Tahmini/hesaplanmış genel rakamlar (vergi oranı, asgari ücret, ortalama kuruluş maliyeti) kalabilir; tarih ve "TAHMİN" etiketiyle.
- Örnek işletme, kişi ve alan adı uydururken gerçekte var olan biriyle çakışmamasına dikkat edilir: "Örnek Nakliyat" ya da `ornek.com.tr` gibi adlar gerçek firmalara ait olabilir. Açıkça uydurma adlar ("Hayalî Nakliyat") ve alan adlarında `example.com` / `.example` (RFC 2606) kullanılır; koordinat, telefon ve adres yer tutucu olur.
- Dil örneklerinde birinci şahıs cümleler ("I was born in…", "I've worked here for 3 years", "I live in…") yazarın kendi bilgisi gibi okunabilir. Yaş, doğum yılı, şehir, işe giriş tarihi, aile ve sağlık içeren örnekler üçüncü şahsa ya da açıkça hayalî bir karaktere çevrilir.
- Tek bir il/ilçe ya da tek bir araç modeli "örnek" diye öne çıkarılırsa okurun (yazarın) kendi durumu gibi okunabilir; birkaç örnekten biri olarak verilir ya da sınıf düzeyine çekilir ("yaygın bir dizel kompakt sedan").

## Tek durum varsayma — çok dallı anlat

Kişisel veri olmasa bile, anlatım **tek bir okuru/durumu varsayıyorsa** genelleştirilir. Okuyanın durumu farklı olabilir; cevap her olası durumu kapsamalı:

- Kesin hüküm gibi yazılmış ama aslında belirli bir duruma bağlı sonuçlar ("Şahıs şirketi kur", "Yurt dışı şirket: Hayır", "Şubat'ta kur") → "Hangi durumda hangisi" karar tablosu veya dallanma (ör. gelir seviyesi, ortak sayısı, yaş, çalışma durumu, müşterinin yurt içi/dışı olması).
- Gizli varsayımlar: yaş (29 altı/üstü), çalışma durumu (4/a çalışan, işsiz, ödenek alan, emekli, öğrenci), fesih türü (işveren feshi, istifa, haklı fesih, ikale, deneme süresi), işyeri büyüklüğü, prim günü bandı, il/bölge grubu, medeni/hane durumu, mülk sahibi/kiracı, borç durumu.
- Programlama/Dil: okurun belirli bir dili bildiğini varsayma (ör. "C# bilen için"); farklı başlangıç noktaları (hiç bilmeyen, başka dilden gelen) için yol göster. Karşılaştırmalar "C#'tan geliyorsan" gibi açıkça etiketlenmiş ek bilgi olarak kalabilir.
- Dallanma okunaklı olmalı: kısa tablo veya "Durum → Sonuç" listesi; her dal için dayanak (mevzuat maddesi/kaynak) korunur.

## Kontrol

- `_ayristirilacaklar/` içeriği işlenirken her dosya bu listeye göre taranır.
- Commit öncesi şüpheli bir şey görürsen dur ve kullanıcıya sor.
- Git geçmişine giren kişisel veri silinse de geçmişte kalır; bu yüzden **önce temizle, sonra commit**.
