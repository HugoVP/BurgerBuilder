import React from 'react';
import PropTypes from 'prop-types';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

function sideDrawer(props) {
    let attachedClasses = `${classes.SideDrawer} ${props.open ? classes.Open : classes.Close}`;

    return (
        <Aux>
            <Backdrop
                show={props.open}
                clicked={props.closed}
            />
            <div className={attachedClasses}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </Aux>
    );
}

sideDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    closed: PropTypes.func.isRequired,
};

export default sideDrawer;