# Et Sarrafı — kurumsal tanıtım sitesi

Next.js 16.3.4 App Router, TypeScript strict, Tailwind CSS 4, npm. Mevcut altyapı ve kilit dosyası korundu; yeni bağımlılık eklenmedi.

## Yerel önizleme

Geliştirme: `npm run dev` → http://localhost:3000

Production (PowerShell):

```powershell
npm run build
$env:PORT = '3002'
npm run start
```

Production adresi: http://localhost:3002. Değişiklikten sonra production sunucusunu durdurup build alın ve yeniden başlatın.

## Rotalar

`/`, `/hakkimizda`, `/urunler`, `/tesislerimiz`, `/hizmet-alanlarimiz`, `/kalite`, `/iletisim`; katalogdaki 16 ürünün `/urunler/[slug]` detayları ve gerçek HTTP 404.

Katalog kategori ve arama seçimleri URL üzerinden paylaşılabilir; geri/ileri gezinmede korunur. İçerikler Server Component, etkileşimli alanlar küçük Client Component'lardır. JavaScript kapalıyken ürün kartları ve sayfa metinleri görünür, footer bağlantıları kullanılabilir.

## Düzenleme noktaları

| Dosya | Sorumluluk |
| --- | --- |
| `src/config/site.ts` | Şirket, iletişim, canonical alan adı ve indeksleme |
| `src/config/navigation.ts` | Navigasyon ve sitemap rota listesi |
| `src/data/media.ts` | Nullable görseller/ikon, mobil kaynak, odak, oran, cover/contain |
| `src/data/products.ts` | Kategoriler, 16 ürün ve ürün bazında metin kaynağı |
| `src/data/services.ts` | Hizmet başlıkları ve metinleri |
| `src/data/pages.ts`, `home.ts`, `facilities.ts`, `trust.ts` | Sayfa içerikleri |
| `src/app/globals.css` | Viewport'u kullanan ortak grid/gutter, ayrı okuma genişliği, merkezi renk ve radius değerleri |

Hero görseli dört kenarı dolduran sabit dekoratif katmandadır; hero metni ve bağlantıları doğal akıştadır. Ana sayfa navbarı açılışta fotoğraf üzerinde şeffaf, 84 px eşiğinden sonra beyazdır. Beyaz içerik/alt bilgi opaktır. Mobilde `svh`/`lvh` ve safe area kullanılır. Reduced motion tercihinde görsel katman doğal akışa, metin döngüsü ve kaydırma göstergesi statik duruma geçer.

Tipografi, yerel [`Onest-Variable.ttf`](src/app/fonts/Onest-Variable.ttf) dosyasını `next/font/local` ile kullanır. Fontun SIL OFL metni [`src/app/fonts/OFL.txt`](src/app/fonts/OFL.txt) içinde tutulur.

## Kontroller

```powershell
npm run lint
npm run typecheck
npm run build
npm run check
git diff --check
node scripts/validate-site.mjs http://localhost:3002
node scripts/revision-check.mjs
node scripts/skeleton-check.mjs
node scripts/hero-revision-check.mjs
node scripts/motion-interaction-check.mjs
node scripts/typography-pages-check.mjs
```

Tarayıcı komutları port 9224'te mevcut Edge CDP oturumu gerektirir; paket kurmaz. Son raporlar `docs/screenshots/final/report.json` ve `docs/screenshots/revision/report.json` dosyalarındadır. `scripts/browser-check.mjs` önceki sürümün kontrolüdür.

## Teslim belgeleri

- [Görsel/ikon teslim rehberi](docs/ASSET_GUIDE.md)
- [İçerik teyidi](docs/CONTENT_REVIEW.md)
- [Doğrulama raporu](docs/VALIDATION.md)

Public klasöründeki dana bonfile, dana antrikot ve kuzu kuşleme fotoğrafları kullanılmaktadır. Kurumsal, tesis ve diğer ürün fotoğrafları henüz yok; bunların alanları sabit açık gri yüzeydir. Eski logo/favicon gösterilmez. Yeni fotoğraflarla son kadraj kontrolü ayrıca yapılmalıdır.

Canonical ve sitemap doğrulanan kaynak alan adını ve gerçek rotaları kullanır. Yerel önizlemenin mevcut noindex/robots engeli korunur. Deploy, hosting değişikliği, commit ve push yapılmadı.
