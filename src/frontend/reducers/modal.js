import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modal";

var initial = {
  modals: []
};

export default {
  [OPEN_MODAL]: ({ state, payload }) => ({ modals: [...state.modals, payload] }),

  [CLOSE_MODAL]: ({ state }) => {
    state.modals.shift();
    return state;
  },

  _: ({ state = initial }) => state
};
