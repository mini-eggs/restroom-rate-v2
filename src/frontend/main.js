import { render } from "wigly";
import App from "./app";

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function() {
    var el = document.getElementById("app");
    el.parentElement.removeChild(el);
  });
}

var main = () => {
  render(App, document.body);

  // if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  //   navigator.serviceWorker.register("/sw.js");
  // }
};

window.main = main;

// if (process.env.NODE_ENV !== "production") {
//   window.onerror = (...args) => {
//     alert(JSON.stringify(args));
//   };
// }
