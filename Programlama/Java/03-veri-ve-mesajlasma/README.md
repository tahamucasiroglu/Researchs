# Veri ve Mesajlaşma

Java'da veri erişiminin en alt katmanı JDBC'dir. Onun üzerinde standart ORM tanımı JPA, JPA'nın en yaygın uygulaması da Hibernate durur (EF Core'un karşılığı). Spring Data JPA, arayüz tanımından sorgu üreten repository'lerle işi daha da kısaltır. Sık yapılan hatalar; ilişkilerin yüklenme biçimi (lazy/eager), N+1 sorgu sorunu ve persistence context'in transaction sınırlarıyla ilişkisidir. Şema değişiklikleri Flyway veya Liquibase ile yönetilir.

Mesajlaşma tarafında Kafka, RabbitMQ ve Spring Cloud Stream (MassTransit'e en yakın soyutlama) ele alınır. Outbox, saga, retry ve circuit breaker gibi dağıtık kalıplar da sayfada yer alır.

## Sayfadaki ana başlıklar

1. JDBC temelleri
2. JPA ve Hibernate — eşleme (mapping)
3. İlişkiler, yükleme ve N+1
4. Persistence context, transaction ve kilitleme
5. Sorgulama: JPQL, Criteria, native, projection
6. Spring Data JPA
7. Şema göçü (migration)
8. JPA dışı veri erişimi
9. NoSQL ve önbellek
10. Mesajlaşma
11. Dağıtık kalıplar ve dayanıklılık
12. Zamanlanmış işler
13. Hızlı çeviri sözlüğü: .NET → Java

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

Resmi kaynak: [Hibernate ORM belgeleri](https://hibernate.org/orm/documentation/) · [Spring Data JPA](https://spring.io/projects/spring-data-jpa)

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../README.md)
