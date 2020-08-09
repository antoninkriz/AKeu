import {DATA_RESUME} from "../types";

const initialState = {
  resume: {
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    accomplishments: [],
    stack: [],
    languages: [],
    other: []
  }
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_RESUME:
      return {
        ...state,
        resume: action.payload
      };
    default:
      return state;
  }
}

export default dataReducer;
