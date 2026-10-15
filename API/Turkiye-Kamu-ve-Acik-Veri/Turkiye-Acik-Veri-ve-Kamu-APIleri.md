# Türkiye Kamu ve Açık Veri API'leri

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: **parçalı.** Belediye CKAN portalları (İBB, İzmir) aktif. Diyanet'in API'si başvuruyla açılıyor. TÜİK'in SDMX API'si SMS doğrulamalı API anahtarıyla açılıyor. Ulusal portal (data.gov.tr) erişilemiyor. e-Devlet ve GİB'in herkese açık API'si yok.

## Özet

Türkiye'de tek bir merkezî kamu API'si yoktur. Veriler kurum ve belediye portallarına dağılmış durumda. En kullanışlı programatik kaynaklar büyükşehirlerin **CKAN tabanlı açık veri portallarıdır**: İBB (`data.ibb.gov.tr`) ve İzmir (`acikveri.bizizmir.com`). Bunlar kimlik doğrulamasız ve ücretsizdir. Diyanet namaz vakitleri resmî bir REST API ile (Awqat Salah) sunuluyor, ancak form başvurusu ve sıkı kota var. e-Devlet ve GİB e-Fatura yalnızca kurumlara ya da GİB izinli **özel entegratörler** üzerinden açık. Nöbetçi eczane ve benzeri "günlük hayat" verileri için ya belediye API'leri ya da CollectAPI gibi ücretli aracı servisler kullanılıyor.

Takip uygulaması açısından bu alan sosyal medya gibi "olay akışı" sunmaz. Yapılabilecek şey **periyodik sorgulama (polling)** ve değişiklik tespitidir: yeni veri seti, güncellenen kaynak, yeni Resmî Gazete sayısı.

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | İBB ve İzmir CKAN Action API'si (okuma), dosya indirmeleri (CSV/XLSX/GeoJSON). Ayrıca İzmir `openapi.izmir.bel.tr` uç noktaları, Resmî Gazete PDF/HTML dosyaları ve TÜİK veri portalındaki indirmeler | Ücretsiz. Belgede limit yok [RESMÎ, gözlem] |
| Geliştirici hesabı/uygulama | Portal hesabı (CKAN API token). TÜİK: veri portalı hesabı + SMS ile telefon doğrulama + API anahtarı | CKAN'da yazma işlemleri ve veri talebi (`datarequests`); okuma için gerekmez. TÜİK SDMX 2.1 web servisi (`nsiws.tuik.gov.tr`) | Ücretsiz [3. TARAF: CKAN standardı; RESMÎ: TÜİK veri portalı] |
| Kurum/başvuru onayı | Diyanet: kullanıcı talep ve taahhüt formu. e-Devlet: entegrasyon yetkisi verilmiş kurum/kuruluş olmak (kamu kurumları ve listede yer alan bazı özel kuruluşlar); bireysel geliştiriciye açık değil. GİB: özel entegratör izni | Awqat Salah namaz vakti API'si, e-Devlet Kapısı entegrasyonu (kimlik doğrulama, entegre hizmet), e-Fatura entegrasyonu | Diyanet ücretsiz ama kotalı. GİB entegratörlüğü ağır teknik ve mali şartlara bağlı [RESMÎ] |
| Ücretli/kurumsal | Özel entegratörle sözleşme veya CollectAPI aboneliği | e-Fatura gönderme ve alma API'leri (entegratörün kendi REST/SOAP API'si). Nöbetçi eczane, namaz vakti, posta kodu gibi aracı API'ler | Entegratöre göre değişir. CollectAPI'de Free/Basic/Premium/Enterprise paketleri var [RESMÎ: CollectAPI dokümanı] |
| Resmî olmayan | Kazıma (scraping) | Resmî Gazete fihristi, e-Devlet'teki herkese açık sorgular, eczacı odası siteleri, PTT posta kodu sayfası | ToS ve hukuki risk var (aşağıya bakın) |

## Kimlik doğrulama

