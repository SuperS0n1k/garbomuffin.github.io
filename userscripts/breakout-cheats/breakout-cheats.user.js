// ==UserScript==
// @name        Breakout Cheats
// @namespace   http://garbomuffin.bitbucket.io/userscripts/breakout-cheats/
// @version     1.1.2
// @description Because cheating is fun.
// @author      GarboMuffin
// @match       https://sites.google.com/site/digitalbreakoutjb/game*
// @match       https://docs.google.com/forms/*
// @updateURL   http://garbomuffin.bitbucket.io/userscripts/breakout-cheats/breakout-cheats.user.js
// @downloadURL http://garbomuffin.bitbucket.io/userscripts/breakout-cheats/breakout-cheats.user.js
// ==/UserScript==

// A userscript that contains a collection of cheats designed for cheating digital breakouts.
// http://www.breakoutedu.com/digital

/*
CHANGELOG:

1.1.2:
 - Oh oops, I failed that time.

1.1.1:
 - Update download location.

1.1:
 - Fixed issues with forms caused from the move to material design forms.
 (this means that there are now less availible cheats tho, just input answers)

1.0:
 - Inital release.

*/

(function() {
  'use strict';

  var bc = {
    Button: function(text, func){
      el = document.createElement("button");
      el.appendChild(document.createTextNode(text));
      el.onclick = func;
      document.getElementById("bc-ui").appendChild(el);
      document.getElementById("bc-ui").appendChild(document.createTextNode(" "));
    },

    PrintResult: function(t){
      l = t.split(" ");
      results.innerHTML = "";
      for (i = 0; i < l.length; i++){
        if (l[i].search(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig) > -1){
          el = document.createElement("a");
          url = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.exec(l[i]);
          el.appendChild(document.createTextNode(l[i]));
          if (url[0].indexOf("http") === 0){
            el.href = url[0];
          }else{
            el.href = "http://" + url[0];
          }
          el.target = "_blank";
          results.appendChild(el);
          results.innerHTML += " ";
        }else{
          results.innerHTML += l[i] + " ";
        }
      }
      results.style.display = "inline";
    },

    UI: {
      Show: function(){
        document.getElementById("bc-ui").style.display = "block";
        document.getElementById("showhide").innerHTML = "Hide";
        document.getElementById("showhide").onclick = bc.UI.Hide;
      },
      
      Hide: function(){
        document.getElementById("bc-ui").style.display = "none";
        document.getElementById("showhide").innerHTML = "Show";
        document.getElementById("showhide").onclick = bc.UI.Show;
      }
    },

    js: {

      bc: function(){
        el = document.createElement("a");
        el.appendChild(document.createTextNode("Show"));
        el.className = "sites-system-link";
        el.onclick = bc.UI.Show;
        el.id = "showhide";
        el.style.cursor = "pointer";
        document.getElementsByClassName("sites-adminfooter")[0].appendChild(el);

        el = document.createElement("span");
        el.id = "bc-ui";
        el.style.textAlign = "center";
        document.body.appendChild(el);

        document.getElementById("bc-ui").style.display = "none";

        el = document.createElement("div");
        el.id = "update";
        el.style.display = "none";
        document.getElementById("bc-ui").appendChild(el);

        el = document.createElement("div");
        el.id = "results";
        el.style.display = "none";

        document.getElementById("bc-ui").appendChild(el);

        document.getElementById("bc-ui").appendChild(document.createElement("br"));
        document.getElementById("bc-ui").appendChild(document.createElement("br"));

        // bc.Buttons

        bc.Button("Find Hidden Text", function(){
          text = "";
          el = document.getElementsByTagName("font");
          for (i = 0; i < el.length; i++){
            if (el[i].getAttribute("color") === "#ffffff" && el[i].getElementsByTagName("img")[0] === undefined){
              text += el[i].innerHTML;
            }
          }
          bc.PrintResult(text);
        });

        bc.Button("Show Hidden Text", function(){
          el = document.getElementsByTagName("font");
          for (i = 0; i < el.length; i++){
            if (el[i].getAttribute("color") === "#ffffff"){
              el[i].style.color = "black";
            }
          }
        });

        bc.Button("Emphasize Links", function(){
          el = document.getElementsByTagName("a");
          for (i = 0; i < el.length; i++){
            el[i].style.color = "blue";
            el[i].style.fontWeight = "bold";
          }
        });

        bc.Button("Combine Bold Text", function(){
          text = "";
          el = document.getElementsByTagName("b");
          for (i = 0; i < el.length; i++){
            if (parseFloat(window.getComputedStyle(el[i]).getPropertyValue("font-size")) > 11 && el[i].color != "#ffffff" && el[i].getElementsByTagName("font")[0] === undefined){
              text += el[i].innerHTML;
            }
          }
          bc.PrintResult(text);
        });

        bc.Button("Emphasize Bold Text", function(){
          el = document.getElementsByTagName("b");
          for (i = 0; i < el.length; i++){
            if (parseFloat(window.getComputedStyle(el[i]).getPropertyValue("font-size")) > 11 && el[i].color != "#ffffff" && el[i].getElementsByTagName("font")[0] === undefined){
              el[i].style.background = "yellow";
            }
          }
        });

        bc.Button("Open Form", function(){
          el = document.getElementsByTagName("iframe");
          for (i = 0; i < el.length; i++){
            url = el[i].src;
            if (url.indexOf("https://docs.google.com/forms/") === 0){
              form = url;
            }
          }
          window.open(form);
        });

        bc.Button("Get Answers", function(){
          game = location.pathname.split("/")[3];
          if (game === "game4"){
            game = "04";
          }else{
            game = game.split("-")[1];
            if (game < 10){
              game = "0" + game;
            }
          }
          window.open("https://bitbucket.org/GarboMuffin/breakout-solutions/src/master/games/game-" + game + "/README.md");
        });
      },

      forms: function(){
        document.getElementsByClassName("freebirdFormviewerViewFooterDisclaimer")[0].appendChild(document.createElement("br"));

        el = document.createElement("a");
        el.appendChild(document.createTextNode("Show"));
        el.onclick = bc.UI.Show;
        el.id = "showhide";
        el.style.cursor = "pointer";
        document.getElementsByClassName("freebirdFormviewerViewFooterDisclaimer")[0].appendChild(el);

        el = document.createElement("div");
        el.id = "bc-ui";
        el.style.textAlign = "center";
        el.style.fontFamily = "sans-serif";
        document.getElementsByClassName("freebirdFormviewerViewFooterDisclaimer")[0].appendChild(el);

        document.getElementById("bc-ui").style.display = "none";

        el = document.createElement("span");
        el.id = "update";
        document.getElementById("bc-ui").appendChild(el);

        // Button(s)!

        bc.Button("Input Answers", function(){
          el = document.getElementsByTagName("form")[0].getElementsByTagName("input");
          for (i = 0; i < el.length; i++){
            if (el[i].className.indexOf("quantum") > -1){
              el[i].value = FB_PUBLIC_LOAD_DATA_[1][1][i][4][0][4][0][2][0];
            }
          }
        });
      }
    }
  };

  var el;
  var xhr;
  var text;
  var i;
  var game;
  var l;
  var url;
  var form;
  var inputs;
  var input;

  if (location.href.indexOf("https://sites.google.com/site/digitalbreakoutjb/game") > -1){
    bc.js.bc();
    console.log("[bc-bc] Successfully loaded!");
  }else if (location.href.indexOf("https://docs.google.com/forms") > -1){
    bc.js.forms();
    console.log("[bc-form] Successfully loaded!");
  }
})();
