import React from 'react';

const MenuListCard = ({ menu, addToCart }) => {
  return (
    <div className="ui fluid card">
      <div className="content">
        <div className="ui items">
          <div className="item">
            <div className="ui tiny image">
              <img src={menu.thumbnail} alt={menu.name} />
            </div>
            <div className="content">
              <div className="header">{menu.name}</div>
              <div className="description">{menu.description}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="extra content">
        <div className="right floated">
          <div className="ui left labeled button">
            <label className="ui basic label">&#8369; {menu.price}</label>
            <div
              className="ui icon button olive"
              onClick={() => addToCart(menu)}
            >
              <i className="plus icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuListCard;
