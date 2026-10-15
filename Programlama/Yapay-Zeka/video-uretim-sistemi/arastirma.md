# Video üretim sistemi: Claude merkezli, sahne bazlı revizyonlu belgesel ve Shorts hattı

## 0. Başlık, özet, tarih, uyarı

- **Araştırma tarihi:** 15.10.2026. Tüm fiyatlar USD'dir ve bu tarihte resmî sayfalardan okunmuştur. Fiyatlar sık değişir, satın almadan önce yeniden bakılmalıdır.
- **Kapsam:** Tarih, "nasıl yapılır / nasıl inşa edildi", tarihte bilinmeyenler, gizemler ve UFO/UAP raporları gibi konularda iki tür video üreten bir sistem:
  - yatay (16:9) ~12 dakikalık belgesel tarzı video,
  - dikey (9:16) YouTube Shorts / Instagram Reels / TikTok videosu.
  
  Seslendirme, müzik, efekt, görsel ve video malzemesi; Türkçe ve İngilizce; sahneleri elle yazıp yönetebilme ve sahne bazlı revizyon da kapsamdadır.
- **Yöntem:** Bu belgede hiçbir model, servis veya render denenmedi. Yalnız belgeler ve fiyat sayfaları okundu. Tek istisna NASA görsel API'sine atılan anahtarsız bir deneme isteğidir. Süre ve maliyet rakamlarının çoğu **TAHMİN**dir; ilk gerçek videodan sonra ölçülüp düzeltilmelidir.
- **Etiketler:**
  - **[RESMÎ]** üreticinin, platformun ya da kurumun kendi sayfası
  - **[3. TARAF]** haber, blog, forum, karşılaştırma sitesi
  - **[TAHMİN]** bu belgedeki hesap veya çıkarım
  - **[ÇELİŞKİLİ]** kaynaklar uyuşmuyor
  - **[DOĞRULANAMADI] / [BİLİNMİYOR] / [bulunamadı]** resmî kaynakta karşılığı bulunamadı ya da belirtilmemiş
- **Uyarı:** Bu belge hukuki, vergisel ya da finansal danışmanlık değildir. Telif, kişilik hakkı ve vergi kararları için uzmana danışılmalıdır.
- **Okur varsayımı yok:** Belge tek bir okur durumunu esas almaz. Her ana bölümde şu üç eksende dallanma vardır:
  - bütçe: **yok / az / orta**
  - ekran kartı: **yok / 6–8 GB / 16+ GB**
  - otomasyon: **tam otomatik / yarı otomatik / elle**

### Depodaki ilgili sayfalar (burada tekrar edilmez, yalnız atıf yapılır)

| Sayfa | Ne var | Bu belgede nasıl kullanıldı |
|---|---|---|
| [../kodla-video/](../kodla-video/) (12.10.2026) | Remotion'un çalışma mantığı ve lisansı, Agent Skills, LLM'in sahne JSON'u üretip TSX şablonlarının bir kez yazılması, Zod şemalı Composition, yerel LLM/TTS/görsel/geçiş/altyazı VRAM tabloları (§8), `kaynak_alinti` ile uydurma denetimi (§6), alternatifler (HyperFrames, Manim, Motion Canvas; §9–10) | Atıf, ayrıca sahne bazlı revizyon ve yayın tarafında derinleştirildi |
| [../goruntu-netlestirme/](../goruntu-netlestirme/) | Real-ESRGAN ncnn vb. ile yerel büyütme, süreç çağırma deseni (§4) | Düşük çözünürlüklü arşiv karelerini 1080p/4K'ya çıkarmak için |
| [../../../Rehberler/YouTube-Oyun/](../../../Rehberler/YouTube-Oyun/) | YPP eşikleri ve 01.02.2027 değişikliği, Shorts (%45) ve uzun video (%55) gelir payı, AdSense, W-8, GVK 20/B, reused content, AI çıktısının telif durumu (arastirma.md §9–10) | Yayın ve vergi bölümlerinde atıf |

> Not: Görev metninde geçen `kodla-video/arastirma.md` dosyası depoda **yoktur**. O klasörde yalnız `README.md` ve `index.html` vardır, ikisi de okundu.

---

## 1. Kısa cevaplar

| Soru | Kısa cevap |
|---|---|
| **Claude web (claude.ai) ile olur mu?** | **Evet, elle çalışan bir akış için.** Projects, Research, Artifacts ile araştırma, senaryo, sahne tablosu/JSON, arama sorguları, başlık ve açıklama üretilir. claude.ai **ses, müzik, fotoğraf ya da gerçekçi video üretmez.** claude.ai'yi betikle (Playwright/Selenium) sürmek Tüketici Şartları md. 3'e göre **yasaktır**. [RESMÎ] → §3 |
| **API ile olur mu?** | **Evet, sistemin beyni olarak.** Messages API, structured outputs (şemaya uyan JSON), web search, Batch API (%50 indirim), prompt caching, Agent SDK. Çıktı **yalnız metindir**; TTS, görsel, video ve render dış araçlarla yapılır. [RESMÎ] → §3 |
| **"Ayda 200 $ ücretsiz API kredisi" doğru mu?** | **Kısmen.** 200 $ kredi vardır, ama **ücretsiz değildir**: aylık 200 $ ödenen **Max 20x** aboneliğine dahildir. Max 5x'te 100 $, Team'de koltuk başına 20 $ / 100 $ (havuz tavanı 500 $). **Free, Pro ve Enterprise'da yoktur.** Kredi devretmez, etkileşimli Claude Code'da geçmez. [RESMÎ] → §3.1 |
| **12 dk video, video başı maliyet?** | Claude metin kısmı **~1–2,5 $** (Opus 5.5; batch ile üst sınır tasarruf ~0,5–1 $, ama sıralı senaryo zincirinde pratik değil, §11.1). TTS **0–1 $**. Görsel/video **0 $ (arşiv+stok+kod) ile 10–110 $ (AI video ağırlığı)** arası. Render yerelde 0 $. Gerçekçi toplam: **yarı otomatik ve arşiv ağırlıklı ~1,2–3,5 $; az AI klipli ~6–18 $.** [TAHMİN] → §11 |
| **Türkçe / İngilizce?** | İkisi de. Claude iki dilde yazar. Türkçe TTS bulutta (ElevenLabs, Google Chirp 3 HD/Gemini TTS, Azure, OpenAI, Polly) ve yerelde (Chatterbox Multilingual V3, VoxCPM2) var. Önerilen yöntem: **ortak iddia tablosu → her dilde ayrı yazım**, aynı sahne ID'leri, her dil ayrı render. → §5, §9 |
| **Sahneleri ben yazabilir miyim?** | **Evet.** Sahne dosyası (Markdown/YAML ya da JSON) insan tarafından yazılır ve `kilit: true` ile işaretlenir. AI kilitli sahnenin metnine dokunmaz, yalnız olgu denetimi ve süre uyarısı verir. → §9.3 |
| **Revizyon nasıl?** | Sahne = en küçük revizyon birimi. Her sahnenin sesi ve görüntüsü içerik özeti (hash) ile önbelleğe alınır. Revizyon sahne ID'siyle verilir ("s07: harita oku yavaş"). Yalnız değişen sahnenin sesi ve render'ı yeniden üretilir, sonra birleştirilir. → §7 |
| **YPP'de para kazanır mı?** | **Yarı otomatik ve özgün anlatımlıysa evet, tam otomatik seri üretimde risk yüksek.** YouTube'un "inauthentic content" politikası (15.07.2025 [RESMÎ]; bugün üç başlıklı [RESMÎ], bu ayrımın Temmuz 2026 tarihi [3. TARAF]) jenerik şablonla seri üretilmiş AI içeriği ve anlatısız slaytları para kazanmadan çıkarır, **kanalın bütününe** uygulanır. Ayrıca Topluluk Kuralları'ndaki spam politikası AI ile tekrarlayan seri üretimi **kaldırma ve ihtar** düzeyinde yasaklar. Gerçekçi AI canlandırmalar beyan ister. [RESMÎ] → §10 |
| **En mantıklı başlangıç?** | **"B-lite" MVP:** claude.ai veya küçük bir API betiği ile senaryo + sahne JSON'u → tek bir bulut ya da yerel TTS → arşiv/stok görsel → Remotion ile 4–5 sahne türü → elle YouTube yüklemesi. Önce 1 uzun video + 1 Short, ölç, sonra otomatikleştir. Kredi için özellikle Max almak gerekmez: aylık API harcaması 80 $'ın altındaysa Pro + kullandıkça öde daha ucuzdur; 80–180 $ arası Max 5x, 180 $ üstü Max 20x (§3.1 başabaş tablosu). [TAHMİN] → §8, §9 |

---

## 2. Hedef ve gereksinimler

### 2.1 Çıktılar

| Çıktı | Biçim | Süre | Kelime bütçesi [TAHMİN] | Sahne/plan [TAHMİN] |
|---|---|---|---|---|
| Uzun video | 1920×1080 (16:9), 24/25/30 fps | ~12 dk = 720 sn | EN ~1.450–1.600 (geniş aralık 1.400–1.750); TR ~1.100–1.200 (geniş aralık 1.050–1.350) | 30–60 anlatı sahnesi, 90–180 plan (shot) |
| Dikey kısa video | 1080×1920 (9:16) | 30–60 sn; YouTube Shorts'ta en çok 3 dk [RESMÎ] | EN ~130, TR ~100 (60 sn için) | 8–15 plan |
| Ekler | SRT/VTT altyazı (TR+EN), 3 kapak adayı, başlık/açıklama/etiket/bölümler, kaynakça ve atıf listesi, AI beyanı bilgisi | — | — | — |

### 2.2 Konu türleri ve özel gereksinimleri

| Konu türü | Görsel kaynağı | Doğruluk gereksinimi | Yayın riski |
|---|---|---|---|
| Tarih anlatısı | Arşiv (NARA, LoC, Commons, Devlet Arşivleri*), harita, zaman çizelgesi | Tarih, sayı ve kişi adları en az 2 bağımsız kaynakta | Savaş/şiddet görüntüsü reklam uygunluğunu düşürür |
| "Nasıl yapılır / nasıl inşa edildi" | Prelinger eğitim filmleri, şematik animasyon, sınırlı AI canlandırma | "Kesin bilinen teknik" ile "akademik hipotez" ayrımı | Gerçekçi AI canlandırma beyan ister |
| Tarihte bilinmeyenler / gizemler | Belge, tanık ifadesi, harita, etiketli canlandırma | "Kesin / olası / iddia / kanıtsız" sepetleri | Uydurma alıntı ve mitleri gerçek gibi sunma |
| UFO/UAP raporları | NARA RG 615, Project Blue Book, AARO, NASA UAP raporu, CIA Reading Room | Resmî konum doğru aktarılmalı (ör. AARO Cilt 1: dünya dışı teknolojiye dair ampirik kanıt yok) | Sahte "kanıt" görünümlü AI görüntüsü; TikTok'ta "gizli güç suçlaması" For You akışı dışı |

\* Devlet Arşivleri belgeleri ticari kullanımda kısıtlıdır, bkz. §4.5 ve §12.1.

### 2.3 İşlevsel gereksinimler

1. **Sahne bazlı revizyon:** tek bir sahne değişince yalnız o sahnenin sesi, görseli ve render'ı yeniden üretilmeli.
2. **Kullanıcı yönetimi:** kullanıcı sahne yazabilmeli, kilitleyebilmeli, yönetmen notu düşebilmeli.
3. **İki dil:** aynı sahne iskeletinden TR ve EN; görsel varlıklar ortak, ses ve ekran yazısı dile özel.
4. **Tek projeden iki biçim:** aynı sahne verisinden 16:9 ve 9:16 render.
5. **Kaynak izlenebilirliği:** her olgu cümlesi bir iddia/kaynak kimliğine, her görsel bir lisans kaydına bağlı.
6. **AI beyanı izlenebilirliği:** her plan için `ai_uretimi` ve `gercekci` alanları; YouTube/TikTok/Instagram beyanı buradan türetilir.
7. **Maliyet ve süre ölçümü:** her video için gerçek maliyet ve süre kaydı.

---

## 3. Claude'un rolü ve sınırları

### 3.1 "Ayda 200 $ API kredisi" iddiasının doğrulaması [RESMÎ]

Kaynaklar: https://platform.claude.com/docs/en/about-claude/api-credits-for-subscribers , https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-and-team-plans , https://claude.com/pricing , https://support.claude.com/en/articles/11049741-what-is-the-max-plan , https://www.anthropic.com/legal/credit-terms , https://platform.claude.com/docs/en/api/rate-limits

| Plan | Plan ücreti | Aylık API kredisi |
|---|---|---|
| Free | 0 $ | **Yok** |
| Pro | 20 $/ay (yıllıkta 17 $/ay) | **Yok** |
| Max 5x | 100 $/ay | **100 $** |
| Max 20x | 200 $/ay (web fiyatı; mobil fiyat farklı olabilir) | **200 $** |
| Team Standard, aylık faturalama | 25 $/koltuk/ay | 20 $/koltuk, havuzlanır |
| Team Standard, yıllık faturalama | 20 $/koltuk/ay (yıllık peşin) | 20 $/koltuk: **ödenen ücretin tamamı kredi olarak döner** |
| Team Premium | 125 $/koltuk/ay (yıllıkta 100 $) | 100 $/koltuk, havuzlanır |
| Enterprise | Koltuk başı 20 $/ay, **yıllık faturalama, en az 20 koltuk** (≥4.800 $/yıl) + API fiyatıyla kullanım | **Yok** |

- Team kredileri tek havuzda toplanır, havuz tavanı **500 $/ay**. Örnek: 3 Standard + 2 Premium = 260 $/ay kredi. [RESMÎ]
- Team "teams of 2 to 150" içindir: en az 2, en çok 150 koltuk [RESMÎ]. Tek kişinin 2 koltuk alıp kendi kullanmasının şartlara uygun olup olmadığı resmî kaynakta yazmıyor [BİLİNMİYOR].
- [TAHMİN, resmî fiyatlardan] Team yoluyla kredi: 2 Standard koltuk aylıkta 50 $/ay ödeme → 40 $ kredi; yıllıkta 480 $/yıl peşin → ayda 40 $ kredi + iki Claude koltuğu (ödenen ücret kredi olarak geri gelir).
- Max 20x fiyatı: claude.com/pricing yalnız "From $100" diyor; 200 $ rakamı Max plan destek makalesinden geliyor. Bazı ham notlar bunu yalnız TAHMİN olarak işaretlemişti; destek makalesiyle **[RESMÎ]** sayılır.

