initialMediaData=[];completeMediaSearch=[];completeMediaSearchIDs=[];completeMediaData=[];searchResultIndexes=[];numTotalMedia=0;numMediaShowing=0;pageSize=10;currentlySearching=false;reviewsPerAd=3;inFeedAdContainer='<div class="in-feed-ad-container"></div>';addEvent(window,"load",function(){resetSearchBox();initMediaRendering();initMediaSearchList(initSearchResultIndexes);initCompleteMediaData(initSearchResultIndexes);addEvent(document.getElementById("search"),"keyup",debounce(debounceMediaSearch,2000,"both"));addEvent(document.getElementById("sortBy"),"change",mediaSortChanged);addEvent(document.getElementById("reviewsArea"),"click",loadFullReview);addEvent(document.getElementById("reviewsArea"),"click",linkTo1Media);var b=0;var a=false;addEvent(window,"scroll",function(c){b=window.scrollY;if(a){return}setTimeout(function(){positionMediaCounter();infiniteLoader();a=false},200);a=true})});function resetSearchBox(){document.getElementById("search").value="";document.getElementById("sortBy").selectedIndex=0}function initMediaRendering(){var e="";var d=getMediaIDFromURL();var c=siteGlobals.mediaType+"-reviews/";if(d!=null){if((typeof window.history.replaceState=="function")&&(window.location.hash.length>0)){window.history.replaceState(null,"",generateCleanURL(c+d+"/"))}var b=false;var g=false;var a=function(){if((e!="")&&(numTotalMedia!=0)){return}var m=false;if((initialMediaData.length!=0)&&!b){b=true;var l=true;for(var j=0;j<initialMediaData.length;j++){if(d!=getMediaID(initialMediaData[j])){continue}e=generateMediaHTML(initialMediaData[j],l);m=true;break}if(e==""){return}e+=generateInitialMediaHTML(d,m);numMediaShowing=initialMediaData.length;loading("off");removeGlassCase("searchBox",true);archiveInFeedAds();document.getElementById("reviewsArea").innerHTML=e;populateInFeedAds()}if(completeMediaSearch.length!=0){var k=mediaID2Index(d);if(!g){g=true;numTotalMedia=completeMediaSearch.length;if(k===null){if(typeof window.history.replaceState=="function"){window.history.replaceState(null,"",generateCleanURL(c));initMediaRendering()}else{location.href=generateCleanURL(c)}return}}}if((e=="")&&(initialMediaData.length!=0)&&(completeMediaSearch.length!=0)&&(completeMediaData.length!=0)){var h=completeMediaData[k];var l=true;e=generateMediaHTML(h,l);var m=false;e+=generateInitialMediaHTML(d,m);loading("off");removeGlassCase("searchBox",true);archiveInFeedAds();document.getElementById("reviewsArea").innerHTML=e;numMediaShowing=initialMediaData.length;populateInFeedAds()}if((numTotalMedia!=0)&&(numMediaShowing!=0)){renderMediaCount()}};initInitialMediaData(a);initMediaSearchList(a);initCompleteMediaData(a)}else{var f=function(){if(initialMediaData.length!=0&&e==""){e=generateInitialMediaHTML();loading("off");removeGlassCase("searchBox",true);archiveInFeedAds();document.getElementById("reviewsArea").innerHTML=e;populateInFeedAds()}if(completeMediaSearch.length==0||initialMediaData.length==0){return}numMediaShowing=initialMediaData.length;numTotalMedia=completeMediaSearch.length;currentlySearching=false;renderMediaCount()};initMediaSearchList(f);initInitialMediaData(f)}}var gettingInitialMediaData=false;function initInitialMediaData(a){if(initialMediaData.length>0){return a()}addEvent(document,"got-initial-media-data",a);if(gettingInitialMediaData){return}gettingInitialMediaData=true;ajax(siteGlobals.mediaInitListJSON,function(b){try{initialMediaData=JSON.parse(b);triggerEvent(document,"got-initial-media-data")}catch(c){console.log("error in initInitialMediaData function: "+c);gettingInitialMediaData=false}})}function linkTo1Media(b){stopBubble(b);b.preventDefault();var a=b.target;if((a.tagName.toLowerCase()=="a")&&inArray("link-external",a.className)){location.href=a.href;return false}if((a.tagName.toLowerCase()=="i")&&(a.parentNode.tagName.toLowerCase()=="a")&&inArray("link-to-other-media",a.parentNode.className)){return goToOtherMedia(a.parentNode.href)}if((a.tagName.toLowerCase()=="a")&&inArray("link-to-other-media",a.className)){return goToOtherMedia(a.href)}if((a.tagName.toLowerCase()=="a")&&inArray("link-to-self",a.className)){return linkToSelf(a.parentNode)}if((a.tagName.toLowerCase()=="svg")&&inArray("icon-chain",a.outerHTML)){return linkToSelf(a.up(2))}if((a.tagName.toLowerCase()=="use")&&inArray("icon-chain",a.outerHTML)){return linkToSelf(a.up(3))}}function goToOtherMedia(a){if(typeof window.history.replaceState=="function"){window.history.replaceState(null,"",generateCleanURL(a));scrollToElement(document.getElementById("searchBox"));initMediaRendering()}else{location.href=generateCleanURL(a)}return false}function linkToSelf(b){currentlySearching=false;foreach(document.querySelectorAll(".media.pinned"),function(d,c){removeCSSClass(c,"pinned")});addCSSClass(b,"pinned");if(typeof window.history.replaceState=="function"){var a=siteGlobals.mediaType+"-reviews/"+b.id+"/";window.history.replaceState(null,"",generateCleanURL(a))}else{window.location.hash="#!"+b.id}return false}var loadingStatus="on";function loading(a){switch(a){case"on":document.getElementById("mediaLoaderArea").style.display="block";loadingStatus="on";break;case"off":document.getElementById("mediaLoaderArea").style.display="none";loadingStatus="off";break}}function generateInitialMediaHTML(f,e){var b=0;var h=initialMediaData.length;if(f!=null){b++;if(!e){h--}}var g="";var d=false;for(var c=0;c<h;c++){var a=false;if((f!=null)&&!d&&(getMediaID(initialMediaData[c])==f)){d=true;a=true}if(!a){g+=generateMediaHTML(initialMediaData[c])}if(((b+1)%reviewsPerAd)==0){g+=inFeedAdContainer}if(!a){b++}}return g}function generateMediaHTML(e,i){var f=getMediaID(e);i=i?" pinned":"";var c=getRenderedTitle(e);var b="";if(e.spoilers){b=' style="color:red;"'}var d='<button class="load-review" id="load-'+f+'">load review</button><br><span class="review-explanation"'+b+">(this review "+(e.spoilers?"contains":"has no")+" spoilers)</span>";var h="";if(e.hasOwnProperty("review")){h=formatReview(e.review)}else{h=d}var j=siteGlobals.siteURL+"/img/"+generateThumbnailBasename(siteGlobals.mediaType,f,"thumb")+".jpg?hash="+e.thumbnailHash;var g="https://";switch(siteGlobals.mediaType){case"book":g+="www.goodreads.com/book/show/"+e.goodreadsID;break;case"movie":case"tv-series":g+="www.imdb.com/title/"+e.IMDBID;break}var a=generateCleanURL(siteGlobals.mediaType+"-reviews/"+f+"/");return'<div class="media'+i+'" id="'+f+'"><a class="link-to-self chain-link" href="'+a+'" title="right click and copy link for the URL of this '+siteGlobals.mediaType+' review"><svg class="icon icon-chain"><use xlink:href="'+siteGlobals.iconsSVGURL+'#icon-chain"></use></svg></a><div class="thumbnail-and-stars"><img src="'+j+'" alt="'+e.title+" "+siteGlobals.mediaType+' thumbnail"><div class="stars">'+generateMediaStarsHTML(e.rating)+'</div></div><a href="'+g+'"><h3 class="media-title">'+c+'</h3></a><h4 class="review-title">'+e.reviewTitle+'</h4><div class="review-text">'+h+"</div></div>"}function generateThumbnailBasename(a,c,b){switch(b){case"original":case"larger":case"thumb":return a+"-"+b+"-"+c;default:throw"bad state"}}function loadFullReview(d){if(d.target.tagName.toLowerCase()!="button"||typeof d.target.className!="string"||!inArray("load-review",d.target.className)){return}var c=d.target.id.replace("load-","");foreach(document.querySelectorAll(".media.pinned"),function(f,e){if(e.id==c){return}removeCSSClass(e,"pinned")});if(typeof window.history.replaceState=="function"){var a=siteGlobals.mediaType+"-reviews/";window.history.replaceState(null,"",generateCleanURL(a))}else{window.location.hash=""}var b=mediaID2Index(c);if(completeMediaData[b].hasOwnProperty("review")){d.target.parentNode.innerHTML=formatReview(completeMediaData[b].review);return}ajax("/json/"+siteGlobals.mediaType+"-review-"+c+".json?hash="+completeMediaData[b].reviewHash,function(e){try{var g=JSON.parse(e).reviewFull;d.target.parentNode.innerHTML=formatReview(g);completeMediaData[b].review=g}catch(f){console.log("error in loadFullReview function: "+f)}})}function formatReview(a){a=a.replace(/##siteGlobals.siteURL##/g,siteGlobals.siteURL);if(inArray("<p>",a)){return a}return"<p>"+a.replace(/\n/g,"</p><p>")+"</p>"}function generateMediaStarsHTML(a){var c="";for(var b=1;b<=5;b++){if(b<=a){c+='<svg class="icon some-star icon-star"><use xlink:href="'+siteGlobals.iconsSVGURL+'#icon-star"></use></svg>'}else{if((b-1)<a){c+='<svg class="icon some-star icon-star-half-empty"><use xlink:href="'+siteGlobals.iconsSVGURL+'#icon-star-half-empty"></use></svg>'}else{c+='<svg class="icon some-star icon-star-o"><use xlink:href="'+siteGlobals.iconsSVGURL+'#icon-star-o"></use></svg>'}}}return c}function highlightSearch(a,b){foreach(a,function(d,c){var e=new RegExp("("+c+")","i");b=b.replace(e,"<u>$1</u>")});return b}function renderMediaCount(){if(numTotalMedia==0){document.getElementById("xOfYMediaCount").style.display="none";document.getElementById("noMediaCount").style.display="inline"}else{document.getElementById("noMediaCount").style.display="none";document.getElementById("xOfYMediaCount").style.display="inline";document.getElementById("numMediaShowing").innerHTML=numMediaShowing;document.getElementById("totalMediaFound").innerHTML=numTotalMedia;document.getElementById("searchTypeDescription").innerHTML=(currentlySearching?"search results":"total "+easyPlural(siteGlobals.mediaType,"s"))}}var currentMediaCountPanelPosition="inline";function positionMediaCountPanel(b){if(b==currentMediaCountPanelPosition){return}switch(b){case"fixed":case"inline":break;default:return}var a=document.getElementById("mediaCountPanel");switch(b){case"fixed":a.style.width=a.offsetWidth+"px";a.style.top=0;a.style.position="fixed";break;case"inline":a.style.position="static";a.style.width="100%";break}currentMediaCountPanelPosition=b}function getMediaIDFromURL(){if(window.location.hash.length>0){if(window.location.hash.substr(0,2)=="#!"){return window.location.hash.replace("#!","")}return null}var a=window.location.pathname.split("/");if(a.length!=4){return null}return a[2]}function positionMediaCounter(){var a=document.getElementsByClassName("media-count-area")[0];positionMediaCountPanel(isScrolledTo(a,"above")?"fixed":"inline")}function infiniteLoader(){if(loadingStatus=="on"){return}var a=document.getElementsByTagName("footer")[0];if(!isScrolledTo(a,"view","partially")){return}renderMoreMedia()}function renderMoreMedia(){if(numMediaShowing>=searchResultIndexes.length){return}loading("on");var e=document.createElement("div");e.className="moreMediaReviews";var f=numMediaShowing;var a="";for(var c=0;c<pageSize;c++){if(f>=searchResultIndexes.length){break}var d=searchResultIndexes[f];var b=completeMediaData[d];a+=generateMediaHTML(b);if(((f+1)%reviewsPerAd)==0){a+=inFeedAdContainer}f++}e.innerHTML=a;numMediaShowing+=c;setTimeout(function(){document.getElementById("reviewsArea").appendChild(e);populateInFeedAds();renderMediaCount();loading("off")},1000)}var gettingMediaSearchList=false;function initMediaSearchList(a){if(completeMediaSearch.length>0){return a()}addEvent(document,"got-media-search-list",a);if(gettingMediaSearchList){return}gettingMediaSearchList=true;ajax(siteGlobals.mediaSearchIndexJSON,function(c){try{completeMediaSearch=JSON.parse(c);completeMediaSearchIDs=new Array(completeMediaSearch.length);for(var b=0;b<completeMediaSearch.length;b++){completeMediaSearchIDs[b]=completeMediaSearch[b].replace(/[^a-z0-9]*/g,"")}triggerEvent(document,"got-media-search-list")}catch(d){console.log("error in initMediaSearchList function: "+d);gettingMediaSearchList=false}})}function getMediaID(a){var b="";switch(siteGlobals.mediaType){case"book":b=a.author+a.title+a.year;break;case"tv-series":b=a.title+a.season+a.year;break;case"movie":b=a.title+a.year;break}return b.replace(/[^a-z0-9]*/gi,"").toLowerCase()}function getRenderedTitle(a){if(a.hasOwnProperty("renderedTitle")){return a.renderedTitle}var b=a.title;switch(siteGlobals.mediaType){case"book":b="<i>"+b+"</i> by "+a.author;break;case"tv-series":b+=" Season "+a.season;break}b+=" ("+a.year+")";return b}function mediaID2Index(b){if(b===null){return null}var a=completeMediaSearchIDs.indexOf(b);if(a<0){return null}return a}function initSearchResultIndexes(){if(completeMediaSearch.length==0||completeMediaData.length==0){return}var a=mediaID2Index(getMediaIDFromURL());generateSortedData(a,"")}function generateSortedData(d,f){searchResultIndexes=searchMediaTitles(d,f);var e=[];for(var b=0;b<searchResultIndexes.length;b++){var c=searchResultIndexes[b];var a=jsonCopyObject(completeMediaData[c]);a.index=c;e.push(a)}var g=(d!==null);e=sortMedia(g,e);for(var b=0;b<searchResultIndexes.length;b++){searchResultIndexes[b]=e[b].index}return e}function mediaSortChanged(){debounceMediaSearch("atStart");debounceMediaSearch("atEnd")}function debounceMediaSearch(b){switch(b){case"atStart":scrollToElement(document.getElementById("searchBox"));if(typeof window.history.replaceState=="function"){var a=siteGlobals.mediaType+"-reviews/";window.history.replaceState(null,"",generateCleanURL(a))}else{window.location.hash=""}hideAllSkyscraperAds();document.getElementById("reviewsArea").style.display="none";document.querySelector(".media-count-area").style.visibility="hidden";loading("on");break;case"atEnd":document.getElementById("reviewsArea").style.display="block";document.querySelector(".media-count-area").style.visibility="visible";mediaSearchChanged();loading("off");break}}function mediaSearchChanged(){archiveInFeedAds();document.getElementById("reviewsArea").innerHTML="";var b=trim(document.getElementById("search").value).toLowerCase();var a=extractSearchTerms(b);var c=function(){if(completeMediaSearch.length==0||completeMediaData.length==0){return}var f=null;var g=generateSortedData(f,a);if(b==""){numMediaShowing=completeMediaSearch.length;if(numMediaShowing>pageSize){numMediaShowing=pageSize}numTotalMedia=completeMediaSearch.length;currentlySearching=false;renderMediaCount()}else{numMediaShowing=searchResultIndexes.length;if(numMediaShowing>pageSize){numMediaShowing=pageSize}numTotalMedia=searchResultIndexes.length;currentlySearching=true;renderMediaCount()}var h="";for(var e=0;e<numMediaShowing;e++){var d=g[e];d.renderedTitle=highlightSearch(a,getRenderedTitle(d));h+=generateMediaHTML(d);if(((e+1)%reviewsPerAd)==0){h+=inFeedAdContainer}if((numMediaShowing<reviewsPerAd)&&(e+1)==numMediaShowing){h+=inFeedAdContainer}}document.getElementById("reviewsArea").innerHTML=h;populateInFeedAds()};initMediaSearchList(c);initCompleteMediaData(c)}function extractSearchTerms(a){if(a==""){return[]}return a.split(/[^a-z0-9]/gi).map(function(b){return b.toLowerCase()}).filter(function(c,b,d){if(c==""){return false}return d.indexOf(c)===b})}function searchMediaTitles(b,c){searchResultIndexes=[];if(c.length==0){for(var a=0;searchResultIndexes.length<completeMediaSearch.length;a++){if((b!==null)&&(a==0)){searchResultIndexes.push(b)}if(b===a){continue}searchResultIndexes.push(a)}return searchResultIndexes}if(b!==null){searchResultIndexes.push(b)}foreach(completeMediaSearch,function(e,d){if(b===e){return}var f=false;foreach(c,function(g,h){if(!inArray(h,d)){f=true;return false}});if(!f&&!inArray(e,searchResultIndexes)){searchResultIndexes.push(e)}});return searchResultIndexes}var gettingCompleteMediaData=false;function initCompleteMediaData(a){if(completeMediaData.length>0){return a()}addEvent(document,"got-complete-media-data",a);if(gettingCompleteMediaData){return}gettingCompleteMediaData=true;ajax(siteGlobals.mediaListJSON,function(b){try{completeMediaData=JSON.parse(b);triggerEvent(document,"got-complete-media-data")}catch(c){console.log("error in initCompleteMediaData function: "+c);gettingCompleteMediaData=false}})}function sortMedia(c,a){if(a.length==0){return[]}var d=document.getElementById("sortBy").value;if(c){var b=a.shift()}switch(d){case"newest-reviews":a.reverse();if(c){a.unshift(b)}return a;case"oldest-reviews":if(c){a.unshift(b)}return a}a.sort(function(f,e){var i=0;var h=f.title.toLowerCase();var g=e.title.toLowerCase();switch(d){case"highest-rating":case"lowest-rating":if(f.rating==e.rating){if(h>g){i=1}else{if(h<g){i=-1}}}else{if(f.rating>e.rating){i=1}else{if(f.rating<e.rating){i=-1}}if(d=="highest-rating"){i*=-1}}break;case"title-ascending":case"title-descending":if(h>g){i=1}else{if(h<g){i=-1}}if(d=="title-descending"){i*=-1}break}return i});if(c){a.unshift(b)}return a};