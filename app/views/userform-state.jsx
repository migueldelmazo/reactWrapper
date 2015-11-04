'use strict';

var _ = require('lodash'),
  React = require('react'),
  Semantik = require('semantik'),
  FormStateMixin = require('../mixins/form-state'),
  FormGroupMixin = require('../mixins/form-group'),
  UsersCtrl = require('../controllers/users');

module.exports = React.createClass({

  displayName: __filename,

  mixins: [FormStateMixin, FormGroupMixin],

  atomListeners: [UsersCtrl.atomAttr.apiCreating],

  initialState: {
    username: '',
    email: '',
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
    UsersCtrl.apiNewUserFromState(_.pick(this.state, ['username', 'email', 'biography']));
  },

  isViewBlocked () {
    return UsersCtrl.apiIsCreating();
  },

  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <h2>User form: state</h2>
          <form onSubmit={this.onEv(this.formOnSubmit)}>

            {this.fgText({
              label: '* Username:',
              key: 'username',
              val: this.state.username,
              placeholder: 'Username',
              size: 'lg'
            })}
            {this.fgValidation('username')}

            {this.fgText({
              label: '* Email:',
              key: 'email',
              val: this.state.email,
              placeholder: 'Email address'
            })}
            {this.fgValidation('email')}

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
              processingState: UsersCtrl.apiIsCreating(),
              type: 'primary',
              size: 'lg'
            })}

          </form>
        </div>
      </div>
    );
  }

});
