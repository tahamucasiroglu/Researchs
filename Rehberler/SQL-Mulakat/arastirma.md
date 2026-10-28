# SQL Mülakat Rehberi — kısa, net, anahtar kelimeli

- **Araştırma tarihi:** 29 Ekim 2026 (güncelleme 6 Kasım 2026: sınav motorunu belirleme notu — Bölüm 12 ve 14 — eklendi; MySQL'de WHERE alias'ı ve TRUNCATE kimlik sayacı bilgileri düzeltildi — Bölüm 1 ve 9; kaynak 21–28 eklendi)
- **Kapsam:** Mülakat ve online kodlama sınavlarında sık sorulan SQL konuları; standart SQL esas, lehçe farkları (SQLite, PostgreSQL, SQL Server, MySQL) ayrıca belirtilir.
- **Güven etiketleri:** RESMÎ (ürünün kendi belgesi) · ÖLÇÜLDÜ (Python `sqlite3` ile SQLite 3.50.4 üzerinde `:memory:` veritabanında çalıştırıldı) · TAHMİN (genel deneyim, kaynağa bağlanmadı).
- **Okuma biçimi:** Her konu = anahtar kelime + 1–3 satır + küçük örnek + **Tuzak**.

---

## 1. Sorgunun mantıksal çalışma sırası

Yazım sırası `SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT`; **çalışma sırası** farklıdır:

| Adım | Cümle | Ne yapar |
|---|---|---|
| 1 | `FROM` / `JOIN` | Tabloları birleştirir, ara tabloyu kurar |
| 2 | `WHERE` | Satırları süzer (toplama fonksiyonu yok) |
| 3 | `GROUP BY` | Satırları gruplar |
| 4 | `HAVING` | Grupları süzer (toplama fonksiyonu var) |
| 5 | `SELECT` | Kolonları hesaplar, alias verilir |
| 6 | `DISTINCT` | Tekrarları atar |
| 7 | `ORDER BY` | Sıralar (alias burada kullanılabilir) |
| 8 | `LIMIT` / `OFFSET` | İlk N satırı keser |

- **Tuzak:** `SELECT Maas*2 AS m … WHERE m > 10000` standart SQL'de hata verir (PostgreSQL, SQL Server; MySQL de reddeder — RESMÎ), çünkü alias 5. adımda doğar, WHERE 2. adımda çalışır. Çözüm: ifadeyi tekrar yaz ya da alt sorgu/CTE kullan. SQLite ise WHERE'de alias'ı kabul eder (ÖLÇÜLDÜ) — taşınabilir değil.
- **Tuzak:** `ORDER BY` alias görür, `WHERE` görmez. `HAVING`'de alias PostgreSQL/SQL Server'da çalışmaz; MySQL alias'ı `GROUP BY`, `HAVING` ve `ORDER BY`'da kabul eder (RESMÎ).

---

## 2. JOIN'ler ve "kaç satır gelir?" — EN ÖNEMLİ BÖLÜM

### 2.1 Örnek veri

```sql
CREATE TABLE Ogrenci (Id INTEGER PRIMARY KEY, Ad TEXT);
INSERT INTO Ogrenci VALUES (1, 'Ali'), (2, 'Ayse');      -- Ali kurs almış, Ayse almamış

CREATE TABLE OgrenciKurs (OgrenciId INTEGER, Kurs TEXT);
INSERT INTO OgrenciKurs VALUES (1, 'C#'), (1, 'SQL');    -- yalnız Ali'nin 2 kursu
```

Ortak gövde: `SELECT o.Ad, k.Kurs FROM Ogrenci o <JOIN> OgrenciKurs k ON k.OgrenciId = o.Id;`

### 2.2 Sonuçlar (hepsi ÖLÇÜLDÜ)

| JOIN | Sonuç | Satır |
|---|---|---|
| `INNER JOIN` (= `JOIN`) | Ali–C#, Ali–SQL | **2** |
| `LEFT JOIN` (= `LEFT OUTER JOIN`) | Ali–C#, Ali–SQL, Ayse–NULL | **3** |
| `RIGHT JOIN` (= `RIGHT OUTER JOIN`) | Ali–C#, Ali–SQL | **2** (sağdaki her satırın eşi var) |
| `FULL OUTER JOIN` | Ali–C#, Ali–SQL, Ayse–NULL | **3** |
| `CROSS JOIN` (ON yok) | Ali–C#, Ali–SQL, Ayse–C#, Ayse–SQL | **4** = 2×2 |

- **INNER:** yalnız iki tarafta da eşi olan satırlar.
- **LEFT:** soldaki her satır en az bir kez gelir; eşi yoksa sağ kolonlar **NULL**.
- **RIGHT:** LEFT'in aynası; `A RIGHT JOIN B` = `B LEFT JOIN A` (kolon sırası hariç).
- **FULL OUTER:** LEFT ∪ RIGHT; iki taraftaki eşsizler de NULL'la gelir.
- **CROSS:** Kartezyen çarpım, her satır × her satır.
- Anahtar cümleler: "`LEFT JOIN` ile `LEFT OUTER JOIN` aynıdır." "`JOIN` tek başına `INNER JOIN` demektir." "`OUTER` kelimesi isteğe bağlıdır."

### 2.3 Satır sayısı formülleri (A solda a satır, B sağda b satır)

| JOIN | Alt sınır | Üst sınır |
|---|---|---|
| INNER | 0 | a×b (hepsi aynı anahtar) |
| LEFT | **a** (her sol satır en az 1 kez) | a×b |
| RIGHT | **b** | a×b |
| FULL | max(a, b) | a×b; eşleşme yoksa a+b |
| CROSS | a×b | a×b |

