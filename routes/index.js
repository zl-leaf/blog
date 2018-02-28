var express = require('express');
var router = express.Router();

var Promise = require('bluebird');

var loadArticles = require('../src/handler/load_articles');
var loadRecentArchives = require('../src/handler/load_recent_archives');
var loadRecentArticles = require('../src/handler/load_recent_articles');

/* GET home page. */
router.get('/', function(req, res, next) {
  Promise.props({
    articles: loadArticles(),
    recentArticles: loadRecentArticles(),
  }).then(function(data) {
    res.render('index', { articles: data.articles, recentArticles: data.recentArticles});
  });
});

module.exports = router;
