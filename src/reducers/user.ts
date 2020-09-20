import { UserActionTypes, UserState, GET_PROFILE } from "../store/types";

const initialState: UserState = {
  profile: null,
};

const UserReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, profile: action.payload };

    default:
      return state;
  }
};

export default UserReducer;
