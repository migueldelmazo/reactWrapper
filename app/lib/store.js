'use strict';

import _ from 'lodash';
import Atom from './atom';

var StoreClass = function (options) {
    _.assign(this, options);
    Atom.on(this);
  };

StoreClass.prototype.getAtom = function (attr) {
  return Atom.get(attr);
};

StoreClass.prototype.setAtom = function (attr, value) {
  return Atom.set(attr, value);
};

module.exports = {

  create: function (options) {
    return new StoreClass(options);
  }

};
