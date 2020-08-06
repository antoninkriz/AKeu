import {MENU_CLOSE, MENU_OPEN} from "../types";

export const menuOpen = () => (dispatch) => dispatch({type: MENU_OPEN});

export const menuClose = () => (dispatch) => dispatch({type: MENU_CLOSE});
