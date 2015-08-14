'use strict';

import _ from 'lodash';
import React from 'react';
import Atom from './atom';

var

  // state

  wrapSetStateFn = function () {
    this.setState = _.wrap(this.setState, function (setStateFn, key, value) {
      setStateFn.call(this, parseToObj(key, value));
    });
  },

  // utils

  analytics = function (msg) {
    console.debug(this._displayName + ':', msg);
  },

  parseToObj = function (key, value) {
    var obj = {};
    if (_.isPlainObject(key)) {
      obj = key;
    } else {
      _.set(obj, key, value);
    }
    return obj;
  };

// wrap React.createClass
React._createClass = React.createClass;

React.createClass = function (spec) {

  // wrappers

  spec.componentWillMount = function () {
    Atom.on(this);
    _.result(this, '_componentWillMount');
  };

  spec.componentWillUnmount = function () {
    Atom.off(this);
    _.result(this, '_componentWillUnmount');
  };

  // shouldComponentUpdate

  spec.shouldComponentUpdate = function (props) {
    return !_.isEqual(this.props, props);
  };

  // render

  spec.render = function () {
    analytics.call(this, 'render');
    return this._render();
  };

  // state

  spec.getInitialState = function () {
    wrapSetStateFn.call(this);
    return this._state || {};
  };

  // atom

  spec.onAtomChanged = function () {
    this.forceUpdate();
  };

  spec.atomGet = function (attr) {
    return Atom.get(attr);
  };

  // actions

  spec.updState = function (action) {
    this.setState(action.attr, action.fn.call(action.ctx));
  };

  return React._createClass(spec);
};

module.exports = React;
