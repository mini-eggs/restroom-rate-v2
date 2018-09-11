import Connect from "../store";
import { openModal, closeModal } from "../actions/modal";

export default Connect(
  state => ({
    modal: state.modal.modals[state.modal.modals.length - 1]
  }),
  dispatch => ({
    openModal: openModal(dispatch),
    closeModal: closeModal(dispatch)
  })
);
