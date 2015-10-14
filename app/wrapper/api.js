'use strict';

import _ from 'lodash';
import Api from '../lib/api';
import StoreClass from '../lib/store';

var

  // url

  getBaseUrl = function () {
    return 'http://localhost:2999/';
  },

  // callbacks

  onSend = function (options) {
    toggleAtomState.call(this, options, true);
  },

  onOk = function (options) {
    changeAtom(options);
  },

  onKo = function () {},

  onComplete = function (options) {
    toggleAtomState.call(this, options, false);
  },

  // atom

  toggleAtomState = function (options, state) {
    var stateAttr = _.get(options, 'atom.state');
    if (stateAttr) {
      this.atomSet(stateAttr, state);
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
        options.ctx[method](atomOptions.attr, data, atomOptions.where, atomOptions.options);
      } else {
        options.ctx[method](atomOptions.attr, data, atomOptions.options);
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
          method = _.isArray(options.ctx.atomGet(options.atom.attr)) ? 'concat' : 'set';
      }
    }
    return _.camelCase('atom' + ' ' + method);
  },

  changeAtomGetData = function (options) {
    return _.get(options.resDataParsed, options.atom.prefix || '');
  };

export default StoreClass.create({

  init () {
    Api.setConfig({
      baseUrl: getBaseUrl(),
      ctx: this,
      handledErrors: [503],
      onComplete,
      onOk,
      onKo,
      onSend
    });
  }

});
