# Test ve Kod Kalitesi

Otomatik testler, kodun beklendiği gibi çalıştığını her değişiklikte yeniden doğrular. **Birim testi** tek bir sınıfı ya da metodu dış bağımlılıklarından yalıtarak sınar; bu yalıtım, gerçek nesnelerin yerine geçen **mock**, stub ve fake gibi test double'larıyla sağlanır. **Entegrasyon testi** ise bileşenleri gerçek veritabanı veya HTTP katmanıyla birlikte dener (ör. Testcontainers, `WebApplicationFactory`). .NET'te xUnit, NUnit ve MSTest test çatıları; Moq ve NSubstitute mock kütüphaneleri yaygındır. Kod kalitesi tarafında statik analiz, Roslyn analyzer'ları ve performans ölçümü için BenchmarkDotNet kullanılır.

Bu sayfa "mock test nedir?" sorusundan başlayarak test türlerini, araçlarını ve TDD/BDD gibi yaklaşımları sıralar.

## Sayfadaki ana başlıklar

- Test türleri
- Test çatıları ve koşucular
- Mock kavramı ve test double türleri
- Assertion (doğrulama) kütüphaneleri
- Test verisi üretimi
- Entegrasyon testi
- E2E ve UI testi
- TDD ve BDD
- BenchmarkDotNet ve performans ölçümü
- Yük testi ve teşhis araçları
- Kod kalitesi araçları
- Kod inceleme ve ekip pratikleri

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

Resmî kaynak: [.NET'te test (Microsoft Learn)](https://learn.microsoft.com/dotnet/core/testing/)

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../README.md)
