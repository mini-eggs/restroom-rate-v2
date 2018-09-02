import { HAS_LOADED } from "../constants/categories";
import xhr from "../packages/xhr";

export let fetchCategories = (state, dispatch) => async () => {
  dispatch({ type: HAS_LOADED, payload: await xhr({ url: "/categories", method: "get" }) });
};
