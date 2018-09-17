import { h } from "wigly";
import WithRouter from "../containers/with-router";
import cache from "../packages/cache";
import "./post-list.css";

var createIntermediateTransition = ({ item }) => ({
  render() {
    return <img style={{ backgroundImage: `url(${item.image.medium})` }} src={item.image.large} />;
  }
});

var PostList = {
  handleClick(item) {
    return event => {
      event.preventDefault();
      event.stopPropagation();
      cache.selectedRate = item;
      var el = document.getElementById(`post-list-item-${item.id}`);
      var img = el.querySelector("img");
      var pos = img.getBoundingClientRect();
      var component = createIntermediateTransition({ item });
      document.dispatchEvent(new CustomEvent("shared-transition:start", { detail: { component, pos } }));
      this.props.router.route(`/discover/post/${item.id}`);
    };
  },

  render() {
    return (
      <div class="list">
        {this.props.posts.map(item => (
          <a id={`post-list-item-${item.id}`} key={item.id} onclick={this.handleClick(item)}>
            <button class="post">
              <img style={{ backgroundImage: `url(${item.image.medium})` }} src={item.image.large} />
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

export default WithRouter(PostList);
