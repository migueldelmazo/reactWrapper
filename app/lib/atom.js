'use strict';

import _ from 'lodash';

var atom = {},

  contexts = [],

  // on change

  changedAttrs = [],

  addChangedAttr = function (attr) {
    changedAttrs.push(attr);
  },

  getChangedAttrs = function () {
    var _changedAttrs = _.uniq(changedAttrs);
    changedAttrs = [];
    return _changedAttrs;
  },

  // trigger

  triggerDebounced = _.debounce(function () {
    var attrs = getChangedAttrs();
    _.each(contexts, function (context) {
      var changedItems = filterChangedItems(context, attrs);
      runItemActions(context, changedItems);
      triggerChangedItems(context, changedItems);
    });
  }, 10),

  filterChangedItems = function (context, attrs) {
    return _.filter(context._atom, function (item) {
      return true;
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
  };

module.exports = {

  on (context) {
    if (context._atom) {
      contexts.push(context);
    }
  },

  off (context) {
    var index;
    if (context._atom) {
      index = contexts.indexOf(context);
      if (index >= 0) {
        contexts.splice(index, 1);
      }
    }
  },

  set (attr, value) {
    if (!_.isEqual(_.get(atom, attr), value)) {
      _.set(atom, attr, value);
      addChangedAttr(attr);
      triggerDebounced();
    }
  },

  get (attr) {
    return _.get(atom, attr);
  }
};

window.atom = atom;
