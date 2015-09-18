'use strict';

import _ from 'lodash';
import React from 'react';

export default {

  renderValidation (storeOptions, viewOptions) {
    var options = _.assign({}, storeOptions, viewOptions),
      validation = this.atomGet(storeOptions.atomAttr) === '';
    return validation ? (
      <span>error</span>
    ) : null;
  }

};
