'use strict';

require('./wrapper/lodash');
require('./wrapper/api');
require('./wrapper/react');
require('./wrapper/router');

import React from 'react';
import AppView from './views/app.jsx';

React.initApp(<AppView />);
