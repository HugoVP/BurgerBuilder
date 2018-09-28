import * as actionTypes from './actionTypes'

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
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData,
    token,
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
  return {
    type: actionTypes.FETCH_ORDERS,
    token,
    userId,
  };
}