process.title = 'reactWrapper express';

var express = require('express'),
  crossdomain = require('./crossdomain'),
  app = express();

app.use(crossdomain);

app.all('/*', function (req, res) {
  setTimeout(function () {
    res.send({
      "users": [
        {
          "id": 1,
          "username": "John Doe",
          "email": "john.doe@gmail.com",
          "biography": "Lorem ipsum"
        },
        {
          "id": 2,
          "username": "John Smith",
          "email": "john.smith@gmail.com",
          "biography": "dolorem ipsum quia"
        }
      ]
    });
  }, 1000);
});

var server = app.listen(2999, function () {
  console.log('Express port:', server.address().port);
});
