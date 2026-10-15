# Hava Durumu ve Deprem API'leri

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (ticari servisler) / kısıtlı (Open-Meteo ücretsiz katmanı ticari kullanıma kapalı) / resmî API yok (MGM, Kandilli)

## Özet

Hava durumu tarafında küresel ticari servisler (OpenWeatherMap, WeatherAPI.com, Tomorrow.io, Visual Crossing), açık kaynak Open-Meteo ve devlet servisleri (ABD'de NOAA/NWS, Türkiye'de MGM) var. Bunların çoğu "çek" (pull) modeliyle çalışır. Yani belirli aralıklarla sorgu atarsın. Hazır webhook ile bildirim gönderen tek büyük servis Tomorrow.io (Alerts/Monitoring). Türkiye'deki depremler için AFAD'ın kimlik doğrulamasız bir JSON servisi var. Kandilli (KOERI) yalnızca HTML/metin liste yayımlıyor ve verinin ticari kullanımı yazılı izne bağlı. Gerçek zamanlı (push) deprem bildirimi için EMSC'nin WebSocket servisi en pratik yol. Ücretler ücretsiz katmandan (Open-Meteo, NWS, AFAD) çağrı başına ödemeye (OpenWeatherMap One Call) ve kurumsal sözleşmelere (Tomorrow.io Enterprise) kadar uzanıyor.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey. NWS'de `User-Agent` başlığı zorunlu | **Open-Meteo** ücretsiz API (yalnızca ticari olmayan kullanım), **NWS** `api.weather.gov` (tüm amaçlar), **AFAD** deprem servisi, **USGS** GeoJSON akışları, **EMSC** WebSocket | Open-Meteo: 600/dk, 5.000/saat, 10.000/gün, 300.000/ay [RESMÎ]. NWS: limit var ama açıklanmıyor, "cömert" deniyor [RESMÎ]. AFAD: limit belgede yok |
| Geliştirici hesabı / API anahtarı | Ücretsiz kayıt + API anahtarı | OpenWeatherMap Free ("Free for everyone": Current Weather, 5 günlük/3 saatlik Forecast, Air Pollution, Maps, Geocoding), WeatherAPI.com Free, Tomorrow.io Free, Visual Crossing Free | OWM Free: 60/dk, 1M/ay. WeatherAPI Free: 100K/ay. Visual Crossing Free: 30.000 kayıt/ay [RESMÎ] |
| Ayrı, çağrı başı ödemeli abonelik | Kayıt + "One Call API" aboneliği (ödeme bilgisi) | OpenWeatherMap One Call 4.0 (ücretsiz anahtarla açılmaz) | Günde ilk 1.000 çağrı ücretsiz, varsayılan üst sınır 2.000/gün, aşan kısım 0,0012 GBP/çağrı [RESMÎ] |
| İşletme / uygulama onayı | Yok. Bu sağlayıcılarda App Review gibi bir onay süreci bulunmuyor | Ticari kullanım ücretli plana geçmekle açılır (Open-Meteo) | — |
| Ücretli / kurumsal | Abonelik veya sözleşme | Open-Meteo `customer-api` (ticari kullanım, dakika/saat/gün limiti yok), OWM Startup→Expert, WeatherAPI Starter→Enterprise, Tomorrow.io Enterprise, Visual Crossing Metered/Corporate/Enterprise, MGM **MEVBİS** (ücretli veri satışı) | Ayrıntılar aşağıda, "Hız sınırları ve fiyatlar" bölümünde |
| Resmî olmayan | — | **MGM** sitesinin kullandığı `servis.mgm.gov.tr/web/...` uç noktaları, **Kandilli** `lst0.asp` sayfasının ayrıştırılması (scraping), bunları JSON'a çeviren topluluk API'leri | ToS ve telif riski var (aşağıda) |

## Kimlik doğrulama

