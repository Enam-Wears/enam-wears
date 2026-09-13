import {
  getCartSubtotal,
  type ResolvedCartLine,
} from "../lib/cart";
import { formatPrice } from "../lib/format";

export function CartSummary({
  lines,
}: {
  lines: ResolvedCartLine[];
}) {
  const subtotal = getCartSubtotal(lines);
  const itemCount = lines.reduce(
    (total, line) => total + line.item.quantity,
    0,
  );

  return (
    <div className="cart-summary">
      <div className="cart-summary__row">
        <span>Items ({itemCount})</span>
        <span>
          {subtotal === null
            ? "Pricing pending"
            : formatPrice(subtotal)}
        </span>
      </div>

      <div className="cart-summary__row">
        <span>Delivery</span>
        <span>Calculated at checkout</span>
      </div>

      <div className="cart-summary__row cart-summary__total">
        <span>Subtotal</span>
        <span>
          {subtotal === null
            ? "Pricing pending"
            : formatPrice(subtotal)}
        </span>
      </div>
    </div>
  );
}
