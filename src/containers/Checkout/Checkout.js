import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
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
    const { ingredients, purchased } = this.props;

    if (purchased || !ingredients) {
      return <Redirect to='/' />;
    }

    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
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

function mapStateToProps(state) {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.orders.purchased,
  };
}

export default connect(mapStateToProps)(Checkout)