import { h } from "wigly";
import throttle from "lodash/throttle";
import Header from "./header";
import Drawer from "./drawer";
import "./nav.css";

var NavLinks = {
  render() {
    return (
      <nav class={this.props.class}>
        {this.props.options.map(({ href, test, title }) => (
          <div class={test(location.pathname) && "active"}>
            <a href={href}>{title}</a>
          </div>
        ))}
      </nav>
    );
  }
};

var initialState = {
  drawer: false,
  drawerAnimating: false,
  scroll: 0,
  show: true,
  options: [
    { href: "/discover", test: url => url.includes("/discover"), title: "Discover" },
    { href: "/rate", test: url => url.includes("/rate"), title: "Rate" },
    { href: "/account", test: url => url.includes("/account"), title: "Account" }
  ]
};

export default {
  data: () => ({ ...initialState }),

  mounted() {
    this.handleScroll = throttle(this.handleScroll, 16 * 10);
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  handleScroll(e) {
    var last = this.state.scroll;
    var scroll = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    if (isNaN(scroll)) scroll = 0;
    var diff = Math.abs(scroll - last);
    var show = !(scroll > 50);
    this.setState({ scroll, show });
  },

  onDrawerToggle() {
    this.setState(({ drawer }) => ({ drawer: !drawer, drawerAnimating: true }), this.afterAnimtion);
  },

  afterAnimtion() {
    if (!this.state.drawer) {
      setTimeout(() => this.setState({ drawer: false, drawerAnimating: false }), 250);
    }
  },

  render() {
    return (
      <div style={{ zIndex: 3, position: "relative" }}>
        <Header onDrawerToggle={this.onDrawerToggle} />
        <Drawer
          onDrawerToggle={this.onDrawerToggle}
          active={this.state.drawer}
          animating={this.state.drawerAnimating}
        />
        <NavLinks class={this.state.show ? "" : "hiding"} options={this.state.options} />
      </div>
    );
  }
};
