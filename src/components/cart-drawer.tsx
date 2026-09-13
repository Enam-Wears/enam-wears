"use client";

import Link from "next/link";
import { X } from "lucide-react";
import {
  useEffect,
  useMemo,
} from "react";
import { CartLine } from "../components/cart-line";
import { CartSummary } from "../components/cart-summary";
import { useCart } from "../components/cart-provider";
import { resolveCartLines } from "../lib/cart";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
  } = useCart();

  const lines = useMemo(
    () => resolveCartLines(items),
    [items],
  );

  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeCart();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeCart, isCartOpen]);

  if (!isCartOpen) {
    return null;
  }

  return (
    <>
      <button
        className="drawer-backdrop"
        type="button"
        aria-label="Close shopping bag"
        onClick={closeCart}
      />

      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shopping-bag-title"
      >
        <header className="cart-drawer__header">
          <h2 id="shopping-bag-title">Shopping Bag</h2>

          <button
            className="icon-button"
            type="button"
            onClick={closeCart}
            aria-label="Close shopping bag"
          >
            <X size={20} />
          </button>
        </header>

        <div className="cart-drawer__body">
          {lines.length ? (
            lines.map((line) => (
              <CartLine
                line={line}
                key={line.item.id}
                onNavigate={closeCart}
              />
            ))
          ) : (
            <div className="cart-drawer__empty">
              <h3>Your bag is empty.</h3>
              <p>
                Add a few movement essentials and they will appear here.
              </p>
              <Link
                className="button button--dark"
                href="/shop/new-in"
                onClick={closeCart}
              >
                Shop New In
              </Link>
            </div>
          )}
        </div>

        {lines.length ? (
          <footer className="cart-drawer__footer">
            <CartSummary lines={lines} />

            <p className="cart-message">
              Checkout, delivery rates, and payments will be connected
              in Phase 2.
            </p>

            <div className="cart-actions">
              <Link
                className="button button--outline"
                href="/cart"
                onClick={closeCart}
              >
                View Bag
              </Link>

              <button
                className="button button--dark"
                type="button"
                disabled
              >
                Checkout Soon
              </button>
            </div>
          </footer>
        ) : null}
      </aside>
    </>
  );
}
