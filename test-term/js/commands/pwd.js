/// <reference path="../../jquery.d.ts" />

/**
 * The pwd command.
 * Gets current working directory.
 * Format:
 * pwd
 */
commands.push(["pwd", pwd, "get current working directory"]);
function pwd(input){
  appendText(cwd);
}
