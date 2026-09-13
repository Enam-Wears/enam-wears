import { notFound } from "next/navigation";
import { ProductDetail } from "./../../../components/product-detail";
import { catalog, getProductBySlug, getRelatedProducts } from "./../../../lib/catalog";

export function generateStaticParams() {
  return catalog.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetail
      product={product}
      relatedProducts={getRelatedProducts(product, 4)}
    />
  );
}
