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
    hash = queryPosition >= 0 ? hash.substr(0, queryPosition) : hash;
    return hash.substr(-1) === '/' ? hash.substr(0, hash.length - 1) : hash;
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

  getMatchedRouteInfo = function (route, match) {
    return {
      values: _.zipObject(getPathKeys(route.path), _.rest(match)),
      name: route.name
    };
  },

  REGEX_PATH_KEYS = new RegExp(/:[a-z]+/g),

  getPathKeys = function (path) {
    var keys = path.match(REGEX_PATH_KEYS);
    return _.map(keys, function (key) {
      return key.substr(1);
    });
  },

  // atom

  atomAttr = {
    mainName: 'router.main.name',
    mainValues: 'router.main.values'
  },

  updateAtom = function () {
    var mainRoute = getMatchRoutes().pop();
    console.log(mainRoute);
    Atom.set(atomAttr.mainName, mainRoute.name);
    Atom.set(atomAttr.mainValues, mainRoute.values);
  },

  // getters

  getRoute = function (name, query) {
    var route = _.find(routes, { name: name }),
      pathKeys,
      queryKeys,
      isValidQuery;
    if (route) {
      pathKeys = getPathKeys(route.path);
      queryKeys = _.keys(query);
      isValidQuery = !_.size(_.difference(pathKeys, queryKeys));
      return isValidQuery ? route : null;
    }
  },

  getParsedPath = function (route, query) {
    var path = route.path,
      pathKeys = getPathKeys(route.path);
    _.each(pathKeys, function (key) {
      path = path.replace(':' + key, query[key]);
    });
    return path;
  };

module.exports = {

  atomAttr: atomAttr,

  init (appRoutes) {
    initRoutes(appRoutes);
    listenLocationChanges();
    updateAtom();
  },

  go (name, query) {
    var route = getRoute(name, query);
    if (route) {
      window.location.hash = getParsedPath(route, query);
    }
  }

};

window.route = module.exports;
