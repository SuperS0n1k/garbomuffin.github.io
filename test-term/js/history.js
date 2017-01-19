/// <reference path="../jquery.d.ts" />

var commandHistory = [];
var currentHistory = 0;

function historyChange(x){
  var newCommand = commandHistory[currentHistory + x];
  if (newCommand !== undefined){
    $("#out").text("$ " + commandHistory[currentHistory + x]);
    currentHistory = currentHistory + x;
  }
}
