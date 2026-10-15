# Geliştirici Platformları API'leri

Kod barındırma ve yazılım geliştirme platformlarının API'leri. Bu platformlarda "takip" denince yeni release, commit, issue/PR, yıldız ve kullanıcı etkinlikleri anlaşılır. Herkese açık veriler çoğunlukla kimliksiz ya da ücretsiz bir token ile okunabilir. Gerçek zamanlı bildirim (webhook) ise yalnızca yönettiğin repo/organizasyonda ya da uygulamanı kuran hesaplarda çalışır. Başkasının projesini takip etmek için yoklama (polling) veya Atom feed'leri kullanılır. Her sayfada erişim seviyeleri, kimlik doğrulama, temel uç noktalar, hız sınırları, resmî olmayan yollar ve kaynaklar yer alır.

## İçindekiler

| Platform | Erişim seviyeleri | Takip için ne mümkün | Son doğrulama |
|---|---|---|---|
| [GitHub](GitHub.md) | Açık (kimliksiz 60 istek/saat) · Geliştirici (PAT/OAuth, 5.000/saat) · GitHub App kurulumu (en fazla 12.500/saat) · Ücretli (Enterprise Cloud, 15.000/saat) · Resmî olmayan (belgelenmemiş Atom feed'leri, GH Archive) | Kendi repolarında webhook ile anlık, başkasının reposunda release, commit ve etkinlikler Events API, REST/GraphQL ya da `releases.atom` ile gecikmeli izlenir. | 15.10.2026 |

## Bu kategoride dikkat edilecekler

- **Webhook yalnızca yönettiğin yerde çalışır.** Başkasının reposuna veya bir kullanıcı hesabına webhook kurulamaz. Dış projeler için yöntem polling'dir (`ETag`/`If-Modified-Since` ile limit harcamadan).
- **Events API gerçek zamanlı değildir.** Belge 30 saniye ile 6 saat arası gecikme veriyor. Sorgulanabilir geçmiş 30 Ocak 2025'ten beri 30 gün / 300 olay ile sınırlı (önceden 90 gündü).
- **Atom feed'leri** (`releases.atom`, `tags.atom`, `commits/<dal>.atom`, `<kullanici>.atom`) REST kotasına sayılmaz. Ancak belgelenmemiştir ve rakamı açıklanmayan kimliksiz istek sınırlarına tabidir; makul aralıklarla çekilmelidir.
- **Sosyal veriler kısıtlanıyor.** Temmuz 2026'dan itibaren stargazers/watchers listeleri yalnızca repo admin/collaborator'larına açılıyor. Yıldız sayısı repo nesnesinden okunmaya devam eder.
- **Bildirimler (mention, review isteği)** yalnızca classic PAT ile okunabilir; fine-grained token bu uç noktayı desteklemez.
- **Çok sayıda repoyu izlemek** için GraphQL toplu sorgusu (tek istekte onlarca reponun son release'i) REST'e göre daha az limit harcar.
- **Canlı yayın ve mesajlaşma** bu platformlarda yoktur. Gerçek zamanlı akış (WebSocket/streaming) API'si de sunulmaz.

## İlgili kategoriler

- [Mesajlaşma](../Mesajlasma/) — webhook'tan gelen olayları Slack/Telegram'a iletmek için.
- [Sosyal Medya](../Sosyal-Medya/) — Bluesky firehose ve Mastodon streaming ile gerçek zamanlı takip karşılaştırması.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
