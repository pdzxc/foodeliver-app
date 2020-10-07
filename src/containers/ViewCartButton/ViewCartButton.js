import React, { useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import { sumBy, isEmpty } from '../../utils';
import { BodyContext } from '../../components/Body/Body';

const ViewCartButton = (props) => {
  const [isSidebarActive, setSidebarActive] = useContext(BodyContext);

  const renderFloat = () => {
    if (!isEmpty(props.orders)) {
      return (
        <div className="floating ui red label">
          {sumBy(props.orders, 'quantity')}
        </div>
      );
    }
  };

  return (
    <div className="right item">
      <button
        onClick={() => setSidebarActive(!isSidebarActive)}
        className="ui inverted button"
      >
        <i className="icon shopping cart"></i>
        View Cart
        {useMemo(() => {
          renderFloat();
          // eslint-disable-next-line
        }, [props.orders])}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { orders: Object.values(state.orders) };
};

export default connect(mapStateToProps)(ViewCartButton);
