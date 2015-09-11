'use strict';

import React from 'react';
import ActiclesView from './articles.jsx';
import ActiclesNewView from './articlesNew.jsx';

export default React.createClass({

  displayName: __filename,

  render () {
    return (
      <div className='mdl-grid'>
        <ActiclesView text='news' />
        <ActiclesView text='info' />
        <ActiclesNewView />
      </div>
    );
  }
});
