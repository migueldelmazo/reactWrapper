/* eslint no-console: 0 */

'use strict';

var _ = require('lodash'),
  React = require('react'),
  ReactDom = require('react-dom'),
  atom = require('atom');

var

  // atom

  initAtom = function () {
    setOnAtomChangeMethod.call(this);
    atom.on(this);
  },

  setOnAtomChangeMethod = function () {
    if (this.atom && !this.atom.onChange) {
      this.atom.onChange = this.forceUpdate;
    }
  },

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
    initAtom.call(this);
    _.result(this, '_componentWillMount');
  };

  spec._componentWillUnmount = spec.componentWillUnmount;

  spec.componentWillUnmount = function () {
    atom.off(this);
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

  spec.atomGet = atom.get;

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

  // className

  spec.cn = function (status, trueClass, falseClass, prefixClass, sufixClass) {
    trueClass = trueClass || '';
    falseClass = falseClass || '';
    prefixClass = prefixClass === undefined ? '' : prefixClass;
    sufixClass = sufixClass === undefined ? '' : sufixClass;
    return prefixClass + (status ? trueClass : falseClass) + sufixClass;
  };

  return React._createClass(spec);
};

React.initApp = function (view, el) {
  ReactDom.render(view, el);
};

module.exports = React;

