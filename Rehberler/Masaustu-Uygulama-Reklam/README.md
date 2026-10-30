# Masaüstü uygulamada reklam ve ödüllü reklam

Windows masaüstü uygulaması ve yanında bir web sitesi/sunucusu olan bir ürünün reklam gösterip gösteremeyeceğini, kullanıcıya reklam izletip karşılığında uygulama içi kredi verip veremeyeceğini ve bunu reklam engelleyicilere (DNS süzgeci, hosts dosyası, eklenti) karşı güvenilir biçimde nasıl kuracağını inceleyen araştırma. Reklam ağlarının masaüstü politikaları (Google AdSense, AdMob, Ad Manager, Microsoft, Overwolf, Playwire, Unity, AppLovin, Ezoic, AppLixir…), ödüllü reklam ve sunucu tarafı doğrulama (SSV), ücretsiz plana aralıklı reklam, doğrudan reklam satışı ve hazır reklam sunucuları, uygulamayı tanıtmak için reklam API'leri, Türkiye/AB/ABD hukuku ve vergi (gerçek kişi, şahıs şirketi, sermaye şirketi), Türkiye şirketi mi yurt dışı şirketi mi (genç girişimci istisnası, ödeme altyapıları, ABD LLC / Estonya OÜ / BK Ltd, kontrol edilen yabancı kurum ve iş merkezi riski) ile gelir tahmini aralıkları. Okurun durumu farklı olabileceği için hukuk, vergi ve şirket bölümleri "Durum → Sonuç" tablolarıyla dallanır: Türkiye'de ya da yurt dışında yerleşik; gerçek kişi, şahıs ya da sermaye şirketi; 29 yaş altı ya da üstü; başka sigortası olmayan, öğrenci, başka işte 4/a çalışan, emekli, işsizlik ödeneği ya da yetim aylığı alan; pasaportu olan ya da olmayan.

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır; GitHub HTML'i işlemez)

