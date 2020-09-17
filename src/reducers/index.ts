import { combineReducers } from "redux";
import BookReducer from "./book";
import UserReducer from "./user";
import ReviewReducer from "./review";
import { BookState, UserState, ReviewState } from "store/types";

export interface RootState {
  BookReducer: BookState;
  UserReducer: UserState;
  ReviewReducer: ReviewState;
}

const rootReducer = combineReducers({
  BookReducer,
  UserReducer,
  ReviewReducer,
});

export default rootReducer;