| Servis | Yöntem |
|---|---|
| Open-Meteo (ücretsiz) | Yok. Ticari kullanımda alan adı `customer-api.open-meteo.com` olur ve `&apikey=...` parametresi eklenir [RESMÎ] |
| OpenWeatherMap | `appid={API key}` sorgu parametresi [RESMÎ] |
| WeatherAPI.com | Her çağrıda `key` parametresi [RESMÎ] |
| Tomorrow.io | API anahtarı (`apikey` sorgu parametresi) [3. TARAF]. Her anahtarın kendi hız limiti ve token bakiyesi var [RESMÎ] |
| Visual Crossing | `key=YOUR_API_KEY` sorgu parametresi [RESMÎ] |
| NOAA/NWS | Anahtar yok. Uygulamayı tanıtan bir `User-Agent` başlığı zorunlu, ör. `(uygulamam.com, iletisim@uygulamam.com)`. İleride bunun yerine API anahtarı gelecek [RESMÎ] |
| MGM (resmî olmayan) | Anahtar yok. `Origin: https://www.mgm.gov.tr` başlığı olmadan HTTP 500 döndüğü test edildi (15.10.2026) [3. TARAF — kendi testimiz] |
| AFAD | Yok [3. TARAF — kendi testimiz] |
| Kandilli | Yok. Düz HTML sayfa [3. TARAF — kendi testimiz] |

## Temel uç noktalar

### Hava durumu

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `https://api.open-meteo.com/v1/forecast?latitude=..&longitude=..&hourly=..&daily=..&current=..` | Tahmin ve anlık durum. Diğer parametreler: `forecast_days` (0–16), `past_days` (0–92), `minutely_15`, `models`, `timezone=auto` | Herkese açık | Ticari kullanımda `customer-api.` öneki gerekir [RESMÎ] |
| GET | Open-Meteo Historical, Ensemble, Climate, Marine, Air Quality, Geocoding, Elevation, Flood API'leri | Geçmiş veri, deniz, hava kalitesi, sel, adres→koordinat | Herkese açık | Ücretli müşteride Historical, Climate, Ensemble ve Satellite Radiation API'leri Professional plan ve üstünü gerektirir [RESMÎ] |
| GET | `https://api.openweathermap.org/data/4.0/onecall/current` | Anlık durum (OWHL modeli, 10 dakikada bir güncellenir) | Geliştirici | One Call 4.0. 3.0 fiyat sayfasında "deprecated" olarak işaretli [RESMÎ] |
| GET | `.../data/4.0/onecall/timeline/{1min\|15min\|1h\|1day}` | 60 dk dakikalık, 48 saat 15 dakikalık, 47+ yıl geçmiş ve 1,5 yıla kadar günlük | Geliştirici | `next`/`prev` ile yapılan her sayfalama ayrı çağrı sayılır [RESMÎ] |
| GET | `.../data/4.0/onecall/alert/{alert_id}` | Resmî uyarının ayrıntısı | Geliştirici | [RESMÎ] |
| GET | `.../data/3.0/onecall?lat&lon&exclude=current,minutely,hourly,daily` | Yalnızca resmî uyarıları (alerts) döndürür | Geliştirici | 3.0 hâlâ çalışıyor ama yeni projelerde 4.0 öneriliyor. Uyarılar varsayılan olarak İngilizce [RESMÎ] |
| GET | `.../data/3.0/onecall/timemachine`, `/day_summary`, `/overview` | Belirli bir zaman damgası, günlük özet, yapay zekâ ile metin özeti | Geliştirici | [RESMÎ] |
| GET | `https://api.weatherapi.com/v1/current.json`, `forecast.json`, `alerts.json`, `history.json`, `marine.json`, `future.json`, `astronomy.json`, `search.json`, `ip.json`, `timezone.json`, `sports.json` | Anlık durum, 14 güne kadar tahmin, uyarılar (ABD, BK, Avrupa ve dünya), geçmiş (2010'dan beri) | Geliştirici | `lang` ile 40 dil. Toplu (bulk) POST isteği en fazla 50 konum alır ve Pro+ planından itibaren açılır [RESMÎ] |
| GET | `https://api.tomorrow.io/v4/weather/realtime`, `/v4/weather/forecast`, `/v4/timelines`, Historical, Maps, Route | Anlık durum, tahmin, zaman serisi katmanları | Geliştirici | [RESMÎ] |
| GET/POST | Tomorrow.io Events, Insights, Alerts, Notifications, Monitoring (Locations) | Eşik tanımlarsın (ör. rüzgâr > X), olay oluşunca webhook'a gönderilir | Geliştirici (Free'de 1 konum ve 1 uyarı) / Enterprise | [RESMÎ] |
| GET | `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{konum}/{tarih1}/{tarih2}?key=..&include=alerts,events,current,hours&unitGroup=metric` | Tek uç noktada geçmiş, anlık durum, 15 günlük tahmin, uyarılar ve olaylar (dolu, kasırga, deprem) | Geliştirici | Ücret kayıt başına hesaplanır, maliyet yanıttaki `queryCost` alanında görünür [RESMÎ] |
| GET | `https://api.weather.gov/points/{lat},{lon}` | Koordinatı ızgaraya (grid) çevirir ve forecast URL'lerini döndürür | Herkese açık | Izgara değişebilir, belirli aralıklarla yeniden kontrol et [RESMÎ] |
| GET | `https://api.weather.gov/gridpoints/{office}/{x},{y}/forecast` (`/forecast/hourly`) | 7 günlük, 12 saatlik dönemler hâlinde tahmin | Herkese açık | [RESMÎ] |
| GET | `https://api.weather.gov/alerts/active` (`/area/{eyalet}`, `/zone/{zoneId}`, `/region/{bolge}`), `/alerts/{id}`, `/alerts/types` | Aktif uyarılar | Herkese açık | `Accept` başlığıyla CAP (`application/cap+xml`) ya da ATOM seçilebilir [RESMÎ] |
| GET | `https://api.weather.gov/stations/{stationId}/observations/latest` | İstasyonun son gözlemi | Herkese açık | [RESMÎ] |

