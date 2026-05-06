import type { Customer } from "../customer/customerTypes";
import type { PaymentMethod, PaymentStatus } from "../payment/paymentTypes";
import type { OrderAction } from "./orderActions";
import type { CartItem, Channel, ConfirmedOrder, OrderStatus } from "./orderTypes";

export type OrderState = {
  selectedChannel: Channel | null;
  selectedUnitId: string | null;
  items: CartItem[];
  couponCode: string | null;
  customer: Customer | null;
  lgpdConsentAccepted: boolean;
  paymentMethod: PaymentMethod | null;
  paymentStatus: PaymentStatus;
  currentOrder: ConfirmedOrder | null;
  confirmedOrders: ConfirmedOrder[];
};

export const initialOrderState: OrderState = {
  selectedChannel: null,
  selectedUnitId: null,
  items: [],
  couponCode: null,
  customer: null,
  lgpdConsentAccepted: false,
  paymentMethod: null,
  paymentStatus: "idle",
  currentOrder: null,
  confirmedOrders: [],
};

const orderStatusFlow: OrderStatus[] = [
  "received",
  "preparing",
  "ready",
  "finished",
];

function getNextOrderStatus(currentStatus: OrderStatus): OrderStatus {
  const currentIndex = orderStatusFlow.indexOf(currentStatus);

  if (currentIndex === -1 || currentIndex === orderStatusFlow.length - 1) {
    return currentStatus;
  }

  return orderStatusFlow[currentIndex + 1];
}

export function orderReducer(
  state: OrderState,
  action: OrderAction
): OrderState {
  switch (action.type) {
    case "SELECT_CHANNEL":
      return {
        ...state,
        selectedChannel: action.payload.channel,
      };

    case "SELECT_UNIT":
      return {
        ...state,
        selectedUnitId: action.payload.unitId,
      };

    case "ADD_ITEM": {
      const currentItem = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );

      if (currentItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.payload.product,
            quantity: 1,
          },
        ],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.payload.productId
        ),
      };

    case "CHANGE_ITEM_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.product.id !== action.payload.productId
          ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case "APPLY_COUPON":
      return {
        ...state,
        couponCode: action.payload.couponCode.trim().toUpperCase(),
      };

    case "CLEAR_COUPON":
      return {
        ...state,
        couponCode: null,
      };

    case "SET_CUSTOMER":
      return {
        ...state,
        customer: action.payload.customer,
      };

    case "SET_LGPD_CONSENT":
      return {
        ...state,
        lgpdConsentAccepted: action.payload.accepted,
      };

    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload.paymentMethod,
      };

    case "SET_PAYMENT_STATUS":
      return {
        ...state,
        paymentStatus: action.payload.paymentStatus,
      };

    case "CONFIRM_ORDER":
      return {
        ...state,
        currentOrder: action.payload.order,
        confirmedOrders: [action.payload.order, ...state.confirmedOrders],
        paymentStatus: "approved",
      };

    case "ADVANCE_ORDER_STATUS":
      return {
        ...state,
        currentOrder:
          state.currentOrder?.id === action.payload.orderId
            ? {
                ...state.currentOrder,
                status: getNextOrderStatus(state.currentOrder.status),
              }
            : state.currentOrder,
        confirmedOrders: state.confirmedOrders.map((order) =>
          order.id === action.payload.orderId
            ? {
                ...order,
                status: getNextOrderStatus(order.status),
              }
            : order
        ),
      };

    case "SET_ORDER_STATUS":
      return {
        ...state,
        currentOrder:
          state.currentOrder?.id === action.payload.orderId
            ? {
                ...state.currentOrder,
                status: action.payload.status,
              }
            : state.currentOrder,
        confirmedOrders: state.confirmedOrders.map((order) =>
          order.id === action.payload.orderId
            ? {
                ...order,
                status: action.payload.status,
              }
            : order
        ),
      };

    case "RESET_CURRENT_ORDER":
      return {
        ...state,
        items: [],
        couponCode: null,
        customer: null,
        lgpdConsentAccepted: false,
        paymentMethod: null,
        paymentStatus: "idle",
        currentOrder: null,
      };

    default:
      return state;
  }
}