import { render } from "wigly";
import App from "./app";

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(function() {
    let el = document.getElementById("app");
    el.parentElement.removeChild(el);
  });
}

let main = () => {
  render(App, document.body);

  if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    navigator.serviceWorker.register("/sw.js");
  }
};

window.main = main;