- **CKAN (İBB, İzmir):** Okuma için kimlik gerekmez. Yazma işlemlerinde `Authorization: <API token>` başlığı kullanılır (CKAN 2.9+ API token) [3. TARAF: CKAN dokümanı]. İBB **CKAN 2.9.11**, İzmir **CKAN 2.8.5** çalıştırıyor (`status_show` ile doğrulandı) [RESMÎ].
- **Diyanet Awqat Salah:** `POST /Auth/Login` ile kullanıcı adı ve parola gönderilir, karşılığında **JWT access token (45 dk)** ve **refresh token (7 gün)** alınır. Refresh token her kullanımda yenilenir. 7 gün kullanılmazsa geçersiz olur ve yeniden giriş gerekir. Yenileme uç noktası: `GET /Auth/RefreshToken/{refreshToken}` [RESMÎ].
- **CollectAPI:** `Authorization: apikey <token>` başlığı kullanılır. Doküman örneği token'ı ham hâliyle gösteriyor (`-H 'Authorization: {Your Token Here}'`). Pratikte `apikey ` öneki yaygın [RESMÎ + 3. TARAF, ÇELİŞKİLİ: önek doküman örneğinde görünmüyor]. Base URL: `https://api.collectapi.com`.
- **e-Devlet Kapısı:** Herkese açık OAuth veya OpenID yok. Kimlik doğrulama hizmeti yalnızca e-Devlet'e entegre olmuş kurumlara verilir. Kurumlar sayfası her kurum için "entegre hizmet" ve "kimlik doğrulama hizmeti" sayılarını listeliyor [RESMÎ]. Başvuru süreci dokümanı kamuya açık sayfada bulunamadı ("belgede yok").
- **TÜİK SDMX web servisi:** Veri portalında hesap açılır, telefon numarası SMS ile doğrulanır, "Kullanıcı Bilgileri" ekranında API anahtarı üretilir (Türkiye telefon numarası olmayanlar anahtarı `info@tuik.gov.tr` üzerinden ister). Anahtarla `POST https://giris.tuik.gov.tr/realms/web/protocol/openid-connect/token` çağrılır (`grant_type=password`, `client_id=nsi-ws-consumer`, `api_key=<anahtar>`); dönen token `Authorization: Bearer <token>` başlığıyla `nsiws.tuik.gov.tr/rest/...` isteklerine eklenir [RESMÎ: TÜİK SDMX web servis dokümanı].
- **GİB e-Fatura:** Uygulama geliştiricisi GİB'e doğrudan bağlanmaz. Entegratörün API anahtarı ya da kullanıcı adı/parolası ile entegratör API'sine bağlanılır [RESMÎ: GİB yararlanma yöntemleri].

## Temel uç noktalar

### İBB Açık Veri Portalı — CKAN Action API (`https://data.ibb.gov.tr/api/3/action/`)

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `package_list` | Tüm veri seti adlarını döner (yaklaşık 550–570) | Herkese açık | Doğrulandı, `success: true` [RESMÎ] |
| GET | `package_search?q=...&fq=...&rows=...&sort=metadata_modified desc` | Arama, filtreleme ve son değişenlere göre sıralama | Herkese açık | `fq=res_format:API` sorgusu 41 veri seti döndü [RESMÎ, gözlem] |
| GET | `package_show?id=<ad>` | Veri setinin meta verisi ve kaynakları (`last_modified`, `datastore_active`) | Herkese açık | Değişiklik takibi için ana uç nokta |
| GET | `datastore_search?resource_id=<id>&q=...&limit=...` | DataStore'a yüklenmiş tablo verisini JSON olarak sorgular | Herkese açık | Yalnızca `datastore_active: true` olan kaynaklarda çalışır |
| GET | `datastore_search_sql?sql=...` | SQL ile sorgular | — | İBB'de kapalı (400 "Action name not known") [RESMÎ, gözlem] |
| GET | `recently_changed_packages_activity_list` | Son değişiklik akışı | — | İBB'de **403 Forbidden** döndü (kapalı) [RESMÎ, gözlem] |
| GET | `status_show` | CKAN sürümü ve eklentiler | Herkese açık | İBB: `datastore`, `xloader`, `datarequests`, `geo_view` vb. |

