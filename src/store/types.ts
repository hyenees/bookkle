export const FETCH_BOOK_LIST = "FETCH_BOOK_LIST";
export const SELECT_BOOK = "SELECT_BOOK";
export const GET_REVIEW_LIST = "GET_REVIEW_LIST";
export const ADD_REVIEW_LIST = "ADD_REVIEW_LIST";
export const REMOVE_REVIEW = "REMOVE_REVIEW";
export const CLICK_HEART_BTN = "CLICK_HEART_BTN";
export const GET_PROFILE = "GET_PROFILE";

export interface Profile {
  nickname: string;
  follower_count: number;
  id: number;
  is_follow: boolean;
}

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
  is_like: boolean;
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
  isbn: string;
}

export interface ReviewState {
  reviews: ReviewData[];
  reviewIds: number[];
}

export interface BookState {
  books: Book[];
  selectedBook: Book | null;
}

export interface UserState {
  profile: Profile | null;
}

export interface GetProfileAction {
  type: typeof GET_PROFILE;
  payload: Profile;
}

export interface ClickHeartBtnAction {
  type: typeof CLICK_HEART_BTN;
  payload: number;
}

export interface GetReviewListAction {
  type: typeof GET_REVIEW_LIST;
  payload: ReviewData[];
}

export interface RemoveReviewAction {
  type: typeof REMOVE_REVIEW;
  payload: number;
}

export interface AddReviewListAction {
  type: typeof ADD_REVIEW_LIST;
  payload: ReviewData[];
}

export interface SelectBookAction {
  type: typeof SELECT_BOOK;
  title: string;
  authors: string[];
  thumbnail: string;
  isbn: string;
}

export interface FetchBookListAction {
  type: typeof FETCH_BOOK_LIST;
  payload: Book[];
}

export type BookActionTypes = FetchBookListAction | SelectBookAction;

export type UserActionTypes = GetProfileAction;

export type ReviewActionTypes =
  | GetReviewListAction
  | AddReviewListAction
  | RemoveReviewAction
  | ClickHeartBtnAction;
