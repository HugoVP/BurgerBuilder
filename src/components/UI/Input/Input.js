import React from 'react'
import PropTypes from 'prop-types'

import classes from './Input.css'

function input({
  elementType,
  elementConfig,
  label,
  value,
  changed,
}) {
  let inputElement;
  
  switch (elementType) {
    case ('input'): {
      inputElement = (
        <input
          className={classes.InputElement}
          value={value}
          onChange={changed}
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
          onChange={changed}
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
          onChange={changed}
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
          onChange={changed}
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

const elementConfigTypeInput = PropTypes.shape({
  type: PropTypes.oneOf([
    'text',
    'email',
  ]).isRequired,
  placeholder: PropTypes.string.isRequired,
});

const elementConfigTypeSelect = PropTypes.shape({
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      displayValue: PropTypes.string.isRequired,
    }),
  ).isRequired,
});

input.propTypes = {
  elementType: PropTypes.string.isRequired,
  elementConfig: PropTypes.oneOfType([
    elementConfigTypeInput,
    elementConfigTypeSelect,
  ]).isRequired,
  label: PropTypes.string,
  value: PropTypes.any.isRequired,
  changed: PropTypes.func.isRequired,
}

export default input