process.title = 'reactWrapper express';

var express = require('express'),
  crossdomain = require('./crossdomain'),
  app = express();

app.use(crossdomain);

app.all('/*', function (req, res) {
  res.send({});
});

var server = app.listen(2999, function () {
  console.log('Express port:', server.address().port);
});
