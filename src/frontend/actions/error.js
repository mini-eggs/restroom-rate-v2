import { NEW_ERROR_MESSAGE, CLEAR_ERROR_MESSAGES } from "../constants/error";

export let newErrorMessage = (state, dispatch) => (msg, action) => {
  dispatch({ type: NEW_ERROR_MESSAGE, payload: { msg, action } });
};

export let clearErrorMessages = (state, dispatch) => () => {
  dispatch({ type: CLEAR_ERROR_MESSAGES });
};
