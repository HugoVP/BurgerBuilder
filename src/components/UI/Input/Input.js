import React from 'react'
import PropTypes from 'prop-types'

import classes from './Input.css'

function input({
  elementType,
  elementConfig,
  label,
  value,
}) {
  let inputElement;

  console.log(elementConfig);
  
  
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

const {
  string,
  oneOf,
  oneOfType,
  shape,
  arrayOf,
} = PropTypes;

const elementConfigTypeInput = shape({
  type: oneOf([
    'text',
    'email',
  ]).isRequired,
  placeholder: string.isRequired,
});

const elementConfigTypeSelect = shape({
  options: arrayOf(
    shape({
      value: string.isRequired,
      displayValue: string.isRequired,
    }),
  ).isRequired,
});

input.propTypes = {
  elementType: string.isRequired,
  elementConfig: oneOfType([
    elementConfigTypeInput,
    elementConfigTypeSelect,
  ]).isRequired,
}

export default input