'use strict';

import _ from 'lodash';
import React from 'react';

var

  // validate field

  getValidationField = function (field) {
    var validations = _.parseArray(this.validations[field]),
      val = this.state[field];
    return _.filter(validations, function (validation) {
      return validation.regex ? !validation.regex.test(val) : !validation.fn(val);
    });
  },

  isValidField = function (field) {
    return _.isEmpty(getValidationField.call(this, field));
  },

  // render

  renderValidation = function (validations) {
    switch (_.size(validations)) {
      case 0:
        return null;
      case 1:
        return renderParragraphError(validations);
      default:
        return renderUlError(validations);
    }
  },

  renderUlError = function (validations) {
    return (
      <ul className={getWrapperClassName(validations)}>
        {_.map(validations, renderLiError)}
      </ul>
    );
  },

  renderLiError = function (validation, idx) {
    return (
      <li key={idx} className={getItemClassName(validation)}>{validation.msg}</li>
    );
  },

  renderParragraphError = function (validations) {
    return (
      <div className={getWrapperClassName(validations)}>
        <p className={getItemClassName(validations[0])}>{validations[0].msg}</p>
      </div>
    );
  },

  // className

  getWrapperClassName = function (validations) {
    return _.reduce(validations, function (memo, validation) {
      memo += validation.wrapperClassName ? ' ' + validation.wrapperClassName : '';
      return memo;
    }, 'validation');
  },

  getItemClassName = function (validation) {
    return validation.itemClassName || null;
  };

export default {

  getInitialState () {
    return { validationFields: [] };
  },

  validationAddChangedField (field) {
    var validationFields = _.parseArray(field).concat(this.state.validationFields);
    this.setState('validationFields', _.uniq(validationFields));
  },

  validationAddAllFields () {
    this.setState('validationFields', _.keys(this.validations));
  },

  validationResetChangedFields () {
    this.setState(this.getInitialState());
  },

  validationRender (field) {
    var shouldShowValidation = _.indexOf(this.state.validationFields, field) >= 0;
    return shouldShowValidation ? renderValidation(getValidationField.call(this, field)) : null;
  },

  validationIsValidForm () {
    return !!_.every(_.keys(this.validations), isValidField, this);
  }

};
