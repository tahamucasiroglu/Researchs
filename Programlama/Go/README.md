# Go

Go (Golang), Google'da geliştirilmiş, statik tipli, doğrudan makine koduna derlenen ve çöp toplayıcılı bir dildir. Bilinçli olarak küçük tutulmuştur: sınıf ve kalıtım yoktur, onların yerine struct, method ve örtük (implicit) olarak uygulanan interface'ler vardır. Exception da yoktur; hatalar fonksiyonlardan değer olarak döner ve `if err != nil` ile kontrol edilir. Eşzamanlılık dilin merkezindedir: goroutine'ler hafif iş parçacıklarıdır, channel'lar aralarında güvenli iletişim sağlar. Tek bir statik ikili dosya üretmesi nedeniyle bulut ve altyapı araçlarında (Docker, Kubernetes, Terraform) yaygındır.

Temeli kısa sürede öğrenilebilir. Türkiye'de ilan sayısı sınırlıdır ama yurt dışı uzaktan işlerde sık karşılaşılır.

## Sayfadaki ana başlıklar

1. Kurulum, program yapısı ve paket sistemi
2. Dil temelleri — tipler, değişkenler, akış
3. Struct, method, interface, embedding
4. Koleksiyonlar — slice, map, string
5. Hata yönetimi — exception yoktur
6. Generics ve diğer dil özellikleri
7. Eşzamanlılık — goroutine, channel, context
8. Standart kütüphane
9. Araç zinciri
10. Web çatıları
11. Veri erişimi
12. Diğer kütüphaneler
13. Go nerede kullanılıyor
14. C# geliştiricisi için farklar
15. İş piyasası — dürüst değerlendirme

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

## İlgili

- [Blockchain: Diğer Zincirler](../Blockchain/05-diger-zincirler/) — Cosmos SDK, Go ile yazılır.
- Resmi kaynak: [go.dev — Documentation](https://go.dev/doc/) · [A Tour of Go](https://go.dev/tour/)

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
