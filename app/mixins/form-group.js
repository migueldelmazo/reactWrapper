'use strict';

var React = require('react'),
  ValidationComponent = require('../components/validation.jsx');

module.exports = {

  fgLabel (options) {
    return options.label ? (
      <label className='control-label'>
        <span>{options.label}</span>
      </label>
    ) : null;
  },

  fgText (options) {
    options.className = 'form-control';
    options.wrapperClassName = 'form-group' + (options.size ? ' form-group-' + options.size : '');
    return (
      <div className={options.wrapperClassName}>
        {this.fgLabel(options)}
        {this.formText(options)}
      </div>
    );
  },

  fgTextarea (options) {
    options.className = 'form-control';
    options.wrapperClassName = 'form-group' + (options.size ? ' form-group-' + options.size : '');
    return (
      <div className={options.wrapperClassName}>
        {this.fgLabel(options)}
        {this.formTextarea(options)}
      </div>
    );
  },

  fgSubmit (options) {
    options.className = 'btn';
    options.className += options.type ? ' btn-' + options.type : ' btn-default';
    options.className += options.size ? ' btn-' + options.size : '';
    return this.formSubmit(options);
  },

  fnValidation (field) {
    return this.validationRender(field, ValidationComponent);
  }

};
