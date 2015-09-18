'use strict';

import StoreClass from '../lib/store';
import Utils from '../lib/utils';

var atomAttr = {
    newArticleTitle: 'articles.new.title',
    newArticleSubtitle: 'articles.new.subtitle'
  };

export default StoreClass.create({

  atomAttr,

  validations: {
    newArticleTitle: {
      atomAttr: atomAttr.newArticleTitle,
      regex: Utils.regex.isNotEmpty,
      msg: 'epic fail'
    }
  },

  storeNewArticle (val, options) {
    this.setAtom(options.key, val);
  }

});
