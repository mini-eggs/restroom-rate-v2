import { h } from "wigly";
import "./shared-transition-provider.css";
import { animationDuration } from "../constants";

export var isTransitioning = () => {
  return document.querySelector(".shared-transition-container") !== null;
};

var TransitionItem = {
  data() {
    return { pos: this.props.pos };
  },

  mounted(el) {
    this.transform(el, this.state.pos);
  },

  updated(el) {
    if (
      this.state.pos.left !== this.props.pos.top &&
      this.state.pos.left !== this.props.pos.left &&
      this.state.pos.width !== this.props.pos.width &&
      this.state.pos.height !== this.props.pos.height
    ) {
      this.transform(el, this.props.pos);
      setTimeout(this.props.onend, animationDuration);
    }
  },

  transform(el, { height, width, top, left }) {
    el.style.height = `${height}px`;
    el.style.width = `${width}px`;
    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
  },

  render() {
    return <div class="shared-transition-container">{this.children}</div>;
  }
};

export default {
  data() {
    return {
      component: null,
      pos: null
    };
  },

  mounted() {
    document.addEventListener("shared-transition:start", this.start);
    document.addEventListener("shared-transition:end", this.end);
  },

  start(event) {
    var { component, pos } = event.detail;
    this.setState({ component, pos });
  },

  end(event) {
    this.setState({ pos: event.detail.pos });
  },

  animationComplete() {
    document.dispatchEvent(new CustomEvent("shared-transition:client:end"));
    this.setState({ component: null, pos: null });
  },

  render() {
    return (
      <div>
        <div>{this.children}</div>
        <div>
          {this.state.component && (
            <TransitionItem pos={this.state.pos} onend={this.animationComplete}>
              <this.state.component />
            </TransitionItem>
          )}
        </div>
      </div>
    );
  }
};
