# Et Sarrafı kurumsal web sitesi

Et Sarrafı’nın kurumsal yapısını, ürün gruplarını, tesislerini, hizmet alanlarını, kalite yaklaşımını ve iletişim bilgilerini sunan tanıtım sitesidir. Proje yalnızca bilgilendirme amacı taşır; üyelik, sepet, sipariş, ödeme, yönetim paneli veya içerik yönetim sistemi içermez.

## Teknoloji

- Next.js 16.3.4 ve App Router
- React 19.2.8
- TypeScript strict
- Tailwind CSS 4 ve CSS Modules
- ESLint 9
- npm
- Yerel font ve görsel dosyaları

Next.js 16.3.4, Node.js `20.9.0` veya daha yeni bir sürüm gerektirir. Paket sürümleri `package-lock.json` ile sabitlenmiştir.

## Kurulum

Depoyu indirdikten sonra bağımlılıkları kilit dosyasına göre kurun:

```bash
npm ci
```

Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Site varsayılan olarak `http://localhost:3000` adresinde açılır.

## Yayın adresi ve indeksleme

Projenin çalışması için ortam dosyası veya environment variable gerekmez. Canonical kök adresi `https://www.etsarrafi.com` olarak `src/config/site.ts` içinde tanımlıdır. Production build’i indekslenebilir; yerel geliştirme çıktısı otomatik olarak `noindex` çalışır.

## Komutlar

| Komut | İşlev |
| --- | --- |
| `npm run dev` | Geliştirme sunucusunu başlatır. |
| `npm run lint` | ESLint denetimini çalıştırır. |
| `npm run typecheck` | TypeScript tip kontrolünü çıktı üretmeden çalıştırır. |
| `npm run build` | Optimize edilmiş production yapısını oluşturur. |
| `npm run start` | Hazırlanmış production yapısını çalıştırır. |
| `npm run check` | Lint, tip kontrolü ve production build adımlarını sırayla çalıştırır. |

Production önizlemesi için:

```bash
npm run build
npm run start
```

Farklı bir port kullanmak için `npm run start -- -p 3002` komutunu çalıştırabilirsiniz.

## Sayfalar

| Rota | İçerik |
| --- | --- |
| `/` | Ana sayfa ve marka tanıtımı |
| `/hakkimizda` | Kurumsal anlatım ve çalışma yaklaşımı |
| `/urunler` | Arama ve kategori filtreleri bulunan ürün kataloğu |
| `/urunler/[slug]` | 16 ürün için statik oluşturulan detay sayfaları |
| `/tesislerimiz` | Çiftlik ve işleme tesisi bilgileri |
| `/hizmet-alanlarimiz` | Hizmet alanları |
| `/kalite` | Kalite yaklaşımı |
| `/politikalarimiz` | Kurumsal politikalar ile gizlilik bölümü |
| `/iletisim` | Merkezi iletişim bilgileri, harita ve yol tarifi |

Geçersiz adresler gerçek HTTP 404 yanıtı verir. Eski site adresleri için kalıcı yönlendirmeler `next.config.ts` içinde tutulur.

## Proje yapısı

```text
src/
  app/                 Sayfalar, layout dosyaları ve global stiller
  components/          Ortak arayüz, bölüm ve layout bileşenleri
  config/              Site ve navigasyon ayarları
  data/                Metinler, ürünler, medya eşlemeleri ve kaynak kayıtları
  lib/                 Metadata ve yardımcı fonksiyonlar
  types/               Ortak TypeScript tipleri
public/
  images/              Sayfa ve kategori görselleri
  media/               Marka ve ürün medya dosyaları
scripts/               Yerel doğrulama ve tarayıcı kontrol betikleri
```

Server Component varsayılan yapıdır. Menü, hareket efektleri, katalog filtreleri ve rota kaydırma yönetimi gibi tarayıcı etkileşimi gereken küçük alanlar Client Component olarak ayrılmıştır.

## İçerik ve iletişim bilgilerini güncelleme

Şirket adı, telefon, e-posta, adres, harita bağlantıları, sosyal hesaplar, canlı alan adı ve indeksleme durumu `src/config/site.ts` içinde merkezi olarak yönetilir. İletişim bilgilerini bileşenlere ayrıca yazmayın.

Ana düzenleme noktaları:

| Dosya | Sorumluluk |
| --- | --- |
| `src/config/site.ts` | Şirket, iletişim, alan adı ve indeksleme ayarları |
| `src/config/navigation.ts` | Ana navigasyon ve sitemap’e giren rotalar |
| `src/data/products.ts` | Ürün grupları, ürün detayları ve slug değerleri |
| `src/data/media.ts` | Görsel kaynağı, alternatif metin, oran, odak ve `cover/contain` ayarları |
| `src/data/services.ts` | Hizmet alanı içerikleri |
| `src/data/about.ts` | Hakkımızda sayfası içeriği |
| `src/data/facilities.ts` | Tesisler sayfası içeriği |
| `src/data/pages.ts` | Ortak sayfa metinleri |
| `src/data/sources.ts` | İçeriklerin kaynak kayıtları |

Yeni bir ürün eklerken `src/data/products.ts` içindeki ürün verisini ve `src/data/media.ts` içindeki medya eşlemesini birlikte güncelleyin. Ürün slug’ları `src/config/navigation.ts` üzerinden sitemap’e otomatik eklenir.

## Görseller

