import type { Coupon } from "../domain/order/orderTypes";

export const coupons: Coupon[] = [
  {
    code: "NORDESTE10",
    description: "10% de desconto no pedido",
    discountPercentage: 10,
    active: true,
  },
  {
    code: "RAIZES15",
    description: "15% de desconto promocional",
    discountPercentage: 15,
    active: true,
  },
  {
    code: "EXPIRADO20",
    description: "Cupom expirado de teste",
    discountPercentage: 20,
    active: false,
  },
];