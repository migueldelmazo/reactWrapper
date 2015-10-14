'use strict';

var _ = require('lodash'),
  api = require('api'),
  atom = require('atom');

var

  StoreClass = function (options) {
    assign(this, options);
    _.result(this, 'init');
    atom.on(this);
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

StoreClass.prototype.Atom = atom;
StoreClass.prototype.apiSend = api.apiSend;

module.exports = {

  create (options) {
    return new StoreClass(options);
  }

};