### MGM (Türkiye) — resmî API yok

MGM'nin geliştiricilere açık, belgelenmiş bir API'si yok [TAHMİN — belgede bulunamadı]. Kurumun ücretli veri kanalı **MEVBİS** (Meteorolojik Veri-Bilgi Sunum ve Satış Sistemi) [RESMÎ]. `mgm.gov.tr` sitesi verileri tarayıcıdan aşağıdaki JSON uç noktalarından çekiyor. 15.10.2026 tarihinde `Origin: https://www.mgm.gov.tr` başlığıyla test edildi, hepsi yanıt verdi [3. TARAF — kendi testimiz]:

| Metot | Uç nokta | Ne yapar | Seviye | Not |
|---|---|---|---|---|
| GET | `https://servis.mgm.gov.tr/web/merkezler?il=Ankara` | İl/ilçe merkezini döndürür: `merkezId`, `sondurumIstNo`, `saatlikTahminIstNo`, `gunlukTahminIstNo`, enlem/boylam | Resmî olmayan | Diğer uç noktalarda kullanılan istasyon numaraları buradan alınır |
| GET | `https://servis.mgm.gov.tr/web/sondurumlar?merkezid={id}` (ya da `istno=`) | Son gözlem: sıcaklık, nem, rüzgâr, basınç, yağış (10 dk, 1 saat, 24 saat), `hadiseKodu`, `veriZamani` | Resmî olmayan | `-9999` = veri yok |
| GET | `https://servis.mgm.gov.tr/web/sondurumlar/ilmerkezleri` | Tüm il merkezlerinin son durumu | Resmî olmayan | |
| GET | `https://servis.mgm.gov.tr/web/tahminler/gunluk?istno={gunlukTahminIstNo}` | 5 günlük tahmin (`enYuksekGun1..5`, `enDusukGun1..5`, nem) | Resmî olmayan | |
| GET | `https://servis.mgm.gov.tr/web/tahminler/saatlik?istno={saatlikTahminIstNo}` | 3 saatlik adımlarla tahmin (`hadise`, sıcaklık, rüzgâr) | Resmî olmayan | |
| GET | `https://servis.mgm.gov.tr/web/meteoalarm/today` (`/tomorrow`) | MeteoUyarı metinleri, seviyeler sarı/turuncu/kırmızı | Resmî olmayan | Takip için en değerli uç nokta |

