'use strict';

import _ from 'lodash';
import React from 'react';

var

  // triggers

  triggerChanges = function () {
    _.each(resetChanges(), triggerChange);
  },

  triggerChange = function (change) {
    triggerChangeParseArray(change);
    _.each(change.trigger, triggerChangeRunMethods.bind(null, change));
  },

  triggerChangeParseArray = function (change) {
    if (!_.isArray(change.trigger)) {
      change.trigger = [change.trigger];
    }
  },

  triggerChangeRunMethods = function (change, trigger) {
    if (trigger && _.isFunction(trigger.fn)) {
      trigger.fn(change.val, trigger);
    }
  },

  // changes

  ON_CHANGE_DEBOUNCE_TIME = 500,

  changes = {},

  resetChanges = function () {
    var _changes = changes;
    changes = {};
    return _changes;
  },

  onChangeItem = function (reactId, val, trigger) {
    changes[reactId] = { trigger, val };
    onChangeDebounced();
  },

  onChangeDebounced = _.debounce(triggerChanges, ON_CHANGE_DEBOUNCE_TIME),

  // render input helpers

  onChangeTextField = function (options, ev) {
    onChangeItem(ev.target.dataset.reactid, ev.target.value, options.trigger);
  },

  onClickSubmit = function (options, ev) {
    triggerChange({ trigger: options.trigger });
    this.onSubmitForm(ev);
  };

export default {

  // input text

  renderInputText (options) {
    options = options || {};
    return (
      <input
        type={_.get(options, 'type', 'text')}
        defaultValue={_.get(options, 'val', '')}
        placeholder={_.get(options, 'placeholder')}
        onChange={onChangeTextField.bind(this, options)} />
    );
  },

  // input text

  renderTextarea (options) {
    options = options || {};
    return (
      <textarea
        defaultValue={_.get(options, 'val', '')}
        placeholder={_.get(options, 'placeholder')}
        onChange={onChangeTextField.bind(this, options)} />
    );
  },

  // input submit

  renderSubmit (options) {
    options = options || {};
    return (
      <button
        type='submit'
        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
        onClick={onClickSubmit.bind(this, options)}>
        {_.get(options, 'val', '')}
      </button>
    );
  },

  // DOM events

  onSubmitForm (ev) {
    this.stopEvent(ev);
    _.result(this, 'submitForm');
  },

  // helpers

  stopEvent (ev) {
    // TODO: mover a otro sitio
    if (ev) {
      ev.nativeEvent.preventDefault();
      ev.nativeEvent.stopPropagation();
    }
  }

};
