import { h, component } from "wigly";
import ErrorConnect from "../containers/error";

let msg = "Wow, we really messed up. We don't even have an error message for you.";

let error = component({
  destroyed() {
    this.props.clearErrorMessages();
  },

  render() {
    return (
      <div class="abs-full">
        <div style={{ margin: "0 15px" }}>
          <h2>:(</h2>
          <h2>{this.props.err.msg || msg}</h2>
          {this.props.err.action && <a href={this.props.err.action.uri}>{this.props.err.action.text}</a>}
        </div>
      </div>
    );
  }
});

export default ErrorConnect(error);
