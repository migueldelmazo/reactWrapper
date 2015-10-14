'use strict';

var _ = require('lodash'),
  React = require('react'),
  articlesStore = require('../stores/articles');

module.exports = React.createClass({

  displayName: __filename,

  initialState: { col: 4 },

  atom: {
    listeners: [articlesStore.atomAttr.articlesList]
  },

  // DOM events

  onClickFoo () {
    this.setState({ col: (this.state.col + 1) % 5 });
  },

  // render

  renderArticlesList () {
    return _.map(this.atomGet(articlesStore.atomAttr.articlesList), function (article, idx) {
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
