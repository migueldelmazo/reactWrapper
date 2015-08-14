'use strict';

import React from './lib/react';
import Router from './lib/router';
import Routes from './routes';
import AppView from './views/app.jsx';

Router.init(Routes);
React.render(<AppView />, document.body);
