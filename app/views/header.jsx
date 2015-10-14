'use strict';

var React = require('react'),
  router = require('router');

module.exports = React.createClass({

  displayName: __filename,

  render () {
    return (
      <div className='mdl-grid header'>
        <div className='mdl-cell mdl-cell--2-col block'>
          <h4>react wrapper</h4>
        </div>
        <div className='mdl-cell mdl-cell--7-col block nav'>
          <h4>Navigation</h4>
          <ul className='nav'>
            <li>
              <a href={router.getUrl('index')}>index</a>
            </li>
            <li>
              <a href={router.getUrl('addresses')}>addresses</a>
            </li>
            <li>
              <a href={router.getUrl('addressAdd')}>addressAdd</a>
            </li>
            <li>
              <a href={router.getUrl('addressAddAll')}>addressAddAll</a>
            </li>
            <li>
              <a href={router.getUrl('addressUser', { user: 123 })}>addressUser</a>
            </li>
            <li>
              <a href={router.getUrl('addressId', { user: 123, id: 321 })}>addressId</a>
            </li>
            <li>
              <a href={router.getUrl('payments')}>payments</a>
            </li>
          </ul>
        </div>
        <div className='mdl-cell mdl-cell--2-col block'>
          <h4>Search</h4>
        </div>
        <div className='mdl-cell mdl-cell--1-col block'>
          <h4>User</h4>
        </div>
      </div>
    );
  }

});
