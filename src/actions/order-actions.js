import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAILURE,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAILURE,
  MY_ORDER_REQUEST,
  SINGLE_ORDER_SUCCESS,
  SINGLE_ORDER_REQUEST,
  SINGLE_ORDER_FAILURE,
} from "../constants/constants";

export const createOrder = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const response = await fetch("http://localhost:5000/api/orders/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const responseData = await response.json();

    console.log(responseData.order);

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: responseData.order });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
  }
};

export const Orders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });
    const response = await fetch("http://localhost:5000/api/orders/me", {
      credentials: "include",
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: MY_ORDER_SUCCESS, payload: responseData.order });
  } catch (error) {
    dispatch({ type: MY_ORDER_FAILURE, payload: error.message });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_ORDER_REQUEST });
    const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
      credentials: "include",
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: SINGLE_ORDER_SUCCESS, payload: responseData.order });
  } catch (error) {
    dispatch({ type: SINGLE_ORDER_FAILURE, payload: error.message });
  }
};
