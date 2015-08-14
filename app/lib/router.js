'use strict';

import _ from 'lodash';
import Atom from './atom';

var

  // hash

  listenLocation = function () {
    window.addEventListener('hashchange', onHashChange, true);
  },

  onHashChange = function () {
    updateAtom();
  },

  getHash = function () {
    var hash = window.location.hash.replace('#', ''),
      questionPosition = hash.indexOf('?');
    return questionPosition >= 0 ? hash.substr(0, questionPosition) : hash;
  },

  // routes

  routes = [],

  initRoutes = function (rawRoutes, parentRoute) {
    parentRoute = parentRoute || '';
    _.each(rawRoutes, function (route) {
      var path = (parentRoute + '/' + route.path).replace('//', '/');
      routes.push({
        path: path,
        name: route.name
      });
      initRoutes(route.subRoute, path);
    });
  },

  getMathRoutes = function () {
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
    var mainRoute = getMathRoutes().pop();
    Atom.set(atomAttr.mainName, mainRoute.name);
    Atom.set(atomAttr.mainValues, mainRoute.values);
  };

module.exports = {

  atomAttr: atomAttr,

  init: function (appRoutes) {
    initRoutes(appRoutes);
    listenLocation();
    updateAtom();
  }

};
