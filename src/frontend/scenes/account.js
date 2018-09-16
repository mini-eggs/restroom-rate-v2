import { h } from "wigly";
import PostList from "../components/post-list";
import Note from "../components/note";
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

var YourPosts = {
  data() {
    return { posts: [] };
  },

  async mounted() {
    var posts = await xhr({ url: `/posts/author`, method: "post", props: this.props });
    this.setState({ posts });
  },

  render() {
    return (
      <div>
        {this.state.posts.length > 0 ? (
          <PostList posts={this.state.posts} />
        ) : (
          <Note title="Oops!" body="Looks like you haven't created a post yet." />
        )}
      </div>
    );
  }
};

var Account = {
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
        <Note title="Account" body="Update your account details." />
        {!this.state.loading ? (
          <form onsubmit={this.handleSubmit}>
            <input type="text" oninput={this.handleUsernameInput} placeholder="Username" />
            <input type="button" value="Submit" onclick={this.handleSubmit} />
          </form>
        ) : (
          <Loader />
        )}
        <Note title="Your Posts" body="Here's a list of your posts." />
        <YourPosts token={this.state.token} />
      </div>
    );
  }
};

export default EnsureUser(Account);
