# Yolculuk Paylaşımı Hukuku: Martı TAG Örneği

Türkiye'de özel araçla, bir paylaşımlı yolculuk (ride-hailing) uygulaması üzerinden ücret karşılığı yolcu taşımanın hukuki ve mali tablosu, Martı TAG örneği üzerinden. Bu uygulamalarda özel araç sahibi, aynı yöne giden yolcuyla uygulama aracılığıyla eşleşip ücret karşılığı taşıma yapıyor. Rehber; sistemin işleyişini (fiyat önerisi, sürücü paketi, sürücü şartları, iller), uygulanan hükümleri ve 2026 ceza tablosunu (KTK Ek 2, 7574 sayılı Kanun, 4925 md. 26), 2022–2026 arasındaki mahkeme ve kurum kararlarını (ticaret mahkemesi, istinaf, idare mahkemesi, Danıştay, UKOME, Rekabet Kurulu), şirketin ceza ödeme duyurusuyla sözleşmesi arasındaki çelişkiyi, sigorta ve rücuyu, vergi, Bağ-Kur ve işsizlik ödeneği etkisini, maliyet senaryolarını ve resmi yolları (taksi plakası, D2 yetki belgesi) anlatıyor. Okurun durumu farklı olabileceği için il (büyükşehir mi, TAG listesinde mi, turistik sezonu var mı), araç (kendi binek aracı, kamyonet ruhsatlı, aile ya da yakının aracı, kiralık, araç yok), çalışma durumu ve yakıt türüne göre "Durum → Sonuç" tabloları var.

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

Yapay zekâ için Markdown: [arastirma.md](arastirma.md) — aynı içerik, saf Markdown; her iddiada kaynak numarası ve güven etiketi (RESMÎ / 3. TARAF / TAHMİN / ÇELİŞKİLİ / DOĞRULANAMADI) var, bir AI asistanına bağlam olarak verilebilir.

> Araştırma tarihi: 30 Ekim 2026; bütün kaynaklara bu tarihte erişildi (akaryakıt fiyatı kaynakları [25][26]: 6 Kasım 2026). Yalnız herkese açık sayfalar okundu; hiçbir platforma kayıt olunmadı, uygulama indirilmedi. Ceza tutarları her yıl yeniden değerleme oranıyla artar ve yargı süreci sürüyor; kullanmadan önce kaynakçadaki resmî metinlerden güncelini kontrol et. Mahkeme kararlarının çoğu haberlerden aktarıldı, karar metinleri yayımlanmamış; resmî kaynakta bulunamayan her bilgi "doğrulanamadı" diye işaretli. Maliyet rakamları örnek ve tahmindir. Genel bilgi amaçlıdır, hukuki ya da mali tavsiye değildir; avukata ve mali müşavire danışılmalıdır.

## Bölümler

