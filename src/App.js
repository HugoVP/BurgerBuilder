import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout';

function app() {
  return (
    <Layout>
      <Switch>
        <Route
          path="/auth"
          component={Auth}
        />

        <Route
          path="/logout"
          component={Logout}
        />
        
        <Route
          path="/checkout"
          component={Checkout}
        />

        <Route
          path="/orders"
          component={Orders}
        />

        <Route
          path="/"
          exact
          component={BurgerBuilder}
        />
      </Switch>
    </Layout>
  );
}

export default app
