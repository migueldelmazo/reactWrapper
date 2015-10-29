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
      isCurrent = props.current ? Router.isCurrent(props.current) : false,
      isParent = props.parent ? Router.isParent(props.parent) : false;
    return isCurrent || isParent ? props.children : null;
  }

});
