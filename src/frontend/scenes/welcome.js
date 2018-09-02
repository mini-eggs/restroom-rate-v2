import { h, component } from "wigly";
import UserConnect from "../containers/users";

let welcome = component({
  mounted() {
    if (this.props.shouldCreateNewUser) {
      this.props.createNewUser();
    }
  },

  render() {
    if (!this.props.user) return null;

    return (
      <div class="abs-full">
        <h2>Hi, {this.props.user.username}!</h2>
      </div>
    );
  }
});

export default UserConnect(welcome);