- Anahtar tek tarafta benzersizse (ör. PK–FK): `INNER ≤ çok taraf`, `LEFT (çok taraf solda) = çok taraf satırı`.
- **Çoklu eşleşme çoğaltır:** soldaki bir satır sağda 3 satırla eşleşirse 3 satır olur. Sol 2 tane `1`, sağ 3 tane `1` → INNER **6** satır (ÖLÇÜLDÜ).
- **NULL anahtar eşleşmez:** `NULL = NULL` doğru değildir; iki tarafta NULL olsa da INNER'da gelmez.

### 2.4 Anti-join: "eşi olmayanlar"

```sql
SELECT o.Ad
FROM Ogrenci o
LEFT JOIN OgrenciKurs k ON k.OgrenciId = o.Id
WHERE k.OgrenciId IS NULL;          -- Ayse (1 satır)
```

Aynı iş: `WHERE NOT EXISTS (SELECT 1 FROM OgrenciKurs k WHERE k.OgrenciId = o.Id)`.
**Tuzak:** NULL kontrolünü sağ tablonun **NOT NULL olan** kolonunda (tercihen join anahtarı ya da PK) yap; zaten NULL olabilen bir kolonda yanlış sonuç verir.

### 2.5 Klasik tuzak: koşul ON'da mı WHERE'de mi?

```sql
-- A) Koşul ON'da: sol taraf korunur
SELECT o.Ad, k.Kurs FROM Ogrenci o
LEFT JOIN OgrenciKurs k ON k.OgrenciId = o.Id AND k.Kurs = 'SQL';
-- Ali–SQL, Ayse–NULL  → 2 satır

-- B) Koşul WHERE'de: LEFT JOIN fiilen INNER'a döner
SELECT o.Ad, k.Kurs FROM Ogrenci o
LEFT JOIN OgrenciKurs k ON k.OgrenciId = o.Id
WHERE k.Kurs = 'SQL';
-- Ali–SQL → 1 satır  (Ayse'nin Kurs'u NULL, NULL = 'SQL' doğru değil)
```

Kural: **sağ tabloya ait süzgeç ON'a**, sonucun tamamına ait süzgeç WHERE'e. INNER JOIN'de fark yoktur.

### 2.6 SELF JOIN

Tablo kendisiyle birleşir; iki farklı alias şart.

```sql
SELECT c.Ad AS Calisan, y.Ad AS Yonetici
FROM Calisan c
LEFT JOIN Calisan y ON y.Id = c.YoneticiId;
```

5 çalışan, biri yöneticisiz → LEFT ile 5 satır, INNER ile 4 satır (en üstteki yönetici düşer) (ÖLÇÜLDÜ).

### 2.7 Üç tablo

`Kurs` tablosu: C#, SQL, Python (Python'u kimse almamış). Ara tablo `OK2(OgrenciId, KursId)` = (1,1), (1,2).

| Sorgu | Sonuç | Satır |
|---|---|---|
| `Ogrenci LEFT JOIN OK2 … LEFT JOIN Kurs …` | Ali–C#, Ali–SQL, Ayse–NULL | 3 |
| `Ogrenci JOIN OK2 … RIGHT JOIN Kurs …` | Ali–C#, Ali–SQL, NULL–Python | 3 |
| `Ogrenci LEFT JOIN OK2 … FULL JOIN Kurs …` | Ali–C#, Ali–SQL, Ayse–NULL, NULL–Python | 4 |

**Tuzak:** LEFT JOIN zincirinde ortada bir `INNER JOIN` (ya da sağ tabloya WHERE koşulu) gelirse soldaki eşsiz satırlar yine düşer.

### 2.8 COUNT ve LEFT JOIN

```sql
SELECT o.Ad, COUNT(k.Kurs) AS KursSayisi, COUNT(*) AS SatirSayisi
FROM Ogrenci o LEFT JOIN OgrenciKurs k ON k.OgrenciId = o.Id
GROUP BY o.Ad;
-- Ali 2 2 · Ayse 0 1
```

**Tuzak:** "kurs sayısı" için `COUNT(*)` Ayse'ye 1 verir; `COUNT(sag.kolon)` NULL'ı saymaz → 0.

### 2.9 Alıştırmalar — kaç satır gelir? (hepsi ÖLÇÜLDÜ)

Veri: yukarıdaki `Ogrenci` (2), `OgrenciKurs` (2), `Kurs` (3), `OK2` (2). Ayrıca `A(x)` = 1, 1, 2, NULL ve `B(x)` = 1, 1, 1, 3, NULL.

