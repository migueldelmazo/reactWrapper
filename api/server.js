process.title = 'reactWrapper express';

var express = require('express'),
  crossdomain = require('./crossdomain'),
  app = express();

app.use(crossdomain);

app.all('/*', function (req, res) {
  setTimeout(function () {
    res.send({
      "articles": [
        {
          "id": 1,
          "title": "Título 1",
          "subtitle": "Subtítulo 1",
          "body": "Cuerpo 1"
        },
        {
          "id": 2,
          "title": "Título 2",
          "subtitle": "Subtítulo 2",
          "body": "Cuerpo 2"
        }
      ]
    });
  }, 1000);
});

var server = app.listen(2999, function () {
  console.log('Express port:', server.address().port);
});
