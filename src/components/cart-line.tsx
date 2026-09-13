"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useCart } from "../components/cart-provider";
import type { ResolvedCartLine } from "../lib/cart";
import { getProductImageForColor } from "../lib/catalog";
import {
  formatPrice,
  formatStockMessage,
  getStockClassName,
} from "../lib/format";

type CartLineProps = {
  line: ResolvedCartLine;
  onNavigate?: () => void;
};

export function CartLine({
  line,
  onNavigate,
}: CartLineProps) {
  const { updateQuantity, removeItem } = useCart();

  const maximumStock = line.variant.stock;
  const image = getProductImageForColor(
    line.product,
    line.variant.color,
  );

  function decreaseQuantity() {
    if (maximumStock <= 0) {
      removeItem(line.item.id);
      return;
    }

    updateQuantity(
      line.item.id,
      line.item.quantity - 1,
      maximumStock,
    );
  }

  function increaseQuantity() {
    updateQuantity(
      line.item.id,
      line.item.quantity + 1,
      maximumStock,
    );
  }

  return (
    <article className="cart-line">
      <Link
        href={`/products/${line.product.slug}`}
        onClick={onNavigate}
      >
        <img
          className="cart-line__image"
          src={image}
          alt={line.product.name}
        />
      </Link>

      <div className="cart-line__details">
        <Link
          className="cart-line__heading"
          href={`/products/${line.product.slug}`}
          onClick={onNavigate}
        >
          {line.product.name}
        </Link>

        <p className="cart-line__meta">
          {line.variant.color} / {line.variant.size}
        </p>

        <p className="cart-line__price">
          {formatPrice(line.variant.price)}
        </p>

        {maximumStock <= 0 ||
        line.item.quantity > maximumStock ? (
          <span
            className={`availability ${getStockClassName(
              maximumStock,
            )}`}
          >
            {maximumStock <= 0
              ? "This variant is no longer available"
              : `Only ${maximumStock} can be ordered`}
          </span>
        ) : null}

        {maximumStock > 0 &&
        maximumStock <= 3 &&
        line.item.quantity <= maximumStock ? (
          <span
            className={`availability ${getStockClassName(
              maximumStock,
            )}`}
          >
            {formatStockMessage(maximumStock)}
          </span>
        ) : null}

        <div className="quantity-control">
          <button
            className="quantity-control__button"
            type="button"
            onClick={decreaseQuantity}
            disabled={line.item.quantity <= 1}
            aria-label={`Decrease quantity of ${line.product.name}`}
          >
            <Minus size={15} />
          </button>

          <span className="quantity-control__value">
            {line.item.quantity}
          </span>

          <button
            className="quantity-control__button"
            type="button"
            onClick={increaseQuantity}
            disabled={
              maximumStock <= 0 ||
              line.item.quantity >= maximumStock
            }
            aria-label={`Increase quantity of ${line.product.name}`}
          >
            <Plus size={15} />
          </button>
        </div>
      </div>

      <button
        className="cart-line__remove"
        type="button"
        onClick={() => removeItem(line.item.id)}
        aria-label={`Remove ${line.product.name} from cart`}
      >
        <Trash2 size={17} />
      </button>
    </article>
  );
}
