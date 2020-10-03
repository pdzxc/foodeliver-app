import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import history from '../history';
import { formatNumber } from '../helpers';
import { transactionCompleted } from '../actions';

import Message from './shared/Message';
import Map from './shared/Map';

const Checkout = (props) => {
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (_.isEmpty(props.orders)) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, []);

  const totalAmount = () => {
    const total = _.sumBy(props.orders, (o) => {
      return o.quantity * o.price;
    });
    return formatNumber(total);
  };

  const showError = () => {
    if (hasError) {
      return (
        <Message
          header="Action Forbidden"
          message="Please select a valid destination."
        />
      );
    }
  };

  const onPlaceOrder = () => {
    if (_.isEmpty(props.destination)) {
      setHasError(true);
      return;
    }
    props.transactionCompleted(props.orders);
  };

  const renderOrders = props.orders.map((order) => {
    return (
      <div className="item" key={order.id}>
        <div className="ui small image">
          <img src={order.thumbnail} alt={order.name} />
        </div>
        <div className="content">
          <div className="header">{order.name}</div>
          <div className="meta">
            <span className="price">
              &#8369; {formatNumber(order.quantity * order.price)}
            </span>
            <span className="stay">({order.quantity})</span>
            <div className="description">
              <p>{order.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
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
            <div className="ui divided items">
              {renderOrders}
              <div className="item">
                <div className="content">
                  <h2 className="ui red header">
                    &#8369; {totalAmount()}
                    <div className="sub header">Total</div>
                  </h2>
                </div>
              </div>
            </div>
            <button className="ui red button" onClick={onPlaceOrder}>
              Place your order
            </button>
            {showError()}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: Object.values(state.orders),
    destination: state.map,
  };
};

export default connect(mapStateToProps, { transactionCompleted })(Checkout);
