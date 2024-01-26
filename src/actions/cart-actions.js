import { ADD_TO_CART_SUCCESS, SHIPPING_INFO } from "../constants/constants";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:5000/api/products/${id}`);

  const responseData = await response.json();

  console.log(responseData);

  dispatch({
    type: ADD_TO_CART_SUCCESS,
    payload: {
      id: id,
      name: responseData.product.name,
      price: responseData.product.price,
      image: responseData.product.images[0].url,
      stock: responseData.product.stock,
      quantity: quantity,
    },
  });

  localStorage.setItem("cart item", JSON.stringify(getState().cart.cartItems));
};

export const shippingInfo = (data) => (dispatch,getState) => {
  dispatch({ type: SHIPPING_INFO, payload: data });
  localStorage.setItem("shipping item", JSON.stringify(getState().cart.shippingInfo));
};
