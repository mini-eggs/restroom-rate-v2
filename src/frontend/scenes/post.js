import { h } from "wigly";
import xhr from "../packages/xhr";
import StarInput from "../components/star-input";
import StaticMap from "../components/static-map";
import "./post.css";
import WithRouter from "../containers/with-router";
import cache from "../packages/cache";

var copyText = text => {
  var el = document.createElement("input");
  el.value = `${text} ${location.href}`;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

var Item = {
  data() {
    return { loaded: false };
  },

  onImageLoad() {
    this.setState({ loaded: true });
  },

  onShare() {
    var text = `View "${this.props.post.name}" on Restroom Rate!`;
    if (typeof navigator.share === "function") {
      navigator.share({ title: text, url: location.href });
    } else {
      copyText(text);
      alert("Copied to clipboard.");
    }
  },

  async onLike() {
    if (cache.user) {
      var props = { post: this.props.post.id, token: cache.user.token };
      await xhr({ url: "/posts/like", method: "post", props });
      this.props.requestRefresh();
    } else {
      alert("Not logged in. Redirecting and creating account.");
      this.props.router.route("/");
    }
  },

  render() {
    return (
      <div class={this.state.loaded && "loaded"}>
        <img
          style={{ backgroundImage: `url(${this.props.post.image.medium})` }}
          onclick={this.props.imageClick}
          src={this.props.post.image.large}
          onload={this.onImageLoad}
        />
        <article>
          <div class="actions">
            <i class="icon" onclick={this.onShare}>
              share
            </i>
            <i class="icon" onclick={this.onLike}>
              thumb_up
            </i>
            <div>{this.props.post.likeCount} like(s)</div>
          </div>
          <h1>{this.props.post.name}</h1>
          <StarInput value={this.props.post.rating} length={5} />
          <p>{this.props.post.desc}</p>
          <h1>Location</h1>
          <StaticMap position={this.props.post} />
        </article>
      </div>
    );
  }
};

var Post = {
  data() {
    return { post: null };
  },

  mounted() {
    this.fetch();
  },

  async viewBigImage() {
    var ImageViewer = await import("../components/image-viewer");
    var detail = { component: ImageViewer.default, props: { post: this.state.post } };
    document.dispatchEvent(new CustomEvent("modal:open", { detail }));
  },

  async fetch() {
    var post = await xhr({ url: `/posts/single/${this.props.id}`, method: "get" });
    this.setState({ post });
  },

  onRefresh() {
    this.fetch();
  },

  render() {
    return (
      <div class="post-single">
        {this.state.post && (
          <Item requestRefresh={this.onRefresh} imageClick={this.viewBigImage} post={this.state.post} />
        )}
      </div>
    );
  }
};

export default WithRouter(Post);
