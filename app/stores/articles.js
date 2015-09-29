'use strict';

import StoreClass from '../lib/store';
import Util from '../lib/util';

var atomAttr = {
    newArticle: 'articles.new',
    newArticleTitle: 'articles.new.title',
    newArticleSubtitle: 'articles.new.subtitle',
    newArticleBody: 'articles.new.body',
    articlesList: 'articles.list'
  };

export default StoreClass.create({

  // atom

  atomAttr,

  atomInit: [
    [ atomAttr.articlesList, [] ]
  ],

  validations: {
    newArticleTitle: {
      atomAttr: atomAttr.newArticleTitle,
      regex: Util.regex.isNotEmpty,
      msg: 'epic fail'
    }
  },

  setNewArticleFields (val, options) {
    this.setAtom(options.key, val);
  }

});
