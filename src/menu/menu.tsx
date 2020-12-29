import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import { useLocalStore, useObserver } from 'mobx-react';
import { StoreContext } from '../store/cards';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    'min-width': '26px',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Menu = () => {
  const store = React.useContext(StoreContext);

  const sortByAttack = (store) => {
        store.sortByAttack();
  }

  const sortByName = (store) => {
    store.sortByName();
  }

  const reset = (store) => {
    store.resetActive();
    store.setSearchBuffer();
  }

  const applySearch = (e, store) => {
    store.filterByAttribute('name', e.target.value);
  }

  const classes = useStyles();
  const [type, setType] = React.useState('');
  const getTypes = (event, store) => {
    setType(event.target.value);
    setAttribute('');
    store.filterByTypeAndRace(event.target.value ,'');
    store.setSearchBuffer();
  };

  const getAttribute = (event, store, type) => {
    setAttribute(event.target.value);
    store.filterByTypeAndRace(type ,event.target.value);
    store.setSearchBuffer();
  };

  const [attribute, setAttribute] = React.useState('');

    return useObserver (() => (
    <div className='Menu__container'>
      <div className='menu__searchbar'>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">Name</InputLabel>
          <BootstrapInput id="demo-customized-textbox"  onChange={(event) => applySearch(event, store)}/>
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-select-native">Category</InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={type}
            onChange={(event) => getTypes(event, store)}
            input={<BootstrapInput />}
          >
          <option aria-label="None" value="" />
          {store.types.map( (type) => {

            return (<option value={type}>{type}</option>)
            })}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native">Type</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={attribute}
          onChange={(event) => getAttribute(event, store, type)}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" defaultValue={true}/>
          {store.getAttributes(type).map( (attribute) => {

            return (<option value={attribute}>{attribute}</option>)
            })}

        </NativeSelect>
      </FormControl>

      </div>
      <div className='menu__buttons'>
        <button onClick={() => sortByAttack(store)}>Sort Atk</button>
        <button onClick={() => sortByName(store)}>Sort Name</button>
        <button onClick={() => reset(store)}>Reset</button>
      </div>
    </div>
  ))
}


export default Menu;
