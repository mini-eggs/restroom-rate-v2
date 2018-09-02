import { h, component } from "wigly";
import Router from "./router";
import Nav from "./components/nav";
import "./main.css";

export default component({
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
