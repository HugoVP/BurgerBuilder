import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

function navigationItems({isAuthenticated}) {
  let ordersNavigationItem;
  let authNavigationItem;

  if (isAuthenticated) {
    ordersNavigationItem = (
      <NavigationItem link="/orders">
        Orders
      </NavigationItem>
    );

    authNavigationItem = (
      <NavigationItem link="/logout">
        Logout
      </NavigationItem>
    );
  } else {
    authNavigationItem = (
      <NavigationItem link="/auth">
        Authenticate
      </NavigationItem>  
    );
  }
  
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem
        link="/"
        exact
      >
        Burger Builder
      </NavigationItem>

      {ordersNavigationItem}
      {authNavigationItem}
    </ul>
  );
}

export default navigationItems;