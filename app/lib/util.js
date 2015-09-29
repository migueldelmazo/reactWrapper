'use strict';

import _ from 'lodash';

var

  // lodash mixins

  parseArray = function (arr = []) {
    return _.isArray(arr) ? arr : [arr];
  },

  resultWithArgs = function (obj, path) {
    var result = _.get(obj, path);
    return _.isFunction(result) ? result.apply(obj, _.slice(arguments, 2)) : result;
  };

_.mixin({ parseArray, resultWithArgs });

export default {

  // regex

  regex: {
    isNotEmpty: /([^\s])/,
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    isEmail: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    // http://web.ontuts.com/snippets/10-expresiones-regulares-imprescindibles-en-desarrollo-web/
    isStrongPassword: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
  },

  // helpers

  parseToObj (key, value) {
    var obj = {};
    if (_.isPlainObject(key)) {
      obj = key;
    } else {
      _.set(obj, key, value);
    }
    return obj;
  }

};
