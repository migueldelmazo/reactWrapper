'use strict';

import _ from 'lodash';
import React from 'react';

var

  onChangeItem = function (key, val) {
    this.setState(key, val);
  },

  onChangeTextField = function (options, ev) {
    onChangeItem.call(this, options.key, ev.target.value);
  },

  onClickSubmit = function (options, ev) {
    this.onSubmitForm(ev);
  };

export default {

  // input text

  renderInputText (options) {
    options = options || {};
    return (
      <input
        type={_.get(options, 'type', 'text')}
        value={_.get(options, 'val', '')}
        placeholder={_.get(options, 'placeholder', '')}
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
