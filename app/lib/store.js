'use strict';

import _ from 'lodash';
import Atom from './atom';

var StoreClass = function (options) {
    _.assign(this, options);
    _.bindAll(this);
    _.result(this, 'init');
    _.result(this, 'atomInit');
    Atom.on(this);
  };

StoreClass.prototype.getAtom = function (attr) {
  return Atom.get(attr);
};

StoreClass.prototype.setAtom = function (attr, value) {
  return Atom.set(attr, value);
};

StoreClass.prototype.apiNew = function (options) {
  setTimeout(function () {
    Atom.add(options.onOkSetAtom, options.data);
    // Atom.set('articles.new', {});
  }, 500);
};

module.exports = {

  create (options) {
    return new StoreClass(options);
  }

};
