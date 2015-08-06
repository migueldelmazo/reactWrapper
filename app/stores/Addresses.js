'use strict';

import Atom from '../lib/atom';

var store = {

  atom: {
    address: 'address',
    payment: 'payment',
    price: 'foo.price',
    user: 'user'
  },

  receiveAddresses () {
    setTimeout(function () {
      Atom.set(store.atom.address, 'My street');
      Atom.set(store.atom.payment, 'Visa');
      Atom.set(store.atom.price, 'Price');
      Atom.set(store.atom.user, 'Miguel');
    }, 1000);
  },

  foo () {
    return 1234;
  }

};

export default store
