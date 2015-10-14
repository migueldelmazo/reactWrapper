'use strict';

import _ from 'lodash';
import Api from './api';
import Atom from './atom';

var StoreClass = function (options) {
    assign(this, options);
    _.result(this, 'init');
    Atom.on(this);
  },

  assign = function (ctx, options) {
    _.each(options, function (value, key) {
      if (_.isFunction(value)) {
        ctx[key] = value.bind(ctx);
      } else {
        ctx[key] = value;
      }
    });
  };

// aliases

StoreClass.prototype.atom = Atom;
StoreClass.prototype.apiSend = Api.apiSend;

module.exports = {

  create (options) {
    return new StoreClass(options);
  }

};
