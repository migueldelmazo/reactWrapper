'use strict';

import _ from 'lodash';
import React from 'react';
import RouterStore from '../wrapper/router';
import ArtilcesStore from '../stores/articles';

export default React.createClass({

  displayName: __filename,

  atom: {
    listeners: [
      RouterStore.atomAttr.currentName,
      RouterStore.atomAttr.currentValues,
      ArtilcesStore.atomAttr.articlesApiSending
    ]
  },

  // render helpers

  getRoutes () {
    var routes = _.map(this.atomGet(RouterStore.atomAttr.routes), function (route) {
      return (
        <li key={route.name}>
          {route.name} {JSON.stringify(route.values)}
        </li>
      );
    });
    return (
      <div>
        <h6>Routes</h6>
        <ul>
          {routes}
        </ul>
      </div>
    );
  },

  render () {
    return (
      <div className='mdl-grid test'>
        <div className='mdl-cell mdl-cell--6-col block'>
          <h4>Test</h4>
          {this.getRoutes()}
        </div>
        <div className='mdl-cell mdl-cell--6-col block'>
          <h4>API</h4>
          {this.atomGet(ArtilcesStore.atomAttr.articlesApiSending, '').toString()}
        </div>
      </div>
    );
  }

});
