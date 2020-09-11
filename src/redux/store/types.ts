export const FETCH_BOOK_LIST = "FETCH_BOOK_LIST";
export const SELECT_BOOK = "SELECT_BOOK";

export interface Book {
  title: string;
  authors: string[];
  thumbnail: string;
}

export interface BookState {
  books: Book[];
  selectedBook: Book | null;
}

export interface SelectBookAction {
  type: typeof SELECT_BOOK;
  title: string;
  authors: string[];
  thumbnail: string;
}

export interface FetchBookListAction {
  type: typeof FETCH_BOOK_LIST;
  payload: Book[];
}

export type BookActionTypes = FetchBookListAction | SelectBookAction;
