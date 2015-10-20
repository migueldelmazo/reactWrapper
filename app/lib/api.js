'use strict';

var _ = require('lodash'),
  atom = require('atom'),
  api = require('api');

var

  atomAttr = {
    errorCode: 'api.errorCode',
    errorMsg: 'api.errorMsg'
  },

  // atom

  toggleAtomState = function (options, state) {
    var atomState = _.get(options, 'atom.state');
    if (atomState) {
      atom.set(atomState, state);
    }
  },

  changeAtom = function (options) {
    var atomOptions = options.atom,
      method,
      data;
    if (atomOptions) {
      data = changeAtomGetData(options);
      method = changeAtomGetMethod(options);
      if (['atomUpdate', 'atomRemove'].indexOf(method) >= 0) {
        atom[method](atomOptions.attr, data, atomOptions.where, atomOptions.options);
      } else {
        atom[method](atomOptions.attr, data, atomOptions.options);
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
          method = _.isArray(atom.get(options.atom.attr)) ? 'concat' : 'set';
      }
    }
    return method;
  },

  changeAtomGetData = function (options) {
    return _.get(options.resDataParsed, options.atom.prefix || '');
  };

api.setConfig({
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
    atom.set(atomAttr.errorCode, _.get(err, 'status', 'UNKNOWN_ERROR'));
    atom.set(atomAttr.errorMsg, _.get(err, 'response.body.errorMsg', 'Unknown error'));
  },

  onSend (options) {
    toggleAtomState(options, true);
  }
});


