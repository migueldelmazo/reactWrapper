'use strict';

import StoreClass from '../lib/store';

var atomAttr = {
    address: 'address',
    payment: 'payment',
    price: 'foo.price',
    user: 'user'
  };

export default StoreClass.create({

  atomAttr: atomAttr,

  atomListener: [
    {
      atom: atomAttr.address,
      actions: [
        {
          action: 'onAddressChange'
        }
      ]
    }
  ],

  onAddressChange: function () {
    console.log(this.getAtom(atomAttr.address));
  },

  receiveAddresses () {
    setTimeout(function () {
      this.setAtom(this.atomAttr.address, 'My street');
      this.setAtom(this.atomAttr.payment, 'Visa');
      this.setAtom(this.atomAttr.price, 'Price');
      this.setAtom(this.atomAttr.user, 'Miguel');
    }.bind(this), 1000);
  },

  foo () {
    return 1234;
  }

});
