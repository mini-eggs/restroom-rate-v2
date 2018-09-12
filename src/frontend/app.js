import { h } from "wigly";
import Router from "./router";
import Nav from "./components/nav";
import ModalProvider from "./components/modal-provider";
import "./main.css";

export default {
  render() {
    return (
      <Router>
        <ModalProvider>
          <Nav />
        </ModalProvider>
      </Router>
    );
  }
};
