import { h } from "wigly";
import ModalContainer from "../containers/modal";

var Search = {
  render() {
    return (
      <div
        style={{
          position: "fixed",
          display: "flex",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <div>here we go</div>
        <button onclick={this.props.closeModal}>close</button>
      </div>
    );
  }
};

export default ModalContainer(Search);
