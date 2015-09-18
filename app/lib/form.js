'use strict';

import _ from 'lodash';
import React from 'react';

var

  // on change

  ON_CHANGE_DEBOUNCE_TIME = 1000,

  changes = {},

  onChangeItem = function (reactId, options) {
    changes[reactId] = options;
    onChangeDebounced();
  },

  onChangeDebounced = _.debounce(function () {
    _.each(resetChanges(), function (change) {
      if (_.isFunction(change.fn)) {
        change.fn(onChangeGetFnArgument(change));
      }
    });
  }, ON_CHANGE_DEBOUNCE_TIME),

  resetChanges = function () {
    var _changes = changes;
    changes = {};
    return _changes;
  },

  onChangeGetFnArgument = function (change) {
    var result = {};
    if (change.key) {
      result[change.key] = change.val;
    } else {
      result = change.val;
    }
    return result;
  },

  // input text

  onChangeInputText = function (options, ev) {
    onChangeItem(ev.target.dataset.reactid, {
      fn: options.fn,
      key: options.key,
      val: ev.target.value
    });
  };

export default {

  // input text

  getInputText (options) {
    options = options || {};
    return (
      <input
        type='text'
        placeholder={_.get(options, 'placeholder')}
        onChange={onChangeInputText.bind(this, options)} />
    );
  },

  // DOM events

  onSubmitForm (ev) {
    this.stopEvent(ev);
    _.result(this, 'submitForm');
  },

  // helpers

  stopEvent (ev) {
    if (ev) {
      ev.nativeEvent.preventDefault();
      ev.nativeEvent.stopPropagation();
    }
  }

};
