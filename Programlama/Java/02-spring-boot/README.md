# Spring Boot

Spring, Java'nın en yaygın uygulama çatısıdır; çekirdeğinde bağımlılık enjeksiyonu yapan bir IoC container bulunur. Spring Boot bunun üzerine "auto-configuration" ve "starter" bağımlılıkları ekleyerek uygulamayı az yapılandırmayla ayağa kaldırır; Java dünyasında ASP.NET Core'un karşılığı gibi düşünülebilir. Bean'ler anotasyonlarla (`@Component`, `@Service`, `@RestController`) tanımlanır, yapılandırma `application.yml` ve profillerle yönetilir.

Önemli bir ayrıntı: `@Transactional` gibi anotasyonlar proxy tabanlı AOP ile çalışır, bu yüzden aynı sınıfın içinden yapılan çağrıda devreye girmez. Sayfa, "gerçekte nasıl çalışıyor" türündeki bu konuları her başlığın ASP.NET Core karşılığıyla birlikte verir.

## Sayfadaki ana başlıklar

1. Spring çekirdeği: IoC container ve bean yaşam döngüsü
2. Bean tanımlama ve enjeksiyon anotasyonları
3. Spring Boot: auto-configuration ve starter'lar
4. Yapılandırma: properties, YAML, profile
5. Actuator: health, metrics, info
6. Web katmanı: controller, routing, serileştirme
7. Hata yönetimi ve doğrulama
8. Filter, interceptor, CORS
9. WebFlux ve reaktif programlama
10. Spring Security
11. AOP ve `@Transactional`'ın gerçekte nasıl çalıştığı
12. Test: slice testleri, MockMvc, Testcontainers
13. Diğer Spring projeleri ve Spring Cloud
14. Alternatif çatılar: Spring dışındaki dünya (Quarkus, Micronaut vb.)

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

Resmi kaynak: [Spring Boot belgeleri](https://docs.spring.io/spring-boot/) · [Spring Guides](https://spring.io/guides)

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../README.md)
