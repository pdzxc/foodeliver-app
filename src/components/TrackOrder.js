import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTransaction } from '../actions';
import { formatNumber, secondsToHms } from '../helpers';
import Map from './Map';
import LoadingSpinner from './LoadingSpinner';

const TrackOrder = (props) => {
  useEffect(() => {
    props.fetchTransaction(props.match.params.id);
    // eslint-disable-next-line
  }, []);

  const totalAmount = () => {
    if (props.transaction) {
      const total = _.sumBy(props.transaction.items, (o) => {
        return o.quantity * o.price;
      });
      return formatNumber(total);
    }
  };

  const renderMap = () => {
    if (!props.map || !props.transaction) {
      return <LoadingSpinner />;
    } else {
      return (
        <Map
          lat={props.transaction.destination.lat}
          lng={props.transaction.destination.lng}
          hasMarker="true"
        />
      );
    }
  };
  const renderItems = () => {
    if (props.transaction) {
      return props.transaction.items.map((i) => {
        return (
          <div className="item" key={i.id}>
            <div className="ui small image">
              <img src={i.thumbnail} alt={i.name} />
            </div>
            <div className="content">
              <div className="header">{i.name}</div>
              <div className="meta">
                <span className="price">
                  &#8369; {formatNumber(i.quantity * i.price)}
                </span>
                <span className="stay">({i.quantity})</span>
              </div>
              <div className="description">{i.description}</div>
            </div>
          </div>
        );
      });
    }
  };

  const renderCountdown = () => {
    if (props.map.routes) {
      return secondsToHms(props.map.routes[0].duration);
    }
  };

  const getDeliveryStatus = () => {
    if (props.transaction) {
      const { status } = props.transaction;
      let preparingClass = '';
      let otwClass = 'disabled';
      let deliveredClass = 'disabled';
      if (status === 'delivered') {
        otwClass = '';
      } else if (status === 'on-the-way') {
        otwClass = 'active';
      } else if (status === 'delivered') {
        otwClass = '';
        deliveredClass = 'active';
      }

      return (
        <div className="ui top attached steps">
          <div className={`${preparingClass} step`}>
            <i className="box icon"></i>
            <div className="content">
              <div className="title">Preparing</div>
            </div>
          </div>
          <div className={`${otwClass} step`}>
            <i className="shipping fast icon"></i>
            <div className="content">
              <div className="title">On The Way</div>
            </div>
          </div>
          <div className={`${deliveredClass} step`}>
            <i className="check icon"></i>
            <div className="content">
              <div className="title">Delivered</div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="ui container">
      {getDeliveryStatus()}
      <div className="ui attached segment" style={{ padding: '20px 0' }}>
        <h2
          className="ui icon header center aligned"
          style={{ margin: '50px 0' }}
        >
          <i className="clock outline icon"></i>
          <div className="content">
            {renderCountdown()}
            <div className="sub header">Estimated Time of Arrival</div>
          </div>
        </h2>

        <div
          className="ui divided items"
          style={{ maxWidth: '80%', margin: 'auto' }}
        >
          {renderItems()}
        </div>
        <div class="ui section divider"></div>
        <h2 className="center huge aligned ui header red">
          &#8369; {totalAmount()}
          <div className="sub header">Total</div>
        </h2>
      </div>
      {renderMap()}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    transaction: state.transactions[ownProps.match.params.id],
    map: state.map,
  };
};

export default connect(mapStateToProps, { fetchTransaction })(TrackOrder);
