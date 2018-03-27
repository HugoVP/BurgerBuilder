import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

function orderSummary(props) {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((key) => (
            <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
            </li>
        ));

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicius burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button
                btnType="Danger"
                clicked={props.purchaseCanceled}
            >
                CANCEL
            </Button>
            <Button
                btnType="Success"
                clicked={props.purchaseContinued}
            >
                CONTINUE
            </Button>
        </Aux>
    );
}

orderSummary.propTypes = {
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.shape({
        salad: PropTypes.number.isRequired,
        bacon: PropTypes.number.isRequired,
        cheese: PropTypes.number.isRequired,
        meat: PropTypes.number.isRequired,
    })
    .isRequired,
    purchaseContinued: PropTypes.func.isRequired,
    purchaseCanceled: PropTypes.func.isRequired,
};

export default orderSummary;