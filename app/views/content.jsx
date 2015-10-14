'use strict';

var React = require('react'),
  ActiclesView = require('./articles.jsx'),
  ActiclesNewView = require('./articlesNew.jsx');

module.exports = React.createClass({

  displayName: __filename,

  render () {
    return (
      <div className='mdl-grid'>
        <ActiclesView text='news' />
        <ActiclesView text='info' />
        <ActiclesNewView />
      </div>
    );
  }
});
