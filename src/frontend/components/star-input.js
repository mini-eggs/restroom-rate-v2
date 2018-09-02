import { h, component } from "wigly";
import "./star-input.css";

export default component({
  data() {
    return { active: [] };
  },

  handleClick(index) {
    let active = Array.from({ length: index + 1 }).map(() => true);
    this.props.oninput(active.length);
    this.setState(() => ({ active }));
  },

  render() {
    return (
      <div class="star-input">
        {Array.from({ length: this.props.length }).map((_, index) => (
          <div onclick={() => this.handleClick(index)} class={this.state.active[index] ? "active" : ""}>
            <i class="material-icons">star</i>
          </div>
        ))}
      </div>
    );
  }
});
