# Yerel Çok Dilli TTS (metinden sese modelleri)

**TTS (text-to-speech, metinden sese)**, yazılı metni konuşmaya çeviren teknolojidir (güncel modeller bunu yapay sinir ağlarıyla, insan sesine yakın doğallıkta yapar); video seslendirmesi, sesli kitap, ekran okuyucu, sesli asistan ve oyun/uygulama içi anlatımda kullanılır. **Yerel çalıştırma**, modelin ağırlık dosyasını indirip sesi kendi bilgisayarında (işlemcide ya da ekran kartında) üretmek demektir: metin dışarıya gönderilmez, karakter başına ücret ödenmez, model indirildikten sonra internet gerekmez; karşılığında donanım sınırı, kurulum emeği ve **model ağırlığının lisansı** kullanıcının sorumluluğuna girer.

Bu klasör, Kasım 2026 itibarıyla yerelde çalışan çok dilli TTS modellerinin araştırmasıdır: hangisinde Türkçe var ve ne kadar iyi (WER/MOS ölçümleri), hangisi İngilizce, Almanca, İspanyolca, Fransızca gibi dillerde güçlü, hangisi ses klonlar, hangisinin ağırlığı ticari yayında (ör. para kazanan video kanalı) kullanılabilir, hangisi işlemcide ve Python'suz (sherpa-onnx, ONNX Runtime, GGUF) çalışır, hangi projelerin bakımı durmuş.

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

Yapay zekâ için Markdown: [arastirma.md](arastirma.md)

> Araştırma tarihi: 7 Kasım 2026. Yalnız belgeler okundu (model kartları, lisans dosyaları, makaleler, sürüm notları, GitHub API); hiçbir model indirilmedi, dinlenmedi. Doğrulanamayan bilgiler **[doğrulanmadı]** etiketlidir. Ölçümlerin çoğu üreticilerin kendi raporlarından gelir. Lisans, sürüm ve bakım durumu sık değişir; kullanmadan önce kaynaktan teyit et. Lisans özetleri hukuki görüş değildir.

## Yerel mi, bulut mu? (Durum → Eğilim)

| Durum | Eğilim |
|---|---|
| Çok miktarda metin seslendirilecek, karakter başı ücret istenmiyor | Yerel |
| Metin dışarıya gönderilemez (gizlilik) ya da internet yok | Yerel |
| Ekran kartı yok ya da zayıf | Yerelde işlemcide çalışan hafif modeller (§1 tablosu) ya da bulut |
| Kurulumla uğraşmadan hemen sonuç, en geniş ses seçeneği | Bulut TTS servisi |
| Çıktı ticari yayında kullanılacak | Yerelde yalnız ağırlık lisansı ticari kullanıma izin veren modeller (§1, §4) |
| Ticari olmayan / araştırma kullanımı | Seçenek genişler; yine de her modelin lisansı okunmalı |

Bulut TTS servislerinin karşılaştırması için: [Video Üretim Sistemi](../video-uretim-sistemi/) § 5.

## Bölümler

| § | Başlık | Kısaca |
|---|---|---|
| 0 | Kapsam ve yöntem | Tarih, kapsam, lisans denetimi, örnek hedef donanım, yöntem |
| 1 | Kısa sonuç | İhtiyaca göre en iyi aday; ticari kullanıma kapalı olduğu için elenenler; Türkçesi olmayanlar |
| 2 | Karşılaştırma tablosu | 23 model: Türkçe, diğer diller, klon, kod/ağırlık lisansı, boyut, donanım, çalışma yolu, hazır ses |
| 3.1 | sherpa-onnx 2.x | v2.0.0'da espeak-ng'nin kaldırılması; Piper/VITS için dışarıdan fonemleştirme |
| 3.2 | Supertonic 3 | 31 dil, Türkçe WER, OpenRAIL-M, sherpa paketi, alıntı kelime telaffuzu |
| 3.3 | VoxCPM2 | 30 dil, Apache-2.0, klon ve ses tasarımı, GGUF + llama.cpp-omni yolu |
| 3.4 | Chatterbox Multilingual V3 | 23 dil, MIT, PerTh filigranı, ONNX dışa aktarımları, .NET'te çalıştırma notu |
| 3.5 | Piper (Türkçe sesler) | `tr_TR/dfki` veri lisansı, kaldırılan sesler, piper1-gpl, Almanca thorsten (CC0) |
| 3.6 | Kokoro 82M | 54 ses / 9 dil; Türkçe ve Almanca yok |
| 3.7 | Pocket TTS | İşlemcide klon; 6 dil; topluluk Türkçe ince ayarı |
| 3.8 | Diğerleri | Kitten, ZipVoice, Matcha, Qwen3-TTS, CosyVoice 3, IndexTTS2, Higgs, VibeVoice, Orpheus, MeloTTS, MMS-TTS, OmniVoice, Voxtral, Fish Audio S2, FreyaTTS |
| 3.9 | Freya-TR-Eval | Türkçe için 7 sistemin WER / CER / MOS tablosu |
| 4 | Lisans notları | Kod ≠ ağırlık lisansı, eğitim verisi lisansı, OpenRAIL-M, klon etiği, filigran |
| 5 | Bakım durumu | Chatterbox, Supertonic, piper1-gpl, sherpa-onnx, VoxCPM2 |
| 6 | Kaynakça | Metindeki tüm bağlantılar |

