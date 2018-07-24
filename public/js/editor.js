var Config = require('config');

$(function() {
  var Util = {
    getArticleUrl: function(articleId) {
      return Config.apiHost + '/blog/articles/' + articleId + "?_with=content";
    },
    getCreateUrl: function(openId, token) {
      return Config.apiHost + '/blog/articles?openId=' + openId + '&access_token=' + token;
    },
    getUpdateUrl: function(articleId, openId, token) {
      return Config.apiHost + '/blog/articles/' + articleId + '?openId=' + openId + '&access_token=' + token;
    }
  }
  var AritcleList = {
    init: function() {
      $('.article-btn').click(function() {
        var articleId = $(this).attr('article-id');
        ArticleEditor.renderArticle(articleId);
      });
    }
  }

  var ArticleEditor = {
    editor: null,
    articleId: 0,
    init: function() {
      $('#editormd textarea').text(this.articleToContent());
      this.editor = editormd("editormd", {
        path : "/lib/editor.md/lib/",
        toolbarIcons: "simple",
        height: "600px"
      });

      var _this = this;
      $('#save-btn').click(function() {
        _this.save();
      });
      $('#publish-btn').click(function() {
        _this.publish();
      });

      $('#add-btn').click(function() {
        _this.add();
      });
    },
    updateTitle: function(title) {
      $('#article-title').text(title);
    },
    renderArticle: function(articleId) {
      this.articleId = articleId;
      var _this = this;

      var metaUrl = Util.getArticleUrl(_this.articleId);

      $.ajax({
        url: metaUrl,
        type: 'get',
        dataType: 'json',
        success: function(ret) {
          if (ret.code == 0) {
            var article = ret.data;
            var content = article.content;

            _this.updateTitle(article.title);
            _this.editor.setValue(_this.articleToContent(article));
          }
        }
      });
    },
    add: function() {
      this.articleId = 0;
      this.editor.setValue(this.articleToContent());
      this.updateTitle('新文章');
      console.log('add:' + this.articleId);
    },
    save: function() {
      var content = $('#editormd textarea').text();

      var url = '';
      var openId = $.cookie('openId');
      var token = $.cookie('access_token');
      if (!openId || !token) {
        alert('auth error');
        return;
      }
      if (this.articleId) {
        url = Util.getUpdateUrl(this.articleId, openId, token);
      } else {
        url = Util.getCreateUrl(openId, token);
      }
      var article = this.contentToArticle(content);
      var articleJson = JSON.stringify(article);
      $.ajax({
        url: url,
        type: 'post',
        data: articleJson,
        contentType: 'application/json',
        dataType: 'json',
        success: function(ret) {
          if (ret.code != 0) {
            alert(ret.msg);
          }
        }
      });
    },
    publish: function() {
      console.log('publish:' + this.articleId);
    },
    // article对象转化
    articleToContent(article) {
      var ret = "```[T_T]\r\n";
      var articleAttr = new Array('title', 'slug', 'date', 'keywords', 'summary');
      for (index in articleAttr) {
        var attribute = articleAttr[index];
        var data = '';
        if (article && article[attribute]) {
          data = article[attribute];
        }
        ret += attribute + ":" + data + '\r\n';
      }
      ret += "\r\n```\r\n---\r\n";
      if (article && article.content.content) {
        ret += article.content.content;
      }
      return ret;
    },
    contentToArticle(content) {
      var ret = new Object();
      var pregRet = new RegExp('```\\[T_T]\\s+(?<meta>.*)```\\s+---\\s+(?<content>.*)', 's').exec(content);
      if (!pregRet) {
        console.log('error');
        return false;
      }
      var meta = pregRet.groups.meta;
      var articleContent = pregRet.groups.content;
      ret.content = new Object();
      ret.content.content = articleContent;
      // 遍历meta中的属性
      var metaRegExp = new RegExp('(?<name>\\w+?)\:(?<val>.*)', 'g');
      while ((metaPregRet = metaRegExp.exec(meta)) != null) {
        var name = metaPregRet.groups.name;
        var val = metaPregRet.groups.val;
        ret[name] = val;
      }
      return ret;
    }
  }
  AritcleList.init();
  ArticleEditor.init();
});