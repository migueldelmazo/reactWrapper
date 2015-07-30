'use strict';

var React = require('react');

// wrap React.createClass
React._createClass = React.createClass;

React.createClass = function (spec) {

  // wrap componentWillMount method
  if (spec.componentWillMount) {
    spec._componentWillMount = spec.componentWillMount;
  }
  spec.componentWillMount = function () {
  };

  // wrap componentWillUnmount method
  if (spec.componentWillUnmount) {
    spec._componentWillUnmount = spec.componentWillUnmount;
  }
  spec.componentWillUnmount = function () {
  };

  return React._createClass(spec);
};

module.exports = React;
