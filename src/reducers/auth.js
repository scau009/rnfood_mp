import { LOGIN, LOGOUT } from '../constants/auth'

const INITIAL_STATE = {
  isLogin: false,
  userInfo: {}
}

export default function isLoginUpdater (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      console.error("in auth",state,action);
      return {
        ...state,
        ...action.data,
        isLogin: true,
      };
     case LOGOUT:
       return {
         ...state,
         userInfo: {},
         isLogin: false
       }
     default:
       return state
  }
}
