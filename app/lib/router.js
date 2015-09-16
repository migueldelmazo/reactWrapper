'use strict';

import _ from 'lodash';
import Atom from './atom';

var

  // hash

  listenLocationChanges = function () {
    window.addEventListener('hashchange', onHashChange, true);
  },

  onHashChange = function () {
    updateAtom(getLocationHash());
  },

  getLocationHash = function () {
    var hash = window.location.hash.replace('#', ''),
      queryPosition = hash.indexOf('?');
    hash = queryPosition >= 0 ? hash.substr(0, queryPosition) : hash;
    return ensureHash(hash);
  },

  ensureHash = function (hash) {
    hash = '/' + hash + '/';
    while (hash.indexOf('//') >= 0) {
      hash = hash.replace(/\/\//g, '/');
    }
    return hash;
  },

  // routes

  treeRoutes = [],

  initRoutes = function (routes, parentPath, depth) {
    // parse and store routes into treeRoutes
    parentPath = parentPath || '';
    depth = depth || 0;
    _.each(routes, function (route) {
      var path = ensureHash(parentPath + '/' + route.path);
      treeRoutes.push({
        path: path,
        name: route.name,
        depth: depth
      });
      initRoutes(route.subRoute, path, depth + 1);
    });
  },

  // get the routes that match the hash

  getMatchedRoutes = function (hash) {
    var maxDepth = -1,
      matchedRoutes = [];
    _.each(treeRoutes, function (route) {
      var match = getMatchRoutesRegex(route, hash);
      if (match && maxDepth < route.depth) {
        maxDepth = route.depth;
        matchedRoutes.push(getMatchedRouteData(route, match));
      }
    });
    checkNotFoundRoute(matchedRoutes);
    return matchedRoutes;
  },

  getMatchRoutesRegex = function (route, hash) {
    var routeMatcher = new RegExp(route.path.replace(/:[^\s/]+/g, '([\\w-]+)'));
    return hash.match(routeMatcher);
  },

  getMatchedRouteData = function (route, match) {
    return {
      name: route.name,
      path: route.path,
      values: _.zipObject(getRouteKeys(route.path), _.rest(match))
    };
  },

  checkNotFoundRoute = function (matchedRoutes) {
    var lastMatchedRoute = _.last(matchedRoutes),
      urlExpected = getRouteUrl(lastMatchedRoute, lastMatchedRoute.values)
    if (urlExpected !== getLocationHash()) {
      matchedRoutes.push({
        name: 'notFound',
        path: lastMatchedRoute.path + 'notFound/',
        values: {}
      });
    }
  },

  // getters

  getRoute = function (name, query) {
    var route = _.find(treeRoutes, { name: name }),
      pathKeys,
      queryKeys,
      isValidQuery;
    if (route) {
      pathKeys = getRouteKeys(route.path);
      queryKeys = _.keys(query);
      isValidQuery = !_.size(_.difference(pathKeys, queryKeys));
      return isValidQuery ? route : null;
    }
  },

  getRouteUrl = function (route, query) {
    var path = route.path,
      pathKeys = getRouteKeys(route.path);
    _.each(pathKeys, function (key) {
      path = path.replace(':' + key, query[key]);
    });
    return path;
  },

  // helpers

  REGEX_PATH_KEYS = new RegExp(/:[a-z]+/g),

  getRouteKeys = function (path) {
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

  updateAtom = function (hash) {
    var matchedRoutes = getMatchedRoutes(hash);
    console.log(matchedRoutes);
    // Atom.set(atomAttr.mainName, routes.name);
    // Atom.set(atomAttr.mainValues, routes.values);
  };

module.exports = {

  atomAttr: atomAttr,

  init (appRoutes) {
    initRoutes(appRoutes);
    listenLocationChanges();
    updateAtom(getLocationHash());
  },

  go (name, query) {
    var route = getRoute(name, query);
    if (route) {
      window.location.hash = getRouteUrl(route, query);
    }
  },

  getUrl (name, query) {
    var route = getRoute(name, query);
    if (route) {
      return '#' + getRouteUrl(route, query);
    }
  }

};

window.route = module.exports;
