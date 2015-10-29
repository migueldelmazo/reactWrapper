'use strict';

var _ = require('lodash');

_.mixin({

  debounceWithArgs (fn, time) {
    var timeoutId,
      args = [];
    return function () {
      args.push(arguments);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        fn(args);
        args = [];
      }, time);
    };
  },

  parseArray (arr = []) {
    return _.isArray(arr) ? arr : [arr];
  },

  parseToObj (key, value) {
    var obj = {};
    if (_.isPlainObject(key)) {
      obj = key;
    } else {
      _.set(obj, key, value);
    }
    return obj;
  },

  resultWithArgs (ctx, path) {
    var result = _.get(ctx, path);
    return _.isFunction(result) ? result.apply(ctx, _.slice(arguments, 2)) : result;
  },

  runCb (ctx, cb) {
    var callback = _.get(ctx, cb);
    callback = _.isString(callback) ? ctx[callback] : callback;
    return callback.apply(ctx, _.slice(arguments, 2));
  }

});

