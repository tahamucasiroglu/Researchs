# Görüntü netleştirme — araştırma ve ölçüm notları

Görüntü büyütme (upscaling / super-resolution), düşük çözünürlüklü ya da bulanık bir görseli yapay zekâ modeliyle 2×–4× büyütüp ayrıntıyı yeniden kurma işidir. Klasik yöntemler (bicubic, Lanczos) yalnız pikselleri ara değerler; SR modelleri (ESRGAN ailesi, SwinIR, DAT, SPAN…) eğitimde gördüğü dokuları "uydurarak" keskin sonuç verir. Yüz düzeltme modelleri (GFPGAN, CodeFormer, RestoreFormer) yalnız yüz bölgesini yeniden çizer. Bu not, bir uygulamaya yerel (çevrim dışı) ve çevrim içi (fal.ai) netleştirme eklemek için yapılan araştırmanın ve denemelerin ayrıntılı kaydıdır: araçlar, CLI bayrakları, model lisansları, indirme doğrulamaları, ölçümler ve tuzaklar. Özet anlatım için [konu README'si](../README.md) ve [HTML sayfası](../index.html).

## 1. Bir bakışta

| Yol | Ne | Lisans | Artı | Eksi |
|---|---|---|---|---|
| **Real-ESRGAN-ncnn-vulkan** (xinntao) | Tek exe, Vulkan (NVIDIA/AMD/Intel), Python yok | Kod MIT · modeller BSD-3 | 6 MB exe, kurulum yok, karo (tile) ile az VRAM | Yalnız `.param/.bin` (ncnn) modeller; son sürüm 2022 |
| **spandrel** (chaiNNer) + PyTorch | `.pth/.safetensors` mimarisini kendisi tanır, tek arayüzle çalıştırır | MIT (`spandrel`) · NC mimariler `spandrel_extra_arches`'te | OpenModelDB'deki yüzlerce model, GFPGAN/RestoreFormer/CodeFormer | Python + torch ortamı gerekir |
| **facexlib** (xinntao) | Yüz bul → hizala → modele ver → geri yapıştır (`FaceRestoreHelper`) | MIT | GFPGAN/CodeFormer'ın asıl yardımcısı | Ağırlıklar ayrıca iner |
| **fal.ai** uç noktaları | Bulutta ESRGAN, SeedVR2, Topaz, Clarity, CodeFormer… | Ticari hizmet | Büyük modeller (SeedVR2 yerelde ≥16–24 GB VRAM ister) | Ücretli, görsel sağlayıcıya yüklenir |
| Upscayl | Real-ESRGAN-ncnn için Electron arayüzü | **AGPL-3.0** | Hazır | Kapalı ürüne gömülemez — motoru (ncnn exe) doğrudan kullan |

## 2. Real-ESRGAN-ncnn-vulkan

- İndirme (modeller dahil, Windows): `https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesrgan-ncnn-vulkan-20220424-windows.zip` — 45.474.481 bayt, sha256 `abc02804e17982a3be33675e4d471e91ea374e65b70167abc09e31acb412802d` (12 Eki 2026'da indirilip hesaplandı; GitHub bu eski sürümde digest yayımlamıyor).
- Yalnız exe (modelsiz, 2 MB): `xinntao/Real-ESRGAN-ncnn-vulkan` v0.2.0.
- Zip içi: `realesrgan-ncnn-vulkan.exe`, `vcomp140.dll`, `models/realesrgan-x4plus`, `realesrgan-x4plus-anime`, `realesr-animevideov3-x2/-x3/-x4` (`.param` + `.bin`). Yardım metnindeki `realesrnet-x4plus` zipte **yok**.

```text
realesrgan-ncnn-vulkan.exe -i girdi -o cikti [seçenekler]
  -i  girdi dosyası ya da klasör (jpg/png/webp)
  -o  çıktı dosyası ya da klasör
  -s  ölçek 2|3|4 (varsayılan 4)
  -t  karo boyutu (>=32; 0 = otomatik) — küçük karo = az VRAM
  -m  model klasörü (varsayılan models)
  -n  model adı (realesr-animevideov3 | realesrgan-x4plus | realesrgan-x4plus-anime …)
  -g  GPU kimliği (varsayılan auto)
  -j  load:proc:save iş parçacığı (varsayılan 1:2:2)
  -x  TTA kipi (8 kat yavaş, biraz daha temiz)
  -f  çıktı biçimi jpg|png|webp
  -v  ayrıntılı çıktı (GPU listesini de basar)
```

**Ölçüm (RTX 3060 Laptop 6 GB, 12 Eki 2026):**

| Girdi → model | Süre | VRAM artışı |
|---|---|---|
| 220×220 → x4plus, `-g 0` (NVIDIA) | 2,9 sn (açılış dahil) | — |
| Aynısı Intel iGPU'da (`-g 1/2`) | 8,7–10,8 sn | — |
| 1920×1080 → x4plus (7680×4320), `-t 0` | 15,5 sn | ~1,3 GB |
| 1920×1080 → x4plus, `-t 256` | 14,4 sn | ~1,9 GB |
| 1920×1080 → x4plus, `-t 128` | 18,2 sn | ~0,8 GB |
| 1920×1080 → animevideov3-x2 | 1,3 sn | — |
| 1920×1080 → x4plus-anime | 5,0 sn | — |

**Tuzaklar:**
- `-g auto` dizüstünde **Intel iGPU'yu seçebiliyor** (denemede seçti). `-v` çıktısındaki `[0 NVIDIA …]` satırlarından ayrık kartı bulup `-g` ile açıkça ver. Vulkan sırası CUDA sırasıyla aynı olmak zorunda değil.
- `-n` model adı: `realesr-animevideov3`te ölçek ekini (`-x2`) exe **kendisi ekler** — `-n realesr-animevideov3-x2` verilirse `…-x2-x2.param` arar, bulamaz. Öteki modellerde `-n` = `.param` dosyasının adı.
- ⚠ **x4 modelle `-s 2` YANLIŞ sonuç verir** (2× boyutta ama resmin yalnız SOL ÜST ÇEYREĞİ büyütülmüş; hata yok, çıkış 0). 2×/3× için 4× çalıştırıp sonucu küçült. (İlk notta "çalışıyor" yazıyordu — boyut doğru olduğu için öyle sanılmıştı; görüntüye bakınca yanlış çıktı.)
- `-m` klasör yolunda **"models" geçmeli**: yoksa `unknown model dir type` deyip çıkar (v0.2.5.0 kaynak kodundaki denetim). Ek modeller için klasör adı ör. `ncnn-models`.
- Başarı çıkış koduyla anlaşılmaz: girdi okunamasa da (`decode image … failed`) çıkış 0. Çıktı dosyasının varlığına bak.
- Kart listesi her çalıştırmada stderr'e basılır (`[0 NVIDIA GeForce RTX 3060 Laptop GPU]  queueC=…`); var olmayan girdiyle çalıştırmak yalnız listeyi basıp hemen çıkar → ayrık kartı bulmanın ucuz yolu. Geçersiz kart: `invalid gpu device`, çıkış 127.
- İlerleme stderr'de `12,34%` satırları — ondalık ayırıcı Windows bölge ayarına göre (Türkçe sistemde virgül).
- Topluluk ncnn dışa aktarımları her zaman çalışmaz: Phhofm'un `4xNomos8kSC_fp16` ve `4xLSDIRCompactC_fp16` (pnnx, Clip/DepthToSpace katmanlı) 2022 exe'sinde **segfault**; Kim2091'in `4x-UltraSharp-fp16` (eski dönüştürücü) çalışıyor. Çökenlerin `.pth`'si spandrel ile sorunsuz.
- Çıktı 4× olunca dosya büyür (1080p → 33 MP PNG ~40–60 MB). Büyük girdide önce boyut uyarısı ver.

## 3. Modeller ve lisanslar

| Model | Ölçek / mimari | Lisans | Resmî / yazar kaynağı |
|---|---|---|---|
| RealESRGAN_x4plus, x4plus_anime_6B, x2plus | 4/4/2 · ESRGAN | BSD-3 | github.com/xinntao/Real-ESRGAN releases (v0.1.0, v0.2.1, v0.2.2.4) |
| realesr-animevideov3 | 2/3/4 · compact | BSD-3 | ncnn zip içinde; `.pth` v0.2.5.0 |
| realesr-general-x4v3 / wdn-x4v3 | 4 · compact (4,9 MB) | BSD-3 | `…/Real-ESRGAN/releases/download/v0.2.5.0/realesr-general-x4v3.pth` (wdn = gürültü azaltma ayarlı eşi) |
| 4x-UltraSharp | 4 · ESRGAN | **CC-BY-NC-SA-4.0** | huggingface.co/Kim2091/UltraSharp (`.pth`, `.safetensors`, **NCNN/** fp16-fp32, ONNX) |
| 4x-UltraSharpV2 / V2_Lite | 4 · DAT / hafif | **CC-BY-NC-SA-4.0** | huggingface.co/Kim2091/UltraSharpV2 |
| 4x-Remacri (foolhardy) | 4 · ESRGAN | **CC-BY-NC-SA-4.0** (OpenModelDB) | huggingface.co/FacehugmanIII/4x_foolhardy_Remacri (HF kartında lisans yazılmamış) |
| 4x-ClearRealityV1 | 4 · SPAN | **CC-BY-NC-SA-4.0** | Kim2091 (mega.nz) |
| 4xHFA2k, 4xLSDIR, 4xNomos8kSC | 4 · ESRGAN | CC-BY-4.0 | github.com/Phhofm/models (raw/main) |
| 4xNomos2_hq_mosr | 4 · MoSR (17 MB, ONNX da var) | CC-BY-4.0 | Phhofm/models releases |
| 4xNomosWebPhoto_RealPLKSR | 4 · RealPLKSR | CC-BY-4.0 | Phhofm/models releases |
| 4xRealWebPhoto_v4_dat2 | 4 · DAT2 | CC-BY-4.0 | Phhofm/models releases |
| GFPGAN v1.4 | yüz 512 | Apache-2.0 (+ StyleGAN2 kökenli CUDA op'ları NVIDIA lisanslı; "clean" mimari bunları kullanmaz) | `github.com/TencentARC/GFPGAN/releases/download/v1.3.4/GFPGANv1.4.pth` (348 MB) |
| RestoreFormer | yüz | Apache-2.0 (GFPGAN deposu) | `…/GFPGAN/releases/download/v1.3.4/RestoreFormer.pth` |
| CodeFormer | yüz, `fidelity` 0–1 | **S-Lab License 1.0 — yalnız ticari olmayan** | `github.com/sczhou/CodeFormer/releases/download/v0.1.0/codeformer.pth` (377 MB) |
| facexlib RetinaFace (yüz bulucu) | — | MIT | `github.com/xinntao/facexlib/releases/download/v0.1.0/detection_Resnet50_Final.pth` (110 MB) · `parsing_parsenet.pth` v0.2.2 |

NC (ticari olmayan) modeller kişisel/prototip kullanımda serbesttir; ticari üründe kullanılamaz.

## 4. Python yolu: spandrel + facexlib

- `pip install spandrel` (0.4.2, MIT; Python 3.8–3.11). Mimariyi dosyadan kendisi bulur; `ImageModelDescriptor` girdi tensörünü alır, `scale` bilgisini verir.
- NC mimariler (CodeFormer vb.) ayrı paket: `spandrel_extra_arches.install()`.
- `pip install gfpgan` **önerilmez**: `basicsr`'a bağlı ve basicsr `torchvision.transforms.functional_tensor`'ı içe aktarır — torchvision 0.17'de kaldırıldı, güncel torch ile açılışta çöker. Yüz düzeltmede spandrel (model) + facexlib `FaceRestoreHelper` (bul/hizala/yapıştır) birlikte kullanılır.
- `.pth` = pickle; spandrel yalnız güvenli türleri açar ama riski sıfırlamaz. Yalnız resmî/yazar kaynağından indir, sha256 tut.
- Büyük görselde karo karo çalıştır (ör. 512 px + 32 px örtüşme), fp16 ile VRAM yarıya iner.

## 5. fal.ai uç noktaları (fiyatlar 12 Eki 2026, `fal.ai/models/<uç>/llms.txt`)

| Uç | Girdi alanları (özet) | Fiyat |
|---|---|---|
| `fal-ai/esrgan` | `image_url`, `scale` 1–8 (vars. 2), `tile`, `face` (GFPGAN), `model`: RealESRGAN_x4plus · x2plus · x4plus_anime_6B · x4_v3 · x4_wdn_v3 · x4_anime_v3, `output_format` png/jpeg | 0,00111 $/işlem saniyesi |
| `fal-ai/seedvr/upscale/image` (SeedVR2) | `image_url`, `upscale_mode` factor/target, `upscale_factor` 1–10, `target_resolution` 720p–2160p, `noise_scale` 0–1 (0,1), `seed`, `output_format` png/jpg/webp | 0,001 $/megapiksel |
| `fal-ai/topaz/upscale/image` | `model` (Standard V2, High Fidelity V2, Low Resolution V2, CGI, Text Refine, Wonder 3, Redefine, Recovery V2…), `upscale_factor` 1–4, `face_enhancement` (+ strength/creativity), `subject_detection`, `sharpen`, `output_format` | 0,08 $ (≤24 MP) · 0,16 $ (≤48 MP) · 0,32 $ (≤96 MP) |
| `fal-ai/clarity-upscaler` | `prompt`, `negative_prompt`, `upscale_factor` 1–4, `creativity` 0,35, `resemblance` 0,6, `guidance_scale`, `num_inference_steps` 18, `seed` | 0,03 $/megapiksel |
| `fal-ai/codeformer` | `image_url`, `fidelity` 0,5, `upscale_factor` 2, `face_upscale`, `only_center_face`, `aligned` | 0,0021 $/megapiksel |
| `fal-ai/recraft/upscale/crisp` | `image_url` | 0,004 $/görsel |
| `fal-ai/aura-sr`, `fal-ai/ccsr`, `fal-ai/creative-upscaler` | — | sayfada "0 $/işlem sn" yer tutucusu → fiyat belirsiz |

Akış (fal kuyruk protokolü): `POST queue.fal.run/{uç}` → `request_id` + `status_url/response_url/cancel_url`; durum yoklanır; sonuç JSON'unda `image.url` (CDN) indirilir. Yerel dosya önce fal CDN'e yüklenir. Başlık: `Authorization: Key …`.

## 6. Durum → Sonuç

| Durum | Sonuç |
|---|---|
| Python'suz, her kartta çalışsın | ncnn exe + x4plus / animevideov3 / UltraSharp NCNN |
| Topluluk modelleri (Nomos, HFA2k, DAT, SPAN) | spandrel + torch |
| Yüz bozuk | GFPGAN v1.4 (Apache) ya da CodeFormer (NC, `fidelity` ile ayar) + facexlib |
| 6 GB kart, 4K çıktı | ncnn `-t 128` ya da spandrel karo + fp16 |
| En yüksek kalite, ücret sorun değil | fal SeedVR2 / Topaz |
| Ticari ürün | NC modelleri (UltraSharp, Remacri, ClearReality, CodeFormer) çıkar |

## 7. Uygulama denemesi (12 Ekim 2026 gecesi — RTX 3060 Laptop 6 GB, Windows 11)

Kurulan: ncnn zip (yukarıdaki sha256 tuttu) · Python ortamına (torch 2.6.0+cu126, torchvision 0.21, Python 3.11) `uv pip install --no-deps spandrel==0.4.2 spandrel_extra_arches==0.2.0 facexlib==0.3.0 filterpy==1.4.5` (torch sürümü değişmedi; numba/scipy/opencv/einops zaten vardı).

**İndirilen ağırlıklar ve sha256** (GitHub bu eski sürümlerde digest yayımlamıyor → indirilen dosyadan; HF olanlar LFS oid'iyle aynı):

| Dosya | Kaynak | Bayt | sha256 |
|---|---|---|---|
| realesr-general-x4v3.pth | xinntao/Real-ESRGAN v0.2.5.0 | 4.885.111 | `8dc7edb9…6292` |
| realesr-general-wdn-x4v3.pth | aynı | 4.885.111 | `1641f8c4…6dca` |
| RealESRGAN_x2plus.pth | xinntao/Real-ESRGAN v0.2.1 | 67.061.725 | `49fafd45…6abb` |
| 4xLSDIRCompactC.pth | Phhofm/models | 1.260.671 | `4e31d4b0…9adc` |
| 4xNomos8kSC.pth | Phhofm/models | 67.076.350 | `d73b8926…8407` |
| 4xNomosWebPhoto_RealPLKSR.pth | Phhofm/models | 29.683.482 | `a9db66c9…efbbe` |
| 4xHFA2k_ludvae_realplksr_dysample.pth | Phhofm/models | 29.715.988 | `c6e44af1…f5ad` |
| 4xNomos2_hq_mosr.pth | Phhofm/models | 17.213.494 | `c60dbfc7…7ddc` |
| 4x-UltraSharp.pth / -fp16.param / -fp16.bin | HF Kim2091/UltraSharp | 66.961.958 / 165.579 / 33.424.520 | `a5812231…fe01` / `03320021…4174` / `713ce69a…8701` |
| 4x-UltraSharpV2.pth / _Lite.pth | HF Kim2091/UltraSharpV2 | 140.335.046 / 14.907.138 | `0335cf48…03cf` / `42d325ad…3aee` |
| 4x_foolhardy_Remacri.pth | HF FacehugmanIII | 67.025.055 | `e1a73bd8…a86a` |
| GFPGANv1.4.pth / RestoreFormer.pth | TencentARC/GFPGAN v1.3.4 | 348.632.874 / 290.785.322 | `e2cd4703…a5ad` / `07404d44…ace0` |
| codeformer.pth | sczhou/CodeFormer v0.1.0 | 376.637.898 | `1009e537…84b7` |
| detection_Resnet50_Final.pth / parsing_parsenet.pth | xinntao/facexlib v0.1.0 / v0.2.2 | 109.497.761 / 85.331.193 | `6d1de9c2…a16d` / `3d558d8d…de2` |

(sha256 değerleri burada kısaltıldı; tamamını sürüm sayfasından al.)

**1920×1080 → ×4 (7680×4320), süre açılış dahil, VRAM = nvidia-smi tepe artışı:**

| Model | Yol | Süre | VRAM |
|---|---|---|---|
| 4x-UltraSharp fp16 | ncnn (otomatik karo) | 15,2 sn | +1,3 GB |
| realesr-animevideov3 ×2 | ncnn | 1,3 sn | +0,1 GB |
| realesr-general-x4v3 / wdn / LSDIRCompactC (Compact) | spandrel fp16, karo 512 | 5,7 sn | +0,4 GB |
| RealESRGAN_x2plus (×2) | spandrel fp16 | 8,2 sn | +1,9 GB |
| 4xNomosWebPhoto RealPLKSR | spandrel (fp32 — PLKSR fp16 desteklemiyor) | 13,1 sn | +1,5 GB |
| 4xHFA2k RealPLKSR dysample | spandrel fp32 | 13,0 sn | +3,2 GB |
| 4xNomos2 hq MoSR | spandrel fp16 | 9,4 sn | +1,0 GB |
| 4x-UltraSharpV2 Lite | spandrel fp16 | 10,1 sn | +0,9 GB |
| 4x-UltraSharp / Remacri / Nomos8kSC (ESRGAN RRDB) | spandrel fp16, karo 512 | 30–36 sn | **+5,0 GB** (6 GB'ta sınırda → karo 256 öner) |
| 4x-UltraSharpV2 (DAT) | spandrel fp32, karo 256 | 164 sn | +3,7 GB |

- Aynı UltraSharp ağırlığı ncnn'de PyTorch'tan **2,3 kat hızlı ve ~4 kat az bellekli** (ESRGAN RRDB için ncnn açık ara iyi).
- Yüz düzeltme (320×180 iki kişili resim, ×4 + yüz): GFPGAN 1.4 / RestoreFormer / CodeFormer ~6,5–7 sn toplam, tepe ~1,6–2,0 GB. İki yüz de bulundu; CodeFormer en keskin, GFPGAN en doğal.
- spandrel'in `ImageModelDescriptor.__call__`'u GFPGAN için girişi [-1,1]'e çevirmiyor (RestoreFormer'da çeviriyor) → yüz modellerini `desc.model(x)[0]` ile, girişi elle normalize ederek çağır (CodeFormer: `model(x, weight=fidelity)[0]`). Çıkış [-1,1].
- `cv2.imread` Windows'ta Türkçe harfli / boşluklu yolda boş döner → `np.fromfile` + `cv2.imdecode` / `imencode` + `tofile`.
- facexlib `FaceRestoreHelper(model_rootpath=…)`: ağırlık o klasörde varsa indirmez; yoksa sessizce indirir → çevrim dışı çalışacaksa önce dosyanın varlığını denetle.

## 8. Küçük ve sıkıştırılmış kare denemesi (12 Ekim 2026 gecesi, "?" örnekleri için)

**Düzen.** Girdiler 1280×720 boyutunda iki kaynaktan geliyor. İkisinde de gerçek kişi yok:
- ffmpeg `testsrc2` karesi (renkli dama deseni),
- yerel Z-Image Turbo Q8 ile üretilmiş kurgusal bir yüz ve neon "LIVE 21:45" yazısı.

İkisi de 320×180'e küçültülüp JPEG q 10 ile sıkıştırıldı. Sonra her model aynı hatla (ncnn exe ya da Python + spandrel betiği) sırayla çalıştırıldı.

**Ölçüm yöntemi**
- Kalite: SSIM, 1280×720 aslına göre (1 = birebir). Aynı girdinin bicubic ×4 büyütmesi taban olarak alındı: yüz 0,846 · desen 0,794.
- Süre: görsel başına, süreç ve kart açılışı dahil. Her iş ayrı bir süreç olduğu için kullanıcının gördüğü süre bu.
- VRAM: Windows GPU sayacındaki tepe artışı.
- Makine boştu (ölçüm iki kez alındı; birinci koşu derlemeyle çakıştığı için atıldı).

| Model | Yol | Süre (ilk / sonraki) | VRAM | SSIM yüz · desen | Gözlem (yakın kırpım) |
|---|---|---|---|---|---|
| realesrgan-x4plus | ncnn | 12,6 / 6,6 sn | 1,1 GB | 0,851 · 0,686 | Yazı temiz ve kalın. Yüz yağlı boya gibi düzleşiyor. İnce dama deseni siliniyor. İlk görsel ncnn kart taramasını da içeriyor. |
| realesrgan-x4plus-anime | ncnn | 3,8 / 2,8 sn | 1,0 GB | 0,842 · 0,849 | Çizgi ve yazıda en temiz sonuç. Yüz plastik görünüyor. Deseni düzleştiriyor ama SSIM yüksek çıkıyor. |
| realesr-animevideov3 | ncnn | 1,7 / 2,0 sn | 0,1 GB | 0,850 · 0,796 | En hızlısı ve girdiye en sadık olanı. Az iyileştiriyor. |
| 4x-UltraSharp | ncnn | 6,3 / 6,7 sn | 1,1 GB | 0,822 · 0,635 | Keskin, deseni koruyor. Yüzde kontrast ve çizik artıyor. PyTorch sürümüyle aynı görüntüyü veriyor. |
| realesr-general-x4v3 | PyTorch | 6,7 / 5,4 sn | 0,2 GB | 0,844 · 0,742 | Dengeli ve hafif. Desenin kenarlarını yumuşatıyor. |
| realesr-general-wdn-x4v3 | PyTorch | 5,4 / 5,3 sn | 0,2 GB | 0,831 · 0,710 | Gürültüyü azaltıyor, daha yumuşak. Deseni bulanıklaştırıyor. |
| realesrgan-x2plus (×2) | PyTorch | 5,9 / 6,4 sn | 0,3 GB | 0,859 · 0,626 | Yüz iyi. Desende dalgalı gürültü var. SSIM'i ×4 boya bicubic büyütülerek ölçüldü. |
| 4xLSDIRCompactC | PyTorch | 5,2 / 5,2 sn | 0,2 GB | 0,834 · 0,710 | Hızlı. Desende kumlu doku uyduruyor. |
| 4xNomos8kSC | PyTorch | 6,1 / 6,4 sn | 0,8 GB | 0,810 · 0,688 | Yüz dalgalı ve boyalı görünüyor. Deseni siliyor. |
| 4xNomosWebPhoto RealPLKSR | PyTorch | 6,3 / 5,8 sn | 0,3 GB | 0,791 · 0,796 | Fotoğraf dokusu ekliyor. Yüzde en düşük SSIM. |
| 4xHFA2k RealPLKSR | PyTorch | 6,0 / 5,9 sn | 0,5 GB | 0,831 · 0,476 | Yazıda iyi. Desen renklerini soldurup çizgiye çeviriyor (en düşük SSIM). |
| 4xNomos2 hq MoSR | PyTorch | 5,7 / 6,3 sn | 0,3 GB | 0,792 · 0,651 | **JPEG bloklarını büyütüyor:** yüzde ve yazıda kare izleri kalıyor. Sıkıştırılmış karede kötü. |
| 4x-UltraSharp | PyTorch | 6,4 / 6,3 sn | 0,8 GB | 0,823 · 0,637 | ncnn sürümüyle aynı görüntü. |
| 4x-UltraSharpV2 (DAT) | PyTorch | 10,2 / 10,7 sn | 1,6 GB | 0,847 · 0,848 | **Genelde en iyisi.** Yüz doğal, yazı temiz, desen korunuyor. En yavaşı. |
| 4x-UltraSharpV2 Lite | PyTorch | 6,1 / 6,0 sn | 0,3 GB | 0,842 · 0,807 | Hızlı ve iyi. Desen kenarlarında hafif izler kalıyor. |
| 4x Remacri | PyTorch | 6,2 / 6,9 sn | 0,8 GB | 0,857 · 0,554 | ×4 modeller arasında yüzde en yüksek SSIM. Desende zayıf. |
| GFPGAN 1.4 (general x4v3 üstüne) | PyTorch | 8,6 sn | 1,5 GB | 0,843 · — | Göz, diş ve gözlük belirginleşiyor. En doğal yüz. |
| RestoreFormer (aynı) | PyTorch | 8,3 sn | 1,9 GB | 0,842 · — | Doğal, biraz parlak. |
| CodeFormer (aynı) | PyTorch | 9,3 sn | 1,9 GB | 0,839 · — | En keskin yüz. Yüz hatları biraz değişiyor. |

**Sonuç**
- Küçük ve JPEG sıkıştırılmış karede modellerin çoğu SSIM'de bicubic tabanı geçemiyor. GAN tabanlı modeller ayrıntı uyduruyor ve gürültüyü siliyor; bu, aslından uzaklaşmak demek. Göz ise keskinliği tercih ediyor. Bu yüzden SSIM'e tek başına bakılmamalı.
- Gözle en iyiler:
  - genel: UltraSharpV2 ve UltraSharpV2 Lite,
  - yazı ve çizim: x4plus-anime,
  - hız ve girdiye sadakat: animevideov3,
  - yüz: büyütücünün üstüne GFPGAN.
- MoSR, JPEG'li girdi için önerilmemeli.
- 320×180 boyutunda süreyi model değil süreç açılışı belirliyor. PyTorch tarafında süreler ~5–6 sn'de topluyor (Python ve torch yükleme süresi).

**Tekrar üretme**
- Aynı küçük girdiyi her modelden geçiren bir toplu deneme betiği yaz; çıktıları model adıyla ayrı klasöre koy.
- Önceki denemelerin örneklerini silme; tarih klasörüyle ayır, karşılaştırma kolaylaşır.
- Çevrim içi (fal) uçlarına istek atılmadı; bunların örneği yok.

## Kaynaklar

- [xinntao/Real-ESRGAN-ncnn-vulkan](https://github.com/xinntao/Real-ESRGAN-ncnn-vulkan) — CLI, MIT
- [xinntao/Real-ESRGAN releases](https://github.com/xinntao/Real-ESRGAN/releases) · [model zoo](https://github.com/xinntao/Real-ESRGAN/blob/master/docs/model_zoo.md) — BSD-3
- [chaiNNer-org/spandrel](https://github.com/chaiNNer-org/spandrel) — desteklenen mimariler, extra_arches lisans ayrımı
- [OpenModelDB](https://openmodeldb.info) · [veri deposu](https://github.com/OpenModelDB/open-model-database) — model lisans/kaynak kayıtları
- [TencentARC/GFPGAN](https://github.com/TencentARC/GFPGAN) · [sczhou/CodeFormer](https://github.com/sczhou/CodeFormer) · [xinntao/facexlib](https://github.com/xinntao/facexlib)
- [Kim2091/UltraSharp](https://huggingface.co/Kim2091/UltraSharp) · [Kim2091/UltraSharpV2](https://huggingface.co/Kim2091/UltraSharpV2) · [Phhofm/models](https://github.com/Phhofm/models)
- [ByteDance-Seed/SeedVR](https://github.com/ByteDance-Seed/SeedVR) — Apache-2.0
- fal: [esrgan](https://fal.ai/models/fal-ai/esrgan) · [seedvr upscale image](https://fal.ai/models/fal-ai/seedvr/upscale/image) · [topaz](https://fal.ai/models/fal-ai/topaz/upscale/image) · [clarity-upscaler](https://fal.ai/models/fal-ai/clarity-upscaler) · [codeformer](https://fal.ai/models/fal-ai/codeformer) · [recraft crisp](https://fal.ai/models/fal-ai/recraft/upscale/crisp)

Araştırma tarihi: 12 Ekim 2026. Fiyat ve sürümler değişir; kullanmadan önce kaynaktan doğrula.


---

← [Görüntü Netleştirme](../)