## Kısa sonuç

| İhtiyaç | En iyi aday | Çalışma yolu |
|---|---|---|
| Türkçe, hafif, işlemcide, hazır ses | Supertonic 3 | sherpa-onnx |
| Türkçe + klon, temiz lisans, en yüksek kalite | VoxCPM2 (Apache-2.0) | PyTorch ya da GGUF + llama.cpp-omni |
| Türkçe + klon, MIT | Chatterbox Multilingual V3 | PyTorch ya da ONNX Runtime |
| İngilizce, hafif | Kokoro 82M (Apache-2.0) | sherpa-onnx |
| Almanca, hafif, CC0 | Supertonic 3 ya da Piper `de_DE-thorsten` (veri CC0) | sherpa-onnx |
| EN/FR/DE/ES/PT/IT + klon, işlemcide | Pocket TTS (CC-BY-4.0) | sherpa-onnx (yalnız İngilizce paket) |

Gerekçeler, ölçümler ve lisans koşulları için [index.html](index.html) ya da [arastirma.md](arastirma.md).

## Terimler

| Terim | Anlamı |
|---|---|
| WER / CER | Word / Character Error Rate. Üretilen ses bir konuşma tanıma modeliyle yeniden yazıya çevrilir ve özgün metinle karşılaştırılır; kelime / karakter hata oranıdır. **Düşük olan iyidir** (anlaşılırlık ölçüsü). |
| MOS | Mean Opinion Score. İnsan dinleyicilerin 1–5 arası verdiği doğallık puanının ortalaması. **Yüksek olan iyidir.** |
| SIM | Speaker similarity. Klonlanan sesin referans sese benzerliği. **Yüksek olan iyidir.** |
| RTF | Real-time factor = üretim süresi / üretilen sesin süresi. 1'den küçükse gerçek zamandan hızlıdır. |
| Sıfır atışlı klon (zero-shot) | Model yeniden eğitilmeden, birkaç saniyelik referans kayıttan o sese benzer konuşma üretmek. |
| Ağırlık lisansı | Eğitilmiş model dosyasının lisansı. Kodun lisansından ayrıdır ve ticari kullanımı belirleyen çoğu zaman budur. |
| ONNX / ONNX Runtime | Modeli çatıdan bağımsız saklayan açık biçim ve onu birçok dilden (C++, C#, Java, Python…) çalıştıran kütüphane. |
| sherpa-onnx | ONNX modelleriyle cihaz üstünde konuşma tanıma ve TTS yapan, Python gerektirmeyen açık kaynak kütüphane (k2-fsa). |
| GGUF / ggml | ggml, llama.cpp ailesinin C/C++ tensör kütüphanesidir; GGUF bu ailenin model dosya biçimidir. Python'suz, işlemcide ya da ekran kartında çalıştırmaya uygundur. |
| int8, q4, fp16 | Ağırlıkların daha az bitle saklandığı küçültülmüş (quantized) sürümler; dosya ve bellek küçülür, kalite bir miktar düşebilir. |
| Fonemleştirme (G2P) | Yazıyı ses birimlerine (IPA fonemleri) çevirme adımı; espeak-ng bu işi yapan yaygın araçtır. |
| VRAM | Ekran kartı belleği; modelin ekran kartında çalışıp çalışmayacağını belirler. |

## İlgili konular

- [Remotion ve Kodla Video](../kodla-video/) — § 8'de düşük VRAM'de yerel TTS / görsel / geçiş / altyazı tablosu var (Ekim 2026 tarihli; bu araştırma daha yeni ve TTS için daha ayrıntılıdır). İki sayfa çelişirse bu araştırma esas alınır: ör. işlemcide çalışan, ticari içerikte kullanılabilen Türkçe model için burada Supertonic 3 aday gösterilir (§ 3.2; OpenRAIL-M, "makine üretimi" beyanı şartıyla).
- [Video Üretim Sistemi](../video-uretim-sistemi/) — § 5'te bulut ve yerel TTS karşılaştırması, ses klonu ve sahne bazlı ses mimarisi; bu araştırmadaki modeller o hattın seslendirme adımına girer.
- [C# / .NET](../../CSharp-DotNet/) — ONNX Runtime ve sherpa-onnx .NET'ten de kullanılabilir; § 3.4'teki ".NET'te çalışma" notu için.
- [Python](../../Python/) — PyTorch ile çalışan modeller (VoxCPM2, Chatterbox, FreyaTTS…) için.

## Kaynakça

**sherpa-onnx**
- https://github.com/k2-fsa/sherpa-onnx/releases
- https://github.com/k2-fsa/sherpa-onnx/blob/master/sherpa-onnx/c-api/c-api.h
- https://k2-fsa.github.io/sherpa/onnx/tts/index.html
- https://k2-fsa.github.io/sherpa/onnx/tts/all/Turkish/index.html
- https://k2-fsa.github.io/sherpa/onnx/tts/all/Turkish/supertonic-3-tr.html
- https://k2-fsa.github.io/sherpa/onnx/tts/pretrained_models/kokoro.html
- https://k2-fsa.github.io/sherpa/onnx/tts/pocket.html
- https://k2-fsa.github.io/sherpa/onnx/tts/zipvoice.html

**Supertonic 3**
- https://huggingface.co/Supertone/supertonic-3
- https://github.com/supertone-inc/supertonic
- https://huggingface.co/Supertone/supertonic-3/blob/main/LICENSE
- https://huggingface.co/Supertone/supertonic-3/discussions/23

**VoxCPM2**
- https://huggingface.co/openbmb/VoxCPM2
- https://arxiv.org/html/2606.06928
- https://huggingface.co/DennisHuang648/VoxCPM2-GGUF
- https://huggingface.co/cstr/voxcpm2-GGUF
- https://github.com/joonsoome/VoxCPM.cpp
- https://huggingface.co/Jetlink/JetlinkTTS-v1.0-2B

**Chatterbox Multilingual**
- https://huggingface.co/ResembleAI/chatterbox
- https://github.com/resemble-ai/chatterbox
- https://resemble.ai/learn/models/chatterbox-multilingual
- https://huggingface.co/onnx-community/chatterbox-multilingual-ONNX
- https://huggingface.co/onnx-community/chatterbox-multilingual-ONNX/tree/main/onnx
- https://huggingface.co/Masterx/chatterbox-multilingual-v3-ONNX
- https://huggingface.co/KitsuMate/chatterbox-multilingual-v3-onnx

**Piper**
- https://huggingface.co/rhasspy/piper-voices/commits/main/tr/tr_TR
- https://huggingface.co/rhasspy/piper-voices/raw/main/tr/tr_TR/dfki/medium/MODEL_CARD
- https://huggingface.co/rhasspy/piper-voices/raw/main/de/de_DE/thorsten/high/MODEL_CARD
- https://github.com/OHF-Voice/piper1-gpl

**Kokoro ve Pocket TTS**
- https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md
- https://huggingface.co/kyutai/pocket-tts
- https://huggingface.co/kaanhgunay/pocket-tts-tr

**Diğer modeller**
- https://github.com/KittenML/KittenTTS
- https://pypi.org/project/kittenml/0.9.5/
- https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base
- https://pypi.org/project/lunavox/
- https://huggingface.co/FunAudioLLM/Fun-CosyVoice3-0.5B-2512
- https://raw.githubusercontent.com/index-tts/index-tts/main/LICENSE
- https://huggingface.co/bosonai/higgs-audio-v2-generation-3B-base/blob/main/LICENSE
- https://huggingface.co/bosonai/higgs-tts-3-4b
- https://github.com/microsoft/VibeVoice
- https://huggingface.co/collections/canopylabs/orpheus-multilingual-research-release-67f5894cd16794db163786ba
- https://huggingface.co/Karayakar/Orpheus-TTS-Turkish-PT-5000
- https://github.com/myshell-ai/MeloTTS
- https://huggingface.co/facebook/mms-tts-tur
- https://huggingface.co/k2-fsa/OmniVoice
- https://siliconangle.com/2026/03/26/mistral-releases-open-weights-speaking-AI-model-voxtral-tts/
- https://fish.audio/fr/blog/what-we-mean-by-open-source-for-s2/
- https://huggingface.co/freyavoice/freya-tts

**Türkçe değerlendirme ve tarama**
- https://arxiv.org/html/2607.09530
- https://danielquillanroxas.github.io/turkish-tts-survey

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../README.md)
