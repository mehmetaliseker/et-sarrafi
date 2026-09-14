export interface PolicySection {
  id: "kalite-ve-helal" | "gizlilik-ve-guvenlik" | "cerezler";
  number: "01" | "02" | "03";
  title: string;
}

export const qualityContent = {
  title: "Kalite",
  introduction: "Et Sarrafı olarak gıda güvenliği, kalite ve helal uygunluğu üretim yaklaşımımızın temel unsurları olarak ele alıyor; yönetim sistemlerimizi sürekli geliştirmeyi hedefliyoruz.",
  image: {
    src: "/images/products/dana-antrikot.png",
    alt: "Açık renkli tezgahta duran çiğ et kesimi",
    position: "50% 50%",
  },
  approach: {
    title: "Gıda Güvenliği ve Kalite Yaklaşımımız",
    paragraphs: [
      "Yönetim yaklaşımımızı ISO 22000:2018 Gıda Güvenliği Yönetim Sistemi ve OIC/SMIIC 1:2019 helal gıda şartları doğrultusunda geliştirmeyi; bu yaklaşımı tüm çalışanlarımıza benimsetmeyi amaçlıyoruz.",
      "Üretim faaliyetlerimizde gıda güvenliğini ve helal bütünlüğünü korumayı, çalışanlarımızın bilgi ve becerilerini artırmayı ve ilgili yasal yükümlülüklere uymayı temel sorumluluklarımız arasında görüyoruz.",
    ],
  },
  principles: [
    { number: "01", title: "Gıda Güvenliği", description: "Gıda güvenliğine ilişkin tehlikeleri kontrol etmeyi ve yönetim sistemimizin etkinliğini sürekli iyileştirmeyi hedefliyoruz." },
    { number: "02", title: "Helal Uygunluk", description: "Kontaminasyon, çapraz temas, tağşiş ve karışma risklerini kontrol ederek helal bütünlüğünü korumayı taahhüt ediyoruz." },
    { number: "03", title: "Sürekli İyileştirme", description: "Çalışan eğitimleri ile bilimsel ve teknolojik gelişmeleri takip ederek süreçlerimizi geliştirmeye önem veriyoruz." },
  ],
} as const;

