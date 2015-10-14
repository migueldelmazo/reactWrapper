'use strict';

import _ from 'lodash';
import React from 'react';
import ArticlesStore from '../stores/articles';

export default React.createClass({

  displayName: __filename,

  initialState: { col: 4 },

  atom: {
    listeners: [ArticlesStore.atomAttr.articlesList]
  },

  // DOM events

  onClickFoo () {
    this.setState({ col: (this.state.col + 1) % 5 });
  },

  // render

  renderArticlesList () {
    return _.map(this.atomGet(ArticlesStore.atomAttr.articlesList), function (article, idx) {
      return (
        <div key={idx}>
          <h4>{article.title}</h4>
          <h5>{article.subtitle}</h5>
          <p>{article.title}</p>
        </div>
      );
    });
  },

  render () {
    return (
      <div className={'mdl-cell mdl-cell--' + (this.state.col + 1) + '-col block'} onClick={this.onClickFoo}>
        <h4>Articles: {this.props.text}</h4>
        {this.renderArticlesList()}
      </div>
    );
  }
});
