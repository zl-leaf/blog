var express = require('express');
var router = express.Router();

var Promise = require('bluebird');

var loadArchives = require('../src/handler/load_archives');
var loadRecentArchives = require('../src/handler/load_recent_archives');
var loadRecentArticles = require('../src/handler/load_recent_articles');

router.get('/', function(req, res, next) {

  Promise.props({
    archives: loadArchives(),
    recentArticles: loadRecentArticles(),
  }).then(function(data) {
    res.render('archives', { archives: data.archives, recentArticles: data.recentArticles});
  });
});

module.exports = router;
