/* jshint esversion: 3 */

(function() {
  "use strict";

  function getVideoURL(url){
    // https://stackoverflow.com/a/8260383
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  }

  var submitButton = document.getElementById("submit-button");
  var videoUrlElement = document.getElementById("input");
  var videoWidthElement = document.getElementById("width");
  var videoHeightElement = document.getElementById("height");
  var autoplayElement = document.getElementById("autoplay");
  var embedCodeElement = document.getElementById("embed-code");
  var embedContainer = document.getElementById("embed-container");

  var EMBED_URL = "https://www.youtube.com/embed/%ID%";

  function submit() {
    var id = getVideoURL(videoUrlElement.value);
    if (!id) {
      alert("Invalid video URL");
    }
    console.log("Video ID is " + id);

    var src = EMBED_URL;
    src = src.replace("%ID%", id);

    if (autoplayElement.checked) {
      src += "?autoplay=1";
    }

    var embed = document.createElement("iframe");
    embed.src = src;
    embed.setAttribute("frameborder", "0");
    embed.setAttribute("gesture", "media");
    embed.setAttribute("allow", "encrypted-media");
    embed.setAttribute("allowfullscreen", "allowfullscreen");

    embed.width = videoWidthElement.value;
    embed.height = videoHeightElement.value;

    while (embedContainer.firstChild) {
      embedContainer.removeChild(embedContainer.firstChild);
    }
    embedContainer.appendChild(embed);

    embedCodeElement.value = embed.outerHTML;
  }

  if (window.location.hash) {
    var hash = window.location.hash;
    if (hash.charAt(0) === "#") {
      hash = hash.substr(1);
    }
    videoUrlElement.value = hash;
    submit();
  }

  submitButton.onclick = submit;
}());
