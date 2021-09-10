import { useReducer, useMemo, createContext, useContext } from "react";

const CartDispatchContext = createContext({});
const CartStateContext = createContext({});

const productReducer = (state, event) => {
  switch (event.type) {
    case "ADD_SHIRT":
      return {
        ...state,
        shirt: state.shirt + 1,
      };
    case "DELTE_SHIRT":
      return {
        ...state,
        shirt: state.shirt - 1,
      };
    case "ADD_PRODUCTS":
      return {
        ...state,
        products: event.item,
      };
    default:
      return state;
  }
};

const cartReducer = (state, event) => {
  switch (event.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, event.item],
      };
    default:
      return state;
  }
};

const extraReducer = (state, event) => {
  switch (event.type) {
    case "ADD_DOUBLE_SHIRT":
      return {
        ...state,
        shirt: state.shirt + 2,
      };
    default:
      return state;
  }
};
export const combineReducers =
  (...reducers) =>
  (prevState, value) =>
    reducers.reduce((newState, reducer) => reducer(newState, value), prevState);

const initialState = {
  shirt: 0,
  products: [],
  cart: [],
};

const rootReducer = combineReducers(productReducer, cartReducer, extraReducer);

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  // const contextValue = useMemo(() => {
  //   return { state, dispatch };
  // }, [state, dispatch]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCartDispatch = () => useContext(CartDispatchContext);
export const useCartState = () => useContext(CartStateContext);
export default CartProvider;
