import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

function navigationItems() {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem
                link="/"
                active
            >
                Burger Builder
            </NavigationItem>
            <NavigationItem
                link="/"
            >
                Checkout
            </NavigationItem>
        </ul>
    );
}

export default navigationItems;