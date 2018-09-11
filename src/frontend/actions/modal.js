import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modal";

export var openModal = dispatch => component => dispatch(OPEN_MODAL, component);
export var closeModal = dispatch => () => dispatch(CLOSE_MODAL);
