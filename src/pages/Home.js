import React from 'react';
import Main from '../components/Main/Main';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import MenuList from '../containers/MenuList/MenuList';
import Cart from '../containers/Cart/Cart';

import { BodyProvider } from '../components/Body/Body';

export default function () {
  return (
    <BodyProvider>
      <Sidebar>
        <Cart />
      </Sidebar>
      <Main>
        <Header />
        <MenuList />
        <Footer />
      </Main>
    </BodyProvider>
  );
}
