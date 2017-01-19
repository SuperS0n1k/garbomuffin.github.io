/// <reference path="../../jquery.d.ts" />

/**
 * The hist command.
 * Lists the history.
 * Format:
 * history
 */
commands.push(["history", historyCommand, "list the history"]);
function historyCommand(input){
  var spaceCount = commandHistory.length.toString().length + 1;
  for (var i = 0; i < commandHistory.length; i++){
    console.log(i);
    appendText(" ".repeat(spaceCount) + (i + 1) + "  " + commandHistory[i]);
  }
}