Tarayıcıda kullanılan görseller `public` altında tutulur ve kökten başlayan yollarla çağrılır. Kurumsal araç, işletme ve çiftlik görselleri `public/images/corporate` altında; kategori görselleri `public/images/products/categories` altında sınıflandırılmıştır.

`src/data/media.ts`, görsellerin masaüstü ve mobil oranlarını, odak noktalarını ve yerleşim biçimini merkezi olarak belirler. Yeni görsel eklerken:

1. Dosyayı uygun `public/images` veya `public/media` alt klasörüne yerleştirin.
2. Web için WebP kullanın ve görseli gereksiz büyük boyutta bırakmayın.
3. `src/data/media.ts` içindeki kaynağı ve anlamlı alternatif metni güncelleyin.
4. Mobilde 320 ve 390 px, masaüstünde en az 1440 px genişlikte kırpma ve taşmayı kontrol edin.

Bazı içeriklerde onaylı konu fotoğrafı gelene kadar geçici eşlemeler kullanılır. `temporaryScene` ve `temporaryProduct` ile işaretlenen kayıtlar yeni marka görselleri geldiğinde merkezi olarak değiştirilmelidir.

## SEO, robots.txt ve sitemap.xml

Next.js metadata route yapısı kullanılır:

- `src/app/robots.ts`, `/robots.txt` yanıtını üretir.
- `src/app/sitemap.ts`, `/sitemap.xml` yanıtını üretir.
- `src/lib/metadata.ts`, sayfa başlığı, açıklama, canonical, Open Graph ve Twitter metadata alanlarını üretir.
- `src/app/layout.tsx`, site genelindeki metadata ile Organization JSON-LD verisini tanımlar.

Canlı production yapısında `robots.txt` tüm genel rotaların taranmasına izin verir ve sitemap adresini bildirir. Sitemap; sekiz ana rotayı ve 16 ürün detay sayfasını mutlak URL olarak içerir. Ana sayfa, katalog, ürün detayları, kurumsal sayfalar, iletişim ve politika sayfası için uygun `changefreq` ve `priority` değerleri tanımlanmıştır. Gerçek bir içerik güncelleme tarihi tutulmadığı için yanıltıcı `lastmod` değeri üretilmez.

Geliştirme ortamında:

- sayfa metadata’sı `noindex, nofollow` olur,
- `/robots.txt` tüm taramayı engeller,
- `/sitemap.xml` boş URL listesi döndürür,
- Organization JSON-LD çıktısı yayınlanmaz.

Yayın sonrasında şu adresleri doğrudan kontrol edin:

```text
https://www.etsarrafi.com/robots.txt
https://www.etsarrafi.com/sitemap.xml
```

## Erişilebilirlik ve responsive davranış

- Sayfalarda tek `h1`, semantik bölüm yapısı ve içeriğe geçiş bağlantısı kullanılır.
- Klavye odağı görünürdür ve dokunma hedefleri en az 44 × 44 px olacak şekilde tasarlanmıştır.
- Mobil menü Escape ve klavye dolaşımıyla kullanılabilir; açıkken arka sayfa kaydırması kilitlenir.
- Animasyonlar `prefers-reduced-motion` tercihine saygı gösterir.
- Tasarım 320 px genişlikten başlayarak yatay taşma oluşturmayacak şekilde düzenlenmiştir.
- Sayfa değişimlerinde yeni rota yukarıdan açılır; sayfa içi anchor bağlantıları hedeflerine gitmeye devam eder.

## İçerik doğrulama durumu

Aşağıdaki konular doğrulanmadan kullanıcı arayüzüne yeni iddia olarak eklenmemelidir:

- `public/images/corporate/ciftlik.webp` görselinin hangi çiftliğe ait olduğu ve görselde geçen arazi büyüklükleri
- WhatsApp işletme hattı
- Güncel sertifika kapsamı, tesis kapasitesi, ürün teknik bilgileri ve teslimat taahhütleri
- Gizlilik metninin güncel barındırma, erişim kayıtları ve Google Maps kullanımına uygunluğu

Doğrulanmış sosyal bağlantılar Instagram ve Facebook’tur. X/Twitter hesabı bulunmadığı için bağlantı tanımlanmamıştır. İçerik kaynakları `src/data/sources.ts` ve ürün kayıtlarında korunur.

## Kalite kontrolleri

Her değişiklikten sonra aşağıdaki komutları sırayla çalıştırın:

```bash
npm run lint
npm run typecheck
npm run build
npm run check
git diff --check
```

Production sunucusu çalışırken temel rota, metadata, görsel ve bağlantı kontrolleri için:

```bash
node scripts/validate-site.mjs http://localhost:3000
```

`scripts` klasöründeki diğer betikler mobil/masaüstü ekran ölçümleri, menü etkileşimi, reduced motion ve sayfa bazlı görsel kontroller için kullanılır. Tarayıcı betiklerinin bir kısmı `9224` portunda Chrome DevTools Protocol oturumu bekler ve sonuçlarını `docs/screenshots` altında üretir.

## Production yayını

1. `npm ci` ve `npm run check` çalıştırın.
2. Production build’i yayınlayın.
3. Ana rotaları, ürün detaylarını, 404 yanıtını, görselleri, `/robots.txt` ve `/sitemap.xml` uçlarını kontrol edin.

Deploy, hosting, commit ve push işlemleri proje dışında yürütülür.
