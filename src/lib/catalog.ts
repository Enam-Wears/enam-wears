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

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1500&q=88`;

function makeVariants(
  productSlug: string,
  skuRoot: string,
  colors: ColorOption[],
  sizes: string[],
  stockMatrix: number[][]
): ProductVariant[] {
  return colors.flatMap((color, colorIndex) =>
    sizes.map((size, sizeIndex) => ({
      id: `${productSlug}-${color.code.toLowerCase()}-${size.toLowerCase()}`,
      sku: `${skuRoot}-${color.code}-${size}`,
      color: color.name,
      size,
      stock: stockMatrix[colorIndex]?.[sizeIndex] ?? 0,
      price: null,
      compareAtPrice: null
    }))
  );
}

const onyxStoneVolt: ColorOption[] = [
  { name: "Onyx", hex: "#161616", code: "ONX", imageIndex: 0 },
  { name: "Stone", hex: "#BBB4AA", code: "STN", imageIndex: 1 },
  { name: "Volt", hex: "#D8FF3E", code: "VLT", imageIndex: 2 }
];

const onyxAsh: ColorOption[] = [
  { name: "Onyx", hex: "#161616", code: "ONX", imageIndex: 0 },
  { name: "Ash", hex: "#A9AAA5", code: "ASH", imageIndex: 1 }
];

const espressoCloudCherry: ColorOption[] = [
  { name: "Espresso", hex: "#3E2D27", code: "ESP", imageIndex: 0 },
  { name: "Cloud", hex: "#EBE8DE", code: "CLD", imageIndex: 1 },
  { name: "Cherry", hex: "#A01D2C", code: "CHR", imageIndex: 2 }
];

const blackCobalt: ColorOption[] = [
  { name: "Black", hex: "#121212", code: "BLK", imageIndex: 0 },
  { name: "Cobalt", hex: "#1D5FAF", code: "CBT", imageIndex: 1 }
];

const mossOnyx: ColorOption[] = [
  { name: "Moss", hex: "#526149", code: "MSS", imageIndex: 0 },
  { name: "Onyx", hex: "#161616", code: "ONX", imageIndex: 1 }
];

const boneOnyx: ColorOption[] = [
  { name: "Bone", hex: "#E6E0D4", code: "BNE", imageIndex: 0 },
  { name: "Onyx", hex: "#161616", code: "ONX", imageIndex: 1 }
];

/**
 * Temporary preview catalog.
 *
 * Replace this data with database/catalog imports once product details,
 * pricing, final descriptions, and Drive image mappings are available.
 */
export const catalog: Product[] = [
  {
    id: "p-core-motion-tee",
    slug: "core-motion-tee",
    name: "Core Motion Tee",
    department: "men",
    category: "tops",
    collections: ["men", "new-in", "best-sellers"],
    isNew: true,
    isPromo: false,
    isFeatured: true,
    isBestSeller: true,
    description:
      "A clean, lightweight training layer for daily movement. Final fabric, fit, and care details will be added from the Enam Wears production catalog.",
    details: [
      "Demo catalog item for storefront preview",
      "Final material composition pending",
      "Final care instructions pending"
    ],
    sizeGuide:
      "Choose your usual size for a standard fit. Final garment measurements will be supplied before launch.",
    images: [
      image("photo-1517836357463-d25dfeac3438"),
      image("photo-1581009146145-b5ef050c2e1e"),
      image("photo-1579758629938-03607ccdbaba")
    ],
    colors: onyxStoneVolt,
    sizes: ["S", "M", "L", "XL"],
    variants: makeVariants(
      "core-motion-tee",
      "ENM-MTN",
      onyxStoneVolt,
      ["S", "M", "L", "XL"],
      [
        [14, 12, 8, 3],
        [8, 7, 4, 0],
        [5, 5, 2, 1]
      ]
    )
  },
  {
    id: "p-ridge-woven-pant",
    slug: "ridge-woven-pant",
    name: "Ridge Woven Pant",
    department: "men",
    category: "bottoms",
    collections: ["men", "best-sellers"],
    isNew: false,
    isPromo: false,
    isFeatured: true,
    isBestSeller: true,
    description:
      "A versatile silhouette designed to move between training, travel, and everyday wear.",
    details: [
      "Demo catalog item for storefront preview",
      "Final fabric composition pending",
      "Final fit and care guidance pending"
    ],
    sizeGuide:
      "Choose your usual waist size. Final waist and inseam measurements will be added before launch.",
    images: [
      image("photo-1506629905607-d405b7a30db6"),
      image("photo-1503342217505-b0a15ec3261e"),
      image("photo-1521572163474-6864f9cf17ab")
    ],
    colors: onyxAsh,
    sizes: ["S", "M", "L", "XL"],
    variants: makeVariants(
      "ridge-woven-pant",
      "ENM-R
