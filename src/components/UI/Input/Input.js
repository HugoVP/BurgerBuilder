import React from 'react'

import classes from './Input.css'

function input({
  elementType,
  elementConfig,
  label,
  value,
}) {
  let inputElement;
  
  switch (elementType) {
    case ('input'): {
      inputElement = (
        <input
          className={classes.InputElement}
          value={value}
          {...elementConfig}
        />
      );
      
      break;
    }

    case ('textarea'): {
      inputElement = (
        <textarea
          className={classes.InputElement}
          value={value}
          {...elementConfig}
        />
      );
      
      break;
    }

    case ('select'): {
      inputElement = (
        <select
          className={classes.InputElement}
          value={value}
        >
          {
            elementConfig.options.map(({value, displayValue}) => (
              <option
                key={value}
                value={value}
              >
                {displayValue}
              </option>
            ))
          }
        </select>
      );

      break;
    }

    default: {
      inputElement = (
        <input
          className={classes.InputElement}
          value={value}
          {...elementConfig}
        />
      );
    }
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>
        {label}
      </label>
      {inputElement}
    </div>
  );
}

export default input