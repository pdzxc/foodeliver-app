import React from 'react';
import { formatNumber } from '../../utils';

const CheckoutItem = ({ order }) => (
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

export default CheckoutItem;
