export type DepartmentSlug = "men" | "women";

export type ProductCategory =
  | "tops"
  | "bottoms"
  | "outerwear"
  | "sets";

export type CollectionSlug =
  | "men"
  | "women"
  | "new-in"
  | "promo-sales"
  | "best-sellers";

export type ColorOption = {
  name: string;
  hex: string;
  code: string;
  imageIndex: number;
};

export type ProductVariant = {
  id: string;
  sku: string;
  color: string;
  size: string;
  stock: number;
  price: number | null;
  compareAtPrice: number | null;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  department: DepartmentSlug;
  category: ProductCategory;
  collections: CollectionSlug[];
  isNew: boolean;
  isPromo: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  description: string;
  details: string[];
  sizeGuide: string;
  images: string[];
  colors: ColorOption[];
  sizes: string[];
  variants: ProductVariant[];
};

export type CollectionMeta = {
  slug: CollectionSlug;
  title: string;
  description: string;
};

const image = (imageId: string) =>
  `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=1500&q=88`;

function makeVariants(
  productSlug: string,
  skuRoot: string,
  colors: ColorOption[],
  sizes: string[],
  stockMatrix: number[][],
): ProductVariant[] {
  return colors.flatMap((color, colorIndex) =>
    sizes.map((size, sizeIndex) => ({
      id: `${productSlug}-${color.code.toLowerCase()}-${size.toLowerCase()}`,
      sku: `${skuRoot}-${color.code}-${size}`,
      color: color.name,
      size,
      stock: stockMatrix[colorIndex]?.[sizeIndex] ?? 0,
      price: null,
      compareAtPrice: null,
    })),
  );
}

type ProductDraft = Omit<Product, "id" | "variants"> & {
  skuRoot: string;
  stock: number[][];
};

function createProduct({
  skuRoot,
  stock,
  ...product
}: ProductDraft): Product {
  return {
    ...product,
    id: `product-${product.slug}`,
    variants: makeVariants(
      product.slug,
      skuRoot,
      product.colors,
      product.sizes,
      stock,
    ),
  };
}

const onyxStoneVolt: ColorOption[] = [
  { name: "Onyx", hex: "#151515", code: "ONX", imageIndex: 0 },
  { name: "Stone", hex: "#B9B2A8", code: "STN", imageIndex: 1 },
  { name: "Volt", hex: "#D8FF3E", code: "VLT", imageIndex: 2 },
];

const onyxAsh: ColorOption[] = [
  { name: "Onyx", hex: "#151515", code: "ONX", imageIndex: 0 },
  { name: "Ash", hex: "#A6A7A2", code: "ASH", imageIndex: 1 },
];

const espressoCloudCherry: ColorOption[] = [
  { name: "Espresso", hex: "#3C2C28", code: "ESP", imageIndex: 0 },
  { name: "Cloud", hex: "#EEECE4", code: "CLD", imageIndex: 1 },
  { name: "Cherry", hex: "#A01D2C", code: "CHR", imageIndex: 2 },
];

const blackCobalt: ColorOption[] = [
  { name: "Black", hex: "#151515", code: "BLK", imageIndex: 0 },
  { name: "Cobalt", hex: "#1D5FAF", code: "CBT", imageIndex: 1 },
];

const mossOnyx: ColorOption[] = [
  { name: "Moss", hex: "#526149", code: "MSS", imageIndex: 0 },
  { name: "Onyx", hex: "#151515", code: "ONX", imageIndex: 1 },
];

const boneOnyx: ColorOption[] = [
  { name: "Bone", hex: "#E6E0D4", code: "BNE", imageIndex: 0 },
  { name: "Onyx", hex: "#151515", code: "ONX", imageIndex: 1 },
];

/**
 * Temporary preview catalog.
 *
 * Product imagery, prices, descriptions, sizing details, and inventory
 * will be replaced by the Enam Wears catalog and Google Drive import.
 */
