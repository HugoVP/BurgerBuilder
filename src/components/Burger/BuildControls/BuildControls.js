import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {
        label: 'Salad',
        type: 'salad',
    },
    {
        label: 'Bacon',
        type: 'bacon',
    },
    {
        label: 'Cheese',
        type: 'cheese',
    },
    {
        label: 'Meat',
        type: 'meat',
    },
];

function buildControls(props) {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {
                controls.map((control) => (
                    <BuildControl
                        key={control.label}
                        label={control.label}
                        added={() => props.ingredientAdded(control.type)}
                        removed={() => props.ingredientRemoved(control.type)}
                        disabled={props.disabled[control.type]} 
                    />
                ))
            }
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
            >
                ORDER NOW
            </button>
        </div>
    );
}

buildControls.propTypes = {
    price: PropTypes.number.isRequired,
    purchasable: PropTypes.bool.isRequired,
    // disabled: PropTypes.shape({
    //     salad: PropTypes.bool.isRequired,
    //     bacon: PropTypes.bool.isRequired,
    //     cheese: PropTypes.bool.isRequired,
    //     meat: PropTypes.bool.isRequired,
    // })
    // .isRequired,
    ordered: PropTypes.func.isRequired,
    ingredientAdded: PropTypes.func.isRequired,
    ingredientRemoved: PropTypes.func.isRequired,
};

export default buildControls;