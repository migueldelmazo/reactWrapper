'use strict';

var _ = require('lodash'),
  React = require('react');

var

  // DOM events

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

  // helpers

  isValidForm = function () {
    return this.validationIsValidForm ? this.validationIsValidForm() : true;
  };

module.exports = {

  // input text

  formRenderText (options) {
    options = options || {};
    return (
      <input
        type={_.get(options, 'type', 'text')}
        value={_.get(options, 'val', '')}
        placeholder={_.get(options, 'placeholder', '')}
        onChange={this.onEv(onChangeTextField, options)} />
    );
  },

  // input text

  formRenderTextarea (options) {
    options = options || {};
    return (
      <textarea
        defaultValue={_.get(options, 'val', '')}
        placeholder={_.get(options, 'placeholder')}
        onChange={this.onEv(onChangeTextField, options)} />
    );
  },

  // input submit

  formRenderSubmit (options) {
    options = options || {};
    return (
      <button
        type={_.get(options, 'type', 'submit')}
        disabled={!isValidForm.call(this)}
        className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
        onClick={this.onEv(onClickSubmit, options)}>
        {_.get(options, 'val', '')}
      </button>
    );
  },

  // DOM events

  formOnSubmit () {
    _.result(this, 'validationAddAllFields');
    if (isValidForm.bind(this)) {
      _.result(this, 'submitForm');
    }
  }

};
