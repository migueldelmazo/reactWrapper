'use strict';

import React from 'react';
import AddressesStore from '../stores/Addresses';

var View = React.createClass({

  _displayName: 'addresses',

  _atom: [
    {
      atom: AddressesStore.atom.address,
      actions: [
        { action: 'updState', attr: 'address', fn: AddressesStore.foo }
      ]
    }
  ],

  _componentWillMount () {
    AddressesStore.receiveAddresses();
  },

  _render () {
    return (
      <ul>
        <li>Address: {this.atomGet(AddressesStore.atom.address)}</li>
        <li>Address: {this.state.address}</li>
        <li>Price: {this.state.price}</li>
        <li>User: {this.state.user}</li>
      </ul>
    );
  }
});

export default View
