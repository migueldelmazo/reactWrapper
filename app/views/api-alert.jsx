'use strict';

var _ = require('lodash'),
  React = require('react'),
  Api = require('../lib/api');

module.exports = React.createClass({

  displayName: __filename,

  atomListeners: [Api.atomAttr.error],

  render () {
    var apiError = Api.getError();
    return !_.isEmpty(apiError) ? (
      <div className='alert alert-danger'>
        <span>Error code: {apiError.errorCode}</span> <span>Error message: {apiError.errorMsg}</span>
      </div>
    ) : null;
  }

});
