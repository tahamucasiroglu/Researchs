# Yerel, çok dilli metinden sese (TTS) modelleri — Kasım 2026

**Tarih:** 7 Kasım 2026 · **Kapsam:** Bilgisayarda çalışan (yerel) TTS modelleri; Türkçesi iyi olanlar ve genel dillerde
(İngilizce, Almanca, İspanyolca, Fransızca…) iyi olanlar. Çıktının ticari kanallarda (para kazanan YouTube vb.) yayınlanacak
videolarda kullanılması durumu için **ağırlık lisansı** ayrıca denetlendi. Örnek hedef donanım (değerlendirmede esas alınan
sınıf): ~6 GB ekran kartı, 16 GB RAM, Windows; tercihen Python'suz (ONNX Runtime / sherpa-onnx / ggml) çalışma. Farklı
donanım için §2 tablosundaki "Donanım / hız" ve "Çalışma yolu" sütunlarına bakılır.

**Yöntem:** Yalnız web okuma (model kartları, lisans dosyaları, makaleler, sürüm notları, GitHub API). Hiçbir model indirilmedi,
dinlenmedi. Doğrulanamayan her şey **[doğrulanmadı]** diye işaretli. Lisans özetleri hukuki görüş değildir.

---

## 1. Kısa sonuç

| İhtiyaç | En iyi aday | Neden | Çalışma yolu |
|---|---|---|---|
| Türkçe, hafif, işlemcide, hazır ses | **Supertonic 3** | Resmî 31 dil arasında Türkçe; Minimax-MLS'te TR WER 1,00 | sherpa-onnx (hazır) |
| Türkçe + klon, temiz lisans, en yüksek kalite | **VoxCPM2** (2B, Apache-2.0) | TR WER 0,82 / SIM 87,1 (MiniMax-MLS; kendi raporu) | PyTorch ya da GGUF + llama.cpp-omni (C++) |
| Türkçe + klon, MIT | **Chatterbox Multilingual V3** (0,5B) | 23 dilde Türkçe; MIT; topluluk ONNX'leri var | PyTorch ya da ONNX Runtime (kendi döngün) |
| İngilizce, hafif | **Kokoro 82M** (Apache-2.0) | 28 İngilizce ses, af_heart "A" notlu | sherpa-onnx (hazır) |
| Almanca, hafif, CC0 | Supertonic 3 (DE WER 0,86) ya da Piper `de_DE-thorsten` (veri CC0) | | sherpa-onnx (Piper için dışarıdan fonem gerekir, §3.1) |
| EN/FR/DE/ES/PT/IT + klon, işlemcide | **Pocket TTS** (Kyutai, ~100M, CC-BY-4.0) | 2 çekirdekte gerçek zamanın ~6 katı | sherpa-onnx (yalnız İngilizce paket) |

**Elenenler (ticari kullanıma kapalı ağırlık):** XTTS-v2 (CPML), F5-TTS ve türevleri, Fish-Speech / Fish Audio S2
(Research License), OmniVoice (CC-BY-NC), MMS-TTS (CC-BY-NC 4.0), Voxtral TTS (CC BY-NC 4.0), Higgs TTS 3 (araştırma/
ticari olmayan; yalnız "Creator Use Grant" istisnası, §4), Piper `tr_TR-dfki` (eğitim verisi CC BY-NC-SA).
Eleme ölçütü ticari yayındır; ticari olmayan kullanım düşünülüyorsa her modelin lisans koşulu ayrıca okunmalıdır.

