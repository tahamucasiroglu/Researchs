# SQL Mülakat Rehberi

Mülakatlarda ve online kodlama sınavlarında en sık sorulan SQL konularının kısa, anahtar kelimeli özeti. Her konu bir anahtar kelime, birkaç satır açıklama, küçük bir örnek ve bir "tuzak" notuyla anlatılır. En ağırlıklı bölüm JOIN'ler ve "kaç satır gelir?" sorularıdır: iki öğrencili, iki kurslu somut bir örnek üzerinden INNER / LEFT / RIGHT / FULL / CROSS / SELF JOIN sonuçları, satır sayısı formülleri ve cevabı gizli alıştırmalar. Örnekler standart SQL'dir; SQLite, PostgreSQL, SQL Server ve MySQL arasındaki farklar ayrıca işaretlenir. Sınav ekranında motor belirtilmemişse hangisi olduğunun nasıl anlaşılacağı "Durum → Ne yap" listesiyle verilir. SQLite'ın sürüm farkları (RIGHT/FULL JOIN, UPDATE FROM, window fonksiyonları) resmî sürüm notlarından doğrulandı; örnek sorgular SQLite 3.50.4 üzerinde çalıştırılıp satır sayıları kontrol edildi.

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır; alıştırma cevapları açılır kutularda)

Yapay zekâ için Markdown: [arastirma.md](arastirma.md) — aynı içerik saf Markdown olarak; bir AI asistanına bağlam olarak verilebilir. Her iddiada güven etiketi (RESMÎ = ürünün kendi belgesi · ÖLÇÜLDÜ · TAHMİN = genel deneyim, kaynağa bağlanmadı) ve sonda tam kaynakça var.

**ÖLÇÜLDÜ** etiketi, o sonucun (satır sayısı, sıralama, hata mesajı) sorgu Python'un `sqlite3` modülüyle SQLite 3.50.4 üzerinde bellek içi (`:memory:`) bir veritabanında çalıştırılarak elde edildiğini gösterir; başka bir motorda ya da sürümde sonuç farklı olabilir.

> Araştırma tarihi: 29 Ekim 2026 (güncelleme 6 Kasım 2026: sınav motorunu belirleme notu eklendi; MySQL'de WHERE alias'ı ve TRUNCATE kimlik sayacı bilgileri düzeltildi; sekiz resmî kaynak eklendi). Sürüm bilgileri ve lehçe davranışları değişebilir; kullanmadan önce kaynakçadaki resmî belgeden ve kullandığın motorun sürümünden kontrol et. ÖLÇÜLDÜ sonuçları yalnız SQLite 3.50.4 için geçerlidir; diğer motorlar için yazılanlar çalıştırılarak ölçülmedi. Örnek tablolardaki adlar ve maaşlar hayalîdir.

## Bölümler

