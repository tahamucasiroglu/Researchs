# Image-to-Pixel — piksel sanatı aracı (araştırma)

Image-to-Pixel, görselleri ve videoları piksel sanatına (az renkli, büyük ve keskin pikselli retro görünüm) çeviren açık kaynak bir JavaScript motoru ve tarayıcı editörüdür. İşi palet seçimi (sabit renk listesi), dithering (az renkle ara tonu taklit eden piksel deseni) ve küçült-büyüt adımlarıyla yapar. WebGL 2 ile GPU'da, WebGL yoksa CPU'da (Node.js dahil) aynı sonucu üretir. MIT lisanslı olduğu için ticari ve kapalı kaynak üründe kullanılabilir. Bu klasör aracın özelliklerini, lisansını, bir .NET masaüstü video aracında nasıl kullanılabileceğini ve .NET/ffmpeg alternatiflerini özetler.

- Yapay zekâ için saf Markdown: [arastirma.md](arastirma.md)
- HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)


## Sayfadaki başlıklar

1. Terimler (palet, dithering, Bayer, hata dağıtımı, OKLab, WebCodecs)
2. Özellikler ve işlem hattı (GPU "dalga" yöntemiyle hata dağıtımı, CPU yolu)
3. Kütüphane kullanımı (npm, Node.js)
4. Depo ve bakım durumu
5. Lisans ve ticari kullanım
6. Masaüstü video aracında kullanım senaryoları
7. Alternatifler: ffmpeg, SkiaSharp, ImageSharp, Magick.NET, libimagequant
8. Durum → sonuç

## Kısa özet

- **Lisans:** MIT (3.0.1); tek çalışma bağımlılığı ShaderMate de MIT. Şart yalnız telif/izin notunu korumak.
- **Video:** PNG/GIF/WebM/MP4 çıktı var, ses yok; kodlama tarayıcının WebCodecs arayüzüyle.
- **.NET masaüstünde:** gömmek yerine algoritmayı SkiaSharp ile yazmak (görsel) ve ffmpeg `paletteuse=dither=bayer` (video) daha uygun. JS tabanlı video hattında (Remotion gibi) paket doğrudan kullanılır.

## İlgili konular

- [JavaScript / TypeScript](../../) — aracın yazıldığı dil.
- [C# / .NET](../../../CSharp-DotNet/) — algoritmayı yerel olarak yazma seçeneği.
- [Yapay Zekâ › kodla video](../../../Yapay-Zeka/kodla-video/) — Remotion ile video üretiminde paketin doğrudan kullanımı.

## Kaynaklar

- [Image-to-Pixel deposu](https://github.com/Tezumie/Image-to-Pixel) · [Editör](https://tezumie.github.io/Image-to-Pixel/editor/) · [Belgeler](https://tezumie.github.io/Image-to-Pixel/docs/)
- [ShaderMate (npm)](https://www.npmjs.com/package/shadermate)
- [ffmpeg paletteuse](https://ffmpeg.org/ffmpeg-filters.html#paletteuse)
- [ImageSharp lisansı](https://github.com/SixLabors/ImageSharp/blob/main/LICENSE) · [Magick.NET](https://github.com/dlemstra/Magick.NET) · [libimagequant](https://github.com/ImageOptim/libimagequant)

Araştırma tarihi: 15 Ekim 2026. Lisans bilgisi hukuki görüş değildir.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../../README.md)
