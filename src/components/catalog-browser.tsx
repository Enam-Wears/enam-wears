"use client";

import {
  useMemo,
  useState,
} from "react";
import { ProductGrid } from "@/components/product-grid";
import {
  formatCategory,
  type Product,
} from "@/lib/catalog";

type CatalogBrowserProps = {
  sourceProducts: Product[];
  title: string;
  description: string;
};

export function CatalogBrowser({
  sourceProducts,
  title,
  description,
}: CatalogBrowserProps) {
  const [selectedCategory, setSelectedCategory] =
    useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          sourceProducts.map((product) => product.category),
        ),
      ),
    [sourceProducts],
  );

  const sizes = useMemo(
    () =>
      Array.from(
        new Set(
          sourceProducts.flatMap((product) => product.sizes),
        ),
      ),
    [sourceProducts],
  );

  const colors = useMemo(() => {
    const uniqueColors = new Map<
      string,
      { name: string; hex: string }
    >();

    sourceProducts.forEach((product) => {
      product.colors.forEach((color) => {
        uniqueColors.set(color.name, {
          name: color.name,
          hex: color.hex,
        });
      });
    });

    return Array.from(uniqueColors.values());
  }, [sourceProducts]);

  const filteredProducts = useMemo(() => {
    return sourceProducts.filter((product) => {
      if (
        selectedCategory !== "all" &&
        product.category !== selectedCategory
      ) {
        return false;
      }

      const matchingVariants = product.variants.filter(
        (variant) => {
          const sizeMatches =
            selectedSize === "all" ||
            variant.size === selectedSize;

          const colorMatches =
            selectedColor === "all" ||
            variant.color === selectedColor;

          return sizeMatches && colorMatches;
        },
      );

      if (!matchingVariants.length) {
        return false;
      }

      if (inStockOnly) {
        return matchingVariants.some(
          (variant) => variant.stock > 0,
        );
      }

      return true;
    });
  }, [
    inStockOnly,
    selectedCategory,
    selectedColor,
    selectedSize,
    sourceProducts,
  ]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedSize !== "all" ||
    selectedColor !== "all" ||
    inStockOnly;

  function resetFilters() {
    setSelectedCategory("all");
    setSelectedSize("all");
    setSelectedColor("all");
    setInStockOnly(false);
  }

  return (
    <section
      className="filter-section"
      aria-label={`${title} product catalog`}
    >
      <div className="content-wrap">
        <div className="filter-bar">
          <div className="filter-group">
            <span className="filter-label">Category</span>

            <div className="filter-options">
              <button
                className={`filter-chip ${
                  selectedCategory === "all"
                    ? "filter-chip--active"
                    : ""
                }`}
                type="button"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  className={`filter-chip ${
                    selectedCategory === category
                      ? "filter-chip--active"
                      : ""
                  }`}
                  type="button"
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {formatCategory(category)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="size-filter">
              Size
            </label>

            <select
              className="filter-select"
              id="size-filter"
              value={selectedSize}
              onChange={(event) =>
                setSelectedSize(event.target.value)
              }
            >
              <option value="all">All sizes</option>
              {sizes.map((size) => (
                <option value={size} key={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <span className="filter-label">Color</span>

            <div className="filter-options">
              <button
                className={`filter-chip ${
                  selectedColor === "all"
                    ? "filter-chip--active"
                    : ""
                }`}
                type="button"
                onClick={() => setSelectedColor("all")}
              >
                All
              </button>

              {colors.map((color) => (
                <button
                  className={`filter-chip ${
                    selectedColor === color.name
                      ? "filter-chip--active"
                      : ""
                  }`}
                  type="button"
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                >
                  <span
                    className="filter-swatch"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="price-filter">
              Price
            </label>

            <select
              className="filter-select"
              id="price-filter"
              disabled
              value="pending"
              aria-label="Price filter unavailable until prices are imported"
            >
              <option value="pending">
                Prices pending
              </option>
            </select>
          </div>

          <label className="availability-filter">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) =>
                setInStockOnly(event.target.checked)
              }
            />
            In stock only
          </label>
        </div>

        <p className="filter-note">
          {description} Price filters will activate when the final
          product pricing is imported.
        </p>

        <div className="filter-summary">
          <p>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "product"
              : "products"}
          </p>

          {hasActiveFilters ? (
            <button type="button" onClick={resetFilters}>
              Reset filters
            </button>
          ) : null}
        </div>

        {filteredProducts.length ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="empty-state">
            <p className="eyebrow">No results</p>
            <h2 className="empty-state__title">
              Nothing matched those filters.
            </h2>
            <p>
              Try selecting another size, color, or category.
            </p>
            <button
              className="button button--dark"
              type="button"
              onClick={resetFilters}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

