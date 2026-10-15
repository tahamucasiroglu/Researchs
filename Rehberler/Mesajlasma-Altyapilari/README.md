# Mesajlaşma Altyapıları

Bir uygulamadan Türkiye'deki kullanıcılara Telegram, WhatsApp, BiP veya SMS ile mesaj göndermek için kısa başvuru sayfaları. Her sayfada uç nokta tablosu (METOT + URL → ne yapar → sınır), JSON istek/cevap ve webhook örnekleri, imza denetimi, C# (HttpClient + System.Text.Json) örnekleri, sınırlar, fiyatlar ve sonda bir "Durum → Sonuç" karar tablosu var. Türkiye'ye özgü kurallar (BTK başlık ve abonelik kuralları, İYS, 6563 sayılı Kanun) ilgili sayfalarda.

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

> Araştırma tarihi: 12 Ekim 2026. Fiyat, limit ve kurallar sık değişir; kullanmadan önce resmî sayfadan teyit et. Örneklerdeki anahtar, numara ve kimlikler yer tutucudur. Hukuki danışmanlık değildir.

## Sayfalar

| Sayfa | Açıklama |
|---|---|
| [01 · Telegram Bot API](01-telegram-bot-api.html) | Ücretsiz HTTP bot arayüzü (`api.telegram.org/bot{TOKEN}/{METOT}`): BotFather ve token, uç noktalar, inline/reply klavye, derin bağlantı ile hesap eşleme, `getUpdates` ve webhook (`secret_token`), sınırlar, Business botlar, Telegram Gateway ile OTP, Stars ödemeleri. |
| [02 · WhatsApp Business API](02-whatsapp-business-api.html) | Meta'nın barındırdığı Cloud API: mesaj tipleri, şablonlar ve 24 saat penceresi, `X-Hub-Signature-256` imza denetimi, 1 Ekim 2026 fiyat modeli, mesaj limitleri, işletme doğrulaması ve onboarding, yapay zekâ botu politikası, resmî olmayan kütüphanelerin riski. |
| [03 · BiP Keşfet API (TES)](03-bip-kesfet-api.html) | BiP'te "Keşfet" altında kurum servisi açma ve TES REST API'si: gönderim/geri besleme JSON'ları, şablon, düğmeli ve anket mesajları, oturum ve kota kuralları, REX, ödeme API'si, başvuru süreci. |
| [04 · SMS Hizmetleri](04-sms-hizmetleri.html) | OTP, bilgilendirme ve ticari SMS: örnek bir SMS sağlayıcısının API'si, HMAC imzalı teslim webhook'u, BTK başlık/abonelik kuralları (1 Nisan 2026), 6563 ve İYS, yurt içi sağlayıcı fiyat kıyası, Twilio/Vonage kısıtları. |

## Hangi kanal?

- **Bütçe yok, kullanıcı Telegram'da** → Telegram Bot API (bot ilk mesajı atamaz).
- **Kitle WhatsApp'ta, işletme doğrulanabiliyor** → WhatsApp Cloud API (mesaj başı ücretli).
- **Kamu kurumu / yerli uygulama şartı** → BiP Keşfet API (başvuruyla açılır).
- **Uygulamasız herkese ulaşmak, giriş kodu** → SMS; daha ucuz alternatif Telegram Gateway veya WhatsApp authentication şablonu.
- **Ticari ileti** → hangi kanal olursa olsun önceden onay ve İYS kaydı.

## İlgili konular

- [Şirket Kurma → Şirketsiz Ne Yapabilirsin?](../Sirket-Kurma/12-sirketsiz.html) — WhatsApp test numarası, İYS / 6563 dallanması.
- [Şirket Kurma → Ödeme Altyapıları](../Sirket-Kurma/11-odeme-altyapilari.html) — Telegram Stars ve BiP ödeme API'si dışındaki ödeme seçenekleri.
- [API → WhatsApp](../../API/Mesajlasma/WhatsApp.md) — WhatsApp'ı okuma/takip tarafından inceler: erişim seviyeleri, webhook, Groups API, Kanallar ve resmî olmayan kütüphanelerin riskleri.
- [API → Telegram](../../API/Mesajlasma/Telegram.md) — Bot API ile kullanıcı API'si (MTProto) farkı, başkasının kanalını izleme, güncelleme akışı ve sınırlar.
- [API Kütüphanesi](../../API/README.md) — Tüm platformların API başvurusu ve takip uygulaması için özet matris.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
