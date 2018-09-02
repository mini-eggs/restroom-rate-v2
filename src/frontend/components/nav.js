import { h, component } from "wigly";
import Header from "./header";
import Drawer from "./drawer";
import "./nav.css";

let NavLinks = component({
  render() {
    return (
      <nav>
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
        <NavLinks options={this.state.options} />
      </div>
    );
  }
});
