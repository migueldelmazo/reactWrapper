'use strict';

import _ from 'lodash';
import React from 'react';

var

  // validate field

  getValidationField = function (field) {
    var validations = _.parseArray(this.validations[field]),
      val = this.state[field];
    return _.filter(validations, function (validation) {
      return !validation.regex.test(val);
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
        return renderParragraphError(validations[0]);
      default:
        return renderUlError(validations);
    }
  },

  renderUlError = function (validations) {
    return (
      <ul className='validation'>
        {_.map(validations, renderLiError)}
      </ul>
    );
  },

  renderLiError = function (validation) {
    return (
      <li key={validation.msg}>{validation.msg}</li>
    );
  },

  renderParragraphError = function (validation) {
    return (
      <p className='validation'>{validation.msg}</p>
    );
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
    return !!_.find(_.keys(this.validations), isValidField, this);
  }

};
