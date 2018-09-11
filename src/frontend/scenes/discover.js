import { h } from "wigly";
import xhr from "../packages/xhr";
import "./discover.css";

var Post = {
  render() {
    var { item } = this.props;

    return (
      <a href={`/discover/post/${item.id}`}>
        <button class="post">
          <img style={{ backgroundImage: `url(${item.thumbnail})` }} src={item.image} />
          <div class="content">
            <h3>{item.name}</h3>
          </div>
        </button>
      </a>
    );
  }
};

export default {
  data() {
    return { page: 0, posts: [] };
  },

  mounted() {
    this.fetch();
  },

  fetch() {
    if (this.state.loading) return;

    this.setState(
      () => ({ loading: true }),
      async () => {
        var posts = await xhr({ url: `/posts?page=${this.state.page}`, method: "get" });
        this.setState(() => ({ posts, loading: false }));
      }
    );
  },

  render() {
    return (
      <div class="list">
        {this.state.posts.map(item => (
          <Post item={item} />
        ))}
      </div>
    );
  }
};
