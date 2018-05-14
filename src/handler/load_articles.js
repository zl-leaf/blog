var config = require('../config/config.js');
var Article = require('../models/article');

var request = require('request');
var Promise = require('bluebird');

function loadArticles(page, rows) {
  var requestAsync = Promise.promisify(request);
  return requestAsync(config.article.list_url + "?sortby=date&order=desc").then(function(response) {
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
module.exports = loadArticles;