export type CartItem = {
  id: string;
  productSlug: string;
  variantId: string;
  color: string;
  size: string;
  quantity: number;
};

export type AddCartItemInput = Omit<CartItem, "id" | "quantity">;
