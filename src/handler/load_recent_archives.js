var config = require('../config');
var Archive = require('../models/archive');

var request = require('request');
var Promise = require('bluebird');

function loadRecentArchives() {
  var requestAsync = Promise.promisify(request);
  return requestAsync(config.archives.recent_url).then(function(response) {
    var archives = new Array();
    if (!response.err && response.statusCode == 200) {
      var ret = JSON.parse(response.body);
      if (ret.code == 0) {
        ret.data.forEach(function(item) {
          var archive = new Archive(item);
          archives.push(archive);
        });
      }
    }
    return archives;
  });
}

module.exports = loadRecentArchives;