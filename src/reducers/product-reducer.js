import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAILURE,
  ALL_PRODUCT_DETAILS_REQUEST,
  ALL_PRODUCT_DETAILS_SUCCESS,
  ALL_PRODUCT_DETAILS_FAILURE,
  REVIEW_REQUEST,
  REVIEW_SUCCESS,
  REVIEW_FAIL
} from "../constants/constants";

// REDUCER FUNCTION FOR PRODUCTS

export function ProductReducer(state = { products: [] }, action) 
{

  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        productPerPage: action.payload.productPerPage
      };
    case ALL_PRODUCT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

// REDUCER FUNCTION FOR PRODUCTS
  
export function ProductDetailsReducer(state = { productDetails: {} }, action) 
{

  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {

      case ALL_PRODUCT_DETAILS_REQUEST:
        return {
          loading: true,
          productDetails: {},
        };
      case ALL_PRODUCT_DETAILS_SUCCESS:
        return {
          loading: false,
          productDetails: action.payload.product
        };
      case ALL_PRODUCT_DETAILS_FAILURE:
        return {
          loading: false,
          error: action.payload,
        };
    default:
      return state;
  }
}

export function reviewReducer(state = {  }, action) 
{

  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {

      case REVIEW_REQUEST:
        return {
          loading: true,
        };
      case REVIEW_SUCCESS:
        return {
          loading: false,
          review: action.payload
        };
      case REVIEW_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
    default:
      return state;
  }
}