**Şartlar [RESMÎ]:**
- Plan aktif ve "in good standing" olmalı; yeni abone **7 gün** sonra talep edebilir. iOS/Android aboneliği de geçerli, ama talep claude.ai'de **web tarayıcısından** yapılır.
- Yol (Max): claude.ai → Settings > Billing → API credits → "Link organization" → Console organizasyonu seçilir (akış sırasında yeni Console organizasyonu da oluşturulabilir), Supplemental Credit Terms kabul edilir. Team'de yol farklıdır: **Organization settings > Billing**.
- **Talep için gereken roller:** Max'te abonenin kendisi; Team'de Primary Owner/Owner; Console tarafında Owner/Admin/Billing rolü.
- **Tek** Console organizasyonu bağlanır; kullanıcı sonradan değiştiremez (destek gerekir). Ödeme yöntemi gerekmez. ("Console'a claude.ai ile aynı e-postayla girilir" bilgisi okunan resmî sayfalarda bulunamadı [DOĞRULANAMADI]; belirleyici olan yukarıdaki rol şartlarıdır.)
- Krediler Console'da **"Promotional credits"** olarak görünür. Organizasyondaki tüm API anahtarları ve workspace'ler aynı bakiyeden harcar; proje bazlı sınır için workspace harcama limiti kullanılır.
- **Devretmez:** fatura dönemi sonunda yanar. Önce aylık kredi, sonra satın alınmış kredi harcanır.
- **Program şartları:** krediler **devredilemez ve satılamaz, nakit değeri yoktur, iade edilmez, yalnız hesap sahibi kullanabilir.** Yani "ücretsiz para" değil, yalnız Anthropic API'sinde, o dönem içinde harcanabilen bir haktır. https://www.anthropic.com/legal/credit-terms
- **Plan değişikliği:** Max 5x'ten 20x'e geçişte orantılı kredi verilir; Max'ten Team'e geçişte bağlantı biter ve yeniden talep için 7 gün beklenir.
- Kredi bitince (satın alınmış kredi veya otomatik yükleme yoksa) API istekleri durur; hata metni "Your credit balance is too low…". Abonelikten ücret çekilmez.
- İptal edilirse yeni kredi gelmez; eldeki kredi süresi dolana kadar kullanılır.
- **Hız ve harcama limiti [RESMÎ]:** bağlı organizasyon en az Start tier'a çıkar; aylık kredisi 200 $'ın **üstünde** olan Build tier'a çıkar; bu kredi tier atlamaya sayılmaz. Start tier'da Opus 5.5 / Sonnet 5.5 / Haiku 5.5 için **1.000 RPM, 2.000.000 ITPM, 400.000 OTPM**; batch kuyruğu 200.000 istek. Önbellekten okunan token'lar ITPM'e sayılmaz. Bu sistem için (video başına ~240K giriş, ~80K çıkış; ayda 30 uzun + 90 Short'ta bile) **hız limiti darboğaz değildir.** Dikkat edilecek nokta **aylık harcama tavanıdır**: Start tier'da 500 $, Build'de 1.000 $; kredi ile ödenen kullanım da tavana sayılır; tavan takvim ayının 1'inde sıfırlanır, kredi ise fatura döneminde yenilenir. Ücretsiz deneme kredisiyle başlayan, kullanım geçmişi az yeni organizasyon daha düşük limitli **Evaluation tier**'da olabilir. https://platform.claude.com/docs/en/api/rate-limits , https://platform.claude.com/docs/en/about-claude/api-credits-for-subscribers

**Kapsam [RESMÎ]:**

| Kredi geçer | Kredi geçmez |
|---|---|
| Messages API ve Message Batches API | Terminal, IDE, masaüstü ve web'deki **etkileşimli Claude Code** |
| Console Playground | GitHub Action, IDE eklentisi ve masaüstünden başlayan çalıştırmalar (`-p` olsa bile) |
| Claude Managed Agents | claude.ai, Claude Code ve Cowork'teki "extra usage" |
| Agent SDK (**API anahtarıyla**) | Bedrock, Vertex, Foundry, Claude Platform on AWS |
| Bağlı organizasyonun API anahtarıyla çalışan `claude -p` **[ÇELİŞKİLİ]** | Abonelik girişiyle çalışan `claude -p` (plan limitinden düşer) |

**`claude -p` çelişkisi [ÇELİŞKİLİ]:** Docs sayfasının "At a glance" ve "What the credits cover" tablolarında "Claude Code: No" yazıyor; aynı sayfa yalnız bu kredilere sahip bir organizasyondan gelen Claude Code oturumunun "Credit balance too low" hatası vereceğini söylüyor. Destek makalesi ise API anahtarıyla çalışan `claude -p`'yi kapsam içinde sayıyor. Küçük bir deneme isteğiyle doğrulanmalı. Otomasyon için önerilen yol, kendi orchestrator'ından **Messages/Batches API'si veya Agent SDK'dır (API anahtarıyla)**; resmî kapsam listesinin ilk sırasındakiler bunlardır. https://platform.claude.com/docs/en/about-claude/api-credits-for-subscribers , https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-and-team-plans

**Başlangıç tarihi [ÇELİŞKİLİ, küçük]:** Depodaki [kodla-video](../kodla-video/) sayfası "7 Ekim 2026'dan beri" diyor; destek makalesi sabit tarih vermiyor, "rolling out over a few days" diyor. Kredinin var olduğu kesin.

Yeni API hesabına **tek seferlik**, miktarı belirtilmemiş küçük bir deneme kredisi verilir; **aylık değildir**, "ayda 200 $" ile karıştırılmamalı. Yeni organizasyon düşük limitli Evaluation tier'da başlayabilir. [RESMÎ] https://platform.claude.com/docs/en/about-claude/pricing , https://platform.claude.com/docs/en/api/rate-limits

**Sonuç [TAHMİN]:**
- "Ücretsiz" değil; 200 $'lık aboneliğin içinde gelen bir hak.
- Kredi **yalnız Anthropic API'sinde** geçer. TTS, Veo, Gemini görsel, OpenAI görsel, Runway, stok siteleri gibi dış servislere harcanamaz.
- Video sisteminin Claude maliyeti ayda 13–100 $ aralığında kalır (§11). Karar aylık API harcamasına göre verilmeli (aşağıdaki tablo).

**Başabaş tablosu [TAHMİN, resmî fiyatlardan hesaplandı]:** Max 5x (100 $ → 100 $ kredi) ile Pro (20 $) + kullandıkça öde, aylık **80 $** API harcamasında başabaş olur; Max 20x (200 $) için başabaş **180 $**'dır.

| Aylık API harcaması | Daha ucuz yol |
|---|---|
| < 80 $ | Pro + kullandıkça öde API |
| 80–180 $ | Max 5x (§11.3'teki "yoğun" senaryo ~99 $ buraya düşer) |
| > 180 $ | Max 20x ya da Max 5x + satın alınmış kredi |
| 2+ kişilik ekip | Yıllık Team Standard: ödenen ücretin tamamı kredi olarak döner (yukarı bkz.) |

- Kullanılmayan kredi her dönem yanar, devretmez, nakit değeri yoktur: ayda X $'lık kredinin tamamı kullanılmıyorsa avantaj o oranda azalır. Harcama dalgalıysa başabaşın üstünde güvenlik payı bırakılmalı.

### 3.2 Abonelik ile API ayrı ürünlerdir [RESMÎ]

- claude.ai (web, masaüstü, mobil) ve Claude Code **aynı kullanım havuzundan** harcar; 5 saatlik kayan pencere ve ücretli planlarda haftalık limit vardır (claude.com/pricing).
- Opus'un üstündeki Fable modeli: Pro'da yalnız usage credits ile; Max'te haftalık limitin %50'si Fable'a açık; Team'de **yalnız Premium koltukta**, haftalık limitin %50'si [RESMÎ] https://claude.com/pricing .
- API (platform.claude.com) ayrı üründür, token başına ödenir.

**Abonelik girişini otomasyonda kullanma yasağı [RESMÎ]:**
- https://code.claude.com/docs/en/legal-and-compliance : OAuth (abonelik girişi) yalnız Claude Code ve Anthropic'in kendi uygulamaları içindir. Geliştirici kendi uygulamasında claude.ai girişi sunamaz, kullanıcı adına Free/Pro/Max kimliğiyle istek geçiremez, oturum token'ı toplayamaz. Ürün yapan (Agent SDK dahil) **API anahtarı** kullanmalı.
- Aynı sayfa: Pro/Max limitleri Claude Code ve Agent SDK'nın "olağan, bireysel kullanımına" göre hesaplanmıştır. [TAHMİN] 7/24 çalışan, abonelik girişli bir "video fabrikası" bunun dışında sayılabilir.
- Tüketici Şartları md. 3: hizmete "bot, script veya otomatik yollarla" erişim yasak; istisna API anahtarı ve açık izin. https://www.anthropic.com/legal/consumer-terms
- Agent SDK: "Unless previously approved, Anthropic does not allow third party developers to offer claude.ai login or rate limits for their products." https://code.claude.com/docs/en/agent-sdk/overview

### 3.3 Model ve fiyatlar (15.10.2026) [RESMÎ]

Kaynaklar: https://platform.claude.com/docs/en/about-claude/pricing , https://platform.claude.com/docs/en/about-claude/models/overview

| Model (API ID) | Giriş $/MTok | Çıkış $/MTok | Önbellek okuma | Batch (giriş/çıkış) | Not |
|---|---|---|---|---|---|
| Fable 5.1 (`claude-fable-5-1`) | 10 | 50 | 0,25 | 5 / 25 | En güçlü, en yavaş |
| Opus 5.5 (`claude-opus-5-5`) | 4 | 20 | 0,20 | 2 / 10 | Resmî "çoğu iş için buradan başla"; thinking her zaman açık |
| Sonnet 5.5 (`claude-sonnet-5-5`) | 2 | 10 | 0,10 | 1 / 5 | Hız/zekâ dengesi |
| Haiku 5.5 (`claude-haiku-5-5`), istem ≤100K | 0,10 | 0,50 | 0,01 | 0,05 / 0,25 | Sınıflandırma, çıkarım, toplu iş |
| Haiku 5.5, istem >100K | 0,50 | 2,50 | 0,05 | 0,25 / 1,25 | 5 kat sıçrama; uzun kaynak metni Haiku'ya verme |

- Tüm güncel modellerde bağlam 1M token, senkron çıkış en fazla 128K (batch'te beta başlığıyla 300K). Bilgi kesimi Haziran 2026. Girdi metin + görsel, **çıktı yalnız metin**.
- **Thinking token'ları çıkış fiyatından faturalanır**, metin dönmese bile. Opus 5.5 ve Fable 5.1'de thinking kapatılamaz, `effort` ile kısılır; Sonnet 5.5'te `between_tools` ile kapatılabilir. https://platform.claude.com/docs/en/build-with-claude/thinking
- **Varsayılan effort [RESMÎ]:** Opus 5.5 medium, Sonnet 5.5 high, Haiku 5.5 medium, Fable 5.1 high. https://platform.claude.com/docs/en/about-claude/models/overview . §11.1'deki 80K çıkış medium effort varsayar; high/xhigh'ta çıkış belirgin artabilir [TAHMİN]; token sayısı `count_tokens` ve yanıttaki `usage` ile ölçülmeli.
- Yeni tokenizer (Claude 4.7 ve sonrası) eski modellere göre ~1–1,35 kat token üretir (1M token ≈ 555K kelime; eski tokenizer'da ~750K) [RESMÎ, İngilizce için]; Türkçe oranı ölçülmeli [TAHMİN]. Türkçe ekli bir dil olduğundan kelime başına token İngilizceden belirgin fazladır (bir notta 1,5–2 kat tahmini var); token counting uç noktasıyla ölçülmeli.
- Hiçbir güncel model Eylül–Ekim 2027'den önce kapanmayacak.

**Özellik fiyatları ve sınırları [RESMÎ]:**

| Özellik | Ayrıntı | Kaynak |
|---|---|---|
| Batch API | %50 indirim, prompt caching ile birlikte kullanılabilir. Bir batch'te en fazla 100.000 istek veya 256 MB. Çoğu 1 saatte biter; 24 saatte bitmeyen istek "expired" olur, ücretlenmez. Sonuçlar 29 gün saklanır. 1 saatlik önbellek öneriliyor | https://platform.claude.com/docs/en/build-with-claude/batch-processing |
| Prompt caching | 5 dk yazma 1,25x, 1 saat yazma 2x giriş fiyatı. Okuma Opus/Sonnet 5.5'te 0,05x, çoğu modelde 0,1x. En az 512 token (Opus/Sonnet/Haiku 5.5). Tek üst düzey `cache_control` ile otomatik önbellek; en çok 4 kırılma noktası | https://platform.claude.com/docs/en/build-with-claude/prompt-caching |
| Structured outputs (GA) | `output_config.format` → `type: "json_schema"`, ya da araçlarda `strict: true`. Desteklenmeyen: `minimum`/`maximum`, string uzunluğu, 0–1 dışı `minItems`/`maxItems`, özyinelemeli şema. Nesnelerde `additionalProperties: false`. Şema ilk kullanımda derlenir, 24 saat saklanır; şemayı değiştirmek prompt önbelleğini bozar. İstekte en çok 20 strict araç. `stop_reason` "refusal" veya "max_tokens" ise çıktı şemaya uymayabilir | https://platform.claude.com/docs/en/build-with-claude/structured-outputs |
| Web search aracı | 1.000 aramada 10 $ + sonuç token'ları. Sürümler `web_search_20250305`, `web_search_20260209` (dinamik filtreleme), `web_search_20260318`. Atıf her zaman açık: `url`, `title`, `cited_text` (≤150 karakter, token'a sayılmaz). `allowed_domains` / `blocked_domains` (ikisi birlikte olmaz), `max_uses`. Batch'te de çalışır. Son kullanıcıya gösterilirken atıf orijinal kaynağa verilmeli | https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool |
| Web fetch | Yalnız token ücreti | pricing |
| Code execution | Web search/fetch ile birlikte ücretsiz; tek başına ayda 1.550 saat bedava, sonrası 0,05 $/saat | pricing |
| Managed Agents | Token + oturum çalışma süresi 0,08 $/saat; batch indirimi yok | pricing |
| ABD'de çıkarım (`inference_geo: "us"`) | 1,1x fiyat | pricing |
| Tool use | Araç sistem istemi Opus/Sonnet 5.5'te 286 token ekler | pricing |

### 3.4 Yüzeye göre: web, Code, API

#### claude.ai (web, masaüstü, mobil) [RESMÎ]

| Özellik | Ayrıntı | Video sisteminde kullanım [TAHMİN] |
|---|---|---|
| **Projects** | Proje başına kalıcı talimat ve bilgi dosyaları; dosya başına 30 MB; toplam içerik bağlama sığmalı | Kanal stil kılavuzu, anlatıcı ses tarifi, sahne şablonu, yasaklı ifadeler, kaynak politikası, epistemik dil sözlüğü |
| **Dosya yükleme** | Dosya başına 500 MB, sohbet başına 20 dosya; görsel ≤8000×8000; PDF 100 sayfaya kadar görsel dahil, 101–1000 sayfa yalnız metin. Türler: PDF, DOCX, CSV, TXT, HTML, ODT, RTF, EPUB, JSON, XLSX, JPEG, PNG, GIF, WebP. **Ses ve video listede yok** https://support.claude.com/en/articles/8241126-upload-files-to-claude | Arşiv PDF'lerini okutup birebir alıntı çıkarmak |
| **Research** | Pro/Max/Team/Enterprise; web araması açık olmalı; seçili modelden bağımsız Opus 5.5 ile çalışır (gerekirse Opus 4.8); limiti hızlı tüketir https://support.claude.com/en/articles/11088861-using-research-on-claude | Kaynak taraması, "bilinen / tartışmalı / uydurma" ayrımı; çıktı yine doğrulanmalı |
| **Artifacts** | HTML/React/SVG; Free'de de var | Senaryo okuma ekranı, sahne tablosu editörü, revizyon kontrol listesi |
| **Claude Motion** (beta, yalnız Team/Enterprise) | İstemden kodla kısa animasyon, **MP4 dışa aktarım**; "gerçekçi görüntü veya insan üretmez"; plan limitinden düşer. Süre, çözünürlük, 9:16, ses ve ticari kullanım belgede **yazmıyor** https://support.claude.com/en/articles/17454997-get-started-with-claude-motion | Ara grafik, zaman çizelgesi, harita animasyonu için Remotion'a alternatif olabilir; 12 dk'lık videonun tamamı için uygunluğu bilinmiyor |
| **Connector'lar** (Canva, Figma vb.) | Canva connector'ı tasarım üretme, varlık arama, dışa aktarma sunuyor [3. TARAF] https://www.techloy.com/claude-ai-now-integrates-with-canva-for-enhanced-design/ | Kapak tasarımı; görsel üretimi Canva/Figma'nın kendi modeliyle olur, şartlar o servise bağlı. Ücretsiz planla çalışıp çalışmadığı [ÇELİŞKİLİ] |
| **Otomasyon** | claude.ai'yi betikle sürmek yasak | claude.ai yalnız **elle** akış için |

#### Claude Code (CLI, web) [RESMÎ]

- **Pro planda da var.** API kredisi olmadan pipeline kodu yazdırmak mümkün; plan limitinden düşer.
- **Yerel CLI:** Remotion projesi, orchestrator, FFmpeg komutları, whisper.cpp adımı burada yazdırılıp çalıştırılır. Remotion Agent Skills: `npx skills add remotion-dev/skills` (bkz. [kodla-video](../kodla-video/) §5).
- **Cloud oturumları** (claude.ai/code, `claude --cloud`): https://code.claude.com/docs/en/claude-code-on-the-web , https://code.claude.com/docs/en/cloud-environments
  - Pro, Max, Team ve Enterprise'da premium ya da Chat + Claude Code koltuklarında; VM için ek ücret yok. Cloud oturumları **planın kullanım limitinden düşer** ve diğer tüm Claude kullanımıyla aynı limiti paylaşır; paralel görevler limiti orantılı tüketir.
  - VM: Ubuntu 24.04, 4 vCPU, 16 GB RAM, 30 GB disk. Hazır: Python, Node 20–22, Docker, Postgres, Redis. **FFmpeg ve Chrome hazır değil** (yalnız chromedriver). Setup script root çalışır, `apt install` yapılabilir; 5 dakikada biterse ortam önbelleğe alınır.
  - Komut zaman aşımı: varsayılan 2 dk, en çok 10 dk, arka planda +30 dk.
  - Ağ: None, Trusted (paket depoları + GitHub), Full, Custom. Stok siteleri ve TTS API'leri için Full veya Custom gerekir.
  - Repo için GitHub gerekir; GitHub dışı repo yalnız "bundle" ile gider ve geri push edilemez.
  - [TAHMİN] 12 dk Remotion render'ı 4 vCPU'da uzun sürer ve zaman aşımına takılabilir. **Render yerelde, cloud yalnız kod yazma ve test için.**
- **`claude -p` (headless):** abonelik girişinde plan limitinden; bağlı organizasyonun API anahtarıyla Max/Team kredisinden düşüp düşmediği **[ÇELİŞKİLİ]**: docs sayfası Claude Code'u kapsam dışı sayıyor, destek makalesi API anahtarlı `claude -p`'yi kapsıyor (§3.1); küçük bir deneme isteğiyle doğrulanmalı. Otomasyon için önerilen yol, kendi orchestrator'ından Messages/Batches API'si veya Agent SDK'dır (API anahtarıyla).
- **Routines:** zamanlanmış cloud çalıştırmaları; cloud oturumu olarak çalışır.

#### Claude API: pipeline adımlarına göre öneri [RESMÎ özellikler, TAHMİN model seçimi]

| Pipeline adımı | API özelliği | Model önerisi |
|---|---|---|
| Kaynak toplama | web search (`allowed_domains` = arşivler + akademik) + web fetch | Sonnet / Opus |
| Senaryo (TR/EN) | Messages, kaynak metin 1 saatlik önbellekte | Opus 5.5 (kalite) / Sonnet 5.5 (fiyat) |
| İddia tablosu ve kaynak doğrulama | Ayrı geçiş; her iddia birebir alıntıyla eşleşiyor mu | Opus 5.5 |
| Sahne listesi (JSON) | Structured outputs, Remotion Zod şemasıyla aynı yapı | Sonnet 5.5 |
| Görsel arama sorguları | Structured outputs, sahne başına 3–5 İngilizce anahtar kelime | Haiku 5.5 |
| Altyazı | Zamanlama TTS/Whisper'dan; Claude yalnız düzeltme, satır bölme, TR↔EN | Haiku / Sonnet |
| Başlık, açıklama, etiket, bölümler, kapak metni | Structured outputs, batch | Haiku / Sonnet |
| Sahne bazlı revizyon | Yalnız ilgili sahnenin JSON'u + bağlam önbellekte | Sonnet |
| Gece toplu üretim | Message Batches (%50) + 1 saatlik cache | — |

- **Tool use:** Claude, pipeline fonksiyonlarını araç olarak çağırabilir (`search_stock(query)`, `tts(scene_id)`, `render(scene_id)`), kodu senin sürecin çalıştırır.
- **Agent SDK** (Python/TS): Claude Code'un ajan döngüsünü kütüphane olarak sunar (dosya, komut, web arama, hook, alt ajan, MCP). Max/Team kredisini **yalnız API anahtarıyla** kullanır. Çok turlu ajan döngüsü maliyeti **5–20 kat** artırabilir [TAHMİN, kodla-video ile aynı oran].
- **Managed Agents:** ajanı Anthropic barındırır, 0,08 $/saat; batch indirimi yok.
- **Resmî SDK dilleri:** Python, TypeScript, C#, Go, Java, PHP, Ruby. C# için `dotnet add package Anthropic` (sürüm 10+ resmî; eski 3.x ve altı topluluk paketi `tryAGI.Anthropic` oldu), .NET Standard 2.0+, `IChatClient` desteği. https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/csharp [RESMÎ]

### 3.5 Claude'un yapamadıkları [RESMÎ + TAHMİN]

- API çıktısı **yalnız metin**: ses, müzik, fotoğraf, gerçekçi video yok. Claude Motion da koddan animasyon üretir, gerçekçi görüntü üretmez.
- Ses ve video dosyası girdisi resmî listede yok: Claude bir sesi dinleyip kalitesini değerlendiremez, videoyu izleyemez. Kontrol için kareler (`renderStill()` ile PNG) görsel olarak verilebilir.
- Bu yüzden sistemde ayrıca **TTS (§5), görsel/video kaynağı (§6) ve render aracı (§7)** gerekir.

### 3.6 Çıktının sahipliği [RESMÎ]

- **Ticari Şartlar (API, Team):** "Customer … owns its Outputs". Anthropic, çıktıların üçüncü kişi fikrî mülkiyetini ihlal ettiği iddialarında belirli istisnalarla savunma taahhüt eder; istisnalar: değiştirilmiş çıktı, müşterinin verdiği girdi, bilerek ihlal. https://www.anthropic.com/legal/commercial-terms
- **Tüketici Şartları (Free/Pro/Max):** Anthropic çıktı üzerindeki haklarını devreder; ayarlardan kapatılmazsa içerik model eğitiminde kullanılabilir. https://www.anthropic.com/legal/consumer-terms

### 3.7 Durum → Claude tarafı [TAHMİN]

| Durum | Claude tarafı |
|---|---|
| Bütçe yok | Free/Pro'da claude.ai Projects ile **elle**: senaryo, sahne tablosu, sorgular. Yerel LLM yalnız biçim işi (JSON doldurma, taslak çeviri); olgu üretimi için önerilmez (bkz. §4.1). API'nin tek seferlik küçük deneme kredisi (aylık değil; Evaluation tier limitleri) |
| Az bütçe (20–40 $/ay) | Pro (Claude Code ile pipeline yazdırma) + Console'a az bakiye (Haiku/Sonnet + batch). Yarı otomatik |
| Orta bütçe (≥100 $/ay) | API harcaması ayda 80 $'ı geçiyorsa Max 5x (100 $ kredi), 180 $'ı geçiyorsa Max 20x (200 $) (§3.1 başabaş tablosu). 2 kişilik ekipse Team: 2 Standard koltuk = 40 $ kredi + Claude Motion (yıllık faturalamada ödenen ücretin tamamı kredi olarak döner) |
| Tam otomatik | API anahtarı + Agent SDK veya kendi orchestrator'ın. Abonelik girişiyle otomasyon kurulmaz. Kredi bitince istekler durur; auto-reload ya da satın alma gerekir |
| Yarı otomatik | Sahne JSON'u tek kaynak; revizyonda yalnız değişen sahne Claude'a gider (prompt cache) |
| Elle (kullanıcı sahneyi yazar) | Claude yalnız dil düzeltme, TR↔EN, olgu denetimi, arama sorgusu, metadata. Haiku yeterli, maliyet sente yakın |
| GPU yok / 6–8 GB / 16+ GB | Claude tarafı GPU'dan bağımsız (bulutta). 16+ GB'ta yerel LLM taslak üretebilir; Claude yalnız kalite ve doğrulama geçişinde kalır |

---

## 4. Senaryo ve araştırma/doğruluk iş akışı

### 4.1 Halüsinasyon riski

Tarih ve gizem içeriğinde en sık hatalar [TAHMİN, gözleme dayalı]:
1. Uydurma veya çarpıtılmış alıntı.
2. Yanlış tarih, sayı, kişi adı; benzer olayların karışması.
3. Yanlış görsel: başka olayın fotoğrafı, sahte (hoax) UFO fotoğrafı, AI ile üretilmiş "arşiv" görüntüsünün gerçek gibi sunulması.
4. Akademik olarak çürütülmüş mitlerin gerçek gibi sunulması.
5. Kaynak aklama: güvenilmez blogdan alınan bilginin "belgelere göre" diye yazılması.
6. Yanlış resmî konum ("Pentagon uzaylıları doğruladı" gibi).

- Anthropic'in rehberi teknikleri sıralar ve bunların halüsinasyonu "azalttığını ama tamamen ortadan kaldırmadığını" yazar. [RESMÎ] https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- Depodaki Vectara verisi ([kodla-video](../kodla-video/) §6) küçük yerel modellerde verilen metni özetlerken bile %4–23 uydurma oranı gösteriyor → **gerçeğe dayalı senaryo için küçük yerel LLM önerilmez.**

**Anthropic'in resmî teknikleri [RESMÎ, aynı sayfa]:**
- Modele "bilmiyorum" deme izni vermek.
- Uzun belgede önce birebir alıntı çıkartmak, sonra işi yaptırmak.
- Her iddiaya destekleyen alıntı buldurmak; alıntısız iddiayı geri çektirmek.
- Best-of-N: aynı istemi birkaç kez çalıştırıp tutarsızlığı halüsinasyon işareti saymak.
- Yinelemeli iyileştirme.
- "Yalnız verilen belgeleri kullan" kısıtı.

### 4.2 Önerilen akış: "iddia tablosu önce, senaryo sonra" [TAHMİN, resmî tekniklerden türetildi]

```
1. KONU KARTI          konu, açı, hedef dil(ler), süre, format (16:9 / 9:16)
2. KAYNAK TOPLAMA      Claude + web_search (allowed_domains = arşivler + akademik)
                       → kaynaklar.yaml: id, url, başlık, tür (birincil/ikincil/üçüncül),
                         kurum, erişim tarihi, lisans/kullanım şartı
3. KAYNAK METNİ ÇEKME  web_fetch / PDF indir → yerel metin (doğrulama için saklanır)
4. İDDİA TABLOSU       her olgu: iddia metni + kaynak_id + birebir alıntı + güven
                       (KESİN / OLASI / İDDİA / TARTIŞMALI) + rakam/tarih alanları
5. OTOMATİK DENETİM    kod: alıntı kaynak metinde birebir geçiyor mu? (dize araması)
                       geçmeyen iddia reddedilir (kodla-video §6 "kaynak_alinti" fikri)
6. ÇAPRAZ KONTROL      ikinci model/oturum iddia tablosunu kaynaklara karşı denetler
                       (best-of-N); tarih ve rakamlar en az 2 bağımsız kaynakta
7. İNSAN KAPISI #1     iddia tablosunu insan onaylar (en kritik adım)
8. SENARYO             Claude yalnız onaylı iddia tablosundan yazar ("dış bilgi kullanma")
                       her olgu cümlesi [iddia_id] etiketi taşır
9. SENARYO DENETİMİ    kod: etiketsiz olgu cümlesi, tabloda olmayan sayı/tarih/özel isim var mı?
10. GÖRSEL EŞLEME      her planın görseli: kaynak_id + lisans; AI ise ai_uretimi=true
11. İNSAN KAPISI #2    son metin + görseller: doğru olay / doğru yer / doğru yıl mı?
12. YAYIN              açıklamaya kaynakça; AI beyanı gerekiyorsa işaretle
13. YAYIN SONRASI      hata bildirimi → sahne bazlı düzeltme; açıklamada "Düzeltme:" notu
```

**Kaynak hiyerarşisi [TAHMİN]:**
1. Birincil belge (arşiv kaydı, resmî rapor)
2. Hakemli akademik yayın
3. Saygın ikincil kaynak (üniversite yayını, büyük ansiklopedi)
4. Haber
5. Wikipedia yalnız kaynak bulmak için; kendisi kaynak gösterilmez.
- Forum, YouTube ve "gizem blogları" yalnız "şu iddia var" bölümünde, **iddianın kendisi** olarak alıntılanır.
- Türkçe doğruluk kontrolü için teyit.org gibi platformlar ikinci kontrol olabilir [3. TARAF, bu araştırmada açılmadı].

**Otomasyon düzeyine göre insan payı [TAHMİN]:**

| Düzey | Kim ne yapar | Asgari insan kapısı |
|---|---|---|
| Tam otomatik | Akışın tamamı betikle | Yine de kapı #1 ve #2 önerilir; tarih/gizem için kapısız yayın önerilmez |
| Yarı otomatik | AI 1–6 ve 8–10, insan 7 ve 11 | 2 kapı (iddia tablosu ve son kurgu) |
| Elle | Kullanıcı sahneyi yazar, AI yalnız 4–6 ve 9 (olgu denetimi, süre hesabı) | Kullanıcının kendisi |

### 4.3 Kelime/süre bütçesi

**İngilizce [3. TARAF]:**
- Genel varsayılan 150 kelime/dk: https://rows.com/calculators/video-script-calculator
- Belgesel/uzun anlatım 130–140 kelime/dk (ses sanatçısı ~145 okusa da kurgu boşlukları ortalamayı düşürür): https://wiki.proz.com/forum/voiceover/194447-voiceover_output_per_hour.html
- Ağır, ölçülü belgesel 110–130 kelime/dk: https://change-your-narrative.beehiiv.com/p/voice-over-script-timer-calculator

**Türkçe:** Seslendirme için hakemli bir "kelime/dk" kaynağı **bulunamadı**. Mevcut veriler:
- Yetişkin konuşması "125–150 kelime/dk" (kaynaksız) ve Türkçe için "6,87 hece/sn" [3. TARAF, zayıf] https://www.webtekno.com/en-hizli-dil-hangisi-h147332.html
- Coupé ve ark. 2019 (17 dil, Türkçe dahil) örneklem ortalaması 6,63 hece/sn; dile özgü değer metinde yok [RESMÎ makale] https://pmc.ncbi.nlm.nih.gov/articles/PMC6984970/
- Türkçe kelime ortalaması 2,26 hece (744 kelimelik küçük derlem) [3. TARAF] https://acikerisim.btu.edu.tr/items/218e08f0-90d6-4482-ba9a-026fdbcebf34
- Hazırlıksız konuşma 251–300 hece/dk [3. TARAF] https://openaccess.mku.edu.tr/items/3861a095-b882-4eb1-a91b-ce4a4562f702
- **Türetilmiş tahmin [TAHMİN]:** belgesel anlatımı ~4–4,5 hece/sn (240–270 hece/dk), belgesel metninde kelime ~2,4–2,7 hece → **~95–115 kelime/dk**. (Başka bir ham not 110–130 kelime/dk varsaydı; aralık geniş tutulmalı.) Türkçe aynı içeriği **daha az kelime ama daha çok heceyle** söyler; diller arası kıyas saniye üzerinden yapılmalıdır.

**Karakter cinsinden [TAHMİN]:** her iki dilde ~850–950 karakter/dk → 12 dk ≈ **10.000–12.000 karakter** (hesapta 11.000), 60 sn ≈ 850–1.000 karakter.

**12 dk = 720 sn kelime bütçesi [TAHMİN]** (~%8–12 anlatımsız an: müzik vurgusu, arşiv görüntüsünün "nefes alması", geçişler):

| | EN (135 k/dk) | TR (105 k/dk) |
|---|---|---|
| Anlatımlı süre ~10,8 dk | ~1.450–1.500 | ~1.130–1.150 |
| Neredeyse kesintisiz ~11,5 dk | ~1.550–1.600 | ~1.200 |
| Geniş aralık | 1.400–1.750 | 1.050–1.350 |

**Kalibrasyon (en güvenilir yöntem):** Seçilen TTS sesiyle 200 kelimelik bir paragraf okut, süreyi ölç, kelime/dk değerini o sesin sabiti olarak sisteme gir. Hız ayarı değişirse yeniden ölç. Sistem sahne süresini tahminden değil, **üretilen ses dosyasının gerçek süresinden** almalıdır.

### 4.4 Bölüm iskeleti

**12 dk yatay [TAHMİN, yaygın belgesel/YouTube pratiği; resmî kaynak yok]:**

| Zaman | Bölüm | EN kelime | TR kelime | İşlev |
|---|---|---|---|---|
| 0:00–0:30 | Soğuk açılış (hook) | ~65 | ~50 | En çarpıcı **belgelenmiş** an, soru ya da çelişki; logo/selam yok; ilk 5 sn güçlü görsel |
| 0:30–1:15 | Vaat ve bağlam | ~100 | ~80 | Kapsam, neden önemli |
| 1:15–3:30 | Bölüm 1: Arka plan | ~300 | ~235 | Dönem, yer, kişiler; harita veya zaman çizelgesi |
| 3:30–5:45 | Bölüm 2: Olay / inşa süreci | ~300 | ~235 | Kronolojik ana anlatı; sonunda açık döngü |
| 5:45–8:00 | Bölüm 3: Kanıt / teknik ayrıntı | ~300 | ~235 | Birincil belgeler, ekrana gelen alıntılar |
| 8:00–10:15 | Bölüm 4: Tartışma / gizem | ~300 | ~235 | Resmî açıklama ile alternatif iddialar **ayrı ve etiketli** |
| 10:15–11:30 | Ne biliyoruz / ne bilmiyoruz | ~165 | ~130 | Kesin, olası, kanıtsız: üç sepet |
| 11:30–12:00 | Kapanış | ~60 | ~45 | Son cümle, kaynakların açıklamada olduğu, kısa CTA |

**İçerik türüne göre sıra [TAHMİN]:**
- **Tarih anlatısı:** kronolojik; hook genelde doruk anından, sonra başa dönüş.
- **Nasıl inşa edildi:** problem → malzeme ve lojistik → teknik (adım adım, şematik animasyon) → kanıt (buluntu, belge) → açık sorular. "Kesin bilinen teknik" ile "akademik hipotez" ayrımı açıkça söylenir.
- **Gizem / UFO:** olay (tarih, yer, tanıklar, birincil kayıt) → resmî inceleme sonucu → alternatif iddialar ve kaynakları → kanıt değerlendirmesi → üç sepet.

**Epistemik dil sözlüğü** (iki dilde sabit tutulmalı; çeviride kesinlik derecesi kaymamalı):

| TR | EN |
|---|---|
| belgelere göre | according to records |
| tanık ifadesine göre | according to witness testimony |
| iddia ediliyor | it is claimed |
| kanıtlanmadı | unverified |
| tarihçiler arasında tartışmalı | disputed among historians |

**60 sn dikey [TAHMİN]:**

| Saniye | Parça | EN | TR |
|---|---|---|---|
| 0–2 | Görsel + yazılı hook: tek cümlelik çelişki/soru, büyük ekran yazısı | 8–10 | 6–8 |
| 2–10 | Bağlam: kim, nerede, ne zaman | ~18 | ~14 |
| 10–40 | Gövde: tek şaşırtıcı **belgelenmiş** bilgi + 2–3 kanıt karesi | ~65 | ~50 |
| 40–55 | Sonuç: "resmî açıklama…" / "hâlâ bilinmeyen…" | ~30 | ~25 |
| 55–60 | Döngü veya uzun videoya yönlendirme | ~8 | ~6 |
| **Toplam** | | ~130 | ~100 |

- Kısa videoda konuşma biraz daha hızlı olur (EN 150–160 k/dk) [TAHMİN].
- **Tek Short = tek iddia.** Tartışmalı konuda sona "kanıtlanmadı" kartı ya da uzun videoya bağlantı.
- Altyazı ve ekran yazısı alt ve sağ arayüz bölgelerinden uzak durmalı; platformların güvenli alan ölçüleri resmî kaynakta doğrulanmadı [TAHMİN].
- **Uzun videodan Short türetme:** her bölümün en güçlü belgelenmiş anı bir Short olur (video başına 3–5 Short), ama **yeniden yazılır ve yeniden yerleştirilir**. 16:9 kareyi kırpıp aynı anlatımı kesmek "inauthentic / reused" riskini artırabilir [TAHMİN; politika metni bunu adıyla anmıyor].

### 4.5 Birincil kaynaklar ve arşivler

**Genel kural [RESMÎ]:** ABD federal çalışanlarının **görevi gereği ürettiği** kayıtlar ABD'de kamu malıdır. NARA: "not all records in the holdings of the National Archives … are in the public domain", "NARA does not confirm copyright status for any items"; bağışlanmış materyal kısıtlı olabilir; her kayıttaki **"Use Restriction(s)"** alanına bakılır. CIA: "If a copyright is indicated on a photo… permission" gerekir.
- **"Kaydı kim üretti?" kuralı [RESMÎ dayanak: NARA permissions]:** federal personel → PD; **sivil tanığın çektiği fotoğraf, gazete kupürü, dergi sayfası** (UFO dosyalarında sık görülür) → üçüncü taraf telifine tabi olabilir, ayrı telif kontrolü gerekir. Asset manifest'e `ureten: federal | sivil | basin` alanı eklenmeli [TAHMİN]. https://www.archives.gov/research/still-pictures/permissions , https://www.archives.gov/faqs . Türkiye'den yayın yapan kanal için ABD kamu malı statüsünün başka ülkede aynı sayılıp sayılmadığı incelenmedi; pratikte sorun bildirilmiyor ama hukuki teyit yok [TAHMİN].

| Arşiv | Ne var | Kullanım şartı | Etiket |
|---|---|---|---|
| **NARA UAP Records Collection (RG 615)** | 2024 NDAA md. 1841–1843 ile kuruldu; kurumların devrettiği UAP kayıtları, katalogda "rolling" ekleniyor, toplu indirme var. https://www.archives.gov/research/topics/uaps , https://www.archives.gov/research/topics/uaps/rg-615 | NARA'ya atıfla yeniden yayımlanabileceği varsayılıyor; bu ifadenin resmî dayanağı gösterilemedi. Federal olmayan (sivil/basın) belgeler için ayrı telif kontrolü | [RESMÎ] koleksiyon / şart [TAHMİN] |
| ↳ durum | 2025'te katalogda yalnız FAA, NRC, NSA, ODNI ve OSD kayıtları göründü; 30.09.2025 devir tarihi beklentiyi karşılamadı; 2026'da yeni büyük yayın bulunamadı. https://hm05uap.substack.com/i/182921977/nara | — | [3. TARAF] |
| **Project Blue Book** (ABD Hava Kuvvetleri, 1947–1969) | 12.618 gözlem, 701'i "Unidentified"; 94 makara 35 mm mikrofilm (T-1206); film, ses ve fotoğraflar ayrı birimlerde. https://www.archives.gov/research/military/air-force/ufos | Gizliliği kaldırıldı; kayıtlar ilgili kişilerin adları çıkarılarak erişilebilir. Telif için federal kural; ama dosyalardaki sivil fotoğraf ve basın kupürleri ayrı kontrol | [RESMÎ] / telif [TAHMİN] |
| **AARO** (ABD Savunma Bakanlığı) | Historical Record Report Cilt 1 (1945 – 31.10.2023; Şubat/Mart 2024): dünya dışı teknolojiye dair ampirik kanıt yok. https://www.aaro.mil/Portals/136/PDFs/AARO_Historical_Record_Report_Vol_1_2024.pdf , https://www.war.gov/News/News-Stories/Article/Article/3701297/ | Federal yayın; sitedeki yeniden kullanım metni okunamadı (403) | [RESMÎ] / şart [TAHMİN] |
| ↳ Cilt 2 | 20.07.2026'da güncellenen ürün listesinde yalnız Cilt 1 var. https://www.aaro.mil/Congressional-Press-Products/ | — | [RESMÎ liste + TAHMİN] |
| ↳ yıllık raporlar | FY2024 (Kasım 2024): 757 yeni rapor. FY2025 konsolide raporu Temmuz 2026: 319 rapor (284'ü dönem içi), çözülenlerin hepsi sıradan açıklamaya bağlandı. https://www.war.gov/News/Transcripts/Transcript/Article/3965734/ , https://theblackvault.com/documentarchive/aaro-releases-fy2025-uap-report-months-after-statutory-deadline-citing-319-new-cases-and-expanded-satellite-analysis | — | FY24 [RESMÎ] / FY25 [3. TARAF] |
| **NASA UAP Independent Study Team** | Nihai rapor 14.09.2023. https://science.nasa.gov/uap/ , https://science.nasa.gov/wp-content/uploads/2023/09/uap-independent-study-team-final-report.pdf | NASA içeriği ABD'de genelde telifsiz; atıf "Image credit: NASA". **"The NASA Insignia, Logotype, identifiers, and imagery are not in the public domain"; amblem AI görselle birlikte kullanılamaz; AI çıktısı NASA'ya atfedilemez; "References like 'according to NASA' or similar are prohibited in AI products"; onay ima edilemez; tanınabilir kişinin ticari kullanımı izin ister.** https://www.nasa.gov/nasa-brand-center/images-and-media/ . AI ile yazılmış senaryodaki "NASA'ya göre" ifadesinin bu kapsama girip girmediği belirsiz → [TAHMİN] senaryodaki NASA atıfları birincil belgeye (iddia tablosu) bağlanmalı; AI'ın ürettiği görsel/sesin kaynağı asla "NASA" gösterilmemeli | [RESMÎ] |
| **NASA Image and Video Library API** | `https://images-api.nasa.gov/search?q=...&media_type=video` anahtarsız 200 döndü (15.10.2026 denemesi); video, görsel, ses; altyazı uç noktası | Hız sınırı belgede okunamadı | [RESMÎ] |
| **CIA FOIA Reading Room** | "UFOs: Fact or Fiction?" koleksiyonu (1940'lar – 1990'ların başı); Haines, "CIA's Role in the Study of UFOs, 1947–90". https://www.cia.gov/readingroom/collection/ufos-fact-or-fiction | cia.gov içeriği telif belirtilmedikçe kamu malı; kaynak ve fotoğrafçı belirtilmeli; "CIA" adı ve mühürü onay ima eden biçimde kullanılamaz (kapakta mühüre dikkat). https://www.cia.gov/site-policies/ | [RESMÎ] |
| **İngiliz Ulusal Arşivleri (MoD UFO dosyaları)** | DEFE 24 vb.; son parti Haziran 2013; ~209 dosya, ~52.000 sayfa [3. TARAF] https://drdavidclarke.co.uk/2013/06/20/the-end-of-the-ufo-files/ . Discovery'de PDF (37–175 MB) https://discovery.nationalarchives.gov.uk/details/r/C13442641 | **Discovery indirmeleri ticari olmayan özel çalışma içindir; belge görüntüsü yayınlamak reprodüksiyon ücretine tabi. Crown copyright metin çevriyazı olarak OGL ile serbest.** https://www.nationalarchives.gov.uk/terms-and-conditions/copyright/ ; fiyat listesi https://images.nationalarchives.gov.uk/prices/ (okunmadı) | [RESMÎ] |
| **Wikimedia Commons** | Milyonlarca PD ve özgür lisanslı dosya | Lisans **dosya bazında**; atıf yaratıcıya; ShareAlike türev esere taşınabilir; kişilik hakkı ve panorama özgürlüğü ayrıca. MediaWiki API `extmetadata` (`Credit`, `LicenseShortName`, `AttributionRequired`) atıf metnini otomatik üretmek için kullanılabilir. https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia , https://commons.wikimedia.org/wiki/Commons:Credit_line | [RESMÎ] |
| **Library of Congress** | Fotoğraf, harita, gazete, film; "Free to Use" setleri https://www.loc.gov/free-to-use/ | LoC izin **vermez**; "public domain" / "no known restrictions" etiketliler serbest; "Rights and Access" alanı esas. https://www.loc.gov/legal/understanding-copyright/ | [RESMÎ] |
| **Internet Archive / Prelinger** | Arşiv filmleri; 1950'ler eğitim ve endüstri filmleri "nasıl yapıldı" için değerli | IA telif durumunu garanti etmez. Prelinger: filmin sayfasındaki CC lisansı geçerli, ticari kullanım sınırlı değil, atıf zorunlu değil, önerilir ("appreciated but not required"; "Archival footage supplied by Internet Archive (at archive.org) in association with Prelinger Archives"); **meta veri (açıklama, çekim listesi) Prelinger ve Getty'nin ortak telifinde, ticari kullanılamaz**; yazılı lisans için Getty. https://help.archive.org/help/rights/ , https://help.archive.org/help/prelinger-archive/ | [RESMÎ] |
| **Smithsonian Open Access** | 2020'de 2,8 milyon görsel CC0; api.data.gov anahtarıyla API. https://creativecommons.org/2020/02/27/smithsonian-releases-2-8-million-images-data-into-the-public-domain-using-cc0/ | Resmî sayfa 403 verdi, güncel sayı doğrulanamadı | [3. TARAF] |
| **T.C. Cumhurbaşkanlığı Devlet Arşivleri Başkanlığı** | Osmanlı ve Cumhuriyet arşivleri; araştırmacı üyeliği elektronik | Yönetmelik (RG 02.10.2021/31616): md. 12(1) referansla kullanım; **md. 12(2) "çoğaltıp ticari amaçla kullanamazlar"**; md. 8(3) yayımlanan eserden nüsha verilir; md. 9(2) özel nitelikli kişisel veri içeren belgeler verilmez; md. 11 ücret tarifesi. https://www.lexpera.com.tr/mevzuat/yonetmelikler/arsivlerden-yararlanma-usul-ve-esaslari-hakkinda-yonetmelik-4 (3. taraf aktarım; resmî metin https://www.mevzuat.gov.tr adresinde yönetmelik adıyla aranıp bağlanmalı). Para kazanan kanal büyük olasılıkla "ticari amaç" [TAHMİN]; izin usulü ve ücreti **bulunamadı**, yazılı başvuru gerekir | [RESMÎ metin, Lexpera aktarımı] |

**Pratik kurallar [TAHMİN]:**
1. **Metinle görüntüyü ayır.** Belgenin içeriğini anlatmak ve kısa alıntı yapmak serbest; belgenin **fotoğrafını** ekrana koymak arşivin şartına tabi (ABD federal serbest; UK ve TR kısıtlı).
2. Kapakta kurum logosu veya mührü kullanma (NASA, CIA).
3. Görsel öncelik sırası: ABD federal kamu malı → LoC "no known restrictions" → Commons PD/CC0 → Prelinger CC → kendi çizim/harita/animasyon → (beyanla) AI canlandırma.
4. Her görselin `kaynak_id`, `lisans`, `atif_metni` alanı sahne verisinde tutulur; açıklamadaki "Görsel kaynakları" listesi buradan üretilir.
5. "Nasıl inşa edildi" ve genel tarih için ek birincil kaynaklar (müze koleksiyon API'leri, kazı raporları, akademik dergiler) bu araştırmada tek tek doğrulanmadı.

### 4.6 TR ve EN iki sürüm

| Yöntem | Artı | Eksi | Ne zaman |
|---|---|---|---|
| A. Önce TR → EN'e uyarla | Ana dilde sahne kontrolü kolay | İngilizce ritim "çeviri kokabilir" | Kitle ağırlıkla TR |
| B. Önce EN → TR'ye uyarla | Kaynakların çoğu İngilizce | "Çeviri Türkçesi" riski | Kitle ağırlıkla global |
| **C. Ortak iddia tablosu → iki dilde ayrı yazım (önerilen)** | Olgular kilitli ve aynı; her dil doğal anlatımla yazılır | İki kez yazım ve insan kontrolü | Doğruluk öncelikli tarih/gizem |

**Yerelleştirme kontrol listesi [TAHMİN]:**
- Tarih biçimi "8 Temmuz 1947" / "July 8, 1947"; sayı 12.618 / 12,618; birim metre–feet (gerekirse ikisi).
- Yer adlarının Türkçe yazılışı (Mısır/Egypt, Kudüs/Jerusalem); kurum adlarının ilk geçişte açılımı ("ABD Ulusal Arşivleri (NARA)").
- TR izleyiciye yerel karşılaştırma; EN izleyiciye gereksiz Türkiye ayrıntısı yok.
- Orijinali İngilizce resmî alıntı TR'de "çeviri" diye işaretlenir; mümkünse orijinal + altyazı.
- Epistemik dil eşleşmesi ikinci bir AI geçişiyle denetlenebilir; son okuma iki dilde de dili ana dili gibi bilen bir insanda.

### 4.7 Durum → Senaryo ve doğruluk [TAHMİN]

| Durum | Araç | Doğrulama |
|---|---|---|
| Bütçe yok (Free) | claude.ai + elle kaynak toplama; arşivler ücretsiz | Elle iddia tablosu (tablo ya da YAML); limitler dar, haftada az video |
| Az bütçe (Pro 20 $) | claude.ai Pro (web arama, Research) + gerekirse kullandıkça öde API (Sonnet/Haiku) | Yarı otomatik |
| Orta bütçe (Max) | claude.ai + API kredisi; Batch ile EN/TR uyarlama %50 ucuz; projeye ayrı workspace ve harcama limiti verilebilir [RESMÎ] | Betikle alıntı denetimi + 2 insan kapısı |
| GPU 6–8 GB | Yerel LLM yalnız biçim işi; olgu üretimi Claude'da | Yerel çıktı da alıntı denetiminden geçer |
| GPU 16+ GB | Büyük yerel modeller mümkün; olgu için yine kaynak temelli akış | Aynı |
| Tam otomatik | §4.2'nin tamamı | Kapısız yayın önerilmez |
| Yarı otomatik | AI taslak, insan iddia tablosu + son kurgu | 2 kapı (önerilen başlangıç) |
| Elle | Kullanıcı yazar; AI süre hesaplar, olgu denetler, EN uyarlar | Kullanıcı; `kilit` alanı |

---

## 5. Ses: TTS, müzik, efekt, altyazı

> Not: Ham notlarda bazı TTS ayrıntıları farklı derinlikte okunmuştu (ör. Gemini TTS'in Türkçe durumu, Azure Türkçe ses adları). Aşağıda en ayrıntılı okunan resmî değerler kullanıldı; zayıf okunanlar etiketlendi.

### 5.1 Bulut TTS karşılaştırması (15.10.2026)

| Servis | Türkçe | Fiyat | 12 dk (~11K karakter / 720 sn) [TAHMİN] | Ayırıcı özellik | Kaynak |
|---|---|---|---|---|---|
| **ElevenLabs API** | Var: **Eleven v4** (`eleven_v4`, güncel amiral model, 90+ dil, Türkçe var, istek ≤10.000 karakter) ve **Eleven v4 Turbo** (`eleven_v4_turbo`) [RESMÎ]; Eleven v3 (sayfada "previous generation"; 70+ dil, ≤5.000), Multilingual v2 (29 dil, ≤10.000), Flash v2.5 (≤40.000). Turbo v2.5 kalkmış | v4 Turbo 0,04 $/1K karakter; **v4'ün kendi fiyatı API fiyat sayfasında yok** [bulunamadı; hesap içinden teyit]; Multilingual v2/v3 0,08 $/1K; Flash 0,04 $/1K | v4 Turbo 0,44 $; v2/v3 0,88 $; Flash 0,44 $ | `with-timestamps` karakter düzeyinde zaman; `previous_text`/`next_text` veya `previous_request_ids` (≤3) ile sahneler arası tonlama sürekliliği; 44,1 kHz WAV Pro+ | [RESMÎ] https://elevenlabs.io/pricing/api , https://elevenlabs.io/docs/overview/models , https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps |
| **ElevenLabs abonelik** | Aynı | Free 0 $ (10K, **ticari kullanım yasak; yayımlanırsa başlıkta "elevenlabs.io" ya da "11.ai" atfı zorunlu**, Eleven Music için "Eleven Music"); Starter 6 $ (30K); Creator 22 $ (121K); Pro 99 $ (600K); Scale 299 $; Business 990 $ | Creator ≈ ayda 8–11 uzun video | Ücretli planlar ticari lisans içerir; **"Beta Services" çıktısı ücretli planda da ticari kullanılamaz** → kullanılan modelin o anda Beta etiketli olmadığını kontrol et (v4 yeni çıktı) | [RESMÎ] https://elevenlabs.io/pricing , https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform |
| ↳ çelişki | — | API sayfası plana dahil karakteri Starter 75k, Creator 275k, Pro 1,238M gösteriyor; abonelik tablosu 30k/121k/600k | — | Satın almadan hesap içinden kontrol | [ÇELİŞKİLİ] |
| **Google Cloud TTS** | tr-TR: 5 Standard, 5 WaveNet, 30 Chirp3-HD sesi; Neural2/Studio yok | Chirp 3 HD 30 $/1M (ilk 1M/ay ücretsiz, aylık [RESMÎ]); Standard/WaveNet 4 $/1M (**ikisi aynı SKU, 4M/ay ücretsiz kota ortak**, ayrı ayrı 4M+4M değil); Neural2 16 $; Studio 160 $; Instant custom voice (kendi sesini klonlama) 60 $/1M, ücretsiz katman yok. Boşluk, satır sonu ve SSML etiketleri de karaktere sayılır | Chirp 3 HD ücretsiz katmanda 0 $, sonra 0,33 $ | Geniş Türkçe ses seçeneği | [RESMÎ] https://cloud.google.com/text-to-speech/pricing?hl=en , https://docs.cloud.google.com/text-to-speech/docs/list-voices-and-types ; tr-TR ses sayıları (5/5/30) yeniden teyit edilmeli |
| **Gemini TTS** | tr-TR **GA** | **Önerilen: 3.8 Flash TTS 0,50/9 $ (31.12.2026'ya kadar; 01.01.2027'den 1/18 $) ve 3.8 Flash-Lite TTS 0,50/6 $ (2027'de 1/12 $)**; Gemini API'de "New, Stable", ikisinin de Standard katmanı ücretsiz katmanda var. 2.5 Flash TTS 0,50/10 $ ve 2.5 Pro TTS 1/20 $ (giriş/çıkış, 1M token): **yalnız daha önce 2.5 modellerini kullanmış hesaplara açık** ("access is limited to users who used the 2.5 models previously"), yeni hesap erişemeyebilir. 3.1 Flash TTS "Preview (legacy)" 1/20 $; sayfa 3.8'e geçişi öneriyor. Gemini Developer API'de "Pro" TTS seçeneği kalmamış; 2.5 Pro TTS yalnız Cloud TTS API'de. Cloud TTS'te ayrıca Gemini 2.5 Flash-Lite Preview TTS 0,50/10 $. Ses 25 token/sn → 12 dk = 18.000 çıkış token | 3.8 Flash ≈ 0,16 $ (2027'de ≈ 0,33 $); 3.8 Flash-Lite ≈ 0,11 $; (2.5 Flash ≈ 0,19 $; 2.5 Pro ≈ 0,36 $, erişim kısıtlı) | Doğal dille stil yönlendirme, çok konuşmacı; metin ≤4.000 bayt, metin+istem ≤8.000 bayt, tek istekte ≤~655 sn. Türkçe karakter 2 bayt → istek başına ~3.500 karakter [TAHMİN]. AI Studio ücretsiz katmanında içerik Google ürünlerini geliştirmede kullanılır. **3.8 durumu yüzeye göre değişir:** Gemini API/AI Studio'da Stable + ücretsiz katman; Google Cloud TTS'te "(Preview)" ve ücretsiz katman yok | [RESMÎ] https://ai.google.dev/gemini-api/docs/models , https://ai.google.dev/gemini-api/docs/pricing , https://docs.cloud.google.com/text-to-speech/docs/gemini-tts , https://cloud.google.com/text-to-speech/pricing?hl=en |
| **OpenAI** | Türkçe destekleniyor, ama sesler "İngilizce için optimize" (aksan riski [TAHMİN]) | gpt-4o-mini-tts: metin 0,60 $/1M token, ses 12 $/1M token; tts-1 15 $/1M karakter; tts-1-hd 30 $/1M | gpt-4o-mini-tts ≈ 0,18 $ (eski ~0,015 $/dk tahminiyle); tts-1 0,17 $; tts-1-hd 0,33 $ | 13 hazır ses (marin, cedar öneriliyor); talimatla ton/hız; girdi sınırı TTS rehberinde verilmiyor ("≤2.000 token" değeri kaynaksız [TAHMİN], model sayfası/API referansından teyit edilmeli) → yine de sahnelere bölünmeli; **kullanım politikası dinleyiciye sesin AI olduğunu bildirmeyi zorunlu tutar**; özel ses rıza kaydıyla | [RESMÎ] https://developers.openai.com/api/docs/pricing , https://developers.openai.com/api/docs/guides/text-to-speech |
| **Azure Speech** | `tr-TR-AhmetNeural`, `tr-TR-EmelNeural`; Multilingual seslerin Türkçe okuyup okumadığı doğrulanamadı | Neural 15 $/1M; Neural HD 22 $/1M; Long Audio 100 $/1M; F0 ücretsiz: ayda 0,5M Neural karakter | ≈ 0,17 $ / 0,24 $; 0,5M altı 0 $ | SSML, kelime sınırı olayları; Personal Voice sınırlı erişim | [RESMÎ] Azure Retail Prices API https://prices.azure.com/api/retail/prices , https://azure.microsoft.com/en-us/pricing/details/speech/ , https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts |
| **Amazon Polly** | Filiz (Standard), Burcu (Neural); Türkçede Generative/Long-Form yok | Standard 4 $/1M (5M/ay ücretsiz); Neural 16 $/1M (ilk 12 ay 1M/ay ücretsiz) | Burcu ≈ 0,18 $ (ilk yıl 0 $) | Speech Marks ile zaman bilgisi; yeni AWS hesaplarına 200 $'a kadar Free Tier kredisi (15.07.2025'ten beri): yeni müşteri "free plan" (6 ay; sonra hesap kapanır ya da yükseltme ister) ile "paid plan" arasında seçer; kredi hesap açılışından itibaren 12 ay içinde kullanılır | [RESMÎ] https://docs.aws.amazon.com/polly/latest/dg/available-voices.html , https://aws.amazon.com/polly/pricing/ |

- Resmî olmayan uç noktalar (Edge-TTS gibi) hizmet şartı riski taşır, önerilmez [TAHMİN].
- **Sonuç [TAHMİN]:** TTS maliyeti her durumda küçük (ElevenLabs'ta bile video başına ~1 $). Asıl fark **Türkçe telaffuz ve doğallıkta**. Seçim **kör dinleme testiyle** yapılmalı: özel isim, sayı, tarih ve yabancı kelime içeren aynı 300 karakterlik Türkçe paragraf tüm servislerde üretilir (ElevenLabs v4/v4 Turbo ve Gemini 3.8 Flash TTS dahil).

### 5.2 Yerel ve ücretsiz TTS modelleri

Lisans terimleri: **model ağırlıkları** = indirilen eğitilmiş dosya; **NC (NonCommercial)** = para kazanılan işte kullanılamaz.

| Model | Türkçe | Lisans | Para kazanan kanal | Donanım | Not |
|---|---|---|---|---|---|
| **Chatterbox Multilingual V3** (Resemble AI) | Var (23 dil) | MIT | **Evet** | 500M param.; VRAM ~4–6 GB [TAHMİN]; CPU'da yavaş | Her çıktıya görünmez **PerTh filigranı**; ~10 sn referansla klon (referans aynı dilde olmalı); Turbo/Nano yalnız İngilizce. https://github.com/resemble-ai/chatterbox |
| **VoxCPM2** (OpenBMB) | Var (30 dil) | Apache-2.0 (kod+ağırlık ticari serbest) | **Evet** | 2B param., ~8 GB | 48 kHz; metinden ses tasarımı ve klon; RTX 4090'da RTF ~0,30 (Nano-vLLM ile ~0,13). https://github.com/OpenBMB/VoxCPM |
| Trendyol-TTS | Yalnız Türkçe (VoxCPM2 + LoRA) | MIT etiketli | [ÇELİŞKİLİ]: kart "evaluation, demos… before any production" diyor | 2B BF16, GPU | Uzun ve İngilizce karışık metinde zayıf; izinsiz ses klonlamayı yasaklar. https://huggingface.co/Trendyol/Trendyol-TTS |
| Kokoro-82M | **Yok** (en, ja, zh, es, fr, hi, it, pt-BR) | Apache-2.0 | Evet | CPU | Yalnız İngilizce kanal için ucuz. https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md |
| pocket-tts-tr (topluluk) | Yalnız Türkçe, klon var | Ağırlık CC BY 4.0 | Atıfla evet; eğitim verisi lisansı yazmıyor [ÇELİŞKİLİ] | ~0,3B, CPU odaklı [TAHMİN] | v0.1; ilk hecede ara sıra bozulma. https://huggingface.co/kaanhgunay/pocket-tts-tr |
| FreyaTTS | Yalnız Türkçe, tek ses | Apache-2.0 [3. TARAF] | [ÇELİŞKİLİ] ağırlık bağlantısı bulunamadı | 183M | https://tts.ai/voices/freya-tts/ |
| XTTS-v2 (Coqui) | Var | CPML | **Hayır** | ~4–6 GB [TAHMİN] | Lisans çıktıyı da kapsıyor, ödeme alınan her kullanım yasak; Coqui kapandı (Aralık 2023 / Ocak 2024 [ÇELİŞKİLİ]). https://huggingface.co/coqui/XTTS-v2/blob/main/LICENSE.txt |
| Piper (tr_TR-dfki-medium) | Tek ses | Motor GPL-3.0; ses **CC BY-NC-SA 4.0** | **Hayır** | CPU | https://huggingface.co/rhasspy/piper-voices/tree/main/tr/tr_TR |
| MMS-TTS tur (Meta) | Var | CC-BY-NC 4.0 | **Hayır** | 36M, CPU | https://huggingface.co/facebook/mms-tts-tur |

Ayrıntılı VRAM tablosu: [../kodla-video/](../kodla-video/) §8.

| GPU | Yerel TTS önerisi [TAHMİN] |
|---|---|
| Yok | İngilizce: Kokoro-82M, Chatterbox Nano. **Türkçe: lisansı temiz ve kaliteli CPU seçeneği yok** → bulut TTS (Google ücretsiz katmanları, Azure F0) ya da kendi kaydın; pocket-tts-tr deneysel |
| 6–8 GB | Chatterbox Multilingual V3 (TR+EN); VoxCPM2 sınırda. LLM aynı kartta çalışıyorsa önce LLM bellekten atılır |
| 16+ GB | VoxCPM2 rahat; Trendyol-TTS ile karşılaştırma testi. Uzun metinde parça parça + aynı referans ses + aynı seed |

### 5.3 Kendi ses klonu mu, hazır ses mi?

| Durum | Öneri |
|---|---|
| Yüzsüz kanal, marka tutarlılığı | Hazır lisanslı ses (Chirp3-HD, ElevenLabs kütüphanesi, Azure). Rıza riski yok |
| Kendi kimliğinle kanal | Kendi sesinin klonu (ElevenLabs IVC/PVC, VoxCPM2, Chatterbox). YouTube kendi sesinin klonu için beyan istemez [RESMÎ] |
| Elle mikrofon kaydı | En doğal. Revizyonda değişen cümle kendi klonunla üretilebilir; ton farkı olabilir [TAHMİN] |

**Başkasının sesi yasak** (ünlü, tarihî kişi, seslendirme sanatçısı, tanıdık fark etmez):
- ElevenLabs PVC'yi yalnız kendi sesin için açar; IVC'de her yüklemede hak beyanı; ünlü sesleri "No-Go Voices" listesinde. https://elevenlabs.io/docs/help-center/product/voice-customization/voice-cloning/can-i-create-a-professional-voice-clone-of-someone-elses-voice [RESMÎ]
- Hukuki çerçeve için §12.

### 5.4 Müzik ve efekt

| Kaynak | Lisans / kural | YouTube | Diğer platformlar | Not |
|---|---|---|---|---|
| **YouTube Ses Kitaplığı** | Kitaplık lisansı; bazı parçalar CC (açıklamada atıf; "Attribution not required" filtresi) | "Copyright-safe", Content ID talebi gelmez, YPP'de para kazanılabilir [RESMÎ] | Sayfada TikTok/IG kullanımı yok [ÇELİŞKİLİ]; dikey videoyu başka platforma koyacaksan riskli [TAHMİN] | Yalnız Studio içinde. https://support.google.com/youtube/answer/3376882 |
| **Pixabay Music/SFX** | Ücretsiz, atıf gerekmez; emek katmadan tek başına dağıtım ve yanıltıcı kullanım yasak | Bazı sanatçılar Content ID'ye kaydediyor; Pixabay Lisans Sertifikası ile itiraz (≤30 gün) [RESMÎ, eski blog] | İzinli | Müzik API'de yok. https://pixabay.com/service/license-summary/ |
| **Freesound** | CC0, CC-BY (atıfla ticari), **CC-BY-NC (para kazanılan videoda kullanma)**, eski Sampling+ (reklam yasak) | Hak talebi gelebilir; sayfa bağlantısı kanıt | Lisansa göre | Atıf: `"[Başlık]" by [kullanıcı] ([URL]), CC BY 4.0`. https://freesound.org/help/faq/ |
| **Epidemic Sound** | Abonelik, sınırsız indirme, yayın/para kazanmada ek ücret yok [RESMÎ] | Var | Creator: platform başına 1 kanal; Pro: 3 [3. TARAF] | Creator 17,99 $/ay (yıllıkta 9,99 $), Pro 39,99 $/ay (yıllıkta 16,99 $) [3. TARAF]; iptal sonrası durum [ÇELİŞKİLİ]. https://www.epidemicsound.com/pricing/ |
| **Suno** | Şartlar 10.08.2026 (yürürlük 03.09.2026). Free yalnız kişisel. Pro (8 $/ay)/Premier (24 $/ay): resmî kanaldan indirilen parçada haklar devredilir, aylık indirme kotası; abonelik bitse de süresiz. "Çıktıda telif oluşacağı garanti değil"; benzer çıktı başkasına da üretilebilir; remiks ticari değil | Para kazanılabilir | Aynı | https://suno.com/terms , https://suno.com/pricing [RESMÎ] |
| Udio | Şartlar okunamadı | — | — | UMG (Ekim 2025) ve Warner anlaşması sonrası kapalı model; indirme bir süre kapandı, sonra 48 saatlik pencere [3. TARAF]. Ticari dış kullanım için şu an önerilmez [TAHMİN] |
| ElevenLabs Music / SFX | Ücretli planda ticari | — | — | Müzik 0,15 $/dk, efekt 0,12 $/dk [RESMÎ] |
| Google Lyria (Gemini API) | Ücretli | — | — | Tam şarkı 0,08 $, 30 sn klip 0,04 $; ücretsiz katman yok [RESMÎ] |

- AI müzik davaları [3. TARAF]: Warner–Suno uzlaşması Kasım 2025; UMG ve Sony'nin Suno davası, Sony–Udio davası sürüyor; Haziran 2026'da AFM, UMG ve Warner'a dava açtı. https://dynamoi.com/learn/statistics/ai-music-copyright-cases-timeline
- [TAHMİN] AI müzik arka planda kullanılabilir ama hukuki belirsizlik var; arka plan için Ses Kitaplığı, Pixabay ya da Epidemic daha güvenli. Videonun **ana odağı** AI müzikse YouTube beyanı gerekir.

| Bütçe | Müzik önerisi [TAHMİN] |
|---|---|
| Yok | YouTube Ses Kitaplığı (yatay) + Pixabay/Freesound CC0 (efekt). Her öğe için `LICENSES.md` |
| Az | Aynısı + gerektiğinde Suno Pro |
| Orta | Epidemic Creator/Pro: tek lisansla tüm platformlar |

**Mikslem [TAHMİN, teknik öneri]:** müzik anlatımın −18 ile −24 dB altında; konuşma varken müziği otomatik kısma (ducking) FFmpeg `sidechaincompress`; son çıktı `loudnorm` ile ~−14 LUFS (yaygın kabul; YouTube resmî belgesi okunmadı).

### 5.5 Altyazı ve zamanlama

Senaryo metni elde olduğu için sesi yeniden yazıya dökmek yerine metni sese **hizalamak** daha doğrudur. Tercih sırası:
1. **TTS'in kendi zaman bilgisi:** ElevenLabs `with-timestamps` [RESMÎ], Polly Speech Marks, Azure kelime sınırı olayları. Ek model gerekmez.
2. **whisper.cpp** (MIT): bellek kullanımı small ~852 MB / medium ~2,1 GB / large ~3,9 GB; disk (indirme) boyutu 466 MiB / 1,5 GiB / 2,9 GiB; CPU'da da çalışır; CUDA/Vulkan; `-ml 1` kelime düzeyi zaman (deneysel); `--vad`. Remotion'da `@remotion/install-whisper-cpp`. https://github.com/ggml-org/whisper.cpp [RESMÎ]
3. **WhisperX** (BSD-2): large-v2 <8 GB VRAM; Türkçe için varsayılan hizalama modeli zaten `mpoyraz/wav2vec2-xls-r-300m-cv7-turkish`'tir (`alignment.py` → `DEFAULT_ALIGN_MODELS_HF["tr"]`), elle seçmeye gerek yok; lisansı model kartından teyit edilmeli. https://github.com/m-bain/whisperX , https://raw.githubusercontent.com/m-bain/whisperX/main/whisperx/alignment.py [RESMÎ]
4. **Bulut:** OpenAI whisper-1 / gpt-4o-transcribe 0,006 $/dk, gpt-4o-mini-transcribe 0,003 $/dk (12 dk ≈ 0,04–0,07 $); ElevenLabs Scribe v2 0,22 $/saat [RESMÎ].

- **Uzun video:** SRT/VTT dosyası yüklenir (TR+EN iki iz, aranabilir) [TAHMİN, öneri].
- **Shorts:** kelime kelime vurgulu yakılı altyazı; Remotion `createTikTokStyleCaptions()` (`combineTokensWithinMilliseconds` küçüldükçe kelime kelime). https://www.remotion.dev/docs/captions/create-tiktok-style-captions [RESMÎ]
- **Yakma:** ffmpeg `subtitles` filtresi libass ister; `force_style`, `fontsdir`, `charenc`, `wrap_unicode`; oran değiştiyse `original_size`. https://ffmpeg.org/ffmpeg-filters.html#subtitles-1 [RESMÎ]. Türkçe karakter için yazı tipi `fontsdir` ile verilmeli [TAHMİN].
- Altyazı oluşturmak AI beyanı gerektirmez [RESMÎ].

### 5.6 Sahne bazlı revizyona uygun ses mimarisi [TAHMİN]

- Her sahne ayrı ses dosyası: `s07.tr.wav`. Önbellek anahtarı `hash(metin + ses kimliği + model + ayarlar)`. Metni değişmeyen sahne yeniden üretilmez.
- ElevenLabs'ta `previous_text`/`next_text` verilirse geçiş tonlaması kopmaz; yerel modelde aynı referans ses ve seed.
- Sahne süresi = ses süresi + baş/son payı. **Ses önce, görüntü sonra.**
- **Telaffuz sözlüğü** (tarihî isimler, yer adları, kısaltmalar) TTS'e gitmeden uygulanır. Sayılar ve tarihler yazıya çevrilir ("1453" → "bin dört yüz elli üç"). Türkçede özellikle önemli.
- Claude'un rolü: TTS stil talimatı ("gizemli, alçak sesli belgesel anlatıcısı"), telaffuz sözlüğünü genişletmek, metni TTS'e hazırlamak.

### 5.7 Durum → Ses yolu [TAHMİN]

| Bütçe / GPU / otomasyon | Türkçe anlatım | İngilizce anlatım | Müzik/efekt | Altyazı |
|---|---|---|---|---|
| Bütçe yok, GPU yok, elle | Kendi mikrofon kaydı ya da Google Chirp3-HD/WaveNet, Azure F0 ücretsiz katmanı | Kokoro (yerel) ya da Chirp3-HD | Ses Kitaplığı + Pixabay/Freesound CC0 | whisper.cpp small (CPU) |
| Bütçe yok, 6–8 GB, yarı otomatik | Chatterbox Multilingual V3 ya da VoxCPM2 (sınırda) | Aynı ya da Kokoro | Aynı | whisper.cpp ya da WhisperX + TR wav2vec2 |
| Az bütçe (≤25 $/ay), tam otomatik | Gemini 3.8 Flash / 3.8 Flash-Lite TTS (2.5 TTS yeni hesaplara kapalı), Azure/Google ücretli (~0,2 $/video) ya da ElevenLabs Creator | Aynı ya da OpenAI gpt-4o-mini-tts | + Suno Pro gerektiğinde | TTS zaman bilgisi |
| Orta bütçe (50–150 $/ay), 16+ GB | ElevenLabs Pro (v4 ya da v3, kendi PVC'n; Beta etiketi kontrol) ya da VoxCPM2 yerel + bulut yedek | ElevenLabs ya da Gemini 3.8 Flash TTS (Cloud TTS'teki 2.5 Pro TTS 1/20 $ yalnız erişimi olanlar için) | Epidemic Creator/Pro | ElevenLabs `with-timestamps` |

Her durumda: başkasının sesi kullanılmaz; para kazanan kanalda NC lisanslı model/içerik kullanılmaz (XTTS-v2, Piper-tr dfki, MMS-TTS, Freesound CC-BY-NC); her ses/müzik öğesinin lisansı listede tutulur.

---

## 6. Görsel ve video malzemesi

### 6.1 Sahne ve plan hesabı [TAHMİN]

- 12 dk = 720 sn. Belgesel kurgusunda plan ortalama 4–8 sn → **90–180 plan**, bunlar **30–60 anlatı sahnesi** altında toplanır (sahne = bir seslendirme paragrafı, 12–25 sn, 3–5 plan).
- Shorts: 8–15 plan, 2–4 sn. Dikey arşiv görüntüsü azdır: ya 16:9 görüntü odak noktasına göre kırpılıp Ken Burns uygulanır, ya da 9:16 AI üretilir (Veo, Omni, Runway 9:16 destekler).
- Her plan için kaynak türü tutulur: `arsiv | stok | ai_gorsel | ai_video | kod`.

### 6.2 Stok video ve görsel

| Kaynak | Lisans | API / limit | Not | Kaynak |
|---|---|---|---|---|
| **Pexels** | Ücretsiz, atıf gerekmez, değiştirilebilir; tanınabilir kişi küçük düşürücü gösterilemez; onay ima edilemez; değiştirilmemiş kopya satılamaz | 200 istek/saat, 20.000/ay; aşılınca 429; artırma istenebilir. **API kullanılan yerde "Photos provided by Pexels" bağlantısı/logosu.** `/v1/videos/search` (large = 4K, medium = Full HD), `orientation=portrait` | Açıklamaya "Görüntüler: Pexels" [TAHMİN] | [RESMÎ] https://www.pexels.com/api/documentation/ , https://www.pexels.com/license/ |
| **Pixabay** | Ücretsiz, atıf gerekmez; emek katmadan dağıtım, markalı içeriğin ticari ürünle ilişkili kullanımı ve yanıltıcı kullanım yasak | 60 sn'de 100 istek; **24 saat önbellek zorunlu**; otomatik toplu sorgu/sistemli toplu indirme ve kalıcı hotlink yasak. Video 3840×2160 (her videoda yok) / 1920×1080 / 1280×720 / 960×540 | — | [RESMÎ] https://pixabay.com/api/docs/ , https://pixabay.com/service/license-summary/ |
| **Coverr** | Ticari ücretsiz, atıf gerekmez; **AI eğitiminde kullanılamaz**; release verilmez | — | — | [RESMÎ] https://coverr.co/license |
| **Videvo** | videvo.net/license → freepik.com/license'a yönleniyor | — | Freepik lisansı okunmadı | [RESMÎ, yönlendirme gözlendi] |
| **Envato Elements** | Core 8,99 $/ay'dan (yıllık), Plus 39 $/ay, Ultimate 168 $/ay'dan; **lisans proje başına** (her video yeni proje [TAHMİN]); iptal sonrası mevcut kullanım sonsuza kadar kapsanır, yeni projede kullanılamaz; betikle toplu indirme yasak | — | Content ID beyaz liste sayfada yok | [RESMÎ] https://elements.envato.com/pricing |
| **Storyblocks** | Essentials ~21 $/ay, Unlimited All Access ~30 $/ay, Small Business ~40 $/ay (yıllık); aylıkta 65 $ diyen kaynak var [ÇELİŞKİLİ] | — | Resmî sayfa boş döndü | [3. TARAF] https://pricingsaas.com/companies/storyblocks |

[TAHMİN] Stok kütüphaneler günümüz çekimleri ve soyut B-roll için uygundur (şehir, doğa, laboratuvar, el, kâğıt, mum, sis, yıldızlı gök). **Tarihî olayın kendisi stokta yoktur**: arşive (§4.5) ya da kod/AI ile yeniden kuruluma gidilir.

**Content ID uyarısı [TAHMİN]:** Bazı şirketler kamu malı arşiv görüntüsünü kendi kanallarına yükleyip Content ID'ye tanıtır; kamu malı görüntüye de hatalı talep gelebilir. Her video için **asset manifest** (dosya, kaynak URL, lisans, yazar, atıf, indirme tarihi) tutulmalı ki itiraz yapılabilsin. (Kamu malı, CC ve münhasır olmayan stok içerik Content ID'ye geçerli biçimde konamaz [RESMÎ], bkz. §10.4.)

### 6.3 AI görsel

**API ile (GPU gerekmez), 15.10.2026:**

| Model | Fiyat | Not | Kaynak |
|---|---|---|---|
| Nano Banana 2.1 (`gemini-nano-banana-2.1`) | 1K 0,0336 $ · 2K 0,0504 $ · 4K 0,113 $; Batch yarı | Yeni, stabil | [RESMÎ] https://ai.google.dev/gemini-api/docs/pricing |
| Nano Banana 2 (`gemini-3.1-flash-image`) | 0,5K 0,045 · 1K 0,067 · 2K 0,101 · 4K 0,151 $ | Yüksek hacim | [RESMÎ] |
| Nano Banana 2 Lite (`gemini-3.1-flash-lite-image`) | Fiyat sayfasında yok [bulunamadı; AI Studio'dan teyit] | Stable; ucuz, yüksek hacimli seçenek; 2.5 Flash Image kapanış sayfasının gösterdiği geçiş hedefi | [RESMÎ] https://ai.google.dev/gemini-api/docs/models |
| Nano Banana Pro (`gemini-3-pro-image`) | 1K/2K 0,134 $ · 4K 0,24 $; Batch/Flex yarı | En kaliteli | [RESMÎ] |
| Gemini 2.5 Flash Image | 0,039 $/görsel (fiyat sayfasında hâlâ duruyor) | Kapanış tarihi (02.10.2026) **geçti**; model sayfası "erişim yalnız eski kullanıcılara" diyor → yeni hesaplara kapalı; yeni sistemde kullanılmamalı | [RESMÎ] |
| Imagen 4 | — | **Kapatıldı** | [RESMÎ] https://ai.google.dev/gemini-api/docs/models |
| GPT Image 2 | Yatay: düşük 0,005 · orta 0,041 · yüksek 0,165 $ | | [RESMÎ] https://developers.openai.com/api/docs/guides/image-generation |
| GPT Image 1 Mini | Yatay: düşük 0,006 · orta 0,015 · yüksek 0,052 $ | En ucuz | [RESMÎ] |
| GPT Image 2.5 (`gpt-image-2.5-sunburst`, `gpt-image-2.5-flare`) | 1M token: metin girdi 5 $, görsel girdi 8 $, çıktı 30 $ | Düz "gpt-image-2.5" adında model yok, iki varyant var; `xhigh` ve `max` kalite seviyeleri ekleniyor; görsel başı rakam hesaplayıcıda | [RESMÎ] https://developers.openai.com/api/docs/pricing |
| FLUX (BFL API) | 1 kredi = 0,01 $; rakamlar canlı widget'ta | Doğrulanamadı | [RESMÎ, rakamsız] https://docs.bfl.ai/quick_start/pricing |
| Midjourney | Basic 10 · Standard 30 · Pro 60 · Mega 120 $/ay | Resmî belge 403; tüm planlarda ticari kullanım, yıllık brüt geliri 1M $ üstü şirket Pro/Mega; Basic/Standard'da görseller herkese açık; resmî genel API yok [TAHMİN] → otomasyona uygun değil | [3. TARAF] https://www.eesel.ai/blog/midjourney-pricing |

- Gemini görsel modellerinde ücretsiz katman yok. **Gemini API şartları [RESMÎ]** (https://ai.google.dev/gemini-api/terms): Google çıktının mülkiyetini talep etmez, benzer içeriği başkasına da üretebilir; API profesyonel/iş amaçlı, 18 yaş şartı; ücretsiz katmanda girdi/çıktı ürün geliştirmede kullanılabilir ve insanlarca okunabilir; AB/AEA/İsviçre/BK kullanıcılarına uygulama sunuluyorsa yalnız ücretli katman.

**Yerel (ayrıntı [../kodla-video/](../kodla-video/) §8):**

| GPU | Ne yapılır |
|---|---|
| Yok | Yerel görsel pratik değil → API ya da stok/arşiv |
| 6–8 GB | Z-Image Turbo Q8/GGUF (~71 sn/görsel), SDXL-Lightning. FLUX.2 klein 4B yalnız topluluk nicemlemesi (GGUF/fp8) + offload ile [TAHMİN]; resmî gereksinim ~13 GB |
| 16+ GB | FLUX.2 klein 4B (Apache; "fits in ~13GB VRAM", RTX 3090/4070 ve üstü [RESMÎ] https://huggingface.co/black-forest-labs/FLUX.2-klein-4B ). Z-Image Turbo bf16, offload yok. Z-Image Turbo: 6B, Apache 2.0, 8 adım, "16 GB tüketici kartına rahat sığar" [RESMÎ] https://huggingface.co/Tongyi-MAI/Z-Image-Turbo |

- Lisans: FLUX.2 [dev] ve klein 9B ticari değil; SDXL-Turbo ticari için ayrı lisans; HunyuanVideo 1.5 AB/BK/Güney Kore'yi kapsam dışı bırakır.
- **Türkçe yazıyı görsel model değil, Remotion basar** (kodla-video kuralı).

**Tarih kanalı kuralları [TAHMİN]:** Gerçek tarihî kişinin "fotoğrafı gibi" görünen AI görseli yanıltıcıdır ve beyan kapsamına girer. Daha güvenli: resim/gravür stilinde "canlandırma" etiketli görsel; arşivdeki gerçek portre + Ken Burns.

### 6.4 AI video

| Servis | Fiyat (15.10.2026) | Özellik | Kaynak |
|---|---|---|---|
| **Veo 3.1** Standard / Fast / Lite | Standard 0,40 $/sn (720p, 1080p), 0,60 (4K); Fast 0,10 / 0,12 / 0,30; Lite 0,05 / 0,08 / yok | Ses dahil ve **kapatılamaz** (susturulur); yalnız başarılı üretim ücretlenir; ücretsiz katman yok; klip 4/6/8 sn (1080p/4K/referans yalnız 8 sn); 16:9 ve 9:16; 24 fps; uzatma yalnız 3.1 ve Fast, 720p, +7 sn × en çok 20 (toplam ≤148 sn); referans görsel ≤3 (Lite'ta yok); ilk/son kare tüm modellerde; SynthID filigranı; **üretilen video sunucuda 2 gün tutulur → hemen indir**; AB/BK/İsviçre/MENA'da kişi üretimi yalnız `allow_adult`; gecikme 11 sn–6 dk; Veo 3 eskimiş. Kimlikler `veo-3.1-generate-preview`, `veo-3.1-lite-generate-preview`: **Preview modeli; fiyat, kota ve ömür habersiz değişebilir → üretim hattında yedek model ve sürüm sabitleme gerekir** | [RESMÎ] https://ai.google.dev/gemini-api/docs/veo , https://ai.google.dev/gemini-api/docs/models , pricing |
| **Gemini Omni Flash** (`gemini-omni-1.1-flash`) | 720p'de ~0,10 $/sn (5.792 token/sn × 17,50 $/1M) | Üretim, **düzenleme**, ara kare, uzatma, ses dahil; video belgesinin varsayılan önerisi. Mevcut videoyu düzenleyebilmesi sahne revizyonu için önemli [TAHMİN]. **Preview modeli** [RESMÎ]: sahne revizyonu buna dayandırılacaksa yedek model ve sürüm sabitleme gerekir | [RESMÎ] |
| **OpenAI Sora 2 / 2 Pro** | (eski: 0,10 $/sn; Pro 0,30–0,70) | **API 24.09.2026'da kapatıldı**; uygulama 26.04.2026'da kapandı [3. TARAF]. **Sisteme dahil edilmez** | [RESMÎ] https://developers.openai.com/api/docs/models/sora-2 |
| **Runway** | Free 125 tek seferlik; Standard 15 $ (yıllıkta 12) 625 kredi; Pro 35 $ (28) 2.250; Max 95 $ (76) 9.500 | Gen-4.5 12 kredi/sn, Gen-4 Turbo ~6, Aleph 2.0 ~28, Seedance 2.0 Pro 1080p ~40. Standard'la Gen-4.5'te ~52 sn/ay. Standard+ filigransız; ticari kullanım ve API fiyatı sayfada yok | [RESMÎ] https://runway.com/pricing |
| **Luma** | Plus 30 $ (25) 10.000 kredi (ticari dahil); Pro 90 $ (75); Ultra 300 $ (250) | Ray3.14: taslak 4, 720p 20, 1080p 80 kredi/sn; Ray3.2 1080p 400 kredi/5 sn. Plus ≈ 125 sn 1080p [TAHMİN] | [RESMÎ] https://lumalabs.ai/pricing |
| **Pika** | Free (ticari yok); Starter 10 $ (ticari yok); Creator 35 $ (ticari var); Fancy 95 $ | Filigran yok; kredi devretmez; kart fiyatları tabloyla tutmuyor [ÇELİŞKİLİ]; sn başı kredi okunamadı | [RESMÎ] https://pika.art/pricing |
| **Kling** | API web aboneliğinden ayrı; deneme 9,8 $/100 birim, 98 $/1.000 (30 gün); standart paket 700 $'dan (180 gün); Kling 3.0 ~0,06–0,58 $/sn araca göre | Resmî geliştirici fiyat sayfası bulunamadı; klingai.com'dan teyit | [3. TARAF / ÇELİŞKİLİ] https://www.atlascloud.ai/blog/guides/kling-ai-api-pricing |

**Yerel video:**

| Model | VRAM | Süre | Lisans | Kaynak |
|---|---|---|---|---|
| Wan2.2 (T2V/I2V-A14B, TI2V-5B, S2V, Animate) | 14B "en az 80 GB"; TI2V-5B "en az 24 GB"; offload bayrakları; toplulukta 8 GB GGUF [TAHMİN] | TI2V-5B: 5 sn 720p tüketici GPU'sunda "9 dakikadan az" | Apache 2.0, çıktıda hak iddiası yok | [RESMÎ] https://github.com/Wan-Video/Wan2.2 |
| HunyuanVideo 1.5 (8,3B) | En az 14 GB (offload) | Damıtılmış 480p I2V RTX 4090'da 75 sn; 121 kare ≈ 5 sn | AB/BK/Güney Kore kapsam dışı (bölge dışı kullanım ve çıktı "unlicensed"); **AUP md. 12: kamuya açık ortama konan çıktının makine üretimi olduğu "expressly and conspicuously" belirtilmeli; md. 5(b): çıktıyla başka AI modeli eğitilemez** [RESMÎ] https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5/blob/main/LICENSE | [RESMÎ] https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5 |
| LTX-2.5 (22B + Gemma 4 12B, ~66 GiB) | Belgede yok; 16 GB altı zor [TAHMİN] | Ses+video birlikte; 4K | Yıllık geliri 10M $ altında ticari ücretsiz | [RESMÎ] https://github.com/Lightricks/LTX-2 , https://ltx.io/model/license |

| GPU | Yerel video [TAHMİN] |
|---|---|
| Yok | Yok → Ken Burns + API |
| 6–8 GB | FramePack, Wan2.1 1.3B, Wan2.2 5B GGUF + offload (dakikalarca); yalnız "vurgu" klipleri |
| 16 GB | HunyuanVideo 1.5 (480p, damıtılmış), Wan 5B daha rahat |
| 24 GB+ | Wan2.2 TI2V-5B resmî ayar, LTX fp8, Wan FLF2V geçişler |

### 6.5 Kodla üretilen görseller (Remotion merkezli)

- **Ken Burns:** `interpolate(frame, [0, durationInFrames], [1, 1.2], {extrapolateLeft:"clamp", extrapolateRight:"clamp"})` ile `scale`/`translate` [RESMÎ] https://www.remotion.dev/docs/animating-properties . Sahne JSON'unda `{zoomFrom, zoomTo, panX, panY, easing}` yeter [TAHMİN]. FFmpeg `zoompan` titreme hatası (trac #4298) için görseli önce çok büyütmek yaygın çözüm [3. TARAF]. Düşük çözünürlüklü arşiv görseli önce [../goruntu-netlestirme/](../goruntu-netlestirme/) ile büyütülür.
- **Harita:** Remotion resmî rehberi MapLibre GL JS + Turf.js (büyük daire rotası, çizgi boyunca ilerleme); `useDelayRender()`, `interactive:false`, `fadeDuration:0`, `--gl=angle`, tek eşzamanlılık. https://www.remotion.dev/docs/maps [RESMÎ]. Karo sağlayıcısının lisansı ve atfı (OSM tabanlıda "© OpenStreetMap") [TAHMİN]. Tarihî sınır GeoJSON kaynağı ayrıca araştırılmalı.
- **Zaman çizelgesi, sayaç, alıntı kartı, belge vurgusu, daktilo efekti:** Remotion bileşenleri, `spring()`; Türkçe web fontu yerel yüklenir [TAHMİN].
- Diğer araçlar (Manim, Motion Canvas, Lottie): [../kodla-video/](../kodla-video/) §9.

### 6.6 Karışım ve maliyet (12 dk; yalnız görsel/video) [TAHMİN]

| Senaryo | Arşiv | Stok | Kod | AI görsel | AI video | Maliyet/video |
|---|---|---|---|---|---|---|
| Bütçe yok, GPU yok | %45 | %30 | %25 | 0 | 0 | **0 $** |
| Bütçe yok, 8–16 GB | %40 | %25 | %20 | %15 yerel (Z-Image) | Birkaç yerel klip | 0 $ (elektrik + zaman) |
| Az bütçe | %35 | %25 | %20 | ~40 görsel | ~10 × 8 sn | **~5–15 $** |
| Orta bütçe | %25 | %20 | %20 | ~60 görsel | ~30 × 8 sn | **~35–110 $** |
| Tam AI (önerilmez) | 0 | 0 | metin | — | 720 sn | ~70–290 $ (yeniden üretim hariç) |

Hesaplar:
- **Az bütçe:** 40 × GPT Image 2 orta (0,041 $) = 1,64 $ ya da 40 × Nano Banana 2.1 1K = 1,34 $; Veo 3.1 Lite 1080p 80 sn × 0,08 = 6,4 $ (720p'de 4 $); ×2 yeniden üretim payı → ~5–15 $.
- **Orta bütçe:** Veo 3.1 Fast 1080p 240 sn × 0,12 = 28,8 $ (Standard ile 96 $); 60 × Nano Banana Pro = 8 $ → ~35–110 $.
- **Tam AI:** Veo Standard 1080p 720 × 0,40 = 288 $; Omni Flash 720p ~72 $; Lite 720p 36 $; beğenilmeyen klip oranıyla ×2–3.
- **Shorts:** 60 sn tamamen Veo Fast 1080p 9:16 = 7,2 $ (Lite 4,8 $); arşiv+kod ağırlıklı 0 $.
- Aboneliklerle kıyas: Runway Standard (15 $) Gen-4.5'te ~52 sn/ay; Luma Plus (30 $) ~125 sn 1080p. Orta bütçeli tek video bile Runway Standard kotasını aşar → seri üretimde API (Veo/Omni) daha öngörülebilir.

**AI videoyu ne zaman kullanmalı [TAHMİN]:** yalnız "imkânsız çekimler" için (piramit inşaatı canlandırması, kayıp bir gemi, tanığın anlattığı sahne; beyanla). Gerçek belgenin olduğu yerde belge kullanılır. Tam AI; YPP riski, gerçek/uydurma karışması ve maliyet nedeniyle önerilmez.

### 6.7 Otomasyon düzeyine göre malzeme [TAHMİN]

- **Tam otomatik:** Claude sahne JSON'u üretir → her plan için önce NASA, Commons, LoC (ve Smithsonian) API'si → sonra Pexels (her API kullanımında belirgin Pexels bağlantısı; atıf bağlantısı asset manifest'te **zorunlu alan**) → bulunamazsa yerel AI → API AI. Lisans filtresi zorunlu (PD, CC0, CC BY kabul; BY-SA ve GFDL hariç). Remotion render.
  - **Pixabay tam otomatik dalda kullanılmaz** [RESMÎ]: API "meant for real human requests"; "Systematic mass downloads are not allowed"; çok sayıda otomatik sorgu ve kalıcı hotlink yasak. https://pixabay.com/api/docs/
  - **Envato otomasyondan tamamen çıkar** [RESMÎ]: "cannot use scripts or bots to mass download". https://elements.envato.com/pricing
  - Pexels "core functionality"nin kopyalanmasını da yasaklar; stok arşivi kurmak için toplu çekim yapılmaz [RESMÎ] https://www.pexels.com/api/documentation/
- **Yarı otomatik:** plan başına 3–5 aday, kullanıcı seçer; sahne bazlı yeniden arama. Pixabay yalnız bu insan seçimli akışta, 24 saat önbellek ve seçilen dosyayı indirip kendi tarafında barındırma şartıyla.
- **Elle:** kullanıcı dosyasını `varliklar/`a koyar; sistem yalnız kurgu, altyazı ve atıf yapar.

---

## 7. Montaj/render ve sahne bazlı revizyon mimarisi

### 7.1 Araç karşılaştırması

**Kodla veya API ile:**

| Araç | Lisans ve fiyat (15.10.2026) | Sahne revizyonuna uygunluk | Not |
|---|---|---|---|
| **Remotion** (React) | Birey / ≤3 kişilik şirket ücretsiz; Creators 25 $/koltuk/ay; Automators render başı 0,01 $, en az 100 $/ay; Enterprise 500 $/ay'dan. https://www.remotion.pro/license [RESMÎ] | **Çok iyi**: sahne başına Composition ya da `--frames` aralığı | npm `remotion` 4.0.535 [RESMÎ]; ayrıntı [kodla-video](../kodla-video/) §1–7 |
| **HyperFrames** (HeyGen) | Apache-2.0, render ücreti yok; son push 15.10.2026, 64k ★ [RESMÎ, GitHub API] | İyi (HTML + data-* zamanlama) | GSAP lisans uyarısı kodla-video §9 |
| **ffmpeg** | LGPL/GPL (derlemeye göre) | Çok iyi: concat, xfade, altyazı, ses miksi | Her mimarinin son aşaması |
| **MoviePy** | MIT; 2.2.1 (21.05.2025), Python 3.9+ | İyi | v2.0 geriye uyumsuz (`subclip` → `subclipped`); hareketli grafikte zayıf [TAHMİN] https://pypi.org/project/moviepy/ |
| **Shotstack** (bulut) | Kullandıkça 10 $ = 50 dk; Starter 39 $/ay 250 dk; Pro 99 $ 750 dk, 4K; Scale 199 $ 2.000 dk; Volume 499 $ 10.000 dk; plan dakikaları 3 ay devreder [RESMÎ] https://shotstack.io/pricing/ | Orta: JSON timeline; her istek yeni render | Sandbox ücretsiz, filigranlı, ≤10 dk; yeni hesaba 30 gün geçerli 10 kredi; hosting yoksa video 24 saatte silinir |
| **Creatomate** | Essential 54 $/ay 2.000 kredi; Growth 129 $/ay 10K [RESMÎ help]; üçüncü taraflar 29–49 $ diyor [ÇELİŞKİLİ] | Orta: şablon + değişken | Kredi ≈ genişlik × yükseklik × fps × sn ÷ 100M; 720p25 ≈ 14 kredi/dk [RESMÎ]; 1080p30 ≈ 37 kredi/dk [TAHMİN]; deneme 50 kredi; render 30 gün saklanır. https://creatomate.com/docs/account/how-does-the-pricing-work |
| **JSON2Video** | Free 600 kredi (filigranlı); Hobby 199,50 $/yıl (≈50 dk/ay); Professional 49,95 $/ay (≈200 dk); Startup 99,95 $/ay (≈500 dk); video ≤30 dk; 1080p'de 1 kredi = 1 sn, 4K'da 4× [RESMÎ] https://json2video.com/pricing/ | **Yerleşik sahne modeli**: movie → scenes → elements; "her sahne bağımsız render edilir, sonra zincirlenir", ara sahneler önbellekte (`cache:false` ile atlanır) [RESMÎ] https://json2video.com/docs/v2/getting-started/core-concepts | voice, subtitles, html, component öğeleri |

**Masaüstü editörler:**

| Araç | Fiyat | Otomasyon | Not |
|---|---|---|---|
| **DaVinci Resolve** (ücretsiz) | 0 $ | Scripting API v20 (Lua/Python): `ImportMedia`, `CreateTimelineFromClips`, `AppendToTimeline`, `ImportTimelineFromFile` (AAF/EDL/XML/FCPXML/**OTIO**), `AddRenderJob`, `StartRendering`, `CreateSubtitlesFromAudio` [RESMÎ içerik, 3. TARAF barındırma] https://gist.github.com/Manouchehri/e32461dccd824167bac8358bb21c8040 | **Dış betik yalnız Studio'da**; ücretsizde yalnız Console/uygulama içi [3. TARAF]; aksi iddia eden MCP projeleri var [ÇELİŞKİLİ]. Ücretsiz UHD 60 fps'e kadar; Windows'ta ücretsiz sürüm NVENC kullanmaz [3. TARAF, Puget] |
| **DaVinci Resolve Studio** | 295 $ tek sefer [RESMÎ] | Dış betik (Local/Network) | Smart Reframe, Magic Mask, AI voice isolation, çoklu GPU, donanım kodlama; 32K/120 fps [RESMÎ]. Sesten altyazının Türkçe desteği doğrulanamadı |
| **CapCut** | Ücretsiz / Pro (fiyat doğrulanmadı) | **Resmî API bulunamadı**; masaüstünde yalnız resmî şablonlar (Ocak 2026) [RESMÎ] | Resmî olmayan VectCutAPI (Apache-2.0) taslak klasörü üretir; güncellemeyle bozulabilir [TAHMİN]. Malzeme lisansı ticari/ticari olmayan ayrımlı, karışık proje ticari olmayan sayılabilir [3. TARAF/ÇELİŞKİLİ] |
| **Descript** | Free (720p, filigranlı, 60 dk/ay); Hobbyist 24 $ (yıllık 16); Creator 35 $ (24), 4K, 30 saat; Business 65 $ (50) [RESMÎ] | "API + MCP"; Claude dizininde resmî bağlayıcı; içe aktarma ve Underlord düzenlemeleri media minutes ve AI kredisinden düşer [RESMÎ] https://help.descript.com/hc/en-us/articles/45008080343053 | Metni düzelterek videoyu düzeltme; kendi sesini kaydedenler için rahat. Türkçe transkripsiyon [ÇELİŞKİLİ] |
| **Adobe Premiere** | 22,99 $/ay (yıllık); CC Pro 69,99 $/ay [RESMÎ] | UXP Premiere DOM API (sekans, track, klip, marker) [RESMÎ]; başsız mod anlatılmıyor | ExtendScript "Eylül 2026'ya kadar" duyurusu; sonrası belirsiz [ÇELİŞKİLİ] |

**Köprü: OpenTimelineIO (OTIO)** — Apache-2.0, aktif (son push 14.10.2026); FCP XML/AAF/EDL adaptörleri ayrı `OpenTimelineIO-Plugins` paketinde [RESMÎ] https://github.com/AcademySoftwareFoundation/OpenTimelineIO . Sahne listesi OTIO'ya çevrilip DaVinci'ye aktarılır, son rötuş elle. **Tek yönlü geçiştir** [TAHMİN]: editördeki değişiklik sahne JSON'una geri yazılmaz; editöre geçince doğruluk kaynağı editör olur.

### 7.2 Mimari ilke [TAHMİN, tasarım önerisi]

Video sahnelerden oluşan bir listedir; her sahne make/ninja mantığıyla işlenen bir yapı birimidir: **girdisi değişmeyen sahne yeniden üretilmez.**

```
proje/
├─ proje.yaml            dil, hedef biçimler, ses ayarları, şablon sürümü
├─ brief.md              konu, açı, hedef süre, ton (insan yazar)
├─ kaynaklar.yaml        kaynak id, url, kurum, tür, erişim tarihi, lisans, atıf
├─ iddialar.yaml         iddia id, TR/EN metin, kaynak_id, birebir alıntı, güven, onay
├─ senaryo.tr.md / senaryo.en.md
├─ sahneler.yaml         TEK DOĞRULUK KAYNAĞI (git'te)
├─ varliklar/            görsel, video, müzik, efekt + lisans.json (büyük dosyalar git dışı / LFS)
├─ onbellek/             <hash>.wav, <hash>.mov (git dışı)
├─ cikti/v3/             uzun_tr.mp4, uzun_en.mp4, short_01_tr.mp4, kapak_a.jpg, altyazi.tr.srt …
│  └─ rapor.json         hangi sahne yeniden üretildi, süreler, hash'ler, maliyet
└─ inceleme/v3.md        sahne kimliğiyle revizyon notları
```

**Önbellek anahtarları:**
- **Ses:** `hash(anlatim[dil] + ses_modeli + konusan + hiz + telaffuz_sozlugu_surumu)` → `onbellek/<h>.wav`
- **Görüntü:** `hash(normalleştirilmiş sahne JSON'u + varlık içerik hash'leri + şablon kod sürümü (git commit) + çözünürlük/fps/oran + ses süresi)` → `onbellek/<h>.mov`
- Sahne süresi ses süresinden türetilir. Bir sahnenin metni değişince yalnız onun süresi değişir; sonraki sahneler yeniden render edilmez, birleştirmede ard arda dizilir.

### 7.3 Render akışı

1. **Sahneleri sessiz render et.** Ara biçim yüksek kaliteli: H.264 CRF 12–16 ya da ProRes (ProRes 422 1080p30 ≈ 147 Mbit/sn → 12 dk ≈ 13 GB [TAHMİN]). Remotion'da sahne başına Composition ya da `--frames=başlangıç-bitiş`. **`--props` Windows kabuğunda satır içi JSON kabul etmez, dosya yolu verilir.** https://remotion.dev/docs/cli/render [RESMÎ]
2. **Sesi tek seferde, bütün halinde mikse et:** sahne seslerini birleştir, müzik altlığını sidechain ducking ile alçalt, efektleri ekle. Neden: AAC parçaları birleşirken 1024 örneklik paket yapısı "pıt" sesi çıkarır; Remotion'un `forSeamlessAacConcatenation` / `combineChunks()` çözümü belgesine göre "kullanması zor" [RESMÎ] https://www.remotion.dev/docs/options/for-seamless-aac-concatenation . Sessiz sahne render'ı sorunu tümden ortadan kaldırır [TAHMİN].
3. **Birleştir:** düz kesme için ffmpeg concat demuxer `-c copy` (şart: aynı codec, aynı time base) https://ffmpeg.org/ffmpeg-formats.html#concat [RESMÎ]. Crossfade için `xfade` yeniden kodlama ister; pahalı olan Chrome'un kare çizmesidir, son kodlama dakikalar sürer [TAHMİN]. Alternatif: sahnelere kendi içinde giriş/çıkış animasyonu + aralarında düz kesme.
4. **Altyazı ve kapak** (§5.5, §10.1).
5. **Rapor + sürüm:** `rapor.json`, `git tag v3`. Büyük ikili dosyalar git'e girmez; 50 MB üstü LFS.

### 7.4 İnsan onay adımları (ucuzdan pahalıya)

| # | Adım | Önizleme | Maliyet |
|---|---|---|---|
| 1 | Konu ve kaynaklar | `kaynaklar.yaml`, `iddialar.yaml` | LLM |
| 2 | Senaryo | `senaryo.*.md` | LLM |
| 3 | Storyboard | Sahne başına durağan kare: `renderStill()` (png/jpeg/webp/pdf) https://www.remotion.dev/docs/renderer/render-still [RESMÎ] | Saniyeler |
| 4 | Ses | TTS dosyaları + toplam süre | TTS |
| 5 | Kaba kurgu | `--scale 0.5` taslak [RESMÎ] | Tam render'ın ≈ ¼'ü [TAHMİN] |
| 6 | Final | Yalnız değişen sahneler | — |
| 7 | Kapak ve başlık | 2–3 aday | Saniyeler |
| 8 | Yükleme | AI beyanı, altyazı dosyaları | — |

### 7.5 Revizyon döngüsü

1. Kullanıcı revizyonu sahne ID'siyle yazar (`inceleme/v3.md`): "s03 TR metinde tarih yanlış", "s07 görseli değiştir", "s14 harita oku yavaş".
2. Claude yalnız o sahnenin kaydını değiştirir, `durum: incelemede` yapar. **Kilitli sahneye dokunmaz**, önerisini `not` alanına yazar.
3. Hash'i değişen sahneler için TTS ve görsel yeniden üretilir; toplam süre yeniden hesaplanır.
4. Yalnız değişen sahneler render edilir, sonra concat + ses miksi tekrar yapılır.
5. Değişiklik `revizyon` alanına ve git'e işlenir (sahne dosyaları metin, diff okunabilir). Bu kayıt aynı zamanda YPP için "insan katkısı" kanıtıdır (§10.2).

### 7.6 Tek projeden 16:9 ve 9:16

- **Kırpmak yerine yeniden yerleştir [TAHMİN]:** aynı sahne verisinden iki Composition (1920×1080 ve 1080×1920); bileşen `useVideoConfig()` ile oranı okuyup yerleşimi değiştirir. Piksel sayısı aynı, render süresi yaklaşık aynı.
- Görsellerde sahne kaydındaki `odak: [x, y]` dikey kırpma merkezini belirler.
- Arşiv videosu kırpılacaksa: MediaPipe Face/Object Detector ile kutu → yumuşatma → ffmpeg `crop` (eski AutoFlip desteği 01.03.2023'te bitti [RESMÎ] https://developers.google.com/edge/mediapipe/solutions/guide ); DaVinci Studio Smart Reframe; Premiere Auto Reframe [3. TARAF]. ClipsAI (MIT, son push 17.01.2024) konuşan kafa videoları için, belgesele uygun değil [TAHMİN].
- **Short kesiti seçimi [TAHMİN]:** senaryo elde olduğu için transkriptten kesit aramaya gerek yok. Claude sahnelere `short_adayi` puanı verir, 20–60 sn'lik kendi içinde tamamlanan kesiti seçer, **yeni hook ve kapanış cümlesi yazar** (ayrıca seslendirilir), Short ayrı sahne listesi olarak render edilir (görsel önbelleği ortak). Hazır SaaS: OpusClip (Free 60 dk/ay, Starter 15 $, Pro 29 $; API yalnız Business teklifle) [3. TARAF].
- **Dil başına ayrı render** [TAHMİN]: sahne süreleri dile göre farklı; görsel varlık önbelleği ortak, ses ve metin katmanı dile özel; Remotion'da `lang` props'u. TTS hızını ±%5–8'den fazla oynatmak doğallığı bozar [TAHMİN]. YouTube çok dilli ses izi yolunda her sahne `max(TR, EN)` alınır, kısa dile boşluk eklenir (tempo düşer).

### 7.7 Render maliyeti ve süresi [TAHMİN]

Varsayım: 1080p30, 12 dk + 3 Short ≈ 15 dk çıktı, revizyonsuz.

| Yol | 15 dk'lık paket |
|---|---|
| Remotion yerel, ffmpeg, MoviePy, HyperFrames, DaVinci ücretsiz | 0 $ (elektrik/donanım hariç) |
| Remotion Lambda | ≈ 0,10–0,15 $; resmî örnek 10 dk HD 0,103 $, 56 sn https://www.remotion.dev/docs/lambda/cost-example [RESMÎ] |
| Shotstack Starter | ≈ 2,3 $ (sahne başına render'da yalnız değişen sahne ödenir) |
| JSON2Video Professional | 900 kredi ≈ 3,75 $ |
| Creatomate Essential | ≈ 560 kredi → paket başı ≈ 15 $ |
| Descript Creator | Abonelik 35 $/ay, render ayrıca ücretlenmez |

- Remotion Automators'ta "1 render = başarılı üretilmiş video"; sahne başına render'da her sahne ayrı render sayılabilir (50 sahne = 50 render). Ücretsiz lisanslı birey için fark etmez; 4+ kişilik şirkette Remotion'a sorulmalı.

| Donanım | Remotion 1080p 12 dk, basit sahneler | Ağır sahneler (blur, gömülü video, WebGL) | 1 sahne (≈15 sn) revizyonu |
|---|---|---|---|
| 4–6 çekirdek dizüstü, GPU yok, 16 GB | 25–60 dk | 1–3 saat | 1–3 dk |
| 8–16 çekirdek masaüstü, 32 GB | 10–25 dk | 40–90 dk | 20–60 sn |
| Bulut (Lambda) | 1–2 dk, ≈ 0,1 $ | Daha uzun/pahalı | Saniyeler |

- **Ekran kartı Remotion render'ını pek hızlandırmaz** (Chrome Headless Shell CPU ile çizer); GPU'nun önemi TTS ve görsel/video modellerindedir.
- Donanım kodlama: Remotion 4.0.228'den beri H.264/H.265 (macOS, Linux, Windows + NVIDIA); açıkken `crf` yerine `--video-bitrate`. https://www.remotion.dev/docs/encoding [RESMÎ]
- Hız ipuçları [RESMÎ] https://www.remotion.dev/docs/performance : `@remotion/media` `<Video>`; bulutta `blur`/`box-shadow` yavaş; PNG JPEG'den yavaş; VP8/VP9 çok yavaş; `npx remotion benchmark` ile `--concurrency`.
- ffmpeg/MoviePy yolu genelde gerçek zamanın 0,5–3 katı (12 dk için 4–25 dk); kendi makinende `ffmpeg ... -f null -` çıktısındaki `speed=` ile ölç.
- Disk: proje başına 5–15 GB ara dosya; SSD önerilir.

### 7.8 Durum → Montaj [TAHMİN]

| Durum | Montaj ve render |
|---|---|
| Bütçe yok, GPU yok | Remotion veya HyperFrames yerelde + ffmpeg + sahne önbelleği; render gece |
| Bütçe yok, kod bilmiyor, elle | DaVinci Resolve ücretsiz ya da CapCut (malzeme lisansına dikkat) |
| Az bütçe (~50 $/ay), sunucu istemiyor | JSON2Video Professional ya da Shotstack Starter |
| Orta bütçe, kendi sesiyle, metin üzerinden revizyon | Descript Creator + Claude MCP; görsel katman Remotion. Türkçe önce denenmeli |
| Tam otomatik, çok video | Remotion Lambda veya HyperFrames + kuyruk; LLM yalnız sahne JSON'u üretir (politika riski §10) |
| Final rötuşu profesyonel editörde | Sahne listesi → OTIO → DaVinci Studio (295 $) ya da Premiere (UXP); tek yönlü |
| GPU 6–8 GB | Render aynı; GPU TTS ve görsele; LLM ve TTS sırayla |
| GPU 16+ GB | + yerel video geçiş modelleri, NVENC kodlama |
| 4+ kişilik şirket | Remotion Creators/Automators ya da HyperFrames (lisans) |

---

## 8. Sistem yolları A–D

### 8.1 Yolların tanımı

- **A. Elle + Claude web:** claude.ai Project (kanal tonu, sahne şablonu, kaynak kuralı) → araştırma özeti, senaryo, sahne tablosu, arama kelimeleri, başlık/açıklama/kapak fikri → TTS sitesinde ses ya da kendi kaydın → görseller elle → DaVinci/CapCut → elle yükleme. Pro yeter; Max kredisi bu yolda kullanılmaz.
- **B. Yarı otomatik pipeline (önerilen hedef):**
  ```
  konu/brief (insan)
   → Claude API: araştırma (web_search) + kaynak listesi + iddia tablosu  → İNSAN KAPISI #1
   → Claude API: senaryo (TR/EN)
   → Claude API: sahne JSON'u (structured outputs, şemaya bağlı)
   → TTS: sahne başına ses → süre ölçümü
   → görsel arama: NASA/NARA/Commons/LoC → Pexels/Pixabay → (gerekirse AI)
   → insan: aday görsel seçimi
   → Remotion render (16:9 + 9:16 aynı JSON'dan)
   → insan revizyonu: sahne bazlı → yalnız değişen sahneler  → İNSAN KAPISI #2
   → YouTube'a elle (ya da API ile private/unlisted) yükleme, AI beyanı
  ```
- **C. Yerel/ücretsiz ağırlıklı:** LLM = Claude (web veya API); TTS, görsel, gerekirse video, altyazı ve render yerelde (VoxCPM2/Chatterbox, Z-Image/FLUX klein, Wan2.2, whisper.cpp, Remotion). B ile aynı mimari, arka uçlar yerel.
- **D. Bulut video API'leri ve hazır SaaS:**
  - **D1. Bulut render** (Shotstack, Creatomate, JSON2Video): JSON timeline → MP4; B'deki Remotion'ın yerine geçer.
  - **D2. Hazır SaaS** (prompt/senaryodan video):

| Araç | Fiyat (15.10.2026) | Türkçe | Ticari hak | Kaynak |
|---|---|---|---|---|
| InVideo AI | Basic 9 $, Pro 30 $, Ultra 80 $/koltuk/ay (yıllıkta yarı); kredi 190/1.000/3.000 | **Doğrulanamadı** ("50+ dil") | Yardım sayfası AI videoların ve avatarlı videoların monetize edilebileceğini söylüyor | [RESMÎ] https://invideo.io/pricing , https://help.invideo.io/en/articles/9974482 |
| Pictory | Starter 29 $ (25), Professional 59 $ (35), Team 199 $ (119); 200/600/1.800 video dk; Getty + Storyblocks stok | **Var** (premium ElevenLabs seslerinde) | Fiyat sayfasında yok | [RESMÎ] https://pictory.ai/pricing , https://kb.pictory.ai/en/articles/8679976 |
| Fliki | Standard ≈ 28 $ (21), Premium ≈ 88 $ (66) | 80+ dil; Türkçe sayfası 404, **doğrulanamadı** | Standard'da "commercial rights"; Free filigranlı | [3. TARAF] https://fliki.ai/pricing |
| HeyGen | Free (1 dk, ayda 3 video); Creator 29 $ (24); Pro 49 $; Business 149 $ + 20 $/koltuk | 175+ dil [RESMÎ] | Free'de yok [3. TARAF]; ücretlide belirsiz | [RESMÎ] https://www.heygen.com/pricing |

### 8.2 Karşılaştırma tablosu [TAHMİN, yukarıdaki kaynaklara dayanır]

| | A Elle + web | B Yarı otomatik | C Yerel ağırlıklı | D1 Bulut render | D2 SaaS |
|---|---|---|---|---|---|
| Kurulum | Çok kolay, kod yok | Orta (2–4 hafta sonu işi) | Zor (Python ortamları, CUDA, model indirme) | Orta | Çok kolay (dakikalar) |
| 12 dk maliyet | 0–5 $ | ~1,2–3,5 $ (AI klipli ~6–18 $) | 0–1,5 $ + elektrik | ~3,5–18 $ (AI'sız; render aralığı geniş, §11.2) | 3–10 $ (abonelik ÷ video) |
| 60 sn maliyet | 0–0,5 $ | 0,2–1,5 $ (AI klipli 2–5 $) | 0–0,3 $ | 0,5–2 $ | 0,5–2 $ |
| İnsan süresi (12 dk) | 6–15 sa | 2–4 sa (sistem oturduktan sonra) | 3–5 sa (+ uzun üretim süresi) | 2–4 sa | 1–3 sa |
| İnsan süresi (Short) | 1–2 sa | 20–40 dk | 30–60 dk | 20–40 dk | 15–30 dk |
| Kalite tavanı | Yüksek (editör becerisine bağlı) | Orta-yüksek (bileşen kütüphanesiyle artar) | Orta (yerel TTS doğallığı; Chatterbox filigranı) | Orta | Orta-düşük (stok ağırlıklı, jenerik) |
| Sahne bazlı revizyon | Elle; ses değişince zamanlama elle kayar | **En iyi** (hash önbellek, Remotion Studio) | İyi | İyi ama her render ücretli | Araç içinde sınırlı, JSON/sürüm kontrolü yok, kilitlenme |
| Kullanıcının sahne yönetimi | Tam | Tam (JSON/YAML) | Tam | Tam | Kısıtlı (şablonlar) |
| TR + EN | Montaj elle tekrar | Aynı iskelet | Aynı iskelet | Aynı iskelet | Araca bağlı; Pictory doğrulandı |
| YPP + Topluluk Kuralları riski¹ | Düşük | Orta | Orta | Orta | **Yüksek** |
| Ölçek | Düşük (haftada 1–2 uzun video) | Yüksek | Orta | Yüksek | Orta |
| Max API kredisi | Kullanılmaz | Kullanılır | Kullanılır (yalnız Claude) | Kullanılır (yalnız Claude) | Kullanılmaz |

¹ Risk yol harfine değil, **şablon ve müzik tekrarına ve anlatı özgünlüğüne** bağlıdır; her yolda yüksek olabilir. Spam politikasının örneği (aynı müzik + tekrarlayan AI görseli + AI senaryolu seslendirme, §10.2) A yolunda elle yapılsa da ihlaldir. §9'daki "4–5 sahne türü" ve sabit bileşen kütüphanesi önerisi şablon tekrarı riskini artırır; §9.1'deki çeşitlilik kontrol listesi uygulanmalı. [TAHMİN, resmî politikaya dayanır] https://support.google.com/youtube/answer/2801973 , https://support.google.com/youtube/answer/1311392

### 8.3 Durum → Sonuç [TAHMİN]

| Durum | Sonuç |
|---|---|
| Bütçe yok, GPU yok | **A** (Claude web). Ses: Google/Azure ücretsiz katmanı ya da kendi sesin. Görsel arşiv + Pexels. DaVinci ücretsiz. 2. ayda B'nin iskeletini ekle |
| Bütçe yok, 6–8 GB GPU | **A → C**: Türkçe TTS Chatterbox V3 / VoxCPM2, görsel Z-Image Q8, render Remotion |
| Az bütçe (20–50 $/ay), GPU yok | **B-lite**: Pro + kullandıkça öde API (video başı ~1 $) + ElevenLabs Creator (22 $) ya da Gemini/Google TTS + Remotion yerelde |
| Orta bütçe, Max 20x zaten var | **B**: Claude maliyeti krediden; para TTS kalitesine ve az sayıda Veo klibine |
| GPU 6–8 GB, az/orta bütçe | **B + C karışık**: TTS yerelde denenir, yetmezse bulut; görsel yerelde |
| GPU 16+ GB | **C ağırlıklı B**: yerel görsel ve video yoğun, TTS isteğe göre |
| Hiç kod yazmak istemiyor | **D2** ile başla, Türkçe sesi deneme hesabında test et; YPP için kendi yorumunu ve kurgunu ekle. Ya da **A** |
| Kod yazmak istemiyor ama bulut render istiyor | **D1** (JSON2Video'nun yerleşik sahne modeli revizyona uygun) |
| Tam otomatik, insan yok | **Önerilmez**: inauthentic content riski + uydurma tarih riski. En az iddia tablosu onayı ve son izleme insanda kalmalı |
| Kendi sahnelerini yazıp yönetecek | **B** (veya C): sahne dosyası elle yazılır, `kilit: true`, Remotion Studio'da önizleme |
| Kendi sesiyle anlatıyor, metinden revizyon istiyor | **A + Descript** ya da B + kendi ses klonu |

---

## 9. Önerilen MVP

### 9.1 MVP (ilk 2–4 hafta): "B-lite" [TAHMİN]

1. **Claude:** kredi yoksa ve kod istenmiyorsa claude.ai Project yeter (çıktı doğrudan JSON); varsa küçük bir orchestrator + API (structured outputs).
2. **TTS:** tek sağlayıcı; Türkçe kör dinleme testine göre (ElevenLabs v4/Multilingual v2, Gemini 3.8 Flash TTS/Chirp 3 HD ya da yerel). Sahne başına ayrı dosya, ölçülen süre.
3. **Görsel:** NASA/NARA/Commons/LoC arşivi + Pexels/Pixabay API (yatay/dikey; insan seçimli, §6.7 kuralları). AI görsel yalnız boşluk doldurmak için.
   - **Çeşitlilik kontrol listesi** (YPP + spam politikası, §10.2): sahne türü dağılımı videodan videoya değişir; müzik havuzu döndürülür (her videoda aynı parça yok); AI görsel stili sabit kalıp değil; kapak ve başlık içerikle tutarlı.
4. **Render:** Remotion; 4–5 sahne türü (`baslik`, `gorsel_kenburns`, `video_klip`, `harita`/`zaman_cizelgesi`, `alinti_belge`) + altyazı bileşeni; `Yatay16x9` ve `Dikey9x16` iki Composition, aynı JSON.
5. **Müzik:** YouTube Ses Kitaplığı'ndan elle seçim, ffmpeg ile ducking.
6. **Yükleme:** elle (Studio), gerekirse "AI use" beyanı.

**Büyüme (2–6. ay):** sahne bazlı önbellek ve revizyon CLI'ı (`revize --sahne s07 --metin "..."`); görsel seçim ekranı (Remotion Player gömülü web sayfası); uzun videodan otomatik Short; Batch API ile toplu taslak; ikinci dil; YouTube API ile private yükleme; kapak üretimi; analytics'ten konu seçimi.

### 9.2 Klasör yapısı

```
video-sistemi/
├─ README.md
├─ .env.example              ANTHROPIC_API_KEY=, TTS_API_KEY=, PEXELS_API_KEY=, PIXABAY_API_KEY=
│                            (gerçek .env git'e GİRMEZ)
├─ sema/
│  └─ sahne.schema.json      tek doğruluk kaynağı: Claude structured output + Remotion Zod + orchestrator doğrulama
├─ istemler/                 sistem istemleri (arastirma, iddia, senaryo, sahne, revizyon, metadata) — sürümlü
├─ sozluk/
│  ├─ telaffuz.tr.yaml       "1453" → "bin dört yüz elli üç", özel adlar
│  └─ epistemik.yaml         TR ↔ EN kesinlik ifadeleri
├─ orchestrator/             CLI (TypeScript, Python ya da C#)
├─ render/                   Remotion projesi: src/sahneler/*.tsx, Root.tsx (Yatay16x9, Dikey9x16, Kapak)
├─ projeler/
│  └─ 2026-10-xx-ornek-konu/
│     ├─ brief.md
│     ├─ kaynaklar.yaml
│     ├─ iddialar.yaml
│     ├─ senaryo.tr.md / senaryo.en.md
│     ├─ sahneler.json       şemaya uyan sahne listesi (elle düzenlenebilir)
│     ├─ varliklar/{ses,gorsel,muzik,efekt}/ + lisans.json
│     ├─ onbellek/
│     ├─ cikti/              yatay.tr.mp4, dikey-01.tr.mp4, altyazi.tr.srt, kapak-a.png, rapor.json
│     └─ revizyon-log.md     hangi sahne neden değişti; gerçek süre ve maliyet
└─ .gitignore                varliklar/, onbellek/, cikti/, node_modules/, bin/, obj/, .env
```

### 9.3 Sahne şeması

İki katman önerilir: **insanın yazdığı Markdown/YAML** ve **makinenin doğruladığı JSON**. Ayrıştırıcı Markdown'ı JSON'a çevirir; JSON şemayla (TS'de Zod, ayrıca JSON Schema) doğrulanıp Remotion'a props olarak verilir.

**İnsan biçimi (Markdown + YAML ön bilgi):**

```markdown
---
video: ornek-olay-1947
format: [16x9, 9x16]
diller: [tr, en]
hedef_sure_sn: 720
ses_profili: tr=anlatici-1 (105 k/dk), en=narrator-1 (135 k/dk)
---

## S03 · Olay yeri [kilit]
sure_hedef: 40
tur: arsiv_belge          # baslik | anlatim | gorsel_kenburns | video_klip | harita | zaman_cizelgesi | arsiv_belge | alinti | karsilastirma | canlandirma | kapanis
anlatim_tr: |
  Temmuz 1947'de üs bir basın bülteni yayımladı... [I07]
anlatim_en: |
  In July 1947, the base issued a press release... [I07]
gorsel:
  istem: "1947 tarihli basın bülteni, yakın plan, yavaş zoom"
  kaynak: K04             # kaynaklar.yaml id
  ai_uretimi: false
  gercekci: true
odak: [0.42, 0.55]
ekran_yazisi_tr: "8 Temmuz 1947"
ekran_yazisi_en: "July 8, 1947"
ses:
  muzik: gerilim-alcak (-18 dB)
  efekt: daktilo (0:02)
grafik: none              # none | mild | strong  (strong → revizyona düşer)
not: "Belgenin gerçek görüntüsü yoksa canlandırma kullan ve 'Canlandırma' etiketi koy"
```

`[I07]` = `iddialar.yaml` kaydı. Olgu cümlesinde etiket yoksa denetim uyarı verir. Örnek metin şablon amaçlıdır; olgular yayın öncesi kaynağa karşı doğrulanmalıdır.

**Makine biçimi (JSON) — structured outputs kısıtlarına uygun** (sayı/uzunluk sınırları şemada değil, kodda doğrulanır; tüm nesnelerde `additionalProperties: false`; süre alanı Claude'dan istenmez, orchestrator sesten ekler):

```json
{
  "proje": {
    "id": "ornek-olay-1947",
    "diller": ["tr", "en"],
    "format": ["yatay_16x9", "dikey_9x16"],
    "hedef_sure_sn": 720,
    "ses": { "saglayici": "ornek-tts", "ses_id": { "tr": "ORNEK_TR", "en": "ORNEK_EN" }, "model": "ornek-model" },
    "muzik": { "dosya": "varliklar/muzik/ornek.mp3", "kaynak": "YouTube Audio Library", "atif": null }
  },
  "sahneler": [
    {
      "id": "s03",
      "durum": "onayli",
      "kilit": true,
      "tur": "arsiv_belge",
      "sure_hedef_sn": 40,
      "anlatim": { "tr": "...", "en": "..." },
      "iddialar": ["I07"],
      "ekran_yazisi": { "tr": "8 Temmuz 1947", "en": "July 8, 1947" },
      "planlar": [
        {
          "id": "s03p1",
          "kaynak_turu": "arsiv",
          "sorgu": null,
          "dosya": "varliklar/gorsel/bulten.jpg",
          "kaynak_id": "K04",
          "lisans": "ABD federal kamu malı",
          "atif": "National Archives",
          "ai_uretimi": false,
          "gercekci": true,
          "model": null,
          "hareket": { "tur": "ken_burns_in", "zoom_from": 1.0, "zoom_to": 1.15, "pan_x": 0.0, "pan_y": -0.05 },
          "odak": [0.42, 0.55]
        }
      ],
      "dikey": { "kullan": true, "kirpma": "odak" },
      "ses": { "muzik_db": -18, "ducking": true, "efekt": [{ "ad": "daktilo", "t": 2.0 }] },
      "grafik": "none",
      "short_adayi": { "puan": 0.8, "kanca": { "tr": "...", "en": "..." } },
      "uretim": {
        "tts": { "tr": "onbellek/ab12.wav", "en": "onbellek/cd34.wav" },
        "sure_gercek_sn": { "tr": 38.4, "en": 41.1 },
        "hash": { "ses_tr": "ab12", "ses_en": "cd34", "goruntu": "ef56" }
      },
      "revizyon": [{ "tarih": "2026-10-15", "not": "tarih düzeltildi", "degisen": ["anlatim.tr"] }],
      "not": null
    }
  ],
  "kaynaklar": [
    { "id": "K04", "baslik": "...", "url": "https://...", "kurum": "NARA", "tur": "birincil",
      "erisim": "2026-10-15", "lisans": "PD-USGov", "atif": "National Archives" }
  ]
}
```

**Alanların işlevi:**
- `kilit: true` / `durum: kilitli`: insanın yazdığı ya da onayladığı sahne; Claude metnine dokunmaz, orchestrator sesini ve görselini yeniden üretmez (girdisi değişmedikçe).
- `durum`: `taslak | incelemede | onayli | kilitli`.
- `iddialar` / `kaynak_id`: uydurma denetimi; `iddialar.yaml`'daki birebir alıntının kaynak metinde geçtiği kodla denetlenir.
- `ai_uretimi` + `gercekci`: ikisi de `true` olan plan varsa YouTube `containsSyntheticMedia`, TikTok `is_aigc`, Instagram `is_ai_generated` = true ve ekranda "Canlandırma / AI" yazısı.
- `grafik`: `strong` sahneler reklam uygunluğu için insan revizyonuna düşer (§10.3).
- `sure_hedef_sn` yalnız hedeftir; gerçek süre sesten gelir; sapma ±%15'i aşarsa uyarı.
- `uretim.hash`: sahne bazlı önbellek anahtarları.

**Orchestrator'ın kodda doğrulaması gerekenler** (structured outputs bunları zorlayamaz): `hedef_sure_sn` ve `sure_hedef_sn` aralığı, `zoom` değerleri, `odak` 0–1 aralığı, `puan` 0–1, her `kaynak_id`'nin `kaynaklar` içinde var olması, her `iddia`'nın onaylı olması, enum değerlerinin büyük/küçük harf normalizasyonu, `stop_reason` "refusal"/"max_tokens" ise yeniden deneme.

### 9.4 Adım adım ilk video (12 dk yatay + 1 Short) [TAHMİN]

1. **Gün 1 – Kurulum:** Node LTS, `npx create-video@latest`, ffmpeg; API anahtarları (Anthropic, TTS, Pexels, Pixabay). Max/Team aboneliği varsa Console organizasyonunu bağla (7 gün şartı).
2. **Gün 1 – Brief:** konu, açı ("X nasıl inşa edildi; bilinenler / tartışmalı olanlar"), hedef 12 dk, dil(ler).
3. **Gün 1 – Ses kalibrasyonu:** seçilen TTS ile 200 kelime okut, kelime/dk ölç; kör dinleme testi.
4. **Gün 2 – Araştırma:** Claude + web_search (`allowed_domains` arşivler); 10–20 arama ≈ 0,10–0,20 $. Kaynaklar `kaynaklar.yaml`'a.
5. **Gün 2 – İddia tablosu:** birebir alıntılarla; kod denetimi; **insan kapısı #1**.
6. **Gün 2 – Senaryo:** hook → bağlam → 3–4 bölüm → "ne biliyoruz / ne bilmiyoruz" → kapanış; TR ~1.150, EN ~1.500 kelime. İnsan düzeltir ve **kendi yorumunu ekler** (YPP için kritik).
7. **Gün 3 – Sahne JSON'u:** structured output ile 30–60 sahne; insan `not`, `kilit`, `odak` alanlarını düzenler.
8. **Gün 3 – Ses:** telaffuz sözlüğü uygulanır; sahne başına TTS; süreler ölçülür.
9. **Gün 4 – Görsel:** plan başına 3–5 aday; insan seçer; arşiv görselleri [goruntu-netlestirme](../goruntu-netlestirme/) ile 2× büyütülür; `lisans.json` doldurulur.
10. **Gün 4 – Storyboard:** `renderStill()` ile sahne başına kare; hızlı göz kontrolü.
11. **Gün 4–5 – Render:** `npx remotion studio` ile önizleme; sessiz sahne render'ları; ses miksi; concat. Örnek: `npx remotion render Yatay16x9 cikti/yatay.tr.mp4 --props=projeler/ornek/sahneler.json` (Windows'ta satır içi JSON değil dosya yolu).
12. **Gün 5 – Revizyon:** `inceleme/v1.md`'ye sahne ID'li notlar; yalnız değişen sahneler yeniden üretilir; **insan kapısı #2**.
13. **Gün 5 – Short:** en güçlü 45–60 sn kesit; yeni hook ve kapanış yazılır, seslendirilir; dikey render; lisanslı müzik/arşiv içeriyorsa **60 sn altında**.
14. **Gün 6 – Yükleme:** başlık/açıklama (kaynakça, Pexels/NASA/NARA atıfları, CC müzik atfı); gerekiyorsa AI beyanı; önce private/unlisted, son izlemeden sonra public.
15. **Ölçüm:** gerçek süre ve maliyet `revizyon-log.md`'ye; bu belgedeki TAHMİN rakamları gerçek değerlerle değiştir.

### 9.5 Örnek Claude istemleri

**Sistem istemi (claude.ai Project talimatı ya da API `system`):**

```text
Sen tarih, mühendislik tarihi ve gizem konularında belgesel senaryo yazan bir araştırmacı-yazarsın.
Kurallar:
1. Yalnız sana verilen KAYNAKLAR ve onaylı İDDİA TABLOSU içindeki bilgileri kullan. Dış bilgi kullanma.
2. Her olgu cümlesinin sonuna köşeli parantezle iddia kimliğini yaz: [I07]. İddia tablosunda olmayan
   sayı, tarih, özel isim veya alıntı yazma.
3. Emin olmadığın yerde "bilmiyorum" ya da "kaynaklarda bulunamadı" de; boşluğu tahminle doldurma.
4. Kesinlik düzeylerini sözlükteki ifadelerle ver: KESİN → "belgelere göre", OLASI → "büyük olasılıkla",
   İDDİA → "iddia ediliyor", TARTIŞMALI → "tarihçiler arasında tartışmalı".
5. Resmî açıklamayı ve alternatif iddiaları ayrı paragraflarda, etiketli ver. Gerçek trajedileri
   "olmadı / sahnelendi / örtbas edildi" diye sunma.
6. Gerçek bir kişiye söylemediği bir sözü atfetme. Alıntılar "anlatıcı okur" biçimindedir.
7. Ton: merak uyandıran ama abartısız; clickbait yok.
```

**İddia tablosu çıkarma (her kaynak belgesi için):**

```text
Aşağıdaki <belge> içinden konuyla ilgili olguları çıkar.
Her olgu için: (a) tek cümlelik iddia, (b) belgeden KELİMESİ KELİMESİNE alıntı (en çok 2 cümle),
(c) güven: KESİN / OLASI / İDDİA / TARTIŞMALI, (d) içerdiği tarih, sayı ve özel isimler.
Alıntı bulamadığın iddiayı listeye alma. Belgede olmayan bilgiyi ekleme.
<belge kaynak_id="K04">...</belge>
```

**Senaryo yazımı:**

```text
Onaylı iddia tablosu ve kaynaklar aşağıda. Hedef: 12 dakikalık Türkçe belgesel anlatımı,
yaklaşık 1.150 kelime (±%10). Bölüm iskeleti: Soğuk açılış (~50 kelime) → Vaat ve bağlam (~80) →
Arka plan (~235) → Olay / inşa süreci (~235) → Kanıt (~235) → Tartışma / gizem (~235) →
Ne biliyoruz / ne bilmiyoruz (~130, üç sepet) → Kapanış (~45).
Her bölümü "## Bölüm adı" ile başlat. Sistem istemindeki kurallara uy.
<iddialar>...</iddialar>
<kaynaklar>...</kaynaklar>
```

**Sahne JSON'u (API'de `output_config.format` ile şema verilir):**

```text
Onaylı senaryoyu sahnelere böl. Her sahne bir seslendirme paragrafı (yaklaşık 12–25 saniye) olsun.
Sahne türünü listeden seç ve aynı türü art arda üçten fazla kullanma (çeşitlilik).
Her plan için önce arşiv kaynağı öner (kaynak_id ile); arşiv yoksa stok arama sorgusu (İngilizce, 3–5 kelime);
o da uygun değilse kaynak_turu "ai_gorsel" ve gercekci=false olan, resim/gravür stilinde bir istem yaz.
Gerçekçi AI canlandırma öneriyorsan ai_uretimi=true, gercekci=true işaretle.
kilit=true olan mevcut sahneleri olduğu gibi koru. Süre alanı yazma.
```

**Sahne bazlı revizyon:**

```text
Yalnız aşağıdaki sahneyi düzelt; diğer sahneleri yeniden yazma.
Revizyon notu: "s14: cümle uzun, ikiye böl; tarih yanlış, I22'ye göre düzelt."
Kilitli bir sahneye dokunma; öneri gerekiyorsa yalnız "not" alanına yaz.
Değişen alanları "revizyon.degisen" listesine ekle ve durumu "incelemede" yap.
<sahne>{...s14 JSON...}</sahne>
<iddialar>{...I22...}</iddialar>
```

**Short kesiti:**

```text
Sahne listesinden 30–60 saniyelik, kendi içinde tamamlanan ve tek bir belgelenmiş iddiaya dayanan
bir kesit seç. Yeni bir 2 saniyelik görsel hook cümlesi ve bir kapanış cümlesi yaz (TR ve EN).
Tartışmalı bir konuysa sona "kanıtlanmadı" kartı ekle. Uzun videonun metnini birebir kopyalama;
dikey format için yeniden yaz.
```

**Metadata (batch'e uygun, Haiku/Sonnet):**

```text
Videonun TR ve EN başlığını (en çok 70 karakter, clickbait yok), açıklamasını (ilk 2 satırda öz,
ardından bölüm zaman damgaları, kaynakça ve görsel/müzik atıfları), 10 etiketi ve 3 kapak metni adayını
(en çok 4 kelime) üret. Kaynakça ve atıfları yalnız verilen kaynaklar.yaml ve lisans.json'dan al.
```

### 9.6 Orchestrator dili [TAHMİN]

Okurun hangi dili bildiğine göre:

| Seçenek | Artı | Eksi | Kimin için |
|---|---|---|---|
| **Tamamen TypeScript (Node)** | Remotion ile aynı dil; Zod şeması ortak; Remotion Player ile web revizyon ekranı doğal; Remotion Agent Skills | TS bilmeyen için öğrenme yükü (depoda [JavaScript-TypeScript](../../JavaScript-TypeScript/) bölümü var) | Hiç bilmeyen ya da web geliştirici: **en az sürtünmeli yol** |
| **Python orchestrator + Remotion** | Yerel AI modellerinin (TTS, görsel, WhisperX) doğal ortamı; MoviePy ile basit montaj | Hareketli grafikte zayıf; Remotion ayrı süreç | C yolu (yerel modeller) ve Python bilen |
| **C# (.NET) orchestrator + Remotion işçisi** | Resmî `Anthropic` NuGet SDK; FFMpegCore 5.5.0 (20.09.2026, MIT) [RESMÎ] https://www.nuget.org/packages/FFMpegCore ; `HttpClient` ile REST; `ProcessStartInfo` ile `npx remotion render`; Blazor/WPF ile seçim ekranı | İki dil, şema iki yerde senkron | C#'tan geliyorsan en hızlı geliştirme |
| **Remotion'sız C#** (SkiaSharp + FFmpeg + Skottie) | Tek dil, Node/Chrome yok | Düzen, metin, animasyon elle (kodla-video §10); MVP için ağır | Yalnız özel gereksinimde |

---

## 10. Yayın

### 10.1 YouTube: genel kurallar ve kapak

- **Shorts:** 15.10.2024'ten beri kare/dikey ve **3 dakikaya kadar** videolar Short sayılır; 16:9 uzun video sayılır. **1 dakikadan uzun ve aktif telif talebi olan Short dünya genelinde engellenir** (oynatılmaz, önerilmez, para kazanmaz). https://support.google.com/youtube/answer/15424877 [RESMÎ]
- **Kapak:** önerilen 3840×2160 (video), 2160×3840 (Shorts); en küçük genişlik 640 px; JPG/PNG; masaüstünden 50 MB, mobilden 2 MB; özel kapak için **doğrulanmış hesap**; Shorts kapağı yalnız masaüstü Studio'dan. Eski "1280×720, 2 MB" kuralı güncellenmiş. https://support.google.com/youtube/answer/72431 [RESMÎ]
- **Test & Compare:** 3 başlık/kapağa kadar A/B testi, kazanan **izlenme süresine** göre; Shorts'ta yok; yalnız masaüstü Studio. https://support.google.com/youtube/answer/13861714 [RESMÎ] → sistem her video için 3 kapak adayı üretmeli [TAHMİN]. Kapakta Türkçe yazıyı Remotion "Kapak" Composition'ı basar.
- YPP eşikleri, gelir payları, AdSense: [../../../Rehberler/YouTube-Oyun/](../../../Rehberler/YouTube-Oyun/) (arastirma.md §9, surec-ve-engeller.md). **01.02.2027 değişikliği [RESMÎ]** (YouTube blogu, 10.08.2026): "New creators applying for YPP will need 8,000 qualified watch hours in the last 365 days or 20 million qualified Shorts views in the last 90 days"; "This update won't impact creators already in YPP". Abone eşiği blogda belirtilmemiş [ÇELİŞKİLİ]. https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/
- **Shorts ekonomisi:** Shorts reklam payı için son 90 günde 10M nitelikli Shorts görüntülemesi gerekir; küçük kanalda Shorts geliri pratikte sıfırdır [RESMÎ] https://support.google.com/youtube/answer/72851

### 10.2 YPP: inauthentic ve reused content [RESMÎ]

Kaynak: https://support.google.com/youtube/answer/1311392 (15.10.2026'da ham HTML okundu)

**Zaman çizelgesi:**
- **15.07.2025:** "repetitious content" politikasının adı **"inauthentic content"** oldu; seri üretilmiş ve tekrarlayan içeriği kapsadığı netleştirildi ("minor update"). Reused content değişmedi. [RESMÎ]
- **Temmuz 2026:** politika üç başlığa ayrıldı: "Generic or Repetitive Content", "Unsatisfying or Off-putting Content", "AI Personas Related to Sensitive Topics" (üç başlık resmî sayfada mevcut [RESMÎ]). Sayfa günlüğünde 2026 kaydı yok, son kayıt 15.07.2025; Temmuz 2026 tarihi yalnız 3. taraf haberlere dayanıyor (TheDesk 20.07.2026 "took effect last week", AndroidHeadlines 21.07.2026 tarih vermiyor) [3. TARAF / ÇELİŞKİLİ]. Duyuru YouTube Trust & Safety'nin Creator Insider videosunda https://www.thedesk.net/2026/07/youtube-clamps-down-low-quality-ai-slop/ , https://www.androidheadlines.com/2026/07/youtube-monetization-rules-ai-slop-inauthentic-content.html
- **Ocak 2026:** toplam 35M aboneli 16 "AI slop" kanalının kapatıldığı bildirildi [3. TARAF] https://air.io/en/monetization/youtube-monetization-policy-changes-2026-a-complete-dated-timeline

**Para kazanamaz:**
- Düşük eğitsel değerli, yorumsuz/anlatısız, videolar arası çok az fark olan içerik.
- "Image slideshows, templated storylines, or scrolling text" (anlatı, yorum veya eğitsel değer olmadan).
- "AI-generated content made with generic or unoriginal templates giving the impression of mass production without adding the creator's original, authentic insights or perspective."
- "Videos that stitch together unrelated or inconsistent AI clips to surprise or shock viewers."
- Gerçekçi görsellerle sahte ünlü ölümü veya sahte doğal afet.
- Rahatsız edici temaları (şiddet, kayıp) bütünlüklü anlatı kurmadan tekrar tekrar kullanmak.
- "Unsatisfying or Off-putting Content" başlığından: **"Content that lacks a clear narrative arc or logical progression"** ve **"Content that uses deceptive or misleading imagery or narratives"**. UFO/gizem için ikincisi kritik: kanıt gibi sunulan gerçekçi AI canlandırma bu maddeye girer [TAHMİN, resmî metne dayanır].
- **"Channels that heavily rely on generic templates or emotionally manipulative themes"**.
- İnsan uzman gibi sunulan AI karakterin sağlık, hukuk, finans tavsiyesi (maddelerde örneklenenler; giriş metninde siyaset de anılıyor).
- **Reused:** başkasının metnini (web sitesi, haber akışı) yalnız okumak; derleme kısa video kolajları; esaslı değişiklik yapılmadan indirilmiş içerik. Politika **kanalın bütününe** uygulanır; "If we cannot clearly tell that you made the content" tüm kanaldan para kazanma kalkabilir; izin almak muaf tutmaz; telif incelemesinden ayrıdır ("not based on copyright, permission, or fair use").

**İzinli:**
- Aynı intro/outro, videonun büyük kısmı farklıysa; her bölümü ayrı hikâyeli seri.
- Otomatik araç/şablon kullanımı, "the final product must still demonstrate your creative vision".
- Kendi icat ettiğin karakter/hikâyeyi AI ile görselleştirmek; "using AI to edit your video scripts or generate a unique background visual" ile "well-researched" anlatıyı desteklemek.

**Bu sisteme uygulanması [TAHMİN]:**

| Sistem davranışı | Risk | Ne yapılmalı |
|---|---|---|
| Tam otomatik: konu → LLM → TTS → stok/AI → yükleme, her gün aynı şablon | **Yüksek** | Yarı otomatik; her videoda özgün araştırma sorusu, karşılaştırma, kaynak gösterimi |
| Her videoda aynı müzik + tekrarlayan AI görseli + AI senaryolu seslendirme (yol fark etmez) | **Yüksek: Topluluk Kuralları ihlali (kaldırma/ihtar)**, yalnız para kazanma değil (§10.2b) | Müzik havuzunu döndür, görsel stili videodan videoya değiştir, sahne türü çeşitliliği |
| Gizem/UFO'da abartılı ya da içerikle uyuşmayan başlık/kapak | **Yüksek** (spam politikası: yanıltıcı başlık/kapak) | Kapak ve başlık içerikle tutarlı; "kanıt" iddiası yalnız belgeli olguda |
| Wikipedia/haber metnini TTS ile okutmak | **Yüksek** | Kendi yorumun, kaynak eleştirisi |
| İlgisiz AI kliplerini şok amaçlı art arda (UFO montajı) | **Yüksek** | Tutarlı anlatı yayı |
| Ken Burns arşiv slaytı, anlatı/yorum zayıf | Orta–yüksek | Gerçek anlatım + araştırma + "ne biliyoruz / bilmiyoruz" |
| Aynı kalıp başlık ve yapı ("Çözülemeyen sır #47") | Orta–yüksek | Format sabit, yapı ve içerik değişken; sahne türü çeşitliliği |
| Seri format, sabit intro/outro, her bölüm ayrı araştırma | Düşük | — |
| Kullanıcının kendi yazıp yönettiği sahneler, AI yalnız görselleştiriyor | Düşük | Üretim notlarını sakla |
| TR ve EN sürümü aynı kanala iki kez | Belirsiz, tekrar sayılabilir | Çok dilli ses izi, otomatik dublaj ya da ayrı dil kanalları |

**Kanıt dosyası:** her video için iddia tablosu, senaryo taslakları, revizyon geçmişi saklanır; YPP incelemesinde "insan katkısı" itirazına dayanak olur. Sahne bazlı revizyon sistemi bu kaydı doğal olarak üretir.

### 10.2b Spam politikası: seri üretim ve yanıltıcı başlık/kapak (Topluluk Kuralları) [RESMÎ]

Kaynak: https://support.google.com/youtube/answer/2801973 (15.10.2026'da okundu; maddenin ekleme tarihi sayfada yok)

- YouTube'un "Spam, aldatıcı uygulamalar ve dolandırıcılık" politikası **"Automated or synthetic mass-production"** maddesini içerir: "Using automated tools or AI to churn out high volumes of similar content with minimal changes"; "we don't allow use of these tools to flood our platform with repetitive content".
- Sayfadaki örnek bu sistemin varsayılan çıktısına çok yakındır: "Channels that use the exact same background music and repetitive AI generated imagery across many videos", her video AI ile yazılmış metinle seslendirilmiş.
- Aynı sayfa **"maliciously misleading titles, thumbnails, descriptions"** (kötü niyetli tık tuzağı) maddesini de içerir; gizem/UFO başlık ve kapakları için doğrudan geçerlidir.
- **Yaptırım YPP'den farklıdır:** yalnız para kazanmanın kaldırılması değil, **içerik kaldırma, uyarı/ihtar, 90 günde 3 ihtarla kanal kapatma**.
- Pratik öneri [TAHMİN]: müzik havuzu döndürülür; görsel stil videodan videoya değişir; sahne türü dağılımı sabit kalıp olmaz; kapak ve başlık içerikle tutarlı tutulur (§9.1 çeşitlilik kontrol listesi).

### 10.3 AI beyanı, misinformation ve reklam uygunluğu

**AI / sentetik içerik beyanı** [RESMÎ] https://support.google.com/youtube/answer/14328491

| Beyan zorunlu (gerçekçi içerik) | Beyan gerekmez |
|---|---|
| Gerçek kişiye söylemediğini söyletmek / yapmadığını yaptırmak | Gerçekçi olmayan içerik (fantastik, animasyon) |
| Gerçek olay veya yerin görüntüsünü değiştirmek | Renk filtresi, upscale, ses onarımı, altyazı |
| **Olmamış gerçekçi bir sahne üretmek** | **Kendi sesinin klonu** |
| Gerçek bir yerin AI ile üretilmiş gerçekçi ek görüntüsü | AI ile senaryo, ana hat, başlık, kapak, infografik |
| Videonun ana unsuru olan AI müzik | — |

- Etiket fotogerçekçi içerikte ve AI müzikte oynatıcının üstünde, diğerlerinde genişletilmiş açıklamada.
- **Otomatik etiketin üç yolu:** (1) YouTube'un kendi araçlarıyla üretilen içerik, (2) C2PA meta verisi taşıyan içerik, (3) "Content that our internal systems detect is AI generated or altered". (1), (2) ve manuel incelemeyle konan etiket **kaldırılamaz**; (3) yoluyla gelen etiket Studio'daki beyan anketinde "No" seçilerek değiştirilebilir.
- "Labels may appear in the expanded description for non-music AI-generated audio": TTS beyanı zorunlu olarak tanımlanmamış, ama sistem AI sesi tespit ederse etiket açıklamada çıkabilir.
- [TAHMİN] OpenAI/Google görsellerindeki C2PA verisi Remotion'la yeniden kodlanınca büyük olasılıkla silinir; dosya olduğu gibi yüklenirse etiket kalıcı olur. Etiket kararını sahne verisindeki `ai_uretimi`/`gercekci` alanları belirlemeli, dosyadaki meta veri değil.
- **Beyan erişimi ve geliri tek başına sınırlamaz.** Sürekli beyan etmeyene içerik kaldırma veya YPP'den çıkarma uygulanabilir.
- API alanı: `status.containsSyntheticMedia` (`videos.insert`/`videos.update`; 30.10.2024'te eklendi) [RESMÎ] https://developers.google.com/youtube/v3/docs/videos
- Genel TTS anlatıcı sesi için beyan zorunluluğu tanımlanmamış (yukarıda: tespit edilirse açıklamada etiket çıkabilir); gerçekçi sahneyle birlikte değilse beyan gerekmez [TAHMİN]. Arka planda (ana odak olmayan) AI müzik için de açık hüküm yok [TAHMİN].

| Tarih/gizem içeriği | Beyan [TAHMİN, resmî tanımlardan] |
|---|---|
| Fotogerçekçi AI canlandırma (antik şantiye, piramit inşası, 1947 olayı sahnesi) | **Evet** + ekranda "Canlandırma / Reconstruction" |
| Gerçek arşiv fotoğrafını AI ile hareketlendirme/değiştirme | **Evet** |
| Gerçek tarihî kişiye AI ile ses/konuşma | **Evet** + kişilik hakkı riski; alıntı "anlatıcı okur" biçiminde olmalı |
| Çizgi, illüstrasyon, şematik 3D | Hayır |
| Arşiv görselinin büyütülmesi | Hayır |

**Topluluk kuralları (kaldırma düzeyi)** [RESMÎ] https://support.google.com/youtube/answer/10834785
- Manipulated content: ciddi zarar riski taşıyan teknik olarak değiştirilmiş yanıltıcı içerik yasak.
- Misattributed content: eski görüntüyü güncel olay gibi sunmak (ciddi zarar riski varsa) yasak. [TAHMİN] Arşiv görüntüsünü yanlış olay/tarihle etiketlemek bu maddeye girebilir.
- EDSA istisnası (eğitsel, belgesel, bilimsel, sanatsal): bağlam verilirse kalabilir; "This is not a pass to promote misinformation."
- 90 gün içinde 3 ihtar = kanal kapatma.
- UFO veya "komplo teorisi" bu sayfada ayrı kategori olarak geçmiyor. "Borderline" içeriğin önerilerden düşürülmesine dair resmî metin bu araştırmada okunamadı (blog URL'si 404).

**Nefret söylemi politikası: tarih kanalı için kritik** [RESMÎ] https://support.google.com/youtube/answer/2801939
- İhlal sayılır: **"Denial or minimization of a well-documented, major violent event or the victimhood of such an event"**. Tarih ve "tarihte bilinmeyenler" içeriği bu maddeye doğrudan değebilir; iyi belgelenmiş büyük şiddet olaylarını inkâr etmek ya da küçültmek **kaldırılır**.
- Bu politikada EDSA bağlamı **videonun içinde (görüntü ya da ses) verilmelidir; başlık ve açıklama tek başına yetmez.** §12.4'teki "gerçek trajedileri olmadı/örtbas diye sunma" kuralının dayanağı budur.

**Reklam veren dostu yönergeler** [RESMÎ] https://support.google.com/youtube/answer/6162278
- "Conspiracy" kelimesi geçmiyor. Reklamsız: zararlı yanlış bilgiyi tanıtmak; trajik olayın yaşanmadığını iddia etmek, kurbanlara "kriz aktörü" demek; trajik olaylar bağlamında örtbas iddiası; iklim değişikliği bilimsel uzlaşısını reddetmek. Reklamlı: yanlış bilgiyi anlatan veya çürüten eğitsel/belgesel içerik.
- Resmî "Documentary" tanımı: "memorializing and preserving historic events by quoting original documents or describing facts" [RESMÎ]. Bu sistemin "iddia tablosu + birincil belge alıntısı" yaklaşımı doğrudan bu tanıma oturur [TAHMİN].
- [TAHMİN] "Bilinmeyeni araştıran, hipotezleri ve kanıtı tartan" ton reklama uygundur; gerçek trajedileri "olmadı / örtbas" diye sunmak reklamsızdır.

| Savaş / şiddet / tarih görüntüsü | Reklam [RESMÎ] |
|---|---|
| Grafik olmayan eğitsel savaş anlatımı | Alabilir |
| Bağlamsız ham savaş görüntüsü / yaralanma | Sınırlı |
| Grafik yaralanma, ölüm, acı | Bağlam ne olursa olsun **reklamsız** |
| Eğitsel içerikte örtülü veya "tarihî" cesetler | Alabilir |
| Eğitsel içerikte belirgin yaralanma | Sınırlı |
| Terör saldırısının eğitsel/gazetecilik anlatımı | Alabilir |
| Hassas olayları sömürmek, olay anahtar kelimeleriyle trafik çekmek | Reklamsız |

- Ukrayna savaşını sömüren/küçümseyen/onaylayan içerik 23.03.2022'den beri "until further notice" reklamsız. Kapaktaki grafik içerik reklamı sınırlar.
- **Yaş sınırı** [RESMÎ] https://support.google.com/youtube/answer/2802008 : savaş bölgesi, insani kriz ve afet görüntüsü bağlamla kalabilir ya da yaş sınırı alabilir. Bağlamın başlık/açıklamada mı, videonun içinde mi olması gerektiği konusunda bu sayfa [ÇELİŞKİLİ]; nefret söylemi politikası ise bağlamın video içinde olmasını açıkça istiyor (yukarıda) → güvenli olan: **bağlamı videonun içinde, sesle ve ekran yazısıyla ver.** Yaş sınırlı video 18 altına ve oturumsuz kullanıcıya gösterilmez.
- **Pratik [TAHMİN]:** kapakta ve ilk saniyelerde grafik görüntü yok; arşiv savaş görüntüsü kısa tutulur/bulanıklaştırılır; sahne JSON'unda `grafik: none|mild|strong`.

### 10.4 Content ID ve arşiv görüntüsü [RESMÎ]

- Content ID referansı için **münhasır hak** gerekir. Uygun değil: münhasır olmayan lisans (stok dahil), Creative Commons, **kamu malı görüntü**, fair use klipleri. https://support.google.com/youtube/answer/2605065
- [TAHMİN] Kamu malı arşiv görüntüsünü başkası geçerli biçimde Content ID'ye koyamaz; hatalı talepler yine gelebilir → kaynak URL ve lisans kaydı (asset manifest) itiraz için saklanır.
- Kamu malı görüntü telif sorunu çıkarmasa da **yorum ve anlatı eklenmezse** reused content sayılabilir.
- Lisanslı müzik veya arşiv içeren Short'ları **60 saniyenin altında** tut.

### 10.5 YouTube Data API v3 ile yükleme

**Kota (değişti)** [RESMÎ] https://developers.google.com/youtube/v3/docs/videos/insert , https://developers.google.com/youtube/v3/determine_quota_cost (son güncelleme 08.10.2026), https://developers.google.com/youtube/v3/revision_history
- 04.12.2025: yükleme maliyeti ~1600 → ~100 birim.
- 01.06.2026: "granular quota"; `videos.insert` ve `search.list` ayrı kovalarda. Bugün `videos.insert`: "100 calls per day", "Video Uploads" kovasında 1 birim.
- Diğer uç noktalar ortak 10.000 birimlik günlük kova: `videos.update` 50, `thumbnails.set` 50, `playlistItems.insert` 50, **`captions.insert` 400**. Gece yarısı Pasifik saatiyle sıfırlanır.
- Eski "1600 birim, günde 6 video" bilgisi **geçersiz**. Ortak kovada en pahalı kalem altyazı yüklemesidir (10.000 / 400 = günde 25 altyazı); bu ancak günde ~12'den fazla iki dilli video yüklenirse darboğaz olur, bu sistemin ölçeğinde değil [TAHMİN].
- `thumbnails.set` dosya üst sınırı 50 MB [RESMÎ] https://developers.google.com/youtube/v3/docs/thumbnails/set
- Ek kota: API Compliance Audit / Quota Extension Form. https://developers.google.com/youtube/terms/developer-policies

**Doğrulanmamış projede private kilidi [ÇELİŞKİLİ]:**
- Revision history (28.07.2020, hâlâ yayında): 28.07.2020'den sonra açılmış doğrulanmamış projelerden yüklenen videolar private'a kilitlenir.
- Bugünkü `videos.insert` sayfası: "Videos uploaded from unverified API projects are not restricted to private viewing mode."
- Kaldırmayı duyuran kayıt bulunamadı; Mayıs 2026 tarihli üçüncü taraf rehber kilidin sürdüğünü söylüyor [3. TARAF] https://www.ayrshare.com/solutions/google-api-error-403-unverified-app-how-to-fix-the-audit-pipeline/
- [TAHMİN] Önce `privacyStatus: unlisted` ile deneme yüklemesi; kilitlenirse denetim formu (kişisel kullanım için de doldurulabilir; gizlilik politikası ve kullanım senaryosu ister).
- `privacyStatus` verilmezse video **public** olur; resmî metne göre bazı yüklemeler hesap ayarına bağlı olarak private'a da düşebilir [RESMÎ] → her zaman açıkça `private` ya da `unlisted` gönder.

**OAuth ve politika [RESMÎ]:**
- Kapsam: `youtube.upload` (en dar).
- OAuth onay ekranı "External" + "Testing" ise refresh token **7 günde** sona erer → haftalık yeniden yetkilendirme; tam otomatik sistemde kırılma noktası. [RESMÎ] "In production" durumundaki **doğrulanmamış** uygulama "unverified app" uyarı ekranını gösterir ve **toplam 100 yeni kullanıcı** sınırına tabidir; Google "kişisel kullanım" diye ayrı bir muafiyet tanımlamıyor. Tek kullanıcılı kişisel araçta pratik çözüm: production'a geç, uyarıyı kendin geçerek yetkilendir; 7 günlük süre kalkar [TAHMİN]. **OAuth uygulama doğrulaması ≠ YouTube API Compliance Audit** (kota ve private kilidi); ikisi ayrı süreçtir. https://developers.google.com/identity/protocols/oauth2 , https://support.google.com/cloud/answer/7454865
- Yazma işlemleri için kullanıcının "prior specific and express consent"i; yayımlanacak veride son söz kullanıcıda; gizlilik durumu açık onay olmadan değiştirilemez; bir API istemcisi için tek proje; 90 gün hareketsiz proje erişimini kaybedebilir.
- Yararlı alanlar: `status.publishAt` (yalnız private videoda zamanlı yayın), `status.containsSyntheticMedia`, `status.selfDeclaredMadeForKids`, `paidProductPlacementDetails.hasPaidProductPlacement`. Dosya ≤256 GB, `video/*`.

| Düzey | Yükleme yolu [TAHMİN] |
|---|---|
| Elle | Studio; AI beyanı "AI use: Yes/No" sorusuyla |
| Yarı otomatik | API ile `unlisted`/`private` + `publishAt`; Studio'da son kontrol (politikalarla doğal uyumlu) |
| Tam otomatik | Teknik olarak mümkün; seri üretim riski en yüksek; refresh token için production şart |

### 10.6 TikTok

**AIGC kuralı** [RESMÎ, Topluluk Kuralları 2026H2] https://www.tiktok.com/community-guidelines/en/integrity-authenticity
- Gerçekçi kişi/sahne gösteren AI veya ciddi biçimde düzenlenmiş içerik **etiketlenmek zorunda** (TikTok AIGC etiketi ya da açık başlık/sticker/filigran); etiketsiz içerik kaldırılabilir, kısıtlanabilir veya TikTok etiketleyebilir.
- Beyan gerekmez: renk düzeltme, kırpma; anime gibi sanatsal stiller; **tanınmış birinin sesi olmayan genel TTS seslendirmesi**.
- Kamu yararını ilgilendiren konularda yanıltan AIGC etiketli olsa da yasak.

**For You akışına (FYF) giremeyenler** [RESMÎ, aynı sayfa] — UFO/gizem için kritik:
- "Conspiracy theories that assign blame to powerful groups or institutions, such as 'the government' or a 'secret society'" (kamu güvenini zedeleme olasılığı yüksekse).
- Bağlamından koparılmış düzenlenmemiş medya; yetkili kaynakları seçici kullanıp yanıltıcı sonuca varmak; kriz/önemli olaylar hakkında doğrulanmamış iddialar.
- Kaldırılır: zarar verebilecek komplo teorisi/aldatmaca.
- Özgün olmayan içerik: yaratıcı düzenleme yapılmamış, başkasının filigranı görünen yeniden paylaşımlar FYF dışı.
- [TAHMİN] "Hükümet UFO'ları saklıyor" anlatısı FYF dışı kalabilir; belgeye dayalı, sorgulayan ton daha güvenli.

**Para kazanma:** Creator Rewards'ın Türkiye'de olduğuna dair kaynak **bulunamadı**; resmî ülke listesi yayımlanmıyor [3. TARAF] https://ttcalculator.net/data/reference/creator-fund-countries/ . Türkiye'den yalnız Effect Creator Rewards bildirilmiş [3. TARAF]. Kesin bilgi için uygulamada TikTok Studio > Monetization. [TAHMİN] TikTok'u erişim kanalı olarak düşün.

**Content Posting API** [RESMÎ]:
- **Direct Post** (`video.publish`) https://developers.tiktok.com/doc/content-posting-api-reference-direct-post , https://developers.tiktok.com/doc/content-sharing-guidelines : denetlenmemiş istemciler yalnız `SELF_ONLY` (private), 24 saatte en çok 5 kullanıcı. **Denetim kuralları "yalnız geliştiricinin veya ekibinin yönettiği hesaplara yükleyen" iç araçları kabul etmez** → kişisel otomasyon Direct Post denetimini geçemeyebilir [TAHMİN]. UI zorunlulukları (ön seçili gizlilik yok, önizleme, açık onay, müzik onayı); dakikada 6 istek; ~15 gönderi/üretici/gün; `post_info.is_aigc`.
- **Upload / inbox** (`video.upload`) https://developers.tiktok.com/doc/content-posting-api-reference-upload-video : video taslak olarak gelen kutusuna düşer, kullanıcı uygulamada yayınlar; 24 saatte en çok 5 bekleyen; sayfa denetim zorunluluğundan söz etmiyor → **yarı otomatik kişisel sistem için en uygun yol** [TAHMİN].
- `PULL_FROM_URL` için alan adı doğrulaması; yoksa `FILE_UPLOAD`.

### 10.7 Instagram Reels (Meta)

**Content publishing API** [RESMÎ] https://developers.facebook.com/docs/instagram-platform/content-publishing
- Yalnız **profesyonel hesap**. İzinler: Instagram Login ile `instagram_business_basic` + `instagram_business_content_publish`; Facebook Login ile `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`.
- `media_type=REELS` + `video_url` (herkese açık sunucuda) ya da resumable upload.
- Limit 24 saatte 100 API paylaşımı; belgede başka yerde 50 [ÇELİŞKİLİ].
- Özellikler: MP4/MOV, H.264/HEVC, AAC ≤48 kHz, 23–60 fps, genişlik ≤1920 px, **3 sn – 15 dk**, **≤300 MB**, video ≤25 Mbps, önerilen 9:16.
- **AI etiketi:** `is_ai_generated` = "self-disclosure of AI usage in the post".
- Meta "AI info" etiketi (01.07.2024'te "Made with AI"dan değişti; 12.09.2024'ten beri yalnız AI ile düzenlenmiş içerikte menüde, tamamen üretilmişte üstte) [RESMÎ] https://about.fb.com/news/2024/04/metas-approach-to-labeling-ai-generated-content-and-manipulated-media/ . Fotogerçekçi video ve gerçekçi ses için zorunlu [RESMÎ, ikincil okuma] https://help.instagram.com/761121959519495
- Uygulama içi Reels süresi 3 dk (Ocak 2025); yükleme üst sınırı 15 dk mı 60 dk mı [ÇELİŞKİLİ] https://buffer.com/resources/instagram-reels-length . TikTok uygulama içinde 10 dk, yüklemede 60 dk [3. TARAF].
- Meta 14.07.2025'te Facebook'ta başkasının içeriğini tekrar paylaşan hesaplara yaptırım duyurdu [3. TARAF]; Instagram'a özel metin okunmadı. Instagram/Facebook'un Türkiye'deki para kazanma imkânları **incelenmedi**.

### 10.8 Çapraz yayın özeti [TAHMİN]

| Hedef | Tam otomatik | Yarı otomatik (önerilen) | Elle |
|---|---|---|---|
| YouTube (uzun + Shorts) | API mümkün; refresh token ve denetim belirsizliği | API ile unlisted/zamanlı + Studio kontrolü | Studio |
| TikTok | Direct Post denetimi kişisel araç için zor; denetimsiz yalnız private | **Upload/inbox** + uygulamada yayınla | Uygulama |
| Instagram Reels | Graph API, profesyonel hesap | Aynı; `is_ai_generated` ayarla | Uygulama |

- Platform filigranı taşıyan dosya başka platforma yüklenmez; her platforma **temiz master** dosyadan render alınır.

### 10.9 İki dil (TR/EN) yayın biçimi [RESMÎ]

- **Otomatik dublaj** https://support.google.com/youtube/answer/15569972 : uygun üreticilerde varsayılan açık; Türkçe yalnız **TR → EN**; "auto-dubbed" işaretli; düzenlenemez; 120 dk üstü, konuşması az veya telif talepli videolar uygun değil.
- **Çok dilli ses izi** https://support.google.com/youtube/answer/13338784 : Studio → Languages → Add Language → Dub → dosya yükle; yalnız "Advanced features" erişimi olanlar; ses "roughly the same length as the video"; yalnız masaüstü Studio, API'de anılmıyor; dile özel kapak eklenebilir. **Ekrana gömülü yazı tek dilde kalır** [TAHMİN].
- İki ayrı video/kanal: başlık, kapak, ekran yazısı, uzunluk tamamen dile özel; YPP eşikleri her kanal için ayrı işler [TAHMİN].
- [TAHMİN] Tek kanal + çok dilli ses izi "tekrarlayan içerik" riskini azaltır; ekran yazısı az tutulmalı.

### 10.10 Vergi (atıf)

- YouTube, TikTok, Instagram içerik gelirleri GVK mükerrer 20/B kapsamında (özel banka hesabı, %15 nihai stopaj, 2026 sınırı 5.300.000 TL). Ayrıntı: [../../../Rehberler/YouTube-Oyun/](../../../Rehberler/YouTube-Oyun/) arastirma.md §9.4, [../../../Rehberler/Sirket-Kurma/](../../../Rehberler/Sirket-Kurma/) (12-sirketsiz, 03-vergi-101).
- [TAHMİN] Claude, TTS, görsel/video abonelikleri gibi giderler 20/B'de **düşülmez** (stopaj brüt üzerinden). Gider yüksekse şahıs işletmesi karşılaştırması yapılmalı (Sirket-Kurma 06-karsilastirma). 20/B'de "tüm gelir yalnız bu hesaba" şartı var; farklı kanaldan gelen platform ödemesi istisnayı düşürebilir.

---

## 11. Maliyet tablosu

Tüm satırlar **[TAHMİN]**, §3–7'deki resmî birim fiyatlardan hesaplandı (15.10.2026). Revizyon payı ayrıca belirtildi.

### 11.1 Claude metin maliyeti: hesap açık

**Varsayımlar:** 12 dk ≈ 1.100–1.800 kelime; yeni tokenizer + Türkçe ile senaryo ≈ 4–6K token; 50–60 sahne.

| Adım | Giriş (token) | Çıkış (görünen + thinking) |
|---|---|---|
| Kaynak metin + stil kılavuzu (önbelleğe yazılır) | 40K yazma | — |
| Ana hat | 10K + önbellek okuma | 3K |
| Senaryo taslağı + 1 düzeltme | 20K + önbellek | 20K |
| Sahne listesi JSON | 15K + önbellek | 15K |
| Görsel arama sorguları | 10K | 6K |
| Kaynak doğrulama geçişi | 15K + önbellek | 8K |
| Altyazı düzeltme ve çeviri | 5K | 12K |
| Başlık, açıklama, etiket, bölümler (TR+EN) | 5K | 4K |
| 3 sahne revizyonu | önbellek | 12K |
| **Toplam** | **~80K önbelleksiz + 40K önbellek yazma + ~320K önbellek okuma** (önbellekli 8 çağrı × 40K: ana hat, taslak + düzeltme, sahne JSON, doğrulama, 3 revizyon) | **~80K** (medium effort varsayımı, §3.3) |

Formül: önbelleksiz giriş × giriş fiyatı + önbellek yazma × 1,25 (5 dk) ya da × 2 (1 saat) × giriş fiyatı + önbellek okuma × okuma fiyatı + çıkış × çıkış fiyatı.
Opus 5.5 açılımı (5 dk önbellek): 80K × 4 $ = 0,32 + 40K × 5 $ = 0,20 + 320K × 0,20 $ = 0,064 + 80K × 20 $ = 1,60 → **2,18 $**.
**İnsan onaylı akışta** adımların arasına onay girdiği için 5 dakikalık önbellek süresi dolar; **1 saatlik önbellek** (yazma 2x, Opus 5.5'te 8 $/MTok) varsayımıyla: 0,32 + 0,32 + 0,064 + 1,60 → **~2,30 $**. https://platform.claude.com/docs/en/about-claude/pricing , https://platform.claude.com/docs/en/build-with-claude/prompt-caching

| Model | 12 dk video (5 dk önbellek) | Batch ile (üst sınır tasarruf) | 60 sn Short (15K + 8K yazma + 15K okuma giriş, 12K çıkış) | Short, batch |
|---|---|---|---|---|
| Fable 5.1 | 5,38 $ | 2,69 $ | 0,85 $ | 0,43 $ |
| Opus 5.5 | **2,18 $** (1 saat önbellekle ~2,30 $) | 1,09 $ | 0,34 $ | 0,17 $ |
| Sonnet 5.5 | 1,09 $ | 0,55 $ | 0,17 $ | 0,09 $ |
| Haiku 5.5 | 0,06 $ | 0,03 $ | 0,01 $ | <0,01 $ |

- **Batch sütunu "üst sınır tasarruf"tur [RESMÎ + TAHMİN]:** batch fiyatı doğru (%50; Opus 5.5 için 2/10 $), ama senaryo akışı sıralıdır (ana hat → taslak → sahne JSON → doğrulama; her adım öncekinin çıktısına bağlı). Her batch adımı 1 saate kadar, en çok 24 saat sürebilir; batch'te önbellek isabeti "best-effort", %30–98 arası. Batch indirimi **bağımsız, bekleyebilen işler** için gerçekçidir: toplu metadata, arama sorguları, çeviri, gece üretimi. https://platform.claude.com/docs/en/build-with-claude/batch-processing
- **Karma kurulum** (senaryo + doğrulama Opus, sahne JSON'u Sonnet, sorgu + metadata Haiku, 10 web araması): Opus ≈ 1,33 + Sonnet ≈ 0,28 + Haiku ≈ 0,01 + arama ücreti 0,10 = ~1,7 $; **ama web aramasından dönen sonuçlar giriş token'ı olarak faturalanır** ("Web search results retrieved throughout a conversation are counted as input tokens" [RESMÎ]). 10 arama için +50–200K giriş varsayılırsa Opus'ta +0,2–0,8 $ (`web_search_20260209`+ dinamik filtrelemeyle daha az) → **~1,9–2,5 $/video** [TAHMİN, resmî birim fiyattan]. Batches API web aramalarını organizasyon başına yavaşlatır (throttle). https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool
- Araştırma ağırlıklı alternatif hesap (20 arama + ~150K giriş + ~15K çıkış): Sonnet ~0,65 $, Opus ~1,10 $ yalnız araştırma için; tüm akışla video başına kabaca 1–5 $.
- Daha yalın bir senaryo (80K giriş + 25K çıkış, önbellek yok) Opus'ta ≈ 0,8 $ (aramayla ≈ 1,5 $) çıkar. **Kullanılacak aralık: Opus ile 1–2,5 $/video.**
- **Çok turlu ajan döngüsü** (Agent SDK) maliyeti 5–20 kat artırabilir.

### 11.2 Video başı toplam (yol bazında)

| Kalem | A Elle + web | B Yarı otomatik | C Yerel | D1 Bulut render | D2 SaaS |
|---|---|---|---|---|---|
| Claude | 0 $ (abonelik) | 1–2,5 $ (Opus/karma; batch üst sınır tasarrufla 0,5–1 $) | 0–1,5 $ | 1–2,5 $ | 0 $ (aracın kendi modeli) |
| TTS | 0–1 $ | 0,2–1 $ | 0 $ | 0,2–1 $ | Abonelikte |
| Görsel/video | 0–3 $ | 0 $ (arşiv/stok) – 15 $ (az AI) | 0 $ | 0–15 $ | Abonelikte |
| Müzik | 0 $ | 0 $ | 0 $ | 0 $ | Abonelikte |
| Render | 0 $ | 0 $ (yerel) / ~0,1 $ (Lambda) | 0 $ | 2,3–15 $ | Abonelikte |
| **12 dk toplam** | **0–5 $** | **~1,2–3,5 $; AI klipli ~6–18 $** | **0–1,5 $** | **~3,5–18 $** (AI'sız) | **3–10 $** |
| **60 sn toplam** | 0–0,5 $ | 0,2–1,5 $ (AI klipli 2–5 $) | 0–0,3 $ | 0,5–2 $ | 0,5–2 $ |
| Revizyon payı | Zaman | TTS ×1,3–2, sahne render 0 $ | Zaman | Her render ücretli | Kredi |

- Toplamlar kalemlerin toplamıdır: B = Claude 1–2,5 + TTS 0,2–1 + görsel 0 + render 0–0,1 ≈ 1,2–3,5 $; AI klipli görsel 5–15 $ ile ≈ 6–18 $. D1 = Claude 1–2,5 + TTS 0,2–1 + render 2,3–15 ≈ 3,5–18 $ (render aralığı Lambda dışındaki bulut render fiyatlarından, §7.7).

### 11.3 Aylık senaryolar

**Yalnız Claude (Opus, batch yok, uzun ≈ 2,25 $, Short ≈ 0,35 $):**

| Hacim | Aylık Claude API |
|---|---|
| Az: 4 uzun + 12 Short | ~13 $ |
| Orta: 8 uzun + 30 Short | ~29 $ |
| Yoğun: 30 uzun + 90 Short | ~99 $ |

**Toplam aylık (B yolu, orta hacim 8 uzun + 30 Short):**

| Bütçe seviyesi | Claude | TTS | Görsel/video | Müzik | Render | **Toplam/ay** |
|---|---|---|---|---|---|---|
| Bütçe yok (A/C ağırlıklı) | 0 $ (Free/Pro aboneliği hariç) | 0 $ (ücretsiz katman/yerel) | 0 $ | 0 $ | 0 $ | **0 $ + mevcut abonelik** |
| Az | ~15–30 $ (kullandıkça) | 0–22 $ (Google/Azure ücretsiz katmanı ya da ElevenLabs Creator) | ~10–40 $ (az AI görsel + birkaç Veo Lite klip) | 0 $ | 0 $ | **~25–90 $** (+ Pro 20 $ isteğe bağlı) |
| Orta | Max 5x/20x kredisinden (abonelik 100/200 $) | 22–99 $ (ElevenLabs Creator/Pro) | ~100–400 $ (video başı 35–110 $ AI'nın bir kısmı) | 0–18 $ (Epidemic) | 0 $ | **~120–520 $ + Max aboneliği** |

Sonuçlar:
- **Claude metin maliyeti sistemin küçük kalemidir.** Asıl değişken AI video ve (ElevenLabs gibi) premium TTS'tir.
- 200 $ kredi tam Opus kullanımda ~85–90 uzun videoya, karma kurulumda yüzün üstüne yeter.
- Başabaş [TAHMİN, resmî fiyatlardan; §3.1 tablosu]: aylık API harcaması <80 $ → Pro + kullandıkça öde; 80–180 $ → Max 5x; >180 $ → Max 20x ya da Max 5x + satın alınmış kredi. Az/orta hacim (~13–29 $) için Max pahalıdır; **"yoğun" senaryo (~99 $) için Max 5x zaten daha ucuzdur**. Kullanılmayan kredi her dönem yanar; harcama dalgalıysa avantaj azalır.
- Max kredisi görsel/video/TTS'e harcanamaz; bunlar için ayrı bütçe gerekir.
- **Gelir tarafı (dikey kol):** Shorts reklam geliri payı için son 90 günde 10M nitelikli Shorts görüntülemesi gerekir; küçük kanalda Shorts geliri pratikte sıfırdır [RESMÎ] https://support.google.com/youtube/answer/72851 . Shorts bu sistemde başlangıçta erişim/keşif aracıdır.

---

## 12. Hukuk, telif ve etik

> Hukuki danışmanlık değildir. Belirsiz noktalarda uzmana danışılmalıdır.

### 12.1 Arşiv lisansları (özet)

| Durum | Sonuç |
|---|---|
| ABD federal eser (NARA, NASA, CIA, AARO) | ABD'de kamu malı; atıf; logo/mühür/amblem kullanılmaz, onay ima edilmez; NASA amblemi AI görselle birlikte kullanılmaz; bağışlanmış/üçüncü taraf materyal ve kişilik hakkı istisna [RESMÎ]. Başka ülkede statüsü teyit edilmedi [TAHMİN] |
| İngiliz Ulusal Arşivleri belge görüntüsü | Yayın reprodüksiyon ücretine tabi; metin çevriyazısı OGL ile serbest [RESMÎ] |
| T.C. Devlet Arşivleri belge örneği | "Çoğaltıp ticari amaçla kullanamazlar" (md. 12/2); para kazanan kanal için yazılı izin [RESMÎ metin + TAHMİN]. Belgenin içeriğini anlatmak ve kısa alıntı serbest |
| Wikimedia Commons | Dosya bazında; PD/CC0/CC BY tercih; CC BY-SA'nın tüm videoya ShareAlike taşıyıp taşımadığı belirsiz [ÇELİŞKİLİ] → kaçın; GFDL videoda pratik değil |
| LoC | "No known restrictions" / PD serbest; LoC izin vermez [RESMÎ] |
| Prelinger | Filmin CC lisansı; meta veri ticari kullanılamaz [RESMÎ] |
| Stok (Pexels, Pixabay, Coverr, Envato) | Platform lisansı; Pexels API atfı; Pixabay önbellek/toplu indirme kuralları; Envato proje başına lisans |

### 12.2 AI içerik ve telif

- Claude çıktısı: API/Team'de müşteriye ait + belirli IP savunma taahhüdü; Free/Pro/Max'te haklar devredilir, eğitim kullanımı ayardan kapatılabilir [RESMÎ] (§3.6).
- Gemini görsel/video: Google mülkiyet talep etmez, benzer çıktıyı başkasına da üretebilir; ücretsiz katman verisi ürün geliştirmede kullanılır [RESMÎ].
- Suno: indirilen parçanın hakları devredilir ama "telif oluşacağı garanti değil"; AI müzik davaları sürüyor [RESMÎ + 3. TARAF].
- AI çıktısının telif koruması (ABD Telif Ofisi, FSEK): [../../../Rehberler/YouTube-Oyun/](../../../Rehberler/YouTube-Oyun/) arastirma.md §10.6–10.8.
- Lisans kontrolü gereken modeller: XTTS-v2, Piper-tr, MMS-TTS (NC → para kazanan kanalda yasak); FLUX.2 [dev]/klein 9B ticari değil; SDXL-Turbo ayrı lisans; HunyuanVideo bölge kısıtı + lisans gereği video içinde AI üretimi olduğunun açıkça belirtilmesi ve çıktıyla başka model eğitilmemesi [RESMÎ]; LTX geliri 10M $ üstü şirkete ücretli; Chatterbox çıktısı filigranlı.

### 12.3 Ses klonu ve kişilik hakkı

- **Başkasının sesi kullanılmaz** (ünlü, tarihî kişi, sanatçı, tanıdık). Sağlayıcı kuralları: ElevenLabs PVC yalnız kendi sesin, ünlü sesleri engelli; OpenAI özel ses için rıza kaydı; Trendyol-TTS izinsiz klonlamayı yasaklar [RESMÎ].
- **Türkiye:** ses tınısı KVKK Kurulu kararına göre davranışsal biyometrik veri; biyometrik veri KVKK m.6'da özel nitelikli kişisel veri [3. TARAF] https://www.alomaliye.com/2026/06/02/mesai-takibinde-biyometrik-veri-islenmesine-yeni-ilke-karari-kvkk/ . İzinsiz ses taklidi TMK m.24–25 (kişilik hakkı) kapsamında dava konusu olabilir [TAHMİN; AI ses klonlamaya özel Türk içtihadı bulunamadı].
- **AB:** AI Act m.50/4 deepfake etiketleme yükümlülüğü 02.08.2026'da yürürlüğe girdi, Digital Omnibus ile ertelenmedi [3. TARAF] https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-article-50-transparency-20260729/ . [TAHMİN] Gerçek kişiye benzeyen sentetik ses/görüntü AB'deki izleyiciye etiketlenmeli.
- Gerçek tarihî kişiye AI ile söylemediği sözü söyletmek: beyan + kişilik hakkı riski; alıntılar "anlatıcı okur" biçiminde.
- Tanınabilir kişi içeren stok/arşiv görüntüsü küçük düşürücü ya da onay ima eden biçimde kullanılmaz (Pexels, NASA kuralları).

### 12.4 Etik ve doğruluk

- Gerçek ile canlandırmayı ayır: ekranda "Canlandırma / AI" etiketi; AI görseli "arşiv" diye sunma.
- Resmî konumu doğru aktar; gizem içeriğinde "ne biliyoruz / ne bilmiyoruz" bölümü zorunlu.
- Gerçek trajedileri "olmadı / örtbas" diye sunma (hem etik hem reklam uygunluğu). Dayanak: YouTube nefret söylemi politikası iyi belgelenmiş büyük şiddet olaylarının inkârını/küçültülmesini kaldırır; bağlam video içinde verilmeli (§10.3) [RESMÎ].
- Yayın sonrası hata bildiriminde açıklamaya "Düzeltme:" notu ve sahne bazlı düzeltme.
- Depo kuralı: proje dosyalarında kişisel veri yok; `.env` ve API anahtarları git'e girmez; arşiv belgelerindeki özel nitelikli kişisel veri (ad, sağlık vb.) videoya taşınmaz.

---

## 13. Riskler

| Risk | Olasılık / etki | Azaltma |
|---|---|---|
| YPP "inauthentic / reused content" nedeniyle kanal genelinde para kazanma kaybı | Tam otomatikte yüksek / çok yüksek | Yarı otomatik; özgün yorum; sahne çeşitliliği; kanıt dosyası; seri üretimden kaçın |
| Spam politikası (Topluluk Kuralları): AI ile tekrarlayan seri üretim, yanıltıcı başlık/kapak → içerik kaldırma, ihtar, 90 günde 3 ihtarla kanal kapatma | Şablon/müzik tekrarında her yolda orta–yüksek / çok yüksek | Müzik havuzu, değişen görsel stil, sahne türü çeşitliliği, içerikle tutarlı kapak/başlık (§10.2b) |
| İyi belgelenmiş şiddet olayının inkârı/küçültülmesi (nefret söylemi politikası) | Düşük–orta / çok yüksek (kaldırma) | Resmî konumu aktar; bağlamı video içinde ver (§10.3) |
| Uydurma olgu, alıntı, tarih (halüsinasyon) | Orta / yüksek (itibar, misinformation) | İddia tablosu, birebir alıntı kodu denetimi, 2 insan kapısı; küçük yerel LLM'e olgu üretimi verilmez |
| Gerçekçi AI canlandırmanın beyan edilmemesi | Orta / yüksek (kaldırma, YPP'den çıkarma) | `ai_uretimi`+`gercekci` alanlarından otomatik beyan; ekranda etiket |
| Yanlış görsel (başka olay, hoax UFO fotoğrafı) | Orta / yüksek | Asset manifest; insan kapısı #2; kaynak doğrulama |
| Telif / lisans ihlali, hatalı Content ID talebi | Orta / orta | PD/CC0/CC BY önceliği; lisans kaydı; >60 sn Short'ta lisanslı içerik yok; itiraz kanıtı |
| Arşiv kullanım şartı (UK, TR Devlet Arşivleri) | Orta / orta | Metin ile görüntüyü ayır; izin al ya da çevriyazı/anlatım kullan |
| Reklam uygunluğu düşüşü (savaş, şiddet, komplo dili) | Orta / orta | `grafik` alanı; kapak ve ilk saniyelerde grafik yok; sorgulayan ton |
| TikTok FYF dışı kalma ("gizli güç" anlatısı) | Orta / orta | Belgeye dayalı ton; TikTok'u erişim kanalı olarak düşün |
| Servis kapanması / fiyat değişikliği (Sora, Imagen 4, Gemini 2.5 Flash Image kapandı; Gemini 3.8 TTS 2027'de iki kat) | Yüksek / orta | Sağlayıcı soyutlaması (TTS, görsel adaptörleri); fiyatları her çeyrek kontrol |
| Veo videolarının 2 gün sonra silinmesi, Shotstack 24 saat | Orta / düşük | Üretimden hemen sonra indir |
| Abonelik girişini otomasyonda kullanmak (şart ihlali) | Düşük–orta / yüksek (hesap) | Otomasyon yalnız API anahtarıyla |
| Max kredisinin devretmemesi; Start tier aylık 500 $ harcama tavanı (hız limiti bu ölçekte darboğaz değil) | Orta / düşük | Başabaş tablosuna göre plan seç (§3.1); workspace harcama limiti; gerekirse satın alınmış kredi |
| Preview modellerin (Veo 3.1, Omni Flash) habersiz değişmesi | Orta / orta | Yedek model, sürüm sabitleme |
| YouTube API refresh token 7 günde bitmesi; private kilidi belirsizliği | Orta / orta | Production'a geçiş (doğrulanmamış uygulama uyarısı, 100 kullanıcı sınırı); unlisted deneme yüklemesi |
| Yerel model lisansı (NC) ve filigran | Orta / orta | Lisans tablosu; NC modelleri para kazanan kanalda kullanma |
| Türkçe TTS telaffuz hataları (özel isim, sayı) | Yüksek / orta | Telaffuz sözlüğü, sayıları yazıya çevirme, kör dinleme testi |
| Render süresi / disk (CPU'da saatler, proje başına 5–15 GB) | Orta / düşük | Sahne önbelleği, gece render, SSD, Lambda |
| Ses klonu ve kişilik hakkı | Düşük (kurala uyulursa) / yüksek | Yalnız kendi ses ya da lisanslı hazır ses |
| Tahminlerin gerçekten sapması (süre, maliyet) | Yüksek / düşük | İlk videodan sonra ölç, belgeyi güncelle |

### Açık kalan / doğrulanamayan noktalar

- Max API kredisinin kesin başlangıç tarihi; Max 20x'in Build tier'a çıkıp çıkmadığı; API anahtarlı `claude -p`'nin krediden düşüp düşmediği (docs ile destek makalesi çelişiyor); tek kişinin 2 Team koltuğu almasının uygunluğu.
- ElevenLabs Eleven v4'ün karakter başı API fiyatı; Nano Banana 2 Lite fiyatı; OpenAI TTS girdi sınırı; WhisperX Türkçe hizalama modelinin lisansı; Google tr-TR ses sayıları (list-voices sayfasından teyit).
- Claude Motion'ın süre, çözünürlük, 9:16, ses ve ticari kullanım bilgisi.
- Türkçe metnin token oranı ve Türkçe seslendirme kelime/dk değeri (ölçülmeli).
- ElevenLabs abonelik ile API sayfası arasındaki dahil karakter farkı; Epidemic Sound resmî fiyatı; Udio şartları; Azure Multilingual seslerin Türkçesi.
- Kling, Midjourney, Storyblocks, FLUX resmî fiyatları; Pika kredi tüketimi; LTX-2.5 VRAM; NASA API hız sınırı; Videvo/Freepik lisansı.
- DaVinci ücretsiz sürümde dış betik sınırı; Premiere ExtendScript'in Eylül 2026 sonrası; Creatomate güncel fiyatı; Remotion Automators'ta sahne başına render sayımı.
- YouTube API'de doğrulanmamış projede private kilidi; Temmuz 2026 YPP değişikliğinin kesin tarihi; "borderline" öneri azaltma metni; spam politikasındaki seri üretim maddesinin eklenme tarihi; 01.02.2027 sonrası abone eşiği.
- NARA RG 615 belgelerinin yeniden yayım şartının resmî dayanağı; NASA'nın "according to NASA" yasağının AI ile yazılmış senaryoya uygulanıp uygulanmadığı.
- TikTok Creator Rewards'ın Türkiye durumu; Instagram 100/50 limiti; Meta'nın Türkiye para kazanma imkânları.
- AARO Cilt 2; aaro.mil yeniden kullanım metni; UK reprodüksiyon ücreti; Devlet Arşivleri izin usulü; CC BY-SA'nın videoya etkisi.
- Türk hukukunda AI ses klonlamaya özel içtihat.
- InVideo ve Fliki Türkçe ses desteği; HeyGen/InVideo ücretli plan ticari hak metni.

---

## 14. Kaynakça

### Claude / Anthropic [RESMÎ]
- https://platform.claude.com/docs/en/about-claude/api-credits-for-subscribers
- https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-and-team-plans
- https://support.claude.com/en/articles/11049741-what-is-the-max-plan (Max 5x 100 $, Max 20x 200 $; mobil fiyatlar farklı olabilir)
- https://www.anthropic.com/legal/credit-terms
- https://platform.claude.com/docs/en/api/rate-limits
- https://claude.com/pricing
- https://platform.claude.com/docs/en/about-claude/pricing
- https://platform.claude.com/docs/en/about-claude/models/overview
- https://platform.claude.com/docs/en/build-with-claude/batch-processing
- https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- https://platform.claude.com/docs/en/build-with-claude/structured-outputs
- https://platform.claude.com/docs/en/build-with-claude/thinking
- https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool
- https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- https://platform.claude.com/docs/en/cli-sdks-libraries/overview
- https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/csharp
- https://code.claude.com/docs/en/legal-and-compliance
- https://code.claude.com/docs/en/agent-sdk/overview
- https://code.claude.com/docs/en/claude-code-on-the-web
- https://code.claude.com/docs/en/cloud-environments
- https://support.claude.com/en/articles/8241126-upload-files-to-claude
- https://support.claude.com/en/articles/11088861-using-research-on-claude
- https://support.claude.com/en/articles/17454997-get-started-with-claude-motion
- https://www.anthropic.com/legal/commercial-terms
- https://www.anthropic.com/legal/consumer-terms

### TTS, müzik, altyazı
- [RESMÎ] https://elevenlabs.io/pricing · https://elevenlabs.io/pricing/api · https://elevenlabs.io/docs/overview/models · https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps · https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform · https://elevenlabs.io/docs/help-center/product/voice-customization/voice-cloning/can-i-create-a-professional-voice-clone-of-someone-elses-voice
- [RESMÎ] https://developers.openai.com/api/docs/pricing · https://developers.openai.com/api/docs/models/gpt-4o-mini-tts · https://developers.openai.com/api/docs/guides/text-to-speech
- [RESMÎ] https://cloud.google.com/text-to-speech/pricing?hl=en · https://docs.cloud.google.com/text-to-speech/docs/list-voices-and-types · https://docs.cloud.google.com/text-to-speech/docs/gemini-tts · https://ai.google.dev/gemini-api/docs/pricing · https://ai.google.dev/gemini-api/docs/models
- [RESMÎ] https://prices.azure.com/api/retail/prices · https://azure.microsoft.com/en-us/pricing/details/speech/ · https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts
- [RESMÎ] https://docs.aws.amazon.com/polly/latest/dg/available-voices.html · https://aws.amazon.com/polly/pricing/
- [RESMÎ] https://github.com/resemble-ai/chatterbox · https://github.com/OpenBMB/VoxCPM · https://huggingface.co/Trendyol/Trendyol-TTS · https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md · https://huggingface.co/coqui/XTTS-v2/blob/main/LICENSE.txt · https://huggingface.co/rhasspy/piper-voices/tree/main/tr/tr_TR · https://github.com/OHF-Voice/piper1-gpl · https://huggingface.co/facebook/mms-tts-tur · https://huggingface.co/kaanhgunay/pocket-tts-tr
- [3. TARAF] https://tts.ai/voices/freya-tts/ · https://vantaige.io/ai-tool/coqui-tts · https://costbench.com/software/ai-voice-tools/google-cloud-text-to-speech/
- [RESMÎ] https://support.google.com/youtube/answer/3376882 · https://pixabay.com/service/license-summary/ · https://pixabay.com/blog/posts/how-to-clear-a-youtube-content-id-claim-with-a-pix-190/ · https://freesound.org/help/faq/ · https://www.epidemicsound.com/pricing/ · https://suno.com/terms · https://suno.com/pricing
- [3. TARAF] https://photutorial.com/epidemic-sound-pricing · https://www.musicbusinessworldwide.com/universal-music-settles-udio-lawsuit-strikes-deal-for-licensed-ai-music-platform · https://decrypt.co/349360/warner-music-moves-from-litigation-to-licensing-with-udio · https://dynamoi.com/learn/statistics/ai-music-copyright-cases-timeline
- [RESMÎ] https://github.com/ggml-org/whisper.cpp · https://github.com/m-bain/whisperX · https://raw.githubusercontent.com/m-bain/whisperX/main/whisperx/alignment.py

### Konuşma hızı
- [3. TARAF] https://rows.com/calculators/video-script-calculator · https://wiki.proz.com/forum/voiceover/194447-voiceover_output_per_hour.html · https://change-your-narrative.beehiiv.com/p/voice-over-script-timer-calculator · https://www.webtekno.com/en-hizli-dil-hangisi-h147332.html · https://acikerisim.btu.edu.tr/items/218e08f0-90d6-4482-ba9a-026fdbcebf34 · https://openaccess.mku.edu.tr/items/3861a095-b882-4eb1-a91b-ce4a4562f702
- [RESMÎ makale] https://pmc.ncbi.nlm.nih.gov/articles/PMC6984970/

### Görsel ve video
- [RESMÎ] https://www.pexels.com/api/documentation/ · https://www.pexels.com/license/ · https://pixabay.com/api/docs/ · https://coverr.co/license · https://elements.envato.com/pricing
- [3. TARAF] https://pricingsaas.com/companies/storyblocks · https://frontdeskreview.com/software/stock-media/storyblocks/
- [RESMÎ] https://ai.google.dev/gemini-api/docs/models · https://ai.google.dev/gemini-api/docs/veo · https://ai.google.dev/gemini-api/terms · https://developers.openai.com/api/docs/guides/image-generation · https://developers.openai.com/api/docs/models/sora-2 · https://docs.bfl.ai/quick_start/pricing · https://runway.com/pricing · https://lumalabs.ai/pricing · https://pika.art/pricing
- [3. TARAF] https://www.eesel.ai/blog/midjourney-pricing · https://www.terms.law/2026/01/15/midjourney-commercial-use-rights-complete-2026-guide/index.html · https://engadget.com/ai/openai-is-shutting-down-its-sora-video-generation-app-211023358.html · https://www.atlascloud.ai/blog/guides/kling-ai-api-pricing · https://unifically.com/models/kling · https://evolink.ai/blog/kling-3-api-pricing-integration-guide
- [RESMÎ] https://huggingface.co/Tongyi-MAI/Z-Image-Turbo · https://huggingface.co/black-forest-labs/FLUX.2-klein-4B · https://github.com/Wan-Video/Wan2.2 · https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5 · https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5/blob/main/LICENSE · https://github.com/Lightricks/LTX-2 · https://ltx.io/model/license
- [RESMÎ] https://www.remotion.dev/docs/animating-properties · https://www.remotion.dev/docs/maps
- [3. TARAF] https://trac.ffmpeg.org/ticket/4298 · https://www.bannerbear.com/blog/how-to-do-a-ken-burns-style-effect-with-ffmpeg

### Arşivler
- [RESMÎ] https://www.archives.gov/research/topics/uaps · https://www.archives.gov/research/topics/uaps/rg-615 · https://www.archives.gov/research/military/air-force/ufos · https://www.archives.gov/research/still-pictures/permissions · https://www.archives.gov/faqs · https://www.archives.gov/global-pages/privacy.html
- [RESMÎ] https://www.aaro.mil/Congressional-Press-Products/ · https://www.aaro.mil/Portals/136/PDFs/AARO_Historical_Record_Report_Vol_1_2024.pdf · https://www.war.gov/News/News-Stories/Article/Article/3701297/dod-report-discounts-sightings-of-extraterrestrial-technology/ · https://www.war.gov/News/Transcripts/Transcript/Article/3965734/dr-jon-kosloski-director-aaro-media-roundtable-on-the-fy24-consolidated-annual/
- [RESMÎ] https://science.nasa.gov/uap/ · https://science.nasa.gov/wp-content/uploads/2023/09/uap-independent-study-team-final-report.pdf · https://www.nasa.gov/nasa-brand-center/images-and-media/
- [RESMÎ] https://www.cia.gov/readingroom/ · https://www.cia.gov/readingroom/collection/ufos-fact-or-fiction · https://www.cia.gov/site-policies/
- [RESMÎ] https://www.nationalarchives.gov.uk/terms-and-conditions/copyright/ · https://discovery.nationalarchives.gov.uk/details/r/C13442641 · https://images.nationalarchives.gov.uk/prices/
- [RESMÎ] https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia · https://commons.wikimedia.org/wiki/Commons:Credit_line · https://www.loc.gov/legal/understanding-copyright/ · https://www.loc.gov/free-to-use/ · https://help.archive.org/help/rights/ · https://help.archive.org/help/prelinger-archive/
- [RESMÎ metin, aktarım] https://www.lexpera.com.tr/mevzuat/yonetmelikler/arsivlerden-yararlanma-usul-ve-esaslari-hakkinda-yonetmelik-4 (resmî kaynak: https://www.mevzuat.gov.tr , RG 02.10.2021/31616)
- [3. TARAF] https://hm05uap.substack.com/i/182921977/nara · https://theblackvault.com/documentarchive/aaro-releases-fy2025-uap-report-months-after-statutory-deadline-citing-319-new-cases-and-expanded-satellite-analysis · https://www.theblackvault.com/documentarchive/united-kingdom-ufo-documents/ · https://drdavidclarke.co.uk/2013/06/20/the-end-of-the-ufo-files/ · https://creativecommons.org/2020/02/27/smithsonian-releases-2-8-million-images-data-into-the-public-domain-using-cc0/ · https://en.wikipedia.org/wiki/Prelinger_Archives · https://eksisozluk.com/entry/120586807

### Montaj ve render
- [RESMÎ] https://www.remotion.pro/license · https://www.remotion.dev/docs/lambda/cost-example · https://www.remotion.dev/docs/performance · https://www.remotion.dev/docs/encoding · https://remotion.dev/docs/cli/render · https://www.remotion.dev/docs/renderer/render-still · https://www.remotion.dev/docs/options/for-seamless-aac-concatenation · https://www.remotion.dev/docs/renderer/combine-chunks · https://www.remotion.dev/docs/captions/create-tiktok-style-captions
- [RESMÎ] https://shotstack.io/pricing/ · https://creatomate.com/docs/account/how-does-the-pricing-work · https://creatomate.com/docs/account-billing/credit-calculation · https://json2video.com/pricing/ · https://json2video.com/docs/v2/getting-started/core-concepts
- [RESMÎ] https://www.blackmagicdesign.com/products/davinciresolve · https://www.blackmagicdesign.com/products/davinciresolve/studio · https://www.capcut.com/help/use-and-export-templates-in-capcut · https://www.descript.com/pricing · https://help.descript.com/hc/en-us/articles/45008080343053 · https://www.adobe.com/products/premiere/plans.html · https://developer.adobe.com/premiere-pro/uxp/
- [RESMÎ] https://github.com/AcademySoftwareFoundation/OpenTimelineIO · https://pypi.org/project/moviepy/ · https://ffmpeg.org/ffmpeg-filters.html#subtitles-1 · https://ffmpeg.org/ffmpeg-formats.html#concat · https://developers.google.com/edge/mediapipe/solutions/guide · https://github.com/ClipsAI/clipsai · https://www.nuget.org/packages/FFMpegCore
- [3. TARAF] https://gist.github.com/Manouchehri/e32461dccd824167bac8358bb21c8040 · https://wiki.archlinux.org/title/DaVinci_Resolve · https://www.pugetsystems.com/labs/articles/pugetbench-for-davinci-resolve-1523/ · https://github.com/sun-guannan/VectCutAPI · https://feedback.descript.com/feature-requests/p/transcription-support-for-additional-languages-and-non-latin-scripts · https://ppro-scripting.docsforadobe.dev/ · https://www.castmagic.io/blog/opus-clip-pricing · https://hub.docker.com/r/jojje/ffmpeg-cloud-bench

### Hazır SaaS
- [RESMÎ] https://invideo.io/pricing · https://help.invideo.io/en/articles/9974482-can-ai-generated-videos-be-monetised · https://help.invideo.io/en/articles/11389142-am-i-allowed-to-monetise-youtube-videos-that-feature-invideo-s-avatars · https://pictory.ai/pricing · https://kb.pictory.ai/en/articles/8679976-what-languages-are-available-for-voiceover · https://www.heygen.com/pricing · https://fliki.ai/pricing
- [3. TARAF] https://costbench.com/software/video-editing/fliki/

### YouTube ve platformlar
- [RESMÎ] https://support.google.com/youtube/answer/1311392 (inauthentic/reused) · https://support.google.com/youtube/answer/2801973 (spam, seri üretim, yanıltıcı başlık/kapak) · https://support.google.com/youtube/answer/2801939 (nefret söylemi, şiddet olayı inkârı) · https://support.google.com/youtube/answer/72851 (YPP, Shorts 10M/90 gün) · https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/ (01.02.2027 eşikleri) · https://support.google.com/youtube/answer/14328491 (AI beyanı) · https://support.google.com/youtube/answer/12779649 (Shorts 3 dk) · https://support.google.com/youtube/answer/10059070 · https://support.google.com/youtube/answer/15424877 (Shorts + Content ID) · https://support.google.com/youtube/answer/13338784 (çok dilli ses) · https://support.google.com/youtube/answer/15569972 (otomatik dublaj) · https://support.google.com/youtube/answer/72431 (kapak) · https://support.google.com/youtube/answer/13861714 (Test & Compare) · https://support.google.com/youtube/answer/10834785 (misinformation) · https://support.google.com/youtube/answer/6162278 (reklam veren dostu) · https://support.google.com/youtube/answer/2802008 · https://support.google.com/youtube/answer/2802167 (yaş sınırı) · https://support.google.com/youtube/answer/2605065 (Content ID uygunluğu)
- [RESMÎ] https://developers.google.com/youtube/v3/docs/videos · https://developers.google.com/youtube/v3/docs/videos/insert · https://developers.google.com/youtube/v3/determine_quota_cost · https://developers.google.com/youtube/v3/revision_history · https://developers.google.com/youtube/terms/developer-policies · https://developers.google.com/youtube/v3/docs/thumbnails/set · https://developers.google.com/identity/protocols/oauth2 · https://support.google.com/cloud/answer/7454865
- [RESMÎ] https://www.tiktok.com/community-guidelines/en/integrity-authenticity · https://developers.tiktok.com/doc/content-posting-api-reference-direct-post · https://developers.tiktok.com/doc/content-sharing-guidelines · https://developers.tiktok.com/doc/content-posting-api-reference-upload-video
- [RESMÎ] https://developers.facebook.com/docs/instagram-platform/content-publishing · https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/media · https://about.fb.com/news/2024/04/metas-approach-to-labeling-ai-generated-content-and-manipulated-media/ · https://help.instagram.com/761121959519495
- [3. TARAF] https://gulfnews.com/technology/youtube-updates-monetisation-policies-ai-and-repetitive-content-ban-begins-july-15-1.500192660 · https://www.thedesk.net/2026/07/youtube-clamps-down-low-quality-ai-slop/ · https://www.androidheadlines.com/2026/07/youtube-monetization-rules-ai-slop-inauthentic-content.html · https://air.io/en/monetization/youtube-monetization-policy-changes-2026-a-complete-dated-timeline · https://www.ayrshare.com/solutions/google-api-error-403-unverified-app-how-to-fix-the-audit-pipeline/ · https://techcrunch.com/2025/08/15/tiktoks-new-guidelines-add-subtle-changes-for-live-creators-ai-content-and-more/ · https://techcrunch.com/2025/07/14/following-youtube-meta-announces-crackdown-on-unoriginal-facebook-content · https://ttcalculator.net/data/reference/creator-fund-countries/ · https://webrazzi.com/2024/03/13/tiktok-un-effect-creator-rewards-fonu-turkiye-deki-ar-efekti-ureticilerini-desteklemeye-basladi/ · https://buffer.com/resources/instagram-reels-length · https://wearesculpt.com/blog/reel-length/

### Hukuk
- [3. TARAF] https://www.alomaliye.com/2026/06/02/mesai-takibinde-biyometrik-veri-islenmesine-yeni-ilke-karari-kvkk/ · https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-article-50-transparency-20260729/

### Claude connector'ları (3. taraf)
- [3. TARAF] https://www.techloy.com/claude-ai-now-integrates-with-canva-for-enhanced-design/ · https://composio.dev/blog/canva-mcp-connect-ai-assistants-to-your-canva-designs · https://www.smartworld.it/news/claude-dashboards-claude-motion-cosa-sono-come-usarli.html

### Depo içi
- [../kodla-video/](../kodla-video/) — Remotion, yerel LLM/TTS/görsel/altyazı, Zod şemalı sahne JSON'u, uydurma denetimi
- [../goruntu-netlestirme/](../goruntu-netlestirme/) — arşiv görsellerini büyütme
- [../../../Rehberler/YouTube-Oyun/](../../../Rehberler/YouTube-Oyun/) — YPP, AdSense, 20/B, reused content, AI çıktısı telifi
- [../../../Rehberler/Sirket-Kurma/](../../../Rehberler/Sirket-Kurma/) — 20/B ayrıntısı, şirket türleri karşılaştırması
