'use strict';

var _ = require('lodash'),
  React = require('react'),
  router = require('../lib/router'),
  articlesStore = require('../stores/articles');

module.exports = React.createClass({

  displayName: __filename,

  atom: {
    listeners: [
      router.atomAttr.currentName,
      router.atomAttr.currentValues,
      articlesStore.atomAttr.articlesApiSending
    ]
  },

  // render helpers

  getRoutes () {
    var routes = _.map(this.atomGet(router.atomAttr.routes), function (route) {
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
          {this.atomGet(articlesStore.atomAttr.articlesApiSending, '').toString()}
        </div>
      </div>
    );
  }

});
