import { BookActionTypes, FETCH_BOOK_LIST, BookState } from "../store/types";

const initialState: BookState = {
  books: [],
};

const BookReducer = (
  state = initialState,
  action: BookActionTypes
): BookState => {
  switch (action.type) {
    case FETCH_BOOK_LIST:
      return { ...state, books: action.payload };
    default:
      return state;
  }
};

export default BookReducer;
