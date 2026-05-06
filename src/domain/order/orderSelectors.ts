import { coupons } from "../../data/promotions";
import type { Coupon } from "./orderTypes";
import type { OrderState } from "./orderReducer";
import { calculateOrderTotals } from "./orderCalculations";

export function selectAppliedCoupon(state: OrderState): Coupon | null {
  if (!state.couponCode) {
    return null;
  }

  return (
    coupons.find(
      (coupon) => coupon.code === state.couponCode && coupon.active
    ) ?? null
  );
}

export function selectIsIdentifiedCustomer(state: OrderState): boolean {
  return state.customer?.mode === "identified";
}

export function selectOrderTotals(state: OrderState) {
  return calculateOrderTotals({
    items: state.items,
    coupon: selectAppliedCoupon(state),
    isIdentifiedCustomer: selectIsIdentifiedCustomer(state),
  });
}

export function selectCanGoToPayment(state: OrderState): boolean {
  return state.items.length > 0;
}

export function selectCanFinishPayment(state: OrderState): boolean {
  return (
    state.items.length > 0 &&
    state.selectedUnitId !== null &&
    state.lgpdConsentAccepted &&
    state.paymentMethod !== null &&
    state.paymentStatus !== "processing"
  );
}