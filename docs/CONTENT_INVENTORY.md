> Önceki tur envanteri (8 Eylül). Güncel uygulama 7 ana rota, 16 ürün detayı ve 404 içerir. Güncel teyitler CONTENT_REVIEW.md içindedir; teknik belge/önizleme notları arayüzden kaldırılmıştır.
# İçerik envanteri — 8 Eylül 2026

Kaynak yalnızca metinsel bilgi için kullanıldı. Bu çalışmada eski siteden görsel indirilmedi. Kaynak sayfalarının okunabilmesi, bilgilerin güncelliğinin şirket tarafından onaylandığı anlamına gelmez. Tekil kaynak kayıtları `src/data/sources.ts` içindedir.

| İçerik | Kaynak sayfası | Kullanım ve sınır |
| --- | --- | --- |
| Celepler marka ilişkisi, Foça’daki aile mesleği, Karşıyaka–Örnekköy işleme faaliyeti | [Hakkımızda](https://www.etsarrafi.com/sayfa/hakkimizda) | `siteConfig.company`, ana sayfa, hakkımızda ve tesisler. Tarih, kuşak sayısı, liderlik ve büyüklük iddiaları çıkarıldı. |
| Altı ürün ailesi; karkas türleri, kuzu karski | [Ürünler](https://www.etsarrafi.com/kategori/urunler) | Katalogdaki aile adları ve kısa açıklamalar. Stok, fiyat, satış öğeleri alınmadı. |
| Dana bonfile, antrikot, nuar, döş | [Büyük Baş](https://www.etsarrafi.com/kategori/buyuk-bas) | Büyükbaş ailesinin örnek ürünleri. |
| Dana ciğer, işkembe; kuzu böbrek, ciğer; dil | [Sakatat](https://www.etsarrafi.com/kategori/sakatat) | Sakatat ailesi. |
| Bonfilenin anatomik tanımı | [Dana Bonfile](https://www.etsarrafi.com/urun/dana-dos-1) | `/urunler/dana-bonfile`. Kaynak URL adı ile ürün başlığı farklı; görünen başlık Dana Bonfile. Saklama süresi, kalite ve sağlık iddiaları alınmadı. |
| Küşlemenin anatomik tanımı | [Kuzu Küşleme](https://www.etsarrafi.com/urun/dana-dos-1-1-1-2) | `/urunler/kuzu-kusleme`. Saklama süresi ve üstünlük ifadeleri alınmadı. |
| Bergama, Foça, Yeniköy faaliyetleri | [Tesislerimiz](https://www.etsarrafi.com/sayfa/tesislerimiz) | Tesislere ayrı fotoğraf alanları ve kısa faaliyet metinleri. Kapasite, arazi ve ırk iddiaları alınmadı. |
| Parçalama, depolama, sevkiyat | [Kırmızı Et İşleme Tesisi](https://www.etsarrafi.com/sayfa/kirmizi-et-isleme-tesisi) | Tesisler sayfasındaki ayrı işleme bölümü. Çalışan sayısı, kapasite, sıcaklık ve analiz iddiaları alınmadı. |
| Kurumsal iş ortaklarına tedarik | [Servis Hizmet Yerleri](https://www.etsarrafi.com/sayfa/servis-hizmet-yerleri) | Hakkımızda faaliyet alanı. Ulusal yaygınlık ve üstün hizmet iddiası kullanılmadı. |
| Yerli besi, hijyen, soğuk tedarik; iyileştirme, çalışan gelişimi, üretim sorumluluğu | [Politikalarımız](https://www.etsarrafi.com/sayfa/politikalarimiz) | Kalite yaklaşımı olarak sadeleştirildi. Politika beyanı sertifika kanıtı sayılmadı. |
| Telefon, e-posta, adres, şirket unvanı | [İletişim](https://www.etsarrafi.com/sayfa/iletisim) | Tek kaynak `src/config/site.ts`. Güncellik onayı bekleniyor. Vergi/banka bilgisi, form veya sosyal hesap alınmadı. |
| İşlenmiş etler alt içerikleri | [İşlenmiş Etler](https://www.etsarrafi.com/kategori/islenmis-etler) | Tarayıcı araştırma aracı `Cache miss` döndürdü; alt ürün ve özellik doğrulanamadı. Aile adı ana katalogdan teyit edildi. |
| Mamul grubu alt içerikleri | [Mamul Grubu](https://www.etsarrafi.com/kategori/mamul-grubu) | Tarayıcı araştırma aracı `Cache miss` döndürdü; alt ürün ve özellik doğrulanamadı. Önceki projedeki alt kesim örnekleri kaldırıldı. |

## Sayfa durumu

Altı istenen rota, iki ürün detayı ve 404 tasarımı geliştirildi. Logo ve fotoğraf eksikleri nedeniyle görsel teslim yayına hazır değildir. Kalite sayfasının belge alanı tamamlanmamıştır. İşlenmiş et/mamul alt açıklamaları ve ürün detaylarının ambalaj/saklama gibi ek bilgileri onay bekler.
