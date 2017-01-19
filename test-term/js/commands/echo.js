/// <reference path="../../jquery.d.ts" />

/**
 * The echo command.
 * Sends back the parameters.
 * Format:
 * echo <some text...>
 */
commands.push(["echo", echo, "send back the args"]);
function echo(input){
  appendText(input.args.join(" "));
}
