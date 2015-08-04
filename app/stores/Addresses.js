'use strict';

import Atom from '../lib/atom';
import AddressesService from '../service/Addresses';

var store = {

  atom: {
    userAddresses: 'addresses'
  },

  receiveAddresses () {
    AddressesService.getAddresses(function (data) {
      Atom.set(store.atom.userAddresses, data.addresses);
    });
  }

};

export default store
