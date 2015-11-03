var _ = require('lodash'),
  fs = require('fs'),
  semantik = require('semantik'),
  config = require('./config');

var

  // get, require and check resources

  getResources = function (app) {
    fs.readdir(getResourcesDir(), function (err, files) {
      var resources;
      if (err) {
        console.log('api.js > getResources:', err);
      } else {
        resources = requireResources(files);
        resources = filterResources(resources);
        registerResources(resources, app);
        logResources(resources);
      }
    });
  },

  requireResources = function (files) {
    var resourcesDir = getResourcesDir();
    return _.flatten(_.map(files, function (file) {
      return require(resourcesDir + file);
    }));
  },

  getResourcesDir = function () {
    return __dirname + '/' + config.apiResourcesPath;
  },

  filterResources = function (resources) {
    return _.filter(resources, function (resource) {
      return checkResourceMethod(resource);
    });
  },

  checkResourceMethod = function (enpoint) {
    return ['get', 'post', 'put', 'delete'].indexOf(enpoint.method) >= 0;
  },

  registerResources = function (resources, app) {
    _.each(resources, function (resource) {
      app[resource.method](resource.route, requestHandler.bind(null, resource));
    });
  },

  // handler resquest

  requestHandler = function (resource, req, res, next) {
    var data = getRequestData(resource, req),
      response;
    if (checkRequestData(resource, data)) {
      data = parseRequestData(resource, data);
      response = responseHandler(resource, data);
    } else {
      response = badRequest(resource, data);
    }
    parseResponse(response);
    setTimeout(function () {
      res.status(response.status).send(response.body);
      logRequest(resource, data, response);
    }, 1000);
  },

  getRequestData = function (resource, req) {
    return {
      body: req.body,
      cookies: req.cookies,
      params: req.params,
      query: req.query
    };
  },

  checkRequestData = function (resource, data) {
    var checkRequestData = resource.checkRequestData;
    if (_.isFunction(checkRequestData)) {
      return checkRequestData(data);
    } else if (_.isPlainObject(checkRequestData)) {
      return semantik.validate(data, checkRequestData);
    } else {
      return true;
    }
  },

  parseRequestData = function (resource, data) {
    var parseRequestData = resource.parseRequestData;
    if (_.isFunction(parseRequestData)) {
      return parseRequestData(data);
    } else if (_.isPlainObject(parseRequestData)) {
      return semantik.parse(data, parseRequestData);
    } else {
      return data;
    }
  },

  // handler response

  responseHandler = function (resource, data) {
    return _.isFunction(resource.handler) ? resource.handler(data) : {};
  },

  badRequest = function (resource, data) {
    return _.isFunction(resource.badRequest) ? resource.badRequest(data) : {
      body: { errorCode: 'BAD_REQUEST' },
      status: 400
    };
  },

  parseResponse = function (response) {
    _.defaults(response, {
      body: {},
      status: 200
    });
  },

  // log

  logResources = function (resources) {
    console.log('API resources:', getResourcesDir());
    _.each(resources, function (resource) {
      console.log(' - ' + logGetResource(resource));
    });
  }

  logRequest = function (resource, data, response) {
    console.log('API request:', logGetResource(resource));
    console.log(' - data:', data);
    console.log(' - response:', response, '\n');
  },

  logGetResource = function (resource) {
    return resource.method.toUpperCase() + resource.route;
  };

var APP;

module.exports = function (app) {
  APP = app;
  getResources(app);
}
