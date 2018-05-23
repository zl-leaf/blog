var url = require('url');
var request = require('request');
var Promise = require('bluebird');
var querystring = require('querystring');

var config = require('../config/config');

function needLogin(path) {
  var preg = /\/editor/;
  return preg.test(path);
}

function getPathName(originalUrl) {
  return url.parse(originalUrl).pathname
}

function redirectLogin(req, res) {
  var query = querystring.stringify({
    client_id: config.oauth.clientId,
    redirect_uri: config.host + getPathName(req.originalUrl),
    response_type: 'code',
    scope: 'read',
  });
  var redirectUrl = config.oauth.authorizeUrl + '?' + query;
  res.redirect(redirectUrl);
  return;
}

// oauth登陆
function auth(req, res, next) {
  var code = req.query.code;
  var requestAsync = Promise.promisifyAll(request);

  if (!code) {
    redirectLogin(req, res);
    return;
  }

  return requestAsync.postAsync({
    url: config.oauth.tokenUrl,
    form: {
      client_id: config.oauth.clientId,
      client_secret: config.oauth.clientSecret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: config.host + getPathName(req.originalUrl),
    }
  }).then(function(response) {
    if (!response.err && response.statusCode == 200) {
      var ret = JSON.parse(response.body);
      return ret;
    } else {
      throw new Error("get token error.");
    }
  }).then(function(tokenRet) {
    var checkLoginUrl = config.oauth.checkLoginUrl + '?access_token=' + tokenRet.access_token;
    console.log(checkLoginUrl);
    return requestAsync.getAsync(checkLoginUrl)
  }).then(function(response) {
    if (!response.err && response.statusCode == 200) {
      var ret = JSON.parse(response.body);
      var user = {
        userName: ret.user_name,
      }
      req.session.user = user;
      return user;
    } else {
      throw new Error("check login error.");
    }
  }).then(function(user) {
    next();
  }).catch(function(e) {
    console.log(e);
    redirectLogin(req, res);
  });
}

module.exports = function(req, res, next) {
  var routePath = req.originalUrl;
  if (!needLogin(routePath)) {
    next();
    return;
  }

  if (req.session && req.session.user) {
    next();
    return;
  }

  auth(req, res, next);
}