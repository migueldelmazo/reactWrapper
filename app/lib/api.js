'use strict';

import _ from 'lodash';
import request from 'superagent';
import Atom from './atom';

var

  // url

  getUrl = function (options) {
    return 'http://localhost:3000/json/' + options.url + '.json';
  },

  // callbacks

  onComplete = function (options, err, res) {
    if (err) {
      onKo(options, err);
    } else {
      onOk(options, res);
    }
    toggleAtomState(options, false);
  },

  onOk = function (options, res) {
    setResData(options, res);
    if (checkAfterCalling(options)) {
      parseAfterCalling(options);
      setAtom(options);
    }
  },

  onKo = function (options, err) {},

  setResData = function (options, res) {
    options.resData = _.get(_.get(res, 'body'), options.resSufix);
  },

  // api: set the atom

  toggleAtomState = function (options, state) {
    if (options.atomState) {
      Atom.set(options.atomState, state);
    }
  },

  setAtom = function (options) {
    if (options.atomAttr) {
      Atom.set(options.atomAttr, options.resDataParsed);
    }
  },

  // api: check and parse

  checkBeforeCalling = function (options) {
    if (false) {
      onKo(options, { errorCode: 'WRONG_REQUEST' });
      return false;
    } else {
      return true;
    }
  },

  parseBeforeCalling = function (options) {
    options.reqDataParsed = _.cloneDeep(options.reqData);
  },

  checkAfterCalling = function (options) {
    if (false) {
      onKo(options, { errorCode: 'WRONG_RESPONSE' });
      return false;
    } else {
      return true;
    }
  },

  parseAfterCalling = function (options) {
    options.resDataParsed = _.cloneDeep(options.resData);
  };

module.exports = {

  apiSend (options) {
    if (checkBeforeCalling(options)) {
      parseBeforeCalling(options);
      request(options.method, getUrl(options))
        .accept('application/json')
        .query(options.reqDataParsed)
        .end(onComplete.bind(this, options));
    }
  }

};
