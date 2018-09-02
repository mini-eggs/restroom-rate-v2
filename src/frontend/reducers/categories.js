import { HAS_LOADED } from "../constants/categories";

let initial = {
  options: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case HAS_LOADED: {
      return Object.assign({}, state, { options: action.payload });
    }
    default: {
      return state;
    }
  }
};
