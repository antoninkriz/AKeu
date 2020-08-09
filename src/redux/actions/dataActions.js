import axios from "../../utils/axios";
import {loadingEnd, loadingStart} from "./uiActions";
import {DATA_RESUME} from "../types";

export const getResume = () => (dispatch) => {
  dispatch(loadingStart());
  axios.get('/api/resume.json').then(r => {
    dispatch({
      type: DATA_RESUME,
      payload: r.data
    });
  }).finally(() => dispatch(loadingEnd()));
};
