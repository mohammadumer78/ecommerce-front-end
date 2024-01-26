import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAILURE,
  MY_ORDER_REQUEST,
  SINGLE_ORDER_SUCCESS,
  SINGLE_ORDER_REQUEST,
  SINGLE_ORDER_FAILURE,
 
} from "../constants/constants";

export function createOrder(state = {}, action) {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case CREATE_ORDER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function myOrders(state = {}, action) {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case MY_ORDER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function SingleOrder(state = {orderDetails:{}}, action) {
  switch (action.type) {
    case SINGLE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SINGLE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: action.payload,
      };
    case SINGLE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}


