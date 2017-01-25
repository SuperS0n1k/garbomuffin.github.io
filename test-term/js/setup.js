/// <reference path="../jquery.d.ts" />

var commands = [];

(function(){
  "use strict";

  $("#hist").append("A simple, unfinished javascript terminal.<br>");
  $("#hist").append("Click to focus, \"help\" for help!<br><br>");
  // $("#out").append("<b class=\"lightgreen\">$</b> ");

  $(document).ready(function(){
    $(document).click(function(){
      $("#input").focus();
    });

    $("#input").focus();

    $("#input").keypress(function(event){
      if (event.key == "Enter"){
        parse();
      }else if (event.key == " "){
        $("#out").append("&nbsp;");
      }else{
        $("#out").append(event.key);
      }
    });

    $("#input").keydown(function(event){
      if (event.which == 8 && $("#out").text().length > 0){
        // backspace
        $("#out").text($("#out").text().slice(0, -1));
      }else if (event.which == 38){
        // up arrow
        historyChange(-1);
      }else if (event.which == 40){
        // down arrow
        historyChange(1);
      }
    });
  });
})();
