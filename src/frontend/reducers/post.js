import { POST_REQUESTED, POST_RECEIVED, CLEAR_POST } from "../constants/post";

var initial = {
  current: null,
  loading: true
};

export default {
  [POST_REQUESTED]: () => ({ loading: true }),
  [POST_RECEIVED]: ({ payload }) => ({ loading: false, current: payload }),
  [CLEAR_POST]: () => ({ loading: false, current: null }),
  _: ({ store = initial }) => store
};
