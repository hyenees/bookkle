import {
  FetchBookListAction,
  Book,
  FETCH_BOOK_LIST,
  SelectBookAction,
  SELECT_BOOK,
  GET_REVIEW_LIST,
  GetReviewListAction,
  ReviewData,
  CLICK_HEART_BTN,
  ADD_REVIEW_LIST,
  AddReviewListAction,
  ClickHeartBtnAction,
  GET_PROFILE,
  GetProfileAction,
  Profile,
  REMOVE_REVIEW,
  RemoveReviewAction,
} from "../store/types";

export const fetchBookList = (books: Book[]): FetchBookListAction => {
  return {
    type: FETCH_BOOK_LIST,
    payload: books,
  };
};

export const getProfile = (profile: Profile): GetProfileAction => {
  return {
    type: GET_PROFILE,
    payload: profile,
  };
};

export const selectBook = (
  title: string,
  authors: string[],
  thumbnail: string,
  isbn: string
): SelectBookAction => {
  return {
    type: SELECT_BOOK,
    title,
    authors,
    thumbnail,
    isbn,
  };
};

export const getReviewList = (reviews: ReviewData[]): GetReviewListAction => {
  return {
    type: GET_REVIEW_LIST,
    payload: reviews,
  };
};

export const removeReview = (id: number): RemoveReviewAction => {
  return {
    type: REMOVE_REVIEW,
    payload: id,
  };
};

export const addReviewList = (reviews: ReviewData[]): AddReviewListAction => {
  return {
    type: ADD_REVIEW_LIST,
    payload: reviews,
  };
};

export const clickHeartBtn = (reviewIds: number): ClickHeartBtnAction => {
  return {
    type: CLICK_HEART_BTN,
    payload: reviewIds,
  };
};
