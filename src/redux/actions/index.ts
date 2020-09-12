import {
  FetchBookListAction,
  Book,
  FETCH_BOOK_LIST,
  SelectBookAction,
  SELECT_BOOK,
} from "../store/types";

export const fetchBookList = (books: Book[]): FetchBookListAction => {
  return {
    type: FETCH_BOOK_LIST,
    payload: books,
  };
};

export const selectBook = (
  title: string,
  authors: string[],
  thumbnail: string
): SelectBookAction => {
  return {
    type: SELECT_BOOK,
    title,
    authors,
    thumbnail,
  };
};
