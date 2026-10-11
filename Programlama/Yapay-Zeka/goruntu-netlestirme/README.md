# Görüntü netleştirme modelleri (super-resolution + yüz düzeltme)

Görüntü netleştirme (upscaling, super-resolution, SR), düşük çözünürlüklü ya da bulanık bir görseli yapay zekâ modeliyle 2×–4× büyütüp ayrıntıyı yeniden kurma işidir. Bicubic / Lanczos gibi klasik yöntemler yalnız pikseller arasını doldurur. SR modelleri (ESRGAN ailesi, Compact, RealPLKSR, DAT, MoSR…) eğitimde gördüğü dokuları **uydurarak** keskin sonuç verir. Yüz düzeltme modelleri (GFPGAN, RestoreFormer, CodeFormer) yalnız yüz bölgesini yeniden çizer. Bu sayfa modelleri, lisanslarını, donanım ihtiyacını, nereden indirileceğini ve hangi durumda hangisinin seçileceğini özetler.

HTML anlatım: [index.html](index.html) (tablolar, komut örnekleri, karar tablosu).

## İçindekiler

| Bölüm | Ne var |
|---|---|
| 1. Yollar | ncnn-vulkan exe · PyTorch + spandrel · facexlib · bulut API (fal) · Upscayl |
| 2. Modeller | Model → ne yapar → lisans → donanım → kaynak |
| 3. ncnn CLI | `realesrgan-ncnn-vulkan` bayrakları + örnek komutlar + tuzaklar |
| 4. Süreç olarak çağırma | C# `ProcessStartInfo.ArgumentList`, ilerleme okuma |
| 5. PyTorch yolu | spandrel, karo, fp16, yüz geçişi; `gfpgan` pip paketi neden kullanılmamalı |
| 6. Bulut API | fal uçları, fiyatlar, kuyruk akışı, JSON örneği |
| 7. Ölçümler | 6 GB dizüstü kartında süre / VRAM / SSIM |
| 8. Durum → Sonuç | Kart üreticisi, VRAM, içerik türü, ticari kullanım |

## Kısa özet

- **Python'suz, her kartta (NVIDIA / AMD / Intel):** Real-ESRGAN-ncnn-vulkan (MIT, tek exe, Vulkan) + Real-ESRGAN modelleri (BSD-3).
- **Topluluk modelleri** (OpenModelDB'deki yüzlercesi): PyTorch + `spandrel` (MIT).
- **Yüz:** GFPGAN 1.4 / RestoreFormer (Apache-2.0) ya da CodeFormer (ticari olmayan) + `facexlib` (MIT).
- **Ticari üründe kullanılamayanlar:** 4x-UltraSharp ailesi, Remacri, ClearReality (CC-BY-NC-SA), CodeFormer (S-Lab). Upscayl AGPL → kapalı ürüne gömülmez; motoru olan ncnn exe doğrudan kullanılır.
- **Büyük modeller** (SeedVR2 ≥16–24 GB VRAM) küçük kartta çalışmaz → bulut API.
- **Tuzaklar:** ncnn exe'ye 4× modelle `-s 2` vermek resmin sol üst çeyreğini büyütür; `-g auto` dizüstünde tümleşik kartı seçebilir; çıkış kodu 0 olsa da çıktı yazılmamış olabilir.

## İlgili konular

- [Araştırma ve ölçüm notları](notlar/arastirma-ve-olcum-notlari.md) — indirme bağlantıları ve sha256 değerleri, model model ayrıntılı ölçüm ve gözlemler, kurulum notları.
- [Python](../../Python/) — PyTorch yolu için dil temeli.

- Görüntü üretimi (difüzyon) — yerel stable-diffusion.cpp / ComfyUI
- ffmpeg ile kare çıkarma (`-ss` + `-frames:v 1`), Lanczos ölçekleme
- ONNX Runtime / DirectML ile GPU'da çıkarım

## Kaynakça

- [xinntao/Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN) — modeller, sürümler, [model zoo](https://github.com/xinntao/Real-ESRGAN/blob/master/docs/model_zoo.md) (BSD-3)
- [xinntao/Real-ESRGAN-ncnn-vulkan](https://github.com/xinntao/Real-ESRGAN-ncnn-vulkan) — CLI (MIT)
- [chaiNNer-org/spandrel](https://github.com/chaiNNer-org/spandrel) — mimari tanıma, `spandrel_extra_arches` lisans ayrımı
- [OpenModelDB](https://openmodeldb.info) — topluluk modellerinin lisans ve kaynak kayıtları
- [TencentARC/GFPGAN](https://github.com/TencentARC/GFPGAN) · [sczhou/CodeFormer](https://github.com/sczhou/CodeFormer) · [xinntao/facexlib](https://github.com/xinntao/facexlib)
- [Kim2091/UltraSharp](https://huggingface.co/Kim2091/UltraSharp) · [Kim2091/UltraSharpV2](https://huggingface.co/Kim2091/UltraSharpV2) · [FacehugmanIII/4x_foolhardy_Remacri](https://huggingface.co/FacehugmanIII/4x_foolhardy_Remacri) · [Phhofm/models](https://github.com/Phhofm/models)
- [ByteDance-Seed/SeedVR](https://github.com/ByteDance-Seed/SeedVR) (Apache-2.0)
- [upscayl/upscayl](https://github.com/upscayl/upscayl) (AGPL-3.0)
- fal: [esrgan](https://fal.ai/models/fal-ai/esrgan) · [seedvr upscale](https://fal.ai/models/fal-ai/seedvr/upscale/image) · [topaz](https://fal.ai/models/fal-ai/topaz/upscale/image) · [clarity-upscaler](https://fal.ai/models/fal-ai/clarity-upscaler) · [codeformer](https://fal.ai/models/fal-ai/codeformer) · [recraft crisp](https://fal.ai/models/fal-ai/recraft/upscale/crisp) · [fal belgeleri (kuyruk API)](https://docs.fal.ai)

Araştırma tarihi: 12 Ekim 2026. Fiyat, sürüm ve lisanslar değişebilir; kullanmadan önce kaynaktan doğrula. Lisans bilgisi hukuki görüş değildir.


---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../README.md)
