import type { MediaKey, ProductImageKey } from "@/data/media";
export interface CatalogGroup { id: string; title: string; description: string; media: MediaKey; }
export const productGroups: readonly CatalogGroup[] = [
  {
    "id": "buyukbas",
    "title": "Büyükbaş ürünleri",
    "description": "Dana bonfile, antrikot, nuar ve döş gibi büyükbaş et kesimleri.",
    "media": "beef"
  },
  {
    "id": "kucukbas",
    "title": "Küçükbaş ürünleri",
    "description": "Kuzu küşleme ve kuzu kafes gibi küçükbaş et kesimleri.",
    "media": "lamb"
  },
  {
    "id": "karkas-et",
    "title": "Karkas et ürünleri",
    "description": "Dana, sığır, düve, koyun ve kuzu karkas ürünleri.",
    "media": "carcass"
  },
  {
    "id": "sakatat",
    "title": "Sakatat",
    "description": "Büyükbaş ve küçükbaş sakatat çeşitleri.",
    "media": "offal"
  },
  {
    "id": "islenmis-etler",
    "title": "İşlenmiş etler",
    "description": "İşlenmiş et ürünleri hakkında bilgi için iletişime geçebilirsiniz.",
    "media": "processed"
  },
  {
    "id": "mamul-urunler",
    "title": "Mamul grubu",
    "description": "Mamul ürünler hakkında bilgi için iletişime geçebilirsiniz.",
    "media": "prepared"
  }
];
export interface ProductDetail { slug: string; title: string; family: string; familyId: string; description: string; media: ProductImageKey; source: string; }
export const productDetails: readonly ProductDetail[] = [
  {
    "slug": "dana-bonfile",
    "title": "Dana bonfile",
    "family": "Büyükbaş ürünleri",
    "familyId": "buyukbas",
    "description": "Dana bonfile, dananın sırtının arka bölümünde yer alan bir kas parçasıdır. Büyükbaş et ürünleri arasında yer alır.",
    "media": "bonfile",
    "source": "https://www.etsarrafi.com/urun/dana-dos-1"
  },
  {
    "slug": "dana-antrikot",
    "title": "Dana antrikot",
    "family": "Büyükbaş ürünleri",
    "familyId": "buyukbas",
    "description": "Dana antrikot, büyükbaş ürün grubumuzdaki dana eti kesimlerinden biridir.",
    "media": "antrikot",
    "source": "https://www.etsarrafi.com/kategori/buyuk-bas"
  },
  {
    "slug": "dana-nuar",
    "title": "Dana nuar",
    "family": "Büyükbaş ürünleri",
    "familyId": "buyukbas",
    "description": "Dana nuar, büyükbaş et ürünlerimiz arasında yer alır.",
    "media": "nuar",
    "source": "https://www.etsarrafi.com/kategori/buyuk-bas"
  },
  {
    "slug": "dana-dos",
    "title": "Dana döş",
    "family": "Büyükbaş ürünleri",
    "familyId": "buyukbas",
    "description": "Dana döş, büyükbaş ürün grubumuzda bulunan et kesimlerinden biridir.",
    "media": "dos",
    "source": "https://www.etsarrafi.com/kategori/buyuk-bas"
  },
  {
    "slug": "kuzu-kusleme",
    "title": "Kuzu küşleme",
    "family": "Küçükbaş ürünleri",
    "familyId": "kucukbas",
    "description": "Kuzu küşleme, kuzunun böbreklerinin üzerinde, içe bakan bölümden elde edilen et parçasıdır. Küçükbaş et ürünleri arasında yer alır.",
    "media": "kusleme",
    "source": "https://www.etsarrafi.com/urun/dana-dos-1-1-1-2"
  },
  {
    "slug": "kuzu-kafes",
    "title": "Kuzu kafes",
    "family": "Küçükbaş ürünleri",
    "familyId": "kucukbas",
    "description": "Kuzu kafes, küçükbaş ürün grubumuzdaki kuzu eti kesimlerinden biridir.",
    "media": "kafes",
    "source": "https://www.etsarrafi.com/kategori/kucuk-bas"
  },
  {
    "slug": "dana-karkas",
    "title": "Dana karkas",
    "family": "Karkas et ürünleri",
    "familyId": "karkas-et",
    "description": "Dana karkas, büyükbaş karkas et ürünlerimiz arasında yer alır.",
    "media": "danaCarcass",
    "source": "https://www.etsarrafi.com/"
  },
  {
    "slug": "sigir-karkas",
    "title": "Sığır karkas",
    "family": "Karkas et ürünleri",
    "familyId": "karkas-et",
    "description": "Sığır karkas, büyükbaş karkas ürün grubumuzun bir parçasıdır.",
    "media": "sigirCarcass",
    "source": "https://www.etsarrafi.com/"
  },
  {
    "slug": "duve-karkas",
    "title": "Düve karkas",
    "family": "Karkas et ürünleri",
    "familyId": "karkas-et",
    "description": "Düve karkas, büyükbaş karkas et ürünlerimiz arasında yer alır.",
    "media": "duveCarcass",
    "source": "https://www.etsarrafi.com/"
  },
  {
    "slug": "koyun-karkas",
    "title": "Koyun karkas",
    "family": "Karkas et ürünleri",
    "familyId": "karkas-et",
    "description": "Koyun karkas, küçükbaş karkas ürün grubumuzun bir parçasıdır.",
    "media": "koyunCarcass",
    "source": "https://www.etsarrafi.com/"
  },
  {
    "slug": "kuzu-karkas",
    "title": "Kuzu karkas",
    "family": "Karkas et ürünleri",
    "familyId": "karkas-et",
    "description": "Kuzu karkas, küçükbaş karkas et ürünlerimiz arasında yer alır.",
    "media": "kuzuCarcass",
    "source": "https://www.etsarrafi.com/"
  },
  {
    "slug": "dana-ciger",
    "title": "Dana ciğer",
    "family": "Sakatat",
    "familyId": "sakatat",
    "description": "Dana ciğer, büyükbaş hayvanlardan elde edilen sakatat çeşitlerimizdendir.",
    "media": "danaCiger",
    "source": "https://www.etsarrafi.com/kategori/sakatat"
  },
  {
    "slug": "dana-iskembe",
    "title": "Dana işkembe",
    "family": "Sakatat",
    "familyId": "sakatat",
    "description": "Dana işkembe, büyükbaş sakatat ürünlerimiz arasında yer alır.",
    "media": "iskembe",
    "source": "https://www.etsarrafi.com/kategori/sakatat"
  },
  {
    "slug": "kuzu-bobrek",
    "title": "Kuzu böbrek",
    "family": "Sakatat",
    "familyId": "sakatat",
    "description": "Kuzu böbrek, küçükbaş sakatat ürünlerimiz arasında yer alır.",
    "media": "bobrek",
    "source": "https://www.etsarrafi.com/kategori/sakatat"
  },
  {
    "slug": "kuzu-ciger",
    "title": "Kuzu ciğer",
    "family": "Sakatat",
    "familyId": "sakatat",
    "description": "Kuzu ciğer, küçükbaş hayvanlardan elde edilen sakatat çeşitlerimizdendir.",
    "media": "kuzuCiger",
    "source": "https://www.etsarrafi.com/kategori/sakatat"
  },
  {
    "slug": "dil",
    "title": "Dil",
    "family": "Sakatat",
    "familyId": "sakatat",
    "description": "Dil, sakatat ürün grubumuzda yer alan ürünlerden biridir.",
    "media": "dil",
    "source": "https://www.etsarrafi.com/kategori/sakatat"
  }
];
