'use strict';

var React = require('react'),
  Grid = require('react-bootstrap/lib/Grid'),
  Col = require('react-bootstrap/lib/Col'),
  ApiAlert = require('./api-alert.jsx'),
  Home = require('./home.jsx'),
  Menu = require('./menu.jsx'),
  UserList = require('./userlist.jsx'),
  UserFormState = require('./userform-state.jsx'),
  UserFormAtom = require('./userform-atom.jsx'),
  UserFormCtrl = require('./userform-ctrl.jsx'),
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
            <Col md={4}>
              <UserList />
            </Col>
          </RouterComponent>
          <RouterComponent current='userAdd'>
            <Col md={2}>
              <UserFormState />
            </Col>
          </RouterComponent>
          <RouterComponent current='userAdd'>
            <Col md={2}>
              <UserFormAtom />
            </Col>
          </RouterComponent>
          <RouterComponent current='userAdd'>
            <Col md={2}>
              <UserFormCtrl />
            </Col>
          </RouterComponent>
        </Grid>
      </div>
    );
  }

});

