'use strict';

var React = require('react'),
  ContentView = require('./content.jsx'),
  FooterView = require('./footer.jsx'),
  HeaderView = require('./header.jsx'),
  TestView = require('./test.jsx');

module.exports = React.createClass({

  displayName: __filename,

  render () {
    return (
      <div>
        <HeaderView />
        <ContentView />
        <FooterView />
        <TestView />
      </div>
    );
  }

});
