import { siteConfig } from "@/config/site";
import type { SitePath } from "@/types/content";

interface PageCopy { title: string; eyebrow: string; description: string; metadataTitle: string; }
export const pages = {
  "/hizmet-alanlarimiz": { title: "İş ortaklarımız için et tedariki.", eyebrow: "Hizmet alanlarımız", description: "Horeca, karkas tedariki ve sıcak satış faaliyetlerimizi tanıyın. Ürün ihtiyaçlarınız için doğrudan iletişim kurun.", metadataTitle: "Hizmet Alanlarımız" },
  "/hakkimizda": { title: "Bir meslekten doğan kurumsal birikim.", eyebrow: "Hakkımızda", description: siteConfig.company.introduction, metadataTitle: "Hakkımızda" },
  "/urunler": { title: "Ürünlerimiz.", eyebrow: "Ürün kataloğu", description: "Büyükbaş ve küçükbaş et kesimleri, karkas ürünler ve diğer ürün aileleri hakkında bilgi edinin.", metadataTitle: "Ürünlerimiz" },
  "/tesislerimiz": { title: "Üretimin yer aldığı topraklar.", eyebrow: "Tesislerimiz", description: siteConfig.company.farms, metadataTitle: "Tesislerimiz" },
  "/kalite": { title: "Üretime bütüncül bir yaklaşım.", eyebrow: "Kalite yaklaşımımız", description: "Yetiştirme, işleme ve tedarik faaliyetlerinde kalite politikamızın temel başlıkları.", metadataTitle: "Kalite Yaklaşımımız" },
  "/iletisim": { title: "İletişim bilgileri.", eyebrow: "İletişim", description: "Ürünlerimiz ve faaliyetlerimiz hakkında bilgi almak için aşağıdaki iletişim kanallarını kullanabilirsiniz.", metadataTitle: "İletişim" },
} as const satisfies Partial<Record<SitePath, PageCopy>>;

export const editorial = {
  about: { title: "Foça’dan gelen meslek birikimi.", paragraphs: [siteConfig.company.story, siteConfig.company.operations], operationsTitle: "Faaliyet alanlarımız", operations: [{ title: "Yetiştirme ve besi", text: siteConfig.company.farms, href: "/tesislerimiz" }, { title: "Kırmızı et işleme", text: siteConfig.company.operations, href: "/tesislerimiz#isleme" }, { title: "Kurumsal tedarik", text: siteConfig.company.supply, href: "/iletisim" }] },
  processing: { title: "Kırmızı et işleme tesisi.", description: siteConfig.company.operations, steps: ["Parçalama", "Depolama", "Sevkiyat"] },
  policy: { title: "Kalite politikasının temel ilkeleri.", introduction: "Kalite politikamız; süreçlerin sürekli iyileştirilmesini, çalışanların gelişimini ve üretim sorumluluğunu birlikte ele alır.", items: [{ title: "Sürekli iyileştirme", text: "Yönetim sistemlerinin geliştirilmesi ve süreçlerin etkinliğinin artırılması hedeflenir." }, { title: "Çalışanların gelişimi", text: "Çalışanların gıda güvenliği konusundaki bilgi ve becerilerini geliştirmeye yönelik eğitimler politika kapsamında yer alır." }, { title: "Üretim sorumluluğu", text: "Üretim faaliyetlerinde çalışan sağlığı, gıda güvenliği ve çevrenin korunması birlikte ele alınır." }] },
  contact: { phone: "Telefon", email: "E-posta", address: "İletişim adresi", directions: "Yol tarifi", company: "Şirket bilgileri", legalName: "Ticaret unvanı", brand: "Marka", addressNote: "Yol tarifi bağlantısı iletişim adresi için harita araması açar." },
  cta: { title: "Ürünlerimiz hakkında bilgi alın.", text: "Ürün gruplarımız ve hizmetlerimiz için bizimle doğrudan iletişime geçin.", action: "İletişime Geç" },
  notFound: { title: "Sayfa bulunamadı.", description: "Bağlantı değişmiş veya bu adres kullanımda olmayabilir. Ana sayfaya dönebilir ya da ürünlerimizi inceleyebilirsiniz." },
} as const;
