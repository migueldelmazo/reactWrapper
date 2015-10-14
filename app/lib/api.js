'use strict';

import _ from 'lodash';
import request from 'superagent';
import semantic from 'semantic';

var

  // config

  config = {},

  getUrl = function (options) {
    return (config.baseUrl || '') + options.url;
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
    if (config.handledErrors.indexOf(err.status) >= 0) {
      runMethod(options.onKo, options.ctx, options);
    } else {
      runMethod(config.onKo, config.ctx, options, err);
    }
  },

  // check and parse

  checkBeforeCalling = function (options) {
    return checkCalling(options, options.checkBeforeCalling, options.reqData, 'WRONG_REQUEST');
  },

  parseBeforeCalling = function (options) {
    parseCalling(options, options.parseBeforeCalling, options.reqData, 'reqDataParsed');
  },

  checkAfterCalling = function (options) {
    return checkCalling(options, options.checkAfterCalling, options.resData, 'WRONG_RESPONSE');
  },

  parseAfterCalling = function (options) {
    parseCalling(options, options.parseAfterCalling, options.resData, 'resDataParsed');
  },

  checkCalling = function (options, foo, data, errorCode) {
    var result = true;
    if (_.isFunction(foo)) {
      result = runMethod(foo, options.ctx, options);
    } else if (_.isPlainObject(foo)) {
      result = semantic.validate(data, foo);
    }
    if (!result) {
      onKo(options, { errorCode });
    }
    return result;
  },

  parseCalling = function (options, foo, data, target) {
    if (_.isFunction(foo)) {
      options[target] = runMethod(foo, options.ctx, options);
    } else if (_.isPlainObject(foo)) {
      options[target] = semantic.parse(data, foo);
    } else {
      options[target] = _.cloneDeep(data);
    }
  },

  // ajax

  send = function (options) {
    switch (options.method) {
      case 'POST':
      case 'PUT':
        request(options.method, getUrl(options)).
          accept('application/json').
          type('form').
          send(options.reqDataParsed).
          end(onComplete.bind(this, options));
          break;
      case 'DELETE':
        request(options.method, getUrl(options)).
          accept('application/json').
          end(onComplete.bind(this, options));
        break;
      default:
        request(options.method, getUrl(options)).
          accept('application/json').
          query(options.reqDataParsed).
          end(onComplete.bind(this, options));
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
      send(options);
    }
  }

};
