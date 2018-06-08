module.exports = (function() {
    var env = (process.env.NODE_ENV || 'production').toLowerCase(), config;
    var configName = 'config.' + env + '.js';
    try {
        config = require('./' + configName);
    } catch (err) {
        console.log("Cannot find configName " + configName + " config file!!!");
        process.exit(-1);
    }
    return {
        host: config.host,
        article: {
            list_url: config.article.list_url,
            recent_url: config.article.list_url + "?sortby=updated_at&order=desc&limit=10",
            getMetaApi: function(slug) {
                return config.article.meta_url.replace('{slug}', slug);
            },
            getContentApi: function(slug) {
                return config.article.content_url.replace('{slug}', slug);
            }
        },
        archives: {
            list_url: config.archives.list_url + "?_open=1&_with=articles"
        },
        oauth: {
            authorizeUrl: config.oauth.authorizeUrl,
            tokenUrl: config.oauth.tokenUrl,
            clientId: config.oauth.clientId,
            clientSecret: config.oauth.clientSecret,
            getCheckLoginApi: function(userId, token) {
                return config.oauth.check_login_url.replace('{userId}', userId).replace('{token}', token);
            },
        }
    };
})();