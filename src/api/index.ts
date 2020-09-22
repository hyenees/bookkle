import fetchClient from "./instance";
import axios from "axios";
import { ReviewData, Book, Profile } from "store/types";

export default {
  getBooks: async (searchBook: string): Promise<Book[]> => {
    const res = await axios.get<{ documents: Book[] }>(
      "https://dapi.kakao.com/v3/search/book?target=title",
      {
        params: { query: searchBook, size: 50 },
        headers: { Authorization: "KakaoAK e23535b3c49c44d77ffac09377ac9d58" },
      }
    );
    return res.data.documents;
  },

  getQuote: async () => {
    const res = await fetchClient.get("/reviews/quote");
    return res.data;
  },

  getReviews: async (): Promise<ReviewData[]> => {
    const res = await fetchClient.get<{ results: ReviewData[] }>("/reviews");
    return res.data.results;
  },

  addReviews: async (offset: number): Promise<ReviewData[]> => {
    const res = await fetchClient.get<{ results: ReviewData[] }>(
      `/reviews?limit=8&offset=${offset}`
    );
    return res.data.results;
  },

  removeReview: async (id: number) => {
    const res = await fetchClient.delete(`/reviews/${id}`);
    return res;
  },

  likeReview: async (id: number) => {
    const res = await fetchClient.post("/reviews/like", { review: id });
    return res;
  },

  getMyReviews: async (id: string) => {
    const res = await fetchClient.get(`/accounts/my-reviews/${id}`);
    return res.data.results;
  },

  getReviewDetail: async (id: number): Promise<ReviewData> => {
    const res = await fetchClient.get(`/reviews/${id}`);
    return res.data;
  },

  getProfile: async (id: string): Promise<Profile> => {
    const res = await fetchClient.get<Profile>(`/accounts/profile/${id}`);
    return res.data;
  },

  followUser: async (id: number | undefined) => {
    const res = await fetchClient.post("/accounts/follow", { follow_to: id });
    return res;
  },

  getFollowReviews: async () => {
    const res = await fetchClient.get("/reviews/following");
    return res.data.results;
  },

  postReview: async (
    title: string,
    content: string,
    quote: string | null,
    rating: number | null,
    book_title: string | undefined,
    book_author: string | undefined,
    book_image: string | undefined
  ) => {
    const res = await fetchClient.post("/reviews", {
      title,
      content,
      quote,
      rating,
      book_title,
      book_author,
      book_image,
    });
    return res;
  },

  getInputReview: async (id: string | undefined) => {
    const res = await fetchClient.get(`/reviews/${id}`);
    return res.data;
  },

  updateReview: async (
    id: string | undefined,
    title: string,
    content: string,
    quote: string | null,
    rating: number | null
  ) => {
    const res = await fetchClient.put(`/reviews/${id}`, {
      title,
      content,
      quote,
      rating,
    });
    return res;
  },

  signIn: async (email: string, password: string) => {
    const res = await fetchClient.post("/accounts/signin", {
      email,
      password,
    });
    return res;
  },

  signUp: async (email: string, nickname: string, password: string) => {
    const res = await fetchClient.post("/accounts/signup", {
      email,
      nickname,
      password,
    });
    return res;
  },
};
