import { h, component } from "wigly";
import throttle from "lodash/throttle";
import Header from "./header";
import Drawer from "./drawer";
import "./nav.css";

let NavLinks = component({
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
});

let initialState = {
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

let actions = {
  animationToggle: ({ drawer }) => ({ drawer: !drawer, drawerAnimating: true }),
  closeAll: () => ({ drawer: false, drawerAnimating: false })
};

export default component({
  data: () => ({ ...initialState }),

  mounted() {
    this.handleScroll = throttle(this.handleScroll, 16 * 10);
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    this.state.listener.off("scroll", this.handleScroll);
  },

  handleScroll(e) {
    let last = this.state.scroll;
    let scroll = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    let diff = Math.abs(scroll - last);
    let show = !(scroll > 50);
    this.setState(() => ({ scroll, show }));
  },

  onDrawerToggle() {
    this.setState(actions.animationToggle, this.afterAnimtion);
  },

  afterAnimtion() {
    if (!this.state.drawer) {
      setTimeout(() => this.setState(actions.closeAll), 250);
    }
  },

  render() {
    return (
      <div>
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
});
