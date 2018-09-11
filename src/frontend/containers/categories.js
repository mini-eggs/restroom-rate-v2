import Connect from "../store";
import { fetchCategories } from "../actions/categories.js";

export default Connect(
  state => ({
    categories: state.categories.options
  }),
  dispatch => ({
    fetchCategories: fetchCategories(dispatch)
  })
);
