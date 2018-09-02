import Connect from "../store";
import { newErrorMessage, clearErrorMessages } from "../actions/error";

export default Connect(
  state => ({
    err: state.error.errors.length > 0 ? state.error.errors[state.error.errors.length - 1] : {} // because we try to access props on err
  }),
  (state, dispatch) => ({
    newErrorMessage: newErrorMessage(state, dispatch),
    clearErrorMessages: clearErrorMessages(state, dispatch)
  })
);
