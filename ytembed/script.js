/* jshint esversion: 3 */

(function() {
  "use strict";

  var submitButton = document.getElementById("submit-button");
  var videoUrlElement = document.getElementById("input");
  var videoWidthElement = document.getElementById("width");
  var videoHeightElement = document.getElementById("height");
  var embedCodeElement = document.getElementById("embed-code");
  var embedContainer = document.getElementById("embed-container");
  submitButton.onclick = submit;

  var EMBED_URL = "https://www.youtube.com/embed/%ID%";

  function submit() {
    var id = getVideoURL(input.value);
    if (!id) {
      alert("Invalid video URL");
    }
    console.log("Video ID is " + id);

    var embed = document.createElement("iframe");
    embed.src = EMBED_URL.replace("%ID%", id);
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

  function getVideoURL(url){
    // https://stackoverflow.com/a/8260383
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  }
}());
