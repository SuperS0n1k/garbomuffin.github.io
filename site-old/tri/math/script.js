document.addEventListener("DOMContentLoaded", function(event) {
  setValues();
  checkURL();
  Reset();
  window.onhashchange = checkURL;
});
function checkURL(){
  url = url = window.location.href;
  if (url.indexOf("#ke") > -1){
    setMode("ke");
  }else if(url.indexOf("#fma") > -1){
    setMode("fma");
  }else if(url.indexOf("#quad") > -1){
    setMode("quad");
  }else if(url.indexOf("#dist") > -1){
    setMode("dist");
  }
}
function Cookie(c_name){
  if (document.cookie.length > 0){
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start !== -1){
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end === -1){
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}
function resetMode(mode){
  document.cookie="reset_mode=" + mode + "; expires=Fri, 1 Jan 2100 12:00:00 UTC";
  if (mode === "blank"){
    window.reset = "";
  }else if (mode === "zero"){
    window.reset = "0";
  }else if (mode === "custom"){
    window.reset = prompt('Set to:\n(this will not save for future visits)');
  }
  Reset();
}
function Reset(){
  document.getElementById("one-val").value = reset;
  document.getElementById("two-val").value = reset;
  document.getElementById("three-val").value = reset;
  document.getElementById("four-val").value = reset;
  document.getElementById("ans").innerHTML = "";
  document.getElementById("formula").innerHTML = "";
}
function Dropdown(){
  document.getElementById("Dropdown").classList.toggle("show");
}
window.onclick = function(event){
  if (!event.target.matches('.dropbtn')){
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++){
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')){
        openDropdown.classList.remove('show');
      }
    }
  }
};
function Solve(){
  if (mode === "fma"){
    document.getElementById("formula").innerHTML = "";
    document.getElementById("ans").innerHTML = "";
    var fmar_f = Number(document.getElementById("three-val").value);
    var fmar_m = Number(document.getElementById("one-val").value);
    var fmar_a = Number(document.getElementById("two-val").value);
    if (fmar_f === 0){
      document.getElementById("three-val").value = fmar_m * fmar_a;
      document.getElementById("formula").innerHTML = "Formula: F=MA";
      document.getElementById("ans").innerHTML = fmar_m * fmar_a + " N";
    }else if (fmar_a === 0){
      document.getElementById("two-val").value = fmar_f / fmar_m;
      document.getElementById("formula").innerHTML = "Formula: F=MA";
      document.getElementById("ans").innerHTML = fmar_f / fmar_m + " m/s/s";
    }else if (fmar_m === 0){
      document.getElementById("three-val").value = fmar_f / fmar_a;
      document.getElementById("formula").innerHTML = "Formula: F=MA";
      document.getElementById("ans").innerHTML = fmar_f / fmar_a + " kg";
    }else if (fmar_m * fmar_a === fmar_f){
      document.getElementById("formula").innerHTML = "Formula: F=MA";
      document.getElementById("ans").innerHTML = "Provided numbers do work.";
    }else if (fmar_m * fmar_a !== fmar_f){
      document.getElementById("formula").innerHTML = "Formula: F=MA";
      document.getElementById("ans").innerHTML = "Provided numbers do NOT work. (long decimals or rounding may lead to inaccuracy)";
    }
  }else if (mode === "ke"){
    document.getElementById("formula").innerHTML = "";
    document.getElementById("ans").innerHTML = "";
    var ker_e = Number(document.getElementById("one-val").value);
    var ker_m = Number(document.getElementById("two-val").value);
    var ker_v = Number(document.getElementById("three-val").value);
    if (ker_v === 0){
      document.getElementById("three-val").value = Math.sqrt((2 * ker_e) / ker_m);
      document.getElementById("formula").innerHTML = "Formula: KE=0.5mv^2";
      document.getElementById("ans").innerHTML = Math.sqrt((2 * ker_e) / ker_m) + " m/s";
    }else if (ker_m === 0){
      document.getElementById("two-val").value = (2 * ker_e) / (ker_v * ker_v);
      document.getElementById("formula").innerHTML = "Formula: KE=0.5mv^2";
      document.getElementById("ans").innerHTML = (2 * ker_e) / (ker_v * ker_v) + " kg";
    }else if (ker_e === 0){
      document.getElementById("one-val").value = (0.5 * ker_m) * (ker_v * ker_v);
      document.getElementById("formula").innerHTML = "Formula: KE=0.5mv^2";
      document.getElementById("ans").innerHTML = (0.5 * ker_m) * (ker_v * ker_v) + " J";
    }else if ((0.5 * ker_m) * (ker_v * ker_v) === ker_e){
      document.getElementById("ans").innerHTML = "Provided numbers do work.";
      document.getElementById("formula").innerHTML = "Formula: KE=0.5mv^2";
    }else{
      document.getElementById("ans").innerHTML = "Provided numbers do NOT work. (long decimals or rounding may lead to inaccuracy)";
      document.getElementById("formula").innerHTML = "Formula: KE=0.5mv^2";
    }
  }else if (mode === "quad"){
    var quad_a = Number(document.getElementById("one-val").value);
    var quad_b = Number(document.getElementById("two-val").value);
    var quad_c = Number(document.getElementById("three-val").value);
    document.getElementById("ans").innerHTML = (((-1 * quad_b) + Math.sqrt((quad_b * quad_b) - (4 * quad_a * quad_c))) / (2 * quad_a)) + ", " + (((-1 * quad_b) - Math.sqrt((quad_b * quad_b) - (4 * quad_a * quad_c))) / (2 * quad_a));
    document.getElementById("formula").innerHTML = "Formula: (-b +- sqrt(b^2-4ac))/2a";
  }else if (mode === "dist"){
    var dist_x1 = Number(document.getElementById("one-val").value);
    var dist_y1 = Number(document.getElementById("two-val").value);
    var dist_x2 = Number(document.getElementById("three-val").value);
    var dist_y2 = Number(document.getElementById("four-val").value);
    document.getElementById("ans").innerHTML = Math.sqrt((dist_x2 - dist_x1) * (dist_x2 - dist_x1) + (dist_y2 - dist_y1) * (dist_y2 - dist_y1));
    document.getElementById("formula").innerHTML = "Formula: sqrt((x2-x1)^2+(y2-y1)^2)";
  }
}
function setMode(setMode){
  if (setMode === "fma"){
    document.cookie="last_mode=fma; expires=Fri, 1 Jan 2100 12:00:00 UTC";
  }else if (setMode === "ke"){
    document.cookie="last_mode=ke; expires=Fri, 1 Jan 2100 12:00:00 UTC";
  }else if (setMode === "quad"){
    document.cookie="last_mode=quad; expires=Fri, 1 Jan 2100 12:00:00 UTC";
  }else if (setMode === "dist"){
    document.cookie="last_mode=dist; expires=Fri, 1 Jan 2100 12:00:00 UTC";
  }
  setValues();
  Reset();
}
function setValues(){
  if (Cookie("last_mode") === "fma"){
    window.mode = "fma";
    document.getElementById("one-type").innerHTML = "Mass (kg): ";
    document.getElementById("two-type").innerHTML = "Acceleration (m/s/s): ";
    document.getElementById("three-type").innerHTML = "Force (N): ";
    document.getElementById("one-val").style.display = "inline";
    document.getElementById("one-type").style.display = "inline";
    document.getElementById("two-val").style.display = "inline";
    document.getElementById("two-type").style.display = "inline";
    document.getElementById("two-val").style.display = "inline";
    document.getElementById("two-type").style.display = "inline";
    document.getElementById("four-val").style.display = "none";
    document.getElementById("four-type").style.display = "none";
    document.getElementById("resetmsg").style.display = "inline";
  }else if (Cookie("last_mode") === "ke"){
    window.mode = "ke";
    document.getElementById("one-type").innerHTML = "Kinetic Energy (J): ";
    document.getElementById("two-type").innerHTML = "Mass (kg): ";
    document.getElementById("three-type").innerHTML = "Velocity (m/s): ";
    document.getElementById("one-val").style.display = "inline";
    document.getElementById("one-type").style.display = "inline";
    document.getElementById("two-val").style.display = "inline";
    document.getElementById("two-type").style.display = "inline";
    document.getElementById("two-val").style.display = "inline";
    document.getElementById("two-type").style.display = "inline";
    document.getElementById("four-val").style.display = "none";
    document.getElementById("four-type").style.display = "none";
    document.getElementById("resetmsg").style.display = "inline";
  }else if (Cookie("last_mode") === "quad"){
    window.mode = "quad";
    document.getElementById("one-type").innerHTML = "a=";
    document.getElementById("two-type").innerHTML = "b=";
    document.getElementById("three-type").innerHTML = "c=";
    document.getElementById("one-val").style.display = "inline";
    document.getElementById("one-type").style.display = "inline";
    document.getElementById("two-val").style.display = "inline";
    document.getElementById("two-type").style.display = "inline";
    document.getElementById("two-val").style.display = "inline";
    document.getElementById("two-type").style.display = "inline";
    document.getElementById("four-val").style.display = "none";
    document.getElementById("four-type").style.display = "none";
    document.getElementById("resetmsg").style.display = "none";
  }else if (Cookie("last_mode") === "dist"){
    window.mode = "dist";
    document.getElementById("one-type").innerHTML = "x1=";
    document.getElementById("two-type").innerHTML = "y1=";
    document.getElementById("three-type").innerHTML = "x2=";
    document.getElementById("four-type").innerHTML = "y2=";
    document.getElementById("one-val").style.display = "inline";
    document.getElementById("one-type").style.display = "inline";
    document.getElementById("two-val").style.display = "inline";
    document.getElementById("two-type").style.display = "inline";
    document.getElementById("two-val").style.display = "inline";
    document.getElementById("two-type").style.display = "inline";
    document.getElementById("four-val").style.display = "inline";
    document.getElementById("four-type").style.display = "inline";
    document.getElementById("resetmsg").style.display = "none";
  }else{
    window.mode = "fma";
    document.getElementById("one-type").innerHTML = "Mass (kg): ";
    document.getElementById("two-type").innerHTML = "Acceleration (m/s/s): ";
    document.getElementById("three-type").innerHTML = "Force (N): ";
    document.getElementById("one-val").style.display = "inline";
    document.getElementById("one-type").style.display = "inline";
    document.getElementById("two-val").style.display = "inline";
    document.getElementById("two-type").style.display = "inline";
    document.getElementById("two-val").style.display = "inline";
    document.getElementById("two-type").style.display = "inline";
    document.getElementById("four-val").style.display = "none";
    document.getElementById("four-type").style.display = "none";
    document.getElementById("resetmsg").style.display = "inline";
  }
  if (Cookie("reset_mode") === "blank"){
    window.reset = "";
  }else if (Cookie("reset_mode") === "zero"){
    window.reset = "0";
  }else{
    window.reset = "0";
  }
}
