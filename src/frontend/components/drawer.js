import { h, component } from "wigly";
import CategoriesContainer from "../containers/categories";
import "./drawer.css";

let Drawer = component({
  mounted() {
    if (this.props.categories.length < 1) {
      this.props.fetchCategories();
    }
  },

  render() {
    let { animating, active, onDrawerToggle } = this.props;
    if (!animating) return null;

    return (
      <div>
        <button class={active ? "background open" : "background closed"} onclick={onDrawerToggle} />
        <div class={active ? "drawer open" : "drawer closed"}>
          <div class="drawer-content">
            <img src={require("../assets/drawer-background.jpeg")} />
            <div onclick={this.props.onDrawerToggle}>
              {this.props.categories.map(({ href, title }) => (
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
});

export default CategoriesContainer(Drawer);
