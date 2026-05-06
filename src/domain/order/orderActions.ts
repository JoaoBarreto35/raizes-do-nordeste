import type { Customer } from "../customer/customerTypes";
import type { MenuItem } from "../menu/menuTypes";
import type { PaymentMethod, PaymentStatus } from "../payment/paymentTypes";
import type { Channel, ConfirmedOrder, OrderStatus } from "./orderTypes";

export type OrderAction =
  | {
      type: "SELECT_CHANNEL";
      payload: {
        channel: Channel;
      };
    }
  | {
      type: "SELECT_UNIT";
      payload: {
        unitId: string;
      };
    }
  | {
      type: "ADD_ITEM";
      payload: {
        product: MenuItem;
      };
    }
  | {
      type: "REMOVE_ITEM";
      payload: {
        productId: string;
      };
    }
  | {
      type: "CHANGE_ITEM_QUANTITY";
      payload: {
        productId: string;
        quantity: number;
      };
    }
  | {
      type: "APPLY_COUPON";
      payload: {
        couponCode: string;
      };
    }
  | {
      type: "CLEAR_COUPON";
    }
  | {
      type: "SET_CUSTOMER";
      payload: {
        customer: Customer | null;
      };
    }
  | {
      type: "SET_LGPD_CONSENT";
      payload: {
        accepted: boolean;
      };
    }
  | {
      type: "SET_PAYMENT_METHOD";
      payload: {
        paymentMethod: PaymentMethod;
      };
    }
  | {
      type: "SET_PAYMENT_STATUS";
      payload: {
        paymentStatus: PaymentStatus;
      };
    }
  | {
      type: "CONFIRM_ORDER";
      payload: {
        order: ConfirmedOrder;
      };
    }
  | {
      type: "ADVANCE_ORDER_STATUS";
      payload: {
        orderId: string;
      };
    }
  | {
      type: "SET_ORDER_STATUS";
      payload: {
        orderId: string;
        status: OrderStatus;
      };
    }
  | {
      type: "RESET_CURRENT_ORDER";
    };