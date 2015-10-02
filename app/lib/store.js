'use strict';

import _ from 'lodash';
import Api from './api';
import Atom from './atom';

var StoreClass = function (options) {
    _.assign(this, options);
    _.bindAll(this);
    _.result(this, 'init');
    Atom.on(this);
  };

StoreClass.prototype.apiSend = Api.apiSend;
StoreClass.prototype.atomGet = Atom.get;
StoreClass.prototype.atomSet = Atom.set;

module.exports = {

  create (options) {
    return new StoreClass(options);
  }

};
