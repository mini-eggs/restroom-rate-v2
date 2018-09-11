import { NEW_USER_CREATED, NEW_USER_REQUESTED } from "../constants/users";
import xhr from "../packages/xhr";

export var createNewUser = dispatch => async () => {
  dispatch(NEW_USER_REQUESTED);
  var user = await xhr({ url: "/user", method: "post" });
  dispatch(NEW_USER_CREATED, user);
};
