import type { Customer } from "../domain/customer/customerTypes";
import type {
  CartItem,
  Channel,
  ConfirmedOrder,
  OrderTotals,
} from "../domain/order/orderTypes";
import type { PaymentMethod } from "../domain/payment/paymentTypes";

type CreateConfirmedOrderParams = {
  channel: Exclude<Channel, "admin">;
  unitId: string;
  customer: Customer | null;
  items: CartItem[];
  couponCode: string | null;
  paymentMethod: PaymentMethod;
  totals: OrderTotals;
  estimatedTimeInMinutes: number;
};

function createOrderId(): string {
  return crypto.randomUUID();
}

function createOrderNumber(): number {
  return Math.floor(1000 + Math.random() * 9000);
}

export function createConfirmedOrder({
  channel,
  unitId,
  customer,
  items,
  couponCode,
  paymentMethod,
  totals,
  estimatedTimeInMinutes,
}: CreateConfirmedOrderParams): ConfirmedOrder {
  return {
    id: createOrderId(),
    orderNumber: createOrderNumber(),
    channel,
    unitId,
    customer,
    items,
    couponCode,
    paymentMethod,
    paymentStatus: "approved",
    status: "received",
    totals,
    createdAt: new Date().toISOString(),
    estimatedTimeInMinutes,
  };
}