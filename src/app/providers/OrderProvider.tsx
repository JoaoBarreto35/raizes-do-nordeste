import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useReducer,
} from "react";

import type { OrderAction } from "../../domain/order/orderActions";
import {
  initialOrderState,
  orderReducer,
  type OrderState,
} from "../../domain/order/orderReducer";
import { initialOrders } from "../../data/initialOrders";

type OrderContextValue = {
  state: OrderState;
  dispatch: Dispatch<OrderAction>;
};

const OrderContext = createContext<OrderContextValue | null>(null);

const initialStateWithMockOrders: OrderState = {
  ...initialOrderState,
  confirmedOrders: initialOrders,
};

type OrderProviderProps = {
  children: ReactNode;
};

export function OrderProvider({ children }: OrderProviderProps) {
  const [state, dispatch] = useReducer(orderReducer, initialStateWithMockOrders);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder(): OrderContextValue {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrder must be used inside OrderProvider");
  }

  return context;
}