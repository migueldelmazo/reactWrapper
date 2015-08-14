'use strict';

import _ from 'lodash';
import React from 'react';
import Atom from './atom';

var

  // state

  wrapSetStateMethod = function () {
    this.setState = _.wrap(this.setState, function (setStateMethod, key, value) {
      setStateMethod.call(this, parseToObj(key, value));
    });
  },

  // utils

  analytics = function (msg) {
    console.debug(this._displayName + ':', msg, this.state);
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

  // display name

  spec._displayName = spec.displayName;

  // react wrappers methods

  spec._componentWillMount = spec.componentWillMount;

  spec.componentWillMount = function () {
    Atom.on(this);
    _.result(this, '_componentWillMount');
  };

  spec._componentWillUnmount = spec.componentWillUnmount;

  spec.componentWillUnmount = function () {
    Atom.off(this);
    _.result(this, '_componentWillUnmount');
  };

  // shouldComponentUpdate

  spec.shouldComponentUpdate = function (props) {
    return !_.isEqual(this.props, props);
  };

  // render

  spec._render = spec.render;

  spec.render = function () {
    analytics.call(this, 'render');
    return this._render();
  };

  // state

  spec.getInitialState = function () {
    wrapSetStateMethod.call(this);
    return this.initialState || {};
  };

  // atom

  spec.onAtomChanged = function () {
    this.forceUpdate();
  };

  spec.atomGet = function (attr) {
    return Atom.get(attr);
  };

  // actions

  spec.storeToState = function (action) {
    this.setState(action.stateAttr, action.method.call(action.store));
  };

  spec.atomToState = function (action) {
    this.setState(action.stateAttr, this.atomGet(action.atomAttr));
  };

  return React._createClass(spec);
};

module.exports = React;
