# Image-to-Pixel — görseli ve videoyu piksel sanatına çevirme (araştırma)

Araştırma tarihi: 15.10.2026. Yöntem: yalnız okuma (depo, belgeler, npm kaydı, GitHub API). Hiçbir şey indirilip çalıştırılmadı.
Güven etiketleri: **RESMÎ** (projenin kendi belgesi/deposu), **3. TARAF**, **TAHMİN**, **DOĞRULANAMADI**.

## 1. Özet

| Soru | Cevap |
|---|---|
| Ne? | Görseli/videoyu piksel sanatına çeviren açık kaynak JavaScript motoru + tarayıcı editörü (RESMÎ) |
| Teknoloji | WebGL 2 shader geçişleri (ShaderMate) + bit düzeyinde aynı sonucu veren CPU yolu; Node.js'te de çalışır (RESMÎ) |
| Lisans | MIT (3.0.1, tüm depo); tek çalışma bağımlılığı `shadermate` da MIT (RESMÎ) |
| Ticari kullanım | Serbest; şart: telif + izin metnini korumak (RESMÎ, MIT metni) |
| Bir masaüstü video aracı için öneri | Gömmek yerine algoritmayı yerel dilde yazmak (görsel) + ffmpeg `paletteuse` (video); JS tabanlı video hattında (ör. Remotion) paket doğrudan kullanılabilir (TAHMİN/değerlendirme) |

## 2. Terimler

