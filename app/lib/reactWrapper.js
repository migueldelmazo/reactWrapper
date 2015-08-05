'use strict';

import _ from 'lodash';
import React from 'react';
import Atom from './atom';

var // render helpers

  enableRender = function () {
    this._shouldRender = true;
  },

  disableRender = function () {
    this._shouldRender = false;
  },

  shouldRender = function () {
    return this._shouldRender;
  },

  // state helpers

  ensureStateAttrs = function () {
    _.each(this._atom, function (item) {
      if (!item.state) {
        item.state = _.uniqueId('_atomBackup');
      }
    });
  },

  getInitialState = function () {
    return _.reduce(this._atom, function (state, item) {
      state[item.state] = item.initialValue;
      return state;
    }, {});
  },

  getNewState = function () {
    return _.reduce(this._atom, function (newState, item) {
      var atomValue;
      if (item.atom) {
        atomValue = this.atomGet(item.atom);
        if (!_.isEqual(atomValue, _.get(this.state, item.state))) {
          _.set(newState, item.state, atomValue);
        }
      }
      return newState;
    }, {}, this);
  },

  // utils

  analytics = function (msg) {
    console.log(this._displayName + ':', msg);
  },

  parseToObj = function (key, value) {
    var state = {};
    if (_.isPlainObject(key)) {
      state = key;
    } else {
      _.set(state, key, value);
    }
    return state;
  };

// wrap React.createClass
React._createClass = React.createClass;

React.createClass = function (spec) {

  // wrappers

  spec.componentWillMount = function () {
    Atom.on(this);
    _.result(this, '_componentWillMount');
  };

  spec.componentDidMount = function () {
    _.result(this, '_componentDidMount');
  };

  spec.componentWillUnmount = function () {
    Atom.off(this);
    _.result(this, '_componentWillUnmount');
  };

  spec.componentDidUnmount = function () {
    _.result(this, '_componentDidUnmount');
  };

  // render

  spec.render = function () {
    analytics.call(this, 'render');
    disableRender.call(this);
    return this._render();
  };

  // shouldComponentUpdate

  spec.shouldComponentUpdate = function (props) {
    return shouldRender.call(this) || !_.isEqual(this.props, props);
  };

  // state

  spec.getInitialState = function () {
    ensureStateAttrs.call(this);
    return getInitialState.call(this);
  };

  spec._setState = function (key, value) {
    var newState = _.extend({}, this.state, parseToObj(key, value));
    if (!_.isEqual(this.state, newState)) {
      enableRender.call(this);
      this.setState(newState);
    }
  };

  // atom

  spec.atomChanged = function (attrs) {
    var newState = getNewState.call(this);
    this._setState(newState);
  };

  spec.atomGet = function (attr) {
    return Atom.get(attr);
  };

  return React._createClass(spec);
};

module.exports = React;
