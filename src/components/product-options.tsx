"use client";

import { Minus, Plus } from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCart } from "../components/cart-provider";
import {
  getVariant,
  type Product,
} from "../lib/catalog";
import {
  formatPrice,
  formatStockMessage,
  getStockClassName,
} from "../lib/format";

type ProductOptionsProps = {
  product: Product;
  onColorChange?: (color: string) => void;
  onAddedToCart?: () => void;
};

function getFirstAvailableColor(product: Product): string {
  return (
    product.colors.find((color) =>
      product.variants.some(
        (variant) =>
          variant.color === color.name && variant.stock > 0,
      ),
    )?.name ??
    product.colors[0]?.name ??
    ""
  );
}

function getFirstAvailableSize(
  product: Product,
  color: string,
): string {
  return (
    product.variants.find(
      (variant) =>
        variant.color === color && variant.stock > 0,
    )?.size ??
    product.variants.find(
      (variant) => variant.color === color,
    )?.size ??
    product.sizes[0] ??
    ""
  );
}

export function ProductOptions({
  product,
  onColorChange,
  onAddedToCart,
}: ProductOptionsProps) {
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState(() =>
    getFirstAvailableColor(product),
  );
  const [selectedSize, setSelectedSize] = useState(() =>
    getFirstAvailableSize(
      product,
      getFirstAvailableColor(product),
    ),
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const initialColor = getFirstAvailableColor(product);

    setSelectedColor(initialColor);
    setSelectedSize(getFirstAvailableSize(product, initialColor));
    setQuantity(1);
  }, [product]);

  const selectedVariant = useMemo(
    () => getVariant(product, selectedColor, selectedSize),
    [product, selectedColor, selectedSize],
  );

  const selectedStock = selectedVariant?.stock ?? 0;
  const canAddToCart = selectedStock > 0;

  function selectColor(color: string) {
    const currentSizeVariant = getVariant(
      product,
      color,
      selectedSize,
    );

    const nextSize =
      currentSizeVariant && currentSizeVariant.stock > 0
        ? selectedSize
        : getFirstAvailableSize(product, color);

    setSelectedColor(color);
    setSelectedSize(nextSize);
    setQuantity(1);
    onColorChange?.(color);
  }

  function selectSize(size: string) {
    setSelectedSize(size);
    setQuantity(1);
  }

  function addSelectedProductToCart() {
    if (!selectedVariant || selectedVariant.stock <= 0) {
      return;
    }

    /**
     * The cart provider adds one unit per call. Repeating this keeps the
     * selected quantity while respecting the real variant stock limit.
     */
    for (let item = 0; item < quantity; item += 1) {
      addItem(
        {
          productSlug: product.slug,
          variantId: selectedVariant.id,
          color: selectedColor,
          size: selectedSize,
        },
        selectedVariant.stock,
      );
    }

    onAddedToCart?.();
  }

  return (
    <>
      <div className="option-section">
        <div className="option-heading">
          <span>Color</span>
          <span className="option-heading__value">
            {selectedColor}
          </span>
        </div>

        <div className="color-options">
          {product.colors.map((color) => {
            const hasStock = product.variants.some(
              (variant) =>
                variant.color === color.name && variant.stock > 0,
            );

            const isSelected = selectedColor === color.name;

            return (
              <button
                className={`color-option ${
                  isSelected ? "color-option--active" : ""
                }`}
                type="button"
                key={color.code}
                onClick={() => selectColor(color.name)}
                aria-pressed={isSelected}
                disabled={!hasStock}
                title={
                  hasStock
                    ? `Select ${color.name}`
                    : `${color.name} is out of stock`
                }
              >
                <span
                  className="color-option__dot"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="option-section">
        <div className="option-heading">
          <span>Size</span>
          <span className="option-heading__value">
            {selectedSize}
          </span>
        </div>

        <div className="size-grid">
          {product.sizes.map((size) => {
            const sizeVariant = getVariant(
              product,
              selectedColor,
              size,
            );

            const hasStock = (sizeVariant?.stock ?? 0) > 0;
            const isSelected = selectedSize === size;

            return (
              <button
                className={`size-option ${
                  isSelected ? "size-option--active" : ""
                }`}
                type="button"
                key={size}
                onClick={() => selectSize(size)}
                disabled={!hasStock}
                aria-pressed={isSelected}
                title={
                  hasStock
                    ? `Select size ${size}`
                    : `Size ${size} is out of stock`
                }
              >
                {size}
              </button>
            );
          })}
        </div>

        <span
          className={`availability ${getStockClassName(
            selectedStock,
          )}`}
        >
          {formatStockMessage(selectedStock)}
        </span>
      </div>

      <div className="option-section">
        <p className="product-price">
          {formatPrice(selectedVariant?.price ?? null)}
        </p>

        {selectedVariant ? (
          <p className="product-info__sku">
            SKU: {selectedVariant.sku}
          </p>
        ) : null}

        <div className="purchase-stack">
          <div className="quantity-row">
            <span>Quantity</span>

            <div className="quantity-control">
              <button
                className="quantity-control__button"
                type="button"
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus size={15} />
              </button>

              <span className="quantity-control__value">
                {quantity}
              </span>

              <button
                className="quantity-control__button"
                type="button"
                onClick={() =>
                  setQuantity((current) =>
                    Math.min(current + 1, selectedStock),
                  )
                }
                disabled={!canAddToCart || quantity >= selectedStock}
                aria-label="Increase quantity"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          <button
            className="button button--dark button--full"
            type="button"
            onClick={addSelectedProductToCart}
            disabled={!canAddToCart}
          >
            {canAddToCart ? "Add to Cart" : "Out of Stock"}
          </button>

          <p className="stock-note">
            Final product pricing will be added from the Enam Wears
            catalog before checkout is enabled.
          </p>
        </div>
      </div>
    </>
  );
}
