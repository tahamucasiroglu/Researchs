# Kripto Borsaları API'leri

Bu klasör, kripto para borsalarının (Binance, OKX, Bybit, Kraken, Coinbase, BtcTurk, Paribu) ve borsa dışı kripto veri servislerinin (CoinGecko, CoinMarketCap, CoinDesk Data, Etherscan, RPC sağlayıcıları) API'lerini **takip/bildirim uygulaması** gözüyle inceler. Borsalar sosyal ağ olmadığı için burada "takip", kişi gönderisi değil **borsa olayları** demektir: yeni listeleme/delist duyurusu, fiyat eşiği, büyük işlem, likidasyon, bakım ve kendi hesabındaki emir/bakiye değişimi. Borsaların çoğu piyasa verisini kimliksiz ve ücretsiz verir; hesap işlemleri için KYC'li hesapta oluşturulan API anahtarı gerekir, API'nin ayrıca ücreti yoktur (ücret işlem komisyonudur). Veri servislerinde ise ücretsiz katmanlar daralıyor; webhook/WebSocket gibi anlık bildirimler genelde ücretli planlarda.

## İçindekiler

| Platform | Erişim seviyeleri | Takip için ne mümkün | Son doğrulama |
|---|---|---|---|
| [Binance](Binance.md) | Açık (piyasa verisi) · Geliştirici (KYC'li hesap + anahtar) · İşletme onayı (Broker/Link, VIP) · Resmî olmayan (`/bapi` duyuru listesi) | Duyuru WebSocket'i ile yeni listeleme/delist anında gelir; fiyat, likidasyon ve fonlama oranı public stream'lerle izlenir. Binance TR ayrı API'dir. | 15.10.2026 |
| [OKX](OKX.md) | Açık (piyasa + duyurular) · Geliştirici (anahtar + passphrase; emir için KYC Seviye 2) · İşletme onayı (Broker/MM) · Ücretli (VIP kanalları) · Resmî olmayan (`/priapi`) | Duyurular kimliksiz REST ile yoklanır (push yok); `status`, `instruments`, `tickers`, likidasyon WS ile anlık. OKX TR'de kapsam dar. | 15.10.2026 |
| [Bybit ve Kraken](Bybit-ve-Kraken.md) | Açık · Geliştirici (KYC + anahtar) · İşletme onayı (Broker, Kraken FIX) · Ücretli (VIP/hacim) | Bybit duyuruları ve Kraken sistem durumu kimliksiz; listeleme, bakım, likidasyon (Bybit) ve fiyat WS ile izlenir. Resmî olmayan yola gerek yok. | 15.10.2026 |
| [Coinbase](Coinbase.md) | Açık (Advanced Trade/Exchange piyasa verisi) · Geliştirici (CDP anahtarı) · İşletme onayı (OAuth2 uygulaması) · Ücretli (Exchange, Prime, INTX kurumsal) | `status` WS kanalı ve ürün listesi farkıyla yeni listeleme; fiyat/emir defteri WS ile. Türkiye'den hesap açılması büyük olasılıkla mümkün değil; piyasa verisi hesapsız. | 15.10.2026 |
| [BtcTurk ve Paribu](BtcTurk-ve-Paribu.md) | Açık · Geliştirici (hesap + izinli anahtar) · Ücretli (Paribu VIP, koşulları belgede yok) | TRY pariteleri için fiyat, işlem ve emir defteri WS ile anlık; yeni parite liste farkıyla. Duyuru/delist için API yok (durum sayfası, sosyal medya). | 15.10.2026 |
| [Kripto veri servisleri](Kripto-Veri-Servisleri.md) | Açık (CoinGecko, CMC sınırlı) · Geliştirici (ücretsiz anahtar) · Ücretli (CoinGecko/CMC WS-webhook, CoinDesk Data tamamen ücretli, Etherscan) · Resmî olmayan (site iç JSON'ları) | Fiyat yoklama ücretsiz; yeni listeleme/fiyat webhook'u ücretli. Cüzdan/kontrat hareketi Alchemy webhook veya Etherscan yoklamasıyla izlenir. | 15.10.2026 |

## Bu kategoriye özgü notlar

- **Takip ≠ sosyal akış:** Borsalar kişi/kanal paylaşımı için API sunmaz. Borsaların X/Telegram duyuruları için [Sosyal medya](../Sosyal-Medya/) ve [Mesajlaşma](../Mesajlasma/) klasörlerine bakılır; Binance Square, kopya işlem lider sayfaları gibi içerikler çoğunlukla yalnızca web arayüzünde (OKX'in kopya işlem uçları istisna).
- **Anlık bildirim (push) durumu:** Fiyat, işlem, likidasyon ve kendi hesap olayları her borsada WebSocket ile push gelir. **Duyurular** için push yalnızca Binance'te (imzalı duyuru WebSocket'i) var; OKX ve Bybit'te REST yoklaması gerekir, BtcTurk/Paribu'da duyuru API'si yoktur. Hesap webhook'u borsalarda yok; CoinGecko webhook'u ve Alchemy webhook'u ücretli/sınırlı alternatiflerdir.
- **Güvenlik:** Takip için yalnızca **okuma (read-only)** izinli anahtar kullan; işlem/çekim izni verme, anahtarı IP'ye bağla, secret'ı depoya koyma.
- **Bölge ve mevzuat:** Bazı borsaların Türkiye için ayrı platformu/alan adı vardır (Binance TR, OKX TR `tr.okx.com`, Bybit `api.bybit.tr`); hesap hangi bölgede açıldıysa o bölgenin API'si kullanılır. Türkiye'de 7518 sayılı Kanun (2024) ile kripto varlık hizmet sağlayıcıları SPK iznine tabidir; VPN ile bölge kısıtını aşmak kullanım koşullarını ihlal eder ve hesap dondurma riski taşır. Okurun durumu (ikamet ülkesi, yalnızca piyasa verisi mi kendi hesabı mı) her sayfadaki "Durum → sonuç" notlarına göre değerlendirilmelidir.
- **Resmî olmayan yollar:** Borsaların çoğunda takip için gereken veri resmî public API'de var; web iç uç noktaları (`/bapi`, `/priapi`, CMC `data-api`) belgesizdir, haber vermeden değişir ve Cloudflare/WAF engeline takılır. Yalnızca geçmiş verisini doldurmak gibi sınırlı işlerde düşünülmeli.
- **Kaynak etiketleri:** Sayfalardaki `[RESMÎ]`, `[3. TARAF]`, `[TAHMİN]`, `[ÇELİŞKİLİ]`, `[TEST]` etiketleri bilginin dayanağını gösterir. Fiyatlar, limitler ve plan koşulları sık değişir; kullanmadan önce resmî dokümandan yeniden doğrulanmalıdır.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
