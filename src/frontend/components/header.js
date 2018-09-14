import { h } from "wigly";
import "./header.css";

var Header = {
  async onSearch() {
    var SearchModal = await import("./search");
    document.dispatchEvent(new CustomEvent("modal:open", { detail: { component: SearchModal.default } }));
  },

  render() {
    return (
      <header>
        <h1>Restroom Rate</h1>
        <button class="left" onclick={this.props.onDrawerToggle}>
          <i class="material-icons">sort</i>
        </button>
        <button class="right" onclick={this.onSearch}>
          <i class="material-icons">search</i>
        </button>
      </header>
    );
  }
};

export default Header;
