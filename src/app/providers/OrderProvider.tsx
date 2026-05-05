import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useReducer,
} from "react";

type OrderState = {
  selectedUnitId: string | null;
};

type OrderAction = {
  type: "SELECT_UNIT";
  payload: {
    unitId: string;
  };
};

const initialState: OrderState = {
  selectedUnitId: null,
};

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "SELECT_UNIT":
      return {
        ...state,
        selectedUnitId: action.payload.unitId,
      };

    default:
      return state;
  }
}

type OrderContextValue = {
  state: OrderState;
  dispatch: Dispatch<OrderAction>;
};

const OrderContext = createContext<OrderContextValue | null>(null);

type OrderProviderProps = {
  children: ReactNode;
};

export function OrderProvider({ children }: OrderProviderProps) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

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