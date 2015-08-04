'use strict';

import React from 'react';
import AddressesStore from '../stores/Addresses';

export default React.createClass({

  _displayName: 'addresses',

  _atom: [
    {
      state: 'addresses',
      atom: AddressesStore.atom.userAddresses,
      initialValue: []
    }
  ],

  _componentWillMount () {
    AddressesStore.receiveAddresses();
  },

  _render () {
    return (
      <p>Hello world!!!{this.state.addresses.length}</p>
    );
  }
});
