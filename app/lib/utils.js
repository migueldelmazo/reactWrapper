'use strict';

export default {

  regex: {
    isNotEmpty: /([^\s])/,
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    isEmail: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    // http://web.ontuts.com/snippets/10-expresiones-regulares-imprescindibles-en-desarrollo-web/
    isStrongPassword: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
  }

};
