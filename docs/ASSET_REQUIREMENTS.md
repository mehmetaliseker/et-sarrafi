> Bu dosya önceki tasarım turunun arşiv kaydıdır. 12 Eylül 2026 tarihli güncel görsel yapısı ve teslim listesi ASSET_GUIDE.md dosyasındadır; aşağıdaki pending/approved ve preview-icon bilgileri artık geçerli değildir.
# Marka ve fotoğraf ihtiyaçları

Onaylı yeni logo veya kullanıcı fotoğrafı bu görev sırasında henüz sağlanmadı. Çözünürlük, ışık, içerik ilişkisi ve kadraj değerlendirmesi gerçek dosyalar gelince yapılabilir. Yer tutucular fotoğraf veya tamamlanmış marka kimliği olarak sunulmaz.

| Kullanım | İhtiyaç / önerilen kaynak ölçüsü | Kadraj |
| --- | --- | --- |
| Header ve footer | Onaylı SVG logo; alternatif yüksek çözünürlüklü şeffaf PNG | Orijinal oran korunacak. Geçici sade marka metni kullanılıyor. |
| Ana sayfa açılışı | Gerçek üretim/tesis fotoğrafı, tercihen en az 2400 × 1400 | Masaüstü geniş yatay, mobil 5:4; konu kenarlarda kesilmemeli. |
| Hakkımızda | Gerçek ekip/işletme fotoğrafı, en az 2000 × 1400 | Masaüstü 2:1, mobil 4:3. |
| Ürün aileleri | Büyükbaş, küçükbaş, karkas, sakatat için ayrı fotoğraflar, en az 1600 × 1600 | Katalog masaüstü 4:5; mobil 4:3. İşlenmiş ve mamul fotoğrafları güncel ürün listesine göre seçilecek. |
| Ürün detayları | Dana bonfile ve kuzu küşleme için ayrı gerçek ürün fotoğrafları, en az 1600 × 1600 | Kare kadraj; ürünün tamamı görünmeli. |
| Tesisler | Bergama, Foça, Yeniköy için isimle eşleştirilmiş ayrı fotoğraflar, en az 1800 × 1350 | 4:3. Bir tesise ait fotoğraf başka tesisin yerine kullanılmayacak. |
| Et işleme | Gerçek işleme alanı, tercihen en az 2400 × 1400 | Masaüstü 2.8:1; mobil 3:2. |
| Kalite | Gerçek üretim/kontrol çalışma ortamı, en az 1600 × 1200 | 4:3. |
| Paylaşım önizlemesi | Onaylı marka görseli/fotoğrafı, 1200 × 630 | Şimdilik sayfaya özgü metinsel OG/Twitter önizlemesi var; görsel paylaşım önizlemesi eksik. |

## Dosya yönetimi

- Kullanıcı orijinalleri için `assets/originals/`; web kopyaları için `public/media/approved/` kullanılacak. Orijinaller değiştirilmez.
- `src/data/media.ts` yolları, alternatif metinleri, masaüstü/mobil odakları, ölçüleri ve isteğe bağlı `mobileSrc` kırpımını tek tipli katmanda yönetir.
- `status: "pending"` alanlarında gerçek dosya yolu yoktur. Fotoğraf incelenip kullanım onayı alınınca `approved` kaydı eklenir.
- Yeni dosyalarda konu, gerçeklik, işletme eşleşmesi, çözünürlük, ışık, netlik ve kırpma payı değerlendirilir. Aynı fotoğraf tüm sayfa başlarına yerleştirilmez.

## Eski varlık denetimi

| Korunan dosya | Önceki kullanım | Yeni durum |
| --- | --- | --- |
| `public/media/et-sarrafi-logo.webp`, `public/media/originals/et-sarrafi-logo.png` | `Brand.tsx` header/footer | Kullanımdan çıkarıldı; yeniden çizilmedi veya değiştirilmedi. |
| `public/media/dana-bonfile.webp` ve orijinali | Ana sayfa hero, metadata | Kullanımdan çıkarıldı. |
| `public/media/dana-antrikot.webp` ve orijinali | Ana sayfa ürün alanı | Kullanımdan çıkarıldı. |
| `public/media/kuzu-kusleme.webp` ve orijinali | Ana sayfa ürün alanı | Kullanımdan çıkarıldı. |
| Eski `public/favicon.ico` | Layout ve otomatik tarayıcı isteği | `docs/archive/legacy-favicon.ico` konumuna koruyarak taşındı; layout hiçbir çizim içermeyen şeffaf `preview-icon.svg` kullanıyor. Bu bir logo/marka işareti değildir. |
| `.qa-visual/source`, `.qa-visual/products`, eski ekran görüntüleri | Önceki inceleme arşivi | Yeni tasarımda kullanılmadı; kaynaklar silinmedi. |

Eski dosyalar arşiv değeri için korunur; kullanıcı yeni onay vermeden tekrar etkinleştirilmemelidir. Bu çalışmada eski siteden görsel, stok veya yapay zekâ görseli alınmadı.
