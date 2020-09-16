import {
  FetchBookListAction,
  Book,
  FETCH_BOOK_LIST,
  SelectBookAction,
  SELECT_BOOK,
  GET_REVIEW_LIST,
  ReviewData,
  CLICK_HEART_BTN,
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

export const getReviewList = (reviews: ReviewData[]) => {
  return {
    type: GET_REVIEW_LIST,
    payload: reviews,
  };
};

export const clickHeartBtn = (reviewIds: number) => {
  return {
    type: CLICK_HEART_BTN,
    payload: reviewIds,
  };
};
