'use strict';

import _ from 'lodash';

var atom = {},

  contexts = [],

  // on change

  changedAttrs = [],

  onChangeDebounced = _.debounce(function () {
    var attrs = changedAttrs;
    changedAttrs = [];
    _.each(contexts, function (context) {
      context.atomChanged(attrs);
    });
  }, 10),

  onChange = function (attr) {
    changedAttrs.push(attr);
    onChangeDebounced();
  };

module.exports = {
  on (context) {
    contexts.push(context);
  },

  off (context) {
    var index = contexts.indexOf(context);
    contexts.splice(index, 1);
  },

  set (attr, value) {
    if (!_.isEqual(_.get(atom, attr), value)) {
      _.set(atom, attr, value);
      onChange(attr);
    }
  },

  get (attr) {
    return _.get(atom, attr);
  },

  checkAttr (attrs, attr) {
    return attrs.indexOf(attr) >= 0;
  }
};
