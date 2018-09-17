import { h } from "wigly";
import { sleep } from "../constants";
import Switch from "../components/switch";
import Loader from "../components/loader";
import PostList from "../components/post-list";
import Note from "../components/note";
import EnsureUser from "../containers/ensure-user";
import cache from "../packages/cache";
import xhr from "../packages/xhr";
import "./account.css";

var UpdateDetails = {
  data: () => ({
    username: "",
    loading: false
  }),

  handleInput(event) {
    this.setState({ username: event.target.value });
  },

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    var username = this.state.username;
    var token = cache.user.token;

    if (username) {
      this.setState({ loading: true });
      var req = xhr({ url: "/user", method: "patch", props: { token, username } });
      var [user, _] = await Promise.all([req, sleep(750)]);
      cache.user = user;
      this.setState({ loading: false });
    }
  },

  render() {
    return (
      <Switch>
        {[this.state.loading, <Loader />]}
        {[true, this.renderForm()]}
      </Switch>
    );
  },

  renderForm() {
    return (
      <form onsubmit={this.handleSubmit}>
        <input type="text" placeholder="Username" oninput={this.handleInput} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
};

var YourPosts = {
  data() {
    return { posts: [], loading: true };
  },

  async mounted() {
    var token = cache.user.token;
    var req = xhr({ url: `/posts/author`, method: "post", props: { token } });
    var [posts, _] = await Promise.all([req, sleep(750)]);
    this.setState({ posts, loading: false });
  },

  render() {
    return (
      <Switch>
        {[this.state.loading, <Loader />]}
        {[this.state.posts.length > 0, <PostList posts={this.state.posts} />]}
        {[true, <Note title="Oops!" body="Looks like you haven't created a post yet." />]}
      </Switch>
    );
  }
};

var Account = {
  render() {
    return (
      <div class="account-scene">
        <Note title="Account" body="Update your account details." />
        <UpdateDetails />
        <Note title="Your Posts" body="Here's a list of your posts." />
        <YourPosts />
      </div>
    );
  }
};

export default EnsureUser(Account);
