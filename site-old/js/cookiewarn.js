document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("cookiewarn").style.display = "none";
});

// removed

// function hideCookieWarn(){
//   document.cookie="cookies=true; expires=Fri, 1 Jan 2100 12:00:00 UTC; path=/;";
//   document.getElementById("cookiewarn").style.display = "none";
// }
// document.addEventListener("DOMContentLoaded", function(){
//   if (document.cookie.indexOf("cookies=true") !== -1){
//     document.getElementById("cookiewarn").style.display = "none";
//   }else{
//     document.getElementById("cookiewarn").style.fontWeight = "bold";
//     document.getElementById("cookiewarn").style.fontSize = "2em";
//     document.getElementById("cookiewarn").style.fontFamily = "sans-serif";
//   }
// });