**Kullanım şartı:** Site altbilgisinde "© 1998–2026 Meteoroloji Genel Müdürlüğü. Her Hakkı Saklıdır." yazıyor [RESMÎ]. Otomatik erişime veya API kullanımına izin veren bir metin bulunamadı ("belgede yok"). Ticari ya da yoğun kullanım için doğru kanal MEVBİS veya MGM ile yazışma.

### Deprem

| Metot | Uç nokta | Ne yapar | Seviye | Not |
|---|---|---|---|---|
| GET | `https://deprem.afad.gov.tr/apiv2/event/filter?start=2026-10-14T00:00:00&end=2026-10-15T00:00:00&minmag=3&format=json` | Belirtilen aralıktaki depremler. Alanlar: `eventID`, `date`, `location`, `latitude`, `longitude`, `depth`, `magnitude`, `type` (ML/Mw), `rms`, `country`, `province`, `district`, `neighborhood`, `isEventUpdate`, `lastUpdateDate`. Sayısal alanlar (`eventID`, `latitude`, `longitude`, `depth`, `magnitude`, `rms`) JSON'da string gelir; .NET'te `JsonNumberHandling.AllowReadingFromString` gerekir [3. TARAF — kendi testimiz, 15.10.2026] | Herkese açık | HTTP 302 ile `https://servisnet.afad.gov.tr/apigateway/deprem/apiv2/event/filter` adresine yönlendirir, `curl -L` kullan [3. TARAF — kendi testimiz]. Parametre listesi AFAD'ın "Event Service" sayfasında. Sayfa JS ile yüklendiği için bizzat doğrulanamadı. Yaygın kullanılan parametreler: `minmag`, `maxmag`, `lat`, `lon`, `maxrad`, `limit`, `orderby` [3. TARAF]. `maxrad` birimi (km mi, derece mi) [doğrulanmadı]; `lat/lon/maxrad` denemesi bu tarih aralığında boş dizi döndü |
| GET | `http://www.koeri.boun.edu.tr/scripts/lst0.asp` | Kandilli'nin son 500 deprem listesi. HTML içinde `<pre>` bloğu, sabit genişlikli sütunlar: Tarih, Saat, Enlem, Boylam, Derinlik, MD, ML, Mw, Yer, Çözüm Niteliği (İlksel/REVIZE) | Resmî olmayan (scraping) | Karakter kodlaması `windows-1254` [3. TARAF — kendi testimiz]. Telif notu aşağıda |
| GET | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/{significant\|4.5\|2.5\|1.0\|all}_{hour\|day\|week\|month}.geojson` | Dünya geneli deprem akışı | Herkese açık | Dakikada bir güncellenir. ATOM, KML, CSV ve QuakeML biçimleri de var [RESMÎ] |
| WS | `wss://www.seismicportal.eu/standing_order/websocket` | EMSC: her yeni veya güncellenen depremde JSON mesajı. Yapı: `{action, data:{properties:{unid, time, lat, lon, depth, mag, magtype, flynn_region, auth}}}` (yalnızca `action` en üst düzeyde) | Herkese açık | Lisans CC BY 4.0. Tarayıcı/JS için SockJS uç noktası: `https://www.seismicportal.eu/standing_order` [RESMÎ] |

## Gerçek zamanlı / bildirim

