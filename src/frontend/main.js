import { render } from "wigly";
import { install } from "offline-plugin/runtime";
import App from "./app";

render(App, document.body);
install();

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    var el = document.getElementById("app");
    el.parentElement.removeChild(el);
  });
}
