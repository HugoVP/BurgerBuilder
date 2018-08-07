import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export function purchaseBurgerSuccess(orderId, orderData) {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData,
  };
}

export function purchaseBurgerFail(error) {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
}

export function purchaseBurgerStart() {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
}

export function purchaseBurger(orderData, token) {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    const queryParams = `auth=${token}`;
    
    axios.post(`/orders.json?${queryParams}`, orderData)
      .then(({data}) => {
        dispatch(purchaseBurgerSuccess(data.name, orderData))
      })
      .catch((error) => {
        purchaseBurgerFail(error);
      })
  };
}

export function purchaseInit() {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
}

export function fetchOrdersSuccess(orders) {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
}

export function fetchOrdersFail(error) {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  };
}

export function fetchOrderStart() {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
}

export function fetchOrders(token, userId) {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    const queryParams = `auth=${token}&orderBy="userId"&equalTo="${userId}"`;

    axios.get(`/orders.json?${queryParams}`)
      .then(({ data }) => {
        const orders = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(error));
      });
  };
}