import {
  BookActionTypes,
  FETCH_BOOK_LIST,
  BookState,
  SELECT_BOOK,
} from "../store/types";

const initialState: BookState = {
  books: [],
  selectedBook: null,
};

const BookReducer = (
  state = initialState,
  action: BookActionTypes
): BookState => {
  switch (action.type) {
    case FETCH_BOOK_LIST:
      return { ...state, books: action.payload };
    case SELECT_BOOK:
      return {
        ...state,
        selectedBook: {
          ...state.selectedBook,
          title: action.title,
          authors: action.authors,
          thumbnail: action.thumbnail,
        },
      };
    default:
      return state;
  }
};

export default BookReducer;
