import { h } from "wigly";
import "./post-list.css";

export default {
  render() {
    return (
      <div class="list">
        {this.props.posts.map(item => (
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
