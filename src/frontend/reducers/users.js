import { NEW_USER_CREATED, NEW_USER_REQUESTED } from "../constants/users";

let initial = {
  loading_user: false,
  user: null
};

export default (state = initial, action) => {
  switch (action.type) {
    case NEW_USER_REQUESTED: {
      return Object.assign({}, state, { loading_user: true });
    }
    case NEW_USER_CREATED: {
      return Object.assign({}, state, { loading_user: false, user: action.payload });
    }
    default: {
      return state;
    }
  }
};
