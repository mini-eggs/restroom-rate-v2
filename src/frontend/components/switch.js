import { h } from "wigly";

var Switch = {
  render() {
    var comp = null;

    for (var e = 0; e < this.children.length; e += 2) {
      if (!comp && this.children[e]) {
        comp = this.children[e + 1];
      }
    }

    return <div>{comp}</div>;
  }
};

export default Switch;
