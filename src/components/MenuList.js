import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchMenus, addToCart } from '../actions';
import LoadingSpinner from './shared/LoadingSpinner';

class MenuList extends React.Component {
  componentDidMount() {
    this.props.fetchMenus();
  }

  onAddToCart = (menu) => {
    this.props.addToCart(menu);
  };

  renderList = () => {
    if (_.isEmpty(this.props.menus)) {
      return <LoadingSpinner message="Loading..." />;
    }
    return this.props.menus.map((menu) => {
      return (
        <div className="ui fluid card" key={menu.id}>
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
                <a href="#/" className="ui basic label">
                  &#8369; {menu.price}
                </a>
                <div
                  className="ui icon button olive"
                  onClick={() => this.onAddToCart(menu)}
                >
                  <i className="plus icon"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui three stackable cards">{this.renderList()}</div>
      </div>
    );
  }
}

// const MenuList = (props) => {
//   useEffect(() => {
//     props.fetchMenus();
//   }, []);

//   const onAddToCart = (menu) => {
//     props.addToCart(menu);
//   };

//   const renderList = () => {
//     if (_.isEmpty(props.menus)) {
//       return <LoadingSpinner message="Loading..." />;
//     }
//     return props.menus.map((menu) => {
//       return (
//         <div className="ui fluid card" key={menu.id}>
//           <div className="content">
//             <div className="ui items">
//               <div className="item">
//                 <div className="ui tiny image">
//                   <img src={menu.thumbnail} alt={menu.name} />
//                 </div>
//                 <div className="content">
//                   <div className="header">{menu.name}</div>
//                   <div className="description">{menu.description}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="extra content">
//             <div className="right floated">
//               <div className="ui left labeled button">
//                 <a href="#/" className="ui basic label">
//                   &#8369; {menu.price}
//                 </a>
//                 <div
//                   className="ui icon button olive"
//                   onClick={() => onAddToCart(menu)}
//                 >
//                   <i className="plus icon"></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="ui container">
//       <div className="ui three stackable cards">{renderList()}</div>
//     </div>
//   );
// };

const mapStateToProps = (state) => {
  return { menus: Object.values(state.menus) };
};

export default connect(mapStateToProps, { fetchMenus, addToCart })(MenuList);
