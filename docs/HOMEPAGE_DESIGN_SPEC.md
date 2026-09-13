# Et Sarrafı ana sayfa tasarım şablonu

Bu belge, ana sayfada onaylanan görsel dilin sonraki sayfalara aktarılması için hazırlanmıştır. Yeni sayfa referansları uygulanırken burada tanımlanan ortak navbar, tipografi, genişlik, hareket ve erişilebilirlik davranışları korunmalıdır.

## Genel görsel dil

- Yazı tipi: Plus Jakarta Sans; gövde 400, vurgu ve başlıklar 600–700.
- Ana içerik genişliği: en fazla 1184 px; mobil ve dar ekranlarda iki yanda 20 px boşluk.
- Ana renkler: beyaz içerik yüzeyleri, koyu lacivert metin, ölçülü bordo aksiyonlar ve koyu mürdüm-gri kapanış yüzeyi.
- Buton ve görseller yumuşak köşelidir. Kontroller en az 44 px dokunma alanı sağlar.
- İçerik iddiaları mevcut typed data/config dosyalarından gelir. Temsili görseller gerçek tesis veya işletme fotoğrafı olarak tanımlanmaz.

## Navbar

- Sabit konumludur. Masaüstünde 72 px, mobilde 68 px yüksekliğindedir.
- Ana sayfanın başlangıcında şeffaftır; kaydırmadan sonra yüzde 82 opak beyaz yüzey, 16 px blur ve hafif gölge kullanır.
- Logo sol tarafta navbarın altına taşar. Masaüstü bağlantıları ortalanır; İletişim butonu sağdadır.
- Bağlantı hover ve aktif durumlarında merkezden açılan ince çizgi kullanılır.
- Mobil menü Escape, klavye odağı, kısa ekran kaydırması ve arka sayfa scroll kilidini destekler.

## Ana hero

- Yükseklik tam olarak `100svh`; ilk açılışta alttaki bölüm görünmez.
- Eski dana bonfile görseli viewport’a sabitlenir. Gradient katmanı hero içinde kalır ve sayfayla birlikte hareket eder.
- Görsel başlangıçta masaüstünde `scale(1.13)`, mobilde `scale(1.10)` değerindedir. İlk ekranın yüzde 82’si boyunca `scale(1.015)` değerine iner.
- Aynı scroll ilişkisi görseli en fazla yüzde 1,4 yukarı taşır ve alt merkezden en fazla 2,1 derece perspektif verir.
- Dönen üst etiket 5,5 saniye bekler. Metin alttan gelir; kapsayıcı genişliği ölçülen metne göre 600 ms içinde büyür veya küçülür.
- Birincil butonda sabit ok bulunur. Hover sırasında arka plan yarı saydamlaşır, blur ve parlama artar, ok yatay eksende ileri geri hareket eder.
- Aşağı kaydırma göstergesi korunur ve ilk içerik bölümüne gider.

## İçerik bölümleri

1. Ürün yaklaşımı: metin solda, orta boy ürün görseli sağda.
2. Üretim ve kalite: orta boy görsel solda, metin ve iki bilgi kartı sağda.
3. Üretim Altyapımız: `100svh` yüksekliğinde, ayrı koyu ürün görselli ve bölüm sınırlarında kırpılan sabit arka plan.
4. Ürün kategorileri: masaüstünde dört, tablette iki, mobilde tek sütun.
5. İletişim alanı sabit görsel ve koyu filtre kullanır. Footer opak beyaz zemine döner; minimum yükseklikleri sırasıyla `46svh` ve `54svh` olup birlikte bir ekran oluşturur.

İçerik yüzeyleri opak beyazdır. Böylece sabit hero görselleri bölüm aralarında görünmez. Masaüstü içerik bölümleri yaklaşık bir ekran yüksekliği ve geniş dikey boşluk kullanır; tablet ve mobilde içerik yüksekliğine göre büyür.

## Scroll animasyonları

- Metin, orta boy görsel ve kategori gridleri aynı scroll tabanlı reveal davranışını kullanır.
- Giriş, öğenin üst kenarı viewport yüksekliğinin yüzde 58 çizgisine ulaştığında başlar ve yüzde 42 çizgisinde tamamlanır.
- Opaklık ve en fazla 18 px dikey hareket doğrudan scroll konumundan hesaplanır; zamanlayıcıyla otomatik tamamlanmaz.
- Öğe yukarıdan çıkarken aynı ilişki tersine çalışır ve içerik yeniden kaybolur.
- JavaScript çalışmazsa içerik görünür kalır. `prefers-reduced-motion: reduce` durumunda dönüşüm ve reveal efektleri kapatılır.

## Görsel kullanımı

- Ana hero: `/media/dana-bonfile.webp`
- Ürün yaklaşımı: `/images/stitch/products.jpg`
- Üretim ve kalite: `/media/high_quality_corporate_photography_of_a_modern_pristine_hygienic_meat.png`
- Üretim Altyapımız: `/media/cc996b29b9e27b0778943f7f2cc17267edb88964.jpg`
- İletişim ve footer: `/media/professional_food_photography_of_fresh_premium_raw_beef_cuts_ribeye_steak_and.png`

Bu görseller merkezi ve değiştirilebilir tutulmalıdır. Onaylı marka fotoğrafları sağlandığında aynı oranlar ve odak noktaları korunarak değiştirilebilir.

## Bağlantı davranışı

- Hero Ürünlerimizi İnceleyin: `/urunler`
- Hero Tesis ve Altyapı: `/tesislerimiz`
- Ürün grubu çağrısı: `/urunler`
- Üretim Altyapımız çağrısı: `/tesislerimiz`
- Kategori kartları: ilgili `/urunler#kategori` hedefi
- İletişim çağrısı: `/iletisim`; telefon butonu typed site config içindeki `tel:` bağlantısını kullanır.

Ana sayfadaki aksiyonlar sahte başarı durumu, form veya boş `#` bağlantısı üretmez.
