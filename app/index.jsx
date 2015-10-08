'use strict';

require('./stores/api');
require('./stores/router');

import React from './lib/react';
import AppView from './views/app.jsx';

React.initApp(<AppView />);