| Servis | Push var mı? | Nasıl |
|---|---|---|
| Tomorrow.io | **Var** | Monitoring/Insights ile konum ve eşik tanımlanır. Olay oluşunca webhook çağrılır. Resmî uyarılar da yayımlanır yayımlanmaz webhook'a gönderilebilir [RESMÎ]. Free planda yalnızca 1 izlenen konum ve 1 uyarı var [RESMÎ] |
| EMSC (deprem) | **Var** | WebSocket ya da SockJS ile anlık olay akışı [RESMÎ] |
| NOAA/NWS | Kısmen | Webhook yok. `/alerts/active` uç noktası ATOM/CAP biçiminde sorgulanır. Uyarı arşivi NCEI'de [RESMÎ] |
| USGS | Kısmen | Dakikalık GeoJSON/ATOM akışı sorgulanır (feed polling) [RESMÎ] |
| OpenWeatherMap, WeatherAPI.com, Visual Crossing, Open-Meteo | Yok | Yalnızca sorgu (pull). OWM 4.0 için 10 dakikada bir sorgu öneriliyor [RESMÎ]. Open-Meteo'da webhook belgelenmemiş [RESMÎ — belgede yok] |
| MGM, AFAD, Kandilli | Yok | Yalnızca sorgu. AFAD'ın resmî mobil uygulamasındaki push bildirimi geliştiricilere açık değil [TAHMİN] |

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Türkiye'de M≥X deprem oldu | Evet | AFAD `event/filter` 30–60 sn aralıkla sorgulanır, `eventID` ile tekilleştirilir. Hız için EMSC WebSocket'e bağlanılır, `data.properties.lat`/`lon` ile bbox süzmesi yapılır ya da `flynn_region` üzerinde içerir (contains "TURKEY") eşleşmesi kullanılır. Eşitlik karşılaştırması olay kaçırır: değerler "WESTERN TURKEY", "EASTERN TURKEY", "CENTRAL TURKEY" gibi gelir, Ege'deki bazı olaylar "AEGEAN SEA" ya da "DODECANESE ISLANDS, GREECE" olarak gelir; bu yüzden bbox daha güvenli | Herkese açık | AFAD kayıtları revize edebilir: `isEventUpdate` ve `lastUpdateDate` alanlarını izle |
| Kandilli ile çapraz doğrulama | Evet (riskli) | `lst0.asp` ayrıştırılır, "REVIZE" satırları güncellenir | Resmî olmayan | Ticari kullanım yazılı izne bağlı |
| Dünya genelinde büyük deprem | Evet | USGS `significant_hour.geojson` / `4.5_hour.geojson` ya da EMSC WebSocket | Herkese açık | |
| Türkiye'de sarı/turuncu/kırmızı meteorolojik uyarı | Evet (resmî olmayan) | MGM `meteoalarm/today` ve `tomorrow` sorgulanır, içerik hash'i değişince bildirim gönderilir | Resmî olmayan | OWM'nin resmî uyarı kaynakları listesinde Türkiye/MGM bulunmuyor, Türkiye uyarısı için kullanılamaz [RESMÎ]. WeatherAPI'nin "Avrupa" uyarı kapsamının Türkiye'yi içerip içermediği [doğrulanmadı]. Sonuç: resmî ve programatik bir yol yok; MGM uç noktası resmî olmayan tek yol |
| ABD resmî hava uyarısı | Evet | NWS `/alerts/active?area=XX` ATOM/CAP | Herkese açık | |
| Eşik aşımı (ör. rüzgâr > 60 km/s, yağış > 20 mm) | Evet | Tomorrow.io Monitoring + webhook (push) ya da Open-Meteo/OWM saatlik tahmini sorgulayıp kendi kural motorunla kontrol etmek | Geliştirici / Enterprise | Ücretsiz ve basit yol: Open-Meteo (yalnızca ticari olmayan kullanım) |
| Anahtar kelime / bölge filtresi | Evet | Uygulama tarafında: il/ilçe (AFAD `province`), büyüklük, derinlik, uyarı rengi | — | Bu servislerin hiçbirinde sunucu tarafında anahtar kelime filtresi yok |

## Hız sınırları ve fiyatlar

Tüm rakamlar 15.10.2026 itibarıyla resmî fiyat sayfalarından alındı [RESMÎ]. Fiyatlar değişebilir.

