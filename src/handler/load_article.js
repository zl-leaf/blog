var Article = require('../models/article');
var config = require('../config');

var request = require('request');
var Promise = require('bluebird');

function loadArticle(year, month, slug) {
  var article;

  var requestAsync = Promise.promisify(request);
  var metaUrl = config.article.getMetaApi(slug);
  return requestAsync(metaUrl).then(function(response) {
    if (!response.err && response.statusCode == 200) {
      var ret = JSON.parse(response.body);
      if (ret.code == 0) {
        article = new Article(ret.data);
        return article;
      }
    }
  }).then(function (article) {
    var contentUrl = config.article.getContentApi(slug);
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