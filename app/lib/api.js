'use strict';

var _ = require('lodash'),
  atom = require('atom'),
  api = require('api');

var

  // url

  getBaseUrl = function () {
    return 'http://localhost:2999/';
  },

  // callbacks

  onSend = function (options) {
    toggleAtomState(options, true);
  },

  onOk = function (options) {
    changeAtom(options);
  },

  onKo = function () {},

  onComplete = function (options) {
    toggleAtomState(options, false);
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
  baseUrl: getBaseUrl(),
  ctx: this,
  handledErrors: [503],
  onComplete,
  onOk,
  onKo,
  onSend
});
