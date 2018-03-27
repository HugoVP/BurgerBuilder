import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.css';

function backdrop(props) {
    return props.show ? (
        <div
            className={classes.Backdrop}
            onClick={props.clicked}
        >
            {props.children}
        </div>
    ) : null;
}

backdrop.propTypes = {
    children: PropTypes.node,
    clicked: PropTypes.func.isRequired,
};

export default backdrop;