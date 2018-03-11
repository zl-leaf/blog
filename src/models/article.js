var marked = require('marked');
var moment = require('moment');
var config = require('../config/config.js');

var request = require('request');

function Article(data) {
    this.id = data.id;
    this.title = data.title;
    this.slug = data.slug;
    this.keywords = data.keywords;
    this.raw = data.raw;
    this.summary = data.summary;
    this.content = '';

    // link
    var date = moment(data.date);
    this.date = date.format('YYYY-MM-DD');
    this.link = '/article/' + date.format('YYYY') + '/' + date.format('MM') + '/' + data.slug + '.html';
}

Article.prototype.render = function() {
    this.content = marked(this.raw);
}

module.exports = Article;