# Mesajlaşma ve Dağıtık Sistemler

Birden fazla servisten oluşan sistemlerde servisler birbirini doğrudan çağırmak yerine çoğu zaman mesajlar aracılığıyla haberleşir. **RabbitMQ** gibi bir mesaj aracısı (message broker), üreticinin bıraktığı mesajı kuyrukta tutar ve tüketiciye iletir; böylece servisler birbirinden bağımsız ölçeklenir ve biri geçici olarak çöktüğünde mesaj kaybolmaz. .NET'te **MassTransit** bu altyapıların üzerine bir soyutlama katmanı sunar. Veritabanı yazımı ile mesaj yayınını tutarlı kılan **outbox deseni**, retry ve circuit breaker gibi dayanıklılık kalıpları, servisler arası hızlı iletişim için **gRPC** ve tarayıcıya anlık bildirim için **SignalR** da bu alana girer.

Bu sayfa mesaj kuyruğu mantığından dağıtık sistem teorisine (CAP, tutarlılık modelleri) kadar bu teknolojileri öncelik sırasıyla listeler.

## Sayfadaki ana başlıklar

- Temel kavramlar
- RabbitMQ derinlemesine
- MassTransit ve alternatifleri
- Diğer mesaj altyapıları
- Dayanıklılık kalıpları
- gRPC
- SignalR ve gerçek zamanlı iletişim
- Arka plan işleri ve zamanlama
- Dağıtık sistem teorisi

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

Resmî kaynaklar: [RabbitMQ dokümantasyonu](https://www.rabbitmq.com/docs) · [MassTransit dokümantasyonu](https://masstransit.io/documentation/concepts)

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../README.md)
