import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

function app() {
  return (
    <Layout>
      <Switch>
        <Route
          path="/checkout"
          component={Checkout}
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

export default app;
