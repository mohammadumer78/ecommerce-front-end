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
  ADMIN_REVIEWS_FAILURE,
  ADMIN_REVIEWS_REQUEST,
  ADMIN_REVIEWS_SUCCESS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE
  
  
  
} from "../constants/constants";

export function AdminInventory(state = { products: [] }, action) {
  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ADMIN_PRODUCT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function createInventory(state = {product:{}}, action) {
  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {
    case CREATE_INVENTORY_REQUEST:
      return {
        loading: true,
      };
    case CREATE_INVENTORY_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case CREATE_INVENTORY_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}


export function deleteInventory(state = {product:{}}, action) {
  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {
    case DELETE_REQUEST:
      return {
        loading: true,
      };
    case DELETE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case DELETE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}


export function editProduct(state = {product:{}}, action) {
  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {
    case EDIT_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        
      };
    case EDIT_PRODUCT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function updateProduct(state = {}, action) {
  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
        success : false
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload,

        
      };
    case UPDATE_PRODUCT_FAILURE:
      return {
        loading: false,
        error: action.payload,
        success : false
      };
    default:
      return state;
  }
}

export function AdminOrder(state = {orders:[]}, action) {
  switch (action.type) {
    case ADMIN_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case ADMIN_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function EditOrder(state = {}, action) {
  switch (action.type) {
    case DELETE_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case DELETE_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function UpdateOrder(state = {}, action) {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST :
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case UPDATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function AdminUsers(state = {users : []}, action) {
  switch (action.type) {
    case ADMIN_USERS_REQUEST :
      return {
        ...state,
        loading: true,
      };

    case ADMIN_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case ADMIN_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}


export function editUser(state = {}, action) {
  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case DELETE_USER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function UpdateUser(state = {}, action) {
  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {
    case ADMIN_USER_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_USER_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case ADMIN_USER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}


export function AdminReviews(state = { Reviews : []}, action) {
  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {
    case ADMIN_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        Reviews: action.payload,
      };
    case ADMIN_REVIEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case DELETE_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}


export function deleteReview(state ={}, action) {
  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case DELETE_REVIEW_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}