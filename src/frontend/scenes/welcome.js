import { h } from "wigly";
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
    if (!this.state.posts.lenth < 1) return null;
    return (
      <div class="list" style={{ margin: "-10px", padding: 0, marginTop: "15px" }}>
        {this.state.posts.map(item => (
          <a key={item.id} href={`/discover/post/${item.id}`}>
            <button class="post">
              <img style={{ backgroundImage: `url(${item.image.medium})` }} src={item.image.medium} />
              <div class="content">
                <h3>{item.name}</h3>
              </div>
            </button>
          </a>
        ))}
      </div>
    );
  }
};

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
      <div class="welcome-scene">
        <center>
          <h2>Hi, {this.state.user.username}!</h2>
          <p>
            This name was likely auto generated for you (yes you already have an account!). You can change this on the
            `Account` tab above.
          </p>
        </center>

        <article>
          <h2>Featured Posts</h2>
          <FeaturedPosts />
        </article>
      </div>
    );
  }
};

export default welcome;
