export const FETCH_BOOK_LIST = "FETCH_BOOK_LIST";

export interface Book {
  title: string;
  authors: string[];
  image: string;
}

export interface BookState {
  books: Book[];
}

export interface FetchBookListAction {
  type: typeof FETCH_BOOK_LIST;
  payload: Book[];
}

export type BookActionTypes = FetchBookListAction;
