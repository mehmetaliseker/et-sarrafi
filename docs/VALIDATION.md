# Et Sarrafı revizyon doğrulaması — 12 Eylül 2026

Production yerel önizleme: **http://localhost:3002**. Next.js 16.3.4, App Router ve mevcut bağımlılıklar korundu. Deploy, commit veya push yapılmadı.

## Uygulama ve görsel kontrol

- Ortak `.site-container` üst sınır olmadan viewport'u kullanıyor. Kenar boşluğu 320–767 px için 16–20 px, 768–1279 px için 28 px, 1280–1919 px için 40 px, 1920 px ve üstü için 64 px. Header, ana içerik, katalog ve footer aynı değişkene bağlı.
- Edge 152/CDP ile 1440 px görünümde **1345 px**, 1920 px görünümde **1777 px** gerçek içerik genişliği ölçüldü. İki değerde 15 px düşüş, klasik dikey kaydırma çubuğunun viewport içindeki yerinden kaynaklanıyor; kaydırma çubuğu hariç hedefler sırasıyla 1360 ve 1792 px.
- Ana sayfa ilk ekran, kaydırılmış navbar, yarı örtülme ve tam örtülme görüntüleri incelendi. Hero ve sabit fotoğraf 390, 1440 ve 1920 px’te görünür viewport’un dört kenarını dolduruyor; hero’da radius yok. Opak beyaz yüzey fotoğrafın üstüne çıkıyor. Navbar açılışta şeffaf/beyaz yazılı, 84 px sonrasında beyaz/antrasit ve 36 px dönüş eşiğiyle titremesiz çalışıyor.
- Kullanılan fotoğraflar: `dana-bonfile.webp`, `dana-antrikot.webp`, `kuzu-kusleme.webp`. Eşleşmeler önizlemelerde ürünle karşılaştırıldı. Eski logo/banner/favikon kullanılmıyor. Hero dışındaki görsel ve kart radiusları 16–24 px aralığında; hover kırpması aynı çerçevede kalıyor. Katalog görsel alanları kare kaynaklarla eşleşen 1:1 orana getirildi.
- Yerel Onest değişken fontu bütün sayfalarda doğrulandı. Türkçe karakterler 390 ve 1440 px ekran görüntülerinde kontrol edildi. Zorunlu satır sonları içerik başlıklarından kaldırıldı; numaralı bölüm etiketleri ve tekrarlanan ok ikonları temizlendi.
- Dönen destek metni 4,6 saniyelik grup geçişi kullanıyor; genişliği/yüksekliği değişmiyor. Duraklatma ve yeniden oynatma, hero görünürlüğü, içerik geçiş bağlantısı, sekme/reduced motion durumu ayrı tarayıcı kontrolünden geçti.
- `node scripts/revision-check.mjs` ile 10 rota × 6 görünüm (320×740, 390×844, 768×1024, 1440×900, 1920×1080, 844×390) tarandı. Yatay taşma, kırık görsel, konsol/hydration hatası ve ortak grid uyuşmazlığı bulunmadı. Ekran görüntüleri ilk incelemeden sonra tekrar alındı.
- `node scripts/validate-site.mjs http://localhost:3002` ile 58 rota/görünüm ve 39 etkileşim kontrol edildi; başarısızlık ve konsol hatası yok. Katalog arama/filtre, sıfır sonuç, geri/ileri, 16 ürün bağlantısı, bilinmeyen slug için HTTP 404, mobil menü/Escape/odak, iç bağlantılar ve azaltılmış hareket bu raporda yer alıyor. Ek 9 kontrol; klavyeyle kategori seçimi, gerçek metin girişi, %200 menü metni, kısa yatay ekran ve hero odağı için geçti.

## Yüklenme durumları

Gerçek `/_next/image` istekleri Edge Fetch aracılığıyla geciktirildi. 390 px görünümde gecikme sırasında üç gerçek görsel alanında skeleton görüldü; animasyon adı `skeleton-shimmer`, döngü 1,6 saniye. İstek tamamlanınca skeleton sayısı sıfıra indi ve üç fotoğraf hazır duruma geçti. Aynı sayfa önbellekten açıldığında skeleton görünmedi. Ayrı başarısız görsel isteğinde `media-error` kararlı gri yüzeye geçti, shimmer kalmadı. `prefers-reduced-motion: reduce` ile skeleton animasyon adı `none` oldu. Metin ve ürün verileri geciktirilmedi.

## Komutlar

| Komut | Sonuç |
| --- | --- |
| `npm run lint` | Başarılı |
| `npm run typecheck` | Başarılı |
| `npm run build` | Başarılı; 27 statik sayfa ve metadata üretildi |
| `npm run check` | Başarılı; lint, typecheck, build tekrar çalıştı |
| `git diff --check` | Başarılı; yalnız LF/CRLF bilgi uyarıları |
| `node scripts/skeleton-check.mjs` | Başarılı; yavaş, önbellek, hata ve azaltılmış hareket durumları |
| `node scripts/revision-check.mjs` | Başarılı; 60 rota/görünüm, hero katmanları ve gerçek grid ölçümleri |
| `node scripts/validate-site.mjs http://localhost:3002` | Başarılı; 58 rota/görünüm, 39 etkileşim, sıfır konsol hatası |
| `node scripts/extra-check.mjs` | Başarılı; 9 klavye, menü, hero ve kısa ekran kontrolü |
| `node scripts/hero-revision-check.mjs` | Başarılı; 390, 1440, 1920 ve 844×390 hero/navbar/katalog, 36 kontrol |
| `node scripts/motion-interaction-check.mjs` | Başarılı; metin duraklatma/oynatma, içerik geçişi, menü ve reduced motion |
| `node scripts/typography-pages-check.mjs` | Başarılı; 7 rota × 2 görünüm, Onest, taşma, bölüm numarası ve görsel hataları |

Tarayıcı ekran görüntüleri ve ölçüm raporu [`docs/screenshots/revision/`](screenshots/revision/) içindedir; ayrıntılı rota/etkileşim raporu [`docs/screenshots/final/report.json`](screenshots/final/report.json) dosyasındadır. Rotalar: `/`, `/hakkimizda`, `/urunler`, 16 `/urunler/[slug]` detayı, `/tesislerimiz`, `/hizmet-alanlarimiz`, `/kalite`, `/iletisim` ve 404.

## Beklenen varlıklar

Public klasöründe kurumsal ekip, Bergama/Foça/Yeniköy tesisleri, işleme alanı, kalite/hizmet sahneleri ve 13 ürünün özgün fotoğrafı bulunmuyor. Bu alanlar kararlı açık gri yüzeyle yer tutuyor; uygun görsel gelmeden yanlış ürün fotoğrafı kullanılmadı. Marka ikonu/logo da bekleniyor. Ana sahnedeki kare bonfile fotoğrafı mevcut malzemeyle en uygun seçenek; ayrı geniş masaüstü ve dikey mobil kadraj teslim edilince son kompozisyon kontrolü gerekir. Ayrıntılı anahtar, yol ve çözünürlük listesi [`ASSET_GUIDE.md`](ASSET_GUIDE.md) içindedir.
