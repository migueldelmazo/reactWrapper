'use strict';

import React from 'react';
import AddressesStore from '../stores/Addresses';

export default React.createClass({

  _displayName: 'addresses',

  _atom: [
    {
      // state: 'address',
      atom: AddressesStore.atom.address,
      initialValue: 'no address'
    },
    {
      state: 'payment',
      // atom: AddressesStore.atom.payment,
      initialValue: 'no payment'
    },
    {
      state: 'price',
      atom: AddressesStore.atom.price,
      initialValue: 'no price'
    },
    {
      state: 'user',
      atom: AddressesStore.atom.user,
      initialValue: 'no user'
    }
  ],

  _componentWillMount () {
    AddressesStore.receiveAddresses();
  },

  _render () {
    return (
      <ul>
        <li>Address: {this.atomGet(AddressesStore.atom.address)}</li>
        <li>Payment: {this.state.payment}</li>
        <li>Price: {this.state.price}</li>
        <li>User: {this.state.user}</li>
      </ul>
    );
  }
});
