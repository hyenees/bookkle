import {
  UserActionTypes,
  UserState,
  GET_PROFILE,
  COUNT_FOLLOWER,
} from "../store/types";

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
    case COUNT_FOLLOWER:
      if (state.profile !== null) {
        return {
          ...state,
          profile: {
            ...state.profile,
            follower_count: state.profile?.is_follow
              ? state.profile.follower_count - 1
              : state.profile && state.profile?.follower_count + 1,
            is_follow: !state.profile.is_follow,
          },
        };
      }
      return state;
    default:
      return state;
  }
};

export default UserReducer;
