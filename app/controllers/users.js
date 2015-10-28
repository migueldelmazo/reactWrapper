'use strict';

var CtrlClass = require('../lib/controller');

var atomAttr = {
    list: 'users.list',
    apiCreating: 'users.creating'
  };

module.exports = CtrlClass.create({

  // atom

  atomAttr,

  atomConf: {
    initialValues: [
      {
        attr: atomAttr.list,
        value: []
      },
      {
        attr: atomAttr.apiCreating,
        value: false
      }
    ]
  },

  // routes

  routes: {
    name: {
      users: 'apiGetUsers'
    }
  },

  // getters / setters

  getList () {
    return this.atom.get(atomAttr.list);
  },

  apiIsCreating () {
    return this.atom.get(atomAttr.apiCreating);
  },

  // api services

  apiGetUsers () {
    this.apiSend({
      method: 'GET',
      url: 'users',
      reqData: {},
      atom: {
        prefix: 'users',
        attr: atomAttr.list
      }
    });
  },

  apiNewUser (user) {
    this.apiSend({
      method: 'POST',
      url: 'users',
      reqData: user,
      atom: {
        state: atomAttr.apiCreating
      },
      onOk () {
        this.apiGetUsers();
      }
    });
  }

});