export const catalog: Product[] = [
  createProduct({
    slug: "core-motion-tee",
    name: "Core Motion Tee",
    department: "men",
    category: "tops",
    collections: ["men", "new-in", "best-sellers"],
    isNew: true,
    isPromo: false,
    isFeatured: true,
    isBestSeller: true,
    skuRoot: "ENM-MTN",
    description:
      "A lightweight everyday training layer built around a clean, confident silhouette.",
    details: [
      "Preview product for the Enam Wears storefront.",
      "Final fabric composition will be added before launch.",
      "Final fit and care guidance will come from the production catalog.",
    ],
    sizeGuide:
      "Choose your usual size for a standard fit. Final garment measurements will be supplied before launch.",
    images: [
      image("photo-1517836357463-d25dfeac3438"),
      image("photo-1581009146145-b5ef050c2e1e"),
      image("photo-1579758629938-03607ccdbaba"),
    ],
    colors: onyxStoneVolt,
    sizes: ["S", "M", "L", "XL"],
    stock: [
      [14, 12, 8, 3],
      [8, 7, 4, 0],
      [5, 5, 2, 1],
    ],
  }),

  createProduct({
    slug: "ridge-woven-pant",
    name: "Ridge Woven Pant",
    department: "men",
    category: "bottoms",
    collections: ["men", "new-in", "best-sellers"],
    isNew: true,
    isPromo: false,
    isFeatured: true,
    isBestSeller: true,
    skuRoot: "ENM-RWP",
    description:
      "A versatile movement-ready pant designed for training, travel, and daily wear.",
    details: [
      "Preview product for the Enam Wears storefront.",
      "Final fabric composition will be added before launch.",
      "Final fit and care guidance will come from the production catalog.",
    ],
    sizeGuide:
      "Choose your usual waist size. Final waist and inseam measurements will be supplied before launch.",
    images: [
      image("photo-1506629905607-d405b7a30db6"),
      image("photo-1503342217505-b0a15ec3261e"),
      image("photo-1521572163474-6864f9cf17ab"),
    ],
    colors: onyxAsh,
    sizes: ["S", "M", "L", "XL"],
    stock: [
      [9, 11, 6, 2],
      [6, 7, 3, 0],
    ],
  }),

  createProduct({
    slug: "layered-track-jacket",
    name: "Layered Track Jacket",
    department: "men",
    category: "outerwear",
    collections: ["men", "promo-sales"],
    isNew: false,
    isPromo: true,
    isFeatured: true,
    isBestSeller: false,
    skuRoot: "ENM-LTJ",
    description:
      "A structured outer layer with an athletic edge and an easy everyday feel.",
    details: [
      "Preview product for the Enam Wears storefront.",
      "Final fabric composition will be added before launch.",
      "Final fit and care guidance will come from the production catalog.",
    ],
    sizeGuide:
      "Choose your usual size for a standard fit. Size up for a more relaxed layered look.",
    images: [
      image("photo-1551488831-00ddcb6c6bd3"),
      image("photo-1501196354995-cbb51c65aaea"),
      image("photo-1492562080023-ab3db95bfbce"),
    ],
    colors: boneOnyx,
    sizes: ["S", "M", "L", "XL"],
    stock: [
      [5, 8, 4, 2],
      [8, 5, 3, 1],
    ],
  }),

  createProduct({
    slug: "essential-fleece-hoodie",
    name: "Essential Fleece Hoodie",
    department: "men",
    category: "outerwear",
    collections: ["men", "promo-sales", "best-sellers"],
    isNew: false,
    isPromo: true,
    isFeatured: false,
    isBestSeller: true,
    skuRoot: "ENM-EFH",
    description:
      "A premium off-duty layer made to work before training, after training, and everywhere else.",
    details: [
      "Preview product for the Enam Wears storefront.",
      "Final fabric composition will be added before launch.",
      "Final fit and care guidance will come from the production catalog.",
    ],
    sizeGuide:
      "Choose your usual size for a regular fit. Size up if you prefer an oversized silhouette.",
    images: [
      image("photo-1521572163474-6864f9cf17ab"),
      image("photo-1576566588028-4147f3842f27"),
      image("photo-1556821840-3a63f95609a7"),
    ],
    colors: boneOnyx,
    sizes: ["S", "M", "L", "XL"],
    stock: [
      [7, 9, 5, 2],
      [8, 7, 4, 1],
    ],
  }),

  createProduct({
    slug: "form-rib-crop-top",
    name: "Form Rib Crop Top",
    department: "women",
    category: "tops",
    collections: ["women", "new-in", "best-sellers"],
    isNew: true,
    isPromo: false,
    isFeatured: true,
    isBestSeller: true,
    skuRoot: "ENM-FRC",
    description:
      "A confident fitted training layer with a clean cut and a versatile studio-to-street feel.",
    details: [
      "Preview product for the Enam Wears storefront.",
      "Final fabric composition will be added before launch.",
      "Final fit and care guidance will come from the production catalog.",
    ],
    sizeGuide:
      "Choose your usual size for a close fit. Final bust and body measurements will be added before launch.",
    images: [
      image("photo-1515886657613-9f3515b0c78f"),
      image("photo-1485230895905-ec40ba36b9bc"),
      image("photo-1496747611176-843222e1e57c"),
    ],
    colors: espressoCloudCherry,
    sizes: ["XS", "S", "M", "L"],
    stock: [
      [9, 12, 8, 3],
      [7, 8, 5, 2],
      [4, 5, 2, 0],
    ],
  }),

  createProduct({
    slug: "studio-sculpt-legging",
    name: "Studio Sculpt Legging",
    department: "women",
    category: "bottoms",
    collections: ["women", "promo-sales", "best-sellers"],
    isNew: false,
    isPromo: true,
    isFeatured: true,
    isBestSeller: true,
    skuRoot: "ENM-SSL",
    description:
      "A streamlined training essential designed for focused movement and all-day confidence.",
    details: [
      "Preview product for the Enam Wears storefront.",
      "Final fabric composition will be added before launch.",
      "Final fit and care guidance will come from the production catalog.",
    ],
    sizeGuide:
      "Choose your normal size for a supportive fit. Final waist and inseam measurements will be added before launch.",
    images: [
      image("photo-1518611012118-696072aa579a"),
      image("photo-1552674605-db6ffd4facb5"),
      image("photo-1483721310020-03333e577078"),
    ],
    colors: blackCobalt,
    sizes: ["XS", "S", "M", "L"],
    stock: [
      [11, 15, 9, 3],
      [6, 8, 4, 1],
    ],
  }),

  createProduct({
    slug: "velocity-training-set",
    name: "Velocity Training Set",
    department: "women",
    category: "sets",
    collections: ["women", "promo-sales"],
    isNew: false,
    isPromo: true,
    isFeatured: true,
    isBestSeller: false,
    skuRoot: "ENM-VTS",
    description:
      "A coordinated training set designed to make getting dressed for movement feel effortless.",
    details: [
      "Preview product for the Enam Wears storefront.",
      "Final fabric composition will be added before launch.",
      "Final fit and care guidance will come from the production catalog.",
    ],
    sizeGuide:
      "Choose your usual size. Final top and bottom measurements will be added before launch.",
    images: [
      image("photo-1506157786151-b8491531f063"),
      image("photo-1538805060514-97d9cc17730c"),
      image("photo-1599058917212-d750089bc07e"),
    ],
    colors: mossOnyx,
    sizes: ["XS", "S", "M", "L"],
    stock: [
      [7, 8, 5, 2],
      [8, 10, 6, 3],
    ],
  }),

  createProduct({
    slug: "pulse-running-jacket",
    name: "Pulse Running Jacket",
    department: "women",
    category: "outerwear",
    collections: ["women", "new-in"],
    isNew: true,
    isPromo: false,
    isFeatured: false,
    isBestSeller: false,
    skuRoot: "ENM-PRJ",
    description:
      "A lightweight outer layer made for warmups, cool-downs, and movement beyond the gym.",
    details: [
      "Preview product for the Enam Wears storefront.",
      "Final fabric composition will be added before launch.",
      "Final fit and care guidance will come from the production catalog.",
    ],
    sizeGuide:
      "Choose your normal size for a standard fit. Final garment measurements will be added before launch.",
    images: [
      image("photo-1534438327276-14e5300c3a48"),
      image("photo-1574680096145-d05b474e2155"),
      image("photo-1488426862026-3ee34a7d66df"),
    ],
    colors: blackCobalt,
    sizes: ["XS", "S", "M", "L"],
    stock: [
      [5, 8, 7, 2],
      [4, 6, 3, 1],
    ],
  }),
];

