import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react';
import { listenerCount } from 'process';
import { Card } from '@material-ui/core';

export const StoreContext = React.createContext();

export const StoreProvider = ({children}) => {
  const store = useLocalStore( () => ({
    cards: [],
    activeCards: [],
    searchBuffer: [],
    addCards: (new_cards:Array<any>) => {
      store.cards.push(...new_cards);
    },
    resetActive: () => store.activeCards = [...store.cards],
    sortByAttack: () => {
      store.activeCards.sort( (a, b) => {
        if (a.atk !== undefined && b.atk !== undefined) {
          if (a.atk > b.atk) {
            return -1
          } else if (a.atk == b.atk) {
            return 0;
          } else {
            return 1;
          }
        }
        else if (a.atk === undefined && b.atk !== undefined) {
          return 1;
        }
        else if (b.atk === undefined && a.atk !== undefined) {
          return -1;
        }
        else {
          if (a.type.includes('Spell') && b.type.includes('Trap')) {
            return -1;
          }
          else if (a.type.includes('Trap') && b.type.includes('Spell')){
            return 1;
          }
          else {
            return a.race.localeCompare(b.race);
          }
        }
      });
      store.activeCards = [...store.activeCards];
    },
    sortByName: () => {
      console.log('im here, hello friends');
      store.activeCards.sort( (a, b) => a.name.localeCompare(b.name));
      store.activeCards = [...store.activeCards];
    },
    setSearchBuffer: () => {
      store.searchBuffer = [...store.activeCards];
    },
    filterByType: (type) => {
      let newActive = [...store.cards]
      newActive = newActive.filter((card) => card.type.includes(type));
      store.activeCards = [...newActive];
    },

    filterByAttribute: (attribute:string, filter:string) => {
      if (filter === '') {
        store.activeCards = [...store.searchBuffer];
        return
      }
      let filteredCards = store.searchBuffer.filter((card) => card[attribute].toLowerCase().includes(filter.toLowerCase()));
      store.activeCards = [...filteredCards];
    },
    filterByTypeAndRace: (type, race:string) => {
      if (race === '') {
        store.filterByType(type);
        return
      }
      console.log(race);

      let newActive = [...store.cards]
      if (race.toUpperCase() === race) {
        newActive = newActive.filter((card) =>
            (card.type.includes(type) &&
            card.attribute.includes(race))
            );
      } else {

        newActive = newActive.filter((card) =>
        (card.type.includes(type) &&
        card.race.includes(race))
        );
      }
      store.activeCards = [...newActive];

    },
    get cardLength() {
      return store.cards.length;
    },
    get types() {
      let types = new Set();

      store.cards.forEach( (card) => types.add(card.type));

      let typeList = Array.from(types);

      if (typeList.length > 0) {
        typeList.push('Monster');
      }

      typeList.sort( (a,b) => a.localeCompare(b))

      return typeList;
    },

    getAttributes: (type) => {

      if (type === ''){
        return [];
      }

      let attributes = new Set();

      let filteredCardList = store.cards.filter( card => card.type.includes(type))

      filteredCardList.forEach( card => {
        if (card.race) attributes.add(card.race);
        if (card.attribute) attributes.add(card.attribute);
      });

      return Array.from(attributes)
    }
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}