| § | Bölüm | Kısaca |
|---|---|---|
| 0 | [Kısa cevap](index.html#kisa) | Risk ve mahkeme özeti: ceza, men, sigorta rücusu, istinaf kararı, şirketin ceza ödeme duyurusu. |
| 1 | [Sistem nasıl çalışıyor](index.html#sistem) | Tanım, fiyat önerisi, şirketin gelir modeli, sürücü paketi ve şartları, araç türü, TAG'ın olduğu 30 il. |
| 2 | [Hukuki çerçeve ve cezalar](index.html#cerceve) | KTK Ek 2 (7574 sayılı Kanun ile değişik) ve 4925 md. 26; 2026 ceza, men ve ehliyet tablosu. |
| 3 | [Kararlar zaman çizelgesi](index.html#kararlar) | 2022–2026: Rekabet Kurulu, asliye ticaret, istinaf, idare mahkemesi, Danıştay ve UKOME kararları. |
| 4 | [Şirket cezayı öder mi](index.html#ceza-odeme) | "Tüm cezaları karşılıyoruz" haberi ile kullanıcı sözleşmesindeki sorumluluk hükmü. |
| 5 | [Sigorta](index.html#sigorta) | Trafik sigortasında zarar görene ödeme ve sürücüye rücu (Genel Şartlar B.4), kaskoda kullanım şekli. |
| 6 | [Vergi ve sosyal güvenlik](index.html#vergi) | Ticari kazanç ve vergi kaydı, çalışma durumuna göre Bağ-Kur, işsizlik ödeneğinin kesilmesi. |
| 7 | [İl örnekleri](index.html#ornek-il) | Büyükşehir mi, TAG listesinde mi, turistik sezonu var mı; İstanbul, Antalya ve Muğla örnekleri, akaryakıt fiyatı. |
| 8 | [Araç: durum durum](index.html#arac) | Kendi binek aracı, kamyonet ruhsatlı araç, aile ya da yakının aracı, kiralık araç, araç yok. |
| 9 | [Maliyet ve senaryolar](index.html#maliyet) | Km başı gider (benzin, LPG, motorin), aylık senaryolar, yakıta ve çalışma durumuna göre sonuç, yakalanmanın maliyeti, başlangıç gideri. |
| 10 | [Resmi yollar](index.html#resmi) | Taksi plakası, D2 yetki belgesiyle turizm transferi, kurye ve kargo dağıtıcılığı. |
| 11 | [Doğrulanamayanlar](index.html#dogrulanamayan) | Resmî kaynakta bulunamayan noktalar: paket fiyatları, karar metni, duyurunun aslı, il tarifeleri. |
| 12 | [Kaynakça](index.html#kaynakca) | Mevzuat, resmî belgeler, şirket belgeleri ve haberler (32 kaynak). |

## Kısa sonuç

- Paylaşımlı yolculuğu düzenleyen bir kanun yok. Sürücüye KTK Ek 2/3-a uygulanıyor: 2026'da 100.000 TL ceza (peşin 75.000 TL), ehliyet 30 gün geri alınır, araç 60 gün trafikten men edilir. Bir yıl içinde tekrarında 200.000 TL. Yolcuya 3.870 TL ceza kesilir.
- İstinaf mahkemesi 23.10.2026'da taksici odalarının haksız rekabet davasını reddetti, uygulama mahkeme kararıyla kapatılamıyor. Taksici odaları Yargıtay'a gittiklerini söylüyor. Bu karar sürücü cezalarını kaldırmıyor.
- Şirketin "tüm cezaları karşılıyoruz" duyurusu yalnız haberde geçiyor. Sözleşmede sorumluluk sürücüde.
- Trafik sigortası zarar görene öder, sonra sürücüye rücu edebilir (Genel Şartlar B.4).
- Taşıma sürekli ve kazanç amaçlıysa gelir ticari kazançtır, vergi kaydı gerekir. Bağ-Kur çalışma durumuna bağlıdır: başka bir işte 4/a'lı ya da 4/c'li çalışana 4/b doğmaz. İşsizlik ödeneği alan kişide ödenek kesilir (4447 md. 52/b).

## İlgili konular

- [Şirket Kurma → Şirketsiz Ne Yapabilirsin?](../Sirket-Kurma/12-sirketsiz.html) — Şirket kurmadan yapılabilecekler, yasal gelir yolları ve şirketsiz gelirin vergi boyutu.
- [Şirket Kurma → SGK ve Bağ-Kur](../Sirket-Kurma/02-sgk-bagkur.html) — 4/a, 4/b, 4/c farkı, 2026 Bağ-Kur primi ve aynı anda birden çok statüde çalışmada hangisinin esas alındığı (çakışma kuralı).
- [İşsizlik → Ödenek Alırken Para Kazanmak](../Issizlik/06-odenek-alirken-gelir.html) — Ödenek sürerken gelir getiren işin ödeneğe etkisi, bildirim yükümlülüğü ve yersiz ödeme.

## Kaynakça (erişim: 30 Ekim 2026)

1. 2918 sayılı KTK, Ek Madde 2 — https://www.mevzuat.gov.tr/mevzuatmetin/1.5.2918.pdf
2. EGM, 2026 Trafik İdari Para Ceza Rehberi — https://www.trafik.gov.tr/kurumlar/trafik.gov.tr/trafik-para-cezasi/2026/2026-YILI-TRAFIK-IDARI-PARA-CEZA-REHBERI.pdf
3. ATSO, 7574 sayılı Kanun bilgi notu — https://w0.atso.org.tr/media/open/download/5b1932fb-dc42-43f4-bdf5-b2591a26ca58.pdf
4. UHDGM, 4925 md. 26 cezaları ve 2026 belge ücretleri — https://www.sutso.org.tr/_uploads/birim/2026%20%C4%B0dari%20Para%20Cezalar%C4%B1.pdf
5. Marti Technologies Form 20-F, 2025 mali yılı — https://www.sec.gov/Archives/edgar/data/0001852767/000121390026042974/ea0284871-20f_marti.htm
6. Martı TAG sayfası — https://www.marti.tech/tag/
7. Martı kullanıcı sözleşmesi — https://www.marti.tech/Terms_tr_v4.html
8. TAG Sürücü, App Store — https://apps.apple.com/app/id1576886405
9. CNBC-e, 24.06.2026 — https://www.cnbce.com/haberler/mahkemeden-marti-tag-karari-haksiz-rekabet-onlenecek-h32160
10. Gazete Oksijen, 23.10.2026 — https://gazeteoksijen.com/turkiye/marti-tag-davasinda-karar-mahkeme-tarafindan-yasaklanamaz-293753
11. Diken, 23.10.2026 — https://www.diken.com.tr/dort-yil-suren-marti-tag-davasini-taksiciler-kaybetti/
12. Karar, 29.10.2026 — https://www.karar.com/guncel-haberler/marti-tag-yasallasti-mi-marti-tag-davasini-kim-kazandi-kapatma-kararini-2081182
13. Kapsam Haber, 24.10.2026 — https://www.kapsamhaber.com/marti-tag-davasinda-karar-peki-artik-tamamen-yasal-mi/98764
14. ABC Gazetesi, 26.10.2026 — https://abcgazetesi.com.tr/gundem/marti-tag-duyurdu-suruculere-kesilen-tum-cezalari-sirket-odeyecek-875498
15. Forbes Türkiye, 26.06.2025 — https://www.forbes.com.tr/ekonomi/marti-tag-a-yargidan-e-ulasim-lisansi
16. Webrazzi, 24.10.2025 — https://webrazzi.com/2025/10/24/marti-danistay-karariyla-e-ulasim-lisansini-almaya-hak-kazandi/
17. Bloomberg HT, 14.08.2025 — https://www.bloomberght.com/ukome-den-marti-tag-e-ret-3754914
18. Anadolu Ajansı, 17.01.2024 — https://www.aa.com.tr/tr/isdunyasi/ulasim/mahkeme-marti-tag-kullanicisina-verilen-korsan-tasimacilik-cezalarini-iptal-etti/685045
19. Duvar English, 13.09.2022 — https://www.duvarenglish.com/turkeys-competition-watchdog-drops-mobility-app-marti-probe-after-commitments-news-61263
20. ZMSS Genel Şartları (TSB) — https://www.tsb.org.tr/content/Legislations/Trafik_Genel_%C5%9Eartlar%C4%B1_06122021__Ekler_Dahil.pdf
21. Yargıtay 17. HD E.2019/4070 K.2020/8096 (Minval Hukuk) — https://minvalhukuk.com/yargitay-kararlari/istiap-haddinin-asilmasi-kazanin-olusumuna-dogrudan-etki-etmemesi-teminat-disi-hal-yargitay-karari/
22. MuhasebeTR, 16.05.2025 — https://www.muhasebetr.com/yazarlarimiz/nurikulcur/009/
23. 4447 sayılı Kanun — https://www.mevzuat.gov.tr/mevzuatmetin/1.5.4447.pdf
24. Vergi Merkezi, 2026 Bağ-Kur — https://vergimerkezi.com.tr/2026-bagkur-primi-ne-kadar/
25. Motor1, Akaryakıt Fiyatları – 30 Ekim 2026 (Petrol Ofisi ortalama pompa fiyatları: Ankara, Antalya, Bursa, İstanbul, İzmir; erişim 06.11.2026) — https://tr.motor1.com/news/813809/akaryakit-fiyatlari-30-ekim-2026/
26. Döviz.com, akaryakıt fiyatları (dağıtıcı bazında, il seçilebilir; günlük güncellenir, erişim 06.11.2026) — https://www.doviz.com/akaryakit-fiyatlari
27. arabam.com, ikinci el ilanları: yaygın bir dizel kompakt sedan (ör. Fiat Egea 1.3 Multijet) — https://www.arabam.com/ikinci-el/otomobil/fiat-egea-1-3-multijet
28. Teknotalk, Ağustos 2026 trafik sigortası — https://www.teknotalk.com/zorunlu-trafik-sigortasi-agustos-2026-primleri-208306/
29. eDönüştür, TAG sürücü kazancı — https://edonustur.com/marti-tag-surucu-ne-kadar-kazaniyor/
30. Sabah, 02.06.2026 — https://www.sabah.com.tr/yasam/korsan-taksiciler-siki-denetime-takildi-araclar-trafikten-men-edildi-para-cezasi-kesildi-7595213
31. NTV, İstanbul taksi plakası fiyatı — https://www.ntv.com.tr/ntvpara/taksi-plakalari-10-milyonun-altina-geriledi-1717262
32. Ekonomi Gazetesi, Antalya protestosu — https://www.ekonomigazetesi.com/sehirler/antalyada-taksicilerden-martitag-binbin-protestosu-29097

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