### İzmir Açık Veri Portalı — CKAN (`https://acikveri.bizizmir.com/api/3/action/`) + `openapi.izmir.bel.tr`

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `package_list` / `package_search` / `package_show` | İBB ile aynı CKAN uç noktaları (yaklaşık 260 veri seti) | Herkese açık | Doğrulandı [RESMÎ] |
| GET | `https://openapi.izmir.bel.tr/api/ibb/nobetcieczaneler` | Günün nöbetçi eczaneleri (JSON alanları: `Tarih`, `Adi`, `Adres`, `Telefon`, `Bolge`, `BolgeId`, `BolgeAciklama`, `LokasyonX/Y`, `UzaklikMetre`, `EczaneId`, `IlceId`…) | Herkese açık | Veri seti meta verisinde güncelleme sıklığı "günlük" [RESMÎ]. Dikkat: `LokasyonX` = enlem (latitude), `LokasyonY` = boylam (longitude); alışılmış X=boylam varsayımının tersi [RESMÎ, gözlem] |
| GET | `https://openapi.izmir.bel.tr/api/ibb/eczaneler` | Tüm eczane listesi | Herkese açık | CSV/XLSX kopyası da var |
| GET | `openapi.izmir.bel.tr/api/...` (ESHOT, İZBAN, otopark vb.) | Ulaşım ve şehir verileri | Herkese açık | Kök adres 404 dönüyor. Uç noktalar CKAN veri setlerindeki "API" kaynaklarından bulunur [RESMÎ, gözlem] |

### Ankara Büyükşehir

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| — | `https://seffaf.ankara.bel.tr/` | "Şeffaf Ankara" pano ve indirme portalı | Herkese açık | Programatik API belgesi bulunamadı ("belgede yok"). Topluluk kataloğunda "Dashboard, Download" olarak etiketli [3. TARAF] |

### Ulusal Açık Veri Portalı (data.gov.tr)

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| — | `https://data.gov.tr/` | Ulusal portal | — | 15.10.2026'da HTTP ve HTTPS bağlantısı **reddedildi** (ECONNREFUSED). 2026 Şubat tarihli topluluk kataloğunda da yok [RESMÎ, gözlem + 3. TARAF]. 2019'da Cumhurbaşkanlığı Dijital Dönüşüm Ofisi "veri.gov.tr" duyurmuştu. Güncel bir API belgesi bulunamadı [3. TARAF, haber] |

### TÜİK

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| — | `https://data.tuik.gov.tr/` → `https://veriportali.tuik.gov.tr/` (302 yönlendirme) | Veri portalı (tablo indirme, toplu indirme) | Herkese açık | Toplu indirmede tek seferde en fazla 50 veri seti [RESMÎ] |
| GET | `https://nsiws.tuik.gov.tr/rest/dataflow/TR/all/latest?detail=full` | SDMX 2.1 REST: tüm veri akışlarının (dataflow) listesi | Geliştirici (API anahtarı, SMS doğrulamalı) | Token olmadan **401 Unauthorized** döner (servis canlı) [RESMÎ, gözlem] |
| GET | `https://nsiws.tuik.gov.tr/rest/data/TR,DF_...,1.1/...` | SDMX 2.1 REST: bir veri akışının gözlemleri | Geliştirici (API anahtarı, SMS doğrulamalı) | Dataflow kimlikleri (ör. `DF_INSAAT_URETIM_ENDEKS_C`) MEDAS→SDMX geçiş rehberinde listelenir [RESMÎ] |
| POST | `https://giris.tuik.gov.tr/realms/web/protocol/openid-connect/token` | Token alır (`grant_type=password`, `client_id=nsi-ws-consumer`, `api_key=...`) | Geliştirici (API anahtarı) | OpenID Connect; token `Authorization: Bearer <token>` başlığıyla gönderilir [RESMÎ: SDMX web servis dokümanı] |
| — | MEDAS (eski servis) | Eski TÜİK veri servisleri | — | Portal uyarısı: "MEDAS servisleri 2027 yılı itibarıyla güncellenmeyecektir"; MEDAS→SDMX geçiş rehberi sunuluyor [RESMÎ] |
| — | Alternatif: TCMB EVDS (`evds3.tcmb.gov.tr`) | TÜİK kaynaklı birçok seriyi (enflasyon vb.) API ile sunar | Geliştirici (API anahtarı) | EVDS2 adresi artık evds3'e yönleniyor (15.10.2026 gözlemi). Ayrıntılar için Finans sayfasına bakın [RESMÎ, gözlem] |

