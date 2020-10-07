import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';

import Home from '../pages/Home';
import Checkout from '../pages/Checkout';
import ManageOrders from '../pages/ManageOrders';
import TrackOrder from '../pages/TrackOrder';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/manage-orders" exact component={ManageOrders} />
        <Route path="/track-order/:id" exact component={TrackOrder} />
      </Switch>
    </Router>
  );
};

export default App;
