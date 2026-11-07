# Remotion ve Kodla Video

React kodundan video üreten Remotion'un kısa başvurusu: nasıl çalışır (React → kare → FFmpeg), parçaları (Studio, CLI, Player, Lambda, web renderer, Electron), en kısa örnek kod, yapay zekâ ile kullanım (Agent Skills, Claude API maliyeti, yerel LLM'in sınırları), lisans ve güncel fiyatlar, düşük VRAM'de yerel TTS / görsel / geçiş / altyazı seçenekleri, alternatifler (HyperFrames, Revideo, Motion Canvas, editly, MoviePy, Manim, Lottie/Skottie, Rive) ve "Durum → Öneri" karar tablosu.

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

> Araştırma tarihi: 12 Ekim 2026. Fiyat, lisans, sürüm ve model boyutları sık değişir; kullanmadan önce resmî sayfadan teyit et. Doğrulanmayan bilgiler sayfada **TAHMİN** / **ÇELİŞKİLİ** etiketli. Hukuki danışmanlık değildir. Hiçbir model veya render bu araştırmada denenmedi; yalnız belgeler okundu (aksi yazılmadıkça).

## Bölümler

| § | Başlık | Kısaca |
|---|---|---|
| 1 | Bir bakışta | Ücretsiz kime, şirket fiyatı, açık kaynak değil |
| 2 | Nasıl çalışır | `useCurrentFrame` → başsız Chrome kare → FFmpeg; paralel kodlama |
| 3 | Parçalar | Studio, CLI, renderer, Player, Lambda, web renderer, Electron, şablonlar |
| 4 | En kısa örnek | Bir kompozisyon + `npx remotion render` |
| 5 | AI ile kullanım | Agent Skills, prompt-to-video şablonları, Claude API fiyatı, abonelik girişi yasağı |
| 6 | Yerel LLM ile | Küçük model JSON doldurur, TSX yazmada zayıf; VRAM tablosu |
| 7 | Lisans ve fiyat | Ücretsiz / Creators / Automators / Enterprise; ürüne gömme belirsiz; 5.0 telemetrisi |
| 8 | Yerel imkânlar | TTS, görsel, geçiş, altyazı — 4/6/8/12–16/24 GB |
| 9 | Alternatifler | Lisans + dil + ne için; GSAP uyarısı |
| 10 | Kendi çizicini yazmak | Skia + FFmpeg + Skottie; LLM'e JSON sahne tarifi |
| 11 | Durum → Öneri | Bireysel deneme, ürüne gömme, SaaS, sunucu, düşük/yüksek VRAM |

## İlgili konular

- [Görüntü Netleştirme](../goruntu-netlestirme/) — yerel görsel büyütme/yüz düzeltme modelleri; videodaki kareler için de kullanılabilir.
- [Yerel Çok Dilli TTS](../yerel-tts/) — yerel TTS modellerinin daha yeni (Kasım 2026) ve ayrıntılı araştırması; bu sayfadaki yerel TTS bölümüyle (Ekim 2026) çelişen yerde o araştırmaya bakılır.
- [JavaScript / TypeScript](../../JavaScript-TypeScript/) — Remotion bir React çatısıdır; React temeli için.

## Kaynakça

**Remotion**
- https://www.remotion.dev/docs/the-fundamentals
- https://www.remotion.dev/docs/renderer
- https://www.remotion.dev/docs/parallel-encoding
- https://remotion.dev/docs/cli/render
- https://www.remotion.dev/docs/miscellaneous/chrome-headless-shell
- https://www.remotion.dev/docs/player
- https://www.remotion.dev/docs/lambda/how-lambda-works
- https://www.remotion.dev/docs/client-side-rendering
- https://www.remotion.dev/docs/electron
- https://www.remotion.dev/templates
- https://remotion.dev/templates/prompt-to-motion-graphics
- https://www.remotion.dev/docs/ai
- https://www.remotion.dev/docs/ai/skills
- https://www.remotion.dev/docs/ai/mcp
- https://www.remotion.dev/docs/ai/generate
- https://www.remotion.dev/docs/ai/ai-saas-template
- https://www.remotion.dev/docs/schemas
- https://www.remotion.dev/docs/install-whisper-cpp/transcribe
- https://registry.npmjs.org/remotion/latest

**Remotion lisansı**
- https://www.remotion.pro/license
- https://raw.githubusercontent.com/remotion-dev/remotion/main/LICENSE.md
- https://www.remotion.dev/docs/license/faq
- https://www.remotion.dev/docs/license/telemetry
- https://www.remotion.dev/docs/5-0-migration

**Claude / Anthropic**
- https://platform.claude.com/docs/en/about-claude/pricing
- https://platform.claude.com/docs/en/about-claude/models/overview
- https://code.claude.com/docs/en/legal-and-compliance
- https://platform.claude.com/docs/en/about-claude/api-credits-for-subscribers
- https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-and-team-plans

**Yerel LLM**
- https://ollama.com/blog/structured-outputs
- https://docs.ollama.com/capabilities/structured-outputs
- https://docs.ollama.com/context-length
- https://github.com/ollama/ollama/issues/14645
- https://docs.liquid.ai/deployment/on-device/llama-cpp/structured-output
- https://arxiv.org/pdf/2502.14969
- https://github.com/vectara/hallucination-leaderboard
- https://ollama.com/library/gemma4/tags
- https://ai.google.dev/gemma/docs/gemma_4_license
- https://ollama.com/library/qwen3.5/tags
- https://ollama.com/library/qwen3-coder/tags
- https://ollama.com/library/qwen2.5-coder/tags
- https://ollama.com/library/ministral-3
- https://ollama.com/library/gpt-oss
- https://huggingface.co/microsoft/Phi-4-mini-instruct

**Alternatifler**
- https://github.com/heygen-com/hyperframes
- https://gsap.com/standard-license/
- https://github.com/redotvideo/revideo
- https://motioncanvas.io/docs/rendering
- https://github.com/mifi/editly
- https://github.com/Zulko/moviepy
- https://github.com/tnfe/FFCreator
- https://github.com/ManimCommunity/manim
- https://github.com/airbnb/lottie-web
- https://www.nuget.org/packages/SkiaSharp.Skottie
- https://github.com/rive-app/rive-runtime
- https://rive.app/pricing

**Yerel TTS / görsel / geçiş / altyazı**
- https://github.com/resemble-ai/chatterbox
- https://github.com/OpenBMB/VoxCPM
- https://huggingface.co/Trendyol/Trendyol-TTS
- https://huggingface.co/hexgrad/Kokoro-82M
- https://huggingface.co/coqui/XTTS-v2
- https://huggingface.co/facebook/mms-tts-tur
- https://huggingface.co/Tongyi-MAI/Z-Image-Turbo
- https://huggingface.co/black-forest-labs/FLUX.2-klein-4B
- https://huggingface.co/ByteDance/SDXL-Lightning
- https://github.com/leejet/stable-diffusion.cpp
- https://github.com/hzwer/Practical-RIFE
- https://github.com/lllyasviel/FramePack
- https://github.com/Wan-Video/Wan2.2
- https://huggingface.co/Wan-AI/Wan2.1-FLF2V-14B-720P
- https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5
- https://github.com/ggml-org/whisper.cpp/tree/master/examples/cli
- https://github.com/m-bain/whisperX
- https://huggingface.co/mpoyraz/wav2vec2-xls-r-300m-cv7-turkish


---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../README.md)
