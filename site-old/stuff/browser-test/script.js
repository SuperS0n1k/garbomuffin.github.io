document.addEventListener("DOMContentLoaded", function(){
  // Test for Javascript.
  document.getElementById("js-test").innerHTML = "Enabled!";
  // Test for cookies.
  if (navigator.cookieEnabled === true){
    document.getElementById("cookie-test").innerHTML = "Enabled!";
  }else{
      document.getElementById("cookie-test").innerHTML = "Disabled!";
  }
  // Get user agent, and set the text.
  document.getElementById("useragent").innerHTML = navigator.userAgent;
});
