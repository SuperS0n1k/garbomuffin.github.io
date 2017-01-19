var asciilst = [" ","!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~","£"];

function DecodeStr(){
  var text = document.getElementById("dec_val").value;
  var decode = "";
  var ii = 0;
  var cc = text.charAt(ii) + text.charAt(ii + 1) - 1;
  while (cc !== ''){
    if (cc !== "00" && cc !== "99"){
      decode = decode + asciilst[cc];
    }
    ii = ii + 2;
    cc = text.charAt(ii) + text.charAt(ii+1);
    if (cc > 0){
      cc = cc - 1;
    }
  }
  document.getElementById("dec_span").style.display = "inline";
  document.getElementById("dec_ans").value = decode;
  return decode;
}

function EncodeStr(){
  var text = document.getElementById("enc_val").value;
  var encode = "";
  var ii = 0;
  var r = 0;
  var cc = 0;
  while (r < text.length){
    while (true){
      if (asciilst[cc - 1] === text.charAt(ii)){
        break;
      }else{
        if (cc < 95){
          cc = cc + 1;
        }else{
          cc = 0;
          break;
        }
      }
    }
    cc = cc.toString();
    if (cc.length == 2){
      encode = encode + cc;
    }else if (cc.length == 1){
      encode = encode + "0" + cc;
    }else{
      encode = encode + "99";
    }
    ii = ii + 1;
    cc = 1;
    r = r + 1;
  }
  encode = encode + "00";
  document.getElementById("enc_span").style.display = "inline";
  document.getElementById("enc_ans").value = encode;
  return encode;
}
