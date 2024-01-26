// IMPORT HEADER FILES

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import thunk from "redux-thunk";

import {
  deleteInventory,
  AdminInventory,
  createInventory,
  editProduct,
  updateProduct,
  AdminOrder,
  EditOrder,
  UpdateOrder,
  AdminUsers,
  editUser,
  UpdateUser,
  AdminReviews,
  deleteReview
} from "./reducers/admin-reducer";

import { createOrder, myOrders, SingleOrder } from "./reducers/order-reducer";

import { composeWithDevTools } from "redux-devtools-extension";

import { cartReducer } from "./reducers/cart-reducer";

import {
  ProductDetailsReducer,
  ProductReducer,
  reviewReducer,
} from "./reducers/product-reducer";

import { usersReducer, profileReducer } from "./reducers/user-reducer";

// CREATE THREE THINGS

// REDUCERS

// GIVE REDUCERES STATES NAMES EG PRODUCTS

const reducer = combineReducers({
  products: ProductReducer,
  productDetails: ProductDetailsReducer,
  users: usersReducer,
  cart: cartReducer,
  profile: profileReducer,
  order: createOrder,
  myOrders: myOrders,
  orderDetails: SingleOrder,
  review: reviewReducer,
  Inventory: AdminInventory,
  newProduct: createInventory,
  delete: deleteInventory,
  edit: editProduct,
  update: updateProduct,
  adminOrders: AdminOrder,
  editOrder: EditOrder,
  updateOrder: UpdateOrder,
  adminUsers : AdminUsers,
  editUser : editUser,
  updateUser : UpdateUser,
  adminReviews : AdminReviews,
  DeleteReview : deleteReview
});

// INITIAL STATE

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cart item")
      ? JSON.parse(localStorage.getItem("cart item"))
      : [],
    shippingInfo: localStorage.getItem("shipping item")
      ? JSON.parse(localStorage.getItem("shipping item"))
      : {},
  },

  users: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
};

// MIDDLE WARES

const middleWare = [thunk];

// CREATE STORAGE

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
