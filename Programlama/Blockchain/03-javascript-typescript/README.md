# JavaScript ve TypeScript Ekosistemi (Blockchain)

Blockchain uygulama (dApp) geliştirmenin ana akımı JavaScript ve TypeScript'tir. Tarayıcıdaki arayüz, kullanıcının cüzdanına (MetaMask vb.) bağlanır; kullanıcı işlemi kendi cüzdanında imzalar, uygulama da bir RPC düğümü üzerinden sözleşmeyi okur veya çağırır. Bu işler için ethers.js, viem ve React tarafında wagmi kullanılır. Zincirdeki verinin geçmişe dönük sorgulanması pahalı olduğu için olaylar (event) genellikle bir indeksleme katmanında toplanır.

Sayfa cüzdan bağlantısından sözleşme çağrısına, olay dinlemekten React dApp mimarisine kadar hangi kütüphanenin ne işe yaradığını sıralar. React sayfasıyla birlikte okunur.

## Sayfadaki ana başlıklar

1. Bu sayfa nasıl kullanılır
2. Kütüphaneler: ethers.js, viem, wagmi, web3.js
3. Cüzdan bağlantısı
4. İmzalama: personal_sign, EIP-712, SIWE, permit
5. Sözleşme etkileşimi
6. dApp mimarisi
7. Geliştirme ortamı
8. Veri katmanı: indeksleme ve veri API'leri
9. NFT ve medya
10. Test ve kalite
11. Node.js backend ile zincir dinleme
12. EVM dışı zincirlerin JS kütüphaneleri

HTML anlatım: [index.html](index.html) (yerelde tarayıcıda açılır)

## İlgili

- [React](../../JavaScript-TypeScript/03-react/) · [JavaScript ve TypeScript bölümü](../../JavaScript-TypeScript/)
- Resmi kaynak: [ethers.js v6](https://docs.ethers.org/v6/) · [viem](https://viem.sh/) · [wagmi](https://wagmi.sh/)

---

← [Üst klasör](../) · ⌂ [Ana sayfa](../../../README.md)
