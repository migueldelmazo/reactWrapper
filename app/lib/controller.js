'use strict';

var _ = require('lodash'),
  Api = require('api'),
  Atom = require('atom'),
  Router = require('./router');

var

  ControllerClass = function (options) {
    bindAll(this, options);
    _.result(this, 'init');
    initRoutes.call(this);
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

  initRoutes = function () {
    if (this.routes) {
      listenAtomRoutes.call(this);
      runRoutes.call(this);
    }
  },

  listenAtomRoutes = function () {
    this.atomConf = this.atomConf || {};
    this.atomConf.listeners = this.atomConf.listeners || [];
    this.atomConf.listeners.push({
      attrs: [Router.atomAttr.router],
      cb: runRoutes
    });
  },

  runRoutes = function () {
    _.each(this.routes.current, function (route) {
      if (Router.isCurrent(route.name)) {
        _.runCb(this, route.fn);
      }
    }, this);
    _.each(this.routes.parent, function (route) {
      if (Router.isParent({ name: route.name, level: route.level })) {
        _.runCb(this, route.fn);
      }
    }, this);
  };

// aliases

ControllerClass.prototype.atom = Atom;
ControllerClass.prototype.apiSend = Api.apiSend;

module.exports = {

  create (options) {
    return new ControllerClass(options);
  }

};