### Resmî Gazete

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `https://www.resmigazete.gov.tr/` | Günün fihristi (HTML) | Herkese açık | RSS veya API yok [RESMÎ, gözlem] |
| GET | `/eskiler/YYYY/MM/YYYYMMDD.pdf` | Günün tam sayısı (PDF) | Herkese açık | Örnek: `/eskiler/2026/10/20261015.pdf` |
| GET | `/eskiler/YYYY/MM/YYYYMMDD-N.htm` veya `.pdf` | Sayıdaki tek bir metin (yönetmelik, karar…) | Herkese açık | N sırayla artar |
| GET | `/ilanlar/eskiilanlar/YYYY/MM/YYYYMMDD-N.htm` | İlanlar bölümü | Herkese açık | |
| GET | `/fihrist?tarih=YYYY-MM-DD&mukerrer=1` | Mükerrer (ek) sayı fihristi | Herkese açık | |
| — | `https://www.mevzuat.gov.tr/` | Mevzuat Bilgi Sistemi (konsolide mevzuat) | Herkese açık | Belgelenmiş API yok ("belgede yok") |

### Diyanet — Awqat Salah API (`https://awqatsalah.diyanet.gov.tr`)

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| POST | `/Auth/Login` | Token alır | Başvuru onayı | JWT 45 dk |
| GET | `/Auth/RefreshToken/{refreshToken}` | Token yeniler | Başvuru onayı | Refresh token 7 gün, her kullanımda yenilenir |
| GET | `/api/Place/Countries`, `/States/{countryId}`, `/Cities/{stateId}`, `/CityDetail/{cityId}` | Ülke, il ve ilçe kimlikleri | Başvuru onayı | v2 sürümü (`/api/v2/Place/...`) üst seviyeleri de döner. `CityDetail` yalnızca v1'de var |
| GET | `/api/Place/CitiesByName` | Ada göre şehir/ilçe kimliği arama | Başvuru onayı | [RESMÎ: openapi/v1.json] |
| GET | `/api/v2/Place/CitiesWithCoordinates` | Koordinatlarıyla birlikte şehir listesi | Başvuru onayı | [RESMÎ: openapi/v2.json] |
| POST | `/api/Location/CityFromLocation` (v2: `/api/v2/Location/CityFromLocation`) | Konumdan (enlem/boylam) şehir kimliği bulur | Başvuru onayı | Konuma göre çalışan takip uygulaması için kilit uç nokta [RESMÎ: openapi/v1.json, v2.json] |
| GET | `/api/PrayerTime/Daily/{cityId}`, `/Weekly/{cityId}`, `/Monthly/{cityId}` | Namaz vakitleri | Başvuru onayı | Her servis için 10 istek, parametre başına ayrı [RESMÎ] |
| GET | `/api/PrayerTime/Eid/{cityId}`, `/Ramadan/{cityId}` | Bayram namazı ve Ramazan imsakiyesi | Başvuru onayı | |
| POST | `/api/PrayerTime/DateRange` | Tarih aralığı (yıllık) vakitler | Başvuru onayı | Konum başına ayda 10 istek |
| GET | `/api/DailyContent` | Günün ayeti, hadisi ve duası | Başvuru onayı | |
| GET | `/api/IslamicReligiousDay/ByDay?date=`, `/ByYear?year=` | Dinî günler | Başvuru onayı | |
| GET | `/api/Quota/My` | Kalan kota | Başvuru onayı | Günlük, aylık ve yıllık kota |

