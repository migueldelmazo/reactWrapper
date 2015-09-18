'use strict';

import React from './lib/react';
import AppView from './views/app.jsx';

require('./stores/router');

React.render(<AppView />, document.body);
