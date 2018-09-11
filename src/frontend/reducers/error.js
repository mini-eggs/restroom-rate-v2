import { NEW_ERROR_MESSAGE, CLEAR_ERROR_MESSAGES } from "../constants/error";

var initial = {
  errors: []
};

export default {
  [NEW_ERROR_MESSAGE]: ({ state, payload }) => ({ errors: [...state.errors, payload] }),
  [CLEAR_ERROR_MESSAGES]: () => ({ errors: [] }),
  _: ({ store = initial }) => store
};
