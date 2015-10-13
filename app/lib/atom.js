'use strict';

import _ from 'lodash';

var atom = {},

  // on change attributes

  changedAttrs = [],

  addChangedAttr = function (attr, options) {
    if (options && options.silent) {
      return;
    }
    changedAttrs.push(attr);
    triggerDebounced();
  },

  getChangedAttrs = function () {
    var _changedAttrs = _.uniq(changedAttrs);
    changedAttrs = [];
    return _changedAttrs;
  },

  // trigger changes

  triggerDebounced = _.debounce(function () {
    var attrs = getChangedAttrs();
    console.group('atom attrs changed', attrs);
    _.each(contexts, function (context) {
      var changedItems = filterChangedItems(context, attrs);
      runItemActions(context, changedItems);
      triggerChangedItems(context, changedItems);
    });
    console.groupEnd();
  }, 10),

  filterChangedItems = function (context, attrs) {
    return _.filter(context.atomListener, function (item) {
      return _.find(item.atom, function (itemAttr) {
        return attrs.indexOf(itemAttr) >= 0;
      });
    });
  },

  triggerChangedItems = function (context, changedItems) {
    if (!_.isEmpty(changedItems) && _.isFunction(context.onAtomChanged)) {
      context.onAtomChanged(changedItems);
    }
  },

  // actions

  runItemActions = function (context, items) {
    _.each(items, function (item) {
      _.each(item.actions, runItemAction.bind(context));
    });
  },

  runItemAction = function (action) {
    var actionFn = getActionFn.call(this, action);
    if (actionFn) {
      actionFn.call(this, action);
    }
  },

  getActionFn = function (action) {
    var fn = this[action.action];
    return _.isFunction(fn) ? fn : undefined;
  },

  // contexts

  contexts = [],

  parseContextListeners = function (context) {
    if (context.atomListener) {
      _.each(context.atomListener, function (item) {
        if (!_.isArray(item.atom)) {
          item.atom = [item.atom];
        }
      });
      contexts.push(context);
    }
  },

  // initial data

  setInitialData = function (context) {
    if (context.atomInitial) {
      _.each(context.atomInitial, function (item) {
        module.exports.set(item[0], item[1]);
      });
    }
  };

module.exports = {

  // listeners

  on (context) {
    parseContextListeners(context);
    setInitialData(context);
  },

  off (context) {
    var index;
    if (context.atomListener) {
      index = contexts.indexOf(context);
      if (index >= 0) {
        contexts.splice(index, 1);
      }
    }
  },

  // get/set values

  has (attr) {
    return _.has(atom, attr);
  },

  get (attr, defaultValue) {
    return _.get(atom, attr, defaultValue);
  },

  set (attr, value, options) {
    if (!_.isEqual(_.get(atom, attr), value)) {
      _.set(atom, attr, value);
      addChangedAttr(attr, options);
    }
  },

  del (attr, options) {
    _.set(atom, attr, undefined);
    addChangedAttr(attr, options);
  },

  // get/set collections

  pop (attr, options) {
    var arr = _.get(atom, attr),
      result;
    if (_.isArray(arr)) {
      result = arr.pop();
      addChangedAttr(attr, options);
    }
    return result;
  },

  push (attr, value, options) {
    var arr = _.get(atom, attr);
    if (_.isArray(arr)) {
      arr.push(value);
      addChangedAttr(attr, options);
    }
  },

  concat (attr, value, options) {
    var arr = _.get(atom, attr);
    if (_.isArray(arr)) {
      arr.concat(value);
      addChangedAttr(attr, options);
    }
  },

  reset (attr, value, options) {
    if (value === undefined) {
      value = [];
    } else if (_.isArray(value)) {
      value = [value];
    }
    _.set(attr, value);
    addChangedAttr(attr, options);
  },

  at (attr, index, size) {
    return _.at(_.get(atom, attr), index, size);
  },

  size (attr) {
    return _.size(_.get(atom, attr));
  }

};

window.atom = atom;
