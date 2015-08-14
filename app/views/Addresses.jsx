'use strict';

import React from 'react';
import AddressesStore from '../stores/Addresses';

var View = React.createClass({

  _displayName: __filename,

  atomListener: [
    {
      atom: AddressesStore.atomAttr.address,
      actions: [
        {
          action: 'updState',
          attr: 'address',
          fn: AddressesStore.foo
        }
      ]
    }
  ],

  _componentWillMount () {
    AddressesStore.receiveAddresses();
  },

  _render () {
    return (
      <ul>
        <li>Address: {this.atomGet(AddressesStore.atomAttr.address)}</li>
        <li>Address: {this.state.address}</li>
        <li>Price: {this.state.price}</li>
        <li>User: {this.state.user}</li>
      </ul>
    );
  }
});

export default View;
