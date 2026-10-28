# Yazılım geliştirici mülakat hazırlığı (.NET / C# backend) — yapay zekâ başvuru notu

- **Biçim:** saf Markdown; HTML anlatımın (index.html ve 01–08 sayfaları) birebir içeriği, tek dosyada.
- **Tarih:** 29 Ekim 2026. .NET bilgileri .NET 10 (LTS, Kasım 2025) ve C# 14 itibarıyla learn.microsoft.com'dan kontrol edildi.
- **Kullanım:** Bir yapay zekâ asistanına bağlam olarak verilip "bana bu konudan mülakat sorusu sor, cevabımı değerlendir" gibi çalışmalarda kullanılabilir. Cevaplar kasıtlı olarak kısadır (1–4 satır); derinlik için bağlantı verilen sayfalara gidilir.
- **Kapsam dışı:** SQL mülakatı ayrı rehberde ([SQL Mülakat Rehberi](../SQL-Mulakat/)); burada yalnız 6 soruluk özet var.

## Güven etiketleri ve rozetler

| Etiket | Anlamı |
|---|---|
| [RESMÎ] | Microsoft Learn, RFC, ürünün kendi dokümanı. |
| [3. TARAF] | Tanınmış ama resmî olmayan kaynak (ör. .NET Blog yazarı, topluluk rehberi). |
| [TAHMİN] | Alan deneyimine dayanan değerlendirme; istatistik yok. |
| [ÇELİŞKİLİ] | Kaynaklar ve uygulayıcılar arasında tek doğru cevabı olmayan konu. |
| [MÜLAKATTA SIK] | .NET backend mülakatlarında çok sık çıkan soru [TAHMİN]. |
| [TUZAK] | Yanlış cevabı yaygın olan soru. |
| [YENİ] | .NET 10 / C# 14 / EF Core 10 / ASP.NET Core 10 ile gelen ya da değişen bilgi. |
| [ESKİDİ] | Hâlâ sorulan ama güncelliğini yitirmiş bilgi. |

Teknik cevaplarda etiket yoksa, ilgili sayfanın "Kaynaklar" bölümündeki resmî dokümana dayanır.

## Doğrulanmış sürüm gerçekleri (29 Ekim 2026)

| Gerçek | Kaynak | Etiket |
|---|---|---|
| C# 14, .NET 10 ile geldi; özellikler: extension members, `field`, null-conditional assignment, `nameof` unbound generic, Span örtük dönüşümleri, lambda parametre niteleyicileri, partial constructor/event, kullanıcı tanımlı bileşik atama. | learn.microsoft.com — What's new in C# 14 | [RESMÎ] |
| .NET 10 LTS → Kasım 2028; .NET 9 STS ve .NET 8 LTS → Kasım 2026. STS 24 ay, LTS en az 3 yıl. | learn.microsoft.com — .NET releases and support | [RESMÎ] |
| EF Core 10: Kasım 2025, LTS, 10 Kasım 2028'e kadar; .NET 10 gerektirir; LeftJoin/RightJoin, adlandırılmış query filter, complex type → JSON, `ExecuteUpdateAsync` normal lambda, `FromSqlRaw` birleştirme analizörü. | learn.microsoft.com — What's New in EF Core 10 | [RESMÎ] |
| ASP.NET Core 10: minimal API `AddValidation()`, OpenAPI 3.1 varsayılan, API uçlarında cookie auth 401/403 döner, `TypedResults.ServerSentEvents`, Identity passkey. | learn.microsoft.com — What's new in ASP.NET Core 10 | [RESMÎ] |
| Yeni projeler için Minimal API öneriliyor; controller büyük/karmaşık uygulamalar için alternatif. | learn.microsoft.com — APIs overview | [RESMÎ] |
| Singleton'dan scoped çözmek scoped'u singleton gibi davrandırır; Development'ta scope doğrulaması istisna fırlatır; çözüm `IServiceScopeFactory`. | learn.microsoft.com — Service lifetimes | [RESMÎ] |


## 00 · Genel bakış, mülakat türleri ve süreç

*HTML: index.html* — .NET / C# backend ağırlıklı bir yazılım geliştirici mülakatı için kısa, anahtar kelimeli bir tekrar rehberi. Her madde "soru → 1–4 satırlık cevap" biçiminde; amaç ezber değil, cevabın iskeletini ve doğru terimleri hazır tutmak. Mülakat türleri, online test taktikleri, teknik konular, davranışsal ve İngilizce sorular, maaş ve kontrol listesi.

### Bu rehber nasıl kullanılır

- **Mülakata bir hafta varsa:** sırayla oku, bilmediğin her satırı işaretle, o satırın yanındaki bağlantıdan derin sayfaya git.
- **Mülakat yarınsa:** yalnız [MÜLAKATTA SIK] satırlarını ve [Son gece hızlı tekrar](08-son-gece.html) sayfasını oku.
- **Junior / stajyer:** ağırlık C# dili, OOP, SQL, Git, REST ve algoritma sorularında. Mimari ve dağıtık sistem soruları genelde bir cümlelik teyit sorusudur [TAHMİN]. İş deneyimin yoksa davranışsal hikâyeleri staj ve projelerden kur ([06](06-davranissal-ve-ingilizce.html#star)).
- **Mid / senior:** DI, EF Core performansı, async, mimari, cache, kuyruk, idempotency ve sistem tasarımı belirleyicidir [TAHMİN].
- **Başka dilden geliyorsan (Java, JS, Python):** kavramların çoğu aynıdır; C#'a özgü olanlar (değer tipleri, `async`/`await` ayrıntısı, LINQ, `IDisposable`) [01 · C# dili](01-csharp-dili.html) sayfasında.
- **C# / .NET'e yeni başlıyorsan:** bu rehber tekrar içindir, sıfırdan öğretmez; önce [C# / .NET anahtar listesi](../../Programlama/CSharp-DotNet/) ile temel kavramları çalış, sonra buraya dön.

| İşaret | Anlamı |
|---|---|
| [MÜLAKATTA SIK] | Neredeyse her .NET backend mülakatında çıkan soru. Boş bırakma. |
| [TUZAK] | Yanlış cevabı yaygın olan soru; mülakatçı bilerek sorar. |
| [YENİ] | .NET 10 / C# 14 ile gelen ya da değişen bilgi (Kasım 2025 sonrası). |
| [ESKİDİ] | Hâlâ sorulan ama eskimiş bilgi; güncel hâlini söylemek artı puan. |
| [TAHMİN] | Resmî kaynağı olmayan, alan deneyimine dayanan değerlendirme. |

