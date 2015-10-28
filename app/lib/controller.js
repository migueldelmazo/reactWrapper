'use strict';

var _ = require('lodash'),
  Api = require('api'),
  Atom = require('atom'),
  Router = require('./router');

var

  ControllerClass = function (options) {
    bindAll(this, options);
    _.result(this, 'init');
    runRoutes.call(this);
    Atom.on(this);
  },

  bindAll = function (ctx, options) {
    _.each(options, function (value, key) {
      if (_.isFunction(value)) {
        ctx[key] = value.bind(ctx);
      } else {
        ctx[key] = value;
      }
    });
  },

  // routes

  runRoutes = function () {
  // TODO: bind controller to atom.routes
    var fns = _.get(this, 'routes.name.' + Router.getCurrentRoute());
    if (fns) {
      _.each(_.parseArray(fns), function (fn) {
        this[fn]();
      }, this);
    }
  };

// aliases

ControllerClass.prototype.atom = Atom;
ControllerClass.prototype.apiSend = Api.apiSend;

module.exports = {

  create (options) {
    return new ControllerClass(options);
  }

};
