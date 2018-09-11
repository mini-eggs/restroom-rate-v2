import { h } from "wigly";
import "./header.css";

export default {
  render() {
    return (
      <header>
        <h1>Restroom Rate</h1>
        <button class="left" onclick={this.props.onDrawerToggle}>
          <i class="material-icons">sort</i>
        </button>
        <button class="right">
          <i class="material-icons">search</i>
        </button>
      </header>
    );
  }
};
