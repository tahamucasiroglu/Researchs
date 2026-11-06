# Veritabanı ve SQL

SQL dili ve ilişkisel veritabanlarına dair rehberler ve denemeler. Blockchain ve Yapay Zekâ gibi bu da bir programlama dili bölümü değil, **alan**dır: SQL, hangi programlama dilinden kullanılırsa kullanılsın aynı dildir; farklar dilden değil veritabanı motorundan (lehçeden) gelir. Örnekler standart SQL'dir; ele alınan dört motorun (SQLite, PostgreSQL, SQL Server / T-SQL, MySQL) farkları ayrıca belirtilir. Bir dilden veritabanına erişim (ORM, sürücü) o dilin klasöründe kalır: C# için EF Core ve Dapper [C# / .NET → Veri Erişimi](../CSharp-DotNet/03-veri-erisimi/), Java için JDBC ve JPA/Hibernate [Java → Veri ve Mesajlaşma](../Java/03-veri-ve-mesajlasma/) bölümündedir; o bölümler buraya bağlanır. Konular çalışıldıkça eklenir.

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

## Konular

| Konu | Açıklama |
|---|---|
| [SQL Mülakat Rehberi](sql-mulakat/) | Mülakat ve online kodlama sınavları için kısa, anahtar kelimeli SQL: JOIN'lerde kaç satır gelir, NULL mantığı, gruplama, window fonksiyonları, klasik sorular, sınav motorunu belirleme, SQLite notları ve SQLite / PostgreSQL / SQL Server / MySQL farkları. Yapay zekâ için Markdown hâli de var. |

## Nereden başlamalı?

- **Hiç SQL bilmiyorsan:** SQL Mülakat Rehberi bir tekrar özetidir, sıfırdan öğretmez. Programlamaya da yeni başlıyorsan ve hedefin yazılım geliştirmekse önce [Programlama → Genel Bakış § 3](../index.html#oncelik-sirasi)'teki "hiç bilmiyorum" satırına bak; orada SQL ilk dilden sonra gelir. Bir dil biliyorsan ya da hedefin yalnız SQL ise (raporlama, veri analizi gibi; bunun için bir programlama dili şart değil) rehberi § 1'den sırayla oku, her örneği kendin çalıştır ve bilmediğin terimi kaynakçadaki resmî belgeden aç; ilişkisel temeller (anahtar, indeks, transaction, normalizasyon) için ORM'den bağımsız [C# / .NET → Veri Erişimi § 2](../CSharp-DotNet/03-veri-erisimi/index.html#iliskisel-temeller) listesine bak. Ayrı bir veritabanı sunucusu kurmadan denemek için SQLite yeter: rehberdeki "ÖLÇÜLDÜ" etiketli sonuçlar Python'un `sqlite3` modülüyle SQLite 3.50.4 üzerinde bellek içi (`:memory:`) veritabanında alındı; diğer motorlara özgü örnekler çalıştırılmadı.
- **Bir dilden ORM ile geliyorsan (EF Core, Dapper, JPA/Hibernate, SQLAlchemy…):** ORM'in ürettiği SQL'i okuyabilmek için rehberin JOIN satır sayıları (§ 2), NULL mantığı (§ 3), gruplama (§ 4) ve window fonksiyonları (§ 7) bölümlerinden başla; kullandığın motorun farkları § 13'te. ORM'in kendisi dil klasöründe kalır: [C# / .NET → Veri Erişimi](../CSharp-DotNet/03-veri-erisimi/), [Java → Veri ve Mesajlaşma](../Java/03-veri-ve-mesajlasma/), Python için [Python](../Python/) sayfasının web çatıları bölümü.
- **Mülakata ya da online teste hazırlanıyorsan:** Otomatik değerlendirilen online testte önce sınav motorunu belirle (§ 12) ve kontrol listesini (§ 14) oku, sonra JOIN alıştırmalarını (§ 2) ve klasik soruları (§ 8) çöz. Canlı ya da yüz yüze mülakatta platforma özgü maddeler gerekmeyebilir; rehberin "Mülakatta sık" rozetli bölümleri (§ 2 JOIN'ler, § 8 klasik sorular) önce gelir. Mülakatın SQL dışı kısmı (mülakat türleri, teknik soru–cevaplar, davranışsal sorular) için [Mülakat Hazırlığı](../../Rehberler/Mulakat-Hazirligi/); oradaki teknik sorular .NET / C# backend ağırlıklıdır. Mülakat yarınsa önce rozetli bölümler ve Hızlı tekrar (§ 15).

## İlgili konular

- [C# / .NET → Veri Erişimi](../CSharp-DotNet/03-veri-erisimi/) — İlişkisel veritabanı temelleri, SQL Server ve T-SQL, EF Core ve Dapper, veritabanı motorları; SQL'in .NET uygulamasından kullanımı.
- [Java → Veri ve Mesajlaşma](../Java/03-veri-ve-mesajlasma/) — JDBC, JPA/Hibernate, Spring Data JPA ve migration; SQL'in Java uygulamasından kullanımı.
- [Mülakat Hazırlığı](../../Rehberler/Mulakat-Hazirligi/) — .NET / C# backend mülakatına soru → kısa cevap hazırlık; SQL için yalnız kısa bir özet içerir, ayrıntısı bu alandaki rehberde.

## Kaynakça

SQL Mülakat Rehberi'nin kaynakçasından seçilmiş resmî belgeler (erişim 29 Ekim 2026). Güven etiketleriyle tam liste: [rehberin kaynakçası](sql-mulakat/index.html#kaynakca) · [arastirma.md](sql-mulakat/arastirma.md) → "Kaynakça".

- SQLite — SELECT: https://www.sqlite.org/lang_select.html
- SQLite — Datatypes: https://www.sqlite.org/datatype3.html
- SQLite — Quirks: https://www.sqlite.org/quirks.html
- PostgreSQL — Window Functions: https://www.postgresql.org/docs/current/tutorial-window.html
- PostgreSQL — Transaction Isolation: https://www.postgresql.org/docs/current/transaction-iso.html
- Microsoft Learn — ORDER BY (OFFSET FETCH), T-SQL: https://learn.microsoft.com/en-us/sql/t-sql/queries/select-order-by-clause-transact-sql
- Microsoft Learn — SET TRANSACTION ISOLATION LEVEL, T-SQL: https://learn.microsoft.com/en-us/sql/t-sql/statements/set-transaction-isolation-level-transact-sql
- MySQL 8.4 — Server SQL Modes: https://dev.mysql.com/doc/refman/8.4/en/sql-mode.html
- MySQL 8.4 — InnoDB Transaction Isolation Levels: https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