- **Open-Meteo:** Ücretsiz katman yalnızca ticari olmayan kullanım için: 600/dk, 5.000/saat, 10.000/gün, 300.000/ay, veriler CC BY 4.0. Reklamlı veya abonelikli site/uygulama ticari sayılır. Ücretli planlar: Standard (1M/ay), Professional (5M/ay), Enterprise (50M+/ay). Fiyatlar sayfada yazmıyor, müşteri portalında. Kullanım paneli henüz hazır olmadığı için aylık limitin şimdilik uygulanmadığı belirtiliyor. Kötüye kullanımda IP engellenebilir.
- **OpenWeatherMap:** One Call 4.0'da ilk 1.000 çağrı/gün ücretsiz, sonrası çağrı başı 0,0012 GBP. Yeni aboneliklerde varsayılan üst sınır 2.000/gün, Billing plans sekmesinden değiştirilebilir. "Free for everyone" planı (current + forecast): 60/dk, 1M/ay. Abonelikler: Startup 30 GBP/ay (600/dk, 10M), Developer 140 GBP (3.000/dk, 100M), Professional 370 GBP (30.000/dk, 1B), Expert 1.200 GBP (100.000/dk, 3B).
- **WeatherAPI.com:** Free 0 $ (100K/ay, 3 günlük tahmin, uyarılar sınırlı, ticari kullanım serbest, geri bağlantı (link) isteniyor). Starter 7 $/ay (3M), Pro+ 25 $ (5M), Business 65 $ (10M), Enterprise özel fiyat. Kota dolunca o ay veri gelmez, kota her ayın 1'inde 00:00 UTC'de sıfırlanır.
- **Tomorrow.io:** Free (5 günlük tahmin, 24 saat geçmiş, 1 izlenen konum, 1 uyarı) ve Enterprise (sözleşme). Free planın saatlik ve günlük çağrı limiti resmî sayfalarda bulunamadı ("belgede yok"). Toplulukta 3/sn, 25/saat, 500/gün olarak biliniyor [3. TARAF/TAHMİN]. Limit aşılınca 429 döner [RESMÎ].
- **Visual Crossing:** Free 30.000 kayıt/ay (sorgu başına 1.000 kayıt, 5 konum, eşzamanlılık 1), Professional, Metered (10M kayıt/ay), Corporate, Enterprise. Ticari kullanım tüm planlarda serbest. Free, Professional ve Metered planlarda "Weather Data Provided by Visual Crossing" atfı zorunlu. Fiyatlar maliyet hesaplayıcı sayfasında.
- **NOAA/NWS:** Ücretsiz, her amaçla kullanılabilir. Limit açıklanmıyor, aşılınca yaklaşık 5 sn bekleyip yeniden dene. Proxy arkasından gelen istekler limite daha kolay takılıyor.
- **AFAD / MGM / Kandilli:** Limit belgelenmemiş. Saniyede bir istekten seyrek sorgu ve önbellekleme önerilir [TAHMİN].

## Resmî olmayan yollar ve riskler

- **MGM `servis.mgm.gov.tr`:** Sitenin kendi ön yüzünün (Angular) kullandığı arka uç. Belgesi yok, sürüm garantisi yok. `Origin` başlığına bakıyor ve uç noktalar haber verilmeden değişebilir. Site "Her Hakkı Saklıdır" ifadesini taşıyor. Veriyi yeniden dağıtmak, özellikle ticari olarak, telif ve kamu verisi mevzuatı açısından risklidir. Doğru kanal MEVBİS [TAHMİN — hukuki değerlendirme değildir]. Kişisel ya da eğitim amaçlı, düşük sıklıkta ve önbellekli kullanım yaygın [3. TARAF].
- **Kandilli `lst0.asp`:** Sayfadaki not şöyle [RESMÎ, aynen]: "Sitemizde yayımlanan her türlü bilgi, veri ve haritalara ilişkin telif hakları münhasıran Boğaziçi Üniversitesi Rektörlüğü'ne ait olup, … kaynak gösterilerek kullanılabilir. … Boğaziçi Üniversitesi Rektörlüğü'nün yazılı izni ve onayı olmadan herhangi bir şekilde ticari amaçlı kullanılamaz." Kaynak göstererek ticari olmayan kullanım serbest, ticari kullanım yazılı izne bağlı. Teknik risk: sabit genişlikli metin formatı değişirse ayrıştırıcı (parser) bozulur. Liste "İlksel" (ilk çözüm) değerler içerir ve sonradan "REVIZE" edilebilir.
- **Topluluk API'leri:** GitHub'da Kandilli ve AFAD verisini JSON'a çeviren açık kaynak sarmalayıcılar ve barındırılan API'ler var [3. TARAF]. Bunlar araya üçüncü bir taraf ekler. Kesinti, gecikme ve lisans sorumluluğu sende kalır. Üretimde doğrudan kaynağı kullanmak daha güvenli.
- **AFAD `apiv2`:** Herkese açık ve kimlik doğrulamasız. Ancak bu araştırmada resmî bir kullanım şartı ya da SLA metnine ulaşılamadı ("belgede yok").

