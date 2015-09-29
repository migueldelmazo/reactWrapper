/* eslint no-console: 0 */

'use strict';

import _ from 'lodash';
import React from 'react';
import Atom from './atom';

var

  // state

  wrapSetStateMethod = function () {
    this.setState = _.wrap(this.setState, function (setStateMethod, key, val) {
      var obj = _.parseToObj(key, val),
        newState = _.extend({}, this.state, obj);
      if (!_.isEqual(this.state, newState)) {
        setStateMethod.call(this, obj);
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
    return _.result(this, 'initialState') || null;
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
    this.setState(action.stateAttr, action.method());
  };

  spec.atomToState = function (action) {
    this.setState(action.stateAttr, this.atomGet(action.atomAttr));
  };

  // events

  spec.onEv = function (listener) {
    var args = _.slice(arguments, 1);
    return function (ev) {
      var dontStopEvent = listener.apply(this, args.concat(ev));
      if (dontStopEvent !== true) {
        this.stopEvent(ev);
      }
    }.bind(this);
  };

  spec.stopEvent = function (ev) {
    if (ev) {
      ev.nativeEvent.preventDefault();
      ev.nativeEvent.stopPropagation();
    }
  };

  return React._createClass(spec);
};

React.initApp = function (view, el) {
  // wait to start the atom
  setTimeout(function () {
    React.render(view, el || document.body);
  }, 0);

};

module.exports = React;