const collectionMeta: Record<CollectionSlug, CollectionMeta> = {
  men: {
    slug: "men",
    title: "Men",
    description:
      "Movement-ready essentials with clean lines, strong layers, and everyday versatility.",
  },
  women: {
    slug: "women",
    title: "Women",
    description:
      "Confident performance-inspired apparel designed to move with your day.",
  },
  "new-in": {
    slug: "new-in",
    title: "New In",
    description:
      "Fresh Enam Wears arrivals built for movement, confidence, and everyday energy.",
  },
  "promo-sales": {
    slug: "promo-sales",
    title: "Promo Sales",
    description:
      "Selected Enam Wears pieces available while current promotional stock lasts.",
  },
  "best-sellers": {
    slug: "best-sellers",
    title: "Best Sellers",
    description:
      "The pieces customers keep coming back for.",
  },
};

export const shopCollectionSlugs = [
  "men",
  "women",
  "new-in",
  "promo-sales",
] as const;

function isCollectionSlug(value: string): value is CollectionSlug {
  return Object.prototype.hasOwnProperty.call(collectionMeta, value);
}

export function getCollectionMeta(
  slug: string,
): CollectionMeta | null {
  if (!isCollectionSlug(slug)) {
    return null;
  }

  return collectionMeta[slug];
}

