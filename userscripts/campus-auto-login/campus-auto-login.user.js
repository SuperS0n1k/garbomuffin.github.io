// ==UserScript==
// @name         Campus Auto-Login
// @version      2.2
// @description  Auto log-in to the District112 campus portal.
// @author       GarboMuffin
// @match        https://campus.district112.org/campus/portal/isd112.jsp*
// @match        https://campus.district112.org/campus/portal/students/isd112.jsp*
// @namespace    https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/
// @downloadURL  https://garbomuffin.bitbucket.io/userscripts/campus-auto-login/campus-auto-login.user.js
// ==/UserScript==

(function() {
  'use strict';

  const usingNewSite = location.href.indexOf("students") > -1;

  function Cookie(c_name){
    if (document.cookie.length > 0){
      var c_start = document.cookie.indexOf(c_name + "=");
      if (c_start !== -1){
        c_start = c_start + c_name.length + 1;
        var c_end = document.cookie.indexOf(";", c_start);
        if (c_end === -1){
          c_end = document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return "";
  }

  function invalidCredentials(){
    if (usingNewSite){
      return document.location.href.indexOf("status=error") > -1;
    }else{
      return document.location.href.indexOf("status=password-error") > -1;
    }
  }

  function shouldSignin(){
    if (usingNewSite){
      return !invalidCredentials();
    }else{
      return !invalidCredentials() && document.location.href.indexOf("status=portalLogoff") === -1;
    }
  }

  function clickSubmit(){
    if (usingNewSite){
      document.getElementsByClassName("success block")[0].click();
    }else{
      document.getElementById("signinbtn").click();
    }
  }

  function setCredentials(username, password){
    document.getElementById("username").value = username;
    document.getElementById("password").value = password;
  }

  if (invalidCredentials()){
    alert("Detected incorrect credentials, reseting.");
    document.cookie="pid=;";
    document.cookie="uid=;";
  }

  var username = "";
  var password = "";
  if (Cookie("pid") === "" || Cookie("uid") === ""){
    username = prompt("Set username:") || "";
    password = prompt("Set password:") || "";

    var encodedUsername = btoa(username);
    var encodedPassword = btoa(password);
    document.cookie="uid=" + encodedUsername + "; expires=Mon, 1 Jan 3100 12:00:00 UTC;";
    document.cookie="pid=" + encodedPassword + "; expires=Mon, 1 Jan 3100 12:00:00 UTC;";
  }else{
    username = atob(Cookie("uid"));
    password = atob(Cookie("pid"));
  }

  if (username === "" || password === ""){
    alert("Either username or password is empty. Aborting.");
    return;
  }

  setCredentials(username, password);

  if (shouldSignin()){
    clickSubmit();
  }
})();
