'use strict';

import _ from 'lodash';

var atom = {},

  // on change attributes

  changedAttrs = [],

  addChangedAttr = function (attr) {
    changedAttrs.push(attr);
    triggerDebounced();
  },

  getChangedAttrs = function () {
    var _changedAttrs = _.uniq(changedAttrs);
    changedAttrs = [];
    console.log('atom attrs changed', _changedAttrs);
    return _changedAttrs;
  },

  // trigger changes

  triggerDebounced = _.debounce(function () {
    var attrs = getChangedAttrs();
    _.each(contexts, function (context) {
      var changedItems = filterChangedItems(context, attrs);
      runItemActions(context, changedItems);
      triggerChangedItems(context, changedItems);
    });
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
    _.each(context.atomListener, function (item) {
      if (!_.isArray(item.atom)) {
        item.atom = [item.atom];
      }
    });

  };

module.exports = {

  // listeners

  on (context) {
    if (context.atomListener) {
      parseContextListeners(context);
      contexts.push(context);
    }
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

  // get/set...

  get (attr) {
    return _.get(atom, attr);
  },

  set (attr, value) {
    if (!_.isEqual(_.get(atom, attr), value)) {
      _.set(atom, attr, value);
      addChangedAttr(attr);
    }
  },

  add (attr, value) {
    var arr = _.get(atom, attr);
    if (_.isArray(arr)) {
      arr.push(value);
      addChangedAttr(attr);
    }
  },

  reset (attr, arr) {
    if (_.isArray(arr)) {
      _.set(atom, attr, arr);
      addChangedAttr(attr);
    }
  },

  del (attr) {
    _.set(atom, attr, undefined);
    addChangedAttr(attr);
  }

};

window.atom = atom;
