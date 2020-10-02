import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeToCart } from '../actions';
import Sidebar from './Sidebar';
import history from '../history';
import { formatNumber } from '../helpers';

const ViewCart = (props) => {
  const totalAmount = () => {
    const total = _.sumBy(props.orders, (o) => {
      return o.quantity * o.price;
    });
    return formatNumber(total);
  };

  const renderOrders = props.orders.map((order) => {
    return (
      <div className="item" key={order.id}>
        <div className="content">
          <div className="header">{order.name}</div>

          <div className="description">{order.description}</div>
        </div>
        <div className="extra content">
          <div className="meta">
            <span className="price">
              &#8369; {formatNumber(order.quantity * order.price)}
            </span>
            <span className="stay">({order.quantity})</span>
          </div>
          <div className="ui buttons">
            <button
              onClick={() => props.removeToCart(order)}
              className="ui red icon trash alternate button"
            >
              <i className="icon trash alternate" />
            </button>
            <div className="or"></div>
            <button
              onClick={() => props.addToCart(order)}
              className="ui olive icon plus button"
            >
              <i className="icon plus" />
            </button>
          </div>
        </div>
      </div>
    );
  });
  const renderList = () => {
    if (_.isEmpty(props.orders)) {
      return (
        <React.Fragment>
          <p style={{ textAlign: 'center' }}>Start adding items to your cart</p>
          <button className="fluid disabled button ui">Go to Checkout</button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="ui divided items">
            {renderOrders}
            <div className="item">
              <div className="content">
                <h2 className="ui header">
                  &#8369; {totalAmount()}
                  <div className="sub header">Total</div>
                </h2>
              </div>
            </div>
          </div>
          <Link to="/checkout" className="fluid red button ui">
            Go to Checkout
          </Link>
        </React.Fragment>
      );
    }
  };
  const renderContent = () => {
    return (
      <React.Fragment>
        <h2 className="ui header dividing left aligned">
          <i className="shopping cart icon"></i>
          <div className="content">
            Shopping Cart
            <div className="sub header">Manage your order</div>
          </div>
        </h2>
        {renderList()}
      </React.Fragment>
    );
  };
  return (
    <div>
      <Sidebar content={renderContent()} onDismiss={() => history.push('/')} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { orders: Object.values(state.orders) };
};

export default connect(mapStateToProps, { addToCart, removeToCart })(ViewCart);
