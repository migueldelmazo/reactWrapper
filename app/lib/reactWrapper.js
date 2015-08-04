'use strict';

import _ from 'lodash';
import React from 'react';
import Atom from './atom';

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

  // analytics

  spec.analytics = function (msg) {
    console.log(this._displayName, msg);
  };

  // render

  spec.render = function () {
    this.analytics('render');
    this._shouldRender = false;
    return this._render();
  };

  // shouldComponentUpdate

  spec.shouldComponentUpdate = function (props) {
    return this._shouldRender || !_.isEqual(this.props, props);
  };

  // state

  spec.getInitialState = function () {
    var state = {};
    _.each(this._atom, function (item) {
      state[item.state] = item.initialValue;
    });
    return state;
  };

  spec._setState = function (key, value) {
    var state = {},
      newState;

    if (_.isPlainObject(key)) {
      state = key;
    } else {
      state[key] = value;
    }

    newState = _.extend({}, this.state, state);

    if (!_.isEqual(this.state, newState)) {
      this._shouldRender = true;
      this.setState(newState);
    }
  };

  // atom

  spec.atomChanged = function (attrs) {
    _.each(this._atom, function (item) {
      if (Atom.checkAttr(attrs, item.atom)) {
        this._setState(item.state, this.atomGet(item.atom));
      }
    }, this);
  };

  spec.atomGet = function (attr) {
    return Atom.get(attr);
  };

  return React._createClass(spec);
};

module.exports = React;
