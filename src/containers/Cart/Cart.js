import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeToCart } from '../../actions';
import { formatNumber, isEmpty, sumBy } from '../../utils';
import CartItem from '../../components/CartItem/CartItem';

const Cart = (props) => {
  const totalAmount = () => {
    const total = sumBy(props.orders, (o) => {
      return o.quantity * o.price;
    });
    return formatNumber(total);
  };

  const renderList = () => {
    if (isEmpty(props.orders)) {
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
            {props.orders.map((order) => (
              <CartItem
                key={order.id}
                addToCart={props.addToCart}
                removeToCart={props.removeToCart}
                order={order}
              />
            ))}
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

const mapStateToProps = (state) => {
  return { orders: Object.values(state.orders) };
};

export default connect(mapStateToProps, { addToCart, removeToCart })(Cart);
