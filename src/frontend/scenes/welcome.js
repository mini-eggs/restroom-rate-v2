import { h } from "wigly";
import PostList from "../components/post-list";
import Note from "../components/note";
import xhr from "../packages/xhr";
import cache from "../packages/cache";
import "./welcome.css";

var FeaturedPosts = {
  data() {
    return { posts: cache.featured || [] };
  },

  async mounted() {
    if (this.state.posts.length > 0) return;
    const posts = await xhr({ url: "/posts/featured", method: "get" });
    cache.featured = posts;
    this.setState({ posts });
  },

  render() {
    return <PostList posts={this.state.posts} />;
  }
};

var welcome = {
  data() {
    return cache;
  },

  mounted() {
    if (!this.state.user) {
      this.createNewUser();
    }
  },

  async createNewUser() {
    cache.user = await xhr({ url: "/user", method: "post" });
    this.setState(cache);
  },

  render() {
    if (!this.state.user) return;

    return (
      <div class="welcome-scene">
        <Note
          title={`Hi, ${this.state.user.username}!`}
          body="This name was likely auto generated for you. Yes, you already have an account! You can change this on the `Account` tab above."
        />
        <Note
          title="Featured Posts"
          body="Navigate to our Discover tab to view more, or open up the drawer and choose from specific categories and regions."
        />
        <FeaturedPosts />
      </div>
    );
  }
};

export default welcome;
