# Platform ve Web API

.NET, uygulamaları çalıştıran runtime (CLR), temel sınıf kütüphanesi ve SDK'dan oluşan açık kaynak, çok platformlu bir geliştirme platformudur. ASP.NET Core ise bunun üzerinde web uygulamaları ve HTTP API'leri yazmak için kullanılan çatıdır. Uygulamaya gelen bir istek host ve Kestrel sunucusu tarafından karşılanır, middleware zincirinden (pipeline) geçer, routing ile ilgili controller'a ya da minimal API endpoint'ine yönlendirilir ve yanıta dönüşür. Bu akışın her katmanında dependency injection, configuration/options ve kimlik doğrulama gibi ortak altyapılar devrededir.

Bu sayfa, uygulamanın ayağa kalkışından isteğin yanıta dönüşmesine kadar geçen tüm katmanları sıralar.

## Sayfadaki ana başlıklar

- Runtime ve platform
- Barındırma ve sunucu
- Uygulama başlangıcı ve host
- Dependency Injection
- Configuration ve Options
- Middleware ve pipeline
- Routing ve endpoint
- Web API: controller ve minimal API
- OpenAPI ve API dokümantasyonu
- Filters ve endpoint filter
- Kimlik doğrulama ve yetkilendirme
- Rate limiting ve HTTP katmanı önbellekleme
- HTTP istemcisi ve dayanıklılık
- Real-time ve diğer protokoller
- Multi-tenancy
- Localization ve globalization

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

Resmî kaynak: [ASP.NET Core dokümantasyonu](https://learn.microsoft.com/aspnet/core/)

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../README.md)
