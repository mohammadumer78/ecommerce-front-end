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

// REDUCER FUNCTION FOR USERS

export function usersReducer(
  state = { currentUser: {}, isAuthenticated: false },
  action
) {
  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        currentUser: {},
      };
    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        currentUser: action.payload.user,
      };
    case LOGIN_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        currentUser: null,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: action.payload,
      };

    case SIGNUP_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        currentUser: {},
      };
    case SIGNUP_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        currentUser: action.payload.user,
      };
    case SIGNUP_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: null,
      };
    case LOGOUT_REQUEST:
      return {
        loading: true,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      };
    case LOGOUT_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        currentUser: null,
      };
    default:
      return state;
  }
}

//REDUCER FOR PROFILE

export function profileReducer(state = {}, action) {
  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        loading: true,
        isUpdated: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        isUpdated: true,
      };
    case UPDATE_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        isUpdated: false,
        error: action.payload,
      };
    case UPDATE_PASSWORD_REQUEST:
    case FORGET_PASSWORD_REQUEST:
      case RESET_PASSWORD_REQUEST:

      return {
        loading: true,
        isUpdated: false,
      };
    case UPDATE_PASSWORD_SUCCESS:
    case FORGET_PASSWORD_SUCCESS:
      case RESET_PASSWORD_SUCCESS:
      return {
        loading: false,
        isUpdated: true,
      };
    case UPDATE_PASSWORD_FAIL:
     case RESET_PASSWORD_FAIL:
    case FORGET_PASSWORD_FAIL:
      return {
        loading: false,
        isUpdated: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
