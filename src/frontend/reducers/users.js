import { NEW_USER_CREATED, NEW_USER_REQUESTED } from "../constants/users";

var initial = {
  loading_user: false,
  user: null
};

export default {
  [NEW_USER_REQUESTED]: () => ({ loading_user: true }),
  [NEW_USER_CREATED]: ({ payload }) => ({ loading_user: false, user: payload }),
  _: ({ store = initial }) => store
};
