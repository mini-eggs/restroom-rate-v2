import { h } from "wigly";
import EnsureUser from "../containers/ensure-user";
import cache from "../packages/cache";
import xhr from "../packages/xhr";
import "./account.css";

var sleep = t => new Promise(r => setTimeout(r, t));

var Loader = {
  render() {
    return (
      <center>
        <h2>...</h2>
      </center>
    );
  }
};

var account = {
  data() {
    return { ...cache.user, loading: false };
  },

  handleUsernameInput(event) {
    this.setState({ username: event.target.value });
  },

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ loading: true });
    var req = xhr({ url: "/user", method: "patch", props: this.state });
    var [user, _] = await Promise.all([req, sleep(1000)]);
    cache.user = user;
    this.setState({ ...user, loading: false });
  },

  render() {
    return (
      <div class="account-scene">
        <center>
          <h2>Account</h2>
        </center>
        {!this.state.loading ? (
          <form onsubmit={this.handleSubmit}>
            <input type="text" oninput={this.handleUsernameInput} placeholder="Username" />
            <input type="button" value="Submit" onclick={this.handleSubmit} />
          </form>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
};

export default EnsureUser(account);