> **Araştırma tarihi:** 30 Ekim 2026 (bütün kaynaklara bu tarihte erişildi; hiçbir reklam ağında hesap açılmadı, API'ye istek atılmadı). Reklam ağı politikaları, ülke listeleri, oranlar ve ücretler sık değişir; kullanmadan önce kaynakçadaki resmî sayfadan güncelini kontrol et. Gelir ve maliyet rakamları örnek ve tahmindir; mali müşavir tabanı gibi il grubuna bağlı tutarlar örnek 1. grup il içindir.
>
> **Uyarı:** Genel bilgi amaçlıdır; hukuk ve vergi bölümü danışmanlık değildir. Resmî kaynakta bulunamayan her bilgi sayfada "doğrulanamadı" diye işaretli; "(çıkarım)" yazanlar kaynağın değil yorumun ifadesidir. Somut durumda mali müşavire danışılmalıdır.

## İçindekiler

- [index.html](index.html) — Tek sayfa: §0 kısa cevap · §1 ağlar tablosu · §2 masaüstünde Google reklamı · §3 ödüllü reklamla kredi (kurallar, SSV, akış, sahte trafik) · §4 ücretsiz plana aralıklı reklam · §5 atlanamazlık ve engelleyiciler (tehdit/önlem tablosu) · §6 doğrudan reklam satışı · §7 uygulamayı tanıtmak için reklam · §8 genel mimari · §9 hukuk ve vergi · §10 Türkiye şirketi mi, yurt dışı şirketi mi (zorunlu olan, şirketsiz dönem, TR seçenekleri ve ödeme altyapıları, ABD/Estonya/BK, iş merkezi ve CFC riski, yaşa ve çalışma durumuna göre karar tablosu) · §11 gelir tahmini · §12 karar tablosu · §13 doğrulanamayanlar · §14 kaynakça.
- [arastirma.md](arastirma.md) — Yapay zekâ için saf Markdown: aynı araştırma başlık hiyerarşisi, tablolar ve her önemli iddiada kaynak + güven etiketiyle (RESMÎ / 3. TARAF / TAHMİN / ÇELİŞKİLİ); bir AI asistanına bağlam olarak verilip uygulamaya geçilebilir.

## Kısa sonuç

- Masaüstü uygulamanın içine Google'dan otomatik reklam yok: AdSense yazılım içini yasaklıyor, AdMob yalnız mobil, Microsoft'un Windows reklam ağı 1 Haziran 2020'de kapandı.
- Masaüstü uygulamaya açıkça izin veren belgeli ağlar Overwolf (yalnız kendi çatısında, dağıtım tekelliğiyle) ve Playwire ("Desktop Apps", trafik şartlı).
- Reklam izleyerek kredi: web sitesinde Google Ad Manager ödüllü reklamı + SSV; kredi yalnız ürünün kendi hizmetinde geçerli, devredilemez olmalı.
- Ödüllü reklam "atlanamaz" olamaz; doğru model "izlemeden ödül yok".
- DNS/hosts ile engellenemeyen tek yol, reklamın uygulamanın zaten muhtaç olduğu API alan adından sunulmasıdır (yalnız kendi ev / doğrudan satılan reklam).
- İstemci yalnız gösterir; ödülü ve sayımı sunucu verir.
- Reklam geliri için şirket şart değil; Türkiye'de yerleşik kişide düzenli gelirle vergi mükellefiyeti şart. Stripe Türkiye'de yok (Paddle/Polar/iyzico var); Türkiye'de yaşarken yurt dışı şirket vergiyi kaldırmaz (KVK m.3 iş merkezi, m.7 kontrol edilen yabancı kurum).

## İlgili konular

- [YouTube'da Oyun](../YouTube-Oyun/) — AdSense ödeme takvimi, ABD stopajı (W-8) ve GVK 20/B istisnası; reklam gelirinin oyun kanalı ve Playables tarafı.
- [Google Play'de reklamlı oyun](../Google-Play-Oyun/) — Mobil oyunda AdMob ile reklam geliri: hesap türü, kapalı test şartı, ödeme eşikleri ve 20/B; buradaki eCPM aralıkları ve geçiş reklamı kurallarının mobil karşılığı.
- [Şirket Kurma → Şirketsiz Ne Yapabilirsin?](../Sirket-Kurma/12-sirketsiz.html) — Şirket kurmadan yapılabilecekler, arızi kazanç ve 20/B; düzenli gelirde mükellefiyet.
- [Şirket Kurma → SGK, Bağ-Kur ve İşsizlik Maaşı](../Sirket-Kurma/02-sgk-bagkur.html) — Bağ-Kur'un kimleri kapsadığı (şahıs işletmesi sahibi, müdür olmasa da limited ortağı) ve çakışma kuralı: başka sigortası olmayan, başka işte 4/a çalışan, emekli ya da ödenek alan biri işletme açınca Bağ-Kur ve ödenek ne olur.
- [YouTube'da Oyun → Süreç ve engel raporu](../YouTube-Oyun/surec-ve-engeller.html) — Bağ-Kur durum tablosu (3.10.4): öğrenci ve yetim/ölüm aylığı alan için 4/b başlamasının sonuçları.
- [Şirket Kurma → Genç Girişimci ve Teşvikler](../Sirket-Kurma/07-genc-girisimci.html) — 29 yaş altı ilk kez mükellef olanlar için kazanç istisnası ve şartları.
- [Şirket Kurma → Şahıs mı, Limited mi?](../Sirket-Kurma/06-karsilastirma.html) — İstisna yoksa ya da kâr yükseldikçe şahıs işletmesi ile limited şirketin karşılaştırması.
- [Şirket Kurma → Yurt Dışı Şirketin Vergi Gerçeği](../Sirket-Kurma/09-yurtdisi-cerceve.html) — Türkiye'de yaşayan birinin yurt dışı şirketi: tam mükellefiyet, iş merkezi, kontrol edilen yabancı kurum.
- [Şirket Kurma → Ülke Ülke Seçenekler](../Sirket-Kurma/10-yurtdisi-ulkeler.html) — ABD LLC, Estonya e-Residency, BK Ltd ve BAE için kuruluş, yıllık gider ve banka şartları.
- [Şirket Kurma → Ödeme Altyapıları](../Sirket-Kurma/11-odeme-altyapilari.html) — Stripe'ın Türkiye'de olmadığı durumda Paddle, Lemon Squeezy, iyzico, PayTR ile tahsilat.
- [İşsizlik → Ödenek Alırken Para Kazanmak](../Issizlik/06-odenek-alirken-gelir.html) — Ödenek alırken uygulama, reklam ya da abonelik geliri ve şirket kurmanın ödeneğe etkisi.
- [API → Meta Graph API (genel)](../../API/Sosyal-Medya/Meta-Graph-API-Genel.md) — Marketing API'nin üzerinde durduğu Graph API: erişim seviyeleri, izinler ve uygulama incelemesi.
- [API → TikTok](../../API/Sosyal-Medya/TikTok.md) — TikTok for Developers ile reklam tarafındaki TikTok API for Business (Marketing API) ayrımı.

## Kaynakça (erişim: 30 Ekim 2026)

1. AdSense program politikaları — https://support.google.com/adsense/answer/48182
2. AdSense ödüllü reklam birimi (beta) — https://support.google.com/adsense/answer/15405199
3. AdSense Offerwall — https://support.google.com/adsense/answer/13866332
4. AdSense ödüllü reklam politikası — https://support.google.com/adsense/answer/9121589
5. AdMob şartları — https://developers.google.com/admob/terms
6. Mobile Ads SDK forumu (2023) — https://groups.google.com/g/google-admob-ads-sdk/c/yyFFvx8unzs
7. AdMob SSV — https://developers.google.com/admob/android/ssv
8. WebView API for Ads — https://developers.google.com/admob/android/browser/webview/api-for-ads ; https://developers.google.com/ad-manager/mobile-ads-sdk/android/browser/webview
9. Ad Manager ödüllü reklam (web) — https://support.google.com/admanager/answer/9116812
10. GPT ödüllü reklam örneği — https://developers.google.com/publisher-tag/samples/display-rewarded-ad
11. Microsoft reklam kitaplıkları (arşiv) — https://learn.microsoft.com/en-us/previous-versions/windows/uwp/monetize/update-your-app-to-the-latest-advertising-libraries
12. Microsoft display ads in your app — https://learn.microsoft.com/en-us/windows/uwp/monetize/display-ads-in-your-app
13. Microsoft Store politikaları — https://learn.microsoft.com/en-us/windows/apps/publish/store-policies
14. Overwolf Native reklam — https://dev.overwolf.com/ow-native/monetization/advertising/overview
15. ow-electron Ads SDK — https://dev.overwolf.com/ow-electron/reference/ads/ads-sdk-api/overview ; https://dev.overwolf.com/ow-electron/getting-started/overview
16. Overwolf para kazanma — https://dev.overwolf.com/ow-native/monetization/overview
17. Overwolf monetization terms — https://legal.overwolf.com/docs/overwolf/monetization-terms
18. Playwire SSS — https://www.playwire.com/faq
19. Playwire Desktop Apps — https://www.playwire.com/desktop-app ; https://playwire.com/blog/in-app-advertising-mobile-apps-vs-desktop-apps
20. Unity Ads SSS — https://docs.unity.com/en-us/grow/ads/references/faq
21. Unity LevelPlay platformlar — https://docs.unity.com/en-us/grow/levelplay/platform
22. AppLovin MAX (2022) — https://blog.applovin.com/blog/max-features-update-march-2022/
23. Solar2D forumu (dolaylı) — https://forums.solar2d.com/t/applovin-supported-platforms/339936
24. Venatus — https://support.venatus.com/en/knowledge/what-ads-will-be-shown-on-my-site
25. Anzu — https://anzu.io/ ; https://www.anzu.io/news/anzu-raises-9-million-to-fuel-expansion-of-the-worlds-most-advanced-in-game-advertising-platform
26. Ezoic ödüllü reklam — https://support.ezoic.com/kb/article/rewarded-ads
27. Ezoic site şartları — https://support.ezoic.com/kb/article/ezoic-site-requirements-for-monetization
28. AppLixir entegrasyon SSS — https://support.applixir.com/frequently-asked-questions/integration-questions/applixir-integration-faq-360053980273
29. AppLixir geri çağrı — https://support.applixir.com/applixir-integration/react-integration/step-5-callbacks-rewards
30. Mediavine eşiği (ikincil) — https://www.jupiter.co/blog/mediavine-requirements-2026-how-to-qualify
31. AdSense reklam kodu değişiklikleri — https://support.google.com/adsense/answer/1354736
32. IMA HTML5 — https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side
33. IMA uyumluluk — https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side/compatibility
34. Out of context ads — https://support.google.com/publisherpolicies/answer/11190357
35. Ad Manager ödüllü reklam politikası — https://support.google.com/admanager/answer/7496282
36. AdMob ödüllü reklam politikası — https://support.google.com/admob/answer/7313578
37. AdMob program politikaları — https://support.google.com/admob/answer/2753860
38. Geçersiz trafik (Campaign Manager) — https://support.google.com/campaignmanager/answer/6076504
39. AdMob interstitial yasak uygulamaları — https://support.google.com/admob/answer/6201362
40. Better Ads, prestitial with countdown — https://www.betterads.org/desktop-prestitial-ad-with-countdown/
41. Reklam yükü alan deneyi (arXiv) — https://arxiv.org/abs/2412.05516v1
42. Aynı çalışma, Quantitative Marketing and Economics 2025 — https://ideas.repec.org/a/kap/qmktec/v23y2025i3d10.1007_s11129-025-09294-7.html
43. Firebase reklam sıklığı — https://firebase.google.com/docs/tutorials/optimize-ad-frequency/solution-overview
44. Pi-hole engelleme kipi — https://docs.pi-hole.net/ftldns/blockingmode/
45. AdGuard DNS süzme — https://adguard-dns.io/kb/general/dns-filtering/
46. WebView2 WebResourceRequested — https://learn.microsoft.com/en-us/microsoft-edge/webview2/how-to/webresourcerequested
47. WebView2 eklentiler — https://learn.microsoft.com/en-us/dotnet/api/microsoft.web.webview2.core.corewebview2profile.addbrowserextensionasync
48. AdSense Offerwall reklam yoksa — https://support.google.com/adsense/answer/12726063
49. Ad blocking recovery — https://support.google.com/adsense/answer/11576589
50. Google DAI / SSB — https://support.google.com/admanager/answer/9840889
51. MRC görünürlük (ticari basın) — https://www.mediapost.com/publications/article/279218
52. MRC Viewable Ad Impression Guideline — https://www.iab.com/wp-content/uploads/2015/06/MRC-Viewable-Ad-Impression-Measurement-Guideline.pdf
53. Ad Manager satır tipleri ve öncelik — https://support.google.com/admanager/answer/177279
54. Ad Manager ücretsiz sürüm sınırları — https://support.google.com/admanager/answer/6214526
55. Ad Manager ana sayfa — https://admanager.google.com/home/
56. Revive Adserver — https://www.revive-adserver.com/
57. Revive GitHub — https://github.com/revive-adserver/revive-adserver
58. Revive gereksinimler — https://www.revive-adserver.com/support/requirements/
59. Kevel geliştirici — https://dev.kevel.com/
60. Kevel fiyat tahmini (ikincil) — https://www.vendr.com/marketplace/kevel
61. AdButler fiyatlar — https://www.adbutler.com/pricing
62. Epom fiyatlar — https://epom.com/ad-server/pricing
63. Broadstreet fiyatlar — https://broadstreetads.com/pricing/
64. Google Ads API erişim seviyeleri — https://developers.google.com/google-ads/api/docs/api-policy/access-levels
65. Google Ads masaüstü yazılım politikası — https://support.google.com/adspolicy/answer/13528034
66. Meta Marketing API yetki — https://developers.facebook.com/docs/marketing-api/get-started/authorization
67. Meta ads_management güncellemesi — https://developers.meta.com/blog/updates-to-ads-management-standard-access-feature/
68. TikTok Marketing API (ikincil) — https://docs.nexla.com/user-guides/connectors/tiktok_marketing_api
69. DHV oranı (ikincil) — https://www.alomaliye.com/2025/12/25/dijital-hizmet-vergisi-orani-dusuruldu-2026-yilinda-yuzde-5-2027-yilinda-yuzde-2-5/
70. Ticari Reklam Yönetmeliği (RG 10.01.2015) — https://www.resmigazete.gov.tr/eskiler/2015/01/20150110-5.htm
71. KVKK Çerez Rehberi — https://kvkk.gov.tr/Icerik/7353/Cerez-Uygulamalari-Hakkinda-Rehber
72. KVKK standart sözleşme bildirimi — https://www.kvkk.gov.tr/Icerik/8043/Standart-Sozlesme-Bildirim-Modulu-Hakkinda-Kamuoyu-Duyurusu
73. KVKK değişikliği (ikincil) — https://www.erdem-erdem.av.tr/bilgi-bankasi/kisisel-verilerin-korunmasi-kanununda-neler-degisti
74. 6563 sayılı Kanun — https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6563.pdf
75. 6493 sayılı Kanun — https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6493.pdf
76. Mesafeli Sözleşmeler Yönetmeliği (ikincil) — https://www.lexpera.com.tr/mevzuat/yonetmelikler/mesafeli-sozlesmeler-yonetmeligi
77. CPC sanal para ilkeleri (ikincil) — https://www.reedsmith.com/en/perspectives/2025/03/qas-on-the-eu-consumer-protection-authorities-joint-guidance-paper
78. EDPB Rehber 2/2023 — https://www.edpb.europa.eu/documents/guideline/guidelines-22023-on-technical-scope-of-art-53-of-eprivacy-directive_en
79. Google EU User Consent Policy — https://www.google.com/about/company/user-consent-policy/
80. Google onaylı CMP şartı — https://support.google.com/admob/answer/13554116
81. TCF v2.3 (ikincil) — https://www.cookieyes.com/blog/iab-tcf-v2-3-explained/
82. ABD eyalet yasaları (ikincil) — https://www.enzuzo.com/blog/us-state-privacy-laws ; https://www.iapp.org/resources/article/us-state-privacy-legislation-tracker
83. COPPA kuralı — https://www.federalregister.gov/documents/2025/04/22/2025-05904/childrens-online-privacy-protection-rule
84. Gelir Vergisi Kanunu (mük. 20/B) — https://www.mevzuat.gov.tr/mevzuatmetin/1.4.193.pdf
85. 20/B 2026 sınırı (ikincil) — https://hukukcularevi.com/internetten-sosyal-medyadan-kazananlarin-vergisi-icerik-ureticisi-istisnasi/
86. Reklam alanı KDV görüşü (ikincil) — https://www.muhasebetr.com/yazarlarimiz/menderescetin/023/
87. İnternet reklam stopajı (ikincil, 2019) — https://www.alomaliye.com/2019/04/08/internet-reklamlari-vergi-kesintisi/
88. Google Ireland KDV 2 (ikincil) — https://www.muhasebenews.com/?p=132492
89. Ad Manager EFT ülkeleri — https://support.google.com/admanager/answer/147604
90. AdSense SEPA EFT ülkeleri — https://support.google.com/adsense/answer/2975858
91. Playwire AdMob eCPM (ikincil) — https://www.playwire.com/blog/admob-ecpm-benchmarks-what-publishers-should-expect
92. MonetizeMore uygulama geliri (ikincil) — https://www.monetizemore.com/blog/how-much-ad-revenue-can-apps-generate/
93. Appodeal eCPM raporu — https://appodeal.com/blog/mobile-ecpm-report-app-ad-monetization-worldwide-performance
94. Stripe kullanılabilen ülkeler — https://stripe.com/global
95. Stripe Atlas — https://stripe.com/atlas
96. IRS Form 5472 talimatı — https://www.irs.gov/instructions/i5472
97. Delaware LLC yıllık vergisi — https://corp.delaware.gov/paytaxes/alt-entitytaxinstructions/
98. Wyoming LLC Kanunu (harç) ve yıllık rapor çalışma sayfası — https://sos.wyo.gov/Forms/WyoBiz/Wyoming_Limited_Liability_Company_Act_and_Close_LLC_Supplement.pdf ; https://sos.wyo.gov/forms/business/general/arworksheet.pdf
99. e-Residency başvurusu — https://www.e-resident.gov.ee/become-an-e-resident/
100. Estonya Ticaret ve Sanayi Odası, şirket kurma — https://www.koda.ee/en/about-estonia/how-to-establish-company-in-estonia
101. EMTA, e-resident şirketlerin vergi yükümlülüğü — https://www.emta.ee/en/business-client/registration-business/non-residents-e-residents/tax-liabilities-companies
102. EMTA, kâr payının vergilendirilmesi — https://www.emta.ee/en/business-client/taxes-and-payment/income-and-social-taxes/taxation-dividends
103. Estonya Maliye Bakanlığı ÇVÖA tablosu — https://www.fin.ee/en/double-taxation-agreements
104. Companies House ücretleri — https://www.gov.uk/government/publications/companies-house-fees/companies-house-fees
105. BK kurumlar vergisi oranları — https://www.gov.uk/corporation-tax-rates
106. BK–Türkiye ÇVÖA — https://www.gov.uk/government/publications/turkey-tax-treaties/1988-uk-turkey-double-taxation-agreement-in-force
107. IRS Türkiye anlaşma belgeleri — https://www.irs.gov/businesses/international-businesses/turkey-tax-treaty-documents
108. Kurumlar Vergisi Kanunu 5520 (m.3, m.7, m.32) — https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5520.pdf
109. GİB 2026 genç girişimci bilgi notu — https://cdn.gib.gov.tr/api/gibportal-file/file/getFile?objectKey=DUYURU/UNIVERSAL/2026/2026_genc_girisimciler_info.pdf
110. KDV Kanunu 3065 (m.9/1) — https://www.mevzuat.gov.tr/mevzuatmetin/1.5.3065.pdf
111. Dijital Hizmet Vergisi, 7194 sayılı Kanun (m.4, m.5) — https://www.mevzuat.gov.tr/mevzuatmetin/1.5.7194.pdf
112. AdSense hesap türü — https://support.google.com/adsense/answer/10163
113. AdSense for YouTube ödeme yöntemleri (ülke tablosu) — https://support.google.com/youtube/answer/14728152
114. Paddle desteklenen ülkeler — https://www.paddle.com/help/start/intro-to-paddle/which-countries-are-supported-by-paddle
115. Paddle işletme doğrulaması — https://www.paddle.com/help/start/account-verification/what-is-business-verification
116. Polar desteklenen ülkeler — https://polar.sh/docs/merchant-of-record/supported-countries
117. iyzico fiyatlandırma — https://www.iyzico.com/fiyatlandirma
118. Ticaret Bakanlığı, asgari sermaye tutarları — https://icticaret.ticaret.gov.tr/haberler/anonim-ve-limited-sirketlerde-asgari-sermaye-tutarlari-artirilmistir
119. Elektronik hizmet sunucularına özel KDV mükellefiyeti (ikincil, 2018) — https://www.grantthornton.com.tr/globalassets/_markets_/tur/media/vergi-sirkuleri/2018/2018-14.pdf

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