Tabloda olmayan diğer kullanıcı uç noktaları (OpenAPI belgelerinde): `POST /api/Location/MosqueFromLocation`, `POST /api/Location/CityFromSettlement`, `GET /api/Place/Mosques`, `/api/Place/MosquesByName`, `/api/DailyContent/VerseHadithAndPrayer`, `/api/DailyContent/ReligiousCalendar`, `/api/SignLanguageKhutbahs/ByDate`, `POST /api/SmartDeviceDatas/PrayerTimes`, `/api/v2/Place/CitiesTurkishAirlines` [RESMÎ]. Tam liste için OpenAPI belgelerine bakın (aşağıda).

Etkileşimli referans: `https://awqatsalah.diyanet.gov.tr/scalar` [RESMÎ].

### CollectAPI (ücretli aracı) — nöbetçi eczane vb.

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `https://api.collectapi.com/health/dutyPharmacy?il=...&ilce=...` | İl ve ilçeye göre nöbetçi eczaneler | Ücretli (Free paket var) | Uç nokta yolu topluluk örneklerinden alındı. Ürün sayfası uç noktayı göstermiyor [3. TARAF] |
| GET | `https://api.collectapi.com/pray/all?data.city=...` | Namaz vakitleri (aracı) | Ücretli | [3. TARAF] Kaynağı belirtilmemiş |

### e-Devlet, GİB, PTT

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| — | e-Devlet Kapısı entegrasyonu | Kurumların hizmetlerini e-Devlet'e bağlaması, e-Devlet ile kimlik doğrulama | Yalnızca kamu kurumları ve yetkili kuruluşlar | Herkese açık geliştirici API'si **yok** [RESMÎ: kurumlar sayfası]. `turkiye.gov.tr/entegrasyon` 404 döndü |
| — | GİB e-Fatura | e-Fatura ve e-Arşiv gönderme/alma | e-Fatura Portalı (web), özel entegratör ya da doğrudan entegrasyon (büyük mükellef, yüksek şartlar) | GİB listesinde **93 özel entegratör** kaydı var (ör. Logo, Uyumsoft, İŞNET, Sovos, QNB eSolutions, Nilvera, TÜRKKEP, Turkcell e-Şirket) [RESMÎ, 15.10.2026] |
| — | PTT posta kodu | `postakodu.ptt.gov.tr` adresi `ptt.gov.tr/posta-kodu` adresine yönleniyor | Herkese açık (web arayüzü) | Sertifika hatası nedeniyle içerik okunamadı. Resmî API belgesi bulunamadı ("belgede yok"). PTT'nin indirilebilir posta kodu listesi (Excel) yayımladığı biliniyor [3. TARAF, doğrulanamadı] |

## Gerçek zamanlı / bildirim

