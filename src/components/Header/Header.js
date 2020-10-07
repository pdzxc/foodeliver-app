import './style.scss';
import Logo from '../../assets/images/logo.png';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import ViewCartButton from '../../containers/ViewCartButton/ViewCartButton';

function Header() {
  const [hasViewCart, setViewCart] = useState(true);

  const PageWithoutViewCart = ['/checkout', '/manage-orders'];

  useEffect(() => {
    const unregisterHistoryListener = history.listen((location) => {
      setViewCart(
        PageWithoutViewCart.includes(location.pathname) ? false : true
      );
    });

    setViewCart(
      PageWithoutViewCart.includes(history.location.pathname) ? false : true
    );

    return () => {
      unregisterHistoryListener();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="ui inverted vertical masthead center aligned segment">
      <div className="ui container">
        <div className="ui text inverted stackable  menu">
          <Link to="/" className="item">
            <img className="logo ui image" src={Logo} alt="FooDeliver" />
          </Link>
          {hasViewCart && <ViewCartButton />}
        </div>
      </div>
      <div className="ui text container">
        <h1 className="ui inverted header">
          It's the food you love, delivered
        </h1>
      </div>
    </div>
  );
}

export default Header;
