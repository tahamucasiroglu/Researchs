# Reklam API'leri

Reklam vermek (kampanya yönetimi, raporlama, dönüşüm yükleme) ve reklamdan gelir elde etmek (uygulama ya da site içi reklam, ödüllü reklamın sunucuda doğrulanması, gelir raporu) için kullanılan API'ler. Bu kategorideki API'ler içerik takibi için değil, **kendi ya da yetki aldığın** reklamveren ve yayıncı hesaplarını yönetmek içindir. Başkasının reklamları yalnızca şeffaflık kütüphanelerinden (Google Ads Transparency Center, Meta Ad Library) görülebilir. Meta ve TikTok'un reklam API'leri, aynı platformun içerik API'leriyle birlikte [Sosyal Medya](../Sosyal-Medya/) kategorisindeki dosyalarında ayrı bölüm olarak anlatılır.

## İçindekiler

| Platform | Erişim seviyeleri | Ne mümkün | Son doğrulama |
|---|---|---|---|
| [Google Ads](Google-Ads.md) | Test (yalnız test hesapları, 15.000 işlem/gün) · Explorer (gerçek hesap, 2.880/gün; Anahtar Kelime Planlayıcı kapalı) · Basic (15.000/gün, marka doğrulaması) · Standard (sınırsız, elle denetim). 9 Eylül 2026'dan beri developer token yok; erişim Google Cloud projesine bağlı. API ücretsiz, maliyet reklam bütçesi | Kendi ya da yönettiğin hesaplarda kampanya yönetimi, GAQL raporu, dönüşüm yükleme (yeni entegrasyonda Data Manager API), Basic ve üstünde Anahtar Kelime Planlayıcı verisi, lead form webhook'u. Rakip reklamları yalnız Ads Transparency Center'da | 6.11.2026 |
| [Google AdMob](AdMob.md) | Açık (SSV doğrulama anahtarları) · Geliştirici (AdMob hesabı + OAuth `admob.readonly` / `admob.report`, ücretsiz) · Uygulama onayı (mağaza kaydı, app-ads.txt, hazırlık incelemesi) · Sınırlı erişim (v1beta yazma uçları) | Ödüllü reklam tamamlanınca imzalı SSV geri çağrısıyla ödül sunucuda yazılır; kendi gelir ve gösterim raporun yaklaşık 4 saat gecikmeyle yoklanır. Masaüstü/web SDK'sı ve başka uygulamaları izleme yok | 6.11.2026 |
| [Google Ad Manager](Google-Ad-Manager.md) | Kimliksiz veri yok · Cloud projesi + OAuth 2.0 (servis hesabı) + ağda API erişimi (kayıt için AdSense hesabı şart) · Standart sürüm eşiğe kadar ücretsiz, üstü ücretli ya da Ad Manager 360 · REST API Beta, SOAP API legacy | Kendi ağının raporu, satır öğesi, sipariş ve envanter yönetimi; web'de GPT ile ödüllü reklam olayları ve SSV GET geri çağrısı (web parametreleri belgelenmemiş) | 6.11.2026 |
| [Meta Marketing API](../Sosyal-Medya/Meta-Graph-API-Genel.md) | Marketing API erişim katmanı: Limited (varsayılan, resmî olarak yalnız geliştirme için) · Full (App Review). Kendi reklam hesabın için Standard `ads_management` / `ads_read` | Kendi ya da yetki veren reklam hesabında kampanya yönetimi, Insights yoklaması, Ad Account webhook'u; Conversions API | 6.11.2026 |
| [TikTok API for Business](../Sosyal-Medya/TikTok.md) | Yalnız şirketlere açık geliştirici kaydı (şirket alan adlı e-posta ve web sitesi; sonuç 3 iş günü) · Uygulama incelemesi (2–3 iş günü) · Reklamveren OAuth | Kendi reklam hesabının kampanya, inceleme durumu ve lead olayları; işletme hesabının yorumları için abonelik (webhook). Bireysel geliştiriciye kapalı | 6.11.2026 |

## Bu kategoride dikkat edilecekler

- **Yalnız kendi hesabın.** Reklam API'leri yalnız yetki veren reklamverenin ya da yayıncının verisini döner. Başka geliştiricilerin uygulamalarını, gelirini ya da kampanyalarını izlemenin resmî yolu yoktur; rakip reklamları için şeffaflık kütüphaneleri kullanılır (Google'da AEA ve Türkiye'de gösterilen reklamların verisine API erişimi var).
- **API ücretsiz, erişim kademeli.** Maliyet reklam bütçesidir; erişim seviyelidir ve onaya bağlıdır. Google'da Basic ve Standard için alan adı ve gizlilik politikası sayfasıyla marka doğrulaması gerekir. TikTok API for Business bireysel geliştiriciyi kabul etmiyor; Meta'nın Limited katmanı canlı reklamverenlerle çalışan üretim uygulamaları için değil.
- **Sunucuya gelen push azdır.** Yayıncı tarafında gerçek zamanlı bildirim neredeyse yalnızca ödüllü reklamın SSV geri çağrısıdır (AdMob'da ECDSA imzalı, `transaction_id` ile tekilleştirilir). Gelir, ödeme ve politika olayları için webhook yoktur; raporlar gecikmeli yoklanır. Reklamveren tarafında Meta Ad Account webhook'u, TikTok aboneliği ve Google lead form webhook'u kendi hesabın için vardır.
- **Mobil reklam SDK'ları masaüstünde çalışmaz.** Google Mobile Ads ve UMP SDK'ları yalnız Android/iOS içindir. Masaüstü ya da web ödüllü reklam için Ad Manager (GPT) sayfasına ve [Masaüstü Uygulamada Reklam](../../Rehberler/Masaustu-Uygulama-Reklam/) araştırmasına bak.
- **Ödüllü reklam kuralları ortak.** Açık onay, kapatılabilirlik, nakit/kripto/hediye kartı yasağı ve devredilemez ödül kuralları AdSense, AdMob ve Ad Manager'da aynıdır. Kredi istemci olayıyla değil sunucu doğrulamasıyla yazılmalıdır.
- **Kişisel veri.** Dönüşüm, Customer Match ve lead form verisi kişisel veridir (KVKK/GDPR). Google yeni dönüşüm ve kitle entegrasyonlarını Data Manager API'ye yönlendiriyor.
- **.NET:** Google'ın resmî istemci paketleri var (Google Ads, AdMob, Ad Manager); Meta ve TikTok için resmî .NET SDK'sı yok, `HttpClient` ile REST kullanılır.

## İlgili kategoriler ve sayfalar

- [Sosyal Medya](../Sosyal-Medya/) — Meta ve TikTok'un içerik API'leri; reklam API'leri bu dosyalarda ayrı bölümde.
- [Arama Motorları](../Arama-Motorlari/) — Organik arama tarafı: IndexNow, Search Console, PageSpeed Insights ve CrUX.
- [Masaüstü Uygulamada Reklam](../../Rehberler/Masaustu-Uygulama-Reklam/) — Masaüstü uygulama ve web sitesinde reklam, ödüllü reklamla kredi, engelleyiciler, hukuk ve vergi.
- [Google Play'de Reklamlı Oyun](../../Rehberler/Google-Play-Oyun/) — Mobil oyunda AdMob ile gelir: ödeme eşikleri, app-ads.txt, vergi dalları.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
