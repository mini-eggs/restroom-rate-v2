import { NEW_ERROR_MESSAGE, CLEAR_ERROR_MESSAGES } from "../constants/error";

let initial = {
  errors: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case NEW_ERROR_MESSAGE: {
      return Object.assign({}, state, { errors: [...state.errors, action.payload] });
    }
    case CLEAR_ERROR_MESSAGES: {
      return Object.assign({}, state, { errors: [] });
    }
    default: {
      return state;
    }
  }
};
