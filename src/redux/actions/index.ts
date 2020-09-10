import { FetchBookListAction, Book, FETCH_BOOK_LIST } from "../store/types";

export const fetchBookList = (books: Book[]): FetchBookListAction => {
  return {
    type: FETCH_BOOK_LIST,
    payload: books,
  };
};
