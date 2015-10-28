'use strict';

var React = require('react'),
  Router = require('../lib/router');

module.exports = React.createClass({

  displayName: __filename,

  propTypes: {
    children: React.PropTypes.object,
    parentRouteName: React.PropTypes.string,
    routeName: React.PropTypes.string
  },

  atomListeners: [Router.atomAttr.router],

  render () {
    var props = this.props,
      isCurrentRoute = props.routeName ? Router.isCurrentRoute(props.routeName) : false,
      isParentRoute = props.parentRouteName ? Router.isParentRoute(props.parentRouteName) : false;
    return isCurrentRoute || isParentRoute ? props.children : null;
  }

});
