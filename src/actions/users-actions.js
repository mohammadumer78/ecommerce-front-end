import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAIL
} from "../constants/constants";

export const loginUser = (user) => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: LOGIN_REQUEST });

    // INCLUDE CREDENTIALS FOR ACCESSING COOKIES

    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: LOGIN_SUCCESS, payload: responseData });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const signupUser = (myForm) => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: SIGNUP_REQUEST });

    const response = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      body: myForm,
      credentials: "include",
    });

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: SIGNUP_SUCCESS, payload: responseData });
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
  }
};

export const logOutUser = (myForm) => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: LOGOUT_REQUEST });

    const response = await fetch("http://localhost:5000/api/users/logout", {
      credentials: "include",
    });

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.message });
  }
};

export const loadUser = (myForm) => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const response = await fetch("http://localhost:5000/api/users/me", {
      credentials: "include",
    });

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: LOAD_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.message });
  }
};

export const updateUser = (myForm) => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const response = await fetch(
      "http://localhost:5000/api/users/me/updateprofile",
      {
        method: "PATCH",
        body: myForm,
        credentials: "include",
      }
    );

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: UPDATE_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error.message });
  }
};
export const updatePassword = (passwords) => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const response = await fetch(
      "http://localhost:5000/api/users/password/updatepassword",
      {
        method: "PATCH",
        body: JSON.stringify(passwords),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: UPDATE_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.message });
  }
};

export const forgetpassword = (email) => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: FORGET_PASSWORD_REQUEST });

    const user = {email:email}

    const response = await fetch(
      "http://localhost:5000/api/users/forgetpassword",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: FORGET_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({ type: FORGET_PASSWORD_FAIL, payload: error.message });
  }
};


export const resetpassword = (passwords,token) => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });


    const response = await fetch(
      `http://localhost:5000/api/users/password/reset/${token}`,
      {
        method: "PATCH",
        body: JSON.stringify(passwords),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: RESET_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAIL, payload: error.message });
  }
};
