(function(window, document, undefined) {
  document.onreadystatechange = function() {
    if (document.readyState !== 'complete') {
      return;
    }

    var timer = null;

    function returnTop() {
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    }

    var hearts = [];
    window.requestAnimationFrame = (function() {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          setTimeout(callback, 1000 / 60);
        }
    })();
    init();

    function init() {
      css(".heart{z-index:9999;width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
      attachEvent();
      gameloop();
    }

    function gameloop() {
      for (var i = 0; i < hearts.length; i++) {
        if (hearts[i].alpha <= 0) {
          document.body.removeChild(hearts[i].el);
          hearts.splice(i, 1);
          continue;
        }
        hearts[i].y--;
        hearts[i].scale += 0.004;
        hearts[i].alpha -= 0.013;
        hearts[i].el.style.cssText = "left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i].alpha + ";transform:scale(" + hearts[i].scale + "," + hearts[i].scale + ") rotate(45deg);background:" + hearts[i].color;
      }
      requestAnimationFrame(gameloop);
    }

    /**
     * 给logo设置点击事件
     * 
     * - 回到顶部
     * - 出现爱心
     */
    function attachEvent() {
      var old = typeof window.onclick === "function" && window.onclick;
       document.getElementById("logo").onclick= function(event) {
         returnTop();
         old && old();
         createHeart(event);
      }
    }

    function createHeart(event) {
      var d = document.createElement("div");
      d.className = "heart";
      hearts.push({
        el: d,
        x: event.clientX - 5,
        y: event.clientY - 5,
        scale: 1,
        alpha: 1,
        color: randomColor()
      });
      document.body.appendChild(d);
    }

    function css(css) {
      var style = document.createElement("style");
      style.type = "text/css";
      try {
        style.appendChild(document.createTextNode(css));
      } catch (ex) {
        style.styleSheet.cssText = css;
      }
      document.getElementsByTagName('head')[0].appendChild(style);
    }

    function randomColor() {
      // return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
      return "#F44336";
    }

  };
})(window, document);


// A local search script with the help of [hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)
// Copyright (C) 2015 
// Joseph Pan <http://github.com/wzpan>
// Shuhao Mao <http://github.com/maoshuhao>
// This library is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation; either version 2.1 of the
// License, or (at your option) any later version.
// 
// This library is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
// 02110-1301 USA
// 
var searchFunc = function(path, search_id, content_id) {
  'use strict';
  $.ajax({
      url: path,
      dataType: "xml",
      success: function( xmlResponse ) {
          // get the contents from search data
          var datas = $( "entry", xmlResponse ).map(function() {
              return {
                  title: $( "title", this ).text(),
                  content: $("content",this).text(),
                  url: $( "url" , this).text()
              };
          }).get();

          var $input = document.getElementById(search_id);
    if (!$input) return;
          var $resultContent = document.getElementById(content_id);

          $input.addEventListener('input', function(){
              var str='<ul class=\"search-result-list\">';                
              var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
              $resultContent.innerHTML = "";
              if (this.value.trim().length <= 0) {
                  return;
              }
              // perform local searching
              datas.forEach(function(data) {
                  var isMatch = true;
                  var content_index = [];                                                       
                  if (!data.title || data.title.trim() === '') {
                      data.title = "Untitled";
                  }
                  var data_title = data.title.trim().toLowerCase();     
                  var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                  var data_url = data.url;
                  var index_title = -1;
                  var index_content = -1;
                  var first_occur = -1;
                  // only match artiles with not empty contents
                  if (data_content !== '') {
                      keywords.forEach(function(keyword, i) {
                          index_title = data_title.indexOf(keyword);
                          index_content = data_content.indexOf(keyword);

                          if( index_title < 0 && index_content < 0 ){
                              isMatch = false;
                          } else {
                              if (index_content < 0) {
                                  index_content = 0;
                              }
                              if (i == 0) {
                                  first_occur = index_content;
                              }
                              // content_index.push({index_content:index_content, keyword_len:keyword_len});
                          }
                      });
                  } else {
                      isMatch = false;
                  }
                  // show search results
                  if (isMatch) {
                      str += "<li><a href='"+ data_url +"' class='search-result-title'>"+ data_title +"</a>";
                      var content = data.content.trim().replace(/<[^>]+>/g,"");
                      if (first_occur >= 0) {
                          // cut out 100 characters
                          var start = first_occur - 20;
                          var end = first_occur + 80;

                          if(start < 0){
                              start = 0;
                          }

                          if(start == 0){
                              end = 100;
                          }

                          if(end > content.length){
                              end = content.length;
                          }

                          var match_content = content.substr(start, end); 

                          // highlight all keywords
                          keywords.forEach(function(keyword){
                              var regS = new RegExp(keyword, "gi");
                              match_content = match_content.replace(regS, "<em class=\"search-keyword\">"+keyword+"</em>");
                          });
                          
                          str += "<p class=\"search-result\">" + match_content +"...</p>"
                      }
                      str += "</li>";
                  }
              });
              str += "</ul>";
              $resultContent.innerHTML = str;
          });
      }
  });
}