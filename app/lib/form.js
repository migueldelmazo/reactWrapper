'use strict';

import _ from 'lodash';
import React from 'react';

var

  onChangeItem = function (key, val) {
    this.setState(key, val);
    _.resultWithArgs(this, 'validationAddChangedField', key);
  },

  onChangeTextField = function (options, ev) {
    onChangeItem.call(this, options.key, ev.target.value);
  },

  onClickSubmit = function (options, ev) {
    this.formOnSubmit(ev);
  },

  isValidForm = function () {
    return this.validationIsValidForm ? this.validationIsValidForm() : true;
  };

export default {

  // input text

  formRenderText (options) {
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

  formRenderTextarea (options) {
    options = options || {};
    return (
      <textarea
        defaultValue={_.get(options, 'val', '')}
        placeholder={_.get(options, 'placeholder')}
        onChange={onChangeTextField.bind(this, options)} />
    );
  },

  // input submit

  formRenderSubmit (options) {
    options = options || {};
    return (
      <button
        type='submit'
        disabled={!isValidForm.call(this)}
        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
        onClick={onClickSubmit.bind(this, options)}>
        {_.get(options, 'val', '')}
      </button>
    );
  },

  // DOM events

  formOnSubmit (ev) {
    this.stopEvent(ev);
    if (isValidForm.bind(this)) {
      _.result(this, 'submitForm');
    }
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
