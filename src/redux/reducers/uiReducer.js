import {MENU_CLOSE, MENU_OPEN} from "../types";

const initialState = {
  isMenuOpen: false
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_OPEN:
      return {
        ...state,
        isMenuOpen: true
      };
    case MENU_CLOSE:
      return {
        ...state,
        isMenuOpen: false
      }
    default:
      return state;
  }
}

export default uiReducer;