export const policyContent = {
  title: "Politikalarımız",
  introduction: "Kalite ve helal yaklaşımımız ile web sitemizin gizlilik ve güvenlik esaslarını bu sayfada inceleyebilirsiniz.",
  sections: [
    { id: "kalite-ve-helal", number: "01", title: "Kalite ve Helal Politikamız" },
    { id: "gizlilik-ve-guvenlik", number: "02", title: "Gizlilik ve Güvenlik" },
    { id: "cerezler", number: "03", title: "Çerezler" },
  ] as const satisfies readonly PolicySection[],
  qualityItems: [
    "Yönetim anlayışımızı sürekli gelişme felsefesiyle ele alır; yönetim sistemlerimizi tüm süreçlerde ISO 22000:2018, Kalite Yönetim Sistemi ve OIC/SMIIC 1:2019 Helal Gıda Yönetim Sistemi şartlarına uygun hâle getirmeyi, etkinliğini sürekli iyileştirmeyi ve tüm personele benimsetmeyi amaçlarız. Bu doğrultuda pazar payımızı, kârlılığımızı, rekabet gücümüzü ve helal uygunluğun belirlenmesine yönelik risk kontrolünü artırmak için çalışırız.",
    "Yönetim kadromuz ve eğitimli personelimizle ilgili tarafların ihtiyaç ve beklentilerini ISO 22000:2018, Kalite Yönetim Sistemi ve Helal Gıda Yönetim Sistemi şartlarına uygun olarak karşılamayı amaçlarız.",
    "Çalışanların kuruluşumuzun temelini oluşturduğu bilinciyle hareket eder; iş sağlığı ve güvenliği, gıda güvenliği ve helal uygunluk gerekliliklerine özen gösteririz. Çalışanlarımıza değer veririz.",
    "Bugüne kadar yaptığımız ve ileride yapacağımız tüm faaliyetlerde, ilk defada doğru, zamanında ve her zaman kaliteli, güvenli ve helal üretim prensibiyle çalışırız.",
    "Hizmet ve üretim faaliyetlerimiz boyunca ekolojik dengeyi korumayı; çalışanlarımızın ve faaliyetlerimizden etkilenen tüm tarafların sağlığına gelebilecek olumsuz etkileri önlemeyi; helal bütünlüğüne zarar verebilecek kontaminasyon, çapraz temas, tağşiş ve karışma risklerini başlangıç aşamasında kontrol etmeyi ve gerekli korumaları sağlamayı taahhüt ederiz.",
    "Gıda Güvenliği, Kalite ve Helal Gıda Yönetim Sistemlerimizi sürekli geliştirmeyi ve iyileştirmeyi hedefleriz.",
    "İlgili tarafların ISO 22000:2018, kalite ve helal gıda bilincini artırmaya yönelik faaliyetler yürütürüz.",
    "Yasal yükümlülüklerimize; yürürlükteki ISO 22000:2018, OIC/SMIIC 1:2019, Türk Gıda Kodeksi ve helal gıdayla ilgili mevzuata; üyesi olduğumuz kuruluşların şartlarına uymayı taahhüt ederiz.",
    "Müşterilerimize ve çalışanlarımıza sunulan ürünlerin güvenli, kaliteli ve helal olmasını sağlamak amacıyla ISO 22000:2018 ve OIC/SMIIC 1:2019 Helal Gıda Yönetim Sistemi şartlarını uygulamayı ve etkinliğini sürekli iyileştirmeyi taahhüt ederiz.",
    "Kuruluşumuzda gıda güvenliği ve helal gıda konusunda tüm çalışanlarımızın bilgi ve becerilerini artırmak için eğitimler planlar, uygular ve etkinliğini izleriz.",
    "Bilimsel ve teknolojik gelişmeleri takip ederek müşteri beklentilerini kalite, güvenlik ve helal gerekliliklerine uygun biçimde karşılamak ve aşmak için yenilikleri işletmemize entegre ederiz.",
    "Tüm çalışanlarımız, yürürlükteki ISO 22000:2018, Kalite Yönetim Sistemi ve Helal Gıda Yönetim Sistemi ile uyumlu üretimi sağlamak için yönetimle birlikte çalışır ve helal bütünlüğünün korunmasına etkin biçimde katkı sağlar.",
  ] as const,
  privacy: [
    { title: "Genel yaklaşım", paragraphs: [
      "Bu kurumsal vitrin sitesi ürünlerimizi, hizmet alanlarımızı, tesislerimizi ve iletişim kanallarımızı tanıtmak için hazırlanmıştır. Sitede üyelik, sipariş, ödeme veya iletişim formu bulunmaz.",
      "Bizimle telefon ya da e-posta yoluyla iletişim kurmayı seçerseniz paylaştığınız bilgiler iletişimin niteliğine göre değerlendirilebilir. Bu sayfa, veri işleme amaçları, hukuki sebepleri, alıcıları ve saklama süreleri kesinleştirilmiş bir KVKK aydınlatma metni değildir.",
    ] },
    { title: "Üçüncü taraf bağlantıları", paragraphs: [
      "Sitedeki harita araması ve diğer dış bağlantılar ayrı web sitelerine yönlendirebilir. Bu sitelerin içerikleri ve gizlilik uygulamaları kendi kurallarına tabidir; bağlantıyı açmadan önce ilgili sitenin açıklamalarını inceleyebilirsiniz.",
    ] },
    { title: "E-posta güvenliği", paragraphs: [
      "E-posta iletinizin içeriğini göndermeden önce gözden geçirin; şifre veya ödeme kartı bilgisi gibi hassas bilgileri e-postaya yazmayın. E-posta iletiminin mutlak gizliliği garanti edilemez.",
    ] },
    { title: "Yasal bilgi talepleri", paragraphs: [
      "Yetkili idari veya adli makamların usulüne uygun bilgi talepleri, yürürlükteki hukuki yükümlülükler çerçevesinde değerlendirilebilir.",
    ] },
  ] as const,
  cookies: [
    "Bu kurumsal sitede üyelik, sepet, reklam veya analitik amaçlı bir çerez altyapısı kurulmamıştır. Harita bağlantısı gibi dış siteler açıldığında, ilgili hizmetlerin kendi çerez ve gizlilik kuralları geçerli olabilir.",
    "Tarayıcı ayarlarınızdan çerezleri görüntüleyebilir veya yönetebilirsiniz. Web erişimine ilişkin teknik kayıtlar ve bunların işlenme koşulları, yalnızca bu sitede bir çerez arayüzü bulunmamasından çıkarılamaz.",
  ] as const,
} as const;
