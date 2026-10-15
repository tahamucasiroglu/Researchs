# Türkiye Kamu ve Açık Veri API'leri

Türkiye'de merkezi bir kamu API'si yoktur. Veriler belediye açık veri portallarına (İBB ve İzmir CKAN), kurum servislerine (TÜİK SDMX, Diyanet Awqat Salah), dosya yayınlarına (Resmî Gazete) ve GitHub'daki topluluk projelerine (TurkiyeAPI, Nager.Date) dağılmış durumdadır. Bu kategori iki sayfadan oluşur. Birincisi resmî kurum ve belediye kaynaklarını, ikincisi bu verileri derleyen topluluk API'lerini ve CollectAPI gibi ticari aracıları anlatır. Bu kaynaklar sosyal medya gibi olay akışı sunmaz. Takip uygulamasında **periyodik sorgulama (polling) ve değişiklik tespiti** için ya da konum, tatil ve il/plaka bilgisiyle **zenginleştirme ve filtreleme** katmanı olarak işe yarar.

## İçindekiler

| Platform | Erişim seviyeleri | Takip için ne mümkün | Son doğrulama |
|---|---|---|---|
| [Türkiye Açık Veri ve Kamu API'leri](Turkiye-Acik-Veri-ve-Kamu-APIleri.md) | Açık (İBB/İzmir CKAN, Resmî Gazete dosyaları) · Geliştirici (TÜİK SDMX, SMS doğrulamalı API anahtarı) · İşletme onayı (Diyanet başvurusu, e-Devlet yalnızca kurumlara, GİB özel entegratör izni) · Ücretli (e-Fatura entegratörleri, CollectAPI) · Resmî olmayan (Resmî Gazete ve eczacı odası kazıma) | Yeni/güncellenen veri setleri, yeni Resmî Gazete sayısı, TÜİK'te yeni gözlem ve günlük nöbetçi eczane polling ve CKAN Atom feed'iyle izlenebilir; webhook veya push yok. | 15.10.2026 |
| [Türkiye Topluluk API'leri (GitHub)](Turkiye-Topluluk-APIleri.md) | Açık (TurkiyeAPI, Nager.Date Community, GitHub ham JSON) · Geliştirici (CollectAPI token) · Ücretli (CollectAPI Premium/Enterprise, Nager.Date Pro/offline lisans) · Resmî olmayan (listelerdeki gayriresmî API'ler, çoğu ölü) | İl/ilçe normalizasyonu, tatilde bildirimi susturma ve plaka/alan kodu eşleme için kullanılır; veri güncelliği `/v2/meta` ve GitHub `releases.atom` ile izlenir. | 15.10.2026 |

## Kategoriye özgü notlar

- **Gerçek zamanlı yok:** Bu kategorideki hiçbir resmî veya topluluk kaynağında webhook, WebSocket ya da streaming yoktur. En yakın şey CKAN portallarının Atom feed'leridir (`/feeds/dataset.atom`). Geri kalan her şey polling ile yapılır.
- **Ulusal portal erişilemiyor:** `data.gov.tr` 15.10.2026'da bağlantıyı reddetti. Pratikte en kullanışlı kaynaklar büyükşehir CKAN portallarıdır.
- **e-Devlet ve GİB bireysel geliştiriciye kapalıdır.** e-Devlet entegrasyonu yalnızca yetkili kurumlara verilir. e-Fatura, GİB izinli özel entegratörlerin API'leri üzerinden kullanılır. e-Devlet şifresiyle otomatik giriş yapan araçlar hesap güvenliği, kullanım koşulları ve KVKK açısından yüksek risklidir.
- **Kota ve önbellek:** Diyanet Awqat Salah'ın kotası çok düşüktür (servis başına 10 istek). Vakitler aylık çekilip önbelleğe alınmalıdır. TurkiyeAPI genel sunucusunda dakikada 300 istek sınırı vardır; toplu iş için veri seti dökümü ya da self-host önerilir.
- **TÜİK geçişi:** Eski MEDAS servisleri 2027'den itibaren güncellenmeyecek. Yeni projede SDMX 2.1 servisi (`nsiws.tuik.gov.tr`) veya TCMB EVDS kullanılmalıdır.
- **Topluluk verisi resmî değildir.** Resmî işlemlerde (adres kodu, kargo, fatura) asıl kaynak NVİ/UAVT ve PTT'dir. İlçe adları il bilgisi olmadan benzersiz değildir (ör. 51 ilçenin adı "Merkez").
- **Tatil verisi:** Nager.Date tam gün tatilleri verir ama arife yarım günlerini vermez. Yarım günler için Python `holidays` paketi kullanılır. Nager.Date v3'ün desteği 31.01.2027'de bitiyor; yeni projede v4 kullanılmalıdır.

## İlgili kategoriler

- [Finans ve Ekonomi](../Finans-ve-Ekonomi/): TCMB EVDS üzerinden TÜİK serilerine (enflasyon vb.) API ile erişim.
- [Haber](../Haber/): Haber siteleri ve RSS takibi.
- [Mesajlaşma](../Mesajlasma/): Takip sonuçlarını Telegram/WhatsApp ile bildirme.
- [Geliştirici Platformları](../Gelistirici-Platformlari/): GitHub depo, sürüm ve commit takibi.
- [Şirket Kurma rehberi](../../Rehberler/Sirket-Kurma/): e-Fatura ve özel entegratör seçimi bağlamı.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
