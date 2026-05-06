import type { Coupon, CartItem, OrderTotals } from "./orderTypes";
import { calculateLoyaltyPoints } from "./loyaltyRules";

export function calculateSubtotalInCents(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + item.product.priceInCents * item.quantity;
  }, 0);
}

export function calculateDiscountInCents(
  subtotalInCents: number,
  coupon: Coupon | null
): number {
  if (!coupon || !coupon.active) {
    return 0;
  }

  return Math.round((subtotalInCents * coupon.discountPercentage) / 100);
}

export function calculateOrderTotals(params: {
  items: CartItem[];
  coupon: Coupon | null;
  isIdentifiedCustomer: boolean;
}): OrderTotals {
  const subtotalInCents = calculateSubtotalInCents(params.items);
  const discountInCents = calculateDiscountInCents(
    subtotalInCents,
    params.coupon
  );

  const totalInCents = Math.max(subtotalInCents - discountInCents, 0);

  return {
    subtotalInCents,
    discountInCents,
    totalInCents,
    loyaltyPoints: calculateLoyaltyPoints(
      params.items,
      params.isIdentifiedCustomer
    ),
  };
}