import { h } from "wigly";
import PostList from "../components/post-list";
import Note from "../components/note";
import xhr from "../packages/xhr";
import throttle from "lodash/throttle";
import "./discover.css";

var Discover = {
  data() {
    return {
      page: 0,
      posts: [],
      stop: false,
      listener: undefined
    };
  },

  mounted() {
    this.fetch();
    var listener = throttle(this.handleScroll, 50);
    window.addEventListener("scroll", listener);
    this.setState({ listener });
  },

  destroyed() {
    window.removeEventListener("scroll", this.state.listener);
  },

  handleScroll() {
    var scroll = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    if (isNaN(scroll)) scroll = 0;

    if (document.body.scrollHeight - scroll - window.innerHeight * 2 < 0) {
      this.fetch(true);
    }
  },

  fetch(incrementPage = false) {
    if (this.state.loading || this.state.stop) return;

    var increment = incrementPage ? 1 : 0;
    var page = this.state.page + increment;
    var req = xhr({ url: `/posts?page=${page}`, method: "get" });

    this.setState({ page }, async () => {
      var next = await req;
      this.setState(({ posts }) => ({
        posts: [...posts, ...next],
        loading: false,
        stop: next.length < 1
      }));
    });
  },

  async onViewNearby() {
    var NearbyMap = await import("../components/neaby-map");
    document.dispatchEvent(new CustomEvent("modal:open", { detail: { component: NearbyMap.default } }));
  },

  render() {
    return (
      <div class="discover">
        <Note
          title="Discover"
          body="You're viewing a list of the most recent Restoom Rates submitted."
          action="Click here to view Restroom Rates near you."
          onaction={this.onViewNearby}
        />
        <PostList posts={this.state.posts} />
      </div>
    );
  }
};

export default Discover;
