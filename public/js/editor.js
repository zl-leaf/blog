import Config from "config";

$(function() {
  var Util = {
    getArticleContentUrl: function(articleId) {
      return Config.apiHost + '/api/editor/article/' + articleId;
    },
    getCreateUrl: function() {
      return Config.apiHost + '/api/editor/article/create';
    },
    getUpdateUrl: function(articleId) {
      return Config.apiHost + '/api/editor/article/' + articleId;
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
      $('#editormd textarea').text('```[T_T]\r\ntitle:\r\nslug:\r\n```\r\n---');
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
      $.ajax({
        url: Util.getArticleContentUrl(_this.articleId),
        type: 'get',
        dataType: 'json',
        success: function(ret) {
          if (ret.code == 0) {
            var article = ret.data;
            var content = article.content;

            _this.updateTitle(article.title);
            _this.editor.setValue(content.content);
          }
        }
      });
    },
    add: function() {
      this.articleId = 0;
      this.editor.setValue('```[T_T]\r\ntitle:\r\nslug:\r\n```\r\n---');
      this.updateTitle('新文章');
      console.log('add:' + this.articleId);
    },
    save: function() {
      var content = $('#editormd textarea').text();

      var url = '';
      if (this.articleId) {
        url = Util.getUpdateUrl(this.articleId);
      } else {
        url = Util.getCreateUrl();
      }
      $.ajax({
        url: url,
        type: 'post',
        data: {content: content},
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
    }
  }
  AritcleList.init();
  ArticleEditor.init();
});