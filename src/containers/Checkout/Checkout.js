import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinue={this.checkoutContinueHandler}
        />

        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    )
  }
}

function mapStateToProps({ingredients}) {
  return {
    ingredients,
  };
}

export default connect(mapStateToProps)(Checkout)