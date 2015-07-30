'use strict';

import _ from 'lodash';
import React from 'react';

// wrap React.createClass
React._createClass = React.createClass;

React.createClass = function (spec) {

  // render

  spec.render = function () {
    console.log('render: ', this._displayName);
    return this._render();
  };

  // shouldComponentUpdate

  spec.shouldComponentUpdate = function (state, props) {
    return !_.isEqual(this.props, props);
  };

  // state

  spec.getInitialState = function () {
    var state = {};

    _.each(this._atom, function (item) {
      state[item.state] = item.initialValue;
    });

    return state;
  };

  spec._setState = function (state) {
    var newState = _.extend({}, this.state, state);

    if (!_.isEqual(this.state, newState)) {
      this.setState(newState);
    }
  };

  return React._createClass(spec);
};

module.exports = React;
