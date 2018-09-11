import { NEW_ERROR_MESSAGE, CLEAR_ERROR_MESSAGES } from "../constants/error";

export var newErrorMessage = dispatch => (msg, action) => {
  dispatch(NEW_ERROR_MESSAGE, { msg, action });
};

export var clearErrorMessages = dispatch => () => {
  dispatch(CLEAR_ERROR_MESSAGES);
};
