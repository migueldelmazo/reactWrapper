'use strict';

var React = require('react'),
  Router = require('../lib/router');

module.exports = React.createClass({

  displayName: __filename,

  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <h2>Menu</h2>
          <ul>
            <li>
              <a href={Router.getUrl('index')}>Home</a>
            </li>
            <li>
              <a href={Router.getUrl('users')}>User list</a>
            </li>
            <li>
              <a href={Router.getUrl('userAdd')}>Add user</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

});