- **Webhook, WebSocket, streaming, WebSub:** Bu alandaki hiçbir resmî kaynakta yok [RESMÎ, gözlem].
- **RSS/Atom:** Resmî Gazete'de bulunamadı. CKAN'ın standart Atom feed'leri İBB (`https://data.ibb.gov.tr/feeds/dataset.atom`) ve İzmir'de (`https://acikveri.bizizmir.com/feeds/dataset.atom`) **açık**: 15.10.2026'da ikisi de HTTP 200 ve güncel `<updated>` değeri taşıyan geçerli Atom XML döndü [RESMÎ, gözlem]. Aramaya göre filtreli feed: `/feeds/custom.atom?q=...`.
- **Önerilen yöntem:** Periyodik polling.
  - CKAN: `package_search?sort=metadata_modified desc&rows=20` ile son değişen veri setleri çekilir. Her kaynağın `last_modified` alanı saklanır ve değişince bildirim üretilir. Alternatif: CKAN Atom feed'i (`/feeds/dataset.atom`, `/feeds/custom.atom?q=...`) bir RSS okuyucuyla ya da polling ile izlenir.
  - TÜİK: SDMX `dataflow`/`data` sorgusuyla son gözlem dönemi saklanır, yeni gözlem gelince bildirim üretilir.
  - Resmî Gazete: Her gün yaklaşık 00:00'dan sonra `YYYYMMDD.pdf` veya fihrist sayfası kontrol edilir. Mükerrer sayılar için gün içinde tekrar bakılır.
  - Nöbetçi eczane: Günlük veri olduğu için günde 1–2 sorgu yeterlidir (nöbet genelde 08:30 / 18:30 değişir [TAHMİN, ile göre farklı]).

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Belediye portalında yeni veya güncellenen veri seti | Evet | CKAN `package_search` + `metadata_modified` sıralaması ve fark alma; ya da CKAN Atom feed'i (`/feeds/dataset.atom`, `/feeds/custom.atom?q=...`) ile RSS okuyucu veya polling | Herkese açık | İBB'de aktivite akışı (`recently_changed_...`) kapalı. Push yok, polling gerekli; ancak hazır Atom değişiklik akışı var |
| Belirli bir tablo verisinde değişiklik (ör. otopark doluluk, baraj seviyesi) | Evet (kaynağa bağlı) | `datastore_search` veya kaynak API URL'si, ardından eşik/filtre kuralı | Herkese açık | Güncelleme sıklığı veri setinin meta verisinde yazar |
| Resmî Gazete'de anahtar kelime (ör. "asgari ücret", "yönetmelik") | Evet | Günlük fihrist HTML'ini çekme ve başlıkta anahtar kelime filtresi | Herkese açık (kazıma) | API yok. HTML yapısı değişirse kırılır |
| Nöbetçi eczane (konuma göre) | Evet | İzmir `openapi` (resmî), diğer iller için CollectAPI veya eczacı odası siteleri | Herkese açık / ücretli / resmî olmayan | İBB tarafında karşılığı doğrulanmadı |
| Namaz vakti ve dinî gün hatırlatıcısı | Evet | Diyanet Awqat Salah (aylık çekip önbelleğe alma) | Başvuru onayı | Kota çok düşük. Sonuçlar mutlaka önbelleğe alınmalı |
| e-Devlet'teki kişisel bildirimler (tebligat vb.) | Hayır (geliştirici için) | — | Kurum | Kişisel veri. Kazıma hem ToS hem KVKK riski taşır |
| Gelen e-Fatura bildirimi | Evet (dolaylı) | Entegratörün API'si veya webhook'u (entegratöre göre) | Ücretli | GİB'in kendisinde webhook yok |
| İstatistik bülteni (TÜİK) yayımlandı | Evet | TÜİK SDMX `dataflow`/`data` sorgusuyla yeni gözlem kontrolü (alternatif: EVDS serisi) | Geliştirici (TÜİK API anahtarı) | Token için SMS doğrulamalı hesap gerekir |

## Hız sınırları ve fiyatlar

- **İBB / İzmir CKAN:** Yayımlanmış bir limit yok ("belgede yok"). Nazik polling önerilir (ör. veri seti başına dakikada en fazla 1 istek) [TAHMİN].
- **Diyanet Awqat Salah:** Servis başına 10 istek (parametre başına ayrı sayılır). İlk 15 gün için 100. `DateRange` konum başına ayda 10. Günlük, aylık ve yıllık kotalar var. Ücretsiz [RESMÎ]. Resmî örnek projenin README'si "her uç nokta için 5 istek" diyor [ÇELİŞKİLİ: eski bilgi olabilir; `/api/Quota/My` ile kontrol edin].
- **CollectAPI:** Free, Basic, Premium ve Enterprise paketleri var. Fiyatlar fiyat sayfasında. Fiyat sayfası 15.10.2026'da 404 döndü ve rakam doğrulanamadı [RESMÎ + gözlem].
- **GİB özel entegratörler:** Kontör veya paket bazlı fiyatlandırma, entegratöre göre değişir [3. TARAF].
- **e-Devlet / GİB doğrudan:** Geliştiriciye açık bir fiyatlandırma yok.

## Resmî olmayan yollar ve riskler

