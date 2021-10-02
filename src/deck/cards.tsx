import React from 'react';
import Card from './card';
import './cards.global.css';
import { useLocalStore, useObserver } from 'mobx-react';
import { StoreContext } from '../store/cards';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// filter duplicates and add counter
const get_set = (cardlist) => {
  let items = {};

  for (let card of cardlist) {
    let cardcount = items[card.id] ? items[card.id]['count'] + 1 : 1
    items[card.id] = {...card, 'count': cardcount} 

  }

  return items
  }
const removeDuplicates = (list) => {
  const ids = list.map((item) => item.id)
  const uIds = [...new Set(ids)];
  return uIds
}

const CardRenderer = () => {
  const store = React.useContext(StoreContext);
  const uniqueCards = get_set(store.activeCards);
  
  return useObserver (() => (
    <div className='cards__container'>
      {
        removeDuplicates(store.activeCards).map((cardId, idx) => (
            <Card key={idx} card={uniqueCards[cardId]}/>
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
