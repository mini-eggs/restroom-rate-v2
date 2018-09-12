import { h } from "wigly";
import PostContianer from "../containers/post";
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
  mounted() {
    this.props.fetchPost(this.props.id);
  },

  destroyed() {
    this.props.clearPost();
  },

  viewBigImage() {
    alert("todo");
  },

  render() {
    return (
      <div class="post-single">{this.props.post && <Item imageClick={this.viewBigImage} post={this.props.post} />}</div>
    );
  }
};

// TODO: Fix upstream. Without this our url param updates will not propagate.
var ConnectedPost = PostContianer(Post);

export default {
  render() {
    return <ConnectedPost {...this.props} />;
  }
};
