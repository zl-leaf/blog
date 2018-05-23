var config = {
    host: "http://www.yipzale.me",
    article: {
        list_url: "http://api.yipzale.me/api/article",
        recent_url: "http://api.yipzale.me/api/article?sortby=updated_at&order=desc&limit=10",
        meta_url: "http://api.yipzale.me/api/article/"
    },
    archives: {
        list_url: "http://api.yipzale.me/api/archive?_open=1&_with=articles"
    },
    oauth: {
        authorizeUrl: "http://machinedog.yipzale.me:8080/oauth/authorize",
        tokenUrl: "http://machinedog:8080/oauth/token",
        checkLoginUrl: "http://machinedog:8080/users/check_login",
        clientId: "m1",
        clientSecret: "s1",
    }
}
module.exports = config;