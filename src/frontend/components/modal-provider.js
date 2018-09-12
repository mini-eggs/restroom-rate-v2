import { h } from "wigly";

var ModalProvider = {
  data() {
    return { modals: [] };
  },

  mounted() {
    document.addEventListener("modal:open", this.open);
    document.addEventListener("modal:close", this.close);
  },

  open(event) {
    this.setState(({ modals }) => ({ modals: [...modals, event.detail] }));
  },

  close() {
    this.setState(({ modals }) => {
      modals.pop();
      return { modals };
    });
  },

  render() {
    var Modal = this.state.modals[this.state.modals.length - 1];

    return (
      <div>
        {Modal && <Modal />}
        <div>{this.children}</div>
      </div>
    );
  }
};

export default ModalProvider;
