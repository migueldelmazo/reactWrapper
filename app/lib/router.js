'use strict';

var _ = require('lodash'),
  atom = require('atom'),
  router = require('router');

var atomAttr = {
    routes: 'router.routes',
    currentName: 'router.currentName',
    currentValues: 'router.currentValues'
  };

router.addRoutes([
  {
    name: 'index',
    path: '',
    subRoute: [
      {
        name: 'addresses',
        path: 'addresses',
        subRoute: [
          {
            name: 'addressAdd',
            path: 'add',
            subRoute: [
              {
                name: 'addressAddAll',
                path: 'addAll'
              }
            ]
          },
          {
            name: 'addressUser',
            path: ':user',
            subRoute: [
              {
                name: 'addressId',
                path: ':id'
              }
            ]
          }
        ]
      },
      {
        name: 'payments',
        path: 'payments'
      }
    ]
  }
]);

router.onChangeHash(function (routes) {
  var currentRouter = _.last(routes);
  atom.set(atomAttr.routes, routes);
  atom.set(atomAttr.currentName, currentRouter.name);
  atom.set(atomAttr.currentValues, currentRouter.values);
});

module.exports = {
  atomAttr,
  notFound: 'notFound'
};
