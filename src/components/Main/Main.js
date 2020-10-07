import React, { useContext } from 'react';
import { BodyContext } from '../Body/Body';

export default function (props) {
  const [isSidebarActive] = useContext(BodyContext);
  return (
    <div className={`pusher ${isSidebarActive ? 'dimmer' : ''}`}>
      {props.children}
    </div>
  );
}
