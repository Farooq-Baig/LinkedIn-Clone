import { SET_USER } from "../actions/userType";

const INITIAL_State = {
  user: null,
};

const userReducer = (state = INITIAL_State, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default userReducer;
