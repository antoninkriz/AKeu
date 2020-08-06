import {USER_PROFILE} from "../types";

const initialState = {
  profile: {
    text: '',
    photo: ''
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE:
      return {
        ...state,
        profile: {
          ...action.payload
        }
      };
    default:
      return state;
  }
}

export default userReducer;