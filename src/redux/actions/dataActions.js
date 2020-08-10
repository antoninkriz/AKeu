import axios from "../../utils/axios";
import {loadingEnd, loadingStart} from "./uiActions";
import {DATA_404, DATA_POST, DATA_RESUME} from "../types";

export const getResume = () => (dispatch) => {
  dispatch(loadingStart());
  axios.get('/api/resume.json').then(r => {
    dispatch({
      type: DATA_RESUME,
      payload: r.data
    });
  }).finally(() => dispatch(loadingEnd()));
};

export const getPost = (urlParam) => (dispatch) => {
  dispatch(loadingStart());
  axios.get(`/api/posts/${urlParam}.json`).then(r => {
    dispatch({
      type: DATA_POST,
      payload: {
        url: urlParam,
        content: r.data
      }
    });
  })
    .catch(() => dispatch({
      type: DATA_404,
      payload: urlParam
    }))
    .finally(() => dispatch(loadingEnd()));
};
