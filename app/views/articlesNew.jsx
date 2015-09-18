'use strict';

import React from 'react';
import FormUtils from '../lib/form';
import ArticlesStore from '../stores/articles';

export default React.createClass({

  displayName: __filename,

  mixins: [FormUtils],

  submitForm () {
  },

  render () {
    return (
      <div className='mdl-cell mdl-cell--2-col block'>
        <h4>New article</h4>
        <form onSubmit={this.onSubmitForm}>
          <label>
            <span>Title:</span>
            {this.getInputText({
              fn: ArticlesStore.setTitle,
              placeholder: 'title'
            })}
            {this.getInputText({
              fn: ArticlesStore.setTitle,
              key: 'subtitle',
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
