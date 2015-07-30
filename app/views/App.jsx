'use strict';

import React from 'react';
import AppStore from '../stores/App';
import ChildView from './Child.jsx';

export default React.createClass({

  _displayName: 'App',

  _atom: [
    {
      state: 'foo',
      atom: AppStore.model.foo,
      validate: 'isString',
      parse: 'parseString',
      initialValue: '123'
    }
  ],

  _render () {
    return (
      <div>
        <ChildView foo={this.state.foo} />
      </div>
    );
  }
});
