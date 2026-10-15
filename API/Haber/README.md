# Haber API'leri

Haber sitelerini ve ajansları programla takip etmenin yolları: küresel **haber toplayıcı API'leri** (NewsAPI.org, GNews, Mediastack, NewsData.io, Event Registry), yayıncıların kendi API'leri (The Guardian, New York Times), ücretsiz ve anahtarsız **GDELT** ile **Google News RSS**, Türkiye'de ise ajansların (AA, DHA, İHA) abonelikle çalışan servisleri ve haber sitelerinin herkese açık **RSS** akışları. Bu kategoride webhook veya WebSocket gibi gerçek zamanlı push sunan bir servis yok. Takip her zaman düzenli sorgulamayla (RSS ya da API polling) yapılır. Ücretsiz ticari katmanlarda 12–24 saat gecikme olur, ücretsiz kalıp neredeyse anlık takip yapmak isteyen için ise GDELT ve RSS en uygun seçenektir.

## İçindekiler

| Platform | Erişim seviyeleri | Takip için ne mümkün | Son doğrulama |
|---|---|---|---|
| [Global Haber API'leri](Global-Haber-APIleri.md) | Açık (GDELT, Google News RSS) / Geliştirici (ücretsiz anahtar, gecikmeli, ticari kullanım yasak) / İşletme onayı (Guardian ticari anahtar, NYT lisansı) / Ücretli (24,99–1.749 $/ay) / Resmî olmayan (Google News iç uçları, kazıma) | Anahtar kelime, site, dil (Türkçe dahil) ya da ülkeye göre yeni haberler polling ile izlenebilir; ücretsiz ticari katmanlar gecikmeli çalışır, GDELT ise yaklaşık 15 dakikada bir güncellenir. | 15.10.2026 |
| [Türkiye Haber Kaynakları](Turkiye-Haber-Kaynaklari.md) | Açık (30'a yakın doğrulanmış RSS, Google News sitemap'leri) / Geliştirici: yok / İşletme onayı (AA, DHA, İHA abonelik sözleşmesi, teklif usulü) / Resmî olmayan (TRT mobil XML, HTML kazıma) | Siteler son dakika, manşet ya da kategori akışlarıyla RSS polling üzerinden takip edilebilir; ajansların tam içeriğine yalnızca abonelikle erişilir. | 15.10.2026 |

## Kategoriye özgü notlar

- **Push yok, polling var:** İncelenen hiçbir haber API'sinde webhook, WebSocket ya da WebSub yok. Son görülen yayın zamanı veya `guid`/`link` saklanır, her sorguda yalnızca yeni öğeler işlenir. Son dakika akışları için 1–2 dakikalık, diğerleri için 5–15 dakikalık aralık yeterlidir.
- **Türkçe desteği servise göre değişir:** NewsAPI.org Türkçe dilini ve `country=tr` filtresini desteklemiyor. GNews, NewsData.io, GDELT (`sourcelang:turkish`) ve Google News RSS (`hl=tr&gl=TR`) destekliyor.
- **Ücretsiz katman ile ticari kullanım ayrı şeyler:** NewsAPI.org Developer planı canlı ortamda (production) açıkça yasak. Google News RSS de yalnızca kişisel ve ticari olmayan kullanıma açık. Bir ürün yapılacaksa ücretli plan ya da lisans gerekir.
- **Hukuki çerçeve (Türkiye):** Haber metnini yeniden yayımlamak 5846 sayılı FSEK ve 5187 sayılı Basın Kanunu md. 24 kapsamına girer. En güvenli kullanım başlık, kısa özet, kaynak adı ve bağlantıyı göstermektir. AA, içeriğinin abonelik olmadan kullanılamayacağını açıkça belirtiyor.
- **Yinelenen haberleri ayıklama:** Aynı olay çok sayıda kaynakta çıkar. Bunun için URL normalleştirme (`utm_` parametrelerini silmek) ve başlık benzerliğiyle kümeleme gerekir. Event Registry bu kümelemeyi hazır olarak ("event") sunuyor.
- **Kapanan servis:** Bing News Search API 11 Ağustos 2025'te kapatıldı.
- **İlgili kategoriler:** Haber kaynaklarının sosyal medya hesapları için [Sosyal-Medya](../Sosyal-Medya/), Telegram ve WhatsApp kanalları için [Mesajlasma](../Mesajlasma/), TV kanallarının canlı yayınları için [Canli-Yayin-ve-Video](../Canli-Yayin-ve-Video/) klasörlerine bakılabilir.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
