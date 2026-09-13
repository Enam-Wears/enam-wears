import type { CartItem } from "@/lib/cart-types";
import {
  getProductBySlug,
  type Product,
  type ProductVariant,
} from "@/lib/catalog";

export type ResolvedCartLine = {
  item: CartItem;
  product: Product;
  variant: ProductVariant;
};

export function resolveCartLines(
  items: CartItem[],
): ResolvedCartLine[] {
  return items.flatMap((item) => {
    const product = getProductBySlug(item.productSlug);

    if (!product) {
      return [];
    }

    const variant = product.variants.find(
      (candidate) => candidate.id === item.variantId,
    );

    if (!variant) {
      return [];
    }

    return [{ item, product, variant }];
  });
}

export function getCartSubtotal(
  lines: ResolvedCartLine[],
): number | null {
  if (!lines.length) {
    return 0;
  }

  if (lines.some((line) => line.variant.price === null)) {
    return null;
  }

  return lines.reduce(
    (total, line) =>
      total + (line.variant.price ?? 0) * line.item.quantity,
    0,
  );
}
