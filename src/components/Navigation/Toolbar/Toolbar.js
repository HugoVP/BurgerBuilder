import React from 'react';
import PropTypes from 'prop-types';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

function toolbar(props) {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      
      <div className={classes.Logo}>
        <Logo />
      </div>
      
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </header>
  );
}

toolbar.propTypes = {
    drawerToggleClicked: PropTypes.func.isRequired,
};

export default toolbar;