- **Piksel sanatı**: az sayıda büyük, keskin piksel ve sınırlı renkle yapılan retro görünüm.
- **Palet**: kullanılabilecek sabit renk listesi (ör. PICO-8'in 16 rengi).
- **Dithering (titreşim)**: az renkle ara tonları taklit etmek için pikselleri desenli dağıtmak.
- **Sıralı (ordered) / Bayer**: sabit eşik matrisiyle titreşim; kareden kareye kararlı.
- **Hata dağıtımı (error diffusion)**: Floyd–Steinberg, Atkinson, Sierra, Burkes, Jarvis, Stucki; her pikselin renk hatası komşulara aktarılır.
- **OKLab**: algıya göre düzenlenmiş renk uzayı; eşit uzaklık eşit fark gibi görünür.
- **WebCodecs**: tarayıcının yerleşik video kodlama/çözme API'si.

## 3. Özellikler (RESMÎ — README ve belgeler)

| Alan | Ayrıntı |
|---|---|
| Boyut | Çıktı genişliği veya piksel boyutu; kutu / en yakın komşu küçültme; büyütülmüş piksel sanatında ızgara bulma (`detectGrid`) |
| Palet | 24 hazır; görselden çıkarma; elle; .gpl / .hex / .pal / .txt / JSON içe alma; Lospec'ten çekme (çevrimiçi) |
| Titreşim | 16 yöntem: Bayer, kümeli nokta, mavi gürültü, özel matris, Floyd–Steinberg, Atkinson, Sierra ailesi, Burkes, Jarvis, Stucki; güç ayarı |
| Ayar/temizlik | Ton ayarları, saydamlık eşiği, tek pikselleri silme, 3×3 çoğunluk süzgeci, dış çizgi |
| Çıktı | Tam sayı katı büyütülmüş PNG, indeksli PNG, GIF, WebM (VP9→VP8), MP4 (H.264), PNG dizisi, sprite sheet + JSON atlas, tileset, ZIP |
| Video | Kare kare doğru işleme (`forEachFrame`); kodlama WebCodecs; MP4/WebM kapsayıcısı projenin kendi MIT kodu; tek video izi, **ses belgelerde yok** |
| Toplu işlem | Çok dosya, tek ayar, tek ZIP |
| Gömme | `mountEditor()` ile editör başka sayfaya gömülür |

### İşlem hattı (RESMÎ — "How it works")

1. `prep`: küçült (kutu/en yakın), ayarlar, saydamlık kesimi (32-bit float).
2. `quant`: sıralı eşik + en yakın palet rengi (Perceptual kipte OKLab). Sıralı titreşim gücü, palet renkleri arası ortalama uzaklığa göre ölçeklenir.
3. `diffuse`: hata dağıtımı. GPU'da "dalga" yöntemi: her çekirdek ofseti hatayı daha sonraki `x + s·y` dalgasına iter, aynı dalgadaki pikseller bağımsızdır (`s=2`: Floyd–Steinberg/Atkinson/Sierra Lite; `s=3`: Jarvis/Stucki/Burkes/Sierra). 96×64 görsel = 222 çizim. Yazılımsal WebGL'de CPU daha hızlı olduğundan `diffusion: 'auto'` CPU'ya düşer.
4. `resolve` → `orphan` + `smooth` temizlik → `out` dış çizgi.
- CPU yolu shader ile "satır satır aynı"; `texelFetch` + tam sayı koordinat → GPU ve CPU bit düzeyinde aynı (çok büyük görselde birkaç eşit uzaklıklı piksel istisna).

### Kütüphane kullanımı (RESMÎ)

```js
import { createPixelator } from 'image-to-pixel';
const px = await createPixelator();            // backend: 'auto' | 'webgl' | 'cpu'
const r = await px.process(source, {
  size: { width: 128 },
  palette: { source: 'builtin', id: 'pico-8' },
  dither: { method: 'floyd-steinberg', strength: 0.8 },
});
// r.width, r.height, r.data (RGBA Uint8ClampedArray), r.palette, r.toPNG({ scale: 8 })
```

- Girdi: canvas, img, video karesi, ImageData, Blob/File, URL, p5/q5 görseli veya `{ width, height, data }` RGBA.
- Node: CPU arka ucu; görseli başka kütüphaneyle (sharp, pngjs, @napi-rs/canvas) çözüp ham RGBA verilir; `encodePNG`, `encodeGIF`, `createZip` DOM istemez.
- Paket girişleri: `image-to-pixel`, `image-to-pixel/video`, `image-to-pixel/editor` (+ `editor.css`).

## 4. Depo ve bakım (RESMÎ — GitHub API, 15.10.2026)

| Ölçüt | Değer |
|---|---|
| Yıldız / çatal / açık konu | 370 / 39 / 0 |
| Commit | 131 (main) |
| Oluşturma | Temmuz 2023 |
| Son itme | 14.10.2026 (sürüm 3.0.0 → 3.0.1: yeni editör, GPU motoru, npm paketi, tek MIT lisansı) |
| Önceki etkinlik | Ağu 2025 (README), Eki 2024 (kod) |
| Paket | `image-to-pixel` 3.0.1, Node ≥ 18 |

Değerlendirme (TAHMİN): tek geliştiricili, ara ara yoğun çalışılan bir proje. 3.x yeni yayımlandı, sahada az denenmiş.

## 5. Lisans ve ticari kullanım

- `LICENSE`: **MIT License**, telif 2023–2026 (RESMÎ). `package.json` `"license": "MIT"`; GitHub SPDX `MIT`.
- MIT izinleri: kullanma, kopyalama, değiştirme, birleştirme, yayınlama, dağıtma, alt lisanslama, satma. Kapalı kaynak üründe kullanılabilir; başka dile çeviri (türev iş) serbest.
- Şart: kopyalarda telif satırı + izin metni. Garanti yok.
- Bağımlılık: `shadermate` 2.0.0, **MIT**, çalışma bağımlılığı yok (RESMÎ, npm kaydı). Geliştirme bağımlılıkları (esbuild, marked, highlight.js) yayımlanan pakete girmiyor.
- Çıktı görseller: MIT çıktıya şart koymaz; hak girdi görselin sahibindedir.
- **DOĞRULANAMADI**: Lospec paletlerinin kullanım şartları; 2024'teki "Delete LICENSE" commit'i sonrası eski sürümlerin lisans durumu. Kod alınacaksa yalnız 3.0.1+ esas alınmalı.

## 6. Bir masaüstü video aracında kullanım (değerlendirme)

Varsayılan yığın: .NET masaüstü (Avalonia), SkiaSharp çizim, ffmpeg render, ayrıca JS tabanlı (Remotion) video üretimi.

| Senaryo | Bağlama yolu | Not |
|---|---|---|
| Klip efekti "piksel sanatı/retro" | ffmpeg: `scale=…:flags=area` → `paletteuse=dither=bayer` (palet PNG ikinci girdi) → `scale=…:flags=neighbor` | Yeni bağımlılık yok; videoda Bayer kararlı (hata dağıtımı kareler arası kıpırdar — TAHMİN, ölçülmedi) |
| Emote / filigran / küçük resim | Algoritmayı C#/SkiaSharp'a taşı: en yakın komşu küçültme + OKLab en yakın renk + Bayer/Floyd–Steinberg | Birkaç yüz satır (TAHMİN); Bayer için `SKRuntimeEffect` (SkSL) de olur |
| Üretilmiş görsele son işlem | Aynı C# kodu | — |
| JS/Remotion video | `npm i image-to-pixel`, canvas'ta doğrudan | Çeviri gerekmez, MIT notu yeter |
| WebView'da editör | Önerilmez | Masaüstü UI çatısında WebView ek bileşen ister (ayrıntı DOĞRULANAMADI); kare taşıma yavaş; ses yok |

## 7. Alternatifler

| Seçenek | Ne verir | Lisans | Not |
|---|---|---|---|
| ffmpeg `palettegen`/`paletteuse` + `scale=neighbor`/`pixelize` | Palet (≤256), titreşim: bayer, heckbert, floyd_steinberg, sierra2, sierra2_4a, sierra3, burkes, atkinson (ffmpeg 9.0.1 yardım çıktısı) | LGPL/GPL (derlemeye göre) | Video için en pratik; palet eşleme RGB, OKLab yok |
| SkiaSharp + kendi kod | En yakın komşu ölçekleme hazır; palet/titreşim elle | MIT | Tam denetim |
| ImageSharp | `Quantize` (sabit palet), 14 titreşim (Bayer 2/4/8/16, Ordered3x3, Atkinson, Burks, Floyd–Steinberg, Jarvis, Sierra2/3/Lite, Stevenson–Arce, Stucki), `Pixelate` | Six Labors Split License: açık kaynak, kâr amaçsız veya yıllık ciro < 1M $ → Apache-2.0; diğerleri ücretli | Hazır ama ciro şartı var |
| Magick.NET (ImageMagick) | `-remap`, `-ordered-dither`, Floyd–Steinberg/Riemersma | Apache-2.0 (15.0.0, 10.10.2026) | Ticari serbest; büyük yerel ikili |
| libimagequant (pngquant) | Kaliteli palet çıkarma | GPL-3.0 veya ücretli ticari | Kapalı üründe ücretli |

## 8. Durum → sonuç

- **JS/web projesi** → paketi doğrudan kullan (MIT).
- **.NET/masaüstü, yalnız tek görsel** → algoritmayı SkiaSharp ile yaz; bu projeyi başvuru kaynağı yap.
- **Video efekti, ffmpeg zaten var** → `paletteuse=dither=bayer` zinciri.
- **Hazır .NET kütüphanesi isteniyor, ciro < 1M $** → ImageSharp; büyüme ihtimali varsa Magick.NET (Apache-2.0).
- **Sprite sheet/tileset (oyun)** → bu araç doğrudan uygun.

## 9. Kaynakça

- Editör: https://tezumie.github.io/Image-to-Pixel/editor/
- Belgeler: https://tezumie.github.io/Image-to-Pixel/docs/ (how-it-works, library, video-api)
- Depo: https://github.com/Tezumie/Image-to-Pixel (LICENSE, package.json, commit geçmişi)
- ShaderMate: https://www.npmjs.com/package/shadermate · https://github.com/Tezumie/ShaderMate
- ffmpeg filtreleri: https://ffmpeg.org/ffmpeg-filters.html#paletteuse
- ImageSharp lisansı: https://github.com/SixLabors/ImageSharp/blob/main/LICENSE · titreşimler: https://docs.sixlabors.com/api/ImageSharp/SixLabors.ImageSharp.Processing.KnownDitherings.html
- Magick.NET: https://github.com/dlemstra/Magick.NET
- libimagequant: https://github.com/ImageOptim/libimagequant

Lisans bilgisi hukuki görüş değildir; sürüm ve sayılar değişebilir.
