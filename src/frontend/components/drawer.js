import { h } from "wigly";
import xhr from "../packages/xhr";
import cache from "../packages/cache";
import "./drawer.css";

var Drawer = {
  data() {
    return {
      categories: cache.categories || [],
      fetching: false
    };
  },

  updated() {
    if (this.state.categories.length < 1 && !this.state.fetching && this.props.active) {
      this.setState({ fetching: true }, this.fetch);
    }
  },

  async fetch() {
    var categories = await xhr({ url: "/categories", method: "get" });
    cache.categories = categories;
    this.setState({ categories, fetching: false });
  },

  render() {
    var { animating, active, onDrawerToggle } = this.props;
    if (!animating) return null;

    return (
      <div>
        <button class={active ? "background open" : "background closed"} onclick={onDrawerToggle} />
        <div class={active ? "drawer open" : "drawer closed"}>
          <div class="drawer-content">
            <img src={require("../assets/drawer-background.jpeg")} />
            <div onclick={this.props.onDrawerToggle}>
              {this.state.categories.map(({ href, title }) => (
                <div>
                  <a href={href}>{title}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default {
  render() {
    // this fixes double content exist bug in wigly. ANNOYING FIX TODO
    return <Drawer {...this.props}>{this.children}</Drawer>;
  }
};
