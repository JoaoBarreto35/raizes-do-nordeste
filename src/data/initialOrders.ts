import { menuItems } from "./menuItems";
import type { ConfirmedOrder } from "../domain/order/orderTypes";

const baiaoBurger = menuItems.find((item) => item.id === "baiao-burger");
const sucoCaja = menuItems.find((item) => item.id === "suco-caja");
const comboCuscuz = menuItems.find((item) => item.id === "combo-cuscuz");

if (!baiaoBurger || !sucoCaja || !comboCuscuz) {
  throw new Error("Initial order mock data is invalid.");
}

export const initialOrders: ConfirmedOrder[] = [
  {
    id: "mock-order-1024",
    orderNumber: 1024,
    channel: "customer-app",
    unitId: "centro",
    customer: {
      mode: "identified",
      name: "João",
      email: "joao@email.com",
    },
    items: [
      {
        product: baiaoBurger,
        quantity: 1,
      },
      {
        product: sucoCaja,
        quantity: 1,
      },
    ],
    couponCode: "NORDESTE10",
    paymentMethod: "pix",
    paymentStatus: "approved",
    status: "received",
    totals: {
      subtotalInCents: 3380,
      discountInCents: 338,
      totalInCents: 3042,
      loyaltyPoints: 32,
    },
    createdAt: new Date().toISOString(),
    estimatedTimeInMinutes: 20,
  },
  {
    id: "mock-order-1025",
    orderNumber: 1025,
    channel: "kiosk",
    unitId: "shopping",
    customer: null,
    items: [
      {
        product: comboCuscuz,
        quantity: 2,
      },
    ],
    couponCode: null,
    paymentMethod: "card",
    paymentStatus: "approved",
    status: "preparing",
    totals: {
      subtotalInCents: 5980,
      discountInCents: 0,
      totalInCents: 5980,
      loyaltyPoints: 0,
    },
    createdAt: new Date().toISOString(),
    estimatedTimeInMinutes: 25,
  },
];