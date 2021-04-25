import {DATA_RESUME, DATA_POST, DATA_404} from "../types";
import defaultResume from '../../public/api/resume.json'

const initialState = {
  resume: {
    ...defaultResume,
    reload: ''
  },
  posts: {}
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_RESUME:
      return {
        ...state,
        resume: action.payload
      };
    case DATA_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.url] : action.payload.content
        }
      }
    case DATA_404:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload] : 404
        }
      }
    default:
      return state;
  }
}

export default dataReducer;
