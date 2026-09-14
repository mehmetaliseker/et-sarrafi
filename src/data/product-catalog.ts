export type ProductCategory = "Dana" | "Kuzu";

export interface CatalogProduct {
  id: string;
  category: ProductCategory;
  name: string;
  image: `/images/products/${string}`;
  imageAlt: string;
  shortDescription: string;
  detailParagraphs: readonly [string, string, string];
}

export const catalogProducts: readonly CatalogProduct[] = [
  {
    id: "dana-bonfile",
    category: "Dana",
    name: "Dana Bonfile",
    image: "/images/products/dana-bonfile.png",
    imageAlt: "Çiğ dana bonfile",
    shortDescription: "Dananın sırt bölümünden elde edilen, porsiyonlamaya uygun bir et kesimi.",
    detailParagraphs: [
      "Dana bonfile, dananın sırtının iç bölümünde yer alan uzun bir kas parçasıdır. Bütün bir kesim olarak görülebilir veya hazırlanacak yemeğe göre daha küçük porsiyonlara ayrılabilir. Ürün adının ifade ettiği bölüm ve kesim biçimi, onu diğer dana eti seçeneklerinden ayırır.",
      "Bonfile; madalyon, biftek veya dilim biçiminde kullanıma uygundur. Tava ve ızgara gibi doğrudan pişirme yöntemleri kadar, bütün parça hâlinde yapılan fırın tariflerinde de tercih edilebilir. Parça büyüklüğü ve pişirme yöntemi, hazırlanan tarife göre seçilebilir.",
      "Kurumsal mutfaklarda porsiyonluk sunumlar için, ev mutfağında ise sade et yemekleri veya farklı eşlikçilerle hazırlanan tabaklar için değerlendirilebilir. Ürünün kullanılacağı tarif belirlenirken istenen kesim kalınlığı ve porsiyon biçimi dikkate alınabilir.",
    ],
  },
  {
    id: "dana-antrikot",
    category: "Dana",
    name: "Dana Antrikot",
    image: "/images/products/dana-antrikot.png",
    imageAlt: "Çiğ dana antrikot",
    shortDescription: "Dananın sırt bölümünden çıkarılan, dilimlenerek kullanılabilen bir kesim.",
    detailParagraphs: [
      "Dana antrikot, dananın sırt bölümünden elde edilen bir et kesimidir. Büyükbaş ürünleri arasında yaygın biçimde bilinen bu parça, bütün olarak veya farklı kalınlıklarda dilimlenerek hazırlanabilir. Kesimin hangi biçimde kullanılacağı, planlanan yemeğin sunumuna bağlıdır.",
      "Dilimlenmiş antrikot, tavada ya da ızgarada hazırlanan et tabaklarında kullanılabilir. Daha kalın porsiyonlar tek parça sunuma, daha ince dilimler ise farklı tariflerle birleştirilmeye uygundur. Pişirme yöntemi seçilirken porsiyon kalınlığı göz önünde bulundurulabilir.",
      "Restoran menülerindeki porsiyonluk et yemeklerinden evde hazırlanan ana yemeklere kadar farklı kullanım alanları vardır. Ürün hakkında görüşürken istenen porsiyon biçimini belirtmek, ihtiyaca uygun kesimi değerlendirmeyi kolaylaştırır.",
    ],
  },
  {
    id: "dana-kontrafile",
    category: "Dana",
    name: "Dana Kontrafile",
    image: "/images/products/dana-kontrafile.png",
    imageAlt: "Çiğ dana kontrafile",
    shortDescription: "Sırt hattından elde edilen, farklı kalınlıklarda porsiyonlanabilen dana eti.",
    detailParagraphs: [
      "Dana kontrafile, dananın sırt hattından elde edilen ve bütün parça veya dilim biçiminde değerlendirilebilen bir kesimdir. Biftek olarak hazırlanması mümkün olduğu gibi, daha büyük bir parça hâlinde de tarifte yer alabilir. Sunum biçimi, seçilen kesim kalınlığıyla birlikte düşünülür.",
      "Dilimlenmiş kontrafile, tava ve ızgara uygulamalarında kullanılabilir. Bütün parçanın tercih edildiği yemeklerde fırın yöntemi de bir seçenektir. Her yöntemde amaçlanan yemek ve parçanın büyüklüğü, hazırlık biçimini belirler.",
      "Bireysel porsiyonlar için dilimlenmiş, paylaşımlı sofralar için bütün parça sunum düşünülebilir. Böylece aynı ürün, menü planına ve servis biçimine göre farklı şekillerde değerlendirilebilir.",
    ],
  },
  {
    id: "dana-kusbasi",
    category: "Dana",
    name: "Dana Kuşbaşı",
    image: "/images/products/dana-kusbasi.png",
    imageAlt: "Küp biçiminde doğranmış çiğ dana kuşbaşı",
    shortDescription: "Küp biçiminde doğranmış, çeşitli sıcak yemeklere uygun dana eti parçaları.",
    detailParagraphs: [
      "Dana kuşbaşı, dana etinin küp biçiminde doğranmış hâlidir. Parçaların büyüklüğü, hazırlanacak yemeğin türüne ve istenen sunuma göre değerlendirilebilir. Doğranmış yapısı, ürünü bütün kesimlerden farklı mutfak uygulamalarına uygun kılar.",
      "Tencere yemekleri, sote ve güveç gibi tariflerde kuşbaşı et kullanılabilir. Şiş hazırlığında da parçalar bir araya getirilerek farklı malzemelerle eşleştirilebilir. Tarifin gerektirdiği pişirme süresi ve yöntem, kullanılan parçaların boyutuyla birlikte düşünülmelidir.",
      "Toplu yemek hazırlıklarında veya günlük mutfak planlamasında önceden doğranmış et biçimi pratik bir seçenek sunar. Kullanım amacını belirlemek, hangi doğrama ve porsiyon biçiminin uygun olacağını değerlendirmeye yardımcı olur.",
    ],
  },
  {
    id: "dana-kiyma",
    category: "Dana",
    name: "Dana Kıyma",
    image: "/images/products/dana-kiyma.png",
    imageAlt: "Çekilmiş çiğ dana kıyma",
    shortDescription: "Çekilmiş dana etinden oluşan, farklı yemek hazırlıklarında kullanılabilen ürün.",
    detailParagraphs: [
      "Dana kıyma, dana etinin çekilerek küçük parçalı bir yapıya getirilmesiyle oluşur. Bütün et kesimlerinden farklı olarak başka malzemelerle kolayca karıştırılabilir ve çeşitli şekiller verilerek hazırlanabilir. Kullanım alanı, tarifin içeriğine göre değişir.",
      "Köfte, dolma, makarna sosu ve tencere yemekleri kıymanın değerlendirilebildiği tarifler arasındadır. Soğan, sebze ve baharat gibi malzemelerle birlikte kullanılabilir. Tarif için seçilen hazırlama ve pişirme yöntemi, ortaya çıkacak yemeğin biçimini belirler.",
      "Ev mutfağında tek öğünlük tariflerden kurumsal mutfaklarda çok porsiyonlu yemeklere kadar farklı hazırlıklarda yer bulur. Ürün seçerken planlanan tarif ve gerekli porsiyon miktarı birlikte ele alınabilir.",
    ],
  },
  {
    id: "kuzu-kusleme",
    category: "Kuzu",
    name: "Kuzu Küşleme",
    image: "/images/products/kuzu-kusleme.png",
    imageAlt: "Çiğ kuzu küşleme",
    shortDescription: "Kuzunun iç bölümünden elde edilen, küçük porsiyonlar hâlinde sunulan kesim.",
    detailParagraphs: [
      "Kuzu küşleme, kuzunun böbreklerinin üzerinde ve içe bakan bölümünde bulunan küçük bir et parçasıdır. Küçük bir kesim olması, bütün hâlde sunumun yanında porsiyonlara ayrılarak kullanılmasına da olanak verir. Kuzu ürünleri arasında konumu ve biçimiyle ayırt edilir.",
      "Tava ve ızgara, bu kesimin değerlendirilebildiği pişirme yöntemleridir. Bütün parça olarak sade bir sunum hazırlanabilir veya tarifin gereğine göre parçalara ayrılabilir. Eşlik edecek malzemeler ve servis biçimi, yemeğin planına göre seçilebilir.",
      "Porsiyonluk et tabaklarında veya kuzu eti odaklı menülerde kullanılabilecek bir seçenektir. Ürünün kullanımını planlarken parça biçimi, kişi sayısı ve sunum yaklaşımı birlikte değerlendirilebilir.",
    ],
  },
] as const;
