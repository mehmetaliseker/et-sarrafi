# İçerik incelemesi — 12 Eylül 2026

## Hakkımızda sayfası görselleri — 13 Eylül 2026

`design-reference/about.html` ve `about-desktop.png` çalışma alanında bulunmadığından Stitch çıktısındaki üç gövde fotoğrafının kaynak URL'leri çıkarılamadı. `/hakkimizda` sayfasında `public/images/about/` altındaki mevcut yerel temsili karşılıklar kullanıldı: `processing-area.png`, `preparation-area.jpg` ve `meat-closeup.png`. Bunlar Et Sarrafı tesisinin doğrulanmış fotoğrafları değildir. Referans görseller sağlandığında merkezi `src/data/about.ts` tanımındaki yollar ve odak noktaları değiştirilebilir.

## Stitch ana sayfa görselleri — 13 Eylül 2026

`public/images/stitch/facility.jpg` ve `products.jpg`, Stitch çıktısındaki uzak bağlantılardan alınan üretilmiş/temsili görsellerdir. İşletmenin gerçek tesis veya ürün fotoğrafı olarak doğrulanmamıştır; onaylı marka fotoğrafları sağlandığında merkezi dosya yolları korunarak değiştirilebilir.

Kaynak: [Et Sarrafı](https://www.etsarrafi.com/). Kaynak sitede görülen bilgiler, güncellik açısından işletmenin son onayının yerine geçmez. Siteden tasarım veya logo aktarılmadı. Kullanıcının 12 Eylül 2026 revizyonuyla mevcut `public/media` içindeki üç ürün fotoğrafı yeni arayüzde kullanılmaya başlandı; bunlar kurumsal/tesis fotoğrafı yerine sunulmadı.

## Kullanılan içerik

- [Hakkımızda](https://www.etsarrafi.com/sayfa/hakkimizda): Celepler ailesi, Foça'daki hayvancılık/kasaplık birikimi, Karşıyaka–Örnekköy et işleme faaliyeti. Tarih ve büyüklük iddiaları çıkarıldı.
- [Tesislerimiz](https://www.etsarrafi.com/sayfa/tesislerimiz): Bergama, Foça ve Yeniköy faaliyetleri.
- [İşleme tesisi](https://www.etsarrafi.com/sayfa/kirmizi-et-isleme-tesisi): parçalama, depolama ve sevkiyat.
- [Hizmetler](https://www.etsarrafi.com/sayfa/servis-hizmet-yerleri): Horeca, karkas, sıcak satış. Bölge, zaman veya miktar taahhüdü kullanılmadı.
- [Politika](https://www.etsarrafi.com/sayfa/politikalarimiz): yerli besi, hijyen, soğuk tedarik, iyileştirme ve eğitim yaklaşımı. Sertifika beyanına çevrilmedi.
- Altı kategori ve 16 ürün: ürün bazında kaynak `src/data/products.ts` içindedir. Açıklamalar yalnızca teyit edilen ad/sınıflandırma ve mevcut iki üründe kaynaklı kısa anatomik tanımla sınırlıdır.

## İşletmeden beklenen son içerik teyidi

[İletişim sayfasında](https://www.etsarrafi.com/sayfa/iletisim) yeniden görülen ve yalnızca `src/config/site.ts` içinden okunan bilgiler:

- +90 539 517 96 86
- siparis@etsarrafi.com
- 7401 Sokak No:78/A, Karşıyaka/İzmir
- Celepler Pamuk Sanayi ve Ticaret Ltd. Şti.

Bu hattın, posta kutusunun, iletişim adresinin ve unvanın güncel kullanımını teyit edin. Harita bağlantısı açık adresle arama yapar; kesin koordinat, ziyaret saati veya tesis giriş noktası iddia etmez.

## Arayüze alınmayan bilgiler

- Ana sayfada 30 ton, işleme sayfasında 60 ton karkas depolama bilgisi var. Çelişki çözülmeden kapasite yazılmadı.
- Kuruluş/meslek geçmişi tarihleri, hayvan/çalışan sayıları, arazi alanları, liderlik ve üstünlük ifadeleri kullanılmadı.
- ISO/helal sertifika logoları ve belge kapsamı; güncel belgeler sağlanmadı. Kalite sayfasında teknik “onay bekleniyor” alanı bulunmaz.
- Raf ömrü, sıcaklık, sağlık, ambalaj, analiz sıklığı, teslimat sözü ve ulusal hizmet kapsamı eklenmedi.
- İşlenmiş etler ve mamul grubu alt ürün listeleri: teyit edilmiş alt içerik bulunmadığından iletişim bağlantısıyla gösterilir.
- Önceki envanterdeki kuzu karski adı bu turda küçükbaş kategori sayfasında tekrar doğrulanamadı; yeni kataloğa alınmadı. Kuzu kafes kaynak kategoride görüldü.
- Tavuk/şarküteri gibi hizmet metninde geçen ek kapsamlar, yeni ürün detayları oluşturmak için yeterli sayılmadı.
- WhatsApp işletme hattı olarak ayrıca doğrulanmadığından eklenmedi.

Görsel ve ikon listesi: [ASSET_GUIDE.md](ASSET_GUIDE.md). Başka içerik zorunlu değildir; ürün teknik ayrıntıları ve sertifikalar sağlanırsa sonradan eklenebilir.

Canonical ve sitemap, referans olarak doğrulanan `https://www.etsarrafi.com` alan adındaki gerçek rotaları kullanır. Mevcut yerel önizleme noindex/robots engeli korunur; yayın yapılmadı.
