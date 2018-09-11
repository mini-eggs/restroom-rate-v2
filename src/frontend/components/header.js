import { h } from "wigly";
import ModalContainer from "../containers/modal";
import "./header.css";

var Header = {
  async onSearch() {
    var SearchModal = await import("./search");
    this.props.openModal(SearchModal.default);
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

export default ModalContainer(Header);
