// Bootstrap's javascript has some really stupid stuff. For example:
// it requires jquery
// the close button on an alert actually deletes the element rather than hides it
// So this just removes those problems

var closeButtons:any = Array.from(document.getElementsByClassName("close"));
for (let el of closeButtons){
  el.onclick = closeAlert.bind(el);
}

function closeAlert(){
  this.parentNode.style.cssText += "display: none !important";
}
