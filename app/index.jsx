'use strict';

var React,
  AppView;

// init wrappers

require('./lib/lodash');
require('./lib/api');
require('./lib/router');

// init app

React = require('./lib/react');
AppView = require('./views/app.jsx');
React.initApp(<AppView />, document.getElementById('app'));
