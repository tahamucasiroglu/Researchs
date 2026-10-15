# Hava Durumu API'leri

Bu klasör, hava durumu, meteorolojik uyarı ve deprem verisi sunan servislerin API'lerini tek bir sayfada karşılaştırıyor: küresel ticari servisler (OpenWeatherMap, WeatherAPI.com, Tomorrow.io, Visual Crossing), açık kaynak Open-Meteo, devlet servisleri (ABD'de NOAA/NWS, Türkiye'de MGM) ve deprem kaynakları (AFAD, Kandilli, USGS, EMSC). Her servis için erişim seviyesi, kimlik doğrulama, temel uç noktalar, gerçek zamanlı bildirim imkânı, hız sınırları ve fiyatlar ile resmî olmayan yolların riskleri anlatılıyor. Ayrıntıların tamamı [Hava-Durumu-APIleri.md](Hava-Durumu-APIleri.md) dosyasında.

## İçindekiler

| Platform | Erişim seviyeleri | Takip için ne mümkün | Son doğrulama |
|---|---|---|---|
| [Open-Meteo](Hava-Durumu-APIleri.md) | Açık (yalnızca ticari olmayan) / Ücretli (`customer-api`) | Saatlik tahmini sorgulayıp kendi kural motorunla eşik aşımı (rüzgâr, yağış) yakalanabilir; webhook yok. | 15.10.2026 |
| [OpenWeatherMap](Hava-Durumu-APIleri.md) | Geliştirici (Free) / Ücretli (One Call 4.0, çağrı başı) | Anlık durum, tahmin ve resmî uyarılar 10 dakikada bir sorgulanır; Türkiye/MGM uyarıları kapsamda değil. | 15.10.2026 |
| [WeatherAPI.com](Hava-Durumu-APIleri.md) | Geliştirici (Free) / Ücretli | Anlık durum, 14 güne kadar tahmin ve uyarılar sorgulanır; push yok. | 15.10.2026 |
| [Tomorrow.io](Hava-Durumu-APIleri.md) | Geliştirici (Free: 1 konum, 1 uyarı) / Ücretli (Enterprise) | Konum + eşik tanımlanır, olay oluşunca webhook ile bildirim gelir (tek hazır push servisi). | 15.10.2026 |
| [Visual Crossing](Hava-Durumu-APIleri.md) | Geliştirici (Free) / Ücretli | Tek uç noktadan geçmiş, tahmin, uyarı ve olaylar (dolu, kasırga, deprem) sorgulanır; push yok. | 15.10.2026 |
| [NOAA/NWS](Hava-Durumu-APIleri.md) | Açık (anahtarsız, `User-Agent` zorunlu) | ABD resmî uyarıları `/alerts/active` ATOM/CAP akışı sorgulanarak takip edilir. | 15.10.2026 |
| [MGM](Hava-Durumu-APIleri.md) | Resmî olmayan (`servis.mgm.gov.tr`) / Ücretli (MEVBİS) | Türkiye sarı/turuncu/kırmızı uyarıları `meteoalarm/today` sorgulanıp içerik değişince bildirilebilir; belgesiz ve telif riskli. | 15.10.2026 |
| [AFAD](Hava-Durumu-APIleri.md) | Açık (kimliksiz JSON) | Türkiye depremleri `event/filter` 30–60 sn aralıkla sorgulanır, `eventID` ile tekilleştirilir. | 15.10.2026 |
| [Kandilli (KOERI)](Hava-Durumu-APIleri.md) | Resmî olmayan (HTML ayrıştırma) | Son 500 deprem listesi ayrıştırılarak çapraz doğrulama yapılabilir; ticari kullanım yazılı izne bağlı. | 15.10.2026 |
| [USGS](Hava-Durumu-APIleri.md) | Açık | Dünya geneli depremler dakikalık GeoJSON/ATOM akışı sorgulanarak izlenir. | 15.10.2026 |
| [EMSC](Hava-Durumu-APIleri.md) | Açık (CC BY 4.0) | WebSocket ile her yeni/güncellenen deprem anında gelir; bölge süzmesi istemcide yapılır. | 15.10.2026 |

## Bu kategoriye özgü notlar

- **Çoğu servis "çek" (pull) modelinde çalışır.** Hazır push yalnızca Tomorrow.io (webhook) ve EMSC'de (WebSocket) var; diğerlerinde belirli aralıklarla sorgu atıp değişikliği kendin tespit edersin.
- **"Ücretsiz" her zaman "ticari serbest" demek değil.** Open-Meteo'nun ücretsiz katmanı yalnızca ticari olmayan kullanım içindir; reklamlı veya abonelikli bir uygulama ticari sayılır. Visual Crossing ve WeatherAPI.com ücretsiz planda ticari kullanıma izin verir ama atıf/bağlantı ister.
- **Türkiye için resmî, belgelenmiş bir hava durumu API'si yok.** MGM'nin sitesinin kullandığı uç noktalar çalışıyor ama belgesiz ve "Her Hakkı Saklıdır" kapsamında; ticari veya yoğun kullanımda doğru kanal MEVBİS.
- **Deprem verisinde kaynak seçimi:** Hız için EMSC WebSocket, Türkiye resmî kaydı için AFAD, dünya geneli için USGS. Kandilli verisi kaynak gösterilerek kullanılabilir ama ticari kullanım yazılı izin gerektirir.
- **Sunucu tarafında anahtar kelime/bölge filtresi yok.** İl/ilçe, büyüklük, derinlik veya uyarı rengine göre süzme uygulama tarafında yapılır.
- Fiyat ve limitler 15.10.2026 itibarıyla resmî sayfalardan alındı ve değişebilir; bazı ayrıntılar (AFAD parametreleri, Tomorrow.io Free limitleri) doğrulanamadığı için dosyada [3. TARAF]/[TAHMİN] olarak etiketli.

## İlgili konular

- [Global Haber API'leri](../Haber/Global-Haber-APIleri.md): afet ve deprem haberlerini çapraz doğrulamak için.
- [Telegram](../Mesajlasma/Telegram.md), [Discord](../Mesajlasma/Discord.md), [Slack](../Mesajlasma/Slack.md): uyarı bildirimlerini kullanıcıya iletmek için bot/webhook kanalları.
- [TCMB EVDS](../Finans-ve-Ekonomi/TCMB-EVDS.md): başka bir Türk kamu verisi API'si örneği.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
