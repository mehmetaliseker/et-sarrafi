export interface AboutImage {
  src: `/images/about/${string}`;
  alt: string;
  desktopRatio: string;
  mobileRatio: string;
  desktopPosition: string;
  mobilePosition: string;
}

export const aboutImages = {
  hero: {
    src: "/images/about/processing-area.png",
    alt: "Et işleme alanını gösteren temsili görsel",
    desktopRatio: "21 / 9",
    mobileRatio: "4 / 3",
    desktopPosition: "50% 46%",
    mobilePosition: "51% 50%",
  },
  facility: {
    src: "/images/about/preparation-area.jpg",
    alt: "Et hazırlama ve depolama alanını gösteren temsili görsel",
    desktopRatio: "7 / 4",
    mobileRatio: "4 / 3",
    desktopPosition: "50% 48%",
    mobilePosition: "50% 50%",
  },
  meat: {
    src: "/images/about/meat-closeup.png",
    alt: "Kesilmiş çiğ et ürünlerinin yakın görünümü",
    desktopRatio: "5 / 4",
    mobileRatio: "4 / 3",
    desktopPosition: "50% 48%",
    mobilePosition: "50% 50%",
  },
} as const satisfies Record<string, AboutImage>;

export const aboutContent = {
  intro: {
    eyebrow: "Kurumsal / Hakkımızda",
    title: "Et Sarrafı’nı Tanıyın",
    description: "Et Sarrafı, Celep ailesinin hayvancılık ve kasaplık deneyimini kırmızı et işleme ve tedarikiyle buluşturur. Çiftlikten tüketiciye uzanan faaliyetlerimizi kalite ve gıda güvenliği odağında yürütüyoruz.",
  },
  overview: {
    eyebrow: "Biz Kimiz?",
    title: "Dört Kuşaktan Gelen Mesleki Birikim",
    paragraphs: [
      "Et Sarrafı’nın temelleri, Celep ailesinin dört kuşaktır sürdürdüğü hayvancılık ve kasaplık mesleğine dayanır. Ailenin bu alandaki geçmişi, 1900’lü yılların ilk çeyreğinde Selanik’ten Foça’ya gelen İskender Celep’e uzanır.",
      "Foça ve Aliağa çevresinde gelişen bu birikim, 2022 yılında Karşıyaka–Örnekköy’de kurulan et entegre tesisiyle yeni bir aşamaya taşınmıştır. Tesiste kırmızı et işleme, parçalama, depolama ve sevkiyat faaliyetleri yürütülmektedir.",
      "Bir Celepler Pamuk markası olan Et Sarrafı, yetiştiricilik deneyimini ürün işleme konusundaki özenle birleştirir. Amacımız, üretimden tüketiciye uzanan süreçte güvenilir et ürünleri sunmaktır.",
    ],
  },
  approach: {
    eyebrow: "Yaklaşımımız",
    title: "Çalışma Yaklaşımımız",
    items: [
      { number: "01", title: "Ürün Yaklaşımı", description: "Karkas ve parçalanmış etlerden işlenmiş ürünlere uzanan ürün çeşitliliğimizle farklı ihtiyaçlara yanıt veriyoruz. Ürünlerimizde kaliteyi ve özenli hazırlığı ön planda tutuyoruz." },
      { number: "02", title: "Süreç Yönetimi", description: "Gıda güvenliğini esas alıyor; üretim süreçlerimizi geliştirmeye ve çalışanlarımızın bilgi ve becerilerini artırmaya önem veriyoruz." },
      { number: "03", title: "İş Birliği", description: "Kurumsal iş ortaklarımızın et ve et ürünü ihtiyaçlarına yönelik tedarik hizmeti sunuyoruz. Hizmet anlayışımızı ihtiyaçlara uygun ürün temini ve güvenilir iş ilişkileri üzerine kuruyoruz." },
    ],
  },
  photoCaption: "Üretim ve ürün yaklaşımımızdan temsili görünümler.",
  photoLink: "Tesislerimizi İnceleyin",
} as const;
