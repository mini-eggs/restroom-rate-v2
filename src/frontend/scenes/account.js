import { h } from "wigly";
import EnsureUser from "../containers/ensure-user";

var account = {
  render() {
    return (
      <div>
        <h2>Account</h2>
      </div>
    );
  }
};

export default EnsureUser(account);
