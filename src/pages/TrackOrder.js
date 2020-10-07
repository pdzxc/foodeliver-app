import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTransactionAndGeo } from '../actions';
import { formatNumber, secondsToHms, sumBy } from '../utils';
import Main from '../components/Main/Main';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Map from '../containers/Map/Map';
import Loading from '../components/Loading/Loading';
import { BodyProvider } from '../components/Body/Body';

const TrackOrder = (props) => {
  useEffect(() => {
    props.fetchTransactionAndGeo(props.match.params.id);
    // eslint-disable-next-line
  }, []);

  const totalAmount = () => {
    if (props.transaction) {
      const total = sumBy(props.transaction.items, (o) => {
        return o.quantity * o.price;
      });
      return formatNumber(total);
    }
  };

  const renderMap = () => {
    if (!props.map || !props.transaction || !props.map.routes) {
      return <Loading />;
    } else {
      return (
        <Map
          lat={props.transaction.destination.geometry.coordinates[0]}
          lng={props.transaction.destination.geometry.coordinates[1]}
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
      let otwClass = 'disabled ';
      let deliveredClass = 'disabled ';
      if (status === 'delivered') {
        otwClass = '';
        deliveredClass = 'active ';
      } else if (status === 'on-the-way') {
        otwClass = 'active ';
      } else if (status === 'preparing') {
        preparingClass = 'active ';
      }

      return (
        <div className="ui top three attached steps">
          <div className={`${preparingClass}step`}>
            <i className="box icon"></i>
            <div className="content">
              <div className="title">Preparing</div>
            </div>
          </div>
          <div className={`${otwClass}step`}>
            <i className="shipping fast icon"></i>
            <div className="content">
              <div className="title">On The Way</div>
            </div>
          </div>
          <div className={`${deliveredClass}step`}>
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
    <BodyProvider>
      <Main>
        <Header />
        <div className="ui container">
          <h1 className="ui header">Track Your Order</h1>
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
            <div className="ui section divider"></div>
            <h2 className="center aligned ui header red">
              &#8369; {totalAmount()}
              <div className="sub header">Total</div>
            </h2>
          </div>
          {renderMap()}
        </div>
        <Footer />
      </Main>
    </BodyProvider>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    transaction: state.transactions[ownProps.match.params.id],
    map: state.map,
  };
};

export default connect(mapStateToProps, { fetchTransactionAndGeo })(TrackOrder);
