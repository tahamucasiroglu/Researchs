# Mesajlaşma ve Topluluk API'leri

Bu klasör; Discord, Telegram, Slack, WhatsApp, Facebook Messenger, Signal, Viber ve LINE gibi mesajlaşma ve topluluk platformlarının geliştirici API'lerini **erişim seviyesi** ve **takip (izleme) uygulaması** gözüyle karşılaştırır. Her sayfa aynı düzeni izler: erişim seviyeleri (herkese açık → geliştirici → işletme onayı → ücretli → resmî olmayan), kimlik doğrulama, temel uç noktalar, gerçek zamanlı bildirim, "takip uygulaması için" tablosu, hız sınırları/fiyatlar ve riskler. Bilgiler resmî dokümandan okunup **[RESMÎ] / [3. TARAF] / [TAHMİN] / [ÇELİŞKİLİ]** etiketleriyle işaretlenmiştir; API kuralları sık değiştiği için her sayfadaki "son doğrulama" tarihine bakın.

## İçindekiler

| Platform | Erişim seviyeleri (özet) | Takip için ne mümkün | Son doğrulama |
|---|---|---|---|
| [Discord](Discord.md) | Açık (yalnız webhook ile yazma, widget) · Geliştirici (bot, ücretsiz) · İşletme onayı (10.000+ kullanıcıda privileged intent incelemesi) · Ücretli katman yok · Resmî olmayan (self-bot, yasak) | Botun eklendiği sunucularda mesaj, thread, stage/planlı etkinlik ve Go Live olayları Gateway ile anlık izlenir; botun olmadığı sunucu ve DM'ler okunamaz. | 15.10.2026 |
| [Facebook Messenger](Facebook-Messenger.md) | Açık yok · Geliştirici (Standard Access, kendi Sayfan) · İşletme onayı (Advanced Access, App Review) · Ücretli (Marketing Messages, sponsorlu mesaj) · Resmî olmayan (kişisel hesap oturumu) | Yalnız yönettiğin Facebook Sayfasının / IG profesyonel hesabının gelen kutusu, gönderi ve canlı yayın olayları webhook ile gelir; kişisel ve grup sohbetleri resmî yoldan okunamaz. | 15.10.2026 |
| [Signal](Signal.md) | Açık yok · Geliştirici yok · İşletme onayı yok · Ücretli yok · Resmî olmayan (signal-cli, bağlı cihaz) | Resmî API yoktur; yalnız hesabın zaten üyesi olduğu grup/DM akışı resmî olmayan bağlı cihazla izlenebilir, herkese açık kanal veya yayın yoktur. | 15.10.2026 |
| [Slack](Slack.md) | Açık yok · Geliştirici (dahili uygulama; Marketplace dışı dağıtımda geçmiş okuma 1/dk × 15) · İşletme onayı (Marketplace) · Ücretli (Enterprise Grid) · Resmî olmayan (tarayıcı oturum token'ı) | Uygulamanın kurulu olduğu çalışma alanında kanal mesajı, thread, bahsetme ve tepkiler Events API / Socket Mode ile anlık izlenir; kurulmadığın çalışma alanı izlenemez. | 15.10.2026 |
| [Telegram](Telegram.md) | Açık (`t.me/s/` web önizlemesi) · Geliştirici (Bot API ve kullanıcı API'si/MTProto, ücretsiz) · İşletme onayı yok · Ücretli (Premium, Gateway OTP, ücretli toplu gönderim) · Resmî olmayan (HTML kazıma, RSSHub) | Kullanıcı API'si ile başkalarının herkese açık kanalları dahil gönderi, geçmiş, arama, canlı yayın ve hikâye izlenebilir; bot yalnız eklendiği sohbetleri görür. | 15.10.2026 |
| [Viber ve LINE](Viber-ve-LINE.md) | Viber: Açık yok · Geliştirici (yalnız kanala gönderi) · İşletme onayı (ticari bot başvurusu) · Ücretli (Business Messages). LINE: Açık yok · Geliştirici (Official Account, ücretsiz kota) · İşletme onayı (Verified/Premium) · Ücretli (Light/Standard plan) · Resmî olmayan (self-bot) | Yalnız bota gelen mesajlar ve (LINE'da) botun eklendiği gruplar izlenebilir; başkasının kanalı, VOOM veya OpenChat okunamaz — kaynak olarak zayıf, bildirim kanalı olarak kullanışlı. | 15.10.2026 |
| [WhatsApp](WhatsApp.md) | Açık (yalnız `wa.me` / kanal davet sayfası) · Geliştirici (test numarası, 5 alıcı) · İşletme onayı (Business Verification, App Review, OBA) · Ücretli (mesaj başı ücret, BSP) · Resmî olmayan (Baileys, whatsapp-web.js; ban riski) | Resmî API yalnız işletme numarana gelen mesajları ve kendi açtığın (en çok 8 kişilik) grupları görür; kanallar, durumlar ve başkalarının grupları yalnız resmî olmayan yolla okunur. | 15.10.2026 |

## Kategoriye özgü notlar

- **Takip ≠ dinleme.** Mesajlaşma API'lerinin çoğu bir işletmenin/botun **kendisine gelen** mesajlara yanıt vermesi için tasarlanmıştır. "Başkasının kanalında/grubunda ne paylaşılıyor" sorusuna resmî yoldan cevap veren tek geniş API Telegram'ın kullanıcı API'sidir (MTProto); diğerlerinde bot ya da uygulama önce o sohbete eklenmelidir.
- **Kaynak mı, çıkış mı?** Discord webhook'ları, Slack, Telegram botları, LINE push ve Viber kanal gönderisi; başka platformlardan (X, Twitch, GitHub…) toplanan filtrelenmiş olayları bildirmek için **çıkış kanalı** olarak çok kullanışlıdır — bir takip uygulamasında kaynaktan daha değerli olabilirler.
- **Anahtar kelime filtresi neredeyse her yerde istemci tarafındadır.** Platformlar sunucu tarafında filtre sunmaz (istisnalar: Discord mesaj araması/AutoMod, Telegram `messages.search` / `channels.searchPosts`, Slack RTS — RTS sonuçları saklanamaz). Gelen webhook/olay gövdesi kendi kodunda süzülür.
- **Yapay zekâ kısıtları:** Telegram ToS'u veriyi AI/ML modellerini eğitmek veya kullanıma sokmak amacıyla toplamayı yasaklar; WhatsApp platform verisiyle genel model eğitmeyi yasaklar. Yapay zekâ ile sınıflandırma planlıyorsan ilgili sayfadaki notu oku.
- **Resmî olmayan yollar** (self-bot, kişisel hesap oturumu, Baileys, signal-cli, `xoxc-` token) bilgi amaçlı listelenmiştir: ToS ihlali, hesap/numara kapatma ve protokol değişince bozulma riski taşır; yalnız kaybedilmesi sorun olmayan ayrı bir hesapla, salt okuma amacıyla denenmelidir.
- **Kişisel veri:** Mesaj içeriği, üye listesi ve çevrimiçi durumu kişisel veridir (KVKK/GDPR). Saklama süresini ve amacını baştan belirle; kişi izleme (son görülme, durum) etik ve hukuki risk taşır.
- Gönderim odaklı ayrıntılar (Telegram Bot API, WhatsApp Business mesaj şablonları, fiyatlar, C# örnekleri) [Mesajlaşma Altyapıları rehberinde](../../Rehberler/Mesajlasma-Altyapilari/) anlatılır; buradaki sayfalar onları tekrar etmez.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
