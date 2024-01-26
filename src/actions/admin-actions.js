import {
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAILURE,
  CREATE_INVENTORY_REQUEST,
  CREATE_INVENTORY_SUCCESS,
  CREATE_INVENTORY_FAILURE,
  DELETE_FAILURE,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_FAILURE,
  EDIT_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  ADMIN_ORDERS_REQUEST,
  ADMIN_ORDERS_SUCCESS,
  ADMIN_ORDERS_FAILURE,
  DELETE_ORDERS_FAILURE,
  DELETE_ORDERS_REQUEST,
  DELETE_ORDERS_SUCCESS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE,
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_FAILURE,
  ADMIN_USERS_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  ADMIN_USER_REQUEST,
  ADMIN_USER_FAILURE,
  ADMIN_USER_SUCCESS,
  ADMIN_REVIEWS_REQUEST,
  ADMIN_REVIEWS_FAILURE,
  ADMIN_REVIEWS_SUCCESS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE
} from "../constants/constants";

export const adminInventory = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const response = await fetch(
      "http://localhost:5000/api/products/admin/products",
      {
        credentials: "include",
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: responseData.products });
  } catch (error) {
    dispatch({ type: ADMIN_PRODUCT_FAILURE, payload: error.message });
  }
};

export const createInventory = (newProduct) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_INVENTORY_REQUEST });
    const response = await fetch(
      "http://localhost:5000/api/products/addproduct",
      {
        method: "POST",
        body: newProduct,
        credentials: "include",
      }
    );
    const responseData = await response.json();

    console.log(responseData);

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: CREATE_INVENTORY_SUCCESS, payload: responseData.product });
  } catch (error) {
    dispatch({ type: CREATE_INVENTORY_FAILURE, payload: error.message });
  }
};

export const deleteInventory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REQUEST });
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: DELETE_SUCCESS, payload: responseData.success });
  } catch (error) {
    dispatch({ type: DELETE_FAILURE, payload: error.message });
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_PRODUCT_REQUEST });
    const response = await fetch(
      `http://localhost:5000/api/products/reviews?productid=${id}`
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: responseData.product });
  } catch (error) {
    dispatch({ type: EDIT_PRODUCT_FAILURE, payload: error.message });
  }
};

export const editSingleProduct = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PATCH",
      body: formData,
      credentials: "include",
    });
    const responseData = await response.json();

    console.log(responseData);

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: responseData.success });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const getAllAdminOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ORDERS_REQUEST });
    const response = await fetch("http://localhost:5000/api/orders/me", {
      credentials: "include",
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: ADMIN_ORDERS_SUCCESS, payload: responseData.order });
  } catch (error) {
    dispatch({ type: ADMIN_ORDERS_FAILURE, payload: error.message });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDERS_REQUEST });
    const response = await fetch(
      `http://localhost:5000/api/orders/admin/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: DELETE_ORDERS_SUCCESS, payload: responseData.success });
  } catch (error) {
    dispatch({ type: DELETE_ORDERS_FAILURE, payload: error.message });
  }
};

export const editOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const response = await fetch(
      `http://localhost:5000/api/orders/admin/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(status),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: responseData.success });
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAILURE, payload: error.message });
  }
};

export const getAllAdminUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USERS_REQUEST });
    const response = await fetch(
      "http://localhost:5000/api/users/admin/allusers",
      {
        credentials: "include",
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: ADMIN_USERS_SUCCESS, payload: responseData.users });
  } catch (error) {
    dispatch({ type: ADMIN_USERS_FAILURE, payload: error.message });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const response = await fetch(
      `http://localhost:5000/api/users/admin/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: DELETE_USER_SUCCESS, payload: responseData.success });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USER_REQUEST });
    const response = await fetch(
      `http://localhost:5000/api/users/admin/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const responseData = await response.json();

    console.log(responseData);

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: ADMIN_USER_SUCCESS, payload: responseData.success });
  } catch (error) {
    dispatch({ type: ADMIN_USER_FAILURE, payload: error.message });
  }
};

export const productReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_REVIEWS_REQUEST });
    const response = await fetch(
      `http://localhost:5000/api/products/reviews?productid=${id}`,
      { credentials: "include" }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: ADMIN_REVIEWS_SUCCESS, payload: responseData.reviews });
  } catch (error) {
    dispatch({ type: ADMIN_REVIEWS_FAILURE, payload: error.message });
  }
};

export const deleteReview = (productid, reviewid) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    const response = await fetch(
      `http://localhost:5000/api/products/reviews?productid=${productid}&reviewid=${reviewid}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: responseData.success });
  } catch (error) {
    dispatch({ type: DELETE_REVIEW_FAILURE, payload: error.message });
  }
};
