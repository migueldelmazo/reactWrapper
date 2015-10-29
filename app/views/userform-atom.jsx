'use strict';

var React = require('react'),
  Semantik = require('semantik'),
  FormAtomMixin = require('../mixins/form-atom'),
  FormGroupMixin = require('../mixins/form-group'),
  UsersCtrl = require('../controllers/users');

module.exports = React.createClass({

  displayName: __filename,

  mixins: [FormAtomMixin, FormGroupMixin],

  atomListeners: [
    UsersCtrl.atomAttr.newUser,
    UsersCtrl.atomAttr.apiCreating
  ],

  validations: {
    username: {
      atomAttr: UsersCtrl.atomAttr.newUserUsername,
      fn: Semantik.isNotEmpty,
      msg: 'Please enter your username'
    },
    email: [
      {
       atomAttr: UsersCtrl.atomAttr.newUserEmail,
        fn: Semantik.isNotEmpty,
        msg: 'Please enter your email'
      },
      {
        atomAttr: UsersCtrl.atomAttr.newUserEmail,
        regex: Semantik.regex.isEmail,
        msg: 'Please enter a valid email'
      }
    ]
  },

  submitForm () {
    UsersCtrl.apiNewUserFromAtom();
  },

  isViewBlocked () {
    return UsersCtrl.apiIsCreating();
  },

  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <h2>User form: atom</h2>
          <form onSubmit={this.onEv(this.formOnSubmit)}>

            {this.fgText({
              label: '* Username:',
              atomAttr: UsersCtrl.atomAttr.newUserUsername,
              validationKey: 'username',
              placeholder: 'Username',
              size: 'lg'
            })}
            {this.fnValidation('username')}

            {this.fgText({
              label: '* Email:',
              atomAttr: UsersCtrl.atomAttr.newUserEmail,
              validationKey: 'email',
              placeholder: 'Email address'
            })}
            {this.fnValidation('email')}

            {this.fgTextarea({
              label: 'Biography:',
              atomAttr: UsersCtrl.atomAttr.newUserBiography,
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
