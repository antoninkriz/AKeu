import {USER_PROFILE} from "../types";

const initialState = {
  profile: {
    text: '',
    photo: '',
    email: '',
    linkedin: '',
    github: '',
    keybase: ''
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE:
      return {
        ...state,
        profile: {
          ...action.payload,
          // Email is saved as an array of ROT 1 chars, it has to be decoded
          email: action.payload.email.map(c => String.fromCharCode(c.charCodeAt(0) - 1)).join('')
        }
      };
    default:
      return state;
  }
}

export default userReducer;