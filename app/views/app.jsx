'use strict';

var React = require('react'),
  Grid = require('react-bootstrap/lib/Grid'),
  Col = require('react-bootstrap/lib/Col'),
  ApiAlert = require('./api-alert.jsx'),
  Home = require('./home.jsx'),
  Menu = require('./menu.jsx'),
  UserList = require('./userlist.jsx'),
  UserForm = require('./userform.jsx'),
  RouterComponent = require('../components/router.jsx');

module.exports = React.createClass({

  displayName: __filename,

  render () {
    return (
      <div>
        <ApiAlert />
        <Grid fluid>
          <Col md={2}>
            <Menu />
          </Col>
          <RouterComponent current='index'>
            <Col md={10}>
              <Home />
            </Col>
          </RouterComponent>
          <RouterComponent current='users' parent={{ name: 'users' }}>
            <Col md={6}>
              <UserList />
            </Col>
          </RouterComponent>
          <RouterComponent current='userAdd'>
            <Col md={4}>
              <UserForm />
            </Col>
          </RouterComponent>
          <RouterComponent current='userEdit'>
            <Col md={4}>
              <UserForm />
            </Col>
          </RouterComponent>
        </Grid>
      </div>
    );
  }

});

