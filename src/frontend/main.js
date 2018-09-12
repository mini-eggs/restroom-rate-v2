import { render } from "wigly";
import App from "./app";

render(App, document.body);

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    var el = document.getElementById("app");
    el.parentElement.removeChild(el);
  });
}
