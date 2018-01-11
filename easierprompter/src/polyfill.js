// Older browsers do not have requestAnimationFrame
// so use a simple polyfill just to setTimeout to run the code in ~1 frame
// Adds support for: IE 9
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(func) {
    setTimeout(func, 1000 / 60);
  };
}
