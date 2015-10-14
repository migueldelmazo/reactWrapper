'use strict';

import _ from 'lodash';
import KeyRouter from 'KeyRouter';
import StoreClass from '../lib/store';

var atomAttr = {
    routes: 'router.routes',
    currentName: 'router.currentName',
    currentValues: 'router.currentValues'
  },

  updateAtom = function (routes) {
    var currentRouter = _.last(routes);
    this.atomSet(atomAttr.routes, routes);
    this.atomSet(atomAttr.currentName, currentRouter.name);
    this.atomSet(atomAttr.currentValues, currentRouter.values);
  },

  appRoutes = [
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
  ];

export default StoreClass.create({

  init () {
    KeyRouter.onChangeHash(updateAtom.bind(this));
    KeyRouter.init(appRoutes);
  },

  atomAttr,

  notFound: 'notFound'

});
