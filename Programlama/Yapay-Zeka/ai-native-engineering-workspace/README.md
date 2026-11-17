# AI-Native Engineering Workspace (ANEW)

ANEW, yapay zekâ ajanlarıyla yazılım geliştirirken bağlamı, kararları, spec'leri ve kanıtı sohbet yerine **dosyalarda** tutan, araçtan ve teknolojiden bağımsız bir repo şablonudur. Kütüphane ya da kod üreteci değildir: Markdown dosyaları (kurallar, süreç tanımları, prompt gövdeleri, spec ve plan şablonları) ile birkaç POSIX kabuk betiğinden oluşur ve projenin içine kopyalanır. Her iş `INTENT → CLARIFY → SPEC → PLAN → BUILD → REVIEW → VERIFY → SHIP` omurgasından geçer; dört yerde (spec onayı, plan onayı, bulgu triyajı, teslim) kararı insan verir; işi üreten oturum kendi işini denetleyemez; "bitti" demek için her kabul kriterinin bir kanıta bağlanması gerekir. Claude Code, GitHub Copilot, Cursor ve Codex için hazır adaptörleri vardır; başka araçlarla elle kullanılır. Tek geliştiriciye (lite mod) ve rollerin ayrı oturumlarda çalıştığı ekiplere (strict mod) göre ayarlanır.

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

> Araştırma tarihi: 17 Kasım 2026. İncelenen sürüm: `v1.26.1` (commit `e51f246`, 16.11.2026), MIT lisansı. Repo dosyaları ve videonun otomatik altyazısı okundu; **şablon bir projede çalıştırılarak denenmedi**, hiçbir betik çalıştırılmadı. Çıkarımlar **TAHMİN**, birbirini tutmayan kaynaklar **ÇELİŞKİLİ** diye etiketlidir. Şablon hızlı değişiyor; kullanmadan önce reponun `CHANGELOG.md` dosyasına bakın.

## İçindekiler

- [index.html](index.html) — Okumalık, tasarımlı anlatım: ANEW'i hiç görmemiş biri için baştan sona öğretici; ilk kurulum, 12 komut, 7 betik, sonradan özellik ekleme ve örnek senaryo.
- [arastirma.md](arastirma.md) — Aynı içeriğin saf Markdown hâli; her önemli iddiada kaynak (repo dosya yolu ya da video zaman damgası) ve güven etiketi bulunur. Bir yapay zekâ asistanına bağlam olarak verilebilir.

## Bölümler

| § | Başlık | Kısaca |
|---|---|---|
| 1 | Kısa özet | ANEW nedir, kime göre; "bir bakışta" tablosu |
| 2 | Hangi problemi çözer | Hız arttı, karar hatası büyüdü; üç mekanik kanal; sekiz değişmez kural |
| 3 | Kavramlar sözlüğü | Spec, mini-spec, plan, segment, kapı, kanıt, roller, adaptör, iki hız, kural gücü |
| 4 | Repo yapısı | Klasör ağacı; ne nerede, kim yazar |
| 5 | Ön koşullar ve ilk kurulum | Yeni / mevcut proje; araç başına adaptör; Windows, macOS, Linux; bootstrap mülakatı; kurulumu doğrulama |
| 6 | Komut referansı | `/bootstrap`, `/new-feature`, `/analyze`, `/plan`, `/build`, `/review`, `/verify`, `/change`, `/fix-bug`, `/refactor`, `/adr`, `/recover` — her biri adım adım, örnekle |
| 7 | Betikler referansı | `scripts/init`, `check`, `doctor`, `status`, `gate`, `residue`, `selftest`; CI ve PR şablonu |
| 8 | Süreçler uçtan uca | İlk özellik; sonradan özellik ekleme (lite ve strict); değişiklik isteği; hata düzeltme; refactor; incident; ADR; yalnız analiz |
| 9 | Spec ve plan şablonları | Alan alan; mini-spec ne zaman; dosyaların yaşam döngüsü |
| 10 | Segmentler, kapılar, kanıt | Durma kuralı; hassas alan; Documented / Validated / Enforced; kanıt politikası; descope, waive değil |
| 11 | Roller | Analyst, Developer, Reviewer, QA; salt okunur reviewer alt ajanı |
| 12 | Ters giderse | `/recover` ve 13 kurtarma rampası: belirti → ne yapılır |
| 13 | Örnek senaryo | Hayalî bir projede kurulum, özellik, araya giren değişiklik isteği, hata düzeltme; şablonun kendi kayıtlarından gerçek bir mini-spec |
| 14 | Tasarım kararları | ANEW-0001 … ANEW-0012: neden böyle |
| 15 | Videodan notlar | Yazarın anlatımı zaman damgalarıyla; repoda olmayan tavsiyeler; video–repo farkları |
| 16 | Sürümler ve yükseltme | LTS ve current hatları; tarihçe; sahadan gelen kurallar; yükseltme adımları |
| 17 | SSS ve hızlı başvuru | Sık sorulanlar, sık hatalar, "şunu yapmak istiyorum → şu komut" tablosu |
| 18 | Sınırlar ve dikkat | Ne değildir; hangi durumda ağır kaçar; lisans |
| 19 | Açık noktalar | Repoda birbirini tutmayan ya da yazmayan şeyler |

## İlgili konular

- [Video Üretim Sistemi](../video-uretim-sistemi/) — yapay zekâyı adım adım, doğruluk denetimi ve sahne bazlı revizyonla çalıştıran bir üretim akışı; "ajanı bir sürecin içinde çalıştırma" fikrinin başka bir alandaki örneği.
- [Kodla Video (Remotion)](../kodla-video/) — yapay zekâya kod yazdırmanın uygulamalı bir alanı; ajan becerileri (Agent Skills) orada da geçer.

## Kaynaklar

- Repo: https://github.com/engindemirog/ai-native-engineering-workspace (MIT; yazarı Engin Demiroğ)
- Video: https://www.youtube.com/watch?v=29cVv3H2A1w — "ANEW ile AI Native Yazılım Geliştirme Demosu — Lite Mod, Greenfield" (06.11.2026, 49:36)
- Sürüm notları: https://github.com/engindemirog/ai-native-engineering-workspace/blob/main/CHANGELOG.md
- Komut başvurusu (İngilizce, resmî): https://github.com/engindemirog/ai-native-engineering-workspace/blob/main/docs/commands.md

Tam kaynakça (okunan dosyaların listesi) [arastirma.md](arastirma.md) dosyasının sonundadır.

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../README.md)
