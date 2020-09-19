import {
  UserActionTypes,
  UserState,
  GET_PROFILE,
  CHECK_SIGN_IN,
} from "../store/types";

const initialState: UserState = {
  profile: null,
  isLoggedIn: false,
};

const UserReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case CHECK_SIGN_IN:
      return { ...state, isLoggedIn: action.payload };
    case GET_PROFILE:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

export default UserReducer;
