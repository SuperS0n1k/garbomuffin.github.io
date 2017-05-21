class Template {
  constructor(text){
    if (typeof text === "string"){
      this.text = text;
    }else{
      this.text = text.textContent;
    }
  }

  format(string, replace){
    this.text = this.text.replace("${" + string + "}", replace);
    return this;
  }

  toString(){
    return this.text;
  }

  toHTML(){
    var el = document.createElement("div");
    el.innerHTML = this.toString();
    return el.children;
  }

  appendTo(el){
    el.insertAdjacentHTML("beforeend", this.toString());
    return this;
  }
}

class Item {
  constructor(options){
    this.template = new Template(document.getElementById("item"))
      .format("name", options && options.name || "")
      .format("id", options && options.id || (table.children.length + 1))
      .format("cost", options && options.cost || 0);
  }
}

function calc(){
  var income = document.getElementById("income").value;
  var spent = 0;
  for (var item of table.children){
    var cost = item.children[2].children[0].value;
    spent += Number(cost);
  }

  var el = document.getElementById("out");
  var out = income - spent;
  if (out > 0){
    el.innerHTML = `After this month, you will have <b>$${out}</b> of extra money.`;
    el.style.color = "green";
  }else if (out < 0){
    el.innerHTML = `After this month, you will be <b>$${-out}</b> in debt.`;
    el.style.color = "red";
  }else if (out === 0){
    el.innerHTML = `After this month, you will break even.`;
    el.style.color = "orange";
  }
}

function addItem(){
  var item = new Item();
  item.template.appendTo(table);
  update();
}

function removeItem(){
  var el = this.parentNode.parentNode;
  el.parentNode.removeChild(el);
  update();
}

function update(){
  for (var i = 0; i < table.children.length; i++){
    var el = table.children[i];
    el.children[3].children[0].disabled = table.children.length === 1;
    el.children[0].textContent = i + 1;
  }
}

function save(){
  var data = [document.getElementById("income").value];
  for (var el of table.children){
    data.push(`"${el.children[1].children[0].value}"`);
    data.push(`${el.children[2].children[0].value}`);
  }
  return data;
}
function saveData(){
  localStorage.setItem("budgetingSaveData", `[${save()}]`);
}

function load(data){
  clear();

  data = JSON.parse(data);

  document.getElementById("income").value = data[0];

  for (var i = 1; i < data.length; i += 2){
    new Item({
      name: data[i],
      cost: data[i + 1]
    }).template.appendTo(table);
  }
}
function loadData(){
  var data = localStorage.getItem("budgetingSaveData");
  if (data){
    load(localStorage.getItem("budgetingSaveData"));
  }else{
    addItem();
  }
}
function resetData(){
  clear();
  localStorage.setItem("budgetingSaveData", "");
  loadData();
}

function clear(){
  while (table.firstChild){
    table.removeChild(table.firstChild);
  }
}

var app = document.getElementById("app");
var table = document.getElementById("table");

loadData();
update();
