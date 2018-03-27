import React from "react";
import PropTypes from 'prop-types';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

function burger(props) {
    const transformedIngredients = Object.keys(props.ingredients)
        .map((ingredientKey) => [...Array(props.ingredients[ingredientKey])]
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

burger.propTypes = {
    ingredients: PropTypes.shape({
        salad: PropTypes.number.isRequired,
        bacon: PropTypes.number.isRequired,
        cheese: PropTypes.number.isRequired,
        meat: PropTypes.number.isRequired,
    })
    .isRequired,
};

export default burger;