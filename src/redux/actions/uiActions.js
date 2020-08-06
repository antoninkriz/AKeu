import {LOADING_END, LOADING_START, MENU_CLOSE, MENU_OPEN} from "../types";

export const menuOpen = () => (dispatch) => dispatch({type: MENU_OPEN});

export const menuClose = () => (dispatch) => dispatch({type: MENU_CLOSE});

export const loadingEnd = () => (dispatch) => dispatch({type: LOADING_END});

export const loadingStart = () => (dispatch) => dispatch({type: LOADING_START});
