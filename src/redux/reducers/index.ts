import { combineReducers } from "redux";
import BookReducer from "./book";
import { BookState } from "redux/store/types";

export interface RootState {
  BookReducer: BookState;
}

const rootReducer = combineReducers({ BookReducer });

export default rootReducer;
