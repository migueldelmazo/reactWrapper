'use strict';

import React from 'react';

export default React.createClass({

  _displayName: 'Child',

  _render () {
    return (
      <p>Hello world!!!{this.props.foo}</p>
    );
  }
});
