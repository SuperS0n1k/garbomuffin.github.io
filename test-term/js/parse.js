/// <reference path="../jquery.d.ts" />

function parse(){
  $("#hist").html($("#hist").html() +
    "<font color=\"lightgreen\"><b>$ </b></font>" +
    $("#out").html() + "<br>"
  );

  var input = $("#out").text();
  if (input.trim() !== ""){
    commandHistory.push(input.substr(2));
    currentHistory = commandHistory.length;
  }

  var quote = false;
  var squote = false;
  var inputArgs = [];
  var inputPart = "";
  var wasLastCharacterASpace = true; // 10/10 would variable name again

  for (var i = 0; i < input.length; i++){
    var char = input.charAt(i);

    if (char != "\xa0"){
      wasLastCharacterASpace = false;
    }

    if (char == "\""){
      quote = !quote;
    }else if (char == "'"){
      squote = !squote;
    }else if (char == "\\"){
      i++;
      char = input.charAt(i);
      inputPart += char;
    }else if (char == "\xa0"){
      if (!wasLastCharacterASpace && !(quote || squote)){
        inputArgs.push(inputPart);
        inputPart = "";
      }else if (quote || squote){
        inputPart += " ";
      }
      wasLastCharacterASpace = true;
    }else{
      inputPart += char;
    }
  }
  inputArgs.push(inputPart);

  var oldArgs = inputArgs.join("\xa0").split("\xa0");
  inputArgs.shift();
  var command = oldArgs[0];

  // raw: raw command
  // command: just the actual command used, useful for aliases
  // args: args without the starting command
  // text: args with the starting command
  var args = {
    raw: input,
    command: command,
    args: inputArgs,
    text: oldArgs,
  };

  var found = false;
  for (var c = 0; c < commands.length; c++){
    if (command == commands[c][0]){
      found = true;
      commands[c][1](args);
      break;
    }
  }

  if (!found) notFound(args);

  $("#input").text("");
  $("#out").html("");
}

function expandInput(){
  // TODO: expand the output when it detects it being "incomplete"
}
