'use strict';

import _ from 'lodash';
import Atom from '../lib/atom';
import KeyRouter from 'KeyRouter';

var atomAttr = {
    routes: 'router.routes',
    currentName: 'router.currentName',
    currentValues: 'router.currentValues'
  };

// init KeyRouter listeners

KeyRouter.onChangeHash(function (routes) {
  var currentRouter = _.last(routes);
  Atom.set(atomAttr.routes, routes);
  Atom.set(atomAttr.currentName, currentRouter.name);
  Atom.set(atomAttr.currentValues, currentRouter.values);
});

// set app routes

KeyRouter.init([
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

export default {
  atomAttr: atomAttr,
  notFound: 'notFound'
};