- **Resmî Gazete kazıma:** Dosya yolları öngörülebilir (`eskiler/YYYY/MM/YYYYMMDD...`). Veri kamuya açık resmî metin olduğundan içerik riski düşüktür. Yine de sunucuya aşırı yük bindirmemek ve site kullanım koşullarına uymak gerekir [TAHMİN].
- **Eczacı odası ve e-Devlet nöbetçi eczane sayfaları:** Topluluk kütüphaneleri ve aracı API'ler (CollectAPI dahil) çoğunlukla bu sayfaları kazıyarak veri topluyor [3. TARAF, TAHMİN]. HTML değişikliklerinde kırılabilir. Doğruluk ve güncellik garantisi yoktur.
- **e-Devlet kazıma / otomasyon:** e-Devlet şifresiyle otomatik giriş yapan araçlar hesap güvenliği, kullanım koşulları ve KVKK açısından **yüksek risklidir**. Kamuya açık bir projede kesinlikle önerilmez [TAHMİN, nesnel değerlendirme].
- **Diyanet vakitlerinin başka aracılarla alınması:** Bazı topluluk API'leri Diyanet sitesini kazır ya da kendi hesaplamasını yapar. Vakitler resmî vakitlerden birkaç dakika sapabilir [3. TARAF].
- **Kişisel veri:** Nöbetçi eczane verisindeki telefon ve adres bilgileri işletmeye aittir, kişisel veri değildir. Yine de kişi adları (ör. eczacı adı) içeren alanlar saklanacaksa KVKK değerlendirmesi yapılmalıdır [TAHMİN].

## SDK ve kütüphaneler

- **CKAN (genel):**
  - Python `ckanapi` (resmî CKAN projesi) [RESMÎ: CKAN]
  - .NET'te hazır güncel ve resmî bir SDK yok. `HttpClient` ve `System.Text.Json` ile Action API'yi çağırmak en pratik yol (API basit JSON döner) [TAHMİN]
  - R için `ckanr` [3. TARAF]
- **Diyanet Awqat Salah:** Resmî **C# / .NET Core** örnek projesi: `github.com/DinIsleriYuksekKurulu/AwqatSalah` (MIT, Repository Pattern; kimlik bilgileri `appsettings.json` → `AwqatSalahSettings` altına yazılır) [RESMÎ]. Kimlik bilgilerini depoya koymayın; User Secrets veya ortam değişkeni kullanın.
- **GİB e-Fatura:** Her entegratörün kendi SDK'sı ve örnekleri vardır (genelde .NET ve Java). UBL-TR XML şeması GİB tarafından yayımlanır [RESMÎ: ebelge.gib.gov.tr].
- **CollectAPI:** Resmî SDK yok. Doküman cURL ve dil örnekleri veriyor [RESMÎ].

## Postman / OpenAPI / koleksiyonlar

- **Diyanet Awqat Salah:** Scalar arayüzü (`/scalar`) ve indirilebilir OpenAPI belgeleri: `https://awqatsalah.diyanet.gov.tr/openapi/v1.json` ve `https://awqatsalah.diyanet.gov.tr/openapi/v2.json` (ikisi de herkese açık, HTTP 200) [RESMÎ].
- **TÜİK:** SDMX 2.1 standardı; web servis dokümanı `veriportali.tuik.gov.tr/tr/sdmx-web-service-documentation` [RESMÎ].
- **CKAN:** Resmî OpenAPI belgesi yok. Action API referansı `docs.ckan.org` adresindedir [RESMÎ: CKAN].
- **İzmir `openapi.izmir.bel.tr`:** Swagger/OpenAPI sayfası bulunamadı (kök adres 404) [RESMÎ, gözlem].
- **CollectAPI:** `docs.collectapi.com` adresinde şablon dokümanlar var [RESMÎ].
- Diğer kurumlar: belgede yok.

## Depoda ilgili sayfalar

