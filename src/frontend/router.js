import { h, component } from "wigly";
import navaid from "navaid";
import Welcome from "./scenes/welcome";
import "./router.css";

let routes = [
  { path: "/", component: () => Promise.resolve({ default: Welcome }) },
  { path: "/discover", component: () => import("./scenes/discover") },
  { path: "/discover/:category", component: () => import("./scenes/discover") },
  { path: "/rate", component: () => import("./scenes/rate") },
  { path: "/error", component: () => import("./scenes/error") },
  { path: "/account", component: () => import("./scenes/account") }
];

let router = new navaid("/", () => router.route("/discover"));

export let WithRouter = Component => {
  return component({
    render() {
      return <Component router={router} {...this.props} {...this.children} />;
    }
  });
};

export default component({
  data() {
    return { component: null, params: {} };
  },

  mounted() {
    for (let { path, component } of routes) {
      router.on(path, this.handleRoute(component));
    }
    router.listen();
  },

  handleRoute(f) {
    return async params => {
      let mod = await f();
      let component = mod.default;
      this.setState(() => ({ component, params }));
    };
  },

  render() {
    return (
      <div>
        {this.children}
        <main>{this.state.component && <this.state.component {...this.state.params} />}</main>
      </div>
    );
  }
});
