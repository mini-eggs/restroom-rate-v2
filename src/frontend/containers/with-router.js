import { h } from "wigly";
import navaid from "navaid";

var router = new navaid("/", () => router.route("/"));

export default Component => ({
  render() {
    return (
      <Component router={router} {...this.props}>
        {this.children}
      </Component>
    );
  }
});
