export function formatPrice(
  amount: number | null,
  currency = "GHS",
): string {
  if (amount === null || Number.isNaN(amount)) {
    return "Price coming soon";
  }

  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPriceRange(
  range: { min: number; max: number } | null,
): string {
  if (!range) {
    return "Price coming soon";
  }

  if (range.min === range.max) {
    return formatPrice(range.min);
  }

  return `From ${formatPrice(range.min)}`;
}

export function formatStockMessage(stock: number): string {
  if (stock <= 0) {
    return "Out of stock";
  }

  if (stock <= 3) {
    return `Only ${stock} left in stock`;
  }

  return "In stock";
}

export function getStockClassName(stock: number): string {
  if (stock <= 0) {
    return "availability--out";
  }

  if (stock <= 3) {
    return "availability--low";
  }

  return "availability--in";
}

export function formatLabel(value: string): string {
  return value.replace(/(^|-)(\w)/g, (_, prefix, letter) => {
    return `${prefix}${letter.toUpperCase()}`;
  });
}