## SDK ve kütüphaneler

| Servis | Resmî | Topluluk (.NET dahil) |
|---|---|---|
| Open-Meteo | `open-meteo/sdk` (FlatBuffers tabanlı istemciler, ör. Python `openmeteo-requests`) [3. TARAF] | NuGet `OpenMeteo.dotnet` [3. TARAF] |
| OpenWeatherMap | Resmî SDK belgede yok | NuGet `OpenWeatherMap.Standard` [3. TARAF], Python `pyowm` [3. TARAF] |
| WeatherAPI.com | Sitede birçok dil için örnek SDK bağlantısı var [3. TARAF] | NuGet `WeatherAPI` paketi (bakımı belirsiz) [3. TARAF] |
| Tomorrow.io | REST + "recipes" örnekleri [RESMÎ] | — |
| Visual Crossing | Belgelerde örnek kodlar [RESMÎ] | — |
| NOAA/NWS | OpenAPI spesifikasyonu `https://api.weather.gov/openapi.json` (v3.12.2) [RESMÎ]. Buradan istemci üretilebilir | NuGet `Soenneker.Nws.OpenApiClientUtil` [3. TARAF] |
| EMSC | JS (SockJS) ve Python (Tornado) örnek istemciler [RESMÎ] | — |
| AFAD / MGM / Kandilli | Yok | .NET'te `HttpClient` + `System.Text.Json` yeterli. Kandilli için Regex veya sabit sütun ayrıştırma ve `Encoding.GetEncoding(1254)` (`CodePagesEncodingProvider` kaydı gerekir) |

## Postman / OpenAPI / koleksiyonlar

- **NWS:** Resmî OpenAPI 3.1 spesifikasyonu `https://api.weather.gov/openapi.json` [RESMÎ]. Postman'e doğrudan içe aktarılabilir.
- **Open-Meteo:** Açık kaynak (GitHub `open-meteo/open-meteo`). Belgeler sayfasında etkileşimli URL oluşturucu var [RESMÎ]. Resmî bir Postman koleksiyonu bulunamadı ("belgede yok").
- **OpenWeatherMap, WeatherAPI.com, Tomorrow.io, Visual Crossing:** Postman Public API Network'te topluluk ya da sağlayıcı koleksiyonları bulunuyor [3. TARAF, bu oturumda doğrulanmadı]. Visual Crossing'in Query Builder'ı istek URL'sini hazır üretiyor [RESMÎ].
- **AFAD / MGM / Kandilli:** Spesifikasyon yok.

## Depoda ilgili sayfalar

