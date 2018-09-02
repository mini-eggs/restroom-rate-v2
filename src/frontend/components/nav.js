import { h, component } from "wigly";
import Header from "./header";
import Drawer from "./drawer";
import "./nav.css";

export default component({
  data() {
    return {
      drawer: false,
      drawerAnimating: false,
      options: [
        { href: "/discover", test: url => url.includes("/discover"), title: "Discover" },
        { href: "/rate", test: url => url.includes("/rate"), title: "Rate" },
        { href: "/account", test: url => url.includes("/account"), title: "Account" }
      ]
    };
  },

  onDrawerToggle() {
    this.setState(
      ({ drawer }) => ({ drawer: !drawer, drawerAnimating: true }),
      () => {
        if (this.state.drawer) {
          setTimeout(() => {
            this.setState(() => ({ drawer: false, drawerAnimating: false }));
          }, 250);
        }
      }
    );
  },

  render() {
    let loc = location.pathname;

    return (
      <div>
        <Header onDrawerToggle={this.onDrawerToggle} />
        <Drawer
          onDrawerToggle={this.onDrawerToggle}
          active={this.state.drawer}
          animating={this.state.drawerAnimating}
        />
        <nav>
          {this.state.options.map(({ href, test, title }) => (
            <div class={test(loc) && "active"}>
              <a href={href}>{title}</a>
            </div>
          ))}
        </nav>
      </div>
    );
  }
});
