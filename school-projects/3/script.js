"use strict";

const input = document.getElementById("input");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var scale = 10;

document.getElementById("render").onclick = onchange;
input.onchange = onchange;

function onchange(){
  const value = input.value;
  const parseResult = parse(value);

  if (parseResult){
    render(parseResult);

    localStorage.setItem("last_input", value);
    localStorage.setItem("last_palette", JSON.stringify(colors));
  }
}

/**
 * Determines which function to use to parse the input and returns it
 */
function parse(data){
  // houck's protocol always has parenthesis for it to be valid while david's doesn't.
  if (data.indexOf("(") > -1){
    return houckParse(data);
  }else{
    return davidParse(data);
  }
}

/**
 * Parse an input following the protocol used by David
 * 
 * Protocol:
 * XXXXX-XXXXX ...
 * 
 * Where X's are colors
 * -'s are optional for organization, they are ignored by this
 */
function davidParse(data){
  const ret = [];

  data = data.replace(/-/g, "");

  const lines = data.split("\n");

  for (const line of lines){
    const lineData = [];
    for (const c of line){
      lineData.push({color: Number(c), amount: 1});
    }
    ret.push(lineData);
  }

  return ret;
}

/**
 * Parse an input following the protocol used by Mr. Houck
 * 
 * Format:
 * 'AMOUNT (COLOR), '
 * Where amount is the amount to repeat and color is the color to use
 * Each color is comma seperated
 * 
 * Any spaces are ignored.
 */
function houckParse(value){
  /**
   * Prompt the user of an invalid input on the current line and stops execution
   */
  function malformed(){
    alert(`INVALID INPUT @ LINE ${lineNumber + 1}, ITEM ${inputNumber + 1}`);
    throw new Error("malformed input");
  }

  const lines = value.split("\n");

  const ret = [];

  for (var lineNumber = 0; lineNumber < lines.length; lineNumber++){
    const row = [];
    const fullLine = lines[lineNumber];

    const dividedRow = fullLine.replace(/\s/g, "").split(",");

    for (var inputNumber = 0; inputNumber < dividedRow.length; inputNumber++){

      const i = dividedRow[inputNumber];

      if (!(/^\d+\(\d+\)$/g).test(i)){
        malformed();
      }

      const split = i.replace(")", "").split("(");

      var amount = Number(split[0]);
      var color = Number(split[1]) - 1;

      if (typeof amount === "undefined" || isNaN(color) || isNaN(amount)){
        malformed();
      }

      row.push({color, amount});
    }

    ret.push(row);
  }

  return ret;
}

const defaultPalette = ["white", "blue", "gray", "pink", "purple", "red", "green", "yellow"];
var colors = JSON.parse(localStorage.getItem("last_palette") || JSON.stringify(defaultPalette));

var lastData = null;

/**
 * Renders the data with the opts
 * If the data argument isn't provided it will use whatever the last data was.
 * 
 * opts.x is the x of the square the cursor is over
 * opts.y is the y of the square the cursor is over
 */
function render(data = lastData, opts = {}){
  // the mousemove event can be called before any data has been saved (as a result lastData is null)
  // if so then just skip everything
  if (!data){
    return;
  }

  clearCanvas();

  lastData = data;

  canvas.height = data.length * scale;
  canvas.width = maxWidth(data) * scale;

  for (var lineIndex = 0; lineIndex < data.length; lineIndex++){
    const line = data[lineIndex];

    var y = lineIndex;
    var x = 0;

    for (const color of line){
      for (var i = 0; i < color.amount; i++){
        // set the color, if its not defined default to white
        // the parse functions have to handle 0 indexing madness
        ctx.fillStyle = colors[color.color] || "white";
        ctx.fillRect(x * scale, y * scale, scale, scale);

        // if this box is the one the mouse is over draw an outline
        // this could be moved out of the loop and would also then support drawing rectangles where there isn't data
        // but not making the outline is useful for debugging any missing colors at the end
        if (x === opts.x && y === opts.y){
          ctx.strokeStyle = "black";
          ctx.rect(x * scale, y * scale, scale, scale);
          ctx.stroke();
        }

        x++;
      }
    }
  }
}
/**
 * Takes data provided to the render function and returns the highest width of any row.
 */
