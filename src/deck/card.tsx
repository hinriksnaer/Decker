import './card.global.css';

import React from 'react';
import Card from './card';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const genCardList = (card) => {

    if (card.type.includes("Monster")) {

      return (
        <ul>
          <li>Attack: {card.atk} Defense: {card.def}</li>
          <li>Race: {card.race}</li>
          <li>Type: {card.type}</li>
          <li>Description:<br></br> {card.desc}</li>
        </ul>
      )
    }
    else if (card.type.includes("Spell")) {
      return (
        <ul>
          <li>Type: {card.type}</li>
          <li>Spell Type: {card.race}</li>
          <li>Description:<br></br> {card.desc}</li>
        </ul>
      )
    }
    else if (card.type.includes("Trap")) {
      return (
        <ul>
          <li>Type: {card.type}</li>
          <li>Spell Type: {card.race}</li>
          <li>Description:<br></br> {card.desc}</li>
        </ul>
      )
    }
}

const CardContainer = (props) => {
  return (
      <div className="tooltip">
    <div className='card__box'>
      <div className='card__container'>
        <img className='card__image' src={props.card.card_images[0].image_url}></img>
      </div>

        <div className="right">
            <div className="text-content">
                <h3>{props.card.name}</h3>
                {genCardList(props.card)}
            </div>
            <i></i>
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
