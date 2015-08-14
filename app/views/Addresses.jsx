'use strict';

import React from 'react';
import AddressesStore from '../stores/Addresses';

var View = React.createClass({

  displayName: __filename,

  atomListener: [
    {
      atom: AddressesStore.atomAttr.address,
      actions: [
        {
          action: 'storeToState',
          stateAttr: 'address',
          method: AddressesStore.getAddress,
          store: AddressesStore
        }
      ]
    },
    {
      atom: AddressesStore.atomAttr.city,
      actions: [
        {
          action: 'atomToState',
          stateAttr: 'city',
          atomAttr: AddressesStore.atomAttr.city
        }
      ]
    },
    {
      atom: AddressesStore.atomAttr.country
    }
  ],

  initialState: {
    address: 'Empty street',
    city: 'Empty city'
  },

  componentWillMount () {
    AddressesStore.receiveAddresses();
  },

  render () {
    return (
      <ul>
        <li>Address (from Atom): {this.atomGet(AddressesStore.atomAttr.address)}</li>
        <li>Address (from State): {this.state.address}</li>
        <li>Address (from Store): {AddressesStore.getAddress()}</li>
        <li>City (from Atom): {this.atomGet(AddressesStore.atomAttr.city)}</li>
        <li>City (from State): {this.state.city}</li>
        <li>Country (from Atom): {this.atomGet(AddressesStore.atomAttr.country)}</li>
      </ul>
    );
  }
});

export default View;
