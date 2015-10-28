'use strict';

var _ = require('lodash'),
  React = require('react'),
  Router = require('../lib/router'),
  UsersCtrl = require('../controllers/users');

module.exports = React.createClass({

  displayName: __filename,

  atomListeners: [UsersCtrl.atomAttr.list],

  renderList () {
    return _.map(UsersCtrl.getList(), function (user) {
      return (
        <li key={user.id}>
          <h4>{user.username}</h4>
          <p>{user.email}</p>
          <p>{user.biography}</p>
          <a href={Router.getUrl('userEdit', { user: user.id } )}>
            <span className='glyphicon glyphicon-pencil' aria-hidden='true' />
          </a>
        </li>
      );
    });
  },

  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <h2>Users list</h2>
          <ul>
            {this.renderList()}
          </ul>
        </div>
      </div>
    );
  }

});
