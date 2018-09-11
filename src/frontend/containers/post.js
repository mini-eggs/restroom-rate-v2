import Connect from "../store";
import { fetchPost, clearPost } from "../actions/post";

export default Connect(
  state => ({
    post: state.post.current
  }),
  dispatch => ({
    fetchPost: fetchPost(dispatch),
    clearPost: clearPost(dispatch)
  })
);
