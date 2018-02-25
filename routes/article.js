var express = require('express');
var router = express.Router();

var Promise = require('bluebird');

var loadArticle = require('../src/handler/load_article');
var loadRecentArchives = require('../src/handler/load_recent_archives');
var loadRecentArticles = require('../src/handler/load_recent_articles');

router.get('/:year/:month/:slug.html', function(req, res, next) {
  var year = req.params.year;
  var month = req.params.month;
  var slug = req.params.slug;

  Promise.props({
    article: loadArticle(year, month, slug),
    recentArchives: loadRecentArchives(),
    recentArticles: loadRecentArticles(),
  }).then(function(data) {
    var renderData = {
      tkd: {
        title: data.article.title,
        keywords: data.article.keywords,
      },
      article: data.article,
      recentArchives: data.recentArchives,
      recentArticles: data.recentArticles
    };
    res.render('article', renderData);
  });

});

module.exports = router;
