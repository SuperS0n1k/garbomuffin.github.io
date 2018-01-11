// To avoid spambots, emails are not directly in the HTML
// They are injected with javascript and some VERY simple "encryption"

// Shifted one letter to the left and stored in an array.
// No spambots are getting this unless they literally execute the page.

var emailEncoded = [
  "o", "m", "m", "y", "w", "e", "b", "e", "r", "3", "3", "@", "g", "m", "a", "i", "l", ".", "c", "o", "m", "t",
].join("");
var email = emailEncoded[emailEncoded.length - 1];
for (var i = 0; i < emailEncoded.length - 1; i++) {
  email += emailEncoded[i];
}

var els = document.getElementsByClassName("email");
if (els) {
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    el.textContent = email;
    el.href = "mailto:" + email;
  }
}


