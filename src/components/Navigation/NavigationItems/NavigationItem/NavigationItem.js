import React from 'react';
import PropTypes from 'prop-types';

import classes from './NavigationItem.css';

function navigationItem(props) {
    return (
        <li className={classes.NavigationItem}>
            <a
                className={props.active ? classes.active : null}
                href={props.link}
            >
                {props.children}
            </a>
        </li>
    );
}

const urlRegex = /^(https?\/\/)?\/?([\d\w])*$/;

navigationItem.propTypes = {
    children: PropTypes.node.isRequired,
    link: (props, propName, componentName) => (
        !urlRegex.test(props[propName]) ? new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Validation failed.'
        ) : null
    ),
    active: PropTypes.bool,
};

export default navigationItem;