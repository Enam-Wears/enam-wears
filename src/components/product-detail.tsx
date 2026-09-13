"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";
import { ProductGrid } from "../components/product-grid";
import { ProductOptions } from "../components/product-options";
import {
  formatCategory,
  formatDepartment,
  getProductPriceRange,
  type Product,
} from "../lib/catalog";
import { formatPriceRange } from "../lib/format";

type ProductDetailProps = {
  product: Product;
  relatedProducts: Product[];
};

export function ProductDetail({
  product,
  relatedProducts,
}: ProductDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [product.slug]);

  const activeImage =
    product.images[activeImageIndex] ?? product.images[0];

  function handleColorChange(color: string) {
    const colorOption = product.colors.find(
      (candidate) => candidate.name === color,
    );

    if (!colorOption) {
      return;
    }

    setActiveImageIndex(
      Math.min(
        colorOption.imageIndex,
        product.images.length - 1,
      ),
    );
  }

  return (
    <section className="product-page">
      <div className="content-wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/shop/${product.department}`}>
            {formatDepartment(product.department)}
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-layout">
          <div className="product-gallery">
            <div className="product-gallery__main">
              <img
                className="gallery-image"
                src={activeImage}
                alt={product.name}
              />
            </div>

            <div className="gallery-thumbnails">
              {product.images.map((image, index) => (
                <button
                  className={`gallery-thumbnail ${
                    activeImageIndex === index
                      ? "gallery-thumbnail--active"
                      : ""
                  }`}
                  type="button"
                  key={image}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`View image ${index + 1} of ${
                    product.name
                  }`}
                  aria-pressed={activeImageIndex === index}
                >
                  <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info">
            <p className="product-info__category">
              {formatDepartment(product.department)} /{" "}
              {formatCategory(product.category)}
            </p>

            <h1 className="product-info__title">
              {product.name}
            </h1>

            <p className="product-price">
              {formatPriceRange(getProductPriceRange(product))}
            </p>

            <p className="product-info__intro">
              {product.description}
            </p>

            <ProductOptions
              product={product}
              onColorChange={handleColorChange}
            />

            <div className="product-accordions">
              <details className="product-accordion" open>
                <summary>Product Details</summary>
                <div className="product-accordion__content">
                  <ul>
                    {product.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </details>

              <details className="product-accordion">
                <summary>Size Guide</summary>
                <div className="product-accordion__content">
                  <p>{product.sizeGuide}</p>
                </div>
              </details>

              <details className="product-accordion">
                <summary>Delivery & Returns</summary>
                <div className="product-accordion__content">
                  <p>
                    Delivery rates, delivery zones, pickup options, and
                    return policy details will be configured before the
                    checkout launch.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {relatedProducts.length ? (
          <section className="related-products">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Complete the look</p>
                <h2 className="section-title">
                  You may also like.
                </h2>
              </div>
            </div>

            <ProductGrid products={relatedProducts} />
          </section>
        ) : null}
      </div>
    </section>
  );
}
