import { h } from "wigly";
import Router from "./router";
import Nav from "./components/nav";
import ModalProvider from "./components/modal-provider";
import SharedTransitionProvider from "./components/shared-transition-provider";
import "./main.css";

export default {
  render() {
    return (
      <SharedTransitionProvider>
        <ModalProvider>
          <Router>
            <Nav />
          </Router>
        </ModalProvider>
      </SharedTransitionProvider>
    );
  }
};
