'use strict';

import _ from 'lodash';
import request from 'superagent';
import semantic from 'semantic';

var

  // config

  config = {},

  getUrl = function (options) {
    return (config.baseUrl || '') + options.url + '.json';
  },

  // parse options

  parseOptions = function (options, ctx) {
    options = options || {};
    options.ctx = ctx;
    options.method = options.method || 'GET';
  },

  // callbacks

  onComplete = function (options, err, res) {
    if (err) {
      onKo(options, err);
    } else {
      onOk(options, res);
    }
    runMethod(config.onComplete, config.ctx, options, err, res);
  },

  onOk = function (options, res) {
    options.resData = _.get(res, 'body', {});
    if (checkAfterCalling(options)) {
      parseAfterCalling(options);
      runMethod(config.onOk, config.ctx, options);
      runMethod(options.onOk, options.ctx, options);
    }
  },

  onKo = function (options, err) {
    if (err.status === config.handledError) {
      runMethod(options.onKo, options.ctx, options);
    } else {
      runMethod(config.onKo, config.ctx, options, err);
    }
  },

  // check and parse

  checkBeforeCalling = function (options) {
    return checkCalling(options, options.checkBeforeCalling, 'WRONG_REQUEST');
  },

  parseBeforeCalling = function (options) {
    parseCalling(options, options.parseBeforeCalling, 'reqDataParsed');
  },

  checkAfterCalling = function (options) {
    return checkCalling(options, options.checkAfterCalling, 'WRONG_RESPONSE');
  },

  parseAfterCalling = function (options) {
    parseCalling(options, options.parseAfterCalling, 'resDataParsed');
  },

  checkCalling = function (options, foo, errorCode) {
    var result = true;
    if (_.isFunction(foo)) {
      result = runMethod(foo, options.ctx, options);
    } else if (_.isPlainObject(foo)) {
      result = semantic.validate(options.resData, foo);
    }
    if (!result) {
      onKo(options, { errorCode });
    }
    return result;
  },

  parseCalling = function (options, foo, target) {
    if (_.isFunction(foo)) {
      options[target] = runMethod(foo, options.ctx, options);
    } else if (_.isPlainObject(foo)) {
      options[target] = semantic.parse(options.resData, foo);
    } else {
      options[target] = _.cloneDeep(options.resData);
    }
  },

  // helpers

  runMethod = function (method, ctx) {
    if (_.isFunction(method)) {
      return method.apply(ctx, _.slice(arguments, 2));
    }
  };

module.exports = {

  setConfig (_config) {
    config = _config;
  },

  apiSend (options) {
    parseOptions(options, this);
    if (checkBeforeCalling(options)) {
      parseBeforeCalling(options);
      runMethod(config.onSend, config.ctx, options);
      request(options.method, getUrl(options)).
        accept('application/json').
        query(options.reqDataParsed).
        end(onComplete.bind(this, options));
    }
  }

};
