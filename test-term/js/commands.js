/// <reference path="../jquery.d.ts" />

// command stuff.

// "not found" code
function notFound(args){
  if (args.raw.trim() !== "") appendText(args.text[0] + ": not found", "red");
}

// "api" stuff
/**
 * Display some text
 * @param {string} text The stuff to display
 * @param {string} [color="white"] The color to display it in.
 */
function appendText(text, color = "white"){
  text = text.replace("&", "&amp;");
  text = text.replace("<", "&lt;");
  text = text.replace(">", "&gt;");
  text = text.replace(/ /g, "&nbsp;");
  $("#hist").append(`<font color="${color}">` + text + "<br></span>");
}