function maxWidth(data){
  var max = 0;
  for (var row of data){
    var width = 0;
    for (var color of row){
      width += Number(color.amount);
    }
    if (width > max){
      max = width;
    }
  }
  return max;
}
/**
 * Clear the canvas, could probably be moved into the render() function
 */
function clearCanvas(){
  const width = canvas.width;
  const height = canvas.height;

  ctx.fillStyle = "white";

  ctx.fillRect(0, 0, width, height);
}

window.onload = function(){
  input.value = localStorage.getItem("last_input") || `20 (1), 2 (8), 20 (1)
17 (1), 4 (7), 3 (2), 18 (1)
14 (1), 2 (6), 5 (7), 7 (2), 14 (1)
11 (1), 4 (6), 6 (7), 9 (2), 12 (1)
9 (1), 5 (6), 7(7), 9(2), 2 (5), 10 (1)
8 (1), 5 (6), 8 (7), 10 (2), 2 (5), 9 (1)
7 (1), 5 (6), 9 (7), 10 (2), 4 (5), 7 (1)
6 (1), 5 (6), 10 (7), 11 (2), 4 (5), 6 (1)
5 (1), 6 (6), 10 (7), 11 (2), 5 (5), 5 (1)
4 (1), 6 (6), 11 (7), 12 (2), 5 (5), 4 (1)
4 (1), 6 (6), 11 (7), 12 (2), 5 (5), 4 (1)
3 (1), 6 (6), 12 (7), 12 (2), 6 (5), 3 (1)
3 (1), 6 (6), 5 (7), 5 (8), 2 (7), 3 (2), 8 (4), 1 (2), 7 (5), 2 (1)
2 (1), 6 (6), 2 (2), 10 (8), 2 (3), 11 (4), 5 (6), 2 (5), 2 (1)
2 (1), 3 (6), 4 (2), 11 (8), 2 (3), 11 (4), 8 (6), 1 (1)
1 (1), 2 (6), 6 (2), 11 (8), 2 (3), 11 (4), 7 (6), 2 (1)
5 (1), 4 (6), 11 (8), 2 (3), 11 (4), 3 (6), 6 (1)
7 (1), 2 (6), 11 (8), 2 (3), 12 (4), 8 (1)
8 (1), 1 (6), 10 (1), 1 (8), 2 (3), 2 (4), 9 (1), 1 (4), 8 (1)
20 (1), 2 (3), 20 (1)
20 (1), 2 (3), 20 (1)
20 (1), 2 (3), 20 (1)
20 (1), 2 (3), 20 (1)
20 (1), 2 (3), 20 (1)
20 (1), 2 (3), 20 (1)
20 (1), 2 (3), 20 (1)
20 (1), 2 (6), 20 (1)
20 (1), 2 (6), 2 (1), 1 (6), 17 (1)
20 (1), 2 (6), 1 (1), 2 (6), 17 (1)
20 (1), 4 (6), 18 (1)
20 (1), 3 (6), 19 (1)
21 (1), 1 (6), 20 (1)`;
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

document.getElementById("david-palette").onclick = function(){
  colors = ["white", "green", "red", "orange", "gray", "darkgray", "brown", "black", "yellow"];
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

    return answer;
  }

  const newPalette = [];
  const colorCount = promptUser("How many different colors are there?");
  for (var i = 0; i < colorCount; i++){
    var colorName = promptUser(`What is color #${i + 1}?\n\nUse either a hex code (eg. #ABCDEF) or the english name (eg. "white" or "red")`);
    newPalette.push(colorName);
  }

  alert("Loaded Custom Palette");

  colors = newPalette;
  onchange();
};

canvas.onmousemove = function(e){
  const x = e.offsetX;
  const y = e.offsetY;

  if (x < 0 || y < 0){
    return;
  }

  const xCoord = Math.floor(x / scale);
  const yCoord = Math.floor(y / scale);

  document.getElementById("selected").textContent = `Coordinate under cursor: (${xCoord + 1}, ${yCoord + 1})`;

  render(lastData, {
    x: xCoord,
    y: yCoord,
  });
};

document.getElementById("scale").onclick = function(){
  var newScale = prompt("Please enter the new scale.\n\nIt must be a positive whole number.");
  // TODO: maybe make sure the input is a number
  scale = newScale;
  onchange();
};

document.getElementById("reset-everything").onclick = function(){
  if (confirm("Are you sure you would like to reset everything?")){
    localStorage.clear();
    location.reload();
  }
}
