var Article = require('../models/article');
var config = require('../config');

var request = require('request');
var Promise = require('bluebird');

function loadRecentArticles() {
  var requestAsync = Promise.promisify(request);
  return requestAsync(config.article.recent_url).then(function(response) {
    var articles = new Array();
    if (!response.err && response.statusCode == 200) {
      var ret = JSON.parse(response.body);
      if (ret.code == 0) {
        ret.data.forEach(function(item) {
          var article = new Article(item);
          articles.push(article);
        });
      }
    }
    return articles;
  });
}

module.exports = loadRecentArticles;