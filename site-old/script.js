window.onload = function(){
  document.getElementById("tri-lnk").onclick = function(){
    getLink("tri");
  };
  document.getElementById("stuff-lnk").onclick = function(){
    getLink("stuff");
  };
  document.getElementById("jkfox-lnk").onclick = function(){
    getLink("jkfox");
  };
};
function getLink(link){
  location.replace("#" + link);
}
