'use strict';

import StoreClass from '../lib/store';
import Util from '../lib/util';

var atomAttr = {
    newArticleTitle: 'articles.new.title',
    newArticleSubtitle: 'articles.new.subtitle',
    newArticleBody: 'articles.new.body'
  };

export default StoreClass.create({

  atomAttr,

  validations: {
    newArticleTitle: {
      atomAttr: atomAttr.newArticleTitle,
      regex: Util.regex.isNotEmpty,
      msg: 'epic fail'
    }
  },

  storeNewArticle (val, options) {
    this.setAtom(options.key, val);
  }

});
