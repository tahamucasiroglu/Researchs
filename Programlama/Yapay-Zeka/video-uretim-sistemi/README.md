# Video Üretim Sistemi (Claude ile belgesel tarzı video)

Tarih, "nasıl yapılır / nasıl inşa edildi", tarihî gizemler ve UFO/UAP raporları gibi konularda ~12 dakikalık yatay (16:9) belgesel ve dikey (9:16) Shorts/Reels/TikTok videosu üreten, Claude merkezli bir sistemin araştırması: Claude'un rolü ve sınırları (web, Claude Code, API; "ayda 200 $ API kredisi" iddiasının doğrulaması), iddia tablosuyla doğruluk denetimli senaryo akışı, Türkçe/İngilizce TTS, müzik ve altyazı, arşiv/stok/AI görsel ve video, Remotion ile sahne bazlı revizyonlu render mimarisi, dört sistem yolu (A–D) ve önerilen "B-lite" MVP, YouTube/TikTok/Instagram yayın kuralları (YPP inauthentic content, spam, AI beyanı), maliyet tabloları, hukuk ve riskler. Her ana bölüm bütçe (yok/az/orta), ekran kartı (yok/6–8 GB/16+ GB) ve otomasyon düzeyine (tam/yarı/elle) göre "Durum → Sonuç" dallanması içerir.

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

Yapay zekâ için Markdown: [arastirma.md](arastirma.md)

> Araştırma tarihi: 15 Ekim 2026. Fiyatlar USD ve o gün resmî sayfalardan okunmuştur; sık değişir, satın almadan önce teyit et. Hiçbir model, servis veya render denenmedi (tek istisna anahtarsız bir NASA API isteği); süre ve maliyet rakamlarının çoğu **TAHMİN**dir ve ilk gerçek videodan sonra ölçülüp düzeltilmelidir. Bilgiler **RESMÎ / 3. TARAF / TAHMİN / ÇELİŞKİLİ / DOĞRULANAMADI** etiketlidir. Hukuki, vergisel veya finansal danışmanlık değildir.

## Bölümler

| § | Başlık | Kısaca |
|---|---|---|
| 0 | Başlık, özet, tarih, uyarı | Kapsam, yöntem, etiketler, depodaki ilgili sayfalar |
| 1 | Kısa cevaplar | Web/API ile olur mu, 200 $ kredi, video başı maliyet, TR/EN, revizyon, YPP, başlangıç |
| 2 | Hedef ve gereksinimler | Çıktılar (12 dk yatay, dikey Short), konu türleri, işlevsel gereksinimler |
| 3 | Claude'un rolü ve sınırları | 200 $ kredi doğrulaması, abonelik ≠ API, model fiyatları, web/Code/API, yapamadıkları, başabaş |
| 4 | Senaryo ve doğruluk akışı | Halüsinasyon riski, "önce iddia tablosu, sonra senaryo", kelime/süre bütçesi, bölüm iskeleti, arşivler, TR/EN |
| 5 | Ses | Bulut ve yerel Türkçe TTS, ses klonu, müzik/efekt, altyazı, sahne bazlı ses mimarisi |
| 6 | Görsel ve video malzemesi | Stok (Pexels, Pixabay), arşiv, AI görsel, AI video, Remotion ile kodla görsel, maliyet karışımı |
| 7 | Montaj, render ve revizyon | Araç karşılaştırması, hash önbellekli sahne mimarisi, insan onay adımları, tek projeden 16:9 + 9:16 |
| 8 | Sistem yolları A–D | Elle + web, yarı otomatik pipeline, yerel ağırlıklı, bulut render / hazır SaaS; karşılaştırma ve "Durum → Sonuç" |
| 9 | Önerilen MVP | "B-lite", klasör yapısı, sahne şeması (`kilit: true`), adım adım ilk video, örnek Claude istemleri |
| 10 | Yayın | YouTube kuralları, YPP inauthentic/reused content, spam, AI beyanı, Content ID, Data API, TikTok, Reels, iki dil |
| 11 | Maliyet tablosu | Claude metin maliyeti hesabı, yol bazında video başı toplam, aylık senaryolar |
| 12 | Hukuk, telif ve etik | Arşiv lisansları, AI içerik ve telif, ses klonu ve kişilik hakkı |
| 13 | Riskler | Risk tablosu (olasılık/etki/azaltma), açık kalan ve doğrulanamayan noktalar |
| 14 | Kaynakça | Anthropic, TTS, görsel/video, arşivler, render, SaaS, platformlar, hukuk |

## Kısa cevaplar

