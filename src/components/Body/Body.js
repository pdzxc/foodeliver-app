import React, { useState, createContext } from 'react';

export const BodyContext = createContext();

export function BodyProvider(props) {
  const [isSidebarActive, setSidebarActive] = useState(false);
  return (
    <BodyContext.Provider value={[isSidebarActive, setSidebarActive]}>
      {props.children}
    </BodyContext.Provider>
  );
}
