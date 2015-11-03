'use strict';

var _ = require('lodash'),
  React = require('react'),
  Atom = require('atom');

var

  // form: DOM events

  formOnChangeItem = function (options, val) {
    if (_.isFunction(options.setValueCb)) {
      options.setValueCb(val, options.setValueParams || {});
    }
    this.validationAddChangedField(options.validationKey);
  },

  formOnChangeTextField = function (options, ev) {
    formOnChangeItem.call(this, options, ev.target.value);
  },

  formOnClickSubmit = function (options, ev) {
    this.formOnSubmit(ev);
  },

  // form: helpers

  formIsSubmitDisabled = function (options) {
    return options.processingState ? true : !this.validationIsValidForm();
  },

  formGetSubmitValue = function (options) {
    return options.processingState ? options.processingValue : options.value;
  },

  // validations: validate field

  validationGetValidationField = function (field) {
    var validations = _.parseArray(this.validations[field]);
    return _.filter(validations, function (validation) {
      var val = validation.getValueCb(field);
      return validation.regex ? !validation.regex.test(val) : !validation.fn(val);
    });
  },

  validationIsValidField = function (field) {
    return _.isEmpty(validationGetValidationField.call(this, field));
  },

  // validations: changed fields

  validationAddChangedField = function (fields) {
    var __validationFields = _.flattenDeep(fields).concat(this.state.__validationFields);
    this.setState('__validationFields', _.uniq(__validationFields));
  };

module.exports = {

  // form elements

  formText (options) {
    options = options || {};
    return (
      <input
        type={_.get(options, 'type', 'text')}
        defaultValue={options.getValueCb.call(null, options.getValueParams)}
        placeholder={_.get(options, 'placeholder', '')}
        className={_.get(options, 'className', '')}
        onChange={this.onEv(formOnChangeTextField, options)} />
    );
  },

  formTextarea (options) {
    options = options || {};
    return (
      <textarea
        value={options.getValueCb.call(null, options.getValueParams)}
        placeholder={_.get(options, 'placeholder')}
        rows={_.get(options, 'rows')}
        className={_.get(options, 'className', '')}
        onChange={this.onEv(formOnChangeTextField, options)} />
    );
  },

  formSubmit (options) {
    options = options || {};
    return (
      <button
        type={_.get(options, 'type', 'submit')}
        disabled={formIsSubmitDisabled.call(this, options)}
        className={_.get(options, 'className', '')}
        onClick={this.onEv(formOnClickSubmit, options)}>
        {formGetSubmitValue.call(this, options)}
      </button>
    );
  },

  formOnSubmit () {
    this.validationAddAllFields();
    if (this.validationIsValidForm()) {
      _.result(this, 'submitForm');
    }
  },

  // validations

  getInitialState () {
    return { __validationFields: [] };
  },

  componentDidMount () {
    var validationChangedFieldDelay = this.validationChangedFieldDelay === undefined ? 1000 : this.validationChangedFieldDelay;
    this._addChangedFieldDebounced = _.debounceWithArgs(validationAddChangedField.bind(this), validationChangedFieldDelay);
  },

  validationAddChangedField (field) {
    this._addChangedFieldDebounced(field);
  },

  validationAddAllFields () {
    this.setState('__validationFields', _.keys(this.validations));
  },

  validationResetChangedFields () {
    this.setState(this.getInitialState());
  },

  validationRender (field, Component) {
    var shouldShowValidation = _.indexOf(this.state.__validationFields, field) >= 0;
    return shouldShowValidation && Component ? (
      <Component validations={validationGetValidationField.call(this, field)} />
    ) : null;
  },

  validationIsValidField (field) {
    return validationIsValidField.call(this, field);
  },

  validationIsValidForm () {
    return _.every(_.keys(this.validations), validationIsValidField, this);
  }

};
