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
    // console.log(this.atomGet(atomAttr.address));
  },

  receiveAddresses () {
    setTimeout(function () {
      this.atomSet(this.atomAttr.address, 'My street');
      this.atomSet(this.atomAttr.city, 'Madrid');
      this.atomSet(this.atomAttr.country, 'Spain');
    }.bind(this), 1000);
  },

  getAddress () {
    return this.atomGet(this.atomAttr.address);
  }

});
