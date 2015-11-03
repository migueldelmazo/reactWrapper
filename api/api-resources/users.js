var _ = require('lodash');

var users = [
    {
      'id': 0,
      'username': 'John Doe',
      'email': 'john.doe@gmail.com',
      'biography': 'Lorem ipsum'
    },
    {
      'id': 1,
      'username': 'John Smith',
      'email': 'john.smith@gmail.com',
      'biography': 'dolorem ipsum quia'
    }
  ];

module.exports = [
  {
    method: 'get',
    route: '/users',
    handler: function (data) {
      return {
        body: {
          users: users
        }
      };
    }
  },
  {
    method: 'post',
    route: '/users',
    handler: function (data) {
      var body = _.clone(data.body);
      body.id = users.length;
      users.push(body);
      return {
        body: body
      };
    }
  }
]
