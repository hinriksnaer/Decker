import React from 'react';

import { useForm } from 'react-hook-form';

import { StoreContext } from '../store/cards';

const Import = () => {

    const { register, handleSubmit } = useForm();

    const store = React.useContext(StoreContext);

    const onSubmit = async (data:any, store:any) => {

        const cards = []

        for (let key = 0; key < data.files.length; key++) {
            let res = await fetch(data.files[key].path);
            let text = await res.text();
            let card_ids = text.split('\n').map(Function.prototype.call, String.prototype.trim);

            // filter
            card_ids = card_ids.filter( (el) => el !== '!side' && el !== '#main' && el !== '' && el !== '#extra')

            cards.push(...card_ids)
        }

        const res = await fetch('http://db.ygoprodeck.com/api/v7/cardinfo.php?id='+cards.join(','));
        const cardInfo = await res.json();

        const infoWithIndex = {}

        cardInfo.data.forEach( (item) =>  {
          infoWithIndex[item.id] = item;
        })

        const cardsToAdd = []

        cards.forEach( card_id => cardsToAdd.push(infoWithIndex[card_id]));
        console.log(cardsToAdd);
        cardsToAdd.sort( (first, second) => first.name.localeCompare(second.name));

        store.addCards(cardsToAdd);
        store.resetActive();
        store.setSearchBuffer();
    }


  return (


    <form onSubmit={handleSubmit((data) => onSubmit(data, store))}>
        <label htmlFor="files">Select files:</label>
        <input ref={register} type="file" id="files" accept=".ydk" name="files" multiple></input>
        <button>Submit</button>
    </form>

  );
};

export default Import;
