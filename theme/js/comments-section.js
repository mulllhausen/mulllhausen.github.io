var doneLoading=[];addEvent(window,"load",function(){foreach(siteGlobals.commentsPlatforms,function(b,a){addEvent(document.querySelector(".comment-with."+a.toLowerCase()),"click",function(c){renderComments(a)});addEvent(document.querySelector(".comment-with."+a.toLowerCase()+"+span"),"click",function(c){renderComments(a)})})});function renderComments(a){document.querySelector(".choose-comments-platform").style.marginBottom="30px";foreach(siteGlobals.commentsPlatforms,function(c,f){var d=document.querySelector(".comment-with."+f.toLowerCase());var e=document.querySelector("."+f.toLowerCase()+"-comments");if(a==f){e.style.display="block";d.classList.add("selected")}else{e.style.display="none";d.classList.remove("selected")}var b=document.querySelector("."+f.toLowerCase()+"-offline");b.style.display="none"});if(inArray(a,doneLoading)){return}window["load"+a+"Platform"]();doneLoading.push(a)}window.fbAsyncInit=function(){FB.init({appId:siteGlobals.facebookAppID,cookie:true,xfbml:true,version:"v3.0"});FB.AppEvents.logPageView();FB.Event.subscribe("xfbml.render",fbRendered);FB.Event.subscribe("comment.create",fbUpdateCommentCount);FB.Event.subscribe("comment.remove",fbUpdateCommentCount)};function loadFBPlatform(){document.querySelector(".fb-comments-loader").style.display="block";siteGlobals.fbCommentsLoadingTimer=setTimeout(fbOffline,15*1000);(function(e,a,f){var c,b=e.getElementsByTagName(a)[0];if(e.getElementById(f)){return}c=e.createElement(a);c.id=f;c.src="https://connect.facebook.net/en_US/sdk.js";b.parentNode.insertBefore(c,b)}(document,"script","facebook-jssdk"))}function fbOffline(){document.querySelector(".fb-offline").style.display="block";document.querySelector(".fb-comments-loader").style.display="none"}function fbRendered(a){clearTimeout(siteGlobals.fbCommentsLoadingTimer);document.querySelector(".fb-offline").style.display="none";document.querySelector(".fb-comments-loader").style.display="none"}function fbUpdateCommentCount(){ajax("https://graph.facebook.com/v2.1/"+encodeURIComponent(siteGlobals.siteURL+"/"+siteGlobals.article.url)+"?fields=share&method=get&pretty=0&sdk=joey&suppress_http_code=1",function(a){try{document.querySelector(".fb-comment-count").innerHTML=JSON.parse(a).share.comment_count}catch(b){}})}fbUpdateCommentCount();var disqus_config=function(){if(siteGlobals.siteURL!=""){this.page.url=siteGlobals.siteURL+"/"+siteGlobals.article.url}this.page.identifier=siteGlobals.article.title;this.page.sortOrder="newest";this.callbacks.onReady=[disqusReady];this.callbacks.onNewComment=[disqusCommentUpdated]};function loadDisqusPlatform(){document.querySelector(".disqus-comments").style.marginBottom="50px";siteGlobals.disqusCommentsLoadingTimer=setTimeout(disqusOffline,15*1000);(function(){var b=document,a=b.createElement("script");a.src="https://"+siteGlobals.disqusSiteName+".disqus.com/embed.js";a.setAttribute("data-timestamp",+new Date());(b.head||b.body).appendChild(a)})()}function disqusOffline(){document.querySelector(".disqus-offline").style.display="block"}function disqusCommentUpdated(a){DISQUSWIDGETS.getCount({reset:true})}function disqusReady(a){clearTimeout(siteGlobals.disqusCommentsLoadingTimer);document.querySelector(".disqus-offline").style.display="none";document.querySelector(".disqus-comments").style.marginBottom="0px"}function disqusUpdateCommentCount(){ajax("https://cors-anywhere.herokuapp.com/https://"+siteGlobals.disqusSiteName+".disqus.com/count-data.js?1="+encodeURIComponent(siteGlobals.article.title)+"&nocache="+unixtime(),function(a){try{var d=a.match(/DISQUSWIDGETS.displayCount\((.*)\)/i);var b=d[1];document.querySelector(".disqus-comment-count").innerHTML=JSON.parse(b).counts[0].comments}catch(c){}})}disqusUpdateCommentCount();