- [Finans ve Ekonomi API'leri](../Finans-ve-Ekonomi/) — TCMB EVDS ve döviz/enflasyon serileri (TÜİK verilerine API ile erişmenin pratik yolu).
- [Haber API'leri](../Haber/) — Haber sitelerini ve RSS'leri takip etmek için.
- [Mesajlaşma API'leri](../Mesajlasma/) — Takip sonuçlarını Telegram/WhatsApp ile bildirmek için.
- [Şirket Kurma rehberi](../../Rehberler/Sirket-Kurma/) — e-Fatura ve özel entegratör seçimi bağlamı.

## Kaynaklar

Resmî:

- https://data.ibb.gov.tr/api/3/action/status_show — İBB CKAN sürümü (2.9.11) ve eklentileri — (erişim: 15 Ekim 2026)
- https://data.ibb.gov.tr/api/3/action/package_list — İBB veri seti listesi, canlı API — (erişim: 15 Ekim 2026)
- https://acikveri.bizizmir.com/api/3/action/status_show — İzmir CKAN sürümü (2.8.5) — (erişim: 15 Ekim 2026)
- https://acikveri.bizizmir.com/api/3/action/package_show?id=nobetci-eczaneler-ve-eczane-listesi — İzmir nöbetçi eczane veri seti ve `openapi.izmir.bel.tr` uç noktaları — (erişim: 15 Ekim 2026)
- https://awqatsalah.diyanet.gov.tr/index.html — Diyanet Awqat Salah API: başvuru, kimlik doğrulama, uç noktalar, kota — (erişim: 15 Ekim 2026)
- https://github.com/DinIsleriYuksekKurulu/AwqatSalah — Diyanet resmî C# örnek projesi — (erişim: 15 Ekim 2026)
- https://www.resmigazete.gov.tr/ — Resmî Gazete günlük fihrist ve dosya yolu yapısı — (erişim: 15 Ekim 2026)
- https://ebelge.gib.gov.tr/efaturaozelentegratorlerlistesi.html — GİB e-Fatura özel entegratör listesi ve yararlanma yöntemleri — (erişim: 15 Ekim 2026)
- https://www.turkiye.gov.tr/kurumlar — e-Devlet'e entegre kurumlar ve hizmet sayıları ("yasama, yürütme ve yargı kurumları ile Özel Kuruluşlar") — (erişim: 15 Ekim 2026)
- https://veriportali.tuik.gov.tr/ — TÜİK veri portalı (data.tuik.gov.tr buraya yönleniyor) — (erişim: 15 Ekim 2026)
- https://veriportali.tuik.gov.tr/tr/sdmx-web-service-documentation — TÜİK SDMX web servis dokümanı (API anahtarı, token akışı, MEDAS uyarısı; içerik portalın JS paketinde) — (erişim: 15 Ekim 2026)
- https://nsiws.tuik.gov.tr/rest/dataflow/TR/all/latest — TÜİK SDMX REST servisi (kimliksiz istek 401) — (erişim: 15 Ekim 2026)
- https://data.ibb.gov.tr/feeds/dataset.atom — İBB CKAN Atom feed'i — (erişim: 15 Ekim 2026)
- https://acikveri.bizizmir.com/feeds/dataset.atom — İzmir CKAN Atom feed'i — (erişim: 15 Ekim 2026)
- https://openapi.izmir.bel.tr/api/ibb/nobetcieczaneler — İzmir nöbetçi eczane canlı yanıtı (alan adları, LokasyonX/Y anlamı) — (erişim: 15 Ekim 2026)
- https://awqatsalah.diyanet.gov.tr/openapi/v1.json ve https://awqatsalah.diyanet.gov.tr/openapi/v2.json — Diyanet Awqat Salah OpenAPI belgeleri — (erişim: 15 Ekim 2026)
- https://docs.collectapi.com/docs/general — CollectAPI kimlik doğrulama ve paket türleri — (erişim: 15 Ekim 2026)
- https://docs.ckan.org/en/2.9/api/ — CKAN Action API referansı — (erişim: 15 Ekim 2026)

Üçüncü taraf:

- https://github.com/ozancanozdemir/Turkiye-deki-Acik-Veri-Portallari-Open-Data-Portals-in-Turkey- — Türkiye açık veri portalları kataloğu (Şubat 2026 güncellemesi; API/Download etiketleri) — (erişim: 15 Ekim 2026)
- https://www.memurlar.net/haber/868335 — 2019 tarihli "kamu verileri veri.gov.tr ile açılacak" haberi (eski; tarihsel bağlam) — (erişim: 15 Ekim 2026)

> Not: Bu sayfa hazırlanırken web arama kotası doldu. data.gov.tr, PTT posta kodu ve e-Devlet entegrasyon başvurusu konularında yalnızca doğrudan erişilebilen resmî sayfalar kontrol edildi. Bu başlıklar bir sonraki doğrulamada yeniden kontrol edilmelidir.
