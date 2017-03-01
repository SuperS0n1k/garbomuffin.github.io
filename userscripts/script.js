var changelog = document.getElementById("changelog");
function version(number, notes, date){
  var el = document.createElement("div");
  var a = document.createElement("a");
  var ul = document.createElement("ul");
  a.innerHTML = "<b>v" + number + "</b>";
  a.id = number;
  a.href = "#" + number;
  for (let i of notes){
    var li = document.createElement("li");
    li.innerHTML = i;
    ul.appendChild(li);
  }
  el.appendChild(a);
  el.innerHTML += ": ";
  if (date){
    var small = document.createElement("small");
    small.innerHTML = date;
    el.appendChild(small);
  }
  el.appendChild(ul);
  changelog.appendChild(el);
}

