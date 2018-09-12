import { h } from "wigly";
import ModalContainer from "../containers/modal";

var ModalProvider = {
  render() {
    var Modal = this.props.modal;

    return (
      <div>
        {Modal && <Modal />}
        <div>{this.children}</div>
      </div>
    );
  }
};

export default ModalContainer(ModalProvider);
