'use strict';

import _ from 'lodash';
import Api from '../lib/api';
import StoreClass from '../lib/store';

var

  // url

  getBaseUrl = function () {
    var location = window.location;
    return location.protocol + '//' + location.host + '/json/';
  },

  // callbacks

  onSend = function (options) {
    toggleAtomState.call(this, options, true);
  },

  onOk = function (options) {
    if (options.atomAttr) {
      this.atomSet(options.atomAttr, _.get(options.resDataParsed, options.atomPrefix || ''));
    }
  },

  onKo = function () {},

  onComplete = function (options) {
    toggleAtomState.call(this, options, false);
  },

  // atom state

  toggleAtomState = function (options, state) {
    if (options.atomState) {
      this.atomSet(options.atomState, state);
    }
  };

export default StoreClass.create({

  init () {
    Api.setConfig({
      baseUrl: getBaseUrl(),
      ctx: this,
      handledError: 503,
      onComplete,
      onOk,
      onKo,
      onSend
    });
  }

});
