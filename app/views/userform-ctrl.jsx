'use strict';

var React = require('react'),
  Semantik = require('semantik'),
  FormCtrlMixin = require('../mixins/form-ctrl'),
  FormGroupMixin = require('../mixins/form-group'),
  UsersCtrl = require('../controllers/users');

module.exports = React.createClass({

  displayName: __filename,

  mixins: [FormCtrlMixin, FormGroupMixin],

  atomListeners: [
    UsersCtrl.atomAttr.newUser,
    UsersCtrl.atomAttr.apiCreating
  ],

  validations: {
    username: {
      getValueCb: UsersCtrl.getNewUserField,
      fn: Semantik.isNotEmpty,
      msg: 'Please enter your username'
    },
    email: [
      {
        getValueCb: UsersCtrl.getNewUserField,
        fn: Semantik.isNotEmpty,
        msg: 'Please enter your email'
      },
      {
        getValueCb: UsersCtrl.getNewUserField,
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
          <h2>User form: ctrl</h2>
          <form onSubmit={this.onEv(this.formOnSubmit)}>

            {this.fgText({
              label: '* Username:',
              setValueCb: UsersCtrl.setNewUserField,
              setValueParams: { field: 'username' },
              getValueCb: UsersCtrl.getNewUserField,
              getValueParams: { field: 'username' },
              validationKey: 'username',
              placeholder: 'Username',
              size: 'lg'
            })}
            {this.fgValidation('username')}

            {this.fgText({
              label: '* Email:',
              setValueCb: UsersCtrl.setNewUserField,
              setValueParams: { field: 'email' },
              getValueCb: UsersCtrl.getNewUserField,
              getValueParams: { field: 'email' },
              validationKey: 'email',
              placeholder: 'Email address'
            })}
            {this.fgValidation('email')}

            {this.fgTextarea({
              label: 'Biography:',
              setValueCb: UsersCtrl.setNewUserField,
              setValueParams: { field: 'biography' },
              getValueCb: UsersCtrl.getNewUserField,
              getValueParams: { field: 'biography' },
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
