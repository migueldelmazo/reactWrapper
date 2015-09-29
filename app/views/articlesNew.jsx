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
    window.vista = this;
    return (
      <div className='mdl-cell mdl-cell--2-col block'>
        <h4>New article</h4>
        <form onSubmit={this.onSubmitForm}>
          <label>

            {this.renderInputText({
              key: 'title',
              val: this.state.title,
              placeholder: 'Title'
            })}

            {this.renderInputText({
              key: 'subtitle',
              val: this.state.subtitle,
              placeholder: 'Subtitle'
            })}

            {this.renderTextarea({
              key: 'body',
              val: this.state.body,
              placeholder: 'Body'
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
