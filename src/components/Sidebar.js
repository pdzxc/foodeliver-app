import '../assets/css/sidebar.css';
import React from 'react';
import ReactDOM from 'react-dom';

const Sidebar = (props) => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer active">
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui very wide simple sidebar vertical menu right uncover visible"
      >
        {props.content}
      </div>
    </div>,
    document.querySelector('#sidebar')
  );
};

export default Sidebar;
