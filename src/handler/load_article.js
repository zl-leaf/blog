var Article = require('../models/article');
var config = require('../config/config.js');

var request = require('request');
var Promise = require('bluebird');

function loadArticle(year, month, slug) {
  var article;

  var requestAsync = Promise.promisify(request);
  var metaUrl = config.article.meta_url + slug;
  return requestAsync(metaUrl).then(function(response) {
    if (!response.err && response.statusCode == 200) {
      var ret = JSON.parse(response.body);
      if (ret.code == 0) {
        article = new Article(ret.data);
        return article;
      }
    }
  }).then(function (article) {
    var contentUrl = config.article.meta_url + slug + '/content';
    return requestAsync(contentUrl);
  }).then(function(response) {
    if (!response.err && response.statusCode == 200) {
      var ret = JSON.parse(response.body);
      if (ret.code == 0) {
        article.raw = ret.data.content;
        article.render();
      }
    }
    return article;
  });
}

module.exports = loadArticle;