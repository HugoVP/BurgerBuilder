 import React from 'react';
 import PropTypes from 'prop-types';

 import classes from './Button.css';
 
 function button(props) {
     return (
         <button
            className={`${classes.Button} ${classes[props.btnType]}`}
            onClick={props.clicked}
        >
            {props.children}
         </button>
     );
 }

 button.propTypes = {
    children: PropTypes.node.isRequired,
    btnType: PropTypes.oneOf([
        'Success',
        'Danger'
    ]).isRequired,
    clicked: PropTypes.func.isRequired,
 };
 
 export default button;