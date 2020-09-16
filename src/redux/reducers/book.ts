import {
  BookActionTypes,
  FETCH_BOOK_LIST,
  BookState,
  SELECT_BOOK,
  GET_REVIEW_LIST,
  CLICK_HEART_BTN,
} from "../store/types";

const initialState: BookState = {
  books: [],
  selectedBook: null,
  reviews: [],
  reviewIds: [],
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
    case GET_REVIEW_LIST:
      return {
        ...state,
        reviews: action.payload,
      };
    case CLICK_HEART_BTN:
      return {
        ...state,
        reviewIds: state.reviewIds.includes(action.payload)
          ? state.reviewIds.filter((id: number) => id !== action.payload)
          : [...state.reviewIds, action.payload],
      };
    default:
      return state;
  }
};

export default BookReducer;
