'use strict';

import StoreClass from '../lib/store';

var atomAttr = {
    newArticle: 'articles.new',
    newArticleTitle: 'articles.new.title',
    newArticleSubtitle: 'articles.new.subtitle',
    newArticleBody: 'articles.new.body',
    articlesList: 'articles.list',
    articlesIndex: 'articles.index',
    articlesApiSending: 'api.articles.sending'
  };

export default StoreClass.create({

  // atom

  atomAttr,

  atomInitial: [
    [atomAttr.articlesList, []],
    [atomAttr.articlesIndex, 0]
  ],

  createNewArticle (data) {},

  incArticlesIndex () {
    var articlesIndex = this.atomGet(atomAttr.articlesIndex);
    this.atomSet(atomAttr.articlesIndex, articlesIndex + 1);
  },

  init () {
    setTimeout(this.apiGetArticles.bind(this), 500);
  },

  apiGetArticles () {
    this.apiSend({
      method: 'GET',
      url: 'articles.json',
      reqData: {},
      atomPrefix: 'articles',
      atomAttr: atomAttr.articlesList,
      atomState: atomAttr.articlesApiSending,
      checkAfterCalling: {
        'articles[].title': ['isString', 'isNotEmpty']
      },
      parseAfterCalling: {
        'articles[].id': 'parseString'
      },
      onOk () {},
      onKo () {}
    });
  }

});
