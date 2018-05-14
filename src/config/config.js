var config = {
    article: {
        list_url: "http://api.yipzale.me/api/article",
        recent_url: "http://api.yipzale.me/api/article?sortby=updated_at&order=desc&limit=10",
        meta_url: "http://api.yipzale.me/api/article/"
    },
    archives: {
        list_url: "http://api.yipzale.me/api/archive?_open=1&_with=articles"
    }
}
module.exports = config;