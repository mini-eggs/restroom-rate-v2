import { HAS_LOADED } from "../constants/categories";

var initial = {
  options: []
};

export default {
  [HAS_LOADED]: ({ payload }) => ({ options: payload }),
  _: ({ store = initial }) => store
};
