import {
  GET_ARTICLES,
  SET_LOADING_STATUS,
  SET_USER,
} from "../actions/userType";

const initialState = {
  articles: [],
  loading: false,
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        loading: false,
      };
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };
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
