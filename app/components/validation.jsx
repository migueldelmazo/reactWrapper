'use strict';

var _ = require('lodash'),
  React = require('react');

module.exports = React.createClass({

  displayName: __filename,

  propTypes: {
    validations: React.PropTypes.array
  },

  render () {
    var validation = _.first(this.props.validations);
    return validation ? (
      <div className='alert alert-danger'>
        {validation.msg}
      </div>
    ) : null;
  }

});
