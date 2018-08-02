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
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions';


class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  
  render() {
    const routes = (this.props.isAuthenticated ? ([
      <Route
        path="/orders"
        component={Orders}
      />,
      <Route
        path="/checkout"
        component={Checkout}
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
            component={Auth}
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
