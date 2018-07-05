import React, { Component } from 'react';
import { connect } from 'react-redux'

import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {
  addIngredient,
  removeIngredient,
  asyncSetIngredients,
} from '../../store/actions'

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }
  
  isPurchasable = () => {
    const { ingredients } = this.props;
    
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => sum + el, 0);
      
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCanceledHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinuedHandler = () => {
    this.props.history.push('/checkout');
  };

  componentDidMount() {
    this.props.onSetIngredients();
  }

  render() {
    if (!this.props.ingredients) {
      if (this.props.error) {
        console.log(this.props.error);
        return <p>Ingredients can't be loaded</p>
      }

      return <Spinner />
    }
    
    const disabledInfo = {...this.props.ingredients};

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    const orderSummary = (
      <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        purchaseCanceled={this.purchaseCanceledHandler}
        purchaseContinued={this.purchaseContinuedHandler}
      />
    );
    
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCanceledHandler}
        >
          {orderSummary}
        </Modal>
      
        <Burger ingredients={this.props.ingredients} />

        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={this.isPurchasable()}
          ordered={this.purchaseHandler}
          price={this.props.totalPrice}
        />
      </Aux>
    )
  }
}

function mapStateToProps(state) {
  const {
    ingredients,
    totalPrice,
    error,
  } = state.burgerBuilder;
  
  return {
    ingredients,
    totalPrice,
    error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onIngredientAdded: (ingredientName) => {
      dispatch(addIngredient(ingredientName));
    },
    onIngredientRemoved: (ingredientName) => {
      dispatch(removeIngredient(ingredientName));
    },
    onSetIngredients: () => {
      dispatch(asyncSetIngredients());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
)