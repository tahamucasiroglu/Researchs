# DevOps ve Gözlemlenebilirlik

DevOps, kodun yazılmasından üretime alınmasına kadar geçen süreci otomatikleştirmeyi hedefleyen uygulamalar bütünüdür. **CI/CD** hatları (GitHub Actions, Azure DevOps) her değişiklikte kodu derler, testleri çalıştırır ve dağıtır; **Docker** uygulamayı bağımlılıklarıyla birlikte taşınabilir bir konteynere paketler, **Kubernetes** ise bu konteynerleri ölçekli biçimde çalıştırır. **Gözlemlenebilirlik** (observability), üretimdeki sistemin içini log, metrik ve trace (iz) üzerinden görebilmektir; .NET'te Serilog ile yapılandırılmış loglama ve OpenTelemetry ile dağıtık izleme yaygın tercihlerdir.

Bu sayfa, CI/CD hattını sıfırdan kurmak isteyenler için ileri Git'ten altyapı kodu (IaC), sır yönetimi ve dağıtım stratejilerine kadar tam bir liste sunar.

## Sayfadaki ana başlıklar

- Git — ileri seviye
- GitHub Actions
- Azure DevOps
- Diğer CI/CD platformları
- Docker ve konteynerleştirme
- Kubernetes — temel seviye
- Bulut hizmetleri ve altyapı kodu (IaC)
- Loglama
- Gözlemlenebilirlik (observability)
- Güvenlik, sır yönetimi ve dağıtım stratejileri

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

Resmî kaynaklar: [GitHub Actions dokümantasyonu](https://docs.github.com/actions) · [Docker dokümantasyonu](https://docs.docker.com/) · [OpenTelemetry .NET](https://opentelemetry.io/docs/languages/dotnet/)

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../README.md)
