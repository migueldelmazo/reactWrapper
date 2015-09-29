'use strict';

import React from 'react';
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
        ArticlesStore.atomAttr.newArticle
      ]
    }
  ],

  submitForm () {
    ArticlesStore.createNewArticle();
  },

  render () {
    window.vista=this;
    return (
      <div className='mdl-cell mdl-cell--2-col block'>
        <h4>New article</h4>
        <form onSubmit={this.onSubmitForm}>
          <label>

            {this.renderInputText({
              trigger: {
                fn: ArticlesStore.setNewArticleFields,
                key: ArticlesStore.atomAttr.newArticleTitle
              },
              val: this.atomGet(ArticlesStore.atomAttr.newArticleTitle),
              placeholder: 'title'
            })}

            {this.renderInputText({
              trigger: {
                fn: ArticlesStore.setNewArticleFields,
                key: ArticlesStore.atomAttr.newArticleSubtitle
              },
              val: this.atomGet(ArticlesStore.atomAttr.newArticleSubtitle),
              placeholder: 'subtitle'
            })}

            {this.renderTextarea({
              trigger: {
                fn: ArticlesStore.setNewArticleFields,
                key: ArticlesStore.atomAttr.newArticleBody
              },
              val: this.atomGet(ArticlesStore.atomAttr.newArticleBody),
              placeholder: 'body'
            })}

          </label>
          {this.renderSubmit({
            val: 'Send'
          })}
        </form>
      </div>
    );
  }
});
