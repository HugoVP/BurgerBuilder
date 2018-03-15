import React from "react";

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

export default burger;