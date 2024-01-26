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

// METHOD WILL BE CALLED IN PAGES

export const getProducts = (keyword="",currentPage=1,price=[0,25000],category,ratings=0) => async (dispatch) => {
  let responseData;
 
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    // THESE METHODS WILL BE CALLED BY USING USE DISPATCHER THATS WHY
    // WE HAVE TO CALL ASYNC FUNCTION PASS DISPATCH

    let url = `http://localhost:5000/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings=${ratings}`;

    if(category)
    {
       url = `http://localhost:5000/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings=${ratings}`;
    }
    
    const response = await fetch(url);

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: responseData });
  } catch (error) {
    dispatch({ type: ALL_PRODUCT_FAILURE, payload: error.message });
  }
};

export function getProductDetails(id) {
  return async function (dispatch) {
    let responseData;

    try {
      dispatch({ type: ALL_PRODUCT_DETAILS_REQUEST });

      // THESE METHODS WILL BE CALLED BY USING USE DISPATCHER THATS WHY
      // WE HAVE TO CALL ASYNC FUNCTION PASS DISPATCH

      const response = await fetch(`http://localhost:5000/api/products/${id}`);

      responseData = await response.json();

      // IF SERVER HAS THROWN ERROE CODE JUMP TO CATCH BLOCK

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      // ELSE PUT THESE PRODUCTS IN STATE

      dispatch({ type: ALL_PRODUCT_DETAILS_SUCCESS, payload: responseData });
    } catch (error) {
      dispatch({ type:   ALL_PRODUCT_DETAILS_FAILURE
        , payload: error.message });
    }
  };
}

export function review(data) {
  return async function (dispatch) {
    let responseData;

    try {
      dispatch({ type: REVIEW_REQUEST });



      const response = await fetch(`http://localhost:5000/api/products/review`,{method:"PATCH",body:JSON.stringify(data),headers:{"Content-Type":"application/json"},credentials:"include"});

      responseData = await response.json();

      // IF SERVER HAS THROWN ERROE CODE JUMP TO CATCH BLOCK

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      // ELSE PUT THESE PRODUCTS IN STATE

      dispatch({ type: REVIEW_SUCCESS, payload: responseData });
    } catch (error) {
      dispatch({ type:   REVIEW_FAIL
        , payload: error.message });
    }
  };
}
