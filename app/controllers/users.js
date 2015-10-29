'use strict';

var CtrlClass = require('../lib/controller');

var atomAttr = {
    list: 'users.list',
    newUser: 'users.new',
    newUserUsername: 'users.new.username',
    newUserEmail: 'users.new.email',
    newUserBiography: 'users.new.biography',
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
        attr: atomAttr.newUserUsername,
        value: ''
      },
      {
        attr: atomAttr.newUserEmail,
        value: ''
      },
      {
        attr: atomAttr.newUserBiography,
        value: ''
      },
      {
        attr: atomAttr.apiCreating,
        value: false
      }
    ]
  },

  // routes

  routes: {
    current: [
      {
        name: 'users',
        fn: 'apiGetUsers'
      }
    ],
    parent: [
      {
        name: 'users',
        level: 1,
        fn: 'apiGetUsers'
      }
    ]
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

  apiNewUserFromState (user) {
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
  },

  apiNewUserFromAtom () {
    this.apiSend({
      method: 'POST',
      url: 'users',
      reqData: this.atom.get(atomAttr.newUser),
      atom: {
        state: atomAttr.apiCreating
      },
      onOk () {
        this.apiGetUsers();
      }
    });
  }

});
