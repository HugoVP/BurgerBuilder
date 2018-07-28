import React, { Component } from 'react'

import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { fetchOrders } from '../../store/actions'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }
  
  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    const orders = this.props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
    
    return (
      <div>
        {orders}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchOrders: () => {
      dispatch(fetchOrders());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Orders, axios)
)