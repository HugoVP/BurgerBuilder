import React, { Component } from 'react';

import axios from 'axios';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    const orders = this.props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));

    return <div>{orders}</div>;
  }
}

function mapStateToProps(state) {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchOrders: (token, userId) => {
      dispatch(fetchOrders(token, userId));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
