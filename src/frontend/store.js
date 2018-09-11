import { createStore } from "wigly-store";
import { createConnector } from "wigly-store-connect";
import categories from "./reducers/categories";
import users from "./reducers/users";
import error from "./reducers/error";
import post from "./reducers/post";

export default createConnector(createStore({ categories, users, error, post }));
