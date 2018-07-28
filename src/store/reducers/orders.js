import * as actionTypes from '../actions/actionTypes'

const initState = {
  orders: [],
  loading: false,
  purchased: false,
};

function orderReducer(state = initState, action) {
  switch (action.type) {
    case (actionTypes.PURCHASE_INIT): {
      return {
        ...state,
        purchased: false,
      };
    }
    
    case (actionTypes.PURCHASE_BURGER_START): {
      return {
        ...state,
        loading: true,
      };
    }
    
    case (actionTypes.PURCHASE_BURGER_SUCCESS): {
      const order = {
        ...action.orderData,
        id: action.orderId,
      };
      
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(order),
      };
    }

    case (actionTypes.PURCHASE_BURGER_FAIL): {
      return {
        ...state,
        loading: false,
      }
    }
    
    default: {
      return state;
    }
  }
}

export default orderReducer