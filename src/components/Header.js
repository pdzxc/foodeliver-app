import _ from 'lodash';
import '../assets/css/header.css';
import Logo from '../assets/images/foodeliver.png';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../history';

const Header = (props) => {
  const [hasViewCart, setViewCart] = useState(true);

  useEffect(() => {
    history.listen((location) => {
      setViewCart(location.pathname === '/checkout' ? false : true);
    });
  }, []);
  const getTotalItems = () => {
    return _.sumBy(props.orders, 'quantity');
  };

  const renderFloat = () => {
    if (!_.isEmpty(props.orders)) {
      return <div className="floating ui red label">{getTotalItems()}</div>;
    }
  };

  const renderViewCart = () => {
    if (hasViewCart) {
      return (
        <div className="right item">
          <Link to="/cart" className="ui inverted button">
            <i className="icon shopping cart"></i>
            View Cart
            {renderFloat()}
          </Link>
        </div>
      );
    }
  };
  return (
    <div className="ui inverted vertical masthead center aligned segment">
      <div className="ui container">
        <div className="ui text inverted stackable  menu">
          <Link to="/" className="item">
            <img className="logo ui image" src={Logo} alt="FooDeliver" />
          </Link>
          {renderViewCart()}
        </div>
      </div>
      <div className="ui text container">
        <h1 className="ui inverted header">
          It's the food you love, delivered
        </h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { orders: Object.values(state.orders) };
};

export default connect(mapStateToProps)(Header);
