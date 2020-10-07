import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchMenus, addToCart } from '../../actions';
import { isEmpty } from '../../utils';

import Loading from '../../components/Loading/Loading';
import MenuListCard from '../../components/MenuListCard/MenuListCard';

const MenuList = (props) => {
  useEffect(() => {
    props.fetchMenus();
    // eslint-disable-next-line
  }, []);
  if (isEmpty(props.menus)) {
    return <Loading message="Loading..." />;
  }
  return (
    <div className="ui container">
      <div className="ui three stackable cards">
        {props.menus.map((menu) => (
          <MenuListCard key={menu.id} menu={menu} addToCart={props.addToCart} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { menus: Object.values(state.menus) };
};

export default connect(mapStateToProps, { fetchMenus, addToCart })(MenuList);
