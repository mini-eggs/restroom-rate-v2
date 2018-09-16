import { h } from "wigly";
import "./note.css";

export default {
  render() {
    var { title, body, action, onaction } = this.props;

    return (
      <center>
        <div class="note">
          <h2>{title}</h2>
          <p>{body}</p>
          {action && <button onclick={onaction}>{action}</button>}
        </div>
      </center>
    );
  }
};
