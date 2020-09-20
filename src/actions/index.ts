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
  GetReviewAction,
  GET_REVIEW,
  GET_FOLLOW_REVIEWS,
  CountLikeAction,
  COUNT_LIKE,
  GetLikeCountAction,
  GET_LIKE_COUNT,
} from "../store/types";

export const fetchBookList = (books: Book[]): FetchBookListAction => {
  return {
    type: FETCH_BOOK_LIST,
    payload: books,
  };
};

export const getProfile = (profile: Profile | null): GetProfileAction => {
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

export const getFollowReviews = (
  reviews: ReviewData[]
): GetReviewListAction => {
  return {
    type: GET_FOLLOW_REVIEWS,
    payload: reviews,
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

export const addReviewList = (review: ReviewData[]): AddReviewListAction => {
  return {
    type: ADD_REVIEW_LIST,
    payload: review,
  };
};

export const getReview = (review: ReviewData): GetReviewAction => {
  return {
    type: GET_REVIEW,
    payload: review,
  };
};

export const clickHeartBtn = (reviewIds: number): ClickHeartBtnAction => {
  return {
    type: CLICK_HEART_BTN,
    payload: reviewIds,
  };
};

export const getLikeCount = (
  reviewId: number,
  recommendCount: number
): GetLikeCountAction => {
  return {
    type: GET_LIKE_COUNT,
    id: reviewId,
    count: recommendCount,
  };
};

export const countLike = (reviewId: number): CountLikeAction => {
  return {
    type: COUNT_LIKE,
    id: reviewId,
  };
};
