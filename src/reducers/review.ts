import {
  ReviewActionTypes,
  ReviewState,
  REMOVE_REVIEW,
  ADD_REVIEW_LIST,
  GET_REVIEW_LIST,
  CLICK_HEART_BTN,
  GET_FOLLOW_REVIEWS,
  GET_REVIEW,
  COUNT_LIKE,
  GET_LIKE_COUNT,
} from "../store/types";

const initialState: ReviewState = {
  reviews: [],
  reviewIds: [],
  reviewDetail: null,
  followReviews: [],
  countHeart: null,
};

const ReviewReducer = (
  state = initialState,
  action: ReviewActionTypes
): ReviewState => {
  switch (action.type) {
    case GET_REVIEW_LIST:
      return {
        ...state,
        reviews: action.payload,
      };
    case ADD_REVIEW_LIST:
      return { ...state, reviews: state.reviews.concat(action.payload) };
    case REMOVE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== action.payload),
      };
    case GET_REVIEW:
      return {
        ...state,
        reviewDetail: action.payload,
      };
    case CLICK_HEART_BTN:
      if (action.payload === 0) {
        return { ...state, reviewIds: [] };
      }
      return {
        ...state,
        reviewIds: state.reviewIds.includes(action.payload)
          ? state.reviewIds.filter((id: number) => id !== action.payload)
          : [...state.reviewIds, action.payload],
      };
    case GET_LIKE_COUNT:
      const obj = Object.assign({}, state.countHeart, {
        [action.id]: action.count,
      });
      return Object.assign({}, state, {
        countHeart: obj,
      });
    case COUNT_LIKE:
      if (state.reviewIds.includes(action.id)) {
        const obj = Object.assign({}, state.countHeart, {
          [action.id]: state.countHeart && state.countHeart[action.id] - 1,
        });
        return Object.assign({}, state, {
          countHeart: obj,
        });
      } else {
        const obj = Object.assign({}, state.countHeart, {
          [action.id]: state.countHeart && state.countHeart[action.id] + 1,
        });
        return Object.assign({}, state, {
          countHeart: obj,
        });
      }
    case GET_FOLLOW_REVIEWS:
      return {
        ...state,
        followReviews: action.payload,
      };

    default:
      return state;
  }
};

export default ReviewReducer;
