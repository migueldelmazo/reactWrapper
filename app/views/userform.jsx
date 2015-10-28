'use strict';

var _ = require('lodash'),
  React = require('react'),
  Semantik = require('semantik'),
  FormMixin = require('../mixins/form'),
  FormGroupMixin = require('../mixins/form-group'),
  UsersCtrl = require('../controllers/users');

module.exports = React.createClass({

  displayName: __filename,

  mixins: [FormMixin, FormGroupMixin],

  atomListeners: [UsersCtrl.atomAttr.apiCreating],

  initialState: {
    username: '',
    email: 'info@migueldelmazo.com',
    biography: ''
  },

  validations: {
    username: {
      fn: Semantik.isNotEmpty,
      msg: 'Please enter your username'
    },
    email: [
      {
        fn: Semantik.isNotEmpty,
        msg: 'Please enter your email'
      },
      {
        regex: Semantik.regex.isEmail,
        msg: 'Please enter a valid email'
      }
    ]
  },

  submitForm () {
    UsersCtrl.apiNewUser(_.pick(this.state, ['username', 'email', 'biography']));
  },

  isFormProcessing () {
    return UsersCtrl.apiIsCreating();
  },

  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <h2>User form</h2>
          <form onSubmit={this.onEv(this.formOnSubmit)}>

            {this.fgText({
              label: '* Username:',
              key: 'username',
              val: this.state.username,
              placeholder: 'Username',
              size: 'lg'
            })}
            {this.fnValidation('username')}

            {this.fgText({
              label: '* Email:',
              key: 'email',
              val: this.state.email,
              placeholder: 'Email address'
            })}
            {this.fnValidation('email')}

            {this.fgTextarea({
              label: 'Biography:',
              key: 'biography',
              val: this.state.biography,
              placeholder: 'Biography',
              rows: 8
            })}

            {this.fgSubmit({
              value: 'Send',
              processingValue: 'Sending...',
              type: 'primary',
              size: 'lg'
            })}

          </form>
        </div>
      </div>
    );
  }

});
