const initState = {
  data: {
    user: {},
    security_question_master: [],
    userAddress: [],
  },
};
import AuthActions from './action';
const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case AuthActions.AUTH_ME_SUCCESS:
      return {
        ...state,
        user: action.data,
      };
    case AuthActions.SIGN_OUT:
      return {
        ...state,
        user: {},
      };
    case AuthActions.GET_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        userAddress: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};
export default AuthReducer;
