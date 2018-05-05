import React, { Component } from "react";
import PropTypes from 'prop-types';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

class Burger extends Component {
  static propTypes = {
    ingredients: PropTypes.shape({
      salad: PropTypes.number.isRequired,
      bacon: PropTypes.number.isRequired,
      cheese: PropTypes.number.isRequired,
      meat: PropTypes.number.isRequired,
    })
    .isRequired,
  };

  render() {
    const { ingredients } = this.props;
    
    const transformedIngredients = Object.keys(ingredients)
      .map(ingredientKey => [...Array(ingredients[ingredientKey])]
        .map((_, index) => (
          <BurgerIngredient
            key={ingredientKey + index}
            type={ingredientKey}
          />
        ))
      );

    return (
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {transformedIngredients }
        <BurgerIngredient type="bread-bottom" />
      </div>
    );
  }
}

export default Burger;