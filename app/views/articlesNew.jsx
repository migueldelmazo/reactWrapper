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
      atom: [ArticlesStore.atomAttr.newArticleTitle, ArticlesStore.atomAttr.newArticleSubtitle, ArticlesStore.atomAttr.newArticleBody]
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

            {this.renderInputText({
              trigger: {
                fn: ArticlesStore.storeNewArticle,
                key: ArticlesStore.atomAttr.newArticleTitle
              },
              value: this.atomGet(ArticlesStore.atomAttr.newArticleTitle),
              placeholder: 'title'
            })}

            {this.renderInputText({
              trigger: {
                fn: ArticlesStore.storeNewArticle,
                key: ArticlesStore.atomAttr.newArticleSubtitle
              },
              value: this.atomGet(ArticlesStore.atomAttr.newArticleSubtitle),
              placeholder: 'subtitle'
            })}

            {this.renderTextarea({
              trigger: {
                fn: ArticlesStore.storeNewArticle,
                key: ArticlesStore.atomAttr.newArticleBody
              },
              value: this.atomGet(ArticlesStore.atomAttr.newArticleBody),
              placeholder: 'body'
            })}

          </label>
          <button type='submit' className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Send</button>
        </form>
      </div>
    );
  }
});