1. `Ogrenci INNER JOIN OgrenciKurs` → **2**
2. `Ogrenci LEFT JOIN OgrenciKurs` → **3**
3. `Ogrenci LEFT JOIN OgrenciKurs … WHERE k.OgrenciId IS NULL` → **1** (Ayse)
4. `Ogrenci CROSS JOIN Kurs` → **6** (2×3)
5. `Kurs LEFT JOIN OK2 ON x.KursId = k.Id` → **3** (C#, SQL, Python–NULL)
6. `A INNER JOIN B ON A.x = B.x` → **6** (2 × 3 tane `1`; NULL'lar eşleşmez)
7. `A LEFT JOIN B ON A.x = B.x` → **8** (6 + `2`–NULL + NULL–NULL)
8. `A FULL JOIN B ON A.x = B.x` → **10** (8 + B'nin eşsiz `3` ve NULL'ı)
9. `A CROSS JOIN B` → **20** (4×5)
10. Bölüm 2.5'teki A ve B sorguları → **2** ve **1**

---

## 3. Filtreleme ve NULL mantığı

| Anahtar | Kısaca | Örnek |
|---|---|---|
| `AND` / `OR` | `AND` önce bağlar | `a OR b AND c` = `a OR (b AND c)` |
| `IN` | listeden biri | `Dept IN ('IT','IK')` |
| `BETWEEN` | **uçlar dahil** | `Maas BETWEEN 7000 AND 9000` = `>= 7000 AND <= 9000` |
| `LIKE` | `%` = 0+ karakter, `_` = tam 1 karakter | `Ad LIKE 'A_i%'` |
| `IS NULL` | NULL testi | `YoneticiId IS NULL` (asla `= NULL`) |
| `COALESCE(a,b,…)` | ilk NULL olmayan | `COALESCE(Telefon, '-')` |

- **Tuzak (öncelik):** `WHERE Dept='IK' OR Dept='IT' AND Maas>8000` → örnekte 4 satır; `(Dept='IK' OR Dept='IT') AND Maas>8000` → 2 satır (ÖLÇÜLDÜ). Parantez koy.
- **Üç değerli mantık:** TRUE / FALSE / UNKNOWN. `NULL = NULL` → NULL (bilinmez), WHERE yalnız TRUE'yu geçirir.
- **NOT IN + NULL tuzağı:** alt sorgu tek bir NULL döndürürse `x NOT IN (…)` hiçbir satırda TRUE olmaz → **0 satır**. "Yönetici olmayan çalışanlar" `NOT IN (SELECT YoneticiId …)` ile 0, `NOT EXISTS` ile 3 satır döndü (ÖLÇÜLDÜ; SQLite belgesindeki IN/NOT IN tablosu, RESMÎ). Çözüm: `NOT EXISTS` ya da `WHERE YoneticiId IS NOT NULL`.
- **COUNT(*) vs COUNT(kolon):** `COUNT(*)` bütün satırları, `COUNT(kolon)` NULL olmayanları, `COUNT(DISTINCT kolon)` farklı NULL-dışı değerleri sayar. Örnek: 5 çalışan, `COUNT(*)`=5, `COUNT(YoneticiId)`=4.
- **Toplama fonksiyonları NULL'ı atlar:** `AVG(kolon)` NULL'ları paydaya katmaz.
- NULL ile aritmetik/birleştirme NULL verir: `'abc' || NULL` → NULL (ÖLÇÜLDÜ).

---

## 4. Gruplama

- `GROUP BY` satırları gruplar; toplama fonksiyonları: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`.
- **WHERE vs HAVING:** WHERE gruplamadan **önce** satırı, HAVING **sonra** grubu süzer. `WHERE COUNT(*) > 1` hatadır.

```sql
SELECT Dept, COUNT(*) AS Kisi, AVG(Maas) AS Ort
FROM Calisan
WHERE Maas > 0
GROUP BY Dept
HAVING COUNT(*) > 2;
```

- **Tuzak:** SELECT'teki her kolon ya GROUP BY'da ya da bir toplama fonksiyonunun içinde olmalı. `SELECT Dept, Ad, MAX(Maas) … GROUP BY Dept` PostgreSQL/SQL Server'da hata, MySQL'de `ONLY_FULL_GROUP_BY` açıkken hata. SQLite kabul eder ("bare column") ve `MAX`/`MIN` varsa o satırın değerini verir — eşitlikte yalnız birini gösterir (ÖLÇÜLDÜ: IT'de iki kişi 9000 alıyor, tek satır geldi). Mülakatta buna güvenme; window fonksiyonu ya da alt sorgu yaz.
- **Tuzak:** Tamsayı bölmesi: `5/2` = 2 (SQLite, PostgreSQL, SQL Server); `5/2.0` = 2.5. Oran hesaplarken `* 1.0` ya da `CAST(… AS REAL/DECIMAL)`. (MySQL'de `/` ondalık verir, `DIV` tamsayı.)

---

## 5. Alt sorgu, EXISTS, CTE, CASE

- **Skaler alt sorgu:** tek değer döner. `WHERE Maas > (SELECT AVG(Maas) FROM Calisan)`.
- **IN vs EXISTS:** `IN` değer listesine bakar; `EXISTS` "en az bir satır var mı"ya bakar, NULL'dan etkilenmez. Modern iyileştiriciler çoğu zaman ikisini aynı plana çevirir; fark asıl **NOT IN + NULL**'da.
- **Korelasyonlu alt sorgu:** dıştaki satıra bağlıdır, mantıksal olarak her satır için yeniden çalışır.

```sql
SELECT Dept, Ad, Maas FROM Calisan c
WHERE Maas = (SELECT MAX(Maas) FROM Calisan x WHERE x.Dept = c.Dept);
```

- **CTE (`WITH`):** adlandırılmış geçici sonuç; okunabilirlik, aynı alt sorguyu tekrar yazmama. `WITH RECURSIVE` ağaç/hiyerarşi için.

```sql
WITH DeptOrt AS (SELECT Dept, AVG(Maas) AS Ort FROM Calisan GROUP BY Dept)
SELECT c.Ad FROM Calisan c JOIN DeptOrt d ON d.Dept = c.Dept WHERE c.Maas > d.Ort;
```

- **CASE WHEN:** koşullu değer; `ELSE` yoksa NULL döner. Koşullu sayım: `SUM(CASE WHEN Maas > 8000 THEN 1 ELSE 0 END)`.

```sql
SELECT Ad, CASE WHEN Maas >= 9000 THEN 'yuksek'
                WHEN Maas >= 7000 THEN 'orta'
                ELSE 'dusuk' END AS Seviye
FROM Calisan;
```

- **Tuzak:** CASE ilk doğru dalda durur; dalların sırası önemli.

---

## 6. Küme işlemleri

| Anahtar | Ne yapar |
|---|---|
| `UNION` | Birleştirir, **tekrarları atar** (sıralama/ayıklama maliyeti) |
| `UNION ALL` | Birleştirir, tekrarları korur, daha hızlı |
| `INTERSECT` | İki sonucun ortak satırları |
| `EXCEPT` | Birincide olup ikincide olmayan (Oracle'da `MINUS`) |

- Kolon sayısı ve uyumlu türler aynı olmalı; kolon adları **ilk** sorgudan gelir; `ORDER BY` en sona bir kez yazılır.
- Örnek: aynı tablo kendisiyle `UNION` → 2 farklı departman; `UNION ALL` → 10 satır (ÖLÇÜLDÜ).
- `SELECT Id FROM Ogrenci EXCEPT SELECT OgrenciId FROM OgrenciKurs` → 2 (Ayse): anti-join'in kısa hâli.
- **Tuzak:** JOIN kolon ekler (yatay), UNION satır ekler (dikey).

---

## 7. Window fonksiyonları

Satırları **gruplamadan** grup bilgisi ekler: `fonksiyon() OVER (PARTITION BY … ORDER BY …)`.

| Ad | Maas | ROW_NUMBER | RANK | DENSE_RANK |
|---|---|---|---|---|
| A | 9000 | 1 | 1 | 1 |
| E | 9000 | 2 | 1 | 1 |
| B | 7000 | 3 | 3 | 2 |
| C | 7000 | 4 | 3 | 2 |
| D | 5000 | 5 | 5 | 3 |

(ÖLÇÜLDÜ, `ORDER BY Maas DESC`.)

- `ROW_NUMBER`: hep benzersiz 1,2,3… (eşitlikte sıra belirsiz → ikinci sıralama kolonu ekle).
- `RANK`: eşitler aynı numara, sonra **boşluk** (1,1,3).
- `DENSE_RANK`: eşitler aynı numara, **boşluksuz** (1,1,2). "N. en yüksek farklı maaş" = DENSE_RANK.
- `PARTITION BY`: numaralamayı grup başına sıfırlar.
- `LAG(kolon)` / `LEAD(kolon)`: önceki / sonraki satırın değeri (ilk satırda NULL).
- `SUM(Maas) OVER (PARTITION BY Dept)`: her satırın yanında departman toplamı; `SUM(Maas) OVER (ORDER BY Tarih)`: kümülatif toplam.
- **Tuzak:** Window fonksiyonu WHERE'de kullanılamaz (SELECT adımında hesaplanır) → alt sorgu/CTE içine al, dışarıda süz.
- **Tuzak:** `GROUP BY` satır sayısını azaltır, `OVER` azaltmaz.

---

## 8. Klasik mülakat soruları

Örnek tablo (hayalî veri): `Calisan(Id, Ad, YoneticiId, Dept, Maas)` — A 9000 IT, B 7000 IT, C 7000 IK, D 5000 IK, E 9000 IT.

### 8.1 İkinci en yüksek maaş (üç yol, hepsi 7000 — ÖLÇÜLDÜ)

```sql
-- 1) Alt sorgu + MAX (her lehçede)
SELECT MAX(Maas) FROM Calisan WHERE Maas < (SELECT MAX(Maas) FROM Calisan);

-- 2) DISTINCT + LIMIT/OFFSET (SQLite, PostgreSQL, MySQL)
SELECT DISTINCT Maas FROM Calisan ORDER BY Maas DESC LIMIT 1 OFFSET 1;
--    SQL Server: ... ORDER BY Maas DESC OFFSET 1 ROWS FETCH NEXT 1 ROWS ONLY;

