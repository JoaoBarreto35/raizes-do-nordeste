import type { Customer } from "../customer/customerTypes";
import type { MenuItem } from "../menu/menuTypes";
import type { PaymentMethod, PaymentStatus } from "../payment/paymentTypes";

export type Channel = "customer-app" | "kiosk" | "admin";

export type OrderStatus = "received" | "preparing" | "ready" | "finished";

export type CartItem = {
  product: MenuItem;
  quantity: number;
};

export type Coupon = {
  code: string;
  description: string;
  discountPercentage: number;
  active: boolean;
};

export type OrderTotals = {
  subtotalInCents: number;
  discountInCents: number;
  totalInCents: number;
  loyaltyPoints: number;
};

export type ConfirmedOrder = {
  id: string;
  orderNumber: number;
  channel: Exclude<Channel, "admin">;
  unitId: string;
  customer: Customer | null;
  items: CartItem[];
  couponCode: string | null;
  paymentMethod: PaymentMethod;
  paymentStatus: Extract<PaymentStatus, "approved">;
  status: OrderStatus;
  totals: OrderTotals;
  createdAt: string;
  estimatedTimeInMinutes: number;
};