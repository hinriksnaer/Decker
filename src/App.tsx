import React from 'react';

import { useLocalStore, useObserver } from 'mobx-react';
import Cards from './deck/cards';
import Import from './deck/import';
import Menu from './menu/menu';

import { StoreProvider, StoreContext } from './store/cards';


export default function App() {

  return (
    <StoreProvider>
        <Menu/>
        <Cards/>
        <Import/>
    </StoreProvider>
  );
}
