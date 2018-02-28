import '../css/style.css';
import '../css/font-awesome.min.css';

window.onload = function() {
    document.getElementById('nav-search-btn').onclick = function() {
      var searchForm = document.getElementById('search-form-wrap');
      searchForm.style.right='0px';
      searchForm.style.opacity=1;
    }

    var navBtn = document.getElementById('main-nav-toggle');
    navBtn.onclick = function() {
      var isOpenNav = navBtn.getAttribute('open');
      navBtn.setAttribute('open', isOpenNav^1);
      var navLinkList = document.getElementsByClassName('main-nav-link');
      for (var i = navLinkList.length - 1; i >= 0; i--) {
        var navLink = navLinkList[i];
        if (isOpenNav == 1) {
          navLink.style.display = 'none';
        } else {
          navLink.style.display = 'block';
        }
      }
    }
}