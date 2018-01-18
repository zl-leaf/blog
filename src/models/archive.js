var moment = require('moment');
var Article = require('../models/article');

function Archive(data)
{
    this.title = data.title;
    if (data.date) {
        var date = moment(data.date);
        this.date = date.format('YYYY-MM-DD');
    }
    this.link = '/archives';
    this.articles = new Array();
    var _this = this;
    if (data.articles) {
        data.articles.forEach(function(articleData) {
            var article = new Article(articleData);
            _this.articles.push(article);
        });
    }

    this.archive_nodes = new Array();
    if (data.archive_nodes) {
        data.archive_nodes.forEach(function(archiveData) {
            var archiveNode = new Archive(archiveData);
            _this.archive_nodes.push(archiveNode);
        });
    }
}

module.exports = Archive;