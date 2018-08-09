import React from 'react';

import classes from './CheckoutSummary.css'

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

function checkoutSummary({
  ingredients,
  checkoutCancelled,
  checkoutContinue,
}) {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <div
        style={{width: '100%', margin: 'auto'}}
      >
        <Burger ingredients={ingredients} />
        
        <Button
          btnType="Danger"
          clicked={checkoutCancelled}
        >
          CANCEL
        </Button>

        <Button
          btnType="Success"
          clicked={checkoutContinue}
        >
          CONTINUE
        </Button>
      </div>
    </div>
  )
}

export default checkoutSummary;