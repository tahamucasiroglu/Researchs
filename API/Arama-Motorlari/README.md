# Arama Motoru API'leri

Bir sitenin arama motorlarıyla konuşmasını sağlayan API'ler: değişen URL'yi motora bildirmek (IndexNow, Google Indexing API), kendi sitenin arama performansını ve dizin durumunu okumak (Google Search Console) ve sayfa hızını ölçmek (PageSpeed Insights, Chrome UX Report). Bu API'lerin çoğu **yazma yönlüdür ya da yalnız doğrulanmış kendi mülkün** için veri verir; herkese açık hız verisi (CrUX ve PSI) bunun dışındadır. Konunun SEO tarafı [SEO Rehberi](../../Rehberler/SEO/)'nde anlatılır.

## İçindekiler

| Platform | Erişim seviyeleri | Ne mümkün | Son doğrulama |
|---|---|---|---|
| [IndexNow](IndexNow.md) | Herkese açık: hesapsız ve ücretsiz; kendi ürettiğin anahtar ve sitende anahtar dosyası yeter. Bing ve Yandex Webmaster gönderim API'leri için ücretsiz geliştirici hesabı ve site doğrulaması gerekir | Kendi alan adındaki yeni, güncellenen, silinen ya da yönlendirilen URL'leri tek istekle (en çok 10.000 URL) Bing, Yandex, Seznam, Naver, Yep ve Amazonbot'a bildirmek. Dizine almayı garanti etmez, Google'a ulaşmaz, başka sitelerden veri okumaz | 6.11.2026 |
| [Google Search Console + Indexing API](Google-Search-Console.md) | Kimliksiz veri yok. Google hesabı, Cloud projesi, OAuth ya da servis hesabı ve Search Console'da mülk izniyle ücretsiz; onay süreci yok. Indexing API'de servis hesabı mülk sahibi olmalı (günde 200 yayımlama isteği). BigQuery toplu dışa aktarma faturalı Cloud projesi ister | Kendi doğrulanmış siten için tıklama, gösterim, CTR ve konum yoklaması (2–3 gün gecikmeli, 16 ay geçmiş), URL dizin durumu (mülk başına günde 2.000), site haritası yönetimi. Indexing API yalnız iş ilanı ve canlı yayın sayfaları için. "Dizine eklenmeyi iste"nin API'si yok | 6.11.2026 |
| [PageSpeed Insights ve CrUX](PageSpeed-Insights-ve-CrUX.md) | Ücretsiz Google Cloud API anahtarı gerekir (anahtarsız istek reddediliyor). CrUX: proje başına dakikada 150 sorgu, ücretle artırılamaz. BigQuery'de ücretsiz katmanın üstü ücretli | Rakip dahil herkese açık her URL'nin Lighthouse laboratuvar testi; yeterli trafik varsa CrUX saha verisi (günlük p75, 40 haftalık geçmiş, BigQuery'de aylık ve ülke kırılımlı). Push yok, izleme yoklamayla | 6.11.2026 |

## Bu kategoride dikkat edilecekler

- **Yazma yönlü ya da yalnız kendi mülkün.** IndexNow ve Indexing API kendi sitendeki değişikliği motora bildirir, başka sitelerin içeriğini okumaz. Search Console yalnız doğrulanmış ya da sana izin verilmiş mülklerin verisini verir; rakip sitenin tıklama, sıralama ya da dizin verisi resmî yoldan alınamaz. Sahiplik anahtar dosyasıyla (IndexNow) ya da webmaster panelinde site doğrulamasıyla (Google, Bing, Yandex) kanıtlanır.
- **Bildirim dizine almayı garanti etmez.** Yalnız gerçekten değişen URL'leri gönder; gereksiz toplu gönderim 429 hatası ve kota kaybı getirir.
- **Google'da genel bir "anında dizinleme" API'si yok.** Google IndexNow'a katılmıyor; normal yol site haritası, iç bağlantı ve Search Console'dur. Indexing API yalnız `JobPosting` ve `VideoObject` içindeki `BroadcastEvent` sayfaları içindir; sıradan sayfalarda ya da kota için çok hesapla kullanmak spam denetimine ve erişim iptaline yol açar.
- **Veri gecikmeli ve sınırlı.** Search Console performans verisi 2–3 gün gecikmeli, 16 ay geriye gider, anonim sorgular hariç tutulur; uzun dönem için BigQuery toplu dışa aktarmayı ilk gün aç (geçmiş doldurulmaz). CrUX günlük, History API haftalık, BigQuery aylık güncellenir; aynı gün tekrar sorgulamak yeni veri getirmez.
- **FID kalktı.** First Input Delay Eylül 2024'te Chrome araçlarından ve API'lerden kaldırıldı; yerine INP kullanılır. Eski örnek yanıtlarda FID görünmesi yanıltmasın.
- **.NET:** Google'ın resmî istemci paketleri var (Search Console, Indexing, PageSpeed Insights). IndexNow ve CrUX için resmî .NET paketi yok; `HttpClient` ile REST kullanılır.

## İlgili kategoriler ve sayfalar

- [Reklam](../Reklam/) — Ücretli arama tarafı: Google Ads API'de Anahtar Kelime Planlayıcı, arama terimleri ve ücretli-organik raporları.
- [SEO Rehberi](../../Rehberler/SEO/) — Tarama ve dizine ekleme, hız ve Core Web Vitals, IndexNow, Search Console raporları ve ölçüm.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
