import { h, component, render } from "wigly";
import Router from "./router";
import Nav from "./components/nav";
import "./main.css";

let App = component({
  render() {
    return (
      <div id="app">
        <Router>
          <Nav />
        </Router>
      </div>
    );
  }
});

render(App, document.body);

if (module.hot) {
  module.hot.accept();

  module.hot.dispose(() => {
    let el = document.getElementById("app");
    el.parentElement.removeChild(el);
  });
}

if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  navigator.serviceWorker.register("/sw.js");
}
