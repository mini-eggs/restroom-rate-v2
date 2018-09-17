import { h } from "wigly";
import "./image-viewer.css";
import { animationDuration } from "../constants";

var ImageViewer = {
  data() {
    return { class: "image-viewer" };
  },

  animateOut() {
    var close = () => setTimeout(this.closeModal, animationDuration);
    this.setState({ class: "image-viewer out" }, close);
  },

  closeModal() {
    document.dispatchEvent(new CustomEvent("modal:close"));
  },

  render() {
    var post = this.props.post;

    return (
      <div class={this.state.class}>
        <button onclick={this.animateOut}>
          <i class="material-icons">close</i>
        </button>
        <img style={{ backgroundImage: `url(${post.image.large})` }} src={post.image.original} />
      </div>
    );
  }
};

export default ImageViewer;
