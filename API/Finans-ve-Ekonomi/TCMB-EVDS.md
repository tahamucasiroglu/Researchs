# TCMB EVDS ve Döviz Kurları API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (EVDS3 web servisi + EVDS MCP; `today.xml` kur dosyası kimliksiz açık)

## Özet

Türkiye Cumhuriyet Merkez Bankası (TCMB), ekonomik ve finansal zaman serilerini (döviz kurları, faiz, fiyat endeksleri, para-banka istatistikleri, ödemeler dengesi vb.) **EVDS** (Elektronik Veri Dağıtım Sistemi) üzerinden yayımlar. 2025'te yayına alınan **EVDS3** ile web servis adresi `evds3.tcmb.gov.tr/igmevdsms-dis/` oldu ve API anahtarı artık URL'de değil, **HTTP isteğinin `key` başlığında** gönderiliyor [RESMÎ]. Ayrıca EVDS'nin resmî bir **MCP sunucusu** (yapay zekâ araçları için) var [RESMÎ]. Günlük gösterge kurlar EVDS'ye üye olmadan da `https://www.tcmb.gov.tr/kurlar/today.xml` dosyasından okunabilir. Hizmetin tamamı **ücretsizdir** [RESMÎ — gizlilik politikası: "ücretsiz olarak hizmet vermektedir"].

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | `today.xml` ve geçmiş günlerin kur XML'leri (`/kurlar/YYYYAA/GGAAYYYY.xml`); EVDS web arayüzünde hazır rapor sayfaları, tablo/grafik oluşturma (kaydetmeden) [RESMÎ] | Ücretsiz; resmî limit belgede yok |
| Geliştirici hesabı (EVDS üyeliği) | evds3.tcmb.gov.tr'de ücretsiz kayıt → Profilim → "API Key Kopyala" [RESMÎ] | EVDS web servisi (seri, veri grubu, metaveri), Excel bağlantısı, EVDS MCP, seri/veri grubu e-posta aboneliği, rapor sayfası kaydetme [RESMÎ] | Ücretsiz; istek başına en çok **1000 gözlem**; "günde bir kez veri çekilmesi" önerilir; TCMB habersiz teknik limit koyabilir [RESMÎ] |
| İşletme/uygulama onayı | — | Böyle bir seviye yok; tüm üyeler aynı API'yi kullanır | Belgede yok |
| Ücretli/kurumsal | — | Ücretli plan yok. Kullanım şartları, EVDS verisini kullanan ürünlerde bu verinin kullanıcıya **ek ücret olarak yansıtılmamasını** şart koşar [RESMÎ] | — |
| Resmî olmayan | Eski EVDS2 adresleri (`evds2.tcmb.gov.tr/service/evds/...`, anahtar URL'de) | 15.10.2026 testinde `evds2` adresi `evds3.tcmb.gov.tr/` ana sayfasına **302 ile yönleniyor**; eski URL biçimi artık çalışmıyor [3. TARAF — kendi testimiz] | Eski kod/blog örnekleri bozuk |

## Kimlik doğrulama

- **EVDS web servisi:** Her kullanıcıya özel API anahtarı. Anahtar **`key` adlı HTTP request header** ile gönderilir. Resmî kılavuzun ifadesiyle: "Key değerini iletmeyenler veya yanlış gönderenler 403 Forbidden hatası alacaktır." [RESMÎ]
  - 15.10.2026 testi: anahtarsız istek → `403`; geçersiz anahtar (`key: test`) ile istek → `401` döndü; `categories` ve `series=` ile test edildi, davranış uç noktaya göre değil anahtarın gönderilip gönderilmemesine göre değişiyor [gözlem, 15.10.2026; ÇELİŞKİLİ — belge yalnızca 403'ten söz ediyor; istemci iki kodu da "yetkisiz" saymalı].
- **EVDS MCP:** OAuth. Bağlanırken tarayıcıda açılan TCMB sayfasına EVDS API anahtarı girilir ("Doğrula ve Giriş Yap") [RESMÎ].
- **`today.xml`:** Kimlik doğrulama yok [RESMÎ/gözlem].
- Kullanım şartları md. 6 ("EVDS MCP Kullanımına İlişkin Özel Koşullar"): MCP erişiminde kullanılan EVDS API anahtarının güvenliğinden kullanıcı sorumludur [RESMÎ]. Web servisi için ayrı bir anahtar güvenliği maddesi yok; aynı anahtar web servisinde de kullanıldığı için aynı özen gerekir [çıkarım]. Anahtarı koda gömme; ortam değişkeni (`TCMB_API_KEY` / `EVDS_API_KEY`) veya .NET User Secrets kullan.

Örnek (anahtar yer tutucudur):

```bash
curl -H "key: $EVDS_API_KEY" \
  "https://evds3.tcmb.gov.tr/igmevdsms-dis/series=TP.DK.USD.A.YTL-TP.DK.EUR.A.YTL&startDate=01-10-2026&endDate=01-01-2999&type=json"
```

```csharp
using var http = new HttpClient { BaseAddress = new Uri("https://evds3.tcmb.gov.tr/igmevdsms-dis/") };
http.DefaultRequestHeaders.Add("key", Environment.GetEnvironmentVariable("EVDS_API_KEY"));
var json = await http.GetStringAsync("series=TP.DK.USD.A.YTL&startDate=01-10-2026&endDate=01-01-2999&type=json");
```

> Dikkat: URL'de klasik `?` sorgu dizesi yok; parametreler yol (path) içinde `&` ile ayrılarak yazılır (`.../igmevdsms-dis/series=...&startDate=...`) [RESMÎ — kılavuz örnekleri bu biçimde].

## Temel uç noktalar

Taban adres: `https://evds3.tcmb.gov.tr/igmevdsms-dis/` · Tüm EVDS istekleri `key` başlığı ister.

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `series={kod1-kod2-...}&startDate=GG-AA-YYYY&endDate=GG-AA-YYYY&type=json\|xml\|csv` | Bir veya birden çok serinin verisi | Geliştirici | Seri kodları `-` ile ayrılır; en çok 1000 gözlem (fazlası istenirse bitiş tarihinden geriye 1000 gözlem döner) [RESMÎ] |
| GET | `...&aggregationTypes=avg\|min\|max\|first\|last\|sum` | Frekans dönüşümünde toplulaştırma yöntemi (seri başına, `-` ile) | Geliştirici | Girilmezse serinin varsayılan yöntemi [RESMÎ] |
| GET | `...&formulas=0..8` | 0 Düzey, 1 Yüzde değişim, 2 Fark, 3 Yıllık % değişim, 4 Yıllık fark, 5 Önceki yıl sonuna göre % değişim, 6 Önceki yıl sonuna göre fark, 7 Hareketli ortalama, 8 Hareketli toplam | Geliştirici | Seri başına, `-` ile [RESMÎ] |
| GET | `...&frequency=1..8` | 1 Günlük, 2 İşgünü, 3 Haftalık, 4 Ayda 2 kez, 5 Aylık, 6 3 aylık, 7 6 aylık, 8 Yıllık | Geliştirici | Tek değer; girilmezse serilerin ortak frekansı [RESMÎ] |
| GET | `...&decimalSeperator=,` | Ondalık ayırıcı (varsayılan `.`) | Geliştirici | Parametre adı belgede bu yazımla (`Seperator`) [RESMÎ] |
| GET | `datagroup={kod}&startDate=...&endDate=...&type=csv` | Bir veri grubundaki tüm serilerin verisi (ör. `bie_yssk`) | Geliştirici | [RESMÎ] |
| GET | `categories/type=json` | Konu başlıkları (`CATEGORY_ID`, `TOPIC_TITLE_TR`, `TOPIC_TITLE_ENG`) | Geliştirici | [RESMÎ] |
| GET | `datagroups/mode=0&type=json` · `datagroups/mode=1&code={grup}&type=json` | Tüm veri grupları / tek grubun metaverisi (başlangıç-bitiş tarihi, frekans, kaynak, metaveri ve revizyon politikası bağlantıları) | Geliştirici | [RESMÎ] |
| GET | `serieList/type=json&code={grup veya seri kodu}` | Seri listesi ve metaverisi (`Serie_Code`, `Start_Date`, `End_Date`, varsayılan dönüşüm yöntemi, etiketler) | Geliştirici | Takipte "son veri tarihi" kontrolü için kullanışlı [RESMÎ] |
| GET | `https://www.tcmb.gov.tr/kurlar/today.xml` | Günün gösterge niteliğindeki döviz kurları | Kimliksiz | 15.10.2026'da toplam 22 kalem: 21 döviz + XDR (SDR) (`USD, AUD, DKK, EUR, GBP, CHF, SEK, CAD, KWD, NOK, SAR, JPY, RON, RUB, CNY, PKR, QAR, KRW, AZN, AED, KZT, XDR`) [gözlem] |
| GET | `https://www.tcmb.gov.tr/kurlar/YYYYAA/GGAAYYYY.xml` (ör. `202610/14102026.xml`) | Belirli bir günün kur bülteni | Kimliksiz | Hafta sonu/tatil günleri için `404` döner (11.10.2026 testi) [3. TARAF — kendi testimiz]. Bu URL biçimi resmî bir API belgesinde tarif edilmiyor, kur sayfasının kullandığı dosya yolu [TAHMİN] |

Tam liste: "EVDS Web Servis ve API Kullanımı" kılavuzu (aşağıda Kaynaklar).

### Sık kullanılan seri kodları

| Kod | Anlamı | Etiket |
|---|---|---|
| `TP.DK.USD.A.YTL` / `TP.DK.USD.S.YTL` | ABD Doları döviz alış / satış | [RESMÎ — kılavuz örneği] |
| `TP.DK.EUR.A.YTL` | Euro döviz alış | [RESMÎ] |
| `TP.DK.USD.A`, `TP.DK.EUR.A`, `TP.DK.CHF.A`, `TP.DK.GBP.A`, `TP.DK.JPY.A` | Kılavuzdaki "sık kullanılan" kur örnekleri (`.YTL` soneksiz biçim) | [RESMÎ] |
| `TP.MK.F.BILESIK.TUM` | Python kılavuzu örneğinde geçen seri (adı belgede açıklanmıyor) | [RESMÎ — anlamı belgede yok] |
| `bie_yssk` | Kılavuzda örnek veri grubu kodu | [RESMÎ] |

Diğer kodları (TÜFE, politika faizi vb.) **uydurmayın**: `categories` → `datagroups` → `serieList` zinciriyle ya da EVDS web arayüzündeki seri detayından bulun.

### `today.xml` yapısı [gözlem, 15.10.2026]

```xml
<Tarih_Date Tarih="15.10.2026" Date="10/15/2026" Bulten_No="2026/195">
  <Currency CrossOrder="0" Kod="USD" CurrencyCode="USD">
    <Unit>1</Unit>
    <Isim>ABD DOLARI</Isim>
    <CurrencyName>US DOLLAR</CurrencyName>
    <ForexBuying>…</ForexBuying>
    <ForexSelling>…</ForexSelling>
    <BanknoteBuying>…</BanknoteBuying>
    <BanknoteSelling>…</BanknoteSelling>
    <CrossRateUSD/>
    <CrossRateOther/>
  </Currency>
  …
</Tarih_Date>
```

- `Unit` 1'den farklı olabilir (ör. JPY için 100) — hesapta bölmeyi unutma [gözlem, 15.10.2026: JPY `Unit`=100].
- Bazı dövizlerde efektif (banknote) alanları boş gelebilir [TAHMİN].
- Ondalık ayırıcı `.`; kültürden bağımsız parse et (`CultureInfo.InvariantCulture`).

## Gerçek zamanlı / bildirim

| Yöntem | Var mı | Ayrıntı |
|---|---|---|
| Webhook / WebSocket / streaming | Yok | Belgede yok. EVDS bir push API'si sunmuyor. |
| E-posta aboneliği | Var | Üyeler veri grubu (zil simgesi) veya zaman serisi ("Abone Ol") için abone olur; veri güncellendiği gün **saat 19:00'da** e-posta gelir (son veri ve tarihiyle) [RESMÎ — Abonelik Kılavuzu] |
| RSS / WebSub | Belgede yok | TCMB sitesinin duyuru/basın RSS'i bu araştırmada doğrulanmadı [belgede yok] |
| Polling | Önerilen yol | EVDS verisi "en sık günlük" güncellenir; resmî öneri **günde bir kez** çekmek [RESMÎ]. `today.xml` için `Last-Modified`/`ETag` başlıkları geliyor (14 ve 15.10.2026 dosyaları `Last-Modified: 12:30 GMT` = 15:30 TSİ) → koşullu istek (`If-Modified-Since`) ile hafif polling yapılabilir [3. TARAF — kendi testimiz] |
| EVDS MCP | Var (sorgu, bildirim değil) | `https://mcp.tcmb.gov.tr/tcmb-mcp/evds/mcp` — araçlar: `list_categories`, `list_datagroups`, `list_series`, `get_series_data` [RESMÎ] |

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Günlük gösterge kurlar yayımlandı | Evet | `today.xml` polling (15:30 TSİ sonrası), `Bulten_No`/`Tarih` değişimi veya `ETag` ile tespit | Kimliksiz | Yayın saati 15:30 TSİ [gözlem: `Last-Modified` 12:30 GMT, 14 ve 15.10.2026]. TCMB kur sayfasındaki resmî ilan saati bu çalışmada açılamadığı için [RESMÎ] etiketi verilmedi; ilk entegrasyonda TCMB kur sayfasından teyit et |
| Belirli bir serinin yeni verisi geldi (TÜFE, faiz, rezerv vb.) | Evet | `serieList/type=json&code={seri veya grup kodu}` ile `End_Date` alanını günde bir kez kontrol et; değiştiyse `series=` ile veriyi çek | Geliştirici | Alternatif: EVDS e-posta aboneliği (19:00) + e-postayı uygulamada okumak |
| Eşik/filtre (ör. USD satış X'i geçti, aylık % değişim Y'nin üstünde) | Evet | Veriyi çekip istemci tarafında filtrele; yüzde değişim için `formulas=1` veya `3` doğrudan sunucuda hesaplanır | Geliştirici / kimliksiz | Filtreleme API'de yok; uygulama mantığı |
| Gün içi (anlık) kur | Hayır | TCMB gösterge kuru günde bir kez belirlenir; piyasa (anlık) kuru TCMB API'sinde yok | — | Anlık kur için borsa/veri sağlayıcı API'leri gerekir |
| Yeni seri/veri grubu eklendi | Kısmen | `datagroups/mode=0` listesini periyodik alıp fark (diff) çıkar | Geliştirici | [TAHMİN — resmî bir "yeni eklenenler" uç noktası belgede yok] |
| TCMB duyurusu / PPK kararı / basın bülteni | Belgede yok | EVDS kapsamında değil; tcmb.gov.tr sayfaları ayrıca izlenmeli | — | Bu dosya kapsamı dışında |

## Hız sınırları ve fiyatlar

- **Ücret:** Yok; EVDS ücretsiz [RESMÎ].
- **İstek başına:** En çok 1000 gözlem [RESMÎ]. Uzun günlük seriler için tarih aralığını parçalara böl.
- **Sıklık:** Resmî öneri günde bir çekim; aynı veri grubundaki serileri tek çağrıda birleştir [RESMÎ].
- **Sayısal istek/dakika limiti:** Belgede yok. Kullanım şartları md. 5: TCMB "sorgu sayısı, eşzamanlı bağlantı sayısı veya benzeri teknik limitler" uygulayabilir ve bunları önceden bildirmeden değiştirebilir [RESMÎ].
- **MCP:** Aşırı/kötüye kullanım sorgularında erişim sınırlanabilir, askıya alınabilir [RESMÎ].
- **Kullanım şartları (özet, RESMÎ):**
  - Veriler **kaynak gösterilerek** üçüncü kişilerce kullanılabilir ve yayımlanabilir.
  - Ticari/ticari olmayan bir üründe kullanıldığında veriler kullanıcılara **ek ücret olarak yansıtılamaz**.
  - Türkçe/İngilizce dışındaki dillere çevrilirse "resmî çeviri değildir" notu verilmeli.
  - MCP ile üretilen rapor/grafiklerde TCMB'nin yalnızca veri sağlayıcı olduğu, yorumların yapay zekâya ait olduğu ve yanıltıcı olabileceği açıkça belirtilmeli; sonuçlar EVDS'den doğrulanmalı.
  - İçerik yatırım tavsiyesi değildir; TCMB doğruluk/erişilebilirlik için sorumluluk kabul etmez. Sistem izlenir, işlemler kaydedilebilir.

## Resmî olmayan yollar ve riskler

- EVDS'nin herkese açık, belgeli bir API'si olduğu için **resmî olmayan uç noktaya ihtiyaç yok**. Web arayüzünün iç (XHR) çağrılarını kazımak belgede tarif edilmez; şartlardaki "sisteme dışarıdan müdahale" ve izleme maddeleri nedeniyle önerilmez [TAHMİN — risk değerlendirmesi].
- `kurlar/YYYYAA/GGAAYYYY.xml` geçmiş kur dosyaları yaygın kullanılır ama ayrı bir API sözleşmesiyle belgelenmemiştir; yol yapısı habersiz değişebilir [TAHMİN].
- **Eski kod tuzağı:** İnternetteki örneklerin çoğu EVDS2 dönemine aittir (`evds2.tcmb.gov.tr/service/evds/...&key=XXX`). Bunlar artık çalışmaz; anahtar başlığa taşınmalı ve taban adres değiştirilmeli [RESMÎ + 3. TARAF].
- **Sahte MCP sunucuları:** Şartlar, yalnızca TCMB'nin resmî kanallardan yayımladığı MCP adresinin yetkili olduğunu, "EVDS/TCMB" adlı üçüncü taraf MCP sunucularından TCMB'nin sorumlu olmadığını vurgular [RESMÎ].

## SDK ve kütüphaneler

Resmî SDK yok; TCMB yalnızca kılavuzlarda Python `evds` paketini örnek gösterir [RESMÎ]. Sürümler 15.10.2026'da paket depolarından okundu; EVDS3 uyumluluğunu kullanmadan önce kontrol et.

| Dil | Paket | Sürüm (15.10.2026) | Not |
|---|---|---|---|
| Python | `evds` (github.com/fatihmete/evds) | 0.4.0 | TCMB Python kılavuzunda örnek olarak geçiyor [RESMÎ] |
| Python | `evdspy` (github.com/SermetPekin/evdspy-repo) | 2.1.3 | API anahtarını başlığa taşıdığını belirtiyor [3. TARAF] |
| Python | `tcmb` (github.com/kaymal/tcmb-py) | 0.5.0 | Kaynak kodunda `key` başlığı ve `categories`/`datagroups`/`serieList` kullanılıyor [3. TARAF — kod incelendi] |
| Rust | `tcmb_evds` | 0.1.0 (2022) | EVDS2 dönemi; muhtemelen güncel değil [TAHMİN] |
| C | `tcmb_evds_c` (github.com/asari555) | — | EVDS2 dönemi [TAHMİN] |
| .NET | Resmî/yaygın EVDS istemcisi | — | NuGet'te "evds" araması 15.10.2026'da sonuç vermedi; `HttpClient` + `key` başlığı yeterli (yukarıdaki örnek) |
| .NET (yalnız `today.xml`) | `TcmbSharp`, `Akc.TCMBCurrencies`, `TCMBExchangeRate`, `TCMBRatesClient`, `Easy.Tools.Finance.TCMB`, `ECommerceHelper.CurrencyConverter` | çeşitli | NuGet'teki topluluk paketleri; kalite/bakım durumu incelenmedi [3. TARAF] |
| Excel | EVDS Excel web servis bağlantısı | — | Resmî kılavuz var [RESMÎ] |
| Yapay zekâ | EVDS MCP | — | ChatGPT, Claude, Claude Code (`claude mcp add --transport http evds https://mcp.tcmb.gov.tr/tcmb-mcp/evds/mcp`), Gemini CLI, LM Studio için resmî kurulum adımları var [RESMÎ] |

## Postman / OpenAPI / koleksiyonlar

- Resmî OpenAPI/Swagger tanımı veya Postman koleksiyonu: **belgede yok** (TCMB doküman listesinde yalnızca PDF kılavuzlar var).
- Postman'da elle: `GET https://evds3.tcmb.gov.tr/igmevdsms-dis/series=TP.DK.USD.A.YTL&startDate=01-10-2026&endDate=01-01-2999&type=json` + Headers → `key: {{EVDS_API_KEY}}`.

## Depoda ilgili sayfalar

- [API başvuru kütüphanesi kökü](../) — diğer platformların API sayfaları
- [Kripto borsaları](../Kripto-Borsalari/) — anlık fiyat gereken durumlar için (TCMB günlük gösterge kur verir)
- [CSharp-DotNet](../../Programlama/CSharp-DotNet/) — `HttpClient` ile istemci yazmak için

## Kaynaklar

Resmî (TCMB):

- [EVDS3 ana sayfa](https://evds3.tcmb.gov.tr) — kayıt, API anahtarı, web arayüzü — (erişim: 15 Ekim 2026)
- [EVDS Web Servis ve API Kullanımı (docId=8, PDF)](https://evds3.tcmb.gov.tr/igmevdsms-dis/documents/showDocument?docId=8) — uç noktalar, parametreler, `key` başlığı, 1000 gözlem limiti — (erişim: 15 Ekim 2026)
- [EVDS Web Service and API Usage (İngilizce, docId=16)](https://evds3.tcmb.gov.tr/igmevdsms-dis/documents/showDocument?docId=16) — aynı kılavuzun İngilizcesi — (erişim: 15 Ekim 2026)
- [EVDS Python Kılavuzu (docId=4)](https://evds3.tcmb.gov.tr/igmevdsms-dis/documents/showDocument?docId=4) — `evds` paketi ve `requests` + başlık örneği — (erişim: 15 Ekim 2026)
- [EVDS MCP Kullanım Kılavuzu (docId=27)](https://evds3.tcmb.gov.tr/igmevdsms-dis/documents/showDocument?docId=27) — MCP adresi, OAuth, araç listesi, istemci kurulumları — (erişim: 15 Ekim 2026)
- [EVDS Kullanım Şartları (docId=18)](https://evds3.tcmb.gov.tr/igmevdsms-dis/documents/showDocument?docId=18) — kaynak gösterme, ücret yansıtmama, limit ve sorumluluk maddeleri; md. 6 = MCP özel koşulları (anahtar güvenliği) — (erişim: 15 Ekim 2026)
- [EVDS Abonelik Kılavuzu (docId=23)](https://evds3.tcmb.gov.tr/igmevdsms-dis/documents/showDocument?docId=23) — seri/veri grubu e-posta bildirimi (19:00) — (erişim: 15 Ekim 2026)
- [EVDS Üye İşlemleri Kılavuzu (docId=7)](https://evds3.tcmb.gov.tr/igmevdsms-dis/documents/showDocument?docId=7) — üyelik ve üye özellikleri — (erişim: 15 Ekim 2026)
- [EVDS Hakkında (docId=17)](https://evds3.tcmb.gov.tr/igmevdsms-dis/documents/showDocument?docId=17) — EVDS3'ün 2025'te yayına alınması, JSON/CSV/XML servisleri — (erişim: 15 Ekim 2026)
- [EVDS Gizlilik Politikası (docId=19)](https://evds3.tcmb.gov.tr/igmevdsms-dis/documents/showDocument?docId=19) — ücretsiz hizmet, KVKK — (erişim: 15 Ekim 2026)
- [TCMB today.xml](https://www.tcmb.gov.tr/kurlar/today.xml) — günlük gösterge kur dosyası (15.10.2026: 22 `Currency` öğesi, JPY `Unit`=100, `Last-Modified` 12:30:03 GMT) — (erişim: 15 Ekim 2026)
- [TCMB internet sitesi kullanım şartları](https://www.tcmb.gov.tr/wps/wcm/connect/TR/TCMB+TR/Bottom+Menu/Diger/Kullanim+Sartlari) — EVDS şartlarının atıf yaptığı genel şartlar — (erişim: 15 Ekim 2026)

Üçüncü taraf:

- [kaymal/tcmb-py](https://github.com/kaymal/tcmb-py) — Python istemcisi, `key` başlığı kullanımı — (erişim: 15 Ekim 2026)
- [evdspy (PyPI)](https://pypi.org/project/evdspy/) — Python istemcisi — (erişim: 15 Ekim 2026)
- [fatihmete/evds](https://github.com/fatihmete/evds) — TCMB'nin örnek gösterdiği Python paketi — (erişim: 15 Ekim 2026)
- [NuGet "tcmb" araması](https://www.nuget.org/packages?q=tcmb) — .NET topluluk paketleri — (erişim: 15 Ekim 2026)

> Not: Bu araştırma sırasında web arama kotası doldu; bilgiler doğrudan TCMB PDF kılavuzlarından, canlı uç nokta testlerinden ve paket depolarından derlendi. TCMB'nin resmî kur yayın saati ve RSS akışları ayrıca doğrulanmalı.
