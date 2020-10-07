import React from 'react';
import { BodyProvider } from '../components/Body/Body';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import CheckoutList from '../containers/CheckoutList/CheckoutList';
import Map from '../containers/Map/Map';

const Checkout = () => {
  return (
    <BodyProvider value={false}>
      <Main>
        <Header />
        <div className="ui container">
          <h1 className="ui header">Select Your Address</h1>
          <div className="ui stackable grid">
            <div className="eight wide column">
              <Map
                lat="121.04682017220466"
                lng="14.569330253822642"
                hasGeocoder="true"
              />
            </div>
            <div className="eight wide column">
              <div className="ui segment">
                <CheckoutList />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Main>
    </BodyProvider>
  );
};

export default Checkout;
