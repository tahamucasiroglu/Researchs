# GitHub API

> Yazılma tarihi: 15 Ekim 2026 · Son doğrulama: 15 Ekim 2026 · Durum: aktif (Temmuz 2026'dan itibaren bazı "sosyal" uç noktalar kısıtlanıyor)

## Özet

GitHub iki resmî API sunar: **REST API** (`https://api.github.com`) ve **GraphQL API** (`https://api.github.com/graphql`). Herkese açık veriler kimliksiz okunabilir (saatte 60 istek); kimlikli istekte bu sınır saatte 5.000'e çıkar. Gerçek zamanlı bildirim için **webhook** vardır, ancak yalnızca yönettiğin (admin/sahip olduğun) repo/organizasyona veya uygulamanı kuran hesaplara kurulabilir. Başkasının reposunu takip etmek için yöntem **yoklama (polling)**: Events API, Releases API ve belgelenmemiş ama herkesin kullandığı **Atom feed'leri** (`releases.atom`, `<kullanici>.atom`). API kullanımı ücretsizdir; ücret yalnızca GitHub planları (Enterprise Cloud daha yüksek limit verir) ve Actions/Packages gibi hizmetlerde doğar. [RESMÎ]

## Erişim seviyeleri

| Seviye | Ne gerekir | Neler açılır | Ücret / limit |
|---|---|---|---|
| Herkese açık (kimliksiz) | Hiçbir şey | Herkese açık repo, kullanıcı, release, events okuma; Atom feed'leri | Ücretsiz; REST **60 istek/saat/IP** [RESMÎ]. GraphQL için token gerekir [3. TARAF — yaygın bilgi; bu çalışmada okunan limit sayfası kimliksiz GraphQL limiti vermiyor]. Stargazers/watchers listesi 15.10.2026'da kimliksiz `401` döndü (kendi testimiz) |
| Geliştirici hesabı (PAT / OAuth app) | GitHub hesabı + Personal Access Token (fine-grained önerilir) veya OAuth app | Hesabın erişebildiği her şey; özel repolar; Notifications API (yalnızca classic PAT) | Ücretsiz; **5.000 istek/saat** (kullanıcıya ait tüm token ve uygulamalar paylaşır) [RESMÎ] |
| GitHub App (kurulum) | App oluştur, hedef hesap/organizasyon uygulamayı **kurar** ve repoları seçer | İnce taneli izinler, merkezi webhook, kısa ömürlü installation token | Ücretsiz; 5.000/saat taban, repo ve kullanıcı sayısıyla artar, en fazla **12.500/saat** [RESMÎ] |
| İşletme / onay | GitHub Marketplace'te listelenmek için doğrulama; organizasyon sahibinin uygulamayı onaylaması | Marketplace webhook'u, ücretli plan satışı | Marketplace için uygulama başına 1 webhook [RESMÎ]. Takip için zorunlu değil |
| Ücretli / kurumsal | GitHub Enterprise Cloud (GHEC) | Daha yüksek limit, enterprise/business webhook'ları, audit log | GHEC'e ait App/OAuth: REST **15.000/saat**, GraphQL 10.000 puan/saat [RESMÎ]. Plan fiyatı ayrı |
| Resmî olmayan | Belgelenmemiş Atom URL'leri, HTML kazıma, GH Archive gibi 3. taraf arşivler | Release/commit/tag feed'leri, 30 günden eski olay geçmişi | Atom feed'leri GitHub'ın kendi sunucusunda ama REST belgesinde yok [3. TARAF]; HTML kazıma ToS riski taşır |

## Kimlik doğrulama

- **Başlıklar:** `Authorization: Bearer <TOKEN>`, `Accept: application/vnd.github+json`, `X-GitHub-Api-Version: 2026-03-10`. [RESMÎ]
- **API sürümleri:** Desteklenenler `2026-03-10` (bitiş tarihi belirlenmedi) ve `2022-11-28` (**10 Mart 2028**'e kadar). Başlık gönderilmezse varsayılan `2022-11-28`'dir. Eski sürüm, yenisi çıktıktan sonra 24 ay desteklenir; desteği biten sürüm `410 Gone` döndürür. [RESMÎ]
- **Fine-grained PAT:** Tek bir kaynak sahibine (kullanıcı veya organizasyon) bağlıdır, repo seçilebilir, ince izinler. `expires_in` 1–366 gün veya `none` (organizasyon ömür sınırı koyabilir). Hesap başına en fazla **50** fine-grained token. Eksikleri: aynı anda birden çok organizasyon, Packages, Checks API, kullanıcı projeleri, üye olmadığın public repolara katkı, outside/repository collaborator olduğun repolara katkı. [RESMÎ]
- **Classic PAT:** Kapsam (scope) tabanlıdır, erişebildiğin tüm repolara erişir. **Notifications API yalnızca classic PAT ile çalışır** (`notifications` veya `repo` scope). [RESMÎ]
- **Kullanılmayan token:** Bir yıl kullanılmayan personal access token'lar GitHub tarafından otomatik silinir. [RESMÎ — belge bu cümleyi classic token bölümünde veriyor; fine-grained için açıkça belirtmiyor]
- **GitHub App:** JWT (App private key) ile installation token alınır; token kısa ömürlüdür. Uygulama kullanıcıdan bağımsız da çalışabilir, kurulumu yapan kişi organizasyondan ayrılsa da kurulu kalır, koltuk (seat) tüketmez. [RESMÎ]
- **OAuth app:** Geniş scope'lar (ör. `repo` yazma da verir), token kullanıcı iptal edene kadar geçerli, limit ölçeklenmez. Yeni projede GitHub App önerilir. [RESMÎ]
- **OAuth app client ID + secret:** Yalnızca public veri için, uygulama başına 5.000/saat. [RESMÎ]

### Hangi durumda hangisi

| Durum | Önerilen |
|---|---|
| Kendi hesabından tek kişilik betik, public veri okuma | Fine-grained PAT (salt okuma) |
| Bildirimlerini (mention, review isteği) okumak | Classic PAT (`notifications` scope) — fine-grained desteklenmiyor |
| Kendi veya yönettiğin organizasyonun repolarında gerçek zamanlı olay | GitHub App (merkezi webhook) |
| Başka kullanıcıların uygulamanı kurması (çok kiracılı servis) | GitHub App |
| Başkasının public reposu (kurulum yok) | PAT + polling / Atom feed |

## Temel uç noktalar

Tam liste: [REST referansı](https://docs.github.com/en/rest) ve [GraphQL referansı](https://docs.github.com/en/graphql).

| Metot | Uç nokta | Ne yapar | Seviye | Not/limit |
|---|---|---|---|---|
| GET | `/users/{username}/events/public` | Kullanıcının herkese açık etkinlikleri | Kimliksiz/PAT | 30 gün, en fazla 300 olay; `ETag` + `X-Poll-Interval` [RESMÎ] |
| GET | `/users/{username}/received_events` | Kullanıcının izlediği repolar ve takip ettiği kullanıcılardan gelen etkinlikler | Kimliksiz/PAT | Kimliksizse yalnızca public olaylar; kullanıcının kendisi olarak doğrulanırsa özel olaylar da gelir. Aynı sınırlar [RESMÎ] |
| GET | `/repos/{owner}/{repo}/events` | Repo etkinlikleri (push, issue, PR, release, watch…) | Kimliksiz/PAT | Aynı sınırlar [RESMÎ] |
| GET | `/orgs/{org}/events` | Organizasyonun public etkinlikleri | Kimliksiz/PAT | Aynı sınırlar [RESMÎ] |
| GET | `/networks/{owner}/{repo}/events` | Repo ağının (fork'lar dahil) etkinlikleri | Kimliksiz/PAT | [RESMÎ] |
| GET | `/repos/{owner}/{repo}/releases` | Release listesi (tag'ler hariç) | Kimliksiz/PAT | `per_page` en fazla 100; draft'lar yalnızca push yetkilisine görünür [RESMÎ] |
| GET | `/repos/{owner}/{repo}/releases/latest` | Son tam release | Kimliksiz/PAT | Prerelease ve draft dönmez; sıralama `created_at`'e göre (`created_at` = release'in işaret ettiği commit'in tarihi; oluşturulma/yayımlanma zamanı değil — eski bir commit'e sonradan çıkarılan release "latest" olmayabilir, yeni release'leri kaçırmamak için listeyi de kontrol et) [RESMÎ] |
| GET | `/repos/{owner}/{repo}/tags` | Git tag'leri | Kimliksiz/PAT | Release'siz tag'ler için [RESMÎ] |
| GET | `/repos/{owner}/{repo}/stargazers` | Repoya yıldız verenler | **Admin/collaborator** (Temmuz 2026 sonrası) | `Accept: application/vnd.github.star+json` ile `starred_at` gelir [RESMÎ] |
| GET | `/users/{username}/starred` | Kullanıcının yıldızladığı repolar | Kimliksiz/PAT | `sort=created\|updated`; profil gizliyse boş [RESMÎ] |
| GET | `/repos/{owner}/{repo}/subscribers` | Repoyu izleyenler (watchers) | **Admin/collaborator** (Temmuz 2026 sonrası) | [RESMÎ] |
| GET | `/users/{username}/subscriptions` | Kullanıcının izlediği repolar | Kullanımdan kalkıyor | Geçiş döneminde boş yanıt, sonra kaldırılacak [RESMÎ] |
| GET | `/notifications` | Kendi bildirimlerin | Classic PAT | `participating=true` yalnızca dahil olduğun/mention; `If-Modified-Since` ile 304 limit yemez [RESMÎ] |
| GET | `/feeds` | Atom feed URL'lerini verir | Kimliksiz/PAT | Özel feed'ler yalnızca Basic Auth ile [RESMÎ] |
| GET | `/rate_limit` | Kalan limit | Hepsi | Limit tüketmez; başlıklar daha yetkilidir [RESMÎ] |
| POST | `/graphql` | Tek sorguda çok repo/kullanıcı verisi (ör. 50 reponun son release'i) | PAT/App | 5.000 puan/saat; `first/last` 1–100; sorgu başına en fazla 500.000 düğüm; 10 sn zaman aşımı [RESMÎ] |
| POST | `/repos/{owner}/{repo}/hooks` | Repo webhook'u oluşturur | Repo admin | Olay türü başına en fazla 20 webhook [RESMÎ] |

## Gerçek zamanlı / bildirim

- **Webhook (resmî, tek gerçek push yöntemi):** Repo (sahip/admin), organizasyon (yalnızca sahip), GitHub App (uygulama başına 1 otomatik webhook, kurulu olduğu tüm repolar), Marketplace, Sponsors türleri vardır. **Kullanıcı hesabına veya kullanıcıya özel olaylara (kişisel bildirim, mention) webhook kurulamaz** ve **yönetmediğin bir repoya webhook kurulamaz**. [RESMÎ]
  - Takip için önemli olaylar: `release` (published, released, prereleased, created, edited, deleted, unpublished), `star` (created, deleted), `watch`, `fork`, `push`, `issues`, `discussion` (public preview), `public`, `repository`. [RESMÎ]
  - Sunucun **10 saniye** içinde 2XX dönmeli; yoksa teslimat başarısız sayılır. Kaçan teslimatlar elle/API ile yeniden gönderilir (otomatik tekrar belgede belirtilmemiş). Payload üst sınırı 25 MB. Gizli anahtar (secret) ile imza doğrulanır, `GET /meta` ile GitHub IP'leri allowlist'e alınabilir. [RESMÎ]
- **Events API (polling):** Belge açıkça "gerçek zamanlı kullanım için tasarlanmadı" der; gecikme "günün saatine göre **30 saniye ile 6 saat** arası" [RESMÎ]. Ağustos 2025 changelog'u, payload sadeleştirmesiyle (7 Ekim 2025) olayların "neredeyse anında" görüneceğini duyurdu [RESMÎ — ama belge hâlâ 30 sn–6 saat diyor: **[ÇELİŞKİLİ]**]. Aynı değişiklikle (7 Ekim 2025'ten beri): **Discussion olayları** Events API'de sorgulanabiliyor; pull request payload'ları kısaltıldı; push olaylarından commit özetleri ve commit sayıları kalktı; `author_association` alanı PR, PR review, PR review comment, issue, issue comment, commit comment ve discussion olaylarından kaldırıldı. Kaldırılan alanlar ana REST API'de duruyor; ayrıntı gerekiyorsa olaydaki kimlik alanlarıyla (repo, PR/issue numarası, commit SHA) REST'ten ek sorgu yapılır. [RESMÎ] Yoklamada `ETag` gönder: değişiklik yoksa `304` döner ve **limit tüketmez**; `X-Poll-Interval` (15.10.2026 testinde 60 sn) değerine uy. [RESMÎ]
- **Atom feed'leri:**
  - Belgelenmiş: `GET /feeds` → global timeline, kullanıcı timeline'ı (URI şablonu), kendi public/özel timeline'ın, organizasyon timeline'ı, security advisories. Events ile aynı 30 günlük saklama süresine tabi (Ocak 2025 değişikliği). [RESMÎ]
  - Belgelenmemiş ama çalışan (15.10.2026'da `200 application/atom+xml` doğrulandı): `https://github.com/{owner}/{repo}/releases.atom`, `.../tags.atom`, `.../commits/{branch}.atom`, `https://github.com/{username}.atom`. Kimlik gerektirmez ve REST API kotasına (60/saat) sayılmaz; ancak kimliksiz github.com trafiği olduğu için GitHub'ın Mayıs 2025'te getirdiği, rakamları açıklanmayan kimliksiz istek sınırlarına tabidir [RESMÎ changelog genel ifade; Atom'a uygulanışı TAHMİN]. RSS okuyucularda yaygın kullanılır. Resmî referans sayfasında yer almaz, garanti yoktur. [3. TARAF]
- **WebSocket / streaming / WebSub:** Herkese açık bir streaming API'si veya WebSub hub'ı belgelerde yok. [RESMÎ — "belgede yok"]
- **GitHub Actions ile dolaylı bildirim:** Kendi reponda zamanlanmış (cron) workflow ile başka repoları yoklayıp sonuç üretmek mümkündür; `GITHUB_TOKEN` 1.000 istek/saat/repo. [RESMÎ limit; yöntem önerisi TAHMİN]

## Takip uygulaması için

| Takip edilecek olay | Mümkün mü | Yöntem | Seviye | Not |
|---|---|---|---|---|
| Kendi/yönettiğin repoda yeni release | Evet, anlık | Webhook `release` (published) | Repo admin / GitHub App | En güvenilir yol |
| Başkasının reposunda yeni release | Evet, gecikmeli | `releases.atom` veya `GET /releases/latest` polling (+ `ETag`) | Kimliksiz / PAT | Atom REST kotasına sayılmaz ama belgesizdir ve açıklanmayan kimliksiz istek sınırlarına tabidir [3. TARAF / TAHMİN]; çok repo için GraphQL toplu sorgu |
| Başkasının reposunda yeni commit/push | Evet, gecikmeli | `commits/{branch}.atom` veya `GET /repos/{o}/{r}/commits?since=` | Kimliksiz / PAT | Events API'de push payload'ı sadeleştirildi (commit özeti ve commit sayısı yok; ayrıntı için REST'ten ek sorgu) [RESMÎ] |
| Bir kullanıcının public etkinliği (repo açtı, yıldızladı, PR açtı) | Evet, gecikmeli | `GET /users/{u}/events/public` veya `{u}.atom` | Kimliksiz / PAT | 30 gün / 300 olay; 30 sn–6 saat gecikme [RESMÎ] |
| Kullanıcının yeni yıldızları | Evet | `GET /users/{u}/starred` (`star+json`, `sort=created`) | Kimliksiz / PAT | Profil gizliyse boş [RESMÎ] |
| Repoya kim yıldız verdi (başkasının reposu) | **Kısıtlı** (belgeye göre Temmuz 2026'da başladı; changelog kesin tarih vermiyor) | `stargazers` yalnızca admin/collaborator; sayı için repo nesnesindeki `stargazers_count` | — | Erişimi olmayan boş yanıt veya `403` alabilir [RESMÎ]; kendi reponda webhook `star` [RESMÎ] |
| Repoyu kimin izlediği / kullanıcının izlediği repolar | **Kısıtlı / kaldırılıyor** | — | — | `subscribers` admin/collaborator'a sınırlı (diğerleri boş yanıt veya `403`), `users/{u}/subscriptions` boş döner [RESMÎ] |
| Issue / discussion / yorum | Evet | Kendi repoda webhook; başkasınınkinde `GET /repos/{o}/{r}/issues?since=` polling; discussion'lar için `GET /repos/{o}/{r}/events` polling (Ekim 2025'ten beri Discussion olayları Events API'de) | PAT / App | Discussion webhook'ları public preview; Events payload'ları kısaltıldı, `author_association` yok — ayrıntı için REST'ten ek sorgu [RESMÎ] |
| Seni ilgilendiren mention / review isteği | Evet | `GET /notifications?participating=true` + `If-Modified-Since` | Classic PAT | Kullanıcı olayları için webhook yok [RESMÎ] |
| Canlı yayın | Yok | — | — | GitHub'da canlı yayın özelliği yok |
| Anahtar kelime filtreleme | Kısmen | Search API (`/search/issues`, `/search/repositories`, `/search/code`) + kendi filtren | PAT (`/search/code` için zorunlu) | Search API'nin ayrı, dakika bazlı limiti var: kimlikli **30 istek/dakika**, kimliksiz **10 istek/dakika**; `/search/code` kimlik ister ve **10 istek/dakika** ile sınırlı [RESMÎ, 15.10.2026'da doğrulandı] |
| Güvenlik açığı duyuruları | Evet | `GET /feeds` → security advisories, veya Global Advisories API | Kimliksiz / PAT | [RESMÎ] |

**Pratik mimari önerisi [TAHMİN]:** Kendi repoların için GitHub App + webhook; takip ettiğin dış repolar için `releases.atom` / `{kullanici}.atom` (REST kotasına sayılmaz ama makul aralıkla çekilmeli; kimliksiz istek sınırları açıklanmadı) ve yedek olarak REST/GraphQL polling (`ETag`, `X-Poll-Interval`'e uyarak). Filtreleme (ör. yalnızca stable release, yalnızca belirli etiketler) kendi tarafında yapılır.

## Hız sınırları ve fiyatlar

**Birincil limitler (REST)** [RESMÎ]

| Kimlik | Limit |
|---|---|
| Kimliksiz | 60 istek/saat/IP |
| Kullanıcı (PAT, kullanıcı adına app) | 5.000/saat (tüm token'lar paylaşır) |
| GHEC organizasyonuna ait App/OAuth (üye kullanıcı) | 15.000/saat |
| GitHub App installation | 5.000/saat taban; 20'yi aşan her repo ve her org kullanıcısı için +50; en fazla 12.500/saat (GHEC'te 15.000) |
| `GITHUB_TOKEN` (Actions) | 1.000/saat/repo (GHEC kaynakları için 15.000) |
| OAuth app client ID + secret (public veri) | 5.000/saat (GHEC: 15.000) |

**GraphQL:** 5.000 **puan**/saat/kullanıcı (GHEC App: 10.000); installation'da aynı ölçekleme, en fazla 12.500. Zaman aşımına uğrayan sorgular sonraki saatte ek puan düşer. [RESMÎ]

**İkincil limitler** [RESMÎ]
- En fazla 100 eşzamanlı istek (REST + GraphQL ortak).
- Dakikada 900 puan (REST) / 2.000 puan (GraphQL). REST `GET` = 1 puan, çoğu yazma = 5 puan.
- 60 sn gerçek zamanda 90 sn CPU (GraphQL en fazla 60 sn).
- İçerik oluşturma: dakikada 80, saatte 500 istek.
- OAuth token isteği: saatte 2.000.
- GitHub açıklamadan ek ikincil limit uygulayabilir; ikincil limit durumunu sorgulamanın yolu yoktur.

**Başlıklar:** `x-ratelimit-limit`, `-remaining`, `-used`, `-reset` (UTC epoch), `-resource`, `retry-after`. Limit aşımında `403`/`429`; `retry-after` varsa bekle, yoksa `reset`'e kadar veya en az 1 dakika bekle, üstel geri çekil. **Limitliyken istek göndermeye devam etmek entegrasyonun yasaklanmasına yol açabilir.** [RESMÎ]

**Fiyat:** API kullanımı ücretsiz; daha yüksek limit için GitHub Enterprise Cloud planı gerekir (plan fiyatları API belgesinde değil, fiyat sayfasında). [RESMÎ]

**Veri saklama:** Events API, Atom feed, `/timeline`, `/dashboard-feed` için sorgulanabilir pencere **30 Ocak 2025'ten itibaren 90 günden 30 güne** indirildi. GitHub, daha eski veri gerekiyorsa günlük/haftalık dışa aktarım önerir. [RESMÎ] (Görevde verilen "90 gün" bilgisi güncel değildir.)

## Resmî olmayan yollar ve riskler

- **Belgelenmemiş Atom feed'leri** (`releases.atom`, `tags.atom`, `commits/{branch}.atom`, `{kullanici}.atom`): GitHub'ın kendi sunucusundan gelir, kimlik istemez ve REST limitine sayılmaz [3. TARAF]. Ancak GitHub 8 Mayıs 2025'ten beri kimliksiz isteklere (HTTPS clone, kimliksiz REST, raw.githubusercontent.com) rakamını açıklamadığı yeni hız sınırları uyguluyor [RESMÎ]; kimliksiz github.com trafiği olan Atom feed'lerinin de bu tür sınırlara tabi olması beklenir [TAHMİN]. Risk: belgelenmediği için haber verilmeden değişebilir; feed'ler de 30 günlük saklama kuralından etkilenir [RESMÎ, `/feeds` için]. Saldırgan sıklıkta çekmek IP bazlı engellemeye yol açabilir [TAHMİN].
- **HTML kazıma** (stargazers/watchers sayfaları vb.): 30.06.2026 changelog'u `/stargazers`, `/stargazers/you_know` ve `/watchers` UI görünümlerinin de kısıtlanacağını duyurdu; kesin tarih ve kimin erişeceği belirtilmedi, erişimi olmayanlar boş yanıt veya `403` alabilir [RESMÎ]. 15.10.2026 kendi testimizde API kimliksiz `401` döndürdü. GitHub Kabul Edilebilir Kullanım Politikaları kazımayı belirli koşullara bağlar; kişisel veriyi spam/satış amaçlı toplamak yasaktır [3. TARAF — politika metni bu çalışmada ayrıca okunmadı]. KVKK/GDPR açısından kullanıcı profili verisi kişisel veridir.
- **GH Archive (gharchive.org)** gibi 3. taraf arşivler: Public olay akışını saatlik dosyalar olarak saklar; 30 gün sınırını aşan tarihsel analiz için kullanılır [3. TARAF]. Gerçek zamanlı değildir.
- **Birden çok token ile limit aşma:** Aynı kullanıcının token'ları limiti paylaşır; farklı hesaplar açıp limiti bölmek kötüye kullanım sayılabilir ve hesap askıya alınabilir [TAHMİN, ikincil limit belgesindeki "ban" uyarısına dayanır].

## SDK ve kütüphaneler

**Resmî (GitHub/Octokit)** [RESMÎ]
- **.NET:** [octokit.net](https://github.com/octokit/octokit.net) — NuGet `Octokit` (REST); ayrıca `Octokit.GraphQL` (octokit.graphql.net) [3. TARAF bilgi, NuGet adı bu çalışmada doğrulanmadı].
- **JavaScript/TypeScript:** octokit.js (`octokit`, `@octokit/rest`, `@octokit/webhooks`).
- **Ruby:** octokit.rb.
- **Terraform:** terraform-provider-github.

**Topluluk (resmî belgede listelenen)** [RESMÎ liste]
- **Python:** PyGithub, githubkit, gidgethub, ghapi, github3.py, agithub, octokit.py.
- **Go:** go-github.
- **Java:** GitHub API for Java (hub4j), JCabi GitHub API.
- **.NET:** Resmî listede 3. taraf .NET kütüphanesi yok; octokit.net kullanılır.

**Araçlar:** `gh` CLI (`gh api`, `gh api graphql`) hızlı deneme için idealdir [RESMÎ].

## Postman / OpenAPI / koleksiyonlar

- **OpenAPI:** [github/rest-api-description](https://github.com/github/rest-api-description) — MIT lisanslı resmî tanım. `descriptions/` OpenAPI 3.0 (kararlı), `descriptions-next/` OpenAPI 3.1 (main dalında kırıcı değişiklik olabilir). Her biri "bundled" (önerilen) ve "dereferenced" biçimde. Postman/Insomnia'ya içe aktarılabilir. [RESMÎ]
- **GraphQL şeması:** GraphQL Explorer ve indirilebilir public schema resmî belgede yer alır. [RESMÎ]
- **Postman:** Resmî OpenAPI deposu Postman'den söz etmiyor; Postman Public API Network'teki GitHub koleksiyonlarının resmîliği bu çalışmada doğrulanmadı [belgede yok].

## Depoda ilgili sayfalar

- [Bluesky API](../Sosyal-Medya/Bluesky.md) — açık protokol, firehose ile gerçek zamanlı akış karşılaştırması için.
- [Mastodon / Fediverse API](../Sosyal-Medya/Mastodon-Fediverse.md) — RSS/streaming tabanlı takip örneği.
- [Slack API](../Mesajlasma/Slack.md) — GitHub bildirimlerini kanala iletmek için.
- [Telegram API](../Mesajlasma/Telegram.md) — webhook'tan gelen olayları bota iletmek için.
- [CSharp-DotNet](../../Programlama/CSharp-DotNet/) — octokit.net ile örnek proje açılacaksa.

## Kaynaklar

Resmî:
- [Rate limits for the REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api) — birincil/ikincil limitler, başlıklar — (erişim: 15 Ekim 2026)
- [Rate limits and query limits for the GraphQL API](https://docs.github.com/en/graphql/overview/rate-limits-and-query-limits-for-the-graphql-api) — puan sistemi, düğüm sınırı — (erişim: 15 Ekim 2026)
- [REST API endpoints for events](https://docs.github.com/en/rest/activity/events) — Events API, 30 gün / 300 olay, gecikme, ETag — (erişim: 15 Ekim 2026)
- [REST API endpoints for feeds](https://docs.github.com/en/rest/activity/feeds) — Atom feed'leri — (erişim: 15 Ekim 2026)
- [REST API endpoints for notifications](https://docs.github.com/en/rest/activity/notifications) — bildirimler, yalnızca classic PAT — (erişim: 15 Ekim 2026)
- [REST API endpoints for starring](https://docs.github.com/en/rest/activity/starring) — yıldızlar ve Temmuz 2026 kısıtlaması — (erişim: 15 Ekim 2026)
- [REST API endpoints for watching](https://docs.github.com/en/rest/activity/watching) — izleyiciler, kullanımdan kalkan uç nokta — (erişim: 15 Ekim 2026)
- [REST API endpoints for releases](https://docs.github.com/en/rest/releases/releases) — release listeleme, latest — (erişim: 15 Ekim 2026)
- [API versions](https://docs.github.com/en/rest/about-the-rest-api/api-versions) — `2026-03-10` ve `2022-11-28` — (erişim: 15 Ekim 2026)
- [Types of webhooks](https://docs.github.com/en/webhooks/types-of-webhooks) — kim hangi webhook'u kurabilir — (erişim: 15 Ekim 2026)
- [Webhook events and payloads](https://docs.github.com/en/webhooks/webhook-events-and-payloads) — olay türleri ve eylemler — (erişim: 15 Ekim 2026)
- [Best practices for using webhooks](https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks) — 10 sn yanıt, secret, IP allowlist — (erişim: 15 Ekim 2026)
- [Deciding when to build a GitHub App](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/deciding-when-to-build-a-github-app) — GitHub App / OAuth app / PAT karşılaştırması — (erişim: 15 Ekim 2026)
- [Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) — fine-grained ve classic PAT — (erişim: 15 Ekim 2026)
- [Libraries for the REST API](https://docs.github.com/en/rest/using-the-rest-api/libraries-for-the-rest-api) — Octokit ve topluluk kütüphaneleri — (erişim: 15 Ekim 2026)
- [github/rest-api-description](https://github.com/github/rest-api-description) — resmî OpenAPI tanımı — (erişim: 15 Ekim 2026)
- [Changelog: Upcoming access restrictions to public API endpoints and UI views (30.06.2026)](https://github.blog/changelog/2026-06-30-upcoming-access-restrictions-to-public-api-endpoints-and-ui-views/) — stargazers/watchers kısıtlaması — (erişim: 15 Ekim 2026)
- [Changelog: Upcoming changes to GitHub Events API payloads (08.08.2025)](https://github.blog/changelog/2025-08-08-upcoming-changes-to-github-events-api-payloads/) — payload sadeleştirme (7 Ekim 2025), Discussion olayları, `author_association` kaldırıldı, gecikme iyileştirmesi — (erişim: 15 Ekim 2026)
- [Changelog: Updated rate limits for unauthenticated requests (08.05.2025)](https://github.blog/changelog/2025-05-08-updated-rate-limits-for-unauthenticated-requests/) — kimliksiz istekler için açıklanmayan yeni sınırlar — (erişim: 15 Ekim 2026)
- [REST API endpoints for search](https://docs.github.com/en/rest/search/search#rate-limit) — Search API dakika bazlı limitleri — (erişim: 15 Ekim 2026)
- [Changelog: Data retention for Events API, Atom feed… (08.11.2024)](https://github.blog/changelog/2024-11-08-upcoming-changes-to-data-retention-for-events-api-atom-feed-timeline-and-dashboard-feed-features/) — 90 günden 30 güne — (erişim: 15 Ekim 2026)

3. taraf:
- [GH Archive](https://www.gharchive.org/) — public GitHub olaylarının saatlik arşivi — (erişim: 15 Ekim 2026; site bu çalışmada açılmadı)

Not: Bu çalışmada web arama kotası dolduğu için `releases.atom` gibi belgelenmemiş feed'ler arama yerine doğrudan HTTP isteğiyle (15.10.2026) doğrulandı.
