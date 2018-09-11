import { h } from "wigly";
import { WithRouter } from "../router";
import UserContainer from "./users";
import ErrorConnect from "./error";

export default Component => {
  var EnsureUser = {
    mounted() {
      if (!this.props.user) {
        setTimeout(this.handleNoUser, 1); // next tick
      }
    },

    handleNoUser() {
      this.props.newErrorMessage("You are not signed in.", { uri: "/", text: "Click here to create an account." });
      this.props.router.route("/error");
    },

    render() {
      return <Component {...this.props} {...this.children} />;
    }
  };

  return ErrorConnect(WithRouter(UserContainer(EnsureUser)));
};
