import React, { Component } from 'react';

import {
  Route,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));



class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  
  render() {
    const routes = (this.props.isAuthenticated ? ([
      <Route
        path="/orders"
        component={asyncOrders}
      />,
      <Route
        path="/checkout"
        component={asyncCheckout}
      />,
      <Route
        path="/logout"
        component={Logout}
      />,
    ]) : ([])).map((route, key) => ({
      ...route,
      key,
    }));

    return (
      <Layout>
        <Switch>
          {routes}

          <Route
            path="/auth"
            component={asyncAuth}
          />

          <Route
            path="/"
            exact
            component={BurgerBuilder}
          />

          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.token !== null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTryAutoSignup: () => {
      dispatch(authCheckState());
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
