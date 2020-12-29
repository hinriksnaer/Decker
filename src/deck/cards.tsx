import React from 'react';
import Card from './card';
import './cards.global.css';
import { useLocalStore, useObserver } from 'mobx-react';
import { StoreContext } from '../store/cards';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const CardRenderer = () => {
  const store = React.useContext(StoreContext);



  return useObserver (() => (
    <div className='cards__container'>
      {
        store.activeCards.map((card, idx) => (
            <Card key={idx} card={card}/>
        ))
      }
    </div>
  ))
}


export default function Cards() {
  return (
    <CardRenderer/>
  );
}
