import {LOADING_END, LOADING_START, MENU_CLOSE, MENU_OPEN} from "../types";

const initialState = {
  loading: false,
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
      };
    case LOADING_START:
      return {
        ...state,
        loading: true
      };
    case LOADING_END:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export default uiReducer;