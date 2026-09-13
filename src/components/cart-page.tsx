"use client";

import Link from "next/link";
import {
  useMemo,
} from "react";
import { CartLine } from "@/components/cart-line";
import { CartSummary } from "@/components/cart-summary";
import { useCart } from "@/components/cart-provider";
import { resolveCartLines } from "@/lib/cart";

export function CartPage() {
  const {
    items,
    isHydrated,
  } = useCart();

  const lines = useMemo(
    () => resolveCartLines(items),
    [items],
  );

  if (!isHydrated) {
    return (
      <section className="cart-page content-wrap">
        <div className="cart-page__heading">
          <p className="eyebrow">Enam Wears</p>
          <h1>Loading Bag.</h1>
        </div>
      </section>
    );
  }

  if (!lines.length) {
    return (
      <section className="empty-state content-wrap">
        <p className="eyebrow">Shopping Bag</p>
        <h1 className="empty-state__title">
          Your bag is empty.
        </h1>
        <p>
          Find the pieces that move with you and add them to your bag.
        </p>
        <Link className="button button--dark" href="/shop/new-in">
          Shop New In
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="content-wrap">
        <div className="cart-page__heading">
          <p className="eyebrow">Enam Wears</p>
          <h1>Shopping Bag.</h1>
        </div>

        <div className="cart-page__grid">
          <div className="cart-page__items">
            {lines.map((line) => (
              <CartLine line={line} key={line.item.id} />
            ))}
          </div>

          <aside className="cart-page__summary-card">
            <h2>Order Summary</h2>

            <CartSummary lines={lines} />

            <p className="cart-message">
              Pricing, delivery methods, mobile money, and card payments
              will be connected in Phase 2.
            </p>

            <button
              className="button button--dark button--full"
              type="button"
              disabled
            >
              Checkout Coming Soon
            </button>

            <Link
              className="button button--outline button--full"
              href="/shop/new-in"
              style={{ marginTop: "0.65rem" }}
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
