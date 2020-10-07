import './style.scss';
import React from 'react';
import { useContext } from 'react';
import { BodyContext } from '../../components/Body/Body';

function Sidebar(props) {
  const [isSidebarActive] = useContext(BodyContext);

  return (
    <div
      className={`ui very wide right sidebar ${
        isSidebarActive ? 'animating uncover visible' : ''
      }`}
    >
      {props.children}
    </div>
  );
}

export default Sidebar;
