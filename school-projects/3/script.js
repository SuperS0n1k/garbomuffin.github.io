const input = document.getElementById("input");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const scale = 10;

button.onclick = onchange;
input.onchange = onchange;

function onchange(){
  const value = input.value;
  const parseResult = parse(value);

  if (parseResult){
    render(parseResult);
  }
}

function parse(value){
  const lines = value.split("\n");

  const ret = [];

  for (var lineNumber = 0; lineNumber < lines.length; lineNumber++){
    const row = [];
    const fullLine = lines[lineNumber];

    if (fullLine.trim() === ""){
      ret.push([]);
      continue;
    }

    const dividedRow = fullLine.replace(/\s/g, "").split(",");

    for (var inputNumber = 0; inputNumber < dividedRow.length; inputNumber++){

      function malformed(){
        alert(`INVALID INPUT @ LINE ${lineNumber + 1}, ITEM ${inputNumber + 1}`);
        throw new Error("malformed input");
      }

      const i = dividedRow[inputNumber];

      if (!(/^\d+\(\d+\)$/g).test(i)){
        malformed();
      }

      const split = i.replace(")", "").split("(");

      var amount = split[0];
      var color = split[1];

      if (!color || !amount || !isFinite(color) || !isFinite(amount)){
        malformed();
      }

      row.push({color, amount});
    }

    ret.push(row);
  }

  return ret;
}

const defaultPalette = ["white", "blue", "gray", "pink", "purple", "red", "green", "yellow"];
var colors = defaultPalette;

function render(data){
  clearCanvas();

  for (var lineIndex = 0; lineIndex < data.length; lineIndex++){
    const line = data[lineIndex];

    var y = lineIndex;
    var x = 0;

    if (y % 2 === 0){
      ctx.fillStyle = y % 10 === 0 ? "red" : "black";
      ctx.fillRect(0, y * scale, scale, scale);
    }

    x++;
    y++;

    for (const color of line){
      for (var i = 0; i < color.amount; i++){
        if (x % 2 === 0){
          ctx.fillStyle = x % 10 === 0 ? "red" : "black";
          ctx.fillRect(x * scale, 0, scale, scale);
        }

        ctx.fillStyle = "white";

        ctx.fillStyle = colors[color.color - 1];
        ctx.fillRect(x * scale, y * scale, scale, scale);

        x++;
      }
    }
  }
}

function clearCanvas(){
  const width = canvas.width;
  const height = canvas.height;

  ctx.fillStyle = "white";

  ctx.fillRect(0, 0, width, height);
}

window.onload = function(){
  input.value = `20 (1), 2 (8), 19 (1)
17 (1), 4 (7), 3 (2), 17 (1)
14 (1), 2 (6), 5 (7), 7 (2), 13 (1)
11 (1), 4 (6), 6 (7), 9 (2), 12 (1)
9 (1), 5 (6), 7(7), 9(2), 2 (5), 10 (1)
8 (1), 5 (6), 8 (7), 10 (2), 2 (5), 9 (1)
7 (1), 5 (6), 9 (7), 10 (2), 4 (5), 7 (1)
6 (1), 5 (6), 10 (7), 11 (2), 4 (5), 6 (1)
5 (1), 6 (6), 10 (7), 11 (2), 5 (5), 5 (1)
4 (1), 6 (6), 11 (7), 12 (2), 5(5), 4 (1)
4 (1), 6 (6), 11 (7), 12 (2), 5 (5), 4 (1)
3 (1), 6 (6), 11 (7), 12 (2), 5 (5), 3 (1)
3 (1), 6 (6), 5 (7), 5 (8), 5 (2), 3 (5), 9 (4), 1 (2), 7 (5), 2 (1)
2 (1), 6 (6), 2 (2), 10 (8), 2 (3), 11 (4), 5 (6), 2 (5), 2 (1)
2 (1), 3 (6), 4 (2), 11 (8), 2 (3), 11 (4), 8 (6), 1 (1)`;
//   input.value = `41 (1)
// 16 (1), 9 (2), 16 (1)
// 13 (1), 15 (2), 13 (1)
// 10 (1), 6 (2), 9 (3), 6(2), 10 (1)
// 7 (1), 6 (2), 15 (3), 6(2), 7 (1)
// 4 (1), 6 (2), 6 (3), 9 (4), 6 (3), 6 (2), 4 (1)
// 1 (1), 6 (2), 6 (3), 15 (4), 6 (3), 6 (2), 1 (1)
// 4 (2), 6 (3), 6 (4), 9 (5), 6 (4), 6 (3), 4 (2)
// 1 (2), 6 (3), 6 (4), 15 (5), 6 (4), 6 (3), 1 (2)
// 4 (3), 6 (4), 6 (5), 9 (6), 6 (5), 6 (4), 4 (3)
// 1 (3), 6 (4), 6 (5), 15 (6), 6 (5), 6 (4), 1 (3)
// 4 (4), 6 (5), 6 (6), 9 (7), 6 (6), 6 (5), 4 (4)
// 1 (4), 6 (5), 6 (6), 15 (7), 6 (6), 6 (5), 1 (4)
// 4 (5), 6 (6), 6 (7), 9 (8), 6 (7), 6 (6), 4 (5)
// 1 (5), 6 (6), 6 (7), 15 (8), 6 (7), 6 (6), 1 (5)
// 4 (6), 6 (7), 6 (8), 9 (1), 6 (8), 6 (7), 4 (6)
// 1 (6), 6 (7), 6 (8), 15 (1), 6 (8), 6 (7), 1 (6)
// 4 (7), 6 (8), 21 (1), 6 (8), 4 (7)
// 1 (7), 6 (8), 27 (1), 6 (8), 1 (7)
// 4 (8), 7 (1), 4 (9), 4 (1), 1 (9), 7 (1), 1 (9), 9 (1), 4 (8)
// 1 (8), 10 (1), 1 (9), 2 (1), 1 (9), 4 (1), 2 (9), 5 (1), 2 (9), 12 (1), 1 (8)
// 11 (1), 1 (9), 2 (1), 1 (9), 4 (1), 1 (9), 1 (1), 1 (9), 3 (1), 1 (9), 1 (1), 1 (9), 13 (1)`

  input.onchange();
}

document.getElementById("reilly-palette").onclick = function(){
  colors = ["white", "red", "orange", "yellow", "green", "blue", "indigo", "violet", "magenta"];
  onchange();
}

document.getElementById("houck-palette").onclick = function(){
  colors = ["white", "blue", "gray", "orange", "black", "red", "green", "yellow"];
  onchange();
}

document.getElementById("reset-palette").onclick = function(){
  colors = defaultPalette;
  onchange();
}

document.getElementById("custom-palette").onclick = function(){
  alert(([
    "Instructions", "Answer the questions", "At any time type 'cancel' to stop", "Please only type WHOLE POSITIVE NUMBERS"
  ]).join("\n\n"));

  function promptUser(q){
    const answer = prompt(q);
    if (answer === "cancel"){
      throw new Error("This error is normal. It stops script execution when you type 'cancel'.");
    }
    const isNumber = isWholeNumber(answer);
    
    return answer;
  }

  const newPalette = [];
  const colorCount = prompt("How many different colors are there?");
  for (var i = 0; i < colorCount; i++){
    var colorName = prompt(`What is color #${i + 1}?\n\nUse either a hex code (eg. #ABCDEF) or the english name (eg. "white" or "red")`);
    newPalette.push(colorName);
  }

  alert("Loaded Custom Palette");

  colors = newPalette;
  onchange();
}
