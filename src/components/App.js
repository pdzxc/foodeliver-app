import '../assets/css/style.css';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import MenuList from './MenuList';
import ViewCart from './ViewCart';
import Checkout from './Checkout';

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
        <Route path="/track-order" exact component={TrackOrder} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
