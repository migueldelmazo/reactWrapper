'use strict';

import _ from 'lodash';
import Atom from './atom';

var StoreClass = function (options) {
    _.assign(this, options);
    _.bindAll(this);
    _.result(this, 'init');
    Atom.on(this);
  };

StoreClass.prototype.getAtom = function (attr) {
  return Atom.get(attr);
};

StoreClass.prototype.setAtom = function (attr, value) {
  return Atom.set(attr, value);
};

module.exports = {

  create (options) {
    return new StoreClass(options);
  }

};
