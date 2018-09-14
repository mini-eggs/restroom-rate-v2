import { h } from "wigly";
import "./modal-provider.css";

var ModalProvider = {
  data() {
    return {
      modal: null,
      props: {},
      transitioning: false
    };
  },

  mounted() {
    document.addEventListener("modal:open", this.open);
    document.addEventListener("modal:close", this.close);
  },

  open(event) {
    if (this.state.modal) return;
    var modal = event.detail.component;
    var props = event.detail.props || {};
    this.setState({ modal, props });
  },

  close() {
    this.setState({ modal: null, props: {} });
  },

  render() {
    var Modal = this.state.modal;
    var props = this.state.props;

    return (
      <div>
        <div>{this.children}</div>
        <div>{Modal && <Modal {...props} />}</div>
      </div>
    );
  }
};

export default ModalProvider;
