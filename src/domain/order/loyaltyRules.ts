import type { CartItem } from "./orderTypes";

export function calculateLoyaltyPoints(
  items: CartItem[],
  isIdentifiedCustomer: boolean
): number {
  if (!isIdentifiedCustomer) {
    return 0;
  }

  return items.reduce((total, item) => {
    return total + item.product.loyaltyPoints * item.quantity;
  }, 0);
}