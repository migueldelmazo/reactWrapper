'use strict';

var _ = require('lodash'),
  Atom = require('atom'),
  Router = require('router');

var atomAttr = {
    router: 'router',
    parents: 'router.parents',
    currentName: 'router.currentName',
    currentValues: 'router.currentValues'
  };

Router.onChangeHash(function (routes) {
  var currentRouter = routes.pop();
  Atom.set(atomAttr.parents, routes);
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

  isCurrent (name) {
    return _.parseArray(name).indexOf(Atom.get(atomAttr.currentName)) >= 0;
  },

  isParent (name) {
    var parentNames = _.pluck(Atom.get(atomAttr.parents), 'name');
    return !!_.find(_.parseArray(name), function (name) {
      if (_.isString(name)) {
        return parentNames.indexOf(name) >= 0;
      } else if (!isNaN(name.level)) {
        return parentNames[parentNames.length - name.level] === name.name;
      } else {
        return parentNames.indexOf(name.name) >= 0;
      }
    });
  },

  getUrl: Router.getUrl

};
