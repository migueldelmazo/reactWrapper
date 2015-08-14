'use strict';

import React from 'react';
import AddressesView from './Addresses.jsx';

export default React.createClass({

  displayName: __filename,

  render () {
    return (
      <div>
        <AddressesView />
      </div>
    );
  }

});