| § | Başlık | Kısaca |
|---|---|---|
| 1 | [Sorgunun mantıksal çalışma sırası](index.html#calisma-sirasi) | FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT; alias'ın neden WHERE'de görülmediği. |
| 2 | [JOIN'ler ve "kaç satır gelir?"](index.html#join) | Her JOIN türü için sonuç tablosu, satır sayısı formülleri, anti-join, ON ile WHERE farkı, çoklu eşleşmede çoğalma, 10 alıştırma. |
| 3 | [Filtreleme ve NULL mantığı](index.html#filtreleme) | AND/OR önceliği, IN, BETWEEN, LIKE, IS NULL, NOT IN + NULL tuzağı, COUNT(*) ile COUNT(kolon), COALESCE. |
| 4 | [Gruplama](index.html#gruplama) | GROUP BY, toplama fonksiyonları, WHERE ile HAVING, GROUP BY dışı kolon, tamsayı bölmesi. |
| 5 | [Alt sorgu, EXISTS, CTE, CASE](index.html#alt-sorgu) | Skaler ve korelasyonlu alt sorgu, IN ile EXISTS, WITH, CASE WHEN. |
| 6 | [UNION, INTERSECT, EXCEPT](index.html#kume) | Tekrar atma farkı, kolon uyumu. |
| 7 | [Window fonksiyonları](index.html#window) | ROW_NUMBER / RANK / DENSE_RANK tablosu, PARTITION BY, LAG/LEAD, OVER ile toplam. |
| 8 | [Klasik mülakat soruları](index.html#klasik-sorular) | Hayalî örnek tablo üzerinde ikinci ve N. en yüksek maaş, tekrar edenleri bulma/silme, departman başına en yüksek, siparişsiz müşteriler, çalışan–yönetici, her gruptan ilk kayıt. |
| 9 | [Veri değiştirme](index.html#veri-degistirme) | INSERT, UPDATE, DELETE / TRUNCATE / DROP, UPSERT, başka tablodan UPDATE. |
| 10 | [Şema](index.html#sema) | Kısıtlar, ON DELETE CASCADE, 1NF/2NF/3NF, index, clustered / nonclustered, view. |
| 11 | [Transaction ve ACID](index.html#transaction) | İzolasyon seviyeleri tablosu ve motorlara göre varsayılanlar. |
| 12 | [SQLite'a özel notlar](index.html#sqlite) | Önce sınav motorunu belirleme (Durum → Ne yap, dört motorun sürüm sorgusu); motor SQLite ise `;` zorunluluğu, sürüm sınırları, TRUNCATE yokluğu, tür yakınlığı, LIKE, tarih fonksiyonları, FULL JOIN taklidi. |
| 13 | [Lehçe farkları](index.html#lehceler) | SQLite / PostgreSQL / SQL Server / MySQL kısa karşılaştırma tablosu. |
| 14 | [Mülakat günü kontrol listesi (online test)](index.html#kontrol-listesi) | Otomatik değerlendirilen online SQL testi için 10 madde; canlı ya da yüz yüze mülakatta gerekmeyebilecek maddeler belirtilir. |
| 15 | [Hızlı tekrar](index.html#cheat-sheet) | Tek ekranlık özet. |
| 16 | [Kaynakça](index.html#kaynakca) | SQLite, PostgreSQL, Microsoft Learn ve MySQL resmî belgeleri. |

## İlgili konular

- [Mülakat Hazırlığı](../Mulakat-Hazirligi/) — Kardeş rehber: mülakat türleri, online test taktikleri, teknik konuların kısa soru–cevapları (kısa bir SQL özeti dahil), davranışsal sorular ve kontrol listesi.
- [C# / .NET → Veri Erişimi](../../Programlama/CSharp-DotNet/03-veri-erisimi/) — İlişkisel veritabanı temelleri, SQL Server ve T-SQL, EF Core ve Dapper; SQL'in .NET uygulamasından kullanımı.
- [Java → Veri ve Mesajlaşma](../../Programlama/Java/03-veri-ve-mesajlasma/) — JDBC, JPA/Hibernate, Spring Data JPA ve migration; SQL'in Java uygulamasından kullanımı.
- [Programlama · Mülakatta sık sorulanlar](../../Programlama/index.html#mulakatta-sik) — Teknolojilerin mülakatta sorulma sıklığı; SQL, dilden bağımsız temel konular arasında.

## Kaynakça

Erişim: 29 Ekim 2026 (son sekiz kaynak: 6 Kasım 2026). Güven etiketleriyle tam liste: [arastirma.md](arastirma.md) → "Kaynakça".

- SQLite — Release History: https://www.sqlite.org/changes.html
- SQLite — UPDATE: https://www.sqlite.org/lang_update.html
- SQLite — Window Functions: https://www.sqlite.org/windowfunctions.html
- SQLite — UPSERT: https://www.sqlite.org/lang_upsert.html
- SQLite — DELETE: https://www.sqlite.org/lang_delete.html
- SQLite — Expressions: https://www.sqlite.org/lang_expr.html
- SQLite — Datatypes: https://www.sqlite.org/datatype3.html
- SQLite — SELECT: https://www.sqlite.org/lang_select.html
- SQLite — Foreign Keys: https://www.sqlite.org/foreignkeys.html
- SQLite — Date and Time Functions: https://www.sqlite.org/lang_datefunc.html
- SQLite — Quirks: https://www.sqlite.org/quirks.html
- SQLite — Isolation: https://www.sqlite.org/isolation.html
- PostgreSQL — Transaction Isolation: https://www.postgresql.org/docs/current/transaction-iso.html
- PostgreSQL — INSERT / ON CONFLICT: https://www.postgresql.org/docs/current/sql-insert.html
- PostgreSQL — Window Functions: https://www.postgresql.org/docs/current/tutorial-window.html
- Microsoft Learn — SET TRANSACTION ISOLATION LEVEL: https://learn.microsoft.com/en-us/sql/t-sql/statements/set-transaction-isolation-level-transact-sql
- Microsoft Learn — ORDER BY (OFFSET FETCH): https://learn.microsoft.com/en-us/sql/t-sql/queries/select-order-by-clause-transact-sql
- Microsoft Learn — Clustered and nonclustered indexes: https://learn.microsoft.com/en-us/sql/relational-databases/indexes/clustered-and-nonclustered-indexes-described
- MySQL 8.4 — InnoDB Transaction Isolation Levels: https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html
- MySQL 8.4 — Server SQL Modes: https://dev.mysql.com/doc/refman/8.4/en/sql-mode.html
- SQLite — Built-In Scalar SQL Functions (`sqlite_version()`): https://www.sqlite.org/lang_corefunc.html
- PostgreSQL — System Information Functions (`version()`): https://www.postgresql.org/docs/current/functions-info.html
- Microsoft Learn — @@VERSION (Transact-SQL): https://learn.microsoft.com/en-us/sql/t-sql/functions/version-transact-sql-configuration-functions
- MySQL 8.4 — Information Functions (`VERSION()`): https://dev.mysql.com/doc/refman/8.4/en/information-functions.html
- MySQL 8.4 — Problems with Column Aliases: https://dev.mysql.com/doc/refman/8.4/en/problems-with-alias.html
- PostgreSQL — TRUNCATE: https://www.postgresql.org/docs/current/sql-truncate.html
- Microsoft Learn — TRUNCATE TABLE (Transact-SQL): https://learn.microsoft.com/en-us/sql/t-sql/statements/truncate-table-transact-sql
- MySQL 8.4 — TRUNCATE TABLE Statement: https://dev.mysql.com/doc/refman/8.4/en/truncate-table.html

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
