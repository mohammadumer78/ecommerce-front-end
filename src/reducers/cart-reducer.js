import { ADD_TO_CART_SUCCESS, SHIPPING_INFO } from "../constants/constants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      const ItemExists = state.cartItems.find(
        (item) => item.id == action.payload.id
      );

      if (ItemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === ItemExists.id ? action.payload : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    case SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    default:
      return state;
  }
};
