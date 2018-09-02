import Connect from "../store";
import { fetchCategories } from "../actions/categories.js";

export default Connect(
  state => ({
    categories: state.categories.options
  }),
  (state, dispatch) => ({
    fetchCategories: fetchCategories(state, dispatch)
  })
);
