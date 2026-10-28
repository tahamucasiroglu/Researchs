# Mülakat Hazırlığı — .NET / C# Backend

Yazılım geliştirici iş mülakatına (ağırlık .NET / C# backend) hazırlık için kısa, anahtar kelimeli bir tekrar rehberi. Her madde "soru → 1–4 satırlık cevap" biçiminde; amaç ezber değil, cevabın iskeletini ve doğru terimleri hazır tutmak. Mülakat türleri ve online test taktiklerinden C# dili, OOP/SOLID, ASP.NET Core, EF Core, mimari, dağıtık sistemler, test, Git, algoritma ve sistem tasarımına; oradan davranışsal sorulara, İngilizce kalıplara, sona sorulacak sorulara, maaş pazarlığı ilkelerine ve kontrol listesine kadar uzanır. Kütüphanede zaten olan sayfaları tekrar yazmaz, kısa cevabı verip oraya bağlantı verir. Okurun kıdemi ve başlangıç noktası farklı olabileceği için "Nereden başlamalı?" bölümünde durum durum yol gösterilir.

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

Yapay zekâ için Markdown: [arastirma.md](arastirma.md) — aynı içerik tek dosyada; güven etiketleri [RESMÎ] / [3. TARAF] / [TAHMİN] / [ÇELİŞKİLİ], doğrulanmış sürüm gerçekleri tablosu, tahmin ve çelişkili iddiaların listesi ve tam kaynakça ile. Bir AI asistanına bağlam olarak verilip "bana soru sor, cevabımı değerlendir" çalışmasında kullanılabilir.

> Araştırma tarihi: 29 Ekim 2026 (kaynaklara bu tarihte erişildi). .NET bilgileri .NET 10 (LTS) ve C# 14 itibarıyla learn.microsoft.com'dan kontrol edildi. Genel hazırlık notudur; "hangi soru ne sıklıkla sorulur" bilgisi istatistik değil, tahmindir ve şirket, kıdem ve role göre ağırlık değişir. Davranışsal ve İngilizce cevaplar yer tutuculu şablondur, kendi örneğinle doldurulur.

## Sayfalar

| Sayfa | Açıklama |
|---|---|
| [00 · Genel bakış, mülakat türleri ve süreç](index.html) | Rehberin kullanımı ve rozetler; İK, teknik, online test, take-home, canlı kodlama, sistem tasarımı ve davranışsal mülakat türleri; online test taktikleri (örnek çıktı ≠ tam veri, kontrol sorgusu, "Run tests"i sık kullanmak, sabit değere değil koşula göre yazmak). |
| [01 · C# dili](01-csharp-dili.html) | Değer/referans tipi, struct/class/record, boxing, string, ref/out/in, nullable, generics, delegate/event, closure, extension, LINQ, yield, IDisposable, GC, exception, async/await (ValueTask, ConfigureAwait, deadlock, async void), Span, pattern matching, `==`/Equals/GetHashCode, C# 14. |
| [02 · OOP, SOLID, mimari ve desenler](02-oop-solid-desenler.html) | OOP'nin dört ayağı, SOLID (her harf ihlal örneğiyle), DRY/KISS/YAGNI, composition, katmanlı/clean/onion, CQRS, repository + UoW tartışması, mediator, 12 tasarım deseni. |
| [03 · ASP.NET Core, EF Core ve SQL özeti](03-aspnet-core-ef-core.html) | Middleware, DI ömürleri ve captive dependency, filtreler, binding/validation, minimal API, auth/JWT/CORS, HTTP ve REST, idempotency, versioning, rate limiting, loglama, options, health check, background service; EF Core tracking, N+1, yükleme, migration, transaction, concurrency, raw SQL, Dapper; 6 soruluk SQL özeti. |
| [04 · Dağıtık sistemler, test ve Git](04-dagitik-test-git.html) | Redis ve cache desenleri, RabbitMQ/Kafka, monolit/mikroservis, eventual consistency, Saga, Docker, CI/CD, bulut; test türleri, mock/stub, xUnit, AAA, TDD; merge/rebase/cherry-pick, conflict, dal stratejileri. |
| [05 · Veri yapıları, algoritma ve sistem tasarımı](05-algoritma-sistem-tasarimi.html) | Big-O, .NET koleksiyon karmaşıklıkları, C# çözümlü 10 klasik kodlama sorusu, URL kısaltıcı örneğiyle sistem tasarımı iskeleti. |
| [06 · Davranışsal sorular ve İngilizce](06-davranissal-ve-ingilizce.html) | STAR yöntemi (iş deneyimi olmayanlar için hikâye kaynakları dahil), 12 sık soru için şablon cevap iskeleti, başlangıç noktasına göre kendini tanıtma ve İngilizce teknik mülakat kalıp cümleleri. |
| [07 · Sona sorular, maaş ve kontrol listesi](07-kapanis-maas-kontrol.html) | Adayın şirkete soracağı sorular, maaş pazarlığı ilkeleri (rakam değil ilke), mülakat öncesi/günü/sonrası işaretlenebilir liste. |
| [08 · Son gece hızlı tekrar](08-son-gece.html) | Bütün rehber tek sayfada, her satır bir anahtar cümle. |

## Nereden başlamalı?

- **Mülakata bir hafta varsa** → sırayla oku, bilmediğin her satırı işaretle, yanındaki bağlantıdan derin sayfaya git.
- **Mülakat yarınsa** → yalnız "MÜLAKATTA SIK" rozetli satırları ve [08 · Son gece hızlı tekrar](08-son-gece.html) sayfasını oku.
- **Junior / stajyer / ilk iş** → ağırlık C# dili, OOP, SQL, Git, REST ve algoritmada; davranışsal hikâyeleri staj ve projelerden kur ([06](06-davranissal-ve-ingilizce.html#star)).
- **Mid / senior** → DI, EF Core performansı, async, mimari, cache, kuyruk, idempotency ve sistem tasarımı belirleyici.
- **Başka dilden geliyorsan (Java, JS, Python)** → kavramların çoğu aynı; C#'a özgü olanlar [01 · C# dili](01-csharp-dili.html) sayfasında.
- **C# / .NET'e yeni başlıyorsan** → bu rehber tekrar içindir, sıfırdan öğretmez; önce [C# / .NET anahtar listesi](../../Programlama/CSharp-DotNet/) ile temel kavramları çalış.

## İlgili konular

- [SQL Mülakat Rehberi](../SQL-Mulakat/) — Kardeş rehber: SQL soruları ayrıntılı (bu rehberde yalnız 6 soruluk özet var); JOIN'ler, gruplama, window fonksiyonları, online sınav taktikleri.
- [Programlama · Mülakatta sık sorulanlar](../../Programlama/index.html#mulakatta-sik) — Teknoloji bazında sorulma sıklığı, kıdeme ve hedefe göre okuma kılavuzu.
- [C# / .NET](../../Programlama/CSharp-DotNet/) — 10 bölümlük anahtar liste; bu rehberdeki her teknik bölüm ilgili alt sayfanın başlığına bağlanır.
- [İşsizlik → İş Arama ve Piyasa](../Issizlik/07-is-arama.html) — Mülakat başlıkları, canlı kodlama, sistem tasarımı, İngilizce mülakat (§ 6), maaş pazarlığı (§ 7), maaş ölçümü (§ 2), özgeçmiş (§ 5).
- [İngilizce → Diğer Yapılar](../../Dil/Ingilizce/06-diger-yapilar/) — Sonundaki yazılım İngilizcesi eki; İngilizce mülakat kalıplarını kurarken dil bilgisi desteği.

## Kaynakça

Tam liste ve güven etiketleri: [arastirma.md](arastirma.md) → "Tam kaynakça". Başlıcaları (erişim 29 Ekim 2026):

- [What's new in C# 14](https://learn.microsoft.com/dotnet/csharp/whats-new/csharp-14) — Microsoft Learn
- [.NET releases, patches, and support](https://learn.microsoft.com/dotnet/core/releases-and-support) — Microsoft Learn
- [What's new in ASP.NET Core 10](https://learn.microsoft.com/aspnet/core/release-notes/aspnetcore-10.0) — Microsoft Learn
- [What's New in EF Core 10](https://learn.microsoft.com/ef/core/what-is-new/ef-core-10.0/whatsnew) — Microsoft Learn
- [APIs overview](https://learn.microsoft.com/aspnet/core/fundamentals/apis) — Microsoft Learn
- [Service lifetimes (dependency injection)](https://learn.microsoft.com/dotnet/core/extensions/dependency-injection/service-lifetimes) — Microsoft Learn
- [RFC 9110 — HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110) · [RFC 9457 — Problem Details](https://www.rfc-editor.org/rfc/rfc9457)
- [System Design Primer](https://github.com/donnemartin/system-design-primer) — sistem tasarımı için topluluk kaynağı (3. taraf)

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
