'use strict';

import _ from 'lodash';
import React from 'react';
import Util from '../lib/util';
import FormMixin from '../lib/form';
import ValidationsMixin from '../lib/validations';
import ArticlesStore from '../stores/articles';

export default React.createClass({

  displayName: __filename,

  mixins: [FormMixin, ValidationsMixin],

  atomListener: [
    {
      atom: [
        ArticlesStore.atomAttr.newArticleTitle,
        ArticlesStore.atomAttr.newArticleSubtitle,
        ArticlesStore.atomAttr.newArticleBody,
        ArticlesStore.atomAttr.newArticle,
        ArticlesStore.atomAttr.articlesIndex
      ]
    }
  ],

  initialState: {
    title: '',
    subtitle: ''
  },

  submitForm () {
    ArticlesStore.createNewArticle(_.pick(this.state, ['title', 'subtitle', 'body']));
  },

  validations: {
    title: {
      regex: Util.regex.isNotEmpty,
      msg: 'epic fail',
      wrapperClassName: 'lolo',
      itemClassName: 'item'
    },
    subtitle: {
      regex: Util.regex.isNotEmpty,
      msg: 'epic fail',
      wrapperClassName: 'lolo',
      itemClassName: 'item'
    }
  },

  render () {
    window.vista = this;
    return (
      <div className='mdl-cell mdl-cell--2-col block'>
        <h4>New article</h4>
        <form onSubmit={this.onEv(this.formOnSubmit)}>
          <label>

            {this.formRenderText({
              key: 'title',
              val: this.state.title,
              placeholder: 'Title'
            })}
            {this.validationRender('title')}

            {this.formRenderText({
              key: 'subtitle',
              val: this.state.subtitle,
              placeholder: 'Subtitle'
            })}
            {this.validationRender('subtitle')}

            {this.formRenderTextarea({
              key: 'body',
              val: this.state.body,
              placeholder: 'Body'
            })}

          </label>
          {this.formRenderSubmit({
            val: 'Send'
          })}
        </form>

        <p onClick={this.onEv(ArticlesStore.incArticlesIndex)}>
          Incr:
          {this.atomGet(ArticlesStore.atomAttr.articlesIndex)}
        </p>

      </div>
    );
  }
});
