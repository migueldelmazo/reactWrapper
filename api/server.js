process.title = 'reactWrapper express';

var express = require('express'),
  bodyParser = require('body-parser'),
  api = require('./api'),
  config = require('./config'),
  crossdomain = require('./crossdomain'),
  app = express();

app.use(crossdomain);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
api(app);

var server = app.listen(config.serverPort, function () {
  console.log('Express port:', server.address().port);
});
