/* eslint no-console: 0 */

'use strict';

import _ from 'lodash';
import React from 'react';
import Atom from './atom';
import Util from './util';

var

  // state

  wrapSetStateMethod = function () {
    this.setState = _.wrap(this.setState, function (setStateMethod, key, val) {
      var newState = _.extend({}, this.state, Util.parseToObj(key, val));
      if (!_.isEqual(this.state, newState)) {
        setStateMethod.call(this, Util.parseToObj(key, val));
        onSetState.call(this, key);
      }
    });
  },

  onSetState = function (key) {
    if (_.isString(key) && _.isFunction(_.get(this, 'onSetState[' + key + ']'))) {
      this.onSetState[key].call(this);
    }
  },

  // utils

  analytics = function (msg) {
    console.debug(this._displayName + ':', msg, this.state);
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

  spec.shouldComponentUpdate = function (props, state) {
    return !_.isEqual(this.props, props) || !_.isEqual(this.state, state);
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
