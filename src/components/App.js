import '../assets/css/style.css';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Header from './shared/Header';
import Footer from './shared/Footer';
import MenuList from './MenuList';
import ViewCart from './ViewCart';
import Checkout from './Checkout';
import ManageOrders from './ManageOrders';

import history from '../history';
import TrackOrder from './TrackOrder';

const App = () => {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route path="/" exact component={MenuList} />
        <Route path="/cart" exact component={ViewCart} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/track-order/:id" exact component={TrackOrder} />
        <Route path="/admin/manage-orders" exact component={ManageOrders} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
