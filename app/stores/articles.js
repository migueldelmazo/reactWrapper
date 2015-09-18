'use strict';

import StoreClass from '../lib/store';

var atomAttr = {
    newArticleTitle: 'articles.new.title'
  };

export default StoreClass.create({

  atomAttr: atomAttr,

  setTitle (value) {
    console.log(value);
  }

});
