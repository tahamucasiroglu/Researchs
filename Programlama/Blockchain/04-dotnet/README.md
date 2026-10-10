# .NET Ekosistemi (Blockchain)

.NET'in blockchain'deki yeri tarayıcı değil, arka plandır: zinciri dinleyen, olayları veritabanına indeksleyen, sunucu tarafında imza atan ve cüzdan yöneten servisler. Bu işlerin ana kütüphanesi Nethereum'dur; sözleşme ABI'sinden C# sınıfları üretir, RPC üzerinden okuma ve yazma yapar. ASP.NET Core, arka plan servisleri (BackgroundService) ve mesajlaşma ile birleşen kısım burasıdır. .NET, JavaScript ekosisteminin yerini almaz, onu tamamlar. Sunucu tarafındaki anahtarların güvenle saklanması (KMS, Vault) bu katmanın en kritik konusudur.

## Sayfadaki ana başlıklar

1. Nethereum — ana kütüphane
2. Backend desenleri (.NET ile)
3. Diğer .NET kütüphaneleri
4. Kurumsal / izinli blockchain
5. .NET ile kriptografi temelleri
6. C# ↔ JavaScript kavram eşleştirme
7. Mimari öneri: tüm yığını birleştiren şablon
8. Test

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

## İlgili

- [C# ve .NET bölümü](../../CSharp-DotNet/)
- Resmi kaynak: [Nethereum belgeleri](https://docs.nethereum.com/)

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../README.md)
