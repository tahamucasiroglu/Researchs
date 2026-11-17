# ANEW — AI-Native Engineering Workspace: sıfırdan öğrenme rehberi

Yapay zekâ ajanlarıyla yazılım geliştirirken bağlamı, kararları, spec'leri ve kanıtı sohbet yerine dosyalarda tutan, araçtan ve teknolojiden bağımsız bir repo şablonunun (ANEW) baştan sona anlatımı: ne olduğu, nasıl kurulduğu, 12 komutu ve 7 betiği, sonradan özellik eklerken ve iş ters gittiğinde ne yapılacağı.

| Alan | Değer |
|---|---|
| Araştırma tarihi | 17.11.2026 |
| İncelenen sürüm | `v1.26.1` (`main` dalı, commit `e51f246`, son commit 16.11.2026) |
| Şablonun adı | ANEW — AI Native Engineering Workspace |
| Yazarı | Engin Demiroğ (repo sahibi ve videodaki anlatıcı) |
| Lisans | MIT |
| Kaynak 1 | Repo: https://github.com/engindemirog/ai-native-engineering-workspace |
| Kaynak 2 | Video: https://www.youtube.com/watch?v=29cVv3H2A1w ("ANEW ile AI Native Yazılım Geliştirme Demosu — Lite Mod, Greenfield", 06.11.2026, 49:36) |

## Bu belge nasıl hazırlandı

- **Repo dosyaları okundu.** `README.md`, `AGENTS.md`, `docs/`, `workflows/`, `prompts/`, `specs/`, `adapters/`, `.github/` ve `scripts/` altındaki `init`, `check`, `doctor`, `status`, `gate`, `residue` satır satır okundu. Üç büyük kaynak **seçilerek** okundu: `CHANGELOG.md` (sürüm özetlerinin tamamı; "Upgrading" bölümlerinin bir kısmı), `scripts/selftest` (yaklaşık 1.100 satır; yalnız bu belgede alıntılanan senaryolar) ve şablonun kendi geliştirme kayıtları `.anew-dev/` (spec 0008 ve planı ile backlog'un tamamı; diğer spec ve planlardan yalnız alıntılanan bölümler).
- **Belge, yazıldıktan sonra repoyla satır satır karşılaştırılarak denetlendi** (17.11.2026): komut adları, çağrı sözdizimi, dosya yolları, betik bayrakları, çıkış kodları, ret mesajları, şablon alan adları ve karar numaraları ilgili repo dosyası açılarak doğrulandı; bulunan hatalar düzeltildi.
- **Video izlenmedi, altyazısı okundu.** Videonun Türkçe **otomatik** altyazısı (YouTube konuşma tanıma) alındı ve okundu. Elle yazılmış altyazı yok; teknik terimler sık sık yanlış tanınmış ("Cloud Code" → Claude Code gibi) ve bağlamdan düzeltildi. Zaman damgaları 30 saniyelik dilimlerin başlangıcıdır (±30 sn). Ekran görüntüsü incelenmedi.
- **Şablon bir projede çalıştırılarak DENENMEDİ.** Hiçbir betik (`scripts/*`) çalıştırılmadı, hiçbir komut bir yapay zekâ aracında denenmedi. Bu belgedeki betik çıktıları ya repodaki belgelerden ve `scripts/selftest`'in doğruladığı satırlardan alınmıştır ya da betik metnindeki çıktı kalıplarından türetilmiştir; hangisinin hangisi olduğu yanında yazar. "Şöyle çalışır" denen her şey "repo böyle söylüyor" anlamındadır.
- **Örnekler.** "Örnek/temsili" etiketli spec, plan ve çıktı parçaları, repodaki şablonların biçimine uyularak bu belge için kurulmuştur; içerikleri hayalîdir. "Gerçek kayıt" etiketli parçalar reponun `.anew-dev/` klasöründen kısaltılarak alınmıştır.

### Güven etiketleri

| Etiket | Anlamı |
|---|---|
| **RESMÎ** | Repodaki bir dosyada ya da yazarın videosunda açıkça yazıyor/söyleniyor. Yanında dosya yolu ya da zaman damgası bulunur. |
| **TAHMİN** | Bu belgeyi hazırlayanın çıkarımı ya da yorumu; repoda birebir yazmıyor. |
| **ÇELİŞKİLİ** | Repodaki iki dosya ya da repo ile video birbirini tutmuyor; iki taraf da gösterilir. |

Etiket yazılmayan cümleler, verilen dosya yolundaki metnin Türkçe aktarımıdır (RESMÎ sayılır). Komut adları, dosya yolları, bayraklar, durum değerleri ve çıktı satırları repodaki yazımıyla **birebir** verilmiştir.

---

## 1. Kısa özet

ANEW bir kütüphane, bir CLI aracı ya da bir kod üreteci değildir. Kendi projenin içine kopyaladığın bir **repo şablonudur**: Markdown dosyaları (kurallar, süreç tanımları, prompt gövdeleri, spec ve plan şablonları) ile birkaç küçük POSIX kabuk betiğinden oluşur. Amacı yapay zekâya daha çok kod yazdırmak değil, yapay zekâyı bir **mühendislik sürecinin içinde** çalıştırmaktır: her iş önce bir spec (ne isteniyor, hangi kabul kriterleri) olarak yazılır, insan onaylar; sonra bir plan yazılır, insan onaylar; kod plana göre yazılır; işi üreten oturum kendi işini denetleyemez, bağımsız bir oturum inceler; bulguları insan sınıflandırır; her kabul kriteri bir kanıta bağlanır ve ancak o zaman iş "bitti" sayılır. Bütün bu durum sohbet geçmişinde değil dosyalarda (`Status: Approved`, `Approved by / on: …` gibi satırlarda) yaşar; böylece oturum kapansa da, araç değişse de iş kaldığı yerden sürer. Şablon tek geliştiriciye de (lite mod), rollerin ayrı oturumlarda çalıştığı ekiplere de (strict mod) göre ayarlanır; Claude Code, GitHub Copilot, Cursor ve Codex için hazır adaptörleri vardır, başka araçlarla da elle kullanılabilir. (RESMÎ — `README.md`)

### Bir bakışta

| Soru | Cevap | Kaynak |
|---|---|---|
| Nedir? | Yapay zekâ ile yazılım geliştirmek için teknolojiden bağımsız repo şablonu; Markdown + POSIX betikleri | `README.md` |
| Ne değildir? | Framework, bağımlılık, kod üreteci, deploy/release aracı değildir | `README.md` (giriş, Scope) |
| Hangi problemi çözer? | Yapay zekâ kodu hızlandırır ama karar hatalarını da büyütür; darboğaz "doğru karar vermek ve bunu kanıtlamak"tır | `README.md` (Why this exists) |
| Omurga | `INTENT → CLARIFY → SPEC → PLAN → [onay] → BUILD → INDEPENDENT REVIEW → [triyaj] → VERIFY → SHIP` | `README.md` (The loop) |
| İnsanın karar verdiği yerler | Dört kapı: spec onayı, plan onayı, triyaj, ship — hiçbir modda otomatikleşmez | `docs/commands.md` (Two golden rules) |
| Komutlar | 12 komut: `/bootstrap`, `/new-feature`, `/analyze`, `/plan`, `/build`, `/review`, `/verify`, `/change`, `/fix-bug`, `/refactor`, `/adr`, `/recover` | `docs/commands.md` |
| Betikler | 7 betik: `scripts/init`, `doctor`, `status`, `gate`, `check`, `residue`, `selftest` | `docs/commands.md` |
| Modlar | `lite` (tek geliştirici, düşük risk) · `strict` (ekip, kritik sistem) | `README.md`, `workflows/README.md` |
| Desteklenen araçlar | Claude Code, GitHub Copilot, Cursor, Codex + `generic` (başka her araç, elle) | `adapters/README.md` |
| İşletim sistemi | Betikler POSIX `sh`: Linux, macOS, Windows'ta Git Bash hedeflenmiş | `scripts/check` içindeki yorum |
| Sürümler | LTS hattı `1.24.x` (yalnız düzeltme, en az 04.05.2027'ye kadar) · `main` = current (`v1.26.1`) | `README.md`, `CHANGELOG.md` |
| Kapsam | Niyetten merge'e kadar. Release, deploy, canlı ortam işletimi bilinçli olarak dışarıda | `README.md` (Scope), ANEW-0005 |
| Lisans | MIT | `LICENSE` |

### Kime göre?

Tek bir okur varsayılmaz; hangi durumdaysan ona göre oku:

| Durumun | ANEW sana ne verir | Nereden başla |
|---|---|---|
| Tek başına, yeni (boş) bir proje | Lite mod: tek komutla (`/new-feature`) spec → plan → build → review → verify zinciri, her kapıda sana sorar | Bölüm 5 (yeni proje dalı), Bölüm 13 |
| Tek başına, mevcut bir kod tabanı | Bootstrap mevcut kodu inceler, stack'i ve konvansiyonları koddan çıkarıp sana onaylatır | Bölüm 5 (mevcut proje dalı) |
| Ekip, roller ayrı kişilerde | Strict mod: Analyst, Developer, Reviewer, QA rolleri ayrı oturumlarda kendi komutunu çalıştırır; devir dosyalar üzerinden | Bölüm 8.2, Bölüm 11 |
| Sadece fikri merak ediyorsun | Dosya tabanlı süreç hafızası, bağımsız inceleme, "kanıt yoksa bitmedi" ilkeleri başka düzenlere de taşınabilir | Bölüm 2, Bölüm 14 |
| Kullandığın araç listede yok | `generic` adaptör: prompt gövdelerini elle yapıştırırsın; kapıları yine betikler ve CI denetler | Bölüm 5.4 |

---

## 2. Hangi problemi çözer?

### 2.1 Sorun: hız arttı, karar hatası da büyüdü

Repo problemi tek paragrafta anlatır (RESMÎ — `README.md`, "Why this exists"):

> "AI lowers development latency — and amplifies decision errors. A misunderstood requirement once cost a developer two weeks; an agent now ships the same misunderstanding in twenty minutes, with green tests. The bottleneck has moved from writing code to deciding correctly and proving it."

Türkçesi: Yapay zekâ geliştirme gecikmesini düşürür ama karar hatalarını büyütür. Yanlış anlaşılmış bir gereksinim eskiden bir geliştiriciye iki haftaya mal olurdu; bugün bir ajan aynı yanlış anlamayı yirmi dakikada, üstelik yeşil testlerle teslim eder. Darboğaz kod yazmaktan, doğru karar vermeye ve bunu kanıtlamaya kaymıştır.

Yazar videoda aynı noktayı "kontrol kaybı" üzerinden anlatır: "Yapay zekâ yazar, siz kontrol edersiniz" yaklaşımı gerçekçi değildir, çünkü bir dakikada üretilen binlerce satırı insan gözden geçiremez; ayrıca "üreten akıl kendini denetleyemez" — ajan "yaptım" dediğinde kendi anladığını yaptığını söyler. (RESMÎ — video, 01:04–02:09 ve 41:12)

### 2.2 Çözüm fikri: üç mekanik kanal + süreç hafızası

README'ye göre yapay zekâ ile kodlama tavsiyelerinin çoğu "kimsenin uygulatmadığı düzyazıdır". Bir ajanın davranışını gerçekten biçimlendiren yalnızca üç mekanik kanal vardır ve ANEW'deki her dosya bunlardan birine bağlanır (RESMÎ — `README.md`):

| Kanal | Ne demek | ANEW'deki karşılığı |
|---|---|---|
| **Otomatik yüklenen bağlam** | Ajan oturum başında neyi kendiliğinden okuyorsa onu bilir; gerisi ancak oradan işaret edilirse önem taşır | `AGENTS.md` (≤ 40 satırlık "tabela"); `docs/`, `workflows/`, `prompts/` oradan işaret edilir |
| **Çalıştırabildiği doğrulama** | Kontrol tek ve ucuz bir komutsa ajan kendini disipline eder; değilse kanıtsız "bitti" der | `scripts/check` (tek doğrulama sözleşmesi) |
| **Atlatamayacağı kurallar** | "Prose is advice; tooling is law" — düzyazı tavsiyedir, araç kanundur | Hook'lar, izin yasakları (Claude Code), CI'da `scripts/doctor --strict` |

Bunlara düzyazının veremeyeceği dördüncü bir şey eklenir: **süreç hafızası**. Niyet, kararlar ve kanıt her oturumdan sağ çıkan dosyalarda yaşar.

### 2.3 "Spec tabanlı" ve "AI-native" çalışma ne demek?

- **Spec tabanlı:** Kod yazılmadan önce işin *ne olduğu* ve *nasıl anlaşılacağı ki bitti* yazılır. Spec; niyeti (iş diliyle), gereksinimleri (davranış olarak, teknik çözüm içermeden), kullanıcı deneyimini ve test edilebilir kabul kriterlerini taşır. Kural 1 budur: "No spec, no code." Gerekçe: "En pahalı hatalar ilk kod satırından önce olur — insan, iş birimi ve yapay zekâ aynı cümleden üç farklı şey anladığında." (RESMÎ — `README.md`, Design principles 2)
- **AI-native:** Süreç, ajanın özelliklerine göre kurulmuştur. Ajan oturumları unutur → durum dosyalardadır. Ajan `check`'i insandan on kat sık çalıştırır → check arkasında süreç bırakmamalıdır ve hızlı bir profili vardır. Ajan kendi işini haklı çıkarmaya meyillidir → inceleme, üretenin sohbetini görmeyen ayrı bir oturumda yapılır. Ajan belirsizlikte varsayım yapar → belirsizlikte durması ve adı konmuş bir "kurtarma rampası" istemesi kuraldır. (TAHMİN — repodaki kuralların ortak gerekçesinin özeti; tek tek gerekçeler `docs/testing.md`, `docs/roles/README.md` ve ANEW-0002/0007 kararlarında RESMÎ)

Yazarın vurgusu: bu felsefe yeni bir icat değildir; yazılımın zaten var olan standartlarının (analiz, plan, bağımsız test, kanıt) ajanlarla çalışmaya uyarlanmasıdır, önemli olan da bu şablonun kendisi değil "böyle bir döngüyü projeye dahil etmek"tir. (RESMÎ — video, 05:48)

### 2.4 Sekiz değişmez kural

`AGENTS.md`'deki "Invariant rules" bloğu her ajan oturumunun başında okunur; bootstrap dosyanın geri kalanını yeniden yazsa da bu blok **kelimesi kelimesine** korunur. (RESMÎ — `AGENTS.md`, `prompts/bootstrap.md` HARD RULES)

| # | Kural (orijinal) | Türkçesi |
|---|---|---|
| 1 | **No spec, no code.** | Spec yoksa kod yok. Her iş `specs/active/` altında bir spec olarak başlar. |
| 2 | **Plan before build.** | Kod yazılmadan önce planı bir insan onaylar. |
| 3 | **The producer never verifies its own work.** | Üreten kendi işini doğrulamaz. Review ve QA ayrı oturumda ya da salt okunur alt ajanda, dosyalardan (diff + spec) çalışır; üretenin sohbetinden değil. |
| 4 | **Evidence over claims.** | İddia değil kanıt. "Bitti" = `scripts/check` yeşil + her kabul kriteri bir kanıta eşlenmiş. |
| 5 | **Tests are protected.** | Yeşile ulaşmak için assert zayıflatmak, test silmek ya da atlamak her zaman yasaktır. |
| 6 | **Proposal rule.** | Ajanın her sorusu, seçeneği ya da bulgusu kendi önerisi ve gerekçesiyle gelir. İnsan karar verir; onaysız hiçbir şey uygulanmaz. |
| 7 | **Shipped specs are immutable.** | `specs/done/` altındaki dosyalar asla düzenlenmez. |
| 8 | **Uncertainty is surfaced, not assumed.** | Belirsizlikte ya da doküman/kod çelişkisinde dur ve uygun kurtarma rampasını kullan (`prompts/recovery/`). |

### 2.5 Altı tasarım ilkesi

(RESMÎ — `README.md`, Design principles)

1. **Bağlam dosyalarda yaşar, sohbette değil.** "Sessions forget; files don't." `AGENTS.md` kısa bir tabela kalır (≤ 40 satır), el kitabı olmaz; çünkü uzun bağlam dosyalarının ortası görmezden gelinir.
2. **Spec yoksa kod yok.**
3. **Üreten kendi işini asla doğrulamaz.** İnceleyen oturum diff'i ve spec'i görür, üretenin gerekçelendirmelerini değil.
4. **İddia yerine kanıt.** "'It works' is not a status." Kanıt bir işaretçidir (test adı + komut), dosyalanmış çıktı kopyası değildir.
5. **Öneri kuralı.** İnsan daha hızlı karar verir, ajanın akıl yürütmesi görünür olur.
6. **Tek doğrulama sözleşmesi.** "İyi mi?" sorusunun tam olarak bir yolu vardır: `scripts/check`. İki hızı vardır ama asla iki sözleşmesi yoktur.

---

## 3. Temel kavramlar sözlüğü

Belgenin geri kalanı bu sözcüklerle konuşur. Türkçe karşılıklar açıklama içindir; dosyalarda ve komutlarda İngilizce yazımları geçer.

### 3.1 İş birimleri ve dosyalar

| Kavram | Tanım | Nerede |
|---|---|---|
| **Spec** | Bir işin "ne"si: niyet, gereksinimler (davranış), kullanıcı deneyimi, kısıtlar, test edilebilir kabul kriterleri (`AC-1`, `AC-2` …), Definition of Done, scorecard. İş başına bir dosya. | `specs/active/NNNN-<ad>.md` (şablon: `specs/TEMPLATE.md`) |
| **Mini-spec** | Var olan bir davranışı değiştiren işler, refactor ve incident için kısa spec. `Source:` (iş kalemi anahtarı) zorunludur; kriterler "değişen davranış" (`CB-n`) ve "korunan davranış" (`PB-n`) diye ikiye ayrılır. | `specs/TEMPLATE-mini.md` |
| **Kabul kriteri** (acceptance criterion) | Tek başına test edilebilir tek bir davranış cümlesi. Her biri en az bir teste eşlenir. | Spec'in `## Acceptance criteria` bölümü |
| **Plan** | Onaylı spec'in "nasıl"ı: değişecek dosyalar (etki alanı), sıralı adımlar, riskler, kriter ↔ test eşlemesi. Sonradan build kanıtı, plan değişiklikleri (`A-n`) ve triyaj kayıtları da buraya yazılır. | `specs/plans/NNNN-plan.md` |
| **Backlog** | **Özellik listesi değildir.** Triyajda "ertelendi" (`defer`) denen bulguların, ship'te spec'ten dışarı taşınan kriterlerin ve bootstrap'te ertelenen kararların kaydıdır (`B-<n>`). | `specs/backlog.md` |
| **active → done** | Üzerinde çalışılan spec `specs/active/`'te durur; ship'te `specs/done/`'a taşınır ve orada **değiştirilemez**. Planlar `specs/plans/`'ta kalır. | `specs/active/README.md`, `specs/done/README.md` |
| **ADR** | Mimari karar kaydı: bağlam, karar, sonuçlar (fayda ve maliyet), reddedilen alternatifler, yeniden bakma tetikleyicileri. | `docs/decisions/NNNN-<slug>.md` |
| **`AGENTS.md`** | Her ajanın oturum başında okuduğu tabela: değişmez kurallar, mod, dil, "ne nerede" tablosu. | repo kökü |

### 3.2 Süreç sözcükleri

| Kavram | Tanım | Kaynak |
|---|---|---|
| **Workflow** | Süreç tanımı: adımlar, roller, kapılar, kanıt. Prompt metnini kopyalamaz, ona işaret eder. | `workflows/README.md` |
| **Prompt** | Yeniden kullanılabilir istem gövdesi; süreç anlatmaz. Ortak anatomi: `[LOAD CONTEXT]`, `[TASK]`, `[BOUNDARIES]`, `[EVIDENCE]`, `[APPROVAL]`. | `prompts/README.md` |
| **Segment** | Özellik akışının tek birim olarak çalışan bir aşaması. Beş segment: `ANALYZE`, `PLAN`, `BUILD`, `REVIEW`, `VERIFY`. Her biri giriş koşulunu dosyalardan denetler, işini yapar, kapısında durur, bir devir satırıyla biter. | `workflows/segments.md` |
| **Chainer** (zincirleyici) | `/new-feature`. Segment değildir; lite modda segmentleri sırayla çağırır ve her kapıda sorar, strict modda reddeder. | `workflows/segments.md` |
| **Gate** (kapı) | İnsan kararının beklendiği durma noktası. Dört insan kapısı: **spec approval**, **plan approval**, **triage**, **ship**. | `docs/commands.md` |
| **Handoff** (devir) | Segmentin sonunda dosyalara yazılan durum (spec `Status`, plan `Approved by / on`) + `Next: <segment> — <kim çalıştırır>` satırıyla biten özet. | `workflows/segments.md` |
| **Entry check** (giriş kontrolü) | Segmentin başlamadan önce dosyalardan doğruladığı koşul. *Hard* kontrol reddeder, *soft* kontrol uyarıp sorar. | `workflows/segments.md` |
| **Triage** (triyaj) | İnceleme bulgularının insan tarafından sınıflanması: `real` (düzelt), `noise` (gerekçeyle reddet), `defer` (backlog'a ertele), `investigate` (QA yeniden üretsin). | `workflows/feature-development.md` adım 7 |
| **Fix round** (düzeltme turu) | `real` bulguların düzeltildiği tur. Commit etiketi `[plan NNNN/fix-k]`. En çok üç tur; dördüncüden önce R-06. | `prompts/build.md §fixes` |
| **Amendment** | Plan onayından sonraki onaylı plan değişikliği: `A-n` satırı. Sessiz plan değişikliği yoktur. | `specs/plans/TEMPLATE.md` |
| **Recovery ramp** (kurtarma rampası) | İş ters gittiğinde döngüye güvenli dönüş prosedürü: `R-01` … `R-13`. | `prompts/recovery/README.md` |
| **Sensitive area** (hassas alan) | Hatanın para, erişim ya da hukuki sonuç doğurduğu alan. Bootstrap'te proje başına belirlenir ("None" geçerli cevaptır); her modda daha sıkı kurallar tetikler. | `docs/domain.md` |
| **Walking skeleton** (yürüyen iskelet) | Boş projede ilk spec: araç zincirini kuran ve `check.conf` adımlarını etkinleştiren en küçük uçtan uca dilim. | `workflows/bootstrap.md` |
| **One-pass review** | Yalnız lite'ta, hassas alan dışında ve kodun kasıtlı bozulmasını gerektiren kriter yokken: temiz çıkan review aynı bağımsız oturumda VERIFY tablosunu da üretir. Bir oturum kazandırır, kapı kazandırmaz. | `workflows/segments.md` ("The chainer") |

### 3.3 Doğrulama ve kanıt sözcükleri

| Kavram | Tanım | Kaynak |
|---|---|---|
| **`scripts/check`** | Tek doğrulama sözleşmesi. Adımları `scripts/check.conf`'ta (bootstrap yazar). İnsan, ajan, hook ve CI aynı komutu çalıştırır. | `scripts/check` |
| **İki hız** (two speeds, one contract) | `./scripts/check --fast` yalnız `[fast]` etiketli adımları çalıştırır (yineleme için); `./scripts/check` hepsini çalıştırır (full). "Fast green is a working state; only full green is evidence." | `docs/testing.md` |
| **Evidence** (kanıt) | Bir kriterin karşılandığını gösteren **işaretçi**: test adı + onu yeniden üreten komut. Çıktı, log, coverage raporu repoya kaydedilmez; `evidence/` klasörü yoktur. | `docs/testing.md` (Evidence policy) |
| **Criterion ↔ test map** | Planda: her kriteri hangi testin, hangi profilde (fast/full) kanıtlayacağı. Developer yazar. | `specs/plans/TEMPLATE.md` |
| **Criterion ↔ evidence table** | VERIFY'ın ürünü: her kriter, kanıtı ve durumu (`PASS`). QA yazar. | `prompts/verify.md` |
| **Build evidence** | Planda işaretçi satırlar: `CHECK GREEN (full, <n> steps, <t> s) @<sha>`. Review ve VERIFY yeniden çalıştırmaz, bunu alıntılar. | `specs/plans/TEMPLATE.md` |
| **Residue test** (kalıntı testi) | `check` iki kez art arda çalıştırılır; check'in başlattığı hiçbir süreç hayatta kalmamalıdır. | `scripts/residue`, `docs/testing.md` (Resource hygiene) |
| **Descope / "moved out"** | Ship kapısında kanıtlanamayan kriter silinmez ve "feragat" edilmez; üstü çizilip backlog'a ya da başka spec'e **taşınır**. | ANEW-0012, `prompts/recovery/spec-change.md` |

### 3.4 İnsanlar, roller, araçlar

| Kavram | Tanım | Kaynak |
|---|---|---|
| **Roller** | `Analyst` (niyet → spec), `Developer` (plan → build → düzeltme), `Reviewer` (bağımsız inceleme, hiçbir dosya yazmaz), `QA` (kriter ↔ kanıt). "Rol = oturum": farklı araç gerekmez, ikinci bir pencere yeter. | `docs/roles/` |
| **Mode** | `AGENTS.md`'deki `Mode:` satırı: `lite` ya da `strict` (bootstrap öncesi `unset`). | `AGENTS.md` |
| **Adapter** (adaptör) | Çekirdeği belirli bir araca bağlayan ince katman: işaretçi dosya + o araca özgü komut dosyaları (+ varsa alt ajan, hook, izin profili). Kural içermez. | `adapters/README.md` |
| **Enforcement seviyeleri** | Bir kuralın ne kadar güçlü tutulduğu: **Documented** (yazılı), **Validated** (bir betik ihlali yakalar), **Enforced** (araç eylemi fiziksel olarak engeller). | `README.md`, ANEW-0004 |
| **Protokol alanları** | Belge dili ne olursa olsun İngilizce kalan etiket ve değerler: `Status:` değerleri, `Approved by / on:`, `Source:`, şablon başlıkları. Betikler bunları okur. | `docs/conventions.md` |

### 3.5 Kimlik önekleri (dosyalarda göreceğin kısaltmalar)

| Önek | Anlamı | Örnek |
|---|---|---|
| `NNNN` | Dört haneli spec numarası; `active/`, `done/` ve `plans/` tek bir numara dizisini paylaşır | `0003` |
| `AC-n` | Tam spec'te kabul kriteri | `AC-2` |
| `CB-n` / `PB-n` | Mini-spec'te değişen davranış / korunan davranış kriteri (şablondaki bölüm adları: "Changed behavior", "Preserved behavior") | `CB-1`, `PB-2` |
| `B-<n>` | Backlog kaydı | `B-7` |
| `A-n` | Plan değişikliği (amendment) | `A-1` |
| `fix-<k>` | Düzeltme turu numarası; commit etiketinde `[plan NNNN/fix-k]` | `fix-2` |
| `R-nn` | Kurtarma rampası | `R-07` |
| `BR-n` | İş kuralı (`docs/domain.md`) | `BR-3` |
| `C-` / `H-` / `M-` / `L-` / `I-` | Bulgu kimliğinde önem derecesi: Critical, High, Medium, Low, Info (`scripts/status` bu önekleri okur) | `M-1`, `L-2` |
| `S-n` | Ajanın yakaladığı ekran görüntüsü (kanıt tablosunda) | `S-1…S-4` |

---

## 4. Repo yapısı: ne nerede?

### 4.1 Üç katman

(RESMÎ — `README.md`, "The three layers")

| Katman | İçerik | Neyle birlikte eskir |
|---|---|---|
| **Core** (çekirdek) | `AGENTS.md`, `docs/`, `specs/`, `workflows/`, `prompts/`, `scripts/` — sistemin kendisi; araçtan ve teknolojiden tamamen bağımsız | Mühendislik pratiğiyle (yavaş) |
| **Adapters** | `adapters/` — araç başına ince bağlantı. Kurallar burada asla kopyalanmaz | Yapay zekâ araçlarıyla (hızlı) |
| **Packs** | Teknolojiye özel hazır ayarlar (JVM/Spring, Node, Python, React …). **Yol haritasında; bu sürümde yok** | Ekosistemlerle |

### 4.2 Klasör ağacı

Aşağıdaki ağaç `v1.26.1` klonundan çıkarılmıştır (RESMÎ — dosya listesi).

```
/
├─ AGENTS.md                 Her ajanın oturum başında okuduğu tabela (39 satır)
├─ README.md                 Tanıtım, hızlı başlangıç, döngü, kural gücü tablosu
├─ CHANGELOG.md              Sürümler ve "nasıl yükseltilir"
├─ LICENSE                   MIT
├─ .anew-version             Bu çalışma alanının dayandığı ANEW sürümü (tek satır: v1.26.1)
├─ .gitattributes            Satır sonlarını LF'e sabitler (betikler için şart)
├─ .gitignore                .env, *.log, .claude/settings.local.json …
├─ .github/
│  ├─ workflows/check.yml    CI: doctor --strict + selftest + check
│  └─ pull_request_template.md   Kapı kayıtlarını isteyen PR şablonu
├─ docs/                     Uzun vadeli hafıza (bootstrap doldurur)
│  ├─ architecture.md  domain.md  conventions.md  testing.md  security.md  git.md
│  ├─ commands.md            Her komutun tek sayfalık başvurusu
│  ├─ roles/                 README + analyst.md, developer.md, reviewer.md, qa.md
│  └─ decisions/             README + TEMPLATE.md (projenin ADR'leri buraya)
│     └─ anew/               ANEW-0001 … ANEW-0012 (şablonun kendi kararları)
├─ specs/
│  ├─ TEMPLATE.md            Tam spec şablonu
│  ├─ TEMPLATE-mini.md       Mini-spec şablonu
│  ├─ backlog.md             Ertelenen bulgular (B-<n>)
│  ├─ active/                Üzerinde çalışılan spec'ler
│  ├─ done/                  Teslim edilmiş, değiştirilemez spec'ler
│  └─ plans/                 Planlar (TEMPLATE.md + NNNN-plan.md)
├─ workflows/                Süreç tanımları
│  ├─ README.md  bootstrap.md  feature-development.md  segments.md
│  └─ change-request.md  bug-fix.md  refactor.md  incident.md
├─ prompts/                  Prompt gövdeleri
│  ├─ README.md  bootstrap.md  clarify.md  spec.md  plan.md  build.md  review.md  verify.md  adr.md
│  └─ recovery/              README + 13 rampa (R-01 … R-13)
├─ scripts/                  POSIX sh betikleri
│  ├─ init  doctor  status  gate  check  residue  selftest
│  └─ check.conf.example     check.conf biçimi örneği (check.conf'u bootstrap üretir)
├─ adapters/
│  ├─ README.md
│  └─ claude-code/  github-copilot/  cursor/  codex/  generic/
└─ .anew-dev/                Şablonun KENDİ geliştirme kayıtları (8 spec + 8 plan + backlog)
```

### 4.3 Klasör klasör: kim yazar, kim okur?

| Yol | Amaç | Kim doldurur / değiştirir | Not |
|---|---|---|---|
| `AGENTS.md` | Tabela: değişmez kurallar, `Mode:`, `Language:`, "Where things live" | Bootstrap yeniden yazar; "Invariant rules" bloğu aynen kalır | Şablon hâlinde `STATUS: NOT CONFIGURED`, `Mode: unset`, `Language: unset` taşır |
| `docs/architecture.md` | Karar verilmiş mimari, modüller ve sahiplikleri, yasak bağımlılıklar | Bootstrap | "Buradaki muğlak cevaplar muğlak koda dönüşür" |
| `docs/domain.md` | Ortak dil (terimler), numaralı iş kuralları (`BR-n`), değişmezler, hassas alanlar | Bootstrap | "Bir terim burada yoksa yapay zekânın ona kendi anlamını uydurmasını bekle" |
| `docs/conventions.md` | Dil ayarı, sürümler, adlandırma, hata yönetimi, veri kuralları, **Known traps**, araçla zorlanan kurallar | Bootstrap; "Known traps" zamanla triyaj kararlarıyla büyür | Yalnız gerçek kurallar: ya araç zorlar ya review denetler |
| `docs/testing.md` | Test sözleşmesi, test katmanları, korunan testler, kanıt politikası, kaynak hijyeni, iki hız, determinizm | Çoğu hazır ve bağlayıcı; "Frameworks & layout" ile "What must be tested" bölümlerini bootstrap doldurur | En uzun kural dosyası |
| `docs/security.md` | Secrets kuralı, girdi/çıktı, yetkilendirme, bağımlılık politikası | Bootstrap | Güvenlik her bağımsız review'un zorunlu boyutudur |
| `docs/git.md` | Dal adları, commit kalıbı, yasaklar, trivial değişiklik politikası, PR | Bootstrap ayarlar; varsayılanlar güvenlidir | |
| `docs/commands.md` | Her komut: ne yapar, neyi okur/yazar, nerede durur, lite/strict farkı | Şablonla gelir | "Harita"dır; segment kuralları çelişirse `workflows/segments.md` kazanır |
| `docs/roles/` | Rol kartları | Şablonla gelir | Her kartın STOP RULE'u vardır |
| `docs/decisions/` | Projenin ADR'leri (0001'den) | Sen (`/adr`) | `anew/` altındakilere dokunulmaz |
| `specs/` | Spec, plan, backlog | Ajan yazar, kapılarda sen onaylarsın | Şablonda `active/`, `done/`, `plans/` boştur (yalnız README + şablon) |
| `workflows/` | Süreç tanımları | Şablonla gelir; kapılar ağır gelirse uyarlayabilirsin | |
| `prompts/` | Prompt gövdeleri | Şablonla gelir | `generic` adaptörde bunları elle yapıştırırsın |
| `scripts/` | Betikler | Şablonla gelir; `check.conf`'u bootstrap yazar | Hepsi `#!/bin/sh` |
| `adapters/` | Araç bağlantıları | `scripts/init <araç>` köke kopyalar | Kaynak klasör; kurulan kopya köktedir (`.claude/`, `.cursor/` …) |
| `.github/` | CI ve PR şablonu | Şablonla gelir; bootstrap araç zinciri kurulum adımı önerebilir | |
| `.anew-dev/` | ANEW'in kendini geliştirirken tuttuğu spec ve planlar | — | **Senin çalışma alanının parçası değildir; kendi reponu açtıktan sonra sil** (RESMÎ — `.anew-dev/README.md`). Okumak için ise değerlidir: doldurulmuş gerçek spec/plan örneği yalnızca burada var. |

---

## 5. Ön koşullar ve ilk kurulum

Kurulum dört hamledir: **(1)** şablonun bir kopyasını al → **(2)** kullandığın aracın adaptörünü kur (`./scripts/init <araç>`) → **(3)** araçta bootstrap'i çalıştır (`/bootstrap`) → **(4)** sağlığı doğrula (`./scripts/doctor`). Sonra ilk işe başlanır. Aşağıda her hamle, durumuna göre dallanarak anlatılıyor.

README'deki hızlı başlangıç bloğu (RESMÎ — `README.md`, Quickstart; birebir):

```bash
# 1. Use this template on GitHub (or copy the files into an existing repo) — for a pinned
#    version (training, adoption): git clone --branch v1.24.1 (README, Versions and support). Then:
./scripts/init claude-code        # or: github-copilot | cursor | codex | generic

# 2. Open your AI tool and run the bootstrap workflow
#    Claude Code / Cursor / Copilot:  /bootstrap    Codex:  $bootstrap
#    Other tools:  paste prompts/bootstrap.md

# 3. The AI first asks two things: interview language and document language (recorded in
#    AGENTS.md — permanent). Then it interviews you — product, domain, stack, boundaries,
#    conventions, mode — and fills docs/, AGENTS.md, and scripts/check.conf from your answers.

./scripts/doctor                  # 4. Confirm the workspace is healthy

# 5. Start your first feature (Claude Code, Cursor, Copilot and Codex share the same commands;
#    in Codex they are skills, typed with $ instead of /: $new-feature, $analyze, ...)
#    lite mode:     /new-feature "short description"    # chains the segments, asks at each gate
#    strict mode:   /analyze "short description"        # one segment per role, one role per session
#    existing behavior must change:  /change "<request> <work item>"
#    any other tool: adapters/generic/README.md (paste the prompts by hand)
```

### 5.1 Ön koşullar

| Gerekli | Neden | Kaynak |
|---|---|---|
| **Git** | Şablon bir git reposudur; `scripts/gate` ve `scripts/status` git geçmişi ister, `scripts/doctor` değişmezlik denetimini git ile yapar | `scripts/gate`, `scripts/status` |
| **POSIX kabuk (`sh`)** ve standart Unix araçları (`awk`, `sed`, `grep`, `find`, `ps` …) | Betiklerin hepsi `#!/bin/sh`; başka bağımlılık yok | `scripts/*` |
| **Bir yapay zekâ kodlama aracı** | Claude Code, GitHub Copilot, Cursor, Codex — ya da prompt yapıştırabildiğin herhangi biri | `adapters/README.md` |
| `git config user.name` dolu olmalı (yalnız `scripts/gate` kullanacaksan) | Karar o adla kaydedilir | `scripts/gate` |
| Projenin kendi araç zinciri (derleyici, test aracı …) | ANEW bunları bilmez ve kurmaz; bootstrap `scripts/check.conf`'a senin komutlarını yazar | ANEW-0011 |

Kurulu olmayan proje araçlarını önceden kurmak zorunda değilsin; yazar videoda bunları ajana kurdurabileceğini söylüyor. (RESMÎ — video, 20:53–23:03)

#### İşletim sistemine göre

| Sistem | Durum | Not |
|---|---|---|
| **Linux** | Doğrudan çalışır | CI da `ubuntu-latest` üzerinde koşar (`.github/workflows/check.yml`) |
| **macOS** | Doğrudan çalışır | `scripts/residue` macOS için ayrı ölçüm yolu içerir (`ps` + `vm_stat`) |
| **Windows** | Betikler bir POSIX kabuğundan çalıştırılır: **Git Bash** (Git for Windows ile gelir) ya da WSL. PowerShell/cmd'den `./scripts/init` doğrudan çalışmaz | `scripts/check` içindeki yorum "works in Git Bash, macOS and Linux" der; `scripts/residue` Git Bash/MSYS/Cygwin için özel yol içerir; yazar videoda Git Bash kullanır (08:24). Repoda "Windows'ta şöyle kurun" diye ayrı bir bölüm **yok**; "Git Bash ya da WSL gerekir" cümlesi bu ipuçlarından çıkarımdır (TAHMİN). |

Satır sonları: `.gitattributes` bütün metin dosyalarını depoda ve her checkout'ta LF'e sabitler (`* text=auto eol=lf`, `scripts/* text eol=lf`). Sebep dosyanın kendi yorumunda yazar: POSIX betikleri LF kalmalıdır, yoksa `sh` satır sonundaki CR karakterinde hata verir. Windows'ta bir editör betikleri CRLF'e çevirirse betikler bozulur. (RESMÎ — `.gitattributes`)

Windows + Claude Code için açık nokta: Claude Code adaptörünün `specs/done/` koruması bir `#!/bin/sh` hook betiğidir (`.claude/hooks/protect-shipped.sh`). Bunun Windows'ta Claude Code tarafından sorunsuz çalıştırılıp çalıştırılmadığı repoda yazmıyor ve bu araştırmada denenmedi. Çalışmasa bile aynı kural CI'da `scripts/doctor --strict` ile yakalanır. (TAHMİN)

### 5.2 Hamle 1 — Şablonun kopyasını al

Önce hangi **sürüm hattından** başlayacağına karar ver:

| Seçenek | Ne alırsın | Kime uygun | Nasıl |
|---|---|---|---|
| **LTS hattı (`1.24.x`)** | Yalnız düzeltme alan sabit hat; en az 04.05.2027'ye kadar destekli. `scripts/status` ve `scripts/gate` **yoktur** (bunlar v1.25 ve v1.26 ile geldi) | Eğitim, kurum içi benimseme, "altımdaki zemin kıpırdamasın" diyen | `git clone --branch v1.24.1 <repo adresi>` (ya da daha yeni bir `v1.24.x` etiketi — 17.11.2026'da en yenisi `v1.24.2`) ya da release arşivi |
| **Current (`main`)** | En yeni sürüm (`v1.26.1`): `scripts/status` ve `scripts/gate` dâhil. LTS değildir | En yeni yardımcıları isteyen, sık güncellemeyi göze alan | GitHub'da **Use this template → Create a new repository**, ya da `main`'i klonla |

(RESMÎ — `README.md` "Versions and support", `CHANGELOG.md`)

> **ÇELİŞKİLİ (küçük):** README "bir etiketten başla, şablon düğmesinden değil — düğme `main`'i kopyalar" der; yazar videoda ise doğrudan **Use this template** düğmesini kullanır (03:42) ve "1.24 itibarıyla kararlı sürüm" der (02:40). İkisi birbirini dışlamaz: düğme bugün `v1.26.1`'i (current) kopyalar; sabit bir zemin isteyen etiketten klonlamalıdır. Bu belge `v1.26.1`'i anlatır; LTS'te olmayan iki betik ilgili yerlerde işaretlenmiştir.

Sonra projenin durumuna göre:

**Dal A — Yeni (boş) proje**

1. Şablondan kendi reponu aç (düğme) ya da etiketi klonlayıp kendi uzak deponu bağla.
2. Yerelde aç: `git clone <kendi repo adresin>` → `cd <klasör>`.
3. `.anew-dev/` klasörünü sil — şablonun kendi geliştirme kayıtlarıdır, senin çalışma alanının parçası değildir. (RESMÎ — `.anew-dev/README.md`: "delete it after you create your repo")
4. Bu aşamada klasörde yalnızca ANEW dosyaları vardır; bootstrap bunu görüp **greenfield** akışını seçer.

**Dal B — Mevcut proje (içinde kod var)**

1. ANEW dosyalarını mevcut reponun köküne kopyala: en az `AGENTS.md`, `docs/`, `specs/`, `workflows/`, `prompts/`, `scripts/`, `adapters/`, `.anew-version`; isteğe göre `.github/` (CI + PR şablonu), `.gitattributes`. README'nin ifadesi yalnızca "or copy the files into an existing repo"dur. (RESMÎ — `README.md`; dosya listesi `scripts/doctor`'ın aradığı çekirdek dosyalardan türetildi — TAHMİN)
2. `scripts/init` **yalnızca içinde bulunduğu reponun köküne** yazar; bu yüzden `scripts/` ve `adapters/` projenin içinde olmalıdır. (RESMÎ — `scripts/init`: kök = betiğin bir üst klasörü)
3. Çakışan dosyalar için repoda adım adım bir birleştirme talimatı **yoktur**. Dikkat edilecekler (TAHMİN):
   - Projende zaten bir `README.md`, `.gitignore`, `.gitattributes`, `.github/workflows/…`, `.github/pull_request_template.md`, `AGENTS.md` ya da `CLAUDE.md` varsa üzerine yazma; ANEW'inkini elle birleştir. Aynı şey klasörler için de geçerli: projende zaten `docs/`, `scripts/` ya da `specs/` klasörü varsa içindeki aynı adlı dosyalar (ör. `docs/architecture.md`, `docs/testing.md`, `scripts/check`) çakışır; hangisinin kalacağına dosya dosya karar ver. `scripts/doctor` kökte `README.md` ve `AGENTS.md` arar, içeriğine bakmaz (yalnız `AGENTS.md`'de "Invariant rules" bloğunu şart koşar).
   - `scripts/init` var olan dosyayı ezmez (`kept … (exists — use --force to overwrite)` yazar) ama **yine de** "Installed: …" satırını basar. Yani mevcut bir `CLAUDE.md` ya da `.claude/settings.json` korunmuşsa işaretçi metni ya da izin/hook ayarları kurulmamıştır; adaptördeki içeriği elle eklemen gerekir.
