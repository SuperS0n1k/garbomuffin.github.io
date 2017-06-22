class BugReportElement extends HTMLElement {
  constructor(){
    super();

    var hasFixedClass = this.classList.contains("fixed");

    var statusElement = this.getElementsByTagName("bug-status")[0];
    var status = statusElement ? statusElement.textContent : "";

    var hasFixedText = status.indexOf("Fixed") > -1;

    if (hasFixedClass && !hasFixedText){
      console.warn("missing fixed status: ", this);
    }

    if (!hasFixedClass && hasFixedText){
      console.warn("missing fixed class: ", this);
    }
  }
}

class BugIDElement extends HTMLElement {
  constructor(){
    super();

    var parent = this.parentElement;
    var id = this.textContent;
    parent.id = "SCRASH-" + id;

    var first = this.innerHTML.split(" ")[0];

    var a = document.createElement("a");
    a.innerHTML = first;
    a.href = "#" + parent.id;

    this.innerHTML = this.innerHTML.replace(first, a.outerHTML);
  }
}

customElements.define("bug-id", BugIDElement);
customElements.define("bug-report", BugReportElement);


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

  highlightElement(el);
}


function highlightElement(el){
  el.classList.add("no-transition");
  el.style.backgroundColor = "yellow";

  window.getComputedStyle(el).opacity; // ;-;
  el.classList.remove("no-transition");

  el.style.backgroundColor = "";
}
