import { h, component } from "wigly";
import xhr from "../packages/xhr";
import "./discover.css";

let Post = component({
  render() {
    let { item } = this.props;

    return (
      <a href={`/discover/post/${item.id}`}>
        <button class="post">
          <img src={item.image} />
          <div class="content">
            <h3>{item.name}</h3>
          </div>
        </button>
      </a>
    );
  }
});

export default component({
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
        let posts = await xhr({ url: `/posts?page=${this.state.page}`, method: "get" });
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
});
