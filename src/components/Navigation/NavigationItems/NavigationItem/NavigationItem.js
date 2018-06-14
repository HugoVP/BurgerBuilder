import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

function navigationItem(props) {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        exact={props.exact}
        activeClassName={classes.active}
      >
        {props.children}
      </NavLink>
    </li>
  );
}

const urlRegex = /^(https?\/\/)?\/?([\d\w])*$/;

navigationItem.propTypes = {
  children: PropTypes.node.isRequired,
  exact: PropTypes.bool,
  link: (props, propName, componentName) => (
      !urlRegex.test(props[propName]) ? new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
      ) : null
  ),
};

export default navigationItem;