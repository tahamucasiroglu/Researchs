# Türkiye Topluluk API'leri (GitHub)

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (topluluk projeleri; resmî kurum API'si değil)

## Özet

GitHub'da Türkiye'ye özgü, ücretsiz ve çoğu MIT lisanslı API ve veri setleri paylaşılıyor. Bunların başında il, ilçe, belediye, mahalle ve köy verisi gelir (TurkiyeAPI). Bunlara Türkçe API listeleri (turkish-apis), resmî tatil kaynakları (Nager.Date, Python `holidays`) ve plaka kodu ile posta kodu içeren paketler eklenir. CollectAPI ise GitHub projesi değildir: nöbetçi eczane, akaryakıt, altın gibi Türkiye verilerini **ücretli/freemium** sunan, Türkiye merkezli bir API pazar yeridir. Bu kaynakların hiçbiri sosyal medya paylaşımını doğrudan takip etmez. Bir takip uygulamasında **zenginleştirme ve filtreleme** katmanı olarak işe yararlar: konumu normalize etmek, tatil günlerinde bildirimi susturmak, il/plaka eşlemek gibi. Aşağıdaki "son push" ve "çalışıyor mu" bilgileri 15 Ekim 2026'da GitHub API'si ve canlı istekle kontrol edildi.

### Hızlı karşılaştırma

| Kaynak | Ne verir | Son güncelleme (15.10.2026 kontrolü) | Bakım | Lisans | Canlı mı |
|---|---|---|---|---|---|
| [ubeydeozdmr/turkiye-api](https://github.com/ubeydeozdmr/turkiye-api) (TurkiyeAPI) | İl, ilçe, belediye, mahalle, köy; nüfus, alan, rakım, telefon alan kodu, NUTS, koordinat, posta kodu | Son push 01.10.2026; veri `lastUpdated` 21.05.2026, veri seti sürümü "2025"; API 2.0.3 [RESMÎ — proje] | Aktif | MIT | Evet (`api.turkiyeapi.dev` 200 döndü) |
| [3rt4nm4n/turkish-apis](https://github.com/3rt4nm4n/turkish-apis) | Türk API'lerinin listesi (yaklaşık 23 İngilizce + 52 Türkçe girdi; banka, e-ticaret, kamu, SMS) | Son push 01.06.2026, 518 yıldız [3. TARAF — GitHub API] | Orta (ara sıra PR) | MIT | Liste; bazı bağlantılar ölü (aşağıya bakın) |
| [public-api-lists/public-api-lists](https://github.com/public-api-lists/public-api-lists) | Genel, küresel ücretsiz API listesi (JSON API'si de var) | Son push 14.09.2026, yaklaşık 16 bin yıldız | Aktif | MIT | Evet |
| [Nager.Date](https://github.com/nager/Nager.Date) | Ülkelere göre resmî tatil REST API'si; TR dahil | Community WebApi v4 yayın tarihi 30.06.2026; v3'ün desteği 31.01.2027'de bitiyor [RESMÎ — proje README] | Aktif | MIT | Evet (`date.nager.at/api/v3/PublicHolidays/2026/TR` 200) |
| [vacanza/holidays](https://github.com/vacanza/holidays) (Python) | Ülkelere göre tatil kütüphanesi; TR'de yarım gün (arife) dahil | Aktif proje [3. TARAF] | Aktif | MIT | Kütüphane (offline) |
| [onurusluca/turkey-geo-api](https://github.com/onurusluca/turkey-geo-api) | Kendin barındırdığın il/ilçe/mahalle/**sokak**/köy API'si (NVİ, TÜİK, HGM kaynaklı) | Güncelleme 08.10.2026 | Aktif (yeni, 18 yıldız) | MIT | Barındırılan sürüm yok; kendin çalıştırırsın |
| [muratgozel/turkey-neighbourhoods](https://github.com/muratgozel/turkey-neighbourhoods) | npm paketi: il, plaka, ilçe, mahalle, posta kodu, iller arası mesafe | Güncelleme 31.03.2024 | Durgun olabilir [TAHMİN] | MIT | Kütüphane |
| [mumeyyizbuyuk/turkiye-data](https://github.com/mumeyyizbuyuk/turkiye-data) | Offline JSON + `pip`/`npm` `turkiye-data`: il (id = plaka), ilçe, mahalle, posta kodu, TCMB banka/EFT kodları | Güncelleme 08.07.2026 | Yeni (0 yıldız) | MIT | Kütüphane |
| [CollectAPI](https://collectapi.com/tr/) | Nöbetçi eczane, akaryakıt, altın/döviz, hava, haber, hal fiyatları vb. | Ticari hizmet | Aktif (ticari) | Ticari, açık kaynak değil | Evet (token'sız istek `401 Unauthorized` döndü) |

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | TurkiyeAPI v1/v2 tüm GET uç noktaları; Nager.Date Community API; GitHub ham JSON dosyaları (`raw.githubusercontent.com`) | Ücretsiz. TurkiyeAPI: dakikada 300, 5 dakikada 1.000 istek [RESMÎ — proje README + `X-Ratelimit-Limit: 300` başlığı gözlendi]. Nager.Date Community için limit belgede yok |
| Geliştirici hesabı/uygulama | CollectAPI hesabı + profilden token | CollectAPI'deki tüm API'ler, paketin izin verdiği kadarıyla | Free / Basic / Premium / Enterprise paketleri var [RESMÎ — docs.collectapi.com]. Paketlere ek olarak **sorgu başı ücretlendirme** de var; her API sayfası ücretsiz deneme olup olmadığını ve sorgu başı fiyatı gösteriyor (bkz. [Hız sınırları ve fiyatlar](#hız-sınırları-ve-fiyatlar)). Paket kota rakamları dokümanda yok |
| İşletme/uygulama onayı | — | Bu sayfadaki kaynaklarda böyle bir seviye yok | — |
| Ücretli/kurumsal | Nager.Date sponsorluğu veya Pro API anahtarı; CollectAPI Premium/Enterprise | Nager.Date: offline Docker imajı ve NuGet paketi için lisans anahtarı ("Both options require a license key", sponsorlara verilir) [RESMÎ — proje README]. Ayrıca ücretli **Nager.Date Pro API v1** (beta): `x-api-key` başlığı, `/api/pro/v1/...` yolları, `LongWeekends` gibi ek uç noktalar; üretimde kullanılması önerilmez [RESMÎ — pro-v1.json]. CollectAPI: daha yüksek kota, premium kapsamındaki API'ler | Sponsorluk / paket ücreti |
| Kendin barındır (self-host) | Node.js 22 veya Docker (TurkiyeAPI); Bun/Node 20+ (turkey-geo-api) | Limitsiz kullanım, kendi ağında | Ücretsiz (MIT). Önerilen yol budur: büyük hacimde paylaşılan genel sunucuyu yorma |
| Resmî olmayan | — | Listelerdeki bazı "unofficial" API'ler (ör. Ekşi Sözlük herokuapp) | Ölü veya ToS riski taşıyor (aşağıya bakın) |

## Kimlik doğrulama

- **TurkiyeAPI:** Kimlik gerekmez. Hız sınırında istemci sırasıyla `x-api-key`, `authorization` başlığı, yoksa IP ile tanınır [RESMÎ — README]. Herkese anahtar dağıtan bir kayıt sistemi belgede yok. Başlık yalnızca istemciyi ayırt etmeye yarıyor gibi görünüyor [TAHMİN].
- **Nager.Date Community API:** Anahtar gerekmez [RESMÎ — README örnekleri anahtarsız].
- **CollectAPI:** `Authorization` başlığına profildeki token yazılır. Doğru biçim `apikey ` önekiyle: `-H 'Authorization: apikey <token>'` [RESMÎ — collectapi.com API sayfası; ör. nöbetçi eczane sayfasındaki tüm istek örnekleri `Authorization: apikey your_token`]. Genel doküman yalnızca `{Your Token Here}` yer tutucusunu gösteriyor. Token şuradan alınır: `Profile -> Token Tab` [RESMÎ — docs.collectapi.com/docs/general].
- **GitHub ham veri dosyaları:** Kimlik gerekmez. GitHub REST API'si ise kimliksiz kullanımda IP başına saatte 60 istekle sınırlı (bu araştırmada da bu sınıra takıldık) [RESMÎ — GitHub].

## Temel uç noktalar

### TurkiyeAPI v2 (`https://api.turkiyeapi.dev`)

Tam liste: [OpenAPI](https://api.turkiyeapi.dev/v2/openapi.json) · [TR API referansı](https://docs.turkiyeapi.dev/tr/v2/api-reference/). v1 hâlâ "legacy" olarak çalışıyor. Kaldırılma tarihi belgede yok.

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/health` | Sağlık kontrolü | Herkese açık | — |
| GET | `/v2/meta` | API sürümü, veri seti sürümü, `lastUpdated`, veri kaynakları | Herkese açık | **Güncellik takibi** için kullan |
| GET | `/v2/provinces` | 81 il; `limit`, `offset`, `fields` vb. | Herkese açık | `id` = plaka kodu (Adana=1, Bolu=14) |
| GET | `/v2/provinces/{id}` | Tek il: nüfus, alan, rakım, `phoneAreaCodes`, bölge, NUTS, koordinat | Herkese açık | — |
| GET | `/v2/provinces/{id}/districts` · `/municipalities` · `/neighborhoods` · `/villages` | İle bağlı alt birimler | Herkese açık | — |
| GET | `/v2/districts` · `/v2/districts/{id}` (+ `/municipalities`, `/neighborhoods`, `/villages`) | 973 ilçe | Herkese açık | — |
| GET | `/v2/municipalities` · `/v2/municipalities/{id}` (+ `/neighborhoods`) | 1.377 belediye | Herkese açık | — |
| GET | `/v2/neighborhoods` · `/v2/neighborhoods/{id}` | 32.279 mahalle (`meta.total`, datasetVersion 2025, lastUpdated 2026-05-21) | Herkese açık | — |
| GET | `/v2/villages` · `/v2/villages/{id}` | 18.183 köy | Herkese açık | — |
| GET | `/v2/datasets/{dosya}` · `/v2/datasets/{sürüm}/{dosya}` | Statik JSON dökümü (son sürüm veya ör. 2025) | Herkese açık | **Toplu indirme için bunu kullan**, sayfa sayfa gezme |
| GET | `/v1/provinces?name=Bolu` | v1 (legacy) ad ile arama | Herkese açık | Yeni projede v2 kullan |

Veri kaynakları (`/v2/meta`'dan): TÜİK MEDAS (ad, kimlik, nüfus), PTT (posta kodu), MSB Harita Genel Müdürlüğü (alan), Türk Telekom (alan kodu), OpenStreetMap (merkez koordinatı) [RESMÎ — proje].

### Nager.Date (resmî tatiller)

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `https://date.nager.at/api/v3/PublicHolidays/{yıl}/TR` | Yılın resmî tatilleri | Herkese açık | 15.10.2026'da çalıştı. v3'ün desteği 31.01.2027'de bitiyor |
| GET | `https://nagerholidays.com/api/v3/publicholidays/{yıl}/{ülke}` | Yeni alan adı (README'deki örnek) | Herkese açık | 200 döndü |
| GET | `https://date.nager.at/api/v4/Holidays/{ülke}/{yıl}` (ör. `/api/v4/Holidays/TR/2026`; `nagerholidays.com` altında da aynı yol) | Yılın tatilleri, **v4** | Herkese açık | 15.10.2026'da 200 döndü. Sıra değişti: önce ülke, sonra yıl. Yanıt alanları da değişti: `localName` yok; `name`, `nationalHoliday`, `holidayTypes` var [RESMÎ — community-v4.json + canlı istek]. **Yeni projede v4 kullanın** (v3 31.01.2027'de bitiyor) |
| GET | `/api/v4/Holidays/{ülke}/Next` | Sıradaki tatiller | Herkese açık | [RESMÎ — community-v4.json] |
| GET | `/api/v4/IotHolidays/{ülke}/IsToday/{offset}` | Bugün tatil mi (IoT için) | Herkese açık | `offset` = saat dilimi farkı [RESMÎ — community-v4.json] |
| GET | `/api/v4/Countries/Available` · `/api/v4/Countries/{ülke}` · `/api/v4/Versions` | Ülke listesi, ülke bilgisi, sürüm | Herkese açık | [RESMÎ — community-v4.json] |
| GET | `https://nagerholidays.com/api/pro/v1/Holidays/{ülke}/{yıl}` · `/api/pro/v1/LongWeekends/{ülke}/{yıl}` | **Pro API v1** (ücretli): tatiller, uzun hafta sonları vb. | Ücretli (`x-api-key` başlığı) | **Beta**; resmî spec'e göre üretimde kullanılması önerilmez [RESMÎ — pro-v1.json] |

**Dikkat (Türkiye'ye özgü):** 2026 TR yanıtında Ramazan ve Kurban bayramları **var** (20–22 Mart, 27–30 Mayıs). Buna karşın README "Islamic holidays … are not included" diyor [ÇELİŞKİLİ — canlı veri README'yle uyuşmuyor]. Ayrıca **arife yarım günleri** (Ramazan arifesi, Kurban arifesi 26 Mayıs, 28 Ekim öğleden sonra) yanıtta **yok** [RESMÎ — canlı yanıt]. Yarım gün gerekiyorsa Python `holidays` paketi `HALF_DAY` kategorisiyle bunları veriyor (öğleden sonra 13:00'ten itibaren). Bayram tarihleri bu pakette 2032'ye kadar "onaylı" olarak işaretli [3. TARAF — paket kaynak kodu]. Yasal dayanak: 2429 sayılı Ulusal Bayram ve Genel Tatiller Hakkında Kanun. Dinî bayram tarihleri Diyanet takvimine göre belirlenir.

### CollectAPI (`https://api.collectapi.com`)

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/weather/getWeather` | Hava durumu (dokümandaki örnek) | Geliştirici (token) | Paket kotası |
| GET | `/health/dutyPharmacy?il=...` | Nöbetçi eczane | Geliştirici (token) | Token'sız istek `401` döndü |
| — | Diğer kategoriler | Ekonomi (altın/döviz), akaryakıt, haber, hal fiyatları, şans oyunları, IP, çeviri, sözlük, WhatsApp/SMS aracıları | Geliştirici (token) | Uç noktaların tam listesi her API'nin kendi sayfasında. Sayfalar JS ile render ediliyor, burada doğrulanamadı |

### Plaka kodları

Ayrı ve güncel bir "plaka API'si" bulunamadı. Gerek de yok: **il plaka kodu = TurkiyeAPI il `id`'si** (1–81). Ayrıca `turkiye-data` (`id` = plaka) ve `turkey-neighbourhoods` (plaka kodu dahil) paketleri var. Plaka harf serileri gibi ayrıntılı veriler (hangi ilçeye hangi harf aralığı) için güncel ve bakımlı bir açık kaynak bulunamadı ("belgede yok").

## Gerçek zamanlı / bildirim

- Bu kaynakların **hiçbirinde webhook, WebSocket veya akış yok**. Hepsi statik ya da yavaş değişen referans verisi.
- Güncellik takibi şöyle yapılabilir:
  - TurkiyeAPI `GET /v2/meta` → `lastUpdated` ve `datasetVersion` değiştiğinde önbelleği yenile. Yanıtlar `ETag`, `Last-Modified` ve `Cache-Control: max-age=300` taşıyor, yani koşullu istek (`If-None-Match`) yapılabilir [RESMÎ — gözlenen başlıklar].
  - GitHub depoları için: `https://github.com/<sahip>/<depo>/releases.atom` ve `/commits/<dal>.atom` **Atom beslemeleri** (kimliksiz). Ayrıca GitHub "Watch → Releases" bildirimi veya GitHub API (bkz. [GitHub](../Gelistirici-Platformlari/GitHub.md)).
  - Tatiller: yılda bir çekip yerel tabloya yazmak yeterli.

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Gönderideki konum adını (il/ilçe) normalize etmek ve "yalnızca şu ile ait gönderiler" filtresi kurmak | Evet | TurkiyeAPI `/v2/datasets` dökümünü bir kez indir, yerelde ad → id sözlüğü kur | Herkese açık / self-host | Türkçe karakter ve büyük-küçük harf normalizasyonu (İ/ı) şart. İlçe adı il bilgisi olmadan **benzersiz değildir**: 51 ilçenin adı "Merkez"; "Pazar" (Rize, Tokat), "Kale" (Denizli, Malatya) gibi aynı adlı ilçeler var. Sözlük anahtarı (il, ilçe) çifti olmalı |
| Anahtar kelimede il/ilçe adı geçmesi (ör. deprem, yangın haberleri) | Evet | 81 il + 973 ilçe adını sözlük olarak filtreye ekle | Herkese açık | "Batman", "Ordu", "Pazar", "Kale", "Bor" gibi günlük kelimeyle çakışan adlara dikkat: yanlış pozitif üretir. İlçe adı geçtiğinde ili de bağlamdan doğrula |
| Telefon alan kodu veya plakadan ile eşleme | Evet | `phoneAreaCodes`, il `id` (plaka) | Herkese açık | — |
| Resmî tatilde/arifede bildirimi susturmak veya "tatil modu" | Evet | Nager.Date (tam gün) + Python `holidays` (yarım gün) | Herkese açık | Nager arifeleri vermiyor |
| Nöbetçi eczane, akaryakıt zammı, altın/döviz değişimi | Kısmen | CollectAPI periyodik yoklama (polling) | Geliştirici (token, kotalı) | Webhook yok. Kota planına göre aralık seç |
| Takip edilen GitHub veri deposunda yeni sürüm | Evet | `releases.atom` RSS | Herkese açık | — |
| Yeni Türk API'si eklenmesi (keşif) | Evet | `3rt4nm4n/turkish-apis` commits Atom beslemesi | Herkese açık | Liste kalitesi değişken |

## Hız sınırları ve fiyatlar

- **TurkiyeAPI (genel sunucu):** 300 istek/dakika, 1.000 istek/5 dakika. Başlıklar: `x-ratelimit-limit`, `x-ratelimit-remaining`, `x-ratelimit-reset`, `retry-after` [RESMÎ]. Ücretsiz. Toplu iş için dataset dökümü veya self-host önerilir.
- **Nager.Date Community:** Ücretsiz. Sayısal limit belgede yok. Offline Docker/NuGet lisans anahtarı ister (sponsorluk) [RESMÎ]. **Pro API v1** ayrı ve ücretli: `x-api-key` başlığıyla anahtar ister, beta durumda, üretim için önerilmiyor [RESMÎ — pro-v1.json]. Fiyatı belgede yok.
- **CollectAPI:** Free, Basic, Premium ve Enterprise paketleri [RESMÎ]. API sayfalarında iki model geçiyor: "Aylık Abonelik" ve "Sorgu Başına Ücretlendirme"; yıllık alımda %20 indirim [RESMÎ — API sayfası]. Örnek (15.10.2026): nöbetçi eczane API'si ücretsiz denemeli (`"free": true`), premium paket kapsamında (`"scopes": ["premium"]`), sorgu başı fiyat `0.01`. Para birimi sayfada açık değil [TAHMİN: USD] [RESMÎ — collectapi.com/tr/api/health/nobetci-eczane-api, sayfa içi JSON]. Paket kota rakamları dokümanda yok. Abonelik öncesi ilgili API sayfasından kontrol edin.
- **GitHub REST API (depo kontrolü için):** Kimliksiz 60 istek/saat/IP, token ile 5.000/saat [RESMÎ — GitHub dokümanı].

## Resmî olmayan yollar ve riskler

- **Bu sayfadaki projeler kamu kurumlarının resmî API'si değildir.** Veriler TÜİK, PTT, HGM gibi resmî kaynaklardan derlenir ama derleme hatası olabilir. Resmî işlemlerde (fatura, kargo, UAVT/adres kodu) asıl kaynak NVİ/UAVT ve PTT'dir.
- **Ölü veya şüpheli girdiler (turkish-apis listesi, 15.10.2026 kontrolü):**
  - `eksisozluk.herokuapp.com` (gayriresmî Ekşi Sözlük API'si) **404** döndü, kullanılamaz.
  - `api.yaani.com` **yanıt vermedi** (Yaani hizmeti kapanmış olabilir [TAHMİN]).
  - `seffaflik.epias.com.tr/transparency/technical/tr/` **zaman aşımı** verdi. EPİAŞ şeffaflık platformunun yeni adresine bakılmalı [TAHMİN].
  - Listede "Mouser Electronics" girdisi yanlışlıkla Logo dokümanına gidiyor [3. TARAF — listede görülen hata].
  - Diğer kontrol edilenler (TCMB EVDS, USOM, TÜİK, İBB Şehir Haritası, SPK, İYS, HGM Atlas, BtcTurk, GenelPara, etkinlik.io, camgoz barkod) 200 döndü. Sayfa açılıyor olması API'nin çalıştığını kanıtlamaz.
- **Sıkça görülen tek seferlik veri depoları** (`mertmtn/CityDistrictJSONAPI` 2023, `ferdiozer/turkey-city-regions` 2021, `nidea1/...` 2023, `letreset/UAVT` 2024) **güncel değil**. İlçe sayısı veya mahalle birleşmeleri değişmiş olabilir. Yeni projede TurkiyeAPI veya `turkiye-data` tercih edilmeli.
- **Genel sunucuya bağımlılık riski:** TurkiyeAPI tek kişilik bir topluluk projesi. Kesinti olabilir, SLA yok [TAHMİN]. Üretimde self-host veya yerel kopya kullanılmalı.
- **Lisans:** Kod MIT. Ancak altta yatan TÜİK, PTT ve HGM verilerinin yeniden dağıtım koşulları ayrıca bu kurumların kullanım şartlarına tabidir [TAHMİN — projelerde açıkça yazmıyor].

## SDK ve kütüphaneler

- **TurkiyeAPI:** Resmî SDK yok. .NET istemcisi OpenAPI'den üretilebilir: [NSwag](https://github.com/RicoSuter/NSwag) veya [Microsoft Kiota](https://learn.microsoft.com/openapi/kiota/) ile `https://api.turkiyeapi.dev/v2/openapi.json`. Self-host: `npm run build && npm start` veya Docker (port 3000, `/health`).
- **Nager.Date:** Anahtarsız .NET kullanımı için resmî README'deki REST istemcisi: NuGet [`Nager.Holiday`](https://www.nuget.org/packages/Nager.Holiday) (15.10.2026'da son sürüm 2.0.1) [RESMÎ — proje README]. Bunu `Nager.Date` paketiyle karıştırmayın: `Nager.Date` = lisans anahtarı isteyen **offline** kütüphane (v2 desteklenir) [RESMÎ]. İsterseniz REST API'yi doğrudan `HttpClient` ile de çağırabilirsiniz.
- **Python:** `holidays` (`holidays.Turkey()`, yarım gün dahil), `turkiye-data` (pip).
- **JavaScript/TypeScript:** `turkey-neighbourhoods`, `turkiye-data` (npm).
- **Go / Ruby:** `nejdetkadir/turkish_cities` (Go, 2024), `nejdetkadir/tr-cities-api` (Ruby, 2022). İkisi de eski.
- **CollectAPI:** Resmî SDK belgede yok. Düz HTTP (`HttpClient` + `Authorization` başlığı).

## Postman / OpenAPI / koleksiyonlar

- TurkiyeAPI OpenAPI 3: <https://api.turkiyeapi.dev/v2/openapi.json> (Postman'e "Import → Link" ile alınabilir).
- Nager.Date: Scalar dokümanı <https://nagerholidays.com/scalar/#community-api-v4>. Postman'e doğrudan alınabilecek OpenAPI dosyaları: <https://nagerholidays.com/openapi/community-v4.json> · [community-v3.json](https://nagerholidays.com/openapi/community-v3.json) · [pro-v1.json](https://nagerholidays.com/openapi/pro-v1.json).
- CollectAPI: Her API sayfasında kod örnekleri var. Resmî bir Postman koleksiyonu belgede yok.
- `public-api-lists` deposunun kendi JSON API'si var (proje açıklamasına göre). Küresel listeyi programatik taramak için kullanılabilir.

## Depoda ilgili sayfalar

- [Türkiye açık veri ve kamu API'leri](Turkiye-Acik-Veri-ve-Kamu-APIleri.md): resmî kurum API'leri (TÜİK, EPİAŞ, İBB vb.)
- [TCMB EVDS](../Finans-ve-Ekonomi/TCMB-EVDS.md): döviz ve ekonomik seriler (resmî)
- [Türkiye haber kaynakları](../Haber/Turkiye-Haber-Kaynaklari.md): haber takibi
- [GitHub API](../Gelistirici-Platformlari/GitHub.md): depo, sürüm ve commit takibi
- [Hava durumu API'leri](../Hava-Durumu/Hava-Durumu-APIleri.md)
- [BtcTurk ve Paribu](../Kripto-Borsalari/BtcTurk-ve-Paribu.md)

## Kaynaklar

- [TurkiyeAPI GitHub deposu](https://github.com/ubeydeozdmr/turkiye-api): kaynak kod, v2 uç noktaları, hız sınırı, veri kaynakları, MIT lisansı (erişim: 15 Ekim 2026)
- [TurkiyeAPI dokümantasyonu (TR)](https://docs.turkiyeapi.dev/tr/v2/guide/): kullanım kılavuzu ve API referansı (erişim: 15 Ekim 2026)
- [TurkiyeAPI OpenAPI](https://api.turkiyeapi.dev/v2/openapi.json) ve [/v2/meta](https://api.turkiyeapi.dev/v2/meta): canlı şema ve veri sürümü (erişim: 15 Ekim 2026)
- [Nager.Date GitHub](https://github.com/nager/Nager.Date): tatil API'si, sürüm destek tablosu, lisans notları (erişim: 15 Ekim 2026)
- [Nager.Date 2026 TR yanıtı](https://date.nager.at/api/v3/PublicHolidays/2026/TR): canlı veri, arife yarım günleri yok (erişim: 15 Ekim 2026)
- [Nager.Date Community v4 OpenAPI](https://nagerholidays.com/openapi/community-v4.json) ve [canlı v4 yanıtı](https://date.nager.at/api/v4/Holidays/TR/2026): v4 yolları ve yanıt alanları (erişim: 15 Ekim 2026)
- [Nager.Date Pro v1 OpenAPI](https://nagerholidays.com/openapi/pro-v1.json): ücretli Pro API, `x-api-key`, beta uyarısı (erişim: 15 Ekim 2026)
- [NuGet: Nager.Holiday](https://www.nuget.org/packages/Nager.Holiday): REST API için .NET istemcisi (erişim: 15 Ekim 2026)
- [TurkiyeAPI /v2/neighborhoods](https://api.turkiyeapi.dev/v2/neighborhoods?limit=1) ve [/v2/districts](https://api.turkiyeapi.dev/v2/districts?limit=1000&fields=name): mahalle sayısı (`meta.total`), aynı adlı ilçeler (erişim: 15 Ekim 2026)
- [vacanza/holidays: turkey.py](https://github.com/vacanza/holidays/blob/dev/holidays/countries/turkey.py): Türkiye tatilleri, HALF_DAY kategorisi (erişim: 15 Ekim 2026)
- [CollectAPI Genel Doküman](https://docs.collectapi.com/docs/general): token alma, `Authorization` başlığı, paket türleri (erişim: 15 Ekim 2026)
- [CollectAPI Nöbetçi Eczane API sayfası](https://collectapi.com/tr/api/health/nobetci-eczane-api): `Authorization: apikey` örnekleri, sorgu başı fiyat, ücretsiz deneme bilgisi (sayfa içi JSON) (erişim: 15 Ekim 2026)
- [CollectAPI pazar yeri](https://collectapi.com/tr/): API kategorileri (erişim: 15 Ekim 2026)
- [3rt4nm4n/turkish-apis](https://github.com/3rt4nm4n/turkish-apis): Türk API'leri listesi (erişim: 15 Ekim 2026)
- [public-api-lists/public-api-lists](https://github.com/public-api-lists/public-api-lists): küresel ücretsiz API listesi (erişim: 15 Ekim 2026)
- [GitHub konu sayfası: turkey-cities](https://github.com/topics/turkey-cities) ve [il-ilce](https://github.com/topics/il-ilce): il/ilçe veri depolarının güncellik taraması (erişim: 15 Ekim 2026)
- [onurusluca/turkey-geo-api](https://github.com/onurusluca/turkey-geo-api): sokak düzeyinde self-host API (erişim: 15 Ekim 2026)
- [mumeyyizbuyuk/turkiye-data](https://github.com/mumeyyizbuyuk/turkiye-data): offline JSON, plaka ve banka kodları (erişim: 15 Ekim 2026)
- [muratgozel/turkey-neighbourhoods](https://github.com/muratgozel/turkey-neighbourhoods): npm paketi, posta kodu ve mesafe (erişim: 15 Ekim 2026)

> Not: Bu araştırmada web arama kotası doldu. Bu yüzden "public-apis-turkey" benzeri başka listeler ve CollectAPI paket fiyat/kota rakamları ayrıntılı taranamadı (sorgu başı fiyat örneği yukarıda). Eksikler ileride tamamlanmalı.
