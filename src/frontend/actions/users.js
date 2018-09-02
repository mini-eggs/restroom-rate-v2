import { NEW_USER_CREATED, NEW_USER_REQUESTED } from "../constants/users";
import xhr from "../packages/xhr";

export let createNewUser = (state, dispatch) => async () => {
  dispatch({ type: NEW_USER_REQUESTED });
  let user = await xhr({ url: "/user", method: "post" });
  dispatch({ type: NEW_USER_CREATED, payload: user });
};
