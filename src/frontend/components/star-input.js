import { h, component } from "wigly";
import "./star-input.css";

export default component({
  data: () => ({ active: [] }),

  handleClick(index) {
    let active = Array.from({ length: index + 1 }).map(() => true);
    this.setState(() => ({ active }), this.propogateInput);
  },

  propogateInput() {
    this.props.oninput(this.state.active.length);
  },

  render() {
    return (
      <div class="star-input">
        {Array.from({ length: this.props.length }).map((_, index) => {
          let className = this.state.active[index] ? "active" : "inactive"; // hmmmm. we might have an issue here
          return (
            <div onclick={() => this.handleClick(index)} class={className}>
              <i class="material-icons">star</i>
            </div>
          );
        })}
      </div>
    );
  }
});