- [Global Haber API'leri](../Haber/Global-Haber-APIleri.md): afet ve deprem haberlerini haber kaynaklarından çapraz doğrulamak için.
- [Telegram](../Mesajlasma/Telegram.md), [Discord](../Mesajlasma/Discord.md), [Slack](../Mesajlasma/Slack.md): deprem ve uyarı bildirimlerini kullanıcıya iletmek için bot/webhook kanalları.
- [TCMB EVDS](../Finans-ve-Ekonomi/TCMB-EVDS.md): başka bir Türk kamu verisi API'si örneği (anahtarlı, resmî).

## Kaynaklar

Resmî:
- https://open-meteo.com/en/docs — Open-Meteo Forecast API belgeleri ve diğer API'lerin listesi — (erişim: 15 Ekim 2026)
- https://open-meteo.com/en/pricing — Open-Meteo planları, ücretsiz katman limitleri, `customer-api` — (erişim: 15 Ekim 2026)
- https://open-meteo.com/en/terms — Ticari/ticari olmayan kullanım tanımı, CC BY 4.0 — (erişim: 15 Ekim 2026)
- https://openweathermap.org/api/one-call-4 — One Call API 4.0 uç noktaları — (erişim: 15 Ekim 2026)
- https://openweathermap.org/api/one-call-3 — One Call API 3.0 (uyarılar, timemachine, day_summary, overview) — (erişim: 15 Ekim 2026)
- https://openweathermap.org/price — OWM fiyatları, 3.0'ın "deprecated" işareti — (erişim: 15 Ekim 2026)
- https://www.weatherapi.com/docs/ — WeatherAPI.com metotları ve parametreleri — (erişim: 15 Ekim 2026)
- https://www.weatherapi.com/pricing.aspx — WeatherAPI.com planları — (erişim: 15 Ekim 2026)
- https://www.tomorrow.io/weather-api/ — Tomorrow.io ürünleri, Free ve Enterprise karşılaştırması — (erişim: 15 Ekim 2026)
- https://docs.tomorrow.io/reference/rate-limiting — Tomorrow.io hız limiti başlıkları, 429 — (erişim: 15 Ekim 2026)
- https://docs.tomorrow.io/reference/welcome — Alerts, Insights, Events, Notifications genel bakışı — (erişim: 15 Ekim 2026)
- https://www.visualcrossing.com/weather-data-editions — Visual Crossing planları ve atıf şartı — (erişim: 15 Ekim 2026)
- https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/ — Timeline API — (erişim: 15 Ekim 2026)
- https://www.weather.gov/documentation/services-web-api — NWS API belgeleri, User-Agent, biçimler — (erişim: 15 Ekim 2026)
- https://api.weather.gov/openapi.json — NWS OpenAPI spesifikasyonu — (erişim: 15 Ekim 2026)
- https://mevbis.mgm.gov.tr/mevbis/ui/index.html#/Workspace — MEVBİS veri sunum ve satış sistemi (MGM ana sayfasındaki bağlantı) — (erişim: 15 Ekim 2026)
- https://openweathermap.org/price — OpenWeatherMap planları ve One Call çağrı başı fiyatı — (erişim: 15 Ekim 2026)
- https://deprem.afad.gov.tr/event-service — AFAD deprem olay servisi sayfası (JS ile yüklenir) — (erişim: 15 Ekim 2026)
- http://www.koeri.boun.edu.tr/scripts/lst0.asp — Kandilli son depremler listesi ve telif notu — (erişim: 15 Ekim 2026)
- https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php — USGS gerçek zamanlı GeoJSON akışları — (erişim: 15 Ekim 2026)
- https://www.seismicportal.eu/realtime.html — EMSC gerçek zamanlı WebSocket servisi — (erişim: 15 Ekim 2026)

Kendi testlerimiz (curl, 15 Ekim 2026):
- `servis.mgm.gov.tr/web/merkezler`, `sondurumlar`, `tahminler/gunluk`, `tahminler/saatlik`, `meteoalarm/today`: `Origin` başlığıyla 200, başlıksız 500.
- `deprem.afad.gov.tr/apiv2/event/filter`: 302 ile `servisnet.afad.gov.tr/apigateway/deprem/...` adresine yönleniyor, JSON dönüyor.

Not: Bu oturumda web arama kotası dolduğu için AFAD parametre listesi, Tomorrow.io Free limitleri ve topluluk kütüphaneleri ayrıntılı doğrulanamadı. Bunlar [3. TARAF]/[TAHMİN] olarak etiketlendi.
