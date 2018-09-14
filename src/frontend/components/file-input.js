import { h } from "wigly";
import "./file-input.css";

var count = 0;
var unique = () => ++count;

export default {
  data() {
    return { id: unique() };
  },

  render() {
    var id = `file-input-${this.state.id}`;
    var classNames = "file-input-container";

    if (this.props.loading) {
      classNames += " loading";
    } else if (this.props.image) {
      classNames += " has-image";
    }

    return (
      <div class={classNames}>
        <label for={id}>{this.props.image && <img src={this.props.image} />}</label>
        <input id={id} type="file" onchange={this.props.oninput} accept=".jpeg,.jpg,.png" name="image" />
      </div>
    );
  }
};
