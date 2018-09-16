import { h } from "wigly";
import Welcome from "./scenes/welcome";
import WithRouter from "./containers/with-router";
import "./router.css";

var routes = [
  { path: "/", component: () => Promise.resolve({ default: Welcome }) },
  { path: "/discover", component: () => import("./scenes/discover") },
  { path: "/discover/:category", component: () => import("./scenes/discover") },
  { path: "/discover/post/:id", component: () => import("./scenes/post") },
  { path: "/rate", component: () => import("./scenes/rate") },
  { path: "/account", component: () => import("./scenes/account") }
];

export default WithRouter({
  data() {
    return {
      component: null,
      path: undefined,
      props: {}
    };
  },

  mounted() {
    for (let { path, component } of routes) {
      this.props.router.on(path, props => this.handleRoute(component, props, path));
    }
    this.props.router.listen();
  },

  handleRoute(component, props, path) {
    if (path === this.state.path && JSON.stringify(props) === JSON.stringify(this.state.props)) {
      return;
    }

    this.setState({ component: null, props: {} }, async () => {
      window.scrollTo(0, 0);
      var file = await component();
      this.setState({ component: file.default, props, path });
    });
  },

  render() {
    return (
      <main>
        <div>{this.children}</div>
        <div>{this.state.component && <this.state.component {...this.state.props} />}</div>
      </main>
    );
  }
});
