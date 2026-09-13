import { notFound } from "next/navigation";
import { CatalogBrowser } from "@/components/catalog-browser";
import {
  getCollectionMeta,
  getProductsForCollection,
  shopCollectionSlugs
} from "@/lib/catalog";

export function generateStaticParams() {
  return shopCollectionSlugs.map((collection) => ({ collection }));
}

export default async function CollectionPage({
  params
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const meta = getCollectionMeta(collection);

  if (!meta || meta.slug === "best-sellers") {
    notFound();
  }

  const products = getProductsForCollection(meta.slug);

  return (
    <>
      <section className="page-hero">
        <div className="content-wrap page-hero__content">
          <p className="eyebrow">Enam Wears / Collection</p>
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
        </div>
      </section>

      <CatalogBrowser
        sourceProducts={products}
        title={meta.title}
        description={meta.description}
      />
    </>
  );
}
