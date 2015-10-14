'use strict';

var _ = require('lodash');

_.mixin({

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

  resultWithArgs (obj, path) {
    var result = _.get(obj, path);
    return _.isFunction(result) ? result.apply(obj, _.slice(arguments, 2)) : result;
  }

});

