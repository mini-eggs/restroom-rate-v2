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

  module.hot.dispose(data => {
    let el = document.getElementById("app");
    el.parentElement.removeChild(el);
  });
}
