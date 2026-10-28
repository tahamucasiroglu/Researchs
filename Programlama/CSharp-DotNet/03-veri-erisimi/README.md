# Veri Erişimi

Veri erişimi, uygulamanın veritabanıyla nasıl konuştuğunu kapsar. .NET'te en yaygın yol, nesneleri tablolara eşleyen ORM (Object-Relational Mapper) **Entity Framework Core**'dur: LINQ ile yazılan sorgular SQL'e çevrilir, şema değişiklikleri migration'larla yönetilir. Performansın kritik olduğu yerlerde ham SQL sonucunu doğrudan nesnelere eşleyen **Dapper** gibi mikro-ORM'ler tercih edilir. İlişkisel veritabanı temelleri (indeks, transaction, izolasyon seviyeleri), NoSQL veritabanları ve **Redis** gibi bellek içi veri depolarıyla önbellekleme de bu alanın parçasıdır.

Bu sayfa ORM'in derinliklerini, ham SQL'i, migration stratejilerini, sorgu performansını ve önbelleklemeyi listeler. Redis'in kavramsal anlatımı burada başlar; Redis ile yapılan uygulamalı denemeler [Kütüphaneler](../10-kutuphaneler/) bölümüne eklenir.

## Sayfadaki ana başlıklar

- İlişkisel veritabanı temelleri
- SQL Server ve T-SQL
- EF Core — çekirdek kavramlar
- EF Core — sorgulama ve performans
- EF Core — migration ve şema yönetimi
- Dapper ve mikro-ORM alternatifleri
- İlişkisel veritabanı motorları
- NoSQL ve özel amaçlı veritabanları
- Redis — derinlemesine
- Önbellekleme stratejileri
- Veri erişim kalıpları
- Migration ve veri taşıma araçları
- Performans ve profilleme

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

## İlgili konular

- [SQL Mülakat Rehberi](../../../Rehberler/SQL-Mulakat/) — EF Core'un ürettiği SQL'i okumak için: JOIN satır sayıları, NULL mantığı, window fonksiyonları, klasik mülakat soruları ve SQL Server dahil lehçe farkları.

Resmî kaynak: [EF Core dokümantasyonu](https://learn.microsoft.com/ef/core/)

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../README.md)
