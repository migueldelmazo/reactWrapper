'use strict';

import React from 'react';

export default React.createClass({

  displayName: __filename,

  render () {
    return (
      <div className='mdl-grid'>
        <div className='mdl-cell mdl-cell--2-col block'>
          <h4>react wrapper</h4>
        </div>
        <div className='mdl-cell mdl-cell--7-col block'>
          <h4>Navigation</h4>
        </div>
        <div className='mdl-cell mdl-cell--2-col block'>
          <h4>Search</h4>
        </div>
        <div className='mdl-cell mdl-cell--1-col block'>
          <h4>User</h4>
        </div>
      </div>
    );
  }
});
