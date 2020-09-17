import {
  ReviewActionTypes,
  ReviewState,
  REMOVE_REVIEW,
  ADD_REVIEW_LIST,
  GET_REVIEW_LIST,
  CLICK_HEART_BTN,
} from "../store/types";

const initialState: ReviewState = {
  reviews: [],
  reviewIds: [],
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
    case CLICK_HEART_BTN:
      return {
        ...state,
        reviewIds: state.reviewIds.includes(action.payload)
          ? state.reviewIds.filter((id: number) => id !== action.payload)
          : [...state.reviewIds, action.payload],
      };
    default:
      return state;
  }
};

export default ReviewReducer;
