import { HAS_LOADED } from "../constants/categories";
import xhr from "../packages/xhr";

export var fetchCategories = dispatch => async () => {
  var payload = await xhr({ url: "/categories", method: "get" });
  dispatch(HAS_LOADED, payload);
};