> **Var olan sayfalarla ilişkisi**
> Bu rehber kütüphanedeki şu sayfaların üstüne kurulur; aynı bilgiyi tekrar yazmaz, kısa cevabı verip oraya bağlantı verir:
> [Programlama · Mülakatta sık sorulanlar](../../Programlama/index.html#mulakatta-sik) — hangi teknoloji hangi sıklıkla sorulur, kıdeme ve hedefe göre nasıl okunur (risk tablosu).
> [C# / .NET anahtar listesi](../../Programlama/CSharp-DotNet/) — 10 bölümde bütün terimler ve resmî doküman bağlantıları.
> [İşsizlik rehberi · İş arama](../Issizlik/07-is-arama.html#mulakat) — .NET mülakat başlıkları, canlı kodlama, sistem tasarımı, İngilizce mülakat ve maaş pazarlığı.
> SQL mülakatı ayrı rehberde: [SQL mülakat rehberi](../SQL-Mulakat/index.html). Burada yalnız kısa özet var ([03 · § SQL](03-aspnet-core-ef-core.html#sql-ozet)).

### Mülakat türleri

| Tür | Ne olur | Nasıl hazırlanılır |
|---|---|---|
| **İK ön görüşme** (15–30 dk) | Özgeçmiş üzerinden hızlı tur, beklenti, başlama tarihi, çalışma biçimi (uzaktan/hibrit). | 2 dakikalık kendini tanıtma; neden bu şirket; maaş sorusuna hazır cümle ([07](07-kapanis-maas-kontrol.html#maas)). |
| **Teknik sözlü** | "X nedir, Y ile farkı ne, ne zaman kullanırsın" soruları; derinleştirme ("peki neden?"). | Bu rehberin 01–04 sayfaları. Cevap kalıbı: **tanım → fark → ne zaman → örnek**. |
| **Online kodlama testi** | Zamanlı platformda (HackerRank, Codility, LeetCode benzeri) algoritma ve/veya SQL soruları, otomatik testle puanlama. | [§ 3](#online-test) taktikleri + [05](05-algoritma-sistem-tasarimi.html). |
| **Take-home proje** | Birkaç gün süreli küçük uygulama (ör. REST API + veritabanı + test). | [§ 4](#take-home) kontrol listesi. |
| **Canlı kodlama** | Paylaşılan ekranda mülakatçıyla birlikte kod; düşünceyi sesli anlatmak beklenir. | Sesli düşünme kalıpları [06](06-davranissal-ve-ingilizce.html#ingilizce); küçük problemleri süreyle çöz. |
| **Sistem tasarımı** | "URL kısaltıcı / sipariş servisi tasarla"; beyaz tahta, 30–60 dk. | [05 · Sistem tasarımı](05-algoritma-sistem-tasarimi.html#sistem-tasarimi) iskeleti. |
| **Davranışsal** | "Bir çatışmayı anlat", "hata yaptığın an" gibi geçmiş davranış soruları. | STAR yöntemi, [06](06-davranissal-ve-ingilizce.html). |
| **Kod inceleme / refactor** | Kötü yazılmış bir kodu inceleyip sorunları bulmak. | SOLID ihlalleri, `async void`, N+1, `new HttpClient()`, eksik `using` gibi klasik hatalar. |

**Tipik süreç:** başvuru → İK ön görüşme → online test veya take-home → teknik mülakat (1–3 tur) → yönetici / kültür görüşmesi → teklif. Küçük şirketlerde 2 adım, büyük şirketlerde 4–6 adım olabilir [TAHMİN].

### Online kodlama testi taktikleri

Zamanlı platformlarda (algoritma ve SQL) puan çoğu zaman **gizli test vakalarıyla** verilir: ekranda gördüğün örnek girdi/çıktı, değerlendirmede kullanılan verinin yalnız küçük bir parçasıdır.

| Soru | Kısa cevap |
|---|---|
| Örnek çıktı tuttu, neden puan düşük? | Örnek çıktı ≠ tam veri. Gizli testlerde boş girdi, tek eleman, tekrar eden değer, NULL, negatif sayı, çok büyük girdi (zaman aşımı) olur. |
| Sabit değere göre yazmak neden yanlış? | `if (n == 5) return 120;` gibi örneğe göre yazılan kod gizli testte çöker. Her zaman **koşula göre** yaz: "en büyük", "ilk tekrar eden", "toplamı hedefe eşit". |
| "Run tests" ne sıklıkla? | **Sık.** Her küçük adımdan sonra çalıştır; derleme hatasını erken gör. Son 5 dakikaya bırakma. |
| SQL sorusunda kendimi nasıl kontrol ederim? | Asıl sorgunun arkasına geçici bir **kontrol sorgusu** ekle (ör. `SELECT COUNT(*)`, `GROUP BY ... HAVING COUNT(*) > 1` ile tekrar var mı, NULL var mı). Göndermeden önce sil ya da yorum satırı yap. |
| Uç durumlar listesi? | Boş liste/string · tek eleman · hepsi aynı · negatif/sıfır · çok büyük sayı (`int` taşması → `long`) · NULL · büyük-küçük harf · Türkçe karakter (`ToLowerInvariant`). |
| Zaman kötü giderse? | Önce **çalışan kaba çözüm** (brute force) gönder, kısmi puan al; kalan sürede optimize et. |
| Karmaşıklık sınırı nasıl tahmin edilir? | n ≤ 10⁴ → O(n²) çoğu zaman geçer; n ≥ 10⁵ → O(n log n) veya O(n) gerekir [TAHMİN]. |
| Kopyala-yapıştır / yapay zekâ? | Çoğu platform sekme değişimini, yapıştırmayı ve kamerayı izleyebilir; kuralları baştan oku. Yasaksa kullanma. |

> **Püf noktası**
> Soruyu okuduktan sonra 1–2 dakika ayır: girdi sınırlarını, dönüş tipini ve "eşitlik olursa ne olacak" kuralını not et. Hataların çoğu kodda değil, yanlış okunan şartta çıkar.

### Take-home ve canlı kodlama

| Soru | Kısa cevap |
|---|---|
| Take-home'da en çok neye bakılır? | Çalışıyor mu, okunur mu, test var mı, README'de nasıl çalıştırılacağı yazıyor mu. Aşırı mimari (5 katman, 20 proje) çoğu zaman eksi [TAHMİN]. |
| Take-home kontrol listesi? | `dotnet run` ile tek komutta açılıyor · README (kurulum, kararlar, eksikler) · birkaç birim + 1 entegrasyon testi · doğrulama ve hata cevabı (ProblemDetails) · gizli bilgi depoda yok · anlamlı commit geçmişi. |
| Canlı kodlamada ilk ne yapılır? | Soruyu kendi cümlenle tekrar et, netleştirme sorusu sor, örnek girdiyle elle çöz, sonra kodla. |
| Takıldığımda? | Sesli düşün: "Şu an O(n²) çözüm görüyorum, önce onu yazıp sonra Dictionary ile iyileştirebilirim." Sessiz kalmak en kötüsü. |
| Bitirince? | Kendi kodunu bir örnekle "elle çalıştır", uç durumları söyle, karmaşıklığı (zaman/bellek) belirt. |

### Bölümler

- **01 · C# dili** (01-csharp-dili.html) — Değer/referans tipi, record, boxing, string, ref/out/in, nullable, generics, delegate, LINQ, GC, exception, async/await, Span, pattern matching, == ve Equals.
- **02 · OOP, SOLID, mimari ve desenler** (02-oop-solid-desenler.html) — OOP'nin dört ayağı, SOLID (ihlal örnekleriyle), DRY/KISS/YAGNI, composition, clean/onion, CQRS, repository tartışması, mediator, GoF desenleri.
- **03 · ASP.NET Core, EF Core ve SQL özeti** (03-aspnet-core-ef-core.html) — Middleware, DI ömürleri, filtre, binding, auth/JWT, CORS, REST ve durum kodları, idempotency, rate limiting, options; EF Core N+1, tracking, migration, concurrency; SQL özeti.
- **04 · Dağıtık sistemler, test ve Git** (04-dagitik-test-git.html) — Redis, RabbitMQ/Kafka, mikroservis vs monolit, eventual consistency, Docker, CI/CD, bulut; test türleri, mock/stub, xUnit, AAA, TDD; Git merge/rebase/cherry-pick.
- **05 · Veri yapıları, algoritma ve sistem tasarımı** (05-algoritma-sistem-tasarimi.html) — Big-O, List/Dictionary/HashSet/Queue/Stack karmaşıklıkları, 10 klasik kodlama sorusu C# ile, URL kısaltıcı sistem tasarımı iskeleti.
- **06 · Davranışsal sorular ve İngilizce mülakat** (06-davranissal-ve-ingilizce.html) — STAR yöntemi, 12 davranışsal soru için şablon, İngilizce mülakat kalıp cümleleri.
- **07 · Sona sorular, maaş ve kontrol listesi** (07-kapanis-maas-kontrol.html) — Adayın şirkete soracağı sorular, maaş pazarlığı ilkeleri, mülakat öncesi/günü/sonrası kontrol listesi.
- **08 · Son gece hızlı tekrar** (08-son-gece.html) — Bütün rehber tek sayfada: anahtar cümleler ve en sık tuzaklar.

### Kaynaklar

- [RESMÎ] [.NET dokümantasyonu (Microsoft Learn)](https://learn.microsoft.com/dotnet/)
- [RESMÎ] [.NET releases, patches, and support](https://learn.microsoft.com/dotnet/core/releases-and-support) — erişim 29 Eki 2026
- Kütüphane içi: [Programlama § 4](../../Programlama/index.html#mulakatta-sik), [İş arama § 6–7](../Issizlik/07-is-arama.html#mulakat)


## 01 · C# dili

*HTML: 01-csharp-dili.html* — Tipler ve bellek, OOP anahtar kelimeleri, generics, delegate, LINQ, iterator, IDisposable, GC, exception, async/await, Span ve pattern matching. Her cevap 1–4 satır; ayrıntı için C# / .NET 01 sayfasına bağlantı var.

### Tipler ve bellek

Derin sayfa: [C# / .NET · 01 · Temel tipler](../../Programlama/CSharp-DotNet/01-csharp-dili/index.html#temel-tipler), [Bellek ve performans](../../Programlama/CSharp-DotNet/01-csharp-dili/index.html#bellek-ve-performans).

| Soru | Kısa cevap |
|---|---|
| Değer tipi ile referans tipi farkı? [MÜLAKATTA SIK] | **Değer tipi** (`int`, `struct`, `enum`) atamada **kopyalanır**; **referans tipi** (`class`, `string`, dizi, delegate) atamada **referans** kopyalanır, iki değişken aynı nesneyi gösterir. Yer: değer tipi yerel değişkense genelde stack'te, bir sınıfın alanıysa o nesnenin içinde heap'te. |
| "Değer tipleri stack'te durur" doğru mu? [TUZAK] | Tam değil. Nerede durduğu **değişkenin nerede tanımlandığına** bağlı; sınıf alanı olan `int` heap'tedir, yakalanan (closure) yerel değişken de heap'e taşınır. Doğru cevap: "kopyalama semantiği" farkı. |
| struct mı class mı? [MÜLAKATTA SIK] | `struct`: küçük (≈16 bayt altı önerilir), değişmez, kimliği olmayan değer (koordinat, para). `class`: kimliği olan, büyük, kalıtım gereken, paylaşılan nesne. Büyük struct her geçişte kopyalanır → yavaş. |
| record nedir, class'tan farkı? [MÜLAKATTA SIK] | `record` (varsayılan `record class`) **değer eşitliği** (`Equals`/`==` alanlara göre), `ToString`, `with` ifadesi ve kısa (positional) söz dizimi üretir. `record struct` (C# 10) değer tipli sürümü. DTO, olay (event), değişmez model için. |
| Boxing / unboxing? [MÜLAKATTA SIK] | Değer tipinin `object` veya arayüze çevrilmesi = **boxing** (heap'te kutu, bellek ayırma); geri çevirme = **unboxing** (tip kontrolü + kopya). Önlem: generics (`List<int>`, `ArrayList` değil), `ToString()` yerine generic API'ler. |
| string neden immutable? [MÜLAKATTA SIK] | Her değişiklik **yeni string** üretir; güvenli paylaşım, thread-safe, hash sabit, **interning** mümkün. Döngüde `+=` → O(n²) bellek; çözüm `StringBuilder` (ya da `string.Join`, `string.Create`). |
| StringBuilder ne zaman? | Döngüde çok sayıda birleştirme. 2–3 parçalık birleştirmede `+` veya `$"..."` yeterli (derleyici optimize eder). |
| `ref`, `out`, `in` farkı? [MÜLAKATTA SIK] | `ref`: çağırmadan önce atanmış olmalı, metot okuyup değiştirebilir. `out`: metot **atamak zorunda** (`TryParse` deseni). `in`: salt okunur referans (büyük struct'ı kopyalamadan geçirmek). C# 12 `ref readonly` parametre de ekledi. |
| Nullable value type ve nullable reference type farkı? | `int?` = `Nullable<int>`, gerçek bir tip (`HasValue`, `Value`). `string?` (C# 8, **NRT**) yalnız **derleme zamanı uyarısı**; çalışma zamanında tip aynı. Yeni şablonlarda `<Nullable>enable</Nullable>` açık. |
| `?.`, `??`, `??=`, `!` ? | `?.` null ise kısa devre; `??` null ise sağdaki; `??=` null ise ata; `!` (null-forgiving) derleyiciye "null değil" der, kontrol yapmaz. C# 14 [YENİ]: `customer?.Order = x;` sol tarafta da çalışır (null-conditional assignment). |
| `const` ve `readonly` farkı? [MÜLAKATTA SIK] | `const`: derleme zamanı sabiti, yalnız ilkel/string, **çağıran derlemeye gömülür** (kütüphanede değişirse çağıran yeniden derlenmeli). `readonly`: çalışma zamanında, kurucuda atanır, her tip olabilir. Paylaşılan sabit nesne → `static readonly`. |
| `static` sınıf / üye? | `static class` örneklenemez, yalnız static üye (yardımcı metotlar, extension). Static alan tüm uygulamada tek kopya → thread güvenliğine dikkat. Static constructor tip ilk kullanıldığında bir kez çalışır. |
| `var` tip güvenli mi? | Evet; tip derleme zamanında çıkarılır, `dynamic` değildir. |

### OOP anahtar kelimeleri

Derin sayfa: [01 · Nesne yönelimli](../../Programlama/CSharp-DotNet/01-csharp-dili/index.html#nesne-yonelimli). SOLID ve tasarım: [02](02-oop-solid-desenler.html).

| Soru | Kısa cevap |
|---|---|
| abstract class ile interface farkı? [MÜLAKATTA SIK] | Abstract class: **durum (alan) ve kurucu** tutar, tek kalıtım, "is-a". Interface: sözleşme, çoklu uygulanır, "can-do". C# 8'den beri interface'te **default method**, C# 11'den beri **static abstract** üye olabilir — fark artık esas olarak durum ve tekli kalıtım. |
| Interface default method ne işe yarar? | Var olan arayüze, uygulayıcıları kırmadan yeni metot eklemek (API evrimi). Yalnız arayüz tipi üzerinden çağrılır. |
| `virtual`, `override`, `new` farkı? [TUZAK] | `virtual` + `override` = çok biçimlilik (çalışma zamanı tipine göre çağrı). `new` = **gizleme**; değişkenin derleme zamanı tipine göre çağrılır → sürpriz davranış. |
| `sealed` ne zaman? | Kalıtılmasını istemediğin sınıf (tasarım niyeti + JIT devirtualization ile küçük performans kazancı). `sealed override` ile zinciri kesmek. |
| Erişim belirleyicileri? | `public`, `private` (varsayılan üye), `protected`, `internal` (varsayılan tip; aynı assembly), `protected internal`, `private protected`, `file` (C# 11, aynı dosya). |
| Property ile field farkı? | Field veri; property get/set metotları (kapsülleme, doğrulama, arayüzde tanımlanabilir). `init` (C# 9) yalnız nesne oluşturulurken atanır; `required` (C# 11) zorunlu atama. C# 14 [YENİ]: `field` anahtar kelimesi ile ayrı backing field yazmadan accessor gövdesi. |
| Primary constructor? | C# 12'den beri sınıf ve struct'ta: `class Servis(ILogger log)`. Parametre tüm gövdede kullanılır; DI ile sık. Parametre alan değildir, `readonly` değildir. |
| Extension method? [MÜLAKATTA SIK] | `static` sınıfta, ilk parametresi `this T` olan static metot; tipi değiştirmeden ona metot ekliyormuş gibi çağrılır (LINQ böyle). C# 14 [YENİ]: `extension(...)` bloklarıyla **extension property** ve static extension üyeler. |
| Kapsülleme, kalıtım, çok biçimlilik, soyutlama? | [02 · OOP](02-oop-solid-desenler.html#oop) sayfasında tek satırlık tanımlar. |

### Generics, delegate, lambda

Derin sayfa: [01 · Generics](../../Programlama/CSharp-DotNet/01-csharp-dili/index.html#generics), [Delegate ve event](../../Programlama/CSharp-DotNet/01-csharp-dili/index.html#delegate-event).

| Soru | Kısa cevap |
|---|---|
| Generics neden var? | Tip güvenliği + yeniden kullanım + boxing yok. `List<T>` derleme zamanında tip kontrolü yapar. |
| Generic constraint'ler? [MÜLAKATTA SIK] | `where T : class` / `struct` / `new()` / `notnull` / `unmanaged` / `BaseSinif` / `IArayuz` / `T : U`. C# 13: `allows ref struct`. Kısıt, `T` üzerinde hangi üyeleri çağırabileceğini belirler. |
| Kovaryans / kontravaryans? [İLERİ] | `out T` (kovaryans): `IEnumerable<string>` → `IEnumerable<object>`. `in T` (kontravaryans): `Action<object>` → `Action<string>`. Yalnız arayüz ve delegate'lerde, yalnız referans tiplerinde. |
| delegate nedir? | Tip güvenli metot referansı. `Func<T, TResult>` değer döndürür, `Action<T>` döndürmez, `Predicate<T>` `bool` döndürür. Kendi delegate tipini yazmak artık nadir. |
| event ile delegate farkı? [MÜLAKATTA SIK] | `event`, delegate alanını kapsüller: dışarıdan yalnız `+=` / `-=`; **çağırma ve atama yalnız sahibi sınıfta**. Abonelikten çıkılmazsa bellek sızıntısı (yayıncı aboneyi canlı tutar). |
| Lambda ve closure? [MÜLAKATTA SIK] | Lambda = isimsiz fonksiyon. Dış değişkeni kullanırsa **closure** oluşur: değişkenin **kendisini** yakalar (değerini değil), derleyici onu heap'teki bir sınıfa taşır. |
| Döngüde closure tuzağı? [TUZAK] | `for (int i...)` içinde `() => i` hepsi son değeri görür (tek değişken). `foreach` değişkeni C# 5'ten beri her turda yenidir. Çözüm: döngü içinde yerel kopya. |
| `static` lambda? | `static x => x * 2` dış değişken yakalamayı derleme hatasına çevirir; istemeden bellek ayırmayı önler. |

```csharp
var islemler = new List<Action>();
for (int i = 0; i < 3; i++) islemler.Add(() => Console.Write(i)); // 333
for (int i = 0; i < 3; i++) { int k = i; islemler.Add(() => Console.Write(k)); } // 012
```

### LINQ ve iterator

Derin sayfa: [01 · LINQ](../../Programlama/CSharp-DotNet/01-csharp-dili/index.html#linq), [Diğer: iterator](../../Programlama/CSharp-DotNet/01-csharp-dili/index.html#diger).

| Soru | Kısa cevap |
|---|---|
| Deferred execution nedir? [MÜLAKATTA SIK] | `Where`, `Select`, `OrderBy` sorguyu **tanımlar**, çalıştırmaz; sonuç **enumerate** edilince (foreach, `ToList`, `Count`, `First`, `Sum`) çalışır. Her enumerate'te **yeniden** çalışır → çoklu sayım (multiple enumeration) uyarısı. |
| Hangi metotlar hemen çalışır? | `ToList`, `ToArray`, `ToDictionary`, `Count`, `Any`, `First/Single/Last`, `Sum/Min/Max/Average`, `Aggregate`. |
| IEnumerable ile IQueryable farkı? [MÜLAKATTA SIK] | `IEnumerable<T>`: bellekte, `Func` ile filtreler (LINQ to Objects). `IQueryable<T>`: **expression tree** tutar, sağlayıcı (EF Core) onu **SQL'e çevirir**. EF'de erken `AsEnumerable()`/`ToList()` → tüm tablo belleğe çekilir, filtre C#'ta çalışır. |
| IEnumerable, ICollection, IList, List farkı? | `IEnumerable`: yalnız gezinme. `ICollection`: + `Count`, `Add`, `Remove`. `IList`: + indeks. `List<T>`: somut sınıf. Parametrede en dar arayüz, dönüşte ihtiyaç kadar somut. `IReadOnlyList<T>` salt okunur dönüş için iyi. |
| First, FirstOrDefault, Single, SingleOrDefault? [MÜLAKATTA SIK] | `First`: ilk eleman, yoksa **istisna**. `FirstOrDefault`: yoksa `default`. `Single`: **tam bir** eleman olmalı; 0 veya >1 ise istisna. `SingleOrDefault`: 0 → default, >1 → istisna. Single tüm diziyi kontrol eder (SQL'de `TOP 2`). |
| `Any()` mi `Count() > 0` mı? | `Any()`: ilk elemanı bulunca durur. `Count()` hepsini sayabilir (koleksiyonda `Count` özelliği varsa hızlı). EF'de `Any` → `EXISTS`. |
| Select ile SelectMany? | `Select` 1→1 dönüşüm; `SelectMany` 1→çok, iç içe listeleri **düzleştirir**. |
| GroupBy ile ToLookup? | `GroupBy` deferred; `ToLookup` hemen çalışır, indekslenebilir sözlük gibi. |
| .NET 10'da yeni LINQ? [YENİ] | `LeftJoin` ve `RightJoin` operatörleri; EF Core 10 bunları `LEFT/RIGHT JOIN`'e çevirir (eskiden `GroupJoin` + `SelectMany` + `DefaultIfEmpty`). |
| `yield return` nedir? [MÜLAKATTA SIK] | Derleyici bir **durum makinesi** (iterator) üretir; elemanlar istendikçe tek tek üretilir (tembel). Büyük/sonsuz diziler, akış işleme. `yield break` bitirir. Metottaki doğrulama da ilk `MoveNext`'e kadar çalışmaz. |
| `IAsyncEnumerable<T>`? | `async` + `yield return` ile asenkron akış; `await foreach` ile tüketilir. EF Core `AsAsyncEnumerable`, ASP.NET Core akış cevapları. |

### IDisposable, GC, exception

Derin sayfa: [01 · Bellek](../../Programlama/CSharp-DotNet/01-csharp-dili/index.html#bellek-ve-performans), [Exception](../../Programlama/CSharp-DotNet/01-csharp-dili/index.html#exception).

| Soru | Kısa cevap |
|---|---|
| IDisposable ve `using` neden? [MÜLAKATTA SIK] | GC yalnız **yönetilen belleği** toplar; dosya, soket, DB bağlantısı gibi **yönetilmeyen kaynaklar** `Dispose()` ile hemen bırakılır. `using` bloğu/bildirimi, istisna olsa bile `Dispose` çağırır (try/finally). Async kaynak: `IAsyncDisposable` + `await using`. |
| Finalizer (`~Sinif`) ile Dispose farkı? | Finalizer GC'nin **belirsiz** zamanında çalışır, nesneyi bir nesil daha yaşatır, pahalıdır. Dispose deterministik. Dispose pattern: `Dispose(bool)` + `GC.SuppressFinalize(this)`. Çoğu sınıfa finalizer gerekmez (`SafeHandle` kullan). |
| GC nasıl çalışır? [MÜLAKATTA SIK] | **Nesilli** (generational): Gen 0 (yeni, sık toplanır) → Gen 1 (tampon) → Gen 2 (uzun ömürlü, nadir, pahalı). Kökten (stack, static, GC handle) ulaşılamayan nesneler toplanır; mark → sweep → compact. |
| LOH nedir? | **Large Object Heap**: 85.000 bayt ve üstü nesneler; Gen 2 ile toplanır, varsayılan olarak sıkıştırılmaz (parçalanma). Büyük tamponlarda `ArrayPool<T>` kullan. |
| Workstation ve Server GC? | Workstation: masaüstü, düşük gecikme. Server: çekirdek başına heap, yüksek throughput; ASP.NET Core varsayılanı Server GC. |
| `GC.Collect()` çağırmalı mıyım? | Hayır (ölçüm/teşhis dışında). GC kendi sezgisini bozar. |
| Bellek sızıntısı .NET'te olur mu? | Evet: abonelikten çıkılmamış event, static koleksiyonda biriken nesne, Dispose edilmemiş kaynak, sonsuz cache, yanlış ömürlü singleton. |
| `throw` ile `throw ex` farkı? [MÜLAKATTA SIK] | `throw;` orijinal **stack trace'i korur**. `throw ex;` stack trace'i o satıra **sıfırlar** → hatanın kaynağı kaybolur. Sarmalamak gerekirse `throw new XException("…", ex)` (InnerException). |
| `finally` ne zaman çalışır? | try'dan normal çıkışta, istisnada, `return`'de. Çalışmayan durum: süreç çökmesi, `Environment.FailFast`, StackOverflow. |
| Exception filter? | `catch (HttpRequestException ex) when (ex.StatusCode == 404)` — stack açılmadan koşul değerlendirilir. |
| İstisnayı akış kontrolü için kullanmak? | Kötü: pahalı ve okunaksız. Beklenen durumlar için `TryParse` deseni, `Result` tipi veya `bool` dönüş. |
| Global hata yönetimi (ASP.NET Core)? | `UseExceptionHandler` + `IExceptionHandler` (.NET 8+) + `AddProblemDetails` → RFC 9457 biçiminde hata cevabı. |

### async / await

Derin sayfa: [01 · Async](../../Programlama/CSharp-DotNet/01-csharp-dili/index.html#async). En yüksek getirili üç konudan biri ([İş arama § 6.1](../Issizlik/07-is-arama.html#mulakat)).

| Soru | Kısa cevap |
|---|---|
| async/await ne yapar? [MÜLAKATTA SIK] | Derleyici metodu bir **durum makinesine** çevirir; `await` tamamlanmamış bir işte **thread'i bırakır**, iş bitince devam eder. Amaç I/O beklerken thread bloklamamak (ölçeklenebilirlik), daha hızlı CPU işi değil. |
| async yeni thread açar mı? [TUZAK] | Hayır. I/O işlerinde beklenirken **hiçbir thread** meşgul değildir. CPU işini başka thread'e atmak için `Task.Run` gerekir (ASP.NET Core'da gereksiz; zaten thread pool'dasın). |
| Task ile Thread farkı? | Thread: işletim sistemi iş parçacığı, pahalı. Task: tamamlanacak bir **işin temsili** (promise); çoğu zaman thread pool'da veya hiç thread kullanmadan (I/O) çalışır. |
| Task ile ValueTask farkı? [MÜLAKATTA SIK] | `ValueTask<T>` struct'tır; sonuç çoğu zaman **senkron hazırsa** (cache) bellek ayırmayı önler. Kurallar: **yalnız bir kez** await et, aynı anda iki kez await etme, tamamlanmadan `.Result` alma. Şüphedeysen `Task`. |
| `async void` neden kötü? [MÜLAKATTA SIK] | Çağıran bekleyemez, **istisnayı yakalayamaz** (süreç çökebilir), test edilemez. Yalnız olay işleyicilerinde (event handler). Diğer her yerde `async Task`. |
| Deadlock nasıl oluşur? [MÜLAKATTA SIK] | `SynchronizationContext` olan ortamda (WinForms/WPF UI, klasik ASP.NET) `.Result` / `.Wait()` ile bloklamak: devam (continuation) aynı thread'e dönmek ister, thread ise beklemede. Çözüm: **baştan sona async** ("async all the way"), bloklama yok. |
| ASP.NET Core'da bu deadlock olur mu? | ASP.NET Core'da `SynchronizationContext` **yok**, klasik deadlock olmaz; ama `.Result` yine de thread pool'u tüketir (**thread pool starvation**). Kullanma. |
| `ConfigureAwait(false)` ne zaman? [MÜLAKATTA SIK] | Devamın orijinal bağlama dönmesine gerek olmayan **kütüphane kodunda**. UI kodunda kullanma (UI thread'ine dönmek gerekir). ASP.NET Core uygulama kodunda etkisi yok denecek kadar az. |
| `Task.WhenAll` ile sırayla await farkı? | Bağımsız işler `WhenAll` ile **paralel beklenir** → toplam süre en uzun iş kadar. Sırayla await → süreler toplanır. İstisnalar: `await WhenAll` ilkini fırlatır, hepsi `task.Exception`'da. |
| CancellationToken neden? | Uzun işi iptal etmek; ASP.NET Core'da `HttpContext.RequestAborted` istemci ayrılınca iptal eder. Zinciri sonuna kadar geçir. |
| `lock` içinde await? | Derlenmez. Asenkron kilit için `SemaphoreSlim.WaitAsync`. .NET 9+ `System.Threading.Lock` tipi `lock` ile daha verimli çalışır. |
| Thread güvenli koleksiyon? | `ConcurrentDictionary`, `ConcurrentQueue`, `Channel<T>` (üretici–tüketici), basit sayaç için `Interlocked.Increment`. |

```csharp
// Kötü: UI veya eski ASP.NET'te deadlock, ASP.NET Core'da thread pool israfı
var veri = servis.GetirAsync().Result;
// İyi
var veri = await servis.GetirAsync(cancellationToken);
```

### Span, pattern matching, eşitlik

| Soru | Kısa cevap |
|---|---|
| `Span<T>` nedir? [ORTA] | Dizi, stack belleği (`stackalloc`) veya yönetilmeyen bellek üzerinde **kopyasız dilim** (slice). `ref struct`'tır: yalnız stack'te yaşar, sınıf alanı olamaz, `await` boyunca tutulamaz. Heap'e/async'e taşımak için `Memory<T>`. |
| Span ne kazandırır? | Alt string/dizi için yeni bellek ayırmadan parse (`ReadOnlySpan<char>`); daha az GC. C# 14 [YENİ]: `T[]`, `Span<T>`, `ReadOnlySpan<T>` arasında **örtük dönüşümler** (first-class span). |
| Pattern matching örnekleri? | `is int n`, `is null` / `is not null`, **switch expression** (`x switch { > 0 => "pozitif", _ => "diğer" }`), property pattern (`{ Durum: "Aktif" }`), relational/logical (C# 9: `>`, `and`, `or`, `not`), list pattern (C# 11: `[1, .., var son]`). |
| `is null` mı `== null` mı? | `is null` operatör aşırı yüklemesinden etkilenmez, her zaman gerçek null kontrolü. |
| `==` ile `Equals` farkı? [MÜLAKATTA SIK] | Referans tiplerinde `==` varsayılan olarak **referans eşitliği**, `Equals` sanal ve ezilebilir. `string`, `==`'yi değer karşılaştırmasına aşırı yükler. `record` ikisini de değer eşitliği yapar. Kesin referans kontrolü: `ReferenceEquals`. |
| GetHashCode sözleşmesi? [MÜLAKATTA SIK] | `Equals` true olan iki nesnenin hash'i **eşit olmalı** (tersi gerekmez). `Equals`'ı ezen `GetHashCode`'u da ezer (`HashCode.Combine`). Sözlük anahtarının hash'e giren alanı **değişmemeli**, yoksa nesne sözlükte "kaybolur". |
| Reflection ne zaman? | Çalışma zamanında tip/üye inceleme (serileştirme, DI, eklenti). Yavaş ve Native AOT/trimming ile sorunlu; mümkünse **source generator**. |

### Sürüm bilgisi

| Soru | Kısa cevap |
|---|---|
| Güncel C# ve .NET? [YENİ] | **C# 14** + **.NET 10** (Kasım 2025, **LTS**, Kasım 2028'e kadar destek). .NET 8 (LTS) ve .NET 9 (STS) desteği **Kasım 2026**'da bitiyor. |
| LTS ve STS farkı? | LTS en az 3 yıl, STS 2 yıl (24 ay) desteklenir; sürümler sırayla LTS/STS. |
| C# 14 ile gelenler? [YENİ] | Extension members (extension property, static extension), `field` anahtar kelimesi, null-conditional assignment, `nameof(List<>)`, Span örtük dönüşümleri, tipsiz lambda parametresinde `ref/out/in` gibi niteleyiciler, partial constructor/event, kullanıcı tanımlı bileşik atama operatörleri. |
| Son yıllardan hatırlanacaklar? | C# 9: record, init, top-level statements. C# 10: record struct, global using, file-scoped namespace. C# 11: required, raw string `"""`, list pattern, static abstract. C# 12: primary constructor, collection expression `[1, 2]`. C# 13: `params` koleksiyonlar, yeni `Lock`. |

### Kaynaklar

- [RESMÎ] [What's new in C# 14](https://learn.microsoft.com/dotnet/csharp/whats-new/csharp-14) — erişim 29 Eki 2026
- [RESMÎ] [.NET releases, patches, and support](https://learn.microsoft.com/dotnet/core/releases-and-support) — erişim 29 Eki 2026
- [RESMÎ] [Asynchronous programming with async and await](https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/)
- [RESMÎ] [Fundamentals of garbage collection](https://learn.microsoft.com/dotnet/standard/garbage-collection/fundamentals)
- [RESMÎ] [Implement a Dispose method](https://learn.microsoft.com/dotnet/standard/garbage-collection/implementing-dispose)
- [RESMÎ] [Memory<T> and Span<T> usage guidelines](https://learn.microsoft.com/dotnet/standard/memory-and-spans/memory-t-usage-guidelines)
- [RESMÎ] [Language Integrated Query (LINQ)](https://learn.microsoft.com/dotnet/csharp/linq/)
- [3. TARAF] [ConfigureAwait FAQ — .NET Blog (Stephen Toub)](https://devblogs.microsoft.com/dotnet/configureawait-faq/)


## 02 · OOP, SOLID, mimari ve desenler

*HTML: 02-oop-solid-desenler.html* — OOP'nin dört ayağı, SOLID'in her harfi tek satır + ihlal örneği, DRY/KISS/YAGNI, composition ve inheritance, katmanlı / clean / onion mimari, CQRS, repository + unit of work tartışması, mediator ve sık tasarım desenleri.

### OOP'nin dört ayağı

| Soru | Kısa cevap |
|---|---|
| Kapsülleme (encapsulation)? [MÜLAKATTA SIK] | Veriyi gizleyip yalnız kontrollü metot/property ile değiştirmek; nesne kendi tutarlılığından sorumlu. Örnek: `Bakiye`'yi public set yerine `ParaYatir()` ile değiştirmek. |
| Kalıtım (inheritance)? | Alt sınıfın üst sınıfın davranışını devralması ("is-a"). C#'ta sınıf için tekli kalıtım. |
| Çok biçimlilik (polymorphism)? | Aynı çağrının nesnenin gerçek tipine göre farklı davranması (`virtual`/`override`, arayüz). Derleme zamanı çok biçimliliği: overload. |
| Soyutlama (abstraction)? | Ayrıntıyı gizleyip "ne yaptığını" göstermek: arayüz, abstract class. |
| Overload ile override farkı? [MÜLAKATTA SIK] | Overload: aynı ad, **farklı parametre**, derleme zamanında seçilir. Override: alt sınıfta **aynı imza**, çalışma zamanında seçilir. |
| Composition mı inheritance mı? [MÜLAKATTA SIK] | "Composition over inheritance": davranışı **içeren nesnelerle** kur ("has-a"). Kalıtım sıkı bağlılık ve kırılgan taban sınıf sorunu getirir; gerçek "is-a" ve ortak davranış varsa kullan. Composition + arayüz + DI test etmeyi de kolaylaştırır. |
| Coupling ve cohesion? | Düşük bağlılık (coupling: sınıflar birbirini az bilir) + yüksek uyum (cohesion: sınıfın üyeleri tek amaca hizmet eder) hedeflenir. |

### SOLID

Derin sayfa: [C# / .NET · 04 · Prensipler](../../Programlama/CSharp-DotNet/04-mimari-ve-desenler/index.html#prensipler). Mülakatta "her harfi bir örnekle anlat" beklenir.

| İlke | Tek satır | İhlal örneği |
|---|---|---|
| **S** — Single Responsibility [MÜLAKATTA SIK] | Bir sınıfın **değişmek için tek nedeni** olmalı. | `SiparisServisi` hem sipariş kaydediyor hem PDF fatura üretiyor hem e-posta atıyor → üç ayrı değişim nedeni. |
| **O** — Open/Closed [MÜLAKATTA SIK] | Genişlemeye açık, değişikliğe kapalı: yeni davranış **yeni sınıf** ile eklenir. | Her yeni ödeme yöntemi için `switch (tur)` bloğuna `case` eklemek. Çözüm: `IOdemeYontemi` + strategy. |
| **L** — Liskov Substitution [MÜLAKATTA SIK] | Alt tip, üst tipin yerine konduğunda programın doğruluğu bozulmamalı. | `Kare : Dikdortgen` — genişliği değiştirince yüksekliği de değişir; `Dikdortgen` bekleyen kod şaşırır. Ya da alt sınıfta `NotImplementedException` fırlatmak. |
| **I** — Interface Segregation | İstemci kullanmadığı metotlara bağımlı olmamalı: küçük, odaklı arayüzler. | `IYazici` içinde `Yazdir`, `Tara`, `FaksGonder` — basit yazıcı `Tara`'yı boş bırakmak zorunda. |
| **D** — Dependency Inversion [MÜLAKATTA SIK] | Üst seviye modül alt seviyeye değil **soyutlamaya** bağımlı olmalı. | Servis içinde `new SqlSiparisDeposu()` — test edilemez, değiştirilemez. Çözüm: `ISiparisDeposu` kurucudan (DI). |

| Soru | Kısa cevap |
|---|---|
| Dependency Inversion ile Dependency Injection aynı mı? [TUZAK] | Hayır. **Inversion** bir ilke (soyutlamaya bağımlı ol), **Injection** onu uygulama tekniği (bağımlılığı dışarıdan ver), **IoC container** onu otomatikleştiren araç. |
| DRY? | Don't Repeat Yourself: **bilgi/kural** tek yerde. Yanlış yorum: benzer görünen her kodu birleştirmek → yanlış soyutlama. |
| KISS? | Keep It Simple: çalışan en basit çözüm. |
| YAGNI? | You Aren't Gonna Need It: bugün gerekmeyen genişlik noktasını yazma. |
| Bu ilkeler çelişirse? | Bağlama göre seç; "mükemmel mimari" değil, **değişim maliyetini** düşüren yapı. Mülakatta "duruma göre, şu ölçüte bakarım" demek olgunluk işaretidir. |

### Mimari yaklaşımlar

Derin sayfa: [04 · Katmanlı ve modüler mimariler](../../Programlama/CSharp-DotNet/04-mimari-ve-desenler/index.html#katmanli-mimariler), [CQRS](../../Programlama/CSharp-DotNet/04-mimari-ve-desenler/index.html#cqrs).

| Soru | Kısa cevap |
|---|---|
| Katmanlı (N-tier) mimari? | Presentation → Business → Data Access. Basit, tanıdık; ama iş katmanı veri katmanına bağımlı (bağımlılık aşağı akar). |
| Clean / Onion / Hexagonal farkı? [MÜLAKATTA SIK] | Üçü de aynı fikir: **bağımlılıklar içe** akar. Merkezde Domain (varlıklar, kurallar), etrafında Application (use case), dışta Infrastructure (EF, dosya, e-posta) ve API. Altyapı, çekirdekteki **arayüzleri uygular** (dependency inversion). Hexagonal'da "port & adapter" adları. |
| Clean Architecture her projeye mi? | Hayır. Küçük CRUD servisinde fazla katman maliyettir; karmaşık iş kuralı, uzun ömür ve büyük ekipte işe yarar. Alternatif: **vertical slice** (özellik başına klasör). |
| Vertical slice nedir? | Kodu katmana göre değil **özelliğe** (use case) göre bölmek: her istek kendi handler'ı, doğrulaması, veri erişimiyle bir arada. |
| CQRS nedir? [MÜLAKATTA SIK] | Command Query Responsibility Segregation: **yazma** (command, durumu değiştirir) ve **okuma** (query, yalnız okur) için ayrı modeller. Basit hâli aynı veritabanında ayrı sınıflar; ileri hâli ayrı okuma veritabanı (eventual consistency). |
| CQRS ne zaman gereksiz? | Basit CRUD'da. Karmaşıklık ekler; okuma/yazma yükü veya modeli çok farklıysa değer. |
| Event Sourcing? [İLERİ] | Durumu değil, **olayların** sırasını saklamak; durum olaylardan yeniden kurulur. Denetim izi güçlü; karmaşık. CQRS ile sık birlikte ama zorunlu değil. |
| DDD'den neler sorulur? [ORTA] | Entity (kimlikli), Value Object (değerle eşit, değişmez), Aggregate + Aggregate Root (tutarlılık sınırı), Domain Event, Bounded Context, Ubiquitous Language. Derin: [04 · DDD](../../Programlama/CSharp-DotNet/04-mimari-ve-desenler/index.html#ddd). |
| Anemic domain model? | İş kuralı olmayan, yalnız get/set'li varlıklar; kural servislerde dağınık. DDD'de anti-pattern sayılır. |

### Repository, Unit of Work, Mediator

| Soru | Kısa cevap |
|---|---|
| Repository deseni? | Veri erişimini koleksiyon benzeri bir arayüzün arkasına saklamak (`ISiparisDeposu.Getir(id)`). Amaç: domain'i veri teknolojisinden ayırmak, test kolaylığı. |
| Unit of Work? | Bir iş işlemindeki değişiklikleri izleyip **tek seferde** kaydetmek (tek transaction). |
| EF Core ile repository + UoW neden tartışmalı? [MÜLAKATTA SIK] | `DbContext` zaten **Unit of Work**, `DbSet<T>` zaten **repository**. Üstüne generic repository yazmak çoğu zaman `IQueryable`'ı kısıtlar veya sızdırır, ekstra kod getirir. Savunulan orta yol: **aggregate başına özel** repository (generic değil) veya doğrudan `DbContext`. "Duruma göre" + gerekçe beklenir. |
| Generic repository'nin sorunu? | `GetAll()` tüm tabloyu çeker, `IQueryable` dönerse soyutlama sızar; her varlığın ihtiyacı farklı. |
| Mediator deseni / MediatR? [MÜLAKATTA SIK] | Nesneler birbirini değil **aracıyı** çağırır: controller `Send(new SiparisOlustur(...))`, handler işi yapar. Artıları: ince controller, pipeline behavior (loglama, doğrulama, transaction). Eksi: dolaylılık, "go to definition" zorlaşır. MediatR'ın lisansı değişti ([ESKİDİ] "ücretsiz standart" bilgisi): [04 · Mediator ve lisans](../../Programlama/CSharp-DotNet/04-mimari-ve-desenler/index.html#mediator-ve-mediatr). |
| Result pattern? | Beklenen hatayı istisna yerine `Result<T>` (başarılı/başarısız + hata) olarak döndürmek. Derin: [10 · Sonuç ve hata](../../Programlama/CSharp-DotNet/10-kutuphaneler/index.html#sonuc-ve-hata). |
| Outbox pattern? | Veritabanı değişikliği ile yayınlanacak mesajı **aynı transaction'da** bir outbox tablosuna yazmak, ayrı bir işlemle kuyruğa göndermek → "kaydedildi ama mesaj gitmedi" sorunu çözülür. [04 · Dağıtık](04-dagitik-test-git.html#dagitik). |

### Tasarım desenleri

Derin sayfa: [04 · Gang of Four desenleri](../../Programlama/CSharp-DotNet/04-mimari-ve-desenler/index.html#gof-desenleri).

| Desen | Tek satır | Ne zaman / .NET örneği |
|---|---|---|
| **Singleton** [MÜLAKATTA SIK] | Tek örnek + global erişim. | Kendin yazma; DI'da `AddSingleton`. Elle gerekirse `Lazy<T>` ile thread-safe. Global durum test etmeyi zorlaştırır. |
| **Factory / Factory Method** [MÜLAKATTA SIK] | Nesne oluşturmayı ayrı bir metoda/sınıfa vermek. | Hangi alt tipin yaratılacağı çalışma zamanında belli oluyorsa. Örnek: `IHttpClientFactory`, `ILoggerFactory`. |
| **Abstract Factory** | Birbiriyle uyumlu nesne **aileleri** üretmek. | Tema/sağlayıcı ailesi (ör. farklı veritabanı sağlayıcıları için bağlantı + komut). |
| **Builder** | Karmaşık nesneyi adım adım kurmak. | `WebApplication.CreateBuilder`, `StringBuilder`, `UriBuilder`. |
| **Strategy** [MÜLAKATTA SIK] | Algoritmayı arayüz arkasında değiştirilebilir yapmak. | Ödeme yöntemi, indirim kuralı, kargo hesaplama; `switch` yerine. DI'da keyed services ile seçim. |
| **Decorator** [MÜLAKATTA SIK] | Nesneyi sarıp **davranış eklemek** (aynı arayüz). | Cache'li repository, loglama, retry. ASP.NET Core middleware ve `DelegatingHandler` benzer fikir. |
| **Observer** | Bir nesne değişince abonelere haber vermek. | C# `event`, `IObservable<T>`, domain event, SignalR. |
| **Adapter** | Uyumsuz bir arayüzü beklenen arayüze çevirmek. | Üçüncü taraf SMS/ödeme SDK'sını kendi `ISmsGonderici` arayüzüne uydurmak. |
| **Facade** | Karmaşık alt sistemi tek basit arayüzle sunmak. | `SiparisFacade.Tamamla()` içinde stok + ödeme + kargo. |
| **Proxy** | Gerçek nesnenin yerine geçip erişimi kontrol etmek. | EF Core lazy loading proxy, uzak çağrı istemcisi. |
| **Chain of Responsibility** | İsteği bir zincirde sırayla işleyicilere vermek. | ASP.NET Core **middleware pipeline**, MediatR pipeline behavior. |
| **Template Method** | Algoritma iskeleti üst sınıfta, adımlar alt sınıfta. | `BackgroundService.ExecuteAsync`. |

| Soru | Kısa cevap |
|---|---|
| Singleton bir anti-pattern mi? | Elle yazılan global singleton çoğu zaman evet (gizli bağımlılık, test zorluğu); DI container'ın yönettiği singleton ömrü sorun değil. |
| Strategy ile State farkı? | Strategy'yi **dışarıdan** seçersin; State'te nesne kendi durumuna göre davranışını **kendisi** değiştirir. |
| Decorator ile Proxy farkı? | Decorator davranış **ekler**; Proxy erişimi **kontrol eder** (gecikmeli yükleme, yetki, uzak çağrı). |
| En sık anti-pattern'ler? | God object, spaghetti code, magic number/string, copy-paste, anemic model, service locator, aşırı mühendislik. Derin: [04 · Anti-pattern'ler](../../Programlama/CSharp-DotNet/04-mimari-ve-desenler/index.html#anti-patternler). |

### Kaynaklar

- [RESMÎ] [Architectural principles — .NET architecture guides](https://learn.microsoft.com/dotnet/architecture/modern-web-apps-azure/architectural-principles)
- [RESMÎ] [Common web application architectures (Clean Architecture)](https://learn.microsoft.com/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures)
- [RESMÎ] [CQRS pattern — Azure Architecture Center](https://learn.microsoft.com/azure/architecture/patterns/cqrs)
- [RESMÎ] [Design the infrastructure persistence layer (Repository, Unit of Work)](https://learn.microsoft.com/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design)
- [RESMÎ] [Transactional Outbox pattern](https://learn.microsoft.com/azure/architecture/databases/guide/transactional-outbox-cosmos)


## 03 · ASP.NET Core, EF Core ve SQL özeti

*HTML: 03-aspnet-core-ef-core.html* — Middleware, DI yaşam süreleri ve captive dependency, filtreler, model binding, minimal API, auth, JWT, CORS, HTTP ve REST, idempotency, versioning, rate limiting, loglama, options pattern, health check, background service; EF Core tracking, N+1, yükleme türleri, migration, transaction, concurrency, raw SQL, Dapper; SQL'in 6 soruluk özeti.

### Pipeline, DI ve yapılandırma

Derin sayfa: [C# / .NET · 02 · DI](../../Programlama/CSharp-DotNet/02-platform-ve-web-api/index.html#dependency-injection), [Middleware](../../Programlama/CSharp-DotNet/02-platform-ve-web-api/index.html#middleware), [Configuration](../../Programlama/CSharp-DotNet/02-platform-ve-web-api/index.html#configuration).

| Soru | Kısa cevap |
|---|---|
| Middleware nedir? [MÜLAKATTA SIK] | İstek ve cevabın geçtiği **zincir halkası**; her halka işini yapıp `next()` ile sonrakine verir veya **kısa devre** yapar (cevabı kendi döner). Cevap zinciri ters sırayla geri döner. |
| `Use`, `Run`, `Map` farkı? | `Use`: sonrakine devredebilen middleware. `Run`: **terminal**, zinciri bitirir. `Map`/`MapWhen`: yola/koşula göre dal açar. |
| Middleware sırası neden önemli? [MÜLAKATTA SIK] | Kayıt sırası = çalışma sırası. Tipik: ExceptionHandler → HSTS → HttpsRedirection → Static files → Routing → **CORS → Authentication → Authorization** → özel middleware → endpoint'ler. `UseAuthorization`, `UseAuthentication`'dan önce olursa kullanıcı tanınmaz. |
| Kendi middleware'imi nasıl yazarım? | `InvokeAsync(HttpContext ctx, RequestDelegate next)` olan sınıf + `app.UseMiddleware<T>()`, ya da satır içi `app.Use(async (ctx, next) => { ...; await next(ctx); })`. Örnek: korelasyon kimliği, istek süresi loglama. |
| DI yaşam süreleri? [MÜLAKATTA SIK] | **Transient**: her istendiğinde yeni örnek. **Scoped**: HTTP isteği başına bir örnek (`DbContext` varsayılanı). **Singleton**: uygulama boyunca tek örnek, **thread-safe** olmalı. |
| Captive dependency nedir? [MÜLAKATTA SIK] | Uzun ömürlü servisin kısa ömürlüyü yakalaması: **singleton içine scoped** enjekte edilirse scoped servis fiilen singleton olur (ör. tek `DbContext` tüm isteklerde → thread hatası, bayat veri). Development ortamında **scope doğrulaması** bunu başlangıçta istisnayla yakalar. Çözüm: singleton'da `IServiceScopeFactory.CreateScope()`. |
| Transient'i singleton'a enjekte edersem? | Transient de singleton kadar yaşar (yalnız bir kez oluşturulur); durumsuzsa sorun yok, durumluysa hata. |
| Keyed services? | .NET 8+: aynı arayüzün birden çok uygulamasını anahtarla kaydet (`AddKeyedSingleton<IOdeme, Kart>("kart")`), `[FromKeyedServices("kart")]` ile al. Strategy deseni için. |
| Configuration kaynak sırası? [MÜLAKATTA SIK] | Varsayılan: `appsettings.json` → `appsettings.{Environment}.json` → **User Secrets** (yalnız Development) → **ortam değişkenleri** → komut satırı. **Sonraki öncekini ezer.** Sır asla `appsettings.json`'a/depoya yazılmaz. |
| Options pattern? [MÜLAKATTA SIK] | Ayar bölümünü tipli sınıfa bağla: `services.Configure<SmtpAyar>(config.GetSection("Smtp"))`. `IOptions<T>`: singleton, değişikliği görmez. `IOptionsSnapshot<T>`: scoped, istek başına yeniden okur. `IOptionsMonitor<T>`: singleton, değişiklik bildirimi. `ValidateDataAnnotations().ValidateOnStart()` ile açılışta doğrula. |
| Ortamlar (Environment)? | `ASPNETCORE_ENVIRONMENT` = Development / Staging / Production; `app.Environment.IsDevelopment()`. |
| Kestrel nedir? | ASP.NET Core'un yerleşik, platformlar arası web sunucusu. Önünde IIS, Nginx, YARP gibi **reverse proxy** olabilir (TLS, yük dengeleme). |
| `new HttpClient()` neden yapılmaz? [MÜLAKATTA SIK] | Her seferinde yeni nesne → **socket tükenmesi** (TIME_WAIT); tek static örnek → **DNS değişikliğini görmez**. Çözüm: `IHttpClientFactory` (named/typed client), dayanıklılık için `AddStandardResilienceHandler` (retry, timeout, circuit breaker). |

### Endpoint'ler: controller, minimal API, filtre, doğrulama

Derin sayfa: [02 · Web API](../../Programlama/CSharp-DotNet/02-platform-ve-web-api/index.html#web-api), [Filters](../../Programlama/CSharp-DotNet/02-platform-ve-web-api/index.html#filters), [Routing](../../Programlama/CSharp-DotNet/02-platform-ve-web-api/index.html#routing).

| Soru | Kısa cevap |
|---|---|
| Minimal API mi controller mı? [MÜLAKATTA SIK] | **Minimal API**: az tören, hızlı, küçük servis/mikroservis; `MapGet`, `MapGroup`, `TypedResults`. **Controller**: büyük API'de düzen, filtre ve konvansiyon zenginliği. İkisi aynı uygulamada birlikte olabilir; Microsoft yeni projelerde minimal API'yi öneriyor. |
| Routing türleri? | **Attribute routing** (`[Route("api/siparisler")]`, `[HttpGet("{id:int}")]`) API'lerde standart; **conventional** (`{controller}/{action}/{id?}`) MVC'de. `{id:int}` gibi **route constraint**. |
| Model binding kaynakları? | `[FromRoute]`, `[FromQuery]`, `[FromBody]` (tek bir parametre), `[FromHeader]`, `[FromForm]`, `[FromServices]`. `[ApiController]` karmaşık tipi varsayılan olarak body'den alır. |
| Doğrulama nasıl? [MÜLAKATTA SIK] | DataAnnotations (`[Required]`, `[Range]`) veya FluentValidation. `[ApiController]` geçersiz modelde otomatik **400 + ValidationProblemDetails** döner. **.NET 10** [YENİ]: minimal API'de `builder.Services.AddValidation()` ile yerleşik doğrulama; uç bazında `.DisableValidation()`. |
| Filtre türleri ve sırası? [MÜLAKATTA SIK] | MVC: **Authorization → Resource → (model binding) → Action → (action) → Exception → Result**. Kesişen işler (loglama, doğrulama, önbellek) için. Minimal API'de `IEndpointFilter` / `AddEndpointFilter`. |
| Filtre ile middleware farkı? | Middleware **her isteği** görür, MVC'den habersiz. Filtre **MVC/endpoint bağlamında**: hangi action, model, argümanlar. |
| Hata cevabı standardı? | **ProblemDetails** (RFC 9457): `type`, `title`, `status`, `detail`, `instance`. `AddProblemDetails()` + `UseExceptionHandler()`. Hata ayrıntısı (stack trace) üretimde dönülmez. |
| OpenAPI / Swagger? [YENİ] | .NET 9'dan beri şablonda Swashbuckle yok; yerleşik `Microsoft.AspNetCore.OpenApi` (`AddOpenApi`, `MapOpenApi`). **.NET 10**'da varsayılan **OpenAPI 3.1**. Arayüz için Swagger UI veya Scalar ayrıca eklenir. |

### Güvenlik: kimlik, yetki, JWT, CORS

Derin sayfa: [02 · Kimlik doğrulama ve yetkilendirme](../../Programlama/CSharp-DotNet/02-platform-ve-web-api/index.html#kimlik-ve-yetki).

| Soru | Kısa cevap |
|---|---|
| Authentication ile authorization farkı? [MÜLAKATTA SIK] | **Authentication** (kimlik doğrulama): *kimsin?* **Authorization** (yetkilendirme): *bunu yapmaya iznin var mı?* Önce kimlik, sonra yetki. |
| 401 ile 403 farkı? [MÜLAKATTA SIK] | **401 Unauthorized**: kimlik yok/geçersiz (adı yanıltıcı, aslında "unauthenticated"). **403 Forbidden**: kimlik belli ama **yetki yok**. |
| Role-based ve policy-based farkı? | Rol: `[Authorize(Roles = "Admin")]`. Policy: kural (`requirement` + `handler`), ör. "18 yaş üstü", "kaynağın sahibi". Karmaşık yetki için policy. |
| JWT yapısı? [MÜLAKATTA SIK] | `header.payload.signature`, **Base64Url** kodlu. Payload'da **claim**'ler: `sub`, `exp`, `iss`, `aud`, roller. **İmzalı, şifreli değil**: herkes okuyabilir, içine sır konmaz. Sunucu imzayı (HS256 paylaşılan anahtar / RS256 açık-özel anahtar), `exp`, `iss`, `aud`'u doğrular. |
| JWT nasıl iptal edilir? | Kendiliğinden edilemez (durumsuz). Çözüm: **kısa ömürlü access token** (5–15 dk) + **refresh token** (sunucuda saklanır, iptal edilebilir, döndürülür/rotation); gerekirse kara liste. |
| Token nerede saklanır? [ÇELİŞKİLİ] | Tarayıcıda `localStorage` XSS'e açık; **HttpOnly + Secure + SameSite cookie** XSS'e dayanıklı ama CSRF önlemi ister. SPA'lar için güncel öneri **BFF** (Backend for Frontend) deseni. Tek doğru cevap yok, artı/eksi sayılır. |
| Cookie ile JWT farkı? | Cookie: sunucu oturumu veya şifreli bilet, tarayıcı otomatik gönderir. JWT: istemci `Authorization: Bearer` başlığıyla gönderir; mobil ve servisler arası için uygun. **.NET 10**: API uçlarında cookie auth giriş sayfasına yönlendirmek yerine **401/403** döner [YENİ]. |
| OAuth 2.0 ile OpenID Connect farkı? | OAuth 2.0 **yetki devri** (access token), OIDC onun üstüne **kimlik katmanı** (ID token, kullanıcı bilgisi). "Google ile giriş" = OIDC. |
| CORS nedir? [MÜLAKATTA SIK] | Tarayıcının **farklı origin**'e (şema + alan + port) JavaScript isteğini engellemesi; sunucu `Access-Control-Allow-Origin` ile izin verir. Basit olmayan isteklerde önce **OPTIONS preflight**. CORS bir **sunucu güvenliği değildir**: Postman/curl'ü engellemez. `AllowAnyOrigin` + `AllowCredentials` birlikte kullanılamaz. |
| Parola nasıl saklanır? | Düz SHA-256 değil: **yavaş, tuzlu (salt)** algoritma — PBKDF2 (ASP.NET Core Identity `PasswordHasher`), bcrypt, Argon2. |
| OWASP'tan ne sorulur? | SQL injection (parametreli sorgu), XSS (çıktı kodlama), CSRF (antiforgery token, SameSite), kırık erişim kontrolü (IDOR: başkasının `id`'sini denemek), hassas veri ifşası, güvenlik yanlış yapılandırması. |

### HTTP ve REST

| Soru | Kısa cevap |
|---|---|
| REST ilkeleri? [MÜLAKATTA SIK] | İstemci–sunucu, **stateless** (her istek kendi bilgisini taşır), önbelleklenebilir, **tek tip arayüz** (kaynak + URI + HTTP fiili + temsil), katmanlı sistem; isteğe bağlı code-on-demand. Kaynak **isim**, çoğul: `GET /siparisler/42`, fiil URL'de değil HTTP metodunda. |
| HTTP fiilleri? [MÜLAKATTA SIK] | `GET` oku · `POST` oluştur / işlem · `PUT` **tamamen** değiştir (yoksa oluşturabilir) · `PATCH` **kısmen** değiştir · `DELETE` sil · `HEAD` yalnız başlık · `OPTIONS` izinler (CORS preflight). |
| Safe ve idempotent nedir? [MÜLAKATTA SIK] | **Safe**: sunucu durumunu değiştirmez (GET, HEAD, OPTIONS). **Idempotent**: aynı istek N kez = 1 kez etkisi (GET, PUT, DELETE, HEAD, OPTIONS). **POST idempotent değil**, PATCH garanti değil. |
| POST'u idempotent yapmak? [MÜLAKATTA SIK] | İstemci `Idempotency-Key` başlığı gönderir; sunucu anahtar + sonucu saklar, tekrar gelirse **aynı cevabı** döner, işlemi tekrarlamaz. Ödeme, sipariş, ağ zaman aşımında tekrar deneme için şart. |
| Durum kodları? [MÜLAKATTA SIK] | **200** OK · **201** Created (+ `Location`) · **204** No Content · **301/302** yönlendirme · **304** Not Modified · **400** Bad Request · **401** · **403** · **404** · **409** Conflict (eşzamanlılık, tekrar kayıt) · **422** Unprocessable (anlam hatası) · **429** Too Many Requests · **500** · **502** Bad Gateway · **503** Service Unavailable · **504** Gateway Timeout. |
| PUT ile PATCH farkı? | PUT kaynağın **tam temsilini** gönderir (eksik alan = boşalır); PATCH yalnız değişeni (JSON Patch veya JSON Merge Patch). |
| Sayfalama? | `?page=2&pageSize=20` (offset, basit ama derin sayfada yavaş) veya **cursor/keyset** (`?after=123`, büyük veride hızlı ve tutarlı). |
| API versioning? | URL (`/api/v1/...`, en yaygın), query (`?api-version=1.0`), başlık, media type. ASP.NET Core'da yerleşik değil, **Asp.Versioning** paketleri. Kırıcı değişiklikte yeni sürüm, eskiyi bir süre `Deprecated` işaretle. |
| Rate limiting? [ORTA] | .NET 7'den beri yerleşik: `AddRateLimiter` + `UseRateLimiter`; algoritmalar **fixed window, sliding window, token bucket, concurrency**; reddedilene **429** (+ `Retry-After`). Çok sunuculu yapıda dağıtık sınır için Redis veya API gateway. |
| Önbellek seçenekleri? | Response caching (HTTP başlıkları), **output caching** (.NET 7, sunucuda), `IMemoryCache`, `IDistributedCache` (Redis), **HybridCache** (.NET 9: bellek + dağıtık, cache stampede koruması). |

### Loglama, sağlık, arka plan işleri

| Soru | Kısa cevap |
|---|---|
| Yapılandırılmış loglama? [MÜLAKATTA SIK] | `logger.LogInformation("Sipariş {SiparisId} oluşturuldu", id)` — **mesaj şablonu**, string interpolation değil; alanlar ayrı aranabilir. Seviyeler: Trace, Debug, Information, Warning, Error, Critical. Serilog / OpenTelemetry ile merkezi toplama. Kişisel veri ve sır loglanmaz. |
| Neden `$"..."` ile loglanmaz? | Şablon kaybolur (aranamaz), log seviyesi kapalı olsa bile string oluşturulur. Yüksek performans için `[LoggerMessage]` source generator. |
| Health check? | `AddHealthChecks().AddNpgSql(...)` + `MapHealthChecks("/health")`. **Liveness** (süreç ayakta mı) ve **readiness** (bağımlılıklar hazır mı, trafik alabilir mi) ayrı uçlar; Kubernetes ve yük dengeleyici kullanır. |
| Arka plan işi? [MÜLAKATTA SIK] | `BackgroundService` (`IHostedService`) → `ExecuteAsync` içinde `stoppingToken` ile döngü. Singleton olduğu için scoped servis (DbContext) için **scope aç**. Kalıcılık, tekrar deneme ve zamanlama gerekiyorsa Hangfire / Quartz.NET; kuyruk tüketimi için mesajlaşma. |
| Gözlemlenebilirliğin üç ayağı? | **Log**, **metric**, **trace** (dağıtık izleme, korelasyon kimliği). .NET'te OpenTelemetry standardı. Derin: [07 · Gözlemlenebilirlik](../../Programlama/CSharp-DotNet/07-devops-ve-gozlemlenebilirlik/index.html#gozlemlenebilirlik). |

### EF Core

Derin sayfa: [03 · EF Core çekirdek](../../Programlama/CSharp-DotNet/03-veri-erisimi/index.html#ef-core-cekirdek), [Sorgulama ve performans](../../Programlama/CSharp-DotNet/03-veri-erisimi/index.html#ef-core-sorgulama), [Migration](../../Programlama/CSharp-DotNet/03-veri-erisimi/index.html#ef-core-migration), [Dapper](../../Programlama/CSharp-DotNet/03-veri-erisimi/index.html#dapper-ve-mikro-orm).

| Soru | Kısa cevap |
|---|---|
| DbContext ömrü? [MÜLAKATTA SIK] | **Scoped** (istek başına), **thread-safe değil**: aynı context'te paralel sorgu yok. Arka plan işi/Blazor için `IDbContextFactory`; yüksek yükte `AddDbContextPool`. |
| Change tracking nedir? | DbContext yüklediği varlıkların ilk hâlini tutar; `SaveChanges` farkları bulup `INSERT/UPDATE/DELETE` üretir. Durumlar: Added, Modified, Deleted, Unchanged, Detached. |
| Tracking ile AsNoTracking? [MÜLAKATTA SIK] | Yalnız okuma (liste, rapor) için **`AsNoTracking()`**: daha az bellek ve CPU. Güncelleyeceksen tracking. Aynı satır birden çok kez dönüyorsa `AsNoTrackingWithIdentityResolution`. |
| N+1 problemi nedir? [MÜLAKATTA SIK] | 1 sorgu ile ana liste (N sipariş), sonra **her biri için** ilişkili veriye ayrı sorgu → N+1 sorgu. Genelde **lazy loading** + döngüde navigation erişimi. Çözüm: `Include`/`ThenInclude` (eager), **projeksiyon** (`Select` ile yalnız gereken alanlar — çoğu zaman en iyisi), gerekirse `AsSplitQuery()`. Teşhis: SQL loglarını aç. |
| Eager, lazy, explicit loading? [MÜLAKATTA SIK] | **Eager**: `Include` ile aynı sorguda. **Lazy**: navigation'a ilk erişimde otomatik sorgu (`Microsoft.EntityFrameworkCore.Proxies`, `virtual` navigation) — N+1 riski. **Explicit**: `context.Entry(x).Collection(c => c.Kalemler).LoadAsync()` ile elle. |
| Cartesian explosion / split query? | Birden çok koleksiyonu `Include` etmek JOIN satırlarını çarpar. `AsSplitQuery()` her koleksiyonu ayrı sorguda çeker (tutarlılık riski var; EF 10 sıralamayı düzeltti). |
| Migration akışı? [MÜLAKATTA SIK] | `dotnet ef migrations add Ad` → kodla şema farkı; `dotnet ef database update` uygular. Üretimde öneri: `dotnet ef migrations script --idempotent` ile SQL betiği veya **migration bundle**; çok örnekli uygulamada açılışta `Migrate()` çağırmak yarış durumu yaratabilir. Geri alma: önceki migration'a `update`. |
| Transaction? [MÜLAKATTA SIK] | Tek `SaveChanges` zaten **tek transaction**. Birden çok `SaveChanges` veya ham SQL için `await using var tx = await db.Database.BeginTransactionAsync(); ... await tx.CommitAsync();`. Tekrar deneme stratejisi (execution strategy) varsa transaction onun içinde çalıştırılır. |
| Concurrency token? [MÜLAKATTA SIK] | **Optimistic concurrency**: `[Timestamp]` (SQL Server `rowversion`) veya `[ConcurrencyCheck]`; `UPDATE ... WHERE Id=@id AND Version=@v`, etkilenen satır 0 ise `DbUpdateConcurrencyException` → kullanıcıya 409 veya yeniden dene. Pessimistic: satırı kilitlemek (`SELECT ... FOR UPDATE` / `UPDLOCK`), nadir. |
| Raw SQL güvenli mi? [MÜLAKATTA SIK] | `FromSql($"... WHERE Id = {id}")` (FormattableString) ve `SqlQuery<T>` **parametreleştirir**, güvenli. `FromSqlRaw` + string birleştirme **SQL injection**'a açık; EF 10 bunun için analizör uyarısı verir [YENİ]. |
| Toplu güncelle/sil? | `ExecuteUpdateAsync` / `ExecuteDeleteAsync` (EF 7+): varlık yüklemeden tek SQL. Change tracker'ı güncellemez. EF 10'da `ExecuteUpdateAsync` normal lambda alır. |
| Global query filter? | `HasQueryFilter(x => !x.Silindi)` — soft delete, çok kiracılık. EF 10 [YENİ]: **adlandırılmış filtreler**, `IgnoreQueryFilters(["SoftDelete"])` ile yalnız birini kapatma. |
| EF Core mu Dapper mı? [MÜLAKATTA SIK] | **EF Core**: LINQ, change tracking, migration, ilişkiler; verimlilik. **Dapper**: elle SQL, ince eşleme, en yüksek kontrol ve hız; tracking ve migration yok. Sık cevap: yazma ve iş kuralı EF Core, ağır rapor/okuma sorguları Dapper veya ham SQL. |
| EF Core sorgu yavaşsa? | SQL'i logla, execution plan'e bak, indeks ekle, projeksiyon ve `AsNoTracking`, sayfalama, N+1 kontrolü, compiled query, gerekirse ham SQL. |
| EF Core 10 hakkında? [YENİ] | Kasım 2025, **LTS**, 10 Kasım 2028'e kadar destek; **.NET 10 gerektirir**. `LeftJoin/RightJoin`, complex type'ların JSON'a eşlenmesi, adlandırılmış query filter, SQL Server 2025 `vector` ve `json` tipleri. |

### SQL özeti

Ayrıntılı soru–cevaplar ayrı rehberde: **[SQL mülakat rehberi](../SQL-Mulakat/index.html)**. Buradakiler yalnız en sık 6 soru.

| Soru | Kısa cevap |
|---|---|
| JOIN türleri? [MÜLAKATTA SIK] | `INNER` (iki tarafta eşleşen), `LEFT` (soldaki hepsi + eşleşen, yoksa NULL), `RIGHT`, `FULL OUTER`, `CROSS` (kartezyen), self join. |
| WHERE ile HAVING farkı? [MÜLAKATTA SIK] | `WHERE` gruplamadan **önce** satırları süzer; `HAVING` `GROUP BY`'dan **sonra** grupları (toplama fonksiyonlarıyla) süzer. |
| Clustered ve non-clustered index? [MÜLAKATTA SIK] | Clustered: tablonun **fiziksel sırası**, tabloda bir tane (genelde PK). Non-clustered: ayrı yapı + satıra işaretçi, birden çok olabilir. İndeks okumayı hızlandırır, yazmayı yavaşlatır. |
| ACID ve isolation level? [MÜLAKATTA SIK] | Atomicity, Consistency, Isolation, Durability. Seviyeler: Read Uncommitted (dirty read) → **Read Committed** (çoğu motorun varsayılanı) → Repeatable Read → Serializable; SQL Server'da ayrıca Snapshot. |
| Normalizasyon? | Tekrarı ve güncelleme anomalisini azaltmak: 1NF (atomik değer), 2NF (kısmi bağımlılık yok), 3NF (geçişli bağımlılık yok). Rapor/okuma için bilinçli denormalizasyon olabilir. |
| SQL injection'dan korunma? | **Parametreli sorgu** (EF, Dapper parametreleri, `SqlParameter`); string birleştirme yok; en az yetkili DB kullanıcısı. |

### Kaynaklar

- [RESMÎ] [APIs overview (Minimal API önerisi)](https://learn.microsoft.com/aspnet/core/fundamentals/apis) — erişim 29 Eki 2026
- [RESMÎ] [Service lifetimes (dependency injection)](https://learn.microsoft.com/dotnet/core/extensions/dependency-injection/service-lifetimes) — erişim 29 Eki 2026
- [RESMÎ] [What's new in ASP.NET Core 10](https://learn.microsoft.com/aspnet/core/release-notes/aspnetcore-10.0) — erişim 29 Eki 2026
- [RESMÎ] [ASP.NET Core Middleware](https://learn.microsoft.com/aspnet/core/fundamentals/middleware/)
- [RESMÎ] [Options pattern in ASP.NET Core](https://learn.microsoft.com/aspnet/core/fundamentals/configuration/options)
- [RESMÎ] [Filters in ASP.NET Core](https://learn.microsoft.com/aspnet/core/mvc/controllers/filters)
- [RESMÎ] [Rate limiting middleware in ASP.NET Core](https://learn.microsoft.com/aspnet/core/performance/rate-limit)
- [RESMÎ] [Use IHttpClientFactory to implement resilient HTTP requests](https://learn.microsoft.com/dotnet/architecture/microservices/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests)
- [RESMÎ] [What's New in EF Core 10](https://learn.microsoft.com/ef/core/what-is-new/ef-core-10.0/whatsnew) — erişim 29 Eki 2026
- [RESMÎ] [Efficient querying (EF Core)](https://learn.microsoft.com/ef/core/performance/efficient-querying)
- [RESMÎ] [Handling concurrency conflicts (EF Core)](https://learn.microsoft.com/ef/core/saving/concurrency)
- [RESMÎ] [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110) · [RFC 9457 — Problem Details](https://www.rfc-editor.org/rfc/rfc9457)


## 04 · Dağıtık sistemler, test ve Git

*HTML: 04-dagitik-test-git.html* — Cache ve Redis, mesaj kuyruğu (RabbitMQ / Kafka), monolit ve mikroservis, eventual consistency, Docker, CI/CD ve bulut kavramları; birim/entegrasyon/e2e test, mock ve stub, xUnit, AAA, TDD; merge, rebase, cherry-pick, conflict ve dal stratejileri.

### Cache ve Redis

Derin sayfa: [C# / .NET · 03 · Redis](../../Programlama/CSharp-DotNet/03-veri-erisimi/index.html#redis), [Önbellekleme stratejileri](../../Programlama/CSharp-DotNet/03-veri-erisimi/index.html#onbellekleme).

| Soru | Kısa cevap |
|---|---|
| Redis nedir? [MÜLAKATTA SIK] | Bellekte çalışan **anahtar–değer** veri deposu; tipler: string, hash, list, set, sorted set, stream. Kullanım: dağıtık cache, oturum, sayaç, rate limit, dağıtık kilit, pub/sub, liderlik tablosu. |
| In-memory cache ile dağıtık cache farkı? [MÜLAKATTA SIK] | `IMemoryCache`: süreç içinde, çok hızlı ama **her sunucuda ayrı** ve yeniden başlatınca kaybolur. Redis (`IDistributedCache`): tüm örnekler **ortak** görür, ağ gecikmesi var. **HybridCache** (.NET 9) ikisini birleştirir. |
| Cache-aside nedir? | En yaygın desen: önce cache'e bak → yoksa DB'den oku → cache'e yaz (TTL ile). Yazmada DB'yi güncelle, cache anahtarını **sil** (invalidate). Diğerleri: write-through, write-behind. |
| Cache invalidation neden zor? | Veri değişince her kopyayı doğru zamanda güncellemek; bayat veri ile tutarlılık arasında denge. Pratik: kısa TTL + değişiklikte anahtar silme + olayla haber verme. |
| Cache stampede? | Popüler anahtar düşünce yüzlerce isteğin aynı anda DB'ye gitmesi. Çözüm: tek isteğin doldurması (kilit/`HybridCache`), TTL'e rastgele sapma (jitter), arka planda yenileme. |
| Redis kalıcı mı? | Seçimli: **RDB** (anlık görüntü) ve **AOF** (komut günlüğü). Birincil veri deposu olarak değil, genelde cache olarak düşünülür. |

### Mesaj kuyruğu

Derin sayfa: [05 · Temel kavramlar](../../Programlama/CSharp-DotNet/05-mesajlasma-ve-dagitik/index.html#temel-kavramlar), [RabbitMQ](../../Programlama/CSharp-DotNet/05-mesajlasma-ve-dagitik/index.html#rabbitmq), [MassTransit](../../Programlama/CSharp-DotNet/05-mesajlasma-ve-dagitik/index.html#masstransit).

| Soru | Kısa cevap |
|---|---|
| Neden mesaj kuyruğu? [MÜLAKATTA SIK] | Servisleri **gevşek bağlamak** (asenkron), yük tepelerini tamponlamak, yavaş işi (e-posta, PDF) istekten ayırmak, tüketici çökse bile mesajı kaybetmemek. |
| RabbitMQ kavramları? [MÜLAKATTA SIK] | Producer → **Exchange** → (binding + routing key) → **Queue** → Consumer. Exchange türleri: direct, topic, fanout, headers. **Ack** ile mesaj onaylanır; onaylanmazsa yeniden teslim. Başarısız mesajlar **dead-letter queue**'ya. |
| RabbitMQ ile Kafka farkı? [MÜLAKATTA SIK] | **RabbitMQ**: mesaj **aracısı** (broker), mesaj tüketilince kuyruktan çıkar, esnek yönlendirme, iş kuyruğu. **Kafka**: dağıtık, kalıcı **olay günlüğü** (log); mesajlar saklama süresince kalır, tüketiciler **offset** ile okur, **partition** ile ölçeklenir, yeniden oynatma (replay), çok yüksek hacim, olay akışı. |
| Teslim garantileri? | **At-most-once** (kaybolabilir), **at-least-once** (tekrar gelebilir — en yaygın), exactly-once (pratikte "at-least-once + idempotent tüketici"). |
| Idempotent consumer? [MÜLAKATTA SIK] | Aynı mesaj iki kez gelirse sonuç değişmemeli: mesaj kimliğini işlenmiş tablosunda tut, varsa atla; ya da işlemi doğası gereği idempotent yap (`UPSERT`). |
| Outbox ve inbox? | **Outbox**: DB değişikliği + mesajı aynı transaction'da kaydet, ayrı işlem yayınlar. **Inbox**: gelen mesaj kimliğini kaydedip tekrarı engelle. MassTransit ikisini de destekler. |
| Komut (command) ile olay (event) farkı? | Komut: tek alıcıya "şunu yap" (`SiparisOlustur`). Olay: olmuş bir şeyi duyurur, çok abone (`SiparisOlusturuldu`). İsimlendirme: komut emir kipi, olay geçmiş zaman. |

### Mimari: monolit, mikroservis, tutarlılık

Derin sayfa: [04 · Mikroservis kavramları](../../Programlama/CSharp-DotNet/04-mimari-ve-desenler/index.html#mikroservis), [05 · Dağıtık sistem teorisi](../../Programlama/CSharp-DotNet/05-mesajlasma-ve-dagitik/index.html#dagitik-sistem-teorisi), [Dayanıklılık kalıpları](../../Programlama/CSharp-DotNet/05-mesajlasma-ve-dagitik/index.html#dayaniklilik-kaliplari).

| Soru | Kısa cevap |
|---|---|
| Monolit mi mikroservis mi? [MÜLAKATTA SIK] | **Monolit**: tek dağıtım, basit geliştirme/test/işlem; büyüyünce dağıtım ve ölçekleme zorlaşır. **Mikroservis**: bağımsız dağıtım ve ölçekleme, ekip özerkliği; bedeli ağ hataları, dağıtık veri, gözlemlenebilirlik, operasyon. Olgun cevap: "**modüler monolit**le başla, gerçek ihtiyaç doğunca ayır." |
| Mikroservisler veritabanı paylaşır mı? | İlke: **servis başına veritabanı** (kendi verisinin sahibi). Paylaşılan DB gizli bağımlılık yaratır. |
| Servisler arası iletişim? | Senkron: HTTP/REST, **gRPC** (Protobuf, HTTP/2, hızlı, iç servisler). Asenkron: mesaj kuyruğu/olay. Çok senkron zincir = dağıtık monolit. |
| CAP teoremi? | Ağ bölünmesi (**P**artition) olduğunda **C**onsistency (herkes aynı veriyi görür) ile **A**vailability (her istek cevap alır) arasında seçim yapılır. |
| Eventual consistency? [MÜLAKATTA SIK] | Veri tüm kopyalarda **hemen değil ama sonunda** tutarlı olur. Mikroservis + olaylarla doğal sonuç; arayüzde "işleminiz alındı" gibi tasarım ister. |
| Dağıtık transaction nasıl? [ORTA] | 2PC (iki aşamalı commit) ölçeklenmez; yerine **Saga**: her adım yerel transaction + başarısızlıkta **telafi işlemi** (compensation). Choreography (olaylarla) veya orchestration (yönetici servis). |
| Dayanıklılık kalıpları? | **Retry** (üstel geri çekilme + jitter), **timeout**, **circuit breaker** (sürekli hatada çağrıyı kes), bulkhead, fallback. .NET'te Polly / `Microsoft.Extensions.Http.Resilience`. |
| API Gateway? | Tek giriş noktası: yönlendirme, kimlik doğrulama, rate limit, toplama. .NET'te YARP, Ocelot; bulutta yönetilen gateway'ler. |
| Yatay ve dikey ölçekleme? | Dikey: daha güçlü makine (sınırlı). Yatay: daha çok örnek + yük dengeleyici; uygulama **durumsuz** olmalı (oturum Redis'te). |

### Docker, CI/CD, bulut

Derin sayfa: [07 · Docker](../../Programlama/CSharp-DotNet/07-devops-ve-gozlemlenebilirlik/index.html#docker), [GitHub Actions](../../Programlama/CSharp-DotNet/07-devops-ve-gozlemlenebilirlik/index.html#github-actions), [Bulut ve IaC](../../Programlama/CSharp-DotNet/07-devops-ve-gozlemlenebilirlik/index.html#bulut-ve-iac), [09 · Bulut yerel](../../Programlama/CSharp-DotNet/09-aspire-bulut-modern/index.html#bulut-yerel).

| Soru | Kısa cevap |
|---|---|
| Container ile sanal makine farkı? [MÜLAKATTA SIK] | Container **işletim sistemi çekirdeğini paylaşır**, yalnız uygulama + bağımlılıkları paketler: hafif, saniyede açılır. VM tam işletim sistemi taşır: ağır, daha güçlü yalıtım. |
| Image ile container farkı? | Image: salt okunur şablon (katmanlı). Container: image'ın **çalışan örneği**. |
| Multi-stage build? [MÜLAKATTA SIK] | Dockerfile'da `sdk` image'ında derle, sonucu küçük `aspnet` (runtime) image'ına kopyala → küçük ve güvenli son image. .NET SDK `dotnet publish /t:PublishContainer` ile Dockerfile'sız da image üretebilir. |
| Docker Compose? | Birden çok container'ı (API + PostgreSQL + Redis) tek YAML'la birlikte çalıştırmak; yerel geliştirme için. .NET'te alternatif: **Aspire**. |
| Kubernetes'ten ne sorulur? [ORTA] | Pod (en küçük birim), Deployment (istenen örnek sayısı, güncelleme), Service (sabit ağ adresi), Ingress, ConfigMap/Secret, liveness/readiness probe, HPA (otomatik ölçekleme). |
| CI ile CD farkı? [MÜLAKATTA SIK] | **CI** (Continuous Integration): her push'ta derle + test et, ana dalı her an sağlam tut. **CD**: Continuous **Delivery** (her an yayınlanabilir, onayla canlıya) / Continuous **Deployment** (otomatik canlıya). |
| Tipik pipeline? | restore → build → test → (analiz, güvenlik taraması) → publish / image → staging'e dağıt → onay → production. |
| Dağıtım stratejileri? | Rolling (sırayla), **blue-green** (iki ortam, trafiği çevir), **canary** (küçük yüzdeye aç), feature flag. |
| Bulut temel kavramları? | IaaS (VM), **PaaS** (App Service, yönetilen DB), **SaaS**; serverless (Azure Functions, AWS Lambda); bölge / erişilebilirlik bölgesi; yönetilen servisler; **IaC** (Bicep, Terraform); sır yönetimi (Key Vault). |
| Sırlar nerede tutulur? | Geliştirmede User Secrets, sunucuda ortam değişkeni veya **Key Vault / Secrets Manager**; CI'da şifreli sır değişkenleri. Depoya asla. |

### Test

Derin sayfa: [06 · Test türleri](../../Programlama/CSharp-DotNet/06-test-ve-kalite/index.html#test-turleri), [Mock kavramı](../../Programlama/CSharp-DotNet/06-test-ve-kalite/index.html#mock-kavrami), [Entegrasyon testi](../../Programlama/CSharp-DotNet/06-test-ve-kalite/index.html#entegrasyon-testi), [TDD](../../Programlama/CSharp-DotNet/06-test-ve-kalite/index.html#tdd-bdd).

| Soru | Kısa cevap |
|---|---|
| Unit, integration, e2e farkı? [MÜLAKATTA SIK] | **Unit**: tek sınıf/metot, bağımlılıklar sahte, milisaniye. **Integration**: gerçek bileşenler birlikte (API + DB), `WebApplicationFactory`, Testcontainers. **E2E**: kullanıcı gözünden tüm sistem (Playwright), yavaş ve kırılgan. **Test piramidi**: çok unit, orta integration, az e2e. |
| Mock ile stub farkı? [MÜLAKATTA SIK] | **Stub**: sabit cevap döner, durumu test edersin ("şu girdide şu sonuç"). **Mock**: etkileşimi **doğrularsın** ("`Gonder` bir kez çağrıldı mı?"). Diğer test double'lar: fake (çalışan basit uygulama, in-memory repo), spy, dummy. |
| Moq / NSubstitute? | Sahte nesne kütüphaneleri: `mock.Setup(x => x.Getir(1)).ReturnsAsync(urun)`, `mock.Verify(x => x.Kaydet(It.IsAny<Urun>()), Times.Once)`. Yalnız **arayüz/virtual** üyeler sahtelenebilir → DI + arayüz test edilebilirliği sağlar. |
| xUnit temel? [MÜLAKATTA SIK] | `[Fact]` parametresiz test, `[Theory]` + `[InlineData]` / `[MemberData]` parametreli. Her test için **yeni sınıf örneği** (kurucu = setup, `IDisposable` = teardown). Paylaşılan kurulum: `IClassFixture<T>`, `ICollectionFixture<T>`. Güncel sürüm **xUnit v3**. |
| AAA nedir? [MÜLAKATTA SIK] | **Arrange** (hazırla) – **Act** (çalıştır) – **Assert** (doğrula). Test başına tek davranış; ad: `Metot_Durum_Beklenen`. |
| TDD döngüsü? [MÜLAKATTA SIK] | **Red** (başarısız test yaz) → **Green** (geçiren en basit kod) → **Refactor** (temizle, testler yeşil kalsın). Getirisi: test edilebilir tasarım, güvenli refactor. |
| BDD? | Davranışı iş dilinde tanımlamak: Given–When–Then (Reqnroll/SpecFlow). |
| Neyi test etmem? | Framework'ün kendisini, basit get/set'i, private metotları (public davranış üzerinden test et). |
| Kod kapsamı (coverage) %100 olmalı mı? | Hayır; kapsam kalite göstergesi değil. Kritik iş kuralları ve hata yolları kapsanmalı. |
| EF Core'u nasıl test ederim? | In-memory sağlayıcı gerçek DB davranışını taklit etmez (transaction, SQL çevirisi). Öneri: **Testcontainers** ile gerçek PostgreSQL/SQL Server veya SQLite in-memory (sınırlı). |
| `DateTime.Now` içeren kodu test etmek? | Zamanı soyutla: .NET 8+ `TimeProvider` (testte `FakeTimeProvider`). |

### Git

Derin sayfa: [07 · Git ileri seviye](../../Programlama/CSharp-DotNet/07-devops-ve-gozlemlenebilirlik/index.html#git-ileri-seviye).

| Soru | Kısa cevap |
|---|---|
| merge ile rebase farkı? [MÜLAKATTA SIK] | **merge**: iki dalı birleştiren yeni bir **merge commit**; geçmiş olduğu gibi kalır (dallı). **rebase**: dalın commit'lerini hedefin ucuna **yeniden yazar**; doğrusal geçmiş, commit kimlikleri değişir. |
| Rebase'in altın kuralı? [TUZAK] | **Paylaşılmış (push edilmiş, başkasının kullandığı) dalı rebase etme**; geçmişi değişir, ekip arkadaşlarında çakışma olur. Kendi yerel dalını temizlemek için kullan. |
| Squash merge? | Daldaki tüm commit'leri tek commit olarak ana dala almak; temiz geçmiş, ayrıntı kaybı. |
| cherry-pick? | Başka daldaki **tek bir commit'i** mevcut dala kopyalamak (yeni kimlikle). Örnek: ana daldaki hotfix'i release dalına almak. |
| Conflict nasıl çözülür? [MÜLAKATTA SIK] | Aynı satır iki tarafta değişmişse Git durur, `<<<<<<<`, `=======`, `>>>>>>>` işaretleri koyar. Dosyayı düzenle, işaretleri kaldır, `git add`, `git commit` (rebase'de `git rebase --continue`). Vazgeç: `--abort`. Sonra derle + test. |
| `reset`, `revert`, `restore` farkı? | `revert`: geri alan **yeni commit** (paylaşılmış dalda güvenli). `reset`: dal ucunu geri taşır (`--soft` değişiklikler sahnede, `--mixed` çalışma alanında, `--hard` siler). `restore`: dosyayı geri getirir. |
| fetch ile pull farkı? | `fetch` uzak değişiklikleri indirir, birleştirmez; `pull` = fetch + merge (veya `--rebase`). |
| `stash`? | Yarım değişikliği geçici kenara koymak: `git stash`, sonra `git stash pop`. |
| Branching stratejileri? [MÜLAKATTA SIK] | **Git Flow**: `main` + `develop` + feature/release/hotfix dalları; planlı sürümler, ağır. **GitHub Flow**: `main` + kısa ömürlü feature dalı + PR; sürekli dağıtım. **Trunk-based**: herkes çok kısa dallarla (≤1–2 gün) sık sık `main`'e birleştirir, yarım işler feature flag arkasında; CI/CD ile en uyumlusu. |
| İyi commit mesajı? | Kısa özet satırı (≈50 karakter, emir kipi) + gerekirse neden açıklaması; tek mantıksal değişiklik. Conventional Commits (`feat:`, `fix:`) yaygın. |
| Yanlışlıkla sır commit ettim? | Sırrı **hemen iptal et / değiştir** (geçmişte kalır); sonra geçmişten temizle (`git filter-repo`) ve push koruması / gizli tarama aç. |

### Kaynaklar

- [RESMÎ] [Caching in .NET / HybridCache](https://learn.microsoft.com/aspnet/core/performance/caching/hybrid)
- [RESMÎ] [Distributed caching in ASP.NET Core](https://learn.microsoft.com/aspnet/core/performance/caching/distributed)
- [RESMÎ] [Saga distributed transactions pattern](https://learn.microsoft.com/azure/architecture/reference-architectures/saga/saga)
- [RESMÎ] [Containerize a .NET app with dotnet publish](https://learn.microsoft.com/dotnet/core/containers/sdk-publish)
- [RESMÎ] [Unit testing best practices for .NET](https://learn.microsoft.com/dotnet/core/testing/unit-testing-best-practices)
- [RESMÎ] [Integration tests in ASP.NET Core](https://learn.microsoft.com/aspnet/core/test/integration-tests)
- [RESMÎ] [RabbitMQ tutorials](https://www.rabbitmq.com/tutorials) · [Apache Kafka introduction](https://kafka.apache.org/intro)
- [RESMÎ] [Pro Git — Rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)
- [3. TARAF] [Trunk-based development](https://trunkbaseddevelopment.com/)


## 05 · Veri yapıları, algoritma ve sistem tasarımı

*HTML: 05-algoritma-sistem-tasarimi.html* — Big-O tablosu, .NET koleksiyonlarının karmaşıklıkları, sık sorulan 10 kodlama sorusunun kısa C# çözümü ve "URL kısaltıcı tasarla" tipi bir soruya adım adım cevap iskeleti.

### Big-O

Big-O, girdi büyüdükçe çalışma süresinin (veya belleğin) **en kötü durumda nasıl büyüdüğünü** gösterir; sabitler atılır.

| Karmaşıklık | Ad | Örnek |
|---|---|---|
| O(1) | Sabit | Dizide indeksle erişim, `Dictionary` araması (ortalama) |
| O(log n) | Logaritmik | İkili arama, dengeli ağaç (`SortedDictionary`) |
| O(n) | Doğrusal | Tek döngü, `List.Contains` |
| O(n log n) | Doğrusal-logaritmik | İyi sıralama algoritmaları (`Array.Sort`, `OrderBy`) |
| O(n²) | Karesel | İç içe iki döngü, kabarcık sıralama |
| O(2ⁿ) | Üstel | Önbelleksiz özyinelemeli Fibonacci, tüm alt kümeler |
| O(n!) | Faktöriyel | Tüm permütasyonlar |

| Soru | Kısa cevap |
|---|---|
| Zaman ve alan karmaşıklığı? | Zaman: adım sayısının büyümesi. Alan: **ek** belleğin büyümesi. Çoğu iyileştirme alan karşılığı zaman kazandırır (ör. `HashSet` ile O(n²) → O(n)). |
| Amortized O(1) ne demek? | `List.Add` çoğu zaman O(1); kapasite dolunca dizi iki katına kopyalanır (O(n)), ama **ortalama** O(1). |
| `Array.Sort` hangi algoritma? | .NET **introsort** kullanır (quicksort + heapsort + insertion sort), O(n log n), kararsız. `OrderBy` (LINQ) **kararlı**. |

### .NET koleksiyonları

| Koleksiyon | Ekleme | Silme | Arama / erişim | Not |
|---|---|---|---|---|
| `T[]` (dizi) | — | — | İndeks O(1), değer O(n) | Sabit boyut |
| `List<T>` | Sona O(1)*, araya O(n) | O(n) | İndeks O(1), `Contains` O(n) | *amortized; varsayılan seçim |
| `Dictionary<K,V>` | O(1)* | O(1)* | Anahtar O(1)* | *ortalama, en kötü O(n); sıra garanti değil |
| `HashSet<T>` | O(1)* | O(1)* | `Contains` O(1)* | Benzersizlik, küme işlemleri |
| `SortedDictionary<K,V>` | O(log n) | O(log n) | O(log n) | Kırmızı-siyah ağaç, sıralı |
| `Queue<T>` | `Enqueue` O(1)* | `Dequeue` O(1) | `Peek` O(1) | FIFO; BFS |
| `Stack<T>` | `Push` O(1)* | `Pop` O(1) | `Peek` O(1) | LIFO; parantez, geri al, DFS |
| `LinkedList<T>` | Baş/son O(1) | Düğüm verilirse O(1) | O(n) | Nadiren gerekir |
| `PriorityQueue<E,P>` | O(log n) | `Dequeue` O(log n) | `Peek` O(1) | .NET 6+; en küçük öncelik önce |

| Soru | Kısa cevap |
|---|---|
| Dictionary nasıl O(1)? [MÜLAKATTA SIK] | Anahtarın `GetHashCode()`'u ile **kova (bucket)** seçilir, çakışmada `Equals` ile karşılaştırılır. Kötü hash (hep aynı değer) → O(n). |
| Array mi List mi? | Boyut sabit ve performans kritikse dizi; diğer her durumda `List<T>`. |
| Thread-safe sözlük? | `ConcurrentDictionary<K,V>`; okuma ağırlıklı, değişmeyen veri için `FrozenDictionary` (.NET 8). |

### Sık sorulan 10 kodlama sorusu

Genel taktik: önce kaba çözümü söyle, sonra **Dictionary/HashSet** veya **iki işaretçi** ile iyileştir; karmaşıklığı belirt. Ayrıntılı taktikler: [İş arama § 6.2](../Issizlik/07-is-arama.html#mulakat) ve [online test](index.html#online-test).

#### 1. İki toplam (Two Sum) [MÜLAKATTA SIK]

Dizide toplamı hedefe eşit iki elemanın indeksleri. Kaba: iç içe döngü O(n²). İyi: gördüklerini sözlükte tut, O(n) zaman, O(n) alan.

```csharp
static (int, int)? IkiToplam(int[] dizi, int hedef)
{
    var gorulen = new Dictionary<int, int>();           // değer -> indeks
    for (int i = 0; i < dizi.Length; i++)
    {
        if (gorulen.TryGetValue(hedef - dizi[i], out int j)) return (j, i);
        gorulen[dizi[i]] = i;
    }
    return null;
}
```

#### 2. Palindrom [MÜLAKATTA SIK]

İki işaretçi baştan ve sondan; harf/rakam olmayanları atla, büyük-küçük harf yok say. O(n) zaman, O(1) alan.

```csharp
static bool PalindromMu(string s)
{
    int i = 0, j = s.Length - 1;
    while (i < j)
    {
        if (!char.IsLetterOrDigit(s[i])) { i++; continue; }
        if (!char.IsLetterOrDigit(s[j])) { j--; continue; }
        if (char.ToLowerInvariant(s[i]) != char.ToLowerInvariant(s[j])) return false;
        i++; j--;
    }
    return true;
}
```

#### 3. Anagram [MÜLAKATTA SIK]

Aynı harflerden mi oluşuyor? Sıralayıp karşılaştırmak O(n log n); harf sayacı O(n).

```csharp
static bool AnagramMi(string a, string b)
{
    if (a.Length != b.Length) return false;
    var sayac = new Dictionary<char, int>();
    foreach (var c in a) sayac[c] = sayac.GetValueOrDefault(c) + 1;
    foreach (var c in b)
    {
        if (!sayac.TryGetValue(c, out int n) || n == 0) return false;
        sayac[c] = n - 1;
    }
    return true;
}
```

#### 4. String ters çevirme

`char[]` + `Array.Reverse` veya iki işaretçiyle yer değiştirme, O(n). Ek soru: emoji ve birleşik karakterlerde `char` bazlı ters çevirme bozar → `StringInfo` ile metin öğesi (text element) bazlı çevir.

```csharp
static string TersCevir(string s)
{
    var dizi = s.ToCharArray();
    Array.Reverse(dizi);
    return new string(dizi);
}
```

#### 5. FizzBuzz

3'e bölünene "Fizz", 5'e "Buzz", ikisine "FizzBuzz". Tuzak: önce 15 kontrolü.

```csharp
for (int i = 1; i <= 100; i++)
    Console.WriteLine(i % 15 == 0 ? "FizzBuzz" : i % 3 == 0 ? "Fizz" : i % 5 == 0 ? "Buzz" : i.ToString());
```

#### 6. Tekrar eden eleman [MÜLAKATTA SIK]

İlk tekrar edeni bul: `HashSet.Add` false dönerse tekrar. O(n). Tümü için LINQ: `dizi.GroupBy(x => x).Where(g => g.Count() > 1).Select(g => g.Key)`.

```csharp
static int? IlkTekrar(int[] dizi)
{
    var kume = new HashSet<int>();
    foreach (var x in dizi)
        if (!kume.Add(x)) return x;
    return null;
}
```

#### 7. En uzun alt dizi

İki klasik yorum var; soruyu netleştir. **(a)** Tekrarsız karakterli en uzun alt string — **kayan pencere** (sliding window), O(n):

```csharp
static int EnUzunTekrarsiz(string s)
{
    var sonGorulen = new Dictionary<char, int>();
    int baslangic = 0, enUzun = 0;
    for (int i = 0; i < s.Length; i++)
    {
        if (sonGorulen.TryGetValue(s[i], out int j) && j >= baslangic) baslangic = j + 1;
        sonGorulen[s[i]] = i;
        enUzun = Math.Max(enUzun, i - baslangic + 1);
    }
    return enUzun;
}
```

**(b)** Toplamı en büyük ardışık alt dizi — **Kadane**, O(n):

```csharp
static int EnBuyukAltToplam(int[] a)
{
    int simdiki = a[0], enIyi = a[0];
    for (int i = 1; i < a.Length; i++)
    {
        simdiki = Math.Max(a[i], simdiki + a[i]);
        enIyi = Math.Max(enIyi, simdiki);
    }
    return enIyi;
}
```

#### 8. Parantez dengesi [MÜLAKATTA SIK]

Açanı yığına koy, kapatanda yığının tepesiyle eşleştir; sonda yığın boş olmalı. O(n).

```csharp
static bool DengeliMi(string s)
{
    var esi = new Dictionary<char, char> { [')'] = '(', [']'] = '[', ['}'] = '{' };
    var yigin = new Stack<char>();
    foreach (var c in s)
    {
        if (c is '(' or '[' or '{') yigin.Push(c);
        else if (esi.TryGetValue(c, out var acan))
            if (yigin.Count == 0 || yigin.Pop() != acan) return false;
    }
    return yigin.Count == 0;
}
```

#### 9. İkili arama (Binary Search) [MÜLAKATTA SIK]

**Sıralı** dizide her adımda aralığı yarıya indir, O(log n). Tuzak: `(lo + hi) / 2` taşabilir → `lo + (hi - lo) / 2`. Hazırı: `Array.BinarySearch`, `List<T>.BinarySearch`.

```csharp
static int IkiliArama(int[] a, int hedef)
{
    int lo = 0, hi = a.Length - 1;
    while (lo <= hi)
    {
        int orta = lo + (hi - lo) / 2;
        if (a[orta] == hedef) return orta;
        if (a[orta] < hedef) lo = orta + 1; else hi = orta - 1;
    }
    return -1;
}
```

#### 10. Fibonacci

Saf özyineleme O(2ⁿ) — aynı değeri tekrar tekrar hesaplar. Döngü O(n) zaman O(1) alan; memoization da O(n). Büyük n'de `long` taşar → `BigInteger`.

```csharp
static long Fib(int n)
{
    if (n < 2) return n;
    long a = 0, b = 1;
    for (int i = 2; i <= n; i++) (a, b) = (b, a + b);
    return b;
}
```

> **Sonraki adım**
> Bunlar rahatsa sırada: iki işaretçi ile sıralı dizide iki toplam, BFS/DFS (ağaç ve graf gezme), bağlı listeyi ters çevirme, iki sıralı diziyi birleştirme, `PriorityQueue` ile en büyük k eleman. Platform: LeetCode "Top Interview" listeleri, HackerRank, Exercism (C# yolu).

### Sistem tasarımı iskeleti

Kıdeme göre ağırlığı değişir (junior'da nadir, senior'da belirleyici) — [İş arama § 6.3](../Issizlik/07-is-arama.html#mulakat). Beklenen şey mükemmel mimari değil, **sırayla düşünmek** ve kararları **gerekçelendirmek**.

| Adım | Ne yapılır | Süre (45 dk'lık mülakat) |
|---|---|---|
| **1. Gereksinimler** | İşlevsel (ne yapacak) ve işlevsel olmayan (ölçek, gecikme, erişilebilirlik, tutarlılık) gereksinimleri **sor**, kapsamı daralt. | 5 dk |
| **2. Kapasite tahmini** | Günlük kullanıcı, okuma/yazma oranı, saniyedeki istek (QPS), depolama. Kaba hesap yeter. | 5 dk |
| **3. API** | Ana uçlar, girdi/çıktı, durum kodları. | 5 dk |
| **4. Veri modeli** | Tablolar/anahtarlar, SQL mi NoSQL mi ve neden. | 5 dk |
| **5. Üst düzey tasarım** | Kutular: istemci → yük dengeleyici → API → cache → DB, kuyruk. | 10 dk |
| **6. Ölçekleme ve darboğaz** | Cache, replika, sharding, kuyruk, CDN, rate limit; tek hata noktası; izleme. | 10 dk |
| **7. Özet** | Kararlar ve takaslar (trade-off), "zaman olsa şunu eklerdim". | 5 dk |

#### Örnek: URL kısaltıcı

**1. Gereksinimler.** İşlevsel: uzun URL → kısa kod; kısa kod → yönlendirme; isteğe bağlı özel takma ad, son kullanma, tıklama istatistiği. İşlevsel olmayan: yönlendirme hızlı (düşük gecikme), yüksek erişilebilirlik, kodlar tahmin edilmesi zor, **okuma ağır** (okuma ≫ yazma).

**2. Kapasite (örnek rakamlar).** Ayda 100 milyon yeni URL → ≈ 40 yazma/sn. Okuma:yazma 100:1 → ≈ 4.000 okuma/sn (tepe için ×2–3). 5 yılda 6 milyar kayıt × ≈ 500 bayt ≈ 3 TB.

**3. API.**

```text
POST /api/urls        { "url": "https://...", "alias": null, "expiresAt": null }
                      -> 201 Created { "code": "aZ3kP9q", "shortUrl": "https://kisa.example/aZ3kP9q" }
GET  /{code}          -> 302 Found, Location: https://...   (yoksa 404, süresi geçtiyse 410)
GET  /api/urls/{code}/stats -> 200 { "clicks": 1234, ... }
```

**4. Veri modeli.** `Urls(Code PK, LongUrl, CreatedAt, ExpiresAt, OwnerId)`; istatistik ayrı tabloda veya olay akışında. Erişim deseni anahtar → değer olduğu için **anahtar-değer / NoSQL** (DynamoDB, Cassandra) veya indeksli **ilişkisel** DB (PostgreSQL) — ikisi de savunulabilir; gerekçe: basit sorgu, büyük hacim, yatay ölçek.

**5. Kod üretimi.** (a) Benzersiz sayaç/ID → **Base62** (`[a-zA-Z0-9]`): 7 karakter = 62⁷ ≈ 3,5 trilyon kod. Sayaç tahmin edilebilir → karıştırma veya aralık tahsisi (her sunucuya ID bloğu). (b) URL'nin hash'i (ör. SHA-256) ilk 7 karakter → **çakışma** kontrolü gerekir. (c) Rastgele kod + benzersizlik kısıtı.

**6. Ölçekleme.** Okuma ağır → **Redis cache** (popüler kodlar, LRU), DB **okuma replikaları**, CDN/edge'de yönlendirme. Veri büyüyünce koda göre **sharding**. Tıklama istatistiği yönlendirmeyi yavaşlatmasın → olayı **kuyruğa** at, asenkron say. Kötüye kullanım için **rate limiting** ve zararlı URL taraması. Durumsuz API örnekleri yük dengeleyici arkasında yatay ölçeklenir.

| Soru | Kısa cevap |
|---|---|
| 301 mi 302 mi? [MÜLAKATTA SIK] | **301** kalıcı: tarayıcı önbelleğe alır, sunucu yükü azalır ama sonraki tıklamaları **göremezsin**. **302** (veya 307) geçici: her tıklama sunucuya gelir, **istatistik** tutulabilir. Analitik isteniyorsa 302. |
| SQL mi NoSQL mi? | Karmaşık ilişki ve transaction → SQL. Basit anahtar erişimi, devasa hacim, yatay ölçek → NoSQL. "İkisi de olur, ben şu nedenle şunu seçerim" de. |
| Tek hata noktaları? | Tek DB, tek cache, tek bölge. Replika, otomatik failover, çok bölge. |
| Diğer sık sorular | Sipariş servisi, bildirim sistemi, rate limiter, sohbet uygulaması, haber akışı. Aynı 7 adım uygulanır. |

### Kaynaklar

- [RESMÎ] [Collections and data structures (.NET)](https://learn.microsoft.com/dotnet/standard/collections/)
- [RESMÎ] [Selecting a collection class](https://learn.microsoft.com/dotnet/standard/collections/selecting-a-collection-class)
- [RESMÎ] [Array.Sort — Remarks (introsort)](https://learn.microsoft.com/dotnet/api/system.array.sort)
- [RESMÎ] [PriorityQueue<TElement,TPriority>](https://learn.microsoft.com/dotnet/api/system.collections.generic.priorityqueue-2)
- [RESMÎ] [Azure Architecture Center — Cloud design patterns](https://learn.microsoft.com/azure/architecture/patterns/)
- [3. TARAF] [System Design Primer (GitHub)](https://github.com/donnemartin/system-design-primer)


## 06 · Davranışsal sorular ve İngilizce mülakat

*HTML: 06-davranissal-ve-ingilizce.html* — STAR yöntemi, sık 12 davranışsal soru için cevap iskeleti (şablon — kendi örneğini koyarsın) ve İngilizce teknik mülakatta kendini tanıtma, düşünürken zaman kazanma, netleştirme ve "bilmiyorum ama…" kalıpları.

### STAR yöntemi

Davranışsal soru = "geçmişte gerçekten ne yaptın?" Varsayım ("yapardım") değil, **somut bir olay** beklenir.

| Harf | Ne anlatılır | Yaklaşık pay [TAHMİN] |
|---|---|---|
| **S** — Situation | Bağlam: proje, ekip, sorun. Kısa. | ≈ %15 |
| **T** — Task | Senin sorumluluğun / hedef. | ≈ %10 |
| **A** — Action | **Senin** yaptıkların ("biz" değil "ben"), neden öyle yaptığın. | ≈ %55 |
| **R** — Result | Ölçülebilir sonuç + ne öğrendin. | ≈ %20 |

> **Hazırlık yöntemi**
> Kendi geçmişinden 5–6 hikâye seç (zor bir bug, bir çatışma, bir hata, sıkı teslim tarihi, kendi başına öğrendiğin bir teknoloji, bir iyileştirme). Her birini STAR'a dök, 1,5–2 dakikada sesli anlat. Bir hikâye birden çok soruya uyar. Ezber metin değil, madde iskeleti tut.
> **İş deneyimin yoksa** (yeni mezun, stajyer, kariyer değiştiren): hikâyeleri staj, bitirme/okul projesi, kişisel proje, açık kaynak katkısı, hackathon, takım ödevi, gönüllü iş veya önceki meslekten seç; STAR aynı şekilde işler.

> **Sık hatalar**
> Uzun bağlam, kısa eylem · "biz yaptık" deyip kendi payını söylememek · sonuçsuz bitirmek · eski işvereni veya ekip arkadaşını kötülemek · uydurma hikâye (derinleştirme sorusunda dağılır).

### Sık 12 soru ve cevap iskeleti

| Soru | İskelet |
|---|---|
| **1. Kendini tanıt.** [MÜLAKATTA SIK] | 60–90 sn, **şimdi → geçmiş → gelecek**: şu an ne yapıyorsun ve hangi teknolojilerle · bu işe uyan 1–2 somut başarı/proje · neden bu pozisyon. Özgeçmişi baştan okuma, kişisel hayat anlatma. |
| **2. Güçlü yönün ne?** | İlana uyan **bir** güçlü yön + onu kanıtlayan kısa örnek. "Çalışkanım" gibi kanıtsız sıfat değil. |
| **3. Zayıf yönün ne?** [MÜLAKATTA SIK] | Gerçek ama **işi engellemeyen** bir yön + farkına vardığın an + **onu nasıl iyileştirdiğin** ve bugünkü durum. "Mükemmeliyetçiyim" klişesinden kaçın. |
| **4. Bir ekip arkadaşıyla çatışma yaşadın mı?** [MÜLAKATTA SIK] | Konu teknik/süreç olsun, kişisel değil · karşı tarafın bakışını nasıl anladın · veri/deneme ile nasıl ortak karara vardınız · sonuç ve ilişki. Kimseyi suçlama. |
| **5. Hata yaptığın bir an?** [MÜLAKATTA SIK] | Gerçek bir hata · **sahiplendin** (saklamadın) · hızlı etkiyi nasıl azalttın · kalıcı önlem (test, kontrol listesi, izleme) · ne öğrendin. |
| **6. Neden bu şirket?** [MÜLAKATTA SIK] | Şirketin ürünü/alanı/teknolojisi hakkında **araştırdığın somut** bir şey + senin deneyiminle bağı + öğrenmek istediğin şey. "İyi şirket" genel lafı değil. |
| **7. Neden ayrılıyorsun / ayrıldın?** | Kısa, olumlu, ileriye bakan: büyüme, yeni alan, ürün türü, proje bitişi, yeniden yapılanma. Eski işyeri hakkında olumsuz konuşma. **İlk işini arıyorsan** bu soru yerine "Neden yazılım / neden backend, neden bu pozisyon?" gelir: ilgini başlatan somut bir olay + şimdiye kadar yaptıkların (proje, staj) + bu rolde öğrenmek istediğin. |
| **8. Çözdüğün en zor teknik sorun?** [MÜLAKATTA SIK] | Belirti → hipotezler → nasıl daralttın (log, profiler, yeniden üretme) → kök neden → çözüm → tekrar olmasın diye ne yaptın. Teknik derinlik göster. |
| **9. Sıkı teslim tarihi / baskı?** | Kapsamı nasıl önceliklendirdin, neyi ertelediğini kime nasıl söyledin, riski erken bildirdin mi, sonuç. |
| **10. Katılmadığın bir karar?** | Gerekçeni veriyle anlattın, dinlendin; karar başka yönde çıktıysa **destekleyip uyguladın** (disagree and commit); sonradan ne oldu. |
| **11. Yeni bir teknolojiyi nasıl öğrenirsin?** | Somut örnek: resmî doküman → küçük deneme projesi → gerçek işte kullanım → ekiple paylaşım. Süre ve sonuç. |
| **12. 5 yıl sonra kendini nerede görüyorsun?** | Rolle uyumlu bir yön: teknik derinlik (ör. mimari, performans) veya sorumluluk (mentorluk, ekip liderliği). Şirketi "basamak" gibi gösterme. |

Ek sık sorular: "Beklentin ne?" → [07 · Maaş](07-kapanis-maas-kontrol.html#maas) · "Özgeçmişindeki ara dönem?" → kısa ve dürüst: o dönemde ne yaptın (öğrenme, proje, kişisel sebep — ayrıntı vermek zorunda değilsin), şimdi hazırsın · "Bize sorun var mı?" → [07 · Sona sorular](07-kapanis-maas-kontrol.html#sorular).

> **Özgeçmiş ve dürüstlük**
> Özgeçmişte yazan her teknoloji sorulabilir; "aslında kullanmadım" demek güven açığı doğurur. Ayrıntı: [Programlama § 4 · Risk notu](../../Programlama/index.html#mulakatta-sik), [İş arama · Özgeçmişte abartılı beyan riski](../Issizlik/07-is-arama.html#cv).

### İngilizce teknik mülakat

Akıcılık gramerden önemlidir: kısa cümle, yavaş konuşma, düşünürken susmak yerine **ne düşündüğünü söylemek**. En yüksek getirili hazırlık: kendi projeni İngilizce 2 dakikada sesli anlatmayı tekrar etmek ([İş arama § 6.4](../Issizlik/07-is-arama.html#mulakat)).

#### Kendini tanıtma

- "I'm a backend developer with [X] years of experience, mainly working with C# and .NET."
- "Most recently, I've been building [REST APIs / background services] with [ASP.NET Core] and [PostgreSQL / SQL Server]."
- "One project I'm proud of is …, where I reduced the response time by about [X] percent."
- "I'm looking for a role where I can work on [scalable systems / a product I care about]."

İlk cümle iş deneyimi olan aday içindir; başlangıç noktan farklıysa onun yerine:

- **İlk işini arıyorsan** (yeni mezun, stajyer, kurs/bootcamp): "I recently graduated in [field] (or: I'm a final-year [field] student), and I've built [N] projects with C# and ASP.NET Core, for example [project]."
- **Başka dilden geçiyorsan:** "I've worked with [Java / Python / Node.js] for [X] years, and for the last [N] months I've been building APIs with C# and .NET."
- **Başka meslekten geliyorsan:** "I worked as a [previous role] for [X] years, then moved into software; since then I've built [N] projects with C# and .NET."

#### Düşünürken zaman kazanmak

- "Let me think about it for a second."
- "That's a good question. Let me break it down."
- "Let me make sure I understand the question correctly."
- "Can I take a moment to sketch this out?"
- "I'm thinking out loud here…"

#### Netleştirme soruları (canlı kodlama ve sistem tasarımı)

- "Could you clarify what you mean by …?"
- "Can I assume the input is sorted / not null?"
- "What's the expected size of the input?"
- "Should I optimize for time or for memory?"
- "Are there any constraints I should be aware of — for example, latency or consistency?"
- "Just to confirm: the function should return … when …, right?"

#### Çözümü anlatmak

- "My first idea is a brute-force approach, which would be O(n²)."
- "We can improve it by using a hash set, which brings it down to O(n)."
- "The trade-off here is extra memory for faster lookups."
- "Let me walk you through an example."
- "I'd also handle the edge cases: an empty list and duplicate values."

#### Bilmediğinde

- "I'm not sure, but I would start by …"
- "I haven't used that in production, but my understanding is that …"
- "I don't know the exact answer, but here's how I'd find out: …"
- "I'd need to check the documentation, but I believe …"

#### Anlamadığında / tekrar istemek

- "Sorry, could you repeat that, please?"
- "Could you rephrase the question?"
- "Do you mean … or …?"

#### Geçmiş deneyimi anlatmak (STAR, İngilizce)

- "The situation was … / My task was to …"
- "What I did was … / I decided to … because …"
- "As a result, … / What I learned from this is …"

#### Kapanış

- "Thank you for your time. I really enjoyed the conversation."
- "Do you have any concerns about my experience that I could address?"
- "What are the next steps in the process?"

| Sık kullanılan teknik ifade | Anlamı |
|---|---|
| trade-off | takas, bir şeyi kazanırken diğerinden vazgeçmek |
| edge case / corner case | uç durum |
| bottleneck | darboğaz |
| scalable / scale out | ölçeklenebilir / yatay ölçeklemek |
| backward compatible / breaking change | geriye uyumlu / kırıcı değişiklik |
| root cause | kök neden |
| tech debt | teknik borç |
| ship / deploy / roll back | yayınlamak / dağıtmak / geri almak |
| on-call / incident / postmortem | nöbet / olay / olay sonrası değerlendirme |

### Kaynaklar

- [3. TARAF] STAR yöntemi: yaygın İK uygulaması; büyük teknoloji şirketlerinin aday hazırlık sayfaları bu yapıyı önerir.
- Kütüphane içi: [İş arama § 6.4 İngilizce mülakat](../Issizlik/07-is-arama.html#mulakat)


## 07 · Sona sorular, maaş ve kontrol listesi

*HTML: 07-kapanis-maas-kontrol.html* — Mülakatın sonunda adayın şirkete soracağı sorular, maaş pazarlığının kısa ilkeleri (ayrıntısı İş arama rehberinde) ve mülakat öncesi / günü / sonrası için işaretlenebilir kontrol listesi.

### Sona sorulacak sorular

"Bize sorunuz var mı?" sorusuna **"Yok"** demek ilgisizlik gibi görünür. 2–3 soru hazırla; cevabı zaten şirket sayfasında olanı sorma.

| Konu | Soru |
|---|---|
| İşin kendisi | "Bu pozisyonda ilk 3 ayda başarı nasıl görünür?" · "Tipik bir gün / sprint nasıl geçiyor?" |
| Ekip | "Ekip kaç kişi, hangi rollerden oluşuyor?" · "Kime raporlayacağım?" |
| Teknik | "Hangi .NET sürümündesiniz, yükseltme planı var mı?" · "Kod inceleme (code review) ve test süreci nasıl?" · "Dağıtım ne sıklıkla, nasıl yapılıyor?" · "Teknik borçla nasıl ilgileniyorsunuz?" |
| Süreç | "Gereksinimler nereden geliyor, ürün ekibiyle nasıl çalışıyorsunuz?" · "Nöbet (on-call) var mı?" |
| Gelişim | "Eğitim, konferans, sertifika desteği var mı?" · "Kıdem atlama ve değerlendirme nasıl işliyor?" |
| Çalışma biçimi | "Uzaktan / hibrit düzen nasıl, sözleşmede yazılı mı?" |
| Kapanış | "Mülakattan sonraki adımlar ve zaman çizelgesi nedir?" · "Deneyimimle ilgili aklınızda soru işareti kaldı mı?" |

> **İlk turda sorma**
> İlk görüşmede ilk soru olarak izin, prim, mesai bitiş saati sormak öncelik sinyali verir. Bunlar teklif aşamasında, toplam paket konuşulurken sorulur.

### Maaş pazarlığı ilkeleri

Ayrıntılı anlatım, cümle kalıpları ve yan hakların değeri: **[İş arama · Maaş pazarlığı](../Issizlik/07-is-arama.html#pazarlik)** ve piyasa ölçümü: [Maaş: piyasada nerede durduğunu ölçmek](../Issizlik/07-is-arama.html#maaslar). Burada yalnız özet:

| İlke | Kısa açıklama |
|---|---|
| Önce araştır | Rol, kıdem, şehir/uzaktan ve şirket tipine göre aralığı birden çok kaynaktan çıkar (maaş anketleri, ilanlardaki bantlar, ağın). |
| İlk rakamı mümkünse sen söyleme | "Önce rolün kapsamını anlamak isterim; sizin bu pozisyon için bütçe aralığınız nedir?" Israr edilirse **aralık** ver. |
| Aralığın alt ucu = kabul edilebilir en düşüğün üstü | Karşı taraf hep alt ucu duyar. |
| Brüt mü net mi? | Netleştir; teklifi **yazılı** ve "brüt/net" ibaresiyle iste. |
| Geçmiş maaşı çapa yapma | Konuşmayı bugünün piyasası ve rolün kapsamı üzerine kur. |
| Toplam paketi konuş | Uzaktan çalışma, sağlık sigortası, eğitim bütçesi, donanım, izin günü, zam dönemi (yüksek enflasyonda yılda iki revizyon). |
| Hemen kabul etme | "Teşekkür ederim, yazılı paylaşır mısınız? [N] gün içinde dönüş yapacağım." |
| Rakip süreç | Gerçekse söyle; uydurma. |

### Kontrol listesi

#### Bir hafta önce

- [ ] İlanı satır satır oku; istenen her teknoloji için 2–3 cümlelik cevap hazırla.
- [ ] Şirketin ürününü, müşterisini, teknoloji yığınını (blog, GitHub, iş ilanları) araştır.
- [ ] Özgeçmişindeki her proje ve teknolojiyi anlatabildiğinden emin ol.
- [ ] 5–6 STAR hikâyesi hazırla, sesli tekrar et ([06](06-davranissal-ve-ingilizce.html#star)).
- [ ] [MÜLAKATTA SIK] satırlarını tekrar et; en yüksek getirili üçlü: DI ömürleri, N+1, async/deadlock.
- [ ] Her gün 1–2 kodlama sorusunu süre tutarak çöz ([05](05-algoritma-sistem-tasarimi.html#kodlama)).
- [ ] Portfolyo/GitHub deposunu düzenle: README, çalıştırma talimatı, gizli bilgi yok.

#### Bir gün önce

- [ ] [Son gece hızlı tekrar](08-son-gece.html) sayfasını oku.
- [ ] Görüşme saatini, saat dilimini, bağlantıyı ve görüşecek kişileri teyit et.
- [ ] Online ise: kamera, mikrofon, kulaklık, internet, ekran paylaşımı, IDE ve şirketin kullandığı platform (Teams/Zoom/Meet, kodlama aracı) denensin.
- [ ] Masaüstündeki gereksiz pencereleri ve bildirimleri kapat; ekran paylaşımında kişisel bilgi görünmesin.
- [ ] Kendini tanıtma (TR + gerekiyorsa EN) ve sona sorulacak 3 soru hazır.
- [ ] Erken yat.

#### Mülakat günü

- [ ] 10 dakika önce hazır ol (yüz yüze ise 10–15 dk önce orada).
- [ ] Su, kâğıt-kalem; telefon sessiz.
- [ ] Soruyu anlamadıysan netleştir; düşünürken sesli düşün.
- [ ] Bilmediğinde uydurma: "Emin değilim, ama şöyle yaklaşırdım…"
- [ ] Canlı kodlamada önce örnek ve uç durumları konuş, sonra kodla, sonunda elle test et.
- [ ] Sonunda 2–3 soru sor, sonraki adımları öğren.

#### Sonrası

- [ ] Aynı gün kısa bir teşekkür e-postası (isteğe bağlı, kısa).
- [ ] Sorulan soruları ve takıldığın yerleri not et; bir sonraki mülakat için bu rehberde eksik konuya çalış.
- [ ] Söylenen sürede dönüş yoksa bir kez nazikçe sor.
- [ ] Teklif gelirse: yazılı iste, toplam paketi hesapla, karar için süre iste.

### Kaynaklar

- Kütüphane içi: [İş arama § 7 Maaş pazarlığı](../Issizlik/07-is-arama.html#pazarlik), [§ 2 Maaşlar](../Issizlik/07-is-arama.html#maaslar), [§ 6 Mülakat](../Issizlik/07-is-arama.html#mulakat)


## 08 · Son gece hızlı tekrar

*HTML: 08-son-gece.html* — Bütün rehberin tek sayfalık özeti: her satır bir anahtar cümle. Takıldığın satırın bağlantısından ilgili bölüme dön.

### En yüksek getirili üçlü

1. **DI ömürleri:** Transient her seferinde yeni · Scoped istek başına (`DbContext`) · Singleton tek ve thread-safe · singleton içine scoped = **captive dependency** → `IServiceScopeFactory` ([03](03-aspnet-core-ef-core.html#pipeline)).
2. **EF Core N+1:** liste için 1 + her satır için 1 sorgu (lazy loading) → `Include`, **`Select` projeksiyonu**, `AsSplitQuery`; okumada `AsNoTracking` ([03](03-aspnet-core-ef-core.html#ef-core)).
3. **async/await:** thread'i bloklamadan bekleme · `.Result`/`.Wait()` → deadlock (UI/eski ASP.NET) veya thread pool tükenmesi · `async void` yalnız event handler · kütüphanede `ConfigureAwait(false)` ([01](01-csharp-dili.html#async)).

### C# — tek cümleler

- Değer tipi **kopyalanır**, referans tipi **referansı** kopyalanır; "stack/heap" ikincil ayrıntı.
- `record` = değer eşitliği + `with`; `record struct` değer tipli sürüm.
- Boxing = değer tipi → `object` (heap ayırma); generics önler.
- `string` değişmez → döngüde `StringBuilder`.
- `ref` (atanmış gir), `out` (metot atar), `in` (salt okunur referans).
- `const` derlemeye gömülür; `readonly` çalışma zamanında, kurucuda atanır.
- Abstract class durum + tek kalıtım; interface sözleşme + çoklu (default method var).
- `override` çok biçimlilik, `new` gizleme (tuzak).
- `event` = dışarıdan yalnız `+=`/`-=`; abonelikten çıkmazsan sızıntı.
- Closure değişkeni yakalar, değeri değil; `for` döngüsü tuzağı.
- LINQ deferred: `ToList/Count/First` çalıştırır; `IQueryable` SQL'e çevrilir, `IEnumerable` bellekte.
- `First` yoksa istisna · `FirstOrDefault` default · `Single` tam bir tane.
- `yield return` = tembel iterator durum makinesi.
- `using` = `Dispose` garantisi; GC yönetilmeyen kaynağı bırakmaz.
- GC: Gen 0/1/2 + LOH (≥ 85.000 bayt).
- `throw;` stack trace'i korur, `throw ex;` sıfırlar.
- `ValueTask` yalnız bir kez await; şüphede `Task`.
- `Span<T>` kopyasız dilim, `ref struct`, async boyunca tutulamaz → `Memory<T>`.
- `==` referans (string hariç), `Equals` ezilebilir; `Equals` ezen `GetHashCode`'u da ezer.
- Güncel: **.NET 10 LTS + C# 14** (Kasım 2025); .NET 8 ve 9 desteği Kasım 2026'da bitiyor.

### OOP, SOLID, desenler

- **S** tek değişim nedeni · **O** yeni davranış yeni sınıfla · **L** alt tip yerine geçebilmeli · **I** küçük arayüzler · **D** soyutlamaya bağımlılık (DI ≠ DIP).
- Composition over inheritance.
- Clean/Onion: bağımlılıklar **içe**; altyapı çekirdeğin arayüzlerini uygular.
- CQRS: okuma ve yazma modelleri ayrı; basit CRUD'da gereksiz.
- `DbContext` zaten UoW, `DbSet` zaten repository → generic repository tartışmalı.
- Strategy (algoritma değiştir) · Decorator (davranış ekle) · Factory (oluşturmayı ayır) · Observer (event) · Adapter (arayüz çevir) · Singleton (DI ile).

### ASP.NET Core ve HTTP

- Middleware sırası = çalışma sırası; `UseAuthentication` → `UseAuthorization`.
- Filtre sırası: Authorization → Resource → Action → Exception → Result.
- Config: appsettings → appsettings.{Env} → User Secrets → env var → komut satırı (sonraki ezer).
- `IOptions` (sabit) · `IOptionsSnapshot` (istek başına) · `IOptionsMonitor` (değişiklik bildirimi).
- `IHttpClientFactory`: socket tükenmesi + DNS sorunu çözümü.
- Minimal API yeni projeler için önerilen yol; .NET 10'da `AddValidation()` ve OpenAPI 3.1 varsayılan.
- 401 kimlik yok · 403 yetki yok · 201 + `Location` · 204 · 409 çakışma · 422 anlam hatası · 429 limit.
- Idempotent: GET, PUT, DELETE (POST değil) → POST için `Idempotency-Key`.
- JWT imzalı, **şifreli değil**; kısa access + refresh token.
- CORS tarayıcı kuralıdır, sunucu güvenliği değil.
- Hatalar ProblemDetails (RFC 9457) ile; loglar mesaj şablonuyla.

### EF Core ve SQL

- `DbContext` scoped, thread-safe değil.
- Eager `Include` · Lazy proxy (N+1 riski) · Explicit `Entry().LoadAsync()`.
- Migration üretimde idempotent script veya bundle.
- Tek `SaveChanges` = tek transaction.
- Optimistic concurrency: `[Timestamp]`/rowversion → `DbUpdateConcurrencyException` → 409.
- `FromSql($"...")` güvenli, `FromSqlRaw` + birleştirme = SQL injection.
- EF Core yazma/iş kuralı, Dapper ağır okuma.
- SQL: WHERE gruptan önce, HAVING sonra · clustered tablo sırası (bir tane) · Read Committed varsayılan · ayrıntı [SQL rehberi](../SQL-Mulakat/index.html).

### Dağıtık, test, Git

- Cache-aside: oku → yoksa DB → cache'e yaz; yazmada anahtarı sil.
- RabbitMQ = broker, tüketilince gider; Kafka = kalıcı log, offset, partition, replay.
- At-least-once + idempotent tüketici · outbox ile "kaydedildi ama mesaj gitmedi" çözülür.
- Modüler monolitle başla; mikroservis = servis başına DB + ağ + operasyon maliyeti.
- Eventual consistency, Saga + telafi işlemi, retry + circuit breaker.
- Container çekirdeği paylaşır; multi-stage build; CI = her push'ta derle+test.
- Test piramidi; stub durum, mock etkileşim doğrular; AAA; Red → Green → Refactor.
- merge geçmişi korur, rebase yeniden yazar; **paylaşılan dalı rebase etme**; cherry-pick tek commit.

### Algoritma ve sistem tasarımı

- Dictionary/HashSet O(1) ortalama → O(n²)'yi O(n)'ye indirmenin ana aracı.
- İki işaretçi (palindrom), kayan pencere (en uzun tekrarsız), yığın (parantez), ikili arama (`lo + (hi - lo) / 2`).
- Uç durumlar: boş, tek eleman, tekrar, negatif, taşma, NULL.
- Sistem tasarımı: gereksinim → kapasite → API → veri modeli → üst tasarım → ölçekleme → özet.
- URL kısaltıcı: Base62 (7 karakter ≈ 3,5 trilyon), okuma ağır → Redis + replika, istatistik → kuyruk, analitik için 302.

### Davranışsal ve kapanış

- STAR: kısa bağlam, uzun **eylem** ("ben"), ölçülebilir sonuç.
- Kendini tanıtma: şimdi → geçmiş → neden bu rol, 60–90 sn.
- Zayıf yön: gerçek + nasıl iyileştirdiğin.
- Bilmiyorsan: "I'm not sure, but I would…"
- Sona 2–3 soru; maaşta önce aralığı öğren, brüt/net netleştir, yazılı iste, hemen kabul etme.
- Yarın: 10 dk erken, teknik kontrol, su, sesli düşün.


## Tahmin olarak işaretlenen iddialar

- Hangi sorunun ne sıklıkla sorulduğu ([MÜLAKATTA SIK] rozetleri): istatistik yok, alan deneyimi ve iş ilanı başlıklarına dayanır. Kütüphanedeki risk tablosu da aynı yöntemle derlendi.
- Kıdeme göre ağırlık (junior'da mimari bir cümlelik teyit, senior'da belirleyici).
- Online test karmaşıklık sınırı (n ≤ 10⁴ → O(n²) çoğu zaman geçer): platform ve dile göre değişir.
- Take-home'da aşırı mimarinin eksi sayılması.
- STAR bölümlerinin yaklaşık süre payları.
- Mülakat sürecindeki adım sayıları.

## Çelişkili konular

- **Token saklama (localStorage / cookie / BFF):** güvenlik toplulukları farklı öneriyor; mülakatta artı-eksi sayılması beklenir.
- **Repository + Unit of Work'ün EF Core üstünde kullanımı:** Microsoft mimari rehberi repository'yi DDD aggregate'leri için anlatır; topluluk generic repository'yi büyük ölçüde gereksiz bulur. "Duruma göre + gerekçe" cevabı güvenlidir.
- **Mikroservis ne zaman:** tek doğru yok; modüler monolitle başlama yaklaşımı yaygın görüş.

## Kütüphane içi bağlantılar (bu rehberin üstüne kurulduğu sayfalar)

- `../../Programlama/index.html#mulakatta-sik` — teknoloji bazında sorulma sıklığı (risk tablosu), kıdeme ve hedefe göre okuma.
- `../../Programlama/CSharp-DotNet/` — 10 bölümlük C# / .NET anahtar listesi (01 dil, 02 Web API, 03 veri, 04 mimari, 05 mesajlaşma, 06 test, 07 DevOps, 08 UI, 09 modern .NET, 10 kütüphaneler).
- `../Issizlik/07-is-arama.html` — § 6 mülakat (.NET başlıkları, canlı kodlama, sistem tasarımı, İngilizce), § 7 maaş pazarlığı, § 2 maaş ölçümü, § 5 özgeçmiş.
- `../SQL-Mulakat/index.html` — SQL mülakat rehberi (ayrıntılı SQL soruları).

## Tam kaynakça (erişim 29 Ekim 2026)

1. [RESMÎ] Microsoft Learn — What's new in C# 14 — https://learn.microsoft.com/dotnet/csharp/whats-new/csharp-14
2. [RESMÎ] Microsoft Learn — .NET releases, patches, and support — https://learn.microsoft.com/dotnet/core/releases-and-support
3. [RESMÎ] Microsoft Learn — What's new in ASP.NET Core 10 — https://learn.microsoft.com/aspnet/core/release-notes/aspnetcore-10.0
4. [RESMÎ] Microsoft Learn — What's New in EF Core 10 — https://learn.microsoft.com/ef/core/what-is-new/ef-core-10.0/whatsnew
5. [RESMÎ] Microsoft Learn — APIs overview — https://learn.microsoft.com/aspnet/core/fundamentals/apis
6. [RESMÎ] Microsoft Learn — Service lifetimes (dependency injection) — https://learn.microsoft.com/dotnet/core/extensions/dependency-injection/service-lifetimes
7. [RESMÎ] Microsoft Learn — Asynchronous programming with async and await — https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/
8. [RESMÎ] Microsoft Learn — Fundamentals of garbage collection — https://learn.microsoft.com/dotnet/standard/garbage-collection/fundamentals
9. [RESMÎ] Microsoft Learn — Implement a Dispose method — https://learn.microsoft.com/dotnet/standard/garbage-collection/implementing-dispose
10. [RESMÎ] Microsoft Learn — Memory<T> and Span<T> usage guidelines — https://learn.microsoft.com/dotnet/standard/memory-and-spans/memory-t-usage-guidelines
11. [RESMÎ] Microsoft Learn — LINQ — https://learn.microsoft.com/dotnet/csharp/linq/
12. [3. TARAF] .NET Blog — ConfigureAwait FAQ — https://devblogs.microsoft.com/dotnet/configureawait-faq/
13. [RESMÎ] Microsoft Learn — ASP.NET Core Middleware — https://learn.microsoft.com/aspnet/core/fundamentals/middleware/
14. [RESMÎ] Microsoft Learn — Options pattern — https://learn.microsoft.com/aspnet/core/fundamentals/configuration/options
15. [RESMÎ] Microsoft Learn — Filters in ASP.NET Core — https://learn.microsoft.com/aspnet/core/mvc/controllers/filters
16. [RESMÎ] Microsoft Learn — Rate limiting middleware — https://learn.microsoft.com/aspnet/core/performance/rate-limit
17. [RESMÎ] Microsoft Learn — Use IHttpClientFactory to implement resilient HTTP requests — https://learn.microsoft.com/dotnet/architecture/microservices/implement-resilient-applications/use-httpclientfactory-to-implement-resilient-http-requests
18. [RESMÎ] Microsoft Learn — Efficient querying (EF Core) — https://learn.microsoft.com/ef/core/performance/efficient-querying
19. [RESMÎ] Microsoft Learn — Handling concurrency conflicts (EF Core) — https://learn.microsoft.com/ef/core/saving/concurrency
20. [RESMÎ] RFC 9110 — HTTP Semantics — https://www.rfc-editor.org/rfc/rfc9110
21. [RESMÎ] RFC 9457 — Problem Details for HTTP APIs — https://www.rfc-editor.org/rfc/rfc9457
22. [RESMÎ] Microsoft Learn — Architectural principles — https://learn.microsoft.com/dotnet/architecture/modern-web-apps-azure/architectural-principles
23. [RESMÎ] Microsoft Learn — Common web application architectures — https://learn.microsoft.com/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures
24. [RESMÎ] Azure Architecture Center — CQRS pattern — https://learn.microsoft.com/azure/architecture/patterns/cqrs
25. [RESMÎ] Microsoft Learn — Design the infrastructure persistence layer — https://learn.microsoft.com/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design
26. [RESMÎ] Azure Architecture Center — Transactional Outbox pattern — https://learn.microsoft.com/azure/architecture/databases/guide/transactional-outbox-cosmos
27. [RESMÎ] Azure Architecture Center — Saga distributed transactions pattern — https://learn.microsoft.com/azure/architecture/reference-architectures/saga/saga
28. [RESMÎ] Microsoft Learn — HybridCache library in ASP.NET Core — https://learn.microsoft.com/aspnet/core/performance/caching/hybrid
29. [RESMÎ] Microsoft Learn — Distributed caching in ASP.NET Core — https://learn.microsoft.com/aspnet/core/performance/caching/distributed
30. [RESMÎ] Microsoft Learn — Containerize a .NET app with dotnet publish — https://learn.microsoft.com/dotnet/core/containers/sdk-publish
31. [RESMÎ] Microsoft Learn — Unit testing best practices for .NET — https://learn.microsoft.com/dotnet/core/testing/unit-testing-best-practices
32. [RESMÎ] Microsoft Learn — Integration tests in ASP.NET Core — https://learn.microsoft.com/aspnet/core/test/integration-tests
33. [RESMÎ] RabbitMQ — Tutorials — https://www.rabbitmq.com/tutorials
34. [RESMÎ] Apache Kafka — Introduction — https://kafka.apache.org/intro
35. [RESMÎ] Pro Git — Git Branching: Rebasing — https://git-scm.com/book/en/v2/Git-Branching-Rebasing
36. [3. TARAF] Trunk-based development — https://trunkbaseddevelopment.com/
37. [RESMÎ] Microsoft Learn — Collections and data structures — https://learn.microsoft.com/dotnet/standard/collections/
38. [RESMÎ] Microsoft Learn — Array.Sort — https://learn.microsoft.com/dotnet/api/system.array.sort
39. [RESMÎ] Microsoft Learn — PriorityQueue<TElement,TPriority> — https://learn.microsoft.com/dotnet/api/system.collections.generic.priorityqueue-2
40. [RESMÎ] Azure Architecture Center — Cloud design patterns — https://learn.microsoft.com/azure/architecture/patterns/
41. [3. TARAF] System Design Primer — https://github.com/donnemartin/system-design-primer
