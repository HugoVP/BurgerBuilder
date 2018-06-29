import React from 'react'

import classes from './Order.css'

function order({ingredients = {}, price}) {
  const ingredientsOutput = Object.keys(ingredients)
    .map((key) => (
      <span
        key={key}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
      >
        {key} ({ingredients[key]})
      </span>
    ));

  const priceOutput = parseFloat(price).toFixed(2);

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>USD {priceOutput}</strong></p>
    </div>
  )
}

export default order