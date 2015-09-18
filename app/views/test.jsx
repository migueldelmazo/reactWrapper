'use strict';

import _ from 'lodash';
import React from 'react';
import RouterStore from '../stores/router';

export default React.createClass({

  displayName: __filename,

  atomListener: [
    {
      atom: [RouterStore.atomAttr.currentName, RouterStore.atomAttr.currentValues]
    }
  ],

  render () {
    return (
      <div className='mdl-grid test'>
        <div className='mdl-cell mdl-cell--12-col block'>
          <h4>Test</h4>
          {this.getRoutes()}
        </div>
      </div>
    );
  },

  // render helpers

  getRoutes () {
    var routes = _.map(this.atomGet(RouterStore.atomAttr.routes), function (route) {
      return (<li>{route.name} {JSON.stringify(route.values)}</li>);
    });
    return (
      <div>
        <h6>Routes</h6>
        <ul>
          {routes}
        </ul>
      </div>
    );
  }

});
