import React, { Component } from 'react';

import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    this.setState({purchasable: sum > 0});
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    
    const updatedIngredients = {
      ...this.state.ingredients,
    };    
    
    updatedIngredients[type] = updatedCount;
    
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + priceAddition;
    
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients,
    });

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }
    
    const updatedCount = oldCount - 1;
    
    const updatedIngredients = {
      ...this.state.ingredients,
    };    
    
    updatedIngredients[type] = updatedCount;
    
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceDeduction;
    
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients,
    });

    this.updatePurchaseState(updatedIngredients);
  };

  purchaseCanceledHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinuedHandler = () => {
    const {
      ingredients,
      totalPrice,
    } = this.state;
    
    const queryParams = Object.keys(ingredients).map((i) => (
      `${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`
    ));

    queryParams.push(`price=${totalPrice}`);

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
    });
  };

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(({data}) => this.setState({ingredients: data}))
      .catch(error => this.setState({error}));
  }

  render() {
    if (!this.state.ingredients) {
      if (this.state.error) {
        return <p>Ingredients can't be loaded</p>
      }

      return <Spinner />
    }
    
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    const orderSummary = this.state.loading ? (
      <Spinner />
    ) : (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
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
      
        <Burger ingredients={this.state.ingredients} />

        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
        />
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);