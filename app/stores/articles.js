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

  createNewArticle (data) {
    console.log(data);
  },

  incArticlesIndex () {
    var articlesIndex = this.atomGet(atomAttr.articlesIndex);
    this.atomSet(atomAttr.articlesIndex, articlesIndex + 1);
  },

  init () {
    setTimeout(function () {
      this.apiSend({
        method: 'get',
        url: 'articles',
        reqData: {},
        resSufix: 'articles',
        atomAttr: atomAttr.articlesList,
        atomState: atomAttr.articlesApiSending,
        checkInReturn: {
          'articles[].id': 'isId',
          'articles[].title': ['isString', 'isNotEmpty'],
          'articles[].subtitle': 'isString',
          'articles[].body': 'isString'
        },
        parseInReturn: {
          'articles[].id': 'parseId',
          'articles[].title': 'parseString',
          'articles[].subtitle': 'parseString',
          'articles[].body': 'parseString'
        },
        onOk: function () {},
        onKo: function () {}
      });
    }.bind(this), 250);
  }

});
