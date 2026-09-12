<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Et Sarrafı proje kuralları

## Teknoloji ve kapsam

- Kurulu Next.js sürümü, App Router, TypeScript strict, Tailwind CSS, ESLint ve npm kullanılmalıdır.
- Varsayılan olarak Server Component yazılmalı; yalnızca gerçek tarayıcı etkileşimi gereken küçük alanlar Client Component olmalıdır.
- Proje kurumsal tanıtım ve bilgilendirme sitesidir. Backend, API, veritabanı, CMS, yönetim paneli ve e-ticaret özellikleri eklenemez.
- Üyelik, giriş, sepet, fiyat, sipariş, ödeme, form, e-bülten, analytics, tracking ve cookie altyapısı eklenemez.
- Kullanıcı onayı olmadan bağımlılık eklenemez veya paket sürümleri değiştirilemez.
- Kullanıcı onayı olmadan deploy, hosting ayarı, git commit veya git push yapılamaz.

## İçerik doğruluğu

- Kurumsal bilgi, tarih, kapasite, sertifika, ürün özelliği, sağlık/kalite iddiası veya istatistik uydurulamaz.
- İletişim ve şirket bilgileri yalnızca merkezi typed config dosyasından okunmalıdır; bileşenlere kopyalanamaz.
- Doğrulanmayı bekleyen içerikler kullanıcı arayüzüne eklenmemeli, `docs/CONTENT_REVIEW.md` içinde belirtilmelidir.
- Sahte aksiyon, sayaç, sertifika, görsel veya kırık bağlantı oluşturulamaz.

## TypeScript ve kalite

- TypeScript strict kuralları korunmalıdır; `any`, `@ts-ignore`, gerekçesiz ESLint disable ve kontrolsüz `dangerouslySetInnerHTML` kullanılamaz.
- Tekrarlanan sabitler typed config/data dosyalarına taşınmalıdır.
- Kullanılmayan kod, import, varsayılan Next.js tanıtım içeriği ve debug log bırakılamaz.
- Her değişiklikten sonra sırasıyla `npm run lint`, `npm run typecheck`, `npm run build`, `npm run check` ve `git diff --check` çalıştırılmalıdır.
- Next.js kodu yazmadan önce kurulu sürümün ilgili `node_modules/next/dist/docs/` rehberi okunmalıdır.

## Tasarım ve erişilebilirlik

- Tasarım mobile-first olmalı ve en az 320 px genişlikte yatay taşma oluşturmamalıdır.
- Semantik HTML, mantıklı başlık sırası, sayfa başına tek `h1`, içerik atlama bağlantısı, görünür `focus-visible`, en az 44x44 px dokunma alanı ve yeterli kontrast sağlanmalıdır.
- Mobil menü klavye ve Escape ile kullanılabilmeli; açıkken arka plan kaydırmasını engellemeli, ekranı aşmamalı ve bağlantı seçildiğinde kapanmalıdır.
- Hareketli davranışlar `prefers-reduced-motion` tercihine saygı göstermelidir.
- Gerçek marka varlığı sağlanmadan uzak görsel, stok görsel veya sahte logo eklenmemeli; tanımlı yer tutucu alanlar kullanılmalıdır.
