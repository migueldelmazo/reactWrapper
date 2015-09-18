'use strict';

import React from 'react';
import HeaderView from './header.jsx';
import ContentView from './content.jsx';
import FooterView from './footer.jsx';
import TestView from './test.jsx';

export default React.createClass({

  displayName: __filename,

  render () {
    return (
      <div>
        <HeaderView />
        <ContentView />
        <FooterView />
        <TestView />
      </div>
    );
  }

});
