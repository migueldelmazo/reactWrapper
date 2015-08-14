'use strict';

import _ from 'lodash';
import Atom from './atom';

var

  // hash

  listenLocationChanges = function () {
    window.addEventListener('hashchange', onHashChange, true);
  },

  onHashChange = function () {
    updateAtom();
  },

  getHash = function () {
    var hash = window.location.hash.replace('#', ''),
      queryPosition = hash.indexOf('?');
    return queryPosition >= 0 ? hash.substr(0, queryPosition) : hash;
  },

  // routes

  routes = [],

  initRoutes = function (rawRoutes, parentPath) {
    parentPath = parentPath || '';
    _.each(rawRoutes, function (route) {
      var path = (parentPath + '/' + route.path).replace('//', '/');
      routes.push({
        path: path,
        name: route.name
      });
      initRoutes(route.subRoute, path);
    });
  },

  // matched routes

  getMatchRoutes = function () {
    var hash = '/' + getHash(),
      result = [];
    _.each(routes, function (route) {
      var routeMatcher = new RegExp(route.path.replace(/:[^\s/]+/g, '([\\w-]+)')),
      match = hash.match(routeMatcher);
      if (match) {
        result.push(getMatchedRouteInfo(route, match));
      }
    });
    return result;
  },

  REGEX_PATH = new RegExp(/:[a-z]+/g),

  getMatchedRouteInfo = function (route, match) {
    var values = _.rest(match),
      keys = route.path.match(REGEX_PATH);
    keys = _.map(keys, function (key) {
      return key.substr(1);
    });
    return {
      values: _.zipObject(keys, values),
      name: route.name
    };
  },

  // atom

  atomAttr = {
    mainName: 'router.main.name',
    mainValues: 'router.main.values'
  },

  updateAtom = function () {
    var mainRoute = getMatchRoutes().pop();
    Atom.set(atomAttr.mainName, mainRoute.name);
    Atom.set(atomAttr.mainValues, mainRoute.values);
  };

module.exports = {

  atomAttr: atomAttr,

  init: function (appRoutes) {
    initRoutes(appRoutes);
    listenLocationChanges();
    updateAtom();
  }

};
