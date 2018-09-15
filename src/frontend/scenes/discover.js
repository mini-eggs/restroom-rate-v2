import { h } from "wigly";
import xhr from "../packages/xhr";
// import throttle from "lodash/throttle";
import "./discover.css";

var throttle = f => f;

var Discover = {
  data() {
    return {
      page: 0,
      posts: [],
      stop: false
    };
  },

  mounted() {
    this.fetch();
    window.onscroll = throttle(this.handleScroll, 50);
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

  handleScroll() {
    var scroll = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    if (isNaN(scroll)) scroll = 0;

    if (document.body.scrollHeight - scroll - window.innerHeight * 2 < 0) {
      this.fetch(true);
    }
  },

  render() {
    return (
      <div class="list">
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

export default Discover;