4. Bootstrap ağaçta kod görür ve **adoption** akışını seçer: stack'i, build/test araçlarını ve mevcut konvansiyonları koddan çıkarır, sana sormak yerine **onaylatır**; build bayraklarını ve fast/full ayrımını dayatmaz, önerir.

Yazarın videoda söylediği alternatif yol: mevcut projede yapay zekâ aracına repo adresini verip "entegre et, gerekli dokümanları indir" demek. (RESMÎ — video, 02:40–03:42; yazılı dokümanda bu yol geçmiyor.)

### 5.3 Hamle 2 — Adaptörü kur: `./scripts/init <araç>`

```bash
./scripts/init claude-code      # ya da: github-copilot | cursor | codex | generic
```

Adaptör ne yapar? İki şey: (a) aracı `AGENTS.md`'ye yönlendirir, (b) yalnızca o araca özgü yetenekleri ekler (komut dosyaları, alt ajan, hook, izin profili). **Kural yazmaz** — kurallar yalnızca `AGENTS.md` ve `docs/`'ta yaşar. Buna "ince adaptör ilkesi" denir (RESMÎ — `adapters/README.md`, ANEW-0001). Komut dosyasını açtığında "içinde neredeyse hiçbir şey yok" diye şaşırma: komut, `workflows/` ve `prompts/` altındaki asıl metne işaret eden iki üç satırdır.

Araç başına ne kurulur, nasıl çağrılır (RESMÎ — `scripts/init`, `adapters/*/README.md`):

| | Claude Code | GitHub Copilot | Cursor | Codex | Generic (başka araç) |
|---|---|---|---|---|---|
| Kurulum | `./scripts/init claude-code` | `./scripts/init github-copilot` | `./scripts/init cursor` | `./scripts/init codex` | `./scripts/init generic` (yalnız bilgi basar) |
| Köke yazılanlar | `CLAUDE.md`, `.claude/commands/*.md`, `.claude/agents/reviewer.md`, `.claude/hooks/protect-shipped.sh`, `.claude/settings.json` | `.github/copilot-instructions.md`, `.github/prompts/*.prompt.md`, `.github/agents/reviewer.agent.md`, `.github/instructions/specs-done.instructions.md` | `.cursor/rules/anew.mdc`, `.cursor/rules/specs-done.mdc`, `.cursor/commands/*.md` | `.agents/skills/<ad>/SKILL.md` + `agents/openai.yaml` | hiçbiri |
| `AGENTS.md` işaretçisi | `CLAUDE.md` (başlık + üç satır: "kurallar AGENTS.md'de, çelişirse AGENTS.md kazanır") | `copilot-instructions.md` | `rules/anew.mdc` (`alwaysApply: true`) | Gerekmez — Codex `AGENTS.md`'yi kendisi okur | Araç okumuyorsa her oturumun başında `AGENTS.md`'yi yapıştır |
| Komut biçimi | Slash komutu: `/analyze …` | Prompt dosyası: Copilot Chat'te `/analyze` | Slash komutu: `/analyze …` | Proje düzeyinde skill: `$analyze …` ya da `/skills` listesinden seç | `prompts/*.md` gövdesini yer tutucuları doldurarak yapıştır |
| Kendiliğinden tetiklenme | — | — | — | Kapalı: `allow_implicit_invocation: false` (Codex, istek öyle "gibi" duyuldu diye kapılı bir aşamayı kendi başlatmasın) | — |
| Bağımsız inceleme | Salt okunur `reviewer` alt ajanı (araçları: Read, Grep, Glob, Bash; Edit/Write yok). `/review` işi ona devreder | Salt okunur `reviewer` özel ajanı (düzenleme aracı yok) ya da yeni sohbet | **Yeni sohbet** (usulen) | **Yeni Codex oturumu** (usulen) | Yeni oturum (usulen) |
| `specs/done/` koruması | Hook, Edit/Write çağrısını fiilen reddeder | Yol kapsamlı talimat (öğüt) | Kural dosyası (öğüt) | Araçta yok | Yok |
| Yıkıcı komut yasağı | `git push --force`, `git push -f`, `git reset --hard`, `git rebase`, `rm -rf` araç tarafından reddedilir | Yok | Yok | Yok | Yok |
| `init` sonunda basılan satır | `Next: open Claude Code here and run /bootstrap` | `Next: open Copilot chat and run /bootstrap` | `Next: open Cursor here and run /bootstrap` | `Next: open Codex here and run $bootstrap` | — |
| Hepsinde ortak son güvence | CI'da `./scripts/doctor --strict` + PR şablonu | aynı | aynı | aynı | aynı |

Bilmen gerekenler:

