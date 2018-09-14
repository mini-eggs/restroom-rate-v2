import { h } from "wigly";
import WithRouter from "../containers/with-router";
import cache from "../packages/cache";

export default Component =>
  WithRouter({
    mounted() {
      if (!cache.user) {
        setTimeout(this.handleNoUser, 1); // next tick
      }
    },

    handleNoUser() {
      this.props.router.route("/");
    },

    render() {
      return <Component {...this.props} {...this.children} />;
    }
  });
