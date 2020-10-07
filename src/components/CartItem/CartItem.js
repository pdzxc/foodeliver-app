import React from 'react';
import { formatNumber } from '../../utils';

const CartItem = ({ order, removeToCart, addToCart }) => {
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
            onClick={() => removeToCart(order)}
            className="ui red icon trash alternate button"
          >
            <i className="icon trash alternate" />
          </button>
          <div className="or"></div>
          <button
            onClick={() => addToCart(order)}
            className="ui olive icon plus button"
          >
            <i className="icon plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
