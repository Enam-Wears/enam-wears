"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight, Eye, X } from "lucide-react";
import {
  useEffect,
  useState,
} from "react";
import { ProductOptions } from "../components/product-options";
import {
  formatDepartment,
  getProductPriceRange,
  type Product,
} from "../lib/catalog";
import { formatPriceRange } from "../lib/format";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({
  product,
}: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <>
      <article className="product-card">
        <div className="product-card__media">
          <Link
            href={`/products/${product.slug}`}
            aria-label={`View ${product.name}`}
            style={{ display: "block", height: "100%" }}
          >
            <img
              className="product-card__image"
              src={product.images[0]}
              alt={product.name}
            />

            <img
              className="product-card__image product-card__image--hover"
              src={product.images[1] ?? product.images[0]}
              alt=""
              aria-hidden="true"
            />
          </Link>

          <div className="product-card__badges">
            {product.isNew ? <span className="badge">New</span> : null}
            {product.isPromo ? (
              <span className="badge badge--light">Promo</span>
            ) : null}
          </div>

          <button
            className="product-card__quick"
            type="button"
            onClick={() => setIsQuickViewOpen(true)}
            aria-label={`Quick view ${product.name}`}
          >
            <Eye size={16} />
            <span>Quick View</span>
          </button>
        </div>

        <div className="product-card__body">
          <div className="product-card__meta">
            <span>{formatDepartment(product.department)}</span>
            <span>{product.category}</span>
          </div>

          <Link
            className="product-card__title"
            href={`/products/${product.slug}`}
          >
            {product.name}
          </Link>

          <p className="product-card__price">
            {formatPriceRange(getProductPriceRange(product))}
          </p>

          <div className="swatches" aria-label="Available colors">
            {product.colors.map((color) => (
              <span
                className="swatch"
                style={{ backgroundColor: color.hex }}
                key={color.code}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </article>

      {isQuickViewOpen ? (
        <QuickViewModal
          product={product}
          onClose={() => setIsQuickViewOpen(false)}
        />
      ) : null}
    </>
  );
}

function QuickViewModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <button
        className="modal__backdrop"
        type="button"
        aria-label="Close quick view"
        onClick={onClose}
      />

      <section
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`quick-view-${product.id}`}
      >
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
        >
          <X size={20} />
        </button>

        <div className="quick-view">
          <div className="quick-view__media">
            <img src={product.images[0]} alt={product.name} />
          </div>

          <div className="quick-view__content">
            <p className="eyebrow">
              {formatDepartment(product.department)} /{" "}
              {product.category}
            </p>

            <h2 id={`quick-view-${product.id}`}>
              {product.name}
            </h2>

            <p>{product.description}</p>

            <ProductOptions
              product={product}
              onAddedToCart={onClose}
            />

            <Link
              className="text-link"
              href={`/products/${product.slug}`}
              onClick={onClose}
            >
              View full product details
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
