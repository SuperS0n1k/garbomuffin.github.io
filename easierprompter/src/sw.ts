// Based on the code on:
// https://developers.google.com/web/fundamentals/primers/service-workers/
// https://developers.google.com/web/fundamentals/codelabs/offline/

if ("serviceWorker" in navigator && location.href.indexOf("nosw") === -1) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then(() => {
      console.log("Registered Service Worker");
    });
  });
} else {
  console.log("Service Worker loading disabled (nosw)");
}
