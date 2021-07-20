import { User } from '@/types';

import {
  SET_CURRENT_USER,
  SET_AUTH_ERROR,
  SET_AUTH_LOGOUT,
  UPDATE_CURRENT_USER,
} from './auth-types';

interface State {
  loading: boolean;
  currentUser: null | User;
  isAuthenticated: boolean;
}

interface Action {
  payload?: any;
  type: string;
}

export default (state: State, action: Action): State => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };
    case SET_AUTH_LOGOUT:
    case SET_AUTH_ERROR:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        loading: false,
      };
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.user,
      };
    default:
      return state;
  }
};
