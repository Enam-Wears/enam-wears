"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AddCartItemInput,
  CartItem,
} from "@/lib/cart-types";

const CART_STORAGE_KEY = "enam-wears-cart-preview";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  isCartOpen: boolean;
  isHydrated: boolean;
  addItem: (
    item: AddCartItemInput,
    maximumStock: number,
  ) => void;
  updateQuantity: (
    lineId: string,
    nextQuantity: number,
    maximumStock: number,
  ) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.productSlug === "string" &&
    typeof item.variantId === "string" &&
    typeof item.color === "string" &&
    typeof item.size === "string" &&
    typeof item.quantity === "number" &&
    Number.isFinite(item.quantity) &&
    item.quantity > 0
  );
}

function readStoredCart(): CartItem[] {
  try {
    const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!rawCart) {
      return [];
    }

    const parsedCart: unknown = JSON.parse(rawCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart
      .filter(isCartItem)
      .map((item) => ({
        ...item,
        quantity: Math.max(1, Math.floor(item.quantity)),
      }));
  } catch {
    return [];
  }
}

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(items),
    );
  }, [isHydrated, items]);

  const addItem = useCallback(
    (item: AddCartItemInput, maximumStock: number) => {
      const safeMaximumStock = Math.max(
        0,
        Math.floor(maximumStock),
      );

      if (safeMaximumStock <= 0) {
        return;
      }

      const lineId = `${item.productSlug}:${item.variantId}`;

      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (currentItem) => currentItem.id === lineId,
        );

        if (existingItem) {
          return currentItems.map((currentItem) =>
            currentItem.id === lineId
              ? {
                  ...currentItem,
                  quantity: Math.min(
                    currentItem.quantity + 1,
                    safeMaximumStock,
                  ),
                }
              : currentItem,
          );
        }

        return [
          ...currentItems,
          {
            ...item,
            id: lineId,
            quantity: 1,
          },
        ];
      });

      setIsCartOpen(true);
    },
    [],
  );

  const updateQuantity = useCallback(
    (
      lineId: string,
      nextQuantity: number,
      maximumStock: number,
    ) => {
      const safeMaximumStock = Math.max(
        0,
        Math.floor(maximumStock),
      );

      setItems((currentItems) => {
        if (nextQuantity <= 0 || safeMaximumStock <= 0) {
          return currentItems.filter(
            (item) => item.id !== lineId,
          );
        }

        return currentItems.map((item) =>
          item.id === lineId
            ? {
                ...item,
                quantity: Math.min(
                  Math.max(1, Math.floor(nextQuantity)),
                  safeMaximumStock,
                ),
              }
            : item,
        );
      });
    },
    [],
  );

  const removeItem = useCallback((lineId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== lineId),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      isCartOpen,
      isHydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      addItem,
      clearCart,
      closeCart,
      isCartOpen,
      isHydrated,
      itemCount,
      items,
      openCart,
      removeItem,
      updateQuantity,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside the CartProvider.",
    );
  }

  return context;
}