- **"Ayda 200 $ ücretsiz API kredisi" doğru mu?** Kısmen. 200 $ kredi vardır ama ücretsiz değildir: aylık 200 $ ödenen **Max 20x** aboneliğine dahildir. Max 5x'te 100 $, Team'de koltuk başına 20 $ / 100 $ (havuz tavanı 500 $); Free, Pro ve Enterprise'da yoktur. Kredi devretmez, etkileşimli Claude Code'da geçmez. Yeni API hesabına verilen deneme kredisi tek seferliktir, aylık değildir. [RESMÎ]
- **Hangi plan?** Aylık API harcaması 80 $'ın altındaysa Pro + kullandıkça öde, 80–180 $ arası Max 5x, 180 $ üstü Max 20x daha ucuzdur. Max kredisi TTS/görsel/video'ya harcanamaz. [TAHMİN, resmî fiyatlardan]
- **12 dk video başı maliyet?** Claude metin kısmı ~1–2,5 $, TTS 0–1 $, görsel/video 0 $ (arşiv + stok + kod) ile 10–110 $ (AI video ağırlıklı) arası, render yerelde 0 $. Gerçekçi toplam: yarı otomatik ve arşiv ağırlıklı **~1,2–3,5 $**, az AI klipli **~6–18 $**. Claude sistemin küçük kalemidir; asıl değişken AI video ve premium TTS'tir. [TAHMİN]
- **Claude ne yapar, ne yapmaz?** claude.ai ve API araştırma, senaryo, sahne JSON'u, arama sorgusu, başlık/açıklama üretir; ses, müzik, fotoğraf veya gerçekçi video üretmez. claude.ai'yi betikle sürmek şartlara aykırıdır; otomasyon yalnız API anahtarıyla yapılır. [RESMÎ]
- **Önerilen başlangıç yolu:** "B-lite" MVP — claude.ai Project veya küçük bir API betiği ile senaryo + sahne JSON'u → tek TTS (bulut ya da yerel) → arşiv/stok görsel → Remotion ile 4–5 sahne türü → elle YouTube yüklemesi. Önce 1 uzun video + 1 Short üret, ölç, sonra otomatikleştir. [TAHMİN]
- **Sahne yönetimi ve revizyon:** Sahne dosyası (Markdown/YAML/JSON) elle yazılabilir; `kilit: true` sahneye AI dokunmaz. Sahne en küçük revizyon birimidir; ses ve görüntü hash ile önbelleğe alınır, yalnız değişen sahne yeniden üretilir.
- **Türkçe / İngilizce:** İkisi de olur. Ortak iddia tablosu → her dilde ayrı yazım, aynı sahne ID'leri, ayrı render. Türkçe TTS bulutta (ElevenLabs, Google, Azure, OpenAI, Polly) ve yerelde (Chatterbox Multilingual V3, VoxCPM2) var.
- **YPP riski:** Yarı otomatik ve özgün anlatımlıysa para kazanma mümkün; tam otomatik seri üretimde risk yüksek. "Inauthentic content" politikası jenerik şablonla seri üretilmiş AI içeriğini ve anlatısız slaytları **kanalın bütününden** para kazanmadan çıkarabilir; spam politikası tekrarlayan AI seri üretimini kaldırma ve ihtar düzeyinde yasaklar. Risk yol harfine değil şablon/müzik tekrarına ve anlatı özgünlüğüne bağlıdır; gerçekçi AI canlandırmalar beyan ister. Her video için iddia tablosu ve revizyon geçmişi "kanıt dosyası" olarak saklanmalı. [RESMÎ + TAHMİN]
- **Tam otomatik, insansız sistem:** Önerilmez — inauthentic content ve uydurma tarih riski. En az iddia tablosu onayı ve son izleme insanda kalmalı.

## İlgili konular

- [API → YouTube](../../../API/Canli-Yayin-ve-Video/YouTube.md) — YouTube Data API ile yükleme, kota ve doğrulanmamış proje kısıtları.
- [Remotion ve Kodla Video](../kodla-video/) — Remotion'un çalışma mantığı, lisansı, Agent Skills ve yerel TTS/görsel VRAM tabloları; bu sistemin render katmanının temeli.
- [Görüntü Netleştirme](../goruntu-netlestirme/) — düşük çözünürlüklü arşiv karelerini yerel modellerle 1080p/4K'ya büyütmek için.
- [YouTube'da Oyun](../../../Rehberler/YouTube-Oyun/) — YPP eşikleri, Shorts/uzun video gelir payı, AdSense, vergi ve reused content ayrıntıları.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../README.md)
