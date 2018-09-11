import { h } from "wigly";
import Router from "./router";
import Nav from "./components/nav";
import ModalProvider from "./components/modal-provider";
import "./main.css";

export default {
  render() {
    return (
      <div id="app">
        <ModalProvider>
          <Router>
            <Nav />
          </Router>
        </ModalProvider>
      </div>
    );
  }
};
