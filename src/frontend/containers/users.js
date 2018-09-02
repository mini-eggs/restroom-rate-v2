import Connect from "../store";
import { createNewUser } from "../actions/users";

export default Connect(
  state => ({
    shouldCreateNewUser: !state.users.loading_user && !state.users.user,
    user: state.users.user
  }),
  (state, dispatch) => ({
    createNewUser: createNewUser(state, dispatch)
  })
);