-- 3) DENSE_RANK
SELECT DISTINCT Maas FROM (
  SELECT Maas, DENSE_RANK() OVER (ORDER BY Maas DESC) AS r FROM Calisan
) t WHERE r = 2;
```

**Tuzak:** `DISTINCT` unutulursa yol 2, eşit maaşlarda yine 9000 döndürür. İkinci yoksa yol 1 NULL döndürür (çoğu soru bunu ister), yol 2 boş sonuç.

### 8.2 N. en yüksek maaş

`DENSE_RANK … WHERE r = N` ya da `LIMIT 1 OFFSET N-1` (DISTINCT ile). Korelasyonlu klasik:

```sql
SELECT DISTINCT Maas FROM Calisan c1
WHERE 2 = (SELECT COUNT(DISTINCT Maas) FROM Calisan c2 WHERE c2.Maas >= c1.Maas);  -- N = 2
```

### 8.3 Tekrar eden kayıtlar — bul ve sil

```sql
SELECT Eposta, COUNT(*) FROM Musteri GROUP BY Eposta HAVING COUNT(*) > 1;

-- Her gruptan en küçük Id kalsın, gerisi silinsin
DELETE FROM Musteri
WHERE Id NOT IN (SELECT MIN(Id) FROM Musteri GROUP BY Eposta);
```

(ÖLÇÜLDÜ: a, b, a, c, a → silme sonrası 3 satır.) Burada `NOT IN` güvenli çünkü `MIN(Id)` NULL olamaz (Id PK). Alternatif: `ROW_NUMBER() OVER (PARTITION BY Eposta ORDER BY Id) > 1` olanları sil. MySQL'de aynı tabloyu alt sorguda okuyup silmek hata verir; alt sorguyu bir kat daha türetilmiş tabloya sar.

### 8.4 Departman başına en yüksek maaşlı kişi

```sql
SELECT Dept, Ad, Maas FROM (
  SELECT *, RANK() OVER (PARTITION BY Dept ORDER BY Maas DESC) AS r FROM Calisan
) t WHERE r = 1;
```

IK–C, IT–A, IT–E → **3 satır** (IT'de eşitlik var; ÖLÇÜLDÜ). Tek kişi istenirse `ROW_NUMBER`. Bölüm 5'teki korelasyonlu alt sorgu da aynı sonucu verir.

### 8.5 Hiç sipariş vermeyen müşteriler

```sql
SELECT m.* FROM Musteri m
LEFT JOIN Siparis s ON s.MusteriId = m.Id
WHERE s.Id IS NULL;
-- ya da: WHERE NOT EXISTS (SELECT 1 FROM Siparis s WHERE s.MusteriId = m.Id)
```

### 8.6 Çalışan – yönetici (SELF JOIN)

Bölüm 2.6. Ek soru: "yöneticisinden fazla kazananlar":

```sql
SELECT c.Ad FROM Calisan c JOIN Calisan y ON y.Id = c.YoneticiId WHERE c.Maas > y.Maas;
```

### 8.7 Her gruptan ilk kayıt

```sql
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY Dept ORDER BY Id) AS rn FROM Calisan
) t WHERE rn = 1;
```

IK–C, IT–A (ÖLÇÜLDÜ). "Son kayıt" için `ORDER BY Id DESC` ya da tarih kolonu.

---

## 9. Veri değiştirme

```sql
INSERT INTO Calisan (Ad, Dept, Maas) VALUES ('F', 'IT', 6000);   -- kolon listesini yaz
INSERT INTO Arsiv (Ad) SELECT Ad FROM Calisan WHERE Maas < 6000;
UPDATE Calisan SET Maas = Maas + 5 WHERE Id = 1;                 -- aritmetik: kolon = kolon + 5
DELETE FROM Calisan WHERE Id = 4;
```

- **Tuzak:** WHERE'siz `UPDATE`/`DELETE` bütün tabloyu değiştirir. Önce aynı WHERE ile `SELECT` çalıştır, sonra değiştir; gerçekte transaction içinde dene.
- **Tuzak:** `UPDATE … SET Maas = Maas * 1.1` tamsayı kolonda tür dönüşümüne dikkat.

| Komut | Ne siler | WHERE | Geri alma | Not |
|---|---|---|---|---|
| `DELETE` | Seçili satırlar | Var | Transaction içinde evet | DML, satır satır, trigger çalışır |
| `TRUNCATE` | Bütün satırlar | Yok | Lehçeye bağlı (PostgreSQL ve SQL Server'da transaction içinde geri alınabilir; MySQL'de örtük commit, geri alınamaz) — RESMÎ | DDL sayılır, hızlı. Kimlik sayacını SQL Server ve MySQL başa alır; PostgreSQL varsayılanda almaz (`CONTINUE IDENTITY`), `TRUNCATE … RESTART IDENTITY` yazmak gerekir — RESMÎ |
| `DROP` | Tablonun kendisi (şema + veri) | Yok | Lehçeye bağlı | Tablo artık yok |

- **UPSERT** (yoksa ekle, varsa güncelle):
  - SQLite / PostgreSQL: `INSERT … ON CONFLICT(kolon) DO UPDATE SET n = n + 1;` (`excluded.kolon` = eklenmek istenen değer) — SQLite 3.24.0'dan beri (RESMÎ).
  - MySQL: `INSERT … ON DUPLICATE KEY UPDATE …`
  - SQL Server: `MERGE` ya da `UPDATE` + `IF @@ROWCOUNT = 0 INSERT`.
- **UPDATE ile başka tablodan:** `UPDATE A SET v = B.v FROM B WHERE B.id = A.id;` (PostgreSQL, SQLite ≥ 3.33.0; SQL Server `UPDATE A SET … FROM A JOIN B …`; MySQL `UPDATE A JOIN B ON … SET …`).

---

## 10. Şema ve kısıtlar

| Anahtar | Kısaca |
|---|---|
| `PRIMARY KEY` | Satırı benzersiz tanımlar; benzersiz + NULL olamaz (SQLite'ta tarihsel istisna: INTEGER olmayan PK'da NULL kabul edebilir), tabloda bir tane |
| `FOREIGN KEY … REFERENCES` | Başka tablonun anahtarına bağ; olmayan değeri engeller |
| `ON DELETE CASCADE` | Üst satır silinince bağlı satırlar da silinir (`SET NULL`, `RESTRICT` diğer seçenekler) |
| `UNIQUE` | Tekrar yok; NULL'lar çoğu lehçede birden çok olabilir (SQL Server'da tek NULL) |
| `NOT NULL` | Boş bırakılamaz |
| `CHECK (Maas >= 0)` | Koşul |
| `DEFAULT 0` | Değer verilmezse |

- **SQLite tuzağı:** yabancı anahtar denetimi varsayılan kapalıdır; her bağlantıda `PRAGMA foreign_keys = ON;` (RESMÎ).
- **Normalizasyon:** 1NF = her hücrede tek (atomik) değer, tekrar eden grup yok · 2NF = 1NF + bileşik anahtarın **bir kısmına** bağlı kolon yok · 3NF = 2NF + anahtar olmayan kolona bağlı kolon yok (geçişli bağımlılık yok). Kısa hâli: "anahtara, anahtarın tamamına ve anahtardan başka hiçbir şeye bağlı."
- **Denormalizasyon:** okuma hızı için bilinçli tekrar (raporlama).
- **Index:** WHERE/JOIN/ORDER BY'da sık kullanılan, seçici kolonlarda okumayı hızlandırır; her INSERT/UPDATE/DELETE'te güncellendiği için yazmayı yavaşlatır ve yer kaplar. Kolonu fonksiyona sokmak (`WHERE UPPER(Ad) = …`) ya da `LIKE '%abc'` (başta joker) çoğu zaman index'i kullanamaz. Bileşik index'te soldan sağa sıra önemli.
- **Clustered vs nonclustered (SQL Server):** clustered = tablo verisinin kendisi o anahtara göre sıralı tutulur (tabloda bir tane); nonclustered = ayrı yapı, satıra işaret eder (birden çok).
- **View:** kaydedilmiş SELECT; veri tutmaz (materialized view hariç), güvenlik ve sadeleştirme için.

---

## 11. Transaction ve ACID

- `BEGIN` / `START TRANSACTION` → işlemler → `COMMIT` (kalıcı) ya da `ROLLBACK` (geri al). `SAVEPOINT` ile ara nokta.
- **ACID:** Atomicity (ya hepsi ya hiçbiri) · Consistency (kısıtlar korunur) · Isolation (eşzamanlı işler birbirini bozmaz) · Durability (commit edilen kalıcı).

| Seviye | Dirty read | Non-repeatable read | Phantom read |
|---|---|---|---|
| Read Uncommitted | Olabilir | Olabilir | Olabilir |
| Read Committed | Yok | Olabilir | Olabilir |
| Repeatable Read | Yok | Yok | Olabilir |
| Serializable | Yok | Yok | Yok |

- **Dirty read:** başkasının commit etmediği veriyi okumak. **Non-repeatable:** aynı satırı iki kez okuyunca farklı değer. **Phantom:** aynı koşulla iki kez sorgulayınca yeni satır belirmesi.
- Varsayılanlar (RESMÎ): PostgreSQL ve SQL Server **Read Committed**; MySQL InnoDB **Repeatable Read**. PostgreSQL'de Read Uncommitted, Read Committed gibi davranır; Repeatable Read'de phantom da oluşmaz. SQL Server'da ek olarak `SNAPSHOT` seviyesi var.

---

## 12. SQLite'a özel notlar (sınav motoru SQLite ise)

Online sınav platformları farklı veritabanı motorları kullanır (SQLite, PostgreSQL, MySQL, SQL Server…); motor çoğu zaman görev ekranında yazar ya da seçilebilir (TAHMİN). Önce motoru belirle:

- **Motor görevde yazıyor ya da seçilebiliyor →** o lehçeyle yaz; farklar Bölüm 13'te.
- **Motor yazmıyor →** sürüm sorgusunu dene: SQLite `SELECT sqlite_version();` · PostgreSQL `SELECT version();` · MySQL `SELECT VERSION();` · SQL Server `SELECT @@VERSION;` (RESMÎ). Hata vereni ele; birden fazlası çalışırsa karar çıktıya göre verilir: PostgreSQL'de "PostgreSQL …", SQL Server'da "Microsoft SQL …" diye başlar; MySQL'de sürüm numarasıyla başlar, sonunda `-standard` gibi bir ek olabilir, ör. `8.4.x` (RESMÎ). SQLite'ta `version()` ve `@@VERSION` hata verir (ÖLÇÜLDÜ).
- **Motor SQLite →** aşağıdaki tablo geçerli; sürüm 3.39.0'dan eskiyse RIGHT/FULL JOIN yerine LEFT JOIN (+ `UNION ALL`) yaz.
- **Motor bilinmiyor ve deneme imkânı yok →** her lehçede çalışan standart yolu seç (`COALESCE`, alt sorgu + `MAX`); `LIMIT`/`TOP`, `||`/`+` gibi lehçeye özgü yazımlardan kaçın.

| Konu | Bilgi | Kaynak |
|---|---|---|
| `;` zorunlu say | Test sistemi kendi kontrol sorgusunu kodunun arkasına ekleyebilir. Son komutta `;` yoksa iki komut birleşir ve `near "SELECT": syntax error` verir | TAHMİN (platformun sorgu eklemesi) + ÖLÇÜLDÜ (`UPDATE … WHERE Id=1` + yeni satırda `SELECT …` → bu hata) |
| UPDATE/DELETE görevinde fazladan SELECT | Sistem kendi SELECT'inin sonucunu karşılaştırır; senin eklediğin `SELECT *` çıktıyı bozabilir. Görev istemiyorsa ekleme | TAHMİN (sınav platformlarının genel davranışı) |
| `RIGHT JOIN`, `FULL OUTER JOIN` | **3.39.0** (2022-06-25) ile geldi. Eski sürümde: RIGHT → tabloları ters çevirip LEFT; FULL → `LEFT JOIN` + `UNION ALL` + sağdaki eşsizler | RESMÎ |
| `UPDATE … FROM` | **3.33.0** (2020-08-14) | RESMÎ |
| Window fonksiyonları | **3.25.0** (2018-09-15) | RESMÎ |
| UPSERT `ON CONFLICT DO UPDATE` | **3.24.0** (2018-06-04) | RESMÎ |
| `RETURNING` | **3.35.0** (2021-03-12) | RESMÎ |
| `TRUNCATE` | Yok (`near "TRUNCATE": syntax error`). `DELETE FROM t;` kullan; WHERE yoksa SQLite bunu kendisi hızlı "truncate optimizasyonu" ile yapar | RESMÎ + ÖLÇÜLDÜ |
| Satır sınırlama | `LIMIT n OFFSET m` (SQL Server: `TOP n`, `OFFSET m ROWS FETCH NEXT n ROWS ONLY`) | RESMÎ |
| Birleştirme | `'a' \|\| 'b'`; NULL ile sonuç NULL | RESMÎ + ÖLÇÜLDÜ |
| Tür yakınlığı (type affinity) | Kolon türü kesin değil; `'12'+0` → integer. `STRICT` tablo (3.37.0) katı tür ister | RESMÎ |
| `LIKE` | Varsayılan **yalnız ASCII'de** büyük/küçük harf duyarsız: `'a' LIKE 'A'` doğru, `'æ' LIKE 'Æ'` yanlış. Türkçe `İ/ı` gibi harfler de ASCII dışı | RESMÎ |
| Tarih | Ayrı tarih türü yok; metin/sayı tutulur. `date('2026-10-29','+1 day')` → `2026-10-30`, `strftime('%Y', tarih)` | RESMÎ + ÖLÇÜLDÜ |
| Tamsayı bölme | `5/2` = 2 | ÖLÇÜLDÜ |
| Alias / bare column | WHERE'de alias'a ve GROUP BY dışı kolona izin verir — başka veritabanında hata | ÖLÇÜLDÜ |
| Yabancı anahtar | `PRAGMA foreign_keys = ON;` olmadan denetlenmez | RESMÎ |
| Metin tırnağı | Metin için **tek tırnak** `'…'`; çift tırnak tanımlayıcı içindir (SQLite tarihsel olarak çift tırnaklı metni de kabul edebilir, güvenme) | RESMÎ |

FULL OUTER JOIN taklidi (eski SQLite / MySQL; ÖLÇÜLDÜ, 4 satır):

```sql
SELECT o.Ad, k.Ad FROM Ogrenci o
LEFT JOIN OK2 x ON x.OgrenciId = o.Id
LEFT JOIN Kurs k ON k.Id = x.KursId
UNION ALL
SELECT NULL, k.Ad FROM Kurs k
WHERE NOT EXISTS (SELECT 1 FROM OK2 x WHERE x.KursId = k.Id);
```

Sürüm öğrenmek: `SELECT sqlite_version();`

---

## 13. Lehçe farkları

| Konu | SQLite | PostgreSQL | SQL Server | MySQL |
|---|---|---|---|---|
| İlk N satır | `LIMIT n OFFSET m` | `LIMIT n OFFSET m` (+ `FETCH FIRST`) | `TOP n` / `OFFSET … FETCH` | `LIMIT m, n` ya da `LIMIT n OFFSET m` |
| Otomatik artan | `INTEGER PRIMARY KEY` (`AUTOINCREMENT` isteğe bağlı) | `GENERATED … AS IDENTITY` / `SERIAL` | `IDENTITY(1,1)` | `AUTO_INCREMENT` |
| Metin birleştirme | `\|\|` | `\|\|`, `CONCAT()` | `+`, `CONCAT()` | `CONCAT()` (`\|\|` varsayılanda OR anlamında) |
| NULL yerine değer | `IFNULL`, `COALESCE` | `COALESCE` | `ISNULL`, `COALESCE` | `IFNULL`, `COALESCE` |
| Şu an | `datetime('now')` | `NOW()` | `GETDATE()` | `NOW()` |
| Metin uzunluğu | `length()` | `length()` | `LEN()` | `CHAR_LENGTH()` / `LENGTH()` (bayt) |
| Upsert | `ON CONFLICT` | `ON CONFLICT` | `MERGE` | `ON DUPLICATE KEY UPDATE` |
| Varsayılan izolasyon | (Serializable, tek yazar) | Read Committed | Read Committed | Repeatable Read |

- `COALESCE` standarttır ve dördünde de var — emin değilsen onu kullan.

---

## 14. Mülakat günü kontrol listesi (online test)

Bu liste otomatik değerlendirilen online SQL testi içindir. Canlı ya da yüz yüze mülakatta platforma özgü maddeler (3, 7, 8, 9) gerekmeyebilir; diğer mülakat türleri için kardeş rehber: [Mülakat Hazırlığı](../Mulakat-Hazirligi/).

1. Şemayı ve **örnek çıktıyı** dikkatle oku: kolon adları, sırası, alias'lar birebir aynı olmalı.
2. Büyük/küçük harf ve boşluk: metin karşılaştırmaları ve çıktı başlıkları.
3. Her komutun sonuna `;`.
4. İstenen **sırayı** koru (`ORDER BY` istenmişse yaz, istenmemişse varsayma; ikincil sıralama kolonu ekle).
5. Örnek veri ≠ tam veri: sabit Id'ye göre değil **koşula göre** yaz (`WHERE Id = 3` değil `WHERE Ad = '…'` / `MAX(…)`); gizli testler farklı veriyle çalışır.
6. NULL, eşitlik (aynı maaş), boş tablo, tekrar eden değer durumlarını düşün.
7. UPDATE/DELETE görevinde istenmeyen fazladan SELECT ekleme.
8. Testleri çalıştır, **hata mesajını oku** (`near "X"` = hatanın X'in hemen önünde olduğu yer).
9. Motor ya da sürüm belirsizse sorgula (Bölüm 12): SQLite `SELECT sqlite_version();` · PostgreSQL `SELECT version();` · MySQL `SELECT VERSION();` · SQL Server `SELECT @@VERSION;`. SQLite 3.39.0'dan eskiyse RIGHT/FULL JOIN yerine LEFT ile yaz.
10. Süre kalırsa okunabilirlik: CTE, anlamlı alias, girintili yazım.

---

## 15. Hızlı tekrar (cheat sheet)

- Çalışma sırası: **FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT**.
- INNER = eşleşenler · LEFT ≥ sol satır sayısı · RIGHT ≥ sağ · FULL = LEFT ∪ RIGHT · CROSS = a×b.
- `LEFT JOIN` = `LEFT OUTER JOIN`; `JOIN` = `INNER JOIN`.
- Çoklu eşleşme çoğaltır (2 × 3 = 6). NULL anahtar eşleşmez.
- Anti-join: `LEFT JOIN … WHERE sag.anahtar IS NULL` ya da `NOT EXISTS`.
- Sağ tablo koşulu ON'a; WHERE'e yazarsan LEFT → INNER olur.
- `= NULL` değil `IS NULL`. `NOT IN` + NULL = boş sonuç → `NOT EXISTS`.
- `COUNT(*)` satır, `COUNT(kolon)` NULL-dışı.
- `BETWEEN` uçlar dahil. `AND` önce bağlar, parantez koy.
- WHERE satır, HAVING grup süzer; window fonksiyonu WHERE'de olmaz.
- ROW_NUMBER 1,2,3 · RANK 1,1,3 · DENSE_RANK 1,1,2.
- 2. en yüksek: `MAX(x) WHERE x < MAX`, `DISTINCT … LIMIT 1 OFFSET 1`, `DENSE_RANK = 2`.
- Grup başına en iyi: `RANK() OVER (PARTITION BY g ORDER BY x DESC) = 1`.
- Tekrar sil: `DELETE … WHERE Id NOT IN (SELECT MIN(Id) … GROUP BY k)`.
- `UNION` tekrarı atar, `UNION ALL` atmaz.
- DELETE (satır, WHERE) · TRUNCATE (hepsi, hızlı, SQLite'ta yok) · DROP (tablo gider).
- UPDATE/DELETE'ten önce aynı WHERE ile SELECT.
- ACID; Read Committed varsayılan (PG, SQL Server), Repeatable Read (MySQL InnoDB).
- SQLite: `;` · RIGHT/FULL ≥ 3.39.0 · UPDATE FROM ≥ 3.33.0 · window ≥ 3.25.0 · `||` · `LIMIT` · `PRAGMA foreign_keys=ON`.
- `5/2 = 2` → `5 * 1.0 / 2`.

---

## Kaynakça

Erişim tarihi: 29 Ekim 2026 (21–28: 6 Kasım 2026).

1. RESMÎ — SQLite Release History: https://www.sqlite.org/changes.html (3.39.0 RIGHT/FULL OUTER JOIN; 3.35.0 RETURNING; 3.37.0 STRICT)
2. RESMÎ — SQLite UPDATE: https://www.sqlite.org/lang_update.html ("UPDATE-FROM is supported beginning in SQLite version 3.33.0")
3. RESMÎ — SQLite Window Functions: https://www.sqlite.org/windowfunctions.html ("first added … 3.25.0 (2018-09-15)")
4. RESMÎ — SQLite UPSERT: https://www.sqlite.org/lang_upsert.html ("added … with version 3.24.0 (2018-06-04)")
5. RESMÎ — SQLite DELETE (truncate optimization): https://www.sqlite.org/lang_delete.html
6. RESMÎ — SQLite Expressions (LIKE ASCII, `||`, IN/NOT IN ve NULL): https://www.sqlite.org/lang_expr.html
7. RESMÎ — SQLite Datatypes / type affinity: https://www.sqlite.org/datatype3.html
8. RESMÎ — SQLite SELECT (LIMIT/OFFSET, bare columns): https://www.sqlite.org/lang_select.html
9. RESMÎ — SQLite Foreign Keys: https://www.sqlite.org/foreignkeys.html
10. RESMÎ — SQLite Date and Time Functions: https://www.sqlite.org/lang_datefunc.html
11. RESMÎ — SQLite Quirks (çift tırnak, PK'da NULL, esnek türler): https://www.sqlite.org/quirks.html
12. RESMÎ — SQLite Isolation In SQLite (varsayılan serializable): https://www.sqlite.org/isolation.html
13. RESMÎ — PostgreSQL Transaction Isolation: https://www.postgresql.org/docs/current/transaction-iso.html
14. RESMÎ — PostgreSQL INSERT / ON CONFLICT: https://www.postgresql.org/docs/current/sql-insert.html
15. RESMÎ — PostgreSQL Window Functions: https://www.postgresql.org/docs/current/tutorial-window.html
16. RESMÎ — Microsoft Learn, SET TRANSACTION ISOLATION LEVEL: https://learn.microsoft.com/en-us/sql/t-sql/statements/set-transaction-isolation-level-transact-sql
17. RESMÎ — Microsoft Learn, SELECT ORDER BY (OFFSET FETCH): https://learn.microsoft.com/en-us/sql/t-sql/queries/select-order-by-clause-transact-sql
18. RESMÎ — Microsoft Learn, Clustered and nonclustered indexes: https://learn.microsoft.com/en-us/sql/relational-databases/indexes/clustered-and-nonclustered-indexes-described
19. RESMÎ — MySQL 8.4, InnoDB Transaction Isolation Levels: https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html
20. RESMÎ — MySQL 8.4, Server SQL Modes (`PIPES_AS_CONCAT`, `ONLY_FULL_GROUP_BY`): https://dev.mysql.com/doc/refman/8.4/en/sql-mode.html
21. RESMÎ — SQLite Built-In Scalar SQL Functions (`sqlite_version()`): https://www.sqlite.org/lang_corefunc.html
22. RESMÎ — PostgreSQL System Information Functions (`version()`): https://www.postgresql.org/docs/current/functions-info.html
23. RESMÎ — Microsoft Learn, @@VERSION (Transact-SQL): https://learn.microsoft.com/en-us/sql/t-sql/functions/version-transact-sql-configuration-functions
24. RESMÎ — MySQL 8.4, Information Functions (`VERSION()`; değerin sonunda ek olabilir): https://dev.mysql.com/doc/refman/8.4/en/information-functions.html
25. RESMÎ — MySQL 8.4, Problems with Column Aliases (WHERE'de alias yok; GROUP BY / HAVING / ORDER BY'da var): https://dev.mysql.com/doc/refman/8.4/en/problems-with-alias.html
26. RESMÎ — PostgreSQL TRUNCATE (`CONTINUE IDENTITY` varsayılan, `RESTART IDENTITY`; transaction içinde geri alınır): https://www.postgresql.org/docs/current/sql-truncate.html
27. RESMÎ — Microsoft Learn, TRUNCATE TABLE (identity sayacı başa döner; transaction içinde geri alınabilir): https://learn.microsoft.com/en-us/sql/t-sql/statements/truncate-table-transact-sql
28. RESMÎ — MySQL 8.4, TRUNCATE TABLE Statement (AUTO_INCREMENT başa döner; örtük commit, geri alınamaz): https://dev.mysql.com/doc/refman/8.4/en/truncate-table.html