- **`--force` adaptör adından önce yazılır:** `./scripts/init --force cursor`. Sonda yazarsan (`./scripts/init cursor --force`) betik kullanım metnini basıp çıkar. `--force` var olan dosyaların üzerine yazar; özelleştirdiğin komut dosyaları varsa kaybolur. (RESMÎ — `scripts/init`; sıra ayrıntısı betik kodundan okundu)
- **Birden çok adaptör yan yana kurulabilir** (her biri ayrı klasöre yazar). Yazar videoda aynı repoya hem Claude Code hem Codex adaptörünü kurar (08:24–12:33). Ekipte farklı araç kullananlar için işe yarar.
- **Kurulan dosyalar commit'lenir** (ekip klonlayınca alsın diye). Yalnız Claude Code'un kişisel ayarı `.claude/settings.local.json` `.gitignore`'dadır.
- **Gemini ve listede olmayan diğer araçlar** için ayrı adaptör yoktur; yol `generic` adaptördür (5.4). (RESMÎ — `scripts/init`; video 08:24–12:33: "ben eklememişim")
- Araçların komut/kural biçimleri sürümden sürüme değişir; seninkinde farklıysa **yalnızca adaptör dosyalarını** düzeltirsin, çekirdek değişmez. (RESMÎ — adaptör README'leri)

### 5.4 Generic adaptör: listede olmayan araçla kullanmak

Kurulacak dosya yoktur. Üç hamle (RESMÎ — `adapters/generic/README.md`):

1. **Bağlam:** Araç `AGENTS.md`'yi kendiliğinden okuyorsa tamam. Okumuyorsa her oturumun başında `AGENTS.md`'yi yapıştır (bu yüzden ≤ 40 satır tutulur).
2. **Süreç:** `workflows/<ad>.md` dosyasını aç, adımları izle; atıf yapılan `prompts/*.md` gövdesini `<açılı parantez>` yer tutucularını doldurarak yapıştır.
3. **Bağımsızlık:** REVIEW adımı için yalnız diff'i ve spec'i gören tamamen yeni bir oturum aç.

Slash komutu olmadığında zincirleyici **sensin**; kural yine geçerlidir: segmentler her zaman durur.

| Segment | Oturumu hangi rolle aç | Yapıştır | Yapıştırmadan önce kontrol et | Ne zaman dur |
|---|---|---|---|---|
| ANALYZE | Analyst | `prompts/clarify.md`, sonra `prompts/spec.md` | `specs/active/`'te aynı işe uyan spec yok | Spec'i onayladın ve `Status: Approved` yaptın |
| PLAN | Developer (yeni oturum) | `prompts/plan.md` | Spec `Status: Approved` diyor | Planda `Approved by / on` satırını doldurdun |
| BUILD | Developer | `prompts/build.md` | Planın `Approved by / on` satırı dolu; spec'i `In progress` yap | `./scripts/check` çıktısı yeşil ve gösterilmiş |
| REVIEW | Reviewer (taze oturum; yalnız diff + spec) | `prompts/review.md` | Bir dal/diff var | Bulgu raporu elinde — sonra triyaj |
| VERIFY | QA (taze oturum) | `prompts/verify.md` | Triyaj tamam (ya da temiz bir one-pass review) | Kriter ↔ kanıt tablosu tam — sonra ship |
| CHANGE (var olan davranış) | Analyst | `workflows/change-request.md`'deki triyaj cetveli, sonra `specs/TEMPLATE-mini.md` ile ANALYZE | Aynı `Source:` anahtarlı açık spec yok | Hüküm onaylandı; sonra şeridin kapıları |

Hiçbir araç zorlamasa da kapılar tutar, çünkü durum alanlarının tutarlılığını `./scripts/doctor` (CI'da `--strict`) denetler.

### 5.5 Hamle 3 — Bootstrap: `/bootstrap`

Bootstrap, şablonu **senin projene** uyarlayan bir mülakattır. Proje başına bir kez çalıştırılır (gözden geçirmek için yeniden çalıştırılabilir). Uygulama kodu yazmaz; kararları dokümana döker. Yazar bunu "ilk hareket: yapay zekâya projeyi öğretmek" diye tanıtır ve bootstrap'in projenin her ayrıntısını değil **genel çatısını** öğrendiğini söyler. (RESMÎ — `workflows/bootstrap.md`; video 12:33–14:37)

| Araç | Çağrı |
|---|---|
| Claude Code, Cursor, GitHub Copilot | `/bootstrap` |
| Codex | `$bootstrap` |
| Başka araç | `prompts/bootstrap.md` gövdesini yapıştır |

Altı aşama (0'dan 5'e): `LANGUAGE → INSPECT → INTERVIEW → GENERATE → VERIFY → REPORT`. Üç yerde insan kararı beklenir: dil, mülakat cevapları, son rapor.

| # | Aşama | Ne olur | Senden ne istenir |
|---|---|---|---|
| 0 | **LANGUAGE** | İki ayrı ayar sorulur: (a) mülakat/sohbet dili, (b) proje belgelerinin dili (`docs/`, spec, plan, ADR, raporlar). İkisi ayrı, çünkü uluslararası ekipler çoğu zaman bir dilde konuşup başka dilde belgeler. Cevap kalıcıdır: `AGENTS.md`'nin `Language:` satırına (`chat=<xx> · docs=<xx>`) ve `docs/conventions.md`'ye yazılır | İki dili seç |
| 1 | **INSPECT** | Ajan çalışma ağacına bakar. Yalnız ANEW dosyaları varsa **greenfield**; kod varsa **adoption** (stack, build sistemi, test kurulumu, konvansiyonlar koddan çıkarılır) | Adoption'da bulguları onayla |
| 2 | **INTERVIEW** | Her seferinde tek konu, her soruda ajanın önerisi ve gerekçesi (öneri kuralı) | Her konuda karar ver |
| 3 | **GENERATE** | `docs/` şablonları dolar; `scripts/check.conf` yazılır; `AGENTS.md`'de `Mode` ve `Language` ayarlanır, proje özeti yeniden yazılır. Çıktı `chore/bootstrap` dalında commit'lenir — asla varsayılan dalda değil | — |
| 4 | **VERIFY** | `./scripts/doctor`, `./scripts/check`, kalıntı testi (`./scripts/residue` ve `./scripts/residue --fast`), ortam hükmü, "bağlam sınavı" | Çalıştırılamayan profil varsa karar ver (R-13) |
| 5 | **REPORT** | Ne üretildi, ne **varsayıldı**, hangi kararlar hâlâ açık (önerileriyle). Uzak depo ve CI var mı diye sorar | Çalışma alanını onayla |

**Türkçe kullanan için kritik ayrıntı:** sohbet ve belge dili Türkçe seçilebilir (`chat=tr · docs=tr` gibi); ama **protokol alanları İngilizce kalır**: `Status:` değerleri (`Draft`, `Approved`, `In progress`, `Shipped`), `Approved by / on:`, `Source:`, şablon başlıkları (`## Acceptance criteria` …). Sebep: kapılar ve `scripts/doctor` bu satırları okur; çevirirsen okuyamaz. (RESMÎ — `workflows/bootstrap.md` adım 0, `docs/conventions.md`)

#### Mülakatta sorulan konular

(RESMÎ — konular ve sıraları `prompts/bootstrap.md`'den; videoda 14:37–31:32 arasında aynı sıra görülür. "Cevap nereye yazılır" sütunu, prompt'un açıkça adlandırdığı dosyalar ile `docs/` şablonlarındaki başlıklardan derlenmiştir; "Ürün ve hedef" ile "Stack ve sürümler" satırlarındaki hedef dosya prompt'ta adıyla geçmez — TAHMİN.)

| Konu | Ne sorulur | Cevap nereye yazılır |
|---|---|---|
| Ürün ve hedef | Bu ürün ne, kim için, ne için | `AGENTS.md` özeti |
| Alan terimleri ve iş kuralları | Ortak dil; numaralı, test edilebilir iş kuralları (`BR-1`, `BR-2` …) | `docs/domain.md` |
| Hassas alanlar | Hatanın para/erişim/hukuki sonuca mal olduğu yerler ("None" geçerli) | `docs/domain.md` |
| Stack ve sürümler | Greenfield'da sorulur; adoption'da koddan bulunan onaylatılır | `docs/conventions.md` |
| Mimari stil ve modül sınırları | Yasak modül bağımlılıkları dâhil | `docs/architecture.md` |
| Konvansiyonlar | Veri kuralları, hata yönetimi, adlandırma | `docs/conventions.md` |
| Test beklentileri | Hangi katman neyi kanıtlar; ajan component testlerini önerir, kritik bir yolculuk gerektirmedikçe e2e önermez; e2e varsa hangi yolculuklar, bütçe, araç, deterministik mod | `docs/testing.md` |
| Bu stack'in bilinen tuzakları | Boş kalabilir | `docs/conventions.md` "Known traps" |
| Güvenlik duruşu | Kimlik doğrulama, yetkilendirme, bağımlılık politikası | `docs/security.md` |
| Git kuralları | Dal, commit, PR | `docs/git.md` |
| Trivial değişiklik politikası | Etiket/yazım hatası düzeyindeki değişiklik ne gerektirir? (1) PR + bir reviewer, spec yok — **önerilen**; (2) trivial dalda doğrudan commit; (3) her şey mini-spec'ten — en sıkı | `docs/git.md` "Trivial changes" |
| Çalışma modu | `lite` mi `strict` mi — ajan ekip büyüklüğüne ve riske göre birini önerir | `AGENTS.md` `Mode:` |

Videodan pratik ipuçları (RESMÎ — video): sorular seçenekli liste yerine düz metin gelebilir, düz metinle cevaplamak yeter (14:37); bir öneri listesinin tek maddesi uymuyorsa "BR-5 şöyle olsun, diğerlerini kabul ediyorum" gibi kısmi cevap verilir (17:48); hazır bir mimari/kural dokümanın varsa repo köküne koyup "mimari şu dokümanda" demek yeter (23:03); alan terimleri ve iş kuralları "en önemli kısım"dır, çünkü sonraki bütün spec'ler buna dayanır (18:48).

#### Mod seçimi: lite mi strict mi?

| | **Lite** | **Strict** |
|---|---|---|
| Kimin için | Tek geliştirici, düşük riskli iş | Ekip, kritik sistem |
| Nasıl başlanır | `/new-feature "…"` — segmentleri zincirler, her kapıda sorar | `/analyze "…"` — rol başına bir segment, oturum başına bir rol |
| `/new-feature` | Çalışır | **Reddeder**, segment komutlarına yönlendirir |
| Netleştirme (clarify) | Spec taslağının içine katılır; ajan varsayımını söyler, itiraz yoksa devam eder (hassas alanda yine sorulur) | Ayrı adım; her soruyu insan cevaplar |
| Spec onayı | Hızlı evet/hayır — ama asla atlanmaz | Tam onay |
| Review ve verify | Koşullar uygunsa tek bağımsız oturumda (one-pass review) | Ayrı oturumlar |
| Değişmeyenler | Plan onayı, triyaj ve ship insan kapısıdır; bağımsız inceleme pazarlık dışıdır; üreten kendi işini doğrulamaz | aynı |

Mod sonradan `AGENTS.md`'deki `Mode:` satırı düzenlenerek değiştirilebilir; README modun "proje başına — ya da özellik başına" seçilebileceğini söyler. (RESMÎ — `README.md` "Two operating modes", "Adapting it")

#### Bootstrap ne üretir?

| Dosya | Ne yazılır |
|---|---|
| `docs/architecture.md`, `domain.md`, `conventions.md`, `testing.md`, `security.md`, `git.md` | Mülakat cevaplarından doldurulur |
| `scripts/check.conf` | Bu stack'in gerçek build/test/lint komutları; hızlı adımlar `[fast]` etiketli; makineden bir şey isteyen adımlar için `requires` satırları |
| `AGENTS.md` | `STATUS: NOT CONFIGURED` bandı gider; `Mode:` ve `Language:` dolar; proje özeti yazılır. "Invariant rules" bloğu **aynen** kalır; dosya ≤ 40 satır kalır — dokümanlara işaret eder, onları kopyalamaz |
| `.github/workflows/check.yml` (isteğe bağlı) | Araç zinciri kurulum adımları (ör. `setup-node`) önerilebilir |
| `specs/backlog.md` | Senin ertelediğin açık kararlar `Source: bootstrap <YYYY-MM-DD>` ile |

`check.conf` yazılırken ajan "kaynak hijyeni" için dört iş yapar (RESMÎ — `prompts/bootstrap.md`): **envanter** (her komutun arkasında bırakabileceği süreçler ve bir sonraki koşuya bıraktığı veri), **etkisizleştirme** (no-daemon / run-once anahtarları; yoksa süreci aynı adımın içinde, çıkış kodunu koruyarak durdurma), **kanıt** (kalıntı testi; kapıda tek satır: `Residue: clean (fast + full)`), **bölme** (hızlı adımları `[fast]` ile etiketleme; test adımını dosya listesiyle değil bir *selector* ile bölme). Senden bu testi çalıştırman ya da makineyi boşta bırakman **istenmez**.

#### Greenfield ile adoption farkı

| Konu | Greenfield (boş proje) | Adoption (mevcut kod) |
|---|---|---|
| Stack ve sürümler | Sorulur | Koddan bulunan onaylatılır |
| `scripts/check.conf` | Planlanan adımlar ve `requires` satırları **yorum satırı** olarak durur (kod yokken komut çalışmaz; kural 1 de kodu yasaklar). İlk spec — yürüyen iskelet — bunları etkinleştirir | Gerçek build/test/lint komutları |
| `./scripts/check` | "greenfield no-op" notuyla boş geçer; yeşil satır basmaz | Geçmek zorunda |
| `./scripts/doctor` | "no steps" uyarısı beklenir; profil hükmü henüz yok | Profil başına hüküm gösterilir |
| Kalıntı testi | `RESIDUE NOT MEASURED`; ilk adımları ekleyen iş çalıştırır | Çalıştırılır |
| Ortam kararı (R-13) | Yürüyen iskeletin plan kapısında | Bootstrap'in VERIFY kapısında, ilk özellikten önce |
| Build bayrakları, fast/full ayrımı | Doğrudan kurulur | Önerilir, dayatılmaz |
| İlk iş | Yürüyen iskelet spec'i | İlk özellik ya da değişiklik |

Yazar videoda bootstrap raporundaki "check henüz hiçbir şeyi kanıtlamıyor, çünkü ortada kod yok" notunu "çok normal" diye yorumlar. (RESMÎ — video, 31:32)

#### Bağlam sınavı

Bootstrap'in kendi başarı ölçütü: **taze** bir oturum açıp projeyle ilgili bir soru sor (repodaki örnek: "what type do money fields use?" — para alanları hangi tipi kullanır?). Ajan cevabı dosyalardan bulabilmelidir. Bulamıyorsa "docs öğretmiyor demektir; düzelt". (RESMÎ — `workflows/bootstrap.md` adım 4)

#### Bootstrap nasıl biter?

Rapor, seçtiğin moda uyan tek bir sonraki komutla biter (RESMÎ — `workflows/bootstrap.md` adım 5):

- lite → `Next: /new-feature "<feature>"`
- strict → `Next: /analyze "<feature>"` (bir Analyst oturumunda)
- var olan bir davranış değişecekse (iki modda da) → `/change "<request> <work item>"`

Sonra `chore/bootstrap` dalı her dal gibi merge edilir (videoda: push → PR → squash merge; 35:34).

### 5.6 Hamle 4 — Kurulum doğru mu? `doctor`, `check`, `status`

| Ne zaman | Komut | Sağlıklıysa ne görürsün |
|---|---|---|
| `init`'ten sonra, bootstrap'ten önce | `./scripts/doctor` | "no adapter installed" uyarısı gitmiştir; "not configured", "mode not set", "language not set", "check.conf missing" uyarıları **hâlâ vardır** — bu beklenir |
| Bootstrap'ten sonra | `./scripts/doctor` | Son satır `== result: 0 fail, N warn ==`; `ok    AGENTS.md configured`, `ok    operating mode set`, `ok    language set`, `ok    ANEW base version: v1.26.1`, `ok    an AI tool adapter is installed`. Greenfield'da "check.conf has no steps" uyarısı kalır |
| Bootstrap'ten sonra | `./scripts/check` | Mevcut projede `CHECK GREEN (full, <n> steps, <t> s)`; boş projede `check: check.conf has no steps — greenfield no-op. Add steps as soon as code exists.` |
| İstediğin an | `./scripts/status` (yalnız v1.25+) | Henüz iş yoksa `no work yet — start with /new-feature or /analyze` |
| Bootstrap sonunda (ajan çalıştırır) | `./scripts/residue`, `./scripts/residue --fast` | `RESIDUE CLEAN (full, 2 runs)` / `RESIDUE CLEAN (fast, 2 runs)`; greenfield'da `RESIDUE NOT MEASURED` |

Şablon yeni klonlanmış, henüz `init` ve bootstrap yapılmamışken `./scripts/doctor` çıktısı aşağıdaki gibi olur. Bu çıktı **çalıştırılarak alınmadı**; betik metnindeki mesajlardan ve şablonun dosya durumundan türetildi, gerçek çalıştırmada küçük farklar olabilir (TAHMİN):

```text
== ANEW doctor ==
ok    core structure complete
ok    recovery catalog present (13 ramps)
WARN  AGENTS.md not configured yet — run the bootstrap workflow (/bootstrap or prompts/bootstrap.md)
WARN  operating mode not set (lite/strict) — bootstrap sets it in AGENTS.md
WARN  chat/document language not set — bootstrap step 0 sets the Language line in AGENTS.md
ok    AGENTS.md invariant rules block present
WARN  scripts/check.conf missing — bootstrap generates it; until then './scripts/check' has nothing to run
ok    ANEW base version: v1.26.1
WARN  no adapter installed — run ./scripts/init <claude-code|github-copilot|cursor|codex|generic>
ok    shipped specs unchanged vs HEAD (specs/done/ immutable)
ok    adapter parity: every Claude Code command exists for Cursor, Copilot and Codex
ok    command reference covers every command (docs/commands.md)
== result: 0 fail, 5 warn ==
```

Okuma şekli: kurulum ilerledikçe uyarılar birer birer kapanır. `generic` adaptör dosya bırakmadığı için "no adapter installed" uyarısı generic kullananlarda kalır (TAHMİN — betiğin aradığı dosyalardan).

Bootstrap öncesi bir komut çalıştırırsan ne olur? `AGENTS.md` hâlâ `Mode: unset` taşıdığı için `/new-feature` durur ("bootstrap has not run"); `./scripts/check` ise `check: no scripts/check.conf yet.` deyip çıkar. İkisi de "önce bootstrap" demenin yoludur. (RESMÎ — `workflows/segments.md`, `scripts/check`)

### 5.7 Ekipte, strict modda bir öneri daha

"Planı kim onayladı?" sorusu yalnızca Documented'tır, çünkü dosyadaki bir satır kimlik kanıtlayamaz. README'nin önerdiği gerçek çözüm barındırma platformundadır: varsayılan dalı koru ve `CODEOWNERS` üzerinden pull request incelemesi zorunlu kıl; o zaman onaylayanın kimliği GitHub'dan gelir. Aynı dal koruması "force push yok" kuralını her araç için Enforced yapar. (RESMÎ — `README.md`, kural gücü tablosunun altı)

---

## 6. Komut / skill referansı (12 komut)

"Komut" ya da "skill" denen şey, `prompts/` ve `workflows/` altındaki metinlerin aracına bağlanmış hâlidir: Claude Code ve Cursor'da slash komutu, GitHub Copilot'ta prompt dosyası, Codex'te proje düzeyinde skill. Dört araç adaptörünün (Claude Code, GitHub Copilot, Cursor, Codex) hepsinde **aynı 12 komut** vardır; `generic` adaptörde komut dosyası yoktur, aynı işler prompt gövdeleri elle yapıştırılarak yapılır. `scripts/doctor` bu eşliği, `adapters/` klasörü repoda durduğu sürece denetler (eksik komut = `FAIL`). (RESMÎ — `adapters/README.md`, `scripts/doctor`)

### 6.1 Komut haritası

```
INTENT → /analyze → {spec onayı} → /plan → {plan onayı} → /build → /review → {triyaj} → /verify → {ship} → SHIP
                                                              ▲                    │
                                                              └── gerçek bulgular: düzeltme turları
```

Süslü parantezli dört durak insan kapısıdır. `/new-feature` bu satırın tamamını lite modda zincirler. Döngünün dışında, her zaman kullanılabilenler: `/change` (var olan davranış), `/fix-bug` (bozuk davranış), `/refactor` (yalnız yapı), `/bootstrap` (kurulum), `/adr` (karar kaydı), `/recover` (kurtarma). (RESMÎ — `docs/commands.md`, Command map)

İki altın kural (RESMÎ — `docs/commands.md`, "Two golden rules"):

1. **Segments always stop.** Her segment devrinde biter; yalnız `/new-feature` (lite) ilerler, o da yalnız sen onayladıktan sonra.
2. **Dört insan kapısı — spec approval, plan approval, triage, ship — hiçbir modda otomatikleşmez.**

> **ÇELİŞKİLİ (ifade farkı):** `README.md` "The loop" bölümü "iki insan kontrol noktası asla otomatikleşmez: plan approval ve finding triage" der ve ardından spec onayının da her zaman sorulduğunu ekler. `docs/commands.md` ve `docs/roles/README.md` ise **dört** kapı sayar. `workflows/segments.md` lite için de dört kapıyı açıkça listeler. Bu belge dört kapıyı esas alır.

### 6.2 Araç başına çağrı sözdizimi

| Araç | Yazım | Argüman nasıl verilir |
|---|---|---|
| Claude Code | `/plan 0003` | Komuttan sonra yazdığın metin (`$ARGUMENTS`) |
| Cursor | `/plan 0003` | Komuttan sonra yazdığın metin |
| GitHub Copilot (Chat) | `/plan` | Prompt dosyası argümanı `${input:target}` değişkeniyle alır |
| Codex | `$plan 0003` ya da `/skills` listesinden seç | Skill adından sonraki metin |
| Başka araç | — | `prompts/plan.md` gövdesini `<NNNN>` gibi yer tutucuları doldurup yapıştır |

Aşağıdaki başlıklarda komutlar `/komut` biçiminde yazılır; Codex'te aynı ad `$komut`'tur.

### 6.3 Özet tablo

| Komut | Tek satır | Argüman | Nerede durur | Lite | Strict |
|---|---|---|---|---|---|
| `/bootstrap` | ANEW'i projene uyarlar | — | Dil · mülakat · rapor | Modu o ayarlar | Modu o ayarlar |
| `/new-feature` | Segmentleri zincirler | kısa özellik tanımı | Dört kapının her biri | Zincirler | Reddeder |
| `/analyze` | Niyet → onaylı spec | kısa özellik tanımı | Spec onayı | Clarify taslağa katılır | Önce clarify |
| `/plan` | Onaylı spec → onaylı plan | spec numarası (`NNNN`) | Plan onayı | Aynı | Kendi oturumu |
| `/build` | Onaylı plan → yeşil check | spec numarası | Check çıktısıyla devir | Aynı | Kendi oturumu |
| `/review` | Bağımsız, salt okunur inceleme | spec numarası ya da dal/diff | Bulgular → triyaj | Aynı | Aynı |
| `/verify` | Kriter ↔ kanıt | spec numarası | Tablo → ship | Aynı | Kendi oturumu |
| `/change` | Triyaj, sonra davranışın gerektirdiği şerit | ne değişecek + iş kalemi anahtarı | Hüküm; şeridin kapıları | Şeridi zincirler | Yalnız ANALYZE (mini) |
| `/fix-bug` | Önce kırmızı yeniden üretme testi | ne bozuk; beklenen ve gerçekleşen | Yeniden üretme · triyaj | Aynı | Aynı |
| `/refactor` | Davranış değişmeden yapı, kanıtlı | neyi neden yeniden düzenleyeceğin | Onay · triyaj | Aynı | Aynı |
| `/adr` | Bir kararı tartış, sonra kaydet | karar sorusu | Senin kararın | Aynı | Aynı |
| `/recover` | Uygun kurtarma rampasını çalıştır | ne oldu | Rampa onayı | Aynı | Aynı |

(RESMÎ — `docs/commands.md` "Quick reference"; argüman sütunu Claude Code komut dosyalarındaki `argument-hint` alanından)

---

### 6.4 `/bootstrap`

**Ne işe yarar.** ANEW'i bir mülakatla projene uyarlar: `language → inspect → interview → generate → verify → report`. Boş ağaçta greenfield, kod varsa adoption akışını izler. Ayrıntısı Bölüm 5.5'te.

**Ne zaman.** Proje başına bir kez, `scripts/init`'ten hemen sonra. Kararları gözden geçirmek için yeniden çalıştırılabilir. **Ne zaman değil:** özellik eklemek için (o `/new-feature` ya da `/analyze`).

**Nasıl çağrılır.** `/bootstrap` (Codex: `$bootstrap`; başka araç: `prompts/bootstrap.md` yapıştır). Argüman almaz.

**Adım adım.**
1. `AGENTS.md`'yi okur, `workflows/bootstrap.md`'yi `prompts/bootstrap.md` ile yürütür.
2. İki dili sorar (kapı).
3. Ağacı inceler; greenfield mi adoption mı söyler.
4. Konu konu mülakat yapar; her soruda önerisini verir (kapı: her cevap senin).
5. `docs/*.md`, `scripts/check.conf`, `AGENTS.md`'yi üretir; `chore/bootstrap` dalında commit'ler.
6. `./scripts/doctor`, `./scripts/check` ve kalıntı testini çalıştırır.
7. Raporu sunar (kapı: çalışma alanını onaylarsın) ve modun ilk komutuyla bitirir.

**Okur / yazar.** Okur: `AGENTS.md`, `prompts/bootstrap.md`, çalışma ağacı. Yazar: `docs/*.md`, `scripts/check.conf`, `AGENTS.md`'nin `Mode` ve `Language` satırları ile proje özeti (değişmez kurallar aynen), gerekirse `specs/backlog.md`.

**Nerede durur.** Dil · mülakat cevapları · son rapor. Her kapı mesajında tek karar sorulur.

**Bitince ne beklenir / sonraki adım.** Dolu `docs/`, çalışan (ya da greenfield'da yorum satırlı) `check.conf`, `Mode:` ve `Language:` ayarlı `AGENTS.md`. Sonraki: `chore/bootstrap`'i merge et → `./scripts/doctor` → lite'ta `/new-feature "…"`, strict'te `/analyze "…"`.

**Örnek (temsili).** Raporun son bölümü, sohbet dilinde gelir; yalnız `Next:` satırının biçimi sabittir:

```text
Açık kararlar (önerilerimle):
  1. chore/bootstrap dalı: push edip PR açalım, squash-merge edelim.
  2. "Full green" kaynağı: CI yok; yerel tam koşu kanıt sayılsın (docs/testing.md, rule 6).
  3. E-posta bildirimi: ilk sürümde kapsam dışı kalsın → specs/backlog.md (Source: bootstrap 2027-01-11)
Yukarıdaki üç önerinin tümünü kabul ediyor ve çalışma alanını onaylıyor musun?

Next: /new-feature "yürüyen iskelet: uygulama ayağa kalkar, sağlık durumunu gösterir"
```

**Sık hatalar.**
- VERIFY adımındaki kalıntı testini atlamak — "a bootstrap that fails it is not done". (RESMÎ — `docs/commands.md`)
- Önerileri okumadan onaylamak. Yazar videoda yalnızca süre yüzünden hızlı geçtiğini, gerçekte metinlerin okunması gerektiğini söyler (23:03).
- Belge dili Türkçe diye `Status: Approved` gibi protokol alanlarını çevirmek.

---

### 6.5 `/new-feature`

**Ne işe yarar.** Zincirleyicidir, segment değildir. Önce `AGENTS.md`'den `Mode`'u okur; lite'ta `/analyze → /plan → /build → /review → /verify` zincirini çalıştırır ve dört kapının her birinde durup sana sorar. Kural: **"Segments always stop; /new-feature flows only as far as the mode allows."**

**Ne zaman.** Lite modda her yeni özellik burada başlar. **Ne zaman değil:** strict modda (reddeder); var olan bir davranışı değiştirirken (`/change`); bozuk bir davranışı düzeltirken (`/fix-bug`).

**Nasıl çağrılır.** `/new-feature "kısa tanım"`. Niyeti kısa yaz; ayrıntıyı ajan sorularıyla çıkarır (RESMÎ — video, 37:37).

**Moda göre üç dal.** (RESMÎ — `adapters/claude-code/.claude/commands/new-feature.md`)

| `AGENTS.md`'deki `Mode` | Davranış |
|---|---|
| `lite` | Zinciri çalıştırır; her segment kendi giriş kontrolüyle, hiçbiri atlanmadan. Dört kapıda durur; yalnız açık onayla devam eder |
| `strict` | Hiçbir aşamaya başlamadan reddeder (aşağıdaki mesajla) ve durur |
| `unset` | Durur: bootstrap çalışmamış |

Strict'teki ret mesajı sohbet dilinde verilir, komut adları birebir kalır; anlamı: *"Mode is strict: stages are role-owned. Analyst starts with /analyze; subsequent roles run /plan, /build, /review, /verify in their own sessions."*

**Adım adım (lite).**
1. `specs/active/`'te isteğe uyan spec var mı diye bakar. Varsa durumunu ve planın onay satırını bildirir, **bir sonraki kapıdan devam eder** — asla ikiz spec açmaz.
2. ANALYZE → **kapı 1: spec onayı**.
3. PLAN → **kapı 2: plan onayı**.
4. BUILD → yeşil `./scripts/check`.
5. REVIEW: işi bağımsız incelemeciye verir. Claude Code'da `reviewer` alt ajanı; Copilot'ta `reviewer` özel ajanı ya da yeni sohbet; **Cursor ve Codex'te bu sohbetin içinde bağımsız olamaz** — sana yeni bir sohbet/oturum açıp `/review`'u orada çalıştırmanı, bulguları buraya yapıştırmanı söyler. → **kapı 3: triyaj**.
6. Gerekirse düzeltme turları.
7. VERIFY → **kapı 4: ship**.

**One-pass review.** Koşullar tutuyorsa (iş hassas alan dışında; hiçbir kriter kodun kasıtlı bozulmasını gerektirmiyor) zincirleyici REVIEW ve VERIFY'ı **tek** bağımsız oturumdan ister. O oturum koşulları dosyalardan kendisi denetler; review "clean" çıkarsa QA şapkasına geçtiğini duyurur ve kanıt tablosunu aynı rapora ekler. Tek bir bulgu bile varsa akış olağan hâline döner. Devir satırı: `Next: TRIAGE — human (confirm the clean verdict and the evidence table); then SHIP`. (RESMÎ — `workflows/segments.md`)

**Okur / yazar.** Kendi başına: `AGENTS.md`, `workflows/segments.md`. Gerisi çağırdığı segmentlerin okuyup yazdıklarıdır.

**Nerede durur.** spec approval · plan approval · triage · ship. Kapı mesajı başına tek karar.

**Sık hatalar.**
- Bir kapıyı aşıp kendiliğinden akmasını beklemek — her kapıda sorar, her modda. (RESMÎ — `docs/commands.md`)
- Aynı iş için ikinci kez çalıştırıp yeni spec beklemek — var olanı sürdürür.
- Kapıda "tamam" deyip hangi kararı cevapladığını belirtmemek: hangi karara ait olduğunu söylemeyen cevap **geri sorulur, yorumlanmaz**. (RESMÎ — `workflows/segments.md`, Contract)

---

### 6.6 `/analyze` (segment ANALYZE)

**Ne işe yarar.** Niyet → netleştirme → spec (öz-eleştiri geçişiyle) → spec onayı. Rol: Analyst.

**Ne zaman.** Strict'te Analyst bir özelliği bununla başlatır. Lite'ta doğrudan çağırmak "bu kapıdan devam etmek" içindir. **Ne zaman değil:** ondan plan istemek için — asla plan, plan önerisi ya da kod üretmez.

**Nasıl çağrılır.** `/analyze "kısa özellik tanımı"`.

**Adım adım.**
1. **Giriş kontrolü (hard): ikiz yok.** `specs/active/`'te isteğe uyan spec varsa sürdürmeyi teklif eder; aynı iş için ikinci spec açmaz. Yeni numara = `active/`, `done/` ve `plans/` içindeki en yüksek + 1.
2. `prompts/clarify.md`: 3–5 cümlelik **niyet taslağı** (iş diliyle: kim istiyor, neden, başarı neye benzer, bilerek ne yapılmıyor) ve en çok ~7 **netleştirme sorusu** — yalnız cevabı spec yazılmadan önce *zorunlu* olanlar (sınırlar, boş/hata durumları, erişim, hacim, performans; arayüz işiyse akış, ekran durumları, tasarım var mı). Her soruda ajanın önerisi vardır.
3. `prompts/spec.md`: spec'i `specs/TEMPLATE.md`'den yazar. Gereksinimler **davranışı** anlatır (endpoint, tablo, cache yok). Kriterlerin her biri bağımsız test edilebilir olmalı; mutlu yol, sınırlar, boş durumlar, geçersiz girdi ve yetkilendirme kapsanır. Arayüz varsa akış, durumlar (empty, loading, error, success, no permission), tasarım bağlantısı ve erişilebilirlik yazılır; listelenen **her durum bir kriter alır**; görsel uydurulmaz.
4. **Öz-eleştiri (self-critique):** ajan spec'i "düşmanca bir okur gibi" okur — bir geliştiricinin hâlâ soracağı ne kalmış (muğlak kriter, eksik sınır değeri, tanımsız hata davranışı)? Her boşluğu önerisiyle listeler; hangilerinin katılacağını sen onaylarsın. Sonra `- Self-critique: done`.
5. **Boyut uyarısı:** birden fazla kullanıcı yeteneği ya da ~8–10'dan fazla kriter varsa bölmeyi önerir (spec'leri ve sırasını adlandırarak). Tek tutmaya karar verirsen bu, kısıtlara yazılır: `Split: proposed <specs>; kept as one — <who>, <reason>`.
6. **Kapı: spec onayı.** Onayında `Status: Approved` yazılır.
7. Devir: "no open questions remain" · `Next: PLAN — Developer` → **durur**.

**Okur / yazar.** Okur: `AGENTS.md`, `docs/roles/analyst.md`, `workflows/segments.md`, `prompts/clarify.md`, `prompts/spec.md`, `specs/active/`, `specs/done/`, `specs/plans/`. Yazar: `specs/active/NNNN-<ad>.md`.

**Lite / strict farkı.** Lite netleştirmeyi taslağın içine katar; onay hızlı bir evet/hayırdır ama atlanmaz. Strict önce netleştirir, sonra taslak yazar. Hassas alana dokunan iş lite'ta da önce netleştirir.

**Örnek çağrı ve devir (temsili).**

```text
/analyze "üye bir kitabı ödünç alabilsin"

… (niyet taslağı, sorular, spec, öz-eleştiri boşlukları) …

Spec onaylandı: specs/active/0002-odunc-alma.md — Status: Approved, Self-critique: done.
Açık soru kalmadı.
Next: PLAN — Developer
```

**Sık hatalar.** Ondan plan istemek; gereksinimlere teknik çözüm yazdırmak ("şu tabloya şu kolon"); öz-eleştiri boşluklarını okumadan "hepsini kabul" demek.

---

### 6.7 `/plan` (segment PLAN)

**Ne işe yarar.** Onaylı spec'ten bir plan üretir; plan onayını **plan dosyasına** kaydeder. Rol: Developer. Kod yazmaz.

**Ne zaman.** Spec onayından sonra; planı revize etmek için yeniden.

**Nasıl çağrılır.** `/plan 0002`.

**Adım adım.**
1. **Giriş kontrolü (hard):** spec `Status: Approved` (ya da iş ortasında revize ediliyorsa `In progress`) değilse şu mesajla reddeder: **"Spec not approved — run ANALYZE or get approval first."** Plan dosyası zaten varsa revize etmeyi teklif eder.
2. Önce `./scripts/doctor` çalıştırır: karşılanmayan her adım ön koşulu ve bu makinedeki profil hükmü bir **risk** maddesidir (ortam eksiği, R-13) — plan onayında karara bağlanır, BUILD'in sonunda keşfedilmez.
3. `specs/plans/NNNN-plan.md`'yi şablondan yazar: değişecek/eklenecek dosyalar yol yol ("bu liste etki alanıdır — dürüst ol"), sıralı ve commit boyutunda adımlar, riskler ve emin olunmayan noktalar (her biri öneriyle), **kriter ↔ test eşlemesi** (her kriter, onu kanıtlayacak test ve çalışacağı profil: fast ya da full).
4. **Boyut uyarısı:** ~150 satırı aşan plan spec'in fazla büyük olduğunu gösterir; onay istemeden önce bölme önerir.
5. Spec'te boşluk ya da `docs/` ile çelişki görürse **şimdi** söyler (R-10) — build sırasında değil.
6. **Kapı: plan onayı.** Adını sorar (`git config user.name`'i önerir); planda `Status: Approved` ve `Approved by / on: <ad>, <YYYY-MM-DD>` yazılır.
7. Devir: `Next: BUILD — Developer` → **durur**.

**Okur / yazar.** Okur: spec, `prompts/plan.md`, `docs/` (architecture, conventions, testing, security). Yazar: `specs/plans/NNNN-plan.md`.

**Onayı kaydetmenin iki yolu.** Ajan kapıda senin onayınla satırı yazar; ya da planı okuduktan sonra terminalden kendin kaydedersin: `./scripts/gate approve-plan 0002` (v1.26+). İkisi aynı kaydı üretir.

**Örnek dosya parçası (temsili).**

```markdown
- Spec: `specs/active/0002-odunc-alma.md`
- Status: Approved
- Approved by / on: Hayalî Geliştirici, 2027-01-12
```

**Sık hatalar.**
- **Sohbette onaylamak.** Yalnız doldurulmuş `Approved by / on` satırı sayılır; `/build` ve `scripts/doctor` sohbeti değil dosyayı okur. (RESMÎ — `docs/commands.md`)
- Planı okumadan onaylamak. Sorulacak üç soru: plan her kritere dokunuyor mu, etki alanı makul mü, riskler dürüst mü? (RESMÎ — `workflows/feature-development.md` adım 4)

---

### 6.8 `/build` (segment BUILD)

**Ne işe yarar.** Onaylı planı adım adım uygular; `./scripts/check` (full) yeşil olana kadar. Rol: Developer.

**Ne zaman.** Plan onayından sonra; `In progress` bir build'e devam etmek için; triyaj sonrası düzeltme turları için (`prompts/build.md §fixes`).

**Nasıl çağrılır.** `/build 0002`.

**Adım adım.**
1. **Giriş kontrolü (hard):** planın `Approved by / on` satırı bir ad ve tarih tutmuyorsa (boş, `—` ya da yalnızca şablon yorumu = onaysız) reddeder: **"Plan not approved — run PLAN and get the approval recorded first."**
2. `./scripts/doctor` çalıştırır, profil hükmünü gösterir. Planın Risks bölümündekinden farklıysa (başka makine, değişmiş ortam) durur: **"Environment differs from the plan — R-13."** (`check fails on the check.conf errors above` hükmü ortam eksiği değil conf hatasıdır: önce `check.conf` düzeltilir.)
3. İlk değişiklikten önce spec'i `Status: In progress` yapar. Zaten öyleyse planın bir sonraki bitmemiş adımından devam eder.
4. Dalda çalışır: `feature/<spec-no>-<kısa-ad>` (`docs/git.md`). Commit'ler Conventional Commits + plan referansı taşır: `feat(catalog): paging endpoint [plan 0001/3]`. Yalnız adı verilen yolları commit'ler (`git commit -- <paths>`); `git add -A` yok.
5. İlk adımdan önce `docs/conventions.md`'deki "Known traps"i okur. Testleri kriter ↔ test eşlemesinden, ilerledikçe yazar.
6. Her adımdan sonra kısa not düşer. Plandan çıkması gerekirse **durur → R-07** (sapma önerilir, kaçak sokulmaz).
7. Yinelerken `./scripts/check --fast`; tek test yazarken yalnız o testi; her push'tan önce `--fast` + dokunulan alanın full-only testleri.
8. **"Done" tanımı:** tüm adımlar tamam, `./scripts/check` GREEN (full), değişen dosya listesi plana (onaylı değişiklikleriyle) uyuyor. Bu işte `scripts/check.conf` değiştiyse `./scripts/residue` ve `./scripts/residue --fast` de temiz — ajan çalıştırır, insan değil.
9. Hüküm satırlarını planın `## Build evidence` bölümüne yazar: `CHECK GREEN (full, <n> steps, <t> s) @<sha>`. Çıktıyı sohbette gösterir, **dosyaya kaydetmez**.
10. Devir: değişen dosyalar + gerçek check çıktısı · `Next: INDEPENDENT REVIEW — fresh session / read-only reviewer` → **durur**. Kendi build'ini incelemez.

**Sorun çıkarsa hangi rampa?** (RESMÎ — `prompts/build.md`)

| Durum | Ne yapılır |
|---|---|
| Üzerinde çalışılan plan adımından kaynaklanan hata | BUILD içinde düzeltilir |
| Adımın dışından gelen derleme/çalışma hatası, ya da iki denemeden sonra hâlâ duran aynı hata | R-01 |
| Kırmızı test | R-02 |
| Flaky test | R-03 |
| Regresyon yarattın | R-04 |
| Belirsizlik ya da doküman–kod çelişkisi | R-10 |
| Uzun build'de oturumun bağlamı kayıyor | R-09 |

**Düzeltme turları (`§fixes`).** Yalnız `real` işaretli bulgular düzeltilir; bulgu başına en küçük değişiklik ve **bulgu başına bir commit**: `fix(catalog): empty page size [plan 0001/fix-2]` (k = tur numarası: 1, 2, 3). Her commit'ten sonra `--fast` yeşil; tur bitince full yeşil. **Dördüncü tur başlatılmaz: önce R-06.** İlgisiz koda dokunulmaz. Tur kodu değiştirdiği için plandaki eski `CHECK GREEN (full, …) @<sha>` satırı artık son durumu kanıtlamaz; yeni tam yeşilin satırı `## Build evidence`'a eklenir. Eklenmezse `scripts/status` "evidence is older than the code" uyarısı verir ve `scripts/gate ship` uyarı varken reddeder (RESMÎ — `scripts/status`, `scripts/gate`; "fix turundan sonra satırı yenile" cümlesi prompt'ta ayrıca yazmaz, betik davranışından çıkarımdır — TAHMİN).

**Okur / yazar.** Okur: plan, spec, `prompts/build.md`, `docs/conventions.md`, `docs/security.md`. Yazar: kod, testler, spec'in `Status` satırı, planın `## Build evidence` (ve onaylı sapma varsa `## Amendments`) bölümü.

**Örnek devir (temsili; `CHECK GREEN` satırının biçimi gerçektir).**

```text
Plan 0002: 5/5 adım tamam.
Değişen dosyalar (plan listesiyle aynı): src/loans/…  tests/loans/…
==> lint
<== lint (4 s)
==> unit
<== unit (11 s)
==> integration
<== integration (38 s)
CHECK GREEN (full, 3 steps, 53 s)
Build evidence plana yazıldı: CHECK GREEN (full, 3 steps, 53 s) @9f3c2ab
Next: INDEPENDENT REVIEW — fresh session / read-only reviewer
```

**Sık hatalar.**
- Kendi build'ini incelemek. (RESMÎ — `docs/commands.md`)
- `CHECK GREEN (fast, …)` satırını kanıt diye göstermek.
- `./scripts/check | grep … && git commit` gibi bir zincir kurmak: zincir `grep`'in çıkış kodunu alır, **kırmızı check commit'lenir**. Doğrusu: `./scripts/check > check.log 2>&1 && git commit …`. (RESMÎ — `docs/git.md`; sahadan gelen bir kural, bkz. Bölüm 16.3)
- Plan listesinde olmayan bir dosyaya sessizce dokunmak — review bunu "plan drift" bulgusu olarak yakalar.

---

### 6.9 `/review` (segment REVIEW)

**Ne işe yarar.** Değişiklik kümesini spec'e ve onaylı plana karşı **bağımsız** ve **salt okunur** inceler. Rol: Reviewer. Hiçbir dosya yazmaz.

**Ne zaman.** Bir build'den sonra. Ayrıca Medium ya da üstü bulgu içeren bir düzeltme turunun diff'i üzerinde yeniden (hassas alanda: her düzeltme turunda). **Ne zaman değil:** yalnızca dokümantasyona dokunan bir düzeltme diff'inde — o doğrudan VERIFY'a gider.

**Nasıl çağrılır.** `/review 0002` (ya da dal/diff referansı).

| Araç | Bağımsızlık nasıl sağlanır |
|---|---|
| Claude Code | Komut işi `reviewer` alt ajanına devreder; ana oturum kendisi incelemez, alt ajanın bulgularını **kelimesi kelimesine**, yumuşatmadan döndürür |
| GitHub Copilot | `reviewer` özel ajanını seç (`.github/agents/reviewer.agent.md`) ya da yeni sohbet |
| Cursor | Üretenin konuşmasını hiç görmemiş **yeni bir sohbette** çalıştır |
| Codex | **Yeni bir Codex oturumunda** `$review 0002` |
| Başka araç | Yalnız diff + spec'i alan taze oturuma `prompts/review.md`'yi yapıştır |

**Adım adım.**
1. **Giriş kontrolü (soft):** dalda commit'ler ve `In progress` bir spec var mı? Yoksa söyler ve sorar.
2. Planın `## Build evidence`'ındaki yeşil satırı **alıntılar**, yeniden çalıştırmaz. CI'ın tam koşusu sürerken başlayabilir (raporda söyler); triyaj o koşuyu bekler.
3. Raporu şu başlıkla açar: `Review round <n> · fix rounds so far: <k>`. Üçüncü düzeltme turundan sonra hâlâ gerçek bulgu varsa önce şunu söyler: "R-06: a fourth fix round needs the root-cause analysis first".
4. Her boyut için kanıtlı (dosya:satır, yeniden üretme komutu) somut bulgu verir ya da açıkça "clean" der:

   | Boyut | Baktığı şey |
   |---|---|
   | Correctness | Kabul kriterleri gerçekten karşılanıyor mu; arayüzde spec'teki her durum var mı |
   | Plan conformance | Değişen dosyalar planın listesine ve onaylı değişikliklere (`A-n`) uyuyor mu; dışındaki her dosya bulgudur |
   | Security | Yetkilendirme, girdi doğrulama, veri sızıntısı, secrets |
   | Edge cases | Boş/uç/sınır değerler, eşzamanlılık |
   | Performance | Bariz israf (N+1, gereksiz yükleme) — iddia etmeden önce ölç |
   | Tests | Kriter ↔ test eşlemesi tam mı; testler davranışı mı yoksa yalnız durum kodunu mu doğruluyor |
   | Maintainability | Adlandırma, katman ihlali, ölü kod |

5. Bulguları önem derecesine göre sıralar: `Critical / High / Medium / Low / Info`. Low = hiçbir kriteri, güvenliği ya da veriyi etkilemeyen gerçek kusur; Info = not ya da stil. Her bulgu önerilen bir eylem taşır.
6. Devir: bulgular kelimesi kelimesine · `Next: TRIAGE — human (real / noise / defer / investigate); then Developer fix rounds, then VERIFY` → **durur**.

> **ÇELİŞKİLİ (küçük):** `workflows/feature-development.md` adım 6 "all six dimensions" (altı boyut) der; `prompts/review.md` yukarıdaki **yedi** boyutu listeler. "Plan conformance" CHANGELOG'a göre v1.15'te eklenmiş; workflow metnindeki sayı güncellenmemiş görünüyor (TAHMİN).

**Okur / yazar.** Okur: diff, spec, plan (dosya listesi, kriter ↔ test eşlemesi), `docs/` (conventions, security, architecture), `prompts/review.md`. Yazar: **hiçbir şey**. Rapor sohbette kalır; kalıcı kayıt, senin triyaj kararınla planın `## Triage` bölümüne yazılan tablodur.

**Örnek rapor parçası (temsili).**

```text
Review round 1 · fix rounds so far: 0
CHECK GREEN (full, 3 steps, 53 s) @9f3c2ab — plandan alıntı, yeniden çalıştırılmadı.

M-1 Medium — Correctness — AC-3: 14 günlük sürenin sınırı için test yok
    Kanıt: tests/loans/due_date.test.ts:12-40 yalnızca 1 ve 7 günü deniyor
    Öneri: 14. ve 15. gün için iki test ekle
L-2 Low — Maintainability — src/loans/service.ts:88 kullanılmayan yardımcı fonksiyon
    Öneri: sil
Security, Edge cases, Performance, Plan conformance: clean

Next: TRIAGE — human (real / noise / defer / investigate); then Developer fix rounds, then VERIFY
```

**Sık hatalar.**
- Bulguları aynı adımda düzeltmek/düzelttirmek — önce triyaj gelir ve o insanındır. (RESMÎ — `docs/commands.md`)
- İncelemeyi üretenin oturumunda yapmak: "üretenin 'şundan dolayı böyle yaptım'ını okumuş denetçi ikna olmuş başlar". (RESMÎ — `docs/roles/README.md`)
- "Temiz" raporu şüpheli bulmak: "clean" geçerli ve hoş karşılanan bir hükümdür; incelemeci yararlı görünmek için bulgu uydurmamalıdır.

---

### 6.10 `/verify` (segment VERIFY)

**Ne işe yarar.** QA: her kabul kriterini somut bir kanıta eşler. Slogan: "Green tests are necessary, not sufficient — verify MEANING" (yeşil testler gerekli ama yeterli değil; *anlamı* doğrula). Üretim kodu yazmaz.

**Ne zaman.** Triyaj tamamlandıktan sonra. **Ne zaman değil:** temiz bir one-pass review'dan sonra — onun raporu tabloyu zaten içerir.

**Nasıl çağrılır.** `/verify 0002` — taze oturumda (Claude Code dışındaki araçlarda komut metni bunu açıkça ister).

**Adım adım.**
1. **Giriş kontrolü (soft):** planın `## Triage` bölümünde kayıt var mı? Yoksa söyler ve sorar.
2. Spec'i ve plandaki kriter ↔ test eşlemesini okur; tabloyu üretir: `| Acceptance criterion | Evidence | Status |`.
3. Kanıt şunlardan biridir: adı verilen ve bu commit'in **full** koşusunda geçen bir test; yeniden üretilebilir bir gözlem (komut + çıktı); arayüz kriterinde ekran görüntüsü (değişiklik isteklerinde korunan davranışı da kapsayan önce/sonra görüntüleri).
4. **"Bu test başarısız olabilir mi?"** Her test için, davranış bozulsa testin kırmızıya döneceğini denetler — "a test that can't fail is not evidence". Varsayılan olarak assert'i okumak yeter. Riskli davranışlarda (eşzamanlılık, para, yetkilendirme, sınır değerler — tipik olarak spec başına 4–5) ve hassas alandaki **her** kriterde kodu **kasıtlı bozar**: repo dışındaki geçici bir kopyada, testin kırmızıya dönmesini izleyerek, hiçbir şey commit'lemeden. Hangilerini bozduğunu tabloda adlandırır.
5. Arayüz kriterleri: ekran görüntülerini **ajan** çeker — betikli, başsız (headless), repo ve check dışında, geçici bir klasöre. Ship kapısı için galeriyi listeler (durum → yol). İnsandan ancak ajanın ulaşamadığı durumda (gerçek cihaz, dış sistem) çekmesi istenir. Kural: "The agent captures, the human looks."
6. Yeniden incelemeyi atlamış bir düzeltme turu varsa diff'ini okur: "bulgunun ötesindeki her şey bulgudur".
7. Kanıtı olmayan kriterleri ve davranış yerine implementasyon ayrıntısını doğrulayan testleri **açıkça** listeler: "gaps are findings, not footnotes".
8. Devir: tablo · `Next: SHIP — human (DoD, tick the proven criteria, move spec to specs/done/ with Status: Shipped in the PR, merge; an unprovable criterion is moved out, never waived — R-08)` → **durur**. Ship etmez, merge etmez, dosya taşımaz.

**Okur / yazar.** Okur: spec, plan (`## Triage` dâhil), `prompts/verify.md`, test kodu ve çıktısı. Yazar: üretim kodu **yazmaz**; istisna: triyajda `investigate` denen bulgu için başarısız bir yeniden üretme testi (R-05).

**Örnek tablo (temsili).**

```markdown
| Acceptance criterion | Evidence | Status |
|---|---|---|
| AC-1 — Rafta olan kitap ödünç alınabilir | `loans.borrow.test::borrows_available_book` — ./scripts/check, full @4d1e7c0 | PASS |
| AC-3 — İade tarihi ödünç gününden 14 gün sonradır | `due_date.test::day_14_boundary` — kasıtlı bozma: 14 → 13 yapıldı, test kırmızıya döndü | PASS |
| AC-5 — Boş liste durumu görünür | S-2 agent-captured, judged by Hayalî Geliştirici at SHIP, 2027-01-13 | PASS |
```

**Sık hatalar.** Tabloda kanıtsız bir iddia bırakmak (o bir boşluktur ve boşluk bulgudur); `--fast` çıktısını kanıt saymak; QA oturumuna üretim kodu düzelttirmek (o Developer'ın işidir, triyajdan sonra).

---

### 6.11 `/change`

**Ne işe yarar.** **Zaten var olan** bir davranışı değiştirir — yeni özellik değil, bug değil. Önce üç soruluk triyaj cetvelini çalıştırır; sonra davranışın gerektirdiği şeridi izler. İlke: tören *davranışın* gerektirdiği kadar olur, isteğin *göründüğü* kadar az değil. (RESMÎ — `workflows/change-request.md`)

**Ne zaman.** Var olan davranışı değiştirme yönündeki **her** istekte, kulağa ne kadar küçük gelirse gelsin.

**Nasıl çağrılır.** `/change "<istek> <iş kalemi>"` — iş kalemi anahtarı (ticket / issue / istek numarası) şarttır: mini-spec'in zorunlu `Source:` alanına gider ("No key, no mini-spec").

**Triyaj cetveli — her seferinde bu sırayla.**

| # | Soru | Evetse | Hayırsa |
|---|---|---|---|
| (a) | Mevcut davranış, üzerinde anlaşılandan (spec, ADR, iş kuralı) bir **sapma** mı? | **BUG** → `/fix-bug`. Burada durulur | Devam |
| (b) | **Davranış testi:** bu değişiklik bir kabul kriterini değiştiriyor ya da yenisini gerektiriyor mu? | **CHANGE** şeridi (mini-spec) | **TRIVIAL** adayı |
| (c) | **Etki alanı:** ortak koda dokunuyor mu (birden fazla yerde kullanılan bileşen, yardımcı, model, sözleşme)? | (b) trivial dese bile **CHANGE** | Şerit olduğu gibi kalır |

Repodaki üç örnek cümle: "Etiket metni, yazım hatası, tek yerde kullanılan renk: trivial." · "'Aynı etiket ama artık kullanıcının paketine bağlı': bir kriter değişti → CHANGE." · "'Düğme spec'in dediğini hiç yapmadı': BUG."

**Adım adım.**
1. `docs/git.md`'deki trivial değişiklik politikasını okur; cetveli çalıştırır; hükmü (BUG / TRIVIAL / CHANGE) **gerekçesiyle** sunar ve onayını bekler (kapı).
2. **BUG** → söyler, seni `/fix-bug`'a yönlendirir, durur.
3. **TRIVIAL** → spec dosyası açılmaz; iş kalemi + onaylanmış triyaj hükmü spec'in eşdeğeridir. Tek dar commit, `./scripts/check` yeşil, PR/reviewer politikaya göre (varsayılan: spec yok ama bir PR ve bir reviewer). **İkinci bir dosya ya da yeni bir test gerekirse bu yanlış triyaj sinyalidir: durur ve cetveli yeniden çalıştırır.**
4. **CHANGE** → önce ikiz kontrolü: `specs/active/`'te aynı `Source:` anahtarını taşıyan spec varsa gösterir, sürdürülsün mü diye sorar. Sonra moda göre:
   - **strict:** yalnız ANALYZE'ı mini şablonla çalıştırır; spec onayını bekler; `Status: Approved`; devir `Next: PLAN — Developer runs /plan <NNNN>`; durur.
   - **lite:** ANALYZE (mini) → `/plan` → `/build` → `/review` (dar: yalnız değişiklik diff'i) → `/verify` (arayüzde önce/sonra ekran görüntüleri) → ship; her kapıda sorar. **Plan kapısı bu şeritte asla atlanmaz.**

**Mini-spec'te ne olur.** `Source:` zorunlu; **değişen davranış** kriterleri (`CB-n`, 3–5 tane) ve **korunan davranış** kriterleri (`PB-n`, en az 2 — değişikliğin çevresinde bugünkü gibi çalışmaya devam etmesi gerekenler) birlikte yazılır. Eski davranışın `specs/done/`'da spec'i varsa `Supersedes: <NNNN>/AC-x` eklenir — teslim edilmiş spec düzenlenmez. Değiştirilen modülün hiç spec'i yoksa (benimsenmiş kod tabanı) korunan davranış kriterleri "mini karakterizasyon" görevi görür: varsayımdan değil **gözlemden** yazılır (çalıştır, ekran görüntüsünü al).

**Okur / yazar.** Okur: `workflows/change-request.md`, `workflows/segments.md`, `docs/git.md`. Yazar: `specs/active/`'te bir mini-spec (CHANGE) ya da tek commit (TRIVIAL).

**Örnek (temsili).**

```text
/change "ödünç süresi 14 günden 21 güne çıksın KIT-12"

Triyaj:
 (a) Sapma mı? Hayır — 14 gün, spec 0002/AC-3'te yazan ve çalışan davranış.
 (b) Bir kabul kriteri değişiyor mu? Evet — AC-3'ün değeri değişiyor.
 (c) Ortak kod? Evet — iade tarihi hesabı gecikme uyarısında da kullanılıyor.
Hüküm: CHANGE (mini-spec). Önerim bu; onaylıyor musun?
```

**Sık hatalar.** İsteği davranış testine göre değil "ne kadar küçük göründüğüne" göre sınıflamak (RESMÎ — `docs/commands.md`); iş kalemi anahtarını vermemek; TRIVIAL şeritte ikinci dosyaya uzanıp devam etmek.

---

### 6.12 `/fix-bug`

**Ne işe yarar.** Hata düzeltme akışı: `REPORT → REPRODUCE (kırmızı test) → DIAGNOSE → FIX → PROVE → REVIEW → SHIP`. **Demir kural: başarısız olan bir yeniden üretme testi yokken düzeltme yok.**

**Ne zaman.** Davranış üzerinde anlaşılandan sapıyorsa (triyaj sorusu (a)). Bug olduğundan emin değilsen önce `/change`'in cetveli. **Ne zaman değil:** düzeltme davranışı *değiştiriyorsa* — o bir bug fix değildir, CHANGE şerididir (önce mini-spec).

**Nasıl çağrılır.** `/fix-bug "<ne bozuk; beklenen ve gerçekleşen>"`.

**Adım adım.**
1. **REPORT:** beklenen ve gerçekleşen, ortam, sıklık. Review triyajından geldiyse bulgunun kendisi rapordur. Rapor + yeniden üretme testi burada **spec'in eşdeğeridir**; başarısız test kabul kriteridir (kural 1 böyle korunur). Spec ve plan dosyası açılmaz.
2. **REPRODUCE** (rol: QA): hatayı yakalayan *asgari* başarısız testi yazar (R-05 kalıbı). Dürüst çabaya rağmen yeniden üretilemiyorsa gerekçeli kapatma önerir — **kapı**.
3. **DIAGNOSE** (rol: Developer): belirti değil kök neden — hangi dosya, hangi varsayım, neden şimdi (R-01 disiplini). Değişiklikten önce teşhis.
4. **FIX:** kırmızı testi yeşile çeviren en küçük değişiklik; yalnız kök nedenle ilgili dosyalar. Belirti susturma (try/catch'e gömme, test düzenleme) yasak.
5. **PROVE:** kırmızı test artık yeşil **ve** bütün suite yeşil (`./scripts/check`, full). Yeni regresyon varsa R-04 (önce geri al). Yeniden üretme testi regresyon bekçisi olarak **sonsuza dek kalır**.
6. **REVIEW:** taze oturum, dar kapsam (düzeltme diff'i). **Kapı:** triyaj.
7. **SHIP:** raporu referans gösteren PR. Dal: `fix/<rapor-kimliği>-<kısa-ad>` (bug fix'ler spec numarası değil rapor taşır).

**Okur / yazar.** Okur: rapor, `workflows/bug-fix.md`. Yazar: yeniden üretme testi (kalıcı) ve düzeltme.

**Örnek (temsili).**

```text
/fix-bug "iade edilen kitap listede hâlâ 'ödünçte' görünüyor; beklenen: 'rafta'"

REPRODUCE: tests/loans/return.test.ts::returned_book_is_available — KIRMIZI
  beklenen: status = available · gerçekleşen: status = on_loan
Yeniden üretme başarılı. Teşhise geçeyim mi?
```

**Sık hatalar.** Testi yazmadan "bariz" diye düzeltmek; davranışı değiştiren bir düzeltme yapmak (RESMÎ — `docs/commands.md`); yeniden üretme testini iş bitince silmek.

---

### 6.13 `/refactor`

**Ne işe yarar.** Yapıyı değiştirir, davranışı **kanıtlanabilir biçimde** korur: `BASELINE → SPEC & PLAN → [onay] → REFACTOR → PROVE UNCHANGED → REVIEW → [triyaj] → SHIP`.

**Ne zaman.** Kodun ne yaptığını değiştirmeden yapıyı temizlerken. **Ne zaman değil:** check kırmızıyken ("never refactor on red"); bir özellikle karışık hâlde ("Mixed refactor+feature work is forbidden — split it").

**Nasıl çağrılır.** `/refactor "<neyi, neden>"`.

**Adım adım.**
1. **BASELINE:** `./scripts/check` başlamadan önce yeşil olmalı. Alanda test yoksa **önce karakterizasyon testleri**: mevcut davranışı kusurlarıyla birlikte sabitle — kodun ne yapması "gerektiğinden" değil, gözlemden.
2. **SPEC & PLAN:** mini-spec (`specs/active/NNNN-refactor-<ad>.md`): Changed behavior = tam olarak tek satır `none — no observable behavior change`; Preserved behavior = 1. adımdaki karakterizasyon kriterleri; `Source` = iş kalemi. Bu şeritte ANALYZE yoktur: öz-eleştiri geçişi mini-spec üzerinde çalıştırılır, boşlukları sen onaylarsın, sonra `- Self-critique: done`. Ardından plan: ne iyileşiyor, neye dokunulmuyor.
3. **Kapı: onay** — özellikle: etki alanı getiriye değer mi?
4. **REFACTOR:** küçük, commit'lenebilir adımlar; her adımdan sonra `./scripts/check --fast` yeşil.
5. **PROVE UNCHANGED:** aynı testler full profilde yeşil, **sıfır test düzenlemesi**. Test düzenlemek gerekiyorsa davranış değişmiştir: dur, bu bir özelliktir. Performansa duyarlı yollarda önce/sonra ölçüm (R-12).
6. **REVIEW:** taze oturum; ek mercek: araya anlam değişikliği sızdı mı, adlar/katmanlar `docs/architecture.md` ile *daha* mı uyumlu? **Kapı:** triyaj.
7. **SHIP:** kanıtlanan kriterler işaretlenir; mini-spec `specs/done/`'a. Dal: `refactor/<spec-no>-<kısa-ad>`.

**Sık hatalar.** Bir testi düzenlemek (RESMÎ — `docs/commands.md`: gerekli bir test düzenlemesi davranışın değiştiği anlamına gelir; dur); "hazır elim değmişken" özellik eklemek.

---

### 6.14 `/adr`

**Ne işe yarar.** Bir mimari kararı önce tartışır, sen karar verdikten sonra `docs/decisions/TEMPLATE.md`'den kaydeder.

**Ne zaman.** Önemli ve geri alınması zor bir seçimde — **yapıldığı anda**: "buharlaşan kısım gerekçedir". **Ne zaman değil:** kabul edilmiş bir kararı değiştirmek için eskisini düzenlemek (yeni karar yeni ADR alır).

**Nasıl çağrılır.** `/adr "<karar sorusu>"`.

**Adım adım.**
1. **Tartış:** bu projenin bağlamı için (ekip büyüklüğü, ürün aşaması, `docs/`'tan gelen kısıtlar) gerçekçi seçenekleri karşılaştırır; gerekçeli öneri verir; fikrini neyin değiştireceğini söyler (revisit triggers); alternatifleri ciddiyetle değerlendirir — "no strawmen".
2. **Kapı: senin kararın** — karar verilmeden hiçbir şey yazılmaz.
3. `docs/decisions/<NNNN>-<slug>.md` yazılır. NNNN = `docs/decisions/` içindeki en yüksek numara + 1; `docs/decisions/anew/` altındaki ANEW kararları **sayılmaz**. ADR numaraları spec numaralarından ayrı bir dizidir.

**ADR şablonunun alanları.** `Status: Proposed | Accepted | Superseded by ADR-NNNN` · `Date` · `Revised` (yalnız kararı değiştirmeyen editoryal düzeltme) · `## Context` · `## Decision` (bir iki etken cümle) · `## Consequences` (**iki taraf da**: ne kazandırıyor ve neye mal oluyor) · `## Alternatives considered` · `## Revisit triggers`. İyi ADR testi: altı ay sonra biri "neden böyle yaptılar?" sorusunu yalnızca bu dosyadan cevaplayabilmeli. (RESMÎ — `docs/decisions/TEMPLATE.md`, `prompts/adr.md`)

> **ÇELİŞKİLİ (küçük):** `docs/decisions/README.md` "`/adr` in Claude Code" der; oysa `/adr` dört araç adaptörünün hepsinde vardır (`docs/commands.md`, adaptör klasörleri). README cümlesi eski kalmış görünüyor (TAHMİN).

---

### 6.15 `/recover`

**Ne işe yarar.** Olan şeye uyan kurtarma rampasını (R-01 … R-13) seçer, hangisi olduğunu ve nedenini söyler, onayından sonra o rampanın istemini koruma kurallarıyla birlikte harfiyen yürütür.

**Ne zaman.** Bir şey ters gitti: kırmızı build, kayan plan, bulanık bağlam. **Ne zaman değil:** her şey yolundayken "kısa yol" olarak — rampalar döngünün alternatifi değil, döngüye güvenli dönüşlerdir.

**Nasıl çağrılır.** `/recover "<ne oldu>"`.

**Adım adım.** `prompts/recovery/README.md`'yi okur → uyan rampayı adlandırır → **kapı: rampayı onaylarsın** → `prompts/recovery/<dosya>.md`'yi yürütür. Hiçbiri uymuyorsa R-10 (belirsizlik) sayar: maliyetli seçenekler, öneri, senin kararın.

13 rampanın tamamı Bölüm 12'de.

**Sık hata.** Rampayı adlandırmak yerine düzeltmeyi doğaçlamak. (RESMÎ — `docs/commands.md`)

---

## 7. Betikler referansı (7 betik)

Komutlar yapay zekâ aracının içinde yazılır; betikler **terminalde** çalıştırılır. Hepsi `#!/bin/sh` POSIX kabuk betiğidir, uzantıları yoktur, kökü kendi konumlarından bulurlar (nereden çağırdığın önemsizdir) ve çıktılarında sabit önekler kullanırlar: `ok    `, `WARN  `, `FAIL  `, `note  `, `skip  `. (RESMÎ — `scripts/*`)

| Betik | Amaç | Kullanım | Kim, ne zaman | Çıkış kodu |
|---|---|---|---|---|
| `scripts/init` | Adaptör kurar | `./scripts/init [--force] <claude-code\|github-copilot\|cursor\|codex\|generic>` | Sen; bir kez, `/bootstrap`'ten önce; adaptör eklemek/tazelemek için yeniden | 0 kuruldu · 1 hatalı argüman |
| `scripts/doctor` | Çalışma alanı sağlığı | `./scripts/doctor [--strict]` | Sen ve ajan; bootstrap'ten sonra, PR'dan önce, "bir tuhaflık var" dediğinde. CI `--strict` ile | 0 sağlıklı (uyarı olabilir) · 1 en az bir `FAIL` |
| `scripts/status` | Hangi iş hangi aşamada, sıra kimde | `./scripts/status [--json]` | Sen; oturum başında, bir kapıdan sonra | 0 okundu · 2 kullanım hatası |
| `scripts/gate` | İnsanın kapı kararını dosyaya yazıp commit'ler | `./scripts/gate approve-spec\|approve-plan\|triage\|ship NNNN …` | **Yalnız sen**; kapıda, dosyayı okuduktan sonra | 0 yazıldı · 1 reddedildi · 2 hatalı girdi |
| `scripts/check` | Tek doğrulama sözleşmesi | `./scripts/check [--fast]` | Herkes: ajan, sen, CI | 0 yeşil · 1 kırmızı · 2 kullanım hatası |
| `scripts/residue` | Check geride çalışan süreç bıraktı mı | `./scripts/residue [--fast]` | Ajan; bootstrap'te ve `check.conf` her değiştiğinde, iki profil için | 0 temiz/ölçülmedi · 1 kalıntı ya da kırmızı check · 2 kullanım |
| `scripts/selftest` | ANEW betiklerinin belgelendiği gibi davrandığını kanıtlar | `./scripts/selftest` | CI; ve ANEW betiklerini değiştiren kişi | 0 hepsi geçti · 1 en az biri kaldı |

`scripts/status` (v1.25) ve `scripts/gate` (v1.26) yalnızca current hattındadır; LTS `1.24.x`'te yoktur. (RESMÎ — `CHANGELOG.md`)

### 7.1 `scripts/init`

Ayrıntısı Bölüm 5.3'te. Özet:

```bash
./scripts/init claude-code
./scripts/init --force cursor     # var olan dosyaların üzerine yazar; --force ÖNCE gelir
./scripts/init generic            # dosya yazmaz, yönerge basar
./scripts/init --help
```

- Var olan dosyayı korur: `kept   .claude/commands/adr.md (exists — use --force to overwrite)`.
- Bilinmeyen adaptör: `Unknown adapter: <ad>` + kullanım metni, çıkış 1.
- **Sık hata:** özelleştirdiğin adaptör dosyalarının üstüne `--force` — üzerine yazılır. (RESMÎ — `docs/commands.md`)

### 7.2 `scripts/check` ve `scripts/check.conf`

**Amaç.** "Bu iyi mi?" sorusunun tek cevabı. İnsan, ajan, hook ve CI aynı komutu çalıştırır; böylece ajan "yerelde başka komutla geçti, CI'da kaldı" durumuna düşemez. Teknolojiye özgü adımlar `scripts/check.conf`'ta durur; onu bootstrap yazar (şablonda yalnız `check.conf.example` vardır).

**`check.conf` biçimi.** (RESMÎ — `scripts/check`, `scripts/check.conf.example`)

| Öğe | Sözdizimi | Not |
|---|---|---|
| Adım | `<ad>: <komut>` | Sırayla çalışır, ilk hatada durur (fail fast). Ad ilk `:`'e kadardır |
| Hızlı adım | `<ad> [fast]: <komut>` | Etiket **adda** olur, komutta asla |
| Ön koşul | `requires <adım adı>: <komut>` | Adım adı `[fast]` olmadan yazılır. Komut senin yazdığın bir denetimdir: çıkış 0 = bu makine adımı çalıştırabilir. Yan etkisiz ve hızlı olmalı, hiçbir şey başlatmamalı |
| Yorum | `# …` | Yok sayılır |

Repodaki örnekler (hepsi örnek dosyada yorum satırı olarak durur):

```text
# requires test: node -e "process.exit(+process.versions.node.split('.')[0] >= 20 ? 0 : 1)"
# requires integration: docker info
# requires integration: podman info

# JVM (Gradle, Java) example:
# resource hygiene: no Gradle daemon
# build [fast]: ./gradlew assemble --no-daemon
# test: ./gradlew test --no-daemon

# Node example:
# lint: npm run lint
# typecheck: npm run typecheck
# test: npm test

# Python example:
# lint: ruff check .
# types: mypy .
# test: pytest -q
```

"ANEW knows no tool: you name what you use" — ANEW hiçbir aracı tanımaz; konteyner çalışma zamanı, derleyici sürümü gibi ihtiyaçları proje kendi `requires` komutuyla bildirir (ANEW-0011).

**İki profil.**

| Çağrı | Çalışan adımlar | Ne için |
|---|---|---|
| `./scripts/check --fast` | Yalnız `[fast]` etiketli adımlar | İç döngü: adım başına, bulgu başına, yineleme başına. **Çalışma durumudur, kanıt değil** |
| `./scripts/check` | Bütün adımlar (full) | Her segment çıkışı, PROVE adımı, rampa çıkışı, verify tablosu, CI. **Tek geçerli kanıt** |

**Çıktı.** Aşağıdaki iki blok, `scripts/selftest`'in doğruladığı satırlardan birleştirilmiştir (örnek conf: `compile [fast]`, `unit [fast]`, `e2e`):

```text
$ ./scripts/check --fast
==> compile
compile ran
<== compile (0 s)
==> unit
unit ran
<== unit (0 s)
skip  e2e (full only)
CHECK GREEN (fast, 2 steps, 0 s)
```

```text
$ ./scripts/check
==> compile
compile ran
<== compile (0 s)
==> unit
unit ran
<== unit (0 s)
==> e2e
e2e ran
<== e2e (0 s)
CHECK GREEN (full, 3 steps, 0 s)
```

(`compile ran` gibi satırlar adımın kendi çıktısıdır; selftest'in örnek adımları yalnızca `echo` çalıştırır. Selftest süre değerini değil, süre alanının varlığını doğrular; `0 s` temsilidir.)

Başka sonuç satırları (RESMÎ — `scripts/check`):

| Satır | Anlamı |
|---|---|
| `CHECK FAILED (full) at step: unit` | O adım kırmızı; sonraki adımlar çalışmaz (çıkış 1) |
| `CHECK FAILED (<profil>) prerequisite not met: <komut> (steps: …) — environment gap, see prompts/recovery/environment-gap.md (R-13)` | Bir ön koşul karşılanmadı; **hiçbir adım çalışmadan** kırmızı. Karşılanmayan ön koşul asla atlanmaz |
| `CHECK FAILED (<profil>) requires names no step: <ad>` | `requires` satırı var olmayan bir adıma bağlanmış (yazım hatası sessizce ön koşul düşürmesin diye) |
| `check: no scripts/check.conf yet.` | Bootstrap henüz çalışmamış (çıkış 1) |
| `check: check.conf has no steps — greenfield no-op. Add steps as soon as code exists.` | Boş proje; çıkış 0 ama `CHECK GREEN` yazmaz |
| `CHECK GREEN (fast = full: no steps tagged fast, …)` | `--fast` istendi ama conf'ta hiç `[fast]` etiketi yok: her şey çalıştı |

**Sık hata:** `CHECK GREEN (fast, …)` satırını kanıt diye göstermek. `scripts/doctor` bunu teslim edilmiş spec'lerde ve (CI'da) PR açıklamasında yakalayıp uyarır. (RESMÎ — `docs/commands.md`)

### 7.3 `scripts/doctor`

**Amaç.** Çalışma alanının yapısı ve süreç kayıtları tutarlı mı? Kendisi dosya yazmaz. Yalnız `check.conf`'taki `requires` komutlarını çalıştırır — bu yüzden güvenmediğin bir dalda ya da fork'ta `doctor` çalıştırmak, orada `check` çalıştırmak gibidir (ANEW-0011).

**Bayrak.** `--strict`: spec/plan **kapı ihlallerini** uyarıdan hataya çevirir. CI böyle çalıştırır; böylece PR'ı hangi araç üretmiş olursa olsun kapılar tutar.

> **Dikkat:** `--strict` bayrağı strict **mod** değildir; ikisi birbirinden bağımsızdır. Lite modda çalışan bir projenin CI'ı da `doctor --strict` çalıştırır. (RESMÎ — `docs/commands.md`)

**Neleri denetler.** (RESMÎ — `scripts/doctor`; betik çıktı sırasıyla)

| Grup | Denetim | İhlalde |
|---|---|---|
| Yapı | Çekirdek dosyalar yerinde mi (41 dosya: `AGENTS.md`, `docs/*`, `specs/TEMPLATE*.md`, `workflows/*`, `prompts/*`, `scripts/check` …) | `FAIL` |
| Yapı | 13 kurtarma rampası var mı | `WARN` |
| Yapılandırma | `AGENTS.md` yapılandırılmış mı; `Mode` ve `Language` ayarlı mı; `check.conf` var mı ve adımı var mı | `WARN` |
| Yapılandırma | `AGENTS.md`'de "Invariant rules" bloğu duruyor mu | **`FAIL`** — "it must survive bootstrap" |
| Yapılandırma | `AGENTS.md` çok mu uzadı (tabela olmalı, ~40 satır) | `WARN` |
| Ortam | `requires` ön koşulları; profil başına hüküm: `profile fast: runnable on this machine` / `profile full: not runnable on this machine (steps: …)` | Her modda `WARN` (makineyi tarif eder, kapı değildir) |
| Sürüm | `.anew-version` var mı | `WARN` |
| Adaptör | Bir adaptör kurulu mu | `WARN` |
| Adaptör | (`adapters/` klasörü duruyorsa) dört araç adaptörü aynı komutları taşıyor mu; Codex skill'leri "explicit only" mi; `docs/commands.md` her komut için bir başlık içeriyor mu | `FAIL` |
| Adaptör | `.claude/hooks/*.sh` çalıştırılabilir mi (`hook not executable … (chmod +x it)`) | `WARN` |
| **Kapı** | Onaylanmamış spec için plan var mı (`plan exists for unapproved spec NNNN`) | gate |
| **Kapı** | Plan onayı kaydedilmeden build başlamış mı (`build started without recorded plan approval`) | gate |
| **Kapı** | Onay sonrası hâlâ `Self-critique: pending` mi | gate |
| **Kapı** | Aynı `Source:` anahtarını taşıyan iki açık spec (ikiz değişiklik isteği); aynı numaralı iki spec (ikiz spec) | gate |
| **Kapı** | `specs/done/` altında değişen/silinen/yeniden adlandırılan dosya (`shipped spec changed: …`) | gate |
| **Kapı** | Yeni ship'te işaretlenmemiş kriter; hedefi olmayan taşıma; hassas alanda taşınan kriter | gate |
| Eşleme | Aktif planın kriter ↔ test eşlemesindeki test adını hiçbir dosya tutmuyor | `WARN` |
| Mini-spec | `Source:` boş | `WARN` |
| Kanıt hijyeni | `evidence/` ya da `.evidence/` klasörü; çalışma ağacının içinde repo klonu | `WARN` |
| Kanıt hijyeni | Teslim edilmiş spec ya da PR açıklaması yalnız `CHECK GREEN (fast, …)` gösteriyor | `WARN` |

"gate" = yerelde `WARN`, `--strict` altında (CI'da) `FAIL`.

Son satır: `== result: N fail, M warn ==`.

**Sık hata:** yerelde gördüğün bir kapı uyarısını (spec/plan tutarlılığı) zararsız saymak — CI'da `FAIL`'dir. (RESMÎ — `docs/commands.md`)

### 7.4 `scripts/status` (v1.25+)

**Amaç.** `specs/active/` ve `specs/done/` altındaki her spec için bir satır: spec ve plan durumu, **aşama**, sırada **kim** var, **sonraki adım**. Tamamen dosyalardan çıkarır (spec'in `Status` satırı, planın onay satırı, `## Build evidence`, `## Triage`, commit konuları). Salt okunurdur: dosya yazmaz, durum tutmaz.

```text
== ANEW status ==
0001  demo  spec: Approved · plan: Approved  →  BUILD (Developer)
      next: /build
0002  eski-is  shipped
```

(RESMÎ — satır biçimi `scripts/selftest`'in doğruladığı çıktılardan.) Hiç spec yoksa: `no work yet — start with /new-feature or /analyze`.

**Aşama nasıl çıkarılır.** (RESMÎ — `docs/commands.md`, `scripts/status`)

| Dosyalardaki durum | Aşama (kim) | Sonraki adım |
|---|---|---|
| Spec `Draft` | `ANALYZE` (human) | Spec'i onayla |
| Spec `Approved`, plan yok | `PLAN` (Developer) | `/plan`, sonra insan planı onaylar |
| Plan var, `Approved by / on` boş | `PLAN` (human) | Planı onayla |
| Plan onaylı, spec henüz `Approved` | `BUILD` (Developer) | `/build` |
| Spec `In progress`, `## Build evidence`'ta `CHECK GREEN (full,` yok | `BUILD` (Developer) | Adımları bitir, tam check'i kaydet |
| Kanıt var, `## Triage` altında tur yok | `REVIEW` (taze oturum / salt okunur reviewer) | `/review`, sonra triyaj |
| En yeni turda kapanmamış `real` bulgu | `FIX ROUND` (Developer) | Bulguları düzelt: `[plan NNNN/fix-k]` commit'leri |
| Bütün `real` bulgular kapalı, aralarında Medium ya da üstü var | `REVIEW` | Düzeltme diff'ini yeniden incele |
| Yalnız Low/Info kapandı, ya da bulgusuz review turu | `VERIFY` (QA) | `/verify`, taze oturumda |
| Bulgusuz VERIFY turu | `SHIP` (human) | DoD, kriterleri işaretle, spec'i `done/`'a taşı, merge |
| En yeni turda `investigate` | `unclear: investigate open …` | QA araştırır (R-05); yeni tur kararı kaydeder |
| Hiçbirine uymuyor | `unclear: <ne eksik>` | — asla bir aşama uydurmaz |

Bir `real` bulgu nasıl "kapanır"? Triyaj tablosundaki Note hücresi ya `fix-<k>` adını taşır ve geçmişte konusu `[plan NNNN/fix-<k>]` içeren bir commit vardır, ya da böyle etiketli bir commit'in sha'sını taşır.

**İki uyarı.**

| Uyarı | Ne zaman çıkar | Çaresi |
|---|---|---|
| **Kanıt koddan eski** (`evidence is older than the code: CHECK GREEN @<sha>, then changed: …`) | Son tam yeşil satırın `@<sha>`'sından sonra `specs/` dışındaki dosyalar değişmiş | `./scripts/check`'i yeniden çalıştır ve kaydet |
| **Onaydan sonra değişti** (`the spec changed after approval …` / `the plan changed after approval …`) | Spec'in niyet/gereksinim/kriter metni ya da planın dosya listesi/adımları/riskleri/eşlemesi onaydan sonra değişmiş | Planı yeniden onaylat (`Approved by / on` satırına yeni değer; aynı günse `(re-approved)`), ya da plan değişikliğini `A-<n>` satırıyla **aynı commit'te** yaz, ya da geri al |

Değişiklik sayılmayanlar: `Status` satırları, işaretlenen kutular, şablona uygun dışarı taşınan kriter, build kanıtı, triyaj ve amendment satırları.

**`--json`.** Tek belge, bütün değerler string:

```json
{"anew_status":1,"rows":[{"spec":"0001","name":"demo","spec_status":"Draft","plan_status":"—","stage":"ANALYZE","who":"human","next":"approve the spec (end of /analyze)","warnings":[],"notes":[]}],"notes":[]}
```

**Sık hata:** `REVIEW` ya da `VERIFY` satırını "henüz çalışmadı" diye okumak. Temiz bir review, yeniden inceleme ya da VERIFY **dosya yazmaz**; status çalışıp çalışmadığını bilemez ve satır orada kalır. İlerletmek için temiz turu satırsız bir başlık olarak kaydet: `### Review round 2 — <ad>, <tarih> (clean)` (ya da `./scripts/gate triage NNNN --review`). Temiz review turu VERIFY okunur; temiz VERIFY turu SHIP okunur. (RESMÎ — `docs/commands.md`)

### 7.5 `scripts/gate` (v1.26+)

**Amaç.** Bir insanın kapı kararını, elle düzenlemenin alacağı biçimde yazar; **önce denetler**, sonra commit'ler — karar başına bir commit. Durum tutmaz: onu hiç çalıştırmayan bir ekip aynı süreci elle izler. Aşamayı `scripts/status`'tan okur; yanlış aşamada reddeder.

> **En önemli kural:** `scripts/gate` bir **insanın** kararını kaydeder; ajan onu asla kendi başına çalıştırmaz. Dosyada ikisini ayırt eden hiçbir şey yoktur ve git kimliği de bir rol denetimi değildir (ajanla çalışırken her commit senin adını taşır). Bu yüzden kural yalnız Documented düzeyindedir; disiplin senin. (RESMÎ — `docs/commands.md`, `docs/roles/README.md`)

```text
usage: scripts/gate approve-spec NNNN
       scripts/gate approve-plan NNNN
       scripts/gate triage NNNN --review|--verify [--finding "<text>" <verdict> "<note>"]...
       scripts/gate ship NNNN
```

| Alt komut | Hangi aşamada | Ne yazar | Başarı satırı (örnek) |
|---|---|---|---|
| `approve-spec NNNN` | `ANALYZE` (Draft spec) | Spec'te `- Status: Approved` | `approve-spec 0001: spec approved — specs/active/0001-demo.md @<sha>` |
| `approve-plan NNNN` | `PLAN` + sıra insanda | Planda `- Status: Approved` ve `- Approved by / on: <git user.name>, <bugün>` | `approve-plan 0001: plan approved (<ad>, <tarih>) — specs/plans/0001-plan.md @<sha>` |
| `triage NNNN --review\|--verify …` | `--review` için `REVIEW`, `--verify` için `VERIFY`; ikisi de `unclear: investigate open` durumunda kabul edilir | Planın `## Triage` bölümünün sonuna `### Review round <k> — <ad>, <tarih>` (ya da `### VERIFY round <k> — …`) + bulgu tablosu; bulgu verilmezse temiz tur | `triage 0001: Review round 1, 2 finding(s) — specs/plans/0001-plan.md @<sha>` |
| `ship NNNN` | `SHIP`; status uyarısı yok | Kriterleri ve Definition of Done kutularını işaretler, `- Status: Shipped`, spec'i `specs/done/`'a taşır, planın `- Spec:` satırını yeni yola çevirir | `ship 0001: shipped; spec moved to specs/done/0001-demo.md — … @<sha>` |

`scripts/selftest` senaryolarındaki çağrılar (RESMÎ — argümanlar selftest'teki gibidir; selftest betiği `gate` adlı bir sarmalayıcıyla çağırır, burada `scripts/gate` diye yazıldı):

```bash
scripts/gate approve-spec 0001
scripts/gate approve-plan 0001
scripts/gate triage 0001 --review --finding "M-1 Medium — wrong total" real "" --finding "L-2 Low — naming" noise "matches the domain word"
scripts/gate triage 0001 --review          # temiz yeniden inceleme turu
scripts/gate triage 0001 --verify --finding "F-1 Low — slow" defer "B-7" --finding "I-2 Info — flaky?" investigate "QA"
scripts/gate triage 0001 --verify --finding "I-2 Info — flaky?" noise "QA: one-off runner timeout"   # investigate, yeni bir turla cevaplanır
scripts/gate ship 0001
```

`triage` kuralları: hüküm `real`, `noise`, `defer` ya da `investigate` olmalı; `noise` gerekçesiz olamaz; `defer` notunda `specs/backlog.md`'de **var olan** bir `B-<n>` adlandırılmalı (yani önce backlog kaydını yazarsın); metinde `|`, tab ya da satır sonu olamaz. Bu kurallardan birini çiğneyen girdi çıkış kodu 2 ile, **hiçbir şey yazılmadan** reddedilir (yanlış aşama gibi durum retleri ise çıkış 1'dir). `real` bulgunun notu, düzeltmesini sonradan adlandırır (`fix-<k>`, düzeltme turunda elle yazılır).

`approve-plan` zaten onaylı bir planda **yeniden onaydır** — "onaydan sonra değişti" uyarısının çaresi. Aynı gün ikinci yeniden onay reddedilir.

`ship` neleri **yapmaz**: scorecard, PR, merge ve etiket sende kalır. Neleri **reddeder**: hedefi yazılmamış üstü çizili kriter; backlog'da olmayan `B-<n>` hedefi; hassas alan spec'inde herhangi bir taşıma; açık status uyarısı.

Güvenlik ağı: bütün içerik önce geçici klasörde hazırlanır; commit'e kadar olan her ret hiçbir şey yazmaz. Commit başarısız olursa (ör. bir pre-commit hook) yazılanlar geri alınır. Commit yalnız betiğin yazdığı dosyaları içerir; ama hedef dosyadaki commit'lenmemiş düzenlemelerin de commit'e girer ("you approve the file as it is").

**Sık hata:** dosyayı okumadan çalıştırmak. "Commit, karar verdiğinin kaydıdır; önce planı, inceleme raporunu ya da kanıt tablosunu oku." (RESMÎ — `docs/commands.md`)

### 7.6 `scripts/residue`

**Amaç.** Kalıntı testi: `./scripts/check`'i art arda **iki kez** çalıştırır ve her koşudan sonra check'in başlattığı bir sürecin hayatta kalıp kalmadığına bakar. Gerekçe: bir insan günde ~20 kez build eder, bir ajan `./scripts/check`'i ~200 kez çalıştırır; koşu başına kalan bir daemon birikerek makineyi kilitler (ANEW-0007).

Hayatta kalan her süreç **ebeveyn zincirine** göre yargılanır: ebeveyni kaybolmuş (yetim) süreç check'in kalıntısıdır (`survivor`); ilk koşudan önce var olan canlı bir ebeveynin altındaki süreç (başka bir oturum, işletim sistemi servisi) `not from check` diye listelenir ve testi **düşürmez**. Bu yüzden makineyi boşta bırakman gerekmez. Bellek raporlanır, yargılanmaz.

| Sonuç satırı | Anlamı | Çıkış |
|---|---|---|
| `RESIDUE CLEAN (full, 2 runs)` | Temiz | 0 |
| `RESIDUE FOUND (full): stop what survived inside the step that starts it …` | Kalıntı var; sızdıran adım düzeltilmeli | 1 |
| `RESIDUE NOT MEASURED (<profil>): scripts/check.conf has no steps — rerun when steps exist` | Adım yok; **asla "temiz" kanıtı değildir** | 0 |
| `RESIDUE TEST ABORTED (<profil>): check failed in run <n> — the residue test needs a green check` | Check kırmızı; önce onu düzelt | 1 |

Ayarlar: `ANEW_RESIDUE_SETTLE` (her koşudan sonra beklenecek saniye, varsayılan 5), `ANEW_RESIDUE_MB` (not düşmeye değer bellek düşüşü, varsayılan 512).

**Kim çalıştırır.** Ajan: bootstrap'te ve `scripts/check.conf` her değiştiğinde, **iki profil** için (`./scripts/residue` ve `./scripts/residue --fast`). Kapıda tek satır görürsün: `Residue: clean (fast + full)`. Sen yalnız `RESIDUE FOUND` çıktığında — sızdıran adım ve önerilen düzeltmeyle — karar verirsin.

**Sık hata:** kalıntı testini bir spec'e kabul kriteri diye yazmak (o, `check.conf` değiştiğinde BUILD'in görevidir); insandan makineyi boşa almasını istemek. (RESMÎ — `docs/commands.md`)

### 7.7 `scripts/selftest`

**Amaç.** `scripts/check`, `doctor`, `residue`, `status` ve `gate`'in belgelendiği gibi davrandığını senaryo senaryo kanıtlar. Her senaryo repo **dışındaki** atılabilir bir kopyada çalışır; repoda hiçbir şey yazmaz. Son satır: `== selftest: <n> passed, <m> failed ==`.

**Senin için ne anlama gelir.** Günlük bir komut değildir (TAHMİN). İki durumda işine yarar: ANEW betiklerinden birini kendi ihtiyacına göre değiştirdiysen ve şablonu yeni sürüme yükselttiysen — kopyanın belgelenen davranıştan nerede saptığını söyler. CI `doctor`'dan sonra çalıştırır. Aynı anda iki selftest çalıştırma: içindeki kalıntı testleri yüke duyarlıdır (RESMÎ — `.anew-dev` planlarındaki not).

**Sık hata:** geçsin diye betiği ve selftest'i birlikte düzenlemek — kırmızı selftest, betiğin artık belgesinden farklı davrandığı anlamına gelir.

> **ÇELİŞKİLİ (küçük):** `docs/commands.md`'deki `scripts/selftest` maddesi dört betik sayar (check, doctor, residue, status); betiğin kendi başlık yorumu ve `README.md` beş betik sayar (`gate` dâhil).

### 7.8 CI ve PR şablonu: betiklerin son güvencesi

`.github/workflows/check.yml` her `push` ve her `pull_request`'te iki iş çalıştırır (RESMÎ):

| İş | Adımlar |
|---|---|
| `doctor` | Tam geçmişle checkout (`fetch-depth: 0` — doctor `specs/done/`'ı PR'ın merge-base'ine göre karşılaştırır) → `./scripts/doctor --strict` → `./scripts/selftest` |
| `check` | `scripts/check.conf` varsa `./scripts/check` (**her zaman full**); yoksa "pre-bootstrap — skipping" deyip geçer |

`.github/pull_request_template.md` kapı kayıtlarını PR'da görünür kılar: spec ve plan yolu; planın onay satırı **kelimesi kelimesine**; inceleme raporu; triyaj (planın `## Triage` bölümüne bağlantı); ship'te dışarı taşınan kriterler; kanıt tablosu; ve sekiz onay kutusu (spec plandan önce onaylıydı, check yeşil, bağımsız inceleme yapıldı, gerçek bulgular düzeltildi, her kriterin kanıtı var, docs/ADR güncellendi, hiçbir test zayıflatılmadı, `doctor --strict` geçiyor). Başlığı: "copied from files, not from memory" — hafızadan değil dosyalardan kopyalanır.

Hook'u ve alt ajanı olmayan araçlarda (Cursor, Codex, generic) kuralları fiilen tutan şey bu ikilidir.

---

## 8. Süreçler uçtan uca

Önce hangi durumda hangi sürecin geçerli olduğu:

| Durum | Süreç (`workflows/…`) | Başlatan komut |
|---|---|---|
| İlk kez kuruyorum | `bootstrap.md` | `/bootstrap` |
| Yeni bir davranış istiyorum | `feature-development.md` + `segments.md` | lite: `/new-feature` · strict: `/analyze` |
| Var olan bir davranış değişmeli | `change-request.md` | `/change` |
| Bir şey yanlış çalışıyor | `bug-fix.md` | `/fix-bug` |
| Yapı değişecek, davranış aynı kalacak | `refactor.md` | `/refactor` |
| Canlı ortam yanıyor | `incident.md` | (komutu yok; süreç elle izlenir) |
| Geri alınması zor bir karar veriyorum | `docs/decisions/` | `/adr` |
| İş ters gitti | `prompts/recovery/` | `/recover` |

### 8.1 (a) İlk kurulumdan ilk özelliğin teslimine

| # | Kim | Ne yapar | Oluşan / değişen |
|---|---|---|---|
| 1 | Sen | Şablonun kopyasını al (etiket ya da `main`); yeni projede `.anew-dev/`'i sil | Kendi repon |
| 2 | Sen | `./scripts/init <araç>` | Adaptör dosyaları kökte |
| 3 | Sen + ajan | `/bootstrap`: iki dil → mülakat → üretim → doğrulama → rapor | `docs/*.md`, `scripts/check.conf`, `AGENTS.md` (`Mode`, `Language`), dal `chore/bootstrap` |
| 4 | Sen | Raporu ve açık kararları onayla; `chore/bootstrap`'i merge et | Varsayılan dalda yapılandırılmış çalışma alanı |
| 5 | Sen | `./scripts/doctor` | `0 fail` |
| 6 | Sen | İlk işi başlat. **Boş projede** ilk spec yürüyen iskelettir; **mevcut projede** ilk özellik ya da değişiklik | — |
| 7 | Ajan + sen | Yürüyen iskelet: spec → plan (plan kapısında ortam hükmü, R-13 kararı) → build (`check.conf` adımları etkinleşir, kalıntı testi ilk kez gerçekten ölçülür) → review → triyaj → verify → ship | `specs/done/0001-…md`, `specs/plans/0001-plan.md`, çalışan `./scripts/check` |

Yürüyen iskeletin anlamı: boş projede `check` hiçbir şeyi kanıtlamaz, çünkü kod yoktur. İlk iş bu yüzden bir "özellik" değil, araç zincirini kuran ve tek doğrulama komutunu gerçek adımlarla çalışır hâle getiren en küçük uçtan uca dilimdir. Sonraki her spec bu zemine dayanır. (RESMÎ — `workflows/bootstrap.md` adım 5; video 37:37–42:46)

### 8.2 (b) Sonradan ek özellik ekleme

Yeni davranışın on adımı (RESMÎ — `workflows/feature-development.md`). Segment gruplaması: `ANALYZE (1–2) · PLAN (3–4) · BUILD (5) · REVIEW (6) · VERIFY (9)`; 7 ve 10 insan kararıdır; 8 Developer'ın triyajı uygulamasıdır.

| # | Adım | Rol | Prompt | Kapı / kanıt | Oluşan dosya |
|---|---|---|---|---|---|
| 1 | INTENT & CLARIFY | Analyst | `prompts/clarify.md` | Her netleştirme sorusu cevaplanmış. Strict'te ve hassas alanda insan kapısı; lite'ta spec'in içine katılır | — |
| 2 | SPEC | Analyst | `prompts/spec.md` | **Kapı: spec onayı** → `Status: Approved` | `specs/active/NNNN-<ad>.md` |
| 3 | PLAN | Developer | `prompts/plan.md` | Dosyalar + adımlar + riskler + kriter ↔ test eşlemesi. Kod yok | `specs/plans/NNNN-plan.md` |
| 4 | APPROVAL | İnsan | — | **Kapı: plan onayı** → `Approved by / on` dolu | plan dosyasında onay satırı |
| 5 | BUILD | Developer | `prompts/build.md` | Adımlar plana uyar; `scripts/check` yeşil. Sapma → R-07 | Kod, testler; spec `In progress`; planda `## Build evidence` |
| 6 | INDEPENDENT REVIEW | Reviewer | `prompts/review.md` | Kanıtlı bulgular ya da "clean" | (hiçbir dosya) |
| 7 | TRIAGE | İnsan | — | **Kapı:** her bulgu `real` / `noise` / `defer` / `investigate` | Planda `## Triage` tablosu; `defer` → `specs/backlog.md` |
| 8 | FIX ROUNDS | Developer | `prompts/build.md §fixes` | Yalnız `real` bulgular; `[plan NNNN/fix-k]` | Düzeltme commit'leri |
| 9 | VERIFY | QA | `prompts/verify.md` | Kriter ↔ kanıt tablosu eksiksiz | (tablo raporda; ship'te spec'e/PR'a) |
| 10 | SHIP | İnsan | — | **Kapı:** DoD yeşil → kanıtlanan kriterleri `[x]` işaretle → scorecard → spec'i `specs/done/`'a taşı (PR içinde) → merge | `specs/done/NNNN-<ad>.md`, `Status: Shipped` |

2, 4, 7 ve 10. adımların kaydı `scripts/gate` ile de yazılabilir: elle düzenlemeyle aynı kayıt, denetlenmiş ve commit'lenmiş olarak.

#### Lite modda (tek komut, dört kapı)

1. `/new-feature "<özellik>"`.
2. Ajan spec taslağını yazar (netleştirme içinde), öz-eleştiri boşluklarını önerileriyle listeler. **Kapı 1 — spec onayı** (hızlı evet/hayır).
3. Ajan `./scripts/doctor` çalıştırır ve planı yazar. **Kapı 2 — plan onayı** (ad + tarih plana yazılır).
4. Ajan build eder; `./scripts/check --fast` ile yineler, sonunda full yeşil; kanıt satırını plana yazar.
5. Bağımsız inceleme (araca göre alt ajan ya da yeni sohbet). **Kapı 3 — triyaj.**
6. Gerekirse düzeltme turları (aşağıdaki tablo).
7. Kanıt tablosu (one-pass review'da zaten rapordadır). **Kapı 4 — ship.**

#### Strict modda (rol başına oturum)

`/new-feature` reddeder. Her rol kendi oturumunu açar, rolünü üstlenir (Bölüm 11) ve kendi komutunu çalıştırır; bir sonraki rol **yeni bir oturumda dosyaları okuyarak** devralır.

| Oturum | Rol | Komut | Giriş koşulu | Çıkışta dosya durumu | Devir satırı |
|---|---|---|---|---|---|
| 1 | Analyst | `/analyze "<özellik>"` | İkiz spec yok | Spec `Status: Approved` | `Next: PLAN — Developer` |
| 2 | Developer | `/plan NNNN` | Spec `Approved` | Plan `Status: Approved` + `Approved by / on` | `Next: BUILD — Developer` |
| 3 | Developer | `/build NNNN` | Plan onayı kayıtlı; ortam hükmü plandakiyle aynı | Spec `In progress`; `## Build evidence` | `Next: INDEPENDENT REVIEW — fresh session / read-only reviewer` |
| 4 | Reviewer | `/review NNNN` | Dal/diff ve `In progress` spec var (soft) | Hiçbir şey yazmaz | `Next: TRIAGE — human (…)` |
| — | İnsan | (triyaj) | — | Planda `## Triage`; `defer` → backlog | — |
| 5 | Developer | `/build NNNN` (düzeltme turu) | — | `[plan NNNN/fix-k]` commit'leri | review'a geri ya da VERIFY |
| 6 | QA | `/verify NNNN` | Triyaj tamam (soft) | Kanıt tablosu | `Next: SHIP — human (…)` |
| — | İnsan | (ship) | — | Spec → `specs/done/`, `Status: Shipped` | — |

#### Düzeltme turundan sonra nereye?

| Turun içeriği | Alan | Sonraki adım |
|---|---|---|
| En az bir Medium ya da üstü bulgu | herhangi | Düzeltme diff'i yeniden REVIEW (dar kapsam) |
| Yalnız Low/Info | hassas alan **dışı** | Doğrudan VERIFY (VERIFY diff'i okur) |
| Yalnız Low/Info | hassas alan | Yeniden REVIEW (kısayol yok) |
| Diff yalnızca dokümantasyona dokunuyor | herhangi (hassas dâhil) | Doğrudan VERIFY |
| Üç tur doldu, hâlâ gerçek bulgu var | herhangi | Dördüncü tur başlatılmaz → **R-06** (kök neden kodda mı, planda mı, spec'te mi?) |

(RESMÎ — `workflows/feature-development.md` adım 8)

#### Triyajın dört hükmü

| Hüküm | Anlamı | Sonucu |
|---|---|---|
| `real` | Gerçek; şimdi düzeltilecek | Developer düzeltme turu; Note'a `fix-<k>` |
| `noise` | Gürültü | **Yazılı gerekçeyle** reddedilir; backlog'a park edilmez |
| `defer` | Gerçek ama kararla sonra | `specs/backlog.md`'de bir `B-<n>` kaydı |
| `investigate` | Emin değiliz | QA asgari yeniden üretme yapar (R-05); sonucu yeni bir tur kaydeder |

İki ek kayıt triyajda doğar: planı değiştiren karar plana **Amendment `A-n`** olarak yazılır; "build sırasında bir kural bunu yakalardı" denen gerçek bulgu `docs/conventions.md`'nin **Known traps** bölümüne bir satır ekler (triyajda `A-n` olarak onaylanır, Developer düzeltme turunda yazar). Böylece yakalanan hata kalıcı kurala dönüşür ve sonraki build'ler aynı hatayı yapmaz.

### 8.3 (c) Devam eden işe değişiklik isteği ve triyaj

İki ayrı durum vardır, karıştırma:

| Durum | Ne yapılır |
|---|---|
| **Üzerinde çalışılan** (henüz teslim edilmemiş) spec'in bir kriteri değişti | **R-08** (spec iş ortasında değişti): önce `specs/active/…` güncellenir → delta plan (hangi adımlar yaşıyor, hangileri ölüyor, ne yeni) → onay → devam. Spec ve delta plan onaylanmadan yeni gereksinime karşı kod yazılmaz |
| İstek aslında **yeni bir yetenek** | Değişiklik değildir: kendi spec'i olur; bundan sonra (ya da bu ona bağımlıysa önce) teslim edilir |
| **Teslim edilmiş** bir davranış değişmeli | `/change`: triyaj cetveli → BUG / TRIVIAL / CHANGE. Araya giren iş kendi numarasını alır; eldeki spec'e dokunmaz |

`/change`'in şeritleri:

```
İstek: var olan bir davranış değişsin
 ├─ (a) Anlaşılandan sapma mı?           EVET → BUG → /fix-bug (dur)
 ├─ (b) Bir kabul kriteri değişiyor mu?  EVET → CHANGE (mini-spec)
 │                                        HAYIR → TRIVIAL adayı
 └─ (c) Ortak koda dokunuyor mu?         EVET → CHANGE (b trivial dese bile)
                                          HAYIR → TRIVIAL
```

CHANGE şeridi özellik akışının sıkıştırılmış hâlidir: aynı segmentler, aynı kapılar, daha küçük dosyalar. Mini-spec → plan (onay **asla atlanmaz**) → build → dar review → triyaj → verify (değişen **ve** korunan kriterler; arayüzde önce/sonra ekran görüntüleri) → ship.

### 8.4 (d) Hata düzeltme

`REPORT → REPRODUCE (kırmızı test) → DIAGNOSE → FIX → PROVE → REVIEW → SHIP`. Spec ve plan dosyası açılmaz; "rapor + kırmızı test" spec'in eşdeğeridir. Ayrıntı: Bölüm 6.12.

| Adım | Rol | Kanıt / kapı |
|---|---|---|
| REPORT | — | Beklenen/gerçekleşen, ortam, sıklık |
| REPRODUCE | QA | Asgari başarısız test. Yeniden üretilemiyorsa gerekçeli kapatma — **insan kapısı** |
| DIAGNOSE | Developer | Kök neden: hangi dosya, hangi varsayım, neden şimdi |
| FIX | Developer | Kırmızı testi yeşile çeviren en küçük değişiklik |
| PROVE | Developer | Kırmızı test yeşil + bütün suite yeşil (full). Test kalıcıdır |
| REVIEW | Reviewer (taze oturum) | Dar kapsam. Triyaj — **insan kapısı** |
| SHIP | İnsan | Raporu referans gösteren PR |

### 8.5 (e) Refactor

`BASELINE → SPEC & PLAN → [onay] → REFACTOR → PROVE UNCHANGED → REVIEW → [triyaj] → SHIP`. Üç demir kural: kırmızıdayken refactor yok; sıfır test düzenlemesi; refactor ile özellik karıştırılmaz. Ayrıntı: Bölüm 6.13.

### 8.6 (f) Incident (canlı ortam olayı)

`ASSESS → STABILIZE → [insan: eylem] → EVIDENCE → ROOT CAUSE → FIX (bug-fix akışı) → POSTMORTEM`. Amaç: "önce canlıyı stabilize et, sonra öğren. Hız önemlidir — buradaki kapılar bilerek incedir." Bu akışın ayrı bir slash komutu **yoktur**; `workflows/incident.md` elle izlenir. (RESMÎ — `workflows/incident.md`)

| Adım | Ne yapılır |
|---|---|
| ASSESS | Ne bozuk, etki alanı, ne zamandan beri, en son ne değişti (deploy, config, veri) |
| STABILIZE | Sıkıcı seçeneği tercih et: geri alma (R-11 — `git revert`, geçmiş yeniden yazılmaz), özellik bayrağını kapatma, ölçekleme, hız sınırlama. **Canlı ortam eylemini insan yürütür ya da açıkça onaylar — ajanlar canlıya tek taraflı dokunmaz** |
| EVIDENCE | Buharlaşmadan önce: loglar, metrikler, başarısız istekler, zaman çizelgesi. Olay mini-spec'i: `specs/active/NNNN-incident-<tarih>.md` (`Source` = olay kimliği; korunan davranış = stabilize ederken çalışmaya devam etmesi gereken şey) |
| ROOT CAUSE | Belirti değil neden. "Kapılarımız bunu neden kaçırdı?" sorusu kök nedenin parçasıdır |
| FIX | Hata düzeltme akışı (önce yeniden üretme). Olay hafifletmeyle "bitmiş" olmaz |
| POSTMORTEM | Suçlamasız, kısa, yazılı. Çıktılar kalıcı hâle gelir: yeni bir test, `check.conf`'ta yeni bir kontrol, bir docs kuralı ya da bir ADR — "aksi hâlde ders adrenalinle birlikte buharlaşır" |

Dal adı kalıbı `incident/<tarih>-<kısa-ad>`'dır (RESMÎ — `docs/git.md`). Olay mini-spec'i de öteki mini-spec'ler gibi spec numaralarını ve `scripts/doctor` denetimlerini paylaşır; bu şeritte ANALYZE olmadığı için öz-eleştiri geçişi mini-spec üzerinde ayrıca çalıştırılır ve boşlukları insan onayladıktan sonra `- Self-critique: done` yazılır (RESMÎ — `workflows/incident.md` adım 3). Postmortem'in hangi dosyaya yazılacağı repoda belirtilmiyor (TAHMİN: olay mini-spec'inin yanına ya da PR'a).

### 8.7 (g) Mimari karar (ADR)

Karar anında `/adr "<soru>"` → tartışma (öneri + yeniden bakma tetikleyicileri) → **senin kararın** → `docs/decisions/<NNNN>-<slug>.md`. Kabul edilmiş ADR düzenlenmez; yerini alan karar yeni bir ADR alır ve eskisinin durumu `Superseded by ADR-NNNN` olur. ANEW'in kendi kararları (`docs/decisions/anew/ANEW-NNNN-…`) senin değildir: düzenleme, yeniden numaralama; birini inceltiyor ya da geçersiz kılıyorsan kendi ADR'inde söyle ve bağlantı ver. Ayrıntı: Bölüm 6.14.

### 8.8 (h) Yalnız analiz (`/analyze`)

`/analyze` tek başına da anlamlıdır: bir fikri kod yazdırmadan, onaylı bir spec'e kadar olgunlaştırır ve durur. Üç kullanım:

- **Strict modda** her özelliğin başlangıcı (Analyst oturumu). Yazarın videoda strict modu anlatırken verdiği örnek: şirkette yalnız analist olarak çalışan ve çok kaliteli analiz çıkarmak isteyen biri (RESMÎ — video, 29:19).
- **Lite modda** yarım kalmış bir spec'i onay kapısından sürdürmek.
- **"Önce ne istediğimizi netleştirelim"** dediğin her durumda: çıktı, başka bir oturumun/insanın/aracın planlayıp uygulayabileceği bir dosyadır (TAHMİN — repodaki tanımdan çıkarım: komut spec onayında durur ve plan üretmez).

---

## 9. Spec ve plan şablonları

### 9.1 Tam spec (`specs/TEMPLATE.md`) — alan alan

| Alan | Değer / biçim | Açıklama |
|---|---|---|
| `# Spec NNNN — <short name>` | Dört haneli numara | Dosya: `specs/active/NNNN-<ad>.md` |
| `- Status:` | `Draft` \| `Approved` \| `In progress` \| `Shipped` | Durum makinesi (aşağıda) |
| `- Mode:` | `lite` \| `strict` | Oluşturulduğu anda `AGENTS.md`'den alınır |
| `- Plan:` | `` `specs/plans/NNNN-plan.md` `` | İlgili plan |
| `- Self-critique:` | `pending` \| `done` \| `pending (<koşul>)` | Öz-eleştiri boşlukları onaylanınca `done`. Ertelenmişse koşuluyla (ör. "after 0012 ships") |
| `## Intent` | 3–5 cümle, iş diliyle | Kim istiyor, neden; başarı neye benzer; bilerek ne yapılmıyor. Netleştirme kararları buraya katılır |
| `## Requirements` | Davranış | Teknik çözüm yok — "nasıl"ın sahibi plandır |
| `## User experience` | Zorunlu başlık | Arayüz yoksa `none — no user interface`. Varsa: **Flow** (giriş noktası → sonuç), **States** (empty, loading, error, success, no permission), **Design reference** (tasarıma bağlantı; repoda kopya değil; yoksa `none — the flow above is the design`), **Accessibility**. Listelenen her durum bir kriter alır |
| `## Constraints & out of scope` | Serbest | Kesin sınırlar ve bilinçli dışlamalar. Hassas alana dokunuyorsa `Sensitive area: <ad>`; bölme önerisi reddedildiyse `Split: …` satırı |
| `## Acceptance criteria` | `- [ ] AC-1 — …` | Her satır bağımsız test edilebilir |
| `## Definition of Done` | 5 kutu | Her kriter kanıta eşlendi · `scripts/check` yeşil · bağımsız inceleme yapıldı (gerçek bulgular düzeltildi, gürültü yazılı gerekçeyle reddedildi, ertelenenler backlog'da) · davranış/mimari değiştiyse docs/ADR güncellendi · spec `specs/done/`'a taşındı |
| `## Scorecard` | 5 metrik, ship'te doldurulur | Spec revisions · Fix rounds · Review findings: real / noise / deferred · Regressions introduced · Bugs escaped to production. "Dürüst sayılar süreci iyileştirilebilir kılar" |

**Durum makinesi ve kimin ilerlettiği:**

```
Draft ──(insan onayı, /analyze sonunda)──▶ Approved ──(Developer, /build başlarken)──▶ In progress ──(insan, ship'te; dosya specs/done/'a taşınırken)──▶ Shipped
```

### 9.2 Mini-spec (`specs/TEMPLATE-mini.md`) — farkları

| Alan | Açıklama |
|---|---|
| Başlıkta `(mini)` | — |
| `- Source:` | **Zorunlu** — iş kalemi anahtarı. "No key, no mini-spec." |
| `- Design:` | Yalnız arayüz değişikliğinde — yeni tasarıma bağlantı |
| `- Supersedes:` | İsteğe bağlı — davranışını değiştirdiği teslim edilmiş spec'in kriteri: `<NNNN>/AC-x` |
| `## Intent` | 2–3 cümle: ne değişiyor, kimin için, neden şimdi |
| `## Changed behavior` | `CB-1`, `CB-2` … — yeni davranışı anlatan 3–5 kriter. Refactor'da tek satır: `none — no observable behavior change` |
| `## Preserved behavior` | **Zorunlu, en az 2** — `PB-1`, `PB-2` … regresyon kriterleri |
| `## Out of scope` | Bilerek dokunulmayanlar |
| `## Definition of Done` | 4 kutu (kanıt tablosu `CB-*` **ve** `PB-*` için eksiksiz) |
| Yok | `## Requirements`, `## User experience`, `## Constraints & out of scope`, `## Acceptance criteria`, `## Scorecard` |

**Mini-spec ne zaman?**

| Durum | Şablon | Dosya adı |
|---|---|---|
| Yeni davranış | `specs/TEMPLATE.md` | `NNNN-<ad>.md` |
| Var olan davranış değişiyor (CHANGE şeridi) | `specs/TEMPLATE-mini.md` | `NNNN-<ad>.md` |
| Refactor | `specs/TEMPLATE-mini.md` | `NNNN-refactor-<ad>.md` |
| Incident | `specs/TEMPLATE-mini.md` | `NNNN-incident-<tarih>.md` |
| Hata düzeltme | Spec yok — rapor + kırmızı test | — |
| Trivial değişiklik | Spec yok — iş kalemi + onaylı triyaj hükmü | — |

Şablonun ilk yorum satırı ruhunu özetler: "brevity is sanctioned, discipline is not" — kısalığa izin var, disiplinsizliğe yok.

### 9.3 Plan (`specs/plans/TEMPLATE.md`) — alan alan

| Alan | Kim yazar | Açıklama |
|---|---|---|
| `- Spec:` | Developer | İlgili spec'in yolu (ship'te `specs/done/…` olur) |
| `- Status:` | PLAN / onay | `Awaiting approval` \| `Approved` \| `Superseded` — spec durumlarından **farklıdır** |
| `- Approved by / on:` | İnsan onayında | `—` (boş) ya da `<ad>, <YYYY-MM-DD>`. "This line IS the plan gate record": plan kapısının kaydı **bu satırın kendisidir**. Boşken `/build` başlamaz |
| `## Files to change or add` | Developer | Yol yol. Bu liste etki alanıdır; sessiz ekleme plan sapmasıdır (R-07) |
| `## Ordered steps` | Developer | Commit boyutunda sıralı adımlar |
| `## Risks & open questions` | Developer | Her biri öneriyle. Çözülmemiş soru build'i bloke eder. Ortam hükmü buraya yazılır; `/build` kendi hükmünü bununla karşılaştırır |
| `## Criterion ↔ test map` | Developer | `Acceptance criterion` \| `Proven by` \| `Profile` (fast/full). Test adları backtick içinde: doctor, hiçbir dosyanın tutmadığı ad için uyarır |
| `## Build evidence` | BUILD yazar; REVIEW ve VERIFY okur | İşaretçi satırlar: `CHECK GREEN (full, <n> steps, <t> s) @<sha>` (ya da CI koşusu bağlantısı); `check.conf` değiştiyse `RESIDUE CLEAN (…) @<sha>` |
| `## Amendments` | İnsan onayıyla | `A-1 — <ne değişiyor> — <neden; kaynak: review round n / R-07> — <ad>, <tarih>`. Satır, kaydettiği plan düzenlemesiyle **aynı commit'te** yazılır |
| `## Triage` | Kapıda, insan kararıyla | Tur başına tablo: `### Review round <n> — <ad>, <tarih>` (ya da `### VERIFY round <n> — …`); sütunlar `Finding` \| `Verdict` \| `Note` |

Triyaj neden planda? Çünkü lite'ta triyaj anında henüz PR yoktur; karar sohbette kalmasın diye dosyaya yazılır, PR açıklaması bu bölüme bağlantı verir.

### 9.4 Backlog (`specs/backlog.md`)

Kayıt biçimi (RESMÎ):

```
- **B-<n>** — <bulgu, tek satır> — Source: spec <NNNN>, review round <n> (<file:line>) — Severity: <…>
  — Recommendation: <incelemecinin önerdiği eylem> — Deferred by: <ad>, <YYYY-MM-DD>, <neden>
```

Buraya üç şey düşer: triyajda `defer` denen bulgular; ship'te dışarı taşınan kriterler (`→ moved to B-<n>`); bootstrap'te ertelenen kararlar (`Source: bootstrap <YYYY-MM-DD>`). Kayıt, onu kapatan işin commit'inde silinir; yeni davranışa büyüyen kayıt bir düzeltme değil, kendi spec'i olur.

> **ÇELİŞKİLİ (küçük):** `specs/backlog.md` "kaydı, onu kapatan işin commit'inde sil" der; şablonun kendi `.anew-dev/backlog.md`'sinde kapatılan iki kayıt (B-8 ve B-11) silinmemiş, "Taken into spec 0008" ve "Taken into spec 0007 (Requirement 7)" notlarıyla bırakılmıştır.

### 9.5 Dosyaların yaşam döngüsü

```
(istek)
  │  ANALYZE: numara = active/ + done/ + plans/ içindeki en yüksek + 1
  ▼
specs/active/NNNN-<ad>.md          Status: Draft, Self-critique: pending
  │  öz-eleştiri boşlukları onaylanır → Self-critique: done
  │  KAPI 1: spec onayı
  ▼
specs/active/NNNN-<ad>.md          Status: Approved
  │  PLAN: specs/plans/NNNN-plan.md (Status: Awaiting approval, Approved by / on: —)
  │  KAPI 2: plan onayı → Status: Approved, Approved by / on: <ad>, <tarih>
  ▼
specs/active/NNNN-<ad>.md          Status: In progress      (BUILD, ilk değişiklikten önce)
  │  plana eklenenler: ## Build evidence · ## Amendments (A-n) · ## Triage (tur tabloları)
  │  REVIEW → KAPI 3: triyaj (defer → specs/backlog.md B-<n>) → düzeltme turları → VERIFY
  │  KAPI 4: ship — kanıtlanan kriterler [x]; kanıtlanamayan → üstü çizili + "→ moved to …"
  ▼
specs/done/NNNN-<ad>.md            Status: Shipped          (değiştirilemez)
specs/plans/NNNN-plan.md           (yerinde kalır)
```

- Davranış sonradan değişecekse `specs/done/` **düzenlenmez**; `specs/active/`'te yeni bir (mini) spec açılır ve `Supersedes:` ile eskisine atıf yapılır.
- Aynı iş için ikinci spec açılmaz: "ikiz spec bir adlandırma sorunu değil süreç hatasıdır"; doctor yakalar.
- R-09 devir dosyaları (`specs/plans/NNNN-handoff.md`) plan değildir; iş devralınınca silinir, ship'te kalmaz.

---

## 10. Segmentler, kapılar, kural gücü ve kanıt

### 10.1 Segment sözleşmesi: neden hep duruyor?

Her segment dört maddelik aynı sözleşmeyi izler (RESMÎ — `workflows/segments.md`):

1. **Giriş kontrolü** — koşul *dosyalardan* doğrulanır, asla sohbetten. Hard kontrol tam mesajla reddeder; soft kontrol uyarır ve devam edilsin mi diye sorar.
2. **İş** — atıf yapılan prompt, yazıldığı gibi yürütülür.
3. **Kapı** — işaretli yerde durulur, insan beklenir. Onaysız hiçbir şey uygulanmaz. **Kapı mesajı başına tek karar**: birden çok açık kalem ya tek tek sorulur ya da her kalem ve önerisi açıkça yazılarak "yukarıdaki bütün önerileri kabul et" diye tek karar olarak sunulur.
4. **Devir** — dosya, durumu ve `Next: <segment> — <kim çalıştırır>` satırını adlandıran özet. Sonra **dur**. Bir sonraki segmenti asla başlatma.

| Segment | Giriş kontrolü | Ret / uyarı | Ne ayarlar | Devir satırı |
|---|---|---|---|---|
| ANALYZE | Hard: ikiz spec yok | Var olanı sürdürmeyi teklif eder | Spec `Status: Approved` | `Next: PLAN — Developer` |
| PLAN | Hard: spec `Approved` | "Spec not approved — run ANALYZE or get approval first." | Plan `Status: Approved` + `Approved by / on` | `Next: BUILD — Developer` |
| BUILD | Hard: plan onayı kayıtlı; sonra ortam hükmü plandakiyle aynı | "Plan not approved — run PLAN and get the approval recorded first." · "Environment differs from the plan — R-13." | Spec `In progress`; `## Build evidence` | `Next: INDEPENDENT REVIEW — fresh session / read-only reviewer` |
| REVIEW | Soft: push'lanmış commit'ler + `In progress` spec | Yoksa söyler, sorar | Hiçbir şey (salt okunur) | `Next: TRIAGE — human (real / noise / defer / investigate); then Developer fix rounds, then VERIFY` |
| VERIFY | Soft: triyaj kaydı var | Yoksa söyler, sorar | Hiçbir şey (üretim kodu yok) | `Next: SHIP — human (…)` |

**Neden böyle?** Tek bir "bütün özelliği yap" komutu, akışın dayandığı rolleri çökertir: spec'i yazan oturum planlamaya ve inşa etmeye devam eder, insandan onayı bir sonraki adımı çoktan taslaklamış bir ajan ister. "Üreten kendi işini doğrulamaz" kuralı aşamalar arasında bir hatırlatma değil, **mekanik bir dikiş** ister. Öte yandan düşük riskli bir iş yapan tek geliştiriciyi beş ayrı oturuma zorlamak karşılıksız törendir — zincirleyici bunun için vardır. (RESMÎ — ANEW-0002)

### 10.2 Kapı türleri

`workflows/` dosyalarında adımların yanında şu etiketleri görürsün (RESMÎ — `workflows/README.md`):

| Etiket | Anlamı |
|---|---|
| `[GATE: human]` | İnsan kararı. Hiçbir modda otomatikleşmez |
| `[GATE: human — strict]` | Strict'te zorunlu; lite'ta ajan varsayımını söyler ve itiraz edilmedikçe devam eder — hassas alan hariç, orada sorulur |
| `[GATE: light]` | Her modda sorulur ama lite'ta hızlı bir evet/hayırdır (spec onayı); bir sonraki segmentin giriş koşulu olduğu için asla atlanmaz |

Ajana hiçbir modda devredilmeyen kararların tam listesi (RESMÎ — `docs/roles/README.md`): spec onayı · plan onayı · bulgu triyajı · ship · değişiklik isteği triyaj hükmü · trivial değişiklik politikası ve çalışma modu (bootstrap'te).

### 10.3 Hassas alan her modda daha sıkıdır

`docs/domain.md`'de bir alan hassas ilan edildiyse ve spec `Sensitive area: <ad>` diyorsa:

| Normalde | Hassas alanda |
|---|---|
| Lite'ta netleştirme taslağa katılır | Netleştirme kapısı lite'ta da sorulur |
| Yalnız Low/Info içeren düzeltme turu doğrudan VERIFY'a gider | Her düzeltme turu yeniden incelenir (yalnız-doküman turu hariç) |
| VERIFY riskli davranışlarda kodu kasıtlı bozar (spec başına 4–5) | **Her** kriter kasıtlı bir bozmayla "kırmızı" kanıtlanır |
| One-pass review yapılabilir | Yapılamaz |
| Kanıtlanamayan kriter ship'te dışarı taşınabilir | Taşınamaz — kanıtlanana dek ship bloke |
| Büyüyen bir listeye öğe eklemek izinli test düzenlemesidir | Listenin kesinliği davranışın kendisidir; ekleme kendi mini-spec'ini ister |

Yazarın videodaki açıklaması: hassas alan QA'yı o bölgede daha çok test yapmaya iter; izin sisteminde bakiye, e-ticarette stok, para, kupon gibi. (RESMÎ — video, 19:20)

### 10.4 Kural gücü: Documented / Validated / Enforced

ANEW her kuralın **hangi araçta ne kadar güçlü** tutulduğunu açıkça söyler; gerçek düzeyin üstünde iddia yapmaz. Gerekçe: "kimsenin göremediği boşluk, kimsenin kapatmadığı boşluktur" (ANEW-0004).

- **Documented** — kural yazılıdır; ajana uyması söylenmiştir.
- **Validated** — bir betik ihlali yakalar (`scripts/doctor` / `scripts/check`, yerelde ve CI'da).
- **Enforced** — araç eylemi fiziksel olarak engeller.

| Kural | Claude Code | GitHub Copilot | Cursor | Codex | Diğer araçlar |
|---|---|---|---|---|---|
| Plandan önce spec onaylı | Validated (CI) | Validated (CI) | Validated (CI) | Validated (CI) | Validated (CI) |
| Build'den önce plan onayı kayıtlı | Validated (CI) | Validated (CI) | Validated (CI) | Validated (CI) | Validated (CI) |
| Planı **kim** onayladı | Documented | Documented | Documented | Documented | Documented |
| Üreten ≠ doğrulayan | **Enforced** (reviewer alt ajanında Edit/Write yok) | **Enforced** (reviewer ajanında düzenleme aracı yok) | Documented (yeni sohbet) | Documented (yeni oturum) | Documented (yeni oturum) |
| Teslim edilmiş spec değiştirilemez | **Enforced** (hook) + Validated (CI) | Documented (talimat) + Validated (CI) | Documented (kural) + Validated (CI) | Validated (CI) | Validated (CI) |
| Force push / hard reset yok | **Enforced** (izin yasağı) | Documented | Documented | Documented | Documented |
| "Bitti" = `scripts/check` yeşil | Validated (CI) | Validated (CI) | Validated (CI) | Validated (CI) | Validated (CI) |
| Kanıt saklanmaz, işaret edilir | Validated (doctor uyarır) | aynı | aynı | aynı | aynı |
| Check arkasında çalışan şey ve veri bırakmaz | Documented (kalıntı testi CI'da değil; veriyi ölçmez) | aynı | aynı | aynı | aynı |
| Arayüz spec'i akış, durumlar ve tasarım bağlantısını tanımlar | Documented | Documented | Documented | Documented | Documented |
| Kanıt `--fast`'i değil tam profili gösterir | Validated (doctor uyarır) | aynı | aynı | aynı | aynı |

(RESMÎ — `README.md`, "How strongly is each rule held?")

Okuma notları: Segment komutlarının sıra dışı işi reddetmesi, ajanın Documented bir kurala uymasıdır; onu Validated yapan CI'dır. Claude Code'un hook'u yalnız düzenleme araçlarını yakalar — kabuk yönlendirmesi (`echo … > specs/done/…`) hook'tan kaçar; son güvence yine CI ve incelemedir (RESMÎ — `adapters/claude-code/README.md`).

### 10.5 Kanıt kuralı

**Kanıt politikası** (RESMÎ — `docs/testing.md`, Evidence policy):

1. **Kanıt saklanmaz, işaret edilir.** Bir kriterin kanıtı = testin adı + onu yeniden üreten komut. Repoda yaşayan tek kanıt artefaktı kriter ↔ kanıt tablosudur.
2. **Yeniden üretilebilir kanıt asla dosyalanmaz.** Check çıktısı, konsol dökümü, coverage raporu, log kopyası repoya girmez — git geçmişi ve CI koşuları zaten arşivler.
3. **Yeniden üretilemeyen kanıt** (insanın çektiği ekran görüntüsü, tek seferlik ölçüm, dış sistem teyidi) PR'a gider (açıklama ya da ek); PR yoksa SHIP kapısında gösterilir. Tablo ona bağlantı verir ya da onu adlandırır. İstisnadır. Ajanın çektiği ekran görüntüleri ayrı kurala bağlıdır ("Evidence for UI criteria": repo dışında geçici klasör, SHIP'te galeri).
4. **Repo asla kendi çalışma ağacının içine klonlanmaz.** Temiz klon doğrulaması repo dışında geçici bir klasörde koşar ve silinir.
5. **`evidence/` (ya da `.evidence/`) klasörü yoktur.** Böyle bir klasör açma ihtiyacı duyan ajan 1. kuralı çiğnemek üzeredir.

**İki hız, tek sözleşme** (RESMÎ — `docs/testing.md`, öne çıkanlar):

- "Fast green is a working state; only full green is evidence."
- Fast'e ne girer: derleme ve hızlı testler (unit, lint). Yalnız full: uzun entegrasyon suite'leri, e2e ve tek başına ~bir dakikayı aşan her adım.
- **Test adımını bir seçiciyle böl, listeyle değil.** Hızlı adım bir filtreyle (kategori, etiket, ad alanı) seçer, yavaş adım aynı filtrenin tersini çalıştırır; böylece "fast ∪ gerisi = bütün testler" yapı gereği doğrudur ve sonradan eklenen test mutlaka birinde koşar. Dosya adı sayarak bölmek sessiz bir delik bırakır.
- **Tam yeşil, commit'inin kanıtıdır — bir kez çalıştır.** Eldeki commit için `CHECK GREEN (full, …)` varsa review, verify ve kapılar onu **alıntılar** (satır + commit SHA'sı, HEAD'e eşit olmalı), yeniden çalıştırmaz. Yeni commit yeni bir tam koşu ister. Tek istisna: yalnız `specs/`'e dokunan ship commit'i yeşili devralır; ispatı `git diff --name-only <green-sha> HEAD -- . ':!specs/'` komutunun hiçbir şey yazdırmamasıdır.
- Tek test yazarken yalnız o testi çalıştırmak ve push'tan önce dokunulan alanın yavaş testlerini çalıştırmak "yazarlıktır", kanıt değildir.

**Test katmanları:** "kriteri kanıtlayan en ucuz test" — önce unit, sonra component/entegrasyon, ve ancak hiçbir alt katman kanıtlayamıyorsa tarayıcıda uçtan uca. ANEW e2e şart koşmaz; e2e'si olan proje hangi kritik yolculukları kapsadığını ve bütçesini (yolculuk sayısı, dakika) bootstrap'te yazar. Var olan her test bir check adımıdır: check'in dışındaki suite hiçbir şey kanıtlamaz ve bozulduğunu kimse görmez.

**Korunan testler ve "büyüyen listeler":** assert zayıflatmak, test silmek, atlamak yasaktır. Tek izinli test düzenlemesi: teslim edilmiş bir test tam bir listeyi sabitliyorsa (menü, rapor sütunları) ve yeni spec'in kriteri öğe ekliyorsa, o öğeyi beklenen listeye **eklemek** — hiçbir beklentiyi kaldırmadığı için. İstisna: listenin kesinliği davranışın kendisiyse (roller, izinler, kabul edilen değerler) ya da liste hassas alandaysa, ekleme kendi mini-spec'ini ister.

**Determinizm:** flaky test düzeltilir; yeniden denenmez, atlanmaz (R-03; kanıt: art arda 5 yeşil koşu). Test altındaki uygulama deterministik modda çalışır: animasyonlar kapalı; saat, saat dilimi, locale ve rastgelelik tohumu sabit; üçüncü taraf servisler sahte karşılıklarla değiştirilmiş.

**Kaynak hijyeni:** check arkasında çalışan hiçbir şey bırakmaz (daemon, test host'u, tarayıcı, konteyner …) ve bir koşunun yazdığı veri (veritabanı satırı, dosya, kuyruk) bir sonrakine ulaşmaz. İlkini kalıntı testi ölçer; ikincisi yalnız yazılı kuraldır.

### 10.6 Descope, waive değil

Ship kapısında bir kriter kanıtlanamıyorsa ne olur? İki cazip yanlış vardır: kriteri sessizce düşürmek ya da "bu seferlik istisna" demek. ANEW ikisini de yasaklar, üçüncü bir yol tanımlar (RESMÎ — ANEW-0012, R-08):

| | **Waive (feragat) — YASAK** | **Descope ("moved out") — İZİNLİ** |
|---|---|---|
| Ne yapılır | Kriter spec'te kalır, "karşılanmadı ama kabul ettik" denir | Kriter spec'ten **dışarı taşınır**: satırı kalır, üstü çizilir, nereye gittiği yazılır |
| "Bitti"nin anlamı | İkiye bölünür: bazen her kriter kanıtlı, bazen değil | Tek kalır: spec, **kalan her kriteri kanıtlanmış** olarak teslim edilir |
| Kanıtlanmamış iş | Görünmez olur | Sahibi, tarihi ve gerekçesi olan açık iş olarak görünür kalır |
| Denetim | — | `scripts/doctor` her yeni ship'te işaretsiz kriter için var olan bir hedefe sahip taşıma satırı arar |

Satır biçimi (aynı satırda):

```markdown
- [ ] ~~AC-4 — Gecikme e-postası ertesi sabah gönderilir~~ → moved to B-3 — Hayalî Geliştirici, 2027-01-13, e-posta servisi henüz yok
```

Hedef ya var olan bir backlog kaydı (`B-<n>`) ya da `specs/active/`'teki açık bir spec (`spec <NNNN>`) olmalıdır. `→` yerine ASCII `->` de kabul edilir. **Hassas alan kriteri dışarı taşınamaz.** Karar insanındır ve bir spec değişikliğidir (R-08), istisna değil. Sinyal: taşımalar rutin hâle geldiyse spec kalitesinde sorun vardır — kanıtlanamayan kriterler yazılıyordur.

---

## 11. Roller ve reviewer alt ajanı

### 11.1 Rol = oturum

Roller teknolojiye değil **sorumluluğa** bağlıdır ve tek bir ilkeyi kodlar: *üreten akıl kendini denetleyemez*. Mekanik karşılığı: **rol = oturum**. Farklı bir araca gerek yoktur; ikinci bir pencere/terminal ya da salt okunur bir alt ajan yeter. (RESMÎ — `docs/roles/README.md`)

| Rol | Sahip olduğu aşamalar | Komut | Yapabilir | **Yapamaz** | Durma kuralı |
|---|---|---|---|---|---|
| **Analyst** | INTENT → CLARIFY → SPEC; değişiklik isteği triyajı | `/analyze`, `/change` | Niyet taslağı, önerili netleştirme soruları, spec | Gereksinime teknik çözüm yazmak; kod ya da plan yazmak; belirsizliği varsayımla çözmek | Spec `Approved` olunca biter; plan önerisi bile üretmez |
| **Developer** | PLAN → BUILD → düzeltme turları | `/plan`, `/build` | Plan, onaylı planı uygulama, test yazma, plan değişikliği **önerme** | Onaysız planla başlamak; spec'i tek taraflı değiştirmek; test zayıflatmak; planın dosya kapsamını sessizce aşmak; check yeşil olmadan "bitti" demek | İki kez durur: planı sunduktan sonra ve build kanıtından sonra. Kendi build'ini incelemez |
| **Reviewer** | REVIEW | `/review` | Her şeyi okumak, `scripts/check` ve testleri çalıştırmak, bulgu üretmek | **Herhangi bir dosya yazmak**; bulduğunu düzeltmek; yararlı görünmek için bulgu uydurmak | Raporuyla biter; düzeltmez, triyaj yapmaz, kendi inisiyatifiyle yeniden incelemez |
| **QA** | TEST → VERIFY → yeniden üretme | `/verify` | Suite'i çalıştırmak; `investigate` bulguları için başarısız yeniden üretme testi yazmak; kriter başına kanıt talep etmek | Üretim kodu yazmak; bug düzeltmek; kriterleri yumuşatmak | Kanıt tablosuyla biter; ship etmez, merge etmez, spec taşımaz |
| **İnsan** | Kapılar | elle düzenleme ya da `scripts/gate` | Karar vermek | — | "Roller üretir ve doğrular; insan karar verir" |

**Oturum kuralları** (RESMÎ — `docs/roles/README.md`):

1. Her yeni spec → taze oturum. Bağlam dosyalarda yaşar, sohbet geçmişinde değil.
2. Her inceleme → temiz bir Reviewer/QA oturumu; asla üretenin oturumunda.
3. Düzeltmeler Developer oturumunda yapılır; kanıtı Reviewer/QA oturumu yeniden denetler.
4. Tek oturumda şapka değişimi (Analyst → Developer) **duyurulur**, sessiz olmaz.
5. Devirler **dosyalar ve durum alanları** üzerinden yürür, sohbet üzerinden değil.
6. Strict'te rol ayrımı zorunludur. Lite'ta bağımsız inceleme oturumu/alt ajanı yine zorunludur; gerisi tek oturuma çökebilir.

**Rol üstlenme istemi** (strict modda ya da generic adaptörde her oturumun başında; birebir):

```
Your role: <Analyst|Developer|Reviewer|QA>. Read docs/roles/README.md and <role>.md.
Assume the role for <spec/feature>. Tell me in two sentences who you are and what you may NOT do.
Start only after my confirmation.
```

**Rol kapısı:** cevap rolün yasaklarını saymıyorsa (bir Reviewer "kod yazamam" demiyorsa) rol oturmamıştır; başlamadan önce yeniden üstlendir.

### 11.2 Claude Code'un `reviewer` alt ajanı

`.claude/agents/reviewer.md`, "üreten kendi işini doğrulamaz" kuralının araç düzeyindeki karşılığıdır (RESMÎ):

```yaml
---
name: reviewer
description: Independent, read-only code reviewer. Use for the REVIEW step of any workflow — reviews a change set against its spec. Must never write or modify files.
tools: Read, Grep, Glob, Bash
---
```

- **Araç listesinde Edit ve Write yoktur** — alt ajan dosya değiştiremez. Bash kalır, çünkü `./scripts/check` ve testleri çalıştırabilmelidir; Bash'i yazmak için kullanmaması (yönlendirme yok, `sed -i` yok, `git commit` yok) talimatla söylenir.
- **Dosyalardan inceler**: diff + spec + planın kriter ↔ test eşlemesi + docs. Üretenin sohbetine erişimi yoktur — tasarım gereği.
- Bulgular kanıt (dosya:satır) ve önerilen eylem ister; önem sırasına göre dizilir.
- "'Clean' is a valid verdict. Do not invent findings to appear useful."
- Son mesajı inceleme raporudur; devir satırıyla biter ve durur. Triyajı insan yapar.

`/review` komutu Claude Code'da işi bu alt ajana devreder ve bulguları yumuşatmadan geri getirir. GitHub Copilot'ta karşılığı `.github/agents/reviewer.agent.md` özel ajanıdır (düzenleme aracı verilmemiş). Cursor ve Codex'te böyle bir katman yoktur; bağımsızlık **usulen** sağlanır: yeni sohbet/oturum.

Yazarın videodaki canlı örneği bu ayrımın neden gerektiğini gösterir: spec'te "sağlık sorgusu 5 saniyede yanıtlanmazsa sayfa hata metnini gösterir" diyen bir kriter (AC-6) vardı; kodu yazan oturum işi "bitti" saydı; bağımsız inceleme "AC-6'nın 5 saniye sınırı kanıtsız" bulgusuyla döndü. "Kabul kriteri, analiz bile olmasına rağmen eksik kod yazmış. Olay da tam olarak bu." (RESMÎ — video, 44:51–47:57)

---

## 12. Ters giderse: `/recover` ve 13 kurtarma rampası

İşler ters gider: build kırılır, testler kırmızıya döner, plan kayar, gereksinim yolda değişir, bağlam bulanıklaşır. Rampalar döngünün alternatifi değildir — döngüye **güvenli dönüşlerdir**. Her rampa kendi koruma kurallarını taşır (test susturma yok, asgari dosya kapsamı, dönüşte kanıt). (RESMÎ — `prompts/recovery/README.md`)

Nasıl çalışır: ajan bir rampanın tetiklendiğine inanıyorsa **kodunu söyler** (ör. "R-07") ve senden o istemi çalıştırmanı ister; sen `/recover "<ne oldu>"` yazarsın ya da doğrudan `prompts/recovery/<dosya>.md` gövdesini verirsin. Rampayı sen onaylamadan hiçbir şey uygulanmaz. Çoğu rampanın çıkışı aynıdır: `./scripts/check` (full) yeşil, çıktı gösterilmiş — "a ramp exit is a gate" (rampa çıkışı bir kapıdır).

### 12.1 Özet tablo

| Kod | Belirti | Dosya | Çekirdek kural | Tipik tetiklendiği yer |
|---|---|---|---|---|
| R-01 | Derleme / çalışma zamanı hatası | `build-error.md` | Önce teşhis, sonra **tek** düzeltme; belirti susturma yok | BUILD (adım dışı hata ya da iki denemede geçmeyen hata); bug-fix DIAGNOSE |
| R-02 | Kırmızı test | `red-test.md` | Önce karar: kod mu, test mi, spec mi yanlış? Zayıflatma/silme/atlama yasak | BUILD |
| R-03 | Flaky (kararsız) test | `flaky-test.md` | Deterministik yap; skip/retry yok; kanıt: art arda 5 yeşil | BUILD |
| R-04 | Düzeltme regresyon yarattı | `regression.md` | Önce yeşile geri dön; sonra dar düzeltme + kalıcı regresyon testi | BUILD; bug-fix PROVE |
| R-05 | "Investigate" bulgusu | `unverified-finding.md` | Düzeltme yok — önce asgari yeniden üretme; olmuyorsa gerekçeli kapatma | Triyaj; bug-fix REPRODUCE |
| R-06 | Düzeltme turu sınırı aşıldı | `fix-loop-limit.md` | DUR; kök neden kodda mı, planda mı, spec'te mi? Yalnız analiz | Üçüncü düzeltme turundan sonra |
| R-07 | Plan sapması | `plan-drift.md` | Sapma listesi; onaysız değişiklikler geri alınır | BUILD; review "Plan conformance" |
| R-08 | Spec iş ortasında değişti | `spec-change.md` | **Önce** spec güncellenir → delta plan → onay; yeni yetenek yeni spec'tir | Gereksinim değişimi; ship'te kriter taşıma |
| R-09 | Bağlam sisi / oturum devri | `context-fog.md` | Durum dosyası + yeni oturum; kanıtsız "done" yok | Uzun build |
| R-10 | Belirsizlik / doküman–kod çelişkisi | `ambiguity.md` | **Asla** varsayma; maliyetli seçenekler → insan karar verir → karar doğruluk kaynağına yazılır | PLAN, BUILD; `/recover`'da eşleşme yoksa varsayılan |
| R-11 | Güvenli geri alma | `rollback.md` | `git revert`; geçmişi yeniden yazma / force push yok | Incident STABILIZE |
| R-12 | Performans hedefi tutmadı | `perf-miss.md` | Önce ölç, **tek** optimizasyon, aynı yöntemle yeniden ölç | Review "Performance"; refactor |
| R-13 | Ortam eksiği | `environment-gap.md` | Kuralın etrafından **asla** dolaşma; maliyetli seçenekler → insan karar verir → plan değişikliği | Bootstrap VERIFY; PLAN riskleri; BUILD girişi |

### 12.2 Her rampa: belirti → ne yapılır

**R-01 — Derleme / çalışma hatası.** *Belirti:* build ya da çalışma sırasında bir hata; ajan aynı hatayı iki denemede geçemedi ya da hata üzerinde çalıştığı adımın dışından geliyor. *Ne yapılır:* (1) teşhis — kök neden: hangi dosya, hangi varsayım, neden şimdi ortaya çıktı; (2) teşhisi açıkla; (3) **tek** düzeltme öner; (4) yalnız senin onayınla uygula. *Koruma:* belirtiyi susturmak yasak (try/catch'e gömme, test düzenleme, uyarıları kapatma); yalnız kök nedenle ilgili dosyalara dokunulur. *Çıkış:* `./scripts/check --fast` ile yinele, sonunda full yeşil.

**R-02 — Kırmızı test.** *Belirti:* bir ya da birkaç test kırmızı. *Ön kontrol:* aynı anda çok sayıda ilgisiz test kırmızıysa (zaman aşımı, bağlantı reddi) önce **ortamı** kontrol et — daemon'lar, konteynerler, portlar; çökmüş ortam kod hatası değildir. *Ne yapılır:* düzeltmeden önce gerekçeyle **karar ver** — hangisi yanlış?

| Seçenek | Sonuç |
|---|---|
| a) **Kod** yanlış (test doğru davranışı istiyor) | Kodu düzelt |
| b) **Test** yanlış (yanlış davranışı kodluyor) | Kanıtla; testi yalnız **insan onayıyla**, hangi kritere eşlendiğini göstererek değiştir |
| c) **Spec** muğlak/çelişkili | Dur; R-10 biçiminde getir |

*Koruma:* "sırf geçsin diye" yapılan hiçbir şey kabul edilmez.

**R-03 — Flaky test.** *İlk ayrım:* altyapı mı, test mi? Testlerin dışında başarısız olan iş (paket deposu zaman aşımı, kaybolan runner) altyapıdır: yalnız başarısız işleri yeniden çalıştır, nedeni PR'a (PR yoksa planın Triage bölümüne) yaz — bu rampa o değildir. Aynı commit'te önce kalıp sonra geçen test flaky'dir: "yeniden çalıştırma asla düzeltme ve asla kanıt değildir". *Ne yapılır:* kararsızlığın kaynağını bul (zaman, sıralama, paylaşılan durum, eşzamansız yarışlar, dış G/Ç, hâlâ süren animasyon) ve testi deterministik yap. *Koruma:* skip, retry döngüsü, keyfî `sleep` yasak. *Kanıt:* testin kendisi art arda **5 kez** yeşil (QA doğrular); sonra full yeşil.

**R-04 — Düzeltme regresyon yarattı.** *Belirti:* son değişiklik çalışan bir şeyi bozdu. *Ne yapılır:* (1) değişikliği **önce geri al**, yeşile dön, `./scripts/check` (full) ile teyit et; (2) neden regresyon yarattığını teşhis et, **daha dar** bir düzeltme öner; (3) bunu yakalayacak kalıcı bir regresyon testi ekle. *Koruma:* suite kırmızıyken "ileri doğru düzeltme" yok.

**R-05 — "Investigate" bulgusu** (sahibi: QA). *Belirti:* triyajda bir bulguya `investigate` dendi. *Ne yapılır:* **hiçbir şeyi düzeltme**; sorunu tetikleyen en küçük senaryoyu ya da başarısız testi üret. Yeniden üretme başarılıysa bulgu gerçektir: kırmızı testi yerinde bırak ve raporla; düzeltme normal kapılarla Developer'dan geçer. Dürüst çabadan sonra yeniden üretilemiyorsa gerekçesiyle ve ne denediğinle kapatmayı öner. *Koruma:* yeniden üretme QA oturumunda yapılır — "kodu yazan zihin 'yeniden üretemedim' demeye meyillidir".

**R-06 — Düzeltme turu sınırı.** *Belirti:* aynı işte üç düzeltme turu doldu, hâlâ gerçek bulgu çıkıyor. *Ne yapılır:* **kod yazmayı durdur**. Yalnız analiz: kök neden gerçekten kodda mı — yoksa planda mı (yanlış ayrıştırma) ya da spec'te mi (muğlak/çelişkili davranış)? Kanıtlı hüküm ve öneri: `continue / re-plan / re-spec`. Daha fazla koddan önce sen karar verirsin. *Koruma:* bu analiz sırasında kod da test düzenlemesi de yok. Şablonun kendi kayıtlarından gerçek bir örnek: bir spec dördüncü tura R-06 ile girdi; kök neden "plan, mini şablonu kullanan şeritleri envanterlememişti" çıktı (RESMÎ — `.anew-dev/done/0002-…`, Scorecard).

**R-07 — Plan sapması.** *Belirti:* ajan onaylı planın dışına çıktı ya da çıkması gerekiyor. *Ne yapılır:* (1) mevcut değişiklik kümesini planla karşılaştır; **sapma listesi** üret (dosya + neden); (2) her sapma için: gerekli miydi? Evetse plan değişikliği olarak önerilir — sen onaylarsın ve planın Amendments bölümüne `A-n` olarak adın ve tarihle yazılır. Hayırsa o değişiklik **geri alınır**. *Koruma:* geri alırken plan içi değişikliklere ve testlere dokunulmaz. "Planlar onayla değiştirilir, asla sessizce."

**R-08 — Spec iş ortasında değişti.** *Belirti:* iş sürerken gereksinim değişti; ya da ship kapısında bir kriter kanıtlanamıyor ve onu dışarı taşıyacaksın; ya da onaylanan tasarım sonradan değişti. *Önce ayır:* yeni bir **yetenek** değişiklik değildir, kendi spec'i olur. *Sıra sabittir:* (1) **önce spec'i güncelle** (yeni/değişen kriterler, kapsam notları); (2) **delta plan** üret: hangi adımlar yaşıyor, hangileri ölüyor, ne yeni, yapılmış işe etkisi; (3) onayı bekle, sonra devam et. *Koruma:* spec ve delta plan onaylanmadan yeni gereksinime karşı kod yok — "aksi hâlde spec doğruluk kaynağı olmaktan çıkar".

**R-09 — Bağlam sisi / oturum devri.** *Belirti:* oturum çok uzadı, çelişmeye ya da kaymaya başladı. *Ne yapılır:* (1) bir **durum dosyası** yaz: `specs/plans/<NNNN>-handoff.md` — kanıtıyla ne bitti, tam olarak ne sürüyor, sırada ne var, açık sorular, durumu doğrulama komutları; (2) taze oturumun okuması gereken dosyaları listele. Sonra bu oturumu kapatır, durum dosyasını okuyarak başlayan yeni bir oturum açarsın. *Koruma:* durum dosyasında kanıtsız hiçbir şey "done" diye yazılamaz — sonraki oturum bu dosyaya güvenecek. *Yaşam döngüsü:* yeni oturum işi devraldıktan sonra dosyayı **siler**; kalıcı olması gereken her şey önce plana taşınır.

**R-10 — Belirsizlik / doküman–kod çelişkisi.** *Belirti:* spec bir şeyi söylemiyor ya da docs ile kod çelişiyor. *Ne yapılır:* **varsayımla ilerleme**. Getir: (1) tam boşluk/çelişki, iki taraf da referanslı (dosya + bölüm); (2) seçenekler, her biri maliyetiyle; (3) öneri ve nedeni. Sen karar verdikten sonra karar **doğru doğruluk kaynağına yazılır** (docs ya da spec — hangisi sahibiyse), sonra kalınan yerden devam edilir. Karar kaydedilmeden kod yok.

**R-11 — Güvenli geri alma.** *Belirti:* bir ya da birkaç commit geri alınmalı. *Ne yapılır:* `git revert` — geçmişi yeniden yazmak ve force push yasak. Önce: tam olarak neyin geri alınacağı ve neyin ona bağlı olduğu listelenir; veri/şema göçü varsa bir **risk raporu** (göç geri alınabilir mi, o zamandan beri yazılan veriye ne olur, güvenli sıra ne?). Yalnız senin onayınla yürütülür. Sonra full yeşil + geriye ne kaldığına dair kısa not.

**R-12 — Performans hedefi tutmadı.** *Belirti:* bir hedef (ör. `p95 < 200ms`) ölçülen değerle tutmuyor. *Disiplin sabit:* (1) önce **ölç** — yeniden üretilebilir yöntem, sayılar ve nasıl elde edildiği; (2) baskın maliyeti sezgiyle değil kanıtla belirle; (3) **tek** optimizasyon öner; (4) tam aynı yöntemle yeniden ölç, önce/sonra göster. *Koruma:* spekülatif optimizasyon furyası yok; tur başına tek değişiklik.

**R-13 — Ortam eksiği.** *Belirti:* ortam bir ANEW kuralını ya da bir check adımını karşılayamıyor: karşılanmayan bir `requires` ön koşulu, eksik ya da çok eski bir araç, ajanın izin katmanının bir kuralın gerektirdiği eylemi reddetmesi, bu makinede çalışamayan bir profil. *Ne yapılır:* **dur, kuralın etrafından dolaşma**. Getir: (1) kural ya da adım (dosya + bölüm ya da `check.conf` satırı) ve kısıtı gösteren çıktı; (2) seçenekler, maliyetleriyle — ortamı düzelt (ne, kim) · o profili yalnız CI'da çalıştır (her kanıtı bir push'a mal olur) · adımı ya da ön koşulunu değiştir · reddedilen eylemi insan kendisi yapar (ajan tam komutu verir); (3) öneri. Karar plan değişikliği (`A-n`) olarak kaydedilir; henüz plan yoksa bootstrap raporuna ve kalıcı yerine (`docs/testing.md` ya da bir ADR). *Koruma:* geçmek için kuralı, adımı ya da ön koşulu asla zayıflatma, atlama, kapatma; boşluk açıkken kanıtı "var" diye raporlama.

R-13'ün hikâyesi öğreticidir: bir saha projesinde tam profilin geliştirici makinesinde çalışamadığı (konteyner çalışma zamanı çok eskiydi) BUILD'in sonuna kadar fark edilmedi; her tam kanıt bir push ve bir CI turuna mal oldu. Çözüm, ortamın **varsayılmayıp sorulması** oldu: `requires` satırları, doctor'ın profil hükmü ve bu rampa (RESMÎ — `CHANGELOG.md` v1.21, ANEW-0011).

### 12.3 Ortak kalıplar

| İlke | Hangi rampalarda |
|---|---|
| Önce teşhis/ölçüm, sonra **tek** değişiklik | R-01, R-12 |
| Kırmızıdayken ileri gitme; önce yeşile dön | R-04, R-11 |
| Susturma yasağı (assert zayıflatma, skip, retry, sleep, try/catch'e gömme) | R-01, R-02, R-03 |
| Varsayma; seçenek + maliyet + öneri getir, insan karar versin, karar dosyaya yazılsın | R-10, R-13, R-02(c) |
| Sessiz değişiklik yok: plan → `A-n`, spec → önce spec | R-07, R-08 |
| Kod yazmayı durdur, yalnız analiz | R-05, R-06 |

---

## 13. Baştan sona örnek senaryo

Bu bölümdeki proje, kişiler, iş kalemi anahtarları, tarihler, commit kimlikleri, süreler ve dosya içerikleri **tümüyle hayalîdir**; amaç akışı ve dosya biçimlerini göstermektir. Dosya parçaları repodaki şablonlara uyar. Sabit olan (repodan gelen) şeyler: komut adları, dosya yolları, alan etiketleri, `Next:` satırları ve betik çıktı kalıpları. Sohbet metinleri özetlenmiştir; ajan gerçekte daha uzun yazar ve seçtiğin dilde konuşur.

**Kurgu.** "Hayalî Kitaplık": küçük bir mahalle kütüphanesi için ödünç takip uygulaması. Tek geliştirici (kayıtlarda adı "Hayalî Geliştirici" diye geçer; gerçek bir kişi değildir), boş bir repo, lite mod. Komutlar Claude Code yazımıyla gösterilir; Cursor'da aynıdır, Copilot Chat'te `/komut`, Codex'te `$komut`'tur. Örnek stack olarak Node/TypeScript seçilmiştir — başka bir stack'te yalnız `check.conf` komutları ve dosya uzantıları değişir.

### 13.1 Kurulum

```bash
git clone <şablon adresi> hayali-kitaplik      # main = v1.26.1 (scripts/status ve scripts/gate dâhil)
                                               # LTS isteseydi: git clone --branch v1.24.1 … (o iki betik yok)
                                               # şablonu doğrudan klonladıysan uzak depoyu kendi repona çevir
                                               # (Use this template ile açılan repoyu klonladıysan gerekmez)
cd hayali-kitaplik
rm -r .anew-dev                                                # şablonun kendi kayıtları; senin değil
./scripts/init claude-code
```

```text
Installed: CLAUDE.md, .claude/ (commands, agents, hooks, settings).
Next: open Claude Code here and run /bootstrap
```

(Son iki satır `scripts/init`'in gerçek çıktı kalıbıdır.) Araçta:

```text
/bootstrap
```

Mülakattan birkaç an (temsili):

```text
Ajan  : Mülakat ve belgeler hangi dilde olsun? Önerim: ikisi de Türkçe.
İnsan : chat TR, docs TR.
Ajan  : Depoda yalnızca ANEW dosyaları var → greenfield.
Ajan  : İş kuralları taslağı:
          BR-1: Bir kitap aynı anda yalnızca bir üyede olabilir.
          BR-2: Ödünç süresi 14 gündür.
          BR-3: Gecikmiş kitabı olan üye yeni kitap alamaz.
        Önerim bu üçü; değiştirmek istediğin var mı?
İnsan : BR-3 şimdilik olmasın, diğerleri kabul.
Ajan  : Hassas alan önerim: yok ("None"). Para ya da kişisel veri işlenmiyor.
İnsan : Üye iletişim bilgisi tutacağız; "üye verisi" hassas alan olsun.
…
Ajan  : Çalışma modu önerim: lite (tek geliştirici, düşük risk).
İnsan : lite.
```

Bootstrap sonrası `AGENTS.md`'nin üst kısmı (temsili; "Invariant rules" bloğu ve tablo aynen kalır):

```markdown
# AGENTS.md — Project Rules

Hayalî Kitaplık: küçük bir kütüphane için ödünç takip uygulaması. TypeScript (Node 20), katmanlı tek uygulama.

## Operating mode

**Mode: lite** — every workflow honors its gates.
**Start work** with `/new-feature` in lite (it chains the segments and asks at each gate) or with
`/analyze` in strict (one segment per role). Segment commands always stop (`workflows/segments.md`).
**Language: chat=tr · docs=tr** — protocol fields stay English (`docs/conventions.md`).
```

Greenfield olduğu için `scripts/check.conf` planlanan adımları yorum olarak tutar (temsili):

```text
# Planlanan adımlar — yürüyen iskelet (spec 0001) etkinleştirir.
# requires unit: node -e "process.exit(+process.versions.node.split('.')[0] >= 20 ? 0 : 1)"
# lint [fast]: npm run lint
# unit [fast]: npm run test:unit
# integration: npm run test:integration
```

Rapor onaylanır, `chore/bootstrap` merge edilir, `./scripts/doctor` `0 fail` verir. İlk spec yürüyen iskelettir (`0001`): uygulama ayağa kalkar, bir sağlık sayfası gösterir, `check.conf` adımları gerçek olur. Aynı dört kapıdan geçer ve `specs/done/0001-yuruyen-iskelet.md` olarak teslim edilir. Buradan sonrası "sonradan özellik ekleme"dir.

### 13.2 Özellik: ödünç alma

```text
/new-feature "üye bir kitabı ödünç alabilsin"
```

**ANALYZE.** Ajan `specs/active/0002-odunc-alma.md` dosyasını yazar (temsili, kısaltılmış):

```markdown
# Spec 0002 — odunc-alma

- Status: Draft
- Mode: lite
- Plan: `specs/plans/0002-plan.md`
- Self-critique: pending

## Intent
Kütüphane görevlisi, rafta olan bir kitabı bir üyeye ödünç verebilmek istiyor. Başarı: ödünç
verilen kitap listede "ödünçte" görünür ve iade tarihi bellidir. Bilerek yapılmayan: rezervasyon,
gecikme cezası, e-posta bildirimi.

## Requirements
1. Görevli, rafta olan bir kitabı kayıtlı bir üyeye ödünç verir.
2. Ödünçteki kitap ikinci bir üyeye verilemez (BR-1).
3. İade tarihi ödünç gününden 14 gün sonradır (BR-2).

## User experience
- Flow: kitap listesi → kitap seç → üye seç → "Ödünç ver" → listede durum güncellenir.
- States: boş liste, yükleniyor, başarılı, kitap zaten ödünçte, üye bulunamadı, yetki yok.
- Design reference: none — the flow above is the design
- Accessibility: bütün adımlar klavyeyle tamamlanır; hata mesajı ekran okuyucuya duyurulur.

## Constraints & out of scope
Sensitive area: üye verisi
Out of scope: rezervasyon; ceza; bildirim.

## Acceptance criteria
- [ ] AC-1 — Rafta olan kitap, kayıtlı bir üyeye ödünç verilince durumu "ödünçte" olur.
- [ ] AC-2 — Ödünçteki kitap ikinci kez verilmek istenirse işlem reddedilir, durum değişmez.
- [ ] AC-3 — İade tarihi, ödünç gününden tam 14 gün sonraki gündür.
- [ ] AC-4 — Kayıtlı olmayan üye seçilirse "üye bulunamadı" mesajı görünür, kayıt oluşmaz.
- [ ] AC-5 — Hiç kitap yokken liste boş durum mesajını gösterir.
- [ ] AC-6 — Görevli rolü olmayan kullanıcı "Ödünç ver" işlemini yapamaz.
```

Öz-eleştiri ve **kapı 1** (temsili):

```text
Öz-eleştiri — bir geliştiricinin hâlâ soracağı iki şey:
  G-1: "14 gün sonra" takvim günü mü, iş günü mü? Önerim: takvim günü.
  G-2: Aynı üye aynı anda en çok kaç kitap alabilir? Önerim: bu spec'te sınır yok, kapsam dışına yazalım.
Yukarıdaki iki öneriyi kabul ediyor ve spec'i onaylıyor musun?
```

Geliştirici kabul eder → `Status: Approved`, `Self-critique: done`. (Hassas alan ilan edildiği için lite'ta bile netleştirme soruları ayrıca sorulmuştur.)

**PLAN.** Ajan `./scripts/doctor` çalıştırır, sonra `specs/plans/0002-plan.md`'yi yazar (temsili, kısaltılmış):

```markdown
# Plan 0002 — odunc-alma

- Spec: `specs/active/0002-odunc-alma.md`
- Status: Awaiting approval
- Approved by / on: —

## Files to change or add
- src/loans/loan.ts (yeni)
- src/loans/service.ts (yeni)
- src/web/loans-page.ts (yeni)
- tests/loans/borrow.test.ts (yeni)
- tests/loans/due-date.test.ts (yeni)

## Ordered steps
1. Ödünç kaydı modeli ve iade tarihi hesabı.
2. Ödünç verme servisi (BR-1 denetimi, yetki denetimi).
3. Sayfa ve durumlar.

## Risks & open questions
- Environment: profile fast: runnable · profile full: runnable (doctor). Karşılanmayan ön koşul yok.
- Tarih hesabında saat dilimi: önerim bütün tarihleri UTC gün olarak tutmak (docs/conventions.md, Data rules).

## Criterion ↔ test map
| Acceptance criterion | Proven by | Profile |
|---|---|---|
| AC-1 | `borrow.test::borrows_available_book` | fast |
| AC-2 | `borrow.test::rejects_book_on_loan` | fast |
| AC-3 | `due-date.test::due_in_14_days` | fast |
| AC-4 | `borrow.test::unknown_member` | fast |
| AC-5 | `loans-page.test::empty_state` | full |
| AC-6 | `borrow.test::requires_staff_role` | fast |
```

**Kapı 2.** Geliştirici planı okur ve onayı kaydeder — ya ajana "onaylıyorum" der (ajan satırı yazar; bu durumda satırın commit'lenmesi gerekir, yoksa `scripts/status` "the plan approval is not committed yet" notunu düşer ve `gate ship` reddeder) ya da terminalden:

```bash
./scripts/gate approve-plan 0002
```

```text
approve-plan 0002: plan approved (Hayalî Geliştirici, 2027-01-12) — specs/plans/0002-plan.md @7c1d9e2
```

Plan dosyasında artık: `- Status: Approved` ve `- Approved by / on: Hayalî Geliştirici, 2027-01-12`.

**BUILD.** Spec `In progress` olur; dal `feature/0002-odunc-alma`; commit'ler plan adımını taşır:

```text
feat(loans): loan model and due date [plan 0002/1]
feat(loans): borrow service with BR-1 check [plan 0002/2]
feat(web): loans page and states [plan 0002/3]
```

Sonunda (çıktı kalıbı gerçek, sayılar temsili):

```text
==> lint
<== lint (4 s)
==> unit
<== unit (11 s)
==> integration
<== integration (38 s)
CHECK GREEN (full, 3 steps, 53 s)
Next: INDEPENDENT REVIEW — fresh session / read-only reviewer
```

Plana yazılan kanıt satırı:

```markdown
## Build evidence
- CHECK GREEN (full, 3 steps, 53 s) @9f3c2ab
```

**REVIEW.** `reviewer` alt ajanı diff'i spec'e karşı inceler (Cursor/Codex'te: yeni sohbette `/review 0002`). Rapor (temsili):

```text
Review round 1 · fix rounds so far: 0

M-1 Medium — Tests — AC-3: 14. gün sınırı sınanmıyor; test yalnızca "gelecekte bir tarih" olduğunu doğruluyor
    Kanıt: tests/loans/due-date.test.ts:8-19 · Öneri: tam 14. günü ve 13./15. günü doğrula
L-2 Low — Maintainability — src/loans/service.ts:41 kullanılmayan parametre · Öneri: kaldır
I-3 Info — Performance — liste sayfası her açılışta bütün üyeleri yüklüyor; şimdilik veri küçük
    Öneri: sayfalama gerektiğinde ele alınsın

Next: TRIAGE — human (real / noise / defer / investigate); then Developer fix rounds, then VERIFY
```

**Kapı 3 — triyaj.** Geliştirici I-3'ü ertelemeye karar verir; önce backlog kaydını yazar (`specs/backlog.md`; `scripts/gate` yalnız plan dosyasını commit'ler, bu satırı ayrıca commit'lemek gerekir):

```markdown
- **B-1** — Liste sayfası bütün üyeleri yüklüyor — Source: spec 0002, review round 1 (src/web/loans-page.ts:22) — Severity: Info
  — Recommendation: sayfalama ekle — Deferred by: Hayalî Geliştirici, 2027-01-12, veri hacmi henüz küçük
```

Sonra kararı kaydeder:

```bash
./scripts/gate triage 0002 --review \
  --finding "M-1 Medium — AC-3 sınır testi eksik" real "" \
  --finding "L-2 Low — kullanılmayan parametre" real "" \
  --finding "I-3 Info — bütün üyeler yükleniyor" defer "B-1"
```

Planın `## Triage` bölümü:

```markdown
## Triage
### Review round 1 — Hayalî Geliştirici, 2027-01-12
| Finding | Verdict (real / noise / defer / investigate) | Note (fix commit, rationale, B-<n>, A-<n>) |
|---|---|---|
| M-1 Medium — AC-3 sınır testi eksik | real | fix-1 |
| L-2 Low — kullanılmayan parametre | real | fix-1 |
| I-3 Info — bütün üyeler yükleniyor | defer | B-1 |
```

(`fix-1` notları düzeltme turunda elle yazılır.)

**Düzeltme turu.** Bulgu başına bir commit:

```text
test(loans): due date boundary at day 14 [plan 0002/fix-1]
refactor(loans): drop unused parameter [plan 0002/fix-1]
```

Tur bitince tam check yeniden çalıştırılır ve plana **ikinci kanıt satırı** eklenir — kod değiştiği için ilk satır artık eskidir; eklenmezse `scripts/status` "evidence is older than the code" uyarısı verir ve `gate ship` reddeder:

```markdown
## Build evidence
- CHECK GREEN (full, 3 steps, 53 s) @9f3c2ab
- CHECK GREEN (full, 3 steps, 55 s) @4d1e7c0
```

Tur bir Medium bulgu içerdiği (ve iş hassas alanda olduğu) için düzeltme diff'i **yeniden incelenir**. İkinci inceleme temiz çıkar; geliştirici temiz turu kaydeder: `./scripts/gate triage 0002 --review` → plana satırsız `### Review round 2 — Hayalî Geliştirici, 2027-01-13` başlığı düşer.

**VERIFY.** Taze oturumda `/verify 0002`. İş hassas alanda olduğu için her kriter kasıtlı bir bozmayla sınanır (temsili):

```markdown
| Acceptance criterion | Evidence | Status |
|---|---|---|
| AC-1 | `borrow.test::borrows_available_book` — bozma: durum güncellemesi kaldırıldı → kırmızı | PASS |
| AC-2 | `borrow.test::rejects_book_on_loan` — bozma: BR-1 denetimi atlandı → kırmızı | PASS |
| AC-3 | `due-date.test::due_in_14_days`, `::day_13_and_15` — bozma: 14 → 13 → kırmızı | PASS |
| AC-4 | `borrow.test::unknown_member` — bozma: üye denetimi atlandı → kırmızı | PASS |
| AC-5 | `loans-page.test::empty_state` — bozma: boş durum mesajı kaldırıldı → kırmızı; S-1 agent-captured, judged by Hayalî Geliştirici at SHIP, 2027-01-13 | PASS |
| AC-6 | `borrow.test::requires_staff_role` — bozma: rol denetimi kaldırıldı → kırmızı | PASS |

Tam yeşil: CHECK GREEN (full, 3 steps, 55 s) @4d1e7c0 — plandaki Build evidence satırından alıntı; o commit'ten sonra yalnız specs/ değişti
Next: SHIP — human (DoD, tick the proven criteria, move spec to specs/done/ with Status: Shipped in the PR, merge; …)
```

**Kapı 4 — ship.** Geliştirici tabloyu ve ekran görüntüsü galerisini inceler, scorecard'ı doldurur. VERIFY temiz çıktığı için dosyaya hiçbir şey yazılmamıştır; `scripts/status` hâlâ `VERIFY` gösterir. Bu yüzden önce temiz VERIFY turunu kaydeder, sonra ship eder:

```bash
./scripts/gate triage 0002 --verify      # plana satırsız "### VERIFY round 1 — …" başlığı düşer; status artık SHIP der
./scripts/gate ship 0002
```

```text
ship 0002: shipped; spec moved to specs/done/0002-odunc-alma.md — specs/done/0002-odunc-alma.md @b8a4f10
```

Kriterler `[x]`, `Status: Shipped`, dosya `specs/done/`'da. PR açılır (şablon kapı kayıtlarını ister), CI `doctor --strict` + `check` çalıştırır, squash-merge edilir. LTS `1.24.x` kullanıyorsan `scripts/gate` yoktur: aynı düzenlemeleri elle yaparsın (kutuları işaretle, `Status: Shipped` yaz, dosyayı `git mv` ile taşı, planın `- Spec:` satırını düzelt).

### 13.3 Araya giren değişiklik isteği

Kütüphane, ödünç süresinin 21 güne çıkmasını ister (iş kalemi: `KIT-12`).

```text
/change "ödünç süresi 14 günden 21 güne çıksın KIT-12"
```

Triyaj (temsili): (a) sapma değil — 14 gün spec 0002/AC-3'te yazan, çalışan davranış; (b) bir kabul kriteri değişiyor → CHANGE; (c) iade tarihi hesabı ortak kod → yine CHANGE. Geliştirici hükmü onaylar. Teslim edilmiş spec 0002'ye **dokunulmaz**; yeni bir mini-spec açılır:

```markdown
# Spec 0003 — odunc-suresi-21-gun (mini)

- Status: Draft
- Mode: lite
- Plan: `specs/plans/0003-plan.md`
- Self-critique: pending
- Source: KIT-12
- Supersedes: 0002/AC-3

## Intent
Kütüphane ödünç süresini 14 günden 21 güne çıkarıyor; üyeler kitabı bitirmeye yetişemiyor.

## Changed behavior
- [ ] CB-1 — Yeni ödünçlerde iade tarihi, ödünç gününden tam 21 gün sonraki gündür.
- [ ] CB-2 — Ödünç verme ekranında gösterilen iade tarihi 21 günlük hesabı yansıtır.
- [ ] CB-3 — docs/domain.md'deki BR-2 "21 gün" olarak güncellenir.

## Preserved behavior
- [ ] PB-1 — Değişiklikten önce verilmiş ödünçlerin iade tarihi değişmez.
- [ ] PB-2 — Ödünçteki kitap ikinci kez verilemez (BR-1) — bugünkü gibi.

## Out of scope
Uzatma (süre yenileme); gecikme uyarısı metni.
```

Sonra sıkıştırılmış döngü: spec onayı → plan → **plan onayı (bu şeritte asla atlanmaz)** → build → dar review → triyaj → verify (`CB-*` ve `PB-*` için kanıt) → ship. Bu iş "üye verisi" alanına dokunmadığı için (yalnız tarih hesabı) spec'e `Sensitive area` yazılmaz. Yine de one-pass review **yapılmaz**: CB-1 bir sınır değeri kriteridir ("tam 21 gün") ve VERIFY'ın kodu kasıtlı bozmasını gerektirir; one-pass review'un ikinci koşulu ("hiçbir kriter kodun kasıtlı bozulmasını gerektirmiyor") tutmaz. İnceleyen oturum bunu dosyalardan kendisi görür, yalnız inceleme yapar; VERIFY ayrı oturumda gelir.

Karşı örnek — aynı gün gelen bir başka istek: "Ödünç ver düğmesinin yazısı 'Ödünç Ver' yerine 'Ödünç ver' olsun (`KIT-13`)". Triyaj: sapma değil; hiçbir kabul kriteri değişmiyor; tek yerde kullanılan bir etiket → **TRIVIAL**. Spec açılmaz; `trivial/odunc-ver-etiketi` gibi bir dalda tek dar commit, check yeşil, politika gereği bir PR ve bir reviewer. Değişiklik ikinci bir dosyaya uzansaydı ajan durup cetveli yeniden çalıştıracaktı.

### 13.4 Bir hata düzeltmesi

Bir görevli bildirir: iade edilen kitap listede hâlâ "ödünçte" görünüyor.

```text
/fix-bug "iade edilen kitap listede hâlâ 'ödünçte' görünüyor; beklenen: 'rafta'"
```

1. **REPORT + REPRODUCE.** Ajan asgari başarısız testi yazar ve kırmızı olduğunu gösterir:
   `tests/loans/return.test.ts::returned_book_is_available` — beklenen `available`, gerçekleşen `on_loan`.
2. **DIAGNOSE.** Kök neden: iade işlemi ödünç kaydını kapatıyor ama kitabın durum alanını güncellemiyor; liste durum alanını okuyor.
3. **FIX.** Dal `fix/KIT-14-iade-durumu`; kırmızı testi yeşile çeviren en küçük değişiklik.
4. **PROVE.** Test yeşil + `./scripts/check` (full) yeşil. Test kalıcı olarak suite'te kalır.
5. **REVIEW + triyaj.** Yeni oturumda dar inceleme; temiz.
6. **SHIP.** Raporu ve test adını gösteren PR. Spec dosyası açılmamıştır: PR şablonundaki "bug fix → report + reproduction test" satırı doldurulur.

Ya ajan teşhis sırasında "aslında iade edilen kitap bir gün 'kontrol bekliyor' durumunda kalmalı" derse? O artık bir bug fix değildir — davranış değişiyor; `/change` ile mini-spec'e gider.

### 13.5 Gerçek kayıt: şablonun kendi mini-spec'i ve planı

Reponun `.anew-dev/` klasöründe ANEW'in kendini geliştirirken tuttuğu sekiz spec ve plan durur. En kısası, `v1.26.1` düzeltmesini üreten iştir; bir backlog kaydının (B-8) mini-spec'e, oradan yama sürümüne dönüşmesini gösterir. Aşağıdaki parçalar **gerçek kayıttan kısaltılmıştır** (RESMÎ — `.anew-dev/done/0008-doctor-approval-comment.md`, `.anew-dev/plans/0008-plan.md`).

Sorun: `scripts/doctor` HTML yorumlarını satır satır ayıklıyordu. Plan şablonunun onay satırı bir sonraki satırda kapanan bir yorum açtığı için, hiç dokunulmamış satır "boş değil" okunuyor ve doctor planı onaylı sayıyordu.

```markdown
# Spec 0008 — doctor reads the untouched template approval line as not approved (mini)

- Status: Shipped
- Mode: lite (ANEW's own development)
- Plan: `.anew-dev/plans/0008-plan.md`
- Self-critique: done (no gaps: one line of doctor, the behavior named by B-8)
- Source: B-8 (`.anew-dev/backlog.md`; spec 0006, review round 1, Info-3)

## Changed behavior
- [x] CB-1 — A plan whose approval line is the template's untouched line (a comment that opens
  after `—` and closes on a later line), with its spec `In progress`, gets doctor's gate "build
  started without recorded plan approval" (WARN locally, FAIL under `--strict`).
- [x] CB-2 — A value followed by a comment that opens and does not close on that line
  (`- Approved by / on: Ada, 2026-10-16 <!-- …`) still reads approved.

## Preserved behavior
- [x] PB-1 — A recorded value, with or without a comment closed on the same line, reads approved;
  `—`, `-` and empty read not approved; the existing doctor scenarios stay green.
- [x] PB-2 — `lts/1.24` receives only this fix (cherry-pick `-x`, `.anew-dev/` hunks dropped, its
  own v1.24.2 CHANGELOG entry and `.anew-version`); its selftest and doctor --strict are green.

## Out of scope
Other comment handling in doctor; status and gate (already correct); any new rule.
```

Planın adımları ve kanıtı:

| Plan öğesi | Gerçek kayıtta ne yazıyor |
|---|---|
| Adım 1 — Reproduce `[plan 0008/1]` | Şablonun iki satırlı onay satırıyla bir selftest senaryosu; doctor bölümünü çalıştır ve **kırmızı olduğunu kaydet** |
| Adım 2 — Fix `[plan 0008/2]` | Tek satırlık `sed` değişikliği; kırmızı senaryo yeşile döner |
| Adım 3 — Release notes `[plan 0008/3]` | `CHANGELOG.md`, `.anew-version` |
| Adım 4 | Review (alt ajan, dar) → triyaj → VERIFY → `main`'e PR, squash-merge, etiket `v1.26.1` |
| Adım 5 — LTS | Aynı commit `lts/1.24` dalına `git cherry-pick -x` ile taşınır; `v1.24.2` etiketi |
| Build evidence | `Reproduction red @b32229e: doctor approval scenarios 8 passed, 1 failed (…)` · `selftest 496 passed, 0 failed @2876ae1 — local, Windows 10 Git Bash; doctor --strict 0 fail @2876ae1` |
| Triage | Tek tur; başlık `### Review round 1 (one-pass review + VERIFY) — …, 2026-11-16`. İki Info bulgu, ikisi de gerekçeli `noise` |

Bu kısa kayıttan okunacak dört şey:

1. **Önce kırmızı, sonra düzeltme** — ve "kırmızıydı" bilgisi commit kimliğiyle Build evidence'a yazılıyor.
2. **Korunan davranış kriterleri** (`PB-*`), küçük değişikliğin başka bir şeyi bozmadığının kanıtıdır.
3. **One-pass review** küçük, hassas alan dışı işte tek bağımsız oturumda inceleme + doğrulamayı birlikte yapıyor; triyaj başlığı bunu açıkça söylüyor.
4. **Defer çöpe atmak değildir:** B-8 bir incelemede ertelendi, sonra kendi mini-spec'iyle kapatıldı ve iki sürüm hattına birden çıktı.

Tam boy bir örnek için aynı klasördeki spec 0003'e bakılabilir (11 kriter, kanıt tablosu, scorecard). Oradaki gerçek bir kanıt satırı, "kasıtlı bozma" kaydının nasıl tutulduğunu gösterir (RESMÎ — `.anew-dev/done/0003-field-pilot-randevu.md`):

```markdown
| Criterion | Proof | Result |
|---|---|---|
| AC-3 | selftest "a memory drop alone does not fail it" (fake Darwin vm_stat); break: found=1 on a drop → 2 red | PASS |
```

"break: … → 2 red": kod şöyle bozuldu, iki test kırmızıya döndü — yani test gerçekten başarısız olabiliyor. Aynı spec'in scorecard'ı sayıları saklamaz: "Fix rounds | 1 (3 commits …)", "Review findings: real / noise / deferred | round 1: 6 / 1 / 0 …", "Regressions introduced | 0".

---

## 14. Tasarım kararları: ANEW-0001 … ANEW-0012

Şablonun "neden böyle?" sorularının cevabı `docs/decisions/anew/` altındaki on iki karar kaydındadır. Hepsi `Status: Accepted`; her biri bağlamı, kararı, faydaları **ve maliyetleri**, reddedilen alternatifleri ve kararı yeniden açtıracak sinyalleri yazar. Senin projende oldukları gibi dururlar; düzenlemezsin. (RESMÎ — `docs/decisions/anew/*.md`)

| Karar (özgün başlık) | Dosya (`docs/decisions/anew/…`) | Tek cümle | Cevapladığı soru |
|---|---|---|---|
| **ANEW-0001** — Rules live in the core; adapters only point | `ANEW-0001-thin-adapters.md` | Kurallar çekirdekte bir kez yaşar; adaptör yalnız işaret eder | Komut dosyaları neden bu kadar kısa? Dört araçta neden aynı davranış? |
| **ANEW-0002** — Segments always stop; the chainer flows only as far as the mode allows | `ANEW-0002-segments-always-stop.md` | Her aşama dosyaya yazılan bir devirde durur; zincirleyici modun izin verdiği kadar akar | Neden her aşamada duruyor? `/new-feature` strict'te neden reddediyor? |
| **ANEW-0003** — Change requests are triaged by the behavior test, not by apparent size | `ANEW-0003-change-request-triage.md` | İstekler görünen boyuta değil davranış testine göre ayrılır | "Küçücük bir değişiklik" için neden mini-spec? |
| **ANEW-0004** — Every rule is labeled Documented, Validated or Enforced | `ANEW-0004-enforcement-levels.md` | Her kural araç başına Documented / Validated / Enforced diye etiketlenir | Kullandığım araçta kurallar gerçekten zorlanıyor mu? |
| **ANEW-0005** — ANEW governs intent → merge; release and operations are out of scope | `ANEW-0005-scope-boundary.md` | ANEW niyetten merge'e kadar yönetir; release ve işletim dışarıda | Neden deploy, özellik bayrağı, izleme yok? |
| **ANEW-0006** — Evidence is referenced, not stored | `ANEW-0006-evidence-referenced-not-stored.md` | Kanıt işaret edilir; `evidence/` klasörü yoktur | Neden çıktılar dosyaya yazılmıyor? |
| **ANEW-0007** — Check leaves nothing running | `ANEW-0007-check-leaves-nothing-running.md` | Check arkasında çalışan hiçbir şey bırakmaz; kalıntı testiyle tanımlanır | Neden build daemon'ları kapalı, neden kalıntı testi var? |
| **ANEW-0008** — User experience lives in the spec | `ANEW-0008-ux-lives-in-the-spec.md` | Akış, durumlar ve tasarım bağlantısı spec'in zorunlu bölümüdür | Neden ayrı bir tasarım aşaması yok? |
| **ANEW-0009** — Two speeds, one contract | `ANEW-0009-two-speeds-one-contract.md` | `--fast` iç döngü içindir; yalnız tam yeşil kanıttır | `--fast` neden kanıt değil? |
| **ANEW-0010** — The template's decisions live in their own namespace | `ANEW-0010-template-decisions-namespace.md` | Şablonun kararları `docs/decisions/anew/`'da, projeninkiler `docs/decisions/`'da | Kendi ADR'lerim nereden numaralanır? |
| **ANEW-0011** — ANEW assumes no tool; it runs what the project declares | `ANEW-0011-tool-neutral.md` | ANEW hiçbir araç bilmez; projenin bildirdiği komutu çalıştırır | Neden Docker/Node adı geçmiyor? `requires` satırı ne? |
| **ANEW-0012** — An unprovable criterion is moved out, never waived | `ANEW-0012-descope-not-waive.md` | Kanıtlanamayan kriter taşınır, asla "istisna" yapılmaz | Kanıtlayamadığım bir kriter varsa ne yaparım? |

Her kararın gerekçesi, kısaca:

**ANEW-0001 (25.09.2026).** Yapay zekâ araçlarının bağlam yükleme, komut tanımlama ve kısıtlama yolları farklıdır ve birkaç ayda bir değişir; mühendislik kuralları ise yavaş değişir. Kuralı araç başına dosyalara yazmak aynı kuralın dört kopyası ve her güncellemede birbirinden uzaklaşması demektir. *Maliyeti:* adaptör dosyaları kuru okunur; tam davranışı görmek için işaretçiyi izlemek gerekir. Araca özgü zorlama araçlar arasında eşit değildir; aracın taşıyamadığını CI ve PR şablonu taşır.

**ANEW-0002 (25.09.2026; 28.10.2026'da one-pass review eklendi).** Tek bir "hepsini yap" komutu rolleri çökertir; "üreten kendi işini doğrulamaz" kuralı bir hatırlatma değil mekanik bir dikiş ister. *Faydası:* rol ayrımı ajanın belleğinin değil dosyaların özelliği olur; yeni bir oturum herhangi bir kapıdan devralabilir; doctor kapıları durum alanlarından doğrulayabilir. *Maliyeti:* öğrenilecek daha çok komut; strict'te bir özellik en az beş oturum.

**ANEW-0003 (25.09.2026).** Kurumsal işin çoğu ne yeni özellik ne bug'dır: var olan bir davranış değişmelidir. Her isteği tam akıştan geçirmek çok ağır; "sadece bir etiket" diye yönlendirmek ise ortak bileşenlerin spec'siz değişmesinin yoludur. Reddedilen alternatif — satır/dosya sayısına göre yönlendirme — "nesnel ama yanlış: riskli değişiklikler küçüktür".

**ANEW-0004 (05.10.2026).** Erken README en güçlü durumu genel durummuş gibi anlatıyordu ("bozulması imkânsız"); Cursor'daki bir okur kendisi için var olmayan korumalara inanırdı. *Karar:* gerçek düzeyin üstünde iddia yok; düzey düşükse onu neyin yükselteceği yazılır. *Maliyeti:* bazı hücreler pazarlamanın "Enforced" isteyeceği yerde "Documented" okunur.

**ANEW-0005 (05.10.2026).** Deploy, ortam terfisi, özellik bayrağı, gözlemlenebilirlik kuruluşların en çok ayrıştığı ve zaten olgun araçları olan alanlardır. ANEW onlara `scripts/check` ve CI üzerinden bağlanır; canlıdan döngüye dönen tek köprü incident akışıdır. *Maliyeti:* ANEW, merge edilenin çalışan şey olduğunu kanıtlamaz.

**ANEW-0006 (07.10.2026).** Bu şablondan kurulan projelerde ajanlar bir `evidence/` klasörünü kaydedilmiş çıktılarla — hatta reponun içinde reponun tam klonlarıyla — doldurmaya başladı. Disiplin doğruydu; saklama davranışı repoyu şişirdi. Reddedilen alternatif: `evidence/` için boyut sınırı ve arşiv betikleri — "tutulmaması gerekeni yönetmek için altyapı".

**ANEW-0007 (07.10.2026; sonradan veri ve ölçüm için revize).** "Bir insan günde ~20 kez build eder; bir ajan `./scripts/check`'i ~200 kez çalıştırır" — koşu başına kalan süreç birikir; yazar 32 GB'lık bir makinede 2,4 GB boş bellek ve boş sayfalarla düşen e2e testleri ölçtüğünü yazar. Çözüm bir araç listesi olamaz (çekirdek dilden bağımsız); bu yüzden tek kural ve tek test. *Maliyeti:* biraz daha yavaş build'ler (sıcak daemon yok).

**ANEW-0008 (07.10.2026).** Tek arayüz kuralı en sondaydı: VERIFY'da ekran görüntüsü kanıttır. Ama önceden yazılmış akış ve durumlar olmadan o görüntü hiçbir şeyle karşılaştırılmıyordu: ajan mutlu yolu gösteriyor; boş, hata ve yetkisiz durumlar yazılmamış, yapılmamış ve doğrulanmamış kalıyordu. *Sınırı:* ANEW görsel kaliteyi yargılayamaz; tasarlanan durumların var olduğunu ve davrandığını denetler.

**ANEW-0009 (16.10.2026; üç kez revize, her seferinde "Only full green is evidence — unchanged").** Yavaş adımlar içeren bir check'i her küçük düzeltmeden sonra tam çalıştırmak ("10 dakikalık bir check altı kez = bir saat bekleme") özelliğin baskın maliyeti olur; onaylı bir hızlı yol olmazsa ajan bir tane doğaçlar — yazılmamış ikinci bir sözleşme. Reddedilen alternatif: ayrı bir `check-fast` betiği (iki sözleşme olurdu).

**ANEW-0010 (19.10.2026).** Şablon kendi kararlarını projenin ADR'leriyle aynı klasöre ve numara aralığına yazıyordu; bir saha raporunda şablonun 0009 numaralı kararı projede başka bir kararla doluydu ve elle yeniden numaralanmak zorunda kaldı.

**ANEW-0011 (29.10.2026).** Bariz çözüm — doctor'a belirli bir konteyner çalışma zamanını ve sürümünü öğretmek — çekirdeği tek bir araca bağlardı. *Karar:* makinenin bir şeyi yapıp yapamayacağını bilmesi gereken yerde proje bir komut bildirir (`requires <step>: <command>`, çıkış 0 = karşılandı), ANEW onu çalıştırır. Karşılanmayan ön koşul adımı atlatmaz: "unmet is red". *Maliyeti:* doctor artık dalın `check.conf`'undaki kodu çalıştırır — güvenmediğin dalda doctor çalıştırmak check çalıştırmak gibidir.

**ANEW-0012 (29.10.2026).** Bir saha pilotunda bir kriter geliştiricinin makinesinde kanıtlanamadı ve spec hiçbir kuralın izin vermediği "bir istisnayla" teslim edildi. "Bir feragat yolu 'bitti'nin ikinci bir anlamı olurdu; hiç yol olmaması ise insanlara bir tane icat ettirir." Ayrıntı: Bölüm 10.6.

> **ÇELİŞKİLİ (küçük):** ANEW-0009'un "Consequences" bölümü "kanıt tam profili gösterir" kuralının yalnız Documented olduğunu söyler; `CHANGELOG.md` v1.14 ve `README.md`'deki tablo aynı kuralı Validated sayar (doctor uyarır). Karar metni ilk hâlinden kalmış görünüyor (TAHMİN).

---

## 15. Videodan notlar

Kaynak: "ANEW ile AI Native Yazılım Geliştirme Demosu — Lite Mod, Greenfield", 06.11.2026, 49:36. Otomatik altyazıdan çıkarılmıştır; zaman damgaları ±30 saniyedir; alıntılar birebir ses dökümü değil, tanıma hataları düzeltilmiş altyazıdır.

### 15.1 Videoda ne gösteriliyor?

| Zaman | Bölüm | Özet |
|---|---|---|
| 00:01 | Motivasyon | Yapay zekâ mesleği değiştirdi ama süreçler değişmedi (SOLID, INVEST, ISTQB yerinde). Asıl sorun kontrolü kaybetmek |
| 02:40 | Repo tanıtımı | Projenin "1.24 itibarıyla" kararlı sürüme geçtiği; mevcut projeye eklemek için araca repo adresini verip "entegre et" demenin yettiği |
| 03:42 | Şablondan yeni repo | **Use this template**; örnek proje basit bir izin takip sistemi |
| 06:19 | Klonlama | Araçtan bağımsızlık vurgusu; `git clone`, `code .` |
| 08:24 | Adaptör + `AGENTS.md` | Git Bash'te `scripts/init` (Claude Code, ardından Codex); `AGENTS.md`'nin sekiz maddesi tek tek |
| 12:33 | `/bootstrap` | "İlk hareket: yapay zekâya projeyi öğretmek"; bootstrap genel çatıyı öğrenir |
| 14:37–31:32 | Mülakat | Dil → ürün ve hedef → alan terimleri ve iş kuralları → hassas alanlar → stack → mimari → konvansiyonlar → test → bilinen tuzaklar → güvenlik → git + trivial değişiklik → mod (lite) |
| 31:32 | Bootstrap raporu | Varsayımlar ve altı açık karar; "check henüz hiçbir şeyi kanıtlamıyor, çünkü kod yok" |
| 35:34 | Commit ve merge | Bootstrap çıktısı commit'lenir, PR + squash merge |
| 37:37 | `/new-feature` — SPEC | Yürüyen iskelet spec'i `specs/active` altında, `Draft`; niyet, gereksinimler, kabul kriterleri, DoD, scorecard |
| 42:46 | PLAN | Onayla spec `Approved`; 93 satırlık plan; onayla plan `Approved` |
| 44:51 | BUILD + REVIEW | Build; bağımsız inceleme yedi bulguyla döner (ör. "AC-6'nın 5 saniye sınırı kanıtsız") |
| 47:57 | Kapanış | Düzeltme, verify ve ship **sözle anlatılır, ekranda gösterilmez** |

### 15.2 Yazarın tavsiyeleri

- Araca değil felsefeye bağlan: "Teknolojiler değişir. Önemli olan felsefeniz." (06:19)
- Önemli olan bu ürün değil, böyle bir döngüyü projene dâhil etmek. (05:48)
- Mülakattaki önerileri **oku** — özellikle alan terimleri ve iş kuralları ("burası en önemli kısım", 18:48) ile bootstrap raporundaki açık kararlar. Videoda hızlı geçilmesi yalnız süre yüzünden.
- Uymayan maddeyi numarasıyla değiştir, kalanını kabul et: "BR-5 şöyle olsun, diğerleri kabul"; "F1, F2, F3 kabul; F4'ü geç".
- Seçenekli soru gelmezse düz metinle cevap ver. (14:37)
- Niyeti kısa yaz; ayrıntıyı ajan sorularıyla çıkarır. (37:37)
- Hazır mimari/kural dokümanın varsa köke koyup mülakatta göster. (23:03)
- Kurulu olmayan araçları ajana kurdur. (20:53)
- Hassas alanları doğru belirle; QA'nın test yoğunluğunu bu belirler. (19:20)
- Test sayısını abartma: "Testlerin miktarı, yanlış yerde çağrılmaları sizi ciddi yavaşlatabilir." (25:08)
- Planı oku; plan hem kaliteyi hem token maliyetini etkiler. (42:46)
- Scorecard'ı kendi sürecini ölçüp iyileştirmek için kullan; süreçte kendi ortamına göre değişiklik yap. (37:37–42:46)

### 15.3 Yazarın uyarıları

- Süreçsiz yapay zekâ kullanımı, sektörün "bitmeyen proje" sorununu daha hızlı üretir. (00:01)
- "Yapay zekâ yapar, siz de kontrol edersiniz. Bu gerçekçi değil." (01:37)
- "Üreten akıl asla kendini denetleyemez." (01:37) — "Yapay zekâ size yaptım diyor ama kendi anladığı şeyi yaptığını söylüyor." (41:12)
- Build dakikalar sürer: stack'e ve modele göre 5–20 dakika. (44:51)
- Ajanın raporundaki not: tek kişi varsayıldı; ekip varsa strict daha uygun olabilir. (31:32)

### 15.4 Repo metninde olmayıp videoda söylenenler

Karşılaştırma `README.md`, `AGENTS.md`, `docs/commands.md`, `workflows/` ve `prompts/` ile yapıldı.

| Videoda | Repoda |
|---|---|
| Mevcut projeye ekleme: araca repo adresini verip "entegre et, gerekli dokümanları indir" demek (02:40) | Yalnız "dosyaları mevcut repoya kopyala" |
| Windows'ta Git Bash tercihi; klasörün adres çubuğuna `cmd` yazıp terminal açma (06:19, 08:24) | Kod yorumlarında Git Bash anılıyor; ayrı bir Windows talimatı yok |
| Sürecin dayanakları: SOLID, INVEST, ISTQB; bootstrap için PMI/PMP "kapsam yönetimi" benzetmesi (00:01, 12:33) | Bu adlar geçmiyor |
| Benimsenme: yazarın bildiği 10'dan fazla kuruluş; 10–15 yıllık eski projelerde de denendiği (02:40, 03:42) | `.anew-dev/done/0005-lts.md`: "Four to five organizations asked for ANEW training" |
| "Bundan sonra merge işlemlerini de sen yap, bana sorma" diye ajana yetki verilebileceği (35:34) | `docs/git.md`: ajan commit'lerini insan **kapı üzerinden** onaylar; merge yetkisi ayrıca anlatılmıyor |
| Somut sayılar: build 5–20 dk; örnek plan 93 satır; inceleme 7 bulgu | Planın ~150 satırı aşmaması gerektiği (`prompts/plan.md`) |
| Tamamlanmış analiz için "supersede" yöntemi (08:24) | `specs/TEMPLATE-mini.md`'deki `Supersedes:` alanı; `AGENTS.md` kural 7 yalnız "düzenlenmez" der |
| Gemini: "ben eklememişim" ama kullanılabilir (08:24) | Ayrı adaptör yok; yol `generic` adaptör |

### 15.5 Video ile repo arasındaki farklar

| Konu | Video | Repo (`v1.26.1`) | Etiket |
|---|---|---|---|
| Başlangıç yöntemi | **Use this template** düğmesi | "Bir etiketten başla, düğmeden değil (düğme `main`'i kopyalar)" | ÇELİŞKİLİ (küçük) |
| Sürüm | "1.24 itibarıyla kararlı" | `1.24.x` LTS hattı; `main` ise `v1.26.1` | Video 06.11.2026 tarihli; `v1.25` ve `v1.26` sonradan çıktı (TAHMİN) |
| `./scripts/doctor` | Hiç gösterilmiyor | Hızlı başlangıcın 4. adımı | — |
| `scripts/status`, `scripts/gate`, `scripts/residue` | Hiç gösterilmiyor; onaylar yalnız sohbetten veriliyor | Ayrıntılı tanımlı | `status` ve `gate` video tarihinde henüz yoktu (TAHMİN) |
| Düzeltme turu, verify, ship | Yalnız sözle | Ayrıntılı tanımlı | — |
| `/change`, `/fix-bug`, strict mod akışı | Gösterilmiyor | Ayrıntılı tanımlı | — |

Videodaki kişisel/ortama özgü ayrıntılar (kullanılan model adı, yazarın yerel klasör adları) bu belgeye alınmadı; otomatik altyazıdan doğrulanamıyor ve şablonu öğrenmek için gerekli değil.

---

## 16. Sürüm tarihçesi ve yükseltme

### 16.1 Sürüm hatları

| Hat | Durum (17.11.2026) | Politika |
|---|---|---|
| **LTS `1.24.x`** | En yenisi `v1.24.2` (`lts/1.24` dalı) | Yalnız düzeltme: belgelendiği gibi davranmayan betik, başka bir dokümanla çelişen doküman, kırık referans, başarısız olamayan selftest, bir betik ya da kuraldaki güvenlik zayıflığı. "Yeni kural yok, yeni davranış yok, yeni adım yok." Bir sonraki LTS duyurulana kadar ve her hâlükârda **04.05.2027**'ye kadar destekli |
| **Current (`main`)** | `v1.26.1` | Yeni işler burada çıkar (`v1.25`, `v1.26` …). LTS değildir. GitHub'ın "Latest" sürümü budur |

(RESMÎ — `README.md` "Versions and support", `CHANGELOG.md`)

### 16.2 Tarihçe özeti

`CHANGELOG.md` sürüm tarihi vermez; aşağıdaki tarihler karar kayıtlarının `Date:` satırlarından ve `.anew-dev/` kayıtlarındaki onay tarihlerinden türetilmiştir (TAHMİN). `v1.1` ve `v1.2` başlıkları CHANGELOG'da yoktur; v1.0 ile v1.3 arasındaki iki girdi numarasızdır.

| Sürüm | Ne getirdi | Yaklaşık tarih |
|---|---|---|
| v1.0 | Çekirdek; `scripts/check`, `doctor`, `init`; Claude Code, Copilot, Cursor, generic adaptörleri; R-01…R-12 | Eylül 2026 |
| (numarasız) | Segmentler ve zincirleyici: `workflows/segments.md`, `/new-feature`, `doctor --strict` | Eylül 2026 |
| (numarasız) | Değişiklik isteği şeridi: `workflows/change-request.md`, `specs/TEMPLATE-mini.md`, `/change` | Eylül 2026 |
| v1.3 | "ANEW kendine ANEW uygular": Documented/Validated/Enforced tablosu; `specs/done/` değişmezliği doctor'da; adaptör eşliği | ~05.10.2026 |
| v1.4 | Kanıt saklanmaz, işaret edilir | ~07.10.2026 |
| v1.5 | Check kalıntı bırakmaz; kalıntı testinin tanımı | ~07.10.2026 |
| v1.6 | Spec'e zorunlu "User experience" bölümü | ~07.10.2026 |
| v1.6.1 | Düzeltme: `check.conf.example`'daki örnek değişti (testleri sıfıra düşüren bayrak örneği kaldırıldı); `.evidence/` klasörü de kanıt klasörü sayılır | Ekim 2026 |
| v1.7 | İki hız: `scripts/check --fast`, `[fast]` etiketi | ~16.10.2026 |
| v1.8 | `scripts/selftest` | Ekim 2026 |
| v1.9 | `scripts/residue` | Ekim 2026 |
| v1.9.1 | README'den "Origin" bölümü çıkarıldı; çekirdekte değişiklik yok | Ekim 2026 |
| v1.10 | `docs/commands.md` | Ekim 2026 |
| v1.11 | Codex adaptörü: `./scripts/init codex`, `$analyze` | Ekim 2026 |
| v1.12 | Check adım sürelerini basar | Ekim 2026 |
| v1.13 | Çakışmasız yükseltme: `.anew-version`, `docs/decisions/anew/`, "How to upgrade" | ~19.10.2026 |
| v1.14 | doctor, `--fast` çıktısının kanıt gösterilmesini yakalar | Ekim 2026 |
| v1.15 | Prompt'lar rollerle ve test kurallarıyla hizalandı; review'a "Plan conformance" boyutu; kriter ↔ test eşlemesine `Profile` sütunu | Ekim 2026 |
| v1.16 | Boyut sinyali (~8–10 kriter); "veri de sayılır"; tam yeşil bir kez çalışır ve alıntılanır; düzeltme turu sayımı (`[plan NNNN/fix-k]`) | ~21.10.2026 |
| v1.17 | Kalıntı testi çekirdek iş parçacıklarını (`[kworker/…]`) kalıntı saymaz | Ekim 2026 |
| v1.18 | `defer` + `specs/backlog.md`; önem dereceleri; hassas alanlar; plan değişiklikleri (`A-n`); ~150 satır plan sinyali; yalnız adı verilen yolları commit'leme | ~27.10.2026 |
| v1.19 | Deterministik mod; Known traps; one-pass review | ~28.10.2026 |
| v1.20 | Test katmanları; e2e isteğe bağlı | Ekim 2026 |
| v1.21 | `requires` ön koşulları; R-13; ANEW-0011 | ~29.10.2026 |
| v1.22 | "Taşı, feragat etme" (ANEW-0012); planda `## Triage`; `Self-critique:` alanı; kapı mesajı başına tek karar | ~29–30.10.2026 |
| v1.22.1 | "Bitti" tanımı: değişen dosya listesi plana **onaylı değişiklikleriyle** uyar | Ekim 2026 sonu |
| v1.23 | Kalıntı testi ebeveyn zincirine bakar; planda `## Build evidence`; ekran görüntüsünü ajan çeker; `chore/bootstrap`; yürüyen iskelet; `.gitattributes` | ~30.10.2026 |
| v1.24 | Hassas alanda kriter başına bir bozma; "büyüyen listeler"; çıkış kodu kuralı; kriter ↔ test eşlemesi taraması | ~02.11.2026 |
| v1.24.1 | İlk LTS hattı ilan edildi | ~04.11.2026 |
| v1.25 | `scripts/status` | ~14–16.11.2026 |
| v1.26 | `scripts/gate` | ~16.11.2026 |
| v1.26.1 / v1.24.2 | doctor düzeltmesi: şablonun dokunulmamış onay satırı onay sayılmaz | ~16.11.2026 |

Kalıp: son iki sürüm (`status`, `gate`) kural değiştirmez; yalnızca zaten var olan kayıtların okunmasını ve yazılmasını kolaylaştırır (TAHMİN — CHANGELOG girdilerinin özeti).

### 16.3 Sahadan gelen kurallar

v1.12'den itibaren sürümlerin çoğu bir saha projesinde yaşanan somut bir olaydan doğmuştur (v1.15 gibi bir prompt gözden geçirmesi ya da v1.24.1 gibi bir politika duyurusu olanlar hariç). Bu, kuralların "neden"ini anlamanın en kısa yoludur. (RESMÎ — `CHANGELOG.md`, `.anew-dev/done/*`)

| Sahadaki olay | Çıkan kural |
|---|---|
| Tam profil geliştirici makinesinde çalışamıyordu; BUILD'in sonuna kadar kimse bilmedi | `requires` satırları, doctor'ın profil hükmü, R-13 — ortam varsayılmaz, plan onayında karara bağlanır |
| Bir kriter kanıtlanamadı, spec "istisnayla" teslim edildi | ANEW-0012: dışarı taşı, feragat etme |
| Lite'ta triyaj anında PR yoktu; karar yalnız sohbette kaldı | Planda `## Triage` bölümü |
| Tek bir "onaylıyorum" aynı anda iki farklı soruyu cevapladı | Kapı mesajı başına tek karar |
| Bir özellik (22 kriter, 4 düzeltme turu) bir iş gününden uzun sürdü | ~8–10 kriter sınırı; tam yeşil bir kez çalışır ve alıntılanır; 3 tur sınırı |
| Dört satırlık bir stil düzeltmesi saatler sürdü: iki hata yalnız gerçek tarayıcıda görünüyordu, animasyon testi kararsız yaptı | Deterministik mod; push öncesi dokunulan alanın testleri; Known traps; one-pass review |
| Windows'ta işletim sistemi servisleri ve paralel bir ajan oturumu "kalıntı" sayıldı; insan makineyi boşa alıp testi üç kez elle çalıştırdı | Kalıntı testi ebeveyn zincirine bakar; testi ajan çalıştırır |
| İnsan her arayüz ekran görüntüsünü kendisi çekmek zorunda kaldı | "Ajan çeker, insan bakar" |
| Hassas alanda VERIFY kodu bir spec için 49 kez bozdu (11 kriter) | Kriter başına bir bozma yeter |
| `&&` zincirindeki bir `grep`, check kırmızıyken commit'i geçirdi | Commit'i yalnız check'in **kendi** çıkış kodu kapılar |
| Planın kriter ↔ test eşlemesi var olmayan bir testi adlandırıyordu | doctor eşlemeyi tarar (uyarı) |
| Yükseltmede taban tahmin ediliyor, ADR numaraları çakışıyor, yerel betik ekleri "kopyala" ile kayboluyordu | `.anew-version`, `ANEW-` ad alanı, davranış listeleri |

Şablon, saha olayı olmayan şeyi eklememeyi bilinçli seçiyor: "Deliberately not done: anything without a field incident behind it." Greenfield bir pilotta ilk spec'in (yürüyen iskelet) yaklaşık 71 dakikada teslim edildiği de kayıtlıdır (`.anew-dev/done/0003-…`).

### 16.4 Yükseltme yolu

Yükseltme bir "migration" değildir; çekirdek Markdown ve birkaç betikten ibaret olduğu için **dosya düzenlemesidir**. (RESMÎ — `CHANGELOG.md`, "How to upgrade")

1. **Tabanını bul:** `.anew-version` dosyası (ya da `./scripts/doctor` çıktısındaki `ok    ANEW base version: …` satırı). Dosya yoksa `scripts/` klasörünün eşleştiği şablon etiketini bul ve elle yaz.
2. **Hattını seç:**
   - LTS içinde kalıyorsan: `lts/1.24` dalındaki `CHANGELOG.md`'yi oku, tabanının üstündeki `v1.24.n` girdilerini uygula.
   - Current'a geçiyorsan: taban `v1.24.1` sayılır; `main`'deki her girdiyi eskiden yeniye uygula; "also in v1.24.n" işaretli düzeltmeyi, tabanın onu zaten içeriyorsa atla.
3. **Tabanının üstündeki her girdinin "Upgrading" bölümünü eskiden yeniye oku.** v1.12'den itibaren her biri değişen betik için bir *davranış listesi*, değişen doküman için *tek satırlık niyet* ve tam diff bağlantısı (`/compare/vX...vY`) verir.
4. **Betikler:** hiç dokunmadığın betiği düz kopyala. Genişlettiğin betiğe davranış listesini elle uygula — "asla düz kopya değil; eklerini siler". Sonra `./scripts/selftest` çalıştır: kopyanın belgelenen davranıştan nerede saptığını söyler.
5. **Dokümanlar** (çevirdiğin ya da genişlettiğin): her niyeti kendi cümlelerinle uygula; yama uygulanmaz, gerek de yok.
6. **Kararlar:** yeni `docs/decisions/anew/ANEW-*.md` dosyalarını olduğu gibi al; kendi ADR'lerini yeniden numaralama.
7. **Yeni sürümü `.anew-version`'a yaz.**

Sürüme özgü dikkat noktaları (RESMÎ — ilgili CHANGELOG girdileri):

| Sürüm | Dikkat |
|---|---|
| v1.7, v1.12 | Yeşil satırın biçimi değişti (profil adı, sonra süre eklendi). Satırı ayrıştıran kendi aracın varsa güncelle |
| v1.13 | Şablonun kararları `docs/decisions/anew/`'ya taşındı; kendi aralığına kopyaladıysan bir kez taşı |
| v1.21 | `requires` artık anahtar sözcük. **Önce betikleri, sonra `check.conf`'u** güncelle. doctor artık proje komutlarını çalıştırır |
| v1.22 | Bir sonraki ship'ten önce kanıtlanmış kriterleri `[x]` işaretle; doctor yeni ship'te işaretsiz kriteri kapı sayar |
| v1.23 | Kalıntı testinin yorumu değişti (bellek artık yargılanmaz). `.gitattributes` LF varsayılanı için `git add --renormalize .` isteğe bağlıdır, büyük diff üretebilir |
| v1.24.1 | Şablon düğmesi `main`'i kopyalar; LTS isteyen etiketten klonlar |
| v1.26.1 / v1.24.2 | Dokunulmamış onay satırıyla `In progress`'e geçmiş bir spec artık doctor kapısına takılır. Yükseltmeden sonra yeni bir uyarı görmek doğru davranıştır |

---

## 17. Sık sorulanlar, sık hatalar, hızlı başvuru

### 17.1 Sık sorulanlar

**Hangi sürümle başlamalıyım?** Öğrenmek, eğitim vermek ya da kurum içinde yaymak istiyorsan LTS (`git clone --branch v1.24.1` ya da daha yeni bir `v1.24.x`). `scripts/status` ve `scripts/gate` yardımcılarını istiyorsan current (`main`). Süreç iki hatta da aynıdır; LTS'te kapı kayıtlarını elle yazarsın.

**Lite mı, strict mi?** Tek başınaysan ve iş düşük riskliyse lite. Roller farklı kişilerdeyse ya da sistem kritikse strict. Kararsızsan lite ile başla; `AGENTS.md`'deki `Mode:` satırını değiştirerek geçebilirsin. Lite "disiplinsiz" demek değildir: plan onayı, triyaj, ship ve bağımsız inceleme lite'ta da zorunludur.

**Türkçe çalışabilir miyim?** Evet. Bootstrap'te sohbet ve belge dilini Türkçe seç. Yalnız protokol alanlarını İngilizce bırak (`Status: Approved`, `Approved by / on:`, `Source:`, şablon başlıkları).

**Spec'i ben mi yazıyorum?** Hayır; ajan yazar, sen karar verirsin. Senin işin niyeti söylemek, netleştirme sorularını cevaplamak, öz-eleştiri boşluklarını ve spec'i onaylamak.

**Onayı sohbette verdim, yetmez mi?** Spec onayı için ajan `Status: Approved` yazar. Plan onayı için sayılan tek şey plan dosyasındaki dolu `Approved by / on` satırıdır; ajan bunu senin onayınla yazar ya da sen `scripts/gate approve-plan` ile yazarsın. Dosyada yoksa `/build` reddeder, CI düşer.

**`scripts/gate` kullanmak zorunda mıyım?** Hayır. İsteğe bağlı bir kolaylıktır; aynı kayıtlar elle de yazılır. LTS hattında zaten yoktur.

**`specs/backlog.md` yapılacak özellikler listem mi?** Hayır. Yalnız ertelenen bulguların, ship'te dışarı taşınan kriterlerin ve bootstrap'te ertelenen kararların kaydıdır. Yeni özellikler doğrudan `specs/active/`'te başlar. ANEW bir ürün yol haritası aracı sunmaz.

**Teslim ettiğim bir spec'te hata buldum; düzeltebilir miyim?** `specs/done/` düzenlenmez. Davranış yanlışsa `/fix-bug`; davranış değişecekse `/change` ile yeni bir mini-spec (`Supersedes:` ile eskisine atıf).

**Küçük bir yazım hatası için de bu kadar tören mi?** Hayır — ama kararı "küçük görünüyor" diye değil triyaj cetveliyle verirsin. Hiçbir kabul kriteri değişmiyor ve ortak koda dokunulmuyorsa TRIVIAL şerididir: spec yok, tek dar commit, bootstrap'te seçtiğin politika (varsayılan: bir PR ve bir reviewer).

**İnceleme "temiz" çıktı; şüphelenmeli miyim?** Hayır. "Clean" geçerli bir hükümdür; incelemeciye bulgu uydurmaması açıkça söylenir. Güvencen VERIFY'dır: testlerin gerçekten başarısız olabildiğini denetler.

**CI'ım yok. Kullanabilir miyim?** Evet. "Tam yeşil"in kaynağı yerel tam koşu olur (bootstrap raporu bunu sorar). Ama Validated satırların çoğu CI'a dayanır; CI olmadan kapıları `./scripts/doctor --strict`'i kendin çalıştırarak denetlersin.

**Windows'ta çalışır mı?** Betikler Git Bash altında çalışacak biçimde yazılmış ve şablonun kendi kayıtlarında "local, Windows 10 Git Bash" koşuları geçiyor. PowerShell/cmd'den doğrudan çalışmaz.

**Kullandığım araç listede yok.** `generic` adaptör: `AGENTS.md`'yi oturum başında yapıştır, `prompts/*.md` gövdelerini elle ver, incelemeyi yeni oturumda yap. Kapıları yine betikler ve CI tutar.

**`.anew-dev/` klasörünü silmeli miyim?** Kendi projende evet (şablon öyle söyler). Silmeden önce göz atmaya değer: doldurulmuş gerçek spec ve plan örneği yalnız oradadır.

**Mod özellik başına değişebilir mi?** README "proje başına — ya da özellik başına seç" der; spec'in `- Mode:` alanı oluşturulduğu andaki modu kaydeder. Bunun için ayrı bir komut yoktur; `AGENTS.md`'deki satırı değiştirirsin (TAHMİN — mekanizma README'de anlatılmıyor).

### 17.2 Sık yapılan hatalar

| Hata | Neden yanlış | Doğrusu |
|---|---|---|
| Bootstrap'i atlayıp doğrudan `/new-feature` | `Mode: unset` → zincirleyici durur; `check.conf` yok | Önce `/bootstrap` |
| Planı sohbette onaylayıp dosyaya yazmamak | `/build` ve doctor dosyayı okur | `Approved by / on: <ad>, <tarih>` satırı |
| `CHECK GREEN (fast, …)`'i kanıt göstermek | Yalnız tam yeşil kanıttır; doctor uyarır | `./scripts/check` (full) |
| `./scripts/check \| grep … && git commit` | Zincir `grep`'in çıkış kodunu alır; kırmızı check commit'lenir | `./scripts/check > check.log 2>&1 && git commit …` |
| `git add -A` / `git commit -a` | Aynı ağaçta başka bir oturum dosya yazmış olabilir | `git commit -- <yollar>` |
| Yeşile ulaşmak için testi gevşetmek/atlamak | Kural 5; her rampada yasak | R-02: kod mu, test mi, spec mi yanlış — önce karar |
| İncelemeyi üretenin oturumunda yapmak | Denetçi ikna olmuş başlar | Alt ajan ya da yeni sohbet/oturum |
| İnceleme bulgularını triyajsız düzeltmek | Triyaj insan kapısıdır | Önce `real / noise / defer / investigate` |
| `noise` deyip gerekçe yazmamak | Gürültü yazılı gerekçeyle reddedilir | Note sütununa gerekçe |
| Dördüncü düzeltme turuna girmek | Kök neden büyük olasılıkla kodda değil | R-06: analiz, sonra `continue / re-plan / re-spec` |
| Plan listesinde olmayan dosyaya sessizce dokunmak | Plan sapması; review bulgusu olur | R-07: sapma öner, `A-n` olarak onaylat |
| Onaylı planı ya da spec'i sessizce düzenlemek | `scripts/status` "onaydan sonra değişti" der | `A-n` satırı (aynı commit'te) ya da yeniden onay |
| Kanıtlanamayan kriteri silmek ya da "bu seferlik" geçmek | "Bitti"nin ikinci bir anlamı olur | Dışarı taşı: `~~AC-n …~~ → moved to B-<n> …` |
| `specs/done/` altındaki dosyayı düzenlemek | Kural 7; doctor kapı sayar | Yeni spec + `Supersedes:` |
| Check çıktısını/logu repoya kaydetmek, `evidence/` klasörü açmak | Kanıt işaretçidir | Plana tek satır: `CHECK GREEN (full, …) @<sha>` |
| `scripts/status`'ta `REVIEW`/`VERIFY`'ı "çalışmadı" sanmak | Temiz tur dosya yazmaz | Temiz turu kaydet: `### Review round 2 — <ad>, <tarih> (clean)` |
| `scripts/gate`'i dosyayı okumadan ya da ajana çalıştırtmak | Commit, senin karar verdiğinin kaydıdır | Oku, sonra kendin çalıştır |
| `./scripts/init cursor --force` | `--force` yalnız ilk argüman olarak tanınır | `./scripts/init --force cursor` |
| `doctor --strict`'i strict mod sanmak | İkisi bağımsız | `--strict` = kapı ihlalleri hata olsun (CI) |
| Refactor sırasında test düzenlemek ya da özellik eklemek | Test düzenlemesi = davranış değişti | Dur; özellikse ayrı spec |
| Protokol alanlarını çevirmek ("Durum: Onaylandı") | Betikler okuyamaz | `Status: Approved` |
| Yerelde gördüğün doctor kapı uyarısını önemsememek | CI'da `FAIL` | PR'dan önce `./scripts/doctor --strict` |
| Kalıntı testini spec'e kabul kriteri diye yazmak | BUILD'in görevidir | `check.conf` değişince ajan çalıştırır |

### 17.3 Hızlı başvuru: "şunu yapmak istiyorum → şu komut"

Komutlar Claude Code/Cursor yazımıyladır; Copilot Chat'te `/komut`, Codex'te `$komut`.

| Yapmak istediğim | Komut / betik |
|---|---|
| Adaptör kurmak | `./scripts/init <claude-code\|github-copilot\|cursor\|codex\|generic>` |
| Şablonu projeme uyarlamak | `/bootstrap` |
| Çalışma alanı sağlıklı mı görmek | `./scripts/doctor` |
| CI'ın göreceğini yerelde görmek | `./scripts/doctor --strict` |
| Hangi iş nerede, sıra kimde | `./scripts/status` |
| Yeni özellik (lite) | `/new-feature "kısa tanım"` |
| Yeni özellik (strict) / yalnız spec'e kadar gitmek | `/analyze "kısa tanım"` |
| Onaylı spec için plan | `/plan NNNN` |
| Onaylı planı uygulamak / düzeltme turu | `/build NNNN` |
| Bağımsız inceleme | `/review NNNN` (Cursor/Codex: yeni sohbette/oturumda) |
| Kriter ↔ kanıt tablosu | `/verify NNNN` |
| Var olan davranışı değiştirmek | `/change "<istek> <iş kalemi>"` |
| Bozuk davranışı düzeltmek | `/fix-bug "<ne bozuk; beklenen/gerçekleşen>"` |
| Davranışı değiştirmeden yapıyı düzeltmek | `/refactor "<neyi, neden>"` |
| Mimari kararı kaydetmek | `/adr "<karar sorusu>"` |
| Bir şey ters gitti | `/recover "<ne oldu>"` |
| Geliştirirken hızlı doğrulama | `./scripts/check --fast` |
| Kanıt niteliğinde doğrulama | `./scripts/check` |
| Check geride süreç bırakıyor mu | `./scripts/residue` ve `./scripts/residue --fast` |
| Spec'i onaylamak | Ajana onay ver, ya da `./scripts/gate approve-spec NNNN` |
| Planı onaylamak | Planda `Approved by / on: <ad>, <tarih>`, ya da `./scripts/gate approve-plan NNNN` |
| Triyajı kaydetmek | Planın `## Triage` bölümüne tur tablosu, ya da `./scripts/gate triage NNNN --review --finding "<metin>" <hüküm> "<not>"` |
| Temiz bir turu kaydetmek | `./scripts/gate triage NNNN --review` (ya da `--verify`) |
| Bir bulguyu ertelemek | `specs/backlog.md`'ye `B-<n>` kaydı + triyajda `defer "B-<n>"` |
| Ship etmek | DoD + kriterleri işaretle + spec'i `specs/done/`'a taşı, ya da `./scripts/gate ship NNNN`; sonra PR ve merge |
| Kanıtlanamayan kriteri taşımak | Satırda: `- [ ] ~~AC-n — …~~ → moved to B-<n> — <ad>, <tarih>, <neden>` |
| Plandan sapmam gerekiyor | Dur → R-07 → `A-n` |
| Gereksinim iş ortasında değişti | Dur → R-08 → önce spec, sonra delta plan |
| Oturum çok uzadı, karıştı | R-09 → `specs/plans/NNNN-handoff.md` → yeni oturum |
| Bu makinede bir adım çalışmıyor | R-13 → karar → `A-n` |
| Başka bir araç daha eklemek | `./scripts/init <diğer-araç>` |
| Şablonu yükseltmek | `.anew-version` → `CHANGELOG.md` "How to upgrade" |

Göreceğin sabit satırlar:

| Satır | Nerede |
|---|---|
| `Next: PLAN — Developer` | `/analyze` sonu |
| `Next: BUILD — Developer` | `/plan` sonu |
| `Next: INDEPENDENT REVIEW — fresh session / read-only reviewer` | `/build` sonu |
| `Next: TRIAGE — human (real / noise / defer / investigate); then Developer fix rounds, then VERIFY` | `/review` sonu |
| `Next: SHIP — human (…)` | `/verify` sonu |
| `Spec not approved — run ANALYZE or get approval first.` | `/plan` reddi |
| `Plan not approved — run PLAN and get the approval recorded first.` | `/build` reddi |
| `Environment differs from the plan — R-13.` | `/build` ortam farkı |
| `CHECK GREEN (full, <n> steps, <t> s)` / `CHECK FAILED (full) at step: <ad>` | `./scripts/check` |
| `RESIDUE CLEAN (full, 2 runs)` / `RESIDUE FOUND (…)` / `RESIDUE NOT MEASURED (…)` | `./scripts/residue` |
| `== result: N fail, M warn ==` | `./scripts/doctor` |

Dal ve commit kalıpları (RESMÎ — `docs/git.md`):

| Ne | Kalıp |
|---|---|
| Özellik ve CHANGE şeridi dalı | `feature/<spec-no>-<kısa-ad>` — "spec'siz dal yok" |
| Refactor dalı | `refactor/<spec-no>-<kısa-ad>` |
| Hata düzeltme dalı | `fix/<rapor-kimliği>-<kısa-ad>` |
| Incident dalı | `incident/<tarih>-<kısa-ad>` |
| Trivial değişiklik dalı | `trivial/<kısa-ad>` |
| Bootstrap dalı | `chore/bootstrap` |
| Plan adımı commit'i | `feat(catalog): paging endpoint [plan 0001/3]` |
| Düzeltme turu commit'i | `fix(catalog): empty page size [plan 0001/fix-2]` |
| Yasaklar | Varsayılan dala doğrudan commit; force push; paylaşılan dalda geçmişi yeniden yazma. Geri alma = `git revert` |
| PR | Şablon dolu, CI'da check yeşil, squash-merge |

---

## 18. Sınırlar ve dikkat

### 18.1 ANEW ne değildir?

| Sanılabilir | Gerçek | Kaynak |
|---|---|---|
| Bir framework ya da kütüphane | Markdown + birkaç kabuk betiği; kurulacak paket yok | `README.md` |
| Kod üreteci ya da proje iskeleti | Uygulama kodu, klasör yapısı, stack seçimi getirmez; bootstrap senin kararlarını dokümana döker | `README.md` |
| Bir yapay zekâ aracı ya da model | Var olan aracına bağlanır | `adapters/` |
| Deploy/release/işletim çözümü | Niyetten merge'e kadar. Merge edilenin canlıda çalışan şey olduğunu kanıtlamaz | ANEW-0005 |
| Ürün yol haritası / iş takip aracı | Backlog özellik listesi değildir; iş kalemleri kendi aracında durur, ANEW yalnız anahtarını (`Source:`) ister | `specs/backlog.md` |
| Tasarım kalitesi denetçisi | Tasarlanan durumların var olduğunu ve davrandığını denetler; doğru göründüğünü değil | ANEW-0008 |
| Kimlik/yetki denetimi | "Kim onayladı" yalnız Documented'tır; gerçek çözüm dal koruması + `CODEOWNERS` | `README.md` |
| Her kuralı her araçta zorlayan bir kafes | Zorlama düzeyi araca göre değişir; Cursor, Codex ve generic'te çoğu kuralı CI tutar | `README.md` kural gücü tablosu |
| Stack'e hazır ayar paketi | "Packs" katmanı yol haritasında; bu sürümde yok | `README.md` |
| Hataları önleyen bir garanti | Hatayı görünür kılan bir süreç. Şablonun kendi kayıtlarında düzeltme turlarının regresyon ürettiği ve bağımsız incelemenin yakaladığı yazıyor | `.anew-dev/done/*` scorecard'ları |

### 18.2 Hangi durumda ağır kaçar?

Aşağıdakiler bu belgeyi hazırlayanın değerlendirmesidir (TAHMİN); repoda yazan maliyetler ilgili karar kayıtlarının "Costs" bölümlerinden alınmıştır.

| Durum | Neden ağır | Ne yapılabilir |
|---|---|---|
| Tek seferlik betik, deneme, at-kullan prototip | Bootstrap mülakatı + her iş için spec/plan/inceleme, işin kendisinden uzun sürebilir | Kullanma; ya da yalnız fikri al (spec + kanıt alışkanlığı) |
| Çok sık, çok küçük değişiklikler | Her biri triyaj + en az bir commit töreni | TRIVIAL şeridi ve bootstrap'te seçilen trivial politikası bunun içindir; yine de ek yük vardır |
| Token/süre bütçesi dar | Her özellik birkaç ajan turu demek: spec, plan, build, bağımsız inceleme, verify; hassas alanda kriter başına kasıtlı bozma. Yazar build'in tek başına 5–20 dakika sürebildiğini söylüyor | Lite + one-pass review; hassas alanı yalnız gerçekten gerekli yere ilan et |
| CI'ı olmayan proje | Validated satırların çoğu CI'a dayanır | `doctor --strict`'i elle çalıştır; mümkünse basit bir CI kur |
| Hook/alt ajanı olmayan araç (Cursor, Codex, generic) | Bağımsız inceleme ve `specs/done/` koruması usule kalır | Disiplin + CI; yeni oturum açmayı atlama |
| POSIX kabuğu olmayan ortam | Betikler `sh` ister | Git Bash ya da WSL |
| Strict mod, küçük ekip | Bir özellik en az beş oturum (ANEW-0002'nin yazdığı maliyet) | Lite; ya da yalnız kritik işlerde strict |
| Sıcak build daemon'larına alışkın ekip | Kalıntı kuralı daemon'ları kapattırır; build'ler biraz yavaşlar (ANEW-0007'nin yazdığı maliyet) | Adoption'da bayrak değişiklikleri önerilir, dayatılmaz |
| Hızlı değişen şablon | `main` günler içinde birkaç sürüm atlayabiliyor | LTS etiketine sabitlen |

README'nin kendi cümlesi dengeyi özetler: "Tam süreci her projede işletmek gereksiz maliyettir; hiç işletmemek kontrolsüz risktir." Kapılar ağır gelirse önerilen yol felsefeyi çatallamak değil, modu `lite` yapmak ya da workflow dosyalarını projene göre düzenlemektir.

### 18.3 Bu belgenin sınırları

- Şablon bir projede **çalıştırılmadı**; "şöyle davranır" denen her şey repodaki belge ve betik metnine dayanır. Betik çıktılarının bir kısmı koddan türetilmiştir (yanlarında yazar).
- Video yalnız otomatik altyazıdan okundu; ekrandaki metin görülmedi.
- Araçların (Claude Code, Cursor, Copilot, Codex) komut, kural ve skill biçimleri sürümden sürüme değişir; adaptör dosyalarının bugünkü araç sürümünde sorunsuz çalıştığı denenmedi.
- Şablon hızlı değişiyor: repoda `v1.4`'ten `v1.26.1`'e yirmiden fazla sürüm etiketi var ve bunlar kabaca iki aya sığıyor (tarihler tahminîdir, bkz. 16.2). Bu belge `v1.26.1`'i anlatır; kullanmadan önce reponun `CHANGELOG.md`'sine bak.

### 18.4 Lisans

MIT (RESMÎ — `LICENSE`: "Copyright (c) 2026 Engin Demiroğ"). Şablonu kopyalayabilir, değiştirebilir, ticari projede kullanabilirsin; telif ve izin bildirimini kopyalarda korumak gerekir. Hukuki danışmanlık değildir; lisans metninin kendisini oku.

---

## 19. Açık noktalar ve çelişkiler

Repoda birbirini tutmayan ya da yazmayan şeyler bir arada:

| # | Konu | Durum | Etiket |
|---|---|---|---|
| 1 | İnsan kapısı sayısı | `README.md` "iki kontrol noktası" der (+ spec onayı her zaman sorulur); `docs/commands.md` ve `docs/roles/README.md` dört kapı sayar | ÇELİŞKİLİ (ifade) — bu belge dördü esas aldı |
| 2 | Review boyutu sayısı | `workflows/feature-development.md` "six dimensions"; `prompts/review.md` yedi boyut listeler | ÇELİŞKİLİ (küçük) |
| 3 | `scripts/selftest` neyi kapsar | `docs/commands.md` dört betik; betik başlığı ve `README.md` beş (gate dâhil) | ÇELİŞKİLİ (küçük) |
| 4 | `/adr` hangi araçta | `docs/decisions/README.md` "in Claude Code"; diğer her yer "bütün adaptörlerde" | ÇELİŞKİLİ (küçük) |
| 5 | Başlangıç yöntemi | README: etiketten başla; video: şablon düğmesi | ÇELİŞKİLİ (küçük) |
| 6 | "Kanıt tam profili gösterir" kuralının gücü | ANEW-0009: Documented; README tablosu ve CHANGELOG v1.14: Validated | ÇELİŞKİLİ (küçük) |
| 7 | Kapanan backlog kaydı | `specs/backlog.md`: sil; `.anew-dev/backlog.md`: "Taken into spec …" notuyla duruyor | ÇELİŞKİLİ (küçük) |
| 8 | `/new-feature` `unset` dalı | Cursor ve Copilot komut metni "paste prompts/bootstrap.md" der; oysa bu adaptörlerde `/bootstrap` komutu var | ÇELİŞKİLİ (küçük) |
| 9 | Windows'ta betikler nasıl çalıştırılır | Açık talimat yok; Git Bash kod yorumlarında ve videoda geçiyor | TAHMİN |
| 10 | Mevcut projeye kurarken çakışan dosyalar (`README.md`, `.gitignore`, CI dosyası, var olan `CLAUDE.md`) | Birleştirme talimatı yok; `init` yalnız "kept" deyip atlar | TAHMİN |
| 11 | Claude Code hook'u Windows'ta çalışır mı; `NotebookEdit` çağrılarını yakalar mı | Denenmedi; hook yalnız `file_path` alanına bakıyor | TAHMİN |
| 12 | Kanıt tablosunun `Status` sütununda `PASS` dışındaki değerler | Tanımlı değil | — |
| 13 | Incident postmortem'i ve bug-fix triyaj kaydı hangi dosyaya yazılır | Belirtilmemiş (bug-fix'te plan dosyası açılmıyor) | — |
| 14 | Planın `Status: Superseded` değeri ne zaman, kim tarafından verilir | Açıklanmıyor | — |
| 15 | `<work item>` biçimi | "ticket / issue / request id" deniyor; biçim serbest | — |
| 16 | Sürüm tarihleri | CHANGELOG tarih vermiyor; bu belgedeki tarihler karar ve kayıt tarihlerinden türetildi | TAHMİN |
| 17 | `v1.24.2`'nin içeriği | Yalnız `main` CHANGELOG'undaki "also in v1.24.2" notundan ve plan 0008'den biliniyor; `lts/1.24` dalının kendi CHANGELOG'u okunmadı | — |

---

## 20. Kaynakça

**Birincil kaynaklar**

- Repo: https://github.com/engindemirog/ai-native-engineering-workspace — incelenen: `main`, `v1.26.1`, commit `e51f246` (16.11.2026)
- Video: https://www.youtube.com/watch?v=29cVv3H2A1w — "ANEW ile AI Native Yazılım Geliştirme Demosu — Lite Mod, Greenfield", 06.11.2026, 49:36 (Türkçe otomatik altyazı)

**Repoda okunan dosyalar** (adres öneki: `https://github.com/engindemirog/ai-native-engineering-workspace/blob/main/`)

| Grup | Dosyalar |
|---|---|
| Kök | `README.md`, `AGENTS.md`, `CHANGELOG.md`, `LICENSE`, `.anew-version`, `.gitattributes`, `.gitignore` |
| Komut başvurusu ve kurallar | `docs/commands.md`, `docs/testing.md`, `docs/git.md`, `docs/conventions.md`, `docs/domain.md`, `docs/architecture.md`, `docs/security.md` |
| Roller | `docs/roles/README.md`, `analyst.md`, `developer.md`, `reviewer.md`, `qa.md` |
| Kararlar | `docs/decisions/README.md`, `docs/decisions/TEMPLATE.md`, `docs/decisions/anew/ANEW-0001-thin-adapters.md` … `ANEW-0012-descope-not-waive.md` |
| Süreçler | `workflows/README.md`, `bootstrap.md`, `feature-development.md`, `segments.md`, `change-request.md`, `bug-fix.md`, `refactor.md`, `incident.md` |
| Prompt'lar | `prompts/README.md`, `bootstrap.md`, `clarify.md`, `spec.md`, `plan.md`, `build.md`, `review.md`, `verify.md`, `adr.md` |
| Kurtarma rampaları | `prompts/recovery/README.md`, `build-error.md`, `red-test.md`, `flaky-test.md`, `regression.md`, `unverified-finding.md`, `fix-loop-limit.md`, `plan-drift.md`, `spec-change.md`, `context-fog.md`, `ambiguity.md`, `rollback.md`, `perf-miss.md`, `environment-gap.md` |
| Şablonlar | `specs/TEMPLATE.md`, `specs/TEMPLATE-mini.md`, `specs/plans/TEMPLATE.md`, `specs/backlog.md`, `specs/active/README.md`, `specs/done/README.md`, `specs/plans/README.md` |
| Betikler | `scripts/init`, `check`, `check.conf.example`, `doctor`, `status`, `gate`, `residue`, `selftest` |
| Adaptörler | `adapters/README.md`; `adapters/claude-code/` (`README.md`, `CLAUDE.md`, `.claude/settings.json`, `.claude/agents/reviewer.md`, `.claude/hooks/protect-shipped.sh`, `.claude/commands/*.md`); `adapters/github-copilot/` (`README.md`, `copilot-instructions.md`, `agents/reviewer.agent.md`, `instructions/specs-done.instructions.md`, `prompts/*.prompt.md`); `adapters/cursor/` (`README.md`, `rules/*.mdc`, `commands/*.md`); `adapters/codex/` (`README.md`, `skills/*/SKILL.md`, `skills/*/agents/openai.yaml`); `adapters/generic/README.md` |
| CI | `.github/workflows/check.yml`, `.github/pull_request_template.md` |
| Şablonun kendi kayıtları | `.anew-dev/README.md`, `.anew-dev/backlog.md`, `.anew-dev/done/0001-environment-prerequisites.md` … `0008-doctor-approval-comment.md`, `.anew-dev/plans/0001-plan.md` … `0008-plan.md` |

**İlgili bağlantılar**

- Sürüm etiketleri ve sürüm notları: https://github.com/engindemirog/ai-native-engineering-workspace/releases
- LTS dalı: https://github.com/engindemirog/ai-native-engineering-workspace/tree/lts/1.24
- İki sürüm arasındaki fark (yükseltirken): `https://github.com/engindemirog/ai-native-engineering-workspace/compare/vX...vY`

