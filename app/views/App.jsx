'use strict';

import React from 'react';
import AddressesView from './Addresses.jsx';

export default React.createClass({

  _displayName: __filename,

  _render () {
    return (
      <div>
        <AddressesView />
      </div>
    );
  }

});
