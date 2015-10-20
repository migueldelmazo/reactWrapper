'use strict';

var _ = require('lodash'),
  React = require('react'),
  semantik = require('semantik'),
  formMixin = require('../mixins/form'),
  validationsMixin = require('../mixins/validations'),
  articlesStore = require('../stores/articles');

module.exports = React.createClass({

  displayName: __filename,

  mixins: [formMixin, validationsMixin],

  atom: {
    listeners: [
      articlesStore.atomAttr.newArticleTitle,
      articlesStore.atomAttr.newArticleSubtitle,
      articlesStore.atomAttr.newArticleBody,
      articlesStore.atomAttr.newArticle,
      articlesStore.atomAttr.articlesIndex
    ]
  },

  initialState: {
    title: '',
    subtitle: ''
  },

  submitForm () {
    articlesStore.createNewArticle(_.pick(this.state, ['title', 'subtitle', 'body']));
  },

  validations: {
    title: {
      fn: semantik.isNotEmpty,
      msg: 'epic fail',
      wrapperClassName: 'lolo',
      itemClassName: 'item'
    },
    subtitle: {
      fn: semantik.isNotEmpty,
      msg: 'epic fail',
      wrapperClassName: 'lolo',
      itemClassName: 'item'
    }
  },

  render () {
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

        <p onClick={this.onEv(articlesStore.incArticlesIndex)}>
          Incr:
          {this.atomGet(articlesStore.atomAttr.articlesIndex)}
        </p>

      </div>
    );
  }
});
