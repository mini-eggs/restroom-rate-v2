import { h, component } from "wigly";
import EnsureUser from "../containers/ensure-user";

let account = component({
  render() {
    return (
      <div class="abs-full">
        <h2>Account</h2>
      </div>
    );
  }
});

export default EnsureUser(account);