export function getProductsForCollection(
  collection: CollectionSlug,
): Product[] {
  return catalog.filter((product) =>
    product.collections.includes(collection),
  );
}

export function getProductBySlug(
  slug: string,
): Product | null {
  return catalog.find((product) => product.slug === slug) ?? null;
}

export function getVariant(
  product: Product,
  color: string,
  size: string,
): ProductVariant | null {
  return (
    product.variants.find(
      (variant) =>
        variant.color === color && variant.size === size,
    ) ?? null
  );
}

export function getProductImageForColor(
  product: Product,
  color: string,
): string {
  const colorOption = product.colors.find(
    (option) => option.name === color,
  );

  return product.images[colorOption?.imageIndex ?? 0] ?? product.images[0];
}

export function getProductPriceRange(product: Product): {
  min: number;
  max: number;
} | null {
  const prices = product.variants
    .map((variant) => variant.price)
    .filter((price): price is number => price !== null);

  if (!prices.length) {
    return null;
  }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export function getRelatedProducts(
  product: Product,
  limit = 4,
): Product[] {
  return catalog
    .filter((candidate) => candidate.id !== product.id)
    .sort((first, second) => {
      const score = (candidate: Product) =>
        Number(candidate.department === product.department) * 4 +
        Number(candidate.category === product.category) * 3 +
        Number(candidate.isBestSeller) * 2 +
        Number(candidate.isNew);

      return score(second) - score(first);
    })
    .slice(0, limit);
}

export function searchCatalog(query: string): Product[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return catalog.filter((product) => {
    const searchable = [
      product.name,
      product.department,
      product.category,
      ...product.collections,
      ...product.colors.map((color) => color.name),
      ...product.variants.map((variant) => variant.sku),
    ]
      .join(" ")
      .toLocaleLowerCase();

    return searchable.includes(normalizedQuery);
  });
}

export function formatCategory(
  category: ProductCategory,
): string {
  return category.replace(/(^|-)(\w)/g, (_, prefix, letter) => {
    return `${prefix}${letter.toUpperCase()}`;
  });
}

export function formatDepartment(
  department: DepartmentSlug,
): string {
  return department === "men" ? "Men" : "Women";
}
