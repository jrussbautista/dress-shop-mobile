import { SET_USER, SET_AUTH_ERROR, CLEAR_ERROR } from './authTypes';

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      };
    case SET_AUTH_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
