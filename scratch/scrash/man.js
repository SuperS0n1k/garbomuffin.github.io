class ManTitleElement extends HTMLElement {
  constructor(){
    super();

    if (!this.id){
      this.id = this.textContent.split(" ")[0].toLowerCase();
      var parent = this.parentElement.parentElement;
      if (parent.tagName === "MAN-ENTRY"){
        this.id = parent.getElementsByTagName("man-title")[0].id + "-" + this.id;
      }
    }

    var a = document.createElement("a");
    a.href = "#" + this.id;
    a.innerHTML = this.innerHTML;

    this.innerHTML = "";
    this.appendChild(a);
  }
}

var overrides = ["~", "..", "."];
class ManTitleInlineElement extends ManTitleElement {
  constructor(){
    super();

    if (overrides.indexOf(this.id) > -1){
      var parent = this.parentElement.parentElement.parentElement;
      var title = parent.getElementsByTagName("man-title");
      this.id = title[0].id + "-" + this.id;

      this.getElementsByTagName("a")[0].href = "#" + this.id;
    }
  }
}

class ManBugElement extends HTMLElement {
  constructor(){
    super();
  }

  
}

customElements.define("man-title", ManTitleElement);
customElements.define("man-title-inline", ManTitleInlineElement);
customElements.define("man-bug", ManBugElement);

class FootNoteDefinitionElement extends HTMLElement {
  constructor(){
    super();

    var regex = /\[(\d*)\]/;

    var id = regex.exec(this.textContent)[1];
    this.id = "footnote-" + id;

    this.innerHTML = this.innerHTML.replace(/\[(\d*)\]/, "");

    this.insertAdjacentHTML("afterbegin", `<a href="#${this.id}">[${id}]</a> `);
  }
}

class FootNoteReferenceElement extends HTMLElement {
  constructor(){
    super();

    var regex = /^\[(\d*)\]$/g;

    var id = regex.exec(this.textContent)[1];

    var a = document.createElement("a");
    a.href = "#footnote-" + id;
    a.innerHTML = this.innerHTML;

    this.innerHTML = "";
    this.appendChild(a);
  }
}

customElements.define("footnote-definition", FootNoteDefinitionElement);
customElements.define("footnote-reference", FootNoteReferenceElement);

window.onhashchange = highlightHash;
window.onload = highlightHash;

function highlightHash(){
  var hash = location.hash;

  if (hash.charAt(0) === "#"){
    hash = hash.substring(1);
  }
  console.log("hash change: " + hash);

  var el = document.getElementById(hash);

  if (el === null){
    console.log("unknown element: " + hash);
    return;
  }

  if (el instanceof ManTitleElement){
    el = el.parentElement;
  }else if (el.id === "top"){
    el = document.body;
  }

  highlightElement(el);
}

function highlightElement(el){
  el.classList.add("no-transition");
  el.style.backgroundColor = "yellow";

  window.getComputedStyle(el).opacity; // ;-;
  el.classList.remove("no-transition");

  el.style.backgroundColor = "";
}

console.log("hi.");
