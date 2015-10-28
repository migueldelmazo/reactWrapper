'use strict';

var _ = require('lodash'),
  Atom = require('atom'),
  Router = require('router');

var atomAttr = {
    router: 'router',
    routes: 'router.routes',
    currentName: 'router.currentName',
    currentValues: 'router.currentValues'
  };

Router.onChangeHash(function (routes) {
  var currentRouter = _.last(routes);
  Atom.set(atomAttr.routes, routes);
  Atom.set(atomAttr.currentName, currentRouter.name);
  Atom.set(atomAttr.currentValues, currentRouter.values);
});

Router.addRoutes([
  {
    name: 'index',
    path: '',
    subRoute: [
      {
        name: 'users',
        path: 'users',
        subRoute: [
          {
            name: 'userAdd',
            path: 'add'
          },
          {
            name: 'userEdit',
            path: ':user'
          }
        ]
      }
    ]
  }
]);

module.exports = {

  atomAttr,

  isCurrentRoute (name) {
    return Atom.get(atomAttr.currentName) === name;
  },

  isParentRoute (name) {
    return _.find(Atom.get(atomAttr.routes), { name });
  },

  getCurrentRoute () {
    return Atom.get(atomAttr.currentName);
  },

  getParentRoutes () {
    return Atom.get(atomAttr.routes);
  },

  getUrl: Router.getUrl

};
