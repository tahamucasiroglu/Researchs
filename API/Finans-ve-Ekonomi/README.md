# Finans ve Ekonomi API'leri

Bu klasör; döviz kurları, faiz, enflasyon gibi makroekonomik veriler, borsa fiyatları ve şirket bildirimleri (KAP, SEC EDGAR) için kullanılabilecek API'leri ve veri kaynaklarını inceler. Her sayfada erişim seviyeleri (kimliksiz, ücretsiz anahtar, kurumsal lisans, resmî olmayan yollar), kimlik doğrulama, temel uç noktalar, gerçek zamanlı/bildirim seçenekleri, takip uygulaması için neyin mümkün olduğu, hız sınırları ve riskler yer alır. Bu alanda "takip" çoğunlukla bir kişiyi ya da kanalı izlemek değil, **yeni veri yayını, kurum duyurusu, şirket bildirimi veya fiyat eşiği** gibi olayları yakalamak anlamına gelir.

## İçindekiler

| Platform | Erişim seviyeleri | Takip için ne mümkün | Son doğrulama |
|---|---|---|---|
| [TCMB EVDS ve Döviz Kurları](TCMB-EVDS.md) | Açık (`today.xml` kurları) · Geliştirici (ücretsiz EVDS anahtarı) · Ücretli katman yok | Günlük gösterge kur ve EVDS serilerinin yeni verisi polling veya 19:00 e-posta aboneliğiyle yakalanır; push ve gün içi kur yoktur. | 15.10.2026 |
| [Borsa İstanbul ve KAP](Borsa-Istanbul-ve-KAP.md) | Açık (CSV/web sayfası, API değil) · İşletme onayı (alt dağıtıcı) · Ücretli (VDS, KAP Veri Yayın Servisi) · Resmî olmayan (yfinance `.IS`, pykap) | KAP bildirimleri ve gerçek zamanlı fiyat yalnızca lisansla programatik alınır; ücretsiz yol site sorgulama ve 15 dk gecikmeli resmî olmayan veridir. | 15.10.2026 |
| [ABD Resmî Ekonomi Verileri](ABD-Resmi-Ekonomi-Verileri.md) (FRED, Fed, Hazine, BLS, BEA, SEC EDGAR, NY Fed) | Açık (SEC, Hazine, Fed, BLS v1, NY Fed) · Geliştirici (FRED, BLS v2, BEA ücretsiz anahtar) · Resmî olmayan (`efts.sec.gov`, 3. taraf sarmalayıcılar) | Yeni şirket başvurusu, Form 4, Fed kararı, CPI/istihdam yayını RSS/Atom, ICS takvim ve polling ile yakalanır; webhook/WebSocket yoktur. | 15.10.2026 |
| [Piyasa Veri API'leri](Piyasa-Veri-APIleri.md) (Alpha Vantage, Twelve Data, Finnhub, Massive/Polygon, FMP, Yahoo) | Geliştirici (ücretsiz anahtar, düşük kota) · İşletme onayı (gösterim/dağıtım lisansı) · Ücretli (gerçek zamanlı, WebSocket, BIST) · Resmî olmayan (yfinance) | Fiyat eşiği WebSocket (Finnhub ücretsiz, ABD) veya polling ile izlenir; şirket haberi, bilanço takvimi ve insider işlemleri sorgulanabilir; webhook yoktur. | 15.10.2026 |
| [TradingView](TradingView.md) | Açık (widget, Lightweight Charts) · İşletme onayı (Advanced Charts lisansı, broker API) · Ücretli (alarm webhook'u için plan + 2FA) · Resmî olmayan (iç WebSocket kütüphaneleri, ToS ihlali) | Fiyat/indikatör/strateji sinyali alarm webhook'uyla kendi sunucuna push edilir; veri okuma, kullanıcı fikri ve canlı yayın takibi resmî olarak mümkün değildir. | 15.10.2026 |

## Bu kategoriye özgü notlar

- **Push nadirdir.** İncelenen kaynakların neredeyse hiçbiri webhook sunmaz; tek resmî push TradingView alarm webhook'udur. Gerçek zamanlı akış (WebSocket) piyasa veri sağlayıcılarında çoğunlukla ücretli planlardadır. Kamu kurumlarında yol RSS/Atom, takvim (ICS), e-posta aboneliği ve **polling**'dir.
- **Önerilen mimari:** "Olay oldu" sinyalini RSS/Atom, takvim veya `ETag`/`Last-Modified` gibi hafif bir yolla al, ayrıntıyı sonra JSON API'den çek; son görülen kimliği (`accessionNumber`, `End_Date`, `Bulten_No` vb.) saklayarak yinelenen bildirimi engelle; kota sayacı ve önbellek kullan.
- **Gecikme ve lisans:** Borsa verisi 15 dakikadan yeniyse "eşanlı" sayılır ve lisansa tabidir (BIST). Kişisel, ekranda gösterilmeyen kullanım ile **başkalarına veri yayınlayan** bir uygulama arasında hukuki fark büyüktür; ikincisi için dağıtım/gösterim lisansı gerekir.
- **Resmî olmayan yollar kırılgandır:** Yahoo Finance (`yfinance`), KAP/İş Yatırım kazıyıcıları ve TradingView iç protokol kütüphaneleri habersiz bozulabilir, IP engeli veya ToS ihlali riski taşır. Kişisel deneme dışında birincil kaynak yapılmamalıdır.
- **Eski örneklere dikkat:** EVDS2 adresleri (anahtar URL'de) artık çalışmıyor, EVDS3'te anahtar `key` başlığında gönderiliyor; IEX Cloud 2024'te kapandı; Polygon.io artık Massive adını taşıyor.
- **Ücretsiz kamu verisi:** TCMB EVDS ve ABD kurumlarının (FRED, BLS, BEA, SEC, Hazine) tamamı ücretsizdir; kısıt yalnızca hız sınırı ve kullanım şartlarıdır (ör. SEC için `User-Agent` beyanı ve en çok 10 istek/sn).

## İlgili kategoriler

- [Kripto Borsaları](../Kripto-Borsalari/): Kripto fiyatı ve emir akışı için borsaların kendi API'leri.
- [Haber](../Haber/): Ekonomi haberlerini takip etmek için haber API'leri ve kaynakları.
- [Türkiye Kamu ve Açık Veri](../Turkiye-Kamu-ve-Acik-Veri/): TÜİK ve diğer kamu veri kaynakları.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
