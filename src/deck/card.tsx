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

const onMouseMove = (e) => {
  if (e.target.className !== 'card__image') return;

  let tooltip = e.target.parentNode.parentNode.nextSibling;

  let x = (e.clientX + 20) + 'px';
  let y = (e.clientY + 30) + 'px';
  if (e.clientX + 20 > e.view.innerWidth - tooltip.offsetWidth - 20) {
    x = e.view.innerWidth - tooltip.offsetWidth - 20 + 'px';
  }

  if (e.clientY + 30 > e.view.innerHeight - tooltip.offsetHeight) {
    y = e.view.innerHeight - tooltip.offsetHeight + 'px';
  }

  tooltip.style.top = y;
  tooltip.style.left = x;
};

const CardContainer = (props) => {
  return (
    <div className="tooltip" onMouseMove={onMouseMove}>
      <div className='card__box'>
        <div className='card__container'>
          <img className='card__image' src={props.card.card_images[0].image_url}></img>
        </div>
      </div>
      <div className='tooltip__container'>
      <h3>{`${props.card.name} (${props.card.count})`}</h3>
        {genCardList(props.card)}
      </div>
    </div>
  );
};

export default CardContainer;
