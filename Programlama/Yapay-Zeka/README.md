# Yapay Zekâ

Hazır yapay zekâ modellerini uygulamalarda kullanmaya dair araştırmalar ve denemeler: hangi model, hangi lisans, hangi donanım, yerelde mi bulutta mı. Yapay zekâ kodlama ajanlarıyla çalışma düzeni (süreç şablonları, komut ve skill setleri) de bu bölümdedir. Blockchain gibi bu da bir dil değil **alan**dır; örnekler Python (PyTorch), C# ve komut satırı araçlarıyla verilir. Konular çalışıldıkça eklenir.

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

## Konular

| Konu | Açıklama |
|---|---|
| [Görüntü Netleştirme](goruntu-netlestirme/) | Düşük çözünürlüklü/bulanık görseli 2×–4× büyütüp ayrıntıyı yeniden kuran super-resolution modelleri (Real-ESRGAN, UltraSharp, DAT…) ve yüz düzeltme (GFPGAN, CodeFormer); ncnn-vulkan, PyTorch + spandrel ve bulut API yolları, lisanslar, 6 GB kartta ölçümler. |
| [Kodla Video (Remotion)](kodla-video/) | React kodundan video üreten Remotion: çalışma mantığı, parçaları, yapay zekâ ile kullanımı, lisans ve fiyat; düşük VRAM'de yerel TTS, görsel ve altyazı seçenekleri; HyperFrames, Motion Canvas, MoviePy, Manim gibi alternatifler. |
| [Video Üretim Sistemi](video-uretim-sistemi/) | Claude ile 12 dk yatay ve dikey, TR/EN belgesel tarzı (tarih, nasıl yapılır, gizemler) video üretim sistemi kurma yolları: Claude web/API ve aylık kredi gerçeği, senaryo doğrulama, TTS, stok/arşiv/AI görsel, sahne bazlı revizyon, maliyet, YPP riski. |
| [Yerel Çok Dilli TTS](yerel-tts/) | Bilgisayarda çalışan (yerel) çok dilli metinden sese (TTS) modellerinin Kasım 2026 araştırması: Türkçe desteği ve ölçümleri, ses klonlama, ağırlık lisansları ve ticari kullanım, donanım ihtiyacı, sherpa-onnx / ONNX Runtime / GGUF ile Python'suz çalışma yolları; ihtiyaca göre aday tablosu ve 23 modellik karşılaştırma. |
| [AI-Native Engineering Workspace (ANEW)](ai-native-engineering-workspace/) | Yapay zekâ kodlama ajanlarıyla (Claude Code, Codex, Cursor, GitHub Copilot) geliştirirken bağlamı, spec'leri, onayları ve kanıtı sohbet yerine dosyalarda tutan repo şablonu ANEW'in sıfırdan öğrenme rehberi: ilk kurulum, 12 komut ve 7 betik, sonradan özellik ekleme, değişiklik isteği, hata düzeltme, 13 kurtarma senaryosu, örnek senaryo ve video notları (v1.26.1; şablon denenmedi, repo ve video altyazısı okundu). |

## Nereden başlamalı?

- **Hiç programlama bilmiyorsan:** önce [Python](../Python/) temelleri; yapay zekâ kütüphanelerinin çoğu Python'dadır.
- **Başka bir dilden geliyorsan:** modeli komut satırı aracı veya HTTP API olarak kendi dilinden çağırabilirsin.
- **Ticari üründe kullanacaksan:** her modelin lisansını ayrıca kontrol et; birçok topluluk modeli yalnız ticari olmayan kullanıma izin verir.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
