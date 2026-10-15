# API Kaynakları ve Koleksiyonlar API'leri

Bu klasör tek bir platformu değil, **API bulmaya, denemeye ve istemci üretmeye yarayan kaynakları** anlatır: elle derlenmiş listeler (public-apis, Free Public APIs), makinenin okuyabildiği OpenAPI dizini (APIs.guru), platformların resmî Postman koleksiyonları ve OpenAPI dosyaları (X, WhatsApp, Discord, Slack), API pazar yeri (RapidAPI Hub). Resmî API'si olmayan servislerde tarayıcı geliştirici araçları, HAR ve mitmproxy ile uç nokta keşfi de burada; hukuk ve kullanım koşulları (ToS) riskleri de kısaca özetleniyor. Bir takip projesine başlarken önerilen sıra şu: önce resmî doküman ve resmî Postman/OpenAPI, sonra dizinler, en son resmî olmayan keşif.

## İçindekiler

| Platform | Erişim seviyeleri | Takip için ne mümkün | Son doğrulama |
|---|---|---|---|
| [API Koleksiyonları ve Keşif Kaynakları](API-Koleksiyonlari-ve-Kesif.md) | Açık (listeler, APIs.guru, OpenAPI dosyaları) · Geliştirici (Postman fork, RapidAPI hesabı) · İşletme onayı (koleksiyonun bağlı olduğu platforma göre, ör. Meta) · Ücretli (RapidAPI planları, Postman Solo/Team/Enterprise, X API kredisi) · Resmî olmayan (DevTools, HAR, mitmproxy) | Bir platformun resmî API'si olup olmadığı ve uç noktaları bulunur, koleksiyonla kod yazmadan denenir, OpenAPI'den istemci üretilir; resmî API yoksa iç uç noktalar keşfedilebilir ama ToS riski taşır. | 15.10.2026 |

Sayfada ele alınan kaynaklar:

- **public-apis**: 50+ kategoride elle derlenmiş ücretsiz API listesi. Fikir aşamasında "bu alanda ücretsiz API var mı?" sorusu için.
- **APIs.guru**: OpenAPI tanım dizini. Kimliksiz REST API'si (`api.apis.guru/v2/...`) ve RSS beslemesi var.
- **Free Public APIs**: Her gün test edilen ücretsiz API listesi; "hâlâ çalışıyor mu" sorusu için sağlık skoru veriyor.
- **Postman Public API Network**: Resmî workspace'ler (X, WhatsApp). Fork edilen koleksiyon kendiliğinden güncellenmez, değişiklik "pull" ile alınır.
- **RapidAPI Hub**: Tek anahtarla abone olunan pazar yeri. Ücretli planlar ve kota aşım ücretleri var; sosyal medya API'lerinin çoğu 3. taraf scraper hizmeti.
- **Platform OpenAPI dosyaları**: X (`api.x.com/2/openapi.json`), Discord (önizleme), Meta/WhatsApp, Slack (arşivlenmiş).
- **Resmî olmayan keşif**: Chrome DevTools (Fetch/XHR, WS, Copy as cURL), HAR, mitmproxy.

## Bu kategoriye özgü notlar

- **Koleksiyon erişim vermez.** Postman koleksiyonu ya da OpenAPI dosyası yalnızca bir istemcidir. Asıl erişim platformun kendi onay sürecine ve fiyatına bağlıdır. Örneğin X koleksiyonu ücretsizdir ama API çağrıları kullandıkça ücretlendirilir.
- **Resmî olup olmadığını doğrula.** Postman'de aynı ada sahip çok sayıda kopya ve 3. taraf koleksiyonu bulunur. Bağlantıyı platformun kendi developer sitesinden al.
- **Spesifikasyonların durumu farklı.** Discord spec'i "public preview" aşamasında (kırıcı değişiklik gelebilir). Slack'in spec deposu 2024'te arşivlendi. Twitch'in resmî OpenAPI ya da Postman koleksiyonu yok, yerine `twitch-cli` var.
- **HAR dosyası paylaşılmaz.** HAR; oturum çerezi, token ve kişisel mesaj içerebilir. Depoya konmaz (bkz. depo gizlilik kuralı).
- **Resmî olmayan yol hukuki risk taşır.** ToS ihlali, hesap/IP banı, sözleşme ihlali, KVKK/GDPR ve kırılganlık riskleri sayfada tablo hâlinde anlatılıyor. Bu bölüm hukuki görüş değildir.
- **Gerçek zamanlı akış:** Bu kaynakların kendisinde push yok (APIs.guru'da yalnızca RSS var). Canlı yayın ve sohbet akışları çoğu sitede WebSocket üzerinden gelir; DevTools'un WS filtresi ve mitmproxy ile görülebilir.

## İlgili konular

- [Sosyal Medya](../Sosyal-Medya/) · [Canlı Yayın ve Video](../Canli-Yayin-ve-Video/) · [Mesajlaşma](../Mesajlasma/) · [Geliştirici Platformları](../Gelistirici-Platformlari/) · [Haber](../Haber/)
- [Mesajlaşma altyapıları rehberi](../../Rehberler/Mesajlasma-Altyapilari/)

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
