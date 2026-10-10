# Rust

Rust, çöp toplayıcı kullanmadan bellek güvenliği sağlayan, sistem programlamaya yönelik, statik tipli bir dildir. Bunu **sahiplik (ownership)** modeliyle yapar: her değerin tek bir sahibi vardır, sahip kapsamdan çıkınca değer serbest bırakılır; başka kodlar değere ancak ödünç alma (borrowing) kurallarına uyarak erişir. Bu kurallar derleme zamanında denetlendiği için veri yarışları ve "use after free" gibi hatalar çalışmadan önce yakalanır. Hata yönetimi exception yerine `Result` ve `Option` tipleriyle yapılır; paket yöneticisi ve derleme aracı `cargo`'dur.

Öğrenme eğrisi en dik dillerden biridir; çöp toplayıcılı dillerden gelen alışkanlıkların yeniden düşünülmesi gerekir. Sayfa, kısa vadede iş bulma hedefi olanlar için doğru zaman olup olmadığını gerekçesiyle tartışarak başlar.

## Sayfadaki ana başlıklar

1. Önce dürüst değerlendirme
2. Araç zinciri, cargo ve proje yapısı
3. Temeller: sahiplik, ödünç alma, yaşam süresi
4. Tip sistemi: struct, enum, trait, generic
5. Bellek yönetimi ve akıllı işaretçiler
6. Hata yönetimi
7. Eşzamanlılık ve async
8. Ekosistem: hangi iş için hangi crate
9. Kullanım alanları
10. C# geliştirici için farklar
11. İş piyasası ve öğrenme kaynakları

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

## İlgili

- [Blockchain: Diğer Zincirler](../Blockchain/05-diger-zincirler/) — Solana ve Polkadot programları Rust ile yazılır.
- Resmi kaynak: [The Rust Programming Language (kitap)](https://doc.rust-lang.org/book/) · [rust-lang.org — Learn](https://www.rust-lang.org/learn)

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../README.md)
