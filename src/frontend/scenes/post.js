import { h } from "wigly";
import xhr from "../packages/xhr";
import "./post.css";

var Item = {
  data() {
    return { loaded: false };
  },

  onImageLoad() {
    this.setState({ loaded: true });
  },

  render() {
    return (
      <div class={this.state.loaded && "loaded"}>
        <img
          style={{ backgroundImage: `url(${this.props.post.thumbnail})` }}
          onclick={this.props.imageClick}
          src={this.props.post.image}
          onload={this.onImageLoad}
        />
        <article>
          <h1>{this.props.post.name}</h1>
        </article>
      </div>
    );
  }
};

var Post = {
  data() {
    return { post: null };
  },

  async mounted() {
    var post = await xhr({ url: `/posts/single/${this.props.id}`, method: "get" });
    this.setState({ post });
  },

  viewBigImage() {
    alert("todo");
  },

  render() {
    return (
      <div class="post-single">{this.state.post && <Item imageClick={this.viewBigImage} post={this.state.post} />}</div>
    );
  }
};

export default Post;
