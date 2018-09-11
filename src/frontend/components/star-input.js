import { h } from "wigly";
import "./star-input.css";

export default {
  data() {
    return {
      items: Array.from({ length: this.props.length }).map(() => false)
    };
  },

  handleClick(x) {
    var items = this.state.items.map((_, y) => y <= x);
    var value = items.filter(Boolean).length;
    this.setState(() => ({ items }), () => this.props.oninput(value));
  },

  render() {
    return (
      <div class="star-input">
        {this.state.items.map((status, index) => (
          <div onclick={() => this.handleClick(index)} class={status ? "active" : ""}>
            <i class="material-icons">star</i>
          </div>
        ))}
      </div>
    );
  }
};
