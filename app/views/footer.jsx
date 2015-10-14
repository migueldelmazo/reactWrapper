'use strict';

var React = require('react');

module.exports = React.createClass({

  displayName: __filename,

  render () {
    return (
      <div className='mdl-grid'>
        <div className='mdl-cell mdl-cell--2-col block'>
          <h6>Navigation A</h6>
        </div>
        <div className='mdl-cell mdl-cell--2-col block'>
          <h6>Navigation B</h6>
        </div>
        <div className='mdl-cell mdl-cell--2-col block'>
          <h6>Navigation C</h6>
        </div>
        <div className='mdl-cell mdl-cell--2-col block'>
          <h6>Social</h6>
        </div>
        <div className='mdl-cell mdl-cell--2-col block'>
          <h6>Contact</h6>
        </div>
        <div className='mdl-cell mdl-cell--2-col block'>
          <h6>® Copyright</h6>
        </div>
      </div>
    );
  }
});
