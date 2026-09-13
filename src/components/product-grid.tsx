"use client";

import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/catalog";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
