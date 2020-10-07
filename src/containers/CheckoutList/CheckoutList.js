import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { transactionCompleted } from '../../actions';
import history from '../../history';
import { formatNumber, isEmpty, sumBy } from '../../utils';
import Message from '../../components/Message/Message';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';

const CheckoutList = (props) => {
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (isEmpty(props.orders)) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, []);

  const totalAmount = () => {
    const total = sumBy(props.orders, (o) => {
      return o.quantity * o.price;
    });
    return formatNumber(total);
  };

  const showError = () => {
    const hasExistingError = props.destination.message;
    if (hasExistingError || hasError) {
      return (
        <Message
          header="Action Forbidden"
          message={
            props.destination.message ||
            'Please select a valid destination. Delivery is only available within Metro Manila, Philippines'
          }
        />
      );
    }
  };

  const onPlaceOrder = () => {
    if (isEmpty(props.destination)) {
      setHasError(true);
      return;
    } else if (props.destination.message) {
      setHasError(true);
      return;
    } else {
      props.transactionCompleted(props.orders);
    }
  };

  return (
    <React.Fragment>
      <div className="ui divided items">
        {props.orders.map((order) => (
          <CheckoutItem key={order.id} order={order} />
        ))}
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
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: Object.values(state.orders),
    destination: state.map,
  };
};

export default connect(mapStateToProps, { transactionCompleted })(CheckoutList);
