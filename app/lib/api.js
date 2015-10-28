'use strict';

var _ = require('lodash'),
  Atom = require('atom'),
  Api = require('api');

var

  atomAttr = {
    error: 'api',
    errorCode: 'api.errorCode',
    errorMsg: 'api.errorMsg'
  },

  toggleAtomState = function (options, state) {
    var atomState = _.get(options, 'atom.state');
    if (atomState) {
      Atom.set(atomState, state);
    }
  },

  changeAtom = function (options) {
    var atomOptions = options.atom,
      method,
      data;
    if (atomOptions) {
      data = changeAtomGetData(options);
      method = changeAtomGetMethod(options);
      if (['update', 'remove'].indexOf(method) >= 0) {
        Atom[method](atomOptions.attr, data, atomOptions.where, atomOptions.options);
      } else {
        Atom[method](atomOptions.attr, data, atomOptions.options);
      }
    }
  },

  changeAtomGetMethod = function (options) {
    var method;
    if (options.atom.method) {
      method = options.atom.method;
    } else {
      switch (options.method) {
        case 'POST':
          method = 'push';
          break;
        case 'PUT':
          method = 'update';
          break;
        case 'DELETE':
          method = 'remove';
          break;
        default:
          method = 'set';
      }
    }
    return method;
  },

  changeAtomGetData = function (options) {
    return _.get(options.resDataParsed, options.atom.prefix || '');
  };

Api.setConfig({

  baseUrl: 'http://localhost:2999/',
  ctx: this,
  handledErrors: [503],

  onComplete (options) {
    toggleAtomState(options, false);
  },

  onOk (options) {
    changeAtom(options);
  },

  onKo (options, err) {
    Atom.set(atomAttr.errorCode, _.get(err, 'status', 'UNKNOWN_ERROR'));
    Atom.set(atomAttr.errorMsg, _.get(err, 'response.body.errorMsg', 'Unknown error'));
  },

  onSend (options) {
    toggleAtomState(options, true);
  }

});

module.exports = {

  atomAttr,

  getError () {
    return Atom.get(atomAttr.error);
  }

};


