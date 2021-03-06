/* eslint no-console: 0 */

'use strict';

var _ = require('lodash'),
  React = require('react'),
  ReactDom = require('react-dom'),
  atom = require('atom');

var

  // state

  wrapSetStateMethod = function () {
    this.setState = _.wrap(this.setState, function (setStateMethod, key, val) {
      var obj = _.parseToObj(key, val),
        newState = _.extend({}, this.state, obj);
      if (!this.isViewBlocked() && !_.isEqual(this.state, newState)) {
        setStateMethod.call(this, obj);
        onSetState.call(this, key);
      }
    });
  },

  onSetState = function (key) {
    if (_.isString(key) && _.has(this, 'onSetState.' + key)) {
      _.runCb(this, 'onSetState.' + key);
    }
  },

  // atom

  initAtom = function () {
    if (this.atomListeners) {
      this.atomConf = {
        listeners: [
          {
            attrs: this.atomListeners,
            cb: 'forceUpdate'
          }
        ]
      };
    }
    atom.on(this);
  },

  // props

  areEqualProps = function (nextProps) {
    return this._propTypesKeys ? _.isEqual(_.pick(this.props, this._propTypesKeys), _.pick(nextProps, this._propTypesKeys)) : true;
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

  spec.shouldComponentUpdate = function (nextProps, nextState) {
    return !areEqualProps.call(this, nextProps) || !_.isEqual(this.state, nextState);
  };

  // props

  if (spec.propTypes) {
    spec._propTypesKeys = _.keys(spec.propTypes);
  }

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

  // events

  spec.onEv = function (listener) {
    var args = _.slice(arguments, 1);
    return function (ev) {
      if (!this.isViewBlocked() && listener.apply(this, args.concat(ev)) !== true) {
        this.stopEvent(ev);
      }
    }.bind(this);
  };

  spec.stopEvent = function (ev) {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
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

  // blocked view

  if (!spec.isViewBlocked) {
    spec.isViewBlocked = function () {
      return false;
    };
  }

  return React._createClass(spec);
};

React.initApp = function (view, el) {
  ReactDom.render(view, el);
};

module.exports = React;

