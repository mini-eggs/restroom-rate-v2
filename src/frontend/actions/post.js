import { POST_REQUESTED, POST_RECEIVED, CLEAR_POST } from "../constants/post";
import xhr from "../packages/xhr";

export var fetchPost = dispatch => async id => {
  dispatch(POST_REQUESTED);
  dispatch(POST_RECEIVED, await xhr({ url: `/posts/single/${id}`, method: "get" }));
};

export var clearPost = dispatch => () => {
  dispatch(CLEAR_POST);
};
