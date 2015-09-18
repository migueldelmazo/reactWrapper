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
      atom: [ArticlesStore.atomAttr.newArticleTitle]
    }
  ],

  submitForm () {
  },

  render () {
    return (
      <div className='mdl-cell mdl-cell--2-col block'>
        <h4>New article</h4>
        <form onSubmit={this.onSubmitForm}>
          <label>
            <span>Title:</span>

            {this.renderInputText({
              trigger: {
                fn: ArticlesStore.storeNewArticle,
                ctx: ArticlesStore,
                key: ArticlesStore.atomAttr.newArticleTitle
              },
              value: this.atomGet(ArticlesStore.atomAttr.newArticleTitle),
              placeholder: 'title'
            })}

            {this.renderValidation(ArticlesStore.validations.newArticleTitle)}

            {this.renderInputText({
              trigger: {
                fn: ArticlesStore.storeNewArticle,
                ctx: ArticlesStore,
                key: ArticlesStore.atomAttr.newArticleSubtitle
              },
              value: this.atomGet(ArticlesStore.atomAttr.newArticleSubtitle),
              placeholder: 'subtitle'
            })}

          </label>
          <label>
            <span>Body:</span>
            <textarea />
          </label>
          <button type='submit' className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Send</button>
        </form>
      </div>
    );
  }
});
