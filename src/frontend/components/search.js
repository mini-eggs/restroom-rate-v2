import { h } from "wigly";
import { WithRouter } from "../router";
import debounce from "lodash/debounce";
import xhr from "../packages/xhr";
import "./search.css";

var animationDuration = 400;

var Post = {
  mounted(el) {
    this.updateValue(el);
  },

  updated(el) {
    this.updateValue(el);
  },

  updateValue(el) {
    el.innerHTML = this.props.item.name
      .toLowerCase()
      .trim()
      .split(this.props.search.toLowerCase())
      .join(`<span>${this.props.search.toLowerCase()}</span>`);
  },

  render() {
    return <h1 />;
  }
};

var Search = {
  data() {
    return {
      class: "search-container",
      abort: () => {},
      posts: [],
      search: ""
    };
  },

  mounted(el) {
    setTimeout(() => {
      el.querySelector("input").focus();
    }, animationDuration);
  },

  async onSearch(event) {
    this.state.abort();
    var val = event.target.value;
    var req = xhr({ url: "/posts/search", method: "post", props: { name: val } });
    this.setState({ abort: () => req.abort(), search: val });
    this.setState({ posts: await req });
  },

  animateOut(url) {
    return () => {
      url && this.props.router.route(url);
      var close = () => setTimeout(this.closeModal, animationDuration);
      this.setState({ class: "search-container out" }, close);
    };
  },

  closeModal() {
    document.dispatchEvent(new CustomEvent("modal:close"));
  },

  render() {
    return (
      <div class={this.state.class}>
        <button onclick={this.animateOut()}>
          <i class="material-icons">close</i>
        </button>
        <form>
          <input
            autofocus
            autocomplete="off"
            type="text"
            name="search"
            placeholder="Try 'Seattle' or 'Starbucks'"
            oninput={debounce(this.onSearch, 250)}
          />
          {this.state.posts.map(post => (
            <a onclick={this.animateOut(`/discover/post/${post.id}`)}>
              <Post item={post} search={this.state.search} />
            </a>
          ))}
        </form>
      </div>
    );
  }
};

export default WithRouter(Search);
