import { h } from "wigly";
import navaid from "navaid";
import Welcome from "./scenes/welcome";
import "./router.css";

var routes = [
  { path: "/", component: () => Promise.resolve({ default: Welcome }) },
  { path: "/discover", component: () => import("./scenes/discover") },
  { path: "/discover/:category", component: () => import("./scenes/discover") },
  { path: "/discover/post/:id", component: () => import("./scenes/post") },
  { path: "/rate", component: () => import("./scenes/rate") },
  { path: "/error", component: () => import("./scenes/error") },
  { path: "/account", component: () => import("./scenes/account") }
];

var router = new navaid("/", () => router.route("/discover"));

export var WithRouter = Component => {
  return {
    render() {
      return <Component router={router} {...this.props} {...this.children} />;
    }
  };
};

export default {
  data() {
    return { component: null, params: {} };
  },

  mounted() {
    for (let { path, component } of routes) {
      router.on(path, props => this.handleRoute(component, props));
    }
    router.listen();
  },

  handleRoute(f, params) {
    this.setState(
      () => ({ component: null, params: {} }),
      async () => {
        var mod = await f();
        var component = mod.default;
        this.setState(() => ({ component, params }));
      }
    );
  },

  render() {
    return (
      <div>
        {this.children}
        <main>{this.state.component && <this.state.component {...this.state.params} />}</main>
      </div>
    );
  }
};
