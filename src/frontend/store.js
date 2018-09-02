import { h, component } from "wigly";
import createStore from "unistore";
import categories from "./reducers/categories";
import users from "./reducers/users";
import error from "./reducers/error";
import post from "./reducers/post";

let reducers = { categories, users, error };

let initialState = {};
try {
  let potential = JSON.parse(localStorage.getItem("state"));
  potential && (initialState = potential);
} catch (_) {}

let nextState = (currentStore, action) => {
  return Object.keys(reducers).reduce(
    (total, key) => Object.assign({}, total, { [key]: reducers[key](currentStore[key], action) }),
    currentStore
  );
};

let store = createStore(nextState(initialState, {}));
store.subscribe(() => localStorage.setItem("state", JSON.stringify(store.getState())));

let Connect = (stateMap = () => ({}), dispatchMap = () => ({})) => Component => {
  return component({
    data() {
      return { unsubscribe: () => {} };
    },

    mounted() {
      let unsubscribe = store.subscribe(this.forceUpdate);
      this.setState(() => ({ unsubscribe }));
    },

    destroyed() {
      this.state.unsubscribe();
    },

    forceUpdate() {
      this.setState(() => ({}));
    },

    dispatch(action) {
      let state = store.getState();
      store.setState(nextState(state, action));
    },

    render() {
      let state = store.getState();
      return (
        <Component {...this.props} {...this.children} {...stateMap(state)} {...dispatchMap(state, this.dispatch)} />
      );
    }
  });
};

export default Connect;
