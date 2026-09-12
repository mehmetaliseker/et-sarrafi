# Görsel teslim rehberi

Tüm fotoğraf eşleşmeleri ve boş marka yuvası [`src/data/media.ts`](../src/data/media.ts) içinde tipli olarak yönetilir. `src`, isteğe bağlı `mobileSrc`, `alt`, `ratio`, `mobileRatio`, `position`, `mobilePosition` ve `fit` alanları her kullanım için ayrı düzenlenebilir. `null` kaynak ağ isteği oluşturmaz; düzen ölçüsünü koruyan sabit açık gri yüzey gösterir. Gerçek bir fotoğraf yüklenirken aynı ölçüde kısa gecikmeli shimmer görünür, başarılı veya hatalı yükleme bitince kalkar.

## Şu anda kullanılan dosyalar

| Anahtar | Kullanım | Mevcut dosya | Kadraj |
| --- | --- | --- | --- |
| `hero` | Ana sayfa tam ekran sabit fotoğraf | `/media/dana-bonfile.webp` | 1600×1600 kaynaktan radius olmadan tam ekran `cover`; mobilde ayrı odak. Metin tarafında ölçülü koyu geçiş. |
| `beef`, `antrikot` | Büyükbaş grubu, antrikot katalog/detay | `/media/dana-antrikot.webp` | 1600×1600, `contain`. |
| `lamb`, `kusleme` | Küçükbaş grubu, kuşleme katalog/detay | `/media/kuzu-kusleme.webp` | 1600×1600, `contain`. |
| `bonfile` | Bonfile katalog/detay | `/media/dana-bonfile.webp` | Hero ile aynı ürünün detay görseli, `contain`. |

Bu üç public fotoğrafı küçük önizlemelerde incelendi ve ürün isimleriyle eşleştirildi. Fotoğraflarda gri stüdyo yerine koyu taş zemin bulunuyor. Eski logo, favicon ve üzerine reklam yazısı basılı banner kullanılmıyor. Ürün fotoğrafı tesis/ekip fotoğrafı yerine gösterilmiyor.

## Tamamlanacak sahneler

Önerilen yollar, dosyalar teslim edildiğinde merkezi `src` alanına yazılacak hedeflerdir. Her görselin ilgili işletmeyi/tesisi gerçekten göstermesi gerekir. Büyük sahneler için en az 1800–2400 px genişlik; mobil alternatif için en az 1000–1200 px önerilir.

| Anahtar | Kullanıldığı yer | Önerilen yol | Oran ve konum | Mobil |
| --- | --- | --- | --- | --- |
| `hero` | Ana sayfa tam ekran | `/media/hero-desktop.webp` | 16:9, 2560×1440; ürün sağda, solda sakin alan; dış kenarda radius yok | `/media/hero-mobile.webp`, 3:4, 1200×1600; ürünün tamamını mümkün olduğunca koruyan ayrı kadraj |
| `about` | Hakkımızda ana fotoğraf | `/media/about.webp` | 3:2, 2400×1600; ekip/işletme | 4:3 güvenli kadraj |
| `aboutDetail` | Hakkımızda ayrıntı | `/media/about-detail.webp` | 3:4, 1200×1600; farklı çalışma ayrıntısı | Aynı kaynak olabilir |
| `homeProcessing` | Ana sayfa süreç panoraması | `/media/home-processing.webp` | 21:9, 2800×1200; gerçek işleme alanı | Ayrı 4:3 fotoğraf |
| `bergama` | Bergama tesisi | `/media/bergama.webp` | 3:2, 2100×1400; yalnızca bu tesis | 4:3 odak kontrolü |
| `foca` | Foça tesisi | `/media/foca.webp` | 4:3, 1800×1350; yalnızca bu tesis | 4:3 |
| `yenikoy` | Yeniköy tesisi | `/media/yenikoy.webp` | 3:2, 2100×1400; yalnızca bu tesis | 4:3 odak kontrolü |
| `processing` | Tesisler işleme panoraması | `/media/processing.webp` | 21:9, 2800×1200; ana sayfadakinden ayrı | Ayrı 4:3 fotoğraf |
| `quality` | Kalite | `/media/quality.webp` | 4:3, 1800×1350; gerçek süreç | Aynı kaynak olabilir |
| `horeca` | Hizmet alanları | `/media/horeca.webp` | 3:2, 2100×1400; işletmeye ait gerçek sahne | 4:3 odak kontrolü |

Grup anahtarları `carcass`, `offal`, `processed`, `prepared` ileride ilgili ürün grubuna ait özgün fotoğrafla doldurulabilir; şu an sahte grup fotoğrafı üretilmez.

## Ürün fotoğrafları

Katalog ve detay görseli aynı ürün için paylaşılabilir. Her ürünün kendi görseli olmalıdır. Öneri: 1600×1600 veya 1600×1200, etrafında kesilmeyecek kadar boşluk, `fit: "contain"`; mobilde farklı fotoğraf gerekirse `mobileSrc` kullanın.

| Anahtar | Ürün | Önerilen yol |
| --- | --- | --- |
| `nuar` | Dana nuar | `/media/products/dana-nuar.webp` |
| `dos` | Dana döş | `/media/products/dana-dos.webp` |
| `kafes` | Kuzu kafes | `/media/products/kuzu-kafes.webp` |
| `danaCarcass` | Dana karkas | `/media/products/dana-karkas.webp` |
| `sigirCarcass` | Sığır karkas | `/media/products/sigir-karkas.webp` |
| `duveCarcass` | Düve karkas | `/media/products/duve-karkas.webp` |
| `koyunCarcass` | Koyun karkas | `/media/products/koyun-karkas.webp` |
| `kuzuCarcass` | Kuzu karkas | `/media/products/kuzu-karkas.webp` |
| `danaCiger` | Dana ciğer | `/media/products/dana-ciger.webp` |
| `iskembe` | Dana işkembe | `/media/products/dana-iskembe.webp` |
| `bobrek` | Kuzu böbrek | `/media/products/kuzu-bobrek.webp` |
| `kuzuCiger` | Kuzu ciğer | `/media/products/kuzu-ciger.webp` |
| `dil` | Dil | `/media/products/dil.webp` |

Mevcut `bonfile`, `antrikot` ve `kusleme` için yeni görsel gelirse aynı anahtarın `src` değerini değiştirin. Katalog ve detay otomatik güncellenir.

## Marka

`brandAssets.logo` ve `brandAssets.favicon` `null` kalır; eski dosyalara referans yoktur. Yeni ikon için 1:1 saydam SVG/PNG, favicon için en az 48×48 dosya uygundur. İkonun görünmez yuvası header/footer hizasını şimdiden korur. Logo eklenince başlıkla birlikte son görsel kontrol yapılmalıdır.
