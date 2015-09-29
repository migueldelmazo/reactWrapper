'use strict';

import StoreClass from '../lib/store';

var atomAttr = {
    newArticle: 'articles.new',
    newArticleTitle: 'articles.new.title',
    newArticleSubtitle: 'articles.new.subtitle',
    newArticleBody: 'articles.new.body',
    articlesList: 'articles.list',
    articlesIndex: 'articles.index'
  };

export default StoreClass.create({

  // atom

  atomAttr,

  atomInitial: [
    [atomAttr.articlesList, []],
    [atomAttr.articlesIndex, 0]
  ],

  setNewArticleFields (val, options) {
    this.setAtom(options.key, val);
  },

  createNewArticle (data) {
    console.log(data);
  },

  incArticlesIndex () {
    var articlesIndex = this.getAtom(atomAttr.articlesIndex);
    this.setAtom(atomAttr.articlesIndex, articlesIndex + 1);
  }

});
