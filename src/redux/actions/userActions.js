import axios from "../../utils/axios";
import {loadingEnd, loadingStart} from "./uiActions";
import {USER_PROFILE} from "../types";

export const getProfile = () => (dispatch) => {
  dispatch(loadingStart());
  axios.get('/api-profile.json').then(r => {
    dispatch({
      type: USER_PROFILE,
      payload: r.data
    });
  }).finally(() => dispatch(loadingEnd()));
};