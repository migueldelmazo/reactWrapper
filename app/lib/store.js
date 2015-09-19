'use strict';

import _ from 'lodash';
import Atom from './atom';

var StoreClass = function (options) {
    parseOptions.call(this, options);
    _.result(this, 'init');
    Atom.on(this);
  },

  parseOptions = function (options) {
    _.each(options, function (val, key) {
      this[key] = (_.isFunction(val)) ? val.bind(this) : val;
    }, this);
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
