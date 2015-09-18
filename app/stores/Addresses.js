'use strict';

import StoreClass from '../lib/store';

var atomAttr = {
    address: 'address',
    city: 'city',
    country: 'country'
  };

export default StoreClass.create({

  atomAttr,

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

  onAddressChange () {
    // console.log(this.getAtom(atomAttr.address));
  },

  receiveAddresses () {
    setTimeout(function () {
      this.setAtom(this.atomAttr.address, 'My street');
      this.setAtom(this.atomAttr.city, 'Madrid');
      this.setAtom(this.atomAttr.country, 'Spain');
    }.bind(this), 1000);
  },

  getAddress () {
    return this.getAtom(this.atomAttr.address);
  }

});
