export const FETCH_BOOK_LIST = "FETCH_BOOK_LIST";
export const SELECT_BOOK = "SELECT_BOOK";
export const GET_REVIEW_LIST = "GET_REVIEW_LIST";
export const CLICK_HEART_BTN = "CLICK_HEART_BTN";

export interface ReviewData {
  id: number;
  book_detail: BookDetail;
  user_info: UserInfo;
  title: string;
  book: number;
  user: number;
  quote: string;
  recommend_count: number;
  rating: number;
  content: string;
}

export interface BookDetail {
  id: number;
  title: string;
  author: string;
  image: string;
}

export interface UserInfo {
  id: number;
  nickname: string;
}

export interface Book {
  title: string;
  authors: string[];
  thumbnail: string;
}

export interface BookState {
  books: Book[];
  selectedBook: Book | null;
  reviews: ReviewData[];
  reviewIds: number[];
}

export interface ClickHeartBtn {
  type: typeof CLICK_HEART_BTN;
  payload: number;
}

export interface GetReviewList {
  type: typeof GET_REVIEW_LIST;
  payload: ReviewData[];
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

export type BookActionTypes =
  | FetchBookListAction
  | SelectBookAction
  | GetReviewList
  | ClickHeartBtn;
