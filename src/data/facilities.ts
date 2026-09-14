export type FacilityId = "bergama" | "foca" | "yenikoy" | "ornekkoy";

export interface FacilityMetric {
  value: string;
  label: string;
}

export interface FacilitySection {
  title: string;
  paragraphs: readonly string[];
}

export interface Facility {
  id: FacilityId;
  name: string;
  menuDescription: string;
  sequence: string;
  badge: string;
  metrics: readonly FacilityMetric[];
  paragraphs?: readonly string[];
  sections?: readonly FacilitySection[];
}

export const facilities: readonly Facility[] = [
  {
    id: "bergama",
    name: "Bergama Çiftliği",
    menuDescription: "Büyükbaş yetiştiriciliği",
    sequence: "01 / YETİŞTİRİCİLİK",
    badge: "Büyükbaş üretim çiftliği",
    metrics: [
      { value: "1.500", label: "Dönüm arazi" },
      { value: "2.000", label: "Baş kapasite" },
      { value: "Limuzin", label: "Ağırlıklı ırk" },
    ],
    paragraphs: [
      "Bergama Çiftliği, büyükbaş hayvan yetiştiriciliğinin yürütüldüğü üretim alanıdır. Tesis, yetiştiricilik faaliyetlerinin başlangıç noktası olarak Foça ve Yeniköy'deki besi süreçleriyle bağlantılıdır.",
      "Çiftlik 1.500 dönümlük araziye ve 2.000 baş büyükbaş hayvan kapasitesine sahiptir. Yetiştirilen hayvanların büyük çoğunluğu Limuzin ırkındandır. Bu alan, üretim sürecinde hayvanların yetiştiriciliğine odaklanır.",
    ],
  },
  {
    id: "foca",
    name: "Foça Besi Çiftliği",
    menuDescription: "Besi ve mera kullanımı",
    sequence: "02 / BESİ",
    badge: "Yeni Foça çiftlik alanı",
    metrics: [
      { value: "900", label: "Dönüm arazi" },
      { value: "1.500", label: "Baş kapasite" },
      { value: "Mera", label: "Kullanım alanı" },
    ],
    paragraphs: [
      "Foça Besi Çiftliği, Bergama'daki üretim çiftliğinde doğan hayvanların beslenme sürecinin sürdürüldüğü alanlardan biridir. Belirli bir ağırlığa ulaşan hayvanların besisi Yeni Foça'daki meralarda devam eder.",
      "Tesisin toplam arazi büyüklüğü 900 dönüm, büyükbaş hayvan kapasitesi 1.500 baştır. Mera alanlarının kullanımı, Foça çiftliğinin besi sürecindeki rolünü tanımlar.",
    ],
  },
  {
    id: "yenikoy",
    name: "Yeniköy Besi Çiftliği",
    menuDescription: "Büyükbaş bakım ve besi",
    sequence: "03 / BAKIM VE BESİ",
    badge: "Büyükbaş besi çiftliği",
    metrics: [
      { value: "10", label: "Dönüm kapalı alan" },
      { value: "2.500", label: "Hayvan kapasitesi" },
    ],
    paragraphs: [
      "Yeniköy Besi Çiftliği, büyükbaş hayvanların bakım ve besi faaliyetlerine ayrılmıştır. Bergama'daki üretim çiftliğinde doğan hayvanların sonraki bakım aşamalarından biri burada yürütülür.",
      "Tesisin 10 dönüm kapalı alanı ve 2.500 hayvan kapasitesi vardır. Hayvanların beslenmesi ve kesime hazır hâle gelene kadarki bakımı bu çiftliğin faaliyetleri arasında yer alır.",
    ],
  },
  {
    id: "ornekkoy",
    name: "Örnekköy Entegre Tesis",
    menuDescription: "İşleme, depolama ve sevk",
    sequence: "04 / KIRMIZI ET İŞLEME",
    badge: "Et entegre tesisi",
    metrics: [
      { value: "2022", label: "Kuruluş" },
      { value: "10 ton", label: "Günlük parçalama kapasitesi" },
      { value: "Frigorifik", label: "Sevkiyat" },
    ],
    sections: [
      { title: "Üretim ve İşleme", paragraphs: ["Karşıyaka–Örnekköy'de 2022 yılında kurulan et entegre tesisinde kırmızı et işleme ve parçalama faaliyetleri yürütülür. Günlük kırmızı et parçalama kapasitesi 10 tondur."] },
      { title: "Kalite Kontrol ve Güvence", paragraphs: ["Tesisin işleme faaliyetleri kalite güvence ve kalite kontrol yaklaşımıyla ele alınır. Ham madde ve ürün analizleri ürün güvenliği kapsamında yürütülür."] },
      { title: "Depolama ve Sevkiyat", paragraphs: ["İşlenen ürünlerin depolama ve sevkiyat aşamaları tesisin faaliyet kapsamındadır. Sevkiyat frigorifik araçlarla, soğuk zincir gözetilerek yapılır."] },
    ],
  },
];

export const developmentSteps = [
  { year: "2007", label: "Besiciliğe başlangıç", description: "Celepler'in Foça ve Dikili'de büyükbaş besiciliğine başlaması." },
  { year: "2018", label: "Yetiştiricilik", description: "Kendi hayvanlarını üretmeye yönelik inek yetiştiriciliğine başlanması." },
  { year: "2022", label: "Entegre tesis", description: "Karşıyaka–Örnekköy et entegre tesisinin kurulması." },
] as const;
