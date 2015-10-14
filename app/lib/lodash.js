'use strict';

import _ from 'lodash';

var

  parseArray = function (arr = []) {
    return _.isArray(arr) ? arr : [arr];
  },

  parseToObj = function (key, value) {
    var obj = {};
    if (_.isPlainObject(key)) {
      obj = key;
    } else {
      _.set(obj, key, value);
    }
    return obj;
  },

  resultWithArgs = function (obj, path) {
    var result = _.get(obj, path);
    return _.isFunction(result) ? result.apply(obj, _.slice(arguments, 2)) : result;
  };

_.mixin({ parseArray, parseToObj, resultWithArgs });

