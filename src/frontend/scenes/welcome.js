import { h } from "wigly";
import xhr from "../packages/xhr";
import cache from "../packages/cache";

var welcome = {
  data() {
    return { user: cache.user };
  },

  mounted() {
    if (!this.state.user) {
      this.createNewUser();
    }
  },

  async createNewUser() {
    var user = await xhr({ url: "/user", method: "post" });
    cache.user = user;
    this.setState({ user });
  },

  render() {
    if (!this.state.user) return null;

    return (
      <div>
        <h2>Hi, {this.state.user.username}!</h2>
      </div>
    );
  }
};

export default welcome;
