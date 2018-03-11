var express = require('express');
var router = express.Router();

var Promise = require('bluebird');

var loadEditorArticles = require('../src/handler/load_editor_articles');

router.get('/', function(req, res, next) {
  Promise.props({
    articles: loadEditorArticles(),
  }).then(function(data) {
    res.render('editor', { articles: data.articles});
  });

});

module.exports = router;