**Türkçe yok:** Kokoro, Kitten (eski ONNX'ler), MeloTTS, CosyVoice 3, Qwen3-TTS, IndexTTS2, Orpheus çok dilli, VibeVoice,
Pocket TTS (resmî), ZipVoice, Voxtral.

---

## 2. Karşılaştırma tablosu

Kısaltmalar: **TR** Türkçe desteği · **Klon** sıfır atışlı ses klonlama · **Ağırlık** model ağırlık lisansı ·
**sherpa** sherpa-onnx 2.x ile doğrudan çalışır mı.

| Model | TR | Diğer diller | Klon | Kod / Ağırlık lisansı | Boyut | Donanım / hız | Çalışma yolu | Hazır ses |
|---|---|---|---|---|---|---|---|---|
| Supertonic 3 | ✅ (WER 1,00) | 31 dil | ❌ (Voice Builder ücretli, 31 Ağu 2026'da kapandı) | MIT / **OpenRAIL-M** | ~99M; int8 paket 129 MB | İşlemci | **sherpa** (`supertonic`) | 10 (sid 0–9) |
| VoxCPM2 | ✅ (WER 0,82) | 30 dil + 9 Çince lehçe | ✅ (+ metinden ses tasarımı) | Apache-2.0 / Apache-2.0 | 2B; GGUF Q8 BaseLM 1,6 GB + Acoustic 1,7 GB | PyTorch ~8 GB VRAM, RTF 0,30 (4090) | PyTorch · GGUF + llama.cpp-omni | Yok (tasarım/klon) |
| Chatterbox Multilingual V3 | ✅ [kalite ölçümü bulunamadı] | 23 dil | ✅ | MIT / MIT | 0,5B; ONNX fp32 ~3,6 GB, LM q4 354 MB | ~5 GB VRAM (PyTorch) | PyTorch · ONNX Runtime (topluluk) | 1 varsayılan referans |
| Kokoro 82M v1.0 | ❌ | EN (US/UK), JA, ZH, ES, FR, HI, IT, PT-BR | ❌ | Apache-2.0 / Apache-2.0 | int8 132 MB | İşlemci | **sherpa** (`kokoro`) | 54 (EN 28) |
| Pocket TTS | ❌ (topluluk TR ince ayarı var) | EN, FR, DE, PT, IT, ES | ✅ | MIT / CC-BY-4.0 (HF kapılı) | ~100M; int8 98 MB | İşlemci, 2 çekirdekte ~6× gerçek zaman | **sherpa** (`pocket`, yalnız EN paketi) | Referansla |
| Piper (VITS) | ⚠ dfki (veri NC-SA) | ~40 dil | ❌ | GPL-3.0 (piper1-gpl) / ses başına | 21–115 MB | İşlemci, çok hızlı | **sherpa** (`vits`) + dış fonemleştirici | 1 / ses |
| Kitten 0.8 ONNX | ❌ | EN | ❌ | Apache-2.0 / Apache-2.0 [ses başına doğrulanmadı] | 25–80 MB | İşlemci | **sherpa** (`kitten`) | 8 [doğrulanmadı] |
| KittenTTS 2 | ✅ (20 dil listesinde) | 20 dil | ✅ | Apache-2.0 / **Stellon Community** (⚠) | 1,7B | GPU | Python | 115 |
| Matcha | ❌ | EN (LJSpeech), ZH | ❌ | | | İşlemci | **sherpa** (`matcha`) | 1 |
| ZipVoice | ❌ | ZH+EN | ✅ (referans metni şart) | Apache-2.0 kod / ağırlık [doğrulanmadı; Emilia verisi] | int8 109 MB | İşlemci | **sherpa** (`zipvoice`) | — |
| Qwen3-TTS | ❌ | ZH, EN, JA, KO, DE, FR, RU, PT, ES, IT | ✅ (3 sn) | Apache-2.0 / Apache-2.0 | 0,6B (2,5 GB) / 1,7B (4,5 GB) | GPU | PyTorch · LunaVox (C++ ORT + llama.cpp) | CustomVoice'ta hazır sesler |
| CosyVoice 3 (Fun-CosyVoice3-0.5B) | ❌ | 9 dil + 18 Çince lehçe | ✅ | Apache-2.0 / Apache-2.0 | 0,5B | GPU | PyTorch | — |
| IndexTTS2 | ❌ | ZH, EN | ✅ | bilibili Model Use License (100M MAU / 1 milyar RMB eşiği) | | GPU | PyTorch | — |
| Orpheus çok dilli | ❌ | ZH, HI, KO, ES+IT, FR, DE (beta) | ✅ | Apache-2.0 (temel model) | 3–4B | GPU | PyTorch · GGUF + SNAC | dile göre |
| Orpheus TR (Karayakar) | ✅ [ölçüm yok] | — | ✅ | MIT / MIT ⚠ veri "sentetik", kaynağı belirsiz | 3B | GPU | PyTorch + SNAC | — |
| MeloTTS | ❌ | EN, ES, FR, ZH, JA, KO | ❌ | MIT / MIT | | İşlemci | Python (sherpa'da yalnız ZH+EN VITS) | aksan başına 1 |
| VibeVoice | ❌ | EN, ZH (+9 deneysel) | ❌ (Realtime) | MIT, "yalnız araştırma" | 0,5B / 1,5B | GPU | Python (TTS kodu depodan kaldırıldı) | hazır |
| Higgs TTS 3 | ✅ (WER/CER < 5 katmanı) | 100+ | ✅ | **Araştırma / ticari olmayan** + Creator Use Grant | ~5B | GPU (H100 ölçümü) | PyTorch · topluluk GGUF | — |
| OmniVoice | [Türkçe adı geçmiyor] | 600+ | ✅ | Apache-2.0 / **CC-BY-NC** | 0,6B | GPU, RTF 0,025 | PyTorch | — |
| MMS-TTS (tur) | ✅ (WER 6,8) | 1100+ | ❌ | **CC-BY-NC 4.0** | 36M | İşlemci | sherpa (`vits`) | 1 |
| FreyaTTS-small | ✅ (WER 8,0 / MOS 3,68) | yalnız TR | ❌ | Apache-2.0 / Apache-2.0 | 183M | 1,5 GB VRAM; M3 CPU RTF 0,70 | Python | 1 |
| Voxtral TTS | ❌ | 9 dil | ✅ | **CC BY-NC 4.0** | 4B | GPU | vLLM Omni | 20 |
| Fish Audio S2 | ✅ (WER 0,87) | 80+ | ✅ | **Fish Audio Research License** | | GPU | SGLang | — |

---

## 3. Adaylar — ayrıntı

### 3.1 sherpa-onnx 2.x: altyapıdaki büyük değişiklik
- **v2.0.0 (23 Eki 2026) espeak-ng ve piper-phonemize'ı kaldırdı** ("Remove espeak-ng and piper-phonemize from sherpa-onnx").
  — <https://github.com/k2-fsa/sherpa-onnx/releases>
- C API başlığında `vits`, `matcha`, `kokoro`, `kitten`, `zipvoice` yapılandırmalarındaki `data_dir` (espeak-ng-data yolu)
  "Ignored since v2.0.0" diye işaretli; yerine **`SherpaOnnxGenerationConfig.phoneme_codepoints`** (ya da `.tokens`) ile
  **önceden fonemleştirilmiş girdi** verilmesi isteniyor; boş bırakılırsa metin sözlükle (lexicon) okunuyor.
  — <https://github.com/k2-fsa/sherpa-onnx/blob/master/sherpa-onnx/c-api/c-api.h>
- **Sonuç:** Piper/VITS sesleri sherpa 2.x'te hâlâ çalışır ama metni IPA fonemlere uygulama kendi çevirmeli. Türkçe yazımı
  neredeyse foneme bire bir olduğu için kural tabanlı bir Türkçe→IPA çevirici yazılabilir; ancak Piper sesleri espeak-ng'nin
  Türkçe çıktısıyla (vurgu işareti `ˈ`, uzunluk vb.) eğitildiği için çıktı espeak'in sembol düzenine uymalı
  **[doğrulanmadı — kalite farkı ölçülmeli]**.
- sherpa'nın Türkçe sayfası iki model listeliyor: `vits-piper-tr_TR-dfki-medium` ve `supertonic-3-tr`.
  — <https://k2-fsa.github.io/sherpa/onnx/tts/all/Turkish/index.html>
- sherpa'da **Chatterbox, OmniVoice, Qwen TTS, VoxCPM yok** (sürüm notlarında geçmiyor). — <https://github.com/k2-fsa/sherpa-onnx/releases>

### 3.2 Supertonic 3 (Supertone)
- **Diller:** 31 dil, **Türkçe (`tr`) dahil**; sürüm 29 Nis 2026 (Supertonic 2: 5 dil). — <https://huggingface.co/Supertone/supertonic-3>, <https://github.com/supertone-inc/supertonic>
- **Türkçe ölçüm (üreticinin kendi tablosu, Minimax-MLS-test, WER):** Supertonic 3 **1,00**, VoxCPM2 0,88, OmniVoice 2,18.
  Almanca 0,86, İngilizce 2,06, İspanyolca 1,13. — <https://github.com/supertone-inc/supertonic>
- **Lisans:** örnek kod MIT, ağırlık **OpenRAIL-M**. Ticari içerik üretimi serbest; ama Ek A(e): üretilen içerik
  "makine üretimi olduğu açıkça belirtilmeden" yayınlanamaz; A(g): rızasız kimliğe bürünme yasak; dağıtımda kullanım
  kısıtları alıcıya aktarılmalı (§4). — <https://huggingface.co/Supertone/supertonic-3/blob/main/LICENSE>
- **Klon:** açık pakette yok; Voice Builder (ücretli) 31 Ağu 2026'dan sonra erişilemez. **Depo 9 Eyl 2026'da arşivlendi** (güncelleme yok).
  — <https://github.com/supertone-inc/supertonic>
- **sherpa:** `extra = {"lang":"tr"}`, `num_steps = 8`, 10 konuşmacı (sid 0–9), 24 kHz.
  Paket: `sherpa-onnx-supertonic-3-tts-int8-2026-05-11.tar.bz2`, 128.774.318 bayt,
  SHA-256 `82fa96f91c4ef8abaae3a14a3f4153facf88bed821d1f7331cec2700f432c427`.
  — <https://k2-fsa.github.io/sherpa/onnx/tts/all/Turkish/supertonic-3-tr.html>, GitHub API (`releases/tags/tts-models`)
- **Bilinen sorun:** Rusçada yanlış hece vurgusu (alıntı kelimeler, özel adlar); bakımcı cevap vermedi; topluluk birleşik vurgu
  işaretiyle (U+0301) çözüyor. Türkçe için benzer bir rapor bulunamadı. — <https://huggingface.co/Supertone/supertonic-3/discussions/23>
- **Alıntı kelimeler (ör. "Viking"):** Karakter tabanlı modeller yabancı kökenli kelimeyi eğitim verisindeki yaygın (İngilizce)
  okunuşla söyleyebilir **[Türkçe için doğrulanmadı]**. Pratik çözüm: dil başına **telaffuz sözlüğü / yeniden yazım** katmanı
  (ör. `Viking → Vikink`) TTS'ten önce. Önce çağrının gerçekten `lang=tr` ile gittiği doğrulanmalı.

### 3.3 VoxCPM2 (OpenBMB)
- **Diller:** 30 dil (Türkçe dahil) + 9 Çince lehçe; 48 kHz çıktı; 2B parametre; **Apache-2.0**; ses tasarımı (metinle tarif),
  kontrollü klon, referans metinli "Ultimate" klon. PyTorch'ta ~8 GB VRAM, RTF 0,30 (RTX 4090), Nano-vLLM ile 0,13.
  — <https://huggingface.co/openbmb/VoxCPM2>
- **Türkçe ölçüm (teknik rapor, MiniMax-MLS-Test):** VoxCPM2 WER **0,82** / SIM **87,1**; ElevenLabs 0,70 / 59,6; Fish S2 0,87 / 83,5;
  MiniMax 1,52 / 77,9. İç 30 dillik testte TR WER 1,65. Eğitim verisi 2M+ saat, çoğu ZH/EN; diğer diller 1K–50K saat.
  — <https://arxiv.org/html/2606.06928>
- **Python'suz yol:** GGUF + **llama.cpp-omni** (`voxcpm2-cli`): BaseLM Q8_0 ~1,6 GB + Acoustic F16 ~1,7 GB; CPU/CUDA/Vulkan;
  `-r ses.wav` klon, `--prompt-wav/--prompt-text`, "(a calm female voice)" ön ekiyle tasarım. — <https://huggingface.co/DennisHuang648/VoxCPM2-GGUF>
  Diğer: `cstr/voxcpm2-GGUF` (Q4_K ~1,5 GB, CrispASR), `VoxCPM.cpp` (doğruluk denetimi sürüyor). — <https://huggingface.co/cstr/voxcpm2-GGUF>, <https://github.com/joonsoome/VoxCPM.cpp>
  6 GB kartta GGUF yolunun VRAM kullanımı **[doğrulanmadı]** (ağırlık toplamı ~3,3 GB).
- Türkçe türevleri: `Jetlink/JetlinkTTS-v1.0-2B` (VoxCPM2 kopyası, TR ölçümü yok, Apache-2.0) — <https://huggingface.co/Jetlink/JetlinkTTS-v1.0-2B>;
  "Trendyol-TTS" (VoxCPM2 + LoRA, özel veri; ticari kullanım belirsiz) **[doğrulanmadı]**.

### 3.4 Chatterbox Multilingual V3 (Resemble AI)
- **Diller:** 23 dil, Türkçe dahil; 0,5B (Llama omurgası); **MIT**; her çıktıda **PerTh filigranı** (Python paketinde).
  Referans klibin dili etiketle uyuşmazsa aksan sızar → `cfg = 0` önerisi. — <https://huggingface.co/ResembleAI/chatterbox>
- **Durum:** "As of August 2026, Chatterbox is retired research and is no longer maintained" (arşiv, MIT). Turbo ve Nano yalnız İngilizce.
  — <https://github.com/resemble-ai/chatterbox>
- **Türkçe kalite ölçümü:** bulunamadı (Resemble'ın sayfasında dil başına ölçü yok). — <https://resemble.ai/learn/models/chatterbox-multilingual>
- **Uzun metin:** 350+ karakterde halüsinasyon raporları → cümle bazlı parçala **[V3 için yeniden doğrulanmadı; V3 "istenmeyen devam,
  tekrar azaltıldı" diyor]**.
- **ONNX:**
  - `onnx-community/chatterbox-multilingual-ONNX` (V2 dönemi): `speech_encoder` 591 MB, `embed_tokens` 68 MB, `language_model`
    fp32 2,08 GB / fp16 1,04 GB / q4 354 MB / q4f16 305 MB, `conditional_decoder` 534 MB; 24 kHz; örnek betik Python + onnxruntime;
    betikte `cfg` yok, yalnız `exaggeration`. Türkçe için özel ön işleme yok (ZH: pkuseg+Cangjie, JA: pykakasi, HE: dicta, KO: Jamo).
    — <https://huggingface.co/onnx-community/chatterbox-multilingual-ONNX>, <https://huggingface.co/onnx-community/chatterbox-multilingual-ONNX/tree/main/onnx>
  - `Masterx/chatterbox-multilingual-v3-ONNX` (V3, topluluk): aynı 4 grafik düzeni; LM q4 (cosine 0,9937, top-1 %81); EN/FR/DE/ES
    ortalama WER V3 %2,0 vs V2 %7,3; **Türkçe sonucu yok**; filigran grafiklerde yok, yayıncıdan eklemesi isteniyor.
    — <https://huggingface.co/Masterx/chatterbox-multilingual-v3-ONNX>
  - `KitsuMate/chatterbox-multilingual-v3-onnx` (fp32, 4 ya da 5 grafik). — <https://huggingface.co/KitsuMate/chatterbox-multilingual-v3-onnx>
- **.NET'te çalışma:** ONNX Runtime ile mümkün ama hazır değil: BPE tokenizer (`tokenizer.json`), dil etiketi (`[tr]`), KV önbellekli
  özbağlanımlı döngü, örnekleme (tekrar cezası), ses kodlayıcı ve koşullu çözücü ayrı ayrı yazılmalı. Python'un `str.lower()` /
  normalizasyonu ile .NET'in Türkçe `İ/ı` davranışı birebir aynı olmalı **[doğrulanmadı]**.

### 3.5 Piper (Türkçe sesler)
- `rhasspy/piper-voices` içinde bugün yalnız **`tr_TR/dfki`** var; **fahrettin ve fettah 30 Ara 2025'te "katkıcıların isteğiyle"
  kaldırıldı** (sherpa sürüm sayfasında arşivleri hâlâ duruyor — kullanılmamalı).
  — <https://huggingface.co/rhasspy/piper-voices/commits/main/tr/tr_TR>
- **dfki lisansı:** depo etiketi MIT, ama model kartı: veri `marytts/dfki-ot-data`, **"License: CC BY-NC-SA 4.0"**; İngilizce `lessac`
  sesinden ince ayar. Ticari kullanım için riskli → elenir. — <https://huggingface.co/rhasspy/piper-voices/raw/main/tr/tr_TR/dfki/medium/MODEL_CARD>
- **Kalite (Freya-TR-Eval, 495 cümle):** Piper dfki **WER 4,4 / CER 1,1 (en anlaşılır)**, MOS 3,47. — <https://arxiv.org/html/2607.09530>
- **piper1-gpl:** kod GPL-3.0, espeak-ng gömülü; bakımcı aranıyor. GPL'in üretilen sese ya da ses modeline etkisi depoda yazmıyor
  (genel kabul: program çıktısı programın lisansını almaz; ses lisansı ayrı, model kartında) **[depoda açık ifade yok]**.
  — <https://github.com/OHF-Voice/piper1-gpl>
- **Almanca:** `de_DE-thorsten` verisi **CC0** — ticari için temiz. — <https://huggingface.co/rhasspy/piper-voices/raw/main/de/de_DE/thorsten/high/MODEL_CARD>
- sherpa arşivleri (SHA-256, GitHub API): `vits-piper-de_DE-thorsten-high.tar.bz2` 115.591.546 B `dd4ed1b0d42c30a1a4862fc2b243e8044d52b8889c9ff3d1e99e92028888bc4a`;
  `...thorsten-medium-int8` 20.949.833 B `07e240b7b9c1fc9211d5a69512f8cbe11b3286c2ed79c15c076ac6ed427fdf13`.

### 3.6 Kokoro 82M
- v1.0: 54 ses / 9 dil (US-EN 20, UK-EN 8, JA 5, ZH 8, ES 3, FR 1, HI 4, IT 2, PT-BR 3); **Türkçe ve Almanca yok**. En iyi notlar: `af_heart` A, `af_bella` A-.
  — <https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md>
- sherpa 2.x espeak'siz yalnız sözlükten okur (pratikte EN + ZH). sherpa paketleri: v1.0 int8 132 MB, v1.1 int8 147 MB (ZH+EN, 103 ses).
  — <https://k2-fsa.github.io/sherpa/onnx/tts/pretrained_models/kokoro.html>

### 3.7 Pocket TTS (Kyutai)
- ~100M, 2 işlemci çekirdeğinde ~6× gerçek zaman; diller EN, FR, DE, PT, IT, ES (İngilizce dışı için 24 katmanlı kaliteli
  sürümler de var); ağırlık **CC-BY-4.0**, HF'te koşul kabulü gerekli; klon WAV ile; rızasız klon yasak.
  — <https://huggingface.co/kyutai/pocket-tts>
- sherpa'da yalnız `sherpa-onnx-pocket-tts-int8-2026-01-26` (İngilizce; referans sesle klon, metin gerekmez), 98.336.520 B,
  SHA-256 `2f3b88823cbbb9bf0b2477ec8ae7b3fec417b3a87b6bb5f256dba66f2ad967cb`. — <https://k2-fsa.github.io/sherpa/onnx/tts/pocket.html>
  Diğer dillerin sherpa uyumlu ONNX'i **[doğrulanmadı]**; topluluk ONNX'leri var (`lineofflight/pocket-tts-onnx`).
- **Türkçe:** `kaanhgunay/pocket-tts-tr` (0,3B, CC BY 4.0, veri `serdarcaglar/turkish-tts-audiobooks` — veri lisansı belirtilmemiş, ölçüm yok).
  — <https://huggingface.co/kaanhgunay/pocket-tts-tr>

### 3.8 Diğerleri (kısa)
- **Kitten:** 0.8 ONNX ailesi (nano/micro/mini, 25–80 MB) yalnız İngilizce, sherpa'da var. **KittenTTS 2** (1,7B, 20 dil, Türkçe
  listede, 115 ses, klon) ağırlığı **Stellon Labs Community License**: yıllık gelir/fon 1 M $ eşiği, kayıt, geri alınabilir,
  "Powered by Stellon Labs" — ⚠. — <https://github.com/KittenML/KittenTTS>, <https://pypi.org/project/kittenml/0.9.5/>
- **ZipVoice:** sherpa'da yalnız ZH+EN; klon referans ses + birebir referans metni ister. — <https://k2-fsa.github.io/sherpa/onnx/tts/zipvoice.html>
- **Matcha:** sherpa'da EN (LJSpeech) ve ZH (baker). — <https://k2-fsa.github.io/sherpa/onnx/tts/index.html>
- **Qwen3-TTS:** Apache-2.0; 10 dil (ZH, EN, JA, KO, DE, FR, RU, PT, ES, IT) — **Türkçe yok**; 3 sn klon (`ref_text` ile).
  — <https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base>. Python'suz: LunaVox (ONNX Runtime + llama.cpp, i9-12900K'da 0.6B klon RTF 0,858).
  — <https://pypi.org/project/lunavox/>
- **CosyVoice 3 (Fun-CosyVoice3-0.5B-2512):** Apache-2.0; 9 dil, Türkçe yok. — <https://huggingface.co/FunAudioLLM/Fun-CosyVoice3-0.5B-2512>
- **IndexTTS2:** ZH+EN; bilibili Model Use License (100M aylık kullanıcı ya da 1 milyar RMB gelir üstünde ayrı lisans; Çince metin geçerli).
  — <https://raw.githubusercontent.com/index-tts/index-tts/main/LICENSE>
- **Higgs Audio v2:** Boson Community License — 100.000 yıllık aktif kullanıcı üstünde genişletilmiş lisans; "Built with Higgs Materials…"
  ibaresi; türev model adı "Higgs Audio 2" ile başlamalı. — <https://huggingface.co/bosonai/higgs-audio-v2-generation-3B-base/blob/main/LICENSE>
- **Higgs TTS 3 (4 Haz 2026):** 100+ dil, **Türkçe "WER/CER < 5" katmanında**, klon; **Research and Non-Commercial License**;
  *Creator Use Grant*: içerik üreticisinin para kazanan kanallarında ücretsiz (Boson/Higgs Audio'ya atıf şartıyla) ama
  "ürüne gömme, barındırma, yeniden satış" ayrı ticari lisans ister. Bir uygulamanın modeli indirip çalıştırması "ürüne gömme"
  sayılabilir ⚠. ~5B, VRAM belirtilmemiş. — <https://huggingface.co/bosonai/higgs-tts-3-4b>
- **VibeVoice:** MIT ama "yalnız araştırma ve geliştirme"; TTS kodu Eyl 2025'te depodan kaldırıldı; Realtime-0.5B İngilizce + 9 deneysel dil
  (Türkçe yok). — <https://github.com/microsoft/VibeVoice>
- **Orpheus çok dilli:** beta araştırma sürümü; ZH, HI, KO, ES+IT, FR, DE (3–4B). Türkçe yok.
  — <https://huggingface.co/collections/canopylabs/orpheus-multilingual-research-release-67f5894cd16794db163786ba>.
  Topluluk Türkçesi `Karayakar/Orpheus-TTS-Turkish-PT-5000` (MIT, 3B, 220 saat **sentetik** veri — kaynağı belirsiz ⚠, ölçüm yok).
  — <https://huggingface.co/Karayakar/Orpheus-TTS-Turkish-PT-5000>
- **MeloTTS:** MIT; EN (4 aksan), ES, FR, ZH, JA, KO. Türkçe yok. — <https://github.com/myshell-ai/MeloTTS>
- **MMS-TTS (`facebook/mms-tts-tur`):** 36M, **CC-BY-NC 4.0** → elenir (Freya-TR-Eval'de WER 6,8 / MOS 3,58). — <https://huggingface.co/facebook/mms-tts-tur>
- **OmniVoice (k2-fsa):** kod Apache-2.0, ağırlık **CC-BY-NC** (Emilia verisi yüzünden) → elenir. — <https://huggingface.co/k2-fsa/OmniVoice>
- **Voxtral TTS (Mistral, Mart 2026):** CC BY-NC 4.0, 9 dil, Türkçe yok. — <https://siliconangle.com/2026/03/26/mistral-releases-open-weights-speaking-AI-model-voxtral-tts/>
- **Fish Audio S2:** Fish Audio Research License — ticari için ayrı yazılı lisans. — <https://fish.audio/fr/blog/what-we-mean-by-open-source-for-s2/>
- **FreyaTTS-small:** yalnız Türkçe, 183M, Apache-2.0, tek ses, klon yok, 48 kHz; Python. — <https://huggingface.co/freyavoice/freya-tts>

### 3.9 Türkçe için bağımsız değerlendirme: Freya-TR-Eval (Tem 2026)
495 cümle, Whisper ile WER/CER, insan MOS (yazarlar FreyaTTS'in sahibi — kendi ölçütleri). — <https://arxiv.org/html/2607.09530>

| Sistem | Param | WER | CER | MOS (±%95) | Ticari ağırlık |
|---|---|---|---|---|---|
| Piper tr dfki | 16M | **4,4** | **1,1** | 3,47 ± 0,22 | ❌ (veri NC-SA) |
| Coqui GlowTTS tr | 28M | 12,1 | 3,3 | 2,53 | [doğrulanmadı] |
| MMS-TTS tr | 36M | 6,8 | 1,7 | 3,58 | ❌ |
| SpeechT5 tr | 144M | 83,4 | 45,5 | 1,59 | — |
| FreyaTTS | 183M | 8,0 | 3,0 | 3,68 | ✅ |
| F5-TTS tr | 336M | 24,3 | 10,9 | 3,63 | ❌ |
| XTTS-v2 | 470M | 11,1 | 3,9 | **3,82** | ❌ |

İlk dört MOS'un güven aralıkları örtüşüyor. Chatterbox, Supertonic, VoxCPM2 bu tabloda yok.
Ayrıca 2026 Türkçe TTS taraması (21 model; WER/MOS yok, lisans etiketleri tutarsız): <https://danielquillanroxas.github.io/turkish-tts-survey>

---

## 4. Lisans notları
- **Kod lisansı ≠ ağırlık lisansı.** Örn. OmniVoice: kod Apache, ağırlık NC; Supertonic: kod MIT, ağırlık OpenRAIL-M; Kitten 2: kod Apache, ağırlık Stellon.
- **Eğitim verisi lisansı da bakılmalı:** Piper dfki (MIT etiketli depo, ama veri CC BY-NC-SA); Emilia verisiyle eğitilenler (OmniVoice, ZipVoice [doğrulanmadı]).
- **OpenRAIL-M (Supertonic):** ticari içerik serbest; yayında "makine üretimi" beyanı şart; uygulama modeli dağıtıyor/indirtiyorsa kullanım
  kısıtlarını kullanıcıya bildirmeli, lisans kopyası vermeli.
- **Klon etiği:** Pocket, VoxCPM2, Higgs, OmniVoice, Chatterbox kartları rızasız klonu yasaklıyor/uyarıyor. YouTube "altered or synthetic
  content" etiketi gerçek kişi taklidinde zorunlu.
- **Filigran:** Chatterbox Python paketi PerTh gömer; topluluk ONNX'lerinde yok ama yeniden eklenmesi isteniyor.

## 5. Bakım durumu uyarısı (Kasım 2026)
- Chatterbox: Ağustos 2026'da "retired research", bakım yok.
- Supertonic: depo 9 Eylül 2026'da arşivlendi.
- piper1-gpl: bakımcı aranıyor.
- sherpa-onnx: etkin (2.0.1, 26 Eki 2026), ama espeak kalktı.
- VoxCPM2: etkin (teknik rapor Haziran 2026, birden çok C++/GGUF portu).

---

## 6. Kaynakça

Metin içinde verilen bağlantıların toplu listesi (araştırma tarihi: 7 Kasım 2026). Yeni kaynak içermez.

**sherpa-onnx**
- <https://github.com/k2-fsa/sherpa-onnx/releases>
- <https://github.com/k2-fsa/sherpa-onnx/blob/master/sherpa-onnx/c-api/c-api.h>
- <https://k2-fsa.github.io/sherpa/onnx/tts/index.html>
- <https://k2-fsa.github.io/sherpa/onnx/tts/all/Turkish/index.html>
- <https://k2-fsa.github.io/sherpa/onnx/tts/all/Turkish/supertonic-3-tr.html>
- <https://k2-fsa.github.io/sherpa/onnx/tts/pretrained_models/kokoro.html>
- <https://k2-fsa.github.io/sherpa/onnx/tts/pocket.html>
- <https://k2-fsa.github.io/sherpa/onnx/tts/zipvoice.html>

**Supertonic 3**
- <https://huggingface.co/Supertone/supertonic-3>
- <https://github.com/supertone-inc/supertonic>
- <https://huggingface.co/Supertone/supertonic-3/blob/main/LICENSE>
- <https://huggingface.co/Supertone/supertonic-3/discussions/23>

**VoxCPM2**
- <https://huggingface.co/openbmb/VoxCPM2>
- <https://arxiv.org/html/2606.06928>
- <https://huggingface.co/DennisHuang648/VoxCPM2-GGUF>
- <https://huggingface.co/cstr/voxcpm2-GGUF>
- <https://github.com/joonsoome/VoxCPM.cpp>
- <https://huggingface.co/Jetlink/JetlinkTTS-v1.0-2B>

**Chatterbox Multilingual**
- <https://huggingface.co/ResembleAI/chatterbox>
- <https://github.com/resemble-ai/chatterbox>
- <https://resemble.ai/learn/models/chatterbox-multilingual>
- <https://huggingface.co/onnx-community/chatterbox-multilingual-ONNX>
- <https://huggingface.co/onnx-community/chatterbox-multilingual-ONNX/tree/main/onnx>
- <https://huggingface.co/Masterx/chatterbox-multilingual-v3-ONNX>
- <https://huggingface.co/KitsuMate/chatterbox-multilingual-v3-onnx>

**Piper**
- <https://huggingface.co/rhasspy/piper-voices/commits/main/tr/tr_TR>
- <https://huggingface.co/rhasspy/piper-voices/raw/main/tr/tr_TR/dfki/medium/MODEL_CARD>
- <https://huggingface.co/rhasspy/piper-voices/raw/main/de/de_DE/thorsten/high/MODEL_CARD>
- <https://github.com/OHF-Voice/piper1-gpl>

**Kokoro ve Pocket TTS**
- <https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md>
- <https://huggingface.co/kyutai/pocket-tts>
- <https://huggingface.co/kaanhgunay/pocket-tts-tr>

**Diğer modeller**
- <https://github.com/KittenML/KittenTTS>
- <https://pypi.org/project/kittenml/0.9.5/>
- <https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base>
- <https://pypi.org/project/lunavox/>
- <https://huggingface.co/FunAudioLLM/Fun-CosyVoice3-0.5B-2512>
- <https://raw.githubusercontent.com/index-tts/index-tts/main/LICENSE>
- <https://huggingface.co/bosonai/higgs-audio-v2-generation-3B-base/blob/main/LICENSE>
- <https://huggingface.co/bosonai/higgs-tts-3-4b>
- <https://github.com/microsoft/VibeVoice>
- <https://huggingface.co/collections/canopylabs/orpheus-multilingual-research-release-67f5894cd16794db163786ba>
- <https://huggingface.co/Karayakar/Orpheus-TTS-Turkish-PT-5000>
- <https://github.com/myshell-ai/MeloTTS>
- <https://huggingface.co/facebook/mms-tts-tur>
- <https://huggingface.co/k2-fsa/OmniVoice>
- <https://siliconangle.com/2026/03/26/mistral-releases-open-weights-speaking-AI-model-voxtral-tts/>
- <https://fish.audio/fr/blog/what-we-mean-by-open-source-for-s2/>
- <https://huggingface.co/freyavoice/freya-tts>

**Türkçe değerlendirme ve tarama**
- <https://arxiv.org/html/2607.09530>
- <https://danielquillanroxas.github.io/turkish-tts-survey>
