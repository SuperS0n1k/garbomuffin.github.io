/// <reference path="../../jquery.d.ts" />

/**
 * The help command.
 * Gets help about things.
 * Format:
 * help [topic]
 */
commands.push(["help", help, "this help"]);
function help(input){
  appendText("Commands:");
  for (var i = 0; i < commands.length; i++){
    appendText(commands[i][0] + " - " + commands[i][2]);
  }